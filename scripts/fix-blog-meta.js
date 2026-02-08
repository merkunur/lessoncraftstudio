#!/usr/bin/env node
/**
 * fix-blog-meta.js — Fix garbage metaTitle/metaDescription/focusKeyword for blog posts
 *
 * Usage:
 *   node scripts/fix-blog-meta.js <locale>              # DRY RUN (shows changes)
 *   node scripts/fix-blog-meta.js <locale> --commit      # WRITES to database
 *   node scripts/fix-blog-meta.js <locale> --force        # Re-fix even already-fixed posts
 *   node scripts/fix-blog-meta.js <locale> --commit --force
 *
 * Locales: en, de, fr, es, pt, it, nl, sv, da, no, fi
 *
 * What it does:
 *   1. Reads the `title` field (high quality H1) for the locale
 *   2. Generates metaTitle: intelligently truncated to 50-60 chars
 *   3. Generates metaDescription: from excerpt, 140-160 chars
 *   4. Generates focusKeyword: key terms from title, with locale-aware stop word removal
 *   5. Only updates posts that still have garbage/template meta
 *
 * Run on server: cd /opt/lessoncraftstudio/frontend && node ../scripts/fix-blog-meta.js en --commit
 */

// Resolve @prisma/client from the frontend directory
const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

// ============================================================
// CONFIGURATION
// ============================================================

const VALID_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const META_TITLE_MIN = 50;
const META_TITLE_MAX = 60;
const META_DESC_MIN = 140;
const META_DESC_MAX = 160;

// Garbage pattern prefixes per locale — these indicate the meta was auto-generated from template
const GARBAGE_PREFIXES = {
  en: ['Free Printable'],
  de: ['Kostenlos Druckbar', 'Kostenlose Druckbare'],
  fr: ['Gratuit Imprimable', 'Gratuite Imprimable'],
  es: ['Gratis Imprimible', 'Gratuito Imprimible'],
  pt: ['Gr\u00e1tis Imprim\u00edvel', 'Gratis Imprim\u00edvel', 'Gr\u00e1tis Imprimivel', 'Gratis Imprimivel'],
  it: ['Gratuito Stampabile', 'Gratuita Stampabile'],
  nl: ['Gratis Afdrukbaar', 'Gratis Printbaar'],
  sv: ['Gratis Utskrivbar', 'Gratis Utskrivbara'],
  da: ['Gratis Printbar', 'Gratis Printbare', 'Gratis Print'],
  no: ['Gratis Utskrivbar', 'Gratis Utskriftbar', 'Gratis Utskrivbare'],
  fi: ['Ilmainen Tulostettava', 'Ilmaisia Tulostettavia'],
};

// Garbage description prefixes per locale
const GARBAGE_DESC_PREFIXES = {
  en: ['Download free'],
  de: ['Laden Sie kostenlose'],
  fr: ['T\u00e9l\u00e9chargez des', 'T\u00e9l\u00e9chargez gratuitement'],
  es: ['Descargue gratis', 'Descarga gratis'],
  pt: ['Baixe gr\u00e1tis', 'Baixe gratuitamente', 'Baixe gratis'],
  it: ['Scarica gratis', 'Scarica gratuitamente'],
  nl: ['Download gratis'],
  sv: ['Ladda ner gratis'],
  da: ['Download gratis'],
  no: ['Last ned gratis'],
  fi: ['Lataa ilmaisia', 'Lataa ilmaiset'],
};

