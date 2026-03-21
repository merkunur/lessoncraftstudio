import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import {
  getIdeaConfigBySlug,
  getAllIdeaPageSlugs,
  getIdeaAlternateUrls,
  getIdeaSlugForLocale,
} from '@/config/idea-page-slugs';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { ogLocaleMap, generateFAQSchema, generateVideoSchema, localizedHomeLabel, getHreflangCode } from '@/lib/schema-generator';
import { getIdeaContent } from '@/config/idea-content';
import { getSectionLabel } from '@/config/section-labels';
import { encodeImagePath } from '@/lib/encode-image-path';
import { isValidInternalLink } from '@/lib/resolve-internal-link';
import VideoFacade from '../../apps/[slug]/VideoFacade';
import ReadMoreText from '@/components/ReadMoreText';
import {
  WorksheetShowcaseSection,
  TieredShowcaseSection,
  SpotlightSection,
  GallerySection,
} from '@/app/[locale]/apps/[slug]/showcase/ShowcaseSections';
import { getPageShowcaseConfig } from '@/config/guide-showcase-configs';

const baseUrl = 'https://www.lessoncraftstudio.com';

// Static hero image mapping for product idea thumbnails (per locale)
const appHeroImagesByLocale: Record<string, Record<string, string>> = {
  en: {
    'addition': '/samples/english/addition/Addition Fun 1.webp',
    'image-addition': '/samples/english/addition/Addition Fun 1.webp',
    'image-subtraction': '/samples/english/subtraction/Subtraction Fun 1.webp',
    'subtraction': '/samples/english/subtraction/Subtraction Fun 1.webp',
    'alphabet-train': '/samples/english/alphabet train/Alphabet Train 1.webp',
    'big-small': '/samples/english/big small/big-small-worksheet_worksheet.webp',
    'bingo': '/samples/english/bingo/bingo_card.webp',
    'chart-count': '/samples/english/chart count/chart count.webp',
    'code-addition': '/samples/english/code addition/Code Breaker Addition 1.webp',
    'coloring': '/samples/english/coloring/coloring portrait 1.webp',
    'crossword': '/samples/english/crossword/crossword_worksheet.webp',
    'cryptogram': '/samples/english/cryptogram/cryptogram_worksheet.webp',
    'draw-and-color': '/samples/english/draw and color/grid-drawing_worksheet.webp',
    'drawing-lines': '/samples/english/drawing lines/drawing_lines_horizontal.webp',
    'find-and-count': '/samples/english/find and count/find and count portrait.webp',
    'find-objects': '/samples/english/find objects/spotworks_worksheet.webp',
    'grid-match': '/samples/english/grid match/Grid Match.webp',
    'matching': '/samples/english/matching/matching portrait.webp',
    'math-puzzle': '/samples/english/math puzzle/Math Puzzles.webp',
    'math-worksheet': '/samples/english/math worksheet/Math Worksheet 10.webp',
    'missing-pieces': '/samples/english/missing pieces/Missing Pieces.webp',
    'more-less': '/samples/english/more less/More Less (10).webp',
    'odd-one-out': '/samples/english/odd one out/Find the Odd One Out.webp',
    'pattern-train': '/samples/english/pattern train/pattern_train_worksheet.webp',
    'pattern-worksheet': '/samples/english/pattern worksheet/pattern_worksheet.webp',
    'picture-path': '/samples/english/picture path/Picture Pathway.webp',
    'picture-sort': '/samples/english/picture sort/Picture Sort.webp',
    'prepositions': '/samples/english/prepositions/prepositions_worksheet (1).webp',
    'shadow-match': '/samples/english/shadow match/shadow-match-worksheet.webp',
    'sudoku': '/samples/english/sudoku/sudoku_worksheet.webp',
    'treasure-hunt': '/samples/english/treasure hunt/Treasure Hunt 1.webp',
    'word-guess': '/samples/english/word guess/clue-grid_worksheet.webp',
    'word-scramble': '/samples/english/word scramble/word scramble portrait.webp',
    'word-search': '/samples/english/wordsearch/wordsearch portrait.webp',
    'writing': '/samples/english/writing/writing.webp',
  },
  de: {
    'addition': '/samples/german/addition/Additionsspa 1.webp',
    'image-addition': '/samples/german/addition/Additionsspa 1.webp',
    'image-subtraction': '/samples/german/subtraction/worksheet.webp',
    'subtraction': '/samples/german/subtraction/worksheet.webp',
    'alphabet-train': '/samples/german/alphabet train/worksheet.webp',
    'big-small': '/samples/german/big small/big-small-worksheet_worksheet.webp',
    'bingo': '/samples/german/bingo/bilder-bingo 1.webp',
    'chart-count': '/samples/german/chart count/Bilddiagramm 1.webp',
    'code-addition': '/samples/german/code addition/Code-Knacker Addition 1.webp',
    'coloring': '/samples/german/coloring/coloring portrait 1.webp',
    'crossword': '/samples/german/crossword/crossword_worksheet.webp',
    'cryptogram': '/samples/german/cryptogram/Bilder-Kryptogramm 1.webp',
    'draw-and-color': '/samples/german/draw and color/Zeichnen und Ausmale 1.webp',
    'drawing-lines': '/samples/german/drawing lines/Linien Zeichnen Üben 1.webp',
    'find-and-count': '/samples/german/find and count/Ich sehe was 1.webp',
    'find-objects': '/samples/german/find objects/Finde das Unpassende 1.webp',
    'grid-match': '/samples/german/grid match/Raster-Puzzle 1.webp',
    'matching': '/samples/german/matching/Paare Finden 1.webp',
    'math-puzzle': '/samples/german/math puzzle/Mathe-Rätsel 1.webp',
    'math-worksheet': '/samples/german/math worksheet/worksheet.webp',
    'missing-pieces': '/samples/german/missing pieces/Fehlende Teile 1.webp',
    'more-less': '/samples/german/more less/Mehr Weniger 1.webp',
    'odd-one-out': '/samples/german/odd one out/Finde das Andere 1.webp',
    'pattern-train': '/samples/german/pattern train/Musterzug 1.webp',
    'pattern-worksheet': '/samples/german/pattern worksheet/pattern_worksheet.webp',
    'picture-path': '/samples/german/picture path/Bilderpfad 1.webp',
    'picture-sort': '/samples/german/picture sort/Bilder Sortieren 1.webp',
    'prepositions': '/samples/german/prepositions/prepositions_worksheet.webp',
    'shadow-match': '/samples/german/shadow match/Schatten Zuordnen 1.webp',
    'sudoku': '/samples/german/sudoku/Bilder-Sudoku 1.webp',
    'treasure-hunt': '/samples/german/treasure hunt/worksheet.webp',
    'word-guess': '/samples/german/word guess/clue-grid_worksheet.webp',
    'word-scramble': '/samples/german/word scramble/Buchstabensala 1.webp',
    'word-search': '/samples/german/wordsearch/Worter suchen 1.webp',
    'writing': '/samples/german/writing/writing.webp',
  },
  it: {
    'addition': '/samples/italian/addition/Addizione Divertente 1.webp',
    'image-addition': '/samples/italian/addition/Addizione Divertente 1.webp',
    'image-subtraction': '/samples/italian/subtraction/Sottrazioni Divertenti 1.webp',
    'subtraction': '/samples/italian/subtraction/Sottrazioni Divertenti 1.webp',
    'alphabet-train': "/samples/italian/alphabet train/Treno dell'Alfabeto 1.webp",
    'big-small': '/samples/italian/big small/Grande o Piccolo 1.webp',
    'bingo': '/samples/italian/bingo/tombola 1.webp',
    'chart-count': '/samples/italian/chart count/Grafico con Immagini 1.webp',
    'code-addition': '/samples/italian/code addition/Codice Segreto Addizione 1.webp',
    'coloring': '/samples/italian/coloring/coloring portrait 1.webp',
    'crossword': '/samples/italian/crossword/Cruciverba con Immagini 1.webp',
    'cryptogram': '/samples/italian/cryptogram/Crittogramma Illustrato 1.webp',
    'draw-and-color': '/samples/italian/draw and color/Disegna e Colora 1.webp',
    'drawing-lines': '/samples/italian/drawing lines/Pratica del Disegno di Linee 2.webp',
    'find-and-count': '/samples/italian/find and count/Vedo Vedo 1.webp',
    'find-objects': '/samples/italian/find objects/Trova gli Oggetti Nascosti 1.webp',
    'grid-match': '/samples/italian/grid match/Puzzle a Griglia 1.webp',
    'matching': '/samples/italian/matching/Trova le Coppie 1.webp',
    'math-puzzle': '/samples/italian/math puzzle/Rompicapi Matematici 1.webp',
    'math-worksheet': '/samples/italian/math worksheet/Scheda di Matematica 1.webp',
    'missing-pieces': '/samples/italian/missing pieces/Pezzi Mancanti 1.webp',
    'more-less': '/samples/italian/more less/Più Meno 1.webp',
    'odd-one-out': '/samples/italian/odd one out/Trova il Diverso 1.webp',
    'pattern-train': '/samples/italian/pattern train/Treno dei Modelli 1.webp',
    'pattern-worksheet': '/samples/italian/pattern worksheet/Puzzle di Schemi 1.webp',
    'picture-path': '/samples/italian/picture path/Percorso di Immagini 1.webp',
    'picture-sort': '/samples/italian/picture sort/Classificazione Immagini 1.webp',
    'prepositions': '/samples/italian/prepositions/Preposizioni 1.webp',
    'shadow-match': '/samples/italian/shadow match/Abbina le Ombre 1.webp',
    'sudoku': '/samples/italian/sudoku/Sudoku con Immagini 1.webp',
    'treasure-hunt': '/samples/italian/treasure hunt/Caccia al Tesoro 1.webp',
    'word-guess': '/samples/italian/word guess/Indovina la Parola 1.webp',
    'word-scramble': '/samples/italian/word scramble/Lettere Mescolate 1.webp',
    'word-search': '/samples/italian/wordsearch/Cerca Parole 1.webp',
    'writing': '/samples/italian/writing/writing.webp',
  },
};

