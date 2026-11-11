#!/usr/bin/env node
/**
 * The Saxon layer of the German registry (Daily Teaching System, Part 2): the Lehrpläne Grundschule of the Freistaat
 * Sachsen for Deutsch, Mathematik and Sachunterricht.
 *
 *   node scripts/curricula/build-de-sn.js            → frontend/content/curricula/de-sn/framework.json (+ crosswalk.json
 *                                                      when crosswalk-authored.json exists)
 *   node scripts/curricula/build-de-sn.js --check | --list
 *
 * Nothing is written from memory: the wording is read from the three official PDFs of the Lehrplandatenbank
 * (schulportal.sachsen.de/lplandb, fetched into out/curricula/de-sn/). Saxony plans by Klassenstufen 1/2, 3 and 4;
 * each has Lernbereiche, and a Lernbereich is a table: the binding goals and contents on the left, remarks on the
 * right. Only the left column is the plan's requirement; the remarks are not read.
 *
 *   Lernbereich 2: Zahl und Operation                              → node MA.1-2.2      (kind area)
 *   **Beherrschen** von Zahldarstellungen im Zahlenraum bis 100    → node MA.1-2.2.1    (kind standard: a goal opens
 *                                                                    with its level of demand in bold)
 *   - Erfassen und Nutzen von grundlegenden Zahlaspekten           → node MA.1-2.2.1.2  (kind component)
 *       · Kardinalzahl  · Ordinalzahl                                 (kept inside the component's wording)
 *
 * "Lernbereich 2" is the plan's own number; the numbers of a goal and of a dash line are this registry's, in the
 * order of the document. The Wahlbereiche (optional) are not read.
 *
 * The left column is told from the right by where each word stands on the page (scripts/curricula/pdf-words.py,
 * Python with PyMuPDF). Check: every goal and every dash line begins as a printed line of pdftotext's reading of the
 * same PDF; every goal opens with a word set in bold; every Klassenstufe has its Lernbereiche numbered without a gap.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { REPO, sha256, crosswalkFromAuthored, writeRegistry, fetchRaw, flat } = require('./lib.js');
const REG = 'de-sn';
const ACCESSED = '2026-11-11';
const BASE = 'https://www.schulportal.sachsen.de/lplandb/lehrplan/file/';
const DOCS = [
  { key: 'lp-sn-deutsch', letter: 'DE', subject: 'ela', file: 'lp_deutsch.pdf', remote: '908/1tblk6cNNahu0dAWKRuO', title: 'Lehrplan Grundschule Deutsch' },
  { key: 'lp-sn-mathematik', letter: 'MA', subject: 'math', file: 'lp_mathematik.pdf', remote: '912/Mpk0iAibe4ONjV3PndYR', title: 'Lehrplan Grundschule Mathematik' },
  { key: 'lp-sn-sachunterricht', letter: 'SU', subject: 'science-social', file: 'lp_sachunterricht.pdf', remote: '80/2DYw4je6s74vCaxRHqx6', title: 'Lehrplan Grundschule Sachunterricht' },
];
const DIR = path.join(REPO, 'out', 'curricula', REG);
/** the levels of demand every Saxon plan defines in its chapter "Ziele und Aufgaben": a goal opens with one of them */
const LEVEL = /^(?:Einblick gewinnen|Kennen|Übertragen|Beherrschen|Anwenden|Beurteilen|Sich positionieren|Gestalten|Problemlösen)(?=[\s\/]|$)/;

function sources(file) {
  const words = path.join(DIR, file.replace(/\.pdf$/, '.words.json'));
  if (!fs.existsSync(words)) require('child_process').execFileSync('python', ['-I', path.join(__dirname, 'pdf-words.py'), path.join(DIR, file), words], { stdio: 'ignore' });
  const plain = path.join(DIR, file.replace(/\.pdf$/, '.txt'));
  if (!fs.existsSync(plain)) require('child_process').execFileSync('pdftotext', ['-enc', 'UTF-8', path.join(DIR, file), plain], { stdio: 'ignore' });
  return { pages: JSON.parse(fs.readFileSync(words, 'utf8')).pages, plain: fs.readFileSync(plain, 'utf8').replace(/\r\n/g, '\n') };
}

/** the printed lines of a page, top to bottom: { y, words sorted by x } */
function rowsOf(p) {
  const rows = [];
  let row = null;
  for (const w of p.words.slice().sort((a, b) => a[1] - b[1] || a[0] - b[0])) {
    if (!row || Math.abs(w[1] - row.y) > 3) { row = { y: w[1], words: [] }; rows.push(row); }
    row.words.push(w);
  }
  for (const r of rows) { r.words.sort((a, b) => a[0] - b[0]); r.text = r.words.map((w) => w[4]).join(' '); }
  return rows;
}

