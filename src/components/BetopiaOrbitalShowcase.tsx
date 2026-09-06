"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Zap, 
  Globe2, 
  CheckCircle2, 
  Terminal,
  Activity
} from "lucide-react";

interface FeaturePill {
  id: string;
  icon: React.ReactNode;
  label: string;
  tagline: string;
  category: string;
  color: string;
  stats: { label: string; value: string; detail: string }[];
  codeSample: string;
}

const FEATURE_PILLS: FeaturePill[] = [
  {
    id: "models",
    icon: (
      <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    label: "10+ frontier AI models",
    tagline: "Ultra-high reasoning & multimodal intelligence",
    category: "FOUNDATIONAL ENGINES",
    color: "#ff7a18",
    stats: [
      { label: "Active Models", value: "14 Frontier", detail: "Claude 3.7, GPT-4.5, Gemini 2.0 Pro, DeepSeek R1" },
      { label: "Reasoning Depth", value: "64k Tokens", detail: "Extended step-by-step chain of thought" },
      { label: "Context Window", value: "2,000,000", detail: "Full repo & enterprise knowledge ingestion" }
    ],
    codeSample: `// Dynamic BetopiaAI Frontier Model Dispatcher
const response = await betopia.models.stream({
  model: "betopia-frontier-2.5-reasoning",
  prompt: "Synthesize full-stack architecture with zero-alloc buffers",
  temperature: 0.2,
  reasoningEffort: "high"
});`
  },
  {
    id: "latency",
    icon: <Zap className="w-4 h-4 text-orange-400" />,
    label: "Low-latency APIs & streaming",
    tagline: "Sub-20ms Time-to-First-Token global streaming",
    category: "REAL-TIME STREAMING",
    color: "#ff5e00",
    stats: [
      { label: "TTFT (Edge)", value: "16.4 ms", detail: "Optimized KV-cache pre-warming" },
      { label: "Stream Throughput", value: "142 tok/sec", detail: "HTTP/3 & bidirectional WebSockets" },
      { label: "Global Edge POPs", value: "38 Hubs", detail: "Sub-millisecond routing from London, Tokyo, NYC" }
    ],
    codeSample: `// Real-Time WebSocket Streaming Channel
const ws = betopia.createLiveStream("session_live_99");
ws.on("token", (chunk) => process.stdout.write(chunk));
ws.on("metrics", ({ latencyMs }) => console.log(\`TTFT: \${latencyMs}ms\`));`
  },
  {
    id: "infra",
    icon: <Globe2 className="w-4 h-4 text-emerald-400" />,
    label: "Production-ready infrastructure",
    tagline: "Multi-region failover, 99.999% SLA & zero downtime",
    category: "ENTERPRISE BACKBONE",
    color: "#10b981",
    stats: [
      { label: "Service Uptime", value: "99.999%", detail: "Automated multi-cloud failover" },
      { label: "Concurrent Invocations", value: "2.5M / min", detail: "Auto-scaling Kubernetes edge pods" },
      { label: "Security & SOC2", value: "Type II Verified", detail: "End-to-end encrypted model weights" }
    ],
    codeSample: `// Multi-Region Cluster Status Probe
const infraHealth = await betopia.infra.getClusterHealth({
  regions: ["us-east", "eu-central", "ap-southeast"],
  redundancyMode: "active-active"
});
// Status: 100% HEALTHY (Zero dropped frames)`
  }
];

// Interactive Celestial Orbital Canvas
function OrbitalCanvas({ 
  activeFeatureId, 
  mouseRef 
}: { 
  activeFeatureId: string; 
  mouseRef: React.RefObject<{ x: number; y: number }> 
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angleBase = 0;

    // Orbital configuration matching Image 1
    const orbits = [
      {
        radiusX: 180,
        radiusY: 130,
        tilt: -0.25,
        color: "rgba(255, 122, 24, 0.4)",
        activeColor: "rgba(255, 140, 0, 0.8)",
        speed: 0.008,
        nodeCount: 3,
        nodeColor: "#ff9d42",
        nodeSize: 4.5,
        targetFeature: "models"
      },
      {
        radiusX: 290,
        radiusY: 210,
        tilt: 0.35,
        color: "rgba(175, 64, 255, 0.35)",
        activeColor: "rgba(210, 105, 255, 0.85)",
        speed: 0.005,
        nodeCount: 4,
        nodeColor: "#c084fc",
        nodeSize: 5.5,
        targetFeature: "latency"
      },
      {
        radiusX: 410,
        radiusY: 280,
        tilt: -0.15,
        color: "rgba(16, 185, 129, 0.3)",
        activeColor: "rgba(52, 211, 153, 0.8)",
        speed: 0.0035,
        nodeCount: 5,
        nodeColor: "#34d399",
        nodeSize: 6,
        targetFeature: "infra"
      }
    ];

    // Background cosmic particle grid
    const particles: { x: number; y: number; size: number; opacity: number; pulseSpeed: number }[] = [];
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.8 + 0.6,
        opacity: Math.random() * 0.5 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.005
      });
    }

    const render = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      // Render dot matrix grid background
      const gridSpacing = 36;
      ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      for (let gx = 0; gx < width; gx += gridSpacing) {
        for (let gy = 0; gy < height; gy += gridSpacing) {
          ctx.beginPath();
          ctx.arc(gx, gy, 0.85, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Render floating cosmic starry particles
      particles.forEach((p, idx) => {
        const px = p.x * width;
        const py = p.y * height;
        p.opacity += Math.sin(angleBase * 2 + idx) * 0.002;
        const currentOpacity = Math.min(0.8, Math.max(0.1, p.opacity));
        ctx.fillStyle = idx % 2 === 0 
          ? `rgba(255, 180, 100, ${currentOpacity})` 
          : `rgba(180, 160, 255, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Center point for celestial system (anchored slightly right like the screenshot)
      const mouseX = mouseRef.current?.x ?? width * 0.65;
      const mouseY = mouseRef.current?.y ?? height * 0.5;
      const originX = width * 0.68 + (mouseX - width * 0.68) * 0.05;
      const originY = height * 0.52 + (mouseY - height * 0.52) * 0.05;

      angleBase += 0.01;

      // Draw Main Glowing Central Sun / Pulsar Orb (Top intersection like screenshot)
      const sunX = originX - 110;
      const sunY = originY - 80;

      // Sun Outer Glow
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 5, sunX, sunY, 120);
      sunGlow.addColorStop(0, "rgba(255, 160, 60, 0.85)");
      sunGlow.addColorStop(0.3, "rgba(255, 110, 20, 0.35)");
      sunGlow.addColorStop(0.7, "rgba(255, 60, 0, 0.08)");
      sunGlow.addColorStop(1, "rgba(255, 60, 0, 0)");
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 120, 0, Math.PI * 2);
      ctx.fill();

      // Sun Core Orb
      const sunCore = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, 22);
      sunCore.addColorStop(0, "#ffffff");
      sunCore.addColorStop(0.4, "#ffd188");
      sunCore.addColorStop(0.8, "#ff7a18");
      sunCore.addColorStop(1, "rgba(255, 100, 0, 0.4)");
      ctx.fillStyle = sunCore;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 22, 0, Math.PI * 2);
      ctx.fill();

      // Draw each planetary orbit ellipse and revolving planetary nodes
      orbits.forEach((orb) => {
        const isSelected = orb.targetFeature === activeFeatureId;
        const currentSpeed = isSelected ? orb.speed * 1.6 : orb.speed;

        ctx.save();
        ctx.translate(originX, originY);
        ctx.rotate(orb.tilt);

        // Orbital Line
        ctx.beginPath();
        ctx.ellipse(0, 0, orb.radiusX, orb.radiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = isSelected ? orb.activeColor : orb.color;
        ctx.lineWidth = isSelected ? 1.8 : 1.1;
        ctx.stroke();

        // Orbit Subtle Glow if active
        if (isSelected) {
          ctx.lineWidth = 4;
          ctx.strokeStyle = orb.activeColor.replace("0.8", "0.2").replace("0.85", "0.2");
          ctx.stroke();
        }

        // Draw revolving planetary nodes along the ellipse
        for (let n = 0; n < orb.nodeCount; n++) {
          const nodeAngle = angleBase * (currentSpeed * 100) + (n * (Math.PI * 2)) / orb.nodeCount;
          const nx = Math.cos(nodeAngle) * orb.radiusX;
          const ny = Math.sin(nodeAngle) * orb.radiusY;

          // Planetary Node Halo Glow
          const nodeGlow = ctx.createRadialGradient(nx, ny, 1, nx, ny, orb.nodeSize * 4);
          nodeGlow.addColorStop(0, orb.nodeColor);
          nodeGlow.addColorStop(0.5, isSelected ? orb.activeColor : "rgba(255, 255, 255, 0.2)");
          nodeGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.fillStyle = nodeGlow;
          ctx.beginPath();
          ctx.arc(nx, ny, orb.nodeSize * 4, 0, Math.PI * 2);
          ctx.fill();

          // Planetary Node Solid Core
          ctx.fillStyle = isSelected ? "#ffffff" : orb.nodeColor;
          ctx.beginPath();
          ctx.arc(nx, ny, isSelected ? orb.nodeSize * 1.3 : orb.nodeSize, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [activeFeatureId, mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full z-0"
    />
  );
}

export default function BetopiaOrbitalShowcase() {
  const [activeFeature, setActiveFeature] = useState<string>("models");
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<"metrics" | "code">("metrics");
  const [isCopied, setIsCopied] = useState(false);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const activePill = FEATURE_PILLS.find((f) => f.id === activeFeature) || FEATURE_PILLS[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(activePill.codeSample);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <section
      id="betopia-orbital"
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] bg-[#07080d] text-white overflow-hidden py-16 flex flex-col justify-between border-b border-zinc-800/80 select-none cursor-none"
    >
      {/* Background Celestial Planetary Canvas */}
      <OrbitalCanvas activeFeatureId={activeFeature} mouseRef={mouseRef} />

      {/* Top Header Logo */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-center sm:justify-start gap-2.5 pt-2">
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-xl text-white">
            <span>Betopia</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff7a18] via-[#e24c7d] to-[#af40ff]">
              AI
            </span>
          </div>
          <span className="text-[10px] font-mono font-semibold tracking-wider uppercase px-2 py-0.5 rounded border border-zinc-700/80 bg-zinc-900/90 text-zinc-400 backdrop-blur-md">
            BETA
          </span>
        </div>
      </div>

      {/* Main Content Showcase */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT SIDE: HEADLINE & 3 INTERACTIVE FEATURE PILLS */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Main Headline with Vibrant Gradient Word */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Build intelligent{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff7a18] via-[#ff5e00] to-[#af40ff] transition-all duration-700 drop-shadow-sm">
                products
              </span>{" "}
              faster.
            </h2>

            {/* Subtitle */}
            <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-lg mx-auto lg:mx-0 font-normal leading-relaxed">
              Your models, APIs, studio, and developer tools all in one platform.
            </p>

            {/* 3 Interactive Feature Badges / Pills Stack */}
            <div className="flex flex-col gap-3.5 pt-4 max-w-md mx-auto lg:mx-0">
              {FEATURE_PILLS.map((pill) => {
                const isSelected = pill.id === activeFeature;
                return (
                  <button
                    key={pill.id}
                    onClick={() => setActiveFeature(pill.id)}
                    className={`group relative flex items-center justify-between px-5 py-3.5 rounded-full text-left transition-all duration-300 border backdrop-blur-md cursor-none ${
                      isSelected
                        ? "bg-[#181109]/90 border-[#ff7a18] shadow-[0_0_24px_rgba(255,122,24,0.3)] scale-[1.02]"
                        : "bg-[#0d0f17]/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-[#121622]/80 text-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Icon circle */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-[#ff7a18]/20 border border-[#ff7a18]/60 shadow-[0_0_10px_rgba(255,122,24,0.5)]"
                            : "bg-zinc-800/70 border border-zinc-700/50 group-hover:border-zinc-500"
                        }`}
                      >
                        {pill.icon}
                      </div>

                      {/* Pill Label */}
                      <div className="flex flex-col">
                        <span className={`text-sm sm:text-base font-semibold tracking-wide transition-colors ${
                          isSelected ? "text-white" : "text-zinc-300 group-hover:text-white"
                        }`}>
                          {pill.label}
                        </span>
                      </div>
                    </div>

                    {/* Active pulse indicator dot */}
                    {isSelected && (
                      <div className="flex items-center gap-1.5 pl-2">
                        <span className="w-2 h-2 rounded-full bg-[#ff7a18] animate-ping" />
                        <span className="w-2 h-2 rounded-full bg-[#ff7a18]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: TRANSITIONAL LIVE TELEMETRY & ENGINE CONSOLE */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="rounded-2xl bg-[#0d0f18]/90 border border-zinc-800/90 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-zinc-700">
              
              {/* Telemetry Card Header */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#121524] border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-zinc-400 ml-2">
                    {activePill.category}
                  </span>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 bg-zinc-900/90 p-1 rounded-lg border border-zinc-800 text-[11px] font-mono">
                  <button
                    onClick={() => setActiveTelemetryTab("metrics")}
                    className={`px-2.5 py-1 rounded transition-colors cursor-none ${
                      activeTelemetryTab === "metrics"
                        ? "bg-[#ff7a18] text-white font-bold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Metrics
                  </button>
                  <button
                    onClick={() => setActiveTelemetryTab("code")}
                    className={`px-2.5 py-1 rounded transition-colors cursor-none ${
                      activeTelemetryTab === "code"
                        ? "bg-[#ff7a18] text-white font-bold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    API Hook
                  </button>
                </div>
              </div>

              {/* Dynamic Body Transition */}
              <div className="p-6 transition-all duration-300">
                {activeTelemetryTab === "metrics" ? (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
                      <div>
                        <h4 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                          <span>{activePill.label}</span>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </h4>
                        <p className="text-xs text-zinc-400">{activePill.tagline}</p>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE 100% SLA
                      </span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid sm:grid-cols-3 gap-3 pt-2">
                      {activePill.stats.map((stat, i) => (
                        <div
                          key={i}
                          className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-3.5 hover:border-[#ff7a18]/40 transition-colors"
                        >
                          <span className="text-[11px] font-mono text-zinc-500 block">
                            {stat.label}
                          </span>
                          <span className="text-base sm:text-lg font-extrabold text-white block mt-0.5 tracking-tight">
                            {stat.value}
                          </span>
                          <span className="text-[10px] text-zinc-400 block mt-1 leading-tight">
                            {stat.detail}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Orbital Live Sync Bar */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-[#ff7a18] animate-pulse" />
                          Celestial Orbit Synced Stream
                        </span>
                        <span className="text-emerald-400">60 FPS Hardware Glitch-Free</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#ff7a18] via-[#e24c7d] to-[#af40ff] transition-all duration-700"
                          style={{ width: activeFeature === "models" ? "94%" : activeFeature === "latency" ? "99%" : "96%" }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[#ff7a18]" />
                        TypeScript Integration SDK
                      </span>
                      <button
                        onClick={handleCopyCode}
                        className="text-[11px] font-mono text-[#ff7a18] hover:text-white px-2 py-0.5 rounded border border-[#ff7a18]/40 hover:bg-[#ff7a18]/20 transition-all cursor-none"
                      >
                        {isCopied ? "✓ Copied!" : "Copy snippet"}
                      </button>
                    </div>
                    <pre className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed selection:bg-[#ff7a18]/30">
                      <code>{activePill.codeSample}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer from Image 1 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center pb-2">
        <p className="text-xs font-sans text-zinc-500 tracking-wide">
          © 2025 Betopia AI · <a href="#catalog" className="hover:text-zinc-400 underline underline-offset-4 cursor-none">Terms</a> · <a href="#catalog" className="hover:text-zinc-400 underline underline-offset-4 cursor-none">Privacy</a>
        </p>
      </div>
    </section>
  );
}
