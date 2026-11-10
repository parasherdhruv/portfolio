"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight, ExternalLink, Github, Plus } from "lucide-react";
import { useRef } from "react";
import { projects } from "@/lib/data";
import { SectionHeading, Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { ProjectMockupView } from "@/components/projects/mockups";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Projects() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <Section id="work" className="overflow-hidden">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            index="03"
            label="Selected work"
            title={
              <>
                Products built with{" "}
                <span className="serif-accent text-muted">intent.</span>
              </>
            }
            description="Five projects across commerce, AI tooling, public infrastructure, and backend systems. Previews are custom-built interface mockups."
          />
          <Reveal delay={0.1} className="shrink-0">
            <div className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              05 Projects
            </div>
          </Reveal>
        </div>

        <div className="mt-14 lg:mt-20">
          <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-14">
            <div className="order-2 lg:order-1">
              <div className="space-y-1">
                {projects.map((project, index) => {
                  const isActive = index === active;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      onClick={() => setActive(index)}
                      aria-pressed={isActive}
                      className={cn(
                        "group relative flex w-full items-start gap-4 rounded-xl px-3 py-4 text-left transition-colors duration-300 sm:px-4 sm:py-5",
                        isActive ? "bg-surface-2/70" : "hover:bg-surface/60",
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="project-rail"
                          className="absolute inset-y-2 left-0 w-[2px] rounded-full bg-accent"
                          transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        />
                      ) : null}
                      <span
                        className={cn(
                          "mt-1 font-mono text-[0.625rem] tracking-[0.12em] transition-colors duration-300",
                          isActive ? "text-foreground/70" : "text-subtle",
                        )}
                      >
                        {project.index}
                      </span>
                      <span className="flex-1">
                        <span className="flex items-center justify-between gap-3">
                          <span
                            className={cn(
                              "text-[1.05rem] font-medium tracking-[-0.02em] transition-colors duration-300 sm:text-lg",
                              isActive ? "text-foreground" : "text-muted",
                            )}
                          >
                            {project.name}
                          </span>
                          <ArrowUpRight
                            className={cn(
                              "size-4 shrink-0 transition-all duration-300",
                              isActive
                                ? "translate-x-0 translate-y-0 text-foreground opacity-100"
                                : "-translate-x-1 translate-y-1 text-subtle opacity-0",
                            )}
                            aria-hidden="true"
                          />
                        </span>
                        <span
                          className={cn(
                            "mt-1 block text-[0.8125rem] leading-relaxed transition-colors duration-300",
                            isActive ? "text-muted" : "text-subtle",
                          )}
                        >
                          {project.tagline}
                        </span>
                        <span className="mt-2 block font-mono text-[0.5625rem] uppercase tracking-[0.13em] text-subtle">
                          {project.role}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-end">
                <span className="inline-flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-subtle">
                  <Plus className="size-3" aria-hidden="true" />
                  Hover to preview
                </span>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-8 -z-10 rounded-[2rem] opacity-70 blur-3xl transition-colors duration-700"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${projects[active].accent}22, transparent 66%)`,
                  }}
                />
                <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
                  <div className="relative aspect-[16/11]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={projects[active].id}
                        initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.015 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.99 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="absolute inset-0"
                      >
                        <ProjectMockupView
                          mockup={projects[active].mockup}
                          accent={projects[active].accent}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={projects[active].id}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="mt-6"
                >
                  <p className="text-[0.9375rem] leading-relaxed text-muted">
                    {projects[active].description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {projects[active].stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-surface-2/50 px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.08em] text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {projects[active].outcomes.length > 0 && (
                    <ul className="mt-5 space-y-2 border-t border-border/80 pt-5">
                      {projects[active].outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-muted"
                        >
                          <span
                            className="mt-[0.38rem] size-1 shrink-0 rounded-full bg-accent/80"
                            aria-hidden="true"
                          />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  )}

                  {(projects[active].links.live || projects[active].links.repo) && (
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      {projects[active].links.live && (
                        <a
                          href={projects[active].links.live}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`View live demo of ${projects[active].name}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-[0.75rem] text-muted transition-all duration-300 hover:border-border-strong hover:text-foreground"
                        >
                          <ExternalLink className="size-3" aria-hidden="true" />
                          Live demo
                        </a>
                      )}
                      {projects[active].links.repo && (
                        <a
                          href={projects[active].links.repo}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`View repository for ${projects[active].name}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-[0.75rem] text-muted transition-all duration-300 hover:border-border-strong hover:text-foreground"
                        >
                          <Github className="size-3" aria-hidden="true" />
                          Repository
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -18]);

  const CardWrapper = project.links.live
    ? ({ children }: { children: React.ReactNode }) => (
        <a
          href={project.links.live}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`View ${project.name}`}
        >
          {children}
        </a>
      )
    : ({ children }: { children: React.ReactNode }) => <>{children}</>;

  return (
    <Reveal delay={(index % 3) * 0.06}>
      <CardWrapper>
        <article
          ref={ref}
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/50 transition-colors duration-500 hover:border-border-strong"
        >
          <div className="relative aspect-[16/10] overflow-hidden border-b border-border/80">
            <motion.div style={{ y }} className="absolute inset-[-4%]">
              <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                <ProjectMockupView mockup={project.mockup} accent={project.accent} />
              </div>
            </motion.div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
              style={{
                background: `linear-gradient(90deg, transparent, ${project.accent}99, transparent)`,
              }}
            />
          </div>

          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-subtle">
                {project.index}
              </span>
              <span
                className="size-1.5 rounded-full"
                style={{ background: project.accent }}
                aria-hidden="true"
              />
            </div>
            <h3 className="mt-3 text-base font-medium tracking-[-0.02em] text-foreground">
              {project.name}
            </h3>
            <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-subtle">
              {project.tagline}
            </p>
            <ul className="mt-4 space-y-1.5">
              {project.highlights.slice(0, 2).map((item) => (
                <li key={item} className="flex gap-2 text-[0.75rem] leading-relaxed text-muted">
                  <span
                    className="mt-[0.4rem] size-1 shrink-0 rounded-full bg-accent/70"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-end justify-between pt-4">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.08em] text-subtle"
                  >
                    {item}
                  </span>
                ))}
              </div>
              {project.links.live && (
                <ArrowUpRight
                  className="size-3.5 shrink-0 text-subtle transition-colors duration-300 group-hover:text-foreground"
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        </article>
      </CardWrapper>
    </Reveal>
  );
}
