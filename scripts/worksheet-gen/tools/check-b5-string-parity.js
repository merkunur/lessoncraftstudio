#!/usr/bin/env node
/**
 * check-b5-string-parity.js [--fix-list]
 *
 * WHY THIS EXISTS. A b5 family keeps its per-face title + instruction in TWO places:
 *   · `data/b5/locales/<family>.<loc>.json` -> `strings.<mode>.{title,instruction}`
 *     — what every `qa/verify-b5-<family>.js` reads and asserts on, and
 *   · `i18n/strings.<loc>.json` -> `<ID>.{title,instruction}`
 *     — what the generator actually PRINTS on the page and stamps into the manifest.
 *
 * `tools/apply-b5-locale.js` writes both from one draft, so they agree at apply time. A later
 * hand-edit to a bank (a panel finding, a length cap) touches only the first, the family gate
 * goes green on a string no child will ever see, and the deck ships the old wording.
 * MEASURED on 2026-09-22: the corrected fr + it possessive instructions and the nl `meer dan
 * één` title all passed their family gates while the rendered deck.html still printed the old
 * text. The rule is therefore: every bank string must appear verbatim in the built i18n.
 *
 * Non-vacuity: it refuses to report success unless it read at least 10 banks per locale and a
 * non-empty string table per locale, so a bad path cannot pass as "0 divergences".
 */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const LOCS = ['de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];   // en strings live in the spec
const BANK_DIR = path.join(ROOT, 'data/b5/locales');

let divergences = 0, banksRead = 0, checked = 0;
const fixList = [];
for (const loc of LOCS) {
  const sp = path.join(ROOT, 'i18n', `strings.${loc}.json`);
  if (!fs.existsSync(sp)) { console.error(`MISSING ${sp}`); process.exit(1); }
  const S = JSON.parse(fs.readFileSync(sp, 'utf8'));
  const keys = Object.keys(S);
  if (keys.length < 100) { console.error(`VACUOUS: strings.${loc}.json holds only ${keys.length} ids`); process.exit(1); }
  // every title / instruction the built table offers, per id
  const haveTitle = new Map(), haveInstr = new Map();
  for (const id of keys) {
    const v = S[id];
    if (!v || typeof v !== 'object') continue;
    if (typeof v.title === 'string') haveTitle.set(v.title, id);
    if (typeof v.instruction === 'string') haveInstr.set(v.instruction, id);
  }
  let nBanks = 0;
  for (const f of fs.readdirSync(BANK_DIR)) {
    if (!f.endsWith(`.${loc}.json`)) continue;
    const fam = f.slice(0, -(`.${loc}.json`).length);
    const B = JSON.parse(fs.readFileSync(path.join(BANK_DIR, f), 'utf8'));
    if (!B.strings || typeof B.strings !== 'object') continue;
    nBanks++;
    for (const [mode, s] of Object.entries(B.strings)) {
      if (!s || typeof s !== 'object') continue;
      for (const [field, have] of [['title', haveTitle], ['instruction', haveInstr]]) {
        const val = s[field];
        if (typeof val !== 'string' || !val.trim()) continue;
        checked++;
        if (!have.has(val)) {
          divergences++;
          fixList.push({ loc, fam, mode, field, want: val });
          console.log(`DIVERGENT ${loc} ${fam}.${mode}.${field}`);
          console.log(`   bank : ${val}`);
        }
      }
    }
  }
  // a locale whose panel has not been applied yet has 0 banks: skipped, unless --all (the release run) demands every locale.
  if (nBanks === 0 && !process.argv.includes('--all')) { console.log(`skip ${loc}: not applied yet`); continue; }
  if (nBanks < 9) { console.error(`VACUOUS: only ${nBanks} banks read for ${loc}`); process.exit(1); }   // 9 = digraphs refused whole-family (es it sv da no)
  banksRead += nBanks;
}
console.log(`\n${checked} bank strings checked across ${banksRead} banks; ${divergences} not present in the built i18n`);
if (process.argv.includes('--fix-list')) fs.writeFileSync(path.join(ROOT, 'out/_string-parity.json'), JSON.stringify(fixList, null, 1));
process.exit(divergences ? 1 : 0);
