"use client";

import { useAtom } from "jotai";
import ProductGrid from "@/src/components/GridProducts";
import { useProducts } from "@/src/hooks/useProducts";
import { searchAtom } from "@/src/store/uiAtoms";
import ProductGridSkeleton from "@/src/ui/ProductGridSkeleton";
import Button from "@/src/ui/Button";

export default function StorePage() {
  const [search] = useAtom(searchAtom);
  const { products, loading, loadingMore, hasMore, loadMore } = useProducts({
    search,
  });

  if (loading) {
    return <ProductGridSkeleton />;
  }

  return (
    <>
      <ProductGrid products={products} />
      {loadingMore && <ProductGridSkeleton />}
      {hasMore && !loadingMore && (
        <div className="flex justify-center py-10 border-b border-primary">
          <Button onClick={loadMore}>See more products</Button>
        </div>
      )}
    </>
  );
}
