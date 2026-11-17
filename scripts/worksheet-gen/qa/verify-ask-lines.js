#!/usr/bin/env node
/**
 * The comparison templates whose copies ask the two ends of their title in turn (2026-11-17, the Position Words model:
 * "Big and Small" asked BIGGEST, "Heavy or Light?" HEAVIER and "More or Less?" MORE on every new version):
 * K-032 Big and Small, K-035 Tall and Short, K-037 Long and Short, K-079 Big Shapes, Small Shapes (size-compare.js),
 * K-038 Heavy or Light? (measurement-tasks.js), K-008 More or Less? (compare-groups.js); data/ask-lines.json.
 *
 *   node qa/verify-ask-lines.js            every language, the catalogue build and the maker page, no browser
 *   node qa/verify-ask-lines.js --poison   the same checks must FAIL on five planted faults
 *
 * Per template and language, over copies 1 to 60 at level 2 and 1 to 12 at levels 1 and 3:
 *   A  the first end's sentence is the registered instruction (i18n/strings.<loc>.json) word for word, the other end has
 *      its own, different sentence (K-038: its screen lines too, the first = i18n/interactive-instructions.json)
 *   B  copy 1 of every level asks the published end, brings no words of its own and no data-lcs-ask
 *   C  both ends are asked, each on about half the copies, never one end more than twice in a row
 *   D  the marks follow the asked end: the circled picture is the biggest / smallest (size), the heavier / lighter of the
 *      pair (K-038, its answer key and its screen questions, answered by the type's own oracle), the group with more /
 *      fewer (K-008); a page asking the other end says so on every row (data-lcs-ask)
 *   E  a copy asking the other end brings that end's sentence (K-038: and its tap line); a copy asking the published end
 *      brings none
 *   F  the maker's page (makers/runtime.js makePage, the shell's copy numbers) prints the line of the end it asks, in
 *      every language, and over 16 new versions both ends are asked
 */
'use strict';
const path = require('path');
const WG = path.join(__dirname, '..');
const POISON = process.argv.includes('--poison');
const LOCALES = ['en', 'de', 'sv', 'fr', 'no', 'nl', 'fi', 'da', 'it', 'es', 'pt'];
const TYPES = [
  ['K-032', 'k/K-032-biggest-and-smallest.js', 'size', 'animals'],
  ['K-035', 'k/K-035-tallest-and-shortest.js', 'size', 'animals'],
  ['K-037', 'k/K-037-longest-and-shortest.js', 'size', 'animals'],
  ['K-079', 'k/K-079-big-small-shapes.js', 'size', null],
  ['K-038', 'k/K-038-heavier-or-lighter.js', 'heavy', 'animals'],
  ['K-008', 'k/K-008-which-has-more.js', 'groups', 'animals'],
];
const { makeRng, instanceSeed } = require(path.join(WG, 'lib', 'rng.js'));
const ASK = require(path.join(WG, 'data', 'ask-lines.json'));   // the same object the factories read (lib/copy-asks.js)
const ORIGINAL = JSON.parse(JSON.stringify(ASK));
const II = require(path.join(WG, 'i18n', 'interactive-instructions.json'));
const norm = (t) => String(t || '').replace(/&nbsp;|[  ]/g, ' ').replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

/** which end a built page asks, read from the PAGE (the marks), never from the data */
function endOfPage(kind, html) {
  if (kind === 'size') {
    const rows = [...html.matchAll(/data-lcs-targetscale="([\d.]+)"/g)].map((m) => +m[1]);
    const ends = rows.map((ts, i) => {
      const stage = html.split('data-lcs-targetscale=')[i + 1].split('</div>')[0];
      const scales = [...stage.matchAll(/data-lcs-scale="([\d.]+)"/g)].map((m) => +m[1]);
      const tgt = (/data-lcs-target="1"[^>]*data-lcs-scale="([\d.]+)"|data-lcs-scale="([\d.]+)"[^>]*data-lcs-target="1"/.exec(stage) || []).slice(1).find(Boolean);
      if (tgt == null || +tgt !== ts) return '?';
      return ts === Math.max(...scales) ? 'largest' : ts === Math.min(...scales) ? 'smallest' : '?';
    });
    return ends;
  }
  if (kind === 'heavy') {
    return html.split('data-lcs-heavy="').slice(1).map((part) => {
      const heavy = part.slice(0, part.indexOf('"'));
      const stage = part.split('</div>')[0];
      const right = (/data-lcs-correct="1" data-lcs-noun="([^"]+)"/.exec(stage) || [])[1];
      return right == null ? '?' : right === heavy ? 'heavier' : 'lighter';
    });
  }
  return html.split('class="ws-card-stage"').slice(1).map((part) => {
    const stage = part.split('class="ws-card-stage"')[0];
    const gs = [...stage.matchAll(/data-lcs-group="(\d+)"([^>]*)/g)].map((m) => ({ n: +m[1], t: /data-lcs-target="1"/.test(m[2]) }));
    if (gs.length !== 2 || gs.filter((g) => g.t).length !== 1) return '?';
    const t = gs.find((g) => g.t).n, o = gs.find((g) => !g.t).n;
    return t > o ? 'more' : t < o ? 'fewer' : '?';
  });
}

