#!/usr/bin/env node
/**
 * Gate 7 `screen-geometry` (ARCHITECTURE §15; task 4 of the ten, 2026-11-01): the screen versions a student taps —
 * every marks screen of every built maker (screen.js buildScreen: the page served with its tap layer), MEASURED on the
 * rendered overlay at a phone (360) and a desktop (1024):
 *   1. tap floors — controls (Check / Try again / pad keys) ≥ 44 px at both widths; page items ≥ 34 px at 1024 (the page
 *      is 1:1 on a tablet / desktop; CLAUDE.md §23.4: controls ≥ 44, canvas cells ≥ 34). At 360 the page scales to
 *      0.49 and the smallest item is REPORTED (the phone layout is the operator's open decision, handoff 01) — the
 *      runtime's growth of small targets is measured, not assumed
 *   2. nothing cut off — every item inside the page box and the viewport; every control inside the viewport and in the
 *      layout (visible, not clipped by an overflow)
 *   3. nothing overlapping — no two tap targets overlap by more than 2 px in both directions at 1024 (an ambiguous tap);
 *      at 360 the overlaps after growth are reported
 *   4. on content — every target's centre hits page content (a chip, a picture, a box, a cell), never the bare page:
 *      the tap layer sits where the page draws its task (the live capture agrees with the page)
 * Non-vacuity: a screen that renders no tap target fails ("measured nothing").
 * Poisons, both directions, every run (counting K-002 en L2): an item shrunk to 20 px → 1; an item pushed off the page →
 * 2; two items pulled onto each other → 3; a control shrunk to 30 px → 1; an item moved onto the bare page → 4; the
 * correct screen passes all four.
 *
 *   node scripts/makers/gates/screen-geometry.js [--makers=a,b] [--locales=en,fi] [--quick] [--json=out]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const MP = require('./lib/maker-pages.js');
const screen = require('../screen.js');

const A = MP.args();
const QUICK = !!A.quick;
const LOCS = String(A.locales || (QUICK ? 'en' : 'en,fi')).split(',');
const WIDTHS = [360, 1024];
const ITEM_FLOOR = 34, CONTROL_FLOOR = 44, OVERLAP_TOL = 2;

/** runs in the served screen: the rendered geometry of every tap target and control */
function measure() {
  const page = document.querySelector('[data-lcs-page]');
  const pr = page.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  const items = Array.prototype.slice.call(document.querySelectorAll('#lcs-overlay button')).map((b) => { const r = b.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom, w: r.width, h: r.height, q: b.getAttribute('data-lcs-q') || b.getAttribute('data-lcs-t') || b.getAttribute('data-lcs-b') || '' }; });
  const controls = Array.prototype.slice.call(document.querySelectorAll('.lcs-btn, .lcs-key')).filter((b) => !b.hidden && b.offsetParent).map((b) => { const r = b.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom, w: r.width, h: r.height, txt: (b.textContent || '').trim().slice(0, 12) }; });
  // 4. on content: the element under each target's centre, with the overlay out of the way
  const ov = document.getElementById('lcs-overlay');
  const prevPE = ov.style.pointerEvents; ov.style.pointerEvents = 'none';
  const onContent = items.map((it) => {
    const x = (it.l + it.r) / 2, y = (it.t + it.b) / 2;
    const el = document.elementFromPoint(x, y);
    if (!el) return 'nothing';
    if (el === page || el.matches('.ws-body, .ws-cardgrid, .ws-card, .ws-card-stage, html, body')) return 'bare:' + el.tagName.toLowerCase() + '.' + (el.className.baseVal || el.className || '').split(' ')[0];
    return 'content';
  });
  ov.style.pointerEvents = prevPE;
  const inPage = items.map((it) => it.l >= pr.left - 1 && it.r <= pr.right + 1 && it.t >= pr.top - 1 && it.b <= pr.bottom + 1);
  const inView = (r) => r.l >= -0.5 && r.r <= vw + 0.5;
  const overlaps = [];
  for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
    const a = items[i], b = items[j];
    const ix = Math.min(a.r, b.r) - Math.max(a.l, b.l), iy = Math.min(a.b, b.b) - Math.max(a.t, b.t);
    if (ix > 2 && iy > 2) overlaps.push([i, j, Math.round(ix), Math.round(iy)]);
  }
  return { vw, page: { w: pr.width, h: pr.height, scale: pr.width / 703 }, items, controls, onContent, inPage, itemsInView: items.map(inView), controlsInView: controls.map(inView), overlaps, scrollH: document.documentElement.scrollHeight };
}

