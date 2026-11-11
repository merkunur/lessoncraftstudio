#!/usr/bin/env node
/**
 * The French registry (Daily Teaching System, Part 2): the programmes of the école maternelle (from age 4) and of the
 * cycle 2 (CP, CE1, CE2) for français and mathématiques (arrêté of 22 October 2024, in force from the rentrée 2025),
 * and the themes of the cycle 2 programme of histoire-géographie (2026).
 *
 *   node scripts/curricula/build-fr.js            → frontend/content/curricula/fr/framework.json (+ crosswalk.json when
 *                                                   crosswalk-authored.json exists)
 *   node scripts/curricula/build-fr.js --check | --list
 *
 * Nothing is written from memory: the wording is read from the annexes of the Bulletin officiel as the Ministry
 * publishes them (PDF, fetched into out/curricula/fr/). The programmes of 2024 print, for each year, tables of two
 * columns: the binding "Objectifs d'apprentissage" on the left and "Exemples de réussite" on the right.
 *
 *   Nombres, calcul et résolution de problèmes            the theme (bold, large)
 *   Cours préparatoire                                    the year
 *   Le calcul mental / Mémoriser des faits numériques     the part of the theme (bold)
 *   | - Connaitre dans les deux sens les tables d'addition. | L'élève sait donner … |   → node M.CP.31 (kind standard)
 *
 * Only the LEFT column is read (the examples are illustrations). The programmes number nothing: the ids are this
 * registry's (document, year, place in the year); `domain` keeps the theme and the part the objective stands under.
 * Years: CP = 1, CE1 = 2, CE2 = 3; in the école maternelle the programme speaks of ages ("à partir de 4 ans",
 * "à partir de 5 ans"), kept as M4 and M5 (M5 is the grande section, the year before CP).
 *
 * The columns are told apart by where each word stands on the page (scripts/curricula/pdf-words.py, Python with
 * PyMuPDF); the border of a table is where its own header prints "Exemples de réussite". Checks: every year of
 * every document holds objectives; every objective begins as a printed line of pdftotext's reading of the same PDF.
 *
 * NOT read: the cycle 2 programme "Sciences et technologie" of 2026 (the Ministry's PDF is a scan: it holds no text)
 * — see the README for what stands in for science.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { REPO, sha256, crosswalkFromAuthored, writeRegistry, fetchRaw, flat } = require('./lib.js');
const REG = 'fr';
const ACCESSED = '2026-11-11';
const B = 'https://www.education.gouv.fr/sites/default/files/document/';
const DIR = path.join(REPO, 'out', 'curricula', REG);
const DOCS = [
  { key: 'programme-2024-maternelle-langage', letter: 'ML', file: 'c1-langage.pdf', kind: 'cycle1', subject: 'ela', title: 'Programme d’enseignement pour le développement et la structuration du langage oral et écrit de l’école maternelle (cycle 1)', bo: 'arrêté du 22-10-2024, BO n° 41 du 31 octobre 2024, annexe 1',
    url: B + 'Annexe%201%20%E2%80%93%20Programme%20d%E2%80%98enseignement%20pour%20le%20d%C3%A9veloppement%20et%20la%20structuration%20du%20langage%20oral%20et%20%C3%A9crit%20du%20cycle%201-403812.pdf' },
  { key: 'programme-2024-maternelle-mathematiques', letter: 'MM', file: 'c1-maths.pdf', kind: 'cycle1', subject: 'math', title: 'Programme d’enseignement pour l’acquisition des premiers outils mathématiques de l’école maternelle (cycle 1)', bo: 'arrêté du 22-10-2024, BO n° 41 du 31 octobre 2024, annexe 2',
    url: B + 'Annexe%202%20%E2%80%93%20Programme%20d%E2%80%99enseignement%20pour%20l%E2%80%99acquisition%20des%20premiers%20outils%20math%C3%A9matiques%20du%20cycle%201-403815.pdf' },
  { key: 'programme-2024-francais-cycle2', letter: 'F', file: 'c2-francais.pdf', kind: 'cycle2', subject: 'ela', title: 'Programme de français du cycle 2', bo: 'arrêté du 22-10-2024, BO n° 41 du 31 octobre 2024, annexe 3',
    url: B + 'Annexe%203%20%E2%80%93%20Programme%20de%20fran%C3%A7ais%20du%20cycle%202-403818.pdf' },
  { key: 'programme-2024-mathematiques-cycle2', letter: 'M', file: 'c2-maths.pdf', kind: 'cycle2', subject: 'math', title: 'Programme de mathématiques du cycle 2', bo: 'arrêté du 22-10-2024, BO n° 41 du 31 octobre 2024, annexe 4',
    url: B + 'Annexe%204%20%E2%80%93%20Programme%20de%20math%C3%A9matiques%20du%20cycle%202-403821.pdf' },
];
const HISTGEO = { key: 'programme-2026-histoire-geographie-cycle2', letter: 'HG', file: 'c2-histgeo.pdf', subject: 'social', title: 'Programme d’histoire-géographie pour le cycle 2', bo: 'BO n° 22 du 28 mai 2026, annexe 3', url: B + 'annexe-3-programme-d-histoire-geographie-cycle-2-516776.pdf' };
const YEARS = [[/^Cours préparatoire\b/, 'CP', '1'], [/^Cours élémentaire première année\b/, 'CE1', '2'], [/^Cours élémentaire deuxième année\b/, 'CE2', '3']];
const STAGES = [[/À aborder avant 4 ans/, 'M3', 'M3'], [/À partir de 4 ans/, 'M4', 'M4'], [/À partir de 5 ans/, 'M5', 'M5']];

function sources(file) {
  const words = path.join(DIR, file.replace(/\.pdf$/, '.words.json'));
  let ok = fs.existsSync(words);
  if (ok) { const first = JSON.parse(fs.readFileSync(words, 'utf8')).pages.find((p) => p.words.length); ok = !!first && first.words[0].length >= 7; }   // an older dump has no font sizes
  if (!ok) require('child_process').execFileSync('python', ['-I', path.join(__dirname, 'pdf-words.py'), path.join(DIR, file), words], { stdio: 'ignore' });
  const plain = path.join(DIR, file.replace(/\.pdf$/, '.txt'));
  if (!fs.existsSync(plain)) require('child_process').execFileSync('python', ['-I', '-c', 'import pymupdf,sys\nd=pymupdf.open(sys.argv[1])\nopen(sys.argv[2],"w",encoding="utf-8").write("\\n".join(p.get_text() for p in d))', path.join(DIR, file), plain], { stdio: 'ignore' });
  return { pages: JSON.parse(fs.readFileSync(words, 'utf8')).pages, plain: fs.readFileSync(plain, 'utf8') };
}
/**
 * A fraction is printed as two small numerals, one above the other (size 6, about nine points apart). Read word by
 * word they fall apart ("les fractions 1, 1, 1 et 1. 2 3 4 10"). They are put back together here, and only where the
 * page shows them: a small numeral with another small numeral straight below it becomes "1/2".
 */