function run(fault) {
  const fails = [];
  // planted faults in the data the factories read
  for (const k of Object.keys(ASK)) delete ASK[k];
  Object.assign(ASK, JSON.parse(JSON.stringify(ORIGINAL)));
  if (fault === 'always-first') for (const [id] of TYPES) ASK[id].order = [ASK[id].order[0]];
  if (fault === 'same-line') for (const [id] of TYPES) for (const loc of LOCALES) ASK[id][loc][ORIGINAL[id].order[1]] = ASK[id][loc][ORIGINAL[id].order[0]];
  try {
    for (const [id, file, kind, theme] of TYPES) {
      const type = require(path.join(WG, 'types', file));
      const order = ORIGINAL[id].order;
      for (const loc of LOCALES) {
        const reg = require(path.join(WG, 'i18n', `strings.${loc}.json`))[id];
        const lines = ASK[id][loc] || {};
        // A
        if (!reg || lines[order[0]] !== reg.instruction) fails.push(`${id} ${loc}: the line of ${order[0]} is not the registered instruction`);
        if (!lines[order[1]] || lines[order[1]] === lines[order[0]]) fails.push(`${id} ${loc}: ${order[1]} has no sentence of its own`);
        if (kind === 'heavy') {
          const sc = (ASK[id].screen || {})[loc] || {};
          if (sc.heavier !== II.measurement.heavier[loc]) fails.push(`${id} ${loc}: the heavier tap line is not the registered one`);
          if (!sc.lighter || sc.lighter === sc.heavier) fails.push(`${id} ${loc}: the lighter tap line is missing`);
        }
        const seen = {}; let last = null, runLen = 0, longest = 0;
        for (let v = 1; v <= 60; v++) for (const level of (v <= 12 ? [1, 2, 3] : [2])) {
          const ctx = (x) => ({ rng: makeRng(instanceSeed({ typeId: id, theme: kind === 'size' && !theme ? 'shapes' : theme, difficulty: level, seedEpoch: 1, variant: v, unit: null })), variant: v, ...(x || {}) });
          const args = { theme: theme || 'shapes', difficulty: level, locale: loc, unit: null };
          let b;
          try { b = type.build(args, ctx()); } catch (e) { fails.push(`${id} ${loc} L${level} copy ${v}: ${String(e.message).slice(0, 120)}`); continue; }
          let ends = endOfPage(kind, b.bodyHtml);
          if (fault === 'wrong-marks' && v % 2 === 0) ends = ends.map(() => order[0]);
          const end = ends[0];
          if (!ends.length || ends.some((e) => e !== end) || end === '?') { fails.push(`${id} ${loc} L${level} copy ${v}: the marks do not show one end (${ends.join(',')})`); continue; }
          const want = order[(v - 1) % order.length];
          if (end !== want) fails.push(`${id} ${loc} L${level} copy ${v}: asks ${end}, copy ${v} should ask ${want}`);
          if (level === 2) { seen[end] = (seen[end] || 0) + 1; runLen = end === last ? runLen + 1 : 1; last = end; longest = Math.max(longest, runLen); }
          // B / D: the page says which end it asks
          const said = [...b.bodyHtml.matchAll(/data-lcs-ask="([a-z]+)"/g)].map((m) => m[1]);
          if (end === order[0] ? said.length : (said.length !== ends.length || said.some((s) => s !== end))) fails.push(`${id} ${loc} L${level} copy ${v}: the page does not say which end it asks`);
          if (v === 1 && (end !== order[0] || b.strings)) fails.push(`${id} ${loc} L${level}: copy 1 does not keep the published end and line`);
          // E
          let own = b.strings ? b.strings.instruction : reg.instruction;
          if (fault === 'old-line') own = reg.instruction;
          if (own !== ASK[id][loc][end]) fails.push(`${id} ${loc} L${level} copy ${v}: asks ${end} but its instruction is "${own}"`);
          if (kind === 'heavy' && end !== order[0] && !(b.strings && b.strings.screenInstruction === (ASK[id].screen[loc] || {})[end])) fails.push(`${id} ${loc} L${level} copy ${v}: asks ${end} but brings no tap line of it`);
          // D: K-038's answer key and screen follow the asked end (a level's copies past the published one carry a screen)
          if (kind === 'heavy' && !(level === 2 && v === 1)) {
            const key = type.build(args, ctx({ answerKey: true }));
            const kEnds = endOfPage(kind, key.bodyHtml);
            if (kEnds.some((e) => e !== end)) fails.push(`${id} ${loc} L${level} copy ${v}: the answer key marks another end`);
            if (v <= 6) {
              const sc = type.build(args, ctx({ interactive: true }));
              // every screen question asks the page's end, and the type's oracle answers the right picture of it
              const chips = [...sc.bodyHtml.matchAll(/data-lcs-q="([^"]+)"/g)].map((m) => m[1]);
              if (!chips.length) fails.push(`${id} ${loc} L${level} copy ${v}: the screen carries no questions`);
              const labelsOf = (q) => { const p = q.split(':'); return [p[2], p[3]]; };
              for (const q of chips) {
                if (!q.startsWith(end === 'lighter' ? 'light:' : 'heavy:')) fails.push(`${id} ${loc} L${level} copy ${v}: a screen question "${q}" for a page asking ${end}`);
                const labels = labelsOf(q);
                let pick;
                try { pick = type.interactive.oracle([{ meta: { 'data-lcs-q': fault === 'oracle' ? q.replace(/^light:/, 'heavy:') : q }, options: labels.map((l) => ({ label: l })) }])[0]; } catch (e) { fails.push(`${id} ${loc} copy ${v}: the oracle cannot answer ${q}: ${e.message}`); continue; }
                const R = require(path.join(WG, 'lib', 'mass-rank.js')).MASS_RANK[q.split(':')[1]];
                const heavy = R.indexOf(labels[0]) < R.indexOf(labels[1]) ? 0 : 1;
                if (pick !== (q.startsWith('light:') ? 1 - heavy : heavy)) fails.push(`${id} ${loc} copy ${v}: the screen oracle answers the wrong picture of ${q}`);
              }
            }
          }
        }
        // C
        for (const p of order) { const n = seen[p] || 0; if (n < 24 || n > 36) fails.push(`${id} ${loc}: ${p} is asked on ${n} of 60 level-2 copies`); }
        if (longest > 2) fails.push(`${id} ${loc}: one end is asked ${longest} copies in a row`);
      }
    }
    // F: the maker's own path, every language
    if (!fault || fault === 'old-line') {
      const { makePage } = require(path.join(WG, '..', 'makers', 'runtime.js'));
      for (const [id, file, kind, theme] of TYPES) {
        const type = require(path.join(WG, 'types', file));
        const order = ORIGINAL[id].order;
        for (const loc of LOCALES) {
          const reg = require(path.join(WG, 'i18n', `strings.${loc}.json`))[id];
          const strings = { title: reg.title, instruction: reg.instruction };
          const seen = new Set();
          let v = 1; const r = makeRng('maker-copies-' + id + loc);
          for (let k = 0; k < 16; k++) {
            v += 1 + Math.floor(r.next() * 97);   // shell.js nextVariant
            const level = [1, 2, 3][k % 3];
            let made;
            try { made = makePage({ type, locale: loc, difficulty: level, theme: theme || 'shapes', variant: v, strings, baseStrings: strings }); } catch (e) { fails.push(`maker ${id} ${loc} L${level} copy ${v}: ${String(e.message).slice(0, 140)}`); continue; }
            const end = endOfPage(kind, made.html)[0];
            let line = norm((/<p data-lcs-instruction>([\s\S]*?)<\/p>/.exec(made.html) || [])[1]);
            if (fault === 'old-line') line = reg.instruction;
            seen.add(end);
            if (line !== norm(ORIGINAL[id][loc][end])) fails.push(`maker ${id} ${loc} L${level} copy ${v}: asks ${end} but prints "${line}"`);
          }
          if (seen.size !== order.length) fails.push(`maker ${id} ${loc}: only ${[...seen].join(', ')} asked over 16 new versions`);
        }
      }
    }
  } finally {
    for (const k of Object.keys(ASK)) delete ASK[k];
    Object.assign(ASK, JSON.parse(JSON.stringify(ORIGINAL)));
  }
  return fails;
}

if (!POISON) {
  const fails = run(null);
  fails.slice(0, 30).forEach((f) => console.log('FAIL  ' + f));
  console.log(fails.length ? `ask lines: ${fails.length} problem(s)` : `ask lines: ${TYPES.length} templates, 11 languages, 84 copies each, the maker path in 11 languages; all checks pass`);
  process.exit(fails.length ? 1 : 0);
} else {
  let bad = 0;
  const faults = ['always-first', 'same-line', 'wrong-marks', 'old-line', 'oracle'];
  for (const f of faults) {
    const n = run(f).length;
    console.log((n ? 'caught   ' : 'MISSED   ') + f + (n ? ` (${n} reports)` : ''));
    if (!n) bad++;
  }
  console.log(bad ? `${bad} planted fault(s) not caught` : `${faults.length} of ${faults.length} planted faults caught`);
  process.exit(bad ? 1 : 0);
}
