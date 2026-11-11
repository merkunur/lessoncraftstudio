/**
 * The children's class page, /c/<code> — the HTML (Daily Teaching System, Part 9.3).
 *
 * One static document for every class: the page reads its code from its own address and asks the public child
 * routes (/api/class/*) for the rest. A pure string function (no Next, no Node module), so the website route
 * (app/c/[code]/route.ts) and the local class preview (scripts/class-results/dev-server.js) serve the same bytes.
 *
 * What a child sees: the class name, a grid of pictures (their seat: picture + first name, or picture + number),
 * then their worksheets as big rows with one mark each (start · done · done for today). Never a score.
 *
 * Privacy, by construction:
 *  - no third party: fonts and pictures come from this site; no analytics script is on this page;
 *  - Referrer-Policy no-referrer (meta here, header in the route): the class code never travels to a worksheet
 *    page's logs as "where the visitor came from";
 *  - the page remembers which seat was tapped only in this tab (sessionStorage) and for 20 minutes, so a child
 *    comes back from a worksheet to their own list and the next child on a shared tablet does not.
 *  - every name is written with textContent: a teacher's text is never parsed as markup.
 *
 * ES5 in the page script on purpose: this runs on whatever tablet a school has.
 */
import { CHILD_STRINGS } from './child-strings';

const FONTS = '/makers-assets/fonts';

const CSS = `
@font-face{font-family:'Baloo 2';font-weight:700;font-display:swap;src:url(${FONTS}/baloo2-700-latin.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:'Baloo 2';font-weight:700;font-display:swap;src:url(${FONTS}/baloo2-700-latin-ext.woff2) format('woff2');unicode-range:U+0100-02AF,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:'Nunito';font-weight:700;font-display:swap;src:url(${FONTS}/nunito-700-latin.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:'Nunito';font-weight:700;font-display:swap;src:url(${FONTS}/nunito-700-latin-ext.woff2) format('woff2');unicode-range:U+0100-02AF,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:#FBF3E4;color:#14322D;font-family:'Nunito',system-ui,-apple-system,'Segoe UI',sans-serif;font-weight:700;min-height:100vh}
main{max-width:1040px;margin:0 auto;padding:20px 16px 48px}
h1{font-family:'Baloo 2','Nunito',sans-serif;font-size:1.5rem;line-height:1.2;margin:0 0 4px;color:#146B5E;overflow-wrap:anywhere}
h2{font-family:'Baloo 2','Nunito',sans-serif;font-size:1.9rem;line-height:1.15;margin:10px 0 18px;color:#14322D}
button{font:inherit;color:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}
button:focus-visible{outline:4px solid #14322D;outline-offset:3px}
.c-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:14px}
.c-seat{display:flex;flex-direction:column;align-items:center;gap:6px;min-height:168px;padding:12px 8px 10px;background:#FFFDF8;border:3px solid #E6D9BF;border-radius:22px;box-shadow:0 3px 0 #E6D9BF}
.c-seat:active{transform:translateY(2px);box-shadow:0 1px 0 #E6D9BF}
.c-seat img{width:96px;height:96px;object-fit:contain;display:block}
.c-seat .c-num{font-family:'Baloo 2','Nunito',sans-serif;font-size:1.5rem;line-height:1;color:#146B5E}
.c-seat .c-nm{font-size:1.15rem;line-height:1.15;text-align:center;overflow-wrap:anywhere}
.c-seat.c-numbers .c-num{font-size:2.2rem}
.c-me{display:flex;align-items:center;gap:14px;margin:6px 0 4px;padding:10px 12px;background:#FFFDF8;border:3px solid #E6D9BF;border-radius:22px}
.c-me img{width:72px;height:72px;object-fit:contain;flex:none}
.c-me .c-who{flex:1;min-width:0;font-family:'Baloo 2','Nunito',sans-serif;font-size:1.6rem;line-height:1.1;overflow-wrap:anywhere}
.c-switch{flex:none;display:flex;align-items:center;gap:8px;min-height:56px;padding:8px 16px;background:#FBF3E4;border:3px solid #146B5E;border-radius:999px;color:#146B5E;font-size:1rem}
.c-switch svg{width:28px;height:28px;flex:none}
.c-list{display:flex;flex-direction:column;gap:12px;margin:0;padding:0;list-style:none}
.c-work{display:flex;align-items:center;gap:14px;width:100%;min-height:88px;padding:12px 14px;text-align:left;background:#FFFDF8;border:3px solid #E6D9BF;border-radius:22px;box-shadow:0 3px 0 #E6D9BF}
.c-work:active{transform:translateY(2px);box-shadow:0 1px 0 #E6D9BF}
.c-work[disabled]{opacity:.6}
.c-ord{flex:none;width:56px;height:56px;border-radius:50%;background:#146B5E;color:#FBF3E4;display:flex;align-items:center;justify-content:center;font-family:'Baloo 2','Nunito',sans-serif;font-size:1.7rem;line-height:1}
.c-ttl{flex:1;min-width:0;font-size:1.25rem;line-height:1.25;overflow-wrap:anywhere}
.c-st{flex:none;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.c-st svg{width:32px;height:32px}
.c-st[data-state=new]{background:#F2784B;color:#FFFDF8}
.c-st[data-state=done],.c-st[data-state=mastered]{background:#DDEFE6;color:#146B5E}
.c-st[data-state=rest]{background:#E5E3F2;color:#4B4780}
.c-card{max-width:520px;margin:48px auto 0;padding:28px 22px;text-align:center;background:#FFFDF8;border:3px solid #E6D9BF;border-radius:26px}
.c-card svg{width:84px;height:84px;color:#146B5E}
.c-card h2{margin:12px 0 8px}
.c-card p{margin:0 0 18px;font-size:1.15rem;line-height:1.4}
.c-btn{min-height:60px;padding:12px 30px;background:#146B5E;color:#FBF3E4;border:0;border-radius:999px;font-size:1.2rem}
.c-note{font-size:1.15rem;line-height:1.4;margin:18px 0}
.c-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@media (max-width:420px){.c-grid{grid-template-columns:repeat(2,1fr)}.c-switch span{display:none}.c-switch{padding:8px 14px}h2{font-size:1.6rem}}
@media (prefers-reduced-motion:reduce){.c-seat:active,.c-work:active{transform:none}}
`;

