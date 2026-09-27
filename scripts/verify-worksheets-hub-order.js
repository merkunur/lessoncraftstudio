#!/usr/bin/env node
/* =====================================================================
   verify-worksheets-hub-order.js — MODEL GATE for the worksheets hub
   ordering (frontend/lib/worksheets-catalog.ts orderHubRows).
   ---------------------------------------------------------------------
   THE RULE BEING ENFORCED: no worksheet type may repeat inside a row.
   A 4-column row is the aligned window [4k … 4k+3], so this is a
   distance-≤3 constraint, NOT adjacency — items at offsets 0 and 2 are
   on the same row and are not adjacent. |i−j| ≥ 4 covers 2, 3 and 4
   columns at once, and WORKSHEETS_PAGE_SIZE (24) is divisible by all
   three, so a row never straddles a page.

   ⚠⚠ THIS GATE LOADS THE REAL MODULE. It transpiles
   frontend/lib/worksheets-catalog.ts with the repo's own TypeScript and
   calls the shipped orderHubRows. It does NOT reimplement the algorithm:
   a gate that rewrites the thing it checks is testing a copy, and three
   mutations of the real dispatch once sailed straight through such a
   gate. The only stub is `./taxonomy`, whose two exports
   (getAxisName / exerciseTypeKeysForSubject) are used by label helpers
   the ordering never calls.

   ⚠ IT ASSERTS AGAINST THE PROVABLE BOUND, NEVER AGAINST ZERO. With m
   copies of one key on a page of length L, a gap of D is possible only
   if (m−1)·D + ties ≤ L. find-and-count by mode is an 88%-dominant
   two-way split whose floor is ~284 defects. A `== 0` assertion there
   forces an allowlist, and an allowlist is where gates go to die.

   ⚠ NON-VACUITY IS ASSERTED FIRST. Every sweep states how many views and
   pages it visited against an independently computed floor: a loop over
   an empty set passes every assertion inside it.

   Run:
     node scripts/verify-worksheets-hub-order.js
     node scripts/verify-worksheets-hub-order.js --locales=en,de
     node scripts/verify-worksheets-hub-order.js --poison   # gate self-test
   ===================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const Module = require('module');

const REPO = path.resolve(__dirname, '..');
const FRONTEND = path.join(REPO, 'frontend');
const CATALOG_TS = path.join(FRONTEND, 'lib', 'worksheets-catalog.ts');
const SHEETS_TS = path.join(FRONTEND, 'lib', 'worksheets-sheets.ts');
const LANDING_DIR = path.join(FRONTEND, 'content', 'seo-landing');
const TAXONOMY = path.join(FRONTEND, 'config', 'topics-taxonomy.json');
const FORMATS_TS = path.join(FRONTEND, 'config', 'interactive-exercise-types.ts');

const ALL_LOCALES = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const PAGE = 24;
const COLS = [2, 3, 4];

const argv = process.argv.slice(2);
const arg = (n, d) => {
  const hit = argv.find((a) => a.startsWith('--' + n + '='));
  return hit ? hit.slice(n.length + 3) : d;
};
const LOCALES = String(arg('locales', ALL_LOCALES.join(','))).split(',').filter(Boolean);
const POISON = argv.includes('--poison');

/* ------------------------------------------------------------------ *
 * Load the real TypeScript modules
 * ------------------------------------------------------------------ */
const ts = require(path.join(FRONTEND, 'node_modules', 'typescript'));

/** Transpile one .ts file and evaluate it, stubbing only `./taxonomy`. */
function loadTs(file, source) {
  const src = source !== undefined ? source : fs.readFileSync(file, 'utf8');
  const js = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    fileName: file,
  }).outputText;
  const m = new Module(file, null);
  m.filename = file;
  m.paths = Module._nodeModulePaths(path.dirname(file));
  const realRequire = m.require.bind(m);
  m.require = (id) => {
    // `./taxonomy` pulls the 1 MB taxonomy JSON in only for label helpers
    // (themeLabel / worksheetSubject) that the ordering never calls.
    if (id === './taxonomy') {
      return { getAxisName: () => null, exerciseTypeKeysForSubject: () => [] };
    }
    return realRequire(id);
  };
  m._compile(js, file);
  return m.exports;
}

