/**
 * talk-verbs.js — the pages of two English teacher-led lessons that waited for one (Daily Teaching System, Stage E-0,
 * operator 2026-11-25: "fix both of them"). Both lessons are taught by the teacher with the class acting or talking; the
 * page is what the class uses during or right after that routine.
 *
 *   verbs     Walk, March, Tiptoe: Act It Out (K-728, L.K.5.d: distinguish shades of meaning among verbs describing the
 *             same general action by acting out the meanings). Each row prints two (level 3: three) verbs of one family
 *             beside a picture that names a way of doing it: a mouse (quiet), a drum (loud), a snail (slow), a
 *             rabbit (fast). The teacher reads the words; the class acts each one out; the child circles the word that
 *             fits the picture. A drawing box closes the page.
 *               level 1  the moving words of day 1 (tiptoe, sneak, stomp, stamp; crawl, creep, run, dash): four pairs
 *               level 2  the words of day 2 (nibble, munch, gobble; sip, slurp, gulp; whisper, shout; tap, bang)
 *               level 3  three words of a family in a row: the one that is most like the picture
 *             ONE right answer by construction: a pair differs on the picture's scale and on no other a picture names
 *             (tiptoe is quieter than stomp; never march against walk, which differ on neither); a row of three is keyed
 *             only at the end of its scale (walk, jog, run: slow = walk, fast = run; jog is never the answer and never
 *             asked about). The right word stands first or second equally often (level 3: every place used).
 *   booktalk  Book Talk: Listen, Then Add On (G1-678, SL.1.1.a: follow agreed-upon rules for discussions; the add-on stems
 *             of SL.1.1.b). The talk rules with pictures, the two talk stems of the routine, and the class question to
 *             check (four questions that fit any story read aloud). "Check", never the British "tick" (US reviewer).
 *               level 1  a model talk about a tale every child knows (three children, the second agrees, the third adds
 *                        on); after the talk the child checks what it did and writes whose idea it added on to
 *               level 2  the model talk; two replies to circle: which one adds on to what a child said (one adds on with
 *                        a reason from the tale, one is about the speaker's own life, one is about another tale)
 *               level 3  the child's own record: who talked before me and what they said, how I added on, the checks
 *             Nothing the child writes or checks is right or wrong; the circled replies of level 2 have one right answer.
 *             The talk goes around the group twice, so the child who answered first also adds on (teacher note).
 *
 * English only (American). Themeless: a copy is another set of rows or another tale. PDF only. The banks are checked when
 * this file loads; no picture is looked up at load.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const { _parts } = require('./info-text.js');
const { W, esc, shuffle, line } = _parts;

// ---------- verbs (K-728) ----------
const CUES = {
  quiet: { theme: 'forest creatures', noun: 'mouse', word: 'quiet' },
  loud: { theme: 'music', noun: 'drum', word: 'loud' },   // the US reviewer (2026-11-25): a calm, sitting elephant does not show loud; a drum does
  slow: { theme: 'forest creatures', noun: 'snail', word: 'slow' },
  fast: { theme: 'pets', noun: 'rabbit', word: 'fast' },  // no library animal runs: the caption, read aloud, carries "fast"
};
const SCALE = { sound: ['quiet', 'loud'], speed: ['slow', 'fast'] };
/** the plain word of a family is the middle of its scale, never an end: walk is not quiet (beside stomp) or slow (beside
 *  run) as a mouse or a snail is, talk is not loud, eat is not slow (US reviewer 2026-11-25, who found "loud = talk" and
 *  "quiet = walk" keyed). A plain word stands only in the MIDDLE of a row of three, where it is never asked about. */
const PLAIN = ['walk', 'march', 'talk', 'eat', 'drink', 'knock'];
/** [low, high] on the scale: the low word fits quiet / slow, the high word fits loud / fast; both words carry the
 *  scale's meaning, so either end may be asked. Day 1: the moving words. */
