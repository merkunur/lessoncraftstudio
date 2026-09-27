/**
 * emit/interactive-runtime.js — the screen version of a worksheet-gen page
 * (Level Set programme 2026-09-27; the FIRST worksheet-gen interactive runtime).
 *
 * Architecture = the 29 apps' (CLAUDE.md §14.1): the rendered page is the
 * backdrop image; a tap layer sits over it, positioned in % of the page, so it
 * scales with the viewport. Plain HTML + CSS + vanilla JS, self-contained,
 * iframe-safe, Pointer-agnostic (native <button>s: mouse, touch, keyboard).
 *
 * Kinds (the type declares `interactive.kind`; render-instance captures the geometry):
 *   tap-order — the child taps the items in order; each tap writes the next number
 *               in the item's circle, a second tap takes it back (later numbers close
 *               up). Check turns every item green or red; all right → celebration.
 *
 * UI strings come from REFERENCE TRANSLATIONS/translations-shared.js (the apps'
 * runtime* keys, all 11 locales) and are BAKED into the page (§14.11) and force-set
 * at init — no runtime dependency on any other file.
 *
 * DECK_BUNDLE.items[i] = { x, y, w, h, sx, sy, sw, sh, label } in % of the page;
 * the answer map (DECK_BUNDLE.answers) is on the page by necessity (it is checked
 * in the browser), exactly as the apps' bundles are.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const KINDS = new Set(['tap-order']);
let _shared = null;
function shared() {
  if (_shared) return _shared;
  const src = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'REFERENCE TRANSLATIONS', 'translations-shared.js'), 'utf8');
  const ctx = { window: {}, console: { warn() {}, log() {}, error() {} } };
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  _shared = ctx.window.SHARED_TRANSLATIONS;
  if (!_shared || !_shared.en) throw new Error('interactive-runtime: translations-shared.js exposed no SHARED_TRANSLATIONS');
  return _shared;
}

/** The runtime strings for one locale — every key must exist (never an English fallback on a non-EN page). */
function runtimeStrings(locale) {
  const t = shared()[locale];
  if (!t) throw new Error('interactive-runtime: no shared translations for ' + locale);
  const pick = { check: 'runtimeCheckAnswers', tryAgain: 'runtimeTryAgain', youDidIt: 'runtimeYouDidIt', allCorrect: 'runtimeAllCorrect', score: 'runtimeScore', print: 'runtimePrintMyWorksheet' };
  const out = {};
  for (const [k, key] of Object.entries(pick)) {
    if (typeof t[key] !== 'string' || !t[key].trim()) throw new Error('interactive-runtime: ' + locale + ' has no ' + key);
    out[k] = t[key];
  }
  if (!/\{n\}/.test(out.score) || !/\{total\}/.test(out.score)) throw new Error('interactive-runtime: ' + locale + ' runtimeScore lacks {n}/{total}');
  return out;
}

