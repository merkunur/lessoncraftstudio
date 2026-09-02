#!/usr/bin/env node
/**
 * scan-duplicate-problems.js <locale...> — flags a worksheet that asks the SAME
 * question twice on one page.
 *
 * WHY. Story-card specs build each card independently with rng.pick and never
 * check what the previous card drew. That is harmless while a page mixes card
 * kinds (the base money page is total / change / can-buy) and stops being
 * harmless once a variation pins every card to one kind. Measured: the English
 * "How Much Change?" face rendered cards 1 and 3 as the identical problem —
 * same child, same 40c fish, the same two 25c coins, the same answer — on a
 * three-card page, so a child does two thirds of the work. Reported by the Dutch
 * panel, reproduced in English.
 *
 * Nothing else catches it: the QA lints check geometry, the similarity gate
 * compares one deck with another rather than a page with itself, and the publish
 * predicates only hash title and description.
 *
 * ⚠ IT READS THE BUILD, NOT THE ZIP. The first version of this scanned the
 * packaged deck.html for data-lcs-problem and found ZERO — the worksheet body is
 * rendered to an image and only the chrome reaches deck.html — yet it still
 * printed "no deck repeats a question" and exited 0. A gate that selects nothing
 * reports success. It now calls build() and scans the bodyHtml those attributes
 * actually live in, and it FAILS LOUDLY if a locale yields no story cards at all.
 *
 * Two cards with the same (qtype, refs, answer) are the same question however
 * they are worded — which is the case a text comparison misses, since the two
 * duplicates read "how much money does Mia get back?" and "how much change does
 * Mia get?".
 */
'use strict';
const path = require('path');
const fs = require('fs');
const ROOT = path.join(__dirname, '..');
const { ROWS } = require('./gen-b2var-specs.js');
const { loadType } = require('../lib/load-types.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');

const RE = /data-lcs-problem[^>]*?data-lcs-qtype="([^"]*)"[^>]*?data-lcs-refs="([^"]*)"[^>]*?data-lcs-answer="([^"]*)"/g;

function problemsOf(html) {
  const out = [];
  let m; RE.lastIndex = 0;
  while ((m = RE.exec(html))) out.push({ qtype: m[1], refs: m[2], answer: m[3] });
  return out;
}

async function scanLocale(loc) {
  const wave = JSON.parse(fs.readFileSync(path.join(ROOT, 'waves', 'wave-b2var-' + loc + '.json'), 'utf8'));
  const findings = [];
  let pagesWithCards = 0;
  for (const r of ROWS) {
    const id = r[1];
    const type = loadType(id);
    const ov = wave.themeOverrides[id];
    const theme = ov || null;
    let built;
    try {
      const rng = makeRng(instanceSeed({ typeId: id, theme, difficulty: 2, seedEpoch: 1 }));
      built = await type.build({ theme, difficulty: 2, locale: loc }, { rng });
    } catch (e) { continue; }
    const probs = problemsOf(built.bodyHtml);
    if (probs.length < 2) continue;
    pagesWithCards++;
    const seen = new Map();
    probs.forEach((p, i) => {
      // refs is SORTED before it enters the key. It arrives in the order the
      // card happens to draw its items, so a card asking for {0,2,3} and a card
      // asking for {3,2,0} are the SAME question -- same basket, same total --
      // and keying on the raw string made that duplicate invisible. Measured on
      // the shipped Finnish G2-292, 10 of 20 variants collide exactly this way
      // and this scanner reported CLEAN; the English render shows it too.
      // A duplicate-detector whose key preserves an irrelevant ordering is not
      // a duplicate-detector, it is an exact-string check wearing the name.
      const refsKey = String(p.refs).split(',').map((x) => x.trim()).sort().join(',');
      const key = p.qtype + '|' + refsKey + '|' + p.answer;
      if (seen.has(key)) findings.push({ loc, id, a: seen.get(key) + 1, b: i + 1, key });
      else seen.set(key, i);
    });
  }
  return { pagesWithCards, findings };
}

(async () => {
  const locs = process.argv.slice(2);
  if (!locs.length) { console.error('usage: scan-duplicate-problems.js <locale...>'); process.exit(2); }
  let total = 0, dups = 0, vacuous = [];
  for (const loc of locs) {
    const { pagesWithCards, findings } = await scanLocale(loc);
    total += pagesWithCards; dups += findings.length;
    if (pagesWithCards === 0) vacuous.push(loc);
    for (const f of findings) console.error(`  DUPLICATE ${f.loc} ${f.id}: cards ${f.a} and ${f.b} are the same question (${f.key})`);
  }
  if (vacuous.length) {
    console.error('VACUOUS: no story cards found at all for ' + vacuous.join(', ') + ' — the selector is wrong, not the content');
    process.exit(2);
  }
  console.log(`scanned ${total} pages carrying story cards across ${locs.length} locale(s): ${dups} duplicate question(s)`);
  process.exit(dups ? 1 : 0);
})();
