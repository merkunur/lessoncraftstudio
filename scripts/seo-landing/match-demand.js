#!/usr/bin/env node
/**
 * match-demand.js — map every landing page to a REAL harvested search query.
 *
 * READ-ONLY. Writes a report to docs/audit-results/demand-match/<locale>.json and
 * prints a summary. It never mutates frontend/content/seo-landing/*.json — the
 * rekey-<locale>-titles.js engines consume this report in Phase 2.
 *
 * WHY THIS EXISTS
 * ---------------
 * ~50 sibling landings currently share the first ~52 characters of their <title>,
 * so they compete for one query. Google's deduplication + site-diversity systems
 * show at most two results per domain per query, so 48 of those 50 can never rank
 * no matter how the titles are worded. The fix is to point each page at a
 * DIFFERENT real query. This script decides which query that is, per page.
 *
 * Corpus (both are read; demand-first is preferred):
 *   docs/SEO/harvests/demand/<locale>.json   demand-first seeds (harvest-demand.js)
 *   docs/SEO/harvests/<locale>.json          inventory-led seeds (harvest-suggest.js)
 *
 * A page with NO match is not a failure and must NOT be pruned. It becomes honest
 * long-tail; the win is that it stops competing with 49 siblings for a head term.
 *
 * Usage:
 *   node scripts/seo-landing/match-demand.js --locale=en
 *   node scripts/seo-landing/match-demand.js --all
 *   node scripts/seo-landing/match-demand.js --locale=en --samples=25
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const TAXONOMY = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'), 'utf8'));
const LANDING_DIR = path.join(ROOT, 'frontend', 'content', 'seo-landing');
const HARVEST_DIR = path.join(ROOT, 'docs', 'SEO', 'harvests');
const OUT_DIR = path.join(ROOT, 'docs', 'audit-results', 'demand-match');

const LOCALES = ['en', 'de', 'es', 'fr', 'it', 'nl', 'pt', 'sv', 'da', 'no', 'fi'];

/**
 * Axis-key -> the word people actually search, where our internal name differs.
 *
 * MUST be locale-scoped. Sourced from docs/SEO/demand-map-en.md §6 ("Several
 * internal axis names have ZERO demand; the demand lives under a different term")
 * — but that research was only ever done for English. Applying the English
 * replacements to every locale (the first version of this file did) leaks English
 * into non-English targets: French pages came out as "Accessoires hidden objects
 * i spy maternelle".
 *
 * The other ten locales are intentionally empty until native research fills them.
 * That is not a gap in this script — see NON_SEARCHABLE_TYPE_NAMES below.
 */
const REKEY = {
  en: {
    'find-objects': 'hidden objects',
    'missing-pieces': 'missing parts',
    'code-addition': 'secret code math',
    'letter-knowledge': 'letter recognition',
    'ocean_life': 'ocean animals',
    'forest_creatures': 'forest animals',
  },
  nl: {
    // Verified live 2026-07-20: Google returns 0 autocomplete suggestions for
    // 'aftrekken' in any educational phrasing (slang-sense suppression). Real Dutch
    // subtraction demand sits under 'aftreksommen' ("aftreksommen groep 4",
    // "aftreksommen onder elkaar werkblad") and 'minsommen' ("minsommen tot 20").
    subtraction: 'aftreksommen',
  },
  de: {}, es: {}, fr: {}, it: {}, pt: {}, sv: {}, da: {}, no: {}, fi: {},
};

/**
 * Types the demand research found to have near-zero demand under ANY formulation.
 * They are still matched and still get a distinct title — we simply never invest
 * further in them, and the report flags them so Phase 2 does not waste effort.
 */
const SKIP_CLASS = new Set(['grid-match', 'visual-matching', 'chart-count', 'picture-trail', 'pattern-train']);

// --- text utils -------------------------------------------------------------
function norm(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}
function toks(s) {
  return norm(s).split(' ').filter(Boolean);
}

