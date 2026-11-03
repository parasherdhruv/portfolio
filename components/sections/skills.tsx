"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import {
  Code2,
  Database,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { skillGroups } from "@/lib/data";
import { SectionHeading, Section } from "@/components/ui/section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

const icons: Record<string, LucideIcon> = {
  code: Code2,
  server: Server,
  database: Database,
  wrench: Wrench,
};

export function Skills() {
  return (
    <Section id="skills" className="overflow-hidden">
      <div className="container-x">
        <SectionHeading
          index="04"
          label="Technical skills"
          title={
            <>
              A stack chosen for{" "}
              <span className="serif-accent text-muted">shipping.</span>
            </>
          }
          description="No percentage bars. Just the tools I reach for when a product needs to be fast, reliable, and maintainable."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20">
          {skillGroups.map((group, index) => (
            <SkillCard key={group.id} group={group} index={index} />
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.015] px-5 py-6 sm:px-8">
            <div
              aria-hidden="true"
              className="absolute inset-0 dot-grid opacity-[0.35] [mask-image:linear-gradient(to_right,#000,transparent_70%)]"
            />
            <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <p className="max-w-lg text-[0.875rem] leading-relaxed text-muted">
                Comfortable moving across the stack — from a single component
                variant to API contracts, data models, and deployment pipelines.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">
                <span>Frontend</span>
                <span>Backend</span>
                <span>Cloud</span>
                <span>Delivery</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function SkillCard({
  group,
  index,
}: {
  group: (typeof skillGroups)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -0.6 : 0.6, index % 2 === 0 ? 0.6 : -0.6],
  );
  const Icon = icons[group.icon] ?? Code2;

  return (
    <Reveal delay={index * 0.06}>
      <motion.div
        ref={ref}
        style={reduce ? undefined : { rotate }}
        className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-panel/40 p-6 transition-colors duration-500 hover:border-white/[0.14] sm:p-7"
      >
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 size-44 rounded-full bg-[radial-gradient(circle,rgba(143,124,255,0.1),transparent_70%)] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
        />

        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] transition-colors duration-500 group-hover:border-violet/25">
              <Icon className="size-4 text-violet/80" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-[0.9375rem] font-medium tracking-[-0.01em] text-mist">
                {group.title}
              </h3>
              <p className="mt-0.5 text-[0.6875rem] text-faint">{group.description}</p>
            </div>
          </div>
          <span className="font-mono text-[0.5625rem] tracking-[0.12em] text-faint">
            0{index + 1}
          </span>
        </div>

        <StaggerGroup className="relative mt-6 flex flex-wrap gap-1.5" amount={0.1}>
          {group.items.map((item) => (
            <StaggerItem key={item}>
              <span className="inline-flex cursor-default items-center rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[0.75rem] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/30 hover:bg-violet/[0.07] hover:text-mist">
                {item}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </motion.div>
    </Reveal>
  );
}
