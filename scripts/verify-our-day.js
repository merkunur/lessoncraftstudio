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
const TOOL_DIR = process.env.OUR_DAY_TOOL_DIR || path.join(REPO, 'mini tools');
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
  vm.runInContext(fs.readFileSync(path.join(TOOL_DIR, file), 'utf8'), sandbox);
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
  /* ⚠ `italiano` is GONE. It was the ACCIDENTAL one-locale instance of
     the mother-tongue lesson — the most-scheduled block of the week in
     every locale, shipped to exactly one — and it is superseded by the
     universal `mothertongue` card. The Italian panel caught that leaving
     both in would show `l'italiano` TWICE in the same band. */
  italiano: []
};
/* the universal cards the pedagogy panel ruled must exist everywhere */
for (const id of ['mothertongue', 'singing', 'guidedreading', 'onetoone', 'quiet', 'firedrill']) {
  for (const L of ALL) if (!visIds(L).includes(id)) E(`${id} missing from ${L} (must be universal)`);
}
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
  T.day = T.M.newDay();
  T._store = { v: 2, templates: {}, custom: [], recent: [] };
  T._notice = null;
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

const src = fs.readFileSync(path.join(TOOL_DIR, 'our-day.js'), 'utf8');
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


/* ===================== THE MODEL (ODM) ============================
   ⚠ THIS GATE IMPLEMENTS ITS OWN GROUND TRUTH. It never reads an
   expectation off the tool — every expected value below is written out
   by hand, because a gate that asks the tool what the answer should be
   is marking its own homework (19 of 51 mutations survived on
   number-sieve for exactly that reason).

   Env indirection: OUR_DAY_TOOL_DIR lets mutate-our-day.js point this
   file at a poisoned COPY of the tool.
   ================================================================= */
