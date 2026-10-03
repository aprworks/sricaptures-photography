import "server-only";
import type { InquiryValues } from "@/lib/validation";
import { site } from "@/content/site";

/**
 * Delivery layer for contact-form inquiries.
 *
 * Choose a provider with CONTACT_PROVIDER in .env.local:
 *   resend    → emails you via Resend      (RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL)
 *   formspree → forwards to Formspree      (FORMSPREE_ENDPOINT)
 *   log       → prints to the server console (development only)
 *
 * To add another provider (Postmark, SendGrid, Airtable, a CRM webhook…) write one
 * function with the `Sender` signature and register it in `senders`.
 * No credentials live in the code — everything comes from environment variables.
 */
export type SendResult = { ok: true } | { ok: false; error: string };
type Sender = (values: InquiryValues) => Promise<SendResult>;

const LABELS: Record<keyof InquiryValues, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  company: "Company / Brand",
  shootType: "Type of shoot",
  eventDate: "Event date",
  location: "Location",
  budget: "Budget",
  referral: "Heard about you via",
  message: "Message",
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function toText(v: InquiryValues) {
  return (Object.keys(LABELS) as (keyof InquiryValues)[])
    .filter((k) => v[k])
    .map((k) => `${LABELS[k]}: ${v[k]}`)
    .join("\n");
}

function toHtml(v: InquiryValues) {
  const rows = (Object.keys(LABELS) as (keyof InquiryValues)[])
    .filter((k) => v[k])
    .map(
      (k) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#777;vertical-align:top">${LABELS[k]}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v[k])}</td></tr>`,
    )
    .join("");
  return `<table style="font-family:system-ui,sans-serif;font-size:15px">${rows}</table>`;
}

const resend: Sender = async (v) => {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !from) return { ok: false, error: "Resend is not configured (RESEND_API_KEY / CONTACT_FROM_EMAIL)." };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: v.email,
      subject: `New inquiry — ${v.shootType} — ${v.name}`,
      text: toText(v),
      html: toHtml(v),
    }),
  });
  if (!res.ok) return { ok: false, error: `Resend responded ${res.status}` };
  return { ok: true };
};

const formspree: Sender = async (v) => {
  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) return { ok: false, error: "FORMSPREE_ENDPOINT is not set." };
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...v, _replyto: v.email, _subject: `New inquiry — ${v.shootType} — ${v.name}` }),
  });
  if (!res.ok) return { ok: false, error: `Formspree responded ${res.status}` };
  return { ok: true };
};

const log: Sender = async (v) => {
  if (process.env.NODE_ENV === "production")
    return { ok: false, error: "No CONTACT_PROVIDER configured — inquiry was NOT delivered." };
  console.info("\n──── New inquiry (CONTACT_PROVIDER=log) ────\n" + toText(v) + "\n────────────────────────────────────────────\n");
  return { ok: true };
};

const senders: Record<string, Sender> = { resend, formspree, log };

export async function sendInquiry(values: InquiryValues): Promise<SendResult> {
  const sender = senders[process.env.CONTACT_PROVIDER ?? "log"];
  if (!sender) return { ok: false, error: `Unknown CONTACT_PROVIDER "${process.env.CONTACT_PROVIDER}"` };
  try {
    return await sender(values);
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown delivery error" };
  }
}