const catalogSource = fs.readFileSync(CATALOG_TS, 'utf8');
const sheets = loadTs(SHEETS_TS);

/* ------------------------------------------------------------------ *
 * Corpus
 * ------------------------------------------------------------------ */
function interactiveSet() {
  const src = fs.readFileSync(FORMATS_TS, 'utf8');
  const start = src.indexOf('new Set([');
  const end = src.indexOf(']', start);
  const keys = [...src.slice(start, end).matchAll(/'([^']+)'/g)].map((m) => m[1]);
  if (keys.length < 10) throw new Error('gate: parsed only ' + keys.length + ' interactive types');
  return new Set(keys);
}
const INTERACTIVE = interactiveSet();
const isPrintOnly = (l) => !INTERACTIVE.has(l.coordinate.type);

const taxonomy = JSON.parse(fs.readFileSync(TAXONOMY, 'utf8'));
const axisName = (axis, key, locale) => {
  const e = (taxonomy.axes[axis] || {})[key];
  return (e && e.name && (e.name[locale] || e.name.en)) || key;
};

/**
 * Hub rows for one locale, built through the REAL `expandHubRows`.
 * Titles are synthetic — the ordering keys off coordinate and slug only, and
 * `expandHubRows` drops any sibling with no title, so a map is required to
 * exercise the expansion path at all.
 */
function hubRows(locale) {
  const file = path.join(LANDING_DIR, locale + '.json');
  if (!fs.existsSync(file)) return null;
  const landings = JSON.parse(fs.readFileSync(file, 'utf8')).landings
    .filter((l) => !l.coordinate.target);
  const all = JSON.parse(fs.readFileSync(file, 'utf8')).landings;
  const slugs = sheets.collapsedSheetSlugs(all);
  const facts = new Map(slugs.map((s) => [s, { id: s, title: s, hasAnswerKey: false }]));
  return sheets.expandHubRows(landings, facts, (s) => '/' + locale + '/decks/' + s + '/', () => '');
}

/* ------------------------------------------------------------------ *
 * Assertions
 * ------------------------------------------------------------------ */
/** Provable minimum number of same-key pairs within distance d on one page. */
function pageShortfall(page, keyOf, d) {
  const c = new Map();
  for (const r of page) c.set(keyOf(r), (c.get(keyOf(r)) || 0) + 1);
  let max = 0;
  for (const v of c.values()) if (v > max) max = v;
  let ties = 0;
  for (const v of c.values()) if (v === max) ties++;
  return Math.max(0, (max - 1) * d + ties - page.length);
}

function withinDistance(page, keyOf, d) {
  let n = 0;
  for (let i = 0; i < page.length; i++) {
    for (let g = 1; g < d && i + g < page.length; g++) {
      if (keyOf(page[i]) === keyOf(page[i + g])) n++;
    }
  }
  return n;
}

/** Aligned row windows: a window must hold as many distinct keys as it can. */
function rowWindowDefects(page, keyOf, cols, distinctInView) {
  let bad = 0;
  for (let s = 0; s < page.length; s += cols) {
    const w = page.slice(s, s + cols);
    if (w.length < 2) continue;
    const need = Math.min(w.length, distinctInView);
    if (new Set(w.map(keyOf)).size < need) bad++;
  }
  return bad;
}

function paginate(rows) {
  const out = [];
  for (let i = 0; i < rows.length; i += PAGE) out.push(rows.slice(i, i + PAGE));
  return out;
}

/**
 * Run every assertion for one view. Returns failure strings.
 * `stats` accumulates the non-vacuity counters.
 */
