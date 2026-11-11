#!/usr/bin/env node
/**
 * The Bavarian layer of the German registry (Daily Teaching System, Part 2): the LehrplanPLUS Grundschule for
 * Deutsch, Mathematik and Heimat- und Sachunterricht, Jahrgangsstufen 1/2 and 3/4.
 *
 *   node scripts/curricula/build-de-by.js            → frontend/content/curricula/de-by/framework.json (+ crosswalk.json
 *                                                      when crosswalk-authored.json exists)
 *   node scripts/curricula/build-de-by.js --check | --list
 *
 * Nothing is written from memory: the wording is read from the official pages of lehrplanplus.bayern.de (fetched into
 * out/curricula/de-by/). A page is an outline:
 *
 *   M1/2 Lernbereich 1: Zahlen und Operationen                 → node M1/2.1        (kind area)
 *   M1/2 1.1 Zahlen strukturiert darstellen …                  → node M1/2.1.1      (kind subarea; the plan's own number)
 *   Kompetenzerwartungen: "Die Schülerinnen und Schüler …" •   → node M1/2.1.1.3    (kind standard; the third expectation)
 *   Inhalte zu den Kompetenzen •                               → node HSU1/2.3.1.i2 (kind content; the second content line)
 *
 * "M1/2", "1" and "1.1" are the plan's own; the number of an expectation inside its list is this registry's (the plan
 * prints a list without numbers). Bavaria plans in two-year bands: every node carries "1-2" or "3-4".
 *
 * Check: the number of list items on each page equals the number of standard and content nodes read from it.
 */
