#!/usr/bin/env node
/**
 * The US registry (Daily Teaching System, Part 2, locale en): the Common Core State Standards for Mathematics and
 * for English Language Arts, and the Next Generation Science Standards, kindergarten to grade 5, as nodes with the
 * official wording — and the crosswalk from every teaching point to them.
 *
 *   node scripts/curricula/build-en.js --fetch     downloads the three source files into out/curricula/en/ (once)
 *   node scripts/curricula/build-en.js             → frontend/content/curricula/en/framework.json + crosswalk.json
 *   node scripts/curricula/build-en.js --check     fails when the committed files differ from the build
 *
 * NOTHING HERE IS WRITTEN FROM MEMORY. The wording of every node is read from the Achievement Standards Network's
 * machine-readable copy of each document (asn.desire2learn.com; each file names the official PDF it was made from,
 * its publisher and its year, and marks every statement "Original"). The builder then checks that wording against
 * the official PDFs of the publisher (CCSSO) where they are present in out/curricula/en/: a statement whose first
 * words are not found in the PDF text is reported.
 *
 * Node ids are the codes teachers use: K.CC.A.1, K.CC.B.4.a (mathematics, with the cluster letter), RF.K.2.a
 * (English language arts; the source writes RF.K.2a), K-LS1-1 (science).
 *
 * The crosswalk is derived from the `code` a teaching point already carries (written by hand in the activities
 * programme's coverage map), read with these rules: a code followed by "readiness" is `prepares`, by "ext." or
 * "extension" is `extends`, otherwise `teaches`; the national grade of a row is the grade of its code. Rows a
 * reviewer corrected live in frontend/content/curricula/en/crosswalk-overrides.json and win over the derived ones.
 * A point whose code names no standard of these three documents is marked `none` with the reason; it is not forced.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const REPO = path.join(__dirname, '..', '..');
const RAW = path.join(REPO, 'out', 'curricula', 'en');
const DIR = path.join(REPO, 'frontend', 'content', 'curricula', 'en');
const ACCESSED = '2026-11-11';

const SOURCES = [
  { key: 'ccss-math', file: 'asn-math.json', url: 'http://asn.desire2learn.com/resources/D10003FB_full.json', pdf: 'Math_Standards1.pdf', pdfUrl: 'https://learning.ccsso.org/wp-content/uploads/2022/11/Math_Standards1.pdf', short: 'Common Core', subject: 'math',
    citation: '© Copyright 2010. National Governors Association Center for Best Practices and Council of Chief State School Officers. All rights reserved.' },
  { key: 'ccss-ela', file: 'asn-ela.json', url: 'http://asn.desire2learn.com/resources/D10003FC_full.json', pdf: 'ELA_Standards1.pdf', pdfUrl: 'https://learning.ccsso.org/wp-content/uploads/2022/11/ELA_Standards1.pdf', short: 'Common Core', subject: 'ela',
    citation: '© Copyright 2010. National Governors Association Center for Best Practices and Council of Chief State School Officers. All rights reserved.' },
  { key: 'ngss', file: 'asn-ngss.json', url: 'http://asn.desire2learn.com/resources/D2454348_full.json', pdf: null, pdfUrl: null, short: 'NGSS', subject: 'science',
    citation: 'NGSS Lead States. 2013. Next Generation Science Standards: For States, By States. Washington, DC: The National Academies Press.' },
];
const GRADES = ['K', '1', '2', '3', '4', '5'];
/** letters and digits only, lower case: what is compared with the PDF's text (which breaks lines, hyphenates and uses typographic quotes) */
const flat = (t) => String(t).toLowerCase().replace(/[^a-z0-9]/g, '');
/**
 * Is this wording in the PDF's text? The ELA document prints two or three grades side by side and its text comes out
 * with the columns' lines interleaved, so a whole statement is rarely one unbroken run. What is asked instead: its
 * first 24 letters and digits are there (0 = not in the PDF: a failure), and for a longer statement an 18-letter run
 * from its middle and one from its end. All three = 3; the beginning and one more = 2; the beginning alone = 1 (a
 * footnote mark or a column break sits inside the other two runs; counted and reported, not failed).
 */
