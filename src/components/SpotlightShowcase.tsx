"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";

export interface TechItem {
  name: string;
  deviconClass?: string;
  iconUrl?: string;
}

export interface ProjectCardItem {
  id: string;
  title: string;
  image: string;
  toolsHeader: string;
  techStack: TechItem[];
  description: string;
  liveDemoUrl: string;
  githubUrl: string;
}

const PROJECTS: ProjectCardItem[] = [
  {
    id: "pixster",
    title: "Pixster",
    image: "https://res.cloudinary.com/dj8ma5m2t/image/upload/v1747670342/pixster_pmq0cw.png",
    toolsHeader: "Tools & Technologies",
    techStack: [
      { name: "React", deviconClass: "devicon-react-original colored" },
      { name: "TailwindCSS", deviconClass: "devicon-tailwindcss-plain colored" },
      { name: "Node.js", deviconClass: "devicon-nodejs-plain-wordmark colored" },
      { name: "Express", deviconClass: "devicon-express-original" },
      { name: "MongoDB", deviconClass: "devicon-mongodb-plain colored" },
      { name: "AWS", deviconClass: "devicon-amazonwebservices-plain colored" },
      { name: "Redis", deviconClass: "devicon-redis-plain-wordmark" },
      { name: "Zustand", iconUrl: "https://raw.githubusercontent.com/pmndrs/zustand/main/docs/bear.jpg" },
      { name: "Render", iconUrl: "https://render.com/favicon.ico" },
      { name: "GSAP", iconUrl: "https://gsap.com/favicon.ico" },
      { name: "Socket.IO", iconUrl: "https://socket.io/images/logo.svg" },
      { name: "Aceternity", iconUrl: "https://ui.aceternity.com/favicon.ico" }
    ],
    description: "I developed Pixster, a dynamic social media web application built from scratch to explore real-time interaction and content sharing. Designed with a modern tech stack, Pixster allows users to create profiles, post images, like and comment, follow others, and manage their personal feed. The project focuses on smooth UI/UX, optimized data handling, and real-time updates, giving me deep insights into scalable architecture, authentication systems, and interactive social features.",
    liveDemoUrl: "https://pister-main-fe.vercel.app/",
    githubUrl: "https://github.com/pixster-org"
  },
  {
    id: "aura-ticker",
    title: "Live Ticker Store Engine",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    toolsHeader: "Tools & Technologies",
    techStack: [
      { name: "Next.js", deviconClass: "devicon-nextjs-original colored" },
      { name: "TypeScript", deviconClass: "devicon-typescript-plain colored" },
      { name: "TailwindCSS", deviconClass: "devicon-tailwindcss-plain colored" },
      { name: "Node.js", deviconClass: "devicon-nodejs-plain colored" },
      { name: "Redis", deviconClass: "devicon-redis-plain colored" },
      { name: "Socket.IO", iconUrl: "https://socket.io/images/logo.svg" }
    ],
    description: "An ultra-fast real-time continuous marquee ticker store engine featuring live restock feeds, interactive flash sale banners, drag-scroll featured brand carousels, and instant cart state synchronization for high-volume store platforms.",
    liveDemoUrl: "#catalog",
    githubUrl: "https://github.com/"
  },
  {
    id: "vault-analytics",
    title: "Vault Inventory Microservice",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    toolsHeader: "Tools & Technologies",
    techStack: [
      { name: "Node.js", deviconClass: "devicon-nodejs-plain colored" },
      { name: "PostgreSQL", deviconClass: "devicon-postgresql-plain colored" },
      { name: "Docker", deviconClass: "devicon-docker-plain colored" },
      { name: "AWS", deviconClass: "devicon-amazonwebservices-plain colored" },
      { name: "GraphQL", deviconClass: "devicon-graphql-plain colored" }
    ],
    description: "Enterprise analytics microservice monitoring live customer purchase velocity, automatic restock alert dispatching, and age-verification compliance auditing across multi-region nicotine distribution networks.",
    liveDemoUrl: "#catalog",
    githubUrl: "https://github.com/"
  }
];

