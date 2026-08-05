"use client";

import React, { useState } from "react";
import { ShoppingBag, Search, ShieldCheck, Flame, ChevronRight } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSearchChange: (query: string) => void;
}

export default function Header({ cartCount, onOpenCart, onSearchChange }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <header className="sticky top-0 z-30 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--crimson)] to-red-900 flex items-center justify-center shadow-lg shadow-[var(--crimson)]/30 border border-white/20">
            <Flame className="w-6 h-6 text-yellow-300 fill-yellow-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-xl uppercase font-sans">
                AURA <span className="text-[var(--crimson)]">CMS</span>
              </span>
              <span className="bg-red-500/10 text-[var(--crimson)] text-[9px] font-bold px-1.5 py-0.5 rounded border border-[var(--crimson)]/30 uppercase tracking-widest hidden sm:inline-block">
                LIVE DEMO
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">
              Premium Cigars & Nicotine Pouches
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden md:block relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search ZYN, Acid Cigars, Pipe Tobacco..."
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[var(--crimson)] focus:ring-1 focus:ring-[var(--crimson)] transition-all"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-zinc-400 font-mono border-r border-zinc-800 pr-4">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> 21+ Verified Store
          </div>

          <button
            onClick={onOpenCart}
            className="relative bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            <ShoppingBag className="w-4 h-4 text-[var(--crimson)]" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-[var(--crimson)] text-white text-[10px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
