import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TrackedLink } from "@/components/TrackedLink";
import { VideoEmbed } from "@/components/VideoEmbed";
import { site } from "@/content/site";
import { videos } from "@/content/videos";
import { cn } from "@/lib/cn";

/**
 * Home page film section. Landscape films get a large 16:9 frame; vertical reels
 * sit side by side in 9:16 frames. Everything is click-to-play.
 */
export function VideoSection() {
  const list = videos.filter((v) => v.featured).slice(0, 3);
  if (list.length === 0) return null;
  const landscape = list.filter((v) => v.orientation !== "portrait");
  const reels = list.filter((v) => v.orientation === "portrait");

  return (
    <section aria-labelledby="film-heading" className="on-dark section bg-ink text-paper">
      <div className="container-x">
        <SectionHeading
          eyebrow="Films & reels"
          title={<span id="film-heading">Moving pictures.</span>}
          action={{ label: "All films", href: "/video" }}
        />

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="lede">
              Some moments need motion and music. We create cinematic reels and short films alongside your photographs &mdash; made to be shared.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <Link href="/contact?type=Reels%20%2F%20Video" className="arrow-link link-underline">
                Ask about video <span aria-hidden className="arrow">→</span>
              </Link>
              <TrackedLink href={site.social.instagram.url} event="click_instagram" eventProps={{ location: "film-section" }} className="arrow-link link-underline">
                More reels on Instagram <span aria-hidden className="arrow">↗</span>
              </TrackedLink>
            </div>
          </Reveal>

          <div className={cn("grid gap-6 lg:col-span-8", reels.length > 1 ? "grid-cols-2 sm:grid-cols-3" : "")}>
            {landscape.map((v) => (
              <Reveal key={v.slug} className="col-span-full">
                <VideoEmbed video={v} sizes="(min-width: 1024px) 66vw, 100vw" />
              </Reveal>
            ))}
            {reels.map((v, i) => (
              <Reveal key={v.slug} delay={i * 100} className={reels.length === 1 ? "mx-auto w-full max-w-sm lg:ml-auto lg:mr-0" : ""}>
                <VideoEmbed video={v} sizes="(min-width: 640px) 33vw, 50vw" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
