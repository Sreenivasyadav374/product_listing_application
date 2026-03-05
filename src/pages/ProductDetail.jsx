import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch product");
        return r.json();
      })
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="spinner" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-destructive">
        Error: {error}
      </div>
    );

  if (!product) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate(`/?${searchParams.toString()}`)}
          className="mb-6 px-4 py-2 rounded-md border border-input bg-background text-foreground text-sm font-medium hover:bg-accent transition-colors"
        >
          ← Back to Products
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full rounded-lg border border-border"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold text-foreground">{product.title}</h1>
            <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
            <p className="text-muted-foreground">⭐ {product.rating.toFixed(1)}</p>
            {product.brand && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Brand:</span> {product.brand}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Category:</span> {product.category}
            </p>
            <p className="text-foreground leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
