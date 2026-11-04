#!/usr/bin/env node
/**
 * sync-b3-drafts-from-banks.js [--apply] [--check]
 *
 * apply-b3-locale.js writes each draft's banks[<bank>] VERBATIM over data/b3/locales/<bank>.<loc>.json. Every fix since
 * the panels (native reviews, the Level Set reviews, the final-phase rounds) went into the locale files, so the drafts fell
 * behind: measured 2026-11-04, 60 (bank, locale) pairs, and in every one the draft equals an OLDER version of the locale
 * file (es syllable labels "sílabas ma …" removed 2026-09-20, it attore with a picture of a woman, nl one dobbelsteen,
 * sv höna, no kråke …). One apply run would have put all of it back. This copies each locale file into its draft, and
 * each shipped title / instruction (i18n/strings.<loc>.json, which apply also writes from the draft) into its types entry.
 *
 * Sound boxes, the same pass: a word the native review refused is listed in `exclude` and its rows stay in `bank`; every
 * reader skips an excluded word before any draw (lib/sound-boxes.js segment(), G1-494, build-sound-position-banks), so
 * the rows are dead weight that the bank validator rightly flags. They leave the bank, and so do texBoundary /
 * remergeAcrossSyllable entries for words no longer banked. No page changes (gate: the published-page identity).
 *
 * --check: exits 1 when any draft differs from its locale file (the deploy-time guard against this drift).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const WG = path.join(__dirname, '..');
const APPLY = process.argv.includes('--apply');
const CHECK = process.argv.includes('--check');
const LOCALES = ['de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/** read a JSON file with its formatting (indent, CRLF), refusing one this writer cannot reproduce byte for byte */
function readKeep(f) {
  const raw = fs.readFileSync(f, 'utf8');
  const crlf = raw.includes('\r\n');
  const s = raw.replace(/\r\n/g, '\n');
  const m = /^\{\n( +)"/.exec(s);
  const indent = m ? m[1].length : 2;
  const o = JSON.parse(s);
  const out = (x) => { const t = JSON.stringify(x, null, indent) + (s.endsWith('\n') ? '\n' : ''); return crlf ? t.replace(/\n/g, '\r\n') : t; };
  if (out(o) !== raw) throw new Error(`${path.relative(WG, f)}: does not round-trip through JSON.stringify(indent ${indent}) — refusing to rewrite it`);
  return { o, out };
}

/** the sound-box rule: no banked word is excluded; texBoundary / remergeAcrossSyllable name only banked words */
function cleanSoundBoxes(b) {
  const ex = new Set(b.exclude || []), gone = [];
  for (const k of Object.keys(b.bank || {})) if (ex.has(k)) { delete b.bank[k]; gone.push(k); }
  for (const f of ['texBoundary', 'remergeAcrossSyllable']) if (Array.isArray(b[f])) {
    const keep = b[f].filter((k) => b.bank[k]);
    if (keep.length !== b[f].length) { gone.push(...b[f].filter((k) => !b.bank[k]).map((k) => f + ':' + k)); b[f] = keep; }
  }
  return gone;
}

let drift = 0, writes = 0;
for (const loc of LOCALES) {
  const df = path.join(WG, 'i18n', `.draft-b3-${loc}.json`);
  if (!fs.existsSync(df)) continue;
  const D = readKeep(df);
  let draftChanged = false;
  for (const name of Object.keys(D.o.banks || {})) {
    const lf = path.join(WG, 'data', 'b3', 'locales', `${name}.${loc}.json`);
    if (!fs.existsSync(lf)) { console.log(`${loc} ${name}: the draft carries a bank with no locale file (left as it is)`); continue; }
    const L = readKeep(lf);
    if (name === 'sound-boxes') {
      const gone = cleanSoundBoxes(L.o);
      if (gone.length) { console.log(`${loc} sound-boxes: ${gone.length} refused rows out — ${gone.join(', ')}`); if (APPLY) { fs.writeFileSync(lf, L.out(L.o)); writes++; } }
    }
    if (JSON.stringify(D.o.banks[name]) !== JSON.stringify(L.o)) {
      drift++;
      const fields = [...new Set([...Object.keys(D.o.banks[name]), ...Object.keys(L.o)])].filter((k) => JSON.stringify(D.o.banks[name][k]) !== JSON.stringify(L.o[k]));
      console.log(`${loc} ${name}: draft behind the locale file (${fields.join(', ')})`);
      D.o.banks[name] = JSON.parse(JSON.stringify(L.o));
      draftChanged = true;
    }
  }
  // the printed strings: apply writes i18n/strings.<loc>.json {title, instruction} from the draft's types, and the fixes
  // since (the landing panels' shipped-string defects, the reviews) went into the strings file (measured: 71 of them)
  const S = JSON.parse(fs.readFileSync(path.join(WG, 'i18n', `strings.${loc}.json`), 'utf8'));
  for (const [id, t] of Object.entries(D.o.types || {})) {
    if (!S[id]) continue;
    for (const k of ['title', 'instruction']) if (t[k] !== undefined && S[id][k] !== undefined && t[k] !== S[id][k]) {
      drift++; console.log(`${loc} ${id}.${k}: draft behind strings.${loc}.json`); t[k] = S[id][k]; draftChanged = true;
    }
  }
  if (draftChanged && APPLY) { fs.writeFileSync(df, D.out(D.o)); writes++; }
}
console.log(`${drift} draft bank(s) / string(s) behind their source; ${APPLY ? writes + ' file(s) written' : 'dry run (--apply writes)'}`);
if (CHECK && drift) process.exit(1);
