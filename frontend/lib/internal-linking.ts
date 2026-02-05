/**
 * Internal Linking Utility for SEO
 *
 * Maps keywords, categories, and app IDs to enable cross-linking between:
 * - Blog posts → Product pages
 * - Product pages → Blog posts
 *
 * Pure utility functions with no side effects.
 */

import { appsConfig, type AppConfig } from './apps-config';
import { productPageSlugs, type SupportedLocale } from '@/config/product-page-slugs';

/**
 * Keyword groups that map to specific product types
 * These are used to match blog post content to relevant products
 */
const KEYWORD_PRODUCT_MAP: Record<string, string[]> = {
  // Math keywords
  'addition': ['image-addition', 'code-addition', 'math-worksheet'],
  'subtraction': ['subtraction', 'math-worksheet'],
  'math': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
  'counting': ['find-and-count', 'chart-count-color', 'more-less'],
  'numbers': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],

  // Language Arts keywords
  'vocabulary': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
  'words': ['word-search', 'word-scramble', 'word-guess'],
  'alphabet': ['alphabet-train', 'writing-app'],
  'letters': ['alphabet-train', 'writing-app'],
  'writing': ['writing-app', 'story-dice'],
  'handwriting': ['writing-app', 'drawing-lines'],
  'spelling': ['word-search', 'word-scramble', 'image-crossword'],
  'crossword': ['image-crossword'],
  'puzzle': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],

  // Logic & Patterns keywords
  'pattern': ['pattern-worksheet', 'pattern-train'],
  'sequence': ['pattern-worksheet', 'pattern-train'],
  'logic': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
  'sorting': ['picture-sort', 'big-small-app'],
  'matching': ['matching-app', 'shadow-match', 'grid-match'],

  // Visual & Fine Motor keywords
  'coloring': ['coloring', 'draw-and-color'],
  'drawing': ['coloring', 'draw-and-color', 'drawing-lines'],
  'tracing': ['drawing-lines', 'writing-app'],
  'fine motor': ['drawing-lines', 'coloring', 'draw-and-color'],

  // Games & Activities keywords
  'bingo': ['picture-bingo'],
  'game': ['picture-bingo', 'treasure-hunt', 'story-dice'],
  'maze': ['picture-path'],
  'hidden objects': ['find-objects'],

  // Early Childhood keywords
  'preschool': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
  'kindergarten': ['alphabet-train', 'coloring', 'find-and-count', 'matching-app', 'pattern-worksheet'],
  'toddler': ['coloring', 'big-small-app', 'matching-app'],

  // Skill-based keywords
  'visual perception': ['shadow-match', 'find-objects', 'odd-one-out', 'missing-pieces'],
  'critical thinking': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'math-puzzle'],
  'memory': ['matching-app', 'picture-bingo', 'grid-match'],
  'comparison': ['more-less', 'big-small-app'],
  'size': ['big-small-app'],
  'prepositions': ['prepositions'],
  'cryptogram': ['image-cryptogram'],
};

/**
 * Multilingual keyword mappings - maps localized terms to the same app IDs
 * These enable non-English blog posts to match with relevant products
 */