(async () => {
  const makers = MP.builtMakers(A.makers);
  const m = await new MP.Mounter().open();
  let fails = 0, screens = 0, targets = 0;
  const report = [];
  const phone = [];
  const fail = (s) => { fails++; if (fails <= 60) console.log('FAIL ' + s); };
  const mount = (html) => m.mount(html, 703);

  /** the checks on one served screen; returns the failure sentences */
  async function check(tag, html) {
    const out = [];
    const per = {};
    for (const w of WIDTHS) {
      await m.mount(html, w);
      const g = await m.page.evaluate(measure);
      per[w] = g;
      if (!g.items.length) { out.push(`${w}: measured nothing (no tap target rendered)`); continue; }
      if (!g.controls.length) out.push(`${w}: no control rendered`);
      const smallC = g.controls.filter((c) => Math.min(c.w, c.h) < CONTROL_FLOOR);
      if (smallC.length) out.push(`${w}: ${smallC.length} controls under ${CONTROL_FLOOR} px (${smallC[0].txt || 'key'} ${Math.min(smallC[0].w, smallC[0].h).toFixed(0)} px)`);
      if (g.controlsInView.some((v) => !v)) out.push(`${w}: a control is cut off by the viewport`);
      if (g.itemsInView.some((v) => !v)) out.push(`${w}: ${g.itemsInView.filter((v) => !v).length} tap targets cut off by the viewport`);
      if (g.inPage.some((v) => !v)) out.push(`${w}: ${g.inPage.filter((v) => !v).length} tap targets outside the page box`);
      const bare = g.onContent.filter((c) => c !== 'content');
      if (bare.length) out.push(`${w}: ${bare.length} tap targets sit on nothing (${bare[0]})`);
      const smallI = g.items.filter((it) => Math.min(it.w, it.h) < ITEM_FLOOR);
      if (w === 1024) {
        if (smallI.length) out.push(`1024: ${smallI.length} page items under ${ITEM_FLOOR} px (smallest ${Math.min(...smallI.map((it) => Math.min(it.w, it.h))).toFixed(1)})`);
        if (g.overlaps.length) out.push(`1024: ${g.overlaps.length} pairs of tap targets overlap (${g.overlaps[0][2]}×${g.overlaps[0][3]} px)`);
      } else phone.push({ tag, smallest: Math.min(...g.items.map((it) => Math.min(it.w, it.h))), overlaps: g.overlaps.length, items: g.items.length });
    }
    return { fails: out, per };
  }

  for (const { maker, tj } of makers) {
    if (!tj.runtimeStrings || !tj.screenInstructions) { fail(`${maker}: templates.json has no runtimeStrings / screenInstructions`); continue; }
    let n = 0;
    for (const t of tj.templates) {
      if (t.screen !== 'marks') continue;
      const type = MP.loadType(t);
      for (const loc of LOCS.filter((l) => t.locales.includes(l))) {
        for (const d of t.screenLevels) {
          const o = MP.settingsSpace(t, loc, { themes: 1, units: 1, copies: 1, levels: [d], sample: LOCS.indexOf(loc) })[0];
          const tag = `${maker} ${t.id} ${loc} L${d}`;
          let sc;
          try {
            const r = MP.buildPage(t, type, tj, loc, o, { screen: true });
            sc = await screen.buildScreen({ html: r.screenHtml, locale: loc, strings: tj.runtimeStrings[loc], instruction: (pl) => tj.screenInstructions[loc][screen.instructionKey(pl)], mount });
          } catch (e) { fail(`${tag}: screen build — ${e.reasons ? e.reasons.join('; ') : e.message}`); continue; }
          screens++; n++;
          const res = await check(tag, sc.html);
          targets += res.per[1024] ? res.per[1024].items.length : 0;
          res.fails.forEach((f) => fail(`${tag}: ${f}`));
          report.push({ maker, id: t.id, locale: loc, level: d, fails: res.fails, phone: res.per[360] ? { smallest: Math.min(...res.per[360].items.map((it) => Math.min(it.w, it.h))), overlaps: res.per[360].overlaps.length } : null });
        }
      }
    }
    console.log(`${maker}: ${n} screens measured`);
  }

  // ---- poisons, both directions (counting K-002 en L2)
  {
    const K002 = require(path.join(MP.REPO, 'scripts/worksheet-gen/types/k/K-002-count-and-circle.js'));
    const tj = (makers.find((x) => x.maker === 'counting') || {}).tj || { runtimeStrings: { en: require(path.join(MP.REPO, 'scripts/worksheet-gen/emit/interactive-runtime.js')).runtimeStrings('en') }, screenInstructions: { en: { 'tap-choice': 'Tap the right number.' } }, answerKey: { en: 'Answer key' } };
    const r = MP.buildPage({ id: 'K-002' }, K002, tj, 'en', { difficulty: 2, theme: 'animals', unit: null, variant: 1 }, { screen: true });
    const sc = await screen.buildScreen({ html: r.screenHtml, locale: 'en', strings: tj.runtimeStrings.en, instruction: (pl) => tj.screenInstructions.en[screen.instructionKey(pl)], mount });
    const good = await check('poison control', sc.html);
    if (good.fails.length) fail('poison control: the correct K-002 screen fails (' + good.fails.join('; ') + ')');
    const inject = (css) => sc.html.replace('</head>', '<style>' + css + '</style></head>');
    const p1 = await check('p1', inject('#lcs-overlay button[data-lcs-q="0"]{width:20px!important;height:20px!important}'));
    if (!p1.fails.some((f) => /items under/.test(f))) fail('poison 1: a 20 px item PASSED the tap floor');
    const p2 = await check('p2', inject('#lcs-overlay button[data-lcs-q="0"]{left:-40%!important}'));
    if (!p2.fails.some((f) => /cut off|outside the page/.test(f))) fail('poison 2: an item pushed off the page PASSED');
    const p3 = await check('p3', inject('#lcs-overlay button[data-lcs-q="1"]{left:' + sc.plan.parts[0].items[0].options[0].x + '%!important;top:' + sc.plan.parts[0].items[0].options[0].y + '%!important}'));
    if (!p3.fails.some((f) => /overlap/.test(f))) fail('poison 3: two items on the same spot PASSED');
    const p4 = await check('p4', inject('.lcs-btn{min-height:30px!important;height:30px!important;padding:0!important}'));
    if (!p4.fails.some((f) => /controls under/.test(f))) fail('poison 4: a 30 px control PASSED');
    const p5 = await check('p5', inject('#lcs-overlay button[data-lcs-q="0"]{left:1%!important;top:96%!important}'));
    if (!p5.fails.some((f) => /sit on nothing/.test(f))) fail('poison 5: an item moved onto the bare page PASSED');
  }

  await m.close();
  if (m.errors.length) fail('page errors: ' + m.errors.slice(0, 3).join(' | '));
  if (A.json) fs.writeFileSync(A.json, JSON.stringify({ report, phone }, null, 1));
  const small = phone.filter((p) => Number.isFinite(p.smallest)).sort((a, b) => a.smallest - b.smallest).slice(0, 5).map((p) => `${p.tag.split(' ').slice(1, 4).join(' ')} ${p.smallest.toFixed(0)} px`);
  const ov = phone.filter((p) => p.overlaps).length;
  console.log(`phone (360 px, the page scaled 0.49): smallest page items ${small.join(', ')}; ${ov} of ${phone.length} screens have overlapping targets after growth — reported, not failed (the phone layout is the operator's open decision)`);
  console.log(`screen geometry: ${screens} screens, ${targets} tap targets measured at 1024` + (fails ? `; ${fails} failing` : '; all pass, poisons fire both ways'));
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('screen geometry: error — ' + e.stack); process.exit(1); });
