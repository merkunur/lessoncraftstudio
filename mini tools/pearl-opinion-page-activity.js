/* =====================================================================
   PEARL'S OPINION PAGE — ACTIVITY  (pearl-opinion-page-activity.js)
   ---------------------------------------------------------------------
   CCSS RI.2.8 — how REASONS support a point. Pearl the seal writes the
   opinion page; the child reads a POINT (the author's claim) and taps the
   card that BACKS IT UP with a real reason — not a circular restatement, not
   an off-topic fact. Validity DERIVED by reason-support-core.js (the card
   tagged `reason`; position shuffled; the restatement echoes the claim so a
   "most-like-the-claim" tap reliably misses). answerType:'state' → tap a
   card, shell Check grades it; a wrong tap gives a DIFFUSE nudge. Per-pass
   reshuffle (§A.13.60). Text + SVG char stub (CA5 later). No timer/score/
   streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.ReasonSupportCore;
  var LANG = 'en';
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG, rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; u.lang = (LANG === 'fr' ? 'fr-FR' : LANG === 'de' ? 'de-DE' : LANG === 'es' ? 'es-MX' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function pearlSVG(mood) {
    var happy = mood === 'happy';
    var eyes = happy ? '<path d="M40 46 q3 -4 6 0 M54 46 q3 -4 6 0" stroke="#2A2A35" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
      : '<circle cx="43" cy="47" r="2.8" fill="#2A2A35"/><circle cx="57" cy="47" r="2.8" fill="#2A2A35"/>';
    return '<svg class="pop-seal-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'fr' ? 'Pearl le phoque' : LANG === 'de' ? 'Pearl, die Robbe' : LANG === 'es' ? 'Pearl la foca' : 'Pearl the seal') + '">' +
      '<ellipse cx="50" cy="58" rx="28" ry="26" fill="#8FA3B0"/>' +
      '<ellipse cx="24" cy="74" rx="9" ry="5" fill="#7B8E9B" transform="rotate(20 24 74)"/>' +   /* flipper */
      '<ellipse cx="76" cy="74" rx="9" ry="5" fill="#7B8E9B" transform="rotate(-20 76 74)"/>' +
      '<ellipse cx="50" cy="52" rx="18" ry="16" fill="#C2CED6"/>' +   /* face */
      eyes +
      '<ellipse cx="50" cy="58" rx="4" ry="3" fill="#2A2A35"/>' +     /* nose */
      '<path d="M44 60 q6 5 12 0" stroke="#2A2A35" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
      '</svg>';
  }

  global.PearlOpinionPageActivity = {
    id: 'pearl-opinion-page-activity',

    strings: {
      title: { en: "Pearl's Opinion Page", de: 'Pearls Meinungsseite', fr: 'La page d’opinion de Pearl', es: 'La página de opiniones de Pearl' },
      prompt: { en: 'Which reason backs up the point?', de: 'Welcher Grund stützt die Meinung?', fr: 'Quelle raison justifie l’avis ?', es: '¿Cuál razón apoya la opinión?' },
      pearlIntro: { en: 'I made a point! Which card backs it up?', de: 'Ich habe eine Meinung! Welche Karte stützt sie?', fr: 'J’ai donné mon avis ! Quelle carte le justifie ?', es: '¡Di mi opinión! ¿Cuál tarjeta la apoya?' },
      thePoint: { en: 'POINT:', de: 'MEINUNG:', fr: 'L’AVIS :', es: 'OPINIÓN:' },
      theAsk: { en: 'Which reason backs it up?', de: 'Welcher Grund stützt sie?', fr: 'Quelle raison justifie cet avis ?', es: '¿Cuál razón la apoya?' },
      hintPick: { en: 'Tap the reason that backs up the point!', de: 'Tippe auf den Grund, der die Meinung stützt!', fr: 'Tape la raison qui justifie l’avis !', es: '¡Toca la razón que apoya la opinión!' },
      hintWrong: { en: "That doesn't back it up — read the point again.", de: 'Das stützt sie nicht – lies die Meinung noch einmal.', fr: 'Ça ne le justifie pas — relis l’avis.', es: 'Esa no la apoya. Lee la opinión otra vez.' },
      win: { en: 'Yes! That reason backs up the point. 📰', de: 'Ja! Dieser Grund stützt die Meinung. 📰', fr: 'Oui ! Cette raison justifie l’avis. 📰', es: '¡Sí! Esa razón apoya la opinión. 📰' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._opts = null; this._spoke = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null; this._spoke = false;
      this._opts = shuffle(this.view.options.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'pop-wrap'); var root = api.el('div', 'pop-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'pop-row');
      var seal = api.el('div', 'pop-seal'); seal.setAttribute('data-mood', this.sel ? 'happy' : 'idle'); seal.innerHTML = pearlSVG(this.sel ? 'happy' : 'idle'); row.appendChild(seal);
      var say = api.el('div', 'pop-say'); say.textContent = api.t('pearlIntro'); row.appendChild(say);
      root.appendChild(row);

      // the point banner
      var pt = api.el('div', 'pop-point');
      var lab = api.el('span', 'pop-ptlab'); lab.textContent = api.t('thePoint'); pt.appendChild(lab);
      var txt = api.el('span', 'pop-pttxt'); txt.textContent = v.point; pt.appendChild(txt);
      var sp = api.el('button', 'pop-spk'); sp.type = 'button'; sp.setAttribute('aria-label', LANG === 'fr' ? 'écouter l’avis' : LANG === 'de' ? 'Meinung vorlesen' : LANG === 'es' ? 'escuchar la opinión' : 'hear the point'); sp.textContent = '🔊';
      sp.addEventListener('click', function () { speak(v.point); }); pt.appendChild(sp);
      root.appendChild(pt);

      var ask = api.el('div', 'pop-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var opts = api.el('div', 'pop-opts');
      this._opts.forEach(function (o) {
        var b = api.el('button', 'pop-opt' + (self.sel === o.id ? ' pop-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id);
        b.textContent = o.text; b.setAttribute('aria-label', o.text);
        b.addEventListener('click', function () { self._tap(o.id, o.text); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(v.point); }, 320); }
    },

    _tap: function (id, text) {
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(540); speak(text); this.render();
    },

    isCorrect: function () { return Core.grade(this.round, this.sel); },
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
      fetch('/mini-tools/pearl-opinion-page-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[pearl-opinion-page] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.pop-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.pop-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:stretch;gap:clamp(4px,1.2vw,8px);background:linear-gradient(180deg,#FBF3E4,#E6EEF2);border-radius:20px;padding:clamp(7px,1.6vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.pop-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.pop-seal{width:clamp(42px,9.5vw,54px);flex:0 0 auto;}.pop-seal-svg{width:100%;height:auto;display:block;}'
        + '.pop-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:78%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.pop-point{display:flex;align-items:center;gap:8px;background:#FFF;border:2px solid ' + C.GOLD + ';border-radius:13px;padding:8px 12px;}'
        + '.pop-ptlab{flex:0 0 auto;font:800 clamp(10.5px,2.6vw,12px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';letter-spacing:.04em;}'
        + '.pop-pttxt{flex:1;min-width:0;font:800 clamp(13.5px,3.5vw,17px)/1.2 "Baloo 2",sans-serif;color:' + C.INK + ';}'
        + '.pop-spk{flex:0 0 auto;width:34px;height:34px;border-radius:10px;border:0;background:#EAF2EE;font-size:17px;cursor:pointer;touch-action:manipulation;}'
        + '.pop-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.pop-opts{display:flex;flex-direction:column;gap:clamp(5px,1.3vw,7px);}'
        + '.pop-opt{text-align:left;min-height:46px;padding:9px 13px;border-radius:13px;border:2px solid rgba(20,107,94,.22);background:#fff;color:' + C.INK + ';font:700 clamp(12.5px,3.2vw,15px)/1.25 "Nunito",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.pop-opt.pop-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;}'
        + '.pop-opt:active{transform:translateY(1px);}'
        + '.pop-spk:focus-visible,.pop-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.pop-root{gap:clamp(3px,1vw,6px);}.pop-seal{width:clamp(40px,8vw,48px);}.pop-opt{min-height:46px;padding:8px 12px;}}'
        + '@media (max-height:700px){.pop-root{gap:3px;}.pop-seal{width:clamp(38px,7.5vw,44px);}.pop-point{padding:6px 10px;}.pop-pttxt{font-size:14px;}.pop-opt{min-height:44px;padding:7px 11px;font-size:13px;}}'
        + '@media (max-height:640px){.pop-root{gap:2px;padding:6px;}.pop-row{display:none;}.pop-point{padding:5px 9px;}.pop-pttxt{font-size:13px;}.pop-ask{font-size:11.5px;}.pop-opt{min-height:44px;padding:6px 10px;font-size:12.5px;}}'
        + '@media (max-width:380px){.pop-root{gap:3px;padding:7px;}.pop-pttxt{font-size:13.5px;}.pop-opt{font-size:12.5px;}}'
        + '@media (prefers-reduced-motion: reduce){.pop-opt{transition:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-pearl-opinion-page', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'pearl-opinion-page.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return Core.grade(round, tool.sel); },
        hintKey: function (tool) { return tool.sel ? 'hintWrong' : 'hintPick'; }
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
