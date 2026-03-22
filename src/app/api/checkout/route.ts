import Stripe from "stripe";
import { NextResponse } from "next/server";
import { products, shippingOptions } from "@/lib/products";

export const dynamic = "force-dynamic";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, shipping } = body as {
      items: { productId: string; quantity: number }[];
      shipping: string;
    };

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.productId}` },
          { status: 400 }
        );
      }
      if (item.quantity < 1 || item.quantity > product.maxQty) {
        return NextResponse.json(
          { error: `Invalid quantity for ${product.name}` },
          { status: 400 }
        );
      }
      lineItems.push({
        price_data: {
          currency: "hkd",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      });
    }

    const shippingOption = shippingOptions.find((o) => o.id === shipping);
    if (!shippingOption) {
      return NextResponse.json(
        { error: "Invalid shipping option" },
        { status: 400 }
      );
    }

    if (shippingOption.price > 0) {
      lineItems.push({
        price_data: {
          currency: "hkd",
          product_data: {
            name: shippingOption.label,
          },
          unit_amount: shippingOption.price,
        },
        quantity: 1,
      });
    }

    const origin = new URL(request.url).origin;

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
