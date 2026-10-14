/**
 * G3-370 — Multiplication and Division Word Problems (nt20-B;
 * `word-problems` REUSE, G3, 3.OA.A.3). Two generous story cards (the
 * G1-213 shape teachers know): under the story the picture RESTATES it —
 * mul: n1 group boxes each holding n2 icons · share: a strip of n1 icons and
 * n2 empty dashed boxes to deal into · group: a strip the child rings in
 * groups of n2. Then working space, the answer box, and a ruled line for
 * the answer sentence. Products ≤ 36 so every problem keeps its picture.
 * Frames: data/b2/wp-muldiv-frames.js ({name}{n1}{n2}{noun}; names repeat,
 * no pronouns). d1: 2 mul · d2: mul + share · d3: mul + share + group.
 *
 * Level Set 2026-10-14 (walk #65, PDF + interactive + key). Level 2 copy 1 = the published page, built by the untouched
 * draw (`_legacy`, byte-identical). Every other page is built by `_levelSet` (lib/word-problems-levelset.js: the merged
 * native story bank, an allow-list of countable things per theme; B&W line art too — themeAxis.levelSetBw) from
 * FACE_LEVELS — the six variation files only call levelsFor (⚠ a re-run of tools/gen-b2var-specs.js would flatten them).
 * Ladder (audit verdicts): level 1 small numbers (≤ 12–15, big pictures), level 3 up to 36 (6 × 6), three stories, and on
 * the MIXED page no pictures at all — each picture style (groups / deal boxes / a strip) tells which operation it is,
 * and deciding that is the page's own task. `q` = the quotient range of share / group stories.
 * Screen: kind type-number. Key: the answer in its box + the number sentence on the answer line.
 */
'use strict';
const { answerBox } = require('../../templates/components.js');
const { dotPanel, equalGroups, rulingBlock } = require('../../templates/components-b2.js');
const { fileUri, labels } = require('../../image-cache/resolve.js');
const { safeNouns } = require('../../lib/b2-common.js');
const { WP_MULDIV } = require('../../data/b2/wp-muldiv-frames.js');
const W = require('../../lib/word-problems-levelset.js');
const { seatOnRow } = require('../../lib/key-on-row.js');
const { divGlyph, mulGlyph } = require('../_shared/notation.js');

function fillFrame(tpl, slots) { return tpl.replace(/\{(name|n1|n2|noun)\}/g, (_, k) => String(slots[k])); }

const FACE_LEVELS = {
  // ⚠ G3-370 level 1 is the June d1 EXACTLY: G3-371's published config is built from it (base.difficulty[1])
  'G3-370': { 1: { ops: ['mul', 'mul'], n1: [2, 4], n2: [2, 5], max: 20, icon: 24, dots: 80 }, 3: { ops: ['mul', 'share', 'group'], min: 12, max: 36, icon: 16, font: 16, dots: 0, compact: true, slotH: 26 } },
  'G3-371': { 1: { n1: [2, 3], n2: [2, 5], max: 15, icon: 30 }, 3: { n1: [3, 6], n2: [4, 6], min: 16, max: 36, icon: 20, dots: 40 } },
  'G3-372': { 1: { n2: [2, 3], q: [2, 4], max: 12, icon: 32 }, 3: { min: 18, ops: ['share', 'share', 'share'], n2: [3, 6], q: [4, 6], max: 30, icon: 16, font: 16, dots: 0, compact: true, slotH: 26 } },
  'G3-373': { 1: { n2: [2, 3], q: [2, 4], max: 12, icon: 32 }, 3: { min: 18, ops: ['group', 'group', 'group'], n2: [3, 6], q: [3, 6], max: 30, icon: 16, font: 16, dots: 0, compact: true, slotH: 26 } },
  'G3-374': { 1: { n2: [2, 3], q: [2, 4], max: 12, icon: 32 }, 3: { min: 18, n2: [3, 6], q: [3, 6], max: 36, icon: 14 } },
  'G3-375': { 1: { n1: [2, 3], n2: [2, 4], q: [2, 4], max: 12, icon: 32 }, 3: { min: 18, n1: [3, 6], n2: [3, 6], q: [3, 6], max: 36, icon: 14 } },
  'G3-376': { 1: { n1: [2, 3], n2: [2, 4], q: [2, 4], max: 12, icon: 18 }, 3: { noPic: true, font: 16, dots: 120 } },
};
function levelsFor(id, D) {
  const L = FACE_LEVELS[id];
  if (!L) throw new Error(`G3-370: no Level Set levels for ${id}`);
  return { 1: { ...D, ...L[1] }, 2: { ...D }, 3: { ...D, ...L[3] } };
}
const SCR = { font: 28, icon: 30, box: 112 };