const CSS = [
  '.lcs-stage{position:relative;container-type:inline-size}',
  '.lcs-stage .lcs-worksheet__img{position:relative;z-index:0}',
  '#lcs-overlay{position:absolute;inset:0;z-index:1}',
  '.lcs-item{position:absolute;margin:0;padding:0;border:0;background:transparent;border-radius:14px;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}',
  '.lcs-item:focus-visible{outline:4px solid #4E5FE8;outline-offset:2px}',
  '.lcs-item[data-state="right"]{box-shadow:0 0 0 5px #2E9E5B;background:rgba(46,158,91,.10)}',
  '.lcs-item[data-state="wrong"]{box-shadow:0 0 0 5px #D64545;background:rgba(214,69,69,.10)}',
  '.lcs-badge{position:absolute;display:flex;align-items:center;justify-content:center;border-radius:50%;font-family:"Baloo 2",Nunito,sans-serif;font-weight:700;line-height:1;color:#FFF;background:#146B5E;pointer-events:none;transform:scale(0);transition:transform .15s}',
  '.lcs-badge.on{transform:scale(1)}',
  '.lcs-item[data-state="wrong"] .lcs-badge{background:#D64545}',
  '.lcs-item[data-state="right"] .lcs-badge{background:#2E9E5B}',
  '.lcs-controls{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;margin:14px 0 22px}',
  '.lcs-btn{font-family:"Baloo 2",Nunito,sans-serif;font-size:1.15rem;font-weight:600;min-height:48px;padding:10px 28px;border-radius:999px;border:0;cursor:pointer;background:#146B5E;color:#FFF}',
  '.lcs-btn[disabled]{background:#B8C4C1;cursor:not-allowed}',
  '.lcs-btn--ghost{background:#FFF;color:#146B5E;box-shadow:inset 0 0 0 2px #146B5E}',
  '#lcs-progress{font-weight:700;color:#3D3D3F;min-width:6em;text-align:center}',
  '#lcs-celebration{position:fixed;inset:0;z-index:20;display:flex;align-items:center;justify-content:center;background:rgba(28,28,30,.45);padding:16px}',
  '#lcs-celebration[hidden]{display:none}',
  '.lcs-cele-card{background:#FBF3E4;border-radius:22px;padding:26px 22px;max-width:420px;width:100%;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,.25)}',
  '.lcs-cele-stars{font-size:2.6rem;color:#F2B84B;letter-spacing:.2em}',
  '.lcs-cele-card h2{font-family:"Baloo 2",Nunito,sans-serif;color:#146B5E;font-size:1.8rem;margin:6px 0 16px}',
  '.lcs-cele-card .lcs-btn{display:inline-block;margin:6px;text-decoration:none}',
  '@media print{.lcs-controls,#lcs-celebration,#lcs-overlay{display:none !important}}',
].join('\n');

/* The runtime, as source lines (joined at emit; no template literals inside). */
const JS = [
  '(function(){',
  'var B=window.DECK_BUNDLE,S=B.strings,items=[],order=[],phase="fill";',
  'var ov=document.getElementById("lcs-overlay"),chk=document.getElementById("lcs-check"),rst=document.getElementById("lcs-reset"),prg=document.getElementById("lcs-progress"),cel=document.getElementById("lcs-celebration");',
  'function fmt(s,v){return s.replace(/\\{(\\w+)\\}/g,function(_,k){return v[k]!=null?v[k]:""})}',
  'function paint(){for(var i=0;i<items.length;i++){var p=order.indexOf(i),b=items[i].badge;if(p>=0){b.textContent=String(p+1);b.className="lcs-badge on"}else{b.textContent="";b.className="lcs-badge"}}chk.disabled=order.length!==items.length||phase!=="fill";}',
  'function tap(i){if(phase!=="fill")return;var p=order.indexOf(i);if(p>=0)order.splice(p,1);else order.push(i);paint()}',
  'function check(){if(order.length!==items.length)return;phase="reviewed";var ok=0;for(var i=0;i<items.length;i++){var right=B.answers[i]===order.indexOf(i)+1;items[i].el.setAttribute("data-state",right?"right":"wrong");if(right)ok++}',
  'prg.textContent=fmt(S.score,{n:ok,total:items.length});chk.hidden=true;rst.hidden=false;paint();if(ok===items.length){setTimeout(function(){cel.hidden=false;var c=document.getElementById("lcs-cele-close");if(c)c.focus()},450)}}',
  'function reset(){order=[];phase="fill";for(var i=0;i<items.length;i++)items[i].el.removeAttribute("data-state");prg.textContent="";chk.hidden=false;rst.hidden=true;cel.hidden=true;paint()}',
  'function init(){for(var i=0;i<B.items.length;i++){(function(i){var it=B.items[i],el=document.createElement("button");el.type="button";el.className="lcs-item";el.setAttribute("aria-label",it.label);',
  'el.style.left=it.x+"%";el.style.top=it.y+"%";el.style.width=it.w+"%";el.style.height=it.h+"%";',
  'var b=document.createElement("span");b.className="lcs-badge";b.setAttribute("aria-hidden","true");b.style.left=((it.sx-it.x)/it.w*100)+"%";b.style.top=((it.sy-it.y)/it.h*100)+"%";b.style.width=(it.sw/it.w*100)+"%";b.style.height=(it.sh/it.h*100)+"%";b.style.fontSize=(it.sw*0.62)+"cqw";',
  'el.appendChild(b);el.addEventListener("click",function(){tap(i)});ov.appendChild(el);items.push({el:el,badge:b})})(i)}',
  'chk.textContent=S.check;rst.textContent=S.tryAgain;document.getElementById("lcs-cele-title").textContent=S.youDidIt;document.getElementById("lcs-cele-print").textContent=S.print;document.getElementById("lcs-cele-close").textContent=S.tryAgain;',
  'chk.addEventListener("click",check);rst.addEventListener("click",reset);document.getElementById("lcs-cele-close").addEventListener("click",reset);paint()}',
  'if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();',
  '})();',
].join('\n');

