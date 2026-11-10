import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Monogram } from "@/components/brand/monogram";

export const metadata = {
  title: "404 — Page not found",
  description: "That page does not exist. Head back to Dhruv Parasher's portfolio.",
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 py-24"
    >
      <div aria-hidden="true" className="ambient-glow-a absolute left-1/2 top-1/3 size-[36rem] -translate-x-1/2 rounded-full blur-[60px]" />

      <div className="relative w-full max-w-xl text-center">
        <div className="flex justify-center">
          <Monogram size={56} />
        </div>
        <p className="mt-8 font-mono text-[0.625rem] uppercase tracking-[0.32em] text-subtle">
          Error 404
        </p>
        <h1 className="mt-4 text-[clamp(3rem,10vw,6rem)] font-medium leading-[0.95] tracking-[-0.05em] text-foreground">
          Lost the <span className="serif-accent text-gradient">thread</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
          This page doesn&apos;t exist — but the work, the experience, and the
          contact details are all one click away.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-[0.8125rem] font-medium text-background transition-all duration-300 hover:shadow-[0_14px_44px_-18px_var(--accent)]"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back to portfolio
          </Link>
          <a
            href={`mailto:${siteConfig.email}`}
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-[0.8125rem] text-foreground transition-colors duration-300 hover:border-border-strong"
          >
            Get in touch
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <p className="mt-12 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-subtle">
          Designed &amp; Built by {siteConfig.name}
        </p>
      </div>
    </main>
  );
}
