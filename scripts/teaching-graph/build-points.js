#!/usr/bin/env node
/**
 * Teaching points v2 (Daily Teaching System, Part 1 step 1).
 *
 *   node scripts/teaching-graph/build-points.js            → frontend/content/teaching-graph/points.json
 *   node scripts/teaching-graph/build-points.js --check     builds in memory and fails when the committed file differs
 *
 * Source of the points: docs/activities-rebuild/coverage/coverage-map.json (303 points; every worksheet type sits
 * under exactly one). This builder adds what units, tests and curriculum pages need and the map does not have:
 *
 *   subject + strand   one of eight subjects and ONE strand key of frontend/lib/seo/strand-names.ts (the national
 *                      domain names in 11 languages), through the hand-written strand-map.json
 *   order              the teaching order inside a subject. For a subject listed in order.json (authored by a
 *                      teacher-reviewer, grade by grade) that list IS the order, and it must name every point of
 *                      the subject exactly once under its own grade. A subject not listed there falls back to a
 *                      mechanical order: grade, then the strand's place in
 *                      frontend/content/level-set-pathways/sequence.json, then the family's place in that strand,
 *                      then the lowest worksheet id.
 *   prerequisites      from prerequisites.json (authored and reviewed; see its header). Checked here: every id
 *                      exists, none is of a higher grade, none comes later in the order, no cycle.
 *   types              the worksheet types under the point, PLUS types added since the map was written
 *                      (type-additions.json: type id → point id, hand-reviewed). A type that is in neither is
 *                      listed in out/teaching-graph/unmapped-types.txt and fails --strict. The map lists one
 *                      type under two points (a fact-triangle card used again for multiplication): a type has ONE
 *                      home, the point of its own grade band; the other point keeps it as `sharedTypes`.
 *
 * Nothing here is per language: which of these a locale really has is the asset index (build-assets.js).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const DIR = path.join(REPO, 'frontend', 'content', 'teaching-graph');
const OUT = path.join(REPO, 'out', 'teaching-graph');
const readJson = (f, fallback) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { if (fallback !== undefined) return fallback; throw new Error('cannot read ' + path.relative(REPO, f) + ': ' + e.message); } };

const GRADES = ['K', '1', '2', '3'];
const SUBJECT_ORDER = ['math', 'literacy', 'science', 'social', 'health', 'arts', 'thinking', 'sel'];
/** sequence.json groups by the site's four catalogue subjects; these are the graph's subjects for each */
const SEQUENCE_SUBJECT = { math: 'math', letters: 'literacy', 'spatial-reasoning': null, logic: null };

/**
 * The strand keys of frontend/lib/seo/strand-names.ts, read from the file's text (the keys of the STRAND_NAMES
 * object, at its first indent). No bundler: this builder and the gates also run on the server, which has none.
 */
function strandNames() {
  const src = fs.readFileSync(path.join(REPO, 'frontend', 'lib', 'seo', 'strand-names.ts'), 'utf8').replace(/\r\n/g, '\n');
  const start = src.indexOf('export const STRAND_NAMES');
  if (start < 0) throw new Error('strand-names.ts: STRAND_NAMES not found');
  const end = src.indexOf('\n};', start);
  const body = src.slice(start, end < 0 ? src.length : end);
  const keys = {};
  for (const m of body.matchAll(/^ {2}(?:'((?:[^'\\]|\\.)+)'|([A-Za-z_][A-Za-z0-9_]*)): \{/gm)) keys[(m[1] || m[2]).replace(/\\'/g, "'")] = true;
  if (Object.keys(keys).length < 20) throw new Error('strand-names.ts: only ' + Object.keys(keys).length + ' strand keys were read (the file changed shape?)');
  return keys;
}

