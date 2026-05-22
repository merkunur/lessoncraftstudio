/* =====================================================================
   WORD BUILDER — SHARED CORE   (word-builder-core.js)
   ---------------------------------------------------------------------
   Engine E8 (syllable) + future E9 (sound-chunk) per the master arc.
   Multi-tile word assembler — sibling to cvc-builder-core.js, NOT a
   refactor of it. The CVC engine stays at letter-granularity for the
   shipped EN RF.K.3 activity; this engine generalizes to multi-character
   chunks (Spanish syllables "ga"/"to", Italian "mam"/"ma", German
   "Hand"/"schuh", etc.).

   API CONTRACT (parallel to CvcBuilderCore but accepting multi-char tiles)
     init(api)                         — wire api; reset state
     setupTask(opts)                   — load next task. opts:
       { slots:        number,         // tile count = targetSyllables.length
         palette:      [tileText,...], // scrambled syllables (multi-char OK)
         targetWord:   string,         // expected joined answer
         targetTiles:  [tile,...],     // ordered target (for per-slot check)
         subject:      {type, imgUrl|text, hearItWord?, hearItLang?},
         language:     string }        // BCP-47 for tile + blend TTS
     selectTile(tileText)              — kid taps a palette tile
     clearSlot(idx)                    — kid taps a filled slot
     speakTile(tileText)               — TTS a single chunk (segment phase)
     speakBlend()                      — TTS the assembled word (blend on
                                          correct Check — surfaces
                                          segment->blend pedagogy)
     showFeedback(correct)             — paint per-slot rings; on correct,
                                          call speakBlend()
     render() / paint() / reset()      — DOM lifecycle

   tool.answer is the joined tile string (no separator) when all slots
   filled, else null. tool.tileAnswers is the array of arranged tiles so
   the activity can check order-equality against targetTiles directly.
   ===================================================================== */
