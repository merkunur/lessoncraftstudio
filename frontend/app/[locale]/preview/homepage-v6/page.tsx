/* Homepage v8 "OPEN HOUSE" — preview route (noindex; visual-diff safety
   net). Mirrors the live stack exactly. */

import OpeningV6 from '@/components/homepage-v6/OpeningV6';
import TeachMomentV6 from '@/components/homepage-v6/TeachMomentV6';
import PracticeMomentV6 from '@/components/homepage-v6/PracticeMomentV6';
import MakeMomentV6 from '@/components/homepage-v6/MakeMomentV6';
import ShareMomentV6 from '@/components/homepage-v6/ShareMomentV6';
import KeepMomentV6 from '@/components/homepage-v6/KeepMomentV6';
import TeacherMomentV6 from '@/components/homepage-v6/TeacherMomentV6';
import CloseV6 from '@/components/homepage-v6/CloseV6';
import BrowseByTopicSSR from '@/components/homepage-v3/BrowseByTopicSSR';
import { getTypedThumbs, selectShowcaseDecks, fallbackShowcase, type ShowcaseDeck } from '@/lib/showcase-decks';

export const revalidate = 3600;

const FALLBACK_TRAVELER =
  'https://www.lessoncraftstudio.com/en/decks/addition-find-addend-animals/thumbnail.png';

export default async function HomepageV6Preview({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';

  let travelerThumb = FALLBACK_TRAVELER;
  if (locale !== 'en') {
    try {
      travelerThumb = (await getTypedThumbs(locale, ['addition']))[0] ?? FALLBACK_TRAVELER;
    } catch {
      /* keep fallback */
    }
  }

  let fanDecks: ShowcaseDeck[] = [];
  let wallFeatured: ShowcaseDeck | null = null;
  let wallThumbs: ShowcaseDeck[] = [];
  let stackDecks: ShowcaseDeck[] = [];
  let keepDecks: ShowcaseDeck[] = [];
  let peekDecks: ShowcaseDeck[] = [];
  try {
    let sel = await selectShowcaseDecks(locale, 18);
    // DB empty/unreachable -> the curated EN fallback set (a real worksheet
    // in the wrong language beats an empty fold).
    if (!sel.featured && sel.thumbs.length === 0) sel = fallbackShowcase(18);
    const thumbs = sel.thumbs;
    wallFeatured = sel.featured;
    fanDecks = thumbs.slice(0, 5);
    wallThumbs = thumbs.slice(5, 17);
    stackDecks = thumbs.slice(1, 4);
    keepDecks = thumbs.slice(10, 13);
    peekDecks = [thumbs[6], thumbs[8]].filter(Boolean) as ShowcaseDeck[];
  } catch {
    ({ featured: wallFeatured, thumbs: wallThumbs } = (() => {
      const fb = fallbackShowcase(18);
      fanDecks = fb.thumbs.slice(0, 5);
      stackDecks = fb.thumbs.slice(1, 4);
      keepDecks = fb.thumbs.slice(10, 13);
      peekDecks = [fb.thumbs[6], fb.thumbs[8]].filter(Boolean) as ShowcaseDeck[];
      return { featured: fb.featured, thumbs: fb.thumbs.slice(5, 17) };
    })());
  }

  return (
    <div className="hv6-page">
      <div className="hv7-ground">
        <OpeningV6 locale={locale} travelerThumb={travelerThumb} fanDecks={fanDecks} />
        <TeachMomentV6 locale={locale} />
        <PracticeMomentV6 locale={locale} featured={wallFeatured} thumbs={wallThumbs} />
        <MakeMomentV6 locale={locale} travelerThumb={travelerThumb} />
        <ShareMomentV6 locale={locale} travelerThumb={travelerThumb} />
        <KeepMomentV6 locale={locale} keepDecks={keepDecks} />
        <TeacherMomentV6 locale={locale} stackDecks={stackDecks} />
        <CloseV6 locale={locale} peekDecks={peekDecks} />
        <BrowseByTopicSSR
          locale={locale}
          maxThemesPerGroup={40}
          includeGradeGroup
          includeLanguageGroup
          variant="hv6"
        />
      </div>
    </div>
  );
}
