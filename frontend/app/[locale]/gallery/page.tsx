/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { ALL_APPS, APP_CATEGORIES } from '@/config/products';
import type { AppId } from '@/config/products';
import { getSlugForLocale } from '@/config/product-page-slugs';
import { getLocalizedAppName } from '@/config/app-translations';
import { ogLocaleMap, getHreflangCode, generateImageGallerySchema } from '@/lib/schema-generator';
import { encodeImagePath } from '@/lib/encode-image-path';
import { imgUrl } from '@/config/showcase-i18n';
import { getSectionLabel } from '@/config/section-labels';

const baseUrl = 'https://www.lessoncraftstudio.com';

export const revalidate = 86400; // 24h

// Hero image filename mapping — first sample for each app
const appHeroFilenames: Record<string, string> = {
  'addition': 'Addition Fun 1.webp',
  'subtraction': 'Subtraction Fun 1.webp',
  'code-addition': 'Code Breaker Addition 1.webp',
  'more-less': 'More Less (10).webp',
  'math-puzzle': 'Math Puzzles.webp',
  'math-worksheet': 'Math Worksheet 10.webp',
  'alphabet-train': 'Alphabet Train 1.webp',
  'prepositions': 'prepositions_worksheet (1).webp',
  'word-guess': 'clue-grid_worksheet.webp',
  'word-scramble': 'word scramble portrait.webp',
  'wordsearch': 'Word Search 1.webp',
  'cryptogram': 'cryptogram_worksheet.webp',
  'writing': 'writing.webp',
  'big-small': 'big-small-worksheet_worksheet.webp',
  'pattern-train': 'pattern_train_worksheet.webp',
  'pattern-worksheet': 'pattern_worksheet.webp',
  'draw-and-color': 'grid-drawing_worksheet.webp',
  'drawing-lines': 'drawing_lines_horizontal.webp',
  'coloring': 'coloring portrait 1.webp',
  'chart-count': 'chart count.webp',
  'matching': 'matching portrait.webp',
  'grid-match': 'Grid Match.webp',
  'shadow-match': 'shadow-match-worksheet.webp',
  'bingo': 'bingo_card.webp',
  'picture-sort': 'Picture Sort.webp',
  'missing-pieces': 'Missing Pieces.webp',
  'odd-one-out': 'Find the Odd One Out.webp',
  'sudoku': 'sudoku_worksheet.webp',
  'picture-path': 'Picture Pathway.webp',
  'find-and-count': 'find and count portrait.webp',
  'find-objects': 'spotworks_worksheet.webp',
  'crossword': 'crossword_worksheet.webp',
  'treasure-hunt': 'Treasure Hunt 1.webp',
};

// Folder mapping — app ID to samples folder name
const appFolderMap: Record<string, string> = {
  'addition': 'addition',
  'subtraction': 'subtraction',
  'code-addition': 'code addition',
  'more-less': 'more less',
  'math-puzzle': 'math puzzle',
  'math-worksheet': 'math worksheet',
  'alphabet-train': 'alphabet train',
  'prepositions': 'prepositions',
  'word-guess': 'word guess',
  'word-scramble': 'word scramble',
  'wordsearch': 'wordsearch',
  'cryptogram': 'cryptogram',
  'writing': 'writing',
  'big-small': 'big small',
  'pattern-train': 'pattern train',
  'pattern-worksheet': 'pattern worksheet',
  'draw-and-color': 'draw and color',
  'drawing-lines': 'drawing lines',
  'coloring': 'coloring',
  'chart-count': 'chart count',
  'matching': 'matching',
  'grid-match': 'grid match',
  'shadow-match': 'shadow match',
  'bingo': 'bingo',
  'picture-sort': 'picture sort',
  'missing-pieces': 'missing pieces',
  'odd-one-out': 'odd one out',
  'sudoku': 'sudoku',
  'picture-path': 'picture path',
  'find-and-count': 'find and count',
  'find-objects': 'find objects',
  'crossword': 'crossword',
  'treasure-hunt': 'treasure hunt',
};

const galleryTitles: Record<string, string> = {
  en: 'Sample Worksheet Gallery',
  de: 'Arbeitsblatt-Galerie',
  fr: 'Galerie de Fiches',
  es: 'Galeria de Hojas de Trabajo',
  pt: 'Galeria de Planilhas',
  it: 'Galleria di Schede',
  nl: 'Werkblad Galerij',
  sv: 'Arbetsblads-galleri',
  da: 'Arbejdsark Galleri',
  no: 'Arbeidsark Galleri',
  fi: 'Tyolehti-galleria',
};

