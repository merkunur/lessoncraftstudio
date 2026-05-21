/* =====================================================================
   CHOICE BOARD — SHARED CORE   (choice-board-core.js)
   ---------------------------------------------------------------------
   Engine E2 per the master-list arc. Pure single-select-with-deferred-
   check board renderer. Owns the DOM + tile state + paint + CSS.

   Used by choice-board-activity.js (task-driven activities like
   shape-id, picture-word, antonym-pick, etc.). No knowledge of tasks
   or activities — pure board.

   API CONTRACT
     init(api)          — wire api; reset state
     setupTask(opts, k) — load N options + target key for the next task
     selectKey(key)     — kid taps a tile; updates this.answer
     showFeedback(ok)   — post-Check paint (correct → lock + green;
                          wrong → red on the picked tile, others dim)
     render()           — build the stage DOM (shell calls after setup)
     paint()            — reflect this.answer + feedbackMode onto tiles
     reset()            — clear answer + feedback (Try-Again path)

   The tool exposes `tool.answer` (selected key or null). The activity
   task's check fn reads it directly:
     check: function (tool) { return tool.answer === tool.targetKey; }

   answerType is 'state' (same shape as ten-frame-activity make-n) so
   the shell leaves answerEl empty and the kid interacts with the
   tool's stage directly.
   ===================================================================== */
