/**
 * interactive-type-plus.js — the `type-number` runtime for pages where writing numbers is not the whole task
 * (Level Set 2026-10-14, Odd and Even Numbers). Chosen by emit/interactive-runtime.js only when the bundle's ctx carries
 * `sortSets` or `picks`; every other type-number deck keeps JS_TYPE byte-for-byte.
 *
 *   ctx.sortSets {key: [n, ...]}  boxes stamped `data-lcs-set="<key>"` take ANY number of their set, each number once
 *                                 anywhere (the Odd House / Even House page: write each number in its house). A house
 *                                 has more boxes than numbers, so spare boxes may stay empty; Check waits until as many
 *                                 boxes are filled as there are numbers to place.
 *   ctx.picks [{options:[{x,y,w,h,label}], answer, meta}]   printed choices to TAP as well (circle odd or even): one
 *                                 per group, graded with the boxes.
 *
 * Written as a real function and shipped as its source (no escaping layer). ES5 only — it runs in every deck page.
 * The single `R()` judge is the poison seam of qa/verify-interactive.js ("a runtime that marks everything right").
 */
'use strict';
/* eslint-disable no-var */
function runtime() {
  var B = window.DECK_BUNDLE, S = B.strings, C = B.ctx || {}, MX = C.maxDigits || 2, SETS = C.sortSets || null, PK = C.picks || [];
  var els = [], val = [], cur = 0, phase = 'fill', pel = [], pick = [];
  var ov = document.getElementById('lcs-overlay'), pad = document.getElementById('lcs-pad'), chk = document.getElementById('lcs-check'), rst = document.getElementById('lcs-reset'), prg = document.getElementById('lcs-progress'), cel = document.getElementById('lcs-celebration');
  var R = function (x) { return x; };
  function fmt(s, v) { return s.replace(/\{(\w+)\}/g, function (_, k) { return v[k] != null ? v[k] : ''; }); }
  function setOf(i) { var m = B.items[i].meta || {}; return m['data-lcs-set'] || null; }
  function need() { var n = 0; if (SETS) for (var k in SETS) n += SETS[k].length; return n; }
  function ready() {
    var filled = 0;
    for (var i = 0; i < els.length; i++) { if (setOf(i)) { if (val[i] !== '') filled++; } else if (val[i] === '') return false; }
    if (SETS && filled < need()) return false;
    for (var j = 0; j < pick.length; j++) if (pick[j] < 0) return false;
    return true;
  }
  function paint() {
    for (var i = 0; i < els.length; i++) {
      els[i].textContent = val[i];
      els[i].setAttribute('aria-pressed', i === cur && phase === 'fill' ? 'true' : 'false');
      els[i].setAttribute('aria-label', (B.items[i].label || '') + (val[i] ? ' = ' + val[i] : ''));
    }
    for (var j = 0; j < pel.length; j++) for (var k = 0; k < pel[j].length; k++) pel[j][k].setAttribute('aria-pressed', pick[j] === k ? 'true' : 'false');
    chk.disabled = !ready() || phase !== 'fill';
    var ks = pad.querySelectorAll('.lcs-key'); for (var q = 0; q < ks.length; q++) ks[q].disabled = phase !== 'fill';
  }
  function sel(i) { if (phase !== 'fill') return; cur = i; paint(); try { els[i].focus({ preventScroll: true }); } catch (e) { /* old browsers */ } }
  function firstEmpty() { for (var j = 0; j < val.length; j++) if (val[j] === '') return j; return -1; }
  function type(d) { if (phase !== 'fill') return; if (cur < 0 || cur >= els.length) { cur = firstEmpty(); if (cur < 0) return; } if (val[cur].length >= MX) return; val[cur] += d; paint(); }
  function back() { if (phase !== 'fill' || cur < 0) return; val[cur] = val[cur].slice(0, -1); paint(); }
  function show(i) { if (i < 0 || !els[i]) return; var r = els[i].getBoundingClientRect(), q = pad.getBoundingClientRect(), vh = window.innerHeight; var lim = q.top < vh ? q.top : vh; if (r.bottom > lim - 10) window.scrollBy(0, r.bottom - lim + 18); else if (r.top < 10) window.scrollBy(0, r.top - 18); }
  function step(dir) { if (phase !== 'fill' || !els.length) return; cur = dir < 0 ? (cur <= 0 ? els.length - 1 : cur - 1) : (cur + 1) % els.length; paint(); try { els[cur].focus({ preventScroll: true }); } catch (e) { /* old browsers */ } show(cur); }
  function tapPick(j, k) { if (phase !== 'fill') return; pick[j] = pick[j] === k ? -1 : k; paint(); }
  function grade() {
    var ok = 0, tot = 0, bad = 0, used = {};
    for (var i = 0; i < els.length; i++) {
      var g = setOf(i), right;
      if (g) {
        if (val[i] === '') { els[i].removeAttribute('data-state'); continue; }
        var v = parseInt(val[i], 10);
        right = R(!!(SETS && SETS[g] && SETS[g].indexOf(v) >= 0 && !used[v]));
        if (right) used[v] = 1;
      } else { tot++; right = R(parseInt(val[i], 10) === B.answers[i]); }
      els[i].setAttribute('data-state', right ? 'right' : 'wrong');
      if (right) ok++; else bad++;
    }
    if (SETS) tot += need();
    for (var j = 0; j < pel.length; j++) {
      tot++;
      var r2 = R(pick[j] === PK[j].answer);
      pel[j][pick[j]].setAttribute('data-state', r2 ? 'right' : 'wrong');
      if (r2) ok++; else bad++;
    }
    return [ok, tot, bad];
  }
  function check() {
    if (!ready()) return;
    phase = 'reviewed';
    var g = grade();
    prg.textContent = fmt(S.score, { n: g[0], total: g[1] });
    chk.hidden = true; rst.hidden = false; paint();
    if (g[0] === g[1] && g[2] === 0) setTimeout(function () { cel.hidden = false; var c = document.getElementById('lcs-cele-close'); if (c) c.focus(); }, 450);
  }
  // Try again keeps everything right and empties / un-taps only what was wrong
  function retry() {
    phase = 'fill'; var first = -1;
    for (var i = 0; i < els.length; i++) { if (els[i].getAttribute('data-state') === 'wrong') { val[i] = ''; if (first < 0) first = i; } els[i].removeAttribute('data-state'); }
    for (var j = 0; j < pel.length; j++) for (var k = 0; k < pel[j].length; k++) { if (pel[j][k].getAttribute('data-state') === 'wrong') pick[j] = -1; pel[j][k].removeAttribute('data-state'); }
    cur = first < 0 ? 0 : first; prg.textContent = ''; chk.hidden = false; rst.hidden = true; cel.hidden = true; paint(); show(cur);
  }
  function reset() {
    phase = 'fill';
    for (var i = 0; i < els.length; i++) { val[i] = ''; els[i].removeAttribute('data-state'); }
    for (var j = 0; j < pel.length; j++) { pick[j] = -1; for (var k = 0; k < pel[j].length; k++) pel[j][k].removeAttribute('data-state'); }
    cur = 0; prg.textContent = ''; chk.hidden = false; rst.hidden = true; cel.hidden = true; paint();
  }
  function key(lab, fn, cls, aria) { var b = document.createElement('button'); b.type = 'button'; b.className = 'lcs-key' + (cls ? ' ' + cls : ''); b.textContent = lab; b.setAttribute('aria-label', aria || lab); b.addEventListener('click', fn); pad.appendChild(b); }
  function place(el, r) { el.style.left = r.x + '%'; el.style.top = r.y + '%'; el.style.width = r.w + '%'; el.style.height = r.h + '%'; }
  function init() {
    for (var i = 0; i < B.items.length; i++) {
      (function (i) {
        var it = B.items[i], el = document.createElement('button');
        el.type = 'button'; el.className = 'lcs-wr'; val[i] = '';
        place(el, it); el.style.fontSize = (it.w * 0.36) + 'cqw';
        el.addEventListener('click', function () { sel(i); });
        ov.appendChild(el); els.push(el);
      })(i);
    }
    for (var j = 0; j < PK.length; j++) {
      (function (j) {
        var p = PK[j]; pel[j] = []; pick[j] = -1;
        for (var k = 0; k < p.options.length; k++) {
          (function (k) {
            var o = p.options[k], el = document.createElement('button');
            el.type = 'button'; el.className = 'lcs-opt'; el.setAttribute('aria-label', o.label); el.setAttribute('aria-pressed', 'false');
            place(el, o); el.addEventListener('click', function () { tapPick(j, k); });
            ov.appendChild(el); pel[j].push(el);
          })(k);
        }
      })(j);
    }
    ['1', '2', '3', '4', '5'].forEach(function (d) { key(d, function () { type(d); }); });
    key('⌫', back, 'lcs-key--fn', '⌫');
    ['6', '7', '8', '9', '0'].forEach(function (d) { key(d, function () { type(d); }); });
    key('→', function () { step(1); }, 'lcs-key--fn', '→');
    document.addEventListener('keydown', function (e) {
      if (phase !== 'fill' || e.ctrlKey || e.metaKey || e.altKey) return;
      var a = document.activeElement;
      if (/^[0-9]$/.test(e.key)) { type(e.key); e.preventDefault(); }
      else if (e.key === 'Backspace' || e.key === 'Delete') { back(); e.preventDefault(); }
      else if (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === 'ArrowDown') { if (e.key === 'Enter' && a && a.classList && (a.classList.contains('lcs-btn') || a.classList.contains('lcs-key') || a.classList.contains('lcs-opt'))) return; step(1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { step(-1); e.preventDefault(); }
    });
    chk.textContent = S.check; rst.textContent = S.tryAgain;
    document.getElementById('lcs-cele-title').textContent = S.youDidIt; document.getElementById('lcs-cele-print').textContent = S.print; document.getElementById('lcs-cele-close').textContent = S.tryAgain;
    chk.addEventListener('click', check); rst.addEventListener('click', retry); document.getElementById('lcs-cele-close').addEventListener('click', reset);
    paint();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}

const JS_TYPE_PLUS = '(' + runtime.toString() + ')();';
/** the seam the poison gate edits: one judge for every right/wrong decision */
const JUDGE = 'var R = function (x) { return x; };';
if (!JS_TYPE_PLUS.includes(JUDGE)) throw new Error('interactive-type-plus: the judge seam moved');

module.exports = { JS_TYPE_PLUS, JUDGE };
