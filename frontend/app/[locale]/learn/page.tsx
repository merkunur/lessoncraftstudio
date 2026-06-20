import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { fetchCrossLanguageTargets } from '@/lib/cross-language-decks';
import { targetLangSlug } from '@/lib/target-language';
import { LearnHubChooser, LearnTargetView, LEARN_LOCALES, canonicalUrl, localePath } from './_shared';

// ISR: pick up newly-published cross-language decks without a rebuild (matches topic pages).
export const revalidate = 3600;

export async function generateStaticParams(): Promise<Array<{ locale: string }>> {
  return (LEARN_LOCALES as readonly string[]).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: 'learnPage' });
  const targets = await fetchCrossLanguageTargets(locale);
  // Single-target locales canonicalize to the target page (one indexed URL, no dead picker).
  const canonical = targets.length === 1
    ? canonicalUrl(localePath(locale, 'learn', targetLangSlug(targets[0].iso, locale)))
    : canonicalUrl(localePath(locale, 'learn'));
  // Root layout's title template appends " · LessonCraftStudio" — don't double-brand.
  const title = t('hubH1');
  return {
    title,
    description: t('hubIntro'),
    alternates: { canonical },
    openGraph: { title: t('hubH1'), description: t('hubIntro'), url: canonical, type: 'website' },
  };
}

export default async function LearnHubPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams?: { type?: string; page?: string };
}) {
  const locale = params.locale;
  if (!(LEARN_LOCALES as readonly string[]).includes(locale)) notFound();
  const targets = await fetchCrossLanguageTargets(locale);
  if (targets.length === 0) notFound();
  // Single-target locale (e.g. de → only English): render the target decks inline (no pointless picker).
  if (targets.length === 1) {
    return <LearnTargetView locale={locale} targetIso={targets[0].iso} searchParams={searchParams} />;
  }
  return <LearnHubChooser locale={locale} targets={targets} />;
}