function stackedFractions(words) {
  const small = (w) => w[6] < 7.5 && /^\d{1,3}$/.test(w[4]);
  const gone = new Set();
  const out = [];
  for (const a of words) {
    if (gone.has(a)) continue;
    if (small(a)) {
      const b = words.find((x) => x !== a && !gone.has(x) && small(x) && x[1] - a[1] > 6 && x[1] - a[1] < 12 && Math.abs((x[0] + x[2]) / 2 - (a[0] + a[2]) / 2) <= 3);
      if (b) { gone.add(b); const c = a.slice(); c[4] = a[4] + '/' + b[4]; out.push(c); continue; }
    }
    out.push(a);
  }
  return out.filter((w) => !gone.has(w));
}
function rowsOf(p, liftMaxX = 60) {
  const rows = [];
  let row = null;
  // the dash of a list item stands lower than its text (by two to six points): it is lifted by three before the lines
  // are told apart, so that it never falls onto a line of its own below its objective
  const lifted = p.words.map((w) => { if ((w[4] !== '-' && w[4] !== '–') || w[0] > liftMaxX) return w; const c = w.slice(); c[1] = w[1] - 3; return c; });   // (a minus sign inside a line is left alone)
  for (const w of stackedFractions(lifted.sort((a, b) => a[1] - b[1] || a[0] - b[0]))) {
    // (5 points still keeps two printed lines apart)
    if (!row || Math.abs(w[1] - row.y) > 5) { row = { y: w[1], words: [] }; rows.push(row); }
    row.words.push(w);
  }
  for (const r of rows) { r.words.sort((a, b) => a[0] - b[0]); r.text = r.words.map((w) => w[4]).join(' '); }
  return rows;
}
const join = (lines) => lines.map((s) => s.trim()).join('\n').replace(/-\n/g, '-').replace(/\n/g, ' ').replace(/\s+/g, ' ').replace(/ ([.,;])/g, '$1').trim();

