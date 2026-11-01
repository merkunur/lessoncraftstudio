#!/usr/bin/env node
/**
 * The Money maker's engine (scripts/worksheet-gen/types/_shared/money-more.js, lib/money-format.js, 2026-11-01):
 *   - fewestWays agrees with a brute-force count of every coin combination (the fewest number, how many ways reach it)
 *   - poison: a NON-canonical set ({1, 3, 4}: 6 = 3 + 3, largest-first takes 4 + 1 + 1) — fewestWays disagrees with the
 *     greedy way, so Fewest Coins can never ask that card (the build accepts only amounts where greedy = the one fewest)
 *   - every card of every Fewest Coins page, 11 locales × 3 levels × 6 copies: its counts are the largest-first way, the
 *     only fewest way, and make the amount
 *   - the money format of each locale (the native-signed table)
 *   node scripts/makers/tests/money.test.js
 */
'use strict';
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const { fewestWays, greedy } = require(path.join(REPO, 'scripts/worksheet-gen/types/_shared/money-more.js'));
const { formatMoney } = require(path.join(REPO, 'scripts/worksheet-gen/lib/money-format.js'));
const { CURRENCIES } = require(path.join(REPO, 'scripts/worksheet-gen/data/money/currencies.js'));
const runtime = require(path.join(REPO, 'scripts/makers/runtime.js'));
const { resolveStrings, withLevelInstruction } = require(path.join(REPO, 'scripts/worksheet-gen/i18n/strings.js'));

let fails = 0;
const check = (name, ok, extra) => { if (!ok) fails++; if (!ok || process.argv.includes('--verbose')) console.log((ok ? 'ok   ' : 'FAIL ') + name + (ok || extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 300))); };

/** brute force: every combination (≤ 12 of each coin) */
function brute(amount, vals) {
  let best = Infinity, ways = 0;
  const rec = (i, left, n) => {
    if (left === 0) { if (n < best) { best = n; ways = 1; } else if (n === best) ways++; return; }
    if (i === vals.length) return;
    for (let k = 0; k * vals[i] <= left && k <= 12; k++) rec(i + 1, left - k * vals[i], n + k);
  };
  rec(0, amount, 0);
  return { n: best, ways };
}

// 1. fewestWays = brute force, every set of the 11 locales, every amount up to 99
let compared = 0;
for (const [loc, c] of Object.entries(CURRENCIES)) {
  const vals = c.sub.map((x) => x.v).sort((a, b) => b - a);
  for (let a = 1; a <= 99; a++) {
    const b = brute(a, vals), f = fewestWays(a, vals);
    if (b.n === Infinity) { check(`${loc} ${a}: no way`, f.ways.length === 0); continue; }
    compared++;
    if (f.ways.length && f.ways[0].reduce((s, x) => s + x, 0) !== b.n) check(`${loc} ${a}: fewest ${b.n}`, false, f.ways[0]);
    if (f.ways.length !== b.ways) check(`${loc} ${a}: ${b.ways} fewest ways`, false, f.ways.length);
  }
}
check(`fewestWays = brute force over ${compared} (set, amount) pairs`, compared > 500);

// 2. poison: a non-canonical set — the greedy way is not the fewest, so no Fewest Coins card may use it
{
  const vals = [4, 3, 1];
  const g = greedy(6, vals), f = fewestWays(6, vals);
  const greedyIsFewest = f.ways.length === 1 && f.ways[0].every((n, i) => n === g[i]);
  check('poison: {4,3,1} makes 6 as 3 + 3 (2 coins), largest-first takes 3 — rejected', !greedyIsFewest && f.ways[0].join() === '0,2,0');
}

