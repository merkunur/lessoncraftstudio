#!/usr/bin/env node
/* The anti-template gate.
 *
 * Today's similarity gate measures shared WORDS, so two pages built from one
 * formula pass it comfortably: swap "animals" for "vehicles" and enough words
 * differ. That is precisely the corpus Google indexed and refused to show.
 *
 * This gate measures the opposite thing. It removes everything that legitimately
 * varies between siblings — the theme, the level, the type and mode names, every
 * number, and the deck's own nouns and words — and looks at what is LEFT. What
 * is left is the sentence skeleton. If two pages reduce to the same skeleton they
 * are the same page wearing different nouns, however different their word counts
 * look.
 *
 *   "On each row of this kindergarten worksheet a first group of animals ..."
 *   "On each row of this kindergarten worksheet a first group of vehicles ..."
 *      -> identical skeleton -> FAIL, correctly.
 *
 * Usage:
 *   node scripts/seo-per-page/gate-template-fingerprint.js --locale=en
 *   node scripts/seo-per-page/gate-template-fingerprint.js --part=001
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const LANDING_DIR = path.join(ROOT, 'frontend', 'content', 'seo-landing');
const FACTS_DIR = path.join(ROOT, 'docs', 'seo-per-page', 'deck-facts');
const PARTS_DIR = path.join(ROOT, 'docs', 'seo-per-page', 'parts');

/* Measured PER FIELD, never whole-page.
 *
 * The first version of this gate concatenated all six fields and passed the
 * corpus 3793/3793. That verdict was wrong, and the reason matters: the body
 * prose IS genuinely varied per page (500 distinct skeletons across a 525-page
 * class), and that variety MASKED the fields that are formulaic. Measured
 * separately, the same class gives:
 *
 *     title 150 distinct / 525 pages, biggest repeat 29, 81% sharing
 *     h1    171 distinct / 525 pages, biggest repeat 22, 77% sharing
 *     meta  468 distinct   p1 500 distinct   <- healthy
 *
 * Title and H1 are the two fields Google weighs most heavily for relevance, and
 * they are the ones built from a formula. A whole-page average would have hidden
 * that forever.
 */
const FIELDS = ['title', 'metaDescription', 'h1', 'p1', 'p2', 'p3'];
/* Fields where a shared skeleton is a genuine defect. Prose is checked too, but
 * these two are the ones that decide whether a page can rank at all. */
const CRITICAL_FIELDS = ['title', 'h1'];

/** Identical skeletons are a hard failure; near-identical is still a template. */
const SKELETON_FAIL = 0.90;

