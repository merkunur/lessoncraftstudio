#!/usr/bin/env node
/**
 * impact-scan.js <live.jsonl> --probe=<name> [--out=<file.jsonl>]
 *
 * Which LIVE decks does a code change actually reach? guessfix-compare.js reads the words and the pictures of a PDF, so a
 * change drawn in vector strokes (a traced letter moved, a digit's path) is invisible to it, and regenerating every deck of
 * every type that merely LOADS the changed module is far too large (the stroke font loads in 468 types, 92,665 live decks).
 * This tool re-runs each live deck's BUILD (no browser: the same type.build call and seed as render/render-instance.js, from
 * the deck's own wave instance) with a PROBE installed, and lists the decks whose build hit the probe.
 *
 * <live.jsonl> = the server scan (scan-live-types.py). Every deck is matched to its wave instance by deck id (a theme-retried
 * deck by recomputing deckIdFor with its live theme); an unmatched or throwing deck is listed as such, never silently skipped.
 *
 * Probes:
 *   j-tuck  (2026-11-02) a traced text in which a letter whose descender hooks left (j) follows another glyph: those are the
 *           only texts data/tracing/letter-strokes.js textGlyphs now lays out differently ("vi jf" → "vijf").
 *
 * Output: one JSON line per deck {loc, slug, deck_id, type, hit, texts?, error?}; a summary per type on stdout.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const WG = path.resolve(__dirname, '..');
const argv = process.argv.slice(2);
const LIVE = argv.find((a) => !a.startsWith('--'));
const arg = (n, d) => { const h = argv.find((a) => a.startsWith('--' + n + '=')); return h ? h.slice(n.length + 3) : d; };
const PROBE = arg('probe', '');
const OUT = arg('out', '');
if (!LIVE || !PROBE) throw new Error('usage: impact-scan.js <live.jsonl> --probe=j-tuck [--out=file.jsonl]');

// the probe is installed BEFORE any type loads, so a module that copies the function at load time copies the probe
const hits = [];
if (PROBE === 'j-tuck') {
  const LS = require(path.join(WG, 'data', 'tracing', 'letter-strokes.js'));
  const orig = LS.textGlyphs;
  LS.textGlyphs = function (text) {
    const chars = [...String(text)];
    if (chars.some((ch, i) => i > 0 && LS.glyphFor(ch).hook)) hits.push(String(text));
    return orig.apply(this, arguments);
  };
} else throw new Error('impact-scan: unknown probe ' + PROBE);

const { enumerate, deckIdFor } = require(path.join(WG, 'enumerate.js'));
const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
const { makeRng, instanceSeed } = require(path.join(WG, 'lib', 'rng.js'));

const live = fs.readFileSync(LIVE, 'utf8').trim().split(/\r?\n/).filter((l) => l && l[0] === '{').map((l) => JSON.parse(l));
const wantTypes = new Set(live.map((d) => d.type));

// every wave instance of a wanted type, by deck id (and by slot, for a theme-retried deck)
const byId = new Map(), bySlot = new Map();
for (const f of fs.readdirSync(path.join(WG, 'waves'))) {
  if (!f.endsWith('.json') || f.startsWith('_') || /fix/.test(f)) continue;
  let plan;
  try { plan = JSON.parse(fs.readFileSync(path.join(WG, 'waves', f), 'utf8')); } catch (e) { continue; }
  let instances;
  try { ({ instances } = enumerate(plan)); } catch (e) { continue; }
  for (const it of instances) {
    if (!wantTypes.has(it.typeId)) continue;
    byId.set(it.deckId, { plan, it });
    const k = [plan.id, it.typeId, it.difficulty, it.locale, it.variant || 1, it.unit || ''].join('|');
    if (!bySlot.has(k)) bySlot.set(k, []);
    bySlot.get(k).push({ plan, it });
  }
}

function findInstance(d) {
  if (byId.has(d.deck_id)) return { ...byId.get(d.deck_id), theme: byId.get(d.deck_id).it.cacheTheme };
  // a theme-retried deck: same slot, another theme — its id is deckIdFor(... live theme ...)
  for (const [k, list] of bySlot) {
    const [, typeId, diff, loc] = k.split('|');
    if (typeId !== d.type || loc !== d.loc || String(diff) !== String(d.difficulty)) continue;
    for (const { plan, it } of list) {
      const spec = loadType(it.typeId);
      if (d.theme && deckIdFor(plan.id, spec, d.theme, it.difficulty, it.locale, it.variant, it.unit || null) === d.deck_id) return { plan, it, theme: d.theme };
    }
  }
  return null;
}

(async () => {
  const out = [], stats = {};
  let n = 0;
  const t0 = Date.now();
  for (const d of live) {
    const s = (stats[d.type] = stats[d.type] || { decks: 0, hit: 0, unmatched: 0, errors: 0 });
    s.decks++;
    const m = findInstance(d);
    if (!m) { s.unmatched++; out.push({ loc: d.loc, slug: d.slug, deck_id: d.deck_id, type: d.type, hit: null, error: 'unmatched' }); continue; }
    const { plan, it, theme } = m;
    const spec = loadType(it.typeId);
    const rng = makeRng(instanceSeed({ typeId: spec.id, theme, difficulty: it.difficulty, seedEpoch: plan.seedEpoch || 1, variant: it.seedVariant || it.variant, unit: it.unit || null }));
    hits.length = 0;
    try {
      await spec.build({ theme, difficulty: it.difficulty, locale: it.locale, unit: it.unit || null },
        { rng, variant: it.variant || 1, ...(it.seedVariant ? { seedVariant: it.seedVariant } : {}), ...(it.buildExtra || {}) });
    } catch (e) {
      s.errors++;
      out.push({ loc: d.loc, slug: d.slug, deck_id: d.deck_id, type: d.type, hit: hits.length > 0 || null, error: String(e.message).slice(0, 160) });
      continue;
    }
    if (hits.length) s.hit++;
    out.push({ loc: d.loc, slug: d.slug, deck_id: d.deck_id, type: d.type, hit: hits.length > 0, ...(hits.length ? { texts: [...new Set(hits)] } : {}) });
    if (++n % 2000 === 0) console.log('  ' + n + '/' + live.length + ' (' + Math.round((Date.now() - t0) / n) + ' ms/deck)');
  }
  if (OUT) fs.writeFileSync(OUT, out.map((x) => JSON.stringify(x)).join('\n') + '\n');
  const rows = Object.entries(stats).filter(([, s]) => s.hit || s.unmatched || s.errors).sort();
  for (const [t, s] of rows) console.log(t.padEnd(8) + ' decks ' + s.decks + '  HIT ' + s.hit + (s.unmatched ? '  unmatched ' + s.unmatched : '') + (s.errors ? '  errors ' + s.errors : ''));
  const tot = Object.values(stats).reduce((a, s) => ({ decks: a.decks + s.decks, hit: a.hit + s.hit, unmatched: a.unmatched + s.unmatched, errors: a.errors + s.errors }), { decks: 0, hit: 0, unmatched: 0, errors: 0 });
  console.log('TOTAL decks ' + tot.decks + '  hit ' + tot.hit + '  unmatched ' + tot.unmatched + '  errors ' + tot.errors);
})();
