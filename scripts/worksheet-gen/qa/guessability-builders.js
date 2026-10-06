/**
 * guessability-builders.js — the guessability check (qa/guessability.js) run straight on the TYPE BUILDERS, without
 * rendering a single PDF (2026-10-06). It enumerates a Level Set wave exactly as the generator does (enumerate.js),
 * rebuilds each copy's SCREEN with the same seed render-instance uses, reads the cards and options the way
 * render-instance reads them (the type's own `interactive` selectors, options in document order), and measures every
 * face per locale. Seconds per type instead of a ten-minute render — so a fix can be proved before a wave is generated.
 *
 *   node qa/guessability-builders.js <wave prefix>[,<prefix>…] [--locales=en,de|all] [--per=12] [--show=<face>]
 *
 * Limits: positions are document order (render-instance reads them the same way for tap-choice); tap-select / tap-order
 * use document order as reading order. Exit 1 when any face FAILS in any locale.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { enumerate } = require('../enumerate.js');
const { loadType } = require('../lib/load-types.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { measure } = require('./guessability.js');

const ALL = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = (k) => (process.argv.find((a) => a.startsWith('--' + k + '=')) || '').slice(k.length + 3);
const prefixes = (process.argv[2] || '').split(',').filter(Boolean);
if (!prefixes.length) { console.error('usage: node qa/guessability-builders.js <wave prefix>[,…] [--locales=…] [--per=12] [--show=<face>]'); process.exit(2); }
const locales = !arg('locales') || arg('locales') === 'all' ? ALL : arg('locales').split(',');
const per = +(arg('per') || 12), show = arg('show');

function bundleFrom(html, sp) {
  const $ = cheerio.load(html);
  const items = [], answers = [];
  if (sp.kind === 'tap-choice') {
    $(sp.item).each((_, el) => {
      const opts = $(el).find(sp.option).toArray();
      if (opts.length < 2) return;
      items.push({ options: opts.map((o) => ({ label: $(o).attr('data-lcs-label') || $(o).text().trim() })) });
      answers.push(opts.findIndex((o) => $(o).attr('data-lcs-correct') !== undefined));
    });
  } else if (sp.kind === 'tap-select') {
    $(sp.item).each((i, el) => { items.push({ x: i, y: 0, label: $(el).attr(sp.labelAttr) || '' }); answers.push($(el).attr(sp.answerAttr) !== undefined); });
  } else if (sp.kind === 'tap-order') {
    $(sp.item).each((i, el) => { items.push({ x: i, y: 0 }); answers.push(Number($(el).attr(sp.answerAttr))); });
  } else return null;
  return items.length ? { kind: sp.kind, items, answers, pictures: !!sp.pictureOptions } : null;
}

let fails = 0, buildErrors = 0;
const tally = {};
for (const prefix of prefixes) for (const loc of locales) {
  const wf = path.join(__dirname, '..', 'waves', `wave-${prefix}-${loc}.json`);
  if (!fs.existsSync(wf)) continue;
  const plan = JSON.parse(fs.readFileSync(wf, 'utf8'));
  const { instances } = enumerate(plan);
  const groups = {}, seen = {};
  let shown = 0;
  for (const it of instances) {
    const k0 = it.typeId + '|' + it.difficulty;
    if ((seen[k0] = (seen[k0] || 0) + 1) > per) continue;
    const type = loadType(it.typeId);
    if (!type.interactive || !plan.interactive) continue;
    const sp = type.interactive;
    const seed = instanceSeed({ typeId: it.typeId, theme: it.cacheTheme, difficulty: it.difficulty, seedEpoch: plan.seedEpoch || 1, variant: it.seedVariant || it.variant, unit: it.unit || null });
    let built;
    try {
      built = type.build({ theme: it.cacheTheme, difficulty: it.difficulty, locale: it.locale, unit: it.unit || null },
        { rng: makeRng(seed), variant: it.variant || 1, ...(it.seedVariant ? { seedVariant: it.seedVariant } : {}), ...(it.buildExtra || {}), interactive: true });
    } catch (e) {
      // a page that cannot build is REPORTED, never skipped (2026-10-06: a broken screen read as "0 failures")
      const msg = String(e.message || e).split('\n')[0].slice(0, 140);
      // a theme REFUSED for a short pool is the generator working as designed (the wave skips it); anything else is a bug
      if (!/REFUSED|refuse|cannot render|< \d+/.test(msg)) { buildErrors++; if (buildErrors <= 12) console.log(`BUILD-ERROR ${prefix} ${it.typeId} ${loc} d${it.difficulty} v${it.variant}: ${msg}`); }
      continue;
    }
    const b = bundleFrom(built.bodyHtml, sp);
    if (!b) continue;
    (groups[it.typeId] = groups[it.typeId] || []).push(b);
    if (show && it.typeId === show && shown++ < 2 && b.kind === 'tap-choice') {
      console.log(`## ${it.typeId} ${loc} d${it.difficulty} v${it.variant}`);
      b.items.forEach((x, i) => console.log('   ' + x.options.map((o, j) => (j === b.answers[i] ? '[' + o.label + ']' : o.label)).join(' | ')));
    }
  }
  for (const [face, list] of Object.entries(groups)) for (const r of measure(list)) {
    tally[r.verdict] = (tally[r.verdict] || 0) + 1;
    if (r.verdict === 'FAIL') fails++;
    if (r.verdict !== 'PASS') console.log(`${r.verdict.padEnd(4)} ${prefix} ${face} ${loc} ${r.kind} q=${r.questions} chance=${(r.chance * 100).toFixed(0)}%  ${r.worst.name}=${(r.worst.score * 100).toFixed(0)}% z${r.worst.z.toFixed(1)} pages ${r.worst.solvedCount}/${r.worst.bigPages}`);
  }
}
console.log(JSON.stringify(tally) + (buildErrors ? `  BUILD ERRORS: ${buildErrors}` : ''));
process.exit(fails || buildErrors ? 1 : 0);