window.ChoiceBoardCore = {
  strings: {
    title:       {en:'Choice Board',de:'Auswahlfeld',fr:'Tableau de choix',it:'Tabella di scelta',es:'Tablero de opciones',pt:'Quadro de escolhas',nl:'Keuzebord',sv:'Valbord',da:'Valgtavle',no:'Valgtavle',fi:'Valintataulu'},
    instruction: {en:'Tap a tile to choose.',de:'Tippe auf ein Feld, um zu wählen.',fr:'Appuie sur une case pour choisir.',it:'Tocca una casella per scegliere.',es:'Toca una ficha para elegir.',pt:'Toque numa peça para escolher.',nl:'Tik op een tegel om te kiezen.',sv:'Tryck på en bricka för att välja.',da:'Tryk på en flise for at vælge.',no:'Trykk på en brikke for å velge.',fi:'Napauta laattaa valitaksesi.'}
  },

  defaults: {},
  settings: [],  /* No user settings — activity-driven. */

  init: function (api) {
    this.api = api;
    this.options = [];       /* [{key, imgUrl, label}, ...] */
    this.targetKey = null;
    this.answer = null;      /* selected key (or null) */
    this.readOnly = false;
    this.feedbackMode = null;  /* null | 'correct' | 'wrong' */
    this.tiles = [];
  },

  /* Load a task's options + correct key. Caller (the activity's
     task.setup) calls this; the shell then calls render() automatically. */
  setupTask: function (options, targetKey) {
    this.options = options || [];
    this.targetKey = targetKey;
    this.answer = null;
    this.readOnly = false;
    this.feedbackMode = null;
  },

  /* Kid tap handler. Ignored during readOnly (post-correct lock). */
  selectKey: function (key) {
    if (this.readOnly) return;
    /* If a Try-Again is showing, picking a new tile clears the
       wrong/dim feedback so the board reads cleanly again. */
    if (this.feedbackMode === 'wrong') {
      this.feedbackMode = null;
    }
    this.answer = key;
    this.api.sound(660);
    this.paint();
  },

  /* Side-effected from the task's check fn so the board reflects the
     shell-level celebrate/tryagain feedback visually. */
  showFeedback: function (correct) {
    this.feedbackMode = correct ? 'correct' : 'wrong';
    if (correct) this.readOnly = true;
    this.paint();
  },

  render: function () {
    var stage = this.api.stage, self = this;
    stage.innerHTML = '';
    this.tiles = [];

    var wrap = this.api.el('div', 'cb-wrap');
    var board = this.api.el('div', 'cb-board');
    /* 2-up if there are only 2 options; 4-up grid otherwise (2×2 on mobile). */
    var nCols = this.options.length <= 2 ? 2 : 4;
    board.classList.add('cb-cols-' + nCols);

    for (var i = 0; i < this.options.length; i++) {
      var opt = this.options[i];
      var tile = this.api.el('button', 'cb-tile');
      tile.type = 'button';
      tile.dataset.key = opt.key;
      tile.setAttribute('aria-pressed', 'false');
      tile.setAttribute('aria-label', opt.label || opt.key);

      var img = this.api.el('img', 'cb-tile-img');
      img.src = opt.imgUrl;
      img.alt = '';  /* decorative; aria-label on the button carries the label */
      img.setAttribute('loading', 'lazy');
      tile.appendChild(img);

      (function (key) {
        tile.addEventListener('click', function () { self.selectKey(key); });
      }(opt.key));

      this.tiles.push(tile);
      board.appendChild(tile);
    }

    wrap.appendChild(board);
    stage.appendChild(wrap);
    this.paint();
  },

  paint: function () {
    if (!this.tiles || !this.tiles.length) return;
    for (var i = 0; i < this.tiles.length; i++) {
      var tile = this.tiles[i];
      var key = tile.dataset.key;
      var isSelected = (key === this.answer);

      tile.classList.toggle('cb-tile--selected', isSelected && !this.feedbackMode);
      tile.setAttribute('aria-pressed', isSelected ? 'true' : 'false');

      /* Clear feedback classes before re-applying so transitions read cleanly. */
      tile.classList.remove('cb-tile--correct', 'cb-tile--wrong', 'cb-tile--dim');

      if (this.feedbackMode === 'correct' && key === this.targetKey) {
        tile.classList.add('cb-tile--correct');
      } else if (this.feedbackMode === 'wrong') {
        if (key === this.answer) tile.classList.add('cb-tile--wrong');
        else tile.classList.add('cb-tile--dim');
      }
    }
  },

  reset: function () {
    this.answer = null;
    this.feedbackMode = null;
    this.readOnly = false;
    this.paint();
  },

  /* ---- stage CSS — idempotent ---- */
  _cssInjected: false,
  injectCSS: function () {
    if (this._cssInjected) return;
    this._cssInjected = true;
    var css = ''
    + '.cb-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(8px,2vmin,18px);width:100%;}'
    + '.cb-board{display:grid;gap:clamp(8px,2vmin,16px);width:100%;max-width:560px;}'
    + '.cb-cols-2{grid-template-columns:repeat(2,1fr);}'
    /* 2×2 on mobile, 1×4 on desktop for 4-option grids. */
    + '.cb-cols-4{grid-template-columns:repeat(2,1fr);}'
    + '@media(min-width:560px){.cb-cols-4{grid-template-columns:repeat(4,1fr);}}'
    + '.cb-tile{aspect-ratio:1;background:var(--lcs-surface);border:3px solid transparent;'
    +   'border-radius:var(--lcs-radius);display:grid;place-items:center;cursor:pointer;'
    +   'touch-action:manipulation;padding:clamp(8px,2vmin,16px);'
    +   'transition:transform .1s var(--lcs-ease),background .12s,border-color .12s,opacity .15s;}'
    + '.cb-tile:hover:not([disabled]){background:var(--lcs-surface-2);transform:translateY(-2px);}'
    + '.cb-tile:active{transform:scale(.96);}'
    + '.cb-tile-img{max-width:78%;max-height:78%;width:auto;height:auto;'
    +   'pointer-events:none;user-select:none;}'
    + '.cb-tile--selected{border-color:var(--lcs-structure);background:var(--lcs-surface-2);}'
    + '.cb-tile--correct{border-color:#2D8B5A;background:#E5F4EB;'
    +   'animation:cb-pop .25s var(--lcs-ease);}'
    + '.cb-tile--wrong{border-color:#C84A4A;background:#FCEAEA;'
    +   'animation:cb-shake .35s var(--lcs-ease);}'
    + '.cb-tile--dim{opacity:.35;}'
    + '@keyframes cb-pop{0%{transform:scale(1);}40%{transform:scale(1.08);}100%{transform:scale(1);}}'
    + '@keyframes cb-shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-4px);}75%{transform:translateX(4px);}}';
    var tag = document.createElement('style');
    tag.textContent = css;
    document.head.appendChild(tag);
  }
};
