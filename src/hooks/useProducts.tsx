"use client";

import { useEffect, useState, useCallback } from "react";
import { Product, getProducts, getSearchProducts } from "../lib/api/products";

const PRODUCTS_PER_PAGE = 9;

export function useProducts(params?: { category?: string; search?: string }) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      if (params?.search && params.search.trim()) {
        const data = await getSearchProducts({
          q: params.search,
          category: params.category,
          limit: PRODUCTS_PER_PAGE,
          offset: 0,
        });
        setAllProducts(data.results);
        setProducts(data.results);
        setHasMore(data.page < data.totalPages);
      } else {
        const data = await getProducts({ category: params?.category });
        setAllProducts(data);
        const initialProducts = data.slice(0, PRODUCTS_PER_PAGE);
        setProducts(initialProducts);
        setHasMore(data.length > PRODUCTS_PER_PAGE);
      }
    } finally {
      setLoading(false);
    }
  }, [params?.category, params?.search]);

  useEffect(() => {
    setPage(1);
    setAllProducts([]);
    setProducts([]);
    setHasMore(true);
    loadProducts();
  }, [params?.category, params?.search, loadProducts]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      if (params?.search && params.search.trim()) {
        const nextPage = page + 1;
        setPage(nextPage);
        getSearchProducts({
          q: params.search,
          category: params.category,
          limit: PRODUCTS_PER_PAGE,
          offset: (nextPage - 1) * PRODUCTS_PER_PAGE,
        }).then((data) => {
          setProducts((prev) => [...prev, ...data.results]);
          setHasMore(data.page < data.totalPages);
          setLoadingMore(false);
        });
      } else {
        const nextPage = page + 1;
        setPage(nextPage);
        const start = (nextPage - 1) * PRODUCTS_PER_PAGE;
        const end = nextPage * PRODUCTS_PER_PAGE;
        const newProducts = allProducts.slice(start, end);
        setProducts((prev) => [...prev, ...newProducts]);
        setHasMore(end < allProducts.length);
        setLoadingMore(false);
      }
    }
  }, [
    page,
    loadingMore,
    hasMore,
    allProducts,
    params?.category,
    params?.search,
  ]);

  return { products, loading, loadingMore, hasMore, loadMore };
}