/* The page script. `S` = the strings of the 11 languages; everything else is read from the address and the API. */
const SCRIPT = `
(function () {
  'use strict';
  var S = __STRINGS__;
  var code = (location.pathname.split('/').filter(Boolean)[1] || '').toLowerCase();
  var view = document.getElementById('c-view'), nameEl = document.getElementById('c-name');
  var lang = (navigator.language || 'en').slice(0, 2).toLowerCase();
  if (lang === 'nb' || lang === 'nn') lang = 'no';
  if (!S[lang]) lang = 'en';
  var T = S[lang], cls = null, busy = false;
  var SEAT_KEY = 'lcs-class-seat', KEEP_MS = 20 * 60 * 1000;

  var ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5z"/></svg>',
    done: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    rest: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a.6.6 0 0 0-.8-.7A9.6 9.6 0 1 0 21.2 15a.6.6 0 0 0-.7-.8z"/></svg>',
    people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.4"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17.5" cy="9" r="2.6"/><path d="M17 14.5a5 5 0 0 1 4.8 5"/></svg>',
    teacher: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>'
  };

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function clear() { while (view.firstChild) view.removeChild(view.firstChild); }
  function iconUrl(key, size) {
    if (typeof key !== 'string' || !/^[a-z ]+\\/[a-z_]+$/.test(key)) return '';
    var p = key.split('/');
    return '/image-library-webp/themes/' + encodeURIComponent(p[0]) + '/' + encodeURIComponent(p[1]) + '@' + size + 'x.webp';
  }
  function picture(key) {
    var i = document.createElement('img');
    i.alt = ''; i.decoding = 'async'; i.width = 96; i.height = 96;
    var u = iconUrl(key, 1);
    if (u) { i.src = u; i.srcset = u + ' 1x, ' + iconUrl(key, 2) + ' 2x'; }
    return i;
  }
  function api(method, path, body, cb) {
    var opt = { method: method, credentials: 'omit', cache: 'no-store', headers: {} };
    if (body) { opt.headers['Content-Type'] = 'application/json'; opt.body = JSON.stringify(body); }
    fetch(path, opt).then(function (r) { return r.json().then(function (j) { cb(r.status, j); }, function () { cb(r.status, null); }); }, function () { cb(0, null); });
  }
  function remember(seatId) { try { sessionStorage.setItem(SEAT_KEY, JSON.stringify({ c: code, s: seatId, t: Date.now() })); } catch (e) {} }
  function forget() { try { sessionStorage.removeItem(SEAT_KEY); } catch (e) {} }
  function remembered() {
    try {
      var v = JSON.parse(sessionStorage.getItem(SEAT_KEY) || 'null');
      if (v && v.c === code && typeof v.s === 'string' && Date.now() - v.t < KEEP_MS) return v.s;
    } catch (e) {}
    return null;
  }

  /* a card in place of everything: a picture, one sentence, at most one button */
  function card(icon, title, body, btn, act) {
    clear();
    var c = el('section', 'c-card');
    c.innerHTML = icon;
    c.appendChild(el('h2', null, title));
    if (body) c.appendChild(el('p', null, body));
    if (btn) { var b = el('button', 'c-btn', btn); b.type = 'button'; b.onclick = act; c.appendChild(b); }
    view.appendChild(c);
    if (btn) c.lastChild.focus();
  }
  function failed(retry) { card(ICON.teacher, T.error, null, T.back, retry); }

  function showSeats() {
    forget(); clear();
    view.appendChild(el('h2', null, T.pick));
    if (!cls.seats.length) { view.appendChild(el('p', 'c-note', T.emptySeats + ' ' + T.askTeacher)); return; }
    var grid = el('div', 'c-grid');
    cls.seats.forEach(function (s) {
      var b = el('button', 'c-seat' + (s.name ? '' : ' c-numbers'));
      b.type = 'button';
      b.setAttribute('data-seat', s.id);
      b.setAttribute('aria-label', s.name ? s.name : T.number.replace('{n}', s.n));
      b.appendChild(picture(s.icon));
      if (s.name) b.appendChild(el('span', 'c-nm', s.name)); else b.appendChild(el('span', 'c-num', String(s.n)));
      b.onclick = function () { openSeat(s.id); };
      grid.appendChild(b);
    });
    view.appendChild(grid);
  }

  function openSeat(seatId) {
    if (busy) return; busy = true;
    api('GET', '/api/class/' + code + '/seat/' + encodeURIComponent(seatId), null, function (status, j) {
      busy = false;
      if (status === 404) { showSeats(); return; }
      if (status !== 200 || !j) { failed(function () { openSeat(seatId); }); return; }
      if (j.inactive) { closed(); return; }
      remember(seatId);
      clear();
      var me = el('div', 'c-me');
      var img = picture(j.seat.icon); img.width = 72; img.height = 72;
      me.appendChild(img);
      me.appendChild(el('div', 'c-who', j.seat.name ? j.seat.name : String(j.seat.n)));
      var sw = el('button', 'c-switch'); sw.type = 'button'; sw.id = 'c-switch';
      sw.innerHTML = ICON.people; sw.appendChild(el('span', null, T.switchChild)); sw.setAttribute('aria-label', T.switchChild);
      sw.onclick = showSeats;
      me.appendChild(sw);
      view.appendChild(me);
      view.appendChild(el('h2', null, T.work));
      if (!j.assignments.length) { view.appendChild(el('p', 'c-note', T.emptyWork + ' ' + T.askTeacher)); return; }
      var list = el('ol', 'c-list');
      j.assignments.forEach(function (a, i) {
        var li = el('li'), b = el('button', 'c-work');
        b.type = 'button';
        b.setAttribute('data-assignment', a.id);
        b.appendChild(el('span', 'c-ord', String(i + 1)));
        b.appendChild(el('span', 'c-ttl', a.title));
        var st = el('span', 'c-st');
        st.setAttribute('data-state', a.state);
        st.innerHTML = a.state === 'new' ? ICON.play : a.state === 'rest' ? ICON.rest : ICON.done;
        b.appendChild(st);
        b.appendChild(el('span', 'c-sr', a.state === 'new' ? T.stateNew : a.state === 'rest' ? T.stateRest : T.stateDone));
        b.onclick = function () { start(seatId, a.id, b); };
        li.appendChild(b); list.appendChild(li);
      });
      view.appendChild(list);
    });
  }

  function start(seatId, assignmentId, btn) {
    if (busy) return; busy = true; btn.disabled = true;
    api('POST', '/api/class/start', { code: code, seatId: seatId, assignmentId: assignmentId }, function (status, j) {
      busy = false; btn.disabled = false;
      var again = function () { openSeat(seatId); };
      if (status === 200 && j && j.inactive) { closed(); return; }
      if (status === 200 && j && typeof j.url === 'string' && j.url.charAt(0) === '/' && j.url.charAt(1) !== '/') {
        remember(seatId);
        try { sessionStorage.setItem('lcs-class-back', '/c/' + code); } catch (e) {}
        location.href = j.url;
        return;
      }
      if (status === 200 && j && j.done === 'mastered') { card(ICON.done, T.masteredTitle, T.masteredBody, T.back, again); return; }
      if ((status === 200 && j && j.done) || status === 429) { card(ICON.rest, T.restTitle, T.restBody, T.back, again); return; }
      if (status === 404) { again(); return; }
      failed(again);
    });
  }

  function closed() { nameEl.textContent = ''; card(ICON.teacher, T.inactive, T.askTeacher); }

  function load() {
    clear();
    view.appendChild(el('p', 'c-note', T.loading));
    if (!/^[a-z2-9]{10}$/.test(code)) { card(ICON.teacher, T.notFound, T.askTeacher); return; }
    api('GET', '/api/class/' + code, null, function (status, j) {
      if (status === 404) { card(ICON.teacher, T.notFound, T.askTeacher); return; }
      if (status !== 200 || !j) { failed(load); return; }
      if (j.inactive) { closed(); return; }
      cls = j;
      if (S[j.locale]) { lang = j.locale; T = S[lang]; document.documentElement.lang = lang; }
      nameEl.textContent = j.name;
      document.title = j.name;
      var seat = remembered();
      if (seat) openSeat(seat); else showSeats();
    });
  }
  /* back from a worksheet through the browser's Back button: the page may be restored as it was, with yesterday's marks */
  window.addEventListener('pageshow', function (ev) { if (ev.persisted) load(); });
  load();
})();
`;

/** the class page document (the same for every class) */
export function childPageHtml(): string {
  const strings = JSON.stringify(CHILD_STRINGS).replace(/</g, '\\u003c');
  return '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
    + '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
    + '<meta name="robots" content="noindex, nofollow">\n'
    + '<meta name="referrer" content="no-referrer">\n'
    + '<title>LessonCraftStudio</title>\n<link rel="icon" href="data:,">\n'
    + '<style>' + CSS + '</style>\n</head>\n<body>\n<main>\n<h1 id="c-name"></h1>\n<div id="c-view" aria-live="polite"></div>\n</main>\n'
    + '<script>' + SCRIPT.replace('__STRINGS__', () => strings) + '</script>\n</body>\n</html>\n';
}

/** the headers the class page is served with */
export const CHILD_PAGE_HEADERS: Record<string, string> = {
  'Content-Type': 'text/html; charset=utf-8',
  'X-Robots-Tag': 'noindex, nofollow',
  'Cache-Control': 'no-store',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
};
