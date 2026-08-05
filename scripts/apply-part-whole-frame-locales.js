/* =====================================================================
   apply-part-whole-frame-locales.js — write the strings block from SoT
   ---------------------------------------------------------------------
   Run:  node scripts/apply-part-whole-frame-locales.js

   Rewrites the entire `strings: { … }` block in
   `mini tools/part-whole-frame.js` from
   `scripts/_part-whole-frame-strings.js`. Idempotent.

   ⚠ ONE PHYSICAL LINE PER KEY. The verify gate reads the block by line
   (P8's `^\s{4}[a-zA-Z]+:\s*\{en:` filter, and the mutation harness's
   self-anchoring `enNeedle`), so a reflow would blind both.

   ⚠ THE KEY SET AND ITS ORDER ARE READ OFF THE TOOL, never hand-listed.
   A hand-listed order silently drops a key the tool renders, and a
   completeness check covering a SUBSET of the required fields is worse
   than none because it CERTIFIES — #42 shipped five of eight ToolEntry
   fields past two such guards.

   ⚠ IT REFUSES TO WRITE rather than ship a defect:
     · a missing or empty key in any locale
     · a key present in one locale and absent in another
     · a non-EN string identical to its English source (an untranslated leak)
     · a digit, an exclamation mark, a question mark, an invisible character
     · a straight apostrophe
     · a placeholder that does not match the English set for that key
     · a VERDICT word, in the language it belongs to
     · two locales sharing a title

   ⭐⭐ EVERY BAN IS POISON-TESTED IN BOTH DIRECTIONS BEFORE IT TOUCHES
   REAL COPY. This programme has now bought the ban-too-wide defect six
   times — the German panel's own `Zufallsbeutel`, the correct French
   `par`, "how many cubes TALL", `dessinée en volume`. A ban shown only to
   FIRE has not been tested, and a fence that rejects correct native prose
   teaches a panel to write AROUND it instead of reporting it.

   ⚠ AND `\b` IS ASCII-ONLY. `\bväärin\b`, `\braté\b` and `\byhteensä\b`
   can never match, so a ban written with it is dead in exactly the
   languages it was written for. Unicode letter lookarounds, everywhere.
   The Finnish panel measured this rather than assuming it.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SoT = require('./_part-whole-frame-strings.js');
const TOOL = path.join(__dirname, '..', 'mini tools', 'part-whole-frame.js');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* ---- the key ORDER comes off the shipped tool ----------------------- */
const SRC = fs.readFileSync(TOOL, 'utf8');
const box = { console, document: { getElementById: () => null, createElement: () => ({}), head: { appendChild() {} } }, window: {} };
box.globalThis = box;
vm.runInNewContext(SRC.replace(/\nfunction injectPartWholeFrameCSS[\s\S]*$/, ''), box);
const TOOL_MODEL = box.PartWholeFrame;
if (!TOOL_MODEL || !TOOL_MODEL.strings) { console.error('REFUSED: could not load the tool'); process.exit(1); }
const ORDER = Object.keys(TOOL_MODEL.strings);
if (ORDER.length < 40) {
  console.error(`REFUSED: only ${ORDER.length} string keys parsed off the tool — this gate would be hollow`);
  process.exit(1);
}

const L = (alts) => new RegExp('(?<!\\p{L})(?:' + alts + ')(?!\\p{L})', 'iu');
const VERDICT = {
  en: L('wrong|incorrect|bad|failed|try again|correct|well done|check|right answer|(?:got|get|is|are|was|were)\\s+(?:it\\s+)?right'),
  de: L('falsch|fehler|leider|richtig'),
  fr: L('faux|fausse|erreur|raté|correcte?'),
  it: L('sbagliato|errore|corrett[oa]|giust[oa]'),
  es: L('incorrecto|mal hecho|error|correct[oa]'),
  pt: L('errado|erro|corret[oa]'),
  nl: L('fout|foutje|verkeerd|correct'),
  sv: L('fel|felaktig|korrekt'),
  da: L('forkert|fejl|korrekt|rigtigt'),
  no: L('feil|korrekt|riktig'),
  fi: L('väärin|virhe|oikein')
};
const SCORE = L('score|scores|streak|po[äe]ng|punkte|punteggio|puntuaci[óo]n|pontua[çc][ãa]o|pisteet|badge|reward|countdown|timer');

