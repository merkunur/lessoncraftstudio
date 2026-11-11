#!/usr/bin/env node
/**
 * Gates of the "For schools" page (Daily Teaching System, Part 6; PLAN §11 ruling 6).
 *
 *   node scripts/schools/gates.js            every language that has frontend/content/schools/ui.<loc>.json
 *   node scripts/schools/gates.js --poison   also proves that each gate catches its fault
 *
 *   S1  a language's strings are exactly the English keys (a missing key renders an empty heading or button)
 *   S2  no string says free (the free tier is limited; CLAUDE.md §25 ruling on visible copy)
 *   S3  no string holds a price or a currency: the price is on the pricing page and in the operator's quote
 *   S4  the plan is named through {plan} (the pricing page's own name), never by a plan name that does not exist
 *   S5  status is "live" or "pilot"; every sentence that is shown is non-empty
 *   S6  the page promises nothing about student data beyond "no account or email address" (class results, Part 9,
 *       store results once they are switched on: a sentence such as "we collect no student data" would turn false)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', '..', 'frontend', 'content', 'schools');
const FREE = { en: /\bfree\b/i, de: /\b(kostenlos|gratis|umsonst|kostenfrei)\b/i, sv: /\b(gratis|kostnadsfri\w*)\b/i, es: /\b(gratis|gratuit\w*)\b/i, fr: /\b(gratuit\w*)\b/i, pt: /\b(gr[aá]tis|gratuit\w*)\b/i, it: /\b(gratis|gratuit\w*)\b/i, nl: /\b(gratis|kosteloos)\b/i, da: /\b(gratis)\b/i, no: /\b(gratis)\b/i, fi: /(ilmai\w*|maksut\w*)/i };
const PRICE = /[$€£]|\b(USD|EUR|GBP|SEK|NOK|DKK|MXN|BRL)\b|\b\d+[.,]\d{2}\b/;
const PLAN_NAMES = /\b(Premium|Pro|Plus|Basic|Enterprise|School plan|Site license)\b/;
const NO_DATA = /\b(no|never|not)\b[^.]{0,40}\b(student|pupil|child\w*)\s+data\b|\bcollect(s)? no\b/i;

function load() {
  const out = {};
  for (const f of fs.readdirSync(DIR)) { const m = /^ui\.([a-z]{2})\.json$/.exec(f); if (m) out[m[1]] = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')); }
  return out;
}

function run(d) {
  const fails = [];
  const fail = (g, m) => fails.push(g + '  ' + m);
  const en = d.en;
  if (!en) { fail('S1', 'there is no English strings file'); return fails; }
  for (const [loc, ui] of Object.entries(d)) {
    for (const k of Object.keys(en)) if (!(k in ui)) fail('S1', loc + ': the key ' + k + ' is missing');
    for (const k of Object.keys(ui)) if (!(k in en)) fail('S1', loc + ': the key ' + k + ' is no key of the page');
    if (ui.status !== 'live' && ui.status !== 'pilot') fail('S5', loc + ': status is "' + ui.status + '"');
    for (const [k, v] of Object.entries(ui)) {
      if (k === 'status') continue;
      if (typeof v !== 'string' || !v.trim()) { fail('S5', loc + ' ' + k + ' is empty'); continue; }
      if (FREE[loc] && FREE[loc].test(v)) fail('S2', loc + ' ' + k + ' says free');
      if (PRICE.test(v)) fail('S3', loc + ' ' + k + ' holds a price or a currency');
      if (PLAN_NAMES.test(v)) fail('S4', loc + ' ' + k + ' names a plan that does not exist');
      if (loc === 'en' && NO_DATA.test(v)) fail('S6', loc + ' ' + k + ' promises that no student data is collected');
    }
    for (const k of ['lead', 'planTitle', 'planLead', 'howStep4', 'planOneLink']) if (ui[k] && !ui[k].includes('{plan}')) fail('S4', loc + ' ' + k + ' does not name the plan through {plan}');
  }
  return fails;
}

const POISONS = [
  ['a missing key', 'S1', (d) => { delete d.en.howStep3; d.xx = Object.assign({}, d.en); d.en.howStep3 = 'x'; }],
  ['a key the page does not have', 'S1', (d) => { d.xx = Object.assign({}, d.en, { extra: 'x' }); }],
  ['a string that says free', 'S2', (d) => { d.en.lead += ' Try it free.'; }],
  ['a price', 'S3', (d) => { d.en.planOne = 'The plan is $69 per year.'; }],
  ['a plan that does not exist', 'S4', (d) => { d.en.planLead = 'The Premium plan is one account per teacher. {plan}'; }],
  ['a plan named by hand', 'S4', (d) => { d.en.howStep4 = 'When the invoice is paid, we turn on the Teacher plan.'; }],
  ['an empty sentence', 'S5', (d) => { d.en.formLead = ' '; }],
  ['a status that is none', 'S5', (d) => { d.en.status = 'ready'; }],
  ['a promise about student data', 'S6', (d) => { d.en.studentsText = 'We collect no student data at all.'; }],
];

if (require.main === module) {
  const d = load();
  const fails = run(d);
  for (const f of fails) console.log('FAIL  ' + f);
  if (fails.length) { console.log(fails.length + ' problem(s)'); process.exit(1); }
  if (process.argv.includes('--poison')) {
    let missed = 0;
    for (const [name, gate, breakIt] of POISONS) {
      const copy = load();
      breakIt(copy);
      if (!run(copy).some((f) => f.startsWith(gate + '  '))) { console.log('POISON NOT CAUGHT  ' + name + ' (' + gate + ')'); missed++; }
    }
    if (missed) process.exit(1);
    console.log('schools page: ' + POISONS.length + ' poisons, each caught by its gate');
  }
  console.log('schools page: ' + Object.keys(d).length + ' language(s); all gates pass');
}
module.exports = { run, load };
