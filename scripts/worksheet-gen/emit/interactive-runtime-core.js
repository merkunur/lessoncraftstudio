/**
 * emit/interactive-runtime-core.js — the screen runtimes, CSS and validators of emit/interactive-runtime.js, with NO
 * Node import (2026-11-01, the worksheet makers' screen-from-marks engine): the makers build a screen IN THE BROWSER
 * from the same runtimes, so everything that is not the strings loader (fs + vm over translations-shared.js) lives
 * here. interactive-runtime.js keeps its API — buildInteractive(o) resolves the strings and calls this — and its
 * output is byte-identical (scripts/makers/tests/interactive-runtime-split.test.js proves it against git HEAD).
 *
 * buildInteractive(o) here takes o.strings = runtimeStrings(locale) ({ check, tryAgain, youDidIt, allCorrect,
 * score, print }). The kinds, their contracts and the runtime notes are documented in interactive-runtime.js.
 *
 * Added here (never reached by a declared screen of the catalogue):
 *   tap-pair   — items + targets; the child taps an item, then the target it belongs to (a line is drawn); each
 *                item's answer is its target's id. Items that are also targets pair mutually (rainbow pairs).
 *   tap-place  — bins (a palette: words, numbers or pictures) + drop targets; the child taps a bin, then every
 *                target it belongs in; each target's answer is a bin id (the tap-paint interaction with a palette).
 *   marks      — the composite screen the makers derive from a page's answer marks: PARTS of the classes
 *                type / choice / select / pair / place on ONE page, one Check, one score (scripts/makers/screen.js).
 */
'use strict';
const { JS_TYPE_PLUS } = require('./interactive-type-plus.js');
const { JS_SET_CLOCK, CSS_SET_CLOCK } = require('./interactive-set-clock.js');
const { JS_MARK_GRID, CSS_MARK_GRID, markGridItems } = require('./interactive-mark-grid.js');
const KINDS = new Set(['tap-order', 'tap-choice', 'tap-edit', 'tap-select', 'tap-spell', 'tap-paint', 'trace-path', 'type-number', 'type-word', 'set-clock', 'mark-grid', 'tap-pair', 'tap-place', 'marks']);
/** the kinds served by the composite runtime JS_MARKS (2026-11-01) */
const MARKS_KINDS = new Set(['tap-pair', 'tap-place', 'marks']);
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
  '.lcs-opt.lcs-part[aria-pressed="true"]{box-shadow:none;background:rgba(242,120,75,.62)}',
  '.lcs-opt.lcs-part[data-state="right"]{background:rgba(46,158,91,.55)}.lcs-opt.lcs-part[data-state="wrong"]{background:rgba(214,69,69,.5)}',
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
  '.lcs-paint-art{position:absolute;overflow:hidden}.lcs-paint-art svg{width:100%;height:100%;display:block}',
  '.lcs-paint-art path[data-lcs-region]{cursor:pointer}.lcs-paint-art path:not([data-lcs-region]),.lcs-paint-art text{pointer-events:none}',
  '.lcs-paint-art path[data-state="wrong"]{stroke:#D64545}.lcs-paint-art path[data-state="right"]{stroke:#2E9E5B}',
  '.lcs-crayon{position:absolute;margin:0;padding:0;border:0;background:transparent;border-radius:14px;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}',
  '.lcs-crayon[aria-pressed="true"]{box-shadow:0 0 0 5px #146B5E;background:rgba(20,107,94,.12)}',
  '.lcs-crayon:focus-visible{outline:4px solid #4E5FE8;outline-offset:2px}',
  '.lcs-ink{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}',
  // type-number: the write box sits exactly on the printed empty box; the typed number is the page's numeral (Baloo 2 700, ink)
  '.lcs-wr{position:absolute;margin:0;padding:0;border:0;background:transparent;border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:"Baloo 2",Nunito,sans-serif;font-weight:700;line-height:1;color:#3A3530;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}',
  '.lcs-wr:focus-visible{outline:4px solid #4E5FE8;outline-offset:2px}',
  '.lcs-wr[aria-pressed="true"]{box-shadow:0 0 0 4px #146B5E;background:rgba(20,107,94,.10)}',
  '.lcs-wr[aria-pressed="true"]:empty::after{content:"";width:3px;height:46%;background:#146B5E;border-radius:2px;animation:lcs-caret 1s steps(1) infinite}',
  '@keyframes lcs-caret{50%{opacity:0}}',
  '.lcs-wr[data-state="right"]{box-shadow:0 0 0 5px #2E9E5B;background:rgba(46,158,91,.16);color:#1F7A44}',
  '.lcs-wr[data-state="wrong"]{box-shadow:0 0 0 5px #D64545;background:rgba(214,69,69,.14);color:#B33A3A}',
  '.lcs-pad{position:sticky;bottom:0;z-index:6;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px;max-width:520px;margin:14px auto 0;padding:10px;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:18px;box-shadow:0 -4px 16px rgba(58,53,48,.10)}',
  '.lcs-key{min-height:52px;border-radius:14px;border:2px solid #146B5E;background:#FFF;color:#146B5E;font-family:"Baloo 2",Nunito,sans-serif;font-size:1.7rem;font-weight:700;line-height:1;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent}',
  '.lcs-key:active{background:#DDEBE8}',
  '.lcs-key:focus-visible{outline:3px solid #4E5FE8;outline-offset:2px}',
  '.lcs-key--fn{background:#146B5E;color:#FFF}',
  '.lcs-key[disabled]{opacity:.45;cursor:default}',
  // type-word: the letter pad wraps to as many rows as the alphabet needs; every key stays a 46-px target
  '.lcs-pad--letters{grid-template-columns:repeat(auto-fill,minmax(46px,1fr));gap:6px;max-width:560px}',
  '.lcs-pad--letters .lcs-key{font-family:Nunito,system-ui,sans-serif;font-size:1.35rem;font-weight:800;min-height:50px}',
  '.lcs-wr--word{font-family:Nunito,system-ui,sans-serif;font-weight:800;white-space:nowrap;overflow:hidden}',
  '@media print{.lcs-controls,#lcs-celebration,#lcs-overlay,.lcs-tools,.lcs-pad{display:none !important}}',
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
  'function checkGroups(){var G={},ok=0,tot=0;for(var i=0;i<els.length;i++){var m=B.items[i].meta,g=m["data-lcs-group"];if(!G[g])G[g]={n:0,w:+m["data-lcs-want"],ix:[]};G[g].ix.push(i);if(sel[i])G[g].n++}for(var g in G){tot++;var gr=G[g],right=gr.n===gr.w;if(right)ok++;for(var k=0;k<gr.ix.length;k++){var j=gr.ix[k];if(sel[j])els[j].setAttribute("data-state",right?"right":"wrong")}}return [ok,tot]}',
  'function check(){phase="reviewed";if(B.ctx&&B.ctx.countGroups){var r=checkGroups();prg.textContent=fmt(S.score,{n:r[0],total:r[1]});chk.hidden=true;rst.hidden=false;paint();if(r[0]===r[1]){setTimeout(function(){cel.hidden=false;var c=document.getElementById("lcs-cele-close");if(c)c.focus()},450)}return}var ok=0;for(var i=0;i<els.length;i++){var right=B.answers[i]===sel[i];if(right)ok++;if(sel[i])els[i].setAttribute("data-state",right?"right":"wrong");else if(!right)els[i].setAttribute("data-state","missed")}',
  'prg.textContent=fmt(S.score,{n:ok,total:els.length});chk.hidden=true;rst.hidden=false;paint();if(ok===els.length){setTimeout(function(){cel.hidden=false;var c=document.getElementById("lcs-cele-close");if(c)c.focus()},450)}}',
  'function reset(){phase="fill";for(var i=0;i<els.length;i++){sel[i]=false;els[i].removeAttribute("data-state")}prg.textContent="";chk.hidden=false;rst.hidden=true;cel.hidden=true;paint()}',
  'function init(){for(var i=0;i<B.items.length;i++){(function(i){var it=B.items[i],el=document.createElement("button");el.type="button";el.className=B.ctx&&B.ctx.countGroups?"lcs-opt lcs-part":"lcs-opt";el.setAttribute("aria-label",it.label);sel[i]=false;',
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

const JS_PAINT = [
  '(function(){',
  'var B=window.DECK_BUNDLE,S=B.strings,P=B.ctx.paint,cur=null,fill={},phase="fill",regs={},crs=[];',
  'var ov=document.getElementById("lcs-overlay"),chk=document.getElementById("lcs-check"),rst=document.getElementById("lcs-reset"),prg=document.getElementById("lcs-progress"),cel=document.getElementById("lcs-celebration");',
  'function fmt(s,v){return s.replace(/\\{(\\w+)\\}/g,function(_,k){return v[k]!=null?v[k]:""})}',
  'function paint(){var all=true;for(var i=0;i<B.items.length;i++)if(!fill[B.items[i].region])all=false;chk.disabled=!all||phase!=="fill";for(var j=0;j<crs.length;j++)crs[j].setAttribute("aria-pressed",cur===P.crayons[j].colour?"true":"false")}',
  'function setFill(r,c){var el=regs[r];if(!el)return;var v=c?P.hex[c]:"#FFFFFF";el.setAttribute("fill",v);if(el.getAttribute("data-lcs-seam"))el.setAttribute("stroke",v)}',
  'function tapRegion(r){if(phase!=="fill"||!cur)return;fill[r]=cur;setFill(r,cur);paint()}',
  'function check(){phase="reviewed";var ok=0;for(var i=0;i<B.items.length;i++){var it=B.items[i],right=fill[it.region]===B.answers[i];regs[it.region].setAttribute("data-state",right?"right":"wrong");if(right)ok++}',
  'prg.textContent=fmt(S.score,{n:ok,total:B.items.length});chk.hidden=true;rst.hidden=false;paint();if(ok===B.items.length){setTimeout(function(){cel.hidden=false;var c=document.getElementById("lcs-cele-close");if(c)c.focus()},450)}}',
  'function reset(){phase="fill";fill={};for(var r in regs){regs[r].removeAttribute("data-state");setFill(r,null)}prg.textContent="";chk.hidden=false;rst.hidden=true;cel.hidden=true;paint()}',
  'function init(){var a=P.art,box=document.createElement("div");box.className="lcs-paint-art";box.style.left=a.x+"%";box.style.top=a.y+"%";box.style.width=a.w+"%";box.style.height=a.h+"%";if(a.rx!=null)box.style.borderRadius=a.rx+"% / "+a.ry+"%";box.innerHTML=a.svg;ov.appendChild(box);',
  'var want={};for(var i=0;i<B.items.length;i++)want[B.items[i].region]=1;var ps=box.querySelectorAll("path[data-lcs-region]");for(var k=0;k<ps.length;k++){(function(p){var r=p.getAttribute("data-lcs-region");if(!want[r]){p.removeAttribute("data-lcs-region");return}regs[r]=p;p.addEventListener("click",function(){tapRegion(r)})})(ps[k])}',
  'for(var j=0;j<P.crayons.length;j++){(function(j){var c=P.crayons[j],el=document.createElement("button");el.type="button";el.className="lcs-crayon";el.setAttribute("aria-label",c.label);el.setAttribute("aria-pressed","false");el.style.left=c.x+"%";el.style.top=c.y+"%";el.style.width=c.w+"%";el.style.height=c.h+"%";el.addEventListener("click",function(){if(phase!=="fill")return;cur=c.colour;paint()});ov.appendChild(el);crs.push(el)})(j)}',
  'chk.textContent=S.check;rst.textContent=S.tryAgain;document.getElementById("lcs-cele-title").textContent=S.youDidIt;document.getElementById("lcs-cele-print").textContent=S.print;document.getElementById("lcs-cele-close").textContent=S.tryAgain;',
  'chk.addEventListener("click",check);rst.addEventListener("click",reset);document.getElementById("lcs-cele-close").addEventListener("click",reset);paint()}',
  'if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();',
  '})();',
].join('\n');

