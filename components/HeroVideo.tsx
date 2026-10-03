"use client";

import { useState, useSyncExternalStore } from "react";

const QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function canPlay() {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  const slow = conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "");
  return window.matchMedia(QUERY).matches && !slow;
}

/**
 * Optional looping hero film. The <video> element is only created on large,
 * non-reduced-motion screens without data-saver, so phones and slow
 * connections never download it — they keep the (already preloaded) hero image.
 */
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const enabled = useSyncExternalStore(subscribe, canPlay, () => false);
  const [ready, setReady] = useState(false);

  if (!enabled) return null;
  return (
    <video
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      onCanPlay={() => setReady(true)}
    />
  );
}
