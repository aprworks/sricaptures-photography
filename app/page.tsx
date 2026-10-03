import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { SelectedWork } from "@/components/SelectedWork";
import { ServicesSection } from "@/components/ServicesSection";
import { Testimonials } from "@/components/Testimonials";
import { VideoSection } from "@/components/VideoSection";
import { fullLocation, site } from "@/content/site";
import { blurFor } from "@/lib/images";
import { allProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — ${site.descriptor} in ${fullLocation}`,
  description: site.description,
  path: "/",
  image: site.hero.images[0],
  absoluteTitle: true,
});

export default function HomePage() {
  const { about } = site;
  const ctaImage = allProjects[0]?.heroImage ?? allProjects[0]?.coverImage;

  return (
    <>
      <Hero />

      {/* Statement: who, what, where */}
      <section className="section">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow">Based in {fullLocation}</p>
            <p className="eyebrow mt-2">Telangana · Andhra Pradesh · Destination</p>
          </Reveal>
          <Reveal className="md:col-span-9" delay={100}>
            <p className="display-md max-w-4xl">
              We photograph weddings, pre-wedding shoots and celebrations with a <em>candid, colourful</em> eye &mdash; so years from now, every picture still feels like the day itself.
            </p>
          </Reveal>
        </div>
      </section>

      <FeaturedWork />
      <ServicesSection />
      <SelectedWork />

      {/* About preview */}
      <section aria-labelledby="about-preview" className="section">
        <div className="container-x grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <Reveal variant="image" className="md:col-span-5">
            <div className="photo-frame aspect-[4/5]">
              <Image
                src={about.portrait.src}
                alt={about.portrait.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                placeholder="blur"
                blurDataURL={blurFor(about.portrait)}
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
            <p className="eyebrow mb-5">About</p>
            <h2 id="about-preview" className="display-lg">
              Hello, we&rsquo;re <em>{site.wordmark}.</em>
            </h2>
            <p className="lede mt-8">{about.intro}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/about" className="arrow-link link-underline">
                More about us <span aria-hidden className="arrow">→</span>
              </Link>
              <Link href="/contact" className="arrow-link link-underline text-accent">
                Check availability <span aria-hidden className="arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <VideoSection />
      <Testimonials />
      <CTASection location="home-final" image={ctaImage} />
    </>
  );
}
