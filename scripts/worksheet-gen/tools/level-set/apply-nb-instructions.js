#!/usr/bin/env node
/**
 * apply-nb-instructions.js — writes tools/level-set/nb-instructions.js (Number Bonds Level Set 2026-10-13) into
 * i18n/strings.<loc>.json (K-414..417 title + instruction) and i18n/interactive-instructions.json "number-bonds".
 * Refuses an empty string or a missing locale; round-trip-safe (a strings file must read back to itself first);
 * idempotent.
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const SRC = require('./nb-instructions.js');
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const bad = [];
for (const l of LOCS) {
  if (typeof SRC.title[l] !== 'function') bad.push(`title ${l}: missing`);
  for (const [k, by] of Object.entries(SRC.screen)) if (!by[l] || !String(by[l]).trim()) bad.push(`screen.${k} ${l}: empty`);
}
if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
for (const l of LOCS) {
  const f = path.join(ROOT, 'i18n', `strings.${l}.json`);
  const text = fs.readFileSync(f, 'utf8');
  const S = JSON.parse(text);
  if (JSON.stringify(S, null, 2) + '\n' !== text) { console.error(`${f}: does not round-trip — refusing to rewrite it`); process.exit(1); }
  if (l === 'es') for (const id of SRC.esFaces) S[id].instruction = SRC.esInstruction;
  const ins = S[SRC.instructionFrom] && S[SRC.instructionFrom].instruction;
  if (!ins) { console.error(`${l}: no ${SRC.instructionFrom} instruction`); process.exit(1); }
  for (const [id, n] of Object.entries(SRC.NEW_FACES)) S[id] = { title: SRC.title[l](n), instruction: ins };
  fs.writeFileSync(f, JSON.stringify(S, null, 2) + '\n');
}
// K-274 level 3: every locale's K-274 line, sv its own (a level entry must carry all 11)
const LF = path.join(ROOT, 'i18n', 'level-instructions.json');
const LI = JSON.parse(fs.readFileSync(LF, 'utf8'));
LI['K-274'] = { 3: Object.fromEntries(LOCS.map((l) => [l, l === 'sv' ? SRC.k274L3sv : JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n', `strings.${l}.json`), 'utf8'))['K-274'].instruction])) };
fs.writeFileSync(LF, JSON.stringify(LI, null, 1) + '\n');
const IF = path.join(ROOT, 'i18n', 'interactive-instructions.json');
const I = JSON.parse(fs.readFileSync(IF, 'utf8'));
I['number-bonds'] = SRC.screen;
fs.writeFileSync(IF, JSON.stringify(I, null, 1) + '\n');
console.log(`wrote ${Object.keys(SRC.NEW_FACES).length} faces × ${LOCS.length} locales and the screen instruction ×11`);
