import type { categories } from "@/content/categories";

export type CategoryId = (typeof categories)[number]["id"];

/** A single photograph. Everything the UI needs to render it without layout shift. */
export interface Photo {
  /** Absolute URL, or a path under /public, e.g. "/images/projects/alpine/01.jpg" */
  src: string;
  /** Describe the image for screen readers + SEO. Required. */
  alt: string;
  /** Intrinsic pixel size of the SOURCE file (sets the aspect ratio, prevents CLS). */
  width: number;
  height: number;
  /** Dominant colour (hex) used for the blur-up placeholder. */
  tone?: string;
  /** Pre-generated base64 blur (from scripts/image-meta.mjs). Overrides `tone`. */
  blurDataURL?: string;
  caption?: string;
}

export type VideoProvider = "youtube" | "vimeo" | "self";

export interface VideoItem {
  slug: string;
  title: string;
  description?: string;
  provider: VideoProvider;
  /** YouTube/Vimeo ID, or a file URL for provider "self" */
  id: string;
  /** "portrait" for vertical 9:16 reels; default is landscape 16:9 */
  orientation?: "landscape" | "portrait";
  /** Poster / thumbnail — always required so nothing heavy loads up-front */
  poster: Photo;
  year?: number;
  client?: string;
  /** "mm:ss" for display */
  duration?: string;
  category?: string;
  featured?: boolean;
}

export interface Credit {
  role: string;
  name: string;
  url?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: CategoryId;
  year: number;
  location: string;
  /** One or two sentences — used on cards and as meta description. */
  description: string;
  /** Optional longer story, one string per paragraph. */
  story?: string[];
  client?: string;
  coverImage: Photo;
  /** Wide hero for the project page. Falls back to coverImage. */
  heroImage?: Photo;
  /** The photo story. Order matters; the layout rhythm is generated automatically. */
  images: Photo[];
  video?: VideoItem;
  credits?: Credit[];
  featured?: boolean;
  /** Manually pick related project slugs (otherwise same-category projects are used). */
  related?: string[];
}

export interface Service {
  slug: string;
  name: string;
  summary: string;
  description: string;
  includes: string[];
  /** Leave undefined to hide pricing. */
  startingPrice?: string;
  images: Photo[];
  /** Pre-selects this option in the contact form. Must match a value in `shootTypes`. */
  inquiryType: string;
  /** Show on the homepage services list */
  featured?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
}
