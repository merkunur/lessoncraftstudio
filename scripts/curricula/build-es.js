#!/usr/bin/env node
/**
 * The Mexican registry (Daily Teaching System, Part 2; Spanish on this site is Mexican Spanish): the Plan de Estudio
 * 2022 of the Secretaría de Educación Pública — the Programas Sintéticos of Fase 3 (1° and 2° de primaria) and Fase 4
 * (3° and 4°): for each Campo formativo its Contenidos and, grade by grade, the Procesos de desarrollo de aprendizaje.
 *
 *   node scripts/curricula/build-es.js            → frontend/content/curricula/es/framework.json (+ crosswalk.json when
 *                                                   crosswalk-authored.json exists)
 *   node scripts/curricula/build-es.js --check | --list
 *
 * Nothing is written from memory: the wording is read from the SEP's own PDFs (fetched into out/curricula/es/). Each
 * Campo formativo has a table of three columns:
 *
 *   | Contenidos                         | Procesos … Primer grado          | Procesos … Segundo grado         |
 *   | Escritura de nombres en la lengua  | Escribe su nombre y lo compara … | Escribe su nombre y apellidos …  |
 *   | materna.                           | Identifica nombres más largos …  | Compara características de …     |
 *
 *   the Contenido                                  → node F3.LEN.1       (kind content, years 1-2)
 *   a Proceso de desarrollo de aprendizaje, 1°     → node F3.LEN.1.G1.2  (kind standard, year 1; the second of that cell)
 *
 * The programme numbers nothing: the ids are this registry's (fase, campo, the contenido's place, grade, the
 * process's place in its cell). LEN = Lenguajes, SPC = Saberes y Pensamiento Científico, ENS = Ética, Naturaleza y
 * Sociedades, HC = De lo Humano y lo Comunitario.
 *
 * The columns are told apart by where each word stands on the page (scripts/curricula/pdf-words.py, Python with
 * PyMuPDF); a process is a paragraph of its cell (the cells separate their processes by a blank line). Checks:
 * every campo of every fase holds contenidos; every contenido holds a process in at least one grade; every process
 * opens with a capital and ends as a sentence; the number of contenidos per campo is the one the programme's own
 * overview ("Panorama de los Contenidos") prints.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { REPO, sha256, crosswalkFromAuthored, writeRegistry, fetchRaw } = require('./lib.js');
const REG = 'es';
const ACCESSED = '2026-11-11';
const DIR = path.join(REPO, 'out', 'curricula', REG);
const FASES = [
  { no: 2, grades: ['P1', 'P2', 'P3'], stage: '1°, 2° y 3° de preescolar', file: 'fase2.pdf', url: 'https://educacionbasica.sep.gob.mx/wp-content/uploads/2024/06/Programa_Sintetico_Fase-2.pdf' },
  { no: 3, grades: ['1', '2'], file: 'fase3.pdf', url: 'https://educacionbasica.sep.gob.mx/wp-content/uploads/2024/06/Programa_Sintetico_Fase_3.pdf' },
  { no: 4, grades: ['3', '4'], file: 'fase4.pdf', url: 'https://educacionbasica.sep.gob.mx/wp-content/uploads/2024/06/Programa_Sintetico_Fase_4.pdf' },
];
const CAMPOS = [
  { code: 'LEN', name: 'Lenguajes', key: 'nem-lenguajes', subject: 'ela' },
  { code: 'SPC', name: 'Saberes y Pensamiento Científico', key: 'nem-saberes-y-pensamiento-cientifico', subject: 'math-science' },
  { code: 'ENS', name: 'Ética, Naturaleza y Sociedades', key: 'nem-etica-naturaleza-y-sociedades', subject: 'social' },
  { code: 'HC', name: 'De lo Humano y lo Comunitario', key: 'nem-de-lo-humano-y-lo-comunitario', subject: 'health' },
];
const GRADE_ROW = /^(?:Primer|Segundo|Tercer|Cuarto) grado(?: (?:Primer|Segundo|Tercer|Cuarto) grado)?$|^1° 2° 3°$/;
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');

function wordsOf(file) {
  const f = path.join(DIR, file.replace(/\.pdf$/, '.words.json'));
  let ok = fs.existsSync(f);
  if (ok) { const first = JSON.parse(fs.readFileSync(f, 'utf8')).pages.find((p) => p.words.length); ok = !!first && first.words[0].length >= 7; }
  if (!ok) require('child_process').execFileSync('python', ['-I', path.join(__dirname, 'pdf-words.py'), path.join(DIR, file), f], { stdio: 'ignore' });
  return JSON.parse(fs.readFileSync(f, 'utf8')).pages;
}
function rowsOf(words) {
  const rows = [];
  let row = null;
  for (const w of words.slice().sort((a, b) => a[1] - b[1] || a[0] - b[0])) {
    if (!row || Math.abs(w[1] - row.y) > 4) { row = { y: w[1], words: [] }; rows.push(row); }
    row.words.push(w);
  }
  for (const r of rows) { r.words.sort((a, b) => a[0] - b[0]); r.text = r.words.map((w) => w[4]).join(' '); }
  return rows;
}
/**
 * A word broken at a line end ("nom-" / "bres") is put together; the lines of a paragraph become one text. The
 * programmes also print real hyphens at a line end ("comparación-" / "contraste", "causa-" / "consecuencia"). The two
 * are told apart by the document's own words (VOCAB, every unbroken word of the PDFs): when the two pieces together
 * are a word the document prints elsewhere, the hyphen was a line break; when they are not, but each piece is such a
 * word, the hyphen is the text's own and stays.
 */
