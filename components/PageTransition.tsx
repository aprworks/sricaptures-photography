import type { ReactNode } from "react";

/**
 * Soft fade/lift on every navigation. Used by app/template.tsx, which React
 * re-mounts per route — so the animation replays on each page change.
 * Disabled for reduced-motion in globals.css.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return <div className="page-in">{children}</div>;
}
