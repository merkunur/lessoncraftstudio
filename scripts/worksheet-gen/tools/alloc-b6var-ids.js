#!/usr/bin/env node
/**
 * alloc-b6var-ids.js — the nt5-F variation-face id allocation (Phase 2).
 *
 * Reads §3 of every design file in README id order, takes each "### F<n> / Face <n>"
 * heading's CONTENT band (an explicit K / G1 / G2 / G3 token in the heading; "base
 * band" or no token = the family's own band) and hands out ids from the free blocks
 * K-381+ · G1-400+ · G2-378+ · G3-400+ in file order. Deterministic, so twenty
 * builders working in parallel cannot collide. Writes
 * docs/worksheet-gen/b6-designs/_records/b6var-id-allocation.json and refuses if the
 * count is not exactly 50 or an id block would overlap a shipped spec on disk.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const DESIGNS = path.join(ROOT, '..', '..', 'docs', 'worksheet-gen', 'b6-designs');
const FAMILIES = ['K-379', 'K-380', 'G1-398', 'G1-399', 'G2-377'];
const NEXT = { K: 381, G1: 400, G2: 378, G3: 400 };
const DIR = { K: 'k', G1: 'g1', G2: 'g2', G3: 'g3' };

function bandOf(heading, fam) {
  const h = heading.replace(/`[^`]*`/g, (m) => m.replace(/[KG][0-9]?-3xx/g, ''));  // ids in code spans are placeholders
  const m = h.match(/\b(G[123]|K)\b(?=[,)\s;*]|$)/g) || [];
  const bands = m.filter((b) => b === 'K' || /^G[123]$/.test(b));
  const explicit = bands.find((b) => h.includes('(' + b) || h.includes(', ' + b) || h.includes('**' + b + '**') || h.includes(' ' + b + ')') || h.includes(' ' + b + ',') || h.includes('band ' + b));
  return explicit || fam.split('-')[0];
}

const out = [];
for (const fam of FAMILIES) {
  const file = fs.readdirSync(DESIGNS).find((f) => f.startsWith(fam + '-') && f.endsWith('.md'));
  if (!file) throw new Error('no design file for ' + fam);
  const md = fs.readFileSync(path.join(DESIGNS, file), 'utf8');
  const s = md.indexOf('\n## 3'); const e = md.indexOf('\n## 4', s + 1);
  if (s < 0 || e < 0) throw new Error(fam + ': §3 not found');
  const sec = md.slice(s, e);
  const heads = sec.split('\n').filter((l) => /^### (F[1-6]|Face [1-6])\b/.test(l));
  if (heads.length !== 5) throw new Error(fam + ': expected 5 face headings, found ' + heads.length + '\n' + heads.join('\n'));
  heads.forEach((h, i) => {
    const band = bandOf(h, fam);
    const id = band + '-' + NEXT[band]++;
    const title = h.replace(/^### (F[1-6]|Face [1-6])\s*[:\-–]\s*/, '').replace(/\s*\(.*$/, '').trim();
    out.push({ family: fam, key: file.replace(/^[A-Z0-9]+-[0-9]+-/, '').replace(/\.md$/, ''), face: i + 1, band, dir: DIR[band], id, title, heading: h.slice(4) });
  });
}
if (out.length !== 50) throw new Error('expected 50 faces, got ' + out.length);
// refuse if any allocated id already exists on disk as a spec
for (const r of out) {
  const hit = fs.readdirSync(path.join(ROOT, 'types', r.dir)).find((f) => f.startsWith(r.id + '-'));
  if (hit) throw new Error(r.id + ' already exists on disk: ' + hit);
}
const recDir = path.join(DESIGNS, '_records'); fs.mkdirSync(recDir, { recursive: true });
fs.writeFileSync(path.join(recDir, 'b6var-id-allocation.json'), JSON.stringify({ generated: new Date().toISOString().slice(0, 10), next: NEXT, faces: out }, null, 1) + '\n');
const per = {}; for (const r of out) per[r.band] = (per[r.band] || 0) + 1;
console.log('allocated 50 face ids:', per, '→ next free', NEXT);
for (const fam of FAMILIES) console.log('  ' + fam.padEnd(7) + out.filter((r) => r.family === fam).map((r) => r.id).join(' '));