function parse(doc, pages) {
  const nodes = [], problems = [];
  let grade = null, area = null, goal = null, cur = null, goalNo = 0, compNo = 0, inLb = false, lbNo = 0;
  let done = false;
  for (const p of pages) {
    if (done) break;
    const rows = rowsOf(p);
    // the running head names the Klassenstufe of the page
    const head = rows.filter((r) => r.y < 52).map((r) => r.text).join(' ');
    const g = /Klassenstufen? (1\/2|3|4)\b/.exec(head);
    // (the Sachunterricht plan prints it on every second page only: a page without it stays in the Klassenstufe before)
    const pageGrade = g ? (g[1] === '1/2' ? '1-2' : g[1]) : grade;
    if (pageGrade !== grade) { grade = pageGrade; inLb = false; cur = null; lbNo = 0; }
    if (!grade) continue;
    const body = rows.filter((r) => r.y >= 52 && r.y < p.height - 55);
    if (!body.length) continue;
    const xL = Math.min(...body.map((r) => r.words[0][0]));
    const border = xL + 226;   // the remarks begin about 241 points right of the left margin
    for (const r of body) {
      const first = r.words[0];
      const boldLine = r.words.filter((w) => w[0] < border).every((w) => w[5]) && first[5];
      // a new Klassenstufe opens with its own title in the page's body
      const kl = boldLine && /^Klassenstufen? (1\/2|3|4)$/.exec(r.text);
      if (kl) { const ng = kl[1] === '1/2' ? '1-2' : kl[1]; if (ng !== grade) { grade = ng; lbNo = 0; } inLb = false; cur = null; continue; }
      // "Lernbereich 2: Zahl und Operation   25 Ustd." (Mathematik, Sachunterricht) or "Lernbereich: Schreiben"
      // (Deutsch, which does not number them: the number is then the place in the Klassenstufe)
      const lb = boldLine && /^Lernbereich(?: (\d+))?: (.+?)(?: \d+ Ustd\.?)?$/.exec(r.words.filter((w) => w[5]).map((w) => w[4]).join(' '));
      if (lb) {
        lbNo = lb[1] ? Number(lb[1]) : lbNo + 1;
        area = { id: doc.letter + '.' + grade + '.' + lbNo, f: doc.key, kind: 'area', grade, label: 'Kl. ' + grade.replace('-', '/') + (lb[1] ? ', LB ' + lb[1] : ''), text: lb[2] };
        if (nodes.some((n) => n.id === area.id)) { problems.push(doc.key + ': Lernbereich ' + lbNo + ' of Klassenstufe ' + grade + ' is read twice (page ' + p.n + ')'); inLb = false; continue; }
        nodes.push(area); inLb = true; goal = cur = null; goalNo = 0;
        continue;
      }
      // what ends a Lernbereich without opening one: the optional parts; the note on the Leitidee "Muster, Strukturen
      // und funktionaler Zusammenhang" (Mathematik: "bildet keinen eigenständigen Lernbereich"); the appendix, which
      // ends the plan
      if (boldLine && /^(Anhang|Anlage)\b/.test(r.text)) { done = true; break; }
      if (boldLine && /^(Wahlbereich|Wahlpflicht|Lernbereich|Leitidee)/.test(r.text)) { inLb = false; cur = null; continue; }
      if (!inLb) continue;
      const left = r.words.filter((w) => w[0] < border);
      if (!left.length) continue;
      const text = left.map((w) => w[4]).join(' ');
      const atMargin = left[0][0] < xL + 8;
      // A goal opens with its level of demand, one of the plan's fixed terms. The plans of 2025 print it in bold;
      // the Sachunterricht plan of 2019 does not, so the term itself is what is looked for there.
      const level = (LEVEL.exec(text) || [])[0];
      if (atMargin && left[0][4] !== '-' && (left[0][5] || level)) {
        if (!level) problems.push(doc.key + ' ' + area.id + ' (page ' + p.n + '): a goal that opens with none of the plan\'s levels of demand: "' + text.slice(0, 50) + '"');
        goal = { id: area.id + '.' + (++goalNo), f: doc.key, kind: 'standard', grade, parent: area.id, level: level || undefined, text: '', _lines: [text] };
        nodes.push(goal); cur = goal; compNo = 0;
      } else if (atMargin && (left[0][4] === '-' || left[0][4] === '–')) {
        if (!goal) { problems.push(doc.key + ' ' + area.id + ' (page ' + p.n + '): a dash line before any goal: "' + text.slice(0, 50) + '"'); continue; }
        cur = { id: goal.id + '.' + (++compNo), f: doc.key, kind: 'component', grade, parent: goal.id, text: '', _lines: [left.slice(1).map((w) => w[4]).join(' ')] };
        nodes.push(cur);
      } else if (cur) cur._lines.push(text);
      else problems.push(doc.key + ' ' + area.id + ' (page ' + p.n + '): a line before any goal: "' + text.slice(0, 50) + '"');
    }
  }
  for (const n of nodes) if (n._lines) {
    n.text = n._lines.map((s) => s.trim()).join('\n').replace(/([a-zäöüß])-\n([a-zäöüß])/g, '$1$2').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    delete n._lines;
  }
  return { nodes, problems };
}

