"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight, Download, MapPin, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { marqueeItems } from "@/lib/data";
import { SplitWords } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { GitHubIcon, LinkedInIcon } from "@/components/layout/navbar";
import { HeroVisual } from "@/components/sections/hero-visual";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-8 pt-28 sm:pt-32"
    >
      <motion.div
        style={{ opacity, y }}
        className="container-x flex flex-1 items-center"
      >
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 xl:gap-16">
          <div className="max-w-3xl">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              className="mb-8 flex flex-wrap items-center gap-3"
            >
              <span className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.025] py-1.5 pl-2.5 pr-3.5 backdrop-blur-md">
                <span className="relative flex size-2 items-center justify-center">
                  <span className="absolute size-2 animate-pulse-soft rounded-full bg-emerald-400/60" />
                  <span className="relative size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                </span>
                <span className="text-[0.75rem] font-medium tracking-[-0.005em] text-mist/85">
                  Available for opportunities
                </span>
              </span>
              <span className="hidden items-center gap-1.5 text-[0.75rem] text-faint sm:inline-flex">
                <MapPin className="size-3" aria-hidden="true" />
                {siteConfig.location}
              </span>
            </motion.div>

            <h1 className="text-[clamp(2.6rem,6.4vw,5.4rem)] font-medium leading-[0.98] tracking-[-0.05em] text-mist">
              <SplitWords text="Building digital" delay={0.42} />
              <br />
              <SplitWords
                text="experiences"
                delay={0.52}
                masked={false}
                wordClassName="text-gradient"
              />{" "}
              <SplitWords text="that" delay={0.6} />
              <br />
              <span className="serif-accent text-mist/90">
                <SplitWords text="make an impact" delay={0.68} />
              </span>
              <span className="text-violet">.</span>
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
              className="mt-7 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:text-lg"
            >
              I&apos;m <span className="text-mist">Dhruv Parasher</span>, a
              Full-Stack Developer with 4 years of experience creating scalable
              applications and exceptional digital experiences.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.02, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.2}>
                <a
                  href="#work"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-mist pl-6 pr-5 text-sm font-medium text-ink transition-all duration-300 hover:bg-white hover:shadow-[0_18px_50px_-18px_rgba(143,124,255,0.85)]"
                >
                  Explore my work
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
              <a
                href={siteConfig.resumePath}
                download
                className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-5 text-sm font-medium text-mist backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <Download className="size-4 text-muted transition-colors group-hover:text-mist" />
                Download resume
              </a>
              <div className="ml-1 flex items-center gap-1.5">
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub profile"
                  className="grid size-11 place-items-center rounded-full border border-white/[0.07] text-muted transition-all duration-300 hover:border-white/20 hover:text-mist"
                >
                  <GitHubIcon className="size-[17px]" />
                </a>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn profile"
                  className="grid size-11 place-items-center rounded-full border border-white/[0.07] text-muted transition-all duration-300 hover:border-white/20 hover:text-mist"
                >
                  <LinkedInIcon className="size-[17px]" />
                </a>
              </div>
            </motion.div>

            <motion.dl
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-12 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.04]"
            >
              {[
                { value: "4+", label: "Years experience" },
                { value: "MERN", label: "Core stack" },
                { value: "Full-Stack", label: "End-to-end" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 bg-ink/60 px-4 py-3.5 backdrop-blur-sm"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-base font-medium tracking-[-0.02em] text-mist sm:text-lg">
                    {stat.value}
                  </dd>
                  <dd className="font-mono text-[0.5625rem] uppercase tracking-[0.13em] text-faint">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <div className="hidden lg:block">
            <HeroVisual />
          </div>
        </div>
      </motion.div>

      <div className="relative mt-16 w-full">
        <div className="container-x flex items-end justify-between gap-6 pb-6">
          <a
            href="#about"
            className="group inline-flex items-center gap-2.5 text-[0.75rem] text-faint transition-colors hover:text-mist"
          >
            <span className="grid size-8 place-items-center rounded-full border border-white/10 transition-colors group-hover:border-white/25">
              <ArrowDown className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </span>
            <span className="font-mono uppercase tracking-[0.16em]">Scroll</span>
          </a>
          <div className="hidden items-center gap-2 text-[0.6875rem] text-faint sm:flex">
            <Sparkles className="size-3" aria-hidden="true" />
            <span className="font-mono uppercase tracking-[0.16em]">
              Crafted with intent
            </span>
          </div>
        </div>

        <div className="mask-fade-x relative overflow-hidden border-y border-white/[0.05] py-4">
          <div className="flex w-max animate-marquee items-center gap-10 will-change-transform">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="flex items-center gap-10 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint"
              >
                {item}
                <span className="size-1 rounded-full bg-violet/40" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
