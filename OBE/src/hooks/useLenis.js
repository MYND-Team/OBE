import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.86,
      touchMultiplier: 1.2,
      prevent: (node) => node.hasAttribute("data-lenis-prevent")
    });

    lenis.on("scroll", ScrollTrigger.update);

    let frame;
    const raf = (time) => {
      // Pause Lenis when a modal/menu is open so only the modal scrolls
      if (!document.body.classList.contains("menu-open")) {
        lenis.raf(time);
      }
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}

