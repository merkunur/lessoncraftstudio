import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SUPPORTED_LOCALES } from '@/config/locales';
import {
  getAppConfigBySlug,
  getAllProductPageSlugs,
  getAlternateUrls,
  getSlugForLocale,
} from '@/config/product-page-slugs';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { ogLocaleMap, getHreflangCode } from '@/lib/schema-generator';
import { ALL_APPS, APP_CATEGORIES, type AppId, type CategoryId } from '@/config/warriorplus-products';
import Link from 'next/link';
import TryFreeButton from './TryFreeButton';

// ── Slug-appId to WP-appId mapping ──
// product-page-slugs uses different IDs than warriorplus-products for some apps
const slugAppToWpApp: Record<string, string> = {
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

function getWpAppId(slugAppId: string): AppId | null {
  const wpId = slugAppToWpApp[slugAppId] || slugAppId;
  if (wpId in ALL_APPS) return wpId as AppId;
  return null;
}

// ── HTML file mapping (slug-appId to filename) ──
const appFileMap: Record<string, string> = {
  'word-search': 'wordsearch.html',
  'image-addition': 'addition.html',
  'alphabet-train': 'alphabet train.html',
  'coloring': 'coloring.html',
  'math-worksheet': 'math worksheet.html',
  'word-scramble': 'word scramble.html',
  'find-and-count': 'find and count.html',
  'matching-app': 'matching.html',
  'drawing-lines': 'drawing lines.html',
  'picture-bingo': 'bingo.html',
  'sudoku': 'sudoku.html',
  'big-small-app': 'big small.html',
  'chart-count-color': 'chart count.html',
  'code-addition': 'code addition.html',
  'draw-and-color': 'draw and color.html',
  'find-objects': 'find objects.html',
  'grid-match': 'grid match.html',
  'image-crossword': 'crossword.html',
  'image-cryptogram': 'cryptogram.html',
  'math-puzzle': 'math puzzle.html',
  'missing-pieces': 'missing pieces.html',
  'more-less': 'more less.html',
  'odd-one-out': 'odd one out.html',
  'pattern-train': 'pattern train.html',
  'pattern-worksheet': 'pattern worksheet.html',
  'picture-path': 'picture path.html',
  'picture-sort': 'picture sort.html',
  'prepositions': 'prepositions.html',
  'shadow-match': 'shadow match.html',
  'story-dice': 'story-dice.html',
  'subtraction': 'subtraction.html',
  'treasure-hunt': 'treasure hunt.html',
  'word-guess': 'word guess.html',
  'writing-app': 'writing.html',
};

// ── Localized UI strings ──
const uiStrings: Record<string, {
  tryFree: string;
  tryFreeDesc: string;
  features: string;
  relatedApps: string;
  viewAll: string;
  howItWorks: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  noSignup: string;
  languages: string;
  pdfExport: string;
  watermarkNote: string;
}> = {
  en: {
    tryFree: 'Try Free with Watermark',
    tryFreeDesc: 'No signup required. Create worksheets instantly.',
    features: 'Features',
    relatedApps: 'Related Generators',
    viewAll: 'View All Generators',
    howItWorks: 'How It Works',
    step1Title: 'Create',
    step1Desc: 'Choose a theme, customize settings, and generate your worksheet.',
    step2Title: 'Export PDF',
    step2Desc: 'Download a professional PDF ready for printing or digital use.',
    step3Title: 'Sell or Use',
    step3Desc: 'Sell on Etsy, Amazon KDP, TPT, or use in your classroom.',
    noSignup: 'No signup required',
    languages: '11 languages supported',
    pdfExport: 'Instant PDF export',
    watermarkNote: 'Free version includes a small watermark. Purchase to remove.',
  },
  de: {
    tryFree: 'Kostenlos testen (mit Wasserzeichen)',
    tryFreeDesc: 'Keine Anmeldung erforderlich. Sofort Arbeitsbl\u00e4tter erstellen.',
    features: 'Funktionen',
    relatedApps: 'Verwandte Generatoren',
    viewAll: 'Alle Generatoren anzeigen',
    howItWorks: 'So funktioniert es',
    step1Title: 'Erstellen',
    step1Desc: 'Thema w\u00e4hlen, Einstellungen anpassen und Arbeitsblatt generieren.',
    step2Title: 'PDF exportieren',
    step2Desc: 'Professionelles PDF zum Drucken oder digitalen Gebrauch herunterladen.',
    step3Title: 'Verkaufen oder Nutzen',
    step3Desc: 'Auf Etsy, Amazon KDP, TPT verkaufen oder im Unterricht verwenden.',
    noSignup: 'Keine Anmeldung n\u00f6tig',
    languages: '11 Sprachen unterst\u00fctzt',
    pdfExport: 'Sofortiger PDF-Export',
    watermarkNote: 'Kostenlose Version enth\u00e4lt ein kleines Wasserzeichen. Kaufen Sie die Vollversion, um es zu entfernen.',
  },
  fr: {
    tryFree: 'Essayer gratuitement (avec filigrane)',
    tryFreeDesc: 'Aucune inscription requise. Cr\u00e9ez des fiches instantan\u00e9ment.',
    features: 'Fonctionnalit\u00e9s',
    relatedApps: 'G\u00e9n\u00e9rateurs similaires',
    viewAll: 'Voir tous les g\u00e9n\u00e9rateurs',
    howItWorks: 'Comment \u00e7a marche',
    step1Title: 'Cr\u00e9er',
    step1Desc: 'Choisissez un th\u00e8me, personnalisez les param\u00e8tres et g\u00e9n\u00e9rez votre fiche.',
    step2Title: 'Exporter en PDF',
    step2Desc: 'T\u00e9l\u00e9chargez un PDF professionnel pr\u00eat \u00e0 imprimer.',
    step3Title: 'Vendre ou Utiliser',
    step3Desc: 'Vendez sur Etsy, Amazon KDP, TPT ou utilisez en classe.',
    noSignup: 'Aucune inscription',
    languages: '11 langues disponibles',
    pdfExport: 'Export PDF instantan\u00e9',
    watermarkNote: 'La version gratuite inclut un filigrane. Achetez pour le supprimer.',
  },
  es: {
    tryFree: 'Probar gratis (con marca de agua)',
    tryFreeDesc: 'Sin registro. Cree fichas al instante.',
    features: 'Caracter\u00edsticas',
    relatedApps: 'Generadores relacionados',
    viewAll: 'Ver todos los generadores',
    howItWorks: 'C\u00f3mo funciona',
    step1Title: 'Crear',
    step1Desc: 'Elija un tema, personalice la configuraci\u00f3n y genere su ficha.',
    step2Title: 'Exportar PDF',
    step2Desc: 'Descargue un PDF profesional listo para imprimir.',
    step3Title: 'Vender o Usar',
    step3Desc: 'Venda en Etsy, Amazon KDP, TPT o use en el aula.',
    noSignup: 'Sin registro',
    languages: '11 idiomas disponibles',
    pdfExport: 'Exportaci\u00f3n PDF instant\u00e1nea',
    watermarkNote: 'La versi\u00f3n gratuita incluye una marca de agua. Compre para eliminarla.',
  },
  pt: {
    tryFree: 'Experimentar gr\u00e1tis (com marca d\u2019\u00e1gua)',
    tryFreeDesc: 'Sem cadastro. Crie atividades na hora.',
    features: 'Recursos',
    relatedApps: 'Geradores relacionados',
    viewAll: 'Ver todos os geradores',
    howItWorks: 'Como funciona',
    step1Title: 'Criar',
    step1Desc: 'Escolha um tema, personalize as configura\u00e7\u00f5es e gere sua atividade.',
    step2Title: 'Exportar PDF',
    step2Desc: 'Baixe um PDF profissional pronto para impress\u00e3o.',
    step3Title: 'Vender ou Usar',
    step3Desc: 'Venda no Etsy, Amazon KDP, TPT ou use em sala de aula.',
    noSignup: 'Sem cadastro',
    languages: '11 idiomas dispon\u00edveis',
    pdfExport: 'Exporta\u00e7\u00e3o PDF instant\u00e2nea',
    watermarkNote: 'A vers\u00e3o gratuita inclui marca d\u2019\u00e1gua. Compre para remov\u00ea-la.',
  },
  it: {
    tryFree: 'Prova gratis (con filigrana)',
    tryFreeDesc: 'Nessuna registrazione. Crea schede all\u2019istante.',
    features: 'Funzionalit\u00e0',
    relatedApps: 'Generatori correlati',
    viewAll: 'Vedi tutti i generatori',
    howItWorks: 'Come funziona',
    step1Title: 'Crea',
    step1Desc: 'Scegli un tema, personalizza le impostazioni e genera la tua scheda.',
    step2Title: 'Esporta PDF',
    step2Desc: 'Scarica un PDF professionale pronto per la stampa.',
    step3Title: 'Vendi o Usa',
    step3Desc: 'Vendi su Etsy, Amazon KDP, TPT o usa in classe.',
    noSignup: 'Nessuna registrazione',
    languages: '11 lingue supportate',
    pdfExport: 'Esportazione PDF istantanea',
    watermarkNote: 'La versione gratuita include una filigrana. Acquista per rimuoverla.',
  },
  nl: {
    tryFree: 'Gratis proberen (met watermerk)',
    tryFreeDesc: 'Geen registratie nodig. Maak direct werkbladen.',
    features: 'Functies',
    relatedApps: 'Gerelateerde generatoren',
    viewAll: 'Alle generatoren bekijken',
    howItWorks: 'Hoe het werkt',
    step1Title: 'Maak',
    step1Desc: 'Kies een thema, pas instellingen aan en genereer je werkblad.',
    step2Title: 'Exporteer PDF',
    step2Desc: 'Download een professionele PDF klaar om te printen.',
    step3Title: 'Verkoop of Gebruik',
    step3Desc: 'Verkoop op Etsy, Amazon KDP, TPT of gebruik in de klas.',
    noSignup: 'Geen registratie',
    languages: '11 talen ondersteund',
    pdfExport: 'Directe PDF-export',
    watermarkNote: 'Gratis versie bevat een watermerk. Koop om het te verwijderen.',
  },
  sv: {
    tryFree: 'Testa gratis (med vattenstämpel)',
    tryFreeDesc: 'Ingen registrering kr\u00e4vs. Skapa arbetsblad direkt.',
    features: 'Funktioner',
    relatedApps: 'Relaterade generatorer',
    viewAll: 'Visa alla generatorer',
    howItWorks: 'Hur det fungerar',
    step1Title: 'Skapa',
    step1Desc: 'V\u00e4lj tema, anpassa inst\u00e4llningar och generera ditt arbetsblad.',
    step2Title: 'Exportera PDF',
    step2Desc: 'Ladda ner en professionell PDF f\u00e4rdig att skriva ut.',
    step3Title: 'S\u00e4lj eller Anv\u00e4nd',
    step3Desc: 'S\u00e4lj p\u00e5 Etsy, Amazon KDP, TPT eller anv\u00e4nd i klassrummet.',
    noSignup: 'Ingen registrering',
    languages: '11 spr\u00e5k st\u00f6ds',
    pdfExport: 'Direkt PDF-export',
    watermarkNote: 'Gratisversionen inneh\u00e5ller en vattenst\u00e4mpel. K\u00f6p f\u00f6r att ta bort den.',
  },
  da: {
    tryFree: 'Pr\u00f8v gratis (med vandm\u00e6rke)',
    tryFreeDesc: 'Ingen tilmelding n\u00f8dvendig. Opret arbejdsark med det samme.',
    features: 'Funktioner',
    relatedApps: 'Relaterede generatorer',
    viewAll: 'Se alle generatorer',
    howItWorks: 'S\u00e5dan fungerer det',
    step1Title: 'Opret',
    step1Desc: 'V\u00e6lg et tema, tilpas indstillinger og generer dit arbejdsark.',
    step2Title: 'Eksporter PDF',
    step2Desc: 'Download en professionel PDF klar til udskrivning.',
    step3Title: 'S\u00e6lg eller Brug',
    step3Desc: 'S\u00e6lg p\u00e5 Etsy, Amazon KDP, TPT eller brug i klasselokalet.',
    noSignup: 'Ingen tilmelding',
    languages: '11 sprog underst\u00f8ttet',
    pdfExport: '\u00d8jeblikkelig PDF-eksport',
    watermarkNote: 'Gratisversionen indeholder et vandm\u00e6rke. K\u00f8b for at fjerne det.',
  },
  no: {
    tryFree: 'Pr\u00f8v gratis (med vannmerke)',
    tryFreeDesc: 'Ingen registrering n\u00f8dvendig. Lag arbeidsark med en gang.',
    features: 'Funksjoner',
    relatedApps: 'Relaterte generatorer',
    viewAll: 'Se alle generatorer',
    howItWorks: 'Slik fungerer det',
    step1Title: 'Lag',
    step1Desc: 'Velg tema, tilpass innstillinger og generer arbeidsarket ditt.',
    step2Title: 'Eksporter PDF',
    step2Desc: 'Last ned en profesjonell PDF klar til utskrift.',
    step3Title: 'Selg eller Bruk',
    step3Desc: 'Selg p\u00e5 Etsy, Amazon KDP, TPT eller bruk i klasserommet.',
    noSignup: 'Ingen registrering',
    languages: '11 spr\u00e5k st\u00f8ttet',
    pdfExport: 'Umiddelbar PDF-eksport',
    watermarkNote: 'Gratisversjonen inkluderer et vannmerke. Kj\u00f8p for \u00e5 fjerne det.',
  },
  fi: {
    tryFree: 'Kokeile ilmaiseksi (vesileimalla)',
    tryFreeDesc: 'Ei rekister\u00f6inti\u00e4. Luo ty\u00f6arkkeja heti.',
    features: 'Ominaisuudet',
    relatedApps: 'Samankaltaiset generaattorit',
    viewAll: 'N\u00e4yt\u00e4 kaikki generaattorit',
    howItWorks: 'N\u00e4in se toimii',
    step1Title: 'Luo',
    step1Desc: 'Valitse teema, muokkaa asetuksia ja luo ty\u00f6arkkisi.',
    step2Title: 'Vie PDF',
    step2Desc: 'Lataa ammattimainen PDF valmiina tulostettavaksi.',
    step3Title: 'Myy tai K\u00e4yt\u00e4',
    step3Desc: 'Myy Etsyss\u00e4, Amazon KDP:ss\u00e4, TPT:ss\u00e4 tai k\u00e4yt\u00e4 luokkahuoneessa.',
    noSignup: 'Ei rekister\u00f6inti\u00e4',
    languages: '11 kielt\u00e4 tuettu',
    pdfExport: 'V\u00e4lit\u00f6n PDF-vienti',
    watermarkNote: 'Ilmaisversio sis\u00e4lt\u00e4\u00e4 vesileiman. Osta poistaaksesi sen.',
  },
};

// ── Localized app descriptions (keyed by WP appId) ──
const appDescriptions: Record<string, Record<string, string>> = {
  addition: {
    en: 'Create professional addition worksheets with themed images. Perfect for kindergarten through second grade.',
    de: 'Erstellen Sie professionelle Additions-Arbeitsbl\u00e4tter mit thematischen Bildern.',
    fr: "Cr\u00e9ez des fiches d'addition professionnelles avec des images th\u00e9matiques.",
    es: 'Cree fichas de suma profesionales con im\u00e1genes tem\u00e1ticas.',
    pt: 'Crie atividades de adi\u00e7\u00e3o profissionais com imagens tem\u00e1ticas.',
    it: 'Crea schede di addizione professionali con immagini tematiche.',
    nl: 'Maak professionele optelwerkbladen met thematische afbeeldingen.',
    sv: 'Skapa professionella additions-arbetsblad med tematiska bilder.',
    da: 'Opret professionelle additions-arbejdsark med tematiske billeder.',
    no: 'Lag profesjonelle addisjons-arbeidsark med tematiske bilder.',
    fi: 'Luo ammattimaisia yhteenlasku-ty\u00f6arkkeja temaattisilla kuvilla.',
  },
  subtraction: {
    en: 'Generate subtraction worksheets with customizable difficulty levels and themed visuals.',
  },
  'code-addition': {
    en: 'Create secret code addition puzzles where students solve math to decode messages.',
  },
  'more-less': {
    en: 'Generate greater than, less than, and equal to comparison worksheets.',
  },
  'math-puzzle': {
    en: 'Create engaging math puzzle worksheets that combine arithmetic with problem-solving.',
  },
  'math-worksheet': {
    en: 'Generate customizable math practice sheets with mixed operations and difficulty levels.',
  },
  'alphabet-train': {
    en: 'Create alphabet train worksheets for letter recognition and sequencing practice.',
  },
  prepositions: {
    en: 'Generate preposition worksheets with visual scenes for spatial language practice.',
  },
  'word-guess': {
    en: 'Create hangman-style word guess worksheets for vocabulary building.',
  },
  'word-scramble': {
    en: 'Generate word scramble puzzles with themed vocabulary lists.',
  },
  wordsearch: {
    en: 'Create professional word search puzzles with custom word lists and themed layouts.',
    de: 'Erstellen Sie professionelle Wortsuch-R\u00e4tsel mit eigenen W\u00f6rterlisten.',
    fr: 'Cr\u00e9ez des mots cach\u00e9s professionnels avec des listes de mots personnalis\u00e9es.',
    es: 'Cree sopas de letras profesionales con listas de palabras personalizadas.',
    pt: 'Crie ca\u00e7a-palavras profissionais com listas de palavras personalizadas.',
    it: 'Crea crucipuzzle professionali con elenchi di parole personalizzati.',
    nl: 'Maak professionele woordzoekers met aangepaste woordlijsten.',
    sv: 'Skapa professionella ordjaktar med anpassade ordlistor.',
    da: 'Opret professionelle ords\u00f8gninger med brugerdefinerede ordlister.',
    no: 'Lag profesjonelle ords\u00f8k med egendefinerte ordlister.',
    fi: 'Luo ammattimaisia sananhaku-pulmia mukautetuilla sanalistoilla.',
  },
  cryptogram: {
    en: 'Generate cryptogram puzzles where letters are substituted with symbols.',
  },
  writing: {
    en: 'Create lined writing worksheets for handwriting and creative writing practice.',
  },
  'big-small': {
    en: 'Generate size comparison worksheets for visual discrimination practice.',
  },
  'pattern-train': {
    en: 'Create pattern sequence worksheets with themed images for logical thinking.',
  },
  'pattern-worksheet': {
    en: 'Generate pattern recognition and completion worksheets.',
  },
  'draw-and-color': {
    en: 'Create guided drawing and coloring activity sheets with step-by-step instructions.',
  },
  'drawing-lines': {
    en: 'Generate tracing and line-drawing worksheets for fine motor skill development.',
  },
  coloring: {
    en: 'Create professional coloring pages with 3,000+ themed images across 100+ themes.',
    de: 'Erstellen Sie professionelle Ausmalseiten mit 3.000+ thematischen Bildern.',
    fr: 'Cr\u00e9ez des pages de coloriage professionnelles avec 3 000+ images th\u00e9matiques.',
    es: 'Cree p\u00e1ginas para colorear profesionales con 3.000+ im\u00e1genes tem\u00e1ticas.',
    pt: 'Crie p\u00e1ginas para colorir profissionais com 3.000+ imagens tem\u00e1ticas.',
    it: 'Crea pagine da colorare professionali con 3.000+ immagini tematiche.',
    nl: 'Maak professionele kleurplaten met 3.000+ thematische afbeeldingen.',
    sv: 'Skapa professionella m\u00e5larbilder med 3 000+ tematiska bilder.',
    da: 'Opret professionelle malebogssider med 3.000+ tematiske billeder.',
    no: 'Lag profesjonelle fargeleggingsbilder med 3 000+ tematiske bilder.',
    fi: 'Luo ammattimaisia v\u00e4rityskuvia 3 000+ temaattisella kuvalla.',
  },
  'chart-count': {
    en: 'Generate counting chart worksheets with visual aids for number practice.',
  },
  matching: {
    en: 'Create memory-style matching worksheets with themed image pairs.',
  },
  'grid-match': {
    en: 'Generate grid-based matching activities for visual pattern recognition.',
  },
  'shadow-match': {
    en: 'Create shadow matching worksheets for visual perception and discrimination.',
  },
  bingo: {
    en: 'Generate customizable picture bingo cards with themed images.',
  },
  'picture-sort': {
    en: 'Create sorting and categorization worksheets with themed images.',
  },
  'missing-pieces': {
    en: 'Generate visual puzzles where students identify missing pieces.',
  },
  'odd-one-out': {
    en: 'Create odd-one-out worksheets for critical thinking and classification.',
  },
  sudoku: {
    en: 'Generate picture sudoku puzzles with themed images for logic practice.',
  },
  'picture-path': {
    en: 'Create maze and path-finding worksheets with engaging themed visuals.',
  },
  'find-and-count': {
    en: 'Generate find-and-count worksheets with hidden themed objects.',
  },
  'find-objects': {
    en: 'Create hidden objects search worksheets with themed scenes.',
  },
  crossword: {
    en: 'Generate picture crossword puzzles with themed images as clues.',
  },
  'treasure-hunt': {
    en: 'Create treasure hunt worksheets combining navigation and problem-solving.',
  },
};

// ── Localized feature lists per category ──
const categoryFeatures: Record<string, Record<string, string[]>> = {
  math: {
    en: ['Customizable difficulty levels', 'Themed images from 100+ themes', 'Auto-generated answer keys', 'Print-ready PDF export'],
    de: ['Anpassbare Schwierigkeitsstufen', 'Thematische Bilder aus 100+ Themen', 'Automatische L\u00f6sungsschl\u00fcssel', 'Druckfertiger PDF-Export'],
  },
  literacy: {
    en: ['Custom word lists and vocabulary', 'Multi-language word support', 'Auto-generated answer keys', 'Print-ready PDF export'],
  },
  visual: {
    en: ['3,000+ themed images', 'Customizable layouts and sizes', 'Professional print quality', 'Instant PDF download'],
  },
  matching: {
    en: ['Themed image pairs', 'Adjustable grid sizes', 'Auto-generated answer keys', 'Print-ready PDF export'],
  },
  puzzle: {
    en: ['Multiple difficulty levels', 'Themed visual elements', 'Auto-generated solutions', 'Print-ready PDF export'],
  },
  search: {
    en: ['Custom clue lists', 'Themed image clues', 'Auto-generated answer keys', 'Print-ready PDF export'],
  },
};

// ── Category icon SVGs ──
function CategoryIcon({ category }: { category: string }) {
  switch (category) {
    case 'math':
      return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
    case 'literacy':
      return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
    case 'visual':
      return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
    case 'matching':
      return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
    case 'puzzle':
      return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
    case 'search':
      return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
    default:
      return null;
  }
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const allSlugs = getAllProductPageSlugs();
  return allSlugs.map(({ locale, slug }) => ({
    locale,
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale = params.locale as SupportedLocale;
  const slug = params.slug;
  const baseUrl = 'https://www.lessoncraftstudio.com';

  const appConfig = getAppConfigBySlug(slug);
  if (!appConfig) return {};

  const wpAppId = getWpAppId(appConfig.appId);
  if (!wpAppId) return {};

  const appData = ALL_APPS[wpAppId];
  const desc = appDescriptions[wpAppId]?.[locale] || appDescriptions[wpAppId]?.en || '';
  const alternateUrls = getAlternateUrls(appConfig.appId, baseUrl);
  const localeSlug = getSlugForLocale(appConfig.appId, locale);

  const title = `${appData.name} Worksheet Generator | LessonCraftStudio`;

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${baseUrl}/${locale}/apps/${localeSlug || slug}`,
      languages: alternateUrls,
    },
    openGraph: {
      title,
      description: desc,
      type: 'website',
      url: `${baseUrl}/${locale}/apps/${localeSlug || slug}`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
    },
  };
}

export default async function AppDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as SupportedLocale;
  const slug = params.slug;

  const appConfig = getAppConfigBySlug(slug);
  if (!appConfig) notFound();

  const wpAppId = getWpAppId(appConfig.appId);
  if (!wpAppId) notFound();

  const appData = ALL_APPS[wpAppId];
  const category = appData.category as CategoryId;
  const categoryData = APP_CATEGORIES[category];
  const ui = uiStrings[locale] || uiStrings.en;
  const desc = appDescriptions[wpAppId]?.[locale] || appDescriptions[wpAppId]?.en || '';
  const features = categoryFeatures[category]?.[locale] || categoryFeatures[category]?.en || [];

  // Build the app launch URL
  const htmlFile = appFileMap[appConfig.appId] || `${appConfig.appId}.html`;
  const launchUrl = `/worksheet-generators/${encodeURIComponent(htmlFile)}?locale=${locale}&tier=free`;

  // Get related apps in same category (exclude current)
  const relatedApps = categoryData.apps
    .filter(id => id !== wpAppId)
    .slice(0, 5)
    .map(id => {
      // Reverse lookup: WP appId to slug appId
      const slugAppId = Object.entries(slugAppToWpApp).find(([, wp]) => wp === id)?.[0] || id;
      const appSlug = getSlugForLocale(slugAppId, locale);
      return {
        id,
        name: ALL_APPS[id].name,
        slug: appSlug,
      };
    })
    .filter(a => a.slug);

  // JSON-LD SoftwareApplication schema
  const localeSlug = getSlugForLocale(appConfig.appId, locale);
  const pageUrl = `https://www.lessoncraftstudio.com/${locale}/apps/${localeSlug || slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${appData.name} Worksheet Generator`,
    description: desc,
    url: pageUrl,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free with watermark',
    },
    author: {
      '@type': 'Organization',
      name: 'LessonCraftStudio',
      url: 'https://www.lessoncraftstudio.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: `${categoryData.color}15`, color: categoryData.color }}>
                <CategoryIcon category={category} />
                {categoryData.name}
              </div>

              {/* App Name */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {appData.name} Worksheet Generator
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {desc}
              </p>

              {/* CTA */}
              <TryFreeButton launchUrl={launchUrl} label={ui.tryFree} />

              {/* Sub-CTA text */}
              <p className="mt-4 text-sm text-gray-500">{ui.tryFreeDesc}</p>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {ui.noSignup}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {ui.languages}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {ui.pdfExport}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">{ui.howItWorks}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: '1', title: ui.step1Title, desc: ui.step1Desc },
                { step: '2', title: ui.step2Title, desc: ui.step2Desc },
                { step: '3', title: ui.step3Title, desc: ui.step3Desc },
              ].map(item => (
                <div key={item.step} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        {features.length > 0 && (
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">{ui.features}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                    <svg className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Watermark Note */}
        <section className="py-8 bg-amber-50 border-y border-amber-100">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-amber-800">{ui.watermarkNote}</p>
          </div>
        </section>

        {/* Related Apps */}
        {relatedApps.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">{ui.relatedApps}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
                {relatedApps.map(app => (
                  <Link
                    key={app.id}
                    href={`/${locale}/apps/${app.slug}`}
                    className="flex flex-col items-center p-4 rounded-lg bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all text-center"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${categoryData.color}15` }}>
                      <CategoryIcon category={category} />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{app.name}</span>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href={`/${locale}/apps`}
                  className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                >
                  {ui.viewAll} &rarr;
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="py-12 md:py-16 bg-indigo-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              {appData.name} Worksheet Generator
            </h2>
            <p className="text-indigo-100 mb-8 max-w-lg mx-auto">{ui.tryFreeDesc}</p>
            <TryFreeButton launchUrl={launchUrl} label={ui.tryFree} variant="light" />
          </div>
        </section>
      </div>
    </>
  );
}
