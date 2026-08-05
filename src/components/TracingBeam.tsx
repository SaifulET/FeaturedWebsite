"use client";

import React, { useEffect, useState, useRef } from "react";

export function TracingBeam({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [gradientY1, setGradientY1] = useState(0);
  const [gradientY2, setGradientY2] = useState(0);
  const [beamActive, setBeamActive] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setSvgHeight(containerRef.current.scrollHeight);
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      const totalH = containerRef.current.scrollHeight;
      const windowH = window.innerHeight;

      // Scroll ratio calculation across total page height
      const scrolled = window.scrollY;
      const scrollableDist = Math.max(1, totalH - windowH);
      const scrollRatio = Math.max(0, Math.min(1, scrolled / scrollableDist));

      const beamLength = 400;
      const y1Val = scrollRatio * totalH;
      const y2Val = Math.max(0, y1Val - beamLength);

      setGradientY1(y1Val);
      setGradientY2(y2Val);
      setBeamActive(scrollRatio > 0.005);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Path generator creating the zig-zag timeline path down the page height
  const p1 = Math.max(150, svgHeight * 0.25);
  const p2 = Math.max(300, svgHeight * 0.65);
  const pathD = `M 1 0 V -36 l 18 24 V ${p1} l -18 24 V ${p2} l 18 24 V ${svgHeight || 5000}`;

  return (
    <div ref={containerRef} className="relative w-full min-h-screen">
      {/* Vertical Scroll Tracing Beam Container */}
      <div className="pointer-events-none absolute left-3 sm:left-6 md:left-10 lg:left-14 top-6 h-full flex justify-center flex-col items-center z-30">
        {/* Top Node Indicator Dot */}
        <div
          className="border-neutral-200 flex h-4 w-4 items-center justify-center rounded-full border shadow-sm bg-emerald-200 transition-all duration-300 shrink-0"
          style={{ boxShadow: beamActive ? "0 0 12px #05df72" : "rgba(0, 0, 0, 0.24) 0px 0px 0px" }}
        >
          <div
            className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
            style={{ backgroundColor: "white", borderColor: "white" }}
          />
        </div>

        {/* SVG Laser Beam Path */}
        {svgHeight > 0 && (
          <svg
            viewBox={`0 0 20 ${svgHeight}`}
            width="30"
            height={svgHeight}
            className="block mt-2"
            aria-hidden="true"
          >
            {/* Background Path Line */}
            <path
              d={pathD}
              fill="none"
              stroke="#9091A0"
              strokeOpacity="0.16"
            />

            {/* Scroll Animated Gradient Beam Path */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#tracingGradient)"
              strokeWidth="2"
              className="motion-reduce:hidden"
            />

            <defs>
              <linearGradient
                id="tracingGradient"
                gradientUnits="userSpaceOnUse"
                x1="0"
                x2="0"
                y1={gradientY1}
                y2={gradientY2}
              >
                <stop stopColor="#05df72" stopOpacity="0" />
                <stop stopColor="#b3ffe0" />
                <stop offset="0.325" stopColor="#05df72" />
                <stop offset="1" stopColor="#05df72" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>

      {/* Main Page Children Content Layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
