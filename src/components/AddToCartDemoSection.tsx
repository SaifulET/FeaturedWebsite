"use client";

import React, { useState } from "react";
import PremiumAddToCartButton from "./PremiumAddToCartButton";
import { 
  Sparkles, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  CheckCircle2,
  Zap,
  Package
} from "lucide-react";

interface AddToCartDemoSectionProps {
  onCartItemAdded?: (item: { id: string; name: string; price: number }) => void;
  onOpenCart?: () => void;
}

export default function AddToCartDemoSection({
  onCartItemAdded,
  onOpenCart
}: AddToCartDemoSectionProps) {
  const [totalAddedCount, setTotalAddedCount] = useState(0);
  const [recentAddedTime, setRecentAddedTime] = useState<string | null>(null);

  const demoProduct = {
    id: "aura-reserva-x",
    name: "Artisan Reserva Privada Limited 2026",
    subtitle: "Aged 12 Years • Cedar Wrapped Box of 10",
    price: 189.00,
    rating: 4.98,
    reviews: 240
  };

  const handleAddToCartAction = async () => {
    // Simulate real network request/cart store dispatch
    await new Promise((resolve) => setTimeout(resolve, 800));

    setTotalAddedCount((prev) => prev + 1);
    setRecentAddedTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));

    onCartItemAdded?.({
      id: demoProduct.id,
      name: demoProduct.name,
      price: demoProduct.price
    });
  };

  return (
    <section id="add-to-cart-demo" className="relative py-20 bg-[#090a12] text-white border-b border-zinc-800/80 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-r from-[#7c4dff]/15 via-[#6366f1]/10 to-[#3b82f6]/15 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/80 border border-violet-500/40 text-violet-300 text-xs font-mono font-semibold shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-spin" />
            <span>INTERACTIVE BUTTON UI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Premium Animated{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c4dff] via-[#818cf8] to-[#3b82f6]">
              Add to Cart Button
            </span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
            Upgrade your checkout conversions with smooth micro-interactions: hover shine sweep, cart tilt, spin loader, and green pop checkmark feedback.
          </p>
        </div>

        {/* Demo Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Left: Standalone Button Card Playground */}
          <div className="bg-[#121422] rounded-3xl border border-zinc-800/90 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
                <span className="text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider">
                  Standalone Component Card
                </span>
              </div>
              <span className="text-xs font-mono text-violet-400 bg-violet-950/60 border border-violet-800/60 px-2 py-0.5 rounded-full">
                Interactive
              </span>
            </div>

            {/* THE COMPONENT ITSELF */}
            <div className="py-4">
              <PremiumAddToCartButton 
                onAddToCart={handleAddToCartAction} 
              />
            </div>

            {/* Interactive Stats Log */}
            <div className="bg-[#0b0c16] rounded-2xl border border-zinc-800/70 p-4 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Cart Dispatch Count:</span>
                <span className="text-white font-bold bg-violet-950/80 border border-violet-800/50 px-2 py-0.5 rounded">
                  {totalAddedCount} item{totalAddedCount !== 1 ? "s" : ""}
                </span>
              </div>
              {recentAddedTime && (
                <div className="flex items-center justify-between text-emerald-400 pt-1 border-t border-zinc-800/50">
                  <span>Last added timestamp:</span>
                  <span>{recentAddedTime}</span>
                </div>
              )}
            </div>

            {/* Micro-Interaction Animation Steps */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono text-zinc-400 pt-1">
              <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                <span className="text-violet-400 block font-bold mb-0.5">1. Hover</span>
                <span>Shine Sweep</span>
              </div>
              <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                <span className="text-blue-400 block font-bold mb-0.5">2. Click</span>
                <span>Spin Loader</span>
              </div>
              <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                <span className="text-emerald-400 block font-bold mb-0.5">3. Success</span>
                <span>Pop Checkmark</span>
              </div>
            </div>
          </div>

          {/* Right: Realistic E-Commerce Product Card Preview */}
          <div className="bg-[#121422] rounded-3xl border border-zinc-800/90 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>FEATURED PRODUCT</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-zinc-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> In Stock (18 units)
              </div>
            </div>

            {/* Product visual banner */}
            <div className="h-40 rounded-2xl bg-gradient-to-br from-[#1a1c2e] via-[#131524] to-[#0d0e17] border border-zinc-800/80 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(124,77,255,0.25),transparent)]" />
              <Package className="w-16 h-16 text-violet-400/80 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute bottom-3 left-3 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-zinc-800 text-[11px] font-mono text-zinc-300">
                Batch: #2026-RSV
              </div>
            </div>

            {/* Title & Price */}
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">{demoProduct.name}</h3>
              <p className="text-xs text-zinc-400">{demoProduct.subtitle}</p>
              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-2xl font-extrabold text-white">${demoProduct.price.toFixed(2)}</span>
                <span className="text-xs text-zinc-500 line-through">$225.00</span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-800/50">Save 16%</span>
              </div>
            </div>

            {/* The Integrated Premium Add to Cart Button */}
            <PremiumAddToCartButton
              onAddToCart={handleAddToCartAction}
              buttonText="Add to Cart • $189.00"
              successText="Added to Bag!"
            />

            {/* Guarantee footer */}
            <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono pt-2 border-t border-zinc-800/60">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-zinc-400" /> Free Next-Day Shipping
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-zinc-400" /> 30-Day Guarantee
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
