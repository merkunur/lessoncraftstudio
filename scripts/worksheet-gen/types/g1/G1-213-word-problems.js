/**
 * G1-213 — Picture word problems (add/sub, result unknown — 1.OA.A.1 /
 * de Sachaufgaben / fr problèmes / pt situações problema). Frame-bank
 * generation (data/word-problems/frames.js): native frames + name + digits
 * + vocab noun form, refuse-don't-guess. TWO generous problems per page
 * (design-panel lock): each has the sentence, an icon strip that RESTATES
 * the math (n1 icons + n2 icons; subtraction crosses out the taken ones —
 * pre-readers solve from the picture, readers from the text), a
 * show-your-thinking dot panel, and the answer box.
 * d1: within 10 · d2: within 20 (icons when countable) · d3: 3 problems.
 *
 * Level Set 2026-10-14 (walk #65, PDF + interactive + key). Level 2 copy 1 = the published page, built by the untouched
 * June draw (`_legacy`, byte-identical; G1-213 is live on fruits AND animals, both copy 1). Every other page is built by
 * `_levelSet` (lib/word-problems-levelset.js: the merged native story bank, an allow-list of countable things per theme)
 * from FACE_LEVELS — the four variation files only call levelsFor (⚠ a re-run of tools/gen-var-specs.js would flatten
 * them back to {1: D, 2: D, 3: D}). The ladder (audit verdicts): level 1 smaller numbers (within 10; the "within 10"
 * faces: the second number 2 or 3 — counting on); level 3 the UNKNOWN moves — change unknown (7 + ? = 12, the picture
 * shows only the known part) and compare (how many more / fewer, two rows of pictures).
 * Screen: kind type-number (the child writes the answer → types it). Key: every answer written in its box.
 */
'use strict';
const { labelSafeNouns, fileUri, labels } = require('../../image-cache/resolve.js');
const { answerBox } = require('../../templates/components.js');
const { FRAMES } = require('../../data/word-problems/frames.js');
const W = require('../../lib/word-problems-levelset.js');

function fillFrame(tpl, slots) {
  return tpl.replace(/\{(name|n1|n2|noun)\}/g, (_, k) => String(slots[k]));
}

// Level Set levels per face: level 2 = D (the published config); levels 1 / 3 overlay it. `kinds` = one story kind per
// problem (add / sub / addChange / subChange / compare); `n2Set` = the second number (or the change) is one of these.
const FACE_LEVELS = {
  'G1-213': { 1: { max: 10, iconMax: 10 }, 3: { kinds: ['addChange', 'subChange'] } },
  'G1-238': { 1: { max: 10, iconMax: 10 }, 3: { kinds: ['addChange', 'addChange'] } },
  'G1-239': { 1: { max: 10, iconMax: 10 }, 3: { kinds: ['compare', 'compare'], max: 12, iconMax: 12 } },
  'G1-240': { 1: { n2Set: [2, 3] }, 3: { kinds: ['addChange', 'subChange'] } },
  'G1-241': { 1: { n2Set: [2, 3] }, 3: { kinds: ['addChange', 'compare', 'subChange'] } },
};
function levelsFor(id, D) {
  const L = FACE_LEVELS[id];
  if (!L) throw new Error(`G1-213: no Level Set levels for ${id}`);
  return { 1: { ...D, ...L[1] }, 2: { ...D }, 3: { ...D, ...L[3] } };
}
// the screen page: the story big, the picture, then the write box
const SCR = { font: 30, icon: 44, box: 112 };

