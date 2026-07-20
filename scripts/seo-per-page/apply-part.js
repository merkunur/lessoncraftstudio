#!/usr/bin/env node
/* Apply one part's authored copy. Fail-closed, data-only.
 *
 * Writes ONLY title / h1 / metaDescription / p1 / p2 / p3. Everything else on a
 * landing — slug, coordinate, carousel, standard, strand — is untouched, and the
 * caller proves it afterwards by parsed-object comparison against git HEAD.
 *
 * The fact-truth check is the important one
 * -----------------------------------------
 * The copy being replaced contains claims the worksheets do not support: a sheet
 * whose words are POMFRITTER, VANDMELON and GRILL described itself as hiding
 * "the names of the flags, stars and drums". Nobody noticed because no check
 * could see it. This one can: any word in the copy that is a known picture-noun
 * SOMEWHERE in this locale's decks must be a noun on THIS deck. Ordinary English
 * is unaffected — only borrowed concrete nouns trip it, which is exactly the
 * failure mode. A fabricated specific is worse than a template.
 *
 * Usage:
 *   node scripts/seo-per-page/apply-part.js --part=001 --in=<dir>          (dry run)
 *   node scripts/seo-per-page/apply-part.js --part=001 --in=<dir> --write
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const PARTS_DIR = path.join(ROOT, 'docs', 'seo-per-page', 'parts');
const FACTS_DIR = path.join(ROOT, 'docs', 'seo-per-page', 'deck-facts');
const LANDING_DIR = path.join(ROOT, 'frontend', 'content', 'seo-landing');

const WRITABLE = ['title', 'h1', 'metaDescription', 'p1', 'p2', 'p3'];
const META_MIN = 120;
const META_MAX = 170;
const PROSE_MIN_WORDS = 200;

const BANNED = [
  'fun and engaging', 'fun and interactive', 'perfect for', 'ideal for', 'great for',
  'dive into', 'dive in', 'great way to', 'wonderful way to', 'excellent way to',
  'something for everyone', 'look no further', 'in today’s classroom',
  "in today's classroom", 'unlock', 'unleash', 'supercharge', 'game-changer',
];

const norm = (s) => String(s || '').toLowerCase().replace(/[‘’']/g, '')
  .replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const toks = (s) => norm(s).split(' ').filter(Boolean);

function loadJSON(p, fb) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fb; }
}

/* Every picture-noun known anywhere in this locale, MINUS the ones that are just
 * ordinary English in this domain.
 *
 * The naive version flagged all 75 pages of part 001, because `circle` ("circle
 * it"), `picture` ("picture clues"), `letter` ("letter grid") and `reading` are
 * both everyday words AND picture-nouns in some deck. Frequency separates them
 * without a hand-written list: a word appearing in a large share of the locale's
 * prose is being used as ordinary vocabulary, whereas a word appearing on a few
 * pages is a specific claim about what is on the sheet. `running, jumping,
 * swimming` on a page whose words are VIOLIN and STRIKNING is exactly the latter.
 */
const ORDINARY_DF = 0.15;

function buildLocaleNounVocab(decks, landings) {
  const v = new Set();
  for (const d of decks) {
    for (const n of (d.nouns || [])) for (const w of toks(n)) if (w.length > 2) v.add(w);
  }
  const df = new Map();
  for (const l of landings) {
    const seen = new Set(toks([l.title, l.h1, l.metaDescription, l.p1, l.p2, l.p3].join(' ')));
    for (const w of seen) if (v.has(w)) df.set(w, (df.get(w) || 0) + 1);
  }
  const limit = Math.max(3, Math.floor(landings.length * ORDINARY_DF));
  for (const [w, n] of df) if (n > limit) v.delete(w);
  return v;
}

function pageNounSet(fact, coordinate) {
  const s = new Set();
  // the page's own theme is fair game: "around the house" may say house
  const c = coordinate || {};
  for (const w of toks(String(c.theme || '').replace(/[-_]/g, ' '))) s.add(w);
  if (!fact) return s;
  for (const n of (fact.nouns || [])) for (const w of toks(n)) s.add(w);
  for (const n of (fact.words || [])) for (const w of toks(n)) s.add(w);
  return s;
}

