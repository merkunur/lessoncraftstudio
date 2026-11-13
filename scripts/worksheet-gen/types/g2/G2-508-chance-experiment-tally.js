/**
 * G2-508 — Chance Experiment: Draw and Tally (Year pages P, 2026-11-13; de KMK "erfassen … bei einfachen Experimenten
 * Daten" and "schätzen Chancen … ein", sv Lgr22 åk 1-3 "slumpmässiga händelser i konkreta situationer" with "enkla
 * tabeller och diagram"; no Common Core standard for chance in K-3).
 *
 * A RECORD SHEET for an experiment the class really does (with counters in a real bag, or with the classroom tool
 * Draw Bag on the screen): the picture shows what goes into the bag; the child marks a guess, then draws one piece at
 * a time WITH putting it back, crosses off a numbered box and makes a tally mark for every draw, counts the marks,
 * draws the bars and marks what came most often and whether the guess was right.
 * Nothing on the page has a printed answer: what comes out of a bag is chance, and the page says so by asking the
 * child to compare the result with the guess. (So the page has no answer key of its own.)
 *
 * Levels
 *   1  a bag of 10 pieces of two kinds, 20 draws
 *   2  a bag of 10 pieces of three kinds, 20 draws
 *   3  a die: 24, 30 or 36 rolls, a table for the six sides, the bars, and the question whether every side came up
 *      at least once ("does every side seem to have the same chance?" has two defensible answers after 30 rolls:
 *      native reader 2026-11-13; that talk belongs to the teacher)
 * Printed page only.
 */
'use strict';
const B = require('../_shared/chance-bag.js');
const T = require('../../primitives/_tokens.js').color;

