# Photography Portfolio

A premium, image-first portfolio built to **win inquiries**: Next.js 16 (App Router), TypeScript, Tailwind CSS 4. No animation library, no CMS dependency — content lives in plain TypeScript files.

```bash
# Node 20.9+ required (22 recommended)
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## 1. Make it yours (in this order)

| What | Where |
| --- | --- |
| Name, tagline, location, service areas, email, phone, WhatsApp, Instagram, nav, CTAs, hero image, About text, form dropdown options, SEO keywords | [`content/site.ts`](content/site.ts) |
| Portfolio projects | [`content/projects.ts`](content/projects.ts) |
| Project categories | [`content/categories.ts`](content/categories.ts) |
| Services + optional prices | [`content/services.ts`](content/services.ts) |
| Videos (Vimeo / YouTube / self-hosted) | [`content/videos.ts`](content/videos.ts) |
| Testimonials | [`content/testimonials.ts`](content/testimonials.ts) |
| Colours | `:root` tokens at the top of [`app/globals.css`](app/globals.css) |
| Fonts | [`app/layout.tsx`](app/layout.tsx) (`next/font`) |
| Secrets / providers | copy `.env.example` → `.env.local` |

**Photos:** imported from Instagram (@sricaptures_photography) at max 1440px, so they are softer than originals. Replace them with full-resolution exports (2400px+, same filenames) for the sharpest result. Lines marked `TODO` in `content/` need your confirmation (locations, reply time, budget ranges, about photo).

## 2. Add a project (no UI code changes)

1. Put photos in `public/images/projects/my-shoot/` (01.jpg, 02.jpg …).
2. Copy an existing object in `content/projects.ts`, change `slug` (becomes `/work/<slug>`) and list photos with `photo("/images/projects/my-shoot/01.jpg", "alt text")`.
3. Run `npm run dev` — sizes and blur placeholders are generated automatically (`npm run images`, also run before every dev/build). The page, sitemap entry, metadata and structured data appear automatically.

The gallery builds its editorial rhythm from each photo's proportions (panoramas run full-bleed, others pair up/offset). Mix landscape and portrait frames.

## 3. Why this content approach (and when to add a CMS)

Typed TS files give instant type-checking (a wrong category fails the build), zero runtime cost, fully static pages and no vendor. It's ideal for a portfolio edited a few times a month by someone comfortable with a text editor.

**Add a CMS when** you want to edit from a phone/browser or hand editing to someone else. My recommendation then: **Sanity** (best image pipeline + hotspot cropping) or **Keystatic** (git-based, free, schema maps 1:1 onto the `Project` type). Only `lib/projects.ts` would change — UI components consume the same `Project` type.

## 4. Contact form & lead tracking

* Server action: [`app/contact/actions.ts`](app/contact/actions.ts). Validation shared client/server in [`lib/validation.ts`](lib/validation.ts).
* Delivery: set `CONTACT_PROVIDER` to `resend`, `formspree` or `log` ([`lib/contact/send.ts`](lib/contact/send.ts); add a provider in ~10 lines). In production an unset provider returns an error rather than silently losing leads.
* Spam: honeypot + time trap + per-IP rate limit, plus optional Cloudflare Turnstile via env keys. The in-memory rate limit is best-effort on serverless — use Upstash/KV if you get abuse.
* Analytics: set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` *or* `NEXT_PUBLIC_GA_ID`. Events (`generate_lead`, `click_email`, `click_phone`, `click_whatsapp`, `click_instagram`, `click_cta`, `view_project`, `play_video`, `filter_work`) go through [`lib/analytics.ts`](lib/analytics.ts) — add other providers in one place. Mark `generate_lead` as your conversion.

## 5. Performance & SEO notes

* All pages are statically generated. Server Components by default; client components only for navbar, gallery lightbox (lazy-loaded on first open), work filter, video facade, contact form, reveal.
* Every photo uses `next/image` through [`components/Photo.tsx`](components/Photo.tsx): responsive `sizes`, AVIF/WebP, blur-up, fixed aspect ratio (no layout shift). Only the hero (and project hero) are preloaded.
* Video never loads until clicked (poster facade); the optional hero film is desktop-only and skipped for reduced-motion / data-saver.
* Per-page title, description, canonical, Open Graph, Twitter, JSON-LD (Photographer/LocalBusiness, WebSite, BreadcrumbList, ImageGallery, VideoObject, Service), `sitemap.xml`, `robots.txt`, generated default OG image.
* Set `NEXT_PUBLIC_SITE_URL` in production — canonical URLs and the sitemap depend on it.
* Motion is CSS-only and disabled under `prefers-reduced-motion`.