function inPdf(pdfFlat, text) {
  const t = flat(text);
  if (!pdfFlat.includes(t.slice(0, 24))) return 0;
  if (t.length < 60) return 3;
  const mid = Math.floor(t.length / 2) - 9;
  return 1 + (pdfFlat.includes(t.slice(mid, mid + 18)) ? 1 : 0) + (pdfFlat.includes(t.slice(-18)) ? 1 : 0);
}
/** wordings the publisher changed after the machine-readable copy was made; each is applied only if the PDF holds the result */
const PDF_WORDING = [[/^Read on-level /, 'Read grade-level ']];
const A = 'http://purl.org/ASN/schema/core/', DC = 'http://purl.org/dc/terms/';
const val = (o, k) => (o[k] && o[k][0] ? o[k][0].value : null);
const vals = (o, k) => (o[k] || []).map((x) => x.value);

async function fetchAll() {
  fs.mkdirSync(RAW, { recursive: true });
  for (const s of SOURCES) for (const [u, f] of [[s.url, s.file], [s.pdfUrl, s.pdf]]) {
    if (!u || fs.existsSync(path.join(RAW, f))) continue;
    const r = await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; curriculum-reader)' } });
    if (!r.ok) throw new Error(u + ' answered ' + r.status);
    fs.writeFileSync(path.join(RAW, f), Buffer.from(await r.arrayBuffer()));
    console.log('fetched ' + f);
  }
}

/** the id teachers use, from the source's notation; null for statements outside the registry (practices, anchors, grades 6+) */
function idOf(key, notation) {
  if (!notation) return null;
  if (key === 'ccss-math') { const m = /^CCSS\.Math\.Content\.((?:K|[1-5])\.[A-Z]{1,3}(?:\.[A-Z](?:\.\d+)?)?)([a-z])?$/.exec(notation); return m ? m[1] + (m[2] ? '.' + m[2] : '') : null; }
  if (key === 'ccss-ela') { const m = /^CCSS\.ELA-Literacy\.((?:RL|RI|RF|W|SL|L)\.(?:K|[1-5])\.\d+)([a-z])?$/.exec(notation); return m ? m[1] + (m[2] ? '.' + m[2] : '') : null; }
  const m = /^((?:K|[1-5]|K-2|3-5)-(?:PS|LS|ESS|ETS)\d(?:-\d+)?)$/.exec(notation);
  return m ? m[1] : null;
}
const gradeOfId = (id) => { const m = /^(?:[A-Z]{1,2}\.)?(K|[1-5])[.-]/.exec(id) || /^(K|[1-5])-/.exec(id) || /^(K-2|3-5)-/.exec(id); return m ? m[1] : null; };

