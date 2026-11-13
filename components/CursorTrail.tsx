"use client";
import { useEffect, useRef } from "react";

/** A multiplayer-style named cursor that trails the visitor's pointer. Desktop only. */
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
      x += (tx - x) * 0.14; y += (ty - y) * 0.14;
      el.style.transform = `translate(${x + 12}px, ${y + 12}px)`;
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
    <div ref={ref} aria-hidden className="site-chrome pointer-events-none fixed left-0 top-0 z-[60] opacity-0 transition-opacity duration-200 max-md:hidden">
      <svg width="16" height="16" viewBox="0 0 22 22">
        <path d="M2 2l6.5 17 2.6-7.2L19 9z" fill="#d6ff3d" stroke="#121318" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <span className="-mt-0.5 ml-3 inline-block rounded-md bg-lime px-2 py-0.5 text-[11px] font-semibold text-ink">Yuvraj</span>
    </div>
  );
}
