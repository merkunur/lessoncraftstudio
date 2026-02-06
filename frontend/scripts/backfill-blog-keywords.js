/**
 * Phase 1: Backfill Blog Post Keywords (v2)
 *
 * Extracts keywords from blog post titles, slugs, and focusKeywords
 * across ALL 11 locales, then maps locale keywords back to English
 * keywords via Jaccard similarity for storage.
 *
 * v2 changes vs v1:
 *   - NO content scanning (too broad -- matched all posts)
 *   - Scans title + slug + focusKeyword only (high-signal sources)
 *   - All 11 locales scanned (not just English)
 *   - Locale keywords reverse-mapped to English via Jaccard similarity
 *   - Capped at 6 keywords per post
 *   - Distribution guardrails in dry-run output
 *
 * Safety:
 *   - DRY-RUN by default (requires --apply to write)
 *   - Creates JSON backup before any writes
 *   - Additive only -- never removes existing keywords
 *   - Deduplicates via Set
 *   - Transaction wrapping per batch of 10
 *
 * Usage:
 *   node scripts/backfill-blog-keywords.js              # Dry run (default)
 *   node scripts/backfill-blog-keywords.js --apply       # Apply changes
 *   node scripts/backfill-blog-keywords.js --verify      # Verify current state
 *   node scripts/backfill-blog-keywords.js --verbose      # Extra logging
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Parse CLI args
const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const DRY_RUN = !APPLY;
const VERIFY = args.includes('--verify');
const VERBOSE = args.includes('--verbose');

const MAX_KEYWORDS_PER_POST = 6;
const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const NON_EN_LOCALES = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// ---------------------------------------------------------------------------
// KEYWORD_PRODUCT_MAP (copied from lib/internal-linking.ts lines 18-69)
// ---------------------------------------------------------------------------

const KEYWORD_PRODUCT_MAP = {
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

// ---------------------------------------------------------------------------
// KEYWORD_TRANSLATIONS (copied from lib/internal-linking.ts lines 75-376)
// ---------------------------------------------------------------------------

const KEYWORD_TRANSLATIONS = {
  de: {
    'addition': ['image-addition', 'code-addition', 'math-worksheet'],
    'subtraktion': ['subtraction', 'math-worksheet'],
    'mathematik': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'rechnen': ['math-worksheet', 'image-addition', 'subtraction'],
    'z\u00e4hlen': ['find-and-count', 'chart-count-color', 'more-less'],
    'zahlen': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'wortschatz': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'w\u00f6rter': ['word-search', 'word-scramble', 'word-guess'],
    'alphabet': ['alphabet-train', 'writing-app'],
    'buchstaben': ['alphabet-train', 'writing-app'],
    'schreiben': ['writing-app', 'story-dice'],
    'muster': ['pattern-worksheet', 'pattern-train'],
    'logik': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'ausmalen': ['coloring', 'draw-and-color'],
    'malen': ['coloring', 'draw-and-color', 'drawing-lines'],
    'zeichnen': ['coloring', 'draw-and-color', 'drawing-lines'],
    'r\u00e4tsel': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
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
  fr: {
    'addition': ['image-addition', 'code-addition', 'math-worksheet'],
    'soustraction': ['subtraction', 'math-worksheet'],
    'math\u00e9matiques': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'maths': ['math-worksheet', 'math-puzzle', 'image-addition'],
    'compter': ['find-and-count', 'chart-count-color', 'more-less'],
    'nombres': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'vocabulaire': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'mots': ['word-search', 'word-scramble', 'word-guess'],
    'alphabet': ['alphabet-train', 'writing-app'],
    'lettres': ['alphabet-train', 'writing-app'],
    '\u00e9criture': ['writing-app', 'story-dice'],
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
  es: {
    'suma': ['image-addition', 'code-addition', 'math-worksheet'],
    'adici\u00f3n': ['image-addition', 'code-addition', 'math-worksheet'],
    'resta': ['subtraction', 'math-worksheet'],
    'matem\u00e1ticas': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'contar': ['find-and-count', 'chart-count-color', 'more-less'],
    'n\u00fameros': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'vocabulario': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'palabras': ['word-search', 'word-scramble', 'word-guess'],
    'alfabeto': ['alphabet-train', 'writing-app'],
    'letras': ['alphabet-train', 'writing-app'],
    'escritura': ['writing-app', 'story-dice'],
    'patr\u00f3n': ['pattern-worksheet', 'pattern-train'],
    'l\u00f3gica': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
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
  pt: {
    'adi\u00e7\u00e3o': ['image-addition', 'code-addition', 'math-worksheet'],
    'soma': ['image-addition', 'code-addition', 'math-worksheet'],
    'subtra\u00e7\u00e3o': ['subtraction', 'math-worksheet'],
    'matem\u00e1tica': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'contar': ['find-and-count', 'chart-count-color', 'more-less'],
    'n\u00fameros': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'vocabul\u00e1rio': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'palavras': ['word-search', 'word-scramble', 'word-guess'],
    'alfabeto': ['alphabet-train', 'writing-app'],
    'letras': ['alphabet-train', 'writing-app'],
    'escrita': ['writing-app', 'story-dice'],
    'padr\u00e3o': ['pattern-worksheet', 'pattern-train'],
    'l\u00f3gica': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'colorir': ['coloring', 'draw-and-color'],
    'desenho': ['coloring', 'draw-and-color', 'drawing-lines'],
    'quebra-cabe\u00e7a': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'jogo': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'labirinto': ['picture-path'],
    'pr\u00e9-escolar': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
    'objetos escondidos': ['find-objects'],
    'percep\u00e7\u00e3o visual': ['shadow-match', 'find-objects', 'odd-one-out', 'missing-pieces'],
    'pensamento cr\u00edtico': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'math-puzzle'],
    'motricidade fina': ['drawing-lines', 'coloring', 'draw-and-color'],
    'caligrafia': ['writing-app', 'drawing-lines'],
    'palavras cruzadas': ['image-crossword'],
    'crian\u00e7a pequena': ['coloring', 'big-small-app', 'matching-app'],
  },
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
  sv: {
    'addition': ['image-addition', 'code-addition', 'math-worksheet'],
    'subtraktion': ['subtraction', 'math-worksheet'],
    'matematik': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'r\u00e4kna': ['math-worksheet', 'image-addition', 'subtraction'],
    'r\u00e4kning': ['find-and-count', 'chart-count-color', 'more-less'],
    'tal': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'ordf\u00f6rr\u00e5d': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'ord': ['word-search', 'word-scramble', 'word-guess'],
    'alfabet': ['alphabet-train', 'writing-app'],
    'bokst\u00e4ver': ['alphabet-train', 'writing-app'],
    'skrivning': ['writing-app', 'story-dice'],
    'm\u00f6nster': ['pattern-worksheet', 'pattern-train'],
    'logik': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'f\u00e4rgl\u00e4ggning': ['coloring', 'draw-and-color'],
    'rita': ['coloring', 'draw-and-color', 'drawing-lines'],
    'pussel': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'spel': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'labyrint': ['picture-path'],
    'f\u00f6rskola': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
    'g\u00f6mda f\u00f6rem\u00e5l': ['find-objects'],
    'visuell perception': ['shadow-match', 'find-objects', 'odd-one-out', 'missing-pieces'],
    'kritiskt t\u00e4nkande': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'math-puzzle'],
    'finmotorik': ['drawing-lines', 'coloring', 'draw-and-color'],
    'handstil': ['writing-app', 'drawing-lines'],
    'korsord': ['image-crossword'],
    'sm\u00e5barn': ['coloring', 'big-small-app', 'matching-app'],
  },
  da: {
    'addition': ['image-addition', 'code-addition', 'math-worksheet'],
    'subtraktion': ['subtraction', 'math-worksheet'],
    'matematik': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'regne': ['math-worksheet', 'image-addition', 'subtraction'],
    't\u00e6lle': ['find-and-count', 'chart-count-color', 'more-less'],
    'tal': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'ordforr\u00e5d': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'ord': ['word-search', 'word-scramble', 'word-guess'],
    'alfabet': ['alphabet-train', 'writing-app'],
    'bogstaver': ['alphabet-train', 'writing-app'],
    'skrivning': ['writing-app', 'story-dice'],
    'm\u00f8nster': ['pattern-worksheet', 'pattern-train'],
    'logik': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'farvel\u00e6gning': ['coloring', 'draw-and-color'],
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
  no: {
    'addisjon': ['image-addition', 'code-addition', 'math-worksheet'],
    'subtraksjon': ['subtraction', 'math-worksheet'],
    'matematikk': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'regne': ['math-worksheet', 'image-addition', 'subtraction'],
    'telle': ['find-and-count', 'chart-count-color', 'more-less'],
    'tall': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'ordforr\u00e5d': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'ord': ['word-search', 'word-scramble', 'word-guess'],
    'alfabet': ['alphabet-train', 'writing-app'],
    'bokstaver': ['alphabet-train', 'writing-app'],
    'skriving': ['writing-app', 'story-dice'],
    'm\u00f8nster': ['pattern-worksheet', 'pattern-train'],
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
  fi: {
    'yhteenlasku': ['image-addition', 'code-addition', 'math-worksheet'],
    'v\u00e4hennyslasku': ['subtraction', 'math-worksheet'],
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
    'v\u00e4ritt\u00e4minen': ['coloring', 'draw-and-color'],
    'piirt\u00e4minen': ['coloring', 'draw-and-color', 'drawing-lines'],
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

const ALL_EN_KEYWORDS = Object.keys(KEYWORD_PRODUCT_MAP);

// ---------------------------------------------------------------------------
// Build reverse map: locale keyword → best English keyword (Jaccard similarity)
// ---------------------------------------------------------------------------

function buildReverseMap() {
  const reverseMap = {}; // { locale: { localeKeyword: englishKeyword } }

  for (const locale of NON_EN_LOCALES) {
    reverseMap[locale] = {};
    const localeMap = KEYWORD_TRANSLATIONS[locale];
    if (!localeMap) continue;

    for (const [localeKeyword, localeAppIds] of Object.entries(localeMap)) {
      let bestEnglishKeyword = null;
      let bestScore = 0;

      for (const [englishKeyword, englishAppIds] of Object.entries(KEYWORD_PRODUCT_MAP)) {
        const localeSet = new Set(localeAppIds);
        const englishSet = new Set(englishAppIds);
        const intersection = [...localeSet].filter(id => englishSet.has(id));
        const union = new Set([...localeSet, ...englishSet]);
        const jaccardScore = intersection.length / union.size;

        if (jaccardScore > bestScore) {
          bestScore = jaccardScore;
          bestEnglishKeyword = englishKeyword;
        }
      }

      if (bestEnglishKeyword) {
        reverseMap[locale][localeKeyword] = bestEnglishKeyword;
      }
    }
  }

  return reverseMap;
}

// ---------------------------------------------------------------------------
// Keyword extraction (title + slug + focusKeyword only -- NO content)
// ---------------------------------------------------------------------------

/**
 * Strip HTML tags and return lowercase plain text.
 */
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').toLowerCase();
}

