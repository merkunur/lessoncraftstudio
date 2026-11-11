#!/usr/bin/env node
/**
 * The Dutch registry (Daily Teaching System, Part 2): the kerndoelen of primary education as the law states them.
 *
 *   node scripts/curricula/build-nl.js            → frontend/content/curricula/nl/framework.json (+ crosswalk.json when
 *                                                   crosswalk-authored.json exists)
 *   node scripts/curricula/build-nl.js --check | --list
 *
 * Nothing is written from memory: the wording is read from the two legal texts themselves (kept in out/curricula/nl/):
 *
 *  1. Besluit kerndoelen primair en speciaal onderwijs 2026 (Staatsblad 2026, 198; in force 1 August 2026), bijlage 1:
 *     the NEW kerndoelen for Nederlands and for Rekenen en wiskunde.
 *       Kerndoel 2  De leerling begrijpt teksten.                       → node K2     (kind standard)
 *       A.  De leerling toont begrip van zakelijke en literaire teksten. a. …; b. …   → node K2.A   (kind component)
 *  2. Besluit vernieuwde kerndoelen WPO (the consolidated text on wetten.overheid.nl), which since that date holds
 *     the kerndoelen of the OTHER learning areas only. Read from it: Oriëntatie op jezelf en de wereld (34–53) and
 *     Kunstzinnige oriëntatie (54–56).
 *       39. De leerlingen leren met zorg om te gaan met het milieu.    → node KD39   (kind standard)
 *
 * The numbers are the law's own. Kerndoelen describe the END of primary school: they place nothing in a group or a
 * year, so every node carries "1-8" (groep 1 to 8). What a teacher of groep 3 does in March comes from her method,
 * not from the law.
 *
 * Checks: the new kerndoelen run 1 to 18 without a gap, each with its sentence and at least one part A; the older
 * ones run 34 to 56 without a gap; the consolidated text says from which date it is valid.
 */
'use strict';
const { sha256, crosswalkFromAuthored, writeRegistry, fetchRaw } = require('./lib.js');
const REG = 'nl';
const ACCESSED = '2026-11-11';
const STB = 'https://zoek.officielebekendmakingen.nl/stb-2026-198.html';
const BWB = 'https://wetten.overheid.nl/BWBR0018844/';
/** the text of a legal page as lines, one per paragraph, list item, heading or table cell */
const linesOf = (html) => html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/\s+/g, ' ').replace(/<\/(p|li|h[1-6]|div|tr|td|th|dt|dd)>/g, '\n').replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d))).replace(/[ \t]+/g, ' ').split('\n').map((l) => l.trim()).filter(Boolean);

