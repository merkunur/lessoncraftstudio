#!/usr/bin/env node
/**
 * build-daily-system-demand-report.js — turns harvest.<loc>.json (autocomplete answers for the
 * five new surfaces of the Daily Teaching System) into a readable report per market.
 *
 * What autocomplete can and cannot say: it has NO volumes. It shows (a) whether a phrasing is
 * something people type at all, (b) how wide its tail is, (c) which modifiers ride on it
 * (grade, subject, pdf, template …). The report measures exactly those three things:
 *
 *   head strength  = how many of the head's lookups (the bare head + a..z for deep heads)
 *                    came back with at least one suggestion that still CONTAINS the head.
 *                    A head nobody types drifts to unrelated completions and scores ~0.
 *   tail           = the distinct on-head suggestions.
 *   modifiers      = the words people add to the heads of one surface, by frequency.
 *
 * Output: docs/SEO/daily-system-demand/report.<loc>.md + summary.json (all markets).
 * Usage:  node scripts/seo-research/build-daily-system-demand-report.js [--locales=en,de]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const DIR = path.join(ROOT, 'docs', 'SEO', 'daily-system-demand');
const SEEDS = require('./daily-system-seeds.json');
const SURFACES = ['units', 'curriculum', 'assessments', 'sub', 'readers'];
const TITLE = { units: 'Units, lesson plans, year plans', curriculum: 'National curriculum', assessments: 'Assessments and tests', sub: 'Substitute-teacher packs', readers: 'First readers and mini-books' };
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };

const fold = (s) => String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const tokens = (s) => fold(s).split(' ').filter(Boolean);
/** a suggestion is "on head" when it still carries every word of the head */
function onHead(head, phrase) { const p = new Set(tokens(phrase)); return tokens(head).every((t) => p.has(t)); }

function analyse(locale) {
  const file = path.join(DIR, 'harvest.' + locale + '.json');
  if (!fs.existsSync(file)) return null;
  const doc = JSON.parse(fs.readFileSync(file, 'utf8'));
  const out = { locale, harvested: doc.harvested || null, surfaces: {} };
  for (const surface of SURFACES) {
    const cfg = SEEDS[locale][surface];
    const heads = [];
    const phrases = new Map(); // phrase -> { seeds, bestPos, heads:Set }
    for (const [depth, list] of [['deep', cfg.deep], ['shallow', cfg.shallow]]) {
      for (const head of list) {
        const qs = Object.entries(doc.answers).filter(([, a]) => a.surface === surface && a.head === head);
        let lookups = 0, hit = 0; const tail = new Set();
        for (const [, a] of qs) {
          lookups++;
          const on = (a.got || []).filter((g) => onHead(head, g));
          if (on.length) hit++;
          on.forEach((g, i) => {
            tail.add(g);
            const e = phrases.get(g) || { seeds: 0, bestPos: 99, heads: new Set() };
            e.seeds++; e.bestPos = Math.min(e.bestPos, i); e.heads.add(head); phrases.set(g, e);
          });
        }
        const expected = depth === 'deep' ? 27 : 1;
        heads.push({ head, depth, lookups, expected, hit, tail: tail.size });
      }
    }
    /* the words people add: every token of an on-head suggestion that is not in its head */
    const mod = new Map();
    for (const [p, e] of phrases) {
      const headTok = new Set([...e.heads].flatMap((h) => tokens(h)));
      for (const t of new Set(tokens(p))) if (!headTok.has(t) && t.length > 1) mod.set(t, (mod.get(t) || 0) + 1);
    }
    const ranked = [...phrases.entries()].map(([p, e]) => ({ phrase: p, seeds: e.seeds, pos: e.bestPos }))
      .sort((a, b) => b.seeds - a.seeds || a.pos - b.pos || a.phrase.localeCompare(b.phrase));
    out.surfaces[surface] = {
      heads: heads.sort((a, b) => (b.hit / b.expected) - (a.hit / a.expected) || b.tail - a.tail),
      distinctPhrases: phrases.size,
      modifiers: [...mod.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40),
      phrases: ranked,
    };
  }
  return out;
}

function markdown(r) {
  const L = [];
  L.push('# Daily Teaching System — search demand, market `' + r.locale + '`', '');
  L.push('Source: Google autocomplete, harvested ' + (r.harvested || '(incomplete)') + '. No volumes exist in this data: read it for which phrasings are real, how wide each tail is, and which words people add.', '');
  L.push('| Surface | Heads probed | Heads people type (bare head answered) | Distinct on-head phrases |', '|---|---|---|---|');
  for (const s of SURFACES) { const x = r.surfaces[s]; L.push('| ' + TITLE[s] + ' | ' + x.heads.length + ' | ' + x.heads.filter((h) => h.hit > 0).length + ' | ' + x.distinctPhrases + ' |'); }
  for (const s of SURFACES) {
    const x = r.surfaces[s];
    L.push('', '## ' + TITLE[s], '', '**Heads** (strength = lookups that came back on-head / lookups made; a deep head makes 27, a shallow head 1)', '', '| Head | Depth | Strength | Tail |', '|---|---|---|---|');
    for (const h of x.heads) L.push('| ' + h.head + ' | ' + h.depth + ' | ' + h.hit + ' / ' + h.lookups + (h.lookups < h.expected ? ' (INCOMPLETE: ' + h.expected + ' expected)' : '') + ' | ' + h.tail + ' |');
    L.push('', '**Words people add** (how many distinct phrases carry the word): ' + (x.modifiers.map(([t, n]) => t + ' ' + n).join(' · ') || '—'));
    L.push('', '**Phrases** (all ' + x.phrases.length + ', by how many lookups returned them)', '');
    for (const p of x.phrases) L.push('- ' + p.phrase + (p.seeds > 1 ? '  ×' + p.seeds : ''));
  }
  return L.join('\n') + '\n';
}

const locales = arg('locales') ? arg('locales').split(',') : Object.keys(SEEDS).filter((k) => !k.startsWith('$'));
const summary = {};
for (const l of locales) {
  const r = analyse(l);
  if (!r) { console.log(l + ': no harvest file — NOT MEASURED'); continue; }
  fs.writeFileSync(path.join(DIR, 'report.' + l + '.md'), markdown(r));
  summary[l] = {};
  const cells = [];
  for (const s of SURFACES) {
    const x = r.surfaces[s];
    const incomplete = x.heads.filter((h) => h.lookups < h.expected).length;
    summary[l][s] = { headsProbed: x.heads.length, headsAlive: x.heads.filter((h) => h.hit > 0).length, distinctPhrases: x.distinctPhrases, incompleteHeads: incomplete, topHeads: x.heads.slice(0, 4).map((h) => h.head + ' (' + h.hit + '/' + h.lookups + ', tail ' + h.tail + ')') };
    cells.push(s + ' ' + x.distinctPhrases + (incomplete ? ' (INCOMPLETE)' : ''));
  }
  console.log(l + ': ' + cells.join(' · '));
}
if (!arg('locales')) fs.writeFileSync(path.join(DIR, 'summary.json'), JSON.stringify(summary, null, 1));
