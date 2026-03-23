"use client";

import { useAtom } from "jotai";
import { cartTotalAtom } from "@/src/store/cartAtoms";

export default function CartTotal() {
  const [total] = useAtom(cartTotalAtom);

  return (
    <div className="flex justify-between font-bold mb-4">
      <span>Total</span>
      <span>${total.toFixed(2)}</span>
    </div>
  );
}
