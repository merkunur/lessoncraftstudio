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
const slot = require('../../lib/slot.js');

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
        // maker (2026-11-02): a row's pictures are its slot (role row<i>: the unit's pictures, then the distractor); a
        // teacher's picture replaces one of them wherever it stands in the row — no draw moves (catalogue unchanged)
        const role = 'row' + i;
        const tap = (k) => slot.attr(ctx, role, k);
        if (attribute === 'noun') {
          const ns = slot.pictures(ctx, rng.sample(pool, symbols.length + 1), pool, theme, role); // +1 distractor noun
          symbols.forEach((s, k) => { elements[s] = { src: fileUri(theme, ns[k].noun), px, tap: tap(k) }; });
          elements._distractor = { src: fileUri(theme, ns[symbols.length].noun), px, tap: tap(symbols.length) };
        } else {
          const n = slot.pictures(ctx, [rng.pick(pool)], pool, theme, role)[0];
          const src = fileUri(theme, n.noun);
          if (attribute === 'size') {
            elements.A = { src, px: 60, tap: tap(0) }; elements.B = { src, px: 34, tap: tap(0) };
          } else if (attribute === 'flip') {
            elements.A = { src, px, tap: tap(0) }; elements.B = { src, px, flip: true, tap: tap(0) };
          } else if (attribute === 'count') {
            elements.A = { src, px, tap: tap(0) }; // counts derived from position below
          }
        }

        // adaptive slot size: the sequence + choices must share the stage (627 px inside its padding, the same on A4 and
        // Letter: both print 186 mm wide). The sizing below assumed 420 px for the sequence while the choices left it 407
        // (3 chips) or 339 (G1-155's 4), and its 40 px floor let a 13-slot AABB row run 616 px: the choices covered the "?"
        // and the last pictures (read on the live pages 2026-11-02). A row that fits keeps its size; one that does not takes
        // smaller slots on the same line, and below 40 px the choices move to their own line under the sequence ('stack').
        const slotCount = attribute === 'count' ? 4 : unit.length * d.repeats + (variant === 'next' ? 1 : 0);
        const availW = 420;
        const nChoices = attribute === 'count' ? 3 : variant === 'missing2' ? symbols.length + (attribute === 'noun' ? 1 : 0) : 2 + (attribute === 'noun' ? 1 : 0);
        const STAGE_W = 627, CHIP = 58, STACK_CHIP = 50;
        const rowAvail = STAGE_W - 12 - (nChoices * CHIP + (nChoices - 1) * 10 + 14);
        const seqW = (px) => slotCount * px + (slotCount - 1) * 8;
        let slotPx = attribute === 'count'
          ? 84   // growing-pattern slots hold up to 4 icons
          : Math.max(40, Math.min(64, Math.floor((availW - (slotCount - 1) * 8) / slotCount)));
        let stack = false;
        if (attribute !== 'count' && seqW(slotPx) > rowAvail) {
          const one = Math.floor((rowAvail - (slotCount - 1) * 8) / slotCount);
          if (one >= 40) slotPx = Math.min(64, one);
          else {
            // two lines: the sequence across the stage, the choices under it; a 5-row page leaves ~110 px per stage
            stack = true;
            slotPx = Math.min(64, d.rows >= 5 ? 42 : 64, Math.floor((STAGE_W - (slotCount - 1) * 8) / slotCount));
          }
        }
        const chipPx = stack ? STACK_CHIP : CHIP, chipIcon = stack ? 40 : 46;
        const slotStyle = `width:${slotPx}px;height:${slotPx}px`;
        const iconFit = (wanted) => Math.min(wanted, slotPx - 12);

        // growing pattern levels (2026-09-27): it always showed 1,2,3 → ? at every
        // level. Level 2 keeps exactly that (published level; snapshot-proven).
        // Level 1 = 1,2 → ?; level 3 starts at 2 (2,3,4 → ?), so the count can no
        // longer be read off the position.
        const growStart = difficulty === 3 ? 2 : 1;
        const growLen = difficulty === 1 ? 3 : 4;
        const render = (sym, slotIdx) => {
          if (attribute === 'count') {
            const count = growStart + slotIdx;
            const cpx = Math.min(px, Math.floor((slotPx - 14) / 2));
            const imgs = Array.from({ length: count }, () =>
              `<img class="ws-icon" src="${elements.A.src}" alt=""${elements.A.tap} style="width:${cpx}px;height:${cpx}px">`).join('');
            return `<span class="ws-pattern-slot" style="${slotStyle}" data-lcs-el="${count}"><span style="display:flex;flex-wrap:wrap;gap:2px;justify-content:center;max-width:${slotPx - 8}px">${imgs}</span></span>`;
          }
          const e = elements[sym];
          return `<span class="ws-pattern-slot" style="${slotStyle}" data-lcs-el="${sym}">` +
            `<img class="ws-icon" src="${e.src}" alt=""${e.tap} style="width:${iconFit(e.px)}px;height:${iconFit(e.px)}px${e.flip ? ';transform:scaleY(-1)' : ''}"></span>`;
        };

        let seq, answerSym, blankIdx, seqLen, blankIdx2 = -1, answerSym2 = null;
        if (attribute === 'count') {
          seqLen = growLen;
          blankIdx = seqLen - 1;            // growing: always "what comes next"
          answerSym = String(growStart + seqLen - 1);   // count of the next group
        } else {
          seq = Array.from({ length: unit.length * d.repeats }, (_, k) => unit[k % unit.length]);
          if (variant === 'missing2') {
            // two non-adjacent interior blanks at different unit residues
            do {
              blankIdx = rng.int(1, seq.length - 3);
              blankIdx2 = rng.int(blankIdx + 2, seq.length - 1);
            } while (blankIdx % unit.length === blankIdx2 % unit.length);
            answerSym2 = seq[blankIdx2];
          } else if (variant === 'missing') {
            blankIdx = rng.int(1, seq.length - 2);
          } else {
            blankIdx = seq.length;          // blank appended at the end
            seq.push(unit[seq.length % unit.length]);
          }
          answerSym = seq[blankIdx];
          seqLen = seq.length;
        }

        // G1-155 (two blanks, a line from each picture): the key and the screen mark each pair — the blank carries
        // data-lcs-pair, the picture that belongs there data-lcs-key-badge, both "r<row>-<symbol>" (a pair id is unique on
        // the page: rows 1 and 3 may both miss an A) — makers 2026-11-02; the catalogue page is unchanged
        const pairMarks = variant === 'missing2' && !!(ctx && (ctx.answerKey || ctx.screen));
        const slots = [];
        for (let k = 0; k < seqLen; k++) {
          if (k === blankIdx) {
            slots.push(`<span class="ws-pattern-slot ws-pattern-slot--blank" style="${slotStyle}" data-lcs-blank="${attribute === 'count' ? growStart + k : answerSym}"${pairMarks ? ` data-lcs-pair="r${i}-${answerSym}"` : ''}>?</span>`);
          } else if (k === blankIdx2) {
            slots.push(`<span class="ws-pattern-slot ws-pattern-slot--blank" style="${slotStyle}" data-lcs-blank="${answerSym2}"${pairMarks ? ` data-lcs-pair="r${i}-${answerSym2}"` : ''}>?</span>`);
          } else {
            slots.push(render(attribute === 'count' ? null : seq[k], k));
          }
        }

        // choice chips: correct + 2 distractors
        let choices;
        if (attribute === 'count') {
          const nextCount = growStart + seqLen - 1;
          const counts = [nextCount, nextCount - 1, nextCount + 1];
          choices = rng.shuffle(counts).map((c) => ({
            html: `<span style="display:flex;flex-wrap:wrap;gap:2px;justify-content:center;max-width:88px">` +
              Array.from({ length: c }, () => `<img class="ws-icon" src="${elements.A.src}" alt="" style="width:22px;height:22px">`).join('') + `</span>`,
            correct: c === nextCount,
          }));
        } else if (variant === 'missing2') {
          // line-drawing task: one chip per unit symbol + a distractor; the
          // child connects each blank to its chip (no single "correct" chip)
          const opts = [...symbols];
          if (attribute === 'noun') opts.push('_distractor');
          choices = rng.shuffle(opts).map((sym) => {
            const e = elements[sym];
            return {
              html: `<img class="ws-icon" src="${e.src}" alt=""${e.tap} style="width:${Math.min(e.px, chipIcon)}px;height:${Math.min(e.px, chipIcon)}px${e.flip ? ';transform:scaleY(-1)' : ''}">`,
              correct: false,
              sym,
            };
          });
        } else {
          const opts = [...new Set([answerSym, ...rng.shuffle(symbols.filter((s) => s !== answerSym))])].slice(0, 2);
          if (attribute === 'noun') opts.push('_distractor');
          choices = rng.shuffle(opts).map((sym) => {
            const e = elements[sym];
            return {
              html: `<img class="ws-icon" src="${e.src}" alt=""${e.tap} style="width:${Math.min(e.px, chipIcon)}px;height:${Math.min(e.px, chipIcon)}px${e.flip ? ';transform:scaleY(-1)' : ''}">`,
              correct: sym === answerSym,
            };
          });
        }
        const chipHtml = choices.map((c) =>
          `<span class="ws-pattern-chip"${stack ? ` style="width:${chipPx}px;height:${chipPx}px"` : ''}${c.correct ? ' data-lcs-correct="1"' : ''}${c.sym ? ` data-lcs-sym="${c.sym}"` : ''}${pairMarks && (c.sym === answerSym || c.sym === answerSym2) ? ` data-lcs-key-badge="r${i}-${c.sym}"` : ''}>${c.html}</span>`).join('');

        // stack: the choices under the sequence — at its right end for "what comes next", centred for the missing ones
        cards.push(stack
          ? `<div class="ws-card-stage" style="flex-direction:column;align-items:stretch;gap:6px;justify-content:center;padding:6px 10px" data-lcs-stack>` +
            `<span class="ws-pattern-seq" style="flex:0 0 auto;justify-content:center" data-lcs-unitlen="${unit.length}" data-lcs-attr="${attribute}" data-lcs-variant="${variant}">${slots.join('')}</span>` +
            `<span class="ws-pattern-choices" style="align-self:${variant === 'next' ? 'flex-end' : 'center'};border-left:none;padding-left:0;border-top:2px dashed #C8BFAE;padding-top:4px">${chipHtml}</span>` +
            `</div>`
          : `<div class="ws-card-stage" style="gap:12px;justify-content:space-between;padding:6px 10px">` +
            `<span class="ws-pattern-seq" data-lcs-unitlen="${unit.length}" data-lcs-attr="${attribute}" data-lcs-variant="${variant}">${slots.join('')}</span>` +
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
          const variant = seq.dataset.lcsVariant;
          const chips = [...card.querySelectorAll('.ws-pattern-chip')];
          if (variant === 'missing2') {
            // line-drawing variant: every blank's expected symbol must exist
            // among the chips, and there must be 2 blanks
            const blanks = [...card.querySelectorAll('[data-lcs-blank]')];
            if (blanks.length !== 2) fails.push(`row ${i + 1}: ${blanks.length} blanks (want 2)`);
            const syms = chips.map((c) => c.dataset.lcsSym);
            blanks.forEach((b) => {
              if (!syms.includes(b.dataset.lcsBlank)) fails.push(`row ${i + 1}: blank symbol ${b.dataset.lcsBlank} not among chips`);
            });
          } else {
            const correct = chips.filter((c) => c.dataset.lcsCorrect);
            if (correct.length !== 1) { fails.push(`row ${i + 1}: ${correct.length} correct chips`); return; }
            if (chips.length < 2) fails.push(`row ${i + 1}: only ${chips.length} choices`);
          }

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
            const start = parseInt(els[0], 10);
            if (!(start >= 1)) fails.push(`row ${i + 1}: first group has no count`);
            els.forEach((e, k) => {
              if (e !== null && parseInt(e, 10) !== start + k) fails.push(`row ${i + 1}: slot ${k + 1} holds ${e}, expected ${start + k}`);
              if (e !== null) {
                const imgs = slots[k].querySelectorAll('img').length;
                if (imgs !== start + k) fails.push(`row ${i + 1}: slot ${k + 1} shows ${imgs} icons != ${start + k}`);
              }
            });
            if (parseInt(slots[blankIdx].dataset.lcsBlank, 10) !== start + blankIdx) fails.push(`row ${i + 1}: blank declares wrong next count`);
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
            // every blank (1 or 2) must declare exactly what the pattern expects
            slots.forEach((s, k) => {
              if (s.dataset.lcsBlank === undefined) return;
              const expected = unit[k % unitLen];
              if (expected !== undefined && s.dataset.lcsBlank !== expected) {
                fails.push(`row ${i + 1}: blank at ${k + 1} declares ${s.dataset.lcsBlank}, pattern expects ${expected}`);
              }
            });
          }
        });
        return fails;
      });
    },
  };
}

module.exports = { makePatternType };
