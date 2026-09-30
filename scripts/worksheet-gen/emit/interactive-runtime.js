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
 *   tap-order  — the child taps the items in order; each tap writes the next number
 *                in the item's circle, a second tap takes it back (later numbers close
 *                up). Check turns every item green or red; all right → celebration.
 *   tap-choice — each item has options (article chips …); the child taps ONE per item
 *                (another tap switches it). Check marks the chosen option green or red.
 *   tap-select — each item is ONE tap target that toggles (tap every word that is a compound);
 *                the answer per item is true / false. Check (enabled once something is
 *                chosen) marks each chosen item green or red and each MISSED true item red.
 *   tap-spell  — each item has shuffled letter TILES and empty letter SLOTS (Level Set 2026-09-28, the
 *                spelling pages): a tapped tile writes its letter into the next empty slot and greys out;
 *                a tap on a filled slot gives back that letter and every later one. Check compares the
 *                spelled word with the answer (any tile with the same letter counts) and marks the item.
 *   tap-edit   — sentences drawn LIVE as word buttons (not over the image: they must stay
 *                >= 44 px on a phone). A tool row — Aa and the level's marks — and a tap on a
 *                word: Aa toggles its capital, a mark goes after it (tap again = off). Check
 *                marks each sentence green or red. es shows the opening ¿ / ¡ automatically.
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

const KINDS = new Set(['tap-order', 'tap-choice', 'tap-edit', 'tap-select', 'tap-spell']);
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
  '.lcs-opt{position:absolute;margin:0;padding:0;border:0;background:transparent;border-radius:14px;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}',
  '.lcs-opt:focus-visible{outline:4px solid #4E5FE8;outline-offset:2px}',
  '.lcs-opt[aria-pressed="true"]{box-shadow:0 0 0 5px #146B5E;background:rgba(20,107,94,.12)}',
  '.lcs-opt[data-state="right"]{box-shadow:0 0 0 6px #2E9E5B;background:rgba(46,158,91,.16)}',
  '.lcs-opt[data-state="wrong"]{box-shadow:0 0 0 6px #D64545;background:rgba(214,69,69,.16)}',
  '.lcs-opt[data-state="missed"]{box-shadow:0 0 0 5px #D64545;background:transparent;outline:3px dashed #D64545;outline-offset:3px}',
  '.lcs-tools{position:sticky;top:0;z-index:5;display:flex;justify-content:center;gap:10px;padding:10px 0;background:var(--cream)}',
  '.lcs-tool{min-width:64px;min-height:52px;border-radius:14px;border:3px solid #146B5E;background:#FFF;color:#146B5E;font-family:"Baloo 2",Nunito,sans-serif;font-size:1.6rem;font-weight:700;cursor:pointer}',
  '.lcs-tool[aria-pressed="true"]{background:#146B5E;color:#FFF}',
  '#lcs-lanes{display:flex;flex-direction:column;gap:12px;max-width:720px;margin:0 auto}',
  '.lcs-lane{display:flex;align-items:center;gap:12px;background:#FFF;border:2px solid #EFE4D2;border-radius:16px;padding:10px 12px}',
  '.lcs-lane img{width:52px;height:52px;flex-shrink:0}',
  '.lcs-lane[data-state="right"]{border-color:#2E9E5B;box-shadow:0 0 0 3px #2E9E5B}',
  '.lcs-lane[data-state="wrong"]{border-color:#D64545;box-shadow:0 0 0 3px #D64545}',
  '.lcs-words{display:flex;flex-wrap:wrap;gap:8px;align-items:center}',
  '.lcs-tok{min-height:48px;min-width:44px;padding:4px 12px;border-radius:12px;border:2px solid #DCE1E6;background:#FBF8F2;font-family:Nunito,system-ui,sans-serif;font-weight:800;font-size:clamp(19px,4.2vw,26px);color:#3A3530;cursor:pointer;touch-action:manipulation}',
  '.lcs-tok:focus-visible{outline:3px solid #4E5FE8;outline-offset:2px}',
  '.lcs-tok .cap{color:#146B5E}',
  '.lcs-tok .mk{color:#F2784B;margin-left:1px}',
  '.lcs-split{font-weight:800;color:#B8AFA0;font-size:clamp(19px,4.2vw,26px)}',
  '.lcs-tile{position:absolute;margin:0;padding:0;border:0;background:transparent;border-radius:12px;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}',
  '.lcs-tile:focus-visible{outline:4px solid #4E5FE8;outline-offset:2px}',
  '.lcs-tile[data-used="1"]{background:rgba(236,230,218,.94);box-shadow:inset 0 0 0 2px #D8CFBE;cursor:default}',
  '.lcs-slot{position:absolute;margin:0;padding:0;border:0;background:transparent;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:"Baloo 2",Nunito,sans-serif;font-weight:700;line-height:1;color:#146B5E;cursor:pointer;touch-action:manipulation}',
  '.lcs-slot[data-state="right"]{background:rgba(46,158,91,.18);box-shadow:0 0 0 4px #2E9E5B}',
  '.lcs-slot[data-state="wrong"]{background:rgba(214,69,69,.14);box-shadow:0 0 0 4px #D64545}',
  '@media print{.lcs-controls,#lcs-celebration,#lcs-overlay,.lcs-tools{display:none !important}}',
].join('\n');

