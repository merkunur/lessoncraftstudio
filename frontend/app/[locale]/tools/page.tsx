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
    title: 'Free Tools for KDP & Etsy Sellers — 33 Generators + Calculators | LessonCraftStudio',
    description: 'Free KDP royalty calculator, cover size calculator, niche finder, activity book planner, profit hub, and 33 free worksheet generators. Try everything free with watermark — no signup required.',
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
    heroTitle: 'Free Tools for KDP Publishers & Etsy Sellers',
    heroSubtitle: 'Free calculators, planners, and research tools to grow your printable business. No signup required, no ads, 100% free.',
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

/* -------------------------------------------------------------------------
 * 5 free business tools — displayed on the EN locale tools index page
 * ----------------------------------------------------------------------- */
const freeBusinessTools = [
  {
    name: 'KDP Royalty Calculator',
    href: '/en/tools/kdp-royalty-calculator',
    description: 'Calculate your Amazon KDP printing costs, royalties, and minimum list price across all 8 marketplaces. Official 2026 rates.',
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm2.25-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm2.25-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18ZM4.5 4.5h15A1.5 1.5 0 0 1 21 6v12a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18V6a1.5 1.5 0 0 1 1.5-1.5Z" />
      </svg>
    ),
  },
  {
    name: 'KDP Cover Size Calculator',
    href: '/en/tools/kdp-size-calculator',
    description: 'Get exact KDP cover dimensions, spine width, and bleed area for any trim size and page count.',
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
  },
  {
    name: 'KDP Activity Book Planner',
    href: '/en/tools/activity-book-planner',
    description: 'Plan your activity book structure before you create. Map out page count, content mix, and difficulty progression.',
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
  },
  {
    name: 'Printable Niche Finder',
    href: '/en/tools/niche-finder',
    description: 'Discover 50 curated profitable niches for Etsy, KDP, and TPT. Filter by platform, competition, demand, and language.',
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
  {
    name: 'Printable Profit Hub',
    href: '/en/tools/profit-hub',
    description: 'Compare fees and calculate your net profit across Etsy, Gumroad, TPT, Amazon KDP, and other platforms.',
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
];

export default function ToolsListingPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as SupportedLocale;
  const content = toolsContent[locale] || toolsContent.en;
  const isEnglish = locale === 'en';

  // Group tools by category (used for every locale; EN renders both business tools and the category grid)
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

  const schemas: Record<string, unknown>[] = [breadcrumbJsonLd];

  const collectionSchema = generateToolsCollectionSchema(locale);
  const generatorTools = Object.values(toolsByCategory).flat();
  const businessToolsForSchema = isEnglish
    ? freeBusinessTools.map(t => ({ name: t.name, slug: t.href.replace('/en/tools/', '') }))
    : [];
  const itemListSchema = generateToolsItemListSchema(locale, [...businessToolsForSchema, ...generatorTools]);
  schemas.push(collectionSchema, itemListSchema);

  return (
    <div className="min-h-screen bg-gray-50">
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Hero */}
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

      {isEnglish ? (
        <>
          {/* 5 Free Business Tools — EN only */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {freeBusinessTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex flex-col p-6 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all"
                  >
                    <div className="mb-4">{tool.icon}</div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {tool.name}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4 flex-1">
                      {tool.description}
                    </p>
                    <span className="text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                      Try Free &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* 33 Generator tiles by category */}
          <section className="py-12 md:py-16 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  33 Free Worksheet Generators
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Try every generator free with watermark &mdash; no signup required. Purchase a license to remove the watermark and unlock commercial use.
                </p>
              </div>

              {/* Intro prose targeting "free worksheet makers" / "free printable generators" queries */}
              <div className="max-w-3xl mx-auto mb-12 space-y-4 text-gray-700 text-base leading-relaxed">
                <p>
                  Free worksheet makers let you create printable classroom, homeschool, or personal-use materials directly in your browser &mdash; no software install, no monthly subscription. Each of the 33 free generators below produces print-ready PDFs and JPEGs you can download instantly.
                </p>
                <p>
                  If you&apos;re a teacher assembling a tutoring lesson, a homeschool parent planning a unit, or a printable creator exploring a new format before committing, these browser tools are built for you. No account creation, no trial expiration, no cap on how many worksheets you can make. Choose a theme, customize the layout, export &mdash; that&apos;s the entire flow.
                </p>
                <p>
                  The watermark on the free version is the only difference from the paid experience. Grid sizes, image themes, difficulty levels, answer keys, and PDF resolution are identical to what licensed sellers use. The watermark makes free-version worksheets unsuitable for commercial resale, but perfectly usable for classroom packets, tutoring handouts, homework supplements, and personal projects.
                </p>
                <p>
                  All 33 generators support 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Images carry the worksheet content, so most outputs translate automatically when you switch the language setting.
                </p>
                <p>
                  Ready to dive in? Browse the categories below. If you&apos;re building a printable product line for Etsy or Amazon KDP and need watermark-free downloads with a commercial license, the <Link href={`/${locale}/apps`} className="text-indigo-600 hover:text-indigo-700 underline font-medium">Apps hub</Link> has the licensed versions of every generator below.
                </p>
              </div>

              {Object.entries(APP_CATEGORIES).map(([catId, catData]) => {
                const tools = toolsByCategory[catId];
                if (!tools || tools.length === 0) return null;

                return (
                  <div key={catId} className="mb-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{content.categories[catId] || catData.name}</h3>
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
        </>
      ) : (
        <>
          {/* Non-EN: 33 generators grid (existing behavior) */}
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
        </>
      )}
    </div>
  );
}