// Darkish Micro-Square Pixel Matrix SVG Data URI (1.8px square bubbles, darkish green & graphite color palette)
const DARKISH_MICRO_SQUARE_BASE64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDEwIDEwIj48cmVjdCB4PSIwLjMiIHk9IjAuMyIgd2lkdGg9IjEuOCIgaGVpZ2h0PSIxLjgiIHJ4PSIwLjMiIGZpbGw9IiMxMTQ1MjMiLz48cmVjdCB4PSIyLjgiIHk9IjAuMyIgd2lkdGg9IjEuOCIgaGVpZ2h0PSIxLjgiIHJ4PSIwLjMiIGZpbGw9IiMwZTEyMGYiLz48cmVjdCB4PSI1LjMiIHk9IjAuMyIgd2lkdGg9IjEuOCIgaGVpZ2h0PSIxLjgiIHJ4PSIwLjMiIGZpbGw9IiMxNDFhMTYiLz48cmVjdCB4PSI3LjgiIHk9IjAuMyIgd2lkdGg9IjEuOCIgaGVpZ2h0PSIxLjgiIHJ4PSIwLjMiIGZpbGw9IiMwZDUyMjgiLz48cmVjdCB4PSIwLjMiIHk9IjIuOCIgd2lkdGg9IjEuOCIgaGVpZ2h0PSIxLjgiIHJ4PSIwLjMiIGZpbGw9IiMxYTIxMWMiLz48cmVjdCB4PSIyLjgiIHk9IjIuOCIgd2lkdGg9IjEuOCIgaGVpZ2h0PSIxLjgiIHJ4PSIwLjMiIGZpbGw9IiMxNTYzMzMiLz48cmVjdCB4PSI1LjMiIHk9IjIuOCIgd2lkdGg9IjEuOCIgaGVpZ2h0PSIxLjgiIHJ4PSIwLjMiIGZpbGw9IiMwZDM4MWMiLz48cmVjdCB4PSI3LjgiIHk9IjIuOCIgd2lkdGg9IjEuOCIgaGVpZ2h0PSIxLjgiIHJ4PSIwLjMiIGZpbGw9IiMxZjI3MjEiLz48cmVjdCB4PSIwLjMiIHk9IjUuMyIgd2lkdGg9IjEuOCIgaGVpZ2h0PSIxLjgiIHJ4PSIwLjMiIGZpbGw9IiMwZDM4MWMiLz48cmVjdCB4PSIyLjgiIHk9IjUuMyIgd2lkdGg9IjEuOCIgaGVpZ2h0PSIxLjgiIHJ4PSIwLjMiIGZpbGw9IiMxNDFhMTYiLz48cmVjdCB4PSI1LjMiIHk9IjUuMyIgd2lkdGg9IjEuOCIgaGVpZ2h0PSIxLjgiIHJ4PSIwLjMiIGZpbGw9IiMxMTQ1MjMiLz48cmVjdCB4PSI3LjgiIHk9IjUuMyIgd2lkdGg9IjEuOCIgaGVpZ2h0PSIxLjgiIHJ4PSIwLjMiIGZpbGw9IiMwZTEyMGYiLz48cmVjdCB4PSIwLjMiIHk9IjcuOCIgd2lkdGg9IjEuOCIgaGVpZ2h0PSIxLjgiIHJ4PSIwLjMiIGZpbGw9IiMxNTYzMzMiLz48cmVjdCB4PSIyLjgiIHk9IjcuOCIgd2lkdGg9IjEuOCIgaGVpZ2h0PSIxLjgiIHJ4PSIwLjMiIGZpbGw9IiMxYTIxMWMiLz48cmVjdCB4PSI1LjMiIHk9IjcuOCIgd2lkdGg9IjEuOCIgaGVpZ2h0PSIxLjgiIHJ4PSIwLjMiIGZpbGw9IiMwZDUyMjgiLz48cmVjdCB4PSI3LjgiIHk9IjcuOCIgd2lkdGg9IjEuOCIgaGVpZ2h0PSIxLjgiIHJ4PSIwLjMiIGZpbGw9IiMxZjI3MjEiLz48L3N2Zz4=`;

function SpotlightCard({ item }: { item: ProjectCardItem }) {
  const [mousePos, setMousePos] = useState({ x: 255, y: 286 });
  const [isHovered, setIsHovered] = useState(false);

  // Fast 1-to-1 mouse position tracking (zero delay / instant response)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group/spotlight relative min-h-[450px] w-full max-w-sm flex flex-col justify-between p-4 rounded-2xl bg-[#0f1115] shadow-md transition-all hover:shadow-xl overflow-hidden border border-zinc-800/80"
    >
      {/* Darkish Micro-Pixel Grid BG revealed ONLY inside the compact minimized cursor spotlight area (150px radius) */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-0 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url("${DARKISH_MICRO_SQUARE_BASE64}")`,
          backgroundSize: "10px 10px",
          backgroundRepeat: "repeat",
          WebkitMaskImage: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, black 35%, transparent 100%)`,
          maskImage: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, black 35%, transparent 100%)`
        }}
      />

      {/* Compact Radial Emerald Ambient Glow (130px radius) */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 bg-emerald-600/5 z-0 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          WebkitMaskImage: `radial-gradient(130px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(130px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`
        }}
      />

      {/* Card Content Overlay Layer */}
      <div className="[z-10] relative w-full h-full flex flex-col justify-between">
        <div>
          {/* Card Image */}
          <div className="w-full h-48 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800/80">
            <img
              alt="projectImage"
              loading="lazy"
              src={item.image}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/spotlight:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800";
              }}
            />
          </div>

          {/* Title */}
          <p className="text-xl font-semibold text-white mt-4 font-display">{item.title}</p>

          {/* Tools & Technologies */}
          <h4 className="text-sm font-semibold text-zinc-200 mt-4">{item.toolsHeader}</h4>

          {/* Icons Grid */}
          <div className="flex flex-wrap items-center gap-2.5 mt-2">
            {item.techStack.map((tech, idx) => (
              <React.Fragment key={idx}>
                {tech.deviconClass ? (
                  <i
                    title={tech.name}
                    className={`${tech.deviconClass} text-lg transition-transform hover:scale-125`}
                  />
                ) : tech.iconUrl ? (
                  <img
                    alt={tech.name}
                    title={tech.name}
                    loading="lazy"
                    src={tech.iconUrl}
                    className="w-4 h-4 object-contain transition-transform hover:scale-125"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    {tech.name}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-300 mt-4 line-clamp-3 leading-relaxed font-sans">
            {item.description}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-4 mt-6 pt-2">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={item.liveDemoUrl}
            className="text-green-400 text-sm font-medium hover:underline transition-colors"
          >
            Live Demo
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={item.githubUrl}
            className="text-green-200 text-sm font-medium hover:underline transition-colors"
          >
            GitHub Repo
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SpotlightShowcase() {
  return (
    <section className="hard-border-b bg-[var(--ink)] py-12 relative overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-3 sm:px-5 lg:px-6">
        {/* Header */}
        <div
          className="mb-8 flex flex-col gap-2 border-b-2 pb-3 sm:flex-row sm:items-end sm:justify-between"
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
              <span className="truncate">Innovation Lab</span>
            </div>
            <h3 className="font-display mt-1 text-2xl font-bold leading-none sm:text-3xl text-white">
              Spotlight Projects &amp; Tech Stack
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Minimized Spotlight Area Active</span>
          </div>
        </div>

        {/* Spotlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {PROJECTS.map((item) => (
            <SpotlightCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
