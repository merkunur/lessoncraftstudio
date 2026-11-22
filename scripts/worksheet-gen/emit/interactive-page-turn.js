/**
 * emit/interactive-page-turn.js — the `page-turn` screen kind (Daily Teaching System, readers, 2026-11-22).
 *
 * The screen version of a mini-book: the book one page at a time, upright and large, with Back and Next (also the arrow
 * keys and a swipe). The cover comes first, then the three pages. On the last page "The end" opens the page's own
 * celebration, and that is the whole report: the class reporter (scripts/class-results/web/lcs-class.js) records a
 * celebration with no Check behind it as "finished" (PART-9-DESIGN.md §5). There is nothing to mark and no Check
 * button: reading is the task. No sound (speech synthesis is unreliable in six of the eleven languages).
 *
 * The page is drawn from DATA (the book's texts as printed, its pictures as inline images), never from a picture of the
 * paper sheet, whose pages are folded and two of them upside down. Lines break where the book breaks them (" | "),
 * never by themselves; the type size follows the longest line so a line always fits the card.
 *
 * Built in Node only (emit/interactive-runtime.js routes the kind here); the makers' browser core is not involved.
 * Every string comes from the book type (types/_shared/reader-book.js SCREEN_UI), in the book's language.
 */
'use strict';
const core = require('./interactive-runtime-core.js');

const UI_KEYS = ['back', 'next', 'end', 'page', 'cover', 'done', 'again', 'print', 'retell'];

const CSS_PAGE_TURN = [
  // the book fits a laptop window with its buttons in view; never narrower than 300 px, never wider than 640 px
  '.lcs-book-stage{width:min(100%,640px,max(300px,calc(100svh - 250px)));margin:0 auto}',
  // the paper cover is the picture before the script runs; once the book is drawn it is gone (author CSS shows the image)
  '.lcs-book-stage .lcs-worksheet__img[hidden]{display:none !important}',
  '.lcs-book{box-sizing:border-box;position:relative;width:100%;aspect-ratio:1/1;margin:0 auto;background:#FFFFFF;border:2px solid #E6DCCB;border-radius:22px;box-shadow:0 10px 28px rgba(20,50,45,.10);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(10px,4cqi,26px);padding:clamp(16px,6cqi,40px) clamp(14px,5cqi,34px);container-type:inline-size;overflow:hidden;touch-action:pan-y;user-select:none;-webkit-user-select:none}',
  '.lcs-book[hidden]{display:none}',
  '.lcs-book.is-in{animation:lcsBookIn .26s ease-out}',
  '.lcs-book.is-back{animation:lcsBookBack .26s ease-out}',
  // a short fade, upward: a sideways slide would make the page scroll sideways while it runs
  '@keyframes lcsBookIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
  '@keyframes lcsBookBack{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}',
  '@media (prefers-reduced-motion:reduce){.lcs-book.is-in,.lcs-book.is-back{animation:none}}',
  '.lcs-book-title{font-family:"Baloo 2",Nunito,sans-serif;font-weight:700;color:#146B5E;text-align:center;line-height:1.08;font-size:clamp(26px,11cqi,60px);margin:0}',
  '.lcs-book-icon{display:block;width:40cqi;height:auto}',
  '.lcs-book-tag{font-family:Nunito,sans-serif;font-weight:700;color:#5F6F6C;font-size:clamp(13px,3.4cqi,17px);text-align:center}',
  '.lcs-book-pic{display:block;height:auto;max-height:52cqi;object-fit:contain;pointer-events:none}',
  '.lcs-book-text{font-family:Nunito,sans-serif;font-weight:800;color:#1E2B29;text-align:center;line-height:1.3;word-spacing:.12em;margin:0;font-size:var(--max,52px)}',
  '.lcs-book-text span{display:block;white-space:nowrap}',
  '.lcs-book-no{position:absolute;right:16px;bottom:10px;font-family:"Baloo 2",Nunito,sans-serif;font-weight:700;font-size:17px;color:#7A8784}',
  '.lcs-book-controls{gap:14px}',
  '.lcs-book-dots{display:inline-flex;gap:8px;align-items:center}',
  '.lcs-book-dots i{display:block;width:11px;height:11px;border-radius:50%;background:#D9D1C3}',
  '.lcs-book-dots i.on{background:#146B5E}',
  '.lcs-book-end{background:#F2784B;color:#1E2B29}',   // dark on coral: white on coral is under 3:1
  // the celebration: a drawn book, not stars (stars read as a rating to adults); a decodable book asks for a retell, the
  // screen's stand-in for the paper's "draw what it says"; reading again is the child's own button, printing the adult's
  '.lcs-cele-book{display:flex;justify-content:center;margin:2px 0 4px}.lcs-cele-book svg{width:96px;height:auto}',
  '.lcs-cele-retell{font-family:Nunito,sans-serif;font-weight:700;font-size:1.1rem;line-height:1.35;color:#1E2B29;margin:-6px 0 18px;text-wrap:balance}',
  '.lcs-cele-retell[hidden]{display:none}',
  '.lcs-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}',
  '@media print{.lcs-book{display:none !important}.lcs-book-stage .lcs-worksheet__img{display:block !important}}',
].join('\n');

