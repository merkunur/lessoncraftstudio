#!/usr/bin/env node
/**
 * The gate of the English reader hubs (Daily Teaching System, Part 8.2): /en/readers, /en/readers/set-<n>,
 * /en/readers/level-<a|b|c>.
 *
 *   node scripts/readers/gate-hubs.js --live=<live.jsonl>                  the hubs file against the books and a live list
 *   node scripts/readers/gate-hubs.js --decks-root=/var/www/lcs-media/decks   … against the deck folders on the server
 *   node scripts/readers/gate-hubs.js --live=<…> --render=http://localhost:3000  also reads the rendered pages
 *   node scripts/readers/gate-hubs.js --live=<…> --poison                  proves every rule in both directions
 *
 * The gate computes what the hubs must hold ON ITS OWN, from scripts/readers/books.en.js and the live source; it never
 * reuses build-hubs.js (a gate that reads its expectation off the generator marks its own homework). A deck is live
 * when its line is in the live list (the book is the unit at the end of its deck_id), or, with --decks-root, when
 * <root>/en/<slug>/deck.html exists (slug = readers-<type>-<unit>, the convention of every reader deck).
 *
 *   H1  every book whose mini-book page is live is on the hubs, in its own set or level, with that page
 *   H2  every page the hubs list is live, of the right type (K-628/K-629 mini-book, K-630 to color, K-631 Read and
 *       Talk) and of the same book
 *   H3  no book twice, no book that books.en.js does not have, no book in another set or level than its own
 *   H4  a set or level has a page of its own exactly when it holds at least 3 books; no empty set or level
 *   H5  the titles and descriptions of the hub pages are unique, and none repeats a title or description of the
 *       site's English landings, units, year plans or hubs
 *   H6  a title is 30 to 65 characters, a description 110 to 170
 *   H7  visible text never says "free" (a download is metered; "free" may stand in metadata only) and never asks the
 *       child to guess from the picture; a level is named "about Level A", never "Level A" alone (the reviewer's rule)
 *   H8  every string of ui.en.json is used by the pages, and every string the pages use exists
 *   R1  (--render) each page answers 200 with its title, description, canonical, index-follow robots, hreflang en +
 *       x-default only, one h1, BreadcrumbList + CollectionPage JSON-LD, and links to exactly its books' pages; every
 *       other address under /readers and every other language answers 404; /en/units links to the hub
 *
 * Exit 0 = clean, 1 = a finding, 2 = a usage error. Wired into nothing yet (deploy.sh is the operator's).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..');
const FRONT = path.join(REPO, 'frontend');
const HOST = 'https://www.lessoncraftstudio.com';
const MIN_BOOKS = 3;
const MINI = { first: 'K-628', theme: 'K-629' };
const COLOR = 'K-630';
const TALK = 'K-631';
const typeOfSlug = (slug) => { const m = String(slug).match(/^readers-k(\d{3})-/); return m ? `K-${m[1]}` : null; };
const unitOfSlug = (slug) => { const m = String(slug).match(/^readers-k\d{3}-([a-z0-9]+)$/); return m ? m[1] : null; };
const unitOf = (id) => id.replace(/-/g, '');
const norm = (s) => String(s || '').toLowerCase().replace(/\s+/g, ' ').trim();

// ── the live source ──
function liveFromList(file) {
  const live = new Map(); // slug -> { type, unit }
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    if (!line.trim()) continue;
    const d = JSON.parse(line);
    if (d.loc !== 'en') continue;
    const m = String(d.deck_id || '').match(/-u([a-z0-9]+)$/);
    live.set(d.slug, { type: d.type, unit: m ? m[1] : null });
  }
  return live;
}
function liveFromDecks(root, books) {
  const live = new Map();
  for (const b of books) {
    const types = [b.series === 'first' ? MINI.first : MINI.theme, TALK].concat(b.series === 'theme' ? [COLOR] : []);
    for (const t of types) {
      const slug = `readers-${t.toLowerCase().replace('-', '')}-${unitOf(b.id)}`;
      if (fs.existsSync(path.join(root, 'en', slug, 'deck.html'))) live.set(slug, { type: t, unit: unitOf(b.id) });
    }
  }
  return live;
}

// ── the titles and descriptions the site already uses (H5) ──
function existingMeta() {
  const out = [];
  const add = (where, t, d) => { if (t) out.push({ where, kind: 'title', text: t }); if (d) out.push({ where, kind: 'description', text: d }); };
  const read = (p) => { try { return JSON.parse(fs.readFileSync(path.join(FRONT, p), 'utf8')); } catch { return null; } };
  const units = read('content/units/units.en.json');
  if (units) for (const u of [...(units.units || []), ...(units.plans || [])]) add(`units/${u.slug}`, u.metaTitle, u.metaDescription);
  const landings = read('content/seo-landing/en.json');
  if (landings) for (const l of landings.landings || []) add(`worksheets/${l.slug}`, l.title, l.metaDescription);
  for (const p of ['content/units/ui.en.json', 'content/assessments/ui.en.json']) { const u = read(p); if (u) add(p, u.hubMetaTitle, u.hubMetaDescription); }
  return out;
}

// ── the strings the pages use (H8) ──
// The reader components call the reader strings `ui`; the two units components call them `readerUi` / `rdUi` (their
// own `ui` is content/units/ui.<loc>.json and is not read here).
const OWN = /\bui\.([a-zA-Z][a-zA-Z0-9]*)/g;
const IN_UNITS = /\b(?:readerUi|rdUi)\??\.([a-zA-Z][a-zA-Z0-9]*)/g;
const UI_SOURCES = [
  ['lib/readers.ts', OWN], ['components/readers/ReaderParts.tsx', OWN], ['components/readers/ReadersHub.tsx', OWN],
  ['components/readers/ReaderGroupPage.tsx', OWN], ['components/units/UnitsHub.tsx', IN_UNITS], ['components/units/UnitPage.tsx', IN_UNITS],
];
function usedUiKeys() {
  const used = new Set(); const prefixes = new Set();
  for (const [f, re] of UI_SOURCES) {
    // comments are prose, not code: "ui.x" in a comment is no use of a string
    const src = fs.readFileSync(path.join(FRONT, f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
    for (const m of src.matchAll(re)) used.add(m[1]);
    for (const m of src.matchAll(/\bui\[`([a-zA-Z]+)\$\{/g)) prefixes.add(m[1]);
  }
  return { used, prefixes };
}

/** H7: the strings a visitor reads; keys whose text may name guided reading levels in general (not our books) */
const LEVEL_ANY_KEYS = new Set(['levelsLead']);
function visibleTexts(hubs, ui) {
  const out = Object.entries(ui).map(([k, v]) => ({ where: `ui.${k}`, key: k, text: String(v) }));
  for (const g of [...hubs.sets, ...hubs.levels]) {
    if (g.skill) out.push({ where: `${g.slug}.skill`, text: g.skill });
    for (const b of g.books) {
      out.push({ where: `${g.slug}/${b.id}.title`, text: b.title });
      if (b.line) out.push({ where: `${g.slug}/${b.id}.line`, text: b.line });
      for (const w of [...(b.pictureWords || []), ...(b.newWords || [])]) out.push({ where: `${g.slug}/${b.id}.words`, text: w });
    }
  }
  return out;
}
function levelNamedBare(text) {
  // every "Level A" / "Levels A to C" / "Level {level}" must follow "about"
  for (const m of text.matchAll(/\b(Levels?)\s+(?:[A-C]\b|\{level\})/g)) {
    const before = text.slice(Math.max(0, m.index - 6), m.index).toLowerCase();
    if (!/about\s$/.test(before)) return m[0];
  }
  return null;
}

