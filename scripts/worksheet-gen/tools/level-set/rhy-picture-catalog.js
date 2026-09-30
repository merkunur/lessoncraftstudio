/**
 * Rhyming Words Level Set — the picture catalogue a native panel authors from.
 *   node tools/level-set/rhy-picture-catalog.js <outDir>
 * Writes <outDir>/catalog-<loc>.json: every COLOUR picture in the cached library (numbered B&W folders like
 * "animals bw 2" excluded — the shared picture index lets those through) with the locale's vocabulary word, plus the
 * vocabKeys the published rhyme bank already owns (a new class may not reuse them).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { pictureIndex } = require('../../lib/b3-picture-index.js');
const { excluded } = require('../../lib/b2-common.js');
const { loadVocab } = require('../../../publish-cli/deck-rich-alt.js');
const { bank } = require('../../lib/b3-common.js');

const OUT = process.argv[2];
if (!OUT) throw new Error('usage: rhy-picture-catalog.js <outDir>');
fs.mkdirSync(OUT, { recursive: true });
const BW = /\b(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s\d+)?$/i;
const vocab = loadVocab();
const idx = pictureIndex();
for (const loc of ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) {
  const b = bank('rhyming-words', loc);
  const owned = new Set();
  for (const c of b.classes) for (const m of [...c.members, ...(c.nearMiss || [])]) owned.add(m.vocabKey);
  const pictures = [];
  for (const [key, list] of idx) {
    if (excluded(key, loc)) continue;
    const e = vocab[key] && vocab[key][loc];
    if (!e || !e[0]) continue;
    const pics = list.filter((p) => !BW.test(p.theme)).map((p) => `${p.theme}/${p.noun}`);
    if (!pics.length) continue;
    pictures.push({ vocabKey: key, word: e[0], plural: e[1] || '', gender: e[2] || null, pics, inPublishedBank: owned.has(key) });
  }
  pictures.sort((a, b) => a.word.localeCompare(b.word, loc));
  fs.writeFileSync(path.join(OUT, `catalog-${loc}.json`), JSON.stringify({ locale: loc, count: pictures.length, pictures }, null, 1));
  console.log(loc, pictures.length, 'pictures,', owned.size, 'keys already in the published bank');
}
