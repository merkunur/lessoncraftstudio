/**
 * Factory for the pattern family (K-046..K-053):
 *  - attribute 'noun':  pattern elements are different nouns (AB / ABC / AABB)
 *  - attribute 'size':  same noun, big vs small
 *  - attribute 'flip':  same noun, upright vs flipped (position pattern)
 *  - attribute 'count': growing pattern — groups of 1,2,3,… icons
 *  - variant 'next':    the child picks what comes next (choice chips)
 *  - variant 'missing': one slot inside the sequence is blank
 * Verify re-derives the expected element from the unit and asserts the
 * correct choice / blank ground truth.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

function makePatternType(cfg) {
  const { id, slug, unit, attribute, variant, i18n, repeats } = cfg;
  return {
    id,
    slug,
    gradeBand: 'K',
    assetClass: 'icon-placement',
    exerciseType: 'patterns',
    themeAxis: { applicable: true, minNouns: 4 },
    difficulty: {
      1: { rows: 4, repeats: repeats || 2 },
      2: { rows: 4, repeats: (repeats || 2) + 1 },
      3: { rows: 5, repeats: (repeats || 2) + 1 },
    },
    i18n,

    build({ theme, difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const pool = labelSafeNouns(theme);
      const cards = [];
      const truth = [];

      for (let i = 0; i < d.rows; i++) {
        // element renderers keyed by symbol
        const symbols = [...new Set(unit)];
        const elements = {};   // symbol -> {src, px, flip}
        const px = attribute === 'count' ? 34 : 52;
        if (attribute === 'noun') {
          const ns = rng.sample(pool, symbols.length + 1); // +1 distractor noun
          symbols.forEach((s, k) => { elements[s] = { src: fileUri(theme, ns[k].noun), px }; });
          elements._distractor = { src: fileUri(theme, ns[symbols.length].noun), px };
        } else {
          const n = rng.pick(pool);
          const src = fileUri(theme, n.noun);
          if (attribute === 'size') {
            elements.A = { src, px: 60 }; elements.B = { src, px: 34 };
          } else if (attribute === 'flip') {
            elements.A = { src, px }; elements.B = { src, px, flip: true };
          } else if (attribute === 'count') {
            elements.A = { src, px }; // counts derived from position below
          }
        }

        // adaptive slot size: the sequence + choices must share ~640px
        const slotCount = attribute === 'count' ? 4 : unit.length * d.repeats + (variant === 'next' ? 1 : 0);
        const availW = 420;
        const slotPx = attribute === 'count'
          ? 84   // growing-pattern slots hold up to 4 icons
          : Math.max(40, Math.min(64, Math.floor((availW - (slotCount - 1) * 8) / slotCount)));
        const slotStyle = `width:${slotPx}px;height:${slotPx}px`;
        const iconFit = (wanted) => Math.min(wanted, slotPx - 12);

        const render = (sym, slotIdx) => {
          if (attribute === 'count') {
            const count = slotIdx + 1;
            const cpx = Math.min(px, Math.floor((slotPx - 14) / 2));
            const imgs = Array.from({ length: count }, () =>
              `<img class="ws-icon" src="${elements.A.src}" alt="" style="width:${cpx}px;height:${cpx}px">`).join('');
            return `<span class="ws-pattern-slot" style="${slotStyle}" data-lcs-el="${count}"><span style="display:flex;flex-wrap:wrap;gap:2px;justify-content:center;max-width:${slotPx - 8}px">${imgs}</span></span>`;
          }
          const e = elements[sym];
          return `<span class="ws-pattern-slot" style="${slotStyle}" data-lcs-el="${sym}">` +
            `<img class="ws-icon" src="${e.src}" alt="" style="width:${iconFit(e.px)}px;height:${iconFit(e.px)}px${e.flip ? ';transform:scaleY(-1)' : ''}"></span>`;
        };

        let seq, answerSym, blankIdx, seqLen;
        if (attribute === 'count') {
          seqLen = 4;
          blankIdx = seqLen - 1;            // growing: always "what comes next"
          answerSym = String(seqLen);       // count of the next group
        } else {
          seq = Array.from({ length: unit.length * d.repeats }, (_, k) => unit[k % unit.length]);
          if (variant === 'missing') {
            blankIdx = rng.int(1, seq.length - 2);
          } else {
            blankIdx = seq.length;          // blank appended at the end
            seq.push(unit[seq.length % unit.length]);
          }
          answerSym = seq[blankIdx];
          seqLen = seq.length;
        }

        const slots = [];
        for (let k = 0; k < seqLen; k++) {
          if (k === blankIdx) {
            slots.push(`<span class="ws-pattern-slot ws-pattern-slot--blank" style="${slotStyle}" data-lcs-blank="${attribute === 'count' ? k + 1 : answerSym}">?</span>`);
          } else {
            slots.push(render(attribute === 'count' ? null : seq[k], k));
          }
        }

        // choice chips: correct + 2 distractors
        let choices;
        if (attribute === 'count') {
          const counts = [seqLen, seqLen - 1, seqLen + 1];
          choices = rng.shuffle(counts).map((c) => ({
            html: `<span style="display:flex;flex-wrap:wrap;gap:2px;justify-content:center;max-width:88px">` +
              Array.from({ length: c }, () => `<img class="ws-icon" src="${elements.A.src}" alt="" style="width:22px;height:22px">`).join('') + `</span>`,
            correct: c === seqLen,
          }));
        } else {
          const opts = [...new Set([answerSym, ...rng.shuffle(symbols.filter((s) => s !== answerSym))])].slice(0, 2);
          if (attribute === 'noun') opts.push('_distractor');
          choices = rng.shuffle(opts).map((sym) => {
            const e = elements[sym];
            return {
              html: `<img class="ws-icon" src="${e.src}" alt="" style="width:${Math.min(e.px, 46)}px;height:${Math.min(e.px, 46)}px${e.flip ? ';transform:scaleY(-1)' : ''}">`,
              correct: sym === answerSym,
            };
          });
        }
        const chipHtml = choices.map((c) =>
          `<span class="ws-pattern-chip"${c.correct ? ' data-lcs-correct="1"' : ''}>${c.html}</span>`).join('');

        cards.push(
          `<div class="ws-card-stage" style="gap:12px;justify-content:space-between;padding:6px 10px">` +
          `<span class="ws-pattern-seq" data-lcs-unitlen="${unit.length}" data-lcs-attr="${attribute}">${slots.join('')}</span>` +
          `<span class="ws-pattern-choices">${chipHtml}</span>` +
          `</div>`
        );
        truth.push({ row: i + 1, answer: answerSym, blankIdx });
      }
      return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows, numbered: false }), meta: { rows: truth } };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
          const seq = card.querySelector('[data-lcs-unitlen]');
          const blank = card.querySelector('[data-lcs-blank]');
          if (!blank) { fails.push(`row ${i + 1}: no blank slot`); return; }
          const chips = [...card.querySelectorAll('.ws-pattern-chip')];
          const correct = chips.filter((c) => c.dataset.lcsCorrect);
          if (correct.length !== 1) { fails.push(`row ${i + 1}: ${correct.length} correct chips`); return; }
          if (chips.length < 2) fails.push(`row ${i + 1}: only ${chips.length} choices`);

          // semantic re-derivation: walk the visible slots, infer the unit,
          // and confirm the declared blank value matches the pattern.
          const attr = seq.dataset.lcsAttr;
          const unitLen = parseInt(seq.dataset.lcsUnitlen, 10);
          const slots = [...seq.children];
          const els = slots.map((s) => s.dataset.lcsBlank !== undefined ? null : s.dataset.lcsEl);
          const blankIdx = slots.findIndex((s) => s.dataset.lcsBlank !== undefined);
          if (attr === 'count') {
            // growing pattern: visible groups must count 1,2,3,… and the blank
            // declares the next count
            els.forEach((e, k) => {
              if (e !== null && parseInt(e, 10) !== k + 1) fails.push(`row ${i + 1}: slot ${k + 1} holds ${e}, expected ${k + 1}`);
              if (e !== null) {
                const imgs = slots[k].querySelectorAll('img').length;
                if (imgs !== k + 1) fails.push(`row ${i + 1}: slot ${k + 1} shows ${imgs} icons != ${k + 1}`);
              }
            });
            if (parseInt(slots[blankIdx].dataset.lcsBlank, 10) !== blankIdx + 1) fails.push(`row ${i + 1}: blank declares wrong next count`);
          } else {
            // derive each unit position from any visible slot at that residue
            const unit = [];
            for (let r = 0; r < unitLen; r++) {
              const sample = els.find((e, k) => e !== null && k % unitLen === r);
              unit[r] = sample;
            }
            els.forEach((e, k) => {
              if (e !== null && unit[k % unitLen] !== undefined && e !== unit[k % unitLen]) {
                fails.push(`row ${i + 1}: slot ${k + 1} breaks the pattern`);
              }
            });
            const expected = unit[blankIdx % unitLen];
            if (expected !== undefined && blank.dataset.lcsBlank !== expected) {
              fails.push(`row ${i + 1}: blank declares ${blank.dataset.lcsBlank}, pattern expects ${expected}`);
            }
          }
        });
        return fails;
      });
    },
  };
}

module.exports = { makePatternType };