/**
 * Extract matching English keywords from text using a keyword list.
 * Uses Unicode-safe word boundaries (same regex as internal-linking.ts).
 */
function extractFromText(text, keywordList) {
  const found = [];
  for (const keyword of keywordList) {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(
      `(?:^|[\\s,;.!?()\\[\\]])${escaped}(?=[\\s,;.!?()\\[\\]]|$)`,
      'i'
    );
    if (regex.test(text)) {
      found.push(keyword);
    }
  }
  return found;
}

/**
 * Extract English keywords for a post by scanning all 11 locale translations.
 * Returns { keywords: string[], sources: Map<keyword, source[]> } for priority sorting.
 *
 * Source priority: focusKeyword > title > slug
 */
function extractKeywordsAllLocales(post, reverseMap) {
  // Track keyword → source for priority sorting
  // source: 'focusKeyword', 'title', 'slug'
  const keywordSources = new Map(); // englishKeyword → Set of sources

  function addKeyword(englishKeyword, source) {
    if (!keywordSources.has(englishKeyword)) {
      keywordSources.set(englishKeyword, new Set());
    }
    keywordSources.get(englishKeyword).add(source);
  }

  for (const locale of ALL_LOCALES) {
    const translation = post.translations?.[locale];
    if (!translation) continue;

    const title = stripHtml(translation.title || '');
    const slug = (translation.slug || '').replace(/-/g, ' ').toLowerCase();
    const focusKeyword = (translation.focusKeyword || '').toLowerCase().trim();

    // Build text for each source separately so we can track priority
    const sources = [
      { text: focusKeyword, source: 'focusKeyword' },
      { text: title, source: 'title' },
      { text: slug, source: 'slug' },
    ];

    if (locale === 'en') {
      // English: match directly against KEYWORD_PRODUCT_MAP keys
      for (const { text, source } of sources) {
        if (!text) continue;
        const matches = extractFromText(text, ALL_EN_KEYWORDS);
        for (const kw of matches) {
          addKeyword(kw, source);
        }
      }
    } else {
      // Non-English locale:
      // a) Match against English keywords (loanwords: addition, sudoku, bingo, puzzle, alphabet)
      for (const { text, source } of sources) {
        if (!text) continue;
        const enMatches = extractFromText(text, ALL_EN_KEYWORDS);
        for (const kw of enMatches) {
          addKeyword(kw, source);
        }
      }

      // b) Match against locale keywords, then reverse-map to English
      const localeKeywords = Object.keys(KEYWORD_TRANSLATIONS[locale] || {});
      if (localeKeywords.length > 0 && reverseMap[locale]) {
        for (const { text, source } of sources) {
          if (!text) continue;
          const localeMatches = extractFromText(text, localeKeywords);
          for (const localeKw of localeMatches) {
            const englishKw = reverseMap[locale][localeKw];
            if (englishKw) {
              addKeyword(englishKw, source);
            }
          }
        }
      }
    }
  }

  // Priority sort: focusKeyword-derived > title-derived > slug-derived
  const prioritized = [...keywordSources.entries()].sort((a, b) => {
    const aHasFocus = a[1].has('focusKeyword') ? 0 : 1;
    const bHasFocus = b[1].has('focusKeyword') ? 0 : 1;
    if (aHasFocus !== bHasFocus) return aHasFocus - bHasFocus;

    const aHasTitle = a[1].has('title') ? 0 : 1;
    const bHasTitle = b[1].has('title') ? 0 : 1;
    if (aHasTitle !== bHasTitle) return aHasTitle - bHasTitle;

    return 0; // both from slug, keep original order
  });

  // Cap at MAX_KEYWORDS_PER_POST
  const keywords = prioritized.slice(0, MAX_KEYWORDS_PER_POST).map(([kw]) => kw);

  return { keywords, keywordSources };
}

