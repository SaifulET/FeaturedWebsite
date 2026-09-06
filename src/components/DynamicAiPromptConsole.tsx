"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowUp, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Copy, 
  Check, 
  RotateCcw, 
  Terminal, 
  Flame, 
  Zap, 
  Code2, 
  Cpu, 
  Sliders
} from "lucide-react";

interface PresetPrompt {
  id: string;
  category: string;
  promptText: string;
  generatedFileName: string;
  executionSteps: { title: string; detail: string; delay: number }[];
  streamCode: string;
  coverageStats: { suites: string; tests: string; time: string; coverage: string };
}

const PRESET_PROMPTS: PresetPrompt[] = [
  {
    id: "checkout-tests",
    category: "Unit Tests",
    promptText: "Write unit tests for my checkout flow..",
    generatedFileName: "checkout-flow.test.ts",
    executionSteps: [
      { title: "Analyzing checkout state schema", detail: "Loaded CartItem, DiscountCoupon & PaymentIntent types", delay: 400 },
      { title: "Generating test cases & boundary conditions", detail: "Synthesizing 8 positive flows & 6 edge-case regressions", delay: 900 },
      { title: "Mocking Stripe & Payment Gateways", delay: 1400, detail: "Injecting idempotent webhook listener stubs" },
      { title: "Executing Vitest sandbox runner", delay: 1900, detail: "All 14 assertions passed in 1.12s" }
    ],
    coverageStats: { suites: "1 passed, 1 total", tests: "14 passed, 14 total", time: "1.12s", coverage: "98.4%" },
    streamCode: `import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CheckoutSession } from '@/services/checkout';
import { mockPaymentGateway } from '@/mocks/gateway';

describe('Aura Store - Robust Checkout Flow Suite', () => {
  let session: CheckoutSession;

  beforeEach(() => {
    session = new CheckoutSession({
      userId: 'usr_alpha_994',
      currency: 'USD',
      items: [
        { id: 'item_101', name: 'Artisan Reserva', price: 42.00, quantity: 2 },
        { id: 'item_102', name: 'Carbon Humidor', price: 85.00, quantity: 1 }
      ]
    });
  });

  it('calculates gross subtotal, applied vouchers, and sales tax correctly', () => {
    session.applyVoucher('AURA_VIP_20');
    expect(session.getSubtotal()).toBe(169.00);
    expect(session.getDiscountAmount()).toBe(33.80);
    expect(session.getFinalTotal()).toBe(135.20);
  });

  it('verifies legal age verification token before payment intent creation', async () => {
    session.setAgeVerificationStatus({ verified: true, age: 24, provider: 'Persona' });
    const intent = await session.createPaymentIntent(mockPaymentGateway);
    
    expect(intent.status).toBe('requires_capture');
    expect(intent.id).toMatch(/^pi_[a-zA-Z0-9]{24}$/);
  });

  it('handles card authorization declines with graceful retry backoff', async () => {
    mockPaymentGateway.simulateDeclineOnce('insufficient_funds');
    const result = await session.processOrder();
    
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('PAYMENT_DECLINED');
    expect(session.cartItems.length).toBe(2); // Cart must stay intact!
  });
});`
  },
  {
    id: "ws-stream",
    category: "Real-Time WebSocket",
    promptText: "Generate low-latency WebSocket streaming handler..",
    generatedFileName: "stream-gateway.ts",
    executionSteps: [
      { title: "Binding TCP buffer & socket channel", detail: "Configuring uWebSockets.js kernel ring buffer", delay: 400 },
      { title: "Attaching backpressure rate-limiter", detail: "Preventing client frame dropped packets", delay: 900 },
      { title: "Broadcasting real-time ticker state", detail: "Sub-5ms tick propagation to 25k subscribers", delay: 1400 },
      { title: "Verifying binary serialization", detail: "Protobuf & MessagePack compression validated", delay: 1900 }
    ],
    coverageStats: { suites: "1 passed, 1 total", tests: "9 passed, 9 total", time: "0.84s", coverage: "100%" },
    streamCode: `import { App, WebSocket } from 'uWebSockets.js';
import { serializeTickerPayload } from '@/lib/binary';

export class LiveStreamingEngine {
  private app = App();
  private activeClients = new Set<WebSocket<any>>();

  public initialize(port: number = 8080) {
    this.app.ws('/stream/v1/ticker', {
      compression: 1, // gzip & permessage-deflate
      maxPayloadLength: 16 * 1024,
      idleTimeout: 30,

      open: (ws) => {
        this.activeClients.add(ws);
        ws.subscribe('live-store-channel');
      },

      message: (ws, message, isBinary) => {
        // Echo latency probe
        ws.send(message, isBinary);
      },

      close: (ws) => {
        this.activeClients.delete(ws);
      }
    }).listen(port, (token) => {
      console.log(\`⚡ WebSocket Stream Gateway active on port \${port}\`);
    });
  }
}`
  },
  {
    id: "db-indexer",
    category: "Database Indexing",
    promptText: "Optimize PostgreSQL compound indexes for 50k QPS..",
    generatedFileName: "optimized-schema.sql",
    executionSteps: [
      { title: "Inspecting query EXPLAIN ANALYZE traces", detail: "Detected sequential scans on orders table", delay: 400 },
      { title: "Constructing Partial B-Tree Indexes", detail: "Filtering active pending checkout transactions", delay: 900 },
      { title: "Applying BRIN indexing on temporal logs", detail: "Reduced memory index footprint by 84%", delay: 1400 },
      { title: "Query performance benchmark passed", detail: "Mean execution latency reduced from 88ms to 1.8ms", delay: 1900 }
    ],
    coverageStats: { suites: "1 passed, 1 total", tests: "6 passed, 6 total", time: "0.45s", coverage: "99.1%" },
    streamCode: `-- PostgreSQL High-Throughput Compound Index Optimization
-- Target: 50,000 QPS Real-time Order Ledger

-- 1. Create partial index for pending orders to avoid full table bloat
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_active_checkout
ON orders (user_id, status, created_at DESC)
WHERE status IN ('pending', 'processing');

-- 2. BRIN index on timestamp partition for ultra-compact archival lookup
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_audit_brin
ON orders USING BRIN (created_at)
WITH (pages_per_range = 128);

-- 3. Covering index with INCLUDE clause for zero heap-fetch lookups
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_inventory_sku_stock
ON inventory (sku_code, warehouse_id)
INCLUDE (available_stock, reserved_stock, price_cents);`
  }
];

