#!/usr/bin/env node
/**
 * Assembles the curriculum pages of a language (Daily Teaching System, Part 6): for one framework, one grade and one
 * subject, the list of the framework's objectives with what the site has for each line.
 *
 *   reads   frontend/content/curriculum-pages/defs/<loc>.json   which pages exist (written by lists/build-<loc>-defs.js)
 *           frontend/content/curricula/<reg>/{framework,crosswalk}.json, display.json   the registry (Part 2)
 *           frontend/content/units/{units,defs/}<loc>.json      the lessons that teach a point (Part 4)
 *           frontend/content/teaching-graph/{points.json,assets/<loc>.json}   a point's own skill and worksheet types
 *           frontend/content/curriculum-pages/lines/<loc>.json   the page reviewer's rulings on single lines
 *   writes  frontend/content/curriculum-pages/pages.<loc>.json  GENERATED
 *
 *   node scripts/curriculum-pages/assemble.js --loc=en [--check]
 *
 * What a line shows (Part 2 rule, scripts/curricula/show.js): the objective's own official code, never its wording.
 * The description of a line is OURS: the objective of the first lesson that teaches it, or the skill of the teaching
 * point. A line is "taught" when a crosswalk row says `teaches`, "near" when the content only prepares for it or goes
 * beyond it; an objective with nothing is listed by its code under "not covered". A lesson belongs to a line when its
 * teaching point has a row for the objective, unless the lesson names its own objectives (defs: `standards`) and
 * leaves this one out. A page with fewer than MIN_TAUGHT taught objectives fails (no page ships thin).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const { shown } = require('../curricula/show.js');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const has = (k) => process.argv.includes('--' + k);
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const MIN_TAUGHT = 15;
// the strand names of the Common Core ELA standards by the letters their codes begin with (the site's own strand
// labels, frontend/lib/seo/strand-names.ts, where the same names are keys)
const ELA_STRANDS = { RL: 'Reading: Literature', RI: 'Reading: Informational Text', RF: 'Reading: Foundational Skills', W: 'Writing', L: 'Language' };

function assemble(loc) {
  const problems = [];
  const bad = (m) => problems.push(m);
  const C = path.join(REPO, 'frontend', 'content');
  const defs = readJson(path.join(C, 'curriculum-pages', 'defs', loc + '.json')).pages;
  const display = readJson(path.join(C, 'curricula', 'display.json')).registries;
  const unitsFile = readJson(path.join(C, 'units', 'units.' + loc + '.json'));
  const unitDefs = new Map(readJson(path.join(C, 'units', 'defs', loc + '.json')).units.map((u) => [u.id, u]));
  const points = new Map(readJson(path.join(C, 'teaching-graph', 'points.json')).points.map((p) => [p.id, p]));
  const assets = readJson(path.join(C, 'teaching-graph', 'assets', loc + '.json'));
  const strings = readJson(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.' + loc + '.json'));
  // what the reviewer of the pages ruled about single lines (frontend/content/curriculum-pages/lines/<loc>.json):
  // drop = the lessons do not address the objective (it is listed as not covered); prepares / extends = they only
  // lead up to it or go beyond it; describe = the claim is fair and the sentence is the reviewer's
  const linesPath = path.join(C, 'curriculum-pages', 'lines', loc + '.json');
  const rulings = fs.existsSync(linesPath) ? readJson(linesPath).lines : {};
  const usedRulings = new Set();
  const strandNames = fs.readFileSync(path.join(REPO, 'frontend', 'lib', 'seo', 'strand-names.ts'), 'utf8');

  // the lessons of the live units, by teaching point; a lesson that names its own objectives keeps that list
  const lessonsOf = new Map();
  for (const u of unitsFile.units) {
    if (u.status !== 'live') continue;
    const d = unitDefs.get(u.id);
    for (const l of u.lessons) {
      const own = d && d.lessons ? (d.lessons.find((x) => x.point === l.point) || {}).standards : null;
      if (!lessonsOf.has(l.point)) lessonsOf.set(l.point, []);
      lessonsOf.get(l.point).push({ unit: u.slug, unitTitle: u.title, unitGrade: String(u.grade), n: l.n, title: l.title, objective: l.objective, papers: (l.paper || []).length, own: own || null });
    }
  }
  const regs = new Map();
  const registryOf = (reg) => {
    if (!regs.has(reg)) {
      const fw = readJson(path.join(C, 'curricula', reg, 'framework.json'));
      const cw = readJson(path.join(C, 'curricula', reg, 'crosswalk.json')).points;
      const rowsOf = new Map();
      for (const [pt, v] of Object.entries(cw)) for (const r of v.rows || []) { if (!rowsOf.has(r.id)) rowsOf.set(r.id, []); rowsOf.get(r.id).push({ point: pt, rel: r.rel }); }
      regs.set(reg, { fw, rowsOf, registry: { framework: fw, display: display[reg] }, byId: new Map(fw.nodes.map((n) => [n.id, n])), hasChild: new Set(fw.nodes.map((n) => n.parent).filter(Boolean)) });
    }
    return regs.get(reg);
  };

  const pages = [], seen = new Set();
  for (const d of defs) {
    const where = loc + ' page ' + d.id;
    if (seen.has(d.id) || seen.has('/' + d.slug)) bad(where + ': id or slug used twice');
    seen.add(d.id); seen.add('/' + d.slug);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(d.slug || '')) bad(where + ': slug "' + d.slug + '" is not url-safe');
    for (const k of ['title', 'metaTitle', 'metaDescription', 'registry', 'framework', 'grade', 'subject']) if (!d[k]) bad(where + ': no ' + k);
    if (!display[d.registry]) { bad(where + ': no registry ' + d.registry); continue; }
    const R = registryOf(d.registry);
    const meta = R.fw.frameworks.find((f) => f.key === d.framework);
    if (!meta) { bad(where + ': the registry has no framework ' + d.framework); continue; }
    if ((display[d.registry].frameworks[d.framework] || {}).show !== 'code') { bad(where + ': the framework is not shown by code'); continue; }
    const nodes = R.fw.nodes.filter((n) => n.f === d.framework && String(n.grade) === String(d.grade));
    const groups = [], byTitle = new Map();
    const groupOf = (n) => {
      let title = null;
      // a strand the site has no name for (no content of ours stands in it) is headed by the letters of its codes
      if (d.framework === 'ccss-ela') { const pre = n.id.split('.')[0]; title = ELA_STRANDS[pre] && strandNames.includes("'" + ELA_STRANDS[pre] + "'") ? ELA_STRANDS[pre] : pre; }
      else {
        let top = n; for (let g = 0; top.parent && g < 12; g++) top = R.byId.get(top.parent);
        if (top.kind === 'domain') title = top.text;
        else if (d.framework === 'teks-math') title = top.text.split('.')[0];
        else title = (d.strandWord || 'Strand') + ' ' + shown(R.registry, top).code.split('.').pop();
      }
      if (!byTitle.has(title)) { const g = { title, items: [], open: [] }; byTitle.set(title, g); groups.push(g); }
      return byTitle.get(title);
    };
    let taught = 0, near = 0, open = 0;
    const usedText = new Map();
    const lessonKeys = new Set();
    for (const n of nodes) {
      const rows = R.rowsOf.get(n.id) || [];
      const isLeaf = !R.hasChild.has(n.id);
      if (!rows.length && !isLeaf) continue;                                  // a heading of the document
      const parentRows = n.parent ? R.rowsOf.get(n.parent) || [] : [];
      const g = groupOf(n);
      const code = shown(R.registry, n).code;
      if (!rows.length) { if (!parentRows.length) { g.open.push(code); open++; } continue; }   // covered through its parent, or open
      const state = rows.some((r) => r.rel === 'teaches') ? 'taught' : 'near';
      const use = rows.filter((r) => (state === 'taught' ? r.rel === 'teaches' : true));
      const lessons = [], papers = [];
      // the description is the objective of the first lesson; the skill of the teaching point where no lesson exists
      // (of several lessons, the one whose objective the page has used least: three codes that one unit teaches should
      // not all carry the same sentence)
      let skillText = null;
      const cands = [];
      for (const r of use) {
        const p = points.get(r.point);
        if (!p) { bad(where + ': ' + n.id + ' names the point ' + r.point + ', which the graph does not have'); continue; }
        const ls = (lessonsOf.get(r.point) || []).filter((l) => !l.own || d.registry !== loc || l.own.includes(n.id));
        for (const l of ls) { const k = l.unit + '#' + l.n; if (lessons.some((x) => x.unit + '#' + x.n === k)) continue; lessons.push({ unit: l.unit, unitTitle: l.unitTitle, unitGrade: l.unitGrade, n: l.n, title: l.title }); lessonKeys.add(k); cands.push(l.objective); }
        if (!ls.length) for (const t of p.types) { const a = assets.types[t], s = strings[t]; if (a && a.p && a.p[1] > 0 && a.base && s && s.title && !/\{[A-Za-z_]+\}/.test(s.printTitle || s.title) && papers.length < 3 && !papers.some((x) => x.core === a.base)) papers.push({ title: s.printTitle || s.title, core: a.base }); }
        if (!skillText && !ls.length) skillText = p.skill.replace(/[.]?$/, '.');
      }
      if (!lessons.length && !papers.length) { g.open.push(code); open++; continue; }   // a row, and nothing published for it in this language
      let lessonText = null;
      if (cands.length) { lessonText = cands.reduce((best, c) => ((usedText.get(c) || 0) < (usedText.get(best) || 0) ? c : best), cands[0]); usedText.set(lessonText, (usedText.get(lessonText) || 0) + 1); }
      const ruling = rulings[d.id + ' / ' + code];
      if (ruling) usedRulings.add(d.id + ' / ' + code);
      if (ruling && ruling.verdict === 'drop') { g.open.push(code); open++; continue; }
      const item = { code, state: ruling && (ruling.verdict === 'prepares' || ruling.verdict === 'extends') ? 'near' : state, text: (ruling && ruling.verdict === 'describe' && ruling.text) || lessonText || skillText };
      if (item.state === 'near') item.rel = ruling && (ruling.verdict === 'prepares' || ruling.verdict === 'extends') ? ruling.verdict : rows.some((r) => r.rel === 'prepares') ? 'prepares' : 'extends';
      // the lessons of one unit in the order of the unit; the units in the order they were found
      const unitOrder = [...new Set(lessons.map((l) => l.unit))];
      lessons.sort((a, b) => unitOrder.indexOf(a.unit) - unitOrder.indexOf(b.unit) || a.n - b.n);
      if (lessons.length) item.lessons = lessons.slice(0, 4);
      if (papers.length && !lessons.length) item.papers = papers;
      g.items.push(item);
      if (item.state === 'taught') taught++; else near++;
    }
    const kept = groups.filter((g) => g.items.length || g.open.length).map((g) => { const o = { title: g.title, items: g.items }; if (g.open.length) o.open = g.open; return o; });
    if (taught < MIN_TAUGHT) bad(where + ': ' + taught + ' taught objectives (a page needs ' + MIN_TAUGHT + ')');
    for (const g of kept) for (const it of g.items) if (!it.text) bad(where + ': ' + it.code + ' has no description');
    pages.push({
      id: d.id, slug: d.slug, status: d.status || 'pilot', registry: d.registry, framework: d.framework, frameworkShort: meta.short, frameworkTitle: meta.title, publisher: meta.publisher, year: meta.year, officialDocument: meta.officialDocument,
      grade: String(d.grade), subject: d.subject, title: d.title, metaTitle: d.metaTitle, metaDescription: d.metaDescription,
      counts: { objectives: taught + near + open, taught, near, open, lessons: lessonKeys.size }, groups: kept,
    });
  }
  for (const k of Object.keys(rulings)) { if (!usedRulings.has(k)) bad(loc + ': the ruling for ' + k + ' names no line of a page'); const v = rulings[k]; if (!['drop', 'prepares', 'extends', 'describe'].includes(v.verdict) || (v.verdict === 'describe' && !v.text) || !v.why) bad(loc + ': the ruling for ' + k + ' is not a verdict with its reason'); }
  return { file: { $comment: 'GENERATED by scripts/curriculum-pages/assemble.js from defs/' + loc + '.json, the curriculum registry, the units and the content graph. Do not edit by hand.', locale: loc, pages }, problems };
}
const fileText = (f) => JSON.stringify(f, null, 1) + '\n';

if (require.main === module) {
  const loc = arg('loc', 'en');
  const { file, problems } = assemble(loc);
  for (const p of problems) console.log('FAIL  ' + p);
  if (problems.length) { console.log(problems.length + ' problem(s); nothing written'); process.exit(1); }
  const out = path.join(REPO, 'frontend', 'content', 'curriculum-pages', 'pages.' + loc + '.json');
  if (has('check')) {
    const have = fs.existsSync(out) ? fs.readFileSync(out, 'utf8').replace(/\r\n/g, '\n') : '';
    if (have !== fileText(file)) { console.log('FAIL  ' + path.relative(REPO, out) + ' is not what assemble.js writes'); process.exit(1); }
    console.log(loc + ': curriculum pages file is current');
  } else {
    fs.writeFileSync(out, fileText(file));
    console.log(loc + ': ' + file.pages.length + ' page(s) → ' + path.relative(REPO, out));
    for (const p of file.pages) console.log('  ' + p.id.padEnd(16) + ' taught ' + String(p.counts.taught).padStart(3) + ' · near ' + String(p.counts.near).padStart(2) + ' · open ' + String(p.counts.open).padStart(3) + ' · lessons ' + p.counts.lessons);
  }
}
module.exports = { assemble, fileText, MIN_TAUGHT };
