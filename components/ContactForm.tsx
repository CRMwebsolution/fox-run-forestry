"use client";

import { FormEvent, useState } from "react";

type FormFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

const initialFields: FormFields = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

// PASTE YOUR N8N WEBHOOK URL HERE
const N8N_WEBHOOK_URL = "https://n8n.southernautomate.com/webhook-test/2e3de640-d6dc-4fca-a404-0b71b9403227";

export function ContactForm() {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const nextErrors: FormErrors = {};

    // Name validation
    if (fields.name.trim().length < 2) {
      nextErrors.name = "Please enter your name.";
    }

    // Email validation: ONLY validates format if something was typed in
    if (
      fields.email.trim().length > 0 &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())
    ) {
      nextErrors.email = "Please enter a valid email address.";
    }

    // Phone validation: required (10 digits minimum)
    const phoneDigits = fields.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      nextErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    // Message validation
    if (fields.message.trim().length < 10) {
      nextErrors.message = "Tell us a little about the property and the work needed.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("Please review the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Sending your request...");

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "FRF",
          name: fields.name.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
          message: fields.message.trim(),
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      setFields(initialFields);
      setStatus("Thank you! Your quote request has been sent successfully.");
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong while sending your message. Please try calling us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "mt-2 min-h-12 w-full rounded-xl border border-brand-olive/40 bg-brand-dark px-4 py-3 text-base text-brand-cream outline-none transition placeholder:text-brand-muted focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/25 disabled:opacity-50";

  return (
    <form noValidate onSubmit={handleSubmit} className="rounded-3xl border border-brand-olive/30 bg-brand-card p-6 text-brand-cream shadow-2xl sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="name" className="text-sm font-bold">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            disabled={isSubmitting}
            value={fields.name}
            onChange={(event) => setFields({ ...fields, name: event.target.value })}
            className={inputClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && <p id="name-error" className="mt-2 text-sm font-semibold text-brand-orange-hover">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="text-sm font-bold">
            Phone <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(252) 555-0123"
            disabled={isSubmitting}
            value={fields.phone}
            onChange={(event) => setFields({ ...fields, phone: event.target.value })}
            className={inputClass}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && <p id="phone-error" className="mt-2 text-sm font-semibold text-brand-orange-hover">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label htmlFor="email" className="text-sm font-bold">
            Email <span className="text-xs font-normal text-brand-muted">(Optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            disabled={isSubmitting}
            value={fields.email}
            onChange={(event) => setFields({ ...fields, email: event.target.value })}
            className={inputClass}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <p id="email-error" className="mt-2 text-sm font-semibold text-brand-orange-hover">{errors.email}</p>}
        </div>

        {/* Project details */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-bold">
            Project details <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Tell us where the property is, what needs clearing, and the best time to reach you."
            disabled={isSubmitting}
            value={fields.message}
            onChange={(event) => setFields({ ...fields, message: event.target.value })}
            className={inputClass}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && <p id="message-error" className="mt-2 text-sm font-semibold text-brand-orange-hover">{errors.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-orange px-6 py-3 text-sm font-bold text-brand-cream transition hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-card disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting ? "Sending..." : "Submit Quote Request"}
      </button>

      <p className="mt-3 text-sm font-semibold text-brand-orange" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
