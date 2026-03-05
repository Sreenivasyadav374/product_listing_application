import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import {getUniqueBrands} from '../lib/utils'

const LIMIT = 12;

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const selectedBrands = searchParams.get("brands")
    ? searchParams.get("brands").split(",")
    : [];
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === null || (Array.isArray(value) && value.length === 0)) {
        params.delete(key);
      } else {
        params.set(key, Array.isArray(value) ? value.join(",") : value);
      }
    });
    setSearchParams(params, { replace: true });
  };

  const setFilter = (key, value) => {
    updateParams({ [key]: value, page: "1" });
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = selectedCategory
      ? `/api/products/category/${selectedCategory}?limit=100`
      : `/api/products?limit=100`;

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch products");
        return r.json();
      })
      .then((data) => {
        setAllProducts(data.products || []);
        setTotal(data.total || 0);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const brands = getUniqueBrands(allProducts);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      if (minPrice && p.price < Number(minPrice)) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      return true;
    });
  }, [allProducts, minPrice, maxPrice, selectedBrands]);

  const totalPages = Math.ceil(filteredProducts.length / LIMIT);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * LIMIT,
    currentPage * LIMIT
  );

  const currentSearchParams = searchParams.toString();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4">
        <h1 className="text-2xl font-bold text-foreground">Products</h1>
      </header>

      <div className="flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto">
        <div className="w-full md:w-64 shrink-0">
          <Filters
            selectedCategory={selectedCategory}
            onCategoryChange={(v) => setFilter("category", v)}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={(v) => setFilter("minPrice", v)}
            onMaxPriceChange={(v) => setFilter("maxPrice", v)}
            brands={brands}
            selectedBrands={selectedBrands}
            onBrandsChange={(v) => setFilter("brands", v)}
          />
        </div>

        <div className="flex-1">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="spinner" />
            </div>
          )}

          {error && (
            <div className="text-center py-20 text-destructive">
              <p className="font-medium">Error: {error}</p>
            </div>
          )}

          {!loading && !error && paginatedProducts.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No products found.
            </div>
          )}

          {!loading && !error && paginatedProducts.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    searchParams={currentSearchParams}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(p) => updateParams({ page: String(p) })}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