// Stop words per locale — removed from focusKeyword generation
const STOP_WORDS = {
  en: new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'shall', 'that', 'this', 'these', 'those', 'it', 'its', 'how', 'why', 'what', 'when', 'where', 'which', 'who', 'whom', 'whose', 'up', 'out', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'under', 'over', 'then', 'than', 'each', 'every', 'all', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'not', 'only', 'same', 'so', 'too', 'very', 'just', 'also', 'using', 'your']),
  de: new Set(['der', 'die', 'das', 'ein', 'eine', 'einen', 'einem', 'einer', 'und', 'oder', 'aber', 'in', 'im', 'an', 'am', 'auf', 'zu', 'zum', 'zur', 'f\u00fcr', 'von', 'vom', 'mit', 'bei', 'aus', 'nach', 'ist', 'sind', 'war', 'waren', 'hat', 'haben', 'wird', 'werden', 'wie', 'warum', 'was', 'wann', 'wo', 'welche', 'welcher', 'welches', 'den', 'dem', 'des', 'als', 'es', 'sich', 'nicht', 'auch', 'noch', 'nur', 'dann', 'so', 'sehr', '\u00fcber', 'unter', 'zwischen', 'durch', 'vor', 'nach', 'um', 'bis', 'seit', 'ohne', 'gegen', 'alle', 'diesem', 'dieser', 'dieses', 'jeder', 'jedem', 'jedes']),
  fr: new Set(['le', 'la', 'les', 'un', 'une', 'des', 'et', 'ou', 'mais', 'en', 'dans', 'sur', 'au', 'aux', '\u00e0', 'de', 'du', 'pour', 'par', 'avec', 'est', 'sont', 'a', 'ont', 'qui', 'que', 'comment', 'pourquoi', 'quoi', 'quand', 'o\u00f9', 'ce', 'cette', 'ces', 'il', 'elle', 'ils', 'elles', 'se', 'ne', 'pas', 'plus', 'aussi', 'tr\u00e8s', 'entre', 'sous', 'sur', 'avant', 'apr\u00e8s', 'chaque', 'tout', 'tous', 'toute', 'toutes', 'son', 'sa', 'ses', 'leur', 'leurs', 'votre', 'vos']),
  es: new Set(['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'pero', 'en', 'de', 'del', 'al', 'a', 'para', 'por', 'con', 'es', 'son', 'ha', 'han', 'c\u00f3mo', 'por qu\u00e9', 'qu\u00e9', 'cu\u00e1ndo', 'd\u00f3nde', 'que', 'se', 'no', 'su', 'sus', 'este', 'esta', 'estos', 'estas', 'ese', 'esa', 'esos', 'esas', 'cada', 'todo', 'todos', 'toda', 'todas', 'muy', 'entre', 'sobre', 'bajo', 'hasta', 'desde', 'sin', 'como']),
  pt: new Set(['o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas', 'e', 'ou', 'mas', 'em', 'de', 'do', 'da', 'dos', 'das', 'ao', 'aos', 'para', 'por', 'com', '\u00e9', 's\u00e3o', 'tem', 'como', 'por que', 'que', 'quando', 'onde', 'se', 'n\u00e3o', 'seu', 'sua', 'seus', 'suas', 'este', 'esta', 'estes', 'estas', 'esse', 'essa', 'esses', 'essas', 'cada', 'todo', 'todos', 'toda', 'todas', 'muito', 'entre', 'sobre', 'sob', 'at\u00e9', 'desde', 'sem', 'no', 'na', 'nos', 'nas']),
  it: new Set(['il', 'lo', 'la', 'i', 'gli', 'le', 'un', 'uno', 'una', 'e', 'o', 'ma', 'in', 'di', 'del', 'della', 'dei', 'delle', 'a', 'al', 'alla', 'ai', 'alle', 'per', 'da', 'con', '\u00e8', 'sono', 'ha', 'hanno', 'come', 'perch\u00e9', 'che', 'quando', 'dove', 'si', 'non', 'suo', 'sua', 'suoi', 'sue', 'questo', 'questa', 'questi', 'queste', 'quello', 'quella', 'quelli', 'quelle', 'ogni', 'tutto', 'tutti', 'tutta', 'tutte', 'molto', 'tra', 'fra', 'su', 'sotto', 'fino', 'senza', 'nel', 'nella', 'nei', 'nelle', 'sul', 'sulla', 'sui', 'sulle']),
  nl: new Set(['de', 'het', 'een', 'en', 'of', 'maar', 'in', 'op', 'aan', 'voor', 'van', 'met', 'bij', 'uit', 'naar', 'is', 'zijn', 'was', 'waren', 'heeft', 'hebben', 'hoe', 'waarom', 'wat', 'wanneer', 'waar', 'die', 'dat', 'deze', 'dit', 'hij', 'zij', 'ze', 'zich', 'niet', 'ook', 'nog', 'al', 'er', 'meer', 'veel', 'elk', 'alle', 'over', 'onder', 'tussen', 'door', 'om', 'te', 'je', 'jouw', 'uw', 'hun']),
  sv: new Set(['den', 'det', 'en', 'ett', 'och', 'eller', 'men', 'i', 'p\u00e5', 'av', 'till', 'f\u00f6r', 'med', 'fr\u00e5n', 'vid', '\u00e4r', 'var', 'har', 'hur', 'varf\u00f6r', 'vad', 'n\u00e4r', 'var', 'som', 'att', 'de', 'denna', 'detta', 'dessa', 'han', 'hon', 'sig', 'inte', 'ocks\u00e5', '\u00e4nnu', 'alla', 'varje', 'mer', 'mest', 'mycket', 'mellan', '\u00f6ver', 'under', 'genom', 'om', 'din', 'dina', 'er', 'era']),
  da: new Set(['den', 'det', 'en', 'et', 'og', 'eller', 'men', 'i', 'p\u00e5', 'af', 'til', 'for', 'med', 'fra', 'ved', 'er', 'var', 'har', 'hvordan', 'hvorfor', 'hvad', 'hvorn\u00e5r', 'hvor', 'som', 'at', 'de', 'denne', 'dette', 'disse', 'han', 'hun', 'sig', 'ikke', 'ogs\u00e5', 'endnu', 'alle', 'hver', 'mere', 'mest', 'meget', 'mellem', 'over', 'under', 'gennem', 'om', 'din', 'dine', 'jeres']),
  no: new Set(['den', 'det', 'en', 'et', 'ei', 'og', 'eller', 'men', 'i', 'p\u00e5', 'av', 'til', 'for', 'med', 'fra', 'ved', 'er', 'var', 'har', 'hvordan', 'hvorfor', 'hva', 'n\u00e5r', 'hvor', 'som', 'at', 'de', 'denne', 'dette', 'disse', 'han', 'hun', 'seg', 'ikke', 'ogs\u00e5', 'enn\u00e5', 'alle', 'hver', 'mer', 'mest', 'mye', 'mellom', 'over', 'under', 'gjennom', 'om', 'din', 'dine', 'deres']),
  fi: new Set(['ja', 'tai', 'mutta', 'kun', 'jos', 'niin', 'on', 'ovat', 'oli', 'olla', 'ei', 'se', 'sen', 'sit\u00e4', 'ne', 'niiden', 'h\u00e4n', 'he', 'me', 'te', 'miten', 'miksi', 'mit\u00e4', 'milloin', 'miss\u00e4', 'joka', 'jotka', 't\u00e4m\u00e4', 't\u00e4m\u00e4n', 'n\u00e4m\u00e4', 'kaikki', 'jokainen', 'my\u00f6s', 'viel\u00e4', 'hyvin', 'paljon', 'yli', 'alle', 'v\u00e4lill\u00e4', 'kanssa', 'ilman', 'ennen', 'j\u00e4lkeen', 'asti', 'sinun']),
};

// Brand suffix to append to metaTitle when space allows
const BRAND_SUFFIX = ' | LessonCraftStudio';
const SHORT_BRAND_SUFFIX = ' | LCS';

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if a metaTitle is garbage (auto-generated template)
 */
function isGarbageTitle(text, locale) {
  if (!text) return true;
  const prefixes = GARBAGE_PREFIXES[locale] || [];
  const lower = text.toLowerCase();
  for (const prefix of prefixes) {
    if (lower.startsWith(prefix.toLowerCase())) return true;
  }
  // Also catch the "... - LessonCraftStudio" pattern with ellipsis
  if (text.includes('...') && text.includes('LessonCraftStudio')) return true;
  // Catch any title that has "...  -" (truncated template)
  if (/\.\.\.\s+-\s/.test(text)) return true;
  return false;
}

/**
 * Check if a metaDescription is garbage (auto-generated template)
 */
function isGarbageDescription(text, locale) {
  if (!text) return true;
  const prefixes = GARBAGE_DESC_PREFIXES[locale] || [];
  const lower = text.toLowerCase();
  for (const prefix of prefixes) {
    if (lower.startsWith(prefix.toLowerCase())) return true;
  }
  // Catch generic template descriptions
  if (text.includes('worksheets for kindergarten and first grade. Professional printables')) return true;
  if (text.includes('Arbeitsbl\u00e4tter f\u00fcr Vorschule und Grundschule herunter. Professionelle')) return true;
  if (text.includes('Druckvorlagen f\u00fcr Lehrer und Eltern')) return true;
  if (text.includes('pour la maternelle et le primaire')) return true;
  if (text.includes('para preescolar y primaria')) return true;
  if (text.includes('para pr\u00e9-escola e ensino fundamental')) return true;
  if (text.includes('per la scuola materna e primaria')) return true;
  if (text.includes('voor kleuterschool en basisschool')) return true;
  if (text.includes('f\u00f6r f\u00f6rskola och grundskola')) return true;
  if (text.includes('til b\u00f8rnehave og indskoling')) return true;
  if (text.includes('for barnehage og barneskole')) return true;
  if (text.includes('esikoulu ja ala-aste')) return true;
  return false;
}

/**
 * Check if a focusKeyword is garbage
 */
function isGarbageKeyword(text, locale) {
  if (!text) return true;
  const lower = text.toLowerCase();
  // Garbage keywords start with "free" + mangled title words
  if (lower.startsWith('free ') && lower.includes(' worksheets')) return true;
  if (lower.startsWith('kostenlose ') || lower.startsWith('kostenlos ')) {
    if (lower.includes(' arbeitsbl')) return true;
  }
  if (lower.startsWith('gratuit ') || lower.startsWith('gratis ') || lower.startsWith('gratuito ')) {
    if (lower.includes(' fiches') || lower.includes(' hojas') || lower.includes(' schede') || lower.includes(' werkbladen') || lower.includes(' arbetsblad') || lower.includes(' arbeidsark') || lower.includes(' ty\u00f6arkit') || lower.includes(' opgaver') || lower.includes(' oppgaver')) return true;
  }
  if (lower.startsWith('ilmainen ') && lower.includes(' ty\u00f6')) return true;
  return false;
}

/**
 * Generate a proper metaTitle from the blog post title.
 * Target: 50-60 characters. Intelligently truncates long titles.
 * Priority: maximize meaningful content within budget, brand is optional.
 */
function generateMetaTitle(title) {
  if (!title) return null;

  let clean = title.trim();

  // Helper: try adding brand suffix if it fits
  function withBrand(text) {
    if ((text + BRAND_SUFFIX).length >= META_TITLE_MIN && (text + BRAND_SUFFIX).length <= META_TITLE_MAX) {
      return text + BRAND_SUFFIX;
    }
    if ((text + SHORT_BRAND_SUFFIX).length >= META_TITLE_MIN && (text + SHORT_BRAND_SUFFIX).length <= META_TITLE_MAX) {
      return text + SHORT_BRAND_SUFFIX;
    }
    return null;
  }

  // Helper: truncate at word boundary, maximizing content within max chars
  function truncateWords(text, max) {
    if (text.length <= max) return text;
    let truncated = text.substring(0, max);
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 20) truncated = truncated.substring(0, lastSpace);
    return truncated.replace(/[,;:\s]+$/, '');
  }

  // === PHASE 1: Title fits with brand ===
  const branded = withBrand(clean);
  if (branded) return branded;

  // === PHASE 2: Title too long — try structural simplification ===

  // Remove parenthetical at end
  const parenMatch = clean.match(/^(.+?)\s*\([^)]+\)\s*$/);
  if (parenMatch) {
    const withoutParen = parenMatch[1].trim();
    const bp = withBrand(withoutParen);
    if (bp) return bp;
    // Without paren fits in range alone?
    if (withoutParen.length >= META_TITLE_MIN && withoutParen.length <= META_TITLE_MAX) {
      return withoutParen;
    }
  }

  // === PHASE 3: Try truncating at natural break points ===
  // Collect candidate break points (colon, em-dash, comma after 25+ chars)
  const candidates = [];

  // Split on colon
  const colonIdx = clean.indexOf(': ');
  if (colonIdx >= 15) {
    // Try including progressively more of the second part
    const firstPart = clean.substring(0, colonIdx);
    const secondPart = clean.substring(colonIdx + 2);
    const words = secondPart.split(/\s+/);

    // Try first part + progressively more words from second part
    for (let i = words.length; i >= 0; i--) {
      const partial = i === 0 ? firstPart : firstPart + ': ' + words.slice(0, i).join(' ');
      if (partial.length <= META_TITLE_MAX) {
        candidates.push(partial);
        break; // best fit found
      }
    }
  }

  // Split on em dash
  const dashMatch = clean.match(/^(.+?)\s*[\u2014\u2013]\s*/);
  if (dashMatch && dashMatch[1].length >= 15) {
    candidates.push(dashMatch[1].trim());
  }

  // Word-boundary truncation of the full title
  const wordTrunc = truncateWords(clean, META_TITLE_MAX);
  if (wordTrunc.length >= 30) {
    candidates.push(wordTrunc);
  }

  // === PHASE 4: Score candidates and pick best ===
  // Prefer: (1) in 50-60 range, (2) with brand, (3) longest content
  let best = null;
  let bestScore = -1;

  for (const candidate of candidates) {
    // Try with brand first
    const branded = withBrand(candidate);
    if (branded) {
      const score = 1000 + branded.length; // strongly prefer branded + in-range
      if (score > bestScore) { best = branded; bestScore = score; }
    }
    // Try without brand if it fits in range
    if (candidate.length >= META_TITLE_MIN && candidate.length <= META_TITLE_MAX) {
      const score = 500 + candidate.length; // prefer longer content
      if (score > bestScore) { best = candidate; bestScore = score; }
    }
    // Accept slightly short (45+) with brand as last resort
    if ((candidate + SHORT_BRAND_SUFFIX).length >= 45 && (candidate + SHORT_BRAND_SUFFIX).length <= META_TITLE_MAX) {
      const total = candidate + SHORT_BRAND_SUFFIX;
      const score = 100 + total.length;
      if (score > bestScore) { best = total; bestScore = score; }
    }
    // Accept slightly short without brand (45+)
    if (candidate.length >= 45 && candidate.length <= META_TITLE_MAX) {
      const score = 50 + candidate.length;
      if (score > bestScore) { best = candidate; bestScore = score; }
    }
  }

  if (best) return best;

  // === PHASE 5: Last resort — truncate to fit ===
  const truncated = truncateWords(clean, META_TITLE_MAX - SHORT_BRAND_SUFFIX.length);
  if (truncated.length >= 30) {
    return truncated + SHORT_BRAND_SUFFIX;
  }
  return truncateWords(clean, META_TITLE_MAX);
}

