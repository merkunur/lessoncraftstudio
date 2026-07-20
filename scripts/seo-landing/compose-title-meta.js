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

/* ===========================================================================
 * PER-PAGE FRAMING ASSIGNMENT
 *
 * Every page is individually valuable, so every page gets the query that best
 * describes IT — not a phrase shared with the other 500 pages of its type.
 *
 * Measured before this existed: 3,143 en pages across 14 types shared 14 lead
 * phrases while the pools held 1,920 usable alternatives. Six alphabet-train
 * pages with genuinely different content (flags/stars/drum, hats/belts/scarf,
 * cat/sheep/hen) all read "… Alphabet Train – Preschool".
 *
 * A framing is scored against THIS page's own coordinate and pictures, so the
 * preschool page takes a preschool query and the letter-B page takes the letter-B
 * query. Assignment is greedy over slug-sorted pages and each framing is claimed
 * once, so the fit is real rather than a round-robin shuffle. Deterministic, so a
 * page keeps its framing across regenerations (§21.5a).
 * =========================================================================== */

const LEVEL_HINTS = {
  preschool: /preschool|pre-k|nursery|vorschule|maternelle|preescolar|infanzia|kleuter|förskola|forskola|børnehave|barnehage|esiopetus|educação infantil/i,
  kindergarten: /kindergarten|reception|kinder|jardin|kínder|groep 2|förskoleklass|børnehaveklasse|skolestartere|eskari/i,
  'grade-1': /grade 1|1st grade|first grade|klasse 1|1\. klasse|\bcp\b|primer grado|classe prima|groep 3|åk 1|1\. trinn|1\. luokka|1º ano/i,
  'grade-2': /grade 2|2nd grade|second grade|klasse 2|2\. klasse|\bce1\b|segundo grado|classe seconda|groep 4|åk 2|2\. trinn|2\. luokka|2º ano/i,
};
const SEASONAL = /christmas|halloween|easter|thanksgiving|valentine|winter|spring|summer|autumn|weihnacht|ostern|jul|påske|navidad|pascua|natal|natale|pasqua|kerst|pasen|joulu/i;

function scoreFramingForPage(framing, page, ctx, rankBonus) {
  const locale = ctx && ctx.locale ? ctx.locale : ctx;
  const c = page.coordinate || {};
  const f = framing.toLowerCase();
  let s = rankBonus;

  // Level: a preschool page must not advertise itself as grade 2.
  const lv = LEVEL_HINTS[c.level];
  if (lv && lv.test(f)) s += 6;
  for (const [k, re] of Object.entries(LEVEL_HINTS)) {
    if (k !== c.level && re.test(f)) s -= 5; // wrong level is worse than no level
  }

  // Letter — the most specific signal a page can carry, and the most damaging to
  // get wrong. A framing naming a letter must only go to THAT letter's page:
  // "free printable letter x worksheets" was handed to the 4th-of-July page in the
  // first run, which is simply a false promise to the searcher.
  const namesLetter = /\b(?:letter|bokstav|buchstabe|letra|lettre|lettera|kirjain)\s+([a-zåäöæøü])\b/i.exec(f);
  if (c.letter) {
    const L = String(c.letter).toLowerCase();
    if (namesLetter && namesLetter[1].toLowerCase() === L) s += 12;
    else if (namesLetter) s -= 20;                       // names a DIFFERENT letter
    else if (new RegExp('\\b' + L + ' worksheet', 'i').test(f)) s += 6;
  } else if (namesLetter) {
    s -= 20; // page has no letter at all
  }

  // Mode / skill wording. `distinctive` carries, per mode, the words that belong
  // to THIS mode and not its siblings — computed once per type from the engine's
  // per-mode operation names.
  //
  // This is where mode-fit is enforced, deliberately NOT by splitting the pool.
  // Splitting starved small pools (find-objects::i-spy went 34 -> 0 framings) or
  // achieved nothing when the split pools re-inherited the type vocabulary
  // (big-small::findBig and ::orderAsc came out byte-identical). Scoring keeps
  // every candidate available while still preventing a counting query from
  // landing on a beginning-sounds page.
  if (c.mode && ctx.distinctive) {
    const mine = ctx.distinctive.get(`${c.type}::${c.mode}`);
    if (mine && mine.size) {
      for (const w of mine) if (f.includes(w)) { s += 9; break; }
    }
    const others = ctx.distinctive.get(`${c.type}::__others__::${c.mode}`);
    if (others && others.size) {
      for (const w of others) if (f.includes(w)) { s -= 14; break; } // another mode's purpose
    }
  }
  if (c.mode) {
    const modeName = taxonomyName('exercise-mode', c.mode, locale);
    if (modeName && toks(modeName).some((t) => t.length > 3 && f.includes(t))) s += 4;
  }

  // Season: a Christmas page should take a Christmas query when one exists, and a
  // non-seasonal page should never be handed one.
  const themeName = c.theme ? String(c.theme).replace(/_/g, ' ').toLowerCase() : '';
  const pageSeasonal = SEASONAL.test(themeName);
  if (pageSeasonal && SEASONAL.test(f)) s += 8;
  if (!pageSeasonal && SEASONAL.test(f)) s -= 6;

  // The actual pictures on the sheet.
  const nouns = (page.slotTokens || []).map((t) => String(t).toLowerCase()).filter((t) => t.length > 3);
  for (const n of nouns) if (f.includes(n)) { s += 3; break; }
  if (themeName && themeName.length > 3 && f.includes(themeName)) s += 5;

  return s;
}

