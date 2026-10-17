#!/usr/bin/env node
/* =====================================================================
   audit-activity-coverage.js — do the ACTIVITIES cover everything the
   WORKSHEETS teach?

   Source of truth: docs/activities-rebuild/coverage/coverage-map.json —
   every worksheet type (scripts/worksheet-gen/types/<k|g1|g2|g3>/*.js)
   belongs to exactly one TEACHING POINT; each point is either
     covered       an existing activity teaches it (activities: [ids]),
     planned       a new activity in docs/activities-rebuild/new/backlog.json
                   will teach it (planned: [backlog nums]) — it counts as
                   covered the moment that activity is BUILT (its manifest
                   exists and its strings carry no TODO),
     out-of-scope  not activity material, with the reason in `note`.

   Checks (each FAILS the run):
     · every worksheet type on disk is in exactly one point (a worksheet
       type added later and never mapped is reported by id);
     · no point names a worksheet id that does not exist;
     · every activity id a point names exists in mini tools/*-activities.json;
     · every planned num exists in the backlog, and every backlog entry is
       planned by at least one point (no orphan instruments);
     · out-of-scope points carry a reason.
   Then it prints coverage: worksheet types and teaching points covered now
   / planned / out of scope, overall and per grade.

   Usage: node scripts/audit-activity-coverage.js [--list-planned] [--grade=K|1|2|3] [--poison]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const REPO = path.join(__dirname, '..');
const MAP = path.join(REPO, 'docs', 'activities-rebuild', 'coverage', 'coverage-map.json');
const BACKLOG = path.join(REPO, 'docs', 'activities-rebuild', 'new', 'backlog.json');
const TYPES = path.join(REPO, 'scripts', 'worksheet-gen', 'types');
const MINI = path.join(REPO, 'mini tools');
const arg = (k) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : null; };
const has = (k) => process.argv.includes('--' + k);

function load(mapOverride) {
  const map = mapOverride || JSON.parse(fs.readFileSync(MAP, 'utf8'));
  const backlog = JSON.parse(fs.readFileSync(BACKLOG, 'utf8'));
  return { map, backlog: backlog.activities || backlog };
}
function worksheetIds() {
  const ids = new Map();
  for (const g of ['k', 'g1', 'g2', 'g3']) {
    const dir = path.join(TYPES, g);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.js'))) {
      const src = fs.readFileSync(path.join(dir, f), 'utf8');
      const id = (src.match(/id:\s*'([A-Z0-9]+-\d+[a-z]?)'/) || [])[1] || (f.match(/^([A-Z0-9]+-\d+[a-z]?)/) || [])[1];
      if (id) ids.set(id, g);
    }
  }
  return ids;
}
function activityIds() {
  const s = new Set();
  for (const f of fs.readdirSync(MINI).filter(f => f.endsWith('-activities.json'))) for (const r of JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8'))) s.add(r.id);
  return s;
}
function built(entry) {
  const man = path.join(MINI, entry.key + '-activities.json');
  const act = path.join(MINI, entry.key + '-activity.js');
  if (!fs.existsSync(man) || !fs.existsSync(act)) return false;
  return !/TODO/.test(fs.readFileSync(act, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, ''));
}

function audit(map, backlog, ws, acts) {
  const fails = [];
  const seen = new Map();
  const byNum = new Map(backlog.map(e => [Number(e.num), e]));
  const plannedNums = new Set();
  for (const p of map.points) {
    if (!p.tp) fails.push('a point without a tp id');
    for (const w of p.worksheets || []) {
      if (!ws.has(w)) fails.push(`${p.tp}: worksheet ${w} does not exist`);
      if (seen.has(w)) fails.push(`${w} is in two points (${seen.get(w)}, ${p.tp})`);
      seen.set(w, p.tp);
    }
    for (const a of p.activities || []) if (!acts.has(a)) fails.push(`${p.tp}: activity ${a} does not exist`);
    for (const n of p.planned || []) { if (!byNum.has(Number(n))) fails.push(`${p.tp}: planned #${n} is not in the backlog`); plannedNums.add(Number(n)); }
    if (p.verdict === 'out-of-scope' && !(p.note && p.note.trim())) fails.push(`${p.tp}: out-of-scope without a reason`);
    if (!['covered', 'partial', 'gap', 'out-of-scope'].includes(p.verdict)) fails.push(`${p.tp}: verdict "${p.verdict}"`);
    if ((p.verdict === 'gap' || p.verdict === 'partial') && !(p.planned && p.planned.length)) fails.push(`${p.tp}: ${p.verdict} with no planned activity`);
    if (p.verdict === 'covered' && !(p.activities && p.activities.length)) fails.push(`${p.tp}: covered by no activity`);
  }
  const unmapped = [...ws.keys()].filter(w => !seen.has(w)).sort();
  for (const w of unmapped) fails.push(`worksheet ${w} (${ws.get(w)}) is in no teaching point`);
  for (const e of backlog) if (!plannedNums.has(Number(e.num))) fails.push(`backlog #${e.num} ${e.key} is planned by no teaching point`);
  return { fails, byNum };
}

function status(p, byNum) {
  if (p.verdict === 'out-of-scope') return 'out';
  if (p.verdict === 'covered') return 'covered';
  const nums = (p.planned || []).map(Number);
  return nums.length && nums.every(n => byNum.has(n) && built(byNum.get(n))) ? 'covered' : 'planned';
}

function main() {
  const ws = worksheetIds(), acts = activityIds();
  if (has('poison')) {
    /* the gate must fail on each defect it claims to catch, and pass the real map */
    const { map, backlog } = load();
    const clone = () => JSON.parse(JSON.stringify(map));
    const cases = [
      ['an unmapped worksheet', (m) => { m.points[0].worksheets = m.points[0].worksheets.slice(1); }],
      ['a worksheet in two points', (m) => { m.points[1].worksheets.push(m.points[0].worksheets[0]); }],
      ['a missing activity', (m) => { const p = m.points.find(x => x.verdict === 'covered'); p.activities = ['no-such.activity.k']; }],
      ['a planned num not in the backlog', (m) => { const p = m.points.find(x => (x.planned || []).length); p.planned = [99999]; }],
      ['an out-of-scope point without a reason', (m) => { m.points[0].verdict = 'out-of-scope'; m.points[0].note = ''; }],
      ['a gap with nothing planned', (m) => { const p = m.points.find(x => x.verdict === 'gap'); p.planned = []; }]
    ];
    let ok = true;
    const real = audit(map, backlog, ws, acts).fails.length;
    console.log(`control: the real map → ${real} failures (must be 0)`); if (real) ok = false;
    for (const [name, mut] of cases) { const m = clone(); mut(m); const n = audit(m, backlog, ws, acts).fails.length; console.log(`${n ? 'fires ' : 'BLIND '} ${name} (${n})`); if (!n) ok = false; }
    process.exit(ok ? 0 : 1);
  }
  const { map, backlog } = load();
  const { fails, byNum } = audit(map, backlog, ws, acts);
  const G = arg('grade');
  const pts = map.points.filter(p => !G || p.grade === G);
  const agg = (list) => {
    const r = { covered: [0, 0], planned: [0, 0], out: [0, 0] };
    for (const p of list) { const s = status(p, byNum); r[s][0]++; r[s][1] += (p.worksheets || []).length; }
    return r;
  };
  const line = (label, r) => {
    const wt = r.covered[1] + r.planned[1] + r.out[1], tp = r.covered[0] + r.planned[0] + r.out[0];
    const pct = (a) => (wt ? Math.round(100 * a / wt) : 0) + '%';
    console.log(`${label.padEnd(6)} points ${String(tp).padStart(3)} · worksheet types ${String(wt).padStart(3)} — covered ${r.covered[0]} pts / ${r.covered[1]} types (${pct(r.covered[1])}) · planned ${r.planned[0]} / ${r.planned[1]} (${pct(r.planned[1])}) · out of scope ${r.out[0]} / ${r.out[1]}`);
  };
  console.log(`worksheet types on disk ${ws.size} · activities ${acts.size} · backlog ${backlog.length} new instruments (${backlog.filter(built).length} built)`);
  line('all', agg(pts));
  for (const g of ['K', '1', '2', '3']) if (!G) line(g, agg(map.points.filter(p => p.grade === g)));
  if (has('list-planned')) for (const p of pts.filter(p => status(p, byNum) === 'planned')) console.log(`  planned  ${p.tp.padEnd(28)} → #${(p.planned || []).join(', #')}  ${p.skill}`);
  if (fails.length) { console.log(`\nFAIL — ${fails.length} problem(s):`); fails.slice(0, 60).forEach(f => console.log('  ' + f)); if (fails.length > 60) console.log(`  … ${fails.length - 60} more`); process.exit(1); }
  console.log('\nPASS — every worksheet type is mapped once; every reference resolves.');
}
main();
