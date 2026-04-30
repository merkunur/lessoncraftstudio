import { getTranslations } from 'next-intl/server';

// Section 4 — The free experience per HOMEPAGE-COPY.md + HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.4.
// Four capability blocks with consistent card treatment. NO CTA in this section per the
// HOMEPAGE-COPY.md amendment ("catalog navigation surface is the structural footer; Section 5's
// Subscribe is the page's only conversion CTA").

export default async function FreeExperience({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage.freeExperience' });

  const blocks = [
    { key: 'browse', title: t('browse.title'), body: t('browse.body') },
    { key: 'pdf', title: t('pdf.title'), body: t('pdf.body') },
    { key: 'embed', title: t('embed.title'), body: t('embed.body') },
    { key: 'share', title: t('share.title'), body: t('share.body') },
  ];

  return (
    <section id="free" className="container mx-auto px-4 max-w-6xl py-20 md:py-28">
      <div className="max-w-3xl mb-12">
        <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink-900 tracking-tight">
          {t('sectionTitle')}
        </h2>
        <p className="mt-6 text-lg text-ink-600 leading-relaxed">
          {t('intro')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {blocks.map(block => (
          <div key={block.key}>
            <h3 className="font-display font-semibold text-xl text-ink-900 mb-3">
              {block.title}
            </h3>
            <p className="text-base text-ink-600 leading-relaxed">
              {block.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
