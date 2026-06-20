import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { fetchCrossLanguageTargets, fetchCrossLanguageDecks, fetchCrossLanguageFacets } from '@/lib/cross-language-decks';
import { resolveTargetLangSlug, targetLangName, targetLangSlug } from '@/lib/target-language';
import { LearnTargetView, learnTargetH1, LEARN_LOCALES, canonicalUrl, localePath } from '../_shared';

export const revalidate = 3600;

export async function generateStaticParams(): Promise<Array<{ locale: string; targetLang: string }>> {
  const out: Array<{ locale: string; targetLang: string }> = [];
  try {
    for (const locale of LEARN_LOCALES as readonly string[]) {
      const targets = await fetchCrossLanguageTargets(locale);
      for (const tg of targets) out.push({ locale, targetLang: targetLangSlug(tg.iso, locale) });
    }
  } catch {
    // DB unreachable at build → fall back to on-demand ISR.
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; targetLang: string };
}): Promise<Metadata> {
  const { locale, targetLang } = params;
  const iso = resolveTargetLangSlug(targetLang, locale);
  if (!iso) return {};
  const t = await getTranslations({ locale, namespace: 'learnPage' });
  const langName = targetLangName(iso, locale);
  const [{ totalCount }, facets] = await Promise.all([
    fetchCrossLanguageDecks(locale, iso, {}),
    fetchCrossLanguageFacets(locale, iso),
  ]);
  const canonical = canonicalUrl(localePath(locale, 'learn', targetLang));
  // Root layout's title template appends " · LessonCraftStudio" — don't double-brand.
  const title = learnTargetH1((k, p) => t(k, p), langName);
  const description = t('learnIntro', { count: totalCount, lang: langName, themes: facets.themes.length });
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: 'website' },
  };
}

export default async function LearnTargetPage({
  params,
  searchParams,
}: {
  params: { locale: string; targetLang: string };
  searchParams?: { type?: string; page?: string };
}) {
  const { locale, targetLang } = params;
  if (!(LEARN_LOCALES as readonly string[]).includes(locale)) notFound();
  const iso = resolveTargetLangSlug(targetLang, locale);
  if (!iso) notFound();
  const { totalCount } = await fetchCrossLanguageDecks(locale, iso, {});
  if (totalCount === 0) notFound();
  return <LearnTargetView locale={locale} targetIso={iso} searchParams={searchParams} />;
}