// --- taxonomy lookups -------------------------------------------------------
function axisName(axis, key, locale) {
  const e = TAXONOMY.axes && TAXONOMY.axes[axis] && TAXONOMY.axes[axis][key];
  return (e && e.name && (e.name[locale] || e.name.en)) || null;
}

/** The searchable phrase for an axis key, with the locale's re-key table applied. */
function searchTerm(axis, key, locale) {
  if (!key) return null;
  const rk = REKEY[locale] || {};
  if (rk[key]) return rk[key];
  const n = axisName(axis, key, locale);
  if (n) return n;
  return String(key).replace(/_/g, ' ');
}

// --- corpus -----------------------------------------------------------------
function loadCorpus(locale) {
  const out = [];
  const seen = new Set();
  const add = (q, source) => {
    const n = norm(q);
    if (!n || seen.has(n)) return;
    seen.add(n);
    out.push({ q: n, toks: new Set(toks(n)), source });
  };
  const demandFile = path.join(HARVEST_DIR, 'demand', `${locale}.json`);
  if (fs.existsSync(demandFile)) {
    const j = JSON.parse(fs.readFileSync(demandFile, 'utf8'));
    for (const s of j.unique || []) add(s, 'demand');
  }
  const invFile = path.join(HARVEST_DIR, `${locale}.json`);
  if (fs.existsSync(invFile)) {
    const j = JSON.parse(fs.readFileSync(invFile, 'utf8'));
    for (const s of j.unique || []) add(s, 'inventory');
  }
  return out;
}

/**
 * Descriptors this page can HONESTLY be described by, ranked by how much demand
 * each carries.
 *
 * There is no rule that a title must contain our internal name for the mechanic.
 * That was an invented constraint and it actively hurt: it forced dead calques
 * like nl "Patroontrein", fr "Train De Modèles" and da "Mønstertoget" into the
 * one field that decides whether a page is ever seen. A word nobody searches
 * earns its place in a title only if nothing better is available — and usually
 * something better IS available, because every page also has a theme, a level, a
 * set of real pictured nouns and a format, all of which people do search.
 *
 * So the type name is a CANDIDATE, not a requirement. If the corpus has never
 * seen it, it is dropped from the target and the page is described by what
 * remains. Being less specific but visible beats being precise and invisible.
 */
function pageTerms(l, locale) {
  const c = l.coordinate || {};
  const typeTerm = searchTerm('exercise-type', c.type, locale);
  const required = new Set(toks(typeTerm));
  const boost = new Set();
  const parts = {};
  parts.typeCandidate = typeTerm;

  if (c.theme) {
    const t = searchTerm('theme', c.theme, locale);
    parts.theme = t;
    toks(t).forEach((x) => boost.add(x));
  }
  if (c.level) {
    const lv = searchTerm('educational-level', c.level, locale) || c.level;
    parts.level = lv;
    toks(lv).forEach((x) => boost.add(x));
  }
  if (c.mode) {
    // The `exercise-mode` axis carries per-locale names for 50 of its 51 keys
    // (fully authored across all 11 locales). Using the raw key instead put the
    // English mechanic name into every non-English target — "cross out",
    // "one missing", "find shadow", "two symbols add sub".
    parts.mode = searchTerm('exercise-mode', c.mode, locale) || String(c.mode).replace(/-/g, ' ');
    toks(parts.mode).forEach((x) => boost.add(x));
  }
  if (c.letter) {
    parts.letter = String(c.letter).toLowerCase();
    boost.add(parts.letter);
  }
  if (c.target) {
    parts.target = c.target;
    boost.add(String(c.target).toLowerCase());
  }
  return { required, boost, parts };
}

/**
 * Which axis makes this page different from its siblings? This is what Phase 2
 * front-loads into the title. Ordered by how strongly the research found each
 * axis splits the SERP.
 */
function tierAAxis(l) {
  const c = l.coordinate || {};
  if (c.target) return 'target-language'; // different market entirely
  if (c.letter) return 'enumerated-letter'; // confirmed SERP-splitting in en/de/nl
  if (c.theme) return 'theme'; // 0/10 overlap in paired tests
  if (c.mode) return 'skill-granularity';
  return 'level';
}

