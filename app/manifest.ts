import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dhruv Parasher — Full-Stack Developer",
    short_name: "Dhruv Parasher",
    description:
      "Portfolio of Dhruv Parasher, Full-Stack Developer and MERN Stack Engineer with 4 years of experience.",
    start_url: "/",
    display: "standalone",
    background_color: "#070709",
    theme_color: "#070709",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
