/* CloseV6 (v9.1) — the last thing a teacher sees is the first tool she'll
   open: the signature rekenrek counts 3, then 7, above the closing claim.
   Two real worksheets flank the text IN FLOW — they can never be cut off
   at a viewport edge, and on ultrawide they stay beside the words instead
   of drifting to the screen corners. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { ShowcaseDeck } from '@/lib/showcase-decks';
import ToolVignette from './ToolVignette';

interface Props {
  locale: string;
  peekDecks?: ShowcaseDeck[];
}

function titleFor(deck: ShowcaseDeck): string {
  const titleMap = (deck.title ?? {}) as Record<string, string>;
  return titleMap[deck.language] || deck.slug;
}

export default async function CloseV6({ locale, peekDecks = [] }: Props) {
  const t = await getTranslations({ locale, namespace: 'homepageV6.close' });

  const flank = (deck: ShowcaseDeck | undefined, tilt: string) =>
    deck ? (
      <span
        className={`hv7-sheet ${tilt} hidden xl:block flex-none`}
        style={{ width: 'clamp(200px, 15vw, 300px)' }}
        aria-hidden="true"
      >
        <img src={deck.thumbnailUrl} alt={titleFor(deck)} width={480} height={620} loading="lazy" />
      </span>
    ) : null;

  return (
    <section id="close" className="relative pt-10 md:pt-14 pb-6">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-center gap-10 xl:gap-16">
          {flank(peekDecks[0], 'hv7-tilt-a')}

          <div className="text-center max-w-2xl">
            <div className="hv9-close-rek hidden sm:block" aria-hidden="true">
              <ToolVignette variant="rekenrek" />
            </div>
            <h2 className="font-lcsDisplay font-extrabold leading-[1.02] tracking-tight text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] text-[#14322D]">
              <span className="block">{t('line1')}</span>
              <span className="block text-lcs-coral">{t('line2')}</span>
            </h2>
            <p className="mt-5 font-lcsBody text-lg leading-relaxed text-[#3d574f] mx-auto">
              {t('body')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href={`/${locale}/auth/signup`} className="hv6-cta hv6-cta-primary hv6-cta-lg sm:whitespace-nowrap">
                {t('ctaPrimary')}
              </Link>
              <Link href={`/${locale}/worksheets/`} className="hv6-cta hv6-cta-ghost hv6-cta-lg sm:whitespace-nowrap">
                {t('ctaSecondary')}
              </Link>
            </div>
          </div>

          {flank(peekDecks[1], 'hv7-tilt-b')}
        </div>
      </div>
    </section>
  );
}
