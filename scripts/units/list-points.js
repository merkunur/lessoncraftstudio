#!/usr/bin/env node
/**
 * Lists the teaching points of one grade and subject in teaching order with what a unit could use in one language
 * (Daily Teaching System, Parts 3 and 4): worksheet types with published pages per level, Level Sets, screen versions,
 * the tools, the live and planned activities, the maker, and the national objective line.
 *
 *   node scripts/units/list-points.js --loc=en --grade=1 --subject=math [--reg=en]
 */
'use strict';
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const grade = arg('grade', '1');
const subject = arg('subject', 'math');
const reg = arg('reg', loc);
const G = path.join(REPO, 'frontend', 'content', 'teaching-graph');
const points = require(path.join(G, 'points.json')).points;
const assets = require(path.join(G, 'assets', loc + '.json'));
const tools = require(path.join(G, 'tools.json'));
const C = path.join(REPO, 'frontend', 'content', 'curricula');
const fw = require(path.join(C, reg, 'framework.json'));
const cw = require(path.join(C, reg, 'crosswalk.json')).points;
const display = require(path.join(C, 'display.json')).registries[reg];
const { line } = require('../curricula/show.js');
const registry = { framework: fw, display };
const byId = new Map(fw.nodes.map((n) => [n.id, n]));
const toolsOf = (id) => Object.entries(tools.tools || tools).filter(([, v]) => (v.points || v || []).includes && (v.points || v).includes(id)).map(([k]) => k);

const list = points.filter((p) => p.grade === grade && p.subject === subject).sort((a, b) => a.order - b.order);
for (const p of list) {
  const ts = p.types.map((t) => { const a = assets.types[t]; if (!a) return t + ':—'; return t + ':' + a.p.join('/') + (a.set ? ' SET' : '') + (a.s.some(Boolean) ? ' scr' : '') + (a.maker ? ' mk=' + a.maker : ''); });
  const live = (p.activities || []).filter((a) => assets.activities[a]);
  const e = cw[p.id] || {};
  const obj = (e.rows || []).map((r) => r.rel + ' ' + (byId.get(r.id) ? line(registry, byId.get(r.id)) : r.id)).slice(0, 2).join(' | ') || 'none';
  console.log(String(p.order).padStart(3) + '  ' + p.id + '  — ' + p.skill.slice(0, 90));
  console.log('       pages: ' + ts.join('  '));
  console.log('       tools: ' + (toolsOf(p.id).join(', ') || '—') + '   activities live: ' + (live.length ? live.join(', ') : '—') + (p.planned && p.planned.length ? '   planned: ' + p.planned.length : ''));
  console.log('       ' + obj);
}
console.log(list.length + ' points');
