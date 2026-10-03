import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section aria-labelledby="kind-words" className="section bg-paper-deep">
      <div className="container-x">
        <SectionHeading eyebrow="Kind words" title={<span id="kind-words">Said by <em>clients.</em></span>} />
        <ul className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 110}>
              <figure className="flex h-full flex-col border-t border-ink pt-8">
                <blockquote className="font-display text-[1.55rem] leading-snug tracking-tight md:text-[1.7rem]">
                  <span aria-hidden>&ldquo;</span>
                  {t.quote}
                  <span aria-hidden>&rdquo;</span>
                </blockquote>
                <figcaption className="mt-8 text-sm">
                  <span className="block font-medium">{t.name}</span>
                  <span className="text-mute">{t.detail}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
