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

      /* Direction A corner badges — hidden by default, shown via paint() */
      var badge = this.api.el('div', 'cb-tile-badge');
      badge.setAttribute('aria-hidden', 'true');
      tile.appendChild(badge);

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
      var badge = tile.querySelector('.cb-tile-badge');
      if (badge) badge.textContent = '';

      if (this.feedbackMode === 'correct' && key === this.targetKey) {
        tile.classList.add('cb-tile--correct');
        if (badge) badge.textContent = '✓';  /* ✓ */
      } else if (this.feedbackMode === 'wrong') {
        if (key === this.answer) {
          tile.classList.add('cb-tile--wrong');
          if (badge) badge.textContent = '✕';  /* ✕ */
        } else {
          tile.classList.add('cb-tile--dim');
        }
      }
    }
  },

  reset: function () {
    this.answer = null;
    this.feedbackMode = null;
    this.readOnly = false;
    this.paint();
  },

  /* ---- stage CSS — Direction A "warm tactile" ---- */
  _cssInjected: false,
  injectCSS: function () {
    if (this._cssInjected) return;
    this._cssInjected = true;
    var css = [
      /* Wrap fills the stage; tiles centered. */
      '.cb-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(8px,2vmin,18px);width:100%;padding:0 clamp(4px,1.4vmin,12px);}',
      '.cb-board{display:grid;gap:clamp(12px,2.4vmin,18px);width:100%;max-width:560px;}',
      '.cb-cols-2{grid-template-columns:repeat(2,1fr);}',
      /* 2×2 on mobile, 1×4 on desktop for 4-option grids. */
      '.cb-cols-4{grid-template-columns:repeat(2,1fr);}',
      '@media(min-width:560px){.cb-cols-4{grid-template-columns:repeat(4,1fr);}}',

      /* Direction A tile — two-tone gradient + dual shadow (drop + inset highlight). */
      '.cb-tile{',
      '  aspect-ratio:1;',
      '  background:linear-gradient(180deg,#FFFEFB 0%,#FAF1DF 100%);',
      '  border:0;border-radius:28px;',
      '  display:grid;place-items:center;cursor:pointer;',
      '  touch-action:manipulation;',
      '  padding:clamp(10px,2.2vmin,18px);',
      '  position:relative;',
      '  box-shadow:',
      '    inset 0 1px 0 rgba(255,255,255,0.8),',
      '    0 8px 16px rgba(20,30,28,0.08),',
      '    0 1px 3px rgba(20,30,28,0.04);',
      '  transition:transform .15s cubic-bezier(.2,.8,.2,1),box-shadow .15s,background .25s,opacity .15s;',
      '}',
      '.cb-tile:hover:not(:disabled){',
      '  transform:translateY(-4px);',
      '  box-shadow:',
      '    inset 0 1px 0 rgba(255,255,255,0.9),',
      '    0 14px 24px rgba(20,30,28,0.11),',
      '    0 2px 4px rgba(20,30,28,0.05);',
      '}',
      '.cb-tile:active{transform:translateY(-2px) scale(.98);}',
      '.cb-tile-img{max-width:78%;max-height:78%;width:auto;height:auto;pointer-events:none;user-select:none;}',

      /* Selected (pre-Check) — teal-tinted gradient + inset ring + soft glow. */
      '.cb-tile--selected{',
      '  background:linear-gradient(180deg,#DCEDE9 0%,#C5E0DA 100%);',
      '  box-shadow:',
      '    inset 0 0 0 3px var(--lcs-structure),',
      '    0 14px 24px rgba(20,107,94,0.18),',
      '    0 2px 4px rgba(20,107,94,0.06);',
      '}',

      /* Correct — green-tinted gradient + green ring + scale up. */
      '.cb-tile--correct{',
      '  background:linear-gradient(180deg,#E0F2E8 0%,#BFE2CE 100%);',
      '  box-shadow:',
      '    inset 0 0 0 3px var(--lcs-good),',
      '    0 14px 24px rgba(47,165,106,0.22),',
      '    0 2px 4px rgba(47,165,106,0.08);',
      '  transform:scale(1.06);',
      '  animation:cb-pop .35s cubic-bezier(.2,.8,.2,1);',
      '}',

      /* Wrong — red-tinted gradient + red ring + shake. */
      '.cb-tile--wrong{',
      '  background:linear-gradient(180deg,#F7DDDC 0%,#ECC0BE 100%);',
      '  box-shadow:',
      '    inset 0 0 0 3px #C84A4A,',
      '    0 8px 16px rgba(200,74,74,0.20);',
      '  animation:cb-shake .35s var(--lcs-ease);',
      '}',

      /* Dim — non-picked tiles fade after wrong Check. */
      '.cb-tile--dim{opacity:.45;}',

      /* Corner badges (✓ on correct / ✕ on wrong). 32px white circle pinned to top-right. */
      '.cb-tile-badge{',
      '  position:absolute;top:10px;right:10px;',
      '  width:32px;height:32px;border-radius:50%;',
      '  display:grid;place-items:center;',
      '  font-weight:800;font-size:18px;line-height:1;color:transparent;',
      '  transition:transform .25s cubic-bezier(.2,.8,.2,1);',
      '  pointer-events:none;',
      '}',
      '.cb-tile--correct .cb-tile-badge{',
      '  background:var(--lcs-good);color:#fff;',
      '  box-shadow:0 4px 12px rgba(47,165,106,0.4);',
      '  animation:cb-badge-pop .3s cubic-bezier(.2,.8,.2,1);',
      '}',
      '.cb-tile--wrong .cb-tile-badge{',
      '  background:#C84A4A;color:#fff;',
      '  box-shadow:0 3px 10px rgba(200,74,74,0.35);',
      '  animation:cb-badge-pop .3s cubic-bezier(.2,.8,.2,1);',
      '}',

      '@keyframes cb-badge-pop{from{transform:scale(0);}to{transform:scale(1);}}',
      '@keyframes cb-pop{0%{transform:scale(1);}40%{transform:scale(1.12);}100%{transform:scale(1.06);}}',
      '@keyframes cb-shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-4px);}75%{transform:translateX(4px);}}'
    ].join('\n');
    var tag = document.createElement('style');
    tag.textContent = css;
    document.head.appendChild(tag);
  }
};
