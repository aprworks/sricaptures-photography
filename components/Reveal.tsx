"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props {
  children: ReactNode;
  /** "up" fades + lifts text/blocks; "image" is a soft wipe for photographs */
  variant?: "up" | "image";
  /** ms delay, useful for staggering siblings */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "figure" | "p" | "h2" | "header";
}

/**
 * Fades content in once, the first time it scrolls into view.
 * CSS (globals.css) only hides it when JS is running and the visitor has not
 * asked for reduced motion, so crawlers / no-JS users always see everything.
 */
export function Reveal({ children, variant = "up", delay = 0, className, as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as ElementType;
  return (
    <Tag
      ref={ref}
      className={cn(variant === "image" ? "reveal-image" : "reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
