#!/usr/bin/env node
/* Per-coordinate band annotation for the band-split fi arithmetic types (math-worksheet, math-puzzle,
 * code-addition). Reads each coord's deck quantities (manifest operands/results OR the deck.html
 * sum-slot), assigns `level` (esikoulu/1-luokka/2-luokka) + `standard` by the child-seen max, and
 * writes them back into the coordinate JSON. Coords whose max > 100 are DROPPED (above the K-2 ceiling).
 * Clone of annotate-pt-bands.js (fi AGE-ANCHORED bands). MUST run on Hetzner (reads /var/www/lcs-media/decks/fi/).
 *
 * Band map (fi ledger; by child-seen max quantity; NO esikoulu — symbolic arithmetic always CARRIES):
 *   ≤10  → 1-luokka   K.OA.A.2  (find-addend K.OA.A.4)         range 0–10 + ilman kymmenylitystä
 *   ≤20  → 1-luokka   1.OA.C.6  (find-subtrahend 1.OA.D.8)     range 0–20
 *   ≤100 → 2-luokka   2.NBT.B.5                                range 0–100
 *   >100 → DROP (above the K-2 ceiling)
 * Covers all 5 arithmetic types (addition, subtraction, math-puzzle, math-worksheet, code-addition).
 * Usage: node annotate-fi-bands.js <coords.json> --type=math-worksheet [--locale=fi] [--source=deck-html]
 */
'use strict';
const fs = require('fs');
const argv = process.argv.slice(2);
const coordsPath = argv.find(a => a.indexOf('--') !== 0);
const TYPE = (argv.find(a => a.indexOf('--type=') === 0) || '--type=').split('=')[1];
const locale = (argv.find(a => a.indexOf('--locale=') === 0) || '--locale=fi').split('=')[1];
const SOURCE = (argv.find(a => a.indexOf('--source=') === 0) || '--source=manifest').split('=')[1];
const raw = JSON.parse(fs.readFileSync(coordsPath, 'utf8'));
const coords = raw.coordinates || raw;