const VOCAB = new Set();
const LETTERS = 'a-záéíóúñüA-ZÁÉÍÓÚÑÜ';
function learn(pages) {
  const strip = new RegExp('[^' + LETTERS + '-]', 'g');
  for (const p of pages) for (const r of rowsOf(p.words)) r.words.forEach((w, i) => {
    const t = w[4].replace(strip, '').toLowerCase();
    if (!t) return;
    const initial = i === 0 || w[0] - r.words[i - 1][2] > 9;   // the first word of a line (of a column's line)
    const broken = t.endsWith('-');
    const parts = t.split('-').filter(Boolean);
    parts.forEach((part, k) => {
      if (broken && k === parts.length - 1) return;   // the beginning of a broken word
      if (k === 0 && initial) return;                 // may be the end of a broken word
      VOCAB.add(part);
    });
  });
}
const join = (lines) => lines.map((s) => s.trim()).join('\n')
  .replace(new RegExp('([' + LETTERS + ']+)-\\n([a-záéíóúñü]+)', 'g'), (m, a, b) => {
    if (VOCAB.has((a + b).toLowerCase())) return a + b;
    if (a.length >= 4 && b.length >= 4 && VOCAB.has(a.toLowerCase()) && VOCAB.has(b)) return a + '-' + b;
    return a + b;
  })
  .replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

