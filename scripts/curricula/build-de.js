#!/usr/bin/env node
/**
 * The German national registry (Daily Teaching System, Part 2): the Bildungsstandards of the Kultusministerkonferenz
 * for the Primarbereich, Deutsch and Mathematik (resolution of 15.10.2004 in the version of 23.06.2022).
 *
 *   node scripts/curricula/build-de.js            → frontend/content/curricula/de/framework.json (+ crosswalk.json when
 *                                                   crosswalk-authored.json exists)
 *   node scripts/curricula/build-de.js --check
 *   node scripts/curricula/build-de.js --list     prints every node, for reading
 *
 * Nothing is written from memory: the wording is parsed from the KMK's own PDFs (fetched into out/curricula/de/).
 * The standards say what a child can do AT THE END OF GRADE 4; they place nothing in a single grade (the Länder do
 * that: see the state registries de-by, de-nw, de-sn). Every node therefore carries the band "1-4".
 *
 * The documents number only their chapters. The ids are this registry's, in the order of the document:
 *   D.2        Deutsch, Kompetenzbereich 4.2 (Schreiben)            kind area
 *   D.2.3      its third group of standards                        kind subarea
 *   D.2.3.4    the fourth standard (bullet) of that group          kind standard
 *   M.P.…      Mathematik, prozessbezogene Kompetenzen (chapter 3)
 *   M.1.… to M.5.…  Mathematik, the five Leitideen of chapter 4
 * A teacher is shown the framework's name and the title of the area, never these ids as if they were official.
 *
 * Checks: every standard's wording is found again in a second, independent reading of the same PDF (pdftotext's
 * layout mode); the number of bullets in the standards chapters equals the number of standard nodes.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { REPO, sha256, crosswalkFromAuthored, writeRegistry, fetchRaw, pdfText, flat, inPdf } = require('./lib.js');
const REG = 'de';
const ACCESSED = '2026-11-11';
const BASE = 'https://www.kmk.org/fileadmin/veroeffentlichungen_beschluesse/2022/';
const DOCS = [
  { key: 'kmk-deutsch', letter: 'D', subject: 'ela', pdf: '2022_06_23-Bista-Primarbereich-Deutsch.pdf',
    title: 'Bildungsstandards für das Fach Deutsch Primarbereich',
    start: /^4\. Standards für die Kompetenzbereiche des Faches Deutsch$/, stop: /^5\. Anhang$/,
    area: (l) => { const m = /^4\.(\d) (.+)$/.exec(l); return m ? { no: m[1], title: m[2] } : null; } },
  { key: 'kmk-mathematik', letter: 'M', subject: 'math', pdf: '2022_06_23-Bista-Primarbereich-Mathe.pdf',
    title: 'Bildungsstandards für das Fach Mathematik Primarbereich',
    start: /^3\. Prozessbezogene Kompetenzen$/, stop: null,
    area: (() => { let k = 0; return (l) => (/^3\. Prozessbezogene Kompetenzen$/.test(l) ? { no: 'P', title: 'Prozessbezogene Kompetenzen' } : /^Leitidee /.test(l) && l.length < 80 ? { no: String(++k), title: l } : null); })() },
];
const INTRO = /^Die Schülerinnen und Schüler(?:\s*$|\s+(?=•))/;
const furniture = (l) => !l || /^Seite \d+$/.test(l) || /^\d+$/.test(l) || /^\d+ (?:Redaktionelle|Die illustrierenden)/.test(l) || /^Abbildung \d+:/.test(l);
/** a line that names a group of standards: short, opens with a capital, no bullet, no closing punctuation */
const isHeading = (l) => l.length < 90 && /^[A-ZÄÖÜ]/.test(l) && !l.includes('•') && !/[.,;:)\-–]$/.test(l) && !/^Die Schülerinnen/.test(l) && !/^\d+\.\s/.test(l) && l.split(' ').length <= 12;

