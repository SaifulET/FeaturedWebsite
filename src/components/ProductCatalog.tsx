"use client";

import React, { useState } from "react";
import { ShoppingBag, Star, TrendingUp, AlertTriangle, CheckCircle2, Flame } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  category: "Nicotine Pouches" | "Cigars" | "Pipe Tobacco" | "Vapes";
  price: number;
  rating: number;
  reviewsCount: number;
  badge: "JUST SOLD" | "RESTOCKED" | "TRENDING" | "LOW STOCK" | "POPULAR";
  stockText: string;
  imageBg: string;
  description: string;
}

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "ZYN Nicotine pouches 3mg Spiced Cider",
    category: "Nicotine Pouches",
    price: 4.99,
    rating: 4.9,
    reviewsCount: 342,
    badge: "JUST SOLD",
    stockText: "12 cans sold in the last hour",
    imageBg: "from-amber-700/40 to-orange-950/60",
    description: "Limited seasonal cider spice flavor with 3mg smooth nicotine delivery.",
  },
  {
    id: "p2",
    name: "Acid Blondie Gold Cigars (Box of 40)",
    category: "Cigars",
    price: 12.50,
    rating: 4.8,
    reviewsCount: 189,
    badge: "RESTOCKED",
    stockText: "Fresh shipment just arrived",
    imageBg: "from-yellow-600/40 to-amber-950/60",
    description: "Infused with botanical essential oils & sweet herbal notes. Connecticut wrapper.",
  },
  {
    id: "p3",
    name: "VELO Plus Mind 6mg Spearmint",
    category: "Nicotine Pouches",
    price: 5.20,
    rating: 4.7,
    reviewsCount: 215,
    badge: "TRENDING",
    stockText: "#1 Top seller this week",
    imageBg: "from-emerald-700/40 to-teal-950/60",
    description: "Extra fresh spearmint burst with clean tobacco-free satisfaction.",
  },
  {
    id: "p4",
    name: "Good Stuff Natural Pipe Tobacco 5 Lb. Bag",
    category: "Pipe Tobacco",
    price: 29.99,
    rating: 4.9,
    reviewsCount: 512,
    badge: "LOW STOCK",
    stockText: "Only 4 bags left in stock",
    imageBg: "from-stone-700/40 to-neutral-950/60",
    description: "All-natural premium blend pipe tobacco crafted from flue-cured Virginia tobaccos.",
  },
  {
    id: "p5",
    name: "ZYN Nicotine pouches 6mg Wintergreen",
    category: "Nicotine Pouches",
    price: 4.99,
    rating: 5.0,
    reviewsCount: 620,
    badge: "POPULAR",
    stockText: "High demand item",
    imageBg: "from-teal-700/40 to-blue-950/60",
    description: "Crisp wintergreen taste with full 6mg nicotine strength pouch format.",
  },
  {
    id: "p6",
    name: "Drew Estate Liga Privada No. 9 Robusto",
    category: "Cigars",
    price: 18.75,
    rating: 4.9,
    reviewsCount: 144,
    badge: "LOW STOCK",
    stockText: "Rare hand-rolled allocation",
    imageBg: "from-red-900/40 to-zinc-950/60",
    description: "Aged 7 tobacco blend wrapped in Connecticut Broadleaf dark oily leaf.",
  },
  {
    id: "p7",
    name: "Mac Baren Navy Flake Pipe Tobacco 50g",
    category: "Pipe Tobacco",
    price: 14.90,
    rating: 4.8,
    reviewsCount: 98,
    badge: "RESTOCKED",
    stockText: "Imported fresh from Denmark",
    imageBg: "from-blue-900/40 to-indigo-950/60",
    description: "Burley and Virginia tobaccos lightly sweetened with honey flavor notes.",
  },
  {
    id: "p8",
    name: "Rogue Nicotine Pouches Mango 6mg",
    category: "Nicotine Pouches",
    price: 4.49,
    rating: 4.6,
    reviewsCount: 167,
    badge: "TRENDING",
    stockText: "20 pouches per can",
    imageBg: "from-orange-600/40 to-yellow-950/60",
    description: "Juicy tropical mango flavor combined with spit-free nicotine release.",
  },
];

interface ProductCatalogProps {
  searchQuery: string;
  onAddToCart: (product: Product) => void;
}

export default function ProductCatalog({ searchQuery, onAddToCart }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", "Nicotine Pouches", "Cigars", "Pipe Tobacco"];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === "ALL" || product.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Tabs Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-zinc-800 pb-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase flex items-center gap-2">
            Featured <span className="text-[var(--crimson)]">CMS Catalog</span>
          </h2>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Real-time stock indicators synced with top live ticker stream
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[var(--crimson)] text-white shadow-lg shadow-[var(--crimson)]/30"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Product Cards */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900/40 rounded-2xl border border-zinc-800">
          <p className="text-zinc-400 text-sm">No products found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--crimson)]/10 group"
            >
              <div>
                {/* Image Placeholder Banner */}
                <div
                  className={`h-44 w-full bg-gradient-to-br ${product.imageBg} relative p-4 flex flex-col justify-between overflow-hidden border-b border-zinc-800/50`}
                >
                  <div className="flex items-center justify-between z-10">
                    {/* Badge matched to CMS ticker */}
                    <span
                      className={`text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-md backdrop-blur-md border ${
                        product.badge === "JUST SOLD"
                          ? "bg-red-950/80 border-red-500/40 text-red-300"
                          : product.badge === "RESTOCKED"
                          ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                          : product.badge === "LOW STOCK"
                          ? "bg-amber-950/80 border-amber-500/40 text-amber-300"
                          : "bg-yellow-950/80 border-yellow-500/40 text-yellow-300"
                      }`}
                    >
                      ● {product.badge}
                    </span>

                    <span className="text-[10px] text-zinc-300 font-mono bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
                      {product.category}
                    </span>
                  </div>

                  {/* Dynamic Graphic Icon */}
                  <div className="self-center text-zinc-500/20 group-hover:scale-110 group-hover:text-white/20 transition-all duration-500">
                    <Flame className="w-16 h-16" />
                  </div>

                  <div className="z-10">
                    <span className="text-[10px] text-zinc-300 font-mono bg-black/60 backdrop-blur-md px-2 py-1 rounded-md block w-fit">
                      {product.stockText}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1 text-xs text-yellow-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" />
                    <span>{product.rating}</span>
                    <span className="text-zinc-500 text-[10px] font-normal">
                      ({product.reviewsCount})
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-[var(--gold)] transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Bottom Price & Add Button */}
              <div className="p-4 pt-0 border-t border-zinc-900 mt-2 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-mono block">Price</span>
                  <span className="text-lg font-bold font-mono text-white">${product.price.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => onAddToCart(product)}
                  className="bg-zinc-900 hover:bg-[var(--crimson)] text-white hover:text-white font-bold px-3.5 py-2 rounded-xl border border-zinc-700 hover:border-[var(--crimson)] transition-all flex items-center gap-1.5 text-xs shadow-md active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
