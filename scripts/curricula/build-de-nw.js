#!/usr/bin/env node
/**
 * The North Rhine-Westphalian layer of the German registry (Daily Teaching System, Part 2): the Lehrpläne für die
 * Primarstufe in Nordrhein-Westfalen (2021) for Deutsch, Mathematik and Sachunterricht.
 *
 *   node scripts/curricula/build-de-nw.js            → frontend/content/curricula/de-nw/framework.json (+ crosswalk.json
 *                                                      when crosswalk-authored.json exists)
 *   node scripts/curricula/build-de-nw.js --check | --list
 *
 * Nothing is written from memory: the wording is read from the three official PDFs of lehrplannavigator.nrw.de
 * (fetched into out/curricula/de-nw/). The chapter "Kompetenzerwartungen" is a run of tables:
 *
 *   Zahlen und Operationen                                   the Bereich        → node M.1       (kind area)
 *   Zahlverständnis                                          the Schwerpunkt    → node M.1.1     (kind subarea)
 *   | … am Ende der Schuleingangsphase | … am Ende der Klasse 4 |
 *   | • zählen im Zahlenraum bis 100 … | • zählen … bis 1.000.000 |   → M.1.1.s1 (band 1-2) and M.1.1.k1 (band 3-4)
 *   | • beschreiben Beziehungen zwischen Zahlen … (one cell across both columns) |  → M.1.1.g1 (band 1-4)
 *
 * An expectation printed across both columns is not split by the plan between the two stages (Mathematik: to be
 * reached by the end of the Schuleingangsphase and deepened in 3 and 4; Deutsch and Sachunterricht: begun in the
 * Schuleingangsphase, widened in 3 and 4): it carries the band "1-4".
 * The plan numbers nothing below its chapters: the ids are this registry's, in the order of the document.
 *
 * A table of two columns cannot be read safely from a PDF's text alone (the columns stand at other places on other
 * pages). The builder therefore reads every word WITH ITS PLACE ON THE PAGE (scripts/curricula/pdf-words.py, which
 * needs Python with PyMuPDF): a word belongs to the right column when it stands at or right of that column's bullets
 * on its page; titles are the lines set in bold. Checks: the number of bullets in the chapter equals the number of
 * expectations read, and every expectation begins as a printed line of pdftotext's reading of the same PDF.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { REPO, sha256, crosswalkFromAuthored, writeRegistry, fetchRaw, flat } = require('./lib.js');
const REG = 'de-nw';
const ACCESSED = '2026-11-11';
const BASE = 'https://lehrplannavigator.nrw.de/system/files/media/document/file/';
const DOCS = [
  { key: 'lp-nrw-deutsch', letter: 'D', subject: 'ela', file: 'ps_lp_d.pdf', remote: 'ps_lp_d_einzeldatei_2021_08_02.pdf', title: 'Lehrplan Deutsch für die Primarstufe in Nordrhein-Westfalen', start: /^2\.2 Kompetenzerwartungen$/, stop: /^Unterrichtsrelevante Begriffe$/ },
  { key: 'lp-nrw-mathematik', letter: 'M', subject: 'math', file: 'ps_lp_m.pdf', remote: 'ps_lp_m_einzeldatei_2021_08_02.pdf', title: 'Lehrplan Mathematik für die Primarstufe in Nordrhein-Westfalen', start: /^2\.3\.2 Kompetenzerwartungen und inhaltliche Schwerpunkte$/ },
  { key: 'lp-nrw-sachunterricht', letter: 'SU', subject: 'science-social', file: 'ps_lp_su.pdf', remote: 'ps_lp_su_einzeldatei_2021_08_02.pdf', title: 'Lehrplan Sachunterricht für die Primarstufe in Nordrhein-Westfalen', start: /^2\.2 Kompetenzerwartungen$/ },
];
const STOP = /^3 Leistungen fördern und bewerten$/;
const BULLET = '';
const HEAD = 'Die Schülerinnen und Schüler';
const PHRASES = ['Kompetenzerwartungen am Ende', 'der Schuleingangsphase', 'der Klasse 4'];
const DIR = path.join(REPO, 'out', 'curricula', REG);

/** the PDF's words with their places (made once by pdf-words.py) and its plain text (pdftotext) */
function sources(file) {
  const words = path.join(DIR, file.replace(/\.pdf$/, '.words.json'));
  if (!fs.existsSync(words)) require('child_process').execFileSync('python', ['-I', path.join(__dirname, 'pdf-words.py'), path.join(DIR, file), words], { stdio: 'ignore' });
  const plain = path.join(DIR, file.replace(/\.pdf$/, '.txt'));
  if (!fs.existsSync(plain)) require('child_process').execFileSync('pdftotext', ['-enc', 'UTF-8', path.join(DIR, file), plain], { stdio: 'ignore' });
  return { pages: JSON.parse(fs.readFileSync(words, 'utf8')).pages, plain: fs.readFileSync(plain, 'utf8').replace(/\r\n/g, '\n') };
}