function getAppHeroImage(appId: string, locale: string): string | undefined {
  return appHeroImagesByLocale[locale]?.[appId] || appHeroImagesByLocale.en[appId];
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllIdeaPageSlugs().map(({ locale, slug }) => ({ locale, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  try {
    const locale = params.locale as SupportedLocale;
    const slug = params.slug;

    const config = getIdeaConfigBySlug(slug);
    if (!config) return {};

    const content = await getIdeaContent(config.ideaId, locale);
    const alternateUrls = getIdeaAlternateUrls(config.ideaId, baseUrl);
    const localeSlug = getIdeaSlugForLocale(config.ideaId, locale);

    const title = content?.seo?.titleTag || `${config.ideaId} | LessonCraftStudio`;
    const description = content?.seo?.metaDescription || '';

    const keywords = content?.seo?.primaryKeyword
      ? [content.seo.primaryKeyword, ...(content.seo.secondaryKeywords || []), ...(content.seo.lsiKeywords || [])]
      : undefined;

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: `${baseUrl}/${locale}/ideas/${localeSlug || slug}`,
        languages: alternateUrls,
      },
      openGraph: {
        title,
        description,
        type: 'article',
        url: `${baseUrl}/${locale}/ideas/${localeSlug || slug}`,
        siteName: 'LessonCraftStudio',
        locale: ogLocaleMap[locale] || locale,
        alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
        images: [{ url: `${baseUrl}/api/og?locale=${locale}&type=idea&title=${encodeURIComponent(title)}`, width: 1200, height: 630, alt: title }],
        videos: content?.youtubeId ? [{ url: `https://www.youtube.com/watch?v=${content.youtubeId}`, type: 'text/html', width: 1280, height: 720 }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [`${baseUrl}/api/og?locale=${locale}&type=idea&title=${encodeURIComponent(title)}`],
      },
      robots: content ? undefined : { index: false },
    };
  } catch {
    return {};
  }
}

export default async function IdeaPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as SupportedLocale;
  const slug = params.slug;

  const config = getIdeaConfigBySlug(slug);
  if (!config) notFound();

  const content = await getIdeaContent(config.ideaId, locale);

  // Look up visual showcase config (EN + DE + FR + ES + PT)
  const showcaseConfig = (locale === 'en' || locale === 'de' || locale === 'fr' || locale === 'es' || locale === 'pt' || locale === 'it')
    ? getPageShowcaseConfig('idea', config.ideaId, locale)
    : null;

  // Override English hero heading with localized content title
  if (showcaseConfig && content) {
    showcaseConfig.hero.heading = content.hero.title;
  }

  if (content) {
    const localeSlug = getIdeaSlugForLocale(config.ideaId, locale);
    const pageUrl = `${baseUrl}/${locale}/ideas/${localeSlug || slug}`;

    const ideaHeroImage = showcaseConfig?.hero?.images?.[0]?.src;
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${pageUrl}#article`,
      headline: content.hero.title,
      description: content.hero.description,
      url: pageUrl,
      image: ideaHeroImage ? `${baseUrl}${ideaHeroImage}` : `${baseUrl}/api/og?locale=${locale}&type=idea&title=${encodeURIComponent(content.hero.title)}`,
      inLanguage: getHreflangCode(locale),
      publisher: { '@type': 'Organization', name: 'LessonCraftStudio', url: baseUrl },
      author: { '@type': 'Organization', name: 'LessonCraftStudio', url: baseUrl },
      datePublished: '2026-02-27',
      dateModified: '2026-03-20',
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.speakable-headline', '.speakable-summary'] },
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: localizedHomeLabel[locale] || 'Home', item: `${baseUrl}/${locale}` },
        { '@type': 'ListItem', position: 2, name: getSectionLabel('businessIdeas', locale), item: `${baseUrl}/${locale}/ideas` },
        { '@type': 'ListItem', position: 3, name: content.hero.title },
      ],
    };

    const schemas: object[] = [articleSchema, breadcrumbSchema];
    if (content.faq?.length) {
      schemas.push(generateFAQSchema(content.faq, locale, pageUrl));
    }

    return (
      <div className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
        {content?.youtubeId && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(generateVideoSchema({
              name: content.videoTitle || content.hero.title,
              description: content.seo?.metaDescription || content.hero.description,
              youtubeId: content.youtubeId,
            })) }}
          />
        )}
        {/* Hero */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-amber-50 to-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <nav className="text-sm text-gray-500 mb-4">
              <Link href={`/${locale}/ideas`} className="hover:text-amber-600">{getSectionLabel('nicheIdeas', locale)}</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700">{content.hero.title}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.hero.title}
            </h1>
            <ReadMoreText text={content.hero.description} locale={locale} className="text-lg text-gray-600" lines={5} />
          </div>
        </section>

        {/* Visual Showcase 1 — Hero */}
        {showcaseConfig && <WorksheetShowcaseSection config={showcaseConfig.hero} />}

        {/* Video */}
        {content.youtubeId && (
          <div className="container mx-auto px-4 max-w-3xl mt-8">
            <VideoFacade
              videoId={content.youtubeId}
              title={content.videoTitle || content.hero.title}
            />
          </div>
        )}

        {/* CTA 1 */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <Link
              href={`/${locale}/apps`}
              className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              {getSectionLabel('ctaTryFree', locale)}
            </Link>
            <p className="text-sm text-gray-500 mt-2">{getSectionLabel('ctaTryFreeDesc', locale)}</p>
          </div>
        </section>

        {/* Market Overview */}
        {content.marketOverview && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{getSectionLabel('marketOverview', locale)}</h2>
              <ReadMoreText text={content.marketOverview} locale={locale} className="text-gray-700 leading-relaxed" preserveWhitespace />
            </div>
          </section>
        )}

        {/* Product Ideas */}
        {content.productIdeas && content.productIdeas.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('productIdeas', locale)}</h2>
              <div className="space-y-4">
                {content.productIdeas.map((idea, i) => (
                  <div key={i} className="p-5 bg-white rounded-lg border border-gray-200 flex gap-4">
                    {getAppHeroImage(idea.appId, locale) && (
                      <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={encodeImagePath(getAppHeroImage(idea.appId, locale)!)}
                          alt={idea.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900">{idea.title}</h3>
                      <ReadMoreText text={idea.description} locale={locale} className="text-gray-600 text-sm mt-1" />
                      <span className="inline-block mt-2 text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded">
                        {idea.appId}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Visual Showcase 2 — Features */}
        {showcaseConfig && <TieredShowcaseSection config={showcaseConfig.tiered} />}

        {/* Theme Images */}
        {content.themeImages && content.themeImages.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('themeImages', locale)}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {content.themeImages.map((img, i) => (
                  <figure key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <img
                      src={encodeImagePath(img.src)}
                      alt={img.alt}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                    {img.caption && (
                      <figcaption className="p-2 text-xs text-gray-600 text-center">{img.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Visual Showcase 3 — Progression */}
        {showcaseConfig && <SpotlightSection config={showcaseConfig.spotlight} />}

        {/* Platform Tips */}
        {content.platformTips && content.platformTips.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('sellingTips', locale)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.platformTips.map((tip, i) => (
                  <div key={i} className="p-4 bg-white border border-gray-200 rounded-lg">
                    <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">{tip.platform}</span>
                    <h3 className="font-semibold text-gray-900 mt-2">{tip.title}</h3>
                    <ReadMoreText text={tip.description} locale={locale} className="text-gray-600 text-sm mt-1" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA 2 */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <Link
              href={`/${locale}/apps`}
              className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              {getSectionLabel('ctaBrowseAll', locale)}
            </Link>
          </div>
        </section>

        {/* Visual Showcase 4 — Fun */}
        {showcaseConfig && <GallerySection config={showcaseConfig.gallery} />}

        {/* FAQ */}
        {content.faq && content.faq.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('faq', locale)}</h2>
              <div className="space-y-4">
                {content.faq.map((faq, i) => (
                  <details key={i} className="group border border-gray-200 rounded-lg bg-white">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900">
                      {faq.question}
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4">
                      <ReadMoreText text={faq.answer} locale={locale} className="text-gray-600" lines={8} />
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Internal Links */}
        {content.internalLinks && content.internalLinks.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{getSectionLabel('related', locale)}</h2>
              <div className="flex flex-wrap gap-3">
                {content.internalLinks.filter(link => isValidInternalLink(link.pageType, link.slug)).map((link, i) => (
                  <Link
                    key={i}
                    href={`/${locale}/${link.pageType === 'app' ? 'apps' : link.pageType === 'tool' ? 'tools' : link.pageType === 'bundle' ? 'bundles' : link.pageType === 'start' ? 'start' : link.pageType === 'guide' ? 'guides' : 'ideas'}/${link.slug}`}
                    className="text-sm text-amber-600 hover:text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full"
                  >
                    {link.anchorText}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA 3 - Final */}
        <section className="py-12 md:py-16 bg-amber-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">{getSectionLabel('ctaReadyToStart', locale)}</h2>
            <p className="text-amber-100 mb-8 max-w-lg mx-auto">{getSectionLabel('ctaTryFreeDesc', locale)}</p>
            <Link
              href={`/${locale}/apps`}
              className="inline-flex items-center px-8 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
            >
              {getSectionLabel('ctaBrowseAll', locale)}
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // Fallback
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{getSectionLabel('nicheIdeas', locale)}</h1>
          <p className="text-gray-600 mb-8">{getSectionLabel('comingSoon', locale)}</p>
          <Link href={`/${locale}/ideas`} className="text-indigo-600 hover:text-indigo-700 font-medium">
            {getSectionLabel('ctaExploreIdeas', locale)}
          </Link>
        </div>
      </section>
    </div>
  );
}