function parse(doc, raw) {
  const nodes = [], problems = [];
  const all = raw.split('\n').map((l) => l.replace(/\f/g, '').trim());
  let from = all.findIndex((l) => doc.start.test(l));
  // the table of contents names the chapter too: the last match is the chapter itself
  for (let i = from + 1; i < all.length; i++) if (doc.start.test(all[i])) from = i;
  let to = doc.stop ? all.findIndex((l, i) => i > from && doc.stop.test(l)) : all.length;
  if (from < 0 || to < 0) { problems.push(doc.key + ': the standards chapter was not found in the PDF\'s text'); return { nodes, problems, bullets: 0 }; }
  const lines = all.slice(from, to).filter((l) => !furniture(l));
  const bullets = lines.join(' ').split('•').length - 1;
  let area = null, group = null, heading = null, sub = null, subNo = 0, buf = null;
  const close = () => {
    if (buf === null) return;
    // a word the PDF broke at a line end ("Nachfra-" / "gen") is put together again
    const text = buf.join('\n').replace(/([a-zäöüß])[-‐]\n([a-zäöüß])/g, '$1$2').replace(/\n/g, ' ').replace(/\s+/g, ' ');
    const parts = text.split('•').map((s) => s.trim());
    if (parts[0]) problems.push(sub.id + ': text before its first bullet: "' + parts[0].slice(0, 60) + '"');
    parts.slice(1).forEach((t, i) => nodes.push({ id: sub.id + '.' + (i + 1), f: doc.key, kind: 'standard', grade: '1-4', parent: sub.id, text: t.replace(/,$/, '').trim() }));
    if (parts.length < 2) problems.push(sub.id + ' ("' + sub.text + '"): no bullet under it');
    buf = null;
  };
  for (const l of lines) {
    const a = doc.area(l);
    if (a) { close(); area = { id: doc.letter + '.' + a.no, f: doc.key, kind: 'area', grade: '1-4', text: a.title }; nodes.push(area); group = heading = null; subNo = 0; continue; }
    if (/^\d+\.\s[A-ZÄÖÜ]/.test(l)) { close(); area = null; continue; }   // another chapter
    if (!area) continue;
    if (INTRO.test(l)) {
      close();
      if (!heading) { problems.push(area.id + ': a list of standards without a title before it'); continue; }
      sub = { id: area.id + '.' + (++subNo), f: doc.key, kind: 'subarea', grade: '1-4', parent: area.id, text: (group ? group + ' — ' : '') + heading };
      nodes.push(sub);
      heading = null;
      buf = [l.replace(INTRO, '')];
      continue;
    }
    if (isHeading(l)) {
      close();
      if (heading) group = heading;   // a title that was followed by another title and no list names the group
      heading = l;
      continue;
    }
    if (buf !== null) buf.push(l);
  }
  close();
  return { nodes, problems, bullets };
}

