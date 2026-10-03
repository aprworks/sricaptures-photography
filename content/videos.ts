import { photo } from "@/lib/photo";
import type { VideoItem } from "@/types";

/**
 * Films & reels.
 *  provider "youtube" → id is the video ID  (youtube.com/watch?v=<id>)
 *  provider "vimeo"   → id is the numeric ID (vimeo.com/<id>)
 *  provider "self"    → id is a file in /public, e.g. "/videos/reel.mp4" (keep files small)
 *  orientation        → "portrait" for 9:16 reels, otherwise landscape 16:9
 *
 * Nothing heavy loads until a visitor presses play: only the poster image is shown.
 * Tip: upload full wedding films to YouTube and add them here with provider "youtube".
 */
export const videos: VideoItem[] = [
  {
    slug: "portrait-shoot-bts",
    title: "Behind the Lens — Portrait Shoot",
    description: "A behind-the-scenes reel from an outdoor portrait session in Hyderabad.",
    provider: "self",
    id: "/videos/portrait-bts-reel.mp4",
    orientation: "portrait",
    poster: photo("/images/video/portrait-bts-reel.jpg", "A model in a lilac outfit during an outdoor portrait shoot"),
    year: 2023,
    duration: "0:17",
    category: "Reel",
    featured: true,
  },
];
