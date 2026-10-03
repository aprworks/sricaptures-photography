import { HeroVideo } from "@/components/HeroVideo";
import { PhotoStrip } from "@/components/PhotoStrip";
import { TrackedLink } from "@/components/TrackedLink";
import { site } from "@/content/site";

/**
 * Full-screen opening. Desktop: up to three photographs side by side; phones: the first one.
 * The first image is the LCP element: preloaded and never lazy-loaded.
 * Text sits low-left, editorial style.
 */
export function Hero() {
  const { hero, name, positioning, contact, cta } = site;
  const [first, ...rest] = name.split(" ");

  return (
    <section aria-label="Introduction" className="on-dark relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-white">
      <div className="hero-parallax absolute inset-0 -z-10">
        <div className="hero-media absolute inset-0">
          <PhotoStrip photos={[...hero.images]} preload className="absolute inset-0" />
          {hero.video && <HeroVideo src={hero.video.src} poster={hero.images[0].src} />}
        </div>
        {/* one restrained scrim, just enough for legible type */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30" />
        <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-r from-black/55 via-black/15 to-transparent md:block" />
      </div>

      <div className="container-x hero-fade pb-10 pt-40 md:pb-16">
        <p className="eyebrow mb-5 md:mb-8">{hero.eyebrow}</p>
        <h1 className="display-xl">
          <span className="block">{first}</span>
          {rest.length > 0 && <span className="block italic md:ml-[0.6em]">{rest.join(" ")}</span>}
        </h1>

        <div className="mt-8 grid items-end gap-8 md:mt-12 md:grid-cols-12">
          <p className="lede md:col-span-6 lg:col-span-5">{positioning}</p>

          <div className="flex flex-col gap-3 sm:flex-row md:col-span-6 md:justify-end lg:col-span-7">
            <TrackedLink href={cta.primary.href} event="click_cta" eventProps={{ location: "hero" }} className="btn btn-light">
              {cta.primary.label} <span aria-hidden className="arrow">→</span>
            </TrackedLink>
            <TrackedLink href={cta.secondary.href} className="btn btn-outline-light">
              {cta.secondary.label}
            </TrackedLink>
          </div>
        </div>

        {contact.availability && (
          <p className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/75 md:mt-14">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#9fd3a0]" />
            {contact.availability}
          </p>
        )}
      </div>
    </section>
  );
}
