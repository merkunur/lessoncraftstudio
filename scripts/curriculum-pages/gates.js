#!/usr/bin/env node
/**
 * The gates of the curriculum pages (Daily Teaching System, Part 6). HARD in deploy.sh.
 *
 *   Q1  generated   pages.<loc>.json is what assemble.js writes from the registry and the units
 *   Q2  links       every lesson a line names is a lesson of a LIVE unit of the language; every worksheet is published
 *   Q3  no quotation  no line and no page string holds the wording of an objective of its registry (40 characters
 *                   or more of it): a page shows the official code and OUR description, never the official text
 *   Q4  not thin    a page has at least MIN_TAUGHT taught objectives, every line has a description and a lesson or a
 *                   worksheet
 *   Q5  tier truth  no visible string says the material is free
 *   Q6  no claim    no string says the pages are approved, endorsed or published by the authors of a framework
 *                   (the one sentence that says they are NOT is the hub note)
 *
 *   node scripts/curriculum-pages/gates.js            every language that has curriculum pages
 *   node scripts/curriculum-pages/gates.js --poison   also proves that each gate fails on a broken copy
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const { assemble, fileText, MIN_TAUGHT } = require('./assemble.js');
const { pagesOf } = require('../units/catalog.js');
const C = path.join(REPO, 'frontend', 'content');
// The worksheet half of Q2 reads the catalogue dump (out/teaching-graph/decks.tsv, written on the PC by
// scripts/teaching-graph/pull-decks.sh). The server has no such file: there this half is NOT run and the gate says
// so; after the deploy scripts/curriculum-pages/live-check.js asks the live site for every worksheet a page links.
const DUMP = path.join(REPO, 'out', 'teaching-graph', 'decks.tsv');
const haveDump = () => fs.existsSync(DUMP);
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const FREE = { en: /\bfree\b/i, de: /\b(kostenlos|gratis|umsonst)\b/i };
// one official code as the name of a page: K.CC.A.1, 2.NBT.B.5, RF.1.3.a, 1.2.B
const ONE_CODE = /(^|[\s(])(?:[K1-5]\.[A-Z]{1,3}\.[A-Z]\.\d+|[A-Z]{1,2}\.[K1-5]\.\d+(?:\.[a-z])?|[K1-5]\.\d+\.[A-Z])(?=$|[\s),:])/;
const CLAIM = /\b(approved|endorsed|certified|published|authorized) by\b/i;
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9äöüßåéèáíóúñç]+/gi, ' ').trim();

function load() {
  const d = {};
  const dir = path.join(C, 'curriculum-pages');
  for (const f of fs.readdirSync(dir).filter((x) => /^pages\.[a-z]{2}\.json$/.test(x))) {
    const loc = f.split('.')[1];
    d[loc] = { text: fs.readFileSync(path.join(dir, f), 'utf8').replace(/\r\n/g, '\n'), pages: readJson(path.join(dir, f)).pages, ui: readJson(path.join(dir, 'ui.' + loc + '.json')), units: readJson(path.join(C, 'units', 'units.' + loc + '.json')).units };
  }
  return d;
}
const wordings = new Map();
function wordingOf(reg) {
  if (!wordings.has(reg)) wordings.set(reg, readJson(path.join(C, 'curricula', reg, 'framework.json')).nodes.filter((n) => n.kind !== 'domain' && n.kind !== 'topic').map((n) => norm(n.text)).filter((t) => t.length >= 40));
  return wordings.get(reg);
}

function run(d, opt = {}) {
  const fails = [];
  const titles = new Map();
  const fail = (gate, what) => fails.push(gate + '  ' + what);
  for (const [loc, L] of Object.entries(d)) {
    if (!opt.skipGenerated) { const a = assemble(loc); if (a.problems.length) fail('Q1', loc + ': ' + a.problems[0]); else if (fileText(a.file) !== L.text) fail('Q1', loc + ': pages.' + loc + '.json is not what assemble.js writes'); }
    const lessons = new Set();
    for (const u of L.units) if (u.status === 'live') for (const l of u.lessons) lessons.add(u.slug + '#' + l.n);
    const slugs = haveDump() ? new Set() : null;
    if (slugs) for (const [, pg] of pagesOf(loc)) for (const r of ['core', 'easy', 'hard']) for (const x of pg[r] || []) slugs.add(x.slug);
    for (const [k, v] of Object.entries(L.ui)) {
      if (FREE[loc] && FREE[loc].test(v)) fail('Q5', loc + ' ui.' + k + ' says free');
      if (CLAIM.test(v) && k !== 'hubNote') fail('Q6', loc + ' ui.' + k + ' claims an approval');
    }
    if (L.ui.hubNote && !/\bnot\b/i.test(L.ui.hubNote) && loc === 'en') fail('Q6', loc + ' ui.hubNote does not say that the pages are NOT approved');
    for (const p of L.pages) {
      const w = loc + ' page ' + p.id;
      const official = wordingOf(p.registry);
      if (p.counts.taught < MIN_TAUGHT) fail('Q4', w + ': ' + p.counts.taught + ' taught objectives');
      // Q7: the per-code pages (/standards/<code>) own the search for one code; a checklist is named by framework,
      // grade and subject, and no two checklists share a title
      for (const s of [p.title, p.metaTitle]) { if (ONE_CODE.test(s)) fail('Q7', w + ': "' + s.slice(0, 50) + '" is titled with one code'); }
      if (titles.has(loc + ' ' + p.metaTitle)) fail('Q7', w + ': the title of ' + titles.get(loc + ' ' + p.metaTitle)); else titles.set(loc + ' ' + p.metaTitle, p.id);
      for (const s of [p.title, p.metaTitle, p.metaDescription]) { if (FREE[loc] && FREE[loc].test(s)) fail('Q5', w + ': "' + s.slice(0, 50) + '" says free'); if (CLAIM.test(s)) fail('Q6', w + ': "' + s.slice(0, 50) + '" claims an approval'); }
      for (const g of p.groups) for (const it of g.items) {
        const iw = w + ' ' + it.code;
        if (!it.text) fail('Q4', iw + ': no description');
        if (!(it.lessons && it.lessons.length) && !(it.papers && it.papers.length)) fail('Q4', iw + ': neither a lesson nor a worksheet');
        for (const l of it.lessons || []) if (!lessons.has(l.unit + '#' + l.n)) fail('Q2', iw + ': lesson ' + l.n + ' of ' + l.unit + ' is no lesson of a live unit');
        if (slugs) for (const x of it.papers || []) if (!slugs.has(x.core)) fail('Q2', iw + ': the worksheet ' + x.core + ' is not published');
        const t = norm(it.text || '');
        if (t.length >= 40 && official.some((o) => o.includes(t) || t.includes(o))) fail('Q3', iw + ': the description is the wording of an objective');
        if (FREE[loc] && FREE[loc].test(it.text || '')) fail('Q5', iw + ': the description says free');
      }
    }
  }
  return fails;
}

const POISONS = [
  ['a pages file edited by hand', 'Q1', (d) => { d.en.text = d.en.text.replace('"taught"', '"Taught"'); }, {}],
  ['a lesson that does not exist', 'Q2', (d) => { const it = d.en.pages[0].groups.flatMap((g) => g.items).find((i) => i.lessons); it.lessons[0].n = 99; }, { skipGenerated: true }],
  ['a worksheet that is not published', 'Q2', (d) => { const it = d.en.pages.flatMap((p) => p.groups.flatMap((g) => g.items)).find((i) => i.papers) || d.en.pages[0].groups[0].items[0]; it.papers = [{ title: 'x', core: 'no-such-page-k999' }]; }, { skipGenerated: true }],
  ['the official wording as a description', 'Q3', (d) => { const p = d.en.pages[0]; const n = readJson(path.join(C, 'curricula', p.registry, 'framework.json')).nodes.find((x) => x.kind === 'standard' && x.text.length > 60); p.groups[0].items[0].text = n.text; }, { skipGenerated: true }],
  ['a thin page', 'Q4', (d) => { d.en.pages[0].counts.taught = 3; }, { skipGenerated: true }],
  ['a line with nothing behind it', 'Q4', (d) => { const it = d.en.pages[0].groups[0].items[0]; delete it.lessons; delete it.papers; }, { skipGenerated: true }],
  ['a title that says free', 'Q5', (d) => { d.en.pages[0].metaTitle = 'Free ' + d.en.pages[0].metaTitle; }, { skipGenerated: true }],
  ['a title that names one code', 'Q7', (d) => { d.en.pages[0].metaTitle = 'K.CC.A.1 Activities and Worksheets'; }, { skipGenerated: true }],
  ['two checklists with one title', 'Q7', (d) => { d.en.pages[1].metaTitle = d.en.pages[0].metaTitle; }, { skipGenerated: true }],
  ['a string that claims an approval', 'Q6', (d) => { d.en.ui.hubLead += ' Approved by the state.'; }, { skipGenerated: true }],
];

if (require.main === module) {
  const d = load();
  const fails = run(d);
  for (const f of fails) console.log('FAIL  ' + f);
  if (fails.length) { console.log(fails.length + ' problem(s)'); process.exit(1); }
  let pages = 0; for (const L of Object.values(d)) pages += L.pages.length;
  if (!haveDump()) console.log('curriculum pages: the worksheet half of Q2 was NOT run (this machine has no catalogue dump; it runs on the PC before a deploy, and the live check follows every worksheet link)');
  if (process.argv.includes('--poison')) {
    if (!haveDump()) { console.log('the poisons need the catalogue dump (PC only)'); process.exit(1); }
    for (const [name, gate, breakIt, opt] of POISONS) {
      const copy = load();
      breakIt(copy);
      const got = run(copy, opt);
      if (!got.some((f) => f.startsWith(gate + ' '))) { console.log('POISON NOT CAUGHT  ' + name + ' (' + gate + ')'); process.exit(1); }
    }
    console.log('curriculum pages: ' + POISONS.length + ' poisons, each caught by its gate');
  }
  console.log('curriculum pages: ' + pages + ' page(s) in ' + Object.keys(d).length + ' language(s); all gates pass');
}
module.exports = { run, load };
