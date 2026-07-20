#!/usr/bin/env node
/**
 * build-framing-pools.js — for every (exercise-type, locale), collect the REAL
 * search queries that page type could honestly own.
 *
 * WHY. The composer previously assigned ONE lead phrase per type per locale, so
 * every alphabet page led with "Alphabet Train", every pattern page with "Muster
 * fortsetzen". Measured: 132 real queries fit each of six alphabet-train pages,
 * and all six were given the same phrase. 248 pattern pages, 377 beginning-sounds
 * pages and 525 word-search pages each competed on a single head term — the same
 * self-competition this programme exists to remove, moved up from theme to type.
 *
 * Every page is individually valuable. Each one should be described by what it
 * actually contains, matched to a query real people type. This builds the
 * candidate set that makes that possible.
 *
 * SEED VOCABULARY IS NATIVE, NEVER TRANSLATED. For each (type, locale) the seed
 * terms are drawn from that locale's own sources:
 *   - the taxonomy exercise-type name
 *   - the rekey engine's TYPE_MAP operation names (incl. per-mode variants)
 *   - the topic-seo-overrides copy for that type (demand-researched)
 *   - the native-verified NATIVE_LEAD entries
 *   - a small English concept map, applied to `en` only
 * A query joins the pool when it shares a seed stem AND carries educational
 * intent AND is not off-domain noise.
 *
 * Output: frontend/content/seo-landing/framing-pools/<locale>.json (committed as
 * research evidence, like the harvests).
 *
 * Usage:
 *   node scripts/seo-landing/build-framing-pools.js --locale=en [--type=addition]
 *   node scripts/seo-landing/build-framing-pools.js --all
 */
const fs = require('fs');
const path = require('path');
const C = require('./compose-title-meta.js');

const ROOT = path.resolve(__dirname, '..', '..');
const TAXONOMY = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'), 'utf8'));
const OUT_DIR = path.join(ROOT, 'frontend', 'content', 'seo-landing', 'framing-pools');
const LOCALES = ['en', 'de', 'es', 'fr', 'it', 'nl', 'pt', 'sv', 'da', 'no', 'fi'];

/**
 * Off-domain noise. Every entry was OBSERVED polluting a real pool, not guessed:
 * "picture sorting software", "sorting algorithms", "alphabet train song",
 * "alphabet train floor puzzle" (a wooden toy), plus the marketplace tail.
 */
const JUNK = new RegExp([
  'software', '\\bapps?\\b', 'algorithm', 'excel', 'python', '\\bapk\\b', 'download for pc',
  'amazon', '\\betsy\\b', '\\bshop\\b', '\\bbuy\\b', '\\bprice\\b', '\\bsong\\b', '\\bsongs\\b',
  'floor puzzle', 'wooden', '\\btoy\\b', '\\btoys\\b', 'youtube', '\\bgame apk\\b',
  'kryssord', 'kreuzwortr', 'crossword clue', 'cruciverba soluzioni',

  // COMPETITOR BRANDS. Observed: "wordwall beginning sounds kindergarten" was
  // assigned to one of our pages. Putting a rival's brand in our title chases a
  // navigational query we cannot win and advertises them on our own page.
  'wordwall', 'twinkl', 'education\\.com', 'teacherspayteachers', '\\btpt\\b',
  'k5 ?learning', 'splashlearn', 'abcmouse', 'starfall', 'khan academy', 'ixl',
  'liveworksheets', 'canva', 'pinterest', 'quizlet', 'kahoot', 'seesaw',
  'grundschulk', 'materialguru', 'twinkl', 'super ?teacher', 'mathworksheets4kids',

  // WRONG FORMAT. These people want a video, a game or an app — not a printable.
  '\\bvideo\\b', '\\bvideos\\b', '\\bgames?\\b', '\\bonline games?\\b', '\\bquiz\\b',
  '\\bflashcards?\\b', '\\bposter\\b', '\\bdisplay\\b', '\\bpowerpoint\\b', '\\bppt\\b',
].join('|'), 'i');

