#!/usr/bin/env node
/* =====================================================================
   verify-our-day.js — MEASURED build-gate for Our Day
   (mini tools/our-day.js). Fix the data, never the gate.

   Invariant families (all measured):
     CATALOG — card ids unique; every card has an icon; NAMES complete
       ×11 for every locale where the card is VISIBLE ("—" allowed only
       on invisible cards); groups valid; fr ships NO religion card;
       honores is es-only; showtell en-only; breakfast de/nl-only;
       brushing pt-only; aftercare sv/da/no-only.
     TIME_RULES DRIFT — deep-equal against the learning-clock.js source
       AND functional equality: sayTime output matches learning-clock's
       own sayTime for every locale × hour 1-12 × 5-min position.
     FRAMES — timeSentence for every locale × hour × position: renders,
       NO leftover placeholders, NO doubled clock word (kello kello /
       klokken klokken / klokka klokka — the fi/da/no strip rule);
       nowSentence renders for every visible card; ANNOUNCE overrides
       reference real card ids.
     ENGINE — MAX_CARDS 16 enforced by addCard; day-state JSON
       roundtrip; weekdayLabel capitalized + Monday-first ×11.
     SPEECH — the LCSAudio call passes lang (the 3-for-3 bug class).
     STRINGS — completeness ×11, placeholder parity, verdict/score bans,
       no "Common Core".
   Usage: node scripts/verify-our-day.js [--locales=en]
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find((a) => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',').filter((l) => ALL.includes(l)) : ALL;

const REPO = path.join(__dirname, '..');
const errors = [];
const E = (m) => errors.push(m);

const VERDICT = {
  en: /\b(correct|incorrect|wrong|oops|late|behind)\b/i,
  de: /\b(richtig|falsch|zu spät)\b/i,
  fr: /\b(correct|correcte|faux|fausse|en retard)\b/i,
  it: /\b(giusto|sbagliato|in ritardo)\b/i,
  es: /\b(correcto|incorrecto|tarde)\b/i,
  pt: /\b(correto|errado|atrasad)\b/i,
  nl: /\b(goed antwoord|fout|te laat)\b/i,
  sv: /\b(rätt svar|fel|försenad)\b/i,
  da: /\b(rigtigt svar|forkert|forsinket)\b/i,
  no: /\b(riktig svar|feil|forsinket)\b/i,
  fi: /\b(oikein|väärin|myöhässä)\b/i
};
const SCORE_RE = /\b(score|timer|streak|poäng|poeng|punkte|punteggio)\b/i;

function loadTool(file, globalName) {
  const sandbox = {
    window: {},
    document: { createElement: () => ({ style: {}, setProperty: () => {} }), getElementById: () => null, head: { appendChild: () => {} }, addEventListener: () => {}, body: { classList: { add: () => {} } } },
    navigator: {},
    location: { search: '', hostname: 'gate' },
    localStorage: { getItem: () => null, setItem: () => {} },
    URLSearchParams,
    setInterval: () => 0,
    setTimeout: () => 0,
    Intl,
    Date
  };
  sandbox.global = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(REPO, 'mini tools', file), 'utf8'), sandbox);
  return sandbox[globalName];
}
const T = loadTool('our-day.js', 'OurDay');
const LC = loadTool('learning-clock.js', 'LearningClock');
if (!T) { console.error('FATAL: OurDay did not evaluate'); process.exit(1); }
if (!LC) { console.error('FATAL: LearningClock did not evaluate (drift gate needs it)'); process.exit(1); }

/* ======================= CATALOG ================================== */