/** the printed lines of the document in reading order: { page, y, words: [[x0, y0, x1, y1, text, bold]] sorted by x } */
function rowsOf(pages) {
  const rows = [];
  for (const p of pages) {
    const ws = p.words.slice().sort((a, b) => a[1] - b[1] || a[0] - b[0]);
    let row = null;
    for (const w of ws) {
      if (!row || Math.abs(w[1] - row.y) > 3) { row = { page: p.n, width: p.width, y: w[1], words: [] }; rows.push(row); }
      row.words.push(w);
    }
  }
  for (const r of rows) { r.words.sort((a, b) => a[0] - b[0]); r.text = r.words.map((w) => w[4]).join(' '); }
  return rows;
}

function parse(doc, pages) {
  const nodes = [], problems = [];
  const all = rowsOf(pages);
  let from = -1;
  all.forEach((r, i) => { if (doc.start.test(r.text)) from = i; });   // the last one: the table of contents names it too
  let to = -1;
  all.forEach((r, i) => { if (i > from && to < 0 && (STOP.test(r.text) || (doc.stop && doc.stop.test(r.text)))) to = i; });
  if (from < 0 || to < 0) return { nodes, problems: [doc.key + ': the chapter of expectations was not found'], bullets: 0 };
  const rows = all.slice(from + 1, to).filter((r) => !/^\d{1,3}$/.test(r.text));   // not the page numbers
  const bullets = rows.reduce((n, r) => n + r.words.filter((w) => w[4].includes(BULLET)).length, 0);
  // where the right column stands on each page: at its bullets; a page without a right bullet takes the left
  // bullets' place plus the distance between the two columns measured on the other pages
  const leftX = new Map(), rightX = new Map();
  for (const r of rows) for (const w of r.words) if (w[4].includes(BULLET)) { const m = w[0] < r.width * 0.35 ? leftX : rightX; m.set(r.page, Math.min(m.has(r.page) ? m.get(r.page) : Infinity, w[0])); }
  const dists = [...rightX.keys()].filter((p) => leftX.has(p)).map((p) => rightX.get(p) - leftX.get(p)).sort((a, b) => a - b);
  const dist = dists.length ? dists[Math.floor(dists.length / 2)] : null;
  const border = (r) => (rightX.has(r.page) ? rightX.get(r.page) : leftX.has(r.page) && dist ? leftX.get(r.page) + dist : null);

  let area = null, areaNo = 0, sub = null, subNo = 0, inTable = false, pending = [], hdr = null;
  let open = { s: null, k: null, g: null }, last = null;   // the expectation each column is still writing; the one touched last
  const counts = {};
  const openSub = (r) => {
    // the last title names the Schwerpunkt and, when there are two, the one before it the Bereich
    const titles = hdr.titles.slice(-2);
    if (!titles.length) problems.push(doc.key + ': a table without a title before it (page ' + r.page + ')');
    if (!area || (titles.length === 2 && titles[0] !== area.text)) { area = { id: doc.letter + '.' + (++areaNo), f: doc.key, kind: 'area', grade: '1-4', text: titles.length === 2 ? titles[0] : (titles[0] || '?') }; nodes.push(area); subNo = 0; }
    sub = { id: area.id + '.' + (++subNo), f: doc.key, kind: 'subarea', grade: '1-4', parent: area.id, text: titles[titles.length - 1] || area.text };
    nodes.push(sub);
    for (const c of ['s', 'k', 'g']) counts[c] = 0;
  };
  const start = (col, text, r) => {
    if (!sub) openSub(r);
    const n = (counts[col] = (counts[col] || 0) + 1);
    const node = { id: sub.id + '.' + col + n, f: doc.key, kind: 'standard', grade: col === 's' ? '1-2' : col === 'k' ? '3-4' : '1-4', parent: sub.id, text: '', _lines: [text] };
    nodes.push(node);
    open[col] = node; last = node;
    if (col === 'g') { open.s = null; open.k = null; } else open.g = null;
  };
  const more = (col, text, r) => { if (!open[col]) { problems.push(doc.key + ' ' + (sub ? sub.id : '?') + ' (page ' + r.page + '): a continuation line with no expectation open in its column: "' + text.slice(0, 50) + '"'); return; } open[col]._lines.push(text); last = open[col]; };
  const cell = (col, words, r) => {
    if (!words.length) return;
    const text = words.map((w) => w[4]).join(' ');
    if (text.includes(BULLET)) {
      const parts = text.split(BULLET);
      if (parts[0].trim()) more(col, parts[0].trim(), r);
      for (const p of parts.slice(1)) start(col, p.trim(), r);
    } else more(col, text, r);
  };

  for (const r of rows) {
    let words = r.words;
    const allBold = words.every((w) => w[5]);
    if (r.text.includes(PHRASES[0]) && !hdr) {
      // a table opens; a title printed on the header's own line (to its left, in bold) belongs to it
      hdr = { heads: 0, titles: pending.slice() };
      pending = []; inTable = true; open = { s: null, k: null, g: null }; last = null; sub = null;
    }
    if (hdr) {
      const bold = words.filter((w) => w[5]);
      if (bold.length && !bold.some((w) => w[4].includes(BULLET))) { hdr.titles.push(bold.map((w) => w[4]).join(' ')); words = words.filter((w) => !w[5]); }
      // the header's own phrases are taken out, wherever on the line they stand
      let text = words.map((w) => w[4]).join(' ');
      const drop = new Set();
      for (const p of PHRASES.concat([HEAD])) {
        const pw = p.split(' ');
        for (let i = 0; i + pw.length <= words.length; i++) if (pw.every((x, j) => words[i + j][4] === x && !drop.has(i + j))) { for (let j = 0; j < pw.length; j++) drop.add(i + j); if (p === HEAD) hdr.heads++; }
      }
      words = words.filter((_, i) => !drop.has(i));
      text = words.map((w) => w[4]).join(' ');
      if (hdr.heads >= 2) { if (!sub) openSub(r); hdr = null; }
      if (!text.trim()) continue;
    } else if (allBold && !r.text.includes(BULLET)) {
      // a line in bold is a title: it ends the table before it
      inTable = false; pending.push(r.text);
      continue;
    }
    if (!inTable) { pending = []; continue; }   // a paragraph between the tables
    const x = border(r);
    if (x === null) { problems.push(doc.key + ' (page ' + r.page + '): a table line on a page where no column could be placed: "' + r.text.slice(0, 50) + '"'); continue; }
    const left = words.filter((w) => w[0] < x - 2), right = words.filter((w) => w[0] >= x - 2);
    const crosses = left.length > 0 && left[left.length - 1][2] > x + 8;   // a word that begins left of the border and ends well right of it
    if (crosses || (left.length && right.length && !right[0][4].includes(BULLET) && right[0][0] - left[left.length - 1][2] < 12)) {
      // the words run on over the border without a gutter: the line is printed across both columns
      const text = words.map((w) => w[4]).join(' ');
      if (text.includes(BULLET)) { const parts = text.split(BULLET); if (parts[0].trim()) more('g', parts[0].trim(), r); for (const p of parts.slice(1)) start('g', p.trim(), r); }
      else more('g', text, r);
      continue;
    }
    if (left.length && !right.length && !left.some((w) => w[4].includes(BULLET)) && open.g && last === open.g) { more('g', left.map((w) => w[4]).join(' '), r); continue; }   // the short last line of such an expectation
    cell('s', left, r);
    cell('k', right, r);
  }
  for (const n of nodes) if (n._lines) {
    n.text = n._lines.map((s) => s.trim()).join('\n').replace(/([a-zäöüß])-\n([a-zäöüß])/g, '$1$2').replace(/\n/g, ' ').replace(/\s+/g, ' ').replace(/,$/, '').trim();
    delete n._lines;
  }
  return { nodes, problems, bullets };
}