function parse(fase, pages) {
  const nodes = [], problems = [];
  learn(pages);
  let campo = null, inTables = false, contenido = null, cNo = 0;
  const N = fase.grades.length + 1;   // the contenidos column and one column per grade (two in primaria, three in preescolar)
  const last = new Array(N).fill(null);   // the paragraph each column is still writing, with the y of its last line
  const knownCols = {};   // where the columns stand on left pages and on right pages
  const counts = {};
  for (const p of pages) {
    const rows = rowsOf(p.words).filter((r) => r.y < p.height - 45);
    // the headings of the programme: a campo (18 pt), "Contenidos y Procesos … del Campo formativo" (14 pt) opens its tables
    const body = [], gradeRows = [];
    for (const r of rows) {
      const first = r.words[0];
      if (first[6] >= 17 && first[5]) { const c = CAMPOS.find((x) => norm(r.text) === norm(x.name)); campo = c || null; inTables = false; contenido = null; cNo = 0; last.fill(null); continue; }
      if (first[6] >= 13 && first[5]) { if (/^Contenidos y Procesos de desarrollo/.test(r.text)) inTables = !!campo; else if (!/^del Campo formativo/.test(r.text)) inTables = false; continue; }
      if (r.words.every((w) => w[5]) || GRADE_ROW.test(r.text)) { if (GRADE_ROW.test(r.text)) gradeRows.push(r.y); continue; }   // the table's own header (bold; in Fase 4 the line of the two grades is not)
      if (inTables && campo) body.push(r);
    }
    // every page repeats the table's header; what a page prints ABOVE it (a note to the teacher) is not in the table
    const header = rows.filter((r) => r.words.every((w) => w[5]) && /Procesos|Contenidos|grado/.test(r.text)).map((r) => r.y).concat(gradeRows);
    if (header.length) { const top = Math.max(...header); for (let i = body.length - 1; i >= 0; i--) if (body[i].y < top) body.splice(i, 1); }
    if (!body.length) continue;
    // where the columns begin on this page: the places where most line pieces start (counted in bins of 3 points)
    const starts = new Map();
    for (const r of body) r.words.forEach((w, i) => { if (i === 0 || w[0] - r.words[i - 1][2] > 9) { const k = Math.round(w[0] / 3) * 3; starts.set(k, (starts.get(k) || 0) + 1); } });
    let cols = [...starts].sort((a, b) => b[1] - a[1]).slice(0, N).map((x) => x[0]).sort((a, b) => a - b);
    // A page that holds little (the end of a table) does not show every column, or shows the indent of a list more
    // often than a column: the table stands at the same place as on the page before it of the same side (left or
    // right page), so that page's columns are used when this one's are not all there or do not agree with them.
    const known = knownCols[p.n % 2] || knownCols[(p.n + 1) % 2];
    const agrees = known && cols.length === N && cols.every((x, i) => Math.abs(x - known[i]) <= 8);
    if (cols.length === N && (!known || agrees)) knownCols[p.n % 2] = cols;
    else if (knownCols[p.n % 2]) cols = knownCols[p.n % 2];
    else if (cols.length < N && known) cols = known;
    if (cols.length < N) { problems.push('fase ' + fase.no + ' page ' + p.n + ': the ' + N + ' columns of the table were not found'); continue; }
    // a word stands in the last column that begins at or left of it; the beginnings are known to about 5 points
    const colOf = (x) => { let c = 0; for (let i = 1; i < N; i++) if (x >= cols[i] - 5) c = i; return c; };
    // every row gives a line piece per column; a contenido opens when the first column starts a new paragraph
    for (const r of body) {
      const placed = cols.map(() => []);
      for (const w of r.words) placed[colOf(w[0])].push(w);
      // One case the 5 points get wrong: a full line of the cell to the left whose LAST word ("y", "de") ends up just
      // left of the next column's beginning and is taken for that column. It is known by standing alone there, a
      // normal word space after the left cell's last word.
      for (let c = 1; c < N; c++) {
        const lone = placed[c].length === 1 ? placed[c][0] : null, left = placed[c - 1];
        if (lone && lone[0] < cols[c] - 0.8 && left.length && lone[0] - left[left.length - 1][2] <= 4) { left.push(lone); placed[c] = []; }
      }
      const pieces = placed.map((ws) => ws.map((w) => w[4]));
      for (let c = 0; c < N; c++) {
        if (!pieces[c].length) continue;
        const text = pieces[c].join(' ');
        const prev = last[c];
        const cont = prev && prev.page === p.n ? r.y - prev.y < 18 : prev && !/[.:;!?]$/.test(prev.node._lines[prev.node._lines.length - 1].trim()) && /^[a-záéíóúñü(]/.test(text);   // the same paragraph: the next line, or a sentence that runs on over the page
        // a process may hold a list of its own ("Expone sobre diversos temas, considerando:" / "-Planear su exposición …"):
        // what follows a colon, what opens with a dash or a small letter, and what follows a line that is not yet a
        // finished sentence still belongs to the process before it
        const prevLine = prev ? prev.node._lines[prev.node._lines.length - 1].trim() : '';
        const inner = c > 0 && prev && prev.node.parent === (contenido && contenido.id) && (/:$/.test(prevLine) || /^[-–•]/.test(text) || /^[a-záéíóúñü]/.test(text) || !/[.;!?)]$/.test(prevLine));
        if (cont || inner) { prev.node._lines.push(text); prev.y = r.y; prev.page = p.n; continue; }
        if (c === 0) {
          contenido = { id: 'F' + fase.no + '.' + campo.code + '.' + (++cNo), f: campo.key, kind: 'content', grade: fase.grades[0] + '-' + fase.grades[fase.grades.length - 1], parent: 'F' + fase.no + '.' + campo.code, text: '', _lines: [text] };
          nodes.push(contenido); counts[contenido.id] = new Array(N).fill(0);
          last[0] = { node: contenido, y: r.y, page: p.n };
        } else {
          if (!contenido) { problems.push('fase ' + fase.no + ' page ' + p.n + ': a process before any contenido: "' + text.slice(0, 50) + '"'); continue; }
          const node = { id: contenido.id + '.G' + fase.grades[c - 1] + '.' + (++counts[contenido.id][c]), f: campo.key, kind: 'standard', grade: fase.grades[c - 1], parent: contenido.id, text: '', _lines: [text] };
          nodes.push(node);
          last[c] = { node, y: r.y, page: p.n };
        }
      }
    }
  }
  for (const n of nodes) { n.text = join(n._lines); delete n._lines; }
  return { nodes, problems };
}

