#!/usr/bin/env node
/**
 * compose-title-meta.js — build a DISTINCT, demand-keyed title + meta for every
 * landing page. One composer for all 11 locales.
 *
 * WHY ONE. There are eleven rekey-<locale>-titles.js engines with eleven
 * near-identical composition functions. That is precisely how the current defect
 * reached all eleven locales simultaneously: ~50 siblings sharing the first ~52
 * characters of their <title>, and metaDescriptions at pairwise 0.78-0.87 —
 * above this project's own WARN line — while the prose beneath them sits at a
 * healthy 0.13-0.31. Google's deduplication and site-diversity systems show at
 * most two results per domain per query, so siblings competing for one query can
 * never all rank however the words are arranged. Each page needs its OWN query.
 *
 * VOCABULARY SOURCES, in priority order:
 *   1. frontend/content/topic-seo-overrides/<locale>.json — per-exercise-type copy
 *      from the earlier long-tail program, already demand-researched. Measured
 *      2026-07-20: it covers 80-100% of the type names that return zero
 *      autocomplete suggestions, and three independent native reviewers arrived at
 *      the same terms it already contains (de "Muster fortsetzen" for pattern-train,
 *      "Bilder zuordnen" for grid-match). The right words were already in the repo;
 *      the landing titles just never used them.
 *   2. the locale's rekey engine TYPE_MAP — reviewed native operation names.
 *   3. the taxonomy's exercise-type name — the last resort, and the one that is a
 *      word-for-word calque of our internal label in 24-41% of non-EN cases.
 *
 * A type descriptor that the demand corpus has never seen NEVER LEADS. It is
 * demoted to the tail, where it still separates siblings but costs nothing — the
 * head is what is read and what survives truncation. It is never deleted outright:
 * doing that collapsed 134 nl pages onto 48 shared targets.
 *
 * Consumed by apply-demand-titles.js. This module is pure — it reads, it never writes.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const TAXONOMY = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'), 'utf8'));

const TITLE_SOFT_CAP = 65; // Google truncates by pixel width ~50-60 chars; the tag indexes in full
const META_MIN = 120, META_MAX = 170; // the band the §21.2 preband step expects

/**
 * Per-locale surface words. Every one of these was verified against live
 * autocomplete — the dead ones are recorded so they can never creep back in.
 *
 *  worksheet — the container noun. Audited per locale, NOT translated:
 *              da "opgaveark" returns only its own echo and no is worse — Google
 *              REWRITES "oppgaveark" to "oppgaver", dropping the -ark. Meanwhile
 *              no "arbeidsark" and sv "arbetsblad" are strong head terms that
 *              carry a full grade ladder in their tails.
 *  free      — the price cue. de "gratis" is ~64:1 dead against "kostenlos" and is
 *              specifically Austrian.
 *  print     — the format cue. sv prefers "skriva ut" WITHOUT "att".
 *  NEVER     — verified-dead or wrong-market strings. Asserted absent by the gate.
 */
const SURFACE = {
  en: { worksheet: 'Worksheets', free: 'Free', print: 'Printable PDF', sep: ' – ',
        NEVER: [] },
  de: { worksheet: 'Arbeitsblätter', free: 'kostenlos', print: 'zum Ausdrucken', sep: ' – ',
        NEVER: ['gratis', 'druckbar'] },
  es: { worksheet: 'Fichas', free: 'gratis', print: 'para imprimir', sep: ' – ',
        NEVER: ['con respuestas', 'con soluciones'] },
  fr: { worksheet: 'Fiches', free: 'gratuit', print: 'à imprimer', sep: ' – ',
        NEVER: ['feuilles de travail', 'imprimable'] },
  it: { worksheet: 'Schede didattiche', free: 'gratis', print: 'da stampare', sep: ' – ',
        NEVER: ['con soluzioni', 'stampabili'] },
  nl: { worksheet: 'Werkbladen', free: 'gratis', print: 'printen', sep: ' – ',
        NEVER: ['om uit te printen', 'printbaar', 'kosteloos', 'met antwoorden'] },
  pt: { worksheet: 'Atividades', free: 'grátis', print: 'para imprimir', sep: ' – ',
        NEVER: ['fichas'] }, // "fichas" is Portugal — it signals the wrong country
  sv: { worksheet: 'Arbetsblad', free: 'gratis', print: 'skriva ut', sep: ' – ',
        NEVER: ['med facit'] },
  da: { worksheet: 'Opgaver', free: 'gratis', print: 'til print', sep: ' – ',
        NEVER: ['opgaveark', 'regneark'] },
  no: { worksheet: 'Arbeidsark', free: 'gratis', print: 'til utskrift', sep: ' – ',
        NEVER: ['oppgaveark', 'regneark'] },
  fi: { worksheet: 'Tehtäviä', free: 'ilmainen', print: 'tulostettava', sep: ' – ',
        NEVER: ['vastauksineen'] },
};

