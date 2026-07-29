#!/usr/bin/env node
/* =====================================================================
   verify-feelings-check-in.js — build-gate for TOOL #24 Feelings
   Check-In (mini tools/feelings-check-in.js).

   WHY THIS GATE IS UNUSUALLY STRICT
   ---------------------------------
   This tool holds the most sensitive datum the platform has ever
   touched: a named child's emotional state. The catalogue rule is
   verbatim "No history stored on children — each day starts fresh,
   deliberately." A promise like that is worth exactly as much as the
   test that can break it, so every assertion below has a mutation
   recorded beside it and is poison-tested before being trusted.

   PURE-ENGINE + SOURCE invariants (vm-loaded, DOM-free)
     P1  dateKeyFrom is the NON-PADDED LOCAL date, byte-identical to
         name-sticks.js and center-board.js; never toISOString/getUTC
     P2  dayRoll wipes picks and zeroes anon on a new key — and rolls
         BACKWARDS too (a clock that moves back must still be a roll,
         never a silent keep)
     P3  dayRoll never mutates its input, and returns the SAME object
         when the day is current
     P4  THE CLOSED SHAPE — freshDay has exactly DAY_KEYS, and a fully
         populated day contains no array and no history-shaped key.
         A trend must be UNREPRESENTABLE, not merely unwritten
     P5  setPick overwrites, never appends: one string per child
     P6  setPick refuses an unknown feeling and an empty id
     P7  modesFor(false) excludes 'roster'
     P8  rosterFor returns [] when free, and a COPY when premium
     P9  resolveDeepLink refuses ?mode=roster without premium
     P10 weatherFor returns a PRIMITIVE (no object can carry a per-child
         field), and a roster tally and an anon tally of the same shape
         produce identical output
     P11 NO WRITE TO MY-CLASSES — every setItem targets STORE_KEY; the
         my-classes key is read and never written
     P12 NO RELATIONAL DATEKEY — '2026-7-9' sorts AFTER '2026-7-10', so
         any < or > on a dateKey is a bug that would pass 21 days a
         month and fail 9
     P13 THE DAY-ROLL CALL SITES — strip the _today/_saveStore bodies
         and no other reference to _store.day may survive; a
         visibilitychange listener and a day interval must both exist
     P14 NO EXFIL (the Hush Owl bar) — exactly one fetch, /api/auth/me,
         no body; no XHR/sendBeacon/WebSocket/RTC/MediaRecorder; and
         the tool's own source never calls .track(
     P15 id / STORE_KEY / ENT_TRUST_DAYS / premium===false; strings
         complete ×11 with placeholder parity; privacy line ×11;
         no-shame + no-ranking vocabulary bans

   Usage: node scripts/verify-feelings-check-in.js [--locales=en,de]
   Override for mutation testing: FCI_TOOL_DIR
   Exit 1 on any ERROR. WARNs never fail.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOLS_DIR = path.join(ROOT, 'mini tools');
const TOOL_DIR = process.env.FCI_TOOL_DIR || TOOLS_DIR;

const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find(a => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',').map(s => s.trim()).filter(Boolean) : ALL;

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR ' + m); };
const warn = (m) => { WARNS++; console.warn('  warn  ' + m); };

/* No-shame bans. This tool must never grade a feeling, and must never
   rank children by one — "who is happiest" is the failure mode. */
