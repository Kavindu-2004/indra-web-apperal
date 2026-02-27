"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image?: string | null;
  qty: number;
};

const CART_KEY = "indra_cart";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  function readCart(): CartItem[] {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function writeCart(next: CartItem[]) {
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    setItems(next);
  }

  useEffect(() => {
    setItems(readCart());
    setLoaded(true);
  }, []);

  const total = useMemo(() => {
    return items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }, [items]);

  function inc(id: number) {
    const next = items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
    writeCart(next);
  }

  function dec(id: number) {
    const next = items
      .map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
      .filter(Boolean);
    writeCart(next);
  }

  function removeItem(id: number) {
    const next = items.filter((i) => i.id !== id);
    writeCart(next);
  }

  function clearCart() {
    writeCart([]);
  }

  if (!loaded) return null;

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Cart</h1>
          <p className="text-gray-600 text-sm mt-1">
            Review your items before checkout.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/"
            className="rounded-full border px-5 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Continue shopping
          </Link>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="rounded-full border px-5 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Clear cart
            </button>
          )}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-2xl overflow-hidden">
            <div className="p-5 border-b font-semibold">Items</div>

            {items.length === 0 ? (
              <div className="p-8 text-gray-600">
                Your cart is empty.
                <div className="mt-4">
                  <Link
                    href="/category/new-arrivals"
                    className="inline-flex rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90"
                  >
                    Shop New Arrivals
                  </Link>
                </div>
              </div>
            ) : (
              <div className="divide-y">
                {items.map((i) => (
                  <div key={i.id} className="p-5 flex gap-4">
                    <div className="w-20 h-24 rounded-xl border bg-gray-50 overflow-hidden flex items-center justify-center">
                      {i.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={i.image}
                          alt={i.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No image</span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-medium">{i.name}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            Rs {i.price.toLocaleString()}
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(i.id)}
                          className="text-sm text-gray-600 hover:text-black"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => dec(i.id)}
                            className="w-9 h-9 rounded-full border hover:bg-gray-50"
                          >
                            −
                          </button>
                          <div className="min-w-10 text-center font-medium">
                            {i.qty}
                          </div>
                          <button
                            onClick={() => inc(i.id)}
                            className="w-9 h-9 rounded-full border hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>

                        <div className="font-semibold">
                          Rs {(i.price * i.qty).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white border rounded-2xl p-6 sticky top-6">
            <h2 className="font-semibold text-lg">Order Summary</h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>Rs {total.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className="text-gray-600">Calculated at checkout</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span>Rs {total.toLocaleString()}</span>
              </div>
            </div>

            {/* ✅ FIX: Navigate to /checkout */}
            {items.length === 0 ? (
              <button
                disabled
                className="mt-6 w-full rounded-full bg-black text-white px-6 py-3 text-sm font-medium opacity-50 cursor-not-allowed"
              >
                Checkout (next step)
              </button>
            ) : (
              <Link href="/checkout" className="block mt-6">
                <button
                  type="button"
                  className="w-full rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90 active:scale-[0.98]"
                >
                  Checkout (next step)
                </button>
              </Link>
            )}

            <p className="text-xs text-gray-500 mt-3">
              Next we’ll build checkout → create order → admin order status + tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}