/* The runtime, as source lines (joined at emit; no template literals inside). */
const JS_CHOICE = [
  '(function(){',
  'var B=window.DECK_BUNDLE,S=B.strings,opts=[],pick=[],phase="fill";',
  'var ov=document.getElementById("lcs-overlay"),chk=document.getElementById("lcs-check"),rst=document.getElementById("lcs-reset"),prg=document.getElementById("lcs-progress"),cel=document.getElementById("lcs-celebration");',
  'function fmt(s,v){return s.replace(/\\{(\\w+)\\}/g,function(_,k){return v[k]!=null?v[k]:""})}',
  'function paint(){var all=true;for(var i=0;i<opts.length;i++){if(pick[i]<0)all=false;for(var j=0;j<opts[i].length;j++)opts[i][j].setAttribute("aria-pressed",pick[i]===j?"true":"false")}chk.disabled=!all||phase!=="fill"}',
  'function tap(i,j){if(phase!=="fill")return;pick[i]=pick[i]===j?-1:j;paint()}',
  'function check(){for(var i=0;i<pick.length;i++)if(pick[i]<0)return;phase="reviewed";var ok=0;for(var i=0;i<opts.length;i++){var right=B.answers[i]===pick[i];opts[i][pick[i]].setAttribute("data-state",right?"right":"wrong");if(right)ok++}',
  'prg.textContent=fmt(S.score,{n:ok,total:opts.length});chk.hidden=true;rst.hidden=false;paint();if(ok===opts.length){setTimeout(function(){cel.hidden=false;var c=document.getElementById("lcs-cele-close");if(c)c.focus()},450)}}',
  'function reset(){phase="fill";for(var i=0;i<opts.length;i++){pick[i]=-1;for(var j=0;j<opts[i].length;j++)opts[i][j].removeAttribute("data-state")}prg.textContent="";chk.hidden=false;rst.hidden=true;cel.hidden=true;paint()}',
  'function init(){for(var i=0;i<B.items.length;i++){(function(i){var it=B.items[i];opts[i]=[];pick[i]=-1;for(var j=0;j<it.options.length;j++){(function(j){var o=it.options[j],el=document.createElement("button");el.type="button";el.className="lcs-opt";el.setAttribute("aria-label",o.label+(it.label?" — "+it.label:""));el.setAttribute("aria-pressed","false");',
  'el.style.left=o.x+"%";el.style.top=o.y+"%";el.style.width=o.w+"%";el.style.height=o.h+"%";el.addEventListener("click",function(){tap(i,j)});ov.appendChild(el);opts[i].push(el)})(j)}})(i)}',
  'chk.textContent=S.check;rst.textContent=S.tryAgain;document.getElementById("lcs-cele-title").textContent=S.youDidIt;document.getElementById("lcs-cele-print").textContent=S.print;document.getElementById("lcs-cele-close").textContent=S.tryAgain;',
  'chk.addEventListener("click",check);rst.addEventListener("click",reset);document.getElementById("lcs-cele-close").addEventListener("click",reset);paint()}',
  'if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();',
  '})();',
].join('\n');