// the words on the sheet (read by a native reader, 2026-11-13)
const L = {
  en: { guess: 'My guess: this one comes up most often', tally: 'Tally', number: 'Number', most: 'It came up most often', right: 'My guess was right', yes: 'yes', no: 'no', same: 'Every side came up at least once' },
  de: { guess: 'Meine Vermutung: Das kommt am häufigsten', tally: 'Strichliste', number: 'Anzahl', most: 'Das kam am häufigsten', right: 'Ich hatte recht', yes: 'ja', no: 'nein', same: 'Jede Zahl kam mindestens einmal' },
  es: { guess: 'Mi predicción: esto sale más veces', tally: 'Conteo', number: 'Total', most: 'Salió más veces', right: 'Mi predicción fue correcta', yes: 'sí', no: 'no', same: 'Todas las caras salieron por lo menos una vez' },
  pt: { guess: 'Meu palpite: esta sai mais vezes', tally: 'Contagem', number: 'Total', most: 'Saiu mais vezes', right: 'Meu palpite estava certo', yes: 'sim', no: 'não', same: 'Todas as faces saíram pelo menos uma vez' },
  fr: { guess: 'Je pense que celui-ci sortira le plus souvent', tally: 'Bâtons', number: 'Nombre', most: 'Il est sorti le plus souvent', right: 'J\'avais raison', yes: 'oui', no: 'non', same: 'Chaque face est sortie au moins une fois' },
  it: { guess: 'La mia previsione: questo esce più volte', tally: 'Conteggio', number: 'Numero', most: 'È uscito più volte', right: 'La mia previsione era giusta', yes: 'sì', no: 'no', same: 'Ogni faccia è uscita almeno una volta' },
  nl: { guess: 'Ik denk: deze komt het vaakst voor', tally: 'Turven', number: 'Aantal', most: 'Kwam het vaakst voor', right: 'Ik had het goed', yes: 'ja', no: 'nee', same: 'Elke kant kwam minstens één keer voor' },
  sv: { guess: 'Jag tror att den här kommer oftast', tally: 'Streck', number: 'Antal', most: 'Den här kom oftast', right: 'Jag trodde rätt', yes: 'ja', no: 'nej', same: 'Alla sidor kom minst en gång' },
  da: { guess: 'Jeg tror, at denne kommer oftest', tally: 'Tællestreger', number: 'Antal', most: 'Denne kom oftest', right: 'Mit gæt var rigtigt', yes: 'ja', no: 'nej', same: 'Alle sider kom mindst én gang' },
  no: { guess: 'Jeg tror at denne kommer oftest', tally: 'Tellestreker', number: 'Antall', most: 'Denne kom oftest', right: 'Jeg gjettet riktig', yes: 'ja', no: 'nei', same: 'Alle sidene kom minst én gang' },
  fi: { guess: 'Arvaan, että tämä tulee useimmin', tally: 'Tukkimiehen kirjanpito', number: 'Lukumäärä', most: 'Tämä tuli useimmin', right: 'Arvasin oikein', yes: 'kyllä', no: 'ei', same: 'Jokainen silmäluku tuli ainakin kerran' },
};
const D = {
  1: { bags: [[7, 3], [8, 2], [6, 4], [9, 1], [5, 5]], draws: [20] },
  2: { bags: [[5, 3, 2], [6, 3, 1], [4, 4, 2], [6, 2, 2], [5, 4, 1], [7, 2, 1]], draws: [20] },
  3: { die: true, draws: [30, 24, 36] },
};
const PIPS = { 1: [[12, 12]], 2: [[7, 7], [17, 17]], 3: [[7, 7], [12, 12], [17, 17]], 4: [[7, 7], [17, 7], [7, 17], [17, 17]], 5: [[7, 7], [17, 7], [12, 12], [7, 17], [17, 17]], 6: [[7, 6], [17, 6], [7, 12], [17, 12], [7, 18], [17, 18]] };
const die = (n, px, attr) => `<svg ${attr || ''} data-lcs-face="${n}" width="${px}" height="${px}" viewBox="0 0 24 24" style="flex:0 0 auto;display:block" aria-hidden="true"><rect x="1.5" y="1.5" width="21" height="21" rx="4.5" fill="${T.white}" stroke="${T.ink}" stroke-width="1.6"/>${PIPS[n].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.1" fill="${T.ink}"/>`).join('')}</svg>`;

module.exports = {
  id: 'G2-508',
  slug: 'chance-experiment-draw-and-tally',
  gradeBand: 'G2',
  assetClass: 'numeral-charts',
  exerciseType: 'graphing-data',
  themeAxis: { applicable: false },
  difficulty: D,
  LABELS: L,
  i18n: { en: { title: 'Chance Experiment: Draw and Tally', instruction: 'Make a bag like the one in the picture. First circle your guess. Then take one piece without looking, make a tally mark, cross off a numbered box, and put the piece back. Do this once for every numbered box. Count the tally marks, draw the bars, and finish the page.' } },
  // a sheet is ONE thing (this bag, or a die with so many rolls): told twice, so that the wave builder, which lets two
  // copies share one word in two, never takes the same sheet again
  levelSetWords(m) { return (m.items || []).flatMap((x) => [String(x), String(x) + " (again)"]); },

  build(args, ctx) {
    const d = this.difficulty[args.difficulty] || this.difficulty[2];
    const rng = ctx.rng;
    const loc = (args.locale || 'en').slice(0, 2);
    const W = L[loc]; if (!W) throw new Error('G2-508: no words for ' + loc);
    const colon = loc === 'fr' ? '\u00A0:' : ':';   // French sets a space before a colon
    const draws = rng.pick(d.draws);
    let things, picture, sig;   // things: what a row, a bar and a ring stand for
    if (d.die) {
      things = [1, 2, 3, 4, 5, 6].map((n) => ({ id: String(n), pic: (px) => die(n, px) }));
      picture = `<span data-lcs-die style="display:flex;align-items:center;justify-content:center;width:110px">${die(5, 70)}</span>`;
      sig = 'die' + draws;
    } else {
      const counts = rng.pick(d.bags), kinds = rng.shuffle(B.KINDS).slice(0, counts.length);
      const pieces = rng.shuffle(counts.flatMap((c, i) => Array(c).fill(kinds[i])));
      // the rows stand in a drawn order, never "the many first"
      things = rng.shuffle(kinds).map((k) => ({ id: k, pic: (px) => B.piece(k, px) }));
      picture = B.bag({ pieces, px: 150 });
      sig = kinds.map((k, i) => k + counts[i]).sort().join('');
    }
    const label = (s, extra) => `<span style="font-family:'Nunito';font-weight:800;font-size:15px;line-height:1.25;color:${T.teal};${extra || ''}">${s}</span>`;
    const ring = (t, px) => `<span data-lcs-ring="${t.id}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:${px + 16}px;height:${px + 16}px;border:2px dashed ${T.grid};border-radius:50%;background:${T.white}">${t.pic(px)}</span>`;
    const yesNo = `<span style="display:flex;align-items:center;gap:8px">${B.box(26, null, 'data-lcs-yn="yes"')}${label(W.yes, `color:${T.ink}`)}<span style="width:10px"></span>${B.box(26, null, 'data-lcs-yn="no"')}${label(W.no, `color:${T.ink}`)}</span>`;
    const card = (inner, style) => `<div data-lcs-part style="display:flex;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:14px;padding:10px 18px;${style || ''}">${inner}</div>`;

    // 1. what is in the bag, and the guess
    const pic = things.length > 4 ? 30 : 36;
    const top = card(`${picture}<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:center;gap:10px;min-width:0">${label(W.guess)}<span data-lcs-guess style="display:flex;gap:${things.length > 4 ? 8 : 16}px;align-items:center;flex-wrap:nowrap">${things.map((t) => ring(t, pic)).join('')}</span></div>`, 'flex:0 0 auto;align-items:center;gap:22px');
    // 2. one numbered box for every draw
    const per = draws <= 20 ? 20 : draws / 2;
    const strip = `<div data-lcs-strip="${draws}" style="flex:0 0 auto;display:grid;grid-template-columns:repeat(${per},minmax(0,1fr));gap:4px">${Array.from({ length: draws }, (_, i) => `<span data-lcs-draw style="height:24px;display:flex;align-items:center;justify-content:center;background:${T.white};border:1.5px solid ${T.grid};border-radius:5px;font-family:'Baloo 2';font-weight:600;font-size:12px;color:${T.inkSoft}">${i + 1}</span>`).join('')}</div>`;
    // 3. the tally table
    const rowH = things.length > 4 ? 24 : things.length === 3 ? 42 : 50;
    const table = card(`<div data-lcs-table style="flex:1;display:grid;grid-template-columns:56px minmax(0,1fr) 84px;column-gap:14px;row-gap:${things.length > 4 ? 4 : 6}px;align-items:center"><span></span>${label(W.tally)}${label(W.number, 'text-align:center')}` +
      things.map((t) => `<span style="display:flex;justify-content:center">${t.pic(Math.min(34, rowH - 4))}</span><span data-lcs-tally="${t.id}" style="height:${rowH}px;background:${T.white};border:2px solid ${T.grid};border-radius:8px"></span><span data-lcs-count="${t.id}" style="height:${rowH}px;background:${T.white};border:2px dashed ${T.grid};border-radius:8px"></span>`).join('') + `</div>`, 'flex:0 0 auto');
    // 4. the bars: one square of the grid for one draw
    const top2 = d.die ? draws / 2 : 20, step = top2 > 12 && top2 % 3 === 0 ? 3 : 2;
    const lines = Array.from({ length: top2 }, (_, i) => `<span data-lcs-unit style="flex:1 1 0;border-top:${(top2 - i) % step === 0 ? 1.5 : 1}px solid ${T.grid};position:relative">${(top2 - i) % step === 0 ? `<span data-lcs-ytick style="position:absolute;left:-30px;top:-9px;width:24px;text-align:right;font-family:'Baloo 2';font-weight:600;font-size:13px;line-height:1.3;color:${T.ink}">${top2 - i}</span>` : ''}</span>`).join('');
    const lanes = `<span style="position:absolute;inset:0;display:flex">${things.map((t) => `<span data-lcs-lane="${t.id}" style="flex:1 1 0;display:flex;justify-content:center"><span style="width:46%;border-left:1.5px dashed ${T.grid};border-right:1.5px dashed ${T.grid}"></span></span>`).join('')}</span>`;
    const chart = card(`<div data-lcs-chart="${top2}" style="flex:1;display:flex;flex-direction:column;min-height:0;padding-left:34px"><div style="flex:1 1 auto;min-height:140px;display:flex;flex-direction:column;position:relative;background:${T.white};border-left:2.5px solid ${T.ink};border-bottom:2.5px solid ${T.ink}">${lines}${lanes}<span style="position:absolute;left:-30px;bottom:-9px;width:24px;text-align:right;font-family:'Baloo 2';font-weight:600;font-size:13px;line-height:1.3;color:${T.ink}">0</span></div><div style="flex:0 0 auto;display:flex;padding-top:6px">${things.map((t) => `<span style="flex:1 1 0;display:flex;justify-content:center">${t.pic(things.length > 4 ? 22 : 26)}</span>`).join('')}</div></div>`, 'flex:1 1 auto;min-height:0');
    // 5. what came out, against the guess
    const end = card(`<span style="display:flex;align-items:center;gap:12px;min-width:0">${label(W.most + colon)}<span data-lcs-most style="display:flex;gap:6px;align-items:center">${things.map((t) => ring(t, things.length > 4 ? 18 : 24)).join('')}</span></span>` +
      `<span data-lcs-check style="display:flex;align-items:center;gap:12px;min-width:0">${label((d.die ? W.same : W.right) + colon)}${yesNo}</span>`, d.die ? 'flex:0 0 auto;flex-direction:column;align-items:flex-start;gap:8px' : 'flex:0 0 auto;align-items:center;justify-content:space-between;gap:16px');
    const bodyHtml = `<div data-ws-content data-lcs-experiment="${d.die ? 'die' : 'bag'}" style="flex:1;display:flex;flex-direction:column;gap:10px;min-height:0">${top}${strip}${table}${chart}${end}</div>`;
    return { bodyHtml, meta: { items: [sig] } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-experiment]'); if (!root) return ['no content'];
      const isDie = root.dataset.lcsExperiment === 'die';
      // the things of the experiment, read from what is DRAWN
      const kinds = isDie ? ['1', '2', '3', '4', '5', '6'] : [...new Set([...root.querySelectorAll('[data-lcs-bag] [data-lcs-in]')].map((e) => e.dataset.lcsIn))];
      if (!isDie) { const n = root.querySelectorAll('[data-lcs-bag] [data-lcs-in]').length; if (n !== 10) fails.push('the bag holds ' + n + ' pieces, not 10'); if (kinds.length < 2) fails.push('a bag of one kind is no experiment'); }
      const same = (sel, attr, what) => { const got = [...root.querySelectorAll(sel)].map((e) => e.dataset[attr]).sort().join(); if (got !== kinds.slice().sort().join()) fails.push(what + ' stand for ' + got + ', the bag holds ' + kinds.slice().sort().join()); };
      same('[data-lcs-guess] [data-lcs-ring]', 'lcsRing', 'the guesses'); same('[data-lcs-most] [data-lcs-ring]', 'lcsRing', 'the results');
      same('[data-lcs-tally]', 'lcsTally', 'the tally rows'); same('[data-lcs-count]', 'lcsCount', 'the number boxes'); same('[data-lcs-lane]', 'lcsLane', 'the bars');
      const draws = +root.querySelector('[data-lcs-strip]').dataset.lcsStrip;
      const boxes = [...root.querySelectorAll('[data-lcs-draw]')];
      if (boxes.length !== draws || boxes.some((b, i) => b.textContent.trim() !== String(i + 1))) fails.push('the numbered boxes are not 1 to ' + draws);
      // the bars have room for every draw landing on one thing only when the scale reaches it; a sheet for 20 draws
      // of a bag goes to 20, a die to at least a third of its rolls and no less than 10
      const top = +root.querySelector('[data-lcs-chart]').dataset.lcsChart;
      if (isDie ? top < draws / 2 : top < draws) fails.push('the scale ends at ' + top + ' for ' + draws + ' draws');
      if (root.querySelectorAll('[data-lcs-unit]').length !== top) fails.push('the grid has not one row for one draw');
      const ticks = [...root.querySelectorAll('[data-lcs-ytick]')].map((e) => +e.textContent);
      if (ticks[0] !== top || ticks.some((v, i) => i && v >= ticks[i - 1])) fails.push('the scale is not counted down from ' + top);
      if (root.querySelectorAll('[data-lcs-yn]').length !== 2) fails.push('yes and no boxes');
      // nothing runs out of its part, and no part runs out of the page body
      const body = root.getBoundingClientRect();
      root.querySelectorAll('[data-lcs-part]').forEach((part, i) => {
        const cr = part.getBoundingClientRect();
        if (cr.bottom > body.bottom + 1 || cr.right > body.right + 1) fails.push('part ' + (i + 1) + ' runs out of the page');
        part.querySelectorAll('*').forEach((e) => { const r = e.getBoundingClientRect(); if (r.width && e.dataset.lcsYtick == null && (r.right > cr.right + 1 || r.left < cr.left - 1 || r.bottom > cr.bottom + 1 || r.top < cr.top - 1)) fails.push('part ' + (i + 1) + ': something runs out of it'); });
      });
      const chart = root.querySelector('[data-lcs-chart] > div').getBoundingClientRect();
      if (chart.height < 130) fails.push('the bar chart is ' + Math.round(chart.height) + ' px high');
      return [...new Set(fails)];
    });
  },
};
