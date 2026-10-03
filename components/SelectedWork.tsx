import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { allProjects } from "@/lib/projects";

/**
 * Home page: a large, uncropped photo wall (CSS-column masonry — no JS).
 * Takes one frame from each project, so it updates itself when you add projects.
 * Every frame links to its project.
 */
export function SelectedWork({ limit = 9 }: { limit?: number }) {
  const frames = allProjects
    .map((p) => ({ project: p, photo: p.images[1] ?? p.coverImage }))
    .slice(0, limit);

  return (
    <section aria-labelledby="selected-heading" className="section bg-paper-deep">
      <div className="container-x">
        <SectionHeading
          eyebrow="Selected frames"
          title={<span id="selected-heading">A closer look.</span>}
          action={{ label: "Browse the portfolio", href: "/work" }}
        />
        <ul className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-6">
          {frames.map(({ project, photo }, i) => (
            <Reveal as="li" key={project.slug} variant="image" delay={(i % 3) * 90} className="mb-4 break-inside-avoid lg:mb-6">
              <Link href={`/work/${project.slug}`} className="group relative block" aria-label={`${project.title} — view project`}>
                <Photo photo={photo} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" zoom />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-[0.7rem] uppercase tracking-[0.18em] text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {project.title}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
