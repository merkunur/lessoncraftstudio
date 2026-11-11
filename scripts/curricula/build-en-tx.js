#!/usr/bin/env node
/**
 * The Texas layer of the US registry (Daily Teaching System, Part 2; decided 2026-11-11: Texas straight after the
 * national registry, because Texas does not use the Common Core or the NGSS): the Texas Essential Knowledge and
 * Skills (TEKS) for Mathematics, for English Language Arts and Reading and for Science, kindergarten to grade 5.
 *
 *   node scripts/curricula/build-en-tx.js            → frontend/content/curricula/en-tx/framework.json (+ crosswalk.json
 *                                                      when crosswalk-authored.json exists)
 *   node scripts/curricula/build-en-tx.js --check
 *
 * Nothing is written from memory. The wording and the numbering are read from the machine-readable copies of the
 * Texas Administrative Code kept by the Achievement Standards Network (one JSON per document, fetched into
 * out/curricula/en-tx/ on first run), and EVERY statement is then looked for in the Texas Education Agency's own PDF
 * of the same chapter, inside the section of its own grade. (The PDFs alone cannot be parsed: their text comes out
 * with the outline numbers detached from their statements.) A statement the PDF does not hold fails the build unless
 * the PDF's current wording is given in PDF_WORDING below.
 *
 * The documents are a legal outline:
 *   (2) Number and operations. The student …       a knowledge-and-skills statement   → node K.2      (kind strand)
 *   (A) count forward and backward to at least 20  a student expectation              → node K.2.A    (kind standard)
 *   (i) …                                          a part of an expectation           → node ELAR.K.2.A.i (component)
 * Mathematics ids are written as Texas teachers write them (K.2.A); reading ids carry ELAR. and science ids SCI. in
 * front, because all three documents number from (1).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { REPO, sha256, crosswalkFromAuthored, writeRegistry, fetchRaw, pdfText, flat, inPdf } = require('./lib.js');
const REG = 'en-tx';
const ACCESSED = '2026-11-11';
const ASN = 'https://asn.desire2learn.com/resources/';
const DOCS = [
  { key: 'teks-math', prefix: '', chapter: '111', pdf: 'ch111a.pdf', pdfUrl: 'https://tea.texas.gov/laws-and-rules/sboe-rules-tac/sboe-tac-currently-effect/ch111a.pdf', subject: 'math', asn: ['D2486388'],
    title: 'Texas Essential Knowledge and Skills for Mathematics, Subchapter A. Elementary (19 TAC Chapter 111)' },
  { key: 'teks-elar', prefix: 'ELAR.', chapter: '110', pdf: 'ch110a.pdf', pdfUrl: 'https://tea.texas.gov/laws-and-rules/sboe-rules-tac/sboe-tac-currently-effect/ch110a.pdf', subject: 'ela', asn: ['D2845647', 'D2845648', 'D2845649', 'D2845650', 'D2845651', 'D2845652'],
    title: 'Texas Essential Knowledge and Skills for English Language Arts and Reading, Subchapter A. Elementary (19 TAC Chapter 110)' },
  { key: 'teks-science', prefix: 'SCI.', chapter: '112', pdf: 'ch112a.pdf', pdfUrl: 'https://tea.texas.gov/laws-and-rules/sboe-rules-tac/sboe-tac-currently-effect/ch112a.pdf', subject: 'science', asn: ['D21312410', 'D21312460', 'D21312517', 'D21312575', 'D21312634', 'D21312690'],
    title: 'Texas Essential Knowledge and Skills for Science, Subchapter A. Elementary (19 TAC Chapter 112)' },
];
const GRADE = { Kindergarten: 'K', 'Grade 1': '1', 'Grade 2': '2', 'Grade 3': '3', 'Grade 4': '4', 'Grade 5': '5' };
/** where the PDF and the machine-readable copy differ, the PDF wins: see the file's own comment */
const PDF_WORDING = require('./en-tx-pdf-wording.json');
const A = 'http://purl.org/ASN/schema/core/', DC = 'http://purl.org/dc/terms/';
const val = (o, k) => (o[k] && o[k][0] ? o[k][0].value : null);