const KEYWORD_TRANSLATIONS: Record<string, Record<string, string[]>> = {
  // German
  de: {
    'addition': ['image-addition', 'code-addition', 'math-worksheet'],
    'subtraktion': ['subtraction', 'math-worksheet'],
    'mathematik': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'rechnen': ['math-worksheet', 'image-addition', 'subtraction'],
    'zählen': ['find-and-count', 'chart-count-color', 'more-less'],
    'zahlen': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'wortschatz': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'wörter': ['word-search', 'word-scramble', 'word-guess'],
    'alphabet': ['alphabet-train', 'writing-app'],
    'buchstaben': ['alphabet-train', 'writing-app'],
    'schreiben': ['writing-app', 'story-dice'],
    'muster': ['pattern-worksheet', 'pattern-train'],
    'logik': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'ausmalen': ['coloring', 'draw-and-color'],
    'malen': ['coloring', 'draw-and-color', 'drawing-lines'],
    'zeichnen': ['coloring', 'draw-and-color', 'drawing-lines'],
    'rätsel': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'puzzle': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'spiel': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'labyrinth': ['picture-path'],
    'vorschule': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
    'kindergarten': ['alphabet-train', 'coloring', 'find-and-count', 'matching-app', 'pattern-worksheet'],
    'versteckte objekte': ['find-objects'],
    'visuelle wahrnehmung': ['shadow-match', 'find-objects', 'odd-one-out', 'missing-pieces'],
    'kritisches denken': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'math-puzzle'],
    'feinmotorik': ['drawing-lines', 'coloring', 'draw-and-color'],
    'handschrift': ['writing-app', 'drawing-lines'],
    'kleinkind': ['coloring', 'big-small-app', 'matching-app'],
    'kreuzwortr\u00e4tsel': ['image-crossword'],
  },
  // French
  fr: {
    'addition': ['image-addition', 'code-addition', 'math-worksheet'],
    'soustraction': ['subtraction', 'math-worksheet'],
    'mathématiques': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'maths': ['math-worksheet', 'math-puzzle', 'image-addition'],
    'compter': ['find-and-count', 'chart-count-color', 'more-less'],
    'nombres': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'vocabulaire': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'mots': ['word-search', 'word-scramble', 'word-guess'],
    'alphabet': ['alphabet-train', 'writing-app'],
    'lettres': ['alphabet-train', 'writing-app'],
    'écriture': ['writing-app', 'story-dice'],
    'motif': ['pattern-worksheet', 'pattern-train'],
    'logique': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'coloriage': ['coloring', 'draw-and-color'],
    'dessin': ['coloring', 'draw-and-color', 'drawing-lines'],
    'puzzle': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'jeu': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'labyrinthe': ['picture-path'],
    'maternelle': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
    'objets cach\u00e9s': ['find-objects'],
    'perception visuelle': ['shadow-match', 'find-objects', 'odd-one-out', 'missing-pieces'],
    'pens\u00e9e critique': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'math-puzzle'],
    'motricit\u00e9 fine': ['drawing-lines', 'coloring', 'draw-and-color'],
    'mots crois\u00e9s': ['image-crossword'],
    'tout-petit': ['coloring', 'big-small-app', 'matching-app'],
  },
  // Spanish
  es: {
    'suma': ['image-addition', 'code-addition', 'math-worksheet'],
    'adición': ['image-addition', 'code-addition', 'math-worksheet'],
    'resta': ['subtraction', 'math-worksheet'],
    'matemáticas': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'contar': ['find-and-count', 'chart-count-color', 'more-less'],
    'números': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'vocabulario': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'palabras': ['word-search', 'word-scramble', 'word-guess'],
    'alfabeto': ['alphabet-train', 'writing-app'],
    'letras': ['alphabet-train', 'writing-app'],
    'escritura': ['writing-app', 'story-dice'],
    'patrón': ['pattern-worksheet', 'pattern-train'],
    'lógica': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'colorear': ['coloring', 'draw-and-color'],
    'dibujo': ['coloring', 'draw-and-color', 'drawing-lines'],
    'rompecabezas': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'juego': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'laberinto': ['picture-path'],
    'preescolar': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
    'objetos ocultos': ['find-objects'],
    'percepci\u00f3n visual': ['shadow-match', 'find-objects', 'odd-one-out', 'missing-pieces'],
    'pensamiento cr\u00edtico': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'math-puzzle'],
    'motricidad fina': ['drawing-lines', 'coloring', 'draw-and-color'],
    'crucigrama': ['image-crossword'],
    'beb\u00e9': ['coloring', 'big-small-app', 'matching-app'],
  },
  // Portuguese
  pt: {
    'adição': ['image-addition', 'code-addition', 'math-worksheet'],
    'soma': ['image-addition', 'code-addition', 'math-worksheet'],
    'subtração': ['subtraction', 'math-worksheet'],
    'matemática': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'contar': ['find-and-count', 'chart-count-color', 'more-less'],
    'números': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'vocabulário': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'palavras': ['word-search', 'word-scramble', 'word-guess'],
    'alfabeto': ['alphabet-train', 'writing-app'],
    'letras': ['alphabet-train', 'writing-app'],
    'escrita': ['writing-app', 'story-dice'],
    'padrão': ['pattern-worksheet', 'pattern-train'],
    'lógica': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'colorir': ['coloring', 'draw-and-color'],
    'desenho': ['coloring', 'draw-and-color', 'drawing-lines'],
    'quebra-cabeça': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'jogo': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'labirinto': ['picture-path'],
    'pré-escolar': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
    'objetos escondidos': ['find-objects'],
    'percep\u00e7\u00e3o visual': ['shadow-match', 'find-objects', 'odd-one-out', 'missing-pieces'],
    'pensamento cr\u00edtico': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'math-puzzle'],
    'motricidade fina': ['drawing-lines', 'coloring', 'draw-and-color'],
    'caligrafia': ['writing-app', 'drawing-lines'],
    'palavras cruzadas': ['image-crossword'],
    'crian\u00e7a pequena': ['coloring', 'big-small-app', 'matching-app'],
  },
  // Italian
  it: {
    'addizione': ['image-addition', 'code-addition', 'math-worksheet'],
    'sottrazione': ['subtraction', 'math-worksheet'],
    'matematica': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'contare': ['find-and-count', 'chart-count-color', 'more-less'],
    'numeri': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'vocabolario': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'parole': ['word-search', 'word-scramble', 'word-guess'],
    'alfabeto': ['alphabet-train', 'writing-app'],
    'lettere': ['alphabet-train', 'writing-app'],
    'scrittura': ['writing-app', 'story-dice'],
    'schema': ['pattern-worksheet', 'pattern-train'],
    'logica': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'colorare': ['coloring', 'draw-and-color'],
    'disegno': ['coloring', 'draw-and-color', 'drawing-lines'],
    'puzzle': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'gioco': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'labirinto': ['picture-path'],
    'prescolare': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
    'oggetti nascosti': ['find-objects'],
    'percezione visiva': ['shadow-match', 'find-objects', 'odd-one-out', 'missing-pieces'],
    'pensiero critico': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'math-puzzle'],
    'motricit\u00e0 fine': ['drawing-lines', 'coloring', 'draw-and-color'],
    'calligrafia': ['writing-app', 'drawing-lines'],
    'cruciverba': ['image-crossword'],
    'bambino piccolo': ['coloring', 'big-small-app', 'matching-app'],
  },
  // Dutch
  nl: {
    'optellen': ['image-addition', 'code-addition', 'math-worksheet'],
    'aftrekken': ['subtraction', 'math-worksheet'],
    'wiskunde': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'rekenen': ['math-worksheet', 'image-addition', 'subtraction'],
    'tellen': ['find-and-count', 'chart-count-color', 'more-less'],
    'getallen': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'woordenschat': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'woorden': ['word-search', 'word-scramble', 'word-guess'],
    'alfabet': ['alphabet-train', 'writing-app'],
    'letters': ['alphabet-train', 'writing-app'],
    'schrijven': ['writing-app', 'story-dice'],
    'patroon': ['pattern-worksheet', 'pattern-train'],
    'logica': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'kleuren': ['coloring', 'draw-and-color'],
    'tekenen': ['coloring', 'draw-and-color', 'drawing-lines'],
    'puzzel': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'spel': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'doolhof': ['picture-path'],
    'kleuterschool': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
    'verborgen voorwerpen': ['find-objects'],
    'visuele waarneming': ['shadow-match', 'find-objects', 'odd-one-out', 'missing-pieces'],
    'kritisch denken': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'math-puzzle'],
    'fijne motoriek': ['drawing-lines', 'coloring', 'draw-and-color'],
    'handschrift': ['writing-app', 'drawing-lines'],
    'kruiswoordpuzzel': ['image-crossword'],
    'peuter': ['coloring', 'big-small-app', 'matching-app'],
  },
  // Swedish
  sv: {
    'addition': ['image-addition', 'code-addition', 'math-worksheet'],
    'subtraktion': ['subtraction', 'math-worksheet'],
    'matematik': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'räkna': ['math-worksheet', 'image-addition', 'subtraction'],
    'räkning': ['find-and-count', 'chart-count-color', 'more-less'],
    'tal': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'ordförråd': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'ord': ['word-search', 'word-scramble', 'word-guess'],
    'alfabet': ['alphabet-train', 'writing-app'],
    'bokstäver': ['alphabet-train', 'writing-app'],
    'skrivning': ['writing-app', 'story-dice'],
    'mönster': ['pattern-worksheet', 'pattern-train'],
    'logik': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'färgläggning': ['coloring', 'draw-and-color'],
    'rita': ['coloring', 'draw-and-color', 'drawing-lines'],
    'pussel': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'spel': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'labyrint': ['picture-path'],
    'förskola': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
    'g\u00f6mda f\u00f6rem\u00e5l': ['find-objects'],
    'visuell perception': ['shadow-match', 'find-objects', 'odd-one-out', 'missing-pieces'],
    'kritiskt t\u00e4nkande': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'math-puzzle'],
    'finmotorik': ['drawing-lines', 'coloring', 'draw-and-color'],
    'handstil': ['writing-app', 'drawing-lines'],
    'korsord': ['image-crossword'],
    'sm\u00e5barn': ['coloring', 'big-small-app', 'matching-app'],
  },
  // Danish
  da: {
    'addition': ['image-addition', 'code-addition', 'math-worksheet'],
    'subtraktion': ['subtraction', 'math-worksheet'],
    'matematik': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'regne': ['math-worksheet', 'image-addition', 'subtraction'],
    'tælle': ['find-and-count', 'chart-count-color', 'more-less'],
    'tal': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'ordforråd': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'ord': ['word-search', 'word-scramble', 'word-guess'],
    'alfabet': ['alphabet-train', 'writing-app'],
    'bogstaver': ['alphabet-train', 'writing-app'],
    'skrivning': ['writing-app', 'story-dice'],
    'mønster': ['pattern-worksheet', 'pattern-train'],
    'logik': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'farvelægning': ['coloring', 'draw-and-color'],
    'tegne': ['coloring', 'draw-and-color', 'drawing-lines'],
    'puslespil': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'spil': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'labyrint': ['picture-path'],
    'b\u00f8rnehave': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
    'gemte genstande': ['find-objects'],
    'visuel perception': ['shadow-match', 'find-objects', 'odd-one-out', 'missing-pieces'],
    'kritisk t\u00e6nkning': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'math-puzzle'],
    'finmotorik': ['drawing-lines', 'coloring', 'draw-and-color'],
    'h\u00e5ndskrift': ['writing-app', 'drawing-lines'],
    'krydsordsopgave': ['image-crossword'],
    'sm\u00e5b\u00f8rn': ['coloring', 'big-small-app', 'matching-app'],
  },
  // Norwegian
  no: {
    'addisjon': ['image-addition', 'code-addition', 'math-worksheet'],
    'subtraksjon': ['subtraction', 'math-worksheet'],
    'matematikk': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'regne': ['math-worksheet', 'image-addition', 'subtraction'],
    'telle': ['find-and-count', 'chart-count-color', 'more-less'],
    'tall': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'ordforråd': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'ord': ['word-search', 'word-scramble', 'word-guess'],
    'alfabet': ['alphabet-train', 'writing-app'],
    'bokstaver': ['alphabet-train', 'writing-app'],
    'skriving': ['writing-app', 'story-dice'],
    'mønster': ['pattern-worksheet', 'pattern-train'],
    'logikk': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'fargelegging': ['coloring', 'draw-and-color'],
    'tegne': ['coloring', 'draw-and-color', 'drawing-lines'],
    'puslespill': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'spill': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'labyrint': ['picture-path'],
    'barnehage': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
    'gjemte gjenstander': ['find-objects'],
    'visuell persepsjon': ['shadow-match', 'find-objects', 'odd-one-out', 'missing-pieces'],
    'kritisk tenkning': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'math-puzzle'],
    'finmotorikk': ['drawing-lines', 'coloring', 'draw-and-color'],
    'h\u00e5ndskrift': ['writing-app', 'drawing-lines'],
    'kryssord': ['image-crossword'],
    'sm\u00e5barn': ['coloring', 'big-small-app', 'matching-app'],
  },
  // Finnish
  fi: {
    'yhteenlasku': ['image-addition', 'code-addition', 'math-worksheet'],
    'vähennyslasku': ['subtraction', 'math-worksheet'],
    'matematiikka': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'laskea': ['math-worksheet', 'image-addition', 'subtraction'],
    'laskeminen': ['find-and-count', 'chart-count-color', 'more-less'],
    'numerot': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'sanasto': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'sanat': ['word-search', 'word-scramble', 'word-guess'],
    'aakkoset': ['alphabet-train', 'writing-app'],
    'kirjaimet': ['alphabet-train', 'writing-app'],
    'kirjoitus': ['writing-app', 'story-dice'],
    'kuvio': ['pattern-worksheet', 'pattern-train'],
    'logiikka': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'värittäminen': ['coloring', 'draw-and-color'],
    'piirtäminen': ['coloring', 'draw-and-color', 'drawing-lines'],
    'palapeli': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'peli': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'labyrintti': ['picture-path'],
    'esikoulu': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
    'piilotetut esineet': ['find-objects'],
    'visuaalinen havainto': ['shadow-match', 'find-objects', 'odd-one-out', 'missing-pieces'],
    'kriittinen ajattelu': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'math-puzzle'],
    'hienomotoriikka': ['drawing-lines', 'coloring', 'draw-and-color'],
    'k\u00e4siala': ['writing-app', 'drawing-lines'],
    'ristikko': ['image-crossword'],
    'taapero': ['coloring', 'big-small-app', 'matching-app'],
  },
};