const PAIRS1 = [
  { s: 'sound', w: ['tiptoe', 'stomp'] }, { s: 'sound', w: ['sneak', 'stomp'] },   // stamp went: it means stomp (the reviewer)
  { s: 'speed', w: ['crawl', 'run'] }, { s: 'speed', w: ['crawl', 'dash'] }, { s: 'speed', w: ['creep', 'run'] }, { s: 'speed', w: ['creep', 'dash'] },
];
/** Day 2: eating, drinking, talking, hitting (toss / fling went: they differ in force, not speed) */
const PAIRS2 = [
  { s: 'speed', w: ['nibble', 'gobble'] }, { s: 'sound', w: ['nibble', 'munch'] }, { s: 'speed', w: ['sip', 'gulp'] },
  { s: 'sound', w: ['whisper', 'shout'] }, { s: 'sound', w: ['sip', 'slurp'] }, { s: 'sound', w: ['tap', 'bang'] },
];
/** three words of a family, low to high; only the two ends are ever keyed, the plain middle word never */
const TRIPLES = [
  { s: 'speed', w: ['crawl', 'walk', 'run'] }, { s: 'speed', w: ['creep', 'walk', 'dash'] }, { s: 'speed', w: ['nibble', 'eat', 'gobble'] }, { s: 'speed', w: ['sip', 'drink', 'gulp'] },
  { s: 'sound', w: ['whisper', 'talk', 'shout'] }, { s: 'sound', w: ['tiptoe', 'walk', 'stomp'] }, { s: 'sound', w: ['tap', 'knock', 'bang'] }, { s: 'sound', w: ['tiptoe', 'march', 'stomp'] },
];
/** The page plans: a copy N of a level is plan (N - 1) mod 4 (row order and word places drawn by the seed). Each plan asks
 *  each scale once at each end, keys no word twice (the reviewer found sip keyed for quiet AND slow on one page), and the
 *  four plans together key every end word of the level at least once and every pair at both ends where the bank allows
 *  it. A row is "<words>:<picture>". Checked when this file loads. */
const PLANS = {
  1: [['tiptoe|stomp:quiet', 'sneak|stomp:loud', 'crawl|run:slow', 'creep|dash:fast'],
      ['tiptoe|stomp:loud', 'sneak|stomp:quiet', 'creep|run:slow', 'crawl|dash:fast'],
      ['sneak|stomp:loud', 'tiptoe|stomp:quiet', 'crawl|dash:slow', 'creep|run:fast'],
      ['sneak|stomp:quiet', 'tiptoe|stomp:loud', 'creep|dash:slow', 'crawl|run:fast']],
  2: [['nibble|gobble:slow', 'sip|gulp:fast', 'whisper|shout:quiet', 'tap|bang:loud'],
      ['nibble|gobble:fast', 'sip|gulp:slow', 'tap|bang:quiet', 'nibble|munch:loud'],
      ['nibble|gobble:slow', 'sip|gulp:fast', 'sip|slurp:quiet', 'whisper|shout:loud'],
      ['nibble|gobble:fast', 'sip|gulp:slow', 'nibble|munch:quiet', 'sip|slurp:loud']],
  3: [['crawl|walk|run:slow', 'nibble|eat|gobble:fast', 'whisper|talk|shout:quiet', 'tap|knock|bang:loud'],
      ['creep|walk|dash:fast', 'sip|drink|gulp:slow', 'tiptoe|walk|stomp:loud', 'tap|knock|bang:quiet'],
      ['crawl|walk|run:fast', 'creep|walk|dash:slow', 'tiptoe|march|stomp:quiet', 'whisper|talk|shout:loud'],
      ['nibble|eat|gobble:slow', 'sip|drink|gulp:fast', 'tiptoe|walk|stomp:quiet', 'tiptoe|march|stomp:loud']],
};
const FAMILY = { tiptoe: 'feet', sneak: 'feet', stomp: 'feet', march: 'feet', walk: 'feet', run: 'feet', crawl: 'feet', creep: 'feet', dash: 'feet',
  nibble: 'eat', munch: 'eat', gobble: 'eat', eat: 'eat', sip: 'drink', slurp: 'drink', gulp: 'drink', drink: 'drink',
  whisper: 'talk', talk: 'talk', shout: 'talk', tap: 'hit', knock: 'hit', bang: 'hit' };

