import { useLocation } from "@tanstack/react-router";

export function usePathname() {
  return useLocation({ select: (l) => l.pathname });
}
