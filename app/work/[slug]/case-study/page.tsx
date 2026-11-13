import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StrataCaseStudy, strataMeta } from './strata';
import { TrueUpCaseStudy, trueUpMeta } from './trueup';

/**
 * Full case studies, each rendered in its own product's design language (a theme class on the
 * shared case-study kit in components/case-study). Add a product here and in lib/projects.ts.
 */
const STUDIES = {
  strata: { Page: StrataCaseStudy, meta: strataMeta },
  trueup: { Page: TrueUpCaseStudy, meta: trueUpMeta },
} as const;
type Slug = keyof typeof STUDIES;
const isSlug = (s: string): s is Slug => s in STUDIES;

export function generateStaticParams() {
  return Object.keys(STUDIES).map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return isSlug(slug) ? STUDIES[slug].meta : {};
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();
  const { Page } = STUDIES[slug];
  return <Page />;
}
