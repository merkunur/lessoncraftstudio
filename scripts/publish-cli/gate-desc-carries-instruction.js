#!/usr/bin/env node
/**
 * gate-desc-carries-instruction.js <staging-dir> [<staging-dir> ...]
 *
 * Asserts that every staged printable deck's <meta name="description"> actually
 * carries THAT face's own instruction sentence.
 *
 * WHY THIS GATE EXISTS. `bandedDescription` (build-seo-head.js) picks the
 * LONGEST middle that fits inside 120-170 chars from a candidate list. The
 * per-face `instruction` competes with a skill sentence resolved from the
 * FAMILY key, so it loses in BOTH directions:
 *
 *   too long  -> the whole description overflows 170, the instruction is
 *                discarded, and the generic family sentence is used instead
 *   too short -> the generic family sentence is simply longer and wins
 *
 * The face then falls back to the family skill sentence -- or, when that does
 * not band either, to no middle at all.
 *
 * WHAT THIS IS AND IS NOT. Measured on the 704 nt20-B-VAR decks: 70 faces (10%)
 * lose their instruction this way, but **0 descriptions are duplicated** and
 * **0 within-family pairs reach the 0.80 similarity FAIL line** -- the lead
 * carries the per-face title, so uniqueness survives. The cost is specificity,
 * not duplication: the page stops saying what is on THIS sheet. The five WARN
 * pairs (0.65-0.78, all Spanish) are all own:n/n, so restoring the instruction
 * is exactly the lever that would clear them. Do not describe a failure here as
 * a duplicate-description defect; I did, and the measurement refuted it.
 *
 * ARCHITECTURAL NOTE. The instruction serves two masters -- it is also the
 * sentence printed on the sheet for the child. Several of the 70 fail only
 * because a good on-page instruction is longer than the meta slot allows
 * (en G1-258 is 75 chars against a 30-56 window), and shortening it to win the
 * slot would make the worksheet worse. The right fix is a separate per-face
 * `metaSentence`, not a truncated instruction. Until that exists, treat this
 * gate as a quality report, not a build blocker.
 *
 * The check is containment of the instruction MINUS its trailing mark, because
 * the engine strips a trailing [.?!] and appends its own period.
 *
 * NON-VACUITY. A containment gate whose right-hand side is empty passes on
 * everything, so this refuses to report success unless it actually found zips,
 * resolved a strings file, and resolved an instruction for every deck it read.
 * Anything unresolvable is a FAULT, never a skip.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const dirs = process.argv.slice(2);
if (!dirs.length) { console.error('usage: gate-desc-carries-instruction.js <staging-dir> [...]'); process.exit(2); }

const ROOT = path.join(__dirname, '..', '..');
const STRINGS = path.join(ROOT, 'scripts', 'worksheet-gen', 'i18n');
const cache = new Map();
function stringsFor(loc) {
  if (!cache.has(loc)) {
    const p = path.join(STRINGS, `strings.${loc}.json`);
    if (!fs.existsSync(p)) throw new Error(`no strings file for locale ${loc} (${p})`);
    cache.set(loc, JSON.parse(fs.readFileSync(p, 'utf8')));
  }
  return cache.get(loc);
}

// variant_id is the face id lowercased with the hyphen dropped: "g2297" -> "G2-297",
// "k289" -> "K-289". The band prefix is "K" (no digit) or "G" plus exactly one
// digit, so the alternation must be anchored that way: a lazy `[kg]\d?` parses
// "k289" as K2-89 and then reports every kindergarten face as unresolvable,
// which is a fault in the gate reading as a fault in the corpus.
function faceId(variantId) {
  const m = String(variantId || '').match(/^(k|g\d)(\d+)$/i);
  if (!m) return null;
  return `${m[1].toUpperCase()}-${m[2]}`;
}

let read = 0, own = 0, faults = [];
for (const dir of dirs) {
  if (!fs.existsSync(dir)) { faults.push(`${dir}: no such directory`); continue; }
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.zip'))) {
    const zp = path.join(dir, f);
    let z, man, html;
    try {
      z = new AdmZip(zp);
      man = JSON.parse(z.getEntry('manifest.json').getData().toString('utf8'));
      html = z.getEntry('deck.html').getData().toString('utf8');
    } catch (e) { faults.push(`${f}: unreadable (${e.message})`); continue; }
    read++;
    const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
    if (!desc) { faults.push(`${f}: no meta description`); continue; }
    const id = faceId(man.variant_id);
    if (!id) { faults.push(`${f}: cannot derive face id from variant_id ${JSON.stringify(man.variant_id)}`); continue; }
    let entry;
    try { entry = stringsFor(man.language)[id]; } catch (e) { faults.push(`${f}: ${e.message}`); continue; }
    if (!entry || !entry.instruction) { faults.push(`${f}: no instruction for ${id} in strings.${man.language}.json`); continue; }
    const stem = entry.instruction.replace(/[.!?…]+\s*$/, '').trim();
    if (!stem) { faults.push(`${f}: instruction for ${id} is empty after stripping the end mark`); continue; }
    if (desc.includes(stem)) { own++; continue; }
    faults.push(`${man.language} ${id}: description does NOT carry its own instruction\n` +
      `      instruction (${entry.instruction.length}): ${JSON.stringify(entry.instruction)}\n` +
      `      description (${desc.length}): ${JSON.stringify(desc)}`);
  }
}

if (!read) { console.error('VACUOUS: no staged zips read — refusing to report success'); process.exit(2); }
console.log(`read ${read} staged decks; ${own} carry their own instruction`);
if (faults.length) {
  console.error(`\n${faults.length} fault(s):`);
  faults.forEach((x) => console.error('  ' + x));
  process.exit(1);
}
console.log('all descriptions carry their own per-face instruction');
