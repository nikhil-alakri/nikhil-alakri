import type React from "react";
import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, type ComponentType, type ReactNode } from "react";

// Replacement for next/dynamic({ ssr: false }): loads the module only in the browser.
type Loader<P> = () => Promise<{ default: ComponentType<P> } | ComponentType<P>>;
export default function dynamic<P extends object = Record<string, never>>(
  loader: Loader<P>,
  opts?: { ssr?: boolean; loading?: () => ReactNode },
) {
  const Lazy = lazy(async () => {
    const m = await loader();
    return { default: ("default" in m ? m.default : m) as ComponentType<P> };
  });
  const fallback = opts?.loading ? opts.loading() : null;
  return function DynamicComponent(props: P) {
    return (
      <ClientOnly fallback={fallback}>
        <Suspense fallback={fallback}>
          <Lazy {...(props as P & React.JSX.IntrinsicAttributes)} />
        </Suspense>
      </ClientOnly>
    );
  };
}