function checkView(order, rows, label, axis, locale, stats) {
  const fails = [];
  const keyOf = (l) => {
    switch (axis) {
      case 'type': return l.coordinate.type || ' null';
      case 'mode': return l.coordinate.mode || ' null';
      case 'theme': return l.coordinate.theme || ' null';
      case 'level': return l.coordinate.level || ' null';
      default: return l.slug;
    }
  };
  const labelOf = (l) => {
    switch (axis) {
      case 'type': return axisName('exercise-type', l.coordinate.type, locale);
      case 'theme': return axisName('theme', l.coordinate.theme, locale);
      default: return keyOf(l);
    }
  };

  // (4) PARTITION — the only assertion that catches an arrangement bug which
  // duplicates one row and drops another; every distance metric stays green.
  if (order.length !== rows.length) {
    fails.push(`${label}: ${order.length} rows out, ${rows.length} in`);
  }
  const seen = new Set(order.map((r) => r.slug));
  if (seen.size !== order.length) fails.push(`${label}: duplicate slugs in the output`);
  const inSlugs = new Set(rows.map((r) => r.slug));
  for (const s of seen) if (!inSlugs.has(s)) { fails.push(`${label}: output row ${s} was not in the input`); break; }

  const distinctKeys = new Set(rows.map(keyOf)).size;
  const distinctLabels = new Set(rows.map(labelOf)).size;
  const pages = paginate(order);
  stats.pages += pages.length;

  for (let p = 0; p < pages.length; p++) {
    const page = pages[p];
    // (2) distance-≤3 against the PER-PAGE provable bound
    const bound = pageShortfall(page, keyOf, 4);
    const got = withinDistance(page, keyOf, 4);
    if (bound === 0 && got > 0) {
      fails.push(`${label} p${p + 1}: ${got} same-key pair(s) within distance 4 on a page where 0 is achievable`);
    }
    // (1) aligned row windows
    for (const cols of COLS) {
      const bad = rowWindowDefects(page, keyOf, cols, distinctKeys);
      if (bad > 0 && bound === 0) {
        fails.push(`${label} p${p + 1}: ${bad} row(s) at ${cols} columns repeat a key where 0 is achievable`);
      }
    }
    // (7) the same check against the RENDERED LABEL, not the raw key — two keys
    // can render one localized label, and the complaint is about the card.
    if (distinctLabels < distinctKeys) {
      const bad = rowWindowDefects(page, labelOf, 4, distinctLabels);
      const lbound = pageShortfall(page, labelOf, 4);
      if (bad > 0 && lbound === 0) {
        fails.push(`${label} p${p + 1}: ${bad} row(s) repeat a LABEL where 0 is achievable`);
      }
    }
    // (8) INFEASIBLE PAGES (2026-09-27) — when a key holds more than one card per row,
    // "never twice in a row" cannot hold, so the rule becomes the best that CAN: no row
    // carries more than ceil(m / rows) of it, and never two side by side while the key
    // holds at most half the page. Measured failure this catches: the All About Me type
    // view ending in a row of four "I Can" cards.
    if (bound > 0) {
      const rowsOnPage = Math.ceil(page.length / 4);
      const count = new Map();
      for (const r of page) count.set(keyOf(r), (count.get(keyOf(r)) || 0) + 1);
      // assert only where the per-row caps are ACHIEVABLE on this page (a partial last row can
      // make them impossible) — proven by a transportation max-flow, never assumed
      if (capsFeasible(count, page.length, rowsOnPage)) for (let i = 0; i < page.length; i += 4) {
        const inRow = new Map();
        for (const r of page.slice(i, i + 4)) inRow.set(keyOf(r), (inRow.get(keyOf(r)) || 0) + 1);
        for (const [k, n] of inRow) {
          const cap = Math.ceil(count.get(k) / rowsOnPage);
          if (n > cap) fails.push(`${label} p${p + 1}: row ${i / 4 + 1} holds ${n} × ${k.trim()} (the page allows ${cap})`);
        }
      }
      for (let i = 1; i < page.length; i++) {
        const k = keyOf(page[i]);
        if (k === keyOf(page[i - 1]) && count.get(k) * 2 <= page.length && Math.floor(i / 4) === Math.floor((i - 1) / 4)) {
          fails.push(`${label} p${p + 1}: two ${k.trim()} side by side at ${i} (avoidable)`);
          break;
        }
      }
    }
  }
  return fails;
}