// 3. every Fewest Coins card: largest-first = the only fewest way, and the counts make the amount
const type = require(path.join(REPO, 'scripts/worksheet-gen/types/g2/G2-471-fewest-coins.js'));
let cards = 0;
// levels 2-3 (2026-11-01): every coin worth at most the amount is shown, never one worth more (it can be in no way — an
// always-empty box is a free answer); level 2 asks only amounts whose fewest way needs at most 4 coins
const showsUsable = (amount, set, vals) => set.join() === vals.filter((v) => v <= amount).join();
check('poison: a card showing a coin worth more than its amount is caught', !showsUsable(35, [50, 20, 10, 5], [50, 20, 10, 5]) && showsUsable(35, [20, 10, 5], [50, 20, 10, 5]));
for (const loc of ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi']) {
  const vals = CURRENCIES[loc].sub.map((x) => x.v).sort((a, b) => b - a);
  for (const d of [1, 2, 3]) for (let v = 1; v <= 6; v++) {
    const r = runtime.makePage({ type, strings: withLevelInstruction(resolveStrings('G2-471', loc, type), 'G2-471', d, loc), locale: loc, difficulty: d, variant: v });
    for (const m of r.html.matchAll(/data-lcs-amount="(\d+)" data-lcs-set="([\d,]+)">([\s\S]*?)<\/div>/g)) {
      const amount = +m[1], set = m[2].split(',').map(Number);
      const counts = [...m[3].matchAll(/data-lcs-answer="(\d*)"/g)].map((x) => (x[1] === '' ? 0 : +x[1]));
      cards++;
      const g = greedy(amount, set), f = fewestWays(amount, set);
      const ok = counts.length === set.length && counts.reduce((s, n, i) => s + n * set[i], 0) === amount && g[g.length - 1] === 0 &&
        counts.every((n, i) => n === g[i]) && f.ways.length === 1 && f.ways[0].every((n, i) => n === counts[i]);
      if (!ok) check(`${loc} L${d} v${v} ${amount} with ${set}`, false, counts);
      if (d > 1 && !showsUsable(amount, set, vals)) check(`${loc} L${d}: levels 2-3 show every coin up to the amount`, false, set);
      if (d === 2 && counts.reduce((a, b) => a + b, 0) > 4) check(`${loc} L2 ${amount}: at most 4 coins`, false, counts);
    }
  }
}
check(`Fewest Coins: ${cards} cards — the largest-first way is the only fewest way`, cards >= 11 * 3 * 6 * 4);

// 3b. Which Purse Has More (G1-232), every NEW page (2026-11-01): it holds rows where the richer purse has MORE coins and
//     rows where it has FEWER — never all one kind ("the purse with more coins" would solve the page); the richer purse
//     holds the biggest coin on a fewer-coins row only. Poison: an all-one-kind page is caught.
const purse = require(path.join(REPO, 'scripts/worksheet-gen/types/g1/G1-232-which-purse-has-more.js'));
const { makeRng } = require(path.join(REPO, 'scripts/worksheet-gen/lib/rng.js'));
const bothKinds = (kinds) => kinds.includes(true) && kinds.includes(false);
check('poison: an all-one-kind purse page is caught', !bothKinds([true, true, true]) && bothKinds([true, false, true]));
let purses = 0;
for (const loc of ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi']) for (const d of [1, 2, 3]) for (let v = 2; v <= 7; v++) {
  const m = purse.build({ difficulty: d, locale: loc }, { rng: makeRng(`money-test|${loc}|${d}|${v}`), variant: v, locale: loc });
  const kinds = m._rows.map((r) => { const R = r.more === 'left' ? r.left : r.right, P = r.more === 'left' ? r.right : r.left; return R.values.length > P.values.length; });
  purses++;
  if (!bothKinds(kinds)) check(`${loc} L${d} v${v}: the purse page holds both kinds of row`, false, kinds);
}
check(`Which Purse Has More: ${purses} new pages, each with both kinds of row`, purses === 11 * 3 * 6);

// 4. coin tokens are drawn in the proportions of the real coins, never "bigger = worth more" (the US dime is smaller than
//    the penny): every pair of a set ordered as its diameters; poison: the value-rank ladder breaks the US order
{
  const { sizeFor, mmOf } = require(path.join(REPO, 'scripts/worksheet-gen/primitives/coins.js'));
  const ordered = (sub, mm) => {
    const all = sub.map((x) => x.v), d = (v) => sizeFor(v, all, { minPx: 34, maxPx: 82, mm });
    return sub.every((a) => sub.every((b) => !(a.mm < b.mm) || d(a.v) <= d(b.v)) && (a.mm === Math.max(...sub.map((x) => x.mm)) ? d(a.v) === 82 : true));
  };
  for (const [loc, c] of Object.entries(CURRENCIES)) check(`coin sizes follow the real diameters: ${loc}`, !!mmOf(c.sub) && ordered(c.sub, mmOf(c.sub)));
  check('poison: sized by value rank, the US dime outgrows the penny', !ordered(CURRENCIES.en.sub, null));
}

// 5. the money format table (native-signed)
const want = { en: '$17.36', es: '$85', pt: 'R$ 17,36', de: '17,36 €', fr: '17,36 €', it: '17,36 €', nl: '€ 17,36', fi: '17,36 €', sv: '85 kr', da: '85 kr.', no: '85 kr' };
for (const [loc, w] of Object.entries(want)) check(`format ${loc}`, formatMoney(['es', 'sv', 'da', 'no'].includes(loc) ? 85 : 1736, loc) === w, formatMoney(['es', 'sv', 'da', 'no'].includes(loc) ? 85 : 1736, loc));

console.log(fails ? `money: ${fails} FAILED` : 'money: all checks pass');
process.exit(fails ? 1 : 0);
