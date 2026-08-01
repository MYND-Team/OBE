import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { LogoMark } from "./LogoMark.jsx";

export function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setHidden(true);
      return undefined;
    }

    const timeline = gsap.timeline({
      delay: 0.25,
      onComplete: () => setHidden(true)
    });

    timeline
      .to(".loader__bar span", { scaleX: 1, duration: 0.9, ease: "power3.inOut" })
      .to(".loader__bar", { autoAlpha: 0, duration: 0.35, ease: "power2.out" }, "+=0.05")
      .to(".loader", { autoAlpha: 0, duration: 0.65, ease: "power2.out" }, "-=0.15");

    return () => timeline.kill();
  }, []);

  if (hidden) return null;

  return (
    <div className="loader" aria-hidden="true">
      <div className="loader__word">
        <span>
          <LogoMark />
        </span>
      </div>
      <div className="loader__bar">
        <span />
      </div>
    </div>
  );
}
