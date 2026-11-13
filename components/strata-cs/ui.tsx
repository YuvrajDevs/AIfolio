import type { ReactNode } from 'react';
import { cx, TONE_BG, type Tone } from './styles';

/** Strata's own primitives, copied so the case study renders in the product's design. */

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cx('flex items-center gap-2 text-lg font-semibold tracking-tight', className)}>
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="3" y="4" width="18" height="4" rx="2" fill="rgb(var(--pink))" />
        <rect x="3" y="10" width="13" height="4" rx="2" fill="rgb(var(--yellow))" />
        <rect x="3" y="16" width="8" height="4" rx="2" fill="rgb(var(--sky))" />
      </svg>
      strata
    </span>
  );
}
export function Badge({ children, tone = 'neutral', className }: { children: ReactNode; tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | Tone; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-micro font-medium',
        tone === 'neutral' && 'bg-muted text-subtle',
        tone === 'accent' && 'bg-sky text-ink',
        tone === 'success' && 'bg-success/15 text-success',
        tone === 'warning' && 'bg-warning/15 text-warning',
        tone === 'danger' && 'bg-danger/10 text-danger',
        (tone === 'yellow' || tone === 'pink' || tone === 'sage' || tone === 'sky') && `${TONE_BG[tone]} text-ink`,
        className,
      )}
    >
      {children}
    </span>
  );
}

const pct = (n: number) => `${Math.round(n * 100)}%`;

export function ConfidenceBadge({ value, state }: { value: number | null; state?: string }) {
  if (state === 'reviewed') return <Badge tone="sage">✓ Reviewed</Badge>;
  if (value === null || value === undefined) return <Badge>Unclassified</Badge>;
  const tone = value >= 0.75 ? 'success' : value >= 0.5 ? 'warning' : 'danger';
  return (
    <Badge tone={tone} className="tabular">
      {pct(value)} {state === 'pending_review' ? '· review' : ''}
    </Badge>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const tone = status === 'active' ? 'sage' : status === 'acquired' ? 'sky' : status === 'public' ? 'yellow' : 'neutral';
  return <Badge tone={tone}>{status}</Badge>;
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cx('skeleton', className)} aria-hidden="true" />;
}

export function EmptyState({ title, body, action, icon = '◇' }: { title: string; body?: ReactNode; action?: ReactNode; icon?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-heading text-subtle" aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-body font-semibold">{title}</h3>
      {body && <p className="mt-1 max-w-sm text-body text-subtle">{body}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Stat({ label, value, hint, tone, visual, children }: { label: string; value: ReactNode; hint?: ReactNode; tone?: Tone; visual?: ReactNode; children?: ReactNode }) {
  return (
    <div className={cx('flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4', tone ? cx('pastel', TONE_BG[tone]) : 'card')}>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="text-caption font-medium text-subtle">{label}</div>
        <div className="tabular mt-1 text-stat font-semibold tracking-tight">{value}</div>
        {hint && <div className="mt-0.5 text-micro text-subtle">{hint}</div>}
        {children}
      </div>
      {visual && <div className="w-full shrink-0 sm:w-[38%] sm:max-w-[120px]">{visual}</div>}
    </div>
  );
}

export function Ring({ value, max, label }: { value: number; max: number; label: string }) {
  const r = 18, c = 2 * Math.PI * r;
  const share = max ? Math.min(1, value / max) : 0;
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12 sm:ml-auto" role="img" aria-label={`${label}: ${Math.round(share * 100)}%`}>
      <circle cx="24" cy="24" r={r} fill="none" stroke="rgb(var(--ink) / 0.12)" strokeWidth="5" />
      <circle cx="24" cy="24" r={r} fill="none" stroke="rgb(var(--ink))" strokeWidth="5" strokeLinecap="round" strokeDasharray={`${share * c} ${c}`} transform="rotate(-90 24 24)" />
      <text x="24" y="27.5" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="rgb(var(--ink))">{Math.round(share * 100)}%</text>
    </svg>
  );
}

/** A labelled split: each part gets a row with its count and a bar, so the breakdown reads at a glance. */
export function SplitBars({ parts }: { parts: { key?: string; label: string; title?: string; value: number }[] }) {
  const max = Math.max(1, ...parts.map((p) => p.value));
  return (
    <ul className="space-y-1 text-micro" aria-label="Breakdown">
      {parts.map((p) => (
        <li key={p.key ?? p.label} title={p.title} className="grid grid-cols-[1fr_auto] items-center gap-x-2">
          <span className="block h-1.5 rounded-full bg-ink/10">
            <span className="block h-full rounded-full bg-ink" style={{ width: `${Math.max(4, (p.value / max) * 100)}%` }} />
          </span>
          <span className="tabular whitespace-nowrap text-ink/70">
            <span className="font-semibold text-ink">{p.value}</span> {p.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
