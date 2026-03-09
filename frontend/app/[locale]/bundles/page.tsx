import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { bundlePageSlugs, getBundleSlugForLocale } from '@/config/bundle-page-slugs';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { APP_CATEGORIES } from '@/config/warriorplus-products';
import { getBundleContent } from '@/config/bundle-content';

const baseUrl = 'https://www.lessoncraftstudio.com';

const bundleInfo: Record<string, { categoryId: string }> = {
  'math-bundle': { categoryId: 'math' },
  'literacy-bundle': { categoryId: 'literacy' },
  'visual-bundle': { categoryId: 'visual' },
  'matching-bundle': { categoryId: 'matching' },
  'puzzle-bundle': { categoryId: 'puzzle' },
  'search-bundle': { categoryId: 'search' },
};

const bundlesContent: Record<string, {
  heroTitle: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
  priceFrom: string;
  pricePurchase: string;
}> = {
  en: {
    heroTitle: 'Generator Bundles',
    heroDescription: 'Save with category bundles. Get all generators in a category with a commercial license at a bundled price.',
    metaTitle: 'Printable Generator Bundles | Save with Category Packs | LessonCraftStudio',
    metaDescription: 'Get all generators in a category at a bundled price. 6 bundles covering math, literacy, visual, matching, puzzles, and search. One-time purchase with commercial license.',
    ctaTitle: 'Try Before You Buy',
    ctaDescription: 'All generators are free to try with watermark. See the quality before purchasing a bundle.',
    ctaButton: 'Try Free Generators',
    priceFrom: 'From $79',
    pricePurchase: 'One-time purchase',
  },
  de: {
    heroTitle: 'Generator-Pakete',
    heroDescription: 'Sparen Sie mit Kategorie-Paketen. Erhalten Sie alle Generatoren einer Kategorie mit Gewerbslizenz zum Paketpreis.',
    metaTitle: 'Druckvorlagen-Generator-Pakete | Sparen mit Kategorie-Paketen | LessonCraftStudio',
    metaDescription: 'Alle Generatoren einer Kategorie zum Paketpreis. 6 Pakete f\u00fcr Mathematik, Sprache, Zeichnen, Zuordnung, R\u00e4tsel und Suche. Einmalzahlung mit Gewerbslizenz.',
    ctaTitle: 'Erst testen, dann kaufen',
    ctaDescription: 'Alle Generatoren gratis mit Wasserzeichen testen. \u00dcberzeugen Sie sich vor dem Kauf.',
    ctaButton: 'Generatoren gratis testen',
    priceFrom: 'Ab 79 $',
    pricePurchase: 'Einmalzahlung',
  },
  fr: {
    heroTitle: 'Packs de g\u00e9n\u00e9rateurs',
    heroDescription: '\u00c9conomisez avec les packs par cat\u00e9gorie. Obtenez tous les g\u00e9n\u00e9rateurs d\u2019une cat\u00e9gorie avec licence commerciale \u00e0 prix group\u00e9.',
    metaTitle: 'Packs de g\u00e9n\u00e9rateurs d\u2019imprimables | \u00c9conomisez par cat\u00e9gorie | LessonCraftStudio',
    metaDescription: 'Tous les g\u00e9n\u00e9rateurs d\u2019une cat\u00e9gorie \u00e0 prix group\u00e9. 6 packs couvrant maths, lecture, dessin, association, puzzles et recherche. Achat unique avec licence commerciale.',
    ctaTitle: 'Essayez avant d\u2019acheter',
    ctaDescription: 'Tous les g\u00e9n\u00e9rateurs sont gratuits \u00e0 essayer avec filigrane. Jugez la qualit\u00e9 avant d\u2019acheter.',
    ctaButton: 'Essayer les g\u00e9n\u00e9rateurs',
    priceFrom: '\u00c0 partir de 79 $',
    pricePurchase: 'Achat unique',
  },
  es: {
    heroTitle: 'Packs de generadores',
    heroDescription: 'Ahorra con packs por categor\u00eda. Obt\u00e9n todos los generadores de una categor\u00eda con licencia comercial a precio de pack.',
    metaTitle: 'Packs de generadores de imprimibles | Ahorra por categor\u00eda | LessonCraftStudio',
    metaDescription: 'Todos los generadores de una categor\u00eda a precio de pack. 6 packs de matem\u00e1ticas, lectura, dibujo, asociaci\u00f3n, puzzles y b\u00fasqueda. Compra \u00fanica con licencia comercial.',
    ctaTitle: 'Prueba antes de comprar',
    ctaDescription: 'Todos los generadores son gratis para probar con marca de agua. Comprueba la calidad antes de comprar.',
    ctaButton: 'Probar generadores gratis',
    priceFrom: 'Desde 79 $',
    pricePurchase: 'Compra \u00fanica',
  },
  pt: {
    heroTitle: 'Pacotes de geradores',
    heroDescription: 'Poupe com pacotes por categoria. Obtenha todos os geradores de uma categoria com licen\u00e7a comercial a pre\u00e7o de pacote.',
    metaTitle: 'Pacotes de geradores de imprim\u00edveis | Poupe por categoria | LessonCraftStudio',
    metaDescription: 'Todos os geradores de uma categoria a pre\u00e7o de pacote. 6 pacotes de matem\u00e1tica, leitura, desenho, associa\u00e7\u00e3o, puzzles e pesquisa. Compra \u00fanica com licen\u00e7a comercial.',
    ctaTitle: 'Experimente antes de comprar',
    ctaDescription: 'Todos os geradores s\u00e3o gr\u00e1tis para experimentar com marca d\u2019\u00e1gua. Veja a qualidade antes de comprar.',
    ctaButton: 'Experimentar geradores gr\u00e1tis',
    priceFrom: 'A partir de 79 $',
    pricePurchase: 'Compra \u00fanica',
  },
  it: {
    heroTitle: 'Pacchetti di generatori',
    heroDescription: 'Risparmia con i pacchetti per categoria. Ottieni tutti i generatori di una categoria con licenza commerciale a prezzo pacchetto.',
    metaTitle: 'Pacchetti di generatori di stampabili | Risparmia per categoria | LessonCraftStudio',
    metaDescription: 'Tutti i generatori di una categoria a prezzo pacchetto. 6 pacchetti per matematica, lettere, disegno, abbinamento, puzzle e ricerca. Acquisto singolo con licenza commerciale.',
    ctaTitle: 'Prova prima di acquistare',
    ctaDescription: 'Tutti i generatori sono gratis da provare con filigrana. Verifica la qualit\u00e0 prima dell\u2019acquisto.',
    ctaButton: 'Prova i generatori gratis',
    priceFrom: 'Da 79 $',
    pricePurchase: 'Acquisto singolo',
  },
  nl: {
    heroTitle: 'Generatorpakketten',
    heroDescription: 'Bespaar met categoriepakketten. Krijg alle generatoren van een categorie met commerci\u00eble licentie voor een pakketprijs.',
    metaTitle: 'Printable generatorpakketten | Bespaar per categorie | LessonCraftStudio',
    metaDescription: 'Alle generatoren van een categorie voor een pakketprijs. 6 pakketten voor wiskunde, taal, tekenen, matchen, puzzels en zoeken. Eenmalige aankoop met commerci\u00eble licentie.',
    ctaTitle: 'Probeer voor je koopt',
    ctaDescription: 'Alle generatoren zijn gratis te proberen met watermerk. Bekijk de kwaliteit voor aankoop.',
    ctaButton: 'Generatoren gratis proberen',
    priceFrom: 'Vanaf $ 79',
    pricePurchase: 'Eenmalige aankoop',
  },
  sv: {
    heroTitle: 'Generatorpaket',
    heroDescription: 'Spara med kategoripaket. F\u00e5 alla generatorer i en kategori med kommersiell licens till paketpris.',
    metaTitle: 'Utskriftsgeneratorpaket | Spara med kategoripaket | LessonCraftStudio',
    metaDescription: 'Alla generatorer i en kategori till paketpris. 6 paket f\u00f6r matte, l\u00e4sning, teckning, matchning, pussel och s\u00f6kning. Eng\u00e5ngsk\u00f6p med kommersiell licens.',
    ctaTitle: 'Prova innan du k\u00f6per',
    ctaDescription: 'Alla generatorer \u00e4r gratis att prova med vattenst\u00e4mpel. Se kvaliteten innan k\u00f6p.',
    ctaButton: 'Prova generatorerna gratis',
    priceFrom: 'Fr\u00e5n 79 $',
    pricePurchase: 'Eng\u00e5ngsk\u00f6p',
  },
  da: {
    heroTitle: 'Generatorpakker',
    heroDescription: 'Spar med kategoripakker. F\u00e5 alle generatorer i en kategori med kommerciel licens til pakkepris.',
    metaTitle: 'Printable generatorpakker | Spar med kategoripakker | LessonCraftStudio',
    metaDescription: 'Alle generatorer i en kategori til pakkepris. 6 pakker for matematik, sprog, tegning, matching, puslespil og s\u00f8gning. Engangsk\u00f8b med kommerciel licens.',
    ctaTitle: 'Pr\u00f8v f\u00f8r du k\u00f8ber',
    ctaDescription: 'Alle generatorer er gratis at pr\u00f8ve med vandm\u00e6rke. Se kvaliteten inden k\u00f8b.',
    ctaButton: 'Pr\u00f8v generatorerne gratis',
    priceFrom: 'Fra 79 $',
    pricePurchase: 'Engangsk\u00f8b',
  },
  no: {
    heroTitle: 'Generatorpakker',
    heroDescription: 'Spar med kategoripakker. F\u00e5 alle generatorer i en kategori med kommersiell lisens til pakkepris.',
    metaTitle: 'Utskriftsgeneratorpakker | Spar med kategoripakker | LessonCraftStudio',
    metaDescription: 'Alle generatorer i en kategori til pakkepris. 6 pakker for matte, spr\u00e5k, tegning, matching, puslespill og s\u00f8k. Engangskj\u00f8p med kommersiell lisens.',
    ctaTitle: 'Pr\u00f8v f\u00f8r du kj\u00f8per',
    ctaDescription: 'Alle generatorer er gratis \u00e5 pr\u00f8ve med vannmerke. Se kvaliteten f\u00f8r kj\u00f8p.',
    ctaButton: 'Pr\u00f8v generatorene gratis',
    priceFrom: 'Fra 79 $',
    pricePurchase: 'Engangskj\u00f8p',
  },
  fi: {
    heroTitle: 'Generaattoripaketit',
    heroDescription: 'S\u00e4\u00e4st\u00e4 kategoriapaketilla. Saat kaikki kategorian generaattorit kaupallisella lisenssill\u00e4 pakettihintaan.',
    metaTitle: 'Tulostettavien generaattoripaketit | S\u00e4\u00e4st\u00e4 kategoriapaketilla | LessonCraftStudio',
    metaDescription: 'Kaikki kategorian generaattorit pakettihintaan. 6 pakettia matematiikkaan, kieliin, piirt\u00e4miseen, yhdist\u00e4miseen, pulmiin ja etsimiseen. Kertaosto kaupallisella lisenssill\u00e4.',
    ctaTitle: 'Kokeile ennen ostoa',
    ctaDescription: 'Kaikkia generaattoreita voi kokeilla ilmaiseksi vesileimalla. Tarkista laatu ennen ostoa.',
    ctaButton: 'Kokeile generaattoreita ilmaiseksi',
    priceFrom: 'Alkaen 79 $',
    pricePurchase: 'Kertaosto',
  },
};

