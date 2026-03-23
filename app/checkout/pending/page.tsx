"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { userAtom, tokenAtom } from "@/src/store/authAtoms";
import Image from "next/image";
import Link from "next/link";

function CheckoutPendingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user] = useAtom(userAtom);
  const [token] = useAtom(tokenAtom);
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const paymentId = searchParams.get("payment_id");

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    const fetchOrder = async () => {
      if (paymentId && token) {
        try {
          const orders = await getMyOrders(token);
          const foundOrder = orders.orders.find((o: any) => o.paymentId === paymentId);
          if (foundOrder) {
            setOrder(foundOrder);
          }
        } catch (err) {
          console.error("Failed to fetch order:", err);
        }
      }
      setLoading(false);
    };

    fetchOrder();
  }, [user, router, paymentId, token]);

  if (!user || loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-[49px] text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="font-bold text-2xl mb-2">Payment Pending</h1>
        <p className="opacity-70">Your payment is being processed. We'll notify you once it's confirmed.</p>
        {paymentId && (
          <p className="text-sm opacity-50 mt-2">Payment ID: {paymentId}</p>
        )}
      </div>

      {order && (
        <div className="border border-primary p-6 text-left mb-8">
          <h2 className="font-bold text-lg mb-4">Order Summary</h2>
          <div className="space-y-4">
            {order.items.map((item: any, index: number) => (
              <div key={index} className="flex gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={item.productId}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-sm opacity-70">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-primary mt-4 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>${order.totalPrice}</span>
          </div>
        </div>
      )}

      <div className="flex gap-4 justify-center">
        <Link href="/orders" className="px-6 py-3 border border-primary font-bold hover:bg-primary hover:text-background transition">
          View My Orders
        </Link>
        <Link href="/" className="px-6 py-3 bg-primary text-background font-bold hover:opacity-90 transition">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

async function getMyOrders(token: string) {
  const { getMyOrders } = await import("@/src/lib/api/orders");
  return getMyOrders(token);
}

export default function CheckoutPendingPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <CheckoutPendingContent />
    </Suspense>
  );
}