/* What is mechanically checkable, and what is not.
 *
 * My first two attempts hard-failed on any picture-noun that was not on the
 * sheet. Both over-fired badly: they flagged "chips" (the British gloss for
 * POMFRITTER, which IS on that sheet), "pencil", "page", "table", "morning".
 * That is ordinary English, and blocking it would punish exactly the concrete,
 * human writing this programme exists to produce. Loosening the threshold until
 * it passed would have been the real failure — a gauge moved to fit the answer.
 *
 * So the check now measures the part that IS unambiguous: the word list. The
 * authors present the target-language words in CAPITALS (POMFRITTER, KOELKAST,
 * VANDMELON), and those are direct claims about what is printed on the sheet.
 * Every capitalised token must be a real word from that deck — or a fragment of
 * one, since a good page may explain a morpheme inside a real word (BÆR inside
 * BLÅBÆR) or gloss a pronunciation (pom-FRIT-ter).
 *
 * Ordinary prose nouns are reported for my review and never block. Judging
 * whether "at the kitchen table" is a claim about the worksheet needs reading,
 * not regex, and I do that before the part ships.
 */
const CAPS_TOKEN = /\b[A-ZÆØÅÄÖÜÉÈ]{3,}\b/g;
/* Capitals that are not claims about the sheet. */
const CAPS_ALLOW = new Set(['PDF', 'ABC', 'ESL', 'EAL', 'KS1', 'KS2', 'USA', 'UK', 'TV', 'A4']);

/* Letter-count claims are checkable, so check them.
 *
 * A good page says useful things like "POLITIEAGENT is twelve letters long" —
 * and an author self-reported getting three of those wrong before fixing them.
 * A teacher can count; if the page says twelve and the word has fourteen, the
 * page is wrong in a way that is trivially visible. Only sentences naming
 * exactly one sheet-word are judged, so "SJAAL and SCHORT are five letters
 * apart" is never misread as a claim about either.
 */
const NUMBER_WORDS = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
  ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15,
  sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20,
};

const NUM_RE = '\\d{1,2}|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty';
/* The word must be ADJACENT to the claim.
 *
 * A looser "any number + letters in the same sentence" version produced three
 * false accusations out of six on real copy, all of them against good writing:
 *   "BI is two letters ... SOMMERFUGL is ten"  -> BI is under the 3-char capital
 *                                                 minimum, so `two` was pinned on
 *                                                 SOMMERFUGL
 *   "the one letter a child cannot skim past"  -> not a length claim at all
 *   "Two letters here belong to Danish"        -> special characters, not length
 * Requiring "<WORD> is N letters" (or "N letters long" straight after the word)
 * leaves only real length claims. Two of the six were real: BOTERBLOEM and
 * VERWARMING are 10, not eleven.
 */
const LEN_CLAIM = new RegExp(
  '([A-ZÆØÅÄÖÜÉÈ]{2,})\\s+(?:is|has|runs to|comes to|sits at|stands at)\\s+(?:just\\s+|only\\s+)?(' + NUM_RE + ')\\s+letters?'
  + '|([A-ZÆØÅÄÖÜÉÈ]{2,})[^.!?]{0,20}?\\bat\\s+(' + NUM_RE + ')\\s+letters?',
  'gi');