/**
 * slug -> framing for a whole locale. Computed per locale because the claim-once
 * rule is global to a type, not per page.
 */

/**
 * Per (type, mode): the words that identify THIS mode's purpose and not its
 * siblings'. Derived from the engine's own per-mode operation names, so it is
 * native to the locale and needs no hand-authored list.
 *
 *   find-and-count  letter-spotting -> "Beginning Sounds"  => sounds, beginning
 *                   spot-and-count  -> "Find and Count"    => count, find
 *
 * Shared words (e.g. "Patterns" across AAB/ABB/AABB) drop out, so parameter
 * variants of one worksheet contribute nothing and are left to the theme/level
 * differentiators — which is correct: they ARE the same worksheet with a setting
 * changed.
 */
function buildModeDistinctiveWords(landings, engine) {
  const modesByType = new Map();
  for (const l of landings) {
    const c = l.coordinate || {};
    if (!c.type || c.mode == null) continue;
    if (!modesByType.has(c.type)) modesByType.set(c.type, new Set());
    modesByType.get(c.type).add(c.mode);
  }
  const out = new Map();
  for (const [type, modes] of modesByType) {
    if (modes.size < 2) continue;
    const words = new Map();
    for (const m of modes) {
      const op = engineOp(type, { type, mode: m, level: null }, null, engine) || '';
      words.set(m, new Set(toks(op).filter((w) => w.length > 3)));
    }
    for (const m of modes) {
      const mine = new Set(words.get(m));
      const others = new Set();
      for (const [m2, ws] of words) {
        if (m2 === m) continue;
        for (const w of ws) others.add(w);
      }
      // a word shared with any sibling mode identifies nothing
      for (const w of [...mine]) if (others.has(w)) mine.delete(w);
      const otherOnly = new Set([...others].filter((w) => !words.get(m).has(w)));
      out.set(type + '::' + m, mine);
      out.set(type + '::__others__::' + m, otherOnly);
    }
  }
  return out;
}

/**
 * A framing naming a specific letter is only ever eligible for that letter's
 * page. Scoring it down was not enough — where a pool is exhausted the fallback
 * still selected one, leaving 301 en pages promising a letter they do not teach.
 */
const NAMES_LETTER = /\b(?:letter|bokstav|buchstabe|letra|lettre|lettera|kirjain)\s+([a-z\u00e5\u00e4\u00f6\u00e6\u00f8\u00fc])\b/i;
function letterEligible(framing, coordinate) {
  const m = NAMES_LETTER.exec(framing);
  if (!m) return true;
  const pageLetter = coordinate && coordinate.letter ? String(coordinate.letter).toLowerCase() : null;
  return !!pageLetter && m[1].toLowerCase() === pageLetter;
}

/**
 * A season or holiday is an exclusive term in exactly the way a letter is: a
 * 4th-of-July word search titled "word search 1st grade spring" promises the
 * wrong worksheet. 285 en framings name one, against 9 seasonal themes.
 *
 * Per-locale, NOT one shared pattern: Swedish/Danish/Norwegian `jul` is
 * Christmas but would match English "july", and `v\u00e5r` is both Swedish spring and
 * the word "our". Where a term is ambiguous the entry stays conservative \u2014
 * over-excluding merely makes a page pick a different framing, while
 * under-excluding ships a false promise.
 */
