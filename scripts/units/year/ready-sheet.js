#!/usr/bin/env node
/**
 * The sheet of the READY lessons of Part 12.2 (Daily Teaching System): every new lesson of the year designs that can
 * be written on what exists today (work list A = the page is published, A2 = an existing page ruled "use", and the
 * teacher-led lessons without a page), with what the author of the lesson needs beside it: the unit of the design it
 * stands in (and whether that unit exists), the worksheet type and level, the teaching points the type belongs to and
 * which of them a lesson of the language teaches already, and the classroom tool the design names.
 *
 *   node scripts/units/year/ready-sheet.js [--loc=en] [--summary]
 *     reads   design.<loc>.math.json, type-work-list.math.json, frontend/content/units/defs/<loc>.json,
 *             frontend/content/teaching-graph/{points,tools}.json, assets/<loc>.json
 *     writes  out/year/ready.<loc>.math.md (a working file, not committed)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : null; };
const LOCS = arg('loc') ? [arg('loc')] : ['en', 'de', 'sv'];
const summary = process.argv.includes('--summary');

const work = readJson(path.join(__dirname, 'type-work-list.math.json'));
const ready = new Map();   // key → { types, level, note, kind }
for (const r of work.A) ready.set(r.key, { types: r.types, level: 2, note: '', kind: 'A' });
for (const r of work.use) ready.set(r.key, { types: r.types, level: r.level || 2, note: r.note, kind: 'A2' });
const waiting = new Map();
for (const [t, rows] of Object.entries(work.C)) for (const r of rows) waiting.set(r.key, 'C ' + t);
for (const [t, rows] of Object.entries(work.B)) for (const r of rows) waiting.set(r.key, 'B ' + t);
for (const r of work.D) waiting.set(r.key, 'D');

const points = readJson(path.join(REPO, 'frontend', 'content', 'teaching-graph', 'points.json')).points;
const pointList = Array.isArray(points) ? points : Object.values(points);
const pointsOfType = new Map();
for (const p of pointList) for (const t of p.types || []) { if (!pointsOfType.has(t)) pointsOfType.set(t, []); pointsOfType.get(t).push(p); }
const tools = readJson(path.join(REPO, 'frontend', 'content', 'teaching-graph', 'tools.json')).tools;

// the keys run over ALL languages in the order of the designs, exactly as type-work-list.js counts them
let n = 0;
const out = {};
for (const loc of ['en', 'de', 'sv']) {
  const d = readJson(path.join(__dirname, 'design.' + loc + '.math.json'));
  const defs = readJson(path.join(REPO, 'frontend', 'content', 'units', 'defs', loc + '.json'));
  const assets = readJson(path.join(REPO, 'frontend', 'content', 'teaching-graph', 'assets', loc + '.json'));
  const taughtBy = new Map();
  for (const u of defs.units) for (const l of u.lessons) taughtBy.set(l.id || l.point, u.id);
  const defIds = new Set(defs.units.map((u) => u.id));
  const rows = [];
  for (const g of ['K', '1', '2', '3']) {
    if (!d[g]) continue;
    for (const u of d[g].units) {
      const unitRow = { grade: g, id: u.id, title: u.title, exists: defIds.has(u.opened || u.id), lessons: [] };
      u.lessons.forEach((x, i) => {
        if (!x.new) { unitRow.lessons.push({ pos: i + 1, state: 'existing', ref: x.existing }); return; }
        if (x.source === 'teacher-led') { unitRow.lessons.push({ pos: i + 1, state: 'ready', kind: 'teacher-led', x }); return; }
        n++; const key = loc + '-' + g + '-' + String(n).padStart(3, '0');
        if (x.placed) { unitRow.lessons.push({ pos: i + 1, state: 'existing', ref: x.placed + ' (written)' }); return; }
        const r = ready.get(key);
        if (r) unitRow.lessons.push({ pos: i + 1, state: 'ready', kind: r.kind, key, r, x });
        else unitRow.lessons.push({ pos: i + 1, state: 'waits', key, why: waiting.get(key) || '?', x });
      });
      rows.push(unitRow);
    }
  }
  out[loc] = { rows, taughtBy, assets };
}

for (const loc of LOCS) {
  const { rows, taughtBy, assets } = out[loc];
  const L = ['# Ready lessons, mathematics, ' + loc, ''];
  let nReady = 0, nUnitsWhole = 0;
  for (const u of rows) {
    const rd = u.lessons.filter((l) => l.state === 'ready'), ws = u.lessons.filter((l) => l.state === 'waits'), ex = u.lessons.filter((l) => l.state === 'existing');
    if (!rd.length && summary) { L.push('- ' + u.grade + ' `' + u.id + '` ' + (u.exists ? 'EXISTS' : 'NEW') + ': existing ' + ex.length + ', ready 0, waits ' + ws.length); continue; }
    nReady += rd.length; if (!ws.length) nUnitsWhole++;
    if (summary) { L.push('- ' + u.grade + ' `' + u.id + '` ' + (u.exists ? 'EXISTS' : 'NEW') + ': existing ' + ex.length + ', ready ' + rd.length + ', waits ' + ws.length + (ws.length ? '' : '  ← whole')); continue; }
    L.push('## ' + u.grade + ' `' + u.id + '` ' + u.title + ' (' + (u.exists ? 'exists' : 'NEW unit') + '; existing ' + ex.length + ', ready ' + rd.length + ', waits ' + ws.length + ')', '');
    for (const l of u.lessons) {
      if (l.state === 'existing') { L.push(l.pos + '. existing ' + l.ref); continue; }
      if (l.state === 'waits') { L.push(l.pos + '. WAITS (' + l.why + ') ' + l.x.title); continue; }
      const x = l.x;
      L.push(l.pos + '. **READY ' + l.kind + '** ' + (l.key || '') + ' **' + x.title + '** [' + (x.standard || '') + '; ' + (x.days || '?') + ' days; tool: ' + (x.tool || 'none') + ']');
      L.push('   - objective: ' + x.objective);
      if (x.page) L.push('   - page asked: ' + x.page);
      if (l.r) {
        const t = l.r.types[0];
        const a = assets.types[t];
        L.push('   - type `' + t + '` level ' + l.r.level + (l.r.note ? ' (ruling: ' + l.r.note + ')' : '') + '; pages per level ' + (a ? JSON.stringify(a.p) : 'NONE') + '; screen ' + (a ? JSON.stringify(a.s) : ''));
        for (const p of pointsOfType.get(t) || []) L.push('   - point `' + p.id + '` ' + p.code + ' "' + p.skill + '"' + (taughtBy.has(p.id) ? ' TAUGHT in ' + taughtBy.get(p.id) : ' open'));
        if (!(pointsOfType.get(t) || []).length) L.push('   - the type belongs to NO teaching point');
      }
    }
    L.push('');
  }
  const f = path.join(REPO, 'out', 'year', 'ready.' + loc + '.math' + (summary ? '.summary' : '') + '.md');
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, L.join('\n') + '\n');
  console.log(loc + ': ' + nReady + ' ready lessons in ' + rows.filter((u) => u.lessons.some((l) => l.state === 'ready')).length + ' units (' + nUnitsWhole + ' units with nothing waiting) → ' + path.relative(REPO, f));
}
