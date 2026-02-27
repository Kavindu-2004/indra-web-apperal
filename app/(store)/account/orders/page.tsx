"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Order = {
  id: number;
  orderNumber: string;
  status: string;
  total: number;
  currency: string;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/account/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data || []);
        setLoading(false);
      })
      .catch(() => {
        setOrders([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-[900px] mx-auto px-6 py-16 space-y-8">
      <h1 className="text-3xl font-bold">My Orders</h1>

      {loading ? (
        <p className="text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="border rounded-xl p-4 bg-gray-50">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-xl p-4">
              <p className="font-semibold">{order.orderNumber}</p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className="text-sm mt-2">
                {order.currency} {order.total}
              </p>
              <p className="text-sm mt-1">Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}

      <Link
        href="/"
        className="inline-block mt-6 rounded-full border px-6 py-3 text-sm hover:bg-black hover:text-white transition"
      >
        Continue shopping
      </Link>
    </div>
  );
}