import { useEffect, useRef } from "react";

export function Cursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return undefined;
    }

    const cursor = cursorRef.current;
    const label = labelRef.current;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let hasMoved = false;
    let frame;

    const move = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!hasMoved) {
        cursor.classList.add("cursor--visible");
        hasMoved = true;
      }
    };

    const over = (event) => {
      const target = event.target.closest("[data-cursor]");
      if (!target) return;
      cursor.classList.add("cursor--active");
      label.textContent = target.dataset.cursor || "View";
    };

    const out = (event) => {
      const target = event.target.closest("[data-cursor]");
      if (!target) return;
      cursor.classList.remove("cursor--active");
      label.textContent = "";
    };

    const tick = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    frame = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="cursor" ref={cursorRef} aria-hidden="true">
      <span ref={labelRef} />
    </div>
  );
}
