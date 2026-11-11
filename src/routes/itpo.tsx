import { createFileRoute } from "@tanstack/react-router";
import Page from "@/legacy-pages/Itpo";

export const Route = createFileRoute("/itpo")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "ITPO Platform | Nikhil Alakri" },
      { name: "description", content: "ITPO Platform live application." },
      { property: "og:title", content: "ITPO Platform | Nikhil Alakri" },
      { property: "og:description", content: "ITPO Platform live application." },
      { property: "og:url", content: "https://nikhilalakri.tech/itpo" },
    ],
    links: [{ rel: "canonical", href: "https://nikhilalakri.tech/itpo" }],
  }),
  component: Page,
});
