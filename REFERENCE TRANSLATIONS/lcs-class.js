/**
 * lcs-class.js — the class reporter (Daily Teaching System, Part 9; docs/daily-teaching-system/PART-9-DESIGN.md).
 *
 * Loaded ONLY when the page address carries a class attempt token after '#' (…/decks/<slug>/#lcs=<20 chars>,
 * /s/<linkId>#lcs=<20 chars>): a child opened this page from a teacher's class page. A deck page loads it through
 * lcs-meter.js, a maker worksheet page (/s/) through the one-line loader its route adds. Without that token this
 * file is never requested and nothing on the page changes.
 *
 * What it does:
 *   1. Class mode: hides the page furniture a child should not wander into (site header and footer, share,
 *      embed, download and print buttons, "more worksheets" links). The worksheet and its buttons stay.
 *   2. Watches the worksheet's own Check button. On each Check it reads what the page itself shows —
 *      how many answers were right, and which — and POSTs it to /api/class/report with the token.
 *      It never decides right or wrong itself and never reads what the child typed.
 *   3. Shows ONE big button after the first Check: "next page" (a Level Set continues; a maker worksheet has
 *      another page) or "back to the class page". No score, no stars, no timer, no words to read: an arrow or
 *      a house.
 *
 * Nothing is sent before the child presses Check, nothing identifies the device, no cookie is read or
 * set, and a failed report never blocks the worksheet (fail-open).
 *
 * How a result is read (the page's own marks, in this order of trust):
 *   a. the worksheet runtime's progress line "{n} of {total} correct", parsed with the page's own
 *      template (DECK_BUNDLE.strings.score) — worksheet-gen screens;
 *   b. the marks on the page: [data-state="right"|"wrong"] (worksheet-gen) or elements whose class ends in
 *      --correct / --wrong (the app-generated decks);
 *   c. neither readable: the report says only that Check was pressed, and "finished" when the page's own
 *      celebration opens. The teacher then sees "played", never an invented number.
 *
 * A maker worksheet (/s/<linkId>) shows each of its pages in an embedded frame. The reporter watches every frame
 * that has a screen version and reports ONCE, when each of them has had its first Check: the sum of the pages'
 * first-Check marks. Between pages the button is the arrow to the next unchecked page.
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
      es: { next: 'Página siguiente', back: 'Regresar a la página del grupo' },
      pt: { next: 'Próxima página', back: 'Voltar à página da turma' },
      it: { next: 'Pagina successiva', back: 'Torna alla pagina della classe' },
      nl: { next: 'Volgende pagina', back: 'Terug naar de klaspagina' },
      sv: { next: 'Nästa sida', back: 'Tillbaka till klassens sida' },
      da: { next: 'Næste side', back: 'Tilbage til klassens side' },
      no: { next: 'Neste side', back: 'Tilbake til klassens side' },
      fi: { next: 'Seuraava sivu', back: 'Takaisin luokan sivulle' }
    };
    function words() { var l = (document.documentElement.lang || LANG || 'en').slice(0, 2); return L[l] || L[LANG] || L.en; }

    /* a page context: the document that holds the worksheet and its window (the page itself, or one frame of a
       maker worksheet) */
    var MAIN = { doc: document, win: window };
    function byId(ctx, id) { return ctx.doc.getElementById(id); }
    function $(id) { return document.getElementById(id); }

    /* the class page the child came from, as the class page itself left it in this tab (the reply to a report
       names it too; this is the way home when a report could not be sent or said nothing) */
    function homePath() {
      try {
        var v = window.sessionStorage.getItem('lcs-class-back');
        return v && /^\/c\/[a-z2-9]{10}$/.test(v) ? v : null;
      } catch (e) { return null; }
    }

    /* 1 — class mode */
    var FURNITURE = '#lcs-share,#lcs-embed,#lcs-deck-actions,#lcs-deck-ladder,#lcs-maker-ribbon,.lcs-end-deck,' +
      '.lcs-deckend-suggestions,.lcs-teaching,#lcs-cele-print,.lcs-download,.lcs-download-cta,.lcs-attrib-link,' +
      '[data-lcs-print],.lcs-class-hide';
    function hideIn(doc, extra) {
      var css = doc.createElement('style');
      css.id = 'lcs-class-style';
      css.textContent = (FURNITURE + (extra ? ',' + extra : '')).split(',').map(function (s) { return 'body.lcs-class-mode ' + s; }).join(',') + '{display:none !important}';
      doc.head.appendChild(css);
      /* <footer class="lcs-footer"> is two different things: on the worksheet-gen pages a credit line with a link
         out, on the app-generated pages THE BAR THAT HOLDS CHECK. Hide it only when it holds no button. */
      var foot = doc.querySelectorAll('footer.lcs-footer'), i;
      for (i = 0; i < foot.length; i++) if (!foot[i].querySelector('button')) foot[i].classList.add('lcs-class-hide');
      doc.body.classList.add('lcs-class-mode');
    }
    function classMode(extra) {
      hideIn(document, '#lcs-site-chrome,#lcs-site-footer' + (extra ? ',' + extra : ''));
      var css = document.createElement('style');
      css.id = 'lcs-class-button-style';
      css.textContent =
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
    }

    /* 3 — the one button */
    var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    var HOUSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11.5 12 4l8 7.5"/><path d="M6.5 10v9.5h11V10"/></svg>';
    function sameSite(path) { return typeof path === 'string' && path.charAt(0) === '/' && path.charAt(1) !== '/'; }
    /* kind: 'next' (arrow) or 'back' (house); href: where it leads; act: a function instead of a navigation */
    function button(kind, href, act) {
      var T = words();
      var a = $('lcs-class-go') || document.createElement('a');
      a.id = 'lcs-class-go';
      a.setAttribute('data-kind', kind);
      a.setAttribute('aria-label', kind === 'next' ? T.next : T.back);
      a.setAttribute('title', kind === 'next' ? T.next : T.back);
      a.setAttribute('role', 'button');
      a.innerHTML = kind === 'next' ? ARROW : HOUSE;
      a.href = href || '#';
      a.onclick = null;
      if (act) a.onclick = function (ev) { ev.preventDefault(); act(); };
      else if (kind === 'next') a.onclick = function (ev) {
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
    function hideButton() {
      var a = $('lcs-class-go');
      if (a && a.parentNode) a.parentNode.removeChild(a);
    }
    function showGo(reply) {
      var next = reply && sameSite(reply.next) ? reply.next : null;
      var back = reply && sameSite(reply.back) ? reply.back : null;
      if (next) button('next', next); else if (back) button('back', back);
    }
    /* the way home when the server said nothing (a page with no marks that is not finished, a lost connection) */
    function showHome() {
      if ($('lcs-class-go')) return;
      var h = homePath();
      if (h) button('back', h);
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
    function scoreFromText(ctx) {
      /* worksheet-gen screens: the progress line, parsed with the page's own template */
      var prg = byId(ctx, 'lcs-progress'), B = null;
      try { B = ctx.win.DECK_BUNDLE; } catch (e) {}
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
      var sum = byId(ctx, 'lcs-summary');
      if (sum) {
        var nums = (sum.textContent || '').match(/\d+/g);
        if (nums && nums.length === 2) {
          var x = parseInt(nums[0], 10), y = parseInt(nums[1], 10);
          if (Math.max(x, y) >= 1) return { right: Math.min(x, y), total: Math.max(x, y) };
        }
      }
      return null;
    }
    /* buttonsOnly: leave out marks drawn on a picture (a pairing page marks the joining line AND the two ends) */
    function marks(ctx, buttonsOnly) {
      var list = [], i;
      var st = (byId(ctx, 'lcs-app') || ctx.doc.body).querySelectorAll('[data-state="right"],[data-state="wrong"]');
      if (st.length) {
        for (i = 0; i < st.length; i++) {
          if (buttonsOnly && typeof st[i].className !== 'string') continue; /* an SVG shape: its className is not a string */
          list.push(st[i].getAttribute('data-state') === 'right' ? 1 : 0);
        }
        return list;
      }
      /* app-generated pages mark an answer with a class ending in --correct / --wrong. Only the worksheet
         itself is read (the same answers are echoed as dots in a progress row), and only the OUTERMOST marked
         element of each answer (a marked box may hold a marked icon). */
      var scope = byId(ctx, 'lcs-worksheet') || byId(ctx, 'lcs-overlay') || byId(ctx, 'lcs-app') || ctx.doc.body;
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
    function celebrating(ctx) { return shown(byId(ctx, 'lcs-celebration')); }
    function readResult(ctx) {
      var s = scoreFromText(ctx), list = marks(ctx), sum = 0, i;
      if (s && list.length !== s.total) list = marks(ctx, true);
      for (i = 0; i < list.length; i++) sum += list[i];
      if (s) {
        var o = { right: s.right, total: s.total };
        if (list.length === s.total && sum === s.right) o.items = list; /* the marks agree with the page's own count */
        return o;
      }
      if (list.length) return { right: sum, total: list.length, items: list };
      return null;
    }

    var queue = [], busy = false;
    /* body: the report; after(reply): called once the server answered (reply is null when it could not) */
    function post(body, after) {
      queue.push([body, after]);
      pump();
    }
    function pump() {
      if (busy || !queue.length) return;
      busy = true;
      var job = queue.shift(), body = job[0], after = job[1];
      body.token = TOKEN;
      var done = function (reply) {
        busy = false;
        if (after) after(reply);
        else if (reply && (reply.next || reply.back)) showGo(reply);
        else showHome();
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

    /* watch one worksheet: onCheck after each press of its Check, onCelebrate when its celebration opens with no
       Check behind it. Returns false when the page has neither. */
    function watch(ctx, onCheck, onCelebrate) {
      var chk = byId(ctx, 'lcs-check'), cel = byId(ctx, 'lcs-celebration'), wasHidden = chk ? !!chk.hidden : false, wasCele = celebrating(ctx);
      var tick = function () {
        /* the runtime paints its marks in the same task as it hides Check; read them after it has finished */
        if (chk) { var h = !!chk.hidden; if (h && !wasHidden) window.setTimeout(onCheck, 60); wasHidden = h; }
        var c = celebrating(ctx); if (c && !wasCele && !(chk && chk.hidden && readResult(ctx))) onCelebrate(); wasCele = c;
      };
      var MO = ctx.win.MutationObserver || window.MutationObserver;
      if (MO) {
        var mo = new MO(tick);
        if (chk) mo.observe(chk, { attributes: true, attributeFilter: ['hidden', 'style', 'class'] });
        if (cel) mo.observe(cel, { attributes: true, attributeFilter: ['hidden', 'style', 'class'] });
      }
      if (!chk && !cel) return false;
      window.setInterval(tick, 700); /* a safety net for runtimes that swap nodes instead of attributes */
      return true;
    }

    /* ── a deck page: one worksheet, this document ── */
    function startDeck() {
      classMode('');
      /* the button's place depends on where a pinned bar is, and that changes as the page scrolls (also inside
         a scrolling container: capture phase) or the page's buttons swap */
      var due = false, again = function () { if (due) return; due = true; window.setTimeout(function () { due = false; place(); }, 80); };
      window.addEventListener('resize', again);
      document.addEventListener('scroll', again, true);
      window.setInterval(place, 900);
      window.__lcsClass.watching = watch(MAIN, function () {
        var r = readResult(MAIN);
        if (r) { if (r.right === r.total) r.finished = true; post(r); }
        else post({ finished: celebrating(MAIN) }); /* no marks to read: "played", and whether the page is finished */
      }, function () { post({ finished: true }); });
    }

    /* ── a maker worksheet page (/s/<linkId>): one frame per page ── */
    function startMaker() {
      classMode('.pl-links,.pl-actions,.pl-ask');
      var pages = [], sentFirst = false;
      window.__lcsClass.maker = pages;
      function allChecked() { for (var i = 0; i < pages.length; i++) if (!pages[i].first) return false; return pages.length > 0; }
      function allDone() { for (var i = 0; i < pages.length; i++) if (!pages[i].done) return false; return pages.length > 0; }
      /* the sum of the pages' marks: `key` = 'first' (each page's first Check) or 'last' (as the pages stand now) */
      function total(key) {
        var right = 0, sum = 0, items = [], withItems = true, readable = 0, i, r;
        for (i = 0; i < pages.length; i++) {
          r = pages[i][key];
          if (!r || r.total == null) { withItems = false; continue; }
          readable++; right += r.right; sum += r.total;
          if (r.items) items = items.concat(r.items); else withItems = false;
        }
        if (!readable) return { finished: allDone() };
        var o = { right: right, total: sum };
        if (withItems && readable === pages.length && items.length === sum) o.items = items;
        if (allDone() && (key === 'last' || right === sum)) o.finished = true;
        return o;
      }
      function nextUnchecked(from) {
        for (var k = 1; k <= pages.length; k++) { var j = (from + k) % pages.length; if (!pages[j].first) return j; }
        return -1;
      }
      function showPage(i) {
        var n = pages[i].section.getAttribute('data-page');
        var tab = document.querySelector('.pl-tab[data-page="' + n + '"]');
        if (tab) tab.click();
        hideButton();
        try { window.scrollTo(0, 0); } catch (e) {}
      }
      function onCheck(i) {
        var p = pages[i], r = readResult(p.ctx), cele = celebrating(p.ctx);
        var now = r || { total: null };
        if (!p.first) p.first = now;
        p.last = now;
        if (cele || (r && r.right === r.total)) p.done = true;
        step(i);
      }
      function onCelebrate(i) {
        var p = pages[i];
        if (!p.first) p.first = { total: null };
        p.done = true;
        step(i);
      }
      function step(i) {
        if (!allChecked()) {
          var j = nextUnchecked(i);
          if (j >= 0) button('next', '#', function () { showPage(j); });
          return;
        }
        var body = total(sentFirst ? 'last' : 'first');
        sentFirst = true;
        post(body);
      }
      function attach(frame, section) {
        var ctx = null, tries = 0;
        var wait = window.setInterval(function () {
          var d = null;
          try { d = frame.contentDocument; } catch (e) {}
          if (++tries > 200) { window.clearInterval(wait); return; }
          if (!d || d.readyState !== 'complete' || !d.body || !(d.getElementById('lcs-check') || d.getElementById('lcs-celebration'))) return;
          window.clearInterval(wait);
          ctx = { doc: d, win: frame.contentWindow };
          try { hideIn(d, ''); } catch (e) {}
          var i = pages.length;
          pages.push({ section: section, ctx: ctx, first: null, last: null, done: false });
          watch(ctx, function () { onCheck(i); }, function () { onCelebrate(i); });
        }, 150);
      }
      var polls = 0;
      var poll = window.setInterval(function () {
        var P = window.__lcsPlay;
        if (++polls > 600) { window.clearInterval(poll); showHome(); return; }
        if (!P) return;
        if (P.failed || P.metered === 'wall' || (!P.ready && document.querySelector('.pl-card'))) { window.clearInterval(poll); showHome(); return; }
        if (!P.ready) return;
        window.clearInterval(poll);
        var frames = document.querySelectorAll('.pl-page iframe.pl-screen'), k;
        for (k = 0; k < frames.length; k++) attach(frames[k], frames[k].parentNode);
        window.__lcsClass.watching = frames.length > 0;
        /* a worksheet made for paper only: nothing here can be checked, so the way back is there at once */
        if (!frames.length) showHome();
      }, 200);
    }

    function start() { if ($('pl-stage')) startMaker(); else startDeck(); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  } catch (e) { /* the reporter must never break a worksheet */ }
})();
