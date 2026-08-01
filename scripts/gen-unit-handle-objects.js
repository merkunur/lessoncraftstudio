/* =====================================================================
   gen-unit-handle-objects.js — the object shelf for TOOL #40
   ---------------------------------------------------------------------
   Run:  node scripts/gen-unit-handle-objects.js [--write]

   The shelf is DERIVED from `mini tools/measurement-bench.js`, never
   retyped. That file already carries 30 length objects with hand-authored
   trim boxes (`LENGTH_OBJECTS`, :182-213) and their image-library
   coordinates (`META`), all proven in production by the bench's LENGTH
   mode. Copying them by hand would risk exactly one thing — a wrong
   theme string, which is a silent 404 and a blank object on the bench.

   ⚠ An entry is an image key, a length and a trim box. No words in any
   language, so the shelf is locale-NEUTRAL by construction.

   ⚠ THE ORDER IS CURATED, NOT INHERITED. The first six are the FREE
   shelf and they are chosen to span the length range — a teacher who
   never signs in must be able to see a short object afford a small count
   and a long one afford a large one, which is the whole comparison.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'mini tools', 'measurement-bench.js');
const OUT = path.join(ROOT, 'mini tools', 'unit-handle-objects.json');
const WRITE = process.argv.includes('--write');

const LEN_SCALE = 16 / 9;   /* must match unit-handle.js */
const U_MIN = 50;   /* must match unit-handle.js */
const MIN_COUNT = 2;

let ERRORS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR  ' + m); };