function buildFramework() {
  const problems = [], nodes = [], frameworks = [];
  for (const s of SOURCES) {
    const file = path.join(RAW, s.file);
    if (!fs.existsSync(file)) throw new Error('missing ' + path.relative(REPO, file) + ': run build-en.js --fetch');
    const buf = fs.readFileSync(file);
    const j = JSON.parse(buf.toString('utf8'));
    const docKey = Object.keys(j).find((k) => /\/D[0-9A-F]+$/.test(k));
    const d = j[docKey];
    // the source writes the title and the publisher in the older Dublin Core namespace, the rest in dc/terms
    const DC11 = 'http://purl.org/dc/elements/1.1/';
    const title = val(d, DC + 'title') || val(d, DC11 + 'title');
    const publisher = (vals(d, DC + 'publisher').length ? vals(d, DC + 'publisher') : vals(d, DC11 + 'publisher')).join('; ');
    if (!title || !publisher) problems.push(s.key + ': the source names no title or no publisher');
    frameworks.push({ key: s.key, short: s.short, subject: s.subject, title, publisher, year: val(d, DC + 'valid'), officialDocument: s.pdfUrl || val(d, DC + 'source'), readFrom: s.url, accessed: ACCESSED, sha256: crypto.createHash('sha256').update(buf).digest('hex'), rights: val(d, DC + 'rights'), citation: s.citation });
    const idByUri = new Map();
    for (const k of Object.keys(j)) { const id = idOf(s.key, val(j[k], A + 'statementNotation')); if (id) idByUri.set(k, id); }
    // the official PDF as text (pdftotext, when it is installed), to check the wording against the publisher's own file
    let pdfText = null;
    if (s.pdf && fs.existsSync(path.join(RAW, s.pdf))) {
      const txt = path.join(RAW, s.pdf.replace(/\.pdf$/, '.txt'));
      if (!fs.existsSync(txt)) { try { require('child_process').execFileSync('pdftotext', ['-enc', 'UTF-8', path.join(RAW, s.pdf), txt], { stdio: 'ignore' }); } catch (e) { /* no pdftotext: unchecked, and said so */ } }
      if (fs.existsSync(txt)) pdfText = fs.readFileSync(txt, 'utf8').replace(/\s+/g, ' ');
    }
    // mathematics domains carry no notation in the source (one statement spans the grades): a domain node per grade
    if (s.key === 'ccss-math') for (const [uri, id] of [...idByUri]) {
      if (!/^(?:K|[1-5])\.[A-Z]{1,3}\.[A-Z]$/.test(id)) continue;
      const dom = id.split('.').slice(0, 2).join('.');
      const parentUri = vals(j[uri], 'http://purl.org/gem/qualifiers/isChildOf')[0];
      if (!nodes.some((n) => n.id === dom) && parentUri && j[parentUri]) nodes.push({ id: dom, f: s.key, kind: 'domain', grade: dom.split('.')[0], text: (val(j[parentUri], DC + 'description') || '').trim() });
    }
    let checked = 0, found = 0, corrected = 0;
    const notFound = [], partly = [];
    const pdfFlat = pdfText ? flat(pdfText) : null;
    for (const [uri, id] of idByUri) {
      const o = j[uri];
      const text = (val(o, DC + 'description') || '').replace(/\s+/g, ' ').trim();
      const grade = gradeOfId(id);
      if (!text) { problems.push(s.key + ' ' + id + ': no wording in the source'); continue; }
      if (!grade) { problems.push(s.key + ' ' + id + ': no grade'); continue; }
      if (val(o, A + 'authorityStatus') && !/Original$/.test(val(o, A + 'authorityStatus'))) problems.push(s.key + ' ' + id + ': the source does not mark this statement as original wording');
      let parent = null;
      for (const p of vals(o, 'http://purl.org/gem/qualifiers/isChildOf')) if (idByUri.has(p)) parent = idByUri.get(p);
      const label = val(o, A + 'statementLabel');
      const kind = label === 'Domain' ? 'domain' : label === 'Cluster' ? 'cluster' : label === 'Component' ? 'component' : label === 'Disciplinary Core Idea' ? 'topic' : label === 'Performance Expectation' ? 'standard' : 'standard';
      if (!parent && s.key === 'ccss-math' && kind === 'cluster') parent = id.split('.').slice(0, 2).join('.');
      const node = { id, f: s.key, kind, grade, parent: parent || undefined, text };
      nodes.push(node);
      if (pdfFlat && (kind === 'standard' || kind === 'component')) {
        checked++;
        const hit = inPdf(pdfFlat, text);
        if (hit >= 2) found++;
        else if (hit === 1) { found++; partly.push(id); }
        else {
          // the machine-readable copy keeps a wording the publisher has since corrected: the official PDF wins, and
          // only when the corrected wording is itself found in the PDF
          const fixed = PDF_WORDING.map(([re, to]) => text.replace(re, to)).find((t) => t !== text && inPdf(pdfFlat, t));
          if (fixed) { node.text = fixed; node.wordingFrom = 'the official PDF (the machine-readable copy says: ' + text.slice(0, 60) + '…)'; found++; corrected++; }
          else notFound.push(id);
        }
      }
    }
    frameworks[frameworks.length - 1].checkedAgainstPdf = pdfText
      ? found + ' of ' + checked + ' statements found in the text of the official PDF' + (partly.length ? ' (' + partly.length + ' of them by their beginning only: a footnote mark or a column break interrupts the rest in the PDF\'s text)' : '') + (corrected ? '; ' + corrected + ' carry the PDF\'s corrected wording' : '') + (notFound.length ? '; NOT found: ' + notFound.join(', ') : '')
      : 'the official PDF was not present at build time';
    if (notFound.length) problems.push(s.key + ': the wording of ' + notFound.join(', ') + ' is not found in the official PDF');
  }
  const seen = new Set();
  for (const n of nodes) { if (seen.has(n.id)) problems.push('two nodes share the id ' + n.id); seen.add(n.id); }
  for (const n of nodes) if (n.parent && !seen.has(n.parent)) problems.push(n.id + ': parent ' + n.parent + ' is not a node');
  const order = (n) => [SOURCES.findIndex((s) => s.key === n.f), ['K', '1', '2', '3', '4', '5', 'K-2', '3-5'].indexOf(n.grade)];
  nodes.sort((a, b) => { const x = order(a), y = order(b); return x[0] - y[0] || x[1] - y[1] || a.id.localeCompare(b.id, 'en', { numeric: true }); });
  return { frameworks, nodes, problems };
}

