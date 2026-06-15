#!/usr/bin/env node
/* Per-coordinate band annotation for the band-split no arithmetic types (math-puzzle, code-addition,
 * math-worksheet). Reads each coord's deck quantities (manifest operands/results OR the deck.html
 * sum-slot), assigns `level` + `standard` by the child-seen max, and writes them back into the
 * coordinate JSON. Coords whose max > 100 are DROPPED (above the K-2 ceiling). Clone of
 * check-sum-ceiling.js read-logic. MUST run on Hetzner (reads /var/www/lcs-media/decks/<locale>/).
 *
 * Band map (no ledger, go-luminous-moon.md Wave C):
 *   math-puzzle / math-worksheet: ≤10 → 2-trinn K.OA.A.2 · 11-20 → 2-trinn 1.OA.C.6 · 21-100 → 3-trinn 2.NBT.B.5
 *   code-addition:                ≤20 → 2-trinn 1.OA.C.6 · 21-100 → 3-trinn 2.NBT.B.5
 * Usage: node annotate-no-bands.js <coords.json> --type=math-puzzle [--locale=no] [--source=deck-html]
 */
'use strict';
const fs = require('fs');
const argv = process.argv.slice(2);
const coordsPath = argv.find(a => a.indexOf('--') !== 0);
const TYPE = (argv.find(a => a.indexOf('--type=') === 0) || '--type=').split('=')[1];
const locale = (argv.find(a => a.indexOf('--locale=') === 0) || '--locale=no').split('=')[1];
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
    // math-worksheet (Regn med bilder) shape: ex.values = {A:n,B:n,...} (picture values) + ex.equations[].result.
    // "within N" = max over the picture values AND the equation results (the child-seen numbers).
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
function bandFor(type, max) {
  if (type === 'math-puzzle' || type === 'math-worksheet') {
    if (max <= 10) return { level: '2-trinn', standard: 'K.OA.A.2' };
    if (max <= 20) return { level: '2-trinn', standard: '1.OA.C.6' };
    if (max <= 100) return { level: '3-trinn', standard: '2.NBT.B.5' };
    return null;
  }
  if (type === 'code-addition') {
    if (max <= 20) return { level: '2-trinn', standard: '1.OA.C.6' };
    if (max <= 100) return { level: '3-trinn', standard: '2.NBT.B.5' };
    return null;
  }
  return null;
}

const out = [], drops = [], unparseable = [];
coords.forEach(co => {
  const decks = (co.siblings && co.siblings.length) ? co.siblings : [co.canonical];
  let coMax = 0, gotAny = false;
  decks.forEach(s => { const r = SOURCE === 'deck-html' ? maxNumInDeckHtml(s) : maxNumInManifest(s); if (r !== null) { gotAny = true; if (r > coMax) coMax = r; } });
  if (!gotAny) { unparseable.push((co.mode || '') + '/' + co.theme); return; }
  const b = bandFor(TYPE, coMax);
  if (!b) { drops.push((co.mode || '') + '/' + co.theme + ' (max=' + coMax + ')'); return; }
  out.push(Object.assign({}, co, { level: b.level, standard: b.standard, _max: coMax }));
});
raw.coordinates = out;
fs.writeFileSync(coordsPath, JSON.stringify(raw, null, 2));
const byBand = {}; out.forEach(c => { const k = c.level + '/' + c.standard; byBand[k] = (byBand[k] || 0) + 1; });
console.log('annotated ' + out.length + '/' + coords.length + ' (' + TYPE + '); dropped(>100)=' + drops.length + (drops.length ? ' [' + drops.slice(0, 6).join(', ') + ']' : '') +
  '; unparseable=' + unparseable.length + (unparseable.length ? ' [' + unparseable.slice(0, 6).join(', ') + ']' : '') + '; bands=' + JSON.stringify(byBand));