// ---------- booktalk (G1-678) ----------
const RULES = [
  { pic: { theme: 'body parts', noun: 'eye' }, text: 'Look at the person talking.' },
  { pic: { theme: 'body parts', noun: 'ear' }, text: 'Listen to every word.' },
  { pic: { theme: 'body parts', noun: 'mouth' }, text: 'One person talks at a time.' },
  { pic: null, text: 'Add on to what was just said.' },
];
const STEMS = ['I agree with ___ because ___.', 'I want to add ___.'];
const QUESTIONS = ['Which character changed?', 'What was the problem?', 'Who did you like best? Why?', 'What was the best part? Why?'];   // one line each in a half-width cell
const TICKS = ['I looked at the person talking.', 'I waited for my turn.', 'I said one idea about the story.', 'I added on to an idea.'];
/** four tales a US first grader knows; a model talk (the second child agrees, the third adds on) and two replies to judge */
const TALES = [
  { id: 'pigs', tale: 'The Three Little Pigs',
    talk: [['Mia', 'I think the third pig was smart.'], ['Leo', 'I agree with Mia because his brick house did not fall down.'], ['Ava', 'I want to add that he boiled water in the fireplace.']],
    items: [
      { who: 'Sam', said: 'I think the wolf was mean.', right: 'I agree with Sam because he blew down two houses.', own: 'I agree with Sam because I like my dog.', other: 'I agree with Sam because Goldilocks ate the porridge.' },
      { who: 'Zoe', said: 'I think the third pig worked hard.', right: 'I want to add that he built his house with bricks.', own: 'I want to add that I have a new red bike with a bell.', other: 'I want to add that the hare took a long nap under a tree.' },
    ] },
  { id: 'bears', tale: 'Goldilocks and the Three Bears',
    talk: [['Omar', 'I think Goldilocks was not polite.'], ['Rosa', 'I agree with Omar because she went in without asking.'], ['Ben', 'I want to add that she ate Baby Bear’s porridge.']],
    items: [
      { who: 'Kai', said: 'I think Baby Bear was sad.', right: 'I agree with Kai because his chair was broken.', own: 'I agree with Kai because I like rainy days.', other: 'I agree with Kai because the wolf blew the house down.' },
      { who: 'Lily', said: 'I think the bears were surprised.', right: 'I want to add that they found Goldilocks in Baby Bear’s bed.', own: 'I want to add that my mom has a red car.', other: 'I want to add that the hen planted the wheat.' },
    ] },
  { id: 'hen', tale: 'The Little Red Hen',
    talk: [['Jamal', 'I think the hen worked hard.'], ['Ana', 'I agree with Jamal because she planted the wheat.'], ['Leo', 'I want to add that she baked the bread too.']],
    items: [
      { who: 'Mia', said: 'I think the other animals were lazy.', right: 'I agree with Mia because they would not help.', own: 'I agree with Mia because my cat has soft gray fur.', other: 'I agree with Mia because the bears went for a walk.' },
      { who: 'Sam', said: 'I think the hen should eat the bread.', right: 'I want to add that she made the bread all by herself.', own: 'I want to add that I like toast.', other: 'I want to add that the tortoise won the race.' },
    ] },
  { id: 'race', tale: 'The Tortoise and the Hare',
    talk: [['Zoe', 'I think the hare was too proud.'], ['Omar', 'I agree with Zoe because he made fun of the tortoise.'], ['Rosa', 'I want to add that he took a nap in the race.']],
    items: [
      { who: 'Ben', said: 'I think the tortoise did not give up.', right: 'I agree with Ben because he kept going the whole race.', own: 'I agree with Ben because I can run fast.', other: 'I agree with Ben because the third pig built a brick house.' },
      { who: 'Kai', said: 'I think the hare was surprised at the end.', right: 'I want to add that the tortoise crossed the line first.', own: 'I want to add that I have a pet fish.', other: 'I want to add that Goldilocks ran out of the house.' },
    ] },
];
/** the words that name the tale's own characters and things: a reply that adds on names one; an "other tale" reply names one of another tale */
const TALE_WORDS = { pigs: ['pig', 'wolf', 'house', 'brick', 'brothers', 'blew'], bears: ['goldilocks', 'bear', 'porridge', 'chair', 'bed'], hen: ['hen', 'wheat', 'bread', 'animals', 'help'], race: ['tortoise', 'hare', 'race', 'line', 'nap'] };

const LEVELS = {
  verbs: { 1: { rows: 4, bank: 'pairs1' }, 2: { rows: 4, bank: 'pairs2' }, 3: { rows: 4, bank: 'triples' } },
  booktalk: { 1: { part: 'model' }, 2: { part: 'judge' }, 3: { part: 'record' } },
};

