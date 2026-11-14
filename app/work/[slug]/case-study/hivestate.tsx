import type { Metadata } from 'next';
import Link from 'next/link';
import { Geist, Geist_Mono } from 'next/font/google';
import { IconBrandGithub } from '@tabler/icons-react';
import { ArrowLeft, ArrowRight, GitBranch, LayoutDashboard, ListChecks, Route, Settings2, UserCheck } from 'lucide-react';
import { buttonClass, cx } from '@/components/case-study/styles';
import { BrowserFrame, Callouts, PhoneFrame, SectionHead } from '@/components/case-study/frames';
import { AccessibilitySection, GoalsSection, IterationSection } from '@/components/case-study/sections';
import { DrawPath, Parallax, Reveal, ScrollProgress, SectionNav } from '@/components/case-study/motion';

/*
 * HiveState case study, in HiveState's own design language: monochrome, white working surfaces with black
 * panels, square corners with crosshair marks, Geist Mono headings, and colour only for small state dots (the .cs-hivestate theme in app/globals.css). Facts come from the
 * repository; screenshots show the product running on synthetic demo runs.
 */

export const hiveStateMeta: Metadata = {
  title: 'Case study: HiveState',
  description: 'How HiveState was designed and built: draw a workflow of AI agents, run it, and keep cost and human review in view.',
};

const geist = Geist({ subsets: ['latin'], variable: '--font-hivestate', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-hivestate-mono', display: 'swap' });

const REPO = 'https://github.com/YuvrajDevs/HiveState';
const LIVE = 'https://hive-state.vercel.app';
const IMG = '/case-study/hivestate';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'goals', label: 'Goals' },
  { id: 'problem', label: 'Problem' },
  { id: 'users', label: 'Users and needs' },
  { id: 'principles', label: 'Principles' },
  { id: 'structure', label: 'Structure and flow' },
  { id: 'decisions', label: 'Key decisions' },
  { id: 'walkthrough', label: 'The product' },
  { id: 'system', label: 'Design system' },
  { id: 'iteration', label: 'Iteration' },
  { id: 'edges', label: 'Edge cases' },
  { id: 'access', label: 'Accessibility' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'retro', label: 'What went wrong' },
  { id: 'next', label: 'Next' },
];

const PAINS = [
  { pain: 'Chaining model calls in code hides the shape of the workflow from everyone but its author.', response: 'Agents are nodes on a canvas; the edges are the order they run in.' },
  { pain: 'A long run fails at step four and has to start again from step one.', response: 'Steps are fingerprinted, so a resumed run skips work that already succeeded.' },
  { pain: 'Some outputs should not ship without a person looking at them.', response: 'A human-review node pauses the run and waits for approve or reject with a note.' },
  { pain: 'Model spend creeps up unnoticed until the bill arrives.', response: 'A daily budget stops new runs at the limit; cost and tokens are logged per step.' },
];

const DECISIONS = [
  { chose: 'A graph, not a list', over: 'a fixed linear pipeline', why: 'The runner works out which agents are ready from their dependencies and runs each ready level in parallel, so independent research steps do not wait for each other.' },
  { chose: 'Resume from the exact step', over: 'restarting failed runs', why: 'Each step is fingerprinted from run, node, input and prompt; a resumed run skips steps that already succeeded instead of paying for them twice.' },
  { chose: 'Stop after three failures in a row', over: 'retrying forever', why: 'A circuit breaker pauses the run after three consecutive failures, so a broken prompt or an outage does not burn the budget.' },
  { chose: 'Keys stay on the server', over: 'calling models from the browser', why: 'Model calls run in server actions and API routes; the browser never receives a provider key.' },
  { chose: 'A quiet interface', over: 'the first “technical brutalism” look', why: 'All-caps labels, fake telemetry text and tinted panels made everything shout. Now one thing leads per screen: what needs you.' },
  { chose: 'One status vocabulary', over: 'labels written per screen', why: 'A paused run was called a success in one place and running in another. One module now gives every screen the same words.' },
];

