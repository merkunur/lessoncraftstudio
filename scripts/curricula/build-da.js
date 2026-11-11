#!/usr/bin/env node
/**
 * The Danish registry (Daily Teaching System, Part 2): Fælles Mål as the law states them — the competence goals
 * (kompetencemål) and the points of attention (opmærksomhedspunkter) of the børnehaveklasse and of the subjects, up
 * to the 4th klassetrin.
 *
 *   node scripts/curricula/build-da.js            → frontend/content/curricula/da/framework.json (+ crosswalk.json when
 *                                                   crosswalk-authored.json exists)
 *   node scripts/curricula/build-da.js --check | --list
 *
 * Nothing is written from memory: the wording is read from the two orders themselves as Retsinformation publishes
 * them in XML (BEK nr 1715 and nr 1716 of 30/12/2024; kept in out/curricula/da/). Each subject is an annex (Bilag):
 *
 *   Bilag 11 Matematik / Kompetencemål for faget matematik efter 3. klassetrin
 *   Tal og algebra: Eleven kan udvikle metoder til beregninger med naturlige tal.      → node MAT.3.K2 (kind standard)
 *   Opmærksomhedspunkt (Tal): Elevene kan anvende trecifrede tal til at beskrive …     → node MAT.3.O1 (kind criterion)
 *
 * Since 1 January 2025 ONLY these are binding. The detailed færdigheds- og vidensmål that Danish teachers know from
 * the faghæfter are advisory and are not in the law; this registry does not hold them (the ministry's own files of
 * the faghæfter could not be read by a script when this was built: the site answers with a page, not the file).
 * The goals say what a pupil can do AFTER a klassetrin; a set covers the years since the set before it. The law
 * numbers neither the goals nor the points: the ids are this registry's (subject, klassetrin, K or O, place).
 *
 * Checks: both orders are marked valid by Retsinformation; every annex read holds, for each klassetrin, a goal under
 * every competence area it names; every node is a full sentence.
 */
