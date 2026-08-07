#!/usr/bin/env node
/* =====================================================================
   verify-home-language-bridge.js — MEASURED build-gate for the Say It
   Board.  Fix the tool, never the gate.
   ---------------------------------------------------------------------
   ⚠⚠ THE PREVIOUS VERSION OF THIS FILE REPORTED `PASS — 0 errors` ON A
   BOARD THAT COULD NOT SAY NO, drew the toilet as a door, printed a
   blank page for any free teacher who pressed Ctrl+P, and shipped ten
   locales no native speaker had ever read. It was not a weak gate — its
   twelve blocks were well built — it simply measured a different set of
   things than the ones that were wrong. That is the standing lesson:
   A GATE CERTIFIES EVERYTHING IT DOES NOT MEASURE.

   Worse, it actively required a defect: H9 asserted
   `ENT_TRUST_DAYS === 14` while the tool referenced that constant
   exactly once, in its own declaration. The gate mandated dead code.

   ⚠ THE GATE IMPLEMENTS ITS OWN GROUND TRUTH. Reading an expectation
   off the tool means the gate marks its own homework.

   Usage: node scripts/verify-home-language-bridge.js [--locales=en,de]
   Override for mutation testing: HLB_TOOL_DIR
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOOL_DIR = process.env.HLB_TOOL_DIR || path.join(ROOT, 'mini tools');
const FILE = path.join(TOOL_DIR, 'home-language-bridge.js');

const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find((a) => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',').map((s) => s.trim()).filter(Boolean) : ALL;

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR ' + m); };
const warn = (m) => { WARNS++; console.warn('  warn  ' + m); };

const SRC = fs.readFileSync(FILE, 'utf8');
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

/* the tool exports itself, so the model is driven directly rather than
   reconstructed — a gate that reimplements what it checks is testing a
   copy. */
let T;
try { T = require(FILE); }
catch (e) { console.error('  ERROR the tool does not load: ' + e.message); process.exit(1); }
if (!T || T.id !== 'home-language-bridge') { console.error('  ERROR wrong module'); process.exit(1); }
const M = T.M;

/* ⚠ NON-VACUITY FIRST, EVERY TIME. */
if (!M || !T.PHRASES || Object.keys(T.PHRASES).length < 40 || Object.keys(T.ICONS).length < 40) {
  console.error('  FATAL the tool exposes too little to measure — refusing to report on it.');
  process.exit(1);
}

const ASSESS = /(?<!\p{L})(?:level|score|progress|beginner|fluency|proficien\w*|niveau|nivå|nivel|punkte|poäng|poeng|pisteet|taso|stufe)(?!\p{L})/iu;

console.log('[the fence]');

