import { createFileRoute } from "@tanstack/react-router";
import Page from "@/legacy-pages/ProjectOne";

export const Route = createFileRoute("/project-one")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Project One Case Study | Nikhil Alakri" },
      { name: "description", content: "High-scale resilient cloud architecture and data processing workflows." },
      { property: "og:title", content: "Project One Case Study | Nikhil Alakri" },
      { property: "og:description", content: "High-scale resilient cloud architecture and data processing workflows." },
      { property: "og:url", content: "https://nikhilalakri.tech/project-one" },
    ],
    links: [{ rel: "canonical", href: "https://nikhilalakri.tech/project-one" }],
  }),
  component: Page,
});
