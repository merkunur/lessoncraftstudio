/**
 * grammar-g1.js — four Grade 1 grammar pages of the unit "Words in Sentences: Grammar" (English literacy year, Daily
 * Teaching System Part 12.3, 2026-11-17; a US Grade 1 teacher's review applied the same day). The sentences, pairs and
 * verbs are data/literacy/grammar-g1.en.json. The pages are led by PRINTED SENTENCES a first grader reads (6-7 years
 * old); the joining-word page shows a picture beside a sentence where the library has one that a child names with the
 * word of that sentence.
 *
 *   capwrite   Names, Days, and Months Get Capitals (L.1.2.a)                                          G1-592
 *              sentences printed with the names, days and months in small letters (every other word as it is written;
 *              no two of them side by side; EVERY name, day and month of a sentence is one of them and none stands first,
 *              or a child would circle one already written right that no key lists: "Summer starts in June.", not "Leo's
 *              birthday is in June."); the child circles each one and writes each one again with its capital
 *              on the 89 px row under the sentence (the key of two: "any order, with or without and"); the last card:
 *              the child writes today's date and his or her first and last name, each label ABOVE a row the width of
 *              the page (level 3: and "My birthday is in")
 *              level 1  three sentences, names of people and pets only (three words to capitalize or more)
 *              level 2  three sentences, names and the days of the week (two or more with a day; a name and a day, four
 *                       words to capitalize or more)
 *              level 3  two sentences, one or more with a month (a name, a day and a month, three words or more), and
 *                       the birthday sentence
 *              copy v takes its lead sentences from a window of a fixed order of the level's sentences, so copies step
 *              through the bank
 *   capchoose  Capital Letter or Small Letter? (L.1.2.a, the first page of the lesson)                     G1-593
 *              sentences with ONE word printed two ways, with a capital and with a small first letter; the child
 *              circles the right one. Three to five are names (days, months), the rest words that name no one (dog,
 *              mom, park, day, week, month, summer) and stay small; the word of a row is the sentence's only name, day
 *              or month ("My favorite day is [Saturday]."), never its first word; no other word of the page is it; a
 *              period after the two ways stands tight against the last chip
 *              level 1  eight sentences, names against other words; no day or month on the page
 *              level 2  eight sentences, names and days against other words (day and week among them); no month
 *              level 3  eight sentences, names, days and months against other words (month, birthday, the seasons)
 *   join       Joining Words: and, but, so, because (L.1.1.g)                                                G1-594
 *              a box says what each joining word does (and adds one more thing; but tells something you did not
 *              expect; so tells what happened because of it; because tells why); each sentence is two short sentences
 *              joined, with the joining words of the level printed in the gap: the child circles the one that fits
 *              best; each sentence draws its joining word by itself (no three alike in a row); "and" is the answer only
 *              where the second sentence adds one more thing of the same kind, a "so" pair is a state or the weather
 *              that causes an action (every pair of the bank records why each other word does not fit best); the key of
 *              the written join is a sample and names the other right forms (the shorter and-sentence; "and" also makes
 *              a sentence of a so-pair; a comma before but or so); a picture has a KIND in the bank (pictures a child
 *              names with one word: a straw hat and a knit hat are a hat) and no page holds two of one kind; on levels 1
 *              and 2 the draw prefers pairs about different things word-wise (not two hat sentences)
 *              level 1  and, but: five sentences with a picture each (each word twice or more), then two sentences to
 *                       join and write as one on two 89 px rows
 *              level 2  and, but, so: five sentences with a picture each (each word once or twice), then two sentences
 *                       to join and write as one
 *              level 3  and, but, so, because: five sentences without pictures (so and because each at least once, three
 *                       words or more), then a sentence of the child's own with because on two rows
 *   tense      Yesterday, Today, and Tomorrow (L.1.1.e)                                                       G1-595
 *              a table of regular verbs (past = verb + ed, no spelling change) under "Yesterday I", "Today I",
 *              "Tomorrow I" (walked, walk, will walk); one form of each row is missing and the child writes it on an
 *              89 px row (a yesterday or tomorrow form only for a verb of four letters or fewer: it must fit the cell);
 *              then sentences with a time word (yesterday, last night, last week; tomorrow, tomorrow night) and the three
 *              forms of a verb in the gap: the child circles the one the time word asks for
 *              level 1  a worked row in grey and three verbs: the child writes the yesterday form; four sentences, the
 *                       time word first
 *              level 2  four verbs, the missing form in any column; four sentences, the time word first or last
 *              level 3  three verbs, the missing form in any column, in cells of 98 px (the room the page would leave
 *                       blank); the child chooses one of three verbs and writes about it three times, after
 *                       "Yesterday I", "Today I" and "Tomorrow I" (the key: "Today I am ...ing" is right too, said
 *                       between the rows, so the key stands like the page)
 *              walk, the verb of the page instruction, is not in the bank
 *
 * Every choice's right place is mixed (never three in a row in one place, never a staircase, never every other one);
 * the kinds of answer are mixed the same way. No word that answers an item stands elsewhere on its page. No page leaves
 * a blank band of more than 40 px above, between or under its tasks. Handwriting
 * rows are 89 px (half an inch from the top rule to the baseline). The page turns the font's joined letters off and gives
 * every f before i, f or l a little room (fi, fl, ff). English only. Themeless: a copy draws other sentences. PDF only
 * (the answer key is for checks and review). The bank is checked when this file loads (grammarFaultsOf); no picture is
 * looked up at load.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/grammar-g1.en.json');
const { _parts } = require('./info-text.js');
const { makeRng } = require('../../lib/rng.js');
const { W, esc, shuffle, line, rowSvg } = _parts;
const gcd = (a, b) => (b ? gcd(b, a % b) : a);

const ROW = 89;                                   // every handwriting row (half an inch from the top rule to the baseline)
const JOIN_WORDS = ['and', 'but', 'so', 'because'];
/** what each joining word does (the legend of the page, as the Grade 1 teacher's review ruled it) */
const LEGEND = { and: 'adds one more thing', but: 'tells something you did not expect', so: 'tells what happened because of it', because: 'tells why' };
const JOIN_TASK = 'Read each sentence. Circle the joining word that fits best.';
const HOLIDAYS = /^(christmas|halloween|thanksgiving|easter|hanukkah|kwanzaa|diwali|valentine|ramadan|passover)/i;
const KIN = /^(mom|dad|grandma|grandpa|mommy|daddy)('s)?$/i;            // a name when it stands alone: always "my mom"
const OWNERS = new Set(['my', 'our', 'your', 'his', 'her', 'their']);
/** the advance widths (em) of the page's Nunito at weight 700 with its joined letters off (measured 2026-11-17 for the
 *  Kindergarten sentences page, sentences-k.js); a letter not measured counts wide */
const NUNITO700 = { a: 0.547, b: 0.6, c: 0.4625, d: 0.6, e: 0.542, f: 0.3422, g: 0.604, h: 0.585, i: 0.255, j: 0.259, k: 0.536, l: 0.319, m: 0.877,
  n: 0.585, o: 0.576, p: 0.6, q: 0.6, r: 0.392, s: 0.488, t: 0.3574, u: 0.579, v: 0.565, w: 0.891, x: 0.546, y: 0.564, z: 0.474, A: 0.744, B: 0.688,
  C: 0.6582, D: 0.762, E: 0.597, F: 0.562, G: 0.736, H: 0.773, I: 0.282, J: 0.335, K: 0.665, L: 0.562, M: 0.868, N: 0.748, O: 0.785, P: 0.652,
  Q: 0.785, R: 0.686, S: 0.631, T: 0.6334, U: 0.738, V: 0.713, W: 1.113, X: 0.672, Y: 0.6228, Z: 0.605, ' ': 0.271, '.': 0.27, '?': 0.47, "'": 0.22, ',': 0.27, ':': 0.27 };
const emOf = (t) => [...String(t)].reduce((a, c) => a + (NUNITO700[c] || (/[0-9]/.test(c) ? 0.56 : 0.9)), 0);
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
/** A child reads typographic apostrophes and quotation marks: every straight ' and " in the TEXT of a page or a key
 *  (never in a tag or an attribute) is turned here, once, for all types of this factory (2026-11-17: published pages
 *  printed straight ones). The bank and the data attributes keep straight ones; verify() straightens what it reads. */
function typo(html) {
  let out = '', i = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); out += html.slice(i, j + 1); i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += text.replace(/'/g, '\u2019').replace(/"/g, (m, k, s) => (k === 0 || /[\s([]/.test(s[k - 1]) ? '\u201C' : '\u201D'));
    i = j < 0 ? html.length : j;
  }
  return out;
}
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';   // before the root: verify counts the root's children as blocks

/** In this font an f before i, f, or l touches the next letter even with ligatures off (the i of "fish" loses its dot):
 *  every printed f before i, f, or l gets a little room of its own. Text inside tags, <svg> and <style> is left alone. */
function fRoom(html) {
  let out = '', i = 0, inSvg = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); const tag = html.slice(i, j + 1); if (/^<svg\b/i.test(tag)) inSvg++; else if (/^<\/svg>/i.test(tag)) inSvg--; out += tag; i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += inSvg ? text : text.replace(/f(?=[ifl])/g, '<span data-lcs-fsep style="margin-right:0.07em">f</span>');
    i = j < 0 ? html.length : j;
  }
  return out;
}

