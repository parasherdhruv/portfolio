"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/components/ui/scroll";
import { Magnetic } from "@/components/motion/magnetic";

const sectionIds = navItems.map((item) => item.href);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-[65]"
      >
        <div
          className={cn(
            "transition-all duration-500",
            scrolled
              ? "border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent",
          )}
        >
          <nav
            aria-label="Primary"
            className="container-x flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]"
          >
            <a
              href="#top"
              className="group flex items-center gap-2.5"
              aria-label={`${siteConfig.name} — home`}
            >
              <span className="relative grid size-8 place-items-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] font-mono text-[0.6875rem] font-medium tracking-tight text-mist transition-colors duration-300 group-hover:border-violet/40">
                <span className="absolute inset-0 bg-gradient-to-br from-violet/25 to-blue/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative">DP</span>
              </span>
              <span className="hidden flex-col leading-none sm:flex">
                <span className="text-[0.8125rem] font-medium tracking-[-0.01em] text-mist">
                  Dhruv Parasher
                </span>
                <span className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-faint">
                  Full-Stack Developer
                </span>
              </span>
            </a>

            <div className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => {
                const isActive = active === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-[0.8125rem] transition-colors duration-300",
                      isActive ? "text-mist" : "text-muted hover:text-mist",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.055]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub profile"
                className="hidden size-9 place-items-center rounded-full border border-white/[0.07] text-muted transition-colors duration-300 hover:border-white/20 hover:text-mist sm:grid"
              >
                <GitHubIcon className="size-[15px]" />
              </a>
              <Magnetic strength={0.16} className="hidden sm:inline-flex">
                <a
                  href="#contact"
                  className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-mist px-4 text-[0.8125rem] font-medium text-ink transition-all duration-300 hover:shadow-[0_10px_34px_-14px_rgba(143,124,255,0.8)]"
                >
                  Let&apos;s talk
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid size-9 place-items-center rounded-full border border-white/[0.09] text-mist lg:hidden"
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[64] flex flex-col bg-ink/96 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-x flex flex-1 flex-col justify-center gap-1 pb-24 pt-20">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.06 + index * 0.05,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-baseline justify-between border-b border-white/[0.06] py-5"
                >
                  <span className="text-3xl font-medium tracking-[-0.03em] text-mist">
                    {item.label}
                  </span>
                  <span className="font-mono text-[0.625rem] text-faint">
                    0{index + 1}
                  </span>
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.5 }}
                className="mt-10 flex items-center gap-3"
              >
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/10 text-sm text-mist"
                >
                  <GitHubIcon className="size-4" /> GitHub
                </a>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/10 text-sm text-mist"
                >
                  <LinkedInIcon className="size-4" /> LinkedIn
                </a>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.73.5.7 5.53.7 11.8c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.17.69-3.84-1.34-3.84-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.53-.29-5.2-1.27-5.2-5.64 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.57.24 2.73.12 3.02.74.8 1.18 1.82 1.18 3.07 0 4.38-2.68 5.34-5.22 5.63.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55a11.3 11.3 0 0 0 7.77-10.78C23.3 5.53 18.27.5 12 .5Z" />
    </svg>
  );
}

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