/** Can `count` (key → n) be laid into rows of 4 (last row partial) with at most ceil(n / rows) of a key per row? Max-flow. */
function capsFeasible(count, len, rows) {
  const keys = [...count.keys()];
  const K = keys.length, S = 0, T = 1 + K + rows + 1 - 1 + 1;
  const N = K + rows + 2, src = K + rows, snk = K + rows + 1;
  const cap = Array.from({ length: N }, () => new Array(N).fill(0));
  keys.forEach((k, i) => {
    cap[src][i] = count.get(k);
    for (let r = 0; r < rows; r++) cap[i][K + r] = Math.ceil(count.get(k) / rows);
  });
  for (let r = 0; r < rows; r++) cap[K + r][snk] = Math.min(4, len - r * 4);
  let flow = 0;
  for (;;) {
    const prev = new Array(N).fill(-1); prev[src] = src;
    const q = [src];
    while (q.length && prev[snk] < 0) { const u = q.shift(); for (let v = 0; v < N; v++) if (prev[v] < 0 && cap[u][v] > 0) { prev[v] = u; q.push(v); } }
    if (prev[snk] < 0) break;
    let f = Infinity; for (let v = snk; v !== src; v = prev[v]) f = Math.min(f, cap[prev[v]][v]);
    for (let v = snk; v !== src; v = prev[v]) { cap[prev[v]][v] -= f; cap[v][prev[v]] += f; }
    flow += f;
  }
  return flow === len;
}

/**
 * The Level Set type view (2026-09-27): a type's landings + its do-not-index Level Set
 * decks, built through the REAL `levelSetRows`, exactly as the hub builds them when
 * `?type=` is chosen. The deck list mirrors the live All About Me set (22 per locale:
 * five poster, five favourite, two face, ten I-can copies) — the one view where one
 * variation holds more than one card per row.
 */
function levelSetView(locale) {
  const file = path.join(LANDING_DIR, locale + '.json');
  if (!fs.existsSync(file)) return null;
  const landings = JSON.parse(fs.readFileSync(file, 'utf8')).landings.filter((l) => l.coordinate.type === 'all-about-me' && !l.coordinate.target);
  if (landings.length < 4) return null;
  const decks = [];
  const add = (code, mode, copies) => {
    for (const n of copies) decks.push({ slug: `aam-${mode || 'x'}-${code}${n > 1 ? '-' + n : ''}`, title: 'All About Me', exerciseMode: mode, hasAnswerKey: false });
  };
  add('k323', null, [2, 3, 4, 5, 6]); add('k342', null, [2, 3, 4, 5, 6]); add('k344', 'easy', [1]); add('k344', 'hard', [1]);
  add('k345', null, [2, 3, 4, 5, 6]); add('k345', 'hard', [1, 2, 3, 4, 5]);
  const extra = sheets.levelSetRows(landings, decks, (s) => '/' + locale + '/decks/' + s + '/', (m) => m, 'Set');
  return [...landings, ...extra];
}

/* ------------------------------------------------------------------ *
 * Sweep
 * ------------------------------------------------------------------ */
