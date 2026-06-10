/* /[locale]/worksheets/[slug] — Tier-3 deck LANDING route (Phase-5 pilot).
 *
 * Phase-2 spec: NEW Next.js SSR route (no trailing slash); the deck.html asset
 * stays nginx-served at /<locale>/decks/<slug>/ and repoints its canonical here.
 * Phase-3 design: Hybrid — editorial spine (cream-50 / Fraunces / ink) + Direction-A
 * card signature (white cards, dual shadow, teal structure, coral accent), teal
 * primary CTA (AA-safe), teal-outline secondaries. Phase-4 copy: gated, ledger-true.
 *
 * PILOT: Math × Kindergarten × EN only (16 coordinates). generateStaticParams emits
 * only the pilot slugs; any other slug/locale → notFound(). Does NOT touch live /topic/.
 */
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { wwwImg } from '@/lib/img-host';
import { canonicalUrl, localePath, CANONICAL_HOST } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { ogLocaleMap } from '@/lib/schema-generator';
import { buildHreflangAlternates } from '@/lib/seo/hreflang';
import { getAxisSlug } from '@/lib/taxonomy';
import {
  getLandingLocales, getLandingSlugs, getLandingBySlug, deckAssets, getSiblingLandingsByCoordinate, Landing,
} from '@/lib/seo/landing-content';

// Per-locale framework: human-facing chip + JSON-LD name. Readiness/no-standard de landings carry NO
// framework chip; standard-bearing coded landings (future de slices) cite Lehrplan / KMK Bildungsstandards.
// Never literal "Common Core" in de (STEP-0 Ruling B).
const FRAMEWORK_BY_LOCALE: Record<string, { jsonld: string; chip: string }> = {
  en: { jsonld: 'Common Core State Standards', chip: 'Common Core' },
  de: { jsonld: 'Bildungsstandards der Kultusministerkonferenz (KMK)', chip: 'Lehrplan' },
  es: { jsonld: 'Nueva Escuela Mexicana (SEP)', chip: 'Nueva Escuela Mexicana' },
};

// Per-locale UI chrome (the route was EN-hardcoded). de pages render German chrome.
const UI_STRINGS: Record<string, {
  worksheets: string; playInteractive: string; downloadPdf: string; answerKey: string;
  moreToTry: string; tryInteractive: string; makerSoon: string; comingSoon: string;
  madeWith: (t: string) => string; typeCrumb: (eyebrow: string) => string;
  playAria: (h1: string) => string; previewAlt: (h1: string) => string;
}> = {
  en: {
    worksheets: 'Worksheets', playInteractive: 'Play interactive', downloadPdf: 'Download PDF', answerKey: 'Answer key',
    moreToTry: 'More worksheets to try', tryInteractive: 'Try it — interactive', makerSoon: 'Worksheet-maker page coming soon.',
    comingSoon: 'Aligned standard — coming soon',
    madeWith: (t) => `Made with the ${t} maker`, typeCrumb: (e) => e + 's',
    playAria: (h1) => `Play ${h1}`, previewAlt: (h1) => `Preview of ${h1}`,
  },
  de: {
    worksheets: 'Arbeitsblätter', playInteractive: 'Interaktiv spielen', downloadPdf: 'PDF herunterladen', answerKey: 'Lösungen',
    moreToTry: 'Weitere Arbeitsblätter zum Ausprobieren', tryInteractive: 'Jetzt ausprobieren', makerSoon: 'Generator-Seite folgt in Kürze.',
    comingSoon: '', // de: no dashed framework chip on strand-only landings
    madeWith: (t) => `Erstellt mit dem ${t}-Generator`, typeCrumb: (e) => e.replace(/^Arbeitsblatt:\s*/, ''),
    playAria: (h1) => `${h1} spielen`, previewAlt: (h1) => `Vorschau: ${h1}`,
  },
  es: {
    worksheets: 'Hojas de trabajo', playInteractive: 'Jugar', downloadPdf: 'Descargar PDF', answerKey: 'Solución',
    moreToTry: 'Más hojas de trabajo', tryInteractive: 'Pruébalo — interactivo', makerSoon: 'Generador próximamente.',
    comingSoon: '', // es (MX): no dashed framework chip on strand-only landings (decided per coordinate at the es ledger)
    madeWith: (t) => `Hecho con el generador de ${t}`, typeCrumb: (e) => e,
    playAria: (h1) => `Jugar ${h1}`, previewAlt: (h1) => `Vista previa de ${h1}`,
  },
};

