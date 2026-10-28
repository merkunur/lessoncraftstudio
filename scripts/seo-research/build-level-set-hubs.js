#!/usr/bin/env node
/**
 * build-level-set-hubs.js — wave-1 Level Set HUB pages: one indexable page per searched topic
 * that only noindex Level Set decks answer (operator-approved 2026-10-28: the 161 shortlist rows
 * with >= 3 decks and demand >= 5; the decks behind them STAY noindex).
 *
 * Reads docs/SEO/level-set-demand/shortlist.json (curate-level-set-candidates.js) and the deck
 * inventory TSV (the same export build-level-set-demand-report.js reads), re-runs the report's
 * exact match rule (every topic stem in the deck title + slug — imported, never re-implemented),
 * and writes frontend/content/seo-landing-hubs/<loc>.json. A hub is kept apart from
 * content/seo-landing/ ON PURPOSE: landings are one-deck pages whose deck canonicals point at
 * them and which the /worksheets rail counts by type; a multi-deck hub inside that file would
 * corrupt the repoint map, the rail and verify-hub-type-rows.
 *
 * MERGE, never clobber: an existing hub (same locale+type+topic) keeps its authored copy, its
 * slug and any `exclude` list; only `decks` is recomputed (minus `exclude`).
 * Refuses to write when a slug collides with a landing or another hub, or a hub has < 3 decks.
 *
 * Usage: node scripts/seo-research/build-level-set-hubs.js --decks=<decks.tsv> [--locale=de] [--dry-run]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { words, stem, hasStem, loadDecks, DIFF } = require('./build-level-set-demand-report');
const { slugify } = require('../publish-cli/slug');

const ROOT = path.resolve(__dirname, '..', '..');
const SHORTLIST = path.join(ROOT, 'docs', 'SEO', 'level-set-demand', 'shortlist.json');
/* the hand review of the deck lists: drop / merge / exclude (see the file's _note) */
const REVIEW = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'SEO', 'level-set-demand', 'hub-review.json'), 'utf8'));
const OUT_DIR = path.join(ROOT, 'frontend', 'content', 'seo-landing-hubs');
const LANDINGS = (loc) => path.join(ROOT, 'frontend', 'content', 'seo-landing', `${loc}.json`);
const MIN_DECKS = 3, MIN_DEMAND = 5, MAX_DECKS = 24;
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=').slice(1).join('=') : d; };

/* the words a phrase may carry that never belong in a slug (format / audience / price) */
const SLUG_DROP = new Set(['pdf', 'gratis', 'free', 'kostenlos', 'printable', 'zum', 'ausdrucken', 'a', 'imprimer', 'imprimir', 'para', 'to', 'for', 'kids', 'kleuters', 'maternelle', 'kindergarten', 'klasse', 'groep', 'cp', 'ce1', 'ce2', 'ms', 'gs', 'infanzia', 'difficult']);
const DE_FOLD = (s) => s.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/Ä/g, 'Ae').replace(/Ö/g, 'Oe').replace(/Ü/g, 'Ue').replace(/ß/g, 'ss');

function levelOf(slug) {
  for (const w of slug.split('-')) if (DIFF[w]) return DIFF[w];
  return 'core';
}
const LEVEL_ORDER = { easy: 0, core: 1, hard: 2 };
/* black-and-white marker in the deck slug, every locale's spelling (SW, S/W, BW, B&W, NB, N&B, BN, B/N, ZW, Z/W, Z&W, SH, S/H, PB, P&B, MV, M/V, SV, S/V) */
const isBw = (d) => /(^|-)(sw|s-w|bw|b-w|nb|n-b|bn|b-n|zw|z-w|sh|s-h|pb|p-b|mv|m-v|sv|s-v)(-|$)/.test(d.slug);

/* the face (worksheet variation) code in a deck slug: …-g1213-5 → g1213, …-k396-7 → k396 */
const faceOf = (slug) => { const m = slug.match(/-([kg]\d{3,4})(?:-|$)/); return m ? m[1] : slug; };
/** At most n decks; when there are more, take them round-robin across faces (each face keeps its
 *  easy → core → hard order), so a capped hub shows the range of variations, not the first one. */
function pick(list, n) {
  if (list.length <= n) return list;
  const byFace = new Map();
  for (const d of list) { const k = faceOf(d.slug); if (!byFace.has(k)) byFace.set(k, []); byFace.get(k).push(d); }
  const queues = [...byFace.values()], out = [];
  while (out.length < n) for (const q of queues) { if (q.length && out.length < n) out.push(q.shift()); }
  return out.sort((a, b) => LEVEL_ORDER[levelOf(a.slug)] - LEVEL_ORDER[levelOf(b.slug)] || isBw(a) - isBw(b) || a.slug.localeCompare(b.slug));
}