function check({ hubs, ui, books, live, existing, uiUse }) {
  const f = [];
  const fail = (rule, msg) => f.push({ rule, msg });
  const groups = [...hubs.sets.map((s) => ({ ...s, kind: 'set', key: s.n })), ...hubs.levels.map((l) => ({ ...l, kind: 'level', key: l.level }))];
  const liveSlugOf = (type, b) => { for (const [slug, d] of live) if (d.type === type && d.unit === unitOf(b.id)) return slug; return null; };
  const byId = new Map(books.map((b) => [b.id, b]));

  // H1: every book with a live mini-book page is on its own set or level
  for (const b of books) {
    const mini = liveSlugOf(MINI[b.series], b);
    if (!mini) continue;
    const own = groups.find((g) => (b.series === 'first' ? g.kind === 'set' && g.key === b.stage : g.kind === 'level' && g.key === b.level));
    const on = own && own.books.find((x) => x.id === b.id);
    if (!on) fail('H1', `"${b.id}" has a live mini-book page (${mini}) and is not on ${b.series === 'first' ? `set ${b.stage}` : `level ${b.level}`}`);
    else if (on.pages.book !== mini) fail('H1', `"${b.id}" lists ${on.pages.book} as its mini-book; the live one is ${mini}`);
  }
  // H2 + H3: what the hubs list
  const seen = new Set();
  for (const g of groups) {
    for (const x of g.books) {
      const b = byId.get(x.id);
      if (seen.has(x.id)) fail('H3', `"${x.id}" is listed twice`);
      seen.add(x.id);
      if (!b) { fail('H3', `"${x.id}" on ${g.slug} is not a book of books.en.js`); continue; }
      if (g.kind === 'set' ? b.series !== 'first' || b.stage !== g.key : b.series !== 'theme' || b.level !== g.key) fail('H3', `"${x.id}" is on ${g.slug}, not on its own set or level`);
      if (x.title !== b.title) fail('H3', `"${x.id}" is titled "${x.title}" on the hubs and "${b.title}" in books.en.js`);
      const want = { book: MINI[b.series], color: COLOR, talk: TALK };
      for (const k of ['book', 'color', 'talk']) {
        const slug = x.pages[k];
        if (!slug) { if (k === 'book') fail('H2', `"${x.id}" has no mini-book page`); continue; }
        const d = live.get(slug);
        if (!d) { fail('H2', `${g.slug}: "${slug}" is not a live page`); continue; }
        if (d.type !== want[k]) fail('H2', `${g.slug}: "${slug}" stands as the ${k} page of "${x.id}" but is a ${d.type} page`);
        if (d.unit !== unitOf(b.id)) fail('H2', `${g.slug}: "${slug}" belongs to the book "${d.unit}", not to "${x.id}"`);
      }
      // a live page of the book the hubs leave out (Read and Talk, the version to color)
      for (const k of ['color', 'talk']) { const s = liveSlugOf(want[k], b); if (s && !x.pages[k] && (k === 'talk' || b.series === 'theme')) fail('H2', `"${x.id}" leaves out its live ${k} page ${s}`); }
    }
  }
  // H4: pages
  if (hubs.minBooks !== MIN_BOOKS) fail('H4', `minBooks is ${hubs.minBooks}, the rule is ${MIN_BOOKS}`);
  for (const g of groups) {
    if (!g.books.length) fail('H4', `${g.slug} has no book and must not be in the file`);
    if (g.hasPage && g.books.length < MIN_BOOKS) fail('H4', `${g.slug} has a page with ${g.books.length} book(s); a page needs ${MIN_BOOKS}`);
    if (!g.hasPage && g.books.length >= MIN_BOOKS) fail('H4', `${g.slug} holds ${g.books.length} books and has no page`);
    if (g.slug !== (g.kind === 'set' ? `set-${g.key}` : `level-${String(g.key).toLowerCase()}`)) fail('H4', `${g.slug} is not the address of ${g.kind} ${g.key}`);
  }
  // H5 + H6: titles and descriptions of the pages that exist
  const pages = [{ slug: 'readers', ...hubs.index }, ...groups.filter((g) => g.hasPage).map((g) => ({ slug: `readers/${g.slug}`, metaTitle: g.metaTitle, metaDescription: g.metaDescription }))];
  for (const kind of ['metaTitle', 'metaDescription']) {
    const at = new Map();
    for (const p of pages) { const k = norm(p[kind]); if (at.has(k)) fail('H5', `${p.slug} and ${at.get(k)} share the ${kind} "${p[kind]}"`); else at.set(k, p.slug); }
    const ex = new Map(existing.filter((e) => e.kind === (kind === 'metaTitle' ? 'title' : 'description')).map((e) => [norm(e.text), e.where]));
    for (const p of pages) if (ex.has(norm(p[kind]))) fail('H5', `${p.slug}: the ${kind} "${p[kind]}" is already the one of ${ex.get(norm(p[kind]))}`);
  }
  for (const p of pages) {
    if (!p.metaTitle || p.metaTitle.length < 30 || p.metaTitle.length > 65) fail('H6', `${p.slug}: title of ${String(p.metaTitle || '').length} characters (30 to 65)`);
    if (!p.metaDescription || p.metaDescription.length < 110 || p.metaDescription.length > 170) fail('H6', `${p.slug}: description of ${String(p.metaDescription || '').length} characters (110 to 170)`);
    for (const t of [p.metaTitle, p.metaDescription]) { const bare = levelNamedBare(t || ''); if (bare) fail('H7', `${p.slug}: "${bare}" in the metadata without "about"`); }
    if (/\bguess/i.test(`${p.metaTitle} ${p.metaDescription}`)) fail('H7', `${p.slug}: the metadata speaks of guessing`);
  }
  // H7: visible text
  for (const v of visibleTexts(hubs, ui)) {
    if (/\bfree\b/i.test(v.text)) fail('H7', `${v.where} says "free" on the page: "${v.text}"`);
    if (/\bguess/i.test(v.text)) fail('H7', `${v.where} speaks of guessing: "${v.text}"`);
    if (!LEVEL_ANY_KEYS.has(v.key)) { const bare = levelNamedBare(v.text); if (bare) fail('H7', `${v.where} names "${bare}" without "about": "${v.text}"`); }
  }
  // H8: strings used and existing
  const { used, prefixes } = uiUse;
  for (const k of Object.keys(ui)) if (!used.has(k) && ![...prefixes].some((p) => k.startsWith(p))) fail('H8', `ui.${k} is used by no page`);
  for (const k of used) if (!(k in ui)) fail('H8', `a page reads ui.${k}, which ui.en.json does not have`);
  return f;
}

