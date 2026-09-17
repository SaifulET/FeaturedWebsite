"use client";

import React, { useState, useRef, useEffect } from "react";
import { KineticButton, KineticTone, KineticFx } from "./KineticButton";
import StaggeredBlurText from "./StaggeredBlurText";
import PremiumBlurButton from "./PremiumBlurButton";
import { 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  Pause, 
  Code2, 
  Layers, 
  ShoppingBag, 
  ShieldCheck, 
  Terminal, 
  Flame, 
  Sliders, 
  Eye, 
  Zap, 
  Compass,
  Cpu
} from "lucide-react";

interface DirectionTelemetry {
  direction: "LTR" | "RTL" | "IDLE";
  revValue: number;
  lastButton: string;
  charCount: number;
  activeFx: string;
  activeTone: string;
  isAnimating: boolean;
}

export default function KineticButtonCollection({
  onAddToCart,
  onOpenCart,
  onScrollToCatalog,
  onScrollToConsole
}: {
  onAddToCart?: (item: { id: string; name: string; price: number }) => void;
  onOpenCart?: () => void;
  onScrollToCatalog?: () => void;
  onScrollToConsole?: () => void;
}) {
  // Studio Sandbox State
  const [studioText, setStudioText] = useState("ACCELERATE");
  const [studioTone, setStudioTone] = useState<KineticTone>("solid");
  const [studioFx, setStudioFx] = useState<KineticFx>("jump");
  const [studioStep, setStudioStep] = useState(0.04);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [actionToast, setActionToast] = useState<string | null>(null);
  const [isAutoPlayLoop, setIsAutoPlayLoop] = useState(false);
  const [blurReplayKey, setBlurReplayKey] = useState(0);

  // Direction Sensor Telemetry
  const [telemetry, setTelemetry] = useState<DirectionTelemetry>({
    direction: "LTR",
    revValue: 0,
    lastButton: "Jumping",
    charCount: 7,
    activeFx: "jump",
    activeTone: "solid",
    isAnimating: false
  });

  // Dedicated refs for programmatically triggering the 3 hero showcase buttons
  const heroJumpBtnRef = useRef<HTMLButtonElement>(null);
  const heroSmokeBtnRef = useRef<HTMLButtonElement>(null);
  const heroDriveBtnRef = useRef<HTMLButtonElement>(null);
  const studioBtnRef = useRef<HTMLButtonElement>(null);

  // Programmatic animation trigger helper for testing direction wave
  const triggerProgrammaticWave = (
    btnElement: HTMLButtonElement | null,
    fromRight: boolean,
    buttonName: string,
    fxName: string,
    toneName: string,
    charLength: number
  ) => {
    if (!btnElement || btnElement.dataset.busy) return;

    setTelemetry({
      direction: fromRight ? "RTL" : "LTR",
      revValue: fromRight ? 1 : 0,
      lastButton: buttonName,
      charCount: charLength,
      activeFx: fxName,
      activeTone: toneName,
      isAnimating: true
    });

    btnElement.style.setProperty("--rev", fromRight ? "1" : "0");
    btnElement.classList.add("is-go");
    btnElement.dataset.busy = "1";

    const runs = (
      typeof btnElement.getAnimations === "function"
        ? btnElement.getAnimations({ subtree: true })
        : []
    ).filter((a) => (a as unknown as { animationName?: string }).animationName);

    if (runs.length > 0) {
      Promise.allSettled(runs.map((a) => a.finished)).then(() => {
        btnElement.classList.remove("is-go");
        delete btnElement.dataset.busy;
        setTelemetry((prev) => ({ ...prev, isAnimating: false }));
      });
    } else {
      setTimeout(() => {
        btnElement.classList.remove("is-go");
        delete btnElement.dataset.busy;
        setTelemetry((prev) => ({ ...prev, isAnimating: false }));
      }, 700);
    }
  };

  // Auto-play demo loop effect
  useEffect(() => {
    if (!isAutoPlayLoop) return;
    const buttons = [
      { ref: heroJumpBtnRef, name: "Jumping", fx: "jump", tone: "solid", chars: 7 },
      { ref: heroSmokeBtnRef, name: "Smoke", fx: "smoke", tone: "contrast", chars: 5 },
      { ref: heroDriveBtnRef, name: "Drive", fx: "drive", tone: "surface", chars: 5 }
    ];
    let stepIndex = 0;

    const interval = setInterval(() => {
      const target = buttons[stepIndex % buttons.length];
      const fromRight = (stepIndex % 2) === 1;
      triggerProgrammaticWave(
        target.ref.current,
        fromRight,
        target.name,
        target.fx,
        target.tone,
        target.chars
      );
      stepIndex++;
    }, 1200);

    return () => clearInterval(interval);
  }, [isAutoPlayLoop]);

  const copySnippet = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  const showToast = (message: string) => {
    setActionToast(message);
    setTimeout(() => setActionToast(null), 3500);
  };

  // The 3 exact code snippets from the screenshot
  const codeIndexHtml = `<!-- the tone is a class, the motion is an attribute:
     any tone wears any of the three motions -->

<button class="gbtn gbtn--solid" data-fx="jump">
  Jumping
</button>

<button class="gbtn gbtn--contrast" data-fx="smoke">
  Smoke
</button>

<button class="gbtn gbtn--surface" data-fx="drive">
  Drive
</button>

<!-- the plain word ships in the markup, so with the script
     off these are three plain, labelled, working buttons -->`;

  const codeAppCss = `/* one declaration, BOTH directions: --rev is 0 or 1,
   so it collapses to i, or to n - 1 - i */
.gbtn.is-go .g {
  animation-delay: calc(
    var(--step) * (var(--i)
    + var(--rev) * (var(--n)
    - 1 - 2 * var(--i)))
  );
}

/* a round blur under a scaleX comes out stretched along x:
   one directional smear out of one blur and one scale,
   then STEPPED across while unseen */
@keyframes g-drive {
  42% {
    transform: translateX(-1.5em) scaleX(2.3);
    filter: blur(.11em);
    opacity: 0;
  }
  /* animation-timing-function: steps(1, end); */
}`;

  const codeAppJs = `function play(btn, fromRight) {
  // restarted mid-flight, a CSS animation begins again at
  // 0%: a letter at its apex would teleport to the floor
  if (btn.dataset.busy) return;
  // --rev: which half of the button the pointer crossed
  btn.style.setProperty('--rev', fromRight ? 1 : 0);
  btn.classList.add('is-go');
  // a cancelled run REJECTS its finished promise, so allSettled, and not all
  const runs = btn.getAnimations({ subtree: true }).filter(
    (a) => a.animationName
  );
  btn.dataset.busy = '1';
  Promise.allSettled(runs.map((a) => a.finished)).then(() => {
    btn.classList.remove('is-go');
    delete btn.dataset.busy;
  });
}`;

  return (
    <section 
      id="button-collection" 
      className="py-20 px-4 bg-[#090a0f] border-b border-zinc-800/80 relative overflow-hidden"
    >
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-red-600/10 via-amber-500/10 to-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -top-12 right-12 w-64 h-64 bg-cyan-500/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* ========================================================
            1. SECTION HEADER WITH @_code_and_chill_ ATTRIBUTION
            ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-red-950/80 border border-red-500/30 text-red-400 font-mono text-[11px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> FEATURED COLLECTION
              </span>
              <span className="text-zinc-400 text-xs font-mono">
                KINETIC TYPOGRAPHY BUTTON ENGINE
              </span>
            </div>
            <StaggeredBlurText
              text="Kinetic Button Motion System"
              as="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-mono"
            />
            <p className="text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
              Direction-aware kinetic typography buttons where cursor entry vectors dynamically calculate <code className="text-amber-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">--rev</code>, driving staggered character waves in forward or reverse physics.
            </p>
          </div>

          {/* @_code_and_chill_ Creator Card Badge */}
          <div className="flex items-center gap-3 bg-zinc-900/90 border border-zinc-800 px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-md">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div className="text-left font-mono">
              <div className="text-[10px] text-zinc-400 uppercase tracking-widest">ORIGINAL MOTION DESIGN</div>
              <div className="text-sm font-bold text-sky-400">@_code_and_chill_</div>
            </div>
            <button
              onClick={() => copySnippet("@_code_and_chill_", "creator")}
              className="ml-2 p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
              title="Copy creator tag"
            >
              {copiedCodeId === "creator" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* ========================================================
            2. HERO STAGE: EXACT SCREENSHOT REPLICA (Light Canvas + 3 Buttons)
            ======================================================== */}
        <div className="space-y-8">
          
          {/* Top Light Periwinkle/Lavender Preview Stage from the Video */}
          <div className="bg-gradient-to-b from-[#edf0fa] via-[#e6eaf7] to-[#dfe4f5] rounded-3xl p-8 md:p-14 shadow-2xl border border-white/80 relative overflow-hidden text-zinc-900">
            {/* Ambient specular highlight */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/60 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-300/30 blur-3xl rounded-full pointer-events-none" />

            {/* Stage Controls Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-zinc-300/70 relative z-10">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white font-mono text-[11px] font-bold tracking-wider uppercase">
                  LIVE INTERACTIVE CANVAS
                </span>
                <span className="text-zinc-600 text-xs font-mono">
                  Sweep cursor across any button (LTR or RTL)
                </span>
              </div>

              {/* Sweep Telemetry Pill */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <div className="bg-white/80 border border-zinc-300/80 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-zinc-500">Vector:</span>
                  <span className="font-bold text-blue-700">
                    {telemetry.direction === "LTR" ? "LTR (→ Left to Right)" : telemetry.direction === "RTL" ? "RTL (← Right to Left)" : "IDLE"}
                  </span>
                  <span className="text-zinc-400">|</span>
                  <span className="text-zinc-500">--rev:</span>
                  <span className="font-bold text-amber-600">{telemetry.revValue}</span>
                </div>

                <button
                  onClick={() => setIsAutoPlayLoop(!isAutoPlayLoop)}
                  className={`px-3.5 py-1.5 rounded-full border shadow-sm flex items-center gap-1.5 transition-all font-mono text-xs font-semibold ${
                    isAutoPlayLoop 
                      ? "bg-blue-600 text-white border-blue-600" 
                      : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  {isAutoPlayLoop ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-blue-600" />}
                  <span>{isAutoPlayLoop ? "Pause Demo" : "Auto-Play Wave"}</span>
                </button>
              </div>
            </div>

            {/* THE 3 EXACT PILL BUTTONS IN A CLEAN ROW */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 py-8 relative z-10">
              
              {/* 1. SOLID + JUMP (Royal Blue Pill + White Letters) */}
              <div className="flex flex-col items-center gap-3">
                <button
                  ref={heroJumpBtnRef}
                  className="gbtn gbtn--solid text-lg md:text-xl font-extrabold px-9 py-4 shadow-xl"
                  data-fx="jump"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const fromRight = e.clientX - rect.left > rect.width / 2;
                    triggerProgrammaticWave(heroJumpBtnRef.current, fromRight, "Jumping", "jump", "solid", 7);
                  }}
                  onMouseMove={(e) => {
                    if (heroJumpBtnRef.current && !heroJumpBtnRef.current.dataset.busy) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const fromRight = e.clientX - rect.left > rect.width / 2;
                      triggerProgrammaticWave(heroJumpBtnRef.current, fromRight, "Jumping", "jump", "solid", 7);
                    }
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const fromRight = e.clientX - rect.left > rect.width / 2;
                    triggerProgrammaticWave(heroJumpBtnRef.current, fromRight, "Jumping", "jump", "solid", 7);
                    showToast("Solid Jump: Elastic staggered hop triggered!");
                  }}
                >
                  <span className="g-wrap">
                    {"Jumping".split("").map((c, i) => (
                      <span key={i} className="g" style={{ ["--i"]: i, ["--n"]: 7 } as React.CSSProperties}>
                        {c}
                      </span>
                    ))}
                  </span>
                </button>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
                  <span className="font-bold text-blue-600">.gbtn--solid</span>
                  <span>+</span>
                  <span className="text-zinc-700">data-fx=&quot;jump&quot;</span>
                </div>
              </div>

              {/* 2. CONTRAST + SMOKE (Deep Obsidian Pill + White Letters) */}
              <div className="flex flex-col items-center gap-3">
                <button
                  ref={heroSmokeBtnRef}
                  className="gbtn gbtn--contrast text-lg md:text-xl font-extrabold px-9 py-4 shadow-xl"
                  data-fx="smoke"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const fromRight = e.clientX - rect.left > rect.width / 2;
                    triggerProgrammaticWave(heroSmokeBtnRef.current, fromRight, "Smoke", "smoke", "contrast", 5);
                  }}
                  onMouseMove={(e) => {
                    if (heroSmokeBtnRef.current && !heroSmokeBtnRef.current.dataset.busy) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const fromRight = e.clientX - rect.left > rect.width / 2;
                      triggerProgrammaticWave(heroSmokeBtnRef.current, fromRight, "Smoke", "smoke", "contrast", 5);
                    }
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const fromRight = e.clientX - rect.left > rect.width / 2;
                    triggerProgrammaticWave(heroSmokeBtnRef.current, fromRight, "Smoke", "smoke", "contrast", 5);
                    showToast("Contrast Smoke: Ethereal vaporize & reform triggered!");
                  }}
                >
                  <span className="g-wrap">
                    {"Smoke".split("").map((c, i) => (
                      <span key={i} className="g" style={{ ["--i"]: i, ["--n"]: 5 } as React.CSSProperties}>
                        {c}
                      </span>
                    ))}
                  </span>
                </button>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
                  <span className="font-bold text-zinc-900">.gbtn--contrast</span>
                  <span>+</span>
                  <span className="text-zinc-700">data-fx=&quot;smoke&quot;</span>
                </div>
              </div>

              {/* 3. SURFACE + DRIVE (Pure White Pill + Royal Blue Letters) */}
              <div className="flex flex-col items-center gap-3">
                <button
                  ref={heroDriveBtnRef}
                  className="gbtn gbtn--surface text-lg md:text-xl font-extrabold px-9 py-4 shadow-xl"
                  data-fx="drive"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const fromRight = e.clientX - rect.left > rect.width / 2;
                    triggerProgrammaticWave(heroDriveBtnRef.current, fromRight, "Drive", "drive", "surface", 5);
                  }}
                  onMouseMove={(e) => {
                    if (heroDriveBtnRef.current && !heroDriveBtnRef.current.dataset.busy) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const fromRight = e.clientX - rect.left > rect.width / 2;
                      triggerProgrammaticWave(heroDriveBtnRef.current, fromRight, "Drive", "drive", "surface", 5);
                    }
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const fromRight = e.clientX - rect.left > rect.width / 2;
                    triggerProgrammaticWave(heroDriveBtnRef.current, fromRight, "Drive", "drive", "surface", 5);
                    showToast("Surface Drive: Horizontal streak smear warp triggered!");
                  }}
                >
                  <span className="g-wrap">
                    {"Drive".split("").map((c, i) => (
                      <span key={i} className="g" style={{ ["--i"]: i, ["--n"]: 5 } as React.CSSProperties}>
                        {c}
                      </span>
                    ))}
                  </span>
                </button>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
                  <span className="font-bold text-blue-600">.gbtn--surface</span>
                  <span>+</span>
                  <span className="text-zinc-700">data-fx=&quot;drive&quot;</span>
                </div>
              </div>

            </div>

            {/* Direction Quick Triggers Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-zinc-300/70">
              <span className="text-xs font-mono text-zinc-500">Manual Physics Trigger:</span>
              <button
                onClick={() => {
                  triggerProgrammaticWave(heroJumpBtnRef.current, false, "Jumping", "jump", "solid", 7);
                  setTimeout(() => triggerProgrammaticWave(heroSmokeBtnRef.current, false, "Smoke", "smoke", "contrast", 5), 250);
                  setTimeout(() => triggerProgrammaticWave(heroDriveBtnRef.current, false, "Drive", "drive", "surface", 5), 500);
                }}
                className="py-1 px-3 rounded-full bg-white hover:bg-zinc-100 text-zinc-800 font-mono text-xs font-semibold flex items-center gap-1.5 shadow-sm border border-zinc-300 transition-all"
              >
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" /> Wave All (Left → Right)
              </button>
              <button
                onClick={() => {
                  triggerProgrammaticWave(heroDriveBtnRef.current, true, "Drive", "drive", "surface", 5);
                  setTimeout(() => triggerProgrammaticWave(heroSmokeBtnRef.current, true, "Smoke", "smoke", "contrast", 5), 250);
                  setTimeout(() => triggerProgrammaticWave(heroJumpBtnRef.current, true, "Jumping", "jump", "solid", 7), 500);
                }}
                className="py-1 px-3 rounded-full bg-white hover:bg-zinc-100 text-zinc-800 font-mono text-xs font-semibold flex items-center gap-1.5 shadow-sm border border-zinc-300 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-orange-600" /> Wave All (Right → Left)
              </button>
            </div>
          </div>

          {/* Centered @_code_and_chill_ Signature Handle from Screenshot */}
          <div className="flex items-center justify-center pt-2">
            <div className="flex items-center gap-2 font-mono text-sm md:text-base text-sky-400 font-bold bg-[#11131c] px-6 py-2 rounded-full border border-zinc-800 shadow-xl">
              <span>@_code_and_chill_</span>
            </div>
          </div>

        </div>

        {/* ========================================================
            3. INTERACTIVE STUDIO & CUSTOMIZER SANDBOX
            ======================================================== */}
        <div className="bg-[#0e1017] border border-zinc-800 rounded-3xl p-6 md:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                <Sliders className="w-4 h-4" /> Interactive Motion Studio
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white font-mono mt-1">
                Customize Any Tone & Motion Combination
              </h3>
            </div>
            <div className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
              Any Tone wears Any Motion
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Control Panel (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Custom Word Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                  <span>1. Button Label Text ({studioText.length} characters)</span>
                  <span className="text-[11px] text-zinc-500">Auto-splits into &lt;span class=&quot;g&quot;&gt;</span>
                </label>
                <input
                  type="text"
                  value={studioText}
                  onChange={(e) => setStudioText(e.target.value || "A")}
                  maxLength={28}
                  placeholder="Type any label..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              {/* Tone Switcher */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  2. Select Design Tone (<code className="text-zinc-300">gbtn--{studioTone}</code>)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {(["solid", "contrast", "surface", "crimson", "cyber", "emerald"] as KineticTone[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setStudioTone(t)}
                      className={`py-2 px-2.5 rounded-xl font-mono text-xs uppercase font-bold border transition-all ${
                        studioTone === t
                          ? "bg-zinc-800 text-white border-red-500 shadow-md scale-105"
                          : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Motion Switcher */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  3. Select Kinetic Motion (<code className="text-zinc-300">data-fx=&quot;{studioFx}&quot;</code>)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(["jump", "smoke", "drive", "flip"] as KineticFx[]).map((fx) => (
                    <button
                      key={fx}
                      onClick={() => setStudioFx(fx)}
                      className={`py-2 px-3 rounded-xl font-mono text-xs uppercase font-bold border transition-all ${
                        studioFx === fx
                          ? "bg-red-950/80 text-red-200 border-red-500 shadow-md scale-105"
                          : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
                      }`}
                    >
                      {fx}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stagger Interval Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-400 uppercase tracking-wider">4. Stagger Step Interval (<code className="text-amber-400">--step</code>)</span>
                  <span className="text-white font-bold">{Math.round(studioStep * 1000)}ms / letter</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.09"
                  step="0.005"
                  value={studioStep}
                  onChange={(e) => setStudioStep(parseFloat(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer bg-zinc-900 rounded-lg h-2"
                />
              </div>

            </div>

            {/* Live Interactive Sandbox Preview (5 cols) */}
            <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-between text-center min-h-[320px] relative overflow-hidden">
              <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-400 pb-3 border-b border-zinc-900">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" /> Real-Time Preview
                </span>
                <span className="text-amber-400 font-bold font-mono">
                  {studioText.length} GLYPHS
                </span>
              </div>

              {/* Live Rendered Custom Button */}
              <div className="my-auto py-6">
                <KineticButton
                  text={studioText || "EMPTY"}
                  tone={studioTone}
                  fx={studioFx}
                  step={studioStep}
                  size="lg"
                  onClick={() => showToast(`Studio: "${studioText}" activated with ${studioTone} tone & ${studioFx} fx!`)}
                  className="shadow-2xl"
                />
              </div>

              {/* Character Breakdown Visualization */}
              <div className="w-full pt-4 border-t border-zinc-900">
                <div className="text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-widest text-left">
                  Character Glyphs Matrix (--i / --n)
                </div>
                <div className="flex flex-wrap gap-1 justify-center max-h-24 overflow-y-auto">
                  {Array.from(studioText).map((c, i) => (
                    <div 
                      key={i} 
                      className="bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-[10px] font-mono text-zinc-300"
                    >
                      <span className="text-white font-bold">{c === " " ? "␣" : c}</span>
                      <span className="text-[8px] text-zinc-500 ml-1">i:{i}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================
            4. 3-COLUMN CODE INSPECTOR (MATCHING SCREENSHOT EXACTLY)
            ======================================================== */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                <Code2 className="w-4 h-4 text-sky-400" /> Engine Source Code
              </div>
              <h3 className="text-2xl font-bold text-white font-mono mt-1">
                Zero-Dependency Architecture
              </h3>
            </div>
            <div className="text-xs font-mono text-zinc-400">
              Vanilla CSS + Web Animations API Promise Lifecycle
            </div>
          </div>

          {/* The 3 Code Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 1. index.html Card (Orange Dot) */}
            <div className="bg-[#0b0c12] border border-zinc-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl group hover:border-zinc-700 transition-colors">
              {/* Header */}
              <div className="bg-[#10121a] px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#f97316]" />
                  <span className="font-mono text-xs font-bold text-white tracking-wide">index.html</span>
                </div>
                <button
                  onClick={() => copySnippet(codeIndexHtml, "html")}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors flex items-center gap-1 font-mono text-[11px]"
                  title="Copy HTML"
                >
                  {copiedCodeId === "html" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCodeId === "html" ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Code Content */}
              <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto text-zinc-300 flex-1 bg-[#08090e]">
                <pre className="text-zinc-300 font-mono whitespace-pre text-[11.5px] leading-6">
                  <span className="text-zinc-500">{`<!-- the tone is a class, the motion is an attribute:\n     any tone wears any of the three motions -->`}</span>{"\n\n"}
                  <span className="text-red-400">&lt;button</span> <span className="text-amber-300">class</span>=<span className="text-emerald-400">&quot;gbtn gbtn--solid&quot;</span>{"\n"}
                  {"        "}<span className="text-sky-300">data-fx</span>=<span className="text-emerald-400">&quot;jump&quot;</span><span className="text-red-400">&gt;</span>{"\n"}
                  {"  "}Jumping{"\n"}
                  <span className="text-red-400">&lt;/button&gt;</span>{"\n\n"}
                  <span className="text-red-400">&lt;button</span> <span className="text-amber-300">class</span>=<span className="text-emerald-400">&quot;gbtn gbtn--contrast&quot;</span>{"\n"}
                  {"        "}<span className="text-sky-300">data-fx</span>=<span className="text-emerald-400">&quot;smoke&quot;</span><span className="text-red-400">&gt;</span>{"\n"}
                  {"  "}Smoke{"\n"}
                  <span className="text-red-400">&lt;/button&gt;</span>{"\n\n"}
                  <span className="text-red-400">&lt;button</span> <span className="text-amber-300">class</span>=<span className="text-emerald-400">&quot;gbtn gbtn--surface&quot;</span>{"\n"}
                  {"        "}<span className="text-sky-300">data-fx</span>=<span className="text-emerald-400">&quot;drive&quot;</span><span className="text-red-400">&gt;</span>{"\n"}
                  {"  "}Drive{"\n"}
                  <span className="text-red-400">&lt;/button&gt;</span>{"\n\n"}
                  <span className="text-zinc-500">{`<!-- the plain word ships in the markup, so with the script\n     off these are three plain, labelled, working buttons -->`}</span>
                </pre>
              </div>
            </div>

            {/* 2. app.css Card (Blue Dot) */}
            <div className="bg-[#0b0c12] border border-zinc-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl group hover:border-zinc-700 transition-colors">
              {/* Header */}
              <div className="bg-[#10121a] px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#38bdf8]" />
                  <span className="font-mono text-xs font-bold text-white tracking-wide">app.css</span>
                </div>
                <button
                  onClick={() => copySnippet(codeAppCss, "css")}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors flex items-center gap-1 font-mono text-[11px]"
                  title="Copy CSS"
                >
                  {copiedCodeId === "css" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCodeId === "css" ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Code Content */}
              <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto text-zinc-300 flex-1 bg-[#08090e]">
                <pre className="text-zinc-300 font-mono whitespace-pre text-[11.5px] leading-6">
                  <span className="text-zinc-500">{`/* one declaration, BOTH directions: --rev is 0 or 1,\n   so it collapses to i, or to n - 1 - i */`}</span>{"\n"}
                  <span className="text-sky-400">.gbtn.is-go .g</span> {"{\n"}
                  {"  "}<span className="text-purple-400">animation-delay</span>: <span className="text-amber-300">calc</span>({"\n"}
                  {"    "}<span className="text-amber-300">var</span>(<span className="text-teal-300">--step</span>) * (<span className="text-amber-300">var</span>(<span className="text-teal-300">--i</span>){"\n"}
                  {"    "}+ <span className="text-amber-300">var</span>(<span className="text-teal-300">--rev</span>) * (<span className="text-amber-300">var</span>(<span className="text-teal-300">--n</span>){"\n"}
                  {"    "}- 1 - 2 * <span className="text-amber-300">var</span>(<span className="text-teal-300">--i</span>))){"\n"}
                  {"  "});{"\n"}
                  {"}"}{"\n\n"}
                  <span className="text-zinc-500">{`/* a round blur under a scaleX comes out stretched along x:\n   one directional smear out of one blur and one scale,\n   then STEPPED across while unseen */`}</span>{"\n"}
                  <span className="text-purple-400">@keyframes</span> <span className="text-sky-300">g-drive</span> {"{\n"}
                  {"  "}<span className="text-amber-400">42%</span> {"{\n"}
                  {"    "}<span className="text-purple-400">transform</span>: <span className="text-blue-300">translateX</span>(<span className="text-emerald-400">-1.5em</span>) <span className="text-blue-300">scaleX</span>(<span className="text-emerald-400">2.3</span>);{"\n"}
                  {"    "}<span className="text-purple-400">filter</span>: <span className="text-blue-300">blur</span>(<span className="text-emerald-400">.11em</span>);{"\n"}
                  {"    "}<span className="text-purple-400">opacity</span>: <span className="text-emerald-400">0</span>;{"\n"}
                  {"  }"}{"\n"}
                  {"  "}<span className="text-zinc-500">/* animation-timing-function: steps(1, end); */</span>{"\n"}
                  {"}"}
                </pre>
              </div>
            </div>

            {/* 3. app.js Card (Yellow Dot) */}
            <div className="bg-[#0b0c12] border border-zinc-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl group hover:border-zinc-700 transition-colors">
              {/* Header */}
              <div className="bg-[#10121a] px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#eab308]" />
                  <span className="font-mono text-xs font-bold text-white tracking-wide">app.js</span>
                </div>
                <button
                  onClick={() => copySnippet(codeAppJs, "js")}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors flex items-center gap-1 font-mono text-[11px]"
                  title="Copy JavaScript"
                >
                  {copiedCodeId === "js" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCodeId === "js" ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Code Content */}
              <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto text-zinc-300 flex-1 bg-[#08090e]">
                <pre className="text-zinc-300 font-mono whitespace-pre text-[11.5px] leading-6">
                  <span className="text-purple-400">function</span> <span className="text-blue-400">play</span>(<span className="text-amber-300">btn</span>, <span className="text-amber-300">fromRight</span>) {"{\n"}
                  {"  "}<span className="text-zinc-500">{`// restarted mid-flight, a CSS animation begins again at\n  // 0%: a letter at its apex would teleport to the floor`}</span>{"\n"}
                  {"  "}<span className="text-purple-400">if</span> (btn.dataset.busy) <span className="text-purple-400">return</span>;{"\n"}
                  {"  "}<span className="text-zinc-500">// --rev: which half of the button the pointer crossed</span>{"\n"}
                  {"  "}btn.style.<span className="text-blue-400">setProperty</span>(<span className="text-emerald-400">&apos;--rev&apos;</span>, fromRight ? <span className="text-amber-400">1</span> : <span className="text-amber-400">0</span>);{"\n"}
                  {"  "}btn.classList.<span className="text-blue-400">add</span>(<span className="text-emerald-400">&apos;is-go&apos;</span>);{"\n"}
                  {"  "}<span className="text-zinc-500">{`// a cancelled run REJECTS its finished promise, so\n  // allSettled, and not all`}</span>{"\n"}
                  {"  "}<span className="text-purple-400">const</span> runs = btn.<span className="text-blue-400">getAnimations</span>({`{ subtree: true }`}){"\n"}
                  {"    "}.<span className="text-blue-400">filter</span>((a) =&gt; a.animationName);{"\n"}
                  {"  "}btn.dataset.busy = <span className="text-emerald-400">&apos;1&apos;</span>;{"\n"}
                  {"  "}<span className="text-sky-300">Promise</span>.<span className="text-blue-400">allSettled</span>(runs.<span className="text-blue-400">map</span>((a) =&gt; a.finished)).<span className="text-blue-400">then</span>(() =&gt; {"{\n"}
                  {"    "}btn.classList.<span className="text-blue-400">remove</span>(<span className="text-emerald-400">&apos;is-go&apos;</span>);{"\n"}
                  {"    "}<span className="text-purple-400">delete</span> btn.dataset.busy;{"\n"}
                  {"  }"});{"\n"}
                  {"}"}
                </pre>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================
            5. PRACTICAL APPLICATION PRESETS (STORE & CTA ACTIONS)
            ======================================================== */}
        <div className="bg-[#0b0d14] border border-zinc-800 rounded-3xl p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                <Zap className="w-4 h-4" /> Live Website Integrations
              </div>
              <h3 className="text-xl font-bold text-white font-mono mt-1">
                Battle-Tested Store & Navigation Actions
              </h3>
            </div>
            <div className="text-xs font-mono text-zinc-400">
              Click any button to trigger live store mechanics
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Preset 1: Add to Cart */}
            <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white font-mono">Store Purchase CTA</div>
                <div className="text-[11px] text-zinc-500 font-mono">Crimson Solid + Jump</div>
              </div>
              <KineticButton
                text="Add to Cart"
                tone="crimson"
                fx="jump"
                icon={<ShoppingBag className="w-4 h-4" />}
                onClick={() => {
                  onAddToCart?.({ id: "artisan_1", name: "Artisan Reserva Cigar", price: 42 });
                  showToast("Added 'Artisan Reserva' to Cart with Kinetic Jump!");
                }}
              />
            </div>

            {/* Preset 2: Catalog Jump */}
            <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white font-mono">Explore Catalog</div>
                <div className="text-[11px] text-zinc-500 font-mono">Solid Contrast + Drive</div>
              </div>
              <KineticButton
                text="Catalog"
                tone="solid"
                fx="drive"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                onClick={() => {
                  onScrollToCatalog?.();
                  showToast("Scrolling to Live Inventory Catalog!");
                }}
              />
            </div>

            {/* Preset 3: Age Verification */}
            <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white font-mono">Age Verification</div>
                <div className="text-[11px] text-zinc-500 font-mono">Contrast Tone + Smoke</div>
              </div>
              <KineticButton
                text="Verify 21+"
                tone="contrast"
                fx="smoke"
                icon={<ShieldCheck className="w-4 h-4 text-emerald-400" />}
                onClick={() => showToast("Age Verification Simulation Verified: Age 24+ Token Active.")}
              />
            </div>

            {/* Preset 4: AI Command Console */}
            <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white font-mono">AI Command Suite</div>
                <div className="text-[11px] text-zinc-500 font-mono">Cyber Amber + Flip</div>
              </div>
              <KineticButton
                text="AI Console"
                tone="cyber"
                fx="flip"
                icon={<Cpu className="w-4 h-4" />}
                onClick={() => {
                  onScrollToConsole?.();
                  showToast("Jumping to Dynamic AI Prompt Console!");
                }}
              />
            </div>

            {/* Preset 5: Flash Voucher */}
            <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white font-mono">Flash Promo Coupon</div>
                <div className="text-[11px] text-zinc-500 font-mono">Emerald Neon + Jump</div>
              </div>
              <KineticButton
                text="Claim 20% Off"
                tone="emerald"
                fx="jump"
                icon={<Flame className="w-4 h-4 text-amber-400" />}
                onClick={() => showToast("Flash Coupon 'AURA_VIP_20' Copied to Session!")}
              />
            </div>

            {/* Preset 6: View Cart */}
            <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white font-mono">Slide-Over Cart</div>
                <div className="text-[11px] text-zinc-500 font-mono">Surface Glass + Drive</div>
              </div>
              <KineticButton
                text="Open Cart"
                tone="surface"
                fx="drive"
                icon={<ShoppingBag className="w-4 h-4" />}
                onClick={() => {
                  onOpenCart?.();
                  showToast("Slide-over Shopping Cart Drawer Activated.");
                }}
              />
            </div>

          </div>
        </div>

        {/* ========================================================
            6. BLUR REVEAL & STAGGERED BLUR TYPOGRAPHY STUDIO
            ======================================================== */}
        <div className="bg-[#0b0c14] border border-zinc-800 rounded-3xl p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Blur Reveal & Staggered Typography Engine
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white font-mono mt-1">
                Character-by-Character Focus & Blur Reveal
              </h3>
            </div>
            <button
              onClick={() => {
                setBlurReplayKey((prev) => prev + 1);
                showToast("Replayed Blur Reveal & Staggered Focus animations!");
              }}
              className="py-1.5 px-4 rounded-xl bg-sky-950/80 border border-sky-500/40 text-sky-300 font-mono text-xs font-bold hover:bg-sky-900/80 transition-all flex items-center gap-2 shadow-lg"
            >
              <Play className="w-3.5 h-3.5 text-sky-400" /> Replay Blur Animation
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Live Visual Demonstration */}
            <div key={blurReplayKey} className="space-y-6 bg-zinc-950 border border-zinc-800/90 rounded-2xl p-6">
              
              {/* Effect 1: Premium Pill Button (Hover / Sequential Blur Reveal) */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider flex items-center justify-between">
                  <span>Effect 1: &lt;button class=&quot;premium-btn&quot;&gt; (Hover Sequential Blur)</span>
                  <span className="text-emerald-400 font-bold">HOVER ME</span>
                </div>
                <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80 flex items-center justify-center min-h-[75px]">
                  <button className="premium-btn text-lg">
                    <span className="text-wrapper">
                      <span style={{ ["--idx" as string]: 1 }}>O</span>
                      <span style={{ ["--idx" as string]: 2 }}>k</span>
                      <span style={{ ["--idx" as string]: 3 }}>a</span>
                      <span style={{ ["--idx" as string]: 4 }}>y</span>
                    </span>
                  </button>
                </div>
              </div>

              {/* Effect 2: Staggered Blur Heading */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  Effect 2: .staggered-blur (Character Staggered Delay)
                </div>
                <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80 flex items-center justify-center min-h-[70px]">
                  <h1 className="staggered-blur text-3xl md:text-4xl font-extrabold font-mono text-white tracking-wide">
                    <span style={{ ["--delay" as string]: 1 }}>O</span>
                    <span style={{ ["--delay" as string]: 2 }}>k</span>
                    <span style={{ ["--delay" as string]: 3 }}>a</span>
                    <span style={{ ["--delay" as string]: 4 }}>y</span>
                  </h1>
                </div>
              </div>

              {/* Effect 3: Blur Reveal Focus In */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  Effect 3: .blur-reveal (Full Word Focus In)
                </div>
                <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80 flex items-center justify-center min-h-[70px]">
                  <div className="blur-reveal font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-300 to-amber-300 text-2xl">
                    AURA KINETIC SYSTEM
                  </div>
                </div>
              </div>

              {/* Effect 4: Dynamic Reusable PremiumBlurButton */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  Effect 4: &lt;PremiumBlurButton /&gt; Component
                </div>
                <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80 flex items-center justify-center min-h-[75px] gap-3">
                  <PremiumBlurButton text="DISCOVER" />
                  <PremiumBlurButton text="INNOVATE" />
                  <PremiumBlurButton text="PURCHASE" />
                </div>
              </div>
            </div>

            {/* Code Snippet Inspector */}
            <div className="bg-[#090a10] border border-zinc-800 rounded-2xl p-5 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-zinc-400 font-bold">CSS & Markup Specification</span>
                <button
                  onClick={() => {
                    const snippet = `/* 1. Premium Pill Button */
.premium-btn {
  background-color: #12131a;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.text-wrapper {
  display: inline-flex;
}

.text-wrapper span {
  display: inline-block;
  opacity: 0;
  filter: blur(8px);
  transform: scale(0.9);
  animation: blurReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: calc(var(--idx) * 0.05s);
}

@keyframes blurReveal {
  0% { opacity: 0; filter: blur(8px); transform: scale(0.9); }
  100% { opacity: 1; filter: blur(0px); transform: scale(1); }
}

.premium-btn:hover {
  background-color: #1a1c26;
  border-color: rgba(255, 255, 255, 0.25);
}

.premium-btn:hover .text-wrapper span {
  animation: blurRevealHover 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  animation-delay: calc(var(--idx) * 0.04s);
}

@keyframes blurRevealHover {
  0% { opacity: 0.3; filter: blur(6px); }
  100% { opacity: 1; filter: blur(0px); }
}`;
                    copySnippet(snippet, "blur-spec");
                  }}
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] flex items-center gap-1 transition-colors"
                >
                  {copiedCodeId === "blur-spec" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCodeId === "blur-spec" ? "Copied CSS" : "Copy CSS"}</span>
                </button>
              </div>

              <pre className="text-zinc-300 leading-relaxed overflow-x-auto text-[11px] p-2 bg-zinc-950 rounded-lg max-h-[380px] overflow-y-auto">
                <span className="text-zinc-500">{`<!-- The Pill Button Markup -->`}</span>{"\n"}
                <span className="text-red-400">&lt;button</span> <span className="text-amber-300">class</span>=<span className="text-emerald-400">&quot;premium-btn&quot;</span><span className="text-red-400">&gt;</span>{"\n"}
                {"  "}&lt;span class=&quot;text-wrapper&quot;&gt;{"\n"}
                {"    "}&lt;span style=&quot;--idx: 1&quot;&gt;O&lt;/span&gt;{"\n"}
                {"    "}&lt;span style=&quot;--idx: 2&quot;&gt;k&lt;/span&gt;{"\n"}
                {"    "}&lt;span style=&quot;--idx: 3&quot;&gt;a&lt;/span&gt;{"\n"}
                {"    "}&lt;span style=&quot;--idx: 4&quot;&gt;y&lt;/span&gt;{"\n"}
                {"  "}&lt;/span&gt;{"\n"}
                <span className="text-red-400">&lt;/button&gt;</span>{"\n\n"}
                <span className="text-purple-400">.premium-btn:hover .text-wrapper span</span> {"{\n"}
                {"  "}<span className="text-sky-400">animation</span>: blurRevealHover <span className="text-emerald-300">0.5s</span> forwards;{"\n"}
                {"  "}<span className="text-sky-400">animation-delay</span>: <span className="text-amber-300">calc</span>(<span className="text-amber-300">var</span>(--idx) * <span className="text-emerald-300">0.04s</span>);{"\n"}
                {"}"}
              </pre>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