function slugFor(loc, row) {
  const phrase = row.phrases[0] || `${row.type} ${row.topic}`;
  const kept = phrase.split(/\s+/).filter((w) => !SLUG_DROP.has(w.toLowerCase()) && !/^\d+$/.test(w));
  return slugify(loc === 'de' ? DE_FOLD(kept.join(' ')) : kept.join(' '));
}

function main() {
  const decksFile = arg('decks');
  if (!decksFile) { console.error('--decks=<decks.tsv> is required'); process.exit(2); }
  const only = arg('locale');
  const key = (r) => `${r.locale}|${r.type}|${r.topic}`;
  const all = JSON.parse(fs.readFileSync(SHORTLIST, 'utf8')).filter((r) => r.decks >= MIN_DECKS && r.demand >= MIN_DEMAND && (!only || r.locale === only));
  for (const k of [...Object.keys(REVIEW.drop), ...Object.keys(REVIEW.merge), ...Object.values(REVIEW.merge), ...Object.keys(REVIEW.exclude)]) {
    if (!all.some((r) => key(r) === k) && (!only || k.startsWith(only + '|'))) { console.error(`hub-review.json names ${k}, which is not a wave-1 row`); process.exit(1); }
  }
  const rows = all.filter((r) => !REVIEW.drop[key(r)] && !REVIEW.merge[key(r)]);
  for (const r of rows) for (const [from, to] of Object.entries(REVIEW.merge)) {
    if (to !== key(r)) continue;
    const src = all.find((x) => key(x) === from);
    r.phrases = [...new Set([...r.phrases, ...src.phrases])]; r.demand += src.demand;
  }
  const locales = [...new Set(rows.map((r) => r.locale))];
  const problems = [];
  const docs = {};
  for (const loc of locales) {
    const decks = loadDecks(decksFile, loc);
    const landingSlugs = new Set(JSON.parse(fs.readFileSync(LANDINGS(loc), 'utf8')).landings.map((l) => l.slug));
    const file = path.join(OUT_DIR, `${loc}.json`);
    const prev = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')).hubs : [];
    const prevBy = new Map(prev.map((h) => [`${h.type}|${h.topic}`, h]));
    const hubs = [];
    for (const r of rows.filter((x) => x.locale === loc)) {
      const old = prevBy.get(`${r.type}|${r.topic}`) || {};
      const stems = r.topic.split(' ').map(stem);
      const exclude = new Set([...(old.exclude || []), ...(REVIEW.exclude[`${loc}|${r.type}|${r.topic}`] || [])]);
      const match = decks
        .filter((d) => d.type === r.type && !d.indexable && stems.every((s) => hasStem(d.tw, s)) && ![...exclude].some((x) => d.slug === x || d.slug.includes(x)))
        .sort((a, b) => LEVEL_ORDER[levelOf(a.slug)] - LEVEL_ORDER[levelOf(b.slug)] || isBw(a) - isBw(b) || a.slug.localeCompare(b.slug));
      const hub = {
        slug: old.slug || slugFor(loc, r),
        type: r.type, topic: r.topic, kind: r.kind === 'level' ? 'level' : 'theme',
        phrases: r.phrases, demand: r.demand,
        decks: pick(match, MAX_DECKS).map((d) => ({ slug: d.slug, title: d.title, level: levelOf(d.slug), bw: isBw(d) })),
        deckTotal: match.length,
        exclude: [...exclude],
        h1: old.h1 || '', title: old.title || '', metaDescription: old.metaDescription || '',
        p1: old.p1 || '', p2: old.p2 || '', p3: old.p3 || '',
      };
      if (hub.decks.length < MIN_DECKS) problems.push(`${loc} ${hub.slug}: only ${hub.decks.length} decks`);
      if (landingSlugs.has(hub.slug)) problems.push(`${loc} ${hub.slug}: collides with a landing slug`);
      hubs.push(hub);
    }
    const seen = new Map();
    for (const h of hubs) { if (seen.has(h.slug)) problems.push(`${loc} ${h.slug}: two hubs share this slug (${seen.get(h.slug)} / ${h.type}|${h.topic})`); seen.set(h.slug, `${h.type}|${h.topic}`); }
    docs[loc] = { _note: 'Level Set hub pages (build-level-set-hubs.js). decks are recomputed on every run; copy, slug and exclude are kept.', hubs };
  }
  for (const [loc, d] of Object.entries(docs)) console.log(`${loc}: ${d.hubs.length} hubs, decks ${d.hubs.map((h) => h.decks.length).join(',')}`);
  if (problems.length) { console.error('REFUSED:\n  ' + problems.join('\n  ')); process.exit(1); }
  if (process.argv.includes('--dry-run')) return;
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const [loc, d] of Object.entries(docs)) fs.writeFileSync(path.join(OUT_DIR, `${loc}.json`), JSON.stringify(d, null, 1) + '\n');
  console.log('written to', path.relative(ROOT, OUT_DIR));
}
main();
