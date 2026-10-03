"use client";

import { useState } from "react";
import { Photo } from "@/components/Photo";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import type { VideoItem } from "@/types";

interface Props {
  video: VideoItem;
  sizes: string;
  /** Tailwind aspect class for the frame; default 16:9 (9:16 for portrait reels) */
  ratio?: string;
  className?: string;
  /** Show title/duration over the poster */
  caption?: boolean;
}

/**
 * Click-to-play "facade". Until the visitor presses play, only the poster
 * image loads — no YouTube/Vimeo iframe, no third-party scripts, no video bytes.
 * Never autoplays on page load, so it is safe on mobile data.
 */
export function VideoEmbed({ video, sizes, ratio, className, caption = true }: Props) {
  const frame = ratio ?? (video.orientation === "portrait" ? "aspect-[9/16]" : "aspect-video");
  const [playing, setPlaying] = useState(false);

  const play = () => {
    setPlaying(true);
    track("play_video", { slug: video.slug, provider: video.provider });
  };

  return (
    <div className={cn("relative overflow-hidden bg-black", frame, className)}>
      {playing ? (
        video.provider === "self" ? (
          <video
            className="absolute inset-0 h-full w-full bg-black"
            src={video.id}
            poster={video.poster.src}
            controls
            autoPlay
            playsInline
            preload="auto"
            aria-label={video.title}
          />
        ) : (
          <iframe
            className="absolute inset-0 h-full w-full"
            title={video.title}
            src={
              video.provider === "youtube"
                ? `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
                : `https://player.vimeo.com/video/${video.id}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`
            }
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )
      ) : (
        <button type="button" onClick={play} className="group absolute inset-0 block w-full text-left" aria-label={`Play video: ${video.title}`}>
          <Photo photo={video.poster} ratio="absolute inset-0" sizes={sizes} zoom className="!absolute !inset-0" />
          <span aria-hidden className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/35" />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 text-white backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 sm:h-20 sm:w-20"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
              <path d="M6 4l15 8-15 8z" />
            </svg>
          </span>
          {caption && (
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/70 to-transparent p-4 text-white sm:p-6">
              <span className="font-display text-xl leading-tight sm:text-2xl">{video.title}</span>
              {video.duration && <span className="text-xs tracking-[0.2em]">{video.duration}</span>}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
