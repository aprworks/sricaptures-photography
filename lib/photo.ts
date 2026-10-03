import meta from "@/content/image-meta.json";
import type { Photo } from "@/types";

type Meta = Record<string, { w: number; h: number; blur: string }>;

/**
 * Create a Photo from a file in /public. Width, height and the blur placeholder
 * are read from content/image-meta.json, which `npm run images` generates
 * (it also runs automatically before `dev` and `build`).
 *
 *   photo("/images/projects/my-shoot/01.jpg", "Bride laughing during the haldi")
 */
export function photo(src: string, alt: string, extra: Partial<Photo> = {}): Photo {
  const m = (meta as Meta)[src];
  if (!m) {
    throw new Error(`No metadata for "${src}". Check the path exists in /public, then run "npm run images".`);
  }
  return { src, alt, width: m.w, height: m.h, blurDataURL: m.blur, ...extra };
}
