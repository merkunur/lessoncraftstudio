/**
 * G2-254 — Reading comprehension: a short native passage + 3 multiple-
 * choice questions (2 literal recall + 1 inference). The SEO panel's single
 * biggest catalog omission (pt "interpretação de texto", de "Lesetexte mit
 * Fragen", fr "lecture compréhension"). Passages are ORIGINAL per locale —
 * authored by native ensembles, never translated (data/literacy/
 * reading-passages.js). Correctness of content is curated + native-
 * reviewed; structure is machine-verified here.
 * d1/d2/d3 = short/medium/longer passage.
 */
'use strict';
const { READING_PASSAGES } = require('../../data/literacy/reading-passages.js');
const { poolOf, levelData } = require('../../data/literacy/reading-passages-levels.js');
const RC_SCREEN = require('../../lib/reading-comprehension-screen.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { makeRng } = require('../../lib/rng.js');
// the MEASURED size tier of each (locale, story, level): tools/level-set/rc-fit-tiers.js renders every page at each tier
// and keeps the largest that fits the page box (the estimate below is only the fallback for an unmeasured page)
const RC_FIT = (() => { try { return require('../../data/literacy/rc-levels/fit.json'); } catch (e) { return {}; } })();
// the MEASURED orders of each question's three choices that keep its choice row no taller than the authored order, at each
// size tier, on A4 and letter alike (qa/rc-choice-rows-measure.js): { "<loc>|<story>|<level>": [[m0..m3] | null per
// question] }, bit i of m<tier> = CHOICE_ORDERS[i] fits. A copy prints its choices only in a measured order; a page the table
// does not know keeps the authored order (never a guess)
const RC_CHOICE_FIT = (() => { try { return require('../../data/literacy/rc-levels/choice-fit.json'); } catch (e) { return null; } })();
const CHOICE_ORDERS = ['012', '021', '102', '120', '201', '210'];

const LETTERS = ['A', 'B', 'C'];

/**
 * The letters of a pool page's answers (2026-11-17: the choices printed in the authored order, and the authored order
 * put the right answer under the same letter on most stories — "Story 5" level 1 answered B, C, A on 12 of 12 new
 * versions; C was right on a fifth of the questions). Each copy now places the right answers itself: the page's
 * multiple-choice questions take DIFFERENT letters (a seeded order of A, B, C, repeated past three; a level's first copy
 * keeps the authored order), and the wrong
 * choices fill the other places in a seeded order — seeded by the story, the level and the copy, so a copy rebuilds the
 * same page and another copy of the same story asks under other letters. The screen and its oracle never read the
 * printed order (lib/reading-comprehension-screen.js: own seeded order, answers re-derived by their words).
 *
 * Only MEASURED orders (2026-11-18: the chips wrap, and an order that breaks the line elsewhere added a line — fr G2-273
 * level 3 ran onto the footer): fits(q) lists the orders of authored choice indices question q may print (RC_CHOICE_FIT
 * at the page's size tier; the authored order always fits). The draw is kept wherever every question's order fits; where
 * one does not, the page takes fitting orders for all its questions — the right answers under different letters, as many
 * drawn orders kept as can be, then as many drawn letters — on a seed of its own, so a copy whose draw fits is unchanged.
 * fits = null: every order (no measurement asked for).
 */
function placeAnswers(questions, storyId, level, copyKey, fits) {
  const rng = makeRng(`rc-letters|${storyId}|${level}|${copyKey}`);
  const mc = questions.filter((q) => q.kind !== 'write' && q.choices);
  const slots = [];
  while (slots.length < mc.length) slots.push(...rng.shuffle([0, 1, 2]));
  // the draw: the right answer at its slot, the wrong ones in a seeded order (an order of the authored indices)
  const orders = mc.map((q, i) => {
    const k = q.choices.length, at = slots[i] % k;
    const wrong = rng.shuffle(q.choices.map((_, j) => j).filter((j) => j !== q.correct));
    return [...wrong.slice(0, at), q.correct, ...wrong.slice(at)];
  });
  const fitting = mc.map((q) => (fits ? fits(q) : null));
  const ok = (i, o) => !fitting[i] || fitting[i].some((f) => f.join() === o.join());
  if (!orders.every((o, i) => ok(i, o))) {
    // a drawn order does not fit: among the fitting orders of every question, the page that keeps the most drawn orders
    // with the right answers under DIFFERENT letters (else the most drawn orders), then the most drawn letters; ties on
    // a seed of their own
    const opts = mc.map((q, i) => (fitting[i] && fitting[i].length ? fitting[i] : [q.choices.map((_, j) => j)]));
    const pages = [];
    const walk = (i, acc) => { if (i === mc.length) { pages.push(acc.slice()); return; } for (const o of opts[i]) { acc.push(o); walk(i + 1, acc); acc.pop(); } };
    walk(0, []);
    const score = (page) => {
      const at = page.map((o, i) => o.indexOf(mc[i].correct));
      const distinct = new Set(at).size === Math.min(at.length, 3);
      return (distinct ? 1000 : 0) + 10 * page.filter((o, i) => o.join() === orders[i].join()).length + at.filter((p, i) => p === slots[i] % mc[i].choices.length).length;
    };
    const top = Math.max(...pages.map(score)), best = pages.filter((p) => score(p) === top);
    best[Math.floor(makeRng(`rc-letters-fit|${storyId}|${level}|${copyKey}`).next() * best.length)].forEach((o, i) => { orders[i] = o; });
  }
  return questions.map((q) => {
    const i = mc.indexOf(q);
    if (i < 0) return q;
    const o = orders[i];
    return { ...q, choices: o.map((j) => q.choices[j]), correct: o.indexOf(q.correct) };
  });
}

module.exports = {
  id: 'G2-254',
  slug: 'reading-comprehension',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: 'reading-comprehension',
  keyLabelOnKey: true,   // the key keeps the page's own title; the key word stands in the name line (render-instance.js keyHead)
  themeAxis: { applicable: false },
  difficulty: { 1: { idx: 0 }, 2: { idx: 1 }, 3: { idx: 2 } },
  i18n: {
    en: {
      title: 'Read and Answer',
      instruction: 'Read the story carefully. Then circle the best answer to each question.',
    },
  },

  /**
   * Level Set 2026-09-30: a copy (ctx.seedVariant) reads the page's native POOL (data/literacy/reading-passages-levels.js).
   * The same story serves every level; the level changes the questions:
   *   1  numbered sentences + 3 LITERAL questions, each with a "Sentence N" chip
   *   2  the core set (as published: 3 multiple-choice questions)
   *   3  2 INFERENCE questions + 1 write-in question on two writing rows
   * Level 2 copy k = pool[k] (pool[0] is the published page itself); levels 1 and 3 copy k = pool[k-1].
   * The published page (no seedVariant) never reaches this path.
   */
  _storyFor(difficulty, loc, sv) {
    const pool = poolOf(this.id, loc);
    const s = pool[difficulty === 2 ? sv : sv - 1];
    if (!s) throw new Error(`${this.id}: ${loc} has no pool story ${sv} at level ${difficulty}`);
    return s;
  },

  /** The size tier of a pool page: size tiers by story length (the level-3 page carries two writing rows, so it counts
   *  ~110 characters longer); measured by the probe's overflow/footer lints (RC_FIT), never guessed per story. */
  _tier(difficulty, loc, p, forceTier) {
    const eff = p.text.length + (difficulty === 3 ? 110 : difficulty === 1 ? 30 : 0);
    const measured = RC_FIT[loc + '|' + p.id + '|' + difficulty];
    return forceTier != null ? forceTier : measured != null ? measured : eff <= 330 ? 0 : eff <= 430 ? 1 : eff <= 540 ? 2 : 3;
  },

  _buildLevel(difficulty, loc, sv, forceTier, copyKey) {
    const L = levelData(loc);
    const p = this._storyFor(difficulty, loc, sv);
    const numbered = difficulty !== 2;
    const authored = difficulty === 1
      ? p.l1.map((q) => ({ kind: 'literal', q: q.q, choices: q.choices, correct: q.correct, hint: q.sentence }))
      : difficulty === 3
        ? [...p.l3.mc.map((q) => ({ kind: 'inference', q: q.q, choices: q.choices, correct: q.correct })),
          { kind: 'write', q: p.l3.write.q, model: p.l3.write.model, evidence: p.l3.write.evidence }]
        : p.core.map((q) => ({ kind: 'core', q: q.q, choices: q.choices, correct: q.correct }));
    const tier = this._tier(difficulty, loc, p, forceTier);
    // a copy's own answer letters (placeAnswers), in orders measured to fit at this tier (a page the table does not know:
    // the authored order); a build without a copy key (the unit checks) keeps the authored order
    const fitRow = RC_CHOICE_FIT && RC_CHOICE_FIT[`${loc}|${p.id}|${difficulty}`];
    const fits = (q) => {
      const m = fitRow && fitRow[authored.indexOf(q)];
      const mask = m ? m[tier] : 1;
      return CHOICE_ORDERS.filter((_, i) => mask & (1 << i)).map((s) => [...s].map(Number));
    };
    const questions = copyKey != null ? placeAnswers(authored, p.id, difficulty, copyKey, fits) : authored;
    const long = tier >= 1;
    const px = [18, 17, 16, 15][tier];
    const cardPad = tier >= 3 ? '8px 14px' : tier >= 2 ? '10px 16px' : '14px 18px';
    const tight = tier >= 3;   // the longest stories: every gap one step smaller
    const textHtml = numbered
      ? p.sentences.map((t, i) => `<span data-lcs-sn="${i + 1}" style="font-family:'Baloo 2';font-weight:700;font-size:${px - 3}px;color:#146B5E;vertical-align:super;line-height:0;margin-right:2px">${i + 1}</span><span data-lcs-s="${i + 1}">${t}</span>`).join(' ')
      : p.text;
    const passageCard =
      `<div style="background:#FBF3E4;border:2px solid #F0E4CB;border-radius:14px;padding:${tight ? '12px 22px' : long ? '16px 24px' : '20px 26px'}" data-lcs-passage="${p.id}">` +
      `<div style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#146B5E;margin-bottom:8px">${p.title}</div>` +
      `<p style="font-family:'Nunito';font-weight:600;font-size:${px}px;line-height:${[1.65, 1.58, 1.5, 1.45][tier]};color:#3A3530" data-lcs-text>${textHtml}</p>` +
      `</div>`;
    const badge = (qi) => `<span style="flex:0 0 auto;width:26px;height:26px;border-radius:50%;background:#146B5E;color:#FFFFFF;` +
      `display:inline-flex;align-items:center;justify-content:center;font-family:'Baloo 2';font-weight:700;font-size:15px">${qi + 1}</span>`;
    const cards = questions.map((q, qi) => {
      const head = `<div style="display:flex;gap:10px;align-items:baseline;flex-wrap:wrap">${badge(qi)}` +
        `<span style="font-family:'Nunito';font-weight:800;font-size:17px;color:#3A3530">${q.q}</span>` +
        (q.hint ? `<span data-lcs-hint="${q.hint}" style="font-family:'Nunito';font-weight:800;font-size:14px;color:#146B5E;background:#E3F1EE;border-radius:10px;padding:2px 10px;white-space:nowrap">${L.sentenceChip.replace('{n}', q.hint)}</span>` : '') +
        `</div>`;
      const open = `<div class="ws-card-stage" style="flex-direction:column;align-items:flex-start;gap:${tight ? 6 : 10}px;background:#FFFFFF;` +
        `border:2px solid #F0E4CB;border-radius:12px;padding:${cardPad}" data-lcs-q="${qi}"${q.kind === 'write' ? ' data-lcs-write="1"' : ''}>`;
      if (q.kind === 'write') {
        const row = () => writingRow({ w: 560, h: tight ? 40 : 46, glyphH: tight ? 21 : 24 }).svg;
        return open + head + `<div style="display:flex;flex-direction:column;gap:4px;padding-left:36px" data-lcs-wlines>${row()}${row()}</div></div>`;
      }
      return open + head + `<div style="display:flex;gap:14px;flex-wrap:wrap;padding-left:36px">` +
        q.choices.map((c, ci) =>
          `<span style="display:inline-flex;align-items:center;gap:7px;background:#FFFFFF;border:2px solid #146B5E;` +
          `border-radius:18px;padding:5px 16px;font-family:'Nunito';font-weight:700;font-size:16px;color:#3A3530" ` +
          `data-lcs-choice="${ci}"${ci === q.correct ? ' data-lcs-correct="1"' : ''}>` +
          `<span style="font-family:'Baloo 2';font-weight:700;color:#F2784B">${LETTERS[ci]}</span>${c}</span>`
        ).join('') + `</div></div>`;
    }).join('');
    return {
      bodyHtml:
        `<div data-ws-content style="flex:1;display:flex;flex-direction:column;gap:${tight ? 10 : 16}px;justify-content:space-evenly;padding-top:4px">` +
        passageCard + `<div style="display:flex;flex-direction:column;gap:${tight ? 8 : 14}px">${cards}</div></div>`,
      meta: { passage: p.id, level: difficulty, questions },
    };
  },

  /**
   * THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): the page's task made small — each story of
   * the native pool (six) at the level, in its smallest measured size, with TWO of its questions of that level (its first
   * and its last, the same in every draw): a card of its own, the right choice carrying data-lcs-correct as on the page. Level 3's write-in
   * question has no one answer and stays off the check (its two multiple-choice questions are drawn). Six cards, where the
   * page has three questions.
   */
  checkPage({ difficulty, locale }, ctx) {
    const { checkGrid } = require('../../lib/check-page.js');
    const loc = (locale || 'en').slice(0, 2), lvl = [1, 2, 3].includes(Number(difficulty)) ? Number(difficulty) : 2, rng = ctx.rng;
    const pool = poolOf(this.id, loc);
    const cards = rng.shuffle(pool.map((_, i) => i)).map((i) => {
      const built = this._buildLevel(lvl, loc, lvl === 2 ? i : i + 1, 3);
      const html = built.bodyHtml;
      const passage = html.slice(html.indexOf('<div style="background:#FBF3E4'), html.indexOf('</p></div>') + '</p></div>'.length);
      const qs = html.split(/(?=<div class="ws-card-stage")/).slice(1).filter((q) => !q.includes('data-lcs-write="1"'));
      // TWO of its questions, the same two for the story in every draw — its first and its last (2026-11-15, en / de check
      // reviews: one question was thin, and the two forms read the same story; a story's card is now one task, so form B
      // never takes the story form A took)
      const two = [qs[0], qs[qs.length - 1]].map((q) => q.replace(/(<\/div><\/div>)(<\/div><\/div>)?$/, '$1')
        .replace(/<span style="flex:0 0 auto;width:26px;height:26px;border-radius:50%[^>]*>\d<\/span>/, '')   // its number on the page
        .replace('padding-left:36px', 'padding-left:0').replace('padding:8px 14px"', 'padding:8px 12px"'));   // (the room of that number)
      // (two questions under a story is a tall card: the questions are set a step tighter — the measured level-3 card of the
      // longest story stood at 477 px, over the check's 460)
      const tight = (q) => q.replace(/gap:(?:6|10)px;background:#FFFFFF/, 'gap:4px;background:#FFFFFF').replace('padding:8px 12px"', 'padding:5px 10px"')
        .replace('font-weight:800;font-size:17px', 'font-weight:800;font-size:16px').replace('gap:14px;flex-wrap:wrap;padding-left:0', 'gap:8px;flex-wrap:wrap;padding-left:0')
        .replace(/padding:5px 16px;font-family:'Nunito';font-weight:700;font-size:16px/g, "padding:2px 12px;font-family:'Nunito';font-weight:700;font-size:15px");
      return `<div style="display:flex;flex-direction:column;gap:6px">${passage.replace('padding:12px 22px"', 'padding:8px 14px"').replace('margin-bottom:8px', 'margin-bottom:2px').replace('font-size:22px;color:#146B5E', 'font-size:19px;color:#146B5E')}${two.map(tight).join('')}</div>`;
    });
    return { bodyHtml: `<div data-lcs-check-page>${checkGrid(cards)}</div>`, meta: {} };
  },

  /** A copy with a new story on a face prints that story's own title (the face titles name their story). */
  copyStrings(strings, { locale, difficulty, seedVariant }) {
    if (!seedVariant) return strings;
    const s = this._storyFor(difficulty, (locale || 'en').slice(0, 2), seedVariant);
    return s.pageTitle ? { ...strings, title: s.pageTitle } : strings;
  },

  interactive: {
    kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]',
    metaAttrs: ['data-lcs-story', 'data-lcs-qkind', 'data-lcs-question', 'data-lcs-hint'], instructionKey: 'mc', screenHeight: 3200,
    oracle: (items, l) => RC_SCREEN.oracle(items, l),
  },

  /**
   * The story-list position a page reads (null = the published page). The Level Set tools pass it as seedVariant (an
   * integer); the MAKER numbers copies by ctx.variant and passes a seedVariant only to retry a copy ("2.1"), so a maker
   * copy maps onto the same list (2026-11-03: every maker copy rebuilt the published story — the native panels' stories
   * were unreachable — and level 1 / 3 printed the published page under the level's own instruction, "the number next to
   * each question tells you which sentence has the answer", on a page with no sentence numbers). Level 2: copy 1 is the
   * published page, copies 2… the new stories; levels 1 and 3: copy k is story k, the published story first. Past the
   * list's end the copies cycle.
   */
  _listPosition(difficulty, loc, ctx) {
    const sv = ctx && ctx.seedVariant;
    if (!(ctx && ctx.maker)) return sv || null;   // the publishing tools: their own numbering, untouched
    if (sv && !String(sv).includes('.')) return Number(sv);
    const v = Math.max(1, parseInt((ctx && ctx.variant) || 1, 10) || 1);
    if (Number(difficulty) === 2 && v === 1) return null;
    const len = poolOf(this.id, loc).length;
    return Number(difficulty) === 2 ? ((v - 2) % (len - 1)) + 1 : ((v - 1) % len) + 1;
  },

  build({ difficulty, locale }, ctx) {
    const pos = this._listPosition(difficulty, (locale || 'en').slice(0, 2), ctx);
    if (pos) {
      const lloc = (locale || 'en').slice(0, 2);
      // the copy that places the answers: the maker's copy number, else the publishing tools' list position; a level's
      // first copy keeps the authored order (a single page shows three different letters already)
      const copyNo = ctx.maker ? Number(ctx.variant || 1) : Number(pos);
      const copyKey = copyNo === 1 ? null : (ctx.maker ? 'm' : 's') + copyNo;
      const built = this._buildLevel(difficulty, lloc, pos, ctx.forceTier, copyKey);
      // a new story on a face prints its own title (copyStrings, for the maker: makePage reads built.strings)
      const own = this._storyFor(difficulty, lloc, pos).pageTitle;
      const r = this.interactive && (ctx.interactive || ctx.answerKey) ? RC_SCREEN.screenOrKey(built, ctx, lloc, levelData(lloc)) : built;
      return own && ctx.maker ? { ...r, strings: { title: own } } : r;
    }
    void ctx;
    const loc = (locale || 'en').slice(0, 2);
    const passages = READING_PASSAGES[loc];
    if (!passages || !passages[this.difficulty[difficulty].idx]) {
      // refuse-don't-guess: no native passage ⇒ the locale cannot ship
      throw new Error(`G2-254: no native passage for locale ${loc} at d${difficulty}`);
    }
    const p = passages[this.difficulty[difficulty].idx];

    // long stories (the nt20-VAR pages 3-7 in wordy locales) drop a font
    // step so the passage + 3 questions stay inside the page box; every
    // published passage (idx 0-2 at ≤400 chars... pt story texts run longer)
    // keeps the original metrics
    const long = p.text.length > 400;
    const passageCard =
      `<div style="background:#FBF3E4;border:2px solid #F0E4CB;border-radius:14px;padding:${long ? '16px 24px' : '20px 26px'}" data-lcs-passage="${p.id}">` +
      `<div style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#146B5E;margin-bottom:8px">${p.title}</div>` +
      `<p style="font-family:'Nunito';font-weight:600;font-size:${long ? 16 : 18}px;line-height:${long ? 1.55 : 1.65};color:#3A3530" data-lcs-text>${p.text}</p>` +
      `</div>`;

    const questions = p.questions.map((q, qi) =>
      `<div class="ws-card-stage" style="flex-direction:column;align-items:flex-start;gap:10px;background:#FFFFFF;` +
      `border:2px solid #F0E4CB;border-radius:12px;padding:14px 18px" data-lcs-q="${qi}">` +
      `<div style="display:flex;gap:10px;align-items:baseline">` +
      `<span style="flex:0 0 auto;width:26px;height:26px;border-radius:50%;background:#146B5E;color:#FFFFFF;` +
      `display:inline-flex;align-items:center;justify-content:center;font-family:'Baloo 2';font-weight:700;font-size:15px">${qi + 1}</span>` +
      `<span style="font-family:'Nunito';font-weight:800;font-size:17px;color:#3A3530">${q.q}</span></div>` +
      `<div style="display:flex;gap:14px;flex-wrap:wrap;padding-left:36px">` +
      q.choices.map((c, ci) =>
        `<span style="display:inline-flex;align-items:center;gap:7px;background:#FFFFFF;border:2px solid #146B5E;` +
        `border-radius:18px;padding:5px 16px;font-family:'Nunito';font-weight:700;font-size:16px;color:#3A3530" ` +
        `data-lcs-choice="${ci}"${ci === q.correct ? ' data-lcs-correct="1"' : ''}>` +
        `<span style="font-family:'Baloo 2';font-weight:700;color:#F2784B">${LETTERS[ci]}</span>${c}</span>`
      ).join('') +
      `</div></div>`
    ).join('');

    return {
      bodyHtml:
        `<div data-ws-content style="flex:1;display:flex;flex-direction:column;gap:16px;justify-content:space-evenly;padding-top:4px">` +
        passageCard +
        `<div style="display:flex;flex-direction:column;gap:14px">${questions}</div>` +
        `</div>`,
      meta: { passage: p.id },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const passage = document.querySelector('[data-lcs-passage]');
      if (!passage) { fails.push('no passage'); return fails; }
      const text = passage.querySelector('[data-lcs-text]');
      if (!text || text.textContent.trim().length < 100) fails.push('passage too short');
      const qs = [...document.querySelectorAll('[data-lcs-q]')];
      if (qs.length !== 3) fails.push(`${qs.length} questions (want 3)`);
      qs.forEach((q, i) => {
        if (q.hasAttribute('data-lcs-write')) {
          if (q.querySelectorAll('svg[data-lcs-prim="writing-row"]').length !== 2) fails.push(`q${i + 1}: write-in without 2 writing rows`);
          return;
        }
        const choices = [...q.querySelectorAll('[data-lcs-choice]')];
        if (choices.length !== 3) fails.push(`q${i + 1}: ${choices.length} choices`);
        const correct = choices.filter((c) => c.hasAttribute('data-lcs-correct'));
        if (correct.length !== 1) fails.push(`q${i + 1}: ${correct.length} correct`);
        const texts = choices.map((c) => c.textContent.trim());
        if (new Set(texts).size !== texts.length) fails.push(`q${i + 1}: duplicate choices`);
      });
      return fails;
    });
  },
};
