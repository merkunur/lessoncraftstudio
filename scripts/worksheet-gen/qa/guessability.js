/**
 * guessability.js — can a child score on an interactive screen WITHOUT knowing the answer? (2026-10-06)
 *
 * Measures the "no-knowledge" strategies a child (or a bored tapper) can use on a deck's DECK_BUNDLE and compares
 * each with chance. Born of the i % 3 rotation that shipped in 13 Level Set types (~15,500 decks): every check
 * asked "is the marked answer right?", none asked "is it guessable?" — this asks it.
 *
 *   tap-choice  (answers[i] = index of the right option among items[i].options)
 *     slot-k        always tap option k
 *     rotate+c/-c   tap option (i + c) mod n / (c − i) mod n — the diagonal tell, any step
 *     num-min/mid/max   tap the smallest / middle / largest number written on the option (first number in the label)
 *     rank-rot±c    tap the number of rank (i ± c) mod n — smallest, middle, largest in turn
 *     len-min/max   tap the shortest / longest label
 *     most-shared   tap the option whose tokens (numbers / words) appear most often among the other options
 *     least-shared  tap the odd one out by tokens
 *   tap-order   (answers[i] = rank of item i)
 *     as-shown      tap in reading order (the page already lists them in order)
 *     reversed      tap in reverse reading order
 *   tap-select  (answers[i] = true/false)
 *     all / none / first-half / alternate patterns (scored per item)
 *   tap-spell   (tiles in order == the word?)
 *     as-shown      the tiles already spell the word left to right
 *
 * Verdict per group (a type, a face): a strategy FAILS when its pooled score beats chance by more than MARGIN
 * (0.10) or solves more than PAGE_FRAC (5%) of pages outright (pages with ≥ 3 questions). WARN above half of that.
 *
 * Library: measure(bundles) → { kind, n, chance, strategies: [{ name, score, pagesSolved }], verdict, worst }.
 * CLI:     node qa/guessability.js <folder-of-zips | decks-root> [--group=type|face|deck] [--json=out.json]
 *          a decks-root (…/decks/<loc>/<slug>/deck.html) is walked through its symlinks only (the live versions).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const MARGIN = 0.10, WARN_MARGIN = 0.05, PAGE_FRAC = 0.05, MIN_PAGE_Q = 4;
// ~40 strategies are tried on every group, so the best of them beats chance on a small sample by luck alone: a tell
// must ALSO be significant (z ≥ Z_FAIL, about a 1-in-4,000 fluke per strategy). A real tell on live decks scores
// z of 20-100; a 48-question sample at 54% against 33% scores z 3.0 and is only reported as "too few to tell".
const Z_FAIL = 3.5, Z_WARN = 3.0;

function bundleOf(html) {
  const m = /window\.DECK_BUNDLE=(\{[\s\S]*?\});<\/script>/.exec(html);
  if (!m) return null;
  try { return JSON.parse(m[1]); } catch (e) { return null; }
}

const numOf = (s) => { const m = /-?\d+(?:[.,]\d+)?/.exec(String(s)); return m ? parseFloat(m[0].replace(',', '.')) : null; };
const tokens = (s) => String(s).toLowerCase().normalize('NFC').match(/\d+|\p{L}+/gu) || [];

/** strategy picks for one tap-choice question: name → chosen option index (or null when it does not apply) */
function choicePicks(opts, i, pictures) {
  const n = opts.length, L = opts.map((o) => String(o.label == null ? '' : o.label));
  const p = {};
  for (let k = 0; k < Math.min(n, 5); k++) p['slot-' + k] = k;
  // picture options carry an internal id as their label ("cake#3"): a child sees the picture, never the id — only the
  // position strategies apply (2026-10-06: Story Sequencing scored "most-shared" off the ids' story names)
  const opaque = pictures || L.every((x) => /^[\w-]+#\d+$/.test(x));
  for (let c = 0; c < n; c++) { p['rotate+' + c] = (i + c) % n; p['rotate-' + c] = (((c - i) % n) + n) % n; }
  const nums = L.map(numOf);
  if (!opaque && nums.every((x) => x !== null) && new Set(nums).size === n) {
    const idx = nums.map((v, j) => [v, j]).sort((a, b) => a[0] - b[0]);
    p['num-min'] = idx[0][1]; p['num-max'] = idx[n - 1][1];
    if (n % 2 === 1) p['num-mid'] = idx[(n - 1) / 2][1];
    // rank rotation: smallest, middle, largest in turn (the 2026-10-05 Column Addition "fix" was exactly this)
    for (let c = 0; c < n; c++) { p['rank-rot+' + c] = idx[(i + c) % n][1]; p['rank-rot-' + c] = idx[(((c - i) % n) + n) % n][1]; }
  }
  // part counts (dashes, middle dots, spaces): "the option with the middle number of pieces" (Syllable Split 2026-10-06)
  const parts = L.map((x) => (x.match(/[-‐·•s]/g) || []).length);
  if (!opaque && new Set(parts).size > 1) {
    const pi = parts.map((v, j) => [v, j]).sort((a2, b2) => a2[0] - b2[0]);
    const uniq = (v) => parts.filter((x) => x === v).length === 1;
    if (uniq(pi[0][0])) p['parts-min'] = pi[0][1];
    if (uniq(pi[n - 1][0])) p['parts-max'] = pi[n - 1][1];
    if (n === 3 && uniq(pi[1][0]) && pi[0][0] !== pi[1][0] && pi[1][0] !== pi[2][0]) p['parts-mid'] = pi[1][1];
    const counts = {}; parts.forEach((v) => (counts[v] = (counts[v] || 0) + 1));
    const odd = parts.findIndex((v) => counts[v] === 1); if (Object.keys(counts).length === 2 && odd >= 0) p['parts-odd'] = odd;
  }
  const lens = L.map((s) => [...s].length);
  if (!opaque && new Set(lens).size === n) {
    const li = lens.map((v, j) => [v, j]).sort((a, b) => a[0] - b[0]);
    p['len-min'] = li[0][1]; p['len-max'] = li[n - 1][1];
  }
  const T = L.map(tokens);
  if (!opaque && T.every((t) => t.length)) {
    const shared = T.map((t, j) => t.reduce((s, tok) => s + T.filter((u, k) => k !== j && u.includes(tok)).length, 0) / t.length);
    const mx = Math.max(...shared), mn = Math.min(...shared);
    if (shared.filter((v) => v === mx).length === 1) p['most-shared'] = shared.indexOf(mx);
    if (shared.filter((v) => v === mn).length === 1) p['least-shared'] = shared.indexOf(mn);
  }
  return p;
}

/** reading order of boxes: top to bottom, then left to right (rows within 2% of the page height) */
function readingOrder(items) {
  return items.map((it, j) => ({ j, x: +it.x || 0, y: +it.y || 0 }))
    .sort((a, b) => (Math.abs(a.y - b.y) > 2 ? a.y - b.y : a.x - b.x)).map((o) => o.j);
}

/**
 * @param {Array<object>} bundles  DECK_BUNDLE objects of one group
 */
function measure(bundles) {
  const byKind = {};
  for (const b of bundles) if (b && b.kind) (byKind[b.kind] = byKind[b.kind] || []).push(b);
  const out = [];
  for (const [kind, list] of Object.entries(byKind)) {
    const S = {}; let q = 0, chanceSum = 0, pages = 0;
    const perPage = {};
    const hit = (name, ok, page) => { const s = S[name] || (S[name] = { tried: 0, right: 0, pages: new Set(), pagesTried: new Set(), perPage: {} }); s.tried++; if (ok) s.right++; s.pagesTried.add(page); s.perPage[page] = (s.perPage[page] || 0) + 1; if (!ok) s.pages.add('x' + page); };
    const qOnPage = {}, pLuck = {};   // pLuck[page] = probability a blind strategy solves the whole page
    const luck = (page, p) => { pLuck[page] = (pLuck[page] === undefined ? 1 : pLuck[page]) * p; };
    list.forEach((b, page) => {
      const items = b.items || [], A = b.answers || [];
      if (kind === 'tap-choice') {
        if (items.length) pages++;
        items.forEach((it, i) => {
          const opts = it.options || []; if (opts.length < 2) return;
          q++; qOnPage[page] = (qOnPage[page] || 0) + 1; chanceSum += 1 / opts.length; luck(page, 1 / opts.length);
          for (const [name, pick] of Object.entries(choicePicks(opts, i, b.pictures))) hit(name, pick === A[i], page);
        });
      } else if (kind === 'tap-order') {
        if (items.length < 2) return; pages++;
        const ord = readingOrder(items), ranks = A.slice().sort((a, b) => a - b);
        const rankOf = new Map(); ord.forEach((j, pos) => rankOf.set(j, ranks[pos]));
        const rev = ord.slice().reverse(), rankRev = new Map(); rev.forEach((j, pos) => rankRev.set(j, ranks[pos]));
        items.forEach((_, j) => { q++; qOnPage[page] = (qOnPage[page] || 0) + 1; chanceSum += 1 / items.length; luck(page, 1 / items.length); hit('as-shown', rankOf.get(j) === A[j], page); hit('reversed', rankRev.get(j) === A[j], page); });
      } else if (kind === 'tap-select') {
        if (items.length < 2) return; pages++;
        const ord = readingOrder(items), pos = new Map(ord.map((j, k) => [j, k])), half = items.length / 2;
        items.forEach((_, j) => {
          q++; qOnPage[page] = (qOnPage[page] || 0) + 1; chanceSum += 0.5; luck(page, 0.5); const k = pos.get(j);
          // (no 'tap all' / 'tap none': a tap-to-select page is graded on the targets FOUND and the wrong taps, so the share of
          // non-targets is not a score a child can collect — 2026-10-06, Find the Objects read 85% for tapping nothing)
          hit('first-half', A[j] === (k < half), page); hit('second-half', A[j] === (k >= half), page);
          hit('alternate-0', A[j] === (k % 2 === 0), page); hit('alternate-1', A[j] === (k % 2 === 1), page);
        });
      } else if (kind === 'tap-spell') {
        items.forEach((it) => {
          const tiles = it.tiles || []; if (tiles.length < 2) return; pages++;
          q++; qOnPage[page] = (qOnPage[page] || 0) + 1; chanceSum += 1 / Math.min(720, fact(tiles.length));
          const ord = readingOrder(tiles).map((j) => tiles[j].label).join('');
          hit('as-shown', ord === String(A[items.indexOf(it)]), page);
        });
      }
    });
    if (!q) continue;
    const chance = chanceSum / q;
    // a strategy that does not apply to a card leaves the child GUESSING there: its score counts those cards at chance
    // (2026-10-06: "the middle number of pieces" applies to a third of the cards and read 100% on that third alone)
    const strategies = Object.entries(S).map(([name, s]) => {
      const missing = q - s.tried;
      s = { ...s, right: s.right + missing * (chanceSum / q), tried: q, perPage: s.perPage, pages: s.pages, pagesTried: s.pagesTried };
      // only pages with ≥ MIN_PAGE_Q questions count: a 3-question page is solved by luck 1 time in 27
      // a page counts only when the strategy answered EVERY question on it (a strategy that applies to one card of six
      // and is right there has not "solved" the page)
      const big = [...s.pagesTried].filter((pg) => (qOnPage[pg] || 0) >= MIN_PAGE_Q && s.perPage[pg] === qOnPage[pg]);
      const solvedPages = big.filter((pg) => !s.pages.has('x' + pg)).length;
      const expected = big.length ? big.reduce((a, pg) => a + (pLuck[pg] || 0), 0) / big.length : 0;
      return { name, tried: s.tried, score: s.right / s.tried, pagesSolved: big.length ? solvedPages / big.length : 0, pagesLuck: expected, bigPages: big.length, solvedCount: solvedPages };
    }).filter((s) => s.tried >= 10).sort((a, b) => b.score - a.score);
    let verdict = 'PASS', worst = null;
    for (const s of strategies) {
      const over = s.score - chance;
      // whole pages solved: compared with what luck alone solves on THESE pages (two-option pages fall to luck more often)
      const pageOver = s.pagesSolved - s.pagesLuck;
      const z = (s.score - chance) / Math.sqrt(Math.max(1e-9, chance * (1 - chance) / s.tried));
      const pl = Math.max(1e-6, s.pagesLuck), zp = s.bigPages ? (s.pagesSolved - pl) / Math.sqrt(pl * (1 - pl) / s.bigPages) : 0;
      s.z = z; s.zPages = zp;
      // at least 3 pages solved outright: one page of fifteen matching one of ~40 rhythms is luck, three is a pattern
      const pageBad = kind !== 'tap-spell' && s.bigPages >= 20 && s.solvedCount >= 3 && pageOver > PAGE_FRAC && zp >= Z_FAIL;
      const pageWarn = kind !== 'tap-spell' && s.bigPages >= 20 && s.solvedCount >= 3 && pageOver > PAGE_FRAC / 2 && zp >= Z_WARN;
      s.v = ((over > MARGIN && z >= Z_FAIL) || pageBad) ? 'FAIL' : ((over > WARN_MARGIN && z >= Z_WARN) || pageWarn) ? 'WARN' : 'PASS';
    }
    const rank = { FAIL: 2, WARN: 1, PASS: 0 };
    for (const s of strategies) if (!worst || rank[s.v] > rank[worst.v] || (rank[s.v] === rank[worst.v] && s.score - chance > worst.score - chance)) worst = s;
    if (worst) verdict = worst.v;
    out.push({ kind, decks: list.length, questions: q, chance, strategies, verdict, worst });
  }
  return out;
}
function fact(n) { let f = 1; for (let i = 2; i <= n; i++) f *= i; return f; }

module.exports = { measure, bundleOf, choicePicks, MARGIN, PAGE_FRAC };

if (require.main === module) {
  const target = process.argv[2];
  if (!target) { console.error('usage: node qa/guessability.js <folder-of-zips | decks-root> [--group=type|face] [--json=out.json] [--only=<substring>]'); process.exit(2); }
  const arg = (k) => (process.argv.find((a) => a.startsWith('--' + k + '=')) || '').slice(k.length + 3);
  const groupBy = arg('group') || 'type', only = arg('only');
  const groups = {};
  const add = (key, b) => { if (!b) return; (groups[key] = groups[key] || []).push(b); };
  const keyOf = (m, slug) => {
    const s = (m && m.settings) || {};
    const type = (m && (m.exercise_type || (m.generator && m.generator.app))) || slug.replace(/-[a-z]{2}-?.*$/, '');
    return groupBy === 'face' ? type + ' ' + (s.worksheet_type || m.variant_id || '') : type;
  };
  const files = fs.readdirSync(target);
  if (files.some((f) => f.endsWith('.zip'))) {
    const AdmZip = require('adm-zip');
    for (const f of files.filter((x) => x.endsWith('.zip'))) {
      if (only && !f.includes(only)) continue;
      const z = new AdmZip(path.join(target, f));
      const m = JSON.parse(z.readAsText('manifest.json'));
      add(keyOf(m, f), bundleOf(z.readAsText('deck.html')));
    }
  } else {
    for (const loc of files) {
      const ld = path.join(target, loc);
      if (!fs.statSync(ld).isDirectory() || loc.startsWith('.')) continue;
      for (const slug of fs.readdirSync(ld)) {
        if (only && !slug.includes(only)) continue;
        const p = path.join(ld, slug);
        let st; try { st = fs.lstatSync(p); } catch (e) { continue; }
        if (!st.isSymbolicLink()) continue;          // the live version only
        let html, m = null;
        try { html = fs.readFileSync(path.join(p, 'deck.html'), 'utf8'); } catch (e) { continue; }
        if (!html.includes('window.DECK_BUNDLE=')) continue;
        try { m = JSON.parse(fs.readFileSync(path.join(p, 'manifest.json'), 'utf8')); } catch (e) { /* app decks may lack one */ }
        add(keyOf(m, slug), bundleOf(html));
      }
    }
  }
  const report = [];
  let fails = 0;
  for (const [key, list] of Object.entries(groups).sort()) {
    for (const r of measure(list)) {
      report.push({ group: key, ...r });
      if (r.verdict === 'FAIL') fails++;
      const w = r.worst || r.strategies[0];
      console.log(`${r.verdict.padEnd(4)} ${key.padEnd(34)} ${r.kind.padEnd(10)} decks=${String(r.decks).padStart(5)} q=${String(r.questions).padStart(6)} chance=${(r.chance * 100).toFixed(0)}%` +
        (w ? `  worst ${w.name}=${(w.score * 100).toFixed(0)}% pagesSolved=${(w.pagesSolved * 100).toFixed(0)}%` : ''));
    }
  }
  const unknown = Object.values(groups).flat().filter((b) => !b.kind).length;
  if (unknown) console.log(`(${unknown} decks with a DECK_BUNDLE of another shape — app decks; measured separately)`);
  if (arg('json')) fs.writeFileSync(arg('json'), JSON.stringify(report, null, 1));
  console.log(`\n${report.length} groups, ${fails} FAIL`);
  process.exit(fails ? 1 : 0);
}
