import "server-only";

/**
 * Layered, dependency-free spam defences:
 *  1. Honeypot field   — hidden input that humans never fill.
 *  2. Time trap        — forms submitted < 3s after render are bots.
 *  3. Rate limit       — per-IP, in-memory (best-effort; resets on cold start / per instance).
 *  4. Turnstile (opt.) — set NEXT_PUBLIC_TURNSTILE_SITE_KEY + TURNSTILE_SECRET_KEY for a real CAPTCHA.
 *     For high-traffic production use, back the rate limit with Upstash/Redis or Vercel KV.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 4;

export function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

export function looksLikeBot(honeypot: unknown, startedAt: unknown): boolean {
  if (typeof honeypot === "string" && honeypot.length > 0) return true;
  const started = Number(startedAt);
  if (!Number.isFinite(started) || started <= 0) return true;
  return Date.now() - started < 3000;
}

export async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not enabled
  if (typeof token !== "string" || !token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}
