"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Monitor, Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";
import {
  APPEARANCES,
  themePresets,
  type Appearance,
  type ColorTheme,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

const appearanceMeta: Record<
  Appearance,
  { label: string; icon: typeof Sun }
> = {
  light: { label: "Light", icon: Sun },
  dark: { label: "Dark", icon: Moon },
  system: { label: "System", icon: Monitor },
};

export function ThemeSwitcher() {
  const { appearance, theme, setAppearance, setTheme, resolvedMode } = useTheme();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-label="Customize appearance"
        className={cn(
          "group relative grid size-9 place-items-center rounded-full border border-border text-muted transition-colors duration-300 hover:border-border-strong hover:text-foreground",
          open && "border-accent/45 text-foreground",
        )}
      >
        <Palette className="size-[15px]" aria-hidden="true" />
        <span
          aria-hidden="true"
          className="absolute -right-0.5 -top-0.5 size-2 rounded-full border-2 border-background"
          style={{
            background:
              themePresets.find((preset) => preset.id === theme)?.swatches[
                resolvedMode
              ].accent,
          }}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label="Theme settings"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-4 top-20 z-[80] w-[min(19.5rem,calc(100vw-2rem))] max-h-[calc(100svh-6rem)] origin-top-right overflow-y-auto overscroll-contain rounded-2xl border border-border bg-surface/95 shadow-card backdrop-blur-2xl"
          >
            <div className="border-b border-border/80 px-4 py-3.5">
              <div className="flex items-center justify-between">
                <p className="text-[0.8125rem] font-medium tracking-[-0.01em] text-foreground">
                  Appearance
                </p>
                <span className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-subtle">
                  {theme}
                </span>
              </div>

              <div
                role="radiogroup"
                aria-label="Appearance mode"
                className="mt-3 grid grid-cols-3 gap-1 rounded-xl border border-border bg-surface-2/70 p-1"
              >
                {APPEARANCES.map((mode) => {
                  const { label, icon: Icon } = appearanceMeta[mode];
                  const isActive = appearance === mode;
                  return (
                    <button
                      key={mode}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => setAppearance(mode)}
                      className={cn(
                        "relative flex h-8 items-center justify-center gap-1.5 rounded-lg text-[0.6875rem] font-medium transition-colors duration-200",
                        isActive
                          ? "text-foreground"
                          : "text-muted hover:text-foreground",
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="appearance-pill"
                          className="absolute inset-0 rounded-lg border border-border-strong bg-surface shadow-soft"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      <Icon className="relative size-3.5" aria-hidden="true" />
                      <span className="relative">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="px-4 py-3.5">
              <div className="flex items-center justify-between">
                <p className="text-[0.8125rem] font-medium tracking-[-0.01em] text-foreground">
                  Color theme
                </p>
                <span className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-subtle">
                  5 presets
                </span>
              </div>

              <div
                role="radiogroup"
                aria-label="Color theme"
                className="mt-3 space-y-1"
              >
                {themePresets.map((preset) => {
                  const swatch = preset.swatches[resolvedMode];
                  const isActive = theme === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => setTheme(preset.id as ColorTheme)}
                      className={cn(
                        "group flex w-full items-center gap-3 rounded-xl border px-2.5 py-2 text-left transition-all duration-200",
                        isActive
                          ? "border-accent/40 bg-accent/[0.07]"
                          : "border-transparent hover:border-border hover:bg-surface-2/60",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="relative grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg border border-border-strong/60"
                        style={{ background: swatch.background }}
                      >
                        <span
                          className="absolute bottom-1 left-1 h-2.5 w-2.5 rounded-[3px]"
                          style={{ background: swatch.surface }}
                        />
                        <span
                          className="absolute right-1 top-1 h-2 w-2 rounded-full"
                          style={{ background: swatch.accent }}
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5 text-[0.75rem] font-medium text-foreground">
                          {preset.name}
                        </span>
                        <span className="mt-0.5 block truncate text-[0.625rem] text-subtle">
                          {preset.description}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "grid size-4 shrink-0 place-items-center rounded-full border transition-colors duration-200",
                          isActive
                            ? "border-accent bg-accent text-accent-contrast"
                            : "border-border-strong text-transparent",
                        )}
                      >
                        <Check className="size-2.5" aria-hidden="true" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/80 bg-surface-2/40 px-4 py-2.5">
              <span className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-subtle">
                {resolvedMode} mode
              </span>
              <span className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-subtle">
                Saved locally
              </span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
