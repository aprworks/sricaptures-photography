import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { categoryLabel, getFeaturedProjects } from "@/lib/projects";
import { cn } from "@/lib/cn";

/**
 * Home page: large editorial previews, alternating sides.
 * Projects come from content/projects.ts (those with `featured: true`).
 */
export function FeaturedWork({ limit = 3 }: { limit?: number }) {
  const featured = getFeaturedProjects(limit);

  return (
    <section aria-labelledby="featured-heading" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Featured work"
          title={
            <span id="featured-heading">
              Stories told in <em>light.</em>
            </span>
          }
          action={{ label: "All work", href: "/work" }}
        />

        <div className="mt-16 space-y-24 md:mt-24 md:space-y-40">
          {featured.map((p, i) => {
            const flip = i % 2 === 1;
            // landscape treatment only when the project has a wide hero frame
            const wide = Boolean(p.heroImage) && i % 2 === 0;
            return (
              <article key={p.slug} className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
                <Reveal variant="image" className={cn(wide ? "md:col-span-8" : "md:col-span-6 md:col-start-2", flip && "md:order-2 md:col-start-6")}>
                  <Link href={`/work/${p.slug}`} aria-label={`View project: ${p.title}`} className="block">
                    <Photo
                      photo={wide && p.heroImage ? p.heroImage : p.coverImage}
                      ratio={wide ? "aspect-[4/5] md:aspect-[3/2]" : "aspect-[4/5]"}
                      sizes={wide ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                      zoom
                    />
                  </Link>
                </Reveal>
                <Reveal delay={150} className={cn("md:col-span-4", flip && "md:order-1")}>
                  <p className="eyebrow mb-4">
                    {String(i + 1).padStart(2, "0")} — {categoryLabel(p.category)} · {p.year}
                  </p>
                  <h3 className="display-md">
                    <Link href={`/work/${p.slug}`} className="link-underline">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-4 text-[0.95rem] text-mute">{p.location}</p>
                  <p className="prose-calm mt-5 text-[0.98rem]">{p.description}</p>
                  <Link href={`/work/${p.slug}`} className="arrow-link link-underline mt-8">
                    View project <span aria-hidden className="arrow">→</span>
                  </Link>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
