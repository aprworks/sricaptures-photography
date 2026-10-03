/**
 * Provider-agnostic analytics.
 *
 * Call `track("event_name", { ...props })` anywhere on the client. Events are
 * forwarded to whichever provider is loaded (Plausible, Google Analytics) and
 * mirrored to `window.dataLayer` so Google Tag Manager also works.
 * To add another provider (PostHog, Fathom, Umami…) add one line in `dispatch()`.
 *
 * Events used on this site:
 *   generate_lead        — contact form submitted successfully
 *   click_email          — mailto link clicked
 *   click_phone          — tel link clicked
 *   click_whatsapp       — WhatsApp link clicked
 *   click_instagram      — Instagram link clicked
 *   click_cta            — any CTA (props.location says where)
 *   view_project         — a portfolio project page opened
 *   play_video           — a video was started
 *   filter_work          — portfolio filter used
 */
export type AnalyticsEvent =
  | "generate_lead"
  | "click_email"
  | "click_phone"
  | "click_whatsapp"
  | "click_instagram"
  | "click_social"
  | "click_cta"
  | "view_project"
  | "play_video"
  | "filter_work";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Props }) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, props: Props = {}) {
  if (typeof window === "undefined") return;
  try {
    // Plausible
    window.plausible?.(event, { props });
    // Google Analytics 4
    window.gtag?.("event", event, props);
    // Google Tag Manager / any dataLayer consumer
    window.dataLayer?.push({ event, ...props });
    if (process.env.NODE_ENV !== "production") console.debug("[analytics]", event, props);
  } catch {
    /* analytics must never break the site */
  }
}