module.exports = {
  id: 'G3-370',
  slug: 'multiplication-division-word-problems',
  gradeBand: 'G3',
  assetClass: 'icon-placement',
  exerciseType: 'word-problems',
  themeAxis: { applicable: true, minNouns: 3, excludeBw: true, levelSetBw: true },
  FACE_LEVELS,
  levelsFor,
  // ⚠ level 2 is the published config — never change it
  difficulty: levelsFor('G3-370', { ops: ['mul', 'share'], n1: [2, 6], n2: [2, 6], max: 36, icon: 22, font: 18, dots: 60, ruling: true, compact: false }),
  i18n: {
    en: {
      title: 'Multiplication and Division Word Problems',
      instruction: 'Read each story. Use the picture to help you. Write the answer in the box, then finish the answer sentence.',
    },
  },
  // only new pages retry; the published page (level 2, copy 1) is never rebuilt differently
  qaRetries(it) { return it.difficulty === 2 && (it.variant || 1) === 1 ? [] : [{ wpFit: 1 }, { wpFit: 2 }]; },
  levelSetWords(m) { return ((m && m.problems) || []).map((p) => p.vocabKey + ':' + p.frame); },
  interactive: {
    kind: 'type-number', item: '[data-lcs-wbox]', answerAttr: 'data-lcs-answer', labelAttr: 'data-lcs-label',
    metaAttrs: ['data-lcs-op', 'data-lcs-a', 'data-lcs-b'], instructionKey: 'read', screenHeight: 3600,
    maxDigits: () => 2,
    // INDEPENDENT oracle: recomputed from the stamped story numbers — never the page's answer stamp
    oracle: (items) => items.map((it) => {
      const m = it.meta || {}, a = +m['data-lcs-a'], b = +m['data-lcs-b'], op = m['data-lcs-op'];
      const v = op === 'mul' ? a * b : (a % b === 0 ? a / b : NaN);
      if (!Number.isInteger(v) || v < 1) throw new Error('word-problems oracle: no answer for ' + JSON.stringify(m));
      return v;
    }),
  },

  build({ theme, difficulty, locale }, ctx) {
    const published = Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
    if (!published) return this._levelSet(this.difficulty[difficulty], theme, (locale || 'en').slice(0, 2), ctx || {});
    return this._legacy({ theme, difficulty, locale }, ctx);
  },

  // ⚠ the published draw, byte-identical: level 2, copy 1 only
  _legacy({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const bank = WP_MULDIV[loc];
    if (!bank) throw new Error(`G3-370: no frame bank for ${loc}`);
    // invariant-plural nouns (dice, chess, lego) never enter a counted slot
    const countablePool = safeNouns(theme, loc).filter((n) => { const l = labels(n.vocabKey, loc); return l && l[0] && l[1] && l[1].trim().toLocaleLowerCase() !== l[0].trim().toLocaleLowerCase(); });
    if (countablePool.length < d.ops.length) throw new Error(`G3-370: theme ${theme}/${loc} has ${countablePool.length} countable nouns < ${d.ops.length}`);
    const nouns = rng.sample(countablePool, d.ops.length);
    const usedFrames = new Set();
    const blocks = d.ops.map((op, i) => {
      const noun = nouns[i];
      let nounText;
      if (bank.nounForm === 'plural') { nounText = labels(noun.vocabKey, loc)[1]; if (!nounText) throw new Error(`G3-370: no plural for ${noun.vocabKey} in ${loc}`); }
      else { nounText = bank.nounForms && bank.nounForms[noun.vocabKey]; if (!nounText) throw new Error(`G3-370: no curated noun form for ${noun.vocabKey} in ${loc}`); }
      if (bank.nounCase === 'lower') nounText = nounText.toLocaleLowerCase(loc);
      let n1, n2, answer, guard = 0;
      do {
        if (op === 'mul') { n1 = rng.int(d.n1[0], d.n1[1]); n2 = rng.int(d.n2[0], d.n2[1]); answer = n1 * n2; }
        else { n2 = rng.int(d.n2[0], d.n2[1]); const q = rng.int(2, 6); n1 = q * n2; answer = q; }
        guard++;
      } while ((answer === n1 || answer === n2 || (op === 'mul' ? answer > d.max : n1 > d.max) || n1 * (op === 'mul' ? n2 : 1) > d.max) && guard < 100);
      let frame; let g2 = 0;
      do { frame = rng.pick(bank.frames[op]); g2++; } while (usedFrames.has(frame) && g2 < 20);
      usedFrames.add(frame);
      const name = rng.pick(bank.names);
      const sentence = W.fillLegacy(frame, { name, n1, n2, noun: nounText }, loc, noun.vocabKey);
      const picture = equalGroups({ op, a: n1, b: n2, iconSrc: fileUri(theme, noun.noun), iconPx: d.icon, w: 600, slotH: d.slotH });
      const ruling = d.ruling ? rulingBlock({ rows: 1, w: 600, h: d.compact ? 30 : 44, glyphH: d.compact ? 18 : 24 }) : '';
      return `<div class="ws-card-stage" style="flex:0 0 auto;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:${d.compact ? 6 : 12}px;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:14px;padding:${d.compact ? '8px 14px' : '14px 18px'}" ` +
        `data-lcs-problem data-lcs-op="${op}" data-lcs-a="${n1}" data-lcs-b="${n2}">` +
        `<p style="font-family:'Nunito';font-weight:800;font-size:${d.font}px;line-height:1.45;color:#3A3530;margin:0" data-lcs-sentence>${sentence}</p>` +
        `<div style="background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:10px 14px">${picture}</div>` +
        `<div style="display:flex;gap:14px;align-items:stretch">${dotPanel({ w: 490, h: d.dots })}<div style="display:flex;align-items:center">${answerBox({ w: 84, h: 64, answer })}</div></div>` +
        (ruling ? `<div data-lcs-sentenceline>${ruling}</div>` : '') + `</div>`;
    });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;gap:${d.compact ? 8 : 14}px;justify-content:space-evenly">${blocks.join('')}</div>`,
      meta: {},
    };
  },

  // Level Set: every page except the published one
  _levelSet(d, theme, loc, ctx) {
    const rng = ctx.rng;
    // a NEW page that ran past the footer is rebuilt one step tighter (cli qaRetries): smaller story font, pictures and
    // working-space minimum — same numbers, same stories (the rng draw does not depend on it)
    const fit = Number(ctx.wpFit) || 0;
    if (fit) d = { ...d, font: (d.font || 18) - fit, icon: Math.max(12, (d.icon || 22) - 2 * fit), dots: Math.max(0, (d.dots || 0) - 20 * fit), iconPx: d.iconPx ? Math.max(24, d.iconPx - 3 * fit) : d.iconPx, thinkH: d.thinkH ? Math.max(40, d.thinkH - 15 * fit) : d.thinkH, fit };
    const screen = !!ctx.interactive, key = !!ctx.answerKey;
    const pool = W.nounsFor(theme, loc);
    if (pool.length < d.ops.length) throw new Error(`G3-370: theme ${theme}/${loc} has ${pool.length} countable nouns < ${d.ops.length}`);
    const nouns = rng.sample(pool, d.ops.length);
    const names = W.namesFor(loc, true);
    const usedFrames = new Set(), usedNums = new Set();
    const q = d.q || [2, 6];
    const problems = d.ops.map((op, i) => {
      let n1, n2, answer, guard = 0;
      do {
        if (op === 'mul') { n1 = rng.int(d.n1[0], d.n1[1]); n2 = rng.int(d.n2[0], d.n2[1]); answer = n1 * n2; }
        else { n2 = rng.int(d.n2[0], d.n2[1]); answer = rng.int(q[0], q[1]); n1 = answer * n2; }
        guard++;
      } while ((answer === n1 || answer === n2 || (op === 'mul' ? answer : n1) > d.max || (op === 'mul' ? answer : n1) < (d.min || 0) || usedNums.has(op + n1 + 'x' + n2)) && guard < 400);
      if (guard >= 400) throw new Error(`G3-370: no numbers for ${op} at ${JSON.stringify(d)}`);
      usedNums.add(op + n1 + 'x' + n2);
      const list = W.framesFor(loc, op);
      const free = list.map((f, k) => k).filter((k) => !usedFrames.has(op + k));
      const fk = rng.pick(free.length ? free : list.map((f, k) => k));
      usedFrames.add(op + fk);
      const name = rng.pick(names);
      const name2 = rng.pick(names.filter((n) => n !== name));
      const noun = nouns[i];
      const sentence = W.fill(list[fk], { name, name2, n1, n2, n3: '', noun: noun.text, gender: noun.gender }, loc);
      return { op, n1, n2, answer, noun: noun.noun, vocabKey: noun.vocabKey, frame: op + fk, sentence };
    });
    const eq = (p) => (p.op === 'mul' ? `${p.n1} ${mulGlyph(loc)} ${p.n2} = ${p.answer}` : `${p.n1} ${divGlyph(loc)} ${p.n2} = ${p.answer}`);
    const blocks = problems.map((p) => {
      const font = screen ? SCR.font : d.font;
      const picture = d.noPic ? '' : equalGroups({ op: p.op, a: p.n1, b: p.n2, iconSrc: fileUri(theme, p.noun), iconPx: screen ? Math.max(d.icon, Math.min(SCR.icon, p.op === 'mul' ? Math.floor(560 / (p.n1 * Math.min(p.n2, 3))) : 40)) : d.icon, w: 600, slotH: screen ? 52 : d.slotH });
      const stamps = `data-lcs-problem data-lcs-ls="1" data-lcs-op="${p.op}" data-lcs-a="${p.n1}" data-lcs-b="${p.n2}" data-lcs-max="${d.max}" data-lcs-min="${d.min || 0}"${d.noPic ? ' data-lcs-nopic="1"' : ''}`;
      const tight = !screen && (d.dots === 0 || (key && d.ops.length >= 3));
      const box = screen ? W.writeBox(p.answer, p.vocabKey, `data-lcs-op="${p.op}" data-lcs-a="${p.n1}" data-lcs-b="${p.n2}"`, SCR.box, 104) : answerBox({ w: tight ? 72 : 84, h: tight ? 44 : 64, answer: p.answer });
      let ruling = '';
      if (!screen && d.ruling) {
        ruling = rulingBlock({ rows: 1, w: tight ? 500 : 600, h: d.compact ? 30 : 44, glyphH: d.compact ? 18 : 24 });
        if (key) ruling = ruling.replace(/<svg[^]*?<\/svg>/, (svg) => seatOnRow(svg, eq(p)));
      }
      // dots 0 (the compact three-story pages): no dot panel — the deal boxes / groups are the working space; the answer
      // box sits beside the answer-sentence line
      const beside = !screen && (d.dots === 0 || (key && d.ops.length >= 3));   // a three-story KEY too: its title is longer
      const tail = screen
        ? `<div style="display:flex;justify-content:flex-end;align-items:center">${box}</div>`
        : beside ? ''
        // the working panel GROWS into the room the page has (a CSS dot grid fills whatever height it gets)
        : `<div style="flex:1 1 auto;display:flex;gap:14px;align-items:stretch" data-lcs-workspace><div data-lcs-dots style="flex:1;min-width:0;background-color:#FFFFFF;background-image:radial-gradient(circle,#C8BFAE 1.6px,transparent 1.8px);background-size:26px 24px;background-position:2px 2px;border:2px solid #F0E4CB;border-radius:12px;min-height:${key ? 0 : d.dots}px"></div><div style="display:flex;align-items:center">${box}</div></div>`;
      return `<div class="ws-card-stage" style="flex:${screen ? '0 0 auto' : '1 0 auto'};flex-direction:column;align-items:stretch;justify-content:flex-start;gap:${d.compact && !screen ? 6 : 12}px;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:14px;padding:${d.compact && !screen ? '8px 14px' : '14px 18px'}" ${stamps}>` +
        `<p style="font-family:'Nunito';font-weight:800;font-size:${font}px;line-height:1.45;color:#3A3530;margin:0" data-lcs-sentence>${p.sentence}</p>` +
        (picture ? `<div style="${beside ? 'flex:1 1 auto;display:flex;flex-direction:column;justify-content:center;' : ''}background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:10px 14px">${picture}</div>` : '') +
        tail + (beside ? `<div style="display:flex;gap:14px;align-items:center"><div style="flex:1;min-width:0" data-lcs-sentenceline>${ruling}</div>${box}</div>` : (ruling ? `<div data-lcs-sentenceline>${ruling}</div>` : '')) + `</div>`;
    });
    let bodyHtml = `<div style="flex:1;display:flex;flex-direction:column;gap:${screen ? 28 : (d.compact ? 8 : 14)}px;justify-content:${screen ? 'flex-start' : 'stretch'}">${blocks.join('')}</div>`;
    if (key) bodyHtml = W.fillAnswerBoxes(bodyHtml);
    return { bodyHtml, meta: { problems: problems.map(({ op, n1, n2, answer, vocabKey, frame }) => ({ op, n1, n2, answer, vocabKey, frame })) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const problems = [...document.querySelectorAll('[data-lcs-problem]')];
      if (problems.length < 2) fails.push(`only ${problems.length} problems`);
      // Level Set pages: the limits a level declares, the key, and a page without pictures stays without
      const keyPage = !!document.querySelector('[data-lcs-keytext]');
      problems.filter((p) => p.dataset.lcsLs).forEach((p, i) => {
        const a = +p.dataset.lcsA, b = +p.dataset.lcsB, op = p.dataset.lcsOp, max = +p.dataset.lcsMax;
        const ans = op === 'mul' ? a * b : a / b;
        if ((op === 'mul' ? ans : a) > max) fails.push(`p${i + 1}: over the level's ${max}`);
        if ((op === 'mul' ? ans : a) < (+p.dataset.lcsMin || 0)) fails.push(`p${i + 1}: under the level's ${p.dataset.lcsMin}`);
        const k = p.querySelector('[data-lcs-answer] [data-lcs-keytext]');
        if (keyPage ? (!k || +k.textContent !== ans) : !!k) fails.push(`p${i + 1}: key text wrong`);
        if (p.dataset.lcsNopic && p.querySelector('[data-lcs-group], [data-lcs-g1], [data-lcs-slot]')) fails.push(`p${i + 1}: a no-picture page shows a picture`);
      });
      problems.forEach((p, i) => {
        const a = +p.dataset.lcsA, b = +p.dataset.lcsB, op = p.dataset.lcsOp;
        let answer;
        if (op === 'mul') answer = a * b; else { if (a % b !== 0) fails.push(`p${i + 1}: ${a} not divisible by ${b}`); answer = a / b; }
        if (answer < 2 || answer > 36) fails.push(`p${i + 1}: answer ${answer} out of band`);
        if (answer === a || answer === b) fails.push(`p${i + 1}: answer equals a printed digit`);
        const text = p.querySelector('[data-lcs-sentence]').textContent;
        if (!new RegExp(`(^|\\D)${a}(\\D|$)`).test(text)) fails.push(`p${i + 1}: n1 ${a} not in sentence`);
        if (!new RegExp(`(^|\\D)${b}(\\D|$)`).test(text)) fails.push(`p${i + 1}: n2 ${b} not in sentence`);
        if (new RegExp(`(^|\\D)${answer}(\\D|$)`).test(text)) fails.push(`p${i + 1}: answer visible in sentence`);
        if (/\{/.test(text)) fails.push(`p${i + 1}: unfilled slot`);
        const box = p.querySelector('[data-lcs-answer]');
        if (!box || +box.dataset.lcsAnswer !== answer) fails.push(`p${i + 1}: box != ${answer}`);
        if (p.dataset.lcsNopic) { /* no picture on purpose (Level Set, mixed page level 3) */ } else if (op === 'mul') {
          const groups = [...p.querySelectorAll('[data-lcs-group]')];
          if (groups.length !== a) fails.push(`p${i + 1}: ${groups.length} groups, want ${a}`);
          groups.forEach((g) => { if (g.querySelectorAll('[data-lcs-g]').length !== b) fails.push(`p${i + 1}: group size != ${b}`); });
        } else if (op === 'share') {
          if (p.querySelectorAll('[data-lcs-g1]').length !== a) fails.push(`p${i + 1}: strip != ${a}`);
          const slots = [...p.querySelectorAll('[data-lcs-slot]')];
          if (slots.length !== b) fails.push(`p${i + 1}: ${slots.length} slots, want ${b}`);
          slots.forEach((s) => { if (s.querySelector('img')) fails.push(`p${i + 1}: slot pre-filled`); });
        } else {
          if (p.querySelectorAll('[data-lcs-g1]').length !== a) fails.push(`p${i + 1}: strip != ${a}`);
          if (p.querySelector('[data-lcs-slot], [data-lcs-group]')) fails.push(`p${i + 1}: group problem has boxes`);
        }
        const vis = [...p.querySelectorAll('*')].filter((n) => n.children.length === 0).map((n) => n.textContent.trim());
        if (vis.some((v) => v === String(answer))) fails.push(`p${i + 1}: answer printed`);
      });
      return fails;
    });
  },
};
