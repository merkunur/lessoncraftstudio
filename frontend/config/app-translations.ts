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

// ============================================================
// APP NAME TRANSLATIONS (33 apps x 11 locales)
// ============================================================

export const APP_NAME_TRANSLATIONS: Record<AppId, Record<Locale, string>> = {
  // ── Math (6) ──
  'addition': {
    en: 'Addition', de: 'Addition', fr: 'Addition', es: 'Sumas', it: 'Addizioni',
    pt: 'Adi\u00e7\u00e3o', nl: 'Optellen', da: 'Addition', sv: 'Addition', no: 'Addisjon', fi: 'Yhteenlasku',
  },
  'subtraction': {
    en: 'Subtraction', de: 'Subtraktion', fr: 'Soustraction', es: 'Restas', it: 'Sottrazioni',
    pt: 'Subtra\u00e7\u00e3o', nl: 'Aftrekken', da: 'Subtraktion', sv: 'Subtraktion', no: 'Subtraksjon', fi: 'V\u00e4hennyslasku',
  },
  'code-addition': {
    en: 'Code Addition', de: 'Rechencode', fr: 'Addition cod\u00e9e', es: 'Sumas con c\u00f3digo', it: 'Addizioni in codice',
    pt: 'Adi\u00e7\u00e3o com c\u00f3digo', nl: 'Optellen met code', da: 'Kodeaddition', sv: 'Kodaddition', no: 'Kodeaddisjon', fi: 'Koodiyhteenlasku',
  },
  'more-less': {
    en: 'More or Less', de: 'Mehr oder weniger', fr: 'Plus ou moins', es: 'M\u00e1s o menos', it: 'Di pi\u00f9 o di meno',
    pt: 'Mais ou menos', nl: 'Meer of minder', da: 'Mere eller mindre', sv: 'Mer eller mindre', no: 'Mer eller mindre', fi: 'Enemm\u00e4n vai v\u00e4hemm\u00e4n',
  },
  'math-puzzle': {
    en: 'Math Puzzle', de: 'Mathe-Puzzle', fr: 'Puzzle math\u00e9matique', es: 'Rompecabezas matem\u00e1tico', it: 'Puzzle matematico',
    pt: 'Quebra-cabe\u00e7a matem\u00e1tico', nl: 'Rekenpuzzel', da: 'Mattepuslespil', sv: 'Mattepussel', no: 'Mattepuslespill', fi: 'Matemaattinen palapeli',
  },
  'math-worksheet': {
    en: 'Math Worksheet', de: 'Mathe-Arbeitsblatt', fr: 'Fiche de maths', es: 'Ficha de matem\u00e1ticas', it: 'Scheda di matematica',
    pt: 'Atividade de matem\u00e1tica', nl: 'Rekenwerkblad', da: 'Regneopgaver', sv: 'Matte\u00f6vningsblad', no: 'Matteoppgaver', fi: 'Matematiikkateht\u00e4v\u00e4t',
  },

  // ── Literacy (7) ──
  'alphabet-train': {
    en: 'Alphabet Train', de: 'ABC-Zug', fr: 'Train de l\'alphabet', es: 'Tren del abecedario', it: 'Trenino dell\'alfabeto',
    pt: 'Trenzinho do alfabeto', nl: 'Alfabettrein', da: 'Alfabettog', sv: 'Alfabet\u00e5t\u00e5get', no: 'Alfabettoget', fi: 'Aakkosjuna',
  },
  'prepositions': {
    en: 'Prepositions', de: 'Pr\u00e4positionen', fr: 'Pr\u00e9positions', es: 'Preposiciones', it: 'Preposizioni',
    pt: 'Preposi\u00e7\u00f5es', nl: 'Voorzetsels', da: 'Forholdsord', sv: 'Prepositioner', no: 'Preposisjoner', fi: 'Prepositiot',
  },
  'word-guess': {
    en: 'Word Guess', de: 'Wort erraten', fr: 'Devine le mot', es: 'Adivina la palabra', it: 'Indovina la parola',
    pt: 'Adivinhe a palavra', nl: 'Raad het woord', da: 'G\u00e6t ordet', sv: 'Gissa ordet', no: 'Gjett ordet', fi: 'Arvaa sana',
  },
  'word-scramble': {
    en: 'Word Scramble', de: 'Buchstabensalat', fr: 'Lettres m\u00e9lang\u00e9es', es: 'Letras revueltas', it: 'Anagrammi',
    pt: 'Embaralha letras', nl: 'Letterpuzzel', da: 'Bogstavsalat', sv: 'Bokstavslek', no: 'Bokstavmiks', fi: 'Kirjainsekoitus',
  },
  'wordsearch': {
    en: 'Word Search', de: 'Wortsuche', fr: 'Mots m\u00eal\u00e9s', es: 'Sopa de letras', it: 'Cerca parole',
    pt: 'Ca\u00e7a-palavras', nl: 'Woordzoeker', da: 'Find ord', sv: 'Ords\u00f6k', no: 'Finn ord', fi: 'Sananetsint\u00e4',
  },
  'cryptogram': {
    en: 'Cryptogram', de: 'Kryptogramm', fr: 'Cryptogramme', es: 'Criptograma', it: 'Crittogramma',
    pt: 'Criptograma', nl: 'Cryptogram', da: 'Kryptogram', sv: 'Kryptogram', no: 'Kryptogram', fi: 'Kryptogrammi',
  },
  'writing': {
    en: 'Writing', de: 'Schreiben', fr: '\u00c9criture', es: 'Escritura', it: 'Scrittura',
    pt: 'Escrita', nl: 'Schrijven', da: 'Skrivning', sv: 'Skrivning', no: 'Skriving', fi: 'Kirjoittaminen',
  },

  // ── Visual (7) ──
  'big-small': {
    en: 'Big & Small', de: 'Gro\u00df & Klein', fr: 'Grand et petit', es: 'Grande y peque\u00f1o', it: 'Grande e piccolo',
    pt: 'Grande e pequeno', nl: 'Groot en klein', da: 'Stor og lille', sv: 'Stor och liten', no: 'Stor og liten', fi: 'Iso ja pieni',
  },
  'pattern-train': {
    en: 'Pattern Train', de: 'Musterzug', fr: 'Train des motifs', es: 'Tren de patrones', it: 'Trenino dei pattern',
    pt: 'Trem de padr\u00f5es', nl: 'Patroontrein', da: 'M\u00f8nstertog', sv: 'M\u00f6nstert\u00e5g', no: 'M\u00f8nstertog', fi: 'Kuviojuna',
  },
  'pattern-worksheet': {
    en: 'Pattern Worksheet', de: 'Muster-Arbeitsblatt', fr: 'Fiche de motifs', es: 'Ficha de patrones', it: 'Scheda dei pattern',
    pt: 'Atividade de padr\u00f5es', nl: 'Patronenwerkblad', da: 'M\u00f8nsteropgaver', sv: 'M\u00f6nster\u00f6vningsblad', no: 'M\u00f8nsteroppgaver', fi: 'Kuvioteht\u00e4v\u00e4t',
  },
  'draw-and-color': {
    en: 'Draw & Color', de: 'Zeichnen & Ausmalen', fr: 'Dessiner et colorier', es: 'Dibujar y colorear', it: 'Disegna e colora',
    pt: 'Desenhe e pinte', nl: 'Tekenen en kleuren', da: 'Tegn og mal', sv: 'Rita och m\u00e5la', no: 'Tegn og mal', fi: 'Piirr\u00e4 ja v\u00e4rit\u00e4',
  },
  'drawing-lines': {
    en: 'Drawing Lines', de: 'Linien zeichnen', fr: 'Tracer des lignes', es: 'Trazar l\u00edneas', it: 'Traccia le linee',
    pt: 'Tra\u00e7ando linhas', nl: 'Lijnen trekken', da: 'Tegn streger', sv: 'Dra streck', no: 'Tegn linjer', fi: 'Viivojen piirt\u00e4minen',
  },
  'coloring': {
    en: 'Coloring', de: 'Ausmalen', fr: 'Coloriage', es: 'Colorear', it: 'Colorare',
    pt: 'Colorir', nl: 'Kleuren', da: 'Tegnesider', sv: 'M\u00e5larbilder', no: 'Tegnesider', fi: 'V\u00e4ritys',
  },
  'chart-count': {
    en: 'Chart Count', de: 'Diagramm-Z\u00e4hlen', fr: 'Comptage graphique', es: 'Conteo con gr\u00e1ficas', it: 'Conta con i grafici',
    pt: 'Contagem com gr\u00e1ficos', nl: 'Tellen met diagrammen', da: 'T\u00e6l med diagrammer', sv: 'R\u00e4kna med diagram', no: 'Diagramtelling', fi: 'Diagrammilaskenta',
  },

  // ── Matching (5) ──
  'matching': {
    en: 'Matching', de: 'Zuordnung', fr: 'Association', es: 'Relacionar parejas', it: 'Abbinamenti',
    pt: 'Jogo de correspond\u00eancia', nl: 'Koppelen', da: 'Parspil', sv: 'Para ihop', no: 'Finn par', fi: 'Yhdist\u00e4minen',
  },
  'grid-match': {
    en: 'Grid Match', de: 'Gitter-Zuordnung', fr: 'Grille d\'association', es: 'Cuadr\u00edcula de asociaci\u00f3n', it: 'Griglia di abbinamento',
    pt: 'Grade de correspond\u00eancia', nl: 'Raster koppelen', da: 'Gittermatching', sv: 'Rutmatchning', no: 'Rutematching', fi: 'Ruudukkomatch',
  },
  'shadow-match': {
    en: 'Shadow Match', de: 'Schattenspiel', fr: 'Jeu d\'ombres', es: 'Sombras y figuras', it: 'Abbina le ombre',
    pt: 'Combine as sombras', nl: 'Schaduw koppelen', da: 'Skyggespil', sv: 'Skuggmatchning', no: 'Skyggespill', fi: 'Varjoyhdist\u00e4minen',
  },
  'bingo': {
    en: 'Bingo', de: 'Bilder-Bingo', fr: 'Loto images', es: 'Loter\u00eda de im\u00e1genes', it: 'Tombola illustrata',
    pt: 'Bingo de imagens', nl: 'Plaatjesbingo', da: 'Billed-bingo', sv: 'Bildbingo', no: 'Bildebingo', fi: 'Kuvabingo',
  },
  'picture-sort': {
    en: 'Picture Sort', de: 'Bilder sortieren', fr: 'Trier les images', es: 'Ordenar im\u00e1genes', it: 'Ordina le immagini',
    pt: 'Ordenar imagens', nl: 'Plaatjes sorteren', da: 'Sort\u00e9r billeder', sv: 'Sortera bilder', no: 'Sorter bilder', fi: 'Lajittele kuvat',
  },

  // ── Puzzle (4) ──
  'missing-pieces': {
    en: 'Missing Pieces', de: 'Fehlende Teile', fr: 'Pi\u00e8ces manquantes', es: 'Piezas faltantes', it: 'Pezzi mancanti',
    pt: 'Pe\u00e7as faltando', nl: 'Ontbrekende stukjes', da: 'Manglende brikker', sv: 'Saknade bitar', no: 'Manglende brikker', fi: 'Puuttuvat palat',
  },
  'odd-one-out': {
    en: 'Odd One Out', de: 'Was passt nicht?', fr: 'L\'intrus', es: 'El intruso', it: 'L\'intruso',
    pt: 'O intruso', nl: 'Wat hoort er niet bij?', da: 'Find den der ikke h\u00f8rer til', sv: 'Vilken h\u00f6r inte hemma?', no: 'Finn den som ikke h\u00f8rer til', fi: 'Mik\u00e4 ei kuulu joukkoon?',
  },
  'sudoku': {
    en: 'Sudoku', de: 'Sudoku', fr: 'Sudoku', es: 'Sudoku', it: 'Sudoku',
    pt: 'Sudoku', nl: 'Sudoku', da: 'Sudoku', sv: 'Sudoku', no: 'Sudoku', fi: 'Sudoku',
  },
  'picture-path': {
    en: 'Picture Path', de: 'Bilderpfad', fr: 'Chemin d\'images', es: 'Camino de im\u00e1genes', it: 'Percorso di immagini',
    pt: 'Caminho de imagens', nl: 'Plaatjespad', da: 'Billedsti', sv: 'Bildv\u00e4g', no: 'Bildesti', fi: 'Kuvapolku',
  },

  // ── Search (4) ──
  'find-and-count': {
    en: 'Find & Count', de: 'Suchen & Z\u00e4hlen', fr: 'Chercher et compter', es: 'Buscar y contar', it: 'Cerca e conta',
    pt: 'Encontre e conte', nl: 'Zoek en tel', da: 'Find og t\u00e6l', sv: 'Hitta och r\u00e4kna', no: 'Finn og tell', fi: 'Etsi ja laske',
  },
  'find-objects': {
    en: 'Find Objects', de: 'Suchbilder', fr: 'Cherche et trouve', es: 'Busca y encuentra', it: 'Cerca e trova',
    pt: 'Encontre objetos', nl: 'Zoek en vind', da: 'Find objekterne', sv: 'Hitta f\u00f6rem\u00e5len', no: 'Finn objekter', fi: 'Etsi esineet',
  },
  'crossword': {
    en: 'Crossword', de: 'Kreuzwortr\u00e4tsel', fr: 'Mots crois\u00e9s', es: 'Crucigrama', it: 'Cruciverba',
    pt: 'Palavras cruzadas', nl: 'Kruiswoordpuzzel', da: 'Krydsord', sv: 'Korsord', no: 'Kryssord', fi: 'Ristikko',
  },
  'treasure-hunt': {
    en: 'Treasure Hunt', de: 'Schatzsuche', fr: 'Chasse au tr\u00e9sor', es: 'B\u00fasqueda del tesoro', it: 'Caccia al tesoro',
    pt: 'Ca\u00e7a ao tesouro', nl: 'Schattenjacht', da: 'Skattejagt', sv: 'Skattjakt', no: 'Skattejakt', fi: 'Aarteenetsint\u00e4',
  },
};

