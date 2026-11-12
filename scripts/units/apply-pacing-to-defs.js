#!/usr/bin/env node
/**
 * After the pacing rule (scripts/units/pacing.js) the weeks of a unit come from its lessons, not from its definition.
 * A unit's own description names its length in words ("A two-week Grade 1 math unit …", "Zwei Wochen Mathe Klasse 1 …",
 * "… cirka två veckor."): this script puts the counted weeks into the definition and into those words, so no page
 * says a length the unit does not have.
 *
 *   node scripts/units/apply-pacing-to-defs.js [--check]     all languages that have units
 *
 * It changes only the week number of `weeks` and the week phrase of a description; a description that names weeks in
 * a way the script does not know is reported and nothing is written (never guessed).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const C = path.join(__dirname, '..', '..', 'frontend', 'content', 'units');
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const WORD = {
  en: ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
  de: ['', 'Eine', 'Zwei', 'Drei', 'Vier', 'Fünf', 'Sechs', 'Sieben', 'Acht', 'Neun', 'Zehn'],
  sv: ['', 'en', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio'],
};
// how each language's descriptions name the length, and how to say it for n weeks
const PHRASE = {
  en: [{ re: /\bA (one|two|three|four|five|six|seven|eight|nine|ten)-week\b/, say: (n) => 'A ' + WORD.en[n] + '-week' }, { re: /\bAn eight-week\b/, say: (n) => (n === 8 ? 'An eight-week' : 'A ' + WORD.en[n] + '-week') }],
  de: [{ re: /^(Eine Woche|(?:Zwei|Drei|Vier|Fünf|Sechs|Sieben|Acht|Neun|Zehn) Wochen)\b/, say: (n) => (n === 1 ? 'Eine Woche' : WORD.de[n] + ' Wochen') }],
  sv: [{ re: /cirka (en vecka|(?:två|tre|fyra|fem|sex|sju|åtta|nio|tio) veckor)/, say: (n) => 'cirka ' + (n === 1 ? 'en vecka' : WORD.sv[n] + ' veckor') }],
};
const MENTIONS = { en: /week/i, de: /Woche/i, sv: /veck/i };
const check = process.argv.includes('--check');
let problems = 0, changed = 0;
for (const loc of Object.keys(WORD)) {
  const df = path.join(C, 'defs', loc + '.json'), uf = path.join(C, 'units.' + loc + '.json');
  if (!fs.existsSync(df) || !fs.existsSync(uf)) continue;
  const raw = fs.readFileSync(df, 'utf8'); const defs = JSON.parse(raw);
  const built = new Map(readJson(uf).units.map((u) => [u.id, u]));
  for (const d of defs.units) {
    const u = built.get(d.id); if (!u) continue;
    const n = u.weeks;
    if (d.weeks !== n) { d.weeks = n; changed++; }
    for (const k of ['metaDescription', 'metaTitle', 'title']) {
      const t = d[k]; if (typeof t !== 'string' || !MENTIONS[loc].test(t)) continue;
      const p = PHRASE[loc].find((x) => x.re.test(t));
      if (!p && k !== 'metaDescription') continue; // a title may say 'Days of the Week': that is no length
      if (!p) { problems++; console.log('PROBLEM  ' + loc + ' ' + d.id + ' ' + k + ' names weeks in a way the script does not know: ' + t.slice(0, 120)); continue; }
      if (n > 10) { problems++; console.log('PROBLEM  ' + loc + ' ' + d.id + ': ' + n + ' weeks has no word'); continue; }
      let next = t.replace(p.re, p.say(n));
      if (loc === 'en' && n === 8) next = next.replace(/\bA eight-week\b/, 'An eight-week');
      if (next !== t) { d[k] = next; changed++; }
    }
  }
  if (problems) continue;
  const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  let out = JSON.stringify(defs, null, indent); if (eol === '\r\n') out = out.replace(/\n/g, '\r\n'); out += raw.endsWith('\n') ? eol : '';
  if (check) { if (out !== raw) { problems++; console.log('PROBLEM  ' + loc + ': the definitions do not say the counted weeks (run node scripts/units/apply-pacing-to-defs.js)'); } }
  else if (out !== raw) fs.writeFileSync(df, out);
}
console.log(problems ? problems + ' problem(s)' : check ? 'unit definitions: the weeks they name are the counted weeks' : changed + ' field(s) changed');
process.exit(problems ? 1 : 0);