function letterCountLies(text, sheetWords) {
  const out = [];
  const seen = new Set();
  let m;
  LEN_CLAIM.lastIndex = 0;
  while ((m = LEN_CLAIM.exec(String(text))) !== null) {
    const word = (m[1] || m[3] || '').toUpperCase();
    const numRaw = (m[2] || m[4] || '').toLowerCase();
    if (!word || CAPS_ALLOW.has(word)) continue;
    if (!sheetWords.includes(word)) continue;      // only claims about real sheet words
    const claimed = /^\d+$/.test(numRaw) ? Number(numRaw) : NUMBER_WORDS[numRaw];
    if (!claimed || claimed < 2) continue;   // "one letter" is never a length claim
    // "LIMONADE is one letter AWAY from ours" / "two letters SHORTER" are
    // comparisons, not lengths. Judge only what follows the match.
    const after = String(text).slice(m.index + m[0].length, m.index + m[0].length + 24);
    if (/^\s*(?:away|apart|from|short|shorter|longer|off|different|difference|more|less|fewer)\b/i.test(after)) continue;
    const actual = [...word].length;
    const key = word + ':' + claimed;
    if (actual !== claimed && !seen.has(key)) {
      seen.add(key);
      out.push(`${word} is ${actual} letters, page says ${claimed}`);
    }
  }
  return out;
}