/**
 * Generate a proper metaDescription from the excerpt.
 * Target: 140-160 characters.
 */
function generateMetaDescription(excerpt, title) {
  if (!excerpt && !title) return null;

  let source = (excerpt || title || '').trim();

  // Remove any HTML tags
  source = source.replace(/<[^>]+>/g, '');

  // If source is already in range, use it
  if (source.length >= META_DESC_MIN && source.length <= META_DESC_MAX) {
    return source;
  }

  // If too short, pad with context
  if (source.length < META_DESC_MIN) {
    // If we have both excerpt and title, combine
    if (excerpt && title) {
      // Try: title + ". " + excerpt
      const combined = `${title.trim()}. ${source}`;
      if (combined.length >= META_DESC_MIN && combined.length <= META_DESC_MAX) {
        return combined;
      }
      if (combined.length > META_DESC_MAX) {
        return truncateToSentence(combined, META_DESC_MIN, META_DESC_MAX);
      }
    }
    // Pad with "Free printable worksheets..." suffix for the locale
    const pad = ' Free printable educational worksheets for teachers and parents.';
    const padded = source + pad;
    if (padded.length >= META_DESC_MIN && padded.length <= META_DESC_MAX) {
      return padded;
    }
    if (padded.length > META_DESC_MAX) {
      return truncateToSentence(padded, META_DESC_MIN, META_DESC_MAX);
    }
    // Still too short — return as-is (will be flagged in verification)
    return source;
  }

  // Too long — truncate intelligently at sentence/clause boundary
  return truncateToSentence(source, META_DESC_MIN, META_DESC_MAX);
}