// ---------- bank checks (at load) ----------
{
  const f = [];
  const known = (w) => FAMILY[w] || f.push('no family for "' + w + '"');
  for (const [name, bank] of [['pairs1', PAIRS1], ['pairs2', PAIRS2]]) {
    const seen = new Set();
    for (const p of bank) {
      if (!SCALE[p.s] || p.w.length !== 2 || p.w[0] === p.w[1]) f.push(name + ': a bad pair ' + p.w);
      p.w.forEach(known);
      if (FAMILY[p.w[0]] !== FAMILY[p.w[1]]) f.push(name + ': ' + p.w + ' are not one family (the same general action)');
      const k = p.w.slice().sort().join('|'); if (seen.has(k)) f.push(name + ': ' + p.w + ' twice'); seen.add(k);
    }
  }
  if (PAIRS1.some((p) => FAMILY[p.w[0]] !== 'feet')) f.push('day 1 holds a word that is not a walking word');
  if (PAIRS2.some((p) => FAMILY[p.w[0]] === 'feet')) f.push('day 2 holds a walking word');
  // march and walk differ on neither scale a picture names: never in one pair or one row of three
  for (const p of [...PAIRS1, ...PAIRS2, ...TRIPLES]) if (p.w.includes('march') && p.w.includes('walk')) f.push('march and walk in one row: ' + p.w);
  // a plain word is never an end (it would be keyed as quiet, loud, slow or fast)
  for (const p of [...PAIRS1, ...PAIRS2, ...TRIPLES]) if (PLAIN.includes(p.w[0]) || PLAIN.includes(p.w[p.w.length - 1])) f.push('a plain word at an end: ' + p.w);
  // every scale of every level can be asked at both ends by two different rows
  for (const [name, bank] of [['pairs1', PAIRS1], ['pairs2', PAIRS2], ['triples', TRIPLES]]) for (const s of Object.keys(SCALE)) if (bank.filter((p) => p.s === s).length < 2) f.push(name + ': fewer than two rows on the ' + s + ' scale');
  for (const t of TRIPLES) { if (t.w.length !== 3 || new Set(t.w).size !== 3) f.push('a bad row of three ' + t.w); t.w.forEach(known); if (new Set(t.w.map((w) => FAMILY[w])).size !== 1) f.push(t.w + ' are not one family'); }
  if (TALES.length < 4) f.push('fewer than four tales');
  for (const t of TALES) {
    if (t.talk.length !== 3 || !t.talk[1][1].startsWith('I agree with ' + t.talk[0][0] + ' because ') || !t.talk[2][1].startsWith('I want to add that ')) f.push(t.id + ': the model talk does not agree, then add on');
    const words = (s) => String(s).toLowerCase().replace(/’s/g, '').match(/[a-z]+/g) || [];
    const mine = TALE_WORDS[t.id], others = Object.entries(TALE_WORDS).filter(([k]) => k !== t.id).flatMap(([, v]) => v).filter((w) => !mine.includes(w));
    for (const it of t.items) {
      const stem = it.right.startsWith('I agree with ') ? 'I agree with ' + it.who + ' because ' : 'I want to add that ';
      if (!it.right.startsWith(stem) || !it.own.startsWith(stem) || !it.other.startsWith(stem)) f.push(t.id + ': the three replies to ' + it.who + ' do not share one stem (the stem would tell the answer)');
      if (!words(it.right).some((w) => mine.some((m) => w.startsWith(m)))) f.push(t.id + ': the reply that adds on names nothing of the tale: ' + it.right);
      if (words(it.own).some((w) => mine.concat(others).some((m) => w.startsWith(m)))) f.push(t.id + ': the reply about one\'s own life names a tale: ' + it.own);
      if (!words(it.other).some((w) => others.some((m) => w.startsWith(m))) || words(it.other).some((w) => mine.some((m) => w === m))) f.push(t.id + ': the reply about another tale does not name another tale only: ' + it.other);
      const L = [it.right, it.own, it.other].map((s) => s.length); if (Math.max(...L) - Math.min(...L) > 22) f.push(t.id + ': the three replies to ' + it.who + ' differ in length by ' + (Math.max(...L) - Math.min(...L)) + ' letters (the longest would tell the answer)');
    }
  }
  {
    const all = TALES.flatMap((t) => t.items), rank = (it) => [it.own, it.other].filter((x) => x.length < it.right.length).length;   // 2 = the right reply is the longest
    const longest = all.filter((it) => rank(it) === 2).length, shortest = all.filter((it) => rank(it) === 0).length;
    if (longest > all.length / 2 || shortest > all.length / 2 || longest < 2 || shortest < 2) f.push('the right reply is the longest in ' + longest + ' and the shortest in ' + shortest + ' of ' + all.length + ' items (a length tell)');
  }
  for (const [lv, plans] of Object.entries(PLANS)) {
    const bank = lv === '1' ? PAIRS1 : lv === '2' ? PAIRS2 : TRIPLES, keyedAll = new Set(), askedEnds = new Set();
    if (plans.length !== 4) f.push('level ' + lv + ': not four plans');
    plans.forEach((plan, i) => {
      const keyed = [];
      const cues = plan.map((x) => { const [w, cue] = x.split(':'); const p = bank.find((b) => b.w.join('|') === w); if (!p) { f.push('level ' + lv + ' plan ' + (i + 1) + ': no row ' + w); return cue; } if (!SCALE[p.s].includes(cue)) f.push('level ' + lv + ' plan ' + (i + 1) + ': ' + cue + ' is not on the ' + p.s + ' scale of ' + w); const word = SCALE[p.s].indexOf(cue) ? p.w[p.w.length - 1] : p.w[0]; keyed.push(word); keyedAll.add(word); askedEnds.add(w + ':' + cue); return cue; });
      if (plan.length !== 4 || ['quiet', 'loud', 'slow', 'fast'].some((c) => cues.filter((x) => x === c).length !== 1)) f.push('level ' + lv + ' plan ' + (i + 1) + ': not each picture once');
      if (new Set(keyed).size !== keyed.length) f.push('level ' + lv + ' plan ' + (i + 1) + ': a word is the answer of two rows (' + keyed + ')');
    });
    for (const p of bank) for (const e of [p.w[0], p.w[p.w.length - 1]]) if (!keyedAll.has(e)) f.push('level ' + lv + ': ' + e + ' is the answer of no plan');
    for (const p of bank) if (!SCALE[p.s].some((c) => askedEnds.has(p.w.join('|') + ':' + c))) f.push('level ' + lv + ': the row ' + p.w + ' is in no plan');
  }
  if (f.length) throw new Error('talk-verbs: ' + f.join('; '));
}

