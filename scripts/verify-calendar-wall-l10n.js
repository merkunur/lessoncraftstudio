#!/usr/bin/env node
/* =====================================================================
   verify-calendar-wall-l10n.js — build-gate for the Calendar Wall
   tool's inline l10n tables (mini tools/calendar-wall.js).

   MEASURED invariants (fix the data, never the gate):
     1. DATE_L10N covers all 11 locales; each block has:
        - template containing {weekday}, {dateword} AND {month}
        - dateWords: EXACTLY 31 non-empty strings, no digits inside
        - weekStart ∈ {mon, sun}; intl tag present
        - cardinal locales with a first-of-month exception (fr es pt it)
          have a DISTINCT index-0 word (premier/primero/primeiro/primo —
          not the bare cardinal "un/uno/um")
     2. WEATHER: exactly 6 entries with unique ids, svg + labelKey; every
        labelKey resolves in strings for all 11 locales
     3. strings: every key covers all 11 locales, non-empty
     4. narration keys narrTen + narrHundred present ×11
     5. every {placeholder} used in a strings value is consistent across
        its 11 locales (a locale must not drop {w}/{d}/{n}/{name})
   Usage: node scripts/verify-calendar-wall-l10n.js
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const FIRST_SPECIAL = { fr: 'un', es: 'uno', pt: 'um', it: 'uno' }; // the banned bare cardinal at index 0

function loadTool() {
  const src = fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'calendar-wall.js'), 'utf8');
  const stub = `
    var document = { createElement: function(){ return { style:{}, textContent:'' }; },
                     head: { appendChild: function(){} },
                     addEventListener: function(){} };
    var window = { addEventListener: function(){}, matchMedia: function(){ return { matches:false }; } };
    var location = { search: '' };
    var localStorage = { getItem: function(){ return null; }, setItem: function(){} };
  `;
  return new Function(stub + src + '; return CalendarWall;')();
}

const errors = [];
const E = (m) => errors.push(m);

const tool = loadTool();

/* ---- 1. DATE_L10N ---- */
for (const L of LOCALES) {
  const b = tool.DATE_L10N[L];
  if (!b) { E(`DATE_L10N.${L}: missing`); continue; }
  for (const ph of ['{weekday}', '{dateword}', '{month}']) {
    if (!b.template || b.template.indexOf(ph) < 0) E(`DATE_L10N.${L}: template missing ${ph}`);
  }
  if (!Array.isArray(b.dateWords) || b.dateWords.length !== 31) {
    E(`DATE_L10N.${L}: dateWords length ${(b.dateWords || []).length} (need 31)`);
  } else {
    b.dateWords.forEach((w, i) => {
      if (!w || typeof w !== 'string' || !w.trim()) E(`DATE_L10N.${L}: dateWords[${i}] empty`);
      else if (/\d/.test(w)) E(`DATE_L10N.${L}: dateWords[${i}] "${w}" contains a digit`);
    });
  }
  if (b.weekStart !== 'mon' && b.weekStart !== 'sun') E(`DATE_L10N.${L}: weekStart "${b.weekStart}"`);
  if (!b.intl) E(`DATE_L10N.${L}: intl tag missing`);
  if (FIRST_SPECIAL[L] && b.dateWords && b.dateWords[0] === FIRST_SPECIAL[L]) {
    E(`DATE_L10N.${L}: index-0 must be the ordinal first-of-month form, not bare "${FIRST_SPECIAL[L]}"`);
  }
}

/* ---- 2. WEATHER ---- */
if (!Array.isArray(tool.WEATHER) || tool.WEATHER.length !== 6) {
  E(`WEATHER: ${(tool.WEATHER || []).length} entries (need 6)`);
} else {
  const seen = new Set();
  for (const w of tool.WEATHER) {
    if (!w.id || seen.has(w.id)) E(`WEATHER: missing/duplicate id "${w.id}"`);
    seen.add(w.id);
    if (!w.svg || w.svg.indexOf('<svg') !== 0) E(`WEATHER ${w.id}: bad svg`);
    if (!tool.strings[w.labelKey]) E(`WEATHER ${w.id}: labelKey "${w.labelKey}" not in strings`);
  }
}

/* ---- 3+4+5. strings coverage + placeholder consistency ---- */
for (const key of Object.keys(tool.strings)) {
  const entry = tool.strings[key];
  const enPh = (entry.en || '').match(/\{\w+\}/g) || [];
  for (const L of LOCALES) {
    const v = entry[L];
    if (!v || !String(v).trim()) { E(`strings.${key}: missing/empty for ${L}`); continue; }
    for (const ph of enPh) {
      if (v.indexOf(ph) < 0) E(`strings.${key}.${L}: missing placeholder ${ph}`);
    }
  }
}
for (const k of ['narrTen', 'narrHundred']) {
  if (!tool.strings[k]) E(`strings.${k}: narration key missing`);
}

/* ---- report ---- */
const words = LOCALES.reduce((a, L) => a + ((tool.DATE_L10N[L] || {}).dateWords || []).length, 0);
console.log(`${errors.length ? 'FAIL' : 'PASS'}  calendar-wall l10n  (${LOCALES.length} locales, ${words} date words, ${Object.keys(tool.strings).length} string keys, ${errors.length} errors)`);
for (const e of errors) console.log('   ERROR ' + e);
process.exit(errors.length ? 1 : 0);
