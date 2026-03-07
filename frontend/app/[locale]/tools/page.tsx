import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { toolPageSlugs, getToolSlugForLocale } from '@/config/tool-page-slugs';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { ALL_APPS, APP_CATEGORIES, type AppId } from '@/config/warriorplus-products';
import { getLocalizedAppName } from '@/config/app-translations';

const baseUrl = 'https://www.lessoncraftstudio.com';

const toolToWpApp: Record<string, string> = {
  'word-search': 'wordsearch',
  'image-addition': 'addition',
  'matching-app': 'matching',
  'picture-bingo': 'bingo',
  'big-small-app': 'big-small',
  'chart-count-color': 'chart-count',
  'image-crossword': 'crossword',
  'image-cryptogram': 'cryptogram',
  'writing-app': 'writing',
};

const toolsMetadata: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Free Printable Generators | Try All 33 Tools | LessonCraftStudio',
    description: 'Try all 33 printable worksheet generators free online. No signup required. Create word searches, math worksheets, coloring pages, puzzles and more with watermark.',
  },
  de: {
    title: 'Kostenlose Druckvorlagen-Generatoren | 33 Tools testen | LessonCraftStudio',
    description: 'Testen Sie alle 33 Arbeitsblatt-Generatoren kostenlos online. Keine Anmeldung. Wortsuche, Mathe, Ausmalbilder, R\ätsel und mehr mit Wasserzeichen.',
  },
  fr: {
    title: 'G\én\érateurs d\’imprimables gratuits | 33 outils | LessonCraftStudio',
    description: 'Essayez les 33 g\én\érateurs de fiches gratuitement en ligne. Sans inscription. Mots cach\és, maths, coloriages, puzzles et plus avec filigrane.',
  },
  es: {
    title: 'Generadores de imprimibles gratis | 33 herramientas | LessonCraftStudio',
    description: 'Pruebe los 33 generadores de fichas gratis en l\ínea. Sin registro. Sopa de letras, matem\áticas, colorear, puzzles y m\ás con marca de agua.',
  },
  pt: {
    title: 'Geradores de imprimir gr\átis | 33 ferramentas | LessonCraftStudio',
    description: 'Experimente os 33 geradores de fichas gr\átis online. Sem registo. Ca\ça-palavras, matem\ática, colorir, puzzles e mais com marca d\’\água.',
  },
  it: {
    title: 'Generatori di stampabili gratis | 33 strumenti | LessonCraftStudio',
    description: 'Prova tutti i 33 generatori di schede gratis online. Senza registrazione. Cerca parole, matematica, disegni, puzzle e altro con filigrana.',
  },
  nl: {
    title: 'Gratis printbare generatoren | 33 tools | LessonCraftStudio',
    description: 'Probeer alle 33 werkbladgeneratoren gratis online. Geen registratie. Woordzoekers, rekenen, kleurplaten, puzzels en meer met watermerk.',
  },
  sv: {
    title: 'Gratis utskriftsgeneratorer | 33 verktyg | LessonCraftStudio',
    description: 'Prova alla 33 arbetsbladsgeneratorer gratis online. Ingen registrering. Ords\ökningar, matte, m\ålarbilder, pussel och mer med vattenst\ämpel.',
  },
  da: {
    title: 'Gratis printbare generatorer | 33 v\ærkt\øjer | LessonCraftStudio',
    description: 'Pr\øv alle 33 opgavegeneratorer gratis online. Ingen tilmelding. Ords\øgninger, matematik, malebilleder, puslespil og mere med vandm\ærke.',
  },
  no: {
    title: 'Gratis utskriftsgeneratorer | 33 verkt\øy | LessonCraftStudio',
    description: 'Pr\øv alle 33 oppgavegeneratorer gratis online. Ingen registrering. Ords\øk, matte, fargelegging, puslespill og mer med vannmerke.',
  },
  fi: {
    title: 'Ilmaiset tulostettavat generaattorit | 33 ty\ökalua | LessonCraftStudio',
    description: 'Kokeile kaikkia 33 teht\äv\ägeneraattoria ilmaiseksi verkossa. Ei rekister\öitymist\ä. Sanaristikot, matematiikka, v\ärityskuvat, palapelit ja lis\ä\ä vesileimalla.',
  },
};

