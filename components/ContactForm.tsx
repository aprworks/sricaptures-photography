"use client";

import Link from "next/link";
import Script from "next/script";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitInquiry } from "@/app/contact/actions";
import { fullLocation, site } from "@/content/site";
import { track } from "@/lib/analytics";
import { INQUIRY_FIELDS, readInquiry, validateInquiry, type InquiryErrors, type InquiryField, type InquiryState } from "@/lib/validation";

const initial: InquiryState = { status: "idle" };
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

interface FieldProps {
  name: InquiryField;
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby": string | undefined; "aria-required": boolean; name: string; onInput: () => void }) => React.ReactNode;
  onClear: (n: InquiryField) => void;
}

function Field({ name, label, hint, required, error, className, children, onClear }: FieldProps) {
  const id = `f-${name}`;
  const describedBy = [error && `${id}-err`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow block">
        {label}
        {required ? <span className="text-accent"> *</span> : <span className="normal-case tracking-normal opacity-70"> (optional)</span>}
      </label>
      {children({ id, name, "aria-invalid": Boolean(error), "aria-describedby": describedBy, "aria-required": Boolean(required), onInput: () => onClear(name) })}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-mute">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-[#a1260f]">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initial);
  // Field errors found in the browser. Tied to the server `state` they were created against,
  // so a fresh server response automatically supersedes them.
  const [local, setLocal] = useState<{ base: InquiryState; errors: InquiryErrors } | null>(null);
  const startedRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  const errors: InquiryErrors = local && local.base === state ? local.errors : (state.errors ?? {});
  const v = state.values ?? {};

  // time-trap start + pre-select the shoot type from ?type=…
  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
    const wanted = new URLSearchParams(window.location.search).get("type");
    if (wanted && typeRef.current && site.shootTypes.includes(wanted as never)) typeRef.current.value = wanted;
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      track("generate_lead", { form: "contact" });
      successRef.current?.focus();
    } else if (state.status === "error") {
      alertRef.current?.focus();
      (window as unknown as { turnstile?: { reset: () => void } }).turnstile?.reset();
    }
  }, [state]);

  const clear = (n: InquiryField) => {
    if (errors[n]) setLocal({ base: state, errors: { ...errors, [n]: undefined } });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const fd = new FormData(e.currentTarget);
    const found = validateInquiry(readInquiry((k) => fd.get(k)));
    if (Object.keys(found).length > 0) {
      e.preventDefault();
      setLocal({ base: state, errors: found });
      const first = INQUIRY_FIELDS.find((f) => found[f]);
      requestAnimationFrame(() => document.getElementById(`f-${first}`)?.focus());
    } else {
      setLocal(null);
    }
  };

  if (state.status === "success") {
    return (
      <div className="border-t border-ink pt-10" role="status">
        <h2 ref={successRef} tabIndex={-1} className="display-lg outline-none">
          Thank you. <em>Message received.</em>
        </h2>
        <p className="lede mt-6">
          We&rsquo;ll read your message personally and reply {site.contact.replyTime}. In the meantime, feel free to browse recent work or follow along on Instagram.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/work" className="btn btn-solid">View recent work</Link>
          <a href={site.social.instagram.url} className="btn btn-outline" target="_blank" rel="noopener noreferrer">{site.social.instagram.handle}</a>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate aria-describedby={state.status === "error" ? "form-alert" : undefined}>
      {state.status === "error" && state.message && (
        <div ref={alertRef} id="form-alert" tabIndex={-1} role="alert" className="mb-10 border border-[#a1260f] bg-[#a1260f]/5 p-5 text-[0.95rem] outline-none">
          {state.message}
        </div>
      )}

      <div className="grid gap-x-10 gap-y-9 md:grid-cols-2">
        <Field name="name" label="Your name" required error={errors.name} onClear={clear}>
          {(p) => <input {...p} type="text" autoComplete="name" defaultValue={v.name} className="field" placeholder="Full name" />}
        </Field>
        <Field name="email" label="Email" required error={errors.email} onClear={clear}>
          {(p) => <input {...p} type="email" autoComplete="email" inputMode="email" defaultValue={v.email} className="field" placeholder="you@example.com" />}
        </Field>
        <Field name="phone" label="Phone / WhatsApp" error={errors.phone} onClear={clear}>
          {(p) => <input {...p} type="tel" autoComplete="tel" inputMode="tel" defaultValue={v.phone} className="field" placeholder="+" />}
        </Field>
        <Field name="company" label="Company / Brand" error={errors.company} onClear={clear}>
          {(p) => <input {...p} type="text" autoComplete="organization" defaultValue={v.company} className="field" />}
        </Field>
        <Field name="shootType" label="Type of shoot" required error={errors.shootType} onClear={clear}>
          {(p) => (
            <select {...p} ref={typeRef} defaultValue={v.shootType ?? ""} className="field">
              <option value="" disabled>Select…</option>
              {site.shootTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
          )}
        </Field>
        <Field name="eventDate" label="Event date" hint="Wedding or shoot date, or roughly when." error={errors.eventDate} onClear={clear}>
          {(p) => <input {...p} type="date" defaultValue={v.eventDate} className="field" />}
        </Field>
        <Field name="location" label="Location" hint={`Venue or city. We’re based in ${fullLocation} and happy to travel.`} error={errors.location} onClear={clear}>
          {(p) => <input {...p} type="text" autoComplete="off" defaultValue={v.location} className="field" placeholder="City, venue…" />}
        </Field>
        <Field name="budget" label="Budget range" error={errors.budget} onClear={clear}>
          {(p) => (
            <select {...p} defaultValue={v.budget ?? ""} className="field">
              <option value="">Select…</option>
              {site.budgetRanges.map((t) => <option key={t}>{t}</option>)}
            </select>
          )}
        </Field>
        <Field name="message" label="Tell us about your celebration" required className="md:col-span-2" error={errors.message} onClear={clear}
          hint="Events you need covered, dates, venue, number of guests, the style you love — whatever you have so far.">
          {(p) => <textarea {...p} rows={6} defaultValue={v.message} className="field" />}
        </Field>
        <Field name="referral" label="How did you hear about us?" error={errors.referral} onClear={clear}>
          {(p) => (
            <select {...p} defaultValue={v.referral ?? ""} className="field">
              <option value="">Select…</option>
              {site.referralSources.map((t) => <option key={t}>{t}</option>)}
            </select>
          )}
        </Field>
      </div>

      {/* Spam traps: invisible to people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input ref={startedRef} type="hidden" name="startedAt" defaultValue="" />

      {TURNSTILE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile mt-8" data-sitekey={TURNSTILE_KEY} data-theme="light" />
        </>
      )}

      <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} aria-disabled={pending} className="btn btn-solid w-full sm:w-auto">
          {pending ? "Sending…" : "Send enquiry"} {!pending && <span aria-hidden className="arrow">→</span>}
        </button>
        <p className="text-sm text-mute" aria-live="polite">
          {pending ? "Sending your message…" : `We reply ${site.contact.replyTime}. Your details are never shared.`}
        </p>
      </div>
    </form>
  );
}
