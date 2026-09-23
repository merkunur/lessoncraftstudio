/**
 * G1-399 — Sink or Float Experiment: Predict and Test (nt5-F, b6; family key `sink-or-float`,
 * G1, science, no CCSS — `teaches` "Sink or float: predict and test (science inquiry)").
 * Design: docs/worksheet-gen/b6-designs/G1-399-sink-or-float.md §2/§5; every ruling in
 * _work/G1-399-critic.md; build record _work/G1-399-build.md.
 *
 * "Guess, then splash": a legend strip teaches the two positions ONCE (a teal pebble bobbing
 * at the waterline = floats, the same pebble resting on the gravel = sinks — the only float /
 * sink words on the page). Below, rows of little aquariums: an object picture tile, a GUESS
 * tank (thought-bubble head) and a TEST tank (splash head), each holding two IDENTICAL dashed
 * coral rings — one half-submerged at the waterline, one on the floor — then a "Surprise?"
 * star. The child colours one ring in the guess tank before the class tub test, one in the
 * test tank after dropping the real object in water, and the star when the two disagree.
 * Meaning = POSITION: it reads with no words and in greyscale. OPEN page (the prediction is
 * the child's, the result is physical; printable decks ship no key).
 *
 * THEME axis OFF, no unitAxis. build() reads ONLY its bank (lib/b6-common.js
 * bank('sink-or-float', loc) — a missing locale block THROWS) + the locale-neutral CLAIM
 * table of the same module; every picture is a fixed (theme, noun) CLAIM row read with
 * fileUri(theme, noun); every label is the panel literal labels[claimId] (a row without a
 * label in the locale is SKIPPED — a panel refusal — and a pool that cannot fill the config
 * THROWS). Never image-vocabulary.js at render; the code never infers an outcome.
 *
 * Ladder (a CONFIG; every guard keys on the RESOLVED keys, never the level index):
 *   d1  4 rows · float 2 / sink 2 · no mustInclude · star (the instruction names it) · pic 72 · tank 200x100 · row 130
 *   d2  6 rows · float 3 / sink 3 · >= 1 bigFloat AND >= 1 smallSink · star · pic 60 · tank 170x85 · row 86 (ships)
 *   d3  7 rows · 4 / 3 · >= 2 each · star · pic 48 · tank 150x75 · row 75 (never shipped; the design's 8 x 66 cannot hold its tank)
 *
 * COMPOSER (locale-neutral — the same pictures in the same order in all 11 locales; the rng
 * never sees a word): draw the mustInclude big floaters / small sinkers, fill each side from
 * the rest, then rng.shuffle the rows, re-drawn while (a) three consecutive rows share an
 * outcome, (b) the outcomes strictly alternate, or (c) all floaters precede all sinkers or
 * vice versa.
 *
 * Layout (design §2, body 722 / 677): root grid rows `72px 30px repeat(N, minmax(rowMin, tank+34))`
 * (legend, heads, rows) with 6 px gaps (the design's 8 px legend gap is 6 — one gap token),
 * top-anchored; the rows GROW with the body (FILL) up to tank + 34 (SPARSE); columns
 * pic 112 | 18 | tank | 18 | tank | 18 | star 64, centred (the design's 100 px tile clipped fr
 * "pomme de terre" at 14 px — measured; 112 holds it, row 570 <= 675).
 * Stack at d2: 72 + 6 + 30 + 6 + 6 x 86 + 5 x 6 = 660 <= 677.
 *
 * FACES (design §3) ride ONE additive knob `d.layout` (undefined = this base, byte-identical):
 * 'scale' (G1-408) · 'shape' (G2-382) · 'truth' (G2-383) · 'draw' (K-384) · 'report' (G3-400).
 * Their build + verify are the FACE object below (inline: a sibling file under types/ would be
 * loaded as a spec by lib/load-types.js); a face root stamps data-lcs-layout, the base never does.
 *
 * Stamps: root [data-ws-content][data-lcs-type="sink-or-float"][data-lcs-sof="base"]
 * data-lcs-locale data-lcs-mix data-lcs-must data-lcs-star data-lcs-pic data-lcs-claims (JSON
 * of the rows' CLAIM entries + label — verify() runs in the page and cannot require);
 * each row [data-lcs-row] data-lcs-item="<theme>/<noun>" data-lcs-claim data-lcs-result
 * (from the bank, never rendered); each tank svg data-lcs-tank="guess|test"; each ring
 * data-lcs-slot="top|floor"; the star svg data-lcs-star.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b6-common.js');
const C6 = require('../../templates/components-b6.js');
const { fileUri } = require('../../image-cache/resolve.js');
const { SINK_OR_FLOAT_NEUTRAL: NEUTRAL } = require('../../data/b6/sink-or-float.js');
const { waterTank } = require('../../primitives/water-tank.js');
const { rulingBlock } = require('../../templates/components-b2.js');

const ID = 'G1-399';
const KEY = 'sink-or-float';
const BANK = 'sink-or-float';
const BODY_W = 675, G1_FLOOR = 44, TRIES = 200;
const LEGEND_H = 72, HEADS_H = 30, ROW_GAP = 6, PIC_COL = 112, COL_GAP = 18, STAR_COL = 64, STAR_PX = 40;

function literal(obj, key, what, loc) {
  const v = obj && obj[key];
  if (typeof v !== 'string' || !v.trim()) throw new Error(`${ID}: ${loc} ${what}.${key} is missing (refuse)`);
  if (v !== v.trim()) throw new Error(`${ID}: ${loc} ${what}.${key} "${v}" is not trimmed`);
  if (/[{}\d]/.test(v)) throw new Error(`${ID}: ${loc} ${what}.${key} "${v}" carries a slot or a digit`);
  return v;
}
/** The three order rules (design §2); true = the sequence is acceptable. */
function orderOk(seq) {
  for (let i = 2; i < seq.length; i++) if (seq[i] === seq[i - 1] && seq[i] === seq[i - 2]) return false;
  if (seq.length > 1 && seq.every((x, i) => i === 0 || x !== seq[i - 1])) return false;
  const firstS = seq.indexOf('sink'), lastF = seq.lastIndexOf('float'), firstF = seq.indexOf('float'), lastS = seq.lastIndexOf('sink');
  if (lastF < firstS || lastS < firstF) return false;
  return true;
}

/* ================================================================ FACES (Phase E, 2026-09-23)
 * ONE additive knob `layout` (design §3): undefined = the base, byte-identical. A face root stamps
 * data-lcs-layout (never the base). Every guard keys on the RESOLVED config. The draws are
 * locale-neutral (the rng never sees a word), so a position tell would ship to all 11 locales at once:
 * each composer rejects its tell BY CONSTRUCTION and verify() re-measures it on the page.
 * `force*` keys are the GATE's poison seams — never a shipped config. */
