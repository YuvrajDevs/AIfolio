"use client";
import { ArrowUp, AtSign, Smile } from "lucide-react";
import { SITE } from "@/lib/site";

const field =
  "w-full rounded-xl border border-white/10 bg-panel-2 px-3.5 py-2.5 text-[15px] text-white placeholder:text-white/35 transition-colors focus:border-figma focus:outline-none";

/** Comment-composer style form. Submitting opens the visitor's email app, prefilled. */
export function ContactForm() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("website")) return; // honeypot
    const subject = `Hello from ${f.get("name")}`;
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-2.5">
      <div className="grid gap-2.5 sm:grid-cols-2">
        <input id="cf-name" name="name" required placeholder="Your name" aria-label="Your name" autoComplete="name" className={field} />
        <input id="cf-email" name="email" type="email" required placeholder="Email" aria-label="Email" autoComplete="email" className={field} />
      </div>
      <div className="flex flex-1 flex-col rounded-xl border border-white/10 bg-panel-2 transition-colors focus-within:border-figma">
        <textarea id="cf-message" name="message" required rows={4} placeholder="Reply to Yuvraj..." aria-label="Message"
          className="block min-h-[96px] w-full flex-1 resize-none bg-transparent px-3.5 pt-3 text-[15px] text-white placeholder:text-white/35 focus:outline-none" />
        <div className="flex items-center gap-3 border-t border-white/10 px-3.5 py-2 text-white/40">
          <Smile className="h-4 w-4" aria-hidden /><AtSign className="h-4 w-4" aria-hidden />
          <span className="hidden text-xs sm:inline">Opens your email app, prefilled</span>
          <button type="submit" className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-full bg-figma pl-3 pr-2 text-sm font-semibold text-white transition-colors hover:bg-lime hover:text-ink">
            Send <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] h-0 w-0 opacity-0" />
    </form>
  );
}
