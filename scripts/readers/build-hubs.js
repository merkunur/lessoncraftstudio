#!/usr/bin/env node
/**
 * The data of the English reader hubs (Daily Teaching System, Part 8.2): /en/readers, /en/readers/set-<n>,
 * /en/readers/level-<a|b|c>.
 *
 *   node scripts/readers/build-hubs.js <live.jsonl>            writes frontend/content/readers/hubs.en.json
 *   node scripts/readers/build-hubs.js <live.jsonl> --check    exits 1 when the file on disk is not what it would write
 *   node scripts/readers/build-hubs.js <live.jsonl> --out=<p>  writes elsewhere (tests)
 *
 * Reads the books (books.en.js, never written here), the reading scope (scope.en.js) and a LIVE LIST: one JSON line
 * per published deck (`loc`, `slug`, `deck_id`, `type`, `title` …). A deck belongs to the book whose id, without its
 * hyphens, is the unit at the end of its deck_id (`…-u<unit>`); the four page types of a book are
 *
 *   K-628  the decodable mini-book (series 'first')      K-630  the picture mini-book to color (some picture books)
 *   K-629  the picture mini-book (series 'theme')        K-631  Read and Talk (every book)
 *
 * A book is on a hub only when its MINI-BOOK page is live; the version to color and Read and Talk are added when
 * they are live too. A set or level with at least MIN_BOOKS live books has a page of its own (`hasPage`); one with
 * fewer is listed on the index only. The output is deterministic (book order = the order of books.en.js; no dates,
 * no counts in any title or description, so a new book never changes a page's search identity).
 *
 * The meta titles and descriptions are written here, for US teacher searches ("decodable readers set 3", "level A
 * readers printable"); the visible prose of the pages is frontend/content/readers/ui.en.json. "Free" may stand in
 * metadata only (the site's printable landings do the same); visible text never says it (a download is metered).
 * Checked by scripts/readers/gate-hubs.js.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..');
const OUT_DEFAULT = path.join(REPO, 'frontend', 'content', 'readers', 'hubs.en.json');
const MIN_BOOKS = 3;
const TYPES = { book: { first: 'K-628', theme: 'K-629' }, color: 'K-630', talk: 'K-631' };

/**
 * The skill of each set as a US teacher names it (PLAN.md: "English reader hubs are cut by phonics skill"):
 * `skill` for the title and heading, `sounds` for the meta description. buildHubs() checks that `sounds` names every
 * spelling the set teaches, so the two cannot drift from scope.en.js.
 */
const SET_SKILL = {
  1: { skill: 'Short a', sounds: 'short a with m, s, t, and p' },
  2: { skill: 'Short i', sounds: 'short i with n, f, and d' },
  3: { skill: 'Short o', sounds: 'short o with c, k, g, and h' },
  4: { skill: 'Short u', sounds: 'short u with b, r, and l' },
  5: { skill: 'Short e', sounds: 'short e, and s that says /z/' },
  6: { skill: 'More Consonants', sounds: 'the consonants j, w, v, y, x, z, and qu' },
  // ck is two different letters, not a double letter (US teacher review 2026-11-20)
  7: { skill: 'ck and Double Letters', sounds: 'ck and the double letters ff, ll, ss, and zz (the FLOSS rule)' },
  8: { skill: 'Digraphs', sounds: 'the digraphs sh, ch, th, wh, and ng' },
  9: { skill: 'Consonant Blends', sounds: 'consonant blends and nk' },
  10: { skill: 'Silent e', sounds: 'silent e (a_e, i_e, o_e, u_e, e_e) and soft c and g (ce, ge)' },
};
/** what a level asks of the child, for the meta description */
const LEVEL_ABOUT = {
  A: 'one short line on each page, a repeating sentence pattern, and one clear picture',
  B: 'short sentences and a pattern that changes, often on the last page',
  C: 'little stories and fact books, some pages with two sentences',
};
const LEVEL_GRADE = { A: 'kindergarten', B: 'kindergarten', C: 'kindergarten and first grade' };
/** a key word for a spelling that the scope teaches twice (s, th): the sound it says in this set */
const SOUND_EXAMPLE = { z: 'is', th: 'thin', dh: 'this' };

const spellingsBefore = (scope, n) => new Set(scope.stages.filter((s) => s.n < n).flatMap((s) => s.gpc.map((g) => g.split(':')[0])));
/** the spellings a set teaches; one the scope teaches twice (s, th) carries a key word for the sound it says here */
function soundsOf(scope, st) {
  const before = spellingsBefore(scope, st.n);
  return st.gpc.map((g) => {
    const [spelling, sound] = g.split(':');
    const twice = before.has(spelling) || st.gpc.filter((x) => x.split(':')[0] === spelling).length > 1;
    return twice && SOUND_EXAMPLE[sound] ? { spelling, example: SOUND_EXAMPLE[sound] } : { spelling };
  });
}

