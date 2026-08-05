"use client";

import React, { useState } from "react";
import { BookOpen, Clock, X, Sparkles, Share2, Pause, Play } from "lucide-react";

export interface Article {
  id: string;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[];
  imageUrl: string;
  featured?: boolean;
}

const ARTICLES: Article[] = [
  {
    id: "sweet-aromatic-taste",
    title: "What Does Backwoods Sweet Aromatic Taste Like?",
    slug: "/blogs/what-does-backwoods-sweet-aromatic-taste-like",
    date: "Jul 30, 2026",
    readTime: "4 min read",
    category: "Tasting Notes",
    excerpt: "Discover the distinct flavor profile, subtle vanilla honey undertones, and smooth natural leaf burn of Backwoods Sweet Aromatic.",
    content: [
      "Backwoods Sweet Aromatic is celebrated among natural leaf enthusiasts for its harmonious blend of dark pipe-tobacco sweetness and smooth bourbon-vanilla aroma.",
      "Upon unrolling, the aroma greets you with hints of warm dark honey, toasted caramel, and rich natural Connecticut broadleaf tobacco.",
      "The smoke itself is noticeably mellow with a mild throat hit. It burns slowly, allowing the rich casing notes to compliment rather than overpower the underlying earthy tobacco.",
      "Pairing Recommendation: Exceptional alongside a rich cold brew coffee or a smooth barrel-aged dark rum."
    ],
    imageUrl: "https://images.unsplash.com/photo-1511184987749-a399f13a8d76?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "brand-history",
    title: "The History of Backwoods: When Did They Launch?",
    slug: "/blogs/backwoods-brand-history",
    date: "Jul 30, 2026",
    readTime: "6 min read",
    category: "Brand History",
    excerpt: "Trace the origin story of Backwoods cigars from their 1973 national release to becoming a cultural icon.",
    content: [
      "First introduced by the ITM company in 1973 and launched nationally in 1981, Backwoods cigars were engineered to cater to outdoor enthusiasts who appreciated rough-around-the-edges rustic quality.",
      "Unlike machine-pressed cigars with uniform binder sheets, Backwoods feature an unfinished head, frayed foot, and 100% natural leaf wrapper.",
      "Through the decades, the brand transcended its original rustic hunting target audience to become deeply embedded in music, hip-hop culture, and modern boutique smoke culture.",
      "Today, rare limited editions like Honey Bourbon, Dark Stout, and Banana command high demand across collectors worldwide."
    ],
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "wraps-guide",
    title: "Backwoods Leaf Wraps Explained: What They Are & How to Roll Them",
    slug: "/blogs/backwoods-wraps-guide",
    date: "Jul 29, 2026",
    readTime: "5 min read",
    category: "Roll Guide",
    excerpt: "Master the art of unraveling, prepping, moisturizing, and rolling raw natural tobacco leaves step by step.",
    content: [
      "Rolling a natural leaf cigar requires a different technique than standard paper wraps. Because Backwoods use aged broadleaf tobacco, moisture management is critical.",
      "Step 1: Locate the stem edge at the foot and gently unravel counter-clockwise following the natural leaf vein direction.",
      "Step 2: Discard internal filler if re-rolling. Lightly hydrate the leaf with a moist paper towel to make it pliable and resilient against tearing.",
      "Step 3: Pack evenly and re-wrap tightly around the seam, letting the natural leaf moisture seal the edge cleanly."
    ],
    imageUrl: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ryo-tobacco",
    title: "Roll Your Own Tobacco: How to Choose the Right One",
    slug: "/blogs/roll-your-own-tobacco-brands",
    date: "Jul 29, 2026",
    readTime: "7 min read",
    category: "RYO Guide",
    excerpt: "A comprehensive guide to Virginia, Burley, and Oriental tobacco cuts, moisture levels, and blend character.",
    content: [
      "Rolling your own (RYO) tobacco offers unparalleled customization in burn speed, nicotine strength, and aromatic note profile.",
      "Brightleaf Virginia provides sweet, crisp herbal notes with medium acidity. Burley adds robust body, nutty cocoa accents, and absorbs casing flavors naturally.",
      "Shag cut burns fast and easy, while ribbon cut allows cooler, slower combustion suitable for pipe-blend hybrids."
    ],
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "black-mild-guide",
    title: "How to Smoke a Black & Mild the Right Way",
    slug: "/blogs/how-to-smoke-black-mild",
    date: "Jul 28, 2026",
    readTime: "4 min read",
    category: "Tips & Tricks",
    excerpt: "Optimize draw, temperature, and tip selection for plastic vs. wood tip Black & Mild cigarillos.",
    content: [
      "Black & Mild cigarillos are built with pipe tobacco filler wrapped in a homogenized leaf binder. Smoking them correctly requires gentle draws to avoid hot combustion.",
      "Wood tips absorb subtle moisture and deliver a warm tactile feel, whereas plastic tips provide unobstructed airflow.",
      "Never inhale pipe tobacco smoke deep into the lungs; taste the aromatic top notes on the palate and exhale gently through the mouth or retrohale."
    ],
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "nicotine-content",
    title: "How Much Nicotine Is in a Black & Mild? Explained",
    slug: "/blogs/black-mild-nicotine-content",
    date: "Jul 28, 2026",
    readTime: "5 min read",
    category: "Education",
    excerpt: "Understanding total alkaloid content, absorption rates, and comparing cigarillos to cigarettes and pouches.",
    content: [
      "A standard Black & Mild cigarillo contains approximately 100mg to 200mg of total tobacco weight, yielding roughly 10mg to 15mg of bound nicotine.",
      "Unlike cigarettes designed for rapid pulmonary absorption, cigarillo nicotine is absorbed primarily through oral mucosal membranes at a slower rate.",
      "Factors such as burn rate, puff frequency, and tip design significantly influence systemic nicotine transfer during a session."
    ],
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800"
  }
];

