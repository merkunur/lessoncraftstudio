/**
 * two-stories-k.js — two Kindergarten pages for the lesson "Two stories, two adventures" (RL.K.9) of the unit "Reading
 * Stories" (English literacy year, Daily Teaching System Part 12.3, 2026-11-17; revised after the reading specialist's review
 * the same day). The stories are data/literacy/two-stories-k.en.json: ten ORIGINAL read-aloud stories of 60 to 90 words,
 * five of each adventure (a character loses something and finds it; a character helps a friend), each with one library
 * picture that shows the character only. Two stories of one adventure make a pair. Every story states one value of each
 * slot of its adventure in a sentence of its own (the proof): what was lost, who helped, where it was found; who was helped,
 * what was wrong, what was given (the slots of what HAPPENED to the characters); and where and the weather (the setting).
 * The feeling of its character at the end is stated in the last sentence, a feeling felt earlier in a sentence of its own.
 * A pair shares at most two things that happened (no story told twice). The teacher reads the two stories (printed on the
 * page at 16 px, Story 1 in teal, Story 2 in coral); the child does not read. The key says "Answer key". Copy v takes the
 * next ordered pair of a fixed walk through every pair that fits its level (two copies in a row never share one).
 *
 *   sort  K-685 Compare Two Stories (day 1). Under the stories a two-circle diagram: Story 1 on the left, Story 2 on the
 *         right, Both in the shared middle; the head of each region shows its character's picture (two small overlapping
 *         circles for Both). Every region has TWO glue boxes, more boxes than cards, so the boxes never tell how many cards
 *         a region gets. At the foot the cards to cut out, each a picture and a short phrase (the teacher reads it). A card
 *         is a slot value: Both when the two stories state the same value (proof in each), Story 1 or Story 2 when they
 *         state different values for its slot. At least two thirds of the cards of a page tell what happened (never the
 *         bag or the bucket). Every glue box lies inside ONE region and holds its card with 18 px of room on every side;
 *         cards are 96 x 86 px or more.
 *     level 1  four cards: two Both (one or two of what happened), and the two values of one thing that happened
 *     level 2  five cards: one Both, and the values of two things that happened (two Story 1, two Story 2)
 *     level 3  as level 2, and the child tells a partner one more thing that is the same (the key: a sample, in the spare
 *              Both box, of a thing both stories tell that is no card, said as a full sentence: the frame of its slot's kind
 *              in the bank, "Both stories happen at the playground.", inside quotation marks with its period)
 *         The cards stand at the foot in no pattern of their regions.
 *   draw  K-686 Draw Same and Different (day 2). Two stories of one adventure, a box to draw one thing that is the same and
 *         a box to draw how the stories are different (its halves marked 1 and 2: Story 1 in box 1), and a row of faces for
 *         each character, named by its picture: circle the face that shows how the character felt at the end. The right
 *         face is stated in the story's last sentence; a wrong face is a feeling the story states BEFORE the end (sad: it
 *         tests "at the end") or one the story allows at no moment; angry stands in at most one row of a page; the tired
 *         face carries "z z z" (without it, it reads as sad).
 *     level 1  two faces a character
 *     level 2  three faces a character
 *     level 3  three faces a character, and Kindergarten writing rows (128 px): one under the Same box, one under the
 *              Different box in two halves marked 1 and 2, to write a word for each drawing
 *         The key writes a sample in each box (a thing that happened in both stories, and the two values of a thing that
 *         happened differently), says what drawings count, and on level 3 writes a kindergartner's sounded-out word on
 *         each row and says that sounded-out spellings are right.
 *
 * Kindergarten sizes: pictures 60 px or more (the character at the head of a region 28 px or more), read-aloud text 16 px
 * or more, writing rows 110 px or more. Ligatures are off (the rule stands before the page root, which carries
 * data-lcs-noliga), and an f before i, f, l or t gets room of its own. Typographic apostrophes and quotes. No page leaves a
 * blank band of more than 40 px outside the boxes a child draws in. The instruction of each level is INSTR (registered as
 * strings; verify() reads it on the page); verify() carries its OWN copy of every ruled text and measure (SPEC). English
 * only. Themeless: a copy draws another pair and other cards. PDF only (the answer key is for checks and review). The bank
 * is checked when this file loads (tsFaultsOf), including trial draws of every level; nothing looks a picture up while the
 * file loads.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const TOK = require('../../primitives/_tokens.js');
const BANK = require('../../data/literacy/two-stories-k.en.json');
const { _parts } = require('./info-text.js');
const { seatOnRow } = require('../../lib/key-on-row.js');
const { W, esc, shuffle, rowSvg } = _parts;
const T = TOK.color;
const attr = (s) => esc(s).replace(/"/g, '&quot;');

const INNER = W - 24;
const MODES = ['sort', 'draw'];
// the boxes and writing rows of a level-3 key of K-686 hold only samples: lower than the child's (the key also says what counts)
const CARD_W = 104, CARD_H = 100, CARD_PIC = 60, GLUE = 18, ROW = 128, KEYROW = 110, KEYBOX = 60;
// glue boxes: the same number in every region and more boxes than cards, so the boxes never tell how many cards a region
// gets (review 2026-11-17, S6: three a region does not fit beside two stories, so levels 2 and 3 glue five cards in six boxes)
const BOXES = 2;
const COL = { 1: T.teal, 2: T.coral };

const INSTR = {
  sort: { 1: 'Two stories can tell about adventures that are alike and different.', 2: 'Two stories can tell about adventures that are alike and different.', 3: 'Two stories can tell about adventures that are alike and different.' },
  draw: { 1: 'We compare two stories: what is the same and what is different.', 2: 'We compare two stories: what is the same and what is different.', 3: 'We compare two stories: what is the same and what is different.' },
};
const LINES = {
  sort: { 1: ['Listen to both stories. Cut out the cards. Glue each card in Story 1, Story 2, or Both.'],
    2: ['Listen to both stories. Cut out the cards. Glue each card in Story 1, Story 2, or Both.'],
    3: ['Listen to both stories. Cut out the cards. Glue each card in Story 1, Story 2, or Both.', 'Tell a partner one more thing that is the same in both stories.'] },
  draw: { 1: ['Listen to both stories. Draw one thing that is the same. Then draw how the stories are different: Story 1 in box 1, Story 2 in box 2.', 'Your teacher reads the name in each row. Circle the face that shows how that animal felt at the end.'],
    2: ['Listen to both stories. Draw one thing that is the same. Then draw how the stories are different: Story 1 in box 1, Story 2 in box 2.', 'Your teacher reads the name in each row. Circle the face that shows how that animal felt at the end.'],
    3: ['Listen to both stories. Draw one thing that is the same. Then draw how the stories are different: Story 1 in box 1, Story 2 in box 2. Write a word for each.', 'Your teacher reads the name in each row. Circle the face that shows how that animal felt at the end.'] },
};
const HEADS = { s1: 'Story 1', s2: 'Story 2', both: 'Both', same: 'Same in both', diff: 'Different', sample: 'Sample:' };
/** what the key says of the open answers (review 2026-11-17, M5 and ruling G) */
const KEY = {
  tag: 'Answer key',
  // the partner-talk sample is a sentence a child says (the frame of its slot, filled): its period stands inside the quotes
  tell: (sentence) => `Sample: “${sentence}” Accept anything both stories tell.`,
  accept: 'Accept any drawing of a thing both stories tell (Same), and a thing each story tells differently, Story 1 on side 1 (Different).',
  spell: (word, sounded) => `Sounded-out spellings are right (${sounded} for ${word}).`,
  spellNone: 'Sounded-out spellings are right.',
};
/** the tired face is the library's yawning face with "z z z" over it: without the letters it reads as sad (review, M4) */
const ZZZ = 'z z z';

// sort: cards, of them Both, and slots the stories differ in (a Story 1 and a Story 2 card each). draw: faces a row
const LEVELS = {
  sort: { 1: { cards: 4, both: 2, diff: 1 }, 2: { cards: 5, both: 1, diff: 2 }, 3: { cards: 5, both: 1, diff: 2, tell: true } },
  draw: { 1: { faces: 2, boxH: 200 }, 2: { faces: 3, boxH: 200 }, 3: { faces: 3, boxH: 100, row: true } },
};

/* ---------------------------------------------------------------- small helpers ---------------------------------------------------------------- */
/** the advance widths (em) of Nunito 700 (sentences-k.js, print-concepts-k.js); pages print at 800, about 4 % wider */
const NUNITO700 = { a: 0.547, b: 0.6, c: 0.4625, d: 0.6, e: 0.542, f: 0.3422, g: 0.604, h: 0.585, i: 0.255, j: 0.259, k: 0.536, l: 0.319, m: 0.877,
  n: 0.585, o: 0.576, p: 0.6, q: 0.6, r: 0.392, s: 0.488, t: 0.3574, u: 0.579, v: 0.565, w: 0.891, x: 0.546, y: 0.564, z: 0.474, A: 0.744, B: 0.688,
  C: 0.6582, D: 0.762, E: 0.597, F: 0.562, G: 0.736, H: 0.773, I: 0.282, J: 0.335, K: 0.665, L: 0.562, M: 0.868, N: 0.748, O: 0.785, P: 0.652,
  Q: 0.785, R: 0.686, S: 0.631, T: 0.6334, U: 0.738, V: 0.713, W: 1.113, X: 0.672, Y: 0.6228, Z: 0.605, ' ': 0.271, '.': 0.27, '?': 0.47, '’': 0.22, ',': 0.27 };
