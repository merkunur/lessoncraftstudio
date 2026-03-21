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
import { ogLocaleMap, getHreflangCode, generateVideoSchema } from '@/lib/schema-generator';
import { ALL_APPS, APP_CATEGORIES, type AppId, type CategoryId } from '@/config/warriorplus-products';
import { getLocalizedAppName, getLocalizedCategoryName, getLocalizedSuffix } from '@/config/app-translations';
import Link from 'next/link';
import TryFreeButton from './TryFreeButton';
import { getAppContent, getCategoryAudience } from '@/config/app-content';
import type { AppContent } from '@/config/app-content';
import VideoFacade from './VideoFacade';
import ReadMoreText from '@/components/ReadMoreText';
import Breadcrumb from '@/components/Breadcrumb';
import { getSectionLabel } from '@/config/section-labels';
import { encodeImagePath } from '@/lib/encode-image-path';
import { isValidInternalLink } from '@/lib/resolve-internal-link';
import {
  WorksheetShowcaseSection,
  TieredShowcaseSection,
  SpotlightSection,
  GallerySection,
  getShowcaseConfig,
} from './showcase';

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
  startCreating: string;
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
    startCreating: 'Start Creating Now',
  },
  de: {
    tryFree: 'Kostenlos testen (mit Wasserzeichen)',
    tryFreeDesc: 'Keine Anmeldung erforderlich. Sofort Arbeitsblätter erstellen.',
    features: 'Funktionen',
    relatedApps: 'Verwandte Generatoren',
    viewAll: 'Alle Generatoren anzeigen',
    howItWorks: 'So funktioniert es',
    step1Title: 'Erstellen',
    step1Desc: 'Thema wählen, Einstellungen anpassen und Arbeitsblatt generieren.',
    step2Title: 'PDF exportieren',
    step2Desc: 'Professionelles PDF zum Drucken oder digitalen Gebrauch herunterladen.',
    step3Title: 'Verkaufen oder Nutzen',
    step3Desc: 'Auf Etsy, Amazon KDP, TPT verkaufen oder im Unterricht verwenden.',
    noSignup: 'Keine Anmeldung nötig',
    languages: '11 Sprachen unterstützt',
    pdfExport: 'Sofortiger PDF-Export',
    watermarkNote: 'Kostenlose Version enthält ein kleines Wasserzeichen. Kaufen Sie die Vollversion, um es zu entfernen.',
    startCreating: 'Jetzt loslegen',
  },
  fr: {
    tryFree: 'Essayer gratuitement (avec filigrane)',
    tryFreeDesc: 'Aucune inscription requise. Créez des fiches instantanément.',
    features: 'Fonctionnalités',
    relatedApps: 'Générateurs similaires',
    viewAll: 'Voir tous les générateurs',
    howItWorks: 'Comment ça marche',
    step1Title: 'Créer',
    step1Desc: 'Choisissez un thème, personnalisez les paramètres et générez votre fiche.',
    step2Title: 'Exporter en PDF',
    step2Desc: 'Téléchargez un PDF professionnel prêt à imprimer.',
    step3Title: 'Vendre ou Utiliser',
    step3Desc: 'Vendez sur Etsy, Amazon KDP, TPT ou utilisez en classe.',
    noSignup: 'Aucune inscription',
    languages: '11 langues disponibles',
    pdfExport: 'Export PDF instantané',
    watermarkNote: 'La version gratuite inclut un filigrane. Achetez pour le supprimer.',
    startCreating: 'Commencez maintenant',
  },
  es: {
    tryFree: 'Probar gratis (con marca de agua)',
    tryFreeDesc: 'Sin registro. Cree fichas al instante.',
    features: 'Características',
    relatedApps: 'Generadores relacionados',
    viewAll: 'Ver todos los generadores',
    howItWorks: 'Cómo funciona',
    step1Title: 'Crear',
    step1Desc: 'Elija un tema, personalice la configuración y genere su ficha.',
    step2Title: 'Exportar PDF',
    step2Desc: 'Descargue un PDF profesional listo para imprimir.',
    step3Title: 'Vender o Usar',
    step3Desc: 'Venda en Etsy, Amazon KDP, TPT o use en el aula.',
    noSignup: 'Sin registro',
    languages: '11 idiomas disponibles',
    pdfExport: 'Exportación PDF instantánea',
    watermarkNote: 'La versión gratuita incluye una marca de agua. Compre para eliminarla.',
    startCreating: 'Empieza a crear ahora',
  },
  pt: {
    tryFree: "Experimentar grátis (com marca d\u2019água)",
    tryFreeDesc: 'Sem cadastro. Crie atividades na hora.',
    features: 'Recursos',
    relatedApps: 'Geradores relacionados',
    viewAll: 'Ver todos os geradores',
    howItWorks: 'Como funciona',
    step1Title: 'Criar',
    step1Desc: 'Escolha um tema, personalize as configurações e gere sua atividade.',
    step2Title: 'Exportar PDF',
    step2Desc: 'Baixe um PDF profissional pronto para impressão.',
    step3Title: 'Vender ou Usar',
    step3Desc: 'Venda no Etsy, Amazon KDP, TPT ou use em sala de aula.',
    noSignup: 'Sem cadastro',
    languages: '11 idiomas disponíveis',
    pdfExport: 'Exportação PDF instantânea',
    watermarkNote: "A versão gratuita inclui marca d\u2019água. Compre para removê-la.",
    startCreating: 'Comece a criar agora',
  },
  it: {
    tryFree: 'Prova gratis (con filigrana)',
    tryFreeDesc: "Nessuna registrazione. Crea schede all'istante.",
    features: 'Funzionalità',
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
    startCreating: 'Inizia a creare ora',
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
    startCreating: 'Begin nu met maken',
  },
  sv: {
    tryFree: 'Testa gratis (med vattenstämpel)',
    tryFreeDesc: 'Ingen registrering krävs. Skapa arbetsblad direkt.',
    features: 'Funktioner',
    relatedApps: 'Relaterade generatorer',
    viewAll: 'Visa alla generatorer',
    howItWorks: 'Hur det fungerar',
    step1Title: 'Skapa',
    step1Desc: 'Välj tema, anpassa inställningar och generera ditt arbetsblad.',
    step2Title: 'Exportera PDF',
    step2Desc: 'Ladda ner en professionell PDF färdig att skriva ut.',
    step3Title: 'Sälj eller Använd',
    step3Desc: 'Sälj på Etsy, Amazon KDP, TPT eller använd i klassrummet.',
    noSignup: 'Ingen registrering',
    languages: '11 språk stöds',
    pdfExport: 'Direkt PDF-export',
    watermarkNote: 'Gratisversionen innehåller en vattenstämpel. Köp för att ta bort den.',
    startCreating: 'Börja skapa nu',
  },
  da: {
    tryFree: 'Prøv gratis (med vandmærke)',
    tryFreeDesc: 'Ingen tilmelding nødvendig. Opret arbejdsark med det samme.',
    features: 'Funktioner',
    relatedApps: 'Relaterede generatorer',
    viewAll: 'Se alle generatorer',
    howItWorks: 'Sådan fungerer det',
    step1Title: 'Opret',
    step1Desc: 'Vælg et tema, tilpas indstillinger og generer dit arbejdsark.',
    step2Title: 'Eksporter PDF',
    step2Desc: 'Download en professionel PDF klar til udskrivning.',
    step3Title: 'Sælg eller Brug',
    step3Desc: 'Sælg på Etsy, Amazon KDP, TPT eller brug i klasselokalet.',
    noSignup: 'Ingen tilmelding',
    languages: '11 sprog understøttet',
    pdfExport: 'Øjeblikkelig PDF-eksport',
    watermarkNote: 'Gratisversionen indeholder et vandmærke. Køb for at fjerne det.',
    startCreating: 'Begynd at skabe nu',
  },
  no: {
    tryFree: 'Prøv gratis (med vannmerke)',
    tryFreeDesc: 'Ingen registrering nødvendig. Lag arbeidsark med en gang.',
    features: 'Funksjoner',
    relatedApps: 'Relaterte generatorer',
    viewAll: 'Se alle generatorer',
    howItWorks: 'Slik fungerer det',
    step1Title: 'Lag',
    step1Desc: 'Velg tema, tilpass innstillinger og generer arbeidsarket ditt.',
    step2Title: 'Eksporter PDF',
    step2Desc: 'Last ned en profesjonell PDF klar til utskrift.',
    step3Title: 'Selg eller Bruk',
    step3Desc: 'Selg på Etsy, Amazon KDP, TPT eller bruk i klasserommet.',
    noSignup: 'Ingen registrering',
    languages: '11 språk støttet',
    pdfExport: 'Umiddelbar PDF-eksport',
    watermarkNote: 'Gratisversjonen inkluderer et vannmerke. Kjøp for å fjerne det.',
    startCreating: 'Begynn å lage nå',
  },
  fi: {
    tryFree: 'Kokeile ilmaiseksi (vesileimalla)',
    tryFreeDesc: 'Ei rekisteröintiä. Luo työarkkeja heti.',
    features: 'Ominaisuudet',
    relatedApps: 'Samankaltaiset generaattorit',
    viewAll: 'Näytä kaikki generaattorit',
    howItWorks: 'Näin se toimii',
    step1Title: 'Luo',
    step1Desc: 'Valitse teema, muokkaa asetuksia ja luo työarkkisi.',
    step2Title: 'Vie PDF',
    step2Desc: 'Lataa ammattimainen PDF valmiina tulostettavaksi.',
    step3Title: 'Myy tai Käytä',
    step3Desc: 'Myy Etsyssä, Amazon KDP:ssä, TPT:ssä tai käytä luokkahuoneessa.',
    noSignup: 'Ei rekisteröintiä',
    languages: '11 kieltä tuettu',
    pdfExport: 'Välitön PDF-vienti',
    watermarkNote: 'Ilmaisversio sisältää vesileiman. Osta poistaaksesi sen.',
    startCreating: 'Aloita luominen nyt',
  },
};

