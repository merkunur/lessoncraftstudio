#!/usr/bin/env node
/**
 * validate-cloze-content.js — Level Set 2026-09-28 (Fill in the Missing Word): checks a native panel's NEW
 * frames / plural frames / stories by merging them into the locale's published cloze block and running the
 * family gate's own validateBank (qa/verify-b4-cloze.js, every rule the pages are held to), plus the Level
 * Set extras the new levels need.
 *
 *   node tools/level-set/validate-cloze-content.js <panel.json> <loc>
 *
 * panel.json = { locale, frames:[…frame shape…], plural:[…plural frame shape…], stories:[…story shape…],
 *   hardPlural:[plural frame ids in the locale's harder plural class] }
 * Exit 0 only when validateBank reports nothing for the merged block AND the counts hold:
 *   ≥ 22 new frames (≥ 8 with an answer of ≤ 5 letters), ≥ 24 new plural frames (≥ 8 marked hard; none for
 *   da, which refuses the plural page), ≥ 9 new stories; every new id is new.
 */
'use strict';
const fs = require('fs');
const { validateBank } = require('../../qa/verify-b4-cloze.js');
const { bank } = require('../../lib/b4-common.js');
const T = require('../../types/g1/G1-350-cloze.js');

const [file, loc] = process.argv.slice(2);
if (!file || !loc) throw new Error('usage: validate-cloze-content.js <panel.json> <loc>');
const P = JSON.parse(fs.readFileSync(file, 'utf8'));
const pub = bank('cloze', loc);
const merged = { ...pub, frames: [...pub.frames, ...(P.frames || [])], plural: [...(pub.plural || []), ...(P.plural || [])], stories: [...(pub.stories || []), ...(P.stories || [])] };
const out = validateBank(merged, loc).filter((m) => !/strings\./.test(m));
const ids = (xs) => xs.map((x) => x.id);
const pubIds = new Set([...ids(pub.frames), ...ids(pub.plural || []), ...ids(pub.stories || [])]);
for (const id of [...ids(P.frames || []), ...ids(P.plural || []), ...ids(P.stories || [])]) if (pubIds.has(id)) out.push(`id "${id}" is already a published id`);
const answer = (f) => { try { return T.answerFor ? T.answerFor(loc, f.noun, f.form || 'sg') : null; } catch (e) { return null; } };
const glyphs = (s) => [...String(s || '').normalize('NFC')].length;
const nf = (P.frames || []).length, ns = (P.stories || []).length, np = (P.plural || []).length;
const short = (P.frames || []).filter((f) => { const a = answer(f); return a && glyphs(a) <= 5; }).length;
const hard = new Set(P.hardPlural || []);
for (const h of hard) if (!(P.plural || []).some((f) => f.id === h)) out.push(`hardPlural names unknown plural frame "${h}"`);
if (nf < 22) out.push(`${nf} new frames < 22`);
if (short < 8) out.push(`${short} new frames with an answer of <= 5 letters < 8`);
if (ns < 9) out.push(`${ns} new stories < 9`);
if (loc !== 'da') { if (np < 24) out.push(`${np} new plural frames < 24`); if (hard.size < 8) out.push(`${hard.size} hard plural frames < 8`); }
for (const m of out) console.log('FAIL ' + m);
console.log(`${loc}: ${nf} frames (${short} short answers), ${np} plural (${hard.size} hard), ${ns} stories`);
console.log(out.length ? `${out.length} problem(s)` : 'every new frame and story passes the family gate');
process.exit(out.length ? 1 : 0);
