import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Philosophy } from "@/components/sections/philosophy";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Dhruv Parasher — Full-Stack Developer",
  description:
    "Full-Stack Developer with 4 years of experience building scalable web applications with React, Next.js, Node.js, NestJS, MongoDB, and TypeScript.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Philosophy />
      <Contact />
    </>
  );
}
