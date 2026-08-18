/* =====================================================================
   PROFESSOR PIP'S MUSEUM — ACTIVITY  (pip-museum-activity.js)
   ---------------------------------------------------------------------
   CCSS K.G.A.2 — NAME shapes (circle / triangle / square / rectangle /
   hexagon) regardless of ORIENTATION or SIZE. Exhibits ride in tilted / tiny /
   stretched / upside-down; the child routes each to its correctly-NAMED
   pedestal. On a committed-correct routing the exhibit SPINS UPRIGHT (the
   disguise drops) — the orientation-invariance made felt.

   Seven distinct facetActs: transformed-route / exclude-route (→ Mystery
   Gallery) / fine-discriminate (square vs rectangle) / name→shape (inverse) /
   match-pair / confirm-correct (judge Pip's claim) / capstone.

   Geometry + the invariant namer live in mini tools/curate-wing-core.js (pure;
   parametric SVG, no image library). Pedestals are AUDIO/NAME-BOUND with NO
   single canonical icon (markers = colour + nameplate + a trio of *transformed*
   mini-exemplars) — silhouette-matching is structurally defeated. answerType:
   'state'. Pip = SVG STUB for CA5. No timer/score/streak; mis-routes are
   no-shame instruction. 0 lines to the protected cores + lcs-shell.*.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.CurateWingCore;
  var C = { T: '#146B5E', BODY: '#E2F0EC', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', GOLD: '#E8A53A', INK: '#2A2A35' };
  var NAME = { circle: 'circle', triangle: 'triangle', square: 'square', rectangle: 'rectangle', hexagon: 'hexagon', mystery: 'Mystery Gallery' };
  var TINT = { circle: '#EAD6A8', triangle: '#F6CDBC', square: '#CFE6DF', rectangle: '#D9D2EC', hexagon: '#CFE7C8', mystery: '#E5E0D6' };
  var LANG = 'en';
  /* German shape names (§ naming-standard formal Klasse-1 terms). Gender varies
     (der Kreis / das Quadrat / die Raute) + plurals differ → all hint frames are
     article-free and use {n} (bare nominative sing) / {np} (plural). */
  var GNAME = { circle: 'Kreis', triangle: 'Dreieck', square: 'Quadrat', rectangle: 'Rechteck', hexagon: 'Sechseck', rhombus: 'Raute', oval: 'Oval', mystery: 'Rätsel-Galerie' };
  var GNAME_PL = { circle: 'Kreise', triangle: 'Dreiecke', square: 'Quadrate', rectangle: 'Rechtecke', hexagon: 'Sechsecke', rhombus: 'Rauten', oval: 'Ovale' };
  /* French shape names — ALL masculine (le cercle / le carré / l'hexagone) so
     "un {n}" + past-participle agreement (tourné/reconnu) work universally, no
     gender-branching; only elision trap is « l'hexagone » (h muet) → templates use
     "un {n}" never "le {n}". */
  var SHAPE_FR = { circle: 'cercle', triangle: 'triangle', square: 'carré', rectangle: 'rectangle', hexagon: 'hexagone', rhombus: 'losange', oval: 'ovale', mystery: 'Mystère' };
  var SHAPE_FR_PL = { circle: 'cercles', triangle: 'triangles', square: 'carrés', rectangle: 'rectangles', hexagon: 'hexagones', rhombus: 'losanges', oval: 'ovales' };
  /* Spanish shape names — ALL masculine (el círculo / el cuadrado / el rombo), so
     "un {n}" + agreement work universally, no gender-branching; plural just adds -s. */
  var SHAPE_ES = { circle: 'círculo', triangle: 'triángulo', square: 'cuadrado', rectangle: 'rectángulo', hexagon: 'hexágono', rhombus: 'rombo', oval: 'óvalo', mystery: 'Sala de misterio' };
  var SHAPE_ES_PL = { circle: 'círculos', triangle: 'triángulos', square: 'cuadrados', rectangle: 'rectángulos', hexagon: 'hexágonos', rhombus: 'rombos', oval: 'óvalos' };
  /* Brazilian Portuguese shape names — ALL masculine (o círculo / o quadrado / o losango),
     so "um {n}" + "no {n}" work universally, no gender-branching. ⚠ rhombus = LOSANGO,
     NEVER "rombo" (= hole/breach in pt-BR); do NOT copy the es "rombo". */
  var SHAPE_PT = { circle: 'círculo', triangle: 'triângulo', square: 'quadrado', rectangle: 'retângulo', hexagon: 'hexágono', rhombus: 'losango', oval: 'oval', mystery: 'Galeria dos Mistérios' };
  var SHAPE_PT_PL = { circle: 'círculos', triangle: 'triângulos', square: 'quadrados', rectangle: 'retângulos', hexagon: 'hexágonos', rhombus: 'losangos', oval: 'ovais' };
  function gname(t) { return LANG === 'es' ? (SHAPE_ES[t] || t) : LANG === 'de' ? (GNAME[t] || t) : LANG === 'fr' ? (SHAPE_FR[t] || t) : LANG === 'pt' ? (SHAPE_PT[t] || t) : (NAME[t] || t); }
  function gnamePl(t) { return LANG === 'es' ? (SHAPE_ES_PL[t] || SHAPE_ES[t] || t) : LANG === 'de' ? (GNAME_PL[t] || GNAME[t] || t) : LANG === 'fr' ? (SHAPE_FR_PL[t] || SHAPE_FR[t] || t) : LANG === 'pt' ? (SHAPE_PT_PL[t] || SHAPE_PT[t] || t) : ((NAME[t] || t) + 's'); }

  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: String(text), lang: (LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(String(text)); u.rate = .95; u.lang = (LANG === 'es' ? 'es-MX' : LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'pt' ? 'pt-BR' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function shapeSVG(geom) {
    var inner;
    if (geom.kind === 'ellipse') { inner = '<ellipse cx="50" cy="50" rx="' + geom.baseRx.toFixed(1) + '" ry="' + geom.baseRy.toFixed(1) + '" fill="' + C.BODY + '" stroke="' + C.T + '" stroke-width="4"/>'; }
    else { var d = 'M' + geom.baseVerts.map(function (p) { return p.x.toFixed(1) + ' ' + p.y.toFixed(1); }).join(' L') + ' Z'; inner = '<path d="' + d + '" fill="' + C.BODY + '"/><path d="' + d + '" fill="none" stroke="' + C.T + '" stroke-width="4" stroke-linejoin="round"/>'; }
    return '<svg viewBox="0 0 100 100" class="pip-shape-svg" aria-hidden="true">' + inner + '</svg>';
  }
  function pipSVG(mood) {
    var happy = mood === 'happy' || mood === 'cheer';
    return '<svg class="pip-svg" viewBox="0 0 100 100" role="img" aria-label="Professor Pip">'
      + '<ellipse cx="50" cy="58" rx="28" ry="30" fill="#2A2A35"/><ellipse cx="50" cy="64" rx="18" ry="22" fill="#fff"/>'
      + '<circle cx="42" cy="44" r="3.2" fill="#2A2A35"/><circle cx="58" cy="44" r="3.2" fill="#2A2A35"/>'
      + '<path d="M46 52 l4 5 l4 -5 Z" fill="' + C.GOLD + '"/>'
      + '<path d="M44 70 l6 6 l6 -6 Z" fill="' + C.CORAL + '"/>'   /* bow tie */
      + (happy ? '<path d="M22 56 q-9 5 -5 14" stroke="#2A2A35" stroke-width="9" fill="none" stroke-linecap="round"/>' : '') + '</svg>';
  }

  global.PipMuseumActivity = {
    id: 'pip-museum-activity',
    reward: { id: 'pip-museum', label: "Pip's Museum", emoji: '🏛️' },

    strings: {
      title: { en: "Professor Pip's Museum", de: 'Professor Pips Museum', fr: 'Le musée du professeur Pip', es: 'El museo de Pip', pt: 'O Museu do Professor Pip' },
      prompt: { en: 'Name each treasure — any way it turns!', de: 'Benenne jeden Schatz — egal, wie er sich dreht!', fr: 'Nomme chaque trésor, même tourné !', es: '¡Nombra cada tesoro, no importa cómo esté girado!', pt: 'Dê o nome de cada tesouro, mesmo girado!' },
      routeHint: { en: 'What is this? Tap its pedestal to name it.', de: 'Was ist das? Tippe auf den richtigen Sockel.', fr: 'Qu’est-ce que c’est ? Touche le bon socle pour le nommer.', es: '¿Qué es? Toca el pedestal correcto.', pt: 'O que é isto? Toque no pedestal para dar o nome.' },
      excludeHint: { en: 'Name it — or send it to the Mystery Gallery!', de: 'Benenne es — oder schick es in die Rätsel-Galerie!', fr: 'Nomme-le, ou envoie-le au Mystère !', es: '¡Nómbralo… o mándalo a la sala de misterio!', pt: 'Dê o nome — ou leve aos Mistérios!' },
      fineHint: { en: 'Square or rectangle? Look closely!', de: 'Quadrat oder Rechteck? Schau genau hin!', fr: 'Carré ou rectangle ? Regarde bien !', es: '¿Cuadrado o rectángulo? ¡Míralo bien!', pt: 'Quadrado ou retângulo? Olhe bem!' },
      nameHint: { en: 'Pip wants a {n}! Tap the {n}.', de: 'Pip sucht diese Form: {n}. Tippe darauf!', fr: 'Pip cherche un {n} ! Touche-le !', es: 'Pip quiere esta figura: un {n}. ¡Tócala!', pt: 'O Pip quer um {n}! Toque no {n}.' },
      matchHint: { en: 'Find the TWO {n}s — even if they look different!', de: 'Finde die ZWEI {np} — auch wenn sie anders aussehen!', fr: 'Trouve les DEUX {np} — même s’ils ont l’air différents !', es: 'Encuentra los DOS {np}… ¡aunque se vean distintos!', pt: 'Ache os DOIS {np} — mesmo que pareçam diferentes!' },
      confirmHint: { en: 'Pip says it is a {n}. Is that right?', de: 'Pip nennt es {n}. Stimmt das?', fr: 'Pip dit que c’est un {n}. C’est vrai ?', es: 'Pip dice que es un {n}. ¿Es cierto?', pt: 'O Pip diz que é um {n}. Isso está certo?' },
      capstoneHint: { en: 'Name every treasure and open the hall!', de: 'Benenne jeden Schatz und öffne den Saal!', fr: 'Nomme chaque trésor et ouvre la salle !', es: '¡Nombra cada tesoro y abre la sala!', pt: 'Dê o nome de tudo e abra o salão!' },
      mystery: { en: 'Mystery Gallery', de: 'Rätsel-Galerie', fr: 'Mystère', es: 'Sala de misterio', pt: 'Galeria dos Mistérios' },
      agree: { en: 'Yes!', de: 'Ja!', fr: 'Oui !', es: '¡Sí!', pt: 'Sim!' },
      disagree: { en: 'No!', de: 'Nein!', fr: 'Non !', es: '¡No!', pt: 'Não!' },
      win: { en: 'The hall is open! 🎀', de: 'Der Saal ist offen! 🎀', fr: 'La salle est ouverte ! 🎀', es: '¡La sala ya está abierta! 🎀', pt: 'O salão está aberto! 🎀' },
      revealTilted: { en: '{n}! Even turned — you knew.', de: '{n}! Auch gedreht — du hast’s gewusst.', fr: '{n} ! Même tourné, tu l’as reconnu.', es: '¡Un {n}! Aunque esté girado, lo supiste.', pt: '{n}! Mesmo girado, você sabia!' },
      misroute: { en: "Hmm — that's a {n}. It goes over here.", de: 'Hmm — {n} gehört dorthin!', fr: 'Hmm — c’est un {n}. Il va par ici.', es: 'Mmm… ¡el {n} va allá!', pt: 'Hmm — isso é um {n}. Ele vai aqui.' },
      hintCheck: { en: 'Name each treasure by its pedestal.', de: 'Benenne jeden Schatz an seinem Sockel.', fr: 'Nomme chaque trésor à son socle.', es: 'Nombra cada tesoro en su pedestal.', pt: 'Dê o nome de cada tesouro pelo pedestal.' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.solved = false; this.solvedCount = 0; this.msg = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.solved = false; this.msg = null; this._spinning = false;
      this.facet = round.facetAct;
      var gen = function (it) { var g = Core.genGeometryFor(it.type, it.seed, it.assessed); return { src: it, geom: g, routed: false }; };
      var genRot = function (it) { var g = Core.genGeometryFor(it.type, it.seed, it.assessed, true); return { src: it, geom: g, routed: false }; };   // card-filling (rotation-only) for the choice grids
      if (this.facet === 'name-to-shape') { this.choices = (round.choices || []).map(genRot); this.target = round.targetName; }
      else if (this.facet === 'match-pair') { this.set = (round.set || []).map(genRot); this.matchName = round.matchName; this.selected = []; }
      else if (this.facet === 'confirm-correct') { this.claims = (round.claims || []).map(function (c) { return { geom: Core.genGeometryFor(c.type, c.seed, c.assessed), claim: c.claim }; }); this.claimIdx = 0; }
      else { this.belt = (round.belt || []).map(gen); this.activeIdx = 0; }
    },

    _activeBeltIdx: function () { for (var i = 0; i < this.belt.length; i++) if (!this.belt[i].routed) return i; return -1; },
    announce: function (s) { if (this.api.announce) this.api.announce(s); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'pip-wrap'); var root = api.el('div', 'pip-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var head = api.el('div', 'pip-head');
      var p = api.el('div', 'pip-pip'); p.innerHTML = pipSVG(this.solved ? 'cheer' : 'idle'); head.appendChild(p);
      var say = api.el('div', 'pip-say'); say.textContent = this.msg || this._hint(); head.appendChild(say);
      root.appendChild(head);

      if (this.solved) this._renderDone(root);
      else if (this.facet === 'name-to-shape') this._renderNameToShape(root);
      else if (this.facet === 'match-pair') this._renderMatchPair(root);
      else if (this.facet === 'confirm-correct') this._renderConfirm(root);
      else this._renderRoute(root);

      wrap.appendChild(root); stage.appendChild(wrap);
    },
    _hint: function () {
      var api = this.api, r = this.round;
      if (this.facet === 'exclude-route') return api.t('excludeHint');
      if (this.facet === 'fine-discriminate') return api.t('fineHint');
      if (this.facet === 'capstone') return api.t('capstoneHint');
      if (this.facet === 'name-to-shape') return api.t('nameHint').replace(/\{n\}/g, gname(this.target));
      if (this.facet === 'match-pair') { var mh = api.t('matchHint'); return (LANG === 'de' || LANG === 'fr' || LANG === 'es' || LANG === 'pt') ? mh.replace('{np}', gnamePl(this.matchName)) : mh.replace('{n}', this.matchName); }
      if (this.facet === 'confirm-correct') { var c = this.claims[this.claimIdx]; return api.t('confirmHint').replace('{n}', gname(c ? c.claim : '')); }
      return api.t('routeHint');
    },

    /* ----- the exhibit element (canonical SVG + CSS transform) ----- */
    _exhibitEl: function (geom, cls, upright) {
      var el = this.api.el('div', 'pip-exhibit ' + (cls || ''));
      el.innerHTML = shapeSVG(geom);
      if (!upright) el.style.transform = 'rotate(' + geom.rot + 'deg) scale(' + geom.scale + ')';
      return el;
    },
    _pedestalTrio: function (type) {
      var box = this.api.el('div', 'pip-trio');
      for (var i = 0; i < 3; i++) { var g = Core.genGeometryFor(type, (type.charCodeAt(0) * 31 + i * 7 + 5), true); var m = this.api.el('div', 'pip-mini'); m.innerHTML = shapeSVG(g); m.style.transform = 'rotate(' + g.rot + 'deg) scale(' + g.scale + ')'; box.appendChild(m); }
      return box;
    },
    _pedestalEl: function (type, onTap) {
      var self = this, api = this.api;
      var ped = api.el('button', 'pip-pedestal'); ped.type = 'button'; ped.style.background = TINT[type] || '#eee'; ped.setAttribute('aria-label', gname(type));
      if (type === 'mystery') { var q = api.el('div', 'pip-mystery'); q.textContent = '?'; ped.appendChild(q); }
      else ped.appendChild(this._pedestalTrio(type));
      var plate = api.el('div', 'pip-plate'); plate.textContent = (type === 'mystery') ? api.t('mystery') : gname(type); ped.appendChild(plate);
      ped.addEventListener('click', function () { onTap(type); });
      return ped;
    },
    _pedestalRow: function (root, onTap) {
      var row = this.api.el('div', 'pip-pedestals');
      (this.round.pedestals || []).forEach(function (p) { row.appendChild(this._pedestalEl(p.type, onTap)); }, this);
      root.appendChild(row);
    },

    /* ----- route flow (transformed / exclude / fine / capstone) ----- */
    _renderRoute: function (root) {
      var self = this, api = this.api, idx = this._activeBeltIdx();
      var main = api.el('div', 'pip-main');
      var bay = api.el('div', 'pip-bay');
      if (idx >= 0) { var ex = this._exhibitEl(this.belt[idx].geom, 'pip-active', this._spinning); this._activeEl = ex; bay.appendChild(ex); }
      main.appendChild(bay);
      var side = api.el('div', 'pip-side');
      this._pedestalRow(side, function (t) { self._route(t); });
      main.appendChild(side); root.appendChild(main);
    },
    _route: function (type) {
      if (this._spinning) return;
      var self = this, idx = this._activeBeltIdx(); if (idx < 0) return;
      var ex = this.belt[idx], truth = Core.classifyInvariant(ex.geom);
      speak(type === 'mystery' ? (LANG === 'es' ? 'figura misteriosa' : LANG === 'de' ? 'Rätselform' : LANG === 'fr' ? 'forme mystère' : LANG === 'pt' ? 'Mistério' : 'Mystery') : gname(type));
      if (truth === type) {
        this._spinning = true; this.msg = null;
        if (this._activeEl) this._activeEl.style.transform = 'rotate(0deg) scale(1)';   // SPIN-TO-UPRIGHT (commit-only)
        if (type !== 'mystery') { var nm = gname(truth); this.announce(this.api.t('revealTilted').replace('{n}', nm)); setTimeout(function () { speak(LANG === 'es' ? (nm + '! Aunque esté girado, lo supiste.') : LANG === 'de' ? (nm + '! Auch gedreht hast du es gewusst.') : LANG === 'fr' ? (nm + ' ! Même tourné, tu l’as reconnu.') : LANG === 'pt' ? (nm + '! Mesmo girado, você sabia.') : (nm + '! Even turned, you knew')); }, 180); }
        this.api.sound && this.api.sound(880);
        setTimeout(function () { self._spinning = false; ex.routed = true; if (self._activeBeltIdx() < 0) self._win(); else self.render(); }, 440);
      } else {
        var nm2 = truth === 'mystery' ? (LANG === 'es' ? 'figura misteriosa' : LANG === 'de' ? 'Rätselform' : LANG === 'fr' ? 'forme mystère' : LANG === 'pt' ? 'forma misteriosa' : 'mystery shape') : gname(truth);
        this.msg = this.api.t('misroute').replace('{n}', nm2); this.api.sound && this.api.sound(330);
        ex.geom = Core.genGeometryFor(ex.src.type, Core.reseed(ex.geom.rot * 131 + ex.src.seed), ex.src.assessed);   // RE-SEED on return
        this.announce(this.msg); this.render();
      }
    },

    /* ----- name→shape (inverse): tap the named shape ----- */
    _renderNameToShape: function (root) {
      var self = this, api = this.api;
      var grid = api.el('div', 'pip-choices');
      this.choices.forEach(function (c, i) {
        var card = api.el('button', 'pip-choice'); card.type = 'button';
        card.appendChild(self._exhibitEl(c.geom, '', c.routed));
        card.addEventListener('click', function () { self._pickNamed(i, card); });
        grid.appendChild(card);
      });
      root.appendChild(grid);
    },
    _pickNamed: function (i, card) {
      var self = this, c = this.choices[i], truth = Core.classifyInvariant(c.geom);
      if (truth === this.target) { c.routed = true; card.querySelector('.pip-exhibit').style.transform = 'rotate(0deg) scale(1)'; speak(gname(this.target) + '!'); this.api.sound && this.api.sound(880); setTimeout(function () { self._win(); }, 440); }
      else { this.msg = this.api.t('misroute').replace('{n}', truth === 'mystery' ? (LANG === 'es' ? 'figura misteriosa' : LANG === 'de' ? 'Rätselform' : LANG === 'fr' ? 'forme mystère' : LANG === 'pt' ? 'forma misteriosa' : 'mystery shape') : gname(truth)); speak(LANG === 'es' ? ('Era un ' + gname(truth)) : LANG === 'de' ? ('Richtig wäre ' + gname(truth)) : LANG === 'fr' ? ('C’est plutôt un ' + gname(truth)) : LANG === 'pt' ? ('Isso é um ' + gname(truth)) : ("That's a " + truth)); this.api.sound && this.api.sound(330); this.render(); }
    },

    /* ----- match-pair: tap the two same-named exhibits ----- */
    _renderMatchPair: function (root) {
      var self = this, api = this.api;
      var grid = api.el('div', 'pip-choices');
      this.set.forEach(function (c, i) {
        var card = api.el('button', 'pip-choice' + (self.selected.indexOf(i) >= 0 ? ' pip-sel' : '')); card.type = 'button';
        card.appendChild(self._exhibitEl(c.geom, '', false));
        card.addEventListener('click', function () { self._pickMatch(i); });
        grid.appendChild(card);
      });
      root.appendChild(grid);
    },
    _pickMatch: function (i) {
      var self = this, k = this.selected.indexOf(i);
      if (k >= 0) { this.selected.splice(k, 1); this.render(); return; }
      this.selected.push(i); this.api.sound && this.api.sound(640);
      if (this.selected.length === 2) {
        var ok = this.selected.every(function (j) { return Core.classifyInvariant(self.set[j].geom) === self.matchName; });
        if (ok) { this.api.sound && this.api.sound(880); speak(LANG === 'es' ? ('¡Los dos son ' + gnamePl(this.matchName) + '!') : LANG === 'de' ? ('Beide sind ' + gnamePl(this.matchName) + '!') : LANG === 'fr' ? ('Ce sont deux ' + gnamePl(this.matchName) + ' !') : LANG === 'pt' ? ('Os dois são ' + gnamePl(this.matchName) + '!') : ('Both ' + this.matchName + 's!')); setTimeout(function () { self._win(); }, 300); return; }
        this.msg = (LANG === 'es') ? ('Esos no son los dos ' + gnamePl(this.matchName) + '… ¡mira otra vez!') : (LANG === 'de') ? ('Das sind nicht beide ' + gnamePl(this.matchName) + ' — schau nochmal!') : LANG === 'fr' ? ('Ce ne sont pas deux ' + gnamePl(this.matchName) + ' — regarde encore !') : LANG === 'pt' ? ('Não são dois ' + gnamePl(this.matchName) + ' — olhe de novo!') : ("Not both " + this.matchName + "s — look again!"); this.selected = []; this.api.sound && this.api.sound(330);
      }
      this.render();
    },

    /* ----- confirm-correct: judge Pip's claim ----- */
    _renderConfirm: function (root) {
      var self = this, api = this.api, c = this.claims[this.claimIdx];
      var main = api.el('div', 'pip-main');
      var bay = api.el('div', 'pip-bay'); bay.appendChild(this._exhibitEl(c.geom, 'pip-active', false)); main.appendChild(bay);
      var side = api.el('div', 'pip-side pip-judge');
      var yes = api.el('button', 'pip-jbtn pip-yes'); yes.type = 'button'; yes.textContent = api.t('agree'); yes.addEventListener('click', function () { self._judge(true); });
      var no = api.el('button', 'pip-jbtn pip-no'); no.type = 'button'; no.textContent = api.t('disagree'); no.addEventListener('click', function () { self._judge(false); });
      side.appendChild(yes); side.appendChild(no); main.appendChild(side); root.appendChild(main);
    },
    _judge: function (agree) {
      var self = this, c = this.claims[this.claimIdx], truth = Core.classifyInvariant(c.geom);
      var claimTrue = (truth === c.claim);
      if (agree === claimTrue) {
        this.api.sound && this.api.sound(820); speak(truth === 'mystery' ? (LANG === 'es' ? 'figura misteriosa' : LANG === 'de' ? 'Rätselform' : LANG === 'fr' ? 'forme mystère' : LANG === 'pt' ? 'forma misteriosa' : 'A mystery shape') : gname(truth));
        this.claimIdx++; this.msg = null;
        if (this.claimIdx >= this.claims.length) { setTimeout(function () { self._win(); }, 200); } else this.render();
      } else { this.msg = (LANG === 'es') ? 'Mira otra vez… ¿qué figura es?' : (LANG === 'de') ? 'Schau nochmal — welche Form ist das?' : LANG === 'fr' ? 'Regarde encore — quelle forme est-ce ?' : LANG === 'pt' ? 'Olhe de novo — que forma é essa?' : "Look again — what shape IS it?"; this.api.sound && this.api.sound(330); this.render(); }
    },

    _win: function () {
      this.solved = true; this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 8);
      this.api.sound && this.api.sound(920); this.render(); this.announce(this.api.t('win')); speak(LANG === 'es' ? 'La sala ya está abierta.' : LANG === 'de' ? 'Der Saal ist offen.' : LANG === 'fr' ? 'La salle est ouverte.' : LANG === 'pt' ? 'O salão está aberto.' : 'The hall is open');
    },
    _renderDone: function (root) {
      var api = this.api;
      var hall = api.el('div', 'pip-hall');
      for (var i = 0; i < ((this._pool && this._pool.length) || 8); i++) { var n = api.el('span', 'pip-niche' + (i < this.solvedCount ? ' pip-niche-on' : '')); n.textContent = '🏛️'; hall.appendChild(n); }
      root.appendChild(hall);
      var rib = api.el('div', 'pip-ribbon'); rib.textContent = '🎀'; root.appendChild(rib);
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
      fetch('/mini-tools/pip-museum-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[pip-museum] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.pip-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.pip-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(7px,1.8vw,12px);background:linear-gradient(180deg,#FBF3E4,#F2E8D2);border-radius:20px;padding:clamp(8px,1.9vw,13px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.pip-head{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;width:100%;}'
        + '.pip-pip{width:clamp(40px,9vw,50px);flex:0 0 auto;}.pip-svg{width:100%;height:auto;display:block;}'
        + '.pip-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.2 "Nunito",sans-serif;color:' + C.T + ';max-width:80%;}'
        + '.pip-main{display:flex;flex-direction:column;align-items:center;gap:clamp(8px,2vw,16px);width:100%;}'
        /* desktop: bay BESIDE a NARROW pedestal COLUMN (saves vertical height vs the tall shell header; the side stays content-narrow so the bay never gets shoved out) */
        + '@media (min-width:768px){.pip-main{flex-direction:row;align-items:center;justify-content:center;gap:24px;}.pip-side{width:auto;flex:0 1 auto;}.pip-pedestals{flex-direction:column;flex-wrap:nowrap;}}'
        /* the bay + active exhibit */
        + '.pip-bay{width:clamp(108px,30vw,150px);aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;background:#FFF9EC;border:2px solid rgba(20,107,94,.18);border-radius:18px;box-shadow:inset 0 2px 8px rgba(120,90,40,.08);flex:0 0 auto;}'
        + '.pip-exhibit{width:70%;height:70%;transform-origin:center;transition:transform .42s cubic-bezier(.34,1.3,.5,1);display:flex;align-items:center;justify-content:center;}'
        + '.pip-shape-svg{width:100%;height:100%;display:block;overflow:visible;}'
        /* pedestals */
        + '.pip-side{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
        /* ≤3 pedestals in a compact ROW (they fit 3-across even at 280px) — never a tall vertical stack */
        + '.pip-pedestals{display:flex;flex-direction:row;flex-wrap:wrap;gap:6px;max-width:100%;align-items:stretch;justify-content:center;}'
        + '.pip-pedestal{display:flex;flex-direction:column;align-items:center;gap:3px;min-height:64px;min-width:clamp(68px,21vw,108px);flex:0 1 auto;padding:6px 5px;border:2px solid rgba(20,107,94,.22);border-radius:14px;cursor:pointer;touch-action:manipulation;box-shadow:0 3px 0 rgba(20,107,94,.12);}'
        + '.pip-pedestal:active{transform:translateY(2px);}'
        + '.pip-trio{display:flex;gap:2px;}.pip-mini{width:clamp(15px,4.4vw,22px);height:clamp(15px,4.4vw,22px);transform-origin:center;}.pip-mini .pip-shape-svg{width:100%;height:100%;}'
        + '.pip-mystery{font:800 clamp(18px,5vw,26px)/1 "Baloo 2",sans-serif;color:#9a8f78;}'
        + '.pip-plate{font:800 clamp(12px,3vw,15px)/1.1 "Baloo 2",sans-serif;color:' + C.T + ';text-align:center;}'
        /* choices grid (name-to-shape / match-pair) */
        + '.pip-choices{display:flex;flex-wrap:wrap;gap:clamp(7px,2vw,12px);justify-content:center;width:100%;}'
        + '.pip-choice{width:clamp(72px,19vw,98px);aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;background:#FFF9EC;border:2px solid rgba(20,107,94,.18);border-radius:16px;cursor:pointer;touch-action:manipulation;padding:5px;}'
        + '.pip-choice .pip-exhibit{width:92%;height:92%;}.pip-choice.pip-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.22);}'
        + '.pip-choice:active{transform:scale(.96);}'
        /* confirm judge buttons */
        + '.pip-judge{flex-direction:row!important;gap:10px;justify-content:center;}'
        + '.pip-jbtn{min-height:50px;min-width:96px;padding:0 18px;border-radius:14px;border:0;color:#fff;font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;}'
        + '.pip-yes{background:' + C.T + ';box-shadow:0 3px 0 #0e4f45;}.pip-no{background:' + C.CORAL + ';box-shadow:0 3px 0 ' + C.CORAL2 + ';}.pip-jbtn:active{transform:translateY(2px);}'
        /* done */
        + '.pip-hall{display:flex;gap:3px;flex-wrap:wrap;justify-content:center;}'
        + '.pip-niche{font-size:clamp(14px,3.4vw,18px);filter:grayscale(1) opacity(.4);}.pip-niche-on{filter:none;}'
        + '.pip-ribbon{font-size:clamp(22px,6vw,30px);}'
        + '.pip-pedestal:focus-visible,.pip-choice:focus-visible,.pip-jbtn:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:760px),(max-width:480px){.pip-root{gap:5px;padding:8px;}.pip-pip{width:clamp(36px,8vw,44px);}.pip-bay{width:clamp(100px,28vw,128px);}.pip-pedestal{min-height:60px;}}'
        + '@media (max-height:640px){.pip-root{gap:2px;padding:5px;}.pip-main{gap:5px;}.pip-pip{width:clamp(30px,6.5vw,38px);}.pip-bay{width:clamp(84px,21vw,104px);}.pip-pedestal{min-height:46px;padding:3px 5px;}.pip-plate{font-size:11px;line-height:1.02;}}'
        + '@media (prefers-reduced-motion: reduce){.pip-exhibit{transition:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-pipmuseum', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'pip-museum.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function () { return 'hintCheck'; }
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
