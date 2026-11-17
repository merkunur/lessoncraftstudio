/**
 * Factory for the compare-two-groups family (K-008 more / K-009 fewer).
 * Each row: two icon groups in white sub-boxes; the child circles the group
 * the instruction asks for. data-lcs-target marks the correct box.
 *
 * Which end a copy asks (2026-11-17, the Position Words model: "More or Less?" asked MORE on every new version): a
 * template with an entry in data/ask-lines.json (K-008) asks MORE and FEWER in turn, copy 1 the published end with its
 * registered line, copy 2 the other end with its own line (lib/copy-asks.js; copyInstruction; the FEWER lines are
 * K-009's registered ones). A copy that asks the other end says so on every row stage (data-lcs-ask).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { iconRows, fitIcons } = require('../../templates/components.js');
const slot = require('../../lib/slot.js');
const { askFor, otherLines } = require('../../lib/copy-asks.js');

function makeCompareGroupsType({ id, slug, mode, i18n }) {
  return {
    id,
    slug,
    gradeBand: 'K',
    assetClass: 'icon-placement',
    exerciseType: 'comparing-groups',
    themeAxis: { applicable: true, minNouns: 3 },
    difficulty: {
      1: { min: 1, max: 6, rows: 3, minDiff: 2 },
      2: { min: 2, max: 10, rows: 3, minDiff: 1 },
      3: { min: 4, max: 12, rows: 3, minDiff: 1 },
    },
    i18n,
    // a copy that asks the other end prints its own line (render-instance.js; the maker reads built.strings)
    ...(askFor(id, 'en', { variant: 1 }) ? { copyInstruction: true } : {}),

    build({ theme, difficulty, locale }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      // the end this copy asks: copy 1 the published one (cfg.mode), then in turn (data/ask-lines.json)
      const asked = askFor(id, locale, ctx);
      if (asked && asked.published !== mode) throw new Error(`${id}: the first end of data/ask-lines.json (${asked.published}) is not the type's own (${mode})`);
      const want = asked ? asked.ask : mode;
      // in a maker the teacher may swap a row's picture (lib/slot.js: the random stream and the catalogue page are untouched)
      const pool = labelSafeNouns(theme);
      const nouns = slot.pictures(ctx, rng.sample(pool, d.rows), pool, theme);
      const cards = [];
      const truth = [];
      for (let i = 0; i < d.rows; i++) {
        let a, b;
        do {
          a = rng.int(d.min, d.max);
          b = rng.int(d.min, d.max);
        } while (Math.abs(a - b) < d.minDiff);
        const target = want === 'more' ? Math.max(a, b) : Math.min(a, b);
        const boxes = [a, b].map((n) => {
          const fit = fitIcons({ n, stageW: 250, stageH: 150, maxPx: 60, gapX: 8, gapY: 6 });
          // the maker's key rings it (catalogue unchanged)
          return `<div class="ws-subgroup" data-lcs-group="${n}"${n === target ? ' data-lcs-target="1"' + (ctx && (ctx.answerKey || ctx.screen) ? ' data-lcs-correct="1"' : '') : ''}>` +
            iconRows({ theme, noun: nouns[i].noun, n, iconPx: fit.iconPx, perRow: fit.perRow, rng, gapX: 8, gapY: 6 }) +
            `</div>`;
        });
        cards.push(`<div class="ws-card-stage"${slot.attr(ctx, 'pic', i)} style="gap:18px"${asked ? asked.attr : ''}>${boxes.join('')}</div>`);
        truth.push({ row: i + 1, a, b, target });
      }
      return {
        bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }),
        meta: { rows: truth, mode: want },
        ...(asked && asked.strings ? { strings: asked.strings } : {}),
      };
    },

    async verify(page) {
      const m = mode;
      // the lines of the end a page does NOT ask, in every language: a page must never print one of them
      const others = { more: otherLines(id, 'more'), fewer: otherLines(id, 'fewer') };
      return page.evaluate(({ mode: published, others }) => {
        const fails = [];
        const asks = new Set();
        document.querySelectorAll('[data-lcs-card]').forEach((card) => {
          const stage = card.querySelector('[data-lcs-ask]');
          const mode = (stage && stage.dataset.lcsAsk) || published;
          asks.add(mode);
          const groups = [...card.querySelectorAll('[data-lcs-group]')];
          if (groups.length !== 2) { fails.push(`card ${card.dataset.lcsCard}: ${groups.length} groups`); return; }
          groups.forEach((g) => {
            const n = parseInt(g.dataset.lcsGroup, 10);
            const icons = g.querySelectorAll('.ws-icon').length;
            if (icons !== n) fails.push(`card ${card.dataset.lcsCard}: ${icons} icons != ${n}`);
          });
          const [a, b] = groups.map((g) => parseInt(g.dataset.lcsGroup, 10));
          if (a === b) fails.push(`card ${card.dataset.lcsCard}: equal groups — no answer`);
          const target = groups.find((g) => g.dataset.lcsTarget);
          if (!target) { fails.push(`card ${card.dataset.lcsCard}: no target`); return; }
          const tn = parseInt(target.dataset.lcsGroup, 10);
          const expected = mode === 'more' ? Math.max(a, b) : Math.min(a, b);
          if (tn !== expected) fails.push(`card ${card.dataset.lcsCard}: target ${tn} != ${mode} of ${a},${b}`);
        });
        const norm = (t) => String(t || '').replace(/[\u00A0\u202F]/g, ' ').replace(/\s+/g, ' ').trim();
        const printed = norm((document.querySelector('[data-lcs-instruction]') || {}).textContent);
        if (asks.size > 1) fails.push('the rows ask different ends');
        const want = [...asks][0];
        if (want && (others[want] || []).map(norm).includes(printed)) fails.push(`the page asks ${want} but its instruction names the other end`);
        return fails;
      }, { mode: m, others });
    },
  };
}

module.exports = { makeCompareGroupsType };
