#!/usr/bin/env node
/* Harvest real demand for the CROSS-LANGUAGE vocabulary pages.
 *
 * Why this exists
 * ---------------
 * ~525 English landings teach another language's vocabulary (Danish, Dutch,
 * French, German, Finnish...). The existing demand corpus contains ZERO queries
 * for "learn danish", "dutch words for kids", "german worksheets" — not because
 * nobody searches them, but because that corpus was seeded from OUR OWN taxonomy
 * of worksheet types and themes, so those phrasings were never probed. Reading
 * that silence as "no demand" is the same mistake as reading autocomplete
 * silence as absence.
 *
 * A direct probe found the demand is substantial: "french worksheets for kids"
 * and "german words for kids" both return a full suggestion set, and the
 * dominant phrasings are "<language> words for kids" and "<language> worksheets
 * for kids pdf" — NOT the "<Language> Word Search" frame the pages currently
 * lead with.
 *
 * Output feeds build-part-brief.js so authors see the real phrasings.
 *
 * Usage: node scripts/seo-per-page/harvest-crosslang-demand.js [--delay=220]
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'docs', 'SEO', 'harvests', 'crosslang-en.json');

// the target languages actually taught by these pages
const LANGS = ['danish', 'dutch', 'french', 'german', 'finnish', 'spanish',
  'italian', 'portuguese', 'swedish', 'norwegian'];

// phrasings a parent or teacher actually types
const PATTERNS = [
  '{L} words for kids', '{L} worksheets for kids', 'learn {L} for kids',
  '{L} for kids printable', '{L} vocabulary for kids', '{L} word search for kids',
  '{L} for beginners kids', 'kids {L} flashcards printable',
];

/* Not every real query is a query THIS page can answer.
 *
 * The raw harvest carried 17 app/video/song queries ("learn german for kids
 * app", "french songs for beginners kids") and, for the thinner languages, a
 * majority of informational ones ("how to learn norwegian", "is norwegian an
 * easy language to learn"). A printable worksheet titled after an app query is a
 * false promise, and someone asking whether Norwegian is hard does not want a
 * PDF. Both would send a visitor who bounces, which teaches Google the page is a
 * poor answer — the opposite of the point.
 */
const WRONG_INTENT = new RegExp([
  'duolingo', 'babbel', 'rosetta', 'busuu', 'memrise', 'preply', 'italki',
  '\\bapps?\\b', 'youtube', 'netflix', '\\bmovies?\\b', '\\bsongs?\\b', '\\bcartoons?\\b',
  'reddit', 'amazon', 'udemy', 'coursera', '\\bcourse\\b', '\\bclasses\\b', 'tutor',
  // informational, not "give me a printable"
  '^how ', '^is ', '^why ', '^what ', '^can ', '^should ', '^which ',
  'easiest way', 'how long', 'hard to learn', 'easy language',
].join('|'), 'i');

function keepQuery(q) {
  return !WRONG_INTENT.test(q);
}

function suggest(q, delayMs) {
  const url = 'https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q='
    + encodeURIComponent(q);
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 10000 }, (res) => {
      let body = '';
      res.on('data', (c) => { body += c; });
      res.on('end', () => {
        try { resolve(JSON.parse(body)[1] || []); } catch { resolve([]); }
      });
    });
    req.on('error', () => resolve([]));
    req.on('timeout', () => { req.destroy(); resolve([]); });
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  if (process.argv.includes('--refilter')) {
    const cur = JSON.parse(fs.readFileSync(OUT, 'utf8'));
    let before = 0; let after = 0;
    for (const lang of Object.keys(cur.byLang)) {
      before += cur.byLang[lang].length;
      cur.byLang[lang] = cur.byLang[lang].filter(keepQuery);
      after += cur.byLang[lang].length;
    }
    cur.total = after;
    fs.writeFileSync(OUT, JSON.stringify(cur, null, 1));
    console.log(`refiltered: ${before} -> ${after} queries (${before - after} wrong-intent removed)`);
    for (const lang of Object.keys(cur.byLang)) console.log(`  ${lang.padEnd(11)} ${cur.byLang[lang].length}`);
    return;
  }
  const delay = Number((process.argv.find((a) => a.startsWith('--delay=')) || '').split('=')[1] || 220);
  const byLang = {};
  let total = 0;

  for (const lang of LANGS) {
    const found = new Set();
    for (const pat of PATTERNS) {
      const seed = pat.replace('{L}', lang);
      for (const s of await suggest(seed, delay)) {
        const q = String(s).toLowerCase().trim();
        // keep only suggestions that actually name this language — Google drifts
        // ("learn finnish for kids" returns french suggestions)
        if (!q.includes(lang)) continue;
        if (!keepQuery(q)) continue;
        found.add(q);
      }
      await sleep(delay);
    }
    byLang[lang] = [...found].sort();
    total += found.size;
    console.log(`${lang.padEnd(11)} ${found.size} queries`);
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({
    source: 'google autocomplete, hl=en gl=us',
    note: 'demand for cross-language vocabulary pages; absent from the taxonomy-seeded corpus because it was never probed',
    total,
    byLang,
  }, null, 1));
  console.log(`\n${total} queries -> ${path.relative(ROOT, OUT)}`);
})();
