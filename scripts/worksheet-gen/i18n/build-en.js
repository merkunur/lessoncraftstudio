/**
 * Build i18n/strings.en.json from the 200 type specs' inline i18n.en blocks,
 * enforcing the per-band title-uniqueness lint: the deck-page title is
 * <type title> + theme + level (build-seo-head), and preband is skipped for
 * printables, so two specs in the same grade band (same level word) with the
 * same en title would collide on (language, titleHash) at publish. Zero
 * collisions is a build-time invariant here; publish's TITLE_NON_UNIQUE HALT
 * stays as backstop.
 *
 * Usage: node scripts/worksheet-gen/i18n/build-en.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { loadAllTypes } = require('../lib/load-types.js');

function buildEn() {
  const out = {};
  const byBandTitle = {};
  const unitTitled = new Set();   // unit-axis types whose title carries a unit token resolve to a DIFFERENT title per deck
  for (const spec of loadAllTypes()) {
    if (spec.unitAxis && spec.unitAxis.applicable && /\{(U|L|N|UNIT)\}/i.test(spec.i18n && spec.i18n.en && spec.i18n.en.title || '')) unitTitled.add(spec.id);
    if (!spec.i18n || !spec.i18n.en || !spec.i18n.en.title || !spec.i18n.en.instruction) {
      throw new Error('build-en: spec ' + spec.id + ' missing i18n.en {title, instruction}');
    }
    out[spec.id] = { title: spec.i18n.en.title, instruction: spec.i18n.en.instruction };
    const band = spec.id.split('-')[0];
    const key = band + '|' + spec.i18n.en.title.toLowerCase();
    (byBandTitle[key] = byBandTitle[key] || []).push(spec.id);
  }
  // two unit-axis types sharing a tokened title (K-393 / K-394 "Color by Number: {UNIT}", 2026-10-05) never share a
  // DECK title: the unit resolves per deck. Only token-free (or non-unit) collisions are defects.
  const dups = Object.entries(byBandTitle).filter(([, ids]) => ids.length > 1 && !ids.every((id) => unitTitled.has(id)));
  if (dups.length) {
    throw new Error('build-en: per-band title collisions (fix the spec titles):\n' +
      dups.map(([k, ids]) => '  ' + k + ' -> ' + ids.join(', ')).join('\n'));
  }
  return out;
}

if (require.main === module) {
  const out = buildEn();
  const dst = path.join(__dirname, 'strings.en.json');
  fs.writeFileSync(dst, JSON.stringify(out, null, 2) + '\n');
  console.log('build-en: ' + Object.keys(out).length + ' types -> ' + dst + ' (title lint clean)');
}

module.exports = { buildEn };
