"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Blocks,
  Component,
  Gauge,
  Layers,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { philosophy } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Reveal, SplitWords } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  layers: Layers,
  blocks: Blocks,
  gauge: Gauge,
  component: Component,
  sparkles: Sparkles,
};

export function Philosophy() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = philosophy[active];
  const CurrentIcon = icons[current.icon] ?? Layers;

  return (
    <Section id="philosophy" className="overflow-hidden">
      <div className="container-x">
        <div className="flex items-center gap-3">
          <Reveal>
            <span className="section-label">05</span>
          </Reveal>
          <span className="h-px w-8 bg-border" aria-hidden="true" />
          <Reveal delay={0.05}>
            <span className="section-label text-muted">Engineering philosophy</span>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="text-[clamp(2.4rem,5.5vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.05em] text-foreground">
              <SplitWords inView text="Beyond" />
              <br />
              <span className="serif-accent text-gradient">
                <SplitWords inView masked={false} text="writing code" delay={0.1} />
              </span>
              <span className="text-accent">.</span>
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-md text-[0.9375rem] leading-relaxed text-muted">
                Writing code is the visible 20%. The rest is deciding what to
                build, where the boundaries belong, and how the system behaves
                when it grows. These are the principles I bring to every
                codebase.
              </p>
            </Reveal>

            <div className="mt-8 hidden items-center gap-3 lg:flex">
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-subtle">
                Select a principle
              </span>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>
          </div>

          <div>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/50">
              <div
                aria-hidden="true"
                className="ambient-glow-a absolute -right-20 -top-20 size-56 rounded-full blur-2xl"
              />
              <div className="relative border-b border-border/80 p-6 sm:p-8">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.index}
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-start justify-between">
                      <span className="grid size-11 place-items-center rounded-xl border border-border bg-surface-2/70">
                        <CurrentIcon className="size-5 text-accent" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[0.625rem] tracking-[0.14em] text-subtle">
                        {current.index} / 0{philosophy.length}
                      </span>
                    </div>
                    <h3 className="mt-6 max-w-md text-2xl font-medium leading-tight tracking-[-0.03em] text-foreground sm:text-[1.75rem]">
                      {current.title}
                    </h3>
                    <p className="mt-3 max-w-md text-[0.875rem] leading-relaxed text-muted">
                      {current.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="divide-y divide-border/70">
                {philosophy.map((item, index) => {
                  const Icon = icons[item.icon] ?? Layers;
                  return (
                    <button
                      key={item.index}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-pressed={active === index}
                      className={cn(
                        "group flex w-full items-center gap-4 px-6 py-3.5 text-left transition-colors duration-300 sm:px-8",
                        active === index ? "bg-surface-2/60" : "hover:bg-surface-2/30",
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-[0.5625rem] tracking-[0.12em] transition-colors duration-300",
                          active === index ? "text-accent" : "text-subtle",
                        )}
                      >
                        {item.index}
                      </span>
                      <Icon
                        className={cn(
                          "size-3.5 transition-colors duration-300",
                          active === index ? "text-foreground" : "text-subtle",
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={cn(
                          "flex-1 text-[0.8125rem] transition-colors duration-300",
                          active === index ? "text-foreground" : "text-muted",
                        )}
                      >
                        {item.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-px transition-all duration-500",
                          active === index
                            ? "w-6 bg-accent"
                            : "w-3 bg-border-strong group-hover:w-5 group-hover:bg-border-strong",
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