/* ---------------------------------------------------------------------
   POISON — both directions, in the language each ban polices.
   MUST_PASS is the auditable record of every width decision: each entry
   names a word considered for a ban and deliberately left out.
   ------------------------------------------------------------------- */
const POISON = [
  { name: 'verdict.en', re: VERDICT.en,
    fire: ['check you got it right', 'that is incorrect', 'Well done'],
    /* `right` is a DIRECTION as often as a verdict, and this board has a
       left tray and a right tray — a bare ban would condemn six shipped
       accessible names */
    pass: ['The right part', 'Put the cloth over the right part', 'Take the cloth off the right part'] },
  { name: 'verdict.de', re: VERDICT.de,
    fire: ['Das ist leider falsch', 'Richtig gemacht'],
    /* `gut` is ordinary encouragement, not a verdict on an answer */
    pass: ['Schaut gut hin', 'Der rechte Teil', 'Zahlen zerlegen'] },
  { name: 'verdict.nl', re: VERDICT.nl,
    fire: ['Dat is fout', 'Dat is verkeerd'],
    /* ⚠ `goed` is "good" and one of the commonest words in Dutch */
    pass: ['Kijk goed', 'Het rechterdeel', 'Splitsen'] },
  { name: 'verdict.sv', re: VERDICT.sv,
    fire: ['Det blev fel', 'Det är korrekt'],
    /* ⚠ `rätt` also means "rather / quite" */
    pass: ['Det är rätt många brickor', 'Den högra delen', 'Helhet och delar'] },
  { name: 'verdict.fi', re: VERDICT.fi,
    fire: ['Väärin', 'Se on oikein'],
    /* ⚠ `oikealle` is a DIRECTION and a different word from `oikein` —
       exactly the pair an ASCII `\b` gets wrong in both directions */
    pass: ['Siirrä yksi nappula oikealle', 'Oikea osa', 'Osat ja kokonaisuus'] },
  { name: 'verdict.fr', re: VERDICT.fr,
    fire: ['Ta réponse est fausse', 'La paire correcte'],
    /* ⚠ `juste` also means "just / only" */
    pass: ['Il reste juste un jeton', 'La seconde partie', 'Le tout et les parties'] },
  { name: 'score', re: SCORE,
    fire: ['your score', 'Punkte', 'pisteet', 'a streak of five'],
    pass: ['Une égalité', 'Alle vier de sommen', 'Kaikki neljä'] }
];

let bad = 0;
const fail = (m) => { console.error('  REFUSED: ' + m); bad++; };

(function poison() {
  for (const p of POISON) {
    const missed = p.fire.filter((s) => !p.re.test(s));
    const condemned = p.pass.filter((s) => p.re.test(s));
    if (missed.length) fail(`the ${p.name} ban MISSED a violation: "${missed[0]}"`);
    if (condemned.length) fail(`the ${p.name} ban WRONGLY CONDEMNED: "${condemned[0]}"`);
    if (!missed.length && !condemned.length) {
      console.log(`  poison [${p.name}]: fires ${p.fire.length}/${p.fire.length}, clears ${p.pass.length}/${p.pass.length}`);
    }
  }
  /* the boundary must be unicode-aware at all, or half these bans are dead */
  if (!VERDICT.fi.test('väärin')) fail('the fi ban cannot match a non-ASCII word — it is written with \\b');
  if (VERDICT.fi.test('väärinkäsitys')) fail('the fi ban matches inside a longer word — the boundary is not holding');
}());
if (bad) { console.error('\nFAIL — a ban is untrustworthy; nothing was written'); process.exit(1); }

