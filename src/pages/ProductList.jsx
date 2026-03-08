import {useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import { getUniqueBrands, filterProducts } from "../lib/utils";
import { usePagination } from "../hooks/usePagination";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import { useProducts } from "../hooks/useProducts";

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

  const {
    products: allProducts,
    loading,
    error,
    total,
    retrying,
  } = useProducts(selectedCategory);

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === "" ||
        value === null ||
        (Array.isArray(value) && value.length === 0)
      ) {
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

  const brands = getUniqueBrands(allProducts);

  const filteredProducts = useMemo(() => {
    return filterProducts(allProducts, minPrice, maxPrice, selectedBrands);
  }, [allProducts, minPrice, maxPrice, selectedBrands]);

  const { paginatedItems: paginatedProducts, totalPages } = usePagination(
    filteredProducts,
    currentPage,
    LIMIT,
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
          {error ? (
            <ErrorState message={error} />
          ) : loading ? (
            <Loader text={retrying ? "Server busy, retrying..." : undefined} />
          ) : paginatedProducts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No products found.
            </div>
          ) : (
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