/**
 * Truncate text to a target range, preferring sentence boundaries.
 */
function truncateToSentence(text, min, max) {
  if (text.length <= max) return text;

  // Try to find a sentence boundary (period followed by space) within range
  const candidates = [];
  const periodRegex = /\.\s/g;
  let match;
  while ((match = periodRegex.exec(text)) !== null) {
    const pos = match.index + 1; // Include the period
    if (pos >= min && pos <= max) {
      candidates.push(pos);
    }
  }

  // Use the best sentence boundary (closest to max for more content)
  if (candidates.length > 0) {
    return text.substring(0, candidates[candidates.length - 1]);
  }

  // No sentence boundary in range — try comma/semicolon
  let truncated = text.substring(0, max);
  const lastComma = truncated.lastIndexOf(', ');
  const lastSemicolon = truncated.lastIndexOf('; ');
  const lastBreak = Math.max(lastComma, lastSemicolon);
  if (lastBreak >= min) {
    return text.substring(0, lastBreak) + '.';
  }

  // Last resort: truncate at word boundary
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace >= min) {
    truncated = text.substring(0, lastSpace);
  }
  // Remove trailing punctuation and add period
  truncated = truncated.replace(/[,;:\s]+$/, '');
  if (!truncated.endsWith('.') && !truncated.endsWith('!') && !truncated.endsWith('?')) {
    truncated += '.';
  }
  return truncated.length <= max ? truncated : truncated.substring(0, max);
}