export const revalidate = 3600;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale;
  const t = bundlesContent[locale] || bundlesContent.en;
  const title = t.metaTitle;
  const description = t.metaDescription;

  const alternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    alternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/bundles`;
  }
  alternates['x-default'] = `${baseUrl}/en/bundles`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/bundles`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/${locale}/bundles`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
    },
  };
}

export default async function BundlesListingPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as SupportedLocale;
  const t = bundlesContent[locale] || bundlesContent.en;

  // Load bundle content for each bundle to get localized names/taglines
  const bundleContentMap: Record<string, { title: string; tagline: string }> = {};
  for (const bundle of bundlePageSlugs) {
    const content = await getBundleContent(bundle.bundleId, locale);
    if (content) {
      bundleContentMap[bundle.bundleId] = {
        title: content.hero.title,
        tagline: content.hero.tagline,
      };
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 md:py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.heroTitle}
          </h1>
          <p className="text-lg text-gray-600">
            {t.heroDescription}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundlePageSlugs.map(bundle => {
              const info = bundleInfo[bundle.bundleId];
              if (!info) return null;
              const slug = getBundleSlugForLocale(bundle.bundleId, locale) || bundle.slugs.en;
              const catData = APP_CATEGORIES[info.categoryId as keyof typeof APP_CATEGORIES];
              const bc = bundleContentMap[bundle.bundleId];

              return (
                <Link
                  key={bundle.bundleId}
                  href={`/${locale}/bundles/${slug}`}
                  className="p-6 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: `${catData?.color || '#6366f1'}15` }}>
                      📦
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">{bc?.title || bundle.bundleId}</h2>
                  </div>
                  <p className="text-gray-600 text-sm">{bc?.tagline || ''}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-indigo-600 font-medium">{t.priceFrom}</span>
                    <span className="text-sm text-gray-500">{t.pricePurchase}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {{ en: 'Explore More', de: 'Mehr entdecken', fr: 'Explorer plus', es: 'Explorar m\u00e1s', pt: 'Explorar mais', it: 'Esplora di pi\u00f9', nl: 'Ontdek meer', sv: 'Utforska mer', da: 'Udforsk mere', no: 'Utforsk mer', fi: 'Tutustu lis\u00e4\u00e4' }[locale] || 'Explore More'}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/tools`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'Free Tools', de: 'Kostenlose Tools', fr: 'Outils gratuits', es: 'Herramientas gratis', pt: 'Ferramentas gr\u00e1tis', it: 'Strumenti gratuiti', nl: 'Gratis tools', sv: 'Gratisverktyg', da: 'Gratis v\u00e6rkt\u00f8jer', no: 'Gratisverkt\u00f8y', fi: 'Ilmaiset ty\u00f6kalut' }[locale] || 'Free Tools'}
            </Link>
            <Link href={`/${locale}/guides`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'How-To Guides', de: 'Anleitungen', fr: 'Guides pratiques', es: 'Gu\u00edas', pt: 'Guias', it: 'Guide', nl: 'Handleidingen', sv: 'Guider', da: 'Vejledninger', no: 'Veiledninger', fi: 'Oppaat' }[locale] || 'How-To Guides'}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{t.ctaTitle}</h2>
          <p className="text-indigo-100 mb-8 max-w-lg mx-auto">
            {t.ctaDescription}
          </p>
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
          >
            {t.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
