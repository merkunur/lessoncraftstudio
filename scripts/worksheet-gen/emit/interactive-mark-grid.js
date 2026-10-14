/**
 * emit/interactive-mark-grid.js — the `mark-grid` runtime kind (Level Set walk #69, Logic Grid Puzzles, 2026-10-15).
 *
 * The screen IS the printed elimination grid: every empty cell of the page is a tap target laid exactly over it. A tap
 * draws a tick (teal), a second tap a cross (coral), a third tap clears the cell — the same two marks the paper asks
 * for, in the page's own glyphs. The ticks are the answer: Check (enabled once every graded row holds a tick) marks a
 * row right when its ONE tick sits on the answer and wrong otherwise; crosses are the child's working and are never
 * graded. Cells of an ungraded body (the two-attribute page's picture × picture grid) take marks too but are not checked.
 * "Try again" keeps the right rows and takes the ticks out of the wrong ones (their crosses stay — working).
 *
 * DECK_BUNDLE.items[i] = { label, meta: {'data-lcs-row': '<group>:<row>'} } — one per GRADED row; answers[i] = the column.
 * DECK_BUNDLE.ctx.grid.cells[k] = { x, y, w, h, g, r, c, label } in % of the cropped page; ctx.grid.cases = the clue
 * stamps of every case (the robot's oracle solves them itself — never reads the answer map).
 */
'use strict';

const TICK = 'M14 31l9 9 21-22';
const CROSS = 'M14 14l32 32M46 14L14 46';

const CSS_MARK_GRID = [
  '.lcs-cell{position:absolute;margin:0;padding:0;border:0;background:transparent;border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent;touch-action:manipulation}',
  '.lcs-cell:focus-visible{outline:4px solid #4E5FE8;outline-offset:-4px}',
  '.lcs-cell svg{width:62%;height:62%;pointer-events:none}',
  '.lcs-cell[data-state="right"]{box-shadow:inset 0 0 0 5px #2E9E5B;background:rgba(46,158,91,.16)}',
  '.lcs-cell[data-state="wrong"]{box-shadow:inset 0 0 0 5px #D64545;background:rgba(214,69,69,.14)}',
].join('\n');

/* The runtime, as source lines (joined at emit; no template literals inside). */
const JS_MARK_GRID = [
  '(function(){',
  'var B=window.DECK_BUNDLE,S=B.strings,G=B.ctx.grid,els=[],m=[],phase="fill";',
  'var TICK=' + JSON.stringify(TICK) + ',CROSS=' + JSON.stringify(CROSS) + ';',
  'var ov=document.getElementById("lcs-overlay"),chk=document.getElementById("lcs-check"),rst=document.getElementById("lcs-reset"),prg=document.getElementById("lcs-progress"),cel=document.getElementById("lcs-celebration");',
  'function fmt(s,v){return s.replace(/\\{(\\w+)\\}/g,function(_,k){return v[k]!=null?v[k]:""})}',
  'var rows={};for(var i=0;i<B.items.length;i++)rows[B.items[i].meta["data-lcs-row"]]=i;',
  'function rowOf(k){var c=G.cells[k];return rows[c.g+":"+c.r]}',
  'function glyph(v){if(!v)return "";var y=v===1;return \'<svg viewBox="0 0 60 60" aria-hidden="true"><path d="\'+(y?TICK:CROSS)+\'" fill="none" stroke="\'+(y?"#146B5E":"#F2784B")+\'" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>\'}',
  'function ticksOf(i){var t=[];for(var k=0;k<G.cells.length;k++)if(rowOf(k)===i&&m[k]===1)t.push(k);return t}',
  'function paint(){for(var k=0;k<els.length;k++){els[k].innerHTML=glyph(m[k]);els[k].setAttribute("aria-pressed",m[k]?"true":"false");els[k].setAttribute("data-mark",m[k]===1?"tick":m[k]===2?"cross":"")}var all=true;for(var i=0;i<B.items.length;i++)if(!ticksOf(i).length)all=false;chk.disabled=!all||phase!=="fill"}',
  'function tap(k){if(phase!=="fill")return;m[k]=(m[k]+1)%3;paint()}',
  'function check(){phase="reviewed";var ok=0;for(var i=0;i<B.items.length;i++){var t=ticksOf(i),right=t.length===1&&G.cells[t[0]].c===B.answers[i];if(right)ok++;for(var j=0;j<t.length;j++)els[t[j]].setAttribute("data-state",right?"right":"wrong")}',
  'prg.textContent=fmt(S.score,{n:ok,total:B.items.length});chk.hidden=true;rst.hidden=false;paint();if(ok===B.items.length){setTimeout(function(){cel.hidden=false;var c=document.getElementById("lcs-cele-close");if(c)c.focus()},450)}}',
  'function reset(){for(var k=0;k<els.length;k++){if(els[k].getAttribute("data-state")==="wrong")m[k]=0;els[k].removeAttribute("data-state")}phase="fill";prg.textContent="";chk.hidden=false;rst.hidden=true;cel.hidden=true;paint()}',
  'function init(){for(var k=0;k<G.cells.length;k++){(function(k){var c=G.cells[k],el=document.createElement("button");el.type="button";el.className="lcs-cell";el.setAttribute("aria-label",c.label);m[k]=0;',
  'el.style.left=c.x+"%";el.style.top=c.y+"%";el.style.width=c.w+"%";el.style.height=c.h+"%";el.addEventListener("click",function(){tap(k)});ov.appendChild(el);els.push(el)})(k)}',
  'chk.textContent=S.check;rst.textContent=S.tryAgain;document.getElementById("lcs-cele-title").textContent=S.youDidIt;document.getElementById("lcs-cele-print").textContent=S.print;document.getElementById("lcs-cele-close").textContent=S.tryAgain;',
  'chk.addEventListener("click",check);rst.addEventListener("click",reset);document.getElementById("lcs-cele-close").addEventListener("click",function(){cel.hidden=true});paint()}',
  'if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();',
  '})();',
].join('\n');

/** Validates a mark-grid bundle (throws) and returns its bundle items. */
function markGridItems(items, ctx, inPage, round) {
  const Gd = ctx && ctx.grid;
  if (!Gd || !Array.isArray(Gd.cells) || Gd.cells.length < 4 || !Array.isArray(Gd.cases) || !Gd.cases.length) throw new Error('interactive-runtime: mark-grid needs ctx.grid {cells, cases}');
  const ids = new Set();
  for (const c of Gd.cells) {
    for (const k of ['x', 'y', 'w', 'h']) if (!inPage(c[k])) throw new Error('interactive-runtime: mark-grid cell ' + k + '=' + c[k] + ' outside the page');
    const id = c.g + ':' + c.r + ':' + c.c;
    if (ids.has(id)) throw new Error('interactive-runtime: mark-grid cell ' + id + ' twice');
    ids.add(id);
  }
  const seen = new Set();
  for (const it of items) {
    const row = it.meta && it.meta['data-lcs-row'];
    if (!row || seen.has(row)) throw new Error('interactive-runtime: mark-grid item without a unique row');
    seen.add(row);
    if (!ids.has(row + ':' + it.answer)) throw new Error('interactive-runtime: mark-grid row ' + row + ' answer ' + it.answer + ' is not one of its cells');
  }
  Gd.cells = Gd.cells.map((c) => ({ x: round(c.x), y: round(c.y), w: round(c.w), h: round(c.h), g: String(c.g), r: c.r, c: c.c, label: c.label || '' }));
  return items.map((it) => ({ label: it.label || '', meta: it.meta }));
}

module.exports = { JS_MARK_GRID, CSS_MARK_GRID, markGridItems };
