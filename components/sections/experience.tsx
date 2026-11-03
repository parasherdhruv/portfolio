"use client";

import { motion, useReducedMotion } from "motion/react";
import { Briefcase, Check } from "lucide-react";
import { SectionHeading, Section } from "@/components/ui/section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Experience() {
  const reduce = useReducedMotion();

  return (
    <Section id="experience">
      <div className="container-x">
        <SectionHeading
          index="02"
          label="Experience"
          title={
            <>
              Building real products,{" "}
              <span className="serif-accent text-muted">in production.</span>
            </>
          }
          description="Four years of full-stack delivery across enterprise applications, public-sector platforms, and commerce products."
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-panel/50 p-6">
                <div
                  aria-hidden="true"
                  className="absolute -left-12 -top-12 size-40 rounded-full bg-[radial-gradient(circle,rgba(92,141,255,0.14),transparent_70%)] blur-xl"
                />
                <div className="relative">
                  <span className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03]">
                    <Briefcase className="size-4 text-violet" aria-hidden="true" />
                  </span>
                  <p className="mt-5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-faint">
                    Current role
                  </p>
                  <h3 className="mt-2 text-xl font-medium tracking-[-0.02em] text-mist">
                    {experience.role}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{experience.company}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-muted">
                      {experience.focus}
                    </span>
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-muted">
                      {experience.location}
                    </span>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
                    <span className="text-[0.75rem] text-faint">Tenure</span>
                    <span className="font-mono text-[0.6875rem] tracking-[0.06em] text-muted">
                      {experience.period}
                    </span>
                  </div>
                  <p className="mt-3 text-[0.625rem] leading-relaxed text-faint">
                    Dates placeholder — update with verified employment timeline.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                {experience.summary}
              </p>
            </Reveal>

            <div className="relative mt-10 pl-6 sm:pl-8">
              <div
                aria-hidden="true"
                className="absolute bottom-2 left-0 top-2 w-px bg-gradient-to-b from-violet/50 via-line to-transparent"
              />
              <StaggerGroup className="space-y-8" amount={0.15}>
                {experience.highlights.map((highlight, index) => (
                  <StaggerItem key={highlight}>
                    <div className="group relative">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[1.72rem] top-[0.45rem] sm:-left-[2.22rem]"
                      >
                        <span className="grid size-[0.6rem] place-items-center">
                          <span className="absolute size-[0.6rem] rounded-full bg-violet/20 transition-all duration-500 group-hover:scale-150" />
                          <span className="relative size-[0.3rem] rounded-full bg-violet/70 transition-colors duration-500 group-hover:bg-violet" />
                        </span>
                      </span>
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-faint">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-[0.9375rem] leading-relaxed text-mist/90 transition-colors duration-300 group-hover:text-mist">
                          {highlight}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            <Reveal delay={0.1} className="mt-12">
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
                <p className="section-label text-faint">Daily toolkit</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {experience.scope.map((item, index) => (
                    <motion.span
                      key={item}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.04, duration: 0.5 }}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-panel/70 px-3 py-1.5 text-[0.75rem] text-muted",
                        "transition-colors duration-300 hover:border-violet/30 hover:text-mist",
                      )}
                    >
                      <Check className="size-3 text-violet/70" aria-hidden="true" />
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
