#!/usr/bin/env node
/* =====================================================================
   apply-ten-frame-landing.js — writes the native panels' LANDING copy
   into the two user-facing surfaces.

   Run:  node scripts/apply-ten-frame-landing.js [--dry-run]

     · `frontend/messages/tool-content/<loc>.json` -> classroomIdeas[0]
     · `frontend/lib/manipulatives.ts`             -> the ten-frame card

   WHY ONLY THOSE TWO. Everything else the shipped copy promised is now
   TRUE — drag, "two fives", "how many more to make ten", the double
   frame, the partner to ten, building any number and explaining it. The
   ONE remaining false claim was `classroomIdeas[0]`, which sold a
   flash-and-hide routine this tool refuses (number-talk-easel owns the
   curtain; four tools own the cover). The hub card separately described
   a two-field tool that no longer exists.

   ⚠ §21.5a. The churn freeze covers TITLES, META DESCRIPTIONS,
   CANONICALS, SLUGS and URL STRUCTURE. `classroomIdeas` and the
   manipulatives description are BODY copy, outside that list — and this
   repairs a broken promise rather than churning an identity. No frozen
   field is touched.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PANELS = path.join(__dirname, '_tnf-panels');
const LOCALES = ['de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const DRY = process.argv.includes('--dry-run');
const die = (m) => { console.error('HALT: ' + m); process.exit(1); };

const en = JSON.parse(fs.readFileSync(path.join(PANELS, '_source-landing-en.json'), 'utf8'));
const copy = { en };
for (const loc of LOCALES) {
  const p = path.join(PANELS, loc + '-landing.json');
  if (!fs.existsSync(p)) die(`no landing panel for ${loc}. A partial fan-out is not a fan-out.`);
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const k of ['classroomIdea0', 'hubDescription']) {
    if (typeof j[k] !== 'string' || j[k].trim().length < 30) die(`${loc}-landing.json is missing or short on "${k}"`);
  }
  /* the one claim that must not come back: this tool does not flash,
     hide or cover, and four siblings own those verbs between them */
  const FLASH = {
    en: /\bflash|hide it\b/i, de: /aufblitz|blitzblick|verdeck/i, fr: /flash|cache/i,
    it: /lampo|nascond/i, es: /relámpago|destell|ocult/i, pt: /relâmpago|escond/i,
    nl: /flits|verberg/i, sv: /blixt|dölj/i, da: /lyn|skjul/i, no: /kvikk|skjul/i,
    fi: /välähd|piilot/i
  };
  for (const k of ['classroomIdea0', 'hubDescription']) {
    if (FLASH[loc].test(j[k])) die(`${loc}-landing.json "${k}" still sells a flash/hide routine this tool refuses`);
  }
  copy[loc] = j;
}
/* poison, both directions — a ban that cannot fire is worse than none */
if (!/\bflash/i.test('Flash a quantity for a few seconds')) die('POISON: the flash ban cannot fire on English');
if (/\bflash|hide it\b/i.test(en.classroomIdea0)) die('POISON: the EN replacement still trips the flash ban');

let changed = 0;

/* ---- 1. the landing page, per locale ---- */
for (const loc of ['en'].concat(LOCALES)) {
  const f = path.join(ROOT, 'frontend', 'messages', 'tool-content', loc + '.json');
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  if (!j['ten-frame']) die(`${loc}.json has no ten-frame entry`);
  const next = (loc === 'en') ? en.classroomIdea0 : copy[loc].classroomIdea0;
  if (j['ten-frame'].classroomIdeas[0] !== next) {
    j['ten-frame'].classroomIdeas[0] = next;
    changed++;
    if (!DRY) fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n', 'utf8');
  }
}

/* ---- 2. the hub card ---- */
{
  const f = path.join(ROOT, 'frontend', 'lib', 'manipulatives.ts');
  let src = fs.readFileSync(f, 'utf8');
  /* the ten-frame entry is the FIRST in MANIPULATIVES; scope the rewrite
     to its own description block so no sibling card can be touched */
  const start = src.indexOf('id: "ten-frame"');
  if (start < 0) die('no ten-frame entry in manipulatives.ts');
  const dStart = src.indexOf('description: {', start);
  const dEnd = src.indexOf('},', dStart);
  if (dStart < 0 || dEnd < 0 || dEnd > src.indexOf('id: "number-line"')) die('could not bound the ten-frame description block');
  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const body = ['en'].concat(LOCALES)
    .map((l) => `      ${l}: "${esc(l === 'en' ? en.hubDescription : copy[l].hubDescription)}",`)
    .join('\n');
  const next = 'description: {\n' + body + '\n    ';
  if (src.slice(dStart, dEnd) !== next) {
    src = src.slice(0, dStart) + next + src.slice(dEnd);
    changed++;
    if (!DRY) fs.writeFileSync(f, src, 'utf8');
  }
}

console.log((DRY ? 'dry run: ' : 'applied: ') + changed + ' surface(s) across 11 locales');
