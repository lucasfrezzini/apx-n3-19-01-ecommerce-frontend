"use client";

import { FC } from "react";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { useAtom } from "jotai";
import { addToCartAtom } from "@/src/store/cartAtoms";
import { openCartAtom } from "../store/uiAtoms";
import { favoritesAtom, toggleFavoriteAtom, hydrateFavoritesAtom } from "@/src/store/favoritesAtom";

interface ProductCardProps {
  id: string;
  imageSrc: string;
  title: string;
  price: number;
  alt?: string;
  isNew?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  imageSrc,
  title,
  price,
  alt = "Product",
  isNew = false,
}) => {
  const [, addToCart] = useAtom(addToCartAtom);
  const [, openCart] = useAtom(openCartAtom);
  const [favorites] = useAtom(favoritesAtom);
  const [, toggleFavorite] = useAtom(toggleFavoriteAtom);
  const [, hydrateFavorites] = useAtom(hydrateFavoritesAtom);

  const isFavorite = favorites.includes(id);

  const handleAdd = () => {
    addToCart({
      id,
      name: title,
      price,
      image: imageSrc,
    });
    openCart();
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    hydrateFavorites();
    toggleFavorite(id);
  };

  return (
    <div className="w-full p-[30px] group bg-background relative">
      <button
        onClick={handleToggleFavorite}
        className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
            <path fillRule="evenodd" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 hover:text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        )}
      </button>

      <div className="aspect-square overflow-hidden mb-[15px]">
        <Link href={`/details/${id}`}>
          <Image
            src={imageSrc}
            alt={alt}
            width={2000}
            height={2000}
            className="
              w-full h-full object-cover
              group-hover:scale-110
              transition-transform duration-500 ease-in-out
              group-hover:duration-700
              border border-primary
            "
          />
        </Link>
      </div>

      <div className="flex items-start justify-between mt-4 mb-2">
        <h3 className="font-bold text-lg leading-tight flex-1 pr-4 text-balance">
          <Link href={`/details/${id}`}>{title}</Link>
        </h3>

        {isNew && <Button variant="secondary">New</Button>}
      </div>

      <div className="flex justify-between items-center mt-3">
        <span className="font-bold text-lg">${price}</span>

        <Button variant="primary" onClick={handleAdd} className="">
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
