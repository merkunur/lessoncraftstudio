#!/usr/bin/env node
/**
 * The Swedish registry (Daily Teaching System, Part 2): Lgr22, the Läroplan för grundskolan samt för förskoleklassen
 * och fritidshemmet — the central content of the förskoleklass, and for the subjects the central content of
 * årskurs 1–3 and 4–6 and the criteria for acceptable knowledge at the end of årskurs 3.
 *
 *   node scripts/curricula/build-sv.js            → frontend/content/curricula/sv/framework.json (+ crosswalk.json when
 *                                                   crosswalk-authored.json exists)
 *   node scripts/curricula/build-sv.js --check | --list
 *
 * Nothing is written from memory: the wording is read from Skolverket's own open-data service (the Syllabus API,
 * api.skolverket.se/syllabus; the answers are kept in out/curricula/sv/). Skolverket publishes there the same text
 * it prints in the curriculum, as headings and lists:
 *
 *   I årskurs 1–3 / Taluppfattning och tals användning          → node MA.1-3.1     (kind area)
 *   • Naturliga tal och deras egenskaper …                      → node MA.1-3.1.1   (kind content)
 *   Kriterier … i slutet av årskurs 3, a paragraph              → node MA.K3.2      (kind criterion)
 *   Förskoleklassen / Matematiska resonemang och uttrycksformer → node F.3, F.3.2   (band F: the year before årskurs 1)
 *
 * Lgr22 states the central content ONCE for the whole band 1–3: it places nothing in a single year. Every content
 * node therefore carries "1-3" (or "4-6"; the criteria carry "3"; the förskoleklass "F"). The curriculum numbers
 * neither its headings nor its points: the ids are this registry's, in the order of the text.
 * The natural-science subjects (biologi, fysik, kemi) share one central content for 1–3, and so do the social
 * subjects (geografi, historia, religionskunskap, samhällskunskap): each is read once, and the builder checks that
 * the sister subjects really print the same list.
 *
 * Checks: the number of list items in each text equals the number of content nodes read from it; the sister
 * subjects' lists are the same; every text names its band.
 */
'use strict';
const { sha256, crosswalkFromAuthored, writeRegistry, fetchRaw, flat } = require('./lib.js');
const REG = 'sv';
const ACCESSED = '2026-11-11';
const API = 'https://api.skolverket.se/syllabus/v1/';
const SUBJECTS = [
  { key: 'lgr22-matematik', letter: 'MA', code: 'GRGRMAT01', subject: 'math', criteria: true },
  { key: 'lgr22-svenska', letter: 'SV', code: 'GRGRSVE01', subject: 'ela', criteria: true },
  { key: 'lgr22-no', letter: 'NO', code: 'GRGRBIO01', sisters: ['GRGRFYS01', 'GRGRKEM01'], subject: 'science', criteria: true, name: 'Naturorienterande ämnen (biologi, fysik, kemi)' },
  { key: 'lgr22-so', letter: 'SO', code: 'GRGRGEO01', sisters: ['GRGRHIS01', 'GRGRREL01', 'GRGRSAM01'], subject: 'social', criteria: true, name: 'Samhällsorienterande ämnen (geografi, historia, religionskunskap, samhällskunskap)' },
  { key: 'lgr22-teknik', letter: 'TK', code: 'GRGRTEK01', subject: 'science' },
  { key: 'lgr22-idrott', letter: 'IDH', code: 'GRGRIDR01', subject: 'health' },
  { key: 'lgr22-bild', letter: 'BL', code: 'GRGRBIL01', subject: 'arts' },
];
const ent = (s) => s.replace(/­/g, '').replace(/&shy;/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)));
const txt = (s) => ent(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
/** the headings, paragraphs and list items of a piece of Skolverket's HTML, in order */
function outline(html) {
  const out = [];
  const re = /<(h[2-5]|p|li)\b[^>]*>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = re.exec(html))) { const t = txt(m[2]); if (t) out.push({ tag: m[1], text: t }); }
  return out;
}
const items = (html) => (html.match(/<li\b/g) || []).length;

/** headings (h4) and their list items → area and content nodes under `prefix`; returns how many items were read */
function contentNodes(nodes, problems, f, prefix, band, html, fromHeading) {
  let area = null, areaNo = 0, n = 0, read = 0, on = !fromHeading;
  for (const o of outline(html)) {
    if (!on) { if (o.tag !== 'li' && fromHeading.test(o.text)) on = true; continue; }
    if (o.tag === 'h4' && !/^Undervisningen i /.test(o.text)) { area = { id: prefix + '.' + (++areaNo), f, kind: 'area', grade: band, text: o.text }; nodes.push(area); n = 0; continue; }
    if (o.tag === 'li') {
      read++;
      if (!area) { problems.push(f + ' ' + prefix + ': a point before any heading: "' + o.text.slice(0, 50) + '"'); continue; }
      nodes.push({ id: area.id + '.' + (++n), f, kind: 'content', grade: band, parent: area.id, text: o.text });
    }
  }
  return read;
}

