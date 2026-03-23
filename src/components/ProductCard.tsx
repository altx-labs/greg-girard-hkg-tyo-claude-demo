"use client";

import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const inCart = items.find((i) => i.product.id === product.id);
  const atMax = inCart ? inCart.quantity >= product.maxQty : false;

  return (
    <div className="group flex flex-col">
      <div className="aspect-[3/4] bg-neutral-100 mb-3 overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-sm font-medium leading-tight mb-1">{product.name}</h3>
      <p className="text-xs text-neutral-500 mb-2 line-clamp-2">
        {product.description}
      </p>
      <div className="mt-auto flex items-center justify-between">
        <div>
          <span className="text-sm font-medium">{product.priceDisplay}</span>
          {product.status === "pre_order" && (
            <span className="ml-2 text-xs text-neutral-500">
              Pre-order · {product.availableDate}
            </span>
          )}
        </div>
        <button
          onClick={() => addItem(product)}
          disabled={atMax}
          className="text-xs px-3 py-1.5 bg-neutral-900 text-white hover:bg-neutral-700 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
        >
          {atMax ? "Max qty" : inCart ? "Add more" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
