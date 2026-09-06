"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowUp, 
  Sparkles, 
  Layers, 
  Globe2, 
  Zap, 
  ShoppingBag, 
  Flame, 
  BookOpen, 
  ShieldCheck, 
  Code2, 
  Sliders, 
  X,
  Compass,
  CornerDownLeft
} from "lucide-react";

export interface SearchSectionItem {
  id: string;
  targetId: string;
  title: string;
  category: "AI Engines" | "Store & Catalog" | "Showcases" | "System Tools";
  keywords: string[];
  description: string;
  icon: React.ReactNode;
  badge?: string;
}

const SEARCHABLE_SECTIONS: SearchSectionItem[] = [
  {
    id: "skills-section",
    targetId: "skills",
    title: "Web Development Skills & Technologies",
    category: "Showcases",
    keywords: ["skills", "html", "css", "javascript", "typescript", "react", "nextjs", "nodejs", "tailwind", "mongodb", "redux", "web development", "tech stack"],
    description: "20 core tech stack proficiencies across frontend, backend, database, and dev tools.",
    icon: <Code2 className="w-4 h-4 text-[#38bdf8]" />,
    badge: "20 SKILLS"
  },
  {
    id: "betopia-models",
    targetId: "betopia-orbital",
    title: "BetopiaAI · 10+ Frontier AI Models",
    category: "AI Engines",
    keywords: ["betopia", "models", "frontier", "ai", "claude", "gpt", "gemini", "deepseek", "reasoning", "tokens"],
    description: "Multi-ring planetary orbital showcase exploring 14 frontier AI reasoning engines.",
    icon: <Sparkles className="w-4 h-4 text-amber-400" />,
    badge: "IMAGE 1 FEATURE"
  },
  {
    id: "betopia-latency",
    targetId: "betopia-orbital",
    title: "BetopiaAI · Low-Latency APIs & Streaming",
    category: "AI Engines",
    keywords: ["latency", "api", "streaming", "websocket", "ttft", "tokens", "throughput", "speed", "fast"],
    description: "Sub-20ms Time-to-First-Token edge streaming engine telemetry.",
    icon: <Zap className="w-4 h-4 text-orange-400" />,
    badge: "16.4ms TTFT"
  },
  {
    id: "betopia-infra",
    targetId: "betopia-orbital",
    title: "BetopiaAI · Production-Ready Infrastructure",
    category: "AI Engines",
    keywords: ["infra", "infrastructure", "multi-region", "uptime", "sla", "kubernetes", "cloud", "failover"],
    description: "Multi-region failover, 99.999% SLA & global edge distribution.",
    icon: <Globe2 className="w-4 h-4 text-emerald-400" />,
    badge: "99.999% SLA"
  },
  {
    id: "ai-prompt-console",
    targetId: "ai-console",
    title: "AI Prompt Command Console & Live Execution Stream",
    category: "AI Engines",
    keywords: ["prompt", "console", "unit tests", "code", "streaming", "agent", "checkout flow", "vitest", "sql", "jest"],
    description: "Interactive prompt bar with live AST parsing, code synthesis and automated test suites.",
    icon: <Code2 className="w-4 h-4 text-[#ff5e00]" />,
    badge: "IMAGE 2 FEATURE"
  },
  {
    id: "catalog-section",
    targetId: "catalog",
    title: "Main Store Product Catalog",
    category: "Store & Catalog",
    keywords: ["catalog", "products", "store", "zyn", "acid", "cigars", "velo", "pipe tobacco", "buy", "shop", "smoke", "nicotine"],
    description: "Live interactive catalog with real-time stock counts and instant cart syncing.",
    icon: <ShoppingBag className="w-4 h-4 text-red-400" />,
    badge: "LIVE INVENTORY"
  },
  {
    id: "flash-sale-section",
    targetId: "flash-sale",
    title: "Flash Sale Crimson Banner",
    category: "Store & Catalog",
    keywords: ["flash sale", "sale", "discount", "crimson", "deal", "voucher", "promo", "code"],
    description: "Urgent dynamic flash promotion bar with coupon activations.",
    icon: <Flame className="w-4 h-4 text-red-500" />,
    badge: "SPECIAL OFFERS"
  },
  {
    id: "featured-brands-section",
    targetId: "featured-brands",
    title: "Featured Brands Stocked Here",
    category: "Store & Catalog",
    keywords: ["brands", "drew estate", "swedish match", "velo", "artisan", "cohiba", "stocked"],
    description: "Continuous drag-scroll brand logo gallery with instant brand filtering.",
    icon: <Layers className="w-4 h-4 text-yellow-400" />,
    badge: "PREMIUM BRANDS"
  },
  {
    id: "blog-reading-room",
    targetId: "blog",
    title: "The Reading Room · Publications & Guides",
    category: "Showcases",
    keywords: ["blog", "reading room", "articles", "humidor", "guides", "tobacco care", "stories", "learning"],
    description: "Curated engineering articles and cigar care publications.",
    icon: <BookOpen className="w-4 h-4 text-blue-400" />
  },
  {
    id: "spotlight-section",
    targetId: "spotlight",
    title: "Spotlight Interactive Showcase",
    category: "Showcases",
    keywords: ["spotlight", "projects", "pixster", "vault", "analytics", "tech stack", "portfolio"],
    description: "Cursor-following radial spotlight matrix showcasing flagship engineering builds.",
    icon: <Compass className="w-4 h-4 text-cyan-400" />
  },
  {
    id: "experience-section",
    targetId: "experience",
    title: "Experience & Battle-Tested Incidents",
    category: "Showcases",
    keywords: ["experience", "incidents", "battle tested", "outages", "microservices", "work history", "resume"],
    description: "Architectural milestones, incident post-mortems, and production war stories.",
    icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />
  },
  {
    id: "cms-control-panel",
    targetId: "cms-panel",
    title: "CMS Live Event Controller",
    category: "System Tools",
    keywords: ["cms", "controller", "ticker", "alert", "event", "broadcast", "marqueue"],
    description: "Floating CMS manager to inject live restock notifications and marquee breaking alerts.",
    icon: <Sliders className="w-4 h-4 text-purple-400" />
  }
];

