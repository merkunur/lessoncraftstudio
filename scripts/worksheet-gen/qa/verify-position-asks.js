#!/usr/bin/env node
/**
 * K-065 Left and Right, K-066 Top, Middle, Bottom, K-067 Inside and Outside: the place a copy asks changes from copy
 * to copy, and the instruction line names it (operator 2026-11-17: in the maker every new version of "Left and Right"
 * asked LEFT).
 *
 *   node qa/verify-position-asks.js            every language, both paths (generator and maker), no browser
 *   node qa/verify-position-asks.js --poison   the same checks must FAIL on four planted faults
 *
 * What it proves, per type and language, over copies 1 to 60 and levels 1 to 3:
 *   A  the first place of data/position-asks.json is the type's own, and its sentence is the registered instruction
 *      word for word (a published page keeps its line)
 *   B  copy 1 asks the published place and brings no instruction of its own
 *   C  every place of the mode is asked, each on about its share of the copies, and no place more than twice in a row
 *      over consecutive copies
 *   D  the pictures the page marks as the answer stand at the asked place, at least two of them and two elsewhere
 *   E  a copy that asks another place brings the sentence of THAT place, and no two places share a sentence
 *   F  the maker's page (makers/runtime.js makePage) prints that sentence: over the maker's random copy numbers every
 *      place is asked, and the printed line is the line of the asked place
 */
'use strict';
const path = require('path');
const WG = path.join(__dirname, '..');
const POISON = process.argv.includes('--poison');
const LOCALES = ['en', 'de', 'sv', 'fr', 'no', 'nl', 'fi', 'da', 'it', 'es', 'pt'];
const TYPES = [['K-065', 'k/K-065-left-and-right.js', 'left-right'], ['K-066', 'k/K-066-top-middle-bottom.js', 'rows'], ['K-067', 'k/K-067-inside-and-outside.js', 'inside-outside']];
const { makeRng, instanceSeed } = require(path.join(WG, 'lib', 'rng.js'));

