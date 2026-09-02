#!/usr/bin/env node
/**
 * make-b2var-gate-subset.js <locale> [out.json]
 *
 * Writes a `{landings:[...]}` file holding this batch's new landings PLUS every
 * other landing that shares a (type, mode) cluster with one of them, so
 * `gate.js` can be run over it.
 *
 * WHY A SUBSET. gate.js does three independent all-pairs passes over the whole
 * locale and materialises the full pair array before sorting. At en's ~4,000
 * landings that is ~7.75M pairs per pass, and the file's own comment records
 * that it never finished on a full locale before gram memoization — which fixed
 * gram building, not the quadratic pair count. The gate takes its input path as
 * a positional argument and needs nothing but `{landings:[...]}` with
 * slotTokens, so a cut-down file exercises the checks that matter here in
 * seconds.
 *
 * The cluster siblings are the point: within-class similarity is exactly what a
 * variation fan-out risks, so a subset of only the new pages would be the easy
 * half of the question. Including the base landing and every earlier sibling of
 * each family is what makes the run meaningful.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const WSG = path.join(ROOT, 'scripts', 'worksheet-gen');
const { ROWS } = require(path.join(WSG, 'tools', 'gen-b2var-specs.js'));

const locale = process.argv[2];
if (!locale) { console.error('usage: make-b2var-gate-subset.js <locale> [out.json]'); process.exit(2); }
const out = process.argv[3] || path.join(WSG, 'out', `gate-subset-${locale}.json`);

const variantIds = ROWS.map((r) => '-' + r[1].toLowerCase().replace('-', ''));
const corpus = JSON.parse(fs.readFileSync(
  path.join(ROOT, 'frontend', 'content', 'seo-landing', locale + '.json'), 'utf8')).landings;

const isNew = (l) => variantIds.some((v) => (l.canonicalDeckSlug || '').endsWith(v));
const mine = corpus.filter(isNew);
if (!mine.length) { console.error(`no nt20-B-VAR landings found in ${locale} — nothing to gate`); process.exit(2); }

// every cluster the new pages belong to, then everything else in those clusters
const keys = new Set(mine.map((l) => `${l.coordinate.type}|${l.coordinate.mode || ''}`));
const subset = corpus.filter((l) => keys.has(`${l.coordinate.type}|${l.coordinate.mode || ''}`));

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify({ landings: subset }, null, 1) + '\n');
console.log(`${locale}: ${mine.length} new + ${subset.length - mine.length} cluster siblings = ${subset.length} pages -> ${out}`);