const FACE_LAYOUTS = ['scale', 'shape', 'truth', 'draw', 'report'];
const FACE_BODY = 667;          // MEASURED (G1-376 + this gate): the worst legal chrome (4-line fi title + 3-line instruction)
const FLOOR = { scale: 44, shape: 36, truth: 36, draw: 56, report: 36 };
const constantOrAlternating = (s) => s.length > 1 && (new Set(s).size < 2 || s.every((x, i) => i === 0 || x !== s[i - 1]));
const FACE = {
  build(bankLoc, d, loc, rng) {
    const L = d.layout;
    if (!FACE_LAYOUTS.includes(L)) throw new Error(`${ID}: unknown layout "${L}"`);
    if (Array.isArray(bankLoc && bankLoc.refuse) && bankLoc.refuse.includes(L)) throw new Error(`${ID}: ${loc} refuses the ${L} face (bank.refuse)`);
    const N = NEUTRAL;
    const byId = Object.fromEntries(N.CLAIMS.map((c) => [c.id, c]));
    const labels = (bankLoc && bankLoc.labels) || {};
    const js = (o) => JSON.stringify(o).replace(/'/g, '&#39;');
    const pic = (id, px) => { const c = byId[id]; return { id, theme: c.theme, noun: c.noun, px, src: fileUri(c.theme, c.noun) }; };
    const draw = (tries, make, okFn, what) => { for (let t = 0; t < tries; t++) { const c = make(); if (okFn(c)) return c; } throw new Error(`${ID}: no ${what} in ${tries} draws`); };
    const rootOpen = (extra, style) => `<div data-ws-content data-lcs-type="${KEY}" data-lcs-layout="${L}" data-lcs-locale="${loc}" ${extra} style="flex:1;min-height:0;${style}">`;

    if (L === 'scale') {
      const m = d.mix || {};
      if (m.heavyFloats + m.lightFloats !== d.cards || d.cols * d.rows !== d.cards) throw new Error(`${ID}: scale mix ${JSON.stringify(m)} ≠ cards ${d.cards} (${d.cols} x ${d.rows})`);
      if (!(d.smallPx >= FLOOR.scale) || d.bigPx / d.smallPx < 1.6) throw new Error(`${ID}: scale pictures ${d.bigPx}/${d.smallPx} (floor ${FLOOR.scale}, ratio >= 1.6)`);
      if (d.rows * d.cardMin + (d.rows - 1) * d.rowGap > FACE_BODY) throw new Error(`${ID}: scale stack > ${FACE_BODY}`);
      if (d.cols * d.cardW + (d.cols - 1) * d.colGap > 675) throw new Error(`${ID}: scale row > 675`);
      if (d.balance[0] > d.cardW - 8 || d.balance[1] + 4 > d.cardMin) throw new Error(`${ID}: the balance ${d.balance} does not fit its card`);
      // lead review 2026-09-23: the heavier picture must REST IN its pan wholly under the beam -> the strings must be at
      // least as long as the picture is tall, and the heavier dish floor must stay inside the drawing
      if (!(d.drop >= d.bigPx + 2)) throw new Error(`${ID}: pan drop ${d.drop} < the heavier picture ${d.bigPx} + 2 (it would cross the beam)`);
      const floorMax = d.balance[1] * d.beamAt + Math.sin(7 * Math.PI / 180) * 0.32 * d.balance[0] + d.drop + 8;
      if (floorMax > d.balance[1] - 2) throw new Error(`${ID}: the heavier dish floor ${floorMax.toFixed(1)} leaves the ${d.balance[1]} px balance`);
      const usable = (p) => [p.a, p.b].every((id) => byId[id] && byId[id].use.includes('scale') && typeof labels[id] === 'string' && labels[id].trim());
      const P = N.PAIRS.filter((p) => p.id[0] === 'P' && usable(p)), Q = N.PAIRS.filter((p) => p.id[0] === 'Q' && usable(p));
      if (P.length < m.heavyFloats || Q.length < m.lightFloats) throw new Error(`${ID}: ${loc} scale pool P ${P.length} / Q ${Q.length} cannot fill ${JSON.stringify(m)} (refuse)`);
      const pairs = draw(400, () => [...rng.shuffle(P.slice()).slice(0, m.heavyFloats), ...rng.shuffle(Q.slice()).slice(0, m.lightFloats)],
        (ps) => new Set(ps.flatMap((p) => [p.a, p.b])).size === 2 * ps.length, 'scale pair set with distinct nouns');
      let cards = draw(400, () => rng.shuffle(pairs.slice()).map((p) => ({ p, floats: rng.int(0, 1) ? 'L' : 'R' })), (cs) => {
        const fl = cs.map((c) => c.floats), tl = cs.map((c) => (c.p.heavier === 'a') === (c.floats === 'L') ? 'L' : 'R');
        const nl = (s) => s.filter((x) => x === 'L').length;
        return nl(fl) * 2 === cs.length && nl(tl) * 2 === cs.length && !constantOrAlternating(fl) && !constantOrAlternating(tl);
      }, 'card order with balanced floater + tilt sides');
      if (d.forceCards) cards = d.forceCards.map((f) => ({ p: N.PAIRS.find((p) => p.id === f.pair), floats: f.floats }));
      const html = cards.map(({ p, floats }, i) => {
        const fl = pic(p.a, 0), sk = pic(p.b, 0);
        const left = floats === 'L' ? fl : sk, right = floats === 'L' ? sk : fl;
        const floaterHeavier = p.heavier === 'a';
        const heavier = floaterHeavier ? floats : (floats === 'L' ? 'R' : 'L');
        const swap = d.forceFloaterSmall && floaterHeavier;   // PR4 poison seam: the (heavier) floater drawn SMALLER
        let h0 = C6.sfScaleCard({ pair: p.id, left, right, heavier, floats, bigPx: swap ? d.smallPx : d.bigPx, smallPx: swap ? d.bigPx : d.smallPx, w: d.balance[0], h: d.balance[1], drop: d.drop, beamAt: d.beamAt, cardW: d.cardW, cardMin: d.cardMin, oldPlacement: !!d.forceOldPlacement });
        if (d.forceTiltLie && i === 0) h0 = h0.replace(/data-lcs-tilt="(left|right)"/, (m0, t0) => `data-lcs-tilt="${t0 === 'left' ? 'right' : 'left'}"`);   // PR2 poison seam
        return h0;
      });
      const claims = [...new Set(cards.flatMap((c) => [c.p.a, c.p.b]))].map((id) => ({ id, theme: byId[id].theme, noun: byId[id].noun, result: byId[id].result }));
      const bodyHtml = rootOpen(`data-lcs-mix='${js(m)}' data-lcs-pairs='${js(cards.map((c) => ({ id: c.p.id, a: c.p.a, b: c.p.b, heavier: c.p.heavier })))}' data-lcs-claims='${js(claims)}' data-lcs-big="${d.bigPx}" data-lcs-small="${d.smallPx}"`,
        `display:grid;grid-template-columns:repeat(${d.cols},${d.cardW}px);column-gap:${d.colGap}px;grid-template-rows:repeat(${d.rows},minmax(${d.cardMin}px,1fr));row-gap:${d.rowGap}px;justify-content:center;align-content:start`) + html.join('') + '</div>';
      return { bodyHtml, meta: { layout: L, cards: cards.map((c) => ({ pair: c.p.id, floats: c.floats })) } };
    }

    if (L === 'shape') {
      if (!Array.isArray(d.forms) || d.forms.slice().sort().join() !== 'ball,boat') throw new Error(`${ID}: shape forms must be ball + boat (a bowl / pancake / sheet is ruled out)`);
      for (const f of d.forms) if (!N.SHAPES[f]) throw new Error(`${ID}: no SHAPES outcome for ${f}`);
      if (!(d.formW >= 120) || !(0.32 * d.tank[1] >= 24)) throw new Error(`${ID}: shape forms ${d.formW} / rings under the floor`);
      const stack = d.clayH + d.rowGap + (d.transfer ? d.transferH + d.rowGap : 0) + d.drawTank[1];
      if (stack > FACE_BODY) throw new Error(`${ID}: shape stack ${stack} > ${FACE_BODY}`);
      const forms = d.forceForms ? d.forceForms.slice() : rng.shuffle(d.forms.slice());
      const clay = forms.map((f) => C6.sfClayRow({ form: f, result: N.SHAPES[f], lumpW: d.lumpW, formW: d.formW, tank: d.tank, cardW: d.cardW }));
      if (d.forceHalfBoat) { const i = forms.indexOf('boat'); clay[i] = clay[i].replace(/M 18 70 L 142 70 Q 134 112 80 114 Q 26 112 18 70 Z/, 'M 18 70 L 142 70 Q 134 88 80 90 Q 26 88 18 70 Z'); }
      let transfer = '', tStamp = null;
      if (d.transfer) {
        const [sId, fId] = d.transfer;   // [sinker, floater]
        for (const id of [sId, fId]) if (!byId[id] || !byId[id].use.includes('shape') || byId[id].conf !== 'high') throw new Error(`${ID}: transfer ${id} is not a high shape row`);
        if (byId[sId].result !== 'sink' || byId[fId].result !== 'float') throw new Error(`${ID}: transfer must be [sinker, floater]`);
        const floats = d.forceTransferSide || (rng.int(0, 1) ? 'L' : 'R');
        const s0 = pic(sId, d.smallPx), f0 = pic(fId, d.bigPx);
        transfer = C6.sfTransferCard({ left: floats === 'L' ? f0 : s0, right: floats === 'L' ? s0 : f0, floats, w: 639, minH: d.transferH });
        tStamp = { floats, sinker: sId, floater: fId };
      }
      // the draw tank STRETCHES with the body (FILL; the F4 tub precedent) — the clay and transfer rows keep their size
      const drawT = waterTank({ w: d.drawTank[0], h: d.drawTank[1], mode: 'empty', id: 'draw', stretch: true }).svg.replace('<svg ', '<svg data-lcs-block ');
      const rows = [`${d.clayH}px`, ...(d.transfer ? [`${d.transferH}px`] : []), `minmax(${d.drawTank[1]}px,1fr)`];
      const bodyHtml = rootOpen(`data-lcs-forms="${forms.join(',')}" data-lcs-shapes='${js(N.SHAPES)}'${tStamp ? ` data-lcs-transfer-stamp='${js(tStamp)}'` : ''}`,
        `display:grid;grid-template-rows:${rows.join(' ')};row-gap:${d.rowGap}px;justify-items:center;align-content:start`) +
        `<div style="display:flex;gap:15px;height:100%">${clay.join('')}</div>` + transfer +
        `<div data-lcs-draw-tank style="display:flex;justify-content:center;height:100%;min-height:${d.drawTank[1]}px">${drawT}</div></div>`;
      return { bodyHtml, meta: { layout: L, forms, transfer: tStamp } };
    }

    if (L === 'truth') {
      const TFL = bankLoc && bankLoc.tf;
      if (!TFL) throw new Error(`${ID}: ${loc} bank has no tf block (refuse)`);
      const ids = Object.keys(N.TF).filter((id) => typeof TFL[id] === 'string' && TFL[id].trim() && N.TF[id].objects.every((o) => typeof labels[o] === 'string' && labels[o].trim()));
      const m = d.mix || {};
      if (m.T + m.F !== d.rows) throw new Error(`${ID}: truth mix ≠ rows`);
      if (d.rows * d.rowMin + (d.rows - 1) * d.rowGap + d.shelfH + d.rowGap > FACE_BODY) throw new Error(`${ID}: truth stack > ${FACE_BODY}`);
      if (!(d.textPx >= 17) || !(d.shelfPx >= FLOOR.truth)) throw new Error(`${ID}: truth under the G2 floors`);
      const side = (t) => ids.filter((id) => N.TF[id].truth === t);
      if (side('T').length < m.T || side('F').length < m.F) throw new Error(`${ID}: ${loc} tf pool cannot fill ${JSON.stringify(m)} (refuse)`);
      const okSet = (set) => {
        for (const t of ['T', 'F']) { const s0 = set.filter((id) => N.TF[id].truth === t); if (!s0.some((id) => N.TF[id].kind === 'spec') || !s0.some((id) => N.TF[id].kind === 'gen')) return false; }
        if (!set.some((id) => N.TF[id].misconception)) return false;
        const objs = set.flatMap((id) => N.TF[id].objects);
        return new Set(objs).size === objs.length;
      };
      const set = draw(400, () => [...rng.shuffle(side('T')).slice(0, m.T), ...rng.shuffle(side('F')).slice(0, m.F)], okSet, 'true/false set');
      const ordOk = (o) => { const s0 = o.map((id) => N.TF[id].truth); const h = s0.length / 2; return !constantOrAlternating(s0) && s0.join('') !== 'T'.repeat(h) + 'F'.repeat(h) && s0.join('') !== 'F'.repeat(h) + 'T'.repeat(h); };
      let order = draw(400, () => rng.shuffle(set.slice()), ordOk, 'true/false order');
      if (d.forceOrder) order = d.forceOrder.slice();
      const objs = rng.shuffle([...new Set(order.flatMap((id) => N.TF[id].objects))]);
      if (d.forceDropShelf) objs.splice(objs.indexOf(d.forceDropShelf), 1);
      const shelf = C6.sfEvidenceShelf({ items: objs.map((id) => ({ ...pic(id, d.shelfPx), label: labels[id] })), px: d.shelfPx, h: d.shelfH });
      const yes = literal(bankLoc, 'trueWord', 'bank', loc), no = literal(bankLoc, 'falseWord', 'bank', loc);
      let rows = order.map((id, i) => C6.sfClaimRow({ n: i + 1, id, truth: N.TF[id].truth, text: TFL[id], yes, no, textPx: d.textPx }));
      if (d.forcePictureInTrue) { const i = order.findIndex((id) => N.TF[id].truth === 'T'); rows[i] = rows[i].replace('<span data-lcs-claim-text', `<img src="${fileUri('toys', 'ball')}" style="width:40px;height:40px" alt=""><span data-lcs-claim-text`); }
      const meta = Object.fromEntries(order.map((id) => [id, { truth: N.TF[id].truth, kind: N.TF[id].kind, objects: N.TF[id].objects, misconception: !!N.TF[id].misconception }]));
      const bodyHtml = rootOpen(`data-lcs-mix='${js(m)}' data-lcs-tfmeta='${js(meta)}' data-lcs-true-word="${yes.replace(/"/g, '&quot;')}" data-lcs-false-word="${no.replace(/"/g, '&quot;')}"`,
        `display:grid;grid-template-rows:${d.shelfH}px repeat(${d.rows},minmax(${d.rowMin}px,${d.rowMin + 34}px));row-gap:${d.rowGap}px;justify-items:center;align-content:start;grid-template-columns:639px;justify-content:center`) +
        shelf + rows.join('') + '</div>';
      return { bodyHtml, meta: { layout: L, order } };
    }

    if (L === 'draw') {
      const floatWord = literal(bankLoc, 'floatWord', 'bank', loc), sinkWord = literal(bankLoc, 'sinkWord', 'bank', loc);
      if (!(d.tagPx >= 20)) throw new Error(`${ID}: draw tag text ${d.tagPx} < 20`);
      if (d.tub[1] > FACE_BODY) throw new Error(`${ID}: draw tub ${d.tub[1]} > ${FACE_BODY}`);
      const tub = C6.sfTub({ floatWord, sinkWord, w: d.tub[0], h: d.tub[1], spots: d.spots, tagPx: d.tagPx, minH: d.tub[1] });
      let html = tub.html;
      if (d.forceTwoTanks) html = html + waterTank({ w: 639, h: 120, mode: 'empty', id: 'second' }).svg;
      const bodyHtml = rootOpen(`data-lcs-spots="${d.spots}" data-lcs-float-word="${floatWord.replace(/"/g, '&quot;')}" data-lcs-sink-word="${sinkWord.replace(/"/g, '&quot;')}"`,
        `display:grid;grid-template-rows:minmax(${d.tub[1]}px,1fr);align-content:start;justify-content:center`) + html + '</div>';
      return { bodyHtml, meta: { layout: L } };
    }

    // L === 'report'
    const Q = bankLoc && bankLoc.questions, R = bankLoc && bankLoc.report;
    if (!Q || !R) throw new Error(`${ID}: ${loc} bank has no questions / report block (refuse)`);
    if (!(d.glyphH >= 24)) throw new Error(`${ID}: report glyphH ${d.glyphH} < the G3 24`);
    const qs = d.questions.map((q) => { if (!N.QUESTIONS.includes(q)) throw new Error(`${ID}: unknown question ${q}`); return { q, text: literal(Q, q, 'questions', loc) }; });
    for (const k of ['question', 'predict', 'result', 'learned', 'starter']) literal(R, k, 'report', loc);
    const orange = byId.orange;
    const qCards = qs.map(({ q, text }) => C6.sfQuestionCard({ q, text, textPx: d.textPx, pictureHtml: q === 'orange' ? `<img src="${fileUri(orange.theme, orange.noun)}" alt="" data-lcs-pic style="width:52px;height:52px;object-fit:contain;display:block">` : C6.sfCargoPicture() }));
    const rule = (rows, w, starter) => rulingBlock({ rows, w, h: d.rowH, glyphH: d.glyphH, starters: starter ? { 0: starter } : {} });
    const resultTank = waterTank({ w: d.resultTank[0], h: d.resultTank[1], mode: 'empty', id: 'result' }).svg;
    let learnedHtml = rule(d.learnRows, 600, R.starter);
    if (d.forceAnswerBox) learnedHtml += '<span class="ws-answerbox" data-lcs-answer="undefined"></span>';
    const sections = [
      C6.sfSection({ n: 1, key: 'question', glyph: C6.sfQuestionGlyph(), head: R.question, inner: `<div style="display:flex;flex-direction:column;gap:4px">${qCards.join('')}</div>` }),
      C6.sfSection({ n: 2, key: 'predict', glyph: C6.sfThinkGlyph(), head: R.predict, inner: rule(d.predictRows, 600) }),
      C6.sfSection({ n: 3, key: 'result', glyph: C6.sfSplashGlyph(), head: R.result, inner: `<div style="display:flex;align-items:center;gap:12px">${resultTank}${rule(d.resultRows, 360)}</div>` }),
      C6.sfSection({ n: 4, key: 'learned', glyph: C6.sfBulbGlyph(), head: R.learned, inner: learnedHtml }),
    ];
    const bodyHtml = rootOpen(`data-lcs-questions="${d.questions.join(',')}" data-lcs-glyph-h="${d.glyphH}"`,
      `display:flex;flex-direction:column;gap:${d.gap}px;align-items:center`) + sections.map((s0) => `<div style="flex:1 1 auto;display:flex">${s0}</div>`).join('') + '</div>';
    return { bodyHtml, meta: { layout: L } };
  },

  /** verify() for the five faces: re-derives every answer from the stamps + the rendered page, then a node cross-check. */
  async verify(page, layout) {
    const fails = await page.evaluate((L, FLOOR) => {
      const fails = [];
      const root = document.querySelector('[data-ws-content][data-lcs-type="sink-or-float"]');
      const rect = (el) => el.getBoundingClientRect();
      const all = (s, r) => [...(r || root).querySelectorAll(s)];
      const J = (k) => { try { return JSON.parse(root.getAttribute(k) || 'null'); } catch (e) { fails.push(`${k} is not JSON`); return null; } };
      const alt = (s) => s.length > 1 && (new Set(s).size < 2 || s.every((x, i) => i === 0 || x !== s[i - 1]));
      const foot = document.querySelector('.ws-foot');
      const low = Math.max(0, ...all('*').map((e) => rect(e).bottom));
      if (foot && low > rect(foot).top + 0.6) fails.push(`content reaches the footer (${low.toFixed(0)} > ${rect(foot).top.toFixed(0)})`);
      if (root.scrollWidth > root.clientWidth + 0.6) fails.push('the body overflows horizontally');
      all('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push(`a picture did not load (${im.src.slice(-40)})`); });
      // SPARSE on the block rects
      const iv = all('[data-lcs-block]').map((e) => [rect(e).top, rect(e).bottom]).sort((a, b) => a[0] - b[0]);
      if (!iv.length) fails.push('no [data-lcs-block] (SPARSE cannot be measured)');
      let edge = rect(root).top, gap = 0;
      for (const [t, b] of iv) { if (t - edge > gap) gap = t - edge; if (b > edge) edge = b; }
      if (gap > 40) fails.push(`SPARSE — a ${gap.toFixed(0)} px blank band between content blocks (> 40)`);
      // rings: identical, empty; the float ring ON the waterline, the sink ring ON the floor (lead review, base)
      const ringsCheck = (t, where) => {
        const rs = all('circle[data-lcs-slot]', t);
        if (rs.map((x) => x.dataset.lcsSlot).sort().join() !== 'floor,top') { fails.push(`${where}: a tank without its top + floor rings`); return; }
        const sig = (x) => ['r', 'fill', 'stroke', 'stroke-width', 'stroke-dasharray'].map((a) => x.getAttribute(a)).join('|');
        if (sig(rs[0]) !== sig(rs[1])) fails.push(`${where}: the two rings differ — a pre-marked ring`);
        rs.forEach((x) => { if ((x.getAttribute('fill') || '').toUpperCase() !== '#FFFFFF') fails.push(`${where}: a ring is pre-filled — answer printed`); if (rect(x).width < 24 - 0.6) fails.push(`${where}: ring under 24 px`); });
        const wl = t.querySelector('[data-lcs-tank-part="waterline"] path'), fl = t.querySelector('[data-lcs-floor-top]');
        const a = rect(rs.find((x) => x.dataset.lcsSlot === 'top')), b = rect(rs.find((x) => x.dataset.lcsSlot === 'floor'));
        const wy = (rect(wl).top + rect(wl).bottom) / 2, fy = (rect(fl).top + rect(fl).bottom) / 2;
        if (Math.abs((a.top + a.bottom) / 2 - wy) > 1) fails.push(`${where}: the float ring is not centred on the waterline`);
        if (b.bottom < fy - 2 || b.bottom > fy + 1.5) fails.push(`${where}: the sink ring does not rest on the floor`);
      };
      const text = (el) => { const c = el.cloneNode(true); c.querySelectorAll('title').forEach((t) => t.remove()); return c.textContent.trim(); };

      if (L === 'scale') {
        const mix = J('data-lcs-mix') || {}, pairs = J('data-lcs-pairs') || [], claims = Object.fromEntries((J('data-lcs-claims') || []).map((c) => [c.id, c]));
        const cards = all('[data-lcs-scale-card]');
        if (cards.length !== (mix.heavyFloats || 0) + (mix.lightFloats || 0)) fails.push(`${cards.length} cards ≠ the mix`);
        const fl = [], tl = []; let heavyFloats = 0; const nouns = [];
        cards.forEach((c, i) => {
          const p = pairs.find((x) => x.id === c.dataset.lcsPair);
          if (!p) { fails.push(`card ${i + 1}: pair ${c.dataset.lcsPair} not stamped`); return; }
          const pl = c.querySelector('[data-lcs-pan-pic="L"]'), pr = c.querySelector('[data-lcs-pan-pic="R"]');
          const itemOf = (el) => el && Object.values(claims).find((x) => x.theme + '/' + x.noun === el.dataset.lcsItem);
          const A = itemOf(pl), B = itemOf(pr);
          if (!A || !B) { fails.push(`card ${i + 1}: a pan picture is not a stamped claim`); return; }
          nouns.push(A.id, B.id);
          if ([A.result, B.result].sort().join() !== 'float,sink') fails.push(`card ${i + 1}: not one floater + one sinker`);
          const floatSide = A.result === 'float' ? 'L' : 'R';
          if (c.dataset.lcsFloats !== floatSide) fails.push(`card ${i + 1}: floats stamp ${c.dataset.lcsFloats} ≠ the claim side ${floatSide}`);
          const heavierId = p.heavier === 'a' ? p.a : p.b, heavySide = A.id === heavierId ? 'L' : 'R';
          if (c.dataset.lcsHeavier !== heavySide) fails.push(`card ${i + 1}: heavier stamp ≠ the PAIR table`);
          const svg = c.querySelector('svg[data-lcs-prim="balance"]');
          const tilt = svg && svg.getAttribute('data-lcs-tilt');
          if (tilt !== (heavySide === 'L' ? 'left' : 'right')) fails.push(`card ${i + 1}: tilt lies — the scale tilts ${tilt} but the heavier thing is ${heavySide}`);
          const panL = svg && svg.querySelector('[data-lcs-pan="left"]'), panR = svg && svg.querySelector('[data-lcs-pan="right"]');
          if (panL && panR) {
            const dy = rect(heavySide === 'L' ? panL : panR).bottom - rect(heavySide === 'L' ? panR : panL).bottom;
            if (dy < 20) fails.push(`card ${i + 1}: the heavier pan is only ${dy.toFixed(1)} px lower (< 20)`);
            // lead review 2026-09-23 — the object RESTS IN its pan: its box bottom within +-3 px of the dish floor (the pan
            // path's lowest point), centred on the pan, never touching the beam segment (5 px stroke), drawn in front
            const beam = svg.querySelector('line[data-lcs-beam]'), sr = rect(svg);
            const B = beam && { x1: sr.left + +beam.getAttribute('x1'), y1: sr.top + +beam.getAttribute('y1'), x2: sr.left + +beam.getAttribute('x2'), y2: sr.top + +beam.getAttribute('y2') };
            const segHitsRect = (s0, r, pad) => { for (let k = 0; k <= 200; k++) { const t = k / 200, x = s0.x1 + (s0.x2 - s0.x1) * t, y = s0.y1 + (s0.y2 - s0.y1) * t; if (x >= r.left - pad && x <= r.right + pad && y >= r.top - pad && y <= r.bottom + pad) return true; } return false; };
            [[pl, panL, 'L'], [pr, panR, 'R']].forEach(([pp, pan, sd]) => {
              const a = rect(pp.querySelector('img')), b = rect(pan);
              if (Math.abs((a.left + a.right) / 2 - (b.left + b.right) / 2) > 2) fails.push(`card ${i + 1}: the ${sd} object is off its pan`);
              if (Math.abs(a.bottom - b.bottom) > 3) fails.push(`card ${i + 1}: the ${sd} object does not rest in its pan (bottom ${(a.bottom - b.bottom).toFixed(1)} px from the dish floor)`);
              if (!B) fails.push(`card ${i + 1}: no beam`); else if (segHitsRect(B, a, 2.5)) fails.push(`card ${i + 1}: the beam crosses the ${sd} object (skewered)`);
              if (pp.compareDocumentPosition(svg) & Node.DOCUMENT_POSITION_FOLLOWING) fails.push(`card ${i + 1}: the ${sd} object is drawn behind the balance`);
            });
          }
          const hi = rect((heavySide === 'L' ? pl : pr).querySelector('img')).height, lo = rect((heavySide === 'L' ? pr : pl).querySelector('img')).height;
          if (hi / lo < 1.6) fails.push(`card ${i + 1}: size does not follow mass (heavier ${hi.toFixed(0)} / lighter ${lo.toFixed(0)} < 1.6)`);
          if (lo < FLOOR - 0.6) fails.push(`card ${i + 1}: a picture ${lo.toFixed(0)} px < ${FLOOR}`);
          if (heavySide === floatSide) heavyFloats++;
          fl.push(floatSide); tl.push(heavySide);
          if (text(c)) fails.push(`card ${i + 1}: prints "${text(c).slice(0, 30)}" (no word on the body)`);
        });
        if (heavyFloats !== mix.heavyFloats) fails.push(`${heavyFloats} cards where the heavier thing floats ≠ the mix ${mix.heavyFloats}`);
        const nl = (s) => s.filter((x) => x === 'L').length;
        if (nl(fl) * 2 !== fl.length) fails.push(`floater side ${fl.join('')}: left ${nl(fl)} of ${fl.length} (position tell)`);
        if (nl(tl) * 2 !== tl.length) fails.push(`tilt side ${tl.join('')}: left ${nl(tl)} of ${tl.length} (position tell)`);
        if (alt(fl)) fails.push(`floater side ${fl.join('')} is constant / alternating (position tell)`);
        if (alt(tl)) fails.push(`tilt side ${tl.join('')} is constant / alternating (position tell)`);
        if (new Set(nouns).size !== nouns.length) fails.push('a picture repeats');
        return fails;
      }

      if (L === 'shape') {
        const shapes = J('data-lcs-shapes') || {};
        const cards = all('[data-lcs-clay-card]');
        if (cards.map((c) => c.dataset.lcsForm).sort().join() !== 'ball,boat') fails.push('the clay cards are not a ball + a boat');
        const ids = new Set(all('svg[data-lcs-clay]').filter((s) => s.closest('[data-lcs-clay-card]')).map((s) => s.getAttribute('data-lcs-clay')));
        if (ids.size !== 1) fails.push('the clay forms are not the SAME clay (data-lcs-clay differs)');
        cards.forEach((c) => {
          if (c.dataset.lcsResult !== shapes[c.dataset.lcsForm]) fails.push(`the ${c.dataset.lcsForm} card stamps ${c.dataset.lcsResult} ≠ SHAPES`);
          const forms = all('svg[data-lcs-form]', c).map((s) => s.getAttribute('data-lcs-form'));
          if (forms.join() !== 'lump,' + c.dataset.lcsForm) fails.push(`the ${c.dataset.lcsForm} card does not draw lump -> ${c.dataset.lcsForm}`);
          const f = c.querySelector(`svg[data-lcs-form="${c.dataset.lcsForm}"]`); if (f && rect(f).width < 120 - 0.6) fails.push('a clay form under 120 px');
          const t = c.querySelector('svg[data-lcs-tank-mode="rings"]'); if (!t) fails.push('a clay card without its rings tank'); else ringsCheck(t, `${c.dataset.lcsForm} card`);
        });
        const ts = J('data-lcs-transfer-stamp');
        const tc = root.querySelector('[data-lcs-transfer]');
        if (ts) {
          if (!tc) fails.push('no transfer card');
          else {
            const its = all('[data-lcs-transfer-item]', tc);
            const side = its.findIndex((x) => x.dataset.lcsTransferItem === ts.floater) === 0 ? 'L' : 'R';
            if (tc.dataset.lcsFloats !== side || ts.floats !== side) fails.push('the transfer floats stamp ≠ the drawn side');
            const w = (id) => rect(its.find((x) => x.dataset.lcsTransferItem === id).querySelector('img')).width;
            if (!(w(ts.sinker) < w(ts.floater))) fails.push('the bolt is not drawn smaller than the ship');
            if (w(ts.sinker) < FLOOR - 0.6) fails.push('a transfer picture under the floor');
          }
        }
        const dt = root.querySelector('[data-lcs-draw-tank] svg');
        if (!dt || dt.getAttribute('data-lcs-tank-mode') !== 'empty') fails.push('no empty draw tank');
        else if (dt.querySelector('image,text') || root.querySelector('[data-lcs-draw-tank] img')) fails.push('a picture or text in the draw tank');
        if (text(root)) fails.push(`the shape body prints "${text(root).slice(0, 30)}" (no word on the body)`);
        return fails;
      }

      if (L === 'truth') {
        const mix = J('data-lcs-mix') || {}, meta = J('data-lcs-tfmeta') || {};
        const rows = all('[data-lcs-claim-row]');
        const seq = rows.map((r) => r.dataset.lcsTruth);
        if (seq.filter((x) => x === 'T').length !== mix.T || seq.filter((x) => x === 'F').length !== mix.F) fails.push(`T/F ${seq.join('')} ≠ the mix`);
        rows.forEach((r, i) => {
          const m0 = meta[r.dataset.lcsTf];
          if (!m0 || m0.truth !== r.dataset.lcsTruth) fails.push(`row ${i + 1}: truth stamp ≠ the TF table`);
          if (r.querySelector('img,svg')) fails.push(`row ${i + 1}: a picture inside a row (row presence tell)`);
          const chips = all('[data-lcs-truth-chip]', r);
          if (chips.length !== 2) fails.push(`row ${i + 1}: ${chips.length} chips`);
          else { if (chips[0].getAttribute('style') !== chips[1].getAttribute('style')) fails.push(`row ${i + 1}: a chip is pre-marked`); chips.forEach((c) => { if (rect(c).height < 44 - 0.6) fails.push(`row ${i + 1}: chip under 44 px`); }); }
          const tx = r.querySelector('[data-lcs-claim-text]');
          if (!tx || parseFloat(getComputedStyle(tx).fontSize) < 17) fails.push(`row ${i + 1}: claim text under 17 px`);
          else if (rect(tx).height > parseFloat(getComputedStyle(tx).lineHeight) * 2 + 1) fails.push(`row ${i + 1}: claim text over 2 lines`);
        });
        for (const t of ['T', 'F']) { const s0 = Object.values(meta).filter((x) => x.truth === t); if (!s0.some((x) => x.kind === 'spec') || !s0.some((x) => x.kind === 'gen')) fails.push(`the ${t} side lacks a spec or a gen sentence`); }
        if (!Object.values(meta).some((x) => x.misconception)) fails.push('no misconception sentence');
        const objs = Object.values(meta).flatMap((x) => x.objects);
        if (new Set(objs).size !== objs.length) fails.push('an object is named by two rows');
        if (alt(seq)) fails.push(`T/F order ${seq.join('')} is constant / alternating`);
        const h = seq.length / 2; if (seq.join('') === 'T'.repeat(h) + 'F'.repeat(h) || seq.join('') === 'F'.repeat(h) + 'T'.repeat(h)) fails.push(`T/F order ${seq.join('')} is sorted`);
        const shelf = all('[data-lcs-shelf-item]').map((x) => x.dataset.lcsShelfItem).sort().join();
        if (shelf !== [...new Set(objs)].sort().join()) fails.push(`shelf [${shelf}] ≠ the union of the rows' objects [${[...new Set(objs)].sort()}]`);
        all('[data-lcs-shelf] img').forEach((im) => { if (rect(im).width < FLOOR - 0.6) fails.push('a shelf picture under the floor'); });
        return fails;
      }

      if (L === 'draw') {
        const tanks = all('svg[data-lcs-tank-mode]');
        if (tanks.length !== 1 || tanks[0].getAttribute('data-lcs-tank-mode') !== 'spots') { fails.push(`${tanks.length} tanks — the draw face has ONE class tub (two labelled tanks = the G1-204 sort)`); return fails; }
        const t = tanks[0];
        // SPARSE on the INK: the tub's own air band above the glass rim is blank, so measure the rim, not the svg box
        const rim = t.querySelector('[data-lcs-tank-part="glass"]');
        if (rim && rect(rim).top - rect(root).top > 40) fails.push(`SPARSE — a ${(rect(rim).top - rect(root).top).toFixed(0)} px blank band above the tub's rim (> 40)`);
        if (rim && rect(root).bottom - rect(rim).bottom > 40) fails.push(`FILL — the tub ends ${(rect(root).bottom - rect(rim).bottom).toFixed(0)} px above the body bottom (> 40)`);
        const spots = all('[data-lcs-spot]', t);
        const n = +root.dataset.lcsSpots;
        for (const z of ['float', 'sink']) if (spots.filter((s) => s.dataset.lcsSpot === z).length !== n) fails.push(`${z} spots ≠ ${n}`);
        const wl = t.querySelector('[data-lcs-tank-part="waterline"] path'), fl = t.querySelector('[data-lcs-floor-top]');
        const wy = (rect(wl).top + rect(wl).bottom) / 2, fy = (rect(fl).top + rect(fl).bottom) / 2;
        spots.forEach((s) => { const r = rect(s); if (r.width < 150 - 0.6 || r.height < 110 - 0.6) fails.push(`a spot ${r.width.toFixed(0)} x ${r.height.toFixed(0)} < 150 x 110`);
          if (s.dataset.lcsSpot === 'float' && Math.abs((r.top + r.bottom) / 2 - wy) > 2) fails.push('a float spot is not centred on the waterline');
          if (s.dataset.lcsSpot === 'sink' && Math.abs(r.bottom - fy) > 2) fails.push('a sink spot does not rest on the floor'); });
        if (t.querySelector('image,text') || all('img').length) fails.push('a picture on the draw face');
        for (const [k, w] of [['float', root.dataset.lcsFloatWord], ['sink', root.dataset.lcsSinkWord]]) {
          const tag = root.querySelector(`[data-lcs-tag="${k}"]`), word = tag && tag.querySelector('[data-lcs-tag-word]');
          if (!word || word.textContent !== w) { fails.push(`the ${k} tag ≠ its word`); continue; }
          if (parseFloat(getComputedStyle(word).fontSize) < 20) fails.push(`the ${k} tag text under 20 px`);
          if (word.scrollWidth > word.clientWidth + 0.6 || rect(tag).right > rect(t).left + 0.3 * rect(t).width) fails.push(`the ${k} tag is clipped / leaves the tag column`);
          const c = (rect(tag).top + rect(tag).bottom) / 2, icon = tag.querySelector(`svg[data-lcs-pos-icon="${k}"]`);
          if (!icon) fails.push(`the ${k} tag has no ${k} icon`);
          if (k === 'float' && !(c < wy)) fails.push('the float tag is not in the air above the waterline');
          if (k === 'sink' && !(c > wy && c < fy)) fails.push('the sink tag is not in the water above the floor');
        }
        return fails;
      }

      // report
      const secs = all('[data-lcs-section]').map((s) => s.dataset.lcsSection);
      if (secs.join() !== 'question,predict,result,learned') fails.push(`sections [${secs}] out of order`);
      const qs = all('[data-lcs-question]');
      if (qs.map((q) => q.dataset.lcsQuestion).join() !== root.dataset.lcsQuestions) fails.push('question cards ≠ the config');
      all('[data-lcs-tickbox]').forEach((b) => { if (b.textContent.trim() || b.children.length) fails.push('a tick box is pre-marked'); if (rect(b).width < 32 - 0.6) fails.push('a tick box under 32 px'); });
      const rows = all('svg[data-lcs-prim="writing-row"]');
      const starters = all('[data-lcs-starter]');
      if (starters.length !== 1 || !starters[0].closest('[data-lcs-section="learned"]')) fails.push('the starter is not ONE, on the learned rows');
      rows.forEach((r) => { if (r.querySelector('text:not([data-lcs-starter])')) fails.push('a writing row prints text'); });
      if (rows.length < 5) fails.push(`${rows.length} writing rows (< 5)`);
      const glyph = +root.dataset.lcsGlyphH; if (!(glyph >= 24)) fails.push('glyphH under 24');
      const rt = root.querySelector('[data-lcs-section="result"] svg[data-lcs-tank-mode]');
      if (!rt || rt.getAttribute('data-lcs-tank-mode') !== 'empty' || rt.querySelector('circle[data-lcs-slot], image, text')) fails.push('the result tank is not empty');
      if (root.querySelector('[data-lcs-answer="undefined"]')) fails.push('an answer box without an answer (data-lcs-answer="undefined")');
      return fails;
    }, layout, FLOOR[layout]);
    // node cross-check: every printed literal === the bank; every stamped truth === the tables
    const got = await page.evaluate(() => { const r = document.querySelector('[data-lcs-type="sink-or-float"]');
      return { loc: r.dataset.lcsLocale, tf: [...r.querySelectorAll('[data-lcs-claim-row]')].map((x) => [x.dataset.lcsTf, x.dataset.lcsTruth, x.querySelector('[data-lcs-claim-text]').textContent]),
        shelf: [...r.querySelectorAll('[data-lcs-shelf-item]')].map((x) => [x.dataset.lcsShelfItem, x.querySelector('[data-lcs-label]').textContent]),
        tags: [...r.querySelectorAll('[data-lcs-tag-word]')].map((x) => [x.dataset.lcsTagWord, x.textContent]),
        qs: [...r.querySelectorAll('[data-lcs-question]')].map((x) => [x.dataset.lcsQuestion, x.querySelector('[data-lcs-question-text]').textContent]),
        heads: [...r.querySelectorAll('[data-lcs-section]')].map((x) => [x.dataset.lcsSection, x.querySelector('[data-lcs-section-head]').textContent]),
        starter: [...r.querySelectorAll('[data-lcs-starter]')].map((x) => x.textContent), chips: [...r.querySelectorAll('[data-lcs-truth-chip]')].map((x) => [x.dataset.lcsTruthChip, x.textContent]),
        body: r.textContent };
    });
    let b = null;
    try { b = loadBank(BANK, got.loc); } catch (e) { fails.push(`no ${got.loc} bank for the cross-check: ${e.message}`); }
    if (b) {
      for (const [id, truth, text] of got.tf) { if (!NEUTRAL.TF[id] || NEUTRAL.TF[id].truth !== truth) fails.push(`tf ${id}: stamped ${truth} ≠ the TF table`); if (!b.tf || b.tf[id] !== text) fails.push(`tf ${id}: prints "${text}" ≠ tf.${id}`); }
      for (const [id, lab] of got.shelf) if (!b.labels || b.labels[id] !== lab) fails.push(`shelf ${id}: label "${lab}" ≠ labels.${id}`);
      for (const [k, w] of got.tags) if ((k === 'float' ? b.floatWord : b.sinkWord) !== w) fails.push(`tag ${k} "${w}" ≠ the bank`);
      for (const [q, t] of got.qs) if (!b.questions || b.questions[q] !== t) fails.push(`question ${q} "${t}" ≠ the bank`);
      for (const [k, t] of got.heads) if (!b.report || b.report[k] !== t) fails.push(`section head ${k} "${t}" ≠ the bank`);
      for (const s0 of got.starter) if (!b.report || b.report.starter !== s0) fails.push(`starter "${s0}" ≠ the bank`);
      for (const [k, t] of got.chips) if ((k === 'yes' ? b.trueWord : b.falseWord) !== t) fails.push(`chip ${k} "${t}" ≠ the bank`);
      // no outcome word outside the places that must carry one: the F4 tags, the F3 sentences, the F5 QUESTIONS (the cargo
      // question asks "before it sinks"; the report never states whether the orange floats)
      if (layout === 'scale' || layout === 'shape' || layout === 'report') {
        let body = got.body; for (const [, t] of got.qs) body = body.split(t).join(' ');
        for (const w of [b.floatWord, b.sinkWord]) if (w && body.toLocaleLowerCase(got.loc).includes(w.toLocaleLowerCase(got.loc))) fails.push(`the outcome word "${w}" is printed on the ${layout} face`);
      }
    }
    return fails;
  },
};

const TYPE = {
  id: ID,
  slug: 'sink-or-float-experiment',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  difficulty: {
    // d1 deviation: star ON (the one instruction names the star; an instruction naming apparatus the page lacks is the
    // nt10-E defect class) and tank 200x100 / row 130 (the design's 190x95 / 118 leaves the page 80 % full). Never shipped.
    1: { items: 4, mix: { float: 2, sink: 2 }, mustInclude: { bigFloat: 0, smallSink: 0 }, star: true, pic: 72, tank: [200, 100], rowMin: 130, labelPx: 14 },
    2: { items: 6, mix: { float: 3, sink: 3 }, mustInclude: { bigFloat: 1, smallSink: 1 }, star: true, pic: 60, tank: [170, 85], rowMin: 86, labelPx: 14 },
    // d3 deviation (measured): the design's 8 rows at rowMin 66 cannot hold its own 75 px tank, and 8 rows at the 24 px
    // ring floor stack to 72+6+30+6+8x75+7x6 = 756 > 677 — the nearest faithful d3 is 7 rows (4 float / 3 sink). Never shipped.
    3: { items: 7, mix: { float: 4, sink: 3 }, mustInclude: { bigFloat: 2, smallSink: 2 }, star: true, pic: 48, tank: [150, 75], rowMin: 75, labelPx: 14 },
  },
  i18n: {
    en: {
      title: 'Sink or Float Experiment: Predict and Test',
      instruction: 'Color a ring in the first tank before the test, a ring in the second tank after it, and the star if you were surprised.',
    },
  },
  orderOk,
  _buildFace(bankLoc, d, loc, rng) { return FACE.build(bankLoc, d, loc, rng); },

  build({ difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), this.difficulty[difficulty], { locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam). */
  _buildWith(bankLoc, d, { locale }, ctx) {
    if (!d) throw new Error(`${ID}: no difficulty config`);
    const loc = (locale || 'en').slice(0, 2);
    const rng = ctx && ctx.rng;
    if (!rng) throw new Error(`${ID}: no rng in ctx (a seeded page)`);
    if (d.layout) return this._buildFace(bankLoc, d, loc, rng);   // the five faces (Phase E, additive; the base path below is untouched)
    if (Array.isArray(bankLoc && bankLoc.refuse) && bankLoc.refuse.includes('base')) throw new Error(`${ID}: ${loc} refuses the base (bank.refuse)`);
    // guards on the RESOLVED config
    const m = d.mix || {};
    if (!(m.float >= 1 && m.sink >= 1) || m.float + m.sink !== d.items) throw new Error(`${ID}: mix ${JSON.stringify(m)} ≠ items ${d.items}`);
    if (d.items < 4) throw new Error(`${ID}: items ${d.items} < 4 (the order rules need 4)`);
    const must = d.mustInclude || { bigFloat: 0, smallSink: 0 };
    if (must.bigFloat > m.float || must.smallSink > m.sink) throw new Error(`${ID}: mustInclude exceeds the mix`);
    if (!(d.pic >= G1_FLOOR)) throw new Error(`${ID}: pic ${d.pic} < the G1 floor ${G1_FLOOR}`);
    if (!(d.rowMin >= d.tank[1] && d.rowMin >= d.pic + 4 + 18 + 4)) throw new Error(`${ID}: rowMin ${d.rowMin} cannot hold the tank ${d.tank[1]} / the tile`);
    if (!(0.32 * d.tank[1] >= 24)) throw new Error(`${ID}: tank h ${d.tank[1]} gives rings of ${(0.32 * d.tank[1]).toFixed(1)} px (< 24, the colour-in floor)`);
    const cols = C6.sfColumns({ picW: PIC_COL, tankW: d.tank[0], gap: COL_GAP, starW: STAR_COL, star: d.star });
    const width = PIC_COL + 2 * COL_GAP + 2 * d.tank[0] + (d.star ? COL_GAP + STAR_COL : 0);
    if (width > BODY_W) throw new Error(`${ID}: row width ${width} > ${BODY_W}`);
    const stack = LEGEND_H + ROW_GAP + HEADS_H + ROW_GAP + d.items * d.rowMin + (d.items - 1) * ROW_GAP;
    if (stack > 677) throw new Error(`${ID}: stack ${stack} > 677 (the 4-line fi title body)`);
    // words
    const floatWord = literal(bankLoc, 'floatWord', 'bank', loc), sinkWord = literal(bankLoc, 'sinkWord', 'bank', loc);
    if (floatWord.toLocaleLowerCase(loc) === sinkWord.toLocaleLowerCase(loc)) throw new Error(`${ID}: ${loc} floatWord === sinkWord`);
    const heads = {};
    for (const k of ['guess', 'test', 'surprise']) heads[k] = literal(bankLoc.heads, k, 'heads', loc);
    // the pool: CLAIM rows for the base, labelled in this locale
    const labels = bankLoc.labels || {};
    // rule 11 (lead review 2026-09-23): no picture label may equal or contain an apparatus word the instruction names
    const app = Object.values(bankLoc.apparatus || {}).map((w) => String(w).toLocaleLowerCase(loc)).filter(Boolean);
    if (!app.length) throw new Error(`${ID}: ${loc} bank has no apparatus words (refuse)`);
    const pool = NEUTRAL.CLAIMS.filter((c) => c.use.includes('base') && c.testable === true && c.conf === 'high' && c.picOpened === true && (c.result === 'float' || c.result === 'sink') && typeof labels[c.id] === 'string' && labels[c.id].trim());
    for (const c of pool) { const l = labels[c.id].toLocaleLowerCase(loc); const w = app.find((a) => l.includes(a)); if (w) throw new Error(`${ID}: ${loc} label "${labels[c.id]}" (${c.id}) contains the apparatus word "${w}" (refuse)`); }
    const floats = pool.filter((c) => c.result === 'float'), sinks = pool.filter((c) => c.result === 'sink');
    const bigs = floats.filter((c) => c.big), smalls = sinks.filter((c) => c.small);
    if (floats.length < m.float || sinks.length < m.sink || bigs.length < must.bigFloat || smalls.length < must.smallSink) {
      throw new Error(`${ID}: ${loc} base pool (float ${floats.length} / sink ${sinks.length} / big ${bigs.length} / small ${smalls.length}) cannot fill ${JSON.stringify(m)} + ${JSON.stringify(must)} (refuse)`);
    }
    const pickSide = (all, special, k, n) => {
      const sp = rng.shuffle(special.slice()).slice(0, k);
      const rest = rng.shuffle(all.filter((c) => !sp.includes(c))).slice(0, n - k);
      return [...sp, ...rest];
    };
    const chosen = [...pickSide(floats, bigs, must.bigFloat, m.float), ...pickSide(sinks, smalls, must.smallSink, m.sink)];
    if (new Set(chosen.map((c) => c.noun)).size !== chosen.length) throw new Error(`${ID}: a noun repeats`);
    let rows = null;
    for (let t = 0; t < TRIES; t++) { const o = rng.shuffle(chosen.slice()); if (orderOk(o.map((c) => c.result))) { rows = o; break; } }
    if (!rows) throw new Error(`${ID}: no row order passes the order rules in ${TRIES} draws`);
    if (d.forceOrder) rows = d.forceOrder.map((id) => chosen.find((c) => c.id === id) || NEUTRAL.CLAIMS.find((c) => c.id === id));   // the GATE's poison seam — never a shipped config

    const js = (o) => JSON.stringify(o).replace(/'/g, '&#39;');
    // FILL + SPARSE: the rows grow with the body, but never past tank + 34 (the blank band between two rows'
    // tanks stays <= 40 px); d2 reaches the body bottom at the 814 chrome (111.7 px rows < the 119 cap).
    const rowMax = Math.max(d.rowMin, d.tank[1] + 34);
    const claimsStamp = rows.map((c) => ({ id: c.id, theme: c.theme, noun: c.noun, result: c.result, conf: c.conf, testable: c.testable, use: c.use, picOpened: c.picOpened, big: !!c.big, small: !!c.small, label: labels[c.id] }));
    const legend = C6.sfLegend({ floatWord, sinkWord, h: LEGEND_H });
    const headsHtml = C6.sfHeads({ heads, cols, star: d.star, h: HEADS_H });
    const rowHtml = rows.map((c) => C6.sfBetRow({ claim: c, src: fileUri(c.theme, c.noun), label: labels[c.id], cols, pic: d.pic, tank: d.tank, tileH: d.rowMin, tileW: PIC_COL, star: d.star, starPx: STAR_PX }));
    const bodyHtml = `<div data-ws-content data-lcs-type="${KEY}" data-lcs-sof="base" data-lcs-locale="${loc}" data-lcs-mix='${js(m)}' data-lcs-must='${js(must)}' ` +
      `data-lcs-star="${d.star ? 1 : 0}" data-lcs-pic="${d.pic}" data-lcs-tank-size='${js(d.tank)}' data-lcs-row-min="${d.rowMin}" data-lcs-float-word="${floatWord.replace(/"/g, '&quot;')}" data-lcs-sink-word="${sinkWord.replace(/"/g, '&quot;')}" data-lcs-claims='${js(claimsStamp)}' ` +
      `style="flex:1;min-height:0;display:grid;grid-template-rows:${LEGEND_H}px ${HEADS_H}px repeat(${d.items},minmax(${d.rowMin}px,${rowMax}px));row-gap:${ROW_GAP}px;align-content:start">` +
      legend + headsHtml + rowHtml.join('') + '</div>';
    return { bodyHtml, meta: { items: rows.map((c) => c.id), results: rows.map((c) => c.result) } };
  },

  /** verify(): re-derives the whole page from the stamps + the rendered geometry. */
  async verify(page) {
    const layout = await page.evaluate(() => { const r = document.querySelector('[data-ws-content][data-lcs-type="sink-or-float"]'); return r ? r.getAttribute('data-lcs-layout') : null; });
    if (layout) return FACE.verify(page, layout);
    const fails = await page.evaluate((LEGEND_H) => {
      const fails = [];
      const root = document.querySelector('[data-ws-content][data-lcs-type="sink-or-float"]');
      if (!root) return ['no sink-or-float root'];
      const rect = (el) => el.getBoundingClientRect();
      const all = (s, r) => [...(r || root).querySelectorAll(s)];
      const J = (k) => { try { return JSON.parse(root.getAttribute(k) || 'null'); } catch (e) { fails.push(`${k} is not JSON`); return null; } };
      const mix = J('data-lcs-mix') || {}, must = J('data-lcs-must') || {}, claims = J('data-lcs-claims') || [];
      const star = root.dataset.lcsStar === '1', pic = +root.dataset.lcsPic;
      const rows = all('[data-lcs-row]');
      const n = (mix.float || 0) + (mix.sink || 0);
      if (rows.length !== n) fails.push(`${rows.length} rows ≠ the mix ${n}`);
      const seq = rows.map((r) => r.dataset.lcsResult);
      if (seq.filter((x) => x === 'float').length !== mix.float || seq.filter((x) => x === 'sink').length !== mix.sink) fails.push(`result multiset ${seq.join(',')} ≠ the mix ${JSON.stringify(mix)}`);
      const byId = Object.fromEntries(claims.map((c) => [c.id, c]));
      const nouns = rows.map((r) => r.dataset.lcsItem);
      if (new Set(nouns).size !== nouns.length) fails.push('a picture repeats');
      let big = 0, small = 0;
      rows.forEach((r, i) => {
        const c = byId[r.dataset.lcsClaim];
        if (!c) { fails.push(`row ${i + 1}: claim ${r.dataset.lcsClaim} not in the claims stamp`); return; }
        if (c.theme + '/' + c.noun !== r.dataset.lcsItem) fails.push(`row ${i + 1}: item ${r.dataset.lcsItem} ≠ its claim ${c.theme}/${c.noun}`);
        if (c.result !== r.dataset.lcsResult) fails.push(`row ${i + 1}: result stamp ${r.dataset.lcsResult} ≠ the claim ${c.result}`);
        if (c.conf !== 'high' || c.testable !== true || !c.use.includes('base') || c.picOpened !== true) fails.push(`row ${i + 1}: ${c.id} is not a high / testable / base / opened claim`);
        if (c.big && c.result === 'float') big++;
        if (c.small && c.result === 'sink') small++;
        const lab = r.querySelector('[data-lcs-label]');
        if (!lab || lab.textContent !== c.label) fails.push(`row ${i + 1}: label "${lab && lab.textContent}" ≠ "${c.label}"`);
        else {
          if (lab.scrollWidth > lab.clientWidth + 0.6) fails.push(`row ${i + 1}: label "${c.label}" is clipped`);
          if (rect(lab).height > parseFloat(getComputedStyle(lab).fontSize) * 1.6) fails.push(`row ${i + 1}: label "${c.label}" wraps`);
          if (parseFloat(getComputedStyle(lab).fontSize) < 14) fails.push(`row ${i + 1}: label under 14 px`);
        }
        const im = r.querySelector('img[data-lcs-pic]');
        if (!im || !im.complete || !im.naturalWidth) fails.push(`row ${i + 1}: the picture did not load`);
        else if (rect(im).width < pic - 0.6 || rect(im).width < 44) fails.push(`row ${i + 1}: picture ${rect(im).width.toFixed(0)} px < ${pic} (G1 floor 44)`);
        // the two tanks: guess then test, rings mode, two identical EMPTY rings each
        const tanks = all('svg[data-lcs-tank-mode]', r);
        if (tanks.map((t) => t.getAttribute('data-lcs-tank')).join() !== 'guess,test') fails.push(`row ${i + 1}: tanks [${tanks.map((t) => t.getAttribute('data-lcs-tank'))}] ≠ guess,test`);
        if (tanks.length === 2 && rect(tanks[0]).left >= rect(tanks[1]).left) fails.push(`row ${i + 1}: the guess tank is not left of the test tank`);
        tanks.forEach((t) => {
          if (t.getAttribute('data-lcs-tank-mode') !== 'rings') fails.push(`row ${i + 1}: a tank is not a rings tank`);
          if (t.textContent.trim() || t.querySelector('text,image')) fails.push(`row ${i + 1}: text or a picture inside a tank`);
          const rs = all('circle[data-lcs-slot]', t);
          if (rs.map((x) => x.dataset.lcsSlot).sort().join() !== 'floor,top') fails.push(`row ${i + 1}: a tank without its top + floor rings`);
          const sig = (x) => ['r', 'fill', 'stroke', 'stroke-width', 'stroke-dasharray'].map((a) => x.getAttribute(a)).join('|');
          if (rs.length === 2 && sig(rs[0]) !== sig(rs[1])) fails.push(`row ${i + 1}: the two rings differ (${sig(rs[0])} vs ${sig(rs[1])}) — a pre-marked ring`);
          // lead review 2026-09-23 — measured on the RENDER: the float ring straddles the waterline (centre on its mean y),
          // the sink ring rests ON the gravel line (bottom <= 2 px above it, <= 1.5 px into it)
          const wl = t.querySelector('[data-lcs-tank-part="waterline"] path'), fl = t.querySelector('[data-lcs-floor-top]');
          const tp = rs.find((x) => x.dataset.lcsSlot === 'top'), fr = rs.find((x) => x.dataset.lcsSlot === 'floor');
          if (wl && fl && tp && fr) {
            const w0 = rect(wl), wy = (w0.top + w0.bottom) / 2, fy = (rect(fl).top + rect(fl).bottom) / 2, a = rect(tp), b = rect(fr);
            if (Math.abs((a.top + a.bottom) / 2 - wy) > 1) fails.push(`row ${i + 1}: the float ring is not centred on the waterline (${((a.top + a.bottom) / 2 - wy).toFixed(1)} px)`);
            if (b.bottom < fy - 2 || b.bottom > fy + 1.5) fails.push(`row ${i + 1}: the sink ring does not rest on the floor (bottom ${(b.bottom - fy).toFixed(1)} px from the gravel line)`);
          } else fails.push(`row ${i + 1}: a tank lacks its waterline / floor line / rings`);
          rs.forEach((x) => { if ((x.getAttribute('fill') || '').toUpperCase() !== '#FFFFFF') fails.push(`row ${i + 1}: a ring is pre-filled (${x.getAttribute('fill')}) — answer printed`); if (rect(x).width < 24 - 0.6) fails.push(`row ${i + 1}: ring ${rect(x).width.toFixed(1)} px < 24`); });
        });
        const st = r.querySelector('svg[data-lcs-star]');
        if (star !== !!st) fails.push(`row ${i + 1}: star ${!!st} on a star:${star} page`);
        if (st) { const pg = st.querySelector('polygon'); if (!pg || (pg.getAttribute('fill') || '').toUpperCase() !== '#FFFFFF') fails.push(`row ${i + 1}: the star is pre-filled`); if (rect(st).width < 40 - 0.6) fails.push(`row ${i + 1}: star under 40 px`); }
        // no outcome printed in the row (only the picture's label is text)
        const clone = r.cloneNode(true); clone.querySelectorAll('[data-lcs-label]').forEach((e) => e.remove());
        if (clone.textContent.trim()) fails.push(`row ${i + 1}: prints "${clone.textContent.trim().slice(0, 30)}" — outcome printed`);
        if (r.getAttribute('style') && /background/.test(r.getAttribute('style'))) fails.push(`row ${i + 1}: a tinted row`);
      });
      if (big < (must.bigFloat || 0)) fails.push(`${big} big floaters < mustInclude ${must.bigFloat}`);
      if (small < (must.smallSink || 0)) fails.push(`${small} small sinkers < mustInclude ${must.smallSink}`);
      // the three order rules
      for (let i = 2; i < seq.length; i++) if (seq[i] === seq[i - 1] && seq[i] === seq[i - 2]) { fails.push(`order ${seq.join(',')}: three ${seq[i]} in a row (order rule)`); break; }
      if (seq.length > 1 && seq.every((x, i) => i === 0 || x !== seq[i - 1])) fails.push(`order ${seq.join(',')}: strictly alternating (order rule)`);
      if (seq.lastIndexOf('float') < seq.indexOf('sink') || seq.lastIndexOf('sink') < seq.indexOf('float')) fails.push(`order ${seq.join(',')}: one outcome entirely before the other (order rule)`);
      // the legend: the ONLY float / sink words on the page, each once; its pebbles in the ring positions
      const lg = root.querySelector('[data-lcs-sof-legend]');
      const fw = root.dataset.lcsFloatWord, sw = root.dataset.lcsSinkWord;
      if (!lg) fails.push('no legend');
      else {
        if (Math.abs(rect(lg).height - LEGEND_H) > 0.6) fails.push(`legend ${rect(lg).height.toFixed(0)} px ≠ ${LEGEND_H}`);
        const w1 = lg.querySelector('[data-lcs-legend-word="float"]'), w2 = lg.querySelector('[data-lcs-legend-word="sink"]');
        if (!w1 || w1.textContent !== fw || !w2 || w2.textContent !== sw) fails.push('legend words ≠ floatWord / sinkWord');
        [w1, w2].forEach((w) => { if (w && (w.scrollWidth > w.clientWidth + 0.6 || rect(w).right > rect(lg).right || rect(w).left < rect(lg).left)) fails.push(`legend word "${w.textContent}" clipped / outside the legend`); if (w && parseFloat(getComputedStyle(w).fontSize) < 18) fails.push('legend word under 18 px'); });
        if (!lg.querySelector('svg[data-lcs-tank-mode="legend-float"]') || !lg.querySelector('svg[data-lcs-tank-mode="legend-sink"]')) fails.push('legend lacks its float / sink tanks');
      }
      const txt = root.textContent;
      const count = (w) => txt.split(w).length - 1;
      if (fw && count(fw) !== 1) fails.push(`the float word "${fw}" appears ${count(fw)} times (the legend only) — outcome printed`);
      if (sw && count(sw) !== 1) fails.push(`the sink word "${sw}" appears ${count(sw)} times (the legend only) — outcome printed`);
      // heads
      const hs = all('[data-lcs-head-text]');
      if (hs.length !== (star ? 3 : 2)) fails.push(`${hs.length} heads ≠ ${star ? 3 : 2}`);
      for (let a = 0; a < hs.length; a++) for (let b = a + 1; b < hs.length; b++) { const p = rect(hs[a]), q = rect(hs[b]); if (p.right > q.left - 2 && q.right > p.left - 2) fails.push(`heads "${hs[a].textContent}" and "${hs[b].textContent}" collide`); }
      hs.forEach((h) => { const r = rect(h); if (r.left < rect(root).left || r.right > rect(root).right) fails.push(`head "${h.textContent}" leaves the body`); });
      // page-level: nothing past the footer, no overflow, SPARSE
      const foot = document.querySelector('.ws-foot');
      const low = Math.max(0, ...all('*').map((e) => rect(e).bottom));
      if (foot && low > rect(foot).top + 0.6) fails.push(`content reaches the footer (${low.toFixed(0)} > ${rect(foot).top.toFixed(0)})`);
      if (root.scrollWidth > root.clientWidth + 0.6) fails.push('the body overflows horizontally');
      const iv = all('[data-lcs-block]').map((e) => { const r = rect(e); const inner = [...e.querySelectorAll('svg,img,span')].map(rect); const top = inner.length ? Math.min(...inner.map((x) => x.top)) : r.top; const bot = inner.length ? Math.max(...inner.map((x) => x.bottom)) : r.bottom; return [top, bot]; }).sort((a, b) => a[0] - b[0]);
      let edge = rect(root).top, gap = 0;
      for (const [t, b] of iv) { if (t - edge > gap) gap = t - edge; if (b > edge) edge = b; }
      if (gap > 40) fails.push(`SPARSE — a ${gap.toFixed(0)} px blank band between content blocks (> 40)`);
      return fails;
    }, LEGEND_H);
    // node cross-check: every stamped claim === the CLAIM table + the bank's label
    const got = await page.evaluate(() => { const r = document.querySelector('[data-lcs-type="sink-or-float"]'); return r ? { loc: r.dataset.lcsLocale, claims: JSON.parse(r.dataset.lcsClaims || '[]'), fw: r.dataset.lcsFloatWord, sw: r.dataset.lcsSinkWord } : null; });
    if (got) {
      let b = null;
      try { b = loadBank(BANK, got.loc); } catch (e) { fails.push(`no ${got.loc} bank for the cross-check: ${e.message}`); }
      for (const c of got.claims) {
        const t = NEUTRAL.CLAIMS.find((x) => x.id === c.id);
        if (!t) { fails.push(`claim ${c.id} is not in the CLAIM table`); continue; }
        for (const k of ['theme', 'noun', 'result', 'conf', 'testable', 'picOpened']) if (t[k] !== c[k]) fails.push(`claim ${c.id}.${k} stamped ${c[k]} ≠ the table ${t[k]}`);
        if (!t.use.includes('base')) fails.push(`claim ${c.id} is not a base row`);
        if (b && (!b.labels || b.labels[c.id] !== c.label)) fails.push(`claim ${c.id} label "${c.label}" ≠ labels.${c.id} "${b.labels && b.labels[c.id]}"`);
      }
      if (b && (b.floatWord !== got.fw || b.sinkWord !== got.sw)) fails.push('the legend words ≠ the bank');
    }
    return fails;
  },
};

module.exports = TYPE;
