#!/usr/bin/env node
/* =====================================================================
   apply-classification-strip.js — remove what the builder INVENTED.

   The operator, verbatim: "If they are not nouns, don't make up anything,
   they don't need plural or gender."

   This deletes fabrications; it never writes a word. Two operations, both
   driven by the image-derived classification SoT, both applied to all 11
   locales at once (the operator's rule: "all of the languages reflect the
   same images", so the picture decides once for everyone):

     !hasGender  -> DROP the gender element   ["Rot","Rot","m"] -> ["Rot","Rot"]
     !hasPlural  -> set p = s                 ["Wasser","Wassern"] -> ["Wasser","Wasser"]

   WHY THE SHAPE IS ARITY-2 AND NOT ARITY-1. `s === p` is the file's own
   documented "no plural" encoding, and arity-2 is ALREADY the shipped,
   tested en/fi shape — so nothing is invented and every consumer stays on
   a path it exercises. Arity-1 would make ImageVocab.plural() return
   undefined, and more-less.html / chart-count.html would render the literal
   string "undefined" into sr-only text read to children.

   THE ORIGIN OF THE DAMAGE. build-image-vocabulary.js:1404 already knew
   non-nouns take no plural, and stamped a gender on anyway:
       if (isNonNoun) entry[locale] = [singular, singular, gender];
   build-pww-index.js then HID it downstream (`noArticle:true`, "so the wall
   never speaks 'der Rot'"). The fabrication stayed in the source. This
   removes it at the source; the bandaid can then retire.

   🔴 BLOCKED KEYS ARE NEVER TOUCHED. 38 keys are LEMMA MISMATCHES — the
   word does not name the picture (singing = a MICROPHONE, butter = drawn as
   CHEESE, chess = a chess PIECE). Their classification describes the
   PICTURED OBJECT, not the label, so acting on it would pluralise the wrong
   word — the "Singen" -> "Singens" class, i.e. the next Gardinerar. They
   wait for the operator to rule: fix the WORD, or fix the ART.

   USAGE  node scripts/vocab-audit/apply-classification-strip.js            (dry-run)
          node scripts/vocab-audit/apply-classification-strip.js --apply
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO = path.join(__dirname, '..', '..');
const OUT = path.join(REPO, 'docs', 'audit-results', 'vocab-audit');
const REL = 'REFERENCE TRANSLATIONS/image-vocabulary.js';
const VOCAB = path.join(REPO, REL);

const GENDERED = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no'];
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

function loadVocab(src) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(src + '\n; __OUT = IMAGE_VOCABULARY;', ctx);
  return ctx.__OUT;
}

/* The file is hand-maintained canonical (NEVER regenerate it — the builder
   would delete 17 keys and revert ~378 shipped corrections). So edit the
   TEXT surgically, one key-line at a time, and never re-serialise the file. */
function rewriteKeyLine(src, key, newRow) {
  const re = new RegExp('^(\\s*)"' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '":\\s*\\{.*?\\},?\\s*$', 'm');
  const m = src.match(re);
  if (!m) return null;
  const indent = m[1];
  const parts = [];
  for (const l of ALL) {
    if (!newRow[l]) continue;
    parts.push('"' + l + '":[' + newRow[l].map((x) => JSON.stringify(x)).join(',') + ']');
  }
  const line = indent + '"' + key + '": {' + parts.join(',') + '}' + (/,\s*$/.test(m[0]) ? ',' : '');
  return src.replace(re, line.replace(/\$/g, '$$$$'));
}

