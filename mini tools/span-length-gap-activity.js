/* =====================================================================
   SPAN'S LENGTH GAP — ACTIVITY  (span-length-gap-activity.js)
   ---------------------------------------------------------------------
   CCSS 2.MD.A.4 — how much longer is one object than another. Span the inchworm
   shows two bars of different length; the child reads both and types the gap on
   the shell keypad. Validity DERIVED by length-gap-core.js (answer = aLen − bLen).
   answerType:'number' (shell renders the keypad; this tool's stage = the two
   proportional bars + question). On correct, the gap reveals. Drawn bars only —
   no image-library, no audio dependency. No timer/score/streak. 0 lines to any
   core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.LengthGapCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GREEN: '#2FA56A' };
  var MAXLEN = 20;
  var LANG = 'en';
  function interp(t, args) { return String(t || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? args[k] : m; }); }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  /* per-noun German label forms (the labels render as bar names AND inside the
     question, so German needs the definite-article nominative per noun). EN → bare label. */
  var LABEL_L10N = {
    'ribbon': { name: 'Band', nom: 'das Band' },
    'string': { name: 'Schnur', nom: 'die Schnur' },
    'snake': { name: 'Schlange', nom: 'die Schlange' },
    'worm': { name: 'Wurm', nom: 'der Wurm' },
    'pencil': { name: 'Bleistift', nom: 'der Bleistift' },
    'crayon': { name: 'Buntstift', nom: 'der Buntstift' },
    'rope': { name: 'Seil', nom: 'das Seil' },
    'cord': { name: 'Kordel', nom: 'die Kordel' },
    'scarf': { name: 'Schal', nom: 'der Schal' },
    'belt': { name: 'Gürtel', nom: 'der Gürtel' },
    'leaf': { name: 'Blatt', nom: 'das Blatt' },
    'seed': { name: 'Samen', nom: 'der Samen' },
    'blue bar': { name: 'blauer Balken', nom: 'der blaue Balken' },
    'red bar': { name: 'roter Balken', nom: 'der rote Balken' },
    'branch': { name: 'Ast', nom: 'der Ast' },
    'twig': { name: 'Zweig', nom: 'der Zweig' }
  };
  function lblName(label) { return (LANG === 'de' && LABEL_L10N[label]) ? LABEL_L10N[label].name : label; }
  function lblNom(label) { return (LANG === 'de' && LABEL_L10N[label]) ? LABEL_L10N[label].nom : label; }

  function inchwormSVG(api) {
    return '<svg class="slg-worm-svg" viewBox="0 0 100 100" role="img" aria-label="' + (api && api.t ? api.t('spanName') : 'Span the inchworm') + '">' +
      '<path d="M18 66 q8 -16 16 0 q8 16 16 0 q8 -16 16 0" fill="none" stroke="#9ACD5E" stroke-width="11" stroke-linecap="round"/>' +
      '<circle cx="72" cy="58" r="10" fill="#B6E081"/>' +
      '<circle cx="75" cy="56" r="2.2" fill="#2A2A35"/>' +
      '<path d="M70 48 l-2 -6 M76 48 l2 -6" stroke="#6B9A3F" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M71 63 q4 2 7 0" stroke="#6B9A3F" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '</svg>';
  }

  global.SpanLengthGapActivity = {
    id: 'span-length-gap-activity',

    strings: {
      title: { en: "Span's Length Gap", de: 'Wie viel länger?' },
      instruction: { en: 'Read both lengths, then type how much longer the longer one is.', de: 'Lies beide Längen und tippe dann ein, wie viel länger die längere ist.' },
      prompt: { en: 'Type how much longer it is.', de: 'Tippe ein, wie viel länger die längere ist.' },
      spanIntro: { en: 'I measure the gap — how much longer is the long one?', de: 'Ich messe den Unterschied – wie viel länger ist der längere?' },
      hintAdd: { en: 'Find the difference: take the shorter length from the longer one.', de: 'Finde den Unterschied: Ziehe die kürzere Länge von der längeren ab.' },
      win: { en: 'Yes! That is the length gap. 🐛', de: 'Ja! Das ist der Längenunterschied. 🐛' },
      spanName: { en: 'Span the inchworm', de: 'Span, die Spannerraupe' },
      qAsk: { en: 'How much longer is the {a} than the {b}?', de: 'Wie viel länger ist {a} als {b}?' },
      qSolved: { en: 'The {a} is {n} {unit} longer! ✓', de: '{a} ist {n} {unit} länger! ✓' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.solved = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) { this.round = round; this.view = Core.childView(round); this.solved = false; },

    _barRow: function (label, len, unit, cls) {
      var api = this.api, row = api.el('div', 'slg-barrow');
      var nm = api.el('div', 'slg-name'); nm.textContent = lblName(label); row.appendChild(nm);
      var track = api.el('div', 'slg-track');
      var bar = api.el('div', 'slg-bar ' + cls); bar.style.width = Math.max(12, (len / MAXLEN) * 100) + '%';
      var val = api.el('span', 'slg-val'); val.textContent = len + ' ' + unit; bar.appendChild(val);
      track.appendChild(bar); row.appendChild(track);
      return row;
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'slg-wrap'); var root = api.el('div', 'slg-root');
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var v = this.view;

      var row = api.el('div', 'slg-row');
      var worm = api.el('div', 'slg-worm'); worm.innerHTML = inchwormSVG(api); row.appendChild(worm);
      var say = api.el('div', 'slg-say'); say.textContent = api.t('spanIntro'); row.appendChild(say);
      root.appendChild(row);

      var bars = api.el('div', 'slg-bars');
      bars.appendChild(this._barRow(v.aLabel, v.aLen, v.unit, 'slg-a'));
      bars.appendChild(this._barRow(v.bLabel, v.bLen, v.unit, 'slg-b'));
      root.appendChild(bars);

      var q = api.el('div', 'slg-q' + (this.solved ? ' slg-solved' : ''));
      q.textContent = this.solved
        ? interp(api.t('qSolved'), { a: (LANG === 'de' ? cap(lblNom(v.aLabel)) : v.aLabel), n: Core.answerValue(this.round), unit: v.unit })
        : interp(api.t('qAsk'), { a: (LANG === 'de' ? lblNom(v.aLabel) : v.aLabel), b: (LANG === 'de' ? lblNom(v.bLabel) : v.bLabel) });
      root.appendChild(q);

      wrap.appendChild(root); stage.appendChild(wrap);
    },

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
      fetch('/mini-tools/span-length-gap-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[span-length-gap] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.slg-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,520px);margin:0 auto;}'
        + '.slg-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:stretch;gap:clamp(9px,2.2vw,14px);background:linear-gradient(180deg,#FBF3E4,#EDF3E6);border-radius:20px;padding:clamp(11px,2.6vw,18px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(100,150,80,.1);}'
        + '.slg-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.slg-worm{width:clamp(44px,9vw,56px);flex:0 0 auto;}.slg-worm-svg{width:100%;height:auto;display:block;}'
        + '.slg-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:74%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.slg-bars{display:flex;flex-direction:column;gap:clamp(8px,2vw,12px);width:100%;}'
        + '.slg-barrow{display:flex;align-items:center;gap:8px;}'
        + '.slg-name{flex:0 0 auto;width:clamp(58px,16vw,82px);text-align:right;font:800 clamp(12px,3vw,15px)/1.1 "Baloo 2",sans-serif;color:' + C.INK + ';}'
        + '.slg-track{flex:1 1 auto;background:#EFece2;border-radius:9px;padding:3px;}'
        + '.slg-bar{height:clamp(26px,6vw,34px);border-radius:7px;display:flex;align-items:center;justify-content:flex-end;padding-right:8px;box-shadow:inset 0 -2px 0 rgba(0,0,0,.08);}'
        + '.slg-bar.slg-a{background:linear-gradient(180deg,#F2784B,#E0653A);}'
        + '.slg-bar.slg-b{background:linear-gradient(180deg,#3FB07E,#2E9268);}'
        + '.slg-val{font:800 clamp(12px,3vw,15px)/1 "Baloo 2",sans-serif;color:#fff;text-shadow:0 1px 1px rgba(0,0,0,.18);}'
        + '.slg-q{text-align:center;font:800 clamp(14px,3.6vw,17px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.slg-q.slg-solved{color:' + C.GREEN + ';}'
        + '@media (max-height:920px){.slg-row{display:none;}.slg-root{gap:clamp(7px,1.7vw,11px);padding:clamp(10px,2.2vw,14px);}.slg-bar{height:clamp(24px,5vw,30px);}}'
        + '@media (max-height:700px){.slg-root{gap:7px;padding:11px;}.slg-bars{gap:8px;}.slg-bar{height:26px;}.slg-q{font-size:15px;}}'
        + '@media (max-height:640px){.slg-root{gap:5px;padding:8px;}.slg-bars{gap:6px;}.slg-bar{height:21px;}.slg-q{font-size:13px;line-height:1.12;}.slg-name{font-size:11px;}}'
        + '@media (max-width:380px){.slg-name{width:52px;font-size:11px;}.slg-q{font-size:13px;line-height:1.12;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-span-length-gap', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'span-length-gap.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'number', answerMin: 0, answerMax: 20,
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool, answer) { var ok = Core.grade(round, answer); if (ok) { tool.solved = true; tool.render(); } return ok; },
        hintKey: function () { return 'hintAdd'; }
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
