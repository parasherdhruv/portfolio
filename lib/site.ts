export const siteConfig = {
  name: "Dhruv Parasher",
  firstName: "Dhruv",
  lastName: "Parasher",
  initials: "DP",
  role: "Full-Stack Developer",
  speciality: "MERN Stack Engineer",
  experience: "4+ Years",
  location: "Delhi NCR, India",
  timezone: "IST",
  email: "dhpar22@gmail.com",
  phone: "+91 00000 00000",
  url: "https://dhruvparasher.vercel.app",
  resumePath: "/resume/dhruv-parasher-resume.pdf",
  description:
    "Full-Stack Developer with 4 years of experience building scalable web applications, modern user interfaces, and robust backend systems with React, Next.js, Node.js, NestJS, MongoDB, and TypeScript.",
  socials: {
    github: "https://github.com/parasherdhruv",
    linkedin: "https://www.linkedin.com/in/dhruvparasher",
  },
} as const;

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;
