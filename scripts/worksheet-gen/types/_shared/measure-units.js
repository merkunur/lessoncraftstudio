/**
 * Three measuring pages of the year designs (Year pages X, 2026-11-14; Daily Teaching System Part 12.2; Grades 1-2):
 *   laid-right  G1-574 No Gaps, No Overlaps — a ribbon and a row of paper clips under it. In half of the rows the
 *               clips are laid right (end to end, from one end of the ribbon to the other); in the other half there
 *               is a mistake: a gap, an overlap, a row that starts late, a row that stops short. The child marks
 *               each row right or wrong and circles the mistake. Level 1 four rows: two right, one with gaps, one with
 *               overlaps · level 2 six rows, always one that starts late · level 3 six rows, always one that stops
 *               short, and the child writes how many clips long the ribbon is wherever the clips are laid right.
 *               The two marks carry the words right / wrong (a check mark means "wrong" in Swedish and Finnish
 *               schools). 1.MD.A.2.
 *   two-units   G2-517 Same Length, Two Units — one ribbon measured twice: with a row of paper clips and with a row
 *               of a second unit. On two rows of a page the second unit is SHORTER than a clip (cubes), on two it
 *               is LONGER (a craft stick as long as two clips), so the unit it took more of changes from row to
 *               row. The child writes both numbers and fills in the circle of the unit it took more of. Level 1 two
 *               cubes to a clip · level 2 three cubes to a clip · level 3 the second row is only started (the
 *               cubes under the first clip, or the first stick): the child works out its number.
 *               No words on the cards: a small picture of each unit stands beside its box. 2.MD.A.2.
 *   plot-make   G2-516 Measure and Make a Line Plot — ten lengths in a table, a number line, and room for the Xs.
 *               Level 1 the ten lengths are printed and the line is numbered: the child draws the Xs · level 2 the
 *               child also numbers the line · level 3 the table and the line are empty: the child measures ten real
 *               pencils to the nearest inch (en, lengths 2 to 8) or centimeter (an 18-tick line) and makes the
 *               whole plot. Three questions follow (level 3: shortest, longest, how much longer).
 *               Nothing printed on the page is to be measured. 2.MD.D.9.
 * The words of the line-plot page (PLOT_WORDS) and of the two marks (MARK_WORDS) were read by a native reader (2026-11-14). No theme: a copy is a new
 * draw of the lengths. Printed page only.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { clipPath } = require('./measurement-more.js');

const C = tokens.color, INK = C.ink, TEAL = C.teal, CORAL = C.coral;
const loc2 = (l) => String(l || 'en').slice(0, 2);
// {K} = a length, {U} = the unit; a box follows every line (after q2: a count, with no unit)
const PLOT_WORDS = {
  en: { thing: 'Pencil', length: 'Length', most: 'The most common length:', longer: 'How many pencils are longer than {K} {U}?', diff: 'How much longer is the longest pencil than the shortest pencil?', shortest: 'The shortest pencil:', longest: 'The longest pencil:' },
  de: { thing: 'Stift', length: 'Länge', most: 'Diese Länge kommt am häufigsten vor:', longer: 'Wie viele Stifte sind länger als {K} {U}?', diff: 'Wie viel länger ist der längste Stift als der kürzeste?', shortest: 'Der kürzeste Stift:', longest: 'Der längste Stift:' },
  es: { thing: 'Lápiz', length: 'Longitud', most: 'La longitud que más se repite:', longer: '¿Cuántos lápices miden más de {K} {U}?', diff: '¿Cuánto más mide el lápiz más largo que el más corto?', shortest: 'El lápiz más corto:', longest: 'El lápiz más largo:' },
  pt: { thing: 'Lápis', length: 'Comprimento', most: 'O comprimento que mais aparece:', longer: 'Quantos lápis medem mais de {K} {U}?', diff: 'Quanto o lápis mais comprido mede a mais que o mais curto?', shortest: 'O lápis mais curto:', longest: 'O lápis mais comprido:' },
  fr: { thing: 'Crayon', length: 'Longueur', most: 'La longueur trouvée le plus souvent :', longer: 'Combien de crayons mesurent plus de {K} {U} ?', diff: 'Combien le crayon le plus long mesure-t-il de plus que le plus court ?', shortest: 'Le crayon le plus court :', longest: 'Le crayon le plus long :' },
  it: { thing: 'Matita', length: 'Lunghezza', most: 'La lunghezza trovata più spesso:', longer: 'Quante matite sono più lunghe di {K} {U}?', diff: 'La matita più lunga supera la più corta di:', shortest: 'La matita più corta:', longest: 'La matita più lunga:' },
  nl: { thing: 'Potlood', length: 'Lengte', most: 'Deze lengte komt het vaakst voor:', longer: 'Hoeveel potloden zijn langer dan {K} {U}?', diff: 'Hoeveel langer is het langste potlood dan het kortste?', shortest: 'Het kortste potlood:', longest: 'Het langste potlood:' },
  sv: { thing: 'Penna', length: 'Längd', most: 'Den vanligaste längden:', longer: 'Hur många pennor är längre än {K} {U}?', diff: 'Så mycket längre är den längsta pennan än den kortaste:', shortest: 'Den kortaste pennan:', longest: 'Den längsta pennan:' },
  da: { thing: 'Blyant', length: 'Længde', most: 'Den længde, der er flest af:', longer: 'Hvor mange blyanter er længere end {K} {U}?', diff: 'Så meget længere er den længste blyant end den korteste:', shortest: 'Den korteste blyant:', longest: 'Den længste blyant:' },
  no: { thing: 'Blyant', length: 'Lengde', most: 'Den lengden det er flest av:', longer: 'Hvor mange blyanter er lengre enn {K} {U}?', diff: 'Så mye lengre er den lengste blyanten enn den korteste:', shortest: 'Den korteste blyanten:', longest: 'Den lengste blyanten:' },
  fi: { thing: 'Kynä', length: 'Pituus', most: 'Yleisin pituus:', longer: 'Kuinka moni kynä on pidempi kuin {K} {U}?', diff: 'Näin paljon pidempi pisin kynä on kuin lyhin:', shortest: 'Lyhin kynä:', longest: 'Pisin kynä:' },
};
const unitOf = (L) => (L === 'en' ? 'in.' : 'cm');
// the two marks of the rows of clips (a check mark means "wrong" in Swedish and Finnish schools: words, no signs)
const MARK_WORDS = {
  en: { right: 'right', wrong: 'wrong' }, de: { right: 'richtig', wrong: 'falsch' }, es: { right: 'bien', wrong: 'mal' }, pt: { right: 'certo', wrong: 'errado' },
  fr: { right: 'juste', wrong: 'faux' }, it: { right: 'giusto', wrong: 'sbagliato' }, nl: { right: 'goed', wrong: 'fout' }, sv: { right: 'rätt', wrong: 'fel' },
  da: { right: 'rigtigt', wrong: 'forkert' }, no: { right: 'riktig', wrong: 'feil' }, fi: { right: 'oikein', wrong: 'väärin' },
};

const LEVELS = {
  'laid-right': {
    1: { rows: 4, right: [2], wrong: ['gap', 'overlap'], nMax: 6, count: false },
    2: { rows: 6, right: [3, 4], wrong: ['gap', 'overlap', 'start'], must: 'start', nMax: 7, count: false },
    3: { rows: 6, right: [2, 3], wrong: ['gap', 'overlap', 'start', 'short'], must: 'short', nMax: 7, count: true },
  },
  'two-units': {
    1: { rows: 4, cube: [2], full: true },
    2: { rows: 4, cube: [3], full: true },
    3: { rows: 4, cube: [2, 3], full: false },
  },
  'plot-make': {
    1: { data: true, numbered: true },
    2: { data: true, numbered: false },
    3: { data: false, numbered: false },
  },
};

const NUM = (s, size = 22, color = INK) => `<span style="font:700 ${size}px/1 'Baloo 2',cursive;color:${color};white-space:nowrap">${s}</span>`;
const WORD = (s, size = 17, extra = '') => `<span style="font:700 ${size}px/1.25 'Nunito',sans-serif;color:${INK};${extra}">${s}</span>`;
const shuffle = (a, rng) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = rng.int(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };

/** a ribbon len px long: a band with a notched right end */
function ribbon(x, y, len, h, color) {
  return `<path d="M${x} ${y} H${x + len} L${x + len - h * 0.4} ${y + h / 2} L${x + len} ${y + h} H${x} Z" fill="${color}" stroke="${INK}" stroke-width="2" stroke-linejoin="round" data-lcs-ribbon="${len}"/>`;
}
const RIBBONS = [C.coralSoft, C.tealSoft, C.creamDeep];   // (the page palette's three washes)
/** a row of paper clips: xs = the left edge of each clip */
function clips(xs, y, u) {
  return xs.map((x, i) => `<path d="${clipPath(x, u)}" transform="translate(0 ${y})" fill="none" stroke="${i % 2 ? CORAL : TEAL}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" data-lcs-clip="${x.toFixed(2)}"/>`).join('');
}
/** a small clip and a small cube: the two units, as pictures beside a box */
const clipIcon = (w = 44) => `<svg width="${w + 2}" height="${Math.ceil(w * 0.36) + 4}" viewBox="0 0 ${w + 2} ${Math.ceil(w * 0.36) + 4}" style="display:block;flex:0 0 auto" data-lcs-icon="clip"><path d="${clipPath(1, w)}" fill="none" stroke="${TEAL}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const cubeIcon = (s = 20) => `<svg width="${s + 9}" height="${s + 9}" viewBox="0 0 ${s + 9} ${s + 9}" style="display:block;flex:0 0 auto" data-lcs-icon="cube"><path d="M2 7 l5 -5 h${s} l-5 5 Z" fill="${C.cream}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/><path d="M${s + 2} 7 l5 -5 v${s} l-5 5 Z" fill="${C.creamDeep}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/><rect x="2" y="7" width="${s}" height="${s}" fill="${C.coralSoft}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/></svg>`;
const stickIcon = (w = 46) => `<svg width="${w + 4}" height="16" viewBox="0 0 ${w + 4} 16" style="display:block;flex:0 0 auto" data-lcs-icon="stick"><rect x="2" y="2" width="${w}" height="12" rx="6" fill="${C.creamDeep}" stroke="${INK}" stroke-width="1.8"/></svg>`;

