#!/usr/bin/env node
/**
 * audit-homepage-scroll.js — the MEASURED scroll-experience gate for the
 * homepage v11 "walk" (§A.13.62 discipline applied to scroll motion: a scroll
 * page has no single state, so every act is measured at the positions where
 * its motion is supposed to happen, not at the top of the page).
 *
 * What it asserts, per locale × viewport (each check non-vacuous first —
 * the thing measured must exist, or the run FAILS rather than passing on an
 * empty selection):
 *   (a) zero horizontal overflow at EVERY scroll position visited;
 *   (b) the easel STICKS: once panel 2 has arrived, panel 1 rests at the
 *       --hv11-stick offset (±1.5px); under panel 4, panels 1-3 are stacked
 *       at the same offset. Below 860px the panels are in flow.
 *   (c) the door OPENS under the wheel: the arch's clip-path differs between
 *       the approach and the arrival, and the scroll-driven animation's
 *       progress reads < 0.25 before and ≥ 0.95 at full entry;
 *   (d) the wall's three planes move at three RATES: |Δnear| > |Δmid| >
 *       |Δfar|, the far plane against the others, and every plane stays
 *       inside its room at both ends (nothing cut);
 *   (e) the studio's outputs are tucked behind the maker before the room
 *       and home (translate 0) once it has entered;
 *   (f) the send runs ONCE: at the top of the page the screens are dark and
 *       the dispatch has no `is-in`; ~3s after arrival every screen is lit
 *       and NO animation inside #share is still running;
 *   (g) WCAG contrast of every prose class against the wall it sits on
 *       (worst of --room-wall / -lit / -deep) ≥ 4.5 (≥ 3 for large type);
 *   (h) the per-block height table, and a FAIL above --budget if given.
 *
 * Modes: --mode=reduced emulates prefers-reduced-motion and asserts ZERO
 * running CSS animations plus every composed END pose visible WITHOUT
 * scrolling; --mode=noscrub stubs CSS.supports('animation-timeline') so the
 * IntersectionObserver fallback is exercised, and asserts the same end poses
 * after entry.
 *
 * Poisons (each MUST fail, or the gate is not a gate): --poison=sticky
 * (panels made static) · arch (door animation removed) · parallax (planes
 * static) · screens (IntersectionObserver never fires) · overflow (a 200vw
 * box appended) · budget (the catalogue padded past --budget).
 *
 * Usage:
 *   MSYS_NO_PATHCONV=1 node scripts/audit-homepage-scroll.js \
 *     --base=http://localhost:3000 [--path=/{locale}/preview/homepage-v11] \
 *     [--locales=en] [--vp=360x740,768x1000,1024x768,1366x768,1920x1080] \
 *     [--mode=default|reduced|noscrub] [--poison=…] [--budget=11000] [--out=dir]
 * Assumes a running server (like every homepage gate); exit 1 on any failure,
 * exit 1 INCONCLUSIVE if the server is unreachable.
 */
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);
const BASE = (args.base || 'http://localhost:3000').replace(/\/$/, '');
const PATH_TEMPLATE = args.path || '/{locale}/preview/homepage-v11';
const LOCALES = String(args.locales || 'en').split(',').filter(Boolean);
const VIEWPORTS = String(args.vp || '360x740,768x1000,1024x768,1366x768,1920x1080')
  .split(',')
  .map((s) => s.split('x').map(Number));
const MODE = args.mode || 'default';
const POISON = typeof args.poison === 'string' ? args.poison : null;
const BUDGET = args.budget ? Number(args.budget) : null;
const OUT = args.out || path.join(__dirname, '..', '.scratch', 'homepage-scroll');
const urlFor = (locale) => BASE + (PATH_TEMPLATE.includes('{locale}') ? PATH_TEMPLATE.replace(/\{locale\}/g, locale) : PATH_TEMPLATE);
const STICK_TOL = 1.5;
/* Below this width the easel is one column and its panels are in flow. */
const STACK_MIN_W = 860;

const POISON_CSS = {
  sticky: '.hv11-panel { position: static !important; }',
  arch: '.hv11 .hv11-threshold-arch { animation: none !important; transition: none !important; }',
  parallax: '.hv11 .hv11-plane { animation: none !important; }',
  overflow: null, // handled in-page
  budget: '.hv10-catalogue { padding-bottom: 6000px !important; }',
  screens: null, // handled by stubbing IntersectionObserver
};

