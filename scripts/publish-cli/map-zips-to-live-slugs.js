#!/usr/bin/env node
/**
 * map-zips-to-live-slugs.js — the --updates-manifest for an IN-PLACE republish of regenerated decks.
 *
 * The Deck table has no deck_id column, but every live deck folder carries its manifest.json, whose deck_id is the
 * one the regenerated ZIP carries too (deterministic from wave id + type + level + copy). So: read each ZIP's
 * manifest.deck_id, find the LIVE folder (the /decks/<loc>/<slug> symlink, never a -vN version dir) with the same
 * deck_id, and write { "<zip>": "<slug>" }. A ZIP with no live deck (unpublished since, or never published) is moved
 * into <folder>/.unmatched/ — publish-bulk skips dot-folders — so the run can only ever UPDATE.
 *
 *   node map-zips-to-live-slugs.js <staging-folder> <out.json> [--decks-root=/var/www/lcs-media/decks]
 *
 * Answer-position republish 2026-10-06.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const [folder, outFile] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const rootArg = process.argv.find((a) => a.startsWith('--decks-root='));
const ROOT = rootArg ? rootArg.split('=')[1] : '/var/www/lcs-media/decks';
if (!folder || !outFile) { console.error('usage: map-zips-to-live-slugs.js <staging-folder> <out.json>'); process.exit(2); }

const zips = fs.readdirSync(folder).filter((f) => f.endsWith('.zip'));
const want = new Map();   // deck_id -> { zip, lang }
for (const z of zips) {
  const m = JSON.parse(new AdmZip(path.join(folder, z)).readAsText('manifest.json'));
  if (!m.deck_id) throw new Error(`${z}: manifest has no deck_id`);
  if (want.has(m.deck_id)) throw new Error(`two ZIPs carry deck_id ${m.deck_id}`);
  want.set(m.deck_id, { zip: z, lang: m.language });
}
const langs = new Set([...want.values()].map((x) => x.lang));
const found = new Map();   // deck_id -> slug
for (const lang of langs) {
  const dir = path.join(ROOT, lang);
  for (const s of fs.readdirSync(dir)) {
    if (s.startsWith('.') || /-v\d+$/.test(s)) continue;
    const p = path.join(dir, s);
    let st; try { st = fs.lstatSync(p); } catch (e) { continue; }
    if (!st.isSymbolicLink()) continue;
    let m; try { m = JSON.parse(fs.readFileSync(path.join(p, 'manifest.json'), 'utf8')); } catch (e) { continue; }
    if (m.deck_id && want.has(m.deck_id) && want.get(m.deck_id).lang === lang) {
      if (found.has(m.deck_id)) throw new Error(`deck_id ${m.deck_id} is live under two slugs: ${found.get(m.deck_id)} and ${s}`);
      found.set(m.deck_id, s);
    }
  }
}
const out = {};
const un = path.join(folder, '.unmatched');
let moved = 0;
for (const [id, { zip }] of want) {
  if (found.has(id)) out[zip] = found.get(id);
  else { fs.mkdirSync(un, { recursive: true }); fs.renameSync(path.join(folder, zip), path.join(un, zip)); moved++; }
}
fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
console.log(`${zips.length} ZIPs: ${Object.keys(out).length} mapped to live slugs, ${moved} with no live deck moved to .unmatched/`);
