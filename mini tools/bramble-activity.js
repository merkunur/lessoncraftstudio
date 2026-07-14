/* =====================================================================
   BRAMBLE'S BERRY-JUICE STAND — ACTIVITY SKIN  (bramble-activity.js)
   ---------------------------------------------------------------------
   K.MD.A.2 · capacity. The lcs-shell activity skin over bramble-core.js.
   answerType:'state' — the child's COMMIT is the 3 in-stage predict buttons;
   the shell Check is the post-pour "Serve the guest" confirm (hidden until
   the round resolves, via a marker class — 0 lines to lcs-shell.js/.css).

   The graded act = the COMMITTED PREDICTION (more/less/same), locked BEFORE
   any pour. Then the pour VERIFIES. A miss is a warm discovery (no red): a
   berry STILL drops, the fooled STRUCTURE returns later on a NOVEL surface.
   The result is NEVER shown before the commit (both motion modes).

   Layout is budgeted tight (the §A.13.62 chrome law): one compact
   Bramble+line+basket row, a short container SVG, one row of predict
   buttons — the root stays well under the desktop/phone fold.

   0 lines to ANY core / lcs-shell. All capacity logic lives in BrambleCore;
   this file only renders + sequences the phases.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.BrambleCore;

  /* EN pilot strings. STANDALONE button labels + describe-sentence are a
     future §A.13.48 native-ensemble table-fill (one row per locale); "same"
     anchors to a fixed neutral quantity noun ("the same amount"), never a
     {word} token (the §A.13.56 Finnish trap). */
  var L = {
    en: {
      leftMore: 'Left', rightMore: 'Right', same: 'Same',
      fits: 'It fits!', overflows: 'It spills!',
      brambleClear: 'Looks easy — but you call it!',
      brambleTricky: 'Sneaky cups! What do YOU say?',
      brambleFit: 'Will it fit, or spill? Call it!',
      rightYes: 'Yes — spot on, pal!',
      rightSame: 'They look so different — but they hold the SAME!',
      missWide: 'My eyes lied — the WIDE one held more! Now we know!',
      missTall: 'My eyes lied — the TALL one held more! Now we know!',
      missSame: 'Surprise — they hold the SAME! Sneaky shapes!',
      missFit: 'Whoops — it spilled! It holds less. Now we know!',
      missFitOver: 'Look — it fit! It holds more. Now we know!',
      describe: 'Now YOU say it — which held more?',
      describeYes: 'You remembered! Nice one.',
      describeNo: 'Look again — it was the other one. Now you know!',
      pouring: 'Pouring… let’s see!',
      poured: 'Tap Check to serve the next friend!',
      ariaStage: 'Two containers to compare'
    },
    de: {
      leftMore: 'Links', rightMore: 'Rechts', same: 'Gleich',
      fits: 'Es passt!', overflows: 'Es läuft über!',
      brambleClear: 'Sieht leicht aus — aber du entscheidest!',
      brambleTricky: 'Knifflige Becher! Was sagst DU?',
      brambleFit: 'Passt es rein oder läuft es über? Entscheide du!',
      rightYes: 'Ja — genau richtig, mein Freund!',
      rightSame: 'Sie sehen so verschieden aus — aber sie fassen GLEICH viel!',
      missWide: 'Meine Augen haben mich getäuscht — das BREITE Gefäß fasst mehr! Jetzt wissen wir es!',
      missTall: 'Meine Augen haben mich getäuscht — das HOHE Gefäß fasst mehr! Jetzt wissen wir es!',
      missSame: 'Überraschung — sie fassen GLEICH viel! Knifflige Formen!',
      missFit: 'Hoppla — es ist übergelaufen! Es fasst weniger. Jetzt wissen wir es!',
      missFitOver: 'Schau — es hat reingepasst! Es fasst mehr. Jetzt wissen wir es!',
      describe: 'Jetzt sagst DU es — welches hat mehr gefasst?',
      describeYes: 'Du hast es dir gemerkt! Super gemacht.',
      describeNo: 'Schau noch mal — es war das andere. Jetzt weißt du es!',
      pouring: 'Ich gieße ein … mal sehen!',
      poured: 'Tippe auf „Prüfen", um den nächsten Gast zu bedienen!',
      ariaStage: 'Zwei Gefäße zum Vergleichen'
    },
    fr: {
      leftMore: 'Gauche', rightMore: 'Droite', same: 'Pareil',
      fits: 'Ça rentre !', overflows: 'Ça déborde !',
      brambleClear: 'Ça a l’air facile — mais c’est toi qui décides !',
      brambleTricky: 'Des verres malins ! Qu’est-ce que TU en dis ?',
      brambleFit: 'Ça rentre ou ça déborde ? À toi de décider !',
      rightYes: 'Oui — pile poil, mon ami !',
      rightSame: 'Ils ont l’air si différents — mais ils contiennent PAREIL !',
      missWide: 'Mes yeux m’ont trompé — c’est le plus large qui contenait le plus ! Maintenant on le sait !',
      missTall: 'Mes yeux m’ont trompé — c’est le plus haut qui contenait le plus ! Maintenant on le sait !',
      missSame: 'Surprise — ils contiennent PAREIL ! Des formes malines !',
      missFit: 'Oups — ça a débordé ! Il contient moins. Maintenant on le sait !',
      missFitOver: 'Regarde — c’est rentré ! Il contient plus. Maintenant on le sait !',
      describe: 'Maintenant, à TOI de le dire — lequel contenait le plus ?',
      describeYes: 'Tu t’en es souvenu ! Bravo.',
      describeNo: 'Regarde encore — c’était l’autre. Maintenant tu le sais !',
      pouring: 'Je verse… on va voir !',
      poured: 'Touche Vérifier pour servir le prochain ami !',
      ariaStage: 'Deux récipients à comparer'
    },
    es: {
      leftMore: 'Izquierda', rightMore: 'Derecha', same: 'Igual',
      fits: '¡Cabe!', overflows: '¡Se derrama!',
      brambleClear: 'Se ve fácil… ¡pero tú decides!',
      brambleTricky: '¡Vasos tramposos! ¿Tú qué dices?',
      brambleFit: '¿Cabe o se derrama? ¡Tú decides!',
      rightYes: '¡Sí, justo así, amiguito!',
      rightSame: 'Se ven muy distintos… ¡pero les cabe lo MISMO!',
      missWide: '¡Mis ojos me engañaron: al vaso ANCHO le cabe más! ¡Ya lo sabemos!',
      missTall: '¡Mis ojos me engañaron: al vaso ALTO le cabe más! ¡Ya lo sabemos!',
      missSame: '¡Sorpresa: les cabe lo MISMO! ¡Qué formas tan tramposas!',
      missFit: '¡Uy, se derramó! Le cabe menos. ¡Ya lo sabemos!',
      missFitOver: '¡Mira, sí cupo! Le cabe más. ¡Ya lo sabemos!',
      describe: 'Ahora dilo tú: ¿a cuál le cupo más?',
      describeYes: '¡Te acordaste! Muy bien.',
      describeNo: 'Míralo otra vez: era el otro. ¡Ya lo sabes!',
      pouring: 'Estoy sirviendo… ¡a ver qué pasa!',
      poured: 'Toca «Comprobar» para servirle al siguiente cliente.',
      ariaStage: 'Dos recipientes para comparar'
    }
  };

  function txt(key) {
    var lang = (global.LCS && global.LCS.i18n && global.LCS.i18n.current) || 'en';
    var pack = L[lang] || L.en;
    return pack[key] || L.en[key] || key;
  }

  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  /* ---- SVG geometry (one shared coordinate space → honest height contrast) ----
     Tightened viewBox + bigger vessels so the conservation contrast (the
     cognition) reads large, not as a thin glyph floating in an empty band. */
  var VW = 260, VH = 140, BASE = 124;            /* viewBox + table baseline */
  var CXA = 72, CXB = 188;                         /* container centres */
  var MAXW = 80, MAXH = 104;                        /* px a 100-unit drawn dim maps to */

  function px(dim, max) { return (dim / 100) * max; }

  function vesselSVG(side, cont, fillTint) {
    var w = px(cont.drawnWidth, MAXW), h = px(cont.drawnHeight, MAXH);
    var cx = side === 'A' ? CXA : CXB;
    var left = cx - w / 2, right = cx + w / 2, top = BASE - h;
    var r = Math.min(10, w / 3);
    var clipId = 'bbclip-' + side, liqId = 'bbliq-' + side;
    var outline =
      'M' + left + ',' + top +
      ' L' + left + ',' + (BASE - r) +
      ' Q' + left + ',' + BASE + ' ' + (left + r) + ',' + BASE +
      ' L' + (right - r) + ',' + BASE +
      ' Q' + right + ',' + BASE + ' ' + right + ',' + (BASE - r) +
      ' L' + right + ',' + top;
    var s =
      '<clipPath id="' + clipId + '"><path d="' + outline + ' Z"/></clipPath>' +
      '<rect class="bb-liquid" id="' + liqId + '" x="' + left + '" y="' + top +
      '" width="' + w + '" height="' + h + '" fill="' + fillTint + '" clip-path="url(#' + clipId + ')" ' +
      'transform="translate(0 ' + BASE + ') scale(1 0) translate(0 ' + (-BASE) + ')"/>' +
      '<path class="bb-vessel" d="' + outline + '" fill="none" stroke="#146B5E" stroke-width="4.5" ' +
      'stroke-linecap="round" stroke-linejoin="round"/>' +
      '<ellipse cx="' + cx + '" cy="' + (BASE + 4) + '" rx="' + (w / 2 + 5) + '" ry="3.5" fill="#000" opacity="0.07"/>';
    return { markup: s, liqId: liqId, top: top, h: h };
  }

  function spillSVG(side) {
    var cx = side === 'A' ? CXA : CXB;
    return '<g class="bb-spill" id="bbspill-' + side + '" opacity="0">' +
      '<path d="M' + (cx - 22) + ',' + (BASE - 5) + ' q-9,7 -14,19 q9,4 14,-3 q3,10 10,9 q-2,-10 4,-15 z" fill="#F2784B" opacity="0.9"/>' +
      '<circle cx="' + (cx + 19) + '" cy="' + (BASE + 7) + '" r="4.5" fill="#F2784B" opacity="0.85"/></g>';
  }

  function sparkleSVG(side) {
    var cx = side === 'A' ? CXA : CXB;
    return '<g class="bb-sparkle" id="bbspark-' + side + '" opacity="0">' +
      '<path d="M' + cx + ',' + (BASE - MAXH - 6) + ' l3,6 6,3 -6,3 -3,6 -3,-6 -6,-3 6,-3 z" fill="#F2C14E"/></g>';
  }

  function brambleSVG() {
    return '<svg class="bb-bramble" viewBox="0 0 64 64" width="30" height="30" aria-hidden="true">' +
      '<ellipse cx="32" cy="38" rx="22" ry="20" fill="#7C8B94"/>' +
      '<path d="M14 24 q-4 -12 6 -14 q6 4 6 12 z" fill="#5A6671"/>' +
      '<path d="M50 24 q4 -12 -6 -14 q-6 4 -6 12 z" fill="#5A6671"/>' +
      '<path d="M32 18 L24 44 L40 44 Z" fill="#fff"/>' +
      '<circle class="bb-eye" cx="24" cy="34" r="4.5" fill="#2B2B2B"/>' +
      '<circle class="bb-eye" cx="40" cy="34" r="4.5" fill="#2B2B2B"/>' +
      '<ellipse cx="32" cy="48" rx="5" ry="4" fill="#2B2B2B"/>' +
      '<path class="bb-scarf" d="M16 52 q16 8 32 0 l0 6 q-16 7 -32 0 z" fill="#F2784B"/></svg>';
  }

  function basketSVG(n) {
    var berries = '', cap = Math.min(n, 12);
    for (var i = 0; i < cap; i++) {
      var row = Math.floor(i / 4), col = i % 4;
      var bx = 12 + col * 9 + (row % 2) * 4, by = 22 - row * 6;
      berries += '<circle cx="' + bx + '" cy="' + by + '" r="3.4" fill="#9B2D6B"/>' +
        '<circle cx="' + (bx - 1) + '" cy="' + (by - 1) + '" r="1" fill="#fff" opacity="0.5"/>';
    }
    return '<svg class="bb-basket" viewBox="0 0 58 40" width="36" height="26" aria-hidden="true">' +
      berries +
      '<path d="M5 22 h48 l-4 14 q-1 3 -4 3 H13 q-3 0 -4 -3 z" fill="#B07A47"/>' +
      '<path d="M5 22 h48 l1 4 H4 z" fill="#8C5E33"/></svg>';
  }

  var BrambleActivity = {
    id: 'bramble',

    strings: {
      title: { en: "Bramble's Berry-Juice Stand", de: 'Brambles Beerensaft-Stand', fr: 'Le stand de jus de baies de Bramble', es: 'El puesto de Bramble' },
      instruction: { en: 'Guess which holds more, then pour!', de: 'Rate, welches mehr fasst — dann gießen wir ein!', fr: 'Devine lequel contient le plus, puis verse !', es: 'Adivina a cuál le cabe más… ¡y servimos!' },
      promptPredict: { en: 'Which cup holds more? Call it!', de: 'Welcher Becher fasst mehr? Entscheide du!', fr: 'Quel verre contient le plus ? À toi de deviner !', es: '¿A qué vaso le cabe más? ¡Tú decides!' },
      promptFit: { en: 'Will the juice fit, or spill over?', de: 'Passt der Saft rein oder läuft er über?', fr: 'Le jus va-t-il tenir, ou déborder ?', es: '¿El jugo cabe o se derrama?' }
    },

    init: function (api) {
      this._api = api;
      this._pool = [];
      this._order = null; this._orderForPool = null; this._curPass = 0;
      this._berries = 0;
      this._round = null;
      this._phase = 'predict';
      this._committed = null;
      this._describeChoice = null;
      this._resolved = false;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('bb-style')) return;
      var s = el('style'); s.id = 'bb-style';
      s.textContent = [
        '.bb-root{display:flex;flex-direction:column;align-items:center;gap:7px;width:100%;max-width:540px;margin:0 auto;}',
        '.bb-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.bb-bramble{flex:0 0 auto;}',
        '.bb-bramble.fooled .bb-eye{r:6;}',
        '.bb-line{flex:1 1 auto;min-height:1.2em;text-align:center;font:700 .95rem/1.2 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.bb-line.miss{color:#C2410C;}',
        '.bb-basket{flex:0 0 auto;}',
        '.bb-stage-svg{width:100%;height:auto;max-height:150px;display:block;}',
        '.bb-liquid{transition:transform .5s ease;}',
        '.bb-no-motion .bb-liquid{transition:none;}',
        '.bb-spill,.bb-sparkle{transition:opacity .3s ease;}',
        '.bb-choices{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;width:100%;}',
        '.bb-choice{min-height:48px;min-width:74px;flex:0 1 auto;border:2.5px solid #146B5E;border-radius:14px;background:#fff;',
        'color:#0F4A40;font:800 1rem/1.05 Baloo 2,Nunito,system-ui,sans-serif;padding:6px 14px;cursor:pointer;',
        'display:inline-flex;align-items:center;gap:7px;transition:transform .08s ease,background .15s ease;}',
        '.bb-choice.wide{flex-basis:100%;justify-content:center;}',
        '.bb-choice:hover{background:#E9F5F1;}',
        '.bb-choice:active{transform:scale(.96);}',
        '.bb-dot{width:15px;height:15px;border-radius:50%;flex:0 0 auto;}',
        '.bb-dot.eq{border-radius:4px;background:none;color:#146B5E;font-weight:800;width:auto;}',
        /* the shell Check is the post-pour "serve the guest" confirm — hidden
           until the round resolves (a marker class on .lcs-app; 0 shell lines) */
        '.lcs-app:not(.bramble-resolved) .lcs-activity-check{display:none !important;}',
        '@media (prefers-reduced-motion: reduce){.bb-liquid,.bb-spill,.bb-sparkle{transition:none;}}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'bramble.holds-more.k-md-a-2';
      var tries = [
        '/mini-tools/bramble-activities.json',
        'bramble-activities.json',
        '../mini tools/bramble-activities.json'
      ];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row;
            self._pool = (row && row.params && row.params.rounds) || [];
            self._order = null; self._orderForPool = null; self._curPass = 0;
            if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
          })
          .catch(function () { attempt(i + 1); });
      }(0));
    },

    _bandOrder: function (pool, prev) {
      var onramp = [], rest = [];
      for (var i = 0; i < pool.length; i++) {
        if (pool[i].phase === 'on-ramp') onramp.push(i); else rest.push(i);
      }
      function shuffle(a) {
        for (var k = a.length - 1; k > 0; k--) {
          var j = Math.floor(Math.random() * (k + 1));
          var t = a[k]; a[k] = a[j]; a[j] = t;
        }
        return a;
      }
      var order = onramp.concat(shuffle(rest.slice()));
      if (prev && order.length > 1) {
        var guard = 0;
        while (order.join(',') === prev.join(',') && guard++ < 12) order = onramp.concat(shuffle(rest.slice()));
      }
      return order;
    },

    nextTask: function (ctx) {
      var pool = this._pool || [];
      if (!pool.length) return null;
      var n = pool.length;
      var index = (ctx && ctx.index) || 0;
      var pass = Math.floor(index / n);
      if (!this._order || this._orderForPool !== pool) {
        this._order = this._bandOrder(pool);
        this._orderForPool = pool; this._curPass = 0;
      } else if (pass > this._curPass) {
        this._order = this._bandOrder(pool, this._order);
        this._curPass = pass;
      }
      var round = pool[this._order[index % n]];
      return this._makeTask(round);
    },

    _makeTask: function (round) {
      return {
        id: round.id,
        promptKey: round.cog === 'fit' ? 'promptFit' : 'promptPredict',
        answerType: 'state',
        round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round;
      this._phase = 'predict';
      this._committed = null;
      this._describeChoice = null;
      this._resolved = false;
      /* a per-round token so a deferred pour/describe callback from a PRIOR
         round (still pending when Reset/advance changes the round) becomes a
         no-op instead of corrupting the new round's phase. */
      this._token = (this._token || 0) + 1;
      if (this._app) this._app.classList.remove('bramble-resolved');
    },

    _reduceMotion: function () {
      return global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage;
      stage.innerHTML = '';
      var round = this._round;
      if (!round) return;

      var root = el('div', 'bb-root');

      /* compact say-row: Bramble + his line + the berry basket */
      var say = el('div', 'bb-say');
      var bram = el('div'); bram.innerHTML = brambleSVG();
      var fooled = (this._phase === 'verified' && !Core.isCorrect(round, this._committed));
      if (fooled) { var bel = bram.querySelector('.bb-bramble'); if (bel) bel.classList.add('fooled'); }
      var line = el('p', 'bb-line');
      line.setAttribute('aria-live', 'polite');
      line.textContent = this._lineForPhase();
      if (fooled || (this._phase === 'verified' && round.cog === 'same')) line.classList.add('miss');
      var bask = el('div'); bask.innerHTML = basketSVG(this._berries);
      say.append(bram, line, bask);
      root.appendChild(say);

      /* the two containers */
      var svgWrap = el('div'); svgWrap.style.width = '100%';
      var vA = vesselSVG('A', round.A, '#1E9E86');
      var vB = vesselSVG('B', round.B, '#37B79E');
      svgWrap.innerHTML =
        '<svg class="bb-stage-svg" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" aria-label="' + txt('ariaStage') + '">' +
        '<line x1="6" y1="' + BASE + '" x2="' + (VW - 6) + '" y2="' + BASE + '" stroke="#D8C7A8" stroke-width="3"/>' +
        vA.markup + vB.markup + spillSVG('A') + spillSVG('B') + sparkleSVG('B') +
        '</svg>';
      root.appendChild(svgWrap);

      if (this._phase === 'predict' || this._phase === 'describe') root.appendChild(this._choicesEl(round));

      stage.appendChild(root);
      this._stageRefs = {
        liqA: document.getElementById(vA.liqId), liqB: document.getElementById(vB.liqId),
        spillB: document.getElementById('bbspill-B'), spark: document.getElementById('bbspark-B'),
        line: line
      };
      if (this._reduceMotion()) { var sv = svgWrap.querySelector('.bb-stage-svg'); if (sv) sv.classList.add('bb-no-motion'); }
    },

    _lineForPhase: function () {
      var round = this._round;
      if (this._phase === 'predict') {
        if (round.cog === 'fit') return txt('brambleFit');
        if (round.cog === 'clearcut') return txt('brambleClear');
        return txt('brambleTricky');
      }
      if (this._phase === 'pouring') return txt('pouring');
      if (this._phase === 'describe') return txt('describe');
      if (this._phase === 'verified' || this._phase === 'resolved') {
        var correct = Core.isCorrect(round, this._committed);
        if (round.cog === 'same') return correct ? txt('rightSame') : txt('missSame');
        if (round.cog === 'fit') {
          if (correct) return txt('rightYes');
          return Core.trueComparison(round) === 'OVERFLOWS' ? txt('missFit') : txt('missFitOver');
        }
        if (correct) return txt('rightYes');
        var truth = Core.trueComparison(round);
        var more = truth === 'A_MORE' ? round.A : round.B;
        return (more.drawnWidth >= more.drawnHeight) ? txt('missWide') : txt('missTall');
      }
      return '';
    },

    _choicesEl: function (round) {
      var self = this;
      var wrap = el('div', 'bb-choices');
      var opts = Core.options(round);
      opts.forEach(function (opt) {
        var b = el('button', 'bb-choice'); b.type = 'button';
        var label, dot;
        if (opt === 'A_MORE') { label = txt('leftMore'); dot = '<span class="bb-dot" style="background:#1E9E86"></span>'; }
        else if (opt === 'B_MORE') { label = txt('rightMore'); dot = '<span class="bb-dot" style="background:#37B79E"></span>'; }
        else if (opt === 'SAME') { label = txt('same'); dot = '<span class="bb-dot eq">=</span>'; }
        else if (opt === 'FITS') { label = txt('fits'); dot = '<span class="bb-dot" style="background:#1E9E86"></span>'; b.classList.add('wide'); }
        else { label = txt('overflows'); dot = '<span class="bb-dot" style="background:#F2784B"></span>'; b.classList.add('wide'); }
        b.innerHTML = dot + '<span>' + label + '</span>';
        b.setAttribute('aria-label', label);
        b.addEventListener('click', function () {
          if (self._phase === 'predict') self._onPredict(opt);
          else if (self._phase === 'describe') self._onDescribe(opt);
        });
        wrap.appendChild(b);
      });
      return wrap;
    },

    _onPredict: function (choice) {
      if (this._phase !== 'predict') return;
      this._committed = Core.commitPrediction(this._round, choice);
      this._phase = 'pouring';
      this._api.sound && this._api.sound(620);
      this.render();
      this._animatePour();
    },

    _animatePour: function () {
      var self = this, round = this._round, tok = this._token;
      var res = Core.playPour(round, this._committed);   /* throws if not committed — never here */
      var targetB = (res.pour === 'a-leaves-room-in-b') ? 0.55 : (res.pour === 'fits' ? 0.8 : 1.0);
      var overflow = (res.pour === 'a-overflows-b' || res.pour === 'overflows');
      var exact = (res.pour === 'exact-fill');
      var refs = this._stageRefs || {};
      var stale = function () { return self._token !== tok; };   /* round changed under us */
      function setK(rect, k) {
        if (rect) rect.setAttribute('transform', 'translate(0 ' + BASE + ') scale(1 ' + k + ') translate(0 ' + (-BASE) + ')');
      }
      function finish() {
        if (stale()) return;
        self._phase = 'verified';
        self._berries += 1;
        self._api.announce && self._api.announce(self._lineForPhase());
        self.render();
        var r2 = self._stageRefs || {};
        setK(r2.liqA, 0); setK(r2.liqB, targetB);
        if (r2.spillB) r2.spillB.setAttribute('opacity', overflow ? '1' : '0');
        if (r2.spark) r2.spark.setAttribute('opacity', exact ? '1' : '0');
        self._api.sound && self._api.sound(overflow ? 360 : 860);
        if (round.cog === 'describe') setTimeout(function () { if (!stale()) self._toDescribe(); }, self._reduceMotion() ? 0 : 1100);
        else self._resolve();
      }
      if (this._reduceMotion()) { finish(); return; }
      requestAnimationFrame(function () {
        if (stale()) return;
        setK(refs.liqA, 1);
        setTimeout(function () {
          if (stale()) return;
          setK(refs.liqA, 0); setK(refs.liqB, targetB);
          if (refs.spillB) refs.spillB.setAttribute('opacity', overflow ? '1' : '0');
          if (refs.spark) refs.spark.setAttribute('opacity', exact ? '1' : '0');
          setTimeout(finish, 560);
        }, 480);
      });
    },

    _toDescribe: function () { this._phase = 'describe'; this.render(); },

    _onDescribe: function (choice) {
      if (this._phase !== 'describe') return;
      this._describeChoice = choice;
      var ok = choice === Core.trueComparison(this._round);
      if (this._stageRefs && this._stageRefs.line) {
        this._stageRefs.line.textContent = ok ? txt('describeYes') : txt('describeNo');
        this._stageRefs.line.classList.toggle('miss', !ok);
      }
      var self = this, tok = this._token;
      setTimeout(function () { if (self._token === tok) self._resolve(); }, self._reduceMotion() ? 0 : 700);
    },

    _resolve: function () {
      this._resolved = true;
      this._phase = 'resolved';
      if (this._app) this._app.classList.add('bramble-resolved');   /* reveals the shell Check */
      if (this._stageRefs && this._stageRefs.line) this._stageRefs.line.setAttribute('title', txt('poured'));
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.BrambleActivity = BrambleActivity;

}(typeof window !== 'undefined' ? window : this));