const pxOf = (t, font) => [...String(t)].reduce((a, c) => a + (NUNITO700[c] || 0.9), 0) * font * 1.08;
/** the lines a card phrase takes in a card (16 px, the card's inner width) */
function cardLines(t) { const ws = String(t).split(' '); let n = 1, cur = ''; for (const w of ws) { const next = cur ? cur + ' ' + w : w; if (pxOf(next, 16) > CARD_W - 10 && cur) { n++; cur = w; } else cur = next; } return n; }
function blockRepeat(s) {
  for (let k = 2; k <= 4; k++) { if (s.length < 2 * k) continue; if ([...s].every((c, i) => c === s[i % k])) return true; }
  const runs = String(s).match(/(.)\1*/g) || [];
  return runs.length >= 2 && runs[0].length >= 2 && runs.every((r) => r.length === runs[0].length);
}
function seedRng(seed) { let x = seed >>> 0 || 1; const next = () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; }; return { int: (a, c) => a + Math.floor(next() * (c - a + 1)) }; }
const wordCount = (st) => st.text.join(' ').split(/\s+/).filter(Boolean).length;
/** the sentence of the partner-talk sample: the frame of a slot's kind with the card text (or the card's word) filled in */
function fillTell(frame, value) { return String(frame).replace('{card}', value[0]).replace('{word}', value[3] || ''); }
/** the slots two stories share (one value) and the slots they differ in */
function compare(a, b) { const sh = [], df = []; for (const k of Object.keys(a.slots)) (a.slots[k][0] === b.slots[k][0] ? sh : df).push(k); return { sh, df }; }

