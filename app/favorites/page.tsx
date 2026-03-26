"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import {
  favoritesAtom,
  toggleFavoriteAtom,
  hydrateFavoritesAtom,
} from "@/src/store/favoritesAtom";
import { userAtom, tokenAtom } from "@/src/store/authAtoms";
import { openAuthAtom } from "@/src/store/uiAtoms";
import { apiClient, Product } from "../../apiClient";
import UserSidebar from "@/src/ui/user/UserSidebar";
import FavoritesListSkeleton from "@/src/ui/FavoritesListSkeleton";
import FavoriteItem from "@/src/ui/user/FavoriteItem";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function FavoritesPage() {
  const router = useRouter();
  const [user] = useAtom(userAtom);
  const [token] = useAtom(tokenAtom);
  const [favorites] = useAtom(favoritesAtom);
  const [, toggleFavorite] = useAtom(toggleFavoriteAtom);
  const [, hydrateFavorites] = useAtom(hydrateFavoritesAtom);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [, openAuth] = useAtom(openAuthAtom);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (authLoading) return;

    const tokenToUse = token || localStorage.getItem("auth:v1");
    if (!tokenToUse || !user) {
      setNeedsAuth(true);
    }
  }, [token, user, authLoading]);

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

  if (needsAuth) {
    return (
      <div className="mt-[49px]">
        <h1 className="md:hidden font-bold text-2xl p-6 border-b border-primary">My Favorites</h1>
        <div className="hidden md:block fixed top-[49px] left-0 z-30 bg-background w-full border-b border-primary px-6 py-4">
          <span className="font-bold text-2xl">My Favorites</span>
        </div>
        <main className="p-6 pt-[85px] md:pt-[89px]">
          <div className="border border-primary p-8 text-center max-w-md mx-auto">
            <h2 className="font-bold text-xl mb-4">Login Required</h2>
            <p className="opacity-70 mb-6">You need to be logged in to view your favorites.</p>
            <button onClick={openAuth} className="px-6 py-3 bg-primary text-background font-bold hover:opacity-90 transition">
              Login
            </button>
            <p className="text-sm mt-4 opacity-70">
              Don't have an account? <button className="underline" onClick={openAuth}>Create one</button>
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (authLoading || loading) {
    return (
      <div className="mt-[49px]">
        <h1 className="md:hidden font-bold text-2xl p-6 border-b border-primary">My Favorites</h1>
        <div className="hidden md:block fixed top-[49px] left-64 z-30 bg-background w-[calc(100%-16rem)] border-b border-primary px-6 py-4">
          <span className="font-bold text-2xl">My Favorites</span>
        </div>
        <main className="md:hidden p-6 pt-4">
          <FavoritesListSkeleton />
        </main>
        <div className="hidden md:flex">
          <UserSidebar activePage="favorites" />
          <main className="md:pl-72 flex-1 p-6 pt-[89px]">
            <FavoritesListSkeleton />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[49px]">
      <h1 className="md:hidden font-bold text-2xl p-6 border-b border-primary">My Favorites</h1>
      
      <div className="hidden md:block fixed top-[49px] left-64 z-30 bg-background w-[calc(100%-16rem)] border-b border-primary px-6 py-4">
        <span className="font-bold text-2xl">My Favorites</span>
      </div>

      <main className="md:hidden p-6 pt-4">
        {products.length === 0 ? (
          <div className="border border-primary p-8 text-center">
            <p className="opacity-70 mb-4">You have no favorites yet.</p>
            <p className="text-sm opacity-50 mb-6">Start adding some products to your favorites!</p>
            <Link href="/store" className="inline-block px-6 py-3 bg-primary text-background font-bold hover:opacity-90 transition">Browse Products</Link>
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

      <div className="hidden md:flex">
        <UserSidebar activePage="favorites" />
        <main className="md:pl-72 flex-1 p-6 pt-[89px]">
          {products.length === 0 ? (
            <div className="border border-primary p-8 text-center">
              <p className="opacity-70 mb-4">You have no favorites yet.</p>
              <p className="text-sm opacity-50 mb-6">Start adding some products to your favorites!</p>
              <Link href="/store" className="inline-block px-6 py-3 bg-primary text-background font-bold hover:opacity-90 transition">Browse Products</Link>
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