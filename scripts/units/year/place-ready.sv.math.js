#!/usr/bin/env node
/**
 * Part 12.2, Swedish mathematics, STAGE 1 (see place-ready.en.math.js for the rules of stage 1): 16 of the 32 ready
 * lessons of the designed year are put into the units (frontend/content/units/defs/sv.json). Run once (2026-11-13).
 *
 * New units opened: Talen 0–10 (4 lessons) · Addition och subtraktion 0–20 med tiotalsövergång (4: the lesson on the
 * equal sign stands here and not in Talkamrater, because its page works within 20).
 * Held: the lessons of six new units that hold fewer than four lessons today (Mäta och jämföra 1 · Lägga till, ta bort
 * 2 · Räknehändelser 0–20 2 · Utblick mot 100 3 · Klockan åk 2 1 · Rutnät, programmering och skala 2 ·
 * Multiplikationstabellerna 1) · two lessons with one real asset (Bygga och rita former; Tiotalsövergång upp till 100)
 * · the two lessons the teacher leads without a page.
 *
 *   node scripts/units/year/place-ready.sv.math.js      (refuses to run twice)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const f = path.join(REPO, 'frontend', 'content', 'units', 'defs', 'sv.json'); const raw = fs.readFileSync(f, 'utf8'); const defs = JSON.parse(raw);
const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error('no unit ' + id); return u; };
const keyOf = (l) => l.id || l.point;
const all = new Set(defs.units.flatMap((u) => u.lessons.map(keyOf)));
const put = (u, after, L) => {
  if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before');
  all.add(keyOf(L));
  const i = after === null ? 0 : u.lessons.findIndex((x) => keyOf(x) === after) + 1;
  if (after !== null && i === 0) throw new Error(u.id + ' has no lesson ' + after);
  u.lessons.splice(i, 0, L);
};
/** the description of a Swedish unit names its lessons by count: "… : N lektioner med …" */
const recount = (u) => { const t = u.metaDescription.replace(/: \d+ lektioner med/, ': ' + u.lessons.length + ' lektioner med'); if (!t.includes(': ' + u.lessons.length + ' lektioner med')) throw new Error(u.id + ': the description names no lesson count'); if (t.length < 110 || t.length > 170) throw new Error(u.id + ': description of ' + t.length + ' characters'); u.metaDescription = t; };
const describe = (grade, title) => 'Lektionsplanering i matematik för ' + grade + ', arbetsområdet ”' + title + '”: 0 lektioner med lärarkommentar och arbetsblad till varje lektion.';
const open = (before, u) => { defs.units.splice(defs.units.findIndex((x) => x.id === before), 0, u); return u; };
const plan = (id) => defs.plans.find((p) => p.id === id);

