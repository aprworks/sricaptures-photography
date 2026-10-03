"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
  /** Analytics event fired on click */
  event?: AnalyticsEvent;
  /** Extra analytics properties, e.g. { location: "hero" } */
  eventProps?: Record<string, string | number | boolean>;
}

/** Link that reports clicks to analytics. Internal hrefs use next/link; external open normally. */
export function TrackedLink({ href, event, eventProps, onClick, children, ...rest }: Props) {
  const handle: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (event) track(event, { href, ...eventProps });
    onClick?.(e);
  };
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} onClick={handle} {...rest}>
        {children}
      </Link>
    );
  }
  const external = /^https?:/.test(href);
  return (
    <a href={href} onClick={handle} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
    </a>
  );
}
