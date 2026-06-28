/* =====================================================================
   MOCHI'S COUNTING FEAST — CORE   (mochi-feast-core.js)
   ---------------------------------------------------------------------
   CCSS K.CC.B.5 (count out a given number of objects) + K.CC.B.4
   (cardinality). A soft dumpling-creature, MOCHI, is hungry. Each round
   the child is asked to feed Mochi a target number of treats; they tap a
   serving dish to drop treats one-at-a-time into a bowl. When EXACTLY the
   asked number sit in the bowl and the child taps Check, Mochi happily
   eats. ≥7 rounds (varied treat + count). No keypad — the bowl IS the
   answer (answerType:'state').

   THE LOAD-BEARING DESIGN RULE: the count is carried by the TREATS
   THEMSELVES, never a numeral. The only number on screen is the target
   in the prompt (owned by the shell). The bowl filling is the count →
   this teaches cardinality, not numeral-reading, and feels like feeding a
   friend, not filling a ten-frame.

   CLEAN SIBLING CORE — zero lines to any of the protected cores
   (choice-board / cvc-builder / match-pairs / place-value / ten-frame /
   word-builder) and zero lines to lcs-shell.{js,css}. It mirrors their
   public contract (init / setupTask / render / paint / reset / isCorrect
   + an 11-locale strings dict + idempotent injectCSS) so a thin wrapper
   (mochi-feast-activity.js) merges it via Object.assign exactly like
   fractions-activity.js does.

   ASSET STRATEGY (operator dual-asset doctrine 2026-06-23):
     • CHARACTER (Mochi) — hand-drawn SVG PLACEHOLDER now; swaps to the
       operator's CA5 sprite animation later via _setPose() + lcs-sprite
       (see docs/character-art-spec.md). Mochi + bowl + rim stay TEAL
       structure / SVG furniture.
     • PROPS (the countable food) — REAL images from the 3,000-image
       library at /image-library-webp/themes/<theme>/<noun>@2x.webp (the
       asset moat), NOT hand-drawn. The count is still carried by the
       objects in the bowl, never a numeral (cardinality, K.CC.B.4).

   Answer is DERIVED, never stored: isCorrect() = fed.length === target.
   ===================================================================== */
