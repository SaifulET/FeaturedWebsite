"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Monitor, 
  Layers, 
  Server, 
  Wrench 
} from "lucide-react";

export interface SkillItem {
  id: string;
  name: string;
  category: "frontend" | "backend" | "tools";
  borderColor: string;
  glowColor: string;
  textColor: string;
  iconPath: string;
}

const ALL_SKILLS: SkillItem[] = [
  // FRONTEND (7 SKILLS)
  {
    id: "html",
    name: "HTML",
    category: "frontend",
    borderColor: "#e44d26",
    glowColor: "rgba(228, 77, 38, 0.45)",
    textColor: "#e44d26",
    iconPath: "/icons/text.png"
  },
  {
    id: "css",
    name: "CSS",
    category: "frontend",
    borderColor: "#1572b6",
    glowColor: "rgba(21, 114, 182, 0.45)",
    textColor: "#38bdf8",
    iconPath: "/icons/css-file.png"
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "frontend",
    borderColor: "#f7df1e",
    glowColor: "rgba(247, 223, 30, 0.45)",
    textColor: "#facc15",
    iconPath: "/icons/JavaScript.svg"
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    borderColor: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.45)",
    textColor: "#22d3ee",
    iconPath: "/icons/Tailwind CSS.svg"
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    borderColor: "#ffffff",
    glowColor: "rgba(255, 255, 255, 0.4)",
    textColor: "#ffffff",
    iconPath: "/icons/nextjs.svg"
  },
  {
    id: "redux",
    name: "Redux",
    category: "frontend",
    borderColor: "#764abc",
    glowColor: "rgba(118, 74, 188, 0.45)",
    textColor: "#c084fc",
    iconPath: "/icons/Redux.svg"
  },
  {
    id: "zustand",
    name: "Zustand",
    category: "frontend",
    borderColor: "#d97706",
    glowColor: "rgba(217, 119, 6, 0.45)",
    textColor: "#fbbf24",
    iconPath: "/icons/zustend.png"
  },

  // BACKEND (7 SKILLS)
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    borderColor: "#22c55e",
    glowColor: "rgba(34, 197, 94, 0.45)",
    textColor: "#4ade80",
    iconPath: "/icons/nodejs.png"
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    borderColor: "#cbd5e1",
    glowColor: "rgba(203, 213, 225, 0.4)",
    textColor: "#e2e8f0",
    iconPath: "/icons/expressjs.png"
  },
  {
    id: "cpp",
    name: "C++",
    category: "backend",
    borderColor: "#00599c",
    glowColor: "rgba(0, 89, 156, 0.45)",
    textColor: "#60a5fa",
    iconPath: "/icons/C++ (CPlusPlus).svg"
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "backend",
    borderColor: "#13aa52",
    glowColor: "rgba(19, 170, 82, 0.45)",
    textColor: "#34d399",
    iconPath: "/icons/MongoDB.svg"
  },
  {
    id: "redis",
    name: "Redis",
    category: "backend",
    borderColor: "#dc2626",
    glowColor: "rgba(220, 38, 38, 0.45)",
    textColor: "#ef4444",
    iconPath: "/icons/Redis.svg"
  },
  {
    id: "rabbitmq",
    name: "RabbitMQ",
    category: "backend",
    borderColor: "#ff6600",
    glowColor: "rgba(255, 102, 0, 0.45)",
    textColor: "#fb923c",
    iconPath: "/icons/RabbitMQ.svg"
  },
  {
    id: "database",
    name: "Database",
    category: "backend",
    borderColor: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.45)",
    textColor: "#60a5fa",
    iconPath: "/icons/database.png"
  },

  // TOOLS & DEVOPS (4 SKILLS)
  {
    id: "git",
    name: "Git",
    category: "tools",
    borderColor: "#f05032",
    glowColor: "rgba(240, 80, 50, 0.45)",
    textColor: "#f87171",
    iconPath: "/icons/Git.svg"
  },
  {
    id: "docker",
    name: "Docker",
    category: "tools",
    borderColor: "#0db7ed",
    glowColor: "rgba(13, 183, 237, 0.45)",
    textColor: "#38bdf8",
    iconPath: "/icons/social.png"
  },
  {
    id: "aws",
    name: "AWS",
    category: "tools",
    borderColor: "#ff9900",
    glowColor: "rgba(255, 153, 0, 0.45)",
    textColor: "#fbbf24",
    iconPath: "/icons/AWS.svg"
  },
  {
    id: "postman",
    name: "Postman",
    category: "tools",
    borderColor: "#ff6c37",
    glowColor: "rgba(255, 108, 55, 0.45)",
    textColor: "#fb923c",
    iconPath: "/icons/Postman.svg"
  }
];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "tools">("all");

  const filteredSkills = activeTab === "all"
    ? ALL_SKILLS
    : ALL_SKILLS.filter((s) => s.category === activeTab);

  const tabs = [
    { id: "all", label: "All Skills", count: ALL_SKILLS.length, icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "frontend", label: "Frontend", count: ALL_SKILLS.filter(s => s.category === "frontend").length, icon: <Monitor className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: "backend", label: "Backend", count: ALL_SKILLS.filter(s => s.category === "backend").length, icon: <Server className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: "tools", label: "Tools", count: ALL_SKILLS.filter(s => s.category === "tools").length, icon: <Wrench className="w-3.5 h-3.5 text-amber-400" /> },
  ];

  return (
    <section id="skills" className="relative py-20 bg-[#05060b] text-white border-b border-zinc-800/80 overflow-hidden select-none cursor-none">
      
      {/* VINTAGE CODE MATRIX BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] font-mono text-[11px] leading-relaxed select-none overflow-hidden text-emerald-400">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-6">
          <pre>{`void ClearPal() {
  int entry;
  for (entry = 0; entry < 256; entry++) {
    SetPalEntry(entry, 0, 0, 0);
  }
  wait_for_retrace();
}
/* coding first block */
while ((inp(INPUT_STATUS) & VRETRACE))
void FadeIn(int pause);`}</pre>
          <pre>{`void SetColor() {
  red = palorig[entry][0] * intensity / 63;
  green = palorig[entry][1] * intensity / 63;
  blue = palorig[entry][2] * intensity / 63;
  SetPalEntry(entry, red, green, blue);
}
// check position of user
targetting();`}</pre>
          <pre>{`void FadeOut(int pause) {
  int intensity;
  for (intensity = 63; intensity >= 0; intensity--) {
    wait_for_retrace();
  }
}
cout << "OK\\n";
switch(charmingtaker) {
  case 24: break;
}`}</pre>
          <pre>{`int main() {
  circle(x, y, radius);
  fillcircle(x, y, radius);
  setup();
  token += 4;
  cout << "Operation finish";
}`}</pre>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP HEADER: AI ICON (LEFT), SKILLS (CENTER), DATA MANAGEMENT (RIGHT) */}
        <div className="flex flex-col items-center text-center space-y-4 mb-10">
          
          {/* Header Row with AI Icon, [ Skills ], Data Management */}
          <div className="flex items-center justify-center gap-6 sm:gap-10">
            
            {/* Left: AI Icon from public/icons/ai.png */}
            <div className="relative flex items-center justify-center w-16 h-16 shrink-0 transition-transform duration-300 hover:scale-110">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <Image
                  src="/icons/ai.png"
                  alt="Artificial Intelligence"
                  width={54}
                  height={54}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Center: [ Skills ] Glowing Blue Box (Crisp, No Blur) */}
            <div className="inline-flex items-center px-6 py-1.5 rounded-xl bg-[#09101f] border-2 border-[#38bdf8] text-[#38bdf8] font-extrabold text-xl sm:text-2xl tracking-wider">
              <span>Skills</span>
            </div>

            {/* Right: Data Management Icon from public/icons/data-management.png */}
            <div className="relative flex items-center justify-center w-16 h-16 shrink-0 transition-transform duration-300 hover:scale-110">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <Image
                  src="/icons/data-management.png"
                  alt="Data Management"
                  width={54}
                  height={54}
                  className="object-contain"
                />
              </div>
            </div>

          </div>

          {/* INTERACTIVE CATEGORY FILTER TABS: Aligned Segmented Capsule */}
          <div className="inline-flex items-center justify-center p-1.5 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 gap-1.5 max-w-full overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-medium transition-all duration-200 border cursor-none shrink-0 ${
                    isActive
                      ? "bg-purple-950/70 text-purple-200 border-purple-500/80 font-bold"
                      : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-900/60"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono transition-colors ${
                    isActive
                      ? "bg-purple-900/80 text-purple-200 border border-purple-400/40"
                      : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* UNIFIED GRID VIEW (18 SKILLS: 3 ROWS OF 6) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4 max-w-5xl mx-auto animate-in fade-in duration-300">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="group relative rounded-2xl p-[1.5px] overflow-hidden transition-all duration-300 hover:scale-105 cursor-none min-h-[105px]"
            >
              {/* Animated Flowing Border Beam - ONLY ON HOVER */}
              <div
                className="absolute -inset-[150%] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 will-change-transform"
                style={{
                  background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, ${skill.borderColor} 315deg, #ffffff 352deg, ${skill.borderColor} 360deg)`,
                  animation: "borderBeam 3s linear infinite",
                }}
              />

              {/* Normal State Border: Subtle Clean Zinc-800 */}
              <div className="absolute inset-0 rounded-2xl border border-zinc-800/80 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />

              {/* Hover State Static Colored Border Track */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  border: `1.5px solid ${skill.borderColor}`,
                }}
              />

              {/* Inner Card Body */}
              <div className="relative z-10 w-full h-full rounded-[calc(1rem-1.5px)] bg-[#090b12] p-3.5 sm:p-4 flex flex-col items-center justify-center gap-2">
                {/* Icon loaded strictly from public folder */}
                <div className="w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 relative">
                  <Image
                    src={skill.iconPath}
                    alt={skill.name}
                    width={38}
                    height={38}
                    className="object-contain"
                  />
                </div>

                {/* Skill Name - Highlights with Brand Color on Hover */}
                <span className="text-xs font-semibold tracking-wide font-sans text-center truncate w-full text-zinc-400 group-hover:text-white transition-colors duration-300">
                  <span className="group-hover:hidden">{skill.name}</span>
                  <span
                    className="hidden group-hover:inline font-bold"
                    style={{ color: skill.textColor }}
                  >
                    {skill.name}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
