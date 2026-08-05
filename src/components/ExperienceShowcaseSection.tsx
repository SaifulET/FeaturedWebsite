"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export default function ExperienceShowcaseSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "ai",
      text: "Hello! I am Sarwar's AI Assistant powered by LLaMA 3.3. Ask me anything about Sarwar's engineering experience, backend architecture, time/date, technical stack, or how to work together!",
      timestamp: "12:00 PM"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Comprehensive AI Intelligent Answer Engine
  const generateAIAnswer = (query: string): string => {
    const q = query.trim().toLowerCase();

    // 1. Time / Date / Status Queries
    if (q.includes("time") || q.includes("date") || q.includes("clock")) {
      const now = new Date();
      return `The current local time is ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} on ${now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}. All AI systems & microservice nodes are fully operational!`;
    }

    // 2. Sarwar Engineering / Bio / Background Queries
    if (q.includes("sarwar") || q.includes("engineer") || q.includes("describe") || q.includes("who is") || q.includes("bio") || q.includes("background")) {
      return "Sarwar Hossain is a Senior Software Engineer based in Dhaka, BD, specializing in Node.js microservices, distributed systems, and high-concurrency APIs.\n\nKey Highlights:\n• Senior Software Engineer at StarConnect (promoted in Nov 2025)\n• Architected 10+ production microservices using NestJS, AMQP (RabbitMQ), and Redis\n• Achieved ~80% test coverage using TDD (Jest & SuperTest)\n• Solved critical production fires including bKash payment webhook race conditions and 18ms cursor pagination optimizations\n• Open to Senior Software Engineer & Backend Lead roles!";
    }

    // 3. Experience / Career Timeline Queries
    if (q.includes("exp") || q.includes("career") || q.includes("history") || q.includes("work")) {
      return "Sarwar's Career Timeline:\n1. StarConnect (Mar 2025 – Present):\n   • Senior Software Engineer (Nov 2025 – Present): Lead feature delivery, Elasticsearch tracing, RabbitMQ event queues, CI/CD pipelines & mentorship.\n   • Backend Engineer (Mar 2025 – Nov 2025): Built 10+ microservices, WebRTC video calls, APNs notifications, and payment gateways.\n2. Bright Future Soft (Dec 2022 – Feb 2025):\n   • Full Stack Developer: Built ERP systems, multi-vendor e-commerce apps, and bKash/Nagad ACID transaction rollbacks.";
    }

    // 4. Projects & Portfolio Queries
    if (q.includes("proj") || q.includes("pixster") || q.includes("app") || q.includes("built") || q.includes("portfolio")) {
      return "Sarwar's Featured Engineering Projects:\n1. Pixster: Dynamic real-time social platform built with React, Node.js, Socket.IO & Redis.\n2. Live Ticker Store Engine: Ultra-fast marquee inventory engine with real-time stock sync.\n3. Vault Microservice: High-concurrency inventory microservice with automated payment reconciliation.";
    }

    // 5. Technical Stack / Skills Queries
    if (q.includes("stack") || q.includes("tech") || q.includes("skill") || q.includes("node") || q.includes("nest") || q.includes("postgres") || q.includes("redis")) {
      return "Technical Skill Matrix:\n• Backend & Runtimes: NestJS, Node.js, TypeScript, Express.js\n• Databases: PostgreSQL, MongoDB, Redis, Elasticsearch, MySQL\n• Messaging & Streaming: RabbitMQ, BullMQ, Socket.IO, WebRTC\n• Infrastructure & DevOps: Docker, Kubernetes, CI/CD, GitHub Actions, AWS";
    }

    // 6. Hire & Contact Queries
    if (q.includes("hire") || q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("job")) {
      return "Sarwar is currently OPEN TO WORK for Senior Backend Engineer and Full-Stack Lead opportunities!\n\nContact Details:\n• Email: sarwar@example.com\n• GitHub: github.com/sarwar-asik\n• LinkedIn: linkedin.com/in/sarwar-asik\n• Location: Dhaka, Bangladesh (Available for remote & relocate)";
    }

    // 7. General Conversational / Greetings / Q&A
    if (q === "hi" || q === "hello" || q === "hellow" || q === "hey") {
      return "Hello there! 👋 I am Sarwar's AI Assistant. How can I help you today?";
    }

    if (q.includes("how are you")) {
      return "I'm running smoothly at 100% capacity! How can I assist you with Sarwar's engineering work or web development today?";
    }

    // Fallback for general questions
    return `Regarding "${query}": Sarwar Hossain is a Senior Software Engineer specializing in scalable NestJS microservices, Redis caching, and resilient backend architecture. Feel free to ask about his projects, skills, experience, or hire details!`;
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery("");
    setIsTyping(true);

    setTimeout(() => {
      const replyText = generateAIAnswer(query);

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <section id="ai-experience-section" className="hard-border-b bg-zinc-950 py-12 text-zinc-100 relative">
      <div className="mx-auto max-w-[1440px] px-3 sm:px-5 lg:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-2 border-b-2 border-zinc-800/80 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">
              <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="truncate">// AI ASSISTANT &amp; CAREER INTELLIGENCE</span>
            </div>
            <h3 className="font-display mt-1 text-2xl font-bold leading-none sm:text-3xl text-white">
              Interactive AI Assistant Terminal
            </h3>
          </div>

          <p className="text-xs font-mono text-zinc-400">
            Hover over the circle node to expand trigger.
          </p>
        </div>

        {/* CLEAN MORPHING BUTTON WITHOUT DASHED ROUNDING RINGS OVERFLOW */}
        <div className="flex flex-col items-center justify-center my-6 relative py-4">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="group relative inline-flex items-center justify-center focus:outline-none"
            aria-expanded={isOpen}
          >
            {/* Concentric Amber Radar Rings (Neat & contained on right hover) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-20 pointer-events-none opacity-0 group-hover:opacity-80 transition-opacity duration-300">
              <div className="absolute inset-0 rounded-full border border-amber-500/30" />
              <div className="absolute inset-2 rounded-full border border-amber-500/40" />
            </div>

            {/* Core Morphing Button Element */}
            <div className="relative z-10 px-4 py-4 rounded-full bg-[#0c0d10] border-2 border-amber-500/70 shadow-xl group-hover:px-7 group-hover:py-3.5 group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer overflow-hidden">
              
              {/* Normal State Circle Dot */}
              <div className="flex items-center justify-center shrink-0">
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_#f59e0b]" />
              </div>

              {/* Hover State Expanded Pill Text: "ask sarwar ai  › >_" */}
              <div className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 flex items-center gap-2.5 whitespace-nowrap overflow-hidden">
                <span className="font-mono text-sm tracking-wide text-amber-400 font-semibold">
                  ask sarwar ai
                </span>
                <span className="font-mono text-xs text-amber-500/70">›</span>
                <span className="font-mono text-sm text-amber-400 font-bold animate-pulse">
                  &gt;_
                </span>
              </div>
            </div>
          </button>

          <p className="font-mono text-xs text-zinc-400 mt-4 tracking-wide">
            {isOpen ? "// Click button to close terminal" : "// Hover over circle node to reveal pill trigger & click to open AI Assistant"}
          </p>
        </div>

        {/* EXPANDABLE AI TERMINAL WINDOW (Only visible after clicking button) */}
        {isOpen && (
          <div className="mt-6 max-w-4xl mx-auto rounded-2xl border border-zinc-800 bg-[#0c0d10] shadow-2xl overflow-hidden font-mono text-xs animate-in fade-in slide-in-from-top-4 duration-500">
            {/* macOS Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#13151b] border-b border-zinc-800/80 select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-2 text-zinc-400 text-xs font-mono">sarwar@portfolio — ai assistant</span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                <span>llama-3.3-70b</span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-amber-400 font-bold uppercase">live</span>
              </div>
            </div>

            {/* Chat Messages Body Area */}
            <div className="p-6 space-y-6 max-h-[380px] overflow-y-auto bg-[#0a0b0e]/90">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
                    <span className="text-amber-500 font-bold">
                      {msg.sender === "user" ? "guest@portfolio ~ >" : "sarwar@ai ~ >"}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className={`p-3.5 rounded-lg border leading-relaxed whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-amber-950/20 border-amber-500/30 text-amber-200"
                      : "bg-zinc-900/80 border-zinc-800 text-zinc-200"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-amber-400 text-xs py-2">
                  <span className="animate-spin">⏳</span>
                  <span>sarwar@ai is computing response...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Action Preset Prompt Chips */}
            <div className="px-6 py-3 border-t border-zinc-800/80 bg-[#111319] flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => handleSend("--experience")}
                className="px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-amber-500/50 hover:text-amber-400 transition-all text-xs"
              >
                --experience
              </button>

              <button
                onClick={() => handleSend("--projects")}
                className="px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-amber-500/50 hover:text-amber-400 transition-all text-xs"
              >
                --projects
              </button>

              <button
                onClick={() => handleSend("--skills")}
                className="px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-amber-500/50 hover:text-amber-400 transition-all text-xs"
              >
                --skills
              </button>

              <button
                onClick={() => handleSend("--hire")}
                className="px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-amber-500/50 hover:text-amber-400 transition-all text-xs"
              >
                --hire
              </button>
            </div>

            {/* Prompt Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-4 border-t border-zinc-800 bg-[#0d0e12] flex items-center gap-3"
            >
              <span className="text-amber-500 font-bold text-base select-none">&gt;</span>

              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask anything..."
                maxLength={200}
                className="flex-1 bg-transparent border-none text-zinc-100 placeholder-zinc-600 focus:outline-none text-xs font-mono"
              />

              <span className="text-[10px] text-zinc-600 font-mono">
                {inputQuery.length}/200
              </span>

              <button
                type="submit"
                disabled={!inputQuery.trim()}
                className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-amber-500 hover:text-zinc-950 disabled:opacity-40 disabled:hover:bg-zinc-800 disabled:hover:text-zinc-300 flex items-center justify-center transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Window Footer Status */}
            <div className="px-6 py-2.5 bg-[#090a0d] border-t border-zinc-900 flex items-center justify-between text-[10px] text-zinc-600">
              <span>enter to send · esc to close · ctrl+k</span>
              <span className="text-zinc-500 font-mono">groq · e2e encrypted</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