/**
 * Generate a proper focusKeyword from the title.
 * Extracts key terms, removes stop words, keeps accents.
 */
function generateFocusKeyword(title, locale) {
  if (!title) return null;

  const stops = STOP_WORDS[locale] || STOP_WORDS.en;

  // Clean title
  let clean = title.trim();

  // Remove parenthetical suffixes
  clean = clean.replace(/\s*\([^)]*\)\s*$/, '');

  // Split on colon — use both parts but prioritize first
  const colonParts = clean.split(/:\s*/);

  // Tokenize: split on spaces, commas, semicolons, dashes, ampersands
  const allWords = [];
  for (const part of colonParts) {
    const words = part.split(/[\s,;:&×\u2013\u2014]+/).filter(Boolean);
    allWords.push(...words);
  }

  // Remove stop words, numbers-only tokens, and very short words
  const keywords = allWords
    .map(w => w.replace(/^['"]+|['",.!?:;]+$/g, '')) // strip quotes/punctuation
    .filter(w => {
      if (!w || w.length < 2) return false;
      if (stops.has(w.toLowerCase())) return false;
      // Keep numbers that are part of meaningful terms (e.g., "3rd", "1st", "K-5")
      // But remove standalone small numbers
      if (/^\d{1,2}$/.test(w)) return false;
      return true;
    })
    .map(w => w.toLowerCase());

  // Deduplicate while preserving order
  const seen = new Set();
  const unique = keywords.filter(w => {
    if (seen.has(w)) return false;
    seen.add(w);
    return true;
  });

  // Take top keywords (typically 3-5 words for focus keyword)
  const focusWords = unique.slice(0, 5);

  return focusWords.join(' ') || null;
}

// ============================================================
// MAIN SCRIPT
// ============================================================

async function main() {
  const args = process.argv.slice(2);
  const locale = args[0];
  const commit = args.includes('--commit');
  const force = args.includes('--force');

  if (!locale || !VALID_LOCALES.includes(locale)) {
    console.error(`Usage: node fix-blog-meta.js <locale> [--commit] [--force]`);
    console.error(`Valid locales: ${VALID_LOCALES.join(', ')}`);
    process.exit(1);
  }

  console.log(`\n${'='.repeat(70)}`);
  console.log(`Blog Meta Fix — Locale: ${locale.toUpperCase()} — Mode: ${commit ? 'COMMIT' : 'DRY RUN'}${force ? ' (FORCE)' : ''}`);
  console.log(`${'='.repeat(70)}\n`);

  // Fetch all published posts
  const posts = await prisma.$queryRaw`
    SELECT
      id,
      slug,
      jsonb_extract_path_text(translations, ${locale}, 'title') as title,
      jsonb_extract_path_text(translations, ${locale}, 'metaTitle') as "metaTitle",
      jsonb_extract_path_text(translations, ${locale}, 'metaDescription') as "metaDescription",
      jsonb_extract_path_text(translations, ${locale}, 'focusKeyword') as "focusKeyword",
      jsonb_extract_path_text(translations, ${locale}, 'excerpt') as excerpt,
      jsonb_extract_path_text(translations, ${locale}, 'slug') as "localeSlug"
    FROM blog_posts
    WHERE status = 'published'
    ORDER BY slug
  `;

  console.log(`Found ${posts.length} published posts\n`);

  let fixed = 0;
  let skipped = 0;
  let noTitle = 0;
  let errors = [];
  const changes = [];

  for (const post of posts) {
    const { id, slug, title, metaTitle, metaDescription, focusKeyword, excerpt } = post;

    // Skip posts without a title for this locale
    if (!title) {
      noTitle++;
      continue;
    }

    // Check if meta needs fixing
    const titleGarbage = isGarbageTitle(metaTitle, locale);
    const descGarbage = isGarbageDescription(metaDescription, locale);
    const kwGarbage = isGarbageKeyword(focusKeyword, locale);

    if (!force && !titleGarbage && !descGarbage && !kwGarbage) {
      skipped++;
      continue;
    }

    // Generate new meta
    const newTitle = (force || titleGarbage) ? generateMetaTitle(title) : metaTitle;
    const newDesc = (force || descGarbage) ? generateMetaDescription(excerpt, title) : metaDescription;
    const newKeyword = (force || kwGarbage) ? generateFocusKeyword(title, locale) : focusKeyword;

    if (!newTitle && !newDesc && !newKeyword) {
      errors.push({ slug, error: 'Could not generate any meta' });
      continue;
    }

    const change = {
      slug,
      title: title.substring(0, 80) + (title.length > 80 ? '...' : ''),
      before: {
        metaTitle: metaTitle ? metaTitle.substring(0, 60) + (metaTitle && metaTitle.length > 60 ? '...' : '') : '(empty)',
        metaDescription: metaDescription ? metaDescription.substring(0, 60) + (metaDescription && metaDescription.length > 60 ? '...' : '') : '(empty)',
        focusKeyword: focusKeyword || '(empty)',
      },
      after: {
        metaTitle: newTitle || '(unchanged)',
        metaDescription: newDesc ? newDesc.substring(0, 60) + (newDesc.length > 60 ? '...' : '') : '(unchanged)',
        focusKeyword: newKeyword || '(unchanged)',
      },
      lengths: {
        metaTitle: newTitle ? newTitle.length : null,
        metaDescription: newDesc ? newDesc.length : null,
      }
    };
    changes.push(change);

    // Apply the update
    if (commit) {
      try {
        // Build update parts
        const updates = [];
        if (newTitle && (force || titleGarbage)) {
          updates.push(`'{${locale},metaTitle}', '"${escapeJsonString(newTitle)}"'`);
        }
        if (newDesc && (force || descGarbage)) {
          updates.push(`'{${locale},metaDescription}', '"${escapeJsonString(newDesc)}"'`);
        }
        if (newKeyword && (force || kwGarbage)) {
          updates.push(`'{${locale},focusKeyword}', '"${escapeJsonString(newKeyword)}"'`);
        }

        if (updates.length > 0) {
          // Build nested jsonb_set calls
          let sql = 'translations';
          for (const update of updates) {
            sql = `jsonb_set(${sql}, ${update})`;
          }

          await prisma.$executeRawUnsafe(
            `UPDATE blog_posts SET translations = ${sql}, updated_at = NOW() WHERE id = $1`,
            id
          );
          fixed++;
        }
      } catch (err) {
        errors.push({ slug, error: err.message });
      }
    } else {
      fixed++;
    }
  }

  // Print results
  console.log(`${'─'.repeat(70)}`);
  console.log(`RESULTS: ${locale.toUpperCase()}`);
  console.log(`${'─'.repeat(70)}`);
  console.log(`Total posts:     ${posts.length}`);
  console.log(`No title:        ${noTitle}`);
  console.log(`Already fixed:   ${skipped}`);
  console.log(`${commit ? 'Updated' : 'Would update'}: ${fixed}`);
  console.log(`Errors:          ${errors.length}`);
  console.log();

  // Print each change
  if (changes.length > 0) {
    console.log(`\n${'─'.repeat(70)}`);
    console.log(`CHANGES (${changes.length}):`);
    console.log(`${'─'.repeat(70)}`);
    for (const c of changes) {
      console.log(`\n  [${c.slug}]`);
      console.log(`  Title: ${c.title}`);
      if (c.before.metaTitle !== c.after.metaTitle) {
        console.log(`  metaTitle:     ${c.before.metaTitle}`);
        console.log(`            -->  ${c.after.metaTitle} (${c.lengths.metaTitle} chars)`);
      }
      if (c.before.metaDescription !== c.after.metaDescription) {
        console.log(`  metaDescription: ${c.before.metaDescription}`);
        console.log(`              -->  ${c.after.metaDescription} (${c.lengths.metaDescription} chars)`);
      }
      if (c.before.focusKeyword !== c.after.focusKeyword) {
        console.log(`  focusKeyword:  ${c.before.focusKeyword}`);
        console.log(`            -->  ${c.after.focusKeyword}`);
      }
    }
  }

  // Print length distribution
  if (changes.length > 0) {
    console.log(`\n${'─'.repeat(70)}`);
    console.log('META TITLE LENGTH DISTRIBUTION:');
    const titleLengths = changes.map(c => c.lengths.metaTitle).filter(Boolean);
    const tooShort = titleLengths.filter(l => l < META_TITLE_MIN).length;
    const optimal = titleLengths.filter(l => l >= META_TITLE_MIN && l <= META_TITLE_MAX).length;
    const tooLong = titleLengths.filter(l => l > META_TITLE_MAX).length;
    console.log(`  < ${META_TITLE_MIN} chars (too short): ${tooShort}`);
    console.log(`  ${META_TITLE_MIN}-${META_TITLE_MAX} chars (optimal): ${optimal}`);
    console.log(`  > ${META_TITLE_MAX} chars (too long): ${tooLong}`);

    if (tooShort > 0) {
      console.log('\n  Too-short titles:');
      for (const c of changes) {
        if (c.lengths.metaTitle && c.lengths.metaTitle < META_TITLE_MIN) {
          console.log(`    ${c.lengths.metaTitle} chars: ${c.after.metaTitle} [${c.slug}]`);
        }
      }
    }
    if (tooLong > 0) {
      console.log('\n  Too-long titles:');
      for (const c of changes) {
        if (c.lengths.metaTitle && c.lengths.metaTitle > META_TITLE_MAX) {
          console.log(`    ${c.lengths.metaTitle} chars: ${c.after.metaTitle} [${c.slug}]`);
        }
      }
    }

    console.log(`\nMETA DESCRIPTION LENGTH DISTRIBUTION:`);
    const descLengths = changes.map(c => c.lengths.metaDescription).filter(Boolean);
    const dTooShort = descLengths.filter(l => l < META_DESC_MIN).length;
    const dOptimal = descLengths.filter(l => l >= META_DESC_MIN && l <= META_DESC_MAX).length;
    const dTooLong = descLengths.filter(l => l > META_DESC_MAX).length;
    console.log(`  < ${META_DESC_MIN} chars (too short): ${dTooShort}`);
    console.log(`  ${META_DESC_MIN}-${META_DESC_MAX} chars (optimal): ${dOptimal}`);
    console.log(`  > ${META_DESC_MAX} chars (too long): ${dTooLong}`);

    if (dTooShort > 0) {
      console.log('\n  Too-short descriptions:');
      for (const c of changes) {
        if (c.lengths.metaDescription && c.lengths.metaDescription < META_DESC_MIN) {
          console.log(`    ${c.lengths.metaDescription} chars [${c.slug}]`);
        }
      }
    }
  }

  // Print errors
  if (errors.length > 0) {
    console.log(`\n${'─'.repeat(70)}`);
    console.log('ERRORS:');
    for (const e of errors) {
      console.log(`  [${e.slug}] ${e.error}`);
    }
  }

  if (!commit) {
    console.log(`\n${'*'.repeat(70)}`);
    console.log(`DRY RUN — No changes written. Add --commit to apply.`);
    console.log(`${'*'.repeat(70)}`);
  }

  await prisma.$disconnect();
}

/**
 * Escape a string for embedding in a JSON string within SQL.
 * Must handle: double quotes, backslashes, newlines
 */
function escapeJsonString(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/'/g, "''");  // Escape single quotes for PostgreSQL
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
