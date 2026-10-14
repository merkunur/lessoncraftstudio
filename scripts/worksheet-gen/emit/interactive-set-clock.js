/**
 * interactive-set-clock.js — the `set-clock` runtime (Telling Time Level Set, walk #64, 2026-10-14): the screen version
 * of the draw-the-hands pages (G1-212, G1-233..237). The child sees the printed page — each card an empty clock face and
 * its digital time — and DRAGS the hands onto every face: the short dark hour hand and the long coral minute hand,
 * independently (placing the hour hand between two numbers at half past IS the skill, so it never follows the minute
 * hand by itself). On release the minute hand snaps to the face's step (five minutes) and the hour hand to a
 * five-minute position. Check marks each clock green or red: the minute hand must stand on the minute, the hour hand
 * within 5° of its true place ((h + m / 60) × 30°: a sixth of the gap between two numbers) — so the hour hand pointing
 * AT the 7 at 7:30, or at the 9 at 9:15 (7.5° short), is wrong. Level 1 of the o'clock / half-past / quarter pages prints the minute hand: only the hour hand is dragged.
 *
 * DECK_BUNDLE.items[i] = { cx, cy (% of the stage), r (% of the stage WIDTH: the face radius), label, meta }
 * DECK_BUNDLE.answers[i] = "h:mm"; ctx.clock = { aspect (stage w / h), names: { hour, minute } }
 * Each face gets a transparent hit area (touch-action:none only there, so the long page still scrolls on a phone) and
 * two focusable handle buttons (role slider, ≥ 48 px) that sit on the hand tips: arrows turn the hand.
 */
'use strict';

