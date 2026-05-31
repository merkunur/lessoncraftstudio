/* =====================================================================
   MATCH PAIRS — SHARED CORE   (match-pairs-core.js)
   ---------------------------------------------------------------------
   Engine E4 per the master arc. Tap-to-pair board for forming addend
   pairs that decompose a target number (K.OA.A.3 number bonds —
   "Decompose numbers less than or equal to 10 into pairs in more than
   one way").

   Kid mechanic: a target number is shown in the prompt ("Make 5");
   a shuffled board shows N addend cards (small numerals 0-10); child
   taps one card (it highlights), taps a partner card (a coral line
   links them, both lock to paired-state), repeats until all cards are
   paired. Tap a paired card to unlink. Check Answers validates every
   pair sums to the target.

   Tap-to-pair (NOT drag) — kid-robust at 375px; mirrors successful
   tap-to-place in E7/E8/E9 word-builder. No fine-motor demands.

   API CONTRACT (sibling-shape with PlaceValueCore / ChoiceBoardCore /
   WordBuilderCore):
     init(api)                  — wire api; zero state
     setupTask(opts)            — { target, cards }; resets pairs; renders board
     render()                   — build DOM skeleton inside api.stage
     paint()                    — reflect cardsState + redraw connection lines
     reset()                    — clear pairs + selection
     injectCSS()                — one-shot stage CSS (idempotent)
     onCardTap(idx)             — tap-handler (called by card click)

   tool.pairsFormed = [[idxA, idxB], ...] is the public state surface
   read by the per-task check(tool) function in the activity wrapper
   (answerType: 'state'). Engine has NO 'check' or 'showFeedback' method
   itself — the shell handles celebrate / try-again chrome via the
   tasks-array contract; per-task check function in the wrapper compares
   pairsFormed against the task's target.

   Direction A locked: cream #FBF3E4 + teal #146B5E + coral #F2784B;
   Baloo 2 + Nunito; chunky teal Check button; warm-sage field outside
   the card via the activity-page wrapper.
   ===================================================================== */
