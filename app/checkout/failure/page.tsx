"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { userAtom } from "@/src/store/authAtoms";
import Link from "next/link";

function CheckoutFailureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user] = useAtom(userAtom);
  
  const [loading, setLoading] = useState(true);

  const paymentId = searchParams.get("payment_id");

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
    setLoading(false);
  }, [user, router]);

  if (!user || loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-[49px] text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="font-bold text-2xl mb-2">Payment Failed</h1>
        <p className="opacity-70">There was an issue processing your payment. Please try again.</p>
        {paymentId && (
          <p className="text-sm opacity-50 mt-2">Payment ID: {paymentId}</p>
        )}
      </div>

      <div className="flex gap-4 justify-center">
        <Link href="/checkout" className="px-6 py-3 border border-primary font-bold hover:bg-primary hover:text-background transition">
          Try Again
        </Link>
        <Link href="/" className="px-6 py-3 bg-primary text-background font-bold hover:opacity-90 transition">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutFailurePage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <CheckoutFailureContent />
    </Suspense>
  );
}
