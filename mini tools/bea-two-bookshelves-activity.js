/* =====================================================================
   BEA'S TWO BOOKSHELVES — ACTIVITY  (bea-two-bookshelves-activity.js)
   ---------------------------------------------------------------------
   CCSS RL.1.5 — tell a STORY book from a FACT book. Bea the bookworm sorts her
   two shelves; the child reads 3 book covers and taps the kind Bea asks for.
   Validity DERIVED by story-fact-core.js (the book whose type === the asked
   kind; childView never exposes type). answerType:'state' tap-a-card + shell
   Check; cards shuffle. Text + SVG art only — no image-library, no audio
   dependency. No timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.StoryFactCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GREEN: '#2FA56A' };
  var COVERS = ['#EAD7AE', '#CDE3D6', '#E6D2E8', '#F6D9C8', '#D7E2F0', '#F3E6B8'];
  var LANG = 'en';

  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'es' ? 'es-MX' : LANG), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.lang = (LANG === 'fr' ? 'fr-FR' : LANG === 'de' ? 'de-DE' : LANG === 'es' ? 'es-MX' : 'en-US'); u.rate = 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function wormSVG() {
    /* es: «oruga» is feminine (agrees with Bea) and matches the 🐛. NOT «ratón de biblioteca»
       (a mouse; an ADULT idiom a 6-year-old doesn't own; masculine → clashes with Bea) and NOT
       «gusano» (masculine + icky MX register). */
    return '<svg class="btb-worm-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'fr' ? 'Bea le ver de livre' : LANG === 'de' ? 'Bea, die Bücherraupe' : LANG === 'es' ? 'Bea, la oruga lectora' : 'Bea the bookworm') + '">' +
      '<path d="M24 70 q8 -14 20 -8 q12 6 22 -2 q12 -8 12 6" fill="none" stroke="#7FB069" stroke-width="11" stroke-linecap="round"/>' +
      '<circle cx="78" cy="58" r="11" fill="#9ACD7A"/>' +
      '<circle cx="75" cy="56" r="2.4" fill="#2A2A35"/><circle cx="82" cy="56" r="2.4" fill="#2A2A35"/>' +
      '<path d="M74 63 q4 3 8 0" stroke="#3F6326" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<path d="M74 48 l-3 -6 M82 48 l3 -6" stroke="#3F6326" stroke-width="2" stroke-linecap="round"/>' +
      '<rect x="40" y="74" width="20" height="14" rx="2" fill="#F2784B"/><line x1="50" y1="74" x2="50" y2="88" stroke="#fff" stroke-width="1.6"/>' +
      '</svg>';
  }

  global.BeaTwoBookshelvesActivity = {
    id: 'bea-two-bookshelves-activity',

    strings: {
      /* es kid pair = «cuento» vs «cosas de verdad».
         ⚠ «historia» is DELIBERATELY absent — it is the Mischform IN THE VOCABULARY: in Spanish it
         means both *History* and *a true account* («la historia de mi abuelo»), so a book «que
         cuenta una historia» could be TRUE. «cuento» is unambiguous and is the SEP / Biblioteca-de-
         Aula word a MX 1.º child already owns.
         ⚠ «documental» is a FILM word in Spanish, not a book — the fr «documentaire» does NOT
         transfer. «libro informativo» is teacher-layer only (6 abstract syllables for a 6-year-old).
         «librero» (the title) is THE MX word for a bookshelf; in Spain it means bookseller. */
      title: { en: "Bea's Two Bookshelves", de: 'Beas zwei Bücherregale', fr: 'Les deux étagères de Bea', es: 'Los dos libreros de Bea' },
      instruction: { en: 'Tap the story book, or the fact book, that Bea asks for.', de: 'Tippe das Geschichtenbuch oder das Sachbuch an, das Bea sucht.', fr: 'Tape le livre d’histoire, ou le livre documentaire, que Bea te demande.', es: 'Toca el libro que Bea te pide: un cuento o cosas de verdad.' },
      promptStory: { en: 'Which book tells a make-believe STORY?', de: 'Welches Buch erzählt eine ausgedachte Geschichte?', fr: 'Quel livre raconte une HISTOIRE inventée ?', es: '¿Qué libro es un cuento?' },
      promptFact: { en: 'Which book gives you real FACTS?', de: 'Welches Buch erklärt dir echte Dinge?', fr: 'Quel livre donne de VRAIES infos ?', es: '¿Qué libro te explica cosas de verdad?' },
      beaIntro: { en: 'Story books tell a tale. Fact books teach real things!', de: 'Geschichten sind ausgedacht. Sachbücher erklären echte Dinge!', fr: 'Les livres d’histoire racontent un conte. Les livres documentaires apprennent de vraies choses !', es: 'Los cuentos son inventados. ¡Los otros te enseñan cosas de verdad!' },
      hintStory: { en: 'A story has made-up characters and a tale. Read the covers!', de: 'Eine Geschichte ist ausgedacht und hat erfundene Figuren. Lies die Buchdeckel genau!', fr: 'Une histoire a des personnages inventés et une aventure. Lis les couvertures !', es: 'Un cuento es inventado y tiene personajes. ¡Lee las portadas!' },
      hintFact: { en: 'A fact book teaches you about real things. Read the covers!', de: 'Ein Sachbuch erklärt dir echte Dinge. Lies die Buchdeckel genau!', fr: 'Un livre documentaire t’apprend de vraies choses. Lis les couvertures !', es: 'Un libro de cosas de verdad te enseña cómo es el mundo. ¡Lee las portadas!' },
      /* es §A.13.54: `win` shows on EVERY round → anchored on «el libro», a fixed masculine noun
         INSIDE the string, agreeing with nothing external (dragones/abejas/máquinas are all «el
         libro»). NEVER swap it for a pronoun — «¡La encontraste!» would break; the explicit noun
         IS the protection. */
      win: { en: 'Yes! You found the right kind of book. 🐛', de: 'Ja! Du hast das richtige Buch gefunden. 🐛', fr: 'Oui ! Tu as trouvé le bon type de livre. 🐛', es: '¡Sí! Encontraste el libro correcto. 🐛' }
    },
    defaults: {},

    init: function (api) {
      this.api = api; LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._cards = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null;
      this._cards = shuffle(this.view.books.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'btb-wrap'); var root = api.el('div', 'btb-root');
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this;

      var row = api.el('div', 'btb-row');
      var worm = api.el('div', 'btb-worm'); worm.innerHTML = wormSVG(); row.appendChild(worm);
      var say = api.el('div', 'btb-say'); say.textContent = api.t('beaIntro'); row.appendChild(say);
      root.appendChild(row);

      var opts = api.el('div', 'btb-opts');
      this._cards.forEach(function (o, n) {
        var b = api.el('button', 'btb-opt' + (self.sel === o.id ? ' btb-sel' : '')); b.type = 'button';
        b.setAttribute('data-id', o.id); b.setAttribute('aria-label', o.title);
        b.style.background = COVERS[(o.id + n) % COVERS.length];
        var sp = api.el('div', 'btb-spine'); b.appendChild(sp);
        var ti = api.el('div', 'btb-title'); ti.textContent = o.title; b.appendChild(ti);
        var bl = api.el('div', 'btb-blurb'); bl.textContent = o.blurb; b.appendChild(bl);
        b.addEventListener('click', function () { self._tap(o.id, o.title); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
    },

    _tap: function (id, title) {
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(540); speak(title); this.render();
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
      fetch('/mini-tools/bea-two-bookshelves-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[bea-two-bookshelves] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.btb-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,580px);margin:0 auto;}'
        + '.btb-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(8px,2vw,13px);background:linear-gradient(180deg,#FBF3E4,#EAF0E2);border-radius:20px;padding:clamp(10px,2.4vw,16px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(120,140,60,.08);}'
        + '.btb-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.btb-worm{width:clamp(46px,10vw,60px);flex:0 0 auto;}.btb-worm-svg{width:100%;height:auto;display:block;}'
        + '.btb-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:74%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.btb-opts{display:flex;flex-wrap:wrap;gap:clamp(8px,2.2vw,12px);justify-content:center;align-items:stretch;}'
        + '.btb-opt{position:relative;display:flex;flex-direction:column;gap:5px;width:clamp(132px,30vw,164px);min-height:104px;padding:11px 12px 11px 18px;border-radius:6px 12px 12px 6px;border:2px solid rgba(20,107,94,.22);color:' + C.INK + ';cursor:pointer;box-shadow:0 3px 0 rgba(120,90,50,.18);text-align:left;touch-action:manipulation;}'
        + '.btb-spine{position:absolute;left:0;top:0;bottom:0;width:7px;background:rgba(0,0,0,.16);border-radius:6px 0 0 6px;}'
        + '.btb-title{font:800 clamp(14px,3.6vw,17px)/1.15 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.btb-blurb{font:600 clamp(11px,2.8vw,13px)/1.25 "Nunito",sans-serif;color:#43474D;}'
        + '.btb-opt.btb-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34),0 3px 0 rgba(120,90,50,.18);transform:translateY(-2px);}'
        + '.btb-opt:active{transform:translateY(1px);}'
        + '.btb-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.btb-root{gap:clamp(6px,1.5vw,10px);}.btb-worm{width:clamp(42px,8vw,52px);}.btb-opt{min-height:98px;}}'
        + '@media (max-height:760px){.btb-root{gap:6px;padding:11px;}.btb-row{display:none;}.btb-opt{min-height:88px;padding:9px 10px 9px 16px;}}'
        + '@media (max-height:660px){.btb-root{gap:3px;padding:6px;}.btb-opts{gap:5px;}.btb-opt{min-height:46px;padding:5px 8px 5px 13px;gap:2px;}.btb-title{font-size:11.5px;line-height:1.1;}.btb-blurb{font-size:9px;line-height:1.12;}}'
        + '@media (max-width:380px){.btb-opt{width:clamp(120px,42vw,150px);}}';
      var tag = document.createElement('style'); tag.setAttribute('data-bea-two-bookshelves', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'bea-two-bookshelves.' + round.id, band: round.band || 1, promptKey: round.ask === 'story' ? 'promptStory' : 'promptFact', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return Core.grade(round, tool.sel); },
        hintKey: function () { return round.ask === 'story' ? 'hintStory' : 'hintFact'; }
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
