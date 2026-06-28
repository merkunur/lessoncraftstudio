/* =====================================================================
   BRAMBLE'S PARKING TOWER — ACTIVITY  (parking-tower-activity.js)
   ---------------------------------------------------------------------
   CCSS K.G.A.1 — positional language (above / below / beside / next-to /
   between). A side-on cross-section parking tower: a position WORD names a
   relation to a parked landmark; the child parks the vehicle in the bay
   that matches. Side-on view = above is literally higher on screen, with a
   visible FLOOR-SLAB between levels (so "above the bus" is unambiguous).

   COGNITION reused from mini tools/place-by-relation-core.js
   (window.PlaceByRelationCore: isCorrect = targetSpotIds id-match). Answer
   DERIVED, never read as an index. Full lcs-shell tool. answerType:'state'.

   No timer/score/red-X: a wrong park = a polite beep + the bay reverses +
   a 2-stage re-teach (1st miss = re-teach the term without naming the wrong
   bay; 2nd = name the mismatch). Progress = the skyline lights up. Beaver
   Bramble = SVG PLACEHOLDER via the _setPose CA5 seam. Words ALWAYS DOM.
   Fully playable audio-off (TTS is a scaffold). 0 lines to the protected
   cores + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.PlaceByRelationCore;

  var C = {
    T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F',
    CREAM: '#FBF3E4', INK: '#2A2A35', RIM: '#FFFFFF', GOOD: '#2FA56A',
    SLAB: '#9FB0AE', SLAB2: '#7E908E', SKY: '#CFE6E0', WOOD: '#C7956A'
  };
  var VCOLOR = { bus: '#F2A23B', van: '#5BA8D6', car: '#E2607A', truck: '#7DB36B', boat: '#C98AD0' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function interp(t, args) { return String(t || '').replace(/\{(\w+)\}/g, function (m, k) { return (k in args) ? args[k] : m; }); }
  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak(text); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = .92; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function shuffledOrder(n, prev) {
    var idx = [], i, j, t; for (i = 0; i < n; i++) idx.push(i); if (n < 2) return idx;
    function same(a, b) { if (!b) return false; for (var k = 0; k < a.length; k++) if (a[k] !== b[k]) return false; return true; }
    do { for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = idx[i]; idx[i] = idx[j]; idx[j] = t; } } while (same(idx, prev));
    return idx;
  }

  /* simple side-view vehicle SVGs (placeholders; CA5 sprites swap in later) */
  function vehicleSVG(type) {
    var col = VCOLOR[type] || C.T2;
    if (type === 'boat') {
      return '<svg class="pt-veh-svg" viewBox="0 0 100 64" aria-hidden="true">' +
        '<path d="M16 44 L84 44 L74 58 L26 58 Z" fill="' + col + '" stroke="' + C.INK + '" stroke-width="2"/>' +
        '<rect x="48" y="14" width="3" height="30" fill="' + C.INK + '"/><path d="M51 16 L74 40 L51 40 Z" fill="' + C.RIM + '" stroke="' + C.INK + '" stroke-width="1.5"/>' +
        '</svg>';
    }
    var len = (type === 'bus') ? 86 : (type === 'van') ? 72 : (type === 'truck') ? 80 : 66;
    var x0 = (100 - len) / 2;
    var body = (type === 'truck')
      ? '<rect x="' + x0 + '" y="30" width="' + (len * 0.46) + '" height="20" rx="3" fill="' + col + '" stroke="' + C.INK + '" stroke-width="2"/>' +
        '<path d="M' + (x0 + len * 0.46) + ' 22 h' + (len * 0.5) + ' v28 h-' + (len * 0.5) + ' z" fill="' + col + '" stroke="' + C.INK + '" stroke-width="2"/>'
      : '<rect x="' + x0 + '" y="' + (type === 'bus' ? 16 : 22) + '" width="' + len + '" height="' + (type === 'bus' ? 34 : 28) + '" rx="6" fill="' + col + '" stroke="' + C.INK + '" stroke-width="2"/>';
    var win = (type === 'truck')
      ? '<rect x="' + (x0 + 4) + '" y="33" width="' + (len * 0.32) + '" height="11" rx="2" fill="' + C.RIM + '" opacity=".85"/>'
      : '<rect x="' + (x0 + 5) + '" y="' + (type === 'bus' ? 21 : 26) + '" width="' + (len - 10) + '" height="' + (type === 'bus' ? 12 : 9) + '" rx="2" fill="' + C.RIM + '" opacity=".85"/>';
    var w1 = x0 + len * 0.22, w2 = x0 + len * 0.78;
    return '<svg class="pt-veh-svg" viewBox="0 0 100 64" aria-hidden="true">' + body + win +
      '<circle cx="' + w1 + '" cy="52" r="7" fill="' + C.INK + '"/><circle cx="' + w1 + '" cy="52" r="3" fill="#888"/>' +
      '<circle cx="' + w2 + '" cy="52" r="7" fill="' + C.INK + '"/><circle cx="' + w2 + '" cy="52" r="3" fill="#888"/>' +
      '</svg>';
  }

  /* Beaver Bramble — SVG PLACEHOLDER (attendant cap + big tail). */
  function brambleSVG() {
    return '<svg class="pt-bramble-svg" viewBox="0 0 120 120" role="img" aria-label="Bramble the beaver">' +
      '<ellipse cx="60" cy="113" rx="30" ry="6" fill="rgba(0,0,0,.08)"/>' +
      '<path d="M84 96 Q108 92 104 72 Q92 78 84 88 Z" fill="' + C.WOOD + '" stroke="' + C.CORAL2 + '" stroke-width="2"/>' +   /* tail */
      '<path d="M32 64 Q32 36 60 36 Q88 36 88 64 Q88 98 60 100 Q32 98 32 64 Z" fill="' + C.WOOD + '"/>' +
      '<ellipse cx="60" cy="56" rx="24" ry="22" fill="#E9C9A2"/>' +
      '<path d="M34 40 Q60 22 86 40 Q86 48 60 44 Q34 48 34 40 Z" fill="' + C.CORAL + '"/>' +  /* cap */
      '<g class="pt-br-eyes-open"><circle cx="52" cy="52" r="3.4" fill="' + C.INK + '"/><circle cx="68" cy="52" r="3.4" fill="' + C.INK + '"/></g>' +
      '<g class="pt-br-eyes-happy"><path d="M47 52 Q52 47 57 52" stroke="' + C.INK + '" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M63 52 Q68 47 73 52" stroke="' + C.INK + '" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>' +
      '<ellipse cx="60" cy="62" rx="7" ry="5" fill="#C98A5E"/><rect x="55" y="64" width="4" height="7" rx="1" fill="' + C.RIM + '"/><rect x="61" y="64" width="4" height="7" rx="1" fill="' + C.RIM + '"/>' +
      '</svg>';
  }

  global.ParkingTowerActivity = {
    id: 'parking-tower-activity',

    strings: {
      title:        { en: "Bramble's Parking Tower" },
      instruction:  { en: 'Help Bramble park each vehicle in the right spot. Tap Check when it is parked.' },
      promptPlace:  { en: 'Park the {mover} {rel} the {landmark}.' },
      promptBetween:{ en: 'Park the {mover} between the {lm1} and the {lm2}.' },
      promptReverse:{ en: 'Bramble parked {rel} the {landmark}. Tap his truck.' },
      promptTwoTruck:{ en: 'Park the {mover} between your two trucks.' },
      reteachAbove: { en: 'Above means one level higher up — try again!' },
      reteachBelow: { en: 'Below means one level lower down — try again!' },
      reteachNext:  { en: 'Next to means right beside it, same level — try again!' },
      reteachBetween:{ en: 'Between means in the middle of the two — try again!' },
      reteach2:     { en: 'That spot is {sib}, not {rel}. Listen again.' },
      parked:       { en: 'Yes! Parked just right.' },
      hintCheck:    { en: 'Park the vehicle in the right spot, then tap Check.' }
    },

    defaults: {},

    init: function (api) {
      this.api = api;
      this._pool = makeTasks(Core.buildRounds()); this._order = null; this._curPass = 0; this._orderForPool = null;
      this.round = null; this.phase = 'play'; this.placed = null; this.misses = 0; this.readOnly = false; this.solved = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) { this._loadActivity(); }
    },

    setupTask: function (round) {
      this.round = round; this.scene = round.scene;
      this.phase = 'play'; this.placed = null; this.misses = 0; this.readOnly = false; this.solvedNow = false;
    },

    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'pt-wrap');
      var scene = api.el('div', 'pt-scene');

      var board = api.el('div', 'pt-board');
      var bramble = api.el('div', 'pt-bramble'); bramble.setAttribute('data-pose', 'idle'); bramble.innerHTML = brambleSVG(); this._brambleEl = bramble;
      var towerWrap = api.el('div', 'pt-towerwrap'); this._towerWrapEl = towerWrap;
      board.append(bramble, towerWrap);

      /* a little city skyline behind the tower — its windows light up as
         progress (non-numeric vessel) so the scene reads as a parking-tower WORLD */
      var sky = api.el('div', 'pt-sky');
      var heights = [58, 82, 46, 92, 64, 74, 50];
      heights.forEach(function (h) {
        var b = api.el('div', 'pt-bldg'); b.style.height = h + '%';
        var n = Math.max(1, Math.round(h / 24));
        for (var w = 0; w < n; w++) b.appendChild(api.el('span', 'pt-win'));
        sky.appendChild(b);
      });
      this._skyEl = sky;

      scene.append(sky, board);
      wrap.appendChild(scene);
      stage.appendChild(wrap);
      this._renderTower();
      this._paintSky();
      this._setPose('idle');
    },

    _renderTower: function () {
      var self = this, api = this.api, s = this.scene, wrap = this._towerWrapEl; wrap.innerHTML = '';
      if (!s) return;                                            // mount-time render before the first task loads
      var tower = api.el('div', 'pt-tower');
      tower.style.setProperty('--pt-cols', s.cols); tower.style.setProperty('--pt-levels', s.levels);

      function cellEl(col, level) {
        var el = api.el('div', 'pt-cell');
        el.style.gridColumn = String(col); el.style.gridRow = String(s.levels - level + 1);
        if (level === 1) el.classList.add('pt-ground');
        return el;
      }
      /* floor + every grid cell as a slot */
      for (var lv = s.levels; lv >= 1; lv--) for (var co = 1; co <= s.cols; co++) tower.appendChild(cellEl(co, lv));

      /* landmarks (parked, not tappable) */
      s.landmarks.forEach(function (l) { var c = cellEl(l.col, l.level); c.classList.add('pt-occupied'); c.innerHTML = '<span class="pt-veh pt-landmark">' + vehicleSVG(l.vehicle) + '</span><span class="pt-label">' + esc(l.label) + '</span>'; tower.appendChild(c); });

      /* candidates — dashed BAYS (place) or TRUCKS (reverse), tappable */
      s.candidates.forEach(function (cd) {
        var c = api.el('button', 'pt-cell pt-cand ' + (cd.kind === 'truck' ? 'pt-cand-truck' : 'pt-bay')); c.type = 'button';
        c.setAttribute('data-id', cd.id);
        c.style.gridColumn = String(cd.col); c.style.gridRow = String(s.levels - cd.level + 1);
        if (cd.level === 1) c.classList.add('pt-ground');
        c.setAttribute('aria-label', cd.kind === 'truck' ? 'a truck' : 'an empty parking spot');
        if (cd.kind === 'truck') c.innerHTML = '<span class="pt-veh">' + vehicleSVG(cd.vehicle) + '</span>';
        else if (self.placed === cd.id && s.mover) c.innerHTML = '<span class="pt-veh pt-parked">' + vehicleSVG(s.mover.vehicle) + '</span>';
        else c.innerHTML = '<span class="pt-bay-mark"></span>';
        if (self.readOnly) { c.disabled = true; }
        else (function (id) { c.addEventListener('click', function () { self._tap(id, c); }); }(cd.id));
        if (self.readOnly && self.placed === cd.id) c.classList.add('pt-correct');
        tower.appendChild(c);
      });
      wrap.appendChild(tower);

      /* the mover waiting at the entrance (place rounds) */
      if (s.mover && !this.round.reverse) {
        var dock = api.el('div', 'pt-dock');
        dock.innerHTML = '<span class="pt-veh pt-mover' + (this.placed ? ' pt-gone' : '') + '">' + vehicleSVG(s.mover.vehicle) + '</span>';
        wrap.appendChild(dock);
      }
    },

    _tap: function (id, cellEl) {
      if (this.readOnly) return;
      if (Core.isCorrect(this.round, id)) { this.placed = id; this._win(); }
      else { this.misses++; this._reteach(cellEl); }
    },

    _win: function () {
      this.readOnly = true; this.phase = 'done'; this.solvedNow = true;
      this.solved = Math.min(this.solved + 1, (this._pool && this._pool.length) || 7);
      this._setPose('happy'); this.api.sound && this.api.sound(880);
      this._renderTower(); this._paintSky(); this._sparkle();
      if (this.api.announce) this.api.announce(this.api.t('parked'));
    },

    _reteach: function (cellEl) {
      this._setPose('think'); this.api.sound && this.api.sound(330);
      var rel = this.round.relation;
      var msg = this.api.t(rel === 'above' ? 'reteachAbove' : rel === 'below' ? 'reteachBelow' : rel === 'between' ? 'reteachBetween' : 'reteachNext');
      if (this.misses >= 2) msg = msg + ' ' + this.api.t('hintCheck');     // 2nd miss: re-teach + nudge
      if (this.api.announce) this.api.announce(msg);
      speak(msg);
      if (cellEl) { cellEl.classList.add('pt-nope'); setTimeout(function () { cellEl.classList.remove('pt-nope'); }, 520); }
    },

    _paintSky: function () {
      if (!this._skyEl) return;
      var wins = this._skyEl.querySelectorAll('.pt-win'); var n = (this._pool && this._pool.length) || 7;
      var lit = Math.round(wins.length * this.solved / n);
      for (var i = 0; i < wins.length; i++) wins[i].classList.toggle('lit', i < lit);
    },
    _setPose: function (name) { if (this._brambleEl) this._brambleEl.setAttribute('data-pose', name === 'happy' ? 'happy' : 'idle'); },
    _sparkle: function () {
      if (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var w = this._towerWrapEl; if (!w) return; var s = document.createElement('span'); s.className = 'pt-sparkle'; s.textContent = '✦';
      w.appendChild(s); setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 700);
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
      fetch('/mini-tools/parking-tower-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = self._buildTasksFromRow(row); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[parking-tower] manifest load failed; fallback:', e.message); });
    },
    _buildTasksFromRow: function (row) { if (row.params && Array.isArray(row.params.rounds)) return makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); return makeTasks(Core.buildRounds()); },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.pt-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,11px);width:100%;max-width:min(96vw,600px);margin:0 auto;}'
        + '.pt-scene{position:relative;display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,10px);width:fit-content;max-width:min(94vw,540px);margin:0 auto;'
        +   'background:linear-gradient(180deg,#E8F2EE,#FBF3E4 70%);border:2.5px solid rgba(20,107,94,.18);border-radius:22px;padding:clamp(8px,2vw,14px) clamp(10px,2.4vw,18px) clamp(10px,2.4vw,16px);box-shadow:0 6px 0 rgba(20,107,94,.10),inset 0 2px 0 rgba(255,255,255,.5);}'
        /* city skyline (behind the tower) — windows light up as progress */
        + '.pt-sky{display:flex;gap:clamp(3px,1vw,6px);align-items:flex-end;justify-content:center;height:clamp(28px,7.5vw,42px);width:100%;opacity:.9;}'
        + '.pt-bldg{width:clamp(14px,4vw,26px);background:linear-gradient(180deg,#2C5E55,#19443D);border-radius:3px 3px 0 0;display:flex;flex-wrap:wrap;align-content:flex-start;justify-content:center;gap:2px;padding:3px 2px;box-shadow:inset 0 2px 0 rgba(255,255,255,.06);}'
        + '.pt-win{width:clamp(3px,1vw,5px);height:clamp(3px,1vw,5px);border-radius:1px;background:rgba(255,255,255,.14);transition:background .3s,box-shadow .3s;}'
        + '.pt-win.lit{background:#FFD66B;box-shadow:0 0 5px rgba(255,214,107,.8);}'
        + '.pt-board{display:flex;align-items:flex-end;gap:clamp(4px,1.4vw,12px);margin-top:-6px;}'
        + '.pt-bramble{width:clamp(52px,13vw,80px);flex:0 0 auto;}'
        + '.pt-bramble-svg{width:100%;height:auto;display:block;overflow:visible;}'
        + '.pt-towerwrap{position:relative;display:flex;flex-direction:column;align-items:center;}'
        /* the tower as a CROSS-SECTION building — thick walls + roof + a concrete
           FLOOR-BEAM under every level (vehicles rest ON the floor) */
        + '.pt-tower{display:grid;grid-template-columns:repeat(var(--pt-cols,3),clamp(56px,15vw,90px));grid-template-rows:repeat(var(--pt-levels,2),clamp(50px,13vw,74px));'
        +   'background:linear-gradient(180deg,#EAF0EE,#DCE6E3);border-left:7px solid ' + C.SLAB2 + ';border-right:7px solid ' + C.SLAB2 + ';border-top:9px solid ' + C.SLAB2 + ';border-radius:9px 9px 0 0;overflow:hidden;box-shadow:0 4px 0 rgba(126,144,142,.5);}'
        + '.pt-cell{position:relative;border-right:2px solid rgba(126,144,142,.35);display:flex;align-items:flex-end;justify-content:center;'
        +   'border-bottom:clamp(8px,2.2vw,12px) solid ' + C.SLAB + ';box-shadow:inset 0 -2px 0 rgba(255,255,255,.4),inset 0 calc(-1 * clamp(8px,2.2vw,12px) - 2px) 0 rgba(126,144,142,.25);}'
        + '.pt-cell.pt-ground{border-bottom:clamp(11px,3vw,16px) solid ' + C.SLAB2 + ';}'
        + '.pt-veh{display:block;width:90%;margin-bottom:1px;}'
        + '.pt-veh-svg{width:100%;height:auto;display:block;}'
        + '.pt-label{position:absolute;bottom:2px;left:0;right:0;text-align:center;font-family:"Nunito",sans-serif;font-weight:800;font-size:clamp(9px,2.4vw,12px);color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.4);}'
        /* dashed empty bay (sits on the floor) */
        + '.pt-bay{cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation;padding:0;}'
        + '.pt-bay .pt-bay-mark{width:78%;height:64%;margin-bottom:6%;border:3px dashed rgba(242,120,75,.65);border-radius:8px;background:rgba(242,120,75,.06);}'
        + '.pt-bay:hover .pt-bay-mark,.pt-bay:focus-visible .pt-bay-mark{border-color:' + C.CORAL + ';}'
        + '.pt-cand-truck{background:none;cursor:pointer;padding:0;-webkit-tap-highlight-color:transparent;touch-action:manipulation;}'
        + '.pt-cand:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:-2px;}'
        + '.pt-cand:active{transform:scale(.97);}'
        + '.pt-correct{background:rgba(47,165,106,.18);}'
        + '.pt-parked{animation:ptDrive .4s var(--lcs-ease,ease);}'
        + '@keyframes ptDrive{0%{transform:translateX(-30px);opacity:.2;}100%{transform:translateX(0);opacity:1;}}'
        + '.pt-nope{animation:ptNope .5s ease;}'
        + '@keyframes ptNope{0%,100%{transform:translateX(0);}25%{transform:translateX(-4px);}75%{transform:translateX(4px);}}'
        /* dock + mover */
        + '.pt-dock{margin-top:5px;width:clamp(52px,14vw,74px);}'
        + '.pt-mover{width:90%;margin:0 auto;}'
        + '.pt-mover.pt-gone{opacity:.25;}'
        /* Bramble pose + juice */
        + '.pt-br-eyes-happy{display:none;} .pt-bramble[data-pose="happy"] .pt-br-eyes-open{display:none;} .pt-bramble[data-pose="happy"] .pt-br-eyes-happy{display:inline;}'
        + '.pt-sparkle{position:absolute;left:50%;top:-6px;transform:translateX(-50%);color:' + C.CORAL + ';font-size:20px;animation:ptSpark .7s ease forwards;pointer-events:none;}'
        + '@keyframes ptSpark{0%{opacity:0;transform:translate(-50%,6px) scale(.5);}30%{opacity:1;}100%{opacity:0;transform:translate(-50%,-22px) scale(1.1);}}'
        + '@media (max-width:360px){.pt-scene{padding:7px 9px;} .pt-board{gap:4px;} .pt-bramble{width:46px;}}'
        + '@media (prefers-reduced-motion: reduce){.pt-parked,.pt-nope,.pt-sparkle{animation:none;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-parking-tower', ''); tag.textContent = css;
      document.head.appendChild(tag);
    }
  };

  /* ---- helpers shared with makeTasks ---- */
  function relWord(r) { return { above: 'above', below: 'below', 'next-to': 'next to', between: 'between' }[r] || r; }

  function makeTasks(rounds) {
    return rounds.map(function (round) {
      var s = round.scene;
      var lm = function (id) { var l = s.landmarks.filter(function (x) { return x.id === id; })[0]; return l ? l.label : id; };
      var pk, pa = {};
      if (round.experience === 'between') { pk = 'promptBetween'; pa = { mover: s.mover ? s.mover.label : 'car', lm1: lm(round.termRef[0]), lm2: lm(round.termRef[1]) }; }
      else if (round.experience === 'reverse') { pk = 'promptReverse'; pa = { rel: relWord(round.relation), landmark: lm(round.termRef[0]) }; }
      else if (round.experience === 'two-truck') { pk = 'promptTwoTruck'; pa = { mover: s.mover ? s.mover.label : 'car' }; }
      else { pk = 'promptPlace'; pa = { mover: s.mover ? s.mover.label : 'truck', rel: relWord(round.relation), landmark: lm(round.termRef[0]) }; }
      return {
        id: 'parking-tower.' + round.id, band: round.band,
        promptKey: pk, promptArgs: pa, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { var ok = tool.isCorrect(); if (ok) tool.readOnly = true; return ok; },
        hintKey: function () { return 'hintCheck'; }
      };
    });
  }

  function bandOrder(pool, prev) {
    var byBand = {}; pool.forEach(function (t, i) { (byBand[t.band] = byBand[t.band] || []).push(i); });
    var bands = Object.keys(byBand).sort(function (a, b) { return a - b; });
    var out, attempts = 0;
    do { out = []; bands.forEach(function (b) { var g = byBand[b].slice(); for (var i = g.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = g[i]; g[i] = g[j]; g[j] = t; } out = out.concat(g); }); attempts++; } while (prev && out.join(',') === prev.join(',') && attempts < 12 && pool.length > 1);
    return out;
  }

}(typeof window !== 'undefined' ? window : this));
