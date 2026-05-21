/* =====================================================================
   TOOL #3 — RULER   (ruler.js)
   ---------------------------------------------------------------------
   Second draggable-value tool. Consumes LCS.drag.linear (promoted from
   the number line in this same commission).

   PEDAGOGY (standard): a fixed ruler at the top; an "object" below with
   two draggable handles (start + end) connected by a visible bar. The
   measured length is end − start, displayed in the chosen unit. K-1
   children practice measuring from a NON-ZERO start, which is why both
   handles are independently draggable.

   Tick density:
     cm  → 0..30; minor tick every mm, major + label every cm.
            Narrow-width fallback (<480px): minor every 5mm.
     in  → 0..12; minor tick every 1/8 in, major + label every inch.

   On unit switch, start/end are PROPORTIONALLY CONVERTED (kept at the
   same percentage of the ruler) and snapped to the new unit's grid.
   This teaches that the same length is expressed differently in
   different units — pedagogically richer than reset-on-switch.
   ===================================================================== */
var Ruler = {
  id: 'ruler',

  /* CURATION FLAG: the math/measurement terms (title, length, unit
     names) deserve a native pass — Nordic + Finnish especially. The
     unit suffixes 'cm' / 'in' stay LITERAL because they are SI / Imperial
     abbreviations and appear identically on EU + US classroom rulers. */
  strings: {
    title:       {en:'Ruler',de:'Lineal',fr:'Règle',it:'Righello',es:'Regla',pt:'Régua',nl:'Liniaal',sv:'Linjal',da:'Lineal',no:'Linjal',fi:'Viivain'},
    instruction: {en:'Drag the handles to measure the object.',de:'Ziehe die Griffe, um das Objekt zu messen.',fr:'Déplace les poignées pour mesurer l\'objet.',it:'Trascina le maniglie per misurare l\'oggetto.',es:'Arrastra los tiradores para medir el objeto.',pt:'Arraste as alças para medir o objeto.',nl:'Sleep de grepen om het object te meten.',sv:'Dra i handtagen för att mäta objektet.',da:'Træk i håndtagene for at måle objektet.',no:'Dra i håndtakene for å måle objektet.',fi:'Vedä kahvoista mitataksesi esinettä.'},
    length:      {en:'Length',de:'Länge',fr:'Longueur',it:'Lunghezza',es:'Longitud',pt:'Comprimento',nl:'Lengte',sv:'Längd',da:'Længde',no:'Lengde',fi:'Pituus'},
    units:       {en:'Units',de:'Einheiten',fr:'Unités',it:'Unità',es:'Unidades',pt:'Unidades',nl:'Eenheden',sv:'Enheter',da:'Enheder',no:'Enheter',fi:'Yksiköt'},
    unitsCm:     {en:'Centimetres',de:'Zentimeter',fr:'Centimètres',it:'Centimetri',es:'Centímetros',pt:'Centímetros',nl:'Centimeters',sv:'Centimeter',da:'Centimeter',no:'Centimeter',fi:'Senttimetrit'},
    unitsInch:   {en:'Inches',de:'Zoll',fr:'Pouces',it:'Pollici',es:'Pulgadas',pt:'Polegadas',nl:'Inches',sv:'Tum',da:'Tommer',no:'Tommer',fi:'Tuumat'},
    shape:       {en:'Handle shape',de:'Griffform',fr:'Forme des poignées',it:'Forma maniglie',es:'Forma de tiradores',pt:'Forma das alças',nl:'Vorm van grepen',sv:'Handtagsform',da:'Håndtagsform',no:'Håndtaksform',fi:'Kahvan muoto'},
    shapeDot:    {en:'Dot',de:'Punkt',fr:'Point',it:'Punto',es:'Punto',pt:'Ponto',nl:'Stip',sv:'Prick',da:'Prik',no:'Prikk',fi:'Piste'},
    shapeHeart:  {en:'Heart',de:'Herz',fr:'Cœur',it:'Cuore',es:'Corazón',pt:'Coração',nl:'Hart',sv:'Hjärta',da:'Hjerte',no:'Hjerte',fi:'Sydän'},
    shapeStar:   {en:'Star',de:'Stern',fr:'Étoile',it:'Stella',es:'Estrella',pt:'Estrela',nl:'Ster',sv:'Stjärna',da:'Stjerne',no:'Stjerne',fi:'Tähti'},
    color:       {en:'Handle colour',de:'Grifffarbe',fr:'Couleur des poignées',it:'Colore maniglie',es:'Color de tiradores',pt:'Cor das alças',nl:'Kleur van grepen',sv:'Handtagsfärg',da:'Håndtagsfarve',no:'Håndtaksfarge',fi:'Kahvan väri'},
    showNumber:  {en:'Show length',de:'Länge anzeigen',fr:'Afficher la longueur',it:'Mostra lunghezza',es:'Mostrar longitud',pt:'Mostrar comprimento',nl:'Lengte tonen',sv:'Visa längd',da:'Vis længde',no:'Vis lengde',fi:'Näytä pituus'},
    startHandle: {en:'Start handle',de:'Anfangsgriff',fr:'Poignée de début',it:'Maniglia di inizio',es:'Tirador de inicio',pt:'Alça de início',nl:'Beginpunt',sv:'Starthandtag',da:'Starthåndtag',no:'Starthåndtak',fi:'Aloituskahva'},
    endHandle:   {en:'End handle',de:'Endgriff',fr:'Poignée de fin',it:'Maniglia di fine',es:'Tirador de fin',pt:'Alça de fim',nl:'Eindpunt',sv:'Sluthandtag',da:'Sluthåndtag',no:'Slutthåndtak',fi:'Lopetuskahva'}
  },

  defaults: { units: 'cm', shape: 'dot', color: '#F2784B', showNumber: true },

  settings: [
    { key:'units', type:'choice', labelKey:'units', options:[
        { value:'cm',   labelKey:'unitsCm'   },
        { value:'inch', labelKey:'unitsInch' }
    ]},
    { key:'shape', type:'choice', labelKey:'shape', options:[
        { value:'dot',   labelKey:'shapeDot'   },
        { value:'heart', labelKey:'shapeHeart' },
        { value:'star',  labelKey:'shapeStar'  }
    ]},
    { key:'color', type:'color', labelKey:'color',
      options:['#F2784B','#1B9E8F','#3E78C9','#E5536F','#7B5BD6','#2A2A35'] },
    { key:'showNumber', type:'toggle', labelKey:'showNumber' }
  ],

  /* ---- per-unit constants ---- */
  unitMax:  function (u) { return u === 'inch' ? 12 : 30; },
  unitStep: function (u) { return u === 'inch' ? 0.125 : 0.1; },
  unitSuffix: function (u) { return u === 'inch' ? 'in' : 'cm'; },

  /* Snap value to current unit's grid; trims float drift. */
  snap: function (v) {
    var step = this.unitStep(this.api.settings.units);
    var inv = Math.round(1 / step);
    var snapped = Math.round(v * inv) / inv;
    return snapped;
  },

  /* Format the measured length for display + announce.
       cm   → "5", "5.3", "0", "30"
       inch → "5", "5 1/2", "5 1/8", "0", "12"            (reduced fractions) */
  formatLength: function (v) {
    var u = this.api.settings.units;
    if (u === 'inch') {
      var eighths = Math.round(v * 8);
      var whole = Math.floor(eighths / 8);
      var frac = eighths % 8;
      if (frac === 0) return whole + ' in';
      /* reduce 2/8→1/4, 4/8→1/2, 6/8→3/4 */
      var num = frac, den = 8;
      while ((num % 2) === 0 && (den % 2) === 0) { num /= 2; den /= 2; }
      return (whole > 0 ? whole + ' ' : '') + num + '/' + den + ' in';
    }
    /* cm: 1 decimal place, trimmed when 0 */
    var mm = Math.round(v * 10);
    var w = Math.floor(mm / 10);
    var d = mm % 10;
    if (d === 0) return w + ' cm';
    return w + '.' + d + ' cm';
  },

  /* ---- state + setup ---- */
  init: function (api) {
    this.api = api;
    this.start = 0;
    this.end = 5;
    this._lastShape = null;
    this._lastColor = null;
  },

  min:    function () { return 0; },
  max:    function () { return this.unitMax(this.api.settings.units); },
  step:   function () { return this.unitStep(this.api.settings.units); },
  length: function () { return this.end - this.start; },

  /* Setters clamp against the OTHER handle's current value, snap, and
     paint() (never render()). Sound: pop up/down by direction. */
  setStart: function (v) {
    v = Math.max(this.min(), Math.min(this.end, this.snap(v)));
    if (v === this.start) return false;
    this.api.sound(v > this.start ? 760 : 380);
    this.start = v;
    this.paint();
    this.api.track('start', { value: v });
    return true;
  },
  setEnd: function (v) {
    v = Math.max(this.start, Math.min(this.max(), this.snap(v)));
    if (v === this.end) return false;
    this.api.sound(v > this.end ? 760 : 380);
    this.end = v;
    this.paint();
    this.api.track('end', { value: v });
    return true;
  },

  /* pointer-x → real value, mapped against the WHOLE ruler-area rect */
  pxToValue: function (px, rect) {
    if (!rect.width) return this.start;
    var pct = Math.max(0, Math.min(1, (px - rect.left) / rect.width));
    return this.min() + pct * (this.max() - this.min());
  },
  valueToPct: function (v) {
    var span = this.max() - this.min();
    return span ? ((v - this.min()) / span) * 100 : 0;
  },

  /* ---- render(): build the skeleton ONCE per (init | settings change) ---- */
  render: function () {
    var s = this.api.settings, self = this;
    var stage = this.api.stage;
    stage.innerHTML = '';
    var t = function (k) { return self.api.t(k); };

    var min = this.min(), max = this.max(), span = max - min || 1;
    var step = this.step();

    /* Narrow-width fallback for cm only (inch density is fine at 360px) */
    var stageW = stage.clientWidth || (stage.getBoundingClientRect ? stage.getBoundingClientRect().width : 0) || 800;
    var narrow = (s.units === 'cm' && stageW < 480);

    /* tick layout in SVG viewBox units */
    var VB_W = 1000, VB_H = 100, INSET = 18;
    var xRange = VB_W - 2 * INSET;
    var yBaseline = 50;
    var yMajorTop = 18, yMajorBot = yBaseline;
    var yMinorTop = 34, yMinorBot = yBaseline;
    var yLabel = 12;

    /* Tick generation: walk in step-sized increments (mm or 1/8 in).      */
    var totalSteps = Math.round(span / step);
    var labelEvery = 1;                       // logical "1 unit" = labelEvery steps
    if (s.units === 'cm')   labelEvery = 10;  // every cm
    if (s.units === 'inch') labelEvery = 8;   // every inch

    /* In narrow cm mode, only render minor ticks every 5 mm.              */
    var minorVisibleEvery = narrow ? 5 : 1;

    var svgParts = [
      '<svg class="rl-svg" viewBox="0 0 ' + VB_W + ' ' + VB_H + '" ',
      'preserveAspectRatio="none" aria-hidden="true">',
      /* paper-tape backdrop */
      '<rect class="rl-tape" x="' + INSET + '" y="2" ',
      'width="' + xRange + '" height="' + (yBaseline - 2) + '" />',
      /* baseline */
      '<line class="rl-baseline" x1="' + INSET + '" y1="' + yBaseline + '" ',
      'x2="' + (VB_W - INSET) + '" y2="' + yBaseline + '" />'
    ];
    for (var i = 0; i <= totalSteps; i += 1) {
      var isMajor = (i % labelEvery === 0);
      if (!isMajor && (i % minorVisibleEvery !== 0)) continue;
      var x = INSET + (i / totalSteps) * xRange;
      var y1 = isMajor ? yMajorTop : yMinorTop;
      svgParts.push(
        '<line class="rl-tick' + (isMajor ? ' major' : '') + '" ' +
        'x1="' + x + '" y1="' + y1 + '" x2="' + x + '" y2="' + yBaseline + '" />'
      );
      if (isMajor) {
        var label = Math.round(i / labelEvery);
        svgParts.push(
          '<text class="rl-label" x="' + x + '" y="' + yLabel + '" ' +
          'text-anchor="middle">' + label + '</text>'
        );
      }
    }
    svgParts.push('</svg>');

    /* outer wrap */
    var wrap = this.api.el('div', 'rl-wrap');

    /* readout above ruler */
    var readout = null;
    if (s.showNumber) {
      readout = this.api.el('div', 'rl-readout');
      var lbl = this.api.el('span', 'rl-readout-label');
      lbl.textContent = t('length');
      var num = this.api.el('span', 'rl-readout-num');
      readout.append(lbl, num);
      wrap.appendChild(readout);
      this.readoutNumEl = num;
    } else {
      this.readoutNumEl = null;
    }

    /* ruler area: contains SVG + bar + two handles */
    var area = this.api.el('div', 'rl-area');
    area.innerHTML = svgParts.join('');

    /* object bar between the handles */
    var bar = this.api.el('div', 'rl-bar');
    bar.setAttribute('aria-hidden', 'true');
    area.appendChild(bar);

    /* helper to build a handle */
    function makeHandle(role) {
      var h = self.api.el('button', 'rl-handle rl-handle-' + role);
      h.type = 'button';
      h.setAttribute('role', 'slider');
      h.setAttribute('aria-orientation', 'horizontal');
      h.setAttribute('aria-label', role === 'start' ? t('startHandle') : t('endHandle'));
      h.tabIndex = 0;
      return h;
    }
    var startHandle = makeHandle('start');
    var endHandle   = makeHandle('end');
    area.append(startHandle, endHandle);

    wrap.append(area);
    stage.appendChild(wrap);

    /* cache refs */
    this.rulerEl     = area;
    this.barEl       = bar;
    this.startHandleEl = startHandle;
    this.endHandleEl   = endHandle;
    this._lastShape  = null;
    this._lastColor  = null;

    /* ---- drag via shared shell helper ----
       Each handle owns its own LCS.drag.linear instance, with min/max set
       relative to the OTHER handle. valueFromPointer reads the ruler-area's
       rect (NOT the small handle rect) so the value tracks the full bar.   */
    function dragHandle(handleEl, role) {
      LCS.drag.linear(handleEl, {
        min: 0,
        max: max,        // per-handle clamp also enforced in setStart/setEnd
        step: step,
        valueFromPointer: function (clientX) {
          return self.pxToValue(clientX, self.rulerEl.getBoundingClientRect());
        },
        onChange: function (v, phase) {
          if (phase === 'start') {
            handleEl.classList.add('dragging');
            handleEl.focus();
          } else if (phase === 'end') {
            handleEl.classList.remove('dragging');
          }
          if (role === 'start') self.setStart(v); else self.setEnd(v);
        }
      });
    }
    dragHandle(startHandle, 'start');
    dragHandle(endHandle,   'end');

    /* ---- keyboard on each handle ----
       Smallest-unit step on arrows; ±1 unit on PageUp/Down; Home/End hit
       the handle's per-handle extremes (start can't exceed end + vice versa). */
    function keyHandler(role) {
      return function (e) {
        var k = e.key, handled = true;
        var v = (role === 'start') ? self.start : self.end;
        var set = (role === 'start') ? self.setStart.bind(self) : self.setEnd.bind(self);
        if (k === 'ArrowLeft'  || k === 'ArrowDown')   set(v - self.step());
        else if (k === 'ArrowRight' || k === 'ArrowUp')set(v + self.step());
        else if (k === 'PageDown')                     set(v - 1);
        else if (k === 'PageUp')                       set(v + 1);
        else if (k === 'Home')                         set(role === 'start' ? self.min() : self.start);
        else if (k === 'End')                          set(role === 'start' ? self.end : self.max());
        else handled = false;
        if (handled) e.preventDefault();
      };
    }
    startHandle.addEventListener('keydown', keyHandler('start'));
    endHandle.addEventListener('keydown', keyHandler('end'));

    this.paint();
  },

  /* ---- paint(): mutate cached refs only ---- */
  paint: function () {
    var s = this.api.settings;
    var pctStart = this.valueToPct(this.start);
    var pctEnd   = this.valueToPct(this.end);
    var max = this.max();

    /* re-token handles only when shape/color actually changed */
    if (s.shape !== this._lastShape || s.color !== this._lastColor) {
      var svg = this.api.token(s.shape, s.color, 32);
      this.startHandleEl.innerHTML = svg;
      this.endHandleEl.innerHTML   = svg;
      this.barEl.style.background  = s.color;   // ribbon body matches handle colour
      this._lastShape = s.shape;
      this._lastColor = s.color;
    }

    /* position handles */
    this.startHandleEl.style.left = pctStart + '%';
    this.endHandleEl.style.left   = pctEnd   + '%';

    /* object bar between handles */
    this.barEl.style.left  = pctStart + '%';
    this.barEl.style.width = (pctEnd - pctStart) + '%';

    /* per-handle ARIA: start's max = end; end's min = start */
    this.startHandleEl.setAttribute('aria-valuemin', '0');
    this.startHandleEl.setAttribute('aria-valuemax', String(this.end));
    this.startHandleEl.setAttribute('aria-valuenow', String(this.start));
    this.endHandleEl.setAttribute('aria-valuemin', String(this.start));
    this.endHandleEl.setAttribute('aria-valuemax', String(max));
    this.endHandleEl.setAttribute('aria-valuenow', String(this.end));

    var lenText = this.formatLength(this.length());
    var startText = this.formatLength(this.start);
    var endText = this.formatLength(this.end);
    this.startHandleEl.setAttribute('aria-valuetext', this.api.t('startHandle') + ' ' + startText);
    this.endHandleEl.setAttribute('aria-valuetext',   this.api.t('endHandle')   + ' ' + endText);

    if (this.readoutNumEl) this.readoutNumEl.textContent = lenText;
    this.api.announce(this.api.t('length') + ': ' + lenText);
  },

  /* On unit switch, keep positions proportional and snap. */
  onSettings: function (key, val) {
    if (key === 'units') {
      var oldUnits = (val === 'cm') ? 'inch' : 'cm';
      var oldMax = this.unitMax(oldUnits);
      var newMax = this.unitMax(val);
      var pctStart = this.start / oldMax;
      var pctEnd   = this.end   / oldMax;
      /* temporarily set new units so snap() reads the right step */
      this.api.settings.units = val;
      this.start = Math.max(0, Math.min(newMax, this.snap(pctStart * newMax)));
      this.end   = Math.max(this.start, Math.min(newMax, this.snap(pctEnd * newMax)));
    }
  },

  reset: function () {
    this.start = 0;
    this.end = 5;
    this.paint();
    this.api.sound(380);
  }
};