const galleryDescriptions: Record<string, string> = {
  en: 'Browse sample worksheets from all 33 professional printable generators. Word searches, math puzzles, coloring pages, crosswords, and more — ready to customize and sell.',
  de: 'Durchsuchen Sie Musterarbeitsblatter aller 33 professionellen Generatoren. Suchsel, Mathe-Ratsel, Ausmalbilder, Kreuzwortratsel und mehr.',
  fr: 'Parcourez des exemples de fiches de nos 33 generateurs professionnels. Mots meles, puzzles maths, coloriages, mots croises et plus.',
  es: 'Explore hojas de trabajo de ejemplo de nuestros 33 generadores profesionales. Sopas de letras, rompecabezas matematicos, paginas para colorear y mas.',
  pt: 'Navegue por exemplos de planilhas de nossos 33 geradores profissionais. Caca-palavras, quebra-cabecas matematicos, paginas para colorir e mais.',
  it: 'Sfoglia esempi di schede da tutti i 33 generatori professionali. Ricerca di parole, puzzle matematici, pagine da colorare e altro.',
  nl: 'Bekijk voorbeeldwerkbladen van alle 33 professionele generatoren. Woordzoekers, rekenpuzzels, kleurplaten, kruiswoordpuzzels en meer.',
  sv: 'Blaaddra bland exempelarbetsblad fran alla 33 professionella generatorer. Ordjaktar, mattepussel, malarbilder, korsord och mer.',
  da: 'Gennemse eksempelarbejdsark fra alle 33 professionelle generatorer. Ordjaktar, matematikpuslespil, malebilleder, krydsord og mere.',
  no: 'Bla gjennom eksempelarbeidsark fra alle 33 profesjonelle generatorer. Ordjaktar, mattepuslespill, fargeleggingssider, kryssord og mer.',
  fi: 'Selaa esimerkkityolehtia kaikista 33 ammattimaisesta generaattorista. Sanaristikot, matematiikkapulmat, varityskuvat, ristisanatehtavat ja paljon muuta.',
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as SupportedLocale;
  const title = galleryTitles[locale] || galleryTitles.en;
  const description = galleryDescriptions[locale] || galleryDescriptions.en;
  const primaryImage = `${baseUrl}${encodeImagePath(imgUrl('wordsearch', 'Word Search 1.webp', locale))}`;

  const alternateUrls: Record<string, string> = {};
  for (const loc of SUPPORTED_LOCALES) {
    alternateUrls[getHreflangCode(loc)] = `${baseUrl}/${loc}/gallery`;
  }

  return {
    title: `${title} | LessonCraftStudio`,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/gallery`,
      languages: alternateUrls,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/${locale}/gallery`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
      images: [
        { url: primaryImage, width: 2480, height: 3508, alt: `${title} - Word Search Sample` },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [primaryImage],
    },
  };
}

export default function GalleryPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as SupportedLocale;
  const pageUrl = `${baseUrl}/${locale}/gallery`;
  const title = galleryTitles[locale] || galleryTitles.en;
  const description = galleryDescriptions[locale] || galleryDescriptions.en;

  const appIds = Object.keys(ALL_APPS) as AppId[];
  const galleryImages = appIds.map(appId => {
    const folder = appFolderMap[appId] || appId;
    const filename = appHeroFilenames[appId];
    if (!filename) return null;
    const src = imgUrl(folder, filename, locale);
    const name = getLocalizedAppName(appId, locale);
    return { appId, src, name };
  }).filter(Boolean) as Array<{ appId: AppId; src: string; name: string }>;

  const gallerySchema = generateImageGallerySchema(
    galleryImages.map(img => ({
      src: img.src,
      alt: `${img.name} printable worksheet sample`,
    })),
    title,
    locale,
    pageUrl,
  );

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    numberOfItems: galleryImages.length,
    isPartOf: { '@type': 'WebSite', '@id': `${baseUrl}/#website` },
    primaryImageOfPage: galleryImages.length > 0 ? {
      '@type': 'ImageObject',
      url: `${baseUrl}${encodeImagePath(galleryImages[0].src)}`,
      contentUrl: `${baseUrl}${encodeImagePath(galleryImages[0].src)}`,
      caption: `${galleryImages[0].name} printable worksheet sample`,
      width: 2480,
      height: 3508,
    } : undefined,
    inLanguage: getHreflangCode(locale),
  };

  const categoryOrder = ['math', 'literacy', 'visual', 'matching', 'puzzle', 'search'] as const;

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([webPageSchema, gallerySchema].filter(Boolean)) }}
      />

      {/* Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
      </section>

      {/* Gallery grid by category */}
      {categoryOrder.map(catId => {
        const category = APP_CATEGORIES[catId];
        const catApps = galleryImages.filter(img => ALL_APPS[img.appId].category === catId);
        if (catApps.length === 0) return null;

        return (
          <section key={catId} className="py-10 md:py-14">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.name}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {catApps.map((img, i) => {
                  const appSlug = getSlugForLocale(img.appId, locale);
                  return (
                    <Link
                      key={img.appId}
                      href={`/${locale}/apps/${appSlug}`}
                      className="group block"
                    >
                      <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 group-hover:shadow-lg transition-shadow">
                        <img
                          src={encodeImagePath(img.src)}
                          alt={`${img.name} printable worksheet sample`}
                          width={2480}
                          height={3508}
                          className="w-full h-auto"
                          loading={i < 6 ? 'eager' : 'lazy'}
                          decoding="async"
                        />
                      </div>
                      <p className="mt-2 text-sm font-medium text-gray-700 text-center group-hover:text-amber-600 transition-colors">
                        {img.name}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-12 bg-amber-50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{getSectionLabel('ctaTryFree', locale)}</h2>
          <p className="text-gray-600 mb-6">{getSectionLabel('ctaTryFreeDesc', locale)}</p>
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
          >
            {getSectionLabel('ctaTryFree', locale)}
          </Link>
        </div>
      </section>
    </div>
  );
}
