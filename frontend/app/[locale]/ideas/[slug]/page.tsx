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
import { ogLocaleMap, generateFAQSchema, generateVideoSchema, localizedHomeLabel, getHreflangCode, generateShowcaseImageSchemas, generateImageGallerySchema } from '@/lib/schema-generator';
import { getIdeaFallbackDescription } from '@/lib/localized-meta-fallback';
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
import BuyButton from '@/components/BuyButton';
import { isValidAppId } from '@/config/products';
import type { AppId } from '@/config/products';

const baseUrl = 'https://www.lessoncraftstudio.com';

// Static hero image mapping for product idea thumbnails (per locale)
const appHeroImagesByLocale: Record<string, Record<string, string>> = {
  en: {
    'addition': '/samples/english/addition/addition-fun-1.webp',
    'image-addition': '/samples/english/addition/addition-fun-1.webp',
    'image-subtraction': '/samples/english/subtraction/subtraction-fun-1.webp',
    'subtraction': '/samples/english/subtraction/subtraction-fun-1.webp',
    'alphabet-train': '/samples/english/alphabet%20train/alphabet-train-1.webp',
    'big-small': '/samples/english/big%20small/big-small-worksheet-worksheet.webp',
    'bingo': '/samples/english/bingo/bingo-card.webp',
    'chart-count': '/samples/english/chart%20count/chart-count.webp',
    'code-addition': '/samples/english/code%20addition/code-breaker-addition-1.webp',
    'coloring': '/samples/english/coloring/coloring-portrait-1.webp',
    'crossword': '/samples/english/crossword/crossword-worksheet.webp',
    'cryptogram': '/samples/english/cryptogram/cryptogram-worksheet.webp',
    'draw-and-color': '/samples/english/draw%20and%20color/grid-drawing-worksheet.webp',
    'drawing-lines': '/samples/english/drawing%20lines/drawing-lines-horizontal.webp',
    'find-and-count': '/samples/english/find%20and%20count/find-and-count-portrait.webp',
    'find-objects': '/samples/english/find%20objects/spotworks-worksheet.webp',
    'grid-match': '/samples/english/grid%20match/grid-match.webp',
    'matching': '/samples/english/matching/matching-portrait.webp',
    'math-puzzle': '/samples/english/math%20puzzle/math-puzzles.webp',
    'math-worksheet': '/samples/english/math%20worksheet/math-worksheet-10.webp',
    'missing-pieces': '/samples/english/missing%20pieces/missing-pieces.webp',
    'more-less': '/samples/english/more%20less/more-less-10.webp',
    'odd-one-out': '/samples/english/odd%20one%20out/find-the-odd-one-out.webp',
    'pattern-train': '/samples/english/pattern%20train/pattern-train-worksheet.webp',
    'pattern-worksheet': '/samples/english/pattern%20worksheet/pattern-worksheet.webp',
    'picture-path': '/samples/english/picture%20path/picture-pathway.webp',
    'picture-sort': '/samples/english/picture%20sort/picture-sort.webp',
    'prepositions': '/samples/english/prepositions/prepositions-worksheet-1.webp',
    'shadow-match': '/samples/english/shadow%20match/shadow-match-worksheet.webp',
    'sudoku': '/samples/english/sudoku/sudoku-worksheet.webp',
    'treasure-hunt': '/samples/english/treasure%20hunt/treasure-hunt-1.webp',
    'word-guess': '/samples/english/word%20guess/clue-grid-worksheet.webp',
    'word-scramble': '/samples/english/word%20scramble/word-scramble-portrait.webp',
    'word-search': '/samples/english/wordsearch/wordsearch-portrait.webp',
    'writing': '/samples/english/writing/writing.webp',
  },
  de: {
    'addition': '/samples/german/addition/additionsspa-1.webp',
    'image-addition': '/samples/german/addition/additionsspa-1.webp',
    'image-subtraction': '/samples/german/subtraction/worksheet.webp',
    'subtraction': '/samples/german/subtraction/worksheet.webp',
    'alphabet-train': '/samples/german/alphabet%20train/worksheet.webp',
    'big-small': '/samples/german/big%20small/big-small-worksheet-worksheet.webp',
    'bingo': '/samples/german/bingo/bilder-bingo-1.webp',
    'chart-count': '/samples/german/chart%20count/bilddiagramm-1.webp',
    'code-addition': '/samples/german/code%20addition/code-knacker-addition-1.webp',
    'coloring': '/samples/german/coloring/coloring-portrait-1.webp',
    'crossword': '/samples/german/crossword/crossword-worksheet.webp',
    'cryptogram': '/samples/german/cryptogram/bilder-kryptogramm-1.webp',
    'draw-and-color': '/samples/german/draw%20and%20color/zeichnen-und-ausmale-1.webp',
    'drawing-lines': '/samples/german/drawing%20lines/linien-zeichnen-üben-1.webp',
    'find-and-count': '/samples/german/find%20and%20count/ich-sehe-was-1.webp',
    'find-objects': '/samples/german/find%20objects/finde-das-unpassende-1-v7.webp',
    'grid-match': '/samples/german/grid%20match/raster-puzzle-1.webp',
    'matching': '/samples/german/matching/paare-finden-1.webp',
    'math-puzzle': '/samples/german/math%20puzzle/mathe-rätsel-1.webp',
    'math-worksheet': '/samples/german/math%20worksheet/worksheet.webp',
    'missing-pieces': '/samples/german/missing%20pieces/fehlende-teile-1.webp',
    'more-less': '/samples/german/more%20less/mehr-weniger-1.webp',
    'odd-one-out': '/samples/german/odd%20one%20out/finde-das-andere-1.webp',
    'pattern-train': '/samples/german/pattern%20train/musterzug-1.webp',
    'pattern-worksheet': '/samples/german/pattern%20worksheet/pattern-worksheet.webp',
    'picture-path': '/samples/german/picture%20path/bilderpfad-1.webp',
    'picture-sort': '/samples/german/picture%20sort/bilder-sortieren-1.webp',
    'prepositions': '/samples/german/prepositions/prepositions-worksheet.webp',
    'shadow-match': '/samples/german/shadow%20match/schatten-zuordnen-1.webp',
    'sudoku': '/samples/german/sudoku/bilder-sudoku-1.webp',
    'treasure-hunt': '/samples/german/treasure%20hunt/worksheet.webp',
    'word-guess': '/samples/german/word%20guess/clue-grid-worksheet.webp',
    'word-scramble': '/samples/german/word%20scramble/buchstabensala-1.webp',
    'word-search': '/samples/german/wordsearch/worter-suchen-1.webp',
    'writing': '/samples/german/writing/writing.webp',
  },
  it: {
    'addition': '/samples/italian/addition/addizione-divertente-1.webp',
    'image-addition': '/samples/italian/addition/addizione-divertente-1.webp',
    'image-subtraction': '/samples/italian/subtraction/sottrazioni-divertenti-1.webp',
    'subtraction': '/samples/italian/subtraction/sottrazioni-divertenti-1.webp',
    'alphabet-train': "/samples/italian/alphabet train/Treno dell'alfabeto-1.webp",
    'big-small': '/samples/italian/big%20small/grande-o-piccolo-1.webp',
    'bingo': '/samples/italian/bingo/tombola-1.webp',
    'chart-count': '/samples/italian/chart%20count/grafico-con-immagini-1.webp',
    'code-addition': '/samples/italian/code%20addition/codice-segreto-addizione-1.webp',
    'coloring': '/samples/italian/coloring/coloring-portrait-1.webp',
    'crossword': '/samples/italian/crossword/cruciverba-con-immagini-1.webp',
    'cryptogram': '/samples/italian/cryptogram/crittogramma-illustrato-1.webp',
    'draw-and-color': '/samples/italian/draw%20and%20color/disegna-e-colora-1.webp',
    'drawing-lines': '/samples/italian/drawing%20lines/pratica-del-disegno-di-linee-2.webp',
    'find-and-count': '/samples/italian/find%20and%20count/vedo-vedo-1.webp',
    'find-objects': '/samples/italian/find%20objects/trova-gli-oggetti-nascosti-1.webp',
    'grid-match': '/samples/italian/grid%20match/puzzle-a-griglia-1.webp',
    'matching': '/samples/italian/matching/trova-le-coppie-1.webp',
    'math-puzzle': '/samples/italian/math%20puzzle/rompicapi-matematici-1.webp',
    'math-worksheet': '/samples/italian/math%20worksheet/scheda-di-matematica-1.webp',
    'missing-pieces': '/samples/italian/missing%20pieces/pezzi-mancanti-1.webp',
    'more-less': '/samples/italian/more%20less/più-meno-1.webp',
    'odd-one-out': '/samples/italian/odd%20one%20out/trova-il-diverso-1-v10.webp',
    'pattern-train': '/samples/italian/pattern%20train/treno-dei-modelli-1.webp',
    'pattern-worksheet': '/samples/italian/pattern%20worksheet/puzzle-di-schemi-1.webp',
    'picture-path': '/samples/italian/picture%20path/percorso-di-immagini-1.webp',
    'picture-sort': '/samples/italian/picture%20sort/classificazione-immagini-1.webp',
    'prepositions': '/samples/italian/prepositions/preposizioni-1.webp',
    'shadow-match': '/samples/italian/shadow%20match/abbina-le-ombre-1.webp',
    'sudoku': '/samples/italian/sudoku/sudoku-con-immagini-1.webp',
    'treasure-hunt': '/samples/italian/treasure%20hunt/caccia-al-tesoro-1.webp',
    'word-guess': '/samples/italian/word%20guess/indovina-la-parola-1.webp',
    'word-scramble': '/samples/italian/word%20scramble/lettere-mescolate-1.webp',
    'word-search': '/samples/italian/wordsearch/cerca-parole-1.webp',
    'writing': '/samples/italian/writing/writing.webp',
  },
  nl: {
    'addition': '/samples/dutch/addition/optellen-is-leuk-1.webp',
    'image-addition': '/samples/dutch/addition/optellen-is-leuk-1.webp',
    'image-subtraction': '/samples/dutch/subtraction/aftrekken-is-leuk-1.webp',
    'subtraction': '/samples/dutch/subtraction/aftrekken-is-leuk-1.webp',
    'alphabet-train': '/samples/dutch/alphabet%20train/alfabettrein-1.webp',
    'big-small': '/samples/dutch/big%20small/groot-of-klein-1.webp',
    'bingo': '/samples/dutch/bingo/plaatjesbingo-1.webp',
    'chart-count': '/samples/dutch/chart%20count/plaatjesgrafiek-1.webp',
    'code-addition': '/samples/dutch/code%20addition/geheime-code-optellen-1.webp',
    'coloring': '/samples/dutch/coloring/coloring-portrait-1.webp',
    'crossword': '/samples/dutch/crossword/plaatjes-kruiswoord-1.webp',
    'cryptogram': '/samples/dutch/cryptogram/plaatjes-cryptogram-1.webp',
    'draw-and-color': '/samples/dutch/draw%20and%20color/teken-en-kleur-1.webp',
    'drawing-lines': '/samples/dutch/drawing%20lines/lijnen-tekenen-oefenen-1.webp',
    'find-and-count': '/samples/dutch/find%20and%20count/ik-zie,-ik-zie-1.webp',
    'find-objects': '/samples/dutch/find%20objects/vind-de-verborgen-voorwerpen-1.webp',
    'grid-match': '/samples/dutch/grid%20match/rasterpuzzel-1.webp',
    'matching': '/samples/dutch/matching/zoek-de-paren-1.webp',
    'math-puzzle': '/samples/dutch/math%20puzzle/wiskundepuzzels-1.webp',
    'math-worksheet': '/samples/dutch/math%20worksheet/wiskundeblad-1.webp',
    'missing-pieces': '/samples/dutch/missing%20pieces/ontbrekende-stukjes-1.webp',
    'more-less': '/samples/dutch/more%20less/meer-minder-1.webp',
    'odd-one-out': '/samples/dutch/odd%20one%20out/vind-de-vreemde-eend-1.webp',
    'pattern-train': '/samples/dutch/pattern%20train/patroontje-1.webp',
    'pattern-worksheet': '/samples/dutch/pattern%20worksheet/patroonpuzzels-1.webp',
    'picture-path': '/samples/dutch/picture%20path/afbeeldingspad-1.webp',
    'picture-sort': '/samples/dutch/picture%20sort/afbeeldingen-sorteren-1.webp',
    'prepositions': '/samples/dutch/prepositions/voorzetsels-1.webp',
    'shadow-match': '/samples/dutch/shadow%20match/schaduw-koppelen-1.webp',
    'sudoku': '/samples/dutch/sudoku/plaatjes-sudoku-1.webp',
    'treasure-hunt': '/samples/dutch/treasure%20hunt/schattenjacht-1.webp',
    'word-guess': '/samples/dutch/word%20guess/raad-het-woord-1.webp',
    'word-scramble': '/samples/dutch/word%20scramble/letterzaak-1.webp',
    'word-search': '/samples/dutch/wordsearch/woordzoeker-1.webp',
    'writing': '/samples/dutch/writing/writing.webp',
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
    const description = content?.seo?.metaDescription || getIdeaFallbackDescription(locale);

    const keywords = content?.seo?.primaryKeyword
      ? [content.seo.primaryKeyword, ...(content.seo.secondaryKeywords || []), ...(content.seo.lsiKeywords || [])]
      : undefined;

    // Canonical image: showcase hero first (matching JSON-LD), then themeImages
    const ideaShowcaseConfig = getPageShowcaseConfig('idea', config.ideaId, locale);
    const canonicalImagePath = ideaShowcaseConfig?.hero?.images?.[0]?.src
      ? encodeImagePath(ideaShowcaseConfig.hero.images[0].src)
      : content?.themeImages?.[0]?.src
        ? encodeImagePath(content.themeImages[0].src)
        : null;
    const canonicalImageAlt = ideaShowcaseConfig?.hero?.images?.[0]?.alt
      || content?.themeImages?.[0]?.alt
      || title;

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
        images: [
          ...(canonicalImagePath ? [{
            url: `${baseUrl}${canonicalImagePath}`,
            width: 2480,
            height: 3508,
            alt: canonicalImageAlt,
          }] : []),
          { url: `${baseUrl}/api/og?locale=${locale}&type=idea&title=${encodeURIComponent(title)}`, width: 1200, height: 630, alt: title },
          ...(content?.themeImages?.slice(1, 4).map((img: { src: string; alt: string }) => ({
            url: `${baseUrl}${encodeImagePath(img.src)}`,
            width: 2480,
            height: 3508,
            alt: img.alt,
          })) || []),
        ],
        videos: content?.youtubeId ? [{ url: `https://www.youtube.com/watch?v=${content.youtubeId}`, type: 'text/html', width: 1280, height: 720 }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [canonicalImagePath
          ? `${baseUrl}${canonicalImagePath}`
          : `${baseUrl}/api/og?locale=${locale}&type=idea&title=${encodeURIComponent(title)}`],
      },
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
  const showcaseConfig = (locale === 'en' || locale === 'de' || locale === 'fr' || locale === 'es' || locale === 'pt' || locale === 'it' || locale === 'nl' || locale === 'sv' || locale === 'da' || locale === 'no' || locale === 'fi')
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
    const primaryImageUrl = ideaHeroImage
      ? `${baseUrl}${encodeImagePath(ideaHeroImage)}`
      : content.themeImages?.[0]?.src
        ? `${baseUrl}${encodeImagePath(content.themeImages[0].src)}`
        : content.productIdeas?.[0]?.appId && getAppHeroImage(content.productIdeas[0].appId, locale)
          ? `${baseUrl}${encodeImagePath(getAppHeroImage(content.productIdeas[0].appId, locale)!)}`
          : null;
    const ogImageUrl = `${baseUrl}/api/og?locale=${locale}&type=idea&title=${encodeURIComponent(content.hero.title)}`;
    const isRealImage = !!primaryImageUrl;

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${pageUrl}#article`,
      headline: content.hero.title,
      description: content.hero.description,
      url: pageUrl,
      image: primaryImageUrl
        ? [primaryImageUrl, ogImageUrl]
        : [ogImageUrl],
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

    // WebPage schema with primaryImageOfPage — aligns Google's thumbnail signal
    const ideaImageCaption = showcaseConfig?.hero?.images?.[0]?.alt
      || content.themeImages?.[0]?.alt
      || content.hero.title;
    const webPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: content.hero.title,
      description: content.hero.description,
      isPartOf: { '@type': 'WebSite', '@id': `${baseUrl}/#website` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: primaryImageUrl || ogImageUrl,
        contentUrl: primaryImageUrl || ogImageUrl,
        caption: ideaImageCaption,
        width: isRealImage ? 2480 : 1200,
        height: isRealImage ? 3508 : 630,
      },
      mainEntity: { '@id': `${pageUrl}#article` },
      inLanguage: getHreflangCode(locale),
    };

    const schemas: object[] = [webPageSchema, articleSchema, breadcrumbSchema];
    if (content.faq?.length) {
      schemas.push(generateFAQSchema(content.faq, locale, pageUrl));
    }

    // Hero image for placement below H1 (Google thumbnail signal)
    const ideaHeroImgSrc = showcaseConfig?.hero?.images?.[0]?.src
      || content.themeImages?.[0]?.src
      || (content.productIdeas?.[0]?.appId ? getAppHeroImage(content.productIdeas[0].appId, locale) : undefined);
    const ideaHeroImgAlt = showcaseConfig?.hero?.images?.[0]?.alt
      || content.themeImages?.[0]?.alt
      || content.hero.title;

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
        {content.themeImages && content.themeImages.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(
              content.themeImages.slice(0, 6).map(img => ({
                '@context': 'https://schema.org',
                '@type': 'ImageObject',
                contentUrl: `${baseUrl}${encodeImagePath(img.src)}`,
                name: img.alt,
                caption: img.caption || img.alt,
                encodingFormat: 'image/webp',
                width: 2480,
                height: 3508,
                license: `${baseUrl}/${locale}/license`,
                acquireLicensePage: pageUrl,
                creditText: 'LessonCraftStudio',
                creator: { '@type': 'Organization', name: 'LessonCraftStudio' },
                copyrightHolder: { '@type': 'Organization', name: 'LessonCraftStudio' },
                copyrightNotice: '\u00a9 LessonCraftStudio',
              }))
            ) }}
          />
        )}
        {/* ImageGallery schema for theme images */}
        {(() => {
          const gallerySchema = generateImageGallerySchema(
            (content.themeImages || []).slice(0, 6),
            `${content.hero.title} - Sample Worksheets`,
            locale,
            pageUrl,
          );
          return gallerySchema ? (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }} />
          ) : null;
        })()}
        {/* ImageObject schemas for showcase images (hero, tiered, spotlight, gallery) */}
        {(() => {
          const themeUrls = new Set((content.themeImages || []).slice(0, 6).map(img => `${baseUrl}${encodeImagePath(img.src)}`));
          const showcaseSchemas = generateShowcaseImageSchemas(showcaseConfig, locale, pageUrl, themeUrls);
          return showcaseSchemas.length > 0 ? (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(showcaseSchemas) }} />
          ) : null;
        })()}
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
            {/* Hero image below H1 — Google thumbnail signal */}
            {ideaHeroImgSrc && (
              <div className="mt-8 rounded-xl overflow-hidden shadow-lg max-w-md mx-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={encodeImagePath(ideaHeroImgSrc)}
                  alt={ideaHeroImgAlt}
                  width={800}
                  height={1132}
                  className="w-full h-auto"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            )}
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
              <ReadMoreText text={content.marketOverview} locale={locale} className="text-gray-700 leading-relaxed" preserveWhitespace lines={12} />
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
                      {isValidAppId(idea.appId) && (
                        <div className="mt-2">
                          <BuyButton appId={idea.appId as AppId} locale={locale} variant="compact" />
                        </div>
                      )}
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
