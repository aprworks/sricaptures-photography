import { photo } from "@/lib/photo";
import type { Project } from "@/types";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  PORTFOLIO PROJECTS
 *
 *  To add a project:
 *   1. Put the photos in  public/images/projects/<slug>/  (01.jpg, 02.jpg …)
 *   2. Copy one object below, change the `slug` (it becomes /work/<slug>)
 *      and list the photos with  photo("/images/projects/<slug>/01.jpg", "alt text").
 *   Width, height and blur placeholders are generated automatically.
 *
 *  Image order = reading order. The gallery varies the layout automatically
 *  based on each photo's proportions — mix portrait and landscape frames.
 *
 *  NOTE: photos were imported from Instagram (max 1440px). For the sharpest
 *  result, replace them with the original high-resolution exports (2400px+).
 *  Locations marked "TODO verify" were not stated in the Instagram caption.
 * ═══════════════════════════════════════════════════════════════════════════
 */
const p = (slug: string) => (n: string, alt: string) => photo(`/images/projects/${slug}/${n}.jpg`, alt);

const haldi = p("haldi-in-yellow");
const praisy = p("praisy-sameer-ongole");
const vv = p("vinay-vaishnavi");
const arches = p("arches-and-lace");
const sangeet = p("srimannarayana-meghana-sangeet");
const gold = p("gold-silk-and-jasmine");
const suman = p("suman-mounika");
const shiva = p("shiva-akhila");
const manish = p("manish-ravali-engagement");

