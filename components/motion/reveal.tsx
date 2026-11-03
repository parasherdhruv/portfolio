"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
  blur?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
  amount = 0.25,
  blur = true,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? { opacity: 1 }
          : { opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

export function StaggerGroup({
  children,
  className,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        reduce
          ? undefined
          : {
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.075, delayChildren: 0.04 },
              },
            }
      }
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : staggerChild}
    >
      {children}
    </motion.div>
  );
}

export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
  duration = 0.9,
  inView = false,
  masked = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  inView?: boolean;
  masked?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
    },
  };

  const child: Variants = {
    hidden: reduce
      ? { opacity: 1 }
      : masked
        ? { y: "110%", opacity: 0 }
        : { y: 20, opacity: 0, filter: "blur(6px)" },
    visible: {
      y: masked ? "0%" : 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration, ease: EASE },
    },
  };

  return (
    <motion.span
      className={cn("inline", className)}
      variants={container}
      initial={reduce ? undefined : "hidden"}
      {...(inView
        ? { whileInView: "visible", viewport: { once: true, amount: 0.5 } }
        : { animate: "visible" })}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={cn(
            "align-bottom",
            masked
              ? "inline-block overflow-hidden pb-[0.08em]"
              : "inline-block",
          )}
          aria-hidden="true"
        >
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            variants={child}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
