"use client";

import Image from "next/image";
import { CartItem as Item } from "@/src/store/cartAtoms";
import { useAtom } from "jotai";
import { updateQtyAtom, removeFromCartAtom } from "@/src/store/cartAtoms";

type Props = {
  item: Item;
};

export default function CartItem({ item }: Props) {

  const [, updateQty] = useAtom(updateQtyAtom);
  const [, removeItem] = useAtom(removeFromCartAtom);

  const inc = () => {
    updateQty({ id: item.id, quantity: item.quantity + 1 });
  };

  const dec = () => {
    if (item.quantity === 1) {
      removeItem(item.id);
    } else {
      updateQty({ id: item.id, quantity: item.quantity - 1 });
    }
  };

  return (
    <div className="flex gap-4">
      <div className="relative size-20 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover bg-foreground"
        />
      </div>

      <div className="flex flex-col flex-1">
        <span className="font-bold text-sm">{item.name}</span>

        <span className="text-sm opacity-70">${item.price}</span>

        <div className="flex items-center gap-2 mt-2">
          <button onClick={dec} className="border border-primary px-2">
            −
          </button>

          <span>{item.quantity}</span>

          <button onClick={inc} className="border border-primary px-2">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
