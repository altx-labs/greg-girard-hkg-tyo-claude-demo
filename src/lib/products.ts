export type Product = {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number; // in HKD cents
  priceDisplay: string;
  category: "poster" | "book";
  status: "in_stock" | "pre_order";
  availableDate?: string;
  maxQty: number;
  image: string;
};

export const products: Product[] = [
  {
    id: "gg-p0001",
    code: "GG_P0001",
    name: "Exhibition Poster (Limited Edition)",
    description:
      "Limited edition poster from the Greg Girard: HKG-TYO 1974–2023 exhibition at WKM Gallery.",
    price: 45000,
    priceDisplay: "HKD 450",
    category: "poster",
    status: "in_stock",
    maxQty: 5,
    image: "/images/poster.jpg",
  },
  {
    id: "gg-b0001",
    code: "GG_B0001",
    name: "HK:PM — Hong Kong Night Life 1974–1989",
    description:
      "A photographic journey through Hong Kong's vibrant nightlife from 1974 to 1989.",
    price: 49000,
    priceDisplay: "HKD 490",
    category: "book",
    status: "pre_order",
    availableDate: "June 2026",
    maxQty: 3,
    image: "/images/hkpm.jpg",
  },
  {
    id: "gg-b0002",
    code: "GG_B0002",
    name: "City of Darkness Revisited",
    description:
      "The definitive photographic record of Kowloon Walled City before its demolition.",
    price: 72500,
    priceDisplay: "HKD 725",
    category: "book",
    status: "pre_order",
    availableDate: "May 2026",
    maxQty: 3,
    image: "/images/city-of-darkness.jpg",
  },
  {
    id: "gg-b0003",
    code: "GG_B0003",
    name: "JAL 76–88",
    description:
      "Photographs documenting Japan Airlines and the golden age of air travel, 1976–1988.",
    price: 69000,
    priceDisplay: "HKD 690",
    category: "book",
    status: "pre_order",
    availableDate: "June 2026",
    maxQty: 3,
    image: "/images/jal.jpg",
  },
  {
    id: "gg-b0004",
    code: "GG_B0004",
    name: "SNACK SAKURA",
    description:
      "An intimate look at Tokyo's snack bar culture through Greg Girard's lens.",
    price: 73000,
    priceDisplay: "HKD 730",
    category: "book",
    status: "pre_order",
    availableDate: "June 2026",
    maxQty: 3,
    image: "/images/snack-sakura.jpg",
  },
  {
    id: "gg-b0005",
    code: "GG_B0005",
    name: "AMERICAN STOPOVER",
    description:
      "Photographs of American life captured during stopovers between Asia assignments.",
    price: 69000,
    priceDisplay: "HKD 690",
    category: "book",
    status: "in_stock",
    maxQty: 3,
    image: "/images/american-stopover.jpg",
  },
  {
    id: "gg-b0006",
    code: "GG_B0006",
    name: "Under Vancouver 1972–1982",
    description:
      "Early work capturing Vancouver's underground scene in the 1970s and early 1980s.",
    price: 42000,
    priceDisplay: "HKD 420",
    category: "book",
    status: "pre_order",
    availableDate: "June 2026",
    maxQty: 3,
    image: "/images/under-vancouver.jpg",
  },
];

export const shippingOptions = [
  { id: "pickup", label: "Gallery Pickup (Free)", price: 0, priceDisplay: "Free" },
  { id: "local", label: "Local Delivery", price: 15000, priceDisplay: "HKD 150" },
  { id: "asia", label: "Asia Delivery", price: 125000, priceDisplay: "HKD 1,250" },
  { id: "international", label: "International Delivery", price: 180000, priceDisplay: "HKD 1,800" },
];
