import { Link } from "react-router-dom";

const ProductCard = ({ product, searchParams }) => {
  return (
    <Link
      to={`/product/${product.id}?${searchParams}`}
      className="block rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-square bg-muted overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4 space-y-1">
        <h3 className="font-medium text-card-foreground truncate">{product.title}</h3>
        <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">⭐ {product.rating.toFixed(1)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