const SEASON_TERMS = {
  en: { christmas: /\b(?:christmas|xmas)\b/i, easter: /\beaster\b/i, spring: /\bspring\b/i, summer: /\bsummer\b/i, winter: /\bwinter\b/i, autumn: /\b(?:autumn|fall)\b/i, thanksgiving: /\bthanksgiving\b/i, valentine: /\bvalentine/i, july4: /\b(?:4th of july|fourth of july|independence day)\b/i, halloween: /\bhalloween\b/i },
  de: { christmas: /\b(?:weihnacht|advent)/i, easter: /\boster/i, spring: /\b(?:fr\u00fchling|fruehling|fr\u00fchjahr)/i, summer: /\bsommer/i, winter: /\bwinter/i, autumn: /\bherbst/i, valentine: /\bvalentins/i, halloween: /\bhalloween\b/i },
  es: { christmas: /\bnavide?[\u00f1n]?/i, easter: /\bpascua/i, spring: /\bprimavera\b/i, summer: /\bverano\b/i, winter: /\binvierno\b/i, autumn: /\boto[\u00f1n]o\b/i, valentine: /\b(?:san valent[\u00edi]n|enamorados)\b/i, halloween: /\bhalloween\b/i },
  pt: { christmas: /\bnatal\b/i, easter: /\bp[\u00e1a]scoa\b/i, spring: /\bprimavera\b/i, summer: /\bver[\u00e3a]o\b/i, winter: /\binverno\b/i, autumn: /\boutono\b/i, valentine: /\bnamorados\b/i, halloween: /\bhalloween\b/i },
  it: { christmas: /\bnatal[ei]\b/i, easter: /\bpasqua\b/i, spring: /\bprimavera\b/i, summer: /\bestate\b/i, winter: /\binverno\b/i, autumn: /\bautunno\b/i, valentine: /\bsan valentino\b/i, halloween: /\bhalloween\b/i },
  fr: { christmas: /\bno[\u00ebe]l\b/i, easter: /\bp[\u00e2a]ques\b/i, spring: /\bprintemps\b/i, summer: /\b[\u00e9e]t[\u00e9e]\b/i, winter: /\bhiver\b/i, autumn: /\bautomne\b/i, valentine: /\bvalentin\b/i, halloween: /\bhalloween\b/i },
  nl: { christmas: /\b(?:kerst|sinterklaas)/i, easter: /\bpasen\b/i, spring: /\b(?:lente|voorjaar)\b/i, summer: /\bzomer/i, winter: /\bwinter/i, autumn: /\bherfst/i, valentine: /\bvalentijn/i, halloween: /\bhalloween\b/i },
  sv: { christmas: /\bjul(?:en|ens|pyssel|kalender)?\b/i, easter: /\bp[\u00e5a]sk/i, spring: /\bv[\u00e5a]r(?:tecken|en)\b/i, summer: /\bsommar/i, winter: /\bvinter/i, autumn: /\bh[\u00f6o]st/i, valentine: /\balla hj[\u00e4a]rtans\b/i, halloween: /\bhalloween\b/i },
  da: { christmas: /\bjul(?:en|ens|ekalender)?\b/i, easter: /\bp[\u00e5a]ske/i, spring: /\bfor[\u00e5a]r/i, summer: /\bsommer/i, winter: /\bvinter/i, autumn: /\befter[\u00e5a]r/i, valentine: /\bvalentins?\b/i, halloween: /\bhalloween\b/i },
  no: { christmas: /\bjul(?:en|ens|ekalender)?\b/i, easter: /\bp[\u00e5a]ske/i, spring: /\bv[\u00e5a]ren\b/i, summer: /\bsommer/i, winter: /\bvinter/i, autumn: /\bh[\u00f8o]st/i, valentine: /\bvalentins?\b/i, halloween: /\bhalloween\b/i },
  fi: { christmas: /\bjoulu/i, easter: /\bp[\u00e4\u00e4]?[\u00e4a]si[\u00e4a]inen|\bp[\u00e4\u00e4]si[\u00e4a]is/i, spring: /\bkev[\u00e4a][\u00e4t]/i, summer: /\bkes[\u00e4a]\b|\bkes[\u00e4a]n\b/i, winter: /\btalvi/i, autumn: /\bsyksy/i, valentine: /\byst[\u00e4a]v[\u00e4a]np[\u00e4a]iv[\u00e4a]/i, halloween: /\bhalloween\b/i },
};

