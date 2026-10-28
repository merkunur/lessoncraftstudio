#!/usr/bin/env node
/**
 * apply-hub-copy.js — merge authored copy into the Level Set hub pages and lint it.
 *
 * Copy lives in docs/SEO/level-set-demand/copy/<loc>.json as { "<hub slug>": { slug?, h1, title,
 * metaDescription, p1, p2, p3 } } ("slug" renames the hub's URL slug). Written into
 * frontend/content/seo-landing-hubs/<loc>.json, which build-level-set-hubs.js keeps on rebuild.
 *
 * Lints (all must pass, or nothing is written):
 *   - every hub of the locale has copy, every copy key names a hub;
 *   - p1+p2+p3 >= 200 words; title <= 60 chars; meta description 120-160 chars;
 *   - no "free" word in anything the visitor SEES (h1, p1-p3) — allowed in title/meta only
 *     (operator ruling 2026-09-14: the free tier is 3 PDFs a month, so a visible "free" is untrue);
 *   - no answer-key promise anywhere (Level Set printables do not all ship one);
 *   - no duplicate title / meta / h1 / slug within the locale; slug url-safe and not a landing slug.
 * --poison runs every lint against a deliberately broken copy and a clean control, and fails
 * unless each broken case is caught and the control passes.
 *
 * Usage: node scripts/seo-research/apply-hub-copy.js --locale=de [--check] | --poison
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const COPY = (loc) => path.join(ROOT, 'docs', 'SEO', 'level-set-demand', 'copy', `${loc}.json`);
const HUBS = (loc) => path.join(ROOT, 'frontend', 'content', 'seo-landing-hubs', `${loc}.json`);
const LANDINGS = (loc) => path.join(ROOT, 'frontend', 'content', 'seo-landing', `${loc}.json`);
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=').slice(1).join('=') : d; };

/* "free" in every hub locale; matched as a whole word, case-insensitive, Unicode-aware */
const FREE = /(?<!\p{L})(free|gratis|kostenlos|kostenlose[nmrs]?|gratuit(?:e|s|es)?|gratuitement|gratuit[oa]s?|grátis|gratuitamente|ilmai(nen|set|sia|seksi)|gratis)(?!\p{L})/iu;
const ANSWER_KEY = /(?<!\p{L})(answer keys?|lösungsblatt|lösungen|corrigés?|solucionario|solución|gabarito|soluzion[ei]|antwoordblad|antwoorden|facit|fasit|facitliste|vastaukset|answers included)(?!\p{L})/iu;
const words = (s) => (s || '').split(/\s+/).filter(Boolean).length;

function lint(loc, hubs, copy, landingSlugs) {
  const errs = [];
  const bySlug = new Map(hubs.map((h) => [h.slug, h]));
  // a copy entry is keyed by the hub's original slug; after a rename the hub carries copy[k].slug
  const copyFor = (h) => copy[h.slug] || Object.values(copy).find((c) => c.slug === h.slug);
  for (const k of Object.keys(copy)) if (!bySlug.has(k) && !bySlug.has(copy[k].slug)) errs.push(`copy names ${k}, which is not a hub`);
  const seen = { title: new Map(), metaDescription: new Map(), h1: new Map(), slug: new Map() };
  for (const h of hubs) {
    const c = copyFor(h);
    if (!c) { errs.push(`${h.slug}: no copy`); continue; }
    const slug = c.slug || h.slug;
    for (const f of ['h1', 'title', 'metaDescription', 'p1', 'p2', 'p3']) if (!c[f] || !String(c[f]).trim()) errs.push(`${h.slug}: ${f} empty`);
    const w = words(c.p1) + words(c.p2) + words(c.p3);
    if (w < 200) errs.push(`${h.slug}: body ${w} words < 200`);
    if ((c.title || '').length > 60) errs.push(`${h.slug}: title ${c.title.length} chars > 60`);
    const ml = (c.metaDescription || '').length;
    if (ml < 120 || ml > 160) errs.push(`${h.slug}: meta ${ml} chars, outside 120-160`);
    for (const f of ['h1', 'p1', 'p2', 'p3']) { const m = String(c[f] || '').match(FREE); if (m) errs.push(`${h.slug}: "${m[0]}" in visible ${f}`); }
    for (const f of ['h1', 'title', 'metaDescription', 'p1', 'p2', 'p3']) { const m = String(c[f] || '').match(ANSWER_KEY); if (m) errs.push(`${h.slug}: answer-key promise "${m[0]}" in ${f}`); }
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) errs.push(`${h.slug}: slug "${slug}" is not url-safe`);
    if (landingSlugs.has(slug)) errs.push(`${h.slug}: slug "${slug}" is a landing slug`);
    for (const [f, val] of [['title', c.title], ['metaDescription', c.metaDescription], ['h1', c.h1], ['slug', slug]]) {
      const v = String(val || '').toLowerCase();
      if (seen[f].has(v)) errs.push(`${h.slug}: duplicate ${f} with ${seen[f].get(v)}`);
      seen[f].set(v, h.slug);
    }
  }
  return errs;
}