const M = T.M;
if (!M) E('the pure model is not exposed on the tool (a Node gate cannot drive it)');
else {

  const day = () => M.newDay();
  const build = (ids) => { const d = day(); ids.forEach((i) => M.addCard(d, i)); return d; };

  /* --- totality: a hand-edited blob must not be able to throw --- */
  [null, undefined, 0, '', [], 'x', { items: 'nope' }, { items: [null, 3, {}] },
   { items: [{ id: 'a' }], sunIdx: 999 }, { items: [{ id: 'a' }], sunIdx: -5 },
   { sunIdx: NaN }, { items: [{ id: 'a', time: { h: 'x', m: null } }] }].forEach((bad, i) => {
    let d;
    try { d = M.coerceDay(bad); } catch (e) { E(`coerceDay threw on malformed input #${i}: ${e.message}`); return; }
    if (!d || !d.items || d.items.length === undefined) E(`coerceDay returned a non-total day for input #${i}`);
    if (!(d.sunIdx >= 0 && d.sunIdx <= d.items.length)) E(`coerceDay left sunIdx out of range for input #${i} (${d.sunIdx})`);
  });
  if (M.coerceDay({ items: new Array(40).fill({ id: 'arrival' }) }).items.length !== 16) {
    E('coerceDay does not clamp to the 16-card ceiling');
  }

  /* --- the sun steps OVER skipped cards, and never onto one --- */
  {
    const d = build(['arrival', 'circle', 'math', 'lunch']);
    M.startDay(d);
    if (d.sunIdx !== 0) E('startDay did not put the sun on the first card');
    if (!M.skipCard(d, 2)) E('a future card could not be skipped');
    M.advance(d, true);
    if (d.sunIdx !== 1) E(`advance from 0 should land on 1, landed on ${d.sunIdx}`);
    M.advance(d, true);
    if (d.sunIdx !== 3) E(`advance must STEP OVER the skipped card 2 and land on 3, landed on ${d.sunIdx}`);
    if (d.items[d.sunIdx].skipped) E('the sun landed on a skipped card');
    M.advance(d, true);
    if (!M.atEnd(d)) E('the day did not reach its end state');
    if (M.advance(d, true) !== false) E('advance past the end must refuse');
  }

  /* --- the past is not editable --- */
  {
    const d = build(['arrival', 'circle', 'math']);
    M.startDay(d);
    M.advance(d, true);                       /* sun on 1 */
    if (M.canSkip(d, 0)) E('a FINISHED card must not be skippable');
    if (M.skipCard(d, 0) !== false) E('skipCard accepted a finished card');
    if (M.canSwap(d, 0)) E('a FINISHED card must not be swappable');
    if (M.swapCard(d, 0, 'art') !== false) E('swapCard accepted a finished card');
    if (M.canSkip(d, 1)) E('the CURRENT card must not be skippable (you advance past it)');
    if (!M.canSwap(d, 1)) E('the CURRENT card must be swappable — doing art instead, now, is a real event');
    if (!M.canSkip(d, 2)) E('a FUTURE card must be skippable');
  }

  /* --- the sun does not drift under an insert or a reorder --- */
  {
    const d = build(['arrival', 'circle', 'math', 'lunch']);
    M.startDay(d); M.advance(d, true); M.advance(d, true);   /* sun on 2 = math */
    const cur = d.items[d.sunIdx];
    M.addCard(d, 'art', 0);
    if (d.items[d.sunIdx] !== cur) E('inserting BEFORE the sun moved which activity is current');
    if (d.sunIdx !== 3) E(`sunIdx should follow the insert to 3, got ${d.sunIdx}`);
    M.addCard(d, 'music');
    if (d.items[d.sunIdx] !== cur) E('appending at the end moved the sun');
    M.moveCard(d, 0, 4);
    if (d.items[d.sunIdx] !== cur) E('a reorder moved which activity is current');
    M.removeCard(d, 0);
    if (d.items[d.sunIdx] !== cur) E('removing an earlier card moved which activity is current');
  }

  /* --- two-stage advance --- */
  {
    const d = build(['arrival', 'circle', 'math']);
    M.startDay(d);
    if (M.advance(d) !== 'warned') E('the first tap must ARM the warning, not cross');
    if (d.sunIdx !== 0) E('the warning tap moved the sun');
    if (!d.warned) E('the warning flag was not set');
    if (M.advance(d) !== 'moved') E('the second tap must cross');
    if (d.warned) E('the warning flag survived the crossing');
    if (d.sunIdx !== 1) E('the crossing did not move the sun');
    M.advance(d);                              /* warned again */
    if (M.unAdvance(d) !== 'unwarned') E('step-back must first cancel a pending warning');
    if (d.warned) E('the warning survived the step-back');
    /* force skips the warning entirely (double-tap + the settings opt-out) */
    const d2 = build(['arrival', 'circle']);
    M.startDay(d2);
    if (M.advance(d2, true) !== 'end' && d2.sunIdx !== 1) E('forced advance did not cross in one tap');
  }

  /* --- the step-back is always available, including at the end --- */
  {
    const d = build(['arrival', 'circle']);
    M.startDay(d);
    if (M.unAdvance(d) !== false) E('step-back from the first card must refuse');
    M.advance(d, true); M.advance(d, true);
    if (!M.atEnd(d)) E('expected the end state');
    if (M.unAdvance(d) !== 'moved') E('the step-back must work AFTER the day has ended');
    if (d.sunIdx !== 1) E(`step-back from the end should land on the last card, got ${d.sunIdx}`);
  }
  /* and it must walk back OVER skipped cards, not onto one */
  {
    const d = build(['arrival', 'circle', 'math', 'lunch']);
    M.startDay(d);
    M.skipCard(d, 1);
    M.advance(d, true);
    if (d.sunIdx !== 2) E(`advance should step over the skipped 1 to 2, got ${d.sunIdx}`);
    if (M.unAdvance(d) !== 'moved') E('step-back refused');
    if (d.sunIdx !== 0) E(`step-back must walk BACK over the skipped card to 0, got ${d.sunIdx}`);
    if (d.items[d.sunIdx].skipped) E('the step-back landed on a skipped card');
  }

  /* --- teacher-authored cards --- */
  {
    const list = [];
    if (M.addCustom(list, 'Morgonsamling', 'bubble', '#F2784B', 4, null) !== 'ok') E('a valid custom card was refused');
    if (list.length !== 1) E('the custom card was not appended');
    if (M.addCustom(list, 'Sangstund', 'bubble', '#F2784B', 4, null) !== 'duplicate') E('same icon+colour must be refused as duplicate');
    if (M.addCustom(list, 'morgonsamling', 'star', '#7FA860', 4, null) !== 'duplicate') E('the same NAME must be refused regardless of case');
    if (M.addCustom(list, 'x'.repeat(21), 'star', '#7FA860', 4, null) !== 'tooLong') E('an over-long name must be refused, not truncated');
    if (M.addCustom(list, '   ', 'star', '#7FA860', 4, null) !== 'empty') E('an empty name must be refused');
    if (M.cleanName('  Morgon samling  ') !== 'Morgonsamling') E('cleanName does not strip control characters');
    if (M.cleanName('Sång  stund') !== 'Sång stund') E('cleanName does not collapse whitespace');
    /* the cap, with icon AND colour varied so the duplicate rule is not
       what stops the loop (it was, the first time this was written) */
    const glyphs = ['star', 'book', 'note', 'ball', 'hand', 'bubble', 'pencil', 'brush', 'scissors', 'bag', 'screen', 'bell', 'plant', 'tree'];
    const tints = ['#146B5E', '#F2784B', '#E0A63C', '#7FA860', '#8A6B4A', '#B08CD0'];
    let n = 0;
    while (list.length < 30 && M.addCustom(list, 'card' + n, glyphs[n % glyphs.length], tints[n % tints.length], 4, null) === 'ok') n++;
    if (list.length !== 12) E(`the custom-card cap must be 12, got ${list.length}`);
    if (M.addCustom(list, 'one more', glyphs[13], tints[5], 4, null) !== 'listFull') E('the 13th must be refused WITH A REASON');
    /* a deletion must not blank the day it appears in */
    const d = day();
    M.addCard(d, list[0].id, undefined, { name: list[0].name, icon: list[0].icon, tint: list[0].tint });
    M.removeCustom(list, list[0].id);
    if (!d.items[0].snap || !d.items[0].snap.name) E('deleting a custom card destroyed the snapshot on the strip');
  }

  /* --- templates carry snapshots, so a plan is locale- and delete-safe --- */
  {
    const d = build(['arrival', 'showtell']);
    M.addCard(d, 'my:z', undefined, { name: 'Sångstund', icon: 'note', tint: '#F2784B' });
    const t = M.templateFromDay(d);
    if (t.length !== 3) E('templateFromDay lost a card');
    if (!t[2].snap || t[2].snap.name !== 'Sångstund') E('templateFromDay dropped the snapshot');
    const back = M.dayFromTemplate(t);
    if (back.items.length !== 3) E('dayFromTemplate lost a card');
    if (!back.items[2].snap || back.items[2].snap.name !== 'Sångstund') E('dayFromTemplate dropped the snapshot');
    if (M.dayFromTemplate(null).items.length !== 0) E('dayFromTemplate is not total on null');
    if (M.dayFromTemplate('nope').items.length !== 0) E('dayFromTemplate is not total on a string');
  }

  /* --- the ceiling holds --- */
  {
    const d = day();
    for (let i = 0; i < 20; i++) M.addCard(d, 'arrival');
    if (d.items.length !== 16) E(`MAX_CARDS must hold at 16, got ${d.items.length}`);
    if (M.addCard(d, 'circle') !== false) E('addCard past the ceiling must refuse');
  }
}