/**
 * App name translations for product cards
 * Maps appId to localized names for each supported locale
 * Used by appIdToProduct() to return localized product names
 */
const APP_NAME_TRANSLATIONS: Record<string, Record<string, { name: string; description: string }>> = {
  // German
  de: {
    'word-search': { name: 'Wörtersuche', description: 'Erstelle spannende Wortsuchrätsel mit thematischen Begriffen und Bildern' },
    'image-addition': { name: 'Bildaddition', description: 'Mathe-Arbeitsblätter mit Bildern' },
    'alphabet-train': { name: 'Alphabet-Zug', description: 'Spaßiges Alphabet-Lernen mit bunten Zugwaggons' },
    'coloring': { name: 'Ausmalbilder', description: 'Kreative Ausmalblätter erstellen' },
    'math-worksheet': { name: 'Mathe-Arbeitsblätter', description: 'Anpassbare Rechenübungen' },
    'word-scramble': { name: 'Buchstabensalat', description: 'Wortpuzzle erstellen' },
    'find-and-count': { name: 'Ich sehe was', description: 'Visuelle Zählübungen' },
    'matching-app': { name: 'Zuordnungsspiel', description: 'Paare zuordnen' },
    'drawing-lines': { name: 'Linien Zeichnen', description: 'Linienführung üben' },
    'picture-bingo': { name: 'Bilder-Bingo', description: 'Individuelle Bingo-Karten erstellen' },
    'sudoku': { name: 'Sudoku für Kinder', description: 'Kinderfreundliche Sudoku-Rätsel' },
    'big-small-app': { name: 'Groß oder Klein', description: 'Größenvergleichs-Aktivitäten' },
    'chart-count-color': { name: 'Zähldiagramme', description: 'Daten- und Diagramm-Übungen' },
    'code-addition': { name: 'Code-Addition', description: 'Additionsaufgaben entschlüsseln' },
    'draw-and-color': { name: 'Malen und Ausmalen', description: 'Zeichen- und Ausmal-Kombination' },
    'find-objects': { name: 'Gegenstände Finden', description: 'Versteckte Objekte suchen' },
    'grid-match': { name: 'Raster-Zuordnung', description: 'Muster-Zuordnungs-Gitter' },
    'image-crossword': { name: 'Bilder-Kreuzworträtsel', description: 'Visuelle Kreuzworträtsel mit Bildern' },
    'image-cryptogram': { name: 'Bilder-Kryptogramm', description: 'Nachrichten mit Bildhinweisen entschlüsseln' },
    'math-puzzle': { name: 'Mathe-Rätsel', description: 'Mathematische Denkspiele' },
    'missing-pieces': { name: 'Fehlende Teile', description: 'Bilderpuzzle vervollständigen' },
    'more-less': { name: 'Mehr oder Weniger', description: 'Mengen vergleichen' },
    'odd-one-out': { name: 'Was Passt Nicht', description: 'Das unterschiedliche Element finden' },
    'pattern-train': { name: 'Muster-Zug', description: 'Mustererkennung üben' },
    'pattern-worksheet': { name: 'Muster-Arbeitsblätter', description: 'Musterfolgen vervollständigen' },
    'picture-path': { name: 'Bilder-Pfad', description: 'Pfadfindung mit Bildern' },
    'picture-sort': { name: 'Bilder Sortieren', description: 'Bilder kategorisieren' },
    'prepositions': { name: 'Präpositionen', description: 'Präpositionen mit visuellen Beispielen lernen' },
    'shadow-match': { name: 'Schatten Zuordnen', description: 'Objekte ihren Schatten zuordnen' },
    'story-dice': { name: 'Geschichtenwürfel', description: 'Geschichten mit Bildwürfeln erstellen' },
    'subtraction': { name: 'Subtraktion', description: 'Visuelle Subtraktions-Arbeitsblätter' },
    'treasure-hunt': { name: 'Schatzsuche', description: 'Schatzsuche-Aktivitäten erstellen' },
    'word-guess': { name: 'Wort Erraten', description: 'Wörter anhand von Bildhinweisen erraten' },
    'writing-app': { name: 'Schreibübungen', description: 'Handschrift-Übungsblätter' },
  },
  // Dutch
  nl: {
    'word-search': { name: 'Woordzoeker', description: 'Maak boeiende woordzoekers' },
    'image-addition': { name: 'Sommen met Plaatjes', description: 'Rekenwerkbladen met afbeeldingen' },
    'alphabet-train': { name: 'Alfabettrein', description: 'Leuk alfabetleren met kleurrijke treinwagons' },
    'coloring': { name: 'Kleurplaten', description: 'Kleurplaten maken' },
    'math-worksheet': { name: 'Rekenwerkbladen', description: 'Aanpasbare rekenbladen' },
    'word-scramble': { name: 'Letterkraker', description: 'Woordpuzzelspellen' },
    'find-and-count': { name: 'Ik zie, ik zie', description: 'Visuele teloefeningen' },
    'matching-app': { name: 'Koppelspel', description: 'Paren matchen' },
    'drawing-lines': { name: 'Lijnen Trekken', description: 'Lijntekenoefeningen' },
    'picture-bingo': { name: 'Plaatjesbingo', description: 'Aangepaste bingokaarten maken' },
    'sudoku': { name: 'Sudoku voor Kinderen', description: 'Kindvriendelijke sudoku' },
    'big-small-app': { name: 'Groot of Klein', description: 'Groottes vergelijken activiteiten' },
    'chart-count-color': { name: 'Telgrafieken', description: 'Data en grafiek oefeningen' },
    'code-addition': { name: 'Sommen in Code', description: 'Ontcijfer optellingen' },
    'draw-and-color': { name: 'Teken en Kleur', description: 'Teken- en kleuren combinatie' },
    'find-objects': { name: 'Zoek de Voorwerpen', description: 'Verborgen voorwerpen spellen' },
    'grid-match': { name: 'Raster Koppelen', description: 'Patroon koppelrasters' },
    'image-crossword': { name: 'Kruiswoordpuzzel met Plaatjes', description: 'Visuele kruiswoordpuzzels met afbeeldingen' },
    'image-cryptogram': { name: 'Cryptogram met Plaatjes', description: 'Decodeer berichten met afbeeldingen' },
    'math-puzzle': { name: 'Rekenraadsels', description: 'Wiskundige puzzels' },
    'missing-pieces': { name: 'Ontbrekende Stukjes', description: 'Afbeelding puzzels voltooien' },
    'more-less': { name: 'Meer of Minder', description: 'Vergelijk hoeveelheden' },
    'odd-one-out': { name: 'De Vreemde Eend', description: 'Vind het verschillende item' },
    'pattern-train': { name: 'Patronentrein', description: 'Patroonherkenning oefenen' },
    'pattern-worksheet': { name: 'Patroonwerkbladen', description: 'Voltooi patroonreeksen' },
    'picture-path': { name: 'Plaatjespad', description: 'Volg visuele paden' },
    'picture-sort': { name: 'Plaatjes Sorteren', description: 'Categoriseer plaatjes' },
    'prepositions': { name: 'Voorzetsels', description: 'Oefen positiewoorden' },
    'shadow-match': { name: 'Schaduwen Koppelen', description: 'Koppel voorwerpen aan schaduwen' },
    'story-dice': { name: 'Verhalendobbelstenen', description: 'Maak verhalen met afbeeldingsdobbelstenen' },
    'subtraction': { name: 'Aftrekken', description: 'Visuele aftrekwerkbladen' },
    'treasure-hunt': { name: 'Schattenjacht', description: 'Schattenjacht activiteiten maken' },
    'word-guess': { name: 'Woord Raden', description: 'Raad het woord met afbeeldingsaanwijzingen' },
    'writing-app': { name: 'Schrijfoefeningen', description: 'Handschrift oefenwerkbladen' },
  },
  // French
  fr: {
    'word-search': { name: 'Mots Cachés', description: 'Créez des mots cachés captivants' },
    'image-addition': { name: 'Addition avec Images', description: 'Fiches de calcul avec images' },
    'alphabet-train': { name: 'Train de l\'Alphabet', description: 'Apprentissage ludique de l\'alphabet avec des wagons colorés' },
    'coloring': { name: 'Pages à Colorier', description: 'Créer des pages de coloriage' },
    'math-worksheet': { name: 'Fiches de Mathématiques', description: 'Exercices de maths personnalisables' },
    'word-scramble': { name: 'Mots Mêlés', description: 'Jeux de mots mélangés' },
    'find-and-count': { name: 'Je vois, je vois', description: 'Exercices de comptage visuel' },
    'matching-app': { name: 'Jeu d\'Associations', description: 'Associer les éléments correspondants' },
    'drawing-lines': { name: 'Tracé de Lignes', description: 'Exercices de tracé de lignes' },
    'picture-bingo': { name: 'Loto d\'Images', description: 'Cartes de bingo personnalisées' },
    'sudoku': { name: 'Sudoku pour Enfants', description: 'Sudoku adaptés aux enfants' },
    'big-small-app': { name: 'Grand ou Petit', description: 'Activités de comparaison de taille' },
    'chart-count-color': { name: 'Graphiques à Compter', description: 'Pratique des données et graphiques' },
    'code-addition': { name: 'Addition Codée', description: 'Décoder les problèmes d\'addition' },
    'draw-and-color': { name: 'Dessine et Colorie', description: 'Combinaison de dessin et coloriage' },
    'find-objects': { name: 'Cherche les Objets', description: 'Jeux d\'objets cachés' },
    'grid-match': { name: 'Grille d\'Associations', description: 'Grilles de correspondance de motifs' },
    'image-crossword': { name: 'Mots Croisés Imagés', description: 'Mots croisés visuels avec images' },
    'image-cryptogram': { name: 'Cryptogramme Imagé', description: 'Décoder des messages avec des images' },
    'math-puzzle': { name: 'Énigmes Mathématiques', description: 'Casse-têtes mathématiques' },
    'missing-pieces': { name: 'Pièces Manquantes', description: 'Compléter les puzzles d\'images' },
    'more-less': { name: 'Plus ou Moins', description: 'Comparer les quantités' },
    'odd-one-out': { name: 'L\'Intrus', description: 'Trouver l\'élément différent' },
    'pattern-train': { name: 'Train des Motifs', description: 'Pratique de reconnaissance des motifs' },
    'pattern-worksheet': { name: 'Fiches de Motifs', description: 'Compléter les séquences de motifs' },
    'picture-path': { name: 'Chemin d\'Images', description: 'Suivre des chemins visuels' },
    'picture-sort': { name: 'Tri d\'Images', description: 'Catégoriser les images' },
    'prepositions': { name: 'Prépositions', description: 'Apprendre les prépositions avec des exemples visuels' },
    'shadow-match': { name: 'Ombres à Associer', description: 'Associer les objets à leurs ombres' },
    'story-dice': { name: 'Dés à Histoires', description: 'Créer des histoires avec des dés imagés' },
    'subtraction': { name: 'Soustraction', description: 'Fiches de soustraction visuelles' },
    'treasure-hunt': { name: 'Chasse au Trésor', description: 'Créer des activités de chasse au trésor' },
    'word-guess': { name: 'Devine le Mot', description: 'Deviner le mot à partir d\'images' },
    'writing-app': { name: 'Exercices d\'Écriture', description: 'Fiches d\'exercices d\'écriture' },
  },
  // Spanish
  es: {
    'word-search': { name: 'Sopa de Letras', description: 'Crea sopas de letras temáticas' },
    'image-addition': { name: 'Sumas con Imágenes', description: 'Fichas de matemáticas con imágenes' },
    'alphabet-train': { name: 'Tren del Alfabeto', description: 'Aprendizaje divertido del alfabeto con vagones coloridos' },
    'coloring': { name: 'Páginas para Colorear', description: 'Crear páginas para colorear' },
    'math-worksheet': { name: 'Fichas de Matemáticas', description: 'Ejercicios de matemáticas personalizables' },
    'word-scramble': { name: 'Palabras Revueltas', description: 'Juegos de palabras mezcladas' },
    'find-and-count': { name: 'Veo Veo', description: 'Ejercicios de conteo visual' },
    'matching-app': { name: 'Juego de Parejas', description: 'Emparejar elementos' },
    'drawing-lines': { name: 'Trazado de Líneas', description: 'Ejercicios de trazado de líneas' },
    'picture-bingo': { name: 'Bingo de Imágenes', description: 'Tarjetas de bingo personalizadas' },
    'sudoku': { name: 'Sudoku para Niños', description: 'Sudoku adaptado para niños' },
    'big-small-app': { name: 'Grande o Pequeño', description: 'Actividades de comparación de tamaños' },
    'chart-count-color': { name: 'Gráficos para Contar', description: 'Ejercicios de datos y gráficos' },
    'code-addition': { name: 'Sumas con Código', description: 'Descifrar problemas de suma' },
    'draw-and-color': { name: 'Dibuja y Colorea', description: 'Combinación de dibujo y coloreado' },
    'find-objects': { name: 'Busca los Objetos', description: 'Juegos de objetos ocultos' },
    'grid-match': { name: 'Emparejamiento en Cuadrícula', description: 'Cuadrículas de correspondencia de patrones' },
    'image-crossword': { name: 'Crucigrama con Imágenes', description: 'Crucigramas visuales con imágenes' },
    'image-cryptogram': { name: 'Criptograma con Imágenes', description: 'Decodificar mensajes con pistas de imágenes' },
    'math-puzzle': { name: 'Acertijos Matemáticos', description: 'Rompecabezas matemáticos' },
    'missing-pieces': { name: 'Piezas Que Faltan', description: 'Completar puzzles de imágenes' },
    'more-less': { name: 'Más o Menos', description: 'Comparar cantidades' },
    'odd-one-out': { name: 'El Diferente', description: 'Encontrar el elemento diferente' },
    'pattern-train': { name: 'Tren de Patrones', description: 'Práctica de reconocimiento de patrones' },
    'pattern-worksheet': { name: 'Fichas de Patrones', description: 'Completar secuencias de patrones' },
    'picture-path': { name: 'Camino de Imágenes', description: 'Seguir caminos visuales' },
    'picture-sort': { name: 'Clasificación de Imágenes', description: 'Categorizar imágenes' },
    'prepositions': { name: 'Preposiciones', description: 'Aprender preposiciones con ejemplos visuales' },
    'shadow-match': { name: 'Empareja las Sombras', description: 'Emparejar objetos con sus sombras' },
    'story-dice': { name: 'Dados de Historias', description: 'Crear historias con dados de imágenes' },
    'subtraction': { name: 'Resta', description: 'Fichas de resta visuales' },
    'treasure-hunt': { name: 'Búsqueda del Tesoro', description: 'Crear actividades de búsqueda del tesoro' },
    'word-guess': { name: 'Adivina la Palabra', description: 'Adivinar palabras con pistas de imágenes' },
    'writing-app': { name: 'Ejercicios de Escritura', description: 'Fichas de práctica de escritura' },
  },
  // Portuguese
  pt: {
    'word-search': { name: 'Sopa de Letras', description: 'Crie sopas de letras temáticas' },
    'image-addition': { name: 'Adições com Imagens', description: 'Fichas de matemática com imagens' },
    'alphabet-train': { name: 'Comboio do Alfabeto', description: 'Aprendizagem divertida do alfabeto com vagões coloridos' },
    'coloring': { name: 'Páginas para Colorir', description: 'Criar páginas para colorir' },
    'math-worksheet': { name: 'Fichas de Matemática', description: 'Exercícios de matemática personalizáveis' },
    'word-scramble': { name: 'Palavras Baralhadas', description: 'Jogos de palavras misturadas' },
    'find-and-count': { name: 'Vejo, Vejo', description: 'Exercícios de contagem visual' },
    'matching-app': { name: 'Jogo de Pares', description: 'Emparelhar elementos' },
    'drawing-lines': { name: 'Traçar Linhas', description: 'Exercícios de traçar linhas' },
    'picture-bingo': { name: 'Bingo de Imagens', description: 'Cartões de bingo personalizados' },
    'sudoku': { name: 'Sudoku para Crianças', description: 'Sudoku adaptado para crianças' },
    'big-small-app': { name: 'Grande ou Pequeno', description: 'Atividades de comparação de tamanhos' },
    'chart-count-color': { name: 'Gráficos para Contar', description: 'Exercícios de dados e gráficos' },
    'code-addition': { name: 'Adições em Código', description: 'Decifrar problemas de adição' },
    'draw-and-color': { name: 'Desenha e Colore', description: 'Combinação de desenho e colorir' },
    'find-objects': { name: 'Procura os Objetos', description: 'Jogos de objetos escondidos' },
    'grid-match': { name: 'Correspondências em Grelha', description: 'Grelhas de correspondência de padrões' },
    'image-crossword': { name: 'Palavras Cruzadas com Imagens', description: 'Palavras cruzadas visuais com imagens' },
    'image-cryptogram': { name: 'Criptograma com Imagens', description: 'Descodificar mensagens com pistas de imagens' },
    'math-puzzle': { name: 'Enigmas Matemáticos', description: 'Quebra-cabeças matemáticos' },
    'missing-pieces': { name: 'Peças em Falta', description: 'Completar puzzles de imagens' },
    'more-less': { name: 'Mais ou Menos', description: 'Comparar quantidades' },
    'odd-one-out': { name: 'O Intruso', description: 'Encontrar o elemento diferente' },
    'pattern-train': { name: 'Comboio de Padrões', description: 'Prática de reconhecimento de padrões' },
    'pattern-worksheet': { name: 'Fichas de Padrões', description: 'Completar sequências de padrões' },
    'picture-path': { name: 'Caminho de Imagens', description: 'Seguir caminhos visuais' },
    'picture-sort': { name: 'Classificação de Imagens', description: 'Categorizar imagens' },
    'prepositions': { name: 'Preposições', description: 'Aprender preposições com exemplos visuais' },
    'shadow-match': { name: 'Combinar Sombras', description: 'Combinar objetos com as suas sombras' },
    'story-dice': { name: 'Dados de Histórias', description: 'Criar histórias com dados de imagens' },
    'subtraction': { name: 'Subtração', description: 'Fichas de subtração visuais' },
    'treasure-hunt': { name: 'Caça ao Tesouro', description: 'Criar atividades de caça ao tesouro' },
    'word-guess': { name: 'Adivinhar a Palavra', description: 'Adivinhar palavras com pistas de imagens' },
    'writing-app': { name: 'Exercícios de Escrita', description: 'Fichas de prática de escrita' },
  },
  // Italian
  it: {
    'word-search': { name: 'Crucipuzzle', description: 'Crea crucipuzzle tematici' },
    'image-addition': { name: 'Addizioni con Immagini', description: 'Schede di matematica con immagini' },
    'alphabet-train': { name: 'Treno dell\'Alfabeto', description: 'Apprendimento divertente dell\'alfabeto con vagoni colorati' },
    'coloring': { name: 'Pagine da Colorare', description: 'Creare pagine da colorare' },
    'math-worksheet': { name: 'Schede di Matematica', description: 'Esercizi di matematica personalizzabili' },
    'word-scramble': { name: 'Parole Mescolate', description: 'Giochi di parole mescolate' },
    'find-and-count': { name: 'Vedo Vedo', description: 'Esercizi di conteggio visivo' },
    'matching-app': { name: 'Gioco di Abbinamenti', description: 'Abbinare elementi' },
    'drawing-lines': { name: 'Traccia le Linee', description: 'Esercizi di tracciamento linee' },
    'picture-bingo': { name: 'Tombola delle Immagini', description: 'Cartelle di bingo personalizzate' },
    'sudoku': { name: 'Sudoku per Bambini', description: 'Sudoku adattati per bambini' },
    'big-small-app': { name: 'Grande o Piccolo', description: 'Attività di confronto dimensioni' },
    'chart-count-color': { name: 'Grafici da Contare', description: 'Esercizi di dati e grafici' },
    'code-addition': { name: 'Addizioni in Codice', description: 'Decifrare problemi di addizione' },
    'draw-and-color': { name: 'Disegna e Colora', description: 'Combinazione di disegno e colorazione' },
    'find-objects': { name: 'Trova gli Oggetti', description: 'Giochi di oggetti nascosti' },
    'grid-match': { name: 'Abbinamenti su Griglia', description: 'Griglie di corrispondenza di modelli' },
    'image-crossword': { name: 'Cruciverba con Immagini', description: 'Cruciverba visivi con immagini' },
    'image-cryptogram': { name: 'Crittogramma con Immagini', description: 'Decodificare messaggi con indizi di immagini' },
    'math-puzzle': { name: 'Enigmi Matematici', description: 'Rompicapo matematici' },
    'missing-pieces': { name: 'Pezzi Mancanti', description: 'Completare puzzle di immagini' },
    'more-less': { name: 'Di Più o Di Meno', description: 'Confrontare quantità' },
    'odd-one-out': { name: 'L\'Intruso', description: 'Trovare l\'elemento diverso' },
    'pattern-train': { name: 'Treno dei Modelli', description: 'Pratica di riconoscimento dei modelli' },
    'pattern-worksheet': { name: 'Schede di Modelli', description: 'Completare sequenze di modelli' },
    'picture-path': { name: 'Percorso di Immagini', description: 'Seguire percorsi visivi' },
    'picture-sort': { name: 'Classifica le Immagini', description: 'Categorizzare immagini' },
    'prepositions': { name: 'Preposizioni', description: 'Imparare le preposizioni con esempi visivi' },
    'shadow-match': { name: 'Abbina le Ombre', description: 'Abbinare oggetti alle loro ombre' },
    'story-dice': { name: 'Dadi delle Storie', description: 'Creare storie con dadi di immagini' },
    'subtraction': { name: 'Sottrazione', description: 'Schede di sottrazione visive' },
    'treasure-hunt': { name: 'Caccia al Tesoro', description: 'Creare attività di caccia al tesoro' },
    'word-guess': { name: 'Indovina la Parola', description: 'Indovinare parole con indizi di immagini' },
    'writing-app': { name: 'Esercizi di Scrittura', description: 'Schede di pratica di scrittura' },
  },
  // Swedish
  sv: {
    'word-search': { name: 'Ordletare', description: 'Skapa tematiska ordsökningspussel' },
    'image-addition': { name: 'Addition med Bilder', description: 'Matteblad med bilder' },
    'alphabet-train': { name: 'Alfabetståget', description: 'Rolig alfabetsinlärning med färgglada tågvagnar' },
    'coloring': { name: 'Målarbilder', description: 'Skapa målarbilder' },
    'math-worksheet': { name: 'Matteblad', description: 'Anpassningsbara matteövningar' },
    'word-scramble': { name: 'Ordmix', description: 'Ordblandningsspel' },
    'find-and-count': { name: 'Jag ser, jag ser', description: 'Visuella räkneövningar' },
    'matching-app': { name: 'Matchningsspel', description: 'Para ihop element' },
    'drawing-lines': { name: 'Rita Linjer', description: 'Övningar i att rita linjer' },
    'picture-bingo': { name: 'Bildbingo', description: 'Anpassade bingokort' },
    'sudoku': { name: 'Sudoku för Barn', description: 'Barnvänlig sudoku' },
    'big-small-app': { name: 'Stor eller Liten', description: 'Storleksjämförelseaktiviteter' },
    'chart-count-color': { name: 'Räknediagram', description: 'Data- och diagramövningar' },
    'code-addition': { name: 'Addition i Kod', description: 'Avkoda additionsuppgifter' },
    'draw-and-color': { name: 'Rita och Måla', description: 'Kombination av ritning och målning' },
    'find-objects': { name: 'Hitta Föremålen', description: 'Gömda föremålsspel' },
    'grid-match': { name: 'Rutnätsmatchning', description: 'Mönstermatchningsrutnät' },
    'image-crossword': { name: 'Bildkorsord', description: 'Visuella korsord med bilder' },
    'image-cryptogram': { name: 'Bildkryptogram', description: 'Avkoda meddelanden med bildledtrådar' },
    'math-puzzle': { name: 'Mattepussel', description: 'Matematiska tankenötter' },
    'missing-pieces': { name: 'Saknade Bitar', description: 'Komplettera bildpussel' },
    'more-less': { name: 'Mer eller Mindre', description: 'Jämför kvantiteter' },
    'odd-one-out': { name: 'Den Udda', description: 'Hitta det annorlunda elementet' },
    'pattern-train': { name: 'Mönsterstöget', description: 'Mönsterigenkänningsövning' },
    'pattern-worksheet': { name: 'Mönsterblad', description: 'Komplettera mönstersekvenser' },
    'picture-path': { name: 'Bildväg', description: 'Följ visuella banor' },
    'picture-sort': { name: 'Sortera Bilder', description: 'Kategorisera bilder' },
    'prepositions': { name: 'Prepositioner', description: 'Lär dig prepositioner med visuella exempel' },
    'shadow-match': { name: 'Skuggmatchning', description: 'Matcha objekt med deras skuggor' },
    'story-dice': { name: 'Berättelsetärningar', description: 'Skapa berättelser med bildtärningar' },
    'subtraction': { name: 'Subtraktion', description: 'Visuella subtraktionsblad' },
    'treasure-hunt': { name: 'Skattjakt', description: 'Skapa skattjaktaktiviteter' },
    'word-guess': { name: 'Gissa Ordet', description: 'Gissa ord med bildledtrådar' },
    'writing-app': { name: 'Skrivövningar', description: 'Handskriftsövningsblad' },
  },
  // Danish
  da: {
    'word-search': { name: 'Ordsøgning', description: 'Skab tematiske ordsøgningspuslespil' },
    'image-addition': { name: 'Addition med Billeder', description: 'Matematikark med billeder' },
    'alphabet-train': { name: 'Alfabettoget', description: 'Sjov alfabetindlæring med farverige togvogne' },
    'coloring': { name: 'Malebøger', description: 'Skab malebøger' },
    'math-worksheet': { name: 'Matematikark', description: 'Tilpasselige matematikøvelser' },
    'word-scramble': { name: 'Ordforbytter', description: 'Ordrokeringsspil' },
    'find-and-count': { name: 'Jeg ser, jeg ser', description: 'Visuelle tælleøvelser' },
    'matching-app': { name: 'Parspil', description: 'Match elementer' },
    'drawing-lines': { name: 'Tegn Linjer', description: 'Øvelser i at tegne linjer' },
    'picture-bingo': { name: 'Billedbingo', description: 'Tilpassede bingokort' },
    'sudoku': { name: 'Sudoku til Børn', description: 'Børnevenlig sudoku' },
    'big-small-app': { name: 'Stor eller Lille', description: 'Størrelsessammenligningsaktiviteter' },
    'chart-count-color': { name: 'Tællediagrammer', description: 'Data- og diagramøvelser' },
    'code-addition': { name: 'Addition i Kode', description: 'Afkod additionsopgaver' },
    'draw-and-color': { name: 'Tegn og Mal', description: 'Kombination af tegning og maling' },
    'find-objects': { name: 'Find Genstandene', description: 'Gemte genstande spil' },
    'grid-match': { name: 'Gittermatchning', description: 'Mønstermatchingsgitre' },
    'image-crossword': { name: 'Billedkrydsord', description: 'Visuelle krydsord med billeder' },
    'image-cryptogram': { name: 'Billedkryptogram', description: 'Afkod beskeder med billedtips' },
    'math-puzzle': { name: 'Matematikgåder', description: 'Matematiske tankegåder' },
    'missing-pieces': { name: 'Manglende Brikker', description: 'Fuldstændiggør billedpuslespil' },
    'more-less': { name: 'Mere eller Mindre', description: 'Sammenlign mængder' },
    'odd-one-out': { name: 'Den Anderledes', description: 'Find det anderledes element' },
    'pattern-train': { name: 'Mønstertoget', description: 'Mønstergenkendelsesøvelse' },
    'pattern-worksheet': { name: 'Mønsterark', description: 'Fuldstændiggør mønstersekvenser' },
    'picture-path': { name: 'Billedsti', description: 'Følg visuelle stier' },
    'picture-sort': { name: 'Sortér Billeder', description: 'Kategoriser billeder' },
    'prepositions': { name: 'Præpositioner', description: 'Lær præpositioner med visuelle eksempler' },
    'shadow-match': { name: 'Skyggematching', description: 'Match objekter med deres skygger' },
    'story-dice': { name: 'Historieterninger', description: 'Skab historier med billedterninger' },
    'subtraction': { name: 'Subtraktion', description: 'Visuelle subtraktionsark' },
    'treasure-hunt': { name: 'Skattejagt', description: 'Skab skattejagtsaktiviteter' },
    'word-guess': { name: 'Gæt Ordet', description: 'Gæt ord med billedtips' },
    'writing-app': { name: 'Skriveøvelser', description: 'Håndskriftsøvelsesark' },
  },
  // Norwegian
  no: {
    'word-search': { name: 'Ordsøking', description: 'Lag tematiske ordsøkingspuslespill' },
    'image-addition': { name: 'Addisjon med Bilder', description: 'Matteark med bilder' },
    'alphabet-train': { name: 'Alfabettoget', description: 'Morsom alfabetlæring med fargerike togvogner' },
    'coloring': { name: 'Malesider', description: 'Lag malesider' },
    'math-worksheet': { name: 'Matteark', description: 'Tilpassbare matteøvelser' },
    'word-scramble': { name: 'Ordmiks', description: 'Ordblandingsspill' },
    'find-and-count': { name: 'Jeg ser, jeg ser', description: 'Visuelle telleøvelser' },
    'matching-app': { name: 'Parspill', description: 'Match elementer' },
    'drawing-lines': { name: 'Tegn Linjer', description: 'Øvelser i å tegne linjer' },
    'picture-bingo': { name: 'Bildebingo', description: 'Tilpassede bingokort' },
    'sudoku': { name: 'Sudoku for Barn', description: 'Barnevennlig sudoku' },
    'big-small-app': { name: 'Stor eller Liten', description: 'Størrelsessammenligningsaktiviteter' },
    'chart-count-color': { name: 'Tellediagrammer', description: 'Data- og diagramøvelser' },
    'code-addition': { name: 'Addisjon i Kode', description: 'Avkod addisjonsoppgaver' },
    'draw-and-color': { name: 'Tegn og Mal', description: 'Kombinasjon av tegning og maling' },
    'find-objects': { name: 'Finn Gjenstandene', description: 'Gjemte gjenstander spill' },
    'grid-match': { name: 'Rutenettverk', description: 'Mønstermatchingsrutenett' },
    'image-crossword': { name: 'Bildekryssord', description: 'Visuelle kryssord med bilder' },
    'image-cryptogram': { name: 'Bildekryptogram', description: 'Avkod meldinger med bildetips' },
    'math-puzzle': { name: 'Mattegåter', description: 'Matematiske tankegåter' },
    'missing-pieces': { name: 'Manglende Brikker', description: 'Fullstendiger bildepuslespill' },
    'more-less': { name: 'Mer eller Mindre', description: 'Sammenlign mengder' },
    'odd-one-out': { name: 'Den Rare Fuglen', description: 'Finn det annerledes elementet' },
    'pattern-train': { name: 'Mønstertoget', description: 'Mønstergjenkjenningsøvelse' },
    'pattern-worksheet': { name: 'Mønsterark', description: 'Fullstendiger mønstersekvenser' },
    'picture-path': { name: 'Bildesti', description: 'Følg visuelle stier' },
    'picture-sort': { name: 'Sorter Bilder', description: 'Kategoriser bilder' },
    'prepositions': { name: 'Preposisjoner', description: 'Lær preposisjoner med visuelle eksempler' },
    'shadow-match': { name: 'Skyggematching', description: 'Match objekter med deres skygger' },
    'story-dice': { name: 'Historieterninger', description: 'Lag historier med bildeterninger' },
    'subtraction': { name: 'Subtraksjon', description: 'Visuelle subtraksjonsark' },
    'treasure-hunt': { name: 'Skattejakt', description: 'Lag skattejaktaktiviteter' },
    'word-guess': { name: 'Gjett Ordet', description: 'Gjett ord med bildetips' },
    'writing-app': { name: 'Skriveøvelser', description: 'Håndskriftsøvelsesark' },
  },
  // Finnish
  fi: {
    'word-search': { name: 'Sanaristikko', description: 'Luo temaattisia sanaristikkoja' },
    'image-addition': { name: 'Yhteenlaskua Kuvin', description: 'Matematiikkatehtävät kuvilla' },
    'alphabet-train': { name: 'Aakkosenjuna', description: 'Hauska aakkosten oppiminen värikkäillä junavaunuilla' },
    'coloring': { name: 'Värityskuvat', description: 'Luo värityskuvia' },
    'math-worksheet': { name: 'Matematiikkatehtävät', description: 'Muokattavat matematiikkaharjoitukset' },
    'word-scramble': { name: 'Sekoitetut Sanat', description: 'Sanasotkelmaspelit' },
    'find-and-count': { name: 'Minä näen', description: 'Visuaaliset laskuharjoitukset' },
    'matching-app': { name: 'Parikorttipeli', description: 'Yhdistä elementtejä' },
    'drawing-lines': { name: 'Viivan Veto', description: 'Viivanpiirtoharjoitukset' },
    'picture-bingo': { name: 'Kuvabingo', description: 'Mukautetut bingokortit' },
    'sudoku': { name: 'Sudoku Lapsille', description: 'Lapsiystävällinen sudoku' },
    'big-small-app': { name: 'Iso vai Pieni', description: 'Kokovertailuaktiviteetit' },
    'chart-count-color': { name: 'Laskentakaaviot', description: 'Data- ja kaavioharjoitukset' },
    'code-addition': { name: 'Koodattu Yhteenlasku', description: 'Pura yhteenlaskutehtävien koodit' },
    'draw-and-color': { name: 'Piirrä ja Väritä', description: 'Piirtämisen ja värittämisen yhdistelmä' },
    'find-objects': { name: 'Etsi Esineet', description: 'Piilotetut esineet -pelit' },
    'grid-match': { name: 'Ruudukon Vastaavuus', description: 'Kuvionvastaavuusruudukot' },
    'image-crossword': { name: 'Kuvasanastot', description: 'Visuaaliset ristikot kuvilla' },
    'image-cryptogram': { name: 'Kuvakryptogrammi', description: 'Pura viestien koodit kuvavinkkien avulla' },
    'math-puzzle': { name: 'Matematiikkapulmat', description: 'Matemaattiset ajatuspähkinät' },
    'missing-pieces': { name: 'Puuttuvat Palat', description: 'Täydennä kuvapalapelit' },
    'more-less': { name: 'Enemmän vai Vähemmän', description: 'Vertaa määriä' },
    'odd-one-out': { name: 'Eri Tavalla', description: 'Etsi erilainen elementti' },
    'pattern-train': { name: 'Kuviojuna', description: 'Kuvioiden tunnistamisharjoitus' },
    'pattern-worksheet': { name: 'Kuviotehtävät', description: 'Täydennä kuviosarjat' },
    'picture-path': { name: 'Kuvapolku', description: 'Seuraa visuaalisia polkuja' },
    'picture-sort': { name: 'Lajittele Kuvia', description: 'Kategorisoi kuvia' },
    'prepositions': { name: 'Prepositiot', description: 'Opi prepositioita visuaalisten esimerkkien avulla' },
    'shadow-match': { name: 'Varjojen Yhdistäminen', description: 'Yhdistä esineet niiden varjoihin' },
    'story-dice': { name: 'Tarinakuutiot', description: 'Luo tarinoita kuvakuutioilla' },
    'subtraction': { name: 'Vähennyslasku', description: 'Visuaaliset vähennyslaskutehtävät' },
    'treasure-hunt': { name: 'Aarteenmetsästys', description: 'Luo aarteenmetsästysaktiviteetteja' },
    'word-guess': { name: 'Arvaa Sana', description: 'Arvaa sanoja kuvavinkkien avulla' },
    'writing-app': { name: 'Kirjoitusharjoitukset', description: 'Käsikirjoitusharjoitustehtävät' },
  },
};

