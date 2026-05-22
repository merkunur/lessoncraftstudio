/* =====================================================================
   CVC BUILDER — SHARED CORE   (cvc-builder-core.js)
   ---------------------------------------------------------------------
   Engine E7 per the master-list arc. Sequential multi-slot word-builder
   for early literacy / phonics tasks. Pure engine + DOM + state — knows
   nothing about specific tasks, only "fill N slots from this letter
   palette and check against this target word."

   Used by cvc-builder-activity.js (which loads CC-pinned manifests).
   Lives next to choice-board-core.js and shares the same API shape so
   the shell can mount it identically.

   API CONTRACT
     init(api)              — wire api; reset state
     setupTask(opts)        — load next task: {slots, palette, targetWord, subject}
     selectLetter(letter)   — kid taps a palette tile; fills active slot
     clearSlot(idx)         — kid taps a filled slot; clears it + reactivates
     showFeedback(correct)  — post-Check paint (per-slot green/red rings)
     render()               — build the stage DOM (shell calls after setup)
     paint()                — reflect current state onto slots + palette
     reset()                — clear all slots + feedback (Try-Again path)

   The tool exposes `tool.answer` (joined letter string OR null) so the
   activity's task.check fn reads it directly:
     check: function (tool) { return tool.answer === tool.targetWord; }

   answerType is 'state' (same shape as choice-board); shell leaves
   answerEl empty + the kid interacts with the tool's stage directly.

   Generic flexibility — engine knows nothing about English CVC vs
   any other word length / letter set. Slot count + palette letters +
   target word are all task-parameterized, so future per-locale phonics
   commissions can reuse this engine with different alphabets (incl.
   accented letters like ä/ö/ü/å/ø) and word lengths (CVCC, CCVC, 2-syl).
   ===================================================================== */
