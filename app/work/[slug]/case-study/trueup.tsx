import type { Metadata } from 'next';
import Link from 'next/link';
import { Urbanist } from 'next/font/google';
import { IconBrandGithub } from '@tabler/icons-react';
import { ArrowLeft, ArrowRight, Banknote, FlaskConical, Gauge, Landmark, ReceiptText, ScaleIcon, ShieldAlert } from 'lucide-react';
import { buttonClass, cx } from '@/components/case-study/styles';
import { BrowserFrame, Callouts, PhoneFrame, SectionHead } from '@/components/case-study/frames';
import { AccessibilitySection, GoalsSection, IterationSection } from '@/components/case-study/sections';
import { CountUp, DrawPath, Parallax, Reveal, ScrollProgress, SectionNav } from '@/components/case-study/motion';

/*
 * TrueUp case study, in TrueUp's own design language: cool white page, deep navy analysis panels, lavender
 * surfaces and one violet accent (the .cs-trueup theme in app/globals.css). Every figure is copied from the
 * repository's README, docs/BENCHMARKS.md or the test suite; nothing here is estimated.
 */

export const trueUpMeta: Metadata = {
  title: 'Case study: TrueUp',
  description: 'How TrueUp was designed and built: card-payment analytics and reconciliation where every finding is graded against a known answer key.',
};