/** how many contenidos the programme's own overview prints for each campo (its table "Panorama de los Contenidos") */
function panorama(pages) {
  const out = {};
  let on = false;
  for (const p of pages) {
    const rows = rowsOf(p.words);
    if (rows.some((r) => r.words[0][6] >= 13 && /^Panorama de los Contenidos/.test(r.text))) on = true;
    else if (on && rows.some((r) => r.words[0][6] >= 17 && r.words[0][5])) { on = false; }
    if (!on) continue;
    out.pages = (out.pages || []).concat(p.n);
  }
  return out;
}

(async () => {
  const frameworks = [], nodes = [], problems = [];
  const perCampo = new Map(CAMPOS.map((c) => [c.key, { fases: [], hashes: [], urls: [], contents: 0, processes: 0 }]));
  for (const fase of FASES) {
    const buf = await fetchRaw(REG, fase.file, fase.url);
    const pages = wordsOf(fase.file);
    const title = pages[0].words.map((w) => w[4]).join(' ');
    if (!new RegExp('FASE ' + fase.no).test(title)) problems.push('fase ' + fase.no + ': the PDF\'s first page does not say FASE ' + fase.no + ' ("' + title.slice(0, 80) + '")');
    const r = parse(fase, pages);
    problems.push(...r.problems);
    for (const c of CAMPOS) {
      const area = { id: 'F' + fase.no + '.' + c.code, f: c.key, kind: 'area', grade: fase.grades[0] + '-' + fase.grades[fase.grades.length - 1], text: c.name + ' — Fase ' + fase.no + ' (' + (fase.stage || fase.grades.map((g) => g + '°').join(' y ') + ' de primaria') + ')' };
      const mine = r.nodes.filter((n) => n.f === c.key);
      const contents = mine.filter((n) => n.kind === 'content');
      if (contents.length < 3) problems.push('fase ' + fase.no + ' ' + c.name + ': ' + contents.length + ' contenidos read');
      for (const k of contents) if (!mine.some((n) => n.parent === k.id)) problems.push(k.id + ' ("' + k.text.slice(0, 50) + '"): no process read in any grade');
      nodes.push(area, ...mine);
      const pc = perCampo.get(c.key);
      pc.fases.push(fase.no); pc.hashes.push(sha256(buf)); pc.urls.push(fase.url); pc.contents += contents.length; pc.processes += mine.length - contents.length;
    }
    for (const n of r.nodes) {
      if (n.kind === 'standard' && !/^[A-ZÁÉÍÓÚÑ¿¡(]/.test(n.text)) problems.push(n.id + ': a process that does not open with a capital: "' + n.text.slice(0, 50) + '"');
      if (n.kind === 'standard' && !/[.!?)]$/.test(n.text)) problems.push(n.id + ': a process that does not end as a sentence: "…' + n.text.slice(-40) + '"');
      if (n.text.length < 8) problems.push(n.id + ': wording too short: "' + n.text + '"');
    }
  }
  for (const c of CAMPOS) {
    const pc = perCampo.get(c.key);
    frameworks.push({ key: c.key, short: 'Plan de Estudio 2022', subject: c.subject, title: 'Programa Sintético, Campo formativo ' + c.name + ' (Fases 2, 3 y 4)', publisher: 'Secretaría de Educación Pública (México)', year: '2024', officialDocument: pc.urls.join(' '), readFrom: pc.urls.join(' '), accessed: ACCESSED, sha256: pc.hashes.join(' '),
      version: 'Plan de Estudio para la educación preescolar, primaria y secundaria 2022; Programas Sintéticos as published by the SEP in June 2024', band: 'Fase 2 = preescolar (P1, P2, P3), Fase 3 = 1° and 2° de primaria, Fase 4 = 3° and 4°; a contenido belongs to the fase, a process to one grade', ids: 'this registry\'s own (the programme numbers nothing): fase, campo, contenido, grade, process',
      citation: 'Secretaría de Educación Pública (2024). Programa Sintético de la Fase 2 (preescolar), de la Fase 3 y de la Fase 4 (primaria).', checkedAgainstPdf: pc.contents + ' contenidos and ' + pc.processes + ' procesos de desarrollo de aprendizaje read; every contenido holds a process; every process is a full sentence' });
  }
  const seen = new Set();
  for (const n of nodes) { if (seen.has(n.id)) problems.push('two nodes share the id ' + n.id); seen.add(n.id); }
  if (process.argv.includes('--list')) for (const n of nodes) console.log((n.kind === 'area' ? '' : n.kind === 'content' ? '  ' : '      ') + n.id + ' [' + n.grade + ']  ' + n.text);
  const cw = crosswalkFromAuthored(REG, nodes);
  problems.push(...cw.problems);
  for (const m of problems.slice(0, 60)) console.log('FAIL  ' + m);
  const framework = { $comment: 'GENERATED by scripts/curricula/build-es.js from the SEP\'s Programas Sintéticos named under `frameworks`. The wording of every node is the programme\'s own; it is stored for reference and is never shown to a visitor as a quotation. The ids are this registry\'s. Do not edit by hand.', locale: 'es', country: 'MX', frameworks, nodes };
  const crosswalk = cw.rows ? { $comment: 'GENERATED by scripts/curricula/build-es.js from crosswalk-authored.json (written from the official text by reviewers who teach primaria in Mexico): every teaching point → the contenidos and processes it teaches, prepares or extends, with the grade of each.', locale: 'es', points: cw.rows } : null;
  let diff = 0;
  if (!problems.length) diff = writeRegistry(REG, framework, crosswalk, process.argv.includes('--check'));
  const by = {};
  for (const n of nodes) by[n.f + ' ' + n.kind] = (by[n.f + ' ' + n.kind] || 0) + 1;
  console.log('es framework: ' + nodes.length + ' nodes (' + Object.entries(by).map(([k, v]) => k + ' ' + v).join(', ') + ')');
  console.log(cw.rows ? 'es crosswalk: ' + cw.authored + ' points mapped, ' + cw.none + ' with no counterpart' : 'es: no crosswalk yet');
  if (problems.length || diff) { console.log((problems.length + diff) + ' problem(s) (' + problems.length + ' found)'); process.exit(1); }
})().catch((e) => { console.error(e.stack || e.message); process.exit(1); });
void panorama;
