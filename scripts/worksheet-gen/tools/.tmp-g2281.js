'use strict';
const { loadType } = require('../lib/load-types.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const wave = require('../waves/wave-b2var-fr.json');
(async () => {
  const t = loadType('G2-281'); const th = (wave.themeOverrides || {})['G2-281'] || null;
  const NAMES = /\b(louis|inès|ines|emma|léa|lea|jules|chloé|chloe|anna|max|mia|ben|tom|lily)\b/i;
  let lanes = new Set(), withName = 0, qv = 0, pv = 0;
  for (let v = 0; v < 30; v++) {
    const rng = makeRng(instanceSeed({ typeId: 'G2-281', theme: th, difficulty: 2, seedEpoch: 1, variant: v }));
    const b = await t.build({ theme: th, difficulty: 2, locale: 'fr' }, { rng });
    const txt = b.bodyHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    lanes.add((b.bodyHtml.match(/data-lcs-item/g) || []).length);
    if (NAMES.test(txt)) withName++;
    // the target end mark rides in a data attribute or the answer; count interrogative openers
    const q = (txt.match(/\b(est-ce que|peux-tu|où|combien|quel|quelle|qui|pourquoi|as-tu|vois-tu)\b/gi) || []).length;
    if (q) qv++; else pv++;
    if (v < 3) console.log('v' + v + ': ' + txt.slice(0, 190));
  }
  console.log('\nlanes:', [...lanes].join(','), '| variants containing a first name:', withName + '/30',
              '| variants with an interrogative opener:', qv + '/30', '| without:', pv + '/30');
})();
