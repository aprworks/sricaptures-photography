"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { aspectOf, orientationOf } from "@/lib/images";
import { cn } from "@/lib/cn";
import type { Photo as PhotoType } from "@/types";

// The lightbox JS is only fetched the first time someone opens a photograph.
const Lightbox = dynamic(() => import("@/components/Lightbox").then((m) => m.Lightbox), { ssr: false });

/* Tailwind needs full class names at build time, so spans/starts are lookup tables. */
const SPAN: Record<number, string> = { 4: "md:col-span-4", 5: "md:col-span-5", 6: "md:col-span-6", 7: "md:col-span-7", 8: "md:col-span-8", 9: "md:col-span-9", 12: "md:col-span-12" };
const START: Record<number, string> = { 1: "md:col-start-1", 2: "md:col-start-2", 3: "md:col-start-3", 4: "md:col-start-4", 5: "md:col-start-5", 6: "md:col-start-6", 7: "md:col-start-7", 8: "md:col-start-8", 9: "md:col-start-9" };

interface Slot {
  index: number;
  photo: PhotoType;
  span: number;
  start: number;
  /** extra classes (vertical offsets) */
  extra?: string;
}

const widthFor = (p: PhotoType) => {
  const o = orientationOf(p);
  return o === "portrait" ? 4 : o === "square" ? 5 : 7;
};

/**
 * Turns a flat list of photos into an editorial "photo story":
 * panoramic frames run full-bleed, other frames pair up (a large one with a small one,
 * offset vertically) or sit alone on alternating sides. Nothing is cropped.
 */
function buildSlots(photos: PhotoType[]): Slot[][] {
  const rows: Slot[][] = [];
  let i = 0;
  let flip = false;
  while (i < photos.length) {
    const a = photos[i];
    const b = photos[i + 1];
    const rowNo = rows.length;

    if (aspectOf(a) >= 1.7) {
      rows.push([{ index: i, photo: a, span: 12, start: 1 }]);
      i += 1;
    } else if (b && aspectOf(b) < 1.7 && rowNo % 3 !== 2 && widthFor(a) + widthFor(b) <= 11) {
      const wa = widthFor(a);
      const wb = widthFor(b);
      const lead = flip ? 2 : 1; // breathing room on one side
      rows.push([
        { index: i, photo: a, span: wa, start: lead },
        { index: i + 1, photo: b, span: wb, start: 13 - wb - (flip ? 0 : 1), extra: "md:mt-24 md:self-end" },
      ]);
      flip = !flip;
      i += 2;
    } else {
      const w = Math.min(orientationOf(a) === "landscape" ? 9 : orientationOf(a) === "square" ? 6 : 5, 9);
      rows.push([{ index: i, photo: a, span: w, start: flip ? 13 - w : 1 }]);
      flip = !flip;
      i += 1;
    }
  }
  return rows;
}

const sizesFor = (span: number) => (span >= 12 ? "100vw" : `(min-width: 768px) ${Math.round((span / 12) * 100)}vw, 100vw`);

export function ImageGallery({ photos, label }: { photos: PhotoType[]; label: string }) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const rows = buildSlots(photos);

  return (
    <>
      <div className="container-x space-y-6 md:space-y-16 lg:space-y-24" role="list" aria-label={label}>
        {rows.map((row, r) => (
          <div key={r} role="listitem" className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            {row.map((s) => (
              <Reveal key={s.index} variant="image" className={cn("col-span-1", SPAN[s.span], START[s.start], s.extra)}>
                <figure>
                  <button
                    type="button"
                    onClick={() => setOpenAt(s.index)}
                    className="block w-full cursor-zoom-in text-left"
                    aria-label={`Open photo ${s.index + 1} of ${photos.length}: ${s.photo.alt}`}
                    aria-haspopup="dialog"
                  >
                    <Photo photo={s.photo} sizes={sizesFor(s.span)} zoom />
                  </button>
                  {s.photo.caption && <figcaption className="mt-3 text-sm text-mute">{s.photo.caption}</figcaption>}
                </figure>
              </Reveal>
            ))}
          </div>
        ))}
      </div>

      {openAt !== null && <Lightbox photos={photos} index={openAt} onIndexChange={setOpenAt} onClose={() => setOpenAt(null)} />}
    </>
  );
}
