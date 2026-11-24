#!/usr/bin/env node
/**
 * K-213 Community Helpers and Their Tools: the retired pairs stay retired (2026-11-24).
 *
 * data/science/helper-tool.json retires a pair whose helper is no community helper (musician, astronaut; 2026-11-23) or
 * whose picture shows its own answer (the library mechanic works at a car with a wrench in his hand, so the page held the
 * line it asks for; 2026-11-24, found by the Kindergarten social studies notes). science-pair-match.js never draws a
 * retired pair as a helper, and never puts its tool on the page as the level-1 leftover either (a wrench beside the
 * carpenter or the farmer, a trumpet beside the teacher could be defended as theirs: a second right answer).
 *
 * Asserts, in 11 languages, levels 1-3, seeds 1..300, page and answer key:
 *   R1 no retired helper on the page;
 *   R2 two helpers of a `conflicts` pair never share a page;
 *   R3 every page draws the number of helpers its level asks for (the retirements leave enough pairs);
 *   R4 no retired pair's tool as the leftover (data-sci-extra).
 * The rules are read from the data ON DISK, never from the poisoned copy a poison builds with.
 * Poisons (each must FAIL on its own rule; the real data must PASS): P1 the mechanic un-retired; P2 the musician
 * un-retired; P3 the conflicts list dropped (farmer beside gardener); P4 the factory without its leftover guard.
 *
 *   node scripts/worksheet-gen/qa/verify-k213-helper-pairs.js [--seeds=300]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const Module = require('module');
const WG = path.resolve(__dirname, '..');
const { makeRng } = require(path.join(WG, 'lib', 'rng.js'));
const DATA = path.join(WG, 'data', 'science', 'helper-tool.json');
const FACTORY = path.join(WG, 'types', '_shared', 'science-pair-match.js');
const TYPE = fs.readdirSync(path.join(WG, 'types', 'k')).find((f) => f.startsWith('K-213-'));
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const SEEDS = Number((process.argv.find((a) => a.startsWith('--seeds=')) || '--seeds=300').slice(8));

// a fresh copy of the data, the factory and the type; `mutate` poisons the data, `factorySrc` replaces the factory
function freshType(mutate, factorySrc) {
  for (const k of Object.keys(require.cache)) if (k === DATA || k === FACTORY || k.endsWith(TYPE)) delete require.cache[k];
  if (factorySrc) {   // compiled under the factory's own name, so the type's require() finds it in the cache
    const m = new Module(FACTORY, module);
    m.filename = FACTORY;
    m.paths = Module._nodeModulePaths(path.dirname(FACTORY));
    m._compile(factorySrc, FACTORY);
    m.loaded = true;
    require.cache[FACTORY] = m;
  }
  const data = require(DATA);
  if (mutate) mutate(data);
  return require(path.join(WG, 'types', 'k', TYPE));
}

async function run(mutate, seeds, factorySrc) {
  const type = freshType(mutate, factorySrc);
  const truth = JSON.parse(fs.readFileSync(DATA, 'utf8'));
  const retired = new Set(truth.pairs.filter((p) => p.retired === true).map((p) => p.left.noun));
  const conflicts = truth.conflicts || [];
  const fails = [];
  let pages = 0;
  for (const loc of LOCS) for (const lv of [1, 2, 3]) for (let s = 1; s <= seeds; s++) for (const key of [false, true]) {
    let r;
    try { r = await type.build({ theme: null, difficulty: lv, locale: loc, unit: null }, { rng: makeRng('k213|' + loc + '|' + lv + '|' + s), variant: 1, answerKey: key }); }
    catch (e) { fails.push(`R3 ${loc} L${lv} #${s}: no page (${e.message})`); continue; }
    pages++;
    const left = [...r.bodyHtml.matchAll(/data-sci-left="([^"]+)"/g)].map((m) => m[1]);
    const extra = [...r.bodyHtml.matchAll(/data-sci-extra="([^"]+)"/g)].map((m) => m[1]);
    for (const n of left) if (retired.has(n)) fails.push(`R1 ${loc} L${lv} #${s}: retired helper ${n} on the page`);
    for (const c of conflicts) if (c.every((n) => left.includes(n))) fails.push(`R2 ${loc} L${lv} #${s}: ${c.join(' and ')} share a page`);
    const want = (type.difficulty[lv] || type.difficulty[2]).pairs;
    if (left.length !== want) fails.push(`R3 ${loc} L${lv} #${s}: ${left.length} helpers, the level asks for ${want}`);
    for (const n of extra) if (retired.has(n)) fails.push(`R4 ${loc} L${lv} #${s}: the tool of the retired ${n} is the leftover`);
  }
  freshType(null);   // leave the real modules in the cache for the next run
  return { pages, fails };
}

(async () => {
  const real = await run(null, SEEDS);
  console.log(`real data: ${real.pages} pages, ${real.fails.length} failures`);
  for (const f of real.fails.slice(0, 10)) console.log('  FAIL ' + f);
  const unretire = (noun) => (d) => { for (const p of d.pairs) if (p.left.noun === noun) delete p.retired; };
  const unguarded = fs.readFileSync(FACTORY, 'utf8').replace(/^\s*if \(retired\(q\)\) \{[^\n]*\n/m, '');
  if (/if \(retired\(q\)\)/.test(unguarded)) throw new Error('P4: the leftover guard was not found in the factory');
  const poisons = [
    ['P1 the mechanic un-retired', unretire('mechanic'), 'R1', null],
    ['P2 the musician un-retired', unretire('musician'), 'R1', null],
    ['P3 the conflicts list dropped', (d) => { d.conflicts = []; }, 'R2', null],
    ['P4 the factory without its leftover guard', null, 'R4', unguarded],
  ];
  let caught = 0;
  for (const [label, mutate, rule, src] of poisons) {
    const r = await run(mutate, Math.min(SEEDS, 120), src);
    const n = r.fails.filter((f) => f.startsWith(rule)).length;
    if (n) caught++;
    console.log(`  ${n ? 'caught' : 'MISSED'}  ${label} (${n} ${rule} failures)`);
  }
  const ok = real.fails.length === 0 && caught === poisons.length;
  console.log(ok ? `PASS (${real.pages} pages; ${caught}/${poisons.length} poisons caught)` : 'FAIL');
  process.exit(ok ? 0 : 1);
})();