// ---------------------------------------------------------------------------
// Backup helpers
// ---------------------------------------------------------------------------

function ensureBackupDir() {
  const dir = path.join(__dirname, 'backups');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

function createBackup(posts) {
  const dir = ensureBackupDir();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filePath = path.join(dir, `keywords-backup-${timestamp}.json`);
  const data = posts.map(p => ({
    id: p.id,
    slug: p.translations?.en?.slug || 'unknown',
    keywords: p.keywords || [],
  }));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`\nBackup saved to: ${filePath}`);
  console.log(`Backed up ${data.length} posts`);
  return filePath;
}

// ---------------------------------------------------------------------------
// Verify mode
// ---------------------------------------------------------------------------

async function runVerify() {
  console.log('=== KEYWORD VERIFICATION ===\n');

  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, keywords: true, translations: true },
  });

  // Keyword distribution
  const keywordCounts = {};
  let postsWithMapKeywords = 0;

  for (const post of posts) {
    const keywords = post.keywords || [];
    const matchingKeywords = keywords.filter(k => ALL_EN_KEYWORDS.includes(k));
    if (matchingKeywords.length > 0) postsWithMapKeywords++;
    for (const kw of matchingKeywords) {
      keywordCounts[kw] = (keywordCounts[kw] || 0) + 1;
    }
  }

  console.log(`Total published posts: ${posts.length}`);
  console.log(`Posts with KEYWORD_PRODUCT_MAP keywords: ${postsWithMapKeywords}`);
  console.log(`Posts WITHOUT map keywords: ${posts.length - postsWithMapKeywords}\n`);

  console.log('Keyword distribution (top 20):');
  const sorted = Object.entries(keywordCounts).sort((a, b) => b[1] - a[1]);
  for (const [kw, count] of sorted.slice(0, 20)) {
    const pct = ((count / posts.length) * 100).toFixed(1);
    const warn = count > posts.length * 0.3 ? ' *** WARNING: >30%' : '';
    console.log(`  ${kw}: ${count} posts (${pct}%)${warn}`);
  }

  // Check for unique coverage per app
  console.log('\nKeywords with zero posts:');
  const zeroKeywords = ALL_EN_KEYWORDS.filter(k => !keywordCounts[k]);
  if (zeroKeywords.length === 0) {
    console.log('  None -- all keywords have at least one post!');
  } else {
    for (const kw of zeroKeywords) {
      console.log(`  ${kw}`);
    }
  }

  // Keywords per post histogram
  console.log('\nKeywords per post histogram:');
  const histogram = {};
  for (const post of posts) {
    const count = (post.keywords || []).filter(k => ALL_EN_KEYWORDS.includes(k)).length;
    histogram[count] = (histogram[count] || 0) + 1;
  }
  for (const [count, numPosts] of Object.entries(histogram).sort((a, b) => Number(a[0]) - Number(b[0]))) {
    console.log(`  ${count} keywords: ${numPosts} posts`);
  }

  const representedKeywords = Object.keys(keywordCounts).length;
  console.log(`\nKeyword coverage: ${representedKeywords}/${ALL_EN_KEYWORDS.length} keywords represented`);
  if (representedKeywords < 20) {
    console.log('  WARNING: fewer than 20 keywords represented');
  }

  console.log('\n=== VERIFICATION COMPLETE ===');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (VERIFY) {
    await runVerify();
    return;
  }

  console.log(`=== BLOG KEYWORD BACKFILL v2 ${DRY_RUN ? '(DRY RUN)' : '(APPLYING)'} ===\n`);
  console.log('Algorithm: title + slug + focusKeyword across all 11 locales');
  console.log(`Max keywords per post: ${MAX_KEYWORDS_PER_POST}`);
  console.log('');

  // Build reverse map at startup
  console.log('Building locale→English reverse map (Jaccard similarity)...');
  const reverseMap = buildReverseMap();
  if (VERBOSE) {
    for (const locale of NON_EN_LOCALES) {
      const entries = Object.entries(reverseMap[locale] || {});
      console.log(`  ${locale}: ${entries.length} mappings`);
      for (const [lk, ek] of entries) {
        console.log(`    "${lk}" → "${ek}"`);
      }
    }
  } else {
    for (const locale of NON_EN_LOCALES) {
      const count = Object.keys(reverseMap[locale] || {}).length;
      console.log(`  ${locale}: ${count} keyword mappings`);
    }
  }
  console.log('');

  // Fetch all published posts
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: {
      id: true,
      keywords: true,
      translations: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  console.log(`Found ${posts.length} published posts\n`);

  // Compute changes
  const changes = [];
  let skippedNoNew = 0;
  let skippedNoTranslation = 0;
  const postsWithZeroKeywords = [];

  for (const post of posts) {
    const enTranslation = post.translations?.en;
    if (!enTranslation) {
      skippedNoTranslation++;
      if (VERBOSE) console.log(`  SKIP (no EN translation): ${post.id}`);
      continue;
    }

    const { keywords: extracted, keywordSources } = extractKeywordsAllLocales(post, reverseMap);

    // Merge with existing (additive, deduplicated)
    const existing = post.keywords || [];
    const merged = [...new Set([...existing, ...extracted])];

    // Only track if there are new keywords
    const newKeywords = extracted.filter(k => !existing.includes(k));

    if (newKeywords.length === 0 && extracted.length === 0 && existing.length === 0) {
      postsWithZeroKeywords.push(enTranslation.slug || post.id);
    }

    if (newKeywords.length === 0) {
      skippedNoNew++;
      if (VERBOSE) console.log(`  SKIP (no new keywords): ${enTranslation.slug}`);
      continue;
    }

    changes.push({
      id: post.id,
      slug: enTranslation.slug || 'unknown',
      existingKeywords: existing,
      newKeywords: newKeywords,
      finalKeywords: merged,
      sources: keywordSources,
    });
  }

  // Report
  console.log(`Posts to update: ${changes.length}`);
  console.log(`Skipped (no new keywords): ${skippedNoNew}`);
  console.log(`Skipped (no EN translation): ${skippedNoTranslation}\n`);

  if (changes.length === 0 && postsWithZeroKeywords.length === 0) {
    console.log('No changes needed. All posts already have correct keywords.');
    return;
  }

  // Show changes
  if (changes.length > 0) {
    console.log('--- Changes ---\n');
    for (const change of changes) {
      console.log(`${change.slug}:`);
      console.log(`  Existing: [${change.existingKeywords.join(', ')}]`);
      console.log(`  Adding:   [${change.newKeywords.join(', ')}]`);
      console.log(`  Final:    [${change.finalKeywords.join(', ')}]`);
      if (VERBOSE && change.sources) {
        for (const [kw, sources] of change.sources.entries()) {
          if (change.newKeywords.includes(kw)) {
            console.log(`    "${kw}" from: ${[...sources].join(', ')}`);
          }
        }
      }
      console.log('');
    }
  }

  // Distribution summary
  const allFinalKeywords = {};
  for (const change of changes) {
    for (const kw of change.finalKeywords) {
      allFinalKeywords[kw] = (allFinalKeywords[kw] || 0) + 1;
    }
  }
  // Also count posts not being changed
  for (const post of posts) {
    const slug = post.translations?.en?.slug;
    if (slug && !changes.find(c => c.slug === slug)) {
      for (const kw of (post.keywords || [])) {
        if (ALL_EN_KEYWORDS.includes(kw)) {
          allFinalKeywords[kw] = (allFinalKeywords[kw] || 0) + 1;
        }
      }
    }
  }

  console.log('--- Final keyword distribution (after applying) ---\n');
  const sortedFinal = Object.entries(allFinalKeywords).sort((a, b) => b[1] - a[1]);
  let warnings = 0;
  for (const [kw, count] of sortedFinal) {
    const pct = ((count / posts.length) * 100).toFixed(1);
    const warn = count > posts.length * 0.3 ? ' *** WARNING: >30%' : '';
    if (warn) warnings++;
    console.log(`  ${kw}: ${count} posts (${pct}%)${warn}`);
  }
  console.log('');

  // New keyword distribution (just the additions)
  const allNewKeywords = {};
  for (const change of changes) {
    for (const kw of change.newKeywords) {
      allNewKeywords[kw] = (allNewKeywords[kw] || 0) + 1;
    }
  }
  console.log('--- New keyword additions ---\n');
  const sortedNew = Object.entries(allNewKeywords).sort((a, b) => b[1] - a[1]);
  for (const [kw, count] of sortedNew) {
    console.log(`  ${kw}: +${count} posts`);
  }
  console.log('');

  // Guardrails
  console.log('--- Distribution guardrails ---\n');
  const representedKeywords = Object.keys(allFinalKeywords).length;
  console.log(`Keywords represented: ${representedKeywords}/${ALL_EN_KEYWORDS.length}`);
  if (representedKeywords < 20) {
    console.log('  WARNING: fewer than 20 keywords represented');
  } else {
    console.log('  OK: >= 20 keywords represented');
  }

  if (warnings > 0) {
    console.log(`Keywords exceeding 30% threshold: ${warnings}`);
    console.log('  WARNING: review over-represented keywords above');
  } else {
    console.log('No keyword exceeds 30% threshold: OK');
  }

  if (postsWithZeroKeywords.length > 0) {
    console.log(`\nPosts with zero keywords (need manual review): ${postsWithZeroKeywords.length}`);
    for (const slug of postsWithZeroKeywords) {
      console.log(`  ${slug}`);
    }
  } else {
    console.log('All posts have at least 1 keyword: OK');
  }
  console.log('');

  if (changes.length === 0) {
    console.log('No changes to apply.');
    return;
  }

  if (DRY_RUN) {
    console.log('=== DRY RUN COMPLETE ===');
    console.log('Run with --apply to write changes to the database.');
    return;
  }

  // Create backup before applying
  const backupPath = createBackup(posts);
  console.log('\nApplying changes...\n');

  // Apply in batches of 10 within transactions
  const BATCH_SIZE = 10;
  let applied = 0;

  for (let i = 0; i < changes.length; i += BATCH_SIZE) {
    const batch = changes.slice(i, i + BATCH_SIZE);

    await prisma.$transaction(
      batch.map(change =>
        prisma.blogPost.update({
          where: { id: change.id },
          data: { keywords: change.finalKeywords },
        })
      )
    );

    applied += batch.length;
    console.log(`  Applied batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} posts (${applied}/${changes.length} total)`);
  }

  console.log(`\n=== APPLY COMPLETE: ${applied} posts updated ===`);
  console.log(`Backup at: ${backupPath}`);
  console.log('Run with --verify to check the result.');
}

main()
  .catch(e => {
    console.error('ERROR:', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
