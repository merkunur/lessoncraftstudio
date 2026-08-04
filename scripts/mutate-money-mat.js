#!/usr/bin/env node
/* =====================================================================
   mutate-money-mat.js — DOES verify-money-mat.js BITE?

   A gate nobody has proven can fail is not a gate. This breaks the tool in
   ~40 named ways and requires verify- to catch every one.

   Three verdict classes, and only one is a pass:
     KILLED    the gate failed, as it must
     SURVIVED  the gate passed on a broken tool — a HOLE
     FAULT     the needle was not found, or the patch changed nothing
               (an INERT mutation is a bad mutation, not a gate hole, and
               it must not be counted as a kill — that is how a harness
               reports a clean sweep of nothing)

   ⚠ A gate that HANGS is a gate that SURVIVED. Each run is capped at 30s
     and a timeout is scored as survival, never as a kill.
   ⚠ SRC is read with CRLF collapsed. `git checkout` normalises line endings
     through core.autocrlf (which is `true` in this repo), and multi-line
     needles go silently blind the moment it does.
   ⚠ Locale needles SELF-ANCHOR on the live file. Hard-coding the English
     literal gives a needle a half-life: the moment the locale round
     rewrites the strings block, it dies and the total silently shrinks
     while the harness still says "every mutation killed".

   Usage: node scripts/mutate-money-mat.js [--only=<substring>]
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const REPO = path.join(__dirname, '..');
const TOOL = path.join(REPO, 'mini tools', 'money-mat.js');
const GATE = path.join(__dirname, 'verify-money-mat.js');
const SRC = fs.readFileSync(TOOL, 'utf8').replace(/\r\n/g, '\n');
const only = (process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1];

/* self-anchoring locale needle: read the CURRENT en value for a key and
   replace it, so the needle survives any rewrite of the strings block */
function enNeedle(key, replacement, name) {
  const re = new RegExp('(' + key + ':\\s*\\{\\s*en:\\s*)([\'"])((?:(?!\\2).)*)\\2');
  const m = SRC.match(re);
  if (!m) throw new Error(`enNeedle: no en value found for "${key}" — the needle is stale`);
  if (m[3] === replacement) throw new Error(`enNeedle: "${key}" already equals the replacement`);
  return [name, m[0], `${m[1]}${m[2]}${replacement}${m[2]}`];
}

