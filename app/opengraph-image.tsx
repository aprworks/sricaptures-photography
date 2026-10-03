import { ImageResponse } from "next/og";
import { fullLocation, site } from "@/content/site";

// Default social-share card (used when a page doesn't set its own image).
// Replace by setting `site.seo.ogImage` or by dropping an opengraph-image.jpg in /app.
export const alt = `${site.name} — ${site.descriptor}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#12110f",
          color: "#f4f1ec",
          padding: 72,
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", opacity: 0.7, display: "flex" }}>
          {site.descriptor} — {fullLocation}
        </div>
        <div style={{ fontSize: 132, lineHeight: 1, display: "flex" }}>{site.name}</div>
        <div style={{ fontSize: 30, opacity: 0.75, maxWidth: 800, display: "flex" }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
