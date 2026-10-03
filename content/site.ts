import { photo } from "@/lib/photo";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  SITE CONFIG — the single source of truth for everything personal.
 *  Edit this file first. Nothing below is hardcoded anywhere else.
 *  Lines marked TODO were not available from Instagram — please confirm.
 * ═══════════════════════════════════════════════════════════════════════════
 */
export const site = {
  /** Set true to show a "placeholder content" reminder tag in the corner. */
  placeholderMode: false,

  name: "Sricaptures Photography",
  /** Short wordmark shown in the header */
  wordmark: "Sricaptures",
  descriptor: "Wedding Photography",
  tagline: "Those priceless moments of yours can't be explained with words — we tell them through pictures, as they unfold.",
  /** Default meta description (≈150 chars) */
  description:
    "Sricaptures Photography is a Hyderabad-based wedding and pre-wedding photographer capturing candid, colourful stories across Telangana and Andhra Pradesh.",
  /** One-sentence positioning for the hero */
  positioning:
    "Candid, colourful wedding and pre-wedding photography — the laughter, the rituals and the quiet in-between moments, captured as they unfold.",

  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_IN",
  language: "en",

  /** Used for Local SEO + structured data. Keep it truthful. */
  location: {
    city: "Hyderabad",
    region: "Telangana",
    country: "India",
    countryCode: "IN",
    /** Places you actually shoot. Shown on About/Contact + structured data. */
    serviceAreas: ["Hyderabad", "Secunderabad", "Telangana", "Andhra Pradesh", "Ongole", "Destination weddings"], // TODO confirm
    geo: { lat: 17.385, lng: 78.4867 },
  },

  contact: {
    email: "sricapturesphotography111@gmail.com",
    phone: "+91 90106 78448",
    /** Digits only, international format, no "+" */
    whatsapp: "919010678448",
    whatsappMessage: "Hi Sricaptures, I'd like to enquire about a shoot.",
    /** How quickly you reply — shown near the form. TODO confirm */
    replyTime: "within 24 hours",
    /** Shown on contact page + hero; set to "" to hide. TODO confirm */
    availability: "Now booking for the upcoming wedding season",
  },

  social: {
    instagram: { handle: "@sricaptures_photography", url: "https://www.instagram.com/sricaptures_photography/" },
    youtube: undefined as undefined | { handle: string; url: string },
    facebook: undefined as undefined | { handle: string; url: string },
  },

  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Films", href: "/video" },
    { label: "Contact", href: "/contact" },
  ],

  cta: {
    /** Hero primary + final CTA */
    primary: { label: "Check Availability", href: "/contact" },
    secondary: { label: "View Work", href: "/work" },
    /** Header button */
    header: { label: "Enquire", href: "/contact" },
  },

  hero: {
    /**
     * 1–3 photos. Desktop shows them side by side; phones show only the first.
     * Portrait (4:5) frames work best.
     */
    images: [
      photo("/images/projects/vinay-vaishnavi/03.jpg", "A couple kissing beneath a glowing illuminated arch at night"),
      photo("/images/projects/haldi-in-yellow/06.jpg", "A groom in sunglasses as turmeric water splashes around him at his haldi"),
      photo("/images/projects/gold-silk-and-jasmine/03.jpg", "Bride and groom touching foreheads in their wedding garlands"),
    ],
    /**
     * Optional looping hero film (desktop only; never loaded on mobile / reduced-motion / data-saver).
     * Keep it < 6 MB, muted, ~8–12s. Leave undefined to use the photos only.
     */
    video: undefined as undefined | { src: string },
    eyebrow: "Wedding & pre-wedding photography — Hyderabad",
  },

  about: {
    // TODO: replace with a photo of you / your team (portrait 4:5 works best)
    portrait: photo("/images/projects/gold-silk-and-jasmine/02.jpg", "A bride in a silk saree holding a decorated kalasam, photographed by Sricaptures"),
    intro:
      "We're Sricaptures Photography — a wedding and pre-wedding photography studio based in Hyderabad. Those priceless moments of yours can't be explained with words, so we tell them through pictures, as they unfold.",
    philosophy: [
      {
        title: "Candid first",
        text: "The best moments aren't posed. We stay close and unobtrusive, catching the laughter, the tears and the glances in between.",
      },
      {
        title: "Tradition, honoured",
        text: "From haldi and sangeet to the rituals on the mandap, we know the moments that matter and make sure none of them are missed.",
      },
      {
        title: "Light, crafted",
        text: "Golden hour, glowing arches, coloured night light — we shape every frame so your photographs feel cinematic and timeless.",
      },
    ],
    /** Optional numbers, e.g. { value: "150+", label: "Weddings" }. Leave empty to hide. TODO add yours */
    experience: [] as { value: string; label: string }[],
    clientTypes: [
      "Couples planning their wedding in Hyderabad & beyond",
      "Families celebrating haldi, sangeet & engagements",
      "Couples looking for a cinematic pre-wedding shoot",
      "Models & creators who need portraits and reels",
    ],
    bio: [
      "Every wedding is a story of two families coming together — the turmeric-stained laughter of the haldi, the music of the sangeet, the hush before the garlands are exchanged. Our job is to tell that story honestly and beautifully.",
      "We photograph weddings, pre-wedding shoots and celebrations across Telangana and Andhra Pradesh, working with professional Canon cameras and lighting to create images that feel natural by day and cinematic by night.",
      "Whether it's an intimate engagement or a grand three-day wedding, we'd love to hear your story.",
    ],
  },

  /** Options in the contact form dropdown. The text is what you'll receive by email. */
  shootTypes: [
    "Wedding",
    "Pre-wedding shoot",
    "Engagement",
    "Haldi / Sangeet / Mehendi",
    "Portrait / Model shoot",
    "Reels / Video",
    "Something else",
  ],
  // TODO adjust to your packages
  budgetRanges: ["Under ₹50,000", "₹50,000 – ₹1,00,000", "₹1,00,000 – ₹2,00,000", "₹2,00,000 – ₹4,00,000", "₹4,00,000+", "Not sure yet"],
  referralSources: ["Instagram", "Google", "Friend or family", "Past client", "Wedding planner / vendor", "Other"],

  seo: {
    /** Fallback social share image (absolute URL, 1200×630). Generated automatically if undefined. */
    ogImage: undefined as undefined | string,
    twitterHandle: undefined as undefined | string,
    keywords: [
      "wedding photographer in Hyderabad",
      "pre-wedding shoot Hyderabad",
      "candid wedding photography",
      "haldi and sangeet photography",
      "Telugu wedding photographer",
    ],
  },
} as const;

export const fullLocation = `${site.location.city}, ${site.location.country}`;
export const whatsappUrl = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}`;
export const telUrl = `tel:${site.contact.phone.replace(/[^+\d]/g, "")}`;
export const mailUrl = `mailto:${site.contact.email}`;