/** A page's own season, from its theme. `valentine_bw` is still Valentine's. */
function themeSeason(coordinate) {
  const raw = String((coordinate && coordinate.theme) || '').toLowerCase().replace(/_bw$/, '');
  if (!raw) return null;
  if (/4th_of_july|independence/.test(raw)) return 'july4';
  for (const k of ['christmas', 'easter', 'spring', 'summer', 'winter', 'autumn', 'thanksgiving', 'valentine', 'halloween']) {
    if (raw.includes(k)) return k;
  }
  return null;
}

/**
 * A framing naming an exclusive term \u2014 a letter, a season, a holiday \u2014 is
 * eligible only for the page that actually has it. Applied before scoring at
 * both selection sites AND at the exhausted-pool fallback, which is where the
 * wrong-letter framings leaked through last time.
 */
const GRADE_CEILING = { preschool: 10, kindergarten: 10, 'grade-1': 20, 'grade-2': 100 };
const NAMES_RANGE = /\b(?:to|within|up\s+to|bis|hasta|fino\s+a|tot|till|til|opp\s+til|asti|jusqu)\s+(\d{1,3})\b/i;

/**
 * A number range is exclusive too. 140 Kindergarten addition pages were handed
 * "adding numbers to 20" — above K's ≤10 ceiling, which §22.1 makes load-bearing
 * for exactly this reason. Under-claiming is fine (a Grade 1 page may say "to
 * 10"); over-claiming promises arithmetic the sheet does not contain.
 */
function rangeEligible(framing, coordinate) {
  const m = NAMES_RANGE.exec(framing);
  if (!m) return true;
  const ceil = GRADE_CEILING[(coordinate && coordinate.level) || ''];
  return !ceil || Number(m[1]) <= ceil;
}

/**
 * A grade named in the framing must be the page's OWN grade. 433 en, 659 de and
 * 296 es pages held a framing for a different year — "buchstabensalat vorschule"
 * on a 1. Klasse page. Keyed to each locale's real level keys (see the
 * `coordinate.level` values), because the school ladders do not correspond:
 * German Kindergarten is Vorschule, Spanish kínder is preescolar.
 */
const GRADE_TERMS = {
  en: { preschool: /\b(?:pre-?k|pre-?school)\b/i, kindergarten: /\bkinder(?:garten)?\b/i, 'grade-1': /\b(?:1st|first) grade\b|\bgrade 1\b/i, 'grade-2': /\b(?:2nd|second) grade\b|\bgrade 2\b/i, 'grade-3': /\b(?:3rd|third) grade\b|\bgrade 3\b/i },
  de: { vorschule: /\bvorschul|\bkindergarten\b|\bkita\b/i, '1-klasse': /\b1\.?\s*klasse\b|\berste klasse\b/i, '2-klasse': /\b2\.?\s*klasse\b|\bzweite klasse\b/i, '3-klasse': /\b3\.?\s*klasse\b|\bdritte klasse\b/i },
  es: { preescolar: /\bpreescolar\b|\binfantil\b|\bkinder\w*\b|\bpre-?escolar\b/i, 'primer-grado': /\bprimer\w*\s+grado\b|\b1\w*\s+grado\b|\bprimero de primaria\b/i, 'segundo-grado': /\bsegundo grado\b|\b2\w*\s+grado\b/i, 'tercer-grado': /\btercer\w*\s+grado\b|\b3\w*\s+grado\b/i },
  pt: { 'educacao-infantil': /\beduca[çc][ãa]o infantil\b|\bpr[ée]-?escolar\b/i, '1o-ano': /\b1[ºo]?\s*ano\b|\bprimeiro ano\b/i, '2o-ano': /\b2[ºo]?\s*ano\b|\bsegundo ano\b/i, '3o-ano': /\b3[ºo]?\s*ano\b|\bterceiro ano\b/i },
  it: { infanzia: /\binfanzia\b|\bmaterna\b/i, 'classe-prima': /\bprima elementare\b|\bclasse prima\b|\b1[ªa] elementare\b/i, 'classe-seconda': /\bseconda elementare\b|\bclasse seconda\b/i, 'classe-terza': /\bterza elementare\b|\bclasse terza\b/i },
  fr: { maternelle: /\bmaternelle\b|\bgrande section\b/i, cp: /\bcp\b/i, ce1: /\bce1\b/i, ce2: /\bce2\b/i },
  nl: { kleuters: /\bkleuter/i, 'groep-3': /\bgroep 3\b/i, 'groep-4': /\bgroep 4\b/i, 'groep-5': /\bgroep 5\b/i },
  sv: { forskola: /\bf[öo]rskol/i, 'ak-1': /\b[åa]k\s*1\b|\b[åa]rskurs 1\b/i, 'ak-2': /\b[åa]k\s*2\b|\b[åa]rskurs 2\b/i, 'ak-3': /\b[åa]k\s*3\b|\b[åa]rskurs 3\b/i },
  da: { boernehaveklasse: /\bb[øo]rnehav|\b0\.?\s*klasse\b/i, '1-klasse': /\b1\.?\s*klasse\b/i, '2-klasse': /\b2\.?\s*klasse\b/i, '3-klasse': /\b3\.?\s*klasse\b/i },
  no: { '1-trinn': /\b1\.?\s*trinn\b/i, '2-trinn': /\b2\.?\s*trinn\b/i, '3-trinn': /\b3\.?\s*trinn\b/i, '4-trinn': /\b4\.?\s*trinn\b/i },
  fi: { esikoulu: /\besikoul/i, '1-luokka': /\b1\.?\s*luok/i, '2-luokka': /\b2\.?\s*luok/i, '3-luokka': /\b3\.?\s*luok/i },
};

