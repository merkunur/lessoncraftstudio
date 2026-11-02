#!/usr/bin/env node
/**
 * guessfix-regen.js <live.jsonl> [--locales=en,de] [--dry-run]
 *
 * 2026-11-01 guessability fixes (the answer is no longer guessable from where it sits: rank or
 * total first, no "fill to the limit", balanced rank bags) + G2-224: regenerate the LIVE decks of
 * the changed types under their ORIGINAL wave ids, so deckIdFor reproduces the live basenames.
 *
 * <live.jsonl> = the server scan (scan-live-types.py): one line per live deck {loc, slug, deck_id,
 * type, difficulty, theme, unit, indexable, title}.
 *   • numbered waves (wave-001…011, two themes per type): pinned per theme, waves _fix-guess-<loc>-<w>-{a,b}.json
 *   • Level Set waves (arr / nb / var-core): the source wave narrowed to the changed type, _fix-guess-<loc>-<w>.json
 * Each pinned wave is dry-run first and must enumerate every live deck id it is meant to cover.
 * Fresh ZIPs (live ids only) are copied to out/staging/_guessfix/<loc>-<idx|noidx>/ with updates.json
 * (ZIP basename -> live slug). The staged originals they overwrite are backed up to _guessfix/orig/.
 * Compare with the live pages before uploading (guessfix-compare.js). NEVER prune with these waves.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const WG = path.resolve(__dirname, '..');
const argv = process.argv.slice(2);
const LIVE = argv.find((a) => !a.startsWith('--'));
if (!LIVE) throw new Error('usage: guessfix-regen.js <live.jsonl> [--locales=..] [--dry-run]');
const arg = (n, d) => { const h = argv.find((a) => a.startsWith('--' + n + '=')); return h ? h.slice(n.length + 3) : d; };
const DRY = argv.includes('--dry-run');
const TAG = arg('tag', 'guess');   // batch name: waves/_fix-<tag>-*, out/staging/_<tag>fix/ (default = the 2026-11-01 guessability batch)
const NOTE = arg('note', '2026-11-01 guessability fix');
const ONLY = arg('locales', '') ? new Set(arg('locales').split(',')) : null;
const WAVES = arg('waves', '');   // e.g. --waves=warr: only the source waves whose short id starts with it

const shortOf = (id) => String(id).replace(/[^a-z0-9]/gi, '').replace(/^wave0*/i, 'w');
const waveFiles = {};
for (const f of fs.readdirSync(path.join(WG, 'waves'))) {
  if (!f.endsWith('.json') || f.startsWith('_') || /fix/.test(f)) continue;
  const w = JSON.parse(fs.readFileSync(path.join(WG, 'waves', f), 'utf8'));
  if (w.id) (waveFiles[shortOf(w.id)] = waveFiles[shortOf(w.id)] || []).push(f);
}

const live = fs.readFileSync(LIVE, 'utf8').trim().split(/\r?\n/).map((l) => JSON.parse(l));
const groups = {};
const typesOf = (f) => { const w = JSON.parse(fs.readFileSync(path.join(WG, 'waves', f), 'utf8')); return new Set([...(w.types || []), ...Object.keys(w.levels || {})]); };
for (const d of live) {
  if (ONLY && !ONLY.has(d.loc)) continue;
  const ws = d.deck_id.split('-')[1];
  if (WAVES && !ws.startsWith(WAVES)) continue;
  // two source waves may share an id (Level Set waves keep their published id: Sound Boxes and Sentence Building are both
  // 'wave-sbl-es', 2026-11-02) — a deck goes with the one that makes its type
  const all = waveFiles[ws] || [];
  const srcs = all.length > 1 ? all.filter((f) => typesOf(f).has(d.type)) : all;
  if (srcs.length !== 1) throw new Error(d.loc + ' ' + ws + ' ' + d.type + ': expected one source wave, found ' + (srcs.join(',') || 'none'));
  const key = d.loc + ' ' + ws + ' ' + srcs[0];
  (groups[key] = groups[key] || []).push(d);
}

function node(args) { return execFileSync(process.execPath, args, { cwd: WG, encoding: 'utf8', maxBuffer: 256 << 20 }); }
const dryIds = (f) => node(['cli.js', 'generate', '--wave', f, '--dry-run', '--list-all']).split(/\r?\n/).map((l) => l.trim()).filter((l) => l.startsWith('wsg-'));