const toolsContent: Record<string, {
  heroTitle: string;
  heroSubtitle: string;
  exploreMore: string;
  howToGuides: string;
  bundles: string;
  getStarted: string;
  wantMore: string;
  wantMoreDesc: string;
  viewAll: string;
}> = {
  en: {
    heroTitle: 'Free Printable Generators',
    heroSubtitle: 'Try all 33 generators free online. No signup required. Create professional worksheets with watermark.',
    exploreMore: 'Explore More',
    howToGuides: 'How-To Guides',
    bundles: 'Bundles',
    getStarted: 'Get Started',
    wantMore: 'Want More Features?',
    wantMoreDesc: 'Upgrade to remove watermarks and unlock all image themes and languages.',
    viewAll: 'View All Generators',
  },
  de: {
    heroTitle: 'Kostenlose Druckvorlagen-Generatoren',
    heroSubtitle: 'Alle 33 Generatoren kostenlos online testen. Keine Anmeldung. Professionelle Arbeitsbl\ätter mit Wasserzeichen erstellen.',
    exploreMore: 'Mehr entdecken',
    howToGuides: 'Anleitungen',
    bundles: 'Pakete',
    getStarted: 'Erste Schritte',
    wantMore: 'Mehr Funktionen gew\ünscht?',
    wantMoreDesc: 'Upgraden Sie, um Wasserzeichen zu entfernen und alle Bildthemen und Sprachen freizuschalten.',
    viewAll: 'Alle Generatoren ansehen',
  },
  fr: {
    heroTitle: 'G\én\érateurs d\’imprimables gratuits',
    heroSubtitle: 'Essayez les 33 g\én\érateurs gratuitement en ligne. Sans inscription. Cr\éez des fiches professionnelles avec filigrane.',
    exploreMore: 'D\écouvrir plus',
    howToGuides: 'Guides pratiques',
    bundles: 'Packs',
    getStarted: 'D\émarrer',
    wantMore: 'Vous voulez plus de fonctionnalit\és ?',
    wantMoreDesc: 'Passez \à la version sup\érieure pour supprimer les filigranes et d\ébloquer tous les th\èmes et langues.',
    viewAll: 'Voir tous les g\én\érateurs',
  },
  es: {
    heroTitle: 'Generadores de imprimibles gratis',
    heroSubtitle: 'Pruebe los 33 generadores gratis en l\ínea. Sin registro. Cree fichas profesionales con marca de agua.',
    exploreMore: 'Explorar m\ás',
    howToGuides: 'Gu\ías',
    bundles: 'Paquetes',
    getStarted: 'Comenzar',
    wantMore: '\¿Quiere m\ás funciones?',
    wantMoreDesc: 'Actualice para eliminar marcas de agua y desbloquear todos los temas e idiomas.',
    viewAll: 'Ver todos los generadores',
  },
  pt: {
    heroTitle: 'Geradores de imprimir gr\átis',
    heroSubtitle: 'Experimente os 33 geradores gr\átis online. Sem registo. Crie fichas profissionais com marca d\’\água.',
    exploreMore: 'Explorar mais',
    howToGuides: 'Guias',
    bundles: 'Pacotes',
    getStarted: 'Come\çar',
    wantMore: 'Quer mais funcionalidades?',
    wantMoreDesc: 'Fa\ça upgrade para remover marcas d\’\água e desbloquear todos os temas e idiomas.',
    viewAll: 'Ver todos os geradores',
  },
  it: {
    heroTitle: 'Generatori di stampabili gratis',
    heroSubtitle: 'Prova tutti i 33 generatori gratis online. Senza registrazione. Crea schede professionali con filigrana.',
    exploreMore: 'Scopri di pi\ù',
    howToGuides: 'Guide',
    bundles: 'Pacchetti',
    getStarted: 'Inizia',
    wantMore: 'Vuoi pi\ù funzionalit\à?',
    wantMoreDesc: 'Aggiorna per rimuovere le filigrane e sbloccare tutti i temi e le lingue.',
    viewAll: 'Vedi tutti i generatori',
  },
  nl: {
    heroTitle: 'Gratis printbare generatoren',
    heroSubtitle: 'Probeer alle 33 generatoren gratis online. Geen registratie. Maak professionele werkbladen met watermerk.',
    exploreMore: 'Meer ontdekken',
    howToGuides: 'Handleidingen',
    bundles: 'Bundels',
    getStarted: 'Aan de slag',
    wantMore: 'Meer functies gewenst?',
    wantMoreDesc: 'Upgrade om watermerken te verwijderen en alle thema\’s en talen te ontgrendelen.',
    viewAll: 'Alle generators bekijken',
  },
  sv: {
    heroTitle: 'Gratis utskriftsgeneratorer',
    heroSubtitle: 'Prova alla 33 generatorer gratis online. Ingen registrering. Skapa professionella arbetsblad med vattenst\ämpel.',
    exploreMore: 'Utforska mer',
    howToGuides: 'Guider',
    bundles: 'Paket',
    getStarted: 'Kom ig\ång',
    wantMore: 'Vill du ha fler funktioner?',
    wantMoreDesc: 'Uppgradera f\ör att ta bort vattenst\ämplar och l\åsa upp alla teman och spr\åk.',
    viewAll: 'Visa alla generatorer',
  },
  da: {
    heroTitle: 'Gratis printbare generatorer',
    heroSubtitle: 'Pr\øv alle 33 generatorer gratis online. Ingen tilmelding. Opret professionelle opgaveark med vandm\ærke.',
    exploreMore: 'Udforsk mere',
    howToGuides: 'Vejledninger',
    bundles: 'Pakker',
    getStarted: 'Kom i gang',
    wantMore: 'Vil du have flere funktioner?',
    wantMoreDesc: 'Opgrader for at fjerne vandm\ærker og l\åse op for alle temaer og sprog.',
    viewAll: 'Se alle generatorer',
  },
  no: {
    heroTitle: 'Gratis utskriftsgeneratorer',
    heroSubtitle: 'Pr\øv alle 33 generatorer gratis online. Ingen registrering. Lag profesjonelle arbeidsark med vannmerke.',
    exploreMore: 'Utforsk mer',
    howToGuides: 'Veiledninger',
    bundles: 'Pakker',
    getStarted: 'Kom i gang',
    wantMore: 'Vil du ha flere funksjoner?',
    wantMoreDesc: 'Oppgrader for \å fjerne vannmerker og l\åse opp alle temaer og spr\åk.',
    viewAll: 'Se alle generatorer',
  },
  fi: {
    heroTitle: 'Ilmaiset tulostettavat generaattorit',
    heroSubtitle: 'Kokeile kaikkia 33 generaattoria ilmaiseksi verkossa. Ei rekister\öitymist\ä. Luo ammattimaisia teht\ävi\ä vesileimalla.',
    exploreMore: 'Tutustu lis\ä\ä',
    howToGuides: 'Oppaat',
    bundles: 'Paketit',
    getStarted: 'Aloita',
    wantMore: 'Haluatko lis\ä\ä ominaisuuksia?',
    wantMoreDesc: 'P\äivit\ä poistaaksesi vesileimat ja avataksesi kaikki teemat ja kielet.',
    viewAll: 'N\äyt\ä kaikki generaattorit',
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
  const meta = toolsMetadata[locale] || toolsMetadata.en;

  const alternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    alternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/tools`;
  }
  alternates['x-default'] = `${baseUrl}/en/tools`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/tools`,
      languages: alternates,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      url: `${baseUrl}/${locale}/tools`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
    },
  };
}

