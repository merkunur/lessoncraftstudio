#!/usr/bin/env node
/**
 * Assembles the units of one language from the content graph (Daily Teaching System, Parts 3 and 4).
 *
 * A unit is a list of lessons; a lesson is ONE teaching point. Nothing in a lesson is written here: every slot is
 * filled from a registry that already exists, and the only prose is what a teacher wrote for that teaching point
 * (frontend/content/units/points/<loc>.json: title, objective, note).
 *
 *   reads   frontend/content/units/defs/<loc>.json      the units: id, slug, grade, subject, title, metadata, and per
 *                                                        lesson the teaching point and the worksheet types to use
 *           frontend/content/units/points/<loc>.json    per teaching point: title, objective, the teacher note
 *           frontend/content/teaching-graph/…           points, assets/<loc>.json, tools.json
 *           frontend/content/curricula/<reg>/…          the national objective shown beside a lesson (show.js)
 *           scripts/worksheet-gen/i18n/strings.<loc>.json   worksheet titles
 *           out/teaching-graph/decks.tsv                the published pages (which page is which level)
 *   writes  frontend/content/units/units.<loc>.json     GENERATED; the pages render this file and nothing else
 *
 *   node scripts/units/assemble.js --loc=en            write
 *   node scripts/units/assemble.js --loc=en --check    exit 1 when the committed file is not what this would write
 *
 * A lesson slot that cannot be filled is left out (never "coming soon"). A lesson with fewer than two real assets
 * fails the build, as does a unit with fewer than four lessons (PLAN.md Part 4, the filler gate).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const has = (k) => process.argv.includes('--' + k);
const readJson = (f, fallback) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { if (fallback !== undefined) return fallback; throw new Error('cannot read ' + path.relative(REPO, f) + ': ' + e.message); } };

/** the registry a language's pages cite (a state layer is chosen by the page, not here) */
const REGISTRY_OF = { en: 'en', de: 'de', fr: 'fr', es: 'es', pt: 'pt', it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi' };
const { pagesOf } = require('./catalog.js');
const { lessonDays, unitDays, unitWeeks } = require('./pacing.js');
const MIN_LESSONS = 4;
const MIN_PLAN_UNITS = 3; // a year plan of one or two units is a thin page: those units are found on the hub

/** The name of a Swedish activity without the school year its page title carries (see the call). */
function svActivityName(title) {
  const YEAR = '(?:åk|årskurs) ?[1-3]|förskoleklass(?:en)?';
  let t = String(title).split(' | ')[0];                                             // "… | Åk 1", "… | övning", "… | Tilda"
  const em = t.split(' — ');                                                         // "Räkna sidorna — Geometri i förskoleklass"
  if (em.length === 2 && new RegExp(YEAR, 'i').test(em[1])) t = em[0];
  t = t.replace(new RegExp('\\s*[–,]\\s*(?:' + YEAR + ')(?: matematik)?\\s*$', 'i'), '')   // "… – åk 1", "…, åk 2", "… – åk 1 matematik"
    .replace(new RegExp('\\s+(?:för|i)\\s+(?:' + YEAR + ')(?![\\p{L}0-9])', 'giu'), '')        // "… för åk 2", "Rim i förskoleklass – …"
    .replace(new RegExp('\\s+(?:' + YEAR + ')(?=\\s+[–—])', 'gi'), '');                      // "Läs vanliga ord åk 1 – …"
  return t.replace(/\s{2,}/g, ' ').replace(/\s*[–—,]\s*$/, '').trim();
}

function assemble(loc, opt = {}) {
  const problems = [];
  const bad = (m) => problems.push(m);
  const U = path.join(REPO, 'frontend', 'content', 'units');
  const G = path.join(REPO, 'frontend', 'content', 'teaching-graph');
  const C = path.join(REPO, 'frontend', 'content', 'curricula');
  const defsFile = readJson(path.join(U, 'defs', loc + '.json'));
  const defs = defsFile.units;
  const text = readJson(path.join(U, 'points', loc + '.json')).points;
  const points = new Map(readJson(path.join(G, 'points.json')).points.map((p) => [p.id, p]));
  const assets = readJson(path.join(G, 'assets', loc + '.json'));
  const toolPoints = readJson(path.join(G, 'tools.json')).tools;
  const strings = readJson(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.' + loc + '.json'));
  const toolContent = readJson(path.join(REPO, 'frontend', 'messages', 'tool-content', loc + '.json'), {});
  const makerNames = (readJson(path.join(REPO, 'frontend', 'messages', 'makers', loc + '.json'), {}).makers) || {};
  const makerCopy = readJson(path.join(REPO, 'frontend', 'content', 'maker-landings', 'copy.' + loc + '.json'), {});
  const reg = REGISTRY_OF[loc];
  const fw = readJson(path.join(C, reg, 'framework.json'));
  const cw = readJson(path.join(C, reg, 'crosswalk.json')).points;
  const registry = { framework: fw, display: readJson(path.join(C, 'display.json')).registries[reg] };
  const { shown } = require('../curricula/show.js');
  const nodeById = new Map(fw.nodes.map((n) => [n.id, n]));

  // activities: id → { slug, title } in this language
  const acts = new Map();
  for (const f of fs.readdirSync(path.join(REPO, 'mini tools')).filter((x) => x.endsWith('-activities.json'))) {
    const j = readJson(path.join(REPO, 'mini tools', f));
    for (const e of (Array.isArray(j) ? j : j.activities || [])) {
      const slug = e.slug && typeof e.slug === 'object' ? e.slug[loc] : (loc === 'en' && typeof e.slug === 'string' ? e.slug : null);
      const title = e.page_title && typeof e.page_title === 'object' ? e.page_title[loc] : (loc === 'en' && typeof e.page_title === 'string' ? e.page_title : null);
      // an activity's page title often ends in its own grade ("… (Grade 2)"); inside a unit of another grade that reads wrong
      if (slug && title) acts.set(e.id, { slug, title: title.replace(/\s*\([^()]*\)\s*$/, '') });
    }
  }

  // the published pages of this language, per type and level, in copy order
  const pages = pagesOf(loc, opt.decksText);

  const seenSlug = new Set(), seenId = new Set();
  const units = [];
  for (const d of defs) {
    const where = loc + ' unit ' + d.id;
    if (seenId.has(d.id)) bad(where + ': id used twice'); seenId.add(d.id);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(d.slug || '')) bad(where + ': slug "' + d.slug + '" is not url-safe');
    if (seenSlug.has(d.slug)) bad(where + ': slug used twice'); seenSlug.add(d.slug);
    for (const k of ['title', 'metaTitle', 'metaDescription', 'grade', 'subject']) if (!d[k]) bad(where + ': no ' + k);
    const lessons = [];
    const usedPages = new Set();
    for (const [i, L] of d.lessons.entries()) {
      const lw = where + ' lesson ' + (i + 1) + ' (' + L.point + ')';
      const p = points.get(L.point);
      if (!p) { bad(lw + ': no such teaching point'); continue; }
      const tx = text[L.point];
      if (!tx || !tx.title || !tx.objective || !tx.note || !tx.note.mistake || !tx.note.words || !tx.note.watch) { bad(lw + ': the point has no title, objective and full teacher note in points/' + loc + '.json'); continue; }

      // paper: the worksheet types the unit names, each with its core page and, where published, an easier and a harder one
      const paper = [];
      for (const typeId of L.types || []) {
        if (!p.types.includes(typeId)) { bad(lw + ': type ' + typeId + ' does not belong to this teaching point'); continue; }
        const pg = pages.get(typeId);
        // a type made per picture or per letter carries a placeholder in its title ("Color by Number: {UNIT}"): the unit
        // names the type, so a placeholder at the end is dropped; one in the middle of a title cannot be shown
        const label = L.titles && L.titles[typeId];
        const title = label || (strings[typeId] && strings[typeId].title && strings[typeId].title.replace(/\s*:\s*\{[A-Za-z_]+\}\s*$/, ''));
        if (title && /\{[A-Za-z_]+\}/.test(title)) { bad(lw + ': the title of type ' + typeId + ' carries a placeholder (' + title + ')'); continue; }
        if (!pg || !pg.core.length || !title) { bad(lw + ': type ' + typeId + ' has no published core page or no title in this language'); continue; }
        const pick = (r) => { const x = pg[r].find((y) => !usedPages.has(y.slug)); if (x) usedPages.add(x.slug); return x || null; };
        const core = pick('core'), easy = pick('easy'), hard = pick('hard');
        const a = assets.types[typeId] || {};
        // a lesson may give a page a label of its own (`titles`), where two of its pages print the same title
        const row = { type: typeId, title: (L.titles && L.titles[typeId]) || title, core: core.slug };
        if (easy) row.easy = easy.slug;
        if (hard) row.hard = hard.slug;
        if (core.screen) row.screen = 1;
        if (a.landing) row.landing = a.landing;
        paper.push(row);
      }
      for (const a of paper) if (paper.some((b) => b !== a && b.title === a.title)) { bad(lw + ': two worksheets carry the title "' + a.title + '" (give one a label of its own: `titles` in the definition)'); break; }
      // exit ticket: one more core page of the lesson's first type that the lesson has not handed out
      let exit = null;
      if (paper.length) {
        const pg = pages.get(paper[0].type);
        const x = pg.core.find((y) => !usedPages.has(y.slug));
        if (x) { usedPages.add(x.slug); exit = { slug: x.slug, title: paper[0].title }; }
      }
      // the tool on the projector: the unit's choice, else the first tool that models this point
      const toolKey = L.tool === null ? null : (L.tool || Object.keys(toolPoints).find((k) => (toolPoints[k].points || []).includes(L.point)) || null);
      let tool = null;
      if (toolKey) {
        const tc = toolContent[toolKey];
        if (L.tool && !(toolPoints[toolKey] && (toolPoints[toolKey].points || []).includes(L.point))) bad(lw + ': tool ' + toolKey + ' does not model this teaching point (tools.json)');
        if (tc && tc.slug && tc.name) tool = { key: toolKey, slug: tc.slug, name: tc.name };
        else if (L.tool) bad(lw + ': tool ' + toolKey + ' has no page in this language');
      }
      // on screen: a live activity of the point (the unit's choice first), else a page of the lesson with a screen version
      const actId = L.activity === null ? null : (L.activity || (p.activities || []).find((a) => acts.has(a)) || null);
      let screen = null;
      if (actId) {
        if (!(p.activities || []).includes(actId)) bad(lw + ': activity ' + actId + ' does not belong to this teaching point');
        else if (acts.has(actId)) {
          screen = Object.assign({ kind: 'activity', id: actId }, acts.get(actId));
          // "Even or Odd? — Number Sense for Grade 2" in a Kindergarten unit: when the part after the dash names
          // another grade, only the activity's name is shown; the unit's own grade word is dropped as needless
          const cut = screen.title.split(' — ');
          const GW = { K: 'Kindergarten', 1: 'Grade 1', 2: 'Grade 2', 3: 'Grade 3' }[d.grade] || null;
          if (cut.length === 2 && /Kindergarten|Grade [0-9]/.test(cut[1])) screen.title = GW && cut[1].includes(GW) ? (cut[0] + ' — ' + cut[1].split(GW).join('').replace(/\s*\|\s*$|\s+for\s*$|^\s*\|\s*/g, '').replace(/\s{2,}/g, ' ').trim()).replace(/ — $/, '') : cut[0];
          // Swedish: an activity's page title carries a year ("… för åk 2", "… i förskoleklass", "| Åk 1"), and the
          // Swedish units place a lesson by Swedish practice, often in another year than that title names. The year
          // is on the unit page already, so the lesson shows the activity's name without it.
          if (loc === 'sv') screen.title = svActivityName(screen.title);
        }
        else if (L.activity) bad(lw + ': activity ' + actId + ' is not live in this language');
      }
      // (the indexable page of a type is often print-only while its further copies have the Check button)
      if (!screen) {
        for (const r of paper) {
          // a page the lesson has not handed out comes first: it is something more to do, not the same page twice
          const pool = pages.get(r.type).core;
          const x = pool.find((y) => y.screen && !usedPages.has(y.slug)) || pool.find((y) => y.screen && y.slug === r.core);
          if (x) { usedPages.add(x.slug); screen = { kind: 'page', slug: x.slug, title: r.title }; break; }
        }
      }
      // make more: the maker of the lesson's first type
      let maker = null;
      const mk = paper.length && assets.types[paper[0].type] && assets.types[paper[0].type].maker;
      if (mk && makerNames[mk] && makerCopy[mk]) maker = { id: mk, name: makerNames[mk], slug: makerCopy[mk].slug, template: paper[0].type };
      // The national objective, at most three, shown as the site shows an objective. A row that says "teaches" is true
      // AT THE YEAR OF ITS OBJECTIVE: in a unit of another year it is shown for what it is there — an objective of an
      // earlier year is one the unit REVIEWS, an objective of a later year is one the lesson reaches AHEAD to (a
      // Kindergarten code in a Grade 1 unit is not that unit's alignment). Order: the unit's own year, then reviewed,
      // then ahead, then the rows that only prepare or extend.
      const e = cw[L.point] || {};
      const YEARS = ['P', 'K', '1', '2', '3', '4', '5', '6'];
      const span = (g) => { const xs = String(g || '').split('-').map((x) => YEARS.indexOf(x)); return xs.length && xs.every((x) => x >= 0) ? [Math.min(...xs), Math.max(...xs)] : null; };
      const unitYear = YEARS.indexOf(String(d.grade));
      const relIn = (r) => { if (r.rel !== 'teaches') return r.rel; const s = span(r.grade); if (!s || unitYear < 0) return 'teaches'; return s[1] < unitYear ? 'reviews' : s[0] > unitYear ? 'ahead' : 'teaches'; };
      const RANK = { teaches: 0, reviews: 1, ahead: 2, prepares: 3, extends: 4 };
      // A row that only prepares for or extends an objective two or more years away is not shown (a Grade 4 code on a
      // Kindergarten lesson reads as a mistake). A lesson may also NAME the objectives its own pages teach (`standards`:
      // ids of the point's crosswalk rows), because a point is wider than the two or three pages one lesson hands out.
      const far = (r) => { if (r.rel === 'teaches') return false; const sp = span(r.grade); return !!sp && unitYear >= 0 && (sp[0] - unitYear >= 2 || unitYear - sp[1] >= 2); };
      if (L.standards) for (const id of L.standards) if (!(e.rows || []).some((r) => r.id === id)) bad(lw + ': ' + id + ' is not an objective of this teaching point in the registry');
      const rows = (e.rows || []).filter((r) => (L.standards ? L.standards.includes(r.id) : !far(r))).map((r) => Object.assign({}, r, { shown: relIn(r) })).sort((a, b) => RANK[a.shown] - RANK[b.shown]).slice(0, 3);
      const standards = rows.filter((r) => nodeById.has(r.id)).map((r) => { const s = shown(registry, nodeById.get(r.id)); return { rel: r.shown, framework: s.framework, code: s.code, title: s.titles[s.titles.length - 1] || null }; });

      // two real assets: worksheet types, a tool, practice on screen. Practice on screen is an activity, or a page with
      // a Check button that is NOT one of the pages the lesson hands out on paper (the same page twice is one asset).
      const real = paper.length + (tool ? 1 : 0) + (screen && (screen.kind === 'activity' || !paper.some((r) => r.core === screen.slug)) ? 1 : 0);
      if (real < 2) bad(lw + ': fewer than two real assets (' + real + ')');
      const lesson = { n: lessons.length + 1, point: L.point, title: tx.title, objective: tx.objective, standards, paper };
      if (tool) lesson.tool = tool;
      if (screen) lesson.screen = screen;
      if (exit) lesson.exit = exit;
      if (maker) lesson.maker = maker;
      lesson.note = { mistake: tx.note.mistake, words: tx.note.words, watch: tx.note.watch };
      // the class days this lesson carries, by what it holds (scripts/units/pacing.js, Part 4.8)
      lesson.days = lessonDays(d.grade, lesson);
      lessons.push(lesson);
    }
    if (lessons.length < MIN_LESSONS) bad(where + ': ' + lessons.length + ' lessons (at least ' + MIN_LESSONS + ')');
    const unit = { id: d.id, slug: d.slug, status: d.status || 'pilot', grade: d.grade, subject: d.subject, title: d.title, metaTitle: d.metaTitle, metaDescription: d.metaDescription, days: unitDays(d.grade, lessons), weeks: unitWeeks(d.grade, lessons, { loc, subject: d.subject }), lessons };
    units.push(unit);
  }
  // YEAR PLANS (scope and sequence, Part 4.4): the units of one grade and subject in teaching order, with the weeks
  // each one takes. A plan says how many weeks its lessons fill; it never claims a whole school year.
  const plans = [];
  const planned = new Set();
  for (const p of defsFile.plans || []) {
    const where = 'plan ' + p.id;
    for (const k of ['id', 'slug', 'title', 'metaTitle', 'metaDescription', 'grade', 'subject']) if (!p[k]) bad(where + ': no ' + k);
    if ((p.units || []).length < MIN_PLAN_UNITS) bad(where + ': ' + (p.units || []).length + ' units (at least ' + MIN_PLAN_UNITS + ')');
    let week = 0;
    const rows = [];
    for (const id of p.units || []) {
      const u = units.find((x) => x.id === id);
      if (!u) { bad(where + ': ' + id + ' is no unit'); continue; }
      if (u.grade !== p.grade || u.subject !== p.subject) bad(where + ': ' + id + ' is a unit of grade ' + u.grade + ' ' + u.subject);
      if (planned.has(id)) bad(where + ': ' + id + ' is in two plans');
      planned.add(id);
      const standards = [...new Set(u.lessons.flatMap((l) => l.standards.filter((x) => x.rel === 'teaches' && x.code).map((x) => x.code)))];
      rows.push({ id: u.id, slug: u.slug, title: u.title, weeks: u.weeks, from: week + 1, to: week + u.weeks, lessons: u.lessons.map((l) => l.title), standards });
      week += u.weeks;
    }
    for (const u of units) if (u.grade === p.grade && u.subject === p.subject && !(p.units || []).includes(u.id)) bad(where + ': the unit ' + u.id + ' of this grade and subject is not in the plan');
    const live = rows.length > 0 && rows.every((r) => units.find((x) => x.id === r.id).status === 'live');
    const framework = (rows.flatMap((r) => units.find((x) => x.id === r.id).lessons.flatMap((l) => l.standards)).find((x) => x.rel === 'teaches' && x.code) || {}).framework || null;
    // {units} and {weeks} in a plan's page title and description are filled in here, so they always say what the plan holds
    const said = (t) => String(t || '').replace('{units}', String(rows.length)).replace('{weeks}', String(week));
    for (const r of rows) r.standards.sort((x, y) => x.localeCompare(y, 'en', { numeric: true }));
    plans.push({ id: p.id, slug: p.slug, status: live ? 'live' : 'pilot', grade: p.grade, subject: p.subject, title: said(p.title), metaTitle: said(p.metaTitle), metaDescription: said(p.metaDescription), weeks: week, framework, units: rows });
  }
  return { file: { $comment: 'GENERATED by scripts/units/assemble.js from defs/' + loc + '.json, points/' + loc + '.json, the content graph and the curriculum registry. Do not edit by hand.', locale: loc, units, plans }, problems };
}

const fileText = (f) => JSON.stringify(f, null, 1) + '\n';

if (require.main === module) {
  const loc = arg('loc', 'en');
  const { file, problems } = assemble(loc);
  for (const p of problems) console.log('FAIL  ' + p);
  if (problems.length) { console.log(problems.length + ' problem(s); nothing written'); process.exit(1); }
  const out = path.join(REPO, 'frontend', 'content', 'units', 'units.' + loc + '.json');
  if (has('check')) {
    const have = fs.existsSync(out) ? fs.readFileSync(out, 'utf8').replace(/\r\n/g, '\n') : '';
    if (have !== fileText(file)) { console.log('FAIL  ' + path.relative(REPO, out) + ' is not what assemble.js writes'); process.exit(1); }
    console.log(loc + ': units file is current');
  } else {
    fs.writeFileSync(out, fileText(file));
    console.log(loc + ': ' + file.units.length + ' unit(s), ' + file.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons, ' + file.plans.length + ' year plan(s) → ' + path.relative(REPO, out));
  }
}
module.exports = { assemble, fileText };