/**
 * Does any real harvested query contain ALL of these tokens? Returns the shortest
 * such query (the shortest is the most head-like, i.e. the closest to the phrase
 * people actually type).
 */
function findCovering(tokens, corpus) {
  if (!tokens.length) return null;
  let best = null;
  for (const q of corpus) {
    let ok = true;
    for (const t of tokens) {
      if (!q.toks.has(t)) { ok = false; break; }
    }
    if (!ok) continue;
    if (!best || q.toks.size < best.toks.size) best = q;
  }
  return best;
}

/**
 * Decide the query target for one page.
 *
 * We do NOT try to find a single existing corpus string per page — there are far
 * more pages than harvested strings, so that collapses thousands of pages onto a
 * handful of queries (measured: 3,793 en pages onto 72 queries) and would leave
 * the cannibalization exactly where it is.
 *
 * Instead we COMPOSE the target from components and record how well demand data
 * supports it:
 *   combination — a real query contains theme AND type together (strongest)
 *   component   — theme and type each appear in real queries, but not together
 *   type-only   — only the type is corpus-verified (honest long-tail page)
 *   unverified  — no component seen in the corpus; still gets a distinct title
 */
function resolveTarget(terms, corpus) {
  const typeToks = [...terms.required];
  const themeToks = terms.parts.theme ? toks(terms.parts.theme) : [];
  const modeToks = terms.parts.mode ? toks(terms.parts.mode) : [];

  const combo = themeToks.length ? findCovering([...themeToks, ...typeToks], corpus) : null;
  const themeOnly = themeToks.length ? findCovering(themeToks, corpus) : null;
  const typeOnly = findCovering(typeToks, corpus);
  // The mode often names the SKILL in searchable words even when our name for the
  // mechanic does not ("splitsen", "tellen", "spiegelen"). It is a legitimate
  // stand-in when the type name is dead.
  const modeOnly = modeToks.length ? findCovering(modeToks, corpus) : null;

  // A type name the corpus has never seen does not go in the title. Drop it and
  // describe the page with what people do search.
  const typeIsDead = !typeOnly;
  if (typeIsDead) terms.parts.typeDropped = terms.parts.typeCandidate;

  let evidence = 'unverified';
  if (combo) evidence = 'combination';
  else if (themeOnly && typeOnly) evidence = 'component';
  else if (typeOnly) evidence = 'type-only';
  else if (themeOnly && modeOnly) evidence = 'theme+skill';
  else if (themeOnly) evidence = 'theme-only';

  // The composed target, ordered by how strongly each axis splits the SERP:
  // the Tier-A differentiator leads, then the exercise type, then the remaining
  // qualifiers. EVERY distinguishing coordinate component must appear, or two
  // sibling pages collapse onto the same target and we have changed nothing.
  // A dead type name is DEMOTED, not deleted. Deleting it outright collapsed
  // sibling pages that differed only by type onto one target (48 collisions over
  // 134 nl pages). Moving it to the tail keeps the head of the title made of
  // words people search, while the trailing word still tells the pages apart —
  // and a trailing word costs nothing, because the head is what gets read and
  // what survives truncation.
  const typeLead = typeIsDead ? '' : [...terms.required].join(' ');
  const typeTail = typeIsDead ? [...terms.required].join(' ') : '';
  let composed;
  if (terms.parts.target) {
    // Cross-language decks: the target language is a different market entirely.
    composed = [`learn ${terms.parts.target}`, typeLead, terms.parts.theme, typeTail]
      .filter(Boolean).join(' ');
  } else if (terms.parts.letter) {
    // Enumerated instances: confirmed SERP-splitting in en/de/nl (not sv/da/no/fi).
    composed = [`letter ${terms.parts.letter}`, typeLead, terms.parts.theme, terms.parts.level, typeTail]
      .filter(Boolean).join(' ');
  } else {
    composed = [terms.parts.theme, typeLead, terms.parts.mode, terms.parts.level, typeTail]
      .filter(Boolean).join(' ');
  }
  composed = composed.replace(/\s+/g, ' ').trim();

  return {
    evidence,
    composed,
    comboQuery: combo ? combo.q : null,
    themeQuery: themeOnly ? themeOnly.q : null,
    typeQuery: typeOnly ? typeOnly.q : null,
  };
}

