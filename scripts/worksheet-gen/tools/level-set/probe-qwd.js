// Node probe for the Question Words Level Set (no browser): every page × level × locale × seed builds its print, screen and
// key from ONE instance (meta identical), and the independent oracle agrees with every item's marked answer.
//   node tools/level-set/probe-qwd.js [locs=all] [seeds=1..6] [ONLY=id,id]
'use strict';
const { makeRng, instanceSeed } = require('../../lib/rng.js');
const LOCS = (process.argv[2] || 'en,de,es,fr,it,pt,nl,sv,da,no,fi').split(',');
const SEEDS = (process.argv[3] || '1,2,3,4,5,6').split(',').map(Number);
const ONLY = process.argv[4] ? process.argv[4].split(',') : null;
const TYPES = { 'G1-353': 'g1/G1-353-question-words.js', 'G1-373': 'g1/G1-373-question-words-match-the-question-to-the-answer.js', 'G1-374': 'g1/G1-374-question-words-fill-in-the-question-word.js',
  'G1-375': 'g1/G1-375-question-words-sort-the-answers-who-what-or-where.js', 'G2-356': 'g2/G2-356-question-words-write-the-question.js', 'G2-357': 'g2/G2-357-question-words-ask-about-the-picture-why-and-how.js' };
const unesc = (s) => String(s).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
function items(html, spec) {
  const out = [];
  const parts = html.split('<div data-lcs-item ').slice(1);
  for (const p of parts) {
    const tag = p.slice(0, p.indexOf('>'));
    const meta = {};
    for (const a of spec.interactive.metaAttrs) { const m = new RegExp(`${a}="([^"]*)"`).exec(tag); if (m) meta[a] = unesc(m[1]); }
    const options = [...p.matchAll(/data-lcs-opt="(\d+)" data-lcs-label="([^"]*)"( data-lcs-correct="1")?/g)].map((m) => ({ label: unesc(m[2]), correct: !!m[3] }));
    out.push({ meta, options });
  }
  return out;
}
let n = 0, bad = 0, ref = 0;
const refused = {};
for (const [id, f] of Object.entries(TYPES)) {
  if (ONLY && !ONLY.includes(id)) continue;
  const spec = require('../../types/' + f);
  for (const lv of [1, 2, 3]) for (const loc of LOCS) for (const sv of SEEDS) {
    const seed = instanceSeed({ typeId: spec.id, theme: null, difficulty: lv, seedEpoch: 1, variant: sv, unit: null });
    let p;
    try { p = spec.build({ theme: null, difficulty: lv, locale: loc }, { rng: makeRng(seed), variant: sv + 1, seedVariant: sv }); }
    catch (e) { ref++; const k = `${id} L${lv} ${loc}`; if (!refused[k]) { refused[k] = 1; console.log(`${k}: REFUSED ${e.message.slice(0, 160)}`); } continue; }
    n++;
    if (!spec.interactive) continue;
    try {
      const s = spec.build({ theme: null, difficulty: lv, locale: loc }, { rng: makeRng(seed), variant: sv + 1, seedVariant: sv, interactive: true });
      const k = spec.build({ theme: null, difficulty: lv, locale: loc }, { rng: makeRng(seed), variant: sv + 1, seedVariant: sv, answerKey: true });
      if (JSON.stringify(s.meta) !== JSON.stringify(p.meta) || JSON.stringify(k.meta) !== JSON.stringify(p.meta)) throw new Error('screen/key drew different content');
      const its = items(s.bodyHtml, spec);
      if (!its.length) throw new Error('0 screen items');
      const want = spec.interactive.oracle(its, loc);
      its.forEach((it, i) => {
        const c = it.options.findIndex((o) => o.correct);
        if (it.options.filter((o) => o.correct).length !== 1) throw new Error(`item ${i}: ${it.options.filter((o) => o.correct).length} marked answers`);
        if (want[i] !== c) throw new Error(`item ${i}: the oracle says ${want[i]} (${it.options[want[i]] && it.options[want[i]].label}), the screen marks ${c} (${it.options[c].label})`);
      });
    } catch (e) { bad++; console.log(`${id} L${lv} ${loc} s${sv}: ${e.message.slice(0, 260)}`); }
  }
}
console.log(`${n} built, ${bad} with findings, ${ref} refused`);
