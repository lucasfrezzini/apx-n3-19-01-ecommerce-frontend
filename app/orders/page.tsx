"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { userAtom, tokenAtom } from "@/src/store/authAtoms";
import { getMyOrders } from "@/src/lib/api/orders";
import { Order } from "../../apiClient";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function OrdersPage() {
  const router = useRouter();
  const [user] = useAtom(userAtom);
  const [token] = useAtom(tokenAtom);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !user) {
      router.push("/");
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(token);
        setOrders(data.orders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, user, router]);

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

  if (!user || !token || loading) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-[49px]">
      <h1 className="font-bold text-2xl mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center opacity-70">You have no orders yet.</p>
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
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-4">
                {order.items.map((item: { productId: string; name: string; quantity: number; price: number }, index: number) => (
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
          ))}
        </div>
      )}
    </div>
  );
}
