import { cn } from "@/lib/utils";

export function Monogram({
  className,
  size = 34,
  title = "Dhruv Parasher monogram",
}: {
  className?: string;
  size?: number;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id="dp-mark-stroke" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
        <linearGradient id="dp-mark-fill" x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.16" />
          <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="46" height="46" rx="13" fill="var(--surface-2)" />
      <rect x="1" y="1" width="46" height="46" rx="13" fill="url(#dp-mark-fill)" />
      <rect
        x="1.75"
        y="1.75"
        width="44.5"
        height="44.5"
        rx="12.25"
        fill="none"
        stroke="url(#dp-mark-stroke)"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <path
        d="M15.5 14.5h7.2c6.2 0 10 3.7 10 9.5s-3.8 9.5-10 9.5h-7.2V14.5Zm6.9 4.6h-1.9v9.8h1.9c3.4 0 5.4-1.8 5.4-4.9s-2-4.9-5.4-4.9Z"
        fill="var(--foreground)"
      />
      <path
        d="M33 14.5h2.6c2.2 0 3.4 1.4 3.4 3.6v0.5c0 2.2-1.2 3.6-3.4 3.6H33"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="38.4" cy="18.6" r="1.7" fill="var(--accent-2)" />
    </svg>
  );
}

export function Wordmark({
  className,
  subtitle,
}: {
  className?: string;
  subtitle?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Monogram size={34} />
      <span className="hidden flex-col leading-none sm:flex">
        <span className="text-[0.875rem] font-medium tracking-[-0.015em] text-foreground">
          Dhruv Parasher
        </span>
        {subtitle ? (
          <span className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-subtle">
            {subtitle}
          </span>
        ) : null}
      </span>
    </span>
  );
}
