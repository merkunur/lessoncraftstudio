import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import {
  getHreflangCode,
  ogLocaleMap,
  localizedHomeLabel,
} from '@/lib/schema-generator';
import { getThemeContent, getThemeIds } from '@/config/theme-page-content';
import { getThemeSlug } from '@/config/theme-slugs';
import { getThemePreviewImages } from '@/lib/theme-images';

export const revalidate = 3600;

// ── Metadata ──────────────────────────────────────────────────────

const pageTitle: Record<string, string> = {
  en: 'Free Themed Worksheets for Kids | LessonCraftStudio',
  de: 'Kostenlose Themen-Arbeitsbl\u00e4tter f\u00fcr Kinder | LessonCraftStudio',
  fr: 'Fiches Th\u00e9matiques Gratuites pour Enfants | LessonCraftStudio',
  es: 'Fichas Tem\u00e1ticas Gratis para Ni\u00f1os | LessonCraftStudio',
  pt: 'Atividades Tem\u00e1ticas Gratuitas para Crian\u00e7as | LessonCraftStudio',
  it: 'Schede Tematiche Gratuite per Bambini | LessonCraftStudio',
  nl: 'Gratis Thema-Werkbladen voor Kinderen | LessonCraftStudio',
  sv: 'Gratis Temaarbetsblad f\u00f6r Barn | LessonCraftStudio',
  da: 'Gratis Temaarbejdsark til B\u00f8rn | LessonCraftStudio',
  no: 'Gratis Temaarbeidsark for Barn | LessonCraftStudio',
  fi: 'Ilmaiset Teematy\u00f6lehdet Lapsille | LessonCraftStudio',
};

