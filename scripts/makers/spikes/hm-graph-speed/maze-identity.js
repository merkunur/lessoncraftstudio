// node maze-identity.js <orig|opt> <out.json> [locales] [copies] — every mazes-maker template × level × locale × copy:
// the page's sha1 and build ms, with lib/hm-graph.js as it is (orig) or with the scratch speed-ups swapped in (opt)
'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto'), Module = require('module');
const REPO = 'C:/Users/rkgen/lessoncraftstudio';
const LIB = REPO + '/scripts/worksheet-gen/lib/';
const [mode, out, locs = 'en,fi', copies = '1,2,3'] = process.argv.slice(2);
if (mode === 'opt') {
  const { apply } = require(path.join(__dirname, 'hm-graph-opt.js'));
  const file = LIB + 'hm-graph.js', src = apply(fs.readFileSync(file, 'utf8'));
  const m = new Module(file, null); m.filename = file; m.paths = Module._nodeModulePaths(LIB); m._compile(src, file); m.loaded = true;
  require.cache[require.resolve(file)] = m;
}
const MP = require(REPO + '/scripts/makers/gates/lib/maker-pages.js');
const rows = [];
for (const mk of MP.builtMakers(['mazes'])) for (const t of mk.tj.templates) {
  const type = MP.loadType(t);
  for (const loc of locs.split(',')) {
    if (!t.locales.includes(loc)) continue;
    const lv = (t.localeLevels && t.localeLevels[loc]) || t.levels;
    for (const d of lv) for (const v of copies.split(',').map(Number)) {
      const th = t.themed ? MP.themesIn(t, loc)[0] : null;
      const t0 = Date.now(); let h;
      try { const r = MP.buildShown(t, type, mk.tj, loc, { difficulty: d, theme: th, unit: null, variant: v }); h = crypto.createHash('sha1').update(r.html + JSON.stringify(r.meta || null)).digest('hex').slice(0, 16); } catch (e) { h = 'REFUSED ' + String(e.message).slice(0, 60); }
      rows.push({ k: `${t.id} ${loc} L${d} c${v}`, h, ms: Date.now() - t0 });
    }
  }
}
fs.writeFileSync(out, JSON.stringify(rows));
console.log(mode, rows.length, 'pages', rows.reduce((a, r) => a + r.ms, 0), 'ms');
