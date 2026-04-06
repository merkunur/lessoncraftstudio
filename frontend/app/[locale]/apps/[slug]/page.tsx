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
import { ogLocaleMap, getHreflangCode, generateVideoSchema, generateShowcaseImageSchemas } from '@/lib/schema-generator';
import { getAppFallbackDescription } from '@/lib/localized-meta-fallback';
import { ALL_APPS, APP_CATEGORIES, type AppId, type CategoryId } from '@/config/products';
import BuyButton from '@/components/BuyButton';
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
    step3Desc: 'Sell on Etsy, Amazon KDP, TPT, or use for personal projects.',
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
    step3Desc: 'Auf Etsy, Amazon KDP, TPT verkaufen oder fuer eigene Projekte nutzen.',
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
    step3Desc: 'Vendez sur Etsy, Amazon KDP, TPT ou utilisez pour vos projets personnels.',
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
    step3Desc: 'Venda en Etsy, Amazon KDP, TPT o use para proyectos personales.',
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
    step3Desc: 'Venda no Etsy, Amazon KDP, TPT ou use para projetos pessoais.',
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
    step3Desc: 'Vendi su Etsy, Amazon KDP, TPT o usa per i tuoi progetti.',
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
    step3Desc: 'Verkoop op Etsy, Amazon KDP, TPT of gebruik voor eigen projecten.',
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
    step3Desc: 'Sälj på Etsy, Amazon KDP, TPT eller använd för egna projekt.',
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
    step3Desc: 'Sælg på Etsy, Amazon KDP, TPT eller brug til egne projekter.',
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
    step3Desc: 'Selg på Etsy, Amazon KDP, TPT eller bruk til egne prosjekter.',
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
    step3Desc: 'Myy Etsyssä, Amazon KDP:ssä, TPT:ssä tai käytä omiin projekteihin.',
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
    en: 'Create professional addition worksheets with themed images to sell on Etsy and Amazon KDP. Commercial license included.',
    de: 'Professionelle Additions-Arbeitsblätter mit thematischen Bildern erstellen und auf Etsy & KDP verkaufen. Kommerzielle Lizenz.',
    fr: 'Créez des fiches d\'addition professionnelles avec images thématiques à vendre sur Etsy & KDP. Licence commerciale.',
    es: 'Crea fichas de suma profesionales con imágenes temáticas para vender en Etsy & KDP. Licencia comercial incluida.',
    pt: 'Crie atividades de adição profissionais com imagens temáticas para vender no Etsy & KDP. Licença comercial.',
    it: 'Crea schede di addizione professionali con immagini tematiche da vendere su Etsy & KDP. Licenza commerciale.',
    nl: 'Maak professionele optelwerkbladen met thematische afbeeldingen om te verkopen op Etsy & KDP. Commerciële licentie.',
    sv: 'Skapa professionella additions-arbetsblad med tematiska bilder att sälja på Etsy & KDP. Kommersiell licens.',
    da: 'Opret professionelle additions-arbejdsark med tematiske billeder til salg på Etsy & KDP. Kommerciel licens.',
    no: 'Lag profesjonelle addisjons-arbeidsark med tematiske bilder for salg på Etsy & KDP. Kommersiell lisens.',
    fi: 'Luo ammattimaisia yhteenlasku-työarkkeja temaattisilla kuvilla myytäväksi Etsyssä & KDP:ssä. Kaupallinen lisenssi.',
  },
  subtraction: {
    en: 'Generate subtraction worksheets with customizable difficulty to sell on Etsy & KDP. Commercial license included.',
    de: 'Subtraktions-Arbeitsblätter mit einstellbarem Schwierigkeitsgrad erstellen. Auf Etsy & KDP verkaufen. Kommerzielle Lizenz.',
    fr: 'Créez des fiches de soustraction avec difficulté réglable à vendre sur Etsy & KDP. Licence commerciale incluse.',
    es: 'Genera fichas de resta con dificultad personalizable para vender en Etsy & KDP. Licencia comercial incluida.',
    pt: 'Crie fichas de subtração com dificuldade ajustável para vender no Etsy & KDP. Licença comercial incluída.',
    it: 'Crea schede di sottrazione con difficoltà regolabile da vendere su Etsy & KDP. Licenza commerciale inclusa.',
    nl: 'Maak aftrekwerkbladen met aanpasbare moeilijkheid om te verkopen op Etsy & KDP. Commerciële licentie inbegrepen.',
    sv: 'Skapa subtraktions-arbetsblad med justerbar svårighet att sälja på Etsy & KDP. Kommersiell licens ingår.',
    da: 'Opret subtraktions-arbejdsark med justerbar sværhedsgrad til salg på Etsy & KDP. Kommerciel licens inkluderet.',
    no: 'Lag subtraksjons-arbeidsark med justerbar vanskelighetsgrad for salg på Etsy & KDP. Kommersiell lisens inkludert.',
    fi: 'Luo vähennyslasku-työarkkeja säädettävällä vaikeustasolla myytäväksi Etsyssä & KDP:ssä. Kaupallinen lisenssi.',
  },
  'code-addition': {
    en: 'Create secret code addition puzzles to sell on Etsy & KDP. Solve math to decode messages. Commercial license.',
    de: 'Geheimcode-Additionsrätsel erstellen und auf Etsy & KDP verkaufen. Mathe lösen, Nachrichten entschlüsseln.',
    fr: 'Créez des puzzles d\'addition à code secret à vendre sur Etsy & KDP. Résoudre pour décoder des messages.',
    es: 'Crea puzzles de código secreto con sumas para vender en Etsy & KDP. Resuelve para decodificar mensajes.',
    pt: 'Crie puzzles de código secreto com adição para vender no Etsy & KDP. Resolva para decodificar mensagens.',
    it: 'Crea puzzle di addizione a codice segreto da vendere su Etsy & KDP. Risolvi per decodificare messaggi.',
    nl: 'Maak geheime code optelpuzzels om te verkopen op Etsy & KDP. Los op om berichten te ontcijferen.',
    sv: 'Skapa hemlig kod-additionspussel att sälja på Etsy & KDP. Lös matematik för att avkoda meddelanden.',
    da: 'Opret hemmelig kode-additionspuslespil til salg på Etsy & KDP. Løs matematik for at afkode beskeder.',
    no: 'Lag hemmelig kode-addisjonspuslespill for salg på Etsy & KDP. Løs matematikk for å dekode meldinger.',
    fi: 'Luo salainen koodi -yhteenlaskupulmia myytäväksi Etsyssä & KDP:ssä. Ratkaise matematiikka viestien purkamiseksi.',
  },
  'more-less': {
    en: 'Generate greater than, less than, and equal to comparison worksheets to sell on Etsy & KDP. Commercial license.',
    de: 'Größer-kleiner-gleich-Vergleichsarbeitsblätter erstellen und auf Etsy & KDP verkaufen. Kommerzielle Lizenz.',
    fr: 'Créez des fiches de comparaison plus grand, plus petit, égal à vendre sur Etsy & KDP. Licence commerciale.',
    es: 'Genera fichas de comparación mayor que, menor que, igual para vender en Etsy & KDP. Licencia comercial.',
    pt: 'Crie fichas de comparação maior, menor e igual para vender no Etsy & KDP. Licença comercial incluída.',
    it: 'Crea schede di confronto maggiore, minore e uguale da vendere su Etsy & KDP. Licenza commerciale.',
    nl: 'Maak vergelijkingswerkbladen groter dan, kleiner dan, gelijk aan om te verkopen op Etsy & KDP.',
    sv: 'Skapa jämförelsearbetsblad med större än, mindre än och lika med att sälja på Etsy & KDP.',
    da: 'Opret sammenlignings-arbejdsark med større end, mindre end og lig med til salg på Etsy & KDP.',
    no: 'Lag sammenlignings-arbeidsark med større enn, mindre enn og lik for salg på Etsy & KDP.',
    fi: 'Luo vertailu-työarkkeja suurempi, pienempi ja yhtä suuri myytäväksi Etsyssä & KDP:ssä.',
  },
  'math-puzzle': {
    en: 'Create engaging math puzzle worksheets combining arithmetic with problem-solving. Sell on Etsy & KDP.',
    de: 'Spannende Mathe-Rätsel-Arbeitsblätter erstellen, die Rechnen mit Problemlösung verbinden. Auf Etsy & KDP verkaufen.',
    fr: 'Créez des fiches de puzzles mathématiques combinant calcul et résolution de problèmes. Vendez sur Etsy & KDP.',
    es: 'Crea fichas de puzzles matemáticos que combinan aritmética y resolución de problemas. Vende en Etsy & KDP.',
    pt: 'Crie fichas de puzzles matemáticos que combinam aritmética e resolução de problemas. Venda no Etsy & KDP.',
    it: 'Crea schede di puzzle matematici che combinano aritmetica e problem-solving. Vendi su Etsy & KDP.',
    nl: 'Maak boeiende wiskundepuzzel-werkbladen die rekenen met probleemoplossing combineren. Verkoop op Etsy & KDP.',
    sv: 'Skapa engagerande mattepussel-arbetsblad som kombinerar räkning med problemlösning. Sälj på Etsy & KDP.',
    da: 'Opret engagerende matematikpuslespil-arbejdsark der kombinerer regning med problemløsning. Sælg på Etsy & KDP.',
    no: 'Lag engasjerende mattepuslespill-arbeidsark som kombinerer regning med problemløsning. Selg på Etsy & KDP.',
    fi: 'Luo mukaansatempaavia matemaattisia pulmia, jotka yhdistävät laskemisen ongelmanratkaisuun. Myy Etsyssä & KDP:ssä.',
  },
  'math-worksheet': {
    en: 'Generate customizable math practice sheets with mixed operations. Sell on Etsy & Amazon KDP. Commercial license.',
    de: 'Anpassbare Mathe-Übungsblätter mit gemischten Rechenarten erstellen. Auf Etsy & KDP verkaufen. Kommerzielle Lizenz.',
    fr: 'Créez des fiches de maths personnalisables avec opérations mixtes à vendre sur Etsy & KDP. Licence commerciale.',
    es: 'Genera fichas de práctica de matemáticas personalizables con operaciones mixtas. Vende en Etsy & KDP.',
    pt: 'Crie fichas de prática de matemática personalizáveis com operações mistas. Venda no Etsy & KDP.',
    it: 'Crea schede di pratica di matematica personalizzabili con operazioni miste. Vendi su Etsy & KDP.',
    nl: 'Maak aanpasbare rekenoefenbladen met gemengde bewerkingen om te verkopen op Etsy & KDP.',
    sv: 'Skapa anpassningsbara matteövningsblad med blandade operationer att sälja på Etsy & KDP.',
    da: 'Opret tilpasselige matematik-øvelsesark med blandede operationer til salg på Etsy & KDP.',
    no: 'Lag tilpassbare matteøvingsark med blandede operasjoner for salg på Etsy & KDP.',
    fi: 'Luo muokattavia matematiikan harjoitusarkkeja sekaoperaatioilla myytäväksi Etsyssä & KDP:ssä.',
  },
  'alphabet-train': {
    en: 'Create alphabet train worksheets for letter recognition to sell on Etsy & KDP. Commercial license included.',
    de: 'Alphabet-Zug-Arbeitsblätter zur Buchstabenerkennung erstellen und auf Etsy & KDP verkaufen. Kommerzielle Lizenz.',
    fr: 'Créez des fiches train de l\'alphabet pour la reconnaissance des lettres à vendre sur Etsy & KDP.',
    es: 'Crea fichas del tren del alfabeto para reconocimiento de letras. Vende en Etsy & KDP. Licencia comercial.',
    pt: 'Crie fichas do trem do alfabeto para reconhecimento de letras. Venda no Etsy & KDP. Licença comercial.',
    it: 'Crea schede del treno dell\'alfabeto per il riconoscimento delle lettere. Vendi su Etsy & KDP.',
    nl: 'Maak alfabet-trein werkbladen voor letterherkenning om te verkopen op Etsy & KDP. Commerciële licentie.',
    sv: 'Skapa alfabetståg-arbetsblad för bokstavsigenkänning att sälja på Etsy & KDP. Kommersiell licens.',
    da: 'Opret alfabet-tog-arbejdsark til bogstavgenkendelse til salg på Etsy & KDP. Kommerciel licens.',
    no: 'Lag alfabettog-arbeidsark for bokstavgjenkjenning for salg på Etsy & KDP. Kommersiell lisens.',
    fi: 'Luo aakkos-juna-työarkkeja kirjaintunnistukseen myytäväksi Etsyssä & KDP:ssä. Kaupallinen lisenssi.',
  },
  prepositions: {
    en: 'Generate preposition worksheets with visual scenes to sell on Etsy & KDP. Commercial license included.',
    de: 'Präpositions-Arbeitsblätter mit visuellen Szenen erstellen und auf Etsy & KDP verkaufen. Kommerzielle Lizenz.',
    fr: 'Créez des fiches de prépositions avec des scènes visuelles à vendre sur Etsy & KDP. Licence commerciale.',
    es: 'Genera fichas de preposiciones con escenas visuales para vender en Etsy & KDP. Licencia comercial.',
    pt: 'Crie fichas de preposições com cenas visuais para vender no Etsy & KDP. Licença comercial incluída.',
    it: 'Crea schede sulle preposizioni con scene visive da vendere su Etsy & KDP. Licenza commerciale.',
    nl: 'Maak voorzetselwerkbladen met visuele scènes om te verkopen op Etsy & KDP. Commerciële licentie.',
    sv: 'Skapa prepositionsarbetsblad med visuella scener att sälja på Etsy & KDP. Kommersiell licens.',
    da: 'Opret præpositions-arbejdsark med visuelle scener til salg på Etsy & KDP. Kommerciel licens.',
    no: 'Lag preposisjons-arbeidsark med visuelle scener for salg på Etsy & KDP. Kommersiell lisens.',
    fi: 'Luo prepositio-työarkkeja visuaalisilla kohtauksilla myytäväksi Etsyssä & KDP:ssä. Kaupallinen lisenssi.',
  },
  'word-guess': {
    en: 'Create word guess worksheets for vocabulary building to sell on Etsy & KDP. Commercial license included.',
    de: 'Wörterraten-Arbeitsblätter zum Vokabelaufbau erstellen und auf Etsy & KDP verkaufen. Kommerzielle Lizenz.',
    fr: 'Créez des fiches de devinettes de mots pour le vocabulaire à vendre sur Etsy & KDP. Licence commerciale.',
    es: 'Crea fichas de adivinanzas de palabras para vocabulario. Vende en Etsy & KDP. Licencia comercial.',
    pt: 'Crie fichas de adivinhar palavras para vocabulário. Venda no Etsy & KDP. Licença comercial.',
    it: 'Crea schede di indovinelli di parole per il vocabolario. Vendi su Etsy & KDP. Licenza commerciale.',
    nl: 'Maak woordraad-werkbladen voor woordenschat om te verkopen op Etsy & KDP. Commerciële licentie.',
    sv: 'Skapa ordgissnings-arbetsblad för ordförråd att sälja på Etsy & KDP. Kommersiell licens.',
    da: 'Opret ordgætnings-arbejdsark til ordforråd til salg på Etsy & KDP. Kommerciel licens.',
    no: 'Lag ordgjettings-arbeidsark for ordforråd for salg på Etsy & KDP. Kommersiell lisens.',
    fi: 'Luo sana-arvaus-työarkkeja sanavaraston kasvattamiseen myytäväksi Etsyssä & KDP:ssä.',
  },
  'word-scramble': {
    en: 'Generate word scramble puzzles with themed vocabulary to sell on Etsy & KDP. Commercial license included.',
    de: 'Buchstabensalat-Rätsel mit thematischem Vokabular erstellen und auf Etsy & KDP verkaufen. Kommerzielle Lizenz.',
    fr: 'Créez des puzzles de mots mélangés avec vocabulaire thématique à vendre sur Etsy & KDP. Licence commerciale.',
    es: 'Genera puzzles de palabras desordenadas con vocabulario temático. Vende en Etsy & KDP. Licencia comercial.',
    pt: 'Crie puzzles de palavras embaralhadas com vocabulário temático. Venda no Etsy & KDP. Licença comercial.',
    it: 'Crea puzzle di parole mescolate con vocabolario tematico. Vendi su Etsy & KDP. Licenza commerciale.',
    nl: 'Maak woordpuzzel-werkbladen met thematische woordenschat om te verkopen op Etsy & KDP.',
    sv: 'Skapa ordförvrängnings-pussel med tematiskt ordförråd att sälja på Etsy & KDP. Kommersiell licens.',
    da: 'Opret ordforvrængnings-puslespil med tematisk ordforråd til salg på Etsy & KDP. Kommerciel licens.',
    no: 'Lag ordforvrengnings-puslespill med tematisk ordforråd for salg på Etsy & KDP. Kommersiell lisens.',
    fi: 'Luo kirjainsekoituspulmia temaattisella sanastolla myytäväksi Etsyssä & KDP:ssä. Kaupallinen lisenssi.',
  },
  wordsearch: {
    en: 'Create professional word search puzzles with custom word lists to sell on Etsy & KDP. Commercial license.',
    de: 'Professionelle Wortsuch-Rätsel mit eigenen Wörterlisten erstellen und auf Etsy & KDP verkaufen.',
    fr: 'Créez des mots cachés professionnels avec des listes de mots personnalisées à vendre sur Etsy & KDP.',
    es: 'Crea sopas de letras profesionales con listas de palabras personalizadas para vender en Etsy & KDP.',
    pt: 'Crie caça-palavras profissionais com listas de palavras personalizadas para vender no Etsy & KDP.',
    it: 'Crea crucipuzzle professionali con elenchi di parole personalizzati da vendere su Etsy & KDP.',
    nl: 'Maak professionele woordzoekers met aangepaste woordlijsten om te verkopen op Etsy & KDP.',
    sv: 'Skapa professionella ordjaktar med anpassade ordlistor att sälja på Etsy & KDP. Kommersiell licens.',
    da: 'Opret professionelle ordsøgninger med brugerdefinerede ordlister til salg på Etsy & KDP.',
    no: 'Lag profesjonelle ordsøk med egendefinerte ordlister for salg på Etsy & KDP. Kommersiell lisens.',
    fi: 'Luo ammattimaisia sananhaku-pulmia mukautetuilla sanalistoilla myytäväksi Etsyssä & KDP:ssä.',
  },
  cryptogram: {
    en: 'Generate cryptogram puzzles with symbol substitution to sell on Etsy & KDP. Commercial license included.',
    de: 'Kryptogramm-Rätsel mit Symbolersetzung erstellen und auf Etsy & KDP verkaufen. Kommerzielle Lizenz.',
    fr: 'Créez des cryptogrammes avec substitution de symboles à vendre sur Etsy & KDP. Licence commerciale.',
    es: 'Genera criptogramas con sustitución de símbolos para vender en Etsy & KDP. Licencia comercial.',
    pt: 'Crie criptogramas com substituição de símbolos para vender no Etsy & KDP. Licença comercial.',
    it: 'Crea crittogrammi con sostituzione di simboli da vendere su Etsy & KDP. Licenza commerciale.',
    nl: 'Maak cryptogrampuzzels met symboolvervanging om te verkopen op Etsy & KDP. Commerciële licentie.',
    sv: 'Skapa kryptogrampussel med symbolersättning att sälja på Etsy & KDP. Kommersiell licens.',
    da: 'Opret kryptogram-puslespil med symbolerstatning til salg på Etsy & KDP. Kommerciel licens.',
    no: 'Lag kryptogrampuslespill med symbolerstatning for salg på Etsy & KDP. Kommersiell lisens.',
    fi: 'Luo kryptogrammipulmia symbolikorvauksella myytäväksi Etsyssä & KDP:ssä. Kaupallinen lisenssi.',
  },
  writing: {
    en: 'Create lined writing worksheets for handwriting practice to sell on Etsy & KDP. Commercial license included.',
    de: 'Linierte Schreibarbeitsblätter zum Handschrifttraining erstellen und auf Etsy & KDP verkaufen.',
    fr: 'Créez des fiches d\'écriture lignées pour la pratique de l\'écriture à vendre sur Etsy & KDP.',
    es: 'Crea fichas de escritura con líneas para práctica de caligrafía. Vende en Etsy & KDP. Licencia comercial.',
    pt: 'Crie fichas de escrita pautadas para prática de caligrafia. Venda no Etsy & KDP. Licença comercial.',
    it: 'Crea schede di scrittura con righe per pratica di calligrafia. Vendi su Etsy & KDP. Licenza commerciale.',
    nl: 'Maak gelinieerde schrijfwerkbladen voor handschriftoefening om te verkopen op Etsy & KDP.',
    sv: 'Skapa linjerade skrivarbetsblad för handskriftsövning att sälja på Etsy & KDP. Kommersiell licens.',
    da: 'Opret linjerede skrivearbejdsark til håndskriftsøvelse til salg på Etsy & KDP. Kommerciel licens.',
    no: 'Lag linjerte skrivearbeidsark for håndskriftsøving for salg på Etsy & KDP. Kommersiell lisens.',
    fi: 'Luo viivoitettuja kirjoitustyöarkkeja käsinkirjoitusharjoitteluun myytäväksi Etsyssä & KDP:ssä.',
  },
  'big-small': {
    en: 'Generate size comparison worksheets for visual discrimination to sell on Etsy & KDP. Commercial license.',
    de: 'Größenvergleichs-Arbeitsblätter erstellen und auf Etsy & KDP verkaufen. Kommerzielle Lizenz inklusive.',
    fr: 'Créez des fiches de comparaison de tailles pour la discrimination visuelle. Vendez sur Etsy & KDP.',
    es: 'Genera fichas de comparación de tamaños para discriminación visual. Vende en Etsy & KDP.',
    pt: 'Crie fichas de comparação de tamanhos para discriminação visual. Venda no Etsy & KDP.',
    it: 'Crea schede di confronto dimensioni per la discriminazione visiva. Vendi su Etsy & KDP.',
    nl: 'Maak grootte-vergelijkingswerkbladen voor visuele discriminatie om te verkopen op Etsy & KDP.',
    sv: 'Skapa storleksjämförelse-arbetsblad för visuell diskriminering att sälja på Etsy & KDP.',
    da: 'Opret størrelsessammenlignings-arbejdsark til visuel diskrimination til salg på Etsy & KDP.',
    no: 'Lag størrelsessammenlignings-arbeidsark for visuell diskriminering for salg på Etsy & KDP.',
    fi: 'Luo kokovertailu-työarkkeja visuaaliseen erotteluun myytäväksi Etsyssä & KDP:ssä.',
  },
  'pattern-train': {
    en: 'Create pattern sequence worksheets with themed images to sell on Etsy & KDP. Commercial license included.',
    de: 'Musterfolge-Arbeitsblätter mit thematischen Bildern erstellen und auf Etsy & KDP verkaufen.',
    fr: 'Créez des fiches de séquences de motifs avec images thématiques à vendre sur Etsy & KDP.',
    es: 'Crea fichas de secuencias de patrones con imágenes temáticas para vender en Etsy & KDP.',
    pt: 'Crie fichas de sequências de padrões com imagens temáticas para vender no Etsy & KDP.',
    it: 'Crea schede di sequenze di pattern con immagini tematiche da vendere su Etsy & KDP.',
    nl: 'Maak patroonreeks-werkbladen met thematische afbeeldingen om te verkopen op Etsy & KDP.',
    sv: 'Skapa mönstersekvens-arbetsblad med tematiska bilder att sälja på Etsy & KDP. Kommersiell licens.',
    da: 'Opret mønstersekvens-arbejdsark med tematiske billeder til salg på Etsy & KDP.',
    no: 'Lag mønstersekvens-arbeidsark med tematiske bilder for salg på Etsy & KDP. Kommersiell lisens.',
    fi: 'Luo kuviosarja-työarkkeja temaattisilla kuvilla myytäväksi Etsyssä & KDP:ssä. Kaupallinen lisenssi.',
  },
  'pattern-worksheet': {
    en: 'Generate pattern recognition worksheets to sell on Etsy & Amazon KDP. Commercial license included.',
    de: 'Mustererkennung-Arbeitsblätter erstellen und auf Etsy & KDP verkaufen. Kommerzielle Lizenz inklusive.',
    fr: 'Créez des fiches de reconnaissance de motifs à vendre sur Etsy & KDP. Licence commerciale incluse.',
    es: 'Genera fichas de reconocimiento de patrones para vender en Etsy & KDP. Licencia comercial incluida.',
    pt: 'Crie fichas de reconhecimento de padrões para vender no Etsy & KDP. Licença comercial incluída.',
    it: 'Crea schede di riconoscimento di pattern da vendere su Etsy & KDP. Licenza commerciale inclusa.',
    nl: 'Maak patroonherkenning-werkbladen om te verkopen op Etsy & KDP. Commerciële licentie inbegrepen.',
    sv: 'Skapa mönsterigenkännings-arbetsblad att sälja på Etsy & KDP. Kommersiell licens ingår.',
    da: 'Opret mønstergenkendelse-arbejdsark til salg på Etsy & KDP. Kommerciel licens inkluderet.',
    no: 'Lag mønstergjenkjennings-arbeidsark for salg på Etsy & KDP. Kommersiell lisens inkludert.',
    fi: 'Luo hahmontunnistus-työarkkeja myytäväksi Etsyssä & KDP:ssä. Kaupallinen lisenssi sisältyy.',
  },
  'draw-and-color': {
    en: 'Create guided drawing and coloring sheets with step-by-step instructions. Sell on Etsy & KDP.',
    de: 'Geführte Zeichen- und Malblätter mit Schritt-für-Schritt-Anleitungen erstellen. Auf Etsy & KDP verkaufen.',
    fr: 'Créez des fiches de dessin guidé et coloriage étape par étape à vendre sur Etsy & KDP.',
    es: 'Crea fichas de dibujo guiado y coloreo con instrucciones paso a paso. Vende en Etsy & KDP.',
    pt: 'Crie fichas de desenho guiado e colorir com instruções passo a passo. Venda no Etsy & KDP.',
    it: 'Crea schede di disegno guidato e colorazione con istruzioni passo passo. Vendi su Etsy & KDP.',
    nl: 'Maak begeleid teken- en kleurbladen met stapsgewijze instructies. Verkoop op Etsy & KDP.',
    sv: 'Skapa guidade rit- och målarblad med steg-för-steg-instruktioner. Sälj på Etsy & KDP.',
    da: 'Opret guidede tegne- og farvelægningsark med trin-for-trin-instruktioner. Sælg på Etsy & KDP.',
    no: 'Lag guidede tegne- og fargeleggingsark med steg-for-steg-instruksjoner. Selg på Etsy & KDP.',
    fi: 'Luo ohjattuja piirustus- ja väritysarkkeja vaiheittaisilla ohjeilla. Myy Etsyssä & KDP:ssä.',
  },
  'drawing-lines': {
    en: 'Generate tracing and line-drawing worksheets to sell on Etsy & KDP. Commercial license included.',
    de: 'Nachzieh- und Linienzeichnungs-Arbeitsblätter erstellen und auf Etsy & KDP verkaufen. Kommerzielle Lizenz.',
    fr: 'Créez des fiches de traçage et de dessin de lignes à vendre sur Etsy & KDP. Licence commerciale.',
    es: 'Genera fichas de trazado y dibujo de líneas para vender en Etsy & KDP. Licencia comercial incluida.',
    pt: 'Crie fichas de traçado e desenho de linhas para vender no Etsy & KDP. Licença comercial.',
    it: 'Crea schede di tracciamento e disegno di linee da vendere su Etsy & KDP. Licenza commerciale.',
    nl: 'Maak overtrek- en lijntekenwerkbladen om te verkopen op Etsy & KDP. Commerciële licentie.',
    sv: 'Skapa spårnings- och linjeritningsarbetsblad att sälja på Etsy & KDP. Kommersiell licens.',
    da: 'Opret sporings- og linjetegningsarbejdsark til salg på Etsy & KDP. Kommerciel licens.',
    no: 'Lag sporings- og linjetegningsarbeidsark for salg på Etsy & KDP. Kommersiell lisens.',
    fi: 'Luo jäljennys- ja viivanpiirto-työarkkeja myytäväksi Etsyssä & KDP:ssä. Kaupallinen lisenssi.',
  },
  coloring: {
    en: 'Create professional coloring pages with 3,000+ themed images to sell on Etsy & KDP. Commercial license.',
    de: 'Professionelle Ausmalseiten mit 3.000+ thematischen Bildern erstellen und auf Etsy & KDP verkaufen.',
    fr: 'Créez des pages de coloriage professionnelles avec 3 000+ images thématiques à vendre sur Etsy & KDP.',
    es: 'Crea páginas para colorear profesionales con 3.000+ imágenes temáticas para vender en Etsy & KDP.',
    pt: 'Crie páginas para colorir profissionais com 3.000+ imagens temáticas para vender no Etsy & KDP.',
    it: 'Crea pagine da colorare professionali con 3.000+ immagini tematiche da vendere su Etsy & KDP.',
    nl: 'Maak professionele kleurplaten met 3.000+ thematische afbeeldingen om te verkopen op Etsy & KDP.',
    sv: 'Skapa professionella målarbilder med 3 000+ tematiska bilder att sälja på Etsy & KDP.',
    da: 'Opret professionelle malebogssider med 3.000+ tematiske billeder til salg på Etsy & KDP.',
    no: 'Lag profesjonelle fargeleggingsbilder med 3 000+ tematiske bilder for salg på Etsy & KDP.',
    fi: 'Luo ammattimaisia värityskuvia 3 000+ temaattisella kuvalla myytäväksi Etsyssä & KDP:ssä.',
  },
  'chart-count': {
    en: 'Generate counting chart worksheets with visual aids to sell on Etsy & KDP. Commercial license included.',
    de: 'Zähltabellen-Arbeitsblätter mit visuellen Hilfen erstellen und auf Etsy & KDP verkaufen.',
    fr: 'Créez des fiches de tableaux de comptage avec aides visuelles à vendre sur Etsy & KDP.',
    es: 'Genera fichas de tablas de conteo con ayudas visuales para vender en Etsy & KDP.',
    pt: 'Crie fichas de tabelas de contagem com ajudas visuais para vender no Etsy & KDP.',
    it: 'Crea schede di tabelle di conteggio con aiuti visivi da vendere su Etsy & KDP.',
    nl: 'Maak teltabel-werkbladen met visuele hulpmiddelen om te verkopen op Etsy & KDP.',
    sv: 'Skapa räknetabell-arbetsblad med visuella hjälpmedel att sälja på Etsy & KDP.',
    da: 'Opret tælletabel-arbejdsark med visuelle hjælpemidler til salg på Etsy & KDP.',
    no: 'Lag telletabell-arbeidsark med visuelle hjelpemidler for salg på Etsy & KDP.',
    fi: 'Luo laskutaulukko-työarkkeja visuaalisilla apuvälineillä myytäväksi Etsyssä & KDP:ssä.',
  },
  matching: {
    en: 'Create memory-style matching worksheets with themed image pairs to sell on Etsy & KDP. Commercial license.',
    de: 'Memory-Zuordnungs-Arbeitsblätter mit thematischen Bilderpaaren erstellen. Auf Etsy & KDP verkaufen.',
    fr: 'Créez des fiches d\'association de type mémoire avec des paires d\'images. Vendez sur Etsy & KDP.',
    es: 'Crea fichas de emparejamiento tipo memoria con pares de imágenes temáticas. Vende en Etsy & KDP.',
    pt: 'Crie fichas de correspondência estilo memória com pares de imagens temáticas. Venda no Etsy & KDP.',
    it: 'Crea schede di abbinamento stile memory con coppie di immagini tematiche. Vendi su Etsy & KDP.',
    nl: 'Maak memory-stijl werkbladen met thematische afbeeldingsparen om te verkopen op Etsy & KDP.',
    sv: 'Skapa memory-matchnings-arbetsblad med tematiska bildpar att sälja på Etsy & KDP.',
    da: 'Opret memory-matchnings-arbejdsark med tematiske billedpar til salg på Etsy & KDP.',
    no: 'Lag memory-matchings-arbeidsark med tematiske bildepar for salg på Etsy & KDP.',
    fi: 'Luo muistipeli-tyyppisiä yhdistelytyöarkkeja temaattisilla kuvaparilla myytäväksi Etsyssä & KDP:ssä.',
  },
  'grid-match': {
    en: 'Generate grid-based matching activities for visual pattern recognition. Sell on Etsy & KDP.',
    de: 'Rasterbasierte Zuordnungsaktivitäten für visuelle Mustererkennung erstellen. Auf Etsy & KDP verkaufen.',
    fr: 'Créez des activités d\'association sur grille pour la reconnaissance visuelle. Vendez sur Etsy & KDP.',
    es: 'Genera actividades de emparejamiento en cuadrícula para reconocimiento visual. Vende en Etsy & KDP.',
    pt: 'Crie atividades de correspondência em grade para reconhecimento visual. Venda no Etsy & KDP.',
    it: 'Crea attività di abbinamento su griglia per il riconoscimento visivo. Vendi su Etsy & KDP.',
    nl: 'Maak raster-gebaseerde matchingactiviteiten voor visuele patroonherkenning. Verkoop op Etsy & KDP.',
    sv: 'Skapa rutnätsbaserade matchningsaktiviteter för visuell mönsterigenkänning. Sälj på Etsy & KDP.',
    da: 'Opret gitterbaserede matchningsaktiviteter til visuel mønstergenkendelse. Sælg på Etsy & KDP.',
    no: 'Lag rutenettbaserte matchingsaktiviteter for visuell mønstergjenkjenning. Selg på Etsy & KDP.',
    fi: 'Luo ruudukko-yhdistämisaktiviteetteja visuaaliseen hahmontunnistukseen. Myy Etsyssä & KDP:ssä.',
  },
  'shadow-match': {
    en: 'Create shadow matching worksheets for visual perception to sell on Etsy & KDP. Commercial license.',
    de: 'Schattenzuordnungs-Arbeitsblätter für visuelle Wahrnehmung erstellen. Auf Etsy & KDP verkaufen.',
    fr: 'Créez des fiches d\'association d\'ombres pour la perception visuelle à vendre sur Etsy & KDP.',
    es: 'Crea fichas de emparejamiento de sombras para percepción visual. Vende en Etsy & KDP.',
    pt: 'Crie fichas de correspondência de sombras para percepção visual. Venda no Etsy & KDP.',
    it: 'Crea schede di abbinamento ombre per la percezione visiva. Vendi su Etsy & KDP.',
    nl: 'Maak schaduw-matchingwerkbladen voor visuele waarneming om te verkopen op Etsy & KDP.',
    sv: 'Skapa skuggmatchnings-arbetsblad för visuell perception att sälja på Etsy & KDP.',
    da: 'Opret skyggematchnings-arbejdsark til visuel perception til salg på Etsy & KDP.',
    no: 'Lag skyggematching-arbeidsark for visuell persepsjon for salg på Etsy & KDP.',
    fi: 'Luo varjoyhdistely-työarkkeja visuaaliseen hahmottamiseen myytäväksi Etsyssä & KDP:ssä.',
  },
  bingo: {
    en: 'Generate customizable picture bingo cards with themed images to sell on Etsy & KDP. Commercial license.',
    de: 'Anpassbare Bilder-Bingokarten mit thematischen Bildern erstellen und auf Etsy & KDP verkaufen.',
    fr: 'Créez des cartes de bingo illustrées personnalisables à vendre sur Etsy & KDP. Licence commerciale.',
    es: 'Genera tarjetas de bingo con imágenes personalizables para vender en Etsy & KDP. Licencia comercial.',
    pt: 'Crie cartões de bingo com imagens personalizáveis para vender no Etsy & KDP. Licença comercial.',
    it: 'Crea cartelle bingo illustrate personalizzabili da vendere su Etsy & KDP. Licenza commerciale.',
    nl: 'Maak aanpasbare plaatjes-bingokaarten met thematische afbeeldingen. Verkoop op Etsy & KDP.',
    sv: 'Skapa anpassningsbara bildbingobrickor med tematiska bilder att sälja på Etsy & KDP.',
    da: 'Opret tilpasselige billed-bingokort med tematiske billeder til salg på Etsy & KDP.',
    no: 'Lag tilpassbare bilde-bingokort med tematiske bilder for salg på Etsy & KDP.',
    fi: 'Luo muokattavia kuvabingokortteja temaattisilla kuvilla myytäväksi Etsyssä & KDP:ssä.',
  },
  'picture-sort': {
    en: 'Create sorting and categorization worksheets with themed images to sell on Etsy & KDP.',
    de: 'Sortier- und Kategorisierungs-Arbeitsblätter mit thematischen Bildern erstellen. Auf Etsy & KDP verkaufen.',
    fr: 'Créez des fiches de tri et catégorisation avec images thématiques à vendre sur Etsy & KDP.',
    es: 'Crea fichas de clasificación y categorización con imágenes temáticas. Vende en Etsy & KDP.',
    pt: 'Crie fichas de classificação e categorização com imagens temáticas. Venda no Etsy & KDP.',
    it: 'Crea schede di ordinamento e categorizzazione con immagini tematiche. Vendi su Etsy & KDP.',
    nl: 'Maak sorteer- en categoriseerwerkbladen met thematische afbeeldingen. Verkoop op Etsy & KDP.',
    sv: 'Skapa sorterings- och kategoriseringsarbetsblad med tematiska bilder. Sälj på Etsy & KDP.',
    da: 'Opret sorterings- og kategoriseringsarbejdsark med tematiske billeder. Sælg på Etsy & KDP.',
    no: 'Lag sorterings- og kategoriseringsarbeidsark med tematiske bilder. Selg på Etsy & KDP.',
    fi: 'Luo lajittelu- ja luokittelutyöarkkeja temaattisilla kuvilla. Myy Etsyssä & KDP:ssä.',
  },
  'missing-pieces': {
    en: 'Generate missing pieces visual puzzles to sell on Etsy & Amazon KDP. Commercial license included.',
    de: 'Fehlende-Teile-Rätsel erstellen und auf Etsy & KDP verkaufen. Kommerzielle Lizenz inklusive.',
    fr: 'Créez des puzzles visuels de pièces manquantes à vendre sur Etsy & KDP. Licence commerciale.',
    es: 'Genera puzzles visuales de piezas faltantes para vender en Etsy & KDP. Licencia comercial.',
    pt: 'Crie puzzles visuais de peças faltantes para vender no Etsy & KDP. Licença comercial.',
    it: 'Crea puzzle visivi di pezzi mancanti da vendere su Etsy & KDP. Licenza commerciale.',
    nl: 'Maak ontbrekende-stukken visuele puzzels om te verkopen op Etsy & KDP. Commerciële licentie.',
    sv: 'Skapa saknade-bitar visuella pussel att sälja på Etsy & KDP. Kommersiell licens.',
    da: 'Opret manglende-brikker visuelle puslespil til salg på Etsy & KDP. Kommerciel licens.',
    no: 'Lag manglende-brikker visuelle puslespill for salg på Etsy & KDP. Kommersiell lisens.',
    fi: 'Luo puuttuvat-palat visuaalisia pulmia myytäväksi Etsyssä & KDP:ssä. Kaupallinen lisenssi.',
  },
  'odd-one-out': {
    en: 'Create odd-one-out worksheets for critical thinking to sell on Etsy & KDP. Commercial license included.',
    de: 'Was-passt-nicht-Arbeitsblätter für kritisches Denken erstellen und auf Etsy & KDP verkaufen.',
    fr: 'Créez des fiches de l\'intrus pour la réflexion critique à vendre sur Etsy & KDP. Licence commerciale.',
    es: 'Crea fichas de encuentra el diferente para pensamiento crítico. Vende en Etsy & KDP.',
    pt: 'Crie fichas de encontre o diferente para pensamento crítico. Venda no Etsy & KDP.',
    it: 'Crea schede trova l\'intruso per il pensiero critico. Vendi su Etsy & KDP. Licenza commerciale.',
    nl: 'Maak welke-hoort-er-niet-bij werkbladen voor kritisch denken. Verkoop op Etsy & KDP.',
    sv: 'Skapa vilken-hör-inte-hemma-arbetsblad för kritiskt tänkande. Sälj på Etsy & KDP.',
    da: 'Opret find-den-der-ikke-hører-til-arbejdsark til kritisk tænkning. Sælg på Etsy & KDP.',
    no: 'Lag finn-den-som-ikke-hører-til-arbeidsark for kritisk tenkning. Selg på Etsy & KDP.',
    fi: 'Luo mikä-ei-kuulu-joukkoon-työarkkeja kriittiseen ajatteluun. Myy Etsyssä & KDP:ssä.',
  },
  sudoku: {
    en: 'Generate picture sudoku puzzles with themed images to sell on Etsy & KDP. Commercial license included.',
    de: 'Bilder-Sudoku-Rätsel mit thematischen Bildern erstellen und auf Etsy & KDP verkaufen.',
    fr: 'Créez des sudokus illustrés avec images thématiques à vendre sur Etsy & KDP. Licence commerciale.',
    es: 'Genera sudokus ilustrados con imágenes temáticas para vender en Etsy & KDP. Licencia comercial.',
    pt: 'Crie sudokus ilustrados com imagens temáticas para vender no Etsy & KDP. Licença comercial.',
    it: 'Crea sudoku illustrati con immagini tematiche da vendere su Etsy & KDP. Licenza commerciale.',
    nl: 'Maak plaatjes-sudokupuzzels met thematische afbeeldingen om te verkopen op Etsy & KDP.',
    sv: 'Skapa bildsudokupussel med tematiska bilder att sälja på Etsy & KDP. Kommersiell licens.',
    da: 'Opret billed-sudoku-puslespil med tematiske billeder til salg på Etsy & KDP.',
    no: 'Lag bilde-sudoku-puslespill med tematiske bilder for salg på Etsy & KDP.',
    fi: 'Luo kuvasudoku-pulmia temaattisilla kuvilla myytäväksi Etsyssä & KDP:ssä. Kaupallinen lisenssi.',
  },
  'picture-path': {
    en: 'Create maze and path-finding worksheets with themed visuals to sell on Etsy & KDP. Commercial license.',
    de: 'Labyrinth- und Pfadfindungs-Arbeitsblätter mit thematischen Bildern erstellen. Auf Etsy & KDP verkaufen.',
    fr: 'Créez des fiches de labyrinthes et de chemins avec des visuels thématiques. Vendez sur Etsy & KDP.',
    es: 'Crea fichas de laberintos y búsqueda de caminos con imágenes temáticas. Vende en Etsy & KDP.',
    pt: 'Crie fichas de labirintos e caminhos com visuais temáticos. Venda no Etsy & KDP.',
    it: 'Crea schede di labirinti e percorsi con immagini tematiche. Vendi su Etsy & KDP.',
    nl: 'Maak doolhof- en pad-werkbladen met thematische afbeeldingen. Verkoop op Etsy & KDP.',
    sv: 'Skapa labyrint- och vägarbetsblad med tematiska bilder att sälja på Etsy & KDP.',
    da: 'Opret labyrint- og sti-arbejdsark med tematiske billeder til salg på Etsy & KDP.',
    no: 'Lag labyrint- og sti-arbeidsark med tematiske bilder for salg på Etsy & KDP.',
    fi: 'Luo sokkelo- ja reittietsintä-työarkkeja temaattisilla kuvilla. Myy Etsyssä & KDP:ssä.',
  },
  'find-and-count': {
    en: 'Generate find-and-count worksheets with hidden themed objects to sell on Etsy & KDP. Commercial license.',
    de: 'Finde-und-zähle-Arbeitsblätter mit versteckten thematischen Objekten erstellen. Auf Etsy & KDP verkaufen.',
    fr: 'Créez des fiches cherche et compte avec des objets thématiques cachés. Vendez sur Etsy & KDP.',
    es: 'Genera fichas de busca y cuenta con objetos temáticos escondidos. Vende en Etsy & KDP.',
    pt: 'Crie fichas de encontre e conte com objetos temáticos escondidos. Venda no Etsy & KDP.',
    it: 'Crea schede trova e conta con oggetti tematici nascosti. Vendi su Etsy & KDP.',
    nl: 'Maak zoek-en-tel werkbladen met verborgen thematische objecten. Verkoop op Etsy & KDP.',
    sv: 'Skapa hitta-och-räkna-arbetsblad med gömda tematiska objekt. Sälj på Etsy & KDP.',
    da: 'Opret find-og-tæl-arbejdsark med skjulte tematiske objekter. Sælg på Etsy & KDP.',
    no: 'Lag finn-og-tell-arbeidsark med skjulte tematiske objekter. Selg på Etsy & KDP.',
    fi: 'Luo etsi-ja-laske-työarkkeja piilotetuilla temaattisilla esineillä. Myy Etsyssä & KDP:ssä.',
  },
  'find-objects': {
    en: 'Create hidden objects search worksheets with themed scenes to sell on Etsy & KDP. Commercial license.',
    de: 'Suchbilder-Arbeitsblätter mit thematischen Szenen erstellen und auf Etsy & KDP verkaufen.',
    fr: 'Créez des fiches de recherche d\'objets cachés avec scènes thématiques. Vendez sur Etsy & KDP.',
    es: 'Crea fichas de búsqueda de objetos ocultos con escenas temáticas. Vende en Etsy & KDP.',
    pt: 'Crie fichas de busca de objetos escondidos com cenas temáticas. Venda no Etsy & KDP.',
    it: 'Crea schede di ricerca di oggetti nascosti con scene tematiche. Vendi su Etsy & KDP.',
    nl: 'Maak verborgen-voorwerpen zoekwerkbladen met thematische scènes. Verkoop op Etsy & KDP.',
    sv: 'Skapa gömda-föremål sökarbetsblad med tematiska scener. Sälj på Etsy & KDP.',
    da: 'Opret skjulte-objekter søgearbejdsark med tematiske scener. Sælg på Etsy & KDP.',
    no: 'Lag gjemte-gjenstander søkearbeidsark med tematiske scener. Selg på Etsy & KDP.',
    fi: 'Luo piilotettujen esineiden etsintä-työarkkeja temaattisilla kohtauksilla. Myy Etsyssä & KDP:ssä.',
  },
  crossword: {
    en: 'Generate picture crossword puzzles with themed images as clues to sell on Etsy & KDP. Commercial license.',
    de: 'Bilder-Kreuzworträtsel mit thematischen Bildern als Hinweise erstellen. Auf Etsy & KDP verkaufen.',
    fr: 'Créez des mots croisés illustrés avec des images thématiques comme indices. Vendez sur Etsy & KDP.',
    es: 'Genera crucigramas ilustrados con imágenes temáticas como pistas. Vende en Etsy & KDP.',
    pt: 'Crie palavras cruzadas ilustradas com imagens temáticas como pistas. Venda no Etsy & KDP.',
    it: 'Crea cruciverba illustrati con immagini tematiche come indizi. Vendi su Etsy & KDP.',
    nl: 'Maak plaatjes-kruiswoordpuzzels met thematische afbeeldingen als aanwijzingen. Verkoop op Etsy & KDP.',
    sv: 'Skapa bildkorsord med tematiska bilder som ledtrådar att sälja på Etsy & KDP.',
    da: 'Opret billed-krydsord med tematiske billeder som spor til salg på Etsy & KDP.',
    no: 'Lag bilde-kryssord med tematiske bilder som ledetråder for salg på Etsy & KDP.',
    fi: 'Luo kuvaristikkopulmia temaattisilla kuvilla vihjeenä myytäväksi Etsyssä & KDP:ssä.',
  },
  'treasure-hunt': {
    en: 'Create treasure hunt worksheets combining navigation and problem-solving. Sell on Etsy & KDP.',
    de: 'Schatzsuche-Arbeitsblätter mit Navigation und Problemlösung erstellen. Auf Etsy & KDP verkaufen.',
    fr: 'Créez des fiches de chasse au trésor combinant navigation et résolution de problèmes. Vendez sur Etsy & KDP.',
    es: 'Crea fichas de búsqueda del tesoro combinando navegación y resolución de problemas. Vende en Etsy & KDP.',
    pt: 'Crie fichas de caça ao tesouro combinando navegação e resolução de problemas. Venda no Etsy & KDP.',
    it: 'Crea schede caccia al tesoro che combinano navigazione e problem-solving. Vendi su Etsy & KDP.',
    nl: 'Maak speurtochtwerkbladen die navigatie en probleemoplossing combineren. Verkoop op Etsy & KDP.',
    sv: 'Skapa skattjakt-arbetsblad som kombinerar navigering och problemlösning. Sälj på Etsy & KDP.',
    da: 'Opret skattejagt-arbejdsark der kombinerer navigation og problemløsning. Sælg på Etsy & KDP.',
    no: 'Lag skattejakt-arbeidsark som kombinerer navigasjon og problemløsning. Selg på Etsy & KDP.',
    fi: 'Luo aarteenetsintä-työarkkeja, jotka yhdistävät navigoinnin ja ongelmanratkaisun. Myy Etsyssä & KDP:ssä.',
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

    const alternateUrls = getAlternateUrls(appConfig.appId, baseUrl);
    const localeSlug = getSlugForLocale(appConfig.appId, locale);

    const localizedName = getLocalizedAppName(wpAppId, locale);
    const localizedSuffix = getLocalizedSuffix(locale);

    // Use enriched SEO if content file exists, fall back to localized description
    const content = await getAppContent(wpAppId, locale);
    const title = content?.seo?.titleTag || `${localizedName} ${localizedSuffix} | LessonCraftStudio`;
    const description = content?.seo?.metaDescription
      || appDescriptions[wpAppId]?.[locale]
      || getAppFallbackDescription(localizedName, locale);

    // Combine all keywords from content SEO
    const keywords = content?.seo?.primaryKeyword
      ? [content.seo.primaryKeyword, ...(content.seo.secondaryKeywords || []), ...(content.seo.lsiKeywords || [])]
      : undefined;

    // Canonical image: same priority as JSON-LD schemaImage so og:image[0] = JSON-LD image
    const showcaseConfig = getShowcaseConfig(wpAppId, locale);
    const canonicalImagePath = showcaseConfig?.hero?.images?.[0]?.src
      ? encodeImagePath(showcaseConfig.hero.images[0].src)
      : content?.visuals?.heroImages?.primary
        ? encodeImagePath(content.visuals.heroImages.primary)
        : content?.visuals?.sampleGallery?.[0]?.src
          ? encodeImagePath(content.visuals.sampleGallery[0].src)
          : null;
    const canonicalImageAlt = showcaseConfig?.hero?.images?.[0]?.alt
      || content?.visuals?.heroImages?.primaryAlt
      || title;

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
        type: 'article',
        url: `${baseUrl}/${locale}/apps/${localeSlug || slug}`,
        siteName: 'LessonCraftStudio',
        locale: ogLocaleMap[locale] || locale,
        alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
        images: [
          ...(canonicalImagePath ? [{
            url: `${baseUrl}${canonicalImagePath}`,
            width: 2480,
            height: 3508,
            alt: canonicalImageAlt,
          }] : []),
          { url: `${baseUrl}/api/og?app=${wpAppId}&locale=${locale}&type=app&title=${encodeURIComponent(title)}`, width: 1200, height: 630, alt: title },
          ...(content?.visuals?.sampleGallery?.slice(0, 3).map((img: { src: string; alt: string }) => ({
            url: `${baseUrl}${encodeImagePath(img.src)}`,
            width: 2480,
            height: 3508,
            alt: img.alt,
          })) || []),
        ],
        videos: content?.visuals?.youtubeId ? [{ url: `https://www.youtube.com/watch?v=${content.visuals.youtubeId}`, type: 'text/html', width: 1280, height: 720 }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [canonicalImagePath
          ? `${baseUrl}${canonicalImagePath}`
          : `${baseUrl}/api/og?app=${wpAppId}&locale=${locale}&type=app&title=${encodeURIComponent(title)}`],
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
  const showcaseConfig = (locale === 'en' || locale === 'de' || locale === 'fr' || locale === 'es' || locale === 'pt' || locale === 'it' || locale === 'nl' || locale === 'sv' || locale === 'da' || locale === 'no' || locale === 'fi') ? getShowcaseConfig(wpAppId, locale) : null;

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
    : content?.visuals?.heroImages?.primary
      ? `${baseUrl}${encodeImagePath(content.visuals.heroImages.primary)}`
      : content?.visuals?.sampleGallery?.[0]?.src
        ? `${baseUrl}${encodeImagePath(content.visuals.sampleGallery[0].src)}`
        : `${baseUrl}/opengraph-image.png`;
  const schemaScreenshots = heroImages?.slice(0, 3)
    .filter(img => img.src)
    .map(img => ({
      '@type': 'ImageObject',
      url: `${baseUrl}${encodeImagePath(img.src)}`,
      caption: img.alt,
      width: 2480,
      height: 3508,
      encodingFormat: 'image/webp',
    }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${pageUrl}#software`,
    name: `${localizedName} ${localizedSuffix}`,
    description: desc,
    url: pageUrl,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    inLanguage: getHreflangCode(locale),
    image: schemaImage,
    ...(schemaScreenshots?.length && { screenshot: schemaScreenshots }),
    offers: [
      {
        '@type': 'Offer',
        price: '49',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: 'Commercial license — remove watermark, sell on Etsy, KDP, TPT',
        priceValidUntil: '2026-12-31',
      },
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: ui.watermarkNote,
      },
    ],
    author: {
      '@type': 'Organization',
      name: 'LessonCraftStudio',
      url: 'https://www.lessoncraftstudio.com',
    },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.speakable-headline', '.speakable-summary'] },
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

  // WebPage schema with primaryImageOfPage — aligns Google's thumbnail signal
  const schemaImageCaption = heroImages?.[0]?.alt
    || content?.visuals?.heroImages?.primaryAlt
    || `${localizedName} ${localizedSuffix}`;
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${localizedName} ${localizedSuffix}`,
    description: desc,
    isPartOf: { '@type': 'WebSite', '@id': `${baseUrl}/#website` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: schemaImage,
      contentUrl: schemaImage,
      caption: schemaImageCaption,
      width: 2480,
      height: 3508,
    },
    mainEntity: { '@id': `${pageUrl}#software` },
    inLanguage: getHreflangCode(locale),
  };

  // ── Enriched layout (when content file exists) ──
  if (content) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
        />
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
        {/* ImageObject schemas for showcase images (hero, tiered, spotlight, gallery) */}
        {(() => {
          const galleryUrls = new Set(content.visuals.sampleGallery.slice(0, 6).map(img => `${baseUrl}${encodeImagePath(img.src)}`));
          const showcaseSchemas = generateShowcaseImageSchemas(showcaseConfig, locale, pageUrl, galleryUrls);
          return showcaseSchemas.length > 0 ? (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(showcaseSchemas) }} />
          ) : null;
        })()}
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
                    <h1 className="speakable-headline text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                      {content.hero.title}
                    </h1>
                    <p className="text-lg font-medium text-indigo-600 mb-4">{content.hero.tagline}</p>
                    <ReadMoreText text={content.hero.description} locale={locale} className="speakable-summary text-gray-600 mb-6" lines={10} />
                    <div className="flex flex-wrap items-center gap-3">
                      <TryFreeButton launchUrl={launchUrl} label={ui.tryFree} />
                      <BuyButton appId={wpAppId} locale={locale} variant="default" />
                    </div>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
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