function sweep(orderHubRows, { quiet } = {}) {
  const fails = [];
  const stats = { views: 0, pages: 0, locales: 0 };
  const page1Ranks = {};

  for (const locale of LOCALES) {
    const rows = hubRows(locale);
    if (!rows) { fails.push(`no landing corpus for ${locale}`); continue; }
    stats.locales++;
    const tabs = {
      all: rows,
      interactive: rows.filter((r) => !isPrintOnly(r)),
    };
    for (const [tab, tabRows] of Object.entries(tabs)) {
      // unfiltered
      const r = orderHubRows(tabRows, false, isPrintOnly);
      stats.views++;
      fails.push(...checkView(r.rows, tabRows, `${locale}/${tab}`, r.axis, locale, stats));

      // (6) COVERAGE — every type must appear inside the first ceil(T/24) pages
      const types = [...new Set(tabRows.map((x) => x.coordinate.type))];
      const window = Math.ceil(types.length / PAGE) * PAGE;
      const early = new Set(r.rows.slice(0, window).map((x) => x.coordinate.type));
      const late = types.filter((t) => !early.has(t));
      if (late.length) fails.push(`${locale}/${tab}: ${late.length} type(s) never reach the first ${window / PAGE} pages: ${late.slice(0, 5).join(', ')}`);

      // (5) PAGE-1 FAIRNESS — the size-rank vector, pinned as a snapshot
      if (tab === 'all') {
        const bySize = types.slice().sort((a, b) =>
          tabRows.filter((x) => x.coordinate.type === b).length - tabRows.filter((x) => x.coordinate.type === a).length
          || (a < b ? -1 : 1));
        const rankOf = new Map(bySize.map((t, i) => [t, i + 1]));
        page1Ranks[locale] = [...new Set(r.rows.slice(0, PAGE).map((x) => rankOf.get(x.coordinate.type)))].sort((a, b) => a - b);
        const maxRank = Math.max(...page1Ranks[locale]);
        if (maxRank < Math.floor(types.length * 0.55)) {
          fails.push(`${locale}: page 1 only reaches size-rank ${maxRank} of ${types.length} — the deal has collapsed toward the biggest types`);
        }
      }

      // filtered: one view per type
      if (tab === 'all') {
        for (const t of types) {
          const sub = tabRows.filter((x) => x.coordinate.type === t);
          const rr = orderHubRows(sub, true, isPrintOnly);
          stats.views++;
          fails.push(...checkView(rr.rows, sub, `${locale}/type=${t}`, rr.axis, locale, stats));
        }
      }
    }
  }

  // Level Set type views (All About Me, every locale that has its landings)
  let levelSetViews = 0;
  for (const locale of LOCALES) {
    const rows = levelSetView(locale);
    if (!rows) continue;
    const rr = orderHubRows(rows, true, isPrintOnly);
    stats.views++; levelSetViews++;
    fails.push(...checkView(rr.rows, rows, `${locale}/type=all-about-me+levelset`, rr.axis, locale, stats));
  }
  if (levelSetViews < LOCALES.length) fails.push(`vacuous: only ${levelSetViews} of ${LOCALES.length} locales built a Level Set view`);

  // (3) DETERMINISM — same process twice, and a pre-shuffled + re-seeded input.
  const detLocale = LOCALES[0];
  const detRows = hubRows(detLocale);
  if (detRows) {
    const a = orderHubRows(detRows, false, isPrintOnly).rows.map((r) => r.slug).join('|');
    const b = orderHubRows(detRows, false, isPrintOnly).rows.map((r) => r.slug).join('|');
    if (a !== b) fails.push('determinism: two runs in one process disagree');
    const shuffled = detRows.slice().reverse();
    const c = orderHubRows(shuffled, false, isPrintOnly).rows.map((r) => r.slug).join('|');
    if (a !== c) fails.push('determinism: a reversed input produces a different order (the slug seed is not doing its job)');
  }

  // ---- non-vacuity, asserted against independently computed floors ----
  const minViews = LOCALES.length * 2;
  if (stats.views < minViews) fails.push(`vacuous sweep: ${stats.views} views (floor ${minViews})`);
  if (stats.pages < LOCALES.length * 50) fails.push(`vacuous sweep: ${stats.pages} pages visited`);
  if (stats.locales !== LOCALES.length) fails.push(`only ${stats.locales} of ${LOCALES.length} locales had a corpus`);

  if (!quiet) {
    console.log(`swept ${stats.views} views / ${stats.pages} pages across ${stats.locales} locales`);
    for (const [loc, v] of Object.entries(page1Ranks)) {
      console.log(`  page-1 size-ranks ${loc}: ${v.join(',')}`);
    }
  }
  return fails;
}

/* ------------------------------------------------------------------ *
 * Poison tests — the gate is not trusted until it is proven to fail
 * ------------------------------------------------------------------ */
