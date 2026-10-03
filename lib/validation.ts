/** Shared by the browser (instant feedback) and the server action (the source of truth). */

export const INQUIRY_FIELDS = [
  "name",
  "email",
  "phone",
  "company",
  "shootType",
  "eventDate",
  "location",
  "budget",
  "message",
  "referral",
] as const;

export type InquiryField = (typeof INQUIRY_FIELDS)[number];
export type InquiryValues = Record<InquiryField, string>;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s().-]{6,24}$/;

export function readInquiry(get: (key: string) => unknown): InquiryValues {
  const out = {} as InquiryValues;
  for (const f of INQUIRY_FIELDS) {
    const v = get(f);
    out[f] = typeof v === "string" ? v.trim().slice(0, f === "message" ? 5000 : 300) : "";
  }
  return out;
}

export function validateInquiry(v: InquiryValues): InquiryErrors {
  const e: InquiryErrors = {};
  if (v.name.length < 2) e.name = "Please tell us your name.";
  if (!v.email) e.email = "We need an email address to reply to.";
  else if (!EMAIL_RE.test(v.email)) e.email = "That email address doesn't look quite right.";
  if (v.phone && !PHONE_RE.test(v.phone)) e.phone = "Please use digits, spaces and an optional + only.";
  if (!v.shootType) e.shootType = "Choose the closest match.";
  if (v.eventDate && Number.isNaN(Date.parse(v.eventDate))) e.eventDate = "That date isn't valid.";
  if (v.message.length < 20) e.message = "A few more details help us reply properly (at least a sentence or two).";
  return e;
}

export interface InquiryState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: InquiryErrors;
  values?: Partial<InquiryValues>;
}
