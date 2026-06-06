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
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { getAxisSlug } from '@/lib/taxonomy';
import {
  getLandingLocales, getLandingSlugs, getLandingBySlug, deckAssets, Landing,
} from '@/lib/seo/landing-content';

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
  const description = metaDescription(l);
  // Root layout's title template appends " · LessonCraftStudio" — don't double-brand.
  const title = l.h1;

  // EN-only pilot: the coordinate exists only in en, so honest hreflang = en + x-default.
  const languages: Record<string, string> = {};
  languages[getHreflangCode(params.locale)] = canonical;
  languages['x-default'] = canonical;

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

  const a = deckAssets(locale, l.canonicalDeckSlug);
  const canonical = canonicalUrl(localePath(locale, 'worksheets', l.slug));
  const typeHub = localePath(locale, 'topic', typeHubSlug(l, locale));
  const themeHub = localePath(locale, 'topic', themeHubSlug(l, locale));
  const intersection = localePath(locale, 'topic', themeHubSlug(l, locale), typeHubSlug(l, locale));

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Worksheets', path: localePath(locale, 'worksheets') },
    { name: l.eyebrow + 's', path: typeHub },
    { name: l.h1, path: localePath(locale, 'worksheets', l.slug) },
  ]);

  const learningResource = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: l.h1,
    description: metaDescription(l),
    url: canonical,
    inLanguage: locale,
    isAccessibleForFree: true,
    learningResourceType: 'Worksheet',
    educationalLevel: 'Kindergarten',
    typicalAgeRange: '5-6',
    teaches: l.strand,
    image: a.thumbnail,
    creator: { '@type': 'Organization', name: 'LessonCraftStudio', url: CANONICAL_HOST },
    audience: { '@type': 'EducationalAudience', educationalRole: 'student' },
  } as Record<string, unknown>;
  // Standard-bearing landings carry an explicit CCSS educationalAlignment; strand-only landings (no l.standard)
  // are unchanged (Phase-4 flag-5 deferral). targetUrl is the canonical corestandards.org Math content URL.
  if (l.standard) {
    learningResource.educationalAlignment = {
      '@type': 'AlignmentObject',
      alignmentType: 'teaches',
      educationalFramework: 'Common Core State Standards',
      targetName: l.standard,
      targetUrl: `http://www.corestandards.org/Math/Content/${l.standard.replace(/\./g, '/')}/`,
    };
  }

  const SHADOW = 'shadow-[0_2px_8px_rgba(20,30,28,0.08),_0_24px_56px_rgba(20,30,28,0.12)]';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="bg-cream-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl py-8 md:py-12">

          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-ink-500 flex flex-wrap items-center gap-x-2 gap-y-1 mb-6">
            <Link href={localePath(locale, 'worksheets')} className="hover:text-ink-900">Worksheets</Link>
            <span aria-hidden="true" className="text-cream-300">›</span>
            <Link href={typeHub} className="hover:text-ink-900">{l.eyebrow}s</Link>
            <span aria-hidden="true" className="text-cream-300">›</span>
            <Link href={intersection} className="hover:text-ink-900 hidden sm:inline">{cap(l.coordinate.theme)} · {l.eyebrow.replace(' Worksheet', '')}</Link>
            <span aria-hidden="true" className="text-cream-300 hidden sm:inline">›</span>
            <span className="text-ink-900 font-medium" aria-current="page">{l.h1}</span>
          </nav>

          {/* hero */}
          <section className="grid md:grid-cols-[minmax(0,340px)_1fr] gap-8 md:gap-10 items-start mb-12">
            <div className={`bg-white rounded-2xl overflow-hidden ${SHADOW} relative`}>
              <a href={a.deckDir} aria-label={`Play ${l.h1}`} className="block relative aspect-[480/620]">
                <Image src={wwwImg(a.thumbnail)} alt={`Preview of ${l.h1}`} fill sizes="(max-width:767px) 90vw, 340px" className="object-cover" />
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
                <span className="inline-flex items-center gap-1.5 bg-[#E3EEEB] text-[#0E544A] font-semibold text-sm rounded-full px-3 py-1.5">Kindergarten</span>
                <span className="inline-flex items-center gap-1.5 bg-[#E3EEEB] text-[#0E544A] font-semibold text-sm rounded-full px-3 py-1.5">{l.strand}</span>
                {l.standard ? (
                  <span className="inline-flex items-center gap-1.5 bg-[#FBEDE6] text-[#9A4521] font-semibold text-sm rounded-full px-3 py-1.5">Common Core</span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 border border-dashed border-cream-300 text-ink-500 italic text-sm rounded-full px-3 py-1.5">Aligned standard — coming soon</span>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={a.deckDir} className="inline-flex items-center gap-2 font-bold text-[15px] rounded-full px-6 py-3 bg-[#146B5E] text-white hover:bg-[#0E544A] transition-colors shadow-[0_4px_0_rgba(15,60,53,0.38),_0_10px_20px_-6px_rgba(20,107,94,0.4)]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M8 5v14l11-7z" /></svg>Play interactive
                </a>
                <a href={a.pdf} className="inline-flex items-center gap-2 font-bold text-[15px] rounded-full px-6 py-3 bg-white text-[#146B5E] border-2 border-[#146B5E] hover:bg-[#E3EEEB] transition-colors">
                  Download PDF
                </a>
                <a href={a.answerKey} className="inline-flex items-center gap-2 font-bold text-[15px] rounded-full px-6 py-3 bg-white text-[#146B5E] border-2 border-[#146B5E] hover:bg-[#E3EEEB] transition-colors">
                  Answer key
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
                <span className="w-2.5 h-2.5 rounded-full bg-[#2FA56A]" />Try it — interactive
              </h2>
              <iframe
                src={a.deckDir}
                title={`Play ${l.h1}`}
                loading="lazy"
                className="w-full rounded-2xl border border-cream-300 bg-[#FBF6EE]"
                style={{ aspectRatio: '800 / 1000', minHeight: 480 }}
              />
            </div>
          </section>

          {/* related carousel */}
          <section className="mb-12">
            <h2 className="font-display font-bold text-xl text-ink-900 mb-5">More worksheets to try</h2>
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

          {/* reserved app block (Ruling #7 — wired to nothing) */}
          <section className="mb-4">
            <div className="rounded-2xl border-2 border-dashed border-cream-300 bg-[repeating-linear-gradient(45deg,rgba(20,107,94,0.02),rgba(20,107,94,0.02)_10px,transparent_10px,transparent_20px)] p-7 text-center">
              <p className="font-display font-semibold text-ink-700 text-[17px]">Made with the {l.eyebrow.replace(' Worksheet', '')} maker</p>
              <p className="text-ink-500 text-sm mt-1">Worksheet-maker page coming soon.</p>
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