// ---------- drawing ----------
const img = (p, size, attrs = '') => `<img class="ws-icon" ${attrs} data-lcs-pic="${esc(p.theme + '/' + p.noun)}" src="${fileUri(p.theme, p.noun)}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain">`;
const card = (attrs, inner, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:5px;padding:8px 14px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (html, px = 19) => `<div data-lcs-label style="font:700 ${px}px/1.3 'Nunito',sans-serif;color:${T.ink}">${html}</div>`;
const teal = (x) => `<b style="font-weight:800;color:${T.teal}">${x}</b>`;
const tick = () => `<span data-lcs-tickbox style="flex:0 0 auto;display:inline-block;width:30px;height:30px;border:2.5px solid ${T.ink};border-radius:7px;background:#FFFFFF"></span>`;
const plus = (size) => `<svg data-lcs-plus width="${size}" height="${size}" viewBox="0 0 40 40" style="flex:0 0 auto;display:block"><circle cx="20" cy="20" r="18" fill="${T.teal}"/><path d="M20 10v20M10 20h20" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/></svg>`;

/** the right word of each row in every place equally often: n rows over k places (no place three times in a row) */
function places(n, k, rng) {
  for (let t = 0; t < 400; t++) {
    const p = Array.from({ length: n }, () => rng.int(0, k - 1));
    const c = Array.from({ length: k }, (_, i) => p.filter((x) => x === i).length);
    if (k === 2 ? c[0] !== c[1] : c.some((x) => !x)) continue;
    if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) continue;
    if (k === 3 && /^(012|210)/.test(p.join(''))) continue;
    return p;
  }
  return k === 2 ? [0, 1, 1, 0].slice(0, n) : [1, 0, 2, 1].slice(0, n);
}

