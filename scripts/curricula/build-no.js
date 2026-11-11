#!/usr/bin/env node
/**
 * The Norwegian registry (Daily Teaching System, Part 2): Kunnskapsløftet 2020 (LK20), the competence aims of the
 * subjects for years 1 to 4, in bokmål.
 *
 *   node scripts/curricula/build-no.js            → frontend/content/curricula/no/framework.json (+ crosswalk.json when
 *                                                   crosswalk-authored.json exists)
 *   node scripts/curricula/build-no.js --check | --list
 *
 * Nothing is written from memory: the wording is read from Utdanningsdirektoratet's own data service (Grep,
 * data.udir.no/kl06; the answers are kept in out/curricula/no/). A subject's plan names its sets of competence aims
 * ("Kompetansemål og vurdering 2. trinn"), a set names its aims, and each aim carries its wording in bokmål and its
 * official code:
 *
 *   Læreplan i matematikk, kompetansemål etter 2. trinn      → node MAT.2      (kind area, years 1-2)
 *   KM13228 gruppere tall og mengder ut fra egenskaper …     → node KM13228    (kind standard; the code is Udir's own)
 *
 * A plan that Udir has replaced points to its successor (`erstattes-av`); the builder follows that until it reaches
 * the plan in force, and records which code it read. The aims say what a pupil can do AFTER a year: mathematics after
 * years 2, 3 and 4; the other subjects after years 2 and 4. A set carries the years it is used in ("1-2", "3", "3-4").
 *
 * Checks: every plan read is in force (status publisert) and so is every aim; each set holds aims; every aim has a
 * bokmål wording and belongs to the set that named it.
 */
'use strict';
const { sha256, crosswalkFromAuthored, writeRegistry, fetchRaw } = require('./lib.js');
const REG = 'no';
const ACCESSED = '2026-11-11';
const API = 'https://data.udir.no/kl06/v201906/';
const SUBJECTS = [
  { key: 'lk20-matematikk', letter: 'MAT', code: 'MAT01-05', subject: 'math', maxYear: 5 },   // (fractions and symmetry first stand in the aims after year 5: our grade-3 pages need them to say where Norway teaches the skill)
  { key: 'lk20-norsk', letter: 'NOR', code: 'NOR01-07', subject: 'ela' },
  { key: 'lk20-naturfag', letter: 'NAT', code: 'NAT01-04', subject: 'science' },
  { key: 'lk20-samfunnsfag', letter: 'SAF', code: 'SAF01-04', subject: 'social' },
  { key: 'lk20-mat-og-helse', letter: 'MHE', code: 'MHE01-02', subject: 'health' },
  { key: 'lk20-kunst-og-handverk', letter: 'KHV', code: 'KHV01-02', subject: 'arts' },
];
const MAX_YEAR = 4;
const bokmaal = (t) => { const x = (t.tekst || []).find((v) => v.spraak === 'nob') || (t.tekst || []).find((v) => v.spraak === 'default'); return x ? x.verdi.replace(/\s+/g, ' ').trim() : null; };
const hasBokmaal = (t) => (t.tekst || []).some((v) => v.spraak === 'nob');
const status = (o) => String(o.status || '').split('/').pop();
const get = async (name, url) => { const buf = await fetchRaw(REG, name, url); return { buf, json: JSON.parse(buf.toString('utf8')) }; };

