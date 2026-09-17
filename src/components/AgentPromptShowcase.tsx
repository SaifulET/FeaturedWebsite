"use client";

import React, { useState } from "react";
import AgentPromptInput from "./AgentPromptInput";
import { 
  Sparkles, 
  Bot, 
  User, 
  Paperclip, 
  Link2, 
  CheckCircle2, 
  Terminal, 
  CornerDownLeft,
  FileText,
  RotateCcw,
  Zap,
  ShieldCheck
} from "lucide-react";

interface SubmittedMessage {
  id: string;
  text: string;
  files: { name: string; size: number }[];
  timestamp: string;
  aiResponse?: string;
}

export default function AgentPromptShowcase() {
  const [submissions, setSubmissions] = useState<SubmittedMessage[]>([
    {
      id: "demo-initial",
      text: "Analyze this quarterly revenue dataset and generate a predictive forecasting model in Python with 95% confidence intervals.",
      files: [{ name: "financials_q3.csv", size: 142000 }],
      timestamp: "Just now",
      aiResponse: "Analyzed 142 KB financial dataset. Generated ARIMA(2,1,2) forecasting script with confidence bounds plotted using Matplotlib & Seaborn."
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const samplePrompts = [
    "Draft a clean Next.js 15 server action with Zod validation..",
    "Review my PostgreSQL query plan for slow sequential scans..",
    "Write an animated Tailwind CSS responsive card component.."
  ];

  const handlePromptSubmit = async (message: string, files: File[]) => {
    setIsLoading(true);

    const fileMeta = files.map((f) => ({ name: f.name, size: f.size }));
    const newEntry: SubmittedMessage = {
      id: `msg-${Date.now()}`,
      text: message,
      files: fileMeta,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setSubmissions((prev) => [newEntry, ...prev]);

    // Simulate AI Agent reasoning and response
    setTimeout(() => {
      setSubmissions((prev) =>
        prev.map((item) =>
          item.id === newEntry.id
            ? {
                ...item,
                aiResponse: `Processed instruction (${message.length} chars, ${files.length} attached files). Generated solution with optimal TypeScript types and verified unit tests.`
              }
            : item
        )
      );
      setIsLoading(false);
    }, 1200);
  };

  const handleClearHistory = () => {
    setSubmissions([]);
  };

  return (
    <section id="agent-input-showcase" className="relative py-20 bg-[#0c0d14] text-white border-b border-zinc-800/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-600/15 via-purple-600/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-mono font-semibold shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
            <span>PRODUCTION COMPONENT SHOWCASE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            AI Agent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Prompt Input Component
            </span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
            Test the live auto-resizing AI agent composer below. Features multi-file attachments, inline link popover, character limits, smooth focus glow, and keyboard shortcuts.
          </p>
        </div>

        {/* Live Interactive Playground Card */}
        <div className="bg-[#12141f] rounded-3xl border border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-6">
          
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-zinc-400 ml-2">components/AgentPromptInput.tsx</span>
            </div>

            <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Live Interactive Demo
            </span>
          </div>

          {/* THE ACTUAL PROMPT INPUT COMPONENT */}
          <div className="pt-2">
            <AgentPromptInput
              placeholder="Ask anything or attach code/documents..."
              maxLength={1000}
              loading={isLoading}
              onSubmit={handlePromptSubmit}
            />
          </div>

          {/* Quick Preset Samples to Click */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
              <Zap className="w-3 h-3 text-indigo-400" /> Click to test:
            </span>
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePromptSubmit(prompt, [])}
                className="text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-indigo-500/50 px-3 py-1.5 rounded-xl transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

        </div>

        {/* Live Submissions Stream / Output Log */}
        {submissions.length > 0 && (
          <div className="bg-[#0f111a] rounded-2xl border border-zinc-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>Live Agent Execution Stream ({submissions.length} messages)</span>
              </div>

              <button
                type="button"
                onClick={handleClearHistory}
                className="text-xs font-mono text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
            </div>

            <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
              {submissions.map((item) => (
                <div key={item.id} className="space-y-3 bg-[#151724] p-4 rounded-xl border border-zinc-800/70 text-sm">
                  {/* User message */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1 space-y-1.5 min-w-0">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span className="font-semibold text-zinc-200">You</span>
                        <span className="font-mono text-[11px]">{item.timestamp}</span>
                      </div>
                      <p className="text-zinc-200 whitespace-pre-wrap leading-relaxed">{item.text}</p>
                      
                      {/* Attached files summary */}
                      {item.files.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {item.files.map((file, fIdx) => (
                            <span
                              key={fIdx}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-xs font-mono text-indigo-300"
                            >
                              <Paperclip className="w-3 h-3 text-indigo-400" />
                              {file.name} ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Response */}
                  {item.aiResponse && (
                    <div className="flex items-start gap-3 pl-4 border-l-2 border-indigo-500/60 pt-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <span className="text-xs font-semibold text-indigo-300">AI Assistant</span>
                        <p className="text-zinc-300 text-xs leading-relaxed">{item.aiResponse}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feature Grid Specs */}
        <div className="grid sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bg-[#12141f] border border-zinc-800/80 p-4 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Auto-Resize Geometry</span>
            </div>
            <p className="text-zinc-400 text-[11px]">
              Scales smoothly from min 100px up to 220px maxHeight based on scrollHeight, then activates clean vertical scrolling.
            </p>
          </div>

          <div className="bg-[#12141f] border border-zinc-800/80 p-4 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Multi-Attachments &amp; Links</span>
            </div>
            <p className="text-zinc-400 text-[11px]">
              Hidden file input with thumbnail badge pills, file size formatting, and an inline link popover modal.
            </p>
          </div>

          <div className="bg-[#12141f] border border-zinc-800/80 p-4 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Keyboard &amp; Focus Glow</span>
            </div>
            <p className="text-zinc-400 text-[11px]">
              Enter to submit, Shift+Enter for newline, 1000 char limiter counter, and purple/indigo focus ring glow.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
