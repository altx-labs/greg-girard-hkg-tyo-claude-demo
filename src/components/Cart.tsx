"use client";

import { useCart } from "@/lib/cart";
import { shippingOptions } from "@/lib/products";
import { useState } from "react";

function formatHKD(cents: number) {
  return `HKD ${(cents / 100).toLocaleString("en-HK", { minimumFractionDigits: 2 })}`;
}

export function Cart() {
  const { items, shipping, setShipping, updateQuantity, removeItem, subtotal } =
    useCart();
  const [loading, setLoading] = useState(false);

  const shippingCost =
    shippingOptions.find((o) => o.id === shipping)?.price ?? 0;
  const total = subtotal + shippingCost;

  async function handleCheckout() {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
          })),
          shipping,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-sm text-neutral-500 py-8 text-center">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.product.id}
          className="flex items-start justify-between py-3 border-b border-neutral-200"
        >
          <div className="flex-1 min-w-0 pr-4">
            <p className="text-sm font-medium truncate">{item.product.name}</p>
            <p className="text-xs text-neutral-500">
              {item.product.priceDisplay} each
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="w-6 h-6 flex items-center justify-center border border-neutral-300 text-xs hover:bg-neutral-100"
            >
              −
            </button>
            <span className="text-sm w-4 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              disabled={item.quantity >= item.product.maxQty}
              className="w-6 h-6 flex items-center justify-center border border-neutral-300 text-xs hover:bg-neutral-100 disabled:opacity-30"
            >
              +
            </button>
            <button
              onClick={() => removeItem(item.product.id)}
              className="ml-2 text-xs text-neutral-400 hover:text-neutral-700"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="pt-2">
        <label className="text-xs font-medium text-neutral-600 uppercase tracking-wide">
          Shipping
        </label>
        <div className="mt-2 space-y-1.5">
          {shippingOptions.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="radio"
                name="shipping"
                value={opt.id}
                checked={shipping === opt.id}
                onChange={() => setShipping(opt.id)}
                className="accent-neutral-900"
              />
              <span>{opt.label}</span>
              <span className="text-neutral-500 ml-auto">{opt.priceDisplay}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-3 space-y-1">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatHKD(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{formatHKD(shippingCost)}</span>
        </div>
        <div className="flex justify-between text-sm font-medium pt-1 border-t border-neutral-100">
          <span>Total</span>
          <span>{formatHKD(total)}</span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full py-2.5 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 disabled:bg-neutral-400 transition-colors"
      >
        {loading ? "Redirecting…" : "Checkout with Stripe"}
      </button>
    </div>
  );
}