function fitTitle(head, tails) {
  for (const t of tails) { const s = `${head} | ${t}`; if (s.length <= 62) return s; }
  return head;
}
/** "a, b, and c" (American English: the serial comma); "a and b" */
const andList = (xs) => (xs.length <= 2 ? xs.join(' and ') : `${xs.slice(0, -1).join(', ')}, and ${xs[xs.length - 1]}`);
const NUMBER_WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];
const quoted = (xs) => xs.map((x) => `"${x}"`);

/** the live decks of a language, by page type and book unit (the book id without its hyphens) */
function readLive(file, locale) {
  const byKey = new Map();
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter((l) => l.trim());
  for (const [i, line] of lines.entries()) {
    let d;
    try { d = JSON.parse(line); } catch (e) { throw new Error(`${file}:${i + 1}: not JSON (${e.message})`); }
    if (d.loc !== locale) continue;
    const m = String(d.deck_id || '').match(/-u([a-z0-9]+)$/);
    if (!m || !d.slug || !d.type) throw new Error(`${file}:${i + 1}: a deck without slug, type or a unit in its deck_id`);
    const key = `${d.type}|${m[1]}`;
    if (byKey.has(key) && byKey.get(key).slug !== d.slug) throw new Error(`two live decks of ${d.type} for the book "${m[1]}": ${byKey.get(key).slug}, ${d.slug}`);
    byKey.set(key, { slug: d.slug, title: (d.title && d.title[locale]) || '' });
  }
  return byKey;
}