'use strict';
const { sha256, crosswalkFromAuthored, writeRegistry, fetchRaw } = require('./lib.js');
const REG = 'de-by';
const ACCESSED = '2026-11-11';
const BASE = 'https://www.lehrplanplus.bayern.de/fachlehrplan/grundschule/';
const SUBJECTS = [
  { key: 'lpplus-deutsch', slug: 'deutsch', subject: 'ela', title: 'LehrplanPLUS Grundschule: Fachlehrplan Deutsch' },
  { key: 'lpplus-mathematik', slug: 'mathematik', subject: 'math', title: 'LehrplanPLUS Grundschule: Fachlehrplan Mathematik' },
  { key: 'lpplus-hsu', slug: 'hsu', subject: 'science-social', title: 'LehrplanPLUS Grundschule: Fachlehrplan Heimat- und Sachunterricht' },
];
const BANDS = [['1', '1-2'], ['3', '3-4']];
const ent = (s) => s.replace(/&nbsp;/g, ' ').replace(/&gt;?/g, '>').replace(/&lt;?/g, '<').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&shy;/g, '').replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)));
const txt = (s) => ent(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

function parse(doc, band, html) {
  const nodes = [], problems = [];
  const at = html.indexOf('id="content__sections"');
  if (at < 0) return { nodes, problems: [doc.key + ' ' + band + ': the page has no content section'], items: 0 };
  // the pop-up notes (process competences, cross references) and the buttons are not part of the plan's text
  const end = html.indexOf('</main>', at);
  if (end < 0) return { nodes, problems: [doc.key + ' ' + band + ': the page\'s main part does not close'], items: 0 };
  const h = html.slice(at, end).replace(/<dialog[\s\S]*?<\/dialog>/g, '').replace(/<button[\s\S]*?<\/button>/g, '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<span class="badge[\s\S]*?<\/span>/g, '');
  const re = /<(h2|h3|h4|h5|li)\b[^>]*>([\s\S]*?)(?=<(?:h2|h3|h4|h5|p|li|ul|ol|\/ul|\/ol|section|\/section|div class="footer")\b)/g;
  let m, area = null, sub = null, holder = null, mode = null, items = 0, subSub = 0;
  const count = new Map();
  const next = (id, k) => { const key = id + k; count.set(key, (count.get(key) || 0) + 1); return count.get(key); };
  while ((m = re.exec(h))) {
    const t = txt(m[2]);
    if (!t) continue;
    if (m[1] === 'li') {
      items++;
      if (!holder || !mode) { problems.push(doc.key + ' ' + band + ': a list item outside a list of expectations: "' + t.slice(0, 50) + '"'); continue; }
      const n = mode === 'standard' ? next(holder.id, 's') : next(holder.id, 'i');
      nodes.push({ id: holder.id + '.' + (mode === 'standard' ? '' : 'i') + n, f: doc.key, kind: mode, grade: band, parent: holder.id, text: t });
      continue;
    }
    const lb = /^([A-Za-z]+\d\/\d) Lernbereich (\d+): (.+)$/.exec(t);
    const num = /^([A-Za-z]+\d\/\d) (\d+)\.(\d+) (.+)$/.exec(t);
    if (m[1] === 'h2' && lb) { area = { id: lb[1] + '.' + lb[2], f: doc.key, kind: 'area', grade: band, label: lb[1] + ' ' + lb[2], text: lb[3] }; nodes.push(area); sub = null; holder = area; mode = null; continue; }
    if (m[1] === 'h3' && num) { sub = { id: num[1] + '.' + num[2] + '.' + num[3], f: doc.key, kind: 'subarea', grade: band, parent: area ? area.id : undefined, label: num[1] + ' ' + num[2] + '.' + num[3], text: num[4] }; nodes.push(sub); holder = sub; mode = null; subSub = 0; continue; }
    if (/^Kompetenzerwartungen/.test(t)) { mode = 'standard'; continue; }
    if (/^Inhalte zu den Kompetenzen/.test(t)) { mode = 'content'; continue; }
    // a titled part inside a numbered Lernbereich (Deutsch 4.4 "Richtig schreiben" names its three principles so)
    const part = /^([A-Za-z]+\d\/\d) (.+)$/.exec(t);
    if ((m[1] === 'h4' || m[1] === 'h5') && part && sub) { holder = { id: sub.id + '.' + String.fromCharCode(97 + subSub++), f: doc.key, kind: 'subarea', grade: band, parent: sub.id, label: sub.label, text: part[2] }; nodes.push(holder); mode = null; continue; }
    if (m[1] === 'h2' && /^Anzeigeeinstellungen/.test(t)) break;
    problems.push(doc.key + ' ' + band + ': a heading the reader does not know: <' + m[1] + '> "' + t.slice(0, 60) + '"');
  }
  return { nodes, problems, items };
}

(async () => {
  const frameworks = [], nodes = [], problems = [];
  for (const doc of SUBJECTS) {
    const hashes = [], urls = [];
    let total = 0, read = 0, stand = '';
    for (const [first, band] of BANDS) {
      const url = BASE + first + '/' + doc.slug;
      const buf = await fetchRaw(REG, 'grundschule-' + first + '-' + doc.slug + '.html', url);
      const html = buf.toString('utf8');
      hashes.push(sha256(buf)); urls.push(url);
      const r = parse(doc, band, html);
      problems.push(...r.problems);
      const mine = r.nodes.filter((n) => n.kind === 'standard' || n.kind === 'content').length;
      if (mine !== r.items) problems.push(doc.key + ' ' + band + ': the page holds ' + r.items + ' list items, the registry ' + mine);
      if (!r.nodes.some((n) => n.kind === 'standard')) problems.push(doc.key + ' ' + band + ': no expectation was read');
      total += r.items; read += mine;
      nodes.push(...r.nodes);
      const s = /Stand:?\s*([^<]{4,40})</.exec(html);
      if (s && !stand) stand = s[1].trim();
    }
    frameworks.push({ key: doc.key, short: 'LehrplanPLUS', subject: doc.subject, title: doc.title, publisher: 'Staatsinstitut für Schulqualität und Bildungsforschung München (ISB), im Auftrag des Bayerischen Staatsministeriums für Unterricht und Kultus', year: '2014', officialDocument: urls.join(' '), readFrom: urls.join(' '), accessed: ACCESSED, sha256: hashes.join(' '),
      version: 'LehrplanPLUS Grundschule, in force since the school year 2014/15; the pages as served on ' + ACCESSED + (stand ? ' (the page says: Stand ' + stand + ')' : ''), band: 'two-year bands: Jahrgangsstufen 1/2 and 3/4', ids: 'the code, the Lernbereich number and the sub-number are the plan\'s own (shown as `label`); the number of an expectation inside its list is this registry\'s',
      citation: doc.title + ', Jahrgangsstufen 1/2 und 3/4. Staatsinstitut für Schulqualität und Bildungsforschung München. www.lehrplanplus.bayern.de', checkedAgainstPdf: read + ' of the ' + total + ' list items of the official pages are nodes' });
  }
  const seen = new Set();
  for (const n of nodes) { if (seen.has(n.id)) problems.push('two nodes share the id ' + n.id); seen.add(n.id); }
  for (const n of nodes) if (n.parent && !seen.has(n.parent)) problems.push(n.id + ': parent ' + n.parent + ' is not a node');
  if (process.argv.includes('--list')) for (const n of nodes) console.log((n.kind === 'standard' || n.kind === 'content' ? '    ' : n.kind === 'subarea' ? '  ' : '') + n.id + '  ' + n.text);
  const cw = crosswalkFromAuthored(REG, nodes);
  problems.push(...cw.problems);
  for (const m of problems.slice(0, 50)) console.log('FAIL  ' + m);
  const framework = { $comment: 'GENERATED by scripts/curricula/build-de-by.js from the official pages of the Bavarian LehrplanPLUS named under `frameworks`. The wording of every node is the plan\'s own; it is stored for reference and is never shown to a visitor as a quotation. Do not edit by hand.', locale: 'de', country: 'DE', state: 'BY', frameworks, nodes };
  const crosswalk = cw.rows ? { $comment: 'GENERATED by scripts/curricula/build-de-by.js from crosswalk-authored.json (written from the official text by reviewers who teach in a Bavarian Grundschule): every teaching point → the expectations it teaches, prepares or extends, with the two-year band of each.', locale: 'de', state: 'BY', points: cw.rows } : null;
  let diff = 0;
  if (!problems.length) diff = writeRegistry(REG, framework, crosswalk, process.argv.includes('--check'));
  const by = {};
  for (const n of nodes) by[n.f + ' ' + n.kind] = (by[n.f + ' ' + n.kind] || 0) + 1;
  console.log('de-by framework: ' + nodes.length + ' nodes (' + Object.entries(by).map(([k, v]) => k + ' ' + v).join(', ') + ')');
  for (const f of frameworks) console.log('  ' + f.key + ': ' + f.checkedAgainstPdf);
  console.log(cw.rows ? 'de-by crosswalk: ' + cw.authored + ' points mapped, ' + cw.none + ' with no counterpart' : 'de-by: no crosswalk yet');
  if (problems.length || diff) { console.log((problems.length + diff) + ' problem(s)'); process.exit(1); }
})().catch((e) => { console.error(e.message); process.exit(1); });