/**
 * Category to app mapping
 * Aligns with blog post categories and app categories
 */
const CATEGORY_APP_MAP: Record<string, string[]> = {
  // Blog categories → App IDs
  'teaching-resources': ['word-search', 'math-worksheet', 'coloring', 'matching-app', 'sudoku'],
  'worksheet-tips': ['math-worksheet', 'word-search', 'pattern-worksheet', 'writing-app'],
  'educational-activities': ['picture-bingo', 'treasure-hunt', 'story-dice', 'coloring'],
  'learning-strategies': ['pattern-worksheet', 'sudoku', 'matching-app', 'odd-one-out'],
  'curriculum-guides': ['math-worksheet', 'alphabet-train', 'word-search', 'writing-app'],
  'parent-resources': ['coloring', 'drawing-lines', 'alphabet-train', 'matching-app'],
  'seasonal-content': ['coloring', 'word-search', 'picture-bingo', 'treasure-hunt'],

  // App categories → App IDs (for product page to product page linking)
  'Math': ['image-addition', 'subtraction', 'math-worksheet', 'math-puzzle', 'code-addition', 'more-less', 'find-and-count', 'chart-count-color'],
  'Language Arts': ['word-search', 'word-scramble', 'word-guess', 'writing-app', 'alphabet-train', 'image-crossword', 'prepositions', 'story-dice'],
  'Logic & Puzzles': ['sudoku', 'odd-one-out', 'pattern-train', 'pattern-worksheet', 'image-cryptogram', 'picture-sort'],
  'Visual Perception': ['shadow-match', 'find-objects', 'big-small-app', 'missing-pieces', 'picture-path'],
  'Art & Creativity': ['coloring', 'draw-and-color'],
  'Memory & Matching': ['matching-app', 'grid-match'],
  'Fine Motor Skills': ['drawing-lines'],
  'Games': ['picture-bingo', 'treasure-hunt'],
};