/* ---------- H1 the structural fence ---------- */
(function () {
  if (/pww-index/.test(SRC_NC)) err('H1 reads pww-index — that belongs in Picture Word Wall');
  if (/image-library|\.webp|themeDir/.test(SRC_NC)) err('H1 builds an image URL — the board is icon-first and offline');
  const fetches = SRC_NC.match(/fetch\s*\(/g) || [];
  /* ⚠ EXACTLY ONE. The repertoire is INLINE on purpose: a child on a
     school tablet with no network still has a voice, which is worth
     more than the ~30KB it costs. */
  if (fetches.length !== 1) err(`H1 expected exactly ONE fetch (auth only), found ${fetches.length}`);
  if (!/fetch\('\/api\/auth\/me'/.test(SRC_NC)) err('H1 the auth fetch is missing');
  console.log('  H1 fence ok (no vocabulary index, no images, offline by construction)');
}());

/* ---------- H2 every phrase has a DRAWN icon, and no silent fallback ---------- */
(function () {
  var ids = [], i;
  for (i = 0; i < T.CORE.length; i++) ids.push(T.CORE[i].id);
  for (i = 0; i < T.CATEGORIES.length; i++) ids = ids.concat(T.CATEGORIES[i].ids);
  ids.forEach(function (id) {
    if (!T.PHRASES[id]) { err(`H2 ${id} is on the board with no phrase`); return; }
    var card = M.cardFor(id, 'en', null);
    if (!card) { err(`H2 ${id} does not resolve`); return; }
    if (!T.ICONS[card.icon]) err(`H2 ${id}: icon "${card.icon}" is not drawn`);
  });
  /* ⚠ AN UNKNOWN ICON MUST NOT SILENTLY BECOME A CURATED ONE. The v2
     build fell back to ICONS.hand for any unknown name, so a typo
     rendered the HELP card's picture — on a communication board a wrong
     icon is a wrong utterance. */
  if (/ICONS\[name\]\s*\|\|\s*ICONS\.(hand|help|toilet|stop)/.test(SRC_NC)) {
    err('H2 an unknown icon falls back to a CURATED picture — that is a wrong utterance');
  }
  if (!/ICONS\[name\]\s*\|\|\s*ICONS\.saybubble/.test(SRC_NC)) {
    err('H2 the icon fallback is not the neutral bubble');
  }
  console.log(`  H2 icons ok (${ids.length} board phrases, all drawn, no curated fallback)`);
}());

/* ---------- H3 the board works with NO home language ---------- */
(function () {
  var st = M.store(null);
  var none = M.boardFor(st, 'de', 'body');
  if (none.length < 20) err(`H3 the board is incomplete without a home language (${none.length})`);
  none.forEach(function (c) {
    if (!c.text) err(`H3 ${c.id}: no classroom line`);
    if (c.home !== null) err(`H3 ${c.id}: invented a home line when there is none`);
  });
  var st2 = M.store({ home: 'es' });
  M.boardFor(st2, 'de', 'body').forEach(function (c) {
    if (!c.home) err(`H3 ${c.id}: home line missing when a home language IS set`);
  });
  /* an unsupported language degrades to pictures, never to English
     pretending to be the child's language */
  var st3 = M.store({ home: 'uk' });
  if (st3.home !== null) err('H3 accepted a language we do not have');
  console.log('  H3 icon-first ok (complete with no home language; never invents one)');
}());

console.log('[the board]');

/* ---------- H4 the repertoire ---------- */
(function () {
  var keys = Object.keys(T.PHRASES);
  if (keys.length < 60) err(`H4 only ${keys.length} phrases — the v2 board shipped 12 and could not say no`);
  keys.forEach(function (k) {
    ALL.forEach(function (l) {
      var v = T.PHRASES[k][l];
      if (!v) { err(`H4 ${k}.${l} missing`); return; }
      if (/\{|\}/.test(v)) err(`H4 ${k}.${l} carries a placeholder`);
      if (/'/.test(v)) err(`H4 ${k}.${l} straight apostrophe`);
    });
  });
  ALL.forEach(function (l) {
    var seen = {};
    keys.forEach(function (k) {
      var v = T.PHRASES[k][l];
      if (seen[v]) err(`H4 ${l}: ${JSON.stringify(v)} is used by both ${seen[v]} and ${k}`);
      seen[v] = k;
    });
  });
  console.log(`  H4 repertoire ok (${keys.length} phrases x ${ALL.length} locales, distinct within each)`);
}());

/* ---------- ⭐ H4b THE BOARD CAN SAY NO ----------
   The one defect the whole rebuild exists to fix. All twelve v2 phrases
   were REQUESTS: no yes, no no, no stop, no it-hurts. A child handed
   only requests is trained into a supplicant. */
(function () {
  var MUST = ['yes', 'no', 'stop', 'hurt'];
  var core = T.CORE.map(function (c) { return c.id; });
  ['yes', 'no', 'stop'].forEach(function (id) {
    if (core.indexOf(id) < 0) err(`H4b "${id}" is not in the CORE — a refusal a child must hunt for is not a refusal`);
  });
  MUST.forEach(function (id) {
    if (!T.PHRASES[id]) err(`H4b the board cannot say "${id}"`);
  });
  console.log('  H4b the board can say yes, no, stop and it-hurts');
}());

/* ---------- H5 endonyms, and NO FLAGS ---------- */
(function () {
  ALL.forEach(function (l) {
    var e = T.ENDONYM[l];
    if (!e || e === l || /^[a-z]{2}$/.test(e)) err(`H5 ${l}: "${e}" is not a language name`);
  });
  [['de', 'German'], ['fr', 'French'], ['es', 'Spanish'], ['fi', 'Finnish'], ['sv', 'Swedish'],
   ['nl', 'Dutch'], ['it', 'Italian'], ['pt', 'Portuguese'], ['da', 'Danish'], ['no', 'Norwegian']]
    .forEach(function (p) { if (T.ENDONYM[p[0]] === p[1]) err(`H5 ${p[0]} uses the English exonym`); });
  /* ⚠ WALKED OVER THE RUNTIME VALUES AS WELL AS THE SOURCE: a source
     scan alone misses '\u{1F1E9}\u{1F1EA}', which is a flag by the time
     a child sees it. */
  var FLAG = /[\u{1F1E6}-\u{1F1FF}]/u;
  (function walk(v, at) {
    if (typeof v === 'string') { if (FLAG.test(v)) err(`H5 a flag codepoint at ${at}`); return; }
    if (Array.isArray(v)) { v.forEach(function (x, i) { walk(x, at + '[' + i + ']'); }); return; }
    if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { walk(v[k], at + '.' + k); });
  }({ E: T.ENDONYM, P: T.PHRASES, S: T.strings, I: T.ICONS, ST: T.STARTER_TEXT }, 'tool'));
  if (FLAG.test(SRC)) err('H5 a flag codepoint is present in the source');
  console.log('  H5 endonyms ok, no flags');
}());

console.log('[stance]');

/* ---------- H6 parity: one text class, home line FIRST ---------- */
(function () {
  var fn = (SRC_NC.match(/_cardEl: function[\s\S]*?\n    \},/) || [''])[0];
  /* ⚠ THE FIRST VERSION OF THIS CHECK COMPARED THE INDEX OF THE STRING
     "card.home" AGAINST "if (text)", AND A MUTATION SURVIVED IT: gating
     the home block on `false` left the identifier sitting in the
     (now-dead) body at the same index, so the order still "looked"
     right. Assert the two things that actually matter — the block is
     gated on the home line EXISTING, and its append comes first. */
  if (!/if \(card\.home\) \{/.test(fn)) err('H6 the home line is not gated on there being one');
  var ah = fn.indexOf('b.appendChild(h)'), at = fn.indexOf('b.appendChild(t)');
  if (ah === -1 || at === -1) err('H6 could not find both appends in _cardEl');
  else if (ah > at) err('H6 the classroom line is appended before the home line');
  if ((fn.match(/'hlb-text'/g) || []).length < 2) err('H6 the two lines do not share one text class');
  if (/\.hlb-(home|second|minor)\b/.test(SRC)) err('H6 a per-side text class exists');
  if (/\.hlb-text[^{]*\{[^}]*opacity/.test(SRC)) err('H6 the shared text class carries an opacity');
  /* ⚠ AND THE LABEL CARRIES BOTH. An aria-label overrides inner text,
     so a label naming only the classroom line makes the home language
     ABSENT for assistive technology. */
  if (!/aria-label', label/.test(SRC_NC)) err('H6 the aria-label does not carry both lines');
  console.log('  H6 parity ok (one text class, home first, both in the label)');
}());

/* ---------- H7 no assessment of the child ---------- */
(function () {
  ['level', 'score', 'progress', 'proficiency'].forEach(function (f) {
    if (new RegExp('\\bthis\\.' + f + '\\s*[=:]').test(SRC_NC)) err(`H7 the model carries "${f}"`);
  });
  Object.keys(T.strings).forEach(function (k) {
    LOCALES.forEach(function (loc) {
      var v = T.strings[k][loc];
      if (v && ASSESS.test(v)) err(`H7 ${k}.${loc} uses assessment vocabulary: ${JSON.stringify(v)}`);
    });
  });
  console.log('  H7 no assessment surface');
}());

/* ---------- ⭐ H7b NO USAGE LOG, AND IT IS STRUCTURAL ----------
   "Tapped `toilet` nine times" is a behavioural record of a vulnerable
   child and will be read as evidence in ways that harm. Every product
   in this space ships it as "insights" and it is the harmful part. */
(function () {
  var calls = SRC_NC.match(/api\.track\([^)]*\)/g) || [];
  calls.forEach(function (c) {
    if (/card|phrase|\bid\b|cat:|\.id/.test(c)) err(`H7b a track call carries a phrase identity: ${c}`);
  });
  if (/(count|tally|times|uses)\s*\[\s*(card|phrase)/i.test(SRC_NC)) err('H7b a per-phrase counter exists');
  /* the recency list is the adult's icon picking, never a child's taps */
  if (/_noteRecent\((?!.*icon)/.test(SRC_NC)) warn('H7b check _noteRecent only ever records an icon');
  console.log(`  H7b no usage log (${calls.length} track calls, none carrying a phrase)`);
}());

/* ---------- H8 the voice guard is honest AND ready ---------- */
(function () {
  var V = function (a) { return a.map(function (l) { return { lang: l }; }); };
  if (M.hasVoice('fi', V(['de-DE', 'en-US'])) !== false) err('H8 claims a Finnish voice where there is none');
  if (M.hasVoice('de', V(['de-DE'])) !== true) err('H8 misses a present German voice');
  if (M.hasVoice('no', V(['nb-NO'])) !== true) err('H8 no/nb mapping broken');
  if (M.hasVoice('fi', []) !== true) err('H8 must be permissive when the device reports none');
  /* ⚠ AN EMPTY LIST IS "NOT YET", NOT "YES", AND MUST NOT BE CACHED.
     Chrome returns [] until voiceschanged fires; the v2 build cached the
     optimistic answer, so on the very device where the voice was missing
     the warning could never appear. */
  if (!/addEventListener\('voiceschanged'/.test(SRC_NC)) err('H8 voiceschanged is never bound — the guard cannot work on Chrome');
  if (!/_voiceBound/.test(SRC_NC)) err('H8 the listener is not bound exactly once');
  var canSpeak = (SRC_NC.match(/_canSpeak: function[\s\S]*?\n    \},/) || [''])[0];
  if (/_voiceState\s*=\s*true/.test(canSpeak)) err('H8 the provisional answer is CACHED — that is the v2 defect');
  console.log('  H8 voice guard ok (never speaks a language the device lacks; empty means not-yet)');
}());

/* ---------- ⭐ H8b NEVER SPEAK A STRING WE DO NOT HAVE ----------
   The v2 build resolved `p.t[classroom] || p.t.en` and spoke it tagged
   as the classroom language: English words in a Finnish voice, arriving
   through the one path the voice guard cannot see. Latent then; ACTIVE
   the moment a teacher writes her own phrase. */
(function () {
  var c = M.cardFor('yes', 'zz', null);
  if (!c) { err('H8b cardFor returned nothing for an unknown locale'); return; }
  if (c.text !== null) err('H8b invented a line for a locale we do not have');
  if (c.speakable !== false) err('H8b a card with no string in the asked language is marked speakable');
  var known = M.cardFor('yes', 'de', null);
  if (!known.speakable) err('H8b a card we DO have is not speakable');
  if (/\|\|\s*(p\.)?t\.en/.test(SRC_NC)) err('H8b an `|| .en` fallback is back on the resolve path');
  console.log('  H8b a card we cannot say is SHOWN, not said');
}());

/* ---------- H9 identity, entitlement, no exfil ---------- */
(function () {
  if (T.STORE_KEY !== 'lcs:home-language-bridge:v2') err('H9 STORE_KEY (the shape changed, so the key must)');
  if (T.premium !== false) err('H9 premium must default false');
  if (typeof T.premiumKnown !== 'boolean') err('H9 premiumKnown is missing — unknown entitlement cannot be pessimistic without it');
  /* ⚠ THE CONSTANT MUST BE READ, NOT MERELY DECLARED. The v2 gate
     asserted its VALUE while the tool referenced it exactly once, in
     its own declaration — a gate mandating dead code. */
  var uses = (SRC_NC.match(/ENT_TRUST_DAYS/g) || []).length;
  if (uses < 2) err(`H9 ENT_TRUST_DAYS is declared and never read (${uses} occurrence)`);
  var ent = (SRC_NC.match(/_fetchEntitlement: function[\s\S]*?\n    \},/) || [''])[0];
  if (!/trustCache/.test(ent)) err('H9 there is no cache-trust path');
  if (!/\.catch\(trustCache\)/.test(ent)) err('H9 the cached trust is not limited to a NETWORK failure');
  [/XMLHttpRequest/, /sendBeacon/, /WebSocket/, /RTCPeerConnection/, /MediaRecorder/].forEach(function (re) {
    if (re.test(SRC_NC)) err(`H9 network surface ${re}`);
  });
  if (/fetch\([^)]*body\s*:/.test(SRC_NC)) err('H9 a fetch carries a body');
  console.log('  H9 identity + entitlement + no-exfil ok');
}());

/* ---------- ⭐ H10 A TAP HAS A CONSEQUENCE WITH THE SOUND OFF ----------
   Schools mute tablets. The v2 board's only response to a tap was a 1px
   :active transform; `_say` returned early with the voice off, so a
   newcomer tapped "I need the toilet" and nothing happened at all. The
   shared liveness gate scored it live anyway, because its signature
   includes window.__spoken and the default is voice-on. */
(function () {
  var tap = (SRC_NC.match(/_tapCard: function[\s\S]*?\n    \},/) || [''])[0];
  if (!tap) { err('H10 could not find the tap handler'); return; }
  if (!/classList\.add\('hlb-said'\)/.test(tap)) err('H10 a tap adds no visible state');
  if (!/announce\(/.test(tap)) err('H10 a tap does not reach the live region');
  if (!/\.hlb-card\.hlb-said\{/.test(SRC.replace(/\s/g, ''))) err('H10 the said state has no styling — it would be invisible');
  console.log('  H10 a tap changes the board even on a muted tablet');
}());

/* ---------- ⭐ H11 THE DIGNITY CARDS ARE SHOWN, NOT SAID ---------- */
(function () {
  ['dryclothes', 'besick', 'cantea'].forEach(function (id) {
    if (!T.SHOW_NOT_SAY[id]) err(`H11 ${id} is broadcast to the room — a child who has wet themselves does not want thirty classmates to hear it`);
    var c = M.cardFor(id, 'en', null);
    if (!c || !c.showOnly) err(`H11 ${id} does not carry showOnly`);
  });
  var tap = (SRC_NC.match(/_tapCard: function[\s\S]*?\n    \},/) || [''])[0];
  if (!/card\.showOnly/.test(tap)) err('H11 the tap handler ignores showOnly');
  console.log('  H11 the three dignity cards show rather than announce');
}());

/* ---------- ⭐ H12 THE TEACHER'S OWN PHRASES ---------- */
(function () {
  /* the validator must be TOTAL — anything that is not a well-formed
     draft is refused, never thrown on */
  [null, undefined, 0, '', [], {}, 'x', 42, { starter: 'need' }].forEach(function (v) {
    var r;
    try { r = M.validate(v, null); }
    catch (e) { err('H12 validate threw on ' + JSON.stringify(v)); return; }
    if (!r || typeof r.ok !== 'boolean') err('H12 validate returned nothing usable for ' + JSON.stringify(v));
  });
  /* ⚠ EVERY REFUSAL HAS ITS OWN REASON. Three refusals that shared one
     string were false in two of them. */
  var reasons = {};
  var cases = [
    [{}, 'needStarter'],
    [{ starter: 'need' }, 'needWords'],
    [{ starter: 'need', body: 'x'.repeat(99) }, 'tooLong'],
    [{ starter: 'need', body: 'ok' }, 'needIcon'],
    [{ starter: 'need', body: 'ok', icon: 'saybubble' }, 'needCat'],
    [{ starter: 'need', body: 'one. two', icon: 'saybubble', cat: 'body' }, 'oneThing']
  ];
  cases.forEach(function (c) {
    var r = M.validate(c[0], []);
    if (r.ok) { err('H12 accepted an invalid draft: ' + JSON.stringify(c[0])); return; }
    if (r.why !== c[1]) err(`H12 expected refusal "${c[1]}", got "${r.why}"`);
    if (reasons[r.why]) err(`H12 two refusals share the reason "${r.why}"`);
    reasons[r.why] = 1;
  });
  var good = { starter: 'need', body: 'a pencil', icon: 'saybubble', cat: 'body' };
  if (!M.validate(good, []).ok) err('H12 refused a VALID draft — a gate that rejects correct work teaches people to work around it');
  /* the free allowance is on KEEPING, not on making */
  var st = M.store({ custom: [] });
  if (!M.canKeep(st, false)) err('H12 a free teacher cannot keep her first phrase');
  st.custom = [1, 2, 3].map(function (n) {
    return { id: 'my:body:' + n, starter: 'need', body: 'x' + n, icon: 'saybubble', cat: 'body', home: '' };
  });
  if (M.canKeep(M.store(st), false)) err('H12 the free allowance is not enforced');
  if (!M.canKeep(M.store(st), true)) err('H12 a subscriber cannot keep beyond the free allowance');
  /* a teacher phrase can never masquerade as a curated one */
  if (!M.isCustom(M.newCustomId('body', 1))) err('H12 custom ids are not namespaced');
  if (M.isCustom('toilet')) err('H12 a curated id reads as custom');
  console.log('  H12 teacher phrases ok (total, distinct refusals, 3 free, namespaced)');
}());

/* ---------- ⭐ H13 A TEACHER PHRASE CANNOT ENTER THE CORE ----------
   Two reasons, either sufficient: motor planning (a core that differs
   per classroom is not a core), and governance (a teacher who can
   promote her own card into the always-visible eight will promote a
   management card there within a term). */
(function () {
  var coreIds = T.CORE.map(function (c) { return c.id; });
  coreIds.forEach(function (id) { if (M.isCustom(id)) err('H13 a custom id is in the CORE'); });
  var st = M.store({ custom: [{ id: 'my:body:1', starter: 'need', body: 'x', icon: 'saybubble', cat: 'body', home: '' }] });
  var board = M.boardFor(st, 'en', 'body');
  board.forEach(function (c) { if (c.core && c.custom) err('H13 a teacher phrase rendered as core'); });
  if (/CORE\s*\.\s*(sort|reverse|splice|push)/.test(SRC_NC)) err('H13 the CORE is mutated or reordered somewhere');
  /* and the core is the same set whatever the category */
  var a = M.boardFor(st, 'en', 'body').filter(function (c) { return c.core; }).map(function (c) { return c.id; }).join();
  var b = M.boardFor(st, 'en', 'others').filter(function (c) { return c.core; }).map(function (c) { return c.id; }).join();
  if (a !== b) err('H13 the core changes between categories — that destroys the motor plan');
  console.log('  H13 the core is fixed, ours, and identical in every category');
}());

/* ---------- ⭐ H14 THE CONFUSION AUDIT'S BOARD RULE ----------
   help / stop / nomore are all coral hands separated only by a
   companion mark, so they must never be laid out adjacent. */
(function () {
  if (!T.NEVER_ADJACENT || !T.NEVER_ADJACENT.length) { err('H14 the board rule is absent'); return; }
  T.NEVER_ADJACENT.forEach(function (p) {
    p.forEach(function (id) { if (!T.ICONS[id]) err(`H14 the board rule names "${id}", which is not drawn`); });
  });
  var order = T.CORE.map(function (c) { return M.cardFor(c.id, 'en', null).icon; });
  var f = M.adjacencyFaults(order);
  if (f.length) err('H14 the CORE lays two look-alike hands next to each other: ' + f.join(', '));
  T.CATEGORIES.forEach(function (cat) {
    var icons = cat.ids.map(function (id) { var c = M.cardFor(id, 'en', null); return c ? c.icon : ''; });
    var g = M.adjacencyFaults(icons);
    if (g.length) err(`H14 ${cat.id} lays two look-alike hands next to each other: ` + g.join(', '));
  });
  console.log(`  H14 board rule ok (${T.NEVER_ADJACENT.length} never-adjacent pairs, none violated)`);
}());

console.log('[l10n + css]');

/* ---------- H15 strings ---------- */
(function () {
  var keys = Object.keys(T.strings);
  if (keys.length < 40) err(`H15 only ${keys.length} strings`);
  keys.forEach(function (k) {
    var en = T.strings[k].en;
    if (!en) { err(`H15 ${k}: no en`); return; }
    var enPh = (en.match(/\{[a-z]+\}/g) || []).sort().join(',');
    LOCALES.forEach(function (loc) {
      var v = T.strings[k][loc];
      if (!v) { err(`H15 ${k}.${loc} missing`); return; }
      if ((v.match(/\{[a-z]+\}/g) || []).sort().join(',') !== enPh) err(`H15 ${k}.${loc} placeholder parity`);
      if (/'/.test(v)) err(`H15 ${k}.${loc} straight apostrophe`);
    });
  });
  Object.keys(T.STARTER_TEXT).forEach(function (k) {
    ALL.forEach(function (l) {
      var v = T.STARTER_TEXT[k][l];
      if (!v) { err(`H15 starter ${k}.${l} missing`); return; }
      if (v.indexOf('{x}') < 0) err(`H15 starter ${k}.${l} has nowhere for the teacher's words`);
    });
  });
  console.log(`  H15 strings ok (${keys.length} keys + ${Object.keys(T.STARTER_TEXT).length} starters x ${LOCALES.length})`);
}());

/* ---------- ⭐ H16 THE PRIVACY LINE IS TRUE ----------
   The v2 line said "Nothing here is saved, counted or sent anywhere"
   while _saveStore() wrote the home language and the settings to
   localStorage on every change. A privacy claim that does not match the
   model is the same class of defect as a paywall that does not. */
(function () {
  var writes = /localStorage\.setItem/.test(SRC_NC);
  var line = T.strings.privacy && T.strings.privacy.en;
  if (!line) { err('H16 there is no privacy line'); return; }
  if (writes && /nothing (here )?is saved/i.test(line)) {
    err('H16 the privacy line claims nothing is saved, and the tool writes to localStorage');
  }
  if (!/device/i.test(line)) err('H16 the privacy line does not say where the choices actually go');
  console.log('  H16 the privacy line matches what the code does');
}());

/* ---------- ⭐ H17 THE PAYWALL COPY MATCHES WHAT IS GATED ----------
   A sibling tool records a paywall string that sold something
   `_saveStore` already gave away, found by a native panel reading the
   model rather than the copy. */
(function () {
  var gate = T.strings.gateKeep && T.strings.gateKeep.en;
  if (!gate) { err('H17 there is no keep-gate string'); return; }
  var st = M.store({ custom: [] });
  if (!M.canKeep(st, false)) err('H17 the copy promises free authoring the model does not allow');
  if (!/free/i.test(gate)) err('H17 the gate copy does not say what stays free');
  var pg = T.strings.gatePrint && T.strings.gatePrint.en;
  if (pg && !/free/i.test(pg)) err('H17 the print gate does not say the lanyard cards are free');
  console.log('  H17 the paid copy names only what is actually gated');
}());

/* ---------- H18 no dead strings, AND no dead constants ---------- */
(function () {
  var body = SRC.split('\n').filter(function (l) { return !/^    [a-zA-Z]+:\s*\{en:/.test(l); }).join('\n');
  Object.keys(T.strings).forEach(function (k) {
    if (k === 'title' || k === 'instruction') return;   /* the shell consumes these */
    if (k.indexOf('cat') === 0) return;                 /* reached through a computed key */
    if (!new RegExp("['\"`]" + k + "['\"`]").test(body)) err(`H18 dead string: ${k} is never used`);
  });
  /* ⚠ THE A15 RULE EXTENDED TO CONSTANTS — which is precisely how
     ENT_TRUST_DAYS sat unused while the old gate DEMANDED it. */
  ['TEACHER_MS', 'UNDO_MS', 'ENT_TRUST_DAYS', 'LEGACY_KEY'].forEach(function (c) {
    if ((SRC_NC.match(new RegExp(c, 'g')) || []).length < 2) err(`H18 dead constant: ${c}`);
  });
  console.log('  H18 no dead strings, no dead constants');
}());

/* ---------- ⭐ H19 PRINT: NEVER A BLANK PAGE, ALWAYS THE PICTURE ----------
   The v2 build hid the whole board unconditionally and built the sheet
   only when entitled, so a FREE teacher pressing Ctrl+P got a blank
   page. And when it did print, it emitted two columns of text and ZERO
   icons — becoming, on paper, the bilingual word list its own header
   says it refused to be. */
(function () {
  var sheet = (SRC_NC.match(/_buildSheet: function[\s\S]*?\n    \}\n  \};/) || SRC_NC.match(/_buildSheet: function[\s\S]*?\n    \}/) || [''])[0];
  if (!/iconSVG\(/.test(sheet)) err('H19 the print sheet emits no icons — the child carries away words they cannot read');
  if (/if \(!this\.premium\) return;/.test(sheet)) err('H19 the sheet is empty for a free teacher — that is the blank page');
  var pb = (SRC.match(/@media print\{[\s\S]*?\n      \+ '\}';/) || [''])[0];
  if (!pb) { err('H19 no print block'); return; }
  if (!/@page/.test(pb)) err('H19 the print block has no @page');
  /* ⚠ THE SHELL RESET IS MANDATORY: lcs-shell.css ships ZERO @media
     print blocks, so its overflow:hidden and 720px cap survive into
     print and clip A4 to one column. */
  if (!/html,body\{height:auto/.test(pb.replace(/\s/g, ''))) err('H19 the print block does not reset the shell height');
  if (!/overflow:visible/.test(pb)) err('H19 the print block does not reset the shell overflow');
  if (!/max-width:none/.test(pb)) err('H19 the print block does not reset the .lcs-app cap');
  if (/print-color-adjust|-webkit-print-color-adjust/.test(pb)) err('H19 forces background colour onto a monochrome school printer');
  /* the paid sheets are scoped; the free one is not */
  if (!/body\.hlb-paid/.test(pb)) err('H19 nothing in the print block is scoped to the paid class');
  console.log('  H19 print ok (never blank, always the picture, shell reset, mono-safe)');
}());

/* ---------- H20 CSS ---------- */
(function () {
  if (!/getElementById\('hlb-style'\)/.test(SRC_NC)) err('H20 the CSS injector is not idempotent');
  if (!/prefers-reduced-motion/.test(SRC)) err('H20 no reduced-motion block');
  /* ⚠ CONTAINER QUERIES, NOT MEDIA QUERIES, FOR THE BOARD. Media
     queries inside an iframe resolve against the IFRAME, which the tool
     page pins at ~704px — so the v2 build's three (min-width:1367px)
     tiers were dead for every desktop teacher. */
  if (!/container-type:inline-size/.test(SRC)) err('H20 the board is not a query container');
  if (!/@container hlb/.test(SRC)) err('H20 no container queries — the layout cannot adapt inside the embed');
  var boardMedia = SRC.match(/@media \(min-width:1[0-9]{3}px\)/g) || [];
  if (boardMedia.length) err('H20 a min-width media query is back — it is dead inside the 704px embed');
  /* vh is a feedback loop inside a content-driven iframe */
  if (/[^a-z]\d+vh/.test(SRC.replace(/\/\*[\s\S]*?\*\//g, ''))) err('H20 a vh unit inside a manipulative');
  var lcsSel = SRC_NC.match(/\.lcs-[a-z-]+/g) || [];
  lcsSel.forEach(function (s) {
    if (['.lcs-app', '.lcs-stage', '.lcs-header', '.lcs-controls', '.lcs-drawer', '.lcs-drawer-scrim', '.lcs-sr-only'].indexOf(s) < 0) {
      err(`H20 writes an unexpected shell selector: ${s}`);
    }
  });
  console.log('  H20 css ok (container queries, no dead tiers, no vh)');
}());

console.log('');
console.log(ERRORS ? `FAIL — ${ERRORS} error(s), ${WARNS} warning(s)` : `PASS — 0 errors, ${WARNS} warning(s)`);
process.exit(ERRORS ? 1 : 0);
