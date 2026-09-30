// The 66 published Reading Comprehension pages (G2-254 + G2-269..273, level 2, no copy) must build byte-identical to
// HEAD: the spec at HEAD is loaded beside the working one and both bodies are compared for every locale.
//   node tools/level-set/rcm-published-identity.js [--ref=HEAD]
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { makeRng } = require('../../lib/rng.js');
const REF = (process.argv.find((a) => a.startsWith('--ref=')) || '--ref=HEAD').slice(6);
const DIR = path.join(__dirname, '..', '..', 'types', 'g2');
const tmp = path.join(DIR, '_head-G2-254.js');
fs.writeFileSync(tmp, execSync(`git show ${REF}:scripts/worksheet-gen/types/g2/G2-254-reading-comprehension.js`, { cwd: DIR }).toString());
const faces = { 'G2-254': null, 'G2-269': 3, 'G2-270': 4, 'G2-271': 5, 'G2-272': 6, 'G2-273': 7 };
let n = 0, diff = 0;
try {
  const head = require(tmp), now = require('../../types/g2/G2-254-reading-comprehension.js');
  for (const [id, idx] of Object.entries(faces)) {
    const d = idx == null ? null : { 1: { idx }, 2: { idx }, 3: { idx } };
    const a = { ...head, id, ...(d ? { difficulty: d } : {}) }, b = { ...now, id, ...(d ? { difficulty: d } : {}) };
    for (const loc of ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) {
      const x = a.build({ difficulty: 2, locale: loc }, { rng: makeRng('x') });
      const y = b.build({ difficulty: 2, locale: loc }, { rng: makeRng('x') });
      n++;
      if (x.bodyHtml !== y.bodyHtml || JSON.stringify(x.meta) !== JSON.stringify(y.meta)) { diff++; console.log(`${id} ${loc}: DIFFERS`); }
    }
  }
} finally { fs.unlinkSync(tmp); }
console.log(`${n} published pages compared with ${REF}, ${diff} differ`);
process.exit(diff ? 1 : 0);