/* ---------------------------------------------------------------- the bank's check ---------------------------------------------------------------- */
function tsFaultsOf(b) {
  const f = [];
  const K = b.kinds || {}, S = b.stories || [], FACES = b.faces || {};
  const FEEL = ['happy', 'sad', 'angry', 'scared', 'surprised', 'tired'];
  if (Object.keys(K).length < 2) f.push('kinds: fewer than two adventures');
  for (const fc of FEEL) if (!FACES[fc] || FACES[fc][0] !== 'emotions') f.push(`faces: no picture of ${fc}`);
  const pk = new Set(), ids = new Set(), names = new Set();
  for (const [k, x] of Object.entries(K)) {
    const sl = x.slots || {}, hap = x.happened || [];
    if (Object.keys(sl).length < 4) f.push(`${k}: fewer than four slots`);
    // the slots of what happened (at least two thirds of the cards of a page): each value has a word a child may write
    // and a kindergartner's sounded-out spelling of it (the key of K-686 level 3)
    if (hap.length < 3 || hap.some((s) => !sl[s])) f.push(`${k}: fewer than three slots of what happened, or one that is no slot`);
    for (const [s, vals] of Object.entries(sl)) {
      if (Object.keys(vals).length < 2) f.push(`${k} ${s}: fewer than two values`);
      for (const [v, [card, th, nn, word, sounded]] of Object.entries(vals)) {
        if (!card || cardLines(card) > 2 || /['"]/.test(card)) f.push(`${k} ${s} ${v}: the card "${card}" takes more than two lines`);
        if (!th || !nn || /bw( ?\d+)?$/i.test(th)) f.push(`${k} ${s} ${v}: not a colour picture`);
        if (hap.includes(s) && (!/^[a-z]+$/.test(word || '') || !/^[a-z]+$/.test(sounded || '') || !card.toLowerCase().includes(word))) f.push(`${k} ${s} ${v}: no word on the card to write, or no sounded-out spelling of it`);
      }
    }
    // every card kind (slot) has a frame for the partner-talk sample, and every value makes one sentence of it, ending with
    // its period ("Both stories tell “at the playground.”" was no sentence a child says: coordinator, round 2)
    const tl = x.tell || {};
    for (const sk of Object.keys(tl)) if (!sl[sk]) f.push(`${k}: a sample frame for ${sk}, which is no slot`);
    for (const [sk, vals] of Object.entries(sl)) {
      const fr = tl[sk];
      if (typeof fr !== 'string' || (fr.match(/\{(card|word)\}/g) || []).length !== 1) { f.push(`${k} ${sk}: no frame for the partner-talk sample (one {card} or {word})`); continue; }
      for (const [v, c] of Object.entries(vals)) {
        const t = fillTell(fr, c);
        if ((fr.includes('{word}') && !c[3]) || !/^[A-Z][^.!?“”"'{}]*\.$/.test(t) || pxOf(t, 16) > 4 * 150) f.push(`${k} ${sk} ${v}: the sample "${t}" is not one short sentence ending with a period`);
      }
    }
    const st = S.filter((y) => y.kind === k);
    if (st.length < 5) f.push(`${k}: fewer than five stories`);
    // the pairs every level can draw (a pair may share at most two slots of what happened: no story told twice)
    const n = { 1: 0, 2: 0, 3: 0, draw: 0 };
    for (let i = 0; i < st.length; i++) for (let j = i + 1; j < st.length; j++) for (const lv of ['1', '2', '3', 'draw']) if (pairFits(cmp(st[i], st[j], hap), lv)) n[lv]++;
    // no two stories of an adventure tell nearly one story: they share at most two things that happened
    for (let i = 0; i < st.length; i++) for (let j = i + 1; j < st.length; j++) if (cmp(st[i], st[j], hap).shH.length > 2) f.push(`${k}: ${st[i].id} and ${st[j].id} share more than two things that happened (one story told twice)`);
    if (n[1] < 5 || n[2] < 6 || n[3] < 5 || n.draw < 5) f.push(`${k}: only ${n[1]}, ${n[2]}, ${n[3]} and ${n.draw} pairs for sort levels 1, 2, 3 and the drawing page (5, 6, 5 and 5 wanted)`);
    // the right face is not always one face: the stories of an adventure end with at least two feelings
    if (new Set(st.map((y) => y.end && y.end[0])).size < 2) f.push(`${k}: every story ends with one feeling`);
  }
  for (const st of S) {
    const tag = `story ${st.id}`;
    if (ids.has(st.id)) f.push(`${tag}: twice`); ids.add(st.id);
    if (!K[st.kind]) { f.push(`${tag}: no adventure`); continue; }
    if (names.has(st.name)) f.push(`${tag}: its name is used by another story`); names.add(st.name);
    const n = wordCount(st);
    if (n < 60 || n > 90) f.push(`${tag}: ${n} words (60 to 90)`);
    if (!Array.isArray(st.pic) || st.pic.length !== 2 || /bw( ?\d+)?$/i.test(st.pic[0])) f.push(`${tag}: no colour picture`);
    if (pk.has(st.pic.join('/'))) f.push(`${tag}: its picture is another story's`); pk.add(st.pic.join('/'));
    if (!st.title || pxOf(st.title, 17) > (INNER - 10) / 2 - 90) f.push(`${tag}: no title, or too long for its column`);
    for (const fam of b.famous || []) if (st.title && fam.toLowerCase().split(/\s+/).filter((w) => w.length > 3).filter((w) => st.title.toLowerCase().includes(w)).length >= 2) f.push(`${tag}: its title is too close to "${fam}"`);
    for (const s of st.text) { if (/['"]/.test(s)) f.push(`${tag}: a straight apostrophe or quote in "${s}"`); for (const w of b.banned || []) if (new RegExp('\\b' + w + '\\b', 'i').test(s)) f.push(`${tag}: "${w}" is on the never list`); }
    // every slot of its adventure stated once, by a sentence of the story
    for (const sl of Object.keys(K[st.kind].slots)) {
      const v = st.slots && st.slots[sl];
      if (!v || !K[st.kind].slots[sl][v[0]] || !st.text.includes(v[1])) f.push(`${tag}: the slot ${sl} has no value or no sentence of the story that states it`);
    }
    for (const sl of Object.keys(st.slots || {})) if (!K[st.kind].slots[sl]) f.push(`${tag}: the slot ${sl} is no slot of its adventure`);
    // the end: stated in the last sentence; a feeling felt earlier: stated in a sentence of its own, never the end; the faces
    // it never allows are not words of the story
    if (!st.end || !FACES[st.end[0]] || st.text[st.text.length - 1] !== st.end[1] || !new RegExp('\\b' + st.end[0] + '\\b').test(st.end[1])) f.push(`${tag}: its end feeling is not stated in its last sentence`);
    if (!Array.isArray(st.earlier) || st.earlier.some(([fc, s]) => !FACES[fc] || fc === st.end[0] || (st.never || []).includes(fc) || !st.text.includes(s) || !new RegExp('\\b' + fc + '\\b').test(s) || s === st.end[1])) f.push(`${tag}: a feeling felt earlier that is not stated before the end, or is the end, or a face it never allows`);
    if (!Array.isArray(st.never) || st.never.length < 2 || st.never.length > 3 || st.never.includes(st.end[0]) || st.never.some((x) => !FACES[x])) f.push(`${tag}: not two or three faces that fit no moment of the story`);
    for (const x of st.never || []) if (new RegExp('\\b' + x + '\\b', 'i').test(st.text.join(' '))) f.push(`${tag}: the story says "${x}", a face it should never allow`);
    // the scared and the surprised face look alike (wide eyes, open mouth), and the tired face is close to sad: a row never
    // offers scared beside surprised, and the tired face is wrong only in a story with no sad moment
    const offered = [st.end && st.end[0], ...(st.never || []), ...(st.earlier || []).map((e) => e[0])];
    if (offered.includes('scared') && offered.includes('surprised')) f.push(`${tag}: its faces put scared beside surprised`);
    if ((st.never || []).includes('tired') && /\b(sad|lost)\b/i.test(st.text.join(' '))) f.push(`${tag}: the tired face is offered as wrong in a story with a sad moment`);
    // happy is NEVER a wrong face in a row whose story ends tired or surprised: an animal tired after a good day, or surprised
    // by a gift, can be happy too, and the row would have two right faces (coordinator's ruling on the review, 2026-11-17)
    if (['tired', 'surprised'].includes(st.end && st.end[0]) && [...(st.never || []), ...(st.earlier || []).map((e) => e[0])].includes('happy')) f.push(`${tag}: happy is offered as a wrong face in a story that ends ${st.end[0]} (two right faces)`);
    // a row can always offer its faces with angry in at most one row of a page: a story offers a wrong face that is not angry
    if (![...(st.never || []), ...(st.earlier || []).map((e) => e[0])].some((x) => x !== 'angry')) f.push(`${tag}: angry is its only wrong face`);
    // the story picture is no card picture of its adventure (no picture twice on a page)
    for (const vals of Object.values(K[st.kind].slots)) for (const [, th, nn] of Object.values(vals)) if (th + '/' + nn === st.pic.join('/') || nn === st.pic[1]) f.push(`${tag}: its picture is a card picture`);
  }
  if ((b.banned || []).length < 10) f.push('banned: fewer than ten words');
  if ((b.famous || []).length < 15) f.push('famous: fewer than fifteen titles to check against');
  if (f.length) return f;
  const ends = [];
  for (const mode of MODES) for (const lv of [1, 2, 3]) for (let s = 1; s <= 12; s++) {
    try { const p = drawPage(b, mode, lv, seedRng(s * 7 + lv), s); if (mode === 'draw') ends.push(p.s1.end[0], p.s2.end[0]); } catch (e) { f.push(`${mode} level ${lv}: ${e.message}`); break; }
  }
  // over the copies the right face is not always one face, and none is right in more than two rows of three
  if (ends.length && Math.max(...FEEL.map((x) => ends.filter((y) => y === x).length)) > ends.length * 2 / 3) f.push('the drawing page: one face is the right face in more than two rows of three');
  return f;
}

/* ---------------------------------------------------------------- the draws (pure: the bank check runs them too) ---------------------------------------------------------------- */
/** what a pair of stories offers: the slots of what happened they share and differ in, and the setting slots they share */
function cmp(a, b, hap) { const c = compare(a, b); return { ...c, shH: c.sh.filter((s) => hap.includes(s)), dfH: c.df.filter((s) => hap.includes(s)), shB: c.sh.filter((s) => !hap.includes(s)) }; }
/** a pair fits a page when its cards are at least two thirds slots of what happened, and it shares at most two of them */
function pairFits(c, lv) {
  if (c.shH.length > 2) return false;
  if (lv === '1') return c.sh.length >= 2 && c.shH.length >= 1 && c.dfH.length >= 1;
  if (lv === '2') return c.sh.length >= 1 && c.dfH.length >= 2;
  if (lv === '3') return c.sh.length >= 2 && c.dfH.length >= 2;
  return c.shH.length >= 1 && c.dfH.length >= 1;
}
const gcd = (a, c) => (c ? gcd(c, a % c) : a);
/** the place of copy v in a fixed walk through `count` choices with a step prime to count: consecutive copies never share a
 *  choice, and the first `count` copies use every one */
function cycle(v, count, salt) { if (count < 2) return 0; let step = 7; while (gcd(step, count) !== 1) step++; return ((((v || 1) - 1) * step + salt) % count + count) % count; }
/** the pair of copy v: the next, in a fixed walk, of every ordered pair of one adventure that has what the level needs */
function drawPair(b, lv, v, mode) {
  const fit = [];
  for (const kind of Object.keys(b.kinds)) { const st = b.stories.filter((x) => x.kind === kind);
    for (const a of st) for (const c of st) if (a !== c) { const k = cmp(a, c, b.kinds[kind].happened); if (pairFits(k, mode === 'draw' ? 'draw' : String(lv))) fit.push({ kind, s1: a, s2: c, ...k }); } }
  if (!fit.length) throw new Error('no pair');
  return fit[cycle(v, fit.length, mode === 'draw' ? 5 : lv)];
}
function drawPage(b, mode, lv, rng, v) {
  const d = LEVELS[mode][lv];
  const pair = drawPair(b, lv, v, mode);
  const K = b.kinds[pair.kind].slots;
  const items = ['s1:' + pair.s1.id, 's2:' + pair.s2.id];
  if (mode === 'sort') {
    // Both: shared slots of what happened first; the slots the stories differ in: always slots of what happened
    const both = [...shuffle(pair.shH, rng), ...shuffle(pair.shB, rng)].slice(0, d.both), df = shuffle(pair.dfH, rng).slice(0, d.diff);
    if (both.length !== d.both || df.length !== d.diff) throw new Error('a pair with too few slots');
    const cards = [...both.map((s) => ({ slot: s, value: pair.s1.slots[s][0], region: 'both' })),
      ...df.flatMap((s) => [{ slot: s, value: pair.s1.slots[s][0], region: 's1' }, { slot: s, value: pair.s2.slots[s][0], region: 's2' }])];
    cards.forEach((c) => { c.text = K[c.slot][c.value][0]; c.pic = [K[c.slot][c.value][1], K[c.slot][c.value][2]]; });
    // level 3: the sample of "one more thing that is the same" is a shared slot that is no card (what happened first)
    const tellSlot = d.tell ? [...pair.shH, ...pair.shB].find((s) => !both.includes(s)) : null;
    if (d.tell && !tellSlot) throw new Error('no shared thing left for the partner talk');
    // the cut-out order: never the regions in a block (both, both, s1, s2 ...) or a repeated block
    let order = null;
    for (let k = 0; k < 400 && !order; k++) { const o = shuffle(cards, rng), s = o.map((c) => ({ both: 'B', s1: '1', s2: '2' })[c.region]).join(''); if (!blockRepeat(s) && !/^(B+1+2+|B+2+1+|1+B+2+|2+B+1+|1+2+B+|2+1+B+)$/.test(s) && !/(.)\1\1/.test(s)) order = o; }
    if (!order) throw new Error('no mixed order of the cards');
    return { ...pair, cards: order, tell: tellSlot ? fillTell(b.kinds[pair.kind].tell[tellSlot], K[tellSlot][pair.s1.slots[tellSlot][0]]) : null, items: [...items, ...order.map((c) => 'card:' + c.slot + '=' + c.value + ':' + c.region)] };
  }
  // draw: the faces of each character: the end, the feeling felt earlier (it tests "at the END"), faces the story never
  // allows; angry in at most one row of a page; the two right faces not in one place
  // (happy is never among them where the story ends tired or surprised: the bank check refuses it, two right faces)
  const wrongOf = (st) => { const early = (st.earlier || []).map((e) => e[0]), rest = shuffle(st.never, rng), out = early.slice(0, d.faces - 1);
    for (const x of [...rest.filter((y) => y !== 'angry'), ...rest.filter((y) => y === 'angry')]) if (out.length < d.faces - 1) out.push(x); return out; };
  for (let k = 0; k < 200; k++) {
    const w1 = wrongOf(pair.s1), w2 = wrongOf(pair.s2);
    if (w1.includes('angry') && w2.includes('angry')) continue;
    const rows = [[pair.s1.end[0], ...w1], [pair.s2.end[0], ...w2]].map((r) => shuffle(r, rng));
    const at = rows.map((r, i) => r.indexOf([pair.s1, pair.s2][i].end[0]));
    if (at[0] === at[1]) continue;
    // the drawn samples: a thing that happened in both stories, and one they tell differently
    const same = pair.shH[rng.int(0, pair.shH.length - 1)], diff = pair.dfH[rng.int(0, pair.dfH.length - 1)];
    return { ...pair, faces: rows, same, diff, items: [...items, ...rows.map((r, i) => 'faces' + (i + 1) + ':' + r.slice().sort().join(','))] };
  }
  throw new Error('no faces');
}

{ const fb = tsFaultsOf(BANK); if (fb.length) throw new Error('two-stories-k.en.json: ' + fb.join('; ')); }

/* ---------------------------------------------------------------- the parts of a page ---------------------------------------------------------------- */
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
function fRoom(html) {
  let out = '', i = 0, inSvg = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); const tag = html.slice(i, j + 1); if (/^<svg\b/i.test(tag)) inSvg++; else if (/^<\/svg>/i.test(tag)) inSvg--; out += tag; i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += inSvg ? text : text.replace(/f(?=[iflt])|t(?=t)/g, (m) => `<span data-lcs-fsep style="margin-right:0.07em">${m}</span>`);
    i = j < 0 ? html.length : j;
  }
  return out;
}
const img = (pic, kind, size, more = '') => `<img class="ws-icon" data-lcs-pic="${attr(pic.join('/'))}" data-lcs-pickind="${attr(kind)}" src="${fileUri(pic[0], pic[1])}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain;${more}">`;
const cream = (attrs, inner, pad = 8, gap = 6, more = '') => `<div ${attrs} style="position:relative;display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
/** "Answer key" on the corner of the first block of a key (it takes no room: it stands over the block's top edge) */
const keyTag = () => `<span data-lcs-keytag style="position:absolute;right:14px;top:-17px;padding:2px 10px;border-radius:999px;background:${T.teal};color:#FFFFFF;font:800 14px/18px 'Nunito',sans-serif;white-space:nowrap">${esc(KEY.tag)}</span>`;
const label = (k, html) => `<div data-lcs-label data-lcs-read style="font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}"><span style="color:${T.teal}">${k}.</span> ${html}</div>`;
const badge = (n, more = '') => `<span data-lcs-badge="${n}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:${COL[n]};color:#FFFFFF;font:800 17px/1 'Nunito',sans-serif;${more}">${n}</span>`;
const ring = () => `<span data-lcs-ring style="position:absolute;left:-5px;right:-5px;top:-5px;bottom:-5px;border:3.5px solid ${T.teal};border-radius:50%;pointer-events:none"></span>`;
const keyLine = (attrs, text) => `<div ${attrs} data-lcs-read style="font:700 16px/1.25 'Nunito',sans-serif;color:${T.teal}">${esc(text)}</div>`;
/** the two stories side by side: a coloured badge and the title, the character's picture beside the first lines, the text */
const storiesBlock = (pair, tag) => cream('data-lcs-task="stories"', tag + `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">` + [pair.s1, pair.s2].map((st, i) => `<div data-lcs-story="${i + 1}" data-lcs-sid="${attr(st.id)}" style="box-sizing:border-box;padding:4px 10px 6px;border-radius:12px;background:#FFFFFF;border-left:6px solid ${COL[i + 1]}">` +
    `<div style="display:flex;align-items:center;gap:6px;margin-bottom:2px">${badge(i + 1)}<span data-lcs-stitle data-lcs-read style="font:800 17px/1.2 'Nunito',sans-serif;color:${COL[i + 1]}">${esc(st.title)}</span></div>` +
    `<div data-lcs-stext data-lcs-read style="font:600 16px/1.2 'Nunito',sans-serif;color:${T.ink}">${img(st.pic, st.pic[1], 62, 'float:left;margin:2px 8px 0 0')}${st.text.map(esc).join(' ')}</div></div>`).join('') + `</div>`, 6, 4);

function renderPage(plan, mode, lv, d, key) {
  const blocks = [], L = LINES[mode][lv];
  blocks.push(storiesBlock(plan, key ? keyTag() : ''));
  if (mode === 'sort') {
    const DW = INNER, BW = CARD_W + 2 * GLUE + 6, BH = CARD_H + 2 * GLUE + 6, GAP = 8;
    const per = { s1: plan.cards.filter((c) => c.region === 's1'), both: plan.cards.filter((c) => c.region === 'both'), s2: plan.cards.filter((c) => c.region === 's2') };
    const top0 = 20, DH = top0 + BOXES * BH + (BOXES - 1) * GAP + 6;
    const cx = { s1: DW / 6, both: DW / 2, s2: (5 * DW) / 6 };
    const aR = DW / 2 + BW / 2 + 18, bL = DW / 2 - BW / 2 - 18;
    const shape = (n, l, r) => `<div data-lcs-circle="${n}" style="position:absolute;left:${l}px;width:${r - l}px;top:2px;bottom:2px;box-sizing:border-box;border:3px solid ${COL[n]};border-radius:70px;background:${n === 1 ? 'rgba(20,107,94,0.07)' : 'rgba(242,120,75,0.08)'}"></div>`;
    // the head of each region: Story 1 and Story 2 with the picture of their character, Both with two small circles that
    // overlap (a kindergartner does not read "Story 1": review 2026-11-17, S15)
    const both = `<svg data-lcs-bothicon width="34" height="22" viewBox="0 0 34 22" style="flex:0 0 auto;display:block"><circle cx="12" cy="11" r="9" fill="none" stroke="${T.teal}" stroke-width="2.5"/><circle cx="22" cy="11" r="9" fill="none" stroke="${T.coral}" stroke-width="2.5"/></svg>`;
    const headPic = (st) => `<img class="ws-icon" data-lcs-headpic="${attr(st.pic.join('/'))}" src="${fileUri(st.pic[0], st.pic[1])}" alt="" style="flex:0 0 auto;width:30px;height:30px;display:block;object-fit:contain">`;
    const head = (r, text, n, st) => `<div data-lcs-region="${r}" style="position:absolute;top:-18px;left:${cx[r] - 80}px;width:160px;height:36px;box-sizing:border-box;padding:2px 6px;border-radius:12px;background:${T.cream};display:flex;justify-content:center;align-items:center;gap:6px">${n ? badge(n, 'width:22px;height:22px;font-size:14px') : ''}${st ? headPic(st) : both}<span data-lcs-headtext data-lcs-read style="font:800 18px/1 'Nunito',sans-serif;color:${n ? COL[n] : T.ink}">${esc(text)}</span></div>`;
    // the glue boxes: BOXES in every region; the key glues the cards of a region in its first boxes
    const boxes = Object.keys(per).map((r) => Array.from({ length: BOXES }, (_, i) => { const c = per[r][i];
      return `<div data-lcs-glue="${r}" style="position:absolute;box-sizing:border-box;left:${cx[r] - BW / 2}px;top:${top0 + i * (BH + GAP)}px;width:${BW}px;height:${BH}px;border:2.5px dashed ${T.grid};border-radius:12px;background:#FFFFFF;display:flex;align-items:center;justify-content:center">` +
        (key && c ? `<span data-lcs-keycard="${attr(c.text)}" data-lcs-read style="width:${CARD_W - 8}px;text-align:center;font:800 16px/1.15 'Nunito',sans-serif;color:${T.teal}">${esc(c.text)}</span>` : '') +
        (key && !c && r === 'both' && d.tell && i === per.both.length ? `<span data-lcs-tellsample data-lcs-read style="width:${BW - 14}px;text-align:center;font:700 16px/1.12 'Nunito',sans-serif;color:${T.teal}">${esc(KEY.tell(plan.tell))}</span>` : '') + `</div>`; }).join('')).join('');
    const diagram = `<div data-lcs-diagram style="position:relative;margin-top:18px;height:${DH}px">${shape(1, 2, aR)}${shape(2, bL, DW - 2)}${head('s1', HEADS.s1, 1, plan.s1)}${head('both', HEADS.both, 0, null)}${head('s2', HEADS.s2, 2, plan.s2)}${boxes}</div>`;
    const tell = d.tell ? label(2, esc(L[1])) : '';
    blocks.push(cream('data-lcs-task="sort"', label(1, esc(L[0])) + tell + diagram, 6, 4, 'flex:1 1 auto;justify-content:space-evenly;'));
    blocks.push(`<div data-lcs-cards style="display:flex;justify-content:center;padding:2px 12px;border-radius:14px;background:${T.cream}"><div data-lcs-cardgrid style="display:flex;border-top:2px dashed ${T.ink};border-left:2px dashed ${T.ink}">` +
      plan.cards.map((c) => `<div data-lcs-card="${attr(c.slot + '=' + c.value)}" data-lcs-cregion="${c.region}" style="box-sizing:border-box;width:${CARD_W}px;height:${CARD_H}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:3px 4px;border-right:2px dashed ${T.ink};border-bottom:2px dashed ${T.ink};background:#FFFFFF">` +
        img(c.pic, c.pic[1], CARD_PIC) + `<span data-lcs-cardtext data-lcs-read style="text-align:center;font:800 16px/1.05 'Nunito',sans-serif;color:${T.ink}">${esc(c.text)}</span></div>`).join('') + `</div></div>`);
  }
  if (mode === 'draw') {
    const K = BANK.kinds[plan.kind].slots;
    const val = (st, slot) => K[slot][st.slots[slot][0]];
    const sameV = val(plan.s1, plan.same), dA = val(plan.s1, plan.diff), dB = val(plan.s2, plan.diff);
    const box = (kind, inner) => `<div data-lcs-drawbox="${kind}" style="position:relative;box-sizing:border-box;flex:1 1 auto;min-height:${key && d.row ? KEYBOX : d.boxH}px;border:2.5px dashed ${T.grid};border-radius:12px;background:#FFFFFF">${inner}</div>`;
    const sampleTag = (t, more = '') => `<span data-lcs-sample data-lcs-read style="font:800 16px/1.2 'Nunito',sans-serif;color:${T.teal};${more}">${esc(t)}</span>`;
    const colW = (INNER - 12) / 2, half = (colW - 8) / 2 - 26;
    // the writing rows of level 3: one under the Same box; under the Different box a row in two halves marked 1 and 2
    // (three drawings: review, S14); the key seats a kindergartner's sounded-out spelling on each (ruling G)
    const row = (w, attrs, word) => `<div ${attrs} style="line-height:0">${key ? seatOnRow(rowSvg(w, KEYROW), word, { fill: T.teal }) : rowSvg(w, ROW)}</div>`;
    const same = `<div style="display:flex;flex-direction:column;gap:4px;min-height:0"><div data-lcs-boxhead="same" data-lcs-read style="font:800 18px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(HEADS.same)}</div>` +
      box('same', key ? `<div style="position:absolute;left:8px;right:8px;bottom:8px;text-align:center">${sampleTag(HEADS.sample + ' ' + sameV[0])}</div>` : '') + (d.row ? row(colW, 'data-lcs-line="same"', sameV[4]) : '') + `</div>`;
    const diff = `<div style="display:flex;flex-direction:column;gap:4px;min-height:0"><div data-lcs-boxhead="diff" data-lcs-read style="font:800 18px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(HEADS.diff)}</div>` +
      box('diff', `<span data-lcs-half="1" style="position:absolute;left:8px;top:8px">${badge(1)}</span><span data-lcs-half="2" style="position:absolute;left:calc(50% + 8px);top:8px">${badge(2)}</span><span data-lcs-divider style="position:absolute;left:50%;top:8px;bottom:8px;border-left:2.5px dashed ${T.grid}"></span>` +
        (key ? `<div style="position:absolute;left:42px;right:calc(50% + 6px);top:6px;bottom:8px;display:flex;align-items:flex-end;justify-content:center;text-align:center">${sampleTag(HEADS.sample + ' ' + dA[0])}</div><div style="position:absolute;left:calc(50% + 42px);right:6px;top:6px;bottom:8px;display:flex;align-items:flex-end;justify-content:center;text-align:center">${sampleTag(HEADS.sample + ' ' + dB[0])}</div>` : '')) +
      (d.row ? `<div style="display:flex;gap:8px">` + [[1, dA], [2, dB]].map(([n, v]) => `<div style="display:flex;align-items:center;gap:4px"><span data-lcs-rowhalf="${n}" style="flex:0 0 auto">${badge(n, 'width:22px;height:22px;font-size:14px')}</span>${row(half, `data-lcs-line="${n}"`, v[4])}</div>`).join('') + `</div>` : '') + `</div>`;
    // the example of a sounded-out spelling: the first sample of the page spelled otherwise than it sounds ("hat for hat"
    // showed nothing, round 2); with none, the line gives no example
    const ex = [sameV, dA, dB].find((v) => v[4] !== v[3]);
    const keyLines = key ? keyLine('data-lcs-accept', KEY.accept) + (d.row ? keyLine('data-lcs-spell', ex ? KEY.spell(ex[3], ex[4]) : KEY.spellNone) : '') : '';
    blocks.push(cream('data-lcs-task="drawing"', label(1, esc(L[0])) + `<div style="flex:1 1 auto;display:grid;grid-template-columns:1fr 1fr;gap:12px">${same}${diff}</div>` + keyLines, 6, 4, 'flex:1 1 auto;'));
    // a row of faces for each character, named by its PICTURE (a kindergartner does not read the name: S12); the tired face
    // carries "z z z" (M4)
    // above the ring of the key, on a white patch: the ring passes behind the letters (it ran through them, round 2)
    const zzz = `<span data-lcs-zzz style="position:absolute;right:-10px;top:-1px;z-index:2;padding:0 2px;border-radius:4px;background:#FFFFFF;font:800 15px/1 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(ZZZ)}</span>`;
    const group = (st, i) => `<div data-lcs-facegroup="${i + 1}" data-lcs-fsid="${attr(st.id)}" style="display:flex;align-items:center;gap:10px;padding:4px 10px 6px;border-radius:12px;background:#FFFFFF;border-left:6px solid ${COL[i + 1]}">` +
      `<span data-lcs-fpic style="position:relative;flex:0 0 auto;display:block">${img(st.pic, 'fpic-' + st.id, 60)}<span style="position:absolute;left:-8px;top:-6px">${badge(i + 1, 'width:22px;height:22px;font-size:14px')}</span></span>` +
      `<div style="display:flex;flex-direction:column;align-items:flex-start;gap:3px"><span data-lcs-fname data-lcs-read style="font:800 18px/1.1 'Nunito',sans-serif;color:${COL[i + 1]}">${esc(st.name)}</span><div style="display:flex;gap:12px">` +
      plan.faces[i].map((fc) => `<span data-lcs-face="${fc}"${fc === st.end[0] ? ' data-lcs-ok="1"' : ''} style="position:relative;display:block">${img(BANK.faces[fc], 'face-' + fc + '-' + (i + 1), 62)}${fc === 'tired' ? zzz : ''}${key && fc === st.end[0] ? ring() : ''}</span>`).join('') + `</div></div></div>`;
    blocks.push(cream('data-lcs-task="faces"', label(2, esc(L[1])) + `<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap">${[plan.s1, plan.s2].map(group).join('')}</div>`, 6, 4));
  }
  return blocks;
}

/* ---------------------------------------------------------------- verify's own copy of the ruled texts and measures ---------------------------------------------------------------- */
const SPEC = {
  INSTR: {
    sort: { 1: 'Two stories can tell about adventures that are alike and different.', 2: 'Two stories can tell about adventures that are alike and different.', 3: 'Two stories can tell about adventures that are alike and different.' },
    draw: { 1: 'We compare two stories: what is the same and what is different.', 2: 'We compare two stories: what is the same and what is different.', 3: 'We compare two stories: what is the same and what is different.' },
  },
  LINES: {
    sort: { 1: ['Listen to both stories. Cut out the cards. Glue each card in Story 1, Story 2, or Both.'],
      2: ['Listen to both stories. Cut out the cards. Glue each card in Story 1, Story 2, or Both.'],
      3: ['Listen to both stories. Cut out the cards. Glue each card in Story 1, Story 2, or Both.', 'Tell a partner one more thing that is the same in both stories.'] },
    draw: { 1: ['Listen to both stories. Draw one thing that is the same. Then draw how the stories are different: Story 1 in box 1, Story 2 in box 2.', 'Your teacher reads the name in each row. Circle the face that shows how that animal felt at the end.'],
      2: ['Listen to both stories. Draw one thing that is the same. Then draw how the stories are different: Story 1 in box 1, Story 2 in box 2.', 'Your teacher reads the name in each row. Circle the face that shows how that animal felt at the end.'],
      3: ['Listen to both stories. Draw one thing that is the same. Then draw how the stories are different: Story 1 in box 1, Story 2 in box 2. Write a word for each.', 'Your teacher reads the name in each row. Circle the face that shows how that animal felt at the end.'] },
  },
  HEADS: { s1: 'Story 1', s2: 'Story 2', both: 'Both', same: 'Same in both', diff: 'Different', sample: 'Sample:' },
  KEYTAG: 'Answer key', ZZZ: 'z z z',
  TELL: ['Sample: “', '” Accept anything both stories tell.'],
  ACCEPT: 'Accept any drawing of a thing both stories tell (Same), and a thing each story tells differently, Story 1 on side 1 (Different).',
  SPELL: ['Sounded-out spellings are right (', ' for ', ').'], SPELL_NONE: 'Sounded-out spellings are right.',
  // pictures (the head of a region: a smaller picture of the character); text; band; fill; cards; glue room; writing rows;
  // the boxes to draw in; the words of a story; glue boxes a region; the share of cards of what happened (at least)
  PIC: 60, HEADPIC: 28, READ: 16, BAND: 40, FILL: 0.8, CARD_W: 96, CARD_H: 86, GLUE: 18, ROW_FLOOR: 110, DRAWH: 96, KEYBOX: 56, DRAWW: 280, WORDS: [60, 90], BOXES: 2, HAPPENED: 2 / 3,
  HOLD: { sort: { 1: { cards: 4, both: 2, s1: 1, s2: 1 }, 2: { cards: 5, both: 1, s1: 2, s2: 2 }, 3: { cards: 5, both: 1, s1: 2, s2: 2 } }, draw: { 1: { faces: 2 }, 2: { faces: 3 }, 3: { faces: 3, row: true } } },
};

function makeTwoStoriesKType({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('two-stories-k: unknown mode ' + mode);
  const desc = `Free printable ${i18n.en.title} Worksheet for Kindergarten. ${INSTR[mode][2]} Download the free PDF.`;
  if (desc.length < 120 || desc.length > 170) throw new Error(`${id}: the description has ${desc.length} letters (120 to 170)`);
  const INFO = { kinds: BANK.kinds, stories: Object.fromEntries(BANK.stories.map((s) => [s.id, s])), faces: BANK.faces, banned: BANK.banned };
  return {
    id, slug, gradeBand: 'K', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,
    // the unit checks (Part 7.6): the sorting page's task made small, one card a task (twoStoriesCheckPage below)
    ...(mode === 'sort' ? { checkPage(args, ctx) { return twoStoriesCheckPage(args, ctx); } } : {}),

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the stories are English (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2];
      const key = !!(ctx && ctx.answerKey);
      // the copy number walks the pages through every pair of stories that fits the level (two copies in a row never share one)
      const plan = drawPage(BANK, mode, lv, ctx.rng, Number(ctx && ctx.variant) || 1);
      const blocks = renderPage(plan, mode, lv, d, key);
      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-ts="${mode}|${lv}" data-lcs-kind="${plan.kind}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:0">` + fRoom(blocks.join('')) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + plan.items.slice(0, 3).join(','), items: plan.items },
      };
    },

    async verify(page) {
      return page.evaluate((S, INFO) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-ts]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsTs.split('|'), lv = +lvS;
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const cs = (e) => getComputedStyle(e);
        const fsz = (e) => parseFloat(cs(e).fontSize);
        const txt = (e) => (e ? e.textContent.replace(/\s+/g, ' ').trim() : '');
        const all = (q, e = root) => [...e.querySelectorAll(q)];
        const one = (q, e = root) => e.querySelector(q);
        const rb = R(root);
        const H = S.HOLD[mode][lv];
        const blockRepeat = (s) => { for (let k = 2; k <= 4; k++) { if (s.length < 2 * k) continue; if ([...s].every((c, i) => c === s[i % k])) return true; }
          const runs = String(s).match(/(.)\1*/g) || []; return runs.length >= 2 && runs[0].length >= 2 && runs.every((r) => r.length === runs[0].length); };
        const hit = (a, b) => { const p = R(a), q = R(b); return p.width && q.width && p.left < q.right && p.right > q.left && p.top < q.bottom && p.bottom > q.top; };

        if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
        if (all('*').some((e) => !e.children.length && /f[iflt]|tt/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, ff, ft, or tt joins its letters (ligatures on)');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('svg, style') && /f[iflt]|tt/.test(n.textContent)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        if (/['"]/.test(root.textContent)) fails.push('a straight apostrophe or quote on the page');
        const imgs = all('img');
        imgs.forEach((im) => { const min = im.dataset.lcsHeadpic != null ? S.HEADPIC : S.PIC; if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < min - 0.5 || R(im).height < min - 0.5) fails.push(`a picture smaller than ${min} px`); });
        // no picture twice on a page, but the character's own picture at the head of its region and of its row of faces;
        // the faces of one row are all different, and a face is no other picture of the page
        { const pics = imgs.filter((im) => !im.closest('[data-lcs-facegroup]') && im.dataset.lcsHeadpic == null).map((im) => im.dataset.lcsPic); if (new Set(pics).size !== pics.length) fails.push('a picture stands twice on the page');
          all('[data-lcs-facegroup]').forEach((g) => { const f = all('[data-lcs-face] img', g).map((im) => im.dataset.lcsPic); if (new Set(f).size !== f.length || f.some((p) => pics.includes(p))) fails.push('a face stands twice in a row, or is another picture of the page'); }); }
        const instr = document.querySelector('[data-lcs-instruction]');
        if (!instr) fails.push('no instruction at the top of the page');
        else if (txt(instr) !== S.INSTR[mode][lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(instr)}"`);
        { const ls = all('[data-lcs-label]'), want = S.LINES[mode][lv];
          if (ls.length !== want.length) fails.push(`${ls.length} task lines, not ${want.length}`);
          ls.forEach((l, i) => { const t = txt(l), m = /^(\d+)\. (.*)$/.exec(t); if (!m || +m[1] !== i + 1 || m[2] !== want[i]) fails.push(`task line ${i + 1} is not the line of level ${lv}: "${t}"`); }); }
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
          b.querySelectorAll('img, span, div, svg').forEach((e) => { if (e.closest('[data-lcs-keytag]')) return; const q = R(e); if (q.width && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5)) fails.push('something leaves its card (' + (Object.keys(e.dataset)[0] || e.tagName) + ')'); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * S.FILL) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        for (let i = 1; i < blocks.length; i++) { const g = R(blocks[i]).top - R(blocks[i - 1]).bottom; if (g > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(g)} px between two parts of the page`); }
        { const gb = rb.bottom - R(blocks[blocks.length - 1]).bottom; if (gb > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(gb)} px under the last block`); }
        // the blank bands a reader sees inside every block (a box to draw in or to glue in counts as printed)
        blocks.forEach((b) => { const iv = [], s = cs(b);
          [b, ...b.querySelectorAll('*')].forEach((e) => {
            const r = R(e); if (!r.width || !r.height || e === b || e.closest('[data-lcs-keytag]')) return;
            if (e.closest('svg') && e.tagName.toLowerCase() !== 'svg') return;
            if (e.tagName.toLowerCase() === 'svg') { if (e.closest('[data-lcs-line]')) { const ls = [...e.querySelectorAll('line')].map((l) => R(l).top); iv.push([ls.length ? Math.min(...ls) : r.top, r.bottom]); } else iv.push([r.top, r.bottom]); return; }
            const st = cs(e), own = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
            const border = ['Top', 'Right', 'Bottom', 'Left'].some((q) => parseFloat(st['border' + q + 'Width']) >= 2 && st['border' + q + 'Style'] !== 'none' && st['border' + q + 'Color'] !== 'rgba(0, 0, 0, 0)');
            if (e.tagName === 'IMG' || own || border || (st.backgroundColor !== 'rgba(0, 0, 0, 0)' && st.backgroundColor !== cs(b).backgroundColor)) iv.push([r.top, r.bottom]);
          });
          iv.sort((p, q) => p[0] - q[0]);
          // from the inside of the border: padding is blank paper too (80 px of padding under the rule of the teacher
          // lines went unreported while the band was measured from the end of the padding, round 2)
          let top = R(b).top + parseFloat(s.borderTopWidth), worst = 0;
          for (const [a, z] of iv) { if (a > top) worst = Math.max(worst, a - top); top = Math.max(top, z); }
          worst = Math.max(worst, R(b).bottom - parseFloat(s.borderBottomWidth) - top);
          if (worst > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(worst)} px that a reader sees in the ${b.dataset.lcsTask || Object.keys(b.dataset)[0] || 'block'} block`); });
        all('[data-lcs-read]').forEach((e) => { if (fsz(e) < S.READ - 0.1) fails.push(`text the teacher reads is ${fsz(e)} px (${S.READ} or more)`); });
        if (!isKey && (all('[data-lcs-ring], [data-lcs-keycard], [data-lcs-sample], [data-lcs-tellsample], [data-lcs-accept], [data-lcs-spell]').length || all('[data-lcs-line] svg text').length)) fails.push('an answer is marked on the page of the child');
        { const ws = root.textContent.toLowerCase().match(/[a-z]+/g) || []; const bad = ws.filter((w) => INFO.banned.includes(w)); if (bad.length) fails.push('a word of the never list: ' + bad.join(', ')); }
        // "Answer key" on the key only, over the corner of the first block, touching no text and no picture
        { const tg = all('[data-lcs-keytag]');
          if (!isKey && tg.length) fails.push('the page of the child says it is the answer key');
          if (isKey) { if (tg.length !== 1 || txt(tg[0]) !== S.KEYTAG || !blocks[0].contains(tg[0])) fails.push('the key does not say "Answer key" at the top');
            else if (R(tg[0]).top < rb.top - 30 || [instr, ...all('[data-lcs-label], [data-lcs-read], [data-lcs-badge], img')].filter(Boolean).some((e) => hit(tg[0], e))) fails.push('the "Answer key" tag touches a text or a picture'); } }

        // the two stories: of one adventure, printed whole, each with its picture, 60 to 90 words; Story 1 and 2 in order
        const st = all('[data-lcs-story]'), ids = st.map((s) => s.dataset.lcsSid), SS = ids.map((x) => INFO.stories[x]);
        if (st.length !== 2 || SS.some((x) => !x) || SS[0].kind !== SS[1].kind || SS[0].kind !== root.dataset.lcsKind) { fails.push('not two stories of one adventure'); return fails; }
        st.forEach((s, i) => { const x = SS[i], t = txt(one('[data-lcs-stext]', s)), n = t.split(/\s+/).length;
          if (t !== x.text.join(' ')) fails.push(`story ${i + 1}: the text is not the story of the bank`);
          if (n < S.WORDS[0] || n > S.WORDS[1]) fails.push(`story ${i + 1}: ${n} words (${S.WORDS[0]} to ${S.WORDS[1]})`);
          if (txt(one('[data-lcs-stitle]', s)) !== x.title || one('[data-lcs-badge]', s).dataset.lcsBadge !== String(i + 1)) fails.push(`story ${i + 1}: its title or number is wrong`);
          const im = one('img', s); if (!im || im.dataset.lcsPic !== x.pic.join('/')) fails.push(`story ${i + 1}: not its own picture`); });
        const KIND = INFO.kinds[SS[0].kind], K = KIND.slots, HAP = KIND.happened;
        const val = (x, slot) => x.slots[slot] && x.slots[slot][0];
        // no story told twice: the pair shares at most two slots of what happened
        if (HAP.filter((s) => val(SS[0], s) === val(SS[1], s)).length > 2) fails.push('the two stories share more than two things that happened: nearly one story twice');
        // a card: its region from the two stories (the same value: Both; different values: the story that states it), and the
        // sentence that states it stands in the story (or stories) it is keyed to
        const regionOf = (slot, value) => { const a = val(SS[0], slot), c = val(SS[1], slot); if (!a || !c) return null; if (a === value && c === value) return 'both'; if (a === value) return 's1'; if (c === value) return 's2'; return null; };
        const proved = (slot, region) => { const want = region === 'both' ? [0, 1] : region === 's1' ? [0] : [1]; return want.every((i) => SS[i].text.includes(SS[i].slots[slot][1]) && txt(one('[data-lcs-stext]', st[i])).includes(SS[i].slots[slot][1])); };

        if (mode === 'sort') {
          const cards = all('[data-lcs-card]');
          if (cards.length !== H.cards) fails.push(`${cards.length} cards, not ${H.cards}`);
          const count = { both: 0, s1: 0, s2: 0 }, slotsUsed = {};
          let hap = 0;
          cards.forEach((c, i) => {
            const [slot, value] = c.dataset.lcsCard.split('='), tag = 'card ' + (i + 1), reg = regionOf(slot, value);
            if (!K[slot] || !K[slot][value]) { fails.push(`${tag}: not a card of the adventure`); return; }
            if (HAP.includes(slot)) hap++;
            if (!reg || reg !== c.dataset.lcsCregion) fails.push(`${tag}: "${K[slot][value][0]}" is not keyed to where the stories put it`);
            else if (!proved(slot, reg)) fails.push(`${tag}: "${K[slot][value][0]}" is not stated in the story it is keyed to`);
            count[c.dataset.lcsCregion] = (count[c.dataset.lcsCregion] || 0) + 1; (slotsUsed[slot] = slotsUsed[slot] || []).push(c.dataset.lcsCregion);
            if (txt(one('[data-lcs-cardtext]', c)) !== K[slot][value][0]) fails.push(`${tag}: its phrase is not the card's`);
            const im = one('img', c); if (!im || im.dataset.lcsPic !== K[slot][value][1] + '/' + K[slot][value][2]) fails.push(`${tag}: its picture is not the thing it names`);
            if (R(c).width < S.CARD_W - 0.5 || R(c).height < S.CARD_H - 0.5) fails.push(`${tag}: ${Math.round(R(c).width)} x ${Math.round(R(c).height)} px (${S.CARD_W} x ${S.CARD_H} or more)`);
            if (cs(c).borderRightStyle !== 'dashed' || cs(c).borderBottomStyle !== 'dashed' || (i && Math.abs(R(c).left - R(cards[i - 1]).right) > 0.6)) fails.push(`${tag}: does not share its cut lines`);
            const rg = document.createRange(); rg.selectNodeContents(c); if ([...rg.getClientRects()].some((q) => q.width > 0.5 && (q.left < R(c).left - 0.5 || q.right > R(c).right + 0.5 || q.bottom > R(c).bottom + 0.5))) fails.push(`${tag}: its phrase leaves the card`);
          });
          if (count.both !== H.both || count.s1 !== H.s1 || count.s2 !== H.s2) fails.push(`the cards are ${count.both} Both, ${count.s1} Story 1, ${count.s2} Story 2 (${H.both}, ${H.s1}, ${H.s2} wanted)`);
          // what happened to the characters, not the setting: at least two thirds of the cards
          if (cards.length && hap < S.HAPPENED * cards.length - 1e-9) fails.push(`only ${hap} of ${cards.length} cards tell what happened (two thirds or more wanted)`);
          Object.entries(slotsUsed).forEach(([s, rs]) => { if (rs.includes('both') ? rs.length !== 1 : rs.slice().sort().join() !== 's1,s2') fails.push(`the slot ${s} is not one Both card or the two values the stories differ in`); });
          const seq = cards.map((c) => ({ both: 'B', s1: '1', s2: '2' })[c.dataset.lcsCregion]).join('');
          if (blockRepeat(seq) || /(.)\1\1/.test(seq) || /^(B+1+2+|B+2+1+|1+B+2+|2+B+1+|1+2+B+|2+1+B+)$/.test(seq)) fails.push('the cards stand in the order of their regions: ' + seq);
          if (root.lastElementChild !== one('[data-lcs-cards]')) fails.push('the cards to cut out are not at the foot of the page');
          // the diagram: two circles that share the middle; each glue box inside ONE region (left: circle 1 only, middle: both
          // circles, right: circle 2 only), 18 px of room around a card on every side, no two boxes touching
          const c1 = one('[data-lcs-circle="1"]'), c2 = one('[data-lcs-circle="2"]');
          if (!c1 || !c2 || !(R(c1).left < R(c2).left && R(c1).right < R(c2).right && R(c1).right > R(c2).left)) fails.push('the diagram has no two circles that share a middle');
          const heads = { s1: S.HEADS.s1, both: S.HEADS.both, s2: S.HEADS.s2 };
          Object.entries(heads).forEach(([r, h]) => { if (txt(one(`[data-lcs-region="${r}"] [data-lcs-headtext]`)) !== h) fails.push(`the region ${h} is not named`); });
          // the head of a region shows its character (Story 1, Story 2) or two overlapping circles (Both)
          [['s1', 0], ['s2', 1]].forEach(([r, i]) => { const hp = one(`[data-lcs-region="${r}"] [data-lcs-headpic]`); if (!hp || hp.dataset.lcsHeadpic !== SS[i].pic.join('/')) fails.push(`the region ${heads[r]} does not show the picture of its character`); });
          if (!one('[data-lcs-region="both"] [data-lcs-bothicon]')) fails.push('the region Both does not show two overlapping circles');
          const inside = (b, c) => R(b).left >= R(c).left + 6 && R(b).right <= R(c).right - 6 && R(b).top >= R(c).top && R(b).bottom <= R(c).bottom;
          const apart = (b, c) => R(b).right <= R(c).left - 6 || R(b).left >= R(c).right + 6;
          const gl = all('[data-lcs-glue]');
          const gc = { both: 0, s1: 0, s2: 0 };
          const cw = Math.max(...cards.map((c) => R(c).width)), ch = Math.max(...cards.map((c) => R(c).height));
          gl.forEach((g, i) => { const r = g.dataset.lcsGlue; gc[r]++;
            const ok = r === 's1' ? inside(g, c1) && apart(g, c2) : r === 's2' ? inside(g, c2) && apart(g, c1) : inside(g, c1) && inside(g, c2);
            if (!c1 || !c2 || !ok) fails.push(`glue box ${i + 1} is not inside its own region only`);
            const bw = R(g).width - 2 * parseFloat(cs(g).borderLeftWidth), bh = R(g).height - 2 * parseFloat(cs(g).borderTopWidth);
            if (bw < cw + 2 * S.GLUE - 0.5 || bh < ch + 2 * S.GLUE - 0.5) fails.push(`glue box ${i + 1} cannot hold its card with ${S.GLUE} px of room`);
            gl.forEach((h, j) => { if (j > i && !(R(g).right <= R(h).left || R(h).right <= R(g).left || R(g).bottom <= R(h).top || R(h).bottom <= R(g).top)) fails.push('two glue boxes touch'); });
            if (!(R(g).top >= R(one(`[data-lcs-region="${r}"]`)).bottom - 0.5) && hit(g, one(`[data-lcs-region="${r}"]`))) fails.push(`glue box ${i + 1} runs under the head of its region`); });
          // the boxes never tell how many cards a region gets: as many in every region, and more boxes than cards
          if (gc.both !== S.BOXES || gc.s1 !== S.BOXES || gc.s2 !== S.BOXES) fails.push(`the glue boxes are ${gc.s1} / ${gc.both} / ${gc.s2}, not ${S.BOXES} in every region`);
          if (gl.length <= cards.length || Object.keys(gc).some((r) => count[r] > gc[r])) fails.push('no spare glue box, or a region with more cards than boxes');
          if (isKey) { Object.keys(gc).forEach((r) => { const want = cards.filter((c) => c.dataset.lcsCregion === r).map((c) => txt(one('[data-lcs-cardtext]', c))).sort().join('|'); const got = all(`[data-lcs-glue="${r}"] [data-lcs-keycard]`).map((e) => e.dataset.lcsKeycard).sort().join('|'); if (want !== got) fails.push(`the key glues other cards in ${r}`); }); }
          // level 3: the key's sample of the partner talk is a thing both stories tell that is no card of the page
          if (H.cards && S.LINES.sort[lv].length === 2) {
            const ts = all('[data-lcs-tellsample]');
            if (isKey) { const t = txt(ts[0]); const m = t.startsWith(S.TELL[0]) && t.endsWith(S.TELL[1]) ? t.slice(S.TELL[0].length, t.length - S.TELL[1].length) : null;
              const fill = (fr, c) => String(fr || '').replace('{card}', c[0]).replace('{word}', c[3] || '');
              const ok = !!m && /^[A-Z][^.!?]*\.$/.test(m) && Object.keys(K).some((s) => val(SS[0], s) === val(SS[1], s) && fill((KIND.tell || {})[s], K[s][val(SS[0], s)]) === m && !(slotsUsed[s] || []).length);
              if (ts.length !== 1 || !ok) fails.push('the key has no sample of one more thing both stories tell (that is no card) as a full sentence with its period inside the quotation marks'); }
          }
        }
        if (mode === 'draw') {
          const boxes = all('[data-lcs-drawbox]');
          if (boxes.length !== 2 || txt(one('[data-lcs-boxhead="same"]')) !== S.HEADS.same || txt(one('[data-lcs-boxhead="diff"]')) !== S.HEADS.diff) fails.push('no box for what is the same and one for what is different');
          { const bh = isKey && H.row ? S.KEYBOX : S.DRAWH; boxes.forEach((b) => { if (R(b).width < S.DRAWW || R(b).height < bh) fails.push(`a box to draw in is smaller than ${S.DRAWW} x ${bh} px`); }); }
          const db = one('[data-lcs-drawbox="diff"]'), dv = db && one('[data-lcs-divider]', db);
          if (!dv || !one('[data-lcs-half="1"]', db) || !one('[data-lcs-half="2"]', db) || Math.abs((R(dv).left + R(dv).right) / 2 - (R(db).left + R(db).right) / 2) > 3) fails.push('the box for what is different has no halves marked 1 and 2');
          // level 3: a row under the Same box, and under the Different box a row in two halves marked 1 and 2
          const rows = all('[data-lcs-line]');
          if (rows.length !== (H.row ? 3 : 0)) fails.push(`${rows.length} rows to write on, not ${H.row ? 3 : 0}`);
          rows.forEach((l) => { const s = l.querySelector('svg'); if (!s || R(s).height < S.ROW_FLOOR - 0.5) fails.push(`a writing row lower than ${S.ROW_FLOOR} px`); });
          if (H.row) { const sb = one('[data-lcs-drawbox="same"]'), r0 = one('[data-lcs-line="same"]'), r1 = one('[data-lcs-line="1"]'), r2 = one('[data-lcs-line="2"]');
            if (!r0 || !r1 || !r2 || R(r0).top < R(sb).bottom || R(r1).top < R(db).bottom || R(r1).right > R(r2).left || Math.abs(R(r1).left - R(db).left) > 40 || Math.abs(R(r2).right - R(db).right) > 4) fails.push('the writing rows are not one under Same and two halves under Different');
            [['1', r1], ['2', r2]].forEach(([n, rr]) => { const b = one(`[data-lcs-rowhalf="${n}"] [data-lcs-badge]`); if (!b || b.dataset.lcsBadge !== n || !rr || R(b).right > R(rr).left + 0.5) fails.push(`the half row ${n} is not marked ${n}`); }); }
          // the samples come from what happened: a thing both stories tell, and the two values of a thing they tell differently
          const shared = HAP.filter((k) => val(SS[0], k) === val(SS[1], k));
          const differ = HAP.filter((k) => val(SS[0], k) !== val(SS[1], k));
          if (!shared.length || !differ.length) fails.push('the two stories share nothing that happened, or tell nothing that happened differently');
          if (isKey) {
            const sam = all('[data-lcs-sample]');
            const sameT = txt(one('[data-lcs-sample]', one('[data-lcs-drawbox="same"]')));
            const sameSlot = shared.find((k) => S.HEADS.sample + ' ' + K[k][val(SS[0], k)][0] === sameT);
            if (!sameSlot) fails.push('the key’s sample of the same is no thing that happened in both stories');
            const ds = db ? all('[data-lcs-sample]', db).map(txt) : [];
            const pairs = differ.map((k) => [K[k][val(SS[0], k)][0], K[k][val(SS[1], k)][0]].map((t) => S.HEADS.sample + ' ' + t).join('|'));
            if (ds.length !== 2 || !pairs.includes(ds.join('|'))) fails.push('the key’s samples of the different are not marked as samples, or not the two values of one thing that happened');
            if (sam.length !== 3) fails.push('the key has not three samples');
            if (sam.some((x) => all('[data-lcs-half]').some((h) => hit(x, h)))) fails.push('a sample of the key covers the number of a half');
            if (txt(one('[data-lcs-accept]')) !== S.ACCEPT) fails.push('the key does not say what drawings count');
            if (H.row) { const dSlot = differ.find((k) => ds.join('|') === [K[k][val(SS[0], k)][0], K[k][val(SS[1], k)][0]].map((t) => S.HEADS.sample + ' ' + t).join('|'));
              const want = sameSlot && dSlot ? [K[sameSlot][val(SS[0], sameSlot)], K[dSlot][val(SS[0], dSlot)], K[dSlot][val(SS[1], dSlot)]] : null;
              const got = ['same', '1', '2'].map((n) => txt(one(`[data-lcs-line="${n}"] svg text`)));
              if (!want || got.some((g, i) => g !== want[i][4])) fails.push('the key does not write a sounded-out word on each writing row');
              const sp = txt(one('[data-lcs-spell]'));
              const ex = want && want.find((v) => v[4] !== v[3]);
              if (!want || sp !== (ex ? S.SPELL[0] + ex[4] + S.SPELL[1] + ex[3] + S.SPELL[2] : S.SPELL_NONE)) fails.push('the key does not say that sounded-out spellings are right, with an example spelled otherwise than it sounds'); }
          }
          const groups = all('[data-lcs-facegroup]');
          if (groups.length !== 2) fails.push(`${groups.length} rows of faces, not 2`);
          const at = []; let angry = 0;
          groups.forEach((g, i) => { const x = SS[i], fs = all('[data-lcs-face]', g), names = fs.map((f) => f.dataset.lcsFace), early = (x.earlier || []).map((e) => e[0]);
            // the row is named by the character's picture (and its name for the teacher)
            const fp = one('[data-lcs-fpic] img', g);
            if (g.dataset.lcsFsid !== x.id || !fp || fp.dataset.lcsPic !== x.pic.join('/') || !one('[data-lcs-fpic] [data-lcs-badge]', g) || one('[data-lcs-fpic] [data-lcs-badge]', g).dataset.lcsBadge !== String(i + 1) || txt(one('[data-lcs-fname]', g)) !== x.name) fails.push(`face row ${i + 1}: not named by the picture and the name of the character of story ${i + 1}`);
            if (names.includes('scared') && names.includes('surprised')) fails.push(`face row ${i + 1}: the scared and the surprised face stand side by side`);
            if (fs.length !== H.faces || !names.includes(x.end[0]) || names.some((nm) => nm !== x.end[0] && !x.never.includes(nm) && !early.includes(nm))) fails.push(`face row ${i + 1}: not the face of the end and ${H.faces - 1} face(s) the story never allows or felt before the end`);
            // a feeling felt earlier is offered (it tests "at the END")
            if (early.length && !early.slice(0, H.faces - 1).every((e) => names.includes(e))) fails.push(`face row ${i + 1}: the feeling felt before the end is not offered`);
            if (names.includes('angry')) angry++;
            if (!x.text[x.text.length - 1].toLowerCase().includes(x.end[0])) fails.push(`face row ${i + 1}: the story does not state the face of the end`);
            // the tired face carries "z z z", touching no other face and no name
            fs.forEach((f) => { const z = one('[data-lcs-zzz]', f); if (f.dataset.lcsFace === 'tired' ? !z || txt(z) !== S.ZZZ || fs.some((o) => o !== f && hit(z, o)) || hit(z, one('[data-lcs-fname]', g)) : z) fails.push(`face row ${i + 1}: the tired face has no "z z z", or a "z z z" touches another face or the name`); });
            // on the key the ring passes BEHIND "z z z": at the centre of the letters they stand on top
            // (the ring takes no pointer events, and elementFromPoint skips such an element: the rings take them while measured)
            fs.forEach((f) => { const z = one('[data-lcs-zzz]', f); if (!z) return; const rs = all('[data-lcs-ring]', g); rs.forEach((r) => { r.style.pointerEvents = 'auto'; });
              const r = z.getBoundingClientRect(), top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
              rs.forEach((x) => { x.style.pointerEvents = 'none'; });
              if (!top || !z.contains(top)) fails.push(`face row ${i + 1}: something covers the "z z z" of the tired face`); });
            const ok = fs.filter((f) => f.dataset.lcsOk); if (ok.length !== 1 || ok[0].dataset.lcsFace !== x.end[0]) fails.push(`face row ${i + 1}: the right face is not keyed`);
            at.push(names.indexOf(x.end[0]));
            if (isKey && (all('[data-lcs-ring]', g).length !== 1 || !ok[0] || !one('[data-lcs-ring]', ok[0]))) fails.push(`face row ${i + 1}: the key does not circle the right face`); });
          if (at.length === 2 && at[0] === at[1]) fails.push('the right faces stand in one place in both rows');
          if (angry > 1) fails.push('the angry face stands in both rows (it is never right: at most one row)');
        }
        return fails;
      }, SPEC, INFO);
    },
  };
}