export default function DynamicAiPromptConsole() {
  const [selectedPromptIdx, setSelectedPromptIdx] = useState(0);
  const [inputText, setInputText] = useState("");
  const [isTypingAnimation, setIsTypingAnimation] = useState(true);
  const [typedChars, setTypedChars] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Execution States
  const [isExecuting, setIsExecuting] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [streamedCodeLength, setStreamedCodeLength] = useState(0);
  const [isStreamComplete, setIsStreamComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "trace" | "coverage">("code");
  const [copied, setCopied] = useState(false);

  const activePreset = PRESET_PROMPTS[selectedPromptIdx];

  // Dynamic Typewriter cycling when idle and not executing
  useEffect(() => {
    if (isExecuting || !isTypingAnimation) return;

    const currentPhrase = activePreset.promptText;
    let timer: NodeJS.Timeout;

    if (!isDeleting && typedChars < currentPhrase.length) {
      timer = setTimeout(() => {
        setTypedChars((prev) => prev + 1);
      }, 75);
    } else if (!isDeleting && typedChars === currentPhrase.length) {
      // Pause at full text
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 3500);
    } else if (isDeleting && typedChars > 0) {
      timer = setTimeout(() => {
        setTypedChars((prev) => prev - 1);
      }, 35);
    } else if (isDeleting && typedChars === 0) {
      setIsDeleting(false);
      setSelectedPromptIdx((prev) => (prev + 1) % PRESET_PROMPTS.length);
    }

    return () => clearTimeout(timer);
  }, [typedChars, isDeleting, selectedPromptIdx, isTypingAnimation, isExecuting, activePreset.promptText]);

  // Handle Triggering Execution Transition
  const handleStartExecution = (presetIndex?: number) => {
    const targetIdx = presetIndex !== undefined ? presetIndex : selectedPromptIdx;
    if (presetIndex !== undefined) {
      setSelectedPromptIdx(presetIndex);
    }

    setIsTypingAnimation(false);
    setIsExecuting(true);
    setCompletedSteps([]);
    setStreamedCodeLength(0);
    setIsStreamComplete(false);
    setActiveTab("code");

    const targetPreset = PRESET_PROMPTS[targetIdx];

    // Trigger step progression
    targetPreset.executionSteps.forEach((step, idx) => {
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, idx]);
      }, step.delay);
    });

    // Trigger progressive code streaming
    const codeTotal = targetPreset.streamCode.length;
    let currentLength = 0;
    const streamInterval = setInterval(() => {
      currentLength += Math.floor(Math.random() * 22) + 12;
      if (currentLength >= codeTotal) {
        currentLength = codeTotal;
        clearInterval(streamInterval);
        setIsStreamComplete(true);
      }
      setStreamedCodeLength(currentLength);
    }, 40);
  };

  const handleResetToInput = () => {
    setIsExecuting(false);
    setIsTypingAnimation(true);
    setTypedChars(0);
    setIsDeleting(false);
    setCompletedSteps([]);
    setStreamedCodeLength(0);
    setIsStreamComplete(false);
  };

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(activePreset.streamCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentDisplayText = isTypingAnimation 
    ? activePreset.promptText.substring(0, typedChars)
    : inputText || activePreset.promptText;

  return (
    <section id="ai-console" className="relative py-20 bg-[#090a10] text-white border-b border-zinc-800/80 overflow-hidden select-none cursor-none">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-r from-[#ff5e00]/15 via-[#ff7a18]/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18120b] border border-[#ff7a18]/40 text-[#ff7a18] text-xs font-mono font-semibold shadow-md">
            <Flame className="w-3.5 h-3.5 text-[#ff7a18] animate-bounce" />
            <span>AI AGENT COMMAND CONSOLE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Instant Synthesis &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff7a18] via-[#ff5e00] to-[#ff9d42]">
              Live Code Streaming
            </span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
            Interact directly with the agent prompt console. Watch dynamic real-time reasoning transitions, AST synthesis, and automated test suite execution.
          </p>
        </div>

        {/* Quick Suggestion Preset Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <span className="text-xs font-mono text-zinc-500 mr-1 flex items-center gap-1">
            <Sliders className="w-3 h-3 text-zinc-400" /> Presets:
          </span>
          {PRESET_PROMPTS.map((preset, idx) => (
            <button
              key={preset.id}
              onClick={() => handleStartExecution(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border cursor-none flex items-center gap-1.5 ${
                selectedPromptIdx === idx
                  ? "bg-[#ff5e00]/15 border-[#ff5e00] text-[#ff7a18] shadow-[0_0_12px_rgba(255,94,0,0.3)]"
                  : "bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>{preset.category}</span>
            </button>
          ))}
        </div>

        {/* THE MAIN PROMPT INPUT CARD MATCHING IMAGE 2 EXACTLY */}
        <div className="relative group transition-all duration-300">
          <div
            className={`relative rounded-3xl bg-[#0e1017]/95 border-2 transition-all duration-500 shadow-2xl overflow-hidden ${
              isExecuting
                ? "border-[#ff7a18]/70 shadow-[0_0_35px_rgba(255,122,24,0.25)]"
                : "border-[#ff5e00] shadow-[0_0_30px_rgba(255,94,0,0.2)] hover:shadow-[0_0_40px_rgba(255,94,0,0.35)]"
            }`}
          >
            {/* Input Form Bar (Exact design from Image 2) */}
            <div className="flex items-center justify-between px-6 py-5 sm:py-6 gap-4 min-h-[90px]">
              
              {/* Typing Prompt Display / Editable Area */}
              <div 
                onClick={() => {
                  setIsTypingAnimation(false);
                }}
                className="flex-1 flex items-center text-base sm:text-xl font-normal text-zinc-200 font-sans tracking-tight min-w-0"
              >
                <span className="truncate">{currentDisplayText}</span>
                {/* Blinking Orange Cursor (From Image 2) */}
                <span className="inline-block w-2.5 h-6 bg-[#ff5e00] ml-1.5 align-middle animate-pulse rounded-[1px] shrink-0" />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {isExecuting ? (
                  <button
                    onClick={handleResetToInput}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 transition-all cursor-none"
                    title="Reset to Prompt Input"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleStartExecution()}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#ff5e00] hover:bg-[#ff7700] active:scale-95 text-white flex items-center justify-center transition-all duration-200 shadow-lg shadow-[#ff5e00]/40 hover:shadow-[#ff5e00]/60 cursor-none"
                    title="Execute Prompt"
                  >
                    <ArrowUp className="w-6 h-6 stroke-[2.5]" />
                  </button>
                )}
              </div>
            </div>

            {/* DYNAMIC TRANSITIONAL LIVE EXECUTION STREAM PANEL */}
            {isExecuting && (
              <div className="border-t border-zinc-800/80 bg-[#08090f] p-5 sm:p-7 space-y-6 animate-in slide-in-from-top-4 fade-in duration-500">
                
                {/* Step Milestones Progress Bar */}
                <div className="grid sm:grid-cols-4 gap-2.5">
                  {activePreset.executionSteps.map((step, idx) => {
                    const isDone = completedSteps.includes(idx);
                    const isCurrent = !isDone && (idx === 0 || completedSteps.includes(idx - 1));
                    return (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border transition-all duration-300 ${
                          isDone
                            ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300"
                            : isCurrent
                            ? "bg-orange-950/30 border-[#ff7a18]/60 text-orange-200 animate-pulse"
                            : "bg-zinc-950/40 border-zinc-800/60 text-zinc-500"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] font-mono shrink-0">
                              {idx + 1}
                            </span>
                          )}
                          <span className="text-[11px] font-mono font-bold truncate">
                            {step.title}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-400 line-clamp-1">{step.detail}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Streamed Code Box Header & Tabs */}
                <div className="rounded-2xl bg-[#0d0f17] border border-zinc-800/90 overflow-hidden shadow-xl">
                  <div className="flex items-center justify-between px-4 py-3 bg-[#111420] border-b border-zinc-800/80">
                    
                    {/* File Tab */}
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-[#ff7a18]" />
                      <span className="text-xs font-mono font-bold text-zinc-200">
                        {activePreset.generatedFileName}
                      </span>
                      {!isStreamComplete && (
                        <span className="text-[10px] font-mono bg-[#ff5e00]/20 text-[#ff7a18] border border-[#ff5e00]/40 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e00]" />
                          Streaming {Math.round((streamedCodeLength / activePreset.streamCode.length) * 100)}%
                        </span>
                      )}
                      {isStreamComplete && (
                        <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Generated in {activePreset.coverageStats.time}
                        </span>
                      )}
                    </div>

                    {/* View Switcher & Copy Action */}
                    <div className="flex items-center gap-2">
                      <div className="hidden sm:flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800 text-[11px] font-mono">
                        <button
                          onClick={() => setActiveTab("code")}
                          className={`px-2 py-0.5 rounded transition-colors cursor-none ${
                            activeTab === "code" ? "bg-[#ff7a18] text-white font-bold" : "text-zinc-400 hover:text-white"
                          }`}
                        >
                          Code
                        </button>
                        <button
                          onClick={() => setActiveTab("trace")}
                          className={`px-2 py-0.5 rounded transition-colors cursor-none ${
                            activeTab === "trace" ? "bg-[#ff7a18] text-white font-bold" : "text-zinc-400 hover:text-white"
                          }`}
                        >
                          Trace
                        </button>
                        <button
                          onClick={() => setActiveTab("coverage")}
                          className={`px-2 py-0.5 rounded transition-colors cursor-none ${
                            activeTab === "coverage" ? "bg-[#ff7a18] text-white font-bold" : "text-zinc-400 hover:text-white"
                          }`}
                        >
                          Coverage
                        </button>
                      </div>

                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition cursor-none"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? "Copied!" : "Copy"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Tab Body */}
                  <div className="p-4 sm:p-5">
                    {activeTab === "code" && (
                      <pre className="font-mono text-xs sm:text-[13px] text-zinc-300 overflow-x-auto leading-relaxed max-h-[380px] selection:bg-[#ff7a18]/40">
                        <code>{activePreset.streamCode.substring(0, streamedCodeLength)}</code>
                        {!isStreamComplete && (
                          <span className="inline-block w-2 h-4 bg-[#ff5e00] ml-1 animate-ping" />
                        )}
                      </pre>
                    )}

                    {activeTab === "trace" && (
                      <div className="space-y-3 font-mono text-xs text-zinc-300 animate-in fade-in">
                        <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1.5">
                          <p className="text-zinc-500 text-[10px] uppercase tracking-wider">Prompt Hash &amp; AST Analysis</p>
                          <p className="text-[#ff7a18]">SHA-256: e8b9f4a1804c278912dd90a884...</p>
                          <p className="text-zinc-400">Context Tokens: 1,420 | Output Tokens: 890 | Latency TTFT: 14.8ms</p>
                        </div>
                        <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1.5">
                          <p className="text-zinc-500 text-[10px] uppercase tracking-wider">Reasoning Path</p>
                          <p className="text-zinc-300">1. Parsed data contracts from active project directory.</p>
                          <p className="text-zinc-300">2. Constructed unit test suites with deterministic mocks.</p>
                          <p className="text-emerald-400">3. Verified zero regressions against compliance gates.</p>
                        </div>
                      </div>
                    )}

                    {activeTab === "coverage" && (
                      <div className="grid sm:grid-cols-4 gap-3 font-mono text-xs animate-in fade-in">
                        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                          <span className="text-[10px] text-zinc-500 block">Test Suites</span>
                          <span className="text-sm font-bold text-emerald-400 block mt-1">{activePreset.coverageStats.suites}</span>
                        </div>
                        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                          <span className="text-[10px] text-zinc-500 block">Assertions</span>
                          <span className="text-sm font-bold text-emerald-400 block mt-1">{activePreset.coverageStats.tests}</span>
                        </div>
                        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                          <span className="text-[10px] text-zinc-500 block">Execution Time</span>
                          <span className="text-sm font-bold text-amber-400 block mt-1">{activePreset.coverageStats.time}</span>
                        </div>
                        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                          <span className="text-[10px] text-zinc-500 block">Code Coverage</span>
                          <span className="text-sm font-bold text-[#ff7a18] block mt-1">{activePreset.coverageStats.coverage}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
