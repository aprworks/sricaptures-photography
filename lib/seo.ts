import type { Metadata } from "next";
import { fullLocation, site } from "@/content/site";
import { socialImageUrl } from "@/lib/images";
import type { Photo, Project, VideoItem } from "@/types";

export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

interface MetaInput {
  title: string;
  description: string;
  path: string;
  image?: Photo;
  type?: "website" | "article";
  /** Don't append the site name (used for the home page). */
  absoluteTitle?: boolean;
  noindex?: boolean;
}

/** One place that builds title / description / canonical / Open Graph / Twitter for every page. */
export function buildMetadata({ title, description, path, image, type = "website", absoluteTitle, noindex }: MetaInput): Metadata {
  const url = absoluteUrl(path);
  const images = image
    ? [{ url: socialImageUrl(image, site.url), width: image.width, height: image.height, alt: image.alt }]
    : site.seo.ogImage
      ? [{ url: site.seo.ogImage, width: 1200, height: 630, alt: site.name }]
      : undefined; // falls back to app/opengraph-image.tsx
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(site.seo.twitterHandle && { creator: site.seo.twitterHandle }),
      ...(images && { images: images.map((i) => i.url) }),
    },
  };
}

/* ───────────────────────────── JSON-LD ───────────────────────────── */

const sameAs = () =>
  Object.values(site.social)
    .filter((s): s is { handle: string; url: string } => Boolean(s))
    .map((s) => s.url);

/** LocalBusiness (Photographer) — drives Local SEO. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Photographer",
    "@id": absoluteUrl("/#business"),
    name: `${site.name} — ${site.descriptor}`,
    description: site.description,
    url: site.url,
    email: site.contact.email,
    telephone: site.contact.phone,
    image: site.seo.ogImage ?? socialImageUrl(site.hero.images[0], site.url),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    ...(site.location.geo && {
      geo: { "@type": "GeoCoordinates", latitude: site.location.geo.lat, longitude: site.location.geo.lng },
    }),
    areaServed: site.location.serviceAreas.map((name) => ({ "@type": "Place", name })),
    sameAs: sameAs(),
    priceRange: "$$$",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: site.url,
    name: site.name,
    inLanguage: site.language,
    publisher: { "@id": absoluteUrl("/#business") },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function projectJsonLd(p: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: p.title,
    description: p.description,
    url: absoluteUrl(`/work/${p.slug}`),
    datePublished: String(p.year),
    contentLocation: { "@type": "Place", name: p.location },
    author: { "@type": "Person", name: site.name, url: site.url },
    image: [p.coverImage, ...p.images.slice(0, 8)].map((img) => ({
      "@type": "ImageObject",
      contentUrl: img.src.startsWith("http") ? img.src : absoluteUrl(img.src),
      caption: img.alt,
      width: img.width,
      height: img.height,
      creator: { "@type": "Person", name: site.name },
    })),
  };
}

export function videoJsonLd(v: VideoItem) {
  const embedUrl =
    v.provider === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${v.id}`
      : v.provider === "vimeo"
        ? `https://player.vimeo.com/video/${v.id}`
        : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.title,
    description: v.description ?? v.title,
    thumbnailUrl: socialImageUrl(v.poster, site.url),
    uploadDate: `${v.year ?? new Date().getFullYear()}-01-01`,
    ...(embedUrl ? { embedUrl } : { contentUrl: v.id.startsWith("http") ? v.id : absoluteUrl(v.id) }),
  };
}

export const locationPhrase = fullLocation;