// ── Förskoleklass ──
{
  const u = unit('sv-f-ma-sortera-dela-upp');
  put(u, 'K:classify-count-kinds', { point: '1:bar-graphs', id: '1:bar-graphs#klassens-diagram', types: ['G1-143'], core: { 'G1-143': 1 }, tool: 'class-graph', activity: null });
  put(u, 'K:number-bonds-k', { point: 'K:number-bonds-k', id: 'K:number-bonds-k#dela-upp-6-till-10', types: ['K-274'], tool: 'part-whole-frame', activity: 'chuffer.rail-decompose.k-oa-a-3' });
  recount(u);
}
// ── Årskurs 1 ──
{
  const u = open('sv-1-ma-add-sub-0-10', { id: 'sv-1-ma-talen-0-10', slug: 'talen-0-10-antal-talrad-och-uppdelning-ak-1', status: 'live', grade: '1', subject: 'math',
    title: 'Talen 0–10: antal, talrad och uppdelning', metaTitle: 'Matematik åk 1: Talen 0–10 | Lektionsplanering', metaDescription: describe('åk 1', 'Talen 0–10: antal, talrad och uppdelning'), weeks: 2, lessons: [] });
  u.lessons.push({ point: 'K:count-how-many', id: 'K:count-how-many#talen-till-10-i-tiorutan', types: ['K-004'], tool: 'ten-frame' }); all.add('K:count-how-many#talen-till-10-i-tiorutan');
  put(u, 'K:count-how-many#talen-till-10-i-tiorutan', { point: 'K:before-after-back', id: 'K:before-after-back#talraden-till-10', types: ['K-021', 'K-023'], core: { 'K-021': 1 }, tool: 'number-line' });
  put(u, 'K:before-after-back#talraden-till-10', { point: '1:compare-order-two-digit', id: '1:compare-order-two-digit#storre-mindre-lika', types: ['G1-114'], activity: 'friendship-bridge.compare-balance.k-cc-c-6' });
  put(u, '1:compare-order-two-digit#storre-mindre-lika', { point: 'K:number-bonds-k', id: 'K:number-bonds-k#talhus', types: ['K-456'], tool: 'part-whole-frame', activity: 'clunks-lost-lunch.make-total.k-oa-a-3' });
  recount(u);
  const p = plan('plan-1-math'); p.units.unshift(u.id);
}
{
  const u = open('sv-1-ma-klockan-almanackan', { id: 'sv-1-ma-add-sub-0-20', slug: 'addition-och-subtraktion-0-20-med-tiotalsovergang-ak-1', status: 'live', grade: '1', subject: 'math',
    title: 'Addition och subtraktion 0–20 med tiotalsövergång', metaTitle: 'Matematik åk 1: Addition och subtraktion 0–20 med tiotalsövergång', metaDescription: 'Lektionsplanering i matematik för åk 1, ”Addition och subtraktion 0–20 med tiotalsövergång”: 0 lektioner med lärarkommentar och arbetsblad till varje lektion.', weeks: 3, lessons: [] });
  u.lessons.push({ point: '1:near-doubles', types: ['G1-449'], tool: 'doubling-mirror' }); all.add('1:near-doubles');
  put(u, '1:near-doubles', { point: '1:fluency-within-20', id: '1:fluency-within-20#tiotalsovergang-addition', types: ['G1-439'], core: { 'G1-439': 1 }, tool: 'rekenrek', activity: 'ten-stones.add-sub-within-20.1-oa-c-6' });
  put(u, '1:fluency-within-20#tiotalsovergang-addition', { point: '1:fact-families', id: '1:fact-families#talfamiljer-till-20', types: ['G1-220'], activity: null });
  put(u, '1:fact-families#talfamiljer-till-20', { point: '1:true-false-equations', types: ['G1-443'], tool: 'number-balance' });
  recount(u);
  const p = plan('plan-1-math'); p.units.splice(p.units.indexOf('sv-1-ma-klockan-almanackan'), 0, u.id);
}
{
  const u = unit('sv-1-ma-former-monster-langd');
  put(u, '1:patterns-missing', { point: '1:map-key', types: ['G1-528', 'G1-529'] });
  recount(u);
}
{
  const u = unit('sv-1-ma-klockan-almanackan');
  put(u, '1:days-months-seasons', { point: '1:days-months-seasons~season-wheel', types: ['G1-323'], tool: 'calendar-wall' });
  recount(u);
}
// ── Årskurs 2 ──
{
  const u = unit('sv-2-ma-multiplikation');
  put(u, '3:times-tables', { point: '3:times-tables', id: '3:times-tables#tians-tabell', types: ['G3-366'], activity: null });
  put(u, '3:times-tables#tians-tabell', { point: '1:doubles-halves', id: '1:doubles-halves#dubbelt-och-halften-upp-till-100', types: ['G1-451'], core: { 'G1-451': 3 }, tool: 'doubling-mirror', activity: null });
  u.title = 'Multiplikation: lika grupper, 2:an, 5:an och 10:an';
  u.metaTitle = 'Matematik åk 2: Multiplikation – lika grupper, 2:an, 5:an och 10:an';
  u.metaDescription = 'Lektionsplanering i matematik för åk 2, ”' + u.title + '”: 0 lektioner med lärarkommentar och arbetsblad till varje lektion.';
  recount(u);
}
{
  const u = unit('sv-2-ma-geometri');
  put(u, '2:2d-attributes', { point: '2:flat-or-solid', types: ['G2-244'], activity: null });
  recount(u);
}
// ── Årskurs 3 ──
{
  const u = unit('sv-3-ma-avrundning-uppstallning');
  put(u, '3:column-regrouping', { point: '3:column-regrouping', id: '3:column-regrouping#subtraktion-over-noll', types: ['G3-362'], tool: 'exchange-machine', activity: 'place-value-regroup.subtract-decompose-hundred.2-nbt-b-7' });
  recount(u);
}
const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
let out = JSON.stringify(defs, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
fs.writeFileSync(f, out + (raw.endsWith('\n') ? (raw.includes('\r\n') ? '\r\n' : '\n') : ''));
console.log('placed: ' + defs.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
