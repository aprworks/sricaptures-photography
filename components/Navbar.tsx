"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileMenu } from "@/components/MobileMenu";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";

/**
 * Header. On the home page it floats transparently over the hero (white text),
 * then becomes a solid paper bar after scrolling. It tucks away when scrolling
 * down and returns when scrolling up, so photographs get the full screen.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const overHero = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (y > 480 && y > last + 6) setHidden(true);
        else if (y < last - 6 || y < 480) setHidden(false);
        last = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the menu on navigation (state-derived-from-props pattern, no effect needed)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,border-color] duration-500",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          overHero
            ? "border-b border-transparent text-white"
            : open
              ? "border-b border-white/10 bg-ink text-paper"
              : "border-b border-line bg-paper/90 text-ink backdrop-blur-md",
        )}
        style={{ height: "var(--header-h)" }}
      >
        <div className={cn("container-x flex h-full items-center justify-between gap-6", overHero && "on-dark")}>
          <Link href="/" className="group flex flex-col leading-none" aria-label={`${site.name} — home`}>
            <span className="font-display text-[1.6rem] tracking-tight sm:text-[1.75rem]">{site.wordmark}</span>
            <span className="mt-1 hidden text-[0.62rem] uppercase tracking-[0.3em] opacity-70 sm:block">{site.descriptor}</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "link-underline py-1 text-[0.78rem] uppercase tracking-[0.18em]",
                  isActive(item.href) ? "[background-size:100%_1px]" : "[background-size:0_1px]",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={site.cta.header.href}
              onClick={() => track("click_cta", { location: "header" })}
              className={cn("btn !min-h-0 !px-5 !py-2.5", overHero ? "btn-light" : "btn-solid")}
            >
              {site.cta.header.label}
            </Link>
          </nav>

          <div className="flex items-center gap-5 lg:hidden">
            <Link
              href={site.cta.header.href}
              onClick={() => track("click_cta", { location: "header-mobile" })}
              className="link-underline text-[0.75rem] uppercase tracking-[0.18em]"
            >
              {site.cta.header.label}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative -mr-2 flex h-11 w-11 items-center justify-center"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <span className={cn("absolute left-0 h-px w-6 bg-current transition-all duration-300", open ? "top-1.5 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 top-3 h-px w-6 bg-current transition-all duration-300", open ? "top-1.5 -rotate-45" : "top-3")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} isActive={isActive} />
    </>
  );
}
