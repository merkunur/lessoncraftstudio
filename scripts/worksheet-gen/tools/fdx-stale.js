#!/usr/bin/env node
/** fdx-stale.js — the Level Set scenes whose data/fd/<id>.json no longer matches their layout (drawings, places, sizes,
 *  colours): those are rebuilt (tools/fd-build.js --set=fdx --only=…) and READ again. Prints the ids, comma-separated. */
'use strict';
const fs = require('fs'); const path = require('path');
const { SCENES } = require('../data/fdx/scenes.js'); const { layoutScene } = require('../lib/fdx-layout.js');
const out = [];
for (const s of SCENES) {
  const f = path.join(__dirname, '..', 'data', 'fd', s.id + '.json');
  if (!fs.existsSync(f)) { out.push(s.id); continue; }
  const rec = JSON.parse(fs.readFileSync(f, 'utf8'));
  const L = layoutScene(s).items;
  const same = rec.items.length === L.length && L.every((it, i) => { const r = rec.items[i]; return r.src === it.src && r.x === it.x && r.y === it.y && r.h === it.h && !!r.flip === !!it.flip; });
  if (!same) out.push(s.id);
}
// orphans: a json for a scene that no longer exists
for (const f of fs.readdirSync(path.join(__dirname, '..', 'data', 'fd')).filter((x) => /^fdx-.*\.json$/.test(x))) if (!SCENES.some((s) => s.id + '.json' === f)) console.error('orphan', f);
console.log(out.join(','));
