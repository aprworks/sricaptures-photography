import { categories, categoryLabel } from "@/content/categories";
import { projects } from "@/content/projects";
import type { Project } from "@/types";

export const allProjects = [...projects].sort((a, b) => b.year - a.year);

if (process.env.NODE_ENV !== "production") {
  const slugs = new Set<string>();
  for (const p of projects) {
    if (slugs.has(p.slug)) throw new Error(`Duplicate project slug: "${p.slug}" (content/projects.ts)`);
    slugs.add(p.slug);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug))
      throw new Error(`Project slug "${p.slug}" must be lowercase letters, numbers and hyphens.`);
  }
}

export const getProject = (slug: string) => allProjects.find((p) => p.slug === slug);

export const getFeaturedProjects = (limit = 3) => allProjects.filter((p) => p.featured).slice(0, limit);

export { categoryLabel };

/** Only categories that actually contain projects (so filters never lead to empty pages). */
export const usedCategories = categories.filter((c) => allProjects.some((p) => p.category === c.id));

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const manual = (project.related ?? []).map(getProject).filter((p): p is Project => Boolean(p));
  const rest = allProjects.filter((p) => p.slug !== project.slug && !manual.includes(p));
  const sameCat = rest.filter((p) => p.category === project.category);
  const others = rest.filter((p) => p.category !== project.category);
  return [...manual, ...sameCat, ...others].slice(0, limit);
}

export function getAdjacentProjects(slug: string) {
  const i = allProjects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? allProjects[i - 1] : allProjects[allProjects.length - 1],
    next: i < allProjects.length - 1 ? allProjects[i + 1] : allProjects[0],
  };
}