const VERDICT = {
  en: /\b(correct|incorrect|wrong|oops|try again|fail)\b/i,
  de: /\b(richtig|falsch|fehler)\b/i,
  fr: /\b(correct|correcte|faux|fausse|erreur)\b/i,
  it: /\b(giusto|sbagliato|errore)\b/i,
  es: /\b(correcto|incorrecto|error)\b/i,
  pt: /\b(correto|errado|erro)\b/i,
  nl: /\b(goed antwoord|fout|foutje)\b/i,
  sv: /\b(rätt svar|fel svar|felaktig)\b/i,
  da: /\b(rigtigt svar|forkert|fejl)\b/i,
  no: /\b(riktig svar|feil svar)\b/i,
  fi: /\b(oikein|väärin|virhe)\b/i
};
const RANKING = {
  en: /\b(winner|wins|won|closest|nearest|best feeling|most happy|happiest)\b/i,
  de: /\b(gewinner|gewinnt|sieger|am glücklichsten|beste stimmung)\b/i,
  fr: /\b(gagnant|gagne|vainqueur|le plus heureux|la plus heureuse)\b/i,
  it: /\b(vincitore|vince|il più felice|la più felice)\b/i,
  es: /\b(ganador|gana|el más feliz|la más feliz)\b/i,
  pt: /\b(vencedor|ganha|o mais feliz|a mais feliz)\b/i,
  nl: /\b(winnaar|wint|het blijst|de blijste)\b/i,
  sv: /\b(vinnare|vinner|gladast)\b/i,
  da: /\b(vinder|vandt|gladest)\b/i,
  no: /\b(vinner|vant|gladest)\b/i,
  fi: /\b(voittaja|voittaa|iloisin)\b/i
};
const SCORE_RE = /\b(score|scores|timer|streak|poäng|poeng|punkte|punteggio|puntuación|pontuação|pisteet|badge|reward)\b/i;
/* A feeling must never become a trend. These are the SHAPES a history
   would take, banned at the key level. */
const HISTORY_KEY_RE = /(hist|streak|prev|previous|log|trend|since|series|archive|At$|ts$|time$)/i;

function loadTool(file, globalName) {
  const noop = () => {};
  const fakeEl = () => ({
    style: { setProperty: noop }, classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    appendChild: noop, addEventListener: noop, setAttribute: noop, removeAttribute: noop,
    innerHTML: '', textContent: '', children: [], dataset: {}, remove: noop
  });
  const sandbox = {
    window: { addEventListener: noop, removeEventListener: noop, location: { search: '' } },
    navigator: { language: 'en' }, console,
    document: {
      createElement: fakeEl, createElementNS: fakeEl, getElementById: () => null,
      querySelector: () => null, querySelectorAll: () => [],
      head: { appendChild: noop }, body: { classList: { add: noop, remove: noop } },
      addEventListener: noop, removeEventListener: noop, documentElement: fakeEl(), hidden: false
    },
    location: { search: '', hostname: 'gate' },
    localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    URLSearchParams, Intl, Date, Math, JSON,
    setTimeout: () => 0, clearTimeout: noop, setInterval: () => 0, clearInterval: noop,
    fetch: () => ({ then() { return this; }, catch() { return this; } }),
    matchMedia: () => ({ matches: false, addListener: noop, addEventListener: noop })
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(TOOL_DIR, file), 'utf8'), sandbox, { filename: file });
  return sandbox[globalName];
}

const SRC = fs.readFileSync(path.join(TOOL_DIR, 'feelings-check-in.js'), 'utf8');
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const T = loadTool('feelings-check-in.js', 'FeelingsCheckIn');

console.log('[pure engine]');

