/* =====================================================================
   DR. PLUME'S SENTENCE CLINIC — ACTIVITY  (sentence-clinic-activity.js)
   ---------------------------------------------------------------------
   CCSS L.2.1 — Grade 2 grammar/usage. A muddled sentence arrives "not
   quite itself"; the child helps it SOUND RIGHT again by performing the
   right repair. DIAGNOSE (find the trouble) → REPAIR (the action) →
   sounds-right. The repair affordance for a SWAP appears only AFTER a
   correct diagnosis → blind-swapping is structurally impossible.

   COGNITION reused from mini tools/fix-it-core.js (window.FixItCore:
   diagnoseCorrect / repairOptions / repairCorrect / applyRepair, the 7
   distinct ACTIONS). Full lcs-shell tool. answerType:'state'.

   Warm treehouse checkup-nook — NO surgery/scalpel/bandage language. A
   wrong move = the sentence GIGGLES + undoes (never a red X); the trouble
   cue is a soft thinking-GLOW (not a bandage); progress is a sounds-right
   pulse that only ever climbs. Dr. Plume (grandmother-owl) = SVG
   PLACEHOLDER via the _setPose CA5 seam. Words ALWAYS DOM (per-locale
   content never touches art). Fully playable audio-off.

   0 lines to the 6 protected cores + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.FixItCore;
  var LANG = 'en';

  var C = {
    T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F',
    CREAM: '#FBF3E4', INK: '#2A2A35', RIM: '#FFFFFF', GOOD: '#2FA56A', WOOD: '#C7956A'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function interp(t, args) { return String(t || '').replace(/\{(\w+)\}/g, function (m, k) { return (k in args) ? args[k] : m; }); }
  function shuffledOrder(n, prev) {
    var idx = [], i, j, t; for (i = 0; i < n; i++) idx.push(i);
    if (n < 2) return idx;
    function same(a, b) { if (!b) return false; for (var k = 0; k < a.length; k++) if (a[k] !== b[k]) return false; return true; }
    do { for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = idx[i]; idx[i] = idx[j]; idx[j] = t; } } while (same(idx, prev));
    return idx;
  }
  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'ui', text: text, lang: LANG, rate: 0.92 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) {
        var u = new global.SpeechSynthesisUtterance(text); u.lang = LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : 'en-US'; u.rate = 0.92; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u);
      }
    } catch (e) { /* audio is a scaffold; visual is the spine */ }
  }

  /* Dr. Plume — gentle grandmother-owl SVG PLACEHOLDER (CA5 swaps in via _setPose).
     Round body, a soft coral shawl, big spectacles, ear tufts, a knitted cap. */
  function plumeSVG() {
    return '<svg class="sc-plume-svg" viewBox="0 0 120 120" role="img" aria-label="Dr. Plume the owl">' +
      '<ellipse cx="60" cy="114" rx="33" ry="6" fill="rgba(0,0,0,.08)"/>' +
      /* ear tufts (clear triangles) */
      '<path d="M30 40 L22 18 L46 32 Z" fill="' + C.T + '"/><path d="M90 40 L98 18 L74 32 Z" fill="' + C.T + '"/>' +
      /* body */
      '<path d="M24 62 Q24 26 60 26 Q96 26 96 62 Q96 100 60 102 Q24 100 24 62 Z" fill="' + C.T + '"/>' +
      /* coral shawl at the bottom */
      '<path d="M26 90 Q60 78 94 90 Q90 106 60 108 Q30 106 26 90 Z" fill="' + C.CORAL + '" stroke="' + C.CORAL2 + '" stroke-width="2"/>' +
      /* big LIGHT face disc (so the face reads at small size) */
      '<ellipse cx="60" cy="56" rx="34" ry="32" fill="#FBF3E4"/>' +
      /* knitted cap across the brow */
      '<path d="M27 40 Q60 18 93 40 Q93 50 60 46 Q27 50 27 40 Z" fill="' + C.T2 + '"/>' +
      '<path d="M27 40 Q60 30 93 40" fill="none" stroke="' + C.RIM + '" stroke-width="2" opacity=".4"/>' +
      '<circle cx="60" cy="22" r="6" fill="' + C.CORAL + '"/>' +
      /* BIG spectacle eyes — the owl read */
      '<circle cx="46" cy="58" r="16" fill="#fff" stroke="' + C.CORAL2 + '" stroke-width="3"/>' +
      '<circle cx="74" cy="58" r="16" fill="#fff" stroke="' + C.CORAL2 + '" stroke-width="3"/>' +
      '<line x1="62" y1="58" x2="58" y2="58" stroke="' + C.CORAL2 + '" stroke-width="3"/>' +
      '<g class="sc-pl-eyes-open"><circle cx="46" cy="59" r="6.5" fill="' + C.INK + '"/><circle cx="74" cy="59" r="6.5" fill="' + C.INK + '"/><circle cx="49" cy="56" r="2.2" fill="#fff"/><circle cx="77" cy="56" r="2.2" fill="#fff"/></g>' +
      '<g class="sc-pl-eyes-happy"><path d="M38 59 Q46 50 54 59" stroke="' + C.INK + '" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M66 59 Q74 50 82 59" stroke="' + C.INK + '" stroke-width="4" fill="none" stroke-linecap="round"/></g>' +
      /* beak */
      '<path d="M60 66 L52 76 L68 76 Z" fill="' + C.CORAL + '" stroke="' + C.CORAL2 + '" stroke-width="1.5"/>' +
      '<ellipse cx="34" cy="70" rx="5" ry="3.4" fill="' + C.CORAL + '" opacity=".45"/><ellipse cx="86" cy="70" rx="5" ry="3.4" fill="' + C.CORAL + '" opacity=".45"/>' +
      '</svg>';
  }
  function leafSVG() {
    return '<svg viewBox="0 0 40 60" aria-hidden="true"><line x1="20" y1="0" x2="20" y2="34" stroke="' + C.T2 + '" stroke-width="2"/>' +
      '<path d="M20 30 Q6 30 8 44 Q22 44 20 30 Z" fill="' + C.T2 + '"/><path d="M20 22 Q34 22 32 36 Q18 36 20 22 Z" fill="' + C.T + '"/>' +
      '<path d="M20 40 Q10 42 12 52 Q22 50 20 40 Z" fill="' + C.GOOD + '"/></svg>';
  }

  global.SentenceClinicActivity = {
    id: 'sentence-clinic-activity',

    strings: {
      title:        { en: "Dr. Plume's Sentence Clinic", de: 'Dr. Plumes Satzklinik', fr: 'La clinique des phrases du Dr. Plume' },
      instruction:  { en: 'Help each muddled sentence sound right again. Tap Check when it sounds good.', de: 'Hilf jedem verdrehten Satz, wieder richtig zu klingen. Tippe auf Prüfen, wenn er gut klingt.', fr: 'Aide chaque phrase mélangée à sonner juste. Touche Vérifier quand elle sonne bien.' },
      promptCap:    { en: 'Tap the word that needs a capital letter.', de: 'Tippe das Wort an, das einen großen Buchstaben braucht.', fr: 'Touche le mot qui a besoin d’une majuscule.' },
      promptPunct:  { en: 'Tap the mark that finishes the sentence.', de: 'Tippe das Satzzeichen an, das den Satz beendet.', fr: 'Touche le signe qui termine la phrase.' },
      promptSwap:   { en: "Tap the word that sounds wrong, then pick the right one.", de: 'Tippe das falsche Wort an und wähle das richtige.', fr: 'Touche le mot qui sonne faux, puis choisis le bon.' },
      promptInsert: { en: 'Tap the word that fills the gap.', de: 'Wähle das Wort, das in die Lücke passt.', fr: 'Choisis le mot qui remplit le trou.' },
      promptReorder:{ en: 'Tap the words in order to build the sentence.', de: 'Tippe die Wörter der Reihe nach an, um den Satz zu bauen.', fr: 'Touche les mots dans l’ordre pour construire la phrase.' },
      promptDelete: { en: "Tap the word that doesn't belong.", de: 'Tippe das Wort an, das zu viel ist.', fr: 'Touche le mot qui est en trop.' },
      promptSplit:  { en: 'Tap where two sentences bump together.', de: 'Tippe dort, wo zwei Sätze zusammenstoßen.', fr: 'Touche l’endroit où deux phrases se cognent.' },
      alright:      { en: "That one's alright — look again!", de: 'Der ist schon richtig — schau noch mal!', fr: 'C’est déjà correct — regarde encore !' },
      giggle:       { en: 'Hee hee — not quite. Listen again!', de: 'Hi hi — nicht ganz. Hör noch mal hin!', fr: 'Hi hi — presque ! Écoute encore.' },
      soundsRight:  { en: 'Yes! Now it sounds right.', de: 'Ja! Jetzt klingt er richtig.', fr: 'Oui ! Maintenant, ça sonne juste.' },
      hintCheck:    { en: "Keep helping the sentence — then tap Check.", de: 'Hilf dem Satz weiter — tippe dann auf Prüfen.', fr: 'Aide la phrase — puis touche Vérifier.' }
    },

    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks(Core.buildRounds()); this._order = null; this._curPass = 0; this._orderForPool = null;
      this.round = null; this.phase = 'diagnose'; this.tokens = []; this.placed = []; this.diagnosed = -1;
      this.readOnly = false; this.solved = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) { this._loadActivity(); }
    },

    setupTask: function (round) {
      this.round = round;
      this.tokens = round.tokens.slice();
      this.diagnosed = -1; this.placed = []; this.readOnly = false; this.solvedNow = false;
      // insert actions show the gap + option chips from the start; reorder = arrange; rest = diagnose
      this.phase = (round.action === 'insert-punct' || round.action === 'insert-word') ? 'repair'
        : (round.action === 'reorder') ? 'arrange' : 'diagnose';
      var seed = 0; for (var i = 0; i < round.id.length; i++) seed = (seed * 31 + round.id.charCodeAt(i)) | 0;
      this._optOrder = null; this._reorderTray = null; this._seed = seed;
    },

    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'sc-wrap');
      var scene = api.el('div', 'sc-scene');

      /* nook counter — a warm wood header where Dr. Plume (the host) sits, with
         a hanging leaf sprig (treehouse-nook warmth, not a bare rectangle) */
      var nook = api.el('div', 'sc-nook');
      var leaf = api.el('div', 'sc-leaf'); leaf.innerHTML = leafSVG();
      var plume = api.el('div', 'sc-plume'); plume.setAttribute('data-pose', 'idle'); plume.innerHTML = plumeSVG();
      this._plumeEl = plume;
      nook.append(leaf, plume);

      var card = api.el('div', 'sc-card'); this._cardEl = card;

      /* sounds-right pulse meter (only climbs) */
      var pulse = api.el('div', 'sc-pulse');
      var fill = api.el('div', 'sc-pulse-fill'); this._pulseFill = fill;
      pulse.appendChild(fill);

      scene.append(nook, card, pulse);
      wrap.appendChild(scene);
      stage.appendChild(wrap);
      this._renderCard();
      this._paintPulse();
      this._setPose('idle');
    },

    _renderCard: function () {
      var self = this, api = this.api, card = this._cardEl; card.innerHTML = '';
      if (!this.round) return;                                   // mount-time render before the first task loads
      if (this.round.action === 'reorder') { this._renderReorder(card); return; }

      var sent = api.el('div', 'sc-sentence');
      var action = this.round.action, gapIndex = this.round.gapIndex;
      var isInsert = (action === 'insert-punct' || action === 'insert-word');

      for (var i = 0; i <= this.tokens.length; i++) {
        // gap slot for insert actions (at gapIndex)
        if (isInsert && i === gapIndex) {
          var slot = api.el('span', 'sc-gap' + (this._gapFilled ? ' is-filled' : ''));
          slot.textContent = this._gapFilled ? this._gapFilled : '';
          sent.appendChild(slot);
        }
        if (i === this.tokens.length) break;
        // seam (split action): a tappable gap BEFORE each word except the first
        if (action === 'split' && i > 0 && !this.readOnly) {
          (function (seam) {
            var s = api.el('button', 'sc-seam'); s.type = 'button'; s.setAttribute('aria-label', 'split here');
            s.innerHTML = '<span class="sc-seam-mark"></span>';
            s.addEventListener('click', function () { self._tapSeam(seam - 1); }); // seam BEFORE word i ⇒ after word i-1
            sent.appendChild(s);
          }(i));
        }
        var tok = this.tokens[i];
        var chip = api.el(this._tappableWord(action) && !this.readOnly ? 'button' : 'span', 'sc-chip');
        if (chip.tagName === 'BUTTON') chip.type = 'button';
        chip.textContent = tok;
        if (this.diagnosed === i && action === 'swap') chip.classList.add('is-target');
        if (this._tappableWord(action) && !this.readOnly) {
          (function (idx) { chip.addEventListener('click', function () { self._tapWord(idx); }); }(i));
        }
        sent.appendChild(chip);
      }
      card.appendChild(sent);

      /* repair chip tray — swap (after diagnosis) or insert (always) */
      var showOpts = (action === 'swap' && this.phase === 'repair') || isInsert;
      if (showOpts && !this.readOnly) {
        var opts = Core.repairOptions(this.round) || [];
        if (!this._optOrder || this._optOrder.length !== opts.length) this._optOrder = shuffledOrder(opts.length, null).map(function (k) { return k; });
        var tray = api.el('div', 'sc-tray');
        this._optOrder.forEach(function (k) {
          var val = opts[k];
          var b = api.el('button', 'sc-opt'); b.type = 'button'; b.textContent = val;
          b.addEventListener('click', function () { self._tapOption(val); });
          tray.appendChild(b);
        });
        card.appendChild(tray);
      }

      /* the kid-rule caption (shown once solved — teaching rides the success) */
      if (this.readOnly) {
        var rule = api.el('div', 'sc-rule'); rule.textContent = this.round.convention; card.appendChild(rule);
      }
    },

    _renderReorder: function (card) {
      var self = this, api = this.api, total = this.round.tokens.length;
      /* a row of slots (one per word) — filled slots show the placed word, empty
         slots glow as clear "drop a word here" targets (the tray→line wiring). */
      var build = api.el('div', 'sc-sentence sc-build');
      for (var pos = 0; pos < total; pos++) {
        if (pos < this.placed.length) {
          var ti = this.placed[pos];
          var b = api.el('button', 'sc-chip sc-placed'); b.type = 'button'; b.textContent = this.round.tokens[ti];
          if (!this.readOnly) (function (p) { b.addEventListener('click', function () { self._unplace(p); }); }(pos));
          build.appendChild(b);
        } else {
          var slot = api.el('span', 'sc-slot' + (pos === this.placed.length && !this.readOnly ? ' is-next' : ''));
          build.appendChild(slot);
        }
      }
      card.appendChild(build);

      if (!this.readOnly) {
        var tray = api.el('div', 'sc-tray');
        this.round.tokens.forEach(function (tok, ti) {
          if (self.placed.indexOf(ti) >= 0) return;       // already placed
          var b = api.el('button', 'sc-opt'); b.type = 'button'; b.textContent = tok;
          b.addEventListener('click', function () { self._place(ti); });
          tray.appendChild(b);
        });
        card.appendChild(tray);
      }
      if (this.readOnly) { var rule = api.el('div', 'sc-rule'); rule.textContent = this.round.convention; card.appendChild(rule); }
    },

    _tappableWord: function (action) { return action === 'capitalize' || action === 'swap' || action === 'delete'; },

    _tapWord: function (i) {
      if (this.readOnly) return;
      var a = this.round.action;
      if (a === 'swap' && this.phase === 'repair') { return; } // words locked once diagnosed
      if (Core.diagnoseCorrect(this.round, i)) {
        if (a === 'capitalize' || a === 'delete') {
          this.tokens = Core.applyRepair(this.round); this._win();
        } else if (a === 'swap') {
          this.diagnosed = i; this.phase = 'repair'; this._setPose('examine'); this.api.sound && this.api.sound(660);
          this._renderCard();
        }
      } else { this._alright(); }
    },

    _tapSeam: function (afterIndex) {
      if (this.readOnly) return;
      if (Core.diagnoseCorrect(this.round, afterIndex)) { this.tokens = Core.applyRepair(this.round); this._win(); }
      else this._alright();
    },

    _tapOption: function (val) {
      if (this.readOnly) return;
      if (Core.repairCorrect(this.round, val)) {
        if (this.round.action === 'swap') this.tokens = Core.applyRepair(this.round);
        else { this._gapFilled = val; this.tokens = Core.applyRepair(this.round); }
        this._win();
      } else { this._giggle(); }
    },

    _place: function (ti) { if (this.readOnly) return; this.placed.push(ti); this.api.sound && this.api.sound(620); this._renderCard(); this._maybeReorderDone(); },
    _unplace: function (pos) { if (this.readOnly) return; this.placed.splice(pos, 1); this._renderCard(); },
    _maybeReorderDone: function () {
      if (this.placed.length !== this.round.tokens.length) return;
      if (Core.repairCorrect(this.round, this.placed.slice())) { this.tokens = Core.applyRepair(this.round); this._win(); }
      else { this._giggle(); var self = this; setTimeout(function () { self.placed = []; self._renderCard(); }, 600); }
    },

    _win: function () {
      this.readOnly = true; this.solvedNow = true; this.phase = 'done';
      this._gapFilled = null;
      this._setPose('happy'); this.api.sound && this.api.sound(880);
      this.solved = Math.min(this.solved + 1, (this._pool && this._pool.length) || 7);
      this._renderCard(); this._paintPulse(); this._sparkle();
      if (this.api.announce) this.api.announce(this.api.t('soundsRight'));
      speak(Core.applyRepair(this.round).join(' ').replace(/ \./g, '.').replace(/ ,/g, ','));
    },
    _alright: function () { this._setPose('examine'); this.api.sound && this.api.sound(520); if (this.api.announce) this.api.announce(this.api.t('alright')); },
    _giggle: function () {
      this._setPose('examine'); this.api.sound && this.api.sound(360);
      if (this.api.announce) this.api.announce(interp(this.api.t('giggle'), {}) + ' ' + this.round.convention);
      var card = this._cardEl; if (card) { card.classList.add('sc-giggle'); var self = this; setTimeout(function () { card.classList.remove('sc-giggle'); }, 480); }
    },

    _paintPulse: function () { if (this._pulseFill) { var n = (this._pool && this._pool.length) || 7; this._pulseFill.style.width = Math.round(100 * this.solved / n) + '%'; } },
    _setPose: function (name) { if (this._plumeEl) this._plumeEl.setAttribute('data-pose', name === 'happy' ? 'happy' : 'idle'); },
    _sparkle: function () {
      if (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var card = this._cardEl; if (!card) return;
      var s = document.createElement('span'); s.className = 'sc-sparkle'; s.textContent = '✦';
      card.appendChild(s); setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 700);
    },
    isCorrect: function () { return this.phase === 'done'; },
    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks(Core.buildRounds());
      var n = pool.length, i = (opts && opts.index) || 0;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = (n > 0) ? Math.floor(i / n) : 0;
      if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/sentence-clinic-activities.json').then(function (r) {
        if (!r.ok) throw new Error('manifest ' + r.status); return r.json();
      }).then(function (rows) {
        var row = rows.find(function (r) { return r.id === self._activityId; });
        if (!row) return;
        self._activityRow = row;
        self._pool = self._buildTasksFromRow(row);
        self._order = null;
        if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
      }).catch(function (e) { if (global.console && console.warn) console.warn('[sentence-clinic] manifest load failed; fallback:', e.message); });
    },

    _buildTasksFromRow: function (row) {
      if (row.params && Array.isArray(row.params.rounds)) {
        var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds;
        return makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); }));
      }
      return makeTasks(Core.buildRounds());
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.sc-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.4vw,9px);width:100%;max-width:min(96vw,640px);margin:0 auto;}'
        /* the nook HUGS its content (no wide empty desktop band) */
        + '.sc-scene{position:relative;display:flex;flex-direction:column;align-items:stretch;gap:clamp(6px,1.6vw,10px);width:fit-content;max-width:min(94vw,500px);margin:0 auto;'
        +   'background:linear-gradient(180deg,#FBF3E4,#F4E7CF);border:2.5px solid rgba(20,107,94,.18);border-radius:24px;padding:0 clamp(11px,2.6vw,20px) clamp(10px,2.4vw,16px);'
        +   'box-shadow:0 6px 0 rgba(20,107,94,.10),inset 0 2px 0 rgba(255,255,255,.5);overflow:visible;}'
        /* wood counter where Dr. Plume (the host) sits */
        /* the wood is only a SHELF at the base (transparent above) so Dr. Plume\'s
           full body + shawl show — she stands ON the counter, not behind it. */
        + '.sc-nook{position:relative;display:flex;justify-content:center;align-items:flex-end;background:linear-gradient(180deg,transparent 0,transparent 62%,#D8AE7C 62%,#BE8B5E 100%);border-radius:0 0 16px 16px;margin:0 calc(clamp(11px,2.6vw,20px) * -0.6) clamp(2px,1vw,5px);padding-top:clamp(3px,1vw,6px);}'
        + '.sc-plume{width:clamp(72px,15.5vw,94px);flex:0 0 auto;margin-bottom:-2px;}'
        + '.sc-plume-svg{width:100%;height:auto;display:block;overflow:visible;}'
        + '.sc-leaf{position:absolute;top:-12px;right:6px;width:clamp(20px,5.5vw,30px);}'
        + '.sc-leaf svg{width:100%;height:auto;display:block;}'
        + '.sc-card{position:relative;display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,11px);background:var(--lcs-card,#FBF3E4);border:2px solid rgba(20,107,94,.16);border-radius:16px;padding:clamp(9px,2.2vw,15px);min-height:52px;}'
        + '.sc-card.sc-giggle{animation:scGiggle .46s ease;}'
        + '@keyframes scGiggle{0%,100%{transform:translateX(0) rotate(0);}25%{transform:translateX(-4px) rotate(-1.5deg);}75%{transform:translateX(4px) rotate(1.5deg);}}'
        /* the sentence — word chips */
        + '.sc-sentence{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:clamp(5px,1.4vw,9px);}'
        + '.sc-chip{font-family:"Baloo 2",var(--lcs-font-display,sans-serif);font-weight:700;font-size:clamp(16px,4.4vw,22px);color:' + C.T + ';'
        +   'background:#FFFDF7;border:2px solid rgba(20,107,94,.2);border-radius:12px;padding:clamp(6px,1.6vw,10px) clamp(9px,2.4vw,14px);line-height:1;min-height:44px;display:inline-flex;align-items:center;cursor:default;}'
        + 'button.sc-chip{cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation;transition:transform .1s,border-color .15s,box-shadow .15s;}'
        + 'button.sc-chip:active{transform:scale(.96);}'
        + 'button.sc-chip:focus-visible,.sc-opt:focus-visible,.sc-seam:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '.sc-chip.is-target{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.25),0 0 12px rgba(242,120,75,.4);animation:scGlow 1.2s ease-in-out infinite;}'
        + '@keyframes scGlow{0%,100%{box-shadow:0 0 0 3px rgba(242,120,75,.22),0 0 8px rgba(242,120,75,.3);}50%{box-shadow:0 0 0 3px rgba(242,120,75,.32),0 0 16px rgba(242,120,75,.5);}}'
        + '.sc-placed{background:#EAF7EF;border-color:' + C.GOOD + ';}'
        + '.sc-build{min-height:48px;}'
        /* reorder empty slots — clear "drop a word here" targets */
        + '.sc-slot{min-width:clamp(40px,11vw,58px);min-height:44px;border-radius:12px;background:rgba(20,107,94,.06);box-shadow:inset 0 0 0 2px rgba(20,107,94,.18);display:inline-block;}'
        + '.sc-slot.is-next{box-shadow:inset 0 0 0 2px rgba(242,120,75,.55),inset 0 0 10px rgba(242,120,75,.3);animation:scGlow 1.3s ease-in-out infinite;}'
        /* gap slot (insert) — a soft empty notch with a glow (no dashed ghost) */
        + '.sc-gap{min-width:clamp(34px,9vw,46px);min-height:44px;display:inline-flex;align-items:center;justify-content:center;border-radius:12px;'
        +   'background:rgba(20,107,94,.07);box-shadow:inset 0 0 0 2px rgba(242,120,75,.4),0 0 10px rgba(242,120,75,.25) inset;font-weight:800;color:' + C.T + ';font-size:clamp(16px,4.4vw,22px);animation:scGlow 1.3s ease-in-out infinite;}'
        + '.sc-gap.is-filled{background:#EAF7EF;box-shadow:inset 0 0 0 2px ' + C.GOOD + ';animation:none;}'
        /* seam (split) — a tappable hairline between words */
        + '.sc-seam{align-self:stretch;min-width:14px;min-height:44px;background:none;border:0;padding:0 1px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent;}'
        + '.sc-seam-mark{width:4px;height:60%;border-radius:3px;background:rgba(242,120,75,.45);animation:scSeam 1.2s ease-in-out infinite;}'
        + '@keyframes scSeam{0%,100%{opacity:.4;}50%{opacity:.9;}}'
        /* repair option chips */
        + '.sc-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:clamp(6px,1.8vw,12px);padding-top:2px;}'
        + '.sc-opt{font-family:"Baloo 2",var(--lcs-font-display,sans-serif);font-weight:700;font-size:clamp(15px,4vw,20px);color:#fff;background:' + C.T + ';border:0;border-radius:12px;'
        +   'padding:clamp(8px,2vw,11px) clamp(12px,3vw,18px);min-height:44px;min-width:44px;cursor:pointer;box-shadow:0 3px 0 rgba(20,107,94,.4);-webkit-tap-highlight-color:transparent;touch-action:manipulation;transition:transform .1s,box-shadow .1s;}'
        + '.sc-opt:active{transform:translateY(2px);box-shadow:0 1px 0 rgba(20,107,94,.4);}'
        + '.sc-rule{font-family:"Nunito",sans-serif;font-weight:700;font-size:clamp(12px,3vw,15px);color:' + C.CORAL2 + ';text-align:center;}'
        /* pulse meter */
        + '.sc-pulse{width:min(70%,300px);height:10px;border-radius:6px;background:rgba(20,107,94,.12);overflow:hidden;}'
        + '.sc-pulse-fill{height:100%;width:0;border-radius:6px;background:linear-gradient(90deg,' + C.T2 + ',' + C.GOOD + ');transition:width .4s var(--lcs-ease,ease);}'
        /* Plume pose */
        + '.sc-pl-eyes-happy{display:none;} .sc-plume[data-pose="happy"] .sc-pl-eyes-open{display:none;} .sc-plume[data-pose="happy"] .sc-pl-eyes-happy{display:inline;}'
        + '.sc-sparkle{position:absolute;left:50%;top:2px;transform:translateX(-50%);color:' + C.CORAL + ';font-size:20px;animation:scSpark .7s ease forwards;pointer-events:none;}'
        + '@keyframes scSpark{0%{opacity:0;transform:translate(-50%,6px) scale(.5);}30%{opacity:1;}100%{opacity:0;transform:translate(-50%,-22px) scale(1.1);}}'
        /* narrowest phones (Galaxy Fold cover ~320px) — the tray rounds add a
           second chip row; shave the panel so the card + Check clear the fold. */
        + '@media (max-width:360px){'
        +   '.sc-scene{padding:6px 8px;gap:3px;} .sc-board{gap:5px;} .sc-plume{width:38px;} .sc-card{padding:6px;gap:4px;}'
        +   '.sc-chip,.sc-opt{font-size:15px;min-height:40px;padding:4px 8px;} .sc-gap,.sc-seam{min-height:40px;} .sc-pulse{height:7px;}'
        + '}'
        + '@media (prefers-reduced-motion: reduce){.sc-chip.is-target,.sc-gap,.sc-seam-mark,.sc-giggle,.sc-sparkle{animation:none;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-sentence-clinic', ''); tag.textContent = css;
      document.head.appendChild(tag);
    }
  };

  var PROMPT_FOR = {
    capitalize: 'promptCap', 'insert-punct': 'promptPunct', swap: 'promptSwap',
    'insert-word': 'promptInsert', reorder: 'promptReorder', delete: 'promptDelete', split: 'promptSplit'
  };
  function makeTasks(rounds) {
    return rounds.map(function (r) {
      return {
        id: 'sentence-clinic.' + r.id,
        band: r.band,
        promptKey: PROMPT_FOR[r.action] || 'promptSwap',         // static per-action prompt (covers the whole action)
        promptArgs: {},
        answerType: 'state',
        setup: function (tool) { tool.setupTask(r); },
        check: function (tool) { var ok = tool.isCorrect(); if (ok) { tool.readOnly = true; } return ok; },
        hintKey: function () { return 'hintCheck'; }
      };
    });
  }

  /* band-grouped reshuffle (keep the band ramp; shuffle within band per pass). */
  function bandOrder(pool, prev) {
    var byBand = {};
    pool.forEach(function (t, i) { (byBand[t.band] = byBand[t.band] || []).push(i); });
    var bands = Object.keys(byBand).sort(function (a, b) { return a - b; });
    var out, attempts = 0;
    do {
      out = [];
      bands.forEach(function (b) {
        var g = byBand[b].slice();
        for (var i = g.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = g[i]; g[i] = g[j]; g[j] = t; }
        out = out.concat(g);
      });
      attempts++;
    } while (prev && out.join(',') === prev.join(',') && attempts < 12 && pool.length > 1);
    return out;
  }

}(typeof window !== 'undefined' ? window : this));
