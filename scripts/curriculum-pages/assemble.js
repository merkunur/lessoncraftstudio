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
 * Two kinds of page. A framework with public codes (Common Core, TEKS): a line is an objective, shown by its code.
 * A framework without them (the German Bildungsstandards and state plans): a line is a PART of the document with the
 * lessons under it (see partsPage below).
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
const ELA_STRANDS = { RL: 'Reading: Literature', RI: 'Reading: Informational Text', RF: 'Reading: Foundational Skills', W: 'Writing', SL: 'Speaking and Listening', L: 'Language' };
// the order of the parts in the documents themselves (the registry lists nodes by id): the domains of Common Core
// Math by the letters their ids end with, the strands of Common Core ELA by the letters their codes begin with
const MATH_DOMAINS = ['CC', 'OA', 'NBT', 'NF', 'MD', 'G'];
const HEADINGS = new Set(['domain', 'cluster', 'strand', 'topic', 'area', 'subarea']);
// codes in the order a teacher reads them: K.CC.A.2 before K.CC.A.10, 1.2.B before 1.10.A
const natural = (a, b) => { const x = a.split(/[.\-]/), y = b.split(/[.\-]/); for (let i = 0; i < Math.max(x.length, y.length); i++) { const p = x[i] || '', q = y[i] || ''; if (p === q) continue; const R = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9, x: 10, xi: 11, xii: 12 }; if (R[p] && R[q]) return R[p] - R[q]; const n = Number(p), m = Number(q); if (p !== '' && q !== '' && !Number.isNaN(n) && !Number.isNaN(m)) return n - m; return p < q ? -1 : 1; } return 0; };

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
      // (the definition of THIS lesson: by its id where a point carries several lessons)
      const own = d && d.lessons ? (d.lessons.find((x) => (x.id || x.point) === (l.id || l.point)) || {}).standards : null;
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


  // ---- A FRAMEWORK WITHOUT PUBLIC CODES (show = area or label: the German Bildungsstandards and state plans) ----
  // A line of such a page is a PART of the document (the lowest heading the objectives stand under: a
  // Kompetenzbereich, a Lernbereich), named by its own title and, where the plan numbers its parts, by that number.
  // An objective itself is never a line: it has no code to stand for it, and its wording is not ours to print. Under
  // a part stand the lessons whose teaching point has a `teaches` row for an objective of the part, by unit, and a
  // count of the part's objectives that such a row names. A page covers one or more grade bands of the registry
  // (defs: `grades`).
  const partKey = (id) => 'part-' + id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const partsPage = (d, R, meta, where) => {
    const grades = (d.grades || [d.grade]).map(String);
    const nodes = R.fw.nodes.filter((n) => n.f === d.framework && grades.includes(String(n.grade)));
    const up = (n) => (n.parent ? R.byId.get(n.parent) : null);
    const headOf = (n) => { for (let x = up(n), g = 0; x && g < 12; x = up(x), g++) if (HEADINGS.has(x.kind)) return x; return null; };
    const topOf = (n) => { let t = n; for (let g = 0; up(t) && g < 12; g++) t = up(t); return t; };
    const order = new Map(R.fw.nodes.map((n, i) => [n.id, i]));
    const unitIndex = new Map(unitsFile.units.map((u, i) => [u.slug, i]));
    // the parts, in the order of the document, each with the objectives that stand under it in these grades
    const parts = new Map();
    for (const n of nodes) {
      if (HEADINGS.has(n.kind)) continue;
      const h = headOf(n);
      if (!h) { bad(where + ': ' + n.id + ' stands under no part of the document'); continue; }
      if (!parts.has(h.id)) parts.set(h.id, { node: h, members: [] });
      parts.get(h.id).members.push(n);
    }
    // a row may name a part itself (the whole Kompetenzbereich): it counts for the part, not for an objective
    for (const n of R.fw.nodes) if (n.f === d.framework && HEADINGS.has(n.kind) && parts.has(n.id) && (R.rowsOf.get(n.id) || []).length) parts.get(n.id).own = true;
    const groups = [], byKey = new Map();
    let objectives = 0, taught = 0, nTaught = 0, nNear = 0, nOpen = 0;
    const lessonKeys = new Set();
    for (const part of [...parts.values()].sort((a, b) => order.get(a.node.id) - order.get(b.node.id))) {
      const top = topOf(part.node);
      const gKey = top.id === part.node.id ? '_own' : top.id;
      if (!byKey.has(gKey)) { const g = { title: gKey === '_own' ? d.partsTitle || meta.short : top.text, items: [], open: [] }; byKey.set(gKey, g); groups.push(g); }
      const g = byKey.get(gKey);
      const s = shown(R.registry, part.node);
      const leaves = part.members.filter((n) => !R.hasChild.has(n.id));
      objectives += leaves.length;
      const found = { teaches: new Map(), near: new Map() }, papers = [];
      let nearRel = null, partTaught = 0;
      for (const n of [part.node, ...part.members]) {
        let leafTaught = false;
        for (const r of R.rowsOf.get(n.id) || []) {
          const p = points.get(r.point);
          if (!p) { bad(where + ': ' + n.id + ' names the point ' + r.point + ', which the graph does not have'); continue; }
          const ls = (lessonsOf.get(r.point) || []).filter((l) => !l.own || d.registry !== loc || l.own.includes(n.id));
          const into = r.rel === 'teaches' ? found.teaches : found.near;
          for (const l of ls) into.set(l.unit + '#' + l.n, { unit: l.unit, unitTitle: l.unitTitle, unitGrade: l.unitGrade, n: l.n, title: l.title });
          if (r.rel !== 'teaches' && ls.length && !nearRel) nearRel = r.rel;
          let paper = false;
          if (!ls.length && r.rel === 'teaches') for (const t of p.types) { const a = assets.types[t], st = strings[t]; if (a && a.p && a.p[1] > 0 && a.base && st && st.title && !/\{[A-Za-z_]+\}/.test(st.printTitle || st.title)) { paper = true; if (papers.length < 4 && !papers.some((x) => x.core === a.base)) papers.push({ title: st.printTitle || st.title, core: a.base }); } }
          // the count a part shows is "lessons for N of M": an objective that only a worksheet stands for is not in
          // it (the page shows a part's worksheets only when the part has no lesson, and then without a count)
          if (r.rel === 'teaches' && ls.length) leafTaught = true;
        }
        if (leafTaught && n !== part.node && !R.hasChild.has(n.id)) partTaught++;
      }
      const rKey = d.id + ' / ' + partKey(part.node.id);
      const ruling = rulings[rKey];
      if (ruling) usedRulings.add(rKey);
      // a lesson the reviewer took out of a part (the claim itself is corrected in the registry by apply-review.js;
      // this only holds until the registry is rebuilt)
      const dropped = (k) => { const r = rulings[rKey + ' / ' + k]; if (r) usedRulings.add(rKey + ' / ' + k); return !!r && r.verdict === 'drop'; };
      for (const k of [...found.teaches.keys()]) if (dropped(k)) found.teaches.delete(k);
      for (const k of [...found.near.keys()]) if (dropped(k) || found.teaches.has(k)) found.near.delete(k);
      const label = { code: s.code || '', title: part.node.text, key: partKey(part.node.id) };
      const state = ruling && ruling.verdict === 'drop' ? null : found.teaches.size || papers.length ? 'taught' : found.near.size ? 'near' : null;
      if (!state) { g.open.push(label); nOpen++; continue; }
      const use = state === 'taught' ? found.teaches : found.near;
      const units = [];
      for (const l of [...use.values()].sort((a, b) => unitIndex.get(a.unit) - unitIndex.get(b.unit) || a.n - b.n)) {
        let u = units.find((x) => x.unit === l.unit);
        if (!u) { u = { unit: l.unit, unitTitle: l.unitTitle, unitGrade: l.unitGrade, lessons: [] }; units.push(u); }
        u.lessons.push({ n: l.n, title: l.title });
        lessonKeys.add(l.unit + '#' + l.n);
      }
      const item = Object.assign({}, label, { state, counts: { objectives: leaves.length, taught: state === 'taught' ? partTaught : 0 } });
      if (state === 'near') item.rel = nearRel === 'extends' ? 'extends' : 'prepares';
      if (ruling && ruling.text) item.text = ruling.text;
      if (units.length) item.units = units;
      if (papers.length && !units.length) item.papers = papers;
      g.items.push(item);
      if (state === 'taught') { nTaught++; taught += partTaught; } else nNear++;
    }
    const kept = groups.filter((g) => g.items.length || g.open.length).map((g) => { const o = { title: g.title, items: g.items }; if (g.open.length) o.openParts = g.open; return o; });
    if (taught < MIN_TAUGHT) bad(where + ': ' + taught + ' taught objectives (a page needs ' + MIN_TAUGHT + ')');
    for (const k of ['gradeLabel']) if (!d[k]) bad(where + ': no ' + k);
    return {
      id: d.id, slug: d.slug, status: d.status || 'pilot', mode: 'parts', registry: d.registry, framework: d.framework, frameworkShort: meta.short, frameworkTitle: meta.title, publisher: meta.publisher, year: meta.year, officialDocument: String(meta.officialDocument).split(' ')[grades.length === 1 && d.documentIndex ? d.documentIndex : 0],
      grade: grades.join(','), gradeLabel: d.gradeLabel, subject: d.subject, title: d.title, metaTitle: d.metaTitle, metaDescription: d.metaDescription,
      counts: { objectives, taught, near: nNear, open: nOpen, lessons: lessonKeys.size, parts: nTaught + nNear + nOpen, partsTaught: nTaught }, groups: kept,
    };
  };

  const pages = [], seen = new Set();
  for (const d of defs) {
    const where = loc + ' page ' + d.id;
    if (seen.has(d.id) || seen.has('/' + d.slug)) bad(where + ': id or slug used twice');
    seen.add(d.id); seen.add('/' + d.slug);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(d.slug || '')) bad(where + ': slug "' + d.slug + '" is not url-safe');
    for (const k of ['title', 'metaTitle', 'metaDescription', 'registry', 'framework', 'subject']) if (!d[k]) bad(where + ': no ' + k);
    if (!d.grade && !d.grades) bad(where + ': no grade');
    if (!display[d.registry]) { bad(where + ': no registry ' + d.registry); continue; }
    const R = registryOf(d.registry);
    const meta = R.fw.frameworks.find((f) => f.key === d.framework);
    if (!meta) { bad(where + ': the registry has no framework ' + d.framework); continue; }
    if ((display[d.registry].frameworks[d.framework] || {}).show !== 'code') { pages.push(partsPage(d, R, meta, where)); continue; }
    const nodes = R.fw.nodes.filter((n) => n.f === d.framework && String(n.grade) === String(d.grade));
    const groups = [], byTitle = new Map();
    const groupOf = (n) => {
      let title = null, order = 0;
      if (d.framework === 'ccss-ela') { const pre = n.id.split('.')[0]; title = ELA_STRANDS[pre] || pre; order = Object.keys(ELA_STRANDS).indexOf(pre); }
      else {
        let top = n; for (let g = 0; top.parent && g < 12; g++) top = R.byId.get(top.parent);
        const number = Number(shown(R.registry, top).code.split('.').pop());
        if (top.kind === 'domain') { title = top.text; order = MATH_DOMAINS.indexOf(top.id.split('.').pop()); }
        // TEKS Math: the document's own title of the strand (several numbered statements share one)
        else if (d.framework === 'teks-math') { title = top.text.split('.')[0]; order = number; }
        // TEKS ELAR: the numbered "knowledge and skills" statement the expectation stands under (the registry holds
        // no short title for it, and none is invented)
        else { title = (d.statementWord || 'Knowledge and skills') + ' (' + number + ')'; order = number; }
      }
      if (!byTitle.has(title)) { const g = { title, order, items: [], open: [] }; byTitle.set(title, g); groups.push(g); }
      return byTitle.get(title);
    };
    let taught = 0, near = 0, open = 0;
    const usedText = new Map();
    const lessonKeys = new Set();
    for (const n of nodes) {
      if (HEADINGS.has(n.kind)) continue;                                     // a part of the document, never a line
      const rows = R.rowsOf.get(n.id) || [];
      const isLeaf = !R.hasChild.has(n.id);
      if (!rows.length && !isLeaf) continue;                                  // an objective that only holds its parts
      const g = groupOf(n);
      const code = shown(R.registry, n).code;
      if (!rows.length) { g.open.push(code); open++; continue; }              // nothing of ours names this objective
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
      const item = { code, state: ruling && (ruling.verdict === 'prepares' || ruling.verdict === 'extends') ? 'near' : ruling && ruling.verdict === 'teaches' ? 'taught' : state, text: (ruling && ruling.text) || lessonText || skillText };
      if (item.state === 'near') item.rel = ruling && (ruling.verdict === 'prepares' || ruling.verdict === 'extends') ? ruling.verdict : rows.some((r) => r.rel === 'prepares') ? 'prepares' : 'extends';
      // the lessons of one unit in the order of the unit; the units in the order they were found
      const unitOrder = [...new Set(lessons.map((l) => l.unit))];
      lessons.sort((a, b) => unitOrder.indexOf(a.unit) - unitOrder.indexOf(b.unit) || a.n - b.n);
      if (lessons.length) item.lessons = lessons.slice(0, 4);
      if (papers.length && !lessons.length) item.papers = papers;
      g.items.push(item);
      if (item.state === 'taught') taught++; else near++;
    }
    groups.sort((a, b) => a.order - b.order);
    for (const g of groups) { g.items.sort((a, b) => natural(a.code, b.code)); g.open.sort(natural); }
    const kept = groups.filter((g) => g.items.length || g.open.length).map((g) => { const o = { title: g.title, items: g.items }; if (g.open.length) o.open = g.open; return o; });
    if (taught < MIN_TAUGHT) bad(where + ': ' + taught + ' taught objectives (a page needs ' + MIN_TAUGHT + ')');
    for (const g of kept) for (const it of g.items) if (!it.text) bad(where + ': ' + it.code + ' has no description');
    pages.push({
      id: d.id, slug: d.slug, status: d.status || 'pilot', registry: d.registry, framework: d.framework, frameworkShort: meta.short, frameworkTitle: meta.title, publisher: meta.publisher, year: meta.year, officialDocument: meta.officialDocument,
      grade: String(d.grade), subject: d.subject, title: d.title, metaTitle: d.metaTitle, metaDescription: d.metaDescription,
      counts: { objectives: taught + near + open, taught, near, open, lessons: lessonKeys.size }, groups: kept,
    });
  }
  for (const k of Object.keys(rulings)) { if (!usedRulings.has(k)) bad(loc + ': the ruling for ' + k + ' names no line of a page'); const v = rulings[k]; if (!['drop', 'prepares', 'extends', 'teaches', 'describe'].includes(v.verdict) || (v.verdict === 'describe' && !v.text) || !v.why) bad(loc + ': the ruling for ' + k + ' is not a verdict with its reason'); }
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
    for (const p of file.pages) console.log('  ' + p.id.padEnd(16) + (p.mode === 'parts' ? ' parts ' + String(p.counts.partsTaught).padStart(2) + '/' + String(p.counts.parts).padEnd(3) : '') + ' taught ' + String(p.counts.taught).padStart(3) + ' · near ' + String(p.counts.near).padStart(2) + ' · open ' + String(p.counts.open).padStart(3) + ' · lessons ' + p.counts.lessons);
  }
}
module.exports = { assemble, fileText, MIN_TAUGHT };