export interface RelatedProduct {
  appId: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: string;
  url: string;
}

/**
 * Find related products based on keywords found in content
 *
 * @param keywords - Array of keywords to match against
 * @param locale - Target locale for URLs
 * @param limit - Maximum number of products to return (default: 4)
 * @param excludeAppIds - App IDs to exclude from results
 * @returns Array of related products with localized URLs
 */
export function getRelatedProductsByKeywords(
  keywords: string[],
  locale: SupportedLocale,
  limit: number = 4,
  excludeAppIds: string[] = []
): RelatedProduct[] {
  const appScores = new Map<string, number>();

  // Score apps based on keyword matches
  for (const keyword of keywords) {
    const normalizedKeyword = keyword.toLowerCase().trim();

    // Direct keyword match from English map
    let matchedAppIds = KEYWORD_PRODUCT_MAP[normalizedKeyword] || [];

    // If not found in English map and locale is not English, check localized keywords
    if (matchedAppIds.length === 0 && locale !== 'en' && KEYWORD_TRANSLATIONS[locale]) {
      matchedAppIds = KEYWORD_TRANSLATIONS[locale][normalizedKeyword] || [];
    }

    for (const appId of matchedAppIds) {
      if (!excludeAppIds.includes(appId)) {
        appScores.set(appId, (appScores.get(appId) || 0) + 2);
      }
    }

    // Partial keyword match (for compound keywords) - English
    for (const [mapKeyword, appIds] of Object.entries(KEYWORD_PRODUCT_MAP)) {
      if (mapKeyword.includes(normalizedKeyword) || normalizedKeyword.includes(mapKeyword)) {
        for (const appId of appIds) {
          if (!excludeAppIds.includes(appId)) {
            appScores.set(appId, (appScores.get(appId) || 0) + 1);
          }
        }
      }
    }

    // Partial keyword match for localized keywords
    if (locale !== 'en' && KEYWORD_TRANSLATIONS[locale]) {
      for (const [mapKeyword, appIds] of Object.entries(KEYWORD_TRANSLATIONS[locale])) {
        if (mapKeyword.includes(normalizedKeyword) || normalizedKeyword.includes(mapKeyword)) {
          for (const appId of appIds) {
            if (!excludeAppIds.includes(appId)) {
              appScores.set(appId, (appScores.get(appId) || 0) + 1);
            }
          }
        }
      }
    }
  }

  // Sort by score and get top matches
  const sortedAppIds = Array.from(appScores.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([appId]) => appId);

  return sortedAppIds.map(appId => appIdToProduct(appId, locale)).filter(Boolean) as RelatedProduct[];
}

