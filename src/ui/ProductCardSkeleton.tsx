"use client";

const ProductCardSkeleton = () => {
  return (
    <div className="w-full p-[30px] bg-background">
      {/* Image */}
      <div className="aspect-square mb-[15px] bg-foreground animate-pulse" />

      {/* Title + badge */}
      <div className="flex items-start justify-between mt-4 mb-2 gap-4">
        <div className="h-5 w-2/3 bg-foreground animate-pulse" />
        <div className="h-6 w-12 bg-foreground" />
      </div>

      {/* Price */}
      <div className="h-5 w-20 bg-foreground animate-pulse" />
    </div>
  );
};

export default ProductCardSkeleton;
