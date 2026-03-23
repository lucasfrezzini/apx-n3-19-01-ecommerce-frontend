"use client";

import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { drawerAtom, closeDrawerAtom } from "@/src/store/uiAtoms";
import { cartAtom } from "@/src/store/cartAtoms";

import CartList from "../cart/CartList";
import CartTotal from "../cart/CartTotal";

export default function CartDrawer() {
  const router = useRouter();
  const [drawer] = useAtom(drawerAtom);
  const [, closeDrawer] = useAtom(closeDrawerAtom);
  const [cart] = useAtom(cartAtom);

  const handleCheckout = () => {
    closeDrawer();
    router.push("/checkout");
  };

  return (
    <aside
      className={`
        fixed top-0 right-0 z-[63] h-screen w-[320px]
        bg-background/80 backdrop-blur-xl
        border-l border-primary
        p-[30px]
        flex flex-col
        transition-transform duration-300
        ${drawer === "cart" ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="flex justify-between mb-8">
        <span className="font-bold">Your Cart</span>
        <button onClick={closeDrawer}>✕</button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <CartList />
      </div>

      <div className="border-t border-primary pt-6 mt-6">
        <CartTotal />
        <button 
          onClick={handleCheckout} 
          className="w-full border border-primary py-3 font-bold hover:bg-primary hover:text-background transition"
          disabled={cart.length === 0}
        >
          Checkout
        </button>
      </div>
    </aside>
  );
}