const M = [
  /* ---- denominations ---- */
  ['a coin loses its diameter', "{ v: 1, label: '1c', d: 30, fam: 'copper' }", "{ v: 1, label: '1c', fam: 'copper' }"],
  ['a coin is drawn below the canvas floor', "{ v: 5, label: '5c', d: 38, fam: 'copper' }", "{ v: 5, label: '5c', d: 12, fam: 'copper' }"],
  ['a coin loses its face text', "{ v: 25, label: '25¢', d: 43, fam: 'silver' }", "{ v: 25, label: '', d: 43, fam: 'silver' }"],
  ['NOK grows a 2 kr coin that does not exist', "nok: { symbol: 'kr', before: false, decimalSep: ',', minorPerMajor: 1,\n      coins: [ { v: 1, label: '1 kr', d: 34, fam: 'silver' },", "nok: { symbol: 'kr', before: false, decimalSep: ',', minorPerMajor: 1,\n      coins: [ { v: 1, label: '1 kr', d: 34, fam: 'silver' }, { v: 2, label: '2 kr', d: 36, fam: 'silver' },"],
  ['a note is worth less than a coin', "notes: [ { v: 500, label: '5 €', tint: '#A9BF9C' }", "notes: [ { v: 50, label: '5 €', tint: '#A9BF9C' }"],
  ['a whole-krona currency grows a sub-unit', "sek: { symbol: 'kr', before: false, decimalSep: ',', minorPerMajor: 1,", "sek: { symbol: 'kr', before: false, decimalSep: ',', minorPerMajor: 100,"],

  /* ---- composability + the price generator ---- */
  ['composable always says yes', /composable: function \(amount, values\) \{[\s\S]*?\n  \},/, 'composable: function (amount, values) { return true; },'],
  ['composable always says no', /composable: function \(amount, values\) \{[\s\S]*?\n  \},/, 'composable: function (amount, values) { return amount === 0; },'],
  ['whole-krona ignores the smallest coin', '? Math.max(1, minCoin)', '? 1'],
  ['the grain ignores the smallest coin', 'Math.max(fine ? minCoin : b.grainCents, minCoin)', '(fine ? minCoin : b.grainCents)'],
  ['band 3 goes back to a one-cent grain', '3: { maxCents: 2000, maxKr: 100, grainCents: 10 }', '3: { maxCents: 2000, maxKr: 100, grainCents: 1 }'],
  /* ⚠ RETIRED: 'the price range floor drops below the smallest coin'
     (lo = Math.max(minCoin, …) → lo = …). PROVEN an equivalent mutant, not
     a gate hole: the grain is itself Math.max(…, minCoin), so the rounded
     floor is already ≥ minCoin. Measured load-bearing in ZERO of 504
     configurations of currency × band × tier × coinsFrom × fineGrain. The
     Math.max stays in the tool as a cheap guard against a future change to
     the grain, but a needle that cannot distinguish two behaviours is a bad
     needle, and counting it as a survivor would be counting noise. */
  ['the price ceiling escapes its band', 'hi = Math.max(lo, Math.floor(hi / grain) * grain);', 'hi = Math.max(lo, Math.floor(hi / grain) * grain) + grain;'],
  ['a set price stops snapping to the grain', 'var v = Math.round(want / s.grain) * s.grain;', 'var v = want;'],

  /* ---- change ---- */
  /* the change DP. ⚠ "change stops summing exactly" retired with greedy —
     the old needle patched `if (rem !== 0) return null`, which no longer
     exists, and it had been an EQUIVALENT MUTANT anyway: greedy never left
     a remainder on any canonical set the tool shipped at the time. */
  ['change stops being fewest-coins', 'if (len[a] === undefined || len[a - v] + 1 < len[a])', 'if (len[a] === undefined || len[a - v] + 1 > len[a])'],
  ['change is presented largest-first', 'return out.sort(function (a, b) { return a - b; });', 'return out.sort(function (a, b) { return b - a; });'],
  ['the DP goes back to greedy, and strands a purse of 10s and 25s', /fewestChange: function \(change, coinValues\) \{[\s\S]*?\n  \},/,
    'fewestChange: function (change, coinValues) { var vals = coinValues.slice().sort(function (a, b) { return b - a; }); var out = [], rem = change; for (var i = 0; i < vals.length && rem > 0; i++) { while (vals[i] <= rem) { out.push(vals[i]); rem -= vals[i]; } } if (rem !== 0) return null; return out.sort(function (a, b) { return a - b; }); },'],
  ['change stops summing exactly', 'if (len[change] === undefined) return null;', 'if (len[change] === undefined) return [];'],
  ['the humane count-on cap is lifted', 'return chg !== null && chg.length <= 6;', 'return chg !== null;'],
  ['a tender no longer has to exceed the price', 'if (d.v <= price) return false;', 'if (d.v < 0) return false;'],
  ['the change gap is computed off the wrong end', 'return (this.chg.tender - this.price) - this.trayTotal();', 'return (this.chg.tender + this.price) - this.trayTotal();'],

  /* ---- format ---- */
  ['the euro loses its comma decimal', "eur: { symbol: '€', before: false, decimalSep: ','", "eur: { symbol: '€', before: false, decimalSep: '.'"],
  ['the symbol moves to the wrong side', 'return c.before ? (c.symbol + \' \' + s) : (s + \' \' + c.symbol);', 'return c.before ? (s + \' \' + c.symbol) : (c.symbol + \' \' + s);'],
  ['minor amounts stop padding to two digits', "s = maj + (c.decimalSep || '.') + (min < 10 ? '0' + min : '' + min);", "s = maj + (c.decimalSep || '.') + min;"],
  ['the tag stops using minor form under one major', 'if (v < c.minorPerMajor) return v + \' \' + this._minorMark(cKey);', 'if (false) return v + \' \' + this._minorMark(cKey);'],
  ['the round stops pinning its notation', /formatLike: function \(v, ref\) \{[\s\S]*?\n  \},/, 'formatLike: function (v, ref) { return this.formatTag(v); },'],
  ['formatLike ignores the anchor entirely', 'if (anchor < c.minorPerMajor) return v + \' \' + this._minorMark();', 'if (v < c.minorPerMajor) return v + \' \' + this._minorMark();'],

  /* ---- seating ---- */
  ['the item stops being seated on the counter edge', 'bottom: -(t.ih - t.y - t.h) * k', 'bottom: 0'],
  ['the item scale ignores one axis', 'var k = Math.min(maxH / t.h, maxW / t.w);', 'var k = maxH / t.h;'],
  ['an item trim drifts', 'apple: { x: 125, y: 24, w: 759, h: 982, iw: 1024, ih: 1024 }', 'apple: { x: 140, y: 24, w: 759, h: 982, iw: 1024, ih: 1024 }'],

  /* ---- spoken ---- */
  ['a spoken template loses its placeholder', "both: {en:'{maj} {majUnit} and {min} {minUnit}'", "both: {en:'{maj} {majUnit} and'"],
  ['a unit word pair goes missing', "usd: { en: { majS:'dollar', majP:'dollars', minS:'cent', minP:'cents' } }", "usd: { en: { majS:'dollar', majP:'dollars' } }"],
  ['the singular/plural choice inverts', 'majUnit: maj === 1 ? uw.majS : uw.majP', 'majUnit: maj === 1 ? uw.majP : uw.majS'],

  /* ---- strings, and the design law ---- */
  ['a locale goes empty', /instruction:  \{en:'([^']*)'/, "instruction:  {en:''"],
  ['the stage starts delivering a verdict', null, null, () => enNeedle('paidLine', 'That is correct!', 'the stage starts delivering a verdict')],
  ['a score creeps in', null, null, () => enNeedle('bothWays', 'You scored 2 points!', 'a score creeps in')],
  ['a Spanish verdict slips past the ban', /es:'Pagaste \{price\} — ¡gracias!'/, "es:'La respuesta es incorrecta'"],
  ['a Finnish verdict slips past the ban', /fi:'Se oli tasan \{price\} — kiitos!'/, "fi:'Se on väärä'"],
  ['a German verdict slips past the ban', /de:'Du hast \{price\} bezahlt — danke!'/, "de:'Die falsche Münze'"],
  ['the tool declares tasks', '  id: \'money-mat\',', '  id: \'money-mat\',\n  tasks: [],'],
  ['a noun row goes missing', /apple: \{en:'the apple',/, "apple: {"]
];

/* resolve the deferred (self-anchoring) needles */
const NEEDLES = [];
for (const m of M) {
  if (typeof m[3] === 'function') {
    try { NEEDLES.push(m[3]()); } catch (e) { NEEDLES.push([m[0], null, null, e.message]); }
  } else NEEDLES.push(m);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mm-mutate-'));
const killed = [], survived = [], faults = [];

for (const [name, from, to, err] of NEEDLES) {
  if (only && name.indexOf(only) === -1) continue;
  if (err) { faults.push(`${name} — ${err}`); continue; }

  let mutated;
  if (from instanceof RegExp) {
    if (!from.test(SRC)) { faults.push(`${name} — NEEDLE NOT FOUND`); continue; }
    mutated = SRC.replace(from, to);
  } else {
    if (SRC.indexOf(from) === -1) { faults.push(`${name} — NEEDLE NOT FOUND`); continue; }
    mutated = SRC.split(from).join(to);
  }
  if (mutated === SRC) { faults.push(`${name} — INERT (the patch changed nothing)`); continue; }

  fs.writeFileSync(path.join(tmp, 'money-mat.js'), mutated);
  let died = false, why = '';
  try {
    execFileSync(process.execPath, [GATE], {
      env: Object.assign({}, process.env, { MM_TOOL_DIR: tmp }),
      timeout: 30000, stdio: 'pipe'
    });
  } catch (e) {
    died = true;
    why = e.killed || e.signal ? 'TIMEOUT' : 'FAIL';
  }
  if (died && why === 'TIMEOUT') survived.push(`${name} (the gate HUNG — that is a survival, not a kill)`);
  else if (died) killed.push(name);
  else survived.push(name);
}

try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) {}

console.log(`\nmutate-money-mat: ${killed.length} killed, ${survived.length} survived, ${faults.length} harness faults`);
if (faults.length) { console.log('\nHARNESS FAULTS (fix these first — they are not gate holes):'); faults.forEach((f) => console.log('  ⚠ ' + f)); }
if (survived.length) { console.log('\nSURVIVED (gate holes):'); survived.forEach((s) => console.log('  ✗ ' + s)); }
if (!survived.length && !faults.length) console.log('every mutation killed');
process.exit(survived.length || faults.length ? 1 : 0);