const failures = [];
for (const key of Object.keys(groups).sort()) {
  const [loc, ws, src] = key.split(' ');
  const decks = groups[key];
  const base = JSON.parse(fs.readFileSync(path.join(WG, 'waves', src), 'utf8'));
  const shared = (waveFiles[ws] || []).length > 1 ? '-' + src.replace(/^wave-|\.json$/g, '') : '';   // one fix file set per source
  const types = [...new Set(decks.map((d) => d.type))];
  const plans = [];
  if (base.levels) {
    const levels = {};
    for (const t of types) if (base.levels[t]) levels[t] = base.levels[t];
    plans.push(Object.assign({}, base, { locales: [loc], types, levels,
      _note: NOTE + ': pinned re-generation of the live ' + types.join('/') + ' pages; id kept so deckIdFor reproduces the live basenames. Never prune with this file.' }));
  } else {
    // two themes per type in the numbered waves: pin each theme (the round-robin index has shifted since June). One plan
    // per distinct THEME of a type (2026-11-02: a wave with two themes × two levels per type pinned its first theme twice
    // — one plan per deck — and missed the second theme's pages)
    const byType = {};
    for (const d of decks) (byType[d.type] = byType[d.type] || []).push(d);
    const themesOf = (t) => [...new Set(byType[t].map((d) => d.theme || null))].sort((a, b) => String(a).localeCompare(String(b)));
    const K = Math.max(...types.map((t) => themesOf(t).length));
    for (let k = 0; k < K; k++) {
      const ts = [], over = {};
      for (const t of types) {
        const th = themesOf(t)[k];
        if (th === undefined) continue;
        ts.push(t);
        if (th) over[t] = th;
      }
      // every field of the source wave rides along (variantsPerType: a copies wave pinned without it lost copies 2-10)
      if (ts.length) plans.push({ ...base, id: base.id, seedEpoch: base.seedEpoch || 1, locales: [loc], themes: base.themes, themesPerType: 1,
        difficulties: base.difficulties, types: ts, themeOverrides: over,
        _note: NOTE + ': pinned re-generation of the live published pages; id kept so deckIdFor reproduces the live basenames. Never prune with this file.' });
    }
  }
  const files = plans.map((p, i) => {
    const rel = 'waves/_fix-' + TAG + '-' + loc + '-' + ws + shared + (plans.length > 1 ? '-' + 'abcdefgh'[i] : '') + '.json';
    fs.writeFileSync(path.join(WG, rel), JSON.stringify(p, null, 1) + '\n');
    return rel;
  });
  const ids = new Set(files.flatMap(dryIds));
  const missing = decks.filter((d) => !ids.has(d.deck_id));
  if (missing.length) { console.error(key + ': pinned enumeration misses ' + missing.map((d) => d.deck_id).join(' ')); process.exit(1); }
  console.log(key + ': pinned enumeration covers all ' + decks.length + ' live decks (' + ids.size + ' ids)');
  if (DRY) continue;

  const stagingDir = path.join(WG, 'out', 'staging', base.id);
  const origDir = path.join(WG, 'out', 'staging', '_' + TAG + 'fix', 'orig', base.id);
  fs.mkdirSync(origDir, { recursive: true });
  for (const d of decks) {
    const z = path.join(stagingDir, d.deck_id + '.zip');
    if (fs.existsSync(z) && !fs.existsSync(path.join(origDir, d.deck_id + '.zip'))) fs.copyFileSync(z, path.join(origDir, d.deck_id + '.zip'));
  }
  for (const f of files) {
    let out;
    try { out = node(['cli.js', 'generate', '--wave', f, '--force']); } catch (e) { out = String(e.stdout || '') + String(e.stderr || e.message); }
    console.log('  ' + f + ': ' + out.split(/\r?\n/).filter((l) => /zipped:|failed:/.test(l)).join(' '));
    if (!/failed: 0/.test(out)) failures.push(f + ': ' + out.split(/\r?\n/).filter((l) => /^FAIL|fail/i.test(l)).slice(0, 5).join(' | '));
  }
  for (const d of decks) {
    const kind = d.indexable === false ? 'noidx' : 'idx';
    const dir = path.join(WG, 'out', 'staging', '_' + TAG + 'fix', loc + '-' + kind);
    fs.mkdirSync(dir, { recursive: true });
    const z = path.join(stagingDir, d.deck_id + '.zip');
    if (!fs.existsSync(z)) { failures.push(d.deck_id + ': no fresh ZIP'); continue; }
    fs.copyFileSync(z, path.join(dir, d.deck_id + '.zip'));
    const mf = path.join(dir, 'updates.json');
    const m = fs.existsSync(mf) ? JSON.parse(fs.readFileSync(mf, 'utf8')) : {};
    m[d.deck_id + '.zip'] = d.slug;
    fs.writeFileSync(mf, JSON.stringify(m, null, 1) + '\n');
  }
}
if (failures.length) { console.error('\nFAILURES:\n' + failures.join('\n')); process.exit(1); }
console.log('done');
