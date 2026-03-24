"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { userAtom, tokenAtom } from "@/src/store/authAtoms";
import { cartAtom } from "@/src/store/cartAtoms";
import Image from "next/image";
import Link from "next/link";

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user] = useAtom(userAtom);
  const [token] = useAtom(tokenAtom);
  const [, clearCart] = useAtom(cartAtom);
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);

  const paymentId = searchParams.get("payment_id") || searchParams.get("collection_id") || searchParams.get("merchant_order_id");

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (authLoading) return;

    const fetchOrder = async () => {
      if (!paymentId) {
        setLoading(false);
        return;
      }

      const tokenToUse = token || localStorage.getItem("auth:v1");
      
      if (!tokenToUse) {
        if (!paymentId) {
          router.push("/");
          return;
        }
        setLoading(false);
        return;
      }

      try {
        const orders = await getMyOrders(tokenToUse);
        const foundOrder = orders.orders.find((o: any) => 
          o.paymentId === paymentId || 
          o.paymentId === `mercadopago_${paymentId}`
        );
        
        if (foundOrder) {
          setOrder(foundOrder);
          clearCart([]);
          localStorage.removeItem("cart:v1");
        }
      } catch (err) {
        console.error("Failed to fetch order:", err);
      }
      setLoading(false);
    };

    fetchOrder();
  }, [token, paymentId, authLoading, router, clearCart]);

  const isLoading = loading || authLoading;

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 mt-[49px] text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-bold text-2xl mb-2">Processing Payment...</h1>
          <p className="opacity-70">Please wait while we confirm your payment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-[49px] text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-bold text-2xl mb-2">Payment Successful!</h1>
        <p className="opacity-70">Thank you for your order. We'll process it soon.</p>
        {paymentId && (
          <p className="text-sm opacity-50 mt-2">Payment ID: {paymentId}</p>
        )}
      </div>

      {order ? (
        <div className="border border-primary p-6 text-left mb-8">
          <h2 className="font-bold text-lg mb-4">Order Summary</h2>
          <div className="space-y-4">
            {order.items.map((item: any, index: number) => (
              <div key={index} className="flex gap-4">
                <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100">
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
      ) : (
        <div className="border border-primary p-6 text-left mb-8 bg-yellow-50">
          <p className="text-yellow-800">
            Your payment was processed but we couldn't retrieve the order details. 
            Please check your orders below.
          </p>
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

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto p-6 mt-[49px] text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-bold text-2xl mb-2">Processing...</h1>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}