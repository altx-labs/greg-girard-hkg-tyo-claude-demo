import type { Metadata } from "next";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

export const metadata: Metadata = {
  title: "Greg Girard: HKG–TYO 1974–2023 — WKM Gallery",
  description:
    "Exhibition merchandise from Greg Girard: HKG–TYO 1974–2023 at WKM Gallery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
