"use client";

import { useAtom } from "jotai";
import { cartAtom } from "@/store/cartAtoms";
import CartItem from "./CartItem";

export default function CartList() {
  const [cart] = useAtom(cartAtom);

  if (!cart.length) {
    return <div className="text-sm opacity-60">Your cart is empty</div>;
  }

  return (
    <div className="flex flex-col gap-6 pr-2">
      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}
