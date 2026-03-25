"use client";

import { useParams } from "next/navigation";
import ProductGrid from "@/src/components/ProductGrid";
import { useProducts } from "@/src/hooks/useProducts";
import ProductGridSkeleton from "@/src/ui/ProductGridSkeleton";
import Button from "@/src/ui/Button";

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const { products, loading, loadingMore, hasMore, loadMore } = useProducts({
    category,
  });

  if (loading) {
    return <ProductGridSkeleton className="mt-[230px] lg:mt-[246px]" />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="border border-primary p-8 text-center">
        <p className="opacity-70">No products found in this category.</p>
      </div>
    );
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
