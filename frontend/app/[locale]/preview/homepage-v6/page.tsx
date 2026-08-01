/* Homepage v6 — "THE LESSON LINE" preview.

   One continuous teaching narrative: a number line runs down the page and
   the product's five surfaces happen along it, the way a real lesson moves —
   teach it at the board (1), every child practices it (2), make it exactly
   yours (3), every worksheet is also paper (4), share it in one second (5),
   keep it for the year — then the plans, the dark convergence, and the
   Class Index (the crawl-bait mesh, restyled as pinned index cards).

   Between moments, working CSS apparatus vignettes sit ON the line: the
   number balance settles level, the counting chart writes itself, letter
   tiles drop into slots, the clock sweeps a quarter hour. The hero carries
   a working rekenrek. No images above the fold; LCP = the H1.

   Promotion = import-swap in app/[locale]/page.tsx (metadata/JSON-LD there
   are untouched by this preview). */

import { getTranslations } from 'next-intl/server';
import OpeningV6 from '@/components/homepage-v6/OpeningV6';
import TeachMomentV6 from '@/components/homepage-v6/TeachMomentV6';
import PracticeMomentV6 from '@/components/homepage-v6/PracticeMomentV6';
import MakeMomentV6 from '@/components/homepage-v6/MakeMomentV6';
import BothWaysV6 from '@/components/homepage-v6/BothWaysV6';
import ShareMomentV6 from '@/components/homepage-v6/ShareMomentV6';
import KeepMomentV6 from '@/components/homepage-v6/KeepMomentV6';
import TeacherMomentV6 from '@/components/homepage-v6/TeacherMomentV6';
import CloseV6 from '@/components/homepage-v6/CloseV6';
import ToolVignette from '@/components/homepage-v6/ToolVignette';
import BrowseByTopicSSR from '@/components/homepage-v3/BrowseByTopicSSR';
import { getTypedThumbs } from '@/lib/showcase-decks';

export const revalidate = 3600;

const FALLBACK_TRAVELER =
  'https://www.lessoncraftstudio.com/en/decks/addition-find-addend-animals/thumbnail.png';

export default async function HomepageV6Preview({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepageV6' });

  // The traveler artifact: ONE worksheet in the visitor's language that
  // reappears at Make (born), Print (its paper twin) and Share (in 25
  // hands). EN keeps the hand-picked deck; DB failure falls back to it too.
  let travelerThumb = FALLBACK_TRAVELER;
  if (locale !== 'en') {
    try {
      travelerThumb = (await getTypedThumbs(locale, ['addition']))[0] ?? FALLBACK_TRAVELER;
    } catch {
      /* keep fallback */
    }
  }

  return (
    <div className="hv6-page">
      {/* THE INSTALLATION — one continuous board; everything hangs. */}
      <div className="hv6-board hv6-grain">
        <OpeningV6 locale={locale} travelerThumb={travelerThumb} />

        <div className="hv6-descent">
          <span className="hv6-wire-pulse" aria-hidden="true" />
          <TeachMomentV6 locale={locale} />
          <ToolVignette variant="balance" side="l" caption={t('teach.penBalance')} />
          <PracticeMomentV6 locale={locale} />
          <ToolVignette variant="choral" side="r" caption={t('practice.penChoral')} />
          <MakeMomentV6 locale={locale} travelerThumb={travelerThumb} />
          <ToolVignette variant="letter-tiles" side="l" caption={t('make.penTiles')} />
          <BothWaysV6 locale={locale} travelerThumb={travelerThumb} />
          <ShareMomentV6 locale={locale} travelerThumb={travelerThumb} />
          <ToolVignette variant="clock" side="r" caption={t('share.penClock')} />
          <KeepMomentV6 locale={locale} />
          <TeacherMomentV6 locale={locale} />
        </div>

        <CloseV6 locale={locale} />

        <BrowseByTopicSSR
          locale={locale}
          maxThemesPerGroup={40}
          includeGradeGroup
          includeLanguageGroup
          variant="hv6"
        />

        <div className="hv6-floorline" aria-hidden="true" />
      </div>
    </div>
  );
}
