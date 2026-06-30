/* =====================================================================
   PIP'S ROUND — ACTIVITY  (pips-round-activity.js)
   ---------------------------------------------------------------------
   CCSS K.CC.A.3 (recognition-face): READ a written numeral 0-20 (font-invariant
   / from its spoken name) and deliver to the matching house. The 3rd navigate-
   spatial game. Pip the postal mouse pulls one envelope; the target is presented
   CROSS-FONT (the envelope glyph in a serif ≠ the Baloo-2 house plates → pixels
   don't match even when the number does) + AUDIO (spoken via TTS) — so a non-
   reader CANNOT template-match a glyph; the child must READ the number.

   THE ANTI-CHEATS: the answer channel is the tapped house's NUMERAL (never a
   coordinate); the route is a render-artifact (extends only on a correct
   delivery, pointer-events:none, never drawn); the houses are scattered position
   ↔value-decorrelated with a confusable distractor → a navigation / first-digit
   heuristic lands wrong; a wrong tap leaves the curtain closed + a NON-leaking
   re-read. The reading logic + the SOLVER gauntlet live in mini tools/
   mail-route-core.js (pure). answerType:'state'. Pip + houses + residents =
   SVG/CSS STUBS for CA5 (NO image-library → no 404). No timer/score/streak.
   0 lines to the protected cores + lcs-shell.*.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.MailRouteCore;
  var C = { T: '#146B5E', T2: '#0e4f45', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', GOLD: '#E8A53A', INK: '#2A2A35' };
  var WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
  var WORDS_DE = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn', 'zwanzig'];
  var LANG = 'en';
  function enWord(n) { return WORDS[n | 0] || String(n); }
  function numWord(n) { return (LANG === 'de' ? WORDS_DE : WORDS)[n | 0] || String(n); }
  /* resident names → German, nominative WITH article (the win line „das ist {name}" is gender-safe because the article is baked in). */
  var RESIDENT_DE = { Snail: 'die Schnecke', Fox: 'der Fuchs', Frog: 'der Frosch', Bun: 'das Häschen', Wren: 'der Zaunkönig', Mole: 'der Maulwurf', Hen: 'die Henne', Owl: 'die Eule', Cat: 'die Katze', Duck: 'die Ente', Bee: 'die Biene', Ant: 'die Ameise', Newt: 'der Molch', Toad: 'die Kröte', Pig: 'das Schweinchen' };
  var HOUSECOL = ['#9CC9E8', '#F4C77E', '#B7DDA8', '#E8A9C0', '#C9B6E8', '#9FD9CE'];

  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: String(text), lang: LANG, rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(String(text)); u.rate = .95; u.lang = (LANG === 'de' ? 'de-DE' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }

  function pipSVG(mood) {
    var happy = mood === 'happy';
    return '<svg viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'de' ? 'Pip die Maus' : 'Pip the mouse') + '">'
      + '<circle cx="32" cy="30" r="11" fill="#CDBBA8"/><circle cx="68" cy="30" r="11" fill="#CDBBA8"/>'   // ears
      + '<circle cx="32" cy="30" r="6" fill="#E9CFC0"/><circle cx="68" cy="30" r="6" fill="#E9CFC0"/>'
      + '<circle cx="50" cy="54" r="30" fill="#BBA890"/>'                                                   // head
      + '<circle cx="41" cy="50" r="3.4" fill="#2A2A35"/><circle cx="59" cy="50" r="3.4" fill="#2A2A35"/>'
      + '<ellipse cx="50" cy="60" rx="4" ry="3" fill="#E78FA0"/>'                                           // nose
      + (happy ? '<path d="M43 67 q7 6 14 0" stroke="#7a5c44" stroke-width="3" fill="none" stroke-linecap="round"/>' : '<path d="M45 67 q5 3 10 0" stroke="#7a5c44" stroke-width="2.4" fill="none" stroke-linecap="round"/>')
      + '<rect x="64" y="60" width="20" height="15" rx="3" fill="' + C.CORAL + '" transform="rotate(-12 74 67)"/>'   // satchel/letter
      + '</svg>';
  }
  function residentSVG(col) {
    return '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="22" r="14" fill="' + col + '"/><circle cx="15" cy="20" r="2.4" fill="#2A2A35"/><circle cx="25" cy="20" r="2.4" fill="#2A2A35"/><path d="M15 27 q5 4 10 0" stroke="#2A2A35" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M33 14 q5 -3 7 2" stroke="' + col + '" stroke-width="4" fill="none" stroke-linecap="round"/></svg>';
  }

  global.PipsRoundActivity = {
    id: 'pips-round-activity',
    reward: { id: 'satchel', label: "Pip's Satchel", emoji: '📬' },

    strings: {
      title: { en: "Pip's Round", de: 'Pip bringt die Post' },
      instruction: { en: 'Read the number on the letter, then tap the matching house.', de: 'Lies die Zahl auf dem Brief und tippe dann auf das passende Haus.' },
      prompt: { en: 'Deliver the letter!', de: 'Bring den Brief!' },
      readIt: { en: 'A letter for…', de: 'Ein Brief für …' },
      hearIt: { en: '🔊 Hear the number', de: '🔊 Hör die Zahl' },
      qRead: { en: 'Read the number — tap that house!', de: 'Lies die Zahl – tippe auf das Haus!' },
      qHear: { en: 'Listen, then tap that house!', de: 'Hör zu und tippe auf das Haus!' },
      hint: { en: 'Read the house numbers and find the match.', de: 'Lies die Hausnummern und finde die passende Zahl.' },
      wrong: { en: "That's house {r} — let's find {t}!", de: 'Das ist Haus {r} – wir suchen die {t}!' },
      wrongNoRead: { en: "Not that one — let's find {t}!", de: 'Das ist es nicht – wir suchen die {t}!' },
      win: { en: '{w} — that\'s {name}! Delivered 📬', de: '{w} – das ist {name}! Zugestellt 📬' },
      tapCheck: { en: 'Tap Check! ✓', de: 'Tippe auf Prüfen! ✓' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.cstate = null; this.solved = false; this.solvedCount = 0; this.msg = null; this._seed = 0; this._miss = 0; this._spoken = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.cstate = Core.newState(round); this.solved = false; this.msg = null; this._seed = 0; this._miss = 0; this._spoken = false;
      this._pos = Core.layout(round, this._seed);
    },
    announce: function (s) { if (this.api.announce) this.api.announce(s); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'pr-wrap'); var root = api.el('div', 'pr-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }

      var head = api.el('div', 'pr-head' + (this.solved ? ' pr-head-win' : ''));
      var pip = api.el('span', 'pr-pip'); pip.innerHTML = pipSVG(this.solved ? 'happy' : 'idle');
      var say = api.el('span', 'pr-say'); say.textContent = this.msg || this._question();
      head.appendChild(pip); head.appendChild(say); root.appendChild(head);

      if (this.solved) { this._renderDone(root); wrap.appendChild(root); stage.appendChild(wrap); return; }

      root.appendChild(this._envelope());
      root.appendChild(this._map());

      wrap.appendChild(root); stage.appendChild(wrap);
      if (this.round.present === 'audio' && !this._spoken) { this._spoken = true; var self = this; setTimeout(function () { speak(LANG === 'de' ? ('Ein Brief für die ' + numWord(self.round.targetValue)) : ('A letter for number ' + numWord(self.round.targetValue))); }, 260); }
    },
    _question: function () { return this.api.t(this.round.present === 'audio' ? 'qHear' : 'qRead'); },

    /* ----- the envelope: the CROSS-FONT target glyph (+ audio replay) — NEVER
       a same-font glyph; the muted-safe cross-font fallback is always shown ----- */
    _envelope: function () {
      var self = this, api = this.api, env = api.el('div', 'pr-envelope');
      var lab = api.el('span', 'pr-envlab'); lab.textContent = api.t('readIt'); env.appendChild(lab);
      var glyph = api.el('span', 'pr-target'); glyph.textContent = (this.round.targetValue | 0); env.appendChild(glyph);   // targetFont (cross-font) via CSS
      if (this.round.present === 'audio') {
        var hear = api.el('button', 'pr-hear'); hear.type = 'button'; hear.textContent = api.t('hearIt');
        hear.addEventListener('click', function () { speak(LANG === 'de' ? ('Ein Brief für die ' + numWord(self.round.targetValue)) : ('A letter for number ' + numWord(self.round.targetValue))); });
        env.appendChild(hear);
      }
      return env;
    },

    /* ----- the scattered map: houses positioned by layout (decorrelated); the
       route polyline (pointer-events:none) extends only on a correct delivery ----- */
    _map: function () {
      var self = this, api = this.api, map = api.el('div', 'pr-map');
      // route overlay (drawn on delivery)
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'pr-route'); svg.setAttribute('viewBox', '0 0 100 100'); svg.setAttribute('preserveAspectRatio', 'none');
      map.appendChild(svg); this._routeSvg = svg;

      this.round.houses.forEach(function (h, i) {
        var p = self._pos[i], col = HOUSECOL[i % HOUSECOL.length];
        var btn = api.el('button', 'pr-house' + (self._miss >= 3 && (h.numeral | 0) === (self.round.targetValue | 0) ? ' pr-pulse' : '')); btn.type = 'button';
        btn.style.left = (p.gx * 100) + '%'; btn.style.top = (p.gy * 100) + '%';
        btn.setAttribute('data-hid', h.hid); btn.setAttribute('aria-label', (LANG === 'de' ? 'Hausnummer ' : 'house number ') + h.numeral);
        btn.innerHTML = '<span class="pr-roof" style="border-bottom-color:' + col + '"></span>'
          + '<span class="pr-body" style="background:' + col + '"><span class="pr-window"><span class="pr-curtain"></span></span></span>'
          + '<span class="pr-plate">' + h.numeral + '</span>';
        btn.addEventListener('click', function () { self._deliver(h.hid, btn); });
        map.appendChild(btn);
      });
      return map;
    },

    _deliver: function (hid, btn) {
      if (this.solved) return;
      var r = Core.deliver(this.cstate, hid);
      if (r.matched) { this._win(hid); return; }
      // wrong — curtain stays closed, non-leaking re-read
      this._miss++;
      if (btn) { btn.classList.remove('pr-shake'); void btn.offsetWidth; btn.classList.add('pr-shake'); }
      var t = this.round.targetValue | 0;
      this.msg = (r.readNumeral != null) ? this.api.t('wrong').replace('{r}', r.readNumeral).replace('{t}', t) : this.api.t('wrongNoRead').replace('{t}', t);
      this.api.sound && this.api.sound(330); speak(LANG === 'de' ? ('Such die ' + numWord(t)) : ("let's find " + numWord(t)));
      this.render();
    },
    _win: function (hid) {
      var api = this.api, house = null, idx = -1, self = this;
      this.round.houses.forEach(function (h, i) { if (h.hid === hid) { house = h; idx = i; } });
      this.solved = true;
      if (Core.firstAttemptCorrect(this.cstate)) this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 9);
      var n = house.numeral | 0;
      var nm = (LANG === 'de') ? (RESIDENT_DE[house.resident] || 'ein Freund') : (house.resident || 'a friend');
      this.msg = api.t('win').replace('{w}', numWord(n).charAt(0).toUpperCase() + numWord(n).slice(1)).replace('{name}', nm);
      this.api.sound && this.api.sound(880); this.render(); this.announce(this.msg);
      speak(numWord(n) + (LANG === 'de' ? ' – zugestellt' : ' — delivered'));
    },

    _renderDone: function (root) {
      var api = this.api, n = (this._pool && this._pool.length) || 9, house = null;
      var hid = this.cstate.deliveredHid; this.round.houses.forEach(function (h) { if (h.hid === hid) house = h; });
      var idx = 0; this.round.houses.forEach(function (h, i) { if (h.hid === hid) idx = i; });
      var col = HOUSECOL[idx % HOUSECOL.length];
      var card = api.el('div', 'pr-doorcard');
      card.innerHTML = '<span class="pr-roof pr-roof-big" style="border-bottom-color:' + col + '"></span>'
        + '<span class="pr-body pr-body-big" style="background:' + col + '"><span class="pr-window pr-open"><span class="pr-resident">' + residentSVG(col) + '</span></span></span>'
        + '<span class="pr-plate pr-plate-big">' + (house ? house.numeral : '') + '</span>';
      root.appendChild(card);
      var satchel = api.el('div', 'pr-satchel');
      for (var i = 0; i < n; i++) { var s = api.el('span', 'pr-stamp' + (i < this.solvedCount ? ' pr-stamp-on' : '')); s.textContent = '📬'; satchel.appendChild(s); }
      root.appendChild(satchel);
      var nudge = api.el('div', 'pr-nextnudge'); nudge.textContent = api.t('tapCheck'); root.appendChild(nudge);
    },

    isCorrect: function () { return this.solved; },
    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]); var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n); if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/pips-round-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[pips-round] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.pr-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.pr-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,11px);background:linear-gradient(180deg,#EAF3F7,#FBF3E4);border-radius:20px;padding:clamp(8px,1.8vw,13px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.pr-head{display:flex;align-items:center;gap:7px;justify-content:center;width:100%;}'
        + '.pr-pip{width:clamp(30px,7vw,42px);flex:0 0 auto;}.pr-pip svg{width:100%;height:auto;display:block;}'
        + '.pr-say{font:700 clamp(11.5px,2.9vw,13.5px)/1.2 "Nunito",sans-serif;color:' + C.T + ';text-align:center;}.pr-head-win .pr-say{color:' + C.CORAL2 + ';}'
        /* envelope — the CROSS-FONT target (serif ≠ the Baloo-2 plates) */
        + '.pr-envelope{display:inline-flex;align-items:center;flex-wrap:wrap;justify-content:center;gap:8px 16px;background:#fff;border:2px solid rgba(20,107,94,.2);border-radius:14px;padding:6px 18px;box-shadow:0 2px 0 rgba(20,107,94,.08);}'
        + '.pr-envlab{font:700 clamp(11px,2.7vw,13px)/1 "Nunito",sans-serif;color:#9a8f78;}'
        + '.pr-target{font:700 clamp(30px,8vw,42px)/1 Georgia,"Times New Roman",serif;color:' + C.CORAL2 + ';letter-spacing:.02em;}'
        + '.pr-hear{min-height:38px;padding:0 12px;border-radius:11px;border:2px solid rgba(20,107,94,.25);background:#EAF2EE;color:' + C.T + ';font:700 clamp(11px,2.7vw,13px)/1 "Nunito",sans-serif;cursor:pointer;touch-action:manipulation;}'
        /* the scattered map */
        + '.pr-map{position:relative;width:100%;max-width:clamp(240px,76vw,380px);height:clamp(168px,46vw,212px);margin:0 auto;}'
        + '.pr-route{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:visible;}.pr-route polyline{fill:none;stroke:' + C.T + ';stroke-width:1.4;stroke-linecap:round;stroke-dasharray:200;stroke-dashoffset:0;opacity:.6;animation:prDraw .6s ease both;}@keyframes prDraw{from{stroke-dashoffset:200;}to{stroke-dashoffset:0;}}'
        + '.pr-house{position:absolute;transform:translate(-50%,-50%);min-width:48px;min-height:52px;border:0;background:transparent;padding:0;cursor:pointer;touch-action:manipulation;display:flex;flex-direction:column;align-items:center;z-index:2;}'
        + '.pr-roof{width:0;height:0;border-left:18px solid transparent;border-right:18px solid transparent;border-bottom:13px solid #ccc;}'
        + '.pr-body{position:relative;width:36px;height:30px;border-radius:0 0 5px 5px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 0 rgba(0,0,0,.12);}'
        + '.pr-window{width:18px;height:18px;border-radius:3px;background:#FBF7EF;border:2px solid rgba(0,0,0,.12);overflow:hidden;display:flex;align-items:center;justify-content:center;}'
        + '.pr-curtain{width:100%;height:100%;background:repeating-linear-gradient(90deg,#E8A9C0 0 4px,#D98FAC 4px 8px);}'
        + '.pr-plate{margin-top:2px;min-width:24px;padding:0 5px;border-radius:8px;background:#fff;border:1.5px solid ' + C.T + ';color:' + C.T + ';font:800 clamp(15px,3.8vw,19px)/1.3 "Baloo 2",sans-serif;text-align:center;}'
        + '.pr-house:active{transform:translate(-50%,-50%) scale(.96);}.pr-shake{animation:prShake .32s;}@keyframes prShake{0%,100%{transform:translate(-50%,-50%)}25%{transform:translate(-54%,-50%)}75%{transform:translate(-46%,-50%)}}'
        + '.pr-pulse .pr-body{animation:prPulse 1s ease-in-out 2;}@keyframes prPulse{0%,100%{box-shadow:0 2px 0 rgba(0,0,0,.12);}50%{box-shadow:0 0 0 4px rgba(242,120,75,.4);}}'
        + '.pr-house:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:3px;border-radius:8px;}'
        /* done — the open door + resident */
        + '.pr-doorcard{display:flex;flex-direction:column;align-items:center;}'
        + '.pr-roof-big{border-left-width:30px;border-right-width:30px;border-bottom-width:22px;}'
        + '.pr-body-big{width:60px;height:50px;border-radius:0 0 7px 7px;}.pr-open{width:30px;height:30px;background:#1d3b4a;}.pr-resident{width:30px;height:30px;animation:prWave .8s ease-in-out infinite;}.pr-resident svg{width:100%;height:100%;}@keyframes prWave{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}'
        + '.pr-plate-big{font-size:clamp(20px,5vw,26px);margin-top:4px;}'
        + '.pr-doorcard{display:flex;flex-direction:column;align-items:center;margin-bottom:3px;}'
        + '.pr-satchel{display:flex;gap:3px;flex-wrap:wrap;justify-content:center;margin-top:9px;padding:5px 11px;background:rgba(20,107,94,.06);border-radius:11px;}.pr-stamp{font-size:clamp(14px,3.4vw,18px);filter:grayscale(1) opacity(.4);}.pr-stamp-on{filter:none;}'
        + '.pr-nextnudge{font:800 clamp(13px,3.4vw,16px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';background:#FFF3E9;border-radius:11px;padding:5px 12px;}'
        /* short-height compaction */
        + '@media (max-height:940px){.pr-root{gap:5px;}.pr-envelope{padding:3px 14px;}}'
        + '@media (max-height:720px){.pr-pip{width:30px;}.pr-target{font-size:30px;}}'
        + '@media (max-height:640px){.pr-root{gap:3px;padding:6px;}.pr-pip{width:26px;}.pr-head{gap:4px;}.pr-say{font-size:11px;}.pr-envelope{padding:1px 9px;gap:3px 8px;}.pr-target{font-size:24px;}.pr-hear{min-height:30px;padding:0 7px;font-size:10px;}.pr-map{max-width:clamp(220px,72vw,360px);height:clamp(146px,42vw,196px);}.pr-plate{font-size:15px;}}'
        + '@media (prefers-reduced-motion:reduce){.pr-route polyline,.pr-resident,.pr-pulse .pr-body{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-pips-round', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'pips-round.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function () { return 'hint'; }
      };
    });
  }
  function bandOrder(pool, prev) {
    var byBand = {}; pool.forEach(function (t, i) { (byBand[t.band] = byBand[t.band] || []).push(i); });
    var bands = Object.keys(byBand).sort(function (a, b) { return a - b; }); var out, attempts = 0;
    do { out = []; bands.forEach(function (b) { var g = byBand[b].slice(); for (var i = g.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = g[i]; g[i] = g[j]; g[j] = t; } out = out.concat(g); }); attempts++; } while (prev && out.join(',') === prev.join(',') && attempts < 12 && pool.length > 1);
    return out;
  }

}(typeof window !== 'undefined' ? window : this));