module.exports = {
  id: 'G1-213',
  slug: 'picture-word-problems',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'word-problems',
  themeAxis: { applicable: true, minNouns: 3 },
  FACE_LEVELS,
  levelsFor,
  // ⚠ level 2 is the published config ({ max: 20, problems: 2, iconMax: 12 }) — never change it
  difficulty: levelsFor('G1-213', { max: 20, problems: 2, iconMax: 12 }),
  i18n: {
    en: {
      title: 'Picture Word Problems',
      instruction: 'Read each story. Use the pictures to help you. Write the answer in the box.',
    },
  },
  // only new pages retry; the published page (level 2, copy 1) is never rebuilt differently
  qaRetries(it) { return it.difficulty === 2 && (it.variant || 1) === 1 ? [] : [{ wpFit: 1 }, { wpFit: 2 }]; },
  levelSetWords(m) { return ((m && m.problems) || []).map((p) => p.vocabKey + ':' + p.frame); },
  interactive: {
    kind: 'type-number', item: '[data-lcs-wbox]', answerAttr: 'data-lcs-answer', labelAttr: 'data-lcs-label',
    metaAttrs: ['data-lcs-kind', 'data-lcs-a', 'data-lcs-b', 'data-lcs-c'], instructionKey: 'read', screenHeight: 3400,
    maxDigits: () => 2,
    // INDEPENDENT oracle: the answer recomputed from the stamped story numbers and kind — never the page's answer stamp
    oracle: (items) => items.map((it) => {
      const m = it.meta || {};
      const v = W.g1Answer(m['data-lcs-kind'], +m['data-lcs-a'], +m['data-lcs-b'], +m['data-lcs-c']);
      if (!Number.isInteger(v) || v < 1) throw new Error('word-problems oracle: no answer for ' + JSON.stringify(m));
      return v;
    }),
  },

  build({ theme, difficulty, locale }, ctx) {
    const published = Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
    if (!published) return this._levelSet(this.difficulty[difficulty], theme, (locale || 'en').slice(0, 2), ctx || {});
    return this._legacy({ theme, difficulty, locale }, ctx);
  },

  // ⚠ the June draw, byte-identical: the published page (level 2, copy 1) only
  _legacy({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const bank = FRAMES[loc];
    if (!bank) throw new Error(`G1-213: no native frame bank for locale ${loc}`);
    const nouns = labelSafeNouns(theme);
    if (nouns.length < this.themeAxis.minNouns) {
      throw new Error(`G1-213: theme ${theme} has ${nouns.length} nouns < 3`);
    }
    const pickNouns = rng.sample(nouns, d.problems);
    const usedFrames = new Set();

    const blocks = [];
    for (let i = 0; i < d.problems; i++) {
      // nt20-VAR: opsPattern pins the operation per slot (['add'] = addition-
      // only page, ['sub'] = subtraction-only); default keeps the alternation
      const op = d.opsPattern ? d.opsPattern[i % d.opsPattern.length] : (i % 2 === 0 ? 'add' : 'sub');
      // EVERY problem keeps its icon strip (visual-critic finding: a
      // pictureless problem under an instruction that promises pictures is a
      // broken scaffold) — so all quantities stay within iconMax.
      let n1, n2;
      if (op === 'add') {
        n1 = rng.int(3, d.iconMax - 2);
        n2 = rng.int(2, Math.min(d.iconMax - n1, 9));
      } else {
        n1 = rng.int(4, d.iconMax);
        n2 = rng.int(2, n1 - 2);
      }
      const answer = op === 'add' ? n1 + n2 : n1 - n2;
      const noun = pickNouns[i];
      // noun form: plural as-is, or a curated per-noun table (fi partitive)
      let nounText;
      if (bank.nounForm === 'plural') {
        nounText = labels(noun.vocabKey, loc)[1];
        if (!nounText) throw new Error(`G1-213: no plural for ${noun.vocabKey} in ${loc}`);
      } else {
        nounText = bank.nounForms && bank.nounForms[noun.vocabKey];
        if (!nounText) throw new Error(`G1-213: no curated noun form for ${noun.vocabKey} in ${loc}`);
      }
      if (bank.nounCase === 'lower') nounText = nounText.toLocaleLowerCase(loc);
      let frame, guard = 0;
      do { frame = rng.pick(bank.frames[op]); guard++; } while (usedFrames.has(frame) && guard < 20);
      usedFrames.add(frame);
      const name = rng.pick(bank.names);
      const sentence = W.fillLegacy(frame, { name, n1, n2, noun: nounText }, loc, noun.vocabKey);

      // icon strip restating the math (always present by construction)
      let strip = '';
      {
        // 40px + 5px gaps lets a full 10+2 addition sit on ONE line (a
        // wrapped "+2" group reads as broken grouping); 3-problem pages
        // (nt20-VAR G1-241) compact to d.iconPx to fit the page box
        const iconPx = d.iconPx || 40;
        const icon = (cls) => `<img class="ws-icon${cls ? ' ' + cls : ''}" src="${fileUri(theme, noun.noun)}" alt="" ` +
          `style="width:${iconPx}px;height:${iconPx}px${cls ? ';opacity:0.45' : ''}">`;
        if (op === 'add') {
          strip =
            `<div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap" data-lcs-strip data-lcs-n1="${n1}" data-lcs-n2="${n2}" data-lcs-op="add">` +
            Array.from({ length: n1 }, () => `<span data-lcs-g1>${icon()}</span>`).join('') +
            `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#146B5E;margin:0 5px">+</span>` +
            Array.from({ length: n2 }, () => `<span data-lcs-g2>${icon()}</span>`).join('') +
            `</div>`;
        } else {
          strip =
            `<div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap" data-lcs-strip data-lcs-n1="${n1}" data-lcs-n2="${n2}" data-lcs-op="sub">` +
            Array.from({ length: n1 }, (_, k) => {
              const crossed = k >= n1 - n2;
              return `<span style="position:relative;display:inline-flex"${crossed ? ' data-lcs-crossed' : ' data-lcs-g1'}>` +
                icon(crossed ? 'x' : '') +
                (crossed
                  ? `<svg width="${iconPx}" height="${iconPx}" viewBox="0 0 44 44" style="position:absolute;left:0;top:0">` +
                    `<line x1="6" y1="6" x2="38" y2="38" stroke="#F2784B" stroke-width="3.5" stroke-linecap="round"/>` +
                    `<line x1="38" y1="6" x2="6" y2="38" stroke="#F2784B" stroke-width="3.5" stroke-linecap="round"/></svg>`
                  : '') +
                `</span>`;
            }).join('') +
            `</div>`;
        }
      }

      // show-your-thinking panel: faint dot grid (height parameterized for
      // the compact 3-problem page — nt20-VAR G1-241; default byte-identical)
      const thinkH = d.thinkH || 104;
      const dotRows = thinkH >= 100 ? 4 : 3;
      const dots = [];
      for (let r = 0; r < dotRows; r++) for (let c = 0; c < 18; c++) {
        dots.push(`<circle cx="${14 + c * 26}" cy="${14 + r * 24}" r="1.6" fill="#C8BFAE"/>`);
      }
      const thinkPanel =
        `<div style="display:flex;gap:14px;align-items:stretch">` +
        `<div style="flex:1;min-width:0;background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;min-height:${thinkH}px;display:flex;align-items:center;overflow:hidden">` +
        `<svg width="490" height="${thinkH}" viewBox="0 0 490 ${thinkH}" aria-hidden="true" preserveAspectRatio="xMinYMid meet">${dots.join('')}</svg></div>` +
        `<div style="display:flex;align-items:center">${answerBox({ w: 84, h: 64, answer })}</div>` +
        `</div>`;

      blocks.push(
        // 3-problem pages compact the furniture — long-sentence locales (de)
        // overflow the page box at the 2-problem metrics
        `<div class="ws-card-stage" style="flex:0 0 auto;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:${d.problems >= 3 ? 8 : 12}px;background:#FBF3E4;` +
        `border:2px solid #F0E4CB;border-radius:14px;padding:${d.problems >= 3 ? '12px 16px' : '18px 20px'}" data-lcs-problem data-lcs-a="${n1}" data-lcs-b="${n2}" data-lcs-op="${op}">` +
        `<p style="font-family:'Nunito';font-weight:800;font-size:${d.problems >= 3 ? 16 : 18}px;line-height:${d.problems >= 3 ? 1.45 : 1.5};color:#3A3530" data-lcs-sentence>${sentence}</p>` +
        (strip ? `<div style="background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:10px 14px">${strip}</div>` : '') +
        thinkPanel +
        `</div>`
      );
    }

    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;gap:${d.problems >= 3 ? 14 : 26}px;justify-content:space-evenly">${blocks.join('')}</div>`,
      meta: {},
    };
  },

  // Level Set: every page except the published one (levels 1 and 3, and the new level-2 copies)
  _levelSet(d, theme, loc, ctx) {
    const rng = ctx.rng;
    // a NEW page that ran past the footer is rebuilt one step tighter (cli qaRetries): smaller story font, pictures and
    // working-space minimum — same numbers, same stories (the rng draw does not depend on it)
    const fit = Number(ctx.wpFit) || 0;
    if (fit) d = { ...d, font: (d.font || 18) - fit, icon: Math.max(12, (d.icon || 22) - 2 * fit), dots: Math.max(0, (d.dots || 0) - 20 * fit), iconPx: d.iconPx ? Math.max(24, d.iconPx - 3 * fit) : d.iconPx, thinkH: d.thinkH ? Math.max(40, d.thinkH - 15 * fit) : d.thinkH, fit };
    const screen = !!ctx.interactive, key = !!ctx.answerKey;
    const pool = W.nounsFor(theme, loc);
    const kinds = d.kinds || Array.from({ length: d.problems }, (_, i) => (d.opsPattern ? d.opsPattern[i % d.opsPattern.length] : (i % 2 === 0 ? 'add' : 'sub')));
    if (pool.length < kinds.length) throw new Error(`G1-213: theme ${theme}/${loc} has ${pool.length} countable nouns < ${kinds.length}`);
    const nouns = rng.sample(pool, kinds.length);
    const names = W.namesFor(loc, false);
    const usedFrames = new Set(), usedNums = new Set();
    const three = kinds.length >= 3;
    const problems = kinds.map((kind, i) => {
      let nums = null, guard = 0;
      do { nums = W.drawG1(kind, d, rng); guard++; } while ((!nums || usedNums.has([nums.n1, nums.n2, nums.n3].join())) && guard < 400);
      if (!nums) throw new Error(`G1-213: no numbers for ${kind} at ${JSON.stringify(d)}`);
      usedNums.add([nums.n1, nums.n2, nums.n3].join());
      const list = W.framesFor(loc, kind);
      const free = list.map((f, k) => k).filter((k) => !usedFrames.has(kind + k));
      const fk = rng.pick(free.length ? free : list.map((f, k) => k));
      usedFrames.add(kind + fk);
      const name = rng.pick(names);
      const name2 = rng.pick(names.filter((n) => n !== name));
      const noun = nouns[i];
      const sentence = W.fill(list[fk], { name, name2, n1: nums.n1, n2: nums.n2, n3: nums.n3, noun: noun.text, gender: noun.gender }, loc);
      return { kind, ...nums, name, name2, noun: noun.noun, vocabKey: noun.vocabKey, frame: kind + fk, sentence, boxes: kind === 'compare' && !/{name2}/.test(list[fk]) };
    });

    const blocks = problems.map((p) => {
      const font = screen ? SCR.font : (three ? 16 : 20) - (d.fit || 0);
      // the picture: icons sized so the whole strip stays on one line of the card
      const room = screen ? 600 : (three ? 560 : 580);
      const count = p.kind === 'add' ? p.n1 + p.n2 : p.kind === 'compare' ? p.n1 + 2.2 : p.kind === 'sub' ? p.n1 : p.n1 + 3.5;
      const iconPx = Math.max(24, Math.min(screen ? SCR.icon : (d.iconPx || 40), Math.floor(room / count) - 5));
      let strip;
      if (p.kind === 'addChange' || p.kind === 'subChange') strip = W.changeStrip({ kind: p.kind, n1: p.n1, n3: p.n3, theme, noun: p.noun, iconPx, qPx: iconPx });
      else if (p.kind === 'compare') strip = W.compareStrip({ n1: p.n1, n2: p.n2, theme, noun: p.noun, iconPx, name: p.name, name2: p.name2, namePx: screen ? 22 : 15, boxes: p.boxes });
      else if (p.kind === 'add') {
        strip = `<div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap" data-lcs-strip data-lcs-n1="${p.n1}" data-lcs-n2="${p.n2}" data-lcs-op="add">` +
          Array.from({ length: p.n1 }, () => `<span data-lcs-g1>${W.iconImg(theme, p.noun, iconPx)}</span>`).join('') +
          `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#146B5E;margin:0 5px">+</span>` +
          Array.from({ length: p.n2 }, () => `<span data-lcs-g2>${W.iconImg(theme, p.noun, iconPx)}</span>`).join('') + `</div>`;
      } else {
        const cross = `<svg width="${iconPx}" height="${iconPx}" viewBox="0 0 44 44" style="position:absolute;left:0;top:0"><line x1="6" y1="6" x2="38" y2="38" stroke="#F2784B" stroke-width="3.5" stroke-linecap="round"/><line x1="38" y1="6" x2="6" y2="38" stroke="#F2784B" stroke-width="3.5" stroke-linecap="round"/></svg>`;
        strip = `<div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap" data-lcs-strip data-lcs-n1="${p.n1}" data-lcs-n2="${p.n2}" data-lcs-op="sub">` +
          Array.from({ length: p.n1 }, (_, k) => {
            const crossed = k >= p.n1 - p.n2;
            return `<span style="position:relative;display:inline-flex"${crossed ? ' data-lcs-crossed' : ' data-lcs-g1'}>${W.iconImg(theme, p.noun, iconPx, crossed ? ';opacity:0.45' : '')}${crossed ? cross : ''}</span>`;
          }).join('') + `</div>`;
      }
      const stamps = `data-lcs-problem data-lcs-ls="1" data-lcs-kind="${p.kind}" data-lcs-a="${p.n1}" data-lcs-b="${p.n2 == null ? '' : p.n2}" data-lcs-c="${p.n3 == null ? '' : p.n3}" data-lcs-op="${p.kind}" data-lcs-max="${d.max}"`;
      const box = screen
        ? W.writeBox(p.answer, p.vocabKey, `data-lcs-kind="${p.kind}" data-lcs-a="${p.n1}" data-lcs-b="${p.n2 == null ? '' : p.n2}" data-lcs-c="${p.n3 == null ? '' : p.n3}"`, SCR.box, 104)
        : answerBox({ w: 84, h: 64, answer: p.answer });
      const thinkH = key ? 0 : three ? (d.thinkH || 70) : 90;   // the key's panel only takes the room that is left (its title is longer)   // the minimum: the panel GROWS into the room the page has (flex:1)
      const tail = screen
        ? `<div style="display:flex;justify-content:flex-end;align-items:center">${box}</div>`
        : `<div style="flex:1 1 auto;display:flex;gap:14px;align-items:stretch" data-lcs-workspace>` +
          `<div data-lcs-dots style="flex:1;min-width:0;background-color:#FFFFFF;background-image:radial-gradient(circle,#C8BFAE 1.6px,transparent 1.8px);background-size:26px 24px;background-position:2px 2px;border:2px solid #F0E4CB;border-radius:12px;min-height:${thinkH}px"></div>` +
          `<div style="display:flex;align-items:center">${box}</div></div>`;
      // a printed card stretches: the cards share the page's height and the working panel takes what is left
      return `<div class="ws-card-stage" style="flex:${screen ? '0 0 auto' : '1 0 auto'};flex-direction:column;align-items:stretch;justify-content:flex-start;gap:${three && !screen ? 8 : 12}px;background:#FBF3E4;` +
        `border:2px solid #F0E4CB;border-radius:14px;padding:${three && !screen ? '12px 16px' : '18px 20px'}" ${stamps}>` +
        `<p style="font-family:'Nunito';font-weight:800;font-size:${font}px;line-height:${three && !screen ? 1.4 : 1.45};color:#3A3530;margin:0" data-lcs-sentence>${p.sentence}</p>` +
        `<div style="background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:10px 14px">${strip}</div>` +
        tail + `</div>`;
    });
    let bodyHtml = `<div style="flex:1;display:flex;flex-direction:column;gap:${screen ? 28 : (three ? 14 : 26)}px;justify-content:${screen ? 'flex-start' : 'stretch'}">${blocks.join('')}</div>`;
    if (key) bodyHtml = W.fillAnswerBoxes(bodyHtml);
    return { bodyHtml, meta: { problems: problems.map(({ kind, n1, n2, n3, answer, vocabKey, frame, name, name2 }) => ({ kind, n1, n2, n3, answer, vocabKey, frame, name, name2 })) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const problems = [...document.querySelectorAll('[data-lcs-problem]')];
      if (problems.length < 2) fails.push(`only ${problems.length} problems`);
      // Level Set pages (stamped data-lcs-ls): the kind's own answer, numbers, picture and limits
      const ls = problems.filter((p) => p.dataset.lcsLs);
      if (ls.length && ls.length !== problems.length) fails.push('mixed Level Set and published problems on one page');
      if (ls.length) {
        const keyPage = !!document.querySelector('[data-lcs-keytext]');
        const has = (t, n) => new RegExp(`(^|\\D)${n}(\\D|$)`).test(t);
        ls.forEach((p, i) => {
          const P = `p${i + 1}`;
          const k = p.dataset.lcsKind, a = +p.dataset.lcsA, b = p.dataset.lcsB === '' ? null : +p.dataset.lcsB, c = p.dataset.lcsC === '' ? null : +p.dataset.lcsC, max = +p.dataset.lcsMax;
          const ans = k === 'add' ? a + b : (k === 'sub' || k === 'compare') ? a - b : k === 'addChange' ? c - a : k === 'subChange' ? a - c : NaN;
          if (!Number.isInteger(ans) || ans < 1) { fails.push(`${P}: no answer for ${k}`); return; }
          const nums = [a, b, c].filter((v) => v != null);
          if (nums.some((v) => v > max) || ans > max) fails.push(`${P}: a number over ${max}`);
          if (nums.includes(ans)) fails.push(`${P}: the answer is a printed number`);
          const text = (p.querySelector('[data-lcs-sentence]') || {}).textContent || '';
          if (!text) { fails.push(`${P}: no story`); return; }
          (k === 'addChange' || k === 'subChange' ? [a, c] : [a, b]).forEach((v) => { if (!has(text, v)) fails.push(`${P}: ${v} not in the story`); });
          if (has(text, ans)) fails.push(`${P}: the answer is in the story`);
          if (/[{}]/.test(text)) fails.push(`${P}: unfilled slot`);
          const box = p.querySelector('[data-lcs-answer]');
          if (!box || +box.dataset.lcsAnswer !== ans) fails.push(`${P}: box != ${ans}`);
          const key = box && box.querySelector('[data-lcs-keytext]');
          if (keyPage ? (!key || +key.textContent !== ans) : !!key) fails.push(`${P}: key text wrong`);
          const strip = p.querySelector('[data-lcs-strip]');
          if (!strip) { fails.push(`${P}: no picture`); return; }
          const g1 = strip.querySelectorAll('[data-lcs-g1]').length, g2 = strip.querySelectorAll('[data-lcs-g2]').length, x = strip.querySelectorAll('[data-lcs-crossed]').length;
          if (k === 'add' && (g1 !== a || g2 !== b)) fails.push(`${P}: add picture != ${a} + ${b}`);
          if (k === 'sub' && (g1 !== a - b || x !== b)) fails.push(`${P}: take-away picture wrong`);
          if (k === 'compare' && (g1 !== a || g2 !== b)) fails.push(`${P}: compare rows != ${a} / ${b}`);
          if (k === 'addChange' || k === 'subChange') {
            // the change is UNKNOWN: only the start is pictured, the result is printed, the change is a "?"
            if (g1 !== a || g2 || x) fails.push(`${P}: change picture must show only the ${a} at the start`);
            const tot = strip.querySelector('[data-lcs-total]');
            if (!tot || +tot.textContent !== c) fails.push(`${P}: change picture total != ${c}`);
            if (!strip.querySelector('[data-lcs-unknown]')) fails.push(`${P}: no "?" in the change picture`);
          }
          // the picture fits its card on one line (a wrapped strip breaks the grouping)
          const imgs = [...strip.querySelectorAll('img')];
          if (k !== 'compare' && imgs.length && new Set(imgs.map((im) => Math.round(im.getBoundingClientRect().top))).size > 1) fails.push(`${P}: picture wraps onto two lines`);
        });
        return fails;
      }
      problems.forEach((p, i) => {
        const a = +p.dataset.lcsA, b = +p.dataset.lcsB, op = p.dataset.lcsOp;
        const answer = op === 'add' ? a + b : a - b;
        if (answer < 0 || answer > 20) fails.push(`p${i + 1}: answer ${answer} out of band`);
        const sentence = p.querySelector('[data-lcs-sentence]');
        if (!sentence) { fails.push(`p${i + 1}: no sentence`); return; }
        const text = sentence.textContent;
        // both numbers must appear as digits in the sentence
        if (!new RegExp(`(^|\\D)${a}(\\D|$)`).test(text)) fails.push(`p${i + 1}: n1 ${a} not in sentence`);
        if (!new RegExp(`(^|\\D)${b}(\\D|$)`).test(text)) fails.push(`p${i + 1}: n2 ${b} not in sentence`);
        // the ANSWER must not appear in the sentence (would give it away)
        if (answer !== a && answer !== b && new RegExp(`(^|\\D)${answer}(\\D|$)`).test(text)) fails.push(`p${i + 1}: answer visible in sentence`);
        if (/\{(name|n1|n2|noun)\}/.test(text)) fails.push(`p${i + 1}: unfilled slot`);
        const box = p.querySelector('[data-lcs-answer]');
        if (!box || +box.dataset.lcsAnswer !== answer) fails.push(`p${i + 1}: box != ${answer}`);
        const strip = p.querySelector('[data-lcs-strip]');
        if (!strip) fails.push(`p${i + 1}: missing icon strip (instruction promises pictures)`);
        if (strip) {
          if (strip.dataset.lcsOp === 'add') {
            if (strip.querySelectorAll('[data-lcs-g1]').length !== a) fails.push(`p${i + 1}: strip n1 mismatch`);
            if (strip.querySelectorAll('[data-lcs-g2]').length !== b) fails.push(`p${i + 1}: strip n2 mismatch`);
          } else {
            if (strip.querySelectorAll('[data-lcs-g1]').length !== a - b) fails.push(`p${i + 1}: strip kept mismatch`);
            if (strip.querySelectorAll('[data-lcs-crossed]').length !== b) fails.push(`p${i + 1}: strip crossed mismatch`);
          }
        }
      });
      return fails;
    });
  },
};