const ids = new Set();
for (const c of T.CARDS) {
  if (ids.has(c.id)) E(`duplicate card id ${c.id}`);
  ids.add(c.id);
  if (!T.ICON_PATHS[c.id]) E(`card ${c.id}: no icon`);
  if (c.group < 0 || c.group >= T.GROUPS.length) E(`card ${c.id}: bad group ${c.group}`);
  if (!T.NAMES[c.id]) { E(`card ${c.id}: no NAMES row`); continue; }
  for (const L of ALL) {
    const visible = T.visibleCards(L).some((v) => v.id === c.id);
    const name = T.NAMES[c.id][L];
    if (visible && (!name || name === '—')) E(`card ${c.id}: visible in ${L} but name missing/placeholder`);
  }
}
/* locale-visibility policy checks (the ratified native rulings) */
function visIds(L) { return T.visibleCards(L).map((c) => c.id); }
if (visIds('fr').includes('religion')) E('fr must NOT ship the religion card (laïcité)');
const POLICY = {
  honores: ['es', 'pt'],           /* + pt "a hora cívica" per the pt ruling */
  showtell: ['en'],
  brushing: ['pt', 'de'],          /* + de Zähneputzen */
  breakfast: ['de', 'es', 'fi'],   /* nl tien-uurtje drop; es desayuno + fi aamupala adds */
  aftercare: ['sv', 'da', 'no', 'nl', 'fr', 'de', 'pt', 'fi'],
  italiano: ['it']
};
for (const L of ALL) {
  for (const id of Object.keys(POLICY)) {
    const should = POLICY[id].includes(L);
    const does = visIds(L).includes(id);
    if (does && !should) E(`${id} leaked to ${L} (policy: ${POLICY[id].join('/')})`);
    if (!does && should) E(`${id} missing from ${L} (policy requires it)`);
  }
}
if (!visIds('fi').includes('recess')) E('fi must ship välitunti (recess)');
/* the fi TIME_NAMES override must engage (no "Jonoon alkaa…") */
{
  const s1 = T.timeSentence('fi', 'lineup', 9, 0);
  if (/^Jonoon alkaa/.test(s1)) E('fi timeSentence(lineup) bypasses TIME_NAMES ("Jonoon alkaa…")');
  if (!/Jonoon meno/.test(s1)) E(`fi timeSentence(lineup) missing the TIME_NAMES form ("${s1}")`);
}
for (const L of ALL) {
  const n = visIds(L).length;
  if (n < 38) E(`${L}: only ${n} visible cards (expected ≥38)`);
}

/* =================== TIME_RULES drift gate ======================== */

const a = JSON.stringify(T.TIME_RULES);
const b = JSON.stringify(LC.TIME_RULES);
if (a !== b) E('TIME_RULES has DRIFTED from learning-clock.js — re-copy verbatim');

/* functional equality on the whole 5-min surface */
for (const L of ALL) {
  for (let h = 1; h <= 12; h++) {
    for (let m = 0; m < 60; m += 5) {
      const ours = T.sayTime(L, h, m);
      const theirs = LC.sayTime(L, h, m);
      if (ours !== theirs) { E(`sayTime(${L},${h},${m}) "${ours}" ≠ learning-clock "${theirs}"`); h = 13; break; }
    }
  }
}

/* ========================= FRAMES ================================= */

const STRIPWORDS = { fi: 'kello', da: 'klokken', no: 'klokka' };
for (const L of ALL) {
  for (let h24 = 7; h24 <= 16; h24++) {
    for (let m = 0; m < 60; m += 5) {
      const s = T.timeSentence(L, 'math', h24, m);
      if (!s) { E(`timeSentence(${L},${h24},${m}) returned null`); m = 60; continue; }
      if (/\{[a-z0-9]+\}/i.test(s)) E(`timeSentence(${L},${h24},${m}): leftover placeholder "${s}"`);
      const w = STRIPWORDS[L];
      if (w && new RegExp('\\b' + w + '\\s+' + w + '\\b', 'i').test(s)) E(`timeSentence(${L},${h24},${m}): doubled clock word "${s}"`);
    }
  }
}
/* the strip actually engages on the hour for fi/da/no */
for (const L of Object.keys(STRIPWORDS)) {
  const s = T.timeSentence(L, 'math', 8, 0);
  const w = STRIPWORDS[L];
  const count = (s.toLowerCase().match(new RegExp('\\b' + w + '\\b', 'g')) || []).length;
  if (count !== 1) E(`timeSentence(${L},8,0): clock word appears ${count}× ("${s}") — the strip rule must leave exactly the frame's own`);
}

for (const L of ALL) {
  for (const c of T.visibleCards(L)) {
    const s = T.nowSentence(L, c.id);
    if (!s || /\{\w+\}/.test(s)) E(`nowSentence(${L},${c.id}): bad render "${s}"`);
    if (s.indexOf('—') >= 0) E(`nowSentence(${L},${c.id}): placeholder name leaked`);
  }
}
for (const L of Object.keys(T.ANNOUNCE)) {
  for (const id of Object.keys(T.ANNOUNCE[L])) {
    if (!T.NAMES[id]) E(`ANNOUNCE.${L}.${id}: unknown card id`);
  }
}