function verbsPage(lv, rng, key, copy) {
  const bank = lv === 1 ? PAIRS1 : lv === 2 ? PAIRS2 : TRIPLES;
  // two rows of each scale, one asked about its low end and one about its high end: every page shows all four pictures once
  const n = Number(copy) > 0 ? Number(copy) : rng.int(1, 4);   // the copy chooses the plan; a page built with no copy (a maker) draws one
  const plan = PLANS[lv][(n - 1) % PLANS[lv].length];
  const chosen = shuffle(plan.map((x) => { const [w, cue] = x.split(':'); return { r: bank.find((p) => p.w.join('|') === w), end: SCALE.sound.concat(SCALE.speed).indexOf(cue) % 2 }; }), rng);
  const rows = chosen.map((x) => x.r), ends = chosen.map((x) => x.end);
  const k = lv === 3 ? 3 : 2;
  const at = places(rows.length, k, rng);
  const items = [];
  const html = rows.map((r, n) => {
    const cueName = SCALE[r.s][ends[n]], cue = CUES[cueName];
    const right = ends[n] ? r.w[r.w.length - 1] : r.w[0];
    const others = r.w.filter((w) => w !== right);
    let list; if (k === 2) list = at[n] ? [others[0], right] : [right, others[0]];
    else { const o = shuffle(others, rng); list = o.slice(); list.splice(at[n], 0, right); }
    items.push(cueName + ': ' + r.w.join('/'));   // what the row asks, whatever order it prints in (build-waves compares copies by these)
    return `<div data-lcs-vrow="${n + 1}" data-lcs-cue="${cueName}" data-lcs-want="${right}" data-lcs-scale="${r.s}" data-lcs-series="${r.w.join('|')}" style="display:flex;align-items:center;gap:16px;padding:8px 14px;border-radius:14px;background:${T.cream}">` +
      `<span style="flex:0 0 auto;font:800 22px/1 'Nunito',sans-serif;color:${T.teal}">${n + 1}.</span>` +
      `<figure data-lcs-cuefig style="flex:0 0 96px;margin:0;display:flex;flex-direction:column;align-items:center;gap:2px">${img(cue, 72)}<figcaption style="font:800 18px/1.1 'Nunito',sans-serif;color:${T.teal}">${cue.word}</figcaption></figure>` +
      `<div data-lcs-words style="flex:1 1 auto;display:flex;justify-content:space-around;align-items:center;gap:10px">` +
      list.map((w) => `<span data-lcs-word="${w}"${w === right ? ' data-lcs-ok="1"' : ''} style="font:800 ${k === 2 ? 32 : 28}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:4px 18px;border:3px solid ${key && w === right ? T.teal : 'transparent'};border-radius:999px">${w}</span>`).join('') +
      `</div></div>`;
  }).join('');
  const draw = `<div data-lcs-drawbox style="flex:1 1 auto;min-height:150px;display:flex;flex-direction:column;padding:8px 14px;border:2.5px dashed ${T.teal};border-radius:14px;background:#FFFFFF">` +
    `<span style="font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}">Draw yourself doing one of these actions.</span></div>`;
  return { html: html + draw, items };
}

