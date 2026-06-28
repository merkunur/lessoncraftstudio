/* =====================================================================
   PIPPA'S POND-JUICE LAB — ACTIVITY  (pond-juice-activity.js)
   ---------------------------------------------------------------------
   CCSS 3.MD.A.2 (Grade 3, Measurement & Data): measure + ESTIMATE liquid volume
   — read a level off a graduated scale. Pippa the frog runs a pond-juice stand;
   a customer orders an ESTIMATE ("about six cups!"); the child pours into a
   FROSTED beaker (the level is HIDDEN — nothing to chase), releases → the beaker
   turns CLEAR, revealing where the juice landed against the numbered scale; the
   child READS the level + reports it on a number-strip.

   THE ANTI-CHEATS: the level is invisible during the pour (no line to chase);
   the answer is the REVEALED level, NEVER the order ("about six" ≠ the actual 5
   → matching "6" is wrong); the READING is judged, never the pour precision;
   compare/diff-scale make the NUMBER (not the visual height) decide. The read
   logic + the SOLVER gauntlet live in mini tools/pour-measure-core.js (pure).
   answerType:'state'. Pippa + beaker = pure-geometry SVG (no image-library →
   no 404). No timer/score/streak; the READING is the only assessed act.
   0 lines to the protected cores + lcs-shell.*.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.PourMeasureCore;
  var C = { T: '#146B5E', T2: '#0e4f45', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', GOLD: '#E8A53A', INK: '#2A2A35' };
  var WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
  function enWord(n) { return WORDS[n | 0] || String(n); }
  var JUICE = ['#8FD3A8', '#F4A6C0', '#9FC8F0', '#F6C97A', '#C7A8E8', '#7FCFC2'];

  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: String(text), lang: 'en', rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(String(text)); u.rate = .95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function pippaSVG(mood) {
    var happy = mood === 'happy';
    return '<svg viewBox="0 0 100 100" role="img" aria-label="Pippa the frog">'
      + '<ellipse cx="50" cy="58" rx="32" ry="28" fill="#7FB069"/>'
      + '<circle cx="34" cy="32" r="12" fill="#7FB069"/><circle cx="66" cy="32" r="12" fill="#7FB069"/>'
      + '<circle cx="34" cy="30" r="6" fill="#fff"/><circle cx="66" cy="30" r="6" fill="#fff"/>'
      + '<circle cx="35" cy="31" r="3" fill="#2A2A35"/><circle cx="67" cy="31" r="3" fill="#2A2A35"/>'
      + (happy ? '<path d="M36 62 q14 12 28 0" stroke="#3A6B3A" stroke-width="3.5" fill="none" stroke-linecap="round"/>' : '<path d="M38 62 q12 7 24 0" stroke="#3A6B3A" stroke-width="3" fill="none" stroke-linecap="round"/>')
      + '<circle cx="40" cy="60" r="4" fill="#F4A6C0" opacity=".6"/><circle cx="60" cy="60" r="4" fill="#F4A6C0" opacity=".6"/>'
      + '</svg>';
  }
  function custEmoji(c) { return ({ dragonfly: '🪰', frog: '🐸', snail: '🐌', newt: '🦎', beetle: '🪲', turtle: '🐢', fish: '🐟', duck: '🦆', bee: '🐝' })[c] || '🐛'; }

  /* a frosted measuring-beaker: a numbered scale (always visible) + a juice fill
     at `level`, covered by a frosted overlay until `revealed`. */
  function beakerSVG(scale, level, revealed, juice, tall) {
    var W = 90, H = 150, bx = 16, bw = 40, top = 16, bot = 135, span = bot - top;
    if (tall) { /* tall-thin variant for diff-scale */ bx = 22; bw = 28; }
    var max = scale.max, step = scale.step || 1;
    var levY = function (v) { return bot - (v - scale.min) / (max - scale.min) * span; };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="pj-beaker-svg" aria-hidden="true">';
    s += '<clipPath id="pjc"><rect x="' + bx + '" y="' + top + '" width="' + bw + '" height="' + span + '" rx="5"/></clipPath>';
    // fill (juice) up to the level — clipped to the body
    var fy = levY(level);
    s += '<g clip-path="url(#pjc)"><rect x="' + bx + '" y="' + fy + '" width="' + bw + '" height="' + (bot - fy) + '" fill="' + juice + '"/>';
    s += '<ellipse cx="' + (bx + bw / 2) + '" cy="' + fy + '" rx="' + (bw / 2) + '" ry="3" fill="#fff" opacity=".35"/></g>';
    // frosted overlay (covers the fill until revealed)
    s += '<rect x="' + bx + '" y="' + top + '" width="' + bw + '" height="' + span + '" rx="5" fill="#EAF0F2" opacity="' + (revealed ? 0 : 0.96) + '" class="pj-frost"/>';
    // glass frame
    s += '<rect x="' + bx + '" y="' + top + '" width="' + bw + '" height="' + span + '" rx="5" fill="none" stroke="' + C.T + '" stroke-width="2.5"/>';
    // scale ticks + numbers (always visible, on the right)
    for (var i = scale.min; i <= max; i++) {
      var y = levY(i), major = (i % step === 0), tx = bx + bw;
      s += '<line x1="' + tx + '" y1="' + y + '" x2="' + (tx + (major ? 9 : 5)) + '" y2="' + y + '" stroke="' + C.T + '" stroke-width="' + (major ? 2 : 1.2) + '"/>';
      if (major) s += '<text x="' + (tx + 12) + '" y="' + (y + 4) + '" font-family="Baloo 2,sans-serif" font-weight="800" font-size="11" fill="' + C.T + '">' + i + '</text>';
    }
    // the juice-top line on reveal
    if (revealed) s += '<line x1="' + bx + '" y1="' + fy + '" x2="' + (bx + bw) + '" y2="' + fy + '" stroke="' + C.CORAL2 + '" stroke-width="1.6" stroke-dasharray="3 2"/>';
    s += '</svg>';
    return s;
  }

  global.PondJuiceActivity = {
    id: 'pond-juice-activity',
    reward: { id: 'served-tray', label: "Pippa's Served Glasses", emoji: '🥤' },

    strings: {
      title: { en: "Pippa's Pond-Juice Lab" },
      instruction: { en: 'Pour the juice, then read how much you made off the scale.' },
      prompt: { en: 'Pour and read!' },
      orderEst: { en: 'A {cust} wants about {w} cups!' },
      orderRead: { en: 'Pippa poured some juice — how much?' },
      orderCompare: { en: 'Which cup has MORE?' },
      pour: { en: 'Pour 🫗' },
      look: { en: 'Look! 👀' },
      readHint: { en: 'Read the scale — tap how much!' },
      pickThis: { en: 'This one!' },
      wrong: { en: "Hmm — what does it say where the juice reaches?" },
      win: { en: '{w} cups — just right! 🥤' },
      winCompare: { en: 'That one has more — nice reading! 🥤' },
      tapCheck: { en: 'Tap Check! ✓' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.cstate = null; this.solved = false; this.solvedCount = 0; this.msg = null; this._mood = 'idle'; this._spoke = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.cstate = Core.newState(round); this.solved = false; this.msg = null; this._mood = 'idle'; this._spoke = false;
      this._juice = JUICE[(this._juiceIdx = (this._juiceIdx || 0) + 1) % JUICE.length];
    },
    announce: function (s) { if (this.api.announce) this.api.announce(s); },
    _isTwoCup: function () { return this.round.cog === 'compare' || this.round.cog === 'diff-scale'; },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'pj-wrap'); var root = api.el('div', 'pj-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }

      var head = api.el('div', 'pj-head' + (this.solved ? ' pj-head-win' : ''));
      var pippa = api.el('span', 'pj-pippa'); pippa.innerHTML = pippaSVG(this.solved ? 'happy' : this._mood);
      var say = api.el('span', 'pj-say'); say.textContent = this.msg || this._question();
      head.appendChild(pippa); head.appendChild(say); root.appendChild(head);

      if (this.solved) { this._renderDone(root); wrap.appendChild(root); stage.appendChild(wrap); return; }

      if (this._isTwoCup()) root.appendChild(this._twoCups());
      else root.appendChild(this._oneCup());

      wrap.appendChild(root); stage.appendChild(wrap);
      // speak the order once
      if (!this._spoke) { this._spoke = true; var self = this; setTimeout(function () { if (self.round.cog === 'estimate-pour') speak('about ' + enWord(self.round.order) + ' cups'); else if (self.round.cog === 'read-level') speak('how much juice?'); else speak('which has more?'); }, 250); }
    },
    _question: function () {
      var api = this.api, r = this.round;
      if (r.cog === 'estimate-pour') return api.t('orderEst').replace('{cust}', r.customer).replace('{w}', enWord(r.order));
      if (r.cog === 'read-level') return api.t('orderRead');
      return api.t('orderCompare');
    },

    /* ----- one beaker: frosted (pour/look) → revealed (read the number-strip) ----- */
    _oneCup: function () {
      var self = this, api = this.api, box = api.el('div', 'pj-onebox');
      var cup = api.el('div', 'pj-cup'); cup.innerHTML = '<span class="pj-cust">' + custEmoji(this.round.customer) + '</span>' + beakerSVG(this.round.scale, this.round.actualLevel, this.cstate.revealed, this._juice, false);
      box.appendChild(cup);
      if (!this.cstate.revealed) {
        var btn = api.el('button', 'pj-pour'); btn.type = 'button'; btn.textContent = api.t(this.round.cog === 'estimate-pour' ? 'pour' : 'look');
        btn.addEventListener('click', function () { self._reveal(); });
        box.appendChild(btn);
      } else {
        var hint = api.el('div', 'pj-readhint'); hint.textContent = api.t('readHint'); box.appendChild(hint);
        box.appendChild(this._strip());
      }
      return box;
    },
    _reveal: function () {
      if (this.round.cog === 'estimate-pour') { Core.pour(this.cstate); Core.release(this.cstate); } else Core.reveal(this.cstate);
      this._mood = 'idle'; this.msg = null; this.api.sound && this.api.sound(620); this.render();
    },
    /* the report number-strip — the answer surface (read the level, tap it). */
    _strip: function () {
      var self = this, api = this.api, strip = api.el('div', 'pj-strip');
      for (var v = this.round.scale.min; v <= this.round.scale.max; v++) {
        (function (val) {
          var b = api.el('button', 'pj-num'); b.type = 'button'; b.textContent = val;
          b.setAttribute('aria-label', val + ' cups');
          b.addEventListener('click', function () { self._report(val); });
          strip.appendChild(b);
        })(v);
      }
      return strip;
    },
    _report: function (value) {
      if (this.solved) return;
      var r = Core.report(this.cstate, value);
      if (r.correct) { this._win(enWord(value) + ' cups — just right'); this.msg = this.api.t('win').replace('{w}', enWord(value)); this.render(); this.announce(this.msg); }
      else { this._mood = 'idle'; this.msg = this.api.t('wrong'); this.api.sound && this.api.sound(330); speak('what does it say?'); this.render(); }
    },

    /* ----- two cups (compare / diff-scale): read both scales, pick the more ----- */
    _twoCups: function () {
      var self = this, api = this.api, box = api.el('div', 'pj-twobox');
      this.round.cups.forEach(function (cup, i) {
        var col = api.el('div', 'pj-twocol');
        var cmax = (cup.scaleMax != null) ? cup.scaleMax : self.round.scale.max;
        var cscale = { min: 0, max: cmax, step: (cmax > 10 ? 5 : 1) };
        var bk = api.el('div', 'pj-cup'); bk.innerHTML = beakerSVG(cscale, cup.level, true, JUICE[(i + 2) % JUICE.length], false); col.appendChild(bk);
        var pick = api.el('button', 'pj-pick'); pick.type = 'button'; pick.textContent = api.t('pickThis');
        pick.setAttribute('aria-label', 'this cup has more');
        pick.addEventListener('click', function () { self._pick(i); });
        col.appendChild(pick); box.appendChild(col);
      });
      return box;
    },
    _pick: function (i) {
      if (this.solved) return;
      var r = Core.pick(this.cstate, i);
      if (r.correct) { this._win('that one has more'); this.msg = this.api.t('winCompare'); this.render(); this.announce(this.msg); }
      else { this._mood = 'idle'; this.msg = this.api.t('wrong'); this.api.sound && this.api.sound(330); speak('read both scales'); this.render(); }
    },

    _win: function (spokenText) {
      this.solved = true;
      if (Core.firstAttemptCorrect(this.round, this.cstate)) this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 9);
      this._mood = 'happy'; this.api.sound && this.api.sound(900); speak(spokenText);
    },

    _renderDone: function (root) {
      var api = this.api, n = (this._pool && this._pool.length) || 9;
      var tray = api.el('div', 'pj-tray');
      for (var i = 0; i < n; i++) { var g = api.el('span', 'pj-glass' + (i < this.solvedCount ? ' pj-glass-on' : '')); g.textContent = '🥤'; tray.appendChild(g); }
      root.appendChild(tray);
      var nudge = api.el('div', 'pj-nextnudge'); nudge.textContent = api.t('tapCheck'); root.appendChild(nudge);
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
      fetch('/mini-tools/pond-juice-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[pond-juice] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.pj-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.pj-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#EAF5EE,#FBF3E4);border-radius:20px;padding:clamp(7px,1.7vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.pj-head{display:flex;align-items:center;gap:7px;justify-content:center;width:100%;}'
        + '.pj-pippa{width:clamp(32px,7.5vw,46px);flex:0 0 auto;}.pj-pippa svg{width:100%;height:auto;display:block;}'
        + '.pj-say{font:700 clamp(11.5px,2.9vw,13.5px)/1.2 "Nunito",sans-serif;color:' + C.T + ';text-align:center;}.pj-head-win .pj-say{color:' + C.CORAL2 + ';}'
        /* one cup */
        + '.pj-onebox{display:flex;flex-direction:column;align-items:center;gap:clamp(4px,1.2vw,8px);width:100%;}'
        + '.pj-cup{position:relative;display:flex;justify-content:center;}.pj-beaker-svg{height:clamp(110px,26vh,180px);width:auto;display:block;}'
        + '.pj-cust{position:absolute;top:-2px;left:-2px;font-size:clamp(18px,4.6vw,24px);}'
        + '.pj-pour{min-height:54px;min-width:clamp(120px,40vw,200px);border-radius:15px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 4px 0 ' + C.CORAL2 + ';touch-action:manipulation;}.pj-pour:active{transform:translateY(3px);box-shadow:0 1px 0 ' + C.CORAL2 + ';}'
        + '.pj-readhint{font:700 clamp(11px,2.7vw,13px)/1 "Nunito",sans-serif;color:#9a8f78;}'
        /* number-strip */
        + '.pj-strip{display:flex;flex-wrap:wrap;gap:clamp(4px,1.2vw,7px);justify-content:center;max-width:100%;}'
        + '.pj-num{min-width:44px;min-height:44px;border-radius:12px;border:2px solid rgba(20,107,94,.22);background:#fff;color:' + C.T + ';font:800 clamp(16px,4vw,20px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;box-shadow:0 2px 0 rgba(20,107,94,.1);}.pj-num:active{transform:translateY(1px);}'
        /* two cups */
        + '.pj-twobox{display:flex;gap:clamp(8px,3vw,22px);justify-content:center;align-items:flex-end;width:100%;}'
        + '.pj-twocol{display:flex;flex-direction:column;align-items:center;gap:5px;}.pj-twobox .pj-beaker-svg{height:clamp(96px,22vh,156px);}'
        + '.pj-pick{min-height:46px;min-width:clamp(80px,24vw,120px);border-radius:13px;border:0;background:' + C.T + ';color:#fff;font:800 clamp(13px,3.4vw,16px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.T2 + ';touch-action:manipulation;}.pj-pick:active{transform:translateY(2px);}'
        + '.pj-pour:focus-visible,.pj-num:focus-visible,.pj-pick:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* done */
        + '.pj-tray{display:flex;gap:2px;flex-wrap:wrap;justify-content:center;background:#fff;border:2px solid rgba(20,107,94,.16);border-radius:14px;padding:6px 10px;}.pj-glass{font-size:clamp(15px,3.6vw,20px);filter:grayscale(1) opacity(.4);}.pj-glass-on{filter:none;}'
        + '.pj-nextnudge{font:800 clamp(13px,3.4vw,16px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';background:#FFF3E9;border-radius:11px;padding:5px 12px;}'
        /* short-height compaction */
        + '@media (max-height:940px){.pj-root{gap:4px;}.pj-onebox{gap:5px;}.pj-beaker-svg{height:clamp(100px,18vh,130px);}.pj-twobox .pj-beaker-svg{height:clamp(94px,18vh,140px);}}'
        + '@media (max-height:720px){.pj-pippa{width:32px;}.pj-beaker-svg{height:clamp(100px,18vh,126px);}}'
        + '@media (max-height:640px){.pj-root{gap:2px;padding:6px;}.pj-pippa{width:26px;}.pj-head{gap:4px;}.pj-say{font-size:10.5px;}.pj-beaker-svg{height:clamp(92px,16vh,110px);}.pj-twobox .pj-beaker-svg{height:clamp(88px,15vh,112px);}.pj-onebox{gap:2px;}.pj-readhint{display:none;}.pj-pour{min-height:46px;}.pj-strip{gap:3px;}.pj-num{min-height:40px;min-width:40px;font-size:15px;}.pj-pick{min-height:44px;}.pj-twobox{gap:8px;}}'
        + '@media (max-width:340px){.pj-root{padding:6px;}.pj-strip{gap:3px;}}'
        + '@media (prefers-reduced-motion:reduce){}';
      var tag = document.createElement('style'); tag.setAttribute('data-pond-juice', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'pond-juice.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function () { return 'instruction'; }
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
