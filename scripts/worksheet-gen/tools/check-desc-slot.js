#!/usr/bin/env node
/**
 * check-desc-slot.js <locale> — does each staged deck's meta description carry
 * that face's OWN instruction, or did the family's generic skill sentence win?
 *
 * The description is assembled as `lead. MIDDLE. tail`, and the assembler picks
 * the LONGEST candidate that still fits 170 chars. The per-face instruction is
 * one candidate; the family-level skill sentence is another and is shared by
 * every face in the family. So a too-LONG instruction overflows and is dropped,
 * and a too-SHORT one simply loses — either way the whole family ends up sharing
 * one description, which is the opposite of what a variation fan-out is for.
 *
 * This reads the SHIPPED bytes rather than re-deriving them, so it cannot agree
 * with a bug in the assembler the way a re-implementation would.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const ROOT = path.join(__dirname, '..');

const loc = process.argv[2];
if (!loc) { console.error('usage: check-desc-slot.js <locale>'); process.exit(2); }
const dir = path.join(ROOT, 'out', 'staging', 'wave-b2var-' + loc);
if (!fs.existsSync(dir)) { console.error('no staged wave for ' + loc); process.exit(2); }

const strings = JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n', 'strings.' + loc + '.json'), 'utf8'));
const zips = fs.readdirSync(dir).filter((f) => f.endsWith('.zip'));
if (!zips.length) { console.error('refusing to report on 0 zips'); process.exit(2); }

const norm = (s) => String(s || '').replace(/\s+/g, ' ').replace(/\s*[.!?]+\s*$/, '').trim().toLowerCase();
let own = 0, lost = [], noInstr = 0;
for (const f of zips) {
  const m = /-((?:k|g\d)\d+)-/.exec(f);
  const id = m ? m[1].replace(/^(k|g\d)/, (x) => x.toUpperCase() + '-') : null;
  // en keeps each VARIATION's text in the spec module's own `i18n.en` block, not
  // in strings.en.json, so a strings-only lookup silently skips exactly the 36
  // faces this batch adds — and reports a clean 50/64 having measured none of
  // them. Fall back to the spec.
  let entry = id && strings[id];
  if (!entry && id) {
    try {
      const { loadType } = require('../lib/load-types.js');
      const spec = loadType(id);
      entry = spec && spec.i18n && (spec.i18n[loc] || spec.i18n.en);
    } catch (e) { entry = null; }
  }
  const instr = entry && entry.instruction;
  if (!instr) { noInstr++; continue; }
  const html = new AdmZip(path.join(dir, f)).readAsText('deck.html');
  const d = (/<meta name="description" content="([^"]*)"/.exec(html) || [])[1] || '';
  const dd = norm(d.replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"'));
  if (dd.includes(norm(instr))) own++;
  else lost.push(id);
}
console.log(`${loc}: ${own}/${zips.length - noInstr} faces carry their own instruction` +
  (noInstr ? ` (${noInstr} had no instruction in strings.${loc}.json)` : ''));
if (lost.length) console.log('   lost the slot: ' + lost.sort().join(' '));
