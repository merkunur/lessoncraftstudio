/* =====================================================================
   OLIVE'S KIND-OF TREE — ACTIVITY  (olive-kind-of-activity.js)
   ---------------------------------------------------------------------
   CCSS L.1.5.b — define words by category & key attributes. Olive the owl: see
   a picture + an attribute clue, tap the CATEGORY it belongs to. Validity
   DERIVED by category-define-core.js (the choice whose word === the category).
   answerType:'state' tap-a-word + shell Check; the picture has a 🔊. Per-pass
   reshuffle. Picture from the image library; SVG char stub. No timer/score/
   streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.CategoryDefineCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOLD: '#E8A53A' };
  var LANG = 'en';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function imgUrl(t) { return '/image-library-webp/themes/' + t.themeDir + '/' + t.noun + '@2x.webp'; }
  function speak(word) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: word, lang: LANG, rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(word); u.rate = 0.95; u.lang = LANG === 'de' ? 'de-DE' : 'en-US'; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function owlSVG() {
    return '<svg class="okt-owl-svg" viewBox="0 0 100 100" role="img" aria-label="Olive the owl">' +
      '<path d="M28 30 L40 22 L40 40 Z" fill="#8A6A3A"/><path d="M72 30 L60 22 L60 40 Z" fill="#8A6A3A"/>' +   /* ear tufts */
      '<ellipse cx="50" cy="56" rx="27" ry="28" fill="#A6803F"/>' +                /* body */
      '<ellipse cx="50" cy="64" rx="16" ry="18" fill="#E0C794"/>' +               /* belly */
      '<circle cx="40" cy="46" r="9" fill="#FFFDF6"/><circle cx="60" cy="46" r="9" fill="#FFFDF6"/>' +
      '<circle cx="40" cy="46" r="4" fill="#2A2A35"/><circle cx="60" cy="46" r="4" fill="#2A2A35"/>' +
      '<path d="M46 52 L54 52 L50 58 Z" fill="#F2A03B"/>' +                         /* beak */
      '</svg>';
  }

  global.OliveKindOfActivity = {
    id: 'olive-kind-of-activity',

    strings: {
      title: { en: "Olive's Kind-Of Tree", de: 'Olives Oberbegriff-Baum' },
      prompt: { en: 'What kind of thing is it?', de: 'Was für ein Ding ist das?' },
      oliveIntro: { en: 'Read the clue — what KIND of thing is this?', de: 'Lies den Tipp – was für ein Ding ist das?' },
      clueLab: { en: 'Clue:', de: 'Tipp:' },
      theAsk: { en: 'Tap the group it belongs to.', de: 'Tippe auf die Gruppe, zu der es gehört.' },
      hintPick: { en: 'Read the clue, then tap a group!', de: 'Lies den Tipp und tippe dann auf eine Gruppe!' },
      hintWrong: { en: "Not that group — read the clue once more.", de: 'Nicht diese Gruppe – lies den Tipp noch einmal.' },
      win: { en: 'Yes! You found its group. 🦉', de: 'Ja! Du hast die richtige Gruppe gefunden. 🦉' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
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
      var wrap = api.el('div', 'okt-wrap'); var root = api.el('div', 'okt-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;
      var dispWord = (this.round.target && this.round.target.label) || v.target.noun;

      var row = api.el('div', 'okt-row');
      var owl = api.el('div', 'okt-owl'); owl.innerHTML = owlSVG(); row.appendChild(owl);
      var say = api.el('div', 'okt-say'); say.textContent = api.t('oliveIntro'); row.appendChild(say);
      root.appendChild(row);

      var mid = api.el('div', 'okt-mid');
      var pic = api.el('button', 'okt-pic'); pic.type = 'button'; pic.setAttribute('aria-label', LANG === 'de' ? (dispWord + ' anhören') : ('hear ' + dispWord));
      pic.innerHTML = '<img class="okt-img" src="' + imgUrl(v.target) + '" alt="' + esc(dispWord) + '" onerror="this.style.visibility=\'hidden\'"><span class="okt-spk">🔊</span>';
      pic.addEventListener('click', function () { speak(dispWord); });
      mid.appendChild(pic);
      var clue = api.el('div', 'okt-clue');
      var clab = api.el('span', 'okt-cluelab'); clab.textContent = api.t('clueLab'); clue.appendChild(clab);
      var ctxt = api.el('span', 'okt-cluetxt'); ctxt.textContent = v.clue; clue.appendChild(ctxt);
      mid.appendChild(clue);
      root.appendChild(mid);

      var ask = api.el('div', 'okt-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var opts = api.el('div', 'okt-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'okt-opt' + (self.sel === o.id ? ' okt-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id); b.setAttribute('aria-label', o.word);
        b.textContent = o.word;
        b.addEventListener('click', function () { self._tap(o.id, o.word); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(dispWord); }, 320); }
    },

    _tap: function (id, word) {
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(540); speak(word); this.render();
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
      fetch('/mini-tools/olive-kind-of-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[olive-kind-of] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.okt-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,540px);margin:0 auto;}'
        + '.okt-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,11px);background:linear-gradient(180deg,#FBF3E4,#EAF0E2);border-radius:20px;padding:clamp(8px,2vw,14px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(120,140,60,.08);}'
        + '.okt-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.okt-owl{width:clamp(42px,9vw,54px);flex:0 0 auto;}.okt-owl-svg{width:100%;height:auto;display:block;}'
        + '.okt-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';max-width:80%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.okt-mid{display:flex;align-items:center;gap:clamp(8px,2.4vw,16px);justify-content:center;flex-wrap:wrap;}'
        + '.okt-pic{position:relative;border-radius:16px;border:3px solid ' + C.GOLD + ';background:#FFFDF6;padding:clamp(5px,1.4vw,9px);cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.okt-img{width:clamp(62px,18vw,100px);height:clamp(62px,18vw,100px);object-fit:contain;display:block;}'
        + '.okt-spk{position:absolute;right:3px;bottom:3px;font-size:15px;background:#EAF2EE;border-radius:7px;padding:0 4px;}'
        + '.okt-clue{max-width:200px;background:#FFFDF6;border:2px solid ' + C.GOLD + ';border-radius:13px;padding:7px 11px;}'
        + '.okt-cluelab{font:800 clamp(10px,2.5vw,12px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';text-transform:uppercase;letter-spacing:.04em;margin-right:5px;}'
        + '.okt-cluetxt{font:700 clamp(13px,3.4vw,16px)/1.3 "Nunito",sans-serif;color:' + C.INK + ';}'
        + '.okt-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.okt-opts{display:flex;flex-wrap:wrap;gap:clamp(7px,2vw,12px);justify-content:center;}'
        + '.okt-opt{min-width:clamp(74px,22vw,110px);min-height:50px;padding:10px 16px;border-radius:14px;border:2px solid rgba(20,107,94,.24);background:#fff;color:' + C.T + ';font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.okt-opt.okt-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.okt-opt:active{transform:translateY(1px);}'
        + '.okt-pic:focus-visible,.okt-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.okt-root{gap:clamp(4px,1.1vw,8px);}.okt-owl{width:clamp(40px,7vw,48px);}.okt-img{width:clamp(56px,15vw,84px);height:clamp(56px,15vw,84px);}.okt-opt{min-height:48px;}}'
        + '@media (max-height:700px){.okt-root{gap:5px;padding:10px;}.okt-owl{width:clamp(38px,6.5vw,44px);}.okt-img{width:clamp(52px,13vw,70px);height:clamp(52px,13vw,70px);}.okt-cluetxt{font-size:14px;}.okt-opt{min-height:46px;padding:8px 14px;font-size:17px;}}'
        + '@media (max-height:640px){.okt-root{gap:4px;padding:8px;}.okt-row{display:none;}.okt-img{width:clamp(48px,13vw,60px);height:clamp(48px,13vw,60px);}.okt-opt{min-height:44px;font-size:16px;}}'
        + '@media (max-width:380px){.okt-opt{min-width:64px;font-size:16px;}.okt-img{width:48px;height:48px;}.okt-clue{max-width:170px;padding:5px 9px;}.okt-cluetxt{font-size:13px;line-height:1.2;}.okt-root{gap:4px;}.okt-mid{gap:6px;}.okt-opts{gap:6px;}.okt-ask{font-size:11px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-olive-kind-of', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'olive-kind-of.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