// ── Localized app descriptions (keyed by WP appId) ──
const appDescriptions: Record<string, Record<string, string>> = {
  addition: {
    en: 'Create professional addition worksheets with themed images. Perfect for kindergarten through second grade.',
    de: 'Erstellen Sie professionelle Additions-Arbeitsblätter mit thematischen Bildern.',
    fr: "Créez des fiches d'addition professionnelles avec des images thématiques.",
    es: 'Cree fichas de suma profesionales con imágenes temáticas.',
    pt: 'Crie atividades de adição profissionais com imagens temáticas.',
    it: 'Crea schede di addizione professionali con immagini tematiche.',
    nl: 'Maak professionele optelwerkbladen met thematische afbeeldingen.',
    sv: 'Skapa professionella additions-arbetsblad med tematiska bilder.',
    da: 'Opret professionelle additions-arbejdsark med tematiske billeder.',
    no: 'Lag profesjonelle addisjons-arbeidsark med tematiske bilder.',
    fi: 'Luo ammattimaisia yhteenlasku-työarkkeja temaattisilla kuvilla.',
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
    de: 'Erstellen Sie professionelle Wortsuch-Rätsel mit eigenen Wörterlisten.',
    fr: 'Créez des mots cachés professionnels avec des listes de mots personnalisées.',
    es: 'Cree sopas de letras profesionales con listas de palabras personalizadas.',
    pt: 'Crie caça-palavras profissionais com listas de palavras personalizadas.',
    it: 'Crea crucipuzzle professionali con elenchi di parole personalizzati.',
    nl: 'Maak professionele woordzoekers met aangepaste woordlijsten.',
    sv: 'Skapa professionella ordjaktar med anpassade ordlistor.',
    da: 'Opret professionelle ordsøgninger med brugerdefinerede ordlister.',
    no: 'Lag profesjonelle ordsøk med egendefinerte ordlister.',
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
    fr: 'Créez des pages de coloriage professionnelles avec 3 000+ images thématiques.',
    es: 'Cree páginas para colorear profesionales con 3.000+ imágenes temáticas.',
    pt: 'Crie páginas para colorir profissionais com 3.000+ imagens temáticas.',
    it: 'Crea pagine da colorare professionali con 3.000+ immagini tematiche.',
    nl: 'Maak professionele kleurplaten met 3.000+ thematische afbeeldingen.',
    sv: 'Skapa professionella målarbilder med 3 000+ tematiska bilder.',
    da: 'Opret professionelle malebogssider med 3.000+ tematiske billeder.',
    no: 'Lag profesjonelle fargeleggingsbilder med 3 000+ tematiske bilder.',
    fi: 'Luo ammattimaisia värityskuvia 3 000+ temaattisella kuvalla.',
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
    de: ['Anpassbare Schwierigkeitsstufen', 'Thematische Bilder aus 100+ Themen', 'Automatische Lösungsschlüssel', 'Druckfertiger PDF-Export'],
    fr: ['Niveaux de difficulté personnalisables', 'Images thématiques de 100+ thèmes', 'Corrigés générés automatiquement', 'Export PDF prêt à imprimer'],
    es: ['Niveles de dificultad personalizables', 'Imágenes temáticas de 100+ temas', 'Claves de respuesta autogeneradas', 'Exportación PDF lista para imprimir'],
    it: ['Livelli di difficoltà personalizzabili', 'Immagini tematiche da 100+ temi', 'Soluzioni generate automaticamente', 'Esportazione PDF pronta per la stampa'],
    pt: ['Níveis de dificuldade personalizáveis', 'Imagens temáticas de 100+ temas', 'Gabaritos gerados automaticamente', 'Exportação PDF pronta para impressão'],
    nl: ['Aanpasbare moeilijkheidsniveaus', 'Thematische afbeeldingen uit 100+ thema\'s', 'Automatisch gegenereerde antwoorden', 'Printklare PDF-export'],
    da: ['Tilpasselige sværhedsgrader', 'Tematiske billeder fra 100+ temaer', 'Automatisk genererede løsninger', 'Printklart PDF-eksport'],
    sv: ['Anpassningsbara svårighetsgrader', 'Tematiska bilder från 100+ teman', 'Automatiskt genererade lösningar', 'Utskriftsklar PDF-export'],
    no: ['Tilpassbare vanskelighetsgrader', 'Tematiske bilder fra 100+ temaer', 'Automatisk genererte løsninger', 'Utskriftsklar PDF-eksport'],
    fi: ['Säädettävät vaikeustasot', 'Temaattiset kuvat 100+ teemasta', 'Automaattisesti luodut vastaukset', 'Tulostuskelpoinen PDF-vienti'],
  },
  literacy: {
    en: ['Custom word lists and vocabulary', 'Multi-language word support', 'Auto-generated answer keys', 'Print-ready PDF export'],
    de: ['Eigene Wortlisten und Vokabeln', 'Mehrsprachige Wortunterstützung', 'Automatische Lösungsschlüssel', 'Druckfertiger PDF-Export'],
    fr: ['Listes de mots personnalisées', 'Support multilingue', 'Corrigés générés automatiquement', 'Export PDF prêt à imprimer'],
    es: ['Listas de palabras personalizadas', 'Soporte de palabras multilingüe', 'Claves de respuesta autogeneradas', 'Exportación PDF lista para imprimir'],
    it: ['Elenchi di parole personalizzati', 'Supporto multilingue', 'Soluzioni generate automaticamente', 'Esportazione PDF pronta per la stampa'],
    pt: ['Listas de palavras personalizadas', 'Suporte multilíngue', 'Gabaritos gerados automaticamente', 'Exportação PDF pronta para impressão'],
    nl: ['Aangepaste woordlijsten', 'Meertalige woordondersteuning', 'Automatisch gegenereerde antwoorden', 'Printklare PDF-export'],
    da: ['Brugerdefinerede ordlister', 'Flersproget ordunderstøttelse', 'Automatisk genererede løsninger', 'Printklart PDF-eksport'],
    sv: ['Anpassade ordlistor', 'Flerspråkigt ordstöd', 'Automatiskt genererade lösningar', 'Utskriftsklar PDF-export'],
    no: ['Egendefinerte ordlister', 'Flerspråklig ordstøtte', 'Automatisk genererte løsninger', 'Utskriftsklar PDF-eksport'],
    fi: ['Mukautetut sanalistat', 'Monikielinen sanatuki', 'Automaattisesti luodut vastaukset', 'Tulostuskelpoinen PDF-vienti'],
  },
  visual: {
    en: ['3,000+ themed images', 'Customizable layouts and sizes', 'Professional print quality', 'Instant PDF download'],
    de: ['3.000+ thematische Bilder', 'Anpassbare Layouts und Größen', 'Professionelle Druckqualität', 'Sofortiger PDF-Download'],
    fr: ['3 000+ images thématiques', 'Mises en page et tailles personnalisables', 'Qualité d\'impression professionnelle', 'Téléchargement PDF instantané'],
    es: ['3.000+ imágenes temáticas', 'Diseños y tamaños personalizables', 'Calidad de impresión profesional', 'Descarga PDF instantánea'],
    it: ['3.000+ immagini tematiche', 'Layout e dimensioni personalizzabili', 'Qualità di stampa professionale', 'Download PDF istantaneo'],
    pt: ['3.000+ imagens temáticas', 'Layouts e tamanhos personalizáveis', 'Qualidade de impressão profissional', 'Download PDF instantâneo'],
    nl: ['3.000+ thematische afbeeldingen', 'Aanpasbare lay-outs en formaten', 'Professionele afdrukkwaliteit', 'Directe PDF-download'],
    da: ['3.000+ tematiske billeder', 'Tilpasselige layouts og størrelser', 'Professionel udskriftskvalitet', 'Øjeblikkelig PDF-download'],
    sv: ['3 000+ tematiska bilder', 'Anpassningsbara layouter och storlekar', 'Professionell utskriftskvalitet', 'Omedelbar PDF-nedladdning'],
    no: ['3 000+ tematiske bilder', 'Tilpassbare layouter og størrelser', 'Profesjonell utskriftskvalitet', 'Umiddelbar PDF-nedlasting'],
    fi: ['3 000+ temaattista kuvaa', 'Muokattavat asettelut ja koot', 'Ammattimainen tulostuslaatu', 'Välitön PDF-lataus'],
  },
  matching: {
    en: ['Themed image pairs', 'Adjustable grid sizes', 'Auto-generated answer keys', 'Print-ready PDF export'],
    de: ['Thematische Bilderpaare', 'Einstellbare Rastergrößen', 'Automatische Lösungsschlüssel', 'Druckfertiger PDF-Export'],
    fr: ['Paires d\'images thématiques', 'Tailles de grille ajustables', 'Corrigés générés automatiquement', 'Export PDF prêt à imprimer'],
    es: ['Parejas de imágenes temáticas', 'Tamaños de cuadrícula ajustables', 'Claves de respuesta autogeneradas', 'Exportación PDF lista para imprimir'],
    it: ['Coppie di immagini tematiche', 'Dimensioni della griglia regolabili', 'Soluzioni generate automaticamente', 'Esportazione PDF pronta per la stampa'],
    pt: ['Pares de imagens temáticas', 'Tamanhos de grade ajustáveis', 'Gabaritos gerados automaticamente', 'Exportação PDF pronta para impressão'],
    nl: ['Thematische afbeeldingsparen', 'Aanpasbare rastergroottes', 'Automatisch gegenereerde antwoorden', 'Printklare PDF-export'],
    da: ['Tematiske billedpar', 'Justerbare gitterstørrelser', 'Automatisk genererede løsninger', 'Printklart PDF-eksport'],
    sv: ['Tematiska bildpar', 'Justerbara rutnätsstorlekar', 'Automatiskt genererade lösningar', 'Utskriftsklar PDF-export'],
    no: ['Tematiske bildepar', 'Justerbare rutenettestørrelser', 'Automatisk genererte løsninger', 'Utskriftsklar PDF-eksport'],
    fi: ['Temaattiset kuvaparit', 'Säädettävät ruudukkokoot', 'Automaattisesti luodut vastaukset', 'Tulostuskelpoinen PDF-vienti'],
  },
  puzzle: {
    en: ['Multiple difficulty levels', 'Themed visual elements', 'Auto-generated solutions', 'Print-ready PDF export'],
    de: ['Mehrere Schwierigkeitsstufen', 'Thematische visuelle Elemente', 'Automatisch generierte Lösungen', 'Druckfertiger PDF-Export'],
    fr: ['Plusieurs niveaux de difficulté', 'Éléments visuels thématiques', 'Solutions générées automatiquement', 'Export PDF prêt à imprimer'],
    es: ['Múltiples niveles de dificultad', 'Elementos visuales temáticos', 'Soluciones autogeneradas', 'Exportación PDF lista para imprimir'],
    it: ['Livelli di difficoltà multipli', 'Elementi visivi tematici', 'Soluzioni generate automaticamente', 'Esportazione PDF pronta per la stampa'],
    pt: ['Múltiplos níveis de dificuldade', 'Elementos visuais temáticos', 'Soluções geradas automaticamente', 'Exportação PDF pronta para impressão'],
    nl: ['Meerdere moeilijkheidsniveaus', 'Thematische visuele elementen', 'Automatisch gegenereerde oplossingen', 'Printklare PDF-export'],
    da: ['Flere sværhedsgrader', 'Tematiske visuelle elementer', 'Automatisk genererede løsninger', 'Printklart PDF-eksport'],
    sv: ['Flera svårighetsgrader', 'Tematiska visuella element', 'Automatiskt genererade lösningar', 'Utskriftsklar PDF-export'],
    no: ['Flere vanskelighetsgrader', 'Tematiske visuelle elementer', 'Automatisk genererte løsninger', 'Utskriftsklar PDF-eksport'],
    fi: ['Useita vaikeustasoja', 'Temaattiset visuaaliset elementit', 'Automaattisesti luodut ratkaisut', 'Tulostuskelpoinen PDF-vienti'],
  },
  search: {
    en: ['Custom clue lists', 'Themed image clues', 'Auto-generated answer keys', 'Print-ready PDF export'],
    de: ['Eigene Hinweislisten', 'Thematische Bildhinweise', 'Automatische Lösungsschlüssel', 'Druckfertiger PDF-Export'],
    fr: ['Listes d\'indices personnalisées', 'Indices illustrés thématiques', 'Corrigés générés automatiquement', 'Export PDF prêt à imprimer'],
    es: ['Listas de pistas personalizadas', 'Pistas con imágenes temáticas', 'Claves de respuesta autogeneradas', 'Exportación PDF lista para imprimir'],
    it: ['Elenchi di indizi personalizzati', 'Indizi illustrati tematici', 'Soluzioni generate automaticamente', 'Esportazione PDF pronta per la stampa'],
    pt: ['Listas de dicas personalizadas', 'Dicas com imagens temáticas', 'Gabaritos gerados automaticamente', 'Exportação PDF pronta para impressão'],
    nl: ['Aangepaste aanwijzingslijsten', 'Thematische beeldaanwijzingen', 'Automatisch gegenereerde antwoorden', 'Printklare PDF-export'],
    da: ['Brugerdefinerede sporsmålslister', 'Tematiske billedspor', 'Automatisk genererede løsninger', 'Printklart PDF-eksport'],
    sv: ['Anpassade ledtrådslistor', 'Tematiska bildledtrådar', 'Automatiskt genererade lösningar', 'Utskriftsklar PDF-export'],
    no: ['Egendefinerte ledetrådlister', 'Tematiske bildeledetråder', 'Automatisk genererte løsninger', 'Utskriftsklar PDF-eksport'],
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
  try {
    const locale = params.locale as SupportedLocale;
    const slug = params.slug;
    const baseUrl = 'https://www.lessoncraftstudio.com';

    const appConfig = getAppConfigBySlug(slug);
    if (!appConfig) return {};

    const wpAppId = getWpAppId(appConfig.appId);
    if (!wpAppId) return {};

    const appData = ALL_APPS[wpAppId];
    if (!appData) return {};

    const desc = appDescriptions[wpAppId]?.[locale] || appDescriptions[wpAppId]?.en || '';
    const alternateUrls = getAlternateUrls(appConfig.appId, baseUrl);
    const localeSlug = getSlugForLocale(appConfig.appId, locale);

    const localizedName = getLocalizedAppName(wpAppId, locale);
    const localizedSuffix = getLocalizedSuffix(locale);

    // Use enriched SEO if content file exists
    const content = await getAppContent(wpAppId, locale);
    const title = content?.seo?.titleTag || `${localizedName} ${localizedSuffix} | LessonCraftStudio`;
    const description = content?.seo?.metaDescription || desc;

    // Combine all keywords from content SEO
    const keywords = content?.seo?.primaryKeyword
      ? [content.seo.primaryKeyword, ...(content.seo.secondaryKeywords || []), ...(content.seo.lsiKeywords || [])]
      : undefined;

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: `${baseUrl}/${locale}/apps/${localeSlug || slug}`,
        languages: alternateUrls,
      },
      openGraph: {
        title,
        description,
        type: 'website',
        url: `${baseUrl}/${locale}/apps/${localeSlug || slug}`,
        siteName: 'LessonCraftStudio',
        locale: ogLocaleMap[locale] || locale,
        alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
        images: [
          { url: `${baseUrl}/api/og?app=${wpAppId}&locale=${locale}&type=app&title=${encodeURIComponent(title)}`, width: 1200, height: 630, alt: title },
          ...(content?.visuals?.sampleGallery?.slice(0, 3).map((img: { src: string; alt: string }) => ({
            url: `${baseUrl}${encodeImagePath(img.src)}`,
            width: 400,
            height: 566,
            alt: img.alt,
          })) || []),
        ],
        videos: content?.visuals?.youtubeId ? [{ url: `https://www.youtube.com/watch?v=${content.visuals.youtubeId}`, type: 'text/html', width: 1280, height: 720 }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [`${baseUrl}/api/og?app=${wpAppId}&locale=${locale}&type=app&title=${encodeURIComponent(title)}`],
      },
    };
  } catch {
    return {};
  }
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
  if (!appData) notFound();
  const category = appData.category as CategoryId;
  const categoryData = APP_CATEGORIES[category];
  const ui = uiStrings[locale] || uiStrings.en;
  const desc = appDescriptions[wpAppId]?.[locale] || appDescriptions[wpAppId]?.en || '';
  const features = categoryFeatures[category]?.[locale] || categoryFeatures[category]?.en || [];
  const localizedName = getLocalizedAppName(wpAppId, locale);
  const localizedSuffix = getLocalizedSuffix(locale);
  const localizedCategoryName = getLocalizedCategoryName(category, locale);

  // Fetch enriched content (null if no content file exists)
  const content = await getAppContent(wpAppId, locale);
  const audience = getCategoryAudience(category, locale);

  // Visual showcase sections — EN + DE, config-driven per app
  const showcaseConfig = (locale === 'en' || locale === 'de' || locale === 'fr' || locale === 'es' || locale === 'pt' || locale === 'it') ? getShowcaseConfig(wpAppId, locale) : null;

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
  const baseUrl = 'https://www.lessoncraftstudio.com';

  // Build image + screenshot from showcase config
  const heroImages = showcaseConfig?.hero?.images;
  const schemaImage = heroImages?.[0]?.src
    ? `${baseUrl}${encodeImagePath(heroImages[0].src)}`
    : `${baseUrl}/opengraph-image.png`;
  const schemaScreenshots = heroImages?.slice(0, 3)
    .filter(img => img.src)
    .map(img => ({
      '@type': 'ImageObject',
      url: `${baseUrl}${encodeImagePath(img.src)}`,
      caption: img.alt,
      width: 400,
      height: 566,
      encodingFormat: 'image/webp',
    }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${localizedName} ${localizedSuffix}`,
    description: desc,
    url: pageUrl,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    image: schemaImage,
    ...(schemaScreenshots?.length && { screenshot: schemaScreenshots }),
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

  // FAQPage JSON-LD (only when enriched content exists)
  const faqJsonLd = content?.faq?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  } : null;

  // BreadcrumbList JSON-LD
  const localizedHomeLabel: Record<string, string> = { en: 'Home', de: 'Startseite', fr: 'Accueil', es: 'Inicio', pt: 'Início', it: 'Home', nl: 'Home', sv: 'Hem', da: 'Hjem', no: 'Hjem', fi: 'Koti' };
  const localizedAppsLabel: Record<string, string> = { en: 'Apps', de: 'Apps', fr: 'Applications', es: 'Aplicaciones', pt: 'Aplicativos', it: 'App', nl: 'Apps', sv: 'Appar', da: 'Apps', no: 'Apper', fi: 'Sovellukset' };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: localizedHomeLabel[locale] || 'Home', item: `https://www.lessoncraftstudio.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: localizedAppsLabel[locale] || 'Apps', item: `https://www.lessoncraftstudio.com/${locale}/apps` },
      { '@type': 'ListItem', position: 3, name: localizedName },
    ],
  };

  // HowTo JSON-LD (from howItWorks steps)
  const howToJsonLd = content?.howItWorks?.steps?.length ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: content.howItWorks.title,
    step: content.howItWorks.steps.map((s: { title: string; description: string }, i: number) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  } : null;

  // ── Enriched layout (when content file exists) ──
  if (content) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {howToJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
          />
        )}
        {/* ImageObject schema with license markup (Google Licensable badge) */}
        {content.visuals.sampleGallery.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(
              content.visuals.sampleGallery.slice(0, 6).map(img => ({
                '@context': 'https://schema.org',
                '@type': 'ImageObject',
                contentUrl: `${baseUrl}${encodeImagePath(img.src)}`,
                name: img.alt,
                caption: img.caption || img.alt,
                encodingFormat: 'image/webp',
                width: 400,
                height: 566,
                license: `${baseUrl}/${locale}/license`,
                acquireLicensePage: pageUrl,
                creditText: 'LessonCraftStudio',
                creator: { '@type': 'Organization', name: 'LessonCraftStudio' },
                copyrightHolder: { '@type': 'Organization', name: 'LessonCraftStudio' },
                copyrightNotice: '© LessonCraftStudio',
              }))
            ) }}
          />
        )}
        {content.visuals.youtubeId && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(generateVideoSchema({
              name: content.visuals.videoTitle || `${localizedName} ${localizedSuffix}`,
              description: desc,
              youtubeId: content.visuals.youtubeId,
            })) }}
          />
        )}

        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <section className="bg-white border-b">
            <div className="container mx-auto px-4 py-12 md:py-16">
              <div className="max-w-4xl mx-auto">
                <Breadcrumb items={[
                  { label: localizedHomeLabel[locale] || 'Home', href: `/${locale}` },
                  { label: localizedAppsLabel[locale] || 'Apps', href: `/${locale}/apps` },
                  { label: localizedName },
                ]} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: `${categoryData.color}15`, color: categoryData.color }}>
                      <CategoryIcon category={category} />
                      {localizedCategoryName}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                      {content.hero.title}
                    </h1>
                    <p className="text-lg font-medium text-indigo-600 mb-4">{content.hero.tagline}</p>
                    <ReadMoreText text={content.hero.description} locale={locale} className="text-gray-600 mb-6" lines={10} />
                    <TryFreeButton launchUrl={launchUrl} label={ui.tryFree} />
                    <p className="mt-3 text-sm text-gray-500">{ui.tryFreeDesc}</p>
                    <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-500">
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
                  <div>
                    {content.visuals.youtubeId ? (
                      <VideoFacade videoId={content.visuals.youtubeId} title={content.visuals.videoTitle} />
                    ) : content.visuals.heroImages.primary ? (
                      <div className="rounded-xl overflow-hidden shadow-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={encodeImagePath(content.visuals.heroImages.primary)}
                          alt={content.visuals.heroImages.primaryAlt}
                          width={800}
                          height={1132}
                          className="w-full h-auto"
                          loading="eager"
                          decoding="async"
                          fetchPriority="high"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Visual Showcase: Worksheet Showcase (after Hero) */}
          {showcaseConfig && <WorksheetShowcaseSection config={showcaseConfig.hero} />}

          {/* How It Works (enriched — 5 steps) */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">{content.howItWorks.title}</h2>
              <div className="max-w-3xl mx-auto space-y-6">
                {content.howItWorks.steps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                      <ReadMoreText text={step.description} locale={locale} className="text-gray-600 text-sm" lines={8} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Visual Showcase: Tiered Showcase (after How It Works) */}
          {showcaseConfig && <TieredShowcaseSection config={showcaseConfig.tiered} />}

          {/* Key Features (enriched — 8 feature cards) */}
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">{content.keyFeatures.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {content.keyFeatures.features.map((feat, i) => (
                  <div key={i} className="p-5 rounded-lg border border-gray-100 bg-gray-50">
                    <h3 className="font-semibold text-gray-900 mb-2">{feat.title}</h3>
                    <ReadMoreText text={feat.description} locale={locale} className="text-gray-600 text-sm leading-relaxed" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Visual Showcase: Spotlight (after Key Features) */}
          {showcaseConfig && <SpotlightSection config={showcaseConfig.spotlight} />}

          {/* Business Use Cases */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">{content.businessUseCases.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {content.businessUseCases.cases.map((uc, i) => (
                  <div key={i} className="p-5 rounded-lg bg-white border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">{uc.title}</h3>
                    {uc.platform && (
                      <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-indigo-50 text-indigo-600 mb-2">{uc.platform}</span>
                    )}
                    <ReadMoreText text={uc.description} locale={locale} className="text-gray-600 text-sm leading-relaxed" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Visual Showcase: Gallery (after Business Use Cases) */}
          {showcaseConfig && <GallerySection config={showcaseConfig.gallery} />}

          {/* Who Is This For */}
          {audience.length > 0 && (
            <section className="py-12 md:py-16 bg-white">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">{getSectionLabel('whoIsThisFor', locale)}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {audience.map((seg, i) => (
                    <div key={i} className="p-5 rounded-lg border border-gray-100 bg-gray-50">
                      <h3 className="font-semibold text-gray-900 mb-2">{seg.persona}</h3>
                      <ReadMoreText text={seg.description} locale={locale} className="text-gray-600 text-sm leading-relaxed" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Sample Gallery */}
          {content.visuals.sampleGallery.length > 0 && (
            <section className="py-12 md:py-16">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">{getSectionLabel('sampleWorksheets', locale)}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto" role="group" aria-label={getSectionLabel('sampleWorksheets', locale)}>
                  {content.visuals.sampleGallery.map((img, i) => (
                    <figure key={i} className="rounded-lg overflow-hidden shadow-sm border border-gray-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={encodeImagePath(img.src)} alt={img.alt} width={400} height={566} className="w-full h-auto" loading="lazy" decoding="async" />
                      {img.caption && (
                        <figcaption className="text-xs text-gray-500 p-2 text-center">{img.caption}</figcaption>
                      )}
                    </figure>
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

          {/* FAQ */}
          {content.faq.length > 0 && (
            <section className="py-12 md:py-16 bg-white">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">{getSectionLabel('faq', locale)}</h2>
                <div className="max-w-3xl mx-auto space-y-4">
                  {content.faq.map((item, i) => (
                    <details key={i} className="group border border-gray-200 rounded-lg">
                      <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
                        {item.question}
                        <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-4 pb-4">
                        <ReadMoreText text={item.answer} locale={locale} className="text-gray-600 text-sm leading-relaxed" lines={8} />
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Internal Links */}
          {content.internalLinks.length > 0 && (
            <section className="py-12 md:py-16">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">{getSectionLabel('exploreMore', locale)}</h2>
                <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                  {content.internalLinks.filter(link => isValidInternalLink(link.pageType, link.slug)).map((link, i) => {
                    const prefix = link.pageType === 'app' ? 'apps'
                      : link.pageType === 'tool' ? 'tools'
                      : link.pageType === 'bundle' ? 'bundles'
                      : link.pageType === 'start' ? 'start'
                      : link.pageType === 'guide' ? 'guides'
                      : 'ideas';
                    return (
                      <Link
                        key={i}
                        href={`/${locale}/${prefix}/${link.slug}`}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                      >
                        {link.anchorText}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Related Apps */}
          {relatedApps.length > 0 && (
            <section className="py-12 md:py-16 bg-white">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">{ui.relatedApps}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
                  {relatedApps.map(app => (
                    <Link
                      key={app.id}
                      href={`/${locale}/apps/${app.slug}`}
                      className="flex flex-col items-center p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all text-center"
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
                {content.hero.title}
              </h2>
              <p className="text-indigo-100 mb-8 max-w-lg mx-auto">{content.hero.tagline}</p>
              <TryFreeButton launchUrl={launchUrl} label={ui.tryFree} variant="light" />
            </div>
          </section>
        </div>
      </>
    );
  }

  // ── Thin fallback layout (no content file) ──
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
              {ui.startCreating || 'Start Creating Now'}
            </h2>
            <p className="text-indigo-100 mb-8 max-w-lg mx-auto">{ui.tryFreeDesc}</p>
            <TryFreeButton launchUrl={launchUrl} label={ui.tryFree} variant="light" />
          </div>
        </section>
      </div>
    </>
  );
}
