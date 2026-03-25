"use client";

import ProductGrid from "@/src/components/ProductGrid";
import { useProducts } from "@/src/hooks/useProducts";
import ProductGridSkeleton from "@/src/ui/ProductGridSkeleton";
import Button from "@/src/ui/Button";

export default function StorePage() {
  const { products, loading, loadingMore, hasMore, loadMore } = useProducts();

  if (loading) {
    return <ProductGridSkeleton className="mt-[230px] lg:mt-[246px]" />;
  }

  return (
    <>
      <ProductGrid products={products} className="mt-[230px] lg:mt-[246px]" />
      {loadingMore && <ProductGridSkeleton className="mt-[230px] lg:mt-[246px]" />}
      {hasMore && !loadingMore && (
        <div className="flex justify-center py-10 border-b border-primary">
          <Button onClick={loadMore}>See more products</Button>
        </div>
      )}
    </>
  );
}
