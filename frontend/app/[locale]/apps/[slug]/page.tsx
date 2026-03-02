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
import { getLocalizedAppName, getLocalizedCategoryName, getLocalizedSuffix } from '@/config/app-translations';
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
    fr: ['Niveaux de difficult\u00e9 personnalisables', 'Images th\u00e9matiques de 100+ th\u00e8mes', 'Corrig\u00e9s g\u00e9n\u00e9r\u00e9s automatiquement', 'Export PDF pr\u00eat \u00e0 imprimer'],
    es: ['Niveles de dificultad personalizables', 'Im\u00e1genes tem\u00e1ticas de 100+ temas', 'Claves de respuesta autogeneradas', 'Exportaci\u00f3n PDF lista para imprimir'],
    it: ['Livelli di difficolt\u00e0 personalizzabili', 'Immagini tematiche da 100+ temi', 'Soluzioni generate automaticamente', 'Esportazione PDF pronta per la stampa'],
    pt: ['N\u00edveis de dificuldade personaliz\u00e1veis', 'Imagens tem\u00e1ticas de 100+ temas', 'Gabaritos gerados automaticamente', 'Exporta\u00e7\u00e3o PDF pronta para impress\u00e3o'],
    nl: ['Aanpasbare moeilijkheidsniveaus', 'Thematische afbeeldingen uit 100+ thema\'s', 'Automatisch gegenereerde antwoorden', 'Printklare PDF-export'],
    da: ['Tilpasselige sv\u00e6rhedsgrader', 'Tematiske billeder fra 100+ temaer', 'Automatisk genererede l\u00f8sninger', 'Printklart PDF-eksport'],
    sv: ['Anpassningsbara sv\u00e5righetsgrader', 'Tematiska bilder fr\u00e5n 100+ teman', 'Automatiskt genererade l\u00f6sningar', 'Utskriftsklar PDF-export'],
    no: ['Tilpassbare vanskelighetsgrader', 'Tematiske bilder fra 100+ temaer', 'Automatisk genererte l\u00f8sninger', 'Utskriftsklar PDF-eksport'],
    fi: ['S\u00e4\u00e4dett\u00e4v\u00e4t vaikeustasot', 'Temaattiset kuvat 100+ teemasta', 'Automaattisesti luodut vastaukset', 'Tulostuskelpoinen PDF-vienti'],
  },
  literacy: {
    en: ['Custom word lists and vocabulary', 'Multi-language word support', 'Auto-generated answer keys', 'Print-ready PDF export'],
    de: ['Eigene Wortlisten und Vokabeln', 'Mehrsprachige Wortunterst\u00fctzung', 'Automatische L\u00f6sungsschl\u00fcssel', 'Druckfertiger PDF-Export'],
    fr: ['Listes de mots personnalis\u00e9es', 'Support multilingue', 'Corrig\u00e9s g\u00e9n\u00e9r\u00e9s automatiquement', 'Export PDF pr\u00eat \u00e0 imprimer'],
    es: ['Listas de palabras personalizadas', 'Soporte de palabras multiling\u00fce', 'Claves de respuesta autogeneradas', 'Exportaci\u00f3n PDF lista para imprimir'],
    it: ['Elenchi di parole personalizzati', 'Supporto multilingue', 'Soluzioni generate automaticamente', 'Esportazione PDF pronta per la stampa'],
    pt: ['Listas de palavras personalizadas', 'Suporte multil\u00edngue', 'Gabaritos gerados automaticamente', 'Exporta\u00e7\u00e3o PDF pronta para impress\u00e3o'],
    nl: ['Aangepaste woordlijsten', 'Meertalige woordondersteuning', 'Automatisch gegenereerde antwoorden', 'Printklare PDF-export'],
    da: ['Brugerdefinerede ordlister', 'Flersproget ordunderst\u00f8ttelse', 'Automatisk genererede l\u00f8sninger', 'Printklart PDF-eksport'],
    sv: ['Anpassade ordlistor', 'Flerspr\u00e5kigt ordst\u00f6d', 'Automatiskt genererade l\u00f6sningar', 'Utskriftsklar PDF-export'],
    no: ['Egendefinerte ordlister', 'Flerspr\u00e5klig ordst\u00f8tte', 'Automatisk genererte l\u00f8sninger', 'Utskriftsklar PDF-eksport'],
    fi: ['Mukautetut sanalistat', 'Monikielinen sanatuki', 'Automaattisesti luodut vastaukset', 'Tulostuskelpoinen PDF-vienti'],
  },
  visual: {
    en: ['3,000+ themed images', 'Customizable layouts and sizes', 'Professional print quality', 'Instant PDF download'],
    de: ['3.000+ thematische Bilder', 'Anpassbare Layouts und Gr\u00f6\u00dfen', 'Professionelle Druckqualit\u00e4t', 'Sofortiger PDF-Download'],
    fr: ['3 000+ images th\u00e9matiques', 'Mises en page et tailles personnalisables', 'Qualit\u00e9 d\'impression professionnelle', 'T\u00e9l\u00e9chargement PDF instantan\u00e9'],
    es: ['3.000+ im\u00e1genes tem\u00e1ticas', 'Dise\u00f1os y tama\u00f1os personalizables', 'Calidad de impresi\u00f3n profesional', 'Descarga PDF instant\u00e1nea'],
    it: ['3.000+ immagini tematiche', 'Layout e dimensioni personalizzabili', 'Qualit\u00e0 di stampa professionale', 'Download PDF istantaneo'],
    pt: ['3.000+ imagens tem\u00e1ticas', 'Layouts e tamanhos personaliz\u00e1veis', 'Qualidade de impress\u00e3o profissional', 'Download PDF instant\u00e2neo'],
    nl: ['3.000+ thematische afbeeldingen', 'Aanpasbare lay-outs en formaten', 'Professionele afdrukkwaliteit', 'Directe PDF-download'],
    da: ['3.000+ tematiske billeder', 'Tilpasselige layouts og st\u00f8rrelser', 'Professionel udskriftskvalitet', '\u00d8jeblikkelig PDF-download'],
    sv: ['3 000+ tematiska bilder', 'Anpassningsbara layouter och storlekar', 'Professionell utskriftskvalitet', 'Omedelbar PDF-nedladdning'],
    no: ['3 000+ tematiske bilder', 'Tilpassbare layouter og st\u00f8rrelser', 'Profesjonell utskriftskvalitet', 'Umiddelbar PDF-nedlasting'],
    fi: ['3 000+ temaattista kuvaa', 'Muokattavat asettelut ja koot', 'Ammattimainen tulostuslaatu', 'V\u00e4lit\u00f6n PDF-lataus'],
  },
  matching: {
    en: ['Themed image pairs', 'Adjustable grid sizes', 'Auto-generated answer keys', 'Print-ready PDF export'],
    de: ['Thematische Bilderpaare', 'Einstellbare Rastergr\u00f6\u00dfen', 'Automatische L\u00f6sungsschl\u00fcssel', 'Druckfertiger PDF-Export'],
    fr: ['Paires d\'images th\u00e9matiques', 'Tailles de grille ajustables', 'Corrig\u00e9s g\u00e9n\u00e9r\u00e9s automatiquement', 'Export PDF pr\u00eat \u00e0 imprimer'],
    es: ['Parejas de im\u00e1genes tem\u00e1ticas', 'Tama\u00f1os de cuadr\u00edcula ajustables', 'Claves de respuesta autogeneradas', 'Exportaci\u00f3n PDF lista para imprimir'],
    it: ['Coppie di immagini tematiche', 'Dimensioni della griglia regolabili', 'Soluzioni generate automaticamente', 'Esportazione PDF pronta per la stampa'],
    pt: ['Pares de imagens tem\u00e1ticas', 'Tamanhos de grade ajust\u00e1veis', 'Gabaritos gerados automaticamente', 'Exporta\u00e7\u00e3o PDF pronta para impress\u00e3o'],
    nl: ['Thematische afbeeldingsparen', 'Aanpasbare rastergroottes', 'Automatisch gegenereerde antwoorden', 'Printklare PDF-export'],
    da: ['Tematiske billedpar', 'Justerbare gitterst\u00f8rrelser', 'Automatisk genererede l\u00f8sninger', 'Printklart PDF-eksport'],
    sv: ['Tematiska bildpar', 'Justerbara rutn\u00e4tsstorlekar', 'Automatiskt genererade l\u00f6sningar', 'Utskriftsklar PDF-export'],
    no: ['Tematiske bildepar', 'Justerbare rutenettest\u00f8rrelser', 'Automatisk genererte l\u00f8sninger', 'Utskriftsklar PDF-eksport'],
    fi: ['Temaattiset kuvaparit', 'S\u00e4\u00e4dett\u00e4v\u00e4t ruudukkokoot', 'Automaattisesti luodut vastaukset', 'Tulostuskelpoinen PDF-vienti'],
  },
  puzzle: {
    en: ['Multiple difficulty levels', 'Themed visual elements', 'Auto-generated solutions', 'Print-ready PDF export'],
    de: ['Mehrere Schwierigkeitsstufen', 'Thematische visuelle Elemente', 'Automatisch generierte L\u00f6sungen', 'Druckfertiger PDF-Export'],
    fr: ['Plusieurs niveaux de difficult\u00e9', '\u00c9l\u00e9ments visuels th\u00e9matiques', 'Solutions g\u00e9n\u00e9r\u00e9es automatiquement', 'Export PDF pr\u00eat \u00e0 imprimer'],
    es: ['M\u00faltiples niveles de dificultad', 'Elementos visuales tem\u00e1ticos', 'Soluciones autogeneradas', 'Exportaci\u00f3n PDF lista para imprimir'],
    it: ['Livelli di difficolt\u00e0 multipli', 'Elementi visivi tematici', 'Soluzioni generate automaticamente', 'Esportazione PDF pronta per la stampa'],
    pt: ['M\u00faltiplos n\u00edveis de dificuldade', 'Elementos visuais tem\u00e1ticos', 'Solu\u00e7\u00f5es geradas automaticamente', 'Exporta\u00e7\u00e3o PDF pronta para impress\u00e3o'],
    nl: ['Meerdere moeilijkheidsniveaus', 'Thematische visuele elementen', 'Automatisch gegenereerde oplossingen', 'Printklare PDF-export'],
    da: ['Flere sv\u00e6rhedsgrader', 'Tematiske visuelle elementer', 'Automatisk genererede l\u00f8sninger', 'Printklart PDF-eksport'],
    sv: ['Flera sv\u00e5righetsgrader', 'Tematiska visuella element', 'Automatiskt genererade l\u00f6sningar', 'Utskriftsklar PDF-export'],
    no: ['Flere vanskelighetsgrader', 'Tematiske visuelle elementer', 'Automatisk genererte l\u00f8sninger', 'Utskriftsklar PDF-eksport'],
    fi: ['Useita vaikeustasoja', 'Temaattiset visuaaliset elementit', 'Automaattisesti luodut ratkaisut', 'Tulostuskelpoinen PDF-vienti'],
  },
  search: {
    en: ['Custom clue lists', 'Themed image clues', 'Auto-generated answer keys', 'Print-ready PDF export'],
    de: ['Eigene Hinweislisten', 'Thematische Bildhinweise', 'Automatische L\u00f6sungsschl\u00fcssel', 'Druckfertiger PDF-Export'],
    fr: ['Listes d\'indices personnalis\u00e9es', 'Indices illustr\u00e9s th\u00e9matiques', 'Corrig\u00e9s g\u00e9n\u00e9r\u00e9s automatiquement', 'Export PDF pr\u00eat \u00e0 imprimer'],
    es: ['Listas de pistas personalizadas', 'Pistas con im\u00e1genes tem\u00e1ticas', 'Claves de respuesta autogeneradas', 'Exportaci\u00f3n PDF lista para imprimir'],
    it: ['Elenchi di indizi personalizzati', 'Indizi illustrati tematici', 'Soluzioni generate automaticamente', 'Esportazione PDF pronta per la stampa'],
    pt: ['Listas de dicas personalizadas', 'Dicas com imagens tem\u00e1ticas', 'Gabaritos gerados automaticamente', 'Exporta\u00e7\u00e3o PDF pronta para impress\u00e3o'],
    nl: ['Aangepaste aanwijzingslijsten', 'Thematische beeldaanwijzingen', 'Automatisch gegenereerde antwoorden', 'Printklare PDF-export'],
    da: ['Brugerdefinerede sporsm\u00e5lslister', 'Tematiske billedspor', 'Automatisk genererede l\u00f8sninger', 'Printklart PDF-eksport'],
    sv: ['Anpassade ledtr\u00e5dslistor', 'Tematiska bildledtr\u00e5dar', 'Automatiskt genererade l\u00f6sningar', 'Utskriftsklar PDF-export'],
    no: ['Egendefinerte ledetr\u00e5dlister', 'Tematiske bildeledetr\u00e5der', 'Automatisk genererte l\u00f8sninger', 'Utskriftsklar PDF-eksport'],
    fi: ['Mukautetut vihjelistat', 'Temaattiset kuvavihjeet', 'Automaattisesti luodut vastaukset', 'Tulostuskelpoinen PDF-vienti'],
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

  const localizedName = getLocalizedAppName(wpAppId, locale);
  const localizedSuffix = getLocalizedSuffix(locale);
  const title = `${localizedName} ${localizedSuffix} | LessonCraftStudio`;

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
  const localizedName = getLocalizedAppName(wpAppId, locale);
  const localizedSuffix = getLocalizedSuffix(locale);
  const localizedCategoryName = getLocalizedCategoryName(category, locale);

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
        name: getLocalizedAppName(id, locale),
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
    name: `${localizedName} ${localizedSuffix}`,
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
                {localizedCategoryName}
              </div>

              {/* App Name */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {localizedName} {localizedSuffix}
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
              {localizedName} {localizedSuffix}
            </h2>
            <p className="text-indigo-100 mb-8 max-w-lg mx-auto">{ui.tryFreeDesc}</p>
            <TryFreeButton launchUrl={launchUrl} label={ui.tryFree} variant="light" />
          </div>
        </section>
      </div>
    </>
  );
}