(async () => {
  const frameworks = [], nodes = [], problems = [];
  // the förskoleklass: part 3 of the curriculum itself
  {
    const buf = await fetchRaw(REG, 'LGR22.json', API + 'curriculums/LGR22');
    const cur = JSON.parse(buf.toString('utf8')).curriculum;
    const sec = cur.sections.find((s) => /Förskoleklassens syfte och centrala innehåll/.test(s.content));
    if (!sec) problems.push('lgr22-forskoleklass: the part on the förskoleklass was not found');
    else {
      const at = sec.content.indexOf('<h3>Centralt innehåll</h3>');
      if (at < 0) problems.push('lgr22-forskoleklass: no "Centralt innehåll" in the part on the förskoleklass');
      const html = sec.content.slice(at);
      const mine = [];
      const read = contentNodes(mine, problems, 'lgr22-forskoleklass', 'F', 'F', html, null);
      if (read !== items(html) || read !== mine.filter((n) => n.kind === 'content').length) problems.push('lgr22-forskoleklass: the text holds ' + items(html) + ' points, the registry ' + mine.filter((n) => n.kind === 'content').length);
      nodes.push(...mine);
      frameworks.push({ key: 'lgr22-forskoleklass', short: 'Lgr22', subject: 'preschool-class', title: 'Läroplan för grundskolan samt för förskoleklassen och fritidshemmet (Lgr22), del 3: Förskoleklassen', publisher: 'Skolverket', year: '2022', officialDocument: 'https://www.skolverket.se/undervisning/grundskolan/laroplan-och-kursplaner-for-grundskolan/laroplan-lgr22-for-grundskolan-samt-for-forskoleklassen-och-fritidshemmet', readFrom: API + 'curriculums/LGR22', accessed: ACCESSED, sha256: sha256(buf),
        version: 'SKOLFS ' + cur.skolfsGrund + ', last changed by SKOLFS ' + cur.skolfsAndring + '; version ' + cur.version + ' of the service, in force from ' + cur.startDate, band: 'the förskoleklass (the compulsory year before årskurs 1, age 6): F', ids: 'this registry\'s own (the curriculum numbers neither headings nor points)',
        citation: 'Läroplan för grundskolan samt för förskoleklassen och fritidshemmet (Lgr22). Skolverket.', checkedAgainstPdf: read + ' points read; the text\'s ' + items(html) + ' list items are all there' });
    }
  }
  for (const s of SUBJECTS) {
    const buf = await fetchRaw(REG, s.code + '.json', API + 'subjects/' + s.code);
    const sub = JSON.parse(buf.toString('utf8')).subject;
    const mine = [];
    let total = 0, read = 0;
    // from årskurs 4 the sister subjects each have a central content of their own: only the shared band is read for them
    for (const band of s.sisters ? ['1-3'] : ['1-3', '4-6']) {
      const cc = sub.centralContents.find((c) => c.year === band);
      if (!cc) { problems.push(s.key + ': no central content for årskurs ' + band); continue; }
      if (!new RegExp('I årskurs ' + band.replace('-', '[–-]')).test(txt(cc.text))) problems.push(s.key + ': the text given for ' + band + ' does not name that band');
      total += items(cc.text);
      read += contentNodes(mine, problems, s.key, s.letter + '.' + band, band, cc.text, null);
      // the sister subjects print the same list for 1–3 (they are taught and assessed together there)
      if (band === '1-3') for (const code of s.sisters || []) {
        const other = JSON.parse((await fetchRaw(REG, code + '.json', API + 'subjects/' + code)).toString('utf8')).subject.centralContents.find((c) => c.year === '1-3');
        const lis = (h) => outline(h).filter((o) => o.tag === 'li').map((o) => flat(o.text)).join('|');
        if (!other || lis(other.text) !== lis(cc.text)) problems.push(s.key + ': ' + code + ' does not print the same central content for årskurs 1–3');
      }
    }
    if (read !== total || mine.filter((n) => n.kind === 'content').length !== total) problems.push(s.key + ': the texts hold ' + total + ' points, the registry ' + mine.filter((n) => n.kind === 'content').length);
    let crit = 0;
    if (s.criteria) {
      const k = (sub.knowledgeRequirements || []).find((r) => String(r.year) === '3');
      if (!k) problems.push(s.key + ': no criteria for the end of årskurs 3');
      else {
        // the criteria stand under their own heading ("Kriterier för bedömning av godtagbara kunskaper i slutet av årskurs 3")
        const head = outline(k.text).find((o) => /^h/.test(o.tag));
        if (!head) problems.push(s.key + ': the criteria for årskurs 3 have no heading');
        mine.push({ id: s.letter + '.K3', f: s.key, kind: 'area', grade: '3', text: head ? head.text : 'Kriterier för bedömning i slutet av årskurs 3' });
        for (const o of outline(k.text)) if (o.tag === 'p') mine.push({ id: s.letter + '.K3.' + (++crit), f: s.key, kind: 'criterion', grade: '3', parent: s.letter + '.K3', text: o.text });
      }
      if (k && !crit) problems.push(s.key + ': the criteria for årskurs 3 hold no paragraph');
    }
    nodes.push(...mine);
    frameworks.push({ key: s.key, short: 'Lgr22', subject: s.subject, title: 'Lgr22, kursplan i ' + (s.name || sub.name), publisher: 'Skolverket', year: '2022', officialDocument: 'https://www.skolverket.se/undervisning/grundskolan/laroplan-och-kursplaner-for-grundskolan/laroplan-lgr22-for-grundskolan-samt-for-forskoleklassen-och-fritidshemmet', readFrom: [s.code].concat(s.sisters || []).map((c) => API + 'subjects/' + c).join(' '), accessed: ACCESSED, sha256: sha256(buf),
      version: 'SKOLFS ' + sub.skolfsGrund + ', changed by SKOLFS ' + sub.skolfsAndring + '; version ' + sub.version + ' of the service, in force from ' + sub.startDate, band: 'the central content is stated once for årskurs 1–3 and once for 4–6; the criteria describe the end of årskurs 3',
      ids: 'this registry\'s own (the syllabus numbers neither headings nor points)', citation: 'Kursplan i ' + sub.name.toLowerCase() + ', Läroplan för grundskolan samt för förskoleklassen och fritidshemmet (Lgr22). Skolverket.',
      checkedAgainstPdf: read + ' points read; the texts\' ' + total + ' list items are all there' + (crit ? '; ' + crit + ' paragraphs of criteria for årskurs 3' : '') + (s.sisters ? '; the sister subjects print the same list for 1–3' : '') });
  }
  const seen = new Set();
  for (const n of nodes) { if (seen.has(n.id)) problems.push('two nodes share the id ' + n.id); seen.add(n.id); if (/­|&[a-z]+;/.test(n.text)) problems.push(n.id + ': a soft hyphen or an HTML entity is left in the wording'); }
  if (process.argv.includes('--list')) for (const n of nodes) console.log((n.kind === 'area' ? '' : '    ') + n.id + ' [' + n.grade + ']  ' + n.text);
  const cw = crosswalkFromAuthored(REG, nodes);
  problems.push(...cw.problems);
  for (const m of problems.slice(0, 50)) console.log('FAIL  ' + m);
  const framework = { $comment: 'GENERATED by scripts/curricula/build-sv.js from Skolverket\'s open-data service (the documents named under `frameworks`). The wording of every node is the curriculum\'s own; it is stored for reference and is never shown to a visitor as a quotation. The ids are this registry\'s. Do not edit by hand.', locale: 'sv', country: 'SE', frameworks, nodes };
  const crosswalk = cw.rows ? { $comment: 'GENERATED by scripts/curricula/build-sv.js from crosswalk-authored.json (written from the official text by reviewers who teach in a Swedish lågstadium): every teaching point → the central content it teaches, prepares or extends. Lgr22 places content in the band 1–3, never in a single year.', locale: 'sv', points: cw.rows } : null;
  let diff = 0;
  if (!problems.length) diff = writeRegistry(REG, framework, crosswalk, process.argv.includes('--check'));
  const by = {};
  for (const n of nodes) by[n.f + ' ' + n.kind] = (by[n.f + ' ' + n.kind] || 0) + 1;
  console.log('sv framework: ' + nodes.length + ' nodes (' + Object.entries(by).map(([k, v]) => k + ' ' + v).join(', ') + ')');
  for (const f of frameworks) console.log('  ' + f.key + ': ' + f.checkedAgainstPdf + ' — ' + f.version);
  console.log(cw.rows ? 'sv crosswalk: ' + cw.authored + ' points mapped, ' + cw.none + ' with no counterpart' : 'sv: no crosswalk yet');
  if (problems.length || diff) { console.log((problems.length + diff) + ' problem(s)'); process.exit(1); }
})().catch((e) => { console.error(e.message); process.exit(1); });
