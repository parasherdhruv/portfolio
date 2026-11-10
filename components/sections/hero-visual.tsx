"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef, type MouseEvent } from "react";
import { GitBranch, Layers3, Zap } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const codeLines = [
  { indent: 0, tokens: [["kw", "const"], ["sp", " "], ["fn", "engineer"], ["sp", " "], ["op", "="], ["sp", " "], ["punc", "{"]] },
  { indent: 1, tokens: [["prop", "name"], ["punc", ":"], ["sp", " "], ["str", "\"Dhruv Parasher\""], ["punc", ","]] },
  { indent: 1, tokens: [["prop", "role"], ["punc", ":"], ["sp", " "], ["str", "\"Full-Stack\""], ["punc", ","]] },
  { indent: 1, tokens: [["prop", "stack"], ["punc", ":"], ["sp", " "], ["punc", "["], ["str", "\"React\""], ["punc", ","], ["sp", " "], ["str", "\"Node\""], ["punc", "],"] ] },
  { indent: 1, tokens: [["prop", "focus"], ["punc", ":"], ["sp", " "], ["str", "\"scale\""], ["punc", ","]] },
  { indent: 1, tokens: [["prop", "ship"], ["punc", ":"], ["sp", " "], ["fn", "build"], ["punc", "("], ["str", "\"impact\""], ["punc", ")"], ["punc", ","]] },
  { indent: 0, tokens: [["punc", "}"], ["punc", ";"], ["sp", " "], ["cmt", "// always"]] },
];

const tokenClass: Record<string, string> = {
  kw: "text-accent",
  fn: "text-accent-2",
  str: "text-foreground/80",
  prop: "text-foreground/90",
  punc: "text-subtle",
  op: "text-accent/80",
  cmt: "text-subtle/70",
  sp: "text-transparent",
};

export function HeroVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 140,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), {
    stiffness: 140,
    damping: 20,
  });

  function onMove(event: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      initial={reduce ? false : { opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.55, ease: EASE }}
      className="relative mx-auto w-full max-w-[26rem] [perspective:1400px]"
    >
      <div
        aria-hidden="true"
        className="ambient-glow-a absolute -inset-14 -z-10 rounded-full blur-2xl"
      />

      <div className="pointer-events-none absolute -inset-8 -z-10 hidden xl:block">
        <div className="absolute inset-0 animate-spin-slower rounded-full border border-dashed border-border/60" />
        <div className="absolute inset-8 animate-spin-slow rounded-full border border-border/40" />
      </div>

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div className="glow-border overflow-hidden rounded-2xl border border-border bg-surface/90 shadow-card backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-border/80 px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-border-strong" />
              <span className="size-2.5 rounded-full bg-border-strong" />
              <span className="size-2.5 rounded-full bg-border-strong" />
            </div>
            <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-subtle">
              engineer.ts
            </span>
            <span className="flex items-center gap-1 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-success/80">
              <span className="size-1 rounded-full bg-success" />
              live
            </span>
          </div>

          <div className="relative px-4 py-5 font-mono text-[0.6875rem] leading-[1.75] sm:text-xs">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklab,var(--accent)_5%,transparent)_50%,transparent_100%)]"
            />
            {codeLines.map((line, lineIndex) => (
              <motion.div
                key={lineIndex}
                initial={reduce ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.95 + lineIndex * 0.075,
                  ease: EASE,
                }}
                className="flex gap-3 whitespace-pre"
              >
                <span className="w-3 select-none text-right text-subtle/50">
                  {lineIndex + 1}
                </span>
                <span style={{ paddingLeft: `${line.indent * 14}px` }}>
                  {line.tokens.map(([type, text], tokenIndex) => (
                    <span key={tokenIndex} className={tokenClass[type]}>
                      {text}
                    </span>
                  ))}
                </span>
              </motion.div>
            ))}
            <motion.span
              aria-hidden="true"
              animate={reduce ? undefined : { opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="ml-[1.9rem] inline-block h-[1.05em] w-[5px] translate-y-[3px] bg-accent/80"
            />
          </div>

          <div className="grid grid-cols-3 gap-px border-t border-border/80 bg-border/60">
            {[
              { icon: Layers3, label: "Architecture" },
              { icon: Zap, label: "Performance" },
              { icon: GitBranch, label: "Delivery" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 bg-surface/90 py-3"
              >
                <Icon className="size-3.5 text-accent/80" aria-hidden="true" />
                <span className="font-mono text-[0.5rem] uppercase tracking-[0.1em] text-subtle">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          animate={reduce ? undefined : { y: [0, -9, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(45px)" }}
          className="glass absolute -left-7 top-[22%] hidden rounded-xl px-3 py-2.5 shadow-soft xl:block"
        >
          <div className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-md bg-accent/15">
              <Zap className="size-3 text-accent" aria-hidden="true" />
            </span>
            <div className="leading-none">
              <p className="text-[0.6875rem] font-medium text-foreground">4 years</p>
              <p className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-subtle">
                engineering
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={reduce ? undefined : { y: [0, 10, 0] }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
          style={{ transform: "translateZ(60px)" }}
          className="glass absolute -right-6 bottom-[16%] hidden rounded-xl px-3.5 py-2.5 shadow-soft xl:block"
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex size-2 items-center justify-center">
              <span className="absolute size-2 animate-pulse-soft rounded-full bg-success/60" />
              <span className="relative size-1.5 rounded-full bg-success" />
            </span>
            <div className="leading-none">
              <p className="text-[0.6875rem] font-medium text-foreground">MERN stack</p>
              <p className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-subtle">
                end-to-end
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div
        aria-hidden="true"
        className="ambient-glow-c pointer-events-none absolute left-1/2 top-full h-24 w-[80%] -translate-x-1/2 rounded-[50%] blur-xl"
      />
    </motion.div>
  );
}
