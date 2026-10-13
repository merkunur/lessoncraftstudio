#!/usr/bin/env node
/**
 * apply-nwd-review.js — Number Words (Level Set walk #60, 2026-10-13): the native + pedagogy review's text fixes, at
 * the source. Printed instructions live in i18n/strings.<loc>.json AND the drafts they were applied from
 * (i18n/.draft-*-<loc>.json) — both are rewritten so a later re-apply cannot bring the old text back. Screen
 * instructions live in i18n/interactive-instructions.json (number-words.*). Exact-string swaps only; every swap must
 * hit at least once (a fix that matches nothing is reported, never silently skipped). Idempotent.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const I18N = path.join(__dirname, '..', '..', 'i18n');
const FIX = {
  nl: [['Lees het getal in het vakje. Omcirkel het woord dat erbij hoort.', 'Lees het getal. Omcirkel het woord dat erbij hoort.']],
  no: [['Les tallet i ruten. Sett ring rundt tallordet som passer til det.', 'Les tallet. Sett ring rundt tallordet som passer til det.'],
    ['Finn tallordet som passer i ordbanken øverst. Skriv det på linjen.', 'Finn det riktige tallordet i ordbanken øverst. Skriv det på linjen.']],
  es: [['Lee el número grande y rodea con tu lápiz la palabra que le corresponde.', 'Lee el número y encierra la palabra que le corresponde.']],
  de: [['Lies die große Zahl. Kreise das Zahlwort ein, das genau dazu passt.', 'Lies die Zahl. Kreise das Zahlwort ein, das genau dazu passt.'],
    ['Such das passende Zahlwort im Wörterkasten oben. Schreibe es auf die Linie.', 'Suche das passende Zahlwort im Wörterkasten oben. Schreibe es auf die Linie.']],
  da: [['Læs det store tal. Sæt en ring om det ord, der passer til tallet.', 'Læs tallet. Sæt en ring om det ord, der passer til tallet.']],
  fi: [['Lue numero huolellisesti ja ympyröi lukusana, joka tarkoittaa samaa lukua.', 'Lue luku huolellisesti ja ympyröi lukusana, joka tarkoittaa samaa lukua.']],
  pt: [['Leia o número e circule como ele se escreve por extenso.', 'Leia o número e circule o nome dele escrito por extenso.']],
  it: [['Traccia una linea da ogni numero in cifre al numero in lettere.', 'Traccia una linea da ogni numero in cifre al suo numero in lettere.']],
};
const SCREEN = {
  de: { write: 'Suche das passende Zahlwort im Wörterkasten oben. Tippe auf das Feld und schreibe das Wort.' },
  pt: { circle: 'Leia o número e toque no nome dele escrito por extenso.', write: 'Procure a palavra certa no banco de palavras. Toque no quadrinho e escreva a palavra.' },
  no: { write: 'Finn det riktige tallordet i ordbanken øverst. Trykk på ruten og skriv det.' },
  fr: { circle: 'Lis le nombre. Appuie sur le mot qui lui correspond.', match: 'Lis chaque nombre. Appuie sur le mot qui lui correspond.', write: 'Cherche le bon mot dans la liste en haut de la page. Appuie sur la case et écris le mot.' },
};
let bad = 0;
for (const [loc, pairs] of Object.entries(FIX)) {
  const files = fs.readdirSync(I18N).filter((f) => f === `strings.${loc}.json` || (f.startsWith('.draft-') && f.endsWith(`-${loc}.json`)));
  for (const [a, b] of pairs) {
    let hits = 0, already = 0;
    for (const f of files) {
      const p = path.join(I18N, f);
      const s = fs.readFileSync(p, 'utf8');
      const ja = JSON.stringify(a).slice(1, -1), jb = JSON.stringify(b).slice(1, -1);
      if (s.includes(ja)) { fs.writeFileSync(p, s.split(ja).join(jb)); hits++; }
      else if (s.includes(jb)) already++;
    }
    console.log(`${loc}: ${hits} file(s) fixed, ${already} already fixed — "${b.slice(0, 50)}"`);
    if (!hits && !already) { bad++; console.log('  ✗ NOTHING MATCHED'); }
  }
}
const ip = path.join(I18N, 'interactive-instructions.json');
const raw = fs.readFileSync(ip, 'utf8');
const j = JSON.parse(raw);
for (const [loc, o] of Object.entries(SCREEN)) for (const [k, v] of Object.entries(o)) j['number-words'][k][loc] = v;
const ind = raw.match(/^\{\r?\n( +)/)[1].length;
fs.writeFileSync(ip, JSON.stringify(j, null, ind) + (raw.endsWith('\n') ? '\n' : ''));
// the strings files must still parse
for (const loc of Object.keys(FIX)) JSON.parse(fs.readFileSync(path.join(I18N, `strings.${loc}.json`), 'utf8'));
console.log(bad ? 'SOME FIXES MATCHED NOTHING' : 'all fixes applied');
process.exit(bad ? 1 : 0);
