import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary  mt-[230px] lg:mt-[246px]">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}

      {/* filler para mantener layout */}
      <div className="hidden lg:block bg-background" />
    </div>
  );
};

export default ProductGridSkeleton;
