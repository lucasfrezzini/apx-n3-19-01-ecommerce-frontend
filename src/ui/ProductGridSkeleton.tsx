import ProductCardSkeleton from "./ProductCardSkeleton";

type Props = {
  className?: string;
};

const ProductGridSkeleton = ({ className }: Props) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary border-b border-primary ${className || ""}`}>
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}

      <div className="hidden lg:block bg-background" />
    </div>
  );
};

export default ProductGridSkeleton;