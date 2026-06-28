/* =====================================================================
   PIP'S MARKET STALL — ACTIVITY  (coin-stall-activity.js)
   ---------------------------------------------------------------------
   CCSS 2.MD.C.8 — pay at Pip the otter's seaside stall. Read the word
   problem → recognize each coin (by SIZE + tint, the value is INVISIBLE on
   the coin) → RETRIEVE its learned value → compose mixed denominations. 7
   cogs across 2 primitives: COMPOSE (tap purse coins → tray → "Pay", no live
   total, adjust-don't-wipe on over) + CHOOSE (count-set / enough, single tap).
   Coins render at TRUE relative diameters (the dime is the SMALLEST coin but
   worth more than the bigger nickel). All grading from coin-stall-core.js. 0
   lines to any protected core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.CoinStallCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: 'en', rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function fmt(c) { if (c == null) return ''; if (c % 100 === 0) return '$' + (c / 100); if (c < 100) return c + '¢'; return '$' + (c / 100).toFixed(2); }

  global.CoinStallActivity = {
    id: 'coin-stall-activity',

    strings: {
      title: { en: "Pip's Market Stall" },
      instruction: { en: '' },
      prompt: { en: 'Pay Pip.' },
      pay: { en: 'Pay Pip 🐚' },
      sayWelcome: { en: 'Welcome to the stall! What can I get you?' },
      sayWin: { en: 'Exact change — thank you! 🐚' },
      sayUnder: { en: 'Not quite enough yet.' },
      sayOver: { en: 'Take one back!' },
      sayFewer: { en: 'That works — but use FEWER coins?' },
      sayAgain: { en: "Hmm — let's try again." },
      tapToRemove: { en: 'tap a coin in the tray to take it back' },
      hintCheck: { en: 'Pick coins by what they are WORTH, then pay.' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.snap = null; this.solved = false;
      this.tray = []; this._purse = []; this.choice = null; this.msg = null; this.servedCount = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.snap = Core.snapshot(round);
      this.solved = false; this.choice = null; this.msg = null; this._spoke = false;
      this.tray = [];
      this._purse = round.purse ? shuffle(round.purse.slice()) : [];
    },

    /* ---------- helpers ---------- */
    _coin: function (den, opts) {
      opts = opts || {};
      var api = this.api, cs = this.snap.coinSet, info = null;
      for (var i = 0; i < cs.length; i++) { if (cs[i].den === den) { info = cs[i]; break; } }
      if (!info) info = { den: den, glyph: '?', tint: '#ccc', diameter: 20 };
      /* the size order is TRUE (dime < penny < nickel < quarter) but the spread is
         EXAGGERATED so the value≠size confront (the small dime worth more than the
         bigger nickel) is unmistakable; the ≥44px button keeps the hit area. */
      var px = Math.min(44, Math.round(28 + (info.diameter - 18) * 3.3));
      var btn = api.el('button', 'cs-coin' + (opts.cls || ''));
      btn.type = 'button'; btn.setAttribute('data-den', den);
      var val = Core.valueOf(this.round.coinSet, den);   /* the REAL value — for a11y ONLY, never on the face */
      btn.setAttribute('aria-label', den + ', ' + val + (val === 1 ? ' cent' : ' cents'));
      var disc = api.el('span', 'cs-disc');
      disc.style.width = px + 'px'; disc.style.height = px + 'px';
      disc.style.background = 'radial-gradient(circle at 38% 32%, #fff5, ' + info.tint + ')';
      disc.style.borderColor = info.tint;
      var g = api.el('span', 'cs-glyph'); g.textContent = info.glyph; disc.appendChild(g);
      btn.appendChild(disc);
      if (opts.onTap) btn.addEventListener('pointerdown', function (e) {
        if (e.button != null && e.button !== 0 && e.pointerType === 'mouse') return; e.preventDefault(); opts.onTap();
      });
      return btn;
    },
    _goalChip: function () {
      var r = this.round;
      if (r.cog === 'make-amount' || r.cog === 'fewest') return 'Pay ' + fmt(r.target);
      if (r.cog === 'change') return 'Change from ' + fmt(r.paid);
      if (r.cog === 'two-ways') return 'Make ' + fmt(r.target);
      if (r.cog === 'trade') return 'Trade for 1 ' + r.offer.den;
      return '';
    },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var root = api.el('div', 'cs-root'); root.setAttribute('data-solved', this.solved ? '1' : '0'); this._rootEl = root;
      if (!this.round) { stage.appendChild(root); return; }
      var self = this, r = this.round, isCompose = this.snap.isCompose;

      var say = api.el('div', 'cs-saytop');
      say.innerHTML = '<span class="cs-pip' + (this.solved ? ' cs-bounce' : '') + '">🦦</span><span class="cs-saytext">' + esc(this.msg || api.t('sayWelcome')) + '</span>';
      root.appendChild(say);

      this._renderBasket(root);

      /* scenario (the word problem) + goal chip */
      var head = api.el('div', 'cs-head');
      var sc = api.el('p', 'cs-scenario'); sc.textContent = r.scenario; head.appendChild(sc);
      if (isCompose && !this.solved) { var chip = api.el('span', 'cs-goal'); chip.textContent = this._goalChip(); head.appendChild(chip); }
      root.appendChild(head);

      if (this.solved) { this._renderDone(root); stage.appendChild(root); return; }

      if (this.snap.legendTier && this.snap.legendTier !== 'none') this._renderLegend(root);

      if (isCompose) this._renderCompose(root);
      else this._renderChoose(root);

      stage.appendChild(root);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(r.scenario); }, 260); }
    },

    _renderBasket: function (root) {
      var api = this.api, total = (this._pool && this._pool.length) || 14;
      var b = api.el('div', 'cs-basket'); b.setAttribute('aria-hidden', 'true');
      var fill = Math.min(1, this.servedCount / total);
      b.style.background = 'linear-gradient(90deg, #BfE0C8 ' + Math.round(fill * 100) + '%, #E7EEE9 ' + Math.round(fill * 100) + '%)';
      var k = api.el('span', 'cs-kelp'); k.textContent = fill >= 1 ? '🧺✨' : '🧺'; b.appendChild(k);
      root.appendChild(b);
    },

    _renderLegend: function (root) {
      var api = this.api, cs = this.round.coinSet, tier = this.snap.legendTier;   /* the legend is the off-coin value SOURCE → real values */
      var leg = api.el('div', 'cs-legend'); leg.setAttribute('aria-hidden', 'true');
      if (tier === 'full') {
        cs.forEach(function (c) {
          if (c.den === 'dollar') return;
          var item = api.el('span', 'cs-legitem');
          item.innerHTML = '<span class="cs-legdisc" style="background:' + c.tint + '">' + esc(c.glyph) + '</span>=' + esc(fmt(c.value));
          leg.appendChild(item);
        });
      } else if (tier === 'value') {
        var label = api.el('span', 'cs-legvals'); label.textContent = 'coin values: 1¢ · 5¢ · 10¢ · 25¢'; leg.appendChild(label);
      }
      root.appendChild(leg);
    },

    /* ----- COMPOSE: tray (no live total) + purse + Pay ----- */
    _renderCompose: function (root) {
      var api = this.api, self = this;
      var tray = api.el('div', 'cs-tray'); tray.setAttribute('role', 'group'); tray.setAttribute('aria-label', api.t('tapToRemove'));
      if (!this.tray.length) { var ph = api.el('span', 'cs-trayph'); ph.textContent = '🪙 tap coins below to pay'; tray.appendChild(ph); }
      this.tray.forEach(function (den, idx) {
        tray.appendChild(self._coin(den, { cls: ' cs-in', onTap: function () { self._take(idx); } }));
      });
      root.appendChild(tray);

      var purse = api.el('div', 'cs-purse'); purse.setAttribute('role', 'group'); purse.setAttribute('aria-label', 'your coin purse');
      this._purse.forEach(function (den, idx) {
        purse.appendChild(self._coin(den, { onTap: function () { self._place(idx); } }));
      });
      root.appendChild(purse);

      var pay = api.el('button', 'cs-pay'); pay.type = 'button'; pay.textContent = api.t('pay');
      pay.disabled = (this.tray.length === 0);
      pay.addEventListener('click', function () { self._pay(); });
      root.appendChild(pay);
    },

    /* ----- CHOOSE: a shown pile + option buttons ----- */
    _renderChoose: function (root) {
      var api = this.api, self = this, r = this.round;
      var pileWrap = api.el('div', 'cs-pile'); pileWrap.setAttribute('aria-label', 'a pile of coins');
      (r.pile || []).forEach(function (p) {
        for (var i = 0; i < p.count; i++) pileWrap.appendChild(self._coin(p.den, {}));
      });
      root.appendChild(pileWrap);

      var opts = api.el('div', 'cs-options');
      if (r.cog === 'count-set') {
        (r.options || []).forEach(function (v) {
          var b = api.el('button', 'cs-opt'); b.type = 'button'; b.textContent = fmt(v);
          b.addEventListener('click', function () { self._choose(v); });
          opts.appendChild(b);
        });
      } else {   /* enough */
        [['short', 'Not enough'], ['enough', 'Just enough'], ['over', 'Too much']].forEach(function (o) {
          var b = api.el('button', 'cs-opt cs-optword'); b.type = 'button'; b.textContent = o[1];
          b.addEventListener('click', function () { self._choose(o[0]); });
          opts.appendChild(b);
        });
      }
      root.appendChild(opts);
    },

    _renderDone: function (root) {
      var api = this.api;
      var d = api.el('div', 'cs-done');
      d.innerHTML = '<span class="cs-cha">🐚</span><span class="cs-donetext">' + esc(api.t('sayWin')) + '</span>';
      root.appendChild(d);
    },

    /* ---------- interaction ---------- */
    _place: function (idx) {
      var den = this._purse[idx]; if (den == null) return;
      this._purse.splice(idx, 1); this.tray.push(den);
      this.api.sound && this.api.sound(660); this.msg = null; this.render();
    },
    _take: function (idx) {
      var den = this.tray[idx]; if (den == null) return;
      this.tray.splice(idx, 1); this._purse.push(den);
      this.api.sound && this.api.sound(420); this.msg = null; this.render();
    },

    _pay: function () {
      var api = this.api, r = this.round;
      if (Core.gradeCompose(r, this.tray)) { this._correct(); return; }
      var st = Core.state(r, this.tray);
      if (st === 'over') {
        /* ADJUST-DON'T-WIPE — the child takes a coin back; the tray is NOT wiped,
           the system never says which coin / how much over. */
        this.msg = api.t('sayOver');
        api.sound && api.sound(400); this.render();
        api.announce && api.announce(api.t('sayOver'));
        return;
      }
      if (st === 'exact' && r.cog === 'fewest') {
        /* exact value but not the fewest coins — keep the work, nudge. */
        this.msg = api.t('sayFewer');
        api.sound && api.sound(440); this.render();
        api.announce && api.announce(api.t('sayFewer'));
        return;
      }
      if (st === 'exact' && r.cog === 'two-ways') {
        /* exact but the same way they were shown — keep, nudge for a NEW way. */
        this.msg = api.t('sayAgain');
        api.sound && api.sound(440); this.render();
        return;
      }
      if (st === 'exact' && r.cog === 'trade') {
        /* exact value but used the very coin they should trade away — nudge. */
        this.msg = api.t('sayAgain');
        api.sound && api.sound(440); this.render();
        return;
      }
      /* UNDER — Pip waits; nothing wiped. */
      this.msg = api.t('sayUnder');
      api.sound && api.sound(360); this.render();
      api.announce && api.announce(api.t('sayUnder'));
    },

    _choose: function (choice) {
      var api = this.api;
      if (Core.gradeChoose(this.round, choice)) { this._correct(); return; }
      /* WRONG choice → no red; reshuffle (anti-brute-force) + try again. */
      this.choice = null; this.msg = api.t('sayAgain');
      this._purse = this.round.purse ? shuffle(this.round.purse.slice()) : [];
      api.sound && api.sound(360); this.render();
      api.announce && api.announce(api.t('sayAgain'));
    },

    _correct: function () {
      var api = this.api;
      this.solved = true;
      this.servedCount = Math.min(this.servedCount + 1, (this._pool && this._pool.length) || 14);
      this.msg = api.t('sayWin');
      api.sound && api.sound(880);
      this.render();
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
      fetch('/mini-tools/coin-stall-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) {
          var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return;
          self._activityRow = row;
          var cs = row.params.coinSet;
          self._pool = makeTasks(row.params.rounds.map(function (r) { var c = JSON.parse(JSON.stringify(r)); c.coinSet = cs; return c; }));
          self._order = null;
          if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
        })
        .catch(function (e) { if (global.console && console.warn) console.warn('[coin-stall] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.cs-root{position:relative;width:100%;max-width:min(96vw,720px);margin:0 auto;display:flex;flex-direction:column;gap:clamp(4px,1vw,8px);background:linear-gradient(180deg,#FBF3E4,#EAF2EE);border-radius:16px;padding:clamp(6px,1.4vw,11px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);box-sizing:border-box;}'
        + '.cs-saytop{display:flex;align-items:center;gap:7px;justify-content:center;font:700 clamp(11px,2.7vw,13px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';min-width:0;}'
        + '.cs-saytext{min-width:0;overflow-wrap:break-word;}.cs-pip{font-size:clamp(19px,4.6vw,26px);flex:0 0 auto;}.cs-bounce{animation:csBounce .5s ease;}'
        + '@keyframes csBounce{0%{transform:scale(.8)}60%{transform:scale(1.12)}100%{transform:none}}'
        + '.cs-basket{position:relative;height:13px;border-radius:7px;overflow:hidden;}.cs-kelp{position:absolute;right:5px;top:-3px;font-size:14px;}'
        /* scenario + goal */
        + '.cs-head{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;background:#fff;border-radius:11px;padding:clamp(4px,1.2vw,8px) clamp(8px,2vw,12px);box-shadow:inset 0 0 0 2px rgba(20,107,94,.1);min-width:0;}'
        + '.cs-scenario{margin:0;font:600 clamp(11.5px,2.9vw,14px)/1.25 "Nunito",sans-serif;color:' + C.INK + ';min-width:0;overflow-wrap:break-word;flex:1 1 auto;}'
        + '.cs-goal{flex:0 0 auto;background:' + C.T + ';color:#fff;border-radius:9px;padding:3px 10px;font:800 clamp(12px,3vw,15px)/1.1 "Baloo 2",sans-serif;white-space:nowrap;}'
        /* legend */
        + '.cs-legend{display:flex;flex-wrap:wrap;gap:6px 12px;justify-content:center;align-items:center;background:rgba(20,107,94,.06);border-radius:9px;padding:4px 8px;}'
        + '.cs-legitem{display:inline-flex;align-items:center;gap:3px;font:800 clamp(11px,2.6vw,13px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.cs-legdisc{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;color:#fff;font-size:11px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.12);}'
        + '.cs-legvals{font:700 clamp(11px,2.7vw,13px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        /* tray (no live total) */
        + '.cs-tray{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;align-items:center;min-height:50px;border-radius:11px;border:2.5px dashed rgba(20,107,94,.35);background:rgba(255,255,255,.55);padding:5px;}'
        + '.cs-trayph{font:600 clamp(10.5px,2.6vw,12px)/1.2 "Nunito",sans-serif;color:rgba(20,107,94,.6);}'
        /* purse + pile */
        + '.cs-purse,.cs-pile{display:flex;flex-wrap:wrap;gap:clamp(5px,1.4vw,8px);justify-content:center;align-items:center;}'
        + '.cs-pile{background:rgba(20,107,94,.05);border-radius:11px;padding:6px;}'
        /* coin token — a ≥44px hit area; the disc inside is the TRUE relative diameter, NO value on the face */
        + '.cs-coin{min-width:44px;min-height:44px;border:0;background:none;padding:1px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;touch-action:manipulation;}'
        + '.cs-disc{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;border:2px solid #999;box-shadow:0 2px 0 rgba(0,0,0,.14),inset 0 1px 2px #fff7;}'
        + '.cs-glyph{font:800 13px/1 "Baloo 2",sans-serif;color:#3a3a3a;text-shadow:0 1px 0 #fff8;}'
        + '.cs-coin.cs-in .cs-disc{outline:2.5px solid ' + C.CORAL + ';outline-offset:1px;}'
        + '.cs-coin:active{transform:translateY(1px);}'
        + '.cs-coin:focus-visible,.cs-pay:focus-visible,.cs-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* options (count-set / enough) */
        + '.cs-options{display:flex;flex-wrap:wrap;gap:clamp(6px,1.8vw,10px);justify-content:center;}'
        + '.cs-opt{min-width:56px;min-height:48px;padding:0 14px;border-radius:13px;border:2px solid rgba(242,120,75,.5);background:#fff;box-shadow:0 2px 0 rgba(160,120,60,.16);cursor:pointer;color:' + C.CORAL2 + ';font:800 clamp(15px,3.8vw,19px)/1 "Baloo 2",sans-serif;touch-action:manipulation;}'
        + '.cs-optword{font-size:clamp(12px,3vw,15px);}.cs-opt:active{transform:translateY(1px);}'
        /* pay */
        + '.cs-pay{align-self:center;min-height:48px;padding:0 clamp(18px,5vw,28px);border-radius:24px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(14px,3.8vw,18px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.cs-pay:disabled{opacity:.45;cursor:default;box-shadow:none;}.cs-pay:active:not(:disabled){transform:translateY(2px);}'
        /* done */
        + '.cs-done{display:flex;flex-direction:column;align-items:center;gap:5px;padding:8px;}.cs-cha{font-size:clamp(34px,9vw,50px);animation:csHeal .6s ease;}.cs-donetext{font:800 clamp(13px,3.2vw,16px)/1.2 "Baloo 2",sans-serif;color:' + C.GOOD + ';text-align:center;}'
        + '@keyframes csHeal{0%{transform:scale(0)}70%{transform:scale(1.25)}100%{transform:none}}'
        /* desktop + phones */
        + '@media (min-width:760px){.cs-root{padding:12px 14px;}}'
        + '@media (max-width:480px){.cs-root{gap:4px;padding:8px;}.cs-tray{min-height:46px;}}'
        + '@media (max-width:380px){.cs-root{gap:2px;padding:3px;}.cs-saytop{font-size:10.5px;}.cs-pip{font-size:16px;}.cs-basket{display:none;}.cs-head{padding:2px 6px;gap:5px;}.cs-scenario{font-size:11px;line-height:1.16;}.cs-goal{padding:2px 8px;font-size:12px;}.cs-legend{padding:1px 5px;gap:2px 8px;}.cs-legvals{font-size:10px;}.cs-legitem{font-size:10px;}.cs-tray{min-height:34px;gap:3px;padding:2px;}.cs-purse,.cs-pile{gap:3px;}.cs-pile{padding:2px;}.cs-pay{min-height:44px;}.cs-options{gap:6px;}.cs-opt{min-height:44px;}.cs-coin{min-width:44px;min-height:44px;padding:0;}}'
        + '@media (prefers-reduced-motion: reduce){.cs-bounce,.cs-cha{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-coin-stall', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'coin-stall.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