function poison() {
  const body = 'wort '.repeat(70).trim();
  const good = { h1: 'Schwungübungen Ostern', title: 'Schwungübungen Ostern zum Ausdrucken (PDF)', metaDescription: 'x'.repeat(140), p1: body, p2: body, p3: body };
  const hubs = [{ slug: 'a' }, { slug: 'b' }];
  const control = lint('de', hubs, { a: good, b: { ...good, h1: 'B', title: 'B title', metaDescription: 'y'.repeat(140) } }, new Set());
  const cases = {
    'free in body': { ...good, p1: body + ' kostenlos' },
    'free in h1 (fr)': { ...good, h1: 'Fiches gratuites' },
    'short body': { ...good, p1: 'kurz', p2: 'kurz', p3: 'kurz' },
    'long title': { ...good, title: 't'.repeat(61) },
    'short meta': { ...good, metaDescription: 'm'.repeat(100) },
    'answer key': { ...good, p2: body + ' mit Lösungen' },
    'bad slug': { ...good, slug: 'Schwung Übungen' },
  };
  const out = [];
  if (control.length) out.push('CONTROL failed: ' + control.join('; '));
  for (const [name, c] of Object.entries(cases)) {
    const e = lint('de', hubs, { a: c, b: { ...good, h1: 'B', title: 'B title', metaDescription: 'y'.repeat(140) } }, new Set());
    if (!e.length) out.push(`NOT CAUGHT: ${name}`);
  }
  const dup = lint('de', hubs, { a: good, b: good }, new Set());
  if (!dup.some((x) => /duplicate/.test(x))) out.push('NOT CAUGHT: duplicate title');
  const landing = lint('de', hubs, { a: good, b: { ...good, h1: 'B', title: 'B t', metaDescription: 'y'.repeat(140), slug: 'land' } }, new Set(['land']));
  if (!landing.some((x) => /landing slug/.test(x))) out.push('NOT CAUGHT: landing slug collision');
  // must PASS: "free" inside the TITLE / META is allowed; a word containing "gratis" is not "gratis"
  const allowed = lint('de', hubs, { a: { ...good, title: 'Bildkarten Kleidung kostenlos (PDF)' }, b: { ...good, h1: 'B', title: 'B t', metaDescription: 'Bildkarten gratis '.padEnd(140, '.') } }, new Set());
  if (allowed.length) out.push('FALSE ALARM: ' + allowed.join('; '));
  if (out.length) { console.error('poison FAILED:\n  ' + out.join('\n  ')); process.exit(1); }
  console.log(`poison OK: ${Object.keys(cases).length + 2} defects caught, control and allowed cases pass`);
}

function main() {
  if (process.argv.includes('--poison')) return poison();
  const loc = arg('locale');
  if (!loc) { console.error('--locale=<loc> required'); process.exit(2); }
  const doc = JSON.parse(fs.readFileSync(HUBS(loc), 'utf8'));
  const copy = JSON.parse(fs.readFileSync(COPY(loc), 'utf8'));
  const landingSlugs = new Set(JSON.parse(fs.readFileSync(LANDINGS(loc), 'utf8')).landings.map((l) => l.slug));
  const errs = lint(loc, doc.hubs, copy, landingSlugs);
  if (errs.length) { console.error(`${loc}: ${errs.length} problem(s)\n  ` + errs.join('\n  ')); process.exit(1); }
  if (process.argv.includes('--check')) { console.log(`${loc}: copy for ${doc.hubs.length} hubs passes every lint`); return; }
  const copyFor = (h) => copy[h.slug] || Object.values(copy).find((x) => x.slug === h.slug);
  for (const h of doc.hubs) {
    const c = copyFor(h);
    if (c.slug) h.slug = c.slug;
    for (const f of ['h1', 'title', 'metaDescription', 'p1', 'p2', 'p3']) h[f] = c[f];
  }
  fs.writeFileSync(HUBS(loc), JSON.stringify(doc, null, 1) + '\n');
  console.log(`${loc}: copy applied to ${doc.hubs.length} hubs`);
}
main();