'use strict';
const { sha256, crosswalkFromAuthored, writeRegistry, fetchRaw } = require('./lib.js');
const REG = 'da';
const ACCESSED = '2026-11-11';
const ELI = 'https://www.retsinformation.dk/eli/lta/2024/';
const MAX = 4;
const SUBJECTS = [
  { key: 'faelles-maal-boernehaveklassen', letter: 'BH', order: '1716', bilag: '1', subject: 'preschool-class', name: 'Børnehaveklassen' },
  { key: 'faelles-maal-dansk', letter: 'DAN', order: '1715', bilag: '1', subject: 'ela', name: 'Dansk' },
  { key: 'faelles-maal-matematik', letter: 'MAT', order: '1715', bilag: '11', subject: 'math', name: 'Matematik' },
  { key: 'faelles-maal-natur-teknologi', letter: 'NT', order: '1715', bilag: '12', subject: 'science', name: 'Natur/teknologi' },
  { key: 'faelles-maal-historie', letter: 'HIS', order: '1715', bilag: '4', subject: 'social', name: 'Historie' },
  { key: 'faelles-maal-billedkunst', letter: 'BIL', order: '1715', bilag: '8', subject: 'arts', name: 'Billedkunst' },
  { key: 'faelles-maal-faerdselslaere', letter: 'FAE', order: '1715', bilag: '20', subject: 'health', name: 'Færdselslære' },
  { key: 'faelles-maal-sundhed', letter: 'SSF', order: '1715', bilag: '21', subject: 'health', name: 'Sundheds- og seksualundervisning og familiekundskab' },
];
const ent = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)));
const meta = (xml, tag) => (new RegExp('<' + tag + '[^>]*>([^<]*)').exec(xml) || [])[1] || null;
/** the paragraphs of an annex in order: { forma: the style of its first run, text } */
function paragraphs(bilag) {
  const out = [];
  for (const m of bilag.matchAll(/<Exitus\b[^>]*>([\s\S]*?)<\/Exitus>/g)) {
    const runs = [...m[1].matchAll(/<Char\b([^>]*)>([^<]*)<\/Char>/g)].map((c) => ({ forma: (/formaChar="([^"]*)"/.exec(c[1]) || [])[1] || '', text: ent(c[2]) }));
    const text = runs.map((r) => r.text).join('').replace(/\s+/g, ' ').trim();
    if (text) out.push({ forma: runs[0].forma, runs, text });
  }
  return out;
}

(async () => {
  const frameworks = [], nodes = [], problems = [];
  const orders = {};
  for (const no of ['1715', '1716']) {
    const buf = await fetchRaw(REG, 'bek-2024-' + no + '.xml', ELI + no + '/xml');
    const xml = buf.toString('utf8');
    orders[no] = { buf, xml, title: meta(xml, 'DocumentTitle'), status: meta(xml, 'Status'), start: meta(xml, 'StartDate'), end: meta(xml, 'EndDate'), signed: meta(xml, 'DiesSigni') };
    if (orders[no].status !== 'Valid') problems.push('BEK nr ' + no + ' is marked "' + orders[no].status + '" by Retsinformation, not Valid');
    if (!/Fælles Mål/.test(orders[no].title || '')) problems.push('BEK nr ' + no + ' is not a Fælles Mål order');
  }
  for (const s of SUBJECTS) {
    const o = orders[s.order];
    const bilag = [...o.xml.matchAll(/<Bilag\b[^>]*>[\s\S]*?<\/Bilag>/g)].map((m) => m[0]).find((b) => new RegExp('<Explicatus>Bilag ' + s.bilag + '</Explicatus>').test(b.slice(0, 600)));
    if (!bilag) { problems.push(s.key + ': Bilag ' + s.bilag + ' of BEK nr ' + s.order + ' was not found'); continue; }
    const ps = paragraphs(bilag);
    const title = (/<Rubrica[^>]*>([\s\S]*?)<\/Rubrica>/.exec(bilag) || ['', ''])[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (!title.toLowerCase().startsWith(s.name.toLowerCase().slice(0, 8))) problems.push(s.key + ': Bilag ' + s.bilag + ' is titled "' + title + '", not ' + s.name);
    let mode = null, year = null, before = 0, areaName = null, band = null, set = null, k = 0, op = 0, read = 0;
    const openAreas = new Map();   // per set: competence areas named → goals read under them
    for (const p of ps) {
      const head = /^(Kompetencemål|Opmærksomhedspunkter?) for (?:faget|emnet|det obligatoriske emne|valgfaget)?\s*.*?(?:efter (\d+)\. klassetrin|i børnehaveklassen)?$/.exec(p.text);
      if (/Bold/.test(p.forma) && head) {
        const y = head[2] ? Number(head[2]) : s.letter === 'BH' ? 0 : null;
        mode = /^Kompetencemål/.test(p.text) ? 'K' : 'O';
        if (y === null) { year = null; continue; }
        if (y !== year && mode === 'K') { band = y === 0 ? '0' : y - before > 1 ? (before + 1) + '-' + y : String(y); before = y; k = 0; op = 0; }
        year = y;
        if (year > MAX) { set = null; continue; }
        const id = s.letter + '.' + year;
        set = nodes.find((n) => n.id === id);
        if (!set) { set = { id, f: s.key, kind: 'area', grade: band, text: s.name + (year === 0 ? '' : ', efter ' + year + '. klassetrin') }; nodes.push(set); openAreas.set(id, new Map()); }
        areaName = null;
        continue;
      }
      if (!set || year === null || year > MAX) continue;
      if (/Underline/.test(p.forma) && p.runs.length === 1) { areaName = p.text; if (mode === 'K') openAreas.get(set.id).set(areaName, 0); continue; }
      if (mode === 'K') {
        if (!areaName) { problems.push(s.key + ' ' + set.id + ': a goal before any competence area: "' + p.text.slice(0, 50) + '"'); continue; }
        nodes.push({ id: set.id + '.K' + (++k), f: s.key, kind: 'standard', grade: set.grade, parent: set.id, label: areaName, text: areaName + ': ' + p.text });
        openAreas.get(set.id).set(areaName, openAreas.get(set.id).get(areaName) + 1); read++;
      } else if (mode === 'O') {
        const t = p.text.replace(/^Opmærksomhedspunkt(?:er)?:\s*/, '');
        if (t === p.text && !/^Eleve/.test(t)) continue;   // an explanatory line, not a point
        nodes.push({ id: set.id + '.O' + (++op), f: s.key, kind: 'criterion', grade: set.grade, parent: set.id, label: areaName || undefined, text: (areaName ? areaName + ': ' : '') + t });
        read++;
      }
    }
    for (const [id, areas] of openAreas) { if (!areas.size) problems.push(s.key + ' ' + id + ': no competence area read'); for (const [a, n] of areas) if (n !== 1) problems.push(s.key + ' ' + id + ': the competence area "' + a + '" holds ' + n + ' goals (one expected)'); }
    if (!read) problems.push(s.key + ': nothing read up to the ' + MAX + 'th klassetrin');
    frameworks.push({ key: s.key, short: 'Fælles Mål', subject: s.subject, title: o.title + ', Bilag ' + s.bilag + ': ' + title, publisher: 'Børne- og Undervisningsministeriet (Styrelsen for Undervisning og Kvalitet)', year: '2024', officialDocument: ELI + s.order, readFrom: ELI + s.order + '/xml', accessed: ACCESSED, sha256: sha256(o.buf),
      version: 'BEK nr ' + s.order + ' af ' + o.signed.split('-').reverse().join('/') + ', in force from 1 January 2025; Retsinformation marks it "' + o.status + '" (period ' + o.start + ' to ' + (o.end || 'open') + ')', band: s.letter === 'BH' ? 'the børnehaveklasse (the year before 1st klassetrin): 0' : 'the goals say what a pupil can do after a klassetrin; a set covers the years since the set before it',
      ids: 'this registry\'s own (the order numbers neither goals nor points): subject, klassetrin, K (kompetencemål) or O (opmærksomhedspunkt), place', citation: o.title + '. BEK nr ' + s.order + ' af ' + o.signed.split('-').reverse().join('/') + '. Børne- og Undervisningsministeriet.',
      checkedAgainstPdf: read + ' goals and points read from the annex; each competence area of each klassetrin holds exactly one goal; only the binding text is read (the advisory færdigheds- og vidensmål are not in the order)' });
  }
  const seen = new Set();
  for (const n of nodes) { if (seen.has(n.id)) problems.push('two nodes share the id ' + n.id); seen.add(n.id); if (n.kind !== 'area' && !/[.!?]$/.test(n.text)) problems.push(n.id + ': the wording does not end as a sentence: "' + n.text.slice(-40) + '"'); }
  if (process.argv.includes('--list')) for (const n of nodes) console.log((n.kind === 'area' ? '' : '    ') + n.id + ' [' + n.grade + ']  ' + n.text);
  const cw = crosswalkFromAuthored(REG, nodes);
  problems.push(...cw.problems);
  for (const m of problems.slice(0, 50)) console.log('FAIL  ' + m);
  const framework = { $comment: 'GENERATED by scripts/curricula/build-da.js from the two Fælles Mål orders as Retsinformation publishes them (named under `frameworks`). The wording of every node is the order\'s own; it is stored for reference and is never shown to a visitor as a quotation. The ids are this registry\'s. Do not edit by hand.', locale: 'da', country: 'DK', frameworks, nodes };
  const crosswalk = cw.rows ? { $comment: 'GENERATED by scripts/curricula/build-da.js from crosswalk-authored.json (written from the official text by reviewers who teach indskolingen in Denmark): every teaching point → the competence goals and points of attention it teaches, prepares or extends.', locale: 'da', points: cw.rows } : null;
  let diff = 0;
  if (!problems.length) diff = writeRegistry(REG, framework, crosswalk, process.argv.includes('--check'));
  const by = {};
  for (const n of nodes) by[n.f + ' ' + n.kind] = (by[n.f + ' ' + n.kind] || 0) + 1;
  console.log('da framework: ' + nodes.length + ' nodes (' + Object.entries(by).map(([k, v]) => k + ' ' + v).join(', ') + ')');
  console.log(cw.rows ? 'da crosswalk: ' + cw.authored + ' points mapped, ' + cw.none + ' with no counterpart' : 'da: no crosswalk yet');
  if (problems.length || diff) { console.log((problems.length + diff) + ' problem(s)'); process.exit(1); }
})().catch((e) => { console.error(e.message); process.exit(1); });