(async () => {
  const frameworks = [], nodes = [], problems = [];
  for (const s of SUBJECTS) {
    // follow the plan to the one in force
    let code = s.code, plan = null, buf = null;
    for (let hop = 0; hop < 6; hop++) {
      const r = await get(code + '.json', API + 'laereplaner-lk20/' + code);
      plan = r.json; buf = r.buf;
      const next = (plan['erstattes-av'] || [])[0];
      if (status(plan) === 'status_publisert' || !next) break;
      code = next.kode;
    }
    if (status(plan) !== 'status_publisert') { problems.push(s.key + ': ' + code + ' is not in force (' + status(plan) + ') and names no successor'); continue; }
    let aims = 0, sets = 0, before = 0;
    // The year a set belongs to is read from its title ("Kompetansemål og vurdering 4. trinn"): the service's own
    // year fields disagree with the title for one plan (naturfag after year 4 is filed under year 5), and the title
    // is what the published plan prints. A set covers the years since the set before it.
    const refs = plan['kompetansemaal-kapittel'].kompetansemaalsett.map((ref) => ({ ref, year: Number((/(\d+)\.\s?trinn/.exec(ref.tittel) || [])[1] || 0) })).filter((x) => x.year > 0 && x.year <= (s.maxYear || MAX_YEAR)).sort((a, b) => a.year - b.year);
    for (const { ref, year } of refs) {
      const set = (await get(ref.kode + '.json', ref['url-data'])).json;
      const after = [year];
      const band = year - before > 1 ? (before + 1) + '-' + year : String(year);
      before = year;
      const area = { id: s.letter + '.' + after[0], f: s.key, kind: 'area', grade: band, label: set.kode, text: 'Kompetansemål etter ' + after[0] + '. trinn' };
      nodes.push(area); sets++;
      const list = (set.kompetansemaal || []).slice();
      if (!list.length) problems.push(s.key + ': the set ' + set.kode + ' (after year ' + after[0] + ') holds no aim');
      const first = nodes.length;
      for (const k of list) {
        const km = (await get(k.kode + '.json', k['url-data'])).json;
        if (status(km) !== 'status_publisert') { problems.push(s.key + ': the aim ' + k.kode + ' is not in force (' + status(km) + ')'); continue; }
        if (!hasBokmaal(km.tittel)) problems.push(s.key + ': the aim ' + k.kode + ' has no bokmål wording');
        const sets2 = [].concat(km['tilhoerer-kompetansemaalsett'] || []).map((x) => x.kode);
        if (!sets2.includes(set.kode)) problems.push(s.key + ': the aim ' + k.kode + ' does not say it belongs to ' + set.kode);
        nodes.push({ id: k.kode, f: s.key, kind: 'standard', grade: band, parent: area.id, order: km.rekkefoelge, text: bokmaal(km.tittel) });
        aims++;
      }
      // the aims in the order the plan prints them
      const sorted = nodes.splice(first).sort((a, b) => (a.order || 0) - (b.order || 0));
      nodes.push(...sorted);
    }
    if (!sets) problems.push(s.key + ': no set of aims for years 1 to ' + MAX_YEAR);
    const fixed = plan.fastsettelsesinformasjon || {};
    frameworks.push({ key: s.key, short: 'LK20', subject: s.subject, title: bokmaal(plan.tittel) + ' (' + code + ')', publisher: 'Utdanningsdirektoratet (fastsatt som forskrift av Kunnskapsdepartementet)', year: String(fixed['fastsatt-dato'] || '').slice(0, 4) || '2020', officialDocument: 'https://www.udir.no/lk20/' + code.toLowerCase(), readFrom: API + 'laereplaner-lk20/' + code, accessed: ACCESSED, sha256: sha256(buf),
      version: 'Kunnskapsløftet 2020, plan ' + code + (code !== s.code ? ' (the successor of ' + s.code + ', followed through the service\'s own reference)' : '') + ', last changed ' + String(plan['sist-endret'] || '').slice(0, 10), band: 'the aims say what a pupil can do after a year (mathematics: 2, 3, 4; the other subjects: 2 and 4)',
      ids: 'the codes of the aims (KM…) are Utdanningsdirektoratet\'s own; the ids of the sets are this registry\'s (subject, year)', citation: bokmaal(plan.tittel) + ' (' + code + '). Kunnskapsløftet 2020. Utdanningsdirektoratet.',
      checkedAgainstPdf: aims + ' aims read in ' + sets + ' sets; the plan and every aim are in force in the service; every aim has a bokmål wording and names its set' });
  }
  // the sets and their aims in the order of the plan
  const seen = new Set();
  for (const n of nodes) { if (seen.has(n.id)) problems.push('two nodes share the id ' + n.id + ' (an aim used by two sets)'); seen.add(n.id); if (!n.text) problems.push(n.id + ': no wording'); }
  if (process.argv.includes('--list')) for (const n of nodes) console.log((n.kind === 'area' ? '' : '    ') + n.id + ' [' + n.grade + ']  ' + n.text);
  for (const n of nodes) delete n.order;
  const cw = crosswalkFromAuthored(REG, nodes);
  problems.push(...cw.problems);
  for (const m of problems.slice(0, 50)) console.log('FAIL  ' + m);
  const framework = { $comment: 'GENERATED by scripts/curricula/build-no.js from Utdanningsdirektoratet\'s data service (the plans named under `frameworks`). The wording of every node is the plan\'s own (bokmål); it is stored for reference and is never shown to a visitor as a quotation. Do not edit by hand.', locale: 'no', country: 'NO', frameworks, nodes };
  const crosswalk = cw.rows ? { $comment: 'GENERATED by scripts/curricula/build-no.js from crosswalk-authored.json (written from the official text by reviewers who teach years 1 to 4 in Norway): every teaching point → the competence aims it teaches, prepares or extends, with the years of each.', locale: 'no', points: cw.rows } : null;
  let diff = 0;
  if (!problems.length) diff = writeRegistry(REG, framework, crosswalk, process.argv.includes('--check'));
  const by = {};
  for (const n of nodes) by[n.f + ' ' + n.kind] = (by[n.f + ' ' + n.kind] || 0) + 1;
  console.log('no framework: ' + nodes.length + ' nodes (' + Object.entries(by).map(([k, v]) => k + ' ' + v).join(', ') + ')');
  for (const f of frameworks) console.log('  ' + f.key + ': ' + f.checkedAgainstPdf + ' — ' + f.version);
  console.log(cw.rows ? 'no crosswalk: ' + cw.authored + ' points mapped, ' + cw.none + ' with no counterpart' : 'no: no crosswalk yet');
  if (problems.length || diff) { console.log((problems.length + diff) + ' problem(s)'); process.exit(1); }
})().catch((e) => { console.error(e.message); process.exit(1); });