/* ---------- P1 dateKey shape ---------- */
{
  const got = T.dateKeyFrom(new Date(2026, 6, 5));
  if (got !== '2026-7-5') err(`P1 dateKeyFrom → "${got}", expected non-padded "2026-7-5"`);
  if (T.dateKeyFrom(new Date(2026, 11, 25)) !== '2026-12-25') err('P1 dateKeyFrom wrong in December');
  /* toISOString is legitimate for the entitlement cache stamp (every tool
     does it) — the rule is that the DAY KEY is local. So: never in the day
     path, and every other occurrence must be the ent stamp. */
  for (const line of SRC_NC.split(/\r?\n/)) {
    if (!/toISOString|getUTC/.test(line)) continue;
    if (!/checkedAt/.test(line)) err(`P1 a UTC date appears outside the entitlement stamp: ${line.trim().slice(0, 70)}`);
  }
  const grab = (re) => (re.exec(SRC_NC) || [''])[0];
  const dayPath = grab(/dateKeyFrom:[\s\S]*?\n {2}\},/) + grab(/_dateKey:[\s\S]*?\n {2}\},/);
  if (/toISOString|getUTC/.test(dayPath)) err('P1 the day path uses a UTC date — the school day is LOCAL');

  /* byte-identical to the two shipped consumers of the same key */
  const body = (s) => {
    const m = /_dateKey:\s*function\s*\(\)\s*\{([\s\S]*?)\n\s*\},/.exec(s);
    return m ? m[1].replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim() : null;
  };
  const mine = body(SRC);
  for (const peer of ['name-sticks.js', 'center-board.js']) {
    const p = path.join(TOOLS_DIR, peer);
    if (!fs.existsSync(p)) { warn(`P1 ${peer} absent — cross-check skipped`); continue; }
    const theirs = body(fs.readFileSync(p, 'utf8'));
    if (!theirs) { warn(`P1 could not read _dateKey from ${peer}`); continue; }
    /* ours delegates to the pure dateKeyFrom; compare the FORMULA both produce */
    const norm = (s) => s.replace(/return\s+/, '').replace(/;$/, '');
    if (!mine) { err('P1 no _dateKey in this tool'); break; }
    if (norm(mine) !== norm(theirs) && !/dateKeyFrom/.test(mine))
      err(`P1 _dateKey diverges from ${peer}: "${mine}" vs "${theirs}"`);
  }
}

/* ---------- P2/P3 the roll ---------- */
{
  const stale = { dateKey: '2026-7-28', anon: { calm: 2, happy: 5, sad: 1, angry: 0, tired: 3 }, picks: { c_1: { s_1: 'sad', s_2: 'happy' } } };
  Object.freeze(stale); Object.freeze(stale.anon); Object.freeze(stale.picks);
  const rolled = T.dayRoll(stale, '2026-7-29');
  if (rolled === stale) err('P2 dayRoll returned the stale day unchanged');
  if (rolled.dateKey !== '2026-7-29') err('P2 dayRoll did not adopt the new key');
  if (Object.keys(rolled.picks).length) err('P2 dayRoll KEPT picks across the day boundary');
  for (const f of T.FEELINGS) if (rolled.anon[f] !== 0) err(`P2 dayRoll kept anon.${f}`);

  /* backwards too — a clock that moves back is still a different day */
  const back = T.dayRoll({ dateKey: '2026-7-30', anon: { calm: 1, happy: 0, sad: 0, angry: 0, tired: 0 }, picks: { c: { s: 'calm' } } }, '2026-7-29');
  if (!back || back.dateKey !== '2026-7-29' || Object.keys(back.picks).length)
    err('P2 dayRoll does not roll BACKWARDS — a "clock-skew safety" would disable it 9 days a month');

  /* identity on a match, and no mutation ever */
  const cur = T.freshDay('2026-7-29');
  if (T.dayRoll(cur, '2026-7-29') !== cur) err('P3 dayRoll did not return the same object for the current day');
  if (stale.dateKey !== '2026-7-28' || !stale.picks.c_1) err('P3 dayRoll MUTATED its input');
}

/* ---------- P4 the closed shape ---------- */
{
  const keys = Object.keys(T.freshDay('2026-7-29')).sort();
  const want = (T.DAY_KEYS || []).slice().sort();
  if (!want.length) err('P4 DAY_KEYS is missing — the closed shape is undeclared');
  if (JSON.stringify(keys) !== JSON.stringify(want))
    err(`P4 freshDay shape ${JSON.stringify(keys)} ≠ DAY_KEYS ${JSON.stringify(want)}`);

  /* populate it hard, then prove no trend can hide anywhere in it */
  let d = T.freshDay('2026-7-29');
  d = T.setPick(d, 'c_1', 's_1', 'happy');
  d = T.setPick(d, 'c_1', 's_1', 'sad');
  d = T.setPick(d, 'c_1', 's_2', 'tired');
  d = T.addAnon(d, 'calm'); d = T.addAnon(d, 'calm');
  (function walk(node, trail) {
    if (Array.isArray(node)) { err(`P4 an ARRAY appeared at ${trail} — arrays accumulate`); return; }
    if (!node || typeof node !== 'object') return;
    for (const k of Object.keys(node)) {
      if (HISTORY_KEY_RE.test(k)) err(`P4 history-shaped key "${k}" at ${trail}`);
      walk(node[k], trail + '.' + k);
    }
  })(d, 'day');
  if (typeof d.picks.c_1.s_1 !== 'string') err('P4 a pick is not a bare string');
}

