"use client";

import { FC } from "react";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { useAtom } from "jotai";
import { addToCartAtom } from "@/src/store/cartAtoms";
import { openCartAtom } from "../store/uiAtoms";

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

  const handleAdd = () => {
    addToCart({
      id,
      name: title,
      price,
      image: imageSrc,
    });
    openCart();
  };

  return (
    <div className="w-full p-[30px] group bg-background">
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
