"use client";

import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { cartAtom, CartItem } from "@/src/store/cartAtoms";
import { userAtom, tokenAtom } from "@/src/store/authAtoms";
import { createOrder, ShippingAddress } from "@/src/lib/api/orders";
import Button from "@/src/ui/Button";
import Image from "next/image";
import UserSidebar from "@/src/ui/user/UserSidebar";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart] = useAtom(cartAtom);
  const [user] = useAtom(userAtom);
  const [token] = useAtom(tokenAtom);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  const [address, setAddress] = useState<ShippingAddress>({
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    postalCode: user?.address?.postalCode || "",
    country: user?.address?.country || "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (authLoading) return;

    const tokenToUse = token || localStorage.getItem("auth:v1");
    if (!tokenToUse || !user) {
      router.push("/");
    }
  }, [token, user, router, authLoading]);

  useEffect(() => {
    if (user?.address) {
      setAddress({
        street: user.address.street || "",
        city: user.address.city || "",
        state: user.address.state || "",
        postalCode: user.address.postalCode || "",
        country: user.address.country || "",
      });
    }
  }, [user]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    if (!address.street || !address.city || !address.state || !address.postalCode || !address.country) {
      setError("Please fill in all address fields");
      return;
    }

    setLoading(true);
    setError("");

    const tokenToUse = token || localStorage.getItem("auth:v1");

    try {
      const items = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        image: item.image,
      }));

      const result = await createOrder(tokenToUse!, { items, shippingAddress: address });
      
      if (result.paymentUrl) {
        window.location.href = result.paymentUrl;
      } else {
        router.push("/orders");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-[49px]">
      <h1 className="font-bold text-2xl mb-8">Checkout</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <UserSidebar activePage="checkout" />

        <main className="flex-1">
          {cart.length === 0 ? (
            <div className="border border-primary p-8 text-center">
              <p className="opacity-70 mb-4">Your cart is empty.</p>
              <p className="text-sm opacity-50 mb-6">Add some products to your cart first!</p>
              <Link href="/store" className="inline-block px-6 py-3 bg-primary text-background font-bold hover:opacity-90 transition">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Shipping Address */}
              <div>
                <h2 className="font-bold text-lg mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-1">Street</label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => handleInputChange("street", e.target.value)}
                      className="w-full border-b border-primary py-2 px-0 bg-transparent outline-none"
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">City</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="w-full border-b border-primary py-2 px-0 bg-transparent outline-none"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">State</label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="w-full border-b border-primary py-2 px-0 bg-transparent outline-none"
                      placeholder="State"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={address.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                        className="w-full border-b border-primary py-2 px-0 bg-transparent outline-none"
                        placeholder="Postal code"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-1">Country</label>
                      <input
                        type="text"
                        value={address.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        className="w-full border-b border-primary py-2 px-0 bg-transparent outline-none"
                        placeholder="Country"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h2 className="font-bold text-lg mb-4">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image}
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

                <div className="border-t border-primary pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

                <Button
                  onClick={handlePlaceOrder}
                  disabled={loading || cart.length === 0}
                  className="w-full mt-6"
                >
                  {loading ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