/*
 * trace-path (Handmade Mazes, b8 2026-10-11): the child DRAGS along the maze's corridors. ctx.trace = { nodes:[[x,y]…]
 * (% of the stage), edges:[{a,b,pts:[[x,y]…]}] (each corridor's own curve samples, a→b), routes:[{start, goal}],
 * aspect (stage w / h) }. The ink snaps to the graph: a press within the snap radius of a route's tip picks that route;
 * moving along an edge incident to the tip draws partial ink, passing 92 % advances the tip, moving back along the
 * previous edge retracts. Ink cannot cross a wall (it only ever lies on declared corridors). Check = every route's tip
 * is its goal; a short route gets a red ring at its tip, never a hint of the way. Measured in the prototype with real
 * drags at 360 and 768 px (control passes; a straight drag across walls, a dead end both fail; retract + finish passes).
 */
const JS_TRACE = [
  '(function(){',
  'var B=window.DECK_BUNDLE,S=B.strings,T=B.ctx.trace,phase="fill",cur=-1;',
  'var st=document.getElementById("lcs-stage"),ov=document.getElementById("lcs-overlay"),chk=document.getElementById("lcs-check"),rst=document.getElementById("lcs-reset"),prg=document.getElementById("lcs-progress"),cel=document.getElementById("lcs-celebration");',
  'var C=T.chrome||{},HINT={collect:"mzMissed",avoid:"mzAvoid",shortest:"mzShorter",babies:"mzWrongHome"},gb=document.createElement("button"),last=0;',
  // Go back (design C §3): one step back on the route last drawn — a child who overshoots retracts without starting over
  'function goBack(){if(phase!=="fill")return;var r=R[last];if(r&&r.stack.length>1){r.stack.pop();r.part=null;r.bad=false;r.ring=null;draw()}}',
  'var VW=1000,VH=1000/T.aspect,ns="http://www.w3.org/2000/svg",ink=document.createElementNS(ns,"svg");',
  'ink.setAttribute("viewBox","0 0 "+VW+" "+VH);ink.setAttribute("preserveAspectRatio","none");ink.setAttribute("class","lcs-ink");ink.setAttribute("aria-hidden","true");ov.appendChild(ink);',
  'var inc=T.nodes.map(function(){return[]});T.edges.forEach(function(e,i){inc[e.a].push(i);inc[e.b].push(i)});',
  'var R=[];function fresh(){R=T.routes.map(function(r){return{stack:[r.start],part:null,bad:false}})}fresh();',
  'var COL=["#2F5BD3","#7B3FB8","#C98A12","#8A5A2B"];',
  'function px(p){var w=st.clientWidth,h=st.clientHeight;return[p[0]*w/100,p[1]*h/100]}',
  'function vb(p){return(p[0]*VW/100).toFixed(1)+","+(p[1]*VH/100).toFixed(1)}',
  'function from(e,n){return e.a===n?e.pts:e.pts.slice().reverse()}',
  'function edge(a,b){for(var i=0;i<inc[a].length;i++){var e=T.edges[inc[a][i]];if(e.a===b||e.b===b)return inc[a][i]}return -1}',
  'function proj(pts,q){var best={d:1e9,t:0},L=0,acc=[0],i;for(i=1;i<pts.length;i++){L+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);acc.push(L)}',
  ' for(i=1;i<pts.length;i++){var a=pts[i-1],b=pts[i],dx=b[0]-a[0],dy=b[1]-a[1],ll=dx*dx+dy*dy,u=ll?((q[0]-a[0])*dx+(q[1]-a[1])*dy)/ll:0;u=Math.max(0,Math.min(1,u));',
  '  var x=a[0]+u*dx,y=a[1]+u*dy,d=Math.hypot(q[0]-x,q[1]-y);if(d<best.d)best={d:d,t:L?(acc[i-1]+u*Math.sqrt(ll))/L:0}}return best}',
  'function snap(){return Math.max(44,st.clientWidth*0.133)}',
  'function inkW(){return Math.max(12,T.w*0.42)*VW/T.pageW}',
  'function draw(){var s="";R.forEach(function(r,k){var pts=[T.nodes[r.stack[0]]];',
  ' for(var i=1;i<r.stack.length;i++){var e=T.edges[edge(r.stack[i-1],r.stack[i])];pts=pts.concat(from(e,r.stack[i-1]).slice(1))}',
  ' var col=r.done?"#2E9E5B":COL[k%COL.length];',
  ' if(pts.length>1)s+=\'<polyline points="\'+pts.map(vb).join(" ")+\'" fill="none" stroke="\'+col+\'" stroke-width="\'+inkW().toFixed(1)+\'" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>\';',
  ' if(r.part){var e2=T.edges[r.part.e],pp=from(e2,r.stack[r.stack.length-1]),n=Math.max(1,Math.round(r.part.t*(pp.length-1)));s+=\'<polyline points="\'+pp.slice(0,n+1).map(vb).join(" ")+\'" fill="none" stroke="\'+col+\'" stroke-width="\'+inkW().toFixed(1)+\'" stroke-linecap="round" opacity=".55"/>\'}',
  ' var tip=T.nodes[r.stack[r.stack.length-1]];s+=\'<circle cx="\'+(tip[0]*VW/100).toFixed(1)+\'" cy="\'+(tip[1]*VH/100).toFixed(1)+\'" r="\'+(inkW()*0.95).toFixed(1)+\'" fill="\'+(r.bad?"none":col)+\'" stroke="\'+(r.bad?"#D64545":"#FFFFFF")+\'" stroke-width="\'+(r.bad?6:3)+\'"/>\';if(r.ring!=null){var q=T.nodes[r.ring];s+=\'<circle cx="\'+(q[0]*VW/100).toFixed(1)+\'" cy="\'+(q[1]*VH/100).toFixed(1)+\'" r="\'+(inkW()*2.4).toFixed(1)+\'" fill="none" stroke="#D64545" stroke-width="6" stroke-dasharray="10 7"/>\'}});',
  ' ink.innerHTML=s;chk.disabled=phase!=="fill"||!R.some(function(r){return r.stack.length>1})}',
  'function local(ev){var b=st.getBoundingClientRect();return[ev.clientX-b.left,ev.clientY-b.top]}',
  'function move(q,depth){depth=depth||0;var r=R[cur],tip=r.stack[r.stack.length-1],best=null;',
  ' inc[tip].forEach(function(ei){var e=T.edges[ei],o=proj(from(e,tip).map(px),q);if(o.d<snap()&&(!best||o.d<best.d))best={e:ei,d:o.d,t:o.t}});',
  ' if(!best){r.part=null;draw();return}',
  ' var e=T.edges[best.e],other=e.a===tip?e.b:e.a,back=r.stack.length>1&&other===r.stack[r.stack.length-2];',
  ' if(best.t>0.92){var moved=false;if(back){r.stack.pop();moved=true}else if(r.stack.indexOf(other)<0){r.stack.push(other);moved=true}r.part=null;if(moved&&depth<12){move(q,depth+1);return}}',
  ' else if(back||r.stack.indexOf(other)>=0)r.part=null;else r.part={e:best.e,t:best.t};draw()}',
  'st.addEventListener("pointerdown",function(ev){if(phase!=="fill")return;var q=local(ev);cur=-1;var bd=1e9;R.forEach(function(r,k){var t=px(T.nodes[r.stack[r.stack.length-1]]),d=Math.hypot(q[0]-t[0],q[1]-t[1]);if(d<snap()&&d<bd){bd=d;cur=k}});',
  ' if(cur>=0){last=cur;R[cur].bad=false;R[cur].ring=null;try{st.setPointerCapture(ev.pointerId)}catch(e){}ev.preventDefault();move(q)}});',
  'st.addEventListener("pointermove",function(ev){if(cur<0)return;var es=ev.getCoalescedEvents?ev.getCoalescedEvents():[];if(!es.length)es=[ev];for(var i=0;i<es.length;i++)move(local(es[i]))});',
  'function up(){cur=-1;R.forEach(function(r){r.part=null});draw()}st.addEventListener("pointerup",up);st.addEventListener("pointercancel",up);',
  'function check(){phase="reviewed";var ok=0,msg="";R.forEach(function(r,k){var rt=T.routes[k],done=rt.path?r.stack.join("-")===rt.path.join("-"):r.stack[r.stack.length-1]===rt.goal;r.done=done;r.bad=!done;r.ring=null;if(done){ok++;return}var tip=r.stack[r.stack.length-1];if(tip!==rt.goal){if(!msg)msg=C.mzKeepGoing||"";return}var p=rt.path||[],L=T.labels||[];if(T.hint==="collect"){for(var j=0;j<p.length;j++)if(L[p[j]]&&r.stack.indexOf(p[j])<0){r.ring=p[j];break}}else if(T.hint==="avoid"){for(var j2=0;j2<r.stack.length;j2++)if(L[r.stack[j2]]){r.ring=r.stack[j2];break}}if(r.ring==null)for(var i=0;i<r.stack.length;i++)if(r.stack[i]!==p[i]){r.ring=r.stack[i];break}r.bad=false;if(!msg)msg=C[HINT[T.hint]||"mzLookAtRing"]||""});',
  ' prg.textContent=ok===R.length?fmt(S.score,{n:ok,total:R.length}):(msg||fmt(S.score,{n:ok,total:R.length}));gb.hidden=true;chk.hidden=true;rst.hidden=false;draw();if(ok===R.length){setTimeout(function(){cel.hidden=false;var c=document.getElementById("lcs-cele-close");if(c)c.focus()},450)}}',
  'function fmt(s,v){return s.replace(/\\{(\\w+)\\}/g,function(_,k){return v[k]!=null?v[k]:""})}',
  'function reset(){phase="fill";fresh();prg.textContent="";chk.hidden=false;rst.hidden=true;gb.hidden=!C.mzGoBack;cel.hidden=true;draw()}',
  'function init(){st.style.touchAction="none";chk.textContent=S.check;gb.className=chk.className;gb.id="lcs-goback";gb.type="button";gb.textContent=C.mzGoBack||"";gb.hidden=!C.mzGoBack;chk.parentNode.insertBefore(gb,chk);gb.addEventListener("click",goBack);rst.textContent=S.tryAgain;document.getElementById("lcs-cele-title").textContent=S.youDidIt;document.getElementById("lcs-cele-print").textContent=S.print;document.getElementById("lcs-cele-close").textContent=S.tryAgain;',
  ' chk.addEventListener("click",check);rst.addEventListener("click",reset);document.getElementById("lcs-cele-close").addEventListener("click",reset);window.__lcsTrace={R:function(){return R},T:T,px:px};draw()}',
  'if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();',
  '})();',
].join('\n');