/** the codes a teaching point's `code` text names, each with its relation */
function readCodes(code) {
  const out = [];
  const relOf = (t, fallback) => (/readiness/i.test(t) ? 'prepares' : /\bext(?:\.|ension)/i.test(t) ? 'extends' : fallback);
  const codeRe = /NGSS:\s*((?:K|[1-5]|K-2|3-5)-(?:PS|LS|ESS|ETS)\d?(?:-\d+)?)|((?:K|[1-5])-(?:PS|LS|ESS|ETS)\d(?:-\d+)?)|\b((?:RL|RI|RF|W|SL|L)\.(?:K|[1-5])(?:\.\d+(?:\.[a-z])?)?)|\b((?:K|[1-5])\.(?:CC|OA|NBT|NF|MD|G|L)(?:\.[A-D](?:\.\d+(?:\.[a-z])?)?|\.\d+(?:\.[a-z])?)?)/g;
  for (const seg of String(code).split(' / ')) {
    const open = seg.indexOf('(');
    const outer = open >= 0 ? seg.slice(0, open) + seg.slice(seg.indexOf(')', open) + 1) : seg;
    const inner = open >= 0 ? seg.slice(open + 1, seg.indexOf(')', open) >= 0 ? seg.indexOf(')', open) : seg.length) : '';
    const outerRel = relOf(outer + (/(readiness|ext)/i.test(inner) && !codeRe.test(inner) ? ' ' + inner : ''), 'teaches');
    codeRe.lastIndex = 0;
    for (const [text, rel] of [[outer, outerRel], [inner, relOf(inner, outerRel)]]) {
      let m;
      codeRe.lastIndex = 0;
      while ((m = codeRe.exec(text))) {
        let id = m[1] || m[2] || m[3] || m[4];
        const k = /^(K)\.L\.(\d.*)$/.exec(id); // "K.L.5.b" is written the wrong way round in the map: L.K.5.b
        if (k) id = 'L.K.' + k[2];
        out.push({ id, rel });
      }
    }
  }
  const seen = new Set();
  return out.filter((r) => (seen.has(r.id) ? false : seen.add(r.id)));
}