/* the cover of a decodable book: an open book, drawn (a decodable book carries no picture that could give a word away) */
const ICON = '<svg class="lcs-book-icon" viewBox="0 0 120 84" aria-hidden="true"><path d="M60 16C46 6 24 4 8 8v64c16-4 38-2 52 8 14-10 36-12 52-8V8C96 4 74 6 60 16z" fill="#FBF3E4" stroke="#146B5E" stroke-width="4" stroke-linejoin="round"/><path d="M60 16v64" stroke="#146B5E" stroke-width="4"/><path d="M20 24c10-2 22-1 30 3M20 36c10-2 22-1 30 3M20 48c10-2 22-1 30 3M70 27c8-4 20-5 30-3M70 39c8-4 20-5 30-3M70 51c8-4 20-5 30-3" stroke="#F2784B" stroke-width="3.5" stroke-linecap="round" fill="none"/></svg>';

/* The runtime, as source lines (no template literals inside; joined at emit). */
const JS_PAGE_TURN = [
  '(function(){',
  'var B=window.DECK_BUNDLE,U=B.strings,K=B.ctx.book,i=0;',
  'var book=document.getElementById("lcs-book"),img=document.getElementById("lcs-worksheet-img"),back=document.getElementById("lcs-book-back"),next=document.getElementById("lcs-book-next"),end=document.getElementById("lcs-book-end"),dots=document.getElementById("lcs-book-dots"),st=document.getElementById("lcs-book-status"),cel=document.getElementById("lcs-celebration");',
  'var total=K.pages.length+1,ICON=' + JSON.stringify(ICON) + ';',
  'function fmt(s,v){return s.replace(/\\{(\\w+)\\}/g,function(_,k){return v[k]!=null?v[k]:""})}',
  'function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}',
  'function pic(src,w){var p=el("img","lcs-book-pic");p.src=src;p.alt="";p.style.width=w;return p}',
  'function text(lines,max){var t=el("p","lcs-book-text"),all=lines.join(" ");t.setAttribute("data-lines",JSON.stringify(lines));t.setAttribute("data-one",(all.match(/[.!?](?=\\s|$)/g)||[]).length===1?"1":"0");t.style.setProperty("--max",max+"px");t.setAttribute("data-max",String(max));return t}',
  /* the type is as large as the page allows: measured, never estimated (a line never wraps; the longest sets the size) */
  /* the lines are the book's (" | "); a page of ONE sentence goes on one line when the window is wide enough for it at
     nearly the size of the broken lines (a narrow paper column broke it, the screen need not); two sentences keep theirs */
  'function fit(){var t=book.querySelector(".lcs-book-text");if(!t)return;var lines=JSON.parse(t.getAttribute("data-lines")),mx=+t.getAttribute("data-max"),cs=getComputedStyle(book),room=(book.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight))*0.94;',
  'function size(ls){t.innerHTML="";for(var j=0;j<ls.length;j++)t.appendChild(el("span",null,ls[j]));t.style.fontSize=mx+"px";var w=t.scrollWidth;return w>room?Math.floor(mx*room/w):mx}',
  'var s=size(lines),use=lines;if(lines.length>1&&t.getAttribute("data-one")==="1"){var one=[lines.join(" ")],s1=size(one);if(s1>=s*0.9&&s1>=30){use=one;s=s1}}size(use);t.style.fontSize=s+"px"}',
  'function draw(dir){book.innerHTML="";book.classList.remove("is-in","is-back");void book.offsetWidth;if(dir)book.classList.add(dir>0?"is-in":"is-back");',
  'if(i===0){book.appendChild(el("p","lcs-book-title",K.title));if(K.cover)book.appendChild(pic(K.cover,"46cqi"));else{var ic=el("span");ic.setAttribute("aria-hidden","true");ic.innerHTML=ICON;book.appendChild(ic.firstChild)}book.appendChild(el("div","lcs-book-tag",K.tag));book.setAttribute("aria-label",K.title+", "+U.cover)}',
  'else{var p=K.pages[i-1];if(p.pic)book.appendChild(pic(p.pic,"calc("+(44*(p.scale||1))+"cqi)"));book.appendChild(text(p.lines,p.pic?46:60));book.appendChild(el("span","lcs-book-no",String(i+1)));book.setAttribute("aria-label",fmt(U.page,{n:i+1,total:total}))}',
  'var d="";for(var k=0;k<total;k++)d+="<i"+(k===i?\' class="on"\':"")+"></i>";dots.innerHTML=d;',
  'back.disabled=i===0;var last=i===total-1;next.hidden=last;end.hidden=!last;st.textContent=fmt(U.page,{n:i+1,total:total});fit()}',
  'function go(d){if(!cel.hidden)return;var j=i+d;if(j<0||j>=total)return;i=j;draw(d)}',
  'function finish(){cel.hidden=false;var c=document.getElementById("lcs-cele-close");if(c)c.focus()}',
  'function again(){cel.hidden=true;i=0;draw(-1);next.focus()}',
  'function init(){img.hidden=true;book.hidden=false;',
  'back.textContent="\\u2190 "+U.back;next.textContent=U.next+" \\u2192";end.textContent=U.end;',
  'document.getElementById("lcs-cele-title").textContent=U.done;document.getElementById("lcs-cele-print").textContent=U.print;document.getElementById("lcs-cele-close").textContent=U.again;var rt=document.getElementById("lcs-cele-retell");rt.textContent=U.retell;rt.hidden=!K.retell;',
  'back.addEventListener("click",function(){go(-1)});next.addEventListener("click",function(){go(1)});end.addEventListener("click",finish);document.getElementById("lcs-cele-close").addEventListener("click",again);',
  'document.addEventListener("keydown",function(e){if(e.altKey||e.ctrlKey||e.metaKey)return;var t=e.target&&e.target.tagName;if(t==="INPUT"||t==="TEXTAREA")return;if(e.key==="ArrowRight"){go(1);e.preventDefault()}else if(e.key==="ArrowLeft"){go(-1);e.preventDefault()}else if(e.key==="Escape"&&!cel.hidden){cel.hidden=true}});',
  'var x0=null;book.addEventListener("pointerdown",function(e){x0=e.clientX});book.addEventListener("pointerup",function(e){if(x0===null)return;var dx=e.clientX-x0;x0=null;if(dx<-50)go(1);else if(dx>50)go(-1)});book.addEventListener("pointercancel",function(){x0=null});',
  'window.addEventListener("resize",fit);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);',
  'draw(0)}',
  'if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();',
  '})();',
].join('\n');

