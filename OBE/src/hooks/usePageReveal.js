import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function usePageReveal() {
  const scope = useRef(null);
  const location = useLocation();

  useLayoutEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !scope.current) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        scope.current,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.85, ease: "power3.out" }
      );

      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 46,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
            once: true
          }
        });
      });

      gsap.utils.toArray("[data-image-reveal]").forEach((element) => {
        gsap.from(element, {
          clipPath: "inset(18% 0% 18% 0%)",
          scale: 1.06,
          duration: 1.35,
          ease: "power4.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
            once: true
          }
        });
      });

      gsap.utils.toArray("[data-parallax]").forEach((element) => {
        gsap.to(element, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: element.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, scope);

    ScrollTrigger.refresh();

    const images = scope.current.querySelectorAll("img");
    let pending = 0;
    const onImageSettle = () => {
      pending -= 1;
      if (pending <= 0) {
        ScrollTrigger.refresh();
      }
    };
    images.forEach((img) => {
      if (!img.complete) {
        pending += 1;
        img.addEventListener("load", onImageSettle, { once: true });
        img.addEventListener("error", onImageSettle, { once: true });
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", onImageSettle);
        img.removeEventListener("error", onImageSettle);
      });
      ctx.revert();
    };
  }, [location.pathname]);

  return scope;
}
