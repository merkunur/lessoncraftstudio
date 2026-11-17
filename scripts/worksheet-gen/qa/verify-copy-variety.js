#!/usr/bin/env node
/**
 * New versions that really are new (2026-11-17 audit of the makers: a teacher's "New version" gave the same page, or the
 * same items, again and again):
 *   sight words  K-388 K-389 K-390 K-391 K-433 K-434 K-435 — the sentences were taken in length order (the copy only
 *                broke ties): one or two pages per word (lib/sight-words-levelset.js pickSentences)
 *   copy cycles  G2-274 G2-281 G2-282 G2-307 G2-311 (Fix the Sentence: the same sentence frames), G2-330 / G2-332 level 3
 *                (the same compounds): past the list's first cycle every copy took the front again (allocateFrames,
 *                allocateText)
 *   rows         G1-381 2D Shapes: Real or Not? — every copy named the same shapes in the same order
 *   rainbows     K-458 Rainbow Pairs — level 2 was always the rainbows of 7, 9 and 10
 *
 *   node qa/verify-copy-variety.js            every language, the maker's page (makers/runtime.js makePage)
 *   node qa/verify-copy-variety.js --poison   the same checks must FAIL on planted faults
 *
 * Per template, level and language, 24 new versions numbered as the shell numbers them (1, then +1 to +97): the number
 * of different contents (the sentences / frames / compounds / row names / rainbow totals the page asks about) must reach
 * the template's floor, and no one content may come back on more than a third of the versions (an eighth for the cycles).
 */
'use strict';
const path = require('path');
const fs = require('fs');
const WG = path.join(__dirname, '..');
const POISON = process.argv.includes('--poison');
const LOCALES = ['en', 'de', 'sv', 'fr', 'no', 'nl', 'fi', 'da', 'it', 'es', 'pt'];
const { makeRng } = require(path.join(WG, 'lib', 'rng.js'));
const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));
const SW = require(path.join(WG, 'lib', 'sight-words-levelset.js'));
const typeOf = (id) => { const dir = path.join(WG, 'types', id.startsWith('K-') ? 'k' : id.slice(0, 2).toLowerCase()); return require(path.join(dir, fs.readdirSync(dir).find((f) => f.startsWith(id + '-')))); };
const attrs = (html, a) => [...html.matchAll(new RegExp(`${a}="([^"]*)"`, 'g'))].map((m) => m[1]);
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
// the content a version asks about
const SIG = {
  sentences: (html) => attrs(html, 'data-lcs-(?:trace-sentence|sentence-text|sent|blank-sentence)').concat(
    [...html.matchAll(/data-lcs-sentence[^>]*>([\s\S]*?)<\/(?:p|div)>/g)].map((m) => m[1].replace(/<[^>]+>/g, '').trim())).join(' | ') || html.replace(/data-lcs-slot="[^"]*"/g, ''),
  frames: (html) => attrs(html, 'data-lcs-frame').flatMap((x) => x.split('+')).sort().join(','),
  compounds: (html) => attrs(html, 'data-lcs-compound').sort().join(','),
  page: (html) => html,
  rows: (html) => (/"rows":\[([^\]]*)\]/.exec(decode(attrs(html, 'data-lcs-cfg').join(' ') || html)) || [])[1] || '',
  rainbows: (html) => attrs(html, 'data-lcs-rainbow').join(','),
};
// [id, levels, units, theme, signature, floor of different contents over 24 versions, the most one content may come back]
const CASES = [
  // the sight-word pages in English (the/and: every one of the word's six sentences fits every page); the other
  // languages' words are checked at the source below (PICK), where a word's own sentence count sets the floor
  ['K-388', [1, 2, 3], ['the', 'and'], null, 'page', 3, 12, ['en']],
  ['K-389', [1, 2, 3], ['the', 'and'], null, 'page', 3, 12, ['en']],
  ['K-390', [1, 2, 3], ['the', 'and'], null, 'page', 3, 12, ['en']],
  ['K-391', [1, 2, 3], ['the', 'and'], null, 'page', 3, 12, ['en']],
  ['K-433', [1, 2, 3], ['the', 'and'], null, 'page', 3, 12, ['en']],
  ['K-434', [1, 2, 3], ['the', 'and'], null, 'page', 3, 12, ['en']],
  ['K-435', [1, 2, 3], ['the', 'and'], null, 'page', 3, 12, ['en']],
  ['G2-274', [1, 2, 3], [null], 'animals', 'frames', 12, 3],
  ['G2-281', [1, 2, 3], [null], 'animals', 'frames', 12, 3],
  ['G2-282', [1, 2, 3], [null], 'animals', 'frames', 12, 3],
  ['G2-307', [1, 2, 3], [null], 'animals', 'frames', 12, 3],
  ['G2-311', [1, 2, 3], [null], 'animals', 'frames', 12, 3],
  ['G2-330', [3], ['A'], null, 'page', 12, 3],
  ['G2-332', [3], ['A'], null, 'compounds', 12, 3],
  ['G1-381', [1, 2], [null], null, 'rows', 6, 8],
  ['G1-381', [3], [null], null, 'rows', 4, 9],
  ['K-458', [2], [null], null, 'rainbows', 6, 8],
];

