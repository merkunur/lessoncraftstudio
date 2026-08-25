/* =====================================================================
   SPROUT'S PATCHWORK MEADOW — ACTIVITY SKIN  (patchwork-meadow-activity.js)
   ---------------------------------------------------------------------
   3.MD.C.6 · measure area by covering a region with unit squares. The
   lcs-shell activity skin over patchwork-meadow-core.js. answerType:'state'.
   EN-ONLY pilot (slug.en only → 404 non-EN by design).

   A MEASUREMENT game (mute-safe, SR-first): Sprout the bunny carpets
   IRREGULAR flower beds (L-shapes, staircases) completely with moss-patch
   unit SQUARES — no gaps, no overlaps — and the area is the COUNT of squares
   it takes to cover the SPACE. SVG/CSS TAP-TO-PLACE grid (tap an empty bed
   cell → lay a patch; tap a covered cell → lift one). On a full, clean cover
   the patches KNIT into one bloomed meadow and Sprout states the area.

   5 distinct child-ACTIONS (conserve CUT per operator; 3.MD.C.6 recognition
   is owned by the live mosaic-menders activity): tile (cover from empty) ·
   repair (fix a hidden gap + a double-stacked overlap) · estimate (predict
   the area, bed EMPTY → object-counting can't help) · finish (complete a
   partial cover) · build (make a bed of exactly N square units — the inverse).

   A correct cover/answer → resolve (the shell Check = post-resolve advance,
   hidden until resolved via `.lcs-app.sprout-resolved`) + a flower joins the
   MEADOW PANORAMA (abundance vessel — never a count). A wrong estimate → a
   warm scaffold (DIM the pick + "count only the moss", no advance). Per-round
   token guard. 0 lines to any core / lcs-shell. NO timer/score/streak/fail.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.PatchworkMeadowCore;

  var L = {
    en: {
      tile: 'Cover the whole bed with moss patches.',
      repair: 'Fix the bed — no bare spots, no double patches.',
      estimate: 'How many square units will cover this bed?',
      finish: 'Finish covering the bed.',
      build: 'Build a bed of exactly {n} square units.',
      win: 'Lovely! Area: {area}.',
      gapLeft: 'A little ground still needs a patch.',
      overLeft: "That bit's already covered — lift the extra.",
      nudgeArea: 'Those corners are empty — count only the moss.',
      ariaBed: 'flower bed',
      ariaEmptyBed: 'an empty flower bed to measure',
      cellCovered: 'row {r}, column {c}, covered',
      cellNot: 'row {r}, column {c}, not covered',
      cellDouble: 'row {r}, column {c}, double patch, tap to lift one',
      choiceUnits: '{value} square units',
      srEstimate: 'Predict how many unit squares cover this bed.',
      srResolved: 'The whole bed is covered — area {area}.',
      srProgress: 'Bed covered: {covered} of {total} square units.'
    },
    de: {
      tile: 'Bedecke das ganze Beet mit Moos-Kästchen.',
      repair: 'Bessere das Beet aus – keine kahlen Stellen, keine doppelten Kästchen.',
      estimate: 'Wie viele Kästchen bedecken dieses Beet?',
      finish: 'Belege das Beet fertig.',
      build: 'Baue ein Beet aus genau {n} Kästchen.',
      win: 'Schön! Fläche: {area}.',
      gapLeft: 'Ein Stück Boden braucht noch ein Kästchen.',
      overLeft: 'Diese Stelle ist schon bedeckt – heb das zusätzliche Kästchen ab.',
      nudgeArea: 'Diese Ecken sind leer – zähle nur das Moos.',
      ariaBed: 'Blumenbeet',
      ariaEmptyBed: 'ein leeres Blumenbeet zum Ausmessen',
      cellCovered: 'Reihe {r}, Spalte {c}, bedeckt',
      cellNot: 'Reihe {r}, Spalte {c}, nicht bedeckt',
      cellDouble: 'Reihe {r}, Spalte {c}, doppelt belegt, tippe, um ein Kästchen abzuheben',
      choiceUnits: '{value} Kästchen',
      srEstimate: 'Schätze, wie viele Kästchen dieses Beet bedecken.',
      srResolved: 'Das ganze Beet ist bedeckt – Fläche {area}.',
      srProgress: 'Beet bedeckt: {covered} von {total} Kästchen.'
    },
    fr: {
      tile: 'Recouvre tout le parterre avec des carreaux de mousse.',
      repair: 'Répare le parterre : aucun trou, aucun carreau en double.',
      estimate: 'Combien de carreaux faut-il pour recouvrir ce parterre ?',
      finish: 'Termine de recouvrir le parterre.',
      build: 'Construis un parterre de {n} carreaux exactement.',
      win: 'Bravo ! Aire : {area}.',
      gapLeft: 'Il reste un peu de terre à recouvrir.',
      overLeft: 'Cette partie est déjà recouverte — enlève le carreau en trop.',
      nudgeArea: 'Ces coins sont vides — compte seulement la mousse.',
      ariaBed: 'parterre de fleurs',
      ariaEmptyBed: 'un parterre de fleurs vide à mesurer',
      cellCovered: 'ligne {r}, colonne {c}, recouverte',
      cellNot: 'ligne {r}, colonne {c}, non recouverte',
      cellDouble: 'ligne {r}, colonne {c}, carreau en double, touche pour en enlever un',
      choiceUnits: '{value} carreaux',
      srEstimate: 'Devine combien de carreaux recouvrent ce parterre.',
      srResolved: 'Le parterre est entièrement recouvert — aire {area}.',
      srProgress: 'Parterre recouvert : {covered} carreaux sur {total}.'
    },
    es: {
      tile: 'Cubre todo el jardín con cuadritos de musgo.',
      repair: 'Arregla el jardín: sin partes sin cubrir ni cuadritos encimados.',
      estimate: '¿Cuántos cuadritos cubren este jardín?',
      finish: 'Termina de cubrir el jardín.',
      build: 'Arma un jardín de exactamente {n} cuadritos.',
      win: '¡Muy bien! Área: {area}.',
      gapLeft: 'A un pedacito de tierra todavía le falta un cuadrito.',
      overLeft: 'Este lugar ya está cubierto: quita el cuadrito de más.',
      nudgeArea: 'Estos rincones están vacíos: cuenta solo el musgo.',
      ariaBed: 'jardín de flores',
      ariaEmptyBed: 'un jardín de flores vacío para medir',
      cellCovered: 'fila {r}, columna {c}, cubierta',
      cellNot: 'fila {r}, columna {c}, sin cubrir',
      cellDouble: 'fila {r}, columna {c}, cuadrito doble, toca para quitar uno',
      choiceUnits: '{value} cuadritos',
      srEstimate: 'Predice cuántos cuadritos unitarios cubren este jardín.',
      srResolved: 'Todo el jardín está cubierto: área {area}.',
      srProgress: 'Jardín cubierto: {covered} de {total} cuadritos.'
    },
    pt: {
      tile: 'Cubra todo o canteiro com quadradinhos de musgo.',
      repair: 'Conserte o canteiro — sem buracos e sem quadradinhos dobrados.',
      estimate: 'Quantos quadradinhos vão cobrir este canteiro?',
      finish: 'Termine de cobrir o canteiro.',
      build: 'Monte um canteiro com exatamente {n} quadradinhos.',
      win: 'Que lindo! Área: {area}.',
      gapLeft: 'Ainda falta cobrir um pedacinho.',
      overLeft: 'Esse pedaço já está coberto — tire o quadradinho a mais.',
      nudgeArea: 'Esses cantos estão vazios — conte só o musgo.',
      ariaBed: 'canteiro',
      ariaEmptyBed: 'um canteiro vazio para medir',
      cellCovered: 'fila {r}, coluna {c}, coberto',
      cellNot: 'fila {r}, coluna {c}, sem cobrir',
      cellDouble: 'fila {r}, coluna {c}, quadradinho dobrado, toque para tirar um',
      choiceUnits: '{value} quadradinhos',
      srEstimate: 'Adivinhe quantos quadradinhos cobrem este canteiro.',
      srResolved: 'O canteiro inteiro está coberto — área {area}.',
      srProgress: 'Canteiro coberto: {covered} de {total} quadradinhos.'
    },
    it: {
      tile: 'Ricopri tutto il prato con le zolle di muschio.',
      repair: 'Sistema il prato: niente spazi vuoti, niente zolle doppie.',
      estimate: 'Quanti quadretti servono per ricoprire questo prato?',
      finish: 'Finisci di ricoprire il prato.',
      build: 'Costruisci un prato di esattamente {n} quadretti.',
      win: 'Che bello! Area: {area}.',
      gapLeft: 'Un pezzetto di terra ha ancora bisogno di una zolla.',
      overLeft: 'Quel pezzetto è già coperto: togli la zolla in più.',
      nudgeArea: 'Quegli angoli sono vuoti: conta solo il muschio.',
      ariaBed: 'prato fiorito',
      ariaEmptyBed: 'un prato vuoto da misurare',
      cellCovered: 'riga {r}, colonna {c}, coperta',
      cellNot: 'riga {r}, colonna {c}, non coperta',
      cellDouble: 'riga {r}, colonna {c}, zolla doppia, tocca per toglierne una',
      choiceUnits: '{value} quadretti',
      srEstimate: 'Prevedi quanti quadretti ricoprono questo prato.',
      srResolved: 'Tutto il prato è coperto: area {area}.',
      srProgress: 'Prato coperto: {covered} di {total} quadretti.'
    }
  };
  function txt(k, args) {
    var lang = (global.LCS && global.LCS.i18n && global.LCS.i18n.current) || 'en';
    var s = (L[lang] || L.en)[k] || L.en[k] || k;
    return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (args && key in args) ? args[key] : m; });
  }
  /* per-locale inflected unit phrase (F-9 / §A.13.56). de: „Kästchen" is invariant sg=pl. */
  function areaUnitPhrase(n) {
    var lang = (global.LCS && global.LCS.i18n && global.LCS.i18n.current) || 'en';
    if (lang === 'de') return n + ' Kästchen';
    if (lang === 'fr') return n === 1 ? '1 carreau' : n + ' carreaux';
    if (lang === 'es') return n === 1 ? '1 cuadrito' : n + ' cuadritos';
    if (lang === 'pt') return n === 1 ? '1 quadradinho' : n + ' quadradinhos';
    if (lang === 'it') return n === 1 ? '1 quadretto' : n + ' quadretti';
    return n === 1 ? '1 square unit' : n + ' square units';
  }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* ---- Sprout the bunny gardener — SVG PLACEHOLDER (CA5 sprite swaps in
     via [data-pose]: idle | happy). docs/character-art-spec.md. ---- */
  function sproutSVG() {
    return '<svg class="pm-sprout-svg" viewBox="0 0 60 64" width="34" height="36" aria-hidden="true">' +
      '<ellipse cx="20" cy="14" rx="6" ry="13" fill="#EAD9C2"/><ellipse cx="40" cy="14" rx="6" ry="13" fill="#EAD9C2"/>' +
      '<ellipse cx="20" cy="15" rx="3" ry="9" fill="#F2B8A8"/><ellipse cx="40" cy="15" rx="3" ry="9" fill="#F2B8A8"/>' +
      '<circle cx="30" cy="36" r="19" fill="#EAD9C2"/>' +
      '<g class="pm-eyes-open"><circle cx="23" cy="33" r="2.6" fill="#2B2B2B"/><circle cx="37" cy="33" r="2.6" fill="#2B2B2B"/></g>' +
      '<g class="pm-eyes-happy"><path d="M20 33 q3 -4 6 0" stroke="#2B2B2B" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M34 33 q3 -4 6 0" stroke="#2B2B2B" stroke-width="2.2" fill="none" stroke-linecap="round"/></g>' +
      '<ellipse cx="22" cy="40" rx="3.4" ry="2.2" fill="#F2784B" opacity=".55"/><ellipse cx="38" cy="40" rx="3.4" ry="2.2" fill="#F2784B" opacity=".55"/>' +
      '<path d="M27 39 q3 3 6 0" stroke="#2B2B2B" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
      '<path d="M30 24 q-2 -6 3 -8" stroke="#5AA469" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>';
  }
  /* the MEADOW PANORAMA — a growing strip of flowers (abundance, NEVER a
     count, never resembles unit-squares). One flower per solved bed. */
  function meadowSVG(n) {
    var cap = Math.min(n, 9), cols = ['#F2784B', '#C2569B', '#E9C46A', '#5AA469', '#2A9D8F'], blooms = '';
    for (var i = 0; i < cap; i++) {
      var x = 7 + i * 6, y = 26 - (i % 3) * 3, col = cols[i % 5];
      blooms += '<g transform="translate(' + x + ',' + y + ')">' +
        '<line x1="0" y1="0" x2="0" y2="6" stroke="#5AA469" stroke-width="1.1"/>' +
        '<circle cx="0" cy="-1.4" r="2.1" fill="' + col + '"/><circle cx="0" cy="-1.4" r=".8" fill="#FFF7E6"/></g>';
    }
    return '<svg class="pm-meadow-svg" viewBox="0 0 62 34" width="40" height="22" aria-hidden="true">' +
      '<rect x="2" y="24" width="58" height="8" rx="3" fill="#DCEAD7"/>' +
      '<g>' + blooms + '</g></svg>';
  }
  var FLOWER = '<svg viewBox="0 0 24 24" width="60%" height="60%" aria-hidden="true" style="position:absolute;left:20%;top:20%;pointer-events:none;">' +
    '<g fill="#F7E7C6"><circle cx="12" cy="6" r="3.2"/><circle cx="18" cy="12" r="3.2"/><circle cx="12" cy="18" r="3.2"/><circle cx="6" cy="12" r="3.2"/></g>' +
    '<circle cx="12" cy="12" r="3" fill="#F2784B"/></svg>';

  var PatchworkMeadowActivity = {
    id: 'patchwork-meadow-activity',
    strings: {
      title: { en: "Sprout's Patchwork Meadow", de: 'Sprouts Flickenwiese', fr: 'La prairie en patchwork de Sprout', es: 'El prado de retazos de Sprout', pt: 'O Prado de Retalhos do Sprout', it: 'Il prato a quadretti di Sprout' },
      instruction: { en: 'Cover Sprout’s flower beds with moss-patch squares — the area is how many squares cover the space!', de: 'Belege Sprouts Beete mit Moos-Kästchen – die Fläche ist die Anzahl der Kästchen, die den Platz bedecken!', fr: 'Recouvre les parterres de Sprout avec des carreaux de mousse — l’aire, c’est le nombre de carreaux qui recouvrent l’espace !', es: 'Cubre los jardines de Sprout con cuadritos de musgo: ¡el área es la cantidad de cuadritos que cubren el espacio!', pt: 'Cubra os canteiros do Sprout com quadradinhos de musgo — a área é quantos quadradinhos cobrem o espaço!', it: 'Ricopri i prati di Sprout con i quadretti di muschio: Area è il numero di quadretti che copre lo spazio!' },
      qtile: { en: 'Cover the whole bed with moss patches.', de: 'Bedecke das ganze Beet mit Moos-Kästchen.', fr: 'Recouvre tout le parterre avec des carreaux de mousse.', es: 'Cubre todo el jardín con cuadritos de musgo.', pt: 'Cubra todo o canteiro com quadradinhos de musgo.', it: 'Ricopri tutto il prato con le zolle di muschio.' },
      qrepair: { en: 'Fix the bed — no bare spots, no double patches.', de: 'Bessere das Beet aus – keine kahlen Stellen, keine doppelten Kästchen.', fr: 'Répare le parterre : aucun trou, aucun carreau en double.', es: 'Arregla el jardín: sin partes sin cubrir ni cuadritos encimados.', pt: 'Conserte o canteiro — sem buracos e sem quadradinhos dobrados.', it: 'Sistema il prato: niente spazi vuoti, niente zolle doppie.' },
      qestimate: { en: 'How many square units will cover this bed?', de: 'Wie viele Kästchen bedecken dieses Beet?', fr: 'Combien de carreaux faut-il pour recouvrir ce parterre ?', es: '¿Cuántos cuadritos cubren este jardín?', pt: 'Quantos quadradinhos vão cobrir este canteiro?', it: 'Quanti quadretti servono per ricoprire questo prato?' },
      qfinish: { en: 'Finish covering the bed.', de: 'Belege das Beet fertig.', fr: 'Termine de recouvrir le parterre.', es: 'Termina de cubrir el jardín.', pt: 'Termine de cobrir o canteiro.', it: 'Finisci di ricoprire il prato.' },
      qbuild: { en: 'Build a bed of exactly {n} square units for {n} carrots.', de: 'Baue ein Beet aus genau {n} Kästchen für {n} Karotten.', fr: 'Construis un parterre de {n} carreaux exactement pour {n} carottes.', es: 'Arma un jardín de exactamente {n} cuadritos por {n} zanahorias.', pt: 'Monte um canteiro com exatamente {n} quadradinhos por {n} cenouras.', it: 'Costruisci un prato di esattamente {n} quadretti per {n} carote.' }
    },

    init: function (api) {
      this._api = api;
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._pl = {}; this._nonConf = {};
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('pm-style')) return;
      var s = el('style'); s.id = 'pm-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.pm-root{display:flex;flex-direction:column;align-items:center;gap:9px;width:100%;max-width:min(96vw,560px);margin:0 auto;}',
        '.pm-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.pm-sprout,.pm-meadow{flex:0 0 auto;}',
        '.pm-line{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .84rem/1.18 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.pm-line.miss{color:#C2410C;}',
        /* the bed grid (columns set inline). The interactive bed cell is
           `.pm-cand` (a harness-recognized control, mosaic-menders pattern)
           so visual-QA measures the real content bottom, not the stretched
           card; non-interactive display/bloom cells are `.pm-cell`. */
        /* the cell unit scales UP with the card on desktop so the board fills
           the wide card (not a small cluster in a sea of cream — §A.13.62
           not-sparse); the phone size (≤380, below) stays as-is. */
        '.pm-grid{display:grid;gap:6px;justify-content:center;align-content:center;--pm-cell:clamp(44px,16vw,84px);}',
        /* on resolve the patches KNIT into one compact bloomed meadow (smaller
           cell + 0 gap) so the win state + the shell Check clears the fold even
           on the tallest 4-row beds at a 900px desktop viewport. */
        '.pm-grid.bloomed{gap:0;--pm-cell:clamp(40px,11vw,52px);}',
        '.pm-cand,.pm-cell{width:var(--pm-cell);height:var(--pm-cell);border-radius:11px;border:2.5px dashed #93C7BC;background:#FBFDFC;padding:0;position:relative;}',
        '.pm-cand{cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation;}',
        '.pm-cell{cursor:default;}',
        '.pm-cand.patch{background:#146B5E;border:2.5px solid #0F4A40;}',
        '.pm-cand.over{background:#F2784B;border:2.5px solid #C2410C;}',
        '.pm-cand .pm-x2{position:absolute;right:3px;top:1px;font:800 .72rem/1 Baloo 2,Nunito,sans-serif;color:#fff;}',
        '.pm-gap{width:var(--pm-cell);height:var(--pm-cell);}',
        /* bloomed (knit) — solid touching squares = one continuous meadow */
        '.pm-cell.bloom{background:#5AA469;border:none;border-radius:0;}',
        /* estimate number choices (the only -choice answer cards) */
        '.pm-choices{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;width:100%;}',
        '.pm-choice{min-width:clamp(66px,16vw,108px);min-height:clamp(52px,9vw,72px);border:2.8px solid #146B5E;border-radius:16px;background:#fff;color:#0F4A40;cursor:pointer;font:800 clamp(1.45rem,5vw,2.1rem)/1 Baloo 2,Nunito,sans-serif;padding:6px 16px;}',
        '.pm-choice.dim{opacity:.4;}',
        '.pm-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '.pm-sprout-svg .pm-eyes-happy{display:none;}',
        '.pm-sprout[data-pose=happy] .pm-eyes-open{display:none;}',
        '.pm-sprout[data-pose=happy] .pm-eyes-happy{display:block;}',
        /* narrow trim (keep cells ≥44px — visual-QA enforces tap≥44 at every width) */
        '@media (max-width:380px){.pm-root{gap:6px;}.pm-grid{gap:4px;--pm-cell:clamp(44px,14vw,54px);}.pm-line{font-size:.78rem;}.pm-choice{min-width:60px;min-height:48px;font-size:1.25rem;}}',
        '.lcs-app:not(.sprout-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'patchwork-meadow.tile.3-md-c-6';
      var tries = ['/mini-tools/patchwork-meadow-activities.json', 'patchwork-meadow-activities.json', '../mini tools/patchwork-meadow-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row; self._pool = (row && row.params && row.params.rounds) || [];
            self._order = null; self._orderForPool = null; self._curPass = 0;
            if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
          }).catch(function () { attempt(i + 1); });
      }(0));
    },

    _shuffle: function (a) { for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = a[k]; a[k] = a[j]; a[j] = t; } return a; },
    _bandOrder: function (pool, prev) {
      var self = this, order = this._shuffle(pool.map(function (_, i) { return i; }));
      if (prev && order.length > 1) { var g = 0; while (order.join(',') === prev.join(',') && g++ < 12) order = self._shuffle(pool.map(function (_, i) { return i; })); }
      return order;
    },
    nextTask: function (ctx) {
      var pool = this._pool || []; if (!pool.length) return null;
      var n = pool.length, index = (ctx && ctx.index) || 0, pass = Math.floor(index / n);
      if (!this._order || this._orderForPool !== pool) { this._order = this._bandOrder(pool); this._orderForPool = pool; this._curPass = 0; }
      else if (pass > this._curPass) { this._order = this._bandOrder(pool, this._order); this._curPass = pass; }
      return this._makeTask(pool[this._order[index % n]]);
    },

    _makeTask: function (round) {
      var pk = { tile: 'qtile', repair: 'qrepair', estimate: 'qestimate', finish: 'qfinish', build: 'qbuild' }[round.cog] || 'qtile';
      var args = round.cog === 'build' ? { n: round.target } : {};
      return {
        id: round.id, promptKey: pk, promptArgs: args, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1;
      this._nonConf = {};
      /* the live covering: empty for tile/build/estimate; the seeded (flawed)
         cover for finish/repair. The area is DERIVED from this — never stored. */
      this._pl = (round.cog === 'finish' || round.cog === 'repair') ? Core.placementsFromPre(round) : {};
      if (round.cog === 'estimate') this._displayOrder = this._shuffle((round.choices || []).map(function (_, i) { return i; }));
      if (this._app) this._app.classList.remove('sprout-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'pm-root');

      /* Sprout + status line + meadow panorama */
      var say = el('div', 'pm-say');
      var sp = el('div', 'pm-sprout'); sp.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); sp.innerHTML = sproutSVG();
      var line = el('p', 'pm-line'); line.setAttribute('aria-live', 'polite'); line.textContent = txt(round.cog, { n: round.target });
      var md = el('div', 'pm-meadow'); md.innerHTML = meadowSVG(this._finds);
      say.append(sp, line, md); root.appendChild(say); this._line = line; this._sprout = sp;

      if (round.cog === 'estimate' && !this._resolved) this._renderEstimate(root);
      else this._renderGrid(root);

      root.appendChild(this._srMirror());
      stage.appendChild(root);
    },

    /* the tap-to-place bed grid (tile / repair / finish / build, + the bloom) */
    _renderGrid: function (root) {
      var self = this, round = this._round;
      var b = Core.bbox(round), rows = (round.region || round.frame), region = Core.regionSet(round);
      var grid = el('div', 'pm-grid' + (this._resolved ? ' bloomed' : ''));
      grid.style.gridTemplateColumns = 'repeat(' + b.cols + ',var(--pm-cell))';
      grid.setAttribute('role', 'grid'); grid.setAttribute('aria-label', txt('ariaBed'));
      for (var r = 0; r < b.rows; r++) {
        for (var c = 0; c < b.cols; c++) {
          var key = c + ',' + r;
          var inRegion = !!region[key] || (round.cog === 'build' && rows[r] && rows[r].charAt(c) === '1');
          if (!inRegion) { grid.appendChild(el('span', 'pm-gap')); continue; }
          var count = this._pl[key] || 0;
          if (this._resolved) {
            var bl = el('div', 'pm-cell bloom');
            if ((r * 3 + c) % 3 === 0) bl.innerHTML = FLOWER;
            grid.appendChild(bl); continue;
          }
          var cell = el('button', 'pm-cand' + (count === 1 ? ' patch' : count >= 2 ? ' over' : ''));
          cell.type = 'button'; cell.setAttribute('role', 'gridcell');
          cell.setAttribute('aria-label', txt(count >= 2 ? 'cellDouble' : count === 1 ? 'cellCovered' : 'cellNot', { r: r + 1, c: c + 1 }));
          if (count >= 2) { var x2 = el('span', 'pm-x2'); x2.textContent = '×2'; cell.appendChild(x2); }
          (function (k, tok) {
            cell.addEventListener('click', function () { if (self._token === tok) self._tapCell(k); });
          }(key, this._token));
          grid.appendChild(cell);
        }
      }
      root.appendChild(grid);
    },

    _tapCell: function (key) {
      if (this._resolved) return;
      var round = this._round, count = this._pl[key] || 0;
      if (count >= 1) { this._pl[key] = count - 1; if (this._pl[key] <= 0) delete this._pl[key]; this._api.sound && this._api.sound(420); }
      else { this._pl[key] = 1; this._api.sound && this._api.sound(660); }
      if (Core.isComplete(round, this._pl)) { this._resolve(); return; }
      this.render();
    },

    _renderEstimate: function (root) {
      var self = this, round = this._round, tok = this._token;
      /* the bed OUTLINE, EMPTY (no tiles to count — predict the space) */
      var b = Core.bbox(round), region = Core.regionSet(round);
      var grid = el('div', 'pm-grid');
      grid.style.gridTemplateColumns = 'repeat(' + b.cols + ',var(--pm-cell))';
      grid.setAttribute('role', 'img'); grid.setAttribute('aria-label', txt('ariaEmptyBed'));
      for (var r = 0; r < b.rows; r++) for (var c = 0; c < b.cols; c++) {
        if (region[c + ',' + r]) { var e = el('div', 'pm-cell'); e.style.cursor = 'default'; grid.appendChild(e); }
        else grid.appendChild(el('span', 'pm-gap'));
      }
      root.appendChild(grid);
      /* the number choices */
      var box = el('div', 'pm-choices');
      this._displayOrder.forEach(function (oi) {
        var c = round.choices[oi];
        var btn = el('button', 'pm-choice' + (self._nonConf[oi] ? ' dim' : ''));
        btn.type = 'button'; btn.textContent = String(c.value); btn.setAttribute('aria-label', txt('choiceUnits', { value: c.value }));
        btn.addEventListener('click', function () {
          if (self._resolved || self._nonConf[oi] || self._token !== tok) return;
          if (Core.isChoiceAnswer(round, oi)) self._resolve();
          else { self._nonConf[oi] = 1; self._nudge('nudgeArea'); }
        });
        box.appendChild(btn);
      });
      root.appendChild(box);
    },

    _resolve: function () {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('sprout-resolved');
      var n = this._round.cog === 'estimate' ? Core.regionArea(this._round) : Core.area(this._pl);
      this.render();
      if (this._line) { this._line.textContent = txt('win', { area: areaUnitPhrase(n) }); this._line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt('win', { area: areaUnitPhrase(n) }));
    },

    _nudge: function (key) {
      this._api.sound && this._api.sound(440);
      this.render();
      if (this._line) { this._line.textContent = txt(key); this._line.classList.add('miss'); }
      this._api.announce && this._api.announce(txt(key));
    },

    _srMirror: function () {
      var round = this._round, wrap = el('div', 'pm-sronly'); wrap.setAttribute('aria-live', 'polite');
      var covered = Core.coverageSize(this._pl), total = round.cog === 'build' ? round.target : Core.regionArea(round);
      var msg = round.cog === 'estimate'
        ? txt('srEstimate')
        : (this._resolved ? txt('srResolved', { area: areaUnitPhrase(total) })
          : txt('srProgress', { covered: covered, total: total }));
      wrap.innerHTML = '<p>' + esc(msg) + '</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.PatchworkMeadowActivity = PatchworkMeadowActivity;

}(typeof window !== 'undefined' ? window : this));
