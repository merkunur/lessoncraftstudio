/* =====================================================================
   FIXIT'S FIX-IT CORNER — ACTIVITY  (fix-it-corner-activity.js)
   ---------------------------------------------------------------------
   CCSS 1.OA.D.8 — determine the unknown whole number in an add/sub
   equation, unknown in ALL positions. A broken gadget shows its equation
   with one glowing SOCKET (the blank); the child supplies the part that
   whirs it to life. The unknown is DERIVED, never stored (cognition in
   mini tools/missing-part-core.js: deriveUnknown / commonErrorParts /
   isCorrect / escalationOp).

   8 distinct experiences, each a DIFFERENT child action (§A.13.60):
     make-10 → FILL a ten-frame to exactly 10
     missing-sum → SUPPLY the whole from a tray
     missing-addend → count-ON: hop a number-line from the part to the whole
     missing-subtrahend → count-BACK: hop from the whole to the part
     missing-first-addend → think-addition on a fact-family TRIANGLE
     missing-minuend → recombine the kept + removed groups
     balance → LEVEL a balancing gadget
     produce → tap a triangle number to HIDE it (make the next problem)

   CONFIRM-AFTER-COMMIT: on a computation band the whole is a LABELED
   VESSEL (undivided) — the part-part-whole only animates AFTER commit
   (fills / over-revs / half-turn-stalls) → no countable gap to point-
   count instead of compute. No-shame: a wrong part shows a modeled
   physical consequence + Fixit models the computation, never a red X.
   No timer/score/streak. Fixit = SVG PLACEHOLDER (_setPose). Words/
   numbers/operators ALWAYS DOM. 0 lines to the protected cores +
   lcs-shell.{js,css}. answerType:'state'.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.MissingPartCore;

  var C = {
    T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F',
    CREAM: '#FBF3E4', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#F6C743',
    STEEL: '#9FB0B8', MOLE: '#8B7B6B', MOLE2: '#6F6152'
  };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function interp(t, a) { return String(t || '').replace(/\{(\w+)\}/g, function (m, k) { return (k in a) ? a[k] : m; }); }
  var LANG = 'en';
  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'number', text: text, lang: LANG, rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = .95; u.lang = (LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }

  /* Fixit — a near-sighted repair-mole who holds things close (SVG PLACEHOLDER). */
  function fixitSVG() {
    return '<svg class="fic-mole-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'de' ? 'Fixit, der Reparatur-Maulwurf' : LANG === 'fr' ? 'Fixit, la taupe réparatrice' : 'Fixit the repair-mole') + '">' +
      '<ellipse cx="50" cy="92" rx="24" ry="5" fill="rgba(0,0,0,.08)"/>' +
      '<ellipse cx="50" cy="64" rx="25" ry="23" fill="' + C.MOLE + '"/>' +            /* body */
      '<ellipse cx="34" cy="70" rx="8" ry="10" fill="' + C.MOLE2 + '"/><ellipse cx="66" cy="70" rx="8" ry="10" fill="' + C.MOLE2 + '"/>' + /* arms holding close */
      '<circle cx="50" cy="40" r="20" fill="' + C.MOLE + '"/>' +                       /* head */
      '<path d="M40 50 Q50 58 60 50 Q56 60 50 60 Q44 60 40 50 Z" fill="#C9A98F"/>' +    /* snout */
      '<circle cx="50" cy="53" r="3.2" fill="' + C.CORAL + '"/>' +                      /* nose */
      '<circle cx="41" cy="40" r="9" fill="#FCF6EA" stroke="' + C.T + '" stroke-width="2"/><circle cx="59" cy="40" r="9" fill="#FCF6EA" stroke="' + C.T + '" stroke-width="2"/>' + /* spectacles */
      '<line x1="50" y1="40" x2="50" y2="40" stroke="' + C.T + '" stroke-width="2"/><path d="M50 40 h0" /><line x1="49" y1="40" x2="51" y2="40" stroke="' + C.T + '" stroke-width="2"/>' +
      '<g class="fic-eyes-open"><circle cx="41" cy="40" r="3" fill="' + C.INK + '"/><circle cx="59" cy="40" r="3" fill="' + C.INK + '"/></g>' +
      '<g class="fic-eyes-happy"><path d="M37 40 Q41 36 45 40" stroke="' + C.INK + '" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M55 40 Q59 36 63 40" stroke="' + C.INK + '" stroke-width="2.2" fill="none" stroke-linecap="round"/></g>' +
      '<g class="fic-eyes-squint"><line x1="37" y1="40" x2="45" y2="40" stroke="' + C.INK + '" stroke-width="2.4" stroke-linecap="round"/><line x1="55" y1="40" x2="63" y2="40" stroke="' + C.INK + '" stroke-width="2.4" stroke-linecap="round"/></g>' +
      '<rect x="42" y="22" width="16" height="7" rx="2" fill="' + C.CORAL + '"/><rect x="46" y="17" width="8" height="6" rx="2" fill="' + C.CORAL + '"/>' + /* little cap */
      '</svg>';
  }

  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  global.FixItCornerActivity = {
    id: 'fix-it-corner-activity',

    strings: {
      title: { en: "Fixit's Fix-It Corner", de: 'Fixits Reparatur-Ecke', fr: 'Le coin réparation de Fixit' },
      instruction: { en: 'Fixit can\'t read the tiny number — you\'re his sharp-eyed helper. Work out the part each gadget needs, pop it in, then tap Check.', de: 'Fixit kann die winzige Zahl nicht lesen – du bist sein scharfäugiger Helfer. Finde heraus, welchen Teil jedes Gerät braucht, setz ihn ein und tippe dann auf Prüfen.', fr: 'Fixit n’arrive pas à lire le tout petit nombre — c’est toi son aide aux yeux perçants. Trouve la pièce qu’il manque à chaque appareil, place-la, puis touche Vérifier.' },
      promptMake10: { en: 'Fill it up to exactly 10!', de: 'Füll es genau bis 10 auf!', fr: 'Remplis-le jusqu’à exactement 10 !' },
      promptMissingSum: { en: '{a} and {b} — how many in all?', de: '{a} und {b} – wie viele sind das zusammen?', fr: '{a} et {b} — combien ça fait en tout ?' },
      promptMissingAddend: { en: '{a} and how many more make {c}?', de: '{a} und wie viele mehr ergeben {c}?', fr: '{a} et combien de plus pour faire {c} ?' },
      promptMissingSubtrahend: { en: '{a} take away how many leaves {b}?', de: 'Von {a} wie viele weg, dann bleibt {b}?', fr: '{a}, on en enlève combien pour qu’il reste {b} ?' },
      promptMissingFirstAddend: { en: 'What plus {b} makes {c}?', de: 'Was plus {b} ergibt {c}?', fr: 'Combien plus {b} font {c} ?' },
      promptMissingMinuend: { en: 'Take away {b}, leaves {c} — start with what?', de: 'Nimm {b} weg, dann bleibt {c} – womit hast du angefangen?', fr: 'Enlève {b}, il reste {c} — on part de combien ?' },
      promptBalance: { en: 'Make both sides match.', de: 'Mach beide Seiten gleich.', fr: 'Rends les deux côtés égaux.' },
      promptProduce: { en: 'Tap a number to hide — make the next puzzle!', de: 'Tippe eine Zahl an, um sie zu verstecken – mach das nächste Rätsel!', fr: 'Touche un nombre pour le cacher — fabrique la prochaine énigme !' },
      hop: { en: 'Hop', de: 'Hüpf', fr: 'Saute' },
      slide: { en: 'Slide together', de: 'Zusammenschieben', fr: 'Rassemble' },
      whole: { en: 'the whole', de: 'das Ganze', fr: 'le tout' },
      winMake10: { en: 'Ten! It whirs to life — it can butter ten slices of toast at once!', de: 'Zehn! Es surrt los – es kann zehn Scheiben Toast auf einmal buttern!', fr: 'Dix ! L’appareil s’anime en vrombissant — il peut beurrer dix tartines à la fois !' },
      winSum: { en: 'That\'s the whole! POP — it clicks awake!', de: 'Das ist das Ganze! KLACK – es springt an!', fr: 'C’est le tout ! CLAC — il se réveille !' },
      winAddend: { en: '{x} more! It catches, clicks, and whirs to life!', de: '{x} mehr! Es greift, klickt und surrt los!', fr: '{x} de plus ! Il accroche, cliquette et s’anime !' },
      winSubtrahend: { en: '{x}! It catches, clicks, and whirs to life!', de: '{x}! Es greift, klickt und surrt los!', fr: '{x} ! Il accroche, cliquette et s’anime !' },
      winFirstAddend: { en: '{x}! The fact-family fits — it springs alive!', de: '{x}! Die Aufgabenfamilie passt – es springt an!', fr: '{x} ! La famille de calculs colle — il se met en marche !' },
      winMinuend: { en: 'You started with {x}! Slid back together — it hums awake!', de: 'Du hast mit {x} angefangen! Wieder zusammengeschoben – es brummt los!', fr: 'Tu es parti de {x} ! Rassemblé — il se réveille en ronronnant !' },
      winBalance: { en: 'Level! Both sides match — it balances and dings!', de: 'Im Gleichgewicht! Beide Seiten sind gleich – es pendelt sich ein und klingelt!', fr: 'À l’équilibre ! Les deux côtés sont égaux — il se stabilise et sonne !' },
      winProduce: { en: 'A new puzzle! Fixit fixes it right up.', de: 'Ein neues Rätsel! Fixit repariert es im Nu.', fr: 'Une nouvelle énigme ! Fixit la répare en un clin d’œil.' },
      missOver: { en: 'Whoa — it over-revs! That\'s too many. {a} is a part of {c}, not all of it.', de: 'Hoppla – es dreht über! Das sind zu viele. {a} ist ein Teil von {c}, nicht das Ganze.', fr: 'Oh — il s’emballe ! C’est trop. {a}, c’est une partie de {c}, pas le tout.' },
      missCopy: { en: 'Clunk — it stalls. That\'s the whole, not the missing part.', de: 'Klonk – es stockt. Das ist das Ganze, nicht der fehlende Teil.', fr: 'Clonk — il cale. C’est le tout, pas la partie qui manque.' },
      missOne: { en: 'Half a turn… so close! Count once more.', de: 'Eine halbe Umdrehung … fast! Zähl noch einmal.', fr: 'Un demi-tour… tout près ! Recompte une fois.' },
      missGeneric: { en: 'Not yet — let\'s check it together.', de: 'Noch nicht – lass es uns zusammen prüfen.', fr: 'Pas encore — vérifions ensemble.' },
      model: { en: '{a} plus {x} is {c}… or {c} take away {a} is {x}.', de: '{a} plus {x} ist {c} … oder {c} minus {a} ist {x}.', fr: '{a} plus {x} font {c}… ou {c} moins {a} font {x}.' },
      escalate: { en: 'Fixit slides over the counting-rail — let\'s build it together!', de: 'Fixit schiebt die Zählschiene herüber – lass es uns zusammen bauen!', fr: 'Fixit fait glisser la règle à compter — construisons-le ensemble !' },
      hintCheck: { en: 'Pop a part into the gadget, then tap Check.', de: 'Setz einen Teil in das Gerät ein und tippe dann auf Prüfen.', fr: 'Place une pièce dans l’appareil, puis touche Vérifier.' }
    },

    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks(Core.buildRounds());
      this._order = null; this._curPass = 0; this._orderForPool = null;
      this.round = null; this.phase = 'work'; this.committed = null; this.misses = 0;
      this.readOnly = false; this.escalated = false; this.solved = 0;
      this.frameFill = 0; this.hops = 0; this.loaded = null; this.hidden = null; this.recombined = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) { this._loadActivity(); }
    },

    setupTask: function (round) {
      this.round = round; this.phase = 'work'; this.committed = null; this.misses = 0;
      this.readOnly = false; this.escalated = false;
      this.frameFill = 0; this.hops = 0; this.loaded = null; this.hidden = null; this.recombined = false;
      this.x = Core.deriveUnknown(round);
    },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'fic-wrap');
      var room = api.el('div', 'fic-room' + (this.readOnly ? ' fic-lit' : ''));
      room.style.setProperty('--fic-warm', Math.min(this.solved / ((this._pool && this._pool.length) || 8), 1));
      this._roomEl = room;

      if (!this.round) { wrap.appendChild(room); stage.appendChild(wrap); return; }

      /* the gadget panel: a header row (Fixit + equation) then the widget */
      var gadget = api.el('div', 'fic-gadget'); this._gadgetEl = gadget;
      var exp = this.round.experience;

      var ghead = api.el('div', 'fic-ghead');
      var mole = api.el('div', 'fic-mole'); mole.setAttribute('data-pose', 'idle'); mole.innerHTML = fixitSVG(); this._moleEl = mole;
      ghead.appendChild(mole);
      if (exp !== 'produce') ghead.appendChild(this._eqStrip());
      gadget.appendChild(ghead);

      var widget = api.el('div', 'fic-widget'); this._widgetEl = widget;
      gadget.appendChild(widget);
      this._renderWidget();
      room.appendChild(gadget);

      /* progress shelf (gallery pins) */
      var shelf = api.el('div', 'fic-shelf');
      for (var i = 0; i < ((this._pool && this._pool.length) || 8); i++) { var pin = api.el('span', 'fic-pin'); shelf.appendChild(pin); }
      this._shelfEl = shelf; room.appendChild(shelf);

      wrap.appendChild(room);
      stage.appendChild(wrap);
      this._paintShelf();
      this._setPose('idle');
    },

    /* equation strip: DOM cells, the blank is a glowing .socket; the whole on a
       computation band is a LABELED VESSEL (undivided). */
    _eqStrip: function () {
      var api = this.api, r = this.round, comp = Core.isComputationBand(r);
      var strip = api.el('div', 'fic-eq');
      var cells = eqCells(r);
      var self = this;
      cells.forEach(function (cell) {
        if (cell.op) { var o = api.el('span', 'fic-op'); o.textContent = cell.text; strip.appendChild(o); return; }
        if (cell.socket) {
          var s = api.el('span', 'fic-cell fic-socket'); s.textContent = self.committed != null && self.readOnly ? String(self.x) : '?';
          if (self.readOnly) s.classList.add('fic-seated'); strip.appendChild(s); self._socketEl = s; return;
        }
        var cls = 'fic-cell' + (cell.whole && comp ? ' fic-vessel' : '');
        var c = api.el('span', cls); c.textContent = String(cell.text); strip.appendChild(c);
      });
      return strip;
    },

    _renderWidget: function () {
      var exp = this.round.experience;
      if (exp === 'make10') return this._wTenFrame();
      if (exp === 'missingAddend' || exp === 'missingSubtrahend') return this._wNumberLine();
      if (exp === 'missingFirstAddend') return this._wTriangle();
      if (exp === 'missingMinuend') return this._wRecombine();
      if (exp === 'balance') return this._wBalance();
      if (exp === 'produce') return this._wProduce();
      return this._wTray();         // missingSum
    },

    /* ----- shared bounded common-error tray ----- */
    _trayParts: function () {
      var parts = Core.commonErrorParts(this.round, this.x);
      if (!this._trayOrder || this._trayOrderId !== this.round.id) { this._trayOrder = shuffle(parts.map(function (_, i) { return i; })); this._trayOrderId = this.round.id; }
      return this._trayOrder.map(function (i) { return parts[i]; });
    },
    _wTray: function (labelKey) {
      var api = this.api, self = this, w = this._widgetEl; w.innerHTML = '';
      var hint = api.el('div', 'fic-vessel-hint'); hint.textContent = labelKey || '';
      var tray = api.el('div', 'fic-tray');
      this._trayParts().forEach(function (p) {
        var b = api.el('button', 'fic-part'); b.type = 'button'; b.textContent = String(p.value);
        b.setAttribute('data-v', p.value);
        if (self.readOnly) { b.disabled = true; if (p.value === self.x) b.classList.add('fic-part-win'); }
        else b.addEventListener('click', function () { self._commit(p.value, b); });
        tray.appendChild(b);
      });
      w.appendChild(tray);
    },

    /* ----- make-10 ten-frame fill (on-ramp, countable) ----- */
    _wTenFrame: function () {
      var api = this.api, self = this, w = this._widgetEl, given = this.round.a; w.innerHTML = '';
      var frame = api.el('div', 'fic-frame');
      for (var i = 0; i < 10; i++) {
        var cell = api.el('button', 'fic-fcell'); cell.type = 'button';
        var filledGiven = i < given, filledNew = i >= given && i < given + self.frameFill;
        if (filledGiven) cell.classList.add('fic-fc-given');
        if (filledNew) cell.classList.add('fic-fc-new');
        if (self.readOnly) cell.disabled = true;
        else cell.addEventListener('click', (function (idx) { return function () { self._tapFrame(idx); }; })(i));
        frame.appendChild(cell);
      }
      w.appendChild(frame);
      var read = api.el('div', 'fic-frame-read'); read.textContent = given + ' + ' + this.frameFill; this._frameRead = read; w.appendChild(read);
    },
    _tapFrame: function (idx) {
      if (this.readOnly) return;
      var given = this.round.a, total = given + this.frameFill;
      if (idx >= given) {
        // toggle a "new" cell: tapping the next empty adds; tapping the last new removes
        if (idx === given + this.frameFill) { if (total < 10) this.frameFill++; }
        else if (idx === given + this.frameFill - 1) { this.frameFill--; }
        else if (idx > given + this.frameFill) { this.frameFill = idx - given + 1; if (given + this.frameFill > 10) this.frameFill = 10 - given; }
      }
      this.api.sound && this.api.sound(660);
      this._renderWidget();
      if (given + this.frameFill === 10) this._commit(this.frameFill, null);
    },

    /* ----- number-line count-on / count-back ----- */
    _wNumberLine: function () {
      var api = this.api, self = this, w = this._widgetEl, r = this.round; w.innerHTML = '';
      var back = r.experience === 'missingSubtrahend';
      var from = r.a, to = back ? r.c : r.c;   // a→c either way (count-on 8→13 ; count-back 13→8)
      var lo = Math.min(from, to) - 1, hi = Math.max(from, to) + 1; if (lo < 0) lo = 0;
      var line = api.el('div', 'fic-line');
      this._lineNotches = [];
      for (var n = lo; n <= hi; n++) {
        var notch = api.el('div', 'fic-notch');
        var lab = api.el('span', 'fic-notch-lab'); lab.textContent = String(n); notch.appendChild(lab);
        if (n === from) notch.classList.add('fic-notch-start');
        if (n === to) notch.classList.add('fic-notch-flag');
        notch.setAttribute('data-n', n);
        line.appendChild(notch); this._lineNotches.push(notch);
      }
      var marker = api.el('div', 'fic-marker'); this._markerEl = marker; line.appendChild(marker);
      w.appendChild(line);
      var btn = api.el('button', 'fic-hop'); btn.type = 'button'; btn.textContent = api.t('hop') + ' →';
      if (back) btn.textContent = '← ' + api.t('hop');
      if (this.readOnly) btn.disabled = true; else btn.addEventListener('click', function () { self._hop(); });
      this._hopBtn = btn; w.appendChild(btn);
      this._positionMarker();
    },
    _positionMarker: function () {
      if (!this._markerEl || !this._lineNotches.length) return;
      var r = this.round, back = r.experience === 'missingSubtrahend', from = r.a;
      var cur = back ? from - this.hops : from + this.hops;
      var idx = this._lineNotches.map(function (e) { return +e.getAttribute('data-n'); }).indexOf(cur);
      if (idx < 0) idx = 0;
      var pct = this._lineNotches.length > 1 ? (idx / (this._lineNotches.length - 1)) * 100 : 0;
      this._markerEl.style.left = 'calc(' + pct + '% )';
      // mark hopped notches
      for (var i = 0; i < this._lineNotches.length; i++) {
        var nv = +this._lineNotches[i].getAttribute('data-n');
        var hopped = back ? (nv <= from && nv > cur) : (nv >= from && nv < cur);
        this._lineNotches[i].classList.toggle('fic-hopped', hopped && nv !== from);
      }
    },
    _hop: function () {
      if (this.readOnly) return;
      var r = this.round, to = r.c, back = r.experience === 'missingSubtrahend', from = r.a;
      this.hops++;
      var cur = back ? from - this.hops : from + this.hops;
      this.api.sound && this.api.sound(620 + this.hops * 30);
      this._positionMarker();
      if (cur === to) { this._commit(this.hops, null); }
      else if ((back && cur < to) || (!back && cur > to)) { /* shouldn't pass; clamp */ this.hops--; this._positionMarker(); }
    },

    /* ----- fact-family triangle (think-addition) ----- */
    _wTriangle: function () {
      var api = this.api, self = this, r = this.round, w = this._widgetEl; w.innerHTML = '';
      // whole = c (top), parts = b (given) + missing (socket)
      var tri = this._triangleSVG(r.c, r.b, null);
      w.appendChild(tri);
      this._wTray();   // tap the part that completes the family
      this._widgetEl.firstChild === tri;   // tri already appended above tray's innerHTML reset — re-append
      // _wTray() reset innerHTML; rebuild order: triangle THEN tray
      w.innerHTML = ''; w.appendChild(tri);
      var tray = api.el('div', 'fic-tray');
      this._trayParts().forEach(function (p) {
        var b = api.el('button', 'fic-part'); b.type = 'button'; b.textContent = String(p.value); b.setAttribute('data-v', p.value);
        if (self.readOnly) { b.disabled = true; if (p.value === self.x) b.classList.add('fic-part-win'); }
        else b.addEventListener('click', function () { self._commit(p.value, b); });
        tray.appendChild(b);
      });
      w.appendChild(tray);
    },
    _triangleSVG: function (whole, left, right) {
      var ns = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(ns, 'svg'); svg.setAttribute('viewBox', '0 0 120 96'); svg.setAttribute('class', 'fic-tri'); svg.setAttribute('aria-hidden', 'true');
      function el(t, a) { var e = document.createElementNS(ns, t); for (var k in a) e.setAttribute(k, a[k]); return e; }
      svg.appendChild(el('path', { d: 'M60 10 L106 84 L14 84 Z', fill: 'none', stroke: C.T, 'stroke-width': 3, 'stroke-linejoin': 'round', opacity: .55 }));
      function node(cx, cy, txt, missing) {
        svg.appendChild(el('circle', { cx: cx, cy: cy, r: 16, fill: missing ? C.CREAM : '#D2E8E1', stroke: missing ? C.CORAL : C.T, 'stroke-width': missing ? 3 : 2.5 }));
        var t = el('text', { x: cx, y: cy, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: missing ? C.CORAL : C.T, 'font-size': 17, 'font-weight': 800, 'font-family': 'var(--lcs-font-display,"Baloo 2",sans-serif)' });
        t.textContent = missing ? '?' : String(txt); svg.appendChild(t);
      }
      node(60, 20, whole, whole == null);
      node(20, 80, left, left == null);
      node(100, 80, right, right == null);
      return svg;
    },

    /* ----- recombine the kept + removed groups (missing minuend) ----- */
    _wRecombine: function () {
      var api = this.api, self = this, r = this.round, w = this._widgetEl; w.innerHTML = '';
      var stage = api.el('div', 'fic-recomb' + (this.recombined ? ' fic-recomb-on' : ''));
      var kept = api.el('div', 'fic-pile fic-kept'); kept.appendChild(dots(api, r.c, 'kept')); var k1 = api.el('span', 'fic-pile-lab'); k1.textContent = String(r.c); kept.appendChild(k1);
      var rem = api.el('div', 'fic-pile fic-removed'); rem.appendChild(dots(api, r.b, 'removed')); var r1 = api.el('span', 'fic-pile-lab'); r1.textContent = String(r.b); rem.appendChild(r1);
      stage.append(kept, rem); w.appendChild(stage);
      if (!this.recombined) {
        var btn = api.el('button', 'fic-slide'); btn.type = 'button'; btn.textContent = api.t('slide');
        if (this.readOnly) btn.disabled = true; else btn.addEventListener('click', function () { self.recombined = true; self.api.sound && self.api.sound(560); self._renderWidget(); });
        w.appendChild(btn);
      } else {
        // recombined → tap the whole from a tray
        var tray = api.el('div', 'fic-tray');
        this._trayParts().forEach(function (p) {
          var b = api.el('button', 'fic-part'); b.type = 'button'; b.textContent = String(p.value); b.setAttribute('data-v', p.value);
          if (self.readOnly) { b.disabled = true; if (p.value === self.x) b.classList.add('fic-part-win'); }
          else b.addEventListener('click', function () { self._commit(p.value, b); });
          tray.appendChild(b);
        });
        w.appendChild(tray);
      }
    },

    /* ----- balance beam ----- */
    _wBalance: function () {
      var api = this.api, self = this, r = this.round, w = this._widgetEl; w.innerHTML = '';
      var leftTotal = r.a + r.b, loaded = this.loaded, rightTotal = (loaded == null ? 0 : loaded) + r.d;
      var tilt = loaded == null ? -8 : (rightTotal === leftTotal ? 0 : (rightTotal > leftTotal ? 8 : -8));
      var beam = api.el('div', 'fic-beam');
      var bar = api.el('div', 'fic-bar'); bar.style.transform = 'rotate(' + tilt + 'deg)';
      var lp = api.el('div', 'fic-pan fic-pan-l'); lp.innerHTML = '<span class="fic-pan-n">' + r.a + '+' + r.b + '</span>';
      var rp = api.el('div', 'fic-pan fic-pan-r'); rp.innerHTML = '<span class="fic-pan-n">' + (loaded == null ? '?' : loaded) + '+' + r.d + '</span>';
      bar.append(lp, rp); beam.appendChild(api.el('div', 'fic-fulcrum')); beam.appendChild(bar); w.appendChild(beam);
      var tray = api.el('div', 'fic-tray');
      this._trayParts().forEach(function (p) {
        var b = api.el('button', 'fic-part'); b.type = 'button'; b.textContent = String(p.value); b.setAttribute('data-v', p.value);
        if (self.readOnly) { b.disabled = true; if (p.value === self.x) b.classList.add('fic-part-win'); }
        else b.addEventListener('click', function () { self.loaded = p.value; self._renderWidget(); self._commit(p.value, b); });
        tray.appendChild(b);
      });
      w.appendChild(tray);
    },

    /* ----- produce-a-problem (tap a triangle number to hide) ----- */
    _wProduce: function () {
      var api = this.api, self = this, r = this.round, w = this._widgetEl; w.innerHTML = '';
      var ns = 'http://www.w3.org/2000/svg';
      var nodes = [{ k: 'whole', v: r.whole, cx: 60, cy: 20 }, { k: 'p1', v: r.p1, cx: 20, cy: 80 }, { k: 'p2', v: r.p2, cx: 100, cy: 80 }];
      var svg = document.createElementNS(ns, 'svg'); svg.setAttribute('viewBox', '0 0 120 96'); svg.setAttribute('class', 'fic-tri fic-tri-produce');
      function el(t, a) { var e = document.createElementNS(ns, t); for (var k in a) e.setAttribute(k, a[k]); return e; }
      svg.appendChild(el('path', { d: 'M60 10 L106 84 L14 84 Z', fill: 'none', stroke: C.T, 'stroke-width': 3, 'stroke-linejoin': 'round', opacity: .55 }));
      nodes.forEach(function (nd) {
        var g = document.createElementNS(ns, 'g'); g.setAttribute('class', 'fic-prodnode'); g.setAttribute('tabindex', self.readOnly ? '-1' : '0'); g.setAttribute('role', 'button');
        var hidden = self.hidden === nd.k;
        g.appendChild(el('circle', { cx: nd.cx, cy: nd.cy, r: 16, fill: hidden ? C.CREAM : '#D2E8E1', stroke: hidden ? C.CORAL : C.T, 'stroke-width': hidden ? 3 : 2.5 }));
        var t = el('text', { x: nd.cx, y: nd.cy, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: hidden ? C.CORAL : C.T, 'font-size': 17, 'font-weight': 800, 'font-family': 'var(--lcs-font-display,"Baloo 2",sans-serif)' });
        t.textContent = hidden ? '?' : String(nd.v); g.appendChild(t);
        if (!self.readOnly) g.addEventListener('click', function () { self.hidden = nd.k; self._renderWidget(); self._commit(nd.k, null); });
        svg.appendChild(g);
      });
      w.appendChild(svg);
    },

    /* ---------- commit → TEST-IT → win / miss ---------- */
    _commit: function (part, btn) {
      if (this.readOnly) return;
      this.committed = part;
      var ok = Core.isCorrect(this.round, part);
      if (this.round.experience !== 'produce' && this.round.experience !== 'make10' && this.round.experience !== 'missingAddend' && this.round.experience !== 'missingSubtrahend') {
        // relational read-back for tray bands
        if (this.api.announce) this.api.announce(String(part));
      }
      if (ok) { this._win(); } else { this.misses++; this._miss(part, btn); }
    },

    _win: function () {
      this.readOnly = true; this.phase = 'done';
      this.solved = Math.min(this.solved + 1, (this._pool && this._pool.length) || 8);
      this._setPose('happy'); this.api.sound && this.api.sound(880);
      this.render();
      this._testIt();
      var key = { make10: 'winMake10', missingSum: 'winSum', missingAddend: 'winAddend', missingSubtrahend: 'winSubtrahend', missingFirstAddend: 'winFirstAddend', missingMinuend: 'winMinuend', balance: 'winBalance', produce: 'winProduce' }[this.round.experience] || 'winSum';
      var msg = interp(this.api.t(key), { x: this.x });
      if (this.api.announce) this.api.announce(msg); speak(msg);
    },

    _miss: function (part, btn) {
      this._setPose('squint'); this.api.sound && this.api.sound(300);
      var r = this.round, msg;
      if (part === r.c || (r.kind === 'balance' && part === r.a + r.b)) msg = this.api.t('missCopy');
      else if (part != null && part > (this.x + 2)) msg = interp(this.api.t('missOver'), { a: r.a, c: r.c });
      else if (part === this.x + 1 || part === this.x - 1) msg = this.api.t('missOne');
      else msg = this.api.t('missGeneric');
      // model the computation (inverse hook)
      var model = (r.a != null && r.c != null) ? interp(this.api.t('model'), { a: r.a, x: this.x, c: r.c }) : '';
      if (this.api.announce) this.api.announce(msg + (model ? ' ' + model : ''));
      speak(msg);
      if (btn) { btn.classList.add('fic-bonk'); var b = btn; setTimeout(function () { b.classList.remove('fic-bonk'); }, 480); }
      if (this._gadgetEl) { var g = this._gadgetEl; g.classList.add('fic-overrev'); setTimeout(function () { g.classList.remove('fic-overrev'); }, 520); }
      // ESCALATION after 2 misses on a tray band → swap in a count-on rail
      if (this.misses >= 2 && !this.escalated && Core.escalationOp(this._escalationRound())) {
        this.escalated = true;
        if (this.api.announce) this.api.announce(this.api.t('escalate'));
        this._renderEscalation();
      }
    },

    /* on a tray band, build a count-on round from the larger known part to the whole */
    _escalationRound: function () {
      var r = this.round;
      if (r.experience === 'missingAddend' || r.experience === 'missingSubtrahend') return r;
      // synth a count-on: from the smaller addend to the whole (missingSum/balance/firstAddend/minuend)
      var from, to;
      if (r.kind === 'balance') { from = r.d; to = r.a + r.b; }
      else if (r.experience === 'missingSum') { from = r.a; to = r.a + r.b; }
      else if (r.experience === 'missingFirstAddend') { from = r.b; to = r.c; }
      else if (r.experience === 'missingMinuend') { from = r.b; to = r.b + r.c; }
      else return null;
      return { experience: 'missingAddend', a: from, op: '+', b: null, c: to, range: r.range, tool: 'countOn' };
    },
    _renderEscalation: function () {
      var er = this._escalationRound(); if (!er) return;
      // re-point the widget to a number-line for the synth count-on; commit the real answer on arrival
      this._escRound = er; this.hops = 0;
      var w = this._widgetEl; if (!w) return; w.innerHTML = '';
      var api = this.api, self = this, from = er.a, to = er.c, lo = Math.max(0, from - 1), hi = to + 1;
      var rail = api.el('div', 'fic-rail-label'); rail.textContent = api.t('escalate'); w.appendChild(rail);
      var line = api.el('div', 'fic-line'); this._lineNotches = [];
      for (var n = lo; n <= hi; n++) { var notch = api.el('div', 'fic-notch'); var lab = api.el('span', 'fic-notch-lab'); lab.textContent = String(n); notch.appendChild(lab); if (n === from) notch.classList.add('fic-notch-start'); if (n === to) notch.classList.add('fic-notch-flag'); notch.setAttribute('data-n', n); line.appendChild(notch); this._lineNotches.push(notch); }
      var marker = api.el('div', 'fic-marker'); this._markerEl = marker; line.appendChild(marker); w.appendChild(line);
      var btn = api.el('button', 'fic-hop'); btn.type = 'button'; btn.textContent = api.t('hop') + ' →';
      btn.addEventListener('click', function () { self._hopEsc(); }); w.appendChild(btn);
      this._escFrom = from; this._escTo = to; this._positionMarkerEsc();
    },
    _positionMarkerEsc: function () {
      if (!this._markerEl) return; var cur = this._escFrom + this.hops;
      var idx = this._lineNotches.map(function (e) { return +e.getAttribute('data-n'); }).indexOf(cur); if (idx < 0) idx = 0;
      var pct = this._lineNotches.length > 1 ? (idx / (this._lineNotches.length - 1)) * 100 : 0;
      this._markerEl.style.left = pct + '%';
      for (var i = 0; i < this._lineNotches.length; i++) { var nv = +this._lineNotches[i].getAttribute('data-n'); this._lineNotches[i].classList.toggle('fic-hopped', nv >= this._escFrom && nv < cur); }
    },
    _hopEsc: function () {
      this.hops++; var cur = this._escFrom + this.hops; this.api.sound && this.api.sound(620 + this.hops * 30); this._positionMarkerEsc();
      if (cur >= this._escTo) { this._win(); }
    },

    _testIt: function () {
      if (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var g = this._gadgetEl; if (!g) return; g.classList.add('fic-whir'); setTimeout(function () { g.classList.remove('fic-whir'); }, 700);
      var s = document.createElement('span'); s.className = 'fic-spark'; s.textContent = '✦'; if (this._roomEl) { this._roomEl.appendChild(s); setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 750); }
    },

    _paintShelf: function () { if (!this._shelfEl) return; var p = this._shelfEl.children; for (var i = 0; i < p.length; i++) p[i].classList.toggle('fic-pin-on', i < this.solved); },
    _setPose: function (name) { if (this._moleEl) this._moleEl.setAttribute('data-pose', name); },

    isCorrect: function () { return this.phase === 'done'; },
    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks(Core.buildRounds());
      var n = pool.length, i = (opts && opts.index) || 0;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = (n > 0) ? Math.floor(i / n) : 0;
      if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/fix-it-corner-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = self._buildTasks(row); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[fix-it-corner] manifest load failed; fallback:', e.message); });
    },
    _buildTasks: function (row) { if (row.params && Array.isArray(row.params.rounds)) return makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); return makeTasks(Core.buildRounds()); },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.fic-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;--fic-num:clamp(26px,7.5vw,40px);}'
        + '.fic-room{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.4vw,9px);'
        +   'background:linear-gradient(180deg,#EFE7D6,#E7DcC6);border-radius:20px;padding:clamp(7px,1.8vw,12px) clamp(7px,1.8vw,12px);'
        +   'box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);transition:background .5s;}'
        + '.fic-room.fic-lit{background:linear-gradient(180deg,#FBF3E4,#F7ECD2);}'
        /* Fixit — inline with the equation in the gadget header row */
        + '.fic-ghead{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:clamp(8px,2.6vw,18px);width:100%;}'
        + '.fic-mole{width:clamp(44px,11vw,60px);flex:0 0 auto;}.fic-mole-svg{width:100%;height:auto;display:block;overflow:visible;}'
        + '.fic-eyes-happy,.fic-eyes-squint{display:none;}'
        + '.fic-mole[data-pose="happy"] .fic-eyes-open{display:none;}.fic-mole[data-pose="happy"] .fic-eyes-happy{display:inline;}'
        + '.fic-mole[data-pose="squint"] .fic-eyes-open{display:none;}.fic-mole[data-pose="squint"] .fic-eyes-squint{display:inline;}'
        /* gadget panel */
        + '.fic-gadget{width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(7px,1.8vw,12px);'
        +   'background:#FCF6EA;border:2.5px solid rgba(20,107,94,.16);border-radius:16px;padding:clamp(8px,2vw,13px) clamp(7px,1.8vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.6);}'
        + '.fic-gadget.fic-whir{animation:ficWhir .7s ease;}@keyframes ficWhir{0%,100%{transform:translateY(0)}30%{transform:translateY(-3px) rotate(-1deg)}60%{transform:translateY(2px) rotate(1deg)}}'
        + '.fic-gadget.fic-overrev{animation:ficRev .5s ease;}@keyframes ficRev{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}'
        /* equation strip */
        + '.fic-eq{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:clamp(5px,1.6vw,9px);font-family:"Baloo 2",var(--lcs-font-display,sans-serif);}'
        + '.fic-cell{font-size:var(--fic-num);font-weight:800;color:' + C.T + ';line-height:1;min-width:1ch;text-align:center;}'
        + '.fic-op{font-size:calc(var(--fic-num) * .82);font-weight:800;color:' + C.CORAL + ';}'
        + '.fic-vessel{display:inline-flex;align-items:center;justify-content:center;min-width:clamp(42px,12vw,60px);min-height:clamp(42px,12vw,60px);border-radius:50%;background:#E2F0EC;border:3px solid ' + C.T + ';color:' + C.T + ';box-shadow:inset 0 2px 0 rgba(255,255,255,.5);}'
        + '.fic-socket{display:inline-flex;align-items:center;justify-content:center;min-width:clamp(42px,12vw,58px);min-height:clamp(42px,12vw,58px);border-radius:14px;background:#FFF;border:3px dashed ' + C.CORAL + ';color:' + C.CORAL + ';box-shadow:0 0 0 4px rgba(242,120,75,.16);animation:ficGlow 1.4s ease-in-out infinite;}'
        + '@keyframes ficGlow{0%,100%{box-shadow:0 0 0 4px rgba(242,120,75,.14)}50%{box-shadow:0 0 0 7px rgba(242,120,75,.26)}}'
        + '.fic-socket.fic-seated{border-style:solid;border-color:' + C.GOOD + ';color:' + C.GOOD + ';background:#EAF7F0;animation:none;box-shadow:0 0 0 4px rgba(47,165,106,.22);}'
        /* widget area */
        + '.fic-widget{width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.8vw,11px);}'
        + '.fic-vessel-hint{font:700 14px/1.2 var(--lcs-font-display,"Baloo 2",sans-serif);color:' + C.T + ';opacity:.8;}'
        /* bounded common-error tray */
        + '.fic-tray{display:flex;flex-wrap:wrap;gap:clamp(8px,2.4vw,14px);justify-content:center;}'
        + '.fic-part{min-width:clamp(50px,13vw,70px);min-height:clamp(48px,12.5vw,62px);border-radius:14px;border:0;background:linear-gradient(180deg,#fff,#EAF2EE);'
        +   'font:800 clamp(22px,6vw,30px)/1 var(--lcs-font-display,"Baloo 2",sans-serif);color:' + C.T + ';cursor:pointer;box-shadow:0 3px 0 rgba(20,107,94,.22),inset 0 2px 0 #fff;-webkit-tap-highlight-color:transparent;touch-action:manipulation;transition:transform .1s;}'
        + '.fic-part:active{transform:translateY(2px);box-shadow:0 1px 0 rgba(20,107,94,.22);}'
        + '.fic-part:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '.fic-part.fic-bonk{animation:ficRev .48s ease;background:linear-gradient(180deg,#FFF0EA,#FBE0D5);}'
        + '.fic-part.fic-part-win{background:linear-gradient(180deg,#EAF7F0,#CFEEDD);box-shadow:0 0 0 3px ' + C.GOOD + ',0 3px 0 rgba(20,107,94,.22);}'
        /* ten-frame */
        + '.fic-frame{display:grid;grid-template-columns:repeat(5,1fr);gap:clamp(4px,1.4vw,7px);background:' + C.T + ';padding:clamp(4px,1.4vw,7px);border-radius:12px;}'
        + '.fic-fcell{width:clamp(26px,7.6vw,42px);height:clamp(26px,7.6vw,42px);border-radius:50%;border:0;background:#F0F5F2;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform .1s;}'
        + '.fic-fcell:active{transform:scale(.9);}.fic-fcell:disabled{cursor:default;}'
        + '.fic-fc-given{background:' + C.T + ';box-shadow:inset 0 0 0 3px #F0F5F2;}'
        + '.fic-fc-new{background:' + C.CORAL + ';}'
        + '.fic-frame-read{font:800 clamp(18px,5vw,24px)/1 var(--lcs-font-display,"Baloo 2",sans-serif);color:' + C.T + ';}'
        /* number line */
        + '.fic-line{position:relative;width:100%;max-width:420px;height:52px;margin-top:2px;}'
        + '.fic-line::before{content:"";position:absolute;left:3%;right:3%;top:28px;height:4px;border-radius:2px;background:' + C.STEEL + ';}'
        + '.fic-notch{position:absolute;}'   /* positioned by flex fallback below */
        + '.fic-line{display:flex;align-items:flex-start;justify-content:space-between;padding:0 3%;}'
        + '.fic-notch{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;}'
        + '.fic-notch::after{content:"";width:4px;height:14px;border-radius:2px;background:' + C.STEEL + ';margin-top:22px;}'
        + '.fic-notch-lab{font:700 clamp(11px,3vw,14px)/1 var(--lcs-font-display,"Baloo 2",sans-serif);color:' + C.T + ';}'
        + '.fic-notch-start::after{background:' + C.T + ';height:20px;}'
        + '.fic-notch-flag::after{background:' + C.CORAL + ';height:20px;}'
        + '.fic-notch-flag .fic-notch-lab{color:' + C.CORAL + ';font-weight:800;}'
        + '.fic-notch.fic-hopped::after{background:' + C.GOOD + ';}'
        + '.fic-marker{position:absolute;top:14px;left:0;width:18px;height:18px;border-radius:50%;background:' + C.GOLD + ';border:2px solid ' + C.T + ';transform:translateX(-50%);transition:left .18s var(--lcs-ease,ease);z-index:2;}'
        + '.fic-hop{min-height:46px;padding:0 clamp(16px,5vw,26px);border-radius:14px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(15px,4vw,19px)/1 var(--lcs-font-display,"Baloo 2",sans-serif);cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.fic-hop:active{transform:translateY(2px);box-shadow:0 1px 0 ' + C.CORAL2 + ';}.fic-hop:disabled{opacity:.5;}'
        + '.fic-rail-label{font:700 13px/1.3 var(--lcs-font-display,"Baloo 2",sans-serif);color:' + C.CORAL + ';text-align:center;}'
        /* triangle */
        + '.fic-tri{width:clamp(98px,27vw,138px);height:auto;display:block;}'
        + '.fic-prodnode{cursor:pointer;}.fic-prodnode:focus-visible{outline:none;}'
        /* recombine */
        + '.fic-recomb{display:flex;gap:clamp(14px,5vw,30px);align-items:center;justify-content:center;transition:gap .4s ease;}'
        + '.fic-recomb-on{gap:2px;}'
        + '.fic-pile{display:flex;flex-direction:column;align-items:center;gap:4px;}'
        + '.fic-dots{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;}'
        + '.fic-dot{width:clamp(9px,2.6vw,13px);height:clamp(9px,2.6vw,13px);border-radius:50%;}'
        + '.fic-dot-kept{background:' + C.T + ';}.fic-dot-removed{background:' + C.CORAL + ';}'
        + '.fic-pile-lab{font:800 clamp(16px,4.4vw,22px)/1 var(--lcs-font-display,"Baloo 2",sans-serif);color:' + C.T + ';}'
        + '.fic-slide{min-height:46px;padding:0 clamp(16px,5vw,24px);border-radius:14px;border:0;background:' + C.T + ';color:#fff;font:800 clamp(14px,3.8vw,18px)/1 var(--lcs-font-display,"Baloo 2",sans-serif);cursor:pointer;box-shadow:0 3px 0 rgba(20,107,94,.4);touch-action:manipulation;}'
        + '.fic-slide:active{transform:translateY(2px);}'
        /* balance */
        + '.fic-beam{position:relative;width:min(94%,340px);height:74px;}'
        + '.fic-fulcrum{position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:0;height:0;border-left:16px solid transparent;border-right:16px solid transparent;border-bottom:26px solid ' + C.STEEL + ';}'
        + '.fic-bar{position:absolute;left:8%;right:8%;top:24px;height:9px;border-radius:6px;background:' + C.T + ';transform-origin:50% 50%;transition:transform .35s var(--lcs-ease,ease);}'
        + '.fic-pan{position:absolute;top:-22px;width:clamp(56px,17vw,82px);height:40px;border-radius:8px 8px 16px 16px;background:#E2F0EC;border:2.5px solid ' + C.T + ';display:flex;align-items:center;justify-content:center;}'
        + '.fic-pan-l{left:-30px;}.fic-pan-r{right:-30px;}'
        + '.fic-pan-n{font:800 clamp(15px,4vw,20px)/1 var(--lcs-font-display,"Baloo 2",sans-serif);color:' + C.T + ';}'
        /* progress shelf */
        + '.fic-shelf{display:flex;gap:5px;flex-wrap:wrap;justify-content:center;}'
        + '.fic-pin{width:clamp(12px,3.4vw,18px);height:7px;border-radius:3px;background:rgba(20,107,94,.16);transition:background .3s;}'
        + '.fic-pin.fic-pin-on{background:' + C.GOLD + ';}'
        + '.fic-spark{position:absolute;left:50%;top:8px;transform:translateX(-50%);color:' + C.GOLD + ';font-size:22px;animation:ficSpark .75s ease forwards;pointer-events:none;z-index:5;}'
        + '@keyframes ficSpark{0%{opacity:0;transform:translate(-50%,8px) scale(.5)}30%{opacity:1}100%{opacity:0;transform:translate(-50%,-20px) scale(1.15)}}'
        + '@media (max-width:340px){.fic-room{padding:6px;gap:4px;}.fic-gadget{gap:6px;padding:7px 6px;}.fic-widget{gap:6px;}.fic-tri{width:90px;}.fic-part{min-height:46px;min-width:48px;}.fic-pan-l{left:-16px;}.fic-pan-r{right:-16px;}}'
        + '@media (prefers-reduced-motion: reduce){.fic-gadget,.fic-marker,.fic-bar,.fic-spark,.fic-recomb{animation:none!important;transition:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-fix-it-corner', ''); tag.textContent = css;
      document.head.appendChild(tag);
    }
  };

  function dots(api, n, kind) {
    var wrap = api.el('span', 'fic-dots');
    for (var i = 0; i < n; i++) { var d = api.el('span', 'fic-dot fic-dot-' + kind); wrap.appendChild(d); }
    return wrap;
  }

  /* equation cells for the strip (the blank → a socket) */
  function eqCells(r) {
    if (r.kind === 'balance') {
      return [{ text: r.a }, { op: true, text: '+' }, { text: r.b }, { op: true, text: '=' }, { socket: true }, { op: true, text: '+' }, { text: r.d }];
    }
    var a = r.a == null ? { socket: true } : { text: r.a, whole: false };
    var b = r.b == null ? { socket: true } : { text: r.b };
    var c = r.c == null ? { socket: true } : { text: r.c, whole: true };
    return [a, { op: true, text: r.op }, b, { op: true, text: '=' }, c];
  }

  /* per-experience prompt + args */
  function promptFor(r) {
    switch (r.experience) {
      case 'make10': return { key: 'promptMake10', args: {} };
      case 'missingSum': return { key: 'promptMissingSum', args: { a: r.a, b: r.b } };
      case 'missingAddend': return { key: 'promptMissingAddend', args: { a: r.a, c: r.c } };
      case 'missingSubtrahend': return { key: 'promptMissingSubtrahend', args: { a: r.a, b: r.c } };
      case 'missingFirstAddend': return { key: 'promptMissingFirstAddend', args: { b: r.b, c: r.c } };
      case 'missingMinuend': return { key: 'promptMissingMinuend', args: { b: r.b, c: r.c } };
      case 'balance': return { key: 'promptBalance', args: {} };
      case 'produce': return { key: 'promptProduce', args: {} };
      default: return { key: 'promptMissingSum', args: {} };
    }
  }

  function makeTasks(rounds) {
    return rounds.map(function (round) {
      var p = promptFor(round);
      return {
        id: 'fix-it-corner.' + round.id, band: round.band,
        promptKey: p.key, promptArgs: p.args, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { var ok = tool.isCorrect(); if (ok) tool.readOnly = true; return ok; },
        hintKey: function () { return 'hintCheck'; }
      };
    });
  }

  function bandOrder(pool, prev) {
    var byBand = {}; pool.forEach(function (t, i) { (byBand[t.band] = byBand[t.band] || []).push(i); });
    var bands = Object.keys(byBand).sort(function (a, b) { return a - b; });
    var out, attempts = 0;
    do { out = []; bands.forEach(function (b) { var g = byBand[b].slice(); for (var i = g.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = g[i]; g[i] = g[j]; g[j] = t; } out = out.concat(g); }); attempts++; } while (prev && out.join(',') === prev.join(',') && attempts < 12 && pool.length > 1);
    return out;
  }

}(typeof window !== 'undefined' ? window : this));