function run(fault) {
  const fails = [];
  const { makePage } = require(path.join(WG, '..', 'makers', 'runtime.js'));
  // planted faults in the code the pages are built with
  const keep = { pick: SW.pickSentences };
  const g381 = typeOf('G1-381'), k458 = typeOf('K-458');
  const keep381 = g381.build, keepTotals = k458.difficulty[2].totals;
  if (fault === 'by-length') SW.pickSentences = (w, l, o) => keep.pick(w, l, { ...o, copy: 1 });
  if (fault === 'fixed-rows') g381.build = Object.getPrototypeOf(g381) === Object.prototype ? typeOf('K-368').build : keep381;
  if (fault === 'fixed-totals') delete k458.difficulty[2].totals;
  let pages = 0;
  try {
    // PICK: the sentence draw itself, every language and every sight word: a copy past the first draws from the level's
    // length band (lib/sight-words-levelset.js), so over 24 copies the picks reach a quarter of what the band allows (or 24),
    // and copy 1 keeps the length order (the published pages)
    for (const loc of LOCALES) for (const word of SW.unitIds(loc)) {
      const w = SW.wordOf(word, loc), all = SW.sentencesOf(w, loc);
      for (const n of [1, 2, 3]) for (const level of [1, 2, 3]) {
        if (all.length < n + 1) continue;
        const byLen = [...all].sort((a, b) => a.length - b.length || (a < b ? -1 : a > b ? 1 : 0));
        const k = Math.max(n, Math.ceil(byLen.length * 2 / 3));
        let possible = 1; for (let i = 0; i < n; i++) possible *= (level === 2 ? byLen.length : k) - i;
        const seen = {};
        for (let c = 2; c <= 25; c++) {
          let p; try { p = SW.pickSentences(w, loc, { n, level, rng: makeRng(`sw|${word}|${loc}|${level}|v${c * 37}`) }); } catch (e) { fails.push(`pick ${loc} ${word} n${n} L${level}: ${e.message}`); break; }
          seen[p.join(' | ')] = (seen[p.join(' | ')] || 0) + 1;
        }
        const d = Object.keys(seen).length, top = Math.max(0, ...Object.values(seen));
        const floor = Math.max(2, Math.floor(Math.min(possible, 24) / 4)), most = Math.max(9, Math.ceil((24 / possible) * 4));   // a quarter of what the band allows; no pick past four times its share (the draw is uniform: 2,400 copies of fr "trois" gave its 12 picks 176 to 233 times; over ~1,400 small samples a tighter bound fires by chance)
        if (d < floor || top > most) fails.push(`pick ${loc} "${word}" ${n} sentence(s) level ${level}: ${d} different picks over 24 copies (floor ${floor} of ${possible} possible), the commonest ${top} times`);
        // copy 1: the level's length order, as published
        const first = SW.pickSentences(w, loc, { n, level, rng: makeRng(`sw|${word}|${loc}|${level}`) });
        const mid = Math.floor(byLen.length / 2), want = (level === 1 ? byLen : level === 3 ? [...byLen].reverse() : byLen.slice(mid).concat(byLen.slice(0, mid).reverse())).slice(0, n);
        if (first.map((x) => x.length).join() !== want.map((x) => x.length).join()) fails.push(`pick ${loc} "${word}" n${n} L${level}: copy 1 does not keep the length order`);
      }
    }
    for (const [id, levels, units, theme, sig, floor, most, locs] of CASES) {
      const type = typeOf(id);
      for (const loc of locs || LOCALES) {
        let s0;
        try { s0 = resolveStrings(id, loc, type); } catch (e) { continue; }
        for (const level of levels) for (const unit of units) {
          const s = withLevelInstruction(s0, id, level, loc);
          const seen = {};
          let v = 1; const r = makeRng(`variety|${id}|${loc}|${level}|${unit}`);
          for (let k = 0; k < 24; k++) {
            v += 1 + Math.floor(r.next() * 97);   // shell.js nextVariant
            let made;
            try { made = makePage({ type, strings: s, baseStrings: s, locale: loc, difficulty: level, theme, unit, variant: fault === 'saturate' ? 2 : v }); } catch (e) { fails.push(`${id} ${loc} L${level} ${unit || ''} copy ${v}: ${String(e.message).slice(0, 120)}`); continue; }
            pages++;
            const c = SIG[sig](made.html);
            seen[c] = (seen[c] || 0) + 1;
          }
          const n = Object.keys(seen).length, top = Math.max(0, ...Object.values(seen));
          if (n < floor || top > most) fails.push(`${id} ${loc} L${level}${unit ? ' ' + unit : ''}: ${n} different over 24 new versions (floor ${floor}), the commonest ${top} times (at most ${most})`);
        }
      }
    }
  } finally {
    SW.pickSentences = keep.pick; g381.build = keep381; k458.difficulty[2].totals = keepTotals;
  }
  return { fails, pages };
}

if (!POISON) {
  const { fails, pages } = run(null);
  fails.slice(0, process.argv.includes('--all') ? 1e6 : 30).forEach((f) => console.log('FAIL  ' + f));
  console.log(fails.length ? `copy variety: ${fails.length} problem(s)` : `copy variety: ${CASES.length} cases (sight-word pages in English, the rest in 11 languages), 24 new versions each (${pages} pages), and the sight-word draw for every word of 11 languages; all checks pass`);
  process.exit(fails.length ? 1 : 0);
} else {
  let bad = 0;
  const faults = ['saturate', 'by-length', 'fixed-rows', 'fixed-totals'];
  for (const f of faults) {
    const n = run(f).fails.length;
    console.log((n ? 'caught   ' : 'MISSED   ') + f + (n ? ` (${n} reports)` : ''));
    if (!n) bad++;
  }
  console.log(bad ? `${bad} planted fault(s) not caught` : `${faults.length} of ${faults.length} planted faults caught`);
  process.exit(bad ? 1 : 0);
}
