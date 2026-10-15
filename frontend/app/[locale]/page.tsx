import { Metadata } from 'next';
import { Baloo_2, Nunito } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { buildOrganizationSchema, buildWebSiteSchema } from '@/lib/seo/organization-schema';
import GrandHall from '@/components/homepage-v10/GrandHall';
import { heroStrings } from '@/components/homepage-v10/hero-strings';
import {
  InstrumentHall,
  Playroom,
  PrintRoom,
  Studio,
  Dispatch,
  MembersRoom,
  Exit,
  titleFor,
  type RoomStrings,
  type InstrumentCard,
  type AlcoveCard,
  type WallWork,
} from '@/components/homepage-v10/Rooms';
import { buildEmbedSnippet } from '@/lib/seo/embed-snippet';
import { embedAnchor } from '@/lib/seo/embed-anchor-text';
import { deckAssets } from '@/lib/seo/landing-content';
import { canonicalUrl, localePath } from '@/lib/seo/url';
import BrowseByTopicSSR from '@/components/homepage-v3/BrowseByTopicSSR';
import { MANIPULATIVES } from '@/lib/manipulatives';
import { resolveActivityById } from '@/lib/activities';
import { getAxisName } from '@/lib/taxonomy';
import { SUBSCRIPTION_PRODUCT } from '@/config/lemonsqueezy-product-config';
import {
  selectShowcaseDecks,
  fallbackShowcase,
  selectWallDecks,
  fallbackWall,
  type ShowcaseDeck,
} from '@/lib/showcase-decks';
import { loadSetExhibit, fallbackExhibit, type SetExhibit } from '@/lib/homepage-set-exhibit';
// BOTH stylesheets: v10 reuses the twelve instrument machines and the design
// tokens from homepage-v6/ rather than copying them, which is why the root
// div below keeps the `hv6` class (token scope + focus ring) alongside hv10.
import '@/components/homepage-v6/homepage-v6.css';
import '@/components/homepage-v10/homepage-v10.css';

// Promoted 2026-08-02: homepage v10 "THE GALLERY OF LESSONS".
// v10.2 (2026-10-15): the gallery shows the NEW product structure.
//
// The gallery is DRAWN; the art is REAL. The architecture — cornice, wall,
// panelled dado, oak floor in one-point perspective, museum pedestals — is
// flat illustration built in CSS. Everything hung on a wall or standing on a
// pedestal is real product: published deck thumbnails, real apparatus
// renders, and the pure-CSS instruments from homepage-v6/, running.
//
// The hero is ONE composition at every viewport from 320 to 2560 — a poster
// that scales, not a per-device rearrangement — enforced by the dedicated
// gate at scripts/audit-hero-identity.js (poison-tested: clean <=4.7,
// broken 94.6). Past it the building continues through six numbered rooms
// plus an unnumbered exit, all wearing the same fabric, so scrolling reads
// as walking. The rooms are walked in the operator's order (2026-10-15):
// worksheets, makers, tools, activities, then share and plans; the numeral
// is a PROP passed here, so the order below is the only place it is set.
//
// WHAT v10.2 CHANGED. The page was designed when the catalogue was the 29
// generator apps; the product is now Level Sets (every worksheet face at up
// to three levels, with a class sheet and a pathway) across ~140 worksheet
// types. So: the lead placard names the structure, the hero's lead frame is
// a set triptych, the Print Room comes first and hangs one Level Set in
// full above a wall of one work of EVERY published type (rotated daily, each
// under its type's name), and the plans room is rebuilt around what the
// Teacher plan is for. The H1, the <title>, the meta description and the
// canonical are unchanged — this is an indexed page.
//
// i18n: the new strings (`homepageV6.set.*`, the rebuilt `teacher.*`, the
// lead gloss and `hero.ctaMakers`) were authored per locale in the shipped
// register and reviewed by one native + pedagogy reviewer before deploy;
// nothing is machine-translated. Level words, "Open the set", "All Level
// Sets", "Pathway" and the worksheet-type plaques come from the shipped
// `levelSets.*` strings and the taxonomy.
//
// Approved on /[locale]/preview/homepage-v10, which stays as the visual-diff
// safety net (same pattern as the v3/v4/v6 promotions). The v6 components
// remain on disk for rollback; BrowseByTopicSSR + the twelve instruments are
// shared consumers and must not be deleted.