export const revalidate = 3600;

export function generateStaticParams() {
  const out: { locale: string; slug: string }[] = [];
  for (const locale of getLandingLocales()) {
    for (const slug of getLandingSlugs(locale)) out.push({ locale, slug });
  }
  return out;
}

function metaDescription(l: Landing): string {
  // First sentence(s) of P1, trimmed to ~155 chars on a word boundary.
  const s = l.p1.replace(/\s+/g, ' ').trim();
  if (s.length <= 158) return s;
  return s.slice(0, 155).replace(/\s+\S*$/, '') + '…';
}

function typeHubSlug(l: Landing, locale: string): string {
  return getAxisSlug('exercise-type', l.coordinate.type, locale) || l.coordinate.type;
}
function themeHubSlug(l: Landing, locale: string): string {
  return getAxisSlug('theme', l.coordinate.theme, locale) || l.coordinate.theme;
}

export async function generateMetadata(
  { params }: { params: { locale: string; slug: string } },
): Promise<Metadata> {
  const l = getLandingBySlug(params.locale, params.slug);
  if (!l) return {};
  const canonical = canonicalUrl(localePath(params.locale, 'worksheets', l.slug));
  // Gold per-deck meta when authored (demand-aware, not a p1 truncation), else truncated p1.
  const description = l.metaDescription || metaDescription(l);
  // Root layout's title template appends " · LessonCraftStudio" — don't double-brand.
  // Gold per-deck <title> when present (e.g. MX "hojas de trabajo"-anchored), else the h1.
  const title = l.title || l.h1;

  // Cross-locale hreflang: this coordinate + its siblings in other locales (matched on type+mode+theme,
  // NOT level — level is re-derived per locale). buildHreflangAlternates owns the code map (pt→pt-BR) + x-default→en.
  const slugByLocale: Record<string, string> = { [params.locale]: l.slug };
  for (const s of getSiblingLandingsByCoordinate(l.coordinate, params.locale)) slugByLocale[s.locale] = s.slug;
  const languages = buildHreflangAlternates(
    getLandingLocales(),
    (loc) => (slugByLocale[loc] ? canonicalUrl(localePath(loc, 'worksheets', slugByLocale[loc])) : null),
    CANONICAL_HOST,
  );

  const og = deckAssets(params.locale, l.canonicalDeckSlug).thumbnail;
  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title: l.h1, description, type: 'article', url: canonical, siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[params.locale] || params.locale,
      images: [{ url: og, alt: l.h1 }],
    },
    twitter: { card: 'summary_large_image', title: l.h1, description, images: [{ url: og, alt: l.h1 }] },
    robots: { index: true, follow: true },
  };
}

