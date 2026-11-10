import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Illustrated cover for Citable: a site score and the AI crawler check, drawn in HTML */
export function CitableCover() {
  const bots = [
    { name: "GPTBot", ok: true },
    { name: "ClaudeBot", ok: true },
    { name: "PerplexityBot", ok: false },
    { name: "Google-Extended", ok: true },
  ];
  return (
    <div aria-hidden className="flex h-full gap-3 bg-white p-3 text-ink">
      <div className="flex w-[38%] flex-col items-center justify-center rounded-lg bg-paper p-2">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
          <circle cx="32" cy="32" r="26" fill="none" stroke="#121318" strokeOpacity=".08" strokeWidth="7" />
          <circle cx="32" cy="32" r="26" fill="none" stroke="#2556e8" strokeWidth="7" strokeLinecap="round" strokeDasharray={`${0.86 * 163} 163`} />
        </svg>
        <span className="-mt-11 mb-6 text-lg font-extrabold">86</span>
        <span className="text-[9px] font-semibold uppercase tracking-wider text-ink/50">AI visibility</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1.5">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-ink/50">Crawler access</span>
        {bots.map((b) => (
          <span key={b.name} className="flex items-center justify-between rounded-md bg-paper px-2 py-1 text-[10px] font-medium">
            {b.name}
            <span className={cn("grid h-3.5 w-3.5 place-items-center rounded-full", b.ok ? "bg-live text-white" : "bg-orange text-white")}>
              {b.ok ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : <X className="h-2.5 w-2.5" strokeWidth={3} />}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Blueprint for a project still being built: its planned architecture as a wireframe */
export function BlueprintCover() {
  const box = "rounded-md border-2 border-dashed border-lime/70 bg-canvas-deep/60 px-2 py-1 text-center font-mono text-[10px] font-medium text-white";
  return (
    <div aria-hidden className="relative flex h-full flex-col items-center justify-center gap-2 overflow-hidden bg-canvas-deep p-3
      [background-image:linear-gradient(rgb(255_255_255/.08)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/.08)_1px,transparent_1px)] [background-size:14px_14px]">
      <span className={box}>React client</span>
      <span className="h-3 w-0.5 bg-lime/70" />
      <div className="flex items-center gap-2">
        <span className={cn(box, "border-solid bg-lime/15")}>Express API</span>
        <span className="h-0.5 w-4 bg-lime/70" />
        <span className={box}>LLM APIs</span>
      </div>
      <span className="h-3 w-0.5 bg-lime/70" />
      <span className={box}>MongoDB</span>
    </div>
  );
}