const urbanist = Urbanist({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-trueup', display: 'swap' });

const REPO = 'https://github.com/YuvrajDevs/dc';
const LIVE = 'https://trueup-beta.vercel.app';
const LAB = `${LIVE}/lab`;
const IMG = '/case-study/trueup';

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
  { pain: 'The ledger, the processor and the bank never agree, and the gaps hide in thousands of rows.', response: 'One exception queue across all three, sorted by money at stake, each item showing what was matched and why.' },
  { pain: 'Fraud and outage alerts are tuned on gut feel; nobody knows how many they miss.', response: 'Detectors are graded against planted incidents: found, missed, false alarm or too faint to see.' },
  { pain: 'Interchange overcharges are buried in fee reports nobody rebuilds.', response: 'The rate card is rebuilt per transaction in SQL, so every overpaid dollar has a row behind it.' },
  { pain: 'Dispute thresholds are breached before anyone notices the trend.', response: 'A month-by-merchant heatmap against the monitoring thresholds, with complete months only.' },
];

const DECISIONS = [
  { chose: 'Synthetic data with a hidden answer key', over: 'a public or real payments dataset', why: 'Real card data is private, and with real data nobody knows the right answer. Planting known problems is the only way to measure a detector honestly.' },
  { chose: 'Detectors as SQL in dbt', over: 'a black-box anomaly model', why: 'An analyst can read a rule, and a test can pin it. The rate card is rebuilt in SQL and a dbt test proves it matches every standard charge exactly.' },
  { chose: 'Grade “too faint” separately', over: 'counting every planted incident as a miss', why: 'An outage that produced under two timeouts leaves nothing any detector could see. Calling that a miss would understate the detector; calling it a catch would overstate it.' },
  { chose: 'A reference match must agree on merchant, currency and time', over: 'trusting the first reference that matches', why: 'A typo’d reference usually names another real order. Requiring agreement took error precision from 0.561 to 0.999.' },
  { chose: 'The lab as the front door', over: 'leading with a dashboard of numbers', why: 'A visitor can plant an attack and watch it get caught in seconds. Proof you can try beats a claim you have to trust.' },
  { chose: 'Floors that never move', over: 'tuning thresholds until the build passes', why: 'Accuracy floors sit a little below the worst value seen and are enforced in CI; a deliberately crippled engine is tested to fail them.' },
];

const DETECTORS = [
  { name: 'Card testing', recall: 100 },
  { name: 'Interchange downgrades', recall: 100 },
  { name: 'Dispute spikes', recall: 94 },
  { name: 'Issuer outages', recall: 92 },
];

const ENGINE = [
  { metric: 'Error precision', first: '0.561', now: '0.999' },
  { metric: 'Error recall', first: '0.981', now: '0.994' },
  { metric: 'Ledger link precision', first: '0.9961', now: '1.0000' },
  { metric: 'Ledger link recall', first: '0.9878', now: '1.0000' },
];

/** TrueUp's mark: a ring with a violet tick. */
function Mark({ className }: { className?: string }) {
  return (
    <span className={cx('flex items-center gap-2 text-title font-semibold tracking-tight', className)}>
      <svg viewBox="0 0 28 28" className="h-6 w-6" aria-hidden="true">
        <circle cx="14" cy="14" r="12.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M8.5 14.5l3.6 3.6 7.4-8" fill="none" stroke="rgb(var(--violet))" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      TrueUp
    </span>
  );
}

/** Deep navy panel: TrueUp's surface for analysis. */
function Navy({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cx('rounded-3xl bg-ink p-6 text-paper sm:p-8', className)}>{children}</div>;
}

export function TrueUpCaseStudy() {
  return (
    <div className={cx(urbanist.variable, 'cs-theme cs-trueup min-h-screen bg-bg')}>
      <ScrollProgress />

      {/* top bar */}
      <header className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <Link href="/work/trueup" className={buttonClass('ghost', 'sm', '-ml-2')}>
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> <span className="hidden sm:inline">Back to project</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <span className="h-4 w-px bg-border" aria-hidden="true" />
          <Mark />
        </div>
        <nav aria-label="Case study" className="flex items-center gap-2">
          <a href={REPO} target="_blank" rel="noopener noreferrer" className={buttonClass('ghost', 'sm', 'hidden sm:inline-flex')}>
            <IconBrandGithub className="h-3.5 w-3.5" aria-hidden="true" /> Source
          </a>
          <a href={LAB} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'sm')}>
            Try the lab <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </nav>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-[1240px] px-4 pb-20 pt-10 sm:px-8 lg:pt-16" aria-labelledby="cs-title">
        <Reveal>
          <h1 id="cs-title" className="max-w-4xl text-[38px] font-semibold leading-[1.05] tracking-tight sm:text-hero">
            TrueUp: card payments,{' '}
            <span className="relative whitespace-nowrap">
              proven right
              <span className="absolute inset-x-0 -bottom-1 -z-10 h-2 rounded-full bg-violet/60" aria-hidden="true" />
            </span>
            .
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-5 max-w-2xl text-lead text-subtle">
            A payments risk and reconciliation workbench. It finds card-testing fraud, issuer outages, dispute spikes and interchange overcharges, reconciles
            the ledger against the processor and the bank, and grades every finding against problems it planted itself.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <dl className="mt-8 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-4 border-y border-border py-5 sm:grid-cols-4">
            {[
              ['Role', 'Solo: product design, data engineering, front end'],
              ['Timeline', 'November 2026: build, then a design-system pass'],
              ['Platform', 'Web, desktop first, works at 390px'],
              ['Output', 'Live demo, design system, 225 automated tests'],
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
              <BrowserFrame src={`${IMG}/dashboard.jpg`} alt="TrueUp dashboard: approval rate, volume, open reconciliation errors and dispute ratio, then what needs attention" url="trueup · dashboard" priority />
            </Parallax>
          </Reveal>
          <Parallax strength={-0.08} className="absolute -bottom-10 right-4 hidden w-[200px] lg:block xl:-right-6">
            <Reveal delay={440}>
              <PhoneFrame src={`${IMG}/m-dashboard.jpg`} alt="TrueUp dashboard on a phone" />
            </Reveal>
          </Parallax>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1240px] gap-12 px-4 pb-24 sm:px-8 lg:grid-cols-[180px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <SectionNav items={SECTIONS} />
        </aside>

        <main className="min-w-0 space-y-28">
          {/* 01 overview */}
          <section id="overview" className="scroll-mt-10">
            <SectionHead index="01" eyebrow="Overview" title="Find where card payments leak money, and prove it." />
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: 'The problem', body: 'Payment teams lose money to fraud, outages, disputes and fee overcharges, and to records that never agree. Their detectors are rarely measured, so nobody knows what they miss.' },
                { title: 'The approach', body: 'Generate a realistic card network with known problems hidden in it, run it through a production-style pipeline, and grade every finding against the answer key.' },
                { title: 'The outcome', body: 'A live product: a lab to plant attacks, a dashboard of what needs a decision, approvals, disputes, fees, an exception queue and a scorecard, on a documented design system.' },
              ].map((c, i) => (
                <Reveal key={c.title} delay={i * 90}>
                  <div className={cx('h-full rounded-2xl p-5', ['bg-pink', 'bg-yellow', 'bg-sage'][i])}>
                    <p className="text-body font-semibold">{c.title}</p>
                    <p className="mt-2 text-body-sm leading-relaxed text-ink/75">{c.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <ul className="mt-4 grid grid-cols-2 overflow-hidden rounded-2xl bg-ink text-paper md:grid-cols-5">
                {[
                  { v: <CountUp to={96.6} decimals={1} suffix="%" />, l: 'of detectable incidents found over 200 random lab runs' },
                  { v: <CountUp to={0} />, l: 'false alarms across those 200 runs' },
                  { v: <>0.561 → <CountUp to={0.999} decimals={3} /></>, l: 'reconciliation error precision, first engine to now' },
                  { v: <>7.2s</>, l: 'to reconcile one million ledger rows' },
                  { v: <CountUp to={225} />, l: 'automated tests, plus browser acceptance tests' },
                ].map((m, i) => (
                  <li key={i} className="border-b border-r border-paper/10 p-5 last:border-r-0 md:border-b-0">
                    <p className="text-stat font-semibold">{m.v}</p>
                    <p className="mt-1 text-caption text-paper/65">{m.l}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          <GoalsSection
            index="02"
            items={[
              { goal: 'Prove detectors work', measure: 'Recall and false alarms over 200 random lab runs, against planted incidents', result: '96.6% found, 0 false alarms' },
              { goal: 'Trustworthy reconciliation', measure: 'Error precision and recall on the hard world, 8 seeds per profile', result: '0.999 precision, 0.994 recall (seed 42)' },
              { goal: 'Fast enough for a daily close', measure: 'Time to reconcile one million ledger rows', result: '7.21s on one machine' },
              { goal: 'A finding an analyst can act on', measure: 'Every finding names an owner, an amount and links to its rows', result: 'Nine findings on the dashboard, each linked' },
              { goal: 'No regressions', measure: 'Accuracy floors enforced in CI; a crippled engine must fail them', result: '225 tests; floors never lowered' },
            ]}
          />

          {/* 02 problem */}
          <section id="problem" className="scroll-mt-10">
            <SectionHead
              index="03"
              eyebrow="Problem"
              title="Three records of the same money never agree."
              lead="The internal ledger, the payment processor and the bank all record the same payments. Payments are booked twice, arrive late, settle in batches, get split, carry fees and rounding differences, and lose their references. On top of that sit the card network’s own leaks: declines, fraud, chargebacks and interchange."
            />
            <Reveal>
              <Navy>
                <p className="text-micro font-medium uppercase tracking-wide text-paper/60">How might we</p>
                <p className="mt-3 text-title font-medium sm:text-display">
                  show a payments analyst where money is leaking and what to do first, in a way they can verify rather than take on trust?
                </p>
              </Navy>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ['No real card data', 'Card data is private and regulated, so the product had to run on generated data without feeling fake.'],
                ['Free hosting', 'API on a free tier that sleeps when idle, so every screen needs an honest loading and cold-start state.'],
                ['One person, under two weeks', 'Product design, data engineering, API and front end by one person, so the scope was cut to what could be measured.'],
                ['Trust is the product', 'A detector that cannot show its hit rate is an opinion. Every claim on screen had to be graded or labelled.'],
              ].map(([t, b], i) => (
                <Reveal key={t} delay={i * 70}>
                  <div className="card h-full p-5">
                    <p className="text-body font-semibold">{t}</p>
                    <p className="mt-1 text-body-sm leading-relaxed text-subtle">{b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 03 users */}
          <section id="users" className="scroll-mt-10">
            <SectionHead
              index="04"
              eyebrow="Users and needs"
              title="Built for the analyst who answers for the money."
              lead="The primary user is a payment operations or risk analyst at a processor or a merchant: someone who closes the books, watches approval rates and owns disputes. This is a proto-persona drawn from how the job is done, not from interviews; testing it with real analysts is the next step."
            />
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal>
                <div className="card h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-violet text-body font-semibold text-ink" aria-hidden="true">PA</span>
                    <div>
                      <p className="text-heading font-semibold">The payments analyst</p>
                      <p className="text-caption text-subtle">Proto-persona · assumption to validate</p>
                    </div>
                  </div>
                  <p className="mt-5 text-micro font-medium uppercase tracking-wide text-subtle">Jobs to be done</p>
                  <ul className="mt-2 space-y-2 text-body-sm">
                    {['Know this morning what needs a decision, and how much money is at stake', 'Explain a drop in approvals before the merchant calls', 'Clear the reconciliation queue without re-checking every match', 'Catch a dispute trend before the network’s threshold does'].map((j) => (
                      <li key={j} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" aria-hidden="true" />
                        {j}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="card h-full overflow-hidden">
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
            </div>
          </section>

          {/* 04 principles */}
          <section id="principles" className="scroll-mt-10">
            <SectionHead index="05" eyebrow="Principles" title="Five rules every screen answers to." />
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ['Money first', 'A finding leads with its amount and its owner. A signed difference beats a bar that only says “not quite full”.'],
                ['Proof beside the claim', 'Every detector shows how it was graded: rules in SQL, checked by tests, scored on 200 runs.'],
                ['Readable without hovering', 'Charts carry a labelled scale and their date range. Hover adds the exact value, never the meaning.'],
                ['Two surfaces, two jobs', 'Navy panels hold analysis; lavender cards hold supporting facts. Violet is spent only on action and state.'],
                ['Honest edges', 'Cold starts, empty queues and incidents too faint to detect are named as such, never hidden.'],
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

          {/* 05 structure */}
          <section id="structure" className="scroll-mt-10">
            <SectionHead
              index="06"
              eyebrow="Structure and flow"
              title="From a claim you can test to the row behind it."
              lead="A visitor meets the proof first: the lab. An analyst starts from what needs a decision and drills down to the exact records. Every step links one level deeper."
            />
            <Reveal>
              <div className="card overflow-x-auto p-6">
                <svg viewBox="0 0 900 150" className="min-w-[640px]" role="img" aria-label="Core flow: Lab, Dashboard, Approvals, Disputes or Fees, Exception, Scorecard">
                  {['Lab', 'Dashboard', 'Approvals · Disputes · Fees', 'Exception', 'Scorecard'].map((label, i) => {
                    const x = 20 + i * 176;
                    const navy = i === 0;
                    return (
                      <g key={label}>
                        {i > 0 && <DrawPath d={`M${x - 36},62 L${x - 4},62`} className="stroke-ink" delay={i * 160} />}
                        <rect x={x} y={30} width={140} height={64} rx={18} fill={navy ? 'rgb(var(--ink))' : `rgb(var(--${['pink', 'yellow', 'sage', 'sky'][i - 1]}))`} />
                        <text x={x + 70} y={58} textAnchor="middle" className={cx('text-[12.5px] font-semibold', navy ? 'fill-paper' : 'fill-ink')}>{label}</text>
                        <text x={x + 70} y={78} textAnchor="middle" className={cx('text-[11px]', navy ? 'fill-paper/65' : 'fill-ink/60')}>
                          {['plant, then grade', 'what needs a decision', 'why it happened', 'the rows that disagree', 'how good is the engine'][i]}
                        </text>
                        <text x={x + 70} y={124} textAnchor="middle" className="fill-ink/45 text-[11px]">
                          {['/lab', '/dashboard', '/approvals …', '/exceptions', '/scorecard'][i]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </Reveal>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                { title: 'Card network', items: ['Lab', 'Dashboard', 'Approvals', 'Disputes', 'Fees'], note: 'Where money leaks' },
                { title: 'Reconciliation', items: ['Exceptions', 'Payouts'], note: 'Where records disagree' },
                { title: 'Quality', items: ['Scorecard', 'Runs', 'Ask'], note: 'How far to trust it' },
              ].map((g, i) => (
                <Reveal key={g.title} delay={i * 90}>
                  <div className="card h-full p-5">
                    <p className="flex items-baseline justify-between text-body font-semibold">
                      {g.title} <span className="text-caption font-normal text-subtle">{g.note}</span>
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {g.items.map((x) => (
                        <span key={x} className="rounded-full bg-muted px-2.5 py-0.5 text-caption font-medium">{x}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 06 decisions */}
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

          {/* 07 walkthrough */}
          <section id="walkthrough" className="scroll-mt-10">
            <SectionHead index="08" eyebrow="The product" title="Six screens, each built around one question." lead="Real screenshots of the live product, annotated the way a design review would mark them up." />
            <div className="space-y-20">
              {[
                {
                  icon: FlaskConical, title: 'Lab', q: 'Does it actually catch an attack?', img: 'lab', url: 'trueup · lab',
                  alt: 'Lab: sliders to plant an issuer outage, card-testing attack, interchange downgrades and a dispute spike; results show each incident found, with what was planted and what was detected',
                  notes: [
                    { title: 'Plant, then grade', body: 'Sliders set each incident’s size; a fresh card network is generated and four SQL detectors run in about a second.' },
                    { title: 'Planted beside detected', body: 'Each result shows what was hidden and what the detector saw, with the rule it used, so a catch can be checked.' },
                    { title: 'Too faint is named', body: 'An incident that left no trace is graded “too faint”, not counted as a win or a miss.' },
                  ],
                },
                {
                  icon: Gauge, title: 'Dashboard', q: 'What needs a decision today?', img: 'dashboard', url: 'trueup · dashboard',
                  alt: 'Dashboard: four KPI figures, a navy list of what needs attention ranked by severity, and reconciliation, disputes and fees summaries',
                  notes: [
                    { title: 'Findings, not charts, first', body: 'Nine plain-language findings ranked by severity, each linking to the rows behind it.' },
                    { title: 'One KPI row everywhere', body: 'The same four-figure header as every analysis page; currency and percent read as one token.' },
                    { title: 'Topic filters', body: 'Approvals, disputes or fees narrow the list without leaving the page.' },
                  ],
                },
                {
                  icon: ShieldAlert, title: 'Approvals', q: 'Who says no, and why?', img: 'approvals', url: 'trueup · approvals',
                  alt: 'Approvals: approval rate by day with a labelled scale, decline reasons with soft and hard tags, and approval rate by issuer',
                  notes: [
                    { title: 'A scale you can read', body: 'Three labelled gridlines on a rounded baseline, so the card-testing day at 48.9% is visible without hovering.' },
                    { title: 'Soft or hard', body: 'Every decline code says whether a retry can succeed, the question an analyst asks next.' },
                    { title: 'Slice by anything', body: 'Issuer, merchant, network, product, channel, cross-border, region or category, with drill-down.' },
                  ],
                },
                {
                  icon: Landmark, title: 'Disputes', q: 'Who is about to breach a threshold?', img: 'disputes', url: 'trueup · disputes',
                  alt: 'Disputes: a heatmap of monthly dispute ratios per merchant against monitoring thresholds, open disputes and why customers dispute',
                  notes: [
                    { title: 'Thresholds, not raw counts', body: 'Each cell is a ratio coloured against the warning and excessive programme levels.' },
                    { title: 'Complete months only', body: 'A month still drawing disputes looks cleaner than it is, so it is left out.' },
                    { title: 'Why they dispute', body: 'Visa and Mastercard reason codes with win rates and the 3-D Secure liability shift.' },
                  ],
                },
                {
                  icon: ReceiptText, title: 'Fees', q: 'Where did we pay more than the rate card?', img: 'fees', url: 'trueup · fees',
                  alt: 'Fees: where every dollar of fees goes per merchant, the rate card against what was charged, and merchant economics',
                  notes: [
                    { title: 'Every dollar placed', body: 'Interchange, scheme fees and processor margin per merchant, side by side.' },
                    { title: 'Rate card rebuilt', body: 'Charged against the published rate per segment; any difference is real, not rounding.' },
                    { title: 'Losses surfaced', body: 'Negative margins are flagged in red: a finding the data produced that was never planted.' },
                  ],
                },
                {
                  icon: Banknote, title: 'Exceptions', q: 'Which records disagree, and by how much?', img: 'exceptions', url: 'trueup · exceptions',
                  alt: 'Exceptions: a queue of open reconciliation exceptions with filters, sorted by amount at stake',
                  notes: [
                    { title: 'Sorted by money', body: 'The largest amount at stake first, with the kind of problem in words an analyst uses.' },
                    { title: 'Explain or resolve', body: 'Each item opens to what was matched and why, and every decision leaves an audit trail.' },
                    { title: 'Export', body: 'The filtered queue exports to CSV for whoever fixes it upstream.' },
                  ],
                },
              ].map((s, i) => (
                <Reveal key={s.title}>
                  <article aria-labelledby={`w-${i}`}>
                    <div className="mb-5 flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-paper" aria-hidden="true">
                        <s.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 id={`w-${i}`} className="text-title font-semibold">
                          <span className="tabular text-subtle">{String(i + 1).padStart(2, '0')}</span> {s.title}
                        </h3>
                        <p className="text-body-sm text-subtle">{s.q}</p>
                      </div>
                    </div>
                    <BrowserFrame src={`${IMG}/${s.img}.jpg`} alt={s.alt} url={s.url} />
                    <div className="mt-6">
                      <Callouts layout="row" items={s.notes} />
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 08 design system */}
          <section id="system" className="scroll-mt-10">
            <SectionHead
              index="09"
              eyebrow="Design system"
              title="A fintech palette, tokens only."
              lead="The first version borrowed a sage-and-lime palette that read like another product of mine. The design-system pass replaced it with navy, lavender and one violet accent, moved every size and colour into tokens, and documented the rules in docs/DESIGN_SYSTEM.md."
            />
            <div className="grid gap-4 lg:grid-cols-2">
              <Reveal>
                <div className="card h-full p-6">
                  <p className="text-micro font-medium uppercase tracking-wide text-subtle">Colour</p>
                  <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {[
                      ['Navy', '#10143a', 'Analysis panels, primary action'],
                      ['Lavender', '#eceefb', 'Supporting cards, tables'],
                      ['Violet', '#8f8bff', 'The one accent'],
                      ['Ink', '#0e1230', 'Text'],
                      ['Alert', '#f08c7a', 'High severity'],
                      ['Caution', '#e9c46a', 'Medium severity'],
                      ['Muted', '#555b83', 'Secondary text, 6.5:1'],
                      ['Page', '#ffffff', 'Background'],
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
                  <p className="text-micro font-medium uppercase tracking-wide text-subtle">Type scale · Urbanist</p>
                  <ul className="mt-4 space-y-2.5">
                    {[
                      ['hero', 'text-[34px] font-semibold', '56'],
                      ['display', 'text-[30px] font-semibold', '44'],
                      ['stat', 'text-[28px] font-light', '40'],
                      ['title', 'text-title font-semibold', '20'],
                      ['lead', 'text-lead', '15'],
                      ['body', 'text-body', '14'],
                      ['caption', 'text-caption', '12'],
                    ].map(([n, cls, px]) => (
                      <li key={n} className="flex items-baseline justify-between gap-4 border-b border-dashed border-border pb-2 last:border-0">
                        <span className={cx(cls, 'leading-none')}>{n === 'stat' ? '$2.5M' : 'Approvals'}</span>
                        <span className="tabular shrink-0 text-caption text-subtle">
                          {n} · {px}px
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-caption text-subtle">Shown smaller than real size. Components never use a raw pixel size.</p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={80}>
              <Navy className="mt-4">
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    ['21 → 11', 'one-off font sizes replaced by an eleven-step type scale'],
                    ['2', 'tokens renamed to what they are: teal to dark, lime to accent'],
                    ['2', 'unused components found and deleted during the pass'],
                  ].map(([v, l]) => (
                    <div key={l}>
                      <p className="tabular text-stat font-semibold">{v}</p>
                      <p className="mt-1 text-body-sm text-paper/70">{l}</p>
                    </div>
                  ))}
                </div>
              </Navy>
            </Reveal>
          </section>

          <IterationSection
            index="10"
            title="From a borrowed palette to a fintech one."
            before={{ src: `${IMG}/before.jpg`, alt: 'TrueUp dashboard before the design-system pass: sage and lime palette, title beside the KPIs' }}
            after={{ src: `${IMG}/dashboard.jpg`, alt: 'TrueUp dashboard after: navy, lavender and violet, one page header and a four-figure KPI row' }}
            changes={[
              { what: 'Sage and lime became navy, lavender and violet', why: 'The first palette read like another of my products. Navy and violet signal finance and keep colour for state.' },
              { what: 'The dashboard got the same header as every page', why: 'A two-line title squeezed beside a ring and three numbers broke the pattern every other screen follows.' },
              { what: 'Figures read as one token', why: '“2.5M $” became “$2.5M”, so a row of KPIs scans left to right without decoding units.' },
              { what: 'The chart scale became honest', why: 'A fixed 80% floor hid the card-testing day; the new scale starts just under the lowest value.' },
            ]}
          />

          {/* 09 edge cases */}
          <section id="edges" className="scroll-mt-10">
            <SectionHead index="11" eyebrow="Edge cases" title="The awkward cases, designed on purpose." />
            <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['The chart that hid the attack', 'The daily approval chart had a fixed 80% floor. The card-testing day, at 48.9%, fell below it and drew as an empty bar. The scale now starts just under the lowest value and the day is highlighted as an incident.'],
                  ['A cold API', 'The free API sleeps. Errors say so in plain words, explain the wait and offer a retry, instead of a blank panel.'],
                  ['An empty lab', 'Before the first run, the results panel previews the four detectors that will be graded, so the empty state explains itself.'],
                  ['Too faint to see', 'An outage under two timeouts or a dispute spike under five sigma is graded “too faint”, not counted for or against the detector.'],
                  ['A payout that is short', 'Payouts show the signed difference (−₹8,031.22), not a progress bar that was full on nearly every row.'],
                  ['Late is not missing', 'Payouts are judged as of a fixed date, so a late payout is not called missing too early.'],
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
                <PhoneFrame src={`${IMG}/m-lab.jpg`} alt="The lab on a phone, before the first run" />
              </Reveal>
            </div>
          </section>

          <AccessibilitySection
            index="12"
            items={[
              ['Measured contrast', 'Secondary text is 6.5:1 on white and 6.7:1 on lavender; muted text on navy is 8.2:1.'],
              ['State is never colour alone', 'Severity dots carry a label, chips carry words, and the incident day is named in the readout.'],
              ['Keyboard first', 'A skip link, landmarks and one heading per page; chart bars are focusable and named with their value.'],
              ['Works at 390px', 'Every page was checked on a phone: tables scroll inside their card, never the page.'],
            ]}
          />

          {/* 10 evidence */}
          <section id="evidence" className="scroll-mt-10">
            <SectionHead index="13" eyebrow="Evidence" title="Measured, not asserted." lead="Every figure comes from commands in the repository and is enforced in CI. Floors are set a little below the worst value seen and are never moved to make a build pass." />
            <div className="grid gap-4 lg:grid-cols-2">
              <Reveal>
                <Navy className="h-full">
                  <p className="text-body font-semibold">Lab detectors · 200 random runs</p>
                  <p className="mt-1 text-caption text-paper/65">Share of detectable incidents found. Zero false alarms in every run.</p>
                  <ul className="mt-5 space-y-3">
                    {DETECTORS.map((d) => (
                      <li key={d.name}>
                        <div className="flex justify-between text-body-sm">
                          <span>{d.name}</span>
                          <span className="tabular font-semibold">{d.recall}%</span>
                        </div>
                        <span className="mt-1.5 block h-1.5 rounded-full bg-paper/15">
                          <span className="block h-full rounded-full bg-violet" style={{ width: `${d.recall}%` }} />
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 border-t border-paper/10 pt-4 text-caption text-paper/65">Overall 96.6%. CI holds a floor of 90% recall and zero false alarms.</p>
                </Navy>
              </Reveal>
              <Reveal delay={100}>
                <div className="card h-full overflow-hidden">
                  <p className="px-5 pt-5 text-body font-semibold">Reconciliation engine · hard world, seed 42</p>
                  <p className="px-5 text-caption text-subtle">Look-alike amounts, typo’d references and missing bank references, on purpose.</p>
                  <table className="mt-4 w-full text-left">
                    <thead className="border-y border-border bg-muted">
                      <tr>
                        <th scope="col" className="th">Metric</th>
                        <th scope="col" className="th text-right">First engine</th>
                        <th scope="col" className="th text-right">Now</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {ENGINE.map((r) => (
                        <tr key={r.metric}>
                          <th scope="row" className="td font-normal">{r.metric}</th>
                          <td className="td tabular text-right text-subtle">{r.first}</td>
                          <td className="td tabular text-right font-semibold">{r.now}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="px-5 py-4 text-caption text-subtle">Stable across 8 seeds per profile: error precision 0.9969 to 1.0000 on the hard world.</p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={80}>
              <ul className="mt-4 grid gap-4 sm:grid-cols-3">
                {[
                  { v: '7.21s', l: 'to reconcile 1,000,917 ledger rows', h: 'Halved by one query rewrite: 14.3s before' },
                  { v: '0.48s', l: 'for the slowest step after tuning', h: 'An OR inside an anti-join, split into separate anti-joins: 6.3s before' },
                  { v: '225', l: 'automated tests in the Python suite', h: 'Plus browser acceptance tests and dbt tests' },
                ].map((m) => (
                  <li key={m.l} className="rounded-2xl bg-pink p-5">
                    <p className="tabular text-stat font-semibold">{m.v}</p>
                    <p className="mt-1 text-body-sm">{m.l}</p>
                    <p className="mt-1 text-caption text-ink/65">{m.h}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {/* 11 retro */}
          <section id="retro" className="scroll-mt-10">
            <SectionHead index="14" eyebrow="What went wrong" title="Honest about the misses." />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['The first engine fell over', 'It scored a perfect 1.000 on the easy world, which proved little. On the hard world, typo’d references dragged error precision to 0.561 until the matching rules were rewritten.'],
                ['A metric flattered the old engine', 'The benign false-alarm figure first counted correct errors on records with a harmless quirk. It was corrected, and the overstated number was left out rather than quoted.'],
                ['A chart hid the most important day', 'A fixed baseline made the card-testing attack invisible on the dashboard. Found in the design review, fixed with a scale derived from the data.'],
                ['Synthetic has limits', 'The world models the problems it plants. A real ledger has surprises this world does not, so the scorecard says exactly that.'],
              ].map(([t, b], i) => (
                <Reveal key={t} delay={(i % 2) * 80}>
                  <div className="h-full rounded-2xl border-l-4 border-violet bg-surface p-5">
                    <p className="text-body font-semibold">{t}</p>
                    <p className="mt-1 text-body-sm leading-relaxed text-subtle">{b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 12 next */}
          <section id="next" className="scroll-mt-10">
            <SectionHead index="15" eyebrow="Next" title="What I would do next." />
            <ol className="grid gap-4 md:grid-cols-3">
              {[
                ['Sit with three analysts', 'Watch how they work an exception queue and a dispute report before changing either, and test the proto-persona.'],
                ['Replay a real-shaped feed', 'Run an anonymised, real-shaped processor file through the pipeline to find what the synthetic world misses.'],
                ['Close the loop on findings', 'Let a resolved exception or dismissed alert feed back into the detectors’ thresholds, with the change graded.'],
              ].map(([t, b], i) => (
                <Reveal as="li" key={t} delay={i * 80}>
                  <div className="card h-full p-5">
                    <span className="tabular text-micro font-medium text-subtle">{String(i + 1).padStart(2, '0')}</span>
                    <p className="mt-2 text-body font-semibold">{t}</p>
                    <p className="mt-1 text-body-sm leading-relaxed text-subtle">{b}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal>
              <Navy className="relative mt-16 overflow-hidden sm:p-12">
                <ScaleIcon className="absolute -right-6 -top-6 h-40 w-40 text-paper/5" aria-hidden="true" />
                <h2 className="text-display font-semibold sm:text-section">Plant an attack. See if it gets caught.</h2>
                <p className="mt-3 max-w-xl text-body text-paper/70">The lab runs on the free API, so the first run can take up to a minute while it wakes.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={LAB} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full bg-violet px-5 text-body-sm font-semibold text-ink hover:brightness-105">
                    Open the lab <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a href={REPO} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full border border-paper/25 px-5 text-body-sm font-medium text-paper hover:bg-paper/10">
                    Read the source <IconBrandGithub className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </Navy>
            </Reveal>
          </section>
        </main>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-4 py-6 text-caption text-subtle sm:px-8">
          <span>All data is synthetic. No real card data was used.</span>
          <span>
            Designed and built by <Link href="/" className="font-medium text-fg hover:underline">Yuvraj Singh Shekhawat</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
