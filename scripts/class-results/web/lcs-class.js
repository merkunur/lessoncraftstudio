/**
 * lcs-class.js — the class reporter (Daily Teaching System, Part 9; docs/daily-teaching-system/PART-9-DESIGN.md).
 *
 * Loaded by lcs-meter.js ONLY when the page address carries a class attempt token after '#'
 * (…/decks/<slug>/#lcs=<20 chars>): a child opened this page from a teacher's class page. Without that
 * token this file is never requested and nothing on the page changes.
 *
 * What it does:
 *   1. Class mode: hides the page furniture a child should not wander into (site header and footer, share,
 *      embed, download and print buttons, "more worksheets" links). The worksheet and its buttons stay.
 *   2. Watches the worksheet's own Check button. On each Check it reads what the page itself shows —
 *      how many answers were right, and which — and POSTs it to /api/class/report with the token.
 *      It never decides right or wrong itself and never reads what the child typed.
 *   3. Shows ONE big button after the first Check: "next page" (a Level Set continues) or "back to the
 *      class page". No score, no stars, no timer, no words to read: an arrow or a house.
 *
 * Nothing is sent before the child presses Check, nothing identifies the device, no cookie is read or
 * set, and a failed report never blocks the worksheet (fail-open).
 *
 * How a result is read (the page's own marks, in this order of trust):
 *   a. the worksheet runtime's progress line "{n} of {total} correct", parsed with the page's own
 *      template (window.DECK_BUNDLE.strings.score) — worksheet-gen screens;
 *   b. the marks on the page: [data-state="right"|"wrong"] (worksheet-gen) or elements whose class ends in
 *      --correct / --wrong (the app-generated decks);
 *   c. neither readable: the report says only that Check was pressed, and "finished" when the page's own
 *      celebration opens. The teacher then sees "played", never an invented number.
 *
 * ES5 on purpose: this runs on whatever tablet a school has.
 */
