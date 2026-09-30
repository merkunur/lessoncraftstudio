/** Sight Words Level Set: write the titles + instructions of K-388..K-392 from data/literacy/sight-levelset/strings.json
 *  into i18n/strings.<loc>.json (round-trip-safe: 2-space JSON, each file's own line endings kept). Idempotent. */
'use strict';
const fs = require('fs');
const path = require('path');
const SRC = require('../../data/literacy/sight-levelset/strings.json');
const IDS = ['K-388', 'K-389', 'K-390', 'K-391', 'K-392'];
for (const loc of ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) {
  const p = path.join(__dirname, '..', '..', 'i18n', `strings.${loc}.json`);
  const raw = fs.readFileSync(p, 'utf8');
  const crlf = raw.includes('\r\n');
  const j = JSON.parse(raw);
  let changed = 0;
  for (const id of IDS) {
    const want = { title: SRC[loc][id].title, instruction: SRC[loc][id].instruction };
    if (JSON.stringify(j[id]) !== JSON.stringify(want)) { j[id] = want; changed++; }
  }
  let out = JSON.stringify(j, null, 2) + '\n';
  if (crlf) out = out.replace(/\n/g, '\r\n');
  if (changed) fs.writeFileSync(p, out);
  console.log(`${loc}: ${changed} set`);
}
