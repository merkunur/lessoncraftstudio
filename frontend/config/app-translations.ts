/**
 * Shared app translations for all 33 apps across 11 locales.
 *
 * Source of truth for localized app names, category names, and the
 * "Worksheet Generator" suffix used on apps listing and detail pages.
 *
 * Extracted from homepage AppCategories.tsx translations +
 * apps page localeContent category names.
 */

import type { AppId, CategoryId } from './warriorplus-products';

type Locale = 'en' | 'de' | 'fr' | 'es' | 'it' | 'pt' | 'nl' | 'da' | 'sv' | 'no' | 'fi';
export type TierId = 'commercial' | 'full-access';

// ============================================================
// APP NAME TRANSLATIONS (33 apps x 11 locales)
// ============================================================

export const APP_NAME_TRANSLATIONS: Record<AppId, Record<Locale, string>> = {
  // ── Math (6) ──
  'addition': {
    en: 'Addition', de: 'Addition', fr: 'Addition', es: 'Sumas', it: 'Addizioni',
    pt: 'Adição', nl: 'Optellen', da: 'Addition', sv: 'Addition', no: 'Addisjon', fi: 'Yhteenlasku',
  },
  'subtraction': {
    en: 'Subtraction', de: 'Subtraktion', fr: 'Soustraction', es: 'Restas', it: 'Sottrazioni',
    pt: 'Subtração', nl: 'Aftrekken', da: 'Subtraktion', sv: 'Subtraktion', no: 'Subtraksjon', fi: 'Vähennyslasku',
  },
  'code-addition': {
    en: 'Code Addition', de: 'Rechencode', fr: 'Addition codée', es: 'Sumas con código', it: 'Addizioni in codice',
    pt: 'Adição com código', nl: 'Optellen met code', da: 'Kodeaddition', sv: 'Kodaddition', no: 'Kodeaddisjon', fi: 'Koodiyhteenlasku',
  },
  'more-less': {
    en: 'More or Less', de: 'Mehr oder weniger', fr: 'Plus ou moins', es: 'Más o menos', it: 'Di più o di meno',
    pt: 'Mais ou menos', nl: 'Meer of minder', da: 'Mere eller mindre', sv: 'Mer eller mindre', no: 'Mer eller mindre', fi: 'Enemmän vai vähemmän',
  },
  'math-puzzle': {
    en: 'Math Puzzle', de: 'Mathe-Puzzle', fr: 'Puzzle mathématique', es: 'Rompecabezas matemático', it: 'Puzzle matematico',
    pt: 'Quebra-cabeça matemático', nl: 'Rekenpuzzel', da: 'Mattepuslespil', sv: 'Mattepussel', no: 'Mattepuslespill', fi: 'Matemaattinen palapeli',
  },
  'math-worksheet': {
    en: 'Math Worksheet', de: 'Mathe-Arbeitsblatt', fr: 'Fiche de maths', es: 'Ficha de matemáticas', it: 'Scheda di matematica',
    pt: 'Atividade de matemática', nl: 'Rekenwerkblad', da: 'Regneopgaver', sv: 'Matteövningsblad', no: 'Matteoppgaver', fi: 'Matematiikkatehtävät',
  },

  // ── Literacy (7) ──
  'alphabet-train': {
    en: 'Alphabet Train', de: 'ABC-Zug', fr: 'Train de l'alphabet', es: 'Tren del abecedario', it: 'Trenino dell'alfabeto',
    pt: 'Trenzinho do alfabeto', nl: 'Alfabettrein', da: 'Alfabettog', sv: 'Alfabetåtåget', no: 'Alfabettoget', fi: 'Aakkosjuna',
  },
  'prepositions': {
    en: 'Prepositions', de: 'Präpositionen', fr: 'Prépositions', es: 'Preposiciones', it: 'Preposizioni',
    pt: 'Preposições', nl: 'Voorzetsels', da: 'Forholdsord', sv: 'Prepositioner', no: 'Preposisjoner', fi: 'Prepositiot',
  },
  'word-guess': {
    en: 'Word Guess', de: 'Wort erraten', fr: 'Devine le mot', es: 'Adivina la palabra', it: 'Indovina la parola',
    pt: 'Adivinhe a palavra', nl: 'Raad het woord', da: 'Gæt ordet', sv: 'Gissa ordet', no: 'Gjett ordet', fi: 'Arvaa sana',
  },
  'word-scramble': {
    en: 'Word Scramble', de: 'Buchstabensalat', fr: 'Lettres mélangées', es: 'Letras revueltas', it: 'Anagrammi',
    pt: 'Embaralha letras', nl: 'Letterpuzzel', da: 'Bogstavsalat', sv: 'Bokstavslek', no: 'Bokstavmiks', fi: 'Kirjainsekoitus',
  },
  'wordsearch': {
    en: 'Word Search', de: 'Wortsuche', fr: 'Mots mêlés', es: 'Sopa de letras', it: 'Cerca parole',
    pt: 'Caça-palavras', nl: 'Woordzoeker', da: 'Find ord', sv: 'Ordsök', no: 'Finn ord', fi: 'Sananetsintä',
  },
  'cryptogram': {
    en: 'Cryptogram', de: 'Kryptogramm', fr: 'Cryptogramme', es: 'Criptograma', it: 'Crittogramma',
    pt: 'Criptograma', nl: 'Cryptogram', da: 'Kryptogram', sv: 'Kryptogram', no: 'Kryptogram', fi: 'Kryptogrammi',
  },
  'writing': {
    en: 'Writing', de: 'Schreiben', fr: 'Écriture', es: 'Escritura', it: 'Scrittura',
    pt: 'Escrita', nl: 'Schrijven', da: 'Skrivning', sv: 'Skrivning', no: 'Skriving', fi: 'Kirjoittaminen',
  },

  // ── Visual (7) ──
  'big-small': {
    en: 'Big & Small', de: 'Groß & Klein', fr: 'Grand et petit', es: 'Grande y pequeño', it: 'Grande e piccolo',
    pt: 'Grande e pequeno', nl: 'Groot en klein', da: 'Stor og lille', sv: 'Stor och liten', no: 'Stor og liten', fi: 'Iso ja pieni',
  },
  'pattern-train': {
    en: 'Pattern Train', de: 'Musterzug', fr: 'Train des motifs', es: 'Tren de patrones', it: 'Trenino dei pattern',
    pt: 'Trem de padrões', nl: 'Patroontrein', da: 'Mønstertog', sv: 'Mönstertåg', no: 'Mønstertog', fi: 'Kuviojuna',
  },
  'pattern-worksheet': {
    en: 'Pattern Worksheet', de: 'Muster-Arbeitsblatt', fr: 'Fiche de motifs', es: 'Ficha de patrones', it: 'Scheda dei pattern',
    pt: 'Atividade de padrões', nl: 'Patronenwerkblad', da: 'Mønsteropgaver', sv: 'Mönsterövningsblad', no: 'Mønsteroppgaver', fi: 'Kuviotehtävät',
  },
  'draw-and-color': {
    en: 'Draw & Color', de: 'Zeichnen & Ausmalen', fr: 'Dessiner et colorier', es: 'Dibujar y colorear', it: 'Disegna e colora',
    pt: 'Desenhe e pinte', nl: 'Tekenen en kleuren', da: 'Tegn og mal', sv: 'Rita och måla', no: 'Tegn og mal', fi: 'Piirrä ja väritä',
  },
  'drawing-lines': {
    en: 'Drawing Lines', de: 'Linien zeichnen', fr: 'Tracer des lignes', es: 'Trazar líneas', it: 'Traccia le linee',
    pt: 'Traçando linhas', nl: 'Lijnen trekken', da: 'Tegn streger', sv: 'Dra streck', no: 'Tegn linjer', fi: 'Viivojen piirtäminen',
  },
  'coloring': {
    en: 'Coloring', de: 'Ausmalen', fr: 'Coloriage', es: 'Colorear', it: 'Colorare',
    pt: 'Colorir', nl: 'Kleuren', da: 'Tegnesider', sv: 'Målarbilder', no: 'Tegnesider', fi: 'Väritys',
  },
  'chart-count': {
    en: 'Chart Count', de: 'Diagramm-Zählen', fr: 'Comptage graphique', es: 'Conteo con gráficas', it: 'Conta con i grafici',
    pt: 'Contagem com gráficos', nl: 'Tellen met diagrammen', da: 'Tæl med diagrammer', sv: 'Räkna med diagram', no: 'Diagramtelling', fi: 'Diagrammilaskenta',
  },

  // ── Matching (5) ──
  'matching': {
    en: 'Matching', de: 'Zuordnung', fr: 'Association', es: 'Relacionar parejas', it: 'Abbinamenti',
    pt: 'Jogo de correspondência', nl: 'Koppelen', da: 'Parspil', sv: 'Para ihop', no: 'Finn par', fi: 'Yhdistäminen',
  },
  'grid-match': {
    en: `Grid Match`, de: `Gitter-Zuordnung`, fr: `Grille d'association`, es: `Cuadrícula de asociación`, it: `Griglia di abbinamento`,
    pt: 'Grade de correspondência', nl: 'Raster koppelen', da: 'Gittermatching', sv: 'Rutmatchning', no: 'Rutematching', fi: 'Ruudukkomatch',
  },
  'shadow-match': {
    en: `Shadow Match`, de: `Schattenspiel`, fr: `Jeu d'ombres`, es: `Sombras y figuras`, it: `Abbina le ombre`,
    pt: 'Combine as sombras', nl: 'Schaduw koppelen', da: 'Skyggespil', sv: 'Skuggmatchning', no: 'Skyggespill', fi: 'Varjoyhdistäminen',
  },
  'bingo': {
    en: 'Bingo', de: 'Bilder-Bingo', fr: 'Loto images', es: 'Lotería de imágenes', it: 'Tombola illustrata',
    pt: 'Bingo de imagens', nl: 'Plaatjesbingo', da: 'Billed-bingo', sv: 'Bildbingo', no: 'Bildebingo', fi: 'Kuvabingo',
  },
  'picture-sort': {
    en: 'Picture Sort', de: 'Bilder sortieren', fr: 'Trier les images', es: 'Ordenar imágenes', it: 'Ordina le immagini',
    pt: 'Ordenar imagens', nl: 'Plaatjes sorteren', da: 'Sortér billeder', sv: 'Sortera bilder', no: 'Sorter bilder', fi: 'Lajittele kuvat',
  },

  // ── Puzzle (4) ──
  'missing-pieces': {
    en: 'Missing Pieces', de: 'Fehlende Teile', fr: 'Pièces manquantes', es: 'Piezas faltantes', it: 'Pezzi mancanti',
    pt: 'Peças faltando', nl: 'Ontbrekende stukjes', da: 'Manglende brikker', sv: 'Saknade bitar', no: 'Manglende brikker', fi: 'Puuttuvat palat',
  },
  'odd-one-out': {
    en: 'Odd One Out', de: 'Was passt nicht?', fr: 'L'intrus', es: 'El intruso', it: 'L'intruso',
    pt: 'O intruso', nl: 'Wat hoort er niet bij?', da: 'Find den der ikke hører til', sv: 'Vilken hör inte hemma?', no: 'Finn den som ikke hører til', fi: 'Mikä ei kuulu joukkoon?',
  },
  'sudoku': {
    en: 'Sudoku', de: 'Sudoku', fr: 'Sudoku', es: 'Sudoku', it: 'Sudoku',
    pt: 'Sudoku', nl: 'Sudoku', da: 'Sudoku', sv: 'Sudoku', no: 'Sudoku', fi: 'Sudoku',
  },
  'picture-path': {
    en: `Picture Path`, de: `Bilderpfad`, fr: `Chemin d'images`, es: `Camino de imágenes`, it: `Percorso di immagini`,
    pt: 'Caminho de imagens', nl: 'Plaatjespad', da: 'Billedsti', sv: 'Bildväg', no: 'Bildesti', fi: 'Kuvapolku',
  },

  // ── Search (4) ──
  'find-and-count': {
    en: 'Find & Count', de: 'Suchen & Zählen', fr: 'Chercher et compter', es: 'Buscar y contar', it: 'Cerca e conta',
    pt: 'Encontre e conte', nl: 'Zoek en tel', da: 'Find og tæl', sv: 'Hitta och räkna', no: 'Finn og tell', fi: 'Etsi ja laske',
  },
  'find-objects': {
    en: 'Find Objects', de: 'Suchbilder', fr: 'Cherche et trouve', es: 'Busca y encuentra', it: 'Cerca e trova',
    pt: 'Encontre objetos', nl: 'Zoek en vind', da: 'Find objekterne', sv: 'Hitta föremålen', no: 'Finn objekter', fi: 'Etsi esineet',
  },
  'crossword': {
    en: 'Crossword', de: 'Kreuzworträtsel', fr: 'Mots croisés', es: 'Crucigrama', it: 'Cruciverba',
    pt: 'Palavras cruzadas', nl: 'Kruiswoordpuzzel', da: 'Krydsord', sv: 'Korsord', no: 'Kryssord', fi: 'Ristikko',
  },
  'treasure-hunt': {
    en: 'Treasure Hunt', de: 'Schatzsuche', fr: 'Chasse au trésor', es: 'Búsqueda del tesoro', it: 'Caccia al tesoro',
    pt: 'Caça ao tesouro', nl: 'Schattenjacht', da: 'Skattejagt', sv: 'Skattjakt', no: 'Skattejakt', fi: 'Aarteenetsintä',
  },
};

