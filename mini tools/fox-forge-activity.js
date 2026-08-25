/* =====================================================================
   FOX & FORGE — Pip's Chocolate Forge — ACTIVITY  (fox-forge-activity.js)
   ---------------------------------------------------------------------
   CCSS 3.NF.A.1 — Pip the fox forges chocolate orders. The child reads a/b,
   PICKS the unit-piece by its SIZE (the molds are UNLABELED — no digit), forges
   it a times into the order box, and HANDS IT OVER once (the commit is SPENT).
   a/b is a copies of the unit 1/b — built, not read. No fill-line, no mid-build
   signal. All grading from fox-forge-core.js. 0 lines to any protected core +
   lcs-shell.{js,css} + the E14 fractions-core.js.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.FoxForgeCore;
  var SVGNS = 'http://www.w3.org/2000/svg';
  var C = { T: '#146B5E', T2: '#0E5247', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', BAR: '#6B4A2B', PIECE: '#5A3A1E' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var LANG = 'en';
  var NUM = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  var UNIT = { 2: 'half', 3: 'third', 4: 'fourth', 6: 'sixth', 8: 'eighth' };
  /* German fraction nouns are neuter + invariant in the plural (no -s); the
     attributive number word is „ein" (not „eins"). */
  var NUM_DE = ['', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht'];
  var UNIT_DE = { 2: 'Halb', 3: 'Drittel', 4: 'Viertel', 6: 'Sechstel', 8: 'Achtel' };
  function fracWordDE(a, b) {
    var u = UNIT_DE[b] || (b + 'tel');
    return (a === 1 ? 'ein' : (NUM_DE[a] || a)) + ' ' + u;
  }
  /* French fraction words: "un demi", "deux quarts", "trois huitièmes" (plural adds -s except invariable "tiers") */
  var NUM_FR = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit'];
  var UNIT_FR = { 2: 'demi', 3: 'tiers', 4: 'quart', 6: 'sixième', 8: 'huitième' };
  function fracWordFR(a, b) {
    var u = UNIT_FR[b] || (b + 'ième');
    if (a > 1 && u.charAt(u.length - 1) !== 's') u += 's';
    return (NUM_FR[a] || a) + ' ' + u;
  }
  /* Spanish fraction words: "un medio", "tres cuartos", "cinco sextos" — numerator 1 = attributive
     "un"; the unit-noun pluralizes with -s when a>1; no article, no "de". */
  var NUM_ES = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho'];
  var UNIT_ES = { 2: 'medio', 3: 'tercio', 4: 'cuarto', 6: 'sexto', 8: 'octavo' };
  function fracWordES(a, b) {
    var u = UNIT_ES[b] || (b + 'avo');
    if (a > 1) u += 's';
    return (NUM_ES[a] || a) + ' ' + u;
  }
  /* Brazilian Portuguese fraction words: "um meio", "três quartos", "dois terços" —
     numerator 1 = attributive "um"; the unit-noun (masculine) pluralizes with -s when a>1;
     masculine cardinals (dois/três, never duas). */
  var NUM_PT = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito'];
  var UNIT_PT = { 2: 'meio', 3: 'terço', 4: 'quarto', 6: 'sexto', 8: 'oitavo' };
  function fracWordPT(a, b) {
    var u = UNIT_PT[b] || (b + 'avo');
    if (a === 1) return 'um ' + u;
    return (NUM_PT[a] || a) + ' ' + u + 's';
  }
  /* Italian fraction words: "un mezzo", "due terzi", "tre quarti" — numerator 1 = attributive "un";
     the unit-noun (masculine) pluralizes -o→-i when a>1; masculine cardinals (un/due/tre, invariable). */
  var NUM_IT = ['', 'un', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto'];
  var UNIT_IT = { 2: 'mezzo', 3: 'terzo', 4: 'quarto', 6: 'sesto', 8: 'ottavo' };
  function fracWordIT(a, b) {
    var u = UNIT_IT[b] || (b + 'esimo');
    if (a === 1) return 'un ' + u;
    return (NUM_IT[a] || a) + ' ' + u.replace(/o$/, 'i');
  }
  function fracWord(a, b) {
    if (LANG === 'es') return fracWordES(a, b);
    if (LANG === 'de') return fracWordDE(a, b);
    if (LANG === 'fr') return fracWordFR(a, b);
    if (LANG === 'pt') return fracWordPT(a, b);
    if (LANG === 'it') return fracWordIT(a, b);
    var u = UNIT[b] || (b + 'th');
    if (a === 1) return 'one ' + u;
    return (NUM[a] || a) + ' ' + u + 's';
  }
  function speak(text, rate) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : LANG), rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; u.lang = (LANG === 'es' ? 'es-MX' : LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function svg(tag, attrs) { var e = document.createElementNS(SVGNS, tag); for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); return e; }

  global.FoxForgeActivity = {
    id: 'fox-forge-activity',

    strings: {
      title: { en: "Pip's Chocolate Forge", de: 'Pips Schokoladen-Werkstatt', fr: 'La fabrique de chocolat de Pip', es: 'El taller de Pip', pt: 'A Fábrica de Chocolate do Pip', it: 'La cioccolateria di Pip' },
      instruction: { en: '', de: '', fr: '', es: '', pt: '', it: '' },
      prompt: { en: 'Forge the order.', de: 'Gieße die Bestellung.', fr: 'Fabrique la commande.', es: '¡Vacía el pedido!', pt: 'Prepare o pedido.', it: 'Prepara la tua ordinazione' },
      handOver: { en: 'Hand it over 🍫', de: 'Abgeben 🍫', fr: 'Livrer 🍫', es: 'Entregar 🍫', pt: 'Entregar 🍫', it: 'Consegnala 🍫' },
      tapToForge: { en: 'tap the bar to forge a piece', de: 'tippe auf die Tafel, um ein Stück zu gießen', fr: 'touche la barre pour fabriquer un morceau', es: 'Toca la barra para vaciar una pieza.', pt: 'toque na barra para moldar uma peça', it: 'tocca la tavoletta per colare un pezzo' },
      sayWelcome: { en: 'A new order! Pick the right piece by its SIZE.', de: 'Eine neue Bestellung! Wähle das richtige Stück nach seiner GRÖSSE.', fr: 'Une nouvelle commande ! Choisis le bon morceau d’après sa TAILLE.', es: '¡Un pedido nuevo! Elige la pieza correcta por su TAMAÑO.', pt: 'Um novo pedido! Escolha a peça certa pelo TAMANHO.', it: 'Una nuova ordinazione! Scegli il pezzo giusto dalla GRANDEZZA.' },
      sayWin: { en: 'Perfect order — thank you! 🍫', de: 'Perfekte Bestellung – danke! 🍫', fr: 'Commande parfaite — merci ! 🍫', es: '¡Pedido perfecto, gracias! 🍫', pt: 'Pedido perfeito — obrigado! 🍫', it: 'Ordinazione perfetta, grazie! 🍫' },
      sayPickMold: { en: 'Pick a piece-mold first.', de: 'Wähle zuerst eine Form.', fr: 'Choisis d’abord un moule.', es: 'Primero elige un molde.', pt: 'Primeiro escolha uma forma.', it: 'Prima scegli uno stampo.' },
      sayUnequal: { en: "Those aren't equal — pick the fair mold!", de: 'Die sind nicht gleich groß – wähle die faire Form!', fr: 'Ces morceaux ne sont pas égaux — choisis le moule juste !', es: 'Esas no están iguales… ¡elige el molde parejo!', pt: 'Esses pedaços não são iguais — escolha a forma que faz partes iguais!', it: 'Quelli non sono uguali, scegli lo stampo giusto!' },
      sayShort: { en: 'Not enough yet — forge more pieces.', de: 'Noch nicht genug – gieße mehr Stücke.', fr: 'Pas encore assez — fabrique plus de morceaux.', es: 'Todavía faltan… vacía más piezas.', pt: 'Ainda falta — molde mais peças.', it: 'Non bastano ancora, cola altri pezzi.' },
      sayOver: { en: "That's too much — tap a piece to take it back.", de: 'Das ist zu viel – tippe auf ein Stück, um es zurückzunehmen.', fr: 'C’est trop — touche un morceau pour le reprendre.', es: 'Es demasiado… toca una pieza para quitarla.', pt: 'Passou! Toque numa peça para tirar.', it: 'Troppi pezzi, tocca un pezzo per toglierlo.' },
      sayWrongSize: { en: 'Hmm — those are the wrong size. Try another mold.', de: 'Hmm – das ist die falsche Größe. Probier eine andere Form.', fr: 'Hmm — ces morceaux ne sont pas de la bonne taille. Essaie un autre moule.', es: 'Mmm… ese tamaño no es. Prueba con otro molde.', pt: 'Hmm — o tamanho não é esse. Tente outra forma.', it: 'Mmm, la grandezza non va. Prova un altro stampo.' },
      sayAgain: { en: "Let's look again.", de: 'Schauen wir noch mal.', fr: 'Regardons encore une fois.', es: 'Vamos a mirar otra vez.', pt: 'Vamos tentar de novo!', it: 'Guardiamo ancora.' },
      sayCross: { en: 'Yes — the same share, on a different shape!', de: 'Ja – der gleiche Anteil, nur in einer anderen Form!', fr: 'Oui — le même partage, sur une autre forme !', es: '¡Sí! La misma parte, ¡solo que con otra forma!', pt: 'Isso! A mesma parte, num formato diferente!', it: 'Sì, la stessa parte, su una forma diversa!' },
      crossYes: { en: 'Yes — same share! 🍕', de: 'Ja – gleicher Anteil! 🍕', fr: 'Oui — le même partage ! 🍕', es: '¡Sí, la misma parte! 🍕', pt: 'Isso — a mesma parte! 🍕', it: 'Sì, stessa parte! 🍕' },
      hintCheck: { en: 'Pick the piece that fits the bar, forge it the right number of times, then hand it over.', de: 'Wähle das Stück, das zur Tafel passt, gieße es so oft wie nötig und gib sie dann ab.', fr: 'Choisis le morceau qui va avec la barre, fabrique-le le bon nombre de fois, puis livre la commande.', es: 'Elige la pieza que cabe en la barra, vacíala las veces que necesites y entrégala.', pt: 'Toque em Entregar quando o pedido estiver pronto.', it: 'Scegli il pezzo giusto per la tavoletta, colalo il numero giusto di volte, poi consegna.' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.snap = null; this.solved = false;
      this.placed = []; this.activeMold = null; this._molds = []; this.msg = null; this.servedCount = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.snap = Core.snapshot(round);
      this.solved = false; this.msg = null; this._spoke = false;
      this.placed = []; this.activeMold = null;
      this._molds = round.molds ? shuffle(round.molds.slice()) : [];   /* randomize mold positions */
    },

    _pPrompt: function (r) { return (r && r.promptL10n && r.promptL10n[LANG]) || (r && r.prompt) || this.api.t('prompt'); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var root = api.el('div', 'ff-root'); root.setAttribute('data-solved', this.solved ? '1' : '0'); this._rootEl = root;
      if (!this.round) { stage.appendChild(root); return; }
      var self = this, r = this.round, s = this.snap;

      var say = api.el('div', 'ff-saytop');
      say.innerHTML = '<span class="ff-pip' + (this.solved ? ' ff-bounce' : '') + '">🦊</span><span class="ff-saytext">' + esc(this.msg || api.t('sayWelcome')) + '</span>';
      root.appendChild(say);

      this._renderShelf(root);

      /* order head: the a/b notation + the kid prompt */
      var head = api.el('div', 'ff-head');
      if (s.isBuild || s.isNonscored) head.appendChild(this._fracChip(r.a, r.b));
      var p = api.el('p', 'ff-prompt'); p.textContent = this._pPrompt(r); head.appendChild(p);
      root.appendChild(head);

      if (this.solved) { this._renderDone(root); stage.appendChild(root); return; }

      if (s.isChoose) this._renderNameUnit(root);
      else if (s.isNonscored) this._renderCrossShape(root);
      else this._renderBuild(root);

      stage.appendChild(root);
      if (!this._spoke) { this._spoke = true; var _pp = this._pPrompt(r); setTimeout(function () { speak((_pp || '') + ''); }, 280); }
    },

    _renderShelf: function (root) {
      var api = this.api, total = (this._pool && this._pool.length) || 11;
      var b = api.el('div', 'ff-shelf'); b.setAttribute('aria-hidden', 'true');
      var fill = Math.min(1, this.servedCount / total);
      b.style.background = 'linear-gradient(90deg, #E7C9A0 ' + Math.round(fill * 100) + '%, #EFE6D6 ' + Math.round(fill * 100) + '%)';
      var k = api.el('span', 'ff-choc'); k.textContent = fill >= 1 ? '🍫✨' : '🍫'; b.appendChild(k);
      root.appendChild(b);
    },

    /* the a/b fraction chip (real DOM text; aria = spoken words). */
    _fracChip: function (a, b) {
      var api = this.api, chip = api.el('span', 'ff-frac');
      chip.setAttribute('aria-label', fracWord(a, b));
      chip.innerHTML = '<span class="ff-num">' + a + '</span><span class="ff-fbar"></span><span class="ff-den">' + b + '</span>';
      return chip;
    },

    /* ----- the order-box SVG: the whole bar + the forged pieces. ----- */
    _orderSvg: function (opts) {
      opts = opts || {};
      var self = this, r = this.round, W = r.wholeLen, refW = r.refWhole || 0;
      var VW = Math.max(W, refW) + 6, BH = 13, GAP = 5, twoBar = refW > 0;
      var VH = twoBar ? (BH * 2 + GAP + 4) : (BH + 4);
      var sv = svg('svg', { viewBox: '0 0 ' + VW + ' ' + VH, class: 'ff-svg' + (twoBar ? ' ff-svg2' : ''), 'aria-label': (LANG === 'es' ? 'pedido de chocolate' : LANG === 'de' ? 'Schokoladen-Bestellung' : LANG === 'fr' ? 'commande de chocolat' : LANG === 'pt' ? 'barra de chocolate do pedido' : LANG === 'it' ? 'tavoletta di cioccolato da colare' : 'chocolate order bar') });
      sv.style.aspectRatio = (VW / VH).toFixed(2);

      /* the reference bar (the-whole): a smaller bar already filled to a/b, faint. */
      if (twoBar) {
        var refUnit = refW / r.b, ry = 2;
        sv.appendChild(svg('rect', { x: 0, y: ry, width: refW, height: BH, rx: 1.6, fill: 'none', stroke: 'rgba(107,74,43,.5)', 'stroke-width': 0.7 }));
        for (var i = 0; i < r.a; i++) sv.appendChild(svg('rect', { x: i * refUnit + 0.4, y: ry + 0.6, width: refUnit - 0.8, height: BH - 1.2, rx: 1.2, fill: C.PIECE, opacity: '0.45' }));
      }
      var by = twoBar ? (BH + GAP + 2) : 2;

      /* the active order box (the whole) + the empty remainder is the forge zone */
      sv.appendChild(svg('rect', { x: 0, y: by, width: W, height: BH, rx: 1.8, fill: '#fff', stroke: C.BAR, 'stroke-width': 0.9 }));
      var unit = this.activeMold && Core.canForge(this.activeMold) ? W / this.activeMold : 0;
      var n = this.placed.length;

      /* the empty remainder = a tappable FORGE zone (no fill-line, just the box) */
      if (opts.interactive) {
        var fx = unit ? Math.min(n * unit, W) : 0;
        var rem = svg('rect', { x: fx, y: by, width: Math.max(0, W - fx), height: BH, fill: 'transparent', class: 'ff-forgezone' });
        rem.setAttribute('role', 'button'); rem.setAttribute('tabindex', '0'); rem.setAttribute('aria-label', self.api.t('tapToForge')); rem.style.cursor = 'pointer';
        rem.addEventListener('click', function () { self._forge(); });
        rem.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); self._forge(); } });
        sv.appendChild(rem);
      }
      /* the forged pieces (tap to un-forge) */
      for (var k = 0; k < n; k++) {
        var pw = unit || (W / (this.placed[k].b || r.b));
        var g = svg('g', { class: 'ff-piece' });
        var rect = svg('rect', { x: k * pw + 0.5, y: by + 0.7, width: pw - 1, height: BH - 1.4, rx: 1.3, fill: C.PIECE });
        g.appendChild(rect);
        /* seam ridge for chocolate look */
        g.appendChild(svg('line', { x1: k * pw + pw - 0.5, y1: by + 1.4, x2: k * pw + pw - 0.5, y2: by + BH - 1.4, stroke: 'rgba(255,255,255,.25)', 'stroke-width': 0.4 }));
        if (opts.interactive) {
          g.setAttribute('role', 'button'); g.setAttribute('tabindex', '0'); g.setAttribute('aria-label', (LANG === 'es' ? 'toca para quitar esta pieza' : LANG === 'de' ? 'dieses Stück zurücknehmen' : LANG === 'fr' ? 'reprendre ce morceau' : LANG === 'pt' ? 'tirar esta peça' : LANG === 'it' ? 'riprendi questo pezzo' : 'take this piece back')); g.style.cursor = 'pointer';
          (function (idx) { g.addEventListener('click', function () { self._unforge(idx); }); g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); self._unforge(idx); } }); })(k);
        }
        sv.appendChild(g);
      }
      return sv;
    },

    /* a mold button: a faint full-bar outline + the 1/b piece filled at the left,
       at the SAME scale across molds (compare by SIZE) — UNLABELED (no digit). */
    _moldButton: function (moldB, idx) {
      var self = this, api = this.api;
      var sel = (this.activeMold === moldB);
      var btn = api.el('button', 'ff-mold' + (sel ? ' ff-msel' : ''));
      btn.type = 'button';
      var unequal = (moldB === 'unequal');
      btn.setAttribute('aria-label', LANG === 'es' ? (unequal ? 'un molde disparejo' : 'un molde de piezas') : LANG === 'de' ? (unequal ? 'eine ungleiche Form' : 'eine Stück-Form') : LANG === 'fr' ? (unequal ? 'un moule inégal' : 'un moule à morceau') : LANG === 'pt' ? (unequal ? 'uma forma desigual' : 'uma forma de peça') : LANG === 'it' ? (unequal ? 'uno stampo irregolare' : 'uno stampo per pezzi') : (unequal ? 'an uneven mold' : 'a piece mold'));
      var MW = 64, MH = 18;
      var s = svg('svg', { viewBox: '0 0 ' + (MW + 2) + ' ' + MH, class: 'ff-moldsvg' });
      s.appendChild(svg('rect', { x: 1, y: 2, width: MW, height: MH - 4, rx: 1.8, fill: 'none', stroke: 'rgba(107,74,43,.45)', 'stroke-width': 0.9 }));
      if (unequal) {
        /* three deliberately UNEQUAL filled chunks with gaps — visibly NOT equal parts */
        var widths = [MW * 0.46, MW * 0.13, MW * 0.30], x = 1.5;
        widths.forEach(function (w, i2) { s.appendChild(svg('rect', { x: x, y: 2.6, width: w, height: MH - 5.2, rx: 1.1, fill: C.PIECE })); s.appendChild(svg('rect', { x: x, y: 2.6, width: w, height: 1.8, rx: 1, fill: 'rgba(255,255,255,.18)' })); x += w + 2.2; });
      } else {
        /* the 1/b unit piece at the left, at the SAME scale across molds — its
           LENGTH (a clearly-spaced fraction of the bar) is the size to judge. */
        var pw = MW / moldB;
        s.appendChild(svg('rect', { x: 1.5, y: 2.6, width: pw - 1, height: MH - 5.2, rx: 1.2, fill: C.PIECE }));
        s.appendChild(svg('rect', { x: 1.5, y: 2.6, width: pw - 1, height: 2, rx: 1, fill: 'rgba(255,255,255,.2)' }));   /* top sheen → reads as a chocolate chunk */
      }
      btn.appendChild(s);
      btn.addEventListener('click', function () { self._selectMold(moldB); });
      return btn;
    },

    _renderBuild: function (root) {
      var self = this, api = this.api;
      var stageWrap = api.el('div', 'ff-forge');
      stageWrap.appendChild(this._orderSvg({ interactive: true }));
      root.appendChild(stageWrap);

      var wall = api.el('div', 'ff-moldwall'); wall.setAttribute('role', 'group'); wall.setAttribute('aria-label', (LANG === 'es' ? 'moldes de piezas: elige uno por su tamaño' : LANG === 'de' ? 'Stück-Formen – wähle eine nach ihrer Größe' : LANG === 'fr' ? 'moules à morceaux — choisis-en un d’après sa taille' : LANG === 'pt' ? 'formas de peça — escolha uma pelo tamanho' : LANG === 'it' ? 'stampi per pezzi, scegline uno dalla grandezza' : 'piece molds — pick one by its size'));
      this._molds.forEach(function (m, i) { wall.appendChild(self._moldButton(m.b, i)); });
      root.appendChild(wall);

      var hand = api.el('button', 'ff-hand'); hand.type = 'button'; hand.textContent = api.t('handOver');
      hand.disabled = (this.placed.length === 0);
      hand.addEventListener('click', function () { self._handOver(); });
      root.appendChild(hand);
    },

    /* name-unit: the bar split into b EQUAL parts, ONE highlighted → tap 1/b. */
    _renderNameUnit: function (root) {
      var self = this, api = this.api, r = this.round, W = r.wholeLen, BH = 16, VW = W + 4;
      var wrap = api.el('div', 'ff-forge');
      var sv = svg('svg', { viewBox: '0 0 ' + VW + ' ' + (BH + 4), class: 'ff-svg', 'aria-label': (LANG === 'es' ? ('una barra en ' + r.b + ' partes iguales, una sombreada') : LANG === 'de' ? ('eine Tafel in ' + r.b + ' gleiche Teile geteilt, ein Teil gefärbt') : LANG === 'fr' ? ('une barre en ' + r.b + ' parts égales, une part colorée') : LANG === 'pt' ? ('uma barra em ' + r.b + ' partes iguais, uma pintada') : LANG === 'it' ? ('una tavoletta in ' + r.b + ' parti uguali, una colorata') : ('a bar in ' + r.b + ' equal parts, one shaded')) });
      sv.style.aspectRatio = (VW / (BH + 4)).toFixed(2);
      sv.appendChild(svg('rect', { x: 0, y: 2, width: W, height: BH, rx: 1.8, fill: '#fff', stroke: C.BAR, 'stroke-width': 0.9 }));
      var unit = W / r.b;
      for (var i = 0; i < r.b; i++) {
        sv.appendChild(svg('rect', { x: i * unit + 0.5, y: 2.7, width: unit - 1, height: BH - 1.4, rx: 1.1, fill: i === 0 ? C.CORAL : 'none', stroke: 'rgba(107,74,43,.45)', 'stroke-width': 0.6 }));
      }
      wrap.appendChild(sv); root.appendChild(wrap);

      var opts = api.el('div', 'ff-options');
      shuffle((r.options || []).slice()).forEach(function (o) {
        var b = api.el('button', 'ff-opt'); b.type = 'button';
        b.setAttribute('aria-label', fracWord(o[0], o[1]));
        b.innerHTML = '<span class="ff-onum">' + o[0] + '</span><span class="ff-obar"></span><span class="ff-oden">' + o[1] + '</span>';
        b.addEventListener('click', function () { self._chooseUnit(o); });
        opts.appendChild(b);
      });
      root.appendChild(opts);
    },

    /* cross-shape (non-scored): the bar half + the pizza half → affirm. */
    _renderCrossShape: function (root) {
      var self = this, api = this.api, r = this.round, W = r.wholeLen, BH = 14;
      var wrap = api.el('div', 'ff-forge ff-cross');
      var sv = svg('svg', { viewBox: '0 0 ' + (W + 4) + ' ' + (BH + 4), class: 'ff-svg ff-svgbar', 'aria-label': (LANG === 'es' ? 'una barra con la mitad sombreada' : LANG === 'de' ? 'eine Tafel, bei der eine Hälfte gefärbt ist' : LANG === 'fr' ? 'une barre dont une moitié est colorée' : LANG === 'pt' ? 'uma barra com um meio pintado' : LANG === 'it' ? 'una tavoletta con un mezzo colorato' : 'a bar with one half shaded') });
      sv.style.aspectRatio = ((W + 4) / (BH + 4)).toFixed(2);
      sv.appendChild(svg('rect', { x: 0, y: 2, width: W, height: BH, rx: 1.8, fill: '#fff', stroke: C.BAR, 'stroke-width': 0.9 }));
      sv.appendChild(svg('rect', { x: 0.5, y: 2.7, width: W / r.b - 1, height: BH - 1.4, rx: 1.2, fill: C.PIECE }));
      wrap.appendChild(sv);
      /* the pizza: a circle split in b, one wedge filled */
      var UNIT_ART_DE = { 2: 'eine Hälfte', 3: 'ein Drittel', 4: 'ein Viertel', 6: 'ein Sechstel', 8: 'ein Achtel' };
      var UNIT_ART_FR = { 2: 'une moitié', 3: 'un tiers', 4: 'un quart', 6: 'un sixième', 8: 'un huitième' };
      var UNIT_ART_ES = { 2: 'la mitad', 3: 'un tercio', 4: 'un cuarto', 6: 'un sexto', 8: 'un octavo' };
      var UNIT_ART_PT = { 2: 'um meio', 3: 'um terço', 4: 'um quarto', 6: 'um sexto', 8: 'um oitavo' };
      var UNIT_ART_IT = { 2: 'un mezzo', 3: 'un terzo', 4: 'un quarto', 6: 'un sesto', 8: 'un ottavo' };
      var pz = svg('svg', { viewBox: '0 0 40 40', class: 'ff-pizza', 'aria-label': (LANG === 'es' ? ('una pizza redonda con ' + (UNIT_ART_ES[r.b] || 'una parte') + ' sombreada') : LANG === 'de' ? ('eine runde Pizza, bei der ' + (UNIT_ART_DE[r.b] || 'ein Teil') + ' gefärbt ist') : LANG === 'fr' ? ('une pizza ronde dont ' + (UNIT_ART_FR[r.b] || 'une part') + ' est colorée') : LANG === 'pt' ? ('uma pizza redonda com ' + (UNIT_ART_PT[r.b] || 'uma parte') + ' pintado') : LANG === 'it' ? ('una pizza rotonda con ' + (UNIT_ART_IT[r.b] || 'una parte') + ' colorato') : ('a round pizza with one ' + UNIT[r.b] + ' shaded')) });
      pz.appendChild(svg('circle', { cx: 20, cy: 20, r: 17, fill: '#fff', stroke: C.BAR, 'stroke-width': 1.2 }));
      pz.appendChild(this._wedge(20, 20, 17, -90, -90 + 360 / r.b, C.PIECE));
      for (var i = 0; i < r.b; i++) { var ang = (-90 + i * 360 / r.b) * Math.PI / 180; pz.appendChild(svg('line', { x1: 20, y1: 20, x2: 20 + 17 * Math.cos(ang), y2: 20 + 17 * Math.sin(ang), stroke: 'rgba(107,74,43,.4)', 'stroke-width': 0.7 })); }
      wrap.appendChild(pz);
      root.appendChild(wrap);

      var aff = api.el('button', 'ff-hand'); aff.type = 'button'; aff.textContent = api.t('crossYes');
      aff.addEventListener('click', function () { self._affirm(); });
      root.appendChild(aff);
    },
    _wedge: function (cx, cy, r, a0, a1, fill) {
      var p0 = a0 * Math.PI / 180, p1 = a1 * Math.PI / 180;
      var x0 = cx + r * Math.cos(p0), y0 = cy + r * Math.sin(p0), x1 = cx + r * Math.cos(p1), y1 = cy + r * Math.sin(p1);
      var large = (a1 - a0) > 180 ? 1 : 0;
      return svg('path', { d: 'M' + cx + ',' + cy + ' L' + x0.toFixed(2) + ',' + y0.toFixed(2) + ' A' + r + ',' + r + ' 0 ' + large + ' 1 ' + x1.toFixed(2) + ',' + y1.toFixed(2) + ' Z', fill: fill, opacity: '0.92' });
    },

    _renderDone: function (root) {
      var api = this.api, r = this.round, s = this.snap;
      var d = api.el('div', 'ff-done');
      /* the finished order — the completed a/b bar fills the card (not sparse) */
      if (r && s && (s.isBuild || s.isNonscored)) {
        var wrap = api.el('div', 'ff-doneforge'), W = r.wholeLen, BH = 15;
        var sv = svg('svg', { viewBox: '0 0 ' + (W + 4) + ' ' + (BH + 4), class: 'ff-svg ff-donesvg', 'aria-label': (LANG === 'es' ? ('la barra de ' + fracWord(r.a, r.b) + ' terminada') : LANG === 'de' ? ('die fertige ' + fracWord(r.a, r.b) + '-Tafel') : LANG === 'fr' ? ('la barre ' + fracWord(r.a, r.b) + ' terminée') : LANG === 'pt' ? ('a barra de ' + fracWord(r.a, r.b) + ' pronta') : LANG === 'it' ? ('la tavoletta di ' + fracWord(r.a, r.b) + ' pronta') : ('the finished ' + fracWord(r.a, r.b) + ' bar')) });
        sv.style.aspectRatio = ((W + 4) / (BH + 4)).toFixed(2);
        sv.appendChild(svg('rect', { x: 0, y: 2, width: W, height: BH, rx: 1.8, fill: '#fff', stroke: C.BAR, 'stroke-width': 0.9 }));
        var unit = W / r.b;
        for (var i = 0; i < r.a; i++) {
          sv.appendChild(svg('rect', { x: i * unit + 0.5, y: 2.7, width: unit - 1, height: BH - 1.4, rx: 1.3, fill: C.PIECE }));
          sv.appendChild(svg('rect', { x: i * unit + 0.5, y: 2.7, width: unit - 1, height: 2, rx: 1, fill: 'rgba(255,255,255,.18)' }));
        }
        wrap.appendChild(sv); d.appendChild(wrap);
      }
      var fl = api.el('span', 'ff-flare'); fl.textContent = '🍫'; d.appendChild(fl);
      var t = api.el('span', 'ff-donetext'); t.textContent = this.msg || api.t('sayWin'); d.appendChild(t);
      root.appendChild(d);
    },

    /* ---------- interaction ---------- */
    _selectMold: function (moldB) {
      this.activeMold = moldB; this.msg = null;
      if (moldB === 'unequal') { this.msg = this.api.t('sayUnequal'); this.api.sound && this.api.sound(360); this.api.announce && this.api.announce(this.msg); }
      else this.api.sound && this.api.sound(540);
      this.render();
    },
    _forge: function () {
      var api = this.api, r = this.round;
      if (this.activeMold == null) { this.msg = api.t('sayPickMold'); api.sound && api.sound(360); this.render(); return; }
      if (!Core.canForge(this.activeMold)) { this.msg = api.t('sayUnequal'); api.sound && api.sound(360); api.announce && api.announce(this.msg); this.render(); return; }
      if (this.placed.length >= this.activeMold) { this.msg = api.t('sayOver'); api.sound && api.sound(400); this.render(); return; }  /* never overflow the bar */
      this.placed.push({ b: this.activeMold }); this.msg = null;
      api.sound && api.sound(620 + this.placed.length * 18);
      this.render();
    },
    _unforge: function (idx) {
      if (idx == null || idx < 0 || idx >= this.placed.length) return;
      this.placed.splice(idx, 1); this.msg = null;
      this.api.sound && this.api.sound(440);
      this.render();
    },
    _handOver: function () {
      var api = this.api, r = this.round;
      if (Core.gradeBuild(r, this.placed)) { this._correct(); return; }
      var ev = Core.evaluate(r, this.placed, true);
      var m = { 'wrong-size-piece': 'sayWrongSize', 'mixed-size': 'sayWrongSize', over: 'sayOver', short: 'sayShort', unequal: 'sayUnequal' }[ev.status] || 'sayAgain';
      this.msg = api.t(m);
      /* commit-is-SPENT: a wrong hand-over clears the box (no count-probing the same order) */
      this.placed = []; this.activeMold = null;
      api.sound && api.sound(360); this.render();
      api.announce && api.announce(this.msg);
    },
    _chooseUnit: function (choice) {
      var api = this.api;
      if (Core.gradeChoose(this.round, choice)) { this._correct(); return; }
      this.msg = api.t('sayAgain'); api.sound && api.sound(360); this.render();
      api.announce && api.announce(this.msg);
    },
    _affirm: function () {
      this.msg = this.api.t('sayCross');
      this.solved = true; this.servedCount = Math.min(this.servedCount + 1, (this._pool && this._pool.length) || 11);
      this.api.sound && this.api.sound(820);
      this.render(); this.api.announce && this.api.announce(this.msg);
    },
    _correct: function () {
      var api = this.api;
      this.solved = true; this.servedCount = Math.min(this.servedCount + 1, (this._pool && this._pool.length) || 11);
      this.msg = api.t('sayWin');
      api.sound && api.sound(880);
      setTimeout(function () { speak(LANG === 'es' ? '¡Perfecto!' : LANG === 'de' ? 'Perfekt!' : LANG === 'fr' ? 'Parfait !' : LANG === 'pt' ? 'Perfeito!' : 'Perfect!'); }, 160);
      this.render(); api.announce && api.announce(this.msg);
    },

    isCorrect: function () { return this.solved; },
    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]); var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n); if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/fox-forge-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) {
          var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return;
          self._activityRow = row;
          self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); }));
          self._order = null;
          if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
        })
        .catch(function (e) { if (global.console && console.warn) console.warn('[fox-forge] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.ff-root{position:relative;width:100%;max-width:min(96vw,680px);margin:0 auto;display:flex;flex-direction:column;gap:clamp(4px,1vw,8px);background:linear-gradient(180deg,#FBF3E4,#F1E7D6);border-radius:16px;padding:clamp(6px,1.4vw,11px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(107,74,43,.08);box-sizing:border-box;}'
        + '.ff-saytop{display:flex;align-items:center;gap:7px;justify-content:center;font:700 clamp(11px,2.7vw,13px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';min-width:0;}'
        + '.ff-saytext{min-width:0;overflow-wrap:break-word;}.ff-pip{font-size:clamp(19px,4.6vw,26px);flex:0 0 auto;}.ff-bounce{animation:ffBounce .5s ease;}'
        + '@keyframes ffBounce{0%{transform:scale(.8)}60%{transform:scale(1.12)}100%{transform:none}}'
        + '.ff-shelf{position:relative;height:12px;border-radius:6px;overflow:hidden;}.ff-choc{position:absolute;right:5px;top:-3px;font-size:14px;}'
        /* head: a/b chip + prompt */
        + '.ff-head{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;min-width:0;}'
        + '.ff-frac{flex:0 0 auto;display:inline-flex;flex-direction:column;align-items:center;line-height:1;color:' + C.T + ';font:800 clamp(15px,4vw,20px)/1 "Baloo 2",sans-serif;}'
        + '.ff-frac .ff-fbar{width:1.2em;height:2px;background:' + C.T + ';margin:1px 0;border-radius:1px;}'
        + '.ff-prompt{margin:0;text-align:center;font:700 clamp(11.5px,2.9vw,14px)/1.2 "Nunito",sans-serif;color:' + C.INK + ';min-width:0;overflow-wrap:break-word;flex:1 1 auto;}'
        /* forge stage */
        + '.ff-forge{display:flex;justify-content:center;align-items:center;gap:10px;flex-wrap:wrap;background:rgba(107,74,43,.05);border-radius:12px;padding:clamp(5px,1.4vw,9px);}'
        + '.ff-svg{width:100%;max-width:100%;max-height:clamp(60px,11vh,84px);height:auto;display:block;}'
        + '.ff-svg2{max-height:clamp(46px,8vh,62px);}'   /* the-whole: two stacked bars — capped shorter so 2 bars + molds + Check clear the fold */
        + '.ff-cross .ff-svgbar{max-width:62%;}.ff-pizza{max-height:clamp(54px,10vh,76px);width:auto;}'
        + '.ff-forgezone:hover{fill:rgba(107,74,43,.06);}.ff-piece:focus-visible,.ff-forgezone:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);}'
        /* mold wall */
        + '.ff-moldwall{display:flex;gap:clamp(6px,1.8vw,10px);justify-content:center;align-items:center;flex-wrap:wrap;}'
        + '.ff-mold{min-width:80px;min-height:46px;border:2.5px solid rgba(107,74,43,.3);border-radius:12px;background:#fff;padding:4px 6px;cursor:pointer;touch-action:manipulation;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 2px 0 rgba(107,74,43,.12);}'
        + '.ff-mold.ff-msel{border-color:' + C.CORAL + ';box-shadow:0 0 0 2px rgba(242,120,75,.3),0 2px 0 ' + C.CORAL2 + ';}'
        + '.ff-mold:active{transform:translateY(1px);}.ff-mold:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '.ff-moldsvg{width:70px;height:auto;display:block;}'
        /* options (name-unit) */
        + '.ff-options{display:flex;gap:clamp(6px,1.8vw,12px);justify-content:center;flex-wrap:wrap;}'
        + '.ff-opt{min-width:52px;min-height:50px;border:2px solid rgba(20,107,94,.4);border-radius:13px;background:#fff;padding:4px 12px;cursor:pointer;touch-action:manipulation;display:inline-flex;flex-direction:column;align-items:center;line-height:1;color:' + C.T + ';font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;box-shadow:0 2px 0 rgba(20,107,94,.14);}'
        + '.ff-opt .ff-obar{width:1.2em;height:2px;background:' + C.T + ';margin:2px 0;border-radius:1px;}'
        + '.ff-opt:active{transform:translateY(1px);}.ff-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* hand over / affirm */
        + '.ff-hand{align-self:center;min-height:48px;padding:0 clamp(18px,5vw,28px);border-radius:24px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(14px,3.8vw,18px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.ff-hand:disabled{opacity:.45;cursor:default;box-shadow:none;}.ff-hand:active:not(:disabled){transform:translateY(2px);}.ff-hand:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* done */
        + '.ff-done{display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px;}.ff-flare{font-size:clamp(28px,7vw,40px);animation:ffFlare .6s ease;}.ff-donetext{font:800 clamp(13px,3.2vw,16px)/1.2 "Baloo 2",sans-serif;color:' + C.GOOD + ';text-align:center;}'
        + '.ff-doneforge{width:100%;display:flex;justify-content:center;}.ff-donesvg{max-height:clamp(40px,7vh,56px);max-width:84%;}'
        + '@keyframes ffFlare{0%{transform:scale(0)}70%{transform:scale(1.25)}100%{transform:none}}'
        /* desktop: hold the rail SHORT (a taller SVG pushes the shell Check past the fold) */
        + '@media (min-width:760px){.ff-root{padding:11px 13px;}.ff-svg{max-height:clamp(58px,9vh,78px);}.ff-svg2{max-height:clamp(44px,7vh,56px);}.ff-pizza{max-height:70px;}}'
        + '@media (max-width:480px){.ff-root{gap:4px;padding:8px;}}'
        + '@media (max-width:380px){.ff-root{gap:3px;padding:6px;}.ff-prompt{font-size:11px;line-height:1.15;}.ff-svg{max-height:clamp(50px,12vh,72px);}.ff-svg2{max-height:40px;}.ff-shelf{height:8px;}.ff-moldwall,.ff-options{gap:5px;}.ff-mold{min-width:70px;}.ff-moldsvg{width:56px;}.ff-saytop{font-size:10.5px;}.ff-hand{min-height:44px;}}'
        + '@media (prefers-reduced-motion: reduce){.ff-bounce,.ff-flare{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-fox-forge', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'fox-forge.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function () { return 'hintCheck'; }
      };
    });
  }
  function bandOrder(pool, prev) {
    var byBand = {}; pool.forEach(function (t, i) { (byBand[t.band] = byBand[t.band] || []).push(i); });
    var bands = Object.keys(byBand).sort(function (a, b) { return a - b; }); var out, attempts = 0;
    do { out = []; bands.forEach(function (b) { var g = byBand[b].slice(); for (var i = g.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = g[i]; g[i] = g[j]; g[j] = t; } out = out.concat(g); }); attempts++; } while (prev && out.join(',') === prev.join(',') && attempts < 12 && pool.length > 1);
    return out;
  }

}(typeof window !== 'undefined' ? window : this));
