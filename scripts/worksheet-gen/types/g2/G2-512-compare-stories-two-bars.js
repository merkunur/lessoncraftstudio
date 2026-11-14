/**
 * G2-512 — Compare Stories Within 100: Two Bars (Year pages S, 2026-11-14; 2.OA.A.1 compare problems with the
 * difference, the bigger or the smaller amount unknown; de "Vergleichsaufgaben mit Streifenmodell", sv "jämföra med
 * blockmodell").
 *
 * Three stories a page about a red box and a blue box. Under each story stand
 *   - the COMPARISON MODEL: two bars that start at the same line, one for the red box and one for the blue box (a red
 *     and a blue square tag them: no word, the same in every language). The bar of the box with more is longer; the
 *     piece by which it is longer is drawn dashed beside the shorter bar: the difference. Three places to write in:
 *     the red bar, the blue bar, the difference. The child writes the two numbers the story tells and a question mark;
 *   - an empty EQUATION frame and the ANSWER box with the picture of the thing.
 * Kinds of story (data/word-problems/compare-frames.json; the difference story is the bank's own):
 *   diff       both amounts are told, the difference is asked                      n1 − n2
 *   more       the blue box has n2 MORE: the bigger amount is asked                n1 + n2
 *   fewer      the blue box has n2 FEWER: the smaller amount is asked              n1 − n2
 *   moreThan   the red box has n2 more THAN the blue box: "more", and subtract     n1 − n2
 *   fewerThan  the red box has n2 fewer THAN the blue box: "fewer", and add        n1 + n2
 * Level 1 whole tens, the first story worked: the difference, more, fewer · 2 two-digit numbers: the difference, more,
 * fewer · 3 two-digit numbers: more than, fewer than, and one of the plain kinds, so the word alone does not tell the
 * operation. At level 3 the bars are NOT drawn (a drawn model shows which box has more, and that is the thing to find
 * out): beside the red and the blue tag stands an empty track each, from one start line, and the child draws the two
 * bars. The key draws them.
 * Things that come by the dozen only; every number is 10 or more and at most 99, no two stories share a number or an
 * answer, no answer is a number the story tells. Printed page only.
 */
'use strict';
const W = require('../../lib/word-problems-levelset.js');
const T = require('../../primitives/_tokens.js').color;
const { storyFit } = require('./G2-506-story-problems-three-lines.js');
const FRAMES = require('../../data/word-problems/compare-frames.json');

const MINUS = '−';
const RED = '#E0533D', BLUE = '#3B7DD8';
/** what a story tells and asks: the red and the blue amount, the difference ('?' = the unknown), the equation */
function model(p) {
  const q = '?';
  if (p.kind === 'diff') return { red: p.n1, blue: p.n2, diff: q, eq: [p.n1, MINUS, p.n2, q], redMore: true };
  if (p.kind === 'more') return { red: p.n1, blue: q, diff: p.n2, eq: [p.n1, '+', p.n2, q], redMore: false };
  if (p.kind === 'fewer') return { red: p.n1, blue: q, diff: p.n2, eq: [p.n1, MINUS, p.n2, q], redMore: true };
  if (p.kind === 'moreThan') return { red: p.n1, blue: q, diff: p.n2, eq: [p.n1, MINUS, p.n2, q], redMore: true };
  if (p.kind === 'fewerThan') return { red: p.n1, blue: q, diff: p.n2, eq: [p.n1, '+', p.n2, q], redMore: false };
  throw new Error('G2-512: unknown kind ' + p.kind);
}
const adds = (kind) => kind === 'more' || kind === 'fewerThan';
/** numbers of a story: n1 (the red box) and n2 (the blue amount for `diff`, else the difference), the answer */
function draw(kind, tens, rng) {
  const step = tens ? 10 : 1, pick = (lo, hi) => step * rng.int(Math.ceil(lo / step), Math.floor(hi / step));
  if (adds(kind)) { const n1 = pick(tens ? 20 : 21, tens ? 70 : 78), n2 = pick(tens ? 10 : 11, Math.min(tens ? 40 : 49, 99 - n1)); return { n1, n2, answer: n1 + n2 }; }
  const n1 = pick(tens ? 40 : 35, tens ? 90 : 99), n2 = pick(tens ? 10 : 11, n1 - (tens ? 10 : 12)); return { n1, n2, answer: n1 - n2 };
}

