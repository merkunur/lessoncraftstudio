#!/usr/bin/env node
/**
 * The US registry (Daily Teaching System, Part 2, locale en): the Common Core State Standards for Mathematics and
 * for English Language Arts, and the Next Generation Science Standards, kindergarten to grade 5, as nodes with the
 * official wording — and the crosswalk from every teaching point to them. Since Stage D-0 (2026-11-23) also the C3
 * Framework for social studies and the National Health Education Standards, grade bands K-2 / PreK-2 and 3-5 (see
 * BAND_SOURCES below).
 *
 *   node scripts/curricula/build-en.js --fetch     downloads the source files into out/curricula/en/ (once)
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
/**
 * Social studies and health (Stage D-0, 2026-11-23): two national documents whose objectives are written per grade
 * BAND, read from the Achievement Standards Network's copies (each names the official document it was made from):
 *   c3    The College, Career, and Civic Life (C3) Framework for Social Studies State Standards (NCSS): the Dimension 2
 *         indicators of Civics, Economics, Geography and History for the bands K-2 and 3-5, ids as printed
 *         (D2.Civ.1.K-2), under the discipline (D2.Civ.K-2, kind area) and the part of it (D2.Civ.1-6.K-2, kind
 *         subarea, named by the first and last number the document prints under that heading). An indicator the
 *         document leaves empty ("Begins in grades 3-5") is not a node. The publisher's PDF could not be read (see
 *         `unread`), so the wording is the copy's alone, as for the NGSS.
 *   nhes  The National Health Education Standards: the 2024 edition (SHAPE America), which replaces the 2007 one that
 *         the CDC published. Indicators as the document numbers them (1.2.1 = standard 1, grades PreK-2, indicator 1;
 *         1.5.1 = grades 3-5) with NHES. in front (NHES.1.2.1), under the standard in that band (NHES.1.2, kind area).
 *         Band PreK-2 has the grade P-2. Every indicator is compared with the publisher's own page, code and wording.
 */
const BAND_SOURCES = [
  { key: 'c3', short: 'C3 Framework', subject: 'social', doc: 'D2607350', file: 'asn-D2607350.json', url: 'https://asn.desire2learn.com/resources/D2607350_full.json', accessed: '2026-11-23',
    edition: 'the version of 2017 (the year the copy gives; the framework was first published in 2013)',
    unread: 'not checked against the official PDF: the publisher\'s site (socialstudies.org) answers every automated request, the PDF the copy names included, with HTTP 403 (a browser check). The wording is the machine-readable copy\'s, which names that PDF as its source and marks every statement "Original".' },
  { key: 'nhes', short: 'NHES', subject: 'health', doc: 'D21703172', file: 'asn-D21703172.json', url: 'https://asn.desire2learn.com/resources/D21703172_full.json', accessed: '2026-11-23',
    page: 'shape-nhes-2024.html', edition: '2024 edition (the third), which replaces the 2007 second edition published by the CDC; the publisher\'s page lists the 2007 standards as the previous ones' },
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
  const get = async (u, f) => {
    if (!u || fs.existsSync(path.join(RAW, f))) return;
    const r = await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; curriculum-reader)' } });
    if (!r.ok) throw new Error(u + ' answered ' + r.status);
    fs.writeFileSync(path.join(RAW, f), Buffer.from(await r.arrayBuffer()));
    console.log('fetched ' + f);
  };
  for (const s of SOURCES) for (const [u, f] of [[s.url, s.file], [s.pdfUrl, s.pdf]]) await get(u, f);
  // the band documents: the copy first, then the official page it names (where one can be read)
  for (const s of BAND_SOURCES) {
    await get(s.url, s.file);
    if (s.page) await get(val(JSON.parse(fs.readFileSync(path.join(RAW, s.file), 'utf8'))['http://asn.desire2learn.com/resources/' + s.doc], DC + 'source'), s.page);
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

/** the text of an HTML page as lines (tags dropped, entities decoded), for comparing a copy with the publisher's page */
function pageLines(html) {
  const ent = { amp: '&', nbsp: ' ', quot: '"', lt: '<', gt: '>', apos: "'" };
  return html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, '\n')
    .replace(/&#(\d+);/g, (m, c) => String.fromCharCode(Number(c))).replace(/&#x([0-9a-f]+);/gi, (m, c) => String.fromCharCode(parseInt(c, 16))).replace(/&([a-z]+);/gi, (m, k) => (k.toLowerCase() in ent ? ent[k.toLowerCase()] : m))
    .split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean);
}
/** for comparing a wording with the publisher's: typographic quotes and dashes count as plain ones */
const plain = (t) => String(t).replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();