/** opt: { prereq, authored, additions } replace the files of the same name (the gates plant faults this way) */
function build(opt = {}) {
  const problems = [];
  const bad = (m) => problems.push(m);
  const map = readJson(path.join(REPO, 'docs', 'activities-rebuild', 'coverage', 'coverage-map.json'));
  const strandMap = readJson(path.join(DIR, 'strand-map.json'));
  const sequence = readJson(path.join(REPO, 'frontend', 'content', 'level-set-pathways', 'sequence.json'));
  const prereq = opt.prereq || readJson(path.join(DIR, 'prerequisites.json'), { points: {} }).points || {};
  const authored = opt.authored || readJson(path.join(DIR, 'order.json'), { subjects: {} }).subjects || {};
  const additions = opt.additions || readJson(path.join(DIR, 'type-additions.json'), { types: {} }).types || {};
  // points the coverage map does not hold (types made after it): same fields, no worksheets of their own yet
  for (const x of readJson(path.join(DIR, 'extra-points.json'), { points: [] }).points || []) map.points.push(Object.assign({ worksheets: [], activities: [], planned: [], verdict: 'gap', extra: true }, x));
  const STRANDS = strandNames();
  const { loadAllTypes } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'lib', 'load-types.js'));
  const loaded = loadAllTypes();
  const types = new Map((Array.isArray(loaded) ? loaded : Object.values(loaded)).map((t) => [t.id, t]));

  // where a family stands in the teaching order of its strand (sequence.json)
  const strandPos = new Map(), familyPos = new Map();
  let sp = 0;
  for (const key of Object.keys(sequence)) {
    if (key.startsWith('$')) continue;
    for (const g of sequence[key]) {
      if (!STRANDS[g.strand]) bad('sequence.json strand "' + g.strand + '" is not a STRAND_NAMES key');
      if (!strandPos.has(g.strand)) strandPos.set(g.strand, sp++);
      g.types.forEach((f, i) => { if (!familyPos.has(f)) familyPos.set(f, i); });
    }
  }
  // strands the sequence does not carry come after it, by name
  for (const k of Object.keys(STRANDS).sort()) if (!strandPos.has(k)) strandPos.set(k, sp++);

  // a type listed under several points: its home is the point of the type's own grade band
  const listed = new Map();
  for (const p of map.points) for (const w of p.worksheets) { if (!listed.has(w)) listed.set(w, []); listed.get(w).push(p); }
  const bandOf = (t) => ({ K: 'K', G1: '1', G2: '2', G3: '3' })[t.gradeBand];
  const home = new Map();
  for (const [w, ps] of listed) {
    if (ps.length === 1) { home.set(w, ps[0].tp); continue; }
    const t = types.get(w);
    const own = t ? ps.filter((x) => x.grade === bandOf(t)) : [];
    if (own.length !== 1) { bad('type ' + w + ' sits under ' + ps.map((x) => x.tp).join(' and ') + ' and its grade band names no single home'); continue; }
    home.set(w, own[0].tp);
  }
  const seen = new Set(), typeOwner = new Map();
  const points = map.points.map((p) => {
    if (seen.has(p.tp)) bad('duplicate point id ' + p.tp);
    seen.add(p.tp);
    if (!GRADES.includes(p.grade)) bad(p.tp + ': grade "' + p.grade + '"');
    const m = strandMap.strands[p.strand];
    if (!m) { bad(p.tp + ': strand "' + p.strand + '" is not in strand-map.json'); return null; }
    const [strand, subject] = m;
    if (!STRANDS[strand]) bad(p.tp + ': "' + strand + '" is not a STRAND_NAMES key');
    if (!strandMap.subjects.includes(subject)) bad(p.tp + ': subject "' + subject + '"');
    const own = p.worksheets.filter((w) => home.get(w) === p.tp);
    const shared = p.worksheets.filter((w) => home.has(w) && home.get(w) !== p.tp);
    for (const [tid, pid] of Object.entries(additions)) if (pid === p.tp) own.push(tid);
    for (const tid of own) {
      if (!types.has(tid)) bad(p.tp + ': worksheet type ' + tid + ' does not exist');
      if (typeOwner.has(tid)) bad('type ' + tid + ' sits under two points: ' + typeOwner.get(tid) + ' and ' + p.tp);
      typeOwner.set(tid, p.tp);
    }
    const fams = [...new Set(own.map((t) => (types.get(t) || {}).exerciseType).filter(Boolean))];
    const famPos = Math.min(...fams.map((f) => (familyPos.has(f) ? familyPos.get(f) : 900)), 900);
    const firstId = Math.min(...own.map((t) => parseInt(t.split('-')[1], 10)), 99999);
    return {
      id: p.tp, grade: p.grade, subject, strand, sourceStrand: p.strand === strand ? undefined : p.strand, skill: p.skill, code: p.code,
      types: own.sort((a, b) => a.localeCompare(b, 'en', { numeric: true })), sharedTypes: shared.length ? shared : undefined, families: fams.sort(),
      activities: p.activities || [], planned: p.planned || [], verdict: p.verdict, extra: p.extra || undefined,
      _key: [SUBJECT_ORDER.indexOf(subject), GRADES.indexOf(p.grade), strandPos.get(strand), famPos, firstId],
    };
  }).filter(Boolean);
  for (const pid of Object.values(additions)) if (!seen.has(pid)) bad('type-additions.json points at an unknown point ' + pid);

  points.sort((a, b) => { for (let i = 0; i < a._key.length; i++) if (a._key[i] !== b._key[i]) return a._key[i] - b._key[i]; return a.id.localeCompare(b.id); });
  const byId = new Map(points.map((p) => [p.id, p]));
  // an authored order (order.json): the list per grade replaces the mechanical order of that subject
  for (const [subject, grades] of Object.entries(authored)) {
    const mine = points.filter((p) => p.subject === subject);
    if (!mine.length) { bad('order.json: no point has the subject "' + subject + '"'); continue; }
    const listed = [];
    for (const g of GRADES) for (const id of grades[g] || []) {
      const p = byId.get(id);
      if (!p) { bad('order.json ' + subject + ' grade ' + g + ': unknown point ' + id); continue; }
      if (p.subject !== subject) bad('order.json: ' + id + ' is listed under ' + subject + ' but its subject is ' + p.subject);
      if (p.grade !== g) bad('order.json: ' + id + ' is listed under grade ' + g);
      if (listed.includes(p)) bad('order.json: ' + id + ' is listed twice');
      listed.push(p);
    }
    for (const p of mine) if (!listed.includes(p)) bad('order.json: ' + subject + ' does not list ' + p.id);
    for (const g of Object.keys(grades)) if (!GRADES.includes(g)) bad('order.json ' + subject + ': "' + g + '" is not a grade');
    if (listed.length === mine.length && new Set(listed).size === mine.length) {
      const first = points.indexOf(mine[0]);
      for (const p of mine) points.splice(points.indexOf(p), 1);
      points.splice(Math.min(first, points.length), 0, ...listed);
    }
  }
  const counter = {};
  for (const p of points) { counter[p.subject] = (counter[p.subject] || 0) + 1; p.order = counter[p.subject]; delete p._key; }

  // prerequisites: exist, same subject or math/literacy readiness, never a higher grade, never later in the order, no cycle
  for (const p of points) {
    const list = prereq[p.id] || [];
    p.prerequisites = [];
    for (const q of list) {
      const t = byId.get(q);
      if (!t) { bad('prerequisites.json: ' + p.id + ' needs an unknown point ' + q); continue; }
      if (q === p.id) { bad('prerequisites.json: ' + p.id + ' needs itself'); continue; }
      if (GRADES.indexOf(t.grade) > GRADES.indexOf(p.grade)) bad('prerequisites.json: ' + p.id + ' (grade ' + p.grade + ') needs ' + q + ' of a HIGHER grade (' + t.grade + ')');
      if (t.subject === p.subject && t.order > p.order) bad('prerequisites.json: ' + p.id + ' needs ' + q + ', which comes LATER in the teaching order (' + t.order + ' > ' + p.order + ')');
      p.prerequisites.push(q);
    }
  }
  for (const id of Object.keys(prereq)) if (!byId.has(id)) bad('prerequisites.json: unknown point ' + id);
  const state = new Map();
  const visit = (id, trail) => {
    if (state.get(id) === 2) return;
    if (state.get(id) === 1) { bad('prerequisites.json: a cycle — ' + trail.concat(id).join(' → ')); return; }
    state.set(id, 1);
    for (const q of byId.get(id).prerequisites) if (byId.has(q)) visit(q, trail.concat(id));
    state.set(id, 2);
  };
  for (const p of points) visit(p.id, []);

  const unmapped = [...types.values()].filter((t) => !typeOwner.has(t.id)).map((t) => t.id + '\t' + t.gradeBand + '\t' + t.exerciseType + '\t' + ((t.i18n && t.i18n.en && t.i18n.en.title) || t.slug));
  for (const p of points) if (!p.types.length) bad(p.id + ': no worksheet type');
  return { points, problems, unmapped, types: types.size };
}