const JS_TYPE = [
  '(function(){',
  'var B=window.DECK_BUNDLE,S=B.strings,MX=(B.ctx&&B.ctx.maxDigits)||2,els=[],val=[],cur=0,phase="fill";',
  'var ov=document.getElementById("lcs-overlay"),pad=document.getElementById("lcs-pad"),chk=document.getElementById("lcs-check"),rst=document.getElementById("lcs-reset"),prg=document.getElementById("lcs-progress"),cel=document.getElementById("lcs-celebration");',
  'function fmt(s,v){return s.replace(/\\{(\\w+)\\}/g,function(_,k){return v[k]!=null?v[k]:""})}',
  'function paint(){var all=true;for(var i=0;i<els.length;i++){els[i].textContent=val[i];els[i].setAttribute("aria-pressed",i===cur&&phase==="fill"?"true":"false");els[i].setAttribute("aria-label",(B.items[i].label||"")+(val[i]?" = "+val[i]:""));if(val[i]==="")all=false}',
  ' chk.disabled=!all||phase!=="fill";var ks=pad.querySelectorAll(".lcs-key");for(var k=0;k<ks.length;k++)ks[k].disabled=phase!=="fill"}',
  // the chosen box takes keyboard focus, so digits, Backspace and Enter act on it (never on the last button clicked)
  'function sel(i){if(phase!=="fill")return;cur=i;paint();try{els[i].focus({preventScroll:true})}catch(e){}}',
  'function firstEmpty(){for(var j=0;j<val.length;j++)if(val[j]==="")return j;return -1}',
  'function type(d){if(phase!=="fill")return;if(cur<0||cur>=els.length){cur=firstEmpty();if(cur<0)return}if(val[cur].length>=MX)return;val[cur]+=d;paint()}',
  'function back(){if(phase!=="fill"||cur<0)return;val[cur]=val[cur].slice(0,-1);paint()}',
  // the pad is sticky at the bottom of the screen: a box that moves under it is scrolled up into view
  'function show(i){if(i<0||!els[i])return;var r=els[i].getBoundingClientRect(),q=pad.getBoundingClientRect(),vh=window.innerHeight;var lim=q.top<vh?q.top:vh;if(r.bottom>lim-10)window.scrollBy(0,r.bottom-lim+18);else if(r.top<10)window.scrollBy(0,r.top-18)}',
  'function step(dir){if(phase!=="fill"||!els.length)return;cur=dir<0?(cur<=0?els.length-1:cur-1):(cur+1)%els.length;paint();try{els[cur].focus({preventScroll:true})}catch(e){}show(cur)}',
  'function check(){for(var i=0;i<val.length;i++)if(val[i]==="")return;phase="reviewed";var ok=0;for(var i=0;i<els.length;i++){var right=parseInt(val[i],10)===B.answers[i];els[i].setAttribute("data-state",right?"right":"wrong");if(right)ok++}',
  ' prg.textContent=fmt(S.score,{n:ok,total:els.length});chk.hidden=true;rst.hidden=false;paint();if(ok===els.length){setTimeout(function(){cel.hidden=false;var c=document.getElementById("lcs-cele-close");if(c)c.focus()},450)}}',
  // Try again keeps the right numbers and empties the wrong ones (a child does not redo a whole wall for one slip)
  'function retry(){phase="fill";var first=-1;for(var i=0;i<els.length;i++){if(els[i].getAttribute("data-state")==="wrong"){val[i]="";if(first<0)first=i}els[i].removeAttribute("data-state")}cur=first<0?0:first;prg.textContent="";chk.hidden=false;rst.hidden=true;cel.hidden=true;paint();show(cur)}',
  'function reset(){phase="fill";for(var i=0;i<els.length;i++){val[i]="";els[i].removeAttribute("data-state")}cur=0;prg.textContent="";chk.hidden=false;rst.hidden=true;cel.hidden=true;paint()}',
  'function key(lab,fn,cls,aria){var b=document.createElement("button");b.type="button";b.className="lcs-key"+(cls?" "+cls:"");b.textContent=lab;b.setAttribute("aria-label",aria||lab);b.addEventListener("click",fn);pad.appendChild(b)}',
  // a tall one-column screen (four-row walls) is capped at 520 px on a wide screen: the bricks stay big, the page short
  'function cap(){var im=document.getElementById("lcs-worksheet-img"),ws=im&&im.closest(".lcs-worksheet");if(ws&&+im.getAttribute("height")>1.9*+im.getAttribute("width")){ws.style.maxWidth="520px";pad.style.maxWidth="520px"}}',
  'function init(){cap();for(var i=0;i<B.items.length;i++){(function(i){var it=B.items[i],el=document.createElement("button");el.type="button";el.className="lcs-wr";val[i]="";',
  ' el.style.left=it.x+"%";el.style.top=it.y+"%";el.style.width=it.w+"%";el.style.height=it.h+"%";el.style.fontSize=(it.w*0.36)+"cqw";el.addEventListener("click",function(){sel(i)});ov.appendChild(el);els.push(el)})(i)}',
  ' ["1","2","3","4","5"].forEach(function(d){key(d,function(){type(d)})});key("\\u232B",back,"lcs-key--fn","\\u232B");["6","7","8","9","0"].forEach(function(d){key(d,function(){type(d)})});key("\\u2192",function(){step(1)},"lcs-key--fn","\\u2192");',
  ' document.addEventListener("keydown",function(e){if(phase!=="fill"||e.ctrlKey||e.metaKey||e.altKey)return;var a=document.activeElement;if(/^[0-9]$/.test(e.key)){type(e.key);e.preventDefault()}else if(e.key==="Backspace"||e.key==="Delete"){back();e.preventDefault()}',
  '  else if(e.key==="Enter"||e.key==="ArrowRight"||e.key==="ArrowDown"){if(e.key==="Enter"&&a&&a.classList&&(a.classList.contains("lcs-btn")||a.classList.contains("lcs-key")))return;step(1);e.preventDefault()}else if(e.key==="ArrowLeft"||e.key==="ArrowUp"){step(-1);e.preventDefault()}});',
  ' chk.textContent=S.check;rst.textContent=S.tryAgain;document.getElementById("lcs-cele-title").textContent=S.youDidIt;document.getElementById("lcs-cele-print").textContent=S.print;document.getElementById("lcs-cele-close").textContent=S.tryAgain;',
  ' chk.addEventListener("click",check);rst.addEventListener("click",retry);document.getElementById("lcs-cele-close").addEventListener("click",reset);paint()}',
  'if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();',
  '})();',
].join('\n');

const JS_WORD = [
  "(function(){",
  "var B=window.DECK_BUNDLE,S=B.strings,MX=(B.ctx&&B.ctx.maxChars)||20,KEYS=(B.ctx&&B.ctx.keys)||[],LOC=B.locale||\"en\",ASP=1,els=[],val=[],cur=0,phase=\"fill\";",
  "var ov=document.getElementById(\"lcs-overlay\"),pad=document.getElementById(\"lcs-pad\"),chk=document.getElementById(\"lcs-check\"),rst=document.getElementById(\"lcs-reset\"),prg=document.getElementById(\"lcs-progress\"),cel=document.getElementById(\"lcs-celebration\");",
  "function fmt(s,v){return s.replace(/\\{(\\w+)\\}/g,function(_,k){return v[k]!=null?v[k]:\"\"})}",
  "function fold(w){return String(w).normalize(\"NFC\").toLocaleLowerCase(LOC).replace(/\\s+/g,\" \").trim()}",
  // accepted alternates ride the box meta (data-lcs-alts, "|"-separated; Ordinal Numbers 2026-10-14) — absent elsewhere
  "function ALT(i,v){var a=String(((B.items[i]||{}).meta||{})[\"data-lcs-alts\"]||\"\").split(\"|\");for(var j=0;j<a.length;j++)if(a[j]&&fold(a[j])===fold(v))return true;return false}",
  "function fit(i){var el=els[i],it=B.items[i],n=Math.max(5,val[i].length);el.style.fontSize=Math.min(it.h*ASP*0.5,it.w*1.6/n)+\"cqw\"}",
  "function paint(){var all=true;for(var i=0;i<els.length;i++){els[i].textContent=val[i];fit(i);els[i].setAttribute(\"aria-pressed\",i===cur&&phase===\"fill\"?\"true\":\"false\");els[i].setAttribute(\"aria-label\",(B.items[i].label||\"\")+(val[i]?\" = \"+val[i]:\"\"));if(val[i]===\"\")all=false}",
  " chk.disabled=!all||phase!==\"fill\";var ks=pad.querySelectorAll(\".lcs-key\");for(var k=0;k<ks.length;k++)ks[k].disabled=phase!==\"fill\"}",
  "function sel(i){if(phase!==\"fill\")return;cur=i;paint();try{els[i].focus({preventScroll:true})}catch(e){}}",
  "function firstEmpty(){for(var j=0;j<val.length;j++)if(val[j]===\"\")return j;return -1}",
  "function type(c){if(phase!==\"fill\")return;if(cur<0||cur>=els.length){cur=firstEmpty();if(cur<0)return}if(val[cur].length>=MX)return;val[cur]+=c;paint()}",
  "function back(){if(phase!==\"fill\"||cur<0)return;val[cur]=val[cur].slice(0,-1);paint()}",
  "function show(i){if(i<0||!els[i])return;var r=els[i].getBoundingClientRect(),q=pad.getBoundingClientRect(),vh=window.innerHeight;var lim=q.top<vh?q.top:vh;if(r.bottom>lim-10)window.scrollBy(0,r.bottom-lim+18);else if(r.top<10)window.scrollBy(0,r.top-18)}",
  "function step(dir){if(phase!==\"fill\"||!els.length)return;cur=dir<0?(cur<=0?els.length-1:cur-1):(cur+1)%els.length;paint();try{els[cur].focus({preventScroll:true})}catch(e){}show(cur)}",
  "function check(){for(var i=0;i<val.length;i++)if(val[i]===\"\")return;phase=\"reviewed\";var ok=0;for(var i=0;i<els.length;i++){var right=fold(val[i])===fold(B.answers[i])||ALT(i,val[i]);els[i].setAttribute(\"data-state\",right?\"right\":\"wrong\");if(right)ok++}",
  " prg.textContent=fmt(S.score,{n:ok,total:els.length});chk.hidden=true;rst.hidden=false;paint();if(ok===els.length){setTimeout(function(){cel.hidden=false;var c=document.getElementById(\"lcs-cele-close\");if(c)c.focus()},450)}}",
  "function retry(){phase=\"fill\";var first=-1;for(var i=0;i<els.length;i++){if(els[i].getAttribute(\"data-state\")===\"wrong\"){val[i]=\"\";if(first<0)first=i}els[i].removeAttribute(\"data-state\")}cur=first<0?0:first;prg.textContent=\"\";chk.hidden=false;rst.hidden=true;cel.hidden=true;paint();show(cur)}",
  "function reset(){phase=\"fill\";for(var i=0;i<els.length;i++){val[i]=\"\";els[i].removeAttribute(\"data-state\")}cur=0;prg.textContent=\"\";chk.hidden=false;rst.hidden=true;cel.hidden=true;paint()}",
  "function key(lab,fn,cls,aria){var b=document.createElement(\"button\");b.type=\"button\";b.className=\"lcs-key\"+(cls?\" \"+cls:\"\");b.textContent=lab;b.setAttribute(\"aria-label\",aria||lab);b.addEventListener(\"click\",fn);pad.appendChild(b)}",
  "function init(){pad.className=\"lcs-pad lcs-pad--letters\";var im=document.getElementById(\"lcs-worksheet-img\");if(im&&+im.getAttribute(\"width\"))ASP=+im.getAttribute(\"height\")/+im.getAttribute(\"width\");for(var i=0;i<B.items.length;i++){(function(i){var it=B.items[i],el=document.createElement(\"button\");el.type=\"button\";el.className=\"lcs-wr lcs-wr--word\";val[i]=\"\";",
  " el.style.left=it.x+\"%\";el.style.top=it.y+\"%\";el.style.width=it.w+\"%\";el.style.height=it.h+\"%\";el.addEventListener(\"click\",function(){sel(i)});ov.appendChild(el);els.push(el)})(i)}",
  " KEYS.forEach(function(c){key(c===\" \"?\"\\u2423\":c,function(){type(c)},\"\",c===\" \"?\"space\":c)});key(\"\\u232B\",back,\"lcs-key--fn\",\"\\u232B\");key(\"\\u2192\",function(){step(1)},\"lcs-key--fn\",\"\\u2192\");",
  " document.addEventListener(\"keydown\",function(e){if(phase!==\"fill\"||e.ctrlKey||e.metaKey||e.altKey)return;var a=document.activeElement,c=e.key&&e.key.length===1?e.key.toLocaleLowerCase(LOC):\"\";if(c&&KEYS.indexOf(c)>=0){type(c);e.preventDefault()}else if(e.key===\"Backspace\"||e.key===\"Delete\"){back();e.preventDefault()}",
  "  else if(e.key===\"Enter\"||e.key===\"ArrowDown\"){if(e.key===\"Enter\"&&a&&a.classList&&(a.classList.contains(\"lcs-btn\")||a.classList.contains(\"lcs-key\")))return;step(1);e.preventDefault()}else if(e.key===\"ArrowUp\"){step(-1);e.preventDefault()}});",
  " chk.textContent=S.check;rst.textContent=S.tryAgain;document.getElementById(\"lcs-cele-title\").textContent=S.youDidIt;document.getElementById(\"lcs-cele-print\").textContent=S.print;document.getElementById(\"lcs-cele-close\").textContent=S.tryAgain;",
  " chk.addEventListener(\"click\",check);rst.addEventListener(\"click\",retry);document.getElementById(\"lcs-cele-close\").addEventListener(\"click\",reset);paint()}",
  "if(document.readyState===\"loading\")document.addEventListener(\"DOMContentLoaded\",init);else init();",
  "})();",
].join('\n');