function parse(doc, pages) {
  const nodes = [], problems = [], tables = [];
  // In the école maternelle a part is laid out in one of two orders: part → age → table, or part → age → several
  // sub-parts, each with its table. A bold heading that comes while an age is open is therefore a sub-part IF a table
  // follows it directly; if a paragraph or a note follows, it was the next part and the age is over (`pending`).
  let theme = null, year = null, part = null, sub = null, when = null, inTable = false, border = 0, cur = null, table = null, stageLive = false, pending = false;
  // A few tables are printed WITHOUT their header row: the objectives follow the part's heading or its paragraph
  // directly. A line at the left column's edge that starts with a dash and a capital then opens the table (with the
  // border of the tables before it). Such a line under no theme or year is reported (`stray`).
  let open = false;
  const stray = [];
  const counts = {};
  const promote = () => { if (pending) { part = sub; sub = null; year = null; stageLive = false; pending = false; } };
  pages.forEach((p, pi) => {
    for (const r of rowsOf(p)) {
      if (r.y > p.height - 30) continue;   // the page number
      const first = r.words[0];
      const allBold = r.words.every((w) => w[5]);
      const big = first[6] >= 10.5;
      const margin = first[0] < 45;
      // the table's header ("Objectifs d'apprentissage | Exemples de réussite"; three tables print "Objectifs" alone):
      // where "Exemples de réussite" starts is the border between the columns
      if (!margin && /^Objectifs( d’apprentissage)? Exemples de réussite$/.test(r.text)) {   // (one header is not set in bold)
        pending = false;
        inTable = true; border = r.words.find((w) => w[4] === 'Exemples')[0] - 2; cur = null; when = null;
        table = { where: 'page ' + (pi + 1) + ', "' + [theme, part, sub].filter(Boolean).join(' › ') + '"', theme, year: year && year[1], n: 0 };
        tables.push(table);
        continue;
      }
      if (margin && big && allBold) { theme = r.text === 'Principes' ? null : r.text; part = null; sub = null; inTable = false; cur = null; year = null; stageLive = false; pending = false; continue; }
      const y = doc.kind === 'cycle2' && margin && big && !allBold ? YEARS.find(([re]) => re.test(r.text)) : null;
      if (y) { year = y; part = null; sub = null; inTable = false; open = false; cur = null; continue; }
      const st = doc.kind === 'cycle1' && margin && allBold ? STAGES.find(([re]) => re.test(r.text)) : null;
      if (st) { promote(); year = st; sub = null; stageLive = true; inTable = false; open = true; cur = null; continue; }
      if (margin && allBold && /^(Introduction|Points de vigilance)/.test(r.text)) { promote(); inTable = false; open = false; cur = null; if (doc.kind === 'cycle1') { year = null; stageLive = false; } continue; }   // a note for the teacher inside a part
      if (margin && allBold) {
        inTable = false; cur = null; open = true;
        if (doc.kind === 'cycle1' && stageLive) { promote(); sub = r.text; pending = true; } else { part = r.text; sub = null; if (doc.kind === 'cycle1') year = null; }
        continue;
      }
      if (margin) { promote(); inTable = false; open = false; cur = null; continue; }   // a paragraph: the table before it is over
      const dashLeft = border && first[0] < border && first[0] < 52 && (first[4] === '-' || first[4] === '–');
      if (!inTable && dashLeft && r.words[1] && /^[A-ZÉÈÀÂÊÎÔÛÇ]/.test(r.words[1][4])) {   // (a lower-case item belongs to the tables "Tous les jours, chaque élève …", which describe the timetable)
        if (theme && year) {   // a table without its header row
          pending = false; inTable = true; when = null; cur = null;
          table = { where: 'page ' + (pi + 1) + ', "' + [theme, part, sub].filter(Boolean).join(' › ') + '" (printed without a header)', theme, year: year[1], n: 0 };
          tables.push(table);
        } else stray.push('page ' + (pi + 1) + ': "' + r.text.slice(0, 50) + '"');
      }
      if (!inTable || !theme || !year) continue;
      const left = r.words.filter((w) => w[0] < border);
      if (!left.length) continue;
      if (left.every((w) => w[5])) { when = left.map((w) => w[4]).join(' '); cur = null; continue; }   // "En fin de période 1", "En cours d'année" …
      const dash = (left[0][4] === '-' || left[0][4] === '–') && left[0][0] < 52;
      // One table (data, CE2) prints its objectives WITHOUT dashes, as short paragraphs at the column's edge: there a
      // new objective begins on a capital after a full stop or after a wider gap than a line's.
      if (!dash && !table.dashes && left[0][0] < 52 && /^[A-ZÉÈÀÂÊÎÔÛÇ]/.test(left[0][4])) {
        const last = cur && cur._lines[cur._lines.length - 1].trim();
        if (!cur || /[.]$/.test(last) || r.y - cur._y > 16) table.plain = true;
      }
      const starts = dash || (table.plain && !table.dashes && left[0][0] < 52 && /^[A-ZÉÈÀÂÊÎÔÛÇ]/.test(left[0][4]) && (!cur || /[.]$/.test(cur._lines[cur._lines.length - 1].trim()) || r.y - cur._y > 16));
      if (starts) {
        if (dash) table.dashes = true;
        const n = (counts[year[1]] = (counts[year[1]] || 0) + 1);
        cur = { id: doc.letter + '.' + year[1] + '.' + n, f: doc.key, kind: 'standard', grade: year[2], parent: doc.letter + '.' + year[1], domain: [theme, part, sub, when].filter(Boolean).join(' › '), text: '', _y: r.y, _lines: [left.slice(dash ? 1 : 0).map((w) => w[4]).join(' ')] };
        nodes.push(cur);
        table.n++;
      } else if (cur) { cur._lines.push(left.map((w) => w[4]).join(' ')); cur._y = r.y; }
    }
  });
  for (const n of nodes) { n.text = join(n._lines); delete n._lines; delete n._y; }
  // completeness: every table the document prints is read, under a theme and a year, and gives at least one objective
  for (const t of tables) {
    if (!t.theme || !t.year) problems.push(doc.key + ': a table stands under no ' + (!t.theme ? 'theme' : 'year') + ' (' + t.where + ')');
    else if (!t.n) problems.push(doc.key + ': a table gave no objective (' + t.where + ')');
  }
  if (stray.length) problems.push(doc.key + ': ' + stray.length + ' line(s) that look like objectives stand outside every table: ' + stray.slice(0, 6).join(' · '));
  return { nodes, problems, tables: tables.length };
}

