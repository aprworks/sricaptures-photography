import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { ImageGallery } from "@/components/ImageGallery";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { PhotoStrip } from "@/components/PhotoStrip";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { TrackView } from "@/components/TrackView";
import { VideoEmbed } from "@/components/VideoEmbed";
import { categoryLabel, inquiryTypeByCategory } from "@/content/categories";
import { orientationOf } from "@/lib/images";
import { allProjects, getAdjacentProjects, getProject, getRelatedProjects } from "@/lib/projects";
import { breadcrumbJsonLd, buildMetadata, projectJsonLd, videoJsonLd } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: `${project.title} — ${categoryLabel(project.category)} Photography`,
    description: project.description,
    path: `/work/${project.slug}`,
    image: project.heroImage ?? project.coverImage,
    type: "article",
  });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project);
  const { next } = getAdjacentProjects(project.slug);
  const hero = project.heroImage ?? project.coverImage;
  // Portrait heroes become a side-by-side strip on desktop instead of a heavy crop.
  const heroStrip =
    orientationOf(hero) === "landscape"
      ? null
      : [hero, ...project.images.filter((i) => i.src !== hero.src && orientationOf(i) !== "landscape")].slice(0, 3);
  const inquiryType = inquiryTypeByCategory[project.category];
  const contactHref = inquiryType ? `/contact?type=${encodeURIComponent(inquiryType)}` : "/contact";

  const facts: [string, string][] = [
    ["Category", categoryLabel(project.category)],
    ["Year", String(project.year)],
    ["Location", project.location],
    ...(project.client ? ([["Client", project.client]] as [string, string][]) : []),
  ];

  return (
    <article>
      {/* Hero */}
      <div className="pt-[var(--header-h)]">
        {heroStrip ? (
          <PhotoStrip photos={heroStrip} preload className="aspect-[4/5] md:aspect-auto md:h-[78svh]" />
        ) : (
          <Photo
            photo={hero}
            ratio="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9] lg:max-h-[78svh]"
            sizes="100vw"
            preload
            quality={75}
          />
        )}
      </div>

      {/* Title + facts */}
      <header className="container-x section !pb-16 md:!pb-24">
        <Reveal>
          <nav aria-label="Breadcrumb" className="eyebrow mb-8">
            <Link href="/work" className="link-underline">Work</Link> <span aria-hidden>/</span> {categoryLabel(project.category)}
          </nav>
          <h1 className="display-xl max-w-[18ch]">{project.title}</h1>
        </Reveal>

        <div className="mt-12 grid gap-12 md:mt-20 md:grid-cols-12">
          <Reveal as="div" className="md:col-span-4">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink pt-6 text-sm md:grid-cols-1">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-1">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="md:col-span-7 md:col-start-6" delay={100}>
            <p className="display-sm">{project.description}</p>
            {project.story && (
              <div className="prose-calm mt-8">
                {project.story.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </header>

      {/* The photo story */}
      <ImageGallery photos={project.images} label={`${project.title} photographs`} />

      {/* Optional film */}
      {project.video && (
        <section aria-labelledby="project-film" className="container-x section !pb-0">
          <Reveal>
            <h2 id="project-film" className="eyebrow mb-6">The film</h2>
            <VideoEmbed video={project.video} sizes="(min-width: 1024px) 80vw, 100vw" />
          </Reveal>
          <JsonLd data={videoJsonLd(project.video)} />
        </section>
      )}

      {/* Credits */}
      {project.credits && project.credits.length > 0 && (
        <section aria-labelledby="credits" className="container-x section !pb-0">
          <Reveal className="grid gap-8 border-t border-line pt-10 md:grid-cols-12">
            <h2 id="credits" className="eyebrow md:col-span-4">Credits</h2>
            <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2 md:col-span-8">
              {project.credits.map((c) => (
                <div key={c.role + c.name}>
                  <dt className="eyebrow">{c.role}</dt>
                  <dd className="mt-1">
                    {c.url ? <a href={c.url} className="link-underline" target="_blank" rel="noopener noreferrer">{c.name}</a> : c.name}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>
      )}

      {/* Inquiry — earned after seeing the story */}
      <section className="container-x section !pb-0">
        <Reveal className="flex flex-col items-start justify-between gap-8 border-y border-ink py-12 md:flex-row md:items-center md:py-16">
          <p className="display-md max-w-xl">
            Love this story? Let&rsquo;s create <em>yours.</em>
          </p>
          <Link href={contactHref} className="btn btn-solid">
            Inquire about a similar shoot <span aria-hidden className="arrow">→</span>
          </Link>
        </Reveal>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section aria-labelledby="related" className="container-x section">
          <div className="flex items-end justify-between">
            <h2 id="related" className="display-md">More work</h2>
            <Link href={`/work/${next.slug}`} className="arrow-link link-underline">
              Next project <span aria-hidden className="arrow">→</span>
            </Link>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} ratio="aspect-[4/5]" sizes="(min-width: 768px) 33vw, 100vw" />
            ))}
          </div>
        </section>
      )}

      <CTASection location="project-final" primaryLabel="Check availability" />
      <TrackView slug={project.slug} category={project.category} />
      <JsonLd
        data={[
          projectJsonLd(project),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Portfolio", path: "/work" },
            { name: project.title, path: `/work/${project.slug}` },
          ]),
        ]}
      />
    </article>
  );
}
