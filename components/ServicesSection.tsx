import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { services } from "@/content/services";

/** Home page: a typographic list of services. On desktop a thumbnail appears on hover/focus. */
export function ServicesSection() {
  const list = services.filter((s) => s.featured);

  return (
    <section aria-labelledby="services-heading" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Services"
          title={
            <span id="services-heading">
              What we <em>photograph.</em>
            </span>
          }
          action={{ label: "Details & pricing", href: "/services" }}
        />

        <ul className="mt-14 border-t border-line md:mt-20">
          {list.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 60} className="border-b border-line">
              <Link
                href={`/services#${s.slug}`}
                className="group relative grid items-baseline gap-x-8 gap-y-2 py-7 transition-[padding] duration-500 hover:pl-3 md:grid-cols-12 md:py-10"
              >
                <span className="eyebrow md:col-span-1">0{i + 1}</span>
                <h3 className="display-md md:col-span-5">{s.name}</h3>
                <p className="text-mute md:col-span-4 md:pr-8">{s.summary}</p>
                <p className="flex items-center justify-between gap-6 text-sm md:col-span-2 md:justify-end">
                  {s.startingPrice && <span className="text-mute">{s.startingPrice}</span>}
                  <span aria-hidden className="text-xl transition-transform duration-500 group-hover:translate-x-1">→</span>
                </p>

                <span
                  aria-hidden
                  className="pointer-events-none absolute right-[22%] top-1/2 z-10 hidden w-36 -translate-y-1/2 opacity-0 transition-all duration-500 group-hover:-translate-y-[55%] group-hover:opacity-100 group-focus-visible:opacity-100 lg:block"
                >
                  <Photo photo={s.images[0]} ratio="aspect-[4/5]" sizes="150px" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