const ANIMATED_PROMPT_PHRASES = [
  "Write unit tests for my checkout flow..",
  "Search 10+ frontier AI models in Betopia..",
  "Generate low-latency API & WebSocket stream..",
  "Jump to ZYN, Acid Cigars & Product Catalog..",
  "Explore interactive spotlight projects..",
  "View production-ready infrastructure.."
];

interface SectionSearchCommandProps {
  onSearchCatalogQuery?: (query: string) => void;
  onOpenCart?: () => void;
  variant?: "hero" | "header";
}

export default function SectionSearchCommand({ 
  onSearchCatalogQuery, 
  onOpenCart,
  variant = "hero" 
}: SectionSearchCommandProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [redirectToast, setRedirectToast] = useState<string | null>(null);
  
  // Typewriter Animation States (Active only when query is empty)
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic Typewriter cycling when user has NOT written anything (query === "")
  useEffect(() => {
    // If user has written at least one letter, animation is immediately OFF
    if (query.length > 0) return;

    const currentPhrase = ANIMATED_PROMPT_PHRASES[phraseIdx];
    let timer: NodeJS.Timeout;

    if (!isDeleting && typedChars < currentPhrase.length) {
      timer = setTimeout(() => {
        setTypedChars((prev) => prev + 1);
      }, 70);
    } else if (!isDeleting && typedChars === currentPhrase.length) {
      // Hold completed phrase for 3 seconds
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 3000);
    } else if (isDeleting && typedChars > 0) {
      timer = setTimeout(() => {
        setTypedChars((prev) => prev - 1);
      }, 35);
    } else if (isDeleting && typedChars === 0) {
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % ANIMATED_PROMPT_PHRASES.length);
    }

    return () => clearTimeout(timer);
  }, [typedChars, isDeleting, phraseIdx, query]);

  // Filter sections dynamically based on user input
  const filteredSections = query.trim() === ""
    ? SEARCHABLE_SECTIONS.slice(0, 6)
    : SEARCHABLE_SECTIONS.filter((item) => {
        const q = query.toLowerCase().trim();
        return (
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.keywords.some((k) => k.toLowerCase().includes(q))
        );
      });

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation & global shortcuts (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Perform smooth redirect to target section & disappear everything as requested
  const handleRedirect = (item: SearchSectionItem) => {
    // 1. Toast notification
    setRedirectToast(`Redirecting to ${item.title}...`);
    setTimeout(() => setRedirectToast(null), 3000);

    // 2. Clear and disappear everything (as user requested: "after write everything disappear")
    setQuery("");
    setIsOpen(false);
    inputRef.current?.blur();

    // 3. Special handling for Cart Drawer
    if (item.targetId === "cart") {
      onOpenCart?.();
      return;
    }

    // 4. Also forward search query to product catalog if searching products
    if (item.targetId === "catalog" && onSearchCatalogQuery && query) {
      onSearchCatalogQuery(query);
    }

    // 5. Smooth scroll to target section element
    const element = document.getElementById(item.targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Add subtle glow pulse highlight on target section
      element.classList.add("ring-2", "ring-[#ff5e00]", "transition-all", "duration-1000");
      setTimeout(() => {
        element.classList.remove("ring-2", "ring-[#ff5e00]");
      }, 2500);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredSections.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredSections.length) % filteredSections.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredSections.length > 0) {
        handleRedirect(filteredSections[selectedIndex] || filteredSections[0]);
      } else if (query.trim() !== "") {
        // Fallback: search in catalog and scroll there
        onSearchCatalogQuery?.(query);
        const catalogEl = document.getElementById("catalog");
        if (catalogEl) {
          catalogEl.scrollIntoView({ behavior: "smooth" });
        }
        setQuery("");
        setIsOpen(false);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
    }
  };

  // Current animated typewriter slice
  const animatedPlaceholderText = ANIMATED_PROMPT_PHRASES[phraseIdx].substring(0, typedChars);

  return (
    <div ref={containerRef} className={`relative w-full ${variant === "hero" ? "max-w-3xl mx-auto" : "max-w-md"}`}>
      
      {/* Toast Notification when redirecting */}
      {redirectToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#160d05] border border-[#ff5e00] text-[#ff7a18] px-4 py-2 rounded-full text-xs font-mono font-bold shadow-[0_0_20px_rgba(255,94,0,0.4)] flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Sparkles className="w-3.5 h-3.5 text-[#ff5e00] animate-spin" />
          <span>{redirectToast}</span>
        </div>
      )}

      {/* THE INPUT FIELD MATCHING SCREENSHOT EXACTLY */}
      <div 
        onClick={() => {
          inputRef.current?.focus();
        }}
        className={`relative group rounded-2xl bg-[#0b0d13]/95 border-2 border-[#ff5e00] shadow-[0_0_25px_rgba(255,94,0,0.22)] hover:shadow-[0_0_35px_rgba(255,94,0,0.4)] transition-all duration-300 ${
          variant === "hero" ? "p-3 sm:p-4" : "p-2 sm:p-2.5"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          
          {/* Typing Area with Real Input & Animated Typewriter Overlay */}
          <div className="flex-1 flex items-center min-w-0 relative">
            
            {/* Real Interactive Input Field */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                const val = e.target.value;
                setQuery(val);
                setIsOpen(val.trim().length > 0);
                setSelectedIndex(0);
                if (onSearchCatalogQuery) {
                  onSearchCatalogQuery(val);
                }
              }}
              onFocus={() => {
                if (query.trim().length > 0) {
                  setIsOpen(true);
                }
              }}
              onKeyDown={handleInputKeyDown}
              className="w-full bg-transparent text-zinc-100 text-sm sm:text-base font-sans font-normal focus:outline-none cursor-none z-10 relative pr-2 caret-[#ff5e00]"
            />

            {/* When user has NOT written anything (query === ""), show the animated typewriter text with cursor directly attached */}
            {query.length === 0 && (
              <div className="absolute inset-0 flex items-center pointer-events-none text-zinc-200 text-sm sm:text-base font-sans font-normal z-0 select-none overflow-hidden">
                <span className="shrink-0">{animatedPlaceholderText}</span>
                {/* Blinking Orange Block Cursor from Screenshot (Immediately next to last character) */}
                <span className="inline-block w-2 sm:w-2.5 h-4.5 sm:h-5 bg-[#ff5e00] animate-pulse rounded-[1px] ml-1 shrink-0" />
              </div>
            )}
          </div>

          {/* Quick Clear Button (Visible only when user typed something) */}
          {query.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuery("");
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-none"
              title="Clear Search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Orange Circular Upward Arrow Button (From Screenshot) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (query.trim().length > 0 && filteredSections.length > 0) {
                handleRedirect(filteredSections[selectedIndex] || filteredSections[0]);
              } else if (query.trim().length > 0) {
                onSearchCatalogQuery?.(query);
                document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
                setQuery("");
                setIsOpen(false);
              } else {
                // If clicked while empty, jump to first suggested section
                handleRedirect(SEARCHABLE_SECTIONS[0]);
              }
            }}
            className={`rounded-full bg-[#ff5e00] hover:bg-[#ff7700] active:scale-95 text-white flex items-center justify-center transition-all duration-200 shadow-md shadow-[#ff5e00]/40 hover:shadow-[#ff5e00]/60 shrink-0 cursor-none ${
              variant === "hero" ? "w-10 h-10 sm:w-11 sm:h-11" : "w-8 h-8"
            }`}
            title="Search & Redirect"
          >
            <ArrowUp className={`${variant === "hero" ? "w-5 h-5 sm:w-6 sm:h-6" : "w-4 h-4"} stroke-[2.5]`} />
          </button>
        </div>
      </div>

      {/* DYNAMIC SECTION REDIRECT DROPDOWN (Disappears after selection/redirect) */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 z-50 rounded-2xl bg-[#0c0e15]/95 border border-zinc-800 shadow-2xl backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Header info */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#10131d] border-b border-zinc-800/80 text-[11px] font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#ff5e00]" />
              Matching sections for &quot;{query}&quot;
            </span>
            <span className="hidden sm:flex items-center gap-1 text-[10px] text-zinc-500">
              <kbd className="px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-800">↑↓</kbd> navigate
              <kbd className="px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-800 ml-1">Enter</kbd> jump
              <kbd className="px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-800 ml-1">Esc</kbd> close
            </span>
          </div>

          {/* Result Items List */}
          <div className="max-h-[340px] overflow-y-auto p-2 space-y-1">
            {filteredSections.length > 0 ? (
              filteredSections.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleRedirect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-none ${
                      isSelected
                        ? "bg-[#1f150b] border border-[#ff5e00]/60 text-white shadow-md shadow-orange-950/40"
                        : "hover:bg-zinc-900/60 border border-transparent text-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Icon */}
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "bg-[#ff5e00]/20 border border-[#ff5e00]/50"
                            : "bg-zinc-900 border border-zinc-800"
                        }`}
                      >
                        {item.icon}
                      </div>

                      {/* Text */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-semibold truncate text-zinc-100">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#ff5e00]/15 text-[#ff7a18] border border-[#ff5e00]/30 shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Redirect Indicator */}
                    <div className="flex items-center gap-1.5 text-zinc-500 shrink-0 pl-2">
                      <span className="text-[10px] font-mono hidden sm:inline text-zinc-400">Jump</span>
                      <CornerDownLeft className={`w-3.5 h-3.5 ${isSelected ? "text-[#ff5e00]" : "text-zinc-500"}`} />
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-6 text-center text-zinc-500 text-xs font-mono">
                No matching section found for &quot;{query}&quot;. Press <kbd className="px-1 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-300">Enter</kbd> to search in store catalog.
              </div>
            )}
          </div>

          {/* Footer quick helper */}
          <div className="px-4 py-2 bg-[#090b10] border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono text-zinc-500">
            <span>✨ Press Enter or click any section to jump directly</span>
            <span>⚡ Input clears automatically on redirect</span>
          </div>

        </div>
      )}

    </div>
  );
}
