import Script from "next/script";

/**
 * Loads exactly one analytics provider, chosen by environment variable:
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN → Plausible (privacy-friendly, ~1 KB, no cookie banner needed)
 *   NEXT_PUBLIC_GA_ID            → Google Analytics 4
 * Custom events are sent through lib/analytics.ts. Add other providers there.
 */
export function Analytics() {
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const ga = process.env.NEXT_PUBLIC_GA_ID;

  if (plausible) {
    return (
      <>
        <Script defer data-domain={plausible} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
        <Script id="plausible-queue" strategy="afterInteractive">
          {`window.plausible = window.plausible || function(){ (window.plausible.q = window.plausible.q || []).push(arguments) }`}
        </Script>
      </>
    );
  }

  if (ga) {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${ga}');`}
        </Script>
      </>
    );
  }

  return null;
}