// ------------------------------------------------------------------------------------------------- reading the bank
const CB = BANK.capitals || {};
const DAYS = CB.days || [], MONTHS = CB.months || [], NAMES = [...(CB.people || []), ...(CB.pets || [])];
const kindOf = (w) => (DAYS.includes(w) ? 'day' : MONTHS.includes(w) ? 'month' : NAMES.includes(w) ? 'name' : null);
/** the kind of a word whatever its first letter (sunday is a day printed small) */
const lowKind = (w) => kindOf(w[0].toUpperCase() + w.slice(1).toLowerCase());
const LEVEL_OF_KIND = { name: 1, day: 2, month: 3 };
/** a sentence of G1-592: "My dog {Rex} can catch a ball." -> [{ w, target, tail }] (null when a token is malformed) */
function parseWrite(s) {
  const out = [];
  for (const t of String(s).split(' ')) {
    const m = /^(\{?)([^{}\[\]']+?)(\}?)((?:'s)?[.?!]?)$/.exec(t);   // a name may own something: {Leo}'s
    if (!m || (m[1] === '{') !== (m[3] === '}')) return null;
    out.push({ w: m[2], target: m[1] === '{', tail: m[4] });
  }
  return out;
}
/** a sentence of G1-593: "My [dog] can run fast." -> [{ w, choice, tail }] */
function parseChoose(s) {
  const out = [];
  for (const t of String(s).split(' ')) {
    const m = /^(\[?)([^{}\[\]']+?)(\]?)((?:'s)?[.?!]?)$/.exec(t);
    if (!m || (m[1] === '[') !== (m[3] === ']')) return null;
    out.push({ w: m[2], choice: m[1] === '[', tail: m[4] });
  }
  return out;
}
const plain = (toks) => toks.map((t) => t.w + t.tail).join(' ');
const toggleCase = (w) => (w[0] === w[0].toUpperCase() ? w[0].toLowerCase() : w[0].toUpperCase()) + w.slice(1);
/** the level of a word to choose: a name 1, a day 2, a month 3; a small word: day/week 2, month/birthday/seasons 3, others 1 */
const SMALL_LEVEL = { day: 2, week: 2, month: 3, birthday: 3, summer: 3, winter: 3, spring: 3, fall: 3 };
const chooseLevel = (toks) => {
  const c = toks.find((t) => t.choice);
  let lv = c ? (kindOf(c.w) ? LEVEL_OF_KIND[kindOf(c.w)] : (SMALL_LEVEL[c.w] || 1)) : 9;
  toks.forEach((t) => { if (!t.choice && kindOf(t.w)) lv = Math.max(lv, LEVEL_OF_KIND[kindOf(t.w)]); });
  return lv;
};
const writeLevel = (toks) => Math.max(...toks.filter((t) => t.target).map((t) => LEVEL_OF_KIND[kindOf(t.w)] || 9));
/** the words of a sentence, lower case, without their marks (for "no word that answers an item stands elsewhere") */
const wordsOf = (s) => String(s).toLowerCase().replace(/'s\b/g, '').replace(/[{}\[\].?!,]/g, '').split(' ').filter(Boolean);
const sameWord = (a, b) => a === b || a === b + 's' || b === a + 's';

// joining words
const JB = BANK.join || {};
const PAIRS = JB.pairs || [];
/** the kind of a picture: pictures a child names with one word share a kind (a straw hat and a knit hat are a hat) */
const PICKIND = BANK.picKinds || {};
const kindOfPic = (k) => PICKIND[k] || k;
/** the things a pair is about, word-wise: every picture kind or picture name its two sentences say (two "hat" pairs share
 *  hat), and the kind of its own picture */
const THING_WORDS = [...new Set([...Object.keys(BANK.pics || {}), ...Object.values(PICKIND)])];
const thingsOf = (p) => new Set([...(p.pic ? [kindOfPic(p.pic)] : []), ...THING_WORDS.filter((t) => wordsOf(p.a + ' ' + p.b).some((w) => sameWord(w, t))).map(kindOfPic)]);
const JOIN_NAMES = new Set([...NAMES, 'I']);
/** the second sentence as it stands after the joining word: its first letter small, unless it is I or a name */
const lowerB = (b) => { const first = b.split(' ')[0]; return JOIN_NAMES.has(first) ? b : b[0].toLowerCase() + b.slice(1); };
const aCore = (a) => a.replace(/\.$/, '');
const joined = (p, w) => `${aCore(p.a)} ${w} ${lowerB(p.b)}`;
/** what the key of a written join says besides its sample (the other right forms) */
const alsoRight = (p) => (p.rel === 'and' ? `(Sample. Also right: ${p.also})`
  : p.rel === 'so' ? '(Sample. so fits best; and also makes a sentence. A comma before so is also right.)'
    : `(Sample. A comma before ${p.rel} is also right.)`);

// verb tense
const TB = BANK.tense || {};
const VERBS = TB.verbs || [];
const pastOf = (b) => b + 'ed';
const MODEL_VERB = 'walk';                         // the verb the page instruction shows (yesterday I walked ...)
const formsOf = (b) => [pastOf(b), b, 'will ' + b];          // the three columns: yesterday, today, tomorrow
/** a verb whose past is the verb + ed with no spelling change: no final e, no consonant + y, no short-vowel doubling */
const regularPast = (b) => /^[a-z]{3,6}$/.test(b) && !/e$/.test(b) && !/[^aeiou]y$/.test(b) && !/(^|[^aeiou])[aeiou][^aeiouwxy]$/.test(b);
const tenseSentence = (v, kind, word, atEnd) => {
  const verb = kind === 'past' ? pastOf(v.base) : 'will ' + v.base;
  const body = v.frame.replace('{V}', verb);
  return atEnd ? body.replace(/\.$/, '') + ' ' + word.toLowerCase() + '.' : word + ' ' + (/^I /.test(body) ? body : body[0].toLowerCase() + body.slice(1));
};

// ------------------------------------------------------------------------------------------------- the bank's check
/** the room (px) of one printed line: a capwrite sentence (24 px, beside a badge), a choice row (26 px, with its second
 *  form), a join frame (21 px, with the level's joining words; with a picture on levels 1 and 2), a tense frame (21 px) */
const ROOM = { capwrite: W - 24 - 28 - 10, capchoose: W - 24 - 28 - 12, frame2: 2 * (W - 24 - 28 - 10 - 60 - 10) - 20, frame3: 2 * (W - 24 - 28 - 10) - 20 };
const pillPx = (w, px) => emOf(w) * px + 2 * 10 + 6 + 6;    // a joining word or a verb to circle: padding, border, gap

/** What must be true of the bank before any page prints it. Returns the list of faults (empty = sound). */
function grammarFaultsOf(b) {
  const f = [];
  const pics = b.pics || {};
  for (const [k, p] of Object.entries(pics)) if (!Array.isArray(p) || p.length !== 2 || !p.every((x) => typeof x === 'string' && x) || /bw( ?\d+)?$/i.test(p[0])) f.push('picture of ' + k + ': not a colour theme and a noun');
  // every picture has a kind; two pictures of one library noun (two hats) share it
  const pk = b.picKinds || {};
  for (const k of Object.keys(pics)) if (typeof pk[k] !== 'string' || !/^[a-z]+$/.test(pk[k])) f.push(`picture of ${k}: no kind`);
  for (const k of Object.keys(pk)) if (!pics[k]) f.push(`the kind of ${k}: no such picture`);
  for (const [k, p] of Object.entries(pics)) for (const [k2, p2] of Object.entries(pics)) if (k < k2 && Array.isArray(p) && Array.isArray(p2) && p[1] === p2[1] && pk[k] !== pk[k2]) f.push(`pictures ${k} and ${k2} show one thing (${p[1]}) but are of two kinds`);
  // ---- capitals
  const c = b.capitals || {};
  const days = c.days || [], months = c.months || [], names = [...(c.people || []), ...(c.pets || [])];
  if (days.join() !== 'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday') f.push('capitals: the days of the week are not the seven days');
  if (months.join() !== 'January,February,March,April,May,June,July,August,September,October,November,December') f.push('capitals: the months are not the twelve months');
  if (names.length < 20 || new Set(names).size !== names.length) f.push('capitals: fewer than twenty different names');
  const commonWords = new Set([...(c.write || []), ...(c.choose || [])].flatMap((s) => { const t = parseWrite(s) || parseChoose(s) || []; return t.filter((x) => !kindOf(x.w)).map((x) => x.w.toLowerCase()); }));
  for (const n of names) {
    if (!/^[A-Z][a-z]{1,5}$/.test(n)) f.push(`capitals: "${n}" is no short first name`);
    if ((c.notNames || []).includes(n.toLowerCase()) || commonWords.has(n.toLowerCase()) || days.includes(n) || months.includes(n)) f.push(`capitals: the name "${n}" is also a common word`);
  }
  if (!(c.notNames || []).includes('may') || !(c.notNames || []).includes('will')) f.push('capitals: no list of words a name may never be');
  const checkTokens = (s, toks, kind) => {
    if (!toks) { f.push(`${kind}: "${s}" has a broken word`); return false; }
    toks.forEach((t, k) => {
      if (HOLIDAYS.test(t.w)) f.push(`${kind}: "${s}" names a holiday (Grade 2)`);
      if (KIN.test(t.w) && (k === 0 || !OWNERS.has(toks[k - 1].w.toLowerCase()))) f.push(`${kind}: "${s}" uses ${t.w} as a name (it would need a capital)`);
      if (k < toks.length - 1 && /[.?!]/.test(t.tail)) f.push(`${kind}: "${s}" has a mark inside the sentence`);
    });
    if (!/^[.?]$/.test(toks[toks.length - 1].tail)) f.push(`${kind}: "${s}" does not end with a period or a question mark`);
    return true;
  };
  const wr = c.write || [];
  if (new Set(wr).size !== wr.length) f.push('capitals: a sentence to write stands twice');
  for (const s of wr) {
    const toks = parseWrite(s);
    if (!checkTokens(s, toks, 'capitals')) continue;
    const tg = toks.filter((t) => t.target);
    if (tg.length < 1 || tg.length > 2) f.push(`capitals: "${s}" has ${tg.length} words to capitalize (one or two)`);
    if (toks[0].target || !/^[A-Z]/.test(toks[0].w)) f.push(`capitals: "${s}" starts with a word to capitalize, or not with a capital`);
    if (toks.some((t, k) => k > 0 && t.target && toks[k - 1].target)) f.push(`capitals: "${s}" has two words to capitalize side by side`);
    tg.forEach((t) => { if (!kindOf(t.w)) f.push(`capitals: "${t.w}" in "${s}" is no name, day or month`); });
    toks.forEach((t, k) => { if (!t.target && k > 0 && t.w !== 'I' && /[A-Z]/.test(t.w)) f.push(`capitals: "${s}" has a capital that is no word to circle (${t.w})`); if (!t.target && lowKind(t.w)) f.push(`capitals: "${s}" prints a name, day or month that is no word to circle`); });   // every name, day and month is a word to fix, none first (the teacher's review: not "Leo's birthday ...")
    if (new Set(tg.map((t) => t.w)).size !== tg.length) f.push(`capitals: "${s}" names one word twice`);
    const printed = toks.map((t) => (t.target ? t.w.toLowerCase() : t.w) + t.tail).join(' ');
    if (emOf(printed) * 24 * 1.04 > ROOM.capwrite) f.push(`capitals: "${s}" does not fit one line (${Math.round(emOf(printed) * 24)} px of ${ROOM.capwrite})`);
  }
  const wpool = (lv) => wr.filter((s) => { const t = parseWrite(s); return t && writeLevel(t) === lv; });
  if (wpool(1).length < 14) f.push('capitals: fewer than fourteen sentences with names only');
  if (wpool(2).length < 12) f.push('capitals: fewer than twelve sentences with a day');
  if (wpool(3).length < 12) f.push('capitals: fewer than twelve sentences with a month');
  if (wpool(3).filter((s) => parseWrite(s).some((t) => t.target && kindOf(t.w) === 'day')).length < 2 || wpool(3).filter((s) => parseWrite(s).some((t) => t.target && kindOf(t.w) === 'name')).length < 3) f.push('capitals: too few month sentences that hold a day or a name too');
  const ch = c.choose || [];
  if (new Set(ch).size !== ch.length) f.push('capitals: a sentence to choose in stands twice');
  for (const s of ch) {
    const toks = parseChoose(s);
    if (!checkTokens(s, toks, 'choose')) continue;
    const cs = toks.filter((t) => t.choice);
    if (cs.length !== 1) { f.push(`choose: "${s}" has ${cs.length} words to choose (one)`); continue; }
    if (toks[0].choice) f.push(`choose: "${s}" asks for its first word (a first word always takes a capital)`);
    const cw = cs[0].w;
    if (kindOf(cw) ? cw[0] !== cw[0].toUpperCase() : cw !== cw.toLowerCase() || !/^[a-z]+$/.test(cw)) f.push(`choose: "${cw}" in "${s}" is written the wrong way in the bank`);
    if (cw.length < 3) f.push(`choose: "${cw}" is too short to tell its two forms apart`);
    toks.forEach((t, k) => { if (!t.choice && k > 0 && t.w !== 'I' && !kindOf(t.w) && /[A-Z]/.test(t.w)) f.push(`choose: "${s}" has a capital that is no name (${t.w})`); if (!t.choice && lowKind(t.w)) f.push(`choose: "${s}" names a name, day or month that is not its word to choose`); });   // every name, day and month of a sentence is its word to choose (not "My favorite day is Saturday.")
    if (wordsOf(s).filter((w) => sameWord(w, cw.toLowerCase())).length !== 1) f.push(`choose: "${s}" names its word to choose twice`);
    const two = plain(toks) + ' ' + toggleCase(cw);
    if (emOf(two) * 26 * 1.04 + 2 * 32 > 2 * ROOM.capchoose) f.push(`choose: "${s}" does not fit two lines with both forms`);
  }
  const cpool = (lv, cap) => ch.filter((s) => { const t = parseChoose(s); const x = t && t.find((y) => y.choice); return x && chooseLevel(t) === lv && !!kindOf(x.w) === cap; });
  if (cpool(1, true).length < 10 || cpool(1, false).length < 10) f.push('choose: fewer than ten names and ten other words for level 1');
  if (cpool(2, true).length < 7 || cpool(2, false).length < 5) f.push('choose: fewer than seven days and five words like day and week');
  if (cpool(3, true).length < 10 || cpool(3, false).length < 5) f.push('choose: fewer than ten months and five words like month and summer');
  // ---- joining words
  const j = b.join || {}, pairs = j.pairs || [];
  const topics = new Set();
  for (const p of pairs) {
    const tag = `join: "${p.a} ${p.b}"`;
    if (!JOIN_WORDS.includes(p.rel)) f.push(`${tag}: no joining word`);
    if (!/^[A-Z][^.?!]*\.$/.test(p.a || '') || !/^[A-Z][^.?!]*\.$/.test(p.b || '')) f.push(`${tag}: not two short sentences that end with a period`);
    if (topics.has(p.topic) || !p.topic) f.push(`${tag}: no topic of its own`); topics.add(p.topic);
    if (p.pic != null && !pics[p.pic]) f.push(`${tag}: no picture ${p.pic}`);
    // one right answer: every OTHER joining word is tested and has its reason not to fit
    const why = p.why || {};
    if (Object.keys(why).sort().join() !== JOIN_WORDS.filter((w) => w !== p.rel).sort().join() || Object.values(why).some((x) => typeof x !== 'string' || x.length < 12)) f.push(`${tag}: not every other joining word is tested with a reason it does not fit`);
    if (JOIN_WORDS.some((w) => new RegExp('(^| )' + w + '( |\\.|$)', 'i').test(p.a + ' ' + p.b))) f.push(`${tag}: holds a joining word itself`);
    // a capital inside a pair is a name or I (the second sentence's first word keeps its capital only if it is one)
    if ([p.a || '', p.b || ''].some((x) => x.split(' ').some((w, k) => k > 0 && /^[A-Z]/.test(w) && !JOIN_NAMES.has(w.replace(/('s)?[.]?$/, ''))))) f.push(`${tag}: a capital inside a sentence that is no name and no I`);    const rel = p.rel;
    // the gap holds the level's joining words: the sentence must fit two lines (with a picture where it may stand)
    const lv = p.pic ? [1, 2, 3] : [3];
    for (const L of lv) {
      const words = JOIN_WORDS.slice(0, L + 1), text = aCore(p.a) + ' ' + lowerB(p.b);
      const px = emOf(text) * 21 * 1.04 + words.reduce((a, w) => a + pillPx(w, 21), 0);
      if (L < 3 && !words.includes(rel)) continue;
      if (px > (L < 3 ? ROOM.frame2 : ROOM.frame3)) f.push(`${tag}: does not fit two lines with the joining words of level ${L}`);
    }
    // the key of a written join names the other right form: an and-pair carries its shorter sentence (The bird can sing
    // and fly.), starting like its first sentence; no other pair carries one
    if (rel === 'and' ? !/^[A-Z][a-z' ]* and [a-z ]+\.$/.test(p.also || '') || p.also.split(' ')[0] !== p.a.split(' ')[0] || p.also.length >= joined(p, 'and').length : p.also != null) f.push(`${tag}: ${rel === 'and' ? 'no shorter joined sentence that starts like the pair' : 'a shorter joined sentence on a pair that is no and-pair'}`);
  }
  const by = (rel, withPic) => pairs.filter((p) => p.rel === rel && (!withPic || p.pic));
  if (by('and', true).length < 12 || by('but', true).length < 10 || by('so', true).length < 8 || by('because').length < 10) f.push('join: too few pairs (with a picture: and twelve, but ten, so eight; because ten)');
  const own = j.ownBecause || [];
  if (own.length < 3 || own.some((s) => !/^[A-Z][^.]* because [^.]*\.$/.test(s))) f.push('join: fewer than three sample sentences with because');
  // ---- verb tense
  const t = b.tense || {}, vs = t.verbs || [], tw = t.timeWords || {};
  if ((tw.past || []).join() !== 'Yesterday,Last night,Last week' || (tw.future || []).join() !== 'Tomorrow,Tomorrow night') f.push('tense: the time words are not yesterday, last night, last week, tomorrow and tomorrow night');
  if (vs.length < 20 || new Set(vs.map((v) => v.base)).size !== vs.length) f.push('tense: fewer than twenty different verbs');
  if (vs.some((v) => v.base === MODEL_VERB) || Object.keys(t.own || {}).includes(MODEL_VERB)) f.push(`tense: ${MODEL_VERB}, the verb of the page instruction, is in the bank (it would print an answer)`);
  if (vs.filter((v) => v.base.length <= 4).length < 14) f.push('tense: fewer than fourteen verbs of four letters or fewer (only their yesterday and tomorrow forms fit a cell to write in)');
  for (const v of vs) {
    const tag = `tense: "${v.base}"`;
    if (!regularPast(v.base)) f.push(`${tag}: its past is not the verb + ed with no spelling change`);
    if ((String(v.frame).match(/\{V\}/g) || []).length !== 1 || !/^(I|We|My dad and I) \{V\} [a-z ]+\.$|^(I|We|My dad and I) \{V\} [a-z ]+ [A-Z][a-z]+\.$/.test(v.frame || '')) f.push(`${tag}: its sentence is not "I/We {V} ..." with one place for the verb`);
    if (!(v.past || []).length || (v.past || []).some((x) => !(tw.past || []).includes(x)) || (v.future || []).some((x) => !(tw.future || []).includes(x))) f.push(`${tag}: no time word of the past, or a time word that is not on the list`);
    if ((v.future || []).length && !/^I \{V\}/.test(v.frame)) f.push(`${tag}: a sentence about tomorrow without the subject I (a plan of a group can take the plain form)`);
    for (const w of [...(v.past || []), ...(v.future || [])]) for (const atEnd of [false, true]) {
      const s = tenseSentence(v, (v.past || []).includes(w) ? 'past' : 'future', w, atEnd);
      const px = emOf(s.replace(/(will )?[a-z]+ed |will [a-z]+ /, '')) * 21 * 1.04 + formsOf(v.base).reduce((a, x) => a + pillPx(x, 21), 0);
      if (px > ROOM.frame3) f.push(`${tag}: "${s}" does not fit two lines with its three forms`);
    }
  }
  if (vs.filter((v) => (v.future || []).length).length < 12) f.push('tense: fewer than twelve verbs that can tell about tomorrow');
  for (const [k, obj] of Object.entries(t.own || {})) if (!vs.some((v) => v.base === k) || !/^[a-z ]+$/.test(obj)) f.push(`tense: the sample of "${k}" is not a verb of the list with a few words`);
  if (Object.keys(t.own || {}).length < 8) f.push('tense: fewer than eight verbs to write about on level 3');
  return f;
}
{ const f = grammarFaultsOf(BANK); if (f.length) throw new Error('grammar-g1.en.json: ' + f.join('; ')); }

// ------------------------------------------------------------------------------------------------- the levels
const LEVELS = {
  capwrite: { 1: { n: 3, kinds: ['name'], font: 24, pad: 8 }, 2: { n: 3, kinds: ['name', 'day'], font: 24, pad: 6 }, 3: { n: 2, kinds: ['name', 'day', 'month'], font: 24, pad: 8, birthday: true } },
  capchoose: { 1: { n: 8, kinds: ['name'], font: 28, pad: 17 }, 2: { n: 8, kinds: ['name', 'day'], font: 26, pad: 18 }, 3: { n: 8, kinds: ['name', 'day', 'month'], font: 26, pad: 18 } },
  join: { 1: { words: ['and', 'but'], n: 5, pic: 60, font: 21, write: true, pad: 4, wpad: 4 }, 2: { words: ['and', 'but', 'so'], n: 5, pic: 60, font: 21, write: true, pad: 4, wpad: 6 }, 3: { words: JOIN_WORDS, n: 5, pic: 0, font: 21, own: true, pad: 6, minH: 77 } },
  tense: { 1: { rows: 3, worked: true, gaps: [0], sents: 4, atEnd: false, font: 21 }, 2: { rows: 4, gaps: [0, 1, 2], sents: 4, atEnd: true, font: 21 }, 3: { rows: 3, gaps: [0, 1, 2], sents: 0, own: true, font: 21, cellH: 98 } },
};
const COLS = [210, 165, 260];                        // the table's columns (px; with two gaps of 8 the page width)
/** the font size of a key's answer seated on an 89 px row (lib/key-on-row.js: its x-height fills the row's band) */
const KEY_PX = (() => { const { rulesOf } = require('../../lib/key-on-row.js'); const m = require('../../primitives/font-metrics.json')['nunito-700']; const r = rulesOf(rowSvg(200, ROW)); return Math.round(((r.base - r.mid) / m.xHeight) * 2) / 2; })();
/** a form may be left to write in column c: a yesterday form of six letters or fewer, a tomorrow form of a verb of four
 *  letters or fewer (the teacher's review), and the key's answer fits the cell with 8 px on each side (washed, will wash
 *  do not: wash stands only in the sentences or as the today form to write) */
const fitsCell = (base, c) => (c === 1 || base.length <= 4) && emOf(formsOf(base)[c]) * KEY_PX <= COLS[c] - 16;

/** n places among k for the right answers: every place used where n allows, never three in a row, never a staircase
 *  of three (0 1 2, 2 1 0), never every other one (two places), never five alternating */
function mixedPlaces(n, k, rng) {
  for (let t = 0; t < 2000; t++) {
    const p = Array.from({ length: n }, () => rng.int(0, k - 1));
    if (!placesOk(p, k)) continue;
    return p;
  }
  throw new Error('grammar-g1: no mixed places');
}
function placesOk(p, k) {
  const n = p.length, s = p.join('');
  const need = n >= 6 ? Math.min(k, 3) : n >= 3 ? 2 : 1;
  if (new Set(p).size < need) return false;
  if (k === 2 && n >= 5 && [0, 1].some((x) => p.filter((y) => y === x).length < 2)) return false;
  if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return false;
  if (p.some((x, i) => i >= 2 && x - p[i - 1] === p[i - 1] - p[i - 2] && Math.abs(x - p[i - 1]) === 1)) return false;
  if (/01010|10101/.test(s) || (n >= 4 && /^(01)+0?$|^(10)+1?$/.test(s))) return false;
  return true;
}
/** a sequence of kinds (letters) with no three alike in a row and, with two kinds, not every other one */
function kindsOk(s) { return !/(.)\1\1/.test(s) && !(new Set(s).size === 2 && s.length >= 4 && /^(..)\1+.?$/.test(s) && s[0] !== s[1]); }

const badge = (n) => `<span data-lcs-badge style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:${T.teal};color:#FFFFFF;font:800 17px/1 'Nunito',sans-serif">${n}</span>`;
const cream = (attrs, inner, pad = 8, more = '') => `<div data-lcs-card ${attrs} style="display:flex;flex-direction:column;gap:6px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (html, px = 19) => `<div data-lcs-label data-lcs-read style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${T.ink}">${html}</div>`;
const num = (n) => `<span style="color:${T.teal}">${n}.</span> `;
const teal = (x) => `<b style="font-weight:800;color:${T.teal}">${x}</b>`;
const orList = (xs) => (xs.length === 2 ? `${teal(xs[0])} or ${teal(xs[1])}` : xs.slice(0, -1).map(teal).join(', ') + `, or ${teal(xs[xs.length - 1])}`);
const img = (k, size) => `<img class="ws-icon" data-lcs-pic="${esc(k)}" data-lcs-pickind="${esc(kindOfPic(k))}" src="${fileUri(BANK.pics[k][0], BANK.pics[k][1])}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain">`;
/** the y of a writing row's base rule (its lowest horizontal rule) */
const baseOf = (w, h) => Math.max(...[...rowSvg(w, h).matchAll(/<line\b[^>]*\by1="([\d.]+)"[^>]*\by2="([\d.]+)"/g)].filter((m) => m[1] === m[2]).map((m) => +m[1]));
/** printed words that stand on a writing row's base rule beside it (Nunito, line-height 1: the baseline is 0.171 em above the box's foot) */
const onRow = (text, px, attr) => `<span ${attr} data-lcs-read style="flex:0 0 auto;padding-bottom:${Math.max(0, Math.round(ROW - baseOf(300, ROW) - 0.171 * px))}px;font:800 ${px}px/1 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(text)}</span>`;
/** a sentence split for two rows: at the space nearest its middle */
function splitTwo(s) {
  const sp = [...s.matchAll(/ /g)].map((m) => m.index);
  const at = sp.reduce((best, i) => (Math.abs(i - s.length / 2) < Math.abs(best - s.length / 2) ? i : best), sp[0]);
  return [s.slice(0, at), s.slice(at + 1)];
}

function makeGrammarG1Type({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('grammar-g1: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'G1', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the sentences are English (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const inner = W - 24;
      const blocks = [], items = [];
      const VARY = key ? ` <span data-lcs-vary style="color:${T.coral}">(Answers vary.)</span>` : '';
      const ringOver = (on) => (on ? `<span data-lcs-ringmark style="position:absolute;left:-7px;right:-7px;top:-2px;bottom:-3px;border:3px solid ${T.teal};border-radius:50%"></span>` : '');
      const pill = (text, ok, px, attr) => `<span ${attr}${ok ? ' data-lcs-ok="1"' : ''} style="flex:0 0 auto;display:inline-block;white-space:nowrap;font:800 ${px}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:1px 10px;margin:0 1px;border:3px solid ${key && ok ? T.teal : T.creamDeep};border-radius:999px;background:#FFFFFF">${esc(text)}</span>`;

      if (mode === 'capwrite') {
        const CW = BANK.capitals.write.map((s) => ({ s, t: parseWrite(s) }));
        const tg = (x) => x.t.filter((y) => y.target);
        // level 1: three sentences with names; level 2: two with a day and one more; level 3: two with a month and one
        // more; the page holds four words to capitalize or more, each once, and (levels 2, 3) a name and a day
        const lead = CW.filter((x) => writeLevel(x.t) === lv), more = CW.filter((x) => writeLevel(x.t) <= lv);
        // the lead sentences of copy v are a window of a fixed order of the level's sentences: copy after copy steps
        // through the bank, so two copies never draw the same lead (a window that breaks a rule moves on by one)
        const order = makeRng(`grammar-g1|${id}|${lv}`).shuffle(lead), nLead = lv === 1 ? d.n : lv === 2 ? 2 : 1;
        let step = nLead; while (gcd(step, order.length) !== 1) step++;
        const at0 = (((Number(ctx.variant) || 1) - 1) * step) % order.length;
        let ss, ok = false;
        for (let k = 0; k < 3000 && !ok; k++) {
          const first = Array.from({ length: nLead }, (_, j) => order[(at0 + (Math.floor(k / 50) % order.length) + j) % order.length]);   // a lead gets 50 tries before the window moves on
          ss = shuffle([...first, ...shuffle(more.filter((x) => !first.includes(x)), rng).slice(0, d.n - first.length)], rng);
          const all = ss.flatMap(tg), kinds = all.map((y) => kindOf(y.w));
          const words = ss.flatMap((x) => wordsOf(x.s));
          // a word to capitalize stands once on the page (and no other word is it)
          if (new Set(all.map((y) => y.w.toLowerCase())).size !== all.length || words.filter((w) => all.some((y) => sameWord(y.w.toLowerCase(), w))).length !== all.length) continue;
          if (all.length < (lv === 2 ? 4 : 3)) continue;
          if (lv >= 2 && (!kinds.includes('name') || !kinds.includes('day'))) continue;
          ok = true;
        }
        if (!ok) throw new Error(`${id}: no page of sentences for level ${lv}`);
        const card = (x, i) => {
          const targets = tg(x).map((y) => y.w);
          const words = x.t.map((y) => (y.target ? `<span data-lcs-target="${esc(y.w)}" style="position:relative">${esc(y.w.toLowerCase())}${ringOver(key)}</span>` : `<span data-lcs-w>${esc(y.w)}</span>`) + (y.tail ? `<span data-lcs-tail>${y.tail}</span>` : '')).join(' ');
          return cream(`data-lcs-capcard="${i + 1}" data-lcs-text="${esc(plain(x.t))}" data-lcs-targets="${esc(targets.join('|'))}"`,
            `<div style="display:flex;align-items:center;gap:10px">${badge(i + 1)}<span data-lcs-print data-lcs-read style="white-space:nowrap;font:700 ${d.font}px/1.3 'Nunito',sans-serif;color:${T.ink}">${words}</span></div>` +
            `<div style="position:relative">${line({ w: inner, h: ROW, answer: key ? targets.join(', ') : null })}` +
            // the key of two words: they may be written in any order, with or without and
            (key && targets.length > 1 ? `<span data-lcs-anyorder style="position:absolute;right:8px;bottom:6px;font:700 15px/1.2 'Nunito',sans-serif;color:${T.coral}">(any order, with or without and)</span>` : '') + `</div>`, d.pad, 'gap:2px;');
        };
        const what = lv === 1 ? 'name' : lv === 2 ? 'name and each day' : 'name, each day, and each month';
        blocks.push(label(`${num(1)}Circle each ${what}. Write each one again with a capital letter.`));
        ss.forEach((x, i) => blocks.push(card(x, i)));
        // the child's own date and name (level 3: and the birthday)
        // the words of a row stand ABOVE it, and the row takes the width of the page (the teacher's review: a date or a
        // full name needs the whole row)
        const lineWith = (lead, kind, sample) => `<div data-lcs-ownrow="${kind}" style="display:flex;flex-direction:column;gap:0"><span data-lcs-lead data-lcs-read style="font:800 20px/1.15 'Nunito',sans-serif;color:${T.ink}">${esc(lead)}</span>${line({ w: inner, h: ROW, answer: key ? sample : null, sample: true })}</div>`;
        blocks.push(cream('data-lcs-own="1"', label(`${num(2)}${d.birthday ? 'Write the date and your first and last name. Finish the birthday sentence.' : 'Write today\'s date. Write your first and last name.'}` + VARY) +
          lineWith('Date:', 'date', 'September 23, 2026') + lineWith('Name:', 'name', 'Mia Lee') +
          (d.birthday ? lineWith('My birthday is in', 'birthday', 'June.') : ''), 4, 'gap:2px;'));
        items.push(...ss.map((x) => x.s));
      }

      if (mode === 'capchoose') {
        const CC = BANK.capitals.choose.map((s) => { const t = parseChoose(s); const c = t.find((y) => y.choice); return { s, t, w: c.w, cap: !!kindOf(c.w), kind: kindOf(c.w) || 'small', lv: chooseLevel(t) }; });   // the small word day is no day
        const pool = CC.filter((x) => x.lv <= lv);
        // the rows the level needs first (level 2: two days, a name, a small day or week; level 3: two months, a day, a
        // name, a small month, birthday or season word), the rest drawn from the level's sentences; three to five
        // capitals of eight (two to four of six); no row's word stands elsewhere on the page; the kinds mixed in order
        const need = lv === 1 ? [] : lv === 2 ? [(x) => x.kind === 'day', (x) => x.kind === 'day', (x) => x.kind === 'name', (x) => !x.cap && x.lv === 2]
          : [(x) => x.kind === 'month', (x) => x.kind === 'month', (x) => x.kind === 'day', (x) => x.kind === 'name', (x) => !x.cap && x.lv === 3];
        const capLo = d.n === 6 ? 2 : 3, capHi = d.n - capLo;
        const clash = (rs) => rs.some((x, i) => rs.some((y, j) => j !== i && wordsOf(y.s).some((w) => sameWord(w, x.w.toLowerCase()))));
        let rows, ok = false;
        for (let k = 0; k < 4000 && !ok; k++) {
          const got = [];
          for (const p of need) { const x = shuffle(pool.filter((y) => p(y) && !got.includes(y)), rng)[0]; if (x) got.push(x); }
          if (got.length !== need.length || clash(got)) continue;
          const capN = rng.int(Math.max(capLo, got.filter((x) => x.cap).length), capHi);
          const fill = shuffle(pool.filter((y) => !got.includes(y)), rng);
          for (const y of fill) { if (got.length === d.n) break; const caps = got.filter((x) => x.cap).length; if ((y.cap ? caps < capN : got.length - caps < d.n - capN) && !clash([...got, y])) got.push(y); }
          if (got.length !== d.n) continue;
          for (let t = 0; t < 200 && !ok; t++) { rows = shuffle(got, rng); ok = kindsOk(rows.map((x) => (x.cap ? 'c' : 's')).join('')); }
        }
        if (!ok) throw new Error(`${id}: no page of sentences for level ${lv}`);
        const at = mixedPlaces(d.n, 2, rng);
        const row = (x, i) => {
          const opts = [[x.w, true], [toggleCase(x.w), false]]; if (at[i]) opts.reverse();
          // a mark after the two ways stands inside their group, tight against the last chip and outside it
          const html = x.t.map((y) => (y.choice ? `<span data-lcs-opts style="display:inline-flex;align-items:baseline">${opts.map(([w, ok]) => pill(w, ok, d.font, `data-lcs-opt="${esc(w)}"`)).join(' ')}${y.tail ? `<span data-lcs-tail style="margin-left:-1px">${y.tail}</span>` : ''}</span>` : esc(y.w) + y.tail)).join(' ');
          return cream(`data-lcs-chrow="${i + 1}" data-lcs-text="${esc(plain(x.t))}" data-lcs-word="${esc(x.w)}" data-lcs-kind="${x.cap ? 'cap' : 'small'}"`,
            `<div style="display:flex;align-items:center;gap:12px">${badge(i + 1)}<span data-lcs-print data-lcs-read style="font:700 ${d.font}px/1.55 'Nunito',sans-serif;color:${T.ink}">${html}</span></div>`, d.pad);
        };
        blocks.push(label(`${num(1)}Read each sentence. Circle the word that is written the right way.`, 20));
        rows.forEach((x, i) => blocks.push(row(x, i)));
        items.push(...rows.map((x) => x.s));
      }

      if (mode === 'join') {
        const words = d.words;
        const pool = PAIRS.filter((p) => words.includes(p.rel) && (!d.pic || p.pic));
        // the joining word of each sentence, drawn by itself: no three alike in a row; level 1: each word twice or more,
        // never every other one; level 2: each word once or more, none four times; level 3: two words or more
        let rels;
        for (let k = 0; k < 2000; k++) {
          rels = Array.from({ length: d.n }, () => words[rng.int(0, words.length - 1)]);
          const s = rels.map((r) => JOIN_WORDS.indexOf(r)).join('');
          if (!kindsOk(s)) continue;
          if (lv === 1 && words.some((w) => rels.filter((r) => r === w).length < 2)) continue;
          if (lv === 2 && words.some((w) => rels.filter((r) => r === w).length < 1 || rels.filter((r) => r === w).length > 2)) continue;
          if (lv === 3 && (!rels.includes('so') || !rels.includes('because') || new Set(rels).size < 3 || words.some((w) => rels.filter((r) => r === w).length > 2))) continue;
          break;
        }
        // no page holds two pictures of one kind (a straw hat and a knit hat); on levels 1 and 2 the draw first looks for a
        // page whose pairs are about different things word-wise (not two hat sentences), and takes the first sound page
        // after 2000 tries without one
        let its, pair = null;
        for (let k = 0; k < 4000; k++) {
          const used = new Set(), pics = new Set(), things = new Set();
          const apart = lv < 3 && k < 2000;
          its = rels.map((r) => { const p = shuffle(pool.filter((x) => x.rel === r && !used.has(x.topic) && (!x.pic || !pics.has(kindOfPic(x.pic))) && (!apart || ![...thingsOf(x)].some((t) => things.has(t)))), rng)[0]; if (p) { used.add(p.topic); if (p.pic) pics.add(kindOfPic(p.pic)); thingsOf(p).forEach((t) => things.add(t)); } return p; });
          const wRel = words[rng.int(0, words.length - 1)];
          if (d.write) pair = shuffle(PAIRS.filter((x) => x.rel === wRel && !used.has(x.topic) && (!apart || ![...thingsOf(x)].some((t) => things.has(t)))), rng)[0];
          if (its.every(Boolean) && (pair || !d.write)) break;
        }
        const at = mixedPlaces(d.n, words.length, rng);
        const orders = its.map((p, i) => { const rest = shuffle(words.filter((w) => w !== p.rel), rng); rest.splice(at[i], 0, p.rel); return rest; });
        blocks.push(`<div data-lcs-card data-lcs-legend="${words.join(',')}" style="display:flex;flex-direction:column;gap:0;padding:4px 14px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">` +
          words.map((w) => `<div data-lcs-legrow data-lcs-read style="font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}"><span data-lcs-legword="${w}" style="font-weight:800;color:${T.teal}">${w}</span> ${LEGEND[w]}</div>`).join('') + `</div>`);
        const item = (p, i) => `<div data-lcs-card data-lcs-jitem="${i + 1}" data-lcs-topic="${esc(p.topic)}" style="box-sizing:border-box;display:flex;align-items:center;gap:10px;padding:${d.pad}px 12px;${d.minH ? `min-height:${d.minH}px;` : ''}border-radius:14px;background:${T.cream}">` +
          badge(i + 1) + (d.pic ? img(p.pic, d.pic) : '') +
          `<span data-lcs-frame data-lcs-read style="flex:1 1 auto;min-width:0;font:700 ${d.font}px/1.55 'Nunito',sans-serif;color:${T.ink}">${esc(aCore(p.a))} <span data-lcs-pills style="white-space:nowrap">${orders[i].map((w) => pill(w, w === p.rel, d.font, `data-lcs-pill="${w}"`)).join(' ')}</span> ${esc(lowerB(p.b))}</span></div>`;
        blocks.push(label(`${num(1)}${JOIN_TASK}`).replace('data-lcs-label', 'data-lcs-label data-lcs-jointask'));
        its.forEach((p, i) => blocks.push(item(p, i)));
        // levels 1 and 2: join two sentences and write them as one (without because, the order of the two stays and one
        // joining word fits); level 3: a sentence of the child's own with because (answers vary)
        if (d.write) {
          const [r1, r2] = splitTwo(joined(pair, pair.rel));
          // the key names the other right forms: the shorter sentence of an and-pair; "and" also makes a sentence of a
          // so-pair; a comma before but or so (the teacher's review)
          const also = alsoRight(pair);
          blocks.push(cream(`data-lcs-joinwrite="1" data-lcs-topic="${esc(pair.topic)}"`, label(`${num(2)}Join the two sentences with ${orList(words)}. Write one sentence.`) +
            (key ? `<div data-lcs-alsoright style="font:700 15px/1.2 'Nunito',sans-serif;color:${T.coral};padding-left:6px">${esc(also)}</div>` : '') +
            `<div data-lcs-pairtext data-lcs-read style="font:700 22px/1.3 'Nunito',sans-serif;color:${T.ink};padding-left:6px">${esc(pair.a)} ${esc(pair.b)}</div>` +
            `<div data-lcs-rows>${line({ w: inner, h: ROW, answer: key ? r1 : null })}${line({ w: inner, h: ROW, answer: key ? r2 : null })}</div>`, d.wpad, 'gap:2px;'));
          items.push('write:' + pair.topic);
        }
        if (d.own) {
          const own = JB.ownBecause[rng.int(0, JB.ownBecause.length - 1)];
          const [o1, o2] = splitTwo(own);
          blocks.push(cream('data-lcs-ownwrite="1"', label(`${num(2)}Write your own sentence with ${teal('because')}.` + VARY) +
            `<div data-lcs-rows>${line({ w: inner, h: ROW, answer: key ? o1 : null, sample: true })}${line({ w: inner, h: ROW, answer: key ? o2 : null, sample: true })}</div>`, 6, 'gap:2px;'));
        }
        items.unshift(...its.map((p) => p.topic));
      }

      if (mode === 'tense') {
        // the table's verbs, the sentences' verbs and the verbs to write about are all different (walk, the verb of the
        // page instruction, is not in the bank). A yesterday or tomorrow form is left to write only for a verb of four
        // letters or fewer (walked, will walk fit their cells; painted, will paint do not): paint, clean, brush, count
        // and plant stand only in the sentences or as the today form to write
        const vs = shuffle(VERBS, rng);
        let gaps;
        for (let k = 0; k < 2000; k++) {
          gaps = Array.from({ length: d.rows }, () => d.gaps[rng.int(0, d.gaps.length - 1)]);
          if (d.gaps.length === 1) break;
          if (new Set(gaps).size < (d.rows >= 4 ? 3 : 2) || gaps.some((x, i) => i >= 2 && x === gaps[i - 1] && x === gaps[i - 2]) || gaps.some((x, i) => i >= 2 && x - gaps[i - 1] === gaps[i - 1] - gaps[i - 2] && Math.abs(x - gaps[i - 1]) === 1)) continue;
          break;
        }
        const rows = [];
        if (d.worked) rows.push(vs[0]);
        gaps.forEach((g) => rows.push(vs.find((v) => !rows.includes(v) && fitsCell(v.base, g))));
        const rest = vs.filter((v) => !rows.includes(v));
        const heads = ['Yesterday I', 'Today I', 'Tomorrow I'];
        // a cell is as high as a writing row, or higher where the page has room (level 3: the room the page would leave
        // blank goes into the table); a row to write stands in the middle of its cell
        const cellH = d.cellH || ROW;
        const cell = (text, c, grey) => `<div data-lcs-tcell="${c}" style="box-sizing:border-box;width:${COLS[c]}px;height:${cellH}px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:#FFFFFF"><span data-lcs-form data-lcs-read style="font:800 24px/1 'Nunito',sans-serif;color:${grey ? T.inkSoft : T.ink}">${esc(text)}</span></div>`;
        const gapCell = (ans, c) => `<div data-lcs-tcell="${c}" data-lcs-tgap="${esc(ans)}" style="box-sizing:border-box;width:${COLS[c]}px;height:${cellH}px;display:flex;align-items:center;border-radius:8px;background:#FFFFFF">${line({ w: COLS[c], h: ROW, answer: key ? ans : null })}</div>`;
        const trow = (v, gap, worked) => `<div data-lcs-trow="${v.base}"${worked ? ' data-lcs-worked="1"' : ''} data-lcs-gapcol="${worked ? '' : gap}" style="display:flex;gap:8px">` +
          formsOf(v.base).map((f, c) => (!worked && c === gap ? gapCell(f, c) : cell(f, c, worked))).join('') + `</div>`;
        const tableRows = (d.worked ? [trow(rows[0], -1, true)] : []).concat(rows.slice(d.worked ? 1 : 0).map((v, i) => trow(v, gaps[i], false)));
        blocks.push(cream('data-lcs-ttable="1"', label(`${num(1)}${d.worked ? `Write the ${teal('yesterday')} form of each verb: add ${teal('ed')}. Read your new words to a partner.` : 'Write the missing verb in each row.'}`) +
          `<div style="display:flex;gap:8px">${heads.map((h, c) => `<div data-lcs-thead="${c}" style="box-sizing:border-box;width:${COLS[c]}px;background:${T.teal};color:#FFFFFF;border-radius:8px;text-align:center;font:800 21px/1.4 'Nunito',sans-serif">${h}</div>`).join('')}</div>` +
          `<div style="display:flex;flex-direction:column;gap:4px">${tableRows.join('')}</div>`, 8, 'gap:4px;'));
        items.push(...rows.map((v, i) => v.base + (d.worked && i === 0 ? ':worked' : ':' + gaps[i - (d.worked ? 1 : 0)])));
        if (d.sents) {
          // past or future drawn by itself for each sentence (both on a page, no three alike in a row); the time word first
          // (level 1) or first or last (level 2: both on a page)
          let ss;
          for (let k = 0; k < 3000; k++) {
            const pick = shuffle(rest, rng).slice(0, d.sents);
            ss = pick.map((v) => { const kind = v.future.length && rng.int(0, 1) ? 'future' : 'past'; const ws = kind === 'past' ? v.past : v.future; return { v, kind, word: ws[rng.int(0, ws.length - 1)], atEnd: d.atEnd ? !!rng.int(0, 1) : false }; });
            if (!ss.some((x) => x.kind === 'past') || !ss.some((x) => x.kind === 'future') || !kindsOk(ss.map((x) => x.kind[0]).join(''))) continue;
            if (d.atEnd && (!ss.some((x) => x.atEnd) || !ss.some((x) => !x.atEnd))) continue;
            break;
          }
          const at = mixedPlaces(d.sents, 3, rng);
          const sent = (x, i) => {
            const right = x.kind === 'past' ? pastOf(x.v.base) : 'will ' + x.v.base;
            const forms = shuffle(formsOf(x.v.base).filter((f) => f !== right), rng); forms.splice(at[i], 0, right);
            const full = tenseSentence(x.v, x.kind, x.word, x.atEnd), [pre, post] = full.split(right);
            return `<div data-lcs-card data-lcs-tsent="${i + 1}" data-lcs-verb="${x.v.base}" data-lcs-time="${x.kind}" data-lcs-tw="${esc(x.word)}" data-lcs-end="${x.atEnd ? 1 : 0}" data-lcs-text="${esc(full)}" style="display:flex;align-items:center;gap:10px;padding:5px 12px;border-radius:14px;background:${T.cream}">` +
              badge(i + 1) + `<span data-lcs-frame data-lcs-read style="flex:1 1 auto;min-width:0;font:700 ${d.font}px/1.6 'Nunito',sans-serif;color:${T.ink}">${esc(pre.trim())} <span data-lcs-pills style="white-space:nowrap">${forms.map((f) => pill(f, f === right, d.font, `data-lcs-pill="${esc(f)}"`)).join(' ')}</span> ${esc(post.trim())}</span></div>`;
          };
          blocks.push(label(`${num(2)}Read each sentence. Circle the verb that fits the time word.`));
          ss.forEach((x, i) => blocks.push(sent(x, i)));
          items.push(...ss.map((x) => x.v.base + ':' + x.kind));
        }
        if (d.own) {
          const offer = shuffle(rest.filter((v) => TB.own[v.base]), rng).slice(0, 3);
          const v0 = offer[0], obj = TB.own[v0.base];
          const lw = Math.ceil(emOf('Yesterday I') * 22 * 1.1);   // one column for the three time words: the rows end together
          // the key: "Today I am calling my friend." is right too (every verb of the list adds ing with no change), said in
          // the room between the today row and the next one, so the key and the child's page stand alike
          const note = key ? `<div data-lcs-todaynote style="position:absolute;left:${lw + 10}px;top:100%;margin-top:3px;white-space:nowrap;font:700 15px/1.2 'Nunito',sans-serif;color:${T.coral}">(Today I am ${v0.base}ing ${obj}. is also right.)</div>` : '';
          const ownRow = (lead, sample, c, after = '') => `<div data-lcs-ownrow="${c}" style="position:relative;display:flex;align-items:flex-end;gap:10px"><span style="flex:0 0 ${lw}px;display:flex">${onRow(lead, 22, 'data-lcs-lead')}</span><div style="flex:0 0 auto">${line({ w: inner - lw - 10, h: ROW, answer: key ? sample : null, sample: true })}</div>${after}</div>`;
          blocks.push(cream(`data-lcs-tenseown="${offer.map((v) => v.base).join(',')}"`, label(`${num(2)}Choose one verb: ${orList(offer.map((v) => v.base))}. Write about it.` + VARY) +
            ownRow('Yesterday I', `${pastOf(v0.base)} ${obj}.`, 0) + ownRow('Today I', `${v0.base} ${obj}.`, 1, note) +
            ownRow('Tomorrow I', `will ${v0.base} ${obj}.`, 2), 10, 'gap:22px;'));
          items.push('own:' + offer.map((v) => v.base).join(','));
        }
      }

      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-noliga="1" data-lcs-g1gram="${mode}|${lv}"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:4px;min-height:0">` + fRoom(typo(blocks.join(''))) + `</div>`,
        meta: { text: mode + ':' + items.slice(0, 3).join(','), items },
      };
    },

    async verify(page) {
      return page.evaluate((A) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-g1gram]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsG1gram.split('|'), lv = +lvS, d = A.LEVELS[mode][lv];
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const cs = (e) => getComputedStyle(e);
        const fs = (e) => parseFloat(cs(e).fontSize);
        const txt = (e) => e.textContent.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/\s+/g, ' ').trim();
        const rb = R(root);
        const kindOf = (w) => (A.DAYS.includes(w) ? 'day' : A.MONTHS.includes(w) ? 'month' : A.NAMES.includes(w) ? 'name' : null);
        const sameWord = (a, b) => a === b || a === b + 's' || b === a + 's';
        const wordsOf = (s) => String(s).toLowerCase().replace(/'s\b/g, '').replace(/[{}\[\].?!,]/g, '').split(' ').filter(Boolean);
        const placesOk = (p, k) => {
          const n = p.length, s = p.join(''), need = n >= 6 ? Math.min(k, 3) : n >= 3 ? 2 : 1;
          if (new Set(p).size < need) return false;
          if (k === 2 && n >= 5 && [0, 1].some((x) => p.filter((y) => y === x).length < 2)) return false;
          if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return false;
          if (p.some((x, i) => i >= 2 && x - p[i - 1] === p[i - 1] - p[i - 2] && Math.abs(x - p[i - 1]) === 1)) return false;
          if (/01010|10101/.test(s) || (n >= 4 && /^(01)+0?$|^(10)+1?$/.test(s))) return false;
          return true;
        };
        const kindsOk = (s) => !/(.)\1\1/.test(s) && !(new Set(s).size === 2 && s.length >= 4 && /^(..)\1+.?$/.test(s) && s[0] !== s[1]);
        // no joined letters: ligatures off on the page, and every f before i, f or l has room of its own
        if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
        if ([...root.querySelectorAll('*')].some((e) => !e.children.length && /f[ifl]/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, or ff joins its letters (ligatures on)');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('svg') && /f[ifl]/.test(n.textContent)) { fails.push('an f before i, f, or l has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('style') && /['"]/.test(n.textContent)) { fails.push('a straight apostrophe or quotation mark on the page: "' + n.textContent.trim().slice(0, 24) + '"'); break; } }
        // the sheet
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < 56) fails.push('a picture smaller than 56 px'); });
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        // no blank band of more than 40 px (80 px in the review's renders at twice the size) above the first task, between
        // two tasks, or under the last one: the room goes into the tasks (a fixed number here, not a build constant)
        if (blocks.length) {
          const bands = [R(blocks[0]).top - rb.top, ...blocks.slice(1).map((b, i) => R(b).top - R(blocks[i]).bottom), rb.bottom - R(blocks[blocks.length - 1]).bottom];
          const wide = Math.max(...bands);
          if (wide > 40) fails.push(`a blank band of ${Math.round(wide)} px on the page (40 or less)`);
        }
        root.querySelectorAll('[data-lcs-card]').forEach((c) => { const r = R(c); c.querySelectorAll('img, span, div, [data-lcs-line] svg').forEach((e) => { const q = R(e); if (q.width && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5)) fails.push('something leaves its card'); }); });
        const lines = [...document.querySelectorAll('[data-lcs-line]')];
        // Grade 1 ruling: half an inch from the top rule to the baseline (a fixed number here, not the build's constant)
        lines.forEach((l) => { const s = l.querySelector('svg'); if (!s || R(s).height < 88.5) fails.push('a writing row lower than 89 px'); });
        document.querySelectorAll('[data-lcs-read]').forEach((e) => { if (fs(e) < 19) fails.push('text a first grader reads is smaller than 19 px'); });
        document.querySelectorAll('[data-lcs-pill], [data-lcs-opt]').forEach((e) => { if (fs(e) < 20) fails.push('a word to circle is smaller than 20 px'); });
        // the key fills, the child's page does not
        const answered = lines.filter((l) => l.dataset.lcsAnswer);
        if (!isKey && answered.length) fails.push('a row is filled on the page of the child');
        if (!isKey && document.querySelector('[data-lcs-ringmark]')) fails.push('a ring on the page of the child');
        const ringedPills = [...document.querySelectorAll('[data-lcs-pill], [data-lcs-opt]')].filter((e) => cs(e).borderTopColor === 'rgb(20, 107, 94)');
        if (isKey ? ringedPills.some((e) => !e.dataset.lcsOk) : ringedPills.length) fails.push(`${ringedPills.length} words ringed (the key rings the right one of each row only)`);
        const vary = document.querySelectorAll('[data-lcs-vary]').length, wantVary = (mode === 'capwrite' ? 1 : (mode === 'join' || mode === 'tense') && d.own ? 1 : 0);
        if (isKey ? vary !== wantVary : vary) fails.push(`${vary} notes that answers vary`);
        // a word to circle: one right one per row, keyed, in a mixed place
        const pillRows = (sel, pillSel) => [...document.querySelectorAll(sel)].map((r) => [...r.querySelectorAll(pillSel)]);

        if (mode === 'capwrite') {
          const cards = [...document.querySelectorAll('[data-lcs-capcard]')];
          if (cards.length !== d.n) fails.push(`${cards.length} sentences, not ${d.n}`);
          const all = [], printedWords = [];
          cards.forEach((c, i) => {
            const s = c.dataset.lcsText, b = A.WRITE.find((x) => x.replace(/[{}]/g, '') === s);
            if (!b) { fails.push(`sentence ${i + 1} is no sentence of the bank: "${s}"`); return; }
            const targets = [...b.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
            all.push(...targets);
            const expect = b.replace(/\{([^}]+)\}/g, (m, w) => w.toLowerCase());
            const pr = c.querySelector('[data-lcs-print]');
            if (!pr || txt(pr) !== expect) fails.push(`sentence ${i + 1} prints "${pr && txt(pr)}", not "${expect}"`);
            if (pr && fs(pr) < 22) fails.push(`sentence ${i + 1} is printed smaller than 22 px`);
            if (pr && pr.getClientRects().length && Math.round(R(pr).height / (fs(pr) * 1.3)) > 1) fails.push(`sentence ${i + 1} takes more than one line`);
            printedWords.push(...wordsOf(expect));
            targets.forEach((t) => { if (!d.kinds.includes(kindOf(t))) fails.push(`sentence ${i + 1}: "${t}" is a ${kindOf(t)} on a level of ${d.kinds.join(' and ')}`); });
            const ts = [...c.querySelectorAll('[data-lcs-target]')];
            if (ts.map((e) => e.dataset.lcsTarget).join('|') !== targets.join('|') || ts.some((e) => txt(e) !== e.dataset.lcsTarget.toLowerCase())) fails.push(`sentence ${i + 1}: its words to capitalize are not marked, or printed with a capital`);
            if (isKey && (ts.some((e) => !e.querySelector('[data-lcs-ringmark]')) || c.querySelectorAll('[data-lcs-ringmark]').length !== ts.length)) fails.push(`the key of sentence ${i + 1} does not ring its words to capitalize, and only them`);
            if (isKey) c.querySelectorAll('[data-lcs-ringmark]').forEach((m) => { const r = R(m), l = R(m.parentElement); if (r.left > l.left || r.right < l.right || r.top > l.top + 4 || r.bottom < l.bottom - 6) fails.push('a ring of the key does not go round its word'); });
            const ls = c.querySelectorAll('[data-lcs-line]');
            if (ls.length !== 1 || R(ls[0].querySelector('svg')).width < R(c).width - 30) fails.push(`sentence ${i + 1} has no row the width of its card to write on`);
            else if (isKey && ls[0].dataset.lcsAnswer !== targets.join(', ')) fails.push(`the key of sentence ${i + 1} writes "${ls[0].dataset.lcsAnswer}", not its words with their capitals`);
            if (pr && ls[0] && R(pr).bottom > R(ls[0]).top + 2) fails.push(`sentence ${i + 1} does not stand above its row`);
            // two words to fix never stand side by side; the key of two says they may come in any order
            if (/\}( |'s )\{/.test(b)) fails.push(`sentence ${i + 1} has two words to capitalize side by side`);
            // every name, day and month of the sentence is a word to fix, printed small, and none stands first (the task
            // says to circle each one: one already written with its capital would be circled and is in no key)
            if (pr && pr.firstElementChild && pr.firstElementChild.matches('[data-lcs-target]')) fails.push(`sentence ${i + 1} starts with its word to fix`);
            if (pr && [...pr.querySelectorAll('[data-lcs-w]')].some((e) => { const w = txt(e).replace(/'s$/, ''); return kindOf(w[0].toUpperCase() + w.slice(1).toLowerCase()); })) fails.push(`sentence ${i + 1} prints a name, day or month that is no word to fix`);
            const ao = c.querySelectorAll('[data-lcs-anyorder]');
            if (isKey && targets.length > 1 ? ao.length !== 1 || txt(ao[0]) !== '(any order, with or without and)' : ao.length) fails.push(`sentence ${i + 1}: the note "(any order, with or without and)" ${isKey && targets.length > 1 ? 'is missing on the key' : 'stands where it does not belong'}`);
          });
          const kinds = all.map(kindOf);
          if (all.length < (lv === 2 ? 4 : 3)) fails.push(`${all.length} words to capitalize on the page (${lv === 2 ? 'four' : 'three'} or more)`);
          if (lv === 2 && (cards.filter((c) => [...c.querySelectorAll('[data-lcs-target]')].some((e) => kindOf(e.dataset.lcsTarget) === 'day')).length < 2 || !kinds.includes('name'))) fails.push('level 2: fewer than two sentences with a day, or no name');
          if (lv === 3 && (!kinds.includes('month') || !['name', 'day', 'month'].every((q) => kinds.includes(q)))) fails.push('level 3: no month, no name or no day');
          const item = blocks[0] && blocks[0].matches('[data-lcs-label]') ? txt(blocks[0]) : '';
          if (item !== `1. Circle each ${['name', 'name and each day', 'name, each day, and each month'][lv - 1]}. Write each one again with a capital letter.`) fails.push('the task line does not say to circle each word and write each one again: ' + item);
          all.forEach((t) => { if (printedWords.filter((w) => sameWord(w, t.toLowerCase())).length !== 1) fails.push(`"${t}" stands more than once on the page`); });
          const own = document.querySelector('[data-lcs-own]');
          const rows = own ? [...own.querySelectorAll('[data-lcs-ownrow]')] : [];
          if (rows.map((r) => r.dataset.lcsOwnrow).join() !== (d.birthday ? 'date,name,birthday' : 'date,name')) fails.push('the last card is not the date and the name' + (d.birthday ? ' and the birthday' : ''));
          // each row's words stand ABOVE it and the row takes the width of the card (a date or a full name needs it)
          rows.forEach((r) => { const l = r.querySelector('[data-lcs-line]'), lead = r.querySelector('[data-lcs-lead]'); if (!l || !lead || R(lead).bottom > R(l.querySelector('svg')).top + 1 || R(l.querySelector('svg')).width < R(own).width - 30) fails.push(`the ${r.dataset.lcsOwnrow} row does not stand under its words the width of the page`); if (isKey && l && !l.dataset.lcsKeySample) fails.push(`the key of the ${r.dataset.lcsOwnrow} row is no sample`); });
          if (d.birthday && rows[2] && txt(rows[2].querySelector('[data-lcs-lead]')) !== 'My birthday is in') fails.push('the birthday row does not start "My birthday is in"');
          if (own !== blocks[blocks.length - 1]) fails.push('the date and name are not at the foot of the page');
        }

        if (mode === 'capchoose') {
          const rows = [...document.querySelectorAll('[data-lcs-chrow]')];
          if (rows.length !== d.n) fails.push(`${rows.length} sentences, not ${d.n}`);
          const at = [], kinds = [], all = rows.map((r) => r.dataset.lcsText);
          rows.forEach((r, i) => {
            const s = r.dataset.lcsText, b = A.CHOOSE.find((x) => x.replace(/[\[\]]/g, '') === s);
            if (!b) { fails.push(`sentence ${i + 1} is no sentence of the bank`); return; }
            const w = /\[([^\]]+)\]/.exec(b)[1], cap = !!kindOf(w);
            const op = [...r.querySelectorAll('[data-lcs-opt]')], ok = op.filter((o) => o.dataset.lcsOk);
            const wrong = op.find((o) => !o.dataset.lcsOk);
            if (op.length !== 2 || ok.length !== 1 || !wrong || txt(ok[0]) !== w || txt(wrong) !== (w[0] === w[0].toUpperCase() ? w[0].toLowerCase() : w[0].toUpperCase()) + w.slice(1)) fails.push(`sentence ${i + 1}: not its word written the right way and the wrong way, the right one keyed`);
            if (r.dataset.lcsKind !== (cap ? 'cap' : 'small')) fails.push(`sentence ${i + 1} is keyed as the wrong kind`);
            at.push(op.findIndex((o) => o.dataset.lcsOk)); kinds.push(cap ? 'c' : 's');
            const pr = r.querySelector('[data-lcs-print]'), shown = pr && op.length ? txt(pr).replace(op.map(txt).join(' '), w) : '';
            if (shown !== s) fails.push(`sentence ${i + 1} prints "${shown}", not "${s}"`);
            if (pr && Math.round(R(pr).height / (fs(pr) * 1.55)) > 2) fails.push(`sentence ${i + 1} takes more than two lines`);
            // the word of a row stands nowhere else on the page
            if (all.some((y, j) => j !== i && wordsOf(y).some((x) => sameWord(x, w.toLowerCase())))) fails.push(`the word "${w}" of sentence ${i + 1} stands elsewhere on the page`);
            // a mark after the two ways: tight against the last chip (1.5 px or less) and outside it
            const tail = r.querySelector('[data-lcs-tail]'), last = op[op.length - 1];
            if (tail && last && (R(tail).left - R(last).right > 1.5 || R(tail).left < R(last).right - 0.5 || tail.previousElementSibling !== last)) fails.push(`sentence ${i + 1}: its end mark does not stand tight after the last chip`);
            if (/[.?]$/.test(s) && /\]$/.test(A.CHOOSE.find((x) => x.replace(/[\[\]]/g, '') === s).replace(/[.?]$/, '')) && !tail) fails.push(`sentence ${i + 1}: its end mark is not set against the chips`);
            // every name, day and month of the sentence is its word to choose, and that word never stands first
            if (wordsOf(s).some((x, k) => !(k === wordsOf(s).indexOf(w.toLowerCase())) && kindOf(x[0].toUpperCase() + x.slice(1)))) fails.push(`sentence ${i + 1} names a name, day or month that is not its word to choose`);
            if (wordsOf(s)[0] === w.toLowerCase()) fails.push(`sentence ${i + 1} asks for its first word`);
            if (lv < 3 && wordsOf(s).some((x) => A.MONTHS.map((m) => m.toLowerCase()).includes(x))) fails.push(`sentence ${i + 1} names a month on level ${lv}`);
            if (lv < 2 && wordsOf(s).some((x) => A.DAYS.map((m) => m.toLowerCase()).includes(x))) fails.push(`sentence ${i + 1} names a day on level 1`);
          });
          const capN = kinds.filter((k) => k === 'c').length, need = d.n === 6 ? 2 : 3;
          if (capN < need || d.n - capN < need) fails.push(`${capN} words with a capital and ${d.n - capN} small ones (${need} or more of each)`);
          if (!kindsOk(kinds.join(''))) fails.push('the capital and small answers stand in a pattern: ' + kinds.join(''));
          if (!placesOk(at, 2)) fails.push('the right way stands in a pattern of places: ' + at.join(''));
          const w = (k) => rows.filter((r) => { const b = A.CHOOSE.find((x) => x.replace(/[\[\]]/g, '') === r.dataset.lcsText); return b && k(/\[([^\]]+)\]/.exec(b)[1]); }).length;
          if (lv === 2 && (w((x) => kindOf(x) === 'day') < 2 || w((x) => ['day', 'week'].includes(x)) < 1)) fails.push('level 2: fewer than two days, or no "day" or "week" to keep small');
          if (lv === 3 && (w((x) => kindOf(x) === 'month') < 2 || w((x) => ['month', 'birthday', 'summer', 'winter', 'spring'].includes(x)) < 1)) fails.push('level 3: fewer than two months, or no month or season word to keep small');
        }

        if (mode === 'join') {
          // the legend and the task line, as the teacher ruled them: the check's OWN copy, never the factory's constants
          // (a check that reads the text it checks off the same constant cannot see that constant change)
          const SAYS = { and: 'adds one more thing', but: 'tells something you did not expect', so: 'tells what happened because of it', because: 'tells why' };
          const TASK = 'Read each sentence. Circle the joining word that fits best.';
          const leg = document.querySelector('[data-lcs-legend]');
          if (!leg || [...leg.querySelectorAll('[data-lcs-legword]')].map((e) => e.dataset.lcsLegword).join() !== d.words.join() || [...leg.querySelectorAll('[data-lcs-legrow]')].some((e) => txt(e) !== e.querySelector('[data-lcs-legword]').dataset.lcsLegword + ' ' + SAYS[e.querySelector('[data-lcs-legword]').dataset.lcsLegword])) fails.push('the legend does not say what each joining word of the level does');
          const task = document.querySelector('[data-lcs-jointask]');
          if (!task || txt(task) !== '1. ' + TASK) fails.push('the task line is not "' + TASK + '"');
          const its = [...document.querySelectorAll('[data-lcs-jitem]')];
          if (its.length !== d.n) fails.push(`${its.length} sentences, not ${d.n}`);
          const at = [], rels = [], topics = [], pics = [];
          its.forEach((it, i) => {
            const p = A.PAIRS[it.dataset.lcsTopic];
            if (!p) { fails.push(`sentence ${i + 1} is no pair of the bank`); return; }
            topics.push(it.dataset.lcsTopic); rels.push(p.rel);
            const ps = [...it.querySelectorAll('[data-lcs-pill]')], ok = ps.filter((e) => e.dataset.lcsOk);
            if (ps.map((e) => txt(e)).sort().join() !== d.words.slice().sort().join() || ok.length !== 1 || txt(ok[0]) !== p.rel) fails.push(`sentence ${i + 1}: not the joining words of the level with "${p.rel}" keyed`);
            at.push(ps.findIndex((e) => e.dataset.lcsOk));
            const fr = it.querySelector('[data-lcs-frame]'), want = `${p.a.replace(/\.$/, '')} ${ps.map((e) => txt(e)).join(' ')} ${p.bLower}`;
            if (!fr || txt(fr) !== want) fails.push(`sentence ${i + 1} prints "${fr && txt(fr)}", not "${want}"`);
            if (fr && Math.round(R(fr).height / (fs(fr) * 1.55)) > 2) fails.push(`sentence ${i + 1} takes more than two lines`);
            const im = it.querySelectorAll('img');
            if (d.pic ? im.length !== 1 || im[0].dataset.lcsPic !== p.pic : im.length) fails.push(`sentence ${i + 1}: ${d.pic ? 'not the picture of its first sentence' : 'a picture on level 3'}`);
            if (im[0]) pics.push(im[0].dataset.lcsPic);
          });
          // no two pictures of one kind (a straw hat and a knit hat are both a hat): the kind read from the bank, not from
          // the page
          const picKinds = pics.map((k) => A.PICKINDS[k]);
          if (picKinds.some((k) => !k) || new Set(picKinds).size !== picKinds.length) fails.push('two pictures of one kind on the page: ' + picKinds.join(', '));
          if (!placesOk(at, d.words.length)) fails.push('the right joining word stands in a pattern of places: ' + at.join(''));
          if (!kindsOk(rels.map((r) => A.JOIN_WORDS.indexOf(r)).join(''))) fails.push('the joining words follow a pattern: ' + rels.join(' '));
          if (lv === 1 && d.words.some((w) => rels.filter((r) => r === w).length < 2)) fails.push('level 1: not each joining word twice or more');
          if (lv === 2 && d.words.some((w) => rels.filter((r) => r === w).length < 1 || rels.filter((r) => r === w).length > 2)) fails.push('level 2: a joining word missing or three times');
          if (lv === 3 && (!rels.includes('so') || !rels.includes('because') || new Set(rels).size < 3 || d.words.some((w) => rels.filter((r) => r === w).length > 2))) fails.push('level 3: not so and because, three joining words or more, none three times: ' + rels.join(' '));
          const jw = document.querySelector('[data-lcs-joinwrite]'), p = jw && A.PAIRS[jw.dataset.lcsTopic];
          if (!!jw !== !!d.write) fails.push('the pair to join and write belongs to levels 1 and 2 only');
          if (jw && (!p || !d.words.includes(p.rel))) fails.push('no pair to join of the level');
          else if (jw) {
            if (topics.includes(jw.dataset.lcsTopic)) fails.push('the pair to join is one of the sentences above');
            if (txt(jw.querySelector('[data-lcs-pairtext]')) !== p.a + ' ' + p.b) fails.push('the pair to join is not printed as its two sentences');
            const ls = [...jw.querySelectorAll('[data-lcs-line]')];
            if (ls.length !== 2 || ls.some((l) => R(l.querySelector('svg')).width < R(jw).width - 30)) fails.push('the pair to join has not two rows the width of the page');
            if (isKey && ls.map((l) => l.dataset.lcsAnswer).join(' ') !== `${p.a.replace(/\.$/, '')} ${p.rel} ${p.bLower}`) fails.push('the key does not write the two sentences joined with their joining word');
            if (!d.words.every((w) => [...jw.querySelectorAll('[data-lcs-label] b')].map((e) => txt(e)).includes(w))) fails.push('the task to join does not name the joining words of the level');
            // the key of the written join: a sample, with the other right forms named
            const al = jw.querySelectorAll('[data-lcs-alsoright]');
            const wantAl = p.rel === 'and' ? `(Sample. Also right: ${p.also})` : p.rel === 'so' ? '(Sample. so fits best; and also makes a sentence. A comma before so is also right.)' : `(Sample. A comma before ${p.rel} is also right.)`;
            if (isKey ? al.length !== 1 || txt(al[0]) !== wantAl : al.length) fails.push(`the key of the written join does not say "${wantAl}" (or the page of the child does)`);
          }
          const ow = document.querySelector('[data-lcs-ownwrite]');
          if (!!ow !== !!d.own) fails.push('the sentence of the child\'s own belongs to level 3 only');
          if (ow) { const ls = [...ow.querySelectorAll('[data-lcs-line]')]; if (ls.length !== 2) fails.push('the own sentence has not two rows'); if (isKey && !/ because /.test(ls.map((l) => l.dataset.lcsAnswer).join(' '))) fails.push('the sample of the own sentence has no because'); }
        }

        if (mode === 'tense') {
          const heads = [...document.querySelectorAll('[data-lcs-thead]')];
          if (heads.map((h) => txt(h)).join('|') !== 'Yesterday I|Today I|Tomorrow I' || heads.some((h) => cs(h).backgroundColor !== 'rgb(20, 107, 94)' || fs(h) < 19)) fails.push('the table heads are not "Yesterday I", "Today I", "Tomorrow I" on teal bars');
          const rows = [...document.querySelectorAll('[data-lcs-trow]')];
          if (rows.length !== d.rows + (d.worked ? 1 : 0)) fails.push(`${rows.length} rows in the table, not ${d.rows + (d.worked ? 1 : 0)}`);
          const gaps = [], verbs = rows.map((r) => r.dataset.lcsTrow);
          // the verb the page instruction shows stands nowhere else on the page (it would print an answer)
          const own0 = document.querySelector('[data-lcs-tenseown]');
          if ([...verbs, ...[...document.querySelectorAll('[data-lcs-tsent]')].map((s) => s.dataset.lcsVerb), ...(own0 ? own0.dataset.lcsTenseown.split(',') : [])].includes('walk')) fails.push('walk, the verb of the page instruction, stands on the page');
          rows.forEach((r, i) => {
            const v = A.VERBS[r.dataset.lcsTrow];
            if (!v) { fails.push(`row ${i + 1} is no verb of the bank`); return; }
            const forms = [v.base + 'ed', v.base, 'will ' + v.base], cells = [...r.querySelectorAll('[data-lcs-tcell]')];
            const worked = r.dataset.lcsWorked === '1';
            if (worked !== !!(d.worked && i === 0)) fails.push('the worked row is not the first row of level 1 only');
            const g = cells.map((c, k) => (c.dataset.lcsTgap !== undefined ? k : -1)).filter((k) => k >= 0);
            if (worked ? g.length : g.length !== 1) fails.push(`row ${i + 1} has ${g.length} forms to write`);
            if (!worked) gaps.push(g[0]);
            cells.forEach((c, k) => {
              if (Math.abs(R(c).width - A.COLS[k]) > 1.5) fails.push(`a cell of column ${k + 1} is ${Math.round(R(c).width)} px wide`);
              if (c.dataset.lcsTgap !== undefined) {
                const l = c.querySelector('[data-lcs-line]');
                if (c.dataset.lcsTgap !== forms[k] || !l || R(l.querySelector('svg')).width < A.COLS[k] - 2) fails.push(`row ${i + 1}: the place to write ${forms[k]} is not keyed to it or not as wide as its column`);
                if (isKey && l && l.dataset.lcsAnswer !== forms[k]) fails.push(`the key of row ${i + 1} writes "${l.dataset.lcsAnswer}", not "${forms[k]}"`);
                // a yesterday form to write has six letters or fewer, a tomorrow form a verb of four letters or fewer:
                // longer ones do not fit the cell in a first grader's hand
                if (k !== 1 && v.base.length > 4) fails.push(`row ${i + 1}: "${forms[k]}" is left to write in a cell too narrow for it`);
                // the key's answer fits its cell with 8 px on each side, measured at its own width (a fitted answer is
                // squeezed or stretched to the row: the fitting is taken off for the measure)
                if (isKey && l) {
                  const tx = l.querySelector('svg text'); let wNat = Infinity;
                  if (tx) { const tl = tx.getAttribute('textLength'), la = tx.getAttribute('lengthAdjust'); tx.removeAttribute('textLength'); tx.removeAttribute('lengthAdjust'); wNat = tx.getBBox().width; if (tl) { tx.setAttribute('textLength', tl); tx.setAttribute('lengthAdjust', la); } }
                  if (wNat > R(c).width - 15) fails.push(`the key of row ${i + 1} is wider than its cell (${Math.round(wNat)} px in ${Math.round(R(c).width)})`);
                }
              } else { const f = c.querySelector('[data-lcs-form]'); if (!f || txt(f) !== forms[k]) fails.push(`row ${i + 1} prints "${f && txt(f)}" under ${['Yesterday', 'Today', 'Tomorrow'][k]}, not "${forms[k]}"`); if (f && (cs(f).color === 'rgb(138, 130, 118)') !== worked) fails.push(`row ${i + 1}: ${worked ? 'the worked row is not grey' : 'a form printed grey'}`); }
            });
          });
          if (d.gaps.length === 1 ? gaps.some((g) => g !== d.gaps[0]) : new Set(gaps).size < (d.rows >= 4 ? 3 : 2) || gaps.some((x, i) => i >= 2 && ((x === gaps[i - 1] && x === gaps[i - 2]) || (x - gaps[i - 1] === gaps[i - 1] - gaps[i - 2] && Math.abs(x - gaps[i - 1]) === 1)))) fails.push('the forms to write stand in a pattern of columns: ' + gaps.join(''));
          const sents = [...document.querySelectorAll('[data-lcs-tsent]')];
          if (sents.length !== (d.sents || 0)) fails.push(`${sents.length} sentences, not ${d.sents || 0}`);
          const at = [], kinds = [];
          sents.forEach((s, i) => {
            const v = A.VERBS[s.dataset.lcsVerb], kind = s.dataset.lcsTime, tw = s.dataset.lcsTw;
            if (!v) { fails.push(`sentence ${i + 1} is no verb of the bank`); return; }
            if (verbs.includes(s.dataset.lcsVerb)) fails.push(`the verb of sentence ${i + 1} is in the table`);
            if (!(kind === 'past' ? v.past : v.future).includes(tw)) fails.push(`sentence ${i + 1}: "${tw}" is no time word of its verb for the ${kind}`);
            const right = kind === 'past' ? v.base + 'ed' : 'will ' + v.base;
            const ps = [...s.querySelectorAll('[data-lcs-pill]')], ok = ps.filter((e) => e.dataset.lcsOk);
            if (ps.map((e) => txt(e)).sort().join() !== [v.base + 'ed', v.base, 'will ' + v.base].sort().join() || ok.length !== 1 || txt(ok[0]) !== right) fails.push(`sentence ${i + 1}: not the three forms of "${v.base}" with "${right}" keyed`);
            at.push(ps.findIndex((e) => e.dataset.lcsOk)); kinds.push(kind[0]);
            const body = v.frame.replace('{V}', right), atEnd = s.dataset.lcsEnd === '1';
            const full = atEnd ? body.replace(/\.$/, '') + ' ' + tw.toLowerCase() + '.' : tw + ' ' + (/^I /.test(body) ? body : body[0].toLowerCase() + body.slice(1));
            const fr = s.querySelector('[data-lcs-frame]');
            if (!fr || txt(fr) !== full.replace(right, ps.map((e) => txt(e)).join(' '))) fails.push(`sentence ${i + 1} prints "${fr && txt(fr)}"`);
            if (fr && Math.round(R(fr).height / (fs(fr) * 1.6)) > 2) fails.push(`sentence ${i + 1} takes more than two lines`);
            if (!d.atEnd && atEnd) fails.push(`sentence ${i + 1}: the time word stands last on level 1`);
          });
          if (sents.length) {
            if (!placesOk(at, 3)) fails.push('the right verb stands in a pattern of places: ' + at.join(''));
            if (!kinds.includes('p') || !kinds.includes('f') || !kindsOk(kinds.join(''))) fails.push('the sentences do not mix yesterday and tomorrow: ' + kinds.join(''));
            if (d.atEnd && (!sents.some((s) => s.dataset.lcsEnd === '1') || !sents.some((s) => s.dataset.lcsEnd === '0'))) fails.push('level 2: the time word does not stand first in some sentences and last in others');
          }
          const own = document.querySelector('[data-lcs-tenseown]');
          if (!!own !== !!d.own) fails.push('the sentences to write belong to level 3 only');
          if (own) {
            const offer = own.dataset.lcsTenseown.split(',');
            if (offer.length !== 3 || offer.some((b) => verbs.includes(b) || !A.VERBS[b])) fails.push('the verbs to write about are not three verbs outside the table');
            const rs = [...own.querySelectorAll('[data-lcs-ownrow]')];
            if (rs.map((r) => txt(r.querySelector('[data-lcs-lead]'))).join('|') !== 'Yesterday I|Today I|Tomorrow I' || rs.some((r) => R(r.querySelector('[data-lcs-line] svg')).width < 400)) fails.push('the sentences to write are not three rows after "Yesterday I", "Today I", "Tomorrow I"');
            if (isKey) { const a = rs.map((r) => (r.querySelector('[data-lcs-line]').dataset.lcsAnswer || '').split(' ')[0]); const v0 = offer[0]; if (a.join() !== [v0 + 'ed', v0, 'will'].join()) fails.push('the sample of the sentences to write does not use the three forms of one verb'); }
            // the key: "Today I am ...ing ..." is right too, said under the today row
            const tn = own.querySelectorAll('[data-lcs-todaynote]'), today = rs[1] && (rs[1].querySelector('[data-lcs-line]').dataset.lcsAnswer || '');
            if (isKey ? tn.length !== 1 || txt(tn[0]) !== `(Today I am ${offer[0]}ing ${today.split(' ').slice(1).join(' ')} is also right.)` || R(tn[0]).top < R(rs[1]).bottom - 1 || (rs[2] && R(tn[0]).bottom > R(rs[2]).top + 1) : tn.length) fails.push('the key does not say under the today row that "Today I am ...ing" is also right (or the page of the child does)');
          }
        }
        return fails;
      }, {
        LEVELS, ROW, COLS, LEGEND, DAYS, MONTHS, NAMES, JOIN_WORDS, JOIN_TASK,
        WRITE: BANK.capitals.write, CHOOSE: BANK.capitals.choose, PICKINDS: PICKIND,
        PAIRS: Object.fromEntries(PAIRS.map((p) => [p.topic, { rel: p.rel, a: p.a, b: p.b, bLower: lowerB(p.b), pic: p.pic, also: p.also || null }])),
        VERBS: Object.fromEntries(VERBS.map((v) => [v.base, v])),
      });
    },
  };
}

module.exports = { makeGrammarG1Type, grammarFaultsOf, LEVELS, placesOk, kindsOk };
