import Image from 'next/image';
import type { ReactNode } from 'react';
import { Reveal } from './motion';
import { SectionHead } from './frames';

/** Goals with the measure each one is judged by, and where it landed. Reads in the product's theme. */
export function GoalsSection({ index, items }: { index: string; items: { goal: string; measure: string; result: ReactNode }[] }) {
  return (
    <section id="goals" className="scroll-mt-10">
      <SectionHead index={index} eyebrow="Goals and success criteria" title="What success had to look like, decided up front." />
      <Reveal>
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[620px] text-left">
            <thead className="border-b border-border bg-muted">
              <tr>
                <th scope="col" className="th">Goal</th>
                <th scope="col" className="th">How it is measured</th>
                <th scope="col" className="th">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((g) => (
                <tr key={g.goal}>
                  <th scope="row" className="td font-semibold">{g.goal}</th>
                  <td className="td text-subtle">{g.measure}</td>
                  <td className="td">{g.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}

/** Before and after one design iteration, with what changed and why. */
export function IterationSection({
  index,
  title,
  before,
  after,
  changes,
}: {
  index: string;
  title: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  changes: { what: string; why: string }[];
}) {
  return (
    <section id="iteration" className="scroll-mt-10">
      <SectionHead index={index} eyebrow="Iteration" title={title} />
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { label: 'Before', ...before },
          { label: 'After', ...after },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 90}>
            <figure className="card overflow-hidden">
              <figcaption className="border-b border-border px-4 py-2.5 text-micro font-medium uppercase tracking-wide text-subtle">{s.label}</figcaption>
              <Image src={s.src} alt={s.alt} width={1800} height={1125} sizes="(min-width: 768px) 50vw, 100vw" className="block h-auto w-full" />
            </figure>
          </Reveal>
        ))}
      </div>
      <ol className="mt-4 grid gap-4 md:grid-cols-2">
        {changes.map((c, i) => (
          <Reveal as="li" key={c.what} delay={(i % 2) * 80}>
            <div className="card h-full p-5">
              <span className="tabular text-micro font-medium text-subtle">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-2 text-body font-semibold">{c.what}</p>
              <p className="mt-1 text-body-sm leading-relaxed text-subtle">{c.why}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/** Accessibility decisions, each with what it protects. */
export function AccessibilitySection({ index, items }: { index: string; items: [string, string][] }) {
  return (
    <section id="access" className="scroll-mt-10">
      <SectionHead index={index} eyebrow="Accessibility" title="Usable without a mouse, without colour, on a phone." />
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map(([t, b], i) => (
          <Reveal as="li" key={t} delay={(i % 2) * 70}>
            <div className="card h-full p-5">
              <p className="text-body font-semibold">{t}</p>
              <p className="mt-1 text-body-sm leading-relaxed text-subtle">{b}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