// ============================================================
// CATEGORY NAME TRANSLATIONS (6 categories x 11 locales)
// Sourced from apps page localeContent.categories
// ============================================================

export const CATEGORY_NAME_TRANSLATIONS: Record<CategoryId, Record<Locale, string>> = {
  math: {
    en: 'Math Mastery', de: 'Mathematik', fr: 'Mathématiques', es: 'Matemáticas', it: 'Matematica',
    pt: 'Matemática', nl: 'Wiskunde', da: 'Matematik', sv: 'Matematik', no: 'Matematikk', fi: 'Matematiikka',
  },
  literacy: {
    en: 'Literacy & Language', de: 'Lesen & Sprache', fr: 'Lecture & Langage', es: 'Lectura y Lenguaje', it: 'Lettura e Linguaggio',
    pt: 'Leitura e Linguagem', nl: 'Lezen & Taal', da: 'Læsning & Sprog', sv: 'Läsning & Språk', no: 'Lesing & Språk', fi: 'Lukutaito & Kieli',
  },
  visual: {
    en: 'Visual Learning', de: 'Visuelles Lernen', fr: 'Apprentissage visuel', es: 'Aprendizaje Visual', it: 'Apprendimento Visivo',
    pt: 'Aprendizagem Visual', nl: 'Visueel Leren', da: 'Visuel Læring', sv: 'Visuellt Lärande', no: 'Visuell Læring', fi: 'Visuaalinen oppiminen',
  },
  matching: {
    en: 'Matching & Sorting', de: 'Zuordnung & Sortierung', fr: 'Association & Tri', es: 'Emparejamiento', it: 'Abbinamento',
    pt: 'Correspondência', nl: 'Matchen & Sorteren', da: 'Matching & Sortering', sv: 'Matchning & Sortering', no: 'Matching & Sortering', fi: 'Yhdistäminen & Lajittelu',
  },
  puzzle: {
    en: 'Puzzles & Logic', de: 'Rätsel & Logik', fr: 'Puzzles & Logique', es: 'Puzzles y Lógica', it: 'Puzzle e Logica',
    pt: 'Puzzles e Lógica', nl: 'Puzzels & Logica', da: 'Puslespil & Logik', sv: 'Pussel & Logik', no: 'Puslespill & Logikk', fi: 'Palapelit & Logiikka',
  },
  search: {
    en: 'Search & Find', de: 'Suchen & Finden', fr: 'Chercher & Trouver', es: 'Busca y Encuentra', it: 'Cerca e Trova',
    pt: 'Procure e Encontre', nl: 'Zoeken & Vinden', da: 'Søg & Find', sv: 'Sök & Hitta', no: 'Søk & Finn', fi: 'Etsi & Löydä',
  },
};

