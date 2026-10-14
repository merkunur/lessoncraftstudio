#!/usr/bin/env node
/**
 * check-zips-mps.js — pre-upload check of the Map Skills Level Set ZIPs (2026-10-14; cloned from check-zips-grc.js).
 *
 *   node scripts/worksheet-gen/tools/level-set/check-zips-mps.js [--poison]
 *
 * Every ZIP: marked indexable:false · PDF only (no answer key, no interactive bundle) · title ≤ 100 · description
 * 120-170 · no title twice inside a face · every copy of a face × level a DIFFERENT page (spec.levelSetWords of the copy rebuilt from its wave
 * entry: counts / models / rose letters / numbering / rows) and a different thumbnail · ZIP count per locale = the wave's enumeration. --poison runs the checks on a
 * doctored copy of the first ZIP (indexable true, an answer key, a 171-char description, a repeated page) and
 * exits 1 unless every one is caught.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AdmZip = require('adm-zip');
const root = path.join(__dirname, '..', '..', 'out', 'staging');
const wavesDir = path.join(__dirname, '..', '..', 'waves');
const { loadType } = require('../../lib/load-types.js');
const { makeRng, instanceSeed } = require('../../lib/rng.js');
// a PDF-only deck.html carries no page markup and the manifest no picture: rebuild the copy from its wave entry
// (the generator's own seed) and read the picture from that build
function figureOf(wave, typeId, level, copy, locale) {
  const e = ((wave.levels[typeId] || {})[level] || []).find((x) => x.copy === copy);
  if (!e) return null;
  const spec = loadType(typeId);
  const seed = instanceSeed({ typeId, theme: null, difficulty: level, seedEpoch: wave.seedEpoch || 1, variant: e.seedVariant, unit: null });
  return spec.levelSetWords(spec.build({ theme: null, difficulty: level, locale, unit: null }, { rng: makeRng(seed), variant: copy, seedVariant: e.seedVariant }).meta).join('|');
}

function inspect(z) {
  const m = JSON.parse(z.readAsText('manifest.json'));
  const html = z.readAsText('deck.html');
  return {
    m, html,
    thumb: crypto.createHash('sha1').update(z.getEntry('thumbnail.png').getData()).digest('hex'),
    title: (/<title>([^<]*)<\/title>/.exec(html) || [])[1] || '',
    desc: (/name="description" content="([^"]*)"/.exec(html) || [])[1] || '',
    hasKey: !!z.getEntry('answer-key.pdf'),
    hasPdf: !!z.getEntry('printable.pdf') || z.getEntries().some((e) => /\.pdf$/.test(e.entryName) && !/answer/.test(e.entryName)),
  };
}
function probsOf(x) {
  const p = [];
  if (x.m.indexable !== false) p.push('NOT marked indexable:false');
  if (x.hasKey) p.push('has an answer key (PDF only)');
  if (x.m.interactive || /window\.DECK_BUNDLE=/.test(x.html)) p.push('interactive bundle (PDF only)');
  if (!x.hasPdf) p.push('no printable PDF');
  if (x.title.length > 100) p.push('title ' + x.title.length + ' > 100');
  if (x.desc.length < 120 || x.desc.length > 170) p.push('desc ' + x.desc.length);
  return p;
}

if (process.argv.includes('--poison')) {
  const dir = fs.readdirSync(root).filter((d) => d.startsWith('wave-mps-')).map((d) => path.join(root, d))[0];
  const f = fs.readdirSync(dir).find((x) => x.endsWith('.zip'));
  const clean = inspect(new AdmZip(path.join(dir, f)));
  const cases = {
    indexable: { ...clean, m: { ...clean.m, indexable: true } },
    answerKey: { ...clean, hasKey: true },
    longDesc: { ...clean, desc: 'x'.repeat(171) },
  };
  const missed = Object.entries(cases).filter(([, c]) => probsOf(c).length === 0).map(([k]) => k);
  const ctrl = probsOf(clean);
  console.log(`poisons ${3 - missed.length}/3 caught · control ${ctrl.length ? 'FAILED ' + ctrl.join(',') : 'passes'}`);
  process.exit(missed.length || ctrl.length ? 1 : 0);
}

let bad = 0, total = 0;
for (const w of fs.readdirSync(root).filter((d) => d.startsWith('wave-mps-')).sort()) {
  const dir = path.join(root, w);
  const zips = fs.readdirSync(dir).filter((x) => x.endsWith('.zip'));
  const wave = JSON.parse(fs.readFileSync(path.join(wavesDir, w + '.json'), 'utf8'));
  const want = Object.values(wave.levels).flatMap((l) => Object.values(l).flat()).length;
  if (zips.length !== want) { bad++; console.log(`FAIL ${w}: ${zips.length} ZIPs, the wave enumerates ${want}`); }
  const byFace = {}, byLevel = {};
  for (const f of zips) {
    total++;
    const x = inspect(new AdmZip(path.join(dir, f)));
    x.figure = figureOf(wave, x.m.settings.worksheet_type, x.m.settings.difficulty, +((/-v(\d+)\.zip$/.exec(f) || [])[1]), x.m.language || w.slice(9));
    const probs = probsOf(x);
    if (!x.figure) probs.push('copy not found in its wave');
    if (probs.length) { bad++; console.log('FAIL ' + w + '/' + f + ': ' + probs.join('; ')); }
    const t = x.m.settings.worksheet_type, lv = x.m.settings.difficulty;
    (byFace[t] = byFace[t] || []).push(x.title);
    (byLevel[t + ' L' + lv] = byLevel[t + ' L' + lv] || []).push(x);
  }
  for (const [t, titles] of Object.entries(byFace)) if (new Set(titles).size !== titles.length) { bad++; console.log(`FAIL ${w} ${t}: a title repeats inside the face`); }
  for (const [k, list] of Object.entries(byLevel)) {
    if (new Set(list.map((x) => x.figure)).size !== list.length) { bad++; console.log(`FAIL ${w} ${k}: a page repeats (${list.map((x) => x.figure).join(',')})`); }
    if (new Set(list.map((x) => x.thumb)).size !== list.length) { bad++; console.log(`FAIL ${w} ${k}: a thumbnail repeats`); }
  }
}
console.log(`${total} ZIPs, ${bad} problems`);
if (!total || bad) process.exit(1);
