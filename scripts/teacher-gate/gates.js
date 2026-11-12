#!/usr/bin/env node
/**
 * Gates of the Teacher-plan panel and of the pricing lines (Daily Teaching System, Part 11.2; PLAN.md Part 11).
 * Reads committed files only (the server runs it in deploy.sh): frontend/content/teacher-gate/ui.<loc>.json and
 * the units of each language.
 *
 *   node scripts/teacher-gate/gates.js            every language that has the strings
 *   node scripts/teacher-gate/gates.js --poison   also proves that each gate catches its fault
 *
 *   P1  strings     a language has exactly the strings of the English file (pricingHero may be absent: it is shown
 *                   only where it exists)
 *   P2  slots       every string carries exactly the placeholders of its English source
 *   P3  wording     no string says that anything is free (the plan is what is being sold; the free limits are named
 *                   by the pricing page itself, from lib/quota.ts)
 *   P4  prices      no string holds a price: prices come from config/lemonsqueezy-product-config.ts through {price}
 *                   and {monthly}
 *   P5  content     a language has the strings only when it has at least two live units: the panel and the pricing
 *                   lines name units, and every line is written in the plural
 */
'use strict';
const fs = require('fs');
const path = require('path');
const C = path.join(__dirname, '..', '..', 'frontend', 'content');
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const FREE = { en: /\bfree\b/i, de: /(?<!\p{L})(kostenlos\p{L}*|gratis|umsonst)(?!\p{L})/iu, sv: /(?<!\p{L})(gratis|kostnadsfri\p{L}*)(?!\p{L})/iu };
const OPTIONAL = new Set(['pricingHero']);
const slots = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join(' ');

function load() {
  const d = {};
  for (const f of fs.readdirSync(path.join(C, 'teacher-gate')).filter((x) => /^ui\.[a-z]{2}\.json$/.test(x))) {
    const loc = f.split('.')[1];
    const unitsFile = path.join(C, 'units', 'units.' + loc + '.json');
    d[loc] = { ui: readJson(path.join(C, 'teacher-gate', f)), liveUnits: fs.existsSync(unitsFile) ? readJson(unitsFile).units.filter((u) => u.status === 'live').length : 0 };
  }
  return d;
}

function run(d) {
  const fails = [];
  const fail = (g, m) => fails.push(g + '  ' + m);
  if (!d.en) { fail('P1', 'there is no English file'); return fails; }
  for (const [loc, L] of Object.entries(d)) {
    for (const k of Object.keys(d.en.ui)) if (!L.ui[k] && !OPTIONAL.has(k)) fail('P1', loc + ' ' + k + ' is missing');
    for (const k of Object.keys(L.ui)) if (!(k in d.en.ui) && !OPTIONAL.has(k)) fail('P1', loc + ' ' + k + ' is no string of the English file');
    for (const [k, v] of Object.entries(L.ui)) {
      const src = d.en.ui[k];
      if (src != null && slots(v) !== slots(src)) fail('P2', loc + ' ' + k + ' has the placeholders "' + slots(v) + '", its English source "' + slots(src) + '"');
      if (FREE[loc] && FREE[loc].test(v)) fail('P3', loc + ' ' + k + ' says that something is free');
      if (!FREE[loc]) fail('P3', loc + ': no wording rule for this language (add its words for "free" to FREE)');
      if (/\d+[.,]\d\d|\$|€|(?<!\{)\b69\b/.test(v)) fail('P4', loc + ' ' + k + ' holds a price');
    }
    if (L.liveUnits < 2) fail('P5', loc + ' has the strings but ' + L.liveUnits + ' live unit(s)');
  }
  return fails;
}

const POISONS = [
  ['a missing string', 'P1', (d) => { delete d.de.ui.seePlan; }],
  ['a string the English file does not have', 'P1', (d) => { d.sv.ui.extraLine = 'x'; }],
  ['a lost placeholder', 'P2', (d) => { d.de.ui.gives_units = d.de.ui.gives_units.replace('{n}', '24'); }],
  ['an English free claim', 'P3', (d) => { d.en.ui.planGives = 'The plan gives you, on top of everything free:'; }],
  ['a German free claim', 'P3', (d) => { d.de.ui.pricingLead += ' Kostenlos testen.'; }],
  ['a Swedish free claim', 'P3', (d) => { d.sv.ui.gives_downloads += ' Gratis.'; }],
  ['a price written into a string', 'P4', (d) => { d.en.ui.planPrice = '$69 a year, or $8.99 a month.'; }],
  ['strings for a language without units', 'P5', (d) => { d.fr = { ui: JSON.parse(JSON.stringify(d.en.ui)), liveUnits: 0 }; }],
];

if (require.main === module) {
  const fails = run(load());
  for (const f of fails) console.log('FAIL  ' + f);
  if (fails.length) { console.log(fails.length + ' problem(s)'); process.exit(1); }
  if (process.argv.includes('--poison')) {
    for (const [name, gate, breakIt] of POISONS) {
      const copy = load();
      breakIt(copy);
      if (!run(copy).some((f) => f.startsWith(gate + '  '))) { console.log('POISON NOT CAUGHT  ' + name + ' (' + gate + ')'); process.exit(1); }
    }
    console.log('teacher-plan panel: ' + POISONS.length + ' poisons, each caught by its gate');
  }
  console.log('teacher-plan panel: ' + Object.keys(load()).length + ' language(s); all gates pass');
}
module.exports = { run, load };