// ============================================================
// CATEGORY NAME TRANSLATIONS (6 categories x 11 locales)
// Sourced from apps page localeContent.categories
// ============================================================

export const CATEGORY_NAME_TRANSLATIONS: Record<CategoryId, Record<Locale, string>> = {
  math: {
    en: 'Math Mastery', de: 'Mathematik', fr: 'Math\u00e9matiques', es: 'Matem\u00e1ticas', it: 'Matematica',
    pt: 'Matem\u00e1tica', nl: 'Wiskunde', da: 'Matematik', sv: 'Matematik', no: 'Matematikk', fi: 'Matematiikka',
  },
  literacy: {
    en: 'Literacy & Language', de: 'Lesen & Sprache', fr: 'Lecture & Langage', es: 'Lectura y Lenguaje', it: 'Lettura e Linguaggio',
    pt: 'Leitura e Linguagem', nl: 'Lezen & Taal', da: 'L\u00e6sning & Sprog', sv: 'L\u00e4sning & Spr\u00e5k', no: 'Lesing & Spr\u00e5k', fi: 'Lukutaito & Kieli',
  },
  visual: {
    en: 'Visual Learning', de: 'Visuelles Lernen', fr: 'Apprentissage visuel', es: 'Aprendizaje Visual', it: 'Apprendimento Visivo',
    pt: 'Aprendizagem Visual', nl: 'Visueel Leren', da: 'Visuel L\u00e6ring', sv: 'Visuellt L\u00e4rande', no: 'Visuell L\u00e6ring', fi: 'Visuaalinen oppiminen',
  },
  matching: {
    en: 'Matching & Sorting', de: 'Zuordnung & Sortierung', fr: 'Association & Tri', es: 'Emparejamiento', it: 'Abbinamento',
    pt: 'Correspond\u00eancia', nl: 'Matchen & Sorteren', da: 'Matching & Sortering', sv: 'Matchning & Sortering', no: 'Matching & Sortering', fi: 'Yhdist\u00e4minen & Lajittelu',
  },
  puzzle: {
    en: 'Puzzles & Logic', de: 'R\u00e4tsel & Logik', fr: 'Puzzles & Logique', es: 'Puzzles y L\u00f3gica', it: 'Puzzle e Logica',
    pt: 'Puzzles e L\u00f3gica', nl: 'Puzzels & Logica', da: 'Puslespil & Logik', sv: 'Pussel & Logik', no: 'Puslespill & Logikk', fi: 'Palapelit & Logiikka',
  },
  search: {
    en: 'Search & Find', de: 'Suchen & Finden', fr: 'Chercher & Trouver', es: 'Busca y Encuentra', it: 'Cerca e Trova',
    pt: 'Procure e Encontre', nl: 'Zoeken & Vinden', da: 'S\u00f8g & Find', sv: 'S\u00f6k & Hitta', no: 'S\u00f8k & Finn', fi: 'Etsi & L\u00f6yd\u00e4',
  },
};

// ============================================================
// "WORKSHEET GENERATOR" SUFFIX (11 locales)
// ============================================================

export const WORKSHEET_GENERATOR_SUFFIX: Record<Locale, string> = {
  en: 'Worksheet Generator',
  de: 'Arbeitsblatt-Generator',
  fr: 'G\u00e9n\u00e9rateur de fiches',
  es: 'Generador de fichas',
  it: 'Generatore di schede',
  pt: 'Gerador de atividades',
  nl: 'Werkblad-generator',
  da: 'Opgave-generator',
  sv: 'Arbetsblads-generator',
  no: 'Oppgave-generator',
  fi: 'Teht\u00e4v\u00e4generaattori',
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