(async () => {
  const frameworks = [], nodes = [], problems = [];
  // 1. the kerndoelen of 2026
  {
    const buf = await fetchRaw(REG, 'stb-2026-198.html', STB);
    const s = linesOf(buf.toString('utf8'));
    let a = -1;
    s.forEach((l, i) => { if (a < 0 && /^Bijlage 1\. Kerndoelen primair en speciaal onderwijs/.test(l) && /^Onderdeel A\./.test(s[i + 1] || '')) a = i; });
    const b = s.findIndex((l, i) => i > a && /^Bijlage 2\./.test(l));
    const title = s.find((l) => /^Besluit van \d+ \w+ \d{4}, houdende/.test(l)) || '';
    if (a < 0 || b < 0) problems.push('kerndoelen 2026: bijlage 1 was not found in the Staatsblad text');
    if (!/Besluit kerndoelen primair en speciaal onderwijs 2026/.test(title)) problems.push('kerndoelen 2026: the Staatsblad text does not name the Besluit kerndoelen primair en speciaal onderwijs 2026');
    const FW = { A: { key: 'kerndoelen-2026-nederlands', subject: 'ela', name: 'Nederlands' }, B: { key: 'kerndoelen-2026-rekenen-wiskunde', subject: 'math', name: 'Rekenen en wiskunde' } };
    let part = null, domain = null, goal = null, comp = null, expect = null;
    const numbers = [];
    for (const l of s.slice(a + 1, b)) {
      let m;
      if ((m = /^Onderdeel ([AB])\. (.+)$/.exec(l))) { part = FW[m[1]]; if (!part || part.name !== m[2]) problems.push('kerndoelen 2026: an unexpected part "' + l + '"'); domain = goal = comp = null; continue; }
      if ((m = /^Domein: (.+)$/.exec(l))) { domain = m[1]; goal = comp = null; continue; }
      if ((m = /^Kerndoel (\d+)$/.exec(l))) { numbers.push(Number(m[1])); goal = { id: 'K' + m[1], f: part.key, kind: 'standard', grade: '1-8', label: 'kerndoel ' + m[1], domain, text: '' }; nodes.push(goal); comp = null; expect = 'goal'; continue; }
      if (/^Doelzin:?$/.test(l) || /^Het gaat hierbij om:?$/.test(l)) continue;
      if (!goal) { problems.push('kerndoelen 2026: a line outside any kerndoel: "' + l.slice(0, 60) + '"'); continue; }
      if ((m = /^([A-Z])\.$/.exec(l))) { comp = { id: goal.id + '.' + m[1], f: part.key, kind: 'component', grade: '1-8', parent: goal.id, text: '' }; nodes.push(comp); expect = 'comp'; continue; }
      if (expect === 'goal') { goal.text = l; expect = null; continue; }
      if (expect === 'comp') { comp.text = l; expect = null; continue; }
      if (comp && /^[a-z]\. /.test(l)) { comp.text += ' ' + l; continue; }
      if (comp) { comp.text += ' ' + l; continue; }   // a paragraph the page broke
      problems.push('kerndoelen 2026 ' + goal.id + ': a line that fits nowhere: "' + l.slice(0, 60) + '"');
    }
    numbers.forEach((n, i) => { if (n !== i + 1) problems.push('kerndoelen 2026: the kerndoelen run ' + numbers.join(' ')); });
    for (const n of nodes.filter((x) => x.kind === 'standard')) { if (!n.text) problems.push(n.id + ': no sentence'); if (!nodes.some((c) => c.parent === n.id)) problems.push(n.id + ': no part A'); }
    for (const k of Object.values(FW)) {
      const mine = nodes.filter((n) => n.f === k.key);
      frameworks.push({ key: k.key, short: 'Kerndoelen', subject: k.subject, title: 'Besluit kerndoelen primair en speciaal onderwijs 2026, bijlage 1: ' + k.name, publisher: 'Ministerie van Onderwijs, Cultuur en Wetenschap (Staatsblad van het Koninkrijk der Nederlanden)', year: '2026', officialDocument: STB, readFrom: STB, accessed: ACCESSED, sha256: sha256(buf),
        version: 'Staatsblad 2026, 198 (' + title.slice(0, 26).trim() + '); in force since 1 August 2026', band: 'the end of primary school (groep 8): the kerndoelen place nothing in a group or a year', ids: 'the kerndoel numbers and the letters of their parts are the decree\'s own',
        citation: 'Besluit kerndoelen primair en speciaal onderwijs 2026. Staatsblad 2026, 198.', checkedAgainstPdf: mine.filter((n) => n.kind === 'standard').length + ' kerndoelen and ' + mine.filter((n) => n.kind === 'component').length + ' parts read; the kerndoelen run 1 to ' + numbers.length + ' without a gap' });
    }
  }
  // 2. the kerndoelen of the other learning areas (2006), as the consolidated text holds them today
  {
    const buf = await fetchRaw(REG, 'bwb.html', BWB);
    const w = linesOf(buf.toString('utf8'));
    const valid = (w.find((l) => /Geldend van \d\d-\d\d-\d{4}/.test(l)) || '').match(/Geldend van (\d\d-\d\d-\d{4}) t\/m (\S+)/);
    if (!valid) problems.push('kerndoelen 2006: the consolidated text does not say from when it is valid');
    else if (valid[2] !== 'heden.' && valid[2] !== 'heden') problems.push('kerndoelen 2006: the consolidated text is not the one valid today (' + valid[0] + ')');
    const AREAS = [{ key: 'kerndoelen-2006-orientatie', subject: 'science-social', name: 'Oriëntatie op jezelf en de wereld', from: 34, to: 53 }, { key: 'kerndoelen-2006-kunstzinnige-orientatie', subject: 'arts', name: 'Kunstzinnige oriëntatie', from: 54, to: 56 }];
    for (const A of AREAS) {
      const start = w.findIndex((l) => l === A.name);
      if (start < 0) { problems.push(A.key + ': the learning area "' + A.name + '" is not in the consolidated text'); continue; }
      let sub = null;
      const got = [];
      for (const l of w.slice(start + 1)) {
        const m = /^(\d+)\. (.+)$/.exec(l);
        if (m) { const no = Number(m[1]); if (no < A.from || no > A.to) break; got.push(no); nodes.push({ id: 'KD' + no, f: A.key, kind: 'standard', grade: '1-8', label: 'kerndoel ' + no, domain: sub || undefined, text: m[2] }); continue; }
        if (got.length && l.length < 40 && /^[A-Z]/.test(l) && !/[.;,:]$/.test(l) && l !== 'Kerndoelen' && l !== 'Karakteristiek') { if (AREAS.some((x) => x.name === l) || /^Bewegingsonderwijs$/.test(l)) break; sub = l; continue; }
        if (!got.length && l.length < 40 && /^[A-Z]/.test(l) && !/[.;,:]$/.test(l) && l !== 'Kerndoelen' && l !== 'Karakteristiek') sub = l;
      }
      const want = []; for (let n = A.from; n <= A.to; n++) want.push(n);
      if (got.join(' ') !== want.join(' ')) problems.push(A.key + ': the kerndoelen read are ' + got.join(' ') + ' (' + A.from + ' to ' + A.to + ' expected)');
      frameworks.push({ key: A.key, short: 'Kerndoelen', subject: A.subject, title: 'Besluit vernieuwde kerndoelen WPO, bijlage: ' + A.name, publisher: 'Ministerie van Onderwijs, Cultuur en Wetenschap', year: '2006', officialDocument: BWB, readFrom: BWB, accessed: ACCESSED, sha256: sha256(buf),
        version: 'Besluit van 8 oktober 2005 (Stb. 2005, 551), the consolidated text valid from ' + (valid ? valid[1] : '?') + ' to today', band: 'the end of primary school (groep 8)', ids: 'the kerndoel numbers are the decree\'s own',
        citation: 'Besluit vernieuwde kerndoelen WPO. Staatsblad 2005, 551 (geldende tekst, wetten.overheid.nl).', checkedAgainstPdf: got.length + ' kerndoelen read (' + A.from + ' to ' + A.to + ', without a gap)' });
    }
  }
  const seen = new Set();
  for (const n of nodes) { if (seen.has(n.id)) problems.push('two nodes share the id ' + n.id); seen.add(n.id); n.text = n.text.replace(/\s+/g, ' ').replace(/ ([,;.])/g, '$1').trim(); if (n.text.length < 10) problems.push(n.id + ': wording too short: "' + n.text + '"'); }
  if (process.argv.includes('--list')) for (const n of nodes) console.log((n.kind === 'component' ? '    ' : '') + n.id + ' [' + n.grade + ']  ' + (n.domain && n.kind === 'standard' ? '(' + n.domain + ') ' : '') + n.text);
  const cw = crosswalkFromAuthored(REG, nodes);
  problems.push(...cw.problems);
  for (const m of problems.slice(0, 50)) console.log('FAIL  ' + m);
  const framework = { $comment: 'GENERATED by scripts/curricula/build-nl.js from the two legal texts named under `frameworks`. The wording of every node is the decree\'s own; it is stored for reference and is never shown to a visitor as a quotation. Do not edit by hand.', locale: 'nl', country: 'NL', frameworks, nodes };
  const crosswalk = cw.rows ? { $comment: 'GENERATED by scripts/curricula/build-nl.js from crosswalk-authored.json (written from the official text by reviewers who teach in a Dutch basisschool): every teaching point → the kerndoelen it teaches, prepares or extends. Kerndoelen describe the end of primary school; they place nothing in a group.', locale: 'nl', points: cw.rows } : null;
  let diff = 0;
  if (!problems.length) diff = writeRegistry(REG, framework, crosswalk, process.argv.includes('--check'));
  const by = {};
  for (const n of nodes) by[n.f + ' ' + n.kind] = (by[n.f + ' ' + n.kind] || 0) + 1;
  console.log('nl framework: ' + nodes.length + ' nodes (' + Object.entries(by).map(([k, v]) => k + ' ' + v).join(', ') + ')');
  for (const f of frameworks) console.log('  ' + f.key + ': ' + f.checkedAgainstPdf + ' — ' + f.version);
  console.log(cw.rows ? 'nl crosswalk: ' + cw.authored + ' points mapped, ' + cw.none + ' with no counterpart' : 'nl: no crosswalk yet');
  if (problems.length || diff) { console.log((problems.length + diff) + ' problem(s)'); process.exit(1); }
})().catch((e) => { console.error(e.message); process.exit(1); });
