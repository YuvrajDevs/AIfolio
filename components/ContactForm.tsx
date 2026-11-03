"use client";
import { SITE } from "@/lib/site";

const field =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 placeholder:text-neutral-400 focus:border-ink focus:outline-none";

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
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" aria-label="Your name" autoComplete="name" className={field} />
        <input name="email" type="email" required placeholder="Email" aria-label="Email" autoComplete="email" className={field} />
      </div>
      <textarea name="message" required rows={6} placeholder="Tell me what's on your mind..." aria-label="Message" className={field} />
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] h-0 w-0 opacity-0" />
      <button type="submit" className="rounded-lg bg-ink px-6 py-3 font-pixel text-sm uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-ocean">
        Send message
      </button>
      <p className="font-hand text-lg text-neutral-600">opens your email app with everything filled in (a hosted form comes later)</p>
    </form>
  );
}
