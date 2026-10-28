#!/usr/bin/env node
/**
 * curate-level-set-candidates.js — the hand-review step after build-level-set-demand-report.js.
 *
 * The report matches autocomplete phrases to noindex Level Set decks by topic stems, which
 * leaves two kinds of noise a stem match cannot see: phrases whose intent is not a worksheet
 * (a trade fair, a software product, a music video, "what is", a game, adult classes) and
 * stems that matched a different word (spiel → Spielzeug, poster → Postamt, bild → Bildung).
 * REJECT below is the reviewed list — each entry was read against its phrases, never guessed.
 * Kept rows get a page kind:
 *   level  — "<type> easy|hard": a landing for one difficulty of a Level Set (supply = that level)
 *   topic  — "<type> <theme>": a landing for one theme of a type
 * and a strength: strong (≥3 decks), thin (1-2 decks: one-deck landing, like today's landings).
 *
 * Writes docs/SEO/level-set-demand/shortlist.json + SHORTLIST.md. NON-DESTRUCTIVE.
 * Usage: node scripts/seo-research/curate-level-set-candidates.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = path.resolve(__dirname, '..', '..', 'docs', 'SEO', 'level-set-demand');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* topic words that are never a worksheet theme, in any type (reviewed against the phrases) */
const REJECT_TOPIC = new Set([
  // grade/class/audience phrasing, mostly Indian English "class 2" or adult classes
  'class', 'classes', 'klas', 'primero', 'quinto', 'multiplication class',
  // definition / video / music / game / software intent
  'que', 'music', 'musica', 'muziek', 'musique', 'aula', 'spiel', 'spil', 'spielen', 'acces', 'monsters', 'monstruos', 'boule', 'tool', 'outil', 'create', 'fazer', 'pintar',
  // stems that matched another word
  'bild', 'image', 'poster', 'post', 'worter', 'oder', 'form', 'vita', 'spia', 'educacion', 'light', 'life', 'things', 'objetos', 'activite', 'attivita', 'activiteit', 'aktivitet', 'livro', 'bilder', 'traits', 'lineas', 'disegni', 'dibujos', 'forme', 'vormen', 'pictures hard',
  // function words matched against single-word decks (sight words, word classes)
  'you', 'like', 'help', 'die', 'qui', 'var', 'till', 'drie', 'opp', 'ino', 'ello', 'how many', 'gracias',
  // other languages / other meanings
  'german', 'italien', 'frans', 'fire', 'flames', 'ice', 'leopard', 'marines', 'meuble', 'lucia', 'fotboll', 'fotball', 'skolen', 'camp', 'tools', 'house', 'furniture', 'clothing', 'nature', 'dreieck', 'sport', 'verticale', 'circulos', 'hoe teken hond', 'une voiture', 'une vache', 'voiture course', 'pflanzen', 'plantas', 'basura', 'mar', 'classroom', 'herramientas', 'rund ums haus', 'vaikeaa',
]);
/* single (locale|type|topic) rejects where the topic word is fine elsewhere */
const REJECT_ROW = new Set([
  'en|geometry|house', 'en|singular-plural|house', 'en|read-and-color|house', 'en|picture-tracing|house', 'en|color-by-number|house',
  'en|fractions|class', 'fr|fractions|class', 'nl|geometry|klas', 'en|number-charts|music', 'en|maze-puzzles|corn', 'en|maze-puzzles|chicken',
  'en|reading-comprehension|easy', 'en|synonyms|easy', 'de|reading-comprehension|wald', 'fr|word-classes|fleur', 'fr|articles|vacance', 'fr|articles|noel',
  'es|write-the-word|gracias', 'de|measurement|essen', 'en|measurement|kitchen', 'en|geometry|kitchen', 'de|singular-plural|von gemuse', 'en|alphabetical-order|vegetables',
]);
/* rows a reader of the phrase is plainly after; kept even though one word looks generic */
const LEVEL_WORDS = new Set(['easy', 'hard']);

const rows = [];
for (const loc of LOCALES) {
  const file = path.join(DIR, `report.${loc}.json`);
  if (!fs.existsSync(file)) continue;
  const rep = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const c of rep.candidates || []) {
    const key = `${loc}|${c.type}|${c.topic}`;
    if (REJECT_TOPIC.has(c.topic) && !REJECT_ROW.has(key) && !(loc === 'en' && c.topic === 'house' && false)) {
      // house is generic in en only; in other locales it is a theme word under its own spelling
      continue;
    }
    if (REJECT_ROW.has(key)) continue;
    const kind = LEVEL_WORDS.has(c.topic) ? 'level' : 'topic';
    rows.push({
      locale: loc, type: c.type, topic: c.topic, kind,
      demand: c.demand, decks: c.supply, strength: c.supply >= 3 ? 'strong' : 'thin',
      phrases: (c.phrases || []).slice(0, 3), sample: (c.supplySample || []).slice(0, 2),
    });
  }
}
rows.sort((a, b) => b.demand - a.demand || b.decks - a.decks);
fs.writeFileSync(path.join(DIR, 'shortlist.json'), JSON.stringify(rows, null, 1));

const by = (k) => rows.reduce((m, r) => ((m[r[k]] = (m[r[k]] || 0) + 1), m), {});
const md = [];
md.push('# Level Set landing shortlist — all 11 locales', '');
md.push(`Kept after hand review: **${rows.length}** (strong ≥3 decks: ${rows.filter((r) => r.strength === 'strong').length}, thin 1-2 decks: ${rows.filter((r) => r.strength === 'thin').length}).`, '');
md.push('Per locale: ' + LOCALES.map((l) => `${l} ${by('locale')[l] || 0}`).join(' · '), '');
md.push('Per kind: ' + Object.entries(by('kind')).map(([k, v]) => `${k} ${v}`).join(' · '), '');
for (const loc of LOCALES) {
  const rs = rows.filter((r) => r.locale === loc);
  if (!rs.length) continue;
  md.push(`## ${loc} (${rs.length})`, '', '| # | Type | Topic | Kind | Demand | Decks | Phrases |', '|---|---|---|---|---|---|---|');
  rs.forEach((r, i) => md.push(`| ${i + 1} | ${r.type} | ${r.topic} | ${r.kind} | ${r.demand} | ${r.decks}${r.strength === 'thin' ? ' (thin)' : ''} | ${r.phrases.join('; ')} |`));
  md.push('');
}
fs.writeFileSync(path.join(DIR, 'SHORTLIST.md'), md.join('\n'));
console.log(`kept ${rows.length}; strong ${rows.filter((r) => r.strength === 'strong').length}; per locale`, by('locale'), 'per kind', by('kind'));
