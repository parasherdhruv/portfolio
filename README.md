# Dhruv Parasher — Portfolio

A premium, animation-rich personal portfolio for **Dhruv Parasher**, Full-Stack Developer (MERN stack). Built with Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, and Motion.

## Features

- Dark, editorial design system with violet/blue accents and serif italic highlights
- Scroll-linked motion: reveal, stagger, split-word typography, magnetic buttons, scroll progress
- Canvas ambient background with reduced-motion fallback
- Sections: Hero, About, Experience, Featured Projects, Technical Skills, Philosophy, Contact
- Custom CSS project mockups (no stock screenshots)
- Fully responsive (mobile, tablet, laptop, desktop)
- Validated contact form that opens a pre-filled email
- SEO: metadata, Open Graph image, Twitter card, JSON-LD Person schema, sitemap, robots, web manifest
- Downloadable resume PDF at `public/resume/dhruv-parasher-resume.pdf`

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Framework  | Next.js 15 (App Router)             |
| UI         | React 19, TypeScript (strict)       |
| Styling    | Tailwind CSS v4, custom CSS tokens  |
| Motion     | Motion (Framer Motion) 12           |
| Icons      | Lucide React                        |
| Fonts      | Inter Tight, Instrument Serif, JetBrains Mono (via `next/font`) |

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server on http://localhost:3000
npm run dev
```

## Scripts

```bash
# Type check without emitting
npm run typecheck

# Lint the project
npm run lint

# Production build
npm run build

# Serve the production build
npm start
```

## Project Structure

```
app/                    App Router entry, layout, metadata, SEO assets
components/
  layout/               Navbar, footer, ambient background
  motion/               Reveal, stagger, split words, magnetic wrappers
  projects/             CSS project mockups
  sections/             Page sections (hero, about, experience, ...)
  ui/                   Button, section shell, scroll utilities
lib/                    Site config and content data
public/resume/          Downloadable resume PDF
scripts/                One-off resume generator (Python stdlib)
```

## Customizing Content

All copy and links live in two files:

- `lib/site.ts` — name, role, email, phone, socials, canonical URL
- `lib/data.ts` — projects, skills, experience, philosophy

Placeholders to replace before publishing:

- `siteConfig.email`, `siteConfig.phone`
- `siteConfig.socials.github`, `siteConfig.socials.linkedin`
- `siteConfig.url` (your production domain)
- Experience `period` in `lib/data.ts` (currently `20XX — Present`)

The resume PDF is generated from `scripts/generate-resume.py`:

```bash
python3 scripts/generate-resume.py
```

## Deploying to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Keep the auto-detected framework preset **Next.js** and default build settings.
4. Deploy. No environment variables or external services are required.
5. Optionally add a custom domain and update `siteConfig.url` so canonical, sitemap, and Open Graph URLs point to it.

The site is fully static: no database, no server APIs, no paid services.

## Accessibility & Performance

- Respects `prefers-reduced-motion` across animations
- Semantic landmarks, skip link, keyboard-focusable controls
- Accessible form labels, inline validation, and error messaging
- System-friendly font display via `next/font` with `display: swap`
