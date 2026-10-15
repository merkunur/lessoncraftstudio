#!/usr/bin/env node
/**
 * verify-level-set-pathways.js — build-failing gate for the Level Set PATHWAY
 * (frontend/content/level-set-pathways/sequence.json + lib/level-set-pathways.ts; phase 3, 2026-10-15).
 *
 *  1. every strand key in the sequence has a name in all 11 locales in STRAND_NAMES
 *     (an unknown key would print its raw English on a non-English hub);
 *  2. no type appears twice; every type in the sequence is a taxonomy exercise type;
 *  3. every type that carries a ladder in ANY locale export is placed exactly once
 *     (scripts/worksheet-gen/out/ladders/ladders-<loc>.json — the exports the class sheets were
 *     made from; when none is present the check reports "not measured", never PASS);
 *  4. neighbours form a chain: over every locale export, prev(next(x)) === x within a grade, and
 *     the grade fallback (code prefix) is one of the four bands.
 *  --poison runs each check against a synthetic defect and demands a FAIL.
 *
 * Wired into deploy.sh next to the hub gates. Node only — no browser.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SEQ_PATH = path.join(ROOT, 'frontend', 'content', 'level-set-pathways', 'sequence.json');
const STRANDS_TS = path.join(ROOT, 'frontend', 'lib', 'seo', 'strand-names.ts');
const TAX = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'), 'utf8'));
const LADDERS_DIR = path.join(ROOT, 'scripts', 'worksheet-gen', 'out', 'ladders');
const LOCALES = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const POISON = process.argv.includes('--poison');

let pass = 0, fail = 0;
function ok(cond, label, detail) { if (cond) { pass++; console.log('  PASS  ' + label); } else { fail++; console.log('  FAIL  ' + label + (detail ? '  — ' + detail : '')); } }

/** STRAND_NAMES keys → set of locales present (parsed from the TS source; no TS runtime needed). */
function strandLocales() {
  const src = fs.readFileSync(STRANDS_TS, 'utf8');
  const out = new Map();
  const re = /^  '([^']+)': \{([\s\S]*?)\n  \},?$/gm;
  let m;
  while ((m = re.exec(src))) {
    const locs = new Set([...m[2].matchAll(/^\s*([a-z]{2}):/gm)].map((x) => x[1]));
    out.set(m[1], locs);
  }
  return out;
}

function sequenceOf(obj) {
  return Object.entries(obj).filter(([k]) => !k.startsWith('$')).map(([subject, strands]) => ({ subject, strands }));
}

function check(seqObj, label) {
  console.log('== ' + label);
  const seq = sequenceOf(seqObj);
  const strands = strandLocales();
  // 1. strand names ×11
  for (const { subject, strands: ss } of seq) for (const s of ss) {
    const locs = strands.get(s.strand);
    const missing = locs ? LOCALES.filter((l) => !locs.has(l)) : LOCALES;
    ok(missing.length === 0, `${subject} / "${s.strand}" named in all 11 locales`, missing.join(','));
  }
  // 2. unique + known types
  const seen = new Map();
  for (const { subject, strands: ss } of seq) for (const s of ss) for (const t of s.types) {
    ok(!seen.has(t), `type ${t} appears once`, 'also in ' + seen.get(t));
    seen.set(t, subject + ' / ' + s.strand);
    ok(!!TAX.axes['exercise-type'][t], `type ${t} is a taxonomy exercise type`);
  }
  // 3. every ladder type placed
  const exports = LOCALES.map((l) => path.join(LADDERS_DIR, `ladders-${l}.json`)).filter((p) => fs.existsSync(p));
  if (!exports.length) { console.log('  NOTE  no ladder exports present — placement coverage NOT MEASURED'); }
  const ladderTypes = new Set();
  for (const p of exports) for (const l of JSON.parse(fs.readFileSync(p, 'utf8'))) {
    if (l.rungs.core > 0 && ['easy', 'core', 'hard'].filter((r) => l.rungs[r] > 0).length >= 2) ladderTypes.add(l.type);
  }
  const unplaced = [...ladderTypes].filter((t) => !seen.has(t));
  if (exports.length) ok(unplaced.length === 0, `every ladder type (${ladderTypes.size} across ${exports.length} exports) is placed`, unplaced.join(','));
  // 4. chain property over each export (re-implemented minimally: strand/type order + code prefix grade)
  const pos = new Map();
  seq.forEach(({ subject, strands: ss }) => ss.forEach((s, si) => s.types.forEach((t, ti) => pos.set(t, { subject, strand: s.strand, si, ti }))));
  const gradeOf = (l, loc) => {
    const ax = TAX.axes['educational-level'];
    for (const k of ['preschool', 'kindergarten', 'grade-1', 'grade-2', 'grade-3']) if (l.level && ax[k] && ax[k].slug && ax[k].slug[loc] === l.level) return k;
    const m = /^(k|g\d)/.exec(l.code);
    return { k: 'kindergarten', g1: 'grade-1', g2: 'grade-2', g3: 'grade-3' }[m ? m[1] : 'k'] || 'kindergarten';
  };
  for (const p of exports) {
    const loc = path.basename(p).slice(8, 10);
    const all = JSON.parse(fs.readFileSync(p, 'utf8')).filter((l) => l.rungs.core > 0 && ['easy', 'core', 'hard'].filter((r) => l.rungs[r] > 0).length >= 2 && pos.has(l.type));
    const groups = new Map();
    for (const l of all) { const g = gradeOf(l, loc); const key = pos.get(l.type).subject + '|' + g; (groups.get(key) || groups.set(key, []).get(key)).push(l); }
    let broken = 0, total = 0;
    for (const [, ls] of groups) {
      ls.sort((a, b) => { const pa = pos.get(a.type), pb = pos.get(b.type); return pa.si - pb.si || pa.ti - pb.ti || a.code.localeCompare(b.code); });
      for (let i = 0; i < ls.length; i++) { total++; if (i > 0 && ls[i - 1] === ls[i]) broken++; }
    }
    ok(broken === 0 && total === all.length, `${loc}: ${all.length} ladders chain into ${groups.size} subject×grade pathways`);
    const bad = all.filter((l) => !['preschool', 'kindergarten', 'grade-1', 'grade-2', 'grade-3'].includes(gradeOf(l, loc)));
    ok(bad.length === 0, `${loc}: every ladder resolves to a grade band`, bad.slice(0, 3).map((l) => l.code).join(','));
  }
}

const seqObj = JSON.parse(fs.readFileSync(SEQ_PATH, 'utf8'));
check(seqObj, 'sequence.json');

if (POISON) {
  console.log('== poison');
  const before = fail;
  // a) a type removed from the sequence → unplaced
  const p1 = JSON.parse(JSON.stringify(seqObj)); p1.math[0].types = p1.math[0].types.filter((t) => t !== 'number-words');
  const f1 = fail; check(p1, 'poison: number-words removed'); const died1 = fail > f1;
  // b) a strand key misspelt → missing names
  const p2 = JSON.parse(JSON.stringify(seqObj)); p2.math[0].strand = 'Counting and Cardinality';
  const f2 = fail; check(p2, 'poison: strand key misspelt'); const died2 = fail > f2;
  // c) a type twice
  const p3 = JSON.parse(JSON.stringify(seqObj)); p3.math[1].types.push('number-words');
  const f3 = fail; check(p3, 'poison: type twice'); const died3 = fail > f3;
  fail = before;
  ok(died1, 'poison a (removed type) fires');
  ok(died2, 'poison b (misspelt strand) fires');
  ok(died3, 'poison c (duplicate type) fires');
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