function buildHubs({ books, scope, live, locale = 'en' }) {
  const unitOf = (id) => id.replace(/-/g, '');
  const units = new Map();
  for (const b of books) {
    if (units.has(unitOf(b.id))) throw new Error(`two books share the unit "${unitOf(b.id)}": ${units.get(unitOf(b.id))}, ${b.id}`);
    units.set(unitOf(b.id), b.id);
  }
  const pageOf = (type, b) => (live.get(`${type}|${unitOf(b.id)}`) || {}).slug || null;
  const booksOn = (b) => ({
    book: pageOf(TYPES.book[b.series], b),
    color: b.series === 'theme' ? pageOf(TYPES.color, b) : null,
    talk: pageOf(TYPES.talk, b),
  });

  const unused = [...live.keys()].filter((k) => !units.has(k.split('|')[1]));
  const sets = [];
  for (const st of scope.stages) {
    const own = books.filter((b) => b.series === 'first' && b.stage === st.n).map((b) => ({ b, pages: booksOn(b) })).filter((x) => x.pages.book);
    if (!own.length) continue;
    const sk = SET_SKILL[st.n];
    if (!sk) throw new Error(`set ${st.n} has live books and no SET_SKILL entry`);
    const tokens = new Set(sk.sounds.toLowerCase().split(/[^a-z_/]+/).filter(Boolean));
    const taughtBefore = spellingsBefore(scope, st.n);
    for (const g of st.gpc) {
      const [spelling, sound] = g.split(':');
      // a spelling the scope already taught with another sound (s as /z/) must be named with that sound
      const said = tokens.has(spelling) && (!taughtBefore.has(spelling) || tokens.has(`/${sound}/`));
      if (!said) throw new Error(`SET_SKILL[${st.n}].sounds does not name "${spelling}" (${g}) of scope.en.js`);
    }
    const sounds = soundsOf(scope, st);
    // the longest description that fits a search result (≤ 165 characters)
    const head = `Decodable readers to print for phonics Set ${st.n}: ${sk.sounds}.`;
    const hearts = [`Heart words ${andList(quoted(st.heart))}.`, `${NUMBER_WORDS[st.heart.length] || st.heart.length} new heart words.`];
    const tails = ['Little books that fold from one sheet, each with a Read and Talk page.', 'Little books that fold from one sheet of paper.', 'Mini-books for K–1.'];
    const description = hearts.flatMap((h) => tails.map((t) => `${head} ${h} ${t}`)).find((s) => s.length <= 165) || `${head} ${tails[2]}`;
    sets.push({
      n: st.n,
      slug: `set-${st.n}`,
      hasPage: own.length >= MIN_BOOKS,
      skill: sk.skill,
      sounds,
      heart: st.heart,
      blends: !!st.blends,
      // the sets before, as the set page names them ("Set 1 (m, s, a, t, p)"): their spellings, each once
      before: scope.stages.filter((s) => s.n < st.n).map((s) => ({ n: s.n, sounds: soundsOf(scope, s) })),
      metaTitle: fitTitle(`Decodable Readers Set ${st.n}: ${sk.skill}`, ['Printable Mini-Books', 'Mini-Books', 'Printable']),
      metaDescription: description,
      books: own.map(({ b, pages }) => {
        const m = String(b.note || '').match(/^New in this book: .*?\.(?=\s|$)/);
        return { id: b.id, title: b.title, line: m ? m[0] : null, pages };
      }),
    });
  }

  const levels = [];
  for (const level of ['A', 'B', 'C']) {
    const own = books.filter((b) => b.series === 'theme' && b.level === level).map((b) => ({ b, pages: booksOn(b) })).filter((x) => x.pages.book);
    if (!own.length) continue;
    levels.push({
      level,
      slug: `level-${level.toLowerCase()}`,
      hasPage: own.length >= MIN_BOOKS,
      metaTitle: fitTitle(`Picture Readers About Level ${level}`, [`Printable Mini-Books for ${level === 'C' ? 'K–1' : 'K'}`, 'Printable Mini-Books', 'Mini-Books']),
      metaDescription: `Picture readers about Level ${level} to print: ${LEVEL_ABOUT[level]}. One-sheet emergent readers for ${LEVEL_GRADE[level]}.`,
      books: own.map(({ b, pages }) => {
        // the words each picture carries, as the Read and Talk page lists them: one phrase when they stand side by
        // side in the page's text ("teddy bear", "ice cream"), else each word apart ("nest", "chicks")
        const words = [];
        for (const [i, p] of (b.pics || []).entries()) {
          const ws = p.words || [];
          const text = ` ${String((b.pages || [])[i] || '').replace(/ \| /g, ' ').toLowerCase().replace(/[^a-z' ]+/g, ' ')} `.replace(/\s+/g, ' ');
          const phrase = ws.join(' ');
          for (const w of ws.length > 1 && text.includes(` ${phrase.toLowerCase()} `) ? [phrase] : ws) if (w && !words.includes(w)) words.push(w);
        }
        return { id: b.id, title: b.title, pictureWords: words, newWords: b.newWords || [], pages };
      }),
    });
  }

  return {
    hubs: {
      locale,
      minBooks: MIN_BOOKS,
      index: {
        metaTitle: 'Free Printable Decodable Readers for Kindergarten and 1st Grade',
        metaDescription: 'Decodable readers by phonics set and picture readers about Levels A to C, as little books that fold from one sheet of paper. Each book has a Read and Talk page.',
      },
      sets,
      levels,
    },
    unused,
  };
}

function main() {
  const args = process.argv.slice(2);
  const liveFile = args.find((a) => !a.startsWith('--'));
  if (!liveFile) { console.error('usage: node scripts/readers/build-hubs.js <live.jsonl> [--check] [--out=<path>]'); process.exit(2); }
  const out = (args.find((a) => a.startsWith('--out=')) || '').slice(6) || OUT_DEFAULT;
  const books = require('./books.en.js');
  const scope = require('./scope.en.js');
  const { hubs, unused } = buildHubs({ books, scope, live: readLive(liveFile, 'en') });
  const text = `${JSON.stringify(hubs, null, 1)}\n`;
  const nBooks = hubs.sets.concat(hubs.levels).reduce((n, g) => n + g.books.length, 0);
  const pages = hubs.sets.concat(hubs.levels).filter((g) => g.hasPage).map((g) => g.slug);
  if (unused.length) console.warn(`[build-hubs] ${unused.length} live deck(s) belong to no book of books.en.js: ${unused.join(', ')}`);
  if (args.includes('--check')) {
    const now = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '';
    if (now !== text) { console.error(`[build-hubs] ${path.relative(REPO, out)} is not up to date: run node scripts/readers/build-hubs.js ${liveFile}`); process.exit(1); }
    console.log(`[build-hubs] up to date: ${nBooks} books, pages ${pages.join(', ') || '(index only)'}`);
    return;
  }
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, text);
  console.log(`[build-hubs] wrote ${path.relative(REPO, out)}: ${nBooks} books on the hubs; pages: index${pages.length ? `, ${pages.join(', ')}` : ''}`);
}

module.exports = { buildHubs, readLive, MIN_BOOKS, TYPES };
if (require.main === module) main();
