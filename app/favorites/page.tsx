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
import ProductCard from "@/src/ui/ProductCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function FavoritesPage() {
  const [favorites] = useAtom(favoritesAtom);
  const [, toggleFavorite] = useAtom(toggleFavoriteAtom);
  const [, hydrateFavorites] = useAtom(hydrateFavoritesAtom);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, [favorites]);

  const handleToggleFavorite = (productId: string) => {
    toggleFavorite(productId);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-[49px]">
        <h1 className="font-bold text-2xl mb-8">My Favorites</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <UserSidebar activePage="favorites" />
          <main className="flex-1">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-gray-200 border border-primary"
                ></div>
              ))}
            </div>
          </main>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="relative">
                  <button
                    onClick={() => handleToggleFavorite(product.id)}
                    className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                    aria-label="Remove from favorites"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <ProductCard
                    id={product.id}
                    imageSrc={
                      product.images?.product?.[0] || "/placeholder.jpg"
                    }
                    title={product.name}
                    price={product.price}
                    alt={product.name}
                  />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