function maxNumInDeckHtml(slug) {
  const f = '/var/www/lcs-media/decks/' + locale + '/' + slug + '/deck.html';
  if (!fs.existsSync(f)) return null;
  let h; try { h = fs.readFileSync(f, 'utf8'); } catch (e) { return null; }
  let m, re = /"slotType":"sum"[^}]*?"expected":"(\d+)"/g, max = 0, got = false;
  while ((m = re.exec(h)) !== null) { got = true; const n = parseInt(m[1], 10); if (n > max) max = n; }
  return got ? max : null;
}
function opNumbers(text, solution) {
  const nums = [];
  String(text || '').split(/[-+−×x*\/=]/).forEach(t => { const n = parseInt(t.trim(), 10); if (!isNaN(n)) nums.push(n); });
  if (typeof solution === 'number') nums.push(solution);
  return nums;
}
function maxNumInManifest(slug) {
  const f = '/var/www/lcs-media/decks/' + locale + '/' + slug + '/manifest.json';
  if (!fs.existsSync(f)) return null;
  let d; try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return null; }
  const exs = Array.isArray(d.exercises) ? d.exercises : [];
  let max = 0, got = false;
  exs.forEach(ex => {
    if (ex.values && typeof ex.values === 'object' && !Array.isArray(ex.values)) {
      Object.values(ex.values).forEach(v => { if (typeof v === 'number') { got = true; if (v > max) max = v; } });
    }
    if (Array.isArray(ex.equations)) {
      ex.equations.forEach(eq => { if (eq && typeof eq.result === 'number') { got = true; if (eq.result > max) max = eq.result; } });
    }
    if ((ex.values && typeof ex.values === 'object') || Array.isArray(ex.equations)) return;
    const ops = Array.isArray(ex.operations) ? ex.operations : (Array.isArray(ex) ? ex : []);
    if (ops.length) { ops.forEach(op => { got = true; opNumbers(op.text, op.solution).forEach(n => { if (n > max) max = n; }); }); return; }
    const nums = [];
    if (typeof ex.minuend === 'number') nums.push(ex.minuend);
    if (typeof ex.subtrahend === 'number') nums.push(ex.subtrahend);
    if (Array.isArray(ex.addends)) ex.addends.forEach(a => { if (typeof a === 'number') nums.push(a); });
    if (typeof ex.a === 'number') nums.push(ex.a);
    if (typeof ex.b === 'number') nums.push(ex.b);
    if (typeof ex.operandA === 'number') nums.push(ex.operandA);
    if (typeof ex.operandB === 'number') nums.push(ex.operandB);
    if (typeof ex.minuend === 'number' && typeof ex.subtrahend === 'number') nums.push(ex.minuend - ex.subtrahend);
    if (typeof ex.operandA === 'number' && typeof ex.operandB === 'number') nums.push(ex.operandA + ex.operandB);
    if (typeof ex.sum === 'number') nums.push(ex.sum);
    if (typeof ex.answer === 'number') nums.push(ex.answer);
    if (typeof ex.total === 'number') nums.push(ex.total);
    if (nums.length) { got = true; nums.forEach(n => { if (n > max) max = n; }); }
  });
  return got ? max : null;
}
function bandFor(type, mode, max) {
  // ALL 5 symbolic-arithmetic types band-split by child-seen max. NO esikoulu tier — a symbolic
  // sum is NEVER the no-standard readiness band (the sv §22.5 within-10-symbolic=grade-1 ruling /
  // förskola=no-standard invariant). Band floor = 1-luokka; >100 dropped (above the K-2 ceiling).
  // The CCSS code (machine targetName) is decoupled from the band: K.OA.A.2 stays on a within-10
  // deck so the rekey's RANGE_BY_STANDARD yields the honest "0–10" range + "ilman kymmenylitystä",
  // even though the grade chip reads 1. luokka.
  const ARITH = new Set(['addition', 'subtraction', 'math-puzzle', 'math-worksheet', 'code-addition']);
  if (!ARITH.has(type)) return null;
  if (max > 100) return null;
  const level = max <= 20 ? '1-luokka' : '2-luokka';
  let standard;
  if (mode === 'find-addend')        standard = max <= 10 ? 'K.OA.A.4' : (max <= 20 ? '1.OA.A.1' : '2.NBT.B.5');
  else if (mode === 'find-subtrahend') standard = max <= 20 ? '1.OA.D.8' : '2.NBT.B.5';
  else if (max <= 10)  standard = 'K.OA.A.2';
  else if (max <= 20)  standard = '1.OA.C.6';
  else                 standard = '2.NBT.B.5';
  return { level, standard };
}

const out = [], drops = [], unparseable = [];
coords.forEach(co => {
  const decks = (co.siblings && co.siblings.length) ? co.siblings : [co.canonicalDeckSlug || co.canonical];
  let coMax = 0, gotAny = false;
  decks.forEach(s => { const r = SOURCE === 'deck-html' ? maxNumInDeckHtml(s) : maxNumInManifest(s); if (r !== null) { gotAny = true; if (r > coMax) coMax = r; } });
  if (!gotAny) { unparseable.push((co.mode || '') + '/' + co.theme); return; }
  const b = bandFor(TYPE, co.mode, coMax);
  if (!b) { drops.push((co.mode || '') + '/' + co.theme + ' (max=' + coMax + ')'); return; }
  out.push(Object.assign({}, co, { level: b.level, standard: b.standard, _max: coMax }));
});
raw.coordinates = out;
fs.writeFileSync(coordsPath, JSON.stringify(raw, null, 2));
const byBand = {}; out.forEach(c => { const k = c.level + '/' + c.standard; byBand[k] = (byBand[k] || 0) + 1; });
console.log('annotated ' + out.length + '/' + coords.length + ' (' + TYPE + '); dropped(>100)=' + drops.length + (drops.length ? ' [' + drops.slice(0, 6).join(', ') + ']' : '') +
  '; unparseable=' + unparseable.length + (unparseable.length ? ' [' + unparseable.slice(0, 6).join(', ') + ']' : '') + '; bands=' + JSON.stringify(byBand));