export default function WorksheetLandingPage(
  { params }: { params: { locale: string; slug: string } },
) {
  const { locale } = params;
  const l = getLandingBySlug(locale, params.slug);
  if (!l) notFound();
  const ui = UI_STRINGS[locale] || UI_STRINGS.en;
  const fw = FRAMEWORK_BY_LOCALE[locale] || FRAMEWORK_BY_LOCALE.en;

  const a = deckAssets(locale, l.canonicalDeckSlug);
  const canonical = canonicalUrl(localePath(locale, 'worksheets', l.slug));
  const typeHub = localePath(locale, 'topic', typeHubSlug(l, locale));
  const themeHub = localePath(locale, 'topic', themeHubSlug(l, locale));
  const intersection = localePath(locale, 'topic', themeHubSlug(l, locale), typeHubSlug(l, locale));

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: ui.worksheets, path: localePath(locale, 'worksheets') },
    { name: ui.typeCrumb(l.eyebrow), path: typeHub },
    { name: l.h1, path: localePath(locale, 'worksheets', l.slug) },
  ]);

  // Per-entry educational level. SINGLE band via coordinate.level, OR an honest grade
  // SPAN via l.levels (ordered low→high band keys) when a worksheet genuinely suits >1
  // grade. Span → range chip ("Kindergarten–Grade 1") + array educationalLevel + range
  // typicalAgeRange. Absent l.levels → single-band path is byte-equivalent to before
  // (zero regression to shipped single-band landings). Defaults to kindergarten.
  const LEVELS: Record<string, { chip: string; schema: string; age: string }> = {
    'preschool': { chip: 'Preschool', schema: 'Preschool', age: '3-4' },
    'kindergarten': { chip: 'Kindergarten', schema: 'Kindergarten', age: '5-6' },
    'grade-1': { chip: 'Grade 1', schema: 'Grade 1', age: '6-7' },
    'grade-2': { chip: 'Grade 2', schema: 'Grade 2', age: '7-8' },
    // de 3-band axis (STEP-0): Vorschule / 1. Klasse / 2. Klasse. coordinate.level is re-derived per locale.
    'vorschule': { chip: 'Vorschule', schema: 'Vorschule', age: '5-6' },
    '1-klasse': { chip: '1. Klasse', schema: '1. Klasse', age: '6-7' },
    '2-klasse': { chip: '2. Klasse', schema: '2. Klasse', age: '7-8' },
    // es MX bands (Mexican Spanish): Educación Preescolar (por años) + primer/segundo grado de primaria.
    'preescolar': { chip: 'Preescolar (5 años)', schema: 'Educación Preescolar', age: '5-6' },
    'primer-grado': { chip: 'Primer grado', schema: 'Primer grado de primaria', age: '6-7' },
    'segundo-grado': { chip: 'Segundo grado', schema: 'Segundo grado de primaria', age: '7-8' },
  };
  const _bandKeys = l.levels && l.levels.length ? l.levels : [l.coordinate.level];
  const _bands = _bandKeys.map((k) => LEVELS[k]).filter(Boolean);
  const _safe = _bands.length ? _bands : [LEVELS['kindergarten']];
  const _isSpan = _safe.length > 1;
  const _lo = _safe[0];
  const _hi = _safe[_safe.length - 1];
  const lvl = {
    chip: _isSpan ? `${_lo.chip}–${_hi.chip}` : _lo.chip,
    age: _isSpan ? `${_lo.age.split('-')[0]}-${_hi.age.split('-')[1]}` : _lo.age,
  };
  // schema.org educationalLevel: single string (single band) or array (span).
  const educationalLevelValue: string | string[] = _isSpan ? _safe.map((b) => b.schema) : _lo.schema;

  const learningResource = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: l.h1,
    description: metaDescription(l),
    url: canonical,
    inLanguage: locale,
    isAccessibleForFree: true,
    learningResourceType: 'Worksheet',
    educationalLevel: educationalLevelValue,
    typicalAgeRange: lvl.age,
    teaches: l.strand,
    image: a.thumbnail,
    creator: { '@type': 'Organization', name: 'LessonCraftStudio', url: CANONICAL_HOST },
    audience: { '@type': 'EducationalAudience', educationalRole: 'student' },
  } as Record<string, unknown>;
  // Standard-bearing landings carry an explicit CCSS educationalAlignment; strand-only landings (no l.standard)
  // are unchanged (Phase-4 flag-5 deferral). Shape matches the established activity-page pattern
  // (alignmentType 'educationalSubject' + targetName + educationalFramework, NO targetUrl — corestandards.org
  // standard pages 404, and the code in targetName is the durable machine anchor).
  if (l.standard) {
    learningResource.educationalAlignment = {
      '@type': 'AlignmentObject',
      alignmentType: 'educationalSubject',
      educationalFramework: fw.jsonld,
      targetName: l.standard,
    };
  }

  // Quiz rich-result (Google "Practice problems"): a SEPARATE third JSON-LD node,
  // emitted ONLY when the landing carries ≥2 practiceProblems (qualifying families
  // per fancy-orbit §348; honest-fit — each q mirrors what the child sees). Distinct
  // @type from LearningResource/BreadcrumbList; the CCSS code may legitimately repeat.
  const quizSchema = (l.practiceProblems && l.practiceProblems.length >= 2) ? {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: l.h1,
    about: { '@type': 'Thing', name: l.strand },
    educationalLevel: educationalLevelValue,
    ...(l.standard ? { educationalAlignment: {
      '@type': 'AlignmentObject',
      alignmentType: 'educationalSubject',
      educationalFramework: fw.jsonld,
      targetName: l.standard,
    } } : {}),
    hasPart: l.practiceProblems.map((p) => ({
      '@type': 'Question',
      eduQuestionType: 'Flashcard',
      text: p.q,
      acceptedAnswer: { '@type': 'Answer', text: p.a },
    })),
  } : null;

  const SHADOW = 'shadow-[0_2px_8px_rgba(20,30,28,0.08),_0_24px_56px_rgba(20,30,28,0.12)]';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {quizSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }} />}

      <main className="bg-cream-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl py-8 md:py-12">

          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-ink-500 flex flex-wrap items-center gap-x-2 gap-y-1 mb-6">
            <Link href={localePath(locale, 'worksheets')} className="hover:text-ink-900">{ui.worksheets}</Link>
            <span aria-hidden="true" className="text-cream-300">›</span>
            <Link href={typeHub} className="hover:text-ink-900">{ui.typeCrumb(l.eyebrow)}</Link>
            {locale === 'en' && (
              <>
                <span aria-hidden="true" className="text-cream-300">›</span>
                <Link href={intersection} className="hover:text-ink-900 hidden sm:inline">{cap(l.coordinate.theme)} · {l.eyebrow.replace(' Worksheet', '')}</Link>
              </>
            )}
            <span aria-hidden="true" className="text-cream-300 hidden sm:inline">›</span>
            <span className="text-ink-900 font-medium" aria-current="page">{l.h1}</span>
          </nav>

          {/* hero */}
          <section className="grid md:grid-cols-[minmax(0,340px)_1fr] gap-8 md:gap-10 items-start mb-12">
            <div className={`bg-white rounded-2xl overflow-hidden ${SHADOW} relative`}>
              <a href={a.deckDir} aria-label={ui.playAria(l.h1)} className="block relative aspect-[480/620]">
                <Image src={wwwImg(a.thumbnail)} alt={ui.previewAlt(l.h1)} fill sizes="(max-width:767px) 90vw, 340px" className="object-cover" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#146B5E] text-white grid place-items-center shadow-lg" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-0.5"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </a>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#D9633A] mb-3 flex items-center gap-2.5">
                <span className="inline-block w-9 h-[3px] rounded bg-[#F2784B]" />{l.eyebrow}
              </p>
              <h1 className="font-display font-bold text-3xl md:text-4xl leading-tight text-ink-900 mb-4">{l.h1}</h1>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 bg-[#E3EEEB] text-[#0E544A] font-semibold text-sm rounded-full px-3 py-1.5">{lvl.chip}</span>
                <span className="inline-flex items-center gap-1.5 bg-[#E3EEEB] text-[#0E544A] font-semibold text-sm rounded-full px-3 py-1.5">{l.strand}</span>
                {l.standard ? (
                  <span className="inline-flex items-center gap-1.5 bg-[#FBEDE6] text-[#9A4521] font-semibold text-sm rounded-full px-3 py-1.5">{fw.chip}</span>
                ) : ui.comingSoon ? (
                  <span className="inline-flex items-center gap-1.5 border border-dashed border-cream-300 text-ink-500 italic text-sm rounded-full px-3 py-1.5">{ui.comingSoon}</span>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={a.deckDir} className="inline-flex items-center gap-2 font-bold text-[15px] rounded-full px-6 py-3 bg-[#146B5E] text-white hover:bg-[#0E544A] transition-colors shadow-[0_4px_0_rgba(15,60,53,0.38),_0_10px_20px_-6px_rgba(20,107,94,0.4)]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M8 5v14l11-7z" /></svg>{ui.playInteractive}
                </a>
                <a href={a.pdf} className="inline-flex items-center gap-2 font-bold text-[15px] rounded-full px-6 py-3 bg-white text-[#146B5E] border-2 border-[#146B5E] hover:bg-[#E3EEEB] transition-colors">
                  {ui.downloadPdf}
                </a>
                <a href={a.answerKey} className="inline-flex items-center gap-2 font-bold text-[15px] rounded-full px-6 py-3 bg-white text-[#146B5E] border-2 border-[#146B5E] hover:bg-[#E3EEEB] transition-colors">
                  {ui.answerKey}
                </a>
              </div>
            </div>
          </section>

          {/* body */}
          <section className="max-w-3xl mb-12">
            <div className="prose-none text-ink-700 leading-relaxed text-base md:text-[17px] space-y-4">
              <p>{l.p1}</p>
              <p>{l.p2}</p>
              <p>{l.p3}</p>
            </div>
          </section>

          {/* embedded playable deck */}
          <section className="mb-12">
            <div className={`bg-white rounded-3xl p-4 md:p-5 ${SHADOW} max-w-3xl`}>
              <h2 className="font-display font-bold text-lg text-[#146B5E] flex items-center gap-2 mb-3 px-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2FA56A]" />{ui.tryInteractive}
              </h2>
              <iframe
                src={a.deckDir}
                title={ui.playAria(l.h1)}
                loading="lazy"
                className="w-full rounded-2xl border border-cream-300 bg-[#FBF6EE]"
                style={{ aspectRatio: '800 / 1000', minHeight: 480 }}
              />
            </div>
          </section>

          {/* related carousel — gated: omit the section entirely when there are no honest same-(type,mode) siblings (e.g. the first landing of a new mode), never render a bare heading over an empty grid */}
          {l.carousel.length > 0 && (
          <section className="mb-12">
            <h2 className="font-display font-bold text-xl text-ink-900 mb-5">{ui.moreToTry}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {l.carousel.map((c) => {
                const cl = getLandingBySlug(locale, c.href);
                const cthumb = cl ? deckAssets(locale, cl.canonicalDeckSlug).thumbnail : null;
                return (
                <Link key={c.href} href={localePath(locale, 'worksheets', c.href)}
                  className={`block bg-white rounded-2xl overflow-hidden border border-cream-300 hover:-translate-y-0.5 transition-transform ${SHADOW}`}>
                  <div className="relative aspect-[4/3] bg-[#FBF6EE] border-b border-cream-300">
                    {cthumb && <Image src={wwwImg(cthumb)} alt={c.label} fill sizes="(max-width:1023px) 45vw, 240px" className="object-cover" />}
                  </div>
                  <div className="p-3.5">
                    <p className="font-display font-semibold text-[15px] text-ink-900 leading-snug">{c.label}</p>
                  </div>
                </Link>
                );
              })}
            </div>
          </section>
          )}

          {/* reserved app block (Ruling #7 — wired to nothing) */}
          <section className="mb-4">
            <div className="rounded-2xl border-2 border-dashed border-cream-300 bg-[repeating-linear-gradient(45deg,rgba(20,107,94,0.02),rgba(20,107,94,0.02)_10px,transparent_10px,transparent_20px)] p-7 text-center">
              <p className="font-display font-semibold text-ink-700 text-[17px]">{ui.madeWith(ui.typeCrumb(l.eyebrow))}</p>
              <p className="text-ink-500 text-sm mt-1">{ui.makerSoon}</p>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}

function cap(s: string): string {
  return s.replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}
