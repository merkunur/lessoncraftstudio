/* =====================================================================
   TOOL #1 — NUMBER LINE   (number-line.js)
   ---------------------------------------------------------------------
   Follows ten-frame.js for shape (see lcs-shell.js for the contract):
     render() builds the stage skeleton ONCE and caches node refs;
     paint() updates only the marker / bubble / aria — never rebuilds ticks.
   This is the toolkit's first DRAGGABLE-VALUE tool — the pointer-events
   pattern here is what later drag tools (open number line, fraction line,
   ruler) will pattern themselves on.

   PEDAGOGY (standard): a horizontal line with evenly spaced integer ticks
   and a single marker. Range 0-10 / 0-20 / 0-100. Reading order is L→R,
   smallest→largest. Movement always lands on an integer (live-snap during
   drag); a value bubble above the marker shows the current number.
   ===================================================================== */
var NumberLine = {
  id: 'number-line',

  /* CURATION FLAG: the MATH name varies by national tradition — Nordic +
     Finnish especially deserve a native pass before launch. Everything else
     here is everyday UI vocabulary and is reliable. */
  strings: {
    title:       {en:'Number Line',de:'Zahlenstrahl',fr:'Droite numérique',it:'Linea dei numeri',es:'Recta numérica',pt:'Reta numérica',nl:'Getallenlijn',sv:'Tallinje',da:'Tallinje',no:'Tallinje',fi:'Lukusuora'},
    instruction: {en:'Tap the line or drag the marker.',de:'Tippe auf die Linie oder ziehe die Markierung.',fr:'Touche la droite ou déplace le repère.',it:'Tocca la linea o trascina il segnalino.',es:'Toca la recta o arrastra el marcador.',pt:'Toque na reta ou arraste o marcador.',nl:'Tik op de lijn of sleep de markering.',sv:'Tryck på linjen eller dra markören.',da:'Tryk på linjen eller træk markøren.',no:'Trykk på linjen eller dra markøren.',fi:'Napauta lukusuoraa tai vedä osoitinta.'},
    value:       {en:'Value',de:'Wert',fr:'Valeur',it:'Valore',es:'Valor',pt:'Valor',nl:'Waarde',sv:'Värde',da:'Værdi',no:'Verdi',fi:'Arvo'},
    range:       {en:'Range',de:'Bereich',fr:'Plage',it:'Intervallo',es:'Rango',pt:'Intervalo',nl:'Bereik',sv:'Intervall',da:'Interval',no:'Område',fi:'Alue'},
    showNumber:  {en:'Show number',de:'Zahl anzeigen',fr:'Afficher le nombre',it:'Mostra numero',es:'Mostrar número',pt:'Mostrar número',nl:'Getal tonen',sv:'Visa siffra',da:'Vis tal',no:'Vis tall',fi:'Näytä luku'},
    color:       {en:'Marker colour',de:'Markierungsfarbe',fr:'Couleur du repère',it:'Colore segnalino',es:'Color del marcador',pt:'Cor do marcador',nl:'Kleur van markering',sv:'Markörfärg',da:'Markørfarve',no:'Markørfarge',fi:'Osoittimen väri'},
    shape:       {en:'Marker shape',de:'Markierungsform',fr:'Forme du repère',it:'Forma segnalino',es:'Forma del marcador',pt:'Forma do marcador',nl:'Vorm van markering',sv:'Markörform',da:'Markørform',no:'Markørform',fi:'Osoittimen muoto'},
    shapeDot:    {en:'Dot',de:'Punkt',fr:'Point',it:'Punto',es:'Punto',pt:'Ponto',nl:'Stip',sv:'Prick',da:'Prik',no:'Prikk',fi:'Piste'},
    shapeHeart:  {en:'Heart',de:'Herz',fr:'Cœur',it:'Cuore',es:'Corazón',pt:'Coração',nl:'Hart',sv:'Hjärta',da:'Hjerte',no:'Hjerte',fi:'Sydän'},
    shapeStar:   {en:'Star',de:'Stern',fr:'Étoile',it:'Stella',es:'Estrella',pt:'Estrela',nl:'Ster',sv:'Stjärna',da:'Stjerne',no:'Stjerne',fi:'Tähti'},
    /* ± step-button aria-labels (slider standard verbs in each locale) */
    decrease:    {en:'Decrease',de:'Verringern',fr:'Diminuer',it:'Diminuisci',es:'Disminuir',pt:'Diminuir',nl:'Verlagen',sv:'Minska',da:'Formindsk',no:'Reduser',fi:'Vähennä'},
    increase:    {en:'Increase',de:'Erhöhen',fr:'Augmenter',it:'Aumenta',es:'Aumentar',pt:'Aumentar',nl:'Verhogen',sv:'Öka',da:'Forøg',no:'Øk',fi:'Lisää'}
  },

  defaults: { range: 20, shape: 'dot', color: '#F2784B', showNumber: true },

  settings: [
    { key:'range', type:'choice', labelKey:'range', options:[10, 20, 100] },
    { key:'shape', type:'choice', labelKey:'shape', options:[
        { value:'dot',   labelKey:'shapeDot'   },
        { value:'heart', labelKey:'shapeHeart' },
        { value:'star',  labelKey:'shapeStar'  }
    ]},
    { key:'color', type:'color', labelKey:'color',
      options:['#F2784B','#1B9E8F','#3E78C9','#E5536F','#7B5BD6','#2A2A35'] },
    { key:'showNumber', type:'toggle', labelKey:'showNumber' }
  ],

  /* ---- state + setup ---- */
  init: function (api) {
    this.api = api;
    this.value = 0;
    this._lastShape = null;
    this._lastColor = null;
  },

  min: function () { return 0; },
  max: function () { return this.api.settings.range; },

  /* Integer-only setter. Snaps, clamps, plays a pop (760 up / 380 down),
     announces, and calls paint() — never render(). Returns true if changed. */
  setValue: function (v) {
    v = Math.max(this.min(), Math.min(this.max(), Math.round(v)));
    if (v === this.value) return false;
    this.api.sound(v > this.value ? 760 : 380);
    this.value = v;
    this.paint();
    this.api.track('value', { value: v });
    return true;
  },

  /* Translate pointer-x to a real-valued (pre-rounding) value, using the
     line's bounding rect. setValue() rounds + clamps. */
  pxToValue: function (px, rect) {
    if (!rect.width) return this.value;
    var pct = Math.max(0, Math.min(1, (px - rect.left) / rect.width));
    return this.min() + pct * (this.max() - this.min());
  },

  valueToPct: function (v) {
    var span = this.max() - this.min();
    return span ? ((v - this.min()) / span) * 100 : 0;
  },

  /* ---- render(): build skeleton ONCE per (init | settings change) ----
     Caches lineEl, markerEl, bubbleEl, decBtnEl, incBtnEl on `this` so
     paint() can mutate just those. Wires pointer events on the LINE
     container (capture lives there; the marker itself stays a focusable
     button for keyboard).                                                  */
  render: function () {
    var s = this.api.settings, self = this;
    var stage = this.api.stage;
    stage.innerHTML = '';
    var t = function (k) { return self.api.t(k); };

    var max = this.max(), min = this.min(), span = max - min || 1;

    /* Tick-density rule for range=100: minor at every integer at normal
       widths, fall back to minor-at-5s when the stage is narrow so ticks
       don't visually merge. Re-evaluated only at render-time (acceptable
       v1 trade-off; no resize observer). */
    var stageW = stage.clientWidth || (this.api.el && stage.getBoundingClientRect ? stage.getBoundingClientRect().width : 0) || 800;
    var minorEvery = (max === 100 && stageW < 480) ? 5 : 1;
    var majorEvery = (max === 100) ? 10 : 1;

    /* Build SVG (decorative). viewBox is internal coords; preserveAspectRatio
       "none" stretches to fit. INSET keeps end-ticks inside the box. */
    var VB_W = 1000, VB_H = 100;
    var INSET = 18;
    var xRange = VB_W - 2 * INSET;
    var yAxis = 56;
    var yMinorTop = 44, yMinorBot = 68;
    var yMajorTop = 32, yMajorBot = 80;
    var yLabel = 96;

    var svgParts = [
      '<svg class="nl-line" viewBox="0 0 ' + VB_W + ' ' + VB_H + '" ',
      'preserveAspectRatio="none" aria-hidden="true">',
      '<line class="nl-axis" x1="' + INSET + '" y1="' + yAxis + '" ',
      'x2="' + (VB_W - INSET) + '" y2="' + yAxis + '" />'
    ];
    for (var i = min; i <= max; i += 1) {
      var isEdge = (i === min || i === max);
      var isMajor = isEdge || (i % majorEvery === 0);
      var isMinorVisible = (i % minorEvery === 0);
      if (!isMajor && !isMinorVisible) continue;
      var x = INSET + ((i - min) / span) * xRange;
      var y1 = isMajor ? yMajorTop : yMinorTop;
      var y2 = isMajor ? yMajorBot : yMinorBot;
      svgParts.push(
        '<line class="nl-tick' + (isMajor ? ' major' : '') + '" ' +
        'x1="' + x + '" y1="' + y1 + '" x2="' + x + '" y2="' + y2 + '" />'
      );
      if (isMajor) {
        svgParts.push(
          '<text class="nl-label" x="' + x + '" y="' + yLabel +
          '" text-anchor="middle">' + i + '</text>'
        );
      }
    }
    svgParts.push('</svg>');

    var wrap = this.api.el('div', 'nl-wrap');
    var area = this.api.el('div', 'nl-line-area');
    area.innerHTML = svgParts.join('');

    /* Bubble (sits above marker; shows current number; decorative for AT —
       marker's aria-valuenow is the canonical state.) */
    var bubble = null;
    if (s.showNumber) {
      bubble = this.api.el('div', 'nl-bubble');
      bubble.setAttribute('aria-hidden', 'true');
      area.appendChild(bubble);
    }

    /* Marker — the focusable slider. Inner SVG comes from api.token (asset
       swap point). Marker box CSS clamps size; svg fills it via width:80%. */
    var marker = this.api.el('button', 'nl-marker');
    marker.type = 'button';
    marker.setAttribute('role', 'slider');
    marker.setAttribute('aria-valuemin', String(min));
    marker.setAttribute('aria-valuemax', String(max));
    marker.setAttribute('aria-orientation', 'horizontal');
    marker.setAttribute('aria-label', t('value'));
    marker.tabIndex = 0;
    area.appendChild(marker);

    /* ± step buttons — recommended by brief: discoverability for count-on /
       count-back, double as a hint that arrow keys work. */
    var steps = this.api.el('div', 'nl-steps');
    var dec = this.api.el('button', 'nl-step');
    dec.type = 'button';
    dec.setAttribute('aria-label', t('decrease'));
    dec.title = t('decrease');
    dec.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2.6" stroke-linecap="round"><path d="M5 12h14"/></svg>';
    var inc = this.api.el('button', 'nl-step');
    inc.type = 'button';
    inc.setAttribute('aria-label', t('increase'));
    inc.title = t('increase');
    inc.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2.6" stroke-linecap="round"><path d="M5 12h14M12 5v14"/></svg>';
    steps.append(dec, inc);

    wrap.append(area, steps);
    stage.appendChild(wrap);

    /* cache refs for paint() */
    this.lineEl = area;
    this.markerEl = marker;
    this.bubbleEl = bubble;
    this.decBtnEl = dec;
    this.incBtnEl = inc;
    this._lastShape = null;   // force token render on next paint
    this._lastColor = null;

    /* ---- pointer (mouse / touch / pen) via shared helper ----
       LCS.drag.linear handles pointer-capture + pointermove + snap + clamp.
       Live-snap to the nearest integer (step=1). onChange fires on every
       distinct snapped value plus once at 'start' and once at 'end'.        */
    LCS.drag.linear(area, {
      min: this.min(),
      max: this.max(),
      step: 1,
      valueFromPointer: function (clientX, rect) {
        return self.pxToValue(clientX, rect);
      },
      onChange: function (v, phase) {
        if (phase === 'start') {
          marker.classList.add('dragging');
          marker.focus();
        } else if (phase === 'end') {
          marker.classList.remove('dragging');
        }
        self.setValue(v);
      }
    });

    /* ---- keyboard on the marker ----
       Conventional WAI-ARIA slider keymap. PageUp/Down step by 5 — useful
       ergonomic bump on range=100; harmless on 10/20 (still clamps).        */
    marker.addEventListener('keydown', function (e) {
      var k = e.key, handled = true;
      if (k === 'ArrowLeft'  || k === 'ArrowDown') self.setValue(self.value - 1);
      else if (k === 'ArrowRight' || k === 'ArrowUp') self.setValue(self.value + 1);
      else if (k === 'Home')      self.setValue(self.min());
      else if (k === 'End')       self.setValue(self.max());
      else if (k === 'PageDown')  self.setValue(self.value - 5);
      else if (k === 'PageUp')    self.setValue(self.value + 5);
      else handled = false;
      if (handled) e.preventDefault();
    });

    /* ---- ± step buttons ---- */
    dec.addEventListener('click', function () { self.setValue(self.value - 1); });
    inc.addEventListener('click', function () { self.setValue(self.value + 1); });

    /* first paint reflects the current value */
    this.paint();
  },

  /* ---- paint(): mutate cached refs only ---- */
  paint: function () {
    var s = this.api.settings;
    var pct = this.valueToPct(this.value);

    /* Only re-token when shape/color actually changed — otherwise the
       inner SVG would pop-animate on every move. */
    if (s.shape !== this._lastShape || s.color !== this._lastColor) {
      this.markerEl.innerHTML = this.api.token(s.shape, s.color, 48);
      this._lastShape = s.shape;
      this._lastColor = s.color;
    }
    this.markerEl.style.left = pct + '%';
    this.markerEl.setAttribute('aria-valuenow', String(this.value));
    this.markerEl.setAttribute('aria-valuetext', this.api.t('value') + ' ' + this.value);

    if (this.bubbleEl) {
      this.bubbleEl.style.left = pct + '%';
      this.bubbleEl.textContent = String(this.value);
    }

    var min = this.min(), max = this.max();
    this.decBtnEl.disabled = this.value <= min;
    this.incBtnEl.disabled = this.value >= max;

    this.api.announce(this.api.t('value') + ': ' + this.value);
  },

  /* Clamp BEFORE the shell calls render() (order is: chip click →
     settings[key]=v → onSettings() → tool.render()). */
  onSettings: function (key, val) {
    if (key === 'range') {
      this.value = Math.max(this.min(), Math.min(val, this.value));
    }
  },

  reset: function () { this.setValue(0); }
};

