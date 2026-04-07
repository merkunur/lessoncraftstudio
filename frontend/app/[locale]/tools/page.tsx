import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { toolPageSlugs, getToolSlugForLocale } from '@/config/tool-page-slugs';
import { getHreflangCode, ogLocaleMap, generateToolsCollectionSchema, generateToolsItemListSchema } from '@/lib/schema-generator';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { ALL_APPS, APP_CATEGORIES, type AppId } from '@/config/products';
import { getLocalizedAppName } from '@/config/app-translations';
import { showcaseConfigs } from '@/app/[locale]/apps/[slug]/showcase/showcase-configs';
import { encodeImagePath } from '@/lib/encode-image-path';

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

const toolsKeywords: Record<string, string[]> = {
  en: ['free worksheet maker online', 'free printable generator', 'free worksheet generator', 'make worksheets online free', 'free word search maker', 'free math worksheet generator'],
  de: ['Arbeitsblatt Generator kostenlos', 'kostenlos Arbeitsblätter erstellen', 'Suchsel erstellen kostenlos', 'Kreuzworträtsel erstellen kostenlos', 'Rätsel Generator kostenlos'],
  fr: ['générateur fiches gratuit en ligne', 'mots mêlés gratuit', 'mots croisés gratuit', 'fiches maths gratuit', 'générateur coloriage gratuit', 'sudoku à imprimer gratuit'],
  es: ['generador de fichas gratis online', 'crear sopa de letras gratis', 'crear crucigrama gratis', 'generador de ejercicios gratis', 'fichas de matemáticas gratis para imprimir', 'generador sudoku gratis'],
  pt: ['gerador de atividades grátis online', 'criar caça-palavras grátis', 'criar cruzadinha grátis', 'gerador de exercícios grátis', 'atividades de matemática grátis para imprimir', 'gerador sudoku grátis'],
  it: ['generatore schede gratis', 'crucipuzzle gratis online', 'cruciverba gratis', 'generatore matematica gratis', 'schede da stampare gratis', 'strumenti didattici online'],
  nl: ['werkbladen generator gratis online', 'woordzoeker maken gratis', 'kruiswoordpuzzel maken gratis', 'reken werkbladen generator gratis', 'kleurplaten generator gratis', 'sudoku printen gratis'],
  sv: ['arbetsblad generator gratis online', 'skapa ordsök gratis', 'skapa korsord gratis', 'matteuppgifter generator gratis', 'målarbilder gratis skriva ut', 'sudoku gratis skriva ut'],
  da: ['gratis arbejdsark generator', 'ordleg gratis', 'krydsord gratis', 'plusstykker gratis', 'regneopgaver gratis', 'malebilleder gratis', 'sudoku gratis', 'opgaver gratis til print'],
  no: ['gratis arbeidsark-generatorer', 'ordleting generator gratis', 'kryssord generator gratis', 'matteoppgaver generator gratis', 'fargeleggingsbilder lage gratis', 'sudoku skrive ut gratis', 'oppgaver gratis på nett'],
  fi: ['ilmaiset tulostettavat generaattorit', 'online tehtävägeneraattori', 'tulostettavat työkalut kokeile ilmaiseksi', 'sanaristikkogeneraattori ilmainen', 'matematiikkatehtävägeneraattori', 'värityskuvageneraattori online'],
};

