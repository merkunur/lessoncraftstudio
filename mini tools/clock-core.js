/* =====================================================================
   CLOCK — SET-THE-TIME CORE   (clock-core.js)
   ---------------------------------------------------------------------
   E10 #1 — the SET-THE-CLOCK VERB engine. A prompt gives a target time in
   words ("half past 3"); the child DRAGS the two analog hands (radial
   drag) to set the clock, then taps Check. This instantiates CCSS 1.MD.B.3
   ("tell and write time in hours and half-hours, analog + digital").

   A genuinely NEW verb — RADIAL drag — that no existing core provides
   (number-line / ruler are linear; tap/partition/classify/array-build are
   not rotational). A READ-the-clock-and-pick activity could ride the E2
   choice-board (the E14 anchor-figure precedent); only SET warrants a new
   core, so this is it.

   CLEAN SIBLING CORE — zero lines to any of the protected cores
   (choice-board / cvc-builder / match-pairs / place-value / ten-frame /
   word-builder / fractions / array) and zero lines to lcs-shell.{js,css}.
   It mirrors their public contract (init / setupTask / render / paint /
   reset / isCorrect + an 11-locale strings dict + idempotent injectCSS) so
   a thin wrapper (clock-activity.js) merges it via Object.assign exactly
   like array-activity.js does.

   DISCRETE-STATE MODEL (clean + exactly gradeable) — the tool holds
   setHour ∈ 1..12 and setMinute ∈ {0,30} (1.MD.B.3 scope). Dragging the
   HOUR hand snaps to the nearest hour (accounting for the minute offset so
   the half-past position is unambiguous); the MINUTE hand snaps to {0,30}.
   The RENDER is COUPLED — hour-hand angle = 30·setHour + 0.5·setMinute (so
   the hour hand sits BETWEEN hours at half-past, a real clock), minute =
   6·setMinute. isCorrect = setHour==targetHour && setMinute==targetMinute
   (discrete, exact — no angle tolerance fuzz). A digital readout mirrors
   the current setting (the universal analog↔digital bridge).

   MEASURED CORRECTNESS — the time→angle math (30H+0.5M / 6M) is exact;
   scripts/verify-clock-core.js drives the real core and asserts every
   round's angles match its canonical time and the discrete grade accepts
   the right state / rejects a wrong one. The WORDED time expressions
   (timeExpr — the half-hour idiom, de "halb 4"=3:30) are native-owned +
   ensemble-verified; the gate only checks a non-empty entry exists.

   TOUCH + POINTER PARITY — radial drag uses Pointer Events (pointerdown +
   setPointerCapture → pointermove angle → pointerup) + touch-action:none
   on the hands (the sort-bins drag pattern, lifted to rotation).
   ===================================================================== */