/* ---- lift the two tables out of the bench ---- */
const S = fs.readFileSync(SRC, 'utf8');
const grab = (name) => {
  const m = S.match(new RegExp(name + ':\\s*([\\[{][\\s\\S]*?\\n  [\\]}])'));
  if (!m) { console.error('FATAL: could not find ' + name + ' in measurement-bench.js'); process.exit(1); }
  return vm.runInNewContext('(' + m[1].replace(/\/\*[\s\S]*?\*\//g, '') + ')');
};
const OBJECTS = grab('LENGTH_OBJECTS');
const META = grab('META');

/* ⭐ THE SHELF IS FILTERED ON ASPECT RATIO, and the reason is both
   pedagogical and geometric. You measure the LENGTH of long thin things
   — a crayon, a fork, a ladder. A boat is not something a class lays
   units along; it is something they look at. Geometrically the same cut
   saves the bench: the visible height of an object above the bench line
   is L / ratio, so at the scaled-up lengths a ratio-1.57 boat would
   stand 510 model units tall and tower over the very tapes it is being
   measured by. Everything at ratio >= MIN_RATIO is a genuinely
   measurable object AND fits. */
const MIN_RATIO = 2.5;
const ratioOf = (o) => (o.rot === 90 ? o.trim.h / o.trim.w : o.trim.w / o.trim.h);

/* ---- the free six, curated to span the surviving length range ---- */
const FREE = ['crayon', 'fork', 'skateboard', 'celery', 'ladder', 'shovel'];

/* ---- POISON TEST. A derivation that cannot fail is not a derivation. */
(function poison() {
  const cases = [
    ['the bench yielded 30 objects', () => OBJECTS.length === 30],
    ['every object has a META entry', () => OBJECTS.every((o) => Array.isArray(META[o.k]) && META[o.k].length === 2)],
    ['a made-up key has no META', () => !META['__not_a_real_object__']],
    ['every trim box is inside its image', () => OBJECTS.every((o) => o.trim.x >= 0 && o.trim.y >= 0 && o.trim.x + o.trim.w <= o.iw && o.trim.y + o.trim.h <= o.ih)],
    ['the 16/9 remap is exact for every length', () => OBJECTS.every((o) => Number.isInteger(o.w * LEN_SCALE))],
    ['every free key exists in the bench', () => FREE.every((k) => OBJECTS.some((o) => o.k === k))],
    ['the aspect filter actually rejects something', () => OBJECTS.some((o) => ratioOf(o) < MIN_RATIO)],
    ['the aspect filter actually keeps something', () => OBJECTS.filter((o) => ratioOf(o) >= MIN_RATIO).length >= 10]
  ];
  let bad = 0;
  for (const [name, fn] of cases) { let ok = false; try { ok = fn(); } catch (_) {} if (!ok) { console.error('  POISON FAILED  ' + name); bad++; } }
  if (bad) { console.error('FATAL: the derivation cannot be trusted'); process.exit(1); }
  console.log(`poison test: ${cases.length}/${cases.length}`);
})();

/* ---- order: the free six first, then the rest by length ---- */
const LONG = OBJECTS.filter((o) => ratioOf(o) >= MIN_RATIO);
console.log(`aspect filter >= ${MIN_RATIO}: ${LONG.length} of ${OBJECTS.length} objects survive` +
  ` — dropped ${OBJECTS.filter((o) => ratioOf(o) < MIN_RATIO).map((o) => o.k).join(', ')}`);
const byKey = {};
LONG.forEach((o) => { byKey[o.k] = o; });
FREE.forEach((k) => { if (!byKey[k]) err(`the free key "${k}" did not survive the aspect filter`); });
const rest = LONG.filter((o) => FREE.indexOf(o.k) === -1).sort((a, b) => a.w - b.w || (a.k < b.k ? -1 : 1));
const ordered = FREE.filter((k) => byKey[k]).map((k) => byKey[k]).concat(rest);

const objects = ordered.map((o) => ({
  k: o.k, theme: META[o.k][0], noun: META[o.k][1],
  w: o.w, rot: o.rot, trim: o.trim, iw: o.iw, ih: o.ih
}));

/* ---- validate what the tool will actually do with them ---- */
let minCount = Infinity, maxCount = 0, domain = 0;
for (const o of objects) {
  const L = Math.round(o.w * LEN_SCALE);
  const hi = Math.floor(L / MIN_COUNT);
  if (hi < U_MIN) { err(`${o.k}: length ${L} cannot carry ${MIN_COUNT} tiles at the ${U_MIN} floor`); continue; }
  minCount = Math.min(minCount, MIN_COUNT);
  maxCount = Math.max(maxCount, Math.floor(L / U_MIN));
  domain += hi - U_MIN + 1;
  if (![320, 480, 640, 800].includes(L)) err(`${o.k}: unexpected remapped length ${L}`);
}
/* the free shelf must span the range, or the free tier shows one story */
const freeLens = objects.slice(0, FREE.length).map((o) => Math.round(o.w * LEN_SCALE));
if (new Set(freeLens).size < 3) err(`the free shelf spans only ${new Set(freeLens).size} distinct length(s): ${freeLens.join(',')}`);

const NOTE =
  'THE OBJECT SHELF for tool #40 (The Unit Handle). DERIVED from mini tools/measurement-bench.js ' +
  'LENGTH_OBJECTS + META — never retyped, because a hand-copied theme string is a silent 404 and a ' +
  'blank object on the bench. An entry is an image key, a length and a trim box, so this file is ' +
  'locale-NEUTRAL by construction. `w` is the BENCH width; the tool renders it at w * 16/9 so the ' +
  'longest object reaches the end of the model box while every ratio between objects is preserved ' +
  'exactly (180/270/360/450 -> 320/480/640/800, all integers). The first six are the FREE shelf and ' +
  'are curated to span the length range. Regenerate: node scripts/gen-unit-handle-objects.js --write';

const doc = { version: 1, note: NOTE, freeCount: FREE.length, premiumCount: objects.length, objects };

console.log(`objects: ${objects.length} (${FREE.length} free) — lengths ${[...new Set(objects.map((o) => Math.round(o.w * LEN_SCALE)))].join(', ')}`);
const tallest = objects.map((o) => ({ k: o.k, h: Math.round(Math.round(o.w * LEN_SCALE) / (o.rot === 90 ? o.trim.h / o.trim.w : o.trim.w / o.trim.h)) })).sort((a, b) => b.h - a.h)[0];
console.log(`tallest object above the bench line: ${tallest.k} at ${tallest.h} model units`);
console.log(`counts afforded: ${minCount}..${maxCount} · unit settings across the whole shelf: ${domain}`);
console.log('free shelf:', objects.slice(0, FREE.length).map((o) => `${o.k}(${Math.round(o.w * LEN_SCALE)})`).join(' '));

if (ERRORS) { console.error(`FAIL — ${ERRORS} error(s); nothing written`); process.exit(1); }

if (WRITE) {
  const body = JSON.stringify(doc, null, 2) + '\n';
  JSON.parse(body);
  fs.writeFileSync(OUT, body, 'utf8');
  console.log(`wrote ${path.relative(ROOT, OUT)} (${Buffer.byteLength(body)} bytes)`);
  /* the tool's inline fallback must BE the free shelf, byte for byte */
  console.log('\n--- paste into unit-handle.js FALLBACK_OBJECTS.objects ---');
  console.log(objects.slice(0, FREE.length).map((o) =>
    `      { k: '${o.k}', theme: '${o.theme}', noun: '${o.noun}', w: ${o.w}, rot: ${o.rot}, ` +
    `trim: { x: ${o.trim.x}, y: ${o.trim.y}, w: ${o.trim.w}, h: ${o.trim.h} }, iw: ${o.iw}, ih: ${o.ih} }`
  ).join(',\n'));
} else {
  console.log('(preview only — pass --write)');
}
