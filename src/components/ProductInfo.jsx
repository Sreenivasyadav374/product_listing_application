const ProductInfo = ({ product }) => {
  return (
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

        <p className="text-2xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>

        <p className="text-muted-foreground">
          ⭐ {product.rating.toFixed(1)}
        </p>

        {product.brand && (
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Brand:</span>{" "}
            {product.brand}
          </p>
        )}

        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Category:</span>{" "}
          {product.category}
        </p>

        <p className="text-foreground leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;