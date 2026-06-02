/* =====================================================================
   TEN FRAME — SHARED CORE   (ten-frame-core.js)
   ---------------------------------------------------------------------
   Library shared between two sibling tools in the ten-frame family:
     - ten-frame.js          (manipulative — free-play tap-to-fill)
     - ten-frame-activity.js (activity — task-driven "Make N" / "How many?")
   This file owns the DOM + state + paint logic + settings schema + stage
   CSS + the 11-locale strings dict. Each sibling is a thin wrapper that
   merges in its own behavior.

   Activity variants can set `tool.readOnly = true` (e.g., during a "How
   many?" task) to block cell taps without changing any other behavior.

   PEDAGOGY (standard, not invented): a ten-frame is a 2x5 grid. Counters
   fill in reading order (top row left-to-right, then bottom row) so a
   quantity always shows its canonical shape — 7 reads as "a full five and
   two more". A double ten-frame (frames=2) extends the same idea to 20.
   ===================================================================== */
window.TenFrameCore = {

  /* CURATION FLAG: short terms below are reliable, BUT the ten-frame's
     NAME varies by country's math tradition and the Nordic + Finnish ones
     especially should get a native check. */
  strings: {
    title: {en:'Ten Frame',de:'Zehnerfeld',fr:'Cadre de dix',it:'Tabella del dieci',es:'Marco de diez',pt:'Quadro de dez',nl:'Tienraam',sv:'Tioram',da:'Tierramme',no:'Tierramme',fi:'Kymmenruudukko'},
    instruction: {en:'Tap the frame to add or remove counters.',de:'Tippe auf das Feld, um Plättchen hinzuzufügen oder zu entfernen.',fr:'Touche le cadre pour ajouter ou retirer des jetons.',it:'Tocca la tabella per aggiungere o togliere gettoni.',es:'Toca el marco para añadir o quitar fichas.',pt:'Toque no quadro para adicionar ou remover fichas.',nl:'Tik op het raam om fiches toe te voegen of te verwijderen.',sv:'Tryck på ramen för att lägga till eller ta bort marker.',da:'Tryk på rammen for at tilføje eller fjerne brikker.',no:'Trykk på rammen for å legge til eller fjerne brikker.',fi:'Napauta ruudukkoa lisätäksesi tai poistaaksesi nappuloita.'},
    count: {en:'Count',de:'Anzahl',fr:'Nombre',it:'Conteggio',es:'Cantidad',pt:'Contagem',nl:'Aantal',sv:'Antal',da:'Antal',no:'Antall',fi:'Määrä'},
    frames: {en:'Frames',de:'Felder',fr:'Cadres',it:'Tabelle',es:'Marcos',pt:'Quadros',nl:'Ramen',sv:'Ramar',da:'Rammer',no:'Rammer',fi:'Ruudukot'},
    color: {en:'Counter colour',de:'Plättchenfarbe',fr:'Couleur des jetons',it:'Colore gettoni',es:'Color de fichas',pt:'Cor das fichas',nl:'Kleur van fiches',sv:'Markörfärg',da:'Brikfarve',no:'Brikkefarge',fi:'Nappuloiden väri'},
    shape: {en:'Counter shape',de:'Plättchenform',fr:'Forme des jetons',it:'Forma gettoni',es:'Forma de fichas',pt:'Forma das fichas',nl:'Vorm van fiches',sv:'Markörform',da:'Brikform',no:'Brikkeform',fi:'Nappuloiden muoto'},
    shapeDot: {en:'Dot',de:'Punkt',fr:'Point',it:'Punto',es:'Punto',pt:'Ponto',nl:'Stip',sv:'Prick',da:'Prik',no:'Prikk',fi:'Piste'},
    shapeHeart: {en:'Heart',de:'Herz',fr:'Cœur',it:'Cuore',es:'Corazón',pt:'Coração',nl:'Hart',sv:'Hjärta',da:'Hjerte',no:'Hjerte',fi:'Sydän'},
    shapeStar: {en:'Star',de:'Stern',fr:'Étoile',it:'Stella',es:'Estrella',pt:'Estrela',nl:'Ster',sv:'Stjärna',da:'Stjerne',no:'Stjerne',fi:'Tähti'},
    showNumber: {en:'Show number',de:'Zahl anzeigen',fr:'Afficher le nombre',it:'Mostra numero',es:'Mostrar número',pt:'Mostrar número',nl:'Getal tonen',sv:'Visa siffra',da:'Vis tal',no:'Vis tall',fi:'Näytä luku'},
    /* screen-reader-only state words used in per-cell aria-labels */
    empty: {en:'empty',de:'leer',fr:'vide',it:'vuoto',es:'vacío',pt:'vazio',nl:'leeg',sv:'tom',da:'tom',no:'tom',fi:'tyhjä'},
    filled: {en:'filled',de:'gefüllt',fr:'rempli',it:'pieno',es:'lleno',pt:'preenchido',nl:'gevuld',sv:'fylld',da:'fyldt',no:'fylt',fi:'täytetty'}
  },

  defaults: { frames: 1, color: '#F2784B', shape: 'dot', showNumber: true },

  settings: [
    { key:'frames', type:'choice', labelKey:'frames', options:[1, 2] },
    { key:'shape',  type:'choice', labelKey:'shape', options:[
        { value:'dot', labelKey:'shapeDot' },
        { value:'heart', labelKey:'shapeHeart' },
        { value:'star', labelKey:'shapeStar' }
    ]},
    { key:'color',  type:'color',  labelKey:'color',
      options:['#F2784B','#1B9E8F','#3E78C9','#E5536F','#7B5BD6','#2A2A35'] },
    { key:'showNumber', type:'toggle', labelKey:'showNumber' }
  ],

  /* ---- state + setup ---- */
  init: function (api) {
    this.api = api;
    this.count = 0;
    this.readOnly = false;       // activity variants set true to block taps
    this.hideReadout = false;    // activity 'how-many' tasks set true so the
                                  // COUNT readout doesn't show the answer the
                                  // kid is being asked to determine
  },

  capacity: function () { return this.api.settings.frames * 10; },

  setCount: function (n) {
    n = Math.max(0, Math.min(this.capacity(), n));
    if (n === this.count) return;
    this.api.sound(n > this.count ? 760 : 380);     // up = higher pitch
    this.count = n;
    this.paint();                                    // update fill only — no rebuild
    this.api.track('count', { value: n });
  },

  /* ---- render(): build the DOM skeleton ONCE (init + settings change) ----
     Count changes go through paint(), which only toggles existing cells —
     so the stage isn't rebuilt on every tap (scales to big grids), keyboard
     focus is preserved, and we can announce changes to screen readers. ---- */
  render: function () {
    var s = this.api.settings, self = this;
    var stage = this.api.stage;
    stage.innerHTML = '';
    this.cells = [];

    var wrap = this.api.el('div', 'tf-wrap' + (s.frames === 2 ? ' tf-double' : ''));

    /* Frames live inside a sub-container so we can flex-row them when
       frames=2 (side-by-side keeps the tool within the iframe height —
       prior vertical stacking caused an internal scrollbar). */
    var framesArea = this.api.el('div', 'tf-frames-area');

    for (var f = 0; f < s.frames; f++) {
      var frame = this.api.el('div', 'tf-frame');
      for (var i = 0; i < 10; i++) {
        var ordinal = f * 10 + i + 1;            // 1-based position overall
        var cell = this.api.el('button', 'tf-cell');
        cell.type = 'button';
        cell.dataset.ord = ordinal;
        (function (ord) {
          cell.addEventListener('click', function () {
            if (self.readOnly) return;          // activity-mode lock
            // tap empty -> fill through here; tap filled -> remove from here on
            self.setCount(ord <= self.count ? ord - 1 : ord);
          });
        }(ordinal));
        this.cells.push(cell);
        frame.appendChild(cell);
      }
      framesArea.appendChild(frame);
    }
    wrap.appendChild(framesArea);

    if (s.showNumber && !this.hideReadout) {
      var readout = this.api.el('div', 'tf-readout');
      var label = this.api.el('span', 'tf-readout-label');
      label.textContent = this.api.t('count');
      this.readoutNum = this.api.el('span', 'tf-readout-num');
      readout.append(label, this.readoutNum);
      wrap.appendChild(readout);
    } else {
      this.readoutNum = null;
    }

    stage.appendChild(wrap);
    this.paint();
  },

  /* ---- paint(): reflect current count onto existing cells ---- */
  paint: function () {
    var s = this.api.settings;
    var emptyWord = this.api.t('empty'), filledWord = this.api.t('filled');
    for (var k = 0; k < this.cells.length; k++) {
      var cell = this.cells[k], ord = +cell.dataset.ord, filled = ord <= this.count;
      if (filled) {
        if (!cell.classList.contains('filled')) {
          cell.classList.add('filled');
          cell.innerHTML = this.api.token(s.shape, s.color, 56);
        }
      } else if (cell.classList.contains('filled')) {
        cell.classList.remove('filled');
        cell.innerHTML = '';
      }
      cell.setAttribute('aria-label', ord + ', ' + (filled ? filledWord : emptyWord));
    }
    if (this.readoutNum) this.readoutNum.textContent = String(this.count);
    this.api.announce(this.api.t('count') + ': ' + this.count);
  },

  reset: function () { this.setCount(0); },

  /* ---- stage CSS — idempotent: safe to call from both variants ---- */
  _cssInjected: false,
  injectCSS: function () {
    if (this._cssInjected) return;
    this._cssInjected = true;
    var css = ''
    + '.tf-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(8px,2vmin,18px);}'
    /* frames-area is the container around the (one or two) .tf-frame
       grids. flex-column (stacked) for single frame; flex-row
       (side-by-side) for double frame. Side-by-side halves the
       vertical footprint vs the prior stacked layout that overflowed. */
    + '.tf-frames-area{display:flex;flex-direction:column;align-items:center;gap:clamp(10px,2.4vmin,20px);}'
    + '.tf-double .tf-frames-area{flex-direction:row;gap:clamp(12px,2.5vmin,24px);}'
    /* In double mode, shrink cells slightly so the 10 columns fit
       horizontally inside the iframe at common viewport widths. */
    + '.tf-double .tf-cell{width:clamp(36px,8vmin,64px);}'
    + '.tf-frame{display:grid;grid-template-columns:repeat(5,1fr);gap:clamp(4px,1vmin,8px);'
    +   'background:var(--lcs-structure);padding:clamp(6px,1.4vmin,12px);'
    +   'border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow);}'
    + '.tf-cell{aspect-ratio:1;width:clamp(44px,11vmin,84px);background:var(--lcs-surface);'
    +   'border-radius:var(--lcs-radius-sm);display:grid;place-items:center;touch-action:manipulation;'
    +   'transition:transform .1s var(--lcs-ease),background .12s;}'
    + '.tf-cell:hover{background:var(--lcs-surface-2);}'
    + '.tf-cell:active{transform:scale(.94);}'
    /* SVG tokens (dot/heart/star) render with HTML width="56" attribute.
       In double-frame mode the cell shrinks to clamp(36px,8vmin,64px),
       so a raw 56px SVG would overflow on the right (visible as orange
       circles spilling past each frame's border). CSS clamps to 78% of
       the cell — mirrors the .tf-cell img rule below. */
    + '.tf-cell svg{max-width:78%;max-height:78%;width:auto;height:auto;'
    +   'animation:tf-pop .18s var(--lcs-ease);}'
    /* image tokens (color-theme activities) scale to the cell via CSS,
       regardless of their width/height HTML attributes. Prevents overflow
       when the cell clamp shrinks to 36px but the token was requested
       at 56px. */
    + '.tf-cell img{max-width:78%;max-height:78%;width:auto;height:auto;'
    +   'animation:tf-pop .18s var(--lcs-ease);}'
    + '@keyframes tf-pop{from{transform:scale(.2);opacity:0;}to{transform:scale(1);opacity:1;}}'
    + '.tf-readout{display:inline-flex;align-items:center;gap:14px;background:var(--lcs-surface);'
    +   'padding:8px 22px;border-radius:var(--lcs-radius-pill);box-shadow:var(--lcs-shadow-sm);}'
    + '.tf-readout-label{font-weight:700;color:var(--lcs-ink-soft);text-transform:uppercase;'
    +   'letter-spacing:.06em;font-size:13px;}'
    + '.tf-readout-num{font-family:var(--lcs-font-display);font-weight:700;font-size:clamp(28px,5vmin,44px);'
    +   'color:var(--lcs-structure);min-width:1.2em;text-align:center;}'
    /* Narrow phones (<=339px incl. Galaxy Fold cover 280 + iPhone-SE 320):
       a SINGLE 10-frame is 5 cells x 44px min = 220px + gaps/padding ~248px,
       wider than the ~216px iframe at 280 -> the frame spilled off both edges
       (audit: tf-cell offscreen @280). Shrink the single-frame cell so 5 cells
       fit. Double-frame cells (.tf-double .tf-cell, higher specificity) stay at
       36px and already fit, so this only narrows the single-frame case. */
    + '@media (max-width:339px){.tf-cell{width:clamp(34px,9vmin,84px);}}';
    var tag = document.createElement('style'); tag.textContent = css;
    document.head.appendChild(tag);
  }
};
