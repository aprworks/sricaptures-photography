#!/usr/bin/env node
/**
 * Scans /public/images and writes content/image-meta.json:
 *   { "/images/projects/x/01.jpg": { "w": 1440, "h": 1800, "blur": "data:image/jpeg;base64,…" } }
 *
 * content files then only need:  photo("/images/projects/x/01.jpg", "alt text")
 * Runs automatically before `npm run dev` and `npm run build` (see package.json),
 * or manually with `npm run images`. Unchanged files are skipped (cached by size + mtime).
 */
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public");
const OUT = path.resolve("content/image-meta.json");
const EXT = /\.(jpe?g|png|webp|avif)$/i;

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (EXT.test(e.name)) out.push(full);
  }
  return out;
}

let previous = {};
try {
  previous = JSON.parse(await readFile(OUT, "utf8"));
} catch {}

const files = (await walk(path.join(ROOT, "images"))).sort();
const meta = {};
let fresh = 0;
for (const full of files) {
  const key = "/" + path.relative(ROOT, full).split(path.sep).join("/");
  const s = await stat(full);
  const sig = `${s.size}-${Math.round(s.mtimeMs)}`;
  if (previous[key]?.sig === sig) {
    meta[key] = previous[key];
    continue;
  }
  const { width, height } = await sharp(full).metadata();
  const blur = await sharp(full).resize(12).blur(1.2).jpeg({ quality: 45 }).toBuffer();
  meta[key] = { w: width, h: height, blur: `data:image/jpeg;base64,${blur.toString("base64")}`, sig };
  fresh++;
}
await writeFile(OUT, JSON.stringify(meta, null, 1) + "\n");
console.log(`image-meta: ${files.length} images (${fresh} updated) → content/image-meta.json`);
