#!/usr/bin/env node
/**
 * export-ladders.js — the per-locale LADDER export the teacher sheets are rendered from
 * (Level Sets v2 phase 2, 2026-10-15).
 *
 * RUNS ON HETZNER (it reads the deck manifests under /var/www/lcs-media/decks and the
 * committed landing content). Writes one JSON per locale:
 *
 *   <out>/ladders-<locale>.json = [{ code, type, title, level, rungs: {easy, core, hard},
 *                                    interactiveCount, answerKeyCount, pages }]
 *
 *   title  = the landing h1 of the face when its published page has a landing (what the set
 *            page shows), else the core page's manifest title (the bare type title).
 *   level  = the landing coordinate's level SLUG in this locale ("1-klasse"), or null.
 *
 * The ladder model is the ONE in scripts/lib/deck-ladder.js (mirror of frontend/lib/
 * level-sets.ts): the same collect pass the deck strip uses, so a sheet exists for exactly
 * the sets the site shows.
 *
 * Usage: node scripts/worksheet-gen/tools/level-set/export-ladders.js [--locales=all|en,de]
 *        [--out=<dir>] [--decks-root=<dir>]
 */
'use strict';

const fs = require('fs');
const path = require('path');
const deckLadder = require('../../../lib/deck-ladder');
const injector = require('../../../publish-cli/inject-deck-ladder');

const ROOT = deckLadder.REPO_ROOT;
const LANDING_DIR = path.join(ROOT, 'frontend', 'content', 'seo-landing');
const LOCALES = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const argv = process.argv.slice(2);
const arg = (k) => { const a = argv.find((x) => x.startsWith(k + '=')); return a ? a.slice(k.length + 1) : null; };
const OUT_DIR = arg('--out') || path.join(ROOT, 'scripts', 'worksheet-gen', 'out', 'ladders');
const locArg = arg('--locales') || 'all';
const locales = locArg === 'all' ? LOCALES : locArg.split(',').map((s) => s.trim()).filter(Boolean);

function landingsOf(locale) {
  const p = path.join(LANDING_DIR, `${locale}.json`);
  if (!fs.existsSync(p)) return [];
  try { return JSON.parse(fs.readFileSync(p, 'utf8')).landings || []; } catch (_e) { return []; }
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let bad = 0;
  for (const locale of locales) {
    const col = injector.collect(locale);
    const ladders = deckLadder.buildLadders(col.facts);
    const bySlug = new Map(col.decks.map((d) => [d.slug, d]));
    const landingByDeck = new Map();
    for (const l of landingsOf(locale)) if (l.canonicalDeckSlug && !landingByDeck.has(l.canonicalDeckSlug)) landingByDeck.set(l.canonicalDeckSlug, l);

    const out = [];
    for (const [code, l] of ladders) {
      const core = l.pages.core[0] || l.pages.easy[0] || l.pages.hard[0];
      // the face's landing: the landing whose own deck is a page of this ladder (the published core page)
      let landing = null;
      for (const r of deckLadder.RUNGS) for (const p of l.pages[r]) { const x = landingByDeck.get(p.slug); if (x) { landing = x; break; } }
      let interactiveCount = 0, answerKeyCount = 0;
      const pages = {};
      for (const r of deckLadder.RUNGS) {
        pages[r] = l.pages[r].map((p) => {
          const d = bySlug.get(p.slug);
          const m = d && d.manifest;
          const interactive = !!(m && m.interactive && m.interactive.kind);
          let answerKey = false;
          try { answerKey = fs.readdirSync(d.real).some((n) => n === p.slug + '-answer-key.pdf'); } catch (_e) { answerKey = false; }
          if (interactive) interactiveCount++;
          if (answerKey) answerKeyCount++;
          return { slug: p.slug, label: deckLadder.pageLabel(p, locale), interactive, answerKey };
        });
      }
      out.push({
        code,
        type: l.exerciseType,
        title: (landing && landing.h1) || core.title || code,
        level: landing ? (landing.coordinate && landing.coordinate.level) || null : null,
        rungs: { easy: l.pages.easy.length, core: l.pages.core.length, hard: l.pages.hard.length },
        interactiveCount,
        answerKeyCount,
        pages,
      });
    }
    out.sort((a, b) => a.type.localeCompare(b.type) || a.code.localeCompare(b.code));
    const file = path.join(OUT_DIR, `ladders-${locale}.json`);
    fs.writeFileSync(file, JSON.stringify(out));
    const withLanding = out.filter((x) => x.level).length;
    console.log(`${locale}: ${out.length} ladders (${withLanding} with a landing title/level) from ${col.decks.length} decks${col.errors.length ? `, ${col.errors.length} manifest errors` : ''} → ${file}`);
    if (!out.length) bad++;
  }
  process.exit(bad ? 1 : 0);
}

main();
