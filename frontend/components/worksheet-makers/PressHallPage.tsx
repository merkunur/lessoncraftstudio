/* THE PRESS HALL — the full /[locale]/worksheet-makers page body.
 *
 * The works behind the homepage gallery's Studio door: the gallery is where
 * finished work hangs; this is where it is made. Shared by the live route
 * and the /preview/worksheet-makers-v2 visual-diff route so the promotion
 * commit only rewires the live page's render body.
 *
 * Everything shown is real: specimen sheets are published-deck thumbnails
 * (URLs derived slug-first via deckAssets — never DB url columns, §8.1),
 * mode chips are the maker-content mode names (11 locales, zero new
 * authoring), drawer tiles are actual image-library art. DB down → the page
 * still renders all 33 cards with drawn specimens (never throws).
 *
 * Data cost: two narrow-select deck queries (locale + en fallback) per ISR
 * revalidation — NOT fetchMakerSamples ×33 (~70–150 queries).
 */
import '@/styles/catalog-cards.css';
import './worksheet-makers.css';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Baloo_2, Nunito } from 'next/font/google';
import {
  Calculator, BookOpen, Palette, Puzzle, Lightbulb, Search, ArrowRight,
} from 'lucide-react';
import { ALL_APPS } from '@/config/products';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { localePath } from '@/lib/seo/url';
import { MAKER_KEYS, getMakerContent, makerGeneratorUrl, type MakerKey } from '@/lib/seo/maker-content';
import { getAxisName, getExerciseModeName } from '@/lib/taxonomy';
import { fetchLeadDeckCandidatesByExerciseType, type LeadDeckCandidate } from '@/lib/topic-decks';
import { deckAssets } from '@/lib/seo/landing-content';
import { wwwImg } from '@/lib/img-host';
import themeArtMap from '@/lib/topic-theme-art.json';
import MasterMachine from './MasterMachine';
import MachineCard from './MachineCard';

// Direction A typography pairing (locked §A.13.47). latin-ext covers all 11
// locales. Both are variable fonts — the weight list is documentation, not a
// payload win (measured on the homepage; see app/[locale]/page.tsx).
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

const CATEGORY_ORDER = ['math', 'literacy', 'visual', 'matching', 'puzzle', 'search'] as const;

/* The six bay inks — derived in-family from Direction A / the v10 gallery
   (NOT the raw APP_CATEGORIES marketing hexes, which are off-palette). */
const BAY_INK: Record<string, string> = {
  math: '#146B5E',
  literacy: '#D9633A',
  visual: '#9A6B2E',
  matching: '#7C4E66',
  puzzle: '#3F5B6E',
  search: '#23604E',
};

const CATEGORY_ICON: Record<string, JSX.Element> = {
  math: <Calculator size={16} strokeWidth={2.25} />,
  literacy: <BookOpen size={16} strokeWidth={2.25} />,
  visual: <Palette size={16} strokeWidth={2.25} />,
  matching: <Puzzle size={16} strokeWidth={2.25} />,
  puzzle: <Lightbulb size={16} strokeWidth={2.25} />,
  search: <Search size={16} strokeWidth={2.25} />,
};

/* PDF-only machines (§14.10 out-of-scope-for-interactive): no published
   decks, so their specimen is the drawn ruled sheet + real BW line art. */
const PDF_ONLY_ART: Record<string, string> = {
  coloring: 'animals_bw_2',
  writing: 'classroom_bw',
  'draw-and-color': 'toys_bw',
  'drawing-lines': 'vehicles_bw',
};

/* Native language names for the typesetting cases. Hardcoded with correct
   diacritics per the FooterCategoryDropdowns precedent (config LOCALE_NAMES
   ships ASCII-folded names). Locale-invariant — every visitor should find
   their own language spelled its own way. */
const NATIVE_LANGUAGE_NAMES: Record<string, string> = {
  en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español', it: 'Italiano',
  pt: 'Português', nl: 'Nederlands', sv: 'Svenska', da: 'Dansk', no: 'Norsk', fi: 'Suomi',
};

/* The open drawer's 24 curated picture blocks — strong archetypes from the
   generated theme-art index (real library art, local webp). */
const DRAWER_KEYS = [
  'animals', 'fruits', 'space', 'dinosaurs', 'ocean_life', 'vehicles',
  'insects_and_bugs', 'zoo_animals', 'farm_animals', 'weather', 'winter',
  'christmas', 'easter', 'birds', 'flowers', 'forest_creatures', 'pets',
  'toys', 'shapes', 'music', 'occupations', 'camping', 'beach', 'vegetables',
];

