"use client";

import Link from "next/link";
import { useEffect } from "react";
import { TrackedLink } from "@/components/TrackedLink";
import { fullLocation, mailUrl, site, whatsappUrl } from "@/content/site";
import { cn } from "@/lib/cn";

interface Props {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
}

/** Full-screen mobile/tablet menu. Locks scroll, hides the page from assistive tech and closes on Escape. */
export function MobileMenu({ open, onClose, isActive }: Props) {
  useEffect(() => {
    if (!open) return;
    const regions = ["main", "site-footer"].map((id) => document.getElementById(id));
    regions.forEach((r) => r?.setAttribute("inert", ""));
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      regions.forEach((r) => r?.removeAttribute("inert"));
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="false"
      aria-label="Menu"
      hidden={!open}
      className={cn("on-dark fixed inset-0 z-40 overflow-y-auto bg-ink text-paper lg:hidden", open && "page-in")}
    >
      <div className="container-x flex min-h-full flex-col pb-10 pt-[calc(var(--header-h)+2rem)]">
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {site.nav.map((item, i) => (
              <li key={item.href} className="border-b border-white/10">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-baseline justify-between py-4 font-display text-[2.6rem] leading-none tracking-tight"
                >
                  <span className={cn(isActive(item.href) && "italic")}>{item.label}</span>
                  <span className="text-xs tracking-[0.2em] text-white/40">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10">
          <Link href={site.cta.primary.href} className="btn btn-light w-full">
            {site.cta.primary.label}
          </Link>
        </div>

        <div className="mt-auto space-y-3 pt-12 text-sm text-white/70">
          <p className="eyebrow">{fullLocation}</p>
          <p>
            <TrackedLink href={mailUrl} event="click_email" eventProps={{ location: "menu" }} className="link-underline [overflow-wrap:anywhere]">
              {site.contact.email}
            </TrackedLink>
          </p>
          <p className="flex gap-6">
            <TrackedLink href={site.social.instagram.url} event="click_instagram" eventProps={{ location: "menu" }} className="link-underline">
              Instagram
            </TrackedLink>
            <TrackedLink href={whatsappUrl} event="click_whatsapp" eventProps={{ location: "menu" }} className="link-underline">
              WhatsApp
            </TrackedLink>
          </p>
        </div>
      </div>
    </div>
  );
}