module.exports = {
  id: 'G2-512',
  slug: 'compare-stories-two-bars',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: 'word-problems',
  themeAxis: { applicable: true, minNouns: 3 },
  difficulty: {
    1: { kinds: ['diff', 'more', 'fewer'], tens: true, worked: true },
    2: { kinds: ['diff', 'more', 'fewer'] },
    3: { kinds: ['moreThan', 'fewerThan', 'plain'], drawBars: true },
  },
  i18n: { en: { title: 'Compare Stories Within 100: Two Bars', instruction: 'Read each story. In the two bars and the dashed piece, write the two numbers you know and a question mark for the number you need. Write an equation. Then write the answer.' } },
  levelSetWords(m) { return ((m && m.problems) || []).map((p) => p.vocabKey + ':' + p.kind); },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty] || this.difficulty[2];
    const rng = ctx.rng, key = !!(ctx && ctx.answerKey);
    const loc = (locale || 'en').slice(0, 2);
    const fit = Number(ctx.wpFit) || 0;
    if (!FRAMES[loc]) throw new Error('G2-512: no compare stories for ' + loc);
    // (no blueberries: "blueberries in the blue box" is a needless stumble on a page about a red and a blue box)
    const pool = W.nounsFor(theme, loc).filter((n) => W.maxFor(n.noun, 100) === 100 && n.noun !== 'blueberry');
    if (pool.length < 3) throw new Error(`G2-512: theme ${theme}/${loc} has ${pool.length} things that come by the dozen < 3`);
    const frameOf = (kind) => (kind === 'diff' ? storyFit.BIG[loc].compare[0] : FRAMES[loc][kind]);
    let problems = null;
    for (let attempt = 0; attempt < 60 && !problems; attempt++) {
      const kinds = rng.shuffle(d.kinds.map((k) => (k === 'plain' ? rng.pick(['more', 'fewer', 'diff']) : k))), nouns = rng.sample(pool, 3);
      if (new Set(nouns.map((n) => n.text)).size < 3) continue;   // two things with one word (fr "ballons")
      const drawn = []; let ok = true;
      const list = kinds.map((kind, i) => {
        let nums = null;
        for (let t = 0; t < 400 && !nums; t++) {
          const n = draw(kind, d.tens, rng);
          if (n.answer < 10 || n.answer > 99 || [n.n1, n.n2].includes(n.answer) || n.n1 === n.n2) continue;
          if (drawn.some((q) => q.answer === n.answer || (d.tens ? q.n1 === n.n1 : [q.n1, q.n2].some((v) => [n.n1, n.n2].includes(v))))) continue;
          nums = n;
        }
        if (!nums) { ok = false; return null; }
        drawn.push(nums);
        const sentence = W.fill(frameOf(kind), { name: '', name2: '', n1: nums.n1, n2: nums.n2, n3: null, noun: nouns[i].text, gender: nouns[i].gender }, loc);
        return { kind, ...nums, noun: nouns[i].noun, vocabKey: nouns[i].vocabKey, sentence };
      });
      if (ok) problems = list;
    }
    if (!problems) throw new Error(`G2-512: no page of three different stories for ${theme}/${loc} at level ${difficulty}`);

    const font = 18 - fit, cell = Math.max(36, 44 - 2 * fit), barH = cell - 6;
    const num = (v, attr) => `<span ${attr || ''} style="font-family:'Baloo 2';font-weight:700;font-size:22px;line-height:1;color:${T.coral}">${v}</span>`;
    const inked = (v) => `<span data-lcs-worked style="font-family:'Baloo 2';font-weight:700;font-size:22px;line-height:1;color:${T.ink}">${v}</span>`;
    const box = (attr, inner, w) => `<span ${attr} style="width:${w || cell + 8}px;height:${cell}px;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;background:${T.white};border:2px solid ${T.ink};border-radius:8px">${inner || ''}</span>`;
    const LONG = 210, SHORT = 126;   // the bars: the longer one, the shorter one; the dashed piece is the rest
    const cards = problems.map((p, pi) => {
      const worked = !!d.worked && pi === 0, m = model(p);
      const show = (v, inModel) => (worked ? inked(v === '?' && !inModel ? p.answer : v) : key ? num(v === '?' ? p.answer : v) : '');
      const tag = (c, name) => `<span data-lcs-tag="${name}" style="flex:0 0 auto;width:20px;height:20px;border-radius:5px;background:${c}"></span>`;
      const bar = (name, v, w) => `<span data-lcs-bar="${name}" data-lcs-val="${v}" style="flex:0 0 auto;width:${w}px;height:${barH}px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;background:${T.white};border:2px solid ${T.teal};border-radius:8px">${show(v, true)}</span>`;
      const diff = `<span data-lcs-diff="${m.diff}" style="flex:0 0 auto;width:${LONG - SHORT}px;height:${barH}px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;background:${T.white};border:2px dashed ${T.teal};border-radius:8px">${show(m.diff, true)}</span>`;
      // level 3, the child's page: an empty track to draw the bar on (a dotted line from the start line)
      const blank = !!d.drawBars && !key;
      const track = (name) => `<span data-lcs-track="${name}" style="flex:0 0 auto;width:${LONG}px;height:${barH}px;box-sizing:border-box;border-left:2px solid ${T.teal};border-bottom:2px dotted ${T.grid}"></span>`;
      const row = (name, c, v, long) => `<span data-lcs-row="${name}" style="display:flex;align-items:center;gap:8px">${tag(c, name)}${blank ? track(name) : bar(name, v, long ? LONG : SHORT) + (long ? '' : diff)}</span>`;
      const modelHtml = `<span data-lcs-model data-lcs-redmore="${m.redMore ? 1 : 0}" style="flex:0 0 auto;display:flex;flex-direction:column;gap:5px">${row('red', RED, m.red, m.redMore)}${row('blue', BLUE, m.blue, !m.redMore)}</span>`;
      const sign = `<span data-lcs-sign="${m.eq[1]}" style="width:${cell - 8}px;height:${cell - 8}px;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;background:${T.white};border:2px solid ${T.ink};border-radius:50%">${worked ? inked(m.eq[1]) : key ? num(m.eq[1]) : ''}</span>`;
      const equals = `<span style="font-family:'Baloo 2';font-weight:700;font-size:24px;line-height:1;color:${T.ink}">=</span>`;
      const eq = `<span data-lcs-eq="${m.eq.join(' ')}" style="flex:0 0 auto;display:flex;align-items:center;gap:6px">${box('data-lcs-eqbox', show(m.eq[0]))}${sign}${box('data-lcs-eqbox', show(m.eq[2]))}${equals}${box('data-lcs-eqbox', show(m.eq[3]))}</span>`;
      const answer = `<span style="flex:0 0 auto;display:flex;align-items:center;gap:6px;min-width:0"><span data-lcs-answer="${p.answer}" style="width:${cell + 10}px;height:${cell}px;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;background:${T.white};border:2.5px dashed ${T.grid};border-radius:8px">${worked ? inked(p.answer) : key ? num(p.answer, 'data-lcs-keytext') : ''}</span>` +
        `<span data-lcs-label style="flex:0 0 auto;display:inline-flex">${W.iconImg(theme, p.noun, 30)}</span></span>`;
      return `<div class="ws-card-stage"${worked ? ' data-lcs-example="1"' : ''} data-lcs-compare="${p.kind}|${p.n1}|${p.n2}|${p.answer}" style="flex:1 0 auto;flex-direction:column;align-items:stretch;justify-content:center;gap:${12 - fit}px;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:14px;padding:12px 18px">` +
        `<div style="display:flex;align-items:center;gap:14px"><span data-lcs-thing style="flex:0 0 auto;display:inline-flex">${W.iconImg(theme, p.noun, 46)}</span>` +
        `<p style="font-family:'Nunito';font-weight:800;font-size:${font}px;line-height:1.4;color:${T.ink};margin:0" data-lcs-sentence>${p.sentence}</p></div>` +
        `<div style="display:flex;align-items:center;justify-content:space-between;gap:10px">${modelHtml}${eq}${answer}</div></div>`;
    });
    const bodyHtml = `<div data-ws-content data-lcs-compare-page="${difficulty}" data-lcs-tens="${d.tens ? 1 : 0}" style="flex:1;display:flex;flex-direction:column;gap:14px;justify-content:stretch">${cards.join('')}</div>`;
    return { bodyHtml, meta: { problems: problems.map(({ kind, n1, n2, answer, vocabKey }) => ({ kind, n1, n2, answer, vocabKey })) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-compare-page]'); if (!root) return ['no content'];
      const level = +root.dataset.lcsComparePage, tens = root.dataset.lcsTens === '1';
      const cards = [...document.querySelectorAll('[data-lcs-compare]')];
      if (cards.length !== 3) fails.push(cards.length + ' stories');
      const has = (t, n) => new RegExp(`(^|\\D)${n}(\\D|$)`).test(t);
      const answers = new Set(), toldAll = [], kinds = [];
      cards.forEach((c, i) => {
        const P = 'story ' + (i + 1);
        const [kind, a, b, ans] = c.dataset.lcsCompare.split('|').map((v, k) => (k ? +v : v)); kinds.push(kind);
        const add = kind === 'more' || kind === 'fewerThan';
        if ((add ? a + b : a - b) !== ans) fails.push(`${P}: the key says ${ans}`);
        for (const v of [a, b, ans]) { if (v < 10 || v > 99) fails.push(`${P}: ${v} is outside 10 to 99`); if (tens && v % 10) fails.push(`${P}: ${v} is not a whole ten`); }
        if (ans === a || ans === b || a === b) fails.push(`${P}: the answer is a number the story tells, or the two numbers are the same`);
        if (answers.has(ans)) fails.push(`${P}: an answer twice on the page`); answers.add(ans);
        if (!tens && [a, b].some((v) => toldAll.includes(v))) fails.push(`${P}: a number of another story`); toldAll.push(a, b);
        const story = (c.querySelector('[data-lcs-sentence]') || {}).textContent || '';
        if (!has(story, a) || !has(story, b)) fails.push(`${P}: a number is not in the story`);
        if (has(story, ans)) fails.push(`${P}: the answer stands in the story`);
        if (/[{}]/.test(story) || !/[?？]\s*$/.test(story.trim())) fails.push(`${P}: an unfilled slot, or no question at the end`);
        // the model: red, blue and the difference; one unknown; the longer bar is the box with more; bigger = smaller + difference
        const val = (v) => (v === '?' ? ans : +v);
        const tracks = [...c.querySelectorAll('[data-lcs-track]')];
        if (tracks.length) {   // level 3: the child draws the bars; two empty tracks from one start line, and no bar
          if (level !== 3 || tracks.length !== 2 || c.querySelector('[data-lcs-bar]') || c.querySelector('[data-lcs-diff]')) fails.push(`${P}: the tracks to draw the bars on`);
          const tr = tracks.map((e) => e.getBoundingClientRect());
          if (tracks.length === 2 && (Math.abs(tr[0].left - tr[1].left) > 1 || tr[0].width < 150 || tr[1].top < tr[0].bottom - 1)) fails.push(`${P}: the two tracks do not start at one line, one under the other`);
        } else {
        const redEl = c.querySelector('[data-lcs-bar="red"]'), blueEl = c.querySelector('[data-lcs-bar="blue"]'), diffEl = c.querySelector('[data-lcs-diff]');
        if (!redEl || !blueEl || !diffEl) { fails.push(`${P}: the model has not its three places`); return; }
        const raw = [redEl.dataset.lcsVal, blueEl.dataset.lcsVal, diffEl.dataset.lcsDiff];
        if (raw.filter((v) => v === '?').length !== 1) fails.push(`${P}: ${raw.filter((v) => v === '?').length} unknowns in the model`);
        const red = val(raw[0]), blue = val(raw[1]), df = val(raw[2]);
        if (Math.abs(red - blue) !== df) fails.push(`${P}: the model says ${red}, ${blue} and a difference of ${df}`);
        const rw = redEl.getBoundingClientRect(), bw = blueEl.getBoundingClientRect(), dw = diffEl.getBoundingClientRect();
        if ((red > blue) !== (rw.width > bw.width)) fails.push(`${P}: the longer bar is not the box with more`);
        if (Math.abs(rw.left - bw.left) > 1) fails.push(`${P}: the two bars do not start at the same line`);
        const short = red > blue ? bw : rw, long = red > blue ? rw : bw;
        if (Math.abs(dw.left - short.right) > 10 || Math.abs(dw.right - long.right) > 10 || Math.abs(dw.top - short.top) > 2) fails.push(`${P}: the difference does not stand beside the shorter bar, up to the end of the longer one`);
        }
        if (c.querySelectorAll('[data-lcs-tag]').length !== 2) fails.push(`${P}: the two colour tags`);
        const val2 = (v) => (v === '?' ? ans : +v);
        const e = c.querySelector('[data-lcs-eq]').dataset.lcsEq.split(' '), x = val2(e[0]), y = val2(e[2]), z = val2(e[3]);
        if ((e[1] === '+' ? x + y : x - y) !== z) fails.push(`${P}: the equation ${e.join(' ')} is not true`);
        if (c.querySelectorAll('[data-lcs-eqbox]').length !== 3 || !c.querySelector('[data-lcs-sign]')) fails.push(`${P}: the equation frame`);
        if (+c.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== ans) fails.push(`${P}: the answer box`);
        if (c.querySelectorAll('[data-lcs-label] img').length !== 1 || c.querySelectorAll('[data-lcs-thing] img').length !== 1) fails.push(`${P}: the pictures of the thing`);
        if (c.dataset.lcsExample) { if (i !== 0) fails.push(`${P}: only the first story is worked`); if (c.querySelectorAll('[data-lcs-worked]').length !== 8) fails.push(`${P}: the worked story shows ${c.querySelectorAll('[data-lcs-worked]').length} of its 8 entries`); }
        const cr = c.getBoundingClientRect();
        c.querySelectorAll('*').forEach((el) => { const r = el.getBoundingClientRect(); if (r.width && (r.right > cr.right + 1 || r.left < cr.left - 1 || r.bottom > cr.bottom + 1 || r.top < cr.top - 1)) fails.push(`${P}: something runs out of it`); });
        const mr = c.querySelector('[data-lcs-model]').getBoundingClientRect(), er = c.querySelector('[data-lcs-eq]').getBoundingClientRect(), ar = c.querySelector('[data-lcs-answer]').getBoundingClientRect();
        if (er.left < mr.right - 1 || ar.left < er.right - 1 || er.top > mr.bottom || ar.top > mr.bottom) fails.push(`${P}: model, equation and answer do not stand side by side`);
      });
      if (level === 3 && (!kinds.includes('moreThan') || !kinds.includes('fewerThan'))) fails.push('level 3 has the stories ' + kinds.join(', '));
      if (level !== 3 && kinds.slice().sort().join() !== 'diff,fewer,more') fails.push('level ' + level + ' has the stories ' + kinds.join(', '));
      return [...new Set(fails)];
    });
  },
};