/**
 * Native-verified type terms, from three independent native-reviewer passes
 * (2026-07-20), every entry confirmed against live Google autocomplete.
 *
 * These take priority over span-extraction because a human confirmed both that
 * the term is searched AND that it describes this worksheet. Extraction is the
 * fallback for the types nobody reviewed.
 *
 * Entries marked WRONG-SENSE are the dangerous class: they look verified because
 * the corpus contains them, but they rank into a different universe entirely.
 */
const NATIVE_LEAD = {
  de: {
    'pattern-train': 'Muster fortsetzen',      // "Musterzug" -> pharma GMP sampling (WRONG-SENSE)
    'pattern-worksheet': 'Muster erkennen und fortsetzen', // distinct stem, avoids cannibalizing the above
    'grid-match': 'Bilder zuordnen',           // "Gitter-Zuordnung" -> literally zero suggestions
    'code-addition': 'Rechnen mit Symbolen',   // "Code-Addition" -> French customs codes (WRONG-SENSE)
    'picture-path': 'Labyrinth',
  },
  es: {
    'picture-path': 'Laberintos para imprimir',
    'grid-match': 'Relacionar imágenes iguales',
    'chart-count': 'Cuenta y grafica',         // literally how Mexican teachers phrase the instruction
  },
  pt: {
    'pattern-train': 'Sequência lógica',
    'code-addition': 'Adição com desenhos',    // "com código" -> BNCC curriculum codes (WRONG-SENSE)
    'grid-match': 'Ligue as figuras iguais',
    'picture-path': 'Labirinto para imprimir',
  },
  fr: {
    'pattern-train': 'Suites logiques',
    'pattern-worksheet': 'Algorithme maternelle',
    'code-addition': 'Calcul codé',
    'sudoku': 'Sudoku maternelle',
    'bingo': 'Loto des images',
    'shadow-match': 'Jeu des ombres',
    'find-objects': 'Cherche et trouve',
    'picture-path': 'Labyrinthe à imprimer',
  },
  it: {
    'pattern-train': 'Sequenze logiche',
    'code-addition': 'Addizioni con i disegni',
    'sudoku': 'Sudoku per bambini',
    'picture-path': 'Labirinti da stampare',
    'find-objects': 'Cerca e trova da stampare', // bare "cerca e trova" = Swiss classifieds (WRONG-SENSE)
    'wordsearch': 'Crucipuzzle per bambini',
  },
  nl: {
    'pattern-train': 'Patronen afmaken',
    'picture-sort': 'Sorteren kleuters',
    'picture-path': 'Doolhof kleuters',
    'alphabet-train': 'Alfabet oefenen',
    'sudoku': 'Sudoku kleuters',
    'find-objects': 'Zoekplaat',               // "objecten zoeken" -> iPhone Find My (WRONG-SENSE)
    'subtraction': 'Aftreksommen',             // "aftrekken" is SUPPRESSED by Google (slang sense)
  },
  da: {
    'pattern-train': 'Mønstre',
    'math-puzzle': 'Sjove matematikopgaver',
    'code-addition': 'Regn og farv',
    'alphabet-train': 'Alfabet opgaver',
    'chart-count': 'Tælleopgaver',
  },
  no: {
    'pattern-train': 'Mønster oppgaver',
    'sudoku': 'Sudoku for barn',
    'find-objects': 'Myldrebilde',
    'picture-path': 'Labyrint til utskrift',   // bare "labyrint" = an NRK TV show (WRONG-SENSE)
  },
  sv: {
    'pattern-train': 'Fortsätt mönstret',      // bare "mönster" is owned by crafts (WRONG-SENSE)
    'wordsearch': 'Ordsök',
    'picture-sort': 'Sortera och klassificera',
    'math-puzzle': 'Mattegåta',
    'alphabet-train': 'Alfabetisk ordning',
  },
  fi: {
    'pattern-train': 'Sarjoittaminen',
    'picture-sort': 'Lajittelutehtäviä',
    'math-puzzle': 'Päässälaskuja',            // "matematiikkapulma" -> self-echo only
    'find-objects': 'Etsi kuvasta',
    'wordsearch': 'Sanahaku',
    // NOT "aakkosjärjestys": very live, but 10/10 of its tail is software intent
    // (word/excel/python) — adults alphabetizing lists, not teachers.
  },
  en: {},
};

