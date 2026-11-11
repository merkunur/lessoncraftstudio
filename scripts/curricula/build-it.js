#!/usr/bin/env node
/**
 * The Italian registry (Daily Teaching System, Part 2): the Indicazioni nazionali per il curricolo della scuola
 * dell'infanzia e del primo ciclo d'istruzione (D.M. 254/2012) — the learning objectives of the scuola primaria at
 * the end of class 3 and at the end of class 5, for italiano, matematica, scienze, storia, geografia, arte e
 * immagine and tecnologia.
 *
 *   node scripts/curricula/build-it.js            → frontend/content/curricula/it/framework.json (+ crosswalk.json when
 *                                                   crosswalk-authored.json exists)
 *   node scripts/curricula/build-it.js --check | --list
 *
 * Nothing is written from memory: the wording is read from the Ministry's own PDF (fetched into out/curricula/it/).
 *
 *   MATEMATICA / Obiettivi di apprendimento al termine della classe terza della scuola primaria
 *   Numeri                                                        the nucleus (kept as `domain`)
 *   – Contare oggetti o eventi, a voce e mentalmente, …           → node MAT.3.1 (kind standard, years 1-3)
 *
 * The Indicazioni number nothing: the ids are this registry's (discipline, the class the objectives are set for,
 * place). The objectives describe the END of class 3 (years 1-3) and of class 5 (years 4-5): nothing is placed in a
 * single year.
 *
 * WHICH TEXT. A new text (D.M. 221 of 9 December 2025, Gazzetta Ufficiale of 27 January 2026) replaces this one class
 * by class from 2026/27, beginning with the scuola dell'infanzia and the first class. In 2026/27 classes 2 to 5 still
 * work to the 2012 text, which is why it is the one read here; the registry is to be rebuilt on the new text as it
 * reaches classes 2 and 3 (see the README).
 *
 * Checks: every discipline read holds objectives for the class it should; every objective opens with a capital and
 * ends as a sentence; every objective begins as a printed line of a second reading of the PDF.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { REPO, sha256, crosswalkFromAuthored, writeRegistry, fetchRaw, flat } = require('./lib.js');
const REG = 'it';
const ACCESSED = '2026-11-11';
const URL = 'https://www.mim.gov.it/documents/20182/51310/DM+254_2012.pdf';
const FILE = 'indicazioni-2012.pdf';
const DIR = path.join(REPO, 'out', 'curricula', REG);
const DISCIPLINES = [
  { head: 'ITALIANO', letter: 'ITA', key: 'indicazioni-2012-italiano', subject: 'ela', bands: ['3', '5'] },
  { head: 'STORIA', letter: 'STO', key: 'indicazioni-2012-storia', subject: 'social', bands: ['3', '5'] },
  { head: 'GEOGRAFIA', letter: 'GEO', key: 'indicazioni-2012-geografia', subject: 'social', bands: ['3', '5'] },
  { head: 'MATEMATICA', letter: 'MAT', key: 'indicazioni-2012-matematica', subject: 'math', bands: ['3', '5'] },
  { head: 'SCIENZE', letter: 'SCI', key: 'indicazioni-2012-scienze', subject: 'science', bands: ['3', '5'] },
  { head: 'ARTE E IMMAGINE', letter: 'ART', key: 'indicazioni-2012-arte-e-immagine', subject: 'arts', bands: ['5'] },
  { head: 'TECNOLOGIA', letter: 'TEC', key: 'indicazioni-2012-tecnologia', subject: 'science', bands: ['5'] },
];
function sources() {
  const words = path.join(DIR, FILE.replace(/\.pdf$/, '.words.json'));
  let ok = fs.existsSync(words);
  if (ok) { const first = JSON.parse(fs.readFileSync(words, 'utf8')).pages.find((p) => p.words.length); ok = !!first && first.words[0].length >= 7; }
  if (!ok) require('child_process').execFileSync('python', ['-I', path.join(__dirname, 'pdf-words.py'), path.join(DIR, FILE), words], { stdio: 'ignore' });
  const plain = path.join(DIR, FILE.replace(/\.pdf$/, '.txt'));
  if (!fs.existsSync(plain)) require('child_process').execFileSync('python', ['-I', '-c', 'import pymupdf,sys\nd=pymupdf.open(sys.argv[1])\nopen(sys.argv[2],"w",encoding="utf-8").write("\\n".join(p.get_text() for p in d))', path.join(DIR, FILE), plain], { stdio: 'ignore' });
  return { pages: JSON.parse(fs.readFileSync(words, 'utf8')).pages, plain: fs.readFileSync(plain, 'utf8') };
}
function rowsOf(p) {
  const rows = [];
  let row = null;
  for (const w of p.words.slice().sort((a, b) => a[1] - b[1] || a[0] - b[0])) {
    if (!row || Math.abs(w[1] - row.y) > 4) { row = { y: w[1], words: [] }; rows.push(row); }
    row.words.push(w);
  }
  for (const r of rows) { r.words.sort((a, b) => a[0] - b[0]); r.text = r.words.map((w) => w[4]).join(' '); }
  return rows;
}
const join = (lines) => lines.map((s) => s.trim()).join('\n').replace(/([a-zàèéìòù])-\n([a-zàèéìòù])/g, '$1$2').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

(async () => {
  const frameworks = [], nodes = [], problems = [];
  const buf = await fetchRaw(REG, FILE, URL);
  const { pages, plain } = sources();
  const front = pages[0].words.map((w) => w[4]).join(' ');
  if (!/Indicazioni nazionali per il curricolo/.test(front) || !/2012/.test(front)) problems.push('the PDF\'s first page does not name the Indicazioni nazionali of 2012');
  let disc = null, band = null, nucleus = null, cur = null;
  const counts = {};
  for (const p of pages) {
    for (const r of rowsOf(p)) {
      if (r.y > p.height - 45 || /^\d{1,3}$/.test(r.text)) continue;   // the page number
      const first = r.words[0], allBold = r.words.every((w) => w[5]);
      if (allBold && first[0] < 62 && first[6] < 10.5 && r.text === r.text.toUpperCase() && /[A-Z]{4}/.test(r.text)) { disc = DISCIPLINES.find((d) => d.head === r.text) || null; band = null; nucleus = null; cur = null; continue; }
      if (allBold && first[6] >= 10.5) {
        const m = /^Obiettivi di apprendimento al termine della classe (terza|quinta) (?:della|di) scuola primaria$/.exec(r.text);
        band = m ? (m[1] === 'terza' ? '3' : '5') : null; nucleus = null; cur = null;
        continue;
      }
      if (!disc || !band) continue;
      if (first[4] === '–' || first[4] === '-') {
        const k = disc.letter + '.' + band;
        cur = { id: k + '.' + (counts[k] = (counts[k] || 0) + 1), f: disc.key, kind: 'standard', grade: band === '3' ? '1-3' : '4-5', parent: k, domain: nucleus || undefined, text: '', _lines: [r.words.slice(1).map((w) => w[4]).join(' ')] };
        nodes.push(cur);
        continue;
      }
      if (first[0] > 85 && cur) { cur._lines.push(r.text); continue; }   // an objective's next line stands indented
      // a line at the margin that is not an objective names the nucleus the next objectives stand under
      nucleus = r.text; cur = null;
    }
  }
  for (const n of nodes) { n.text = join(n._lines); delete n._lines; }
  const plainFlat = flat(plain);
  const all = [];
  for (const d of DISCIPLINES) {
    const hashes = sha256(buf);
    let read = 0;
    for (const b of d.bands) {
      const mine = nodes.filter((n) => n.parent === d.letter + '.' + b);
      if (!mine.length) problems.push(d.key + ': no objective read for the end of class ' + b);
      all.push({ id: d.letter + '.' + b, f: d.key, kind: 'area', grade: b === '3' ? '1-3' : '4-5', text: d.head.charAt(0) + d.head.slice(1).toLowerCase() + ' — obiettivi di apprendimento al termine della classe ' + (b === '3' ? 'terza' : 'quinta') + ' della scuola primaria' }, ...mine);
      read += mine.length;
    }
    frameworks.push({ key: d.key, short: 'Indicazioni nazionali', subject: d.subject, title: 'Indicazioni nazionali per il curricolo della scuola dell’infanzia e del primo ciclo d’istruzione (2012): ' + d.head.charAt(0) + d.head.slice(1).toLowerCase(), publisher: 'Ministero dell’Istruzione, dell’Università e della Ricerca', year: '2012', officialDocument: URL, readFrom: URL, accessed: ACCESSED, sha256: hashes,
      version: 'D.M. 16 novembre 2012, n. 254; in 2026/27 still the text for classes 2 to 5 (a new text, D.M. 221/2025, replaces it class by class from the first class)', band: 'the objectives describe the end of class 3 (years 1-3) and the end of class 5 (years 4-5)', ids: 'this registry\'s own (the Indicazioni number nothing): discipline, class, place; `domain` is the nucleus the objective stands under',
      citation: 'Indicazioni nazionali per il curricolo della scuola dell’infanzia e del primo ciclo d’istruzione. D.M. 254/2012. Ministero dell’Istruzione, dell’Università e della Ricerca.', checkedAgainstPdf: read + ' objectives read; each begins as a printed line of a second reading of the PDF' });
  }
  const stds = all.filter((n) => n.kind === 'standard');
  const notFound = stds.filter((n) => !plainFlat.includes(flat(n.text).slice(0, 20))).map((n) => n.id);
  if (notFound.length) problems.push(notFound.length + ' objective(s) do not begin as any line of a second reading: ' + notFound.slice(0, 15).join(', '));
  for (const n of stds) { if (!/^[A-ZÈÉÀ(]/.test(n.text)) problems.push(n.id + ': an objective that does not open with a capital: "' + n.text.slice(0, 50) + '"'); if (!/[.;)]$/.test(n.text)) problems.push(n.id + ': an objective that does not end as a sentence: "…' + n.text.slice(-40) + '"'); if (n.domain && n.domain.length > 90) problems.push(n.id + ': its nucleus is a whole line of prose: "' + n.domain.slice(0, 60) + '"'); }
  const seen = new Set();
  for (const n of all) { if (seen.has(n.id)) problems.push('two nodes share the id ' + n.id); seen.add(n.id); }
  if (process.argv.includes('--list')) for (const n of all) console.log((n.kind === 'area' ? '' : '    ') + n.id + ' [' + n.grade + ']  ' + (n.domain ? '(' + n.domain + ') ' : '') + n.text);
  const cw = crosswalkFromAuthored(REG, all);
  problems.push(...cw.problems);
  for (const m of problems.slice(0, 50)) console.log('FAIL  ' + m);
  const framework = { $comment: 'GENERATED by scripts/curricula/build-it.js from the Ministry\'s PDF of the Indicazioni nazionali of 2012 (named under `frameworks`). The wording of every node is the document\'s own; it is stored for reference and is never shown to a visitor as a quotation. The ids are this registry\'s. Do not edit by hand.', locale: 'it', country: 'IT', frameworks, nodes: all };
  const crosswalk = cw.rows ? { $comment: 'GENERATED by scripts/curricula/build-it.js from crosswalk-authored.json (written from the official text by reviewers who teach in an Italian scuola primaria): every teaching point → the objectives it teaches, prepares or extends. The objectives describe the end of class 3 or 5; they place nothing in a single year.', locale: 'it', points: cw.rows } : null;
  let diff = 0;
  if (!problems.length) diff = writeRegistry(REG, framework, crosswalk, process.argv.includes('--check'));
  const by = {};
  for (const n of all) by[n.f + ' ' + n.kind] = (by[n.f + ' ' + n.kind] || 0) + 1;
  console.log('it framework: ' + all.length + ' nodes (' + Object.entries(by).map(([k, v]) => k + ' ' + v).join(', ') + ')');
  console.log(cw.rows ? 'it crosswalk: ' + cw.authored + ' points mapped, ' + cw.none + ' with no counterpart' : 'it: no crosswalk yet');
  if (problems.length || diff) { console.log((problems.length + diff) + ' problem(s)'); process.exit(1); }
})().catch((e) => { console.error(e.stack || e.message); process.exit(1); });