/**
 * Educational intent, per locale. A query without one of these is not a teacher
 * or parent looking for a worksheet — it is someone else entirely.
 */
/**
 * Informational intent — someone learning ABOUT a skill, not looking for a
 * worksheet. Observed polluting the first assignment run:
 * 'letter recognition preschool benefits' landed on a printable page.
 */
const INFORMATIONAL = new RegExp([
  'benefits?', 'why', 'how to', 'what is', 'what are', 'meaning', 'definition',
  'examples?', 'ideas?', 'tips?', 'strategies', 'milestones?', 'checklist',
  'assessment', 'curriculum', 'research', 'stages?', 'order to teach',
  // advice-seeking, not resource-seeking. Observed leaking through the list above:
  // "what should a first grader know at the beginning of the year".
  'what should', 'when should', 'should a', 'should my', 'know at', 'at what age',
  'is it normal', 'best way', 'guide', 'explained',
].map(function (w) { return '\\b' + w + '\\b'; }).join('|'), 'i');

const EDU = {
  en: /worksheet|printable|activit|kindergarten|preschool|pre-k|grade|kids|children|pdf|free|practice|lesson/i,
  de: /arbeitsblatt|arbeitsbl|übung|ubung|vorschule|kindergarten|grundschule|klasse|kinder|kostenlos|ausdrucken|pdf/i,
  es: /ficha|actividad|ejercicio|preescolar|kinder|grado|primaria|niños|ninos|imprimir|gratis|pdf/i,
  fr: /fiche|exercice|activité|activite|maternelle|\bcp\b|\bce1\b|\bce2\b|enfant|imprimer|gratuit|pdf/i,
  it: /scheda|schede|esercizi|attività|attivita|infanzia|elementare|classe|bambini|stampare|gratis|pdf/i,
  nl: /werkblad|oefen|activiteit|kleuter|groep|leerjaar|kinderen|printen|gratis|pdf/i,
  pt: /atividade|exercício|exercicio|ficha|infantil|ano|criança|crianca|imprimir|grátis|gratis|pdf/i,
  sv: /arbetsblad|övning|ovning|uppgift|förskola|forskola|\båk\b|klass|barn|skriva ut|gratis|pdf/i,
  da: /opgave|øvelse|ovelse|børnehave|bornehave|klasse|indskoling|børn|born|print|gratis|pdf/i,
  no: /oppgave|arbeidsark|øving|oving|barnehage|trinn|klasse|barn|utskrift|gratis|pdf/i,
  fi: /tehtäv|tehtav|harjoit|esiopetus|eskari|luokka|lapsille|tulostettav|ilmainen|pdf/i,
};

/**
 * English concept terms per exercise type — what the worksheet is FOR, not what we
 * call it. Applied to `en` only; other locales derive their seeds natively (see
 * nativeSeeds). Types absent here fall back to their native seeds alone.
 */