/**
 * Function words that must not start or end an extracted span. Without this the
 * extractor returns fragments like it "ritmi da" (from "ritmi da stampare"),
 * which is corpus-verified but reads as a truncation.
 */
const EDGE_STOPWORDS = new Set([
  'da', 'di', 'de', 'del', 'della', 'e', 'a', 'al', 'con', 'per', 'il', 'la', 'i', 'le',
  'the', 'and', 'for', 'of', 'to', 'with', 'in', 'on',
  'und', 'mit', 'für', 'zum', 'zur', 'dem', 'den', 'das', 'der', 'die',
  'et', 'des', 'les', 'aux', 'du', 'en', 'sur',
  'y', 'los', 'las', 'el', 'un', 'una', 'para',
  'och', 'att', 'som', 'med', 'til', 'og', 'av', 'på', 'van', 'het', 'een', 'te',
  'com', 'ou', 'no', 'na', 'dos', 'das', 'aos', 'às', 'ao', 'à', 'para', 'por',
  'ja', 'tai', 'sekä', 'og', 'eller', 'som', 'til',
]);

// --- text utils --------------------------------------------------------------
const norm = (s) => String(s || '').toLowerCase().replace(/[’']/g, '')
  .replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const toks = (s) => norm(s).split(' ').filter(Boolean);
const titleCaseFirst = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

// --- loaders -----------------------------------------------------------------
function loadOverrides(locale) {
  const f = path.join(ROOT, 'frontend', 'content', 'topic-seo-overrides', `${locale}.json`);
  if (!fs.existsSync(f)) return {};
  try { return (JSON.parse(fs.readFileSync(f, 'utf8')).singleAxis) || {}; } catch { return {}; }
}
function loadEngine(locale) {
  try { return require(path.join(ROOT, 'scripts', 'seo-landing', `rekey-${locale}-titles.js`)); }
  catch { return {}; }
}
function loadCorpus(locale) {
  const set = new Set();
  for (const f of [
    path.join(ROOT, 'docs', 'SEO', 'harvests', 'demand', `${locale}.json`),
    path.join(ROOT, 'docs', 'SEO', 'harvests', `${locale}.json`),
  ]) {
    if (!fs.existsSync(f)) continue;
    try {
      for (const q of JSON.parse(fs.readFileSync(f, 'utf8')).unique || []) set.add(norm(q));
    } catch { /* ignore */ }
  }
  return [...set].map((q) => ({ q, toks: new Set(toks(q)) }));
}

/** Is this exact phrase present, as a token set, in some real harvested query? */
function corpusHas(phrase, corpus) {
  const t = toks(phrase);
  if (!t.length) return false;
  return corpus.some((q) => t.every((x) => q.toks.has(x)));
}

/**
 * Compound-aware liveness test, for the compounding languages (de/nl/sv/da/no/fi).
 *
 * A long single-word compound can return nothing while its SPLIT form thrives.
 * Verified live:
 *   de  Musterarbeitsblatt      -> 0     muster fortsetzen      -> full ladder
 *   fi  yhteenlaskutehtäviä     -> 0     yhteenlasku tehtäviä   -> 3
 * Demoting on the compound's silence alone would bury the natural native word —
 * in fi it left generic "Tehtäviä" leading while the real term
 * "Yhteenlaskutehtäviä" sat in the tail.
 *
 * So a compound also counts as alive when the corpus contains a token that is a
 * substantial PREFIX of it ("yhteenlasku" ⊂ "yhteenlaskutehtäviä"). Prefixes
 * shorter than 6 characters are ignored as too weak to mean anything.
 */
function corpusHasCompound(phrase, corpus, minStem = 6) {
  if (corpusHas(phrase, corpus)) return true;
  const words = toks(phrase);
  if (words.length !== 1) return false; // only single-word compounds
  const w = words[0];
  if (w.length < minStem + 2) return false;
  for (const q of corpus) {
    for (const t of q.toks) {
      if (t.length >= minStem && (w.startsWith(t) || t.startsWith(w))) return true;
    }
  }
  return false;
}

/**
 * The demand-keyed lead for an exercise type: the LONGEST contiguous phrase inside
 * the topic-override copy that real searches actually contain.
 *
 * The override title for de pattern-train is "Muster fortsetzen mit dem Musterzug
 * (PDF)". Its longest corpus-verified span is "muster fortsetzen" — which is
 * exactly the term the native reviewer independently recommended, and it drops
 * the dead "Musterzug" without anyone hand-authoring a mapping.
 */
/**
 * Chrome tokens: format, price and grade words. A span made only of these is
 * corpus-verified but USELESS as a type descriptor, because every type's override
 * copy contains them — so it would give all ~29 types the same lead and recreate
 * the exact cannibalization this program exists to remove.
 *
 * Measured before this guard: nl addition extracted "gratis werkbladen printen",
 * it addition "classe prima da stampare", sv addition "för barn".
 */
function chromeTokens(locale) {
  const S = SURFACE[locale] || SURFACE.en;
  const out = new Set([...toks(S.worksheet), ...toks(S.free), ...toks(S.print)]);
  for (const axis of ['educational-level']) {
    const a = (TAXONOMY.axes && TAXONOMY.axes[axis]) || {};
    for (const k of Object.keys(a)) {
      const n = a[k] && a[k].name && a[k].name[locale];
      if (n) toks(n).forEach((t) => out.add(t));
    }
  }
  ['pdf', 'gratis', 'gratuit', 'grátis', 'free', 'kostenlos', 'ilmainen', 'barn', 'børn',
   'kinder', 'niños', 'bambini', 'enfants', 'kids', 'lapsille', 'imprimir', 'stampare',
   'printen', 'utskrift', 'print', 'skriva', 'ut', 'tulostettava', 'ausdrucken',
   'imprimer', 'werkbladen', 'arbeitsblätter', 'arbetsblad', 'arbeidsark', 'opgaver',
   'atividades', 'fichas', 'fiches', 'schede', 'didattiche', 'tehtäviä', 'worksheets',
  ].forEach((t) => out.add(t));
  return out;
}

function demandLeadForType(type, locale, overrides, corpus, maxWords = 4, chrome = null) {
  // A native reviewer's verified term always wins: they confirmed both that it is
  // searched AND that it describes this worksheet. Extraction can only do the first.
  const native = (NATIVE_LEAD[locale] || {})[type];
  if (native) return native;
  const CH = chrome || chromeTokens(locale);

  const ov = overrides[type];
  if (!ov) return null;
  const edgeOk = (w) => {
    const first = norm(w[0]); const last = norm(w[w.length - 1]);
    return first && last && !EDGE_STOPWORDS.has(first) && !EDGE_STOPWORDS.has(last);
  };
  for (const field of ['title', 'h1']) {
    const raw = ov[field];
    if (!raw) continue;
    // Split on punctuation so a span cannot straddle a clause boundary.
    for (const clause of String(raw).split(/[–—|:()\[\],.]/)) {
      const w = clause.trim().split(/\s+/).filter(Boolean);
      for (let n = Math.min(maxWords, w.length); n >= 2; n--) {
        for (let i = 0; i + n <= w.length; i++) {
          const span = w.slice(i, i + n);
          if (!edgeOk(span)) continue; // no fragments like it "ritmi da"
          const phrase = span.join(' ');
          const t = toks(phrase);
          if (t.length < 2) continue;
          // Must carry at least one token that is neither chrome nor a function
          // word, or it describes no type at all. Without the stopword half,
          // sv "för barn" survives ("barn" is chrome, "för" is not).
          if (!t.some((x) => !CH.has(x) && !EDGE_STOPWORDS.has(x))) continue;
          if (!corpusHas(phrase, corpus)) continue;
          // Trim chrome/function words off the EDGES. Without this da extracted
          // "plus til print", which then collided with the range slot to read
          // "plus til print til 10". The informative core is "plus".
          const kept = span.slice();
          const isEdge = (x) => { const n = norm(x); return CH.has(n) || EDGE_STOPWORDS.has(n); };
          while (kept.length > 1 && isEdge(kept[kept.length - 1])) kept.pop();
          while (kept.length > 1 && isEdge(kept[0])) kept.shift();
          return kept.join(' ');
        }
      }
    }
  }
  return null;
}

/**
 * type -> demand-keyed lead, for a whole locale at once, with duplicates removed.
 *
 * Must be computed per LOCALE rather than per page: if two exercise types resolve
 * to the same lead, every page of both types would share a title head and we would
 * have rebuilt the cannibalization at type granularity instead of theme
 * granularity. A duplicate is kept only for the type where a native reviewer
 * verified it; the other types fall through to demotion, which is honest —
 * we simply do not yet know their real word.
 */
function buildLeadMap(locale, overrides, corpus) {
  const types = Object.keys((TAXONOMY.axes && TAXONOMY.axes['exercise-type']) || {});
  const chrome = chromeTokens(locale);
  const native = NATIVE_LEAD[locale] || {};
  const raw = new Map();
  for (const t of types) {
    const lead = demandLeadForType(t, locale, overrides, corpus, 4, chrome);
    if (lead) raw.set(t, lead);
  }
  const byLead = new Map();
  for (const [t, lead] of raw) {
    const k = norm(lead);
    if (!byLead.has(k)) byLead.set(k, []);
    byLead.get(k).push(t);
  }
  const out = new Map();
  for (const [k, ts] of byLead) {
    if (ts.length === 1) { out.set(ts[0], raw.get(ts[0])); continue; }
    const owner = ts.find((t) => native[t]);
    if (owner) out.set(owner, raw.get(owner)); // the rest demote
  }
  return out;
}

/**
 * Native operation name from the locale's own engine.
 *
 * `op` takes THREE shapes across the engines, and the third was missed at first:
 *   string    "Addition Worksheets"
 *   function  (coord, standard) => "..."
 *   OBJECT    keyed by mode — sv pattern-train:
 *             { null: "AB-mönster", aab: "AAB-mönster", abb: "ABB-mönster", ... }
 *
 * 8 of 11 locales use the object form for 4-10 types each (fi 10, da/no 9, nl/sv 8).
 * Returning it unresolved put a literal "[object Object]" into live titles — caught
 * in sv "tillbehör arbetsblad – förskola, [object object]".
 *
 * Resolving it is not merely a bug fix: these objects carry the MODE-SPECIFIC
 * native operation names, which is precisely the distinction that was collapsing
 * multi-mode siblings onto one title. Null mode is keyed as the string 'null',
 * matching the convention resolveQual() already uses.
 */
function engineOp(type, coordinate, standard, engine) {
  const m = engine.TYPE_MAP && engine.TYPE_MAP[type];
  if (!m || m.op == null) return null;
  try {
    if (typeof m.op === 'function') return m.op(coordinate, standard) || null;
    if (typeof m.op === 'string') return m.op;
    if (typeof m.op === 'object') {
      const key = coordinate.mode == null ? 'null' : String(coordinate.mode);
      const v = m.op[key] != null ? m.op[key] : m.op.null;
      return typeof v === 'string' ? v : null;
    }
  } catch { /* fall through */ }
  return null;
}

/**
 * Does this type's operation name actually VARY by mode in this locale?
 *
 * Must be answered by probing, not by inspecting the shape. The object form is
 * obviously mode-keyed, but the FUNCTION form may or may not be — en big-small is
 * `c => c.mode === 'orderAsc' ? 'Order by Size' : 'Find the Biggest'` (varies),
 * while plenty of other functions ignore the mode entirely (constant).
 *
 * Treating every function as mode-varying was worse than treating none as such:
 * it replaced the taxonomy mode label — which WAS distinguishing — with a constant
 * string, and collisions jumped fr 3->259, it 70->237, pt 25->189, da 0->96.
 */
function opVariesByMode(type, coordinate, standard, engine) {
  const m = engine.TYPE_MAP && engine.TYPE_MAP[type];
  if (!m || m.op == null) return false;
  if (typeof m.op === 'object') return Object.keys(m.op).length > 1;
  if (typeof m.op !== 'function') return false;
  const base = engineOp(type, coordinate, standard, engine);
  for (const alt of [null, 'orderAsc', 'findBig', 'mixed', 'i-spy', 'name', 'letter', 'make-whole']) {
    if (alt === coordinate.mode) continue;
    const probe = engineOp(type, { ...coordinate, mode: alt }, standard, engine);
    if (probe && base && probe !== base) return true;
  }
  return false;
}

/**
 * The per-mode qualifier and the number range, taken from the LOCALE'S OWN engine.
 *
 * These carry the locked §22.4/§22.5 demand patterns — de/sv/nl/da/fi titles are
 * range-led ("Addition bis 10 ohne Zehnerübergang"), and the qualifier is the
 * per-mode distinguisher that keeps multi-mode siblings apart. An earlier draft of
 * this composer dropped them and produced a bare "Accessoires Addition", which is
 * strictly LESS specific than what shipped. They are reordered so the
 * differentiator leads — never discarded.
 *
 * The function names differ per locale because the engines diverged, so this is an
 * adapter rather than one call: en/de/es put `qual` on the TYPE_MAP entry, the
 * other eight expose a top-level `resolveQual`; de has `bisRange`, and
 * sv/nl/it/da/fi have `rangeFor`.
 */
/*
 * The signatures genuinely differ per engine — they were written independently:
 *   en/de/es   TYPE_MAP[type].qual(coord, standard)
 *   the rest   resolveQual(TYPE_MAP_ENTRY, mode)        <- map + mode, not coord
 *   de         bisRange(type, standard)
 *   sv/da/fi   rangeFor(type, standard, level)
 *   it         rangeFor(type, level)                    <- two args, not three
 * Guessing one shape returns '' SILENTLY, which is how the first draft dropped
 * every non-en/de range without erroring. Each shape is tried explicitly and
 * assertEngineAdapters() below proves coverage per locale rather than trusting it.
 */
function engineQual(type, coordinate, standard, engine) {
  const m = engine.TYPE_MAP && engine.TYPE_MAP[type];
  const attempts = [];
  if (m && typeof m.qual === 'function') attempts.push(() => m.qual(coordinate, standard));
  if (m && typeof engine.resolveQual === 'function') {
    attempts.push(() => engine.resolveQual(m, coordinate.mode));
    attempts.push(() => engine.resolveQual(m, coordinate.mode === null ? 'null' : coordinate.mode));
  }
  for (const f of attempts) {
    try { const v = f(); if (v && String(v).trim()) return String(v).trim(); } catch { /* next shape */ }
  }
  return '';
}

function engineRange(type, coordinate, standard, engine) {
  const attempts = [];
  if (typeof engine.bisRange === 'function') attempts.push(() => engine.bisRange(type, standard));
  if (typeof engine.rangeFor === 'function') {
    attempts.push(() => engine.rangeFor(type, standard, coordinate.level));
    attempts.push(() => engine.rangeFor(type, coordinate.level)); // it: two-arg form
  }
  for (const f of attempts) {
    try { const v = f(); if (v && String(v).trim()) return String(v).trim(); } catch { /* next shape */ }
  }
  return '';
}

/**
 * Prove the adapters actually reach each engine, per locale, on a REAL landing.
 * A silent '' is indistinguishable from "this locale has no range", so coverage
 * is asserted rather than assumed. Used by apply-demand-titles.js as a pre-check.
 */
function assertEngineAdapters(locale, landings, engine) {
  const numeric = landings.filter((l) => ['addition', 'subtraction'].includes(l.coordinate && l.coordinate.type));
  const sample = numeric.slice(0, 25);
  let qual = 0, range = 0;
  for (const l of sample) {
    if (engineQual(l.coordinate.type, l.coordinate, l.standard, engine)) qual++;
    if (engineRange(l.coordinate.type, l.coordinate, l.standard, engine)) range++;
  }
  return { sampled: sample.length, qual, range,
           hasRangeMaps: !!(engine.RANGE_BY_STANDARD || engine.RANGE_BY_LEVEL || engine.BIS_BY_STANDARD) };
}

/**
 * Theme display, via the LOCALE'S OWN engine.
 *
 * Reading the taxonomy name directly leaks the raw key whenever a theme is absent
 * from the taxonomy — and 544 keys are, almost all picture-sort "-vs-" pairs.
 * Measured before this: 230 titles in en/de/sv alone read
 * "Animals-vs-birds Picture Sorting", ~1,253 across all 11 locales.
 *
 * Every engine's themeDisplay() already splits those pairs with its own
 * connector — en "Animals and Birds", de "Tiere und Vögel", sv "Djur och Fåglar" —
 * so this is reuse rather than new data. topics-taxonomy.json is deliberately NOT
 * edited: its theme names feed rewrite-deck-html-title.js, deck-rich-alt.js and
 * the topic-page route, so a change there reaches 22K+ already-indexed deck pages,
 * which the §21.5a churn freeze exists to prevent.
 */
function themeDisplayFor(themeKey, locale, engine, themeAxis) {
  if (!themeKey) return null;
  let out = null;
  if (typeof engine.themeDisplay === 'function') {
    try { out = engine.themeDisplay(themeKey, themeAxis || {}); } catch { out = null; }
  }
  if (!out) out = taxonomyName('theme', themeKey, locale) || String(themeKey).replace(/_/g, ' ');
  // Normalise the black-and-white marker. Upstream it is inconsistent already
  // ("Animals BW" / "Christmas B&W" / "Classroom (B&W)" / de "SW" / sv "SV"), and
  // b&w is a genuine search modifier for teachers without a colour printer — so
  // surface it in a readable form rather than leaving a bare token. Display only.
  if (/_bw$/.test(themeKey)) {
    const bw = (BW_LABEL[locale] || BW_LABEL.en);
    out = String(out).replace(/\s*[({]?\s*(B\s*&\s*W|BW|B\/W|SW|S\/W|SV|S&V|S\/V|BN|MV|NB|ZW|SH|PB)\s*[)}]?\s*$/i, '').trim();
    out = `${out} ${bw}`;
  }
  return out;
}

/** Locale-native "black and white" marker, for the display normalisation above. */
const BW_LABEL = {
  en: '(Black & White)', de: '(Schwarz-Weiß)', es: '(Blanco y Negro)', fr: '(Noir et Blanc)',
  it: '(Bianco e Nero)', nl: '(Zwart-Wit)', pt: '(Preto e Branco)', sv: '(Svartvit)',
  da: '(Sort-Hvid)', no: '(Svart-Hvitt)', fi: '(Mustavalkoinen)',
};

/** Properly-cased level label from the engine, not the raw taxonomy name. */
function engineLevel(level, locale, engine) {
  if (!level) return null;
  const g = engine.GRADE_LABEL && engine.GRADE_LABEL[level];
  if (g) return g;
  return taxonomyName('educational-level', level, locale);
}

function taxonomyName(axis, key, locale) {
  const e = TAXONOMY.axes && TAXONOMY.axes[axis] && TAXONOMY.axes[axis][key];
  return (e && e.name && (e.name[locale] || e.name.en)) || null;
}

/**
 * Build title + meta for one landing.
 * `row` is the matching entry from docs/audit-results/demand-match/<locale>.json.
 */
function composeOne(l, row, ctx) {
  const { locale, overrides, engine, corpus } = ctx;
  const S = SURFACE[locale] || SURFACE.en;
  const c = l.coordinate || {};

  // --- the type descriptor, best available -----------------------------------
  const lead = ctx.leadMap ? (ctx.leadMap.get(c.type) || null) : demandLeadForType(c.type, locale, overrides, corpus);
  const op = engineOp(c.type, c, l.standard, engine);
  const taxName = taxonomyName('exercise-type', c.type, locale);
  const fallback = op || taxName || String(c.type).replace(/-/g, ' ');
  // Alive if the corpus has seen it. `lead` is corpus-verified by construction.
  // compound-aware: a dead-looking compound may just need its split form checked
  const descriptor = lead || (corpusHasCompound(fallback, corpus) ? fallback : null);
  const demoted = descriptor ? null : fallback;

  // --- differentiators --------------------------------------------------------
  const theme = themeDisplayFor(c.theme, locale, engine, ctx.themeAxis);
  const level = engineLevel(c.level, locale, engine);
  const mode = c.mode ? taxonomyName('exercise-mode', c.mode, locale) : null;
  const letter = c.letter ? String(c.letter).toUpperCase() : null;
  const qual = engineQual(c.type, c, l.standard, engine);   // "ohne Zehnerübergang"
  const range = engineRange(c.type, c, l.standard, engine);          // "bis 10" / "0–10" / "tot 10"

  // --- title: Tier-A differentiator FIRST -------------------------------------
  // Order follows what the paired-SERP tests showed actually splits results:
  // target-language > enumerated letter > theme > skill/mode > level.
  // Tier-A differentiator first, in the order the paired-SERP tests showed splits
  // results: target-language > enumerated letter > theme.
  //
  // The theme MUST ride along with target-language and letter, not be replaced by
  // them. Dropping it made all 48 English-wordsearch pages in a locale share one
  // head — fr "anglais mots mêlés", sv "engelska ordsök", fi "englanti sanahaku" —
  // which is the very cannibalization this program removes, just relocated to the
  // cross-language tier.
  const head = [];
  if (c.target) head.push(`${taxonomyName('target-language', c.target, locale) || c.target}`);
  else if (letter) head.push(`${letter}`);
  if (theme) head.push(theme);

  // range + qualifier ride WITH the operation, preserving the locked range-led
  // shape ("Addition bis 10 ohne Zehnerübergang") now that the theme leads.
  // The MODE must survive whenever it is what tells siblings apart. Several types
  // resolve their operation name per mode in the engine (en pattern-train ->
  // "AB/AAB/ABB/AABB/ABC Patterns"), but `descriptor` comes from the demand lead,
  // which is mode-INDEPENDENT — so using it silently collapsed all five pattern
  // modes onto one title. Include the mode unless it is already spelled out in the
  // descriptor or the qualifier.
  // Where the engine names the operation PER MODE, that native name is the better
  // mode marker than the generic taxonomy mode label — "AAB-mönster" beats
  // "AAB-mönster"-less prose, and it is the locale's own wording.
  //
  // `op` encodes the mode in BOTH the object form (sv pattern-train) and the
  // FUNCTION form — en big-small is `(c) => c.mode === 'orderAsc' ? 'Order by
  // Size' : 'Find the Biggest'`. Checking only the object form left en/es/it
  // big-small siblings identical ("4th of July Big and Small – Preschool" twice,
  // 49 en / 97 es groups). Whenever op says something the demand lead does not,
  // it IS the mode marker, and it is the locale's own wording.
  const opVaries = opVariesByMode(c.type, c, l.standard, engine);
  const modeLabel = (opVaries && op) ? op : mode;
  const already = norm(`${descriptor || ''} ${qual || ''}`);
  const modeToks = modeLabel ? toks(modeLabel) : [];
  const modeRedundant = modeToks.length > 0 && modeToks.every((t) => already.includes(t));
  // Where the mode is what separates siblings, it must land INSIDE the first ~50
  // characters — that is where Google truncates, and two titles that differ only
  // after char 50 present identically. Measured: pt "criaturas da floresta
  // sequência lógica sequência a…" put five modes past the cut. So a mode-keyed
  // label leads the body; otherwise it trails as a refinement.
  const modeFirst = modeLabel && !modeRedundant && opVaries;
  const body = [
    modeFirst ? modeLabel : null,
    descriptor || S.worksheet,
    range || null,
    qual || null,
    !modeFirst && modeLabel && !modeRedundant ? modeLabel : null,
  ].filter(Boolean);
  const tail = [level, demoted].filter(Boolean);

  let title = [head.join(' '), body.join(' ')].filter(Boolean).join(' ').trim();
  if (tail.length) title += `${S.sep}${tail.join(', ')}`;
  // One format cue for CTR. Never the thing that distinguishes two pages —
  // pdf/printable/free all collapse to the same SERP.
  const cue = ` | ${S.free} ${S.print}`;
  if ((title + cue).length <= TITLE_SOFT_CAP + 20) title += cue;
  title = titleCaseFirst(title.replace(/\s+/g, ' ').trim());

  // --- meta: page-specific FACTS, never a per-type template -------------------
  // The old buildMeta emitted one META_FLAVOR clause per TYPE plus an identical
  // closing sentence, so all ~50 siblings of a type differed by one word. These
  // facts differ per page by construction.
  const nouns = (l.slotTokens || []).filter((t) => t && !/^[a-z-]+$/.test(t) || /[A-ZÅÄÖÆØ]/.test(t));
  const factBits = [];
  if (nouns.length >= 3) factBits.push(nouns.slice(0, 4).join(', '));
  const meta = buildMeta({ l, S, descriptor, theme, level, factBits });

  return { title, metaDescription: meta, usedLead: !!lead, demoted };
}

function buildMeta({ l, S, descriptor, theme, level, factBits }) {
  // Prefer real page facts; fall back to the first sentence of p1, which is
  // already unique per page — the §22.4 pass overwrote exactly that field, and
  // render-landing-html.js still prefers it when metaDescription is absent.
  const opener = [descriptor || S.worksheet, theme, level].filter(Boolean).join(' – ');
  let m = opener;
  if (factBits.length) m += `. ${factBits.join('; ')}`;
  // Keep adding whole sentences from p1 until the 120-char floor is cleared.
  // Stopping at the FIRST sentence left metas at 103-113 chars, below the band
  // the §21.2 preband step expects — which would make preband non-idempotent.
  if (m.length < META_MIN) {
    const p1 = String(l.p1 || '').replace(/\s+/g, ' ').trim();
    for (const sentence of p1.split(/(?<=[.!?])\s+/)) {
      if (m.length >= META_MIN) break;
      m = `${m}. ${sentence}`.replace(/\.\s*\./g, '.').trim();
    }
  }
  if (m.length > META_MAX) {
    m = m.slice(0, META_MAX).replace(/\s+\S*$/, '').replace(/[\s,;:–—-]+$/, '').trim();
  }
  return m;
}

module.exports = {
  SURFACE, NATIVE_LEAD, EDGE_STOPWORDS, TITLE_SOFT_CAP, META_MIN, META_MAX,
  loadOverrides, loadEngine, loadCorpus, corpusHas, corpusHasCompound, demandLeadForType, composeOne, chromeTokens, engineOp, opVariesByMode, themeDisplayFor, BW_LABEL, buildLeadMap, assertEngineAdapters, engineQual, engineRange,
};
