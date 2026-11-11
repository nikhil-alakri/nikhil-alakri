import { Link as RouterLink } from "@tanstack/react-router";
import { forwardRef, type AnchorHTMLAttributes } from "react";

// Drop-in for next/link: internal paths use the router, hashes/external use <a>.
type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; prefetch?: boolean; scroll?: boolean };
const Link = forwardRef<HTMLAnchorElement, Props>(function Link({ href, prefetch: _p, scroll: _s, ...rest }, ref) {
  const isInternalPath = href.startsWith("/") && !href.startsWith("//") && !href.includes("#");
  if (isInternalPath) {
    return <RouterLink ref={ref} to={href as "/"} {...rest} />;
  }
  return <a ref={ref} href={href} {...rest} />;
});
export default Link;
