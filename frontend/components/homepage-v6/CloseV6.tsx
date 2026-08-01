/* CloseV6 (v8 "Open House") — the typographic close on the paper, with two
   real worksheets peeking in from the page edges (the library continues
   past the frame). No loops, stubs or hanging tags. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { ShowcaseDeck } from '@/lib/showcase-decks';

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

  return (
    <section id="close" className="relative pt-10 md:pt-14 pb-6">
      {peekDecks[0] && (
        <span className="hv7-peek-l hv7-sheet" aria-hidden="true">
          <img src={peekDecks[0].thumbnailUrl} alt={titleFor(peekDecks[0])} width={480} height={620} loading="lazy" />
        </span>
      )}
      {peekDecks[1] && (
        <span className="hv7-peek-r hv7-sheet" aria-hidden="true">
          <img src={peekDecks[1].thumbnailUrl} alt={titleFor(peekDecks[1])} width={480} height={620} loading="lazy" />
        </span>
      )}

      <div className="container mx-auto px-4 max-w-4xl text-center relative">
        <h2 className="font-lcsDisplay font-extrabold leading-[1.02] tracking-tight text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] text-[#14322D]">
          <span className="block">{t('line1')}</span>
          <span className="block text-lcs-coral">{t('line2')}</span>
        </h2>
        <p className="mt-5 font-lcsBody text-lg leading-relaxed text-[#3d574f] max-w-2xl mx-auto">
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
    </section>
  );
}