(async () => {
  const frameworks = [], nodes = [], problems = [];
  for (const doc of DOCS) {
    const buf = await fetchRaw(REG, doc.file, BASE + doc.remote);
    const { pages, plain } = sources(doc.file);
    const r = parse(doc, pages);
    problems.push(...r.problems);
    const read = r.nodes.filter((n) => n.kind !== 'area');
    const plainFlat = flat(plain);
    const notFound = read.filter((n) => !plainFlat.includes(flat(n.text).slice(0, 20))).map((n) => n.id);
    if (notFound.length) problems.push(doc.key + ': ' + notFound.length + ' line(s) do not begin as any line of the plain reading: ' + notFound.slice(0, 20).join(', '));
    for (const n of read) if (n.text.length < 4) problems.push(n.id + ': wording too short: "' + n.text + '"');
    // every Klassenstufe has its Lernbereiche numbered 1, 2, 3 … without a gap, and each holds a goal
    for (const g of ['1-2', '3', '4']) {
      const lbs = r.nodes.filter((n) => n.kind === 'area' && n.grade === g).map((n) => Number(n.id.split('.').pop()));
      if (!lbs.length) problems.push(doc.key + ': no Lernbereich read for Klassenstufe ' + g);
      lbs.forEach((n, i) => { if (n !== i + 1) problems.push(doc.key + ': the Lernbereiche of Klassenstufe ' + g + ' run ' + lbs.join(' ')); });
    }
    for (const a of r.nodes.filter((n) => n.kind === 'area')) if (!r.nodes.some((n) => n.parent === a.id)) problems.push(a.id + ' ("' + a.text + '"): no goal read under it');
    const version = (plain.split('\n').map((l) => l.trim()).filter(Boolean)[2] || '');
    if (!/^\d{4}(\/\d{4})*$/.test(version)) problems.push(doc.key + ': the title page does not give the years of the plan as expected ("' + version + '")');
    frameworks.push({ key: doc.key, short: 'Lehrplan Sachsen', subject: doc.subject, title: doc.title, publisher: 'Sächsisches Staatsministerium für Kultus', year: version.split('/').pop(), officialDocument: BASE + doc.remote, readFrom: BASE + doc.remote, accessed: ACCESSED, sha256: sha256(buf),
      version: doc.title + ' ' + version, band: 'Klassenstufen 1/2 (one band), 3 and 4', ids: 'the Lernbereich number is the plan\'s own (shown as `label`); the numbers of a goal and of a dash line are this registry\'s; the remarks column and the Wahlbereiche are not read',
      citation: doc.title + ' ' + version + '. Sächsisches Staatsministerium für Kultus. www.schulportal.sachsen.de/lplandb', checkedAgainstPdf: read.length + ' goals and dash lines read from the left column; each begins as a printed line of a second reading of the PDF' });
    nodes.push(...r.nodes);
  }
  const seen = new Set();
  for (const n of nodes) { if (seen.has(n.id)) problems.push('two nodes share the id ' + n.id); seen.add(n.id); }
  if (process.argv.includes('--list')) for (const n of nodes) console.log((n.kind === 'component' ? '    ' : n.kind === 'standard' ? '  ' : '') + n.id + '  ' + n.text);
  const cw = crosswalkFromAuthored(REG, nodes);
  problems.push(...cw.problems);
  for (const m of problems.slice(0, 60)) console.log('FAIL  ' + m);
  const framework = { $comment: 'GENERATED by scripts/curricula/build-de-sn.js from the official PDFs named under `frameworks`. The wording of every node is the plan\'s own; it is stored for reference and is never shown to a visitor as a quotation. Do not edit by hand.', locale: 'de', country: 'DE', state: 'SN', frameworks, nodes };
  const crosswalk = cw.rows ? { $comment: 'GENERATED by scripts/curricula/build-de-sn.js from crosswalk-authored.json (written from the official text by reviewers who teach in a Saxon Grundschule): every teaching point → the goals it teaches, prepares or extends, with the Klassenstufe of each.', locale: 'de', state: 'SN', points: cw.rows } : null;
  let diff = 0;
  if (!problems.length) diff = writeRegistry(REG, framework, crosswalk, process.argv.includes('--check'));
  const by = {};
  for (const n of nodes) by[n.f + ' ' + n.kind] = (by[n.f + ' ' + n.kind] || 0) + 1;
  console.log('de-sn framework: ' + nodes.length + ' nodes (' + Object.entries(by).map(([k, v]) => k + ' ' + v).join(', ') + ')');
  for (const f of frameworks) console.log('  ' + f.key + ': ' + f.checkedAgainstPdf + ' — ' + f.version);
  console.log(cw.rows ? 'de-sn crosswalk: ' + cw.authored + ' points mapped, ' + cw.none + ' with no counterpart' : 'de-sn: no crosswalk yet');
  if (problems.length || diff) { console.log((problems.length + diff) + ' problem(s)'); process.exit(1); }
})().catch((e) => { console.error(e.message); process.exit(1); });