// ============================================================
// "WORKSHEET GENERATOR" SUFFIX (11 locales)
// ============================================================

export const WORKSHEET_GENERATOR_SUFFIX: Record<Locale, string> = {
  en: 'Worksheet Generator',
  de: 'Arbeitsblatt-Generator',
  fr: 'Générateur de fiches',
  es: 'Generador de fichas',
  it: 'Generatore di schede',
  pt: 'Gerador de atividades',
  nl: 'Werkblad-generator',
  da: 'Opgave-generator',
  sv: 'Arbetsblads-generator',
  no: 'Oppgave-generator',
  fi: 'Tehtävägeneraattori',
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function getLocalizedAppName(appId: string, locale: string): string {
  const translations = APP_NAME_TRANSLATIONS[appId as AppId];
  if (!translations) return appId;
  return translations[locale as Locale] || translations.en;
}

export function getLocalizedCategoryName(categoryId: string, locale: string): string {
  const translations = CATEGORY_NAME_TRANSLATIONS[categoryId as CategoryId];
  if (!translations) return categoryId;
  return translations[locale as Locale] || translations.en;
}

export function getLocalizedSuffix(locale: string): string {
  return WORKSHEET_GENERATOR_SUFFIX[locale as Locale] || WORKSHEET_GENERATOR_SUFFIX.en;
}

// ============================================================
// TIER NAME TRANSLATIONS (2 tiers x 11 locales)
// ============================================================

export const TIER_NAME_TRANSLATIONS: Record<TierId, Record<Locale, string>> = {
  commercial: {
    en: 'Commercial Pack', de: 'Kommerzielles Paket', fr: 'Pack Commercial', es: 'Paquete Comercial', it: 'Pacchetto Commerciale',
    pt: 'Pacote Comercial', nl: 'Commercieel Pakket', da: 'Kommerciel Pakke', sv: 'Kommersiellt Paket', no: 'Kommersiell Pakke', fi: 'Kaupallinen Paketti',
  },
  'full-access': {
    en: 'Full Access Pack', de: 'Vollzugriff-Paket', fr: 'Pack Accès Complet', es: 'Paquete Acceso Completo', it: 'Pacchetto Accesso Completo',
    pt: 'Pacote Acesso Completo', nl: 'Volledig Toegang Pakket', da: 'Fuld Adgang Pakke', sv: 'Fullständigt Paket', no: 'Full Tilgang Pakke', fi: 'Täysi Pääsy -paketti',
  },
};

export function getLocalizedTierName(tierId: string, locale: string): string {
  const translations = TIER_NAME_TRANSLATIONS[tierId as TierId];
  if (!translations) return tierId;
  return translations[locale as Locale] || translations.en;
}
