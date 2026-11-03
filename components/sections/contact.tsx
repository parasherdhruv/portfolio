"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Download,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Section } from "@/components/ui/section";
import { Reveal, SplitWords } from "@/components/motion/reveal";
import { GitHubIcon, LinkedInIcon } from "@/components/layout/navbar";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  message: string;
  company: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.message.trim().length < 20) {
    errors.message = "Please add a little more detail (at least 20 characters).";
  }
  return errors;
}

export function Contact() {
  const reduce = useReducedMotion();
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    company: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  const isValid =
    Object.keys(validate(values)).length === 0 && values.message.length >= 20;

  function update<K extends keyof FormState>(key: K, value: string) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) {
      setErrors(validate(next));
    }
  }

  function handleBlur(key: keyof FormState) {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate(values));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`field-${firstKey}`)?.focus();
      return;
    }

    const subject = encodeURIComponent(
      `Portfolio enquiry${values.company ? ` — ${values.company}` : ""}`,
    );
    const body = encodeURIComponent(
      `${values.message}\n\n—\n${values.name}\n${values.email}${values.company ? `\n${values.company}` : ""}`,
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setStatus("ready");
  }

  const fields = [
    {
      key: "name" as const,
      label: "Name",
      placeholder: "Your name",
      type: "text",
      autoComplete: "name",
      span: "sm:col-span-1",
    },
    {
      key: "email" as const,
      label: "Email",
      placeholder: "you@company.com",
      type: "email",
      autoComplete: "email",
      span: "sm:col-span-1",
    },
    {
      key: "company" as const,
      label: "Company",
      placeholder: "Optional",
      type: "text",
      autoComplete: "organization",
      span: "sm:col-span-2",
      optional: true,
    },
  ];

  return (
    <Section id="contact" className="overflow-hidden">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-3">
              <Reveal>
                <span className="section-label">06</span>
              </Reveal>
              <span className="h-px w-8 bg-line" aria-hidden="true" />
              <Reveal delay={0.05}>
                <span className="section-label text-muted">Contact</span>
              </Reveal>
            </div>

            <h2 className="mt-8 text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.0] tracking-[-0.05em] text-mist">
              <SplitWords inView text="Have an interesting" />
              <br />
              <span className="serif-accent text-gradient">
                <SplitWords inView masked={false} text="project in mind?" delay={0.08} />
              </span>
            </h2>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-muted">
                I&apos;m open to full-time roles, contract work, and ambitious
                product collaborations. Tell me what you&apos;re building — I
                usually reply within a couple of days.
              </p>
            </Reveal>

            <Reveal delay={0.18} className="mt-9">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group inline-flex items-center gap-3"
              >
                <span className="grid size-11 place-items-center rounded-full border border-white/[0.09] bg-white/[0.03] transition-colors duration-300 group-hover:border-violet/40">
                  <Mail className="size-4 text-violet" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-faint">
                    Email
                  </span>
                  <span className="mt-1 block text-[0.9375rem] text-mist transition-colors group-hover:text-violet">
                    {siteConfig.email}
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full border border-white/[0.09] bg-white/[0.03]">
                  <MapPin className="size-4 text-muted" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-faint">
                    Location
                  </span>
                  <span className="mt-1 block text-[0.9375rem] text-mist">
                    {siteConfig.location}
                  </span>
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-9 flex flex-wrap gap-2.5">
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex h-10 items-center gap-2 rounded-full border border-white/[0.09] px-4 text-[0.8125rem] text-muted transition-all duration-300 hover:border-white/20 hover:text-mist"
                >
                  <LinkedInIcon className="size-3.5" />
                  LinkedIn
                  <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex h-10 items-center gap-2 rounded-full border border-white/[0.09] px-4 text-[0.8125rem] text-muted transition-all duration-300 hover:border-white/20 hover:text-mist"
                >
                  <GitHubIcon className="size-3.5" />
                  GitHub
                  <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                <a
                  href={siteConfig.resumePath}
                  download
                  className="group inline-flex h-10 items-center gap-2 rounded-full border border-white/[0.09] px-4 text-[0.8125rem] text-muted transition-all duration-300 hover:border-white/20 hover:text-mist"
                >
                  <Download className="size-3.5" />
                  Resume
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-8 max-w-sm text-[0.6875rem] leading-relaxed text-faint">
                Contact details are placeholders — update{" "}
                <span className="font-mono text-muted">lib/site.ts</span> with your
                verified email and social profiles before publishing.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-panel/50 p-6 sm:p-8">
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 size-60 rounded-full bg-[radial-gradient(circle,rgba(143,124,255,0.12),transparent_70%)] blur-2xl"
              />
              <form onSubmit={handleSubmit} noValidate className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-[1.0625rem] font-medium tracking-[-0.02em] text-mist">
                    Start a conversation
                  </h3>
                  <span className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-faint">
                    Validated form
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {fields.map((field) => {
                    const error = errors[field.key];
                    const id = `field-${field.key}`;
                    return (
                      <div key={field.key} className={field.span}>
                        <label
                          htmlFor={id}
                          className="mb-2 flex items-center justify-between text-[0.6875rem] font-medium tracking-[0.02em] text-muted"
                        >
                          <span>
                            {field.label}
                            {field.optional ? (
                              <span className="ml-1.5 text-faint">(optional)</span>
                            ) : (
                              <span className="ml-1 text-violet/70">*</span>
                            )}
                          </span>
                          {error ? (
                            <span className="text-[0.5625rem] font-normal text-red-400/90">
                              {error}
                            </span>
                          ) : null}
                        </label>
                        <input
                          id={id}
                          name={field.key}
                          type={field.type}
                          autoComplete={field.autoComplete}
                          placeholder={field.placeholder}
                          value={values[field.key]}
                          onChange={(event) => update(field.key, event.target.value)}
                          onBlur={() => handleBlur(field.key)}
                          aria-invalid={Boolean(error)}
                          aria-describedby={error ? `${id}-error` : undefined}
                          className={cn(
                            "h-11 w-full rounded-lg border bg-white/[0.02] px-3.5 text-[0.875rem] text-mist placeholder:text-faint/70 transition-all duration-300",
                            "focus:border-violet/50 focus:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-violet/15",
                            error ? "border-red-400/40" : "border-white/[0.08]",
                          )}
                        />
                        {error ? (
                          <span id={`${id}-error`} className="sr-only">
                            {error}
                          </span>
                        ) : null}
                      </div>
                    );
                  })}

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="field-message"
                      className="mb-2 flex items-center justify-between text-[0.6875rem] font-medium tracking-[0.02em] text-muted"
                    >
                      <span>
                        Message<span className="ml-1 text-violet/70">*</span>
                      </span>
                      <span
                        className={cn(
                          "text-[0.5625rem] font-normal",
                          errors.message ? "text-red-400/90" : "text-faint",
                        )}
                      >
                        {errors.message ?? `${values.message.length} chars`}
                      </span>
                    </label>
                    <textarea
                      id="field-message"
                      name="message"
                      rows={5}
                      placeholder="What are you building, and where do you need help?"
                      value={values.message}
                      onChange={(event) => update("message", event.target.value)}
                      onBlur={() => handleBlur("message")}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? "field-message-error" : undefined
                      }
                      className={cn(
                        "w-full resize-none rounded-lg border bg-white/[0.02] px-3.5 py-3 text-[0.875rem] leading-relaxed text-mist placeholder:text-faint/70 transition-all duration-300",
                        "focus:border-violet/50 focus:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-violet/15",
                        errors.message ? "border-red-400/40" : "border-white/[0.08]",
                      )}
                    />
                    {errors.message ? (
                      <span id="field-message-error" className="sr-only">
                        {errors.message}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[0.625rem] leading-relaxed text-faint">
                    Opens your email client with the message pre-filled. No data
                    is stored on this site.
                  </p>
                  <Magnetic strength={0.14}>
                    <button
                      type="submit"
                      className="group inline-flex h-11 items-center gap-2 rounded-full bg-mist px-5 text-[0.8125rem] font-medium text-ink transition-all duration-300 hover:bg-white hover:shadow-[0_14px_44px_-18px_rgba(143,124,255,0.8)]"
                    >
                      {status === "ready" ? (
                        <>
                          <Check className="size-4" aria-hidden="true" />
                          Email drafted
                        </>
                      ) : (
                        <>
                          Send message
                          <Send className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </Magnetic>
                </div>

                <div
                  aria-live="polite"
                  className="mt-3 min-h-[1rem] text-[0.625rem] text-faint"
                >
                  {status === "ready"
                    ? "If your mail client didn't open, email me directly at the address on the left."
                    : !isValid && Object.keys(touched).length > 0
                      ? "Complete the required fields to enable sending."
                      : ""}
                </div>
              </form>

              <motion.div
                aria-hidden="true"
                initial={false}
                animate={reduce ? undefined : { opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-violet/40 to-transparent"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
