#!/usr/bin/env node
/**
 * apply-lit-loc.js — surgical merge of the literacy native-ensemble drafts
 * (.lit-loc-<locale>.json) into the live i18n artifacts. SURGICAL (adds only the
 * 15 literacy types + 5 literacy family keys; never disturbs existing entries) —
 * the science-fan /tmp/apply-sci-loc.js pattern, NOT the all-or-nothing
 * apply-locale.js.
 *
 *   node scripts/worksheet-gen/i18n/apply-lit-loc.js
 *
 * Per non-EN locale draft → merges into:
 *   i18n/strings.<locale>.json                 (15 {title,instruction})
 *   i18n/skill-sentences.<locale>.json         (5 {full,short})
 *   frontend/config/topics-taxonomy.json       (5 fam slug/name.<locale>; collision-checked)
 *   data/literacy/category-vocab.json          (bins[].label.<locale>)
 *   data/literacy/letter-knowledge.json        (vcLabels.{vowels,consonants}.<locale>)
 * Also writes the 15 EN strings into i18n/strings.en.json (from the EN payload).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const I18N = __dirname;
const ROOT = path.join(I18N, '..', '..', '..');
const DATA = path.join(I18N, '..', 'data', 'literacy');
const LOCALES = ['de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const FAMS = ['beginning-sounds', 'letter-knowledge', 'word-building', 'picture-vocabulary', 'phonological-awareness'];
const TYPE_IDS = ['K-221', 'K-222', 'K-223', 'K-224', 'K-225', 'K-226', 'K-227', 'K-228', 'K-229', 'K-230', 'K-231', 'K-232', 'K-233', 'K-234', 'K-235'];
const rJ = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const wJ = (p, o) => fs.writeFileSync(p, JSON.stringify(o, null, 2) + '\n');

// --- EN strings into strings.en.json (from the EN payload) ---
const payload = rJ(path.join(I18N, '.lit-en-payload.json'));
const enStrings = rJ(path.join(I18N, 'strings.en.json'));
for (const id of TYPE_IDS) enStrings[id] = payload.strings[id];
wJ(path.join(I18N, 'strings.en.json'), enStrings);
console.log('strings.en.json: +' + TYPE_IDS.length + ' literacy types');

const taxPath = path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json');
const tax = rJ(taxPath);
const axis = tax.axes['exercise-type'];
const catPath = path.join(DATA, 'category-vocab.json');
const cat = rJ(catPath);
const lkPath = path.join(DATA, 'letter-knowledge.json');
const lk = rJ(lkPath);
lk.vcLabels = lk.vcLabels || { vowels: {}, consonants: {} };

for (const loc of LOCALES) {
  const draftPath = path.join(I18N, '.lit-loc-' + loc + '.json');
  if (!fs.existsSync(draftPath)) { console.error('MISSING draft: ' + loc); process.exit(2); }
  const d = rJ(draftPath);
  // validate
  const missS = TYPE_IDS.filter((id) => !d.strings || !d.strings[id] || !d.strings[id].title || !d.strings[id].instruction);
  if (missS.length) { console.error(loc + ': strings missing ' + missS.join(',')); process.exit(2); }
  const missF = FAMS.filter((f) => !d.skillSentences || !d.skillSentences[f] || !d.taxonomy || !d.taxonomy[f] || !d.taxonomy[f].slug || !d.taxonomy[f].name);
  if (missF.length) { console.error(loc + ': families missing ' + missF.join(',')); process.exit(2); }
  if (!d.categoryLabels || !d.categoryLabels.Animals || !d.categoryLabels.Fruits || !d.categoryLabels.Vehicles) { console.error(loc + ': categoryLabels incomplete'); process.exit(2); }
  if (!d.vcLabels || !d.vcLabels.vowels || !d.vcLabels.consonants) { console.error(loc + ': vcLabels incomplete'); process.exit(2); }

  // strings.<locale>.json (merge, preserve existing)
  const sp = path.join(I18N, 'strings.' + loc + '.json');
  const s = rJ(sp);
  for (const id of TYPE_IDS) s[id] = { title: d.strings[id].title, instruction: d.strings[id].instruction };
  wJ(sp, s);

  // skill-sentences.<locale>.json
  const skp = path.join(I18N, 'skill-sentences.' + loc + '.json');
  const sk = fs.existsSync(skp) ? rJ(skp) : {};
  for (const f of FAMS) sk[f] = { full: d.skillSentences[f].full, short: d.skillSentences[f].short };
  wJ(skp, sk);

  // taxonomy slug/name.<locale> (collision-checked against other axis keys in this locale)
  const owner = {};
  for (const [key, e] of Object.entries(axis)) { const sl = e.slug && e.slug[loc]; if (sl) owner[sl] = key; }
  for (const f of FAMS) {
    const want = d.taxonomy[f];
    if (owner[want.slug] && owner[want.slug] !== f) { console.error(loc + ': slug collision ' + f + ' wants "' + want.slug + '" owned by ' + owner[want.slug]); process.exit(2); }
    owner[want.slug] = f;
    if (!axis[f]) { console.error('taxonomy missing family ' + f); process.exit(2); }
    axis[f].slug[loc] = want.slug;
    axis[f].name[loc] = want.name;
  }

  // category bin labels + vc labels (shared files, accumulate)
  const catMap = { Animals: d.categoryLabels.Animals, Fruits: d.categoryLabels.Fruits, Vehicles: d.categoryLabels.Vehicles };
  for (const bin of cat.bins) if (catMap[bin.key]) bin.label[loc] = catMap[bin.key];
  lk.vcLabels.vowels[loc] = d.vcLabels.vowels;
  lk.vcLabels.consonants[loc] = d.vcLabels.consonants;

  console.log(loc + ': strings 15, skill 5, taxonomy 5 (' + FAMS.map((f) => d.taxonomy[f].slug).join(',') + '), cat 3, vc 2');
}

wJ(taxPath, tax);
wJ(catPath, cat);
wJ(lkPath, lk);
console.log('\nDONE — applied 10 locales + EN strings. taxonomy + category-vocab + letter-knowledge updated.');