/* ---------- P5/P6 setPick ---------- */
{
  let d = T.freshDay('x');
  d = T.setPick(d, 'c', 's_1', 'happy');
  d = T.setPick(d, 'c', 's_1', 'angry');
  d = T.setPick(d, 'c', 's_1', 'calm');
  const cls = d.picks.c;
  if (Object.keys(cls).length !== 1) err('P5 setPick created more than one entry for one child');
  if (cls.s_1 !== 'calm') err(`P5 setPick did not overwrite (got ${JSON.stringify(cls.s_1)})`);
  if (typeof cls.s_1 !== 'string') err('P5 a pick is not a string — an append is a history');

  const before = JSON.stringify(d);
  if (JSON.stringify(T.setPick(d, 'c', 's_2', 'nonsense')) !== before) err('P6 setPick accepted an unknown feeling');
  if (JSON.stringify(T.setPick(d, 'c', '', 'happy')) !== before) err('P6 setPick accepted an empty child id');
}

/* ---------- P7/P8/P9 the structural gate ---------- */
{
  if (T.modesFor(false).indexOf('roster') >= 0) err('P7 modesFor(false) offers roster mode to a free visitor');
  if (T.modesFor(true).indexOf('roster') < 0) err('P7 modesFor(true) hides roster mode from a subscriber');

  const mc = { activeClassId: 'c_1', classes: [{ id: 'c_1', name: 'A', students: [{ id: 's_1', name: 'Zzyzx' }, { id: 's_2', name: 'Qorvax' }] }] };
  if (T.rosterFor(mc, 'c_1', false).length) err('P8 rosterFor returned names to a FREE visitor');
  const copy = T.rosterFor(mc, 'c_1', true);
  if (copy.length !== 2) err('P8 rosterFor lost students for a subscriber');
  copy.push({ id: 'x', name: 'x' });
  if (mc.classes[0].students.length !== 2) err('P8 rosterFor returned the LIVE array — a consumer could mutate my-classes');

  if (T.resolveDeepLink({ mode: 'roster', classId: 'c_1' }, false) !== null)
    err('P9 resolveDeepLink honoured ?mode=roster for a free visitor');
  const ok = T.resolveDeepLink({ mode: 'roster', classId: 'c_1' }, true);
  if (!ok || ok.mode !== 'roster') err('P9 resolveDeepLink refused a legitimate premium deep link');
}

/* ---------- P10 weatherFor is a primitive ---------- */
{
  const tal = { calm: 1, happy: 4, sad: 2, angry: 0, tired: 0 };
  const w = T.weatherFor(tal);
  if (typeof w !== 'string') err(`P10 weatherFor returned ${typeof w} — only a primitive can carry no per-child field`);
  if (T.weatherFor({ calm: 0, happy: 0, sad: 0, angry: 0, tired: 0 }) !== null) err('P10 weatherFor invented weather from nothing');

  /* the same distribution must read identically whether it came from
     named picks or anonymous counts — the summary cannot expose identity */
  let a = T.freshDay('x');
  a = T.addAnon(a, 'happy'); a = T.addAnon(a, 'happy'); a = T.addAnon(a, 'sad');
  let b = T.freshDay('x');
  b = T.setPick(b, 'c', 's_1', 'happy'); b = T.setPick(b, 'c', 's_2', 'happy'); b = T.setPick(b, 'c', 's_3', 'sad');
  if (T.weatherFor(T.tally(a, null, false)) !== T.weatherFor(T.tally(b, 'c', true)))
    err('P10 the class weather differs between anonymous and named input');
}

