"use client";

import React, { useState, useEffect, useRef } from "react";

const CODE_TABS = [
  {
    id: "frontend",
    label: "Frontend",
    iconSvg: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em">
        <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
      </svg>
    ),
    code: `interface IFrontend {
  overview: string;
  technologies: string[];
  proficiencyLevel: string;
}

const frontend: IFrontend = {
  overview: 'Modern responsive UI development specialist',
  technologies: [
    'HTML', 'CSS', 'Sass', 'Tailwind',
    'Bootstrap', 'JavaScript', 'TypeScript',
    'Redux', 'React.js', 'Next.js'
  ],
  proficiencyLevel: 'Advanced'
};`
  },
  {
    id: "backend",
    label: "Backend",
    iconSvg: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em">
        <path d="M22 3.75v5.5A1.75 1.75 0 0 1 20.25 11H3.75A1.75 1.75 0 0 1 2 9.25v-5.5C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75Zm0 11v5.5A1.75 1.75 0 0 1 20.25 22H3.75A1.75 1.75 0 0 1 2 20.25v-5.5c0-.966.784-1.75 1.75-1.75h16.5c.966 0 1.75.784 1.75 1.75ZM20.25 3.5H3.75a.25.25 0 0 0-.25.25v5.5c0 .138.112.25.25.25h16.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25Zm0 11H3.75a.25.25 0 0 0-.25.25v5.5c0 .138.112.25.25.25h16.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25Z" />
      </svg>
    ),
    code: `interface IBackend {
  architecture: string;
  technologies: string[];
  proficiencyLevel: string;
}

const backend: IBackend = {
  architecture: 'High-performance microservices specialist',
  technologies: [
    'NestJS', 'Node.js', 'Express.js', 'RabbitMQ',
    'Redis', 'PostgreSQL', 'Socket.IO', 'gRPC'
  ],
  proficiencyLevel: 'Advanced'
};`
  },
  {
    id: "database",
    label: "Database",
    iconSvg: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em">
        <path d="M12 6m-8 0a8 3 0 1 0 16 0a8 3 0 1 0 -16 0" />
        <path d="M4 6v6a8 3 0 0 0 16 0v-6" />
        <path d="M4 12v6a8 3 0 0 0 16 0v-6" />
      </svg>
    ),
    code: `interface IDatabase {
  overview: string;
  technologies: string[];
  proficiencyLevel: string;
}

const database: IDatabase = {
  overview: 'Exploring database design and data handling',
  technologies: [
    'MongoDB', 'PostgreSQL', 'Database Design',
    'Query Optimization', 'Data Modeling'
  ],
  proficiencyLevel: 'Advanced'
};`
  },
  {
    id: "devops",
    label: "DevOps",
    iconSvg: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
    code: `interface IDevOps {
  overview: string;
  technologies: string[];
  proficiencyLevel: string;
}

const devops: IDevOps = {
  overview: 'Automated CI/CD & container orchestration',
  technologies: [
    'Docker', 'Kubernetes', 'GitHub Actions',
    'AWS (S3, EC2)', 'Render', 'Vercel'
  ],
  proficiencyLevel: 'Advanced'
};`
  },
  {
    id: "others",
    label: "Others",
    iconSvg: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em">
        <path d="M9.4 86.6C-3.1 74.1-3.1 53.9 9.4 41.4s32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 9.4 86.6zM256 416H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
      </svg>
    ),
    code: `interface IOthers {
  overview: string;
  technologies: string[];
  proficiencyLevel: string;
}

const others: IOthers = {
  overview: 'Real-time protocols & security integrations',
  technologies: [
    'WebRTC', 'Socket.IO', 'ACID Transactions',
    'Idempotent Webhooks', 'JWT / OAuth2'
  ],
  proficiencyLevel: 'Advanced'
};`
  }
];

const TYPING_PHRASES = [
  "Frontend Developer",
  "Backend Engineer",
  "Full Stack Developer",
  "System Architect"
];