/* ---- validate the SoT before touching the tool ---------------------- */
const ph = (v) => (v.match(/\{[a-z]+\}/g) || []).sort().join(',');
for (const loc of LOCALES) {
  const B = SoT[loc];
  if (!B) { fail(`locale ${loc} is missing entirely`); continue; }
  for (const k of ORDER) {
    const v = B[k];
    if (typeof v !== 'string' || !v.trim()) { fail(`${loc}.${k} is missing or empty`); continue; }
    if (/\d/.test(v)) fail(`${loc}.${k} contains a digit — "${v}"`);
    if (/!/.test(v)) fail(`${loc}.${k} contains an exclamation mark — "${v}"`);
    if (/\?/.test(v)) fail(`${loc}.${k} asks a question — this tool never asks — "${v}"`);
    if (/'/.test(v)) fail(`${loc}.${k} uses a straight apostrophe — "${v}"`);
    if (/[​­﻿]/.test(v)) fail(`${loc}.${k} contains an invisible character`);
    if (ph(v) !== ph(SoT.en[k])) fail(`${loc}.${k} placeholder parity: "${ph(v)}" vs en "${ph(SoT.en[k])}"`);
    if (VERDICT[loc] && VERDICT[loc].test(v)) fail(`${loc}.${k} uses VERDICT vocabulary — "${v}"`);
    if (SCORE.test(v)) fail(`${loc}.${k} uses score/timer vocabulary — "${v}"`);
    if (/common core/i.test(v)) fail(`${loc}.${k} names Common Core`);
    if (loc !== 'en' && v === SoT.en[k]) fail(`${loc}.${k} is identical to English — an untranslated leak`);
  }
  const extra = Object.keys(B).filter((k) => ORDER.indexOf(k) < 0);
  if (extra.length) fail(`${loc} has keys the tool does not render: ${extra.join(', ')}`);
}

/* eleven distinct titles — a locale that shares a title with another has
   not been named, it has been copied */
const titles = {};
for (const loc of LOCALES) {
  const t = SoT[loc] && SoT[loc].title;
  if (!t) continue;
  if (titles[t]) fail(`${loc} and ${titles[t]} share the title "${t}"`);
  titles[t] = loc;
}
if (bad) { console.error('\nFAIL — the SoT is not shippable; nothing was written'); process.exit(1); }

/* ---- write, one physical line per key ------------------------------- */
const esc = (v) => v.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const pad = Math.max.apply(null, ORDER.map((k) => k.length)) + 2;
const lines = ORDER.map((k) => {
  const body = LOCALES.map((loc) => `${loc}:'${esc(SoT[loc][k])}'`).join(',');
  return '    ' + (k + ':').padEnd(pad) + '{' + body + '}';
}).join(',\n');

const START = /(\n  strings: \{\n)[\s\S]*?(\n  \},\n)/;
if (!START.test(SRC)) { console.error('REFUSED: could not find the strings block'); process.exit(1); }
const out = SRC.replace(START, (_m, a, b) => a + lines + b);

/* re-parse what we are about to write, so a malformed block never lands */
const box2 = { console, document: { getElementById: () => null, createElement: () => ({}), head: { appendChild() {} } }, window: {} };
box2.globalThis = box2;
try { vm.runInNewContext(out.replace(/\nfunction injectPartWholeFrameCSS[\s\S]*$/, ''), box2); }
catch (e) { console.error('REFUSED: the rewritten block does not parse — ' + e.message); process.exit(1); }
const after = box2.PartWholeFrame && box2.PartWholeFrame.strings;
if (!after || Object.keys(after).length !== ORDER.length) {
  console.error('REFUSED: the rewritten block lost keys'); process.exit(1);
}
for (const k of ORDER) for (const loc of LOCALES) {
  if (after[k][loc] !== SoT[loc][k]) { console.error(`REFUSED: round-trip mismatch at ${k}.${loc}`); process.exit(1); }
}

if (out === SRC) console.log('\nno change — the tool already matches the SoT');
else { fs.writeFileSync(TOOL, out); console.log(`\nwrote ${ORDER.length} keys x ${LOCALES.length} locales`); }
