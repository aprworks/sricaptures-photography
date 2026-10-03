import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { TrackedLink } from "@/components/TrackedLink";
import { blurFor } from "@/lib/images";
import { mailUrl, site, whatsappUrl } from "@/content/site";
import type { Photo } from "@/types";

interface Props {
  heading?: React.ReactNode;
  text?: string;
  /** Optional background photograph (darkened) */
  image?: Photo;
  /** Analytics tag: where this CTA lives */
  location: string;
  primaryLabel?: string;
  href?: string;
}

/** Closing call-to-action. Placed after the work has earned it. */
export function CTASection({
  heading = (
    <>
      Let&rsquo;s work <em>together.</em>
    </>
  ),
  text = "Tell us about your wedding, celebration or shoot. We read every message personally and reply " + site.contact.replyTime + ".",
  image,
  location,
  primaryLabel = "Tell us about your celebration",
  href = "/contact",
}: Props) {
  return (
    <section aria-labelledby={`cta-${location}`} className="on-dark relative isolate overflow-hidden bg-ink text-paper">
      {image && (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={blurFor(image)}
            className="-z-20 object-cover opacity-40"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-ink/50" />
        </>
      )}
      <div className="container-x section">
        <Reveal>
          <p className="eyebrow mb-6">{site.contact.availability || "Get in touch"}</p>
          <h2 id={`cta-${location}`} className="display-xl max-w-[14ch]">
            {heading}
          </h2>
        </Reveal>
        <Reveal delay={120} className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12">
          <p className="lede md:col-span-5">{text}</p>
          <div className="flex flex-col gap-3 sm:flex-row md:col-span-7 md:items-start md:justify-end">
            <TrackedLink href={href} event="click_cta" eventProps={{ location }} className="btn btn-light">
              {primaryLabel} <span aria-hidden className="arrow">→</span>
            </TrackedLink>
            <TrackedLink href={mailUrl} event="click_email" eventProps={{ location }} className="btn btn-outline-light">
              Email directly
            </TrackedLink>
            <TrackedLink href={whatsappUrl} event="click_whatsapp" eventProps={{ location }} className="btn btn-outline-light">
              WhatsApp
            </TrackedLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
