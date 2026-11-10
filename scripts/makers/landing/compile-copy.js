#!/usr/bin/env node
/**
 * Compile the maker landings' authored copy: frontend/content/maker-landings/src/<loc>.json →
 * frontend/content/maker-landings/copy.<loc>.json, adding what is derived rather than written:
 *
 *   slug          from the keyword phrase, ASCII-folded per language (/^[a-z0-9-]+$/, unique in the locale)
 *   metaTitle     keyword first, then the longest suffix of the locale's ladder that still fits
 *   metaDescription  the lead's first sentence + a tail (the "free printable" claim lives only here, in metadata:
 *                 CLAUDE.md §25; visible text never makes it). The tail names answer keys only for a maker that has them.
 *
 * Fails on: a missing maker, a duplicate slug / title / description in a locale, a description outside 110-170 chars,
 * a visible field that claims "free", a leftover {token}.
 *
 *   node scripts/makers/landing/compile-copy.js [--locales=en,de]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const DIR = path.join(REPO, 'frontend', 'content', 'maker-landings');
const catalog = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'lib', 'makers', 'landing-catalog.json'), 'utf8')).makers;
const freeClaim = require('../../lib/free-claim.js');
freeClaim.selfTest();

const BRAND = ' | LessonCraftStudio';
/* Per language: the title suffix ladder (longest first; the keyword always leads) and the description tails. */
const STYLE = {
  en: { suffix: [' – Free, Printable and Interactive', ' – Free Printable PDFs', ' – Free PDFs'], key: ' Free printable PDFs with answer keys.', noKey: ' Free printable PDFs.' },
  de: { suffix: [' – kostenlos, zum Ausdrucken und interaktiv', ' – kostenlos zum Ausdrucken', ' – kostenlos'], key: ' Kostenlos als PDF zum Ausdrucken, mit Lösungen.', noKey: ' Kostenlos als PDF zum Ausdrucken.' },
  fr: { suffix: [' – gratuit, à imprimer et interactif', ' – fiches gratuites à imprimer', ' – gratuit'], key: ' Fiches gratuites à imprimer, avec corrigés.', noKey: ' Fiches gratuites à imprimer.' },
  es: { suffix: [' – gratis, para imprimir e interactivo', ' – gratis para imprimir', ' – gratis'], key: ' PDF gratis para imprimir, con respuestas.', noKey: ' PDF gratis para imprimir.' },
  pt: { suffix: [' – grátis, para imprimir e interativo', ' – grátis para imprimir', ' – grátis'], key: ' PDF grátis para imprimir, com gabarito.', noKey: ' PDF grátis para imprimir.' },
  it: { suffix: [' – gratis, da stampare e interattive', ' – gratis da stampare', ' – gratis'], key: ' PDF gratis da stampare, con soluzioni.', noKey: ' PDF gratis da stampare.' },
  nl: { suffix: [' – gratis, printbaar en interactief', ' – gratis printen', ' – gratis'], key: ' Gratis pdf om te printen, met antwoorden.', noKey: ' Gratis pdf om te printen.' },
  sv: { suffix: [' – gratis, utskrivbart och interaktivt', ' – gratis att skriva ut', ' – gratis'], key: ' Gratis pdf att skriva ut, med facit.', noKey: ' Gratis pdf att skriva ut.' },
  da: { suffix: [' – gratis, til print og interaktivt', ' – gratis til print', ' – gratis'], key: ' Gratis pdf til print, med facit.', noKey: ' Gratis pdf til print.' },
  no: { suffix: [' – gratis, til utskrift og interaktivt', ' – gratis til utskrift', ' – gratis'], key: ' Gratis pdf til utskrift, med fasit.', noKey: ' Gratis pdf til utskrift.' },
  fi: { suffix: [' – ilmainen, tulostettava ja interaktiivinen', ' – ilmaiset tulostettavat', ' – ilmainen'], key: ' Ilmaiset tulostettavat PDF:t ja vastaukset.', noKey: ' Ilmaiset tulostettavat PDF:t.' },
};
const TITLE_MAX = 78;
const SHORT_TAIL = { en: ' Free PDFs.', de: ' Kostenlos als PDF.', fr: ' PDF gratuits.', es: ' PDF gratis.', pt: ' PDF grátis.', it: ' PDF gratis.', nl: ' Gratis pdf.', sv: ' Gratis pdf.', da: ' Gratis pdf.', no: ' Gratis pdf.', fi: ' Ilmaiset PDF:t.' };
const FOLD = {
  all: { 'ß': 'ss', 'æ': 'ae', 'œ': 'oe', 'ç': 'c', 'ñ': 'n' },
  de: { 'ä': 'ae', 'ö': 'oe', 'ü': 'ue' },
  sv: { 'å': 'a', 'ä': 'a', 'ö': 'o' },
  da: { 'å': 'aa', 'ø': 'oe', 'æ': 'ae' },
  no: { 'å': 'a', 'ø': 'o', 'æ': 'ae' },
  fi: { 'ä': 'a', 'ö': 'o', 'å': 'a' },
};
function slugify(text, locale) {
  let s = text.toLowerCase();
  for (const map of [FOLD[locale] || {}, FOLD.all]) for (const [a, b] of Object.entries(map)) s = s.split(a).join(b);
  return s.normalize('NFD').replace(/\p{M}+/gu, '').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
/* the first sentence of the lead: stops at . ! ? followed by a space and a capital (so "1,000." and "e.g." rules hold) */
function firstSentence(lead) {
  const m = lead.match(/^.+?[.!?](?=\s+\p{Lu})/su);
  return m ? m[0] : lead;
}

const arg = process.argv.find((a) => a.startsWith('--locales='));
const locales = arg ? arg.slice(10).split(',') : Object.keys(STYLE).filter((l) => fs.existsSync(path.join(DIR, 'src', `${l}.json`)));
let bad = 0;
const fail = (m) => { bad++; console.log(`FAIL ${m}`); };

for (const loc of locales) {
  const src = JSON.parse(fs.readFileSync(path.join(DIR, 'src', `${loc}.json`), 'utf8'));
  const st = STYLE[loc];
  const out = {};
  const slugs = new Map(), titles = new Map(), metas = new Map();
  for (const [id, m] of Object.entries(catalog)) {
    if (m.locales && !m.locales.includes(loc)) { if (src[id]) fail(`${loc} ${id}: has copy but the maker has no ${loc} templates`); continue; }
    const c = src[id];
    if (!c) { fail(`${loc} ${id}: no copy`); continue; }
    for (const f of ['kw', 'lead', 'moment']) if (!c[f] || typeof c[f] !== 'string') fail(`${loc} ${id}: ${f} missing`);
    if (!Array.isArray(c.teaches) || c.teaches.length !== 3) fail(`${loc} ${id}: teaches must have 3 lines`);
    for (const visible of [c.kw, c.lead, c.moment, ...(c.teaches || [])]) {
      if (/\{\w+\}/.test(visible)) fail(`${loc} ${id}: leftover token in "${visible}"`);
      if (freeClaim.hit(visible)) fail(`${loc} ${id}: visible free claim in "${visible}"`);
    }
    const slug = slugify(c.kw, loc);
    if (!/^[a-z0-9-]+$/.test(slug)) fail(`${loc} ${id}: bad slug ${slug}`);
    let metaTitle = c.kw + BRAND;
    for (const suf of st.suffix) { if ((c.kw + suf + BRAND).length <= TITLE_MAX) { metaTitle = c.kw + suf + BRAND; break; } }
    const hasKey = m.templates.some((t) => t.key && (!t.locales || t.locales.includes(loc)));
    // the first candidate that fits the search-result window, longest promise first
    const s1 = firstSentence(c.lead), tail = hasKey ? st.key : st.noKey, short = SHORT_TAIL[loc];
    // (the lead's first two sentences after the whole lead: a sentence added at the end of a lead whose whole text was its
    // description keeps that description, flagship templates 2026-11-08)
    const s2 = firstSentence(c.lead.slice(s1.length).trimStart());
    const candidates = [s1 + tail, c.lead, s1 + ' ' + s2, c.lead + short, s1 + short, s1];
    const metaDescription = candidates.find((d) => d.length >= 120 && d.length <= 165) || candidates.find((d) => d.length >= 105 && d.length <= 170) || '';
    if (!metaDescription) fail(`${loc} ${id}: no description fits (first sentence ${s1.length} chars, lead ${c.lead.length})`);
    for (const [map, val, what] of [[slugs, slug, 'slug'], [titles, metaTitle, 'title'], [metas, metaDescription, 'description']]) {
      if (map.has(val)) fail(`${loc} ${id}: duplicate ${what} with ${map.get(val)}`);
      map.set(val, id);
    }
    out[id] = { kw: c.kw, slug, metaTitle, metaDescription, lead: c.lead, teaches: c.teaches, moment: c.moment };
  }
  fs.writeFileSync(path.join(DIR, `copy.${loc}.json`), JSON.stringify(out, null, 1));
  console.log(`${loc}: ${Object.keys(out).length} makers`);
}
process.exit(bad ? 1 : 0);
