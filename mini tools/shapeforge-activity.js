/* =====================================================================
   SHAPE FORGE — Mim's Glow Workshop — ACTIVITY  (shapeforge-activity.js)
   ---------------------------------------------------------------------
   CCSS 1.G.A.2 + K.G.B.6 — Mim the glow-smith fuses translucent glass shards
   (triangles + rhombi) to fill a blank glowing lantern shape, forge the SAME
   shape a NEW way, and re-forge it into a new shape. SELECT a shard → tap-
   ROTATE → tap a glowing anchor to PLACE (legal → seats grey/un-fused; illegal
   anchors simply aren't offered); the instant the union exactly covers the
   blank silhouette it FLARES (commit-only auto-complete, NO Check button, NO
   per-piece "right so far" leak). Tap a placed shard to take it back (free).
   The blank target is ONE dark filled region — NO internal seam lines. All
   grading from shapeforge-core.js. 0 lines to any protected core + lcs-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.ShapeForgeCore;
  var LANG = 'en';                               /* content locale (api.lang = ?lang=xx); set in init(). */
  var SVGNS = 'http://www.w3.org/2000/svg';
  var S = 10;                                   /* unit-triangle side (SVG units; CSS scales it) */
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', DARK: '#243B36' };
  var SHARD = { triangle: '#5BB5A6', rhombus: '#E89A5B' };   /* lit tints (stub; CA5 = stained glass) */
  /* Per-locale piece names — formal Klasse-1 curriculum terms (educator). */
  var PIECE_L = {
    en: { triangle: 'triangle', rhombus: 'rhombus' },
    de: { triangle: 'Dreieck', rhombus: 'Raute' },
    fr: { triangle: 'un triangle', rhombus: 'un losange' },
    /* es-MX — formal 1º-primaria geometry terms (pattern-block piece = "rombo", NOT romboide). */
    es: { triangle: 'triángulo', rhombus: 'rombo' },
    /* pt-BR — formal figura word: "losango" (⚠ NUNCA "rombo" = buraco/brecha em pt-BR, falso amigo). */
    pt: { triangle: 'triângulo', rhombus: 'losango' }
  };
  function pname(id) { return (PIECE_L[LANG] && PIECE_L[LANG][id]) || (PIECE_L.en && PIECE_L.en[id]) || id; }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG, rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.lang = LANG; u.rate = rate || 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function svg(tag, attrs) { var e = document.createElementNS(SVGNS, tag); for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); return e; }
  function ptsOf(cells) { return cells.map(function (rc) { return Core.cellVertices(rc[0], rc[1], S).map(function (p) { return p[0].toFixed(2) + ',' + p[1].toFixed(2); }).join(' '); }); }

  global.ShapeForgeActivity = {
    id: 'shapeforge-activity',

    strings: {
      /* es-MX — native ensemble (lingüista + pedagoga de 1º, planes y programas SEP).
         Verbo de armado = "armar" (nunca el imperativo "forja"); piezas = "pieza(s)";
         el tema forja/luz vive en la voz de Mim ("une la luz"). Formas: triángulo/rombo/
         hexágono formales; trapecio→"techo" y paralelogramo→"linterna" (reencuadre K-1). */
      title: { en: "Mim's Glow Workshop", de: 'Mims Glühwerkstatt', fr: "L'atelier lumineux de Mim", es: 'El taller de luz de Mim', pt: 'A oficina de luz de Mim' },
      instruction: { en: '', de: '' },
      prompt: { en: 'Forge the shape.', de: 'Bau die Form.', fr: 'Assemble la forme.', es: 'Arma la figura.', pt: 'Monte a figura.' },
      rotate: { en: '↻ Turn', de: '↻ Drehen', fr: '↻ Tourner', es: '↻ Girar', pt: '↻ Girar' },
      sayWelcome: { en: 'Pick a shard, turn it, and fuse the light!', de: 'Such dir ein Leuchtplättchen aus, dreh es und setz das Licht zusammen!', fr: 'Choisis un éclat, fais-le tourner et assemble la lumière !', es: '¡Elige una pieza, gírala y une la luz!', pt: 'Escolha uma peça, gire e junte a luz!' },
      sayWin: { en: 'You forged it! ✨', de: 'Du hast es gebaut! ✨', fr: 'Bravo, tu as réussi ! ✨', es: '¡Lo armaste! ✨', pt: 'Você montou! ✨' },
      sayIllegal: { en: "Try turning it, or pick another shard.", de: 'Dreh es mal, oder nimm ein anderes Plättchen.', fr: 'Fais tourner la pièce, ou choisis-en une autre.', es: 'Intenta girarla o elige otra pieza.', pt: 'Tente girar ou escolha outra peça.' },
      sayReway: { en: "That's the first way — now find a NEW way!", de: 'Das war der erste Weg – jetzt finde einen NEUEN Weg!', fr: 'Voilà la première façon — trouve maintenant une NOUVELLE façon !', es: '¡Esa fue la primera forma… ahora encuentra una NUEVA!', pt: 'Essa foi a primeira forma… agora encontre uma forma NOVA!' },
      pickFirst: { en: 'Tap a shard below to begin.', de: 'Tipp unten auf ein Plättchen, um loszulegen.', fr: 'Touche une pièce en bas pour commencer.', es: 'Toca una pieza de abajo para empezar.', pt: 'Toque em uma peça embaixo para começar.' },
      hintCheck: { en: 'Fill every part of the blank shape.', de: 'Füll jeden Teil der leeren Form aus.', fr: 'Remplis toute la forme, sans laisser de trou.', es: 'Llena cada parte de la figura vacía.', pt: 'Preencha cada parte da figura vazia.' },
      shardLabel: { en: 'shard: ', de: 'Plättchen: ', fr: 'pièce : ', es: 'pieza: ', pt: 'peça: ' },
      paletteLeft: { en: '{piece}, {n} left', de: '{piece}, noch {n}', fr: '{piece}, encore {n}', es: '{piece}, quedan {n}', pt: '{piece}, restam {n}' },
      ariaShards: { en: 'glowing shards', de: 'leuchtende Plättchen', fr: 'éclats lumineux', es: 'piezas brillantes', pt: 'peças brilhantes' },
      ariaForge: { en: 'the blank lantern — fuse shards to fill it', de: 'die leere Laterne – setz Plättchen zusammen, um sie zu füllen', fr: 'la lanterne vide — assemble des éclats pour la remplir', es: 'la linterna vacía: une las piezas para llenarla', pt: 'a lanterna vazia — junte as peças para preenchê-la' },
      ariaPlace: { en: 'place here', de: 'hier einsetzen', fr: 'poser ici', es: 'coloca aquí', pt: 'coloque aqui' },
      ariaRemovable: { en: '{piece}, placed — tap to take it back', de: '{piece}, eingesetzt – tipp drauf, um es zurückzunehmen', fr: '{piece}, posée — touche pour la reprendre', es: '{piece}, colocada: toca para quitarla', pt: '{piece}, colocado — toque para tirar de volta' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.snap = null; this.solved = false;
      this.placements = []; this.remaining = {}; this.selected = null; this.orient = 0; this.msg = null;
      this._avoid = null; this.forgedCount = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.snap = Core.snapshot(round);
      this.solved = false; this.placements = []; this.selected = null; this.orient = 0; this.msg = null; this._spoke = false;
      this.remaining = {}; (round.palette || []).forEach(function (p) { this.remaining[p.pieceId] = p.count; }, this);
      this._avoid = (round.cog === 'reway') ? (Core.audit(round).solutionMultiset) : null;
    },

    /* localized per-round prompt: manifest promptL10n[LANG] → EN prompt → generic */
    _pPrompt: function (r) { return (r && r.promptL10n && r.promptL10n[LANG]) || (r && r.prompt) || this.api.t('prompt'); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var root = api.el('div', 'sf-root'); root.setAttribute('data-solved', this.solved ? '1' : '0'); this._rootEl = root;
      if (!this.round) { stage.appendChild(root); return; }
      var self = this, r = this.round;

      var say = api.el('div', 'sf-saytop');
      say.innerHTML = '<span class="sf-mim' + (this.solved ? ' sf-hop' : '') + '">🦊</span><span class="sf-saytext">' + esc(this.msg || api.t('sayWelcome')) + '</span>';
      root.appendChild(say);

      this._renderShelf(root);

      var prompt = api.el('p', 'sf-prompt'); prompt.textContent = this._pPrompt(r); root.appendChild(prompt);

      /* the forge (SVG build area) */
      root.appendChild(this._buildSvg());

      if (!this.solved) {
        /* rotate + selected-piece preview */
        var ctr = api.el('div', 'sf-controls');
        var rot = api.el('button', 'sf-rotate'); rot.type = 'button'; rot.textContent = api.t('rotate');
        rot.disabled = !this.selected;
        rot.addEventListener('click', function () { self._rotate(); });
        ctr.appendChild(rot);
        var hint = api.el('span', 'sf-hint'); hint.textContent = this.selected ? (api.t('shardLabel') + pname(this.selected)) : api.t('pickFirst'); ctr.appendChild(hint);
        root.appendChild(ctr);

        /* palette — one button per TYPE + an abundance count */
        var pal = api.el('div', 'sf-palette'); pal.setAttribute('role', 'group'); pal.setAttribute('aria-label', api.t('ariaShards'));
        (r.palette || []).forEach(function (p) {
          var left = self.remaining[p.pieceId] || 0;
          var b = api.el('button', 'sf-shard' + (self.selected === p.pieceId ? ' sf-sel' : '')); b.type = 'button';
          b.disabled = left <= 0;
          b.setAttribute('aria-label', api.t('paletteLeft').replace('{piece}', pname(p.pieceId)).replace('{n}', left));
          b.appendChild(self._pieceMini(p.pieceId));
          var n = api.el('span', 'sf-count'); n.textContent = '×' + left; b.appendChild(n);
          b.addEventListener('click', function () { self._select(p.pieceId); });
          pal.appendChild(b);
        });
        root.appendChild(pal);
      } else {
        var done = api.el('div', 'sf-done'); done.innerHTML = '<span class="sf-flare">✨</span><span class="sf-donetext">' + esc(api.t('sayWin')) + '</span>'; root.appendChild(done);
      }

      stage.appendChild(root);
      if (!this._spoke) { this._spoke = true; if (r.namedTarget) setTimeout(function () { speak(self._pPrompt(r)); }, 260); }
    },

    _renderShelf: function (root) {
      var api = this.api, total = (this._pool && this._pool.length) || 11;
      var sh = api.el('div', 'sf-shelf'); sh.setAttribute('aria-hidden', 'true');
      var fill = Math.min(1, this.forgedCount / total);
      sh.style.background = 'linear-gradient(90deg, #F4D58A ' + Math.round(fill * 100) + '%, #E7EEE9 ' + Math.round(fill * 100) + '%)';
      var k = api.el('span', 'sf-lantern'); k.textContent = fill >= 1 ? '🏮✨' : '🏮'; sh.appendChild(k);
      root.appendChild(sh);
    },

    _buildSvg: function () {
      var self = this, r = this.round, api = this.api;
      var wrap = api.el('div', 'sf-forge');
      var b = Core.bounds(r.target.cells, S), pad = S * 0.6;
      var vb = (b.minX - pad) + ' ' + (b.minY - pad) + ' ' + (b.w + 2 * pad) + ' ' + (b.h + 2 * pad);
      var sv = svg('svg', { viewBox: vb, class: 'sf-svg', 'aria-label': api.t('ariaForge') });
      sv.style.aspectRatio = ((b.w + 2 * pad) / (b.h + 2 * pad)).toFixed(3);

      /* the BLANK silhouette — every target cell, ONE dark fill, NO internal
         strokes → reads as a single region (no seams). */
      ptsOf(r.target.cells).forEach(function (pts) { sv.appendChild(svg('polygon', { points: pts, fill: C.DARK, stroke: 'none' })); });

      /* pre-placed shards (Mim's — fixed, not removable) */
      (r.prePlaced || []).forEach(function (pl) { self._drawShard(sv, pl, true, -1); });
      /* the child's placed shards (grey un-fused; removable) */
      this.placements.forEach(function (pl, idx) { self._drawShard(sv, pl, false, idx); });

      /* glowing anchor dots for the selected piece (the tap-to-place targets) */
      if (this.selected && !this.solved) {
        for (var o = 0; o < Core.orientCount(this.selected); o++) {
          if (o !== this.orient) continue;
          var oFix = o;   /* capture the orient per-dot — the click/keydown handlers below must NOT close over the loop `var o` (which ends at orientCount, an invalid index → _placeAt gets a bad orient → the piece covers nothing → "can't fill / no solution"). */
          Core.legalAnchors(r, this.placements.concat(r.prePlaced || []), this.selected, oFix).forEach(function (a) {
            var cells = Core.cellsOf({ pieceId: self.selected, orient: oFix, dr: a.dr, dc: a.dc });
            /* ghost of the piece at this anchor + a ≥44px tap dot at the centroid */
            var cx = 0, cy = 0; cells.forEach(function (rc) { var c2 = Core.centroid(rc[0], rc[1], S); cx += c2[0]; cy += c2[1]; }); cx /= cells.length; cy /= cells.length;
            ptsOf(cells).forEach(function (pts) { sv.appendChild(svg('polygon', { points: pts, fill: SHARD[self.selected], 'fill-opacity': '0.28', stroke: SHARD[self.selected], 'stroke-opacity': '0.7', 'stroke-width': '0.4', class: 'sf-ghost' })); });
            var dot = svg('circle', { cx: cx, cy: cy, r: S * 0.68, fill: 'rgba(255,255,255,.14)', class: 'sf-anchor', tabindex: '0', role: 'button' });
            dot.setAttribute('aria-label', api.t('ariaPlace'));
            dot.addEventListener('click', function () { self._placeAt(oFix, a.dr, a.dc); });
            dot.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); self._placeAt(oFix, a.dr, a.dc); } });
            sv.appendChild(dot);
          });
        }
      }
      wrap.appendChild(sv);
      return wrap;
    },

    _drawShard: function (sv, pl, fixed, idx) {
      var self = this, cells = Core.cellsOf(pl);
      var tint = SHARD[pl.pieceId] || '#999';
      var op = this.solved ? '0.92' : '0.6';
      var grp = svg('g', { class: 'sf-shard-g' + (this.solved ? ' sf-fused' : '') });
      ptsOf(cells).forEach(function (pts) { grp.appendChild(svg('polygon', { points: pts, fill: tint, 'fill-opacity': self.solved ? '0.82' : '0.5', stroke: '#fff', 'stroke-opacity': '0.7', 'stroke-width': '0.35' })); });
      if (!fixed && !this.solved) {
        grp.setAttribute('class', grp.getAttribute('class') + ' sf-removable');
        grp.setAttribute('tabindex', '0'); grp.setAttribute('role', 'button'); grp.setAttribute('aria-label', self.api.t('ariaRemovable').replace('{piece}', pname(pl.pieceId)));
        grp.addEventListener('click', function () { self._remove(idx); });
        grp.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); self._remove(idx); } });
      }
      sv.appendChild(grp);
    },

    _pieceMini: function (pieceId) {
      /* a tiny SVG glyph of the piece (orient 0) for the palette button */
      var cells = Core.PIECES[pieceId].orients[0].map(function (rc) { return [rc[0], rc[1]]; });
      var b = Core.bounds(cells, S), pad = S * 0.3;
      var sv = svg('svg', { viewBox: (b.minX - pad) + ' ' + (b.minY - pad) + ' ' + (b.w + 2 * pad) + ' ' + (b.h + 2 * pad), class: 'sf-mini' });
      ptsOf(cells).forEach(function (pts) { sv.appendChild(svg('polygon', { points: pts, fill: SHARD[pieceId], 'fill-opacity': '0.85', stroke: '#fff', 'stroke-width': '0.4' })); });
      return sv;
    },

    /* ---------- interaction ---------- */
    _select: function (pieceId) {
      if ((this.remaining[pieceId] || 0) <= 0) return;
      this.selected = (this.selected === pieceId) ? null : pieceId; this.orient = 0;
      this.api.sound && this.api.sound(this.selected ? 600 : 420); this.msg = null; this.render();
    },
    _rotate: function () {
      if (!this.selected) return;
      this.orient = (this.orient + 1) % Core.orientCount(this.selected);
      this.api.sound && this.api.sound(520); this.render();
    },
    _placeAt: function (orient, dr, dc) {
      if (!this.selected) return;
      this.placements.push({ pieceId: this.selected, orient: orient, dr: dr, dc: dc });
      this.remaining[this.selected]--;
      this.api.sound && this.api.sound(660);
      if (this.remaining[this.selected] <= 0) this.selected = null;
      this.msg = null;
      this._checkComplete();
      this.render();
    },
    _remove: function (idx) {
      var pl = this.placements[idx]; if (!pl) return;
      this.placements.splice(idx, 1); this.remaining[pl.pieceId] = (this.remaining[pl.pieceId] || 0) + 1;
      this.api.sound && this.api.sound(420); this.msg = null; this.render();
    },
    _checkComplete: function () {
      var r = this.round, api = this.api;
      if (!Core.isComplete(r, this.placements.concat(r.prePlaced || []))) return;
      if (this._avoid && Core.pieceMultiset(this.placements) === this._avoid) {
        /* reway: this is the first/obvious way — crack it back, ask for a NEW way */
        this.msg = api.t('sayReway');
        this.placements = []; this.remaining = {}; (r.palette || []).forEach(function (p) { this.remaining[p.pieceId] = p.count; }, this); this.selected = null;
        api.sound && api.sound(440);
        api.announce && api.announce(api.t('sayReway'));
        return;
      }
      this._forged();
    },
    _forged: function () {
      var api = this.api;
      this.solved = true;
      this.forgedCount = Math.min(this.forgedCount + 1, (this._pool && this._pool.length) || 11);
      this.msg = api.t('sayWin');
      api.sound && api.sound(880);
      api.announce && api.announce(api.t('sayWin'));
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
      fetch('/mini-tools/shapeforge-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) {
          var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return;
          self._activityRow = row;
          self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); }));
          self._order = null;
          if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
        })
        .catch(function (e) { if (global.console && console.warn) console.warn('[shapeforge] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.sf-root{position:relative;width:100%;max-width:min(96vw,640px);margin:0 auto;display:flex;flex-direction:column;gap:clamp(4px,1vw,8px);background:linear-gradient(180deg,#FBF3E4,#EAF2EE);border-radius:16px;padding:clamp(6px,1.4vw,11px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);box-sizing:border-box;}'
        + '.sf-saytop{display:flex;align-items:center;gap:7px;justify-content:center;font:700 clamp(11px,2.7vw,13px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';min-width:0;}'
        + '.sf-saytext{min-width:0;overflow-wrap:break-word;}.sf-mim{font-size:clamp(19px,4.6vw,26px);flex:0 0 auto;}.sf-hop{animation:sfHop .5s ease;}'
        + '@keyframes sfHop{0%{transform:translateY(0)}40%{transform:translateY(-7px)}100%{transform:none}}'
        + '.sf-shelf{position:relative;height:13px;border-radius:7px;overflow:hidden;}.sf-lantern{position:absolute;right:5px;top:-4px;font-size:15px;}'
        + '.sf-prompt{margin:0;text-align:center;font:700 clamp(12px,3vw,15px)/1.2 "Nunito",sans-serif;color:' + C.INK + ';min-width:0;overflow-wrap:break-word;}'
        /* the forge */
        + '.sf-forge{display:flex;justify-content:center;align-items:center;background:rgba(20,107,94,.06);border-radius:12px;padding:clamp(4px,1.1vw,7px);}'
        + '.sf-svg{width:auto;max-width:100%;max-height:clamp(80px,17vh,124px);height:auto;display:block;}'
        + '.sf-anchor{cursor:pointer;}.sf-anchor:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);}'
        + '.sf-ghost{pointer-events:none;}'
        + '.sf-removable{cursor:pointer;}.sf-removable:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);}'
        + '.sf-fused{filter:drop-shadow(0 0 4px rgba(232,165,90,.8));}'
        /* controls */
        + '.sf-controls{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;min-width:0;}'
        + '.sf-rotate{min-height:44px;padding:0 16px;border-radius:13px;border:2px solid rgba(20,107,94,.4);background:#fff;color:' + C.T + ';font:800 clamp(13px,3.2vw,15px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;}'
        + '.sf-rotate:disabled{opacity:.4;cursor:default;}.sf-rotate:active:not(:disabled){transform:translateY(1px);}'
        + '.sf-hint{font:600 clamp(10.5px,2.6vw,12.5px)/1.2 "Nunito",sans-serif;color:' + C.T + ';min-width:0;overflow-wrap:break-word;}'
        /* palette */
        + '.sf-palette{display:flex;flex-wrap:wrap;gap:clamp(7px,2vw,12px);justify-content:center;}'
        + '.sf-shard{min-width:56px;min-height:48px;padding:4px 10px;border-radius:13px;border:2px solid rgba(232,165,90,.5);background:#fff;box-shadow:0 2px 0 rgba(160,120,60,.16);cursor:pointer;display:inline-flex;align-items:center;gap:6px;touch-action:manipulation;}'
        + '.sf-shard.sf-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.3);}'
        + '.sf-shard:disabled{opacity:.35;cursor:default;}.sf-shard:active:not(:disabled){transform:translateY(1px);}'
        + '.sf-mini{width:clamp(22px,5.5vw,28px);height:clamp(22px,5.5vw,28px);display:block;}'
        + '.sf-count{font:800 clamp(13px,3.2vw,15px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.sf-shard:focus-visible,.sf-rotate:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* done */
        + '.sf-done{display:flex;flex-direction:column;align-items:center;gap:3px;padding:4px;}.sf-flare{font-size:clamp(28px,7vw,40px);animation:sfFlare .6s ease;}.sf-donetext{font:800 clamp(13px,3.2vw,16px)/1.2 "Baloo 2",sans-serif;color:' + C.GOOD + ';text-align:center;}'
        + '@keyframes sfFlare{0%{transform:scale(0);opacity:0}70%{transform:scale(1.25)}100%{transform:none;opacity:1}}'
        + '@media (min-width:760px){.sf-root{padding:10px 14px;gap:5px;}.sf-svg{max-height:clamp(92px,13vh,112px);}}'
        + '@media (max-width:480px){.sf-root{gap:3px;padding:7px;}}'
        + '@media (max-width:380px){.sf-root{gap:2px;padding:4px;}.sf-prompt{font-size:11.5px;line-height:1.15;}.sf-svg{max-height:clamp(70px,15vh,104px);}.sf-shelf{height:7px;}.sf-controls{gap:6px;}.sf-saytop{font-size:10.5px;}.sf-forge{padding:4px;}}'
        /* ≤340: the longest localized prompts (e.g. fr reway/substitute/extend) wrap an extra line at 320 — trim the target + gaps so the shell Check stays above the fold (§A.13.62). Text unchanged. */
        + '@media (max-width:340px){.sf-root{gap:1px;padding:4px;}.sf-prompt{font-size:11px;line-height:1.1;}.sf-svg{max-height:clamp(56px,12vh,82px);}.sf-forge{padding:3px;}.sf-palette{gap:6px;}.sf-saytop{font-size:10px;}}'
        + '@media (prefers-reduced-motion: reduce){.sf-hop,.sf-flare,.sf-fused{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-shapeforge', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'shapeforge.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
