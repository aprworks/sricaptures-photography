import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { allProjects } from "@/lib/projects";

// Updates itself: every project in content/projects.ts gets an entry.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["", 1, "weekly"],
    ["/work", 0.9, "weekly"],
    ["/services", 0.8, "monthly"],
    ["/video", 0.7, "monthly"],
    ["/about", 0.7, "yearly"],
    ["/contact", 0.9, "yearly"],
  ];
  return [
    ...pages.map(([path, priority, changeFrequency]) => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency, priority })),
    ...allProjects.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      lastModified: new Date(`${p.year}-12-31`) > now ? now : new Date(`${p.year}-12-31`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
      images: [p.coverImage, ...p.images].slice(0, 20).map((i) => (i.src.startsWith("http") ? i.src : `${site.url}${i.src}`)),
    })),
  ];
}