/** the PDF's text cut into the sections of the six grades: { K: flat text, '1': … } */
function gradeSections(doc, raw) {
  const re = new RegExp('§' + doc.chapter + '\\.\\d+\\.\\s+(?:[A-Z][A-Za-z ,]*?, )?(Kindergarten|Grade [1-5]), Adopted (\\d{4})\\.', 'g');
  const any = new RegExp('§' + doc.chapter + '\\.\\d+\\.\\s+[A-Z]', 'g');
  const starts = [];
  let m;
  while ((m = re.exec(raw))) starts.push({ at: m.index, grade: GRADE[m[1]], adopted: m[2] });
  const cuts = [];
  while ((m = any.exec(raw))) cuts.push(m.index);
  const out = {}, rawOut = {}, adopted = new Set();
  for (const s of starts) {
    const end = cuts.find((c) => c > s.at) || raw.length;
    // the table of contents names each section too: the longest run is the section itself
    const body = flat(raw.slice(s.at, end));
    if (!out[s.grade] || body.length > out[s.grade].length) { out[s.grade] = body; rawOut[s.grade] = raw.slice(s.at, end); }
    adopted.add(s.adopted);
  }
  return { sections: out, rawSections: rawOut, adopted: [...adopted] };
}

(async () => {
  const frameworks = [], nodes = [], problems = [];
  for (const doc of DOCS) {
    const hashes = [];
    const mine = [];
    let valid = null, source = null;
    for (const d of doc.asn) {
      const buf = await fetchRaw(REG, d + '.json', ASN + d + '_full.json');
      hashes.push(sha256(buf));
      const j = JSON.parse(buf.toString('utf8'));
      const root = j['http://asn.desire2learn.com/resources/' + d];
      if (!root || !/\/TX$/.test(val(root, A + 'jurisdiction') || '')) { problems.push(doc.key + ': ' + d + ' is not a Texas document'); continue; }
      valid = val(root, DC + 'valid'); source = val(root, DC + 'source');
      for (const o of Object.values(j)) {
        const notation = val(o, A + 'statementNotation');
        const m = notation && /^(K|[1-5])\.(\d+)(?:\.([A-Z]))?(?:\.([ivx]+))?$/.exec(notation);
        if (!m) continue;   // grades 6 and up, headings
        const level = (o[DC + 'educationLevel'] || []).map((x) => x.value.split('/').pop());
        if (level.length !== 1 || level[0] !== m[1]) { problems.push(doc.key + ' ' + notation + ': the source places it in grade ' + level.join(',')); continue; }
        const text = (val(o, DC + 'description') || '').replace(/\s+/g, ' ').trim();
        if (text.length < 3) { problems.push(doc.key + ' ' + notation + ': no wording in the source'); continue; }
        const id = doc.prefix + notation;
        mine.push({ id, f: doc.key, kind: m[4] ? 'component' : m[3] ? 'standard' : 'strand', grade: m[1], parent: m[3] ? doc.prefix + notation.split('.').slice(0, -1).join('.') : undefined, text });
      }
    }
    // statements the copy lost, written out from the PDF (and looked for in it below, like every other)
    for (const a of PDF_WORDING.added) {
      const m = /^([A-Z]+\.)?(K|[1-5])\.(\d+)(?:\.([A-Z]))?(?:\.([ivx]+))?$/.exec(a.id);
      if (!m) { problems.push('en-tx-pdf-wording.json: ' + a.id + ' is not an id'); continue; }
      if ((m[1] || '') !== doc.prefix) continue;
      if (mine.some((n) => n.id === a.id)) { problems.push('en-tx-pdf-wording.json: ' + a.id + ' is in the copy; it is not to be added'); continue; }
      mine.push({ id: a.id, f: doc.key, kind: m[5] ? 'component' : m[4] ? 'standard' : 'strand', grade: m[2], parent: m[4] ? a.id.split('.').slice(0, -1).join('.') : undefined, text: a.text, wordingFrom: 'the Agency\'s PDF (the machine-readable copy does not hold this statement)', added: true });
    }
    const grades = [...new Set(mine.map((n) => n.grade))].sort((a, b) => 'K12345'.indexOf(a) - 'K12345'.indexOf(b));
    if (grades.join('') !== 'K12345') problems.push(doc.key + ': grades read are ' + grades.join(', ') + ' (K to 5 expected)');
    // every statement is looked for in the Agency's PDF, in the section of its own grade
    const pdfBuf = await fetchRaw(REG, doc.pdf, doc.pdfUrl);
    const raw = pdfText(REG, doc.pdf);
    const { sections, rawSections, adopted } = gradeSections(doc, raw);
    const updates = [...new Set((raw.match(/[A-Z][a-z]+ \d{4} Update/g) || []))];
    let found = 0, partly = 0, corrected = 0, added = 0;
    const notFound = [];
    for (const n of mine) {
      const sec = sections[n.grade];
      if (!sec) { notFound.push(n.id + ' (no section for grade ' + n.grade + ' in the PDF)'); continue; }
      let hit = inPdf(sec, n.text);
      const fixed = PDF_WORDING.wording[n.id];
      if (hit && fixed) problems.push('en-tx-pdf-wording.json: ' + n.id + ' is found in the PDF as the copy words it; the correction is not needed');
      if (!hit && fixed && inPdf(sec, fixed)) { n.wordingFrom = 'the Agency\'s PDF (the machine-readable copy says: ' + n.text.slice(0, 60) + '…)'; n.text = fixed; hit = 3; corrected++; }
      if (n.added) { if (hit) added++; delete n.added; }
      if (!hit) notFound.push(n.id); else { found++; if (hit === 1) partly++; }
    }
    // completeness: in the PDF, after "(b) Knowledge and skills.", every expectation opens a line with its letter and
    // every part with its roman numeral. Their number per grade must be the registry's: a statement the copy lost at
    // the END of a list would otherwise go unseen (the gap check below sees only a hole in the middle).
    for (const g of grades) {
      const sec = rawSections[g] || '';
      const at = sec.indexOf('(b) Knowledge and skills.');
      if (at < 0) { problems.push(doc.key + ' grade ' + g + ': the PDF section has no "(b) Knowledge and skills."'); continue; }
      const body = sec.slice(at);
      const letters = (body.match(/^\([A-Z]\)/gm) || []).length;
      const romans = (body.match(/^\((?:x{0,3}(?:ix|iv|v?i{1,3}|v)|x{1,3})\)/gm) || []).length;
      const haveL = mine.filter((n) => n.grade === g && n.kind === 'standard').length, haveR = mine.filter((n) => n.grade === g && n.kind === 'component').length;
      if (letters !== haveL) problems.push(doc.key + ' grade ' + g + ': the PDF shows ' + letters + ' lettered expectations, the registry holds ' + haveL);
      if (romans !== haveR) problems.push(doc.key + ' grade ' + g + ': the PDF shows ' + romans + ' numbered parts, the registry holds ' + haveR);
    }
    if (notFound.length) problems.push(doc.key + ': ' + notFound.length + ' statement(s) not found in the PDF section of their grade: ' + notFound.slice(0, 40).join(', '));
    frameworks.push({ key: doc.key, short: 'TEKS', subject: doc.subject, title: doc.title, publisher: 'Texas Education Agency / State Board of Education (Texas Administrative Code, Title 19, Part II)', year: valid, officialDocument: doc.pdfUrl, readFrom: doc.asn.map((d) => ASN + d + '_full.json').join(' '), accessed: ACCESSED, sha256: hashes.join(' '), pdfSha256: sha256(pdfBuf),
      version: 'adopted ' + adopted.join(', ') + (updates.length ? '; the PDF is marked "' + updates.join('", "') + '"' : ''), sourceNamedByTheCopy: source, citation: '19 Texas Administrative Code Chapter ' + doc.chapter + ', Subchapter A (Texas Education Agency).',
      checkedAgainstPdf: found + ' of ' + mine.length + ' statements found in the Agency\'s PDF, each in the section of its own grade' + (partly ? ' (' + partly + ' by their beginning only: a page break interrupts the rest)' : '') + (corrected ? '; ' + corrected + ' carry the PDF\'s current wording' : '') + (added ? '; ' + added + ' that the copy lost were taken from the PDF' : '') + '; the number of lettered expectations and of numbered parts of every grade equals the PDF\'s' });
    nodes.push(...mine);
  }
  const seen = new Set();
  for (const n of nodes) { if (seen.has(n.id)) problems.push('two nodes share the id ' + n.id); seen.add(n.id); }
  for (const n of nodes) if (n.parent && !seen.has(n.parent)) problems.push(n.id + ': parent ' + n.parent + ' is not a node');
  // every numbered and lettered list must run without a gap: a statement the copy lost would show here
  const kids = new Map();
  for (const n of nodes) { const k = n.parent || n.f + ' ' + n.grade; if (!kids.has(k)) kids.set(k, []); kids.get(k).push(n); }
  const roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii', 'xiii', 'xiv', 'xv'];
  for (const [k, list] of kids) {
    const last = list.map((n) => n.id.split('.').pop());
    const want = list[0].kind === 'strand' ? last.map((_, i) => String(i + 1)) : list[0].kind === 'standard' ? last.map((_, i) => String.fromCharCode(65 + i)) : last.map((_, i) => roman[i]);
    const have = list[0].kind === 'strand' ? [...last].sort((a, b) => a - b) : list[0].kind === 'standard' ? [...last].sort() : [...last].sort((a, b) => roman.indexOf(a) - roman.indexOf(b));
    if (have.join(' ') !== want.join(' ')) problems.push(k + ': its list runs ' + have.join(' ') + ' (a number or a letter is missing)');
  }
  const order = (n) => [DOCS.findIndex((d) => d.key === n.f), 'K12345'.indexOf(n.grade)];
  nodes.sort((a, b) => { const x = order(a), y = order(b); return x[0] - y[0] || x[1] - y[1] || a.id.localeCompare(b.id, 'en', { numeric: true }); });
  const cw = crosswalkFromAuthored(REG, nodes);
  problems.push(...cw.problems);
  for (const m of problems.slice(0, 50)) console.log('FAIL  ' + m);
  const framework = { $comment: 'GENERATED by scripts/curricula/build-en-tx.js from the machine-readable copies of the Texas Administrative Code named under `frameworks`, every statement checked against the Texas Education Agency\'s PDF. The wording of every node is the document\'s own; it is stored for reference and is never shown to a visitor as a quotation. Do not edit by hand.', locale: 'en', country: 'US', state: 'TX', frameworks, nodes };
  const crosswalk = cw.rows ? { $comment: 'GENERATED by scripts/curricula/build-en-tx.js from crosswalk-authored.json (written from the official text by a reviewer who teaches to the TEKS): every teaching point → the Texas expectations it teaches, prepares or extends, with the Texas grade of each.', locale: 'en', state: 'TX', points: cw.rows } : null;
  let diff = 0;
  if (!problems.length) diff = writeRegistry(REG, framework, crosswalk, process.argv.includes('--check'));
  const by = {};
  for (const n of nodes) by[n.f + ' ' + n.kind] = (by[n.f + ' ' + n.kind] || 0) + 1;
  console.log('en-tx framework: ' + nodes.length + ' nodes (' + Object.entries(by).map(([k, v]) => k + ' ' + v).join(', ') + ')');
  for (const f of frameworks) console.log('  ' + f.key + ': ' + f.checkedAgainstPdf + ' — ' + f.version);
  console.log(cw.rows ? 'en-tx crosswalk: ' + cw.authored + ' points mapped, ' + cw.none + ' with no counterpart' : 'en-tx: no crosswalk yet');
  if (problems.length || diff) { console.log((problems.length + diff) + ' problem(s)'); process.exit(1); }
})().catch((e) => { console.error(e.message); process.exit(1); });