function main() {
  const apply = process.argv.includes('--apply');
  const cPath = path.join(OUT, 'classification.json');
  if (!fs.existsSync(cPath)) { console.error('FAIL: no classification.json — run build-classification-sot.js first'); process.exit(1); }
  const cls = JSON.parse(fs.readFileSync(cPath, 'utf8')).rows;

  let src = fs.readFileSync(VOCAB, 'utf8');
  const vocab = loadVocab(src);

  const changes = [];
  const pluralPictureDeferred = [];
  let droppedG = 0, flattenedP = 0, blocked = 0, missed = [];

  for (const [key, row] of Object.entries(vocab)) {
    const c = cls[key];
    if (!c) continue;
    if (c.blocked) { blocked++; continue; }
    if (c.hasGender && c.hasPlural) continue;              /* ordinary noun — untouched */

    /* 🔴 PLURAL-PICTURE WITH s !== p — MECHANICALLY UNRESOLVABLE, HANDS OFF.
       The picture shows SEVERAL, so the label must be the PLURAL form. But
       which slot holds it is language-specific, and "flatten p onto s" is
       exactly backwards half the time:
           blocks  de ["Bauklotz","Bauklötze"]  s = the SINGULAR
                   -> p=s yields "Bauklotz": a picture of several blocks
                      labelled with the word for ONE. The de arc already
                      established this key should read Bauklötze — this
                      would have destroyed a known-correct finding.
           curtains da ["Gardiner","Gardinere"] s = the PLURAL, p invented
                   -> p=s is RIGHT here.
       And the direction differs BETWEEN LOCALES OF ONE KEY:
           sandals de ["Sandale","Sandalen"]   -> needs s := the plural
           sandals da ["Sandaler","Sandalere"] -> needs p := s
       No rule decides that. A native reads the picture and says which form
       is the label. 22 keys; they go to the per-locale waves. */
    if (c.category === 'plural-picture') {
      const mixed = ALL.some((l) => row[l] && row[l][0] !== row[l][1]);
      if (mixed) { pluralPictureDeferred.push(key); continue; }
      /* s === p everywhere: the label already IS the plural. Gender only. */
    }

    const next = {};
    let touched = false;
    for (const l of ALL) {
      const r = row[l];
      if (!r) continue;
      let s = r[0], p = r[1], g = r.length > 2 ? r[2] : null;

      if (!c.hasPlural && p !== s) { p = s; flattenedP++; touched = true; }
      if (!c.hasGender && GENDERED.indexOf(l) >= 0 && g !== null) { g = null; droppedG++; touched = true; }

      next[l] = g === null ? [s, p] : [s, p, g];
    }
    if (!touched) continue;
    changes.push({ key, category: c.category, before: row, after: next });
  }

  console.log('classification strip — ' + changes.length + ' keys change');
  console.log('   ' + droppedG + ' fabricated gender elements dropped (qualities + activities)');
  console.log('   ' + flattenedP + ' invented plurals flattened to s===p');
  console.log('   ' + blocked + ' keys SKIPPED as BLOCKED — the word does not name the picture;');
  console.log('        their classification describes the PICTURED OBJECT, so acting on it');
  console.log('        would pluralise the wrong word. Operator must rule first.');
  console.log('   ' + pluralPictureDeferred.length + ' plural-picture keys DEFERRED to the natives — the label must be the');
  console.log('        PLURAL form, but which slot holds it is language-specific and the');
  console.log('        direction differs even between locales of one key (blocks de needs');
  console.log('        s:=Bauklötze; curtains da needs p:=s). No rule decides that.');
  console.log('');
  for (const ch of changes.slice(0, 8)) {
    const l = ch.before.de ? 'de' : (ch.before.sv ? 'sv' : 'en');
    console.log('   ' + ch.key.padEnd(18) + ch.category.padEnd(16) + l + ': ' +
      JSON.stringify(ch.before[l]) + ' → ' + JSON.stringify(ch.after[l]));
  }
  if (changes.length > 8) console.log('   … +' + (changes.length - 8) + ' more');

  if (!apply) { console.log('\n(dry-run — nothing written; re-run with --apply)'); return; }

  for (const ch of changes) {
    const next = rewriteKeyLine(src, ch.key, ch.after);
    if (next === null) { missed.push(ch.key); continue; }
    src = next;
  }
  if (missed.length) {
    console.error('\nFAIL: could not locate ' + missed.length + ' key lines — REFUSING to write a partial strip:');
    missed.slice(0, 10).forEach((k) => console.error('   ' + k));
    process.exit(1);
  }

  /* prove the edit parses and moved exactly what we said before committing to disk */
  let after;
  try { after = loadVocab(src); }
  catch (e) { console.error('\nFAIL: the rewritten file does not parse — nothing written. ' + e.message); process.exit(1); }
  if (Object.keys(after).length !== Object.keys(vocab).length) {
    console.error('\nFAIL: key count changed ' + Object.keys(vocab).length + ' -> ' + Object.keys(after).length + ' — nothing written');
    process.exit(1);
  }

  fs.writeFileSync(VOCAB, src);
  console.log('\n→ wrote ' + REL);
  console.log('  now PROVE it:  node scripts/vocab-audit/check-row-coherence.js --all');
}
main();