const JS = [
  '(function(){',
  'var B=window.DECK_BUNDLE,S=B.strings,items=[],order=[],phase="fill";',
  'var ov=document.getElementById("lcs-overlay"),chk=document.getElementById("lcs-check"),rst=document.getElementById("lcs-reset"),prg=document.getElementById("lcs-progress"),cel=document.getElementById("lcs-celebration");',
  'function fmt(s,v){return s.replace(/\\{(\\w+)\\}/g,function(_,k){return v[k]!=null?v[k]:""})}',
  'function R(p){return B.ranks?B.ranks[p]:p+1}',
  'function paint(){for(var i=0;i<items.length;i++){var p=order.indexOf(i),b=items[i].badge;if(p>=0){b.textContent=String(R(p));b.className="lcs-badge on"}else{b.textContent="";b.className="lcs-badge"}}chk.disabled=order.length!==items.length||phase!=="fill";}',
  'function tap(i){if(phase!=="fill")return;var p=order.indexOf(i);if(p>=0)order.splice(p,1);else order.push(i);paint()}',
  'function check(){if(order.length!==items.length)return;phase="reviewed";var ok=0;for(var i=0;i<items.length;i++){var right=B.answers[i]===R(order.indexOf(i));items[i].el.setAttribute("data-state",right?"right":"wrong");if(right)ok++}',
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

/*
 * The composite "marks" runtime (worksheet makers, 2026-11-01): a screen derived from a page's own answer marks
 * (scripts/makers/screen.js) is ONE page with PARTS of up to five classes, one Check, one score:
 *   type   — write boxes (type-number / type-word on one pad: digits, or the locale's letter pad; a SYMBOL pad when every
 *            answer is < > = + −); a box may carry data-lcs-alts (accepted spellings), data-lcs-range "lo-hi" (any whole
 *            number in it — a "make it true" set) or data-lcs-set (any number of its set, each once — the odd / even houses)
 *   choice — option groups, one tap per group
 *   select — candidates to tap (circle, colour); exact set, or per group "any N" (countGroups: data-lcs-want)
 *   pair   — items + targets: tap an item, then its target (a line); mutual when the items ARE the targets
 *   place  — bins (a palette) + drop targets: tap a bin, then every target it belongs in
 * Check when every box / group / item / target is answered (a select-only page: when something is selected). "Try again"
 * keeps every right answer and clears the wrong ones. Written as a real function shipped as its source (ES5 only — it runs
 * in every student page); `R()` is the judge seam (poison: a runtime that marks everything right). Also serves the single
 * kinds tap-pair and tap-place (one part built from B.items / B.answers / B.targets | B.bins).
 */
/* eslint-disable no-var */
function marksRuntime() {
  var B = window.DECK_BUNDLE, S = B.strings, C = B.ctx || {}, phase = 'fill';
  var st = document.getElementById('lcs-stage'), ov = document.getElementById('lcs-overlay'), pad = document.getElementById('lcs-pad'), chk = document.getElementById('lcs-check'),
    rst = document.getElementById('lcs-reset'), prg = document.getElementById('lcs-progress'), cel = document.getElementById('lcs-celebration');
  var P = B.parts || [{ cls: B.kind === 'tap-pair' ? 'pair' : 'place', items: B.items, answers: B.answers, targets: B.targets, bins: B.bins, mutual: B.ctx && B.ctx.mutual }];
  var R = function (x) { return x; };
  var NS = 'http://www.w3.org/2000/svg', ink = null, W = 703, H = 945, ASP = 945 / 703;
  var Q = [], TY = [], cur = -1, selItem = null;
  function fmt(s, v) { return s.replace(/\{(\w+)\}/g, function (_, k) { return v[k] != null ? v[k] : ''; }); }
  function fold(w) { return String(w).normalize('NFC').toLocaleLowerCase(B.locale || 'en').replace(/\s+/g, ' ').trim(); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  // a printed box under 36 px (the K-2 floor; CLAUDE.md §23.4 cells ≥ 34) gets a tap target grown to 36 px around it (invisible: the
  // overlay button has no background until it is pressed)
  function place(el, o) {
    var mw = 36 / W * 100, mh = 36 / H * 100, x = o.x, y = o.y, w = o.w, h = o.h;
    if (w < mw) { x -= (mw - w) / 2; w = mw; }
    if (h < mh) { y -= (mh - h) / 2; h = mh; }
    el.style.left = x + '%'; el.style.top = y + '%'; el.style.width = w + '%'; el.style.height = h + '%';
  }
  function mk(cls, o, label) { var el = document.createElement('button'); el.type = 'button'; el.className = cls; el.setAttribute('aria-label', label || ''); place(el, o); ov.appendChild(el); return el; }
  function centre(o) { return [(o.x + o.w / 2) * W / 100, (o.y + o.h / 2) * H / 100]; }
  /* ---- type ---- */
  function typeQ(p, i) {
    var it = p.items[i], q = { cls: 'type', p: p, i: i, val: '', num: !!p.num, meta: it.meta || {}, it: it };
    q.el = mk(p.num ? 'lcs-wr' : 'lcs-wr lcs-wr--word', it, it.label || '');
    q.el.setAttribute('data-lcs-q', String(Q.length));
    q.el.addEventListener('click', function () { sel(q); });
    TY.push(q);
    return q;
  }
  function fit(q) { var it = q.it; q.el.style.fontSize = (q.num ? it.w * 0.36 : Math.min(it.h * ASP * 0.5, it.w * 1.6 / Math.max(5, q.val.length))) + 'cqw'; }
  function sel(q) { if (phase !== 'fill') return; cur = TY.indexOf(q); paint(); try { q.el.focus({ preventScroll: true }); } catch (e) { /* no focus */ } }
  function firstEmpty() { for (var j = 0; j < TY.length; j++) if (TY[j].val === '') return j; return -1; }
  function typeIn(c) {
    if (phase !== 'fill' || !TY.length) return;
    if (cur < 0 || cur >= TY.length) { cur = firstEmpty(); if (cur < 0) return; }
    var q = TY[cur], mx = q.num ? (C.maxDigits || 2) : (C.maxChars || 20);
    // the separator of a decimal money box (C.sep, 2026-11-01): only in a decimal box, once, after a digit
    if (C.sep && c === C.sep) { if (q.meta['data-lcs-decimal'] == null || q.val === '' || q.val.indexOf(C.sep) >= 0) return; q.val += c; paint(); return; }
    if ((C.sep ? q.val.split(C.sep).join('') : q.val).length >= mx) return;
    q.val += c; paint();
  }
  function back() { if (phase !== 'fill' || cur < 0 || !TY[cur]) return; TY[cur].val = TY[cur].val.slice(0, -1); paint(); }
  function show(i) {
    if (i < 0 || !TY[i]) return;
    var r = TY[i].el.getBoundingClientRect(), q = pad ? pad.getBoundingClientRect() : { top: window.innerHeight }, vh = window.innerHeight, lim = q.top < vh ? q.top : vh;
    if (r.bottom > lim - 10) window.scrollBy(0, r.bottom - lim + 18); else if (r.top < 10) window.scrollBy(0, r.top - 18);
  }
  function step(dir) { if (phase !== 'fill' || !TY.length) return; cur = dir < 0 ? (cur <= 0 ? TY.length - 1 : cur - 1) : (cur + 1) % TY.length; paint(); try { TY[cur].el.focus({ preventScroll: true }); } catch (e) { /* no focus */ } show(cur); }
  function typeRight(q) {
    var a = q.p.answers[q.i], v = q.val, m = q.meta, set = m['data-lcs-set'];
    // a blank box (data-lcs-optional with no answer, 2026-11-01): right only when left empty
    if (m['data-lcs-blank']) return v === '';
    if (set && C.sets && C.sets[set]) {
      if (!/^\d+$/.test(v)) return false;
      var n = parseInt(v, 10), mine = TY.indexOf(q);
      if (C.sets[set].indexOf(n) < 0) return false;
      for (var k = 0; k < mine; k++) if (TY[k].meta['data-lcs-set'] === set && parseInt(TY[k].val, 10) === n) return false;
      return true;
    }
    if (m['data-lcs-range']) {
      if (!/^\d+$/.test(v)) return false;
      var rg = String(m['data-lcs-range']).split('-'), x = parseInt(v, 10);
      if (rg[0] !== '' && x < parseInt(rg[0], 10)) return false;
      if (rg[1] !== '' && rg[1] != null && x > parseInt(rg[1], 10)) return false;
      return true;
    }
    // a decimal money box: the amount written with its separator and exactly two decimals ("17,36", never "1736")
    if (m['data-lcs-decimal'] != null) { var dp = v.split(m['data-lcs-decimal']); return dp.length === 2 && /^[0-9]+$/.test(dp[0]) && /^[0-9][0-9]$/.test(dp[1]) && parseInt(dp[0] + dp[1], 10) === a; }
    if (q.num) return parseInt(v, 10) === a;
    if (fold(v) === fold(a)) return true;
    var alts = String(m['data-lcs-alts'] || '').split('|');
    for (var j = 0; j < alts.length; j++) if (alts[j] && fold(alts[j]) === fold(v)) return true;
    return false;
  }
  /* ---- choice ---- */
  function choiceQ(p, i) {
    var it = p.items[i], q = { cls: 'choice', p: p, i: i, pick: -1, opts: [] };
    for (var j = 0; j < it.options.length; j++) (function (j) {
      var o = it.options[j], el = mk('lcs-opt', o, o.label + (it.label ? ' — ' + it.label : ''));
      el.setAttribute('aria-pressed', 'false'); el.setAttribute('data-lcs-q', String(Q.length)); el.setAttribute('data-lcs-o', String(j));
      el.addEventListener('click', function () { if (phase !== 'fill') return; q.pick = q.pick === j ? -1 : j; paint(); });
      q.opts.push(el);
    })(j);
    return q;
  }
  /* ---- select ---- */
  function selectQ(p, i) {
    var it = p.items[i], q = { cls: 'select', p: p, i: i, on: false, meta: it.meta || {} };
    q.el = mk(p.countGroups || p.sumGroups ? 'lcs-opt lcs-part' : 'lcs-opt', it, it.label || '');
    q.el.setAttribute('aria-pressed', 'false'); q.el.setAttribute('data-lcs-q', String(Q.length));
    q.el.addEventListener('click', function () { if (phase !== 'fill') return; q.on = !q.on; paint(); });
    return q;
  }
  /* ---- pair ---- */
  function byId(list, id) { for (var k = 0; k < list.length; k++) if (list[k].id === id) return list[k]; return null; }
  function unlink(q) { if (!q || q.to == null) return; var other = q.p.mutual ? byId(q.p.qs, q.to) : null; q.to = null; if (other && other.to === q.id) other.to = null; }
  function link(q, tid) { unlink(q); if (q.p.mutual) { var other = byId(q.p.qs, tid); if (other && other !== q) { unlink(other); other.to = q.id; } } q.to = tid; }
  function pairQ(p, i) {
    var it = p.items[i], q = { cls: 'pair', p: p, i: i, to: null, id: String(it.id), it: it };
    q.el = mk('lcs-item', it, it.label || '');
    q.el.setAttribute('aria-pressed', 'false'); q.el.setAttribute('data-lcs-q', String(Q.length));
    var b = document.createElement('span'); b.className = 'lcs-badge lcs-badge--pair'; b.setAttribute('aria-hidden', 'true');
    b.style.fontSize = Math.max(2.2, Math.min(3.4, it.w * 0.16)) + 'cqw';
    q.el.appendChild(b); q.badge = b;
    q.el.addEventListener('click', function () { if (phase !== 'fill') return; selItem = selItem === q ? null : q; paint(); });
    return q;
  }
  function pairTargets(p) {
    p.tEls = [];
    for (var k = 0; k < p.targets.length; k++) (function (t) {
      var el = mk('lcs-opt lcs-target', t, t.label || '');
      el.setAttribute('aria-pressed', 'false'); el.setAttribute('data-lcs-t', String(t.id));
      el.addEventListener('click', function () {
        if (phase !== 'fill') return;
        var tid = String(t.id);
        if (selItem && selItem.p === p) { if (selItem.id === tid) { selItem = null; } else { link(selItem, tid); selItem = null; } }
        else { for (var m = 0; m < p.qs.length; m++) if (p.qs[m].to === tid) unlink(p.qs[m]); }
        paint();
      });
      p.tEls.push(el);
    })(p.targets[k]);
  }
  function drawLinks() {
    if (!ink) return;
    var s = '';
    for (var i = 0; i < Q.length; i++) {
      var q = Q[i];
      if (q.cls !== 'pair' || q.to == null) continue;
      var t = byId(q.p.targets, q.to); if (!t) continue;
      var a = centre(q.it), b = centre(t), state = q.el.getAttribute('data-state') || '';
      s += '<line class="lcs-link" data-state="' + state + '" x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) + '" x2="' + b[0].toFixed(1) + '" y2="' + b[1].toFixed(1) + '"/>';
    }
    ink.innerHTML = s;
  }
  /* ---- place ---- */
  function placeBins(p) {
    p.bEls = []; p.cur = null;
    for (var k = 0; k < p.bins.length; k++) (function (b) {
      var el = mk('lcs-crayon lcs-bin', b, b.label || '');
      el.setAttribute('aria-pressed', 'false'); el.setAttribute('data-lcs-b', String(b.id));
      el.addEventListener('click', function () { if (phase !== 'fill') return; p.cur = p.cur === String(b.id) ? null : String(b.id); paint(); });
      p.bEls.push(el);
    })(p.bins[k]);
  }
  function placeQ(p, i) {
    var it = p.items[i], q = { cls: 'place', p: p, i: i, val: null, it: it, meta: it.meta || {} };
    q.el = mk('lcs-slot lcs-drop', it, it.label || '');
    q.el.setAttribute('data-lcs-q', String(Q.length));
    q.el.style.fontSize = Math.min(it.h * ASP * 0.5, it.w * 0.5) + 'cqw';
    q.el.addEventListener('click', function () { if (phase !== 'fill') return; q.val = p.cur != null ? p.cur : null; paint(); });
    return q;
  }
  /* ---- the page ---- */
  function selectOnly() { for (var i = 0; i < P.length; i++) if (P[i].cls !== 'select') return false; return true; }
  function ready() {
    var filled = {}, need = {}, anySel = false;
    for (var i = 0; i < Q.length; i++) {
      var q = Q[i];
      if (q.cls === 'type') { var set = q.meta['data-lcs-set']; if (set && C.sets && C.sets[set]) { need[set] = C.sets[set].length; filled[set] = (filled[set] || 0) + (q.val !== '' ? 1 : 0); } else if (q.val === '' && q.meta['data-lcs-optional'] == null) return false; }
      else if (q.cls === 'choice') { if (q.pick < 0) return false; }
      else if (q.cls === 'select') { if (q.on) anySel = true; }
      else if (q.cls === 'pair') { if (q.to == null) return false; }
      else if (q.cls === 'place') { if (q.val == null) return false; }
    }
    for (var k in need) if ((filled[k] || 0) < need[k]) return false;
    if (selectOnly() && !anySel) return false;
    return true;
  }
  function paint() {
    for (var i = 0; i < Q.length; i++) {
      var q = Q[i];
      if (q.cls === 'type') { q.el.textContent = q.val; fit(q); q.el.setAttribute('aria-pressed', TY[cur] === q && phase === 'fill' ? 'true' : 'false'); q.el.setAttribute('aria-label', (q.it.label || '') + (q.val ? ' = ' + q.val : '')); }
      else if (q.cls === 'choice') { for (var j = 0; j < q.opts.length; j++) q.opts[j].setAttribute('aria-pressed', q.pick === j ? 'true' : 'false'); }
      else if (q.cls === 'select') q.el.setAttribute('aria-pressed', q.on ? 'true' : 'false');
      else if (q.cls === 'pair') { q.el.setAttribute('aria-pressed', selItem === q ? 'true' : 'false'); var t = q.to == null ? null : byId(q.p.targets, q.to); q.badge.textContent = t ? (t.label || '') : ''; q.badge.className = t && t.label ? 'lcs-badge lcs-badge--pair on' : 'lcs-badge lcs-badge--pair'; }
      else if (q.cls === 'place') { var b = q.val == null ? null : byId(q.p.bins, q.val); q.el.innerHTML = b && !b.fill ? (b.html || esc(b.label || '')) : ''; q.el.style.background = b && b.fill ? b.fill : ''; q.el.setAttribute('data-filled', b ? '1' : '0'); q.el.setAttribute('aria-label', (q.it.label || '') + (b ? ' = ' + (b.label || '') : '')); }
    }
    for (var p = 0; p < P.length; p++) {
      var part = P[p];
      if (part.cls === 'pair') for (var k = 0; k < part.tEls.length; k++) { var tid = part.tEls[k].getAttribute('data-lcs-t'), linked = false; for (var m = 0; m < part.qs.length; m++) if (part.qs[m].to === tid) linked = true; part.tEls[k].setAttribute('aria-pressed', linked ? 'true' : 'false'); }
      if (part.cls === 'place') for (var k2 = 0; k2 < part.bEls.length; k2++) part.bEls[k2].setAttribute('aria-pressed', part.cur === part.bEls[k2].getAttribute('data-lcs-b') ? 'true' : 'false');
    }
    drawLinks();
    chk.disabled = !ready() || phase !== 'fill';
    if (pad) { var ks = pad.querySelectorAll('.lcs-key'); for (var x = 0; x < ks.length; x++) ks[x].disabled = phase !== 'fill'; }
  }
  function check() {
    if (!ready()) return;
    phase = 'reviewed';
    var ok = 0, tot = 0, groups = {}, order = [];
    for (var i = 0; i < Q.length; i++) {
      var q = Q[i], right, a;
      if (q.cls === 'type' && q.meta['data-lcs-set'] && q.val === '') { /* a spare space of a set, left empty: not a question */ }
      else if (q.cls === 'type') { right = R(typeRight(q)); q.el.setAttribute('data-state', right ? 'right' : 'wrong'); tot++; if (right) ok++; }
      else if (q.cls === 'choice') { right = R(q.pick === q.p.answers[q.i]); q.opts[q.pick].setAttribute('data-state', right ? 'right' : 'wrong'); tot++; if (right) ok++; }
      // a sum group (Money "make the amount"): right when the taken picks' values add up to the sum — one question
      else if (q.cls === 'select' && q.p.sumGroups) { var sg = 's' + q.meta['data-lcs-sumgroup']; if (!groups[sg]) { groups[sg] = { summed: true, target: parseInt(q.meta['data-lcs-sum'], 10), got: 0, qs: [] }; order.push(sg); } groups[sg].qs.push(q); if (q.on) groups[sg].got += parseInt(q.meta['data-lcs-value'], 10); }
      else if (q.cls === 'select' && q.p.countGroups) { var g = String(q.meta['data-lcs-group']); if (!groups[g]) { groups[g] = { n: 0, w: parseInt(q.meta['data-lcs-want'], 10), qs: [] }; order.push(g); } groups[g].qs.push(q); if (q.on) groups[g].n++; }
      else if (q.cls === 'select') { a = q.p.answers[q.i]; right = R(q.on === a); tot++; if (right) ok++; if (q.on) q.el.setAttribute('data-state', right ? 'right' : 'wrong'); else if (!right) q.el.setAttribute('data-state', 'missed'); }
      else if (q.cls === 'pair') { right = R(q.to === String(q.p.answers[q.i])); q.el.setAttribute('data-state', right ? 'right' : 'wrong'); tot++; if (right) ok++; }
      else if (q.cls === 'place' && q.meta && q.meta['data-lcs-cgroup'] != null) { var cg = 'c' + q.meta['data-lcs-cgroup']; if (!groups[cg]) { groups[cg] = { counted: true, spec: q.meta['data-lcs-colour-count'], qs: [] }; order.push(cg); } groups[cg].qs.push(q); }
      else if (q.cls === 'place') { right = R(q.val === String(q.p.answers[q.i])); q.el.setAttribute('data-state', right ? 'right' : 'wrong'); tot++; if (right) ok++; }
    }
    // a counted group (K-454): right when it holds as many of each bin as its spec, wherever they sit — one question
    for (var oc = 0; oc < order.length; oc++) {
      var cgr = groups[order[oc]]; if (!cgr.counted) continue;
      var want = {}, have = {}, sp = String(cgr.spec).split(',');
      for (var s1 = 0; s1 < sp.length; s1++) { var kv = sp[s1].split(':'); want[kv[0]] = parseInt(kv[1], 10); }
      for (var s2 = 0; s2 < cgr.qs.length; s2++) { var hv = cgr.qs[s2].val; have[hv] = (have[hv] || 0) + 1; }
      var cright = true; for (var wk in want) if ((have[wk] || 0) !== want[wk]) cright = false;
      for (var hk in have) if (!(hk in want)) cright = false;
      cright = R(cright); tot++; if (cright) ok++;
      for (var s3 = 0; s3 < cgr.qs.length; s3++) cgr.qs[s3].el.setAttribute('data-state', cright ? 'right' : 'wrong');
    }
    for (var o = 0; o < order.length; o++) { var gr = groups[order[o]]; if (gr.counted) continue; var gright = R(gr.summed ? gr.got === gr.target : gr.n === gr.w); tot++; if (gright) ok++; for (var k = 0; k < gr.qs.length; k++) if (gr.qs[k].on) gr.qs[k].el.setAttribute('data-state', gright ? 'right' : 'wrong'); else if (!gright) gr.qs[k].el.setAttribute('data-state', 'group-wrong'); }
    prg.textContent = fmt(S.score, { n: ok, total: tot }); chk.hidden = true; rst.hidden = false; paint();
    if (ok === tot) setTimeout(function () { cel.hidden = false; var c = document.getElementById('lcs-cele-close'); if (c) c.focus(); }, 450);
  }
  function clear(q, all) {
    var s = q.el ? q.el.getAttribute('data-state') : null, wrong;
    if (q.cls === 'choice') { wrong = q.pick >= 0 && q.opts[q.pick].getAttribute('data-state') === 'wrong'; if (all || wrong) q.pick = -1; for (var j = 0; j < q.opts.length; j++) q.opts[j].removeAttribute('data-state'); return wrong; }
    wrong = s === 'wrong' || s === 'group-wrong';
    if (q.cls === 'type' && (all || wrong)) q.val = '';
    else if (q.cls === 'select' && (all || wrong)) q.on = false;
    else if (q.cls === 'pair' && (all || wrong)) unlink(q);
    else if (q.cls === 'place' && (all || wrong)) q.val = null;
    q.el.removeAttribute('data-state');
    return wrong;
  }
  function retry() { phase = 'fill'; var first = -1; for (var i = 0; i < Q.length; i++) { var w = clear(Q[i], false); if (w && first < 0 && Q[i].cls === 'type') first = TY.indexOf(Q[i]); } selItem = null; cur = first < 0 ? (TY.length ? 0 : -1) : first; prg.textContent = ''; chk.hidden = false; rst.hidden = true; cel.hidden = true; paint(); show(cur); }
  function reset() { phase = 'fill'; for (var i = 0; i < Q.length; i++) clear(Q[i], true); for (var p = 0; p < P.length; p++) if (P[p].cls === 'place') P[p].cur = null; selItem = null; cur = TY.length ? 0 : -1; prg.textContent = ''; chk.hidden = false; rst.hidden = true; cel.hidden = true; paint(); }
  function key(lab, fn, cls, aria) { var b = document.createElement('button'); b.type = 'button'; b.className = 'lcs-key' + (cls ? ' ' + cls : ''); b.textContent = lab; b.setAttribute('aria-label', aria || lab); b.addEventListener('click', fn); pad.appendChild(b); }
  function init() {
    W = st.clientWidth || 703; H = st.clientHeight || 945; ASP = H / W;
    for (var p = 0; p < P.length; p++) {
      var part = P[p]; part.qs = [];
      if (part.cls === 'pair') pairTargets(part);
      if (part.cls === 'place') placeBins(part);
      for (var i = 0; i < part.items.length; i++) {
        var q = part.cls === 'type' ? typeQ(part, i) : part.cls === 'choice' ? choiceQ(part, i) : part.cls === 'select' ? selectQ(part, i) : part.cls === 'pair' ? pairQ(part, i) : placeQ(part, i);
        part.qs.push(q); Q.push(q);
      }
      if (part.cls === 'pair') { ink = document.createElementNS(NS, 'svg'); ink.setAttribute('viewBox', '0 0 ' + W + ' ' + H); ink.setAttribute('preserveAspectRatio', 'none'); ink.setAttribute('class', 'lcs-ink'); ink.setAttribute('aria-hidden', 'true'); ov.insertBefore(ink, ov.firstChild); }
    }
    if (pad && TY.length) {
      var KEYS = C.keys || [];
      if (C.pad === 'digits') { pad.className = 'lcs-pad'; ['1', '2', '3', '4', '5'].forEach(function (d) { key(d, function () { typeIn(d); }); }); key('⌫', back, 'lcs-key--fn', '⌫'); ['6', '7', '8', '9', '0'].forEach(function (d) { key(d, function () { typeIn(d); }); }); key('→', function () { step(1); }, 'lcs-key--fn', '→'); if (C.sep) key(C.sep, function () { typeIn(C.sep); }, 'lcs-key--fn', C.sep); }
      else { pad.className = 'lcs-pad lcs-pad--letters' + (C.symbolPad ? ' lcs-pad--symbols' : ''); KEYS.forEach(function (c) { key(c === ' ' ? '␣' : c, function () { typeIn(c); }, '', c === ' ' ? 'space' : c); }); key('⌫', back, 'lcs-key--fn', '⌫'); key('→', function () { step(1); }, 'lcs-key--fn', '→'); }
      document.addEventListener('keydown', function (e) {
        if (phase !== 'fill' || e.ctrlKey || e.metaKey || e.altKey) return;
        var a = document.activeElement, c = e.key && e.key.length === 1 ? e.key : '';
        if (C.sep && C.pad === 'digits' && (c === ',' || c === '.')) { typeIn(C.sep); e.preventDefault(); }
        else if (c && (C.pad === 'digits' ? /^[0-9]$/.test(c) : KEYS.indexOf(c.toLocaleLowerCase(B.locale || 'en')) >= 0)) { typeIn(C.pad === 'digits' ? c : c.toLocaleLowerCase(B.locale || 'en')); e.preventDefault(); }
        else if (e.key === 'Backspace' || e.key === 'Delete') { back(); e.preventDefault(); }
        else if (e.key === 'Enter' || e.key === 'ArrowDown' || (C.pad === 'digits' && e.key === 'ArrowRight')) { if (e.key === 'Enter' && a && a.classList && (a.classList.contains('lcs-btn') || a.classList.contains('lcs-key'))) return; step(1); e.preventDefault(); }
        else if (e.key === 'ArrowUp' || (C.pad === 'digits' && e.key === 'ArrowLeft')) { step(-1); e.preventDefault(); }
      });
    } else if (pad) pad.hidden = true;
    chk.textContent = S.check; rst.textContent = S.tryAgain; document.getElementById('lcs-cele-title').textContent = S.youDidIt; document.getElementById('lcs-cele-print').textContent = S.print; document.getElementById('lcs-cele-close').textContent = S.tryAgain;
    chk.addEventListener('click', check); rst.addEventListener('click', retry); document.getElementById('lcs-cele-close').addEventListener('click', reset);
    if (TY.length) cur = 0;
    window.__lcsMarks = { Q: function () { return Q; }, parts: P, check: check, retry: retry, reset: reset, ready: ready };
    paint();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}
const JS_MARKS = '(' + marksRuntime.toString() + ')();';

const CSS_MARKS = [
  '.lcs-item[aria-pressed="true"]{box-shadow:0 0 0 5px #146B5E;background:rgba(20,107,94,.12)}',
  '.lcs-badge--pair{left:auto;right:3%;top:3%;width:2.3em;height:2.3em;min-width:26px;min-height:26px}',
  '.lcs-opt.lcs-target[aria-pressed="true"]{box-shadow:0 0 0 4px #146B5E;background:rgba(20,107,94,.08)}',
  '.lcs-link{stroke:#146B5E;stroke-width:5;stroke-linecap:round;fill:none;opacity:.85}.lcs-link[data-state="right"]{stroke:#2E9E5B}.lcs-link[data-state="wrong"]{stroke:#D64545}',
  '.lcs-drop{font-family:Nunito,system-ui,sans-serif;font-weight:800;color:#3A3530;overflow:hidden}.lcs-drop[data-filled="1"]{background:rgba(20,107,94,.10);box-shadow:0 0 0 3px #146B5E}',
  '.lcs-drop img,.lcs-drop svg{max-width:90%;max-height:90%;pointer-events:none}',
  '.lcs-opt[data-state="group-wrong"]{box-shadow:0 0 0 4px #D64545;outline:3px dashed #D64545;outline-offset:3px;background:transparent}',
  '.lcs-pad--symbols{grid-template-columns:repeat(auto-fill,minmax(64px,1fr))}.lcs-pad--symbols .lcs-key{font-size:1.9rem;min-height:56px}',
].join('\n');

/* ---- validators of the three kinds served by JS_MARKS (2026-11-01) ---- */
const rect4 = (b, inPage, what) => { for (const k of ['x', 'y', 'w', 'h']) if (!inPage(b[k])) throw new Error('interactive-runtime: ' + what + ' ' + k + '=' + b[k] + ' outside the page'); };
const roundBox = (b, round) => ({ x: round(b.x), y: round(b.y), w: round(b.w), h: round(b.h) });
/** tap-pair: items (each with an id and its answer = a target id) + targets (unique ids); mutual when the ids are one set */
function preparePair(o, items, inPage, round) {
  const T = o.targets;
  if (!Array.isArray(T) || T.length < 2) throw new Error('interactive-runtime: tap-pair needs at least 2 targets');
  const ids = new Set();
  for (const t of T) { if (t.id == null || t.id === '') throw new Error('interactive-runtime: tap-pair target without an id'); if (ids.has(String(t.id))) throw new Error('interactive-runtime: tap-pair target id ' + t.id + ' twice'); ids.add(String(t.id)); rect4(t, inPage, 'tap-pair target'); }
  for (const it of items) { if (!ids.has(String(it.answer))) throw new Error('interactive-runtime: tap-pair item answers "' + it.answer + '", not a target'); if (it.id == null) throw new Error('interactive-runtime: tap-pair item without an id'); rect4(it, inPage, 'tap-pair item'); }
  if (!items.some((it) => String(it.answer) !== String(it.id))) throw new Error('interactive-runtime: tap-pair with nothing to pair');
  o.targets = T.map((t) => ({ ...roundBox(t, round), id: String(t.id), label: t.label == null ? '' : String(t.label) }));
  return items.map((it) => ({ ...roundBox(it, round), id: String(it.id), label: it.label || '', meta: it.meta || {} }));
}
/** tap-place: bins (unique ids; a label and / or the html the target shows) + items (drop targets; answer = a bin id) */
function preparePlace(o, items, inPage, round) {
  const Bn = o.bins;
  if (!Array.isArray(Bn) || Bn.length < 2) throw new Error('interactive-runtime: tap-place needs at least 2 bins');
  const ids = new Set();
  for (const b of Bn) { if (b.id == null || b.id === '') throw new Error('interactive-runtime: tap-place bin without an id'); if (ids.has(String(b.id))) throw new Error('interactive-runtime: tap-place bin id ' + b.id + ' twice'); ids.add(String(b.id)); rect4(b, inPage, 'tap-place bin'); if (!(b.label || b.html)) throw new Error('interactive-runtime: tap-place bin ' + b.id + ' shows nothing'); }
  const used = new Set();
  for (const it of items) { if (!ids.has(String(it.answer))) throw new Error('interactive-runtime: tap-place target answers "' + it.answer + '", not a bin'); used.add(String(it.answer)); rect4(it, inPage, 'tap-place target'); }
  if (used.size < 2 && Bn.length > 1 && items.length > 1) throw new Error('interactive-runtime: tap-place where every target takes the same bin');
  // fill (K-454, 2026-11-01): a colour bin paints its target instead of showing a label
  for (const b of Bn) if (b.fill != null && !/^#[0-9a-fA-F]{6}$/.test(String(b.fill))) throw new Error('interactive-runtime: tap-place bin ' + b.id + ' fill ' + b.fill + ' is not #rrggbb');
  o.bins = Bn.map((b) => ({ ...roundBox(b, round), id: String(b.id), label: b.label == null ? '' : String(b.label), ...(b.html ? { html: String(b.html) } : {}), ...(b.fill ? { fill: String(b.fill) } : {}) }));
  return items.map((it) => ({ ...roundBox(it, round), label: it.label || '', meta: it.meta || {} }));
}
/** marks: o.parts = [{ cls, items, answers?, targets?, bins?, num?, countGroups?, mutual? }], every part through its kind's rules */
function prepareParts(o) {
  const P = o.parts;
  if (!Array.isArray(P) || !P.length) throw new Error('interactive-runtime: marks needs parts');
  const C = o.ctx || {};
  let total = 0;
  const out = P.map((p) => {
    const items = p.items || [];
    const kind = p.cls === 'type' ? (p.num ? 'type-number' : 'type-word') : p.cls === 'choice' ? 'tap-choice' : p.cls === 'select' ? 'tap-select' : p.cls === 'pair' ? 'tap-pair' : p.cls === 'place' ? 'tap-place' : null;
    if (!kind) throw new Error('interactive-runtime: marks part of unknown class ' + p.cls);
    const sub = { kind, locale: o.locale, items, partOf: 'marks', ctx: p.cls === 'type' ? { maxDigits: C.maxDigits, maxChars: C.maxChars, keys: C.keys, symbolPad: !!C.symbolPad } : p.cls === 'select' && p.countGroups ? { countGroups: true } : {}, targets: p.targets, bins: p.bins };
    const r = prepare(sub);
    total += p.cls === 'select' && p.countGroups ? new Set(items.map((it) => String(it.meta['data-lcs-group']))).size : p.cls === 'select' && p.sumGroups ? new Set(items.map((it) => String(it.meta['data-lcs-sumgroup']))).size : items.length;
    return { cls: p.cls, items: r.bundleItems, answers: r.answers, ...(p.cls === 'type' ? { num: !!p.num } : {}), ...(p.cls === 'select' ? { countGroups: !!p.countGroups, ...(p.sumGroups ? { sumGroups: true } : {}) } : {}), ...(p.cls === 'pair' ? { targets: sub.targets, mutual: !!p.mutual } : {}), ...(p.cls === 'place' ? { bins: sub.bins } : {}) };
  });
  if (!total) throw new Error('interactive-runtime: marks with nothing to answer');
  const type = out.filter((p) => p.cls === 'type');
  if (type.length) {
    if (!['digits', 'letters'].includes(C.pad)) throw new Error('interactive-runtime: marks with write boxes needs ctx.pad = digits | letters');
    if (C.pad === 'digits' && type.some((p) => !p.num)) throw new Error('interactive-runtime: a digit pad cannot type a word');
  }
  return out;
}

/**
 * Validate one kind's items and round their geometry (the body of buildInteractive until 2026-11-01, unchanged; a PART of a
 * `marks` screen goes through the same code with o.partOf set, which lowers the two-item floor to one — a composite page
 * is one task with several questions).
 * @returns {{ bundleItems, answers, ranks }}
 */
function prepare(o) {
  const items = o.items || [];
  // one item is a whole task for tap-spell / tap-choice (Story Sequencing level 1, 2026-10-01: one story to put in order)
  if (items.length < (o.kind === 'marks' ? 0 : (o.kind === 'tap-spell' || o.kind === 'tap-choice' || o.kind === 'trace-path' || o.partOf) ? 1 : 2)) throw new Error('interactive-runtime: fewer than 2 items');
  const answers = items.map((it) => it.answer);
  const inPage = (v) => Number.isFinite(v) && v >= -5 && v <= 105;
  const round = (v) => Math.round(v * 1000) / 1000;
  let bundleItems;
  let ranks = null;
  if (o.kind === 'tap-order') {
    // ctx.ranksFromAnswers (Days and Months, 2026-10-06): some ranks are PRINTED on the page (the first day, or a middle
    // one) and only the others are tapped — each tap then writes the next rank still open (e.g. 2, 3, 5, 6), never 1..n.
    // Opt-in only: every other tap-order type keeps the strict 1..n check.
    if (o.ctx && o.ctx.ranksFromAnswers) {
      ranks = answers.slice().sort((a, b) => a - b);
      if (!ranks.every((r, i) => Number.isInteger(r) && r > 0 && (i === 0 || r > ranks[i - 1]))) throw new Error('interactive-runtime: tap-order ranks are not distinct positive integers');
    } else {
      const want = items.map((_, i) => i + 1).join(',');
      if (answers.slice().sort((a, b) => a - b).join(',') !== want) throw new Error('interactive-runtime: tap-order answers are not a permutation of 1..' + items.length);
    }
    for (const it of items) {
      for (const k of ['x', 'y', 'w', 'h', 'sx', 'sy', 'sw', 'sh']) if (!inPage(it[k])) throw new Error('interactive-runtime: item ' + k + '=' + it[k] + ' outside the page');
    }
    bundleItems = items.map((it) => ({ x: round(it.x), y: round(it.y), w: round(it.w), h: round(it.h), sx: round(it.sx), sy: round(it.sy), sw: round(it.sw), sh: round(it.sh), label: it.label }));
  } else if (o.kind === 'tap-select') {
    if (!answers.every((a) => a === true || a === false)) throw new Error('interactive-runtime: tap-select answers must be true / false');
    if (!answers.some((a) => a) || answers.every((a) => a)) throw new Error('interactive-runtime: tap-select needs both kinds of item (something to find, something to leave)');
    // ctx.countGroups (Fractions 2026-10-08): items are the parts of shapes; a shape is right when the number of
    // tapped parts is its "want" (any parts). Every item names its group and want; a want leaves parts untapped.
    if (o.ctx && o.ctx.countGroups) {
      const G = {};
      for (const it of items) {
        const g = it.meta && it.meta['data-lcs-group'], w = Number(it.meta && it.meta['data-lcs-want']);
        if (g == null || !Number.isInteger(w) || w < 1) throw new Error('interactive-runtime: countGroups item without a group / want');
        (G[g] = G[g] || { w, n: 0 }).n++;
        if (G[g].w !== w) throw new Error('interactive-runtime: countGroups group ' + g + ' with two wants');
      }
      for (const g of Object.keys(G)) if (G[g].w >= G[g].n) throw new Error('interactive-runtime: countGroups group ' + g + ' wants ' + G[g].w + ' of ' + G[g].n + ' parts');
    }
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
  } else if (o.kind === 'tap-paint') {
    const P = o.ctx && o.ctx.paint;
    if (!P || !P.art || typeof P.art.svg !== 'string' || !Array.isArray(P.crayons) || P.crayons.length < 2) throw new Error('interactive-runtime: tap-paint needs ctx.paint {art, crayons}');
    for (const k of ['x', 'y', 'w', 'h']) if (!inPage(P.art[k])) throw new Error('interactive-runtime: tap-paint art ' + k + ' outside the page');
    const cols = new Set(P.crayons.map((c) => c.colour));
    for (const it of items) if (!cols.has(it.answer) || !P.hex[it.answer]) throw new Error('interactive-runtime: tap-paint part ' + it.region + ' wants "' + it.answer + '", not a crayon of the key');
    for (const c of P.crayons) for (const k of ['x', 'y', 'w', 'h']) if (!inPage(c[k])) throw new Error('interactive-runtime: crayon ' + k + ' outside the page');
    bundleItems = items.map((it) => ({ region: String(it.region), label: it.label || '', meta: it.meta || {} }));
  } else if (o.kind === 'trace-path') {
    const T = o.ctx && o.ctx.trace;
    if (!T || !Array.isArray(T.nodes) || !Array.isArray(T.edges) || !Array.isArray(T.routes) || !T.routes.length) throw new Error('interactive-runtime: trace-path needs ctx.trace {nodes, edges, routes}');
    for (const p of T.nodes) if (!inPage(p[0]) || !inPage(p[1])) throw new Error('interactive-runtime: trace-path node outside the page');
    for (const e of T.edges) { if (!(e.a >= 0 && e.a < T.nodes.length && e.b >= 0 && e.b < T.nodes.length) || !Array.isArray(e.pts) || e.pts.length < 2) throw new Error('interactive-runtime: trace-path edge malformed'); for (const p of e.pts) if (!inPage(p[0]) || !inPage(p[1])) throw new Error('interactive-runtime: trace-path edge leaves the page'); }
    for (const r of T.routes) if (!(r.start >= 0 && r.start < T.nodes.length && r.goal >= 0 && r.goal < T.nodes.length) || r.start === r.goal) throw new Error('interactive-runtime: trace-path route malformed');
    if (!(T.aspect > 0) || !(T.pageW > 0) || !(T.w > 0)) throw new Error('interactive-runtime: trace-path needs aspect, pageW, w');
    bundleItems = items.map((it) => ({ label: it.label || '', meta: it.meta || {} }));
  } else if (o.kind === 'type-number') {
    // the child WRITES each number: integer answers, one box per empty box of the page, a digit cap from the page
    const mx = o.ctx && o.ctx.maxDigits;
    if (!(Number.isInteger(mx) && mx >= 1 && mx <= 4)) throw new Error('interactive-runtime: type-number needs ctx.maxDigits');
    for (const it of items) {
      if (!Number.isInteger(it.answer) || it.answer < 0) throw new Error('interactive-runtime: type-number answer ' + it.answer + ' is not a whole number');
      if (String(it.answer).length > mx) throw new Error('interactive-runtime: type-number answer ' + it.answer + ' has more digits than the cap ' + mx);
      for (const k of ['x', 'y', 'w', 'h']) if (!inPage(it[k])) throw new Error('interactive-runtime: type-number box ' + k + '=' + it[k] + ' outside the page');
    }
    // Level Set 2026-10-14 (Odd and Even): ctx.sortSets — boxes of a set take any number of it, each number once — and
    // ctx.picks — printed choices to tap as well. Both opt-in; they select JS_TYPE_PLUS (every other deck keeps JS_TYPE).
    const SS = o.ctx && o.ctx.sortSets, PK = o.ctx && o.ctx.picks;
    if (SS) {
      const keys = Object.keys(SS);
      if (keys.length < 2) throw new Error('interactive-runtime: sortSets needs at least two sets');
      const seen = new Set();
      for (const k of keys) {
        if (!Array.isArray(SS[k]) || !SS[k].length || SS[k].some((v) => !Number.isInteger(v) || v < 0 || String(v).length > mx)) throw new Error('interactive-runtime: sortSets.' + k + ' is not a list of whole numbers within the digit cap');
        for (const v of SS[k]) { if (seen.has(v)) throw new Error('interactive-runtime: ' + v + ' belongs to two sets'); seen.add(v); }
        const boxes = items.filter((it) => it.meta && it.meta['data-lcs-set'] === k).length;
        if (boxes < SS[k].length) throw new Error('interactive-runtime: set ' + k + ' has ' + SS[k].length + ' numbers but ' + boxes + ' boxes');
      }
      for (const it of items) if (it.meta && it.meta['data-lcs-set'] && !SS[it.meta['data-lcs-set']]) throw new Error('interactive-runtime: a box of the unknown set ' + it.meta['data-lcs-set']);
    }
    if (PK) {
      if (!Array.isArray(PK) || !PK.length) throw new Error('interactive-runtime: picks must be a non-empty list');
      for (const p of PK) {
        if (!Array.isArray(p.options) || p.options.length < 2) throw new Error('interactive-runtime: a pick with < 2 options');
        if (!(Number.isInteger(p.answer) && p.answer >= 0 && p.answer < p.options.length)) throw new Error('interactive-runtime: a pick without exactly one right option');
        for (const op of p.options) for (const k of ['x', 'y', 'w', 'h']) if (!inPage(op[k])) throw new Error('interactive-runtime: pick option ' + k + '=' + op[k] + ' outside the page');
      }
    }
    bundleItems = items.map((it) => ({ x: round(it.x), y: round(it.y), w: round(it.w), h: round(it.h), label: it.label || '', meta: it.meta || {} }));
  } else if (o.kind === 'type-word') {
    // the child WRITES each word: string answers, a letter pad that can type every one of them, a cap from the page
    const mc = o.ctx && o.ctx.maxChars, keys = o.ctx && o.ctx.keys;
    if (!(Number.isInteger(mc) && mc >= 2 && mc <= 40) || !Array.isArray(keys) || keys.length < (o.ctx.symbolPad ? 2 : 20)) throw new Error('interactive-runtime: type-word needs ctx.maxChars + ctx.keys');
    for (const it of items) {
      if (typeof it.answer !== 'string' || !it.answer) throw new Error('interactive-runtime: type-word box without a word');
      if ([...it.answer].length > mc) throw new Error('interactive-runtime: type-word answer "' + it.answer + '" longer than the cap ' + mc);
      for (const c of [...it.answer.normalize('NFC').toLocaleLowerCase(o.locale || 'en')]) if (!keys.includes(c)) throw new Error('interactive-runtime: the letter pad cannot type "' + c + '" of "' + it.answer + '"');
      for (const k of ['x', 'y', 'w', 'h']) if (!inPage(it[k])) throw new Error('interactive-runtime: type-word box ' + k + '=' + it[k] + ' outside the page');
    }
    bundleItems = items.map((it) => ({ x: round(it.x), y: round(it.y), w: round(it.w), h: round(it.h), label: it.label || '', meta: it.meta || {} }));
  } else if (o.kind === 'set-clock') {
    // the child sets the hands: one clock face per item, its centre + radius in % of the stage, its time "h:mm"
    const K = o.ctx && o.ctx.clock;
    if (!K || !(K.aspect > 0) || !K.names || !K.names.hour || !K.names.minute) throw new Error('interactive-runtime: set-clock needs ctx.clock {aspect, names}');
    for (const it of items) {
      if (!/^([1-9]|1[0-2]):[0-5]\d$/.test(String(it.answer))) throw new Error('interactive-runtime: set-clock answer "' + it.answer + '" is not a clock time');
      if (!inPage(it.cx) || !inPage(it.cy) || !(it.r > 1 && it.r < 50)) throw new Error('interactive-runtime: set-clock face outside the page');
      const st = String(it.meta && it.meta['data-lcs-step']);
      if (!['0', '1', '5'].includes(st)) throw new Error('interactive-runtime: set-clock step "' + st + '"');
      if (st === '5' && +String(it.answer).split(':')[1] % 5) throw new Error('interactive-runtime: set-clock time ' + it.answer + ' off the five-minute snap');
    }
    bundleItems = items.map((it) => ({ cx: round(it.cx), cy: round(it.cy), r: round(it.r), label: it.label || '', meta: it.meta || {} }));
  } else if (o.kind === 'mark-grid') {
    bundleItems = markGridItems(items, o.ctx, inPage, round);
  } else if (o.kind === 'tap-pair') {
    bundleItems = preparePair(o, items, inPage, round);
  } else if (o.kind === 'tap-place') {
    bundleItems = preparePlace(o, items, inPage, round);
  } else if (o.kind === 'marks') {
    bundleItems = [];
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
  return { bundleItems, answers, ranks };
}

/**
 * @param {object} o { kind, locale, strings, items: [{x,y,w,h,sx,sy,sw,sh,label,answer}] (% of page) }
 * @returns {{ css, stageOpen, stageClose, controls, script }}
 */
function buildInteractive(o) {
  if (!KINDS.has(o.kind)) throw new Error('interactive-runtime: unknown kind ' + o.kind);
  const S = o.strings;
  if (!S || typeof S.check !== 'string' || typeof S.tryAgain !== 'string' || typeof S.score !== 'string') throw new Error('interactive-runtime: buildInteractive needs the runtime strings (o.strings)');
  const { bundleItems, answers, ranks } = prepare(o);
  // the composite screen: every part validated by its own kind's rules (prepare), the geometry rounded the same way
  const parts = o.kind === 'marks' ? prepareParts(o) : null;
  const needPad = o.kind === 'type-number' || o.kind === 'type-word' || (parts && parts.some((p) => p.cls === 'type'));
  const bundle = { kind: o.kind, locale: o.locale, strings: S, ctx: o.ctx || null, items: bundleItems, answers, ...(ranks ? { ranks } : {}), ...(o.kind === 'tap-edit' ? { marks: o.marks } : {}), ...(o.kind === 'tap-pair' ? { targets: o.targets } : {}), ...(o.kind === 'tap-place' ? { bins: o.bins } : {}), ...(parts ? { parts } : {}) };
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  return {
    css: o.kind === 'set-clock' ? CSS + '\n' + CSS_SET_CLOCK : o.kind === 'mark-grid' ? CSS + '\n' + CSS_MARK_GRID : MARKS_KINDS.has(o.kind) ? CSS + '\n' + CSS_MARKS : CSS,
    stageOpen: '<div class="lcs-stage" id="lcs-stage">',
    stageClose: '<div id="lcs-overlay"></div></div>' + (o.kind === 'tap-edit' ? '\n<div class="lcs-tools" id="lcs-tools" role="toolbar"></div>\n<div id="lcs-lanes"></div>' : '')
      + (needPad ? '\n<div class="lcs-pad" id="lcs-pad" role="group"></div>' : ''),
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
    script: '<script>window.DECK_BUNDLE=' + JSON.stringify(bundle).replace(/</g, '\\u003c') + ';</script>\n<script>' + (o.kind === 'type-number' ? ((o.ctx && (o.ctx.sortSets || o.ctx.picks)) ? JS_TYPE_PLUS : JS_TYPE) : o.kind === 'type-word' ? JS_WORD : o.kind === 'tap-choice' ? JS_CHOICE : o.kind === 'tap-edit' ? JS_EDIT : o.kind === 'tap-select' ? JS_SELECT : o.kind === 'tap-spell' ? JS_SPELL : o.kind === 'tap-paint' ? JS_PAINT : o.kind === 'trace-path' ? JS_TRACE : o.kind === 'set-clock' ? JS_SET_CLOCK : o.kind === 'mark-grid' ? JS_MARK_GRID : MARKS_KINDS.has(o.kind) ? JS_MARKS : JS) + '</script>',
  };
}

module.exports = { buildInteractive, prepare, KINDS, MARKS_KINDS, CSS, CSS_MARKS, JS_MARKS, marksRuntime, runtimeStringsShape: ['check', 'tryAgain', 'youDidIt', 'allCorrect', 'score', 'print'] };
