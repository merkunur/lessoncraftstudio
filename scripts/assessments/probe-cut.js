#!/usr/bin/env node
/**
 * Tries worksheet types through the check cutter (lib/cut-cards.js) in isolation, the way build-checks.js does for one
 * form, and says what a check could take from each: refused (and why) or the cards (how many, how tall, their answers).
 * A dev tool for the item bank (Part 7.6): it writes nothing outside --out, shares no file with build-checks.js, and
 * several runs can go at once.
 *
 *   node scripts/assessments/probe-cut.js --types=G2-239,G1-567 [--loc=en] [--level=2] [--theme=animals] [--seed=probe]
 *                                         [--out=<folder>]   (the cut page of each type is kept there as _cut-<id>.html)
 * Exit 1 when a type is refused.
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');
const REPO = path.join(__dirname, '..', '..');
const WG = path.join(REPO, 'scripts', 'worksheet-gen');
const { cutCards } = require('./lib/cut-cards.js');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const TYPES = arg('types', '').split(',').filter(Boolean);
const loc = arg('loc', 'en');
const OUT = arg('out', path.join(os.tmpdir(), 'probe-cut-' + process.pid));
const strings = JSON.parse(fs.readFileSync(path.join(WG, 'i18n', 'strings.' + loc + '.json'), 'utf8'));
const fileOf = {};
for (const g of fs.readdirSync(path.join(WG, 'types'))) { if (g.startsWith('_')) continue; for (const f of fs.readdirSync(path.join(WG, 'types', g))) { const m = /^((?:K|G\d)-\d{3})/.exec(f); if (m) fileOf[m[1]] = path.join(WG, 'types', g, f); } }

(async () => {
  if (!TYPES.length) { console.error('--types=<id,id>'); process.exit(1); }
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  let bad = 0;
  for (const id of TYPES) {
    if (!fileOf[id]) { console.log('?     ' + id + ': no such type'); bad++; continue; }
    const type = require(fileOf[id]);
    const s = strings[id] || (type.i18n && type.i18n[loc]) || null;
    try {
      const r = await cutCards(page, { type, strings: s, locale: loc, seed: arg('seed', 'probe'), theme: arg('theme', 'animals'), outDir: OUT, difficulty: Number(arg('level', 2)) });
      // with --out: the page the check would cut, kept to look at (the cutter removes its own copy)
      if (arg('out')) {
        try {
          const { buildPage } = require(path.join(WG, 'page', 'shell.js'));
          const { makeRng } = require(path.join(WG, 'lib', 'rng.js'));
          const make = typeof type.checkPage === 'function' ? type.checkPage.bind(type) : type.build.bind(type);
          const themes = type.themeAxis && type.themeAxis.applicable ? [arg('theme', 'animals'), ...(type.THEMES || []), 'fruits', 'toys'] : [null];
          let built = null;
          for (const theme of themes) { try { built = make({ theme, difficulty: Number(arg('level', 2)), locale: loc, unit: null }, { rng: makeRng(arg('seed', 'probe') + '|' + id), variant: 1, check: true }); break; } catch (e) { built = null; } }
          if (built) fs.writeFileSync(path.join(OUT, 'page-' + id + '.html'), buildPage({ title: (s && s.title) || id, instruction: (s && s.instruction) || '', bodyHtml: built.bodyHtml, locale: loc, pageSize: loc === 'en' ? 'letter' : 'a4' }), 'utf8');
        } catch (e) { /* the page is only for looking at */ }
      }
      if (r.refused) { bad++; console.log('NO    ' + id + ': ' + r.refused); continue; }
      const cards = r.cards || [];
      console.log('ok    ' + id + ': ' + cards.length + ' cards, ' + r.cols + ' column(s), heights ' + cards.map((c) => c.h).join('/') +
        ', answers ' + cards.map((c) => c.ans || '-').join(' | ').slice(0, 160) + (typeof type.checkPage === 'function' ? '  [checkPage]' : ''));
    } catch (e) { bad++; console.log('ERROR ' + id + ': ' + e.message); }
  }
  await browser.close();
  console.log((TYPES.length - bad) + ' of ' + TYPES.length + ' types can give a check its cards' + (arg('out') ? '' : ' (pages in ' + OUT + ')'));
  process.exit(bad ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
