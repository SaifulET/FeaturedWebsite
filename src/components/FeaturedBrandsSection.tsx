"use client";

import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

export interface BrandItem {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  productCount?: number;
}

const FEATURED_BRANDS: BrandItem[] = [
  {
    id: "velo",
    name: "Velo",
    slug: "velo",
    logoUrl: "https://smokenza.s3.us-east-1.amazonaws.com/uploads/1778534445176-Velo.webp",
    productCount: 14
  },
  {
    id: "geek-bar",
    name: "Geek Bar",
    slug: "geek-bar",
    logoUrl: "https://smokenza.s3.us-east-1.amazonaws.com/uploads/1769373108320-GEEK-BAR-Logo-Vape.png",
    productCount: 28
  },
  {
    id: "alec-bradley",
    name: "Alec Bradley",
    slug: "alec-bradley",
    logoUrl: "https://smokenza.s3.us-east-1.amazonaws.com/uploads/1771113943245-alec-bradley.png",
    productCount: 19
  },
  {
    id: "acid",
    name: "Acid",
    slug: "acid",
    logoUrl: "https://smokenza.s3.us-east-1.amazonaws.com/uploads/1776191641693-ACID_CIGARS-ICON_LOGO_COLOR.png",
    productCount: 32
  },
  {
    id: "juul",
    name: "JUUL",
    slug: "juul",
    logoUrl: "https://smokenza.s3.us-east-1.amazonaws.com/uploads/1764786357106-JUUL_Logo_2018.jpg",
    productCount: 12
  },
  {
    id: "breeze",
    name: "Breeze",
    slug: "breeze",
    logoUrl: "https://smokenza.s3.us-east-1.amazonaws.com/uploads/1764603699331-Breeze.png",
    productCount: 22
  },
  {
    id: "zen",
    name: "Zen",
    slug: "zen",
    logoUrl: "https://smokenza.s3.us-east-1.amazonaws.com/uploads/1764600533278-zen.jpg",
    productCount: 15
  },
  {
    id: "white-owl",
    name: "White Owl",
    slug: "white-owl",
    logoUrl: "https://smokenza.s3.us-east-1.amazonaws.com/uploads/1764603852638-WO.webp",
    productCount: 26
  },
  {
    id: "swisher-sweets",
    name: "Swisher Sweets",
    slug: "swisher-sweets",
    logoUrl: "https://smokenza.s3.us-east-1.amazonaws.com/uploads/1764600379596-SwishersSweet.png",
    productCount: 30
  },
  {
    id: "loose-leaf",
    name: "Loose Leaf",
    slug: "loose-leaf",
    logoUrl: "https://smokenza.s3.us-east-1.amazonaws.com/uploads/1764601664715-looseLeaf.webp",
    productCount: 18
  },
  {
    id: "billionaire",
    name: "Billionaire",
    slug: "billionaire",
    logoUrl: "https://smokenza.s3.us-east-1.amazonaws.com/uploads/1764603557752-Billionaire.webp",
    productCount: 11
  },
  {
    id: "backwoods",
    name: "Backwoods",
    slug: "backwoods",
    logoUrl: "https://smokenza.s3.us-east-1.amazonaws.com/uploads/1764600456540-backwoods.png",
    productCount: 45
  },
  {
    id: "al-fakher",
    name: "Al Fakher",
    slug: "al-fakher",
    logoUrl: "https://smokenza.s3.us-east-1.amazonaws.com/uploads/1771113867667-al-fakher-logo.webp",
    productCount: 37
  },
  {
    id: "4-kings",
    name: "4 Kings",
    slug: "4-kings",
    logoUrl: "https://smokenza.s3.us-east-1.amazonaws.com/uploads/1764603529522-4kings.webp",
    productCount: 16
  }
];

// Duplicated list for seamless infinite loop right to left
const LOOPING_BRANDS = [...FEATURED_BRANDS, ...FEATURED_BRANDS];

interface FeaturedBrandsProps {
  onSelectBrand?: (brandName: string) => void;
}

export default function FeaturedBrandsSection({ onSelectBrand }: FeaturedBrandsProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="hard-border-b bg-[var(--ink)] py-10 relative">
      <div className="mx-auto max-w-[1440px] px-3 sm:px-5 lg:px-6">
        {/* Header Row */}
        <div
          className="mb-5 flex flex-col gap-2 border-b-2 pb-2 sm:flex-row sm:items-end sm:justify-between"
          style={{ borderColor: "var(--line, rgba(255, 255, 255, 0.12))" }}
        >
          <div className="min-w-0">
            <div
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: "var(--crimson)" }}
            >
              <span
                className="pulse-dot inline-block h-1.5 w-1.5 shrink-0 rounded-full animate-pulse"
                style={{ background: "var(--crimson)", boxShadow: "0 0 6px var(--crimson)" }}
              />
              <span className="truncate">Stocked Here</span>
            </div>
            <h3 className="font-display mt-1 text-2xl font-bold leading-none sm:text-3xl text-white">
              Featured Brands
            </h3>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Auto-scroll toggle control button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono uppercase tracking-wider text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors flex items-center gap-1.5"
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" /> Resume Motion
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 text-amber-400 fill-amber-400" /> Pause Motion
                </>
              )}
            </button>

            <a
              className="shrink-0 text-[11px] font-bold uppercase tracking-widest transition-colors hover:text-[var(--crimson)] text-zinc-400 sm:text-xs flex items-center gap-1"
              href="#catalog"
            >
              <span>139 brands · See all</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Marquee Infinite Auto-Scroll Track (Slow right to left) */}
        <div className="hard-border-2 overflow-hidden bg-zinc-950/90 border border-zinc-800 rounded-xl relative group">
          <div
            className="marquee-track-slow"
            style={{
              animationPlayState: isPaused ? "paused" : undefined,
              animationDuration: "60s" // Extra slow & smooth scrolling speed
            }}
          >
            {LOOPING_BRANDS.map((brand, idx) => (
              <button
                key={`${brand.id}-${idx}`}
                type="button"
                onClick={() => {
                  if (onSelectBrand) {
                    onSelectBrand(brand.name);
                  } else {
                    const catalogEl = document.getElementById("catalog");
                    if (catalogEl) catalogEl.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="group/brand flex min-w-[200px] shrink-0 snap-start flex-col items-center justify-center border-r border-zinc-800/80 px-5 py-6 text-center transition-all duration-300 hover:bg-[var(--crimson)] hover:text-white sm:min-w-[240px] sm:px-6 sm:py-7 cursor-pointer text-left"
              >
                {/* Logo Container */}
                <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border-2 border-zinc-800 bg-white p-2 group-hover/brand:border-white sm:h-24 sm:w-24 shadow-md transition-transform duration-300 group-hover/brand:scale-105">
                  <img
                    alt={brand.name}
                    loading="lazy"
                    src={brand.logoUrl}
                    className="h-full w-full object-contain p-1"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span className="hidden group-has-[img[style*='display: none']]:block font-bold text-zinc-900 text-xs uppercase">
                    {brand.name}
                  </span>
                </div>

                {/* Brand Name */}
                <div className="mt-3 text-[11px] font-bold tracking-widest uppercase text-zinc-300 group-hover/brand:text-white transition-colors">
                  {brand.name}
                </div>

                <div className="mt-1 text-[9px] font-mono text-zinc-500 group-hover/brand:text-white/80 uppercase">
                  {brand.productCount} Items
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
