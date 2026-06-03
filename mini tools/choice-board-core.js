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
    this.options = [];       /* [{key, imgUrl?, text?, label?}, ...] */
    this.targetKey = null;
    this.subject = null;     /* null | {type:'image', imgUrl} | {type:'text', text} */
    this.answer = null;      /* selected key (or null) */
    this.readOnly = false;
    this.feedbackMode = null;  /* null | 'correct' | 'wrong' */
    this.tiles = [];
  },

  /* Load a task's options + correct key + (optional) subject element
     shown above the tile grid. Subject lets the activity present a
     "subject" (e.g., a shape image) that the kid analyzes to pick a
     tile (e.g., the number of sides). */
  setupTask: function (options, targetKey, subject) {
    this.options = options || [];
    this.targetKey = targetKey;
    this.subject = subject || null;
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

    /* Subject element (optional) — shown ABOVE the tile grid. Lets the
       activity present an image or text for the kid to analyze before
       picking a tile (e.g., a polygon to count sides on). */
    if (this.subject) {
      var subjectEl = this.api.el('div', 'cb-subject cb-subject--' + this.subject.type);
      if (this.subject.type === 'image' && this.subject.imgUrl) {
        var subjectImg = this.api.el('img', 'cb-subject-img');
        subjectImg.src = this.subject.imgUrl;
        subjectImg.alt = this.subject.alt || '';
        subjectImg.setAttribute('loading', 'lazy');
        subjectEl.appendChild(subjectImg);
      } else if (this.subject.type === 'text' && this.subject.text != null) {
        var subjectText = this.api.el('div', 'cb-subject-text');
        subjectText.textContent = String(this.subject.text);
        subjectEl.appendChild(subjectText);
      } else if (this.subject.type === 'group' && this.subject.imgUrl && this.subject.count > 0) {
        /* Batch 3: subject-level group. Reuses .cb-group + .cb-group-item
           CSS from Batch 2 (standalone selectors). Used by how-many-group
           — shows N objects above the tile board; kid counts + picks the
           matching number tile. */
        var subjectGroup = this.api.el('div', 'cb-group');
        var subjectCount = Math.min(this.subject.count, 8);  /* engine cap */
        var sCols = subjectCount <= 4 ? subjectCount : (subjectCount <= 6 ? 3 : 4);
        subjectGroup.style.gridTemplateColumns = 'repeat(' + sCols + ', 1fr)';
        subjectGroup.setAttribute('aria-label', subjectCount + ' ' + (this.subject.alt || 'items'));
        for (var sg = 0; sg < subjectCount; sg++) {
          var sgImg = this.api.el('img', 'cb-group-item');
          sgImg.src = this.subject.imgUrl;
          sgImg.alt = '';
          sgImg.setAttribute('loading', 'lazy');
          subjectGroup.appendChild(sgImg);
        }
        subjectEl.appendChild(subjectGroup);
      }
      wrap.appendChild(subjectEl);
    }

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
      tile.setAttribute('aria-label', opt.label || opt.text || opt.key);

      /* Three tile shapes: image (existing), text (Batch 1), group (Batch 2).
         Text tiles render the option's text as a big display-font glyph
         (used by pick-bigger / count-sides for number tiles, even-odd /
         flat-solid for label tiles). Image tiles render the option's
         image (used by shape-id). Group tiles render N small copies of
         the option's image in a grid inside the tile (used by which-more
         to show "3 cats vs 5 cats"). */
      if (opt.group && opt.group.imgUrl && opt.group.count > 0) {
        tile.classList.add('cb-tile--group');
        var groupEl = this.api.el('div', 'cb-group');
        var count = Math.min(opt.group.count, 8);  /* engine cap per plan */
        var cols = count <= 4 ? 2 : (count <= 6 ? 3 : 4);
        groupEl.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
        groupEl.setAttribute('aria-label', count + ' items');
        for (var g = 0; g < count; g++) {
          var gImg = this.api.el('img', 'cb-group-item');
          gImg.src = opt.group.imgUrl;
          gImg.alt = '';
          gImg.setAttribute('loading', 'lazy');
          groupEl.appendChild(gImg);
        }
        tile.appendChild(groupEl);
      } else if (opt.text != null) {
        tile.classList.add('cb-tile--text');
        var textEl = this.api.el('span', 'cb-tile-text');
        textEl.textContent = String(opt.text);
        tile.appendChild(textEl);
      } else if (opt.imgUrl) {
        var img = this.api.el('img', 'cb-tile-img');
        img.src = opt.imgUrl;
        img.alt = '';  /* decorative; aria-label on the button carries the label */
        img.setAttribute('loading', 'lazy');
        tile.appendChild(img);
      }

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

      /* Text tile — used by pick-bigger / count-sides. The option's
         text content is rendered as a big display-font glyph. Same
         tile chassis as image tile; just different content. */
      '.cb-tile--text{min-width:0;}',
      '.cb-tile-text{',
      '  font-family:var(--lcs-font-display);',
      '  font-weight:800;',
      '  font-size:clamp(40px,11vmin,54px);',
      '  color:var(--lcs-structure);',
      '  line-height:1;letter-spacing:-0.02em;',
      '  pointer-events:none;user-select:none;',
      '  text-align:center;',
      '  overflow-wrap:break-word;hyphens:auto;max-width:100%;',
      '}',

      /* Group tile — used by which-more. Renders N small copies of an
         image in a grid inside the tile chassis. Grid columns set
         inline by render() based on count (2/3/4 per band). Items
         scale within their grid cells to keep the count readable at
         the 2-up tile size. */
      '.cb-tile--group{padding:clamp(12px,2.6vmin,20px);}',
      '.cb-group{',
      '  display:grid;',
      '  gap:clamp(4px,1vmin,8px);',
      '  width:100%;height:100%;',
      '  align-items:center;justify-items:center;',
      '  align-content:center;justify-content:center;',
      '}',
      '.cb-group-item{',
      '  width:100%;height:auto;max-width:64px;',
      '  aspect-ratio:1;object-fit:contain;',
      '  pointer-events:none;user-select:none;',
      '  filter:drop-shadow(0 2px 4px rgba(20,30,28,0.08));',
      '}',

      /* Subject element — shown ABOVE the tile grid. Used by activities
         that present a "subject" (image or text) for the kid to analyze
         before picking a tile. */
      '.cb-subject{',
      '  display:flex;align-items:center;justify-content:center;',
      '  width:100%;max-width:560px;',
      '  margin-bottom:clamp(4px,1vmin,8px);',
      '}',
      '.cb-subject-img{',
      '  width:auto;height:clamp(96px,18vmin,140px);max-width:80%;',
      '  pointer-events:none;user-select:none;',
      '  filter:drop-shadow(0 4px 12px rgba(20,30,28,0.10));',
      '}',
      '.cb-subject-text{',
      '  font-family:var(--lcs-font-display);font-weight:800;',
      '  font-size:clamp(48px,12vmin,84px);color:var(--lcs-structure);',
      '  line-height:1;letter-spacing:-0.02em;',
      '}',

      /* Subject-group modifier (Batch 3) — used by how-many-group to
         show N objects above the tile board. Caps the subject group at
         a comfortable width (4×80px = ~340px) so it visually anchors
         the activity without dominating. Items slightly larger than
         tile-group items since the subject is the focal point. */
      '.cb-subject--group{max-width:360px;}',
      '.cb-subject--group .cb-group{',
      '  width:100%;height:auto;min-height:clamp(96px,18vmin,140px);',
      '  align-content:center;justify-content:center;',
      '}',
      '.cb-subject--group .cb-group-item{',
      '  max-width:80px;',
      '  filter:drop-shadow(0 4px 12px rgba(20,30,28,0.10));',
      '}',

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
