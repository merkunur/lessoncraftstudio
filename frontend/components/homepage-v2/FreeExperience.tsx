import { getTranslations } from 'next-intl/server';
import BreadthGrid from './BreadthGrid';

// Section 4 — The free experience per HOMEPAGE-COPY-DRAFT-v1.md.
// Four capability blocks with consistent card treatment + a single soft CTA below the
// blocks pointing to the structural footer (where catalog navigation lives). Per draft
// note 4: "Links to a structural footer-driven path. No account-creation CTA in this
// section — the free experience does not require an account."
//
// Arc 3 (2026-05-06): the BreadthGrid that was previously Section 2 is demoted into
// this section as a "see one in action" sub-section below the 4 capability blocks.
// Algorithm preserved at `e5bb3cb4` 4-family hybrid composition; only the render
// position changes. Sub-section sits adjacent to the embed/share capability copy
// so the live samples reinforce the embed-virality + share-link affordances the
// blocks describe.

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mb-16">
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

      {/* Demoted BreadthGrid sub-section — Arc 3. Reinforces the embed/share
          capability copy above with live deck samples the visitor can play
          immediately. The grid uses the existing 4-family-hybrid algorithm
          (selectBreadthGridDecks) so featured-deck choice stays coherent
          with EmbedViralityCTA's per-locale featured-deck selection. */}
      <div className="max-w-3xl mb-8">
        <h3 className="font-display font-semibold text-2xl md:text-3xl text-ink-900 tracking-tight">
          {t('breadthHeading')}
        </h3>
        <p className="mt-3 text-base md:text-lg text-ink-600 leading-relaxed">
          {t('breadthIntro')}
        </p>
      </div>
      <div className="mb-12">
        <BreadthGrid locale={locale} />
      </div>

      <a
        href="#footer"
        className="inline-flex items-center text-base font-medium text-leaf-700 hover:text-leaf-800 hover:underline"
      >
        {t('cta')}
      </a>
    </section>
  );
}