const toolsMetadata: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Free Worksheet Makers | Try All 33 Generators Online',
    description: 'Use all 33 worksheet generators free online — word search maker, math generator, crossword creator, and more. No signup. Watermark removed with license.',
  },
  de: {
    title: 'Kostenlose Arbeitsblatt-Generatoren | Alle 33 Tools online testen',
    description: 'Nutzen Sie alle 33 Arbeitsblatt-Generatoren kostenlos online — Suchsel, Kreuzworträtsel, Mathe, Sudoku und mehr. Ohne Anmeldung. Wasserzeichen wird mit Lizenz entfernt.',
  },
  fr: {
    title: 'Générateurs de fiches gratuits | 33 outils en ligne',
    description: 'Utilisez les 33 générateurs gratuitement en ligne — mots mêlés, mots croisés, maths, sudoku et plus. Sans inscription. Filigrane supprimé avec licence.',
  },
  es: {
    title: 'Generadores de fichas gratis | 33 herramientas en línea',
    description: 'Use los 33 generadores gratis en línea — sopa de letras, crucigramas, matemáticas, sudoku y más. Sin registro. La marca de agua se elimina con licencia.',
  },
  pt: {
    title: 'Geradores de atividades grátis | 33 ferramentas online',
    description: 'Use os 33 geradores grátis online — caça-palavras, cruzadinhas, matemática, sudoku e mais. Sem cadastro. Marca d\'água removida com licença.',
  },
  it: {
    title: 'Generatori di schede gratis | 33 strumenti online',
    description: 'Usa i 33 generatori gratis online — crucipuzzle, cruciverba, matematica, sudoku e altro. Senza registrazione. La filigrana si rimuove con la licenza.',
  },
  nl: {
    title: 'Gratis werkblad-generatoren | 33 online tools',
    description: 'Gebruik alle 33 generatoren gratis online — woordzoeker, kruiswoordpuzzel, rekenen, sudoku en meer. Zonder registratie. Watermerk verdwijnt met licentie.',
  },
  sv: {
    title: 'Gratis arbetsbladsgeneratorer | 33 onlineverktyg',
    description: 'Använd alla 33 generatorer gratis online — ordsök, korsord, matte, sudoku och mer. Ingen registrering. Vattenmärket tas bort med licens.',
  },
  da: {
    title: 'Gratis arbejdsark-generatorer | 33 online værktøjer',
    description: 'Brug alle 33 generatorer gratis online — ordleg, krydsord, regning, sudoku og mere. Ingen registrering. Vandmærket fjernes med licens.',
  },
  no: {
    title: 'Gratis arbeidsark-generatorer | 33 nettverktøy',
    description: 'Bruk alle 33 generatorer gratis på nett — ordleting, kryssord, matte, sudoku og mer. Ingen registrering. Vannmerket fjernes med lisens.',
  },
  fi: {
    title: 'Ilmaiset tehtävägeneraattorit | 33 verkkotyökalua',
    description: 'Käytä kaikkia 33 generaattoria ilmaiseksi verkossa — sanasokkelo, sanaristikko, matikka, sudoku ja muuta. Ei rekisteröintiä. Vesileima poistuu lisenssillä.',
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
  categories: Record<string, string>;
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
    categories: { math: 'Math Mastery', literacy: 'Literacy & Language', visual: 'Visual Learning', matching: 'Matching & Sorting', puzzle: 'Puzzles & Logic', search: 'Search & Find' },
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
    categories: { math: 'Mathematik', literacy: 'Lesen & Sprache', visual: 'Visuelles Lernen', matching: 'Zuordnung & Sortierung', puzzle: 'Rätsel & Logik', search: 'Suchen & Finden' },
  },
  fr: {
    heroTitle: 'Générateurs de fiches gratuits',
    heroSubtitle: 'Essayez les 33 générateurs gratuitement en ligne. Sans inscription. Créez des fiches professionnelles avec filigrane.',
    exploreMore: 'Découvrir plus',
    howToGuides: 'Guides pratiques',
    bundles: 'Packs',
    getStarted: 'Démarrer',
    wantMore: 'Vous voulez plus de fonctionnalités ?',
    wantMoreDesc: 'Passez à la version supérieure pour supprimer les filigranes et débloquer tous les thèmes et langues.',
    viewAll: 'Voir tous les générateurs',
    categories: { math: 'Mathématiques', literacy: 'Lecture & Langage', visual: 'Apprentissage visuel', matching: 'Association & Tri', puzzle: 'Puzzles & Logique', search: 'Chercher & Trouver' },
  },
  es: {
    heroTitle: 'Generadores de fichas gratis en línea',
    heroSubtitle: 'Pruebe los 33 generadores gratis en línea — sopa de letras, crucigramas, matemáticas y más. Sin registro.',
    exploreMore: 'Explorar m\ás',
    howToGuides: 'Gu\ías',
    bundles: 'Paquetes',
    getStarted: 'Comenzar',
    wantMore: '\¿Quiere m\ás funciones?',
    wantMoreDesc: 'Actualice para eliminar marcas de agua y desbloquear todos los temas e idiomas.',
    viewAll: 'Ver todos los generadores',
    categories: { math: 'Matem\áticas', literacy: 'Lectura y Lenguaje', visual: 'Aprendizaje Visual', matching: 'Emparejamiento', puzzle: 'Puzzles y L\ógica', search: 'Busca y Encuentra' },
  },
  pt: {
    heroTitle: 'Geradores de imprimir gr\átis',
    heroSubtitle: 'Experimente os 33 geradores gr\átis online. Sem registo. Crie fichas profissionais com marca d\'\água.',
    exploreMore: 'Explorar mais',
    howToGuides: 'Guias',
    bundles: 'Pacotes',
    getStarted: 'Come\çar',
    wantMore: 'Quer mais funcionalidades?',
    wantMoreDesc: 'Fa\ça upgrade para remover marcas d\'\água e desbloquear todos os temas e idiomas.',
    viewAll: 'Ver todos os geradores',
    categories: { math: 'Matem\ática', literacy: 'Leitura e Linguagem', visual: 'Aprendizagem Visual', matching: 'Correspond\ência', puzzle: 'Puzzles e L\ógica', search: 'Procure e Encontre' },
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
    categories: { math: 'Matematica', literacy: 'Lettura e Linguaggio', visual: 'Apprendimento Visivo', matching: 'Abbinamento', puzzle: 'Puzzle e Logica', search: 'Cerca e Trova' },
  },
  nl: {
    heroTitle: '33 gratis generators — probeer ze nu online',
    heroSubtitle: 'Maak werkbladen, puzzels en kleurplaten gratis online met watermerk. Geen account nodig. Bekijk de kwaliteit voordat u een commerciële licentie koopt.',
    exploreMore: 'Meer ontdekken',
    howToGuides: 'Handleidingen',
    bundles: 'Bundels',
    getStarted: 'Aan de slag',
    wantMore: 'Meer functies gewenst?',
    wantMoreDesc: 'Upgrade om watermerken te verwijderen en alle thema\'s en talen te ontgrendelen.',
    viewAll: 'Alle generators bekijken',
    categories: { math: 'Wiskunde', literacy: 'Lezen & Taal', visual: 'Visueel Leren', matching: 'Matchen & Sorteren', puzzle: 'Puzzels & Logica', search: 'Zoeken & Vinden' },
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
    categories: { math: 'Matematik', literacy: 'L\äsning & Spr\åk', visual: 'Visuellt L\ärande', matching: 'Matchning & Sortering', puzzle: 'Pussel & Logik', search: 'S\ök & Hitta' },
  },
  da: {
    heroTitle: 'Gratis arbejdsark-generatorer',
    heroSubtitle: 'Brug alle 33 generatorer gratis online — ordleg, krydsord, regning, sudoku og mere. Ingen registrering. Vandmærket fjernes med licens.',
    exploreMore: 'Udforsk mere',
    howToGuides: 'Vejledninger',
    bundles: 'Pakker',
    getStarted: 'Kom i gang',
    wantMore: 'Vil du have flere funktioner?',
    wantMoreDesc: 'Opgrader for at fjerne vandmærker og låse op for alle temaer og sprog.',
    viewAll: 'Se alle generatorer',
    categories: { math: 'Regning', literacy: 'Læsning & Sprog', visual: 'Visuel Læring', matching: 'Matching & Sortering', puzzle: 'Puslespil & Logik', search: 'Søg & Find' },
  },
  no: {
    heroTitle: 'Gratis arbeidsark-generatorer',
    heroSubtitle: 'Bruk alle 33 generatorer gratis på nett — ordleting, kryssord, matte, sudoku og mer. Ingen registrering. Vannmerket fjernes med lisens.',
    exploreMore: 'Utforsk mer',
    howToGuides: 'Veiledninger',
    bundles: 'Pakker',
    getStarted: 'Kom i gang',
    wantMore: 'Vil du ha flere funksjoner?',
    wantMoreDesc: 'Oppgrader for å fjerne vannmerker og låse opp alle temaer og språk.',
    viewAll: 'Se alle generatorer',
    categories: { math: 'Matematikk', literacy: 'Lesing & Språk', visual: 'Visuell Læring', matching: 'Koble & Sortere', puzzle: 'Puslespill & Logikk', search: 'Søk & Finn' },
  },
  fi: {
    heroTitle: 'Ilmaiset tehtävägeneraattorit verkossa',
    heroSubtitle: 'Kokeile kaikkia 33 generaattoria ilmaiseksi verkossa. Ei rekisteröitymistä. Luo ammattimaisia tehtäviä vesileimalla.',
    exploreMore: 'Tutustu lis\ä\ä',
    howToGuides: 'Oppaat',
    bundles: 'Paketit',
    getStarted: 'Aloita',
    wantMore: 'Haluatko lis\ä\ä ominaisuuksia?',
    wantMoreDesc: 'P\äivit\ä poistaaksesi vesileimat ja avataksesi kaikki teemat ja kielet.',
    viewAll: 'N\äyt\ä kaikki generaattorit',
    categories: { math: 'Matematiikka', literacy: 'Lukutaito & Kieli', visual: 'Visuaalinen oppiminen', matching: 'Yhdist\äminen & Lajittelu', puzzle: 'Palapelit & Logiikka', search: 'Etsi & L\öyd\ä' },
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
    keywords: toolsKeywords[locale] || toolsKeywords.en,
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
  const toolsByCategory: Record<string, Array<{ toolId: string; name: string; slug: string; image?: string }>> = {};

  for (const tool of toolPageSlugs) {
    const wpId = toolToWpApp[tool.toolId] || tool.toolId;
    const appData = ALL_APPS[wpId as AppId];
    if (!appData) continue;

    const category = appData.category;
    if (!toolsByCategory[category]) toolsByCategory[category] = [];

    const slug = getToolSlugForLocale(tool.toolId, locale) || tool.slugs.en;
    const name = getLocalizedAppName(wpId, locale);

    const heroSrc = showcaseConfigs[wpId]?.hero?.images?.[0]?.src;
    const image = heroSrc ? `https://www.lessoncraftstudio.com${encodeImagePath(heroSrc)}` : undefined;
    toolsByCategory[category].push({ toolId: tool.toolId, name, slug, image });
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://www.lessoncraftstudio.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: content.heroTitle },
    ],
  };

  const collectionSchema = generateToolsCollectionSchema(locale);
  const allTools = Object.values(toolsByCategory).flat();
  const itemListSchema = generateToolsItemListSchema(locale, allTools);

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">{content.categories[catId] || catData.name}</h2>
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
