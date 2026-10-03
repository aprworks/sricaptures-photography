import Link from "next/link";
import { Photo } from "@/components/Photo";
import { categoryLabel } from "@/content/categories";
import { cn } from "@/lib/cn";
import type { Project } from "@/types";

interface Props {
  project: Project;
  /** Tailwind aspect classes, e.g. "aspect-[4/5] lg:aspect-[3/2]" */
  ratio?: string;
  sizes: string;
  className?: string;
  /** Show a counter such as "01" */
  index?: number;
  preload?: boolean;
}

/** Image-first project preview. The photograph does the talking; text stays small and quiet. */
export function ProjectCard({ project, ratio = "aspect-[4/5]", sizes, className, index, preload }: Props) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/work/${project.slug}`} className="block" aria-label={`${project.title} — ${categoryLabel(project.category)}, ${project.year}`}>
        <Photo photo={project.coverImage} ratio={ratio} sizes={sizes} zoom preload={preload} />
        <div className="mt-4 flex items-baseline justify-between gap-6">
          <h3 className="display-sm">{project.title}</h3>
          <p className="eyebrow shrink-0 text-right">
            {index !== undefined && <span className="mr-3 text-ink/40">{String(index + 1).padStart(2, "0")}</span>}
            {categoryLabel(project.category)}
          </p>
        </div>
        <p className="mt-1 text-sm text-mute">
          {project.location} · {project.year}
        </p>
      </Link>
    </article>
  );
}
