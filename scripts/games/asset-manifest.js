#!/usr/bin/env node
/* =====================================================================
   asset-manifest.js — emit the operator's CA5 render worklist
   ---------------------------------------------------------------------
   Reads the premium game data modules (mini tools/games/*.js), walks each
   game's declared AssetSpec, and writes <game>-assets.manifest.json — the
   exact list of Cartoon-Animator-5 sequences + props + backgrounds the
   operator must render (the "asset-stubbed FIRST -> surfaces the asset
   list" loop). This is the node twin of GameAssets.manifest() in the
   browser (the preview harness's "Copy asset manifest" button).

   USAGE:
     node scripts/games/asset-manifest.js                 # all games -> per-game manifests + a combined print
     node scripts/games/asset-manifest.js --game mochi-counting-feast
     node scripts/games/asset-manifest.js --write         # also write the per-game .manifest.json files
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const has = (k) => process.argv.includes('--' + k);
const GAMES_DIR = path.join(__dirname, '..', '..', 'mini tools', 'games');
const ONLY = arg('game', null);
const WRITE = has('write');

/* A game module is an IIFE that assigns to (window || this). Required in
   node, `this` is module.exports, so require() returns { <Global>: game }. */
function loadGames() {
  const out = [];
  const files = fs.readdirSync(GAMES_DIR).filter(f => /\.js$/.test(f) && !f.startsWith('.'));
  for (const f of files) {
    if (ONLY && f.indexOf(ONLY) === -1) continue;
    const full = path.join(GAMES_DIR, f);
    delete require.cache[require.resolve(full)];
    let mod;
    try { mod = require(full); } catch (e) { console.warn('skip ' + f + ': ' + e.message); continue; }
    Object.keys(mod).forEach(k => {
      const g = mod[k];
      if (g && typeof g === 'object' && g.id && g.assets) out.push({ file: f, game: g });
    });
  }
  return out;
}

function manifestFor(game) {
  const spec = game.assets || {};
  const rows = [];
  if (spec.sheets) Object.keys(spec.sheets).forEach(sheetId => {
    const s = spec.sheets[sheetId];
    const poses = s.poses || {};
    Object.keys(poses).forEach(pose => rows.push({
      kind: 'sheet', sheetId, pose, frameCount: poses[pose],
      frameW: s.frameW || 256, frameH: s.frameH || 256, fps: s.fps || 12,
      suggestedFilename: sheetId + '_' + pose + '_####.png'
    }));
  });
  if (spec.props) Object.keys(spec.props).forEach(p =>
    rows.push({ kind: 'prop', sheetId: p, frameCount: 1, suggestedFilename: p + '.png' }));
  if (spec.backgrounds) Object.keys(spec.backgrounds).forEach(b =>
    rows.push({ kind: 'background', sheetId: b, frameCount: 1, suggestedFilename: b + '.png' }));
  if (spec.library && spec.library.length)
    rows.push({ kind: 'library', note: 'reuses existing image library (no CA5)', nouns: spec.library.slice() });
  return rows;
}

const games = loadGames();
if (!games.length) { console.error('No game modules with an AssetSpec found in ' + GAMES_DIR); process.exit(1); }

let totalFrames = 0;
for (const { file, game } of games) {
  const rows = manifestFor(game);
  const frames = rows.filter(r => r.kind === 'sheet').reduce((a, r) => a + r.frameCount, 0);
  totalFrames += frames;
  console.log('\n=== ' + game.id + ' (' + file + ') — ' + frames + ' CA5 sheet frames ===');
  rows.forEach(r => {
    if (r.kind === 'sheet') console.log('  sheet  ' + r.sheetId + ' / ' + r.pose + '  ×' + r.frameCount + '  @' + r.frameW + '×' + r.frameH + ' (' + r.fps + 'fps)  -> ' + r.suggestedFilename);
    else if (r.kind === 'library') console.log('  lib    nouns: ' + r.nouns.join(', ') + '  (no CA5 — reuses image library)');
    else console.log('  ' + r.kind.padEnd(6) + ' ' + r.sheetId + '  -> ' + r.suggestedFilename);
  });
  if (WRITE) {
    const outPath = path.join(GAMES_DIR, '..', game.id + '-assets.manifest.json');
    fs.writeFileSync(outPath, JSON.stringify({ gameId: game.id, generated: 'asset-manifest.js', assets: rows }, null, 2));
    console.log('  -> wrote ' + outPath);
  }
}
console.log('\nTotal: ' + games.length + ' game(s), ' + totalFrames + ' CA5 sheet frames to render.');