/**
 * Find related products based on blog category
 *
 * @param category - Blog post category ID
 * @param locale - Target locale for URLs
 * @param limit - Maximum number of products to return (default: 4)
 * @param excludeAppIds - App IDs to exclude from results
 * @returns Array of related products with localized URLs
 */
export function getRelatedProductsByCategory(
  category: string,
  locale: SupportedLocale,
  limit: number = 4,
  excludeAppIds: string[] = []
): RelatedProduct[] {
  const appIds = CATEGORY_APP_MAP[category] || CATEGORY_APP_MAP['teaching-resources'] || [];

  const filteredAppIds = appIds
    .filter(appId => !excludeAppIds.includes(appId))
    .slice(0, limit);

  return filteredAppIds.map(appId => appIdToProduct(appId, locale)).filter(Boolean) as RelatedProduct[];
}

/**
 * Find related products based on both keywords and category
 * Combines results with preference for keyword matches
 *
 * @param keywords - Array of keywords to match against
 * @param category - Blog post category ID
 * @param locale - Target locale for URLs
 * @param limit - Maximum number of products to return (default: 4)
 * @param excludeAppIds - App IDs to exclude from results
 * @returns Array of related products with localized URLs
 */
export function getRelatedProducts(
  keywords: string[],
  category: string,
  locale: SupportedLocale,
  limit: number = 4,
  excludeAppIds: string[] = []
): RelatedProduct[] {
  // Get keyword-based matches (higher priority)
  const keywordProducts = getRelatedProductsByKeywords(keywords, locale, limit, excludeAppIds);

  if (keywordProducts.length >= limit) {
    return keywordProducts;
  }

  // Fill remaining slots with category-based matches
  const existingAppIds = keywordProducts.map(p => p.appId);
  const categoryProducts = getRelatedProductsByCategory(
    category,
    locale,
    limit - keywordProducts.length,
    [...excludeAppIds, ...existingAppIds]
  );

  return [...keywordProducts, ...categoryProducts];
}

