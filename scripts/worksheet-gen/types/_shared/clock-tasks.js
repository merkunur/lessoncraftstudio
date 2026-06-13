/**
 * Factory for the telling-time family (class 6):
 *  - 'read-circle':  clock → circle the digital time (G1-148 o'clock,
 *                    G1-149 half past, G2-249 five minutes, G2-250 quarter,
 *                    G3-354 to-the-minute — stepM differs)
 *  - 'match':        clocks ↔ digital times, draw lines (G1-150)
 *  - 'elapsed':      start + end clocks → write elapsed hours (G3-344)
 *  - 'convert-24h':  12h/24h conversion → circle the matching form (G3-355)
 *  - 'time-arith':   start clock + add/subtract a duration → write end time (G3-356)
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const clock = require('../../primitives/clock.js');
const { answerBox } = require('../../templates/components.js');

const fmt = (h, m) => `${h}:${String(m).padStart(2, '0')}`;
const pad = (n) => String(n).padStart(2, '0');

function makeClockType(cfg) {
  const { id, slug, mode, stepM, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand: gradeBand || 'G1',
    assetClass: 'clocks',
    exerciseType: 'telling-time',
    themeAxis: { applicable: false },
    difficulty: cfg.difficulty || {
      1: { cards: 4, stepM: stepM || 60 },
      2: { cards: 4, stepM: stepM || 60 },
      3: { cards: 6, stepM: stepM || 60 },
    },
    i18n,

    build({ difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const step = d.stepM;
      const used = new Set();
      const pickTime = () => {
        let h, m, guard = 0;
        do {
          h = rng.int(1, 12);
          m = step * rng.int(0, Math.floor(59 / step));
          guard++;
        } while (used.has(h + ':' + m) && guard < 60);
        used.add(h + ':' + m);
        return { h, m };
      };

      if (mode === 'match') {
        const times = Array.from({ length: 4 }, pickTime);
        let order;
        do { order = rng.shuffle(times.map((_, i) => i)); }
        while (order.some((v, i) => v === i));
        const itemH = Math.floor((760 - 3 * 14) / 4);
        const left = times.map((t) =>
          `<div class="ws-match-item" style="width:200px;height:${itemH}px" data-lcs-left="${fmt(t.h, t.m)}">` +
          clock({ h: t.h, m: t.m, size: Math.min(150, itemH - 20) }).svg +
          `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');
        const right = order.map((idx) =>
          `<div class="ws-match-item ws-match-item--plain" style="width:150px;height:${itemH}px" data-lcs-right="${fmt(times[idx].h, times[idx].m)}">` +
          `<span style="font-family:'Baloo 2';font-weight:700;font-size:34px;color:#3A3530">${fmt(times[idx].h, times[idx].m)}</span>` +
          `<span class="ws-match-dot ws-match-dot--left"></span></div>`).join('');
        return {
          bodyHtml: `<div class="ws-match" style="padding:6px 60px">` +
            `<div class="ws-match-col">${left}</div><div class="ws-match-col">${right}</div></div>`,
          meta: {},
        };
      }

      const cards = [];
      for (let i = 0; i < d.cards; i++) {
        if (mode === 'read-circle') {
          const { h, m } = pickTime();
          const opts = new Set([fmt(h, m)]);
          const wrongs = step >= 30
            ? [fmt((h % 12) + 1, m), fmt(m === 30 ? h : (h % 12) + 1, m === 30 ? 0 : 30), fmt(m === 0 ? 12 : m / 5, (h % 12) * 5)]
            : [fmt(m === 0 ? 12 : Math.max(1, Math.round(m / 5)), (h % 12) * 5), fmt(h, (m + step) % 60), fmt((h % 12) + 1, m)];
          for (const w of wrongs) if (opts.size < 3 && w !== fmt(h, m)) opts.add(w);
          const chips = rng.shuffle([...opts]).map((v) =>
            `<span class="ws-chip" style="width:auto;min-width:84px;height:48px;font-size:22px;padding:0 14px;border-radius:24px" ` +
            `data-lcs-choice="${v}"${v === fmt(h, m) ? ' data-lcs-correct="1"' : ''}>${v}</span>`).join('');
          cards.push(
            `<div class="ws-card-stage" style="flex-direction:column;gap:14px">` +
            clock({ h, m, size: d.cards > 4 ? 150 : 180 }).svg +
            `<div class="ws-choices">${chips}</div></div>`
          );
        } else if (mode === 'elapsed') {
          const h1 = rng.int(1, 8);
          const dur = rng.int(1, Math.min(4, 11 - h1));
          const m = d.stepM === 30 && rng.next() < 0.5 ? 30 : 0;
          const arrow = `<span style="font-family:'Baloo 2';font-weight:700;font-size:30px;color:#F2784B">→</span>`;
          cards.push(
            `<div class="ws-card-stage" style="gap:16px;justify-content:space-between;padding:6px 12px" data-lcs-dur="${dur}">` +
            `<span data-lcs-role="start">${clock({ h: h1, m, size: 140 }).svg}</span>` + arrow +
            `<span data-lcs-role="end">${clock({ h: h1 + dur, m, size: 140 }).svg}</span>` +
            answerBox({ w: 64, h: 54, answer: dur }) + `</div>`
          );
        } else if (mode === 'convert-24h') {
          let h24, m, guard = 0;
          do {
            h24 = rng.int(0, 23);
            m = step * rng.int(0, Math.floor(59 / step));
            guard++;
          } while (used.has('c' + h24 + ':' + m) && guard < 80);
          used.add('c' + h24 + ':' + m);
          const dir = i % 2 === 0 ? 'to12' : 'to24';
          const h12 = (h24 % 12) || 12;
          const ampm = h24 < 12 ? 'AM' : 'PM';
          const twelve = `${h12}:${pad(m)} ${ampm}`;
          const twentyFour = `${pad(h24)}:${pad(m)}`;
          const prompt = dir === 'to12' ? twentyFour : twelve;
          const correct = dir === 'to12' ? twelve : twentyFour;
          const opts = new Set([correct]);
          let wrongs;
          if (dir === 'to12') {
            const altAmpm = ampm === 'AM' ? 'PM' : 'AM';
            const adjH = ((h24 + 1) % 12) || 12;
            const adjH2 = ((h24 + 11) % 12) || 12;
            wrongs = [`${h12}:${pad(m)} ${altAmpm}`, `${adjH}:${pad(m)} ${ampm}`, `${adjH2}:${pad(m)} ${ampm}`];
          } else {
            const mirror = h24 >= 12 ? h24 - 12 : h24 + 12;
            wrongs = [`${pad(mirror)}:${pad(m)}`, `${pad((h24 + 1) % 24)}:${pad(m)}`, `${pad((h24 + 23) % 24)}:${pad(m)}`];
          }
          for (const w of wrongs) { if (opts.size < 3 && w !== correct) opts.add(w); }
          const scaffold = difficulty === 1 ? clock({ h: h12, m, size: 130 }).svg : '';
          const chips = rng.shuffle([...opts]).map((v) =>
            `<span class="ws-chip" style="width:auto;min-width:96px;height:48px;font-size:21px;padding:0 16px;border-radius:24px;white-space:nowrap" ` +
            `data-lcs-choice="${v}"${v === correct ? ' data-lcs-correct="1"' : ''}>${v}</span>`).join('');
          cards.push(
            `<div class="ws-card-stage" style="flex-direction:column;gap:12px" data-lcs-h24="${h24}" data-lcs-m="${m}" data-lcs-dir="${dir}">` +
            scaffold +
            `<div style="font-family:'Baloo 2';font-weight:700;font-size:34px;color:#3A3530">${prompt}</div>` +
            `<div class="ws-choices">${chips}</div></div>`
          );
        } else if (mode === 'time-arith') {
          let op, sH, sM, delta, eMin, guard = 0;
          do {
            op = rng.next() < 0.5 ? '+' : '-';
            sH = rng.int(1, 11);
            sM = step === 30 && rng.next() < 0.5 ? 30 : 0;
            const durH = rng.int(1, 3);
            const durM = step === 30 && rng.next() < 0.5 ? 30 : 0;
            delta = durH * 60 + durM;
            const sMin = sH * 60 + sM;
            eMin = op === '+' ? sMin + delta : sMin - delta;
            guard++;
          } while ((eMin < 60 || eMin > 779 || used.has('a' + op + sH + ':' + sM + '+' + delta)) && guard < 150);
          used.add('a' + op + sH + ':' + sM + '+' + delta);
          const answer = `${Math.floor(eMin / 60)}:${pad(eMin % 60)}`;
          const durH2 = Math.floor(delta / 60), durM2 = delta % 60;
          const durLabel = durM2 ? `${durH2} h ${durM2} min` : `${durH2} h`;
          const opColor = op === '+' ? '#146B5E' : '#F2784B';
          cards.push(
            `<div class="ws-card-stage" style="gap:14px;justify-content:space-between;padding:6px 16px" ` +
            `data-lcs-starth="${sH}" data-lcs-startm="${sM}" data-lcs-op="${op}" data-lcs-durmin="${delta}">` +
            `<span data-lcs-role="start">${clock({ h: sH, m: sM, size: 130 }).svg}</span>` +
            `<span style="font-family:'Baloo 2';font-weight:700;font-size:32px;color:${opColor}">${op}</span>` +
            `<span style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#3A3530">${durLabel}</span>` +
            `<span style="font-family:'Baloo 2';font-weight:700;font-size:28px;color:#F2784B">→</span>` +
            answerBox({ w: 96, h: 54, answer }) + `</div>`
          );
        }
      }
      const cols = (mode === 'elapsed' || mode === 'time-arith' || mode === 'convert-24h') ? 1 : 2;
      return { bodyHtml: cardGrid({ cards, cols, rows: Math.ceil(cards.length / cols) }), meta: {} };
    },

    async verify(page) {
      const m = mode;
      return page.evaluate((mode) => {
        const fails = [];
        const angleOk = (svg) => {
          const h = +svg.dataset.lcsH, mm = +svg.dataset.lcsM;
          const hourA = parseFloat(svg.querySelector('[data-lcs-hourhand]').dataset.lcsHourhand);
          const minA = parseFloat(svg.querySelector('[data-lcs-minutehand]').dataset.lcsMinutehand);
          return Math.abs(hourA - ((((h % 12) + mm / 60) / 12) * 360)) < 0.6 && Math.abs(minA - ((mm / 60) * 360)) < 0.6;
        };
        if (mode === 'match') {
          const left = [...document.querySelectorAll('[data-lcs-left]')];
          const right = [...document.querySelectorAll('[data-lcs-right]')].map((e) => e.dataset.lcsRight);
          if (left.map((e) => e.dataset.lcsLeft).sort().join() !== [...right].sort().join()) fails.push('right not a permutation');
          left.forEach((item, i) => {
            const svg = item.querySelector('[data-lcs-prim="clock"]');
            const t = `${svg.dataset.lcsH}:${String(svg.dataset.lcsM).padStart(2, '0')}`;
            if (t !== item.dataset.lcsLeft) fails.push(`row ${i + 1}: clock != declared`);
            if (!angleOk(svg)) fails.push(`row ${i + 1}: hand angles wrong`);
            if (right[i] === item.dataset.lcsLeft) fails.push(`row ${i + 1}: straight-across`);
          });
          return fails;
        }
        document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
          if (mode === 'read-circle') {
            const svg = card.querySelector('[data-lcs-prim="clock"]');
            if (!angleOk(svg)) fails.push(`card ${i + 1}: hand angles wrong`);
            const want = `${svg.dataset.lcsH}:${String(svg.dataset.lcsM).padStart(2, '0')}`;
            const correct = [...card.querySelectorAll('[data-lcs-correct]')];
            if (correct.length !== 1 || correct[0].dataset.lcsChoice !== want) fails.push(`card ${i + 1}: chips wrong`);
            const chips = [...card.querySelectorAll('[data-lcs-choice]')].map((c) => c.dataset.lcsChoice);
            if (new Set(chips).size !== chips.length || chips.length < 3) fails.push(`card ${i + 1}: bad option set`);
          } else if (mode === 'elapsed') {
            const dur = +card.querySelector('[data-lcs-dur]').dataset.lcsDur;
            const s = card.querySelector('[data-lcs-role="start"] [data-lcs-prim="clock"]');
            const e = card.querySelector('[data-lcs-role="end"] [data-lcs-prim="clock"]');
            if (!angleOk(s) || !angleOk(e)) fails.push(`card ${i + 1}: hand angles wrong`);
            if (+e.dataset.lcsH - +s.dataset.lcsH !== dur || s.dataset.lcsM !== e.dataset.lcsM) fails.push(`card ${i + 1}: elapsed != ${dur}h`);
            if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== dur) fails.push(`card ${i + 1}: answer mismatch`);
          } else if (mode === 'convert-24h') {
            const pad2 = (n) => String(n).padStart(2, '0');
            const stage = card.querySelector('[data-lcs-h24]');
            const h24 = +stage.dataset.lcsH24, mm = +stage.dataset.lcsM, dir = stage.dataset.lcsDir;
            const h12 = (h24 % 12) || 12;
            const ampm = h24 < 12 ? 'AM' : 'PM';
            const want = dir === 'to12' ? `${h12}:${pad2(mm)} ${ampm}` : `${pad2(h24)}:${pad2(mm)}`;
            const correct = [...card.querySelectorAll('[data-lcs-correct]')];
            if (correct.length !== 1 || correct[0].dataset.lcsChoice !== want) fails.push(`card ${i + 1}: correct chip != ${want}`);
            const chips = [...card.querySelectorAll('[data-lcs-choice]')].map((c) => c.dataset.lcsChoice);
            if (new Set(chips).size !== chips.length) fails.push(`card ${i + 1}: duplicate options`);
            if (chips.length < 3) fails.push(`card ${i + 1}: only ${chips.length} options`);
            const svg = card.querySelector('[data-lcs-prim="clock"]');
            if (svg) {
              if (+svg.dataset.lcsH !== h12 || +svg.dataset.lcsM !== mm) fails.push(`card ${i + 1}: scaffold clock != ${h12}:${pad2(mm)}`);
              if (!angleOk(svg)) fails.push(`card ${i + 1}: hand angles wrong`);
            }
          } else if (mode === 'time-arith') {
            const pad2 = (n) => String(n).padStart(2, '0');
            const stage = card.querySelector('[data-lcs-starth]');
            const sH = +stage.dataset.lcsStarth, sM = +stage.dataset.lcsStartm, op = stage.dataset.lcsOp, delta = +stage.dataset.lcsDurmin;
            const sMin = sH * 60 + sM;
            const eMin = op === '+' ? sMin + delta : sMin - delta;
            const s = card.querySelector('[data-lcs-role="start"] [data-lcs-prim="clock"]');
            if (!s || !angleOk(s)) fails.push(`card ${i + 1}: start hand angles wrong`);
            else if (+s.dataset.lcsH !== sH || +s.dataset.lcsM !== sM) fails.push(`card ${i + 1}: start clock != ${sH}:${pad2(sM)}`);
            if (eMin < 60 || eMin > 779) fails.push(`card ${i + 1}: end ${eMin} out of band`);
            const want = `${Math.floor(eMin / 60)}:${pad2(eMin % 60)}`;
            const ans = card.querySelector('[data-lcs-answer]');
            if (!ans || ans.dataset.lcsAnswer !== want) fails.push(`card ${i + 1}: answer != ${want}`);
          }
        });
        return fails;
      }, m);
    },
  };
}

module.exports = { makeClockType };