/* ---------------------------------------------------------------- the item bank of the unit checks ---------------------------------------------------------------- */
/** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): the sorting page's task made small (K-685
 *  Compare Two Stories). One card of the page (drawPage: a slot value both stories state, or the value one story states
 *  where the other states another) and its three places as pictures to circle, in the diagram's order: Story 1 (its
 *  character's picture), Both (the two circles), Story 2. The right place carries data-lcs-correct. THE TEACHER READS: a
 *  card prints no word (its picture only); the two stories, the card's words and the question stand on the card's root as
 *  data-lcs-teacher-reads (the key and the teacher pages print them, the child's form never does). Every card carries its
 *  pair of stories as data-lcs-text. The drawing page (K-686) gives no check: its drawings have no one answer.
 *  FORMS (review en.review-1119-read): one pair a form (CHECK_KIND), and two cards a page, a Both card and a card one
 *  story tells; each carries "pair|slot=value" as data-lcs-text and its place as data-lcs-sortkind. The teacher says the
 *  card's thing as a whole phrase (SAYS) and "circle the two rings" for both, which is what the card shows. */
/** the adventure of each form of the unit check (review en.review-1119-read: no story in both forms): form A compares two
 *  stories of losing and finding, form B two stories of helping a friend; one pair a form, the same on every page of it */
