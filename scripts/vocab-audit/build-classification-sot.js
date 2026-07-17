#!/usr/bin/env node
/* =====================================================================
   build-classification-sot.js — ONE classification per key, for all 11
   locales. The single source of truth that replaces three overlapping,
   disagreeing lists (raw._type, the builder's NON_NOUN_KEYS, and the
   PWW's NO_ARTICLE_THEMES/NO_ARTICLE_KEYS).

   THE OPERATOR'S RULE: "All of the languages reflect the same images. If
   an image is a noun it is a noun in all languages." The referent decides,
   and the referent is one picture. So: decided once, applied to eleven.

   HOW EACH KEY GETS ITS CLASSIFICATION — two sources, no guessing:

   1. THE 193 AMBIGUOUS KEYS (en[0] === en[1]) — from classify/verdict-*.json,
      where a reviewer OPENED THE IMAGE for every one. Not derived here.

   2. THE ~1070 REST (en[0] !== en[1]) — `countable-thing`. This is the one
      inference in the file, and it is safe in the direction that matters:
      English having a DISTINCT plural proves the picture is one countable
      thing, so a noun with a plural. It cannot be a quality or an activity
      (there is no "reds", no "swimmings"). What it does NOT prove is the
      per-locale plural FORM — that is the natives' job, not this file's.
      These keys are marked `image_checked: false`: nobody has looked at
      their pictures, and the 193 came back with a 20% LEMMA MISMATCH rate.
      Do not read their absence from the mismatch list as a clean bill.

   🔴 THE SEQUENCING RULE — why `blocked` exists.
   38 of the 193 are LEMMA MISMATCHES: the word does not name the picture
   (singing = a MICROPHONE, butter = drawn as CHEESE, chess = a chess PIECE,
   dice = ONE die). For those, `hasPlural` describes the PICTURED OBJECT
   (Mikrofon -> Mikrofone), NOT the current label. Applying it would
   pluralise "Singen" and manufacture exactly the garbage this arc exists to
   delete — the next Gardinerar.

   So they are BLOCKED. No plural or gender work touches them until the
   operator rules on each: fix the WORD, or fix the ART. That is a content
   decision with a cost, and it is not mine to make silently.

   This is the answer to why the arc kept failing: twelve native reviewers
   and an adversarial pass argued about the plural of the WRONG WORD.

   USAGE  node scripts/vocab-audit/build-classification-sot.js
   READ-ONLY apart from docs/audit-results/vocab-audit/classification.json
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO = path.join(__dirname, '..', '..');
const OUT = path.join(REPO, 'docs', 'audit-results', 'vocab-audit');
const VOCAB = path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js');

/* the category table from BRIEF-classification.md. The two axes are
   INDEPENDENT and that is the point: a proper noun IS a noun — die Venus,
   la Terre — so it keeps a gender and merely has no plural. (The de arc
   already corrected venus der->die, so that gender is real and rendered.)
   ONLY qualities and activities lose the gender. */
const CATEGORY = {
  'countable-thing': { hasGender: true, hasPlural: true },
  'plural-picture': { hasGender: true, hasPlural: false },
  mass: { hasGender: true, hasPlural: false },
  abstract: { hasGender: true, hasPlural: false },
  'proper-noun': { hasGender: true, hasPlural: false },
  adjective: { hasGender: false, hasPlural: false },
  activity: { hasGender: false, hasPlural: false },
};

function loadVocab() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(VOCAB, 'utf8') + '\n; __OUT = IMAGE_VOCABULARY;', ctx);
  return ctx.__OUT;
}

function main() {
  const vocab = loadVocab();
  const dossier = JSON.parse(fs.readFileSync(path.join(OUT, 'classification-dossier.json'), 'utf8'));
  const dos = {}; for (const r of dossier.rows) dos[r.key] = r;

  /* the image-based verdicts */
  const verdicts = {};
  const cdir = path.join(OUT, 'classify');
  for (const f of fs.readdirSync(cdir).filter((x) => /^verdict-\d+\.json$/.test(x))) {
    for (const r of JSON.parse(fs.readFileSync(path.join(cdir, f), 'utf8')).rows) verdicts[r.key] = r;
  }

  const rows = {};
  const stats = { total: 0, from_verdict: 0, inferred: 0, blocked: 0, no_gender: 0, no_plural: 0, unknown_cat: [] };

  for (const key of Object.keys(vocab)) {
    const d = dos[key];
    const v = verdicts[key];
    stats.total++;

    let category, source, imageChecked, imageSeen = null, reason, blocked = false, blockReason = null;

    if (v) {
      category = v.category;
      source = 'image-verdict';
      imageChecked = !!v.image_seen;
      imageSeen = v.image_seen || null;
      reason = v.reason || '';
      stats.from_verdict++;
      /* THE SEQUENCING GUARD */
      if (/LEMMA MISMATCH/i.test(reason)) {
        blocked = true;
        blockReason = 'LEMMA MISMATCH — the word does not name the picture. hasPlural/hasGender below describe the PICTURED OBJECT, not this label. Applying them would pluralise a wrong word (the "Singen"->"Singens" class). Operator must rule: fix the WORD or fix the ART.';
        stats.blocked++;
      }
    } else {
      /* the safe inference — see the header */
      category = 'countable-thing';
      source = 'inferred-from-en-distinct-plural';
      imageChecked = false;
      reason = 'en has a DISTINCT plural (' + JSON.stringify(d && d.en) + '), which proves the picture is one countable thing: a noun, with a plural. The per-locale plural FORM is not decided here. NOT image-checked — the 193 that were came back 20% LEMMA MISMATCH.';
      stats.inferred++;
    }

    const axes = CATEGORY[category];
    if (!axes) { stats.unknown_cat.push(key + ' -> ' + category); continue; }
    if (!axes.hasGender) stats.no_gender++;
    if (!axes.hasPlural) stats.no_plural++;

    rows[key] = {
      category,
      hasGender: axes.hasGender,
      hasPlural: axes.hasPlural,
      blocked,
      block_reason: blockReason,
      source,
      image_checked: imageChecked,
      image_seen: imageSeen,
      reason,
      no_image: d ? d.no_image : null,
    };
  }

  if (stats.unknown_cat.length) {
    console.error('FAIL: unknown category on ' + stats.unknown_cat.length + ' keys — the verdict schema drifted from the brief:');
    stats.unknown_cat.slice(0, 10).forEach((x) => console.error('   ' + x));
    process.exit(1);
  }

  fs.writeFileSync(path.join(OUT, 'classification.json'),
    JSON.stringify({ v: 1, rule: 'ONE classification per key, applied to all 11 locales (the operator: "all of the languages reflect the same images")', rows }, null, 1) + '\n');

  console.log('classification SoT: ' + stats.total + ' keys');
  console.log('   ' + stats.from_verdict + ' from an image-opened verdict');
  console.log('   ' + stats.inferred + ' inferred countable-thing (en has a distinct plural) — NOT image-checked');
  console.log('');
  console.log('   ' + stats.no_gender + ' lose the gender element entirely (qualities + activities)');
  console.log('   ' + stats.no_plural + ' have no plural (incl. mass/abstract/proper/plural-picture)');
  console.log('   🔴 ' + stats.blocked + ' BLOCKED — the word does not name the picture.');
  console.log('        No plural or gender work may touch these until the operator rules');
  console.log('        on each: fix the WORD, or fix the ART.');
  console.log('\n→ docs/audit-results/vocab-audit/classification.json');
}
main();