function buildCrosswalk(fw) {
  const problems = [];
  const points = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'teaching-graph', 'points.json'), 'utf8')).points;
  const byId = new Map(fw.nodes.map((n) => [n.id, n]));
  const overridesFile = path.join(DIR, 'crosswalk-overrides.json');
  const overrides = fs.existsSync(overridesFile) ? JSON.parse(fs.readFileSync(overridesFile, 'utf8')).points || {} : {};
  const rows = {};
  let derived = 0, overridden = 0, none = 0;
  for (const p of points) {
    if (overrides[p.id]) {
      const o = overrides[p.id];
      for (const r of o.rows || []) { if (!byId.has(r.id)) problems.push('crosswalk-overrides.json: ' + p.id + ' names ' + r.id + ', which is not a node'); if (!['teaches', 'prepares', 'extends'].includes(r.rel)) problems.push('crosswalk-overrides.json: ' + p.id + ' has the relation "' + r.rel + '"'); }
      rows[p.id] = (o.rows || []).length ? { rows: o.rows.map((r) => ({ id: r.id, rel: r.rel, grade: byId.has(r.id) ? byId.get(r.id).grade : null })), by: 'review' } : { none: o.none || 'no counterpart in these documents', by: 'review' };
      overridden++;
      continue;
    }
    const found = readCodes(p.code);
    const good = [];
    for (const r of found) {
      // a cluster or domain written without its last parts ("K.OA", "L.1") names the domain / the grade's standards
      const n = byId.get(r.id);
      if (n) good.push({ id: r.id, rel: r.rel, grade: n.grade });
      else if (/^(?:K|[1-5])\.[A-Z]{1,3}$/.test(r.id) || /^(?:RL|RI|RF|W|SL|L)\.(?:K|[1-5])$/.test(r.id) || /^(?:K|[1-5]|K-2|3-5)-[A-Z]{2,3}\d?$/.test(r.id)) good.push({ id: r.id, rel: r.rel, grade: gradeOfId(r.id + '.') || gradeOfId(r.id + '-'), area: true });
      else problems.push(p.id + ': the code "' + r.id + '" (from "' + p.code + '") is not a node of the registry');
    }
    if (good.length) { rows[p.id] = { rows: good, by: 'code' }; derived++; } else { rows[p.id] = { none: 'the point names no standard of these documents ("' + p.code + '")', by: 'code' }; none++; }
  }
  for (const id of Object.keys(overrides)) if (!points.some((p) => p.id === id)) problems.push('crosswalk-overrides.json: unknown point ' + id);
  return { rows, problems, derived, overridden, none };
}

const text = (o) => JSON.stringify(o, null, 1) + '\n';

(async () => {
  if (process.argv.includes('--fetch')) { await fetchAll(); return; }
  const fw = buildFramework();
  const cw = buildCrosswalk(fw);
  const problems = fw.problems.concat(cw.problems);
  const framework = { $comment: 'GENERATED by scripts/curricula/build-en.js from the machine-readable copies of the official documents named under `frameworks` (each with its publisher, year, address, access date and checksum). The wording of every node is the document\'s own; it is stored for reference and is never shown to a visitor as a quotation (site rule: the framework\'s name and an objective\'s code or label only). Do not edit by hand.', locale: 'en', country: 'US', frameworks: fw.frameworks, nodes: fw.nodes };
  const crosswalk = { $comment: 'GENERATED by scripts/curricula/build-en.js: every teaching point of frontend/content/teaching-graph/points.json → the nodes of framework.json it teaches, prepares or extends, with the grade where the United States places that node. `by: code` = read from the code the point carries; `by: review` = a reviewer\'s row from crosswalk-overrides.json. `none` = no counterpart in these documents. `area: true` = the point names a whole domain or strand, not one standard.', locale: 'en', points: cw.rows };
  for (const m of problems.slice(0, 60)) console.log('FAIL  ' + m);
  const files = [[path.join(DIR, 'framework.json'), text(framework)], [path.join(DIR, 'crosswalk.json'), text(crosswalk)]];
  if (process.argv.includes('--check')) {
    for (const [f, t] of files) if (!fs.existsSync(f) || fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n') !== t) { console.log('FAIL  ' + path.relative(REPO, f) + ' is not what the builder produces'); problems.push('x'); }
  } else if (!problems.length) { fs.mkdirSync(DIR, { recursive: true }); for (const [f, t] of files) fs.writeFileSync(f, t); }
  const by = {};
  for (const n of fw.nodes) by[n.f + ' ' + n.kind] = (by[n.f + ' ' + n.kind] || 0) + 1;
  console.log('en framework: ' + fw.nodes.length + ' nodes (' + Object.entries(by).map(([k, v]) => k + ' ' + v).join(', ') + ')');
  for (const f of fw.frameworks) console.log('  ' + f.key + ': ' + f.checkedAgainstPdf);
  console.log('en crosswalk: ' + cw.derived + ' points read from their code, ' + cw.overridden + ' from review, ' + cw.none + ' with no counterpart');
  if (problems.length) { console.log(problems.length + ' problem(s)'); process.exit(1); }
})().catch((e) => { console.error(e.message); process.exit(1); });
module.exports = { readCodes, idOf };