function run(fault) {
  const fails = [];
  const ASKS = JSON.parse(JSON.stringify(require(path.join(WG, 'data', 'position-asks.json'))));
  const built = (type, o) => type.build({ theme: 'animals', difficulty: o.level, locale: o.locale, unit: null }, { rng: makeRng(instanceSeed({ typeId: type.id, theme: 'animals', difficulty: o.level, seedEpoch: 1, variant: o.variant, unit: null })), variant: o.variant });
  for (const [id, file, mode] of TYPES) {
    const type = require(path.join(WG, 'types', file));
    const order = ASKS[mode].order;
    for (const loc of LOCALES) {
      const reg = require(path.join(WG, 'i18n', `strings.${loc}.json`))[id];
      const lines = { ...ASKS[mode][loc] };
      if (fault === 'same-line') lines[order[1]] = lines[order[0]];
      // A
      if (!reg || lines[order[0]] !== reg.instruction) fails.push(`${id} ${loc}: the sentence of ${order[0]} is not the registered instruction`);
      if (new Set(order.map((p) => lines[p])).size !== order.length || order.some((p) => !lines[p])) fails.push(`${id} ${loc}: two places share a sentence, or one has none`);
      const seen = {}; let runLen = 0, last = null, longest = 0;
      for (let v = 1; v <= 60; v++) for (const level of (v <= 12 ? [1, 2, 3] : [2])) {
        let b;
        try { b = built(type, { level, locale: loc, variant: v }); } catch (e) { fails.push(`${id} ${loc} L${level} copy ${v}: ${String(e.message).slice(0, 120)}`); continue; }
        let rel = b.meta.relation;
        if (fault === 'always-first') rel = order[0];
        if (level === 2) { seen[rel] = (seen[rel] || 0) + 1; runLen = rel === last ? runLen + 1 : 1; last = rel; longest = Math.max(longest, runLen); }
        // B
        if (v === 1 && (rel !== order[0] || b.strings)) fails.push(`${id} ${loc} L${level}: copy 1 does not keep the published place and line`);
        // D: the marked pictures stand at the asked place
        const marks = [...b.bodyHtml.matchAll(/data-lcs-side="([a-z]+)"[^>]*?( data-lcs-target="1")?[^>]*>/g)].map((m) => ({ side: m[1], hit: /data-lcs-target="1"/.test(m[0]) }));
        const hits = marks.filter((m) => m.hit);
        if (fault === 'wrong-marks' && hits.length) hits[0].side = '?';
        if (hits.length < 2 || marks.length - hits.length < 2 || hits.some((m) => m.side !== b.meta.relation) || marks.some((m) => !m.hit && m.side === b.meta.relation)) fails.push(`${id} ${loc} L${level} copy ${v}: the marked pictures are not the pictures at ${b.meta.relation}`);
        if (!new RegExp(`data-lcs-relation="${b.meta.relation}"`).test(b.bodyHtml)) fails.push(`${id} ${loc} L${level} copy ${v}: the page does not say which place it asks`);
        // E
        let own = b.strings ? b.strings.instruction : reg.instruction;
        if (fault === 'old-line') own = reg.instruction;
        if (own !== lines[b.meta.relation]) fails.push(`${id} ${loc} L${level} copy ${v}: asks ${b.meta.relation} but its instruction is "${own}"`);
      }
      // C
      for (const p of order) { const n = seen[p] || 0, want = 60 / order.length; if (n < want * 0.8 || n > want * 1.2) fails.push(`${id} ${loc}: ${p} is asked on ${n} of 60 copies (about ${want} wanted)`); }
      if (longest > 2) fails.push(`${id} ${loc}: one place is asked ${longest} copies in a row`);
    }
  }
  // F: the maker's own path (no browser: makePage builds the page's html)
  if (!fault || fault === 'old-line') {
    const runtime = require(path.join(WG, '..', 'makers', 'runtime.js'));
    const makePage = runtime.makePage || (runtime._test && runtime._test.makePage);
    if (typeof makePage !== 'function') fails.push('makers/runtime.js: no makePage to test');
    else for (const [id, file, mode] of TYPES) {
      const type = require(path.join(WG, 'types', file));
      const order = ASKS[mode].order;
      for (const loc of ['en', 'de', 'fi']) {
        const reg = require(path.join(WG, 'i18n', `strings.${loc}.json`))[id];
        const strings = { title: reg.title, instruction: reg.instruction };
        const seen = new Set();
        let v = 1; const r = makeRng('maker-copies-' + id + loc);
        for (let k = 0; k < 24; k++) {
          v += 1 + Math.floor(r.next() * 97);   // shell.js nextVariant
          for (const level of [1, 2, 3]) {
            let made;
            try { made = makePage({ type, locale: loc, difficulty: level, theme: 'animals', variant: v, strings, baseStrings: strings }); } catch (e) { fails.push(`maker ${id} ${loc} L${level} copy ${v}: ${String(e.message).slice(0, 140)}`); continue; }
            const rel = (/data-lcs-relation="([a-z]+)"/.exec(made.html) || [])[1];
            let line = ((/<p data-lcs-instruction>([\s\S]*?)<\/p>/.exec(made.html) || [])[1] || '').replace(/&nbsp;|[  ]/g, ' ').replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, '&').trim();
            if (fault === 'old-line') line = reg.instruction;
            seen.add(rel);
            if (line !== ASKS[mode][loc][rel]) fails.push(`maker ${id} ${loc} L${level} copy ${v}: asks ${rel} but prints "${line}"`);
          }
        }
        if (seen.size !== order.length) fails.push(`maker ${id} ${loc}: only ${[...seen].join(', ')} asked over 24 new versions`);
      }
    }
  }
  return fails;
}

if (!POISON) {
  const fails = run(null);
  fails.slice(0, 30).forEach((f) => console.log('FAIL  ' + f));
  console.log(fails.length ? `position asks: ${fails.length} problem(s)` : 'position asks: 3 types, 11 languages, 84 copies each, the maker path in 3 languages; all checks pass');
  process.exit(fails.length ? 1 : 0);
} else {
  let bad = 0;
  for (const f of ['always-first', 'same-line', 'wrong-marks', 'old-line']) {
    const n = run(f).length;
    console.log((n ? 'caught   ' : 'MISSED   ') + f + (n ? ` (${n} reports)` : ''));
    if (!n) bad++;
  }
  console.log(bad ? `${bad} planted fault(s) not caught` : '4 of 4 planted faults caught');
  process.exit(bad ? 1 : 0);
}