window.CvcBuilderCore = {
  strings: {
    title:       {en:'Word Builder',de:'Wortbauer',fr:'Constructeur de mots',it:'Costruttore di parole',es:'Constructor de palabras',pt:'Construtor de palavras',nl:'Woordbouwer',sv:'Ordbyggare',da:'Ordbygger',no:'Ordbygger',fi:'Sanarakentaja'},
    instruction: {en:'Tap a letter to fill the active slot.',de:'Tippe einen Buchstaben, um das aktive Feld zu füllen.',fr:'Touche une lettre pour remplir la case active.',it:'Tocca una lettera per riempire la casella attiva.',es:'Toca una letra para llenar la casilla activa.',pt:'Toque numa letra para preencher o espaço ativo.',nl:'Tik op een letter om het actieve vak te vullen.',sv:'Tryck på en bokstav för att fylla den aktiva rutan.',da:'Tryk på et bogstav for at fylde det aktive felt.',no:'Trykk på en bokstav for å fylle den aktive ruten.',fi:'Napauta kirjainta täyttääksesi aktiivisen ruudun.'}
  },

  defaults: {},
  settings: [],  /* No user settings — activity-driven. */

  init: function (api) {
    this.api = api;
    this.slots = 3;
    this.slotValues = [null, null, null];
    this.slotFeedback = [null, null, null];
    this.palette = [];
    this.targetWord = '';
    this.subject = null;
    this.activeSlot = 0;
    this.readOnly = false;
    this.feedbackMode = null;  /* null | 'correct' | 'wrong' */
    this.answer = null;        /* joined letter string when ALL slots filled, else null */
    this.slotEls = [];
    this.letterEls = [];
  },

  /* Recompute tool.answer from slotValues. Called every time slotValues
     mutates so the activity's check fn can read tool.answer directly.
     Plain-property (not a getter) so it survives Object.assign cloning
     by the activity orchestrator. */
  _updateAnswer: function () {
    for (var i = 0; i < this.slots; i++) {
      if (this.slotValues[i] == null) { this.answer = null; return; }
    }
    this.answer = this.slotValues.join('');
  },

  /* Load a task. opts = {
       slots:       number,            // typically 3 (CVC)
       palette:     [letter, ...],     // tile order is preserved
       targetWord:  string,            // length === slots
       subject:     { type:'image', imgUrl, alt, hearItWord? }
                    | { type:'text', text }
                    | null
     }
     subject.hearItWord defaults to targetWord — when set, the engine
     renders a "Hear it" button on the subject that plays this word via
     SpeechSynthesis. */
  setupTask: function (opts) {
    opts = opts || {};
    this.slots = (typeof opts.slots === 'number' && opts.slots > 0) ? opts.slots : (opts.targetWord ? opts.targetWord.length : 3);
    this.slotValues = new Array(this.slots).fill(null);
    this.slotFeedback = new Array(this.slots).fill(null);
    this.palette = Array.isArray(opts.palette) ? opts.palette.slice() : [];
    this.targetWord = String(opts.targetWord || '');
    this.subject = opts.subject || null;
    this.activeSlot = 0;
    this.readOnly = false;
    this.feedbackMode = null;
    this._updateAnswer();
  },

  /* Kid tap on a palette letter. Fills the active slot + advances active. */
  selectLetter: function (letter) {
    if (this.readOnly) return;
    /* If a wrong-feedback is showing, the kid is re-picking — clear
       per-slot rings so the board reads cleanly again. */
    if (this.feedbackMode === 'wrong') {
      this.feedbackMode = null;
      this.slotFeedback = new Array(this.slots).fill(null);
    }
    if (this.activeSlot == null || this.activeSlot < 0 || this.activeSlot >= this.slots) return;
    this.slotValues[this.activeSlot] = String(letter);
    this.api.sound(660);
    this.activeSlot = this._nextEmptySlot();
    this._updateAnswer();
    this.paint();
  },

  /* Kid tap on a filled slot. Clears it + makes it the active slot. */
  clearSlot: function (idx) {
    if (this.readOnly) return;
    if (typeof idx !== 'number' || idx < 0 || idx >= this.slots) return;
    if (this.slotValues[idx] == null) {
      /* Tapping an empty slot just makes it active. */
      this.activeSlot = idx;
      this.paint();
      return;
    }
    if (this.feedbackMode === 'wrong') {
      this.feedbackMode = null;
      this.slotFeedback = new Array(this.slots).fill(null);
    }
    this.slotValues[idx] = null;
    this.activeSlot = idx;
    this.api.sound(440);
    this._updateAnswer();
    this.paint();
  },

  /* The first slot that's still empty. Returns null when all filled. */
  _nextEmptySlot: function () {
    for (var i = 0; i < this.slots; i++) {
      if (this.slotValues[i] == null) return i;
    }
    return null;
  },

  /* Side-effected from the task's check fn. Engine computes per-slot
     match against targetWord + paints rings + locks board on correct. */
  showFeedback: function (correct) {
    this.feedbackMode = correct ? 'correct' : 'wrong';
    if (correct) {
      this.readOnly = true;
      this.slotFeedback = new Array(this.slots).fill('correct');
    } else {
      var fb = [];
      for (var i = 0; i < this.slots; i++) {
        var picked = this.slotValues[i];
        var target = this.targetWord[i] || '';
        if (picked == null) fb.push(null);
        else if (picked === target) fb.push('correct');
        else fb.push('wrong');
      }
      this.slotFeedback = fb;
    }
    this.paint();
  },

  render: function () {
    var stage = this.api.stage, self = this;
    stage.innerHTML = '';
    this.slotEls = [];
    this.letterEls = [];

    var wrap = this.api.el('div', 'cvc-wrap');

    /* Subject — picture above the slots. Optional "Hear it" speaker
       button overlays the bottom-right corner of the subject; tapping
       it plays subject.hearItWord (defaults to targetWord) via the
       browser's SpeechSynthesis. Phonics-critical: lets pre-readers
       hear the target word without seeing it spelled in the prompt. */
    if (this.subject) {
      var subjectEl = this.api.el('div', 'cvc-subject cvc-subject--' + this.subject.type);
      if (this.subject.type === 'image' && this.subject.imgUrl) {
        var subjectImg = this.api.el('img', 'cvc-subject-img');
        subjectImg.src = this.subject.imgUrl;
        subjectImg.alt = this.subject.alt || '';
        subjectImg.setAttribute('loading', 'lazy');
        subjectEl.appendChild(subjectImg);
      } else if (this.subject.type === 'text' && this.subject.text != null) {
        var subjectText = this.api.el('div', 'cvc-subject-text');
        subjectText.textContent = String(this.subject.text);
        subjectEl.appendChild(subjectText);
      }
      var hearWord = this.subject.hearItWord || this.targetWord;
      if (hearWord) {
        var hearBtn = this.api.el('button', 'cvc-subject-hear');
        hearBtn.type = 'button';
        hearBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M19 7a8 8 0 0 1 0 10"/></svg>';
        hearBtn.setAttribute('aria-label', 'Hear the word');
        hearBtn.title = 'Hear the word';
        hearBtn.addEventListener('click', function () {
          /* English-only for v1 proof. Per-locale phonics commissions
             pass `subject.hearItLang` per task; LCSAudio normalizes the
             base locale before file lookup / TTS fallback. */
          window.LCSAudio.speak({
            type: 'word',
            text: hearWord,
            lang: self.subject.hearItLang || 'en',
            rate: 0.75
          });
        });
        subjectEl.appendChild(hearBtn);
      }
      wrap.appendChild(subjectEl);
    }

    /* Slots — N empty cells, active-slot highlighted, tap-to-clear when
       filled. Each slot is a button so it's keyboard + screen-reader
       accessible. */
    var slotsEl = this.api.el('div', 'cvc-slots');
    slotsEl.style.gridTemplateColumns = 'repeat(' + this.slots + ', 1fr)';
    for (var i = 0; i < this.slots; i++) {
      var slot = this.api.el('button', 'cvc-slot');
      slot.type = 'button';
      slot.dataset.idx = String(i);
      slot.setAttribute('aria-label', 'Slot ' + (i + 1));
      (function (idx) {
        slot.addEventListener('click', function () { self.clearSlot(idx); });
      }(i));
      this.slotEls.push(slot);
      slotsEl.appendChild(slot);
    }
    wrap.appendChild(slotsEl);

    /* Palette — letter tiles in the order given by the task. The
       activity orchestrator shuffles deterministically per target so
       all renders agree but the tile order isn't predictable across
       tasks. */
    var paletteEl = this.api.el('div', 'cvc-palette');
    for (var p = 0; p < this.palette.length; p++) {
      var letter = String(this.palette[p]);
      var tile = this.api.el('button', 'cvc-letter');
      tile.type = 'button';
      tile.dataset.letter = letter;
      tile.textContent = letter;
      tile.setAttribute('aria-label', 'Letter ' + letter);
      (function (l) {
        tile.addEventListener('click', function () { self.selectLetter(l); });
      }(letter));
      this.letterEls.push(tile);
      paletteEl.appendChild(tile);
    }
    wrap.appendChild(paletteEl);

    stage.appendChild(wrap);
    this.paint();
  },

  paint: function () {
    if (!this.slotEls || !this.slotEls.length) return;
    for (var i = 0; i < this.slotEls.length; i++) {
      var slot = this.slotEls[i];
      var val = this.slotValues[i];
      var fb  = this.slotFeedback[i];

      slot.textContent = (val != null) ? String(val) : '';

      /* Clear all state classes before re-applying. */
      slot.classList.remove('cvc-slot--filled', 'cvc-slot--active', 'cvc-slot--correct', 'cvc-slot--wrong');

      if (val != null) slot.classList.add('cvc-slot--filled');
      if (!this.feedbackMode && i === this.activeSlot) slot.classList.add('cvc-slot--active');

      if (fb === 'correct') slot.classList.add('cvc-slot--correct');
      else if (fb === 'wrong') slot.classList.add('cvc-slot--wrong');
    }

    /* Palette tiles: dim those whose letter has been used the
       maximum-allowable times. Skip this for v1 — duplicates allowed
       (a kid can build "see" with two 'e' tiles by tapping 'e' twice). */
  },

  reset: function () {
    this.slotValues = new Array(this.slots).fill(null);
    this.slotFeedback = new Array(this.slots).fill(null);
    this.activeSlot = 0;
    this.readOnly = false;
    this.feedbackMode = null;
    this._updateAnswer();
    this.paint();
  },

  /* ---- stage CSS — Direction A "warm tactile" ---- */
  _cssInjected: false,
  injectCSS: function () {
    if (this._cssInjected) return;
    this._cssInjected = true;
    var css = [
      /* Wrap — column-flex, centered, full width. */
      '.cvc-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(10px,2.2vmin,18px);width:100%;padding:0 clamp(4px,1.4vmin,12px);}',

      /* Subject — picture above the slots, with optional Hear-it button
         pinned to the bottom-right corner. */
      '.cvc-subject{',
      '  position:relative;',
      '  display:flex;align-items:center;justify-content:center;',
      '  width:100%;max-width:280px;',
      '  margin-bottom:clamp(2px,0.6vmin,6px);',
      '}',
      '.cvc-subject-img{',
      '  width:auto;height:clamp(96px,18vmin,140px);max-width:80%;',
      '  pointer-events:none;user-select:none;',
      '  filter:drop-shadow(0 4px 12px rgba(20,30,28,0.10));',
      '}',
      '.cvc-subject-text{',
      '  font-family:var(--lcs-font-display);font-weight:800;',
      '  font-size:clamp(48px,12vmin,84px);color:var(--lcs-structure);',
      '  line-height:1;letter-spacing:-0.02em;',
      '}',
      '.cvc-subject-hear{',
      '  position:absolute;bottom:-6px;right:8px;',
      '  width:44px;height:44px;border-radius:50%;border:0;',
      '  background:linear-gradient(180deg,#FFFEFB 0%,#FAF1DF 100%);',
      '  color:var(--lcs-structure);',
      '  display:grid;place-items:center;cursor:pointer;',
      '  box-shadow:',
      '    inset 0 1px 0 rgba(255,255,255,0.8),',
      '    0 4px 10px rgba(20,30,28,0.14),',
      '    0 1px 3px rgba(20,30,28,0.06);',
      '  transition:transform .15s cubic-bezier(.2,.8,.2,1),box-shadow .15s;',
      '}',
      '.cvc-subject-hear:hover{transform:translateY(-2px);}',
      '.cvc-subject-hear:active{transform:translateY(0) scale(.95);}',
      '.cvc-subject-hear svg{width:22px;height:22px;}',

      /* Slots — 3 rounded "letter boxes" side-by-side. */
      '.cvc-slots{',
      '  display:grid;',
      '  gap:clamp(10px,2vmin,16px);',
      '  width:100%;max-width:360px;',
      '}',
      '.cvc-slot{',
      '  aspect-ratio:1;',
      '  background:linear-gradient(180deg,#FFFEFB 0%,#FAF1DF 100%);',
      '  border:0;border-radius:20px;',
      '  font-family:var(--lcs-font-display);',
      '  font-weight:800;',
      '  font-size:clamp(36px,9vmin,56px);',
      '  color:var(--lcs-structure);',
      '  line-height:1;letter-spacing:-0.02em;',
      '  display:grid;place-items:center;',
      '  cursor:pointer;touch-action:manipulation;',
      '  position:relative;',
      '  box-shadow:',
      '    inset 0 1px 0 rgba(255,255,255,0.8),',
      '    0 6px 14px rgba(20,30,28,0.08),',
      '    0 1px 3px rgba(20,30,28,0.04);',
      '  transition:transform .15s cubic-bezier(.2,.8,.2,1),box-shadow .2s,background .25s,opacity .15s;',
      '}',
      /* Empty slot — show a faint underline indicator. */
      '.cvc-slot:not(.cvc-slot--filled)::after{',
      '  content:"";',
      '  position:absolute;left:24%;right:24%;bottom:18%;',
      '  height:4px;border-radius:2px;',
      '  background:rgba(20,107,94,0.18);',
      '}',
      '.cvc-slot:not(.cvc-slot--filled)::after{pointer-events:none;}',
      '.cvc-slot:hover:not(:disabled){transform:translateY(-2px);}',
      '.cvc-slot:active{transform:translateY(0) scale(.98);}',
      /* Active slot (no feedback shown) — teal ring + soft glow. */
      '.cvc-slot--active{',
      '  background:linear-gradient(180deg,#EAF6F3 0%,#D9ECE7 100%);',
      '  box-shadow:',
      '    inset 0 0 0 3px var(--lcs-structure),',
      '    0 10px 20px rgba(20,107,94,0.16),',
      '    0 2px 4px rgba(20,107,94,0.06);',
      '}',
      /* Per-slot correct — green ring + scale pop. */
      '.cvc-slot--correct{',
      '  background:linear-gradient(180deg,#E0F2E8 0%,#BFE2CE 100%);',
      '  box-shadow:',
      '    inset 0 0 0 3px var(--lcs-good),',
      '    0 10px 20px rgba(47,165,106,0.20),',
      '    0 2px 4px rgba(47,165,106,0.08);',
      '  animation:cvc-pop .35s cubic-bezier(.2,.8,.2,1);',
      '}',
      /* Per-slot wrong — red ring + shake. */
      '.cvc-slot--wrong{',
      '  background:linear-gradient(180deg,#F7DDDC 0%,#ECC0BE 100%);',
      '  box-shadow:',
      '    inset 0 0 0 3px #C84A4A,',
      '    0 6px 14px rgba(200,74,74,0.20);',
      '  animation:cvc-shake .35s var(--lcs-ease);',
      '}',

      /* Palette — small chunky letter tiles in a wrap-friendly grid. */
      '.cvc-palette{',
      '  display:grid;',
      '  grid-template-columns:repeat(auto-fit,minmax(52px,1fr));',
      '  gap:clamp(6px,1.4vmin,10px);',
      '  width:100%;max-width:480px;',
      '  margin-top:clamp(4px,1vmin,8px);',
      '}',
      '.cvc-letter{',
      '  aspect-ratio:1;',
      '  background:linear-gradient(180deg,#FFFEFB 0%,#F7EBD3 100%);',
      '  border:0;border-radius:14px;',
      '  font-family:var(--lcs-font-display);',
      '  font-weight:800;',
      '  font-size:clamp(22px,5vmin,30px);',
      '  color:var(--lcs-structure);',
      '  line-height:1;letter-spacing:-0.02em;',
      '  display:grid;place-items:center;cursor:pointer;',
      '  touch-action:manipulation;',
      '  box-shadow:',
      '    inset 0 1px 0 rgba(255,255,255,0.8),',
      '    0 4px 0 0 #E6D8AF,',
      '    0 6px 12px rgba(20,30,28,0.10);',
      '  transition:transform .12s cubic-bezier(.2,.8,.2,1),box-shadow .12s;',
      '}',
      '.cvc-letter:hover:not(:disabled){transform:translateY(-2px);box-shadow:inset 0 1px 0 rgba(255,255,255,0.9),0 5px 0 0 #E6D8AF,0 8px 16px rgba(20,30,28,0.12);}',
      '.cvc-letter:active{transform:translateY(2px);box-shadow:inset 0 1px 0 rgba(255,255,255,0.8),0 2px 0 0 #E6D8AF,0 3px 6px rgba(20,30,28,0.10);}',
      '.cvc-letter:focus-visible{outline:2px solid var(--lcs-structure);outline-offset:3px;}',

      /* Animations. */
      '@keyframes cvc-pop{0%{transform:scale(1);}40%{transform:scale(1.10);}100%{transform:scale(1);}}',
      '@keyframes cvc-shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-4px);}75%{transform:translateX(4px);}}'
    ].join('\n');
    var tag = document.createElement('style');
    tag.textContent = css;
    document.head.appendChild(tag);
  }
};
