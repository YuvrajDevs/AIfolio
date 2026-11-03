"use client";
import { useEffect, useRef } from "react";

/** A friendly named cursor that trails the visitor's real pointer. Desktop only. */
export function CursorTrail() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ok = window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    let tx = -100, ty = -100, x = -100, y = -100, raf = 0;
    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; el.style.opacity = "1"; };
    const leave = () => { el.style.opacity = "0"; };
    const loop = () => {
      x += (tx - x) * 0.12; y += (ty - y) * 0.12;
      el.style.transform = `translate(${x + 14}px, ${y + 14}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[60] opacity-0 transition-opacity duration-200 max-md:hidden">
      <svg width="22" height="22" viewBox="0 0 22 22" className="drop-shadow-[2px_2px_0_rgba(0,0,0,.25)]">
        <path d="M2 2l6.5 17 2.6-7.2L19 9z" fill="#A259FF" stroke="#111" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <span className="ml-4 -mt-1 inline-block rounded-full border-2 border-ink bg-fpurple px-3 py-0.5 font-pixel text-[11px] font-bold uppercase">Yuvraj</span>
    </div>
  );
}