function norm(s) {
  return String(s || '').toLowerCase().replace(/[‘’']/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}
const toks = (s) => norm(s).split(' ').filter(Boolean);

const TAXONOMY = JSON.parse(fs.readFileSync(
  path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'), 'utf8'));

/* The LOCALIZED display name of a theme/level/type, which is what actually
 * appears in the copy.
 *
 * Without this the gate reads 10 of 11 locales as perfect. `coordinate.theme` is
 * the English key `accessories`, but the Finnish title says `Asusteet`; the key
 * gets dropped, the display name survives, and two identically-formulaic titles
 * look unique because one says Asusteet and the other Aktiviteetit. fi scored 0%
 * repeats on titles that are plainly built from one formula. Only English looked
 * broken — because there the key and the display name are the same word.
 */
function localizedNames(axis, key, locale) {
  const ax = (TAXONOMY.axes || {})[axis] || {};
  const entry = ax[key];
  if (!entry || !entry.name) return [];
  const out = [];
  const own = entry.name[locale];
  if (own) out.push(own);
  // a page may carry the English name as well (fallback chains, EN-seeded copy)
  if (entry.name.en && entry.name.en !== own) out.push(entry.name.en);
  return out;
}

/** Words that legitimately differ between siblings and must not mask sameness. */
function variableWords(page, fact, locale) {
  const out = new Set();
  const c = page.coordinate || {};
  for (const [axis, key] of [['theme', c.theme], ['educational-level', c.level],
    ['exercise-type', c.type], ['exercise-mode', c.mode]]) {
    if (!key) continue;
    for (const nm of localizedNames(axis, key, locale)) {
      for (const w of toks(nm)) out.add(w);
    }
  }
  for (const v of [c.theme, c.level, c.type, c.mode]) {
    for (const w of toks(String(v || '').replace(/[-_]/g, ' '))) out.add(w);
  }
  if (fact) {
    for (const n of (fact.nouns || [])) for (const w of toks(n)) out.add(w);
    for (const n of (fact.words || [])) for (const w of toks(n)) out.add(w);
  }
  // the theme display name as it appears in prose ("4th of july", "at the supermarket")
  for (const w of toks(String(c.theme || '').replace(/[-_]/g, ' '))) out.add(w);
  return out;
}

function skeleton(page, fact, fields, locale) {
  const drop = variableWords(page, fact, locale);
  const text = (fields || FIELDS).map((f) => page[f] || '').join(' ¶ ');
  const kept = [];
  for (const w of toks(text)) {
    if (/^\d+$/.test(w)) { kept.push('#'); continue; }   // any number is page-specific
    if (drop.has(w)) { kept.push('*'); continue; }        // theme/level/type/noun slot
    kept.push(w);
  }
  return kept;
}

function grams(arr, n) {
  const s = new Set();
  for (let i = 0; i + n <= arr.length; i++) s.add(arr.slice(i, i + n).join(' '));
  return s;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

function loadLocale(locale) {
  const landings = JSON.parse(fs.readFileSync(path.join(LANDING_DIR, `${locale}.json`), 'utf8')).landings || [];
  const ff = path.join(FACTS_DIR, `${locale}.json`);
  const facts = fs.existsSync(ff)
    ? new Map(JSON.parse(fs.readFileSync(ff, 'utf8')).decks.map((d) => [d.slug, d]))
    : new Map();
  return { landings, facts };
}

function classOf(l) {
  const c = l.coordinate || {};
  return `${c.type || '?'}::${c.mode == null ? 'null' : c.mode}`;
}

function run(locale, only) {
  const { landings, facts } = loadLocale(locale);
  const pages = only ? landings.filter((l) => only.has(l.slug)) : landings;

  const byClass = new Map();
  for (const l of pages) {
    const k = classOf(l);
    if (!byClass.has(k)) byClass.set(k, []);
    byClass.get(k).push(l);
  }

  // per field: how many pages share their skeleton with at least one sibling
  const perField = {};
  for (const field of [...CRITICAL_FIELDS, 'metaDescription', 'p1']) {
    let shared = 0; let distinct = 0; let total = 0; let biggest = 0;
    const worst = [];
    for (const [k, list] of byClass) {
      if (list.length < 2) continue;
      const m = new Map();
      for (const l of list) {
        const key = skeleton(l, facts.get(l.canonicalDeckSlug), [field], locale).join(' ');
        if (!m.has(key)) m.set(key, []);
        m.get(key).push(l.slug);
      }
      total += list.length;
      distinct += m.size;
      for (const [, slugs] of m) {
        if (slugs.length > 1) {
          shared += slugs.length;
          if (slugs.length > biggest) biggest = slugs.length;
          if (worst.length < 3) worst.push(`${k}: ${slugs.length} pages share one skeleton (${slugs[0]}, ${slugs[1]}…)`);
        }
      }
    }
    perField[field] = { total, distinct, shared, biggest, worst };
  }
  return { locale, pages: pages.length, classes: byClass.size, perField };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const partArg = (args.find((a) => a.startsWith('--part=')) || '').split('=')[1];
  const locArg = (args.find((a) => a.startsWith('--locale=')) || '').split('=')[1];

  let jobs = [];
  if (partArg) {
    const p = JSON.parse(fs.readFileSync(path.join(PARTS_DIR, `${partArg}.json`), 'utf8'));
    jobs = [{ locale: p.locale, only: new Set(p.pages.map((x) => x.slug)), label: `part ${partArg}` }];
  } else {
    const locales = locArg ? locArg.split(',') : ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
    jobs = locales.map((l) => ({ locale: l, only: null, label: l }));
  }

  const verbose = args.includes('--verbose');
  let bad = 0;
  for (const j of jobs) {
    const r = run(j.locale, j.only);
    const crit = CRITICAL_FIELDS.reduce((n, f) => n + r.perField[f].shared, 0);
    bad += crit;
    console.log(`[${j.label}] ${r.pages} pages in ${r.classes} classes -> ${crit ? 'FAIL' : 'PASS'}`);
    for (const f of [...CRITICAL_FIELDS, 'metaDescription', 'p1']) {
      const d = r.perField[f];
      if (!d.total) continue;
      const pct = d.total ? Math.round((d.shared / d.total) * 100) : 0;
      const mark = CRITICAL_FIELDS.includes(f) ? (d.shared ? 'FAIL' : 'ok  ') : 'info';
      console.log(`   ${mark} ${f.padEnd(16)} ${String(d.distinct).padStart(5)} distinct / ${String(d.total).padStart(5)} | ${String(d.shared).padStart(5)} share a skeleton (${pct}%) | worst repeat ${d.biggest}`);
      if (verbose) d.worst.forEach((w) => console.log('        ' + w));
    }
  }
  process.exitCode = bad ? 1 : 0;
}

module.exports = { skeleton, run, SKELETON_FAIL };
