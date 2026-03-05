import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useProduct } from "../hooks/use-product";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import ProductInfo from "../components/ProductInfo";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { product, loading, error } = useProduct(id);

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate(`/?${searchParams.toString()}`)}
          className="mb-6 px-4 py-2 rounded-md border border-input bg-background text-foreground text-sm font-medium hover:bg-accent transition-colors"
        >
          ← Back to Products
        </button>

        {product && <ProductInfo product={product} />}
      </div>
    </div>
  );
};

export default ProductDetail;