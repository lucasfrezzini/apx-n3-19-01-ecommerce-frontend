"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import ProductGrid from "@/src/components/ProductGrid";
import { getSearchProducts } from "@/src/lib/api/products";
import ProductGridSkeleton from "@/src/ui/ProductGridSkeleton";
import Button from "@/src/ui/Button";

const PRODUCTS_PER_PAGE = 9;

interface AlgoliaProduct {
  objectID: string;
  name: string;
  description?: string;
  category?: string;
  price: number;
  stock?: number;
  image: string;
  attributes?: Record<string, string>;
  isNew?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface NormalizedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  images?: { product: string[] };
  isNew?: boolean;
}

function normalizeProduct(product: AlgoliaProduct): NormalizedProduct {
  return {
    id: product.objectID,
    name: product.name,
    price: product.price,
    image: product.image,
    category: product.category,
    images: { product: [product.image] },
    isNew: product.isNew,
  };
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const [products, setProducts] = useState<NormalizedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const loadProducts = useCallback(async () => {
    if (!q.trim()) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getSearchProducts({
        q,
        limit: PRODUCTS_PER_PAGE,
        offset: 0,
      });
      const normalized = data.results.map((p: unknown) => 
        normalizeProduct(p as AlgoliaProduct)
      );
      setProducts(normalized);
      setTotal(data.total);
      setHasMore(data.results.length === PRODUCTS_PER_PAGE && data.page < data.totalPages);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  }, [q]);

  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
    loadProducts();
  }, [q, loadProducts]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      getSearchProducts({
        q,
        limit: PRODUCTS_PER_PAGE,
        offset: (nextPage - 1) * PRODUCTS_PER_PAGE,
      }).then((data) => {
        const normalized = data.results.map((p: unknown) =>
          normalizeProduct(p as AlgoliaProduct)
        );
        setProducts((prev) => [...prev, ...normalized]);
        setHasMore(data.results.length === PRODUCTS_PER_PAGE && data.page < data.totalPages);
        setLoadingMore(false);
      });
    }
  }, [q, page, loadingMore, hasMore]);

  if (loading) {
    return (
      <>
        <div className="mt-[53px] border-b border-primary p-8">
          <div className="h-8 w-64 bg-foreground animate-pulse mb-2" />
          <div className="h-4 w-32 bg-foreground animate-pulse" />
        </div>
        <ProductGridSkeleton />
      </>
    );
  }

  if (!q.trim()) {
    return (
      <div>
        <p className="text-lg opacity-70">
          Enter a search term to find products.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-[53px] border-b border-primary p-8">
        <h1 className="font-bold text-2xl mb-2">Search Results for "{q}"</h1>
        <p className="text-sm opacity-70">
          {total} product{total !== 1 ? "s" : ""} found
        </p>
      </div>

      {products.length === 0 ? (
        <div className="border border-primary p-8 text-center min-h-[50vh] flex flex-col items-center justify-center">
          <p className="opacity-70 mb-4">No products found for "{q}"</p>
          <p className="text-sm opacity-50">Try a different search term</p>
        </div>
      ) : (
        <>
          <ProductGrid products={products as any} />
          {loadingMore && <ProductGridSkeleton />}
          {hasMore && !loadingMore && (
            <div className="flex justify-center py-10 border-b border-primary">
              <Button onClick={loadMore}>See more products</Button>
            </div>
          )}
        </>
      )}
    </>
  );
}