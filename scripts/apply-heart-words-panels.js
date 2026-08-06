#!/usr/bin/env node
/* =====================================================================
   apply-heart-words-panels.js — folds the native panels' output into
   `mini tools/heart-words.js`.

   The panels write `scripts/_hw-panels/<locale>.json`; this replaces the
   per-locale value of each key inside the one-line `key: {en:'…',de:'…'}`
   maps, in place, touching nothing else.

   ⚠ ONE LOCALE VALUE AT A TIME, ANCHORED ON THE KEY'S OWN LINE. A naive
   global replace of `de:'…'` would hit every key that happens to share a
   value, and a whole-block rewrite would silently reflow the other nine
   locales — which is how a sibling tool lost its mutation needles.

   ⚠ IDEMPOTENT. A second run must report every key as already applied.

   Usage: node scripts/apply-heart-words-panels.js [--locales=de,fr] [--apply]
   Without --apply it is a dry run and mutates nothing.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOOL = path.join(ROOT, 'mini tools', 'heart-words.js');
const PANELS = path.join(__dirname, '_hw-panels');
const SRC_KEYS = path.join(PANELS, '_english-source.json');

const APPLY = process.argv.indexOf('--apply') >= 0;
const arg = process.argv.find(a => a.startsWith('--locales='));
const ALL = ['de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no'];
const LOCALES = arg ? arg.split('=')[1].split(',').map(s => s.trim()).filter(Boolean) : ALL;

/* the same bans the build gate enforces, applied BEFORE anything is written
   so a bad panel file never reaches the tool */
const VERDICT = {
  de: /\b(richtig|falsch|fehler|test)\b/i,
  fr: /\b(correct|correcte|faux|fausse|erreur)\b/i,
  it: /\b(giusto|sbagliato|errore)\b/i,
  es: /\b(correcto|incorrecto|error|equivocad)\b/i,
  pt: /\b(correto|errado|erro)\b/i,
  nl: /\b(goed antwoord|fout|foutje)\b/i,
  sv: /\b(rätt svar|fel|felaktig)\b/i,
  da: /\b(rigtigt svar|forkert|fejl)\b/i,
  no: /\b(riktig svar|feil)\b/i
};
const VERDICT_EN = /(?<!\p{L})(correct|incorrect|wrong|oops|try again|test|quiz|drill|fail)(?!\p{L})/iu;
const SCORE_RE = /\b(score|scores|timer|streak|poäng|poeng|punkte|punteggio|puntuación|pontuação|niveau|level|badge|sticker|reward)\b/i;

let ERRORS = 0, applied = 0, already = 0;
const err = (m) => { ERRORS++; console.error('  ERROR ' + m); };

if (!fs.existsSync(SRC_KEYS)) { console.error(`missing ${SRC_KEYS}`); process.exit(1); }
const KEYS = Object.keys(JSON.parse(fs.readFileSync(SRC_KEYS, 'utf8')));
console.log(`apply-heart-words-panels — ${KEYS.length} keys × ${LOCALES.length} locale(s)${APPLY ? '' : '  (DRY RUN)'}\n`);

let src = fs.readFileSync(TOOL, 'utf8');
const NL = src.indexOf('\r\n') >= 0 ? '\r\n' : '\n';

/* JS single-quoted string literal, from a raw value */
const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const placeholders = (s) => (String(s).match(/\{[a-zA-Z]+\}/g) || []).sort().join(',');

for (const loc of LOCALES) {
  const file = path.join(PANELS, loc + '.json');
  console.log(`[${loc}]`);
  if (!fs.existsSync(file)) { err(`no panel file ${path.relative(ROOT, file)}`); continue; }

  let panel;
  try { panel = JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (e) { err(`${loc}.json does not parse: ${e.message}`); continue; }

  const S = panel.strings || {};
  const missing = KEYS.filter(k => typeof S[k] !== 'string' || !S[k].trim());
  if (missing.length) { err(`${loc} is missing ${missing.length} key(s): ${missing.slice(0, 6).join(', ')}`); continue; }
  const extra = Object.keys(S).filter(k => KEYS.indexOf(k) < 0);
  if (extra.length) err(`${loc} carries ${extra.length} key(s) the tool does not have: ${extra.slice(0, 4).join(', ')}`);

  if (Array.isArray(panel.englishDefects) && panel.englishDefects.length) {
    console.log(`  ⭐ ${panel.englishDefects.length} defect(s) reported IN THE ENGLISH SOURCE:`);
    for (const d of panel.englishDefects) console.log(`       ${d.key}: ${d.problem}`);
  }

  let locApplied = 0, locAlready = 0;
  for (const key of KEYS) {
    const val = S[key].trim();

    /* the bans, before a single byte is written */
    if (VERDICT[loc] && VERDICT[loc].test(val)) { err(`${loc}.${key} carries verdict vocabulary: "${val}"`); continue; }
    if (VERDICT_EN.test(val)) { err(`${loc}.${key} carries ENGLISH verdict vocabulary: "${val}"`); continue; }
    if (SCORE_RE.test(val)) { err(`${loc}.${key} carries score/timer vocabulary: "${val}"`); continue; }
    if (/\{n\}/.test(val)) { err(`${loc}.${key} carries a {n} count placeholder`); continue; }

    /* anchor on THIS key's line only */
    const line = new RegExp('^(\\s*' + key + ':\\s*\\{.*)$', 'm');
    const lm = line.exec(src);
    if (!lm) { err(`${loc}.${key} — the key's line was not found in the tool`); continue; }

    /* placeholder parity against the shipped en value on that same line */
    const enM = /\ben:\s*'((?:[^'\\]|\\.)*)'/.exec(lm[1]);
    if (!enM) { err(`${key} — no en value on its line`); continue; }
    if (placeholders(enM[1]) !== placeholders(val)) {
      err(`${loc}.${key} placeholders "${placeholders(val)}" != en "${placeholders(enM[1])}"`);
      continue;
    }

    const slot = new RegExp('(\\b' + loc + ":\\s*)'((?:[^'\\\\]|\\\\.)*)'");
    const sm = slot.exec(lm[1]);
    if (!sm) { err(`${loc}.${key} — no ${loc} slot on the key's line`); continue; }

    if (sm[2].replace(/\\'/g, "'") === val) { locAlready++; already++; continue; }

    const newLine = lm[1].replace(slot, sm[1] + q(val));
    src = src.slice(0, lm.index) + newLine + src.slice(lm.index + lm[1].length);
    locApplied++; applied++;
  }
  console.log(`  ${locApplied} updated, ${locAlready} already current`);
  if (panel.notes) console.log(`  note: ${String(panel.notes).slice(0, 400)}`);
  console.log('');
}

if (ERRORS) { console.error(`\nFAIL — ${ERRORS} error(s); nothing written`); process.exit(1); }
if (!APPLY) { console.log(`DRY RUN — would update ${applied} value(s); ${already} already current. Re-run with --apply.`); process.exit(0); }
if (applied) {
  fs.writeFileSync(TOOL, src, 'utf8');
  console.log(`WROTE ${path.relative(ROOT, TOOL)} — ${applied} value(s) updated, ${already} already current.`);
} else {
  console.log(`Nothing to do — all ${already} value(s) already current (idempotent).`);
}
console.log('Now run: node scripts/verify-heart-words.js && node scripts/smoke-heart-words-locales.js');