function makeMeasureUnitsType({ id, slug, mode, gradeBand, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error(`${id}: unknown mode ${mode}`);
  return {
    id, slug, gradeBand, assetClass: 'none',
    exerciseType: mode === 'plot-make' ? 'graphing-data' : 'measurement',
    themeAxis: { applicable: false },
    interactive: false,
    difficulty: D,
    i18n,
    // one word for the whole page: two copies with the same rows or the same ten lengths are the same page, and two pages
    // that merely share some lengths (ten numbers out of a small range always do) are different pages
    levelSetWords(m) { return [(m.items || []).join(' ')]; },

    build(args, ctx) {
      const lv = Number(args.difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng, L = loc2(args.locale);
      const mark = !!(ctx && (ctx.answerKey || ctx.screen));
      const box = (v, w = 54, h = 40) => `<span class="ws-answerbox"${mark && v != null ? ` data-lcs-answer="${v}"` : ''} style="display:inline-flex;flex:0 0 auto;vertical-align:middle;width:${w}px;height:${h}px;box-sizing:border-box;border:2.5px dashed ${CORAL};border-radius:9px;background:#FFFFFF"></span>`;
      /** a round mark to tick, with a small picture beside it (`inner`) */
      const bubble = (inner, right, tag) => `<span style="display:inline-flex;align-items:center;gap:6px;flex:0 0 auto" data-lcs-bubble="${tag}"><span${mark && right ? ' data-lcs-correct' : ''} style="width:26px;height:26px;box-sizing:border-box;border:2.5px solid ${mark && right ? CORAL : INK};border-radius:50%;background:${mark && right ? CORAL : '#FFFFFF'};flex:0 0 auto"></span>${inner}</span>`;
      const CHECK = `<svg width="26" height="24" viewBox="0 0 26 24" style="display:block" data-lcs-icon="right"><path d="M4 13 L10 19 L22 5" fill="none" stroke="${TEAL}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      const CROSS = `<svg width="24" height="24" viewBox="0 0 24 24" style="display:block" data-lcs-icon="wrong"><path d="M5 5 L19 19 M19 5 L5 19" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/></svg>`;
      let cards, items, cols = 1, numbered = true;

      if (mode === 'laid-right') {
        const Wm = MARK_WORDS[L]; if (!Wm) throw new Error(`${id}: no words for ${L}`);
        const U = d.count ? 52 : d.rows === 4 ? 78 : 60, RH = d.rows === 4 ? 28 : 22, CH = Math.ceil(U * 0.36) + 4, X0 = 8;
        // how many rows are laid right changes from page to page (a child who has found the wrong rows cannot tick the
        // rest unseen); the harder page always holds the row that stops short
        const right = rng.pick(d.right), nWrong = d.rows - right;
        const wrongs = d.must ? [d.must, ...shuffle(d.wrong.filter((k) => k !== d.must), rng).slice(0, nWrong - 1)] : shuffle(d.wrong, rng).slice(0, nWrong);
        const kinds = shuffle([...Array(right).fill('right'), ...wrongs], rng);
        const turns = () => kinds.every((k, i) => (k === 'right') === (i % 2 === 0)) || kinds.every((k, i) => (k === 'right') === (i % 2 === 1));
        for (let t = 0; t < 60 && turns(); t++) kinds.splice(0, kinds.length, ...shuffle(kinds, rng));
        // no two right rows of one length, no two wrong rows of one length (every length 4 to nMax is right AND wrong somewhere)
        const pickLens = (k) => shuffle(Array.from({ length: d.nMax - 3 }, (_, j) => j + 4), rng).slice(0, k);
        const lensRight = pickLens(right), lensWrong = pickLens(nWrong);
        const lens = kinds.map((k) => (k === 'right' ? lensRight.pop() : lensWrong.pop()));
        const colors = shuffle(RIBBONS, rng);
        cards = kinds.map((kind, i) => {
          const n = lens[i], len = n * U; let xs = []; const faults = [];
          if (kind === 'right') xs = Array.from({ length: n }, (_, k) => X0 + k * U);
          else if (kind === 'gap') {   // one clip fewer, two gaps of half a clip
            let g1, g2; for (let t = 0; t < 60; t++) { [g1, g2] = rng.sample(Array.from({ length: n - 2 }, (_, k) => k + 1), 2).sort((a, b) => a - b); if (g2 - g1 > 1 || n < 5) break; }   // (two gaps apart from each other where the row has room)
            let x = X0; for (let k = 0; k < n - 1; k++) { if (k === g1 || k === g2) { faults.push([x, x + U / 2]); x += U / 2; } xs.push(x); x += U; }
          } else if (kind === 'overlap') {   // one clip more, two overlaps of half a clip
            let g1, g2; for (let t = 0; t < 60; t++) { [g1, g2] = rng.sample(Array.from({ length: n }, (_, k) => k + 1), 2).sort((a, b) => a - b); if (g2 - g1 > 1) break; }   // (two overlaps apart from each other: three clips in a heap read as one mistake)
            let x = X0; for (let k = 0; k < n + 1; k++) { if (k === g1 || k === g2) { x -= U / 2; faults.push([x, x + U / 2]); } xs.push(x); x += U; }
          } else if (kind === 'start') { xs = Array.from({ length: n }, (_, k) => X0 + U / 2 + k * U); faults.push([X0, X0 + U / 2], [X0 + len, X0 + len + U / 2]); }   // the row starts half a clip late — and so runs half a clip past the other end: both are circled on the key
          else { xs = Array.from({ length: n - 1 }, (_, k) => X0 + k * U); faults.push([X0 + (n - 1) * U, X0 + len]); }   // the row stops a clip short
          const W = Math.max(len, ...xs.map((x) => x - X0 + U)) + X0 + 12, H = RH + 8 + CH;
          const ring = mark ? faults.map(([a, b]) => `<ellipse cx="${(a + b) / 2}" cy="${RH + 8 + CH / 2}" rx="${(b - a) / 2 + 9}" ry="${CH / 2 + 4}" fill="none" stroke="${CORAL}" stroke-width="2.5" data-lcs-key-sample="1"/>`).join('') : '';
          const pic = `<svg width="${W}" height="${H + 6}" viewBox="0 -2 ${W} ${H + 6}" style="display:block;flex:0 0 auto" data-lcs-row="${kind}|${n}">${ribbon(X0, 0, len, RH, colors[i % colors.length])}${clips(xs, RH + 8, U)}${ring}</svg>`;
          const isRight = kind === 'right';
          // the two marks carry WORDS: a check mark is the teacher's sign for "wrong" in Swedish and Finnish schools
          return `<div class="ws-card-stage" style="justify-content:space-between;align-items:center;gap:10px;padding:0 10px 0 34px" data-lcs-laid="${kind}|${n}|${faults.length}">${pic}` +
            `<span style="display:inline-flex;align-items:center;gap:12px;flex:0 0 auto"><span style="display:inline-flex;flex-direction:column;align-items:flex-start;gap:${d.rows === 4 ? 10 : 5}px">${bubble(WORD(Wm.right, 16, 'white-space:nowrap'), isRight, 'right')}${bubble(WORD(Wm.wrong, 16, 'white-space:nowrap'), !isRight, 'wrong')}</span>${d.count ? `<span style="display:inline-flex;align-items:center;gap:5px" data-lcs-count>${box(isRight ? n : null, 46, 38)}${clipIcon(34)}</span>` : ''}</span></div>`;
        });
        items = kinds.map((k, i) => k + lens[i]);
      } else if (mode === 'two-units') {
        const U = 70, RH = 22, CH = Math.ceil(U * 0.36) + 4, X0 = 6, DEP = 5;
        // two rows measure with a unit SHORTER than a clip (cubes: two or three to a clip, one size on a page) and two
        // with a unit LONGER than a clip (a craft stick as long as two clips): the unit it took more of changes from row
        // to row, so the child has to compare the units, not remember an answer
        const ratio = rng.pick(d.cube);
        const kinds = shuffle(['cube', 'cube', 'stick', 'stick'], rng), ns = []; const colors = shuffle([C.tealSoft, C.creamDeep], rng);
        for (let t = 0; t < 60 && (kinds.every((k, i) => (k === 'cube') === (i % 2 === 0)) || kinds.every((k, i) => (k === 'cube') === (i % 2 === 1))); t++) kinds.splice(0, 4, ...shuffle(kinds, rng));   // (never cube, stick, cube, stick down the page)
        const cubeAt = (x, y, s, tag) => `<path d="M${x.toFixed(2)} ${y} l${DEP} ${-DEP} h${s.toFixed(2)} l${-DEP} ${DEP} Z" fill="${C.cream}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/><rect x="${x.toFixed(2)}" y="${y}" width="${s.toFixed(2)}" height="${s.toFixed(2)}" fill="${C.coralSoft}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"${tag}/>`;
        const sideAt = (x, y, s) => `<path d="M${x.toFixed(2)} ${y} l${DEP} ${-DEP} v${s.toFixed(2)} l${-DEP} ${DEP} Z" fill="${C.creamDeep}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>`;
        cards = kinds.map((kind, i) => {
          let n; for (let t = 0; t < 300; t++) { n = kind === 'stick' ? rng.pick(d.full ? [2, 4, 6] : [4, 6]) : rng.int(2, ratio === 3 ? 5 : 6); if (!ns.some((q) => q.n === n && q.kind === kind) && ns.filter((q) => q.n === n).length < 2) break; }
          ns.push({ n, kind });
          const len = n * U, total = kind === 'stick' ? n / 2 : n * ratio, shown = d.full ? total : kind === 'stick' ? 1 : ratio;
          const y2 = RH + 8 + CH + 8 + DEP;
          let second, h2;
          if (kind === 'cube') {
            const s = U / ratio; h2 = s;
            second = Array.from({ length: shown }, (_, k) => cubeAt(X0 + k * s, y2, s, ' data-lcs-unit2="cube"')).join('') + sideAt(X0 + shown * s, y2, s);
          } else {
            const s = 2 * U; h2 = 18;
            second = Array.from({ length: shown }, (_, k) => `<rect x="${X0 + k * s + 1}" y="${y2 - DEP + 2}" width="${s - 2}" height="${h2}" rx="${h2 / 2}" fill="${C.creamDeep}" stroke="${INK}" stroke-width="1.8" data-lcs-unit2="stick"/>`).join('');
          }
          const unitLen = kind === 'cube' ? U / ratio : 2 * U;
          const guide = d.full ? '' : `<line x1="${X0 + shown * unitLen + 10}" y1="${y2 + h2 / 2 - (kind === 'stick' ? DEP - 2 : 0)}" x2="${X0 + len}" y2="${y2 + h2 / 2 - (kind === 'stick' ? DEP - 2 : 0)}" stroke="${INK}" stroke-width="2" stroke-dasharray="3 7" stroke-linecap="round" data-lcs-guide="1"/>`;
          const W = len + X0 + DEP + 8, H = y2 + h2 + 4;
          const pic = `<svg width="${W}" height="${H}" viewBox="0 -2 ${W} ${H}" style="display:block;flex:0 0 auto" data-lcs-two="${n}|${kind}">${ribbon(X0, 0, len, RH, colors[i % colors.length])}${clips(Array.from({ length: n }, (_, k) => X0 + k * U), RH + 8, U)}${second}${guide}</svg>`;
          // each unit has its own line: a round mark, the box for its number, its picture. The mark to fill in is the
          // clip's on the rows with a longer unit and the second unit's on the rows with a shorter one.
          const dot = (right, tag) => `<span data-lcs-bubble="${tag}"${mark && right ? ' data-lcs-correct' : ''} style="width:24px;height:24px;box-sizing:border-box;border:2.5px solid ${mark && right ? CORAL : INK};border-radius:50%;background:${mark && right ? CORAL : '#FFFFFF'};flex:0 0 auto"></span>`;
          return `<div class="ws-card-stage" style="justify-content:space-between;align-items:center;gap:10px;padding:0 10px 0 34px" data-lcs-twounits="${n}|${kind}|${kind === 'cube' ? ratio : 2}|${shown}|${total}">${pic}` +
            `<span style="display:inline-flex;flex-direction:column;align-items:flex-start;gap:9px;flex:0 0 auto" data-lcs-more><span style="display:inline-flex;align-items:center;gap:7px">${dot(kind === 'stick', 'clip')}${box(n, 50, 38)}<span style="display:inline-flex;width:52px">${clipIcon(40)}</span></span><span style="display:inline-flex;align-items:center;gap:7px">${dot(kind === 'cube', kind)}${box(total, 50, 38)}<span style="display:inline-flex;width:52px">${kind === 'cube' ? cubeIcon(20) : stickIcon(46)}</span></span></span></div>`;
        });
        items = ns.map((q) => q.n + q.kind + (q.kind === 'cube' ? ratio : 2));
      } else {
        const Wd = PLOT_WORDS[L]; if (!Wd) throw new Error(`${id}: no words for ${L}`);
        const unit = unitOf(L), TICKS = !d.data && L !== 'en' ? 18 : 12;   // (real pencils run from a 6 cm stub to 19 cm: the empty centimeter line has 18 ticks)
        // ten lengths with ONE most frequent length; five or six different lengths inside a span of seven
        let vals, lo;
        for (let t = 0; t < 400; t++) {
          const freq = rng.pick([[4, 2, 2, 1, 1], [3, 2, 2, 2, 1], [3, 2, 2, 1, 1, 1]]);
          // (a pencil is 2 to 8 inches, or 7 to 18 centimeters, long)
          lo = L === 'en' ? rng.int(0, 1) : rng.int(5, 9);
          const pool = rng.sample(L === 'en' ? [2, 3, 4, 5, 6, 7, 8] : Array.from({ length: 8 }, (_, k) => lo + 2 + k), freq.length);
          vals = []; freq.forEach((f, k) => { for (let j = 0; j < f; j++) vals.push(pool[k]); });
          const mn = Math.min(...vals), mx = Math.max(...vals);
          if (mx - mn < 4 || mx - mn === pool[0] || pool[0] === mn || pool[0] === mx) continue;   // the answers of the three questions differ, and the most frequent length is neither end
          vals = shuffle(vals, rng); break;
        }
        if (!vals) throw new Error(`${id}: no ten lengths`);
        const count = (v) => vals.filter((x) => x === v).length, mode1 = vals.slice().sort((a, b) => count(b) - count(a))[0];
        const mn = Math.min(...vals), mx = Math.max(...vals);
        let K = mn; for (let t = 0; t < 100; t++) { K = rng.int(mn, mx - 1); const c = vals.filter((x) => x > K).length; if (c >= 2 && c <= 7 && c !== mode1 && c !== mx - mn) break; }
        const longer = vals.filter((x) => x > K).length;
        // 1. the table: two rows of five
        const cell = (k) => `<span style="display:inline-flex;flex-direction:column;align-items:center;width:118px;border:2px solid ${INK};border-radius:8px;background:#FFFFFF;overflow:hidden" data-lcs-cell="${k + 1}"><span style="width:100%;text-align:center;font:800 14px/24px 'Nunito',sans-serif;color:${TEAL};background:${C.tealSoft};white-space:nowrap">${Wd.thing} ${k + 1}</span><span style="height:44px;display:flex;align-items:center;justify-content:center;gap:4px">${d.data ? `${NUM(vals[k], 26)}${WORD(unit, 16)}` : `<span style="width:54px;height:26px;border-bottom:2px solid #B9AE9C" data-lcs-blank></span>${WORD(unit, 15)}`}</span></span>`;
        const table = `<div class="ws-card-stage" style="flex-direction:column;justify-content:center;align-items:center;gap:8px" data-lcs-plottable="${d.data ? vals.join(',') : ''}"><span style="${''}font:800 15px/1 'Nunito',sans-serif;color:${TEAL}">${Wd.length} (${unit})</span><div style="display:grid;grid-template-columns:repeat(5,118px);gap:8px">${Array.from({ length: 10 }, (_, k) => cell(k)).join('')}</div></div>`;
        // 2. the line: twelve ticks from lo, room for four Xs above each
        const PW = 624, PX0 = TICKS > 12 ? 20 : 30, step = (PW - 2 * PX0) / (TICKS - 1), LY = TICKS > 12 ? 104 : 118, BW = TICKS > 12 ? 28 : 34, BH = TICKS > 12 ? 44 : 26;
        let s = `<line x1="${PX0 - 14}" y1="${LY}" x2="${PW - PX0 + 14}" y2="${LY}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
        for (let k = 0; k < TICKS; k++) {
          const x = PX0 + k * step;
          s += `<line x1="${x}" y1="${LY - 9}" x2="${x}" y2="${LY + 9}" stroke="${INK}" stroke-width="2.4" data-lcs-tick="${lo + k}"/>`;
          if (d.numbered || (k === 0 && d.data)) s += `<text x="${x}" y="${LY + 32}" text-anchor="middle" font-family="'Baloo 2',cursive" font-weight="700" font-size="20" fill="${INK}" data-lcs-ticknum="${lo + k}">${lo + k}</text>`;
          else s += `<rect x="${x - BW / 2}" y="${LY + 14}" width="${BW}" height="${BH}" rx="6" fill="#FFFFFF" stroke="${CORAL}" stroke-width="2" stroke-dasharray="5 4" data-lcs-tickbox="${lo + k}"${mark && d.data ? ` data-lcs-answer="${lo + k}"` : ''}/>`;
          if (mark && d.data) for (let j = 0; j < count(lo + k); j++) s += `<path d="M${x - 7} ${LY - 22 - j * 22} l14 -14 m0 14 l-14 -14" stroke="${CORAL}" stroke-width="3" stroke-linecap="round" data-lcs-key-sample="1"/>`;
        }
        s += `<text x="${PW / 2}" y="${LY + 38 + BH}" text-anchor="middle" font-family="'Nunito',sans-serif" font-weight="800" font-size="15" fill="${TEAL}">${Wd.length} (${unit})</text>`;
        const plot = `<div class="ws-card-stage" style="justify-content:center;align-items:center" data-lcs-plotline="${lo}|${d.numbered ? 1 : 0}"><svg width="${PW}" height="${LY + 46 + BH}" viewBox="0 0 ${PW} ${LY + 46 + BH}" style="display:block;flex:0 0 auto">${s}</svg></div>`;
        // 3. the questions
        const q = (text, v, withUnit, tag) => `<div style="display:flex;align-items:center;gap:8px;flex-wrap:nowrap" data-lcs-q="${tag}"><span style="flex:1 1 auto;min-width:0">${WORD(text, 17)}</span>${box(v, 60, 38)}${withUnit ? WORD(unit, 16) : `<span style="width:${unit === 'in.' ? 22 : 24}px"></span>`}</div>`;
        const qs = d.data
          ? [q(Wd.most, mode1, true, 'most'), q(Wd.longer.replace('{K}', K).replace('{U}', L === 'en' ? 'inches' : unit), longer, false, 'longer'), q(Wd.diff, mx - mn, true, 'diff')]
          : [q(Wd.shortest, null, true, 'shortest'), q(Wd.longest, null, true, 'longest'), q(Wd.diff, null, true, 'diff')];   // (with real pencils "most often" may have no single answer)
        const questions = `<div class="ws-card-stage" style="flex-direction:column;justify-content:space-evenly;align-items:stretch;gap:6px;padding:4px 18px" data-lcs-plotq="${d.data ? [mode1, longer, mx - mn, K].join('|') : ''}">${qs.join('')}</div>`;
        cards = [table, plot, questions]; numbered = false;
        items = d.data ? vals : ['empty' + lo];
      }
      const rowsTpl = mode === 'plot-make' ? 'grid-template-rows:minmax(0,1fr) minmax(0,1.2fr) minmax(0,0.95fr)' : '';
      let grid = cardGrid({ cards, cols, rows: cards.length, numbered });
      if (rowsTpl) grid = grid.replace(/grid-template-rows:[^;"]*;?/, rowsTpl + ';');
      return { bodyHtml: `<div data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0" data-lcs-mu="${mode}|${lv}" data-lcs-unit="${unitOf(L) === 'cm' ? 'cm' : 'in'}">${grid}</div>`, meta: { items } };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-mu]');
        if (!root) return ['no page'];
        const [mode, lv] = root.dataset.lcsMu.split('|');
        const rectOf = (e) => e.getBoundingClientRect();
        document.querySelectorAll('.ws-card').forEach((c, i) => {
          const P = 'card ' + (i + 1), cb = rectOf(c);
          c.querySelectorAll('svg, .ws-answerbox, [data-lcs-bubble], [data-lcs-cell], [data-lcs-q] > span').forEach((e) => { const r = rectOf(e); if (r.width && (r.left < cb.left + 1 || r.right > cb.right - 1 || r.top < cb.top - 1 || r.bottom > cb.bottom + 1)) fails.push(`${P}: something leaves the card`); });
          const kids = [...c.querySelector('.ws-card-stage').children].map(rectOf).filter((k) => k.width);
          if (mode !== 'plot-make') for (let k = 1; k < kids.length; k++) if (kids[k].left < kids[k - 1].right - 0.5) fails.push(`${P}: the picture runs under the marks`);
        });
        if (mode === 'laid-right') {
          const cards = [...document.querySelectorAll('[data-lcs-laid]')]; const kinds = cards.map((c) => c.dataset.lcsLaid.split('|')[0]);
          const want = { 1: [4, [2], ['gap', 'overlap'], 6], 2: [6, [3, 4], ['gap', 'overlap', 'start'], 7], 3: [6, [2, 3], ['gap', 'overlap', 'start', 'short'], 7] }[lv];
          const nRight = kinds.filter((k) => k === 'right').length;
          if (cards.length !== want[0] || !want[1].includes(nRight)) fails.push(`${cards.length} rows, ${nRight} laid right`);
          if (kinds.some((k) => k !== 'right' && !want[2].includes(k))) fails.push('a mistake of another level: ' + kinds.join(','));
          if (new Set(kinds.filter((k) => k !== 'right')).size !== kinds.filter((k) => k !== 'right').length) fails.push('a kind of mistake twice: ' + kinds.join(','));
          if (lv === '3' && !kinds.includes('short')) fails.push('the harder page has no row that stops short');
          if (lv === '2' && !kinds.includes('start')) fails.push('the page for everyone has no row that starts late');
          if (lv === '1' && (!kinds.includes('gap') || !kinds.includes('overlap'))) fails.push('the easier page needs a row with gaps and a row with overlaps');
          if (kinds.every((k, i) => (k === 'right') === (i % 2 === 0)) || kinds.every((k, i) => (k === 'right') === (i % 2 === 1))) fails.push('right and wrong take turns down the page');
          const lensR = [], lensW = [];
          cards.forEach((c, i) => {
            const P = 'row ' + (i + 1), [kind, ns, nf] = c.dataset.lcsLaid.split('|'), n = +ns;
            (kind === 'right' ? lensR : lensW).push(n);
            const rb = rectOf(c.querySelector('[data-lcs-ribbon]')), cl = [...c.querySelectorAll('[data-lcs-clip]')].map(rectOf).sort((a, b) => a.left - b.left);
            const u = rb.width / n, T = u * 0.12;   // (a clip's drawn wire is a little shorter than its unit)
            const gaps = [], overs = [];
            for (let k = 1; k < cl.length; k++) { const dlt = cl[k].left - cl[k - 1].left; if (dlt > u * 1.25) gaps.push(k); if (dlt < u * 0.75) overs.push(k); }
            const startOk = Math.abs(cl[0].left - rb.left) < T + 4, endOk = Math.abs(cl[cl.length - 1].left + u - rb.right) < T + 4;
            const seen = gaps.length ? 'gap' : overs.length ? 'overlap' : !startOk ? 'start' : !endOk ? 'short' : 'right';
            if (seen !== kind) fails.push(`${P}: stamped ${kind}, drawn ${seen}`);
            if (kind === 'right' && cl.length !== n) fails.push(`${P}: ${cl.length} clips for a ribbon of ${n}`);
            if (kind === 'gap' && gaps.length !== 2) fails.push(`${P}: ${gaps.length} gaps`);
            if (kind === 'overlap' && overs.length !== 2) fails.push(`${P}: ${overs.length} overlaps`);
            if (+nf !== ({ right: 0, gap: 2, overlap: 2, start: 2, short: 1 })[kind]) fails.push(`${P}: ${nf} mistakes to circle on the key`);
            if (n < 4 || n > want[3]) fails.push(`${P}: a ribbon of ${n} clips`);
            const bub = [...c.querySelectorAll('[data-lcs-bubble]')];
            if (bub.length !== 2 || bub.some((b) => b.textContent.trim().length < 2)) fails.push(`${P}: the two marks with their words`);
            if (!!c.querySelector('[data-lcs-count]') !== (lv === '3')) fails.push(`${P}: the box for the number of clips`);
          });
          if (new Set(lensR).size !== lensR.length) fails.push('two rows laid right have the same length');
          if (new Set(lensW).size !== lensW.length) fails.push('two wrong rows have the same length');
        } else if (mode === 'two-units') {
          const cards = [...document.querySelectorAll('[data-lcs-twounits]')], seen = new Set(), rightAt = [], ratios = new Set();
          cards.forEach((c, i) => {
            const P = 'row ' + (i + 1), [ns, kind, rs, sh, tot] = c.dataset.lcsTwounits.split('|'), n = +ns, ratio = +rs, shown = +sh, total = +tot;
            if (seen.has(n + kind)) fails.push(`${P}: a ribbon twice`); seen.add(n + kind);
            if (kind === 'cube') ratios.add(ratio);
            if (kind === 'cube' ? ![2, 3].includes(ratio) || (lv === '1' && ratio !== 2) || (lv === '2' && ratio !== 3) : ratio !== 2) fails.push(`${P}: a ${kind} with ${ratio} to a clip`);
            if (total !== (kind === 'cube' ? n * ratio : n / 2) || !Number.isInteger(total)) fails.push(`${P}: ${total} ${kind}s for ${n} clips`);
            const rb = rectOf(c.querySelector('[data-lcs-ribbon]')), cl = c.querySelectorAll('[data-lcs-clip]').length, un = [...c.querySelectorAll('[data-lcs-unit2]')].map(rectOf).sort((a, b) => a.left - b.left);
            if (cl !== n) fails.push(`${P}: ${cl} clips for ${n}`);
            if (un.length !== shown || shown !== (lv === '3' ? (kind === 'cube' ? ratio : 1) : total)) fails.push(`${P}: ${un.length} of the second unit drawn`);
            const u = rb.width / n, s = kind === 'cube' ? u / ratio : 2 * u;
            for (let k = 0; k < un.length; k++) if (Math.abs(un[k].left - (rb.left + k * s)) > 3) { fails.push(`${P}: unit ${k + 1} of the second row is not laid end to end from the ribbon's start`); break; }
            if (Math.abs(un[0].width - s) > 4) fails.push(`${P}: the second unit is ${Math.round(un[0].width)} px, not ${Math.round(s)}`);
            if (lv !== '3' && Math.abs(un[un.length - 1].right - rb.right) > 4) fails.push(`${P}: the second row does not end with the ribbon`);
            if (kind === 'cube' && un.some((r) => Math.abs(r.width - r.height) > 1.5)) fails.push(`${P}: a cube that is not square`);
            if (un.some((r) => r.width < 20)) fails.push(`${P}: a unit ${Math.round(un[0].width)} px wide is too small to count`);
            if (!!c.querySelector('[data-lcs-guide]') !== (lv === '3')) fails.push(`${P}: the dotted line of the harder page`);
            if (lv === '3' && shown >= total) fails.push(`${P}: the second row is already complete`);
            const bub = [...c.querySelectorAll('[data-lcs-more] [data-lcs-bubble]')];
            if (c.querySelectorAll('.ws-answerbox').length !== 2 || bub.length !== 2) fails.push(`${P}: two boxes and two marks`);
            if (bub.map((b) => b.dataset.lcsBubble).sort().join() !== ['clip', kind].sort().join()) fails.push(`${P}: the marks do not show the row's two units`);
            rightAt.push(bub.findIndex((b) => b.dataset.lcsBubble === (kind === 'cube' ? 'cube' : 'clip')));
          });
          if (cards.length !== 4) fails.push(cards.length + ' rows');
          const kinds = cards.map((c) => c.dataset.lcsTwounits.split('|')[1]);
          if (kinds.filter((k) => k === 'cube').length !== 2 || kinds.filter((k) => k === 'stick').length !== 2) fails.push('two rows with a shorter unit and two with a longer one: ' + kinds.join(','));
          if (new Set(rightAt).size !== 2) fails.push('the unit to mark stands at the same place on every row');
          if (rightAt.join('') === '0101' || rightAt.join('') === '1010') fails.push('the mark to fill in takes turns down the page');
          if (ratios.size !== 1) fails.push('cubes of two sizes on one page');
        } else {
          const T = document.querySelector('[data-lcs-plottable]'), Pl = document.querySelector('[data-lcs-plotline]'), Q = document.querySelector('[data-lcs-plotq]');
          if (!T || !Pl || !Q) return ['the table, the line or the questions are missing'];
          const data = lv !== '3', [lo, numbered] = Pl.dataset.lcsPlotline.split('|').map(Number);
          const cells = T.querySelectorAll('[data-lcs-cell]');
          if (cells.length !== 10) fails.push(cells.length + ' cells in the table');
          cells.forEach((c, i) => { if (c.querySelector('span').scrollWidth > c.querySelector('span').clientWidth + 1) fails.push(`cell ${i + 1}: its head is cut`); });
          if (!!T.querySelector('[data-lcs-blank]') === data) fails.push('the table is ' + (data ? 'empty' : 'filled'));
          const ticks = [...Pl.querySelectorAll('[data-lcs-tick]')].map((e) => +e.dataset.lcsTick);
          const nT = !data && root.dataset.lcsUnit === 'cm' ? 18 : 12;
          if (ticks.length !== nT || ticks.some((v, k) => v !== lo + k)) fails.push(nT + ' ticks from ' + lo);
          const tb = [...Pl.querySelectorAll('[data-lcs-tickbox]')].map(rectOf); for (let k = 1; k < tb.length; k++) if (tb[k].left < tb[k - 1].right + 1) { fails.push('two boxes under the line touch'); break; }
          if (nT === 18 && tb.some((r) => r.height < 40)) fails.push('the boxes of the long line are too low for two digits');
          const nums = Pl.querySelectorAll('[data-lcs-ticknum]').length, boxes = Pl.querySelectorAll('[data-lcs-tickbox]').length;
          if (numbered ? nums !== 12 || boxes !== 0 : data ? nums !== 1 || boxes !== 11 : nums !== 0 || boxes !== nT) fails.push(`${nums} numbers and ${boxes} boxes under the line`);
          if ((lv === '1') !== !!numbered) fails.push('only the easier page has its line numbered');
          const qs = [...Q.querySelectorAll('[data-lcs-q]')];
          if (qs.length !== 3 || qs.some((e) => e.querySelectorAll('.ws-answerbox').length !== 1)) fails.push('three questions with one box each');
          qs.forEach((e, i) => { if (rectOf(e).height > 62) fails.push(`question ${i + 1} runs over three lines`); if (/\{[KU]\}/.test(e.textContent)) fails.push(`question ${i + 1} keeps a placeholder`); });
          if (qs.map((e) => e.dataset.lcsQ).join(',') !== (data ? 'most,longer,diff' : 'shortest,longest,diff')) fails.push('the questions of the level: ' + qs.map((e) => e.dataset.lcsQ).join(','));
          if (data) {
            const vals = T.dataset.lcsPlottable.split(',').map(Number), [most, longer, diff, K] = Q.dataset.lcsPlotq.split('|').map(Number);
            const cnt = (v) => vals.filter((x) => x === v).length, mx = Math.max(...vals), mn = Math.min(...vals);
            const top = Math.max(...vals.map(cnt));
            if (vals.length !== 10) fails.push(vals.length + ' lengths');
            if ([...new Set(vals)].filter((v) => cnt(v) === top).length !== 1) fails.push('two lengths are found most often');
            if (cnt(most) !== top || top > 4) fails.push('the most frequent length is not ' + most + ' (or it needs more than four Xs)');
            if (vals.filter((x) => x > K).length !== longer || longer < 2) fails.push('longer than ' + K + ' is not ' + longer);
            if (mx - mn !== diff) fails.push('the difference is not ' + diff);
            if (new Set([most, longer, diff]).size !== 3) fails.push('two questions have the same answer');
            if (vals.some((v) => v < lo + 1 || v > lo + 10)) fails.push('a length at the end of the line or off it');
            if (root.dataset.lcsUnit === 'in' ? vals.some((v) => v < 2 || v > 8) : vals.some((v) => v < 7 || v > 18)) fails.push('a pencil of a length no pencil has');
            const printed = [...T.querySelectorAll('[data-lcs-cell]')].map((c) => parseInt(c.children[1].textContent, 10));
            if (printed.join(',') !== vals.join(',')) fails.push('the printed lengths read ' + printed.join(','));
            if (!qs[1].textContent.includes(String(K))) fails.push('the second question does not print ' + K);
          }
        }
        return fails;
      });
    },
  };
}

module.exports = { makeMeasureUnitsType, LEVELS, PLOT_WORDS, MARK_WORDS };