window.ClockCore = {

  /* CURATION FLAG: title / instruction / promptSet + the 8 `timeExpr`
     worded times are the load-bearing per-locale strings. The worded times
     carry the HALF-HOUR IDIOM (de/nl/Nordic "half" = toward the NEXT hour:
     de "halb 4" = 3:30, NOT 4:30) — each native author OWNS + verifies the
     mapping per canonical time (a content decision, NOT translation). EN is
     authored here; the 10 non-EN are folded in by the per-locale native
     ensemble (§A.13.48). api.t() falls back to en until a locale lands. */
  strings: {
    title: {en:"Set the Clock",de:"Stell die Uhr",es:"Pon la hora en el reloj",pt:"Acerte o relógio",fr:"Règle l'horloge",it:"Metti l'ora sull'orologio",nl:"Zet de klok goed",sv:"Ställ klockan",da:"Stil uret",no:"Still klokka",fi:"Aseta kello"},
    instruction: {en:"Drag the clock hands to show the time. The short hand is the hour, the long hand is the minutes. Tap Check when you're ready.",de:"Zieh die Zeiger der Uhr auf die richtige Zeit. Der kurze Zeiger zeigt die Stunde, der lange Zeiger die Minuten. Tippe auf Prüfen, wenn du fertig bist.",es:"Arrastra las manecillas del reloj para mostrar la hora. La manecilla corta marca la hora y la larga marca los minutos. Toca Revisar cuando estés listo.",pt:"Arraste os ponteiros do relógio para mostrar a hora. O ponteiro curto marca as horas, o ponteiro comprido marca os minutos. Toque em Verificar quando estiver pronto.",fr:"Fais glisser les aiguilles de l'horloge pour afficher l'heure. La petite aiguille montre les heures, la grande aiguille montre les minutes. Appuie sur Vérifier quand tu es prêt.",it:"Trascina le lancette dell'orologio per mostrare l'ora. La lancetta corta segna le ore, la lancetta lunga segna i minuti. Tocca Controlla quando sei pronto.",nl:"Sleep de wijzers van de klok naar de juiste tijd. De korte wijzer is voor de uren, de lange wijzer voor de minuten. Tik op Nakijken als je klaar bent.",sv:"Dra visarna på klockan så att de visar rätt tid. Den korta visaren är timmen, den långa visaren är minuterna. Tryck på Kolla när du är klar.",da:"Træk viserne på uret, så de viser klokken. Den korte viser er timerne, og den lange viser er minutterne. Tryk på Tjek, når du er klar.",no:"Dra på viserne for å vise tiden. Den korte viseren er timen, den lange viseren er minuttene. Trykk på Sjekk når du er klar.",fi:"Vedä kellon viisarit näyttämään oikeaa aikaa. Lyhyt viisari näyttää tunnit, pitkä viisari minuutit. Paina Tarkista, kun olet valmis."},
    /* per-task prompt — {time} is the localized worded time (promptArgs) */
    promptSet: {en:"Set the clock to {time}.",de:"Stell die Uhr auf {time}.",es:"Pon el reloj en {time}.",pt:"Coloque o relógio em {time}.",fr:"Règle l'horloge sur {time}.",it:"Metti l'orologio su {time}.",nl:"Zet de klok op {time}.",sv:"Ställ klockan på {time}.",da:"Stil uret på {time}.",no:"Still klokka på {time}.",fi:"Aseta kello näyttämään: {time}."},
    /* the 8 canonical times, keyed "H:MM" → worded expression. THE HALF-HOUR
       IDIOM lives here — toward-next-hour for de/nl/sv/da/no/fi (7:30="halb/half/halv/puoli 8"),
       current-hour+half for es/pt/fr/it (7:30="siete y media"/"sept heures et demie"). */
    timeExpr: {
      "3:00":  {en:"3 o'clock",de:"3 Uhr",es:"las tres en punto",pt:"três horas",fr:"trois heures",it:"le tre",nl:"3 uur",sv:"3",da:"klokken 3",no:"3",fi:"kello 3"},
      "7:30":  {en:"half past 7",de:"halb 8",es:"las siete y media",pt:"sete e meia",fr:"sept heures et demie",it:"le sette e mezza",nl:"half 8",sv:"halv 8",da:"halv 8",no:"halv 8",fi:"puoli 8"},
      "9:00":  {en:"9 o'clock",de:"9 Uhr",es:"las nueve en punto",pt:"nove horas",fr:"neuf heures",it:"le nove",nl:"9 uur",sv:"9",da:"klokken 9",no:"9",fi:"kello 9"},
      "6:30":  {en:"half past 6",de:"halb 7",es:"las seis y media",pt:"seis e meia",fr:"six heures et demie",it:"le sei e mezza",nl:"half 7",sv:"halv 7",da:"halv 7",no:"halv 7",fi:"puoli 7"},
      "12:00": {en:"12 o'clock",de:"12 Uhr",es:"las doce en punto",pt:"meio-dia",fr:"midi",it:"mezzogiorno",nl:"12 uur",sv:"12",da:"klokken 12",no:"12",fi:"kello 12"},
      "4:30":  {en:"half past 4",de:"halb 5",es:"las cuatro y media",pt:"quatro e meia",fr:"quatre heures et demie",it:"le quattro e mezza",nl:"half 5",sv:"halv 5",da:"halv 5",no:"halv 5",fi:"puoli 5"},
      "10:00": {en:"10 o'clock",de:"10 Uhr",es:"las diez en punto",pt:"dez horas",fr:"dix heures",it:"le dieci",nl:"10 uur",sv:"10",da:"klokken 10",no:"10",fi:"kello 10"},
      "1:30":  {en:"half past 1",de:"halb 2",es:"la una y media",pt:"uma e meia",fr:"une heure et demie",it:"l'una e mezza",nl:"half 2",sv:"halv 2",da:"halv 2",no:"halv 2",fi:"puoli 2"}
    },
    hintWrong: {en:"Not yet — the short hand points to the hour, the long hand to the minutes.",de:"Noch nicht ganz – der kurze Zeiger zeigt auf die Stunde, der lange Zeiger auf die Minuten.",es:"Casi. Fíjate bien: la manecilla corta marca la hora y la larga marca los minutos. ¡Inténtalo otra vez!",pt:"Quase! Olhe de novo onde cada ponteiro precisa apontar e tente outra vez.",fr:"Pas tout à fait ! Regarde bien où pointent les aiguilles, puis essaie encore.",it:"Quasi! Guarda bene dove indicano le lancette e prova di nuovo.",nl:"Nog niet — de korte wijzer wijst naar het uur, de lange wijzer naar de minuten.",sv:"Inte än — den korta visaren pekar på timmen, den långa visaren på minuterna.",da:"Ikke helt endnu. Husk: den korte viser peger på timen, og den lange viser peger på minutterne. Prøv igen!",no:"Nesten! Se godt på viserne og prøv en gang til.",fi:"Melkein! Katso tarkkaan, mihin lyhyt ja pitkä viisari osoittavat, ja yritä uudelleen."},
    /* screen-reader labels */
    srClock: {en:"clock face",de:"Zifferblatt",es:"Reloj analógico con manecillas que puedes mover.",pt:"Relógio analógico com ponteiros que você pode arrastar",fr:"Horloge à aiguilles",it:"Orologio analogico con le lancette delle ore e dei minuti",nl:"wijzerplaat",sv:"Analog klocka med en kort timvisare och en lång minutvisare.",da:"Analogt ur, hvor du kan trække viserne",no:"Analog klokke med to visere du kan dra på.",fi:"kellotaulu"},
    srHourHand: {en:"hour hand",de:"Stundenzeiger",es:"Manecilla corta de la hora.",pt:"Ponteiro das horas (o curto)",fr:"Petite aiguille des heures",it:"Lancetta delle ore, quella corta",nl:"uurwijzer",sv:"Kort visare som visar timmen.",da:"Den korte viser (timeviseren)",no:"Kort viser som peker på timen.",fi:"tuntiviisari"},
    srMinuteHand: {en:"minute hand",de:"Minutenzeiger",es:"Manecilla larga de los minutos.",pt:"Ponteiro dos minutos (o comprido)",fr:"Grande aiguille des minutes",it:"Lancetta dei minuti, quella lunga",nl:"minutenwijzer",sv:"Lång visare som visar minuterna.",da:"Den lange viser (minutviseren)",no:"Lang viser som peker på minuttene.",fi:"minuuttiviisari"}
  },

  defaults: {},
  /* No settings drawer — the set task has no operator-facing options. */

  /* ---- design-system constants (Direction A teal) ---- */
  _C: { T: '#146B5E', FACE: '#FBF3E4', RIM: '#146B5E', HOUR: '#146B5E', MIN: '#F2784B', TICK: '#146B5E', NUM: '#146B5E' },

  /* ---- state + setup ---- */
  init: function (api) {
    this.api = api;
    this.targetHour = 3; this.targetMinute = 0;   // this round's answer
    this.setHour = 12; this.setMinute = 0;        // the child's current setting
    this.readOnly = false;
    this._svg = null; this._hourEl = null; this._minEl = null; this._readoutEl = null;
  },

  /* opts = { hour:1..12, minute:0|30, seed }. (seed accepted for signature
     parity; the clock layout is deterministic.) Start the hands at a neutral
     12:00 (or 6:00 when the target IS 12:00) so the child always sets it. */
  setupTask: function (opts) {
    opts = opts || {};
    this.targetHour = opts.hour || 3;
    this.targetMinute = (opts.minute === 30) ? 30 : 0;
    this.setHour = (this.targetHour === 12 && this.targetMinute === 0) ? 6 : 12;
    this.setMinute = 0;
    this.readOnly = false;
  },

  /* ---- the coupled hand angles (clockwise from 12 o'clock) ---- */
  _handAngles: function () {
    return {
      hour: ((30 * this.setHour + 0.5 * this.setMinute) % 360 + 360) % 360,
      minute: ((6 * this.setMinute) % 360 + 360) % 360
    };
  },
  /* the canonical target's exact angles — used by the build-time gate */
  targetAngles: function () {
    return {
      hour: ((30 * this.targetHour + 0.5 * this.targetMinute) % 360 + 360) % 360,
      minute: ((6 * this.targetMinute) % 360 + 360) % 360
    };
  },

  /* pointer (clientX,clientY) → angle in degrees, clockwise from 12 o'clock.
     The viewBox is square so the SVG's screen-rect centre IS the clock
     centre (50,50). */
  _angleFromPointer: function (cx, cy) {
    var r = this._svg.getBoundingClientRect();
    var dx = cx - (r.left + r.width / 2);
    var dy = cy - (r.top + r.height / 2);
    var a = Math.atan2(dx, -dy) * 180 / Math.PI;   // 0 at top, clockwise
    return (a + 360) % 360;
  },
  _circDist: function (a, b) { var d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; },
  /* snap a dragged angle to the nearest HOUR (1..12), accounting for the
     current minute offset so the half-past hand position is unambiguous. */
  _snapHour: function (angle) {
    var best = 1, bestD = 999;
    for (var h = 1; h <= 12; h++) {
      var target = ((30 * h + 0.5 * this.setMinute) % 360 + 360) % 360;
      var d = this._circDist(angle, target);
      if (d < bestD) { bestD = d; best = h; }
    }
    return best;
  },
  /* snap a dragged angle to the nearest of {0,30} (o'clock / half-past) */
  _snapMinute: function (angle) {
    return (this._circDist(angle, 180) < this._circDist(angle, 0)) ? 30 : 0;
  },

  /* ---- render(): build the clock face + two draggable hands + readout ---- */
  render: function () {
    this.injectCSS();
    var api = this.api, self = this, C = this._C;
    var stage = api.stage;
    stage.innerHTML = '';

    var wrap = api.el('div', 'clk-wrap');

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('class', 'clk-svg');
    svg.setAttribute('role', 'group');
    svg.setAttribute('aria-label', api.t('srClock'));
    this._svg = svg;

    var ns = 'http://www.w3.org/2000/svg';
    function elNS(tag, attrs) { var e = document.createElementNS(ns, tag); for (var k in attrs) { if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); } return e; }

    /* face */
    svg.appendChild(elNS('circle', { cx: 50, cy: 50, r: 46, fill: C.FACE, stroke: C.RIM, 'stroke-width': 3 }));
    /* ticks + numerals */
    for (var i = 1; i <= 12; i++) {
      var a = 30 * i * Math.PI / 180;
      var big = (i % 3 === 0);
      var r1 = big ? 38 : 41, r2 = 45;
      svg.appendChild(elNS('line', {
        x1: (50 + r1 * Math.sin(a)).toFixed(2), y1: (50 - r1 * Math.cos(a)).toFixed(2),
        x2: (50 + r2 * Math.sin(a)).toFixed(2), y2: (50 - r2 * Math.cos(a)).toFixed(2),
        stroke: C.TICK, 'stroke-width': big ? 2 : 1, 'stroke-linecap': 'round', opacity: big ? 0.9 : 0.45
      }));
      var nx = 50 + 33 * Math.sin(a), ny = 50 - 33 * Math.cos(a);
      var num = elNS('text', { x: nx.toFixed(2), y: ny.toFixed(2), 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: C.NUM, 'font-size': 8, 'font-weight': 700, 'font-family': 'var(--lcs-font-ui,"Nunito",system-ui,sans-serif)' });
      num.textContent = String(i);
      svg.appendChild(num);
    }

    /* hands — each is a <g> (visible hand + fat transparent hit line) rotated
       about the centre. */
    this._hourEl = this._makeHand('hour', 26, 4.5, C.HOUR, api.t('srHourHand'));
    this._minEl = this._makeHand('minute', 38, 3, C.MIN, api.t('srMinuteHand'));
    svg.appendChild(this._hourEl.g);
    svg.appendChild(this._minEl.g);
    /* centre cap (above the hands) */
    svg.appendChild(elNS('circle', { cx: 50, cy: 50, r: 3.4, fill: C.T }));

    wrap.appendChild(svg);

    /* digital readout — mirrors the current setting */
    var read = api.el('div', 'clk-readout');
    read.setAttribute('aria-hidden', 'true');
    this._readoutEl = read;
    wrap.appendChild(read);

    stage.appendChild(wrap);
    this._wireHand(this._hourEl, 'hour');
    this._wireHand(this._minEl, 'minute');
    this.paint();
  },

  _makeHand: function (which, len, w, color, label) {
    var ns = 'http://www.w3.org/2000/svg';
    var g = document.createElementNS(ns, 'g');
    g.setAttribute('class', 'clk-hand clk-hand-' + which);
    g.setAttribute('role', 'button');
    g.setAttribute('tabindex', '0');
    g.setAttribute('aria-label', label);
    var vis = document.createElementNS(ns, 'line');
    vis.setAttribute('x1', 50); vis.setAttribute('y1', 50);
    vis.setAttribute('x2', 50); vis.setAttribute('y2', 50 - len);
    vis.setAttribute('stroke', color); vis.setAttribute('stroke-width', w);
    vis.setAttribute('stroke-linecap', 'round'); vis.setAttribute('class', 'clk-hand-vis');
    var hit = document.createElementNS(ns, 'line');
    hit.setAttribute('x1', 50); hit.setAttribute('y1', 50);
    hit.setAttribute('x2', 50); hit.setAttribute('y2', 50 - len);
    hit.setAttribute('stroke', 'transparent'); hit.setAttribute('stroke-width', 16);
    hit.setAttribute('stroke-linecap', 'round'); hit.setAttribute('class', 'clk-hand-hit');
    g.appendChild(hit); g.appendChild(vis);
    return { g: g, vis: vis, hit: hit };
  },

  /* ---- radial drag (mouse + touch parity) ---- */
  _wireHand: function (hand, which) {
    var self = this, g = hand.g;
    g.addEventListener('pointerdown', function (e) {
      if (self.readOnly) return;
      if (e.button != null && e.button !== 0 && e.pointerType === 'mouse') return;
      e.preventDefault();
      try { g.setPointerCapture(e.pointerId); } catch (err) {}
      self._dragMove(which, e.clientX, e.clientY);
      function onMove(ev) { ev.preventDefault(); self._dragMove(which, ev.clientX, ev.clientY); }
      function onUp(ev) {
        g.removeEventListener('pointermove', onMove);
        g.removeEventListener('pointerup', onUp);
        g.removeEventListener('pointercancel', onUp);
        try { g.releasePointerCapture(ev.pointerId); } catch (err) {}
      }
      g.addEventListener('pointermove', onMove);
      g.addEventListener('pointerup', onUp);
      g.addEventListener('pointercancel', onUp);
    });
    /* keyboard fallback: Enter/Space steps the hand (hour +1 / minute toggle) */
    g.addEventListener('keydown', function (e) {
      if (self.readOnly) return;
      if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
      e.preventDefault();
      if (which === 'hour') self.setHour = (self.setHour % 12) + 1;
      else self.setMinute = (self.setMinute === 0) ? 30 : 0;
      if (self.api && self.api.sound) self.api.sound(640);
      self.paint();
    });
  },

  _dragMove: function (which, cx, cy) {
    if (this.readOnly) return;
    var angle = this._angleFromPointer(cx, cy);
    if (which === 'hour') this.setHour = this._snapHour(angle);
    else this.setMinute = this._snapMinute(angle);
    if (this.api && this.api.sound) this.api.sound(which === 'hour' ? 560 : 720);
    if (this.api && this.api.track) this.api.track('sethand', { hand: which, hour: this.setHour, minute: this.setMinute });
    this.paint();
  },

  /* ---- paint(): rotate the hands to the coupled angles + update readout ---- */
  paint: function () {
    if (!this._svg) return;
    var ang = this._handAngles();
    if (this._hourEl) this._hourEl.g.setAttribute('transform', 'rotate(' + ang.hour.toFixed(2) + ' 50 50)');
    if (this._minEl) this._minEl.g.setAttribute('transform', 'rotate(' + ang.minute.toFixed(2) + ' 50 50)');
    if (this._readoutEl) {
      var mm = (this.setMinute < 10 ? '0' : '') + this.setMinute;
      this._readoutEl.textContent = this.setHour + ':' + mm;
    }
    if (this._svg) {
      if (this.readOnly) this._svg.classList.add('clk-locked');
      else this._svg.classList.remove('clk-locked');
    }
    if (this.api && this.api.announce) this.api.announce(this.setHour + ':' + ((this.setMinute < 10 ? '0' : '') + this.setMinute));
  },

  /* correctness = the set time exactly equals the target (discrete) */
  isCorrect: function () {
    return this.setHour === this.targetHour && this.setMinute === this.targetMinute;
  },

  reset: function () {
    this.setHour = (this.targetHour === 12 && this.targetMinute === 0) ? 6 : 12;
    this.setMinute = 0; this.readOnly = false; this.paint();
  },

  /* ---- stage CSS — idempotent. Clock max-width:min(78vw,300px) so it never
     overflows 280-768px (vw per §A.13.47 rule 1; !important per rule 6).
     Hands carry touch-action:none so a radial drag never scrolls. ---- */
  _cssInjected: false,
  injectCSS: function () {
    if (this._cssInjected) return;
    this._cssInjected = true;
    var C = this._C;
    var css = ''
      + '.clk-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;}'
      + '.clk-svg{width:min(78vw,300px)!important;height:auto!important;aspect-ratio:1!important;'
      +   'display:block;touch-action:none;}'
      + '.clk-hand{cursor:grab;touch-action:none;}'
      + '.clk-hand:focus-visible{outline:none;}'
      + '.clk-hand:focus-visible .clk-hand-vis{stroke-width:6;}'
      + '.clk-hand-vis{transition:stroke-width .1s var(--lcs-ease);pointer-events:none;}'
      + '.clk-hand-hit{cursor:grab;}'
      + '.clk-svg.clk-locked .clk-hand{cursor:default;}'
      + '.clk-svg.clk-locked .clk-hand-hit{pointer-events:none;}'
      /* digital readout */
      + '.clk-readout{font:800 30px/1 var(--lcs-font-display,"Baloo 2",system-ui,sans-serif);'
      +   'color:' + C.T + ';background:#fff;border:2px solid ' + C.T + ';border-radius:14px;'
      +   'padding:4px 18px;min-width:84px;text-align:center;letter-spacing:1px;'
      +   'box-shadow:0 1px 3px rgba(20,107,94,.18);}';
    var tag = document.createElement('style');
    tag.setAttribute('data-clock-core', '');
    tag.textContent = css;
    document.head.appendChild(tag);
  }
};