const CHECK_KIND = { A: 'lost', B: 'help' };
/** the form a check page is built for: build-checks seeds its pages "check|<unit>|A…" or "…|B…"; none outside a check */
const checkFormOf = (ctx) => { const m = /^check\|[^|]+\|([AB])\d*\|/.exec(String((ctx && ctx.rng && ctx.rng.seed) || '')); return m ? m[1] : null; };
/** what the teacher says the picture of a card shows (a whole phrase: "Look at the card: gave an umbrella" named a card the
 *  child does not see; review en.review-1119-read) */
const SAYS = { item: 'someone {card}', place: 'the story happens {card}', helper: '{card}', found: 'the lost thing was {card}', weather: 'it was {card}', friend: 'someone {card}', problem: 'a friend was {word}', gift: 'someone {card}' };
function twoStoriesCheckPage({ difficulty, locale }, ctx) {
  if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`two-stories-k check: the stories are English (no ${locale} bank)`);
  const { checkGrid } = require('../../lib/check-page.js');
  const lv = Number(difficulty) || 2, rng = ctx.rng, key = !!(ctx && ctx.answerKey);
  const form = checkFormOf(ctx);
  const cards = [];
  const twoRings = `<svg data-lcs-bothicon width="64" height="42" viewBox="0 0 34 22" style="flex:0 0 auto;display:block"><circle cx="12" cy="11" r="9" fill="none" stroke="${T.teal}" stroke-width="2.5"/><circle cx="22" cy="11" r="9" fill="none" stroke="${T.coral}" stroke-width="2.5"/></svg>`;
  // (no numbered badge: the text of an option is what the check reads as its answer, and a 1 or a 2 would make a card of
  // words a card of numbers; the teacher names each story by its character, whose picture is the option)
  const who = (st) => `<span style="display:block">${img(st.pic, 'checkhead-' + st.id, 62)}</span>`;
  const phrase = (c) => { const v = BANK.kinds[c.kind].slots[c.slot][c.value]; return (SAYS[c.slot] || '{card}').replace('{card}', v[0]).replace('{word}', v[3] || v[0]); };
  const cardOf = (pair, c, kind) => {
    const pid = pair.s1.id + '+' + pair.s2.id;
    // (review en.review-1119-read2: form B's titles both named Turtle while its places were Lamb and Goat) the teacher names each
    // story by the picture that stands for it, as K-649 names each text
    const pictured = (st) => st.pic[1].replace(/_/g, ' ');
    const reads = `Story 1, with the ${pictured(pair.s1)} picture. ${pair.s1.title}: ${pair.s1.text.join(' ')} Story 2, with the ${pictured(pair.s2)} picture. ${pair.s2.title}: ${pair.s2.text.join(' ')} Look at the picture: ${phrase({ ...c, kind })}. Which story tells about it? Circle that story's picture. If both stories tell about it, circle the two rings.`;
    const opts = [['s1', who(pair.s1)], ['both', twoRings], ['s2', who(pair.s2)]].map(([r, html]) => `<span data-lcs-region="${r}" data-lcs-choice="${r}"${r === c.region ? ' data-lcs-correct="1"' : ''} style="display:inline-flex;align-items:center;justify-content:center;min-width:84px;min-height:74px;padding:6px 10px;border:3px solid ${key && r === c.region ? T.teal : 'transparent'};border-radius:18px;background:#FFFFFF">${html}</span>`).join('');
    // (the text id names the pair AND the card: a form's two cards are of one pair, read once)
    return `<div data-lcs-text="${attr(pid + '|' + c.slot + '=' + c.value)}" data-lcs-sortkind="${c.region === 'both' ? 'both' : 'one'}" data-lcs-teacher-reads="${attr(reads)}" style="display:flex;align-items:center;gap:18px;padding:2px 4px">` +
      `<span data-lcs-sortcard="${attr(c.slot + '=' + c.value)}" style="flex:0 0 auto;display:inline-flex;padding:6px;border:2.5px dashed ${T.ink};border-radius:8px;background:#FFFFFF">${img(c.pic, c.pic[1], 76)}</span>` +
      `<div data-lcs-places style="flex:1 1 auto;display:flex;justify-content:space-around;align-items:center">${opts}</div></div>`;
  };
  if (form) {
    // one pair of the form's adventure (the same on every page of the form), and two of its cards: a thing both stories
    // tell, and a thing only one of them tells (review en.review-1119-read: one card of three places is a 33 % guess)
    const kind = CHECK_KIND[form], hap = BANK.kinds[kind].happened, st = BANK.stories.filter((x) => x.kind === kind), fit = [];
    for (const a of st) for (const c of st) if (a !== c) { const k = cmp(a, c, hap); if (pairFits(k, String(lv)) && k.shH.length) fit.push({ s1: a, s2: c, ...k }); }
    if (!fit.length) throw new Error('two-stories-k check: no pair of ' + kind);
    const fixed = require('../../lib/rng.js').makeRng('k685-check|' + form), pair = fit[fixed.int(0, fit.length - 1)];
    const value = (slot, s) => s.slots[slot][0];
    const make = (slot, region) => { const v = value(slot, region === 's2' ? pair.s2 : pair.s1), d = BANK.kinds[kind].slots[slot][v]; return { slot, value: v, region, text: d[0], pic: [d[1], d[2]] }; };
    cards.push(cardOf(pair, make(pair.shH[fixed.int(0, pair.shH.length - 1)], 'both'), kind));
    cards.push(cardOf(pair, make(pair.dfH[fixed.int(0, pair.dfH.length - 1)], fixed.int(0, 1) ? 's2' : 's1'), kind));
  } else {
    const pairsSeen = new Set();
    for (let k = 0; k < 60 && pairsSeen.size < 4; k++) {
      const plan = drawPage(BANK, 'sort', lv, rng, rng.int(1, 400));
      const pid = plan.s1.id + '+' + plan.s2.id;
      if (pairsSeen.has(pid)) continue;
      pairsSeen.add(pid);
      for (const c of plan.cards) cards.push(cardOf(plan, c, plan.kind));
    }
  }
  return { bodyHtml: STYLE + `<div data-lcs-tscheck="${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}">` + checkGrid(shuffle(cards, rng), { cols: 1 }) + `</div>`, meta: {} };
}

module.exports = { makeTwoStoriesKType, tsFaultsOf, drawPage, LEVELS, INSTR, LINES, SPEC, MODES, compare };
