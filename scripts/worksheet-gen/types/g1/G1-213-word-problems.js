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
 */
'use strict';
const { labelSafeNouns, fileUri, labels } = require('../../image-cache/resolve.js');
const { answerBox } = require('../../templates/components.js');
const { FRAMES } = require('../../data/word-problems/frames.js');

function fillFrame(tpl, slots) {
  return tpl.replace(/\{(name|n1|n2|noun)\}/g, (_, k) => String(slots[k]));
}

module.exports = {
  id: 'G1-213',
  slug: 'picture-word-problems',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'word-problems',
  themeAxis: { applicable: true, minNouns: 3 },
  difficulty: {
    1: { max: 10, problems: 2, iconMax: 10 },
    2: { max: 20, problems: 2, iconMax: 12 },
    3: { max: 20, problems: 3, iconMax: 12 },
  },
  i18n: {
    en: {
      title: 'Picture Word Problems',
      instruction: 'Read each story. Use the pictures to help you. Write the answer in the box.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
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
      const sentence = fillFrame(frame, { name, n1, n2, noun: nounText });

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
        `<div class="ws-card-stage" style="flex:0 0 auto;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:12px;background:#FBF3E4;` +
        `border:2px solid #F0E4CB;border-radius:14px;padding:18px 20px" data-lcs-problem data-lcs-a="${n1}" data-lcs-b="${n2}" data-lcs-op="${op}">` +
        `<p style="font-family:'Nunito';font-weight:800;font-size:18px;line-height:1.5;color:#3A3530" data-lcs-sentence>${sentence}</p>` +
        (strip ? `<div style="background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:10px 14px">${strip}</div>` : '') +
        thinkPanel +
        `</div>`
      );
    }

    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;gap:26px;justify-content:space-evenly">${blocks.join('')}</div>`,
      meta: {},
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const problems = [...document.querySelectorAll('[data-lcs-problem]')];
      if (problems.length < 2) fails.push(`only ${problems.length} problems`);
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
