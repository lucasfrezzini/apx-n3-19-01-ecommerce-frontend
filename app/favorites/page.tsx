"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  favoritesAtom,
  toggleFavoriteAtom,
  hydrateFavoritesAtom,
} from "@/src/store/favoritesAtom";
import { apiClient, Product } from "../../apiClient";
import UserSidebar from "@/src/ui/user/UserSidebar";
import FavoritesListSkeleton from "@/src/ui/FavoritesListSkeleton";
import FavoriteItem from "@/src/ui/user/FavoriteItem";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function FavoritesPage() {
  const [favorites] = useAtom(favoritesAtom);
  const [, toggleFavorite] = useAtom(toggleFavoriteAtom);
  const [, hydrateFavorites] = useAtom(hydrateFavoritesAtom);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    hydrateFavorites();
  }, [hydrateFavorites]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (favorites.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        const productPromises = favorites.map((id) =>
          apiClient.getProductById(id),
        );
        const results = await Promise.all(productPromises);

        const fetchedProducts = results
          .filter(
            (result): result is { success: true; product: Product } =>
              result.success && "product" in result,
          )
          .map((result) => result.product);

        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [favorites, authLoading]);

  const handleToggleFavorite = (productId: string) => {
    toggleFavorite(productId);
  };

  if (authLoading || loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-[49px]">
        <h1 className="font-bold text-2xl mb-8">My Favorites</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <UserSidebar activePage="favorites" />
          <FavoritesListSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-[49px]">
      <h1 className="font-bold text-2xl mb-8">My Favorites</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <UserSidebar activePage="favorites" />

        <main className="flex-1">
          {products.length === 0 ? (
            <div className="border border-primary p-8 text-center">
              <p className="opacity-70 mb-4">You have no favorites yet.</p>
              <p className="text-sm opacity-50 mb-6">
                Start adding some products to your favorites!
              </p>
              <Link
                href="/store"
                className="inline-block px-6 py-3 bg-primary text-background font-bold hover:opacity-90 transition"
              >
                Browse Products
              </Link>
            </div>
           ) : (
             <div className="space-y-4">
               {products.map((product) => (
                 <FavoriteItem
                   key={product.id}
                   id={product.id}
                   imageSrc={product.images?.product?.[0] || "/placeholder.jpg"}
                   title={product.name}
                   price={product.price}
                   category={product.category}
                 />
               ))}
             </div>
          )}
        </main>
      </div>
    </div>
  );
}