window.MatchPairsCore = {

  /* EN base-locale only this commission. Future locale fan-out adds
     entries here per the §A.13.48 plan-mode-per-locale + 3-agent
     discipline; the engine falls back to `en` via api.t() if any
     unfilled locale routes here. */
  strings: {
    title:       { en: 'Match Pairs',                                                              de: 'Paare bilden',                                                                          es: 'Forma parejas',                                                                                       it: 'Forma le coppie',                                                                                                      fr: 'Forme les paires',                                                                                                                                                  pt: 'Forme os pares',                                                                                                                                                                                                                       nl: 'Maak paren',                                                                                              sv: 'Para ihop',                                                                                               da: 'Par sammen',                                                                                              no: 'Sett sammen par',                                                                                         fi: 'Yhdistä parit' },
    instruction: { en: 'Tap two cards that go together — and watch the pairs link.',               de: 'Tippe auf zwei Karten, die zusammengehören — und sieh zu, wie sich die Paare verbinden.', es: 'Toca dos tarjetas que van juntas — y mira cómo se enlazan las parejas.',                              it: 'Tocca due carte che vanno insieme — e guarda come le coppie si collegano.',                                            fr: 'Touche deux cartes qui vont ensemble — et regarde les paires se relier.',                                                                                          pt: 'Toque em duas cartas que combinam — e veja os pares se conectarem.',                                                                                                                                                                  nl: 'Tik op twee kaarten die bij elkaar horen — en kijk hoe de paren verbinden.',                              sv: 'Tryck på två kort som hör ihop — och se hur paren kopplas ihop.',                                         da: 'Tryk på to kort, der hører sammen — og se hvordan parrene forbindes.',                                    no: 'Trykk på to kort som hører sammen — og se hvordan parene kobles.',                                        fi: 'Paina kahta korttia, jotka kuuluvat yhteen — ja katso, miten parit yhdistyvät.' },
    /* Banner label above the board ("Target: 5"). Per-locale; previously
       hard-coded EN in render(); hoisted at the DE fan-out. SV+DA+NO
       share `Mål` (Nordic-trio cognate). FI `Tavoite` Uralic-distinct
       from all. */
    targetLabel:    { en: 'Target',                                                                de: 'Ziel',                                                                                  es: 'Objetivo',                                                                                            it: 'Obiettivo',                                                                                                            fr: 'Objectif',                                                                                                                                                          pt: 'Objetivo',                                                                                                                                                                                                                             nl: 'Doel',                                                                                                    sv: 'Mål',                                                                                                     da: 'Mål',                                                                                                     no: 'Mål',                                                                                                     fi: 'Tavoite' },
    /* Screen-reader prefix for the card aria-label ("Card 5"). Per-locale;
       previously hard-coded EN in render(); hoisted at DE fan-out.
       SV+DA+NO share `Kort ` (Nordic-trio cognate). FI `Kortti ` is
       Uralic-distinct: `Kort ` (5 chars w/ trailing space) is NOT a
       substring of `Kortti ` (position-4 is `t`, not space). Safe. */
    cardAriaPrefix: { en: 'Card ',                                                                 de: 'Karte ',                                                                                es: 'Tarjeta ',                                                                                            it: 'Carta ',                                                                                                               fr: 'Carte ',                                                                                                                                                            pt: 'Carta ',                                                                                                                                                                                                                               nl: 'Kaart ',                                                                                                  sv: 'Kort ',                                                                                                   da: 'Kort ',                                                                                                   no: 'Kort ',                                                                                                   fi: 'Kortti ' },
    /* Per-card tap-utterance: speak the card's numeric value as a
       number-word. Cards are 0-10 only (K.OA.A.3 range). This lookup is
       value-verified against PlaceValueCore._NUMBER_WORD_HELPERS.<lang>
       (n, 'cardinal') for the 0-10 range — no algorithmic divergence;
       just the flat 11-entry table. Future targets >10 would warrant
       sourcing from PVC directly.

       NL[1] = 'één' (acute attributive form) — deviates from
       _NUMBER_WORD_HELPERS.nl cardinal lookup which returns bare 'een'
       (same word as Dutch indefinite article "a/an"). For TTS clarity
       on tap-audio, the acute form disambiguates as the NUMBER 1 rather
       than the article. Per-locale TTS-rendering choice; safe because
       0-10 is the activity's entire range (no compound interactions). */
    cardSpoken:  {
      en: ['zero','one','two','three','four','five','six','seven','eight','nine','ten'],
      de: ['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn'],
      es: ['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez'],
      it: ['zero','uno','due','tre','quattro','cinque','sei','sette','otto','nove','dieci'],
      fr: ['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix'],
      pt: ['zero','um','dois','três','quatro','cinco','seis','sete','oito','nove','dez'],
      nl: ['nul','één','twee','drie','vier','vijf','zes','zeven','acht','negen','tien'],
      /* SV[1] = 'ett' (neuter cardinal) — matches SV E12 activity 1's
         `ett tiotal` convention; Swedish counting default. Value-
         verified against _NUMBER_WORD_HELPERS.sv(n, 'cardinal') for
         0-10. */
      sv: ['noll','ett','två','tre','fyra','fem','sex','sju','åtta','nio','tio'],
      /* DA[1] = 'en' (bare cardinal, NOT acute 'ét'). Locked per PVC
         source comment at place-value-core.js:885-886: "Cardinal[1]
         also 'en' (locked as Danish K-1 default; 'et' is the neuter
         variant, not emitted here for tier/ener)". Deliberate deviation
         from NL's `één` and SV's `ett` disambiguation pattern: Danish
         K-1 register treats bare `en` as the default cardinal
         (article-ambiguity is acceptable in counting context); the
         live DA tiere-og-enere E12 activity already ships `en`.
         Shipping `ét` here would be inconsistent with DA's existing
         K-1 voice across the platform. Value-verified against
         _NUMBER_WORD_HELPERS.da(n, 'cardinal') for 0-10. */
      da: ['nul','en','to','tre','fire','fem','seks','syv','otte','ni','ti'],
      /* NO[1] = 'én' (acute) — modern Bokmål K-1 emphatic form,
         distinguishes from indefinite article 'en'. Locked per PVC
         source comment at place-value-core.js:808-810: "attributive:
         1 → 'én' with acute accent (K-1 emphatic form before noun,
         distinguishes from indefinite article 'en'). Cardinal[1] also
         'én'." Aligns with NL `één` + SV `ett` family (acute /
         disambiguating choice); distinct from DA's bare `en` choice.
         NO[7] = 'sju' — modern post-1951 Bokmål, NOT pre-reform 'syv'.
         Matches live NO E12 + E9 activities. Value-verified against
         _NUMBER_WORD_HELPERS.no(n, 'cardinal') for 0-10. */
      no: ['null','én','to','tre','fire','fem','seks','sju','åtte','ni','ti'],
      /* FI cardinals 0-10 (Uralic / Finnic family). Value-verified
         against _NUMBER_WORD_HELPERS.fi(n, 'cardinal') for 0-10 per
         place-value-core.js:756-761. FI[1] = 'yksi' (Finnish has no
         article/cardinal ambiguity — no acute disambiguation needed).
         FI[10] = 'kymmenen' — cardinal-10 form (genitive of noun
         'kymmen' functions as standalone cardinal '10' in Finnish per
         place-value-core.js:730-732). DISTINCT from the place-unit
         'kymmen/kymmentä' used in FI E12 decomposition sentences.
         FI[7] = 'seitsemän' — standard Finnish cardinal-7 (with ä). */
      fi: ['nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän','kymmenen']
    },
    /* Speech on Check correct — "All pairs make {n}!" templated.
       {n} substituted with the spoken target word from cardSpoken[lang]
       (same lookup as tap-audio; value-equivalent to PVC helper).
       FR uses regular space (U+0020) before "!" per shipped convention
       (lcs-shell + syllable-builder consistently use regular space, not
       NNBSP — verified Phase 1 of FR fan-out). PT canonical = BR; at
       0-10 BR-vs-EU cardinals are identical. */
    speakAllPairsMake: { en: 'All pairs make {n}!',                                                de: 'Alle Paare ergeben {n}!',                                                              es: '¡Todas las parejas forman {n}!',                                                                      it: 'Tutte le coppie fanno {n}!',                                                                                           fr: 'Toutes les paires font {n} !',                                                                                                                                      pt: 'Todos os pares formam {n}!',                                                                                                                                                                                                           nl: 'Alle paren maken {n}!',                                                                                  sv: 'Alla par blir {n}!',                                                                                     da: 'Alle par bliver {n}!',                                                                                   no: 'Alle par blir {n}!',                                                                                     fi: 'Jokainen pari on {n}!' },
    /* Speech on Check wrong. */
    speakTryAgain:     { en: 'Some pairs don\'t add up yet. Try again.',                           de: 'Manche Paare passen noch nicht. Versuch\'s nochmal.',                                  es: 'Algunas parejas no encajan todavía. Inténtalo de nuevo.',                                             it: 'Alcune coppie non vanno ancora. Riprova.',                                                                             fr: 'Certaines paires ne vont pas encore. Réessaie.',                                                                                                                    pt: 'Alguns pares ainda não fazem o objetivo. Tente novamente.',                                                                                                                                                                            nl: 'Sommige paren kloppen nog niet. Probeer het nog eens.',                                                  sv: 'Vissa par stämmer inte än. Försök igen.',                                                                da: 'Nogle par passer ikke endnu. Prøv igen.',                                                                no: 'Noen par stemmer ikke ennå. Prøv igjen.',                                                                fi: 'Jotkin parit eivät vielä täsmää. Yritä uudelleen.' }
  },

  defaults: {},
  settings: [],

  /* ---- state + setup ---- */
  init: function (api) {
    this.api = api;
    this.target = 0;
    this.cards = [];                  // [int,int,...] card values
    this.cardsState = [];             // 'unpaired'|'selected'|'paired'
    this.pairsFormed = [];            // [[idxA, idxB], ...]
    this.selectedIdx = null;          // currently-selected card index, or null
    this.wrongIdxSet = {};            // idx → true if last-Check marked wrong (visual)
    this.readOnly = false;
    this.language = (api && api.lang) || 'en';
  },

  /* Per-task hook. opts = { target, cards }.
     target: int (sum each pair must equal)
     cards:  [int,int,...] card values to render on the board.
     Card count must be even — every card pairs with exactly one other.
     Caller (activity wrapper) guarantees this from the manifest. */
  setupTask: function (opts) {
    opts = opts || {};
    this.target = (typeof opts.target === 'number') ? opts.target : 0;
    /* Shuffle a copy so the layout doesn't reveal pairs by adjacency.
       The manifest stores cards in natural order (e.g., [0,6,1,5,2,4]
       for Make-6); a 2-col CSS Grid would put each pair on the same
       row — kid never has to do the math, just reads rows. Fisher-
       Yates shuffle every setupTask invocation produces a fresh
       layout per task render, forcing the kid to actually find
       which cards sum to the target. Pedagogically required for
       K.OA.A.3 decomposition. */
    var src = Array.isArray(opts.cards) ? opts.cards.slice() : [];
    for (var i = src.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = src[i]; src[i] = src[j]; src[j] = t;
    }
    this.cards = src;
    this.cardsState = this.cards.map(function () { return 'unpaired'; });
    this.pairsFormed = [];
    this.selectedIdx = null;
    this.wrongIdxSet = {};
    this.readOnly = false;
  },

  /* True when every card is paired (all-pairs-formed; Check enables). */
  allPaired: function () {
    if (!this.cardsState.length) return false;
    for (var i = 0; i < this.cardsState.length; i++) {
      if (this.cardsState[i] !== 'paired') return false;
    }
    return true;
  },

  /* Find the partner index of a paired card. Returns -1 if not paired. */
  partnerOf: function (idx) {
    for (var i = 0; i < this.pairsFormed.length; i++) {
      var p = this.pairsFormed[i];
      if (p[0] === idx) return p[1];
      if (p[1] === idx) return p[0];
    }
    return -1;
  },

  /* Tap handler — public state machine. */
  onCardTap: function (idx) {
    if (this.readOnly) return;
    if (idx < 0 || idx >= this.cards.length) return;

    /* Clear any wrong-state on first interaction after a wrong-Check. */
    this.wrongIdxSet = {};

    var state = this.cardsState[idx];

    if (state === 'selected') {
      /* Deselect the currently-selected card. */
      this.cardsState[idx] = 'unpaired';
      this.selectedIdx = null;
      this._speakCard(idx);
      this.paint();
      return;
    }

    if (state === 'paired') {
      /* Unlink the pair containing idx. Both cards return to unpaired. */
      var partner = this.partnerOf(idx);
      if (partner >= 0) {
        this.cardsState[idx] = 'unpaired';
        this.cardsState[partner] = 'unpaired';
        this.pairsFormed = this.pairsFormed.filter(function (p) {
          return p[0] !== idx && p[1] !== idx && p[0] !== partner && p[1] !== partner;
        });
      }
      /* If a different card is selected, leave that selection intact —
         the kid can now tap a new partner for it. */
      this.api.sound(380);
      this.paint();
      return;
    }

    /* state === 'unpaired' */
    if (this.selectedIdx === null) {
      /* Select this card. */
      this.cardsState[idx] = 'selected';
      this.selectedIdx = idx;
      this._speakCard(idx);
      this.api.sound(720);
      this.paint();
      return;
    }

    /* Another unpaired card is selected → form pair. */
    var a = this.selectedIdx;
    this.cardsState[a] = 'paired';
    this.cardsState[idx] = 'paired';
    this.pairsFormed.push([a, idx]);
    this.selectedIdx = null;
    this.api.sound(660);
    this._speakCard(idx);
    this.paint();
    /* If all cards are now paired, broadcast the "Check enabled" state
       via a postMessage to the shell — the shell's Check button auto-
       enables for answerType:'state', but we want a visual paint pass. */
  },

  /* Speak the tapped card's value as a number-word via LCSAudio. */
  _speakCard: function (idx) {
    if (!window.LCSAudio || !window.LCSAudio.speak) return;
    var val = this.cards[idx];
    var table = (this.strings.cardSpoken && this.strings.cardSpoken[this.language])
                || this.strings.cardSpoken.en;
    if (typeof val !== 'number' || val < 0 || val >= table.length) return;
    window.LCSAudio.speak({
      type: 'number',
      text: table[val],
      lang: this.language,
      rate: 0.95
    });
  },

  /* Speak the Check-correct celebration utterance, templated with target.
     {n} is substituted with the SPOKEN word for the target value (from
     cardSpoken[lang], same lookup as tap-audio) rather than the digit —
     reads naturally for any locale's TTS engine, matches the kid's
     mental model of the number-word, and value-equivalent to
     PlaceValueCore._NUMBER_WORD_HELPERS[lang](target, 'cardinal') for
     the 0-10 range. */
  speakAllPairs: function () {
    if (!window.LCSAudio || !window.LCSAudio.speak) return;
    var template = (this.strings.speakAllPairsMake && this.strings.speakAllPairsMake[this.language])
                   || this.strings.speakAllPairsMake.en;
    var table = (this.strings.cardSpoken && this.strings.cardSpoken[this.language])
                || this.strings.cardSpoken.en;
    var targetWord = (typeof this.target === 'number' && this.target >= 0 && this.target < table.length)
                     ? table[this.target]
                     : String(this.target);
    var text = template.replace('{n}', targetWord);
    window.LCSAudio.speak({
      type: 'ui',
      text: text,
      lang: this.language,
      rate: 0.95
    });
  },

  /* Speak the Check-wrong nudge. */
  speakTryAgain: function () {
    if (!window.LCSAudio || !window.LCSAudio.speak) return;
    var text = (this.strings.speakTryAgain && this.strings.speakTryAgain[this.language])
               || this.strings.speakTryAgain.en;
    window.LCSAudio.speak({
      type: 'ui',
      text: text,
      lang: this.language,
      rate: 0.95
    });
  },

  /* Mark all cards in pairs that sum != target as "wrong" for visual
     feedback. Called by the activity wrapper from check() when Check
     returned false. */
  markWrongPairs: function () {
    this.wrongIdxSet = {};
    var self = this;
    this.pairsFormed.forEach(function (p) {
      var sum = self.cards[p[0]] + self.cards[p[1]];
      if (sum !== self.target) {
        self.wrongIdxSet[p[0]] = true;
        self.wrongIdxSet[p[1]] = true;
      }
    });
    this.paint();
  },

  /* ---- render + paint ---- */
  render: function () {
    var self = this;
    var stage = this.api.stage;
    stage.innerHTML = '';

    var wrap = this.api.el('div', 'mp-wrap');

    /* Target banner — shown above the board; matches the prompt strip
       above the activity surface. Big coral number; readable at 375px. */
    /* Expression mode = the board carries {display,...} object cards
       (unknown-addend template). Those boards contain subtraction cards
       that do NOT equal the whole (5 − 1 = 4, not 5), so a "Target/Whole = N"
       banner would be mathematically false — omit the banner entirely for
       expression mode. Numeric tasks (K.OA.A.3) keep the correct "Target N"
       banner because their pairs genuinely sum to the target. */
    var exprMode = this.cards.some(function (c) { return c && typeof c === 'object'; });

    var targetEl = null;
    if (!exprMode) {
      targetEl = this.api.el('div', 'mp-target');
      var targetLabel = this.api.el('span', 'mp-target-label');
      targetLabel.textContent = this.api.t('targetLabel') || 'Target';
      var targetNum = this.api.el('span', 'mp-target-num');
      targetNum.textContent = String(this.target);
      targetEl.append(targetLabel, targetNum);
    }

    /* SVG layer for connection lines. Positioned absolutely behind cards. */
    var linesSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    linesSvg.setAttribute('class', 'mp-lines');
    linesSvg.setAttribute('aria-hidden', 'true');

    /* Board — CSS grid with auto-fit; cards size to fit. */
    var board = this.api.el('div', 'mp-board');
    board.setAttribute('data-card-count', String(this.cards.length));

    /* Build card DOM. Each card is a button (semantic + keyboard-tappable). */
    this._cardEls = [];
    this.cards.forEach(function (val, idx) {
      /* val is either a plain number (numeric tasks, e.g. K.OA.A.3) or an
         expression-object {display, kind, pairKey} (unknown-addend tasks).
         Object branch is purely additive — numeric cards render exactly as
         before via String(val). */
      var isExpr = (val && typeof val === 'object');
      var face = isExpr ? (val.display != null ? String(val.display) : '') : String(val);
      var card = self.api.el('button', 'mp-card');
      card.type = 'button';
      if (isExpr) card.classList.add('mp-expr');
      card.setAttribute('data-idx', String(idx));
      card.setAttribute('aria-label', (self.api.t('cardAriaPrefix') || 'Card ') + face);
      var num = self.api.el('span', 'mp-card-num');
      num.textContent = face;
      card.appendChild(num);
      card.addEventListener('click', function () { self.onCardTap(idx); });
      board.appendChild(card);
      self._cardEls.push(card);
    });

    if (targetEl) wrap.append(targetEl);
    wrap.append(linesSvg, board);
    stage.appendChild(wrap);

    this._wrapEl = wrap;
    this._linesSvgEl = linesSvg;
    this._boardEl = board;

    /* Redraw lines on resize. Cleanup any prior listener — render()
       can be called multiple times (per-task setup); we hold ONE
       listener. */
    if (this._resizeHandler) {
      window.removeEventListener('resize', this._resizeHandler);
    }
    this._resizeHandler = function () { self._drawLines(); };
    window.addEventListener('resize', this._resizeHandler);

    this.paint();
  },

  paint: function () {
    if (!this._cardEls) return;
    var self = this;
    this._cardEls.forEach(function (el, idx) {
      var state = self.cardsState[idx];
      el.classList.remove('selected', 'paired', 'wrong');
      if (state === 'selected') el.classList.add('selected');
      if (state === 'paired')   el.classList.add('paired');
      if (self.wrongIdxSet[idx]) el.classList.add('wrong');
    });
    this._drawLines();
  },

  _drawLines: function () {
    if (!this._linesSvgEl || !this._wrapEl) return;
    var svg = this._linesSvgEl;
    /* Clear prior lines. */
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    /* Size SVG to wrap. */
    var wrapRect = this._wrapEl.getBoundingClientRect();
    svg.setAttribute('width', String(wrapRect.width));
    svg.setAttribute('height', String(wrapRect.height));
    svg.setAttribute('viewBox', '0 0 ' + wrapRect.width + ' ' + wrapRect.height);

    var self = this;
    this.pairsFormed.forEach(function (p) {
      var elA = self._cardEls[p[0]];
      var elB = self._cardEls[p[1]];
      if (!elA || !elB) return;
      var rectA = elA.getBoundingClientRect();
      var rectB = elB.getBoundingClientRect();
      var x1 = (rectA.left + rectA.right) / 2 - wrapRect.left;
      var y1 = (rectA.top + rectA.bottom) / 2 - wrapRect.top;
      var x2 = (rectB.left + rectB.right) / 2 - wrapRect.left;
      var y2 = (rectB.top + rectB.bottom) / 2 - wrapRect.top;
      var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', String(x1));
      line.setAttribute('y1', String(y1));
      line.setAttribute('x2', String(x2));
      line.setAttribute('y2', String(y2));
      /* Wrong pair → red-tinged line; correct pair → coral. */
      var isWrong = self.wrongIdxSet[p[0]] || self.wrongIdxSet[p[1]];
      line.setAttribute('stroke', isWrong ? '#C44' : '#F2784B');
      line.setAttribute('stroke-width', '4');
      line.setAttribute('stroke-linecap', 'round');
      svg.appendChild(line);
    });
  },

  reset: function () {
    this.cardsState = this.cards.map(function () { return 'unpaired'; });
    this.pairsFormed = [];
    this.selectedIdx = null;
    this.wrongIdxSet = {};
    this.readOnly = false;
    this.paint();
  },

  /* ---- CSS (one-shot, idempotent) ---- */
  injectCSS: function () {
    if (document.getElementById('mp-core-css')) return;
    var s = document.createElement('style');
    s.id = 'mp-core-css';
    s.textContent = [
      '.mp-wrap{position:relative;padding:1rem 0.5rem;display:flex;flex-direction:column;align-items:center;gap:0.75rem;}',
      '.mp-target{display:flex;align-items:baseline;gap:0.5rem;padding:0.4rem 1.2rem;background:#FBF3E4;border:3px solid #146B5E;border-radius:999px;font-family:"Baloo 2",sans-serif;}',
      '.mp-target-label{font-size:1rem;color:#146B5E;font-weight:600;}',
      '.mp-target-num{font-size:1.8rem;color:#F2784B;font-weight:800;line-height:1;}',
      '.mp-board{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.75rem;width:100%;max-width:560px;margin:0 auto;position:relative;z-index:2;justify-items:stretch;}',
      '@media (min-width:600px){.mp-board{grid-template-columns:repeat(4,minmax(0,1fr));}}',
      '.mp-board[data-card-count="4"]{grid-template-columns:repeat(2,minmax(0,1fr));max-width:340px;}',
      '.mp-board[data-card-count="6"]{grid-template-columns:repeat(2,minmax(0,1fr));max-width:340px;}',
      '@media (min-width:600px){.mp-board[data-card-count="6"]{grid-template-columns:repeat(3,minmax(0,1fr));max-width:480px;}}',
      '@media (min-width:600px){.mp-board[data-card-count="8"]{grid-template-columns:repeat(4,minmax(0,1fr));}}',
      '.mp-card{background:#FBF3E4;border:3px solid #146B5E;border-radius:18px;aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;font-family:"Baloo 2",sans-serif;font-weight:800;color:#F2784B;cursor:pointer;transition:transform 160ms ease,border-color 160ms ease,box-shadow 160ms ease,background 160ms ease;padding:0;min-width:0;min-height:64px;-webkit-tap-highlight-color:transparent;outline:none;}',
      '.mp-card:hover:not(.paired){transform:scale(1.03);box-shadow:0 4px 12px rgba(20,107,94,0.15);}',
      '.mp-card:focus-visible{box-shadow:0 0 0 3px rgba(242,120,75,0.5);}',
      '.mp-card-num{font-size:clamp(2rem,7vw,3.6rem);line-height:1;}',
      /* Expression-card faces ("7 − 2") are multi-glyph; shrink + keep on
         one line. Additive only — Direction-A palette + numeric rule above
         untouched. */
      '.mp-card.mp-expr .mp-card-num{font-size:clamp(1.4rem,5.5vw,2.4rem);letter-spacing:.02em;white-space:nowrap;}',
      '.mp-card.selected{border-color:#F2784B;border-width:5px;transform:scale(1.06);box-shadow:0 0 0 4px rgba(242,120,75,0.25);}',
      '.mp-card.paired{background:#E8F3E5;border-color:#5BAE5E;color:#2E6B33;cursor:pointer;}',
      '.mp-card.paired:hover{transform:scale(1.02);}',
      '.mp-card.wrong{border-color:#C44;background:#FCEBEB;color:#A33;animation:mp-shake 360ms cubic-bezier(0.36,0.07,0.19,0.97) both;}',
      '@keyframes mp-shake{10%,90%{transform:translateX(-1px);}20%,80%{transform:translateX(2px);}30%,50%,70%{transform:translateX(-3px);}40%,60%{transform:translateX(3px);}}',
      '.mp-lines{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;}'
    ].join('\n');
    document.head.appendChild(s);
  }
};
