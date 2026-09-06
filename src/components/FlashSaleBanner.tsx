"use client";

import React, { useState } from "react";
import { Tag, Check, Copy, Zap, X } from "lucide-react";

interface FlashSaleBannerProps {
  customText1?: string;
  customText2?: string;
}

export default function FlashSaleBanner({
  customText1 = "Flash Sale 10% OFF",
  customText2 = "Special Discounts on Premium Cigars",
}: FlashSaleBannerProps) {
  const [copied, setCopied] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);

  const bannerPhrases = [
    customText1,
    customText2,
    customText1,
    customText2,
    customText1,
    customText2,
    customText1,
    customText2,
  ];

  // Quadruple for seamless loop across widescreen monitors
  const loopPhrases = [...bannerPhrases, ...bannerPhrases, ...bannerPhrases, ...bannerPhrases];

  const handleCopyCode = () => {
    navigator.clipboard.writeText("FLASH10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <section
        id="flash-sale"
        className="hard-border-b relative overflow-hidden cursor-pointer select-none group"
        style={{ background: "var(--crimson)", color: "rgb(255, 255, 255)" }}
        onClick={() => setShowPromoModal(true)}
      >
        {/* Animated Stripe Overlay */}
        <div
          className="bg-pan pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.6) 0px, rgba(255, 255, 255, 0.6) 2px, transparent 2px, transparent 18px)",
          }}
        />

        {/* Floating click indicator badge */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/20 group-hover:scale-105 transition-transform shadow-lg">
          <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300 animate-bounce" /> Click to Claim
        </div>

        <div className="relative overflow-hidden py-5">
          <div className="marquee-track-fast">
            {loopPhrases.map((phrase, idx) => (
              <div
                key={idx}
                className="px-8 text-2xl font-bold tracking-tight whitespace-nowrap drop-shadow-sm flex items-center gap-3"
              >
                <span>{phrase}</span>
                <span className="text-white/40 text-lg">★</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Claim Coupon Modal */}
      {showPromoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowPromoModal(false)}
        >
          <div
            className="bg-gradient-to-b from-zinc-900 to-black border-2 border-[var(--crimson)] rounded-2xl p-6 max-w-sm w-full shadow-2xl relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPromoModal(false)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[var(--crimson)]/20 border border-[var(--crimson)] text-[var(--crimson)] flex items-center justify-center mx-auto mb-3">
              <Tag className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-1">Flash Discount Unlocked!</h3>
            <p className="text-zinc-400 text-xs mb-4">
              Use promo code at checkout to instantly save 10% on all premium cigars & nicotine pouches.
            </p>

            <div className="bg-zinc-800/80 border border-zinc-700 rounded-xl p-3 flex items-center justify-between gap-2 mb-4 font-mono">
              <span className="text-lg font-bold text-yellow-400 tracking-wider">FLASH10</span>
              <button
                onClick={handleCopyCode}
                className="bg-[var(--crimson)] hover:bg-[var(--crimson-dark)] text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-300" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Code
                  </>
                )}
              </button>
            </div>

            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
              Offer expires in 04:29:12
            </p>
          </div>
        </div>
      )}
    </>
  );
}
