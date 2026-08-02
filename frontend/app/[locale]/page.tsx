import { Metadata } from 'next';
import { Baloo_2, Nunito } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { buildOrganizationSchema, buildWebSiteSchema } from '@/lib/seo/organization-schema';
import GrandHall from '@/components/homepage-v10/GrandHall';
import {
  InstrumentHall,
  PrintRoom,
  Studio,
  MembersRoom,
  Exit,
  type RoomStrings,
  type InstrumentCard,
} from '@/components/homepage-v10/Rooms';
import BrowseByTopicSSR from '@/components/homepage-v3/BrowseByTopicSSR';
import { MANIPULATIVES } from '@/lib/manipulatives';
import { SUBSCRIPTION_PRODUCT } from '@/config/lemonsqueezy-product-config';
import { selectShowcaseDecks, fallbackShowcase, type ShowcaseDeck } from '@/lib/showcase-decks';
// BOTH stylesheets: v10 reuses the twelve instrument machines and the design
// tokens from homepage-v6/ rather than copying them, which is why the root
// div below keeps the `hv6` class (token scope + focus ring) alongside hv10.
import '@/components/homepage-v6/homepage-v6.css';
import '@/components/homepage-v10/homepage-v10.css';

// Promoted 2026-08-02: homepage v10 "THE GALLERY OF LESSONS".
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
// broken 94.6). Past it the building continues through five rooms wearing
// the same fabric, so scrolling reads as walking.
//
// i18n: nothing here is machine-translated and nothing new was authored.
// Prose comes from the `homepageV6` namespace (already native x11 and
// already tier-truthful), instrument names from MANIPULATIVES (native per
// tool), and the room numbers are Roman numerals — language-neutral by
// construction.
//
// Approved on /[locale]/preview/homepage-v10, which stays as the visual-diff
// safety net (same pattern as the v3/v4/v6 promotions). The v6 components
// remain on disk for rollback; BrowseByTopicSSR + the twelve instruments are
// shared consumers and must not be deleted.

// Direction A typography pairing per CLAUDE.md §A.13.47 (locked).
// Baloo 2 + Nunito; latin-ext covers all 11 site locales.
const baloo2 = Baloo_2({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-baloo-2',
  display: 'swap',
  preload: true,
});

const nunito = Nunito({
  weight: ['400', '500', '600', '700'],
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

function localized(map: Record<string, string> | undefined, locale: string) {
  return (map && (map[locale] || map.en)) || '';
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepage.meta' });
  const tv = await getTranslations({ locale, namespace: 'homepageV6' });

  const schemas = buildSchemas(locale, t('ogTitle'), t('description'));

  // ONE showcase fetch feeds the whole building: the hall's salon hang (6)
  // and the print room's wall (the rest). DB failure -> the curated EN
  // fallback set; a real worksheet in the wrong language beats an empty wall.
  let decks: ShowcaseDeck[] = [];
  try {
    let sel = await selectShowcaseDecks(locale, 18);
    if (!sel.featured && sel.thumbs.length === 0) sel = fallbackShowcase(18);
    decks = sel.thumbs;
  } catch {
    decks = fallbackShowcase(18).thumbs;
  }

  const hero = {
    h1: tv('hero.h1'),
    sub: tv('hero.sub'),
    ctaTools: tv('hero.ctaTools'),
    ctaWorksheets: tv('hero.ctaWorksheets'),
    hallLabel: tv('hero.fanLabel'),
  };

  const rooms: RoomStrings = {
    instrumentsH2: tv('teach.heading'),
    instrumentsBody: tv('teach.body'),
    instrumentsCta: tv('teach.seeAll'),

    printH2: tv('practice.heading'),
    printBody: tv('practice.body'),
    printCta: tv('practice.browseWorksheets'),
    activitiesCta: tv('practice.browseActivities'),

    studioH2: tv('make.heading'),
    studioBody: tv('make.body'),
    studioMakerAlt: tv('make.makerAlt'),
    studioPlay: tv('make.forkPlay'),
    studioPrint: tv('make.forkPrint'),
    studioCta: tv('make.cta'),

    plansH2: tv('teacher.heading'),
    plansBody: tv('teacher.body'),
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

    closeH2: `${tv('close.line1')} ${tv('close.line2')}`,
    closeBody: tv('close.body'),
    closeCtaPrimary: tv('close.ctaPrimary'),
    closeCtaSecondary: tv('close.ctaSecondary'),
  };

  const instruments: InstrumentCard[] = INSTRUMENT_KEYS.map((key) => {
    const m = MANIPULATIVES.find((x) => x.id === key);
    return { key, name: localized(m?.title, locale), note: localized(m?.tagline, locale) };
  }).filter((i) => i.name);

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
        <GrandHall locale={locale} decks={decks.slice(0, 6)} strings={hero} />
        <InstrumentHall locale={locale} strings={rooms} instruments={instruments} live={live} />
        <PrintRoom locale={locale} decks={decks.slice(6)} strings={rooms} />
        <Studio locale={locale} strings={rooms} />
        <MembersRoom locale={locale} strings={rooms} />
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
