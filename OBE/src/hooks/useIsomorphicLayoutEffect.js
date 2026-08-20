import { useEffect, useLayoutEffect } from "react";

// useLayoutEffect warns and is a no-op during SSR. Since none of this app's
// layout effects run anything meaningful until the browser is present anyway,
// fall back to useEffect when there's no DOM (i.e. during prerendering).
export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
