"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Copy,
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
type Status = "idle" | "ready" | "error";

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
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const isValid = Object.keys(validate(values)).length === 0;

  function update<K extends keyof FormState>(key: K, value: string) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (status === "error") setStatus("idle");
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
      setStatus("error");
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

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
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
              <span className="h-px w-8 bg-border" aria-hidden="true" />
              <Reveal delay={0.05}>
                <span className="section-label text-muted">Contact</span>
              </Reveal>
            </div>

            <h2 className="mt-8 text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.0] tracking-[-0.05em] text-foreground">
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
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group inline-flex items-center gap-3"
                >
                  <span className="grid size-11 place-items-center rounded-full border border-border bg-surface-2/60 transition-colors duration-300 group-hover:border-accent/40">
                    <Mail className="size-4 text-accent" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-subtle">
                      Email
                    </span>
                    <span className="mt-1 block text-[0.9375rem] text-foreground transition-colors group-hover:text-accent">
                      {siteConfig.email}
                    </span>
                  </span>
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={copied ? "Email copied" : "Copy email address"}
                  className="grid size-8 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent/40 hover:text-foreground"
                >
                  {copied ? (
                    <Check className="size-3.5 text-success" aria-hidden="true" />
                  ) : (
                    <Copy className="size-3.5" aria-hidden="true" />
                  )}
                </button>
                <span aria-live="polite" className="sr-only">
                  {copied ? "Email address copied to clipboard" : ""}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full border border-border bg-surface-2/60">
                  <MapPin className="size-4 text-muted" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-subtle">
                    Location
                  </span>
                  <span className="mt-1 block text-[0.9375rem] text-foreground">
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
                  className="group inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-[0.8125rem] text-muted transition-all duration-300 hover:border-border-strong hover:text-foreground"
                >
                  <LinkedInIcon className="size-3.5" />
                  LinkedIn
                  <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-[0.813rem] text-muted transition-all duration-300 hover:border-border-strong hover:text-foreground"
                >
                  <GitHubIcon className="size-3.5" />
                  GitHub
                  <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                <a
                  href={siteConfig.resumePath}
                  download
                  className="group inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-[0.8125rem] text-muted transition-all duration-300 hover:border-border-strong hover:text-foreground"
                >
                  <Download className="size-3.5" />
                  Resume
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 sm:p-8">
              <div
                aria-hidden="true"
                className="ambient-glow-a absolute -right-24 -top-24 size-60 rounded-full blur-2xl"
              />
              <form onSubmit={handleSubmit} noValidate className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-[1.0625rem] font-medium tracking-[-0.02em] text-foreground">
                    Start a conversation
                  </h3>
                  <span className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-subtle">
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
                              <span className="ml-1.5 text-subtle">(optional)</span>
                            ) : (
                              <span className="ml-1 text-accent/80">*</span>
                            )}
                          </span>
                          {error ? (
                            <span className="text-[0.5625rem] font-normal text-danger">
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
                            "h-11 w-full rounded-lg border bg-surface-2/40 px-3.5 text-[0.875rem] text-foreground placeholder:text-subtle/80 transition-all duration-300",
                            "focus:border-accent/60 focus:bg-surface-2/70 focus:outline-none focus:ring-2 focus:ring-accent/20",
                            error ? "border-danger/50" : "border-border",
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
                        Message<span className="ml-1 text-accent/80">*</span>
                      </span>
                      <span
                        className={cn(
                          "text-[0.5625rem] font-normal",
                          errors.message ? "text-danger" : "text-subtle",
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
                        "w-full resize-none rounded-lg border bg-surface-2/40 px-3.5 py-3 text-[0.875rem] leading-relaxed text-foreground placeholder:text-subtle/80 transition-all duration-300",
                        "focus:border-accent/60 focus:bg-surface-2/70 focus:outline-none focus:ring-2 focus:ring-accent/20",
                        errors.message ? "border-danger/50" : "border-border",
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
                  <p className="text-[0.625rem] leading-relaxed text-subtle">
                    Opens your email client with the message pre-filled. No data
                    is stored on this site.
                  </p>
                  <Magnetic strength={0.14}>
                    <button
                      type="submit"
                      className="group inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-[0.8125rem] font-medium text-background transition-all duration-300 hover:shadow-[0_14px_44px_-18px_var(--accent)]"
                    >
                      {status === "ready" ? (
                        <>
                          <Check className="size-4" aria-hidden="true" />
                          Email drafted
                        </>
                      ) : (
                        <>
                          Send message
                          <Send
                            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </button>
                  </Magnetic>
                </div>

                <div
                  aria-live="polite"
                  className={cn(
                    "mt-3 min-h-[1rem] text-[0.625rem]",
                    status === "error" ? "text-danger" : "text-subtle",
                  )}
                >
                  {status === "ready"
                    ? "If your mail client didn't open, use the copy-email button or write to me directly."
                    : status === "error"
                      ? "Please fix the highlighted fields before sending."
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
                className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
