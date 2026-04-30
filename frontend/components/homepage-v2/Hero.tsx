import { getTranslations } from 'next-intl/server';

// Section 1 — Hero per HOMEPAGE-COPY.md + HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.1.
// H1 + subhead, no CTA, no scroll cue, type carries the section.
// Server component (no client interactivity needed).

export default async function Hero({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage.hero' });

  return (
    <section className="container mx-auto px-4 max-w-4xl pt-20 pb-24 md:pt-28 md:pb-32">
      <h1 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-ink-900 leading-tight tracking-tight">
        {t('title')}
      </h1>
      <p className="mt-8 text-lg md:text-xl text-ink-600 leading-relaxed max-w-3xl">
        {t('subtitle')}
      </p>
      <p className="mt-4 text-base md:text-lg font-light text-ink-500 leading-relaxed max-w-3xl">
        {t('interaction')}
      </p>
    </section>
  );
}