/**
 * @param {object} o { kind, locale, items: [{x,y,w,h,sx,sy,sw,sh,label,answer}] (% of page) }
 * @returns {{ css, stageOpen, stageClose, controls, script }}
 */
function buildInteractive(o) {
  if (!KINDS.has(o.kind)) throw new Error('interactive-runtime: unknown kind ' + o.kind);
  const items = o.items || [];
  if (items.length < 2) throw new Error('interactive-runtime: fewer than 2 items');
  const answers = items.map((it) => it.answer);
  const want = items.map((_, i) => i + 1).join(',');
  if (answers.slice().sort((a, b) => a - b).join(',') !== want) throw new Error('interactive-runtime: tap-order answers are not a permutation of 1..' + items.length);
  for (const it of items) {
    for (const k of ['x', 'y', 'w', 'h', 'sx', 'sy', 'sw', 'sh']) if (!(Number.isFinite(it[k]) && it[k] >= -5 && it[k] <= 105)) throw new Error('interactive-runtime: item ' + k + '=' + it[k] + ' outside the page');
  }
  const S = runtimeStrings(o.locale);
  const round = (v) => Math.round(v * 1000) / 1000;
  const bundle = {
    kind: o.kind, locale: o.locale, strings: S,
    items: items.map((it) => ({ x: round(it.x), y: round(it.y), w: round(it.w), h: round(it.h), sx: round(it.sx), sy: round(it.sy), sw: round(it.sw), sh: round(it.sh), label: it.label })),
    answers,
  };
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  return {
    css: CSS,
    stageOpen: '<div class="lcs-stage" id="lcs-stage">',
    stageClose: '<div id="lcs-overlay"></div></div>',
    controls: [
      '<div class="lcs-controls">',
      '  <button type="button" class="lcs-btn" id="lcs-check" disabled>' + esc(S.check) + '</button>',
      '  <button type="button" class="lcs-btn lcs-btn--ghost" id="lcs-reset" hidden>' + esc(S.tryAgain) + '</button>',
      '  <span id="lcs-progress" aria-live="polite"></span>',
      '</div>',
      '<div id="lcs-celebration" role="dialog" aria-modal="true" aria-labelledby="lcs-cele-title" hidden><div class="lcs-cele-card">',
      '  <div class="lcs-cele-stars" aria-hidden="true">★★★</div>',
      '  <h2 id="lcs-cele-title">' + esc(S.youDidIt) + '</h2>',
      '  <a class="lcs-btn" id="lcs-cele-print" href="__PDF_URL__">' + esc(S.print) + '</a>',
      '  <button type="button" class="lcs-btn lcs-btn--ghost" id="lcs-cele-close">' + esc(S.tryAgain) + '</button>',
      '</div></div>',
    ].join('\n'),
    // `<` escaped inside the JSON so no string can close the script element
    script: '<script>window.DECK_BUNDLE=' + JSON.stringify(bundle).replace(/</g, '\\u003c') + ';</script>\n<script>' + JS + '</script>',
  };
}

module.exports = { buildInteractive, runtimeStrings, KINDS };