/**
 * Get related products for a specific app (for product page linking)
 *
 * @param appId - Current app ID
 * @param locale - Target locale for URLs
 * @param limit - Maximum number of products to return (default: 4)
 * @returns Array of related products with localized URLs
 */
export function getRelatedProductsForApp(
  appId: string,
  locale: SupportedLocale,
  limit: number = 4
): RelatedProduct[] {
  const app = appsConfig.find(a => a.id === appId);
  if (!app) return [];

  // Find related apps by category
  const categoryApps = CATEGORY_APP_MAP[app.category] || [];
  const relatedAppIds = categoryApps.filter(id => id !== appId).slice(0, limit);

  // If not enough from category, add apps with shared keywords
  if (relatedAppIds.length < limit) {
    const appKeywords = app.keywords || [];
    const keywordProducts = getRelatedProductsByKeywords(
      appKeywords,
      locale,
      limit - relatedAppIds.length,
      [appId, ...relatedAppIds]
    );

    return [
      ...relatedAppIds.map(id => appIdToProduct(id, locale)).filter(Boolean) as RelatedProduct[],
      ...keywordProducts
    ];
  }

  return relatedAppIds.map(id => appIdToProduct(id, locale)).filter(Boolean) as RelatedProduct[];
}

/**
 * Convert an app ID to a RelatedProduct object
 *
 * @param appId - App ID to convert
 * @param locale - Target locale for URL
 * @returns RelatedProduct object or null if not found
 */
