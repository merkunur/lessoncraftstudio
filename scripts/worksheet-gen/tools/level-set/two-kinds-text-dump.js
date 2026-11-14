#!/usr/bin/env node
/**
 * Every sentence K-643 Two Kinds Together can print, for a native and teaching review (Year pages Z, 2026-11-14): per
 * language the title and instructions, then for every thing on every theme two stories that together use all four
 * color words (red + yellow, blue + green), each frame of the language in turn.
 *
 *   node tools/level-set/two-kinds-text-dump.js [--locales=en,de] > out/two-kinds-text.txt
 */
'use strict';
const W = require('../../lib/word-problems-levelset.js');
const KF = require('../../data/word-problems/kinds-frames.json');
const S = (loc) => require('../../i18n/strings.' + loc + '.json')['K-643'];
const LI = require('../../i18n/level-instructions.json')['K-643'];
const { thingsFor, colorWord, framesFor, THINGS, THING_COLORS } = require('../../types/_shared/two-kinds.js');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=')[1] : d; };
const LOCALES = arg('locales', 'en,de,es,pt,fr,it,nl,sv,da,no,fi').split(',');
for (const L of LOCALES) {
  const s = S(L);
  console.log(`\n=== ${L} ===\nTITLE: ${s.title}\nINSTRUCTION (levels 1-2): ${s.instruction}\nINSTRUCTION (level 3, the child draws): ${LI[3][L]}`);
  const names = W.namesFor(L);
  const seen = new Set();
  let f = 0, nm = 0;
  for (const theme of Object.keys(THINGS)) {
    for (const t of thingsFor(theme, L)) {
      if (seen.has(t.noun)) continue;
      seen.add(t.noun);
      const frames = framesFor(L, t.noun), cs = THING_COLORS[t.noun] || ['red', 'yellow', 'blue', 'green'];
      const verb = KF[L].verbs ? Object.entries(KF[L].verbs).find(([, l]) => l.split(' ').includes(t.noun))[0] : null;
      for (const [c1, c2, n1, n2] of [[cs[0], cs[1], 3, 5], [cs[2], cs[3] || cs[0], 4, 2]]) {
        const tpl = frames[f++ % frames.length].s.replace(/{verb}/g, verb);
        let txt = W.fill(tpl.replace('{c1}', '\u0001').replace('{c2}', '\u0002'), { name: names[nm % names.length], name2: names[(nm + 1) % names.length], n1, n2, noun: t.text, gender: t.gender }, L);
        nm++;
        txt = txt.replace('\u0001', colorWord(L, c1, t.gender)).replace('\u0002', colorWord(L, c2, t.gender));
        console.log(`[${t.noun}] ${txt}`);
      }
    }
  }
}