/* per-tool styling: STAGE ONLY. Consume shell tokens only.                */
(function injectCSS() {
  var css = ''
  + '.rl-wrap{display:flex;flex-direction:column;align-items:stretch;'
  +   'gap:clamp(12px,2vmin,20px);width:min(900px,100%);}'
  /* readout */
  + '.rl-readout{align-self:center;display:inline-flex;align-items:center;gap:14px;'
  +   'background:var(--lcs-surface);padding:8px 22px;border-radius:var(--lcs-radius-pill);'
  +   'box-shadow:var(--lcs-shadow-sm);}'
  + '.rl-readout-label{font-weight:700;color:var(--lcs-ink-soft);text-transform:uppercase;'
  +   'letter-spacing:.06em;font-size:13px;}'
  + '.rl-readout-num{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(22px,4vmin,32px);color:var(--lcs-structure);min-width:2.4em;'
  +   'text-align:center;}'
  /* ruler area */
  + '.rl-area{position:relative;height:clamp(120px,18vmin,180px);touch-action:manipulation;}'
  + '.rl-svg{position:absolute;top:0;left:0;width:100%;height:50%;overflow:visible;}'
  + '.rl-tape{fill:var(--lcs-surface);stroke:var(--lcs-line);stroke-width:1.5;}'
  + '.rl-baseline{stroke:var(--lcs-structure);stroke-width:2.5;stroke-linecap:round;}'
  + '.rl-tick{stroke:var(--lcs-line);stroke-width:1.2;pointer-events:none;}'
  + '.rl-tick.major{stroke:var(--lcs-structure);stroke-width:2.2;}'
  + '.rl-label{fill:var(--lcs-ink-soft);font-family:var(--lcs-font-body);'
  +   'font-weight:700;font-size:11px;pointer-events:none;}'
  /* Object body — sits immediately below the ruler baseline (no gap),
     thick enough to feel like a physical object (ribbon/measuring-tape).
     Background colour comes from settings.color, set inline in paint(). */
  + '.rl-bar{position:absolute;top:50%;height:clamp(20px,3vmin,28px);'
  +   'margin-top:4px;background:var(--lcs-accent);'
  +   'border:2px solid var(--lcs-structure);border-radius:var(--lcs-radius-pill);'
  +   'pointer-events:none;'
  +   'transition:left .12s var(--lcs-ease),width .12s var(--lcs-ease),background .15s;}'
  /* Endpoint handles — sit ON the bar\'s vertical centre, smaller than the
     bar so they read as endpoints, not as the object itself. Generous
     :before pseudo expands the tap target to ≥44px on touch devices
     without enlarging the visible mark. */
  + '.rl-handle{position:absolute;top:calc(50% + clamp(14px,2.25vmin,18px));'
  +   'transform:translate(-50%,-50%);'
  +   'width:clamp(24px,3.6vmin,32px);height:clamp(24px,3.6vmin,32px);'
  +   'display:grid;place-items:center;background:var(--lcs-surface);'
  +   'border-radius:50%;box-shadow:var(--lcs-shadow);touch-action:none;'
  +   'transition:left .12s var(--lcs-ease),transform .12s var(--lcs-ease);'
  +   'cursor:grab;padding:0;z-index:2;}'
  + '.rl-handle::before{content:"";position:absolute;inset:-12px;border-radius:50%;}'
  + '.rl-handle:active{cursor:grabbing;}'
  + '.rl-handle.dragging{transition:none;cursor:grabbing;}'
  + '.rl-handle svg{width:80%;height:80%;display:block;}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