const EN_CONCEPTS = {
  'addition': ['addition', 'adding', 'add', 'sums', 'plus'],
  'subtraction': ['subtraction', 'subtract', 'take away', 'minus'],
  'code-addition': ['secret code math', 'code math', 'math code', 'colour by number', 'color by number'],
  'math-puzzle': ['math puzzle', 'number puzzle', 'math riddle'],
  'math-worksheet': ['math worksheet', 'maths practice', 'math practice'],
  'more-less': ['more or less', 'more and fewer', 'compare numbers', 'greater less'],
  'big-small': ['big and small', 'size', 'biggest', 'order by size', 'compare size'],
  'chart-count': ['picture graph', 'bar graph', 'count and graph', 'graphing'],
  'counting-pictures': ['counting', 'count the pictures', 'count objects'],
  'number-lines': ['number line'],
  'base-ten': ['tens and ones', 'place value', 'base ten'],
  'telling-time': ['telling time', 'clock', 'time to the hour'],
  'fractions': ['fractions', 'halves', 'fourths'],
  'geometry': ['shapes', '2d shapes', 'geometry'],
  'measurement': ['measurement', 'measuring', 'longer shorter'],
  'arrays-multiplication': ['arrays', 'repeated addition', 'multiplication'],
  'pattern-train': ['pattern', 'patterns', 'ab pattern', 'sequencing', 'what comes next'],
  'pattern-worksheet': ['pattern', 'patterns', 'complete the pattern'],
  'patterns': ['pattern', 'patterns'],
  'alphabet-train': ['alphabet', 'abc', 'letter', 'letters', 'abc order', 'letter recognition'],
  'letter-knowledge': ['letter recognition', 'alphabet', 'letters'],
  'beginning-sounds': ['beginning sounds', 'initial sound', 'first sound', 'phonics'],
  'find-and-count': ['beginning sounds', 'initial sound', 'find and count', 'i spy', 'count'],
  'phonological-awareness': ['phonological awareness', 'rhyming', 'syllables', 'phonics'],
  'word-building': ['word building', 'cvc words', 'build a word', 'spelling'],
  'word-guess': ['spelling', 'guess the word', 'missing letters'],
  'word-scramble': ['word scramble', 'unscramble', 'jumbled words'],
  'wordsearch': ['word search', 'wordsearch', 'hidden words'],
  'crossword': ['crossword', 'picture crossword'],
  'picture-vocabulary': ['vocabulary', 'picture dictionary', 'word match'],
  'matching': ['matching', 'match the pictures', 'picture word match', 'pairs'],
  'visual-matching': ['matching', 'same and different'],
  'shadow-match': ['shadow matching', 'shadow match', 'match the shadow'],
  'grid-match': ['matching', 'visual discrimination', 'copy the grid'],
  'picture-sort': ['picture sorting', 'sorting', 'categorise', 'categorize', 'sort by category'],
  'sorting-categories': ['sorting', 'categories', 'classify'],
  'odd-one-out': ['odd one out', 'which does not belong', 'which one is different'],
  'find-objects': ['hidden objects', 'i spy', 'seek and find', 'find the objects'],
  'missing-pieces': ['missing parts', 'missing piece', 'complete the picture'],
  'picture-path': ['maze', 'mazes', 'path'],
  'picture-trail': ['maze', 'mazes', 'follow the path'],
  'treasure-hunt': ['treasure hunt', 'directions', 'left and right', 'positional'],
  'prepositions': ['prepositions', 'position words', 'in on under'],
  'position-words': ['position words', 'prepositions', 'spatial'],
  'sudoku': ['sudoku', 'picture sudoku', 'logic puzzle'],
  'bingo': ['bingo', 'picture bingo'],
  'cryptogram': ['cryptogram', 'secret code', 'decode'],
  'visual-logic': ['logic', 'reasoning', 'brain teaser'],
  'visual-discrimination': ['visual discrimination', 'same and different', 'spot the difference'],
  'science-sort': ['sorting', 'science', 'living and non living'],
  'science-match': ['matching', 'science'],
  'science-sequence': ['sequencing', 'life cycle', 'science'],
  'comparing-numbers': ['comparing numbers', 'greater than', 'more or less'],
  'comparing-groups': ['comparing groups', 'more or fewer'],
  'comparing-sizes': ['comparing sizes', 'bigger smaller'],
  'counting-frames': ['ten frame', 'counting'],
  'tally-counting': ['tally marks', 'tally chart'],
  'number-charts': ['hundred chart', 'number chart'],
  'graphing-data': ['graphing', 'bar graph', 'picture graph'],
  'picture-arithmetic': ['picture math', 'adding pictures'],
};

