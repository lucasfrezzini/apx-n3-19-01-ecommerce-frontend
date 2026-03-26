"use client";

import ProductGrid from "@/components/product/ProductGrid";
import { useProducts } from "@/src/hooks/useProducts";
import ProductGridSkeleton from "@/components/skeleton/ProductGridSkeleton";
import Button from "@/components/common/Button";

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