const JS_SELECT = [
  '(function(){',
  'var B=window.DECK_BUNDLE,S=B.strings,els=[],sel=[],phase="fill";',
  'var ov=document.getElementById("lcs-overlay"),chk=document.getElementById("lcs-check"),rst=document.getElementById("lcs-reset"),prg=document.getElementById("lcs-progress"),cel=document.getElementById("lcs-celebration");',
  'function fmt(s,v){return s.replace(/\\{(\\w+)\\}/g,function(_,k){return v[k]!=null?v[k]:""})}',
  'function paint(){var any=false;for(var i=0;i<els.length;i++){els[i].setAttribute("aria-pressed",sel[i]?"true":"false");if(sel[i])any=true}chk.disabled=!any||phase!=="fill"}',
  'function tap(i){if(phase!=="fill")return;sel[i]=!sel[i];paint()}',
  'function check(){phase="reviewed";var ok=0;for(var i=0;i<els.length;i++){var right=B.answers[i]===sel[i];if(right)ok++;if(sel[i])els[i].setAttribute("data-state",right?"right":"wrong");else if(!right)els[i].setAttribute("data-state","missed")}',
  'prg.textContent=fmt(S.score,{n:ok,total:els.length});chk.hidden=true;rst.hidden=false;paint();if(ok===els.length){setTimeout(function(){cel.hidden=false;var c=document.getElementById("lcs-cele-close");if(c)c.focus()},450)}}',
  'function reset(){phase="fill";for(var i=0;i<els.length;i++){sel[i]=false;els[i].removeAttribute("data-state")}prg.textContent="";chk.hidden=false;rst.hidden=true;cel.hidden=true;paint()}',
  'function init(){for(var i=0;i<B.items.length;i++){(function(i){var it=B.items[i],el=document.createElement("button");el.type="button";el.className="lcs-opt";el.setAttribute("aria-label",it.label);sel[i]=false;',
  'el.style.left=it.x+"%";el.style.top=it.y+"%";el.style.width=it.w+"%";el.style.height=it.h+"%";el.addEventListener("click",function(){tap(i)});ov.appendChild(el);els.push(el)})(i)}',
  'chk.textContent=S.check;rst.textContent=S.tryAgain;document.getElementById("lcs-cele-title").textContent=S.youDidIt;document.getElementById("lcs-cele-print").textContent=S.print;document.getElementById("lcs-cele-close").textContent=S.tryAgain;',
  'chk.addEventListener("click",check);rst.addEventListener("click",reset);document.getElementById("lcs-cele-close").addEventListener("click",reset);paint()}',
  'if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();',
  '})();',
].join('\n');