function luminance([r, g, b]) {
  const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrast(a, b) {
  const la = luminance(a), lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

async function run(browser, locale, w, h) {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (r) => (/favicon/.test(r.url()) ? r.abort() : r.continue()));
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)));
  if (MODE === 'reduced') await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  if (MODE === 'noscrub') {
    await page.evaluateOnNewDocument(() => {
      const orig = CSS.supports.bind(CSS);
      CSS.supports = (...a) => (String(a[0]).includes('animation-timeline') ? false : orig(...a));
    });
  }
  if (POISON === 'screens') {
    await page.evaluateOnNewDocument(() => {
      window.IntersectionObserver = class { constructor() {} observe() {} unobserve() {} disconnect() {} };
    });
  }
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.goto(urlFor(locale), { waitUntil: 'networkidle2', timeout: 120000 });
  if (MODE === 'noscrub') {
    // The scrub rules are gated by @supports, which a stubbed CSS.supports
    // cannot reach; remove them the way an unsupporting engine would.
    await page.addStyleTag({ content: '.hv11 [data-scrub], .hv11 .hv11-plane, .hv11 .hv10-output, .hv11 .hv11-threshold-arch, .hv11 .hv11-panel { animation-timeline: none !important; }' });
    await page.addStyleTag({ content: '.hv11 .hv11-plane, .hv11 .hv11-threshold-arch, .hv11 .hv11-panel + .hv11-panel, .hv11 .hv10-output { animation: none !important; }' });
  }
  if (POISON && POISON_CSS[POISON]) await page.addStyleTag({ content: POISON_CSS[POISON] });
  if (POISON === 'overflow') await page.evaluate(() => { const d = document.createElement('div'); d.style.cssText = 'width:200vw;height:20px;background:red'; document.querySelector('#printroom .hv10-room-inner').appendChild(d); });

  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.querySelectorAll('img').forEach((i) => { i.loading = 'eager'; }); });
  const at = async (y) => {
    await page.evaluate((y) => window.scrollTo({ top: Math.max(0, y), behavior: 'instant' }), y);
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    await new Promise((r) => setTimeout(r, 70));
  };
  const fails = [];
  const notes = [];

  // ── (f, first half) the send has NOT run at the top of the page ─────────
  const pre = await page.evaluate(() => {
    const d = document.querySelector('.hv10-dispatch');
    const screens = [...document.querySelectorAll('.hv11-screen')];
    return { has: !!d, isIn: !!(d && d.classList.contains('is-in')), screens: screens.length, dark: screens.filter((s) => parseFloat(getComputedStyle(s).opacity) < 0.3).length, js: !!document.querySelector('.hv11.hv11-js'), noscrub: !!document.querySelector('.hv11.hv11-noscrub') };
  });
  if (!pre.has) fails.push('no .hv10-dispatch (measured nothing)');
  if (pre.screens !== 25) fails.push(`screens ${pre.screens} (expected 25)`);

  // ── geometry (before any scrolling) ─────────────────────────────────────
  const geo = await page.evaluate(() => {
    const top = (s) => { const e = document.querySelector(s); return e ? e.getBoundingClientRect().top + scrollY : null; };
    const hgt = (s) => { const e = document.querySelector(s); return e ? e.getBoundingClientRect().height : null; };
    const blocks = {};
    for (const s of ['.hv10-field', '.hv11-threshold', '#instruments', '#printroom', '#activities', '#studio', '#share', '#plans', '#close', '.hv10-catalogue', '#footer']) blocks[s] = { top: top(s), h: hgt(s) };
    const panelEls = [...document.querySelectorAll('.hv11-panel')];
    const panels = panelEls.map((e) => e.getBoundingClientRect().top + scrollY);
    /* LAYOUT heights (offsetHeight), not rect heights: a panel below the
       fold sits at its pre-entry scale (0.97), and a rect measured there is
       3% short — the first version of this formula was 10px off for it. */
    const panelH = panelEls.map((e) => e.offsetHeight);
    /* The USED sticky offset (px), read off the panel itself. Reading the
       `--hv11-stick` custom property returns its clamp() TEXT, which parses
       to NaN — the first run of this gate asserted against null. */
    const stick = panelEls.length ? parseFloat(getComputedStyle(panelEls[0]).top) : null;
    const easel = document.querySelector('.hv11-easel');
    const easelBottom = easel ? easel.getBoundingClientRect().bottom + scrollY : null;
    return { blocks, panels, panelH, pageH: document.body.scrollHeight, stick, easelBottom };
  });
  for (const k of ['.hv11-threshold', '#instruments', '#printroom', '#studio', '#share', '#close']) if (geo.blocks[k].top == null) fails.push(`missing ${k}`);
  if (geo.panels.length !== 4) fails.push(`easel panels ${geo.panels.length} (expected 4)`);
  if (geo.panels.length && !(geo.stick > 0)) fails.push(`easel: could not read the panels' sticky offset (${geo.stick})`);
  if (fails.length) { await page.close(); return { fails, notes, geo }; }

  /* Every room clips horizontally, so a breakout inside a room never grows
     the document's scrollWidth — the responsive gate refuses `clip` as an
     exemption for exactly this reason. At every position visited, the
     page's own moving parts are walked for a right-edge breakout too. */
  const hOverflow = async (label) => {
    const o = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const doc = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - vw;
      let edge = null;
      for (const el of document.querySelectorAll('.hv11-plane, .hv11-plane > *, .hv11-panel, .hv11-easel-col, .hv11-threshold-arch, .hv11-threshold-jamb, .hv10-output, .hv10-workbench, .hv11-screens, .hv11-shelf, .hv11-shelf-item, .hv10-dispatch > *, #printroom .hv10-room-inner > *')) {
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.right > vw + 2 && !edge) edge = `${el.tagName.toLowerCase()}.${String(el.className).split(' ').slice(0, 2).join('.')} right=${Math.round(r.right)}`;
      }
      return { doc, edge };
    });
    if (o.doc > 0) fails.push(`hscroll +${o.doc}px at ${label}`);
    if (o.edge) fails.push(`edge breakout at ${label}: ${o.edge}`);
  };

  // ── (c) the door ───────────────────────────────────────────────────────
  const T = geo.blocks['.hv11-threshold'];
  const arch = async () => page.evaluate(() => {
    const a = document.querySelector('.hv11-threshold-arch');
    const anim = document.getAnimations().find((x) => x.effect && x.effect.target === a);
    let progress = null;
    try { progress = anim && anim.effect.getComputedTiming().progress; } catch { /* ignore */ }
    return { clip: getComputedStyle(a).clipPath, progress, animated: !!anim };
  });
  /* On a tall viewport with a short hero (768×1000) the threshold is already
     in view at scroll 0, so an "approach" state does not exist there: the
     door is part-open from the first paint by design. Assert the approach
     only where it can be reached. */
  const approachY = T.top - h + Math.round(h * 0.05);
  const approachReachable = approachY >= 0;
  await at(approachY);
  await hOverflow('door approach');
  const before = await arch();
  if (!approachReachable) notes.push(`door: already ${Math.round(((h - (T.top - 0)) / T.h) * 100)}% in view at scroll 0 at this viewport — approach not measurable, arrival asserted`);
  await at(T.top - Math.round(h * 0.2));
  await hOverflow('door arrival');
  const after = await arch();
  if (MODE === 'default' && !pre.noscrub) {
    if (!before.animated) fails.push('door: no scroll-driven animation on the arch');
    else {
      if (approachReachable && !(before.progress != null && before.progress < 0.25)) fails.push(`door: progress ${before.progress} on approach (expected < 0.25)`);
      if (!(after.progress != null && after.progress >= 0.95)) fails.push(`door: progress ${after.progress} on arrival (expected ≥ 0.95)`);
      if (approachReachable && before.clip === after.clip) fails.push('door: clip-path did not change between approach and arrival');
    }
  } else {
    // reduced / noscrub: the end pose must be the OPEN door
    await new Promise((r) => setTimeout(r, 1000));
    const end = await arch();
    if (!/inset\(0px(?: 0px){0,3}\s*round/.test(end.clip) && !/^inset\(0(px)?\s+0(px)?\s+0(px)?\s+0(px)?/.test(end.clip)) fails.push(`door: end pose not open in ${MODE} mode (${end.clip.slice(0, 40)})`);
  }

  // ── (b) the easel sticks ───────────────────────────────────────────────
  const P = geo.panels;
  const rectTop = (i) => page.evaluate((i) => document.querySelectorAll('.hv11-panel')[i].getBoundingClientRect().top, i);
  await at(P[1] - geo.stick + 40);
  await hOverflow('easel panel 2');
  const p0 = await rectTop(0);
  /* Panel 4 exactly arrived: its top at the sticky offset. A sticky box is
     confined to its containing block, so an EARLIER panel taller than the
     room left under the easel's end is legitimately pushed up — the expected
     top is min(stick, easelBottom − its height), never a bare `stick`. */
  const y4 = P[3] - geo.stick;
  await at(y4);
  /* In the fallback mode the incoming card settles by a 500ms transition
     (scale .97 → 1 about its bottom edge), which moves its top by ~10px
     while it runs; let it finish before the tops are read. */
  if (MODE === 'noscrub') await new Promise((r) => setTimeout(r, 700));
  await hOverflow('easel panel 4');
  const tops = [await rectTop(0), await rectTop(1), await rectTop(2)];
  const easelBottomNow = geo.easelBottom - y4;
  if (w >= STACK_MIN_W) {
    if (Math.abs(p0 - geo.stick) > STICK_TOL) fails.push(`easel: panel 1 at ${p0.toFixed(1)} when panel 2 arrives (expected ${geo.stick} ±${STICK_TOL})`);
    for (const [i, t] of tops.entries()) {
      const expected = Math.min(geo.stick, easelBottomNow - geo.panelH[i]);
      if (Math.abs(t - expected) > STICK_TOL) fails.push(`easel: panel ${i + 1} at ${t.toFixed(1)} under panel 4 (expected ${expected.toFixed(1)}: stuck at ${geo.stick} or released by the easel's end)`);
    }
  } else {
    // in flow: consecutive panels must not overlap by more than the stick gap
    const overl = await page.evaluate(() => { const r = [...document.querySelectorAll('.hv11-panel')].map((e) => e.getBoundingClientRect()); let o = 0; for (let i = 1; i < r.length; i++) o = Math.max(o, r[i - 1].bottom - r[i].top); return o; });
    if (overl > 1) notes.push(`phone easel: panels overlap ${overl.toFixed(0)}px (stacked on a phone is allowed; noted)`);
  }

  // ── (d) the wall's three rates ─────────────────────────────────────────
  const R = geo.blocks['#printroom'];
  const planes = async () => page.evaluate(() => {
    const room = document.querySelector('#printroom').getBoundingClientRect();
    return [...document.querySelectorAll('.hv11-plane')].map((p) => {
      const r = p.getBoundingClientRect();
      const t = getComputedStyle(p).translate;
      const ty = t && t !== 'none' ? parseFloat(t.split(' ')[1] || '0') : 0;
      return { cls: p.className, ty, inside: r.top >= room.top - 1 && r.bottom <= room.bottom + 1, left: r.left, right: r.right };
    });
  });
  await at(R.top - h + 20);
  await hOverflow('wall entry');
  const a = await planes();
  await at(R.top + R.h - h);
  await hOverflow('wall exit');
  const b = await planes();
  if (a.length !== 3) fails.push(`wall planes ${a.length} (expected 3)`);
  else {
    const d = (cls) => { const i = a.findIndex((x) => x.cls.includes(cls)); return b[i].ty - a[i].ty; };
    const dn = d('is-near'), dm = d('is-mid'), df = d('is-far');
    if (MODE === 'default' && !pre.noscrub) {
      if (!(Math.abs(dn) > Math.abs(dm) && Math.abs(dm) > Math.abs(df))) fails.push(`wall: rates not ordered (near ${dn.toFixed(1)} mid ${dm.toFixed(1)} far ${df.toFixed(1)})`);
      if (!(Math.sign(df) !== Math.sign(dn) && df !== 0)) fails.push(`wall: far plane does not move against the near plane (near ${dn.toFixed(1)} far ${df.toFixed(1)})`);
    }
    for (const s of [...a, ...b]) {
      if (!s.inside) fails.push(`wall: a plane leaves its room (${s.cls.replace('hv11-plane ', '')})`);
      if (s.left < -2 || s.right > w + 2) fails.push(`wall: plane cut at the viewport edge (${Math.round(s.left)}..${Math.round(s.right)})`);
    }
  }

  // ── (e) the studio's outputs ───────────────────────────────────────────
  const S = geo.blocks['#studio'];
  /* `translate` computes to "none", "Xpx" (y omitted when zero) or "X Y";
     percentages stay percentages. Always return a [x, y] pair. */
  const outs = async () => page.evaluate(() => [...document.querySelectorAll('.hv10-output')].map((o) => { const t = getComputedStyle(o).translate; if (!t || t === 'none') return [0, 0]; const v = t.split(' ').map(parseFloat); return [v[0] || 0, v[1] || 0]; }));
  await at(S.top - h + 10);
  const o1 = await outs();
  /* home = once the whole room has passed through: its end aligned with the
     viewport's bottom plus a step, so the SECOND output (lower, later range)
     has completed too */
  await at(S.top + S.h - h + 80);
  await new Promise((r) => setTimeout(r, 900));
  const o2 = await outs();
  const dist = (v) => Math.hypot(v[0], v[1]);
  if (o1.length !== 2) fails.push(`studio outputs ${o1.length} (expected 2)`);
  else if (MODE !== 'reduced') {
    if (!(dist(o1[0]) > 12)) fails.push(`studio: output 1 not tucked before the room (translate ${o1[0]})`);
    if (!(dist(o2[0]) < 1 && dist(o2[1]) < 1)) fails.push(`studio: outputs not home after the room (${o2[0]} / ${o2[1]})`);
  }

  // ── (f) the send, once ─────────────────────────────────────────────────
  const D = geo.blocks['#share'];
  if (MODE !== 'reduced' && !(pre.dark === 25)) fails.push(`send: ${25 - pre.dark} screens already lit at page top (the sequence must wait for entry)`);
  if (MODE !== 'reduced' && pre.isIn) fails.push('send: .hv10-dispatch already is-in at page top');
  await at(D.top + 40);
  await new Promise((r) => setTimeout(r, 3000));
  const post = await page.evaluate(() => {
    const d = document.querySelector('.hv10-dispatch');
    const screens = [...document.querySelectorAll('.hv11-screen')];
    const running = document.getAnimations().filter((x) => x.playState === 'running' && x.effect && x.effect.target && (x.effect.target.closest ? x.effect.target.closest('#share .hv10-dispatch') : false)).length;
    const arc = getComputedStyle(document.querySelector('.hv10-dispatch-arc'), '::before').transform;
    return { isIn: d.classList.contains('is-in'), lit: screens.filter((s) => parseFloat(getComputedStyle(s).opacity) >= 0.99).length, running, arc };
  });
  if (MODE !== 'reduced' && !post.isIn) fails.push('send: .hv10-dispatch never received is-in');
  if (post.lit !== 25) fails.push(`send: ${post.lit}/25 screens lit after arrival`);
  if (post.running > 0) fails.push(`send: ${post.running} animation(s) still running inside the dispatch after the sequence (must run once, not loop)`);

  // ── (g) contrast ───────────────────────────────────────────────────────
  const contrastRows = await page.evaluate(() => {
    const parse = (c) => { const m = c.match(/\d+(\.\d+)?/g); return m ? m.slice(0, 3).map(Number) : null; };
    const wallOf = (el) => {
      const room = el.closest('.hv10-room, .hv11-threshold');
      if (!room) return null;
      const cs = getComputedStyle(room);
      return ['--room-wall', '--room-wall-lit', '--room-wall-deep'].map((v) => cs.getPropertyValue(v).trim()).filter(Boolean);
    };
    const opaqueBg = (el) => {
      for (let p = el; p && p !== document.body; p = p.parentElement) {
        const bg = getComputedStyle(p).backgroundColor;
        const m = bg.match(/rgba?\(([^)]+)\)/);
        if (m) { const parts = m[1].split(',').map((x) => parseFloat(x)); if (parts.length < 4 || parts[3] >= 0.9) return parts.slice(0, 3); }
      }
      return null;
    };
    const sels = ['.hv10-room-h2', '.hv10-room-body', '.hv11-panel-name', '.hv11-panel-note', '.hv10-alcove-plaque', '.hv10-output figcaption', '.hv11-shelf-plaque', '.hv10-chip', '.hv10-plan li', '.hv11-promises li', '.hv11-reassure', '.hv11-slip', '.hv11-fork-label', '.hv10-loan-facts li'];
    const rows = [];
    for (const sel of sels) {
      const el = document.querySelector(sel);
      if (!el) continue;
      const cs = getComputedStyle(el);
      const fg = parse(cs.color);
      const size = parseFloat(cs.fontSize);
      const bold = parseInt(cs.fontWeight, 10) >= 700;
      const large = size >= 24 || (size >= 18.66 && bold);
      const bg = opaqueBg(el);
      const walls = bg ? null : wallOf(el);
      rows.push({ sel, fg, bg, walls, large });
    }
    return rows;
  });
  const hex = (s) => { const m = s.match(/^#([0-9a-f]{6})$/i); return m ? [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16)) : null; };
  if (!contrastRows.length) fails.push('contrast: measured nothing');
  for (const r of contrastRows) {
    if (!r.fg) continue;
    const bgs = r.bg ? [r.bg] : (r.walls || []).map(hex).filter(Boolean);
    if (!bgs.length) continue;
    const worst = Math.min(...bgs.map((b) => contrast(r.fg, b)));
    const need = r.large ? 3 : 4.5;
    if (worst < need) fails.push(`contrast: ${r.sel} ${worst.toFixed(2)}:1 < ${need}`);
  }

  // ── reduced-motion: zero running, end poses without scrolling ──────────
  if (MODE === 'reduced') {
    await at(0);
    const rm = await page.evaluate(() => ({ running: document.getAnimations().filter((a) => a.constructor.name === 'CSSAnimation' && a.playState === 'running').length, js: !!document.querySelector('.hv11-js') }));
    if (rm.running > 0) fails.push(`reduced-motion: ${rm.running} CSS animations running`);
    if (rm.js) fails.push('reduced-motion: ScrollStage armed the once-sequences (must stay unarmed)');
  }
  if (MODE === 'noscrub' && !pre.noscrub) fails.push('noscrub: root did not receive .hv11-noscrub');

  // ── (h) heights ────────────────────────────────────────────────────────
  const table = Object.entries(geo.blocks).map(([k, v]) => `${k} ${v.h == null ? '-' : Math.round(v.h)}`).join(' · ');
  notes.push(`page ${geo.pageH}px · ${table}`);
  if (BUDGET && w === 1366 && geo.pageH > BUDGET) fails.push(`page ${geo.pageH}px > budget ${BUDGET}px at 1366`);

  if (errors.length) fails.push(`page errors: ${errors.slice(0, 2).join(' ; ')}`);
  await at(0);
  await page.close();
  return { fails, notes, geo };
}

(async () => {
  // preflight: never a silent pass on an unreachable server
  try { const r = await fetch(urlFor(LOCALES[0])); if (!r.ok) throw new Error(`HTTP ${r.status}`); } catch (e) { console.log(`INCONCLUSIVE: ${urlFor(LOCALES[0])} unreachable (${e.message})`); process.exit(1); }
  fs.mkdirSync(OUT, { recursive: true });
  console.log(`Homepage scroll audit — ${BASE}${PATH_TEMPLATE}  mode ${MODE}${POISON ? `  [POISON ${POISON}]` : ''}`);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  let ok = true;
  for (const locale of LOCALES) {
    for (const [w, h] of VIEWPORTS) {
      let res;
      try { res = await run(browser, locale, w, h); } catch (e) { res = { fails: [`crashed: ${e.message}`], notes: [] }; }
      const status = res.fails.length ? `FAIL  ${res.fails.join('  ·  ')}` : 'PASS';
      console.log(`  ${locale} @ ${String(w).padStart(4)}x${h}  ${status}`);
      for (const n of res.notes) console.log(`        ${n}`);
      if (res.fails.length) ok = false;
    }
  }
  await browser.close();
  if (POISON) {
    console.log(ok ? `\nPOISON ${POISON} SURVIVED — the gate cannot see this defect.` : `\nPOISON ${POISON} caught.`);
    process.exit(ok ? 1 : 0);
  }
  console.log(ok ? '\nPASS: the walk holds at every position measured.' : '\nFAIL: fix the reported positions.');
  process.exit(ok ? 0 : 1);
})();