window.MochiFeastCore = {

  /* CURATION FLAG: EN authored here; the 10 non-EN locales fold in later
     via the per-locale native ensemble (§A.13.48). EN-only for the pilot —
     the wrapper's slug map carries only `en`, so non-EN routes 404 by
     design (the cvc/syllable precedent). */
  strings: {
    title: { en: "Mochi's Counting Feast" },
    instruction: { en: "Tap the dish to feed Mochi the right number of treats, then tap Check." },

    /* One prompt per food noun (fully localizable later from
       image-vocabulary.js plurals). {n} is the target count — the ONLY
       numeral on screen. */
    promptStrawberry: { en: "Feed Mochi {n} strawberries!" },
    promptCookie:     { en: "Feed Mochi {n} cookies!" },
    promptCherry:     { en: "Feed Mochi {n} cherries!" },
    promptCupcake:    { en: "Feed Mochi {n} cupcakes!" },
    promptBanana:     { en: "Feed Mochi {n} bananas!" },
    promptApple:      { en: "Feed Mochi {n} apples!" },
    promptDonut:      { en: "Feed Mochi {n} donuts!" },
    promptMuffin:     { en: "Feed Mochi {n} muffins!" },

    /* gentle, no-shame try-again hints (returned by the wrapper's hintKey;
       the shell shows them on the prompt — no dynamic numbers, the shell
       does not interpolate hint args). */
    hintAddSome: { en: "Tap the dish to give Mochi a treat." },
    hintMore:    { en: "Mochi is still a little hungry — add a few more." },
    hintTooMany: { en: "Ooh, that's a lot! Tap a treat in the bowl to take one back." },

    /* tray label + sr nouns */
    trayLabel:  { en: "Tap to feed" },
    srAddTreat: { en: "Give Mochi a treat" },
    srTakeBack: { en: "Take this treat back" }
  },

  defaults: {},
  /* No settings drawer — feeding has no operator-facing options (the shell
     guards `if (tool.settings && tool.settings.length)`). */

  /* ---- Direction A palette ---- */
  _C: {
    T: '#146B5E',      // teal — Mochi body + bowl structure
    BODY: '#E2F0EC',   // pale teal — belly wash + bowl inside
    BOWL: '#EAF7EF',   // very pale teal — bowl body
    BOWL2: '#DCEFE9',  // bowl inner shadow
    CORAL: '#F2784B',  // coral — RESERVED for the treats (the count)
    CORAL2: '#D9572F', // coral shade — treat creases/details
    INK: '#2A2A35',    // eyes
    RIM: '#FFFFFF'     // highlights
  },

  /* ===================================================================
     PROP IMAGES  ***  FROM THE IMAGE LIBRARY (the asset moat)  ***
     The countable treats are REAL images, not hand-drawn. The noun is an
     image-vocabulary key; the theme is its library folder. §A.13.60
     variety is genuinely-different real foods. Localized plural nouns
     come from image-vocabulary.js[noun][locale][1] (folded at 11-locale
     time; EN plurals baked in the wrapper's per-noun prompt keys now).
     =================================================================== */
  _imgURL: function (noun, theme) {
    return '/image-library-webp/themes/' + encodeURIComponent(theme || 'fruits') + '/' + noun + '@2x.webp';
  },

  /* ---- state + setup ---- */
  init: function (api) {
    this.api = api;
    this.target = 3;          // how many to feed this round
    this.noun = 'strawberry'; // library noun (the countable food)
    this.theme = 'fruits';    // its library theme folder
    this.seed = 1;            // seeded jitter so the pile is stable per re-paint
    this.fed = [];            // treats currently in the bowl (length === the count)
    this.readOnly = false;    // wrapper sets true on a correct Check
    this._heartsSpawned = false;
  },

  /* opts = { target, noun, theme, seed }. */
  setupTask: function (opts) {
    opts = opts || {};
    this.target = Math.max(1, opts.target || 3);
    this.noun = opts.noun || 'strawberry';
    this.theme = opts.theme || 'fruits';
    this.seed = opts.seed || 1;
    this.fed = [];
    this.readOnly = false;
    this._heartsSpawned = false;
  },

  /* deterministic mulberry32 (matches the choice-board/fractions seeded
     pattern) — used for the per-treat resting jitter so the pile looks
     hand-dropped yet is identical across re-paints. */
  _rng: function (seed) {
    var s = seed | 0;
    return function () {
      s = (s + 0x6D2B79F5) | 0;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  },

  /* Resting positions for `count` treats INSIDE the bowl (viewBox 0 0 120
     140; bowl bucket spans y≈80..112, below Mochi's body which ends ~y74).
     Rows of up to 5 centred at x=60, filling the bucket bottom-up, plus a
     small seeded jitter. 2 rows hold up to 10 — the K-range ceiling — and
     every treat stays fully visible + countable inside the bowl. */
  _treatPositions: function (count) {
    var rng = this._rng(this.seed);
    /* sit treats in the bowl so the opaque front wall (top ≈y100) covers
       their lower third while their tops show in the window between the back
       rim (y80) and the front wall; pile up by rowH. */
    var perRow = 5, gapX = 12, rowH = 9, bottomY = 98, pos = [];
    for (var i = 0; i < count; i++) {
      var row = Math.floor(i / perRow);
      var col = i % perRow;
      var inThisRow = Math.min(perRow, count - row * perRow);
      var rowW = (inThisRow - 1) * gapX;
      var x = 60 - rowW / 2 + col * gapX + (rng() - 0.5) * 2.2;
      var y = bottomY - row * rowH + (rng() - 0.5) * 1.6;
      pos.push({ x: x, y: y });
    }
    return pos;
  },

  /* ---- the Mochi + bowl scene (drawn once per task) ---- */
  _sceneSVG: function () {
    var C = this._C;
    return '' +
      /* ---- MOCHI (teal dumpling, upper area) ---- */
      '<g class="mf-mochi">' +
        '<path class="mf-body" d="M22 44 C22 18 98 18 98 44 C98 66 84 74 60 74 C36 74 22 66 22 44 Z" fill="' + C.T + '"/>' +
        '<ellipse cx="60" cy="52" rx="27" ry="17" fill="' + C.BODY + '" opacity="0.45"/>' +
        '<ellipse cx="44" cy="33" rx="11" ry="7" fill="' + C.RIM + '" opacity="0.32"/>' +
        '<ellipse class="mf-cheek" cx="40" cy="55" rx="6" ry="4" fill="' + C.CORAL + '" opacity="0.55"/>' +
        '<ellipse class="mf-cheek" cx="80" cy="55" rx="6" ry="4" fill="' + C.CORAL + '" opacity="0.55"/>' +
        /* eyes — open (idle) */
        '<g class="mf-eyes-open">' +
          '<circle cx="51" cy="43" r="4" fill="' + C.INK + '"/><circle cx="69" cy="43" r="4" fill="' + C.INK + '"/>' +
          '<circle cx="52.4" cy="41.2" r="1.4" fill="' + C.RIM + '"/><circle cx="70.4" cy="41.2" r="1.4" fill="' + C.RIM + '"/>' +
        '</g>' +
        /* eyes — happy (^ ^) */
        '<g class="mf-eyes-happy">' +
          '<path d="M47 44 Q51 38.5 55 44" stroke="' + C.INK + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
          '<path d="M65 44 Q69 38.5 73 44" stroke="' + C.INK + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '</g>' +
        /* mouth variants */
        '<ellipse class="mf-mouth-idle" cx="60" cy="57" rx="4.4" ry="3.1" fill="' + C.CORAL2 + '"/>' +
        '<ellipse class="mf-mouth-nom" cx="60" cy="58" rx="4.8" ry="6" fill="' + C.CORAL2 + '"/>' +
        '<circle class="mf-mouth-oops" cx="60" cy="58" r="3.2" fill="' + C.CORAL2 + '"/>' +
        '<path class="mf-mouth-happy" d="M52 57 Q60 65 68 57" stroke="' + C.INK + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '</g>' +
      /* ---- BOWL (a deep bucket in front of Mochi's lower body; treats sit
         inside it, fully visible, below Mochi) ---- */
      '<path class="mf-bowl-body" d="M26 80 Q30 113 60 113 Q90 113 94 80 Z" fill="' + C.BOWL + '" stroke="' + C.T + '" stroke-width="2.6"/>' +
      '<ellipse cx="60" cy="80" rx="34" ry="8.5" fill="' + C.BOWL2 + '"/>' +
      '<g class="mf-bowl-treats"></g>' +
      /* OPAQUE bowl FRONT WALL (drawn AFTER the treats group) — covers the
         lower portion of the treats so they read as INSIDE the bowl (a stroke
         is not containment). The coral rim stays on top as the lip accent. */
      '<path class="mf-bowl-front" d="M26 100 Q60 104 94 100 Q90 113 60 113 Q30 113 26 100 Z" fill="' + C.BOWL + '" stroke="' + C.T + '" stroke-width="2.2"/>' +
      '<path class="mf-bowl-rim" d="M26 80 Q60 92 94 80" fill="none" stroke="' + C.CORAL + '" stroke-width="3.4" stroke-linecap="round"/>';
  },

  /* ---- render(): build the scene + the serving-dish source ---- */
  render: function () {
    this.injectCSS();
    var api = this.api, self = this;
    var stage = api.stage;
    stage.innerHTML = '';

    var wrap = api.el('div', 'mf-wrap');

    /* the scene (Mochi + bowl) as ONE SVG that scales as a unit */
    var scene = api.el('div', 'mf-scene');
    scene.setAttribute('data-pose', 'idle');
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    /* viewBox cropped 140→123: Mochi + bowl content ends at y≈115 (treats rest
       at y≤110), so the old 140 height padded ~45px of empty transparent space
       below the bowl, inflating the stack past the desktop fold (visual-qa
       CUT-OFF, operator 2026-06-23). 123 keeps all content + a small base
       margin and reclaims the dead space. */
    svg.setAttribute('viewBox', '0 0 120 123');
    svg.setAttribute('class', 'mf-svg');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Mochi and a bowl');
    svg.insertAdjacentHTML('beforeend', this._sceneSVG());
    scene.appendChild(svg);
    wrap.appendChild(scene);
    this._sceneEl = scene;
    this._treatsG = svg.querySelector('.mf-bowl-treats');

    /* the serving dish — a single big DOM button. Tap to give Mochi ONE
       treat. A stable-width source (NOT one token per target) keeps 280px
       clean AND avoids pre-answering the count. */
    var tray = api.el('button', 'mf-tray');
    tray.type = 'button';
    tray.setAttribute('aria-label', api.t('srAddTreat'));
    var dish = '<img class="mf-tray-treat" src="' + this._imgURL(this.noun, this.theme) + '" alt="" draggable="false">';
    var label = '<span class="mf-tray-label">' + this._esc(api.t('trayLabel')) + '</span>';
    tray.innerHTML = dish + label;
    tray.addEventListener('click', function () { self._addTreat(); });
    wrap.appendChild(tray);
    this._trayEl = tray;

    stage.appendChild(wrap);
    this.paint();
  },

  _esc: function (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  },

  _addTreat: function () {
    if (this.readOnly) return;
    this.fed.push(1);
    if (this.api && this.api.sound) this.api.sound(760);
    this.paint();   // sets the base pose (idle/oops) from the new count
    /* then overlay a quick "nom" bite, settling back to the state pose */
    var self = this;
    if (this._sceneEl && !(this.fed.length > this.target)) {
      this._setPose('nom');
      clearTimeout(this._nomT);
      this._nomT = setTimeout(function () { if (!self.readOnly) self._refreshPose(); }, 240);
    }
    if (this.api && this.api.track) this.api.track('feed', { count: this.fed.length, target: this.target });
  },

  _removeTreat: function (i) {
    if (this.readOnly) return;
    this.fed.splice(i, 1);
    if (this.api && this.api.sound) this.api.sound(380);
    this.paint();
  },

  /* THE CHARACTER SEAM. Today the character is the SVG placeholder, driven
     by a [data-pose] class. When the operator's CA5 sprite is delivered
     (see docs/character-art-spec.md) this is the ONE place that swaps to
     lcs-sprite play() — idle loops, nom/happy play once — with the SVG as
     the reduced-motion / not-yet-built fallback. Pose names are stable:
     idle | nom | happy | oops. */
  character: 'mochi',
  _setPose: function (name) {
    if (this._sceneEl) this._sceneEl.setAttribute('data-pose', name);
    /* future: if (window.LCSSprite && LCSSprite.has(this.character))
         LCSSprite.play(this._charEl, name, { loop: name === 'idle' }); */
  },

  /* set the Mochi pose from the current count (no correctness reveal: face
     stays idle while feeding; only an OVER-count gets the gentle surprised
     nudge; a correct Check switches to the happy face via paint+readOnly). */
  _refreshPose: function () {
    if (!this._sceneEl) return;
    if (this.readOnly) { this._setPose('happy'); return; }
    if (this.fed.length > this.target) this._setPose('oops');
    else this._setPose('idle');
  },

  /* ---- paint(): reflect the bowl + Mochi from `fed` ---- */
  paint: function () {
    if (!this._treatsG) return;
    var self = this, C = this._C;
    var url = this._imgURL(this.noun, this.theme);
    var pos = this._treatPositions(this.fed.length);
    var html = '';
    pos.forEach(function (p, i) {
      var t = 'translate(' + p.x.toFixed(2) + ',' + p.y.toFixed(2) + ')';
      /* the countable prop = a real library image (SVG <image> scales with
         the scene); the transparent circle on top is the removal target. */
      html += '<g class="mf-treat" transform="' + t + '">' +
        '<image href="' + url + '" x="-9" y="-9" width="18" height="18" preserveAspectRatio="xMidYMid meet" aria-hidden="true"/>' +
        '<circle class="mf-treat-hit" r="9" fill="transparent" role="button" data-i="' + i + '" ' +
          'aria-label="' + self._esc(self.api.t('srTakeBack')) + '"/>' +
        '</g>';
    });
    this._treatsG.innerHTML = html;
    if (!this.readOnly) {
      this._treatsG.querySelectorAll('.mf-treat-hit').forEach(function (h) {
        h.style.cursor = 'pointer';
        h.addEventListener('click', function () { self._removeTreat(parseInt(h.getAttribute('data-i'), 10)); });
      });
    }

    /* bowl over-fill glow */
    var rim = this._sceneEl && this._sceneEl.querySelector('.mf-bowl-rim');
    if (rim) { if (this.fed.length > this.target) rim.classList.add('mf-over'); else rim.classList.remove('mf-over'); }

    this._refreshPose();

    /* the affection beat on a correct Check (readOnly): hearts rise once */
    if (this.readOnly && !this._heartsSpawned) { this._heartsSpawned = true; this._spawnHearts(); }

    if (this.api && this.api.announce) this.api.announce(this.fed.length + ' / ' + this.target);
  },

  /* code-drawn hearts rising from the bowl — the warm, NON-competitive
     celebration (affection, not a win). Respects prefers-reduced-motion. */
  _spawnHearts: function () {
    if (!this._sceneEl) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var C = this._C, layer = document.createElement('div');
    layer.className = 'mf-hearts';
    for (var i = 0; i < 4; i++) {
      var s = document.createElement('span');
      s.className = 'mf-heart';
      s.style.left = (32 + i * 12 + (i % 2) * 4) + '%';
      s.style.animationDelay = (i * 70) + 'ms';
      s.innerHTML = '<svg viewBox="0 0 100 100" width="20" height="20" aria-hidden="true">' +
        '<path d="M50 84C20 62 12 44 12 32a20 20 0 0 1 38-8 20 20 0 0 1 38 8c0 12-8 30-38 52z" fill="' +
        (i % 2 ? C.T : C.CORAL) + '"/></svg>';
      layer.appendChild(s);
    }
    this._sceneEl.appendChild(layer);
    setTimeout(function () { if (layer.parentNode) layer.parentNode.removeChild(layer); }, 1300);
  },

  /* correctness = exactly the asked number of treats */
  isCorrect: function () { return this.fed.length === this.target; },

  reset: function () { this.fed = []; this.readOnly = false; this._heartsSpawned = false; this.paint(); },

  /* ---- stage CSS — idempotent (safe from both core + wrapper). Sizing in
     vw/clamp, never vmin/vh (§A.13.47 rule 1); !important per rule 6. ---- */
  _cssInjected: false,
  injectCSS: function () {
    if (this._cssInjected) return;
    this._cssInjected = true;
    var css = ''
      + '.mf-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.4vw,9px);width:100%;max-width:min(94vw,520px);margin:0 auto;}'
      + '.mf-scene{position:relative;width:100%;display:flex;justify-content:center;}'
      /* Character SVG viewBox is 120×140 (tall) → width drives height ×1.17.
         Capped smaller so the prompt + character + tray + Check stack fits the
         fold at every width incl. desktop (visual-qa CUT-OFF, operator
         2026-06-23): was min(86vw,360px) → ~420px tall at desktop, overran. */
      + '.mf-svg{width:min(55vw,194px)!important;height:auto!important;display:block;overflow:visible;}'
      /* narrowest phones (Galaxy Fold cover ~320px): tighten the stack gap so
         the scene + tray + Check clear the fold; 360px+ unaffected. */
      + '@media (max-width:360px){.mf-wrap{gap:5px;}}'
      /* Mochi pose variants — toggled by [data-pose] (display, reduced-motion-safe) */
      + '.mf-eyes-happy,.mf-mouth-nom,.mf-mouth-oops,.mf-mouth-happy{display:none;}'
      + '.mf-scene[data-pose="nom"] .mf-mouth-idle{display:none;} .mf-scene[data-pose="nom"] .mf-mouth-nom{display:inline;}'
      + '.mf-scene[data-pose="oops"] .mf-mouth-idle{display:none;} .mf-scene[data-pose="oops"] .mf-mouth-oops{display:inline;}'
      + '.mf-scene[data-pose="happy"] .mf-eyes-open{display:none;} .mf-scene[data-pose="happy"] .mf-eyes-happy{display:inline;}'
      + '.mf-scene[data-pose="happy"] .mf-mouth-idle{display:none;} .mf-scene[data-pose="happy"] .mf-mouth-happy{display:inline;}'
      + '.mf-cheek{transition:opacity .2s var(--lcs-ease,ease);}'
      + '.mf-scene[data-pose="happy"] .mf-cheek{opacity:0.78;}'
      + '.mf-mochi{transform-box:fill-box;transform-origin:50% 82%;}'
      /* the chew bounce + over-fill glow (motion gated) */
      + '.mf-bowl-rim{transition:filter .2s var(--lcs-ease,ease),stroke-width .2s;}'
      + '.mf-bowl-rim.mf-over{stroke-width:4.4;filter:drop-shadow(0 0 3px ' + this._C.CORAL + ');}'
      /* treat removal target */
      + '.mf-treat-hit{pointer-events:auto;touch-action:manipulation;}'
      /* the serving dish — big, thumb-reachable, ≥44px */
      + '.mf-tray{display:inline-flex;flex-direction:column;align-items:center;gap:4px;'
      +   'background:var(--lcs-card,#FBF3E4);border:3px solid ' + this._C.CORAL + ';border-radius:18px;'
      +   'padding:clamp(8px,2.4vw,12px) clamp(14px,4vw,22px);min-width:44px;min-height:44px;cursor:pointer;'
      +   'box-shadow:0 4px 0 rgba(217,87,47,0.35);transition:transform .1s,box-shadow .1s;touch-action:manipulation;}'
      + '.mf-tray:active{transform:translateY(3px);box-shadow:0 1px 0 rgba(217,87,47,0.35);}'
      + '.mf-tray:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
      + '.mf-tray-treat{width:clamp(34px,9vw,44px);height:clamp(34px,9vw,44px);display:block;object-fit:contain;}'
      + '.mf-tray-label{font-family:"Baloo 2",var(--lcs-font-display,sans-serif);font-weight:700;'
      +   'font-size:clamp(13px,3.6vw,16px);color:' + this._C.T + ';line-height:1;}'
      /* rising hearts */
      + '.mf-hearts{position:absolute;inset:0;pointer-events:none;overflow:visible;}'
      + '.mf-heart{position:absolute;bottom:34%;animation:mfHeart 1.2s var(--lcs-ease,ease) forwards;opacity:0;}'
      + '@keyframes mfHeart{0%{opacity:0;transform:translateY(0) scale(.6);}25%{opacity:1;}100%{opacity:0;transform:translateY(-58px) scale(1);}}'
      + '@media (prefers-reduced-motion: no-preference){'
      +   '.mf-scene[data-pose="nom"] .mf-mochi{animation:mfChew .22s var(--lcs-ease,ease);}'
      +   '@keyframes mfChew{0%{transform:scaleY(1);}45%{transform:scaleY(.94);}100%{transform:scaleY(1);}}'
      + '}'
      + '@media (prefers-reduced-motion: reduce){.mf-heart{display:none;}}';
    var tag = document.createElement('style');
    tag.setAttribute('data-mochi-feast-core', '');
    tag.textContent = css;
    document.head.appendChild(tag);
  }
};