function gradeEligible(framing, coordinate, locale) {
  const level = (coordinate && coordinate.level) || '';
  // cross-language decks carry no grade claim of their own
  if (!level || level === 'language-beginner') return true;
  const terms = GRADE_TERMS[locale];
  if (!terms) return true;
  for (const key of Object.keys(terms)) {
    if (terms[key].test(framing) && key !== level) return false;
  }
  return true;
}

function exclusiveTermEligible(framing, coordinate, locale) {
  if (!letterEligible(framing, coordinate)) return false;
  if (!rangeEligible(framing, coordinate)) return false;
  if (!gradeEligible(framing, coordinate, locale)) return false;
  const terms = SEASON_TERMS[locale];
  if (!terms) return true;
  const pageSeason = themeSeason(coordinate);
  for (const key of Object.keys(terms)) {
    if (terms[key].test(framing) && key !== pageSeason) return false;
  }
  return true;
}

function buildFramingAssignment(locale, landings, pools, engine) {
  const out = new Map();
  if (!pools) return out;
  const distinctive = engine ? buildModeDistinctiveWords(landings, engine) : new Map();
  const sctx = { locale: locale, distinctive: distinctive };
  const byType = new Map();
  for (const l of landings) {
    const t = l.coordinate && l.coordinate.type;
    if (!t) continue;
    if (!byType.has(t)) byType.set(t, []);
    byType.get(t).push(l);
  }
  for (const [type, pages] of byType) {
    const pool = (pools[type] && pools[type].framings) || [];
    if (!pool.length) continue; // no evidence for this type — keep the existing lead
    const rank = new Map(pool.map((q, i) => [q, Math.max(0, 8 - Math.floor(i / 10))]));
    const claimed = new Set();
    const ordered = pages.slice().sort((a, b) => (a.slug < b.slug ? -1 : 1));
    for (const page of ordered) {
      // Purpose-correct candidates only. A framing carrying a sibling mode's
      // distinctive vocabulary describes a different worksheet.
      const c0 = page.coordinate || {};
      const otherWords = c0.mode ? distinctive.get(c0.type + '::__others__::' + c0.mode) : null;
      const purposeOk = (q) => {
        if (!exclusiveTermEligible(q, c0, locale)) return false;
        if (otherWords && otherWords.size) {
          const lq = q.toLowerCase();
          for (const w of otherWords) if (lq.includes(w)) return false;
        }
        return true;
      };
      const eligible = pool.filter(purposeOk);
      const candidates = eligible.length ? eligible : pool.filter((q) => exclusiveTermEligible(q, c0, locale));
      let best = null, bestScore = -Infinity;
      for (const q of candidates) {
        if (claimed.has(q)) continue;
        const sc = scoreFramingForPage(q, page, sctx, rank.get(q) || 0);
        if (sc > bestScore) { bestScore = sc; best = q; }
      }
      if (best) {
        claimed.add(best);
      } else {
        // Pool exhausted (odd-one-out: 4 framings for 99 pages). Reuse the best
        // fit rather than invent one; theme/level/mode still separate the pages.
        // Reuse the best PURPOSE-CORRECT framing rather than borrowing a sibling
        // mode's. Theme/level/mode still separate these pages.
        for (const q of candidates) {
          const sc = scoreFramingForPage(q, page, sctx, rank.get(q) || 0);
          if (sc > bestScore) { bestScore = sc; best = q; }
        }
      }
      if (best) out.set(page.slug, best);
    }
  }
  return out;
}

