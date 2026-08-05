"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, SlidersHorizontal, Pause, Play, ShoppingBag, X } from "lucide-react";

export interface TickerItem {
  id: string;
  badge: "JUST SOLD" | "RESTOCKED" | "TRENDING" | "LOW STOCK";
  text: string;
  price?: string;
  time?: string;
}

const DEFAULT_TICKER_ITEMS: TickerItem[] = [
  { id: "1", badge: "JUST SOLD", text: "ZYN Nicotine pouches 3mg Spiced Cider", price: "$4.99" },
  { id: "2", badge: "RESTOCKED", text: "Acid Blondie Gold Cigars", price: "$12.50" },
  { id: "3", badge: "TRENDING", text: "VELO Plus Mind 6mg", price: "$5.20" },
  { id: "4", badge: "LOW STOCK", text: "Good Stuff Natural Pipe Tobacco 5 Lb. Bag", price: "$29.99" },
  { id: "5", badge: "JUST SOLD", text: "ZYN Nicotine pouches 6mg Wintergreen", price: "$4.99" },
  { id: "6", badge: "RESTOCKED", text: "Mac Baren Navy Flake Pipe Tobacco", price: "$14.90" },
  { id: "7", badge: "TRENDING", text: "Rogue Nicotine Mango 6mg", price: "$4.49" },
  { id: "8", badge: "LOW STOCK", text: "Drew Estate Liga Privada No. 9", price: "$18.75" },
];

interface LiveTickerCMSProps {
  customItems?: TickerItem[];
  onSelectItem?: (item: TickerItem) => void;
}

export default function LiveTickerCMS({ customItems = [], onSelectItem }: LiveTickerCMSProps) {
  const [items, setItems] = useState<TickerItem[]>(DEFAULT_TICKER_ITEMS);
  const [shopperCount, setShopperCount] = useState(1284);
  const [isPaused, setIsPaused] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [speed, setSpeed] = useState<number>(35); // seconds duration
  const [showControls, setShowControls] = useState(false);
  const [selectedItemModal, setSelectedItemModal] = useState<TickerItem | null>(null);

  // Sync custom items when user injects new alerts from CMS controller
  useEffect(() => {
    if (customItems.length > 0) {
      setItems((prev) => [...customItems, ...prev]);
    }
  }, [customItems]);

  // Simulate real-time active shoppers dynamic fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setShopperCount((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.max(1100, prev + delta);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filteredItems = items.filter((item) => {
    if (activeFilter === "ALL") return true;
    return item.badge === activeFilter;
  });

  // Duplicate items array to ensure seamless uninterrupted loop width
  const loopItems = [...filteredItems, ...filteredItems, ...filteredItems, ...filteredItems];

  const handleItemClick = (item: TickerItem) => {
    setSelectedItemModal(item);
    if (onSelectItem) onSelectItem(item);
  };

  return (
    <>
      <div
        className="hard-border-b relative border-b border-white/10 select-none z-30 transition-all duration-300"
        data-live-ticker="cms"
        style={{ background: "var(--ink)", color: "var(--paper)" }}
      >
        <div className="flex items-stretch">
          {/* Main Continuous Marquee Track Area */}
          <div className="flex-1 overflow-hidden py-1.5 relative group">
            {/* Quick Controls overlay on hover */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2 py-1 rounded-full border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-1 hover:text-[var(--crimson)] transition-colors"
                title={isPaused ? "Resume marquee" : "Pause marquee"}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setShowControls(!showControls)}
                className="p-1 hover:text-[var(--gold)] transition-colors"
                title="Ticker settings"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>

            <div
              className="marquee-track-ticker"
              style={{
                animationPlayState: isPaused ? "paused" : "running",
                animationDuration: `${speed}s`,
              }}
            >
              {loopItems.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={() => handleItemClick(item)}
                  className="flex items-center gap-2 px-6 text-[11px] tracking-widest uppercase whitespace-nowrap cursor-pointer hover:bg-white/5 py-0.5 rounded transition-all group/item"
                >
                  <span
                    className="font-bold flex items-center gap-1 group-hover/item:scale-105 transition-transform"
                    style={{ color: "var(--crimson)" }}
                  >
                    ● {item.badge}
                  </span>
                  <span style={{ opacity: 0.85 }} className="group-hover/item:text-white transition-colors">
                    {item.text}
                  </span>
                  {item.price && (
                    <span className="text-[10px] text-zinc-400 font-mono bg-white/10 px-1.5 py-0.5 rounded ml-1">
                      {item.price}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Static Shoppers Counter */}
          <div className="hidden shrink-0 items-center gap-2 border-l border-white/20 px-3 py-1.5 text-[11px] tracking-widest uppercase md:flex font-mono bg-black/20">
            <span className="blink text-[var(--crimson)] font-bold">●</span>
            <span className="font-semibold text-white">{shopperCount.toLocaleString()}</span> shopping now
          </div>
        </div>

        {/* Filter & Speed Drawer Settings */}
        {showControls && (
          <div className="border-t border-white/10 bg-black/90 p-3 text-xs flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-zinc-400 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1">
                <FilterIcon className="w-3 h-3 text-[var(--gold)]" /> Filter Alerts:
              </span>
              {["ALL", "JUST SOLD", "RESTOCKED", "TRENDING", "LOW STOCK"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase transition-all ${
                    activeFilter === cat
                      ? "bg-[var(--crimson)] text-white"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Scroll Speed:</span>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-24 accent-[var(--crimson)] cursor-pointer"
                />
                <span className="font-mono text-[10px]">{speed}s</span>
              </div>
              <button
                onClick={() => setShowControls(false)}
                className="text-zinc-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Item Detail Quick Modal */}
      {selectedItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[var(--ink)] border border-zinc-700 rounded-xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedItemModal(null)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--crimson)] mb-2">
              <Sparkles className="w-4 h-4" /> Live Store Alert
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{selectedItemModal.text}</h3>

            <div className="flex items-center gap-3 my-3">
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-[var(--crimson)] text-white tracking-wider uppercase">
                {selectedItemModal.badge}
              </span>
              {selectedItemModal.price && (
                <span className="text-lg font-mono font-bold text-[var(--gold)]">
                  {selectedItemModal.price}
                </span>
              )}
            </div>

            <p className="text-zinc-300 text-sm mb-6 leading-relaxed">
              This item was recently updated on our live CMS feed! High demand item in real-time inventory.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  alert(`Added ${selectedItemModal.text} to cart!`);
                  setSelectedItemModal(null);
                }}
                className="flex-1 bg-[var(--crimson)] hover:bg-[var(--crimson-dark)] text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-[var(--crimson)]/20"
              >
                <ShoppingBag className="w-4 h-4" /> Quick Add to Cart
              </button>
              <button
                onClick={() => setSelectedItemModal(null)}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold py-2.5 px-4 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.707 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  );
}
