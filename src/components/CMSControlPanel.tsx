"use client";

import React, { useState } from "react";
import { Radio, Plus, Settings, Sparkles, CheckCircle2, ChevronUp, ChevronDown } from "lucide-react";
import { TickerItem } from "./LiveTickerCMS";

interface CMSControlPanelProps {
  onAddAlert: (item: TickerItem) => void;
}

export default function CMSControlPanel({ onAddAlert }: CMSControlPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [badge, setBadge] = useState<"JUST SOLD" | "RESTOCKED" | "TRENDING" | "LOW STOCK">("JUST SOLD");
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newItem: TickerItem = {
      id: Date.now().toString(),
      badge,
      text: text.trim(),
      price: price.trim() || "$5.99",
      time: "Just now",
    };

    onAddAlert(newItem);
    setNotification(`Broadcasted "${badge}: ${text.trim()}" to Live Ticker`);
    setText("");
    setPrice("");

    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const presetSamples = [
    { badge: "JUST SOLD" as const, text: "ZYN Nicotine pouches 6mg Citrus", price: "$4.99" },
    { badge: "RESTOCKED" as const, text: "Arturo Fuente Opus X Cigars", price: "$32.00" },
    { badge: "TRENDING" as const, text: "ON! Nicotine Pouches Coffee 4mg", price: "$3.99" },
    { badge: "LOW STOCK" as const, text: "Captain Black Pipe Tobacco 1.5 oz", price: "$8.49" },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* CMS Control Panel Toggle Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zinc-900 hover:bg-black border border-[var(--crimson)] text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs tracking-wider uppercase backdrop-blur-md transition-all hover:scale-105 active:scale-95 group"
      >
        <Radio className="w-4 h-4 text-[var(--crimson)] animate-pulse" />
        <span>Live CMS Controller</span>
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>

      {/* Expanded Control Box */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-80 sm:w-96 bg-zinc-950/95 border border-zinc-800 rounded-2xl p-5 shadow-2xl backdrop-blur-xl text-white animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--crimson)]">
              <Sparkles className="w-4 h-4" /> Broadcast Live CMS Event
            </div>
            <span className="text-[10px] font-mono bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
              STREAM ONLINE
            </span>
          </div>

          {notification && (
            <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs p-2.5 rounded-lg mb-4 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="truncate">{notification}</span>
            </div>
          )}

          <form onSubmit={handlePublish} className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Alert Type / Badge
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(["JUST SOLD", "RESTOCKED", "TRENDING", "LOW STOCK"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setBadge(type)}
                    className={`py-1.5 px-2 rounded text-[10px] font-bold tracking-wider uppercase transition-all ${
                      badge === type
                        ? "bg-[var(--crimson)] text-white shadow-md shadow-[var(--crimson)]/30"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Product Title / Details
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g. ZYN Spearmint 6mg"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[var(--crimson)] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Price (Optional)
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="$4.99"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[var(--crimson)] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--crimson)] hover:bg-[var(--crimson-dark)] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-[var(--crimson)]/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" /> Push to Live Stream
            </button>
          </form>

          {/* Quick preset trigger samples */}
          <div className="mt-4 pt-3 border-t border-zinc-800">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Quick Preset Triggers:
            </span>
            <div className="space-y-1">
              {presetSamples.map((sample, i) => (
                <button
                  key={i}
                  onClick={() => {
                    onAddAlert({
                      id: Date.now().toString(),
                      badge: sample.badge,
                      text: sample.text,
                      price: sample.price,
                    });
                    setNotification(`Pushed "${sample.text}"`);
                    setTimeout(() => setNotification(null), 3000);
                  }}
                  className="w-full text-left text-[11px] text-zinc-400 hover:text-white hover:bg-zinc-800/60 p-1.5 rounded transition-colors flex items-center justify-between"
                >
                  <span className="truncate">
                    <strong className="text-[var(--crimson)]">[{sample.badge}]</strong> {sample.text}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">{sample.price}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
