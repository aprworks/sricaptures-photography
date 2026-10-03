import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { PlaceholderNotice } from "@/components/PlaceholderNotice";
import { site } from "@/content/site";
import { localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

// Fonts are self-hosted by next/font (no layout shift, no third-party request at runtime).
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.descriptor} in ${site.location.city}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [...site.seo.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: `${site.name} — ${site.descriptor}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", ...(site.seo.twitterHandle && { creator: site.seo.twitterHandle }) },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-video-preview": -1 } },
};

export const viewport: Viewport = {
  themeColor: "#f4f1ec",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.language} className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* lets CSS hide not-yet-revealed content only when JS is running */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <PlaceholderNotice />
        <Analytics />
        <JsonLd data={[localBusinessJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