/* per-tool styling: STAGE ONLY. Never restyle the chrome.
   All values consume shell tokens — re-skinning happens upstream. */
(function injectCSS() {
  var css = ''
  + '.nl-wrap{display:flex;flex-direction:column;align-items:stretch;'
  +   'gap:clamp(16px,3vmin,28px);width:min(900px,100%);}'
  + '.nl-line-area{position:relative;height:clamp(72px,12vmin,108px);'
  +   'touch-action:manipulation;}'
  + '.nl-line{position:absolute;inset:0;width:100%;height:100%;cursor:pointer;'
  +   'overflow:visible;}'
  + '.nl-axis{stroke:var(--lcs-structure);stroke-width:3;stroke-linecap:round;}'
  + '.nl-tick{stroke:var(--lcs-line);stroke-width:1.5;pointer-events:none;}'
  + '.nl-tick.major{stroke:var(--lcs-structure);stroke-width:2.5;}'
  + '.nl-label{fill:var(--lcs-ink-soft);font-family:var(--lcs-font-body);'
  +   'font-weight:700;font-size:13px;pointer-events:none;}'
  + '.nl-marker{position:absolute;top:50%;transform:translate(-50%,-50%);'
  +   'width:clamp(36px,7vmin,56px);height:clamp(36px,7vmin,56px);'
  +   'display:grid;place-items:center;background:var(--lcs-surface);'
  +   'border-radius:50%;box-shadow:var(--lcs-shadow);touch-action:none;'
  +   'transition:left .12s var(--lcs-ease),transform .12s var(--lcs-ease);'
  +   'cursor:grab;padding:0;}'
  + '.nl-marker:active{cursor:grabbing;}'
  + '.nl-marker.dragging{transition:none;cursor:grabbing;}'
  + '.nl-marker svg{width:80%;height:80%;display:block;}'
  + '.nl-bubble{position:absolute;bottom:calc(100% - 12px);'
  +   'transform:translateX(-50%);font-family:var(--lcs-font-display);'
  +   'font-weight:700;font-size:clamp(20px,3.6vmin,28px);'
  +   'color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'padding:2px 14px;border-radius:var(--lcs-radius-pill);'
  +   'box-shadow:var(--lcs-shadow-sm);pointer-events:none;white-space:nowrap;'
  +   'transition:left .12s var(--lcs-ease);}'   /* match marker animation */
  + '.nl-steps{display:flex;justify-content:center;gap:14px;}'
  + '.nl-step{width:var(--lcs-tap);height:var(--lcs-tap);display:grid;'
  +   'place-items:center;border-radius:var(--lcs-radius-sm);'
  +   'background:var(--lcs-surface);box-shadow:var(--lcs-shadow-sm);'
  +   'color:var(--lcs-structure);touch-action:manipulation;'
  +   'transition:transform .1s var(--lcs-ease),background .12s;}'
  + '.nl-step:hover{background:var(--lcs-structure-soft);}'
  + '.nl-step:active{transform:scale(.92);}'
  + '.nl-step svg{width:46%;height:46%;}'
  + '.nl-step[disabled]{color:var(--lcs-ink-soft);opacity:.55;cursor:not-allowed;}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
