/**
 * G2-249 — Telling time to 5 minutes: read the clock, circle the digital time.
 * Class-6 exemplar: arbitrary times, hour-hand proportional offset legible.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const clock = require('../../primitives/clock.js');

const fmt = (h, m) => `${h}:${String(m).padStart(2, '0')}`;

module.exports = {
  id: 'G2-249',
  slug: 'telling-time-5-minutes',
  gradeBand: 'G23',
  assetClass: 'clocks',
  exerciseType: 'telling-time',
  themeAxis: { applicable: false },
  difficulty: {
    1: { stepM: 30, cards: 4 },
    2: { stepM: 5, cards: 4 },
    3: { stepM: 5, cards: 6 },
  },
  i18n: {
    en: {
      title: 'What Time Is It?',
      instruction: 'Read each clock. Circle the matching time.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const cards = [];
    const used = new Set();
    for (let i = 0; i < d.cards; i++) {
      let h, m;
      let guard = 0;
      do {
        h = rng.int(1, 12);
        m = d.stepM * rng.int(0, Math.floor(59 / d.stepM));
        guard++;
      } while (used.has(h + ':' + m) && guard < 50);
      used.add(h + ':' + m);
      const face = clock({ h, m, size: d.cards > 4 ? 150 : 180 });
      // distractors: hands swapped reading + ±5min/±1h confusions
      const opts = new Set([fmt(h, m)]);
      const wrongs = [
        fmt(m === 0 ? 12 : Math.max(1, Math.min(12, Math.round(m / 5))), (h % 12) * 5),  // swapped hands
        fmt(h, (m + d.stepM) % 60),
        fmt((h % 12) + 1, m),
      ];
      for (const w of wrongs) { if (opts.size < 3 && w !== fmt(h, m)) opts.add(w); }
      const choices = rng.shuffle([...opts]).map((v) =>
        `<span class="ws-chip" style="width:auto;min-width:84px;height:48px;font-size:22px;padding:0 14px;border-radius:24px" ` +
        `data-lcs-choice="${v}"${v === fmt(h, m) ? ' data-lcs-correct="1"' : ''}>${v}</span>`).join('');
      cards.push(
        `<div class="ws-card-stage" style="flex-direction:column;gap:14px">` +
        face.svg + `<div class="ws-choices">${choices}</div></div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: 2, rows: Math.ceil(d.cards / 2) }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
        const svg = card.querySelector('[data-lcs-prim="clock"]');
        const h = parseInt(svg.dataset.lcsH, 10), m = parseInt(svg.dataset.lcsM, 10);
        // hand-angle ground truth re-derived from the rendered attributes
        const hourA = parseFloat(svg.querySelector('[data-lcs-hourhand]').dataset.lcsHourhand);
        const minA = parseFloat(svg.querySelector('[data-lcs-minutehand]').dataset.lcsMinutehand);
        const wantH = (((h % 12) + m / 60) / 12) * 360;
        const wantM = (m / 60) * 360;
        if (Math.abs(hourA - wantH) > 0.6) fails.push(`card ${i + 1}: hour hand ${hourA} != ${wantH.toFixed(1)}`);
        if (Math.abs(minA - wantM) > 0.6) fails.push(`card ${i + 1}: minute hand ${minA} != ${wantM.toFixed(1)}`);
        const want = `${h}:${String(m).padStart(2, '0')}`;
        const correct = [...card.querySelectorAll('[data-lcs-correct]')];
        if (correct.length !== 1 || correct[0].dataset.lcsChoice !== want) fails.push(`card ${i + 1}: correct chip != ${want}`);
        const chips = [...card.querySelectorAll('[data-lcs-choice]')].map((c) => c.dataset.lcsChoice);
        if (new Set(chips).size !== chips.length) fails.push(`card ${i + 1}: duplicate time options`);
        if (chips.length < 3) fails.push(`card ${i + 1}: only ${chips.length} options`);
      });
      return fails;
    });
  },
};
