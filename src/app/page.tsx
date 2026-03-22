"use client";

import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { useCart } from "@/lib/cart";
import { useState } from "react";

export default function Home() {
  const { totalItems } = useCart();
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-medium tracking-tight">
              Greg Girard: HKG–TYO 1974–2023
            </h1>
            <p className="text-xs text-neutral-500">WKM Gallery</p>
          </div>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative text-sm px-3 py-1.5 border border-neutral-300 hover:bg-neutral-100 transition-colors"
          >
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-neutral-900 text-white text-[10px] rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {showCart ? (
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium">Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-sm text-neutral-500 hover:text-neutral-900"
              >
                &larr; Continue shopping
              </button>
            </div>
            <Cart />
          </div>
        ) : (
          <>
            <section className="mb-12">
              <p className="text-sm text-neutral-600 max-w-xl leading-relaxed">
                Exhibition merchandise and publications by Greg Girard. Select
                items below and proceed to checkout. Pre-order items will ship on
                their listed availability date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-4">
                Limited Edition
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products
                  .filter((p) => p.category === "poster")
                  .map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
              </div>
            </section>

            <section>
              <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-4">
                Publications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products
                  .filter((p) => p.category === "book")
                  .map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="border-t border-neutral-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-neutral-400">
          &copy; {new Date().getFullYear()} WKM Gallery. All prices in HKD.
        </div>
      </footer>
    </div>
  );
}