function loadFramingPools(locale) {
  const f = path.join(ROOT, 'frontend', 'content', 'seo-landing', 'framing-pools', locale + '.json');
  if (!fs.existsSync(f)) return null;
  try { return JSON.parse(fs.readFileSync(f, 'utf8')).pools || null; } catch { return null; }
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
  // Per-PAGE framing first — the query that best describes THIS page. Falls back
  // to the per-type lead only where the pool has no evidence for the type.
  const perPage = ctx.framing ? ctx.framing.get(l.slug) : null;
  const lead = perPage || (ctx.leadMap ? (ctx.leadMap.get(c.type) || null) : demandLeadForType(c.type, locale, overrides, corpus));
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

  // A caller-supplied token that MUST land inside the visible budget. Used by the
  // repair pass in apply-demand-titles.js for the pages whose real differentiator
  // otherwise falls past character 50 — Google truncates there, so two titles that
  // differ only after it present identically. Placed right behind the head, which
  // is the earliest position that still reads naturally.
  const early = (ctx.forceEarly && ctx.forceEarly.get) ? ctx.forceEarly.get(l.slug) : null;

  let title = [head.join(' '), early || null, body.join(' ')].filter(Boolean).join(' ').trim();
  if (tail.length) title += `${S.sep}${tail.join(', ')}`;

  // Some landings share a COMPLETE coordinate with a sibling — 109 es pages in 48
  // groups, zero in every other locale (measured). They are genuine multiple
  // instances of one teaching point, so no coordinate component can separate them.
  // match-demand.js already assigns each a stable slug-sorted ordinal for exactly
  // this; read it rather than inventing a second scheme.
  const ordinal = row && row.variantOrdinal ? row.variantOrdinal : null;
  if (ordinal && ordinal > 1) title += ` (${ordinal})`;
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
  // The meta must carry the SAME differentiators as the title. Using only
  // descriptor/theme/level left the letter out, so beginning-sounds letter E and
  // letter O for one theme produced byte-identical metas — the gate scored that
  // pair 1.000. Anything that separates two pages in the title has to separate
  // them here too.
  const metaDifferentiators = [
    // Target language, for the cross-language decks. It leads the TITLE but was
    // absent from the meta, so "Learn German: reptiles wordsearch" and
    // "Learn Spanish: reptiles wordsearch" shared one meta — 10 pages on a single
    // string in en. Third instance of the same omission (letter, repair token,
    // now target), which is why the rule is now stated once and applied to all.
    c.target ? (taxonomyName('target-language', c.target, locale) || c.target) : null,
    letter ? `${letter}` : null,
    range || null,
    qual || null,
    modeLabel && !modeRedundant ? modeLabel : null,
    // The repair pass's token has to reach the meta too. It was read only in the
    // title assembly, so a repaired page could end up with a distinct title and a
    // BYTE-IDENTICAL meta — measured pre-repair at en 50, es 28, pt 20 duplicate
    // metas. Same principle as the letter fix: whatever separates two pages in the
    // title must separate them here.
    early || null,
  ].filter(Boolean);
  const meta = buildMeta({ l, S, descriptor, theme, level, factBits, metaDifferentiators, ordinal });

  return { title, metaDescription: meta, usedLead: !!lead, demoted };
}

function buildMeta({ l, S, descriptor, theme, level, factBits, metaDifferentiators = [], ordinal = null }) {
  // Prefer real page facts; fall back to the first sentence of p1, which is
  // already unique per page — the §22.4 pass overwrote exactly that field, and
  // render-landing-html.js still prefers it when metaDescription is absent.
  const opener = [
    descriptor || S.worksheet,
    ...metaDifferentiators,
    theme,
    level,
    ordinal && ordinal > 1 ? `(${ordinal})` : null,
  ].filter(Boolean).join(' – ');
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
  loadOverrides, loadEngine, loadCorpus, taxonomyName, loadFramingPools, buildFramingAssignment, buildModeDistinctiveWords, letterEligible, exclusiveTermEligible, themeSeason, corpusHas, corpusHasCompound, demandLeadForType, composeOne, chromeTokens, engineOp, opVariesByMode, themeDisplayFor, BW_LABEL, buildLeadMap, assertEngineAdapters, engineQual, engineRange,
};
