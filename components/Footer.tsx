import Link from "next/link";
import { TrackedLink } from "@/components/TrackedLink";
import { fullLocation, mailUrl, site, telUrl, whatsappUrl } from "@/content/site";

export function Footer() {
  const { social, contact, location } = site;
  const socials = Object.values(social).filter((s): s is { handle: string; url: string } => Boolean(s));

  return (
    <footer id="site-footer" className="on-dark bg-ink text-paper">
      <div className="container-x pb-8 pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-5xl leading-none tracking-tight md:text-6xl">{site.wordmark}</p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{site.tagline}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <h2 className="eyebrow mb-5">Explore</h2>
            <ul className="space-y-3 text-[0.95rem]">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-5 md:pl-10">
            <h2 className="eyebrow mb-5">Say hello</h2>
            <ul className="space-y-3 text-[0.95rem]">
              <li>
                <TrackedLink href={mailUrl} event="click_email" eventProps={{ location: "footer" }} className="link-underline [overflow-wrap:anywhere]">
                  {contact.email}
                </TrackedLink>
              </li>
              <li>
                <TrackedLink href={telUrl} event="click_phone" eventProps={{ location: "footer" }} className="link-underline">
                  {contact.phone}
                </TrackedLink>
              </li>
              <li>
                <TrackedLink href={whatsappUrl} event="click_whatsapp" eventProps={{ location: "footer" }} className="link-underline">
                  WhatsApp
                </TrackedLink>
              </li>
              {socials.map((s) => (
                <li key={s.url}>
                  <TrackedLink
                    href={s.url}
                    event={s.url.includes("instagram") ? "click_instagram" : "click_social"}
                    eventProps={{ location: "footer" }}
                    className="link-underline"
                  >
                    {s.handle}
                  </TrackedLink>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-white/60">
              Based in {location.city}, {location.country}.
              <br />
              Available for commissions in {location.serviceAreas.slice(0, 4).join(", ")} &amp; beyond.
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All photographs and films are protected by copyright.
          </p>
          <p>{fullLocation}</p>
        </div>
      </div>
    </footer>
  );
}
