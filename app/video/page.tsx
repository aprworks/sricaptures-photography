import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { TrackedLink } from "@/components/TrackedLink";
import { VideoEmbed } from "@/components/VideoEmbed";
import { site } from "@/content/site";
import { videos } from "@/content/videos";
import { breadcrumbJsonLd, buildMetadata, videoJsonLd } from "@/lib/seo";
import type { VideoItem } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Films & Reels",
  description: `Reels and films by ${site.name}, wedding and portrait photographers in ${site.location.city}.`,
  path: "/video",
  image: videos[0]?.poster,
});

function Meta({ v }: { v: VideoItem }) {
  return (
    <>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h2 className="display-sm">{v.title}</h2>
        <p className="eyebrow shrink-0">{[v.category, v.year].filter(Boolean).join(" · ")}</p>
      </div>
      {v.description && <p className="mt-2 max-w-xl text-mute">{v.description}</p>}
    </>
  );
}

export default function VideoPage() {
  const films = videos.filter((v) => v.orientation !== "portrait");
  const reels = videos.filter((v) => v.orientation === "portrait");

  return (
    <>
      <PageHeader
        eyebrow="Films & reels"
        title={<>Moving <em>pictures.</em></>}
        intro="Reels and short films that carry the same colour and emotion as our photographs. Press play — nothing loads until you do."
      />

      <section className="container-x pb-24 md:pb-36" aria-label="Films and reels">
        {films.length > 0 && (
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {films.map((v, i) => (
              <Reveal key={v.slug} delay={(i % 2) * 100} className={i === 0 ? "md:col-span-2" : ""}>
                <VideoEmbed video={v} sizes={i === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"} />
                <Meta v={v} />
              </Reveal>
            ))}
          </div>
        )}

        {reels.length > 0 && (
          <div className={films.length > 0 ? "mt-24" : ""}>
            {films.length > 0 && <h2 className="eyebrow mb-8">Reels</h2>}
            <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {reels.map((v, i) => (
                <Reveal key={v.slug} delay={(i % 3) * 100}>
                  <VideoEmbed video={v} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" caption={false} />
                  <Meta v={v} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <p className="mt-16 text-mute">
          See more of our latest reels on{" "}
          <TrackedLink href={site.social.instagram.url} event="click_instagram" eventProps={{ location: "video-page" }} className="link-underline text-ink">
            Instagram {site.social.instagram.handle}
          </TrackedLink>
          .
        </p>
      </section>

      <CTASection location="video-final" heading={<>Let&rsquo;s make a <em>reel.</em></>} primaryLabel="Check availability" href="/contact?type=Reels%20%2F%20Video" />
      <JsonLd data={[...videos.map(videoJsonLd), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Films", path: "/video" }])]} />
    </>
  );
}