// ── R1: the rendered pages ──
function pageExpectation(hubs, slug) {
  if (slug === 'readers') {
    const books = [...hubs.sets, ...hubs.levels].flatMap((g) => g.books);
    return { path: '/en/readers', metaTitle: hubs.index.metaTitle, metaDescription: hubs.index.metaDescription, books };
  }
  const g = [...hubs.sets, ...hubs.levels].find((x) => `readers/${x.slug}` === slug);
  return { path: `/en/${slug}`, metaTitle: g.metaTitle, metaDescription: g.metaDescription, books: g.books };
}
const decode = (s) => String(s).replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
function checkRendered(html, exp) {
  const f = []; const fail = (msg) => f.push({ rule: 'R1', msg: `${exp.path}: ${msg}` });
  const url = `${HOST}${exp.path}`;
  const title = (html.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1];
  if (decode(title) !== exp.metaTitle) fail(`<title> is "${title}", not "${exp.metaTitle}"`);
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (decode(desc) !== exp.metaDescription) fail(`description is "${desc}", not "${exp.metaDescription}"`);
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  if (canon !== url) fail(`canonical is ${canon}, not ${url}`);
  const robots = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
  if (!/^index, follow\b/.test(robots) || /noindex/.test(robots)) fail(`robots is "${robots}"`);
  const alts = [...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/gi)].map((m) => `${m[1]}=${m[2]}`).sort();
  if (alts.join(' ') !== [`en=${url}`, `x-default=${url}`].join(' ')) fail(`hreflang is [${alts.join(', ')}], not en + x-default`);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(`${h1} h1 elements`);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => { try { return JSON.parse(m[1]); } catch { return null; } }).filter(Boolean);
  const types = ld.map((x) => x['@type']);
  if (!types.includes('BreadcrumbList')) fail('no BreadcrumbList JSON-LD');
  const coll = ld.find((x) => x['@type'] === 'CollectionPage');
  if (!coll) fail('no CollectionPage JSON-LD');
  else if (!coll.mainEntity || coll.mainEntity.numberOfItems !== exp.books.length) fail(`the ItemList holds ${coll.mainEntity && coll.mainEntity.numberOfItems} books, not ${exp.books.length}`);
  const want = new Set(exp.books.flatMap((b) => [b.pages.book, b.pages.color, b.pages.talk]).filter(Boolean));
  const got = new Set([...html.matchAll(/href="\/en\/decks\/([^"/]+)\/"/g)].map((m) => m[1]));
  for (const s of want) if (!got.has(s)) fail(`no link to the page ${s}`);
  for (const s of got) if (!want.has(s)) fail(`a link to ${s}, which is not a page of its books`);
  // the page's own content (the site's header and footer are not the hub's text)
  const main = (html.match(/<main[\s>][\s\S]*?<\/main>/) || [''])[0];
  if (!main) fail('no <main>');
  if (/\bfree\b/i.test(decode(main.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ')))) fail('the visible page says "free"');
  return f;
}
async function render(base, hubs) {
  const f = [];
  const get = async (p) => { const r = await fetch(`${base}${p}`, { redirect: 'manual' }); return { status: r.status, html: await r.text() }; };
  const pages = ['readers', ...[...hubs.sets, ...hubs.levels].filter((g) => g.hasPage).map((g) => `readers/${g.slug}`)];
  for (const p of pages) {
    const exp = pageExpectation(hubs, p);
    const r = await get(exp.path);
    if (r.status !== 200) { f.push({ rule: 'R1', msg: `${exp.path} answers ${r.status}` }); continue; }
    f.push(...checkRendered(r.html, exp));
  }
  const absent = [...hubs.sets, ...hubs.levels].filter((g) => !g.hasPage).map((g) => `/en/readers/${g.slug}`)
    .concat(['/en/readers/set-99', '/en/readers/level-d', '/en/readers/set-0', '/de/readers', '/fr/readers/level-a', '/sv/readers']);
  for (const p of absent) { const r = await get(p); if (r.status !== 404) f.push({ rule: 'R1', msg: `${p} answers ${r.status}, not 404` }); }
  const units = await get('/en/units');
  if (!/href="\/en\/readers"/.test(units.html)) f.push({ rule: 'R1', msg: '/en/units has no link to /en/readers' });
  return f;
}

// ── poison: each rule must fire on data made wrong on purpose, and stay quiet on data that is right ──
function poison(base) {
  const clone = (x) => JSON.parse(JSON.stringify(x));
  const run = (mut) => { const c = { ...base, hubs: clone(base.hubs), ui: { ...base.ui }, live: new Map(base.live), uiUse: { used: new Set(base.uiUse.used), prefixes: new Set(base.uiUse.prefixes) } }; mut(c); return check(c); };
  const page = (c) => [...c.hubs.sets, ...c.hubs.levels].find((g) => g.hasPage);
  const anyBook = (c) => [...c.hubs.sets, ...c.hubs.levels].find((g) => g.books.length).books[0];
  const dropFromLive = (c, b) => { for (const k of ['book', 'color', 'talk']) if (b.pages[k]) c.live.delete(b.pages[k]); };
  const cases = [
    ['H1', 'a live book left off its page', (c) => { page(c).books.pop(); }],
    ['H1', 'a live book with another mini-book slug', (c) => { c.live.set('readers-k629-isepets', { type: anyBook(c).pages.book.includes('k628') ? 'K-628' : 'K-629', unit: 'x' }); anyBook(c).pages.book = 'readers-k629-isepets'; }],
    ['H2', 'a slug that is not live', (c) => { anyBook(c).pages.talk = 'readers-k631-notlive'; }],
    ['H2', 'a Read and Talk page standing as the mini-book', (c) => { const b = anyBook(c); if (b.pages.talk) b.pages.book = b.pages.talk; }],
    ['H2', 'a live Read and Talk page left out', (c) => { anyBook(c).pages.talk = null; }],
    ['H3', 'a book moved to another set or level', (c) => { const g = c.hubs.levels.find((l) => l.level !== 'C') || c.hubs.levels[0]; const other = c.hubs.levels.find((l) => l !== g); other.books.push(g.books.shift()); }],
    ['H3', 'a book listed twice', (c) => { const g = page(c); g.books.push(clone(g.books[0])); }],
    ['H3', 'a book that books.en.js does not have', (c) => { page(c).books[0].id = 'no-such-book'; }],
    ['H4', 'a page with 2 books', (c) => { const g = page(c); while (g.books.length > 2) dropFromLive(c, g.books.pop()); }],
    ['H4', 'a set or level with 3 books and no page', (c) => { const g = page(c); while (g.books.length > 3) dropFromLive(c, g.books.pop()); g.hasPage = false; }],
    ['H4', 'an empty level in the file', (c) => { c.hubs.levels.push({ level: 'C', slug: 'level-c', hasPage: false, metaTitle: 'x', metaDescription: 'y', books: [] }); }],
    ['H5', 'two pages with one title', (c) => { page(c).metaTitle = c.hubs.index.metaTitle.toUpperCase(); }],
    ['H5', 'two pages with one description', (c) => { page(c).metaDescription = `  ${c.hubs.index.metaDescription} `; }],
    ['H5', 'the title of an existing landing', (c) => { c.hubs.index.metaTitle = base.existing.find((e) => e.kind === 'title' && e.text.length >= 30 && e.text.length <= 65).text; }],
    ['H6', 'a title of 70 characters', (c) => { c.hubs.index.metaTitle = 'Decodable Readers and Picture Readers for Kindergarten and First Grade!'; }],
    ['H6', 'a description of 90 characters', (c) => { page(c).metaDescription = 'Picture readers about Level A to print, little books that fold from one sheet of paper.'; }],
    ['H7', '"free" in a visible string', (c) => { c.ui.indexLead = 'Free little books for children who are learning to read.'; }],
    ['H7', '"free" in a book line', (c) => { const g = c.hubs.levels[0]; g.books[0].newWords = ['free']; }],
    ['H7', 'guessing from the picture', (c) => { c.ui.howPicture2 = 'If a word is hard, use the picture to guess it.'; }],
    ['H7', '"Level B" without "about"', (c) => { c.ui.levelLeadB = 'Little books at Level B: short sentences.'; }],
    ['H7', '"Level A" without "about" in a description', (c) => { page(c).metaDescription = 'Level A picture readers to print: one short line on each page, a repeating sentence pattern and one clear picture.'; }],
    ['H8', 'a string no page uses', (c) => { c.ui.orphan = 'A sentence nobody reads.'; }],
    ['H8', 'a string a page uses and the file lacks', (c) => { delete c.ui.talkLink; }],
  ];
  const controls = [
    ['the real data', () => {}],
    ['"about Level A" and "about Levels A to C"', (c) => { c.ui.levelLeadA = 'Little books about Level A, part of picture readers about Levels A to C.'; }],
    ['guided reading levels named in general (levelsLead)', (c) => { c.ui.levelsLead = 'Levels A, B and C are the first guided reading levels.'; }],
    ['"freely" and "carefree" are not "free"', (c) => { c.ui.kindDecodableText += ' Children read freely, carefree.'; }],
    ['"Free" in metadata only', (c) => { c.hubs.index.metaTitle = 'Free Printable Decodable Readers for Kindergarten and Grade 1'; }],
    ['a book whose Read and Talk page is not live', (c) => { const b = anyBook(c); if (b.pages.talk) { c.live.delete(b.pages.talk); b.pages.talk = null; } }],
    ['a page with exactly 3 books', (c) => { const g = page(c); while (g.books.length > 3) dropFromLive(c, g.books.pop()); }],
    ['a level with 2 books and no page', (c) => { const g = page(c); while (g.books.length > 2) dropFromLive(c, g.books.pop()); g.hasPage = false; }],
  ];
  let bad = 0;
  for (const [rule, name, mut] of cases) {
    const got = run(mut);
    const ok = got.some((x) => x.rule === rule);
    if (!ok) bad++;
    console.log(`${ok ? 'caught ' : 'MISSED '} ${rule}  ${name}${ok ? '' : `   (got: ${got.map((x) => x.rule).join(',') || 'nothing'})`}`);
  }
  for (const [name, mut] of controls) {
    const got = run(mut);
    if (got.length) bad++;
    console.log(`${got.length ? 'WRONGLY FAILED' : 'passes '} control: ${name}${got.length ? `   (${got.map((x) => `${x.rule} ${x.msg}`).join(' | ')})` : ''}`);
  }
  // R1 on synthetic pages: a correct page passes; each fault is caught
  const g = page(base) ? pageExpectation(base.hubs, `readers/${page(base).slug}`) : pageExpectation(base.hubs, 'readers');
  const url = `${HOST}${g.path}`;
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const good = [
    `<html><head><title>${esc(g.metaTitle)}</title><meta name="description" content="${esc(g.metaDescription)}"/>`,
    `<meta name="robots" content="index, follow, max-image-preview:large"/><link rel="canonical" href="${url}"/>`,
    `<link rel="alternate" hrefLang="en" href="${url}"/><link rel="alternate" hrefLang="x-default" href="${url}"/></head><body><main class="un"><h1>T</h1>`,
    ...g.books.flatMap((b) => [b.pages.book, b.pages.color, b.pages.talk]).filter(Boolean).map((s) => `<a href="/en/decks/${s}/">x</a>`),
    `<script type="application/ld+json">${JSON.stringify({ '@type': 'CollectionPage', mainEntity: { numberOfItems: g.books.length } })}</script>`,
    `<script type="application/ld+json">${JSON.stringify({ '@type': 'BreadcrumbList' })}</script></main></body></html>`,
  ].join('');
  const htmlCases = [
    ['a missing book link', good.replace(`<a href="/en/decks/${g.books[0].pages.book}/">x</a>`, '')],
    ['a link to a page that is not its book', good.replace('<h1>T</h1>', '<h1>T</h1><a href="/en/decks/readers-k628-other/">x</a>')],
    ['noindex', good.replace('index, follow', 'noindex, follow')],
    ['a wrong canonical', good.replace(`canonical" href="${url}"`, `canonical" href="${url}/"`)],
    ['a German alternate', good.replace('</head>', `<link rel="alternate" hrefLang="de" href="${HOST}/de/readers"/></head>`)],
    ['two h1', good.replace('<h1>T</h1>', '<h1>T</h1><h1>U</h1>')],
    ['no BreadcrumbList', good.replace('"BreadcrumbList"', '"Thing"')],
    ['another title', good.replace(`<title>${esc(g.metaTitle)}`, '<title>Readers')],
    ['"free" on the page', good.replace('<h1>T</h1>', '<h1>T</h1><p>Free books</p>')],
  ];
  const goodGot = checkRendered(good, g);
  if (goodGot.length) bad++;
  console.log(`${goodGot.length ? 'WRONGLY FAILED' : 'passes '} control: a correct rendered page${goodGot.length ? `   (${goodGot.map((x) => x.msg).join(' | ')})` : ''}`);
  for (const [name, html] of htmlCases) {
    const ok = checkRendered(html, g).length > 0;
    if (!ok) bad++;
    console.log(`${ok ? 'caught ' : 'MISSED '} R1  ${name}`);
  }
  const total = cases.length + controls.length + 1 + htmlCases.length;
  console.log(`\n[gate-hubs --poison] ${total - bad}/${total} as expected`);
  return bad;
}

async function main() {
  const args = process.argv.slice(2);
  const opt = (k) => { const a = args.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : null; };
  const hubsFile = opt('hubs') || path.join(FRONT, 'content/readers/hubs.en.json');
  const uiFile = opt('ui') || path.join(FRONT, 'content/readers/ui.en.json');
  const books = require('./books.en.js');
  let live;
  if (opt('live')) live = liveFromList(opt('live'));
  else if (opt('decks-root')) live = liveFromDecks(opt('decks-root'), books);
  else { console.error('usage: gate-hubs.js --live=<live.jsonl> | --decks-root=<dir> [--render=<base>] [--poison] [--hubs=<file>] [--ui=<file>]'); process.exit(2); }
  const base = { hubs: JSON.parse(fs.readFileSync(hubsFile, 'utf8')), ui: JSON.parse(fs.readFileSync(uiFile, 'utf8')), books, live, existing: existingMeta(), uiUse: usedUiKeys() };
  if (args.includes('--poison')) process.exit(poison(base) ? 1 : 0);
  const findings = check(base);
  if (opt('render')) findings.push(...await render(opt('render').replace(/\/+$/, ''), base.hubs));
  const groups = [...base.hubs.sets, ...base.hubs.levels];
  const pages = groups.filter((g) => g.hasPage).map((g) => g.slug);
  for (const x of findings) console.log(`FAIL ${x.rule}  ${x.msg}`);
  console.log(`[gate-hubs] ${groups.reduce((n, g) => n + g.books.length, 0)} books in ${groups.length} sets and levels; pages: readers${pages.length ? `, ${pages.join(', ')}` : ''}; live pages known: ${live.size}${opt('render') ? `; rendered from ${opt('render')}` : ''}`);
  console.log(findings.length ? `[gate-hubs] ${findings.length} finding(s)` : '[gate-hubs] clean');
  process.exit(findings.length ? 1 : 0);
}
main().catch((e) => { console.error(e); process.exit(2); });
