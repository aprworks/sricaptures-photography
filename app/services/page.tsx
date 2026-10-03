import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { services } from "@/content/services";
import { fullLocation, site } from "@/content/site";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata: Metadata = buildMetadata({
  title: "Services & Pricing",
  description: `Photography and film services in ${fullLocation}: ${services.slice(0, 4).map((s) => s.name.toLowerCase()).join(", ")} and more. See what's included and get in touch.`,
  path: "/services",
  image: services[0]?.images[0],
});

export default function ServicesPage() {
  const servicesJsonLd = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    provider: { "@id": absoluteUrl("/#business") },
    areaServed: site.location.serviceAreas,
    url: absoluteUrl(`/services#${s.slug}`),
    ...(s.startingPrice && { offers: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", description: s.startingPrice } } }),
  }));

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={<>What we <em>capture.</em></>}
        intro="Every project is bespoke. Every celebration is different, so every quote is personal. Here’s what we offer — tell us about yours and we’ll put together the right package."
      />

      <div className="container-x">
        {services.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-title`} className="grid scroll-mt-24 gap-10 border-t border-line py-16 md:grid-cols-12 md:gap-14 md:py-24">
              <Reveal className={cn("md:col-span-5", flip && "md:order-2 md:col-start-8")}>
                <p className="eyebrow mb-5">0{i + 1}</p>
                <h2 id={`${s.slug}-title`} className="display-lg">{s.name}</h2>
                <p className="lede mt-6">{s.description}</p>
                <ul className="mt-8 space-y-2 text-[0.95rem]">
                  {s.includes.map((inc) => (
                    <li key={inc} className="flex gap-3">
                      <span aria-hidden className="mt-[0.65em] h-px w-4 shrink-0 bg-ink" />
                      {inc}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                  {s.startingPrice && <p className="display-sm">{s.startingPrice}</p>}
                  <Link href={`/contact?type=${encodeURIComponent(s.inquiryType)}`} className="btn btn-solid">
                    Check availability <span aria-hidden className="arrow">→</span>
                  </Link>
                </div>
              </Reveal>

              <div className={cn("grid grid-cols-2 items-start gap-4 md:col-span-6 md:gap-6", flip ? "md:col-start-1 md:row-start-1" : "md:col-start-7")}>
                {s.images.slice(0, 2).map((img, k) => (
                  <Reveal key={img.src} variant="image" delay={k * 120} className={k === 1 ? "mt-10 md:mt-20" : ""}>
                    <Photo photo={img} ratio="aspect-[3/4]" sizes="(min-width: 768px) 25vw, 50vw" />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="section bg-paper-deep">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <h2 className="display-md md:col-span-5">Not sure what you need?</h2>
          <p className="prose-calm md:col-span-6 md:col-start-7">
            Tell us what you&rsquo;re planning and we&rsquo;ll suggest the right package &mdash; no pressure, no obligation. Most enquiries get a reply {site.contact.replyTime}.
          </p>
        </div>
      </section>

      <CTASection location="services-final" />
      <JsonLd data={[...servicesJsonLd, breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])]} />
    </>
  );
}
