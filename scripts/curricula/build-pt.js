#!/usr/bin/env node
/**
 * The Brazilian registry (Daily Teaching System, Part 2): the Base Nacional Comum Curricular (BNCC) — the learning
 * objectives of the pré-escola (Educação Infantil, crianças pequenas) and the habilidades of the Ensino Fundamental,
 * anos iniciais (1º to 5º ano), for Língua Portuguesa, Matemática, Ciências, Geografia, História and Arte.
 *
 *   node scripts/curricula/build-pt.js            → frontend/content/curricula/pt/framework.json (+ crosswalk.json when
 *                                                   crosswalk-authored.json exists)
 *   node scripts/curricula/build-pt.js --check | --list
 *
 * Nothing is written from memory: the wording is read from the Ministry's own PDF of the BNCC (fetched into
 * out/curricula/pt/). Every objective carries its official code in the document, and the code says where it belongs:
 *
 *   (EF01MA06) Construir fatos básicos da adição …    Ensino Fundamental, 1º ano, Matemática, the 6th   → node EF01MA06
 *   (EF15LP03) Localizar informações explícitas …     1º ao 5º ano, Língua Portuguesa                    → node EF15LP03
 *   (EI03ET07) Relacionar números às suas …           Educação Infantil, crianças pequenas (4 anos a 5 anos e 11
 *                                                      meses), campo "Espaços, tempos, quantidades, …"   → node EI03ET07
 *
 * The codes are the BNCC's own and are what Brazilian teachers write in their plans. A block of years in a code
 * (12 = 1º e 2º anos, 15 = 1º ao 5º, 35 = 3º ao 5º) is kept as the node's band.
 *
 * The PDF prints the objectives in tables of one or three columns. The builder reads every word with its place on
 * the page (scripts/curricula/pdf-words.py, Python with PyMuPDF): the wording of a code is what stands in its own
 * column below it, down to the next code. Checks: within each group the codes run 01, 02, 03 … without a gap; every
 * wording ends as a sentence; a code printed twice has the same wording both times.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { REPO, sha256, crosswalkFromAuthored, writeRegistry, fetchRaw } = require('./lib.js');
const REG = 'pt';
const ACCESSED = '2026-11-11';
const URL = 'https://cdn.mec.gov.br/basenacionalcomum.mec.gov.br/images/BNCC_EI_EF_110518_versaofinal_site.pdf';
const FILE = 'bncc.pdf';
const DIR = path.join(REPO, 'out', 'curricula', REG);
const CODE = /^\((E[FI]\d{2}[A-Z]{2}\d{2})\)[.,;:]?$/;
const WANTED = /^(?:EI03[A-Z]{2}|EF(?:01|02|03|04|05|12|15|35)(?:LP|MA|CI|GE|HI|AR))\d{2}$/;
const FRAMEWORKS = {
  EI: { key: 'bncc-educacao-infantil', subject: 'preschool' }, LP: { key: 'bncc-lingua-portuguesa', subject: 'ela' }, MA: { key: 'bncc-matematica', subject: 'math' },
  CI: { key: 'bncc-ciencias', subject: 'science' }, GE: { key: 'bncc-geografia', subject: 'social' }, HI: { key: 'bncc-historia', subject: 'social' }, AR: { key: 'bncc-arte', subject: 'arts' },
};
const YEARS = { '01': ['1', '1º ano'], '02': ['2', '2º ano'], '03': ['3', '3º ano'], '04': ['4', '4º ano'], '05': ['5', '5º ano'], 12: ['1-2', '1º e 2º anos'], 15: ['1-5', '1º ao 5º ano'], 35: ['3-5', '3º ao 5º ano'] };

function words() {
  const f = path.join(DIR, FILE.replace(/\.pdf$/, '.words.json'));
  if (!fs.existsSync(f)) require('child_process').execFileSync('python', ['-I', path.join(__dirname, 'pdf-words.py'), path.join(DIR, FILE), f], { stdio: 'ignore' });
  return JSON.parse(fs.readFileSync(f, 'utf8')).pages;
}

(async () => {
  const problems = [];
  const buf = await fetchRaw(REG, FILE, URL);
  const pages = words();
  const found = new Map();   // code → { text, page, head, campo }
  for (const p of pages) {
    // twice the PDF joins a code to the word after it with a no-break space: they are two words
    for (const w of p.words.slice()) {
      const m = /^(\(E[FI]\d{2}[A-Z]{2}\d{2}\))\s+(\S.*)$/.exec(w[4]);
      if (m) { const cut = w[0] + (w[2] - w[0]) * (m[1].length / w[4].length); p.words.push([cut + 1, w[1], w[2], w[3], m[2], w[5]]); w[4] = m[1]; w[2] = cut; }
    }
    const codes = p.words.filter((w) => CODE.test(w[4]));
    if (!codes.length) continue;
    const cols = [...new Set(codes.map((w) => Math.round(w[0])))].sort((a, b) => a - b);
    const head = p.words.filter((w) => w[1] < 45).sort((a, b) => a[1] - b[1] || a[0] - b[0]).map((w) => w[4]).join(' ');
    // an Educação Infantil page names its campo de experiências in quotation marks under the page's title
    const top = p.words.filter((w) => w[1] < 135).sort((a, b) => a[1] - b[1] || a[0] - b[0]).map((w) => w[4]).join(' ');
    const campo = (/CAMPO DE EXPERIÊNCIAS\s+[“"]([^”"]+)[”"]/.exec(top) || [])[1] || null;
    // In a table of two year columns (Língua Portuguesa: 1º ano | 2º ano) an objective for both years is printed
    // in one cell ACROSS the columns. Such a cell is known by its first line: it runs on past the place where the
    // next column begins, and no code stands in that column on the same line.
    const nextCol = (col) => cols.find((x) => x > col + 20) || null;
    const spans = (c) => { const r = nextCol(Math.round(c[0])); return r !== null && !codes.some((o) => o !== c && Math.abs(o[1] - c[1]) < 3 && o[0] >= r - 3) && p.words.some((w) => Math.abs(w[1] - c[1]) < 3 && w[0] >= r - 3); };
    const wide = codes.filter(spans);
    for (const c of codes) {
      const code = CODE.exec(c[4])[1];
      if (!WANTED.test(code)) continue;
      const col = Math.round(c[0]);
      const right = wide.includes(c) ? p.width : nextCol(col) || p.width;
      // the cell ends at the next code of its own column, or at the next cell that runs across the columns
      const below = codes.filter((o) => o[1] > c[1] + 2 && (wide.includes(c) || Math.abs(Math.round(o[0]) - col) < 4 || wide.includes(o))).map((o) => o[1]).sort((a, b) => a - b)[0] || p.height - 45;
      const mine = p.words.filter((w) => w !== c && w[0] >= c[0] - 3 && w[0] < right - 3 && w[1] >= c[1] - 2 && w[1] < below - 2 && w[1] < p.height - 45).sort((a, b) => a[1] - b[1] || a[0] - b[0]);
      // lines of the cell, top to bottom; what follows a wide vertical gap is no longer this objective
      const lines = [];
      let y = null;
      for (const w of mine) {
        if (y === null || Math.abs(w[1] - y) > 3) { if (y !== null && w[1] - y > 24) break; lines.push([]); y = w[1]; }
        lines[lines.length - 1].push(w);
      }
      // within a line the words go left to right (a word in italics stands a hair lower and would sort last)
      const text = lines.map((l) => l.sort((a, b) => a[0] - b[0]).map((w) => w[4]).join(' ')).join(' ').replace(/\s+/g, ' ').trim();
      const prev = found.get(code);
      // The introduction shows a few codes inside a figure (cut off there); the table further on is the objective.
      // Printed twice, a code keeps the wording that ends as a sentence; two full wordings must be the same.
      const whole = (t) => /[.!?:;)]$/.test(t);
      if (prev) {
        if (prev.text === text || (whole(prev.text) && !whole(text))) continue;
        if (whole(prev.text) && whole(text)) { problems.push(code + ' is printed twice with different wording (pages ' + prev.page + ' and ' + p.n + ')'); continue; }
      }
      found.set(code, { text, page: p.n, head, campo });
    }
  }
  const nodes = [], groups = new Map();
  for (const [code, v] of [...found].sort((a, b) => a[0].localeCompare(b[0]))) {
    const prefix = code.slice(0, 6), no = Number(code.slice(6));
    if (!groups.has(prefix)) groups.set(prefix, []);
    groups.get(prefix).push(no);
    const stage = code.slice(0, 2), yy = code.slice(2, 4), comp = code.slice(4, 6);
    const fw = stage === 'EI' ? FRAMEWORKS.EI : FRAMEWORKS[comp];
    const grade = stage === 'EI' ? 'P' : YEARS[yy][0];
    if (!/[.!?:;)]$/.test(v.text)) problems.push(code + ' (page ' + v.page + '): the wording does not end as a sentence: "…' + v.text.slice(-50) + '"');
    if (v.text.length < 20) problems.push(code + ' (page ' + v.page + '): wording too short: "' + v.text + '"');
    nodes.push({ id: code, f: fw.key, kind: 'standard', grade, parent: prefix, text: v.text, _head: v.head, _campo: v.campo });
  }
  // a group node per code prefix, named as the document names it
  const areas = [];
  for (const [prefix, list] of groups) {
    list.sort((a, b) => a - b);
    list.forEach((n, i) => { if (n !== i + 1) problems.push(prefix + ': its codes run ' + list.join(' ') + ' (a number is missing)'); });
    const first = nodes.find((n) => n.parent === prefix);
    const yy = prefix.slice(2, 4);
    let text;
    if (prefix.startsWith('EI')) {
      const campos = [...new Set(nodes.filter((n) => n.parent === prefix).map((n) => n._campo).filter(Boolean))];
      if (campos.length !== 1) problems.push(prefix + ': the campo de experiências was read as ' + JSON.stringify(campos));
      text = 'Educação Infantil, crianças pequenas (4 anos a 5 anos e 11 meses): campo de experiências “' + (campos[0] || '?') + '”';
    } else text = first._head.replace(/\s*ENSINO FUNDAMENTAL\s*/, ' ').replace(/\s+/g, ' ').trim() + ', ' + YEARS[yy][1];
    areas.push({ id: prefix, f: first.f, kind: 'area', grade: first.grade, text });
  }
  for (const n of nodes) { delete n._head; delete n._campo; }
  const all = [];
  for (const a of areas) { all.push(a); all.push(...nodes.filter((n) => n.parent === a.id)); }
  // what the document says of itself, read from its own first pages
  const front = pages.slice(0, 12).map((p) => p.words.map((w) => w[4]).join(' ')).join(' ');
  const said = (/BASE NACIONAL COMUM CURRICULAR/i.test(front) ? 'Base Nacional Comum Curricular' : null);
  if (!said) problems.push('the PDF\'s first pages do not name the Base Nacional Comum Curricular');
  const frameworks = Object.values(FRAMEWORKS).map((f) => {
    const mine = all.filter((n) => n.f === f.key && n.kind === 'standard');
    if (!mine.length) problems.push(f.key + ': no objective read');
    return { key: f.key, short: 'BNCC', subject: f.subject, title: 'Base Nacional Comum Curricular (Educação Infantil e Ensino Fundamental)', publisher: 'Ministério da Educação (Brasil)', year: '2018', officialDocument: URL, readFrom: URL, accessed: ACCESSED, sha256: sha256(buf),
      version: 'the final version published by the Ministry (file BNCC_EI_EF_110518_versaofinal_site.pdf)', band: f.key === 'bncc-educacao-infantil' ? 'crianças pequenas (4 anos a 5 anos e 11 meses): P' : 'single years 1 to 5, and the blocks 1-2, 1-5 and 3-5 the code names', ids: 'the BNCC\'s own alphanumeric codes',
      citation: 'BRASIL. Ministério da Educação. Base Nacional Comum Curricular. Brasília, 2018.', checkedAgainstPdf: mine.length + ' objectives read, each from its own column under its code; the codes of every group run without a gap; every wording ends as a sentence' };
  });
  const seen = new Set();
  for (const n of all) { if (seen.has(n.id)) problems.push('two nodes share the id ' + n.id); seen.add(n.id); }
  if (process.argv.includes('--list')) for (const n of all) console.log((n.kind === 'area' ? '' : '    ') + n.id + ' [' + n.grade + ']  ' + n.text);
  const cw = crosswalkFromAuthored(REG, all);
  problems.push(...cw.problems);
  for (const m of problems.slice(0, 60)) console.log('FAIL  ' + m);
  const framework = { $comment: 'GENERATED by scripts/curricula/build-pt.js from the Ministry\'s PDF of the BNCC named under `frameworks`. The wording of every node is the document\'s own; it is stored for reference and is never shown to a visitor as a quotation. Do not edit by hand.', locale: 'pt', country: 'BR', frameworks, nodes: all };
  const crosswalk = cw.rows ? { $comment: 'GENERATED by scripts/curricula/build-pt.js from crosswalk-authored.json (written from the official text by reviewers who teach the anos iniciais in Brazil): every teaching point → the habilidades it teaches, prepares or extends, with the year of each.', locale: 'pt', points: cw.rows } : null;
  let diff = 0;
  if (!problems.length) diff = writeRegistry(REG, framework, crosswalk, process.argv.includes('--check'));
  const by = {};
  for (const n of all) by[n.f + ' ' + n.kind] = (by[n.f + ' ' + n.kind] || 0) + 1;
  console.log('pt framework: ' + all.length + ' nodes (' + Object.entries(by).map(([k, v]) => k + ' ' + v).join(', ') + ')');
  console.log(cw.rows ? 'pt crosswalk: ' + cw.authored + ' points mapped, ' + cw.none + ' with no counterpart' : 'pt: no crosswalk yet');
  if (problems.length || diff) { console.log((problems.length + diff) + ' problem(s)'); process.exit(1); }
})().catch((e) => { console.error(e.message); process.exit(1); });
