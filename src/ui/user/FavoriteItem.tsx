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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a2.25 2.25 0 00-2.244-2.077L4.772 5.79m-8.486 0a2.25 2.25 0 00-2.244 2.077L4.772 5.79"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;