// Direction A typography pairing per CLAUDE.md §A.13.47 (locked).
// Baloo 2 + Nunito; latin-ext covers all 11 site locales.
// Only Baloo 600/700 and Nunito 400/600/700 render any text here, so the
// weight lists are trimmed to those.
// ⚠ MEASURED AFTERWARDS: this saves NOTHING. Both families are VARIABLE fonts,
// so next/font ships one file per subset covering the whole weight range —
// production went 11 files/280KB before to 11 files/280KB after. I believed a
// dev-server reading of "4 files" and was wrong. Kept because it is accurate
// and harmless, but it is not a performance win; the real one was Poppins
// (see app/layout.tsx).
const baloo2 = Baloo_2({
  weight: ['600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-baloo-2',
  display: 'swap',
  preload: true,
});

const nunito = Nunito({
  weight: ['400', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-nunito',
  display: 'swap',
  preload: true,
});

// 1-hour ISR matches existing site pattern; visitor-facing copy churns rarely.
export const revalidate = 3600;

const BASE_URL = 'https://www.lessoncraftstudio.com';

// OG image: brand-only 1200×630 asset authored 2026-05-24 as Phase 2 of the
// SEO cleanup commission. Generated reproducibly by
// scripts/og-images/generate-homepage-og.js (Direction A palette: cream
// #FBF3E4 / teal #146B5E title / coral #F2784B accents). Locale-independent;
// served by Next.js from frontend/public/.
const OG_IMAGE_PATH = '/og-homepage.png';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  // homepage.meta namespace reused: keys are brand-level (not design-
  // specific) and already localized in all 11 locales. The v6 design swap
  // doesn't change brand positioning.
  const t = await getTranslations({ locale, namespace: 'homepage.meta' });

  // Hreflang alternates for all 11 locales.
  const hreflangAlternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    hreflangAlternates[getHreflangCode(lang)] = `${BASE_URL}/${lang}`;
  }
  hreflangAlternates['x-default'] = `${BASE_URL}/en`;

  return {
    // Brand suffix `· LessonCraftStudio` is applied by the root layout's
    // `title.template`. The `homepage.meta.title` per locale is the
    // descriptive part only.
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      type: 'website',
      url: `${BASE_URL}/${locale}`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
      images: [
        {
          url: `${BASE_URL}${OG_IMAGE_PATH}`,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: t('ogAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [{ url: `${BASE_URL}${OG_IMAGE_PATH}`, alt: t('ogAlt') }],
    },
  };
}

// Schema.org JSON-LD: Organization + WebSite. Sourced from the single
// sitewide module at `@/lib/seo/organization-schema` (see §17.8 + Phase 4
// of the SEO remediation arc). Every page that needs to identify the
// publisher references the same `@id` rather than duplicating properties.
function buildSchemas(locale: string, _title: string, description: string) {
  return [
    buildOrganizationSchema(description),
    buildWebSiteSchema(locale, description),
  ];
}

// Four instruments whose apparatus renders read well as objects on pedestals.
const INSTRUMENT_KEYS = ['rekenrek', 'number-balance', 'build-plan', 'fraction-kitchen'];
// The piece you may touch. A genuinely free tool, so the signature never
// lands a visitor on a paywall.
const TOUCHABLE = 'rekenrek';

/* The Playroom's four exhibits. Chosen from the 54 activities complete in ALL
   ELEVEN locales, not from the 204 — the visually obvious picks exist only in
   en/de, which would have left seven languages with a broken room. Four
   distinct shapes across four strands. */
const ALCOVES: Array<{ id: string; kind: 'ten-frame' | 'array' | 'shape' | 'length' }> = [
  { id: 'ten-frame.teen-numbers.make-n', kind: 'ten-frame' },
  { id: 'array.build-array.2-oa-c-4', kind: 'array' },
  { id: 'choice-board.shape-id.k-g-a-2', kind: 'shape' },
  { id: 'choice-board.compare-length.k-md-2', kind: 'length' },
];

function localized(map: Record<string, string> | undefined, locale: string) {
  return (map && (map[locale] || map.en)) || '';
}

/* ── The print room's wall size ───────────────────────────────────────────────
   The wall hangs a RECTANGLE, not a ragged stack. The CSS lays it out at
   5 / 4 / 3 / 2 columns (see `.hv10-hang`) and hides down to the largest
   whole-row multiple per band: 20 / 20 / 18 / 12. So the page always sends
   exactly TWENTY works. selectWallDecks returns one deck per published type
   (every locale has over a hundred types), and the curated EN fallback tops
   it up if it ever returns short — a real worksheet in the wrong language
   beats a hole in the wall. */
const WALL_TARGET = 20;

/* The hall: five frames (the sixth is the set triptych) plus the one deck the
   Dispatch room turns around for the loan label. selectShowcaseDecks hands
   back `count - 1` usable thumbs. */
const HALL_COUNT = 7;

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepage.meta' });
  const tv = await getTranslations({ locale, namespace: 'homepageV6' });
  const tLs = await getTranslations({ locale, namespace: 'levelSets' });

  const schemas = buildSchemas(locale, t('ogTitle'), t('description'));

  // The hall's salon hang + the loan-label deck: six generator-type decks in
  // the visitor's language (the curated EN fallback when the DB is out).
  let hall: ShowcaseDeck[] = [];
  try {
    let sel = await selectShowcaseDecks(locale, HALL_COUNT);
    if (!sel.featured && sel.thumbs.length === 0) sel = fallbackShowcase(HALL_COUNT);
    hall = sel.thumbs;
  } catch {
    hall = fallbackShowcase(HALL_COUNT).thumbs;
  }

  // The wall: one work of EVERY published type, rotated daily.
  let wallDecks: ShowcaseDeck[] = [];
  try {
    wallDecks = await selectWallDecks(locale, WALL_TARGET);
  } catch {
    wallDecks = [];
  }
  if (wallDecks.length < WALL_TARGET) {
    const seen = new Set(wallDecks.map((d) => d.slug));
    for (const d of fallbackWall(WALL_TARGET)) {
      if (wallDecks.length >= WALL_TARGET) break;
      if (!seen.has(d.slug)) wallDecks.push(d);
    }
  }
  const works: WallWork[] = wallDecks.map((d) => ({
    deck: d,
    label: getAxisName('exercise-type', d.exerciseType, locale) || titleFor(d),
  }));

  // The set: one Level Set, shown in the hero, the Print Room and the plans room.
  let exhibit: SetExhibit | null = null;
  try {
    exhibit = await loadSetExhibit(locale, tLs);
  } catch {
    exhibit = fallbackExhibit(locale, tLs);
  }

  // One builder for both routes (components/homepage-v10/hero-strings.ts):
  // the preview route is the gate target and must never drift from this page.
  const hero = heroStrings(tv);

  /* THE LOAN LABEL (Dispatch, second half). Every string it needs was already
     natively authored in all eleven locales for the v3 embed section, so the
     rebuilt block cost no translation round and nothing here is machine-
     translated. `homepageV3.embedShare.body` is deliberately NOT used: it
     promises a "one-line iframe snippet", and the block now shows the real
     one, which is eight lines. The two trust lines are accurate and concrete,
     so they carry the explanation instead. */
  const tEmbed = await getTranslations({ locale, namespace: 'homepageV3.embedShare' });
  const tCopied = await getTranslations({ locale, namespace: 'workspace.hosted' });

  const rooms: RoomStrings = {
    instrumentsH2: tv('teach.heading'),
    instrumentsBody: tv('teach.body'),
    instrumentsCta: tv('teach.seeAll'),

    playH2: tv('practice.heading'),
    playBody: tv('practice.body'),
    playCta: tv('practice.browseActivities'),

    printH2: tv('set.roomHeading'),
    printBody: tv('set.roomBody'),
    printCta: tv('practice.browseWorksheets'),
    makersCta: tv('hero.ctaMakers'),
    setEyebrow: tv('set.eyebrow'),
    setCaption: tv('set.caption'),
    setSheetLabel: tv('set.sheetLabel'),
    setPlanTag: tv('set.planTag'),
    pathwayLabel: tLs('pathway'),
    openSet: tLs('openSet'),
    allSets: tLs('allSets'),
    wallHeading: tv('set.wallHeading'),

    studioH2: tv('make.heading'),
    studioBody: tv('make.body'),
    studioMakerAlt: tv('make.makerAlt'),
    studioPlay: tv('make.forkPlay'),
    studioPrint: tv('make.forkPrint'),
    studioCta: tv('make.cta'),

    plansH2: tv('teacher.heading'),
    plansBody: tv('teacher.body'),
    plansNote: tv('teacher.honest'),
    plansReassure: tv('teacher.reassure'),
    freeTitle: tv('teacher.freeTitle'),
    freePrice: tv('teacher.freeTag'),
    // Price interpolated from the product constant, never typed: marketing
    // copy here is a claim about code behaviour.
    teacherPrice: tv('teacher.teacherPrice', { price: SUBSCRIPTION_PRODUCT.priceUsd }),
    freeItems: [tv('teacher.free1'), tv('teacher.free2'), tv('teacher.free3'), tv('teacher.free4')],
    freeCta: tv('teacher.freeCta'),
    teacherTitle: tv('teacher.teacherTitle'),
    teacherItems: [
      tv('teacher.teacher1'),
      tv('teacher.teacher2'),
      tv('teacher.teacher3'),
      tv('teacher.teacher4'),
    ],
    teacherCta: tv('teacher.teacherCta'),

    shareH2: tv('share.heading'),
    shareBody: tv('share.body'),
    shareQrAlt: tv('share.qrAlt'),
    shareChips: [tv('share.chip1'), tv('share.chip2'), tv('share.chip3'), tv('share.chip4')],
    planTag: tv('planTag'),

    embedHeadA: tEmbed('h2Line1'),
    embedHeadB: tEmbed('h2Line2'),
    embedCaption: tEmbed('mockup.snippetCaption'),
    embedCopy: tEmbed('mockup.copyCodeButton'),
    embedCopied: tCopied('copied'),
    embedFact1: tEmbed('trust1'),
    embedFact2: tEmbed('trust2'),

    closeH2: `${tv('close.line1')} ${tv('close.line2')}`,
    closeBody: tv('close.body'),
    // The way out is the plan (v10.2): the same CTA the plans room carries.
    closeCtaPrimary: tv('teacher.teacherCta'),
    closeCtaSecondary: tv('close.ctaSecondary'),
  };

  /* The Playroom's exhibits, resolved per locale. Titles and slugs are native
     in all eleven languages already; the grade band comes from the shared
     seo.educational_level namespace, which is likewise native x11. A row that
     fails to resolve is DROPPED rather than rendered half-blank. */
  const tg = await getTranslations({ locale, namespace: 'seo.educational_level' });
  const GRADE_KEY: Record<string, string> = { K: 'kindergarten', '1': 'grade_1', '2': 'grade_2', '3': 'grade_3' };
  const alcoves: AlcoveCard[] = (
    await Promise.all(
      ALCOVES.map(async (a) => {
        const row = await resolveActivityById(a.id);
        if (!row) return null;
        const title = row.page_title?.[locale] || row.page_title?.en;
        const slug = row.slug?.[locale] || row.slug?.en;
        if (!title || !slug) return null;
        const gk = GRADE_KEY[String(row.alignment?.grade ?? '')];
        return {
          id: a.id,
          kind: a.kind,
          title,
          slug,
          grade: gk ? tg(gk) : '',
        } as AlcoveCard;
      }),
    )
  ).filter(Boolean) as AlcoveCard[];

  const instruments: InstrumentCard[] = INSTRUMENT_KEYS.map((key) => {
    const m = MANIPULATIVES.find((x) => x.id === key);
    return { key, name: localized(m?.title, locale), note: localized(m?.tagline, locale) };
  }).filter((i) => i.name);

  /* The loan label shows a REAL embed snippet, not a mockup of one: the same
     buildEmbedSnippet() the worksheet landing pages call, for the same
     published deck the room already displays, with the same native anchor
     text. What is rendered is byte-for-byte what the copy button puts on the
     clipboard, and it works if pasted into a school site.

     iframeUrl is the DECK directory — the playable, self-contained deck.html
     that carries the resize emitter and the embedded-context styling. (The
     snippet baked into deck.html itself points at the landing page instead,
     because the 2026-06 canonical repoint moved __CANONICAL_URL__ there; the
     landing route's own affordance uses deckDir like this one. Retrofitting
     the baked copies is a separate commission under the §21.5a churn freeze.)

     brandHref is the deck directory too rather than the deck's landing page:
     resolving a landing means building the per-locale landing index, which
     the homepage otherwise never loads. Both targets are real pages. */
  const embedDeck = hall[5] ?? hall[0];
  const anchor = embedAnchor(locale);
  const embed = embedDeck
    ? {
        snippet: buildEmbedSnippet({
          iframeUrl: deckAssets(embedDeck.language, embedDeck.slug).deckDir,
          brandHref: deckAssets(embedDeck.language, embedDeck.slug).deckDir,
          homeHref: canonicalUrl(localePath(locale)),
          prefix: anchor.prefix,
          keyword: anchor.keyword,
          title: titleFor(embedDeck),
          id: `lcs-embed-${embedDeck.slug}`,
        }),
      }
    : undefined;

  const touch = MANIPULATIVES.find((x) => x.id === TOUCHABLE);
  const live = {
    src: `/mini-tools/${TOUCHABLE}.html?lang=${locale}&embed=compact`,
    name: localized(touch?.title, locale),
    previewUrl: `/mini-tools/tool-previews/${TOUCHABLE}.webp`,
    ctaLabel: tv('live.cta'),
    note: tv('live.note'),
    liveTag: tv('teach.liveTag'),
  };

  return (
    <>
      {/* JSON-LD structured data — Organization + WebSite. */}
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* The body stays LIGHT. The gallery paints its own walls via
          .hv10-field and .hv10-room; setting the body to a wall colour made
          the category nav unreadable, because CategoryNav is a 4%-opacity
          tint with dark text that relies on what sits behind it. */}
      <style>{`
        body { background: #FDFBF6 !important; color: #14322D; }
        body::before { display: none; }
      `}</style>

      {/* div, not main: LocaleLayoutClient already wraps children in <main>. */}
      <div className={`hv6 hv10 ${baloo2.variable} ${nunito.variable} font-lcsBody min-h-screen`}>
        <GrandHall
          locale={locale}
          decks={hall.slice(0, 5)}
          setPages={exhibit ? exhibit.pages.map((p) => p.thumbnailUrl) : undefined}
          strings={hero}
        />
        <PrintRoom locale={locale} numeral="I" works={works} exhibit={exhibit} strings={rooms} />
        <Studio locale={locale} numeral="II" strings={rooms} />
        <InstrumentHall locale={locale} numeral="III" strings={rooms} instruments={instruments} live={live} />
        <Playroom locale={locale} numeral="IV" strings={rooms} activities={alcoves} />
        <Dispatch locale={locale} numeral="V" strings={rooms} deck={embedDeck} embed={embed} />
        <MembersRoom locale={locale} numeral="VI" strings={rooms} exhibit={exhibit} />
        <Exit locale={locale} strings={rooms} />

        {/* The catalogue at the back of the building — the crawl-bait mesh
            (Do NOT remove — primary crawlable links). */}
        <div className="hv10-catalogue">
          <BrowseByTopicSSR
            locale={locale}
            maxThemesPerGroup={40}
            includeGradeGroup
            includeLanguageGroup
            variant="hv6"
          />
        </div>
      </div>
    </>
  );
}
