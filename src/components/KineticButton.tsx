"use client";

import React, { useRef, useState, useCallback } from "react";

export type KineticTone = "solid" | "contrast" | "surface" | "crimson" | "cyber" | "emerald";
export type KineticFx = "jump" | "smoke" | "drive" | "flip";

export interface KineticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  tone?: KineticTone;
  fx?: KineticFx;
  step?: number; // stagger interval in seconds, default 0.04
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
  badge?: string;
  onDirectionDetected?: (fromRight: boolean) => void;
}

export const KineticButton: React.FC<KineticButtonProps> = ({
  text,
  tone = "solid",
  fx = "jump",
  step = 0.038,
  icon,
  iconPosition = "left",
  size = "md",
  badge,
  className = "",
  onClick,
  onDirectionDetected,
  ...rest
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isBusy, setIsBusy] = useState(false);

  // Split string into characters preserving index count
  const characters = Array.from(text);
  const totalChars = characters.length;

  const triggerAnimation = useCallback(
    (fromRight: boolean) => {
      const btn = btnRef.current;
      if (!btn) return;
      if (btn.dataset.busy) return;

      onDirectionDetected?.(fromRight);

      btn.style.setProperty("--rev", fromRight ? "1" : "0");
      btn.style.setProperty("--step", `${step}s`);
      btn.classList.add("is-go");
      btn.dataset.busy = "1";
      setIsBusy(true);

      const runs = (
        typeof btn.getAnimations === "function"
          ? btn.getAnimations({ subtree: true })
          : []
      ).filter((a) => (a as unknown as { animationName?: string }).animationName);

      if (runs.length > 0) {
        Promise.allSettled(runs.map((a) => a.finished)).then(() => {
          btn.classList.remove("is-go");
          delete btn.dataset.busy;
          setIsBusy(false);
        });
      } else {
        // Fallback timer if getAnimations is not available in test environment
        const fallbackMs = (totalChars * step + 0.65) * 1000;
        setTimeout(() => {
          btn.classList.remove("is-go");
          delete btn.dataset.busy;
          setIsBusy(false);
        }, fallbackMs);
      }
    },
    [step, totalChars, onDirectionDetected]
  );

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const fromRight = e.clientX - rect.left > rect.width / 2;
    triggerAnimation(fromRight);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (btn && !btn.dataset.busy) {
      const rect = btn.getBoundingClientRect();
      const fromRight = e.clientX - rect.left > rect.width / 2;
      triggerAnimation(fromRight);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const fromRight = e.clientX - rect.left > rect.width / 2;
    if (!isBusy) {
      triggerAnimation(fromRight);
    }
    onClick?.(e);
  };

  // Size styling helper
  const sizeClasses = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5 font-bold"
  }[size];

  return (
    <button
      ref={btnRef}
      type="button"
      className={`gbtn gbtn--${tone} ${sizeClasses} ${className}`}
      data-fx={fx}
      style={{
        ["--step" as string]: `${step}s`,
        ["--rev" as string]: "0"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      {...rest}
    >
      {icon && iconPosition === "left" && (
        <span className="inline-flex shrink-0 items-center justify-center transition-transform duration-200 group-hover:scale-110">
          {icon}
        </span>
      )}

      <span className="g-wrap" aria-label={text}>
        {characters.map((char, index) => {
          if (char === " ") {
            return (
              <span
                key={index}
                className="g-space"
                style={
                  {
                    ["--i"]: index,
                    ["--n"]: totalChars
                  } as React.CSSProperties
                }
              >
                &nbsp;
              </span>
            );
          }

          return (
            <span
              key={index}
              className="g"
              style={
                {
                  ["--i"]: index,
                  ["--n"]: totalChars
                } as React.CSSProperties
              }
            >
              {char}
            </span>
          );
        })}
      </span>

      {icon && iconPosition === "right" && (
        <span className="inline-flex shrink-0 items-center justify-center transition-transform duration-200 group-hover:scale-110">
          {icon}
        </span>
      )}

      {badge && (
        <span className="ml-1.5 px-1.5 py-0.5 text-[10px] uppercase font-mono tracking-wider rounded-full bg-white/20 text-current border border-white/10">
          {badge}
        </span>
      )}
    </button>
  );
};

export default KineticButton;
