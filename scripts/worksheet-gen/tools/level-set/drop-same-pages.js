#!/usr/bin/env node
/**
 * drop-same-pages.js — a Level Set copy must be a DIFFERENT page (2026-11-13, Year pages B).
 *
 * build-waves.js accepts a themeless copy when the words it asks differ from the copies before it; a type whose
 * page does not depend on the seed at one level (the full multiplication square, an open "find your own way" frame)
 * has no such words, so five "copies" of one identical page were accepted. The ZIP check (check-zips-<prefix>.js)
 * sees it on the rendered thumbnail. This tool removes those copies where the truth is known, after generation:
 * in every wave folder of the prefix it groups the ZIPs of a (type, level) by their thumbnail, keeps the LOWEST copy
 * of each identical group, deletes the other ZIPs and takes their copies out of waves/wave-<prefix>-<loc>.json, so the
 * committed wave lists exactly the pages that exist.
 *
 *   node tools/level-set/drop-same-pages.js <prefix> [--dry-run]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AdmZip = require('adm-zip');
const prefix = process.argv[2];
const dry = process.argv.includes('--dry-run');
if (!/^[a-z]{2,6}$/.test(prefix || '')) { console.error('usage: drop-same-pages.js <prefix> [--dry-run]'); process.exit(1); }
const root = path.join(__dirname, '..', '..', 'out', 'staging');
const wavesDir = path.join(__dirname, '..', '..', 'waves');
let dropped = 0;
for (const w of fs.readdirSync(root).filter((d) => new RegExp('^wave-' + prefix + '-[a-z]{2}$').test(d)).sort()) {
  const loc = w.slice(-2);
  const dir = path.join(root, w);
  const groups = new Map();
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.zip'))) {
    const z = new AdmZip(path.join(dir, f));
    const m = JSON.parse(z.readAsText('manifest.json'));
    const thumb = crypto.createHash('sha1').update(z.getEntry('thumbnail.png').getData()).digest('hex');
    const copy = Number((/-(\d+)$/.exec(m.variant_id || '') || [])[1] || 1);
    const key = m.settings.worksheet_type + '|' + m.settings.difficulty + '|' + thumb;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ f, copy, type: m.settings.worksheet_type, level: m.settings.difficulty });
  }
  const waveFile = path.join(wavesDir, 'wave-' + prefix + '-' + loc + '.json');
  const wave = JSON.parse(fs.readFileSync(waveFile, 'utf8'));
  const out = [];
  for (const list of groups.values()) {
    if (list.length < 2) continue;
    list.sort((a, b) => a.copy - b.copy);
    for (const x of list.slice(1)) {
      const copies = wave.levels[x.type][String(x.level)];
      const i = copies.findIndex((c) => (typeof c === 'object' ? c.copy : c) === x.copy);
      if (i < 0) throw new Error(w + ': ' + x.f + ' is copy ' + x.copy + ' of ' + x.type + ' level ' + x.level + ', which the wave does not list');
      copies.splice(i, 1);
      if (!dry) fs.unlinkSync(path.join(dir, x.f));
      out.push(x.type + ' L' + x.level + ' copy ' + x.copy);
      dropped++;
    }
  }
  if (out.length && !dry) fs.writeFileSync(waveFile, JSON.stringify(wave, null, 2) + '\n');
  console.log(w + ': ' + (out.length ? out.length + ' same page(s) ' + (dry ? 'would be ' : '') + 'dropped: ' + out.sort().join(', ') : 'every copy is its own page'));
}
console.log(dropped + ' ' + (dry ? 'would be dropped' : 'dropped'));
