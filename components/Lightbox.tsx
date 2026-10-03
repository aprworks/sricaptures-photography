"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { blurFor } from "@/lib/images";
import type { Photo } from "@/types";

interface Props {
  photos: Photo[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}

/** Full-screen viewer built on the native <dialog>: focus trap, Esc, and backdrop come free. Supports arrows + swipe. */
export function Lightbox({ photos, index, onIndexChange, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const total = photos.length;
  const photo = photos[index];

  const go = useCallback((d: number) => onIndexChange((index + d + total) % total), [index, total, onIndexChange]);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    const opener = document.activeElement as HTMLElement | null;
    dlg.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      dlg.close();
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const btn =
    "absolute z-10 flex h-12 w-12 items-center justify-center text-2xl text-white/80 transition-colors hover:text-white";

  return (
    <dialog
      ref={ref}
      className="lightbox on-dark"
      aria-label={`Photo viewer, image ${index + 1} of ${total}`}
      onClose={onClose}
      onCancel={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button type="button" onClick={onClose} className={`${btn} right-3 top-3`} aria-label="Close viewer">
        ✕
      </button>
      {total > 1 && (
        <>
          <button type="button" onClick={() => go(-1)} className={`${btn} left-2 top-1/2 -translate-y-1/2`} aria-label="Previous photo">
            ←
          </button>
          <button type="button" onClick={() => go(1)} className={`${btn} right-2 top-1/2 -translate-y-1/2`} aria-label="Next photo">
            →
          </button>
        </>
      )}

      <div className="absolute inset-0 px-2 py-14 sm:px-16" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="relative h-full w-full">
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            quality={90}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={blurFor(photo)}
            className="object-contain"
          />
        </div>
      </div>

      <p className="absolute inset-x-0 bottom-3 text-center text-xs tracking-[0.2em] text-white/60" aria-live="polite">
        {index + 1} / {total}
      </p>
    </dialog>
  );
}
