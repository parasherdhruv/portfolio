import { ArrowUpRight } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "@/components/layout/navbar";
import { Monogram } from "@/components/brand/monogram";

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="container-x py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <a href="#top" className="inline-flex items-center gap-2.5">
              <Monogram size={34} />
              <span className="flex flex-col leading-none">
                <span className="text-[0.875rem] font-medium tracking-[-0.01em] text-foreground">
                  Dhruv Parasher
                </span>
                <span className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-subtle">
                  Full-Stack Developer
                </span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-[0.8125rem] leading-relaxed text-subtle">
              Full-Stack Developer and MERN Stack Engineer building scalable
              applications and considered digital experiences from Delhi NCR,
              India.
            </p>
            <div className="mt-5 flex items-center gap-1.5">
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub profile"
                className="grid size-9 place-items-center rounded-full border border-border text-muted transition-colors duration-300 hover:border-border-strong hover:text-foreground"
              >
                <GitHubIcon className="size-4" />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn profile"
                className="grid size-9 place-items-center rounded-full border border-border text-muted transition-colors duration-300 hover:border-border-strong hover:text-foreground"
              >
                <LinkedInIcon className="size-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Send an email"
                className="grid size-9 place-items-center rounded-full border border-border text-muted transition-colors duration-300 hover:border-border-strong hover:text-foreground"
              >
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="section-label text-subtle">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.8125rem] text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="section-label text-subtle">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[0.8125rem] text-muted transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[0.8125rem] text-muted transition-colors hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.resumePath}
                  download
                  className="text-[0.8125rem] text-muted transition-colors hover:text-foreground"
                >
                  Resume (PDF)
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[0.8125rem] text-muted transition-colors hover:text-foreground"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.625rem] tracking-[0.06em] text-subtle">
            © {new Date().getFullYear()} Dhruv Parasher. All rights reserved.
          </p>
          <p className="font-mono text-[0.625rem] tracking-[0.06em] text-subtle">
            Designed &amp; Built by{" "}
            <span className="text-muted">Dhruv Parasher</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