function matchLocale(locale, opts) {
  const file = path.join(LANDING_DIR, `${locale}.json`);
  if (!fs.existsSync(file)) return null;
  const landings = JSON.parse(fs.readFileSync(file, 'utf8')).landings || [];
  const corpus = loadCorpus(locale);

  // A handful of landings share a FULL coordinate with a sibling — same type,
  // mode, theme and level, differing only by hash suffix. Measured 2026-07-20:
  // 0 in every locale except es, which has 48 such groups over 109 pages. They are
  // genuine multiple instances of one teaching point, so they cannot be told apart
  // by any coordinate component and need an ordinal, exactly as the rekey engines
  // already do for identity collisions. Assigned by sorted slug so it is stable.
  const coordKey = (c = {}) => [c.type, c.mode || '-', c.theme || '-', c.level, c.target || '-', c.letter || '-'].join('|');
  const groups = new Map();
  for (const l of landings) {
    const k = coordKey(l.coordinate);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(l.slug);
  }
  const ordinalFor = new Map();
  for (const [, slugs] of groups) {
    if (slugs.length < 2) continue;
    slugs.slice().sort().forEach((s, i) => ordinalFor.set(s, i + 1));
  }

  const rows = [];
  const axisCount = {};
  const evidenceCount = {};
  const usedTarget = new Map(); // composed target -> how many pages claimed it

  for (const l of landings) {
    const terms = pageTerms(l, locale);
    const t = resolveTarget(terms, corpus);
    const ordinal = ordinalFor.get(l.slug) || null;
    if (ordinal) t.composed = `${t.composed} #${ordinal}`;
    const axis = tierAAxis(l);
    axisCount[axis] = (axisCount[axis] || 0) + 1;
    evidenceCount[t.evidence] = (evidenceCount[t.evidence] || 0) + 1;
    usedTarget.set(t.composed, (usedTarget.get(t.composed) || 0) + 1);

    rows.push({
      slug: l.slug,
      coordinate: l.coordinate,
      tierAAxis: axis,
      skipClass: SKIP_CLASS.has(l.coordinate && l.coordinate.type),
      evidence: t.evidence,
      target: t.composed,
      variantOrdinal: ordinal,
      typeDropped: terms.parts.typeDropped || null,
      comboQuery: t.comboQuery,
      themeQuery: t.themeQuery,
      typeQuery: t.typeQuery,
      parts: terms.parts,
      currentTitle: l.title || null,
    });
  }

  // How many pages ended up on the SAME composed target? That is residual
  // cannibalization the title pattern still has to break, and it is the number
  // Phase 2 is judged on. It should be ~0.
  const contested = [...usedTarget.entries()].filter(([, n]) => n > 1);
  const contestedPages = contested.reduce((a, [, n]) => a + n, 0);
  const matched = rows.filter((r) => r.evidence !== 'unverified').length;

  // Exercise-type names absent from this locale's corpus. This is the real reason
  // deeper harvesting does not lift the unverified share: many non-English type
  // names are word-for-word calques of our internal mechanic names ("Pattern
  // Train" -> nl "Patroontrein", fr "Train De Modèles", da "Mønstertoget"), so no
  // corpus will ever contain them. docs/SEO/demand-map-en.md did this re-key work
  // for English only; the other ten locales were never done.
  //
  // ⚠ These are RE-KEY CANDIDATES FOR NATIVE REVIEW, not proof of zero demand.
  // Autocomplete absence has at least three causes and they are not separable here:
  //   1. genuine calque nobody searches            (nl "Patroontrein")
  //   2. Google SUPPRESSES the term. Verified live: nl "aftrekken" returns 0
  //      suggestions even for "aftrekken groep 3" and "optellen en aftrekken",
  //      because of the word's slang sense — yet Dutch subtraction demand is large
  //      and sits under "aftreksommen" and "minsommen". Flagging "Aftrekken" as
  //      unsearched would have been simply wrong.
  //   3. never probed at all — harvest-suggest.js only records seeds that RETURNED
  //      something, so absence in the inventory corpus cannot be distinguished from
  //      a seed that came back empty. (harvest-demand.js records `deadSeeds`
  //      precisely so this ambiguity does not recur.)
  // A native speaker resolves which of the three applies. The page count is the
  // size of the prize, not a verdict.
  const typePages = {};
  for (const l of landings) {
    const t = l.coordinate && l.coordinate.type;
    if (t) typePages[t] = (typePages[t] || 0) + 1;
  }
  const typeReKeyCandidates = [];
  for (const t of Object.keys(typePages)) {
    const term = searchTerm('exercise-type', t, locale);
    if (!term) continue;
    if (!findCovering(toks(term), corpus)) {
      typeReKeyCandidates.push({ type: t, name: term, pages: typePages[t] });
    }
  }
  typeReKeyCandidates.sort((a, b) => b.pages - a.pages);

  const report = {
    locale,
    generatedAt: new Date().toISOString(),
    landings: landings.length,
    corpusSize: corpus.length,
    corpusDemandFirst: corpus.filter((q) => q.source === 'demand').length,
    matched,
    matchRate: Number((matched / (landings.length || 1)).toFixed(3)),
    distinctTargets: usedTarget.size,
    contestedTargets: contested.length,
    contestedPages,
    evidence: evidenceCount,
    tierAAxis: axisCount,
    skipClassPages: rows.filter((r) => r.skipClass).length,
    typeReKeyCandidates,
    typeReKeyCandidatePages: typeReKeyCandidates.reduce((a, t) => a + t.pages, 0),
    rows,
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, `${locale}.json`), JSON.stringify(report, null, 1), 'utf8');

  const ev = Object.entries(evidenceCount).map(([k, v]) => `${k}=${v}`).join(' ');
  console.log(
    `[${locale}] ${landings.length} landings | corpus ${corpus.length} (${report.corpusDemandFirst} demand-first)\n` +
    `      evidence: ${ev}\n` +
    `      distinct targets ${usedTarget.size}/${landings.length} | contested ${contested.length} targets over ` +
    `${contestedPages} pages | skip-class ${report.skipClassPages}
` +
    `      type-name re-key candidates (native review): ${typeReKeyCandidates.length} types over ${report.typeReKeyCandidatePages} pages` +
    (typeReKeyCandidates.length ? ` — worst: ${typeReKeyCandidates.slice(0, 3).map((t) => t.name + ' (' + t.pages + ')').join(', ')}` : ''),
  );

  if (opts.samples) {
    console.log(`  --- ${opts.samples} samples ---`);
    for (const r of rows.slice(0, opts.samples)) {
      console.log(`   ${r.slug}\n     axis=${r.tierAAxis} ev=${r.evidence} target="${r.target}"` +
        (r.comboQuery ? `\n     real query: "${r.comboQuery}"` : ''));
    }
  }
  return report;
}

const argVal = (n, d) => {
  const a = process.argv.find((x) => x.startsWith(`--${n}=`));
  return a ? a.split('=').slice(1).join('=') : d;
};
const hasFlag = (n) => process.argv.includes(`--${n}`);

(function main() {
  const locales = hasFlag('all') ? LOCALES : [argVal('locale', null)].filter(Boolean);
  if (!locales.length) {
    console.error('Usage: node match-demand.js --locale=<loc> | --all [--samples=N]');
    process.exit(1);
  }
  const samples = Number(argVal('samples', '0')) || 0;
  for (const loc of locales) matchLocale(loc, { samples });
})();