export function appIdToProduct(appId: string, locale: SupportedLocale): RelatedProduct | null {
  const app = appsConfig.find(a => a.id === appId);
  if (!app) return null;

  const slugConfig = productPageSlugs.find(p => p.appId === appId);
  const slug = slugConfig?.slugs[locale] || slugConfig?.slugs.en;
  if (!slug) return null;

  // Get localized name and description if available
  const translation = APP_NAME_TRANSLATIONS[locale]?.[appId];

  return {
    appId: app.id,
    name: translation?.name || app.name,
    slug,
    description: translation?.description || app.description,
    category: app.category,
    icon: app.icon,
    url: `/${locale}/apps/${slug}`
  };
}

/**
 * Extract keywords from HTML content for matching
 * Simple extraction - looks for common educational terms
 * Supports multilingual keyword extraction when locale is provided
 *
 * @param htmlContent - HTML content to extract keywords from
 * @param locale - Target locale for language-specific keywords (default: 'en')
 * @returns Array of matched keywords
 */
export function extractKeywordsFromContent(htmlContent: string, locale: string = 'en'): string[] {
  // Strip HTML tags
  const textContent = htmlContent.replace(/<[^>]*>/g, ' ').toLowerCase();

  const foundKeywords: string[] = [];

  // Check for each English keyword in our map (always checked)
  for (const keyword of Object.keys(KEYWORD_PRODUCT_MAP)) {
    // Use Unicode-safe word boundaries (\\b breaks on accented characters like \u00e4, \u00f6, \u00fc, \u00e9)
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?:^|[\\s,;.!?()\\[\\]])${escaped}(?=[\\s,;.!?()\\[\\]]|$)`, 'i');
    if (regex.test(textContent)) {
      foundKeywords.push(keyword);
    }
  }

  // Check locale-specific keywords if not English
  if (locale !== 'en' && KEYWORD_TRANSLATIONS[locale]) {
    for (const keyword of Object.keys(KEYWORD_TRANSLATIONS[locale])) {
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(?:^|[\\s,;.!?()\\[\\]])${escaped}(?=[\\s,;.!?()\\[\\]]|$)`, 'i');
      if (regex.test(textContent)) {
        foundKeywords.push(keyword);
      }
    }
  }

  return foundKeywords;
}

/**
 * Get all app IDs from appsConfig
 * Utility function for testing and validation
 */
export function getAllAppIds(): string[] {
  return appsConfig.map(app => app.id);
}

/**
 * Get product URL for a specific app and locale
 *
 * @param appId - App ID
 * @param locale - Target locale
 * @returns URL string or null if not found
 */
export function getProductUrl(appId: string, locale: SupportedLocale): string | null {
  const product = appIdToProduct(appId, locale);
  return product?.url || null;
}

/**
 * Get keywords associated with an app ID
 * This is the reverse of KEYWORD_PRODUCT_MAP - finds keywords that map to a given app
 *
 * @param appId - App ID to find keywords for
 * @returns Array of keywords that map to this app
 */
export function getKeywordsForApp(appId: string): string[] {
  const keywords: string[] = [];

  for (const [keyword, appIds] of Object.entries(KEYWORD_PRODUCT_MAP)) {
    if (appIds.includes(appId)) {
      keywords.push(keyword);
    }
  }

  // Also include the app's own keywords from config
  const app = appsConfig.find(a => a.id === appId);
  if (app?.keywords) {
    for (const keyword of app.keywords) {
      if (!keywords.includes(keyword)) {
        keywords.push(keyword);
      }
    }
  }

  return keywords;
}

/**
 * Get the category for an app ID
 *
 * @param appId - App ID
 * @returns Category string or null if not found
 */
export function getCategoryForApp(appId: string): string | null {
  const app = appsConfig.find(a => a.id === appId);
  return app?.category || null;
}
