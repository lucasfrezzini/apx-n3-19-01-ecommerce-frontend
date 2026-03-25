"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom, tokenAtom } from "@/src/store/authAtoms";
import { getMyOrders } from "@/src/lib/api/orders";
import { Order } from "../../apiClient";
import Image from "next/image";
import UserSidebar from "@/src/ui/user/UserSidebar";
import OrdersListSkeleton from "@/src/ui/OrdersListSkeleton";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function OrdersPage() {
  const [user] = useAtom(userAtom);
  const [token] = useAtom(tokenAtom);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (authLoading) return;

    const fetchOrders = async () => {
      const tokenToUse = token || localStorage.getItem("auth:v1");

      if (!tokenToUse) {
        setLoading(false);
        return;
      }

      try {
        const data = await getMyOrders(tokenToUse);
        setOrders(data.orders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, authLoading]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "refunded":
        return "bg-orange-500";
      default:
        return "bg-yellow-500";
    }
  };

  if (authLoading || loading) {
    return (
      <div className="mt-[49px]">
        <h1 className="md:hidden font-bold text-2xl p-6 border-b border-primary">My Orders</h1>
        <div className="hidden md:block fixed top-[49px] left-64 z-30 bg-background w-[calc(100%-16rem)] border-b border-primary px-6 py-4">
          <span className="font-bold text-2xl">My Orders</span>
        </div>
        <div className="flex">
          <UserSidebar activePage="orders" />
          <main className="hidden md:block md:pl-72 flex-1 p-6">
            <OrdersListSkeleton />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[49px]">
      <h1 className="md:hidden font-bold text-2xl p-6 border-b border-primary">My Orders</h1>
      
      <div className="hidden md:block fixed top-[49px] left-64 z-30 bg-background w-[calc(100%-16rem)] border-b border-primary px-6 py-4">
        <span className="font-bold text-2xl">My Orders</span>
      </div>

      <div className="flex">
        <UserSidebar activePage="orders" />

        <main className="hidden md:block md:pl-72 flex-1 p-6">
          {orders.length === 0 ? (
            <div className="border border-primary p-8 text-center">
              <p className="opacity-70 mb-4">You have no orders yet.</p>
              <p className="text-sm opacity-50 mb-6">
                Start shopping to see your orders here!
              </p>
              <Link
                href="/store"
                className="inline-block px-6 py-3 bg-primary text-background font-bold hover:opacity-90 transition"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border border-primary p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-sm opacity-70">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-white text-sm ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.jpg"}
                            alt={item.name || "Product"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm">{item.name}</p>
                          <p className="text-sm opacity-70">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold">
                          ${(item.price || 0) * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-primary mt-4 pt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span>${order.totalPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}