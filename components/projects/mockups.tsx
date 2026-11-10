"use client";

import type { ProjectMockup } from "@/lib/data";
import { cn } from "@/lib/utils";

function Frame({
  children,
  accent,
  label,
  className,
}: {
  children: React.ReactNode;
  accent: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate h-full w-full overflow-hidden bg-surface",
        className,
      )}
      style={{ ["--accent" as string]: accent }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(70% 60% at 78% 0%, ${accent}22, transparent 70%), radial-gradient(50% 50% at 0% 100%, ${accent}14, transparent 70%)`,
        }}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-foreground/[0.06] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-foreground/[0.09]" />
            <span className="size-2 rounded-full bg-foreground/[0.09]" />
            <span className="size-2 rounded-full bg-foreground/[0.09]" />
          </div>
          <span className="rounded-full border border-foreground/[0.06] bg-foreground/[0.025] px-2.5 py-0.5 font-mono text-[0.5rem] tracking-[0.08em] text-foreground/35">
            {label}
          </span>
          <span className="flex items-center gap-1 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-foreground/25">
            <span className="size-1 rounded-full" style={{ background: accent }} />
            preview
          </span>
        </div>
        <div className="relative flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function Bar({ width, color }: { width: string; color?: string }) {
  return (
    <span
      className="block h-1.5 rounded-full bg-foreground/[0.08]"
      style={{ width, ...(color ? { background: color } : {}) }}
    />
  );
}

function OrbitMart({ accent }: { accent: string }) {
  const rows = [
    ["#ORD-2091", "Ready to ship", "₹ —", "88%"],
    ["#ORD-2088", "Processing", "₹ —", "64%"],
    ["#ORD-2084", "Packed", "₹ —", "72%"],
    ["#ORD-2079", "Processing", "₹ —", "41%"],
  ];
  return (
    <div className="flex h-full">
      <aside className="hidden w-[22%] shrink-0 flex-col gap-4 border-r border-foreground/[0.05] bg-foreground/[0.015] p-3 sm:flex">
        <div className="flex items-center gap-1.5">
          <span
            className="size-4 rounded-[4px]"
            style={{ background: `linear-gradient(135deg, ${accent}, ${accent}66)` }}
          />
          <span className="text-[0.5rem] font-medium tracking-tight text-foreground/70">
            Orbit Mart
          </span>
        </div>
        <div className="mt-1 space-y-1.5">
          {["Dashboard", "Orders", "Catalogue", "Merchants", "Analytics", "Settings"].map(
            (item, i) => (
              <div
                key={item}
                className={cn(
                  "flex items-center gap-1.5 rounded-[4px] px-1.5 py-1",
                  i === 1 && "bg-foreground/[0.05]",
                )}
              >
                <span
                  className="size-1.5 rounded-[2px]"
                  style={{
                    background: i === 1 ? accent : "color-mix(in oklab, var(--foreground) 14%, transparent)",
                  }}
                />
                <span
                  className={cn(
                    "text-[0.4375rem]",
                    i === 1 ? "text-foreground/80" : "text-foreground/35",
                  )}
                >
                  {item}
                </span>
              </div>
            ),
          )}
        </div>
        <div className="mt-auto rounded-md border border-foreground/[0.06] bg-foreground/[0.02] p-2">
          <div className="flex items-center gap-1.5">
            <span className="size-3.5 rounded-full bg-foreground/[0.08]" />
            <div className="space-y-1">
              <Bar width="22px" />
              <Bar width="14px" />
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 p-3 sm:p-3.5">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="block text-[0.5625rem] font-medium text-foreground/80">
              Orders overview
            </span>
            <span className="block text-[0.4375rem] text-foreground/30">
              Merchant · Admin · Storefront
            </span>
          </div>
          <span
            className="rounded-full px-2 py-0.5 text-[0.4375rem] font-medium text-[#07070a]"
            style={{ background: accent }}
          >
            New order
          </span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {["Revenue", "Orders", "Merchants"].map((label, i) => (
            <div
              key={label}
              className="rounded-md border border-foreground/[0.06] bg-foreground/[0.025] p-2"
            >
              <span className="text-[0.375rem] uppercase tracking-[0.08em] text-foreground/30">
                {label}
              </span>
              <div className="mt-1.5 flex items-end justify-between">
                <span className="text-[0.5625rem] font-medium text-foreground/75">—</span>
                <span className="flex h-3 items-end gap-[2px]">
                  {[5, 8, 6, 11, 9, 14].map((h, j) => (
                    <span
                      key={j}
                      className="w-[2px] rounded-sm"
                      style={{
                        height: `${h}px`,
                        background:
                          j === 5
                            ? accent
                            : `color-mix(in oklab, var(--foreground) ${(0.08 + i * 0.03) * 100}%, transparent)`,
                      }}
                    />
                  ))}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2.5 overflow-hidden rounded-md border border-foreground/[0.06]">
          <div className="flex items-center justify-between border-b border-foreground/[0.06] bg-foreground/[0.025] px-2 py-1.5">
            <span className="text-[0.4375rem] font-medium text-foreground/55">
              Recent orders
            </span>
            <span className="text-[0.375rem] text-foreground/25">DataGrid</span>
          </div>
          <div className="flex items-center gap-2 border-b border-foreground/[0.04] px-2 py-1 text-[0.375rem] uppercase tracking-[0.08em] text-foreground/25">
            <span className="flex-1">Order</span>
            <span className="hidden w-[28%] sm:block">Status</span>
            <span className="w-[18%]">Total</span>
            <span className="w-[12%]">Fill</span>
          </div>
          {rows.map((row) => (
            <div
              key={row[0]}
              className="flex items-center gap-2 border-b border-foreground/[0.035] px-2 py-[6px] last:border-0"
            >
              <span className="flex-1 font-mono text-[0.4375rem] text-foreground/55">
                {row[0]}
              </span>
              <span className="hidden w-[28%] sm:block">
                <span className="inline-flex items-center gap-1 rounded-full bg-foreground/[0.04] px-1.5 py-0.5 text-[0.375rem] text-foreground/45">
                  <span
                    className="size-1 rounded-full"
                    style={{ background: accent }}
                  />
                  {row[1]}
                </span>
              </span>
              <span className="w-[18%] font-mono text-[0.4375rem] text-foreground/40">
                {row[2]}
              </span>
              <span className="flex w-[12%] items-center gap-1">
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/[0.06]">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: row[3], background: `${accent}99` }}
                  />
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Procalyx({ accent }: { accent: string }) {
  return (
    <div className="flex h-full">
      <aside className="hidden w-[20%] shrink-0 flex-col gap-3 border-r border-foreground/[0.05] bg-foreground/[0.015] p-3 md:flex">
        <div className="flex items-center gap-1.5">
          <span
            className="size-4 rounded-full border"
            style={{ borderColor: `${accent}88`, background: `${accent}22` }}
          />
          <span className="text-[0.5rem] font-medium text-foreground/70">Procalyx</span>
        </div>
        <span className="mt-1 text-[0.375rem] uppercase tracking-[0.12em] text-foreground/25">
          Workspace
        </span>
        {["Ship feature", "Refactor", "Review", "Tests"].map((item, i) => (
          <div
            key={item}
            className={cn(
              "rounded-[4px] px-1.5 py-1 text-[0.4375rem]",
              i === 0
                ? "bg-foreground/[0.05] text-foreground/75"
                : "text-foreground/30",
            )}
          >
            {item}
          </div>
        ))}
        <div className="mt-auto space-y-1.5">
          <span className="text-[0.375rem] uppercase tracking-[0.12em] text-foreground/25">
            Context
          </span>
          {["/app/api", "/components", "/lib"].map((item) => (
            <div key={item} className="font-mono text-[0.4375rem] text-foreground/30">
              {item}
            </div>
          ))}
        </div>
      </aside>

      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-center justify-between">
          <span className="text-[0.5625rem] font-medium text-foreground/80">
            Ship feature
          </span>
          <span className="flex items-center gap-1 rounded-full bg-foreground/[0.04] px-2 py-0.5 text-[0.375rem] text-foreground/40">
            <span className="size-1 rounded-full bg-success" />
            ready
          </span>
        </div>

        <div className="mt-2.5 rounded-md border border-foreground/[0.06] bg-foreground/[0.02] p-2">
          <div className="flex items-start gap-1.5">
            <span className="mt-0.5 rounded-[3px] bg-foreground/[0.05] px-1 py-0.5 text-[0.375rem] text-foreground/35">
              prompt
            </span>
            <p className="text-[0.4375rem] leading-relaxed text-foreground/55">
              Add optimistic cart updates and keep the order pipeline consistent.
            </p>
          </div>
        </div>

        <div className="mt-2 flex-1 overflow-hidden rounded-md border border-foreground/[0.06] bg-surface-2">
          <div className="flex items-center gap-2 border-b border-foreground/[0.05] px-2 py-1">
            <span className="font-mono text-[0.375rem] text-foreground/30">
              lib/cart.ts
            </span>
            <span className="rounded-sm bg-foreground/[0.04] px-1 font-mono text-[0.3125rem] text-foreground/25">
              +14 −3
            </span>
          </div>
          <div className="space-y-[3px] p-2 font-mono text-[0.375rem] leading-[1.5]">
            {[
              ["-", "const cart = await fetchCart(userId)", "#f87171"],
              ["+", "const cart = useCartStore.getState()", "#6ee7b7"],
              ["+", "const next = addItem(cart, item)", "#6ee7b7"],
              ["+", "await mutate(next, { optimistic: true })", "#6ee7b7"],
              [" ", "return next", "#71717a"],
              ["+", "// keeps pipeline consistent", "#52525b"],
            ].map(([sign, code, color], i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-1.5 rounded-sm px-1",
                  sign === "+" && "bg-success/[0.07]",
                  sign === "-" && "bg-danger/[0.07]",
                )}
              >
                <span style={{ color }} className="w-1.5 shrink-0">
                  {sign}
                </span>
                <span style={{ color }} className="truncate">
                  {code}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex flex-1 items-center gap-1.5 rounded-md border border-foreground/[0.06] bg-foreground/[0.025] px-2 py-1.5">
            <span className="font-mono text-[0.4375rem] text-foreground/25">
              describe a change…
            </span>
          </div>
          <span
            className="grid size-5 place-items-center rounded-md text-[0.4375rem] text-[#06060a]"
            style={{ background: accent }}
          >
            ↵
          </span>
        </div>
      </div>
    </div>
  );
}

function Pcmc({ accent }: { accent: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-foreground/[0.05] px-3.5 py-2">
        <div className="flex items-center gap-1.5">
          <span
            className="size-4 rounded-[3px]"
            style={{ background: `${accent}33`, border: `1px solid ${accent}66` }}
          />
          <span className="text-[0.5rem] font-medium text-foreground/65">
            PCMC · Citizen Services
          </span>
        </div>
        <div className="hidden items-center gap-2.5 sm:flex">
          {["Services", "Notices", "Pay", "Contact"].map((item) => (
            <span key={item} className="text-[0.4375rem] text-foreground/30">
              {item}
            </span>
          ))}
          <span
            className="rounded-full px-1.5 py-0.5 text-[0.375rem] font-medium text-[#07070a]"
            style={{ background: accent }}
          >
            Sign in
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <div className="grid gap-3 sm:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-lg border border-foreground/[0.06] bg-foreground/[0.02] p-3">
            <span className="text-[0.375rem] uppercase tracking-[0.14em] text-foreground/25">
              Municipal services
            </span>
            <p className="mt-1.5 text-[0.6875rem] font-medium leading-snug text-foreground/80">
              Everything citizens need,
              <br />
              in one clear place.
            </p>
            <div className="mt-3 flex gap-1.5">
              <span
                className="rounded-full px-2 py-0.5 text-[0.375rem] font-medium text-[#06060a]"
                style={{ background: accent }}
              >
                Explore services
              </span>
              <span className="rounded-full border border-foreground/[0.08] px-2 py-0.5 text-[0.375rem] text-foreground/40">
                Notices
              </span>
            </div>
          </div>
          <div className="space-y-1.5">
            {["Property tax", "Water bill", "Birth certificate", "Complaints"].map(
              (item, i) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-md border border-foreground/[0.06] bg-foreground/[0.018] px-2 py-1.5"
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="size-2 rounded-[2px]"
                      style={{ background: `${accent}${i === 0 ? "cc" : "44"}` }}
                    />
                    <span className="text-[0.4375rem] text-foreground/55">{item}</span>
                  </div>
                  <span className="text-[0.4375rem] text-foreground/20">→</span>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="mt-2.5 grid flex-1 gap-2.5 sm:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-lg border border-foreground/[0.06] p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[0.4375rem] font-medium text-foreground/55">
                Latest notices
              </span>
              <span className="text-[0.375rem] text-foreground/20">View all</span>
            </div>
            <div className="mt-2 space-y-1.5">
              {[68, 52, 61].map((w, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="font-mono text-[0.3125rem] text-foreground/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="h-1 rounded-full bg-foreground/[0.07]"
                    style={{ width: `${w}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-foreground/[0.06] bg-foreground/[0.018] p-2.5">
            <span className="text-[0.375rem] uppercase tracking-[0.1em] text-foreground/25">
              Quick pay
            </span>
            <div className="mt-2 space-y-1.5">
              <div className="rounded-sm border border-foreground/[0.07] px-1.5 py-1">
                <Bar width="55%" />
              </div>
              <div className="rounded-sm border border-foreground/[0.07] px-1.5 py-1">
                <Bar width="38%" />
              </div>
              <span
                className="block rounded-sm py-1 text-center text-[0.375rem] font-medium text-[#06060a]"
                style={{ background: accent }}
              >
                Pay now
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Mla({ accent }: { accent: string }) {
  const requests = [
    ["REQ-1042", "Road repair", "Open"],
    ["REQ-1039", "Water supply", "In review"],
    ["REQ-1035", "Streetlight", "Resolved"],
    ["REQ-1030", "Drainage", "Open"],
  ];
  return (
    <div className="flex h-full">
      <aside className="hidden w-[19%] shrink-0 flex-col gap-2 border-r border-foreground/[0.05] bg-foreground/[0.015] p-2.5 md:flex">
        <span className="text-[0.5rem] font-medium text-foreground/65">
          MLA Console
        </span>
        <div className="mt-2 space-y-1">
          {["Overview", "Requests", "Constituents", "Reports"].map((item, i) => (
            <div
              key={item}
              className={cn(
                "rounded-[3px] px-1.5 py-1 text-[0.4375rem]",
                i === 0 ? "bg-foreground/[0.05] text-foreground/75" : "text-foreground/30",
              )}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-md border border-foreground/[0.06] p-1.5">
          <Bar width="80%" />
          <span className="mt-1 block">
            <Bar width="50%" />
          </span>
        </div>
      </aside>

      <div className="flex-1 p-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="block text-[0.5625rem] font-medium text-foreground/80">
              Constituency overview
            </span>
            <span className="text-[0.375rem] text-foreground/25">
              Operational dashboard
            </span>
          </div>
          <span className="rounded-full border border-foreground/[0.08] px-1.5 py-0.5 text-[0.375rem] text-foreground/35">
            This month
          </span>
        </div>

        <div className="mt-2.5 grid grid-cols-4 gap-1.5">
          {["Total", "Open", "Review", "Closed"].map((label, i) => (
            <div
              key={label}
              className="rounded-md border border-foreground/[0.06] bg-foreground/[0.02] px-1.5 py-1.5"
            >
              <span className="text-[0.3125rem] uppercase tracking-[0.08em] text-foreground/25">
                {label}
              </span>
              <span className="mt-1 block text-[0.5625rem] font-medium text-foreground/70">
                —
              </span>
              <span className="mt-1 flex h-[3px] overflow-hidden rounded-full bg-foreground/[0.06]">
                <span
                  className="h-full rounded-full"
                  style={{
                    width: `${[88, 44, 62, 74][i]}%`,
                    background: i === 0 ? accent : `${accent}77`,
                  }}
                />
              </span>
            </div>
          ))}
        </div>

        <div className="mt-2 overflow-hidden rounded-md border border-foreground/[0.06]">
          <div className="flex items-center justify-between border-b border-foreground/[0.05] bg-foreground/[0.025] px-2 py-1.5">
            <span className="text-[0.4375rem] font-medium text-foreground/55">
              Open requests
            </span>
            <span className="text-[0.375rem] text-foreground/20">Filter</span>
          </div>
          {requests.map(([id, title, status]) => (
            <div
              key={id}
              className="flex items-center gap-2 border-b border-foreground/[0.035] px-2 py-1.5 last:border-0"
            >
              <span className="w-[26%] font-mono text-[0.375rem] text-foreground/35">
                {id}
              </span>
              <span className="flex-1 text-[0.4375rem] text-foreground/60">
                {title}
              </span>
              <span
                className="rounded-full px-1.5 py-0.5 text-[0.3125rem]"
                style={{
                  background:
                    status === "Resolved" ? `${accent}22` : "color-mix(in oklab, var(--foreground) 6%, transparent)",
                  color: status === "Resolved" ? accent : "color-mix(in oklab, var(--foreground) 55%, transparent)",
                }}
              >
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Surplus({ accent }: { accent: string }) {
  return (
    <div className="flex h-full flex-col p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span
            className="size-4 rounded-[4px]"
            style={{ background: `${accent}22`, border: `1px solid ${accent}55` }}
          />
          <span className="text-[0.5rem] font-medium text-foreground/70">
            Surplus Finance · API
          </span>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-foreground/[0.04] px-2 py-0.5 font-mono text-[0.375rem] text-foreground/35">
          <span className="size-1 rounded-full bg-success" />
          healthy
        </span>
      </div>

      <div className="mt-2.5 grid flex-1 grid-cols-2 gap-2">
        <div className="flex flex-col rounded-md border border-foreground/[0.06] bg-surface-2 p-2 font-mono">
          <span className="text-[0.375rem] text-foreground/25">POST /v1/transactions</span>
          <div className="mt-1.5 space-y-[2px] text-[0.375rem] leading-[1.6]">
            <p className="text-foreground/30">{"{"}</p>
            <p className="pl-2 text-foreground/45">
              <span style={{ color: accent }}>&quot;account&quot;</span>:{" "}
              <span className="text-success/80">&quot;acc_•••&quot;</span>,
            </p>
            <p className="pl-2 text-foreground/45">
              <span style={{ color: accent }}>&quot;amount&quot;</span>:{" "}
              <span className="text-accent-2/80">0.00</span>,
            </p>
            <p className="pl-2 text-foreground/45">
              <span style={{ color: accent }}>&quot;currency&quot;</span>:{" "}
              <span className="text-success/80">&quot;INR&quot;</span>,
            </p>
            <p className="pl-2 text-foreground/45">
              <span style={{ color: accent }}>&quot;idempotency&quot;</span>:{" "}
              <span className="text-success/80">true</span>
            </p>
            <p className="text-foreground/30">{"}"}</p>
          </div>
          <div className="mt-auto flex items-center gap-1 border-t border-foreground/[0.05] pt-1.5 text-[0.3125rem] text-foreground/25">
            <span className="size-1 rounded-full bg-success" />
            201 · validated · persisted
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="rounded-md border border-foreground/[0.06] bg-foreground/[0.02] p-2">
            <span className="text-[0.3125rem] uppercase tracking-[0.1em] text-foreground/25">
              Service throughput
            </span>
            <div className="mt-2 flex h-10 items-end gap-[3px]">
              {[18, 26, 21, 34, 29, 42, 38, 48, 41, 55, 47, 62].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-[1px]"
                  style={{
                    height: `${h}%`,
                    background:
                      i > 8 ? accent : `color-mix(in oklab, var(--foreground) ${(0.08 + i * 0.02) * 100}%, transparent)`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-md border border-foreground/[0.06] bg-foreground/[0.02] p-2">
            <span className="text-[0.3125rem] uppercase tracking-[0.1em] text-foreground/25">
              Data layer
            </span>
            <div className="mt-1.5 space-y-1">
              {["MongoDB", "Redis", "REST"].map((item, i) => (
                <div key={item} className="flex items-center justify-between">
                  <span className="text-[0.375rem] text-foreground/45">{item}</span>
                  <span className="flex items-center gap-1">
                    <span className="h-1 w-8 overflow-hidden rounded-full bg-foreground/[0.06]">
                      <span
                        className="block h-full rounded-full"
                        style={{
                          width: `${[82, 64, 91][i]}%`,
                          background: `${accent}aa`,
                        }}
                      />
                    </span>
                    <span className="text-[0.3125rem] text-foreground/25">ok</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mockups: Record<
  ProjectMockup,
  { render: (accent: string) => React.ReactNode; label: string }
> = {
  "orbit-mart": { render: (a) => <OrbitMart accent={a} />, label: "orbitmart.app" },
  procalyx: { render: (a) => <Procalyx accent={a} />, label: "procalyx.dev" },
  pcmc: { render: (a) => <Pcmc accent={a} />, label: "pcmc.gov.in" },
  mla: { render: (a) => <Mla accent={a} />, label: "mla.console" },
  surplus: { render: (a) => <Surplus accent={a} />, label: "api.surplus.finance" },
};

export function ProjectMockupView({
  mockup,
  accent,
  className,
}: {
  mockup: ProjectMockup;
  accent: string;
  className?: string;
}) {
  const entry = mockups[mockup];
  return (
    <Frame accent={accent} label={entry.label} className={className}>
      {entry.render(accent)}
    </Frame>
  );
}