/* the strings a teacher can be shown must exist in all 11 locales */
['soonFrame', 'dayDoneTitle', 'dayDoneSpoken', 'removedOnDay', 'skipWhich', 'skipNoDay',
 'addOwn', 'makeTitle', 'makeHint', 'makeDeviceOnly', 'noticeFull', 'noticeLong',
 'noticeDup', 'noticeEmpty', 'closeAria', 'nextLbl'].forEach((k) => {
  const e = T.strings[k];
  if (!e) { E(`string "${k}" is missing entirely`); return; }
  ALL.forEach((l) => { if (!e[l]) E(`string "${k}" has no ${l}`); });
});
/* ⚠ aria-label English leaked into all 11 locales for two releases */
const src2 = fs.readFileSync(path.join(TOOL_DIR, 'our-day.js'), 'utf8');
if (/setAttribute\('aria-label',\s*'(?!\{)[a-z]/.test(src2)) {
  E('a hard-coded English aria-label is present (use a translated key)');
}
if (/\d+vh\b/.test(src2)) E('a vh unit is present — forbidden inside a manipulative (§23.6)');
if (/@media\s*\(min-width:\s*(7[0-9][0-9]|[89]\d\d|1\d{3})px\)[^{]*\{[^}]*(flex-direction|grid-template)/.test(src2)) {
  E('a LAYOUT media query above 700px — the tool page pins the iframe at 704');
}

/* ---- report ---- */
if (errors.length) {
  console.error(`FAIL — ${errors.length} error(s):`);
  errors.slice(0, 40).forEach((e) => console.error('  ✗ ' + e));
  if (errors.length > 40) console.error(`  … and ${errors.length - 40} more`);
  process.exit(1);
}
console.log(`PASS — our-day verified (locales: ${LOCALES.join(',')})`);
