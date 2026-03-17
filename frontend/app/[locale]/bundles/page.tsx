import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { bundlePageSlugs, getBundleSlugForLocale } from '@/config/bundle-page-slugs';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { APP_CATEGORIES } from '@/config/warriorplus-products';
import { getBundleContent } from '@/config/bundle-content';

const baseUrl = 'https://www.lessoncraftstudio.com';

const bundlesKeywords: Record<string, string[]> = {
  en: ['printable bundles', 'worksheet bundle deal', 'Etsy printable packs', 'KDP activity book bundle', 'commercial license bundle', 'printable category pack'],
  de: ['Druckvorlagen-Pakete', 'Arbeitsblatt-Bundle', 'Etsy Druckvorlagen-Pack', 'KDP Aktivitätsbuch-Paket', 'kommerzielle Lizenz Paket', 'Kategorie-Paket'],
  fr: ['packs imprimables', 'lot de fiches', 'packs Etsy imprimables', 'lot livres activités KDP', 'licence commerciale pack', 'pack par catégorie'],
  es: ['packs de imprimibles', 'lote de fichas', 'packs Etsy imprimibles', 'lote libros actividades KDP', 'licencia comercial pack', 'pack por categoría'],
  pt: ['pacotes de imprimíveis', 'lote de fichas', 'pacotes Etsy imprimíveis', 'lote livros atividades KDP', 'licença comercial pacote', 'pacote por categoria'],
  it: ['pacchetti stampabili', 'bundle di schede', 'pacchetti Etsy stampabili', 'bundle libri attività KDP', 'licenza commerciale pacchetto', 'pacchetto per categoria'],
  nl: ['printable bundels', 'werkbladbundel', 'Etsy printable pakketten', 'KDP activiteitenboek bundel', 'commerciële licentie pakket', 'categoriepakket'],
  sv: ['utskriftspaket', 'arbetsbladspaket', 'Etsy utskriftspaket', 'KDP aktivitetsbokspaket', 'kommersiell licens paket', 'kategoripaket'],
  da: ['printbare pakker', 'opgavepakke', 'Etsy printable pakker', 'KDP aktivitetsbogspakke', 'kommerciel licens pakke', 'kategoripakke'],
  no: ['utskriftspakker', 'oppgavepakke', 'Etsy utskriftspakker', 'KDP aktivitetsbokpakke', 'kommersiell lisens pakke', 'kategoripakke'],
  fi: ['tulostettavat paketit', 'tehtäväpaketti', 'Etsy tulostettavat paketit', 'KDP aktiviteettikirjapaketti', 'kaupallinen lisenssi paketti', 'kategoriapaketti'],
};

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
    metaDescription: 'Alle Generatoren einer Kategorie zum Paketpreis. 6 Pakete für Mathematik, Sprache, Zeichnen, Zuordnung, Rätsel und Suche. Einmalzahlung mit Gewerbslizenz.',
    ctaTitle: 'Erst testen, dann kaufen',
    ctaDescription: 'Alle Generatoren gratis mit Wasserzeichen testen. Überzeugen Sie sich vor dem Kauf.',
    ctaButton: 'Generatoren gratis testen',
    priceFrom: 'Ab 79 $',
    pricePurchase: 'Einmalzahlung',
  },
  fr: {
    heroTitle: 'Packs de générateurs',
    heroDescription: 'Économisez avec les packs par catégorie. Obtenez tous les générateurs d’une catégorie avec licence commerciale à prix groupé.',
    metaTitle: 'Packs de générateurs d’imprimables | Économisez par catégorie | LessonCraftStudio',
    metaDescription: 'Tous les générateurs d’une catégorie à prix groupé. 6 packs couvrant maths, lecture, dessin, association, puzzles et recherche. Achat unique avec licence commerciale.',
    ctaTitle: 'Essayez avant d’acheter',
    ctaDescription: 'Tous les générateurs sont gratuits à essayer avec filigrane. Jugez la qualité avant d’acheter.',
    ctaButton: 'Essayer les générateurs',
    priceFrom: 'À partir de 79 $',
    pricePurchase: 'Achat unique',
  },
  es: {
    heroTitle: 'Packs de generadores',
    heroDescription: 'Ahorra con packs por categoría. Obtén todos los generadores de una categoría con licencia comercial a precio de pack.',
    metaTitle: 'Packs de generadores de imprimibles | Ahorra por categoría | LessonCraftStudio',
    metaDescription: 'Todos los generadores de una categoría a precio de pack. 6 packs de matemáticas, lectura, dibujo, asociación, puzzles y búsqueda. Compra única con licencia comercial.',
    ctaTitle: 'Prueba antes de comprar',
    ctaDescription: 'Todos los generadores son gratis para probar con marca de agua. Comprueba la calidad antes de comprar.',
    ctaButton: 'Probar generadores gratis',
    priceFrom: 'Desde 79 $',
    pricePurchase: 'Compra única',
  },
  pt: {
    heroTitle: 'Pacotes de geradores',
    heroDescription: 'Poupe com pacotes por categoria. Obtenha todos os geradores de uma categoria com licença comercial a preço de pacote.',
    metaTitle: 'Pacotes de geradores de imprimíveis | Poupe por categoria | LessonCraftStudio',
    metaDescription: 'Todos os geradores de uma categoria a preço de pacote. 6 pacotes de matemática, leitura, desenho, associação, puzzles e pesquisa. Compra única com licença comercial.',
    ctaTitle: 'Experimente antes de comprar',
    ctaDescription: 'Todos os geradores são grátis para experimentar com marca d’água. Veja a qualidade antes de comprar.',
    ctaButton: 'Experimentar geradores grátis',
    priceFrom: 'A partir de 79 $',
    pricePurchase: 'Compra única',
  },
  it: {
    heroTitle: 'Pacchetti di generatori',
    heroDescription: 'Risparmia con i pacchetti per categoria. Ottieni tutti i generatori di una categoria con licenza commerciale a prezzo pacchetto.',
    metaTitle: 'Pacchetti di generatori di stampabili | Risparmia per categoria | LessonCraftStudio',
    metaDescription: 'Tutti i generatori di una categoria a prezzo pacchetto. 6 pacchetti per matematica, lettere, disegno, abbinamento, puzzle e ricerca. Acquisto singolo con licenza commerciale.',
    ctaTitle: 'Prova prima di acquistare',
    ctaDescription: 'Tutti i generatori sono gratis da provare con filigrana. Verifica la qualità prima dell’acquisto.',
    ctaButton: 'Prova i generatori gratis',
    priceFrom: 'Da 79 $',
    pricePurchase: 'Acquisto singolo',
  },
  nl: {
    heroTitle: 'Generatorpakketten',
    heroDescription: 'Bespaar met categoriepakketten. Krijg alle generatoren van een categorie met commerciële licentie voor een pakketprijs.',
    metaTitle: 'Printable generatorpakketten | Bespaar per categorie | LessonCraftStudio',
    metaDescription: 'Alle generatoren van een categorie voor een pakketprijs. 6 pakketten voor wiskunde, taal, tekenen, matchen, puzzels en zoeken. Eenmalige aankoop met commerciële licentie.',
    ctaTitle: 'Probeer voor je koopt',
    ctaDescription: 'Alle generatoren zijn gratis te proberen met watermerk. Bekijk de kwaliteit voor aankoop.',
    ctaButton: 'Generatoren gratis proberen',
    priceFrom: 'Vanaf $ 79',
    pricePurchase: 'Eenmalige aankoop',
  },
  sv: {
    heroTitle: 'Generatorpaket',
    heroDescription: 'Spara med kategoripaket. Få alla generatorer i en kategori med kommersiell licens till paketpris.',
    metaTitle: 'Utskriftsgeneratorpaket | Spara med kategoripaket | LessonCraftStudio',
    metaDescription: 'Alla generatorer i en kategori till paketpris. 6 paket för matte, läsning, teckning, matchning, pussel och sökning. Engångsköp med kommersiell licens.',
    ctaTitle: 'Prova innan du köper',
    ctaDescription: 'Alla generatorer är gratis att prova med vattenstämpel. Se kvaliteten innan köp.',
    ctaButton: 'Prova generatorerna gratis',
    priceFrom: 'Från 79 $',
    pricePurchase: 'Engångsköp',
  },
  da: {
    heroTitle: 'Generatorpakker',
    heroDescription: 'Spar med kategoripakker. Få alle generatorer i en kategori med kommerciel licens til pakkepris.',
    metaTitle: 'Printable generatorpakker | Spar med kategoripakker | LessonCraftStudio',
    metaDescription: 'Alle generatorer i en kategori til pakkepris. 6 pakker for matematik, sprog, tegning, matching, puslespil og søgning. Engangskøb med kommerciel licens.',
    ctaTitle: 'Prøv før du køber',
    ctaDescription: 'Alle generatorer er gratis at prøve med vandmærke. Se kvaliteten inden køb.',
    ctaButton: 'Prøv generatorerne gratis',
    priceFrom: 'Fra 79 $',
    pricePurchase: 'Engangskøb',
  },
  no: {
    heroTitle: 'Generatorpakker',
    heroDescription: 'Spar med kategoripakker. Få alle generatorer i en kategori med kommersiell lisens til pakkepris.',
    metaTitle: 'Utskriftsgeneratorpakker | Spar med kategoripakker | LessonCraftStudio',
    metaDescription: 'Alle generatorer i en kategori til pakkepris. 6 pakker for matte, språk, tegning, matching, puslespill og søk. Engangskjøp med kommersiell lisens.',
    ctaTitle: 'Prøv før du kjøper',
    ctaDescription: 'Alle generatorer er gratis å prøve med vannmerke. Se kvaliteten før kjøp.',
    ctaButton: 'Prøv generatorene gratis',
    priceFrom: 'Fra 79 $',
    pricePurchase: 'Engangskjøp',
  },
  fi: {
    heroTitle: 'Generaattoripaketit',
    heroDescription: 'Säästä kategoriapaketilla. Saat kaikki kategorian generaattorit kaupallisella lisenssillä pakettihintaan.',
    metaTitle: 'Tulostettavien generaattoripaketit | Säästä kategoriapaketilla | LessonCraftStudio',
    metaDescription: 'Kaikki kategorian generaattorit pakettihintaan. 6 pakettia matematiikkaan, kieliin, piirtämiseen, yhdistämiseen, pulmiin ja etsimiseen. Kertaosto kaupallisella lisenssillä.',
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
    keywords: bundlesKeywords[locale] || bundlesKeywords.en,
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
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://www.lessoncraftstudio.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: t.heroTitle },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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
            {{ en: 'Explore More', de: 'Mehr entdecken', fr: 'Explorer plus', es: 'Explorar más', pt: 'Explorar mais', it: 'Esplora di più', nl: 'Ontdek meer', sv: 'Utforska mer', da: 'Udforsk mere', no: 'Utforsk mer', fi: 'Tutustu lisää' }[locale] || 'Explore More'}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/tools`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'Free Tools', de: 'Kostenlose Tools', fr: 'Outils gratuits', es: 'Herramientas gratis', pt: 'Ferramentas grátis', it: 'Strumenti gratuiti', nl: 'Gratis tools', sv: 'Gratisverktyg', da: 'Gratis værktøjer', no: 'Gratisverktøy', fi: 'Ilmaiset työkalut' }[locale] || 'Free Tools'}
            </Link>
            <Link href={`/${locale}/guides`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'How-To Guides', de: 'Anleitungen', fr: 'Guides pratiques', es: 'Guías', pt: 'Guias', it: 'Guide', nl: 'Handleidingen', sv: 'Guider', da: 'Vejledninger', no: 'Veiledninger', fi: 'Oppaat' }[locale] || 'How-To Guides'}
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
