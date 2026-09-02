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
 */
'use strict';
const { answerBox } = require('../../templates/components.js');
const { dotPanel, equalGroups, rulingBlock } = require('../../templates/components-b2.js');
const { labelSafeNouns, fileUri, labels } = require('../../image-cache/resolve.js');
const { WP_MULDIV } = require('../../data/b2/wp-muldiv-frames.js');

function fillFrame(tpl, slots) { return tpl.replace(/\{(name|n1|n2|noun)\}/g, (_, k) => String(slots[k])); }

module.exports = {
  id: 'G3-370',
  slug: 'multiplication-division-word-problems',
  gradeBand: 'G3',
  assetClass: 'icon-placement',
  exerciseType: 'word-problems',
  themeAxis: { applicable: true, minNouns: 3, excludeBw: true },
  difficulty: {
    1: { ops: ['mul', 'mul'], n1: [2, 4], n2: [2, 5], max: 20, icon: 24, font: 18, dots: 80, ruling: true, compact: false },
    2: { ops: ['mul', 'share'], n1: [2, 6], n2: [2, 6], max: 36, icon: 22, font: 18, dots: 92, ruling: true, compact: false },
    3: { ops: ['mul', 'share', 'group'], n1: [2, 6], n2: [2, 6], max: 36, icon: 20, font: 16, dots: 56, ruling: false, compact: true },
  },
  i18n: {
    en: {
      title: 'Multiplication and Division Word Problems',
      instruction: 'Read each story. Use the picture to help you. Write the answer in the box, then finish the answer sentence.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const bank = WP_MULDIV[loc];
    if (!bank) throw new Error(`G3-370: no frame bank for ${loc}`);
    const nouns = rng.sample(labelSafeNouns(theme), d.ops.length);
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
      const sentence = fillFrame(frame, { name, n1, n2, noun: nounText });
      const picture = equalGroups({ op, a: n1, b: n2, iconSrc: fileUri(theme, noun.noun), iconPx: d.icon, w: 600 });
      const ruling = d.ruling ? rulingBlock({ rows: 1, w: 600, h: 44, glyphH: 24 }) : '';
      return `<div class="ws-card-stage" style="flex:0 0 auto;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:${d.compact ? 8 : 12}px;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:14px;padding:${d.compact ? '12px 16px' : '18px 20px'}" ` +
        `data-lcs-problem data-lcs-op="${op}" data-lcs-a="${n1}" data-lcs-b="${n2}">` +
        `<p style="font-family:'Nunito';font-weight:800;font-size:${d.font}px;line-height:1.45;color:#3A3530;margin:0" data-lcs-sentence>${sentence}</p>` +
        `<div style="background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:10px 14px">${picture}</div>` +
        `<div style="display:flex;gap:14px;align-items:stretch">${dotPanel({ w: 490, h: d.dots })}<div style="display:flex;align-items:center">${answerBox({ w: 84, h: 64, answer })}</div></div>` +
        (ruling ? `<div data-lcs-sentenceline>${ruling}</div>` : '') + `</div>`;
    });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;gap:${d.compact ? 14 : 26}px;justify-content:space-evenly">${blocks.join('')}</div>`,
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
        if (op === 'mul') {
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