const POISONS = [
  ['no row-by-row layout on an infeasible page (the big key stacks at the end)',
    (s) => s.replace('return arrangeRows(order, buckets, remaining, items.length, d);', '')],
  ['identity ordering (no spread, no arrangement)',
    (s) => s.replace(
      /const out: T\[\] = \[\];\n  for \(let i = 0[\s\S]*?\n  \}\n  return \{ rows: out, axis \};/,
      'return { rows: spread, axis };')],
  ['no per-page arrangement (spread only)',
    (s) => s.replace('arrangePage(spread.slice(i, i + pageSize), primaryKey, 4, secondaryKey, fmtKey)',
      'spread.slice(i, i + pageSize)')],
  ['size-desc deal instead of the stratified one',
    (s) => s.replace('if (acc >= target && strata.length < pageSize - 1)', 'if (false)')],
  // NOT "collapse NULL_KEY to ''" — that was tried and SURVIVED, correctly:
  // the sentinel is only ever compared within one axis, so '' yields an
  // identical partition and the poison tested a no-op. The real failure mode
  // the sentinel guards is null being treated as a WILDCARD instead of a class,
  // which is what this poison does: give every null-mode row its own key so the
  // module stops separating them. The gate maps them to one key independently,
  // so it must catch the rows landing on the same display row.
  ['mode:null scattered into per-row keys instead of one class',
    (s) => s.replace(
      "case 'mode': return l.coordinate.mode || NULL_KEY;",
      "case 'mode': return l.coordinate.mode || l.slug;")],
  ['a duplicated row in the output',
    (s) => s.replace('return { rows: out, axis };', 'out[1] = out[0]; return { rows: out, axis };')],
  ['a dropped row in the output',
    (s) => s.replace('return { rows: out, axis };', 'return { rows: out.slice(1), axis };')],
];

function runPoisons() {
  console.log('poison tests — each must FAIL the gate\n');
  let bad = 0;
  // control: the real source must PASS, or a poison "firing" proves nothing
  const control = sweep(loadTs(CATALOG_TS, catalogSource).orderHubRows, { quiet: true });
  if (control.length) {
    console.log('  ✗ CONTROL FAILED — the unmodified source does not pass, so no poison result means anything');
    control.slice(0, 5).forEach((f) => console.log('      ' + f));
    return 1;
  }
  console.log('  ✓ control: the unmodified source passes\n');

  for (const [name, mutate] of POISONS) {
    const poisoned = mutate(catalogSource);
    if (poisoned === catalogSource) {
      console.log(`  ✗ ${name} — THE NEEDLE MATCHED NOTHING (a poison stopped upstream tests nothing)`);
      bad++;
      continue;
    }
    let fails;
    try {
      fails = sweep(loadTs(CATALOG_TS, poisoned).orderHubRows, { quiet: true });
    } catch (e) {
      fails = ['threw: ' + e.message];
    }
    if (fails.length === 0) {
      console.log(`  ✗ ${name} — SURVIVED the gate`);
      bad++;
    } else {
      console.log(`  ✓ ${name} — killed (${fails.length} failures, first: ${String(fails[0]).slice(0, 90)})`);
    }
  }
  console.log(bad === 0 ? '\nall poisons killed.' : `\n${bad} poison(s) survived.`);
  return bad === 0 ? 0 : 1;
}

/* ------------------------------------------------------------------ */
if (POISON) {
  process.exit(runPoisons());
} else {
  const { orderHubRows } = loadTs(CATALOG_TS, catalogSource);
  const fails = sweep(orderHubRows);
  if (fails.length) {
    console.log('\nFAIL — ' + fails.length + ' problem(s):');
    fails.slice(0, 40).forEach((f) => console.log('  ✗ ' + f));
    if (fails.length > 40) console.log(`  … and ${fails.length - 40} more`);
    process.exit(1);
  }
  console.log('\nPASS — no worksheet type repeats inside any row, anywhere.');
  process.exit(0);
}