const pageDescription: Record<string, string> = {
  en: 'Browse 50 themed worksheet collections for kids. Animals, dinosaurs, space, ocean, and more. Free printable math, reading, coloring, and puzzle activities for preschool through 3rd grade.',
  de: 'Entdecken Sie 50 thematische Arbeitsblatt-Sammlungen f\u00fcr Kinder. Tiere, Dinosaurier, Weltraum, Ozean und mehr. Kostenlose Mathe-, Lese-, Mal- und R\u00e4tselaktivit\u00e4ten f\u00fcr Vorschule bis 3. Klasse.',
  fr: 'Parcourez 50 collections de fiches th\u00e9matiques pour enfants. Animaux, dinosaures, espace, oc\u00e9an et plus. Activit\u00e9s de maths, lecture, coloriage et puzzles gratuits de la maternelle au CE2.',
  es: 'Explore 50 colecciones de fichas tem\u00e1ticas para ni\u00f1os. Animales, dinosaurios, espacio, oc\u00e9ano y m\u00e1s. Actividades gratuitas de matem\u00e1ticas, lectura, colorear y rompecabezas para preescolar hasta 3\u00b0 grado.',
  pt: 'Explore 50 cole\u00e7\u00f5es de atividades tem\u00e1ticas para crian\u00e7as. Animais, dinossauros, espa\u00e7o, oceano e mais. Atividades gratuitas de matem\u00e1tica, leitura, colorir e quebra-cabe\u00e7as da pr\u00e9-escola ao 3\u00ba ano.',
  it: "Sfoglia 50 collezioni di schede tematiche per bambini. Animali, dinosauri, spazio, oceano e altro. Attivit\u00e0 gratuite di matematica, lettura, colorare e puzzle dalla scuola dell'infanzia alla terza elementare.",
  nl: 'Ontdek 50 thematische werkbladverzamelingen voor kinderen. Dieren, dinosaurussen, ruimte, oceaan en meer. Gratis reken-, lees-, kleur- en puzzelactiviteiten van kleuterschool tot groep 5.',
  sv: 'Bl\u00e4ddra bland 50 tematiska arbetsbladssamlingar f\u00f6r barn. Djur, dinosaurier, rymden, havet och mer. Gratis matte-, l\u00e4s-, m\u00e5lar- och pusselaktiviteter f\u00f6r f\u00f6rskola till \u00e5rskurs 3.',
  da: 'Udforsk 50 tematiske arbejdsarkssamlinger til b\u00f8rn. Dyr, dinosaurer, rummet, havet og mere. Gratis matematik-, l\u00e6se-, male- og puslespilsaktiviteter fra b\u00f8rnehave til 3. klasse.',
  no: 'Utforsk 50 tematiske arbeidsarksamlinger for barn. Dyr, dinosaurer, verdensrommet, havet og mer. Gratis matte-, lese-, fargeleggings- og puslespillaktiviteter fra barnehage til 4. klasse.',
  fi: 'Selaa 50 teemallista ty\u00f6lehtikokoelmaa lapsille. El\u00e4imet, dinosaurukset, avaruus, meri ja paljon muuta. Ilmaisia matematiikka-, luku-, v\u00e4ritys- ja pulmateht\u00e4vi\u00e4 esikoulusta 3. luokkaan.',
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale || 'en';
  const baseUrl = 'https://www.lessoncraftstudio.com';

  const title = pageTitle[locale] || pageTitle.en;
  const description = pageDescription[locale] || pageDescription.en;

  const hreflangAlternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    hreflangAlternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/worksheets`;
  }
  hreflangAlternates['x-default'] = `${baseUrl}/en/worksheets`;

  return {
    title,
    description,
    keywords: 'themed worksheets, kids worksheets, printable worksheets, educational activities, preschool worksheets, kindergarten worksheets',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/worksheets`,
      languages: hreflangAlternates,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/${locale}/worksheets`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
    },
  };
}

// ── Localized UI labels ───────────────────────────────────────────

const worksheetsLabel: Record<string, string> = {
  en: 'Worksheets',
  de: 'Arbeitsbl\u00e4tter',
  fr: 'Fiches',
  es: 'Fichas',
  pt: 'Atividades',
  it: 'Schede',
  nl: 'Werkbladen',
  sv: 'Arbetsblad',
  da: 'Arbejdsark',
  no: 'Arbeidsark',
  fi: 'Ty\u00f6lehdet',
};

const pageHeading: Record<string, string> = {
  en: 'Themed Worksheets for Kids',
  de: 'Themen-Arbeitsbl\u00e4tter f\u00fcr Kinder',
  fr: 'Fiches Th\u00e9matiques pour Enfants',
  es: 'Fichas Tem\u00e1ticas para Ni\u00f1os',
  pt: 'Atividades Tem\u00e1ticas para Crian\u00e7as',
  it: 'Schede Tematiche per Bambini',
  nl: 'Thema-Werkbladen voor Kinderen',
  sv: 'Temaarbetsblad f\u00f6r Barn',
  da: 'Temaarbejdsark til B\u00f8rn',
  no: 'Temaarbeidsark for Barn',
  fi: 'Teematy\u00f6lehdet Lapsille',
};

const pageIntro: Record<string, string> = {
  en: 'Choose from 50 engaging themes to make learning fun. Each theme includes math, reading, coloring, puzzles, and more \u2014 all free to create and print.',
  de: 'W\u00e4hlen Sie aus 50 spannenden Themen, um das Lernen zum Spa\u00df zu machen. Jedes Thema enth\u00e4lt Mathe, Lesen, Malen, R\u00e4tsel und mehr \u2014 alles kostenlos zum Erstellen und Drucken.',
  fr: "Choisissez parmi 50 th\u00e8mes captivants pour rendre l'apprentissage amusant. Chaque th\u00e8me comprend des maths, de la lecture, du coloriage, des puzzles et plus \u2014 le tout gratuit \u00e0 cr\u00e9er et imprimer.",
  es: 'Elija entre 50 temas atractivos para hacer el aprendizaje divertido. Cada tema incluye matem\u00e1ticas, lectura, colorear, rompecabezas y m\u00e1s \u2014 todo gratis para crear e imprimir.',
  pt: 'Escolha entre 50 temas envolventes para tornar o aprendizado divertido. Cada tema inclui matem\u00e1tica, leitura, colorir, quebra-cabe\u00e7as e mais \u2014 tudo gratuito para criar e imprimir.',
  it: "Scegli tra 50 temi coinvolgenti per rendere l'apprendimento divertente. Ogni tema include matematica, lettura, colorare, puzzle e altro \u2014 tutto gratuito da creare e stampare.",
  nl: "Kies uit 50 boeiende thema's om het leren leuk te maken. Elk thema bevat rekenen, lezen, kleuren, puzzels en meer \u2014 allemaal gratis te maken en af te drukken.",
  sv: 'V\u00e4lj bland 50 engagerande teman f\u00f6r att g\u00f6ra l\u00e4randet roligt. Varje tema inneh\u00e5ller matte, l\u00e4sning, m\u00e5lning, pussel och mer \u2014 allt gratis att skapa och skriva ut.',
  da: 'V\u00e6lg mellem 50 engagerende temaer for at g\u00f8re l\u00e6ring sjovt. Hvert tema inkluderer matematik, l\u00e6sning, tegning, puslespil og mere \u2014 alt gratis at oprette og udskrive.',
  no: 'Velg blant 50 engasjerende temaer for \u00e5 gj\u00f8re l\u00e6ring morsomt. Hvert tema inkluderer matte, lesing, fargelegging, puslespill og mer \u2014 alt gratis \u00e5 lage og skrive ut.',
  fi: 'Valitse 50 mukaansatempaavasta teemasta, jotka tekev\u00e4t oppimisesta hauskaa. Jokainen teema sis\u00e4lt\u00e4\u00e4 matematiikkaa, lukemista, v\u00e4ritt\u00e4mist\u00e4, pulmia ja paljon muuta \u2014 kaikki ilmaista luoda ja tulostaa.',
};

const browseThemesLabel: Record<string, string> = {
  en: 'Browse All 50 Themes',
  de: 'Alle 50 Themen entdecken',
  fr: 'Parcourir les 50 th\u00e8mes',
  es: 'Explorar los 50 temas',
  pt: 'Explorar os 50 temas',
  it: 'Sfoglia tutti i 50 temi',
  nl: "Bekijk alle 50 thema's",
  sv: 'Bl\u00e4ddra bland alla 50 teman',
  da: 'Udforsk alle 50 temaer',
  no: 'Utforsk alle 50 temaer',
  fi: 'Selaa kaikkia 50 teemaa',
};

const viewThemeLabel: Record<string, string> = {
  en: 'View worksheets',
  de: 'Arbeitsbl\u00e4tter ansehen',
  fr: 'Voir les fiches',
  es: 'Ver fichas',
  pt: 'Ver atividades',
  it: 'Vedi schede',
  nl: 'Werkbladen bekijken',
  sv: 'Visa arbetsblad',
  da: 'Se arbejdsark',
  no: 'Se arbeidsark',
  fi: 'N\u00e4yt\u00e4 ty\u00f6lehdet',
};

// ── Page component ────────────────────────────────────────────────

export default async function WorksheetsHubPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale || 'en';
  const baseUrl = 'https://www.lessoncraftstudio.com';
  const pageUrl = `${baseUrl}/${locale}/worksheets`;

  // Get all theme IDs and build theme data
  const themeIds = getThemeIds();
  const themes = await Promise.all(
    themeIds.map(async (themeId) => {
      const content = getThemeContent(themeId, locale);
      const slug = getThemeSlug(themeId, locale);
      if (!content || !slug) return null;
      const images = await getThemePreviewImages(themeId, 3);
      return { themeId, slug, name: content.name, description: content.description, images };
    })
  );
  const validThemes = themes.filter(Boolean) as Array<{
    themeId: string; slug: string; name: string; description: string; images: string[];
  }>;

  // JSON-LD: CollectionPage
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageHeading[locale] || pageHeading.en,
    description: pageDescription[locale] || pageDescription.en,
    url: pageUrl,
    inLanguage: getHreflangCode(locale),
    isPartOf: {
      '@type': 'WebSite',
      name: 'LessonCraftStudio',
      url: baseUrl,
    },
    hasPart: validThemes.slice(0, 50).map((theme, i) => ({
      '@type': 'CreativeWork',
      name: theme.name,
      url: `${baseUrl}/${locale}/worksheets/${theme.slug}`,
      position: i + 1,
    })),
  };

  // JSON-LD: BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: localizedHomeLabel[locale] || 'Home',
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: worksheetsLabel[locale] || 'Worksheets',
      },
    ],
  };

  // JSON-LD: ItemList (for potential SERP carousel)
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pageHeading[locale] || pageHeading.en,
    numberOfItems: validThemes.length,
    itemListElement: validThemes.map((theme, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: theme.name,
      url: `${baseUrl}/${locale}/worksheets/${theme.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-600 to-purple-700 text-white py-14">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-purple-200 text-sm mb-4" aria-label="Breadcrumb">
            <Link href={`/${locale}`} className="hover:text-white">
              {localizedHomeLabel[locale] || 'Home'}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{worksheetsLabel[locale] || 'Worksheets'}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {pageHeading[locale] || pageHeading.en}
          </h1>
          <p className="text-lg text-purple-100 max-w-3xl leading-relaxed">
            {pageIntro[locale] || pageIntro.en}
          </p>
        </div>
      </section>

      {/* Theme Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {browseThemesLabel[locale] || browseThemesLabel.en}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {validThemes.map(theme => (
              <Link
                key={theme.themeId}
                href={`/${locale}/worksheets/${theme.slug}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
              >
                {theme.images.length > 0 ? (
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4">
                    <div className="flex justify-center gap-2">
                      {theme.images.slice(0, 3).map((src, i) => (
                        <div key={i} className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-white shadow-sm">
                          <img
                            src={src}
                            alt={`${theme.name} clipart ${i + 1}`}
                            width={80}
                            height={80}
                            loading="lazy"
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-8 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{theme.name}</span>
                  </div>
                )}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{theme.name}</h3>
                  <span className="mt-auto inline-flex items-center text-purple-600 text-sm font-medium pt-2">
                    {viewThemeLabel[locale] || viewThemeLabel.en}
                    <span className="ml-1" aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
