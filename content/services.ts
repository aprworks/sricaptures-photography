import { photo } from "@/lib/photo";
import type { Service } from "@/types";

/**
 * Services offered. Only include what you genuinely sell.
 * `startingPrice` is optional — add e.g. startingPrice: "From ₹75,000" to show pricing.
 * `inquiryType` must match one of `site.shootTypes` so the contact form pre-selects it.
 */
export const services: Service[] = [
  {
    slug: "weddings",
    name: "Weddings",
    summary: "Complete, candid coverage of your wedding day.",
    description:
      "From the first rituals to the final send-off, we document your wedding with a calm, candid eye — the emotions, the traditions and the details your family will treasure for generations.",
    includes: ["Candid & traditional photography", "Full ceremony and reception coverage", "Professionally edited online gallery", "Wedding album design on request"],
    inquiryType: "Wedding",
    featured: true,
    images: [
      photo("/images/projects/gold-silk-and-jasmine/04.jpg", "The groom leaning down to the bride during wedding rituals"),
      photo("/images/projects/shiva-akhila/04.jpg", "A bride smiling as her jewellery is fastened"),
    ],
  },
  {
    slug: "pre-wedding",
    name: "Pre-Wedding Shoots",
    summary: "Cinematic couple shoots before the big day.",
    description:
      "A relaxed, fun shoot just for the two of you — at a heritage location, by the water or under the city lights. We help with locations, outfits and poses, so you can simply enjoy it.",
    includes: ["Location & outfit guidance", "Golden-hour and night lighting", "Edited high-resolution images", "Short reel on request"],
    inquiryType: "Pre-wedding shoot",
    featured: true,
    images: [
      photo("/images/projects/vinay-vaishnavi/05.jpg", "A couple twirling under violet-lit arches"),
      photo("/images/projects/praisy-sameer-ongole/02.jpg", "A couple embracing by the water during a pre-wedding shoot"),
    ],
  },
  {
    slug: "haldi-sangeet",
    name: "Haldi, Sangeet & Mehendi",
    summary: "The colour, music and chaos of the celebrations.",
    description:
      "Turmeric splashes, marigolds, dance floors and family jokes — the pre-wedding celebrations are some of the most joyful moments, and we capture every bit of the energy.",
    includes: ["Candid event coverage", "Family and group portraits", "Detail & décor shots", "Fast sneak-peek selection"],
    inquiryType: "Haldi / Sangeet / Mehendi",
    featured: true,
    images: [
      photo("/images/projects/haldi-in-yellow/01.jpg", "Turmeric water poured over a groom during his haldi"),
      photo("/images/projects/srimannarayana-meghana-sangeet/02.jpg", "A bride smiling in red light at her sangeet"),
    ],
  },
  {
    slug: "engagement",
    name: "Engagements",
    summary: "Portraits and moments from your engagement.",
    description: "Ring ceremonies and engagement parties, plus beautifully lit couple portraits to mark the start of your journey.",
    includes: ["Ceremony coverage", "Styled couple portraits", "Ring & detail shots", "Edited online gallery"],
    inquiryType: "Engagement",
    featured: true,
    images: [
      photo("/images/projects/manish-ravali-engagement/01.jpg", "An engaged couple touching foreheads in soft pink light"),
      photo("/images/projects/manish-ravali-engagement/03.jpg", "A couple close together beneath warm hanging lights"),
    ],
  },
  {
    slug: "portraits-reels",
    name: "Portraits & Reels",
    summary: "Portrait sessions and short-form video.",
    description: "Portrait shoots for models, creators and individuals — and short behind-the-scenes or highlight reels made for Instagram.",
    includes: ["Outdoor or indoor sessions", "Lighting & posing direction", "Retouched portraits", "Vertical reels for social media"],
    inquiryType: "Reels / Video",
    images: [
      photo("/images/video/portrait-bts-reel.jpg", "A model in a lilac outfit during a portrait shoot"),
      photo("/images/projects/srimannarayana-meghana-sangeet/03.jpg", "A woman in a blush lehenga posing against a lavender wall"),
    ],
  },
];
