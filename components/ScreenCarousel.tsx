"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Shot = { src: string; caption: string };

/** Case-study screens as a swipeable carousel: scroll-snap track, arrows, dots and arrow keys. */
export function ScreenCarousel({ shots }: { shots: Shot[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const n = (i + shots.length) % shots.length;
      el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
    },
    [shots.length],
  );

  // Keep the index in sync with swipes and trackpad scrolling.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setIndex(Math.round(el.scrollLeft / el.clientWidth)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (shots.length === 1) {
    const s = shots[0];
    return (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.src} alt={s.caption} loading="lazy" decoding="async" className="w-full rounded-xl border border-line" />
        <figcaption className="px-1 pt-2 text-sm text-ink/60">{s.caption}</figcaption>
      </figure>
    );
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Project screens"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      className="rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ink/30"
    >
      <div className="relative">
        <div ref={track} className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-xl border border-line [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {shots.map((s, i) => (
            <div key={s.src} className="w-full shrink-0 snap-center" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${shots.length}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={s.caption} loading={i === 0 ? "eager" : "lazy"} decoding="async" className="block w-full" />
            </div>
          ))}
        </div>
        {(["prev", "next"] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => go(dir === "prev" ? index - 1 : index + 1)}
            aria-label={dir === "prev" ? "Previous screen" : "Next screen"}
            className={`absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-[0_8px_24px_-8px_rgba(0,8,50,.45)] backdrop-blur transition hover:scale-105 hover:bg-white ${dir === "prev" ? "left-3" : "right-3"}`}
          >
            {dir === "prev" ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        ))}
      </div>
      <div className="flex items-start justify-between gap-4 px-1 pt-3">
        <p className="min-h-[2.5rem] text-sm text-ink/60" aria-live="polite">
          {shots[index]?.caption}
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex gap-1.5">
            {shots.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show screen ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-ink" : "w-2 bg-ink/25 hover:bg-ink/45"}`}
              />
            ))}
          </div>
          <span className="font-mono text-[11px] tabular-nums text-ink/50">
            {index + 1} / {shots.length}
          </span>
        </div>
      </div>
    </div>
  );
}