/* ========================= ENGINE ================================= */

/* MAX_CARDS enforced */
{
  T.api = { lang: 'en', settings: { voice: false, soundCues: false }, t: (k) => T.strings[k].en, announce: () => {}, el: () => ({ style: {} }) };
  T.day = T._blankDay();
  T._store = { v: 1, templates: {} };
  T._persistDay = function () {};
  T.render = function () {};
  for (let i = 0; i < 16; i++) {
    if (!T.addCard('math')) E(`addCard refused at ${i} (below the cap)`);
  }
  if (T.addCard('math')) E('addCard admitted card 17 — MAX_CARDS not enforced');
  if (T.day.items.length !== 16) E(`day holds ${T.day.items.length}, expected 16`);
  /* roundtrip */
  T.day.items[2].time = { h: 9, m: 30 };
  T.day.items[3].changedFrom = 'pe';
  T.day.items[4].skipped = true;
  const rt = JSON.parse(JSON.stringify(T.day));
  if (JSON.stringify(rt) !== JSON.stringify(T.day)) E('day-state JSON roundtrip diverged');
}

/* weekday labels: capitalized, Monday-first, ×11 */
for (const L of ALL) {
  const mon = T.weekdayLabel(L, 0);
  if (!mon || mon.charAt(0) !== mon.charAt(0).toUpperCase()) E(`weekdayLabel(${L},0) "${mon}" not capitalized`);
  const set = new Set();
  for (let i = 0; i < 5; i++) set.add(T.weekdayLabel(L, i));
  if (set.size !== 5) E(`weekdayLabel(${L}): weekdays not distinct`);
}
if (!/^m/i.test(T.weekdayLabel('en', 0))) E('weekday index 0 must be Monday');

/* ========================= SPEECH ================================= */

const src = fs.readFileSync(path.join(REPO, 'mini tools', 'our-day.js'), 'utf8');
const speakCalls = src.match(/LCSAudio\.speak\(\{[^}]*\}/g) || [];
if (!speakCalls.length) E('no LCSAudio.speak call found');
for (const call of speakCalls) {
  if (!/lang:\s*this\.api\.lang/.test(call)) E(`LCSAudio.speak without lang: "${call.slice(0, 60)}…"`);
}

/* ========================= STRINGS ================================ */

for (const key of Object.keys(T.strings)) {
  const map = T.strings[key];
  const enPh = (map.en.match(/\{(\w+)\}/g) || []).sort().join(',');
  for (const L of LOCALES) {
    const v = map[L];
    if (typeof v !== 'string' || !v.trim()) { E(`strings.${key}.${L}: missing`); continue; }
    const ph = (v.match(/\{(\w+)\}/g) || []).sort().join(',');
    if (ph !== enPh) E(`strings.${key}.${L}: placeholders "${ph}" ≠ en "${enPh}"`);
    if (VERDICT[L] && VERDICT[L].test(v)) E(`strings.${key}.${L}: verdict/pressure vocabulary ("${v}")`);
    if (SCORE_RE.test(v)) E(`strings.${key}.${L}: score/timer vocabulary ("${v}")`);
    if (/common core/i.test(v)) E(`strings.${key}.${L}: framework name leak`);
  }
}
/* the tool must NEVER compare the clock to the plan: no Date-driven
   advance anywhere (the only new Date uses are weekday/persist keys) */
if (/setInterval[^)]*advance/i.test(src) || /new Date\(\)[^;]{0,80}sunIdx/.test(src)) {
  E('clock-driven advance detected — the sun is HUMAN-advanced only');
}

/* ---- report ---- */
if (errors.length) {
  console.error(`FAIL — ${errors.length} error(s):`);
  errors.slice(0, 40).forEach((e) => console.error('  ✗ ' + e));
  if (errors.length > 40) console.error(`  … and ${errors.length - 40} more`);
  process.exit(1);
}
console.log(`PASS — our-day verified (locales: ${LOCALES.join(',')})`);