const norm = (s) => String(s || '').toLowerCase().replace(/[’']/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const toks = (s) => norm(s).split(' ').filter(Boolean);

/** A stem long enough to mean something when substring-matched. */
const STEM_MIN = 5;

/**
 * Seeds arrive full of chrome. The topic-override titles and TYPE_MAP ops read
 * "Addition Worksheets for Kindergarten – free printable PDF", so naive stemming
 * seeds on `worksheet`, `kindergarten`, `printable` — which match nearly the whole
 * corpus. First attempt produced 154,191 "framings" for en, i.e. every type
 * matched everything. Only the tokens that actually identify THIS worksheet may
 * become stems.
 */
function stems(phrase, chrome, chromeStems) {
  return toks(phrase)
    .filter((t) => t.length >= STEM_MIN)
    // Chrome must be matched at STEM level, not exact. The chrome set holds
    // "worksheets" but a seed yields "worksheet", whose stem "works" then matched
    // the entire corpus — math-worksheet came back with 2,884 "framings".
    .filter((t) => !chrome.has(t))
    .map((t) => t.slice(0, Math.max(STEM_MIN, Math.floor(t.length * 0.75))))
    // Compare by PREFIX, not equality: truncation lengths differ between the two
    // sides ("worksheets" -> "workshee", "worksheet" -> "worksh"), so an exact
    // set test never fired and math-worksheet kept matching the whole corpus.
    .filter((st) => ![...chromeStems].some((cs) => st.startsWith(cs) || cs.startsWith(st)));
}

/** Stems of every chrome word, so singular/plural variants are caught too. */
function buildChromeStems(chrome) {
  const out = new Set();
  for (const w of chrome) {
    if (w.length >= STEM_MIN) out.add(w.slice(0, Math.max(STEM_MIN, Math.floor(w.length * 0.75))));
  }
  // Generic education nouns that identify no worksheet in particular.
  for (const w of ['works', 'sheet', 'sheets', 'print', 'print', 'activ', 'exerc', 'praxis',
    'ubung', 'übung', 'tehta', 'oppga', 'opgav', 'arbet', 'arbei', 'werkb', 'ficha', 'fiche',
    'sched', 'ativi', 'lesson', 'lesso']) out.add(w.slice(0, STEM_MIN));
  return out;
}

/**
 * Native seed vocabulary for (type, locale) — every phrase this locale already
 * uses for this worksheet, from its own reviewed sources. Never a translation.
 */
/**
 * Pool key. Most types get one pool, but four serve TWO DIFFERENT PURPOSES under
 * one mechanic name, and a single pool mixes them:
 *
 *   matching        letter -> Beginning Letter Match   name -> Picture Word Match
 *   find-and-count  letter-spotting -> Beginning Sounds  spot-and-count -> Find and Count
 *   big-small       findBig -> Find the Biggest        orderAsc -> Order by Size
 *   find-objects    i-spy -> I Spy                     find-odd -> Find the Odd One
 *
 * 1,130 en pages, 30% of the locale. find-and-count's single pool was 114 counting
 * / 61 beginning-sounds framings, so letter-A phonics pages were handed "animals
 * counting worksheet free". Detected by probing whether the engine's operation
 * name actually varies by mode, not by hardcoding the list.
 */
function opWords(type, mode, engine) {
  const s = C.engineOp(type, { type, mode, level: null }, null, engine) || '';
  return new Set(toks(s).filter((w) => w.length > 2));
}

/**
 * Do two modes serve DIFFERENT PURPOSES, or are they parameter variants?
 *
 * `opVariesByMode` alone is too permissive: it is true for "AAB Patterns" vs
 * "ABB Patterns" and for "Picture Sudoku" vs "Picture Sudoku (Medium)", which are
 * the same worksheet with a different setting. Splitting those produced four
 * IDENTICAL 109-framing pattern-train pools and handed sudoku::medium a crossword
 * query. Purpose differs only when the operation names barely share vocabulary —
 * "Beginning Sounds" vs "Find and Count", "Find the Biggest" vs "Order by Size".
 */
function modesDifferInPurpose(type, modes, engine) {
  const real = modes.filter(Boolean);
  if (real.length < 2) return false;
  const sets = real.map((m) => opWords(type, m, engine)).filter((s) => s.size);
  if (sets.length < 2) return false;
  for (let i = 0; i < sets.length; i++) {
    for (let j = i + 1; j < sets.length; j++) {
      let inter = 0;
      for (const w of sets[i]) if (sets[j].has(w)) inter++;
      const union = sets[i].size + sets[j].size - inter;
      if (union && inter / union < 0.34) return true; // barely shared vocabulary
    }
  }
  return false;
}

function nativeSeeds(type, locale, engine, overrides, mode) {
  const out = new Set();
  const add = (s) => { if (s && String(s).trim()) out.add(String(s).trim()); };

  const t = TAXONOMY.axes['exercise-type'] && TAXONOMY.axes['exercise-type'][type];
  if (t && t.name && t.name[locale]) add(t.name[locale]);

  const m = engine.TYPE_MAP && engine.TYPE_MAP[type];
  if (m && m.op != null) {
    if (typeof m.op === 'string') add(m.op);
    else if (mode) {
      // A mode-scoped pool seeds ONLY on that mode's own operation name, so the
      // beginning-sounds pool never inherits counting vocabulary and vice versa.
      add(C.engineOp(type, { type, mode, level: null }, null, engine));
    } else if (typeof m.op === 'object') {
      for (const v of Object.values(m.op)) add(v);
    } else if (typeof m.op === 'function') {
      for (const probe of [null, 'mixed', 'orderAsc', 'findBig', 'i-spy', 'find-odd', 'name', 'letter', 'make-whole', 'secret-word']) {
        try { add(m.op({ type, mode: probe, level: null })); } catch { /* ignore */ }
      }
    }
  }

  const ov = overrides[type];
  if (ov) { add(ov.h1); add(ov.title); }

  const nat = (C.NATIVE_LEAD && C.NATIVE_LEAD[locale]) || {};
  if (nat[type]) add(nat[type]);

  if (locale === 'en') for (const c of EN_CONCEPTS[type] || []) add(c);
  return [...out];
}

function scoreFraming(q, seedStems, locale) {
  let s = 0;
  const qt = toks(q);
  // more seed stems present = more clearly about this worksheet
  for (const st of seedStems) if (qt.some((w) => w.startsWith(st))) s += 2;
  // a grade / age qualifier makes the query far more targetable
  if (/kindergarten|preschool|pre-k|grade|klasse|vorschule|groep|kleuter|åk|trinn|luokka|infanzia|elementare|maternelle|\bcp\b|preescolar|grado|\bano\b|indskoling|barnehage/i.test(q)) s += 3;
  // a format cue signals printable-worksheet intent specifically
  if (/pdf|printable|imprimir|ausdrucken|stampare|printen|skriva ut|utskrift|til print|tulostettav|imprimer/i.test(q)) s += 2;
  if (/free|gratis|kostenlos|gratuit|grátis|ilmainen/i.test(q)) s += 1;
  // very long queries are usually somebody else's long tail
  if (qt.length > 8) s -= 2;
  if (qt.length < 2) s -= 3;
  return s;
}

function loadCorpusRaw(locale) {
  const out = new Set();
  for (const f of [
    path.join(ROOT, 'docs', 'SEO', 'harvests', 'demand', `${locale}.json`),
    path.join(ROOT, 'docs', 'SEO', 'harvests', `${locale}.json`),
  ]) {
    if (!fs.existsSync(f)) continue;
    try { for (const q of JSON.parse(fs.readFileSync(f, 'utf8')).unique || []) out.add(String(q).toLowerCase().trim()); }
    catch { /* ignore */ }
  }
  return [...out];
}

function buildLocale(locale, opts) {
  const engine = C.loadEngine(locale);
  const overrides = C.loadOverrides(locale);
  const corpus = loadCorpusRaw(locale);
  const edu = EDU[locale] || EDU.en;
  const types = Object.keys(TAXONOMY.axes['exercise-type'] || {});
  // chrome = format/price/grade words; they identify no worksheet in particular
  const chrome = C.chromeTokens(locale);
  const chromeStems = buildChromeStems(chrome);

  // Which (type, mode) pairs actually exist in this locale's landings, so a pool
  // is only split where real pages need it.
  const modesByType = new Map();
  try {
    const lf = path.join(ROOT, 'frontend', 'content', 'seo-landing', `${locale}.json`);
    for (const l of JSON.parse(fs.readFileSync(lf, 'utf8')).landings || []) {
      const c = l.coordinate || {};
      if (!c.type) continue;
      if (!modesByType.has(c.type)) modesByType.set(c.type, new Set());
      modesByType.get(c.type).add(c.mode == null ? null : c.mode);
    }
  } catch { /* no landings — type-only pools */ }

  // (poolKey, mode) work list: one entry per type, or one per mode where the
  // type's operation name varies by mode.
  const work = [];
  for (const type of types) {
    if (opts.type && type !== opts.type) continue;
    const modes = [...(modesByType.get(type) || new Set([null]))];
    work.push({ key: type, type, mode: null });
  }
  const seenKey = new Set();

  const pools = {};
  for (const { key, type, mode } of work) {
    if (seenKey.has(key)) continue;
    seenKey.add(key);
    const seeds = nativeSeeds(type, locale, engine, overrides, mode);
    const seedStems = [...new Set(seeds.flatMap((x) => stems(x, chrome, chromeStems)))];
    if (!seedStems.length) { pools[key] = { seeds, framings: [] }; continue; }

    const scored = [];
    for (const q of corpus) {
      if (JUNK.test(q)) continue;
      if (!edu.test(q)) continue;
      // Informational intent, not "give me a worksheet". Observed in the first
      // assignment: "letter recognition preschool benefits" was handed to a
      // worksheet page. Someone asking why a skill matters does not want a PDF.
      if (INFORMATIONAL.test(q)) continue;
      const qt = toks(q);
      if (!seedStems.some((st) => qt.some((w) => w.startsWith(st)))) continue;
      scored.push({ q, score: scoreFraming(q, seedStems, locale) });
    }
    scored.sort((a, b) => b.score - a.score || a.q.length - b.q.length || (a.q < b.q ? -1 : 1));

    // Collapse word-order variants. "letter recognition preschool worksheets" and
    // "letter recognition worksheets preschool" are ONE query to Google; keeping
    // both burns two pool slots and hands two pages the same target.
    const seenSig = new Set();
    const deduped = [];
    for (const x of scored) {
      const sig = toks(x.q).slice().sort().join(' ');
      if (seenSig.has(sig)) continue;
      seenSig.add(sig);
      deduped.push(x.q);
    }
    pools[key] = { seeds, framings: deduped };
  }

  const counts = Object.entries(pools).map(([t, p]) => [t, p.framings.length]).sort((a, b) => b[1] - a[1]);
  const total = counts.reduce((a, [, n]) => a + n, 0);
  const empty = counts.filter(([, n]) => n === 0).length;

  if (!opts.dryRun) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.writeFileSync(path.join(OUT_DIR, `${locale}.json`), JSON.stringify({
      locale,
      generatedAt: new Date().toISOString(),
      corpusSize: corpus.length,
      note: 'Real harvested queries per exercise type. Seeds are native to this locale — taxonomy name, engine TYPE_MAP ops, topic-override copy, native-verified leads. Never translated.',
      pools,
    }, null, 1), 'utf8');
  }

  console.log(`[${locale}] corpus ${corpus.length} | ${counts.length} types | ${total} framings | ${empty} types with none`);
  console.log('    richest: ' + counts.slice(0, 5).map(([t, n]) => `${t}=${n}`).join(', '));
  if (empty) console.log('    empty  : ' + counts.filter(([, n]) => n === 0).slice(0, 8).map(([t]) => t).join(', '));
  return pools;
}

const argVal = (n, d) => { const a = process.argv.find((x) => x.startsWith(`--${n}=`)); return a ? a.split('=').slice(1).join('=') : d; };
const hasFlag = (n) => process.argv.includes(`--${n}`);

(function main() {
  const locales = hasFlag('all') ? LOCALES : [argVal('locale', null)].filter(Boolean);
  if (!locales.length) {
    console.error('Usage: node build-framing-pools.js --locale=<loc> | --all [--type=X] [--dry-run]');
    process.exit(1);
  }
  const opts = { type: argVal('type', null), dryRun: hasFlag('dry-run') };
  for (const loc of locales) buildLocale(loc, opts);
})();