const JS_EDIT = [
  '(function(){',
  'var B=window.DECK_BUNDLE,S=B.strings,lanes=[],tool="cap",phase="fill";',
  'var host=document.getElementById("lcs-lanes"),tb=document.getElementById("lcs-tools"),chk=document.getElementById("lcs-check"),rst=document.getElementById("lcs-reset"),prg=document.getElementById("lcs-progress"),cel=document.getElementById("lcs-celebration");',
  'function fmt(s,v){return s.replace(/\\{(\\w+)\\}/g,function(_,k){return v[k]!=null?v[k]:""})}',
  'function up(w){var c=Array.from(w);return c.length?c[0].toLocaleUpperCase(B.locale)+c.slice(1).join(""):w}',
  'function openFor(L,k){if(B.locale!=="es")return "";var st=0;for(var j=0;j<k;j++)if(L.mark[j])st=j+1;var e=k;while(e<L.mark.length-1&&!L.mark[e])e++;var m=L.mark[e];if(k!==st)return "";return m==="?"?"¿":(m==="!"?"¡":"")}',
  'function paintLane(L){for(var k=0;k<L.btn.length;k++){var b=L.btn[k],w=L.words[k];b.innerHTML="";var o=openFor(L,k);if(o){var sp=document.createElement("span");sp.className="mk";sp.textContent=o;b.appendChild(sp)}var t=document.createElement("span");if(L.cap[k]){t.className="cap";t.textContent=up(w)}else t.textContent=w;b.appendChild(t);if(L.mark[k]){var m=document.createElement("span");m.className="mk";m.textContent=L.mark[k];b.appendChild(m)}b.setAttribute("aria-label",b.textContent)}}',
  'function tap(L,k){if(phase!=="fill")return;if(tool==="cap")L.cap[k]=!L.cap[k];else L.mark[k]=L.mark[k]===tool?"":tool;paintLane(L)}',
  'function check(){phase="reviewed";var ok=0;for(var i=0;i<lanes.length;i++){var L=lanes[i],a=B.answers[i],right=true;for(var k=0;k<L.words.length;k++){if(!!L.cap[k]!==!!a[k].cap||(L.mark[k]||"")!==(a[k].mark||""))right=false}L.el.setAttribute("data-state",right?"right":"wrong");if(right)ok++}',
  'prg.textContent=fmt(S.score,{n:ok,total:lanes.length});chk.hidden=true;rst.hidden=false;if(ok===lanes.length){setTimeout(function(){cel.hidden=false;var c=document.getElementById("lcs-cele-close");if(c)c.focus()},450)}}',
  'function reset(){phase="fill";for(var i=0;i<lanes.length;i++){var L=lanes[i];L.el.removeAttribute("data-state");for(var k=0;k<L.words.length;k++){L.cap[k]=false;L.mark[k]=""}paintLane(L)}prg.textContent="";chk.hidden=false;rst.hidden=true;cel.hidden=true}',
  'function setTool(t){tool=t;var bs=tb.querySelectorAll(".lcs-tool");for(var i=0;i<bs.length;i++)bs[i].setAttribute("aria-pressed",bs[i].getAttribute("data-tool")===t?"true":"false")}',
  'function init(){var tools=["cap"].concat(B.marks.split(""));tools.forEach(function(t){var b=document.createElement("button");b.type="button";b.className="lcs-tool";b.setAttribute("data-tool",t);b.textContent=t==="cap"?"Aa":t;b.setAttribute("aria-pressed","false");b.addEventListener("click",function(){setTool(t)});tb.appendChild(b)});setTool("cap");',
  'for(var i=0;i<B.items.length;i++){(function(i){var it=B.items[i],el=document.createElement("div");el.className="lcs-lane";var im=document.createElement("img");im.src=it.icon;im.alt="";el.appendChild(im);var wr=document.createElement("div");wr.className="lcs-words";el.appendChild(wr);',
  'var L={el:el,words:it.words,cap:[],mark:[],btn:[]};for(var k=0;k<it.words.length;k++){(function(k){L.cap[k]=false;L.mark[k]="";var b=document.createElement("button");b.type="button";b.className="lcs-tok";b.addEventListener("click",function(){tap(L,k)});wr.appendChild(b);L.btn.push(b);if(k===it.splitAfter){var s=document.createElement("span");s.className="lcs-split";s.textContent="/";s.setAttribute("aria-hidden","true");wr.appendChild(s)}})(k)}',
  'paintLane(L);host.appendChild(el);lanes.push(L)})(i)}',
  'chk.textContent=S.check;chk.disabled=false;rst.textContent=S.tryAgain;document.getElementById("lcs-cele-title").textContent=S.youDidIt;document.getElementById("lcs-cele-print").textContent=S.print;document.getElementById("lcs-cele-close").textContent=S.tryAgain;',
  'chk.addEventListener("click",check);rst.addEventListener("click",reset);document.getElementById("lcs-cele-close").addEventListener("click",reset)}',
  'if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();',
  '})();',
].join('\n');