/** a band document (BAND_SOURCES) → { framework, nodes } in the document's order; problems are pushed */
function buildBandSource(s, problems) {
  const file = path.join(RAW, s.file);
  if (!fs.existsSync(file)) throw new Error('missing ' + path.relative(REPO, file) + ': run build-en.js --fetch');
  const buf = fs.readFileSync(file);
  const j = JSON.parse(buf.toString('utf8'));
  const d = j['http://asn.desire2learn.com/resources/' + s.doc];
  if (!d) throw new Error(s.file + ' does not hold the document ' + s.doc);
  const DC11 = 'http://purl.org/dc/elements/1.1/', AUT = 'http://www.loc.gov/loc.terms/relators/aut', CHILD = 'http://purl.org/gem/qualifiers/hasChild';
  const title = val(d, DC + 'title') || val(d, DC11 + 'title');
  const publisher = [...new Set(vals(d, DC + 'publisher').concat(vals(d, DC11 + 'publisher'), vals(d, AUT)))].join('; ');
  const year = val(d, DC + 'valid');
  if (!title || !publisher || !year) problems.push(s.key + ': the copy names no title, publisher or year');
  const kids = (o) => vals(o, CHILD).map((u) => j[u]).filter(Boolean);
  const words = (o) => (val(o, DC + 'description') || '').replace(/\s+/g, ' ').trim();
  const notation = (o) => val(o, A + 'statementNotation');
  const levels = (o) => vals(o, DC + 'educationLevel').map((x) => x.split('/').pop()).join(',');
  const original = (o, id) => { const a = val(o, A + 'authorityStatus'); if (a && !/Original$/.test(a)) problems.push(s.key + ' ' + id + ': the copy does not mark this statement as original wording'); };
  const nodes = [];
  const meta = { key: s.key, short: s.short, subject: s.subject, title, publisher, year, officialDocument: val(d, DC + 'source'), readFrom: s.url, accessed: s.accessed, sha256: crypto.createHash('sha256').update(buf).digest('hex'), rights: /^https?:\/\/\S+$/.test(val(d, DC + 'rights') || '') ? undefined : val(d, DC + 'rights') || undefined, citation: publisher.split(/[;,]/)[0] + '. ' + year + '. ' + title + '.' };
  if (s.edition) meta.edition = s.edition;
  if (s.key === 'c3') {
    // Dimension 2, the four core disciplines; the document prints each discipline's indicators as tables per heading
    const ABBR = { Civics: 'Civ', Economics: 'Eco', Geography: 'Geo', History: 'His' };
    const dim = kids(d).find((o) => words(o) === 'Applying Disciplinary Concepts & Tools');
    if (!dim) { problems.push('c3: the copy has no Dimension 2 ("Applying Disciplinary Concepts & Tools")'); return { framework: meta, nodes }; }
    const discs = kids(dim).filter((o) => ABBR[words(o)]);
    if (discs.map(words).join(',') !== 'Civics,Economics,Geography,History') problems.push('c3: Dimension 2 holds the disciplines ' + kids(dim).map(words).join(', ') + ' (Civics, Economics, Geography, History expected)');
    let empty = 0;
    for (const band of ['K-2', '3-5']) {
      const want = band === 'K-2' ? 'K,1,2' : '3,4,5';
      for (const disc of discs) {
        const ab = ABBR[words(disc)];
        const discId = 'D2.' + ab + '.' + band;
        nodes.push({ id: discId, f: s.key, kind: 'area', grade: band, text: words(disc) });
        for (const area of kids(disc)) {
          const ind = kids(area).filter((o) => new RegExp('^D2\\.' + ab + '\\.\\d+\\.' + band.replace('-', '\\-') + '$').test(notation(o) || ''));
          if (!ind.length) { problems.push('c3: ' + words(area) + ' has no indicator for grades ' + band); continue; }
          const nums = ind.map((o) => Number(notation(o).split('.')[2]));
          const areaId = 'D2.' + ab + '.' + Math.min(...nums) + '-' + Math.max(...nums) + '.' + band;
          nodes.push({ id: areaId, f: s.key, kind: 'subarea', grade: band, parent: discId, text: words(area) });
          original(area, areaId);
          for (const o of ind) {
            const id = notation(o), text = words(o);
            if (/^Begins in grades? /i.test(text)) { empty++; continue; }   // the document prints no indicator here
            if (levels(o) !== want) problems.push('c3 ' + id + ': the copy places it in grades ' + levels(o));
            if (text.length < 3) { problems.push('c3 ' + id + ': no wording in the copy'); continue; }
            original(o, id);
            nodes.push({ id, f: s.key, kind: 'standard', grade: band, parent: areaId, text });
          }
        }
      }
    }
    meta.leftOut = empty + ' places where the document prints "Begins in grades …" instead of an indicator are not nodes';
    meta.checkedAgainstPdf = s.unread;
  }
  if (s.key === 'nhes') {
    const BANDS = [['2', 'P-2', 'Pre-K,K,1,2'], ['5', '3-5', '3,4,5']];
    const stds = kids(d).filter((o) => /^HE\.\d+$/.test(notation(o) || ''));
    if (stds.map((o) => notation(o).slice(3)).join(',') !== '1,2,3,4,5,6,7,8') problems.push('nhes: the copy holds the standards ' + stds.map(notation).join(', ') + ' (1 to 8 expected)');
    for (const [bn, band, want] of BANDS) for (const std of stds) {
      const sn = notation(std).slice(3);
      const areaId = 'NHES.' + sn + '.' + bn;
      original(std, areaId);
      nodes.push({ id: areaId, f: s.key, kind: 'area', grade: band, text: words(std) });
      const ind = kids(std).filter((o) => new RegExp('^' + sn + '\\.' + bn + '\\.\\d+$').test(notation(o) || ''));
      if (!ind.length) problems.push('nhes: standard ' + sn + ' has no indicator for grades ' + band);
      ind.forEach((o, i) => {
        const id = 'NHES.' + notation(o);
        if (Number(notation(o).split('.')[2]) !== i + 1) problems.push('nhes ' + id + ': the indicators of standard ' + sn + ' do not run 1, 2, 3 …');
        if (levels(o) !== want) problems.push('nhes ' + id + ': the copy places it in grades ' + levels(o));
        original(o, id);
        nodes.push({ id, f: s.key, kind: 'standard', grade: band, parent: areaId, text: words(o) });
      });
    }
    // the publisher's page prints every indicator as "<code> <wording>", band by band: each must be there, worded
    // alike, and the page must print no indicator of these bands that the copy lacks
    const pageFile = path.join(RAW, s.page);
    if (!fs.existsSync(pageFile)) { meta.checkedAgainstPage = 'the publisher\'s page was not present at build time'; problems.push('nhes: ' + s.page + ' is missing (build-en.js --fetch)'); }
    else {
      const pbuf = fs.readFileSync(pageFile);
      const onPage = new Map();
      for (const l of pageLines(pbuf.toString('utf8'))) { const m = /^(\d)\.(2|5)\.(\d+) (.+)$/.exec(l); if (m) onPage.set('NHES.' + m[1] + '.' + m[2] + '.' + m[3], m[4]); }
      const ind = nodes.filter((n) => n.kind === 'standard');
      const alike = ind.filter((n) => onPage.has(n.id) && plain(onPage.get(n.id)) === plain(n.text));
      const differ = ind.filter((n) => onPage.has(n.id) && plain(onPage.get(n.id)) !== plain(n.text)).map((n) => n.id);
      const missing = ind.filter((n) => !onPage.has(n.id)).map((n) => n.id);
      const extra = [...onPage.keys()].filter((id) => !ind.some((n) => n.id === id));
      if (differ.length) problems.push('nhes: the wording of ' + differ.join(', ') + ' differs from the publisher\'s page');
      if (missing.length) problems.push('nhes: ' + missing.join(', ') + ' are not on the publisher\'s page');
      if (extra.length) problems.push('nhes: the publisher\'s page prints ' + extra.join(', ') + ', which the copy lacks');
      meta.officialPageSha256 = crypto.createHash('sha256').update(pbuf).digest('hex');
      meta.checkedAgainstPage = alike.length + ' of ' + ind.length + ' indicators found on the publisher\'s page with the same code and the same wording; the page prints no other indicator of these bands';
    }
  }
  return { framework: meta, nodes };
}

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
  const order = (n) => [SOURCES.findIndex((s) => s.key === n.f), ['K', '1', '2', '3', '4', '5', 'K-2', '3-5'].indexOf(n.grade)];
  nodes.sort((a, b) => { const x = order(a), y = order(b); return x[0] - y[0] || x[1] - y[1] || a.id.localeCompare(b.id, 'en', { numeric: true }); });
  // the band documents follow, each in its own order (band, then the document's parts)
  for (const s of BAND_SOURCES) { const b = buildBandSource(s, problems); frameworks.push(b.framework); nodes.push(...b.nodes); }
  const seen = new Set();
  for (const n of nodes) { if (seen.has(n.id)) problems.push('two nodes share the id ' + n.id); seen.add(n.id); }
  for (const n of nodes) if (n.parent && !seen.has(n.parent)) problems.push(n.id + ': parent ' + n.parent + ' is not a node');
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
  for (const f of fw.frameworks) console.log('  ' + f.key + ': ' + (f.checkedAgainstPdf || f.checkedAgainstPage));
  console.log('en crosswalk: ' + cw.derived + ' points read from their code, ' + cw.overridden + ' from review, ' + cw.none + ' with no counterpart');
  if (problems.length) { console.log(problems.length + ' problem(s)'); process.exit(1); }
})().catch((e) => { console.error(e.message); process.exit(1); });
module.exports = { readCodes, idOf };