/* istanbul ignore next — runs in the deck page */
function setClockRuntime() {
  var B = window.DECK_BUNDLE, S = B.strings, C = B.ctx.clock, phase = 'fill';
  var st = document.getElementById('lcs-stage'), ov = document.getElementById('lcs-overlay'), chk = document.getElementById('lcs-check'),
    rst = document.getElementById('lcs-reset'), prg = document.getElementById('lcs-progress'), cel = document.getElementById('lcs-celebration');
  var NS = 'http://www.w3.org/2000/svg', VW = 1000, VH = 1000 / C.aspect, ink = document.createElementNS(NS, 'svg');
  ink.setAttribute('viewBox', '0 0 ' + VW + ' ' + VH); ink.setAttribute('preserveAspectRatio', 'none'); ink.setAttribute('class', 'lcs-ink'); ink.setAttribute('aria-hidden', 'true');
  ov.appendChild(ink);
  function fmt(s, v) { return s.replace(/\{(\w+)\}/g, function (_, k) { return v[k] != null ? v[k] : ''; }); }
  function want(i) { var p = String(B.answers[i]).split(':'), h = +p[0], m = +p[1]; return { h: h, m: m, H: ((h % 12) + m / 60) * 30, M: m * 6 }; }
  var K = B.items.map(function (it, i) {
    var fixed = String(it.meta && it.meta['data-lcs-step']) === '0';
    return { cx: it.cx * VW / 100, cy: it.cy * VH / 100, R: it.r * VW / 100, H: 0, M: fixed ? want(i).M : 0, fixed: fixed,
      step: +(it.meta && it.meta['data-lcs-step']) || 5, touched: false, state: null, hb: null, mb: null, label: it.label || '' };
  });
  function diff(a, b) { var d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; }
  function tip(k, w) { var a = (w === 'h' ? k.H : k.M) * Math.PI / 180, L = (w === 'h' ? 0.5 : 0.76) * k.R; return [k.cx + Math.sin(a) * L, k.cy - Math.cos(a) * L]; }
  function line(k, w, col, sw) { var t = tip(k, w); return '<line x1="' + k.cx.toFixed(1) + '" y1="' + k.cy.toFixed(1) + '" x2="' + t[0].toFixed(1) + '" y2="' + t[1].toFixed(1) + '" stroke="' + col + '" stroke-width="' + sw.toFixed(1) + '" stroke-linecap="round"/>'; }
  function knob(k, w, col, r) { var t = tip(k, w); return '<circle cx="' + t[0].toFixed(1) + '" cy="' + t[1].toFixed(1) + '" r="' + r.toFixed(1) + '" fill="' + col + '" stroke="#FFFFFF" stroke-width="3"/>'; }
  function place(btn, k, w) { var t = tip(k, w); btn.style.left = (t[0] / VW * 100) + '%'; btn.style.top = (t[1] / VH * 100) + '%'; btn.setAttribute('aria-valuenow', String(Math.round(w === 'h' ? k.H : k.M))); }
  function draw() {
    var s = '';
    K.forEach(function (k) {
      if (k.state) s += '<circle cx="' + k.cx.toFixed(1) + '" cy="' + k.cy.toFixed(1) + '" r="' + (k.R + 10).toFixed(1) + '" fill="none" stroke="' + (k.state === 'right' ? '#2E9E5B' : '#D64545') + '" stroke-width="9"/>';
      if (!k.fixed) s += line(k, 'm', '#F2784B', k.R * 0.055);
      s += line(k, 'h', '#3A3530', k.R * 0.085);
      if (!k.fixed) s += knob(k, 'm', '#F2784B', k.R * 0.085);
      s += knob(k, 'h', '#3A3530', k.R * 0.095);
      s += '<circle cx="' + k.cx.toFixed(1) + '" cy="' + k.cy.toFixed(1) + '" r="' + (k.R * 0.06).toFixed(1) + '" fill="#F2784B"/>';
      place(k.hb, k, 'h'); if (k.mb) place(k.mb, k, 'm');
    });
    ink.innerHTML = s;
    chk.disabled = phase !== 'fill' || !K.every(function (k) { return k.touched; });
  }
  function snap(k) { if (!k.fixed) k.M = (Math.round(k.M / (k.step * 6)) * k.step * 6) % 360; k.H = (Math.round(k.H / 2.5) * 2.5) % 360; }
  var cur = null;
  function local(ev) { var b = st.getBoundingClientRect(); return [(ev.clientX - b.left) / b.width * VW, (ev.clientY - b.top) / b.height * VH]; }
  function angleAt(k, p) { var a = Math.atan2(p[0] - k.cx, -(p[1] - k.cy)) * 180 / Math.PI; return (a + 360) % 360; }
  function turn(p) { var k = K[cur.i]; var a = angleAt(k, p); if (cur.w === 'h') k.H = a; else k.M = a; k.touched = true; draw(); }
  function down(i, ev) {
    if (phase !== 'fill') return;
    var k = K[i], p = local(ev), w = 'h';
    if (!k.fixed) {
      var dh = Math.hypot(p[0] - tip(k, 'h')[0], p[1] - tip(k, 'h')[1]), dm = Math.hypot(p[0] - tip(k, 'm')[0], p[1] - tip(k, 'm')[1]);
      w = Math.min(dh, dm) < k.R * 0.22 ? (dh <= dm ? 'h' : 'm') : (Math.hypot(p[0] - k.cx, p[1] - k.cy) < k.R * 0.62 ? 'h' : 'm');
    }
    cur = { i: i, w: w, id: ev.pointerId };
    try { ev.target.setPointerCapture(ev.pointerId); } catch (e) { /* capture is a nicety */ }
    ev.preventDefault(); turn(p);
  }
  function up() { if (!cur) return; snap(K[cur.i]); cur = null; draw(); }
  function key(i, w, ev) {
    if (phase !== 'fill') return;
    var k = K[i], d = ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : ev.key === 'ArrowLeft' || ev.key === 'ArrowDown' ? -1 : 0;
    if (!d) return;
    ev.preventDefault();
    if (w === 'h') k.H = (k.H + d * 7.5 + 360) % 360; else k.M = (k.M + d * k.step * 6 + 360) % 360;
    k.touched = true; draw();
  }
  function check() {
    if (!K.every(function (k) { return k.touched; })) return;
    phase = 'reviewed'; var ok = 0;
    K.forEach(function (k, i) {
      var t = want(i), hourOk = diff(k.H, t.H) <= 5, minOk = k.fixed || diff(k.M, t.M) < 1;
      var right=hourOk&&minOk;
      k.state = right ? 'right' : 'wrong'; if (right) ok++;
    });
    prg.textContent = fmt(S.score, { n: ok, total: K.length }); chk.hidden = true; rst.hidden = false; draw();
    if (ok === K.length) setTimeout(function () { cel.hidden = false; var c = document.getElementById('lcs-cele-close'); if (c) c.focus(); }, 450);
  }
  function reset() {
    phase = 'fill';
    K.forEach(function (k, i) { k.H = 0; k.M = k.fixed ? want(i).M : 0; k.touched = false; k.state = null; });
    prg.textContent = ''; chk.hidden = false; rst.hidden = true; cel.hidden = true; draw();
  }
  function handle(i, w) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'lcs-hand lcs-hand--' + w;
    b.setAttribute('role', 'slider'); b.setAttribute('aria-valuemin', '0'); b.setAttribute('aria-valuemax', '359');
    b.setAttribute('aria-label', (w === 'h' ? C.names.hour : C.names.minute) + ' — ' + K[i].label);
    b.addEventListener('keydown', function (ev) { key(i, w, ev); });
    b.addEventListener('pointerdown', function (ev) { down(i, ev); });
    return b;
  }
  function init() {
    K.forEach(function (k, i) {
      // the face's hit area: a circle a little larger than the face; only here does a drag turn a hand instead of scrolling
      var el = document.createElement('div'); el.className = 'lcs-face';
      var d = k.R * 2.3;
      el.style.left = ((k.cx - d / 2) / VW * 100) + '%'; el.style.top = ((k.cy - d / 2) / VH * 100) + '%';
      el.style.width = (d / VW * 100) + '%'; el.style.height = (d / VH * 100) + '%';
      el.addEventListener('pointerdown', function (ev) { down(i, ev); });
      ov.appendChild(el);
      k.hb = handle(i, 'h'); ov.appendChild(k.hb);
      if (!k.fixed) { k.mb = handle(i, 'm'); ov.appendChild(k.mb); }
    });
    st.addEventListener('pointermove', function (ev) { if (cur && ev.pointerId === cur.id) turn(local(ev)); });
    st.addEventListener('pointerup', up); st.addEventListener('pointercancel', up);
    chk.textContent = S.check; rst.textContent = S.tryAgain;
    document.getElementById('lcs-cele-title').textContent = S.youDidIt; document.getElementById('lcs-cele-print').textContent = S.print;
    document.getElementById('lcs-cele-close').textContent = S.tryAgain;
    chk.addEventListener('click', check); rst.addEventListener('click', reset); document.getElementById('lcs-cele-close').addEventListener('click', reset);
    window.__lcsClock = { K: K, VW: VW, VH: VH };
    draw();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}

const JS_SET_CLOCK = '(' + setClockRuntime.toString() + ')();';
const CSS_SET_CLOCK = [
  '.lcs-face{position:absolute;border-radius:50%;touch-action:none;cursor:grab;-webkit-tap-highlight-color:transparent}',
  '.lcs-hand{position:absolute;width:48px;height:48px;margin:0;padding:0;border:0;border-radius:50%;background:transparent;transform:translate(-50%,-50%);touch-action:none;cursor:grab;z-index:2;-webkit-tap-highlight-color:transparent}',
  '.lcs-hand:focus-visible{outline:4px solid #4E5FE8;outline-offset:2px}',
].join('\n');
// the robot's poison seam: a runtime that marks every clock right must be caught
if (!JS_SET_CLOCK.includes('var right=hourOk&&minOk;')) throw new Error('interactive-set-clock: the judge seam moved');

module.exports = { JS_SET_CLOCK, CSS_SET_CLOCK };