function talkTop(rng, withQuestion) {
  const rules = `<div data-lcs-rules style="display:grid;grid-template-columns:1fr 1fr;gap:6px 14px;padding:8px 14px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">` +
    `<div style="grid-column:1 / -1;font:700 20px/1.2 'Baloo 2',cursive;color:${T.teal}">Our book talk rules</div>` +
    RULES.map((r) => `<div data-lcs-rule style="display:flex;align-items:center;gap:10px;min-width:0">${r.pic ? img(r.pic, 40) : plus(40)}<span style="font:700 18px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(r.text)}</span></div>`).join('') + `</div>`;
  const stems = `<div data-lcs-stems style="display:flex;align-items:center;flex-wrap:wrap;gap:6px 14px;padding:7px 14px;border:2.5px dashed ${T.teal};border-radius:14px;background:#FFFFFF">` +
    `<span style="font:700 19px/1.2 'Baloo 2',cursive;color:${T.teal}">Talk stems</span>` +
    STEMS.map((s) => `<span data-lcs-stem style="font:800 19px/1.25 'Nunito',sans-serif;color:${T.ink};padding:2px 12px;border-radius:999px;background:${T.cream}">${esc(s)}</span>`).join('') + `</div>`;
  const q = withQuestion ? card('data-lcs-ourq="1"', label(teal('Our question') + ' Check the one we talk about.') +
    `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 14px">${QUESTIONS.map((x) => `<div data-lcs-q style="display:flex;align-items:center;gap:9px">${tick()}<span style="font:700 18px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(x)}</span></div>`).join('')}</div>`) : '';
  return rules + stems + q;
}
function modelTalk(t) {
  return card('data-lcs-model="1"', label(teal('How a book talk sounds') + ' (about ' + esc(t.tale) + '):', 18) +
    t.talk.map(([who, s], i) => `<div data-lcs-said="${i + 1}" style="display:flex;align-items:flex-start;gap:10px"><span style="flex:0 0 66px;font:800 19px/1.3 'Nunito',sans-serif;color:${T.teal}">${who}:</span><span style="font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}">“${esc(s)}”</span></div>`).join(''));
}
function afterTalk(inner, rowH, nameLine) {
  return card('data-lcs-after="1"', label(teal('After the talk') + ' Check what you did.') +
    `<div style="display:grid;grid-template-columns:1fr 1fr;gap:7px 14px">${TICKS.map((x) => `<div data-lcs-tick style="display:flex;align-items:center;gap:9px">${tick()}<span style="font:700 18px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(x)}</span></div>`).join('')}</div>` +
    (nameLine ? `<div data-lcs-addedto style="display:flex;align-items:flex-end;gap:10px"><span style="flex:0 0 auto;padding-bottom:10px;font:700 19px/1.2 'Nunito',sans-serif;color:${T.ink}">I added on to what</span>${line({ w: 220, h: rowH })}<span style="flex:0 0 auto;padding-bottom:10px;font:700 19px/1.2 'Nunito',sans-serif;color:${T.ink}">said.</span></div>` : ''));
}
function booktalkPage(lv, rng, key, copy) {
  // the copy chooses the tale (copies 1-4 hold the four tales); a page built with no copy draws one
  const t = Number(copy) > 0 ? TALES[(Number(copy) - 1) % TALES.length] : rng.sample(TALES, 1)[0], inner = W - 28, rowH = lv === 3 ? 50 : 54;   // level 3 holds five rows: the Grade 1 minimum of 50 px
  let body = '', items = lv === 3 ? ['record'] : [t.id];   // the record page names no tale: every copy is one page
  // level 1 (the easiest): a drawing box takes the rest of the page, which the blocks filled only to 77 % (an empty band);
  // a drawing of the part of the story the group talked about suits the children who write little
  if (lv === 1) body = talkTop(rng, true) + modelTalk(t) + afterTalk(inner, rowH, true) + `<div data-lcs-drawbox style="flex:1 1 auto;min-height:110px;display:flex;flex-direction:column;padding:8px 14px;border:2.5px dashed ${T.teal};border-radius:14px;background:#FFFFFF"><span style="font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}">Draw the part of the story we talked about.</span></div>`;
  if (lv === 2) {
    let pl; for (let n = 0; n < 50; n++) { pl = [rng.int(0, 2), rng.int(0, 2)]; if (pl[0] !== pl[1]) break; }
    const judge = t.items.map((it, n) => {
      const wrong = shuffle([it.own, it.other], rng); const list = wrong.slice(); list.splice(pl[n], 0, it.right);
      items.push(it.who + ' -> ' + it.right);
      return `<div data-lcs-judge="${n + 1}" data-lcs-want="${pl[n]}" style="display:flex;flex-direction:column;gap:2px">` +
        label(`<span style="color:${T.teal}">${n + 1}.</span> ${esc(it.who)} said, “${esc(it.said)}”`, 18) +
        `<div data-lcs-choices style="display:flex;flex-direction:column;align-items:flex-start;gap:0;padding-left:20px">` +
        list.map((c, i) => `<span data-lcs-choice="${i}"${i === pl[n] ? ' data-lcs-ok="1"' : ''} style="font:700 18px/1.3 'Nunito',sans-serif;color:${T.ink};padding:1px 12px;border:2.5px solid ${key && i === pl[n] ? T.teal : 'transparent'};border-radius:999px">${esc(c)}</span>`).join('') + `</div></div>`;
    }).join('');
    body = talkTop(rng, false) + modelTalk(t) + card('data-lcs-judges="1"', judge) + afterTalk(inner, rowH, true);
  }
  if (lv === 3) {
    body = talkTop(rng, true) +
      card('data-lcs-before="1"', `<div data-lcs-who style="display:flex;align-items:flex-end;gap:10px"><span style="flex:0 0 auto;padding-bottom:10px;font:700 19px/1.2 'Nunito',sans-serif;color:${T.ink}">${teal('Before I added on,')}</span>${line({ w: 200, h: rowH })}<span style="flex:0 0 auto;padding-bottom:10px;font:700 19px/1.2 'Nunito',sans-serif;color:${T.ink}">said:</span></div>` + line({ w: inner, h: rowH }) + line({ w: inner, h: rowH })) +
      card('data-lcs-added="1"', label(teal('I added on.') + ' Start with a talk stem.') + line({ w: inner, h: rowH }) + line({ w: inner, h: rowH })) +
      afterTalk(inner, rowH, false);
  }
  return { html: body, items };
}

function makeTalkVerbsType({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('talk-verbs: unknown mode ' + mode);
  return {
    id, slug, gradeBand: id.startsWith('K-') ? 'K' : 'G1', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,
    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: an English page (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, rng = ctx.rng, key = !!(ctx && ctx.answerKey);
      const r = mode === 'verbs' ? verbsPage(lv, rng, key, ctx.variant) : booktalkPage(lv, rng, key, ctx.variant);
      return {
        bodyHtml: `<div data-ws-content data-lcs-talkverbs="${mode}|${lv}"${key ? ' data-lcs-iskey="1"' : ''} style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:${mode === 'booktalk' ? 6 : 8}px;min-height:0">${r.html}</div>`,
        meta: { items: r.items },
      };
    },
    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-talkverbs]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsTalkverbs.split('|'), lv = +lvS, isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect(), rb = R(root);
        if (/["']/.test(root.textContent)) fails.push('a straight quote or apostrophe');
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
        const blocks = [...root.children];
        if (!blocks.length) fails.push('nothing on the page');
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
          b.querySelectorAll('*').forEach((e) => { const q = R(e); if (q.width && (q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.bottom > r.bottom + 0.5)) fails.push(`something leaves block ${i + 1}`); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        if (mode === 'verbs') {
          const rows = [...root.querySelectorAll('[data-lcs-vrow]')];
          if (rows.length !== 4) fails.push(rows.length + ' rows (4 wanted)');
          const k = lv === 3 ? 3 : 2, place = [];
          rows.forEach((r, n) => {
            const words = [...r.querySelectorAll('[data-lcs-word]')], ok = words.filter((w) => w.dataset.lcsOk);
            if (words.length !== k || ok.length !== 1 || new Set(words.map((w) => w.textContent)).size !== k) fails.push(`row ${n + 1}: not ${k} different words with one right`);
            if (ok[0] && ok[0].textContent !== r.dataset.lcsWant) fails.push(`row ${n + 1}: the keyed word is not the one the picture asks for`);
            const series = r.dataset.lcsSeries.split('|'), lowCue = ['quiet', 'slow'].includes(r.dataset.lcsCue);
            if (r.dataset.lcsWant !== (lowCue ? series[0] : series[series.length - 1])) fails.push(`row ${n + 1}: the answer is not the end of its scale the picture names`);
            place.push(words.findIndex((w) => w.dataset.lcsOk));
            const im = r.querySelector('[data-lcs-cuefig] img'); if (!im || R(im).width < 60) fails.push(`row ${n + 1}: the picture is smaller than 60 px`);
            words.forEach((w) => { if (parseFloat(getComputedStyle(w).fontSize) < 26) fails.push(`row ${n + 1}: a word printed too small for the teacher to point to`); if (!isKey && getComputedStyle(w).borderColor !== 'rgba(0, 0, 0, 0)' && getComputedStyle(w).borderTopColor !== 'rgba(0, 0, 0, 0)') fails.push('a word is ringed on the child\'s page'); });
          });
          if (k === 2 && place.filter((x) => x === 0).length !== 2) fails.push('the right word is not first in two rows and second in two: ' + place.join(''));
          if (k === 3 && new Set(place).size !== 3) fails.push('the right word does not stand in all three places: ' + place.join(''));
          const d = root.querySelector('[data-lcs-drawbox]'); if (!d || R(d).height < 140) fails.push('no drawing box of 140 px or more');
        } else {
          if (root.querySelectorAll('[data-lcs-rule]').length !== 4 || root.querySelectorAll('[data-lcs-stem]').length !== 2) fails.push('the rules or the talk stems are missing');
          const ticks = root.querySelectorAll('[data-lcs-tick]').length; if (ticks !== 4) fails.push(ticks + ' things to tick after the talk');
          root.querySelectorAll('[data-lcs-tickbox]').forEach((b) => { if (R(b).width < 28) fails.push('a tick box under 28 px'); });
          root.querySelectorAll('[data-lcs-line] svg').forEach((s) => { if (R(s).height < 50) fails.push('a writing row under 50 px'); });
          const ourq = root.querySelectorAll('[data-lcs-q]').length; if (ourq !== (lv === 2 ? 0 : 4)) fails.push(ourq + ' class questions');
          const model = root.querySelectorAll('[data-lcs-said]').length; if (model !== (lv === 3 ? 0 : 3)) fails.push(model + ' lines of model talk');
          const judges = [...root.querySelectorAll('[data-lcs-judge]')];
          if (judges.length !== (lv === 2 ? 2 : 0)) fails.push(judges.length + ' replies to judge');
          judges.forEach((j, n) => { const all = [...j.querySelectorAll('[data-lcs-choice]')]; if (all.length !== 3 || all.filter((e) => e.dataset.lcsOk).length !== 1 || all.findIndex((e) => e.dataset.lcsOk) !== +j.dataset.lcsWant) fails.push(`reply ${n + 1}: not three with the keyed one right`); });
          if (judges.length === 2 && judges[0].dataset.lcsWant === judges[1].dataset.lcsWant) fails.push('both right replies stand in the same place');
          if (lv === 3 && root.querySelectorAll('[data-lcs-line]').length !== 5) fails.push('level 3: not five writing rows (the name, two for what was said, two for how I added on)');
          if (lv !== 3 && root.querySelectorAll('[data-lcs-line]').length !== 1) fails.push('levels 1 and 2: not one line for the name');
        }
        return fails;
      });
    },
  };
}

module.exports = { makeTalkVerbsType, PAIRS1, PAIRS2, TRIPLES, TALES, TALE_WORDS, SCALE, CUES, FAMILY, PLAIN, places };