function Mark() {
  return <span className="text-title font-semibold tracking-tight">HiveState</span>;
}

/** A quiet panel one step lighter than the page, as the product's own panels are. */
function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cx('rounded-3xl border border-border bg-surface p-6 sm:p-8', className)}>{children}</div>;
}

export function HiveStateCaseStudy() {
  return (
    <div className={cx(geist.variable, geistMono.variable, 'cs-theme cs-hivestate min-h-screen bg-bg')}>
      <ScrollProgress />

      <header className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <Link href="/work/hivestate" className={buttonClass('ghost', 'sm', '-ml-2')}>
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> <span className="hidden sm:inline">Back to project</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <span className="hidden items-center gap-3 sm:flex">
            <span className="h-4 w-px bg-border" aria-hidden="true" />
            <Mark />
          </span>
        </div>
        <nav aria-label="Case study" className="flex items-center gap-2">
          <a href={REPO} target="_blank" rel="noopener noreferrer" className={buttonClass('ghost', 'sm', 'hidden sm:inline-flex')}>
            <IconBrandGithub className="h-3.5 w-3.5" aria-hidden="true" /> Source
          </a>
          <a href={LIVE} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'sm')}>
            Live demo <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </nav>
      </header>

      <section className="mx-auto max-w-[1240px] px-4 pb-20 pt-10 sm:px-8 lg:pt-16" aria-labelledby="cs-title">
        <Reveal>
          <h1 id="cs-title" className="max-w-4xl text-[38px] font-semibold leading-[1.05] tracking-tight sm:text-hero">
            HiveState: AI agents you can <span className="text-accent">see, pause and afford</span>.
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-5 max-w-2xl text-lead text-subtle">
            Draw a workflow of AI agents on a canvas, run it, and watch every step: what went in, what came out, what it cost. Runs pause for a person
            where you say, resume from the exact step, and stop at a daily budget.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <dl className="mt-8 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-4 border-y border-border py-5 sm:grid-cols-4">
            {[
              ['Role', 'Solo: product design, front end, back end'],
              ['Timeline', 'April 2026 build; November 2026 redesign'],
              ['Platform', 'Web, desktop first, works at 390px'],
              ['Output', 'Live demo, design system, typed codebase'],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-micro font-medium uppercase tracking-wide text-subtle">{k}</dt>
                <dd className="mt-1 text-body-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <div className="relative mt-12">
          <Reveal delay={260}>
            <Parallax strength={0.04}>
              <BrowserFrame src={`${IMG}/canvas.jpg`} alt="HiveState workflow editor: four agents connected on a dotted canvas, each showing its model and prompt" url="hivestate · workflow editor" priority />
            </Parallax>
          </Reveal>
          <Parallax strength={-0.08} className="absolute -bottom-10 right-4 hidden w-[200px] lg:block xl:-right-6">
            <Reveal delay={440}>
              <PhoneFrame src={`${IMG}/m-dashboard.jpg`} alt="HiveState dashboard on a phone" />
            </Reveal>
          </Parallax>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1240px] gap-12 px-4 pb-24 sm:px-8 lg:grid-cols-[180px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <SectionNav items={SECTIONS} />
        </aside>

        <main className="min-w-0 space-y-28">
          <section id="overview" className="scroll-mt-10">
            <SectionHead index="01" eyebrow="Overview" title="Multi-agent AI with the wiring in plain sight." />
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ['The problem', 'Multi-agent workflows live in code: hard to see, expensive when they fail halfway, and with no natural place for a person to step in.'],
                ['The approach', 'A canvas to draw agents and their order, a runner that executes the graph, and an interface that puts what needs you and what it costs first.'],
                ['The outcome', 'A live product: workflow editor, templates, runs with step-by-step traces, human review, a daily budget and model fallback.'],
              ].map(([t, b], i) => (
                <Reveal key={t} delay={i * 90}>
                  <div className={cx('h-full rounded-2xl p-5', i === 2 ? 'bg-accent text-accent-fg' : 'bg-muted')}>
                    <p className="text-body font-semibold">{t}</p>
                    <p className={cx('mt-2 text-body-sm leading-relaxed', i === 2 ? 'text-accent-fg/75' : 'text-subtle')}>{b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  ['6', 'ready-made workflow templates'],
                  ['3', 'failures in a row before the circuit breaker stops a run'],
                  ['11', 'database migrations behind the data model'],
                  ['165 → 0', 'lint problems after the redesign'],
                ].map(([v, l], i) => {
                  const dark = i === 0 || i === 3;
                  return (
                    <li key={l} className={cx('rounded-2xl p-5', dark ? 'bg-accent text-accent-fg' : 'bg-muted')}>
                      <p className="tabular text-stat font-semibold">{v}</p>
                      <p className={cx('mt-1 text-caption', dark ? 'text-accent-fg/70' : 'text-subtle')}>{l}</p>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </section>

          <GoalsSection
            index="02"
            items={[
              { goal: 'See the workflow', measure: 'A run’s order and dependencies are visible without reading code', result: 'Agents as nodes, edges as order, live state on each node' },
              { goal: 'Never pay twice', measure: 'A resumed run repeats no step that already succeeded', result: 'Steps fingerprinted and skipped on resume' },
              { goal: 'A person decides where it matters', measure: 'Any step can wait for approve or reject with a note', result: 'Human-review nodes; waiting runs pinned to the dashboard' },
              { goal: 'Spend stays bounded', measure: 'New runs stop at a daily limit; cost visible per step', result: 'Budget guard, cost and tokens on every step' },
              { goal: 'Calm, legible interface', measure: 'One status vocabulary; no decorative text; lint clean', result: '165 lint problems to 0; one status module' },
            ]}
          />

          <section id="problem" className="scroll-mt-10">
            <SectionHead
              index="03"
              eyebrow="Problem"
              title="Agent pipelines fail halfway, quietly and expensively."
              lead="A research workflow might gather facts, synthesise them, then rewrite for executives. In code that is a chain of calls nobody else can see. When step three times out, the whole thing reruns; when a draft needs a human eye, there is nowhere to stop."
            />
            <Reveal>
              <Panel>
                <p className="text-micro font-medium uppercase tracking-wide text-subtle">How might we</p>
                <p className="mt-3 text-title font-medium sm:text-display">
                  let a builder design, run and supervise a team of AI agents, so that failures are cheap, people step in where it matters, and cost never surprises?
                </p>
              </Panel>
            </Reveal>
          </section>

          <section id="users" className="scroll-mt-10">
            <SectionHead
              index="04"
              eyebrow="Users and needs"
              title="Built for the person who ships the workflow and answers for it."
              lead="The primary user is a developer or technical operator building AI workflows for a team. This is a proto-persona from how the work is done, not from interviews; testing it with real builders is the next step."
            />
            <Reveal>
              <div className="card overflow-hidden">
                <div className="grid grid-cols-2 border-b border-border bg-muted px-5 py-2.5 text-micro font-medium uppercase tracking-wide text-subtle">
                  <span>Pain point</span>
                  <span>Design response</span>
                </div>
                <ul className="divide-y divide-border">
                  {PAINS.map((p) => (
                    <li key={p.pain} className="grid grid-cols-2 gap-6 px-5 py-4 text-body-sm">
                      <span className="text-subtle">{p.pain}</span>
                      <span>{p.response}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </section>

          <section id="principles" className="scroll-mt-10">
            <SectionHead index="05" eyebrow="Principles" title="Five rules every screen answers to." />
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ['Monochrome by default', 'White working surfaces, black for the sidebar and canvas; colour only for state, as small dots.'],
                ['What needs you comes first', 'Runs waiting for review or paused on an error are pinned to the top with their action.'],
                ['Cost is always in view', 'Today’s spend against the budget, and cost per run and per step.'],
                ['Plain words', 'A run, a step, a workflow. Sentence case. No decorative status strings.'],
                ['One status vocabulary', 'Every screen labels a state the same way, from one module.'],
              ].map(([t, b], i) => (
                <Reveal as="li" key={t} delay={i * 70}>
                  <div className="card h-full p-5">
                    <span className="tabular text-micro font-medium text-subtle">{String(i + 1).padStart(2, '0')}</span>
                    <p className="mt-2 text-body font-semibold">{t}</p>
                    <p className="mt-1 text-body-sm leading-relaxed text-subtle">{b}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </section>

          <section id="structure" className="scroll-mt-10">
            <SectionHead index="06" eyebrow="Structure and flow" title="Build, run, supervise." lead="Navigation follows the job: build a workflow, run it, then watch, review and trace. Each screen links one step deeper." />
            <Reveal>
              <div className="card overflow-x-auto p-6">
                <svg viewBox="0 0 900 150" className="min-w-[640px]" role="img" aria-label="Core flow: Workflows, Canvas, Run, Review, Trace">
                  {['Workflows', 'Canvas', 'Run', 'Review', 'Trace'].map((label, i) => {
                    const x = 20 + i * 176;
                    return (
                      <g key={label}>
                        {i > 0 && <DrawPath d={`M${x - 36},62 L${x - 4},62`} className="stroke-subtle" delay={i * 160} />}
                        <rect x={x} y={30} width={140} height={64} rx={18} fill="rgb(var(--muted))" stroke={i === 3 ? 'rgb(var(--accent))' : 'rgb(var(--border))'} />
                        <text x={x + 70} y={58} textAnchor="middle" className="fill-fg text-[13px] font-semibold">{label}</text>
                        <text x={x + 70} y={78} textAnchor="middle" className="fill-subtle text-[11px]">
                          {['pick or copy a template', 'draw agents and order', 'give it an input', 'approve or reject', 'every step, cost, output'][i]}
                        </text>
                        <text x={x + 70} y={124} textAnchor="middle" className="fill-subtle text-[11px]">{['/workflows', '/workflows/…', '/run', '/tasks/…', '/traces/…'][i]}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </Reveal>
          </section>

          <section id="decisions" className="scroll-mt-10">
            <SectionHead index="07" eyebrow="Key decisions" title="What was chosen, over what, and why." />
            <ol className="grid gap-4 md:grid-cols-2">
              {DECISIONS.map((d, i) => (
                <Reveal as="li" key={d.chose} delay={(i % 2) * 90}>
                  <div className="card h-full p-5">
                    <span className="tabular text-micro font-medium text-subtle">{String(i + 1).padStart(2, '0')}</span>
                    <p className="mt-2 text-body font-semibold">{d.chose}</p>
                    <p className="mt-0.5 text-caption text-subtle">over {d.over}</p>
                    <p className="mt-3 border-t border-dashed border-border pt-3 text-body-sm leading-relaxed">{d.why}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </section>

          <section id="walkthrough" className="scroll-mt-10">
            <SectionHead index="08" eyebrow="The product" title="Five screens, each built around one question." lead="Real screenshots of the product, running on synthetic demo runs." />
            <div className="space-y-20">
              {[
                { icon: LayoutDashboard, title: 'Dashboard', q: 'What needs me, and what is running?', img: 'dashboard', notes: [
                  { title: 'Needs you, first', body: 'Runs waiting for review or paused on an error sit at the top, each with its action.' },
                  { title: 'Recent runs', body: 'Running, waiting and done, with progress; stop one or all.' },
                  { title: 'Budget in view', body: 'Today’s spend against the daily limit, beside the workflows you use most.' },
                ] },
                { icon: GitBranch, title: 'Workflow editor', q: 'What runs, in what order?', img: 'canvas', notes: [
                  { title: 'Agents as nodes', body: 'Each node shows its model and prompt; edges are the order of execution.' },
                  { title: 'Review points', body: 'Add a human-review node anywhere the output needs a person.' },
                  { title: 'Live state', body: 'During a run each node shows its own state, and failed steps can be retried in place.' },
                ] },
                { icon: UserCheck, title: 'Run details', q: 'What happened, and what do I decide?', img: 'task', notes: [
                  { title: 'One primary action', body: 'Approve and continue is the only filled button; reject sits beside it with a note.' },
                  { title: 'Progress that adds up', body: 'Steps done over steps in the workflow, with cost and runtime beside it.' },
                  { title: 'Payload inspector', body: 'Prompt, input and output per step, told apart by colour.' },
                ] },
                { icon: Route, title: 'Trace', q: 'Where did the time and money go?', img: 'trace', notes: [
                  { title: 'Every step', body: 'Model, duration and cost per step, in order.' },
                  { title: 'Input and output', body: 'Exactly what each agent received and returned.' },
                  { title: 'Honest status', body: 'The run’s real state, not a guess from its steps.' },
                ] },
                { icon: Settings2, title: 'Settings', q: 'What are the limits?', img: 'settings', notes: [
                  { title: 'Daily budget', body: 'New runs stop when today’s spend reaches the limit.' },
                  { title: 'Primary and fallback model', body: 'On a rate limit or server error the step retries on the fallback.' },
                  { title: 'Keys stay server-side', body: 'Provider keys are stored on the server and never sent to the browser.' },
                ] },
              ].map((s, i) => (
                <Reveal key={s.title}>
                  <article aria-labelledby={`w-${i}`}>
                    <div className="mb-5 flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-muted" aria-hidden="true">
                        <s.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 id={`w-${i}`} className="text-title font-semibold">
                          <span className="tabular text-subtle">{String(i + 1).padStart(2, '0')}</span> {s.title}
                        </h3>
                        <p className="text-body-sm text-subtle">{s.q}</p>
                      </div>
                    </div>
                    <BrowserFrame src={`${IMG}/${s.img}.jpg`} alt={`HiveState ${s.title.toLowerCase()}`} url={`hivestate · ${s.title.toLowerCase()}`} />
                    <div className="mt-6">
                      <Callouts layout="row" items={s.notes} />
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="system" className="scroll-mt-10">
            <SectionHead
              index="09"
              eyebrow="Design system"
              title="Black and white, colour only for state."
              lead="Tokens for every colour, size and radius, one status vocabulary shared by every screen, and the rules written down in docs/DESIGN_SYSTEM.md."
            />
            <div className="grid gap-4 lg:grid-cols-2">
              <Reveal>
                <div className="card h-full p-6">
                  <p className="text-micro font-medium uppercase tracking-wide text-subtle">Colour</p>
                  <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {[
                      ['Page', '#ffffff', 'Working surface'],
                      ['Card', '#f2f2f2', 'Cards in panels'],
                      ['Ink', '#0a0a0a', 'Text 19.8:1, action'],
                      ['Ink panel', '#0a0a0a', 'Sidebar, canvas'],
                      ['Muted', '#5c5c5c', 'Secondary 6.7:1'],
                      ['Success', '#15803d', 'Completed'],
                      ['Warning', '#8a5a00', 'Needs review'],
                      ['Danger', '#b91c1c', 'Failed'],
                    ].map(([n, hex, use]) => (
                      <li key={n}>
                        <span className="block h-12 rounded-xl border border-border" style={{ background: hex }} aria-hidden="true" />
                        <p className="mt-1.5 text-caption font-semibold">{n}</p>
                        <p className="tabular text-micro text-subtle">{hex}</p>
                        <p className="text-micro text-subtle">{use}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="card h-full p-6">
                  <p className="text-micro font-medium uppercase tracking-wide text-subtle">Status vocabulary · one module for every screen</p>
                  <ul className="mt-4 space-y-2.5">
                    {[
                      ['Running', 'bg-accent'],
                      ['Needs review', 'bg-warning'],
                      ['Paused on error', 'bg-warning'],
                      ['Completed', 'bg-success'],
                      ['Failed', 'bg-danger'],
                    ].map(([label, dot]) => (
                      <li key={label} className="flex items-center justify-between border-b border-dashed border-border pb-2 last:border-0">
                        <span className="flex items-center gap-2 text-body">
                          <span className={cx('h-2 w-2 rounded-full', dot)} aria-hidden="true" /> {label}
                        </span>
                        <span className="text-caption text-subtle">dot and word, never colour alone</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-micro font-medium uppercase tracking-wide text-subtle">Type · Geist Mono for headings and data, Geist for text</p>
                  <p className="mt-2 text-body-sm text-subtle">Sentence case everywhere. Mono only for ids, tokens, costs and payloads.</p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={80}>
              <Panel className="mt-4">
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    ['164', 'one-off pixel font sizes replaced by a named type scale'],
                    ['322', 'raw palette classes (red-500, green-400…) replaced by four state tokens'],
                    ['256', 'all-caps labels returned to sentence case'],
                  ].map(([v, l]) => (
                    <div key={l}>
                      <p className="tabular text-stat font-semibold">{v}</p>
                      <p className="mt-1 text-body-sm text-subtle">{l}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            </Reveal>
          </section>

          <IterationSection
            index="10"
            title="From everything shouting to one thing leading."
            before={{ src: `${IMG}/before.jpg`, alt: 'HiveState dashboard before the redesign: pure black, all-caps monospace labels, tinted panels' }}
            after={{ src: `${IMG}/dashboard.jpg`, alt: 'HiveState dashboard after: black and white, mono headings, crosshair-marked panels, state as small dots' }}
            changes={[
              { what: 'All-caps monospace labels became sentence case', why: 'Every label had the same loud weight, so nothing led. Mono is now kept for ids, tokens and costs.' },
              { what: 'Fake telemetry text was removed', why: 'Strings like “NODE_CLUSTER_SYNCED” looked technical but meant nothing, and competed with real state.' },
              { what: 'Tinted panels and glows became neutral surfaces', why: 'Yellow, green and red panels everywhere made every card urgent. State is now a small dot with a word.' },
              { what: 'Tasks became Runs', why: '“Tasks”, “New task” and “Run a workflow” described the same thing three ways.' },
            ]}
          />

          <section id="edges" className="scroll-mt-10">
            <SectionHead index="11" eyebrow="Edge cases" title="The awkward cases, designed on purpose." />
            <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['A step fails three times', 'The circuit breaker pauses the run and says why, instead of retrying into the budget.'],
                  ['The budget runs out', 'New runs stop and the dashboard says the daily budget was reached.'],
                  ['The model is rate-limited', 'The step retries on the fallback model, and the log records that it did.'],
                  ['A run is resumed', 'Steps that already succeeded are skipped by fingerprint, not paid for again.'],
                  ['The AI key is missing', 'Only the run that needs the model fails, with a clear message; every other page still works.'],
                  ['A workflow loops', 'Cycles are detected before a run starts.'],
                ].map(([t, b], i) => (
                  <Reveal key={t} delay={(i % 2) * 80}>
                    <div className="card h-full p-5">
                      <p className="text-body font-semibold">{t}</p>
                      <p className="mt-1 text-body-sm leading-relaxed text-subtle">{b}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={120} className="hidden lg:block">
                <PhoneFrame src={`${IMG}/m-task.jpg`} alt="A run waiting for review, on a phone" />
              </Reveal>
            </div>
          </section>

          <AccessibilitySection
            index="12"
            items={[
              ['Measured contrast', 'Text is 19.8:1, secondary 6.7:1 and hints 5.7:1 on white; state words stay above 4.5:1.'],
              ['State is never colour alone', 'Every dot and chip carries a word: Running, Needs review, Failed.'],
              ['Phones', 'Toolbars scroll sideways instead of clipping; wide tables scroll inside their card.'],
              ['Keyboard', 'A skip link, a command palette (⌘K) and visible focus rings.'],
            ]}
          />

          <section id="evidence" className="scroll-mt-10">
            <SectionHead index="13" eyebrow="Engineering" title="Code you can trust to change." lead="The redesign was also a code review. These are the changes behind the calm surface." />
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ['165 → 0 lint problems', 'A typed domain model replaced 108 untyped values; a real React rules-of-hooks error and effect-driven state syncing were fixed.'],
                ['Progress that was always 0%', 'The run query never selected the workflow’s canvas, so total steps were always zero. Fixed at the query.'],
                ['Paused runs called successful', 'The trace list guessed status from its steps. It now reads the run’s own status.'],
                ['A stale polling loop', 'The run page compared each poll against the status from when polling began. Refs now keep it current.'],
              ].map(([t, b], i) => (
                <Reveal key={t} delay={(i % 2) * 80}>
                  <div className="card h-full p-5">
                    <p className="text-body font-semibold">{t}</p>
                    <p className="mt-1 text-body-sm leading-relaxed text-subtle">{b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="retro" className="scroll-mt-10">
            <SectionHead index="14" eyebrow="What went wrong" title="Honest about the misses." />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['The first look fought itself', 'A “technical brutalism” style made every label loud. It took a redesign to let state lead.'],
                ['OpenAI was half-built', 'Provider settings accept OpenAI keys, but runs only call Gemini. The unused module was removed and the claim corrected.'],
                ['No automated tests', 'Correctness rests on types, lint and manual runs. Tests for the graph runner are the first gap to close.'],
                ['Two words for one thing', 'Tasks and runs meant the same; users had to learn that. One word now.'],
              ].map(([t, b], i) => (
                <Reveal key={t} delay={(i % 2) * 80}>
                  <div className="h-full rounded-2xl border-l-4 border-accent bg-surface p-5">
                    <p className="text-body font-semibold">{t}</p>
                    <p className="mt-1 text-body-sm leading-relaxed text-subtle">{b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="next" className="scroll-mt-10">
            <SectionHead index="15" eyebrow="Next" title="What I would do next." />
            <ol className="grid gap-4 md:grid-cols-3">
              {[
                ['Test the runner', 'Unit tests for dependency order, parallel levels, resume and the circuit breaker.'],
                ['Wire a second provider', 'Route steps to OpenAI through the same model layer, so the provider setting does something.'],
                ['Watch three builders', 'See where they stall on the canvas before adding anything to it.'],
              ].map(([t, b], i) => (
                <Reveal as="li" key={t} delay={i * 80}>
                  <div className="card h-full p-5">
                    <ListChecks className="h-4 w-4 text-subtle" aria-hidden="true" />
                    <p className="mt-2 text-body font-semibold">{t}</p>
                    <p className="mt-1 text-body-sm leading-relaxed text-subtle">{b}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal>
              <Panel className="mt-16 sm:p-12">
                <h2 className="text-display font-semibold sm:text-section">Draw a workflow. Run it. Stay in charge.</h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={LIVE} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'md')}>
                    Open the live demo <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a href={REPO} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary', 'md')}>
                    Read the source <IconBrandGithub className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </Panel>
            </Reveal>
          </section>
        </main>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-4 py-6 text-caption text-subtle sm:px-8">
          <span>Screenshots show synthetic demo runs.</span>
          <span>
            Designed and built by <Link href="/" className="font-medium text-fg hover:underline">Yuvraj Singh Shekhawat</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