/**
 * @param {object} o { locale, ctx: { book: {title, tag, cover, retell, pages: [{lines, pic, scale}]}, ui } }
 *   pictures are inline images (data: URIs) — the deck page is self-contained.
 * @returns {{ css, stageOpen, stageClose, controls, script }}
 */
function buildPageTurn(o) {
  const ctx = o.ctx || {};
  const K = ctx.book, U = ctx.ui;
  if (!K || typeof K.title !== 'string' || !K.title.trim() || typeof K.tag !== 'string') throw new Error('page-turn: the book needs a title and a tag');
  if (!U) throw new Error('page-turn: no screen strings');
  for (const k of UI_KEYS) if (typeof U[k] !== 'string' || !U[k].trim()) throw new Error('page-turn: the screen string "' + k + '" is missing');
  if (!/\{n\}/.test(U.page) || !/\{total\}/.test(U.page)) throw new Error('page-turn: the page string lacks {n}/{total}');
  if (!Array.isArray(K.pages) || K.pages.length < 1 || K.pages.length > 12) throw new Error('page-turn: a book has 1 to 12 pages');
  const isPic = (s) => typeof s === 'string' && /^data:image\/(webp|png|jpeg);base64,/.test(s);
  if (K.cover != null && !isPic(K.cover)) throw new Error('page-turn: the cover picture must be an inline image');
  K.pages.forEach((p, i) => {
    if (!Array.isArray(p.lines) || !p.lines.length || p.lines.some((l) => typeof l !== 'string' || !l.trim())) throw new Error('page-turn: page ' + (i + 2) + ' has no text');
    if (p.pic != null && !isPic(p.pic)) throw new Error('page-turn: the picture of page ' + (i + 2) + ' must be an inline image');
    if (!(p.scale > 0.3 && p.scale < 2)) throw new Error('page-turn: page ' + (i + 2) + ' has the picture scale ' + p.scale);
  });
  if (typeof K.retell !== 'boolean') throw new Error('page-turn: the book must say whether the celebration asks for a retell');
  const book = { title: K.title, tag: K.tag, cover: K.cover || null, retell: K.retell, pages: K.pages.map((p) => ({ lines: p.lines, pic: p.pic || null, scale: p.scale })) };
  const bundle = { kind: 'page-turn', locale: o.locale, strings: U, ctx: { book }, items: [], answers: [] };
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  return {
    css: core.CSS + '\n' + CSS_PAGE_TURN,
    stageOpen: '<div class="lcs-stage lcs-book-stage" id="lcs-stage">',
    stageClose: '<div class="lcs-book" id="lcs-book" role="region" aria-roledescription="book" hidden></div></div>',
    controls: [
      '<div class="lcs-controls lcs-book-controls">',
      '  <button type="button" class="lcs-btn lcs-btn--ghost" id="lcs-book-back" disabled>' + esc('← ' + U.back) + '</button>',
      '  <span class="lcs-book-dots" id="lcs-book-dots" aria-hidden="true"></span>',
      '  <button type="button" class="lcs-btn" id="lcs-book-next">' + esc(U.next + ' →') + '</button>',
      '  <button type="button" class="lcs-btn lcs-book-end" id="lcs-book-end" hidden>' + esc(U.end) + '</button>',
      '  <span class="lcs-sr" id="lcs-book-status" aria-live="polite"></span>',
      '</div>',
      '<div id="lcs-celebration" role="dialog" aria-modal="true" aria-labelledby="lcs-cele-title" hidden><div class="lcs-cele-card">',
      '  <div class="lcs-cele-book" aria-hidden="true">' + ICON.replace('class="lcs-book-icon"', '') + '</div>',
      '  <h2 id="lcs-cele-title">' + esc(U.done) + '</h2>',
      '  <p class="lcs-cele-retell" id="lcs-cele-retell"' + (book.retell ? '' : ' hidden') + '>' + esc(U.retell) + '</p>',
      '  <button type="button" class="lcs-btn" id="lcs-cele-close">' + esc(U.again) + '</button>',
      '  <a class="lcs-btn lcs-btn--ghost" id="lcs-cele-print" href="__PDF_URL__">' + esc(U.print) + '</a>',
      '</div></div>',
    ].join('\n'),
    script: '<script>window.DECK_BUNDLE=' + JSON.stringify(bundle).replace(/</g, '\\u003c') + ';</script>\n<script>' + JS_PAGE_TURN + '</script>',
  };
}

module.exports = { buildPageTurn, CSS_PAGE_TURN, JS_PAGE_TURN, UI_KEYS };