const JS_SPELL = [
  '(function(){',
  'var B=window.DECK_BUNDLE,S=B.strings,I=[],phase="fill";',
  'var ov=document.getElementById("lcs-overlay"),chk=document.getElementById("lcs-check"),rst=document.getElementById("lcs-reset"),prg=document.getElementById("lcs-progress"),cel=document.getElementById("lcs-celebration");',
  'function fmt(s,v){return s.replace(/\\{(\\w+)\\}/g,function(_,k){return v[k]!=null?v[k]:""})}',
  'function fold(s){return String(s).normalize("NFC").toLocaleLowerCase(B.locale)}',
  'function paint(){var all=true;for(var i=0;i<I.length;i++){var it=I[i];if(it.fill.length<it.slots.length)all=false;for(var k=0;k<it.slots.length;k++)it.slots[k].textContent=k<it.fill.length?B.items[i].tiles[it.fill[k]].label:"";for(var j=0;j<it.tiles.length;j++){if(it.fill.indexOf(j)>=0)it.tiles[j].setAttribute("data-used","1");else it.tiles[j].removeAttribute("data-used")}}chk.disabled=!all||phase!=="fill"}',
  'function tapTile(i,j){if(phase!=="fill")return;var it=I[i];if(it.fill.indexOf(j)>=0||it.fill.length>=it.slots.length)return;it.fill.push(j);paint()}',
  'function tapSlot(i,k){if(phase!=="fill")return;var it=I[i];if(k<it.fill.length){it.fill.length=k;paint()}}',
  'function check(){for(var i=0;i<I.length;i++)if(I[i].fill.length<I[i].slots.length)return;phase="reviewed";var ok=0;for(var i=0;i<I.length;i++){var it=I[i],w="";for(var k=0;k<it.fill.length;k++)w+=B.items[i].tiles[it.fill[k]].label;var right=fold(w)===fold(B.answers[i]);for(var k=0;k<it.slots.length;k++)it.slots[k].setAttribute("data-state",right?"right":"wrong");if(right)ok++}',
  'prg.textContent=fmt(S.score,{n:ok,total:I.length});chk.hidden=true;rst.hidden=false;paint();if(ok===I.length){setTimeout(function(){cel.hidden=false;var c=document.getElementById("lcs-cele-close");if(c)c.focus()},450)}}',
  'function reset(){phase="fill";for(var i=0;i<I.length;i++){I[i].fill=[];for(var k=0;k<I[i].slots.length;k++)I[i].slots[k].removeAttribute("data-state")}prg.textContent="";chk.hidden=false;rst.hidden=true;cel.hidden=true;paint()}',
  'function place(el,o){el.style.left=o.x+"%";el.style.top=o.y+"%";el.style.width=o.w+"%";el.style.height=o.h+"%"}',
  'function init(){for(var i=0;i<B.items.length;i++){(function(i){var it=B.items[i],rec={tiles:[],slots:[],fill:[]};',
  'for(var k=0;k<it.slots.length;k++){(function(k){var s=document.createElement("button");s.type="button";s.className="lcs-slot";s.setAttribute("aria-label",(it.label||"")+" "+(k+1));place(s,it.slots[k]);s.style.fontSize=Math.min(it.slots[k].w*0.62,it.slots[k].w*1.7/Math.max(1,it.tiles.reduce(function(a,t){return Math.max(a,String(t.label).length)},1)))+"cqw";s.addEventListener("click",function(){tapSlot(i,k)});ov.appendChild(s);rec.slots.push(s)})(k)}',
  'for(var j=0;j<it.tiles.length;j++){(function(j){var t=document.createElement("button");t.type="button";t.className="lcs-tile";t.setAttribute("aria-label",it.tiles[j].label);place(t,it.tiles[j]);t.addEventListener("click",function(){tapTile(i,j)});ov.appendChild(t);rec.tiles.push(t)})(j)}',
  'I.push(rec)})(i)}',
  'chk.textContent=S.check;rst.textContent=S.tryAgain;document.getElementById("lcs-cele-title").textContent=S.youDidIt;document.getElementById("lcs-cele-print").textContent=S.print;document.getElementById("lcs-cele-close").textContent=S.tryAgain;',
  'chk.addEventListener("click",check);rst.addEventListener("click",reset);document.getElementById("lcs-cele-close").addEventListener("click",reset);paint()}',
  'if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();',
  '})();',
].join('\n');

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
  const inPage = (v) => Number.isFinite(v) && v >= -5 && v <= 105;
  const round = (v) => Math.round(v * 1000) / 1000;
  const S = runtimeStrings(o.locale);
  let bundleItems;
  if (o.kind === 'tap-order') {
    const want = items.map((_, i) => i + 1).join(',');
    if (answers.slice().sort((a, b) => a - b).join(',') !== want) throw new Error('interactive-runtime: tap-order answers are not a permutation of 1..' + items.length);
    for (const it of items) {
      for (const k of ['x', 'y', 'w', 'h', 'sx', 'sy', 'sw', 'sh']) if (!inPage(it[k])) throw new Error('interactive-runtime: item ' + k + '=' + it[k] + ' outside the page');
    }
    bundleItems = items.map((it) => ({ x: round(it.x), y: round(it.y), w: round(it.w), h: round(it.h), sx: round(it.sx), sy: round(it.sy), sw: round(it.sw), sh: round(it.sh), label: it.label }));
  } else if (o.kind === 'tap-select') {
    if (!answers.every((a) => a === true || a === false)) throw new Error('interactive-runtime: tap-select answers must be true / false');
    if (!answers.some((a) => a) || answers.every((a) => a)) throw new Error('interactive-runtime: tap-select needs both kinds of item (something to find, something to leave)');
    for (const it of items) for (const k of ['x', 'y', 'w', 'h']) if (!inPage(it[k])) throw new Error('interactive-runtime: item ' + k + '=' + it[k] + ' outside the page');
    bundleItems = items.map((it) => ({ x: round(it.x), y: round(it.y), w: round(it.w), h: round(it.h), label: it.label || '', meta: it.meta || {} }));
  } else if (o.kind === 'tap-spell') {
    const gl = (s) => [...String(s).normalize('NFC')];
    for (const it of items) {
      if (typeof it.answer !== 'string' || !it.answer) throw new Error('interactive-runtime: tap-spell item without a word');
      const letters = gl(it.answer);
      // a tile may be one letter (Cloze) or one WORD (Sentence Building 2026-09-30): the tiles and slots pair up one to one,
      // and the tiles' labels together use exactly the answer's characters
      const chars = (s) => gl(s).sort().join('');
      const labels = Array.isArray(it.tiles) ? it.tiles.map((t) => String(t.label || '')).join('') : '';
      if (!Array.isArray(it.tiles) || !Array.isArray(it.slots) || it.tiles.length !== it.slots.length || !it.tiles.length ||
        (it.tiles.length !== letters.length && chars(labels) !== chars(it.answer))) throw new Error('interactive-runtime: tap-spell tiles/slots do not match the word "' + it.answer + '"');
      // characters, not labels, compared: identical for one-letter tiles, and right for word tiles
      if (chars(labels) !== chars(it.answer)) throw new Error('interactive-runtime: tap-spell tiles are not the letters of "' + it.answer + '"');
      for (const b of [...it.tiles, ...it.slots]) for (const k of ['x', 'y', 'w', 'h']) if (!inPage(b[k])) throw new Error('interactive-runtime: tap-spell box ' + k + '=' + b[k] + ' outside the page');
    }
    bundleItems = items.map((it) => ({ label: it.label || '', meta: it.meta || {}, tiles: it.tiles.map((t) => ({ x: round(t.x), y: round(t.y), w: round(t.w), h: round(t.h), label: t.label })), slots: it.slots.map((t) => ({ x: round(t.x), y: round(t.y), w: round(t.w), h: round(t.h) })) }));
  } else if (o.kind === 'tap-edit') {
    if (!/^[.?!]+$/.test(o.marks || '')) throw new Error('interactive-runtime: tap-edit needs the level marks');
    for (const it of items) {
      if (!Array.isArray(it.words) || !it.words.length || !Array.isArray(it.answer) || it.answer.length !== it.words.length) throw new Error('interactive-runtime: tap-edit lane words/answers mismatch');
      if (!it.answer.some((a) => a.mark)) throw new Error('interactive-runtime: tap-edit lane without an end mark');
      if (!/^data:image\//.test(it.icon || '')) throw new Error('interactive-runtime: tap-edit lane icon must be an inline image');
    }
    bundleItems = items.map((it) => ({ words: it.words, splitAfter: it.splitAfter, icon: it.icon, meta: it.meta || {} }));
  } else {
    for (const it of items) {
      if (!Array.isArray(it.options) || it.options.length < 2) throw new Error('interactive-runtime: tap-choice item with < 2 options');
      if (!(Number.isInteger(it.answer) && it.answer >= 0 && it.answer < it.options.length)) throw new Error('interactive-runtime: tap-choice item without exactly one correct option');
      for (const op of it.options) for (const k of ['x', 'y', 'w', 'h']) if (!inPage(op[k])) throw new Error('interactive-runtime: option ' + k + '=' + op[k] + ' outside the page');
    }
    bundleItems = items.map((it) => ({ label: it.label || '', meta: it.meta || {}, options: it.options.map((op) => ({ x: round(op.x), y: round(op.y), w: round(op.w), h: round(op.h), label: op.label })) }));
  }
  const bundle = { kind: o.kind, locale: o.locale, strings: S, ctx: o.ctx || null, items: bundleItems, answers, ...(o.kind === 'tap-edit' ? { marks: o.marks } : {}) };
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  return {
    css: CSS,
    stageOpen: '<div class="lcs-stage" id="lcs-stage">',
    stageClose: '<div id="lcs-overlay"></div></div>' + (o.kind === 'tap-edit' ? '\n<div class="lcs-tools" id="lcs-tools" role="toolbar"></div>\n<div id="lcs-lanes"></div>' : ''),
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
    script: '<script>window.DECK_BUNDLE=' + JSON.stringify(bundle).replace(/</g, '\\u003c') + ';</script>\n<script>' + (o.kind === 'tap-choice' ? JS_CHOICE : o.kind === 'tap-edit' ? JS_EDIT : o.kind === 'tap-select' ? JS_SELECT : o.kind === 'tap-spell' ? JS_SPELL : JS) + '</script>',
  };
}

module.exports = { buildInteractive, runtimeStrings, KINDS };
