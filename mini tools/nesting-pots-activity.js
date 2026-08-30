/* =====================================================================
   GRANDPA PIP'S NESTING POTS — ACTIVITY  (nesting-pots-activity.js)
   ---------------------------------------------------------------------
   CCSS K.CC.C.7 — compare written NUMERALS 1–10. Grandpa Pip hand-carves
   nesting pots, no two alike (so size ≠ number is the charming NORM →
   kills the K.CC.C.7 size-cheat from round 1). The child nests pots
   biggest-NUMBER → smallest-NUMBER; each next must hold FEWER friends than
   the current innermost, so baby Wee Olen ends up safe in the middle.

   COGNITION reused from mini tools/ordering-core.js (window.OrderingCore:
   isValid reads `.value` ONLY, legalMoves, correctOrder, the 8 rounds).
   Answer DERIVED, never stored. Full lcs-shell tool. answerType:'state'.

   VISUAL ARCHITECTURE (locked up front):
     • the NEST = a stepped-overlap cascade of placed pots (each inset, the
       belly NUMERAL always exposed + DOM over the pot "cartouche"); the
       open target mouth GLOWS (dashed ring) with Wee Olen peeking.
     • TRAY of unplaced pots; tap a pot → it lifts + Grandpa names it → tap
       the glowing mouth → shared validator. Wrong = gentle bob-out + a
       teaching nudge (never a red X). Two equal pots rest side-by-side.
     • numeral is ALWAYS the primary stimulus; dots are fading peek-supports
       (visible R1/R2, peek-on-tap R3/R4, gone R7+). Pot SIZE is decor only.
     • column < 600px (nest above, tray below) / row ≥ 600px. Pots ≥ 56px.
     • Grandpa Pip / Wee Olen / Doot = SVG PLACEHOLDERS via the _setPose CA5
       seam (docs/character-art-spec.md). No timer/score/streak.

   0 lines to the 6 protected cores + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.OrderingCore;
  var LANG = 'en';

  var C = {
    T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F',
    CREAM: '#FBF3E4', INK: '#2A2A35', RIM: '#FFFFFF', GOOD: '#2FA56A', CLAY: '#E6A877'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function rng(seed) {
    var s = seed | 0;
    return function () { s = (s + 0x6D2B79F5) | 0; var t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function shuffleSeeded(arr, seed) { var rand = rng(seed), a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rand() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function interp(t, args) { return String(t || '').replace(/\{(\w+)\}/g, function (m, k) { return (k in args) ? args[k] : m; }); }

  /* pot footprint (1..5) → a size FACTOR multiplying the responsive --np-base
     (a clamp() that shrinks pots on a Fold and grows them on desktop, keeping
     footprint ratios). Set inline as --np-f. */
  function potFactor(footprint) { return (0.80 + footprint * 0.065).toFixed(3); }

  /* ---- a single pot SVG body (belly cartouche left EMPTY — numeral/dots are
     DOM overlays so re-skinning art never touches the math). ---- */
  function potSVG(opts) {
    var open = opts && opts.open;
    var s = '<svg class="np-pot-svg" viewBox="0 0 100 100" aria-hidden="true">' +
      '<defs><filter id="npShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="2.5" stdDeviation="2.2" flood-color="rgba(40,30,20,.22)"/></filter></defs>' +
      /* body */
      '<path class="np-body" d="M18 40 Q18 30 30 28 L70 28 Q82 30 82 40 L78 80 Q76 90 60 92 L40 92 Q24 90 22 80 Z" fill="' + C.CLAY + '" stroke="' + C.CORAL2 + '" stroke-width="2.4" filter="url(#npShadow)"/>';
    if (open) {
      /* an OPEN, clearly-EMPTY pot (the target/gap): a wide rim + a deep dark
         interior so it reads "ready to tuck the next pot in here" — no cartouche. */
      s += '<ellipse class="np-rim" cx="50" cy="29" rx="34" ry="11" fill="#F0C9A0" stroke="' + C.CORAL2 + '" stroke-width="2.6"/>' +
        '<ellipse cx="50" cy="30" rx="28" ry="8.5" fill="#5E3A22"/>' +              /* deep empty interior */
        '<ellipse cx="50" cy="28.5" rx="28" ry="7.5" fill="#7A4A2C"/>' +            /* inner wall highlight */
        '<ellipse cx="50" cy="27" rx="20" ry="4.5" fill="#5E3A22" opacity=".7"/>';  /* depth */
    } else {
      s += '<ellipse class="np-rim" cx="50" cy="30" rx="32" ry="9" fill="#F0C9A0" stroke="' + C.CORAL2 + '" stroke-width="2.4"/>' +
        '<ellipse class="np-mouth" cx="50" cy="30" rx="25" ry="6" fill="#7A4A2C"/>' +
        /* painted belly band + the NUMBER CARTOUCHE — a cream disc so the painted
           numeral (the K.CC.C.7 subject) reads high-contrast + dominant on the clay */
        '<path d="M22 50 Q50 58 78 50" fill="none" stroke="' + C.T + '" stroke-width="2" opacity=".4"/>' +
        '<ellipse cx="50" cy="62" rx="27" ry="17" fill="#FCF6EA" stroke="' + C.CORAL2 + '" stroke-width="1.6" opacity=".96"/>';
    }
    return s + '</svg>';
  }

  /* ---- characters — SVG PLACEHOLDERS via [data-pose] (CA5 swaps in later) ---- */
  function grandpaSVG() {
    return '<svg class="np-grandpa-svg" viewBox="0 0 120 120" role="img" aria-label="' + (LANG === 'de' ? 'Opa Pip' : LANG === 'fr' ? 'Papi Pip' : LANG === 'es' ? 'Abuelo Pip' : LANG === 'pt' ? 'Vovô Pip' : LANG === 'it' ? 'Nonno Pip' : LANG === 'nl' ? 'Opa Toon' : 'Grandpa Pip') + '">' +
      '<ellipse cx="60" cy="108" rx="34" ry="8" fill="rgba(0,0,0,.08)"/>' +
      '<path d="M34 70 Q34 44 60 44 Q86 44 86 70 L84 96 Q82 104 60 104 Q38 104 36 96 Z" fill="' + C.T + '"/>' +
      '<circle cx="60" cy="40" r="22" fill="#F3D8B8"/>' +
      /* hat */
      '<path d="M36 34 Q60 14 84 34 Q84 40 60 38 Q36 40 36 34 Z" fill="' + C.CORAL + '"/>' +
      /* beard */
      '<path d="M44 46 Q60 70 76 46 Q74 60 60 64 Q46 60 44 46 Z" fill="' + C.RIM + '" opacity=".92"/>' +
      '<g class="np-gp-eyes-open"><circle cx="52" cy="40" r="2.6" fill="' + C.INK + '"/><circle cx="68" cy="40" r="2.6" fill="' + C.INK + '"/></g>' +
      '<g class="np-gp-eyes-talk"><circle cx="52" cy="40" r="2.6" fill="' + C.INK + '"/><circle cx="68" cy="40" r="2.6" fill="' + C.INK + '"/><ellipse cx="60" cy="52" rx="4" ry="5" fill="' + C.CORAL2 + '"/></g>' +
      '<ellipse cx="48" cy="46" rx="4" ry="2.6" fill="' + C.CORAL + '" opacity=".5"/><ellipse cx="72" cy="46" rx="4" ry="2.6" fill="' + C.CORAL + '" opacity=".5"/>' +
      '</svg>';
  }
  function weeOlenSVG() {
    return '<svg class="np-olen-svg" viewBox="0 0 60 60" role="img" aria-label="' + (LANG === 'de' ? 'Baby Wee Olen' : LANG === 'fr' ? 'Bébé Wee Olen' : LANG === 'es' ? 'Bebé Wee Olen' : LANG === 'pt' ? 'Bebê Wee Olen' : LANG === 'it' ? 'il piccolo Wee Olen' : LANG === 'nl' ? 'de kleine Wee Olen' : 'Wee Olen the baby') + '">' +
      /* two little hands gripping the pot rim (reads as a baby peeking OUT) */
      '<ellipse cx="17" cy="49" rx="5" ry="4" fill="#F3D8B8" stroke="' + C.CORAL2 + '" stroke-width="1"/>' +
      '<ellipse cx="43" cy="49" rx="5" ry="4" fill="#F3D8B8" stroke="' + C.CORAL2 + '" stroke-width="1"/>' +
      /* head */
      '<ellipse cx="30" cy="34" rx="16" ry="17" fill="#F3D8B8"/>' +
      /* tuft of hair */
      '<path d="M22 19 Q30 12 38 19 Q34 17 30 18 Q26 17 22 19 Z" fill="' + C.T2 + '"/>' +
      '<circle cx="24" cy="34" r="2.8" fill="' + C.INK + '"/><circle cx="36" cy="34" r="2.8" fill="' + C.INK + '"/>' +
      '<circle cx="25" cy="33" r="0.9" fill="#fff"/><circle cx="37" cy="33" r="0.9" fill="#fff"/>' +
      '<path d="M25 42 Q30 46 35 42" stroke="' + C.INK + '" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="21" cy="39" rx="3.2" ry="2.2" fill="' + C.CORAL + '" opacity=".6"/><ellipse cx="39" cy="39" rx="3.2" ry="2.2" fill="' + C.CORAL + '" opacity=".6"/>' +
      '</svg>';
  }
  function dootSVG() {
    return '<svg class="np-doot-svg" viewBox="0 0 70 70" role="img" aria-label="' + (LANG === 'de' ? 'Doot die Ente' : LANG === 'fr' ? 'Doot le canard' : LANG === 'es' ? 'Doot el pato' : LANG === 'pt' ? 'Doot, o pato' : LANG === 'it' ? 'Doot, il papero' : LANG === 'nl' ? 'Toet de eend' : 'Doot the Duck') + '">' +
      '<ellipse cx="35" cy="46" rx="20" ry="16" fill="#F4E04D"/>' +
      '<circle cx="35" cy="26" r="13" fill="#F4E04D"/>' +
      '<path d="M22 26 Q12 28 16 33 Q22 33 24 30 Z" fill="' + C.CORAL + '"/>' +
      '<circle cx="33" cy="24" r="2.4" fill="' + C.INK + '"/>' +
      '<ellipse cx="50" cy="48" rx="8" ry="11" fill="#EBCF3A"/>' +
      '</svg>';
  }


  global.NestingPotsActivity = {
    id: 'nesting-pots-activity',

    strings: {
      title:        { en: "Grandpa Pip's Nesting Pots", de: 'Opa Pips Stapeltöpfe', fr: 'Les pots gigognes de Papi Pip', es: 'Las ollitas del Abuelo Pip', pt: 'Os potinhos do Vovô Pip', it: 'I vasetti di Nonno Pip', nl: 'Opa Toons stapelpotjes' },
      instruction:  { en: 'Tuck the pots away biggest number first, so little Wee Olen is safe in the middle. Tap Check when the family is all tucked in.', de: 'Räum die Töpfe weg – die größte Zahl zuerst, damit das kleine Wee Olen sicher in der Mitte sitzt. Tipp auf Prüfen, wenn die ganze Familie eingeräumt ist.', fr: 'Range les pots en commençant par le plus grand nombre, pour que le petit Wee Olen soit bien au milieu. Touche Vérifier quand toute la famille est rangée.', es: 'Guarda las ollitas: primero el número mayor, para que el pequeño Wee Olen quede seguro en el centro. Toca Revisar cuando toda la familia esté anidada.', pt: 'Guarde os potinhos: primeiro o número maior, para que o pequeno Wee Olen fique seguro no meio. Toque em Verificar quando a família toda estiver aninhada.', it: 'Metti via i vasetti partendo dal numero più grande, così il piccolo Wee Olen sta al sicuro nel mezzo. Tocca Controlla quando tutta la famiglia è al suo posto.', nl: 'Stapel de potjes op — het grootste getal eerst — zodat de kleine Wee Olen veilig in het midden zit. Tik op Controleer als de hele familie erin zit.' },
      prompt:       { en: 'Pack the pots — biggest number first.', de: 'Räum die Töpfe ein – die größte Zahl zuerst.', fr: 'Range les pots — le plus grand nombre en premier.', es: 'Anida las ollitas: primero el número mayor.', pt: 'Guarde os potinhos: primeiro o número maior.', it: 'Sistema i vasetti — prima il numero più grande.', nl: 'Stapel de potjes — het grootste getal eerst.' },
      promptGap:    { en: 'Which pot fills the gap?', de: 'Welcher Topf passt in die Lücke?', fr: 'Quel pot remplit le trou ?', es: '¿Cuál ollita va en el hueco?', pt: 'Qual potinho preenche o espaço vazio?', it: 'Quale vasetto riempie lo spazio vuoto?', nl: 'Welk potje past in het gaatje?' },
      hintPick:     { en: 'Tap a pot first, then tap the glowing pot.', de: 'Tipp zuerst auf einen Topf, dann auf den leuchtenden Topf.', fr: 'Touche d’abord un pot, puis touche le pot qui brille.', es: 'Toca primero una ollita y luego la ollita que brilla.', pt: 'Toque primeiro em um potinho e depois no potinho que brilha.', it: 'Prima tocca un vasetto, poi tocca il vasetto che brilla.', nl: 'Tik eerst op een potje, tik dan op het potje dat oplicht.' },
      hintBigger:   { en: 'Start with the BIGGEST number — read the numbers, not the pot size.', de: 'Fang mit der GRÖSSTEN Zahl an – lies die Zahlen, nicht die Topfgröße.', fr: 'Commence par le plus GRAND nombre — lis les nombres, pas la taille du pot.', es: 'Empieza con el número MAYOR: lee los números, no el tamaño de la ollita.', pt: 'Comece pelo número MAIOR — leia os números, não o tamanho do potinho.', it: 'Comincia dal numero PIÙ GRANDE — leggi i numeri, non la grandezza del vasetto.', nl: 'Begin met het GROOTSTE getal — lees de getallen, niet de grootte van de pot.' },
      hintRelation: { en: '{a} is more than {b}, so {b} tucks inside {a}.', de: '{a} ist größer als {b}, also passt {b} in {a}.', fr: '{a} est plus grand que {b}, donc {b} se range dans {a}.', es: '{a} es mayor que {b}, así que {b} cabe en {a}.', pt: '{a} é maior que {b}, então {b} cabe dentro de {a}.', it: '{a} è più grande di {b}, quindi {b} entra in {a}.', nl: '{a} is meer dan {b}, dus {b} past in {a}.' },
      hintGap:      { en: 'The missing pot is more than {b} and less than {a}.', de: 'Der fehlende Topf ist größer als {b} und kleiner als {a}.', fr: 'Le pot qui manque est plus grand que {b} et plus petit que {a}.', es: 'La ollita que falta es mayor que {b} y menor que {a}.', pt: 'O potinho que falta é maior que {b} e menor que {a}.', it: 'Il vasetto che manca è più grande di {b} e più piccolo di {a}.', nl: 'Het potje dat mist is meer dan {b} en minder dan {a}.' },
      twin:         { en: '{a} and {a} are the same — neither fits inside, so they rest side by side.', de: '{a} und {a} sind gleich – keiner passt in den anderen, also stehen sie nebeneinander.', fr: '{a} et {a}, c’est pareil — aucun ne rentre dans l’autre, ils se posent côte à côte.', es: '{a} y {a} son iguales: ninguna cabe en la otra, así que se quedan una al lado de la otra.', pt: '{a} e {a} são iguais — nenhum cabe dentro do outro, então ficam lado a lado.', it: '{a} e {a} sono uguali — nessuno entra dentro, quindi restano affiancati.', nl: '{a} en {a} zijn hetzelfde getal — geen van beide past erin, dus ze staan naast elkaar.' },
      relateOk:     { en: '{b} tucks inside {a} — {b} is less than {a}.', de: '{b} passt in {a} – {b} ist kleiner als {a}.', fr: '{b} se range dans {a} — {b} est plus petit que {a}.', es: '{b} cabe en {a}: {b} es menor que {a}.', pt: '{b} cabe dentro de {a} — {b} é menor que {a}.', it: '{b} entra in {a} — {b} è più piccolo di {a}.', nl: '{b} past in {a} — {b} is minder dan {a}.' },
      sr:           { en: 'A pot holding {n} friends.', de: 'Ein Topf mit {n} Freunden.', fr: 'Un pot avec {n} amis.', es: 'Una ollita con el número {n}.', pt: 'Um potinho com o número {n}.', it: 'Un vasetto con il numero {n}.', nl: 'Een potje met het getal {n}.' },
      srTarget:     { en: 'Tuck a smaller-number pot in here.', de: 'Hier kommt ein Topf mit einer kleineren Zahl hinein.', fr: 'Range ici un pot avec un nombre plus petit.', es: 'Aquí va una ollita con un número menor.', pt: 'Aqui vai um potinho com um número menor.', it: 'Metti qui un vasetto con un numero più piccolo.', nl: 'Hier komt een potje met een kleiner getal in.' },
      srGap:        { en: 'A missing pot — tuck the right number in here.', de: 'Ein fehlender Topf – hier kommt die richtige Zahl hinein.', fr: 'Un pot manquant — range ici le bon nombre.', es: 'Una ollita que falta: aquí va el número correcto.', pt: 'Um potinho que falta: aqui vai o número certo.', it: 'Un vasetto che manca — metti qui il numero giusto.', nl: 'Een potje dat mist — hier komt het juiste getal in.' }
    },

    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks(Core.buildRounds()); this._order = null; this._curPass = 0; this._orderForPool = null;
      /* safe defaults so the shell's mount-time render() (which runs BEFORE the
         first task's setup) does not crash on undefined state (mosaic pattern). */
      this.round = null; this.mode = 'nest'; this.nest = []; this.tray = []; this.aside = [];
      this.selected = null; this.readOnly = false; this.misses = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) { this._loadActivity(); }
    },

    /* ---- per-round state ---- */
    setupTask: function (round) {
      this.round = round;
      this.mode = round.gapFill ? 'gap' : 'nest';
      this.misses = 0; this.selected = null; this.readOnly = false; this._celebrated = false;
      var seed = 1; for (var i = 0; i < round.id.length; i++) seed = (seed * 31 + round.id.charCodeAt(i)) | 0;
      this._seed = seed;

      if (this.mode === 'gap') {
        // pre-build the nest with ONE gap; tray = the fitter + 2 non-fitting decoys
        var sortedG = round.items.slice().sort(function (a, b) { return b.value - a.value; });
        var gapIdx = Math.floor(sortedG.length / 2);          // a middle slot
        this._gapAbove = sortedG[gapIdx - 1];                 // bigger neighbour
        this._gapBelow = sortedG[gapIdx + 1];                 // smaller neighbour
        this._gapAnswer = sortedG[gapIdx];
        this.nest = sortedG.map(function (p, i) { return i === gapIdx ? null : p; });   // null = the gap
        /* decoys = FRESH values that do NOT fit the gap (> the upper neighbour or
           < the lower neighbour) AND are not already a pot in the nest — so the
           tray never duplicates a placed pot. One above, one below. */
        var placed = sortedG.map(function (p) { return p.value; });
        var taken = placed.concat([this._gapAnswer.value]);
        function freshDecoy(start, step, floor, ceil) {
          for (var v = start; v >= floor && v <= ceil; v += step) {
            if (taken.indexOf(v) < 0) { taken.push(v); return { value: v, footprint: Core.SAME_SIZE, rep: 'numeral' }; }
          }
          return null;
        }
        var hi = freshDecoy(this._gapAbove.value + 1, 1, 1, 19);   // just above → climbs
        var lo = freshDecoy(this._gapBelow.value - 1, -1, 1, 19);  // just below → descends
        var decoys = [hi, lo].filter(Boolean);
        while (decoys.length < 2) { var d = freshDecoy(this._gapAbove.value + 2, 1, 1, 19) || freshDecoy(2, 1, 1, 19); if (!d) break; decoys.push(d); }
        this.tray = shuffleSeeded([this._gapAnswer].concat(decoys), seed);
      } else {
        this.nest = [];                                       // built by the child
        this.tray = shuffleSeeded(round.items.slice(), seed);
      }
      this.aside = [];                                        // twins that rest side-by-side
    },

    innermost: function () { for (var i = this.nest.length - 1; i >= 0; i--) { if (this.nest[i]) return this.nest[i]; } return null; },
    trayLeft: function () { return this.tray.length; },

    render: function () {
      this.injectCSS();
      var api = this.api, self = this;
      var stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'np-wrap');

      /* Grandpa strip (speaks/hints) */
      var gp = api.el('div', 'np-grandpa'); gp.setAttribute('data-pose', 'idle'); gp.innerHTML = grandpaSVG();
      this._gpEl = gp;

      /* the NEST area — stepped-overlap cascade + the glowing target mouth */
      var nestWrap = api.el('div', 'np-nestwrap');
      var nest = api.el('div', 'np-nest'); this._nestEl = nest;
      nestWrap.appendChild(nest);

      /* the TRAY — unplaced pots, resting on the workbench */
      var tray = api.el('div', 'np-tray'); this._trayEl = tray;

      /* one COMPOSED "workbench" panel groups Grandpa + the nest + the tray so
         nothing floats in empty page space (critic 2026-06-23). */
      var scene = api.el('div', 'np-scene');
      var nestrow = api.el('div', 'np-nestrow');
      nestrow.append(gp, nestWrap);
      scene.append(nestrow, tray);

      /* Doot perched on the bench corner (integrated, not corner-floating) */
      var doot = api.el('div', 'np-doot'); doot.innerHTML = dootSVG(); this._dootEl = doot;
      scene.appendChild(doot);

      wrap.appendChild(scene);
      stage.appendChild(wrap);
      this._renderNest();
      this._renderTray();
      this.paint();
    },

    _renderNest: function () {
      var self = this, api = this.api, nest = this._nestEl; nest.innerHTML = '';
      this.nest.forEach(function (p, i) {
        if (!p) {                                            // the GAP slot — a clear "missing pot here"
          var gap = api.el('button', 'np-pot np-gap'); gap.type = 'button';
          gap.setAttribute('aria-label', api.t('srGap'));
          gap.style.setProperty('--np-f', potFactor(Core.SAME_SIZE));
          gap.innerHTML = '<span class="np-glow" aria-hidden="true"></span>' +
            '<span class="np-pot-art np-pot-empty">' + potSVG({ open: true }) + '</span>' +
            '<span class="np-qmark" aria-hidden="true">?</span>';
          gap.addEventListener('click', function () { self._tapTarget(i); });
          nest.appendChild(gap);
          return;
        }
        /* biggest (placed first) sits in FRONT and occludes the smaller pots
           tucked behind/inside it → reads as nested, not side-by-side. */
        var el = api.el('div', 'np-pot np-nested' + (p.value >= 10 ? ' np-2d' : '')); el.style.setProperty('--np-f', potFactor(p.footprint)); el.style.zIndex = String(100 - i);
        el.setAttribute('aria-label', interp(api.t('sr'), { n: p.value }));
        el.innerHTML = '<span class="np-pot-art">' + potSVG() + '</span>' + '<span class="np-num">' + esc(p.value) + '</span>';
        nest.appendChild(el);
      });
      /* the open target mouth at the end (nest mode) — where the next pot tucks */
      if (this.mode === 'nest' && this.trayLeft() > 0) {
        var inner = this.innermost();
        var t = api.el('button', 'np-pot np-target'); t.type = 'button';
        t.setAttribute('aria-label', api.t('srTarget'));
        t.style.setProperty('--np-f', potFactor(inner ? inner.footprint : Core.SAME_SIZE));
        t.style.zIndex = String(100 - this.nest.length);
        /* a SOLID, clearly-OPEN pot with baby Wee Olen peeking + a soft pulsing
           glow (not a dashed ghost) → "tuck the next pot in here". */
        t.innerHTML = '<span class="np-glow" aria-hidden="true"></span>' +
          '<span class="np-pot-art">' + potSVG({ open: true }) + '</span>' +
          '<span class="np-olen">' + weeOlenSVG() + '</span>';
        t.addEventListener('click', function () { self._tapTarget(self.nest.length); });
        nest.appendChild(t);
      }
    },

    _renderTray: function () {
      var self = this, api = this.api, tray = this._trayEl; tray.innerHTML = '';
      this.tray.forEach(function (p, i) {
        var btn = api.el('button', 'np-pot np-tray-pot' + (p.value >= 10 ? ' np-2d' : '')); btn.type = 'button';
        btn.style.setProperty('--np-f', potFactor(p.footprint));
        btn.setAttribute('aria-label', interp(api.t('sr'), { n: p.value }));
        btn.innerHTML = '<span class="np-pot-art">' + potSVG() + '</span>' +
          '<span class="np-num">' + esc(p.value) + '</span>';
        btn.addEventListener('click', function () { self._tapTray(i); });
        tray.appendChild(btn);
      });
      /* aside (resting twins) */
      this.aside.forEach(function (p) {
        var a = api.el('div', 'np-pot np-aside' + (p.value >= 10 ? ' np-2d' : '')); a.style.setProperty('--np-f', potFactor(p.footprint));
        a.innerHTML = '<span class="np-pot-art">' + potSVG() + '</span><span class="np-num">' + esc(p.value) + '</span>';
        tray.appendChild(a);
      });
    },

    _tapTray: function (i) {
      if (this.readOnly) return;
      this.selected = this.tray[i];
      if (this.api.sound) this.api.sound(620);
      this._setPose('talk');
      if (this.api.announce) this.api.announce(interp(this.api.t('sr'), { n: this.selected.value }));
      this.paint();
    },

    _validPlacement: function (item) {
      if (this.mode === 'gap') {
        return item.value > this._gapBelow.value && item.value < this._gapAbove.value;
      }
      var legal = Core.legalMoves(this.tray, this.innermost());
      return legal.indexOf(item) >= 0;
    },

    _tapTarget: function (slot) {
      if (this.readOnly) return;
      var sel = this.selected;
      if (!sel) { if (this.api.announce) this.api.announce(this.api.t('hintPick')); return; }
      var inner = this.innermost();

      /* twin: equal to innermost → rest side-by-side (the equal-edge insight) */
      if (this.mode === 'nest' && inner && sel.value === inner.value) {
        this._removeFromTray(sel); this.aside.push(sel); this.selected = null;
        if (this.api.announce) this.api.announce(interp(this.api.t('twin'), { a: sel.value }));
        if (this.api.sound) this.api.sound(440);
        this._renderTray(); this.paint(); return;
      }

      if (this._validPlacement(sel)) {
        this._place(sel, slot);
      } else {
        this._bob(sel);
      }
    },

    _removeFromTray: function (item) { var k = this.tray.indexOf(item); if (k >= 0) this.tray.splice(k, 1); },

    _place: function (item, slot) {
      var api = this.api;
      this._removeFromTray(item);
      if (this.mode === 'gap') { for (var i = 0; i < this.nest.length; i++) { if (!this.nest[i]) { this.nest[i] = item; break; } } }
      else { this.nest.push(item); }
      var inner = this.innermost();
      this.selected = null;
      if (api.sound) api.sound(880);
      this._setPose('talk');
      // relation-naming feedback (CRA: name the comparison)
      var prev = this.mode === 'gap' ? this._gapAbove : (this.nest.length >= 2 ? this.nest[this.nest.length - 2] : null);
      if (api.announce && prev) api.announce(interp(api.t('relateOk'), { a: prev.value, b: item.value }));
      this._renderNest(); this._renderTray(); this.paint();
      this._sparkle();
    },

    _bob: function (item) {
      var api = this.api; this.misses++;
      this._setPose('talk'); this._dootWobble();
      if (api.sound) api.sound(330);
      var inner = this.innermost();
      var msg;
      if (this.mode === 'gap') msg = interp(api.t('hintGap'), { a: this._gapAbove.value, b: this._gapBelow.value });
      else if (!inner) msg = api.t('hintBigger');
      else msg = interp(api.t('hintRelation'), { a: inner.value, b: item.value });
      if (api.announce) api.announce(msg);
      // visual bob on the offending tray pot
      var idx = this.tray.indexOf(item);
      if (idx >= 0 && this._trayEl) { var el = this._trayEl.children[idx]; if (el) { el.classList.add('np-bobbing'); setTimeout(function () { el.classList.remove('np-bobbing'); }, 480); } }
      this.selected = null; this.paint();
    },

    paint: function () {
      var self = this;
      if (this._trayEl) Array.prototype.forEach.call(this._trayEl.querySelectorAll('.np-tray-pot'), function (el, i) {
        el.classList.toggle('is-lifted', self.selected === self.tray[i]);
      });
      this._setPose(this.readOnly ? 'talk' : 'idle');
    },

    _setPose: function (name) { if (this._gpEl) this._gpEl.setAttribute('data-pose', name === 'idle' ? 'idle' : 'talk'); },
    _dootWobble: function () { var d = this._dootEl; if (!d) return; d.classList.add('np-wobble'); setTimeout(function () { d.classList.remove('np-wobble'); }, 500); },
    _sparkle: function () {
      if (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var nest = this._nestEl; if (!nest) return;
      var s = document.createElement('span'); s.className = 'np-sparkle'; s.textContent = '✦';
      nest.appendChild(s); setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 700);
    },

    /* round complete = every tray pot resolved (nested or rested aside), and
       (gap mode) the gap is filled. Wrong placements can't happen (they bob),
       so "all resolved" ⇒ correct. */
    isCorrect: function () {
      if (this.mode === 'gap') return this.nest.every(function (p) { return !!p; });
      return this.tray.length === 0;
    },

    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : Core.buildRounds();
      var n = pool.length, i = (opts && opts.index) || 0;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = tierOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = (n > 0) ? Math.floor(i / n) : 0;
      if (pass > this._curPass) { this._order = tierOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/nesting-pots-activities.json').then(function (r) {
        if (!r.ok) throw new Error('manifest ' + r.status); return r.json();
      }).then(function (rows) {
        var row = rows.find(function (r) { return r.id === self._activityId; });
        if (!row) return;
        self._activityRow = row;
        self._pool = self._buildTasksFromRow(row);
        self._order = null;
        if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
      }).catch(function (e) { if (global.console && console.warn) console.warn('[nesting-pots] manifest load failed; fallback:', e.message); });
    },

    _buildTasksFromRow: function (row) {
      if (row.params && Array.isArray(row.params.rounds)) {
        // rounds carry {id,tier,sizeMode,rep,values,insertion,gapFill,equalEdge,twoDigit}
        return makeTasks(row.params.rounds.map(function (r) { return Core.buildRound(r); }));
      }
      return makeTasks(Core.buildRounds());
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.np-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,12px);width:100%;max-width:min(96vw,620px);margin:0 auto;--np-base:clamp(54px,14vw,78px);}'
        /* the COMPOSED workbench panel — groups Grandpa + nest + tray so nothing
           floats in empty page space; sizes to its content (no dead cream). */
        + '.np-scene{position:relative;display:flex;flex-direction:column;align-items:center;gap:clamp(8px,2vw,16px);width:auto;max-width:min(94vw,560px);margin:0 auto;'
        +   'background:linear-gradient(180deg,#FBF3E4,#F4E7CF);border:2.5px solid rgba(20,107,94,.18);border-radius:26px;'
        +   'padding:clamp(12px,3vw,22px) clamp(14px,3.4vw,28px) clamp(14px,3vw,22px);'
        +   'box-shadow:0 6px 0 rgba(20,107,94,.10),inset 0 2px 0 rgba(255,255,255,.5);}'
        + '.np-nestrow{display:flex;align-items:flex-end;justify-content:center;gap:clamp(6px,2vw,16px);width:100%;}'
        + '.np-grandpa{width:clamp(58px,14vw,90px);flex:0 0 auto;align-self:flex-end;}'
        + '.np-grandpa-svg{width:100%;height:auto;display:block;overflow:visible;}'
        /* the nest cascade — pots overlap ~45% so smaller ones tuck behind the bigger */
        + '.np-nestwrap{display:flex;justify-content:center;align-items:flex-end;min-height:calc(var(--np-base) * 1.15);flex:1 1 auto;}'
        + '.np-nest{display:flex;flex-direction:row;align-items:flex-end;justify-content:center;position:relative;}'
        + '.np-nest .np-pot{margin-left:calc(var(--np-sz) * -0.46);}'
        + '.np-nest .np-pot:first-child{margin-left:0;}'
        /* tray — pots resting on the bench (a recessed shelf strip inside the panel) */
        + '.np-tray{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:clamp(6px,2vw,12px);width:100%;min-height:44px;padding:clamp(7px,1.8vw,12px) clamp(8px,2vw,14px);'
        +   'background:rgba(122,74,44,.10);border-radius:16px;box-shadow:inset 0 2px 4px rgba(122,74,44,.14),inset 0 1px 0 rgba(255,255,255,.4);}'
        /* a pot (button or div) */
        + '.np-pot{--np-sz:calc(var(--np-base,64px) * var(--np-f,1));position:relative;width:var(--np-sz);height:var(--np-sz);flex:0 0 auto;border:0;background:none;padding:0;cursor:default;}'
        + '.np-tray-pot,.np-target,.np-gap{cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation;}'
        + '.np-tray-pot:focus-visible,.np-target:focus-visible,.np-gap:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;border-radius:14px;}'
        + '.np-pot-art{position:absolute;inset:0;display:block;}'
        + '.np-pot-svg{width:100%;height:100%;display:block;overflow:visible;}'
        + '.np-pot-ghost{opacity:.5;}'
        /* the belly NUMERAL — the PRIMARY stimulus (K.CC.C.7), DOM over the cream
           cartouche so it dominates the pot face; smaller for two-digit values. */
        + '.np-num{position:absolute;left:0;right:0;top:62%;transform:translateY(-50%);text-align:center;'
        +   'font-family:"Baloo 2",var(--lcs-font-display,sans-serif);font-weight:800;color:' + C.T + ';'
        +   'font-size:calc(var(--np-sz,64px) * .54);line-height:1;letter-spacing:-.02em;pointer-events:none;}'
        + '.np-pot.np-2d .np-num{font-size:calc(var(--np-sz,64px) * .40);}'
        /* lifted / target / gap states */
        + '.np-tray-pot{transition:transform .12s var(--lcs-ease,ease);}'
        + '.np-tray-pot.is-lifted{transform:translateY(-10px) scale(1.06);filter:drop-shadow(0 6px 6px rgba(0,0,0,.18));}'
        /* the TARGET / GAP "tuck here" glow — a soft pulsing coral halo BEHIND the
           open pot (not a hard dashed ring → no more confusing dotted-pot look) */
        + '.np-glow{position:absolute;inset:-10%;border-radius:50%;background:radial-gradient(circle at 50% 46%,rgba(242,120,75,.45),rgba(242,120,75,.16) 58%,transparent 72%);animation:npGlow 1.3s ease-in-out infinite;pointer-events:none;}'
        + '@keyframes npGlow{0%,100%{opacity:.55;transform:scale(.96);}50%{opacity:1;transform:scale(1.06);}}'
        + '.np-target,.np-gap{transition:transform .2s var(--lcs-ease,ease);}'
        + '.np-target{animation:npTuckBob 1.6s ease-in-out infinite;}'
        + '@keyframes npTuckBob{0%,100%{transform:translateY(0);}50%{transform:translateY(-4px);}}'
        + '.np-pot-empty{opacity:.78;}'
        + '.np-qmark{position:absolute;left:0;right:0;top:60%;transform:translateY(-50%);text-align:center;font-family:"Baloo 2",var(--lcs-font-display,sans-serif);font-weight:800;color:' + C.CORAL2 + ';font-size:calc(var(--np-sz,64px) * .40);line-height:1;pointer-events:none;opacity:.8;}'
        + '.np-olen{position:absolute;left:50%;top:6%;width:62%;transform:translateX(-50%);pointer-events:none;z-index:2;}'
        + '.np-olen-svg{width:100%;height:auto;display:block;overflow:visible;}'
        + '.np-aside{opacity:.92;}'
        + '.np-aside .np-pot-art{filter:saturate(.85);}'
        /* bob + wobble + sparkle */
        + '.np-bobbing{animation:npBob .46s ease;}'
        + '@keyframes npBob{0%{transform:translateY(0);}30%{transform:translateY(-14px) rotate(-4deg);}60%{transform:translateY(0) rotate(3deg);}100%{transform:translateY(0);}}'
        + '.np-doot{position:absolute;right:calc(var(--np-base) * -0.18);bottom:-6px;width:clamp(38px,8.5vw,54px);z-index:60;}'
        + '.np-doot-svg{width:100%;height:auto;display:block;}'
        + '.np-wobble{animation:npWob .5s ease;}'
        + '@keyframes npWob{0%,100%{transform:rotate(0);}25%{transform:rotate(-10deg);}75%{transform:rotate(10deg);}}'
        + '.np-sparkle{position:absolute;left:50%;top:0;transform:translateX(-50%);color:' + C.CORAL + ';font-size:20px;animation:npSpark .7s ease forwards;pointer-events:none;}'
        + '@keyframes npSpark{0%{opacity:0;transform:translate(-50%,6px) scale(.5);}30%{opacity:1;}100%{opacity:0;transform:translate(-50%,-24px) scale(1.1);}}'
        /* Grandpa pose */
        + '.np-gp-eyes-talk{display:none;} .np-grandpa[data-pose="talk"] .np-gp-eyes-open{display:none;} .np-grandpa[data-pose="talk"] .np-gp-eyes-talk{display:inline;}'
        /* narrowest phones (Galaxy Fold cover ~320px): shave the last bit so the
           panel + Check clear the fold (smaller pots + tighter panel padding). */
        + '@media (max-width:360px){'
        +   '.np-wrap{--np-base:clamp(44px,12.5vw,78px);gap:5px;}'
        +   '.np-scene{padding:10px 12px 12px;gap:8px;} .np-tray{padding:5px 8px;gap:6px;}'
        + '}'
        + '@media (prefers-reduced-motion: reduce){.np-target-ring,.np-bobbing,.np-wobble,.np-sparkle{animation:none;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-nesting-pots', ''); tag.textContent = css;
      document.head.appendChild(tag);
    }
  };

  /* tasks: each round → a shell task. answerType 'state' (the nest IS the answer). */
  function makeTasks(rounds) {
    return rounds.map(function (r) {
      return {
        id: 'nesting-pots.' + r.id,
        tier: r.tier,
        promptKey: r.gapFill ? 'promptGap' : 'prompt',
        promptArgs: {},
        answerType: 'state',
        setup: function (tool) { tool.setupTask(r); },
        check: function (tool) {
          var ok = tool.isCorrect();
          if (ok) { tool.readOnly = true; tool._setPose('talk'); }
          return ok;
        },
        hintKey: function (tool) { return (tool.selected == null) ? 'hintPick' : 'hintBigger'; }
      };
    });
  }

  /* tier-grouped reshuffle: keep tiers in order (the structural ramp), shuffle
     WITHIN each tier per pass (spec: reshuffle within tier only). */
  function tierOrder(pool, prev) {
    var byTier = {};
    pool.forEach(function (t, i) { (byTier[t.tier] = byTier[t.tier] || []).push(i); });
    var tiers = Object.keys(byTier).sort(function (a, b) { return a - b; });
    var out;
    var attempts = 0;
    do {
      out = [];
      tiers.forEach(function (t) {
        var g = byTier[t].slice();
        for (var i = g.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var tmp = g[i]; g[i] = g[j]; g[j] = tmp; }
        out = out.concat(g);
      });
      attempts++;
    } while (prev && out.join(',') === prev.join(',') && attempts < 12 && pool.length > 1);
    return out;
  }

}(typeof window !== 'undefined' ? window : this));