export default function ToolsListingPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as SupportedLocale;
  const content = toolsContent[locale] || toolsContent.en;

  // Group tools by category
  const toolsByCategory: Record<string, Array<{ toolId: string; name: string; slug: string }>> = {};

  for (const tool of toolPageSlugs) {
    const wpId = toolToWpApp[tool.toolId] || tool.toolId;
    const appData = ALL_APPS[wpId as AppId];
    if (!appData) continue;

    const category = appData.category;
    if (!toolsByCategory[category]) toolsByCategory[category] = [];

    const slug = getToolSlugForLocale(tool.toolId, locale) || tool.slugs.en;
    const name = getLocalizedAppName(wpId, locale);

    toolsByCategory[category].push({ toolId: tool.toolId, name, slug });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 md:py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.heroTitle}
          </h1>
          <p className="text-lg text-gray-600">
            {content.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {Object.entries(APP_CATEGORIES).map(([catId, catData]) => {
            const tools = toolsByCategory[catId];
            if (!tools || tools.length === 0) return null;

            return (
              <div key={catId} className="mb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{catData.name}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {tools.map(tool => (
                    <Link
                      key={tool.toolId}
                      href={`/${locale}/tools/${tool.slug}`}
                      className="p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all text-center"
                    >
                      <span className="text-sm font-medium text-gray-900">{tool.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {content.exploreMore}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/guides`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {content.howToGuides}
            </Link>
            <Link href={`/${locale}/bundles`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {content.bundles}
            </Link>
            <Link href={`/${locale}/start`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {content.getStarted}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{content.wantMore}</h2>
          <p className="text-indigo-100 mb-8 max-w-lg mx-auto">
            {content.wantMoreDesc}
          </p>
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
          >
            {content.viewAll}
          </Link>
        </div>
      </section>
    </div>
  );
}
