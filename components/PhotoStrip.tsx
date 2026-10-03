import Image from "next/image";
import { blurFor } from "@/lib/images";
import { cn } from "@/lib/cn";
import type { Photo } from "@/types";

const COLS: Record<number, string> = { 1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3" };

/**
 * 1–3 photos side by side, filling the box (used for full-screen heroes).
 * Phones get only the first photo; the others are `hidden` + lazy, so they are
 * never downloaded on small screens. Works beautifully with portrait (4:5) frames,
 * which would otherwise be heavily cropped by a single wide hero.
 */
export function PhotoStrip({ photos, className, preload }: { photos: Photo[]; className?: string; preload?: boolean }) {
  const list = photos.slice(0, 3);
  const n = list.length;
  return (
    <div className={cn("grid grid-cols-1 gap-px", COLS[n], className)}>
      {list.map((p, i) => (
        <div key={p.src + i} className={cn("relative h-full overflow-hidden bg-ink", i > 0 && "hidden md:block")}>
          <Image
            src={p.src}
            alt={p.alt}
            fill
            preload={preload && i === 0}
            sizes={i === 0 ? `(min-width: 768px) ${Math.round(100 / n)}vw, 100vw` : `${Math.round(100 / n)}vw`}
            placeholder="blur"
            blurDataURL={blurFor(p)}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
