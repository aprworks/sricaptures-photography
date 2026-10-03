import Image from "next/image";
import { blurFor } from "@/lib/images";
import { cn } from "@/lib/cn";
import type { Photo as PhotoType } from "@/types";

interface Props {
  photo: PhotoType;
  /**
   * Tell the browser how wide the image will really be, so it downloads the
   * smallest adequate file instead of the full-resolution original.
   * e.g. "(min-width: 1024px) 50vw, 100vw"
   */
  sizes: string;
  /**
   * Crop to a fixed ratio using Tailwind classes, e.g. "aspect-[4/5] lg:aspect-[3/2]".
   * Omit to show the photo in its natural proportions (no cropping).
   */
  ratio?: string;
  className?: string;
  /** LCP image? Preloads it. Use for the hero / first image only. */
  preload?: boolean;
  quality?: 75 | 90;
  /** Subtle zoom on hover (wrap in a link/button). */
  zoom?: boolean;
  /** CSS object-position for cropped images, e.g. "50% 30%" */
  focal?: string;
}

/** Every photograph on the site goes through this: optimized, blur-up, and zero layout shift. */
export function Photo({ photo, sizes, ratio, className, preload, quality, zoom, focal }: Props) {
  const common = {
    sizes,
    quality,
    preload,
    placeholder: "blur" as const,
    blurDataURL: blurFor(photo),
  };

  if (ratio) {
    return (
      <div className={cn("photo-frame", zoom && "photo-zoom", ratio, className)}>
        <Image src={photo.src} alt={photo.alt} fill {...common} className="object-cover" style={focal ? { objectPosition: focal } : undefined} />
      </div>
    );
  }

  return (
    <div className={cn("photo-frame", zoom && "photo-zoom", className)} style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
      <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} {...common} className="h-full w-full object-cover" />
    </div>
  );
}
