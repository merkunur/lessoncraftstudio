#!/usr/bin/env node
/**
 * The Finnish registry (Daily Teaching System, Part 2): the Perusopetuksen opetussuunnitelman perusteet 2014 — the
 * objectives of instruction (tavoitteet, T1 …) and the content areas (sisältöalueet, S1 …) of mathematics, Finnish
 * language and literature, environmental studies and visual arts, for vuosiluokat 1–2 and 3–6.
 *
 *   node scripts/curricula/build-fi.js            → frontend/content/curricula/fi/framework.json (+ crosswalk.json when
 *                                                   crosswalk-authored.json exists)
 *   node scripts/curricula/build-fi.js --check | --list
 *
 * Nothing is written from memory: the wording is read from the Finnish National Agency for Education's own service
 * (ePerusteet, eperusteet.opintopolku.fi; the answer is kept in out/curricula/fi/). The national core curriculum is
 * published there as data: for each subject and each unit of grades its numbered objectives and content areas.
 *
 *   Matematiikka, vuosiluokat 1–2                      → node MA.1-2        (kind area)
 *   T6 tukea oppilasta lukukäsitteen kehittymisessä …  → node MA.1-2.T6     (kind standard: an objective of instruction)
 *   S2 Luvut ja laskutoimitukset: Varmistetaan, että … → node MA.1-2.S2     (kind content: what is taught toward it)
 *
 * T6 and S2 are the curriculum's own numbers. The core curriculum plans in units of grades (1–2, then 3–6) and places
 * nothing in a single year: every node carries "1-2" or "3-6".
 *
 * Checks: the document is the one in force (no end date); within each subject and unit the objectives run T1, T2 …
 * and the content areas S1, S2 … without a gap; every objective names content areas that exist.
 */