(async () => {
  const frameworks = [], nodes = [], problems = [];
  for (const doc of DOCS) {
    const buf = await fetchRaw(REG, doc.file, BASE + doc.remote);
    const { pages, plain } = sources(doc.file);
    const r = parse(doc, pages);
    problems.push(...r.problems);
    const stds = r.nodes.filter((n) => n.kind === 'standard');
    if (stds.length !== r.bullets) problems.push(doc.key + ': the chapter holds ' + r.bullets + ' bullets, the registry ' + stds.length + ' expectations');
    // pdftotext's plain reading mixes the two columns line by line but keeps each printed line whole: the first
    // printed line of every expectation (its first 20 letters) must be found in it
    const plainFlat = flat(plain);
    const notFound = stds.filter((n) => !plainFlat.includes(flat(n.text).slice(0, 20))).map((n) => n.id);
    if (notFound.length) problems.push(doc.key + ': ' + notFound.length + ' expectation(s) do not begin as any line of the plain reading: ' + notFound.slice(0, 20).join(', '));
    for (const n of stds) { if (n.text.length < 15) problems.push(n.id + ': wording too short to be an expectation: "' + n.text + '"'); if (!/^[a-zäöü(]/.test(n.text)) problems.push(n.id + ': an expectation that does not open with a verb in lower case: "' + n.text.slice(0, 40) + '"'); }
    frameworks.push({ key: doc.key, short: 'Lehrplan NRW', subject: doc.subject, title: doc.title, publisher: 'Ministerium für Schule und Bildung des Landes Nordrhein-Westfalen', year: '2021', officialDocument: BASE + doc.remote, readFrom: BASE + doc.remote, accessed: ACCESSED, sha256: sha256(buf),
      version: 'Lehrpläne für die Primarstufe in Nordrhein-Westfalen, RdErl. vom 01.07.2021, file of 02.08.2021; in force for the children who entered class 1 from 01.08.2022', band: 'two stages: the end of the Schuleingangsphase (classes 1 and 2) and the end of class 4; an expectation printed across both columns carries 1-4',
      ids: 'this registry\'s own (the plan numbers only its chapters): Bereich, Schwerpunkt, then s (Schuleingangsphase), k (Klasse 4) or g (both) with the place in the column',
      citation: doc.title + ' (2021). Ministerium für Schule und Bildung des Landes Nordrhein-Westfalen. lehrplannavigator.nrw.de', checkedAgainstPdf: stds.length + ' expectations read; the chapter\'s ' + r.bullets + ' bullets are all there; each begins as a printed line of a second reading of the PDF' });
    nodes.push(...r.nodes);
  }
  const seen = new Set();
  for (const n of nodes) { if (seen.has(n.id)) problems.push('two nodes share the id ' + n.id); seen.add(n.id); }
  if (process.argv.includes('--list')) for (const n of nodes) console.log((n.kind === 'standard' ? '    ' : n.kind === 'subarea' ? '  ' : '') + n.id + (n.kind === 'standard' ? ' [' + n.grade + ']' : '') + '  ' + n.text);
  const cw = crosswalkFromAuthored(REG, nodes);
  problems.push(...cw.problems);
  for (const m of problems.slice(0, 50)) console.log('FAIL  ' + m);
  const framework = { $comment: 'GENERATED by scripts/curricula/build-de-nw.js from the official PDFs named under `frameworks`. The wording of every node is the plan\'s own; it is stored for reference and is never shown to a visitor as a quotation. The ids are this registry\'s. Do not edit by hand.', locale: 'de', country: 'DE', state: 'NW', frameworks, nodes };
  const crosswalk = cw.rows ? { $comment: 'GENERATED by scripts/curricula/build-de-nw.js from crosswalk-authored.json (written from the official text by reviewers who teach in a Grundschule in Nordrhein-Westfalen): every teaching point → the expectations it teaches, prepares or extends, with the stage of each.', locale: 'de', state: 'NW', points: cw.rows } : null;
  let diff = 0;
  if (!problems.length) diff = writeRegistry(REG, framework, crosswalk, process.argv.includes('--check'));
  const by = {};
  for (const n of nodes) by[n.f + ' ' + n.kind] = (by[n.f + ' ' + n.kind] || 0) + 1;
  console.log('de-nw framework: ' + nodes.length + ' nodes (' + Object.entries(by).map(([k, v]) => k + ' ' + v).join(', ') + ')');
  for (const f of frameworks) console.log('  ' + f.key + ': ' + f.checkedAgainstPdf);
  console.log(cw.rows ? 'de-nw crosswalk: ' + cw.authored + ' points mapped, ' + cw.none + ' with no counterpart' : 'de-nw: no crosswalk yet');
  if (problems.length || diff) { console.log((problems.length + diff) + ' problem(s)'); process.exit(1); }
})().catch((e) => { console.error(e.message); process.exit(1); });
