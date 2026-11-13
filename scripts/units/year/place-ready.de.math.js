#!/usr/bin/env node
/**
 * Part 12.2, German mathematics, STAGE 1 (see place-ready.en.math.js for the rules of stage 1): 22 of the 24 ready
 * lessons of the designed year are put into the units (frontend/content/units/defs/de.json). Run once (2026-11-13).
 *
 * New units opened (each holds four lessons or more today): Zahlen bis 10 · Plus und Minus bis 10: Aufgabenfamilien
 * und Rechengeschichten · Plus und Minus bis 20 mit Zehnerübergang · Das kleine Einmaleins: alle Reihen.
 * "Formen, Muster und Wege" is NOT opened: the three lessons it takes from "Formen, Messen und Diagramme" would leave
 * that unit with three; its ready lesson (Wege im Kästchenplan) stands there until the measuring lesson is written.
 * Held: In Schritten zählen (its unit "Ausblick bis 100" has two lessons today) · Zauberquadrate (its unit has one,
 * and the page's numbers stay under 25 where the lesson names the Zahlenraum bis 1000).
 * Three lessons were written on the PAGE, not on the design's wording: the 9er and 7er rows are handed out as the two
 * row pages (the page of tricks belongs to another teaching point); the number line to 1000 asks for the step and the
 * missing numbers, not for Nachbarzehner; "Rechengeschichten erfinden" writes the equation to a picture.
 *
 *   node scripts/units/year/place-ready.de.math.js      (refuses to run twice)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const file = (f) => path.join(REPO, f);
const read = (f) => fs.readFileSync(file(f), 'utf8');
const writeJsonLike = (f, raw, obj) => {
  const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
  let out = JSON.stringify(obj, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(file(f), out + (raw.endsWith('\n') ? (raw.includes('\r\n') ? '\r\n' : '\n') : ''));
};
{
  const f = 'frontend/content/teaching-graph/tools.json'; const raw = read(f); const j = JSON.parse(raw);
  const add = { 'missing-question': ['1:write-the-equation'], 'calendar-wall': ['1:days-months-seasons~season-wheel'] };
  for (const [k, ps] of Object.entries(add)) for (const p of ps) if (!j.tools[k].points.includes(p)) j.tools[k].points.push(p);
  writeJsonLike(f, raw, j);
}
const f = 'frontend/content/units/defs/de.json'; const raw = read(f); const defs = JSON.parse(raw);
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
const take = (u, key) => { const i = u.lessons.findIndex((x) => keyOf(x) === key); if (i < 0) throw new Error(u.id + ' has no lesson ' + key); return u.lessons.splice(i, 1)[0]; };
const says = (u, count, text) => { u.metaDescription = text; if (!text.includes(count + ' Stunden')) throw new Error(u.id + ': the description does not say ' + count + ' Stunden'); if (u.lessons.length !== count) throw new Error(u.id + ' has ' + u.lessons.length + ' lessons, the description says ' + count); if (text.length < 110 || text.length > 170) throw new Error(u.id + ': description of ' + text.length + ' characters'); };
const open = (before, u) => { defs.units.splice(defs.units.findIndex((x) => x.id === before), 0, u); return u; };
const plan = (id) => defs.plans.find((p) => p.id === id);

// ── Klasse 1 ──
{
  const z20 = unit('de1-zahlen-bis-20'), pm = unit('g1-add-subtract-within-10');
  // Zahlen bis 10
  const z10 = open('g1-add-subtract-within-10', { id: 'de1-zahlen-bis-10', slug: 'zahlen-bis-10-klasse-1', status: 'live', grade: '1', subject: 'math',
    title: 'Zahlen bis 10: zählen, schreiben und vergleichen', metaTitle: 'Mathe Klasse 1: Zahlen bis 10 | Unterrichtseinheit', metaDescription: '', weeks: 3, lessons: [take(z20, '1:ordinal-numbers')] });
  put(z10, null, { point: '1:sort-three-groups', types: ['G1-160'], activity: 'choice-board.sort-count.k-md-b-3' });
  put(z10, '1:sort-three-groups', { point: 'K:numeral-formation', types: ['K-467'], core: { 'K-467': 1 } });
  put(z10, 'K:numeral-formation', { point: 'K:count-how-many', types: ['K-004'] });
  put(z10, 'K:count-how-many', { point: '1:compare-order-two-digit', id: '1:compare-order-two-digit#mehr-weniger-gleich', types: ['G1-114'], activity: 'friendship-bridge.compare-balance.k-cc-c-6' });
  put(z10, '1:compare-order-two-digit#mehr-weniger-gleich', { point: 'K:before-after-back', types: ['K-021', 'K-023'], core: { 'K-021': 1 } });
  says(z10, 6, 'Drei Wochen Mathe Klasse 1: 6 Stunden zum Sortieren, zum Zählen und Schreiben der Zahlen bis 10, zum Vergleichen mit <, > und = und zu Vorgänger und Nachfolger.');
  // Zahlen bis 20: the Zwanzigerfeld comes first
  put(z20, null, { point: 'K:teen-numbers', types: ['K-448'] });
  z20.title = 'Zahlen bis 20: Zehner, Einer und Zahlenstrahl';
  z20.metaTitle = 'Mathe Klasse 1: Zahlen bis 20 – Zehner, Einer und Zahlenstrahl';
  says(z20, 4, 'Drei Wochen Mathe Klasse 1: 4 Stunden zu den Zahlen bis 20 im Zwanzigerfeld, zur Zahl des Tages von 11 bis 19, zu Zahlwörtern bis zwanzig und zum Zahlenstrahl.');
  // Plus und Minus bis 10: the second half becomes a unit of its own
  const fam = open('de1-zahlen-bis-20', { id: 'de1-aufgabenfamilien-rechengeschichten', slug: 'aufgabenfamilien-und-rechengeschichten-bis-10-klasse-1', status: 'live', grade: '1', subject: 'math',
    title: 'Plus und Minus bis 10: Aufgabenfamilien und Rechengeschichten', metaTitle: 'Mathe Klasse 1: Aufgabenfamilien und Rechengeschichten bis 10', metaDescription: '', weeks: 3,
    lessons: [take(pm, '1:fact-families'), take(pm, '1:missing-number-equations'), take(pm, '1:word-problems'), take(pm, '1:fluency-within-20')] });
  put(fam, '1:word-problems', { point: '1:write-the-equation', types: ['G1-444'], core: { 'G1-444': 3 }, tool: 'missing-question' });
  says(fam, 5, 'Drei Wochen Mathe Klasse 1: 5 Stunden zu Aufgabenfamilien, Platzhalteraufgaben und Rechengeschichten bis 10, zum Erfinden eigener Rechengeschichten und zum Kopfrechnen.');
  says(pm, 4, 'Zwei Wochen Mathe Klasse 1: 4 Stunden zum Dazutun und Wegnehmen bis 10, zu den verliebten Zahlen und zum Hüpfen am Zahlenstrahl, jede mit Lehrerhinweis.');
  // Zehnerübergang
  const zu = open('g1-time-calendar-coins', { id: 'de1-zehneruebergang', slug: 'plus-und-minus-bis-20-mit-zehneruebergang-klasse-1', status: 'live', grade: '1', subject: 'math',
    title: 'Plus und Minus bis 20 mit Zehnerübergang', metaTitle: 'Mathe Klasse 1: Plus und Minus bis 20 mit Zehnerübergang', metaDescription: '', weeks: 3, lessons: [] });
  zu.lessons.push({ point: '1:fluency-within-20', id: '1:fluency-within-20#plus-ueber-die-10', types: ['G1-439'], core: { 'G1-439': 1 }, tool: 'rekenrek', activity: 'ten-stones.add-sub-within-20.1-oa-c-6' }); all.add('1:fluency-within-20#plus-ueber-die-10');
  put(zu, '1:fluency-within-20#plus-ueber-die-10', { point: '1:near-doubles', types: ['G1-449'] });
  put(zu, '1:near-doubles', { point: '1:word-problems', id: '1:word-problems#rechengeschichten-bis-20', types: ['G1-213'], activity: null });
  put(zu, '1:word-problems#rechengeschichten-bis-20', { point: '1:fluency-within-20', id: '1:fluency-within-20#kopfrechnen-bis-20', types: ['G1-208', 'G1-216', 'G1-217'], tool: 'rekenrek', activity: 'match-pairs.match-facts-to-20.2-oa-b-2' });
  says(zu, 4, 'Zwei Wochen Mathe Klasse 1: 4 Stunden zum Plusrechnen über die 10, zu Nachbaraufgaben der Verdopplungen, zu Rechengeschichten bis 20 und zum Kopfrechnen bis 20.');
  // Uhr und Kalender; Formen, Messen und Diagramme
  const t = unit('g1-time-calendar-coins');
  put(t, '1:days-months-seasons', { point: '1:days-months-seasons~season-wheel', types: ['G1-323'], tool: 'calendar-wall' });
  says(t, 5, 'Drei Wochen Mathe Klasse 1: 5 Stunden zur Uhr mit vollen und halben Stunden, zum Einzeichnen der Zeiger, zu Wochentagen, Monaten und Jahreszeiten und zu Münzen.');
  const s = unit('g1-shapes-measuring-graphs');
  put(s, '1:tangram-compose', { point: '1:map-key', types: ['G1-528', 'G1-529'] });
  says(s, 7, 'Vier Wochen Mathe Klasse 1: 7 Stunden zu Formen, Tangram, Wegen im Kästchenplan, zum Messen mit Kästchen, zu Bild- und Säulendiagrammen und zu Mustern.');
  plan('plan-1-math').units = ['de1-zahlen-bis-10', 'g1-add-subtract-within-10', 'de1-aufgabenfamilien-rechengeschichten', 'de1-zahlen-bis-20', 'g1-doubles-three-addends-number-walls', 'de1-zehneruebergang', 'g1-time-calendar-coins', 'g1-shapes-measuring-graphs'];
}
// ── Klasse 2 ──
{
  const g = unit('g2-shapes-solids-symmetry');
  put(g, '2:2d-attributes', { point: '2:flat-or-solid', types: ['G2-244'], activity: null });
  put(g, '2:tangram-orientation', { point: '2:grid-coordinates', types: ['G2-279', 'G2-308'], activity: null });
  g.title = 'Formen, Körper, Symmetrie und Planquadrate';
  g.metaTitle = 'Mathe Klasse 2: Formen, Körper, Symmetrie und Planquadrate';
  says(g, 8, 'Vier Wochen Mathe Klasse 2: 8 Stunden zu Formen, Flächen und Körpern, zu Flächen, Kanten und Ecken, zu Spiegelachsen, Tangram und Planquadraten.');
  const mal = unit('de2-malnehmen');
  const e = open('de2-teilen', { id: 'de2-einmaleins-reihen', slug: 'das-kleine-einmaleins-alle-reihen-klasse-2', status: 'live', grade: '2', subject: 'math',
    title: 'Das kleine Einmaleins: von den Kernaufgaben zu allen Reihen', metaTitle: 'Mathe Klasse 2: Das kleine Einmaleins – alle Reihen', metaDescription: '', weeks: 4, lessons: [take(mal, '2:skip-count-3-4')] });
  put(e, null, { point: '3:times-tables', id: '3:times-tables#zehner-einmaleins', types: ['G3-366'], core: { 'G3-366': 1 }, activity: null });
  put(e, '2:skip-count-3-4', { point: '3:times-tables', id: '3:times-tables#vierer-und-achter', types: ['G3-368', 'G3-404'], activity: null });
  put(e, '3:times-tables#vierer-und-achter', { point: '3:times-tables', id: '3:times-tables#dreier-und-sechser', types: ['G3-367', 'G3-402'], activity: null });
  put(e, '3:times-tables#dreier-und-sechser', { point: '3:times-tables', id: '3:times-tables#neuner-und-siebener', types: ['G3-405', 'G3-403'], activity: null });
  put(e, '3:times-tables#neuner-und-siebener', { point: '3:times-tables', id: '3:times-tables#einmaleins-tafel', types: ['G3-407'], core: { 'G3-407': 3 }, tool: 'folding-wall', activity: null });
  says(e, 6, 'Vier Wochen Mathe Klasse 2: 6 Stunden zum 10er-Einmaleins und den Kernaufgaben, zu den Reihen mit 3, 4, 6, 7, 8 und 9 und zur Einmaleins-Tafel, jede mit Lehrerhinweis.');
  says(mal, 6, 'Vier Wochen Mathe Klasse 2: 6 Stunden vom Plus zum Mal, zu Punktefeldern, Tauschaufgaben, Mal-Sprüngen und dem 2er- und 5er-Einmaleins, jede mit Lehrerhinweis.');
  const tl = unit('de2-teilen');
  put(tl, '3:division-repeated-subtraction', { point: '3:mult-div-relationship', id: '3:mult-div-relationship#umkehraufgaben', types: ['G3-311', 'G3-369'], activity: null });
  says(tl, 7, 'Vier Wochen Mathe Klasse 2: 7 Stunden zum Verteilen und Aufteilen, zu Umkehraufgaben, zu geraden und ungeraden Zahlen und, als Vorgriff, zu Hälften und Vierteln.');
  const p = plan('plan-2-math'); p.units.splice(p.units.indexOf('de2-teilen'), 0, e.id);
}
// ── Klasse 3 ──
{
  const u = unit('de3-zahlen-bis-1000');
  put(u, '2:compare-order-3-digit', { point: '2:number-line-not-from-zero', id: '2:number-line-not-from-zero#zahlenstrahl-bis-1000', types: ['G2-395'], core: { 'G2-395': 3 }, tool: 'landing-strip', activity: null });
  says(u, 5, 'Zwei Wochen Mathe Klasse 3: 5 Stunden zu Hundertern, Zehnern und Einern, zum Zerlegen, Vergleichen und Ordnen, zum Zahlenstrahl bis 1000 und zu 100 mehr und weniger.');
}
writeJsonLike(f, raw, defs);
console.log('placed: ' + defs.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
