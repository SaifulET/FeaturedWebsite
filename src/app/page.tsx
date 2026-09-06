"use client";

import React, { useState } from "react";
import LiveTickerCMS, { TickerItem } from "@/components/LiveTickerCMS";
import FlashSaleBanner from "@/components/FlashSaleBanner";
import Header from "@/components/Header";
import SectionSearchCommand from "@/components/SectionSearchCommand";
import ProductCatalog, { Product } from "@/components/ProductCatalog";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import CMSControlPanel from "@/components/CMSControlPanel";
import BlogSection from "@/components/BlogSection";
import FeaturedBrandsSection from "@/components/FeaturedBrandsSection";
import SpotlightShowcase from "@/components/SpotlightShowcase";
import SkillsSection from "@/components/SkillsSection";
import ExperienceShowcaseSection from "@/components/ExperienceShowcaseSection";
import BetopiaOrbitalShowcase from "@/components/BetopiaOrbitalShowcase";
import DynamicAiPromptConsole from "@/components/DynamicAiPromptConsole";
import HeroInteractiveShowcase from "@/components/HeroInteractiveShowcase";
import CustomGlobalCursor from "@/components/CustomGlobalCursor";
import { TracingBeam } from "@/components/TracingBeam";
import { ShieldCheck } from "lucide-react";

export default function Home() {
  const [customTickerItems, setCustomTickerItems] = useState<TickerItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkoutNotice, setCheckoutNotice] = useState<string | null>(null);

  const handleAddTickerAlert = (newItem: TickerItem) => {
    setCustomTickerItems((prev) => [newItem, ...prev]);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setCheckoutNotice("Order submitted! Age verification simulation passed successfully.");
    setCartItems([]);
    setIsCartOpen(false);
    setTimeout(() => setCheckoutNotice(null), 5000);
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <TracingBeam>
      <div className="min-h-screen bg-[var(--ink)] text-[var(--paper)] flex flex-col font-sans selection:bg-[var(--crimson)] selection:text-white relative">
        {/* Global Target Crosshair Custom Cursor Site-Wide */}
        <CustomGlobalCursor />

        {/* 1. TOP SECTION: Live CMS Continuous Ticker */}
        <LiveTickerCMS customItems={customTickerItems} />

        {/* 2. Main Store Navigation Header */}
        <Header
          cartCount={cartTotalCount}
          onOpenCart={() => setIsCartOpen(true)}
          onSearchChange={(q) => setSearchQuery(q)}
        />

        {/* 3. SECOND SECTION: Flash Sale Crimson Banner */}
        <FlashSaleBanner />

        {/* Checkout Success Toast Notice */}
        {checkoutNotice && (
          <div className="bg-emerald-600 text-white text-center py-2.5 px-4 text-xs font-bold font-mono tracking-wider uppercase flex items-center justify-center gap-2 animate-in fade-in">
            <ShieldCheck className="w-4 h-4" /> {checkoutNotice}
          </div>
        )}

        {/* Hero Interactive Showcase Section */}
        <HeroInteractiveShowcase />

        {/* Global Section Quick-Command Search Bar (Screenshot Style) */}
        <div className="bg-[#07080e] py-8 px-4 border-b border-zinc-800/80">
          <SectionSearchCommand 
            variant="hero"
            onSearchCatalogQuery={(q) => setSearchQuery(q)}
            onOpenCart={() => setIsCartOpen(true)}
          />
        </div>

        {/* Featured Brands (Stocked Here) Carousel */}
        <FeaturedBrandsSection onSelectBrand={(brandName) => setSearchQuery(brandName)} />

        {/* Main Catalog Grid */}
        <main id="catalog" className="flex-1">
          <ProductCatalog searchQuery={searchQuery} onAddToCart={handleAddToCart} />
        </main>

        {/* Blog Section (The Reading Room) */}
        <BlogSection />

        {/* Spotlight Showcase (Interactive Cursor Radial Spotlight) */}
        <SpotlightShowcase />

        {/* Skills & Web Development Tech Stack Grid */}
        <SkillsSection />

        {/* Experience & Battle-Tested Incidents Showcase */}
        <ExperienceShowcaseSection />

        {/* FEATURE 1: BetopiaAI Planetary Orbital Intelligence Hub */}
        <BetopiaOrbitalShowcase />

        {/* FEATURE 2: Dynamic AI Prompt Command Console & Live Execution Stream */}
        <DynamicAiPromptConsole />

        {/* Floating Interactive CMS Event Controller */}
        <CMSControlPanel onAddAlert={handleAddTickerAlert} />

        {/* Slide-over Shopping Cart */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />

        {/* Footer */}
        <footer className="border-t border-zinc-900 bg-zinc-950 py-8 text-zinc-500 text-xs text-center font-mono">
          <div className="max-w-7xl mx-auto px-4 space-y-2">
            <p>© 2026 AURA CMS STORE. Real-Time Marquee Ticker Engine.</p>
            <p className="text-[10px] text-zinc-600">
              SURGEON GENERAL WARNING: Cigars & Nicotine Products Contain Harmful Chemicals. 21+ Only.
            </p>
          </div>
        </footer>
      </div>
    </TracingBeam>
  );
}
