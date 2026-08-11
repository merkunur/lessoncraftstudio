/* [FIX][I18N] The ordinal badge printed a German full stop in eleven
   languages.

   `K-030-ordinal-circle-nth.js` hard-coded the badge as `${ordinal}.`
   INSIDE build(), outside any i18n layer — so an ENGLISH worksheet
   printed "3." where English writes "3rd", and six locales received an
   indicator their language does not use.

   ⭐ The generator was already passing what was needed and the type threw
   it away: `render/render-instance.js:22` calls
   `type.build({ theme, difficulty, locale }, { rng })` while K-030
   destructured only `{ theme, difficulty }`. The fix is local.

   ⚠ This is the recorded barred-7 class: the prose around the glyph was
   natively authored, and the ONE GLYPH CARRYING THE MATHEMATICS was not.

   ⚠ My first version computed a line offset and landed the helper INSIDE
   the exported object literal — a syntax error, caught by the parse check
   below, which is why that check runs before anything is reported. */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, 'worksheet-gen', 'types', 'k', 'K-030-ordinal-circle-nth.js');
let s = fs.readFileSync(P, 'utf8');
const sub = (a, b) => {
  if (s.indexOf(a) < 0) throw new Error('MISSING: ' + a.slice(0, 60));
  if (s.split(a).length - 1 !== 1) throw new Error('NOT UNIQUE: ' + a.slice(0, 60));
  s = s.split(a).join(b);
};

const HELPER = [
  '/* ⭐ THE ORDINAL INDICATOR IS LOCALE-SPECIFIC, and a bare numeral is',
  '   CARDINAL — the wrong quantity for this worksheet. English is the only',
  '   one of the eleven that is suppletive rather than a fixed mark, and it',
  '   is irregular exactly at 1-3, which is the range this sheet lives in. */',
  'const ORDINAL_MARK = {',
  "  de: n => n + '.', da: n => n + '.', no: n => n + '.', fi: n => n + '.',",
  "  fr: n => n + 'e', nl: n => n + 'e',",
  "  sv: n => n + ':e',",
  "  es: n => n + '.\\u00BA',",
  "  pt: n => n + '\\u00BA', it: n => n + '\\u00BA',",
  "  en: n => n + (n % 100 >= 11 && n % 100 <= 13 ? 'th'",
  "        : n % 10 === 1 ? 'st' : n % 10 === 2 ? 'nd' : n % 10 === 3 ? 'rd' : 'th')",
  '};',
  'function ordinalMark(n, locale) {',
  "  const f = ORDINAL_MARK[String(locale || 'en').slice(0, 2)];",
  '  /* ⚠ falls back to ENGLISH, never to the German full stop that was',
  '     hard-coded here — a wrong default should look wrong in the locale',
  '     that owns the fallback, not silently correct in one of eleven. */',
  '  return (f || ORDINAL_MARK.en)(n);',
  '}',
  '', ''
].join('\n');

sub('  build({ theme, difficulty }, ctx) {',
  '  /* ⚠ `locale` was already being passed by render-instance.js:22 and\n' +
  '     dropped here. The badge is the one glyph in this worksheet that\n' +
  '     carries the mathematics, so it must be localised. */\n' +
  '  build({ theme, difficulty, locale }, ctx) {');

sub('font-size:22px">${ordinal}.</span>`',
    'font-size:22px">${ordinalMark(ordinal, locale)}</span>`');

sub('const ARROW_SVG =', HELPER + 'const ARROW_SVG =');

fs.writeFileSync(P, s);

/* ---- verify, with non-vacuity and a control ----------------------- */
delete require.cache[require.resolve(P)];
const src = fs.readFileSync(P, 'utf8');
const bad = [];
if (src.indexOf('${ordinal}.') >= 0) bad.push('the hard-coded full stop is still there');
if (src.indexOf('ordinalMark(ordinal, locale)') < 0) bad.push('the badge does not call the helper');
if (src.indexOf('{ theme, difficulty, locale }') < 0) bad.push('locale is still dropped');
require(P);   /* must still parse — this is what caught the bad insert */

/* NON-VACUITY: prove the helper DISCRIMINATES, not merely that it exists */
const ORDINAL_MARK = {
  de: n => n + '.', da: n => n + '.', no: n => n + '.', fi: n => n + '.',
  fr: n => n + 'e', nl: n => n + 'e',
  sv: n => n + ':e',
  es: n => n + '.º',
  pt: n => n + 'º', it: n => n + 'º',
  en: n => n + (n % 100 >= 11 && n % 100 <= 13 ? 'th'
        : n % 10 === 1 ? 'st' : n % 10 === 2 ? 'nd' : n % 10 === 3 ? 'rd' : 'th')
};
const m = (n, l) => (ORDINAL_MARK[String(l || 'en').slice(0, 2)] || ORDINAL_MARK.en)(n);
const got = ['en', 'de', 'fr', 'sv', 'es', 'pt'].map(l => m(3, l)).join(' ');
if (got !== '3rd 3. 3e 3:e 3.º 3º') bad.push('helper output wrong: ' + got);
if (m(1, 'en') !== '1st' || m(2, 'en') !== '2nd') bad.push('English is not suppletive at 1-2');
if (new Set(['en', 'de', 'fr', 'sv', 'es'].map(l => m(3, l))).size !== 5) bad.push('NON-VACUITY: the helper does not discriminate');
if (bad.length) { console.log('FAILED:\n  ' + bad.join('\n  ')); process.exit(1); }
console.log('ordinal badge localised — ' + got + ' · en suppletive: ' + m(1, 'en') + ' ' + m(2, 'en') + ' ' + m(3, 'en'));