(function () {
  'use strict';
  try {
    var m = /[#&]lcs=([a-z2-9]{20})(?:&|$)/.exec(window.location.hash || '');
    if (!m || window.__lcsClass) return;
    var TOKEN = m[1];
    window.__lcsClass = { token: TOKEN, sent: 0 };

    var LANG = (function () {
      try { if (window.DECK_BUNDLE && window.DECK_BUNDLE.contentLanguage) return String(window.DECK_BUNDLE.contentLanguage).slice(0, 2); } catch (e) {}
      return (document.documentElement.lang || 'en').slice(0, 2);
    })();
    /* the only words: labels for a screen reader (the buttons themselves are pictures) */
    var L = {
      en: { next: 'Next page', back: 'Back to the class page' },
      de: { next: 'Nächste Seite', back: 'Zurück zur Klassenseite' },
      fr: { next: 'Page suivante', back: 'Retour à la page de la classe' },
      es: { next: 'Página siguiente', back: 'Volver a la página del grupo' },
      pt: { next: 'Próxima página', back: 'Voltar à página da turma' },
      it: { next: 'Pagina successiva', back: 'Torna alla pagina della classe' },
      nl: { next: 'Volgende pagina', back: 'Terug naar de klaspagina' },
      sv: { next: 'Nästa sida', back: 'Tillbaka till klassens sida' },
      da: { next: 'Næste side', back: 'Tilbage til klassens side' },
      no: { next: 'Neste side', back: 'Tilbake til klassens side' },
      fi: { next: 'Seuraava sivu', back: 'Takaisin luokan sivulle' }
    };
    var T = L[LANG] || L.en;

    function $(id) { return document.getElementById(id); }

    /* 1 — class mode */
    function classMode() {
      var css = document.createElement('style');
      css.id = 'lcs-class-style';
      css.textContent =
        'body.lcs-class-mode #lcs-site-chrome,body.lcs-class-mode #lcs-site-footer,body.lcs-class-mode .lcs-class-hide,' +
        'body.lcs-class-mode #lcs-share,body.lcs-class-mode #lcs-embed,body.lcs-class-mode #lcs-deck-actions,' +
        'body.lcs-class-mode #lcs-deck-ladder,body.lcs-class-mode #lcs-maker-ribbon,body.lcs-class-mode .lcs-end-deck,' +
        'body.lcs-class-mode .lcs-deckend-suggestions,body.lcs-class-mode .lcs-teaching,body.lcs-class-mode #lcs-cele-print,' +
        'body.lcs-class-mode .lcs-download,body.lcs-class-mode .lcs-download-cta,' +
        'body.lcs-class-mode .lcs-attrib-link{display:none !important}' +
        '#lcs-class-go{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:76px;height:76px;border-radius:50%;border:4px solid #FBF3E4;' +
        'background:#146B5E;color:#FBF3E4;box-shadow:0 6px 18px rgba(0,0,0,.28);display:flex;align-items:center;justify-content:center;cursor:pointer;' +
        'padding:0;-webkit-tap-highlight-color:transparent;text-decoration:none;animation:lcs-class-in .35s ease-out}' +
        '#lcs-class-go[data-kind="next"]{background:#F2784B}' +
        '#lcs-class-go:focus-visible{outline:4px solid #1B1B1B;outline-offset:3px}' +
        '#lcs-class-go svg{width:40px;height:40px;display:block}' +
        '@keyframes lcs-class-in{from{transform:scale(.4);opacity:0}to{transform:scale(1);opacity:1}}' +
        '@media (prefers-reduced-motion:reduce){#lcs-class-go{animation:none}}' +
        'body.lcs-class-room{padding-bottom:112px !important}' +
        '@media print{#lcs-class-go{display:none !important}body.lcs-class-room{padding-bottom:0 !important}}';
      document.head.appendChild(css);
      /* <footer class="lcs-footer"> is two different things: on the worksheet-gen pages a credit line with a link
         out, on the app-generated pages THE BAR THAT HOLDS CHECK. Hide it only when it holds no button. */
      var foot = document.querySelectorAll('footer.lcs-footer'), i;
      for (i = 0; i < foot.length; i++) if (!foot[i].querySelector('button')) foot[i].classList.add('lcs-class-hide');
      document.body.classList.add('lcs-class-mode');
    }

    /* 3 — the one button */
    var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    var HOUSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11.5 12 4l8 7.5"/><path d="M6.5 10v9.5h11V10"/></svg>';
    function sameSite(path) { return typeof path === 'string' && path.charAt(0) === '/' && path.charAt(1) !== '/'; }
    function showGo(reply) {
      var next = reply && sameSite(reply.next) ? reply.next : null;
      var back = reply && sameSite(reply.back) ? reply.back : null;
      var href = next || back;
      if (!href) return;
      var a = $('lcs-class-go') || document.createElement('a');
      a.id = 'lcs-class-go';
      a.setAttribute('data-kind', next ? 'next' : 'back');
      a.setAttribute('aria-label', next ? T.next : T.back);
      a.setAttribute('title', next ? T.next : T.back);
      a.innerHTML = next ? ARROW : HOUSE;
      a.href = href;
      if (next) a.onclick = function (ev) {
        /* the next page of a Level Set may be THIS path with another token: a hash-only change does not
           reload, so go there explicitly */
        ev.preventDefault();
        var here = window.location.pathname;
        window.location.href = href;
        if (href.split('#')[0] === here) window.location.reload();
      };
      if (!a.parentNode) document.body.appendChild(a);
      document.body.classList.add('lcs-class-room');
      place();
    }
    /* Keep the button clear of the page's own buttons. Two cases:
       - buttons that scroll with the page: class mode adds room below the page (body.lcs-class-room), so the
         last row can always be scrolled clear of the button;
       - a bar PINNED to the bottom edge (the app-generated pages hold Check / Try again in one): it never
         scrolls away, so the button is lifted to sit just above it. */
    function pinned(el) {
      for (var n = el; n && n.nodeType === 1 && n !== document.body; n = n.parentNode) {
        var p = window.getComputedStyle(n).position;
        if (p === 'fixed' || p === 'sticky') return n;
      }
      return null;
    }
    function place() {
      var a = $('lcs-class-go');
      if (!a) return;
      a.style.bottom = '16px';
      var ids = ['lcs-check', 'lcs-reset', 'lcs-summary'], r = a.getBoundingClientRect(), up = 0, i;
      for (i = 0; i < ids.length; i++) {
        var e = $(ids[i]);
        if (!shown(e)) continue;
        var bar = pinned(e);
        if (!bar) continue;
        var b = bar.getBoundingClientRect();
        /* only a bar that the button, in its home corner, would actually sit on */
        if (b.right <= r.left || b.left >= r.right || b.bottom <= r.top || b.top >= r.bottom) continue;
        up = Math.max(up, window.innerHeight - b.top + 12);
      }
      if (up) a.style.bottom = Math.min(up, Math.max(16, window.innerHeight - r.height - 8)) + 'px';
    }

    /* 2 — reading the page's own marks */
    function scoreFromText() {
      /* worksheet-gen screens: the progress line, parsed with the page's own template */
      var prg = $('lcs-progress'), B = window.DECK_BUNDLE;
      var tpl = B && B.strings && typeof B.strings.score === 'string' ? B.strings.score : null;
      if (prg && tpl && tpl.indexOf('{n}') >= 0 && tpl.indexOf('{total}') >= 0) {
        var text = (prg.textContent || '').replace(/\s+/g, ' ').replace(/^ | $/g, '');
        var order = tpl.indexOf('{n}') < tpl.indexOf('{total}') ? ['n', 'total'] : ['total', 'n'];
        var src = tpl.replace(/\s+/g, ' ').replace(/[.*+?^$()|[\]\\]/g, '\\$&').replace(/\{n\}|\{total\}/g, '(\\d+)').replace(/\{\w+\}/g, '.*?');
        var r = text ? new RegExp('^' + src + '$').exec(text) : null;
        if (r) {
          var out = {}; out[order[0]] = parseInt(r[1], 10); out[order[1]] = parseInt(r[2], 10);
          if (out.total >= 1 && out.n <= out.total) return { right: out.n, total: out.total };
        }
        return null;
      }
      /* app-generated pages: their own summary line ("3 of 6 correct", in the page's language). Exactly two
         numbers, the smaller is the right answers: that holds in every word order. "All correct!" has none. */
      var sum = $('lcs-summary');
      if (sum) {
        var nums = (sum.textContent || '').match(/\d+/g);
        if (nums && nums.length === 2) {
          var x = parseInt(nums[0], 10), y = parseInt(nums[1], 10);
          if (Math.max(x, y) >= 1) return { right: Math.min(x, y), total: Math.max(x, y) };
        }
      }
      return null;
    }
    function marks() {
      var list = [], i;
      var st = ($('lcs-app') || document.body).querySelectorAll('[data-state="right"],[data-state="wrong"]');
      if (st.length) { for (i = 0; i < st.length; i++) list.push(st[i].getAttribute('data-state') === 'right' ? 1 : 0); return list; }
      /* app-generated pages mark an answer with a class ending in --correct / --wrong. Only the worksheet
         itself is read (the same answers are echoed as dots in a progress row), and only the OUTERMOST marked
         element of each answer (a marked box may hold a marked icon). */
      var scope = $('lcs-worksheet') || $('lcs-overlay') || $('lcs-app') || document.body;
      var all = scope.querySelectorAll('[class*="--correct"],[class*="--wrong"]');
      var isMark = function (el) { var c = ' ' + (typeof el.className === 'string' ? el.className : '') + ' '; return /--correct /.test(c) ? 1 : /--wrong /.test(c) ? 0 : -1; };
      for (i = 0; i < all.length; i++) {
        var v = isMark(all[i]);
        if (v < 0) continue;
        var p = all[i].parentNode, nested = false;
        while (p && p !== scope && p.nodeType === 1) { if (isMark(p) >= 0) { nested = true; break; } p = p.parentNode; }
        if (!nested) list.push(v);
      }
      return list;
    }
    /* shown = not [hidden] and it has a box (offsetParent is null for position:fixed, which these overlays are) */
    function shown(el) { return !!el && !el.hidden && el.getClientRects().length > 0; }
    function celebrating() { return shown($('lcs-celebration')); }
    function readResult() {
      var s = scoreFromText(), list = marks(), sum = 0, i;
      for (i = 0; i < list.length; i++) sum += list[i];
      if (s) {
        var o = { right: s.right, total: s.total };
        if (list.length === s.total && sum === s.right) o.items = list; /* the marks agree with the page's own count */
        return o;
      }
      if (list.length) return { right: sum, total: list.length, items: list };
      return null;
    }

    var lastReply = null, queue = [], busy = false;
    function post(body) {
      queue.push(body);
      pump();
    }
    function pump() {
      if (busy || !queue.length) return;
      busy = true;
      var body = queue.shift();
      body.token = TOKEN;
      var done = function (reply) {
        busy = false;
        if (reply && (reply.next || reply.back)) { lastReply = reply; showGo(reply); }
        pump();
      };
      try {
        window.__lcsClass.sent++;
        fetch('/api/class/report', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
          credentials: 'omit', cache: 'no-store', keepalive: true
        }).then(function (res) { return res.ok ? res.json() : null; }).then(done, function () { done(null); });
      } catch (e) { done(null); }
    }

    function onCheck() {
      /* the runtime paints its marks in the same task as it hides Check; read them after it has finished */
      window.setTimeout(function () {
        var r = readResult();
        if (r) { if (r.right === r.total) r.finished = true; post(r); }
        else post({ finished: celebrating() });
      }, 60);
    }
    function onCelebrate() { post({ finished: true }); }

    function watch() {
      var chk = $('lcs-check'), cel = $('lcs-celebration'), wasHidden = chk ? !!chk.hidden : false, wasCele = celebrating();
      var tick = function () {
        if (chk) { var h = !!chk.hidden; if (h && !wasHidden) onCheck(); wasHidden = h; }
        var c = celebrating(); if (c && !wasCele && !(chk && chk.hidden && readResult())) onCelebrate(); wasCele = c;
      };
      if (window.MutationObserver) {
        var mo = new MutationObserver(tick);
        if (chk) mo.observe(chk, { attributes: true, attributeFilter: ['hidden', 'style', 'class'] });
        if (cel) mo.observe(cel, { attributes: true, attributeFilter: ['hidden', 'style', 'class'] });
      }
      if (!chk && !cel) return false;
      window.setInterval(tick, 700); /* a safety net for runtimes that swap nodes instead of attributes */
      return true;
    }

    function start() {
      classMode();
      /* the button's place depends on where a pinned bar is, and that changes as the page scrolls (also inside
         a scrolling container: capture phase) or the page's buttons swap */
      var due = false, again = function () { if (due) return; due = true; window.setTimeout(function () { due = false; place(); }, 80); };
      window.addEventListener('resize', again);
      document.addEventListener('scroll', again, true);
      window.setInterval(place, 900);
      window.__lcsClass.watching = watch();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  } catch (e) { /* the reporter must never break a worksheet */ }
})();
