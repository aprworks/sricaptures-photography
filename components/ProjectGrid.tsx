"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import type { Project } from "@/types";

interface Props {
  projects: Project[];
  categories: { id: string; label: string }[];
}

/**
 * Staggered editorial grid with category filter.
 * Every project is in the server-rendered HTML (good for SEO); filtering just hides the rest.
 *
 * Desktop rhythm (12 columns), repeating every 4 projects:
 *   [ 7 landscape ][ 5 portrait, dropped ]
 *   [ 5 portrait  ][ 7 landscape, dropped ]
 */
const SLOTS = [
  { col: "lg:col-span-7", ratio: "aspect-[4/5] md:aspect-[4/5] lg:aspect-[3/2]", sizes: "(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw", offset: "" },
  { col: "lg:col-span-5", ratio: "aspect-[4/5]", sizes: "(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw", offset: "lg:mt-32" },
  { col: "lg:col-span-5", ratio: "aspect-[4/5]", sizes: "(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw", offset: "" },
  { col: "lg:col-span-7", ratio: "aspect-[4/5] lg:aspect-[3/2]", sizes: "(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw", offset: "lg:mt-32" },
] as const;

export function ProjectGrid({ projects, categories }: Props) {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? projects : projects.filter((p) => p.category === active);

  const choose = (id: string) => {
    setActive(id);
    track("filter_work", { category: id });
  };

  return (
    <div>
      <div className="container-x">
        <div role="group" aria-label="Filter projects by category" className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2 md:flex-wrap md:overflow-visible">
          {[{ id: "all", label: "All" }, ...categories].map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={active === c.id}
              onClick={() => choose(c.id)}
              className={cn(
                "shrink-0 border px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.18em] transition-colors",
                active === c.id ? "border-ink bg-ink text-paper" : "border-line text-ink hover:border-ink",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <div className="container-x mt-12 md:mt-16">
        <div key={active} className="page-in grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-24">
          {visible.map((p, i) => {
            const slot = SLOTS[i % SLOTS.length];
            return (
              <ProjectCard
                key={p.slug}
                project={p}
                index={i}
                ratio={slot.ratio}
                sizes={slot.sizes}
                preload={i === 0 && active === "all"}
                className={cn("md:col-span-1", slot.col, slot.offset)}
              />
            );
          })}
        </div>
        {visible.length === 0 && <p className="py-24 text-center text-mute">No projects in this category yet.</p>}
      </div>
    </div>
  );
}