/** the committed file's exact text */
const fileText = (points) => JSON.stringify({ $comment: 'GENERATED by scripts/teaching-graph/build-points.js from docs/activities-rebuild/coverage/coverage-map.json + extra-points.json + strand-map.json + order.json + prerequisites.json + type-additions.json. Do not edit by hand.', points }, null, 1) + '\n';

if (require.main === module) {
  const r = build();
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'unmapped-types.txt'), r.unmapped.join('\n') + (r.unmapped.length ? '\n' : ''));
  if (r.problems.length) { for (const m of r.problems.slice(0, 60)) console.log('FAIL  ' + m); console.log(r.problems.length + ' problem(s)'); process.exit(1); }
  const file = path.join(DIR, 'points.json');
  const text = fileText(r.points);
  if (process.argv.includes('--check')) {
    const have = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n') : '';
    if (have !== text) { console.log('FAIL  points.json is not what the builder produces: run build-points.js and commit'); process.exit(1); }
  } else fs.writeFileSync(file, text);
  const by = {};
  for (const p of r.points) by[p.subject] = (by[p.subject] || 0) + 1;
  console.log('points: ' + r.points.length + ' (' + Object.entries(by).map(([k, v]) => k + ' ' + v).join(', ') + '); ' + (r.types - r.unmapped.length) + ' of ' + r.types + ' worksheet types sit under a point; ' + r.unmapped.length + ' do not → out/teaching-graph/unmapped-types.txt');
  if (process.argv.includes('--strict') && r.unmapped.length) process.exit(1);
}
module.exports = { build, fileText, GRADES, SUBJECT_ORDER };