(async () => {
  const frameworks = [], nodes = [], problems = [];
  for (const doc of DOCS) {
    const buf = await fetchRaw(REG, doc.pdf, BASE + doc.pdf);
    const r = parse(doc, pdfText(REG, doc.pdf));
    problems.push(...r.problems);
    const stds = r.nodes.filter((n) => n.kind === 'standard');
    if (stds.length !== r.bullets) problems.push(doc.key + ': the chapter holds ' + r.bullets + ' bullets, the registry ' + stds.length + ' standards');
    // a second reading of the same PDF (layout mode keeps each printed line): every standard must be found in it
    const layout = path.join(REPO, 'out', 'curricula', REG, doc.pdf.replace(/\.pdf$/, '.layout.txt'));
    if (!fs.existsSync(layout)) require('child_process').execFileSync('pdftotext', ['-enc', 'UTF-8', '-layout', path.join(REPO, 'out', 'curricula', REG, doc.pdf), layout], { stdio: 'ignore' });
    const layoutFlat = flat(fs.readFileSync(layout, 'utf8'));
    let found = 0, partly = 0;
    const notFound = [];
    for (const n of stds) { const hit = inPdf(layoutFlat, n.text); if (!hit) notFound.push(n.id); else { found++; if (hit === 1) partly++; } }
    if (notFound.length) problems.push(doc.key + ': not found in the second reading of the PDF: ' + notFound.join(', '));
    // The PDF prints ½ and ¼ as stacked fractions; its text gives "1 m, Dreiviertelstunde, 1 l" with the denominators
    // "2" and "4" on the line below. The fractions are put back only where the layout reading shows exactly that.
    if (doc.letter === 'M') {
      const stacked = /1 m, Dreiviertelstunde, 1 l\)\.\s*\n\s*2\s+4\s*\n/.test(fs.readFileSync(layout, 'utf8').replace(/\r\n/g, '\n'));
      const n = stds.find((x) => x.text.includes('1 m, Dreiviertelstunde, 1 l'));
      if (stacked && n) { n.text = n.text.replace('1 m, Dreiviertelstunde, 1 l', '1/2 m, Dreiviertelstunde, 1/4 l'); n.wordingFrom = 'the PDF, whose stacked fractions ½ and ¼ its text loses (the denominators stand on the line below)'; }
      else problems.push(doc.key + ': the standard with the stacked fractions (½ m, ¼ l) was not found as expected');
    }
    const head = pdfText(REG, doc.pdf).slice(0, 400);
    const version = (/\(Beschluss der Kultusministerkonferenz[^)]*\)/.exec(head) || [''])[0].replace(/[()]/g, '');
    if (!version) problems.push(doc.key + ': the PDF does not name its resolution');
    frameworks.push({ key: doc.key, short: 'Bildungsstandards (KMK)', subject: doc.subject, title: doc.title, publisher: 'Sekretariat der Ständigen Konferenz der Kultusminister der Länder in der Bundesrepublik Deutschland (KMK)', year: '2022', officialDocument: BASE + doc.pdf, readFrom: BASE + doc.pdf, accessed: ACCESSED, sha256: sha256(buf),
      version, band: 'what a child can do at the end of grade 4; the document places nothing in a single grade', ids: 'this registry\'s own (the document numbers only its chapters): area, group of standards, standard, in the order of the document',
      citation: doc.title + '. ' + version + '. Kultusministerkonferenz.', checkedAgainstPdf: found + ' of ' + stds.length + ' standards found in a second reading of the PDF' + (partly ? ' (' + partly + ' by their beginning only: a page break interrupts the rest)' : '') + '; the chapter\'s ' + r.bullets + ' bullets are all there' });
    nodes.push(...r.nodes);
  }
  const seen = new Set();
  for (const n of nodes) { if (seen.has(n.id)) problems.push('two nodes share the id ' + n.id); seen.add(n.id); if (n.kind === 'standard' && n.text.length < 12) problems.push(n.id + ': wording too short to be a standard: "' + n.text + '"'); }
  if (process.argv.includes('--list')) { for (const n of nodes) console.log((n.kind === 'standard' ? '    ' : n.kind === 'subarea' ? '  ' : '') + n.id + '  ' + n.text); }
  const cw = crosswalkFromAuthored(REG, nodes);
  problems.push(...cw.problems);
  for (const m of problems.slice(0, 50)) console.log('FAIL  ' + m);
  const framework = { $comment: 'GENERATED by scripts/curricula/build-de.js from the KMK\'s PDFs named under `frameworks`. The wording of every node is the document\'s own; it is stored for reference and is never shown to a visitor as a quotation. The ids are this registry\'s. Do not edit by hand.', locale: 'de', country: 'DE', frameworks, nodes };
  const crosswalk = cw.rows ? { $comment: 'GENERATED by scripts/curricula/build-de.js from crosswalk-authored.json (written from the official text by reviewers who teach in a German Grundschule): every teaching point → the standards it teaches, prepares or extends. The standards describe the end of grade 4; the grade of a skill is in the state registries.', locale: 'de', points: cw.rows } : null;
  let diff = 0;
  if (!problems.length) diff = writeRegistry(REG, framework, crosswalk, process.argv.includes('--check'));
  const by = {};
  for (const n of nodes) by[n.f + ' ' + n.kind] = (by[n.f + ' ' + n.kind] || 0) + 1;
  console.log('de framework: ' + nodes.length + ' nodes (' + Object.entries(by).map(([k, v]) => k + ' ' + v).join(', ') + ')');
  for (const f of frameworks) console.log('  ' + f.key + ': ' + f.checkedAgainstPdf + ' — ' + f.version);
  console.log(cw.rows ? 'de crosswalk: ' + cw.authored + ' points mapped, ' + cw.none + ' with no counterpart' : 'de: no crosswalk yet');
  if (problems.length || diff) { console.log((problems.length + diff) + ' problem(s)'); process.exit(1); }
})().catch((e) => { console.error(e.message); process.exit(1); });
