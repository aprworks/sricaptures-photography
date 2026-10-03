"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fires `view_project` once when a project page opens. Renders nothing. */
export function TrackView({ slug, category }: { slug: string; category: string }) {
  useEffect(() => {
    track("view_project", { slug, category });
  }, [slug, category]);
  return null;
}