'use strict';
const { sha256, crosswalkFromAuthored, writeRegistry, fetchRaw } = require('./lib.js');
const REG = 'fi';
const ACCESSED = '2026-11-11';
const ID = 419550;
const URL = 'https://eperusteet.opintopolku.fi/eperusteet-service/api/external/peruste/' + ID;
const SUBJECTS = [
  { key: 'ops2014-matematiikka', letter: 'MA', name: 'Matematiikka', subject: 'math' },
  { key: 'ops2014-aidinkieli', letter: 'AI', name: 'Äidinkieli ja kirjallisuus', syllabus: 'Suomen kieli ja kirjallisuus', subject: 'ela' },
  { key: 'ops2014-ymparistooppi', letter: 'YM', name: 'Ympäristöoppi', subject: 'science-social' },
  { key: 'ops2014-kuvataide', letter: 'KU', name: 'Kuvataide', subject: 'arts' },
];
const ent = (s) => String(s || '').replace(/­/g, '').replace(/&shy;/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&ndash;/g, '–').replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)));
const txt = (s) => ent(String(s || '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

(async () => {
  const frameworks = [], nodes = [], problems = [];
  const buf = await fetchRaw(REG, 'peruste-' + ID + '.json', URL);
  const doc = JSON.parse(buf.toString('utf8'));
  if (doc.voimassaoloLoppuu) problems.push('the document has an end date: it is no longer the one in force');
  if (!/Perusopetuksen opetussuunnitelman perusteet/.test((doc.nimi || {}).fi || '')) problems.push('the document is not the Perusopetuksen opetussuunnitelman perusteet');
  const po = doc.perusopetus;
  const units = new Map(po.vuosiluokkakokonaisuudet.map((v) => { const ys = v.vuosiluokat.map((y) => Number(y.replace('vuosiluokka_', ''))).sort((a, b) => a - b); return [String(v.id), ys[0] + '-' + ys[ys.length - 1]]; }));
  for (const s of SUBJECTS) {
    let sub = po.oppiaineet.find((o) => o.nimi && o.nimi.fi === s.name);
    if (sub && s.syllabus) sub = (sub.oppimaarat || []).find((o) => o.nimi && o.nimi.fi === s.syllabus);
    if (!sub) { problems.push(s.key + ': the subject "' + (s.syllabus || s.name) + '" was not found'); continue; }
    let goals = 0, contents = 0;
    for (const band of ['1-2', '3-6']) {
      const v = (sub.vuosiluokkakokonaisuudet || []).find((x) => units.get(String(x._vuosiluokkaKokonaisuus)) === band);
      if (!v) { problems.push(s.key + ': no unit for vuosiluokat ' + band); continue; }
      const area = { id: s.letter + '.' + band, f: s.key, kind: 'area', grade: band, text: (s.syllabus || s.name) + ', vuosiluokat ' + band.replace('-', '–') };
      nodes.push(area);
      const contentIds = new Map();
      const cs = [];
      for (const c of v.sisaltoalueet || []) {
        const name = txt((c.nimi || {}).fi), m = /^S(\d+)\s+(.*)$/.exec(name);
        if (!m) { problems.push(s.key + ' ' + band + ': a content area without its number: "' + name.slice(0, 50) + '"'); continue; }
        contentIds.set(String(c.id), 'S' + m[1]);
        cs.push({ no: Number(m[1]), node: { id: area.id + '.S' + m[1], f: s.key, kind: 'content', grade: band, parent: area.id, label: 'S' + m[1], text: m[2] + ': ' + txt((c.kuvaus || {}).fi) } });
      }
      const gs = [];
      for (const t of v.tavoitteet || []) {
        const name = txt((t.tavoite || {}).fi), m = /^T(\d+)\s+(.*)$/.exec(name);
        if (!m) { problems.push(s.key + ' ' + band + ': an objective without its number: "' + name.slice(0, 50) + '"'); continue; }
        const linked = (t.sisaltoalueet || []).map((id) => contentIds.get(String(id)));
        if (linked.some((x) => !x)) problems.push(s.key + ' ' + band + ' T' + m[1] + ': it names a content area that this unit does not hold');
        gs.push({ no: Number(m[1]), node: { id: area.id + '.T' + m[1], f: s.key, kind: 'standard', grade: band, parent: area.id, label: 'T' + m[1], contents: linked.filter(Boolean).sort((a, b) => Number(a.slice(1)) - Number(b.slice(1))), text: m[2] } });
      }
      for (const [list, what] of [[gs, 'objectives T'], [cs, 'content areas S']]) {
        list.sort((a, b) => a.no - b.no);
        if (!list.length) problems.push(s.key + ' ' + band + ': no ' + what);
        list.forEach((x, i) => { if (x.no !== i + 1) problems.push(s.key + ' ' + band + ': its ' + what + ' run ' + list.map((y) => y.no).join(' ')); });
      }
      nodes.push(...gs.map((x) => x.node), ...cs.map((x) => x.node));
      goals += gs.length; contents += cs.length;
    }
    frameworks.push({ key: s.key, short: 'OPS 2014', subject: s.subject, title: 'Perusopetuksen opetussuunnitelman perusteet 2014: ' + (s.syllabus || s.name), publisher: 'Opetushallitus', year: '2014', officialDocument: 'https://eperusteet.opintopolku.fi/#/fi/perusopetus/' + ID + '/tiedot', readFrom: URL, accessed: ACCESSED, sha256: sha256(buf),
      version: 'Määräys ' + doc.diaarinumero + ', in force since ' + new Date(doc.voimassaoloAlkaa).toISOString().slice(0, 10) + '; the service\'s publication of ' + new Date(doc.viimeisinJulkaisuAika || doc.muokattu).toISOString().slice(0, 10), band: 'units of grades: vuosiluokat 1–2 and 3–6',
      ids: 'T (tavoite) and S (sisältöalue) with their numbers are the curriculum\'s own; the subject letters and the band are this registry\'s', citation: 'Perusopetuksen opetussuunnitelman perusteet 2014. Opetushallitus. Määräykset ja ohjeet 2014:96.',
      checkedAgainstPdf: goals + ' objectives and ' + contents + ' content areas read; numbered without a gap in each unit; every objective names content areas of its own unit' });
  }
  const seen = new Set();
  for (const n of nodes) { if (seen.has(n.id)) problems.push('two nodes share the id ' + n.id); seen.add(n.id); if (!n.text || n.text.length < 5) problems.push(n.id + ': no wording'); if (/<|&[a-z]+;/.test(n.text)) problems.push(n.id + ': markup is left in the wording'); }
  if (process.argv.includes('--list')) for (const n of nodes) console.log((n.kind === 'area' ? '' : '    ') + n.id + ' [' + n.grade + ']  ' + n.text);
  const cw = crosswalkFromAuthored(REG, nodes);
  problems.push(...cw.problems);
  for (const m of problems.slice(0, 50)) console.log('FAIL  ' + m);
  const framework = { $comment: 'GENERATED by scripts/curricula/build-fi.js from the Finnish National Agency for Education\'s ePerusteet service (the document named under `frameworks`). The wording of every node is the core curriculum\'s own; it is stored for reference and is never shown to a visitor as a quotation. Do not edit by hand.', locale: 'fi', country: 'FI', frameworks, nodes };
  const crosswalk = cw.rows ? { $comment: 'GENERATED by scripts/curricula/build-fi.js from crosswalk-authored.json (written from the official text by reviewers who teach vuosiluokat 1–3 in Finland): every teaching point → the objectives and content areas it teaches, prepares or extends. The core curriculum places content in units of grades, never in a single year.', locale: 'fi', points: cw.rows } : null;
  let diff = 0;
  if (!problems.length) diff = writeRegistry(REG, framework, crosswalk, process.argv.includes('--check'));
  const by = {};
  for (const n of nodes) by[n.f + ' ' + n.kind] = (by[n.f + ' ' + n.kind] || 0) + 1;
  console.log('fi framework: ' + nodes.length + ' nodes (' + Object.entries(by).map(([k, v]) => k + ' ' + v).join(', ') + ')');
  for (const f of frameworks) console.log('  ' + f.key + ': ' + f.checkedAgainstPdf + ' — ' + f.version);
  console.log(cw.rows ? 'fi crosswalk: ' + cw.authored + ' points mapped, ' + cw.none + ' with no counterpart' : 'fi: no crosswalk yet');
  if (problems.length || diff) { console.log((problems.length + diff) + ' problem(s)'); process.exit(1); }
})().catch((e) => { console.error(e.message); process.exit(1); });
