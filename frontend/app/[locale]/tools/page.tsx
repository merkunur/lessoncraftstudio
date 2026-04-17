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
              {/* NO intro targeting "gratis arbeidsarkgenerator" /
                  "lag utskrifter på nett" queries. */}
              {locale === 'no' && (
                <div className="max-w-3xl mx-auto mb-12 space-y-4 text-gray-700 text-base leading-relaxed">
                  <p>
                    Gratis arbeidsarkgeneratorer lar deg lage utskriftsklart læringsmateriell til klasserommet, hjemmeundervisning eller personlig bruk rett i nettleseren &mdash; uten programvareinstallasjon og uten månedsabonnement. Hver av de 33 gratisgeneratorene nedenfor produserer utskriftsklare PDF- og JPEG-filer som du kan laste ned umiddelbart.
                  </p>
                  <p>
                    Er du lærer som forbereder en støttetime, forelder som planlegger en hjemmeundervisningsenhet, eller utskriftsskaper som utforsker et nytt format før du forplikter deg? Disse nettleserverktøyene er laget for deg. Ingen kontoopprettelse, ingen utløpende prøveperiode, ingen grense for antall arbeidsark. Velg et tema, tilpass layouten, eksporter &mdash; det er hele prosessen.
                  </p>
                  <p>
                    Vannmerket på gratisversjonen er den eneste forskjellen fra den betalte versjonen. Rutenettstørrelser, bildetemaer, vanskelighetsnivåer, fasit og PDF-oppløsning er identiske med det lisensierte selgere bruker. Vannmerket gjør gratis arbeidsark uegnet for kommersiell videresalg, men helt brukbart til klasseperm, støttemateriell, leksetillegg og personlige prosjekter.
                  </p>
                  <p>
                    Alle 33 generatorene støtter 11 språk: engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk, norsk og finsk. Bildene bærer arbeidsarkets innhold, så de fleste resultatene oversettes automatisk når du bytter språk.
                  </p>
                  <p>
                    Klar til å starte? Utforsk kategoriene nedenfor. Hvis du bygger en utskriftsproduktlinje for Etsy eller Amazon KDP og trenger nedlastinger uten vannmerke med kommersiell lisens, finner du de lisensierte versjonene av alle generatorene nedenfor i <Link href={`/${locale}/apps`} className="text-indigo-600 hover:text-indigo-700 underline font-medium">Applikasjoner</Link>.
                  </p>
                </div>
              )}

              {/* DA intro targeting "gratis arbejdsark generator" /
                  "lav printables online" queries. */}
              {locale === 'da' && (
                <div className="max-w-3xl mx-auto mb-12 space-y-4 text-gray-700 text-base leading-relaxed">
                  <p>
                    Gratis generatorer af arbejdsark lader dig lave udskriftsklart materiale til klasseværelset, hjemmeundervisning eller personlig brug direkte i browseren &mdash; uden softwareinstallation og uden månedligt abonnement. Hver af de 33 gratis generatorer herunder producerer udskriftsklare PDF- og JPEG-filer, som du kan downloade med det samme.
                  </p>
                  <p>
                    Er du lærer, der forbereder en støttetime, forælder, der planlægger en hjemmeundervisningsenhed, eller printable-skaber, der udforsker et nyt format, før du forpligter dig? Disse browserværktøjer er lavet til dig. Ingen kontooprettelse, ingen udløbende prøveperiode, ingen grænse for antallet af arbejdsark. Vælg et tema, tilpas layoutet, eksporter &mdash; det er hele processen.
                  </p>
                  <p>
                    Vandmærket på gratisversionen er den eneste forskel fra den betalte version. Gitterstørrelser, billedtemaer, sværhedsgrader, facitlister og PDF-opløsning er identiske med, hvad licensierede sælgere bruger. Vandmærket gør gratis arbejdsark uegnede til kommerciel videresalg, men perfekt anvendelige til klassemapper, støttemateriale, lektiesupplementer og personlige projekter.
                  </p>
                  <p>
                    Alle 33 generatorer understøtter 11 sprog: engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk, norsk og finsk. Billederne bærer arbejdsarkets indhold, så de fleste resultater oversættes automatisk, når du skifter sprog.
                  </p>
                  <p>
                    Klar til at komme i gang? Udforsk kategorierne herunder. Hvis du bygger en printable-produktlinje til Etsy eller Amazon KDP og har brug for downloads uden vandmærke med kommerciel licens, finder du de licensierede versioner af alle generatorer herunder i <Link href={`/${locale}/apps`} className="text-indigo-600 hover:text-indigo-700 underline font-medium">Applikationer</Link>.
                  </p>
                </div>
              )}

              {/* SV intro targeting "gratis arbetsbladsgenerator" /
                  "skapa utskrifter online" queries. */}
              {locale === 'sv' && (
                <div className="max-w-3xl mx-auto mb-12 space-y-4 text-gray-700 text-base leading-relaxed">
                  <p>
                    Gratis arbetsbladsgeneratorer låter dig skapa utskrivbart material för klassrum, hemundervisning eller personligt bruk direkt i webbläsaren &mdash; utan programvaruinstallation och utan månadsabonnemang. Var och en av de 33 gratisgeneratorer nedan producerar tryckfärdiga PDF- och JPEG-filer som du kan ladda ner direkt.
                  </p>
                  <p>
                    Är du lärare som förbereder ett stödpass, förälder som planerar en hemundervisningsenhet eller utskriftsskapare som testar ett nytt format innan du bestämmer dig? Dessa webbläsarverktyg är gjorda för dig. Ingen kontoregistrering, ingen utgående provperiod, ingen gräns för antalet arbetsblad. Välj ett tema, anpassa layouten, exportera &mdash; det är hela processen.
                  </p>
                  <p>
                    Vattenstämpeln på gratisversionen är den enda skillnaden jämfört med den betalda versionen. Rutnätsstorlekar, bildteman, svårighetsnivåer, facit och PDF-upplösning är identiska med vad licensierade säljare använder. Vattenstämpeln gör gratisarbetsblad olämpliga för kommersiell vidareförsäljning, men perfekt användbara för klasspärmar, stödmaterial, läxkomplement och personliga projekt.
                  </p>
                  <p>
                    Alla 33 generatorer stöder 11 språk: engelska, tyska, franska, spanska, portugisiska, italienska, nederländska, svenska, danska, norska och finska. Bilderna bär arbetsbladets innehåll, så de flesta resultaten översätts automatiskt när du byter språk.
                  </p>
                  <p>
                    Redo att börja? Utforska kategorierna nedan. Om du bygger en produktlinje med utskrifter för Etsy eller Amazon KDP och behöver nedladdningar utan vattenstämpel med kommersiell licens hittar du i <Link href={`/${locale}/apps`} className="text-indigo-600 hover:text-indigo-700 underline font-medium">Applikationer</Link> de licensierade versionerna av alla generatorer nedan.
                  </p>
                </div>
              )}

              {/* NL intro targeting "werkblad generator gratis" /
                  "printables maken online" queries. */}
              {locale === 'nl' && (
                <div className="max-w-3xl mx-auto mb-12 space-y-4 text-gray-700 text-base leading-relaxed">
                  <p>
                    Gratis werkbladgeneratoren laten u afdrukbaar lesmateriaal maken voor de klas, thuisonderwijs of persoonlijk gebruik, direct in de browser &mdash; zonder software-installatie of maandabonnement. Elk van de 33 gratis generatoren hieronder produceert afdrukklare PDF- en JPEG-bestanden die u direct kunt downloaden.
                  </p>
                  <p>
                    Bent u een leerkracht die een bijles voorbereidt, een ouder die een thuisonderwijseenheid plant, of een printable-maker die een nieuw formaat verkent voordat u zich verbindt? Deze browsertools zijn voor u gemaakt. Geen account aanmaken, geen aflopende proefperiode, geen limiet op het aantal werkbladen. Kies een thema, pas de lay-out aan, exporteren &mdash; dat is het hele proces.
                  </p>
                  <p>
                    Het watermerk op de gratis versie is het enige verschil met de betaalde versie. Rastergroottes, afbeeldingsthema&apos;s, moeilijkheidsniveaus, antwoordsleutels en PDF-resolutie zijn identiek aan wat verkopers met licentie gebruiken. Het watermerk maakt de gratis werkbladen ongeschikt voor commerciële doorverkoop, maar perfect bruikbaar voor klasmappen, bijlesmateriaal, huiswerkaanvullingen en persoonlijke projecten.
                  </p>
                  <p>
                    Alle 33 generatoren ondersteunen 11 talen: Engels, Duits, Frans, Spaans, Portugees, Italiaans, Nederlands, Zweeds, Deens, Noors en Fins. De afbeeldingen dragen de inhoud van het werkblad, dus de meeste resultaten worden automatisch vertaald bij het wijzigen van de taal.
                  </p>
                  <p>
                    Klaar om te beginnen? Verken de categorieën hieronder. Als u een printable-productlijn bouwt voor Etsy of Amazon KDP en downloads zonder watermerk met commerciële licentie nodig heeft, vindt u in het <Link href={`/${locale}/apps`} className="text-indigo-600 hover:text-indigo-700 underline font-medium">Applicaties-gedeelte</Link> de versies met licentie van alle generatoren hieronder.
                  </p>
                </div>
              )}

              {/* PT intro targeting "gerador de atividades grátis" /
                  "criar imprimíveis online" queries. */}
              {locale === 'pt' && (
                <div className="max-w-3xl mx-auto mb-12 space-y-4 text-gray-700 text-base leading-relaxed">
                  <p>
                    Os geradores de atividades gratuitos permitem criar materiais imprimíveis para sala de aula, ensino domiciliar ou uso pessoal direto no navegador &mdash; sem instalar software nem assinatura mensal. Cada um dos 33 geradores gratuitos abaixo produz PDF e JPEG prontos para impressão, com download imediato.
                  </p>
                  <p>
                    Se você é professor preparando um reforço, pai ou mãe planejando uma unidade de ensino domiciliar, ou criador de imprimíveis explorando um novo formato antes de se comprometer, estas ferramentas no navegador são para você. Sem criação de conta, sem prazo de teste, sem limite no número de atividades. Escolher um tema, personalizar o layout, exportar &mdash; é todo o processo.
                  </p>
                  <p>
                    A marca d&apos;água da versão gratuita é a única diferença em relação à versão paga. Tamanhos de grade, temas de imagens, níveis de dificuldade, gabaritos e resolução do PDF são idênticos aos que os vendedores licenciados utilizam. A marca d&apos;água torna as atividades gratuitas inadequadas para revenda comercial, mas perfeitamente utilizáveis para pastas de aula, materiais de reforço, complementos de tarefas e projetos pessoais.
                  </p>
                  <p>
                    Os 33 geradores suportam 11 idiomas: inglês, alemão, francês, espanhol, português, italiano, holandês, sueco, dinamarquês, norueguês e finlandês. As imagens carregam o conteúdo da atividade, então a maioria dos resultados se traduz automaticamente ao mudar o idioma.
                  </p>
                  <p>
                    Pronto para começar? Explore as categorias abaixo. Se você está construindo uma linha de imprimíveis para Hotmart, Etsy ou Amazon KDP e precisa de downloads sem marca d&apos;água com licença comercial, na <Link href={`/${locale}/apps`} className="text-indigo-600 hover:text-indigo-700 underline font-medium">área de Aplicações</Link> você encontra as versões licenciadas de todos os geradores abaixo.
                  </p>
                </div>
              )}

              {/* IT intro targeting "generatore di schede gratis" /
                  "creare stampabili online" queries. */}
              {locale === 'it' && (
                <div className="max-w-3xl mx-auto mb-12 space-y-4 text-gray-700 text-base leading-relaxed">
                  <p>
                    I generatori di schede gratuiti ti permettono di creare materiali stampabili per la classe, l&apos;istruzione parentale o per uso personale direttamente nel browser &mdash; senza installare software né abbonamenti mensili. Ognuno dei 33 generatori gratuiti qui sotto produce PDF e JPEG pronti per la stampa che puoi scaricare all&apos;istante.
                  </p>
                  <p>
                    Sei un insegnante che prepara una lezione di recupero, un genitore che pianifica una unità di homeschooling o un creatore di stampabili che esplora un nuovo formato prima di impegnarsi? Questi strumenti nel browser sono per te. Nessun account da creare, nessuna scadenza di prova, nessun limite al numero di schede. Scegli un tema, personalizza l&apos;impaginazione, esporta &mdash; è tutto qui.
                  </p>
                  <p>
                    La filigrana sulla versione gratuita è l&apos;unica differenza rispetto alla versione a pagamento. Dimensioni della griglia, temi delle immagini, livelli di difficoltà, fogli delle soluzioni e risoluzione del PDF sono identici a quelli usati dai venditori con licenza. La filigrana rende le schede gratuite inadatte alla rivendita commerciale, ma perfettamente utilizzabili per dossier di classe, materiale di supporto, complementi di compiti e progetti personali.
                  </p>
                  <p>
                    Tutti i 33 generatori supportano 11 lingue: inglese, tedesco, francese, spagnolo, portoghese, italiano, olandese, svedese, danese, norvegese e finlandese. Le immagini portano il contenuto della scheda, quindi la maggior parte dei risultati si traduce automaticamente cambiando la lingua.
                  </p>
                  <p>
                    Pronto a iniziare? Esplora le categorie qui sotto. Se stai costruendo una linea di stampabili per Etsy o Amazon KDP e ti servono download senza filigrana con licenza commerciale, trovi nell&apos;<Link href={`/${locale}/apps`} className="text-indigo-600 hover:text-indigo-700 underline font-medium">area Applicazioni</Link> le versioni con licenza di tutti i generatori qui sotto.
                  </p>
                </div>
              )}

              {/* ES intro targeting "generador de fichas gratis" /
                  "crear imprimibles en línea" queries. */}
              {locale === 'es' && (
                <div className="max-w-3xl mx-auto mb-12 space-y-4 text-gray-700 text-base leading-relaxed">
                  <p>
                    Los generadores de fichas gratuitos le permiten crear materiales imprimibles para el aula, la educación en casa o uso personal directamente en el navegador &mdash; sin instalar software ni suscripción mensual. Cada uno de los 33 generadores gratuitos de abajo produce PDF y JPEG listos para imprimir que puede descargar al instante.
                  </p>
                  <p>
                    Si es docente preparando una clase de refuerzo, padre o madre planificando una unidad de homeschooling, o creador de imprimibles explorando un formato nuevo antes de comprometerse, estas herramientas en el navegador son para usted. Sin crear cuenta, sin período de prueba caducado, sin límite en el número de fichas. Elegir un tema, personalizar la maquetación y exportar &mdash; ese es todo el proceso.
                  </p>
                  <p>
                    La marca de agua de la versión gratuita es la única diferencia respecto a la versión de pago. Tamaños de cuadrícula, temas de imágenes, niveles de dificultad, hojas de soluciones y resolución del PDF son idénticos a los que usan los vendedores con licencia. La marca de agua hace que las fichas gratuitas no sean aptas para reventa comercial, pero perfectamente utilizables para dosieres de clase, material de refuerzo, complementos de deberes y proyectos personales.
                  </p>
                  <p>
                    Los 33 generadores admiten 11 idiomas: inglés, alemán, francés, español, portugués, italiano, neerlandés, sueco, danés, noruego y finés. Las imágenes portan el contenido de la ficha, por lo que la mayoría de los resultados se traducen automáticamente al cambiar el idioma.
                  </p>
                  <p>
                    ¿Listo para empezar? Explore las categorías de abajo. Si está construyendo una línea de imprimibles para Etsy o Amazon KDP y necesita descargas sin marca de agua con licencia comercial, encontrará en el <Link href={`/${locale}/apps`} className="text-indigo-600 hover:text-indigo-700 underline font-medium">espacio de aplicaciones</Link> las versiones con licencia de todos los generadores de abajo.
                  </p>
                </div>
              )}

              {/* FR intro targeting "générateur de fiches gratuit" /
                  "créer des imprimables en ligne" queries. */}
              {locale === 'fr' && (
                <div className="max-w-3xl mx-auto mb-12 space-y-4 text-gray-700 text-base leading-relaxed">
                  <p>
                    Les générateurs de fiches gratuits vous permettent de créer des supports imprimables pour la classe, l&apos;instruction en famille ou un usage personnel directement dans le navigateur &mdash; sans installation de logiciel, sans abonnement mensuel. Chacun des 33 générateurs gratuits ci-dessous produit des PDF et JPEG prêts à imprimer, téléchargeables instantanément.
                  </p>
                  <p>
                    Si vous êtes enseignant préparant un cours de soutien, parent planifiant une séquence en homeschooling, ou créateur d&apos;imprimables explorant un nouveau format avant de vous engager, ces outils en ligne sont faits pour vous. Aucune création de compte, aucune fin de période d&apos;essai, aucune limite au nombre de fiches. Choisir un thème, personnaliser la mise en page, exporter &mdash; c&apos;est tout le processus.
                  </p>
                  <p>
                    Le filigrane de la version gratuite est la seule différence avec la version payante. Tailles de grilles, thèmes d&apos;images, niveaux de difficulté, corrigés et résolution PDF sont identiques à ce qu&apos;utilisent les vendeurs sous licence. Le filigrane rend les fiches gratuites inadaptées à la revente commerciale, mais parfaitement utilisables pour des dossiers de classe, des supports de soutien, des compléments de devoirs et des projets personnels.
                  </p>
                  <p>
                    Les 33 générateurs prennent en charge 11 langues : anglais, allemand, français, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien et finnois. Les images portent le contenu de la fiche, ce qui permet de traduire automatiquement la plupart des résultats en changeant la langue.
                  </p>
                  <p>
                    Prêt à vous lancer ? Parcourez les catégories ci-dessous. Si vous construisez une gamme d&apos;imprimables pour Etsy ou Amazon KDP et avez besoin de téléchargements sans filigrane avec licence commerciale, vous trouverez dans l&apos;<Link href={`/${locale}/apps`} className="text-indigo-600 hover:text-indigo-700 underline font-medium">espace Applications</Link> les versions sous licence de tous les générateurs ci-dessous.
                  </p>
                </div>
              )}

              {/* DE intro targeting "kostenlose Arbeitsblatt-Generatoren" /
                  "Druckvorlagen erstellen online" queries. Other non-EN
                  locales render nothing here until their own rounds. */}
              {locale === 'de' && (
                <div className="max-w-3xl mx-auto mb-12 space-y-4 text-gray-700 text-base leading-relaxed">
                  <p>
                    Kostenlose Arbeitsblatt-Generatoren erlauben Ihnen, druckbare Lernmaterialien für Klassenzimmer, Homeschooling oder den persönlichen Gebrauch direkt im Browser zu erstellen &mdash; ohne Software-Installation und ohne monatliches Abo. Jeder der 33 kostenlosen Generatoren unten liefert druckfertige PDFs und JPEGs, die Sie sofort herunterladen können.
                  </p>
                  <p>
                    Ob Sie Lehrer sind und eine Nachhilfe-Stunde zusammenstellen, Eltern beim Homeschooling eine Einheit planen oder als Printable-Creator ein neues Format ausprobieren möchten, bevor Sie sich festlegen &mdash; diese Browser-Tools sind für Sie gemacht. Keine Kontoerstellung, kein Testzeitraum, keine Obergrenze bei der Anzahl Ihrer Arbeitsblätter. Thema wählen, Layout anpassen, exportieren &mdash; das ist der gesamte Ablauf.
                  </p>
                  <p>
                    Das Wasserzeichen auf der kostenlosen Version ist der einzige Unterschied zur bezahlten Ausführung. Gittergrößen, Bildthemen, Schwierigkeitsstufen, Lösungsschlüssel und PDF-Auflösung sind identisch mit dem, was lizenzierte Verkäufer nutzen. Das Wasserzeichen macht die kostenlosen Arbeitsblätter für den kommerziellen Weiterverkauf ungeeignet, jedoch perfekt nutzbar für Unterrichtsmappen, Nachhilfe-Unterlagen, Hausaufgaben-Zusätze und persönliche Projekte.
                  </p>
                  <p>
                    Alle 33 Generatoren unterstützen 11 Sprachen: Englisch, Deutsch, Französisch, Spanisch, Portugiesisch, Italienisch, Niederländisch, Schwedisch, Dänisch, Norwegisch und Finnisch. Bilder transportieren den Arbeitsblatt-Inhalt, sodass sich die meisten Ergebnisse beim Sprachwechsel automatisch übersetzen lassen.
                  </p>
                  <p>
                    Bereit loszulegen? Durchstöbern Sie die Kategorien unten. Wenn Sie eine Printable-Produktlinie für Etsy oder Amazon KDP aufbauen und wasserzeichenfreie Downloads mit kommerzieller Lizenz benötigen, finden Sie im <Link href={`/${locale}/apps`} className="text-indigo-600 hover:text-indigo-700 underline font-medium">Apps-Bereich</Link> die lizenzierten Versionen aller Generatoren unten.
                  </p>
                </div>
              )}

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
