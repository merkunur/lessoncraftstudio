#!/usr/bin/env node
/**
 * Poison test for validate-b2var-draft.js.
 *
 * A gate nobody has seen fail is not a gate. Every check gets a MUST_FIRE case
 * (a synthetic violation it has to catch) and the whole suite runs against a
 * CONTROL that must pass clean — because a check that can never pass is as
 * useless as one that can never fail.
 */
'use strict';
const { validate, faces } = require('./validate-b2var-draft.js');

// A clean synthetic draft: distinct native-looking title and instruction per face.
function control() {
  const t = {};
  faces().forEach((f, i) => {
    t[f.id] = { title: 'Titel ' + f.id + ' Nr' + i, instruction: 'Anweisung fuer ' + f.id + ' Nummer ' + i + '.' };
  });
  return { locale: 'de', types: t };
}
const ID = faces()[0].id;              // K-289, band K
const ID2 = faces().find((f) => f.id.startsWith('K-') && f.id !== ID).id;

let pass = 0, fail = 0;
function check(name, draft, mustMatch) {
  const errs = validate('de', draft);
  const hit = errs.some((e) => mustMatch.test(e));
  if (hit) { pass++; console.log('  FIRED  ' + name); }
  else { fail++; console.log('  MISSED ' + name + '  (errors: ' + (errs.join(' | ') || 'none') + ')'); }
}
function mutate(fn) { const d = control(); fn(d); return d; }

console.log('control (must be clean):');
const cErrs = validate('de', control());
if (cErrs.length) { fail++; console.log('  CONTROL DIRTY: ' + cErrs.slice(0, 4).join(' | ')); }
else { pass++; console.log('  CLEAN'); }

console.log('poisons (each must fire):');
check('missing id', mutate((d) => { delete d.types[ID]; }), /missing /);
check('unknown id', mutate((d) => { d.types['K-999'] = { title: 'x', instruction: 'y' }; }), /unknown id/);
check('empty title', mutate((d) => { d.types[ID].title = '   '; }), /empty title/);
check('title too long', mutate((d) => { d.types[ID].title = 'A'.repeat(71); }), /title 71 >/);
check('worksheet-word in title', mutate((d) => { d.types[ID].title = 'Zahlen Arbeitsblatt Uebung'; }), /worksheet-word/);
check('untranslated English title', mutate((d) => { d.types[ID].title = faces()[0].enTitle; }), /identical to the English/);
check('title collides inside the draft', mutate((d) => { d.types[ID2].title = d.types[ID].title; }), /collides in band K with .* in this draft/);
// Read the real shipped K-band title rather than typing one: the first attempt
// used "Woerter nachspuren" where the shipped German is "Wörter nachspuren", so
// the poison missed and looked like a hole in the check. The poison was wrong,
// not the check — never loosen a correct comparison to satisfy a bad example.
const shippedK = (() => {
  const all = require('../i18n/strings.de.json');
  const hit = Object.entries(all).find(([id, v]) => id.startsWith('K-') && v && v.title);
  return hit[1].title;
})();
check('title collides with a shipped title', mutate((d) => { d.types[ID].title = shippedK; }), /collides in band K with the shipped/);
check('empty instruction', mutate((d) => { d.types[ID].instruction = ''; }), /empty instruction/);
check('instruction too long', mutate((d) => { d.types[ID].instruction = 'x'.repeat(151); }), /instruction 151 >/);
check('duplicate instruction within a family',
  mutate((d) => { d.types['K-290'].instruction = d.types['K-289'].instruction; }),
  /identical to .* in family "word-tracing"/);
check('wrong locale field', mutate((d) => { d.locale = 'fr'; }), /locale field is/);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
