/**
 * K-323 — All About Me (nt20-C; family key `all-about-me`, K, W.K.2 + SL.K.5).
 * Design: docs/worksheet-gen/b3-designs/K-323-all-about-me.md §2/§5.
 *
 * A framed poster the child takes home: a full-width name banner (a writing
 * lane, glyphH 40), a 300 px portrait frame with photo corners, an age lane
 * with ONE open numeral box inside the literal (`I am [ ] years old`), a
 * family drawing box and three favourite windows (heading + draw zone).
 * Every field is a LABELLED EMPTY SLOT; nothing printed answers anything;
 * drawing comes before writing. NOT the G2-318 fact table (a G2 register).
 *
 * THEMELESS (`themeAxis:{applicable:false}`): the base draws NO pictures
 * (draw only — the picture pools are F1/F3/F4, Phase 2); the enumerator emits
 * one instance per (type, difficulty, locale). No unit axis in this batch.
 * The base is SEEDLESS: build() never touches the rng, so every seed renders
 * byte-identical (the gate's sweep asserts it).
 *
 * Every printed string is a whole panel literal from data/b3/all-about-me.js
 * (lib/b3-common.js bank — a missing locale block THROWS, never an en
 * fallback); a literal that is missing, carries a `{` slot or a digit is a
 * REFUSAL, never padded. Never image-vocabulary.js at render.
 *
 * Difficulty is a CONFIG; every guard keys on the RESOLVED keys (favourites /
 * sentenceLane / box / portrait / glyphH …), never on the level index:
 *   d1  name · age · portrait · family (glyphH 48, banner 96, portrait 330 —
 *       the frame STRETCHES down the row, see the build record)
 *   d2  + three favourite windows (animal · food · colour)          (ships)
 *   d3  + a toy window (4 x 160) + a `school` sentence lane; portrait 288
 *
 * Chrome budget (README ruling): body 722 with 3-line title + 3-line
 * instruction; the K-319 build measured 700 under a 4-line fi title. Rows
 * `<banner>px <portrait>px minmax(<favMin>px,1fr) [84px]`, gap 12: d2 stack
 * 84 + 12 + 300 + 12 + 220 = 628, d3 84 + 12 + 288 + 12 + 196 + 12 + 84 = 688;
 * the slack opens in the favourites row (inside the draw zones), never in
 * the lanes or the portrait.
 *
 * Answer hiding + stamps: structural only — one empty [data-lcs-name] lane,
 * one empty [data-lcs-age] box (K-320's blankNumeralBox: `data-lcs-answer=""`,
 * never `answerBox`, whose missing answer prints "undefined"), N empty
 * [data-lcs-drawbox], the headings as bank literals (the gate cross-checks
 * them in node), no digit, no <img>, no `{` in the body. `data-lcs-face` is
 * NOT stamped (the base stays byte-identical when the faces land).
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { profileCard } = require('../../templates/components-b3.js');

const BANK = 'all-about-me';
const K_FLOOR = 56;         // tokens.density.K.minElement — an element the child marks or writes in
const BODY_W = 675;
const PAIR_GAP = 15;
const BANNER_LABEL_CAP = 191;   // 643 inner − 12 − 440 lane (design §2; fi `Minun nimeni on` 156.6 at 20)

function literal(labels, pathStr, loc) {
  const v = pathStr.split('.').reduce((o, k) => (o == null ? undefined : o[k]), labels);
  if (typeof v !== 'string' || !v.trim()) throw new Error(`K-323: ${loc} has no literal labels.${pathStr} (refuse, never pad)`);
  if (v.includes('{')) throw new Error(`K-323: ${loc} labels.${pathStr} carries a slot "${v}" (whole literals only)`);
  if (/\d/.test(v)) throw new Error(`K-323: ${loc} labels.${pathStr} prints a digit "${v}"`);
  return v;
}

module.exports = {
  id: 'K-323',
  slug: 'all-about-me',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'all-about-me',
  themeAxis: { applicable: false },
  difficulty: {
    1: { favourites: null, sentenceLane: null, glyphH: 48, bannerH: 96, laneW: 440, portrait: 330, portraitStretch: true, ageH: 96, box: 72, familyMin: 222, favW: 0, favH: 0, favMin: 0, labelPx: 20, headingPx: 18, rows: '96px minmax(330px,1fr)' },
    2: { favourites: ['animal', 'food', 'color'], sentenceLane: null, glyphH: 40, bannerH: 84, laneW: 440, portrait: 300, portraitStretch: false, ageH: 84, box: 64, familyMin: 204, favW: 217, favH: 220, favMin: 220, labelPx: 20, headingPx: 18, rows: '84px 300px minmax(220px,1fr)' },
    3: { favourites: ['animal', 'food', 'color', 'toy'], sentenceLane: 'school', sentenceLaneW: 400, glyphH: 40, bannerH: 84, laneW: 440, portrait: 288, portraitStretch: false, ageH: 84, box: 64, familyMin: 192, favW: 160, favH: 220, favMin: 196, labelPx: 20, headingPx: 18, rows: '84px 288px minmax(196px,1fr) 84px' },
  },
  i18n: {
    en: {
      title: 'All About Me',
      instruction: 'Write your name and your age, draw yourself and your family, then draw your three favorite things.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), this.difficulty[difficulty], { theme, locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(bankLoc, d, { locale }) {
    if (!d) throw new Error('K-323: no difficulty config');
    const loc = (locale || 'en').slice(0, 2);
    const L = bankLoc && bankLoc.labels;
    if (!L) throw new Error(`K-323: ${loc} bank has no labels block (refuse)`);
    // guards on the RESOLVED config
    if (d.box < K_FLOOR) throw new Error(`K-323: numeral box ${d.box} < the K floor ${K_FLOOR}`);
    if (d.glyphH < 32) throw new Error(`K-323: glyphH ${d.glyphH} < 32 (a K writing lane)`);
    if (d.bannerH - 20 < d.glyphH + 8) throw new Error(`K-323: banner ${d.bannerH} cannot hold a glyphH ${d.glyphH} lane`);
    if (d.ageH - 20 < d.box) throw new Error(`K-323: age lane ${d.ageH} cannot hold a ${d.box} box`);
    if (d.portrait < 240) throw new Error(`K-323: portrait ${d.portrait} < 240 (a crayon-sized frame)`);
    const colW = BODY_W - d.portrait - PAIR_GAP;
    if (colW < 249 + 36) throw new Error(`K-323: age column ${colW} cannot hold the widest age row 249 + padding`);
    if (d.favourites) {
      if (d.favourites.length < 2) throw new Error('K-323: a favourites row needs >= 2 windows');
      if (new Set(d.favourites).size !== d.favourites.length) throw new Error('K-323: a favourite category repeats');
      const rowW = d.favourites.length * d.favW + (d.favourites.length - 1) * 12;
      if (rowW > BODY_W + 1) throw new Error(`K-323: favourites row ${rowW} > body ${BODY_W}`);
      if (d.favW - 28 < 120) throw new Error(`K-323: favourite window ${d.favW} leaves a heading column < 120`);
      if (!(d.favMin >= 4 + 46 + 20 + 100 && d.favMin <= d.favH)) throw new Error(`K-323: favourites row floor ${d.favMin} outside [170, ${d.favH}]`);
    }
    const age = L.age || {};
    const glue = age.glue === true;
    const post = literal(L, 'age.post', loc);
    if (glue && !/^-/.test(post)) throw new Error(`K-323: ${loc} age.glue is true but age.post "${post}" does not start with "-"`);
    if (!glue && age.glue !== false) throw new Error(`K-323: ${loc} age.glue must be true or false`);

    const favourites = d.favourites
      ? d.favourites.map((key) => ({ key, heading: literal(L, 'favHeading.' + key, loc), w: d.favW, h: d.favH, minH: d.favMin, headingPx: d.headingPx }))
      : null;
    const sentence = d.sentenceLane
      ? { key: d.sentenceLane, label: literal(L, d.sentenceLane, loc), laneW: d.sentenceLaneW || 400, glyphH: d.glyphH }
      : null;

    const bodyHtml = profileCard({
      rows: d.rows,
      banner: { label: literal(L, 'nameIs', loc), laneW: d.laneW, glyphH: d.glyphH, h: d.bannerH, labelPx: d.labelPx },
      portrait: { size: d.portrait, stretch: !!d.portraitStretch, label: literal(L, 'thisIsMe', loc) },
      age: { pre: literal(L, 'age.pre', loc), post, glue, box: d.box, h: d.ageH, labelPx: d.labelPx },
      family: { label: literal(L, 'family', loc), h: d.familyMin },
      favourites,
      sentence,
      stamps: `data-lcs-locale="${loc}" data-lcs-label-px="${d.labelPx}" data-lcs-heading-px="${d.headingPx}" data-lcs-glyph-h="${d.glyphH}" data-lcs-banner-cap="${BANNER_LABEL_CAP}"`,
    });
    return { bodyHtml, meta: { favourites: d.favourites || [], sentence: d.sentenceLane || null, portrait: d.portrait, box: d.box, glyphH: d.glyphH } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-ws-content][data-lcs-type="all-about-me"]');
      if (!root) return ['no all-about-me root'];
      const body = document.querySelector('[data-lcs-body]');
      const K = 56;
      const rect = (el) => el.getBoundingClientRect();
      const text = (root.textContent || '');
      // 1. nothing printed answers anything: no digit, no picture, no slot, no answer value
      if (/\d/.test(text)) fails.push('a digit is printed in the body');
      if (text.includes('{')) fails.push('a `{` slot is printed in the body');
      if (root.querySelector('img')) fails.push('the base prints a picture (draw only)');
      root.querySelectorAll('[data-lcs-answer]').forEach((el) => {
        if (el.getAttribute('data-lcs-answer') !== '') fails.push(`an answer value "${el.getAttribute('data-lcs-answer')}" is stamped on an open box`);
      });
      if (root.querySelector('.ws-answerbox')) fails.push('an answerBox (.ws-answerbox, grid dashes) on an open page');
      if (root.hasAttribute('data-lcs-face')) fails.push('data-lcs-face is stamped on the base');
      // 2. the name lane: exactly one, empty, a writing row inside, at least the K floor high
      const names = root.querySelectorAll('[data-lcs-name]');
      if (names.length !== 1) fails.push(`${names.length} name lanes, want 1`);
      names.forEach((n) => {
        if (n.textContent.trim()) fails.push(`the name lane prints "${n.textContent.trim().slice(0, 16)}"`);
        if (!n.querySelector('svg[data-lcs-prim="writing-row"]')) fails.push('the name lane has no writing row');
        if (n.querySelector('text')) fails.push('the name lane carries SVG text (a model word)');
        if (rect(n).height < K) fails.push(`name lane ${Math.round(rect(n).height)} px < the K floor ${K}`);
        if (Math.abs(rect(n).width - (+n.dataset.lcsLaneW)) > 1) fails.push(`name lane width ${Math.round(rect(n).width)} ≠ stamp ${n.dataset.lcsLaneW}`);
      });
      // 3. the age box: exactly one, empty, >= the K floor on both sides, inside the age lane
      const ages = root.querySelectorAll('[data-lcs-age]');
      if (ages.length !== 1) fails.push(`${ages.length} age boxes, want 1`);
      ages.forEach((a) => {
        if (a.textContent.trim()) fails.push('the age box is not empty');
        if (!a.classList.contains('ws-blankbox')) fails.push('the age box is not a .ws-blankbox');
        const r = rect(a);
        if (Math.min(r.width, r.height) < K) fails.push(`age box ${Math.round(r.width)}×${Math.round(r.height)} < the K floor ${K}`);
        if (Math.abs(r.width - (+root.dataset.lcsBox)) > 1) fails.push(`age box ${Math.round(r.width)} ≠ config ${root.dataset.lcsBox}`);
        const lane = a.closest('[data-lcs-agelane]');
        if (!lane) fails.push('the age box is not inside the age lane');
        else {
          const lr = rect(lane);
          const inner = lr.width - 36;   // inline padding 8 16 + border 2
          const pre = lane.querySelector('[data-lcs-label-key="agePre"]'), post = lane.querySelector('[data-lcs-label-key="agePost"]');
          if (!pre || !pre.textContent.trim()) fails.push('age lane: no pre literal');
          if (!post || !post.textContent.trim()) fails.push('age lane: no post literal');
          const kids = [...lane.children];
          const rowW = kids.reduce((s, k) => s + rect(k).width, 0);
          if (rowW > inner + 0.6) fails.push(`age row ${Math.round(rowW)} px wider than the lane inner ${Math.round(inner)}`);
          const glue = lane.dataset.lcsGlue === '1';
          if (glue !== (root.dataset.lcsGlue === '1')) fails.push('glue stamp disagrees between lane and root');
          if (post) {
            const gap = rect(post).left - rect(a).right;
            if (glue && gap > 0.6) fails.push(`glue: the suffix sits ${Math.round(gap)} px off the box`);
            if (!glue && gap < 9) fails.push(`the post literal sits ${Math.round(gap)} px from the box (want 10)`);
            if (glue && !/^-/.test(post.textContent.trim())) fails.push('glue without a leading hyphen on the suffix');
          }
          if (pre && rect(pre).right > rect(a).left) fails.push('the pre literal overlaps the age box');
        }
      });
      // 4. drawing zones: the stamped count, every one empty (no picture, no text but its own label)
      const boxes = [...root.querySelectorAll('[data-lcs-drawbox]')];
      const want = +root.dataset.lcsDrawboxes;
      if (boxes.length !== want) fails.push(`${boxes.length} drawing zones, stamp ${want}`);
      const keys = boxes.map((b) => b.dataset.lcsDrawbox);
      if (new Set(keys).size !== keys.length) fails.push('a drawing-zone key repeats');
      for (const k of ['portrait', 'family']) if (!keys.includes(k)) fails.push(`no ${k} drawing zone`);
      boxes.forEach((b) => {
        const own = [...b.querySelectorAll('[data-lcs-label-key]')].map((l) => l.textContent).join('');
        const rest = b.textContent.replace(own, '').trim();
        if (rest) fails.push(`drawing zone ${b.dataset.lcsDrawbox} prints "${rest.slice(0, 16)}"`);
        if (b.querySelector('img, text')) fails.push(`drawing zone ${b.dataset.lcsDrawbox} carries a picture or SVG text`);
        const r = rect(b);
        if (r.width < 100 || r.height < 100) fails.push(`drawing zone ${b.dataset.lcsDrawbox} ${Math.round(r.width)}×${Math.round(r.height)} < 100`);
      });
      // 5. favourites: N windows === stamp, keys distinct, each heading a non-empty literal on <= 2 lines inside its band
      const favN = +root.dataset.lcsFavouriteN;
      const wins = [...root.querySelectorAll('[data-lcs-favourite]')];
      if (wins.length !== favN) fails.push(`${wins.length} favourite windows, stamp ${favN}`);
      const favKeys = wins.map((w) => w.dataset.lcsFavourite);
      if (new Set(favKeys).size !== favKeys.length) fails.push('a favourite category repeats');
      const hpx = +root.dataset.lcsHeadingPx;
      wins.forEach((w) => {
        const h = w.querySelector('[data-lcs-heading]');
        if (!h || !h.textContent.trim()) { fails.push(`favourite ${w.dataset.lcsFavourite}: no heading`); return; }
        const hr = rect(h);
        if (hr.height > 2 * 20 + 0.6) fails.push(`favourite ${w.dataset.lcsFavourite}: heading "${h.textContent.trim()}" runs ${Math.round(hr.height)} px (> 2 lines)`);
        if (parseFloat(getComputedStyle(h).fontSize) !== hpx) fails.push(`favourite ${w.dataset.lcsFavourite}: heading ${getComputedStyle(h).fontSize} ≠ ${hpx}px`);
        const band = h.parentElement, br = rect(band);
        if (hr.right > br.right + 0.6 || hr.left < br.left - 0.6 || hr.bottom > br.bottom + 0.6) fails.push(`favourite ${w.dataset.lcsFavourite}: heading leaves its band`);
        if (h.scrollWidth > h.clientWidth + 0.6) fails.push(`favourite ${w.dataset.lcsFavourite}: a heading word is clipped`);
        if (!keys.includes('fav-' + w.dataset.lcsFavourite)) fails.push(`favourite ${w.dataset.lcsFavourite}: no draw zone`);
        const wr = rect(w);
        if (wr.width < 120) fails.push(`favourite ${w.dataset.lcsFavourite}: window ${Math.round(wr.width)} < 120`);
      });
      // 6. every literal is printed whole (no clipping) at its configured size
      const lpx = +root.dataset.lcsLabelPx, cap = +root.dataset.lcsBannerCap;
      root.querySelectorAll('[data-lcs-label-key]').forEach((l) => {
        if (l.scrollWidth > l.clientWidth + 0.6) fails.push(`label ${l.dataset.lcsLabelKey} "${l.textContent.trim()}" is clipped (${l.scrollWidth} > ${l.clientWidth})`);
        if (!l.textContent.trim()) fails.push(`label ${l.dataset.lcsLabelKey} is empty`);
        const fs = parseFloat(getComputedStyle(l).fontSize);
        if (fs < 14) fails.push(`label ${l.dataset.lcsLabelKey} at ${fs}px < 14`);
      });
      const nameIs = root.querySelector('[data-lcs-label-key="nameIs"]');
      if (nameIs) {
        if (parseFloat(getComputedStyle(nameIs).fontSize) !== lpx) fails.push(`banner label ${getComputedStyle(nameIs).fontSize} ≠ ${lpx}px`);
        if (nameIs.scrollWidth > cap + 0.6) fails.push(`banner label "${nameIs.textContent.trim()}" ${nameIs.scrollWidth} px > cap ${cap}`);
      }
      // 7. the sentence lane (d3): stamped key ⇔ one empty lane with a writing row
      const sKey = root.dataset.lcsSentenceKey || '';
      const lanes = [...root.querySelectorAll('[data-lcs-sentence]')];
      if (sKey && lanes.length !== 1) fails.push(`sentence lane ${sKey} stamped but ${lanes.length} lanes rendered`);
      if (!sKey && lanes.length) fails.push('a sentence lane without a stamp');
      lanes.forEach((ln) => {
        const w = ln.querySelector('[data-lcs-lane]');
        if (!w || w.textContent.trim() || !w.querySelector('svg[data-lcs-prim="writing-row"]')) fails.push('sentence lane: no empty writing row');
        if (!ln.querySelector('[data-lcs-label-key]') || !ln.querySelector('[data-lcs-label-key]').textContent.trim()) fails.push('sentence lane: no literal');
      });
      // 8. everything inside the body column; the portrait is square unless stretched
      const br = rect(body);
      root.querySelectorAll('[data-lcs-banner],[data-lcs-portrait],[data-lcs-agelane],[data-lcs-drawbox],[data-lcs-favourite],[data-lcs-sentence]').forEach((el) => {
        const r = rect(el);
        if (r.left < br.left - 0.6 || r.right > br.right + 0.6 || r.top < br.top - 0.6 || r.bottom > br.bottom + 0.6) fails.push(`<${el.tagName.toLowerCase()} ${Object.keys(el.dataset)[0]}> leaves the body column`);
      });
      // 9. no two frames overlap (a squeezed row must never spill into the row below)
      const frames = [...root.querySelectorAll('[data-lcs-banner],[data-lcs-portrait],[data-lcs-agelane],[data-lcs-drawbox="family"],[data-lcs-favourite],[data-lcs-sentence]')].map((el) => ({ el, r: rect(el) }));
      for (let i = 0; i < frames.length; i++) for (let j = i + 1; j < frames.length; j++) {
        const a = frames[i].r, b = frames[j].r;
        if (frames[i].el.contains(frames[j].el) || frames[j].el.contains(frames[i].el)) continue;
        const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (ox > 0.6 && oy > 0.6) fails.push(`frames overlap: ${Object.keys(frames[i].el.dataset)[0]} and ${Object.keys(frames[j].el.dataset)[0]} by ${Math.round(oy)} px`);
      }
      // 9b. every frame stays inside its own grid row (a squeezed row must not eat the gap to the row below)
      root.querySelectorAll('[data-lcs-favourite],[data-lcs-portrait],[data-lcs-agelane],[data-lcs-drawbox="family"]').forEach((el) => {
        const row = el.closest('[data-lcs-favourites],[data-lcs-pair]');
        if (!row) { fails.push(`${Object.keys(el.dataset)[0]} sits outside a grid row`); return; }
        const r = rect(el), rr = rect(row);
        if (r.bottom > rr.bottom + 0.6 || r.top < rr.top - 0.6) fails.push(`${Object.keys(el.dataset)[0]} ${el.dataset.lcsFavourite || ''} spills ${Math.round(Math.max(r.bottom - rr.bottom, rr.top - r.top))} px outside its row`);
      });
      const portrait = root.querySelector('[data-lcs-portrait]');
      if (portrait) {
        const pr = rect(portrait), size = +root.dataset.lcsPortraitSize;
        if (Math.abs(pr.width - size) > 1) fails.push(`portrait ${Math.round(pr.width)} wide ≠ ${size}`);
        if (portrait.dataset.lcsStretch !== '1' && Math.abs(pr.height - size) > 1) fails.push(`portrait ${Math.round(pr.height)} high ≠ ${size}`);
        if (pr.height < size - 0.6) fails.push(`portrait ${Math.round(pr.height)} high < ${size}`);
        const corners = portrait.querySelectorAll('[data-lcs-corner]');
        if (corners.length !== 4) fails.push(`portrait has ${corners.length} photo corners, want 4`);
        const zone = portrait.querySelector('[data-lcs-drawbox="portrait"]');
        if (zone) {
          const zr = rect(zone);
          corners.forEach((c) => { const cr = rect(c); if (cr.left < zr.left - 0.6 || cr.right > zr.right + 0.6 || cr.top < zr.top - 0.6 || cr.bottom > zr.bottom + 0.6) fails.push('a photo corner sits off the portrait zone'); });
          if (corners.length === 4) {
            const ys = [...corners].map((c) => rect(c).top);
            if (Math.max(...ys) - Math.min(...ys) < zr.height - 30) fails.push('the photo corners do not reach the bottom edge of the zone');
          }
        }
      }
      return fails;
    });
  },
};