// HIGH PERFORMANCE CANVAS WITH SLIGHTLY SMALLER BIG SIZE BUBBLES
function FloatingShapesCanvas({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let currentX = 400;
    let currentY = 300;

    // 200 total shapes with balanced, slightly smaller big bubble proportions
    const numShapes = 200;
    const shapes: {
      relX: number;
      relY: number;
      curX: number;
      curY: number;
      radius: number;
      sides: number;
      rotation: number;
      opacity: number;
    }[] = [];

    for (let i = 0; i < numShapes; i++) {
      const angle = i * 0.34;
      const dist = 22 + i * 4.8;
      const relX = Math.cos(angle) * dist;
      const relY = Math.sin(angle) * dist;
      
      let radius: number;
      let sides = 0;

      if (i % 5 === 0) {
        // Big size bubble (proportionately adjusted to radius 22px - 38px)
        radius = 22 + (i % 5) * 3.5;
        sides = (i % 3 === 0) ? 5 : 0;
      } else if (i % 3 === 0) {
        // Medium size bubble (radius 10px - 18px)
        radius = 10 + (i % 4) * 2;
        sides = (i % 2 === 0) ? 4 : 0;
      } else {
        // Small size bubble (radius 2.5px - 5px)
        radius = 2.5 + (i % 4) * 1.0;
        sides = 0;
      }

      shapes.push({
        relX,
        relY,
        curX: relX,
        curY: relY,
        radius,
        sides,
        rotation: (i * Math.PI) / 8,
        opacity: Math.max(0.08, 0.52 - i * 0.0022)
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

      const targetX = mouseRef.current?.x ?? width / 2;
      const targetY = mouseRef.current?.y ?? height / 2;

      // Ultra-smooth lerp interpolation
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      const centerX = width / 2;
      const centerY = height / 2;
      const offsetX = currentX - centerX;
      const offsetY = currentY - centerY;

      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];

        // Fluid spring position tracking
        shape.curX += (shape.relX + offsetX - shape.curX) * (0.04 + (i % 5) * 0.012);
        shape.curY += (shape.relY + offsetY - shape.curY) * (0.04 + (i % 5) * 0.012);

        const renderX = centerX + shape.curX;
        const renderY = centerY + shape.curY;

        ctx.strokeStyle = `rgba(110, 50, 180, ${shape.opacity})`;
        ctx.fillStyle = `rgba(35, 12, 65, ${shape.opacity * 0.85})`;
        ctx.lineWidth = shape.radius < 4 ? 1.0 : 1.4;

        ctx.beginPath();
        if (shape.sides === 0) {
          ctx.arc(renderX, renderY, shape.radius, 0, Math.PI * 2);
        } else {
          for (let s = 0; s < shape.sides; s++) {
            const rotAngle = shape.rotation + (s * 2 * Math.PI) / shape.sides;
            const px = renderX + shape.radius * Math.cos(rotAngle);
            const py = renderY + shape.radius * Math.sin(rotAngle);
            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
        }

        ctx.fill();
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full z-0 opacity-95"
    />
  );
}

export default function HeroInteractiveShowcase() {
  const mouseRef = useRef({ x: 400, y: 300 });
  const [activeTab, setActiveTab] = useState("frontend");
  const [typedText, setTypedText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[phraseIdx];
    let timer: NodeJS.Timeout;

    if (!isDeleting && typedText.length < currentPhrase.length) {
      timer = setTimeout(() => {
        setTypedText(currentPhrase.substring(0, typedText.length + 1));
      }, 100);
    } else if (!isDeleting && typedText.length === currentPhrase.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText.length > 0) {
      timer = setTimeout(() => {
        setTypedText(currentPhrase.substring(0, typedText.length - 1));
      }, 50);
    } else if (isDeleting && typedText.length === 0) {
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % TYPING_PHRASES.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIdx]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseRef.current = { x, y };
  };

  const currentTabObj = CODE_TABS.find((t) => t.id === activeTab) || CODE_TABS[0];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] bg-[#070612] text-white overflow-hidden py-16 flex flex-col justify-between border-b border-zinc-800/80 select-none cursor-none"
    >
      {/* High-Performance Canvas */}
      <FloatingShapesCanvas mouseRef={mouseRef} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: HERO INFORMATION & TYPING TEXT */}
          <div className="space-y-4 text-center lg:text-left">
            {/* Greeting Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950/70 border border-[#5AB2FF]/40 text-[#5AB2FF] text-xs font-semibold backdrop-blur-sm shadow-md">
              <span className="text-base animate-bounce">✌</span>
              <span>Hi I&apos;m Sarwar Hossain</span>
            </div>

            {/* Typewriter Heading */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-5xl font-bold tracking-tight text-white min-h-[70px] flex items-center justify-center lg:justify-start whitespace-nowrap">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[#5AB2FF] to-cyan-300">
                {typedText}
              </span>
              <span className="text-[#5AB2FF] animate-pulse ml-1 font-mono font-bold">_</span>
            </h1>

            {/* Description Text */}
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-[600px] mx-auto lg:mx-0 font-sans">
              I am a proactive developer focused on designing dynamic, user-centric applications and delivering scalable, high-performance solutions by integrating frontend interfaces with robust backend architectures, ensuring optimal performance and seamless user experiences.
            </p>

            {/* Resume Button & Social Tooltip Tiles */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
              {/* Resume Button */}
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 text-[#5AB2FF] border border-[#5AB2FF] hover:border-[#5AB2FF] rounded-md px-4 py-2 hover:bg-[#5AB2FF40] text-sm font-semibold transition-all shadow-lg cursor-none"
              >
                <span>Resume</span>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="w-4 h-4">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                </svg>
              </a>

              {/* Social Tiles */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Discord */}
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-[#5AB2FF] hover:bg-[#5AB2FF40] text-[#5AB2FF] rounded-md transition-all hover:scale-105 cursor-none"
                  title="Discord"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="w-5 h-5">
                    <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                  </svg>
                </a>

                {/* Github */}
                <a
                  href="https://github.com/sarwar-asik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-[#5AB2FF] hover:bg-[#5AB2FF40] text-[#5AB2FF] rounded-md transition-all hover:scale-105 cursor-none"
                  title="Github"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="w-5 h-5">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                  </svg>
                </a>

                {/* Hackerrank */}
                <a
                  href="https://www.hackerrank.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-[#5AB2FF] hover:bg-[#5AB2FF40] text-[#5AB2FF] rounded-md transition-all hover:scale-105 cursor-none"
                  title="Hackerrank"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M0 0v24h24V0zm9.95 8.002h1.805c.061 0 .111.05.111.111v7.767c0 .061-.05.111-.11.111H9.95c-.061 0-.111-.05-.111-.11v-2.87H7.894v2.87c0 .06-.05.11-.11.11H5.976a.11.11 0 01-.11-.11V8.112c0-.06.05-.11.11-.11h1.806c.061 0 .11.05.11.11v2.869H9.84v-2.87c0-.06.05-.11.11-.11zm2.999 0h5.778c.061 0 .111.05.111.11v7.767a.11.11 0 01-.11.112h-5.78a.11.11 0 01-.11-.11V8.111c0-.06.05-.11.11-.11z" />
                  </svg>
                </a>

                {/* Stack overflow */}
                <a
                  href="https://stackoverflow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-[#5AB2FF] hover:bg-[#5AB2FF40] text-[#5AB2FF] rounded-md transition-all hover:scale-105 cursor-none"
                  title="Stack overflow"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="w-5 h-5">
                    <path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282z" />
                    <path d="M3.857 13.145h7.137v-1.428H3.857zM10.254 0 9.108.852l4.26 5.727 1.146-.852zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468z" />
                  </svg>
                </a>

                {/* Linkedin */}
                <a
                  href="https://linkedin.com/in/sarwar-asik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-[#5AB2FF] hover:bg-[#5AB2FF40] text-[#5AB2FF] rounded-md transition-all hover:scale-105 cursor-none"
                  title="Linkedin"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="w-5 h-5">
                    <path d="M6 6h2.767v1.418h0.040c0.385-0.691 1.327-1.418 2.732-1.418 2.921 0 3.461 1.818 3.461 4.183v4.817h-2.885v-4.27c0-1.018-0.021-2.329-1.5-2.329-1.502 0-1.732 1.109-1.732 2.255v4.344h-2.883v-9z" />
                    <path d="M1 6h3v9h-3v-9z" />
                    <path d="M4 3.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z" />
                  </svg>
                </a>

                {/* Dev.to */}
                <a
                  href="https://dev.to"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-[#5AB2FF] hover:bg-[#5AB2FF40] text-[#5AB2FF] rounded-md transition-all hover:scale-105 cursor-none"
                  title="Dev.to"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="w-5 h-5">
                    <path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE CODE CARD */}
          <div className="rounded-xl bg-[#0e1017]/90 backdrop-blur-sm border border-[#5AB2FF]/40 font-mono text-xs shadow-2xl overflow-hidden">
            {/* Header Tabs */}
            <div className="flex items-center justify-between bg-[#121624] border-b border-[#5AB2FF]/20 rounded-t-xl overflow-x-auto">
              <div className="flex items-center">
                {CODE_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold transition-colors cursor-none ${
                      activeTab === tab.id
                        ? "bg-[#5AB2FF]/20 text-[#5AB2FF] border-b-2 border-[#5AB2FF]"
                        : "text-white hover:text-[#5AB2FF]"
                    }`}
                  >
                    <span className="text-sm">{tab.iconSvg}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Red Yellow Green Window Dots */}
              <div className="flex gap-1 pr-3">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5 text-red-500">
                  <circle r="12" cy="12" cx="12" />
                </svg>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5 text-yellow-500">
                  <circle r="12" cy="12" cx="12" />
                </svg>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5 text-green-500">
                  <circle r="12" cy="12" cx="12" />
                </svg>
              </div>
            </div>

            {/* Syntax Highlighted Code Viewer */}
            <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto min-h-[300px] text-zinc-200 bg-[#090b12]/95">
              <pre className="text-xs font-mono">
                <code>
                  {currentTabObj.code.split('\n').map((line, i) => (
                    <div key={i} className="table-row">
                      <span className="table-cell pr-4 text-zinc-600 select-none text-right w-6">
                        {i + 1}
                      </span>
                      <span className="table-cell">
                        {line.startsWith('interface') ? (
                          <>
                            <span className="text-[#96cbfe]">interface</span>{" "}
                            <span className="text-[#ffffb6] underline">{line.split(' ')[1]}</span>{" "}
                            <span className="text-zinc-400">{line.split(' ')[2]}</span>
                          </>
                        ) : line.startsWith('const') ? (
                          <>
                            <span className="text-[#96cbfe]">const</span>{" "}
                            <span className="text-white">{line.split(' ')[1]}</span>{" "}
                            <span className="text-zinc-400">{line.split(' ').slice(2).join(' ')}</span>
                          </>
                        ) : line.includes(':') ? (
                          <>
                            <span className="text-zinc-300">{line.split(':')[0]}:</span>
                            <span className="text-[#a8ff60]">{line.split(':').slice(1).join(':')}</span>
                          </>
                        ) : (
                          <span className="text-zinc-400">{line}</span>
                        )}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM MIDDLE MOUSE POINT INDICATOR */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-8 cursor-none group">
        <a href="#catalog" className="flex flex-col items-center gap-1 cursor-none">
          <div className="w-5 h-8 border-2 border-[#5AB2FF] rounded-full flex justify-center pt-1.5 shadow-[0_0_10px_#5AB2FF40] group-hover:border-cyan-300 transition-colors">
            <span className="w-1 h-2 bg-[#5AB2FF] rounded-full animate-bounce" />
          </div>
          <div className="flex flex-col items-center -space-y-1 text-[#5AB2FF] group-hover:text-cyan-300 transition-colors">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 animate-pulse">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </a>
      </div>
    </section>
  );
}
