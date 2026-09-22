"use client";

import React, { useState, useEffect } from "react";
import DayNightToggle from "./DayNightToggle";
import { 
  Sun, 
  Moon, 
  Sparkles, 
  Layers, 
  Sliders, 
  Check, 
  Copy, 
  Eye, 
  CloudSun,
  ShieldCheck,
  Feather
} from "lucide-react";

export default function DayNightToggleShowcase() {
  const [isNight, setIsNight] = useState(false);
  const [showReflection, setShowReflection] = useState(true);
  const [showLabel, setShowLabel] = useState(true);
  const [size, setSize] = useState<"sm" | "md" | "lg" | "responsive">("responsive");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pageStars, setPageStars] = useState<Array<{ x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    setMounted(true);
    // 50 page stars
    const stars = Array.from({ length: 50 }, () => ({
      x: +(Math.random() * 100).toFixed(2),
      y: +(Math.random() * 100).toFixed(2),
      delay: +(Math.random() * 3).toFixed(2),
    }));
    setPageStars(stars);
  }, []);

  const copyCode = () => {
    const code = `<DayNightToggle 
  isNight={${isNight}} 
  onToggle={(val) => setIsNight(val)} 
  showReflection={${showReflection}} 
  showLabel={${showLabel}} 
  size="${size}" 
  cloudImg1="/mood/cloud2.png" 
  cloudImg2="/mood/cloud.png" 
/>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/80 bg-zinc-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Title & Badge */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <CloudSun className="w-3.5 h-3.5" /> Interactive UI Component
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
                public/mood/ Assets
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-white">
              Day & Night Mode <span className="bg-gradient-to-r from-amber-300 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Atmospheric Toggle</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-1 max-w-2xl">
              Micro-animated physics toggle with seamless infinite moving clouds from <code className="text-amber-300 font-mono text-xs bg-zinc-900 px-1.5 py-0.5 rounded">public/mood/</code>, flapping birds, twinkling night stars, shooting stars, and mirrored ambient reflection.
            </p>
          </div>

          {/* Quick Controls Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsNight(!isNight)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border shadow-lg cursor-pointer ${
                isNight
                  ? "bg-indigo-950/80 border-indigo-500/50 text-indigo-200 shadow-indigo-500/20"
                  : "bg-amber-950/80 border-amber-500/50 text-amber-200 shadow-amber-500/20"
              }`}
            >
              {isNight ? (
                <>
                  <Moon className="w-4 h-4 text-indigo-400" /> Switch to Day
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-400" /> Switch to Night
                </>
              )}
            </button>

            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied JSX!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Code
                </>
              )}
            </button>
          </div>
        </div>

        {/* The Live Interactive Canvas Stage */}
        <div className="relative rounded-3xl border border-zinc-700/60 overflow-hidden shadow-2xl">
          {/* Top Bar for Stage */}
          <div className="bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 px-4 py-3 flex items-center justify-between z-10 relative">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-zinc-400 ml-2">
                Atmosphere: {isNight ? "Cosmic Midnight 🌌" : "Sunny Daylight 🌤️"}
              </span>
            </div>

            {/* Stage Options */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <label className="flex items-center gap-1.5 cursor-pointer text-zinc-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={showReflection}
                  onChange={(e) => setShowReflection(e.target.checked)}
                  className="rounded bg-zinc-800 border-zinc-700 text-purple-600 focus:ring-0"
                />
                Reflection
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-zinc-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={showLabel}
                  onChange={(e) => setShowLabel(e.target.checked)}
                  className="rounded bg-zinc-800 border-zinc-700 text-purple-600 focus:ring-0"
                />
                Label
              </label>
            </div>
          </div>

          {/* Full Stage with Radial Gradient Background */}
          <div className={`dnt-stage relative min-h-[500px] flex items-center justify-center p-6 transition-all duration-1000 ${
            isNight ? "dnt-night" : ""
          }`}>
            {/* Page Stars (Night Sky Background) */}
            <div className="dnt-page-stars" id="pageStars">
              {mounted &&
                pageStars.map((s, idx) => (
                  <span
                    key={idx}
                    style={{
                      left: `${s.x}%`,
                      top: `${s.y}%`,
                      animationDelay: `${s.delay}s`,
                    }}
                  />
                ))}
            </div>

            {/* High Altitude Shooting Stars */}
            <div className="dnt-shooting-stars">
              <div
                className="dnt-shooting"
                style={{
                  top: "14%",
                  left: "70%",
                  animationDuration: "5.5s",
                  animationDelay: ".2s",
                }}
              />
              <div
                className="dnt-shooting"
                style={{
                  top: "26%",
                  left: "40%",
                  animationDuration: "8s",
                  animationDelay: ".5s",
                }}
              />
              <div
                className="dnt-shooting"
                style={{
                  top: "8%",
                  left: "85%",
                  animationDuration: "7s",
                  animationDelay: ".8s",
                }}
              />
            </div>

            {/* The Main DayNightToggle Button Component */}
            <DayNightToggle
              isNight={isNight}
              onToggle={(night) => setIsNight(night)}
              showLabel={showLabel}
              showReflection={showReflection}
              size={size}
              cloudImg1="/mood/cloud2.png"
              cloudImg2="/mood/cloud.png"
            />
          </div>
        </div>

        {/* Feature Highlights & Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-sm font-bold">
              <Sun className="w-4 h-4" /> Seamless Cloud Loop
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Utilizes dual atmospheric cloud assets (<code className="text-amber-300 font-mono">cloud.png</code> and <code className="text-amber-300 font-mono">cloud2.png</code>) located in <code className="text-zinc-200 font-mono">public/mood/</code> for continuous 16s hardware-accelerated translation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm font-bold">
              <Moon className="w-4 h-4" /> Celestial Night Mode
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              When toggled, knob glides with cubic-bezier easing <code className="text-indigo-300 font-mono">(.65,-.1,.25,1.15)</code>, revealing 14 track stars, shooting stars with gradient tails, and a glowing crescent moon.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-bold">
              <Feather className="w-4 h-4" /> Flapping Birds & Reflection
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Features 3 SVG birds with synchronized wing flapping animations during day mode and a real-time blur-masked glass reflection at the base.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
