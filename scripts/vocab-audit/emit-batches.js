#!/usr/bin/env node
/* =====================================================================
   emit-batches.js — cut the dossier into native-review batches.

   The operator's directive is "analyze each word one by one", so EVERY
   key ships to a native — the nets only ride along as a prior. §A.13.58
   layer 4 is explicit that the confirm set is the BOUNDED SET, never a
   hand-picked subset: reviewing only the flagged keys would inherit the
   nets' blind spots (and the nets are already proven fallible — they
   cannot see de/nl cross-locale at all, and `_countable` mislabels de
   `Brot`, whose plural `die Brote` is correct).

   Each row carries what a linguist actually needs to rule:
     · key + THEMES  — the disambiguator. `orange` is [colors, fruits];
                       `pepper` is [at_the_supermarket, vegetables] and
                       currently reads ["Paprika","Pfeffer"] — the bell
                       pepper and the black pepper, in one entry.
     · en            — the gloss: what the picture actually shows.
     · de            — [singular, plural, gender] under review.
     · type/countable— raw metadata as EVIDENCE, never a verdict.
     · nets          — why we suspect it, if we do.
     · noImage       — no file resolves to this key: dead data, lowest
                       value (flag, don't spend expert attention).

   USAGE  node scripts/vocab-audit/emit-batches.js --locale=de [--size=110]
   READ-ONLY apart from docs/audit-results/vocab-audit/batches/.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..');
const OUT = path.join(REPO, 'docs', 'audit-results', 'vocab-audit');
const BATCH_DIR = path.join(OUT, 'batches');

function main() {
  const argv = process.argv.slice(2);
  const get = (n, d) => { const a = argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=')[1] : d; };
  const loc = get('locale', 'de');
  const size = parseInt(get('size', '110'), 10);

  const D = JSON.parse(fs.readFileSync(path.join(OUT, 'dossier.json'), 'utf8'));
  const N = JSON.parse(fs.readFileSync(path.join(OUT, 'nets.json'), 'utf8'));
  const flags = (N.nets[loc] && N.nets[loc].flags) || {};

  const rows = D.rows.map((r) => {
    const L = r.loc[loc];
    const row = {
      key: r.key,
      themes: r.themes,
      en: [r.loc.en.s, r.loc.en.p],
      cur: { s: L.s, p: L.p, g: L.g },
      type: r.type,
      countable: r.countable,
    };
    if (flags[r.key]) row.nets = flags[r.key];
    if (!r.themes.length) row.noImage = true;
    return row;
  });

  fs.mkdirSync(BATCH_DIR, { recursive: true });
  /* stable alphabetical order → deterministic, resumable, and a
     reviewer can see coverage at a glance */
  const batches = [];
  for (let i = 0; i < rows.length; i += size) batches.push(rows.slice(i, i + size));

  for (let i = 0; i < batches.length; i++) {
    const id = String(i + 1).padStart(2, '0');
    const f = path.join(BATCH_DIR, loc + '-' + id + '.json');
    fs.writeFileSync(f, JSON.stringify({
      locale: loc, batch: id, of: batches.length,
      genderLegend: D.genderLegend[loc],
      count: batches[i].length,
      range: [batches[i][0].key, batches[i][batches[i].length - 1].key],
      rows: batches[i],
    }, null, 1) + '\n');
  }
  console.log(loc + ': ' + rows.length + ' keys → ' + batches.length + ' batches of ≤' + size);
  console.log('  flagged by nets: ' + rows.filter((r) => r.nets).length + '   dead (no image): ' + rows.filter((r) => r.noImage).length);
  console.log('  legend: ' + D.genderLegend[loc]);
  for (let i = 0; i < batches.length; i++) {
    console.log('   ' + loc + '-' + String(i + 1).padStart(2, '0') + '  ' + String(batches[i].length).padStart(3) +
      ' keys  ' + batches[i][0].key + ' … ' + batches[i][batches[i].length - 1].key);
  }
  console.log('→ ' + path.relative(REPO, BATCH_DIR));
}
main();