/* Hero: the four pictures the machine stamps + deterministic art picks. */
const HERO_CELL_KEYS = ['fruits', 'animals', 'space', 'vehicles'];

const THEME_ART: Record<string, string> = themeArtMap as Record<string, string>;
/* Corner-block pool: color art only, minus US-specific holidays (a 4th-of-July
   flag on the Finnish page reads wrong — visual-critic finding). */
const CORNER_EXCLUDE = new Set(['4th_of_july', 'thanksgivinng']);
const COLOR_THEME_KEYS = Object.keys(THEME_ART)
  .filter((k) => !k.startsWith('_') && !k.includes('_bw') && !CORNER_EXCLUDE.has(k))
  .sort();

/** Deterministic per-slug corner-art assignment (33 different real pictures
 *  across the floor — a reminder that every machine loads the same library).
 *  Assigned in render order, skipping a pick that would duplicate the
 *  IMMEDIATELY previous card's art (adjacent hammer-hammer, critic finding). */
function assignCornerArt(orderedSlugs: string[]): Map<string, string> {
  const out = new Map<string, string>();
  let prev = '';
  for (const slug of orderedSlugs) {
    let h = 0;
    for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
    let key = COLOR_THEME_KEYS[h % COLOR_THEME_KEYS.length];
    if (key === prev) key = COLOR_THEME_KEYS[(h + 1) % COLOR_THEME_KEYS.length];
    out.set(slug, THEME_ART[key]);
    prev = key;
  }
  return out;
}

/** Deterministic specimen tilt in the ±1.2–2.6° band. */
function tiltFor(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 33 + slug.charCodeAt(i)) >>> 0;
  const mag = 1.2 + (h % 15) / 10; // 1.2 .. 2.6
  return `${h % 2 === 0 ? '-' : ''}${mag.toFixed(1)}deg`;
}

function humanizeModeKey(key: string): string {
  return key.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

interface AppMeta {
  slug: string;
  name: string;
  category: string;
  htmlFile: string;
}

function listCatalogApps(locale: string): AppMeta[] {
  const apps: AppMeta[] = [];
  for (const [slug, meta] of Object.entries(ALL_APPS)) {
    const localized = locale === 'en' ? null : getAxisName('exercise-type', slug, locale);
    apps.push({ slug, name: localized ?? meta.name, category: meta.category, htmlFile: meta.htmlFile });
  }
  apps.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name, locale));
  return apps;
}

