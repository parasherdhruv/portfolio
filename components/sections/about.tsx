"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SplitWords, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { principles } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export function About() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, reduce ? 40 : -40]);

  return (
    <Section id="about" className="overflow-hidden">
      <div className="container-x">
        <div className="flex items-center gap-3">
          <Reveal>
            <span className="section-label">01</span>
          </Reveal>
          <span className="h-px w-8 bg-border" aria-hidden="true" />
          <Reveal delay={0.05}>
            <span className="section-label text-muted">About</span>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-14 lg:mt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <h2 className="text-[clamp(1.9rem,3.6vw,3.2rem)] font-medium leading-[1.06] tracking-[-0.04em] text-foreground">
              <SplitWords
                inView
                text="I build software the way I'd want to inherit it —"
              />{" "}
              <span className="serif-accent text-gradient-soft">
                <SplitWords
                  inView
                  masked={false}
                  text="clear, deliberate, and built to last."
                />
              </span>
            </h2>

            <div className="mt-8 max-w-xl space-y-5 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
              <Reveal delay={0.1}>
                <p>
                  I&apos;m <span className="text-foreground">Dhruv Parasher</span>, a
                  Full-Stack Developer based in {siteConfig.location}, with 4 years
                  of experience building scalable web applications, modern user
                  interfaces, and robust backend systems.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p>
                  My work lives at the intersection of product thinking and
                  engineering rigor. I specialize in{" "}
                  <span className="text-foreground">
                    React, Next.js, Node.js, Express.js, NestJS, MongoDB, and
                    TypeScript
                  </span>{" "}
                  — and I care as much about the maintainability of a system as
                  its first impression.
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <p>
                  I enjoy solving complex engineering problems, designing
                  maintainable architectures, optimizing application performance,
                  and leveraging AI-assisted development to ship features
                  efficiently.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.26} className="mt-9">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="#experience"
                  className="group link-underline text-sm font-medium text-foreground"
                >
                  View experience
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">
                  Delhi NCR · India · IST
                </span>
              </div>
            </Reveal>
          </div>

          <div ref={ref} className="relative">
            <motion.div style={{ y }} className="space-y-3">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-5 sm:p-7">
                <div
                  aria-hidden="true"
                  className="ambient-glow-a absolute -right-16 -top-16 size-44 rounded-full blur-xl"
                />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="section-label text-subtle">Engineering philosophy</p>
                    <p className="mt-3 max-w-xs text-lg font-medium leading-snug tracking-[-0.02em] text-foreground">
                      Systems that stay understandable as they grow.
                    </p>
                  </div>
                  <div className="hidden shrink-0 sm:block">
                    <OrbitGlyph />
                  </div>
                </div>
                <div className="relative mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border/80 pt-5">
                  {["Scalable architecture", "Clean code", "Fast interfaces", "AI-assisted"].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="size-1 rounded-full bg-accent/80" aria-hidden="true" />
                        <span className="text-[0.75rem] text-muted">{item}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "4 years", label: "Building for the web" },
                  { value: "Full-Stack", label: "Frontend to database" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-border bg-surface/40 p-4"
                  >
                    <p className="text-xl font-medium tracking-[-0.03em] text-foreground">
                      {item.value}
                    </p>
                    <p className="mt-1.5 text-[0.6875rem] leading-snug text-subtle">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <StaggerGroup className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-border bg-border/60 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {principles.map((principle) => (
            <StaggerItem
              key={principle.index}
              className="group relative bg-background/90 p-6 transition-colors duration-500 hover:bg-surface/90 sm:p-7"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[0.625rem] tracking-[0.14em] text-subtle">
                  {principle.index}
                </span>
                <span className="size-1 rounded-full bg-border-strong transition-colors duration-500 group-hover:bg-accent" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-[0.9375rem] font-medium leading-snug tracking-[-0.01em] text-foreground">
                {principle.title}
              </h3>
              <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-subtle transition-colors duration-500 group-hover:text-muted">
                {principle.description}
              </p>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent/60 to-transparent transition-transform duration-500 group-hover:scale-x-100"
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}

function OrbitGlyph() {
  return (
    <div aria-hidden="true" className="relative size-16">
      <div className="absolute inset-0 rounded-full border border-border-strong/70" />
      <div className="absolute inset-2 rounded-full border border-dashed border-border" />
      <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
      <span className="absolute bottom-1 right-2 size-1 rounded-full bg-accent-2/90" />
      <span className="absolute inset-0 grid place-items-center font-mono text-[0.5rem] tracking-[0.1em] text-subtle">
        DP
      </span>
    </div>
  );
}
