import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useLenis({ disabled = false } = {}) {
  useEffect(() => {
    if (disabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.86,
      touchMultiplier: 1.2,
      prevent: (node) => node.closest?.("[data-lenis-prevent]") != null
    });

    lenis.on("scroll", ScrollTrigger.update);
    window.__lenis = lenis;

    // Native scrollbar-track dragging fights Lenis's own interpolation, which
    // reads as a stutter/glitch. Pause Lenis while the user is dragging the
    // scrollbar thumb so the browser's native scroll takes over directly.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const onPointerDown = (event) => {
      if (scrollbarWidth > 0 && event.clientX >= document.documentElement.clientWidth) {
        lenis.stop();
      }
    };
    const onPointerUp = () => {
      lenis.start();
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

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
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      lenis.destroy();
      if (window.__lenis === lenis) window.__lenis = undefined;
    };
  }, [disabled]);
}