export default async function PressHallPage({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage.fourCardGrid.apps' });
  const tp = await getTranslations({ locale, namespace: 'worksheetMakersPage' });

  const apps = listCatalogApps(locale);

  /* Per-maker localized content (module-cached JSON — cheap): landing slug,
     tagline, modes. */
  const makerLandingSlug: Record<string, string> = {};
  const makerTagline: Record<string, string> = {};
  const makerName: Record<string, string> = {};
  const makerModes: Record<string, string[]> = {};
  let totalModes = 0;
  for (const key of MAKER_KEYS) {
    const c = await getMakerContent(locale, key);
    if (c && c.slug) makerLandingSlug[key] = c.slug;
    if (c?.tagline) makerTagline[key] = c.tagline;
    if (c?.name) makerName[key] = c.name;
    const modeKeys = c?.modes ? Object.keys(c.modes) : [];
    makerModes[key] = modeKeys
      .filter((k) => k !== 'default' || Boolean(c?.modeNames?.[k]))
      .map((k) => c?.modeNames?.[k] ?? getExerciseModeName(k, locale) ?? humanizeModeKey(k));
  }
  /* Canonical mode count from the EN registry (same count in every locale). */
  for (const key of MAKER_KEYS) {
    const en = await getMakerContent('en', key);
    totalModes += en?.modes ? Object.keys(en.modes).length : 0;
  }

  /* i18n leak fix (critic finding): the 4 PDF-only apps have NO taxonomy
     axis entry, so getAxisName returned null and non-EN pages showed the
     English ALL_APPS name. Their maker-content name IS localized in all 11
     locales — use it before the EN fallback. EN keeps ALL_APPS names. */
  if (locale !== 'en') {
    for (const app of apps) {
      const localized = getAxisName('exercise-type', app.slug, locale);
      if (!localized && makerName[app.slug]) app.name = makerName[app.slug];
    }
    apps.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name, locale));
  }

  /* Specimen thumbnails: ONE narrow query per locale (+ EN fallback), a few
     theme-distinct candidates per exerciseType, DB-down safe. URLs are
     slug-derived (never DB columns). The picker below then spreads THEMES
     across the floor — without it every lead deck wears the newest publish
     wave's theme and 33 different machines all print zoo animals. */
  let lead = new Map<string, LeadDeckCandidate[]>();
  let leadEn = new Map<string, LeadDeckCandidate[]>();
  try {
    lead = await fetchLeadDeckCandidatesByExerciseType(locale);
  } catch { /* DB down → drawn specimens */ }
  if (locale !== 'en') {
    try {
      leadEn = await fetchLeadDeckCandidatesByExerciseType('en');
    } catch { /* ignore */ }
  }
  const themeUse = new Map<string, number>();
  function pickCandidate(list: LeadDeckCandidate[] | undefined): LeadDeckCandidate | null {
    if (!list || list.length === 0) return null;
    let best = list[0];
    let bestUse = Infinity;
    for (const c of list) {
      const u = themeUse.get(c.theme ?? '∅') ?? 0;
      if (u < bestUse) {
        best = c;
        bestUse = u;
      }
      if (u === 0) break; // first unused theme in newest-first order wins
    }
    themeUse.set(best.theme ?? '∅', (themeUse.get(best.theme ?? '∅') ?? 0) + 1);
    return best;
  }
  const thumbBySlug = new Map<string, string>();
  function resolveThumbs(order: string[]) {
    for (const appSlug of order) {
      // picture-path decks may carry the picture-trail exerciseType alias
      const aliases = appSlug === 'picture-path' ? ['picture-path', 'picture-trail'] : [appSlug];
      let picked: { c: LeadDeckCandidate; loc: string } | null = null;
      for (const a of aliases) {
        const c = pickCandidate(lead.get(a));
        if (c) { picked = { c, loc: locale }; break; }
      }
      if (!picked) {
        for (const a of aliases) {
          const c = pickCandidate(leadEn.get(a));
          if (c) { picked = { c, loc: 'en' }; break; }
        }
      }
      if (picked) thumbBySlug.set(appSlug, wwwImg(deckAssets(picked.loc, picked.c.slug).thumbnail));
    }
  }
  function thumbFor(appSlug: string): string | null {
    return thumbBySlug.get(appSlug) ?? null;
  }

  /* Group by category, render in CATEGORY_ORDER (unknowns appended). */
  const byCategory = new Map<string, AppMeta[]>();
  for (const app of apps) {
    if (!byCategory.has(app.category)) byCategory.set(app.category, []);
    byCategory.get(app.category)!.push(app);
  }
  const orderedCategories: string[] = [];
  for (const c of CATEGORY_ORDER) if (byCategory.has(c)) orderedCategories.push(c);
  for (const c of byCategory.keys()) if (!orderedCategories.includes(c)) orderedCategories.push(c);

  /* Machine numbers No. 1–33: STABLE identity from the canonical ALL_APPS
     registry order, not the per-locale alphabetical row index — a press
     hall's machines keep their numbers in every language. ALL_APPS is
     grouped by category, so each bay still owns a contiguous number range
     (math 1–6, literacy 7–13, …) even when its cards sort differently. */
  const numberBySlug = new Map<string, number>();
  Object.keys(ALL_APPS).forEach((slug, i) => numberBySlug.set(slug, i + 1));

  /* Assign specimen thumbnails + corner art in render order (both are
     order-dependent, so they happen once here, deterministically). */
  const renderOrder = orderedCategories.flatMap((c) => (byCategory.get(c) ?? []).map((a) => a.slug));
  resolveThumbs(renderOrder);
  const cornerArtBySlug = assignCornerArt(renderOrder);

  /* Hero easel: two finished worksheets — prefer two visually distinct
     popular machines, fall back to the first thumbnails found. */
  const easelPicks: string[] = [];
  for (const pick of ['addition', 'wordsearch', 'sudoku', 'matching']) {
    const u = thumbFor(pick);
    if (u && !easelPicks.includes(u)) easelPicks.push(u);
    if (easelPicks.length === 2) break;
  }
  if (easelPicks.length < 2) {
    for (const a of apps) {
      const u = thumbFor(a.slug);
      if (u && !easelPicks.includes(u)) easelPicks.push(u);
      if (easelPicks.length === 2) break;
    }
  }

  const machineCount = MAKER_KEYS.length;

  const renderBay = (category: string, bayIndex: number) => {
    const bayApps = byCategory.get(category) ?? [];
    let categoryLabel = category;
    try {
      categoryLabel = t(`categories.${category}`);
    } catch { /* raw slug fallback */ }
    const ink = BAY_INK[category] ?? '#146B5E';
    return (
      <section
        key={category}
        id={`bay-${category}`}
        className="scroll-mt-24 mb-14 md:mb-20"
        style={{ ['--bay-ink' as string]: ink }}
      >
        <div className="flex items-end gap-4 mb-2">
          <span className="wmk-bay-num font-lcsDisplay font-bold text-6xl md:text-7xl leading-none" aria-hidden="true">
            {String(bayIndex + 1).padStart(2, '0')}
          </span>
          <div className="pb-1 min-w-0">
            <h2 className="font-lcsDisplay font-bold text-2xl md:text-3xl leading-tight text-[var(--wmk-ink)]">
              {categoryLabel}
            </h2>
            <p className="font-lcsBody text-sm font-semibold text-[#3d574f]">
              {tp('bayMachines', { count: bayApps.length })}
            </p>
          </div>
        </div>
        <div className="wmk-bay-rule w-24 mb-6" />
        <div className="wmk-bay-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {bayApps.map((app, i) => {
            const num = numberBySlug.get(app.slug)!;
            const landing = makerLandingSlug[app.slug];
            const isPdfOnly = app.slug in PDF_ONLY_ART;
            const thumb = isPdfOnly ? null : thumbFor(app.slug);
            const modes = makerModes[app.slug] ?? [];
            const shown = modes.slice(0, 3);
            const hidden = modes.length - shown.length;
            return (
              <MachineCard
                key={app.slug}
                slug={app.slug}
                name={app.name}
                tagline={makerTagline[app.slug]}
                numberLabel={tp('machineNo', { number: num })}
                bayInk={ink}
                tilt={tiltFor(app.slug)}
                landingHref={landing ? localePath(locale, 'tools', landing) : null}
                generatorHref={makerGeneratorUrl(app.slug as MakerKey, locale)}
                cta={t('cardCta')}
                thumbnailUrl={thumb}
                specimenArt={isPdfOnly ? THEME_ART[PDF_ONLY_ART[app.slug]] : undefined}
                cornerArt={cornerArtBySlug.get(app.slug)}
                modeNames={shown}
                modesMoreLabel={hidden > 0 ? tp('modesMore', { count: hidden }) : null}
                categoryIcon={CATEGORY_ICON[category] ?? CATEGORY_ICON.math}
                eager={bayIndex === 0 && i < 3}
              />
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <main className={`wmk ${baloo2.variable} ${nunito.variable} font-lcsBody min-h-screen`}>
      {/* ── A. HERO — the Press Hall ───────────────────────────────────── */}
      <header className="wmk-hero" data-bleed>
        <div className="wmk-truss" aria-hidden="true" />
        <div className="wmk-truss is-b" aria-hidden="true" />
        <div className="wmk-window is-l" aria-hidden="true" />
        <div className="wmk-window is-r" aria-hidden="true" />
        <div className="wmk-window is-l2" aria-hidden="true" />
        <div className="wmk-window is-r2" aria-hidden="true" />
        <div className="container mx-auto max-w-6xl px-4 relative z-[1]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-end gap-x-8 pt-20 md:pt-24 pb-16 md:pb-20">
            <div className="pb-6 lg:pb-14">
              <p className="wmk-hero-kicker font-lcsBody font-bold text-xs md:text-sm mb-3">
                {tp('kicker')}
              </p>
              <h1 className="wmk-hero-title font-lcsDisplay font-bold text-4xl md:text-5xl xl:text-6xl leading-[1.06] tracking-tight mb-4">
                {t('title')}
              </h1>
              <p className="wmk-hero-lede font-lcsBody text-base md:text-lg leading-relaxed max-w-xl mb-7">
                {t('description')}
              </p>
              <a
                href={`#bay-${CATEGORY_ORDER[0]}`}
                className="wmk-hero-cta inline-flex items-center gap-2 rounded-full px-6 py-3 font-lcsDisplay font-bold text-base"
              >
                {tp('heroCta')}
                <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
              </a>
            </div>
            <div className="flex justify-center lg:justify-end">
              <MasterMachine
                cellArts={HERO_CELL_KEYS.map((k) => THEME_ART[k]).filter(Boolean)}
                doneThumbs={easelPicks}
              />
            </div>
          </div>
        </div>
        <div className="wmk-hero-floor" aria-hidden="true" />
      </header>

      {/* ── B. THE WORKS LEDGER — four capability plaques ──────────────── */}
      <section className="container mx-auto max-w-6xl px-4 -mt-7 relative z-[2]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {[
            tp('statMachines', { count: machineCount }),
            tp('statModes', { count: totalModes }),
            tp('statThemes'),
            tp('statLanguages'),
          ].map((line) => (
            <div key={line} className="wmk-plaque rounded-lg px-4 pt-4 pb-3 text-center flex items-center justify-center min-h-[3.5rem] md:min-h-[4rem]">
              <p className="font-lcsDisplay font-bold text-sm md:text-base leading-snug text-[var(--wmk-teal)]">
                {line}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── C. THE MACHINE FLOOR ───────────────────────────────────────── */}
      <div className="container mx-auto max-w-6xl px-4 pt-14 md:pt-20">
        {orderedCategories.slice(0, 2).map((c) => renderBay(c, orderedCategories.indexOf(c)))}

        {/* set-piece: the picture-block cases */}
        <section className="mb-14 md:mb-20" aria-labelledby="wmk-themecase-h">
          <div className="wmk-cabinet p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6 items-center">
              <div className="px-2 md:px-4">
                <h2 id="wmk-themecase-h" className="font-lcsDisplay font-bold text-2xl md:text-3xl leading-tight text-[#FFFDF8] mb-2">
                  {tp('themeCaseTitle')}
                </h2>
                <p className="font-lcsBody text-sm md:text-base leading-relaxed text-[#F3EAD8]/90 mb-4">
                  {tp('themeCaseBody')}
                </p>
                <Link
                  href={localePath(locale, 'topic')}
                  prefetch={false}
                  className="inline-flex items-center gap-1.5 font-lcsBody font-bold text-sm text-[#FFFDF8] underline decoration-[var(--wmk-coral)] decoration-2 underline-offset-4 hover:decoration-4"
                >
                  {tp('themeCaseCta')}
                  <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
                </Link>
              </div>
              <div>
                <div className="wmk-drawer-open p-3 md:p-4">
                  <div className="grid grid-cols-6 md:grid-cols-8 gap-2">
                    {DRAWER_KEYS.map((k, i) => (
                      <span key={k} className={`wmk-drawer-tile aspect-square p-1 flex items-center justify-center ${i === 4 ? 'is-lift' : ''}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {/* w/h-full: a 0×0 lazy img never intersects → never loads */}
                        <img
                          src={encodeURI(THEME_ART[k] ?? '')}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain"
                        />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2" aria-hidden="true">
                  <div className="wmk-drawer-closed h-8 md:h-10" />
                  <div className="wmk-drawer-closed h-8 md:h-10" />
                  <div className="wmk-drawer-closed h-8 md:h-10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {orderedCategories.slice(2, 4).map((c) => renderBay(c, orderedCategories.indexOf(c)))}

        {/* set-piece: the typesetting cases */}
        <section className="mb-14 md:mb-20 text-center" aria-labelledby="wmk-langcase-h">
          <h2 id="wmk-langcase-h" className="font-lcsDisplay font-bold text-2xl md:text-3xl leading-tight text-[var(--wmk-ink)] mb-2">
            {tp('langCaseTitle')}
          </h2>
          <p className="font-lcsBody text-sm md:text-base leading-relaxed text-[#3d574f] max-w-2xl mx-auto mb-6">
            {tp('langCaseBody')}
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 max-w-3xl mx-auto">
            {SUPPORTED_LOCALES.map((l) => (
              <Link
                key={l}
                href={localePath(l, 'worksheet-makers')}
                prefetch={false}
                className={`wmk-type-plate px-4 py-2 font-lcsDisplay font-bold text-sm md:text-base ${l === locale ? 'is-current' : ''}`}
                aria-current={l === locale ? 'page' : undefined}
              >
                {NATIVE_LANGUAGE_NAMES[l] ?? l}
              </Link>
            ))}
          </div>
        </section>

        {orderedCategories.slice(4).map((c) => renderBay(c, orderedCategories.indexOf(c)))}
      </div>

      {/* ── D. DISPATCH ────────────────────────────────────────────────── */}
      <section className="wmk-dispatch">
        <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16 flex flex-col items-center gap-6">
          <div className="wmk-dispatch-stack" aria-hidden="true">
            <span className="wmk-dispatch-sheet is-1" />
            <span className="wmk-dispatch-sheet is-2" />
            <span className="wmk-dispatch-sheet is-3" />
          </div>
          <Link
            href={localePath(locale, 'worksheets')}
            prefetch={false}
            className="wmk-hero-cta inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-lcsDisplay font-bold text-base md:text-lg"
          >
            {tp('dispatchCta')}
            <ArrowRight size={19} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
