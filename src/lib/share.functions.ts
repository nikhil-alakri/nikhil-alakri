import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import cover from "@/assets/hero-workspace.jpg";

export const getShareCover = createServerFn({ method: "GET" }).handler(() => {
  const request = getRequest();
  const url = new URL(request.url);
  const forwardedHost = url.hostname === "localhost" ? request.headers.get("x-forwarded-host") : null;
  const origin = forwardedHost ? `https://${forwardedHost}` : url.origin;
  return { image: new URL(cover, origin).href };
});