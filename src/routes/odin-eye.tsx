import { createFileRoute, redirect } from "@tanstack/react-router";

// Old case-study URL; the detailed page now lives under /work.
export const Route = createFileRoute("/odin-eye")({
  beforeLoad: () => { throw redirect({ to: "/work/$slug", params: { slug: "odin-eye" }, statusCode: 301 }); },
});
