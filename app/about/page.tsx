import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { fullLocation, site } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `About — ${site.descriptor} in ${site.location.city}`,
  description: `About ${site.name}: a ${site.location.city}-based studio photographing weddings, pre-wedding shoots, haldi, sangeet and engagements across ${site.location.region} and beyond.`,
  path: "/about",
  image: site.about.portrait,
});

export default function AboutPage() {
  const { about, location } = site;
  return (
    <>
      <PageHeader eyebrow="About" title={<>The story <em>behind the lens.</em></>} />

      <section className="container-x pb-24 md:pb-36">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal variant="image" className="md:col-span-5">
            <Photo photo={about.portrait} ratio="aspect-[4/5]" sizes="(min-width: 768px) 40vw, 100vw" preload />
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={100}>
            <p className="display-sm">{about.intro}</p>
            <div className="prose-calm mt-10">
              {about.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-10 text-sm text-mute">
              Based in {fullLocation}. Photographing across {location.serviceAreas.join(", ")}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Experience (hidden until you add numbers in content/site.ts) */}
      {about.experience.length > 0 && (
      <section aria-label="Experience" className="border-y border-line">
        <dl className="container-x grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4 md:py-20">
          {about.experience.map((e, i) => (
            <Reveal key={e.label} delay={i * 80}>
              <dd className="display-lg mb-2">{e.value}</dd>
              <dt className="eyebrow">{e.label}</dt>
            </Reveal>
          ))}
        </dl>
      </section>
      )}

      {/* Philosophy */}
      <section aria-labelledby="philosophy" className="section">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-4">Approach</p>
            <h2 id="philosophy" className="display-lg max-w-3xl">How we <em>work.</em></h2>
          </Reveal>
          <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            {about.philosophy.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 100}>
                <p className="eyebrow mb-5">0{i + 1}</p>
                <h3 className="display-sm">{p.title}</h3>
                <p className="mt-4 text-mute">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Clients + areas */}
      <section aria-labelledby="clients" className="section bg-paper-deep">
        <div className="container-x grid gap-14 md:grid-cols-2">
          <Reveal>
            <h2 id="clients" className="display-md">Who we work with</h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {about.clientTypes.map((c) => (
                <li key={c} className="py-4">{c}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="display-md">Where we shoot</h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {location.serviceAreas.map((a) => (
                <li key={a} className="border border-line px-4 py-2 text-sm">{a}</li>
              ))}
            </ul>
            <p className="mt-8 text-mute">
              Based in {location.city}, {location.country}. Happy to travel &mdash; <Link href="/contact" className="link-underline text-ink">ask about your location</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection location="about-final" heading={<>Say <em>hello.</em></>} text="If our work speaks to you, we&rsquo;d love to hear about your celebration." />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
    </>
  );
}
