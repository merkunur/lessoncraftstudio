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
          if (corpusHas(phrase, corpus)) return phrase;
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

/** Native operation name from the locale's own engine, if it has one. */
function engineOp(type, coordinate, standard, engine) {
  const m = engine.TYPE_MAP && engine.TYPE_MAP[type];
  if (!m) return null;
  try { return typeof m.op === 'function' ? m.op(coordinate, standard) : m.op; }
  catch { return null; }
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
  const descriptor = lead || (corpusHas(fallback, corpus) ? fallback : null);
  const demoted = descriptor ? null : fallback;

  // --- differentiators --------------------------------------------------------
  const theme = c.theme ? (taxonomyName('theme', c.theme, locale) || String(c.theme).replace(/_/g, ' ')) : null;
  const level = c.level ? (taxonomyName('educational-level', c.level, locale) || null) : null;
  const mode = c.mode ? taxonomyName('exercise-mode', c.mode, locale) : null;
  const letter = c.letter ? String(c.letter).toUpperCase() : null;

  // --- title: Tier-A differentiator FIRST -------------------------------------
  // Order follows what the paired-SERP tests showed actually splits results:
  // target-language > enumerated letter > theme > skill/mode > level.
  const head = [];
  if (c.target) head.push(`${taxonomyName('target-language', c.target, locale) || c.target}`);
  else if (letter) head.push(`${letter}`);
  else if (theme) head.push(theme);

  const body = [descriptor || S.worksheet, mode && !descriptor ? mode : null].filter(Boolean);
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
  if (m.length < META_MIN) {
    const p1 = String(l.p1 || '').replace(/\s+/g, ' ').trim();
    const firstSentence = (p1.split(/(?<=[.!?])\s/)[0] || p1);
    m = (m + '. ' + firstSentence).replace(/\.\s*\./g, '.').trim();
  }
  if (m.length > META_MAX) m = m.slice(0, META_MAX).replace(/\s+\S*$/, '').replace(/[,;–-]$/, '').trim();
  return m;
}

module.exports = {
  SURFACE, NATIVE_LEAD, EDGE_STOPWORDS, TITLE_SOFT_CAP, META_MIN, META_MAX,
  loadOverrides, loadEngine, loadCorpus, corpusHas, demandLeadForType, composeOne, chromeTokens, buildLeadMap,
};
