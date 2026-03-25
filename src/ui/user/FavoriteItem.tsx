"use client";

import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import Button from "@/src/ui/Button";
import { addToCartAtom } from "@/src/store/cartAtoms";
import { toggleFavoriteAtom } from "@/src/store/favoritesAtom";

interface FavoriteItemProps {
  id: string;
  imageSrc: string;
  title: string;
  price: number;
  category?: string;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({
  id,
  imageSrc,
  title,
  price,
  category,
}) => {
  const [, addToCart] = useAtom(addToCartAtom);
  const [, toggleFavorite] = useAtom(toggleFavoriteAtom);

  const handleAddToCart = () => {
    addToCart({
      id,
      name: title,
      price,
      image: imageSrc,
    });
  };

  return (
    <div className="flex gap-4 p-4 border border-primary hover:bg-foreground/5 transition">
      {/* Image */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link href={`/details/${id}`} className="block">
          <h3 className="font-bold">{title}</h3>
        </Link>
        {category && (
          <p className="text-sm opacity-70">{category}</p>
        )}
      </div>

      {/* Price + Actions */}
      <div className="flex flex-col items-end justify-between">
        <span className="font-bold">${price}</span>
        <div className="flex gap-2">
          <Button
            variant="primary"
            onClick={handleAddToCart}
            className="px-4 py-2"
          >
            Add to cart
          </Button>
          <button
            onClick={() => toggleFavorite(id)}
            className="p-2 hover:text-red-500 transition"
            aria-label="Remove from favorites"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;