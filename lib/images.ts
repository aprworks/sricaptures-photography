import type { Photo } from "@/types";

/** Tiny solid-colour SVG used as a blur-up placeholder (works on server + client). */
export function blurFor(photo: Pick<Photo, "tone" | "blurDataURL">): string {
  if (photo.blurDataURL) return photo.blurDataURL;
  const tone = photo.tone ?? "#cfc9bd";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" preserveAspectRatio="none"><filter id="b"><feGaussianBlur stdDeviation="1"/></filter><rect width="8" height="8" fill="${tone}" filter="url(#b)"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const aspectOf = (p: Photo) => p.width / p.height;
export const orientationOf = (p: Photo): "landscape" | "portrait" | "square" => {
  const r = aspectOf(p);
  return r > 1.15 ? "landscape" : r < 0.87 ? "portrait" : "square";
};

/**
 * Absolute URL for social sharing (Open Graph / Twitter). For the best previews,
 * set `site.seo.ogImage` to a dedicated 1200×630 image.
 */
export function socialImageUrl(photo: Photo, siteUrl: string): string {
  return photo.src.startsWith("http") ? photo.src : `${siteUrl}${photo.src}`;
}
