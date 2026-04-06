import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { bundlePageSlugs, getBundleSlugForLocale } from '@/config/bundle-page-slugs';
import { getHreflangCode, ogLocaleMap, generateBundlesCollectionSchema, generateBundlesItemListSchema } from '@/lib/schema-generator';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { APP_CATEGORIES } from '@/config/products';
import { getBundleContent } from '@/config/bundle-content';

const baseUrl = 'https://www.lessoncraftstudio.com';

const bundlesKeywords: Record<string, string[]> = {
  en: ['worksheet generator bundles', 'printable maker bundle deals', 'educational worksheet tools bundle', 'Etsy printable generator packs', 'commercial license printable bundles', 'category bundle for printable sellers'],
  de: ['Arbeitsblatt Generator Bundles', 'Druckvorlagen-Tool Bundle Angebote', 'Arbeitsblatt-Ersteller Paket'],
  fr: ['packs générateurs fiches', 'lot générateurs imprimables', 'packs Etsy imprimables', 'lot cahiers activités KDP', 'licence commerciale pack', 'pack par catégorie'],
  es: ['paquete generadores de fichas', 'pack generadores licencia comercial', 'paquete fichas matemáticas Etsy', 'bundle generadores imprimibles', 'paquete por categoría generadores', 'ahorro paquete generadores fichas'],
  pt: ['pacotes geradores de atividades', 'pacote atividades licença comercial', 'pacote atividades matemática Etsy', 'kit geradores imprimíveis', 'pacote por categoria geradores', 'economia pacote geradores atividades'],
  it: ['pacchetti stampabili', 'bundle di schede', 'pacchetti Etsy stampabili', 'bundle libri attività KDP', 'licenza commerciale pacchetto', 'pacchetto per categoria'],
  nl: ['bundels generators commerciële licentie', 'printable bundel korting', 'werkbladen pakket Etsy', 'rekenbladen bundel KDP', 'Bol.com printables bundel'],
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
    heroTitle: 'Generator Bundles with Commercial License',
    heroDescription: 'Save with category bundles. Get all generators in a category with commercial license to sell on Etsy, KDP & more.',
    metaTitle: 'Category Bundles | Save Up to 57% on Worksheet Generators',
    metaDescription: 'Get all worksheet generators in a category for one price. Math, Language, Visual, Matching, Puzzles, and Search bundles. Save up to 57% vs. individual pricing.',
    ctaTitle: 'Try Before You Buy',
    ctaDescription: 'All generators are free to try with watermark. See the quality before purchasing a bundle.',
    ctaButton: 'Try Free Generators',
    priceFrom: '$149',
    pricePurchase: 'One-time purchase',
  },
  de: {
    heroTitle: 'Generator-Pakete',
    heroDescription: 'Sparen Sie mit Kategorie-Paketen. Erhalten Sie alle Generatoren einer Kategorie mit Gewerbslizenz zum Paketpreis.',
    metaTitle: 'Kategorie-Bundles | Bis zu 57 % sparen auf Arbeitsblatt-Generatoren',
    metaDescription: 'Alle Arbeitsblatt-Generatoren einer Kategorie zum Bundle-Preis. Mathe, Sprache, Visuell, Zuordnung, Rätsel und Suchspiel-Bundles. Bis zu 57 % sparen.',
    ctaTitle: 'Erst testen, dann kaufen',
    ctaDescription: 'Alle Generatoren gratis mit Wasserzeichen testen. Überzeugen Sie sich vor dem Kauf.',
    ctaButton: 'Generatoren gratis testen',
    priceFrom: '$149',
    pricePurchase: 'Einmalzahlung',
  },
  fr: {
    heroTitle: 'Packs de générateurs',
    heroDescription: 'Économisez avec les packs par catégorie. Obtenez tous les générateurs d\'une catégorie avec licence commerciale à prix groupé.',
    metaTitle: 'Packs de générateurs par catégorie | Économisez | LessonCraftStudio',
    metaDescription: 'Tous les générateurs d\'une catégorie à prix groupé. 6 packs couvrant maths, vocabulaire, dessin, association, puzzles et jeux. Achat unique, licence commerciale.',
    ctaTitle: 'Essayez avant d\'acheter',
    ctaDescription: 'Tous les générateurs sont gratuits à essayer avec filigrane. Jugez la qualité avant d\'acheter.',
    ctaButton: 'Essayer les générateurs',
    priceFrom: '$149',
    pricePurchase: 'Achat unique',
  },
  es: {
    heroTitle: 'Paquetes de generadores con licencia comercial',
    heroDescription: 'Ahorre con paquetes por categoría. Obtenga todos los generadores de una categoría con licencia comercial a precio de paquete.',
    metaTitle: 'Paquetes con licencia comercial | LCS',
    metaDescription: 'Todos los generadores de una categoría a precio de paquete. 6 paquetes de matemáticas, lectura, dibujo, asociación, puzzles y búsqueda. Licencia comercial.',
    ctaTitle: 'Pruebe antes de comprar',
    ctaDescription: 'Todos los generadores son gratis para probar con marca de agua. Compruebe la calidad antes de comprar.',
    ctaButton: 'Probar generadores gratis',
    priceFrom: '$149',
    pricePurchase: 'Compra única',
  },
  pt: {
    heroTitle: 'Pacotes com licença comercial',
    heroDescription: 'Economize com pacotes por categoria. Todos os geradores de uma categoria com licença comercial para vender na Hotmart, Etsy e KDP.',
    metaTitle: 'Pacotes geradores com licença comercial | LCS',
    metaDescription: 'Pacotes de geradores com licença comercial por categoria. Matemática, alfabetização, visual, associação, puzzles e jogos.',
    ctaTitle: 'Teste antes de comprar',
    ctaDescription: 'Todos os geradores são grátis para testar com marca d\'água. Veja a qualidade antes de comprar.',
    ctaButton: 'Testar geradores grátis',
    priceFrom: '$149',
    pricePurchase: 'Compra única',
  },
  it: {
    heroTitle: 'Pacchetti di generatori',
    heroDescription: 'Risparmia con i pacchetti per categoria. Ottieni tutti i generatori di una categoria con licenza commerciale a prezzo pacchetto.',
    metaTitle: 'Pacchetti con licenza commerciale | LessonCraftStudio',
    metaDescription: '6 pacchetti di generatori con licenza commerciale per vendere su Etsy e KDP. Matematica, lettere, disegno, abbinamento, puzzle e ricerca.',
    ctaTitle: 'Prova prima di acquistare',
    ctaDescription: 'Tutti i generatori sono gratis da provare con filigrana. Verifica la qualità prima dell\'acquisto.',
    ctaButton: 'Prova i generatori gratis',
    priceFrom: '$149',
    pricePurchase: 'Acquisto singolo',
  },
  nl: {
    heroTitle: 'Generatorpakketten',
    heroDescription: 'Bespaar met categoriepakketten. Krijg alle generatoren van een categorie met commerciële licentie voor een pakketprijs.',
    metaTitle: 'Bundels met commerciële licentie | LessonCraftStudio',
    metaDescription: 'Professionele bundels van printable-generators met commerciële licentie. Bespaar tot 60% ten opzichte van losse aankopen. Verkoop op Etsy, KDP en Bol.com.',
    ctaTitle: 'Probeer voor je koopt',
    ctaDescription: 'Alle generatoren zijn gratis te proberen met watermerk. Bekijk de kwaliteit voor aankoop.',
    ctaButton: 'Generatoren gratis proberen',
    priceFrom: '$149',
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
    priceFrom: '$149',
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
    priceFrom: '$149',
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
    priceFrom: '$149',
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
    priceFrom: '$149',
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

  const collectionSchema = generateBundlesCollectionSchema(locale);
  const allBundles = bundlePageSlugs.map(b => ({
    name: bundleContentMap[b.bundleId]?.title || b.bundleId,
    slug: getBundleSlugForLocale(b.bundleId, locale) || b.slugs.en,
  }));
  const itemListSchema = generateBundlesItemListSchema(locale, allBundles);

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
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