function run(partId, inDir, write) {
  const part = loadJSON(path.join(PARTS_DIR, `${partId}.json`));
  if (!part) throw new Error(`no part ${partId}`);
  const locale = part.locale;

  const landingFile = path.join(LANDING_DIR, `${locale}.json`);
  const data = loadJSON(landingFile);
  const landings = data.landings || [];
  const bySlug = new Map(landings.map((l) => [l.slug, l]));

  const deckRows = (loadJSON(path.join(FACTS_DIR, `${locale}.json`), { decks: [] }).decks) || [];
  const facts = new Map(deckRows.map((d) => [d.slug, d]));
  const localeNouns = buildLocaleNounVocab(deckRows, landings);

  // gather authored copy
  const authored = {};
  for (const f of fs.readdirSync(inDir)) {
    if (!f.startsWith(`part-${partId}-`) || !f.endsWith('.json')) continue;
    const obj = loadJSON(path.join(inDir, f));
    if (!obj) { throw new Error(`unparseable author output: ${f}`); }
    Object.assign(authored, obj);
  }

  const expect = new Set(part.pages.map((p) => p.slug));
  const problems = [];

  const missing = [...expect].filter((s) => !authored[s]);
  if (missing.length) problems.push(`${missing.length} page(s) not authored (e.g. ${missing[0]})`);
  const extra = Object.keys(authored).filter((s) => !expect.has(s));
  if (extra.length) problems.push(`${extra.length} unexpected slug(s) (e.g. ${extra[0]})`);

  const deckBySlug = new Map(part.pages.map((p) => [p.slug, p.deck]));
  const coordBySlug = new Map(part.pages.map((p) => [p.slug, { theme: p.theme, level: p.level, type: p.type, mode: p.mode }]));
  const seenTitle = new Map();
  const seenMeta = new Map();
  const seenPrefix = new Map();
  const borrowed = [];

  for (const slug of Object.keys(authored)) {
    if (!expect.has(slug)) continue;
    const a = authored[slug] || {};
    for (const f of WRITABLE) {
      if (!a[f] || !String(a[f]).trim()) problems.push(`${slug}: empty ${f}`);
    }
    if (!a.title) continue;

    const meta = String(a.metaDescription || '');
    if (meta.length < META_MIN || meta.length > META_MAX) {
      problems.push(`${slug}: meta ${meta.length} chars (need ${META_MIN}-${META_MAX})`);
    }

    const prose = [a.p1, a.p2, a.p3].join(' ');
    const words = toks(prose).length;
    if (words < PROSE_MIN_WORDS) problems.push(`${slug}: prose ${words} words (<${PROSE_MIN_WORDS})`);

    const blob = [a.title, a.h1, meta, prose].join(' ').toLowerCase();
    for (const b of BANNED) if (blob.includes(b)) problems.push(`${slug}: banned phrase "${b}"`);

    if (norm(a.title) === norm(a.h1)) problems.push(`${slug}: h1 merely restates title`);

    // uniqueness across the part
    const tk = norm(a.title);
    if (seenTitle.has(tk)) problems.push(`${slug}: duplicate title with ${seenTitle.get(tk)}`);
    else seenTitle.set(tk, slug);
    const mk = norm(meta);
    if (seenMeta.has(mk)) problems.push(`${slug}: duplicate meta with ${seenMeta.get(mk)}`);
    else seenMeta.set(mk, slug);
    const pk = String(a.title).slice(0, 50).toLowerCase();
    if (seenPrefix.has(pk)) problems.push(`${slug}: shares 50-char title prefix with ${seenPrefix.get(pk)}`);
    else seenPrefix.set(pk, slug);

    // FACT TRUTH (hard) — every capitalised word claimed to be on the sheet must
    // really be on it, or be a fragment of a word that is.
    const fact = facts.get(deckBySlug.get(slug));
    const sheetWords = ((fact && fact.words) || []).map((w) => String(w).toUpperCase());
    const raw = [a.title, a.h1, meta, prose].join(' ');
    const bogus = new Set();
    for (const cap of (raw.match(CAPS_TOKEN) || [])) {
      const c = cap.toUpperCase();
      if (CAPS_ALLOW.has(c)) continue;
      if (sheetWords.some((w) => w === c || w.includes(c) || c.includes(w))) continue;
      bogus.add(cap);
    }
    if (bogus.size) {
      problems.push(`${slug}: claims word(s) not on the sheet — ${[...bogus].slice(0, 5).join(', ')}`);
    }

    for (const lie of letterCountLies(raw, sheetWords)) {
      problems.push(`${slug}: ${lie}`);
    }

    // borrowed ordinary nouns (soft) — reported for reading, never blocking
    const own = pageNounSet(fact, coordBySlug.get(slug));
    const used = new Set();
    for (const w of toks(blob)) {
      if (!localeNouns.has(w)) continue;
      if (own.has(w)) continue;
      used.add(w);
    }
    if (used.size) borrowed.push({ slug, words: [...used], fail: false });
  }



  const report = { part: part.part, locale, pages: expect.size, authored: Object.keys(authored).length, problems, borrowed };

  if (problems.length) return { ...report, written: 0 };
  if (!write) return { ...report, written: 0, dryRun: true };

  let changed = 0;
  for (const l of landings) {
    const a = authored[l.slug];
    if (!a) continue;
    for (const f of WRITABLE) {
      if (a[f] != null && l[f] !== a[f]) { l[f] = a[f]; changed++; }
    }
  }
  fs.writeFileSync(landingFile, JSON.stringify(data, null, 1));
  return { ...report, written: changed };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const partId = (args.find((a) => a.startsWith('--part=')) || '').split('=')[1] || '001';
  const inDir = (args.find((a) => a.startsWith('--in=')) || '').split('=')[1];
  const write = args.includes('--write');
  if (!inDir) { console.error('--in=<dir> required'); process.exit(2); }

  const r = run(partId, inDir, write);
  console.log(`[part ${partId} / ${r.locale}] ${r.authored}/${r.pages} pages authored`);
  if (r.borrowed && r.borrowed.length) {
    const hard = r.borrowed.filter((b) => b.fail);
    const soft = r.borrowed.filter((b) => !b.fail);
    if (hard.length) {
      console.log(`  FABRICATED objects on ${hard.length} page(s):`);
      hard.slice(0, 8).forEach((b) => console.log(`    ${b.slug}: ${b.words.slice(0, 6).join(', ')}`));
    }
    if (soft.length) {
      console.log(`  review (1-2 borrowed nouns, often a homograph) on ${soft.length} page(s):`);
      soft.slice(0, 6).forEach((b) => console.log(`    ${b.slug}: ${b.words.join(', ')}`));
    }
  }
  if (r.problems.length) {
    console.log(`  REFUSING TO WRITE — ${r.problems.length} problem(s):`);
    r.problems.slice(0, 15).forEach((p) => console.log('    - ' + p));
    process.exitCode = 1;
  } else if (r.dryRun) {
    console.log('  PASS (dry run — pass --write to apply)');
  } else {
    console.log(`  WROTE ${r.written} field values — only title/h1/meta/p1..p3 touched.`);
  }
}

module.exports = { run };
