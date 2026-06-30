/* =====================================================================
   MAMA'S ROLL CALL — ACTIVITY  (mamas-roll-call-activity.js)
   ---------------------------------------------------------------------
   CCSS K.CC.B.5 — count to answer how-many up to 20; AND given a number, COUNT
   OUT that many. Mama Duck calls the roll at Quack Creek: the child sends her
   exactly the number of ducklings she asks for — counting them out of an
   abundant raft one at a time, WITH NO GAME REACTION — then signs the roll by
   FORMING the numeral in the mud (ordered strokes). The roll seals ONLY at the
   commit, IFF the set sent === the call.

   The differentiator from Mochi's count-out: NO feedback during the count-out
   (the child self-determines when to stop) + the numeral-FORMATION commit
   channel (handwriting). Seven acts: count-out / count-out-distract / match-set
   / zero / count-set / running-total / scatter-out.

   Count-out + formation cognition + the GLYPHS table + the anti-cheat SOLVERS
   live in mini tools/numeral-trace-core.js (pure). answerType:'state'. Mama +
   ducklings = SVG STUBS for CA5 (NO image-library → no 404). No timer/score/
   streak; a mismatch is a NON-DIRECTIONAL re-do. 0 lines to the protected cores
   + lcs-shell.*.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.NumeralTraceCore;
  var C = { T: '#146B5E', T2: '#0e4f45', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', GOLD: '#E8A53A', INK: '#2A2A35', PAD: '#7FB069' };
  var WORDS = { 0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine' };
  var WORDS_DE = { 0: 'null', 1: 'eins', 2: 'zwei', 3: 'drei', 4: 'vier', 5: 'fünf', 6: 'sechs', 7: 'sieben', 8: 'acht', 9: 'neun' };
  var COLOR_DE = { yellow: { adj: 'gelbe', sg: 'gelbes' }, brown: { adj: 'braune', sg: 'braunes' } };
  var LANG = 'en';
  function numWord(n) { return (LANG === 'de' ? WORDS_DE : WORDS)[n] || n; }

  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'number', text: String(text), lang: LANG, rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(String(text)); u.rate = .95; u.lang = (LANG === 'de' ? 'de-DE' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function duckSVG(kind, mama) {
    var col = kind === 'yellow' ? '#F2C14E' : kind === 'brown' ? '#B07A45' : '#FCD667';
    var col2 = kind === 'yellow' ? '#C99A2E' : kind === 'brown' ? '#7E552F' : '#E0B43F';
    return '<svg viewBox="0 0 100 100" aria-hidden="true">'
      + '<ellipse cx="48" cy="62" rx="34" ry="24" fill="' + col + '"/><ellipse cx="48" cy="62" rx="34" ry="24" fill="none" stroke="' + col2 + '" stroke-width="3"/>'
      + '<circle cx="72" cy="40" r="16" fill="' + col + '"/><circle cx="72" cy="40" r="16" fill="none" stroke="' + col2 + '" stroke-width="3"/>'
      + '<circle cx="76" cy="36" r="3.2" fill="#2A2A35"/>'
      + '<path d="M84 40 l14 -3 -2 9z" fill="' + C.CORAL + '"/>'
      + (mama ? '<path d="M30 44 q-4 -16 12 -18" stroke="' + col2 + '" stroke-width="3" fill="none" stroke-linecap="round"/>' : '')
      + '</svg>';
  }
  function padSVG() { return '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="52" r="40" fill="' + C.PAD + '"/><path d="M50 52 L86 36" stroke="#5C8C4A" stroke-width="6" stroke-linecap="round"/></svg>'; }

  global.MamasRollCallActivity = {
    id: 'mamas-roll-call-activity',
    reward: { id: 'rollbook', label: "Mama's Roll-Book", emoji: '🦆' },

    strings: {
      title: { en: "Mama's Roll Call", de: 'Mamas Morgenappell' },
      instruction: { en: 'Send Mama the number she calls, then write it.', de: 'Schick Mama die Zahl, die sie ruft – dann schreib sie auf.' },
      prompt: { en: 'Send the number!', de: 'Schick die Zahl!' },
      callNumeral: { en: 'Mama needs {n}!', de: 'Mama braucht {n}!' },
      callZero: { en: 'Mama needs NONE — let them sleep!', de: 'Mama braucht KEINS – lass sie schlafen!' },
      callGroup: { en: 'Send a duckling for each lily-pad!', de: 'Schick für jedes Seerosenblatt ein Entenküken!' },
      callKind: { en: 'Send {n} {kind} ducklings!', de: 'Schick {n} {kind} Entenküken!' },
      countBrood: { en: 'How many came to Mama? Tap each to count.', de: 'Wie viele sind zu Mama gekommen? Tippe jedes an, um zu zählen.' },
      arriveLab: { en: 'More keep arriving — count them all!', de: 'Es kommen noch mehr – zähl sie alle!' },
      hintSend: { en: 'Tap a duckling to send it across to Mama.', de: 'Tippe ein Entenküken an, um es zu Mama hinüberzuschicken.' },
      hintCount: { en: 'Tap each duckling once to count it.', de: 'Tippe jedes Entenküken einmal an, um es zu zählen.' },
      signNav: { en: 'Sign the roll ✍', de: 'Appell unterschreiben ✍' },
      moreArrive: { en: 'More arrive ▶', de: 'Es kommen mehr ▶' },
      backRaft: { en: '← send more', de: '← mehr schicken' },
      signHint: { en: 'Write the number in the mud to call the roll!', de: 'Schreib die Zahl in den Schlamm, um den Appell aufzurufen!' },
      traceIt: { en: 'Write the {n}', de: 'Schreib die {n}' },
      strokeN: { en: 'Stroke {k}', de: 'Strich {k}' },
      thisWay: { en: 'Start that stroke first — this way!', de: 'Fang mit diesem Strich an – so herum!' },
      sealed: { en: 'The roll is true — Mama gathers her brood! 🦆', de: 'Der Appell stimmt – Mama sammelt ihre Schar! 🦆' },
      sealedZero: { en: 'Zero ducklings — and you wrote the zero! The raft sleeps in. 🌙', de: 'Null Entenküken – und du hast die Null geschrieben! Das Floß schläft weiter. 🌙' },
      redo: { en: "Let's call that roll again.", de: 'Lass uns den Appell noch einmal aufrufen.' },
      tapCheck: { en: 'Tap Check! ✓', de: 'Tippe auf Prüfen! ✓' },
      sentLab: { en: 'With Mama', de: 'Bei Mama' },
      raftLab: { en: 'The raft', de: 'Das Floß' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.solved = false; this.solvedCount = 0; this.msg = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.cstate = Core.newState(round); this.solved = false; this.msg = null;
      this.act = round.act_type; this.batchIdx = 0; this._drag = null;
    },
    announce: function (s) { if (this.api.announce) this.api.announce(s); },
    _n: function () { return this.cstate.call.n | 0; },
    _isProd: function () { return Core.isProductionAct(this.round); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'rc-wrap'); var root = api.el('div', 'rc-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }

      var head = api.el('div', 'rc-head' + (this.solved ? ' rc-head-win' : ''));
      var mama = api.el('span', 'rc-mama'); mama.innerHTML = duckSVG('duck', true);
      var say = api.el('span', 'rc-say'); say.textContent = this.msg || this._hint();
      head.appendChild(mama); head.appendChild(say); root.appendChild(head);

      if (this.solved) this._renderDone(root);
      else if (this.cstate.stage === 'sign') this._renderSign(root);
      else this._renderCountOut(root);

      wrap.appendChild(root); stage.appendChild(wrap);
    },
    _hint: function () {
      var api = this.api;
      if (this.cstate.stage === 'sign') return api.t('signHint');
      if (this.act === 'count-set' || this.act === 'running-total') return api.t('hintCount');
      return api.t('hintSend');
    },

    /* ----- the call card (the ask) ----- */
    _callCard: function () {
      var api = this.api, card = api.el('div', 'rc-call');
      if (this.act === 'zero') { card.classList.add('rc-call-zero'); var z = api.el('span', 'rc-call-text'); z.textContent = api.t('callZero'); card.appendChild(z); return card; }
      if (this.act === 'match-set') {
        var lab = api.el('div', 'rc-call-text'); lab.textContent = api.t('callGroup'); card.appendChild(lab);
        var pads = api.el('div', 'rc-pads'); for (var i = 0; i < (this.round.groupN | 0); i++) { var p = api.el('span', 'rc-pad'); p.innerHTML = padSVG(); pads.appendChild(p); } card.appendChild(pads);
        return card;
      }
      if (this.act === 'count-set' || this.act === 'running-total') { var ct = api.el('span', 'rc-call-text'); ct.textContent = api.t(this.act === 'running-total' ? 'arriveLab' : 'countBrood'); card.appendChild(ct); return card; }
      // numeral target (count-out / distract / scatter) — the numeral INLINE (one line)
      var n = this._n(), bign = '<span class="rc-call-big">' + n + '</span>';
      var t = api.el('div', 'rc-call-text');
      if (this.act === 'count-out-distract') {
        var k = this.round.call.kind, kindWord = (LANG === 'de' && COLOR_DE[k]) ? COLOR_DE[k].adj : k;
        t.innerHTML = api.t('callKind').replace('{n}', bign).replace('{kind}', kindWord);
      } else {
        t.innerHTML = api.t('callNumeral').replace('{n}', bign);
      }
      card.appendChild(t);
      return card;
    },

    /* ----- the count-out stage ----- */
    _renderCountOut: function (root) {
      root.appendChild(this._callCard());
      var main = this.api.el('div', 'rc-main');
      if (this._isProd()) main.appendChild(this._raftCol()); else main.appendChild(this._broodCol());
      root.appendChild(main);
      root.appendChild(this._countNav());
    },
    _raftCol: function () {
      var self = this, api = this.api, s = this.cstate, col = api.el('div', 'rc-bench');
      // ducks WITH Mama (sent) — a compact display strip + one "call back" button (no per-duck 44px box)
      var sent = api.el('div', 'rc-sent');
      var slab = api.el('div', 'rc-zonelab'); slab.textContent = api.t('sentLab'); sent.appendChild(slab);
      var srow = api.el('div', 'rc-sentstrip');
      s.sent.forEach(function (d) { var m = api.el('span', 'rc-sentmini'); m.innerHTML = duckSVG(d.kind); srow.appendChild(m); });
      if (!s.sent.length) { var e = api.el('span', 'rc-emptyz'); e.textContent = '🪺'; srow.appendChild(e); }
      sent.appendChild(srow);
      if (s.sent.length) { var rb = api.el('button', 'rc-recall'); rb.type = 'button'; rb.textContent = '↩'; rb.setAttribute('aria-label', LANG === 'de' ? 'eins zurückrufen' : 'call one back'); rb.addEventListener('click', function () { Core.recallDuck(s, s.sent[s.sent.length - 1].id); self.msg = null; self.api.sound && self.api.sound(360); self.render(); }); sent.appendChild(rb); }
      col.appendChild(sent);
      // the raft (remaining) — tap to send (no label; the ducks obviously are the raft)
      var raft = api.el('div', 'rc-raft');
      var remaining = s.raft.filter(function (d) { return !s.sent.some(function (x) { return x.id === d.id; }); });
      var rrow = api.el('div', 'rc-ducks rc-lay-' + (this.round.raft.arrangement || 'tidy'));
      remaining.forEach(function (d) { var b = api.el('button', 'rc-duck'); b.type = 'button'; b.innerHTML = duckSVG(d.kind); b.setAttribute('aria-label', LANG === 'de' ? ((COLOR_DE[d.kind] ? COLOR_DE[d.kind].sg + ' ' : '') + 'Entenküken — zum Schicken tippen') : (d.kind + ' duckling — tap to send')); b.addEventListener('click', function () { Core.sendDuck(s, d.id); self.msg = null; self.api.sound && self.api.sound(520); self.render(); }); rrow.appendChild(b); });
      raft.appendChild(rrow); col.appendChild(raft);
      return col;
    },
    _broodCol: function () {
      var self = this, api = this.api, s = this.cstate, col = api.el('div', 'rc-bench');
      var brood = s.brood;
      var shown = (this.act === 'running-total') ? brood.slice(0, this._revealedCount()) : brood;
      var row = api.el('div', 'rc-ducks rc-lay-tidy');
      shown.forEach(function (d) { var counted = !!s.counted[d.id]; var b = api.el('button', 'rc-duck' + (counted ? ' rc-counted' : '')); b.type = 'button'; b.innerHTML = duckSVG('duck'); b.setAttribute('aria-label', LANG === 'de' ? ('Entenküken' + (counted ? ', gezählt' : '')) : ('duckling' + (counted ? ', counted' : ''))); b.addEventListener('click', function () { if (!s.counted[d.id]) { Core.countDuck(s, d.id); self.api.sound && self.api.sound(540 + Core.countedSize(s) * 20); speak(Core.countedSize(s)); self.msg = null; self.render(); } }); if (counted) { var ck = api.el('span', 'rc-check'); ck.textContent = '✓'; b.appendChild(ck); } row.appendChild(b); });
      col.appendChild(row);
      if (this.act === 'running-total' && this.batchIdx < (this.round.arriving.length - 1)) {
        var more = api.el('button', 'rc-more'); more.type = 'button'; more.textContent = api.t('moreArrive'); more.addEventListener('click', function () { self.batchIdx++; self.api.sound && self.api.sound(480); self.render(); }); col.appendChild(more);
      }
      return col;
    },
    _revealedCount: function () { var a = this.round.arriving || [], n = 0; for (var i = 0; i <= this.batchIdx && i < a.length; i++) n += a[i]; return n; },
    _countNav: function () {
      var self = this, api = this.api, s = this.cstate, wrap = api.el('div', 'rc-nav');
      // forward acts gate the sign nav on all-counted + all-arrived; production acts are always free to sign
      var ready = true;
      if (!this._isProd()) { var allArrived = this.act !== 'running-total' || this.batchIdx >= (this.round.arriving.length - 1); ready = allArrived && Core.countedSize(s) >= s.brood.length && s.brood.length > 0; }
      var sign = api.el('button', 'rc-sign' + (ready ? '' : ' rc-off')); sign.type = 'button'; sign.textContent = api.t('signNav'); sign.disabled = !ready;
      if (ready) sign.addEventListener('click', function () { Core.goToSign(s); self.msg = null; self.api.sound && self.api.sound(640); self.render(); });
      wrap.appendChild(sign); return wrap;
    },

    /* ----- the sign stage: the mud glyph channel + ordered stroke taps ----- */
    _renderSign: function (root) {
      var self = this, api = this.api, s = this.cstate, n = this._n();
      var mud = api.el('div', 'rc-mud');
      var strokes = Core.glyphFor(n);
      // Catmull-Rom → cubic-Bezier spline that PASSES THROUGH every checkpoint,
      // so the guide is a smooth professional print numeral while the same points
      // remain the ordered trace checkpoints. (<3 pts → straight line.)
      var splinePath = function (pts) {
        if (!pts.length) return '';
        if (pts.length < 3) return 'M ' + pts.map(function (p) { return p.x + ' ' + p.y; }).join(' L ');
        var d = 'M ' + pts[0].x + ' ' + pts[0].y;
        for (var k = 0; k < pts.length - 1; k++) {
          var p0 = pts[k - 1] || pts[k], p1 = pts[k], p2 = pts[k + 1], p3 = pts[k + 2] || p2;
          var c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
          var c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
          d += ' C ' + c1x.toFixed(2) + ' ' + c1y.toFixed(2) + ' ' + c2x.toFixed(2) + ' ' + c2y.toFixed(2) + ' ' + p2.x + ' ' + p2.y;
        }
        return d;
      };
      // the glyph channel SVG (guide + formed strokes) + pointer capture
      var svgNS = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(svgNS, 'svg'); svg.setAttribute('class', 'rc-glyph'); svg.setAttribute('viewBox', '0 0 100 100'); svg.setAttribute('aria-hidden', 'true');
      strokes.forEach(function (st, i) {
        var p = document.createElementNS(svgNS, 'path'); p.setAttribute('d', splinePath(st)); p.setAttribute('fill', 'none'); p.setAttribute('stroke-linecap', 'round'); p.setAttribute('stroke-linejoin', 'round');
        var formed = i < s.strokesDone;
        p.setAttribute('stroke', formed ? C.T : 'rgba(20,107,94,.22)'); p.setAttribute('stroke-width', formed ? '10' : '8'); if (!formed) p.setAttribute('stroke-dasharray', '2 7');
        svg.appendChild(p);
        if (i === s.strokesDone) { var st0 = st[0]; var dot = document.createElementNS(svgNS, 'circle'); dot.setAttribute('cx', st0.x); dot.setAttribute('cy', st0.y); dot.setAttribute('r', '6'); dot.setAttribute('fill', C.CORAL); svg.appendChild(dot); }
      });
      // pointer trace capture
      svg.addEventListener('pointerdown', function (e) { self._traceDown(e, svg); });
      svg.addEventListener('pointermove', function (e) { self._traceMove(e, svg); });
      svg.addEventListener('pointerup', function (e) { self._traceUp(e, svg); });
      svg.addEventListener('pointercancel', function () { self._drag = null; });
      mud.appendChild(svg);
      root.appendChild(mud);

      // the ordered stroke-tap row (canonical commit + accessibility fallback)
      var taps = api.el('div', 'rc-strokes');
      if (strokes.length === 1) {
        var one = api.el('button', 'rc-stroke rc-stroke-next'); one.type = 'button'; one.textContent = api.t('traceIt').replace('{n}', n); one.addEventListener('click', function () { self._formStroke(0, null); });
        taps.appendChild(one);
      } else {
        strokes.forEach(function (st, i) { var done = i < s.strokesDone, next = i === s.strokesDone; var b = api.el('button', 'rc-stroke' + (done ? ' rc-stroke-done' : '') + (next ? ' rc-stroke-next' : '')); b.type = 'button'; b.textContent = api.t('strokeN').replace('{k}', i + 1); b.addEventListener('click', function () { self._formStroke(i, null); }); taps.appendChild(b); });
      }
      root.appendChild(taps);

      var nav = api.el('div', 'rc-nav');
      var back = api.el('button', 'rc-back'); back.type = 'button'; back.textContent = api.t('backRaft'); back.addEventListener('click', function () { Core.backToRaft(s); self.msg = null; self.render(); });
      nav.appendChild(back); root.appendChild(nav);
    },

    /* pointer-trace (progressive enhancement) */
    _glyphPt: function (e, svg) { var r = svg.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * 100, y: (e.clientY - r.top) / r.height * 100 }; },
    _traceDown: function (e, svg) { if (this.cstate.stage !== 'sign') return; if (e.cancelable) e.preventDefault(); try { svg.setPointerCapture(e.pointerId); } catch (_) {} this._drag = { pts: [this._glyphPt(e, svg)] }; },
    _traceMove: function (e, svg) { if (!this._drag) return; if (e.cancelable) e.preventDefault(); this._drag.pts.push(this._glyphPt(e, svg)); this._paintCur(svg); },
    _traceUp: function (e, svg) { if (!this._drag) return; var pts = this._drag.pts; this._drag = null; if (pts.length >= 2) this._formStroke(this.cstate.strokesDone, pts); },

    /* live-ink repaint DURING the drag (lightweight — append/replace one path,
       no full re-render which would destroy the svg + pointer capture). Without
       this the child drags and sees NOTHING happen ("nothing draws") — the
       missing feedback vs the working snippy letter-trace. */
    _paintCur: function (svg) {
      var old = svg.querySelector('.rc-curink'); if (old) old.parentNode.removeChild(old);
      var pts = this._drag && this._drag.pts;
      if (pts && pts.length > 1) {
        var d = pts.map(function (q, i) { return (i ? 'L' : 'M') + q.x.toFixed(1) + ',' + q.y.toFixed(1); }).join(' ');
        var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        p.setAttribute('class', 'rc-curink'); p.setAttribute('d', d); p.setAttribute('fill', 'none');
        p.setAttribute('stroke', C.CORAL); p.setAttribute('stroke-width', '8');
        p.setAttribute('stroke-linecap', 'round'); p.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(p);
      }
    },

    _formStroke: function (idx, path) {
      var s = this.cstate, res = Core.attemptStroke(s, idx, path);
      if (res === 'wrong-order') { this.api.sound && this.api.sound(330); this.msg = this.api.t('thisWay'); this.render(); return; }
      if (res === 'off-path') { this.api.sound && this.api.sound(360); this.render(); return; } // gentle, let them retry
      this.api.sound && this.api.sound(720);
      if (res === 'formed') { this._commit(); return; }
      this.msg = null; this.render();
    },
    _commit: function () {
      var api = this.api, r = Core.commit(this.cstate);
      if (r === 'sealed') {
        this.api.sound && this.api.sound(940);
        this.msg = (this._n() === 0) ? api.t('sealedZero') : api.t('sealed');
        speak(this._n() === 0 ? (LANG === 'de' ? 'null' : 'zero') : numWord(this._n()));
        this._win();
      } else {
        this.api.sound && this.api.sound(320); this.msg = api.t('redo');
        this.cstate = Core.newState(this.round); this.batchIdx = 0; this._drag = null; // fresh raft, non-directional
        this.render();
      }
    },
    _win: function () { this.solved = true; this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 9); this.render(); this.announce(this.msg); },

    _renderDone: function (root) {
      var api = this.api, n = (this._pool && this._pool.length) || 9, bank = api.el('div', 'rc-bank');
      for (var i = 0; i < n; i++) { var sp = api.el('span', 'rc-brood' + (i < this.solvedCount ? ' rc-brood-on' : '')); sp.textContent = '🦆'; bank.appendChild(sp); }
      root.appendChild(bank);
      var nudge = api.el('div', 'rc-nextnudge'); nudge.textContent = api.t('tapCheck'); root.appendChild(nudge);
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
      fetch('/mini-tools/mamas-roll-call-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[mamas-roll-call] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.rc-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.rc-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(4px,1.2vw,7px);background:linear-gradient(180deg,#FBF3E4,#EAF3F0);border-radius:20px;padding:clamp(6px,1.4vw,10px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.rc-head{display:flex;align-items:center;gap:7px;justify-content:center;width:100%;}'
        + '.rc-mama{width:clamp(30px,7vw,42px);flex:0 0 auto;}.rc-mama svg{width:100%;height:auto;display:block;}'
        + '.rc-say{font:700 clamp(11.5px,2.9vw,13.5px)/1.2 "Nunito",sans-serif;color:' + C.T + ';text-align:center;}.rc-head-win .rc-say{color:' + C.CORAL2 + ';}'
        /* call card */
        + '.rc-call{display:flex;flex-direction:column;align-items:center;gap:3px;background:#FFF3E9;border:2px solid rgba(242,120,75,.3);border-radius:14px;padding:4px clamp(10px,3vw,16px);width:100%;max-width:420px;}'
        + '.rc-call-text{font:800 clamp(13px,3.4vw,16px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';text-align:center;}'
        + '.rc-call-big{font-size:1.7em;vertical-align:-.12em;}'
        + '.rc-pads{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;max-width:300px;}.rc-pad{width:clamp(15px,3.6vw,18px);height:clamp(15px,3.6vw,18px);}.rc-pad svg{width:100%;height:100%;}'
        /* benches */
        + '.rc-main{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;}'
        + '.rc-bench{display:flex;flex-direction:column;align-items:center;gap:5px;width:100%;}'
        + '.rc-raft{display:flex;flex-direction:column;align-items:center;gap:2px;width:100%;}'
        + '.rc-zonelab{font:700 clamp(10px,2.5vw,12px)/1 "Nunito",sans-serif;color:' + C.T + ';text-transform:uppercase;letter-spacing:.04em;opacity:.8;}'
        + '.rc-sent{display:flex;align-items:center;gap:6px;justify-content:center;flex-wrap:wrap;background:#EAF3F0;border:2px solid rgba(20,107,94,.16);border-radius:13px;padding:3px 8px;width:100%;max-width:330px;}'
        + '.rc-sentstrip{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;align-items:center;min-height:30px;}.rc-sentmini{width:28px;height:28px;display:inline-flex;}.rc-sentmini svg{width:28px;height:28px;display:block;}'
        + '.rc-recall{min-width:44px;min-height:44px;border-radius:10px;border:0;background:#fff;color:' + C.T + ';font:800 16px/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(20,107,94,.2);touch-action:manipulation;}.rc-recall:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '.rc-ducks{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:clamp(3px,1.3vw,7px);width:100%;max-width:330px;min-height:46px;}'
        + '.rc-lay-tidy{max-width:300px;}.rc-lay-scatter{gap:clamp(6px,2.4vw,12px);}'
        + '.rc-duck{position:relative;min-width:46px;min-height:46px;width:46px;height:46px;padding:0;border:0;background:transparent;cursor:pointer;border-radius:50%;touch-action:manipulation;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;}'
        + '.rc-duck svg{width:clamp(30px,7.2vw,38px);height:clamp(30px,7.2vw,38px);display:block;}'
        + '.rc-sentduck svg{opacity:.95;}.rc-counted svg{opacity:.5;}.rc-check{position:absolute;top:-2px;right:-2px;width:18px;height:18px;border-radius:50%;background:' + C.T + ';color:#fff;font:800 12px/18px "Baloo 2",sans-serif;text-align:center;}'
        + '.rc-emptyz{font-size:24px;opacity:.5;}'
        + '.rc-duck:focus-visible,.rc-sign:focus-visible,.rc-stroke:focus-visible,.rc-more:focus-visible,.rc-back:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* nav */
        + '.rc-nav{display:flex;gap:8px;justify-content:center;}'
        + '.rc-sign{min-height:50px;padding:0 clamp(16px,4.5vw,24px);border-radius:15px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(14px,3.6vw,17px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 4px 0 ' + C.CORAL2 + ';touch-action:manipulation;}.rc-sign:active{transform:translateY(3px);box-shadow:0 1px 0 ' + C.CORAL2 + ';}.rc-sign.rc-off{opacity:.45;box-shadow:0 4px 0 rgba(20,107,94,.25);background:#bbb;}'
        + '.rc-more{min-height:46px;padding:0 16px;border-radius:13px;border:0;background:' + C.T + ';color:#fff;font:800 clamp(12px,3.2vw,15px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.T2 + ';touch-action:manipulation;}'
        + '.rc-back{min-height:46px;padding:0 16px;border-radius:13px;border:0;background:#fff;color:' + C.T + ';font:800 clamp(12px,3.2vw,15px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 rgba(20,107,94,.2);touch-action:manipulation;}'
        /* sign stage: the mud glyph channel */
        + '.rc-mud{background:#E9DcC4;border:2px solid #C9B68E;border-radius:16px;padding:4px;box-shadow:inset 0 2px 8px rgba(120,90,40,.18);}'
        + '.rc-glyph{width:clamp(112px,30vw,136px);height:clamp(112px,30vw,136px);display:block;touch-action:none;cursor:crosshair;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;}'
        + '.rc-strokes{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;}'
        + '.rc-stroke{min-height:48px;padding:0 clamp(14px,4vw,22px);border-radius:14px;border:2px solid rgba(20,107,94,.25);background:#fff;color:' + C.T + ';font:800 clamp(13px,3.4vw,16px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;}.rc-stroke-next{background:' + C.T + ';color:#fff;border-color:' + C.T + ';box-shadow:0 3px 0 ' + C.T2 + ';}.rc-stroke-done{opacity:.5;}'
        /* done */
        + '.rc-bank{display:flex;gap:2px;flex-wrap:wrap;justify-content:center;}.rc-brood{font-size:clamp(15px,3.6vw,19px);filter:grayscale(1) opacity(.4);}.rc-brood-on{filter:none;}'
        + '.rc-nextnudge{font:800 clamp(13px,3.4vw,16px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';background:#FFF3E9;border-radius:11px;padding:5px 12px;}'
        /* desktop two-column for the count-out stage */
        + '@media (min-width:720px){.rc-main{flex-direction:row;align-items:flex-start;justify-content:center;gap:18px;}.rc-bench{width:auto;flex:0 1 auto;}}'
        /* short-height compaction */
        + '@media (max-height:720px){.rc-mama{width:28px;}.rc-glyph{width:clamp(104px,28vw,140px);height:clamp(104px,28vw,140px);}}'
        + '@media (max-height:640px){.rc-root{gap:3px;padding:5px;}.rc-duck{min-width:44px;min-height:42px;width:42px;height:42px;}.rc-duck svg{width:28px;height:28px;}.rc-ducks{min-height:42px;}.rc-sent{padding:2px 6px;}.rc-sentmini{width:24px;height:24px;}.rc-sentmini svg{width:24px;height:24px;}.rc-call{padding:3px 10px;gap:2px;}.rc-call-n{font-size:22px;}.rc-call-text{font-size:13px;}.rc-glyph{width:92px;height:92px;}.rc-sign{min-height:46px;}.rc-mud{padding:4px;}}'
        + '@media (max-width:340px){.rc-root{padding:4px;gap:4px;}.rc-main{gap:4px;}.rc-bench{gap:4px;}.rc-ducks{gap:3px;}.rc-pad{width:14px;height:14px;}.rc-call{padding:2px 9px;gap:1px;}.rc-sent{padding:1px 6px;}.rc-sentmini{width:22px;height:22px;}.rc-sentmini svg{width:24px;height:24px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-mamas-roll-call', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'mamas-roll-call.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function () { return 'signHint'; }
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
