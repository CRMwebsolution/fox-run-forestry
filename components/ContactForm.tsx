"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/config/siteConfig";

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

export function ContactForm() {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState("");

  function validate() {
    const nextErrors: FormErrors = {};

    if (fields.name.trim().length < 2) {
      nextErrors.name = "Please enter your name.";
    }

    if (
      fields.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())
    ) {
      nextErrors.email = "Please enter a valid email address.";
    }

    const phoneDigits = fields.phone.replace(/\D/g, "");
    if (!fields.email.trim() && phoneDigits.length < 10) {
      nextErrors.phone = "Enter a phone number or an email address.";
    } else if (fields.phone.trim() && phoneDigits.length < 10) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (fields.message.trim().length < 10) {
      nextErrors.message = "Tell us a little about the property and the work needed.";
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("Please review the highlighted fields.");
      return;
    }

    const subject = encodeURIComponent(`Free quote request from ${fields.name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${fields.name.trim()}\nEmail: ${fields.email.trim() || "Not provided"}\nPhone: ${fields.phone.trim() || "Not provided"}\n\nProject details:\n${fields.message.trim()}`,
    );

    setStatus("Your email app is opening with the quote details ready to send.");
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
  }

  const inputClass =
    "mt-2 min-h-12 w-full rounded-xl border border-forest-900/20 bg-white px-4 py-3 text-base text-forest-950 outline-none transition placeholder:text-stone-400 focus:border-moss-700 focus:ring-2 focus:ring-moss-700/20";

  return (
    <form noValidate onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 text-forest-950 shadow-2xl sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-bold">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={fields.name}
            onChange={(event) => setFields({ ...fields, name: event.target.value })}
            className={inputClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && <p id="name-error" className="mt-2 text-sm font-semibold text-red-700">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-bold">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(252) 555-0123"
            value={fields.phone}
            onChange={(event) => setFields({ ...fields, phone: event.target.value })}
            className={inputClass}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && <p id="phone-error" className="mt-2 text-sm font-semibold text-red-700">{errors.phone}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="text-sm font-bold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={fields.email}
            onChange={(event) => setFields({ ...fields, email: event.target.value })}
            className={inputClass}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <p id="email-error" className="mt-2 text-sm font-semibold text-red-700">{errors.email}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-bold">
            Project details <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Tell us where the property is, what needs clearing, and the best time to reach you."
            value={fields.message}
            onChange={(event) => setFields({ ...fields, message: event.target.value })}
            className={inputClass}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && <p id="message-error" className="mt-2 text-sm font-semibold text-red-700">{errors.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-lime-300 px-6 py-3 text-sm font-bold text-forest-950 transition hover:bg-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 sm:w-auto"
      >
        Prepare Quote Request
      </button>
      <p className="mt-4 text-xs leading-5 text-stone-500">
        This form opens your email app so you can review and send your request
        directly to Fox Run Forestry.
      </p>
      <p className="mt-3 text-sm font-semibold text-moss-700" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