export const projects: Project[] = [
  {
    slug: "haldi-in-yellow",
    title: "Haldi in Yellow",
    category: "haldi-sangeet",
    year: 2025,
    location: "Hyderabad", // TODO verify
    description:
      "Where laughter meets tradition and love paints everything yellow — a groom's haldi full of marigolds, turmeric splashes and friends who refused to stand still.",
    story: [
      "Haldi is the loudest, brightest, messiest morning of a wedding — and our favourite to photograph. We stayed in the middle of it all, catching the turmeric in mid-air and the friends who turned the ceremony into a celebration.",
    ],
    featured: true,
    coverImage: haldi("06", "Groom in sunglasses with arms crossed as turmeric water splashes around him"),
    heroImage: haldi("02", "The groom and his friends in matching yellow kurtas posing against a bright blue sky"),
    images: [
      haldi("01", "Turmeric water being poured over the groom's head during his haldi ceremony"),
      haldi("03", "Friends lifting the groom into the air in front of marigold decorations"),
      haldi("04", "The groom laughing as his friends smear haldi on each other on the rooftop"),
      haldi("05", "Family members applying turmeric to the groom beneath strings of marigolds"),
      haldi("06", "Groom in sunglasses with arms crossed as turmeric water splashes around him"),
    ],
  },
  {
    slug: "vinay-vaishnavi",
    title: "Vinay & Vaishnavi",
    category: "pre-wedding",
    year: 2025,
    location: "Hyderabad", // TODO verify
    client: "Vinay & Vaishnavi",
    description:
      "From a pre-wedding shoot among sandstone arches and glowing night-lit domes, to a haldi showered in rose petals — one couple's story across two seasons.",
    story: [
      "We began with a pre-wedding shoot at golden hour: a flowing red gown against soft pink stone. As the light faded the arches lit up in violet and amber, and the shoot became a dance.",
      "A year later we were back for the haldi — yellow silks, brass urlis and a shower of petals from the people who love them most.",
    ],
    featured: true,
    coverImage: vv("03", "Silhouette of Vinay and Vaishnavi kissing under a glowing illuminated arch at night"),
    heroImage: vv("01", "Vinay and Vaishnavi seated on the steps of a pink sandstone arcade, her red gown spread beside her"),
    images: [
      vv("02", "The couple in a quiet embrace on old stone steps beneath pink arches"),
      vv("03", "Silhouette of the couple kissing under a glowing illuminated arch at night"),
      vv("04", "Vaishnavi in a lilac gown dancing with Vinay beneath purple-lit arches"),
      vv("05", "Vinay twirling Vaishnavi, her gown flaring under violet light"),
      vv("06", "The couple dancing beneath a dramatic red-lit arch"),
      vv("07", "Vinay spinning Vaishnavi under a deep blue night sky framed by an arch"),
      vv("08", "Close portrait of Vaishnavi smiling as Vinay holds her, city lights glowing behind them"),
      vv("09", "Vaishnavi in a yellow half-saree laughing beside a brass urli at her haldi"),
      vv("10", "Rose petals showered over Vinay and Vaishnavi during their haldi"),
      vv("11", "Family members applying haldi to the couple under marigold garlands"),
    ],
  },
  {
    slug: "praisy-sameer-ongole",
    title: "Praisy & Sameer",
    category: "pre-wedding",
    year: 2025,
    location: "Ongole, Andhra Pradesh",
    client: "Praisy & Sameer",
    description: "A relaxed pre-wedding shoot along the coast and lakesides of Ongole — cozy corners, candid laughter and soft monsoon light.",
    coverImage: praisy("03", "Praisy and Sameer laughing together on a lakeside path with greenery behind them"),
    images: [
      praisy("01", "Praisy and Sameer standing together beneath tall casuarina trees in soft forest light"),
      praisy("02", "Sameer resting his head against Praisy's as she smiles in sunglasses by the water"),
      praisy("03", "The couple laughing together on a lakeside path"),
      praisy("04", "Praisy and Sameer framed by bare driftwood branches against a blue sky"),
    ],
  },
  {
    slug: "arches-and-lace",
    title: "Arches & Lace",
    category: "weddings",
    year: 2025,
    location: "Telangana", // TODO verify
    description:
      "A white-gown wedding portrait session among red-brick chapels and arched doorways, wrapped in the soft glow of pastel skies.",
    coverImage: arches("03", "Bride and groom at a church doorway framed by a bright red-brick arch"),
    images: [
      arches("01", "Bride and groom standing in front of a red-brick chapel with arched windows"),
      arches("02", "The bride holding her bouquet as the groom leans in a brick archway"),
      arches("03", "The couple at a church doorway framed by a red-brick arch"),
      arches("04", "Close embrace of the bride and groom against warm brick walls"),
    ],
  },
  {
    slug: "srimannarayana-meghana-sangeet",
    title: "Srimannarayana & Meghana",
    category: "haldi-sangeet",
    year: 2025,
    location: "Hyderabad", // TODO verify
    client: "Srimannarayana & Meghana",
    description: "Sangeet-night portraits sculpted with colour and shadow — deep reds, soft lavender and a couple completely at ease.",
    coverImage: sangeet("03", "Meghana in a blush lehenga posing against a lavender panelled wall"),
    images: [
      sangeet("01", "The groom in a mint sherwani smiling in dramatic red light"),
      sangeet("02", "Meghana in a pink lehenga smiling softly in a red-lit doorway"),
      sangeet("03", "Meghana posing against a lavender panelled wall"),
    ],
  },
  {
    slug: "gold-silk-and-jasmine",
    title: "Gold, Silk & Jasmine",
    category: "weddings",
    year: 2024,
    location: "Hyderabad", // TODO verify
    description:
      "A traditional wedding told in silk sarees, temple gold and jasmine garlands — from the quiet rituals on the mandap to a playful scooter ride after.",
    featured: true,
    coverImage: gold("03", "Bride and groom touching foreheads, wearing their wedding garlands"),
    images: [
      gold("02", "The bride in a cream and red silk saree holding a decorated kalasam before a golden backdrop"),
      gold("03", "Bride and groom touching foreheads, wearing their wedding garlands"),
      gold("04", "The groom leaning down to the bride during the wedding rituals"),
      gold("01", "The newlyweds posing on a scooter beneath pink bougainvillea"),
      gold("05", "The newlyweds standing together in a garden after the ceremony"),
    ],
  },
  {
    slug: "suman-mounika",
    title: "Suman & Mounika",
    category: "weddings",
    year: 2023,
    location: "Hyderabad", // TODO verify
    client: "Suman & Mounika",
    description: "A joyful wedding glowing with fairy lights, floral canopies and a couple who couldn't stop smiling.",
    coverImage: suman("02", "Suman and Mounika posing playfully in front of a wall of fairy lights"),
    heroImage: suman("05", "The newlyweds in garlands standing beneath a canopy of white flowers"),
    images: [
      suman("01", "Suman and Mounika seated on the mandap, smiling with flowers in the foreground"),
      suman("02", "The couple posing playfully in front of a wall of fairy lights"),
      suman("03", "Bride and groom reclining together on a decorated wedding stage"),
      suman("04", "Suman and Mounika greeting guests with folded hands on stage"),
      suman("05", "The newlyweds in garlands beneath a canopy of white flowers"),
    ],
  },
  {
    slug: "shiva-akhila",
    title: "Shiva & Akhila",
    category: "weddings",
    year: 2023,
    location: "Hyderabad", // TODO verify
    client: "Shiva & Akhila",
    description: "Gold-lit halls, a Royal Enfield and a bride glowing in silk — a wedding with equal parts tradition and swagger.",
    coverImage: shiva("04", "Akhila smiling as jewellery is fastened during the ceremony"),
    images: [
      shiva("01", "Shiva and Akhila posing on a Royal Enfield motorcycle in their wedding attire"),
      shiva("02", "The groom in a cream sherwani and turban in a decorated hall"),
      shiva("03", "The couple side by side in a gold-lit wedding hall"),
      shiva("04", "Akhila smiling as jewellery is fastened during the ceremony"),
    ],
  },
  {
    slug: "manish-ravali-engagement",
    title: "Manish & Ravali",
    category: "engagement",
    year: 2023,
    location: "Hyderabad", // TODO verify
    client: "Manish & Ravali",
    description: "Engagement portraits shaped with light — soft pinks, electric blues and warm glowing bokeh.",
    coverImage: manish("01", "Ravali and Manish touching foreheads in soft pink light"),
    images: [
      manish("01", "Ravali and Manish touching foreheads in soft pink light"),
      manish("02", "Ravali in a navy silk saree in a blue-lit lounge"),
      manish("03", "The couple close together beneath warm hanging lights"),
    ],
  },
];