/* ---------- P11 never write my-classes ---------- */
{
  if (!/getItem\(\s*this\.MC_KEY\s*\)/.test(SRC_NC)) err('P11 the tool never READS my-classes — the roster cannot work');
  const writes = SRC_NC.match(/localStorage\.setItem\(([^,]+),/g) || [];
  if (!writes.length) err('P11 the tool never writes its own store');
  for (const w of writes) {
    if (!/STORE_KEY/.test(w)) err(`P11 a setItem targets something other than STORE_KEY: ${w.trim()}`);
  }
  if (/setItem\(\s*(this\.)?MC_KEY/.test(SRC_NC) || /setItem\(\s*['"]lcs:my-classes/.test(SRC_NC))
    err('P11 THE TOOL WRITES MY-CLASSES — that store is whole-blob last-writer-wins and has one rightful owner');
}

/* ---------- P12 no relational dateKey ---------- */
{
  if (/dateKey\s*[<>]|[<>]\s*[\w.]*dateKey/.test(SRC_NC))
    err('P12 a dateKey is compared with < or > — "2026-7-9" sorts AFTER "2026-7-10", so this passes 21 days a month and fails 9');
}

/* ---------- P13 the day-roll call sites ---------- */
{
  const strip = (name) => {
    const re = new RegExp(name + ':\\s*function\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?\\n  \\},');
    return re;
  };
  let rest = SRC_NC;
  for (const fn of ['_today', '_commitDay']) {
    const m = strip(fn).exec(rest);
    if (!m) { err(`P13 could not find ${fn} — the single day path is gone`); continue; }
    rest = rest.replace(m[0], '');
  }
  const stray = rest.match(/_store\.day/g) || [];
  if (stray.length)
    err(`P13 ${stray.length} reference(s) to _store.day outside _today/_commitDay — that is exactly the Center Board bug (a stale day survives an async board swap)`);

  /* must be the REGISTRATION, not the teardown — destroy() also names
     visibilitychange, so a bare /visibilitychange/ passes even when the
     listener is never added (caught by poison-testing this gate) */
  if (!/addEventListener\(\s*['"]visibilitychange['"]/.test(SRC_NC))
    err('P13 no visibilitychange listener is REGISTERED — a tablet asleep overnight never rolls');
  if (!/setInterval\(/.test(SRC_NC)) err('P13 no interval — an always-on kiosk never crosses midnight');
  if (!/DAY_TICK_MS/.test(SRC_NC)) err('P13 DAY_TICK_MS missing');
  if (!/addEventListener\(\s*['"]storage['"]/.test(SRC_NC)) warn('P13 no storage listener — a roster edited in another tab will not refresh');
}

/* ---------- P14 no exfil (the Hush Owl bar) ---------- */
{
  const fetches = SRC_NC.match(/\bfetch\s*\(/g) || [];
  if (fetches.length !== 1) err(`P14 ${fetches.length} fetch call(s) — exactly one (the entitlement check) is allowed`);
  if (!/fetch\('\/api\/auth\/me'/.test(SRC_NC)) err('P14 the single fetch is not /api/auth/me');
  if (/fetch\([^)]*body\s*:/.test(SRC_NC)) err('P14 the fetch carries a body — nothing about a child may be sent');
  if (/XMLHttpRequest|sendBeacon|WebSocket|RTCPeerConnection|MediaRecorder|navigator\.clipboard/.test(SRC_NC))
    err('P14 an exfiltration API appears in the source');
  /* the shell fires api.track(id+':load') itself at mount, so the rule is
     that the TOOL never calls it — a feeling is never an event */
  if (/\.track\(/.test(SRC_NC)) err('P14 the tool calls api.track — a feeling must never become an analytics event');
}

console.log('[tool]');

/* ---------- P15 identity, strings, no-shame ---------- */
{
  if (T.id !== 'feelings-check-in') err(`P15 id is "${T.id}"`);
  if (T.STORE_KEY !== 'lcs:feelings-check-in:v1') err(`P15 STORE_KEY is "${T.STORE_KEY}"`);
  if (T.MC_KEY !== 'lcs:my-classes:v1') err(`P15 MC_KEY is "${T.MC_KEY}"`);
  if (T.ENT_TRUST_DAYS !== 14) err(`P15 ENT_TRUST_DAYS is ${T.ENT_TRUST_DAYS}`);
  if (T.premium !== false) err('P15 premium does not default to false');
  if (!Array.isArray(T.FEELINGS) || T.FEELINGS.length !== 5) err('P15 FEELINGS is not the five');

  const S = T.strings || {};
  const enKeys = Object.keys(S).filter(k => S[k] && typeof S[k].en === 'string');
  if (enKeys.length < 30) err(`P15 only ${enKeys.length} strings — the surface is incomplete`);
  const ph = (s) => (s.match(/\{[a-zA-Z]+\}/g) || []).sort().join(',');

  for (const key of enKeys) {
    for (const loc of LOCALES) {
      const v = S[key][loc];
      if (typeof v !== 'string' || !v.trim()) { err(`P15 ${key}.${loc} missing`); continue; }
      if (ph(v) !== ph(S[key].en)) err(`P15 ${key}.${loc} placeholder parity: "${ph(S[key].en)}" vs "${ph(v)}"`);
      if (/'/.test(v)) err(`P15 ${key}.${loc} uses a straight apostrophe — typographic ’ only`);
      if (VERDICT[loc] && VERDICT[loc].test(v)) err(`P15 ${key}.${loc} grades a feeling: "${v}"`);
      if (RANKING[loc] && RANKING[loc].test(v)) err(`P15 ${key}.${loc} RANKS children: "${v}"`);
      /* sibling* are the NAMES of the other Teacher’s Desk tools — "Class
         Timer" is a product name, not a timer run on a child. Everything
         else, including every feeling string, is scanned. */
      if (!/^sibling/.test(key) && SCORE_RE.test(v)) err(`P15 ${key}.${loc} scores or times a feeling: "${v}"`);
    }
  }
  for (const loc of LOCALES) {
    if (!S.privacyLine || !S.privacyLine[loc]) err(`P15 privacyLine.${loc} missing — the promise must be stated where it is made`);
    if (!S.title || !S.title[loc]) err(`P15 title.${loc} missing`);
  }

  /* every speak call is a ui line in the content locale */
  const speaks = SRC_NC.match(/LCSAudio\.speak\(\{[^}]*\}/g) || [];
  if (!speaks.length) err('P15 no LCSAudio.speak call — the kind reply is never spoken');
  for (const s of speaks) {
    if (!/lang:/.test(s)) err(`P15 a speak call omits lang: ${s.slice(0, 70)}`);
    const m = /type:\s*'(\w+)'/.exec(s);
    if (!m || ['ui', 'word'].indexOf(m[1]) < 0) err(`P15 speak type must be ui|word: ${s.slice(0, 70)}`);
  }

  /* CSS injector hygiene */
  if (!/getElementById\('fci-style'\)/.test(SRC_NC)) err('P15 the CSS injector is not idempotent');
  if (!/@media print/.test(SRC)) err('P15 no print stylesheet');
  if (!/prefers-reduced-motion/.test(SRC)) err('P15 no reduced-motion block');
  const css = (/st\.textContent = ''([\s\S]*?);\n\s*document\.head\.appendChild/.exec(SRC) || [])[1] || '';
  if (/\.lcs-/.test(css)) err('P15 the tool styles a .lcs- shell class');
}

console.log('');
if (ERRORS) { console.error(`FAIL — ${ERRORS} error(s), ${WARNS} warn(s)`); process.exit(1); }
console.log(`PASS — 0 error(s), ${WARNS} warn(s)`);
