import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { TrackedLink } from "@/components/TrackedLink";
import { fullLocation, mailUrl, site, telUrl, whatsappUrl } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact & Booking",
  description: `Book ${site.name} for your wedding, pre-wedding shoot, haldi, sangeet or engagement in ${site.location.city} and beyond. Call or WhatsApp ${site.contact.phone}.`,
  path: "/contact",
  image: site.hero.images[0],
});

export default function ContactPage() {
  const { contact, social, location } = site;
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Tell us about <em>your celebration.</em></>}
        intro={`The more you share, the better we can help. We reply to every enquiry personally ${contact.replyTime}.`}
      />

      <div className="container-x grid gap-16 pb-28 lg:grid-cols-12 lg:gap-20 md:pb-40">
        <section aria-label="Inquiry form" className="lg:col-span-8">
          <ContactForm />
        </section>

        <aside aria-label="Other ways to reach us" className="lg:col-span-4">
          <div className="space-y-10 border-t border-ink pt-8 lg:sticky lg:top-28">
            {contact.availability && (
              <div>
                <p className="eyebrow mb-2">Availability</p>
                <p className="flex items-center gap-3">
                  <span aria-hidden className="h-2 w-2 rounded-full bg-[#4c9a50]" />
                  {contact.availability}
                </p>
              </div>
            )}
            <div>
              <p className="eyebrow mb-3">Prefer to call or message?</p>
              <ul className="space-y-2">
                <li>
                  <TrackedLink href={mailUrl} event="click_email" eventProps={{ location: "contact" }} className="link-underline [overflow-wrap:anywhere]">{contact.email}</TrackedLink>
                </li>
                <li>
                  <TrackedLink href={telUrl} event="click_phone" eventProps={{ location: "contact" }} className="link-underline">{contact.phone}</TrackedLink>
                </li>
                <li>
                  <TrackedLink href={whatsappUrl} event="click_whatsapp" eventProps={{ location: "contact" }} className="link-underline">Message on WhatsApp</TrackedLink>
                </li>
                <li>
                  <TrackedLink href={social.instagram.url} event="click_instagram" eventProps={{ location: "contact" }} className="link-underline">Instagram {social.instagram.handle}</TrackedLink>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-3">Studio</p>
              <p>{fullLocation}</p>
              <p className="mt-1 text-sm text-mute">Also shooting in {location.serviceAreas.slice(0, 5).join(", ")}.</p>
            </div>
            <div>
              <p className="eyebrow mb-3">What happens next</p>
              <ol className="list-decimal space-y-2 pl-5 text-[0.95rem] text-ink-soft marker:text-mute">
                <li>We read your message and check our availability.</li>
                <li>We reply {contact.replyTime} with ideas and a quote.</li>
                <li>We get on a call to plan the details.</li>
              </ol>
            </div>
          </div>
        </aside>
      </div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </>
  );
}
