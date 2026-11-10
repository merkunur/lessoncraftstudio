#!/usr/bin/env node
/**
 * fl-fd-pins.js — which scene each Find the Differences face can print, per level (docs/makers/FLAGSHIP.md): every Level Set
 * scene (data/fdx) and every flagship scene (data/fl/fd-scenes.json), built on the face in three languages; a scene the face
 * cannot carry stays out. Writes data/fl/fd-pins.json { faces: { id: { level: [unit…] } }, heroes: { scene: key },
 * scenes: { scene: { n, listable } } } — scenes: what the maker's picture list asks of each pinned scene, so the browser
 * never opens a scene file to build that list (data/b7/find-the-differences.js sceneFacts, 2026-11-10).
 *   node tools/fl-fd-pins.js --facts    (the scene counts only, into the existing file)
 *   node tools/fl-fd-pins.js [--face=K-395]    (a worker)     node tools/fl-fd-pins.js (all faces, in parallel, then merge)
 */
'use strict';
const fs = require('fs'); const path = require('path'); const { spawn } = require('child_process');
const WG = path.join(__dirname, '..'), REPO = path.join(WG, '..', '..');
const FACES = ['K-395', 'K-397', 'K-398', 'K-399', 'K-400', 'G1-412', 'G1-413', 'G1-414', 'G1-415', 'G2-388', 'G2-389'];
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };
const OUT = (f) => path.join(process.env.TEMP || '/tmp', 'fl-fdpin-' + f + '.json');
const scenes = () => {
  const X = require('../data/fdx/scenes.js').SCENES.map((s) => ({ id: s.id, hero: s.hero, level: s.level }));
  const L = require('../data/fl/fd-scenes.json').filter((s) => fs.existsSync(path.join(WG, 'data', 'fd', s.id + '.json'))).map((s) => ({ id: s.id, hero: s.hero, level: s.level }));
  return X.concat(L);
};
function worker(id) {
  const { makePage } = require(path.join(REPO, 'scripts', 'makers', 'runtime.js'));
  const { resolveStrings, withLevelInstruction } = require('../i18n/strings.js');
  const dir = path.join(WG, 'types', id.startsWith('K-') ? 'k' : id.slice(0, 2).toLowerCase());
  const type = require(path.join(dir, fs.readdirSync(dir).find((f) => f.startsWith(id + '-'))));
  const all = scenes(), out = {};
  const pair = /^(G1-412|G2-388|G1-415)$/.test(id);
  for (const lv of [1, 2, 3]) {
    const near = all.slice().sort((a, b) => Math.abs(a.level - lv) - Math.abs(b.level - lv) || (a.id < b.id ? -1 : 1));
    const ok = [];
    for (let i = 0; i < near.length; i++) {
      const u = pair ? near[i].id + '|' + near[(i + 7) % near.length].id : near[i].id;
      let good = true;
      for (const loc of ['en', 'de', 'fi']) {
        const s = withLevelInstruction(resolveStrings(id, loc, type), id, lv, loc);
        let one = false;
        for (const v of [1, 2]) { try { makePage({ type, strings: s, locale: loc, difficulty: lv, theme: null, variant: v, unit: u }); one = true; break; } catch (e) { /* the next seed */ } }
        if (!one) { good = false; break; }
      }
      if (good) ok.push(u);
    }
    out[lv] = ok;
    console.log(id, 'L' + lv, ok.length + ' of ' + near.length);
  }
  fs.writeFileSync(OUT(id), JSON.stringify(out));
  process.exit(0);
}
/** every pinned scene's counts (fd-pins.json scenes); throws on a scene that cannot be read: a pin without facts would
 * leave the browser's picture list to open it */
function facts(faces) {
  const B = require('../data/b7/find-the-differences.js'), out = {};
  for (const f of Object.values(faces)) for (const l of Object.values(f)) for (const u of l) for (const id of String(u).split('|')) {
    if (out[id]) continue;
    const sc = B.loadScene(id);
    out[id] = { n: sc.items.length, listable: B.listableNouns(sc, id) };
  }
  return out;
}
if (arg('face')) worker(arg('face'));
else if (process.argv.includes('--facts')) {
  const F = path.join(WG, 'data', 'fl', 'fd-pins.json'), pins = JSON.parse(fs.readFileSync(F, 'utf8'));
  pins.scenes = facts(pins.faces);
  fs.writeFileSync(F, JSON.stringify(pins));
  console.log('fd-pins scene facts: ' + Object.keys(pins.scenes).length + ' scenes');
} else {
  let left = FACES.length;
  for (const f of FACES) {
    const c = spawn(process.execPath, [__filename, '--face=' + f], { cwd: WG, stdio: 'inherit' });
    c.on('exit', () => {
      if (--left) return;
      const faces = {}; for (const id of FACES) faces[id] = JSON.parse(fs.readFileSync(OUT(id), 'utf8'));
      const heroes = {}; for (const s of scenes()) heroes[s.id] = s.hero;
      fs.writeFileSync(path.join(WG, 'data', 'fl', 'fd-pins.json'), JSON.stringify({ faces, heroes, scenes: facts(faces) }));
      console.log('fd-pins written');
    });
  }
}
