#!/usr/bin/env node
/**
 * Gate `copy-range` (2026-11-05, operator: "This page couldn't be created" in Dot-to-Dot after a few New versions, then
 * another template): every page the maker can ask for BUILDS, at every copy number a teacher reaches.
 *
 * The maker's "New version" jumps the page's copy by 1-97 each click (shell.js nextVariant), and the copy stays with the
 * page when the teacher picks another template — so a page is asked for at copies in the hundreds, on any template and
 * level. Every other gate builds copies 1-12; six Dot-to-Dot templates refused every copy past their picture pool and
 * no gate saw it.
 *
 * For every built maker × template × locale it ships in × level × (first colour theme, first black-and-white theme) ×
 * first word: the page the maker SHOWS (maker-pages buildShown: this seed or the maker's own fresh-seed retries) is built
 * at copies COPIES and must build. A build is the type's own build + the runtime's checks; the layout is the live gate's.
 *
 * Poisons, every run, both directions: a type that refuses past copy 12 must FAIL here; the same type unchanged must PASS.
 *
 *   node scripts/makers/gates/copy-range.js [--makers=a,b] [--locales=en,fi] [--ids=K-294,G1-285]
 */
'use strict';
const MP = require('./lib/maker-pages.js');

const A = MP.args();
const LOCALES = A.locales ? String(A.locales).split(',') : MP.LOCALES;
const IDS = A.ids ? String(A.ids).split(',') : null;
// past every picture / word pool a template has (the largest are ~60), and the numbers a session reaches (1 + 1-97 a click)
const COPIES = [13, 29, 50, 97, 150, 301, 1000];

let fails = 0, built = 0;
const fail = (s) => { fails++; if (fails <= 200) console.log('FAIL ' + s); };
const msg = (e) => String((e && e.message) || e).split('\n')[0].slice(0, 200);

/** the option sets one template is asked for in one locale (a level × a theme × a word), each at every copy */
function asks(t, loc) {
  const out = [];
  const lv = (t.localeLevels && t.localeLevels[loc]) || t.levels;
  let ths = [null];
  if (t.themed) {
    const tl = MP.themesIn(t, loc);
    ths = [tl.find((x) => !MP.isBw(x)), tl.find(MP.isBw)].filter(Boolean);
    if (!ths.length) ths = [null];
  }
  for (const difficulty of lv) {
    const us = ((t.units && t.units[loc]) || []).filter((u) => (!t.unitLevels || t.unitLevels[u.id] === difficulty) && (!t.localeUnitLevels || !t.localeUnitLevels[loc] || (t.localeUnitLevels[loc][u.id] || []).includes(difficulty)));
    for (const theme of ths) out.push({ difficulty, theme, unit: us.length ? us[0].id : null });
  }
  return out;
}

/** every ask × copy of template t in locale loc builds; returns the failures */
function check(t, type, tj, loc) {
  const out = [];
  for (const o of asks(t, loc)) for (const variant of COPIES) {
    try { MP.buildShown(t, type, tj, loc, { ...o, variant }); built++; } catch (e) { out.push(`L${o.difficulty}${o.theme ? ' ' + o.theme : ''}${o.unit ? ' ' + o.unit : ''} copy ${variant}: ${msg(e)}`); }
  }
  return out;
}

// poisons: a real template, and the same template refusing past copy 12, in en
{
  const m = MP.builtMakers(['counting'])[0];
  const t = m.tj.templates.find((x) => x.locales.includes('en'));
  const type = MP.loadType(t);
  const bad = { ...type, build(a, ctx) { if (((ctx && ctx.variant) || 1) > 12) throw new Error('poison: no picture past copy 12'); return type.build.call(this, a, ctx); } };
  const good = check(t, type, m.tj, 'en'), poisoned = check(t, bad, m.tj, 'en');
  const ok = !good.length && poisoned.length === asks(t, 'en').length * COPIES.length;
  console.log((ok ? 'ok   ' : 'FAIL ') + `poison: ${t.id} builds at every copy (${good.length} refused), the same type refusing past copy 12 is caught (${poisoned.length} of ${asks(t, 'en').length * COPIES.length})`);
  if (!ok) fails++;
}

for (const m of MP.builtMakers(A.makers)) {
  for (const t of m.tj.templates) {
    if (IDS && !IDS.includes(t.id)) continue;
    let type;
    try { type = MP.loadType(t); } catch (e) { fail(`${m.maker} ${t.id}: cannot load: ${msg(e)}`); continue; }
    for (const loc of LOCALES) {
      if (!t.locales.includes(loc)) continue;
      for (const f of check(t, type, m.tj, loc)) fail(`${m.maker} ${t.id} ${loc} ${f}`);
    }
  }
  process.stdout.write(`${m.maker}: done\n`);
}
console.log(`copy range: ${built} pages built at copies ${COPIES.join(', ')}, ${fails} failing`);
if (fails) process.exitCode = 1;
