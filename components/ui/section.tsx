import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function Section({
  id,
  children,
  className,
  bordered = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-24 sm:py-28 lg:py-36",
        bordered && "border-t border-line",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  description,
  align = "left",
  className,
}: {
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="section-label">{index}</span>
          <span className="h-px w-8 bg-line" aria-hidden="true" />
          <span className="section-label text-muted">{label}</span>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="max-w-3xl text-[clamp(2rem,4.2vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.04em] text-mist">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:text-base",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
