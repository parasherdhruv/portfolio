import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dhruv Parasher — Full-Stack Developer",
    short_name: "Dhruv Parasher",
    description:
      "Full-Stack Developer with 4 years of experience building scalable web applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#070708",
    theme_color: "#070708",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
