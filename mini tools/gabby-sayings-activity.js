/* =====================================================================
   GABBY'S FUNNY SAYINGS — ACTIVITY  (gabby-sayings-activity.js)
   ---------------------------------------------------------------------
   CCSS L.3.5.a — literal vs figurative meaning (idioms). Gabby the goose loves
   funny sayings; the child reads an idiom and taps what it REALLY means.
   Validity DERIVED by idiom-meaning-core.js (the 'correct' figurative card; the
   obvious foil is the 'literal' reading, which echoes the idiom's words).
   answerType:'state' tap-a-card + shell Check; cards shuffle. Text + SVG char
   stub. No timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.IdiomMeaningCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOLD: '#E8A53A' };
  var LANG = 'en';

  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG, rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.lang = (LANG === 'fr' ? 'fr-FR' : LANG === 'de' ? 'de-DE' : 'en-US'); u.rate = 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function gooseSVG() {
    return '<svg class="gfs-goose-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'fr' ? 'Gabby l’oie' : LANG === 'de' ? 'Gabby die Gans' : 'Gabby the goose') + '">' +
      '<ellipse cx="46" cy="64" rx="22" ry="18" fill="#FFFDF6"/>' +                /* body */
      '<path d="M62 60 q18 -2 14 -22 q-2 -16 -14 -10 q6 8 0 18 q-3 8 0 14 Z" fill="#FFFDF6"/>' + /* long neck */
      '<circle cx="70" cy="32" r="9" fill="#FFFDF6"/>' +                            /* head */
      '<circle cx="72" cy="30" r="2.2" fill="#2A2A35"/>' +                          /* eye */
      '<path d="M78 32 q9 0 9 4 q-9 2 -9 -1 Z" fill="#F2A03B"/>' +                  /* beak */
      '<path d="M24 66 q-10 4 -4 12 q8 0 10 -8 Z" fill="#E4E0D2"/>' +              /* wing/tail */
      '</svg>';
  }

  global.GabbySayingsActivity = {
    id: 'gabby-sayings-activity',

    strings: {
      title: { en: "Gabby's Funny Sayings", de: 'Gabbys Redewendungen', fr: 'Les drôles d’expressions de Gabby' },
      prompt: { en: 'What does the saying really mean?', de: 'Was bedeutet die Redewendung wirklich?', fr: 'Que veut vraiment dire cette expression ?' },
      gabbyIntro: { en: 'Sayings are tricky — what does this one REALLY mean?', de: 'Schnatter! Manche Sätze meinen etwas ganz anderes, als sie sagen.', fr: 'Coin coin ! Certaines expressions ne veulent pas dire ce qu’elles disent…' },
      theAsk: { en: 'Tap the real meaning.', de: 'Tippe die echte Bedeutung an.', fr: 'Tape le vrai sens.' },
      hintPick: { en: 'It does not mean the words exactly — tap the real meaning!', de: 'Es meint nicht genau die Wörter – tippe die echte Bedeutung an!', fr: 'Ce n’est pas le sens des mots exactement — tape le vrai sens !' },
      hintWrong: { en: "That is what the words say, but not what it means — think again.", de: 'Das sagen die Wörter, aber so ist es nicht gemeint – denk noch mal nach.', fr: 'Ça, c’est ce que disent les mots, mais pas ce que ça veut dire — réfléchis encore.' },
      win: { en: 'Yes! That is what it really means. 🪿', de: 'Ja! Genau das bedeutet es wirklich. 🪿', fr: 'Oui ! C’est bien ce que ça veut dire. 🪿' }
    },
    defaults: {},

    init: function (api) {
      this.api = api; LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._cards = null; this._spoke = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null; this._spoke = false;
      this._cards = shuffle(this.view.choices.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'gfs-wrap'); var root = api.el('div', 'gfs-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'gfs-row');
      var goose = api.el('div', 'gfs-goose'); goose.innerHTML = gooseSVG(); row.appendChild(goose);
      var say = api.el('div', 'gfs-say'); say.textContent = api.t('gabbyIntro'); row.appendChild(say);
      root.appendChild(row);

      var sent = api.el('div', 'gfs-sent');
      var txt = api.el('span', 'gfs-senttxt'); txt.textContent = v.sentence; sent.appendChild(txt);
      var sp = api.el('button', 'gfs-spk'); sp.type = 'button'; sp.setAttribute('aria-label', LANG === 'fr' ? 'écouter l’expression' : LANG === 'de' ? 'die Redewendung anhören' : 'hear the saying'); sp.textContent = '🔊';
      sp.addEventListener('click', function () { speak(v.sentence); }); sent.appendChild(sp);
      root.appendChild(sent);

      var ask = api.el('div', 'gfs-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var opts = api.el('div', 'gfs-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'gfs-opt' + (self.sel === o.id ? ' gfs-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id); b.setAttribute('aria-label', o.text);
        b.textContent = o.text;
        b.addEventListener('click', function () { self._tap(o.id, o.text); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(v.sentence); }, 320); }
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
      fetch('/mini-tools/gabby-sayings-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[gabby-sayings] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.gfs-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.gfs-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:stretch;gap:clamp(4px,1.2vw,8px);background:linear-gradient(180deg,#FBF3E4,#EDE6DA);border-radius:20px;padding:clamp(7px,1.7vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(160,120,60,.08);}'
        + '.gfs-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.gfs-goose{width:clamp(40px,8.5vw,52px);flex:0 0 auto;}.gfs-goose-svg{width:100%;height:auto;display:block;}'
        + '.gfs-say{background:#fff;border:2px solid rgba(160,120,60,.22);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';max-width:80%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.gfs-sent{display:flex;align-items:center;gap:8px;background:#FFFDF6;border:2px solid ' + C.GOLD + ';border-radius:13px;padding:8px 12px;}'
        + '.gfs-senttxt{flex:1;min-width:0;font:700 clamp(14px,3.5vw,17px)/1.3 "Nunito",sans-serif;color:' + C.INK + ';font-style:italic;}'
        + '.gfs-spk{flex:0 0 auto;width:34px;height:34px;border-radius:10px;border:0;background:#EAF2EE;font-size:17px;cursor:pointer;touch-action:manipulation;}'
        + '.gfs-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.gfs-opts{display:flex;flex-direction:column;gap:clamp(4px,1vw,6px);}'
        + '.gfs-opt{text-align:left;min-height:46px;padding:8px 13px;border-radius:13px;border:2px solid rgba(20,107,94,.22);background:#fff;color:' + C.INK + ';font:700 clamp(13px,3.2vw,15px)/1.25 "Nunito",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.gfs-opt.gfs-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;}'
        + '.gfs-opt:active{transform:translateY(1px);}'
        + '.gfs-spk:focus-visible,.gfs-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.gfs-root{gap:clamp(3px,0.9vw,6px);}.gfs-goose{width:clamp(38px,7vw,46px);}.gfs-opt{min-height:44px;padding:7px 12px;}}'
        + '@media (max-height:700px){.gfs-root{gap:4px;padding:9px;}.gfs-goose{width:clamp(36px,6.5vw,42px);}.gfs-sent{padding:6px 11px;}.gfs-senttxt{font-size:14px;}.gfs-opt{min-height:44px;padding:6px 11px;font-size:13px;}}'
        + '@media (max-height:640px){.gfs-root{gap:3px;padding:7px;}.gfs-row{display:none;}.gfs-sent{padding:5px 10px;}.gfs-senttxt{font-size:13px;}.gfs-opt{min-height:44px;padding:5px 10px;font-size:12.5px;line-height:1.18;}}'
        + '@media (max-width:380px){.gfs-senttxt{font-size:13.5px;}.gfs-opt{font-size:13px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-gabby-sayings', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'gabby-sayings.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return Core.grade(round, tool.sel); },
        hintKey: function (tool) { return tool.sel != null ? 'hintWrong' : 'hintPick'; }
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