(async () => {
  const frameworks = [], nodes = [], problems = [];
  for (const doc of DOCS) {
    const buf = await fetchRaw(REG, doc.file, doc.url);
    const { pages, plain } = sources(doc.file);
    const r = parse(doc, pages);
    problems.push(...r.problems);
    const wanted = doc.kind === 'cycle2' ? YEARS.map((y) => [y[1], y[2], 'cycle 2, ' + y[1]]) : STAGES.slice(1).map((s) => [s[1], s[2], s[1] === 'M4' ? 'école maternelle, à partir de 4 ans' : 'école maternelle, à partir de 5 ans']);
    const kept = r.nodes.filter((n) => wanted.some((w) => n.parent === doc.letter + '.' + w[0]));
    const plainFlat = flat(plain);
    const notFound = kept.filter((n) => !plainFlat.includes(flat(n.text).slice(0, 14))).map((n) => n.id);
    if (notFound.length) problems.push(doc.key + ': ' + notFound.length + ' objective(s) do not begin as any line of a second reading: ' + notFound.slice(0, 15).join(', '));
    for (const [code, grade, label] of wanted) {
      const mine = kept.filter((n) => n.parent === doc.letter + '.' + code);
      if (!mine.length) problems.push(doc.key + ': no objective read for ' + code);
      nodes.push({ id: doc.letter + '.' + code, f: doc.key, kind: 'area', grade, text: doc.title + ' — ' + label }, ...mine);
    }
    for (const n of kept) { if (n.text.length < 12) problems.push(n.id + ': wording too short: "' + n.text + '"'); if (!/^[A-ZÉÈÀÂÊÎÔÛÇ]/.test(n.text)) problems.push(n.id + ': an objective that does not open with a capital: "' + n.text.slice(0, 40) + '"'); }
    frameworks.push({ key: doc.key, short: 'Programmes', subject: doc.subject, title: doc.title, publisher: 'Ministère de l’Éducation nationale (Bulletin officiel de l’éducation nationale)', year: '2024', officialDocument: 'https://www.education.gouv.fr/bo/2024/Hebdo41/MENE2415135A', readFrom: doc.url, accessed: ACCESSED, sha256: sha256(buf),
      version: doc.bo + '; in force from the rentrée 2025', band: doc.kind === 'cycle2' ? 'single years: CP (1), CE1 (2), CE2 (3)' : 'the programme speaks of ages: from 4 (M4), from 5 (M5, the year before CP)', ids: 'this registry\'s own (the programme numbers nothing): document, year, place in the year; `domain` is the theme and the part the objective stands under',
      citation: doc.title + '. ' + doc.bo + '.', checkedAgainstPdf: kept.length + ' objectives read from the left column of ' + r.tables + ' tables (the examples of the right column are not read); every table the document prints stands under a theme and a year and gives at least one objective, also the tables printed without a header row; no line that looks like an objective stands outside a table; each objective begins as a printed line of a second reading of the PDF' });
  }
  // histoire-géographie: each theme prints a table "Objectifs d'apprentissage": the "Attendus (connaissances et
  // compétences)" as dash items in TWO columns side by side (read down the first, then down the second) and, to their
  // right, the "Repères" (dates and names to know: not read). A theme is a node, and each attendu a node under it.
  {
    const doc = HISTGEO;
    const buf = await fetchRaw(REG, doc.file, doc.url);
    const { pages, plain } = sources(doc.file);
    // where the columns stand, from the document itself: the second column of attendus begins where its dashes
    // stand; the Repères begin where most lines right of it begin
    const mode = (xs) => { const c = new Map(); for (const x of xs) { const k = Math.round(x); c.set(k, (c.get(k) || 0) + 1); } return [...c].sort((p, q) => q[1] - p[1])[0]; };
    const allWords = pages.flatMap((p) => p.words);
    const bDash = mode(allWords.filter((w) => (w[4] === '-' || w[4] === '–') && w[0] > 150 && w[0] < 330).map((w) => w[0]));
    const rStartM = bDash ? mode(allWords.filter((w) => w[0] > bDash[0] + 120 && w[0] < bDash[0] + 230).map((w) => w[0])) : null;
    if (!bDash || !rStartM || bDash[1] < 20) problems.push(doc.key + ': the two columns of attendus were not found');
    const bStart = bDash ? bDash[0] - 3 : 0, rStart = rStartM ? rStartM[0] - 2 : 9999;
    let disc = null, year = null, n = 0, theme = null, title = null, inTable = false, colA = [], colB = [], curA = null, curB = null;
    const mine = [];
    const flush = () => {
      if (theme) [...colA, ...colB].forEach((lines, i) => mine.push({ id: theme.id + '.' + (i + 1), f: doc.key, kind: 'standard', grade: theme.grade, parent: theme.id, text: join(lines) }));
      colA = []; colB = []; curA = curB = null; inTable = false;
    };
    for (const p of pages) for (const r of rowsOf(p, 330)) {
      if (r.y > p.height - 30) continue;
      const first = r.words[0], allBold = r.words.every((w) => w[5]);
      if (first[0] <= 45 && first[6] >= 13 && /^(Histoire|Géographie)$/.test(r.text)) { flush(); theme = null; disc = r.text; year = null; title = null; continue; }
      const y = first[0] <= 45 && allBold && first[6] >= 10.5 ? YEARS.find(([re]) => re.test(r.text)) : null;
      if (y && disc) { flush(); theme = null; year = y; n = 0; title = null; if (!mine.some((x) => x.id === doc.letter + '.' + y[1])) mine.push({ id: doc.letter + '.' + y[1], f: doc.key, kind: 'area', grade: y[2], text: doc.title + ' — ' + y[1] }); continue; }
      if (!disc || !year) continue;
      if (first[0] <= 45 && allBold && /^Thème \d+ :/.test(r.text)) {
        flush();
        theme = { id: doc.letter + '.' + year[1] + '.' + (disc === 'Histoire' ? 'H' : 'G') + (++n), f: doc.key, kind: 'subarea', grade: year[2], parent: doc.letter + '.' + year[1], domain: disc, text: r.text };
        mine.push(theme); title = theme;
        continue;
      }
      if (first[0] <= 45 && allBold && title && first[6] >= 9.5 && first[6] < 10.5) { title.text += ' ' + r.text; continue; }   // a theme's title that runs on to a second line
      title = null;
      if (!theme) continue;
      if (allBold && /Attendus/.test(r.text)) { inTable = true; continue; }   // the table's header
      if (allBold) continue;                                                  // the rest of the header ("compétences)")
      if (first[0] <= 37.5 && !/^[-–]$/.test(first[4])) { if (/^Mots-clés/.test(r.text)) flush(); continue; }   // "Question : …", "Mots-clés : …", a paragraph
      if (!inTable) continue;
      const A = r.words.filter((w) => w[0] < bStart), B = r.words.filter((w) => w[0] >= bStart && w[0] < rStart);
      for (const [ws, col, which] of [[A, colA, 'A'], [B, colB, 'B']]) {
        if (!ws.length) continue;
        const dash = ws[0][4] === '-' || ws[0][4] === '–';
        const text = ws.slice(dash ? 1 : 0).map((w) => w[4]).join(' ');
        if (dash) { const lines = [text]; col.push(lines); if (which === 'A') curA = lines; else curB = lines; }
        else { const cur = which === 'A' ? curA : curB; if (cur) cur.push(text); }
      }
    }
    flush();
    const themes = mine.filter((x) => x.kind === 'subarea'), attendus = mine.filter((x) => x.kind === 'standard');
    for (const [, code] of YEARS) for (const d of ['H', 'G']) if (!themes.some((x) => x.id.startsWith(doc.letter + '.' + code + '.' + d))) problems.push(doc.key + ': no theme read for ' + code + ' (' + d + ')');
    for (const t of themes) if (attendus.filter((x) => x.parent === t.id).length < 2) problems.push(t.id + ' ("' + t.text.slice(0, 50) + '"): fewer than two attendus read');
    const plainFlat = flat(plain);
    for (const x of attendus) {
      if (x.text.length < 12 || !/^[A-ZÉÈÀÂÊÎÔÛÇ]/.test(x.text)) problems.push(x.id + ': not a full statement: "' + x.text.slice(0, 50) + '"');
      else if (!plainFlat.includes(flat(x.text).slice(0, 14))) problems.push(x.id + ': does not begin as any line of a second reading: "' + x.text.slice(0, 40) + '"');
    }
    // the document prints every attendu as a line that opens with a dash: the count of such lines under the themes is the count read
    for (const [, code] of YEARS) { const a = mine.find((x) => x.id === doc.letter + '.' + code); if (a) nodes.push(a, ...themes.filter((x) => x.parent === a.id).flatMap((t) => [t, ...attendus.filter((x) => x.parent === t.id)])); }
    frameworks.push({ key: doc.key, short: 'Programmes', subject: doc.subject, title: doc.title, publisher: 'Ministère de l’Éducation nationale (Bulletin officiel de l’éducation nationale)', year: '2026', officialDocument: doc.url, readFrom: doc.url, accessed: ACCESSED, sha256: sha256(buf),
      version: doc.bo + '; listed by the Ministry among the cycle 2 programmes of the rentrée 2026', band: 'single years: CP (1), CE1 (2), CE2 (3)', ids: 'this registry\'s own: year, H (histoire) or G (géographie), the theme\'s own number, then the place of the attendu in its theme',
      citation: doc.title + '. ' + doc.bo + '.', checkedAgainstPdf: themes.length + ' themes and ' + attendus.length + ' attendus read (the two columns of "Attendus (connaissances et compétences)"; the "Repères" beside them are not read); every theme holds at least two attendus; each begins as a printed line of a second reading of the PDF' });
  }

  // Science. The cycle 2 programme "Sciences et technologie" of 2026 is published as a scan (no text to read). What
  // the Ministry still lists beside it for the rentrée 2026 is the part "Questionner le monde du vivant, de la matière
  // et des objets" of the cycle 2 programme of 2020: its "attendus de fin de cycle" and, from its tables, the left
  // column "Connaissances et compétences associées".
  {
    const doc = { key: 'programme-2020-questionner-le-monde', letter: 'QM', file: 'c2-2020.pdf', url: 'https://cache.media.education.gouv.fr/file/31/88/5/ensel714_annexe1_1312885.pdf' };
    const buf = await fetchRaw(REG, doc.file, doc.url);
    const { pages } = sources(doc.file);
    const mine = [];
    let on = false, section = null, sNo = 0, mode = null, border = 0, cur = null, a = 0, c = 0, done = false;
    for (const p of pages) {
      if (done) break;
      for (const r of rowsOf(p)) {
        if (r.y > p.height - 70 && /Ministère/.test(r.text)) continue;
        const first = r.words[0], allBold = r.words.some((w) => w[5]) && r.words.every((w) => w[5] || !/[A-Za-zÀ-ÿ0-9]/.test(w[4]));   // a bullet sign before a bold title is not set in bold
        if (first[6] >= 13) { if (/^Questionner le monde du vivant, de la matière et des objets/.test(r.text)) { on = true; continue; } if (on) { done = true; break; } }
        if (!on) continue;
        const exemples = r.words.find((w) => w[4] === 'Exemples' && w[5]);
        if (exemples) border = exemples[0] - 8;
        if (allBold) {
          const t = r.words.filter((w) => w[5]).map((w) => w[4]).join(' ');
          if (/\?$/.test(t) && first[0] < 95 && section && !mine.some((n) => n.parent === section.id)) { section.text += ' ' + t; continue; }   // a title of two lines
          if (/\?$/.test(t) && first[0] < 95) { section = { id: doc.letter + '.' + (++sNo), f: doc.key, kind: 'area', grade: '1-3', text: t }; mine.push(section); mode = null; cur = null; a = c = 0; continue; }
          if (/^Attendus de fin de cycle/.test(t)) { mode = 'attendus'; cur = null; continue; }
          if (/Connaissances et compétences associées/.test(t)) { mode = 'table'; cur = null; continue; }
          if (/^Repères de progressivité/.test(t)) { mode = null; cur = null; continue; }
          if (mode === 'table') cur = null;   // the attendu repeated as a title across the table, or the rest of the header
          continue;
        }
        if (!section || !mode) continue;
        if (mode === 'attendus') {
          const dash = r.words[0][4] === '-';
          const text = r.words.slice(dash ? 1 : 0).map((w) => w[4]).join(' ');
          if (dash) { cur = { id: section.id + '.A' + (++a), f: doc.key, kind: 'standard', grade: '1-3', parent: section.id, text: '', _lines: [text] }; mine.push(cur); } else if (cur) cur._lines.push(text);
          continue;
        }
        const left = r.words.filter((w) => w[0] < border);
        if (!left.length) continue;
        const dash = left[0][4] === '-';
        const text = left.slice(dash ? 1 : 0).map((w) => w[4]).join(' ');
        const ended = !cur || /[.!?]$/.test(cur._lines[cur._lines.length - 1].trim());
        if (dash || (left[0][0] < 78 && ended)) { cur = { id: section.id + '.C' + (++c), f: doc.key, kind: 'content', grade: '1-3', parent: section.id, text: '', _lines: [text] }; mine.push(cur); } else if (cur) cur._lines.push(text);
      }
    }
    for (const n of mine) if (n._lines) { n.text = join(n._lines); delete n._lines; }
    if (mine.filter((n) => n.kind === 'area').length < 3) problems.push(doc.key + ': fewer than three sections read');
    for (const s of mine.filter((n) => n.kind === 'area')) { if (!mine.some((n) => n.parent === s.id && n.kind === 'standard')) problems.push(s.id + ' ("' + s.text + '"): no attendu de fin de cycle read'); if (!mine.some((n) => n.parent === s.id && n.kind === 'content')) problems.push(s.id + ': nothing read from its table'); }
    for (const n of mine) if (n.kind !== 'area' && (n.text.length < 12 || !/^[A-ZÉÈÀÂÊÎÔÛÇ]/.test(n.text))) problems.push(n.id + ': not a full statement: "' + n.text.slice(0, 50) + '"');
    nodes.push(...mine);
    frameworks.push({ key: doc.key, short: 'Programmes', subject: 'science', title: 'Programme du cycle 2 (2020), Questionner le monde du vivant, de la matière et des objets', publisher: 'Ministère de l’Éducation nationale (Bulletin officiel de l’éducation nationale)', year: '2020', officialDocument: doc.url, readFrom: doc.url, accessed: ACCESSED, sha256: sha256(buf),
      version: 'BO n° 31 du 30 juillet 2020; for the rentrée 2026 the Ministry lists it beside the new programme "Sciences et technologie" (BO n° 24 du 11 juin 2026), which is published as a scan and could not be read', band: 'the cycle 2 as a whole (CP to CE2): 1-3', ids: 'this registry\'s own: section, A (attendu de fin de cycle) or C (connaissances et compétences associées), place',
      citation: 'Programme du cycle 2, en vigueur à la rentrée 2020. BO n° 31 du 30 juillet 2020.', checkedAgainstPdf: mine.filter((n) => n.kind === 'standard').length + ' attendus de fin de cycle and ' + mine.filter((n) => n.kind === 'content').length + ' statements of the left column read, in ' + mine.filter((n) => n.kind === 'area').length + ' sections' });
  }
  const seen = new Set();
  for (const n of nodes) { if (seen.has(n.id)) problems.push('two nodes share the id ' + n.id); seen.add(n.id); }
  if (process.argv.includes('--list')) for (const n of nodes) console.log((n.kind === 'area' ? '' : '    ') + n.id + ' [' + n.grade + ']  ' + (n.domain ? '(' + n.domain + ') ' : '') + n.text);
  const cw = crosswalkFromAuthored(REG, nodes);
  problems.push(...cw.problems);
  for (const m of problems.slice(0, 50)) console.log('FAIL  ' + m);
  const framework = { $comment: 'GENERATED by scripts/curricula/build-fr.js from the annexes of the Bulletin officiel named under `frameworks`. The wording of every node is the programme\'s own; it is stored for reference and is never shown to a visitor as a quotation. The ids are this registry\'s. Do not edit by hand.', locale: 'fr', country: 'FR', frameworks, nodes };
  const crosswalk = cw.rows ? { $comment: 'GENERATED by scripts/curricula/build-fr.js from crosswalk-authored.json (written from the official text by reviewers who teach in a French école primaire): every teaching point → the objectives it teaches, prepares or extends, with the year of each.', locale: 'fr', points: cw.rows } : null;
  let diff = 0;
  if (!problems.length) diff = writeRegistry(REG, framework, crosswalk, process.argv.includes('--check'));
  const by = {};
  for (const n of nodes) by[n.f + ' ' + n.kind] = (by[n.f + ' ' + n.kind] || 0) + 1;
  console.log('fr framework: ' + nodes.length + ' nodes (' + Object.entries(by).map(([k, v]) => k + ' ' + v).join(', ') + ')');
  console.log(cw.rows ? 'fr crosswalk: ' + cw.authored + ' points mapped, ' + cw.none + ' with no counterpart' : 'fr: no crosswalk yet');
  if (problems.length || diff) { console.log((problems.length + diff) + ' problem(s)'); process.exit(1); }
})().catch((e) => { console.error(e.stack || e.message); process.exit(1); });