// Duplicated list for continuous right-to-left marquee auto scrolling
const LOOPING_ARTICLES = [...ARTICLES, ...ARTICLES];

export default function BlogSection() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="hard-border-b bg-[var(--ink)] py-10 relative">
      <div className="mx-auto max-w-[1440px] px-3 sm:px-5 lg:px-6">
        {/* Header Row */}
        <div
          className="mb-6 flex flex-col gap-3 border-b-2 pb-3 sm:flex-row sm:items-end sm:justify-between"
          style={{ borderColor: "var(--line, rgba(255, 255, 255, 0.12))" }}
        >
          <div className="min-w-0">
            <div
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: "var(--crimson)" }}
            >
              <span
                className="pulse-dot inline-block h-2 w-2 rounded-full shrink-0 animate-pulse"
                style={{ background: "var(--crimson)", boxShadow: "0 0 8px var(--crimson)" }}
              />
              <span className="truncate">The Reading Room</span>
            </div>
            <h3 className="font-display mt-1 text-2xl font-bold leading-none sm:text-3xl text-white">
              From The Blog
            </h3>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Auto-scroll toggle control button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono uppercase tracking-wider text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors flex items-center gap-1.5"
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" /> Resume Motion
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 text-amber-400 fill-amber-400" /> Pause Motion
                </>
              )}
            </button>

            <a
              className="text-[11px] font-bold uppercase tracking-widest transition-colors hover:text-[var(--crimson)] text-zinc-300 sm:text-xs flex items-center gap-1"
              href="#blog-archive"
              onClick={(e) => {
                e.preventDefault();
                if (ARTICLES.length > 0) setSelectedArticle(ARTICLES[0]);
              }}
            >
              <span>All articles</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Slow Marquee Auto-scroll Track (Right to Left) */}
        <div className="overflow-hidden group">
          <div
            className="marquee-track-slow"
            style={{
              animationPlayState: isPaused ? "paused" : undefined,
              animationDuration: "55s" // Slow continuous scroll speed
            }}
          >
            {LOOPING_ARTICLES.map((article, index) => (
              <article
                key={`${article.id}-${index}`}
                className="hard-border-2 group/card flex w-[260px] sm:w-[285px] shrink-0 snap-start flex-col bg-[#14161d] border border-zinc-800 rounded-lg overflow-hidden mr-4 transition-all duration-300 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/50"
              >
                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="relative aspect-[4/3] w-full overflow-hidden border-b border-zinc-800 text-left block"
                >
                  <img
                    alt={article.title}
                    loading="lazy"
                    src={article.imageUrl}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />
                  <div
                    className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-xs shadow-md"
                    style={{ background: "var(--ink)", color: "var(--paper)" }}
                  >
                    {article.category}
                  </div>
                </button>

                <div className="flex flex-1 flex-col gap-2.5 p-4">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-600" />
                      {article.readTime}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="font-display line-clamp-2 text-left text-base sm:text-lg leading-tight font-bold text-white transition-colors hover:text-[var(--crimson)]"
                  >
                    {article.title}
                  </button>

                  <p className="line-clamp-2 text-xs text-zinc-400 leading-relaxed font-sans">
                    {article.excerpt}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="mt-auto pt-3 text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-[var(--crimson)] text-left flex items-center gap-1.5 transition-colors"
                  >
                    <span>Read article</span>
                    <span className="text-[var(--crimson)] transition-transform group-hover/card:translate-x-1">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#13151c] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-zinc-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4 mb-5">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[var(--crimson)] mb-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{selectedArticle.category}</span>
                  <span>•</span>
                  <span className="text-zinc-500">{selectedArticle.date}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight font-display">
                  {selectedArticle.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Hero Image */}
            <div className="relative h-56 sm:h-64 rounded-xl overflow-hidden mb-6 border border-zinc-800">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-300">
              {selectedArticle.content.map((paragraph, index) => (
                <p key={index} className="border-l-2 border-zinc-800 pl-4 py-0.5">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Footer actions */}
            <div className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" /> Verified Editorial Content
              </span>
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Article link copied to clipboard!");
                  }
                }}
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" /> Share Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
