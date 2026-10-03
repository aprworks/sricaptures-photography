"use server";

import { headers } from "next/headers";
import { sendInquiry } from "@/lib/contact/send";
import { looksLikeBot, rateLimited, verifyTurnstile } from "@/lib/contact/spam";
import { readInquiry, validateInquiry, type InquiryState } from "@/lib/validation";
import { site } from "@/content/site";

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const values = readInquiry((k) => formData.get(k));

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();

  // Bots get a fake success so they don't retry — nothing is sent.
  if (looksLikeBot(formData.get("website"), formData.get("startedAt"))) return { status: "success" };

  if (rateLimited(ip)) {
    return {
      status: "error",
      values,
      message: `You've sent a few messages in a short time. Please wait a few minutes, or email ${site.contact.email} directly.`,
    };
  }

  const errors = validateInquiry(values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", values, errors, message: "Please check the highlighted fields." };
  }

  if (!(await verifyTurnstile(formData.get("cf-turnstile-response"), ip))) {
    return { status: "error", values, message: "Spam check failed. Please try again." };
  }

  const result = await sendInquiry(values);
  if (!result.ok) {
    console.error("[contact] delivery failed:", result.error);
    return {
      status: "error",
      values,
      message: `Something went wrong sending your message. Please email ${site.contact.email} directly — I'd love to hear from you.`,
    };
  }

  return { status: "success" };
}