window.WordBuilderCore = {
  strings: {
    title:       {en:'Word Builder',de:'Wortbauer',fr:'Constructeur de mots',it:'Costruttore di parole',es:'Constructor de palabras',pt:'Construtor de palavras',nl:'Woordbouwer',sv:'Ordbyggare',da:'Ordbygger',no:'Ordbygger',fi:'Sanarakentaja'},
    instruction: {en:'Tap a tile to fill the active slot.',de:'Tippe ein Plättchen, um das aktive Feld zu füllen.',fr:'Touche une tuile pour remplir la case active.',it:'Tocca una tessera per riempire la casella attiva.',es:'Toca una sílaba para llenar la casilla activa.',pt:'Toque numa peça para preencher o espaço ativo.',nl:'Tik op een tegel om het actieve vak te vullen.',sv:'Tryck på en bricka för att fylla den aktiva rutan.',da:'Tryk på en brik for at fylde det aktive felt.',no:'Trykk på en brikke for å fylle den aktive ruten.',fi:'Napauta palaa täyttääksesi aktiivisen ruudun.'}
  },

  defaults: {},
  settings: [],

  init: function (api) {
    this.api = api;
    this.slots = 0;
    this.tileAnswers = [];
    this.slotFeedback = [];
    this.palette = [];
    this.targetWord = '';
    this.targetTiles = [];
    this.subject = null;
    this.language = (api && api.lang) || 'en';
    this.activeSlot = 0;
    this.readOnly = false;
    this.feedbackMode = null;  /* null | 'correct' | 'wrong' */
    this.answer = null;        /* joined tile string when ALL filled, else null */
    this.slotEls = [];
    this.tileEls = [];
  },

  _updateAnswer: function () {
    for (var i = 0; i < this.slots; i++) {
      if (this.tileAnswers[i] == null) { this.answer = null; return; }
    }
    this.answer = this.tileAnswers.join('');
  },

  /* Load a task. opts:
       slots, palette, targetWord, targetTiles, subject, language. */
  setupTask: function (opts) {
    opts = opts || {};
    this.targetTiles = Array.isArray(opts.targetTiles) ? opts.targetTiles.slice() : [];
    this.slots = (typeof opts.slots === 'number' && opts.slots > 0)
      ? opts.slots
      : this.targetTiles.length;
    this.tileAnswers = new Array(this.slots).fill(null);
    this.slotFeedback = new Array(this.slots).fill(null);
    this.palette = Array.isArray(opts.palette) ? opts.palette.slice() : [];
    this.targetWord = String(opts.targetWord || this.targetTiles.join(''));
    this.subject = opts.subject || null;
    this.language = String(opts.language || (this.api && this.api.lang) || 'en');
    this.activeSlot = 0;
    this.readOnly = false;
    this.feedbackMode = null;
    this._updateAnswer();
  },

  selectTile: function (tileText) {
    if (this.readOnly) return;
    if (this.feedbackMode === 'wrong') {
      this.feedbackMode = null;
      this.slotFeedback = new Array(this.slots).fill(null);
    }
    if (this.activeSlot == null || this.activeSlot < 0 || this.activeSlot >= this.slots) return;
    this.tileAnswers[this.activeSlot] = String(tileText);
    this.api.sound(660);
    /* Speak the syllable that was just placed — the segment side of the
       segment->blend pedagogy. Independent of correctness. */
    this.speakTile(String(tileText));
    this.activeSlot = this._nextEmptySlot();
    this._updateAnswer();
    this.paint();
  },

  clearSlot: function (idx) {
    if (this.readOnly) return;
    if (typeof idx !== 'number' || idx < 0 || idx >= this.slots) return;
    if (this.tileAnswers[idx] == null) {
      this.activeSlot = idx;
      this.paint();
      return;
    }
    if (this.feedbackMode === 'wrong') {
      this.feedbackMode = null;
      this.slotFeedback = new Array(this.slots).fill(null);
    }
    this.tileAnswers[idx] = null;
    this.activeSlot = idx;
    this.api.sound(440);
    this._updateAnswer();
    this.paint();
  },

  _nextEmptySlot: function () {
    for (var i = 0; i < this.slots; i++) {
      if (this.tileAnswers[i] == null) return i;
    }
    return null;
  },

  /* Speak a single tile (syllable) in the task's language. Routes
     through LCSAudio so recorded .mp3 files (when present) replace
     TTS with zero engine-side change. */
  speakTile: function (text) {
    window.LCSAudio.speak({
      type: 'syllable',
      text: text,
      lang: this.language,
      rate: 0.85  /* slightly slower for chunked phonics */
    });
  },

  /* Speak the joined word — the blend side of segment->blend. Called
     on a correct Check after per-slot rings paint. */
  speakBlend: function () {
    var word = this.answer || this.targetWord;
    if (!word) return;
    window.LCSAudio.speak({
      type: 'word',
      text: word,
      lang: this.language,
      rate: 0.8
    });
  },

  /* Thin wrapper kept for backwards-compat with any per-app caller
     reading the BCP-47 form directly. LCSAudio owns the canonical map;
     this delegates so the engine has one fewer copy to drift. */
  _ttsLang: function () {
    if (window.LCSAudio && window.LCSAudio._ttsLang) {
      return window.LCSAudio._ttsLang(this.language);
    }
    return String(this.language || 'en').toLowerCase();
  },

  showFeedback: function (correct) {
    this.feedbackMode = correct ? 'correct' : 'wrong';
    if (correct) {
      this.readOnly = true;
      this.slotFeedback = new Array(this.slots).fill('correct');
      /* Segment -> blend. The whole word, spoken, after the rings paint. */
      this.speakBlend();
    } else {
      var fb = [];
      for (var i = 0; i < this.slots; i++) {
        var picked = this.tileAnswers[i];
        var target = this.targetTiles[i];
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
    this.tileEls = [];

    var wrap = this.api.el('div', 'wb-wrap');

    if (this.subject) {
      var subjectEl = this.api.el('div', 'wb-subject wb-subject--' + this.subject.type);
      if (this.subject.type === 'image' && this.subject.imgUrl) {
        var subjectImg = this.api.el('img', 'wb-subject-img');
        subjectImg.src = this.subject.imgUrl;
        subjectImg.alt = this.subject.alt || '';
        subjectImg.setAttribute('loading', 'lazy');
        subjectEl.appendChild(subjectImg);
      } else if (this.subject.type === 'text' && this.subject.text != null) {
        var subjectText = this.api.el('div', 'wb-subject-text');
        subjectText.textContent = String(this.subject.text);
        subjectEl.appendChild(subjectText);
      }
      var hearWord = this.subject.hearItWord || this.targetWord;
      if (hearWord) {
        var hearBtn = this.api.el('button', 'wb-subject-hear');
        hearBtn.type = 'button';
        hearBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M19 7a8 8 0 0 1 0 10"/></svg>';
        hearBtn.setAttribute('aria-label', 'Hear the word');
        hearBtn.title = 'Hear the word';
        hearBtn.addEventListener('click', function () {
          window.LCSAudio.speak({
            type: 'word',
            text: hearWord,
            lang: self.subject.hearItLang || self.language,
            rate: 0.75
          });
        });
        subjectEl.appendChild(hearBtn);
      }
      wrap.appendChild(subjectEl);
    }

    /* Slots row — N empty cells in order. */
    var slotsEl = this.api.el('div', 'wb-slots');
    slotsEl.style.gridTemplateColumns = 'repeat(' + this.slots + ', minmax(0,1fr))';
    for (var i = 0; i < this.slots; i++) {
      var slot = this.api.el('button', 'wb-slot');
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

    /* Palette — tile order as given (already shuffled by the activity). */
    var paletteEl = this.api.el('div', 'wb-palette');
    for (var p = 0; p < this.palette.length; p++) {
      var tileText = String(this.palette[p]);
      var tile = this.api.el('button', 'wb-tile');
      tile.type = 'button';
      tile.dataset.tile = tileText;
      tile.textContent = tileText;
      tile.setAttribute('aria-label', 'Tile ' + tileText);
      (function (t) {
        tile.addEventListener('click', function () { self.selectTile(t); });
      }(tileText));
      this.tileEls.push(tile);
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
      var val = this.tileAnswers[i];
      var fb  = this.slotFeedback[i];

      slot.textContent = (val != null) ? String(val) : '';

      slot.classList.remove('wb-slot--filled', 'wb-slot--active', 'wb-slot--correct', 'wb-slot--wrong');
      if (val != null) slot.classList.add('wb-slot--filled');
      if (!this.feedbackMode && i === this.activeSlot) slot.classList.add('wb-slot--active');
      if (fb === 'correct') slot.classList.add('wb-slot--correct');
      else if (fb === 'wrong') slot.classList.add('wb-slot--wrong');
    }

    /* Dim palette tiles that have been used to fill all slots they
       appear in — gentle visual cue without locking. Duplicates allowed
       so kids can place the same syllable twice (rare but possible). */
    if (this.tileEls && this.tileEls.length) {
      var usedCounts = {};
      for (var k = 0; k < this.tileAnswers.length; k++) {
        var t = this.tileAnswers[k];
        if (t != null) usedCounts[t] = (usedCounts[t] || 0) + 1;
      }
      var paletteCounts = {};
      for (var p = 0; p < this.palette.length; p++) {
        var pt = this.palette[p];
        paletteCounts[pt] = (paletteCounts[pt] || 0) + 1;
      }
      for (var m = 0; m < this.tileEls.length; m++) {
        var tile = this.tileEls[m];
        var lab = tile.dataset.tile;
        var used = usedCounts[lab] || 0;
        var avail = paletteCounts[lab] || 0;
        tile.classList.toggle('wb-tile--used', used >= avail && avail > 0);
      }
    }
  },

  reset: function () {
    this.tileAnswers = new Array(this.slots).fill(null);
    this.slotFeedback = new Array(this.slots).fill(null);
    this.activeSlot = 0;
    this.readOnly = false;
    this.feedbackMode = null;
    this._updateAnswer();
    this.paint();
  },

  /* ---- stage CSS — Direction A, sized for multi-char syllable tiles ---- */
  _cssInjected: false,
  injectCSS: function () {
    if (this._cssInjected) return;
    this._cssInjected = true;
    var css = [
      '.wb-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(10px,2.2vmin,18px);width:100%;padding:0 clamp(4px,1.4vmin,12px);}',

      '.wb-subject{position:relative;display:flex;align-items:center;justify-content:center;width:100%;max-width:280px;margin-bottom:clamp(2px,0.6vmin,6px);}',
      '.wb-subject-img{width:auto;height:clamp(96px,18vmin,140px);max-width:80%;pointer-events:none;user-select:none;filter:drop-shadow(0 4px 12px rgba(20,30,28,0.10));}',
      '.wb-subject-text{font-family:var(--lcs-font-display);font-weight:800;font-size:clamp(40px,10vmin,72px);color:var(--lcs-structure);line-height:1;letter-spacing:-0.02em;}',
      '.wb-subject-hear{position:absolute;bottom:-6px;right:8px;width:44px;height:44px;border-radius:50%;border:0;background:linear-gradient(180deg,#FFFEFB 0%,#FAF1DF 100%);color:var(--lcs-structure);display:grid;place-items:center;cursor:pointer;box-shadow:inset 0 1px 0 rgba(255,255,255,0.8),0 4px 10px rgba(20,30,28,0.14),0 1px 3px rgba(20,30,28,0.06);transition:transform .15s cubic-bezier(.2,.8,.2,1),box-shadow .15s;}',
      '.wb-subject-hear:hover{transform:translateY(-2px);}',
      '.wb-subject-hear:active{transform:translateY(0) scale(.95);}',
      '.wb-subject-hear svg{width:22px;height:22px;}',

      /* Slots — wider than tall to fit multi-character syllable text. */
      '.wb-slots{display:grid;gap:clamp(10px,2vmin,16px);width:100%;max-width:520px;}',
      '.wb-slot{',
      '  min-height:clamp(56px,12vmin,80px);',
      '  padding:0 clamp(8px,2vmin,16px);',
      '  background:linear-gradient(180deg,#FFFEFB 0%,#FAF1DF 100%);',
      '  border:0;border-radius:18px;',
      '  font-family:var(--lcs-font-display);',
      '  font-weight:800;',
      '  font-size:clamp(22px,5vmin,32px);',
      '  color:var(--lcs-structure);',
      '  line-height:1;letter-spacing:-0.01em;',
      '  display:grid;place-items:center;',
      '  cursor:pointer;touch-action:manipulation;',
      '  position:relative;',
      '  box-shadow:inset 0 1px 0 rgba(255,255,255,0.8),0 6px 14px rgba(20,30,28,0.08),0 1px 3px rgba(20,30,28,0.04);',
      '  transition:transform .15s cubic-bezier(.2,.8,.2,1),box-shadow .2s,background .25s,opacity .15s;',
      '}',
      '.wb-slot:not(.wb-slot--filled)::after{content:"";position:absolute;left:18%;right:18%;bottom:18%;height:4px;border-radius:2px;background:rgba(20,107,94,0.18);pointer-events:none;}',
      '.wb-slot:hover:not(:disabled){transform:translateY(-2px);}',
      '.wb-slot:active{transform:translateY(0) scale(.98);}',
      '.wb-slot--active{background:linear-gradient(180deg,#EAF6F3 0%,#D9ECE7 100%);box-shadow:inset 0 0 0 3px var(--lcs-structure),0 10px 20px rgba(20,107,94,0.16),0 2px 4px rgba(20,107,94,0.06);}',
      '.wb-slot--correct{background:linear-gradient(180deg,#E0F2E8 0%,#BFE2CE 100%);box-shadow:inset 0 0 0 3px var(--lcs-good),0 10px 20px rgba(47,165,106,0.20),0 2px 4px rgba(47,165,106,0.08);animation:wb-pop .35s cubic-bezier(.2,.8,.2,1);}',
      '.wb-slot--wrong{background:linear-gradient(180deg,#F7DDDC 0%,#ECC0BE 100%);box-shadow:inset 0 0 0 3px #C84A4A,0 6px 14px rgba(200,74,74,0.20);animation:wb-shake .35s var(--lcs-ease);}',

      /* Palette — syllable tiles sit in a wrap-friendly flex row, sized
         to their content (multi-character tiles are wider than letters). */
      '.wb-palette{display:flex;flex-wrap:wrap;justify-content:center;gap:clamp(8px,1.6vmin,14px);width:100%;max-width:560px;margin-top:clamp(4px,1vmin,8px);}',
      '.wb-tile{',
      '  min-width:clamp(64px,14vmin,96px);',
      '  min-height:clamp(56px,12vmin,80px);',
      '  padding:0 clamp(10px,2.4vmin,18px);',
      '  background:linear-gradient(180deg,#FFFEFB 0%,#F7EBD3 100%);',
      '  border:0;border-radius:16px;',
      '  font-family:var(--lcs-font-display);',
      '  font-weight:700;',
      '  font-size:clamp(22px,4.4vmin,30px);',
      '  color:var(--lcs-structure);',
      '  line-height:1;letter-spacing:-0.01em;',
      '  display:grid;place-items:center;cursor:pointer;',
      '  touch-action:manipulation;',
      '  box-shadow:inset 0 1px 0 rgba(255,255,255,0.8),0 4px 0 0 #E6D8AF,0 6px 12px rgba(20,30,28,0.10);',
      '  transition:transform .12s cubic-bezier(.2,.8,.2,1),box-shadow .12s,opacity .15s;',
      '}',
      '.wb-tile:hover:not(:disabled){transform:translateY(-2px);box-shadow:inset 0 1px 0 rgba(255,255,255,0.9),0 5px 0 0 #E6D8AF,0 8px 16px rgba(20,30,28,0.12);}',
      '.wb-tile:active{transform:translateY(2px);box-shadow:inset 0 1px 0 rgba(255,255,255,0.8),0 2px 0 0 #E6D8AF,0 3px 6px rgba(20,30,28,0.10);}',
      '.wb-tile:focus-visible{outline:2px solid var(--lcs-structure);outline-offset:3px;}',
      '.wb-tile--used{opacity:0.45;}',

      '@keyframes wb-pop{0%{transform:scale(1);}40%{transform:scale(1.08);}100%{transform:scale(1);}}',
      '@keyframes wb-shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-4px);}75%{transform:translateX(4px);}}'
    ].join('\n');
    var tag = document.createElement('style');
    tag.textContent = css;
    document.head.appendChild(tag);
  }
};
