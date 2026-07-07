/* =====================================================================
   SUNNY-SIDE DINER — ACTIVITY  (sunny-side-diner-activity.js)
   ---------------------------------------------------------------------
   CCSS L.K.1.F — produce + EXPAND a complete COMPOUND sentence. The child
   is the waiter: a customer speaks a compound order ("two pancakes and a
   milk, please"); the child (0) LISTENS + gathers the food on the tray
   (SL.K.2), then (1) the order-pad HIDES + the child SAYS THE WHOLE ORDER
   BACK as one complete sentence — joining the halves with the golden "and"
   COUPLER. The read-back is the L.K.1.F gate (production, never copying).

   Validity DERIVED by mini tools/compound-order-core.js (readBackValid =
   coupler + each food + each count; NO stored boolean). Two phases (internal
   state): tray → read-back → done. The coupler is OBLIGATORY (drop it → the
   halves stay apart). No timer/score/streak. Customers + food = SVG
   PLACEHOLDERS. Words ALWAYS DOM; the voiced read-back = the EXACT utter()
   string. 0 lines to the protected cores + lcs-shell.{js,css}. answerType:'state'.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.CompoundOrderCore;

  var C = {
    T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F',
    CREAM: '#FBF3E4', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A', BOOTH: '#1B7E6E'
  };
  var FOODTINT = { pancake: '#E0A24B', egg: '#F4D24A', waffle: '#D69A45', muffin: '#A9744A', cookie: '#B98A55', banana: '#F2D14E', milk: '#EAF0F2', juice: '#F2954B', apple: '#E2574B' };

  var LANG = 'en';   /* content locale, set from api.lang in init() */

  /* FR surface layer (native ensemble) — the protected core stays BYTE-IDENTICAL
     (its adjudication is key-based/language-neutral); the French DISPLAY is generated
     here, branched on LANG at the utter/agree call sites. `.one` = count-1 form
     (indefinite article + singular, gender-correct); `.many` = bare plural (`jus`
     is invariable). Mirrors compound-order-core's agree/utter with FR tables. */
  var FOOD_FR = {
    pancake: { one: 'une crêpe', many: 'crêpes' },
    egg: { one: 'un œuf', many: 'œufs' },
    waffle: { one: 'une gaufre', many: 'gaufres' },
    muffin: { one: 'un muffin', many: 'muffins' },
    cookie: { one: 'un cookie', many: 'cookies' },
    banana: { one: 'une banane', many: 'bananes' },
    milk: { one: 'un lait', many: 'laits' },
    juice: { one: 'un jus', many: 'jus' },
    apple: { one: 'une pomme', many: 'pommes' }
  };
  var NUMWORD_FR = { 2: 'deux', 3: 'trois', 4: 'quatre' };
  function frAgree(food, count) { var f = FOOD_FR[food]; if (!f) return String(count) + ' ' + food; return count === 1 ? f.one : (NUMWORD_FR[count] + ' ' + f.many); }
  function frUtter(order) { var phrases = order.items.map(function (it) { return frAgree(it.food, it.quantity); }); return 'Je voudrais ' + phrases.join(' et ') + ', s’il vous plaît.'; }
  function couplerWord() { return LANG === 'fr' ? 'et' : 'and'; }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG === 'fr' ? 'fr-FR' : 'en', rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.lang = LANG === 'fr' ? 'fr-FR' : 'en-US'; u.rate = .95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function foodSVG(food) {
    var t = FOODTINT[food] || '#C8A86E', s = 'rgba(0,0,0,.16)';
    var body;
    switch (food) {
      case 'pancake': body = '<ellipse cx="50" cy="64" rx="30" ry="9" fill="' + t + '"/><ellipse cx="50" cy="54" rx="30" ry="9" fill="#E8B362"/><ellipse cx="50" cy="44" rx="30" ry="9" fill="' + t + '"/><circle cx="50" cy="40" r="6" fill="#C9742F"/>'; break;
      case 'egg': body = '<ellipse cx="50" cy="56" rx="32" ry="22" fill="#FCFCF8"/><circle cx="50" cy="54" r="11" fill="#F4C842"/>'; break;
      case 'waffle': body = '<rect x="24" y="34" width="52" height="44" rx="7" fill="' + t + '"/><path d="M24 48h52M24 62h52M38 34v44M58 34v44" stroke="#B57A35" stroke-width="3"/>'; break;
      case 'muffin': body = '<path d="M30 54 L70 54 L64 82 Q50 88 36 82 Z" fill="#C79A6A"/><path d="M30 54 Q34 30 50 30 Q66 30 70 54 Z" fill="' + t + '"/>'; break;
      case 'cookie': body = '<circle cx="50" cy="56" r="28" fill="' + t + '"/><circle cx="42" cy="48" r="3.5" fill="#6B4A28"/><circle cx="58" cy="52" r="3.5" fill="#6B4A28"/><circle cx="50" cy="64" r="3.5" fill="#6B4A28"/>'; break;
      case 'banana': body = '<path d="M26 44 Q40 84 76 64 Q60 76 40 56 Q30 48 26 44 Z" fill="' + t + '"/>'; break;
      case 'milk': body = '<path d="M34 30 L66 30 L62 82 Q50 86 38 82 Z" fill="#F7FAFB" stroke="#C7D2D6" stroke-width="2"/><rect x="34" y="42" width="28" height="24" fill="#EAF0F2"/>'; break;
      case 'juice': body = '<path d="M34 30 L66 30 L62 82 Q50 86 38 82 Z" fill="#FBE0C2"/><path d="M35 44 L65 44 L61 80 Q50 84 39 80 Z" fill="' + t + '"/>'; break;
      case 'apple': body = '<circle cx="50" cy="58" r="26" fill="' + t + '"/><rect x="48" y="28" width="4" height="10" rx="2" fill="#7A4A28"/><ellipse cx="58" cy="34" rx="7" ry="4" fill="#4FA86A"/>'; break;
      default: body = '<circle cx="50" cy="56" r="26" fill="' + t + '"/>';
    }
    // scale the shape ~1.28 about its centre so it FILLS the cell (no tiny-icon-in-a-big-cell).
    return '<svg class="sd-food-svg" viewBox="0 0 100 100" role="img" aria-label="' + esc(food) + '"><g transform="translate(50 56) scale(1.28) translate(-50 -56)" stroke="' + s + '" stroke-width="1.1">' + body + '</g></svg>';
  }

  function custSVG(kind, pose) {
    var col = { mouse: '#B7A99B', bear: '#9C6B43', cat: '#E2954B', robot: '#7FA8B8' }[kind] || '#B7A99B';
    var happy = pose === 'happy';
    var eyes = happy ? '<path d="M40 44 Q44 40 48 44" stroke="#2A2A35" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M52 44 Q56 40 60 44" stroke="#2A2A35" stroke-width="2.2" fill="none" stroke-linecap="round"/>' : '<circle cx="44" cy="44" r="3" fill="#2A2A35"/><circle cx="56" cy="44" r="3" fill="#2A2A35"/>';
    var ears = kind === 'mouse' ? '<circle cx="34" cy="28" r="9" fill="' + col + '"/><circle cx="66" cy="28" r="9" fill="' + col + '"/>' : kind === 'bear' ? '<circle cx="34" cy="30" r="8" fill="' + col + '"/><circle cx="66" cy="30" r="8" fill="' + col + '"/>' : kind === 'cat' ? '<path d="M30 36 L34 22 L44 34 Z" fill="' + col + '"/><path d="M70 36 L66 22 L56 34 Z" fill="' + col + '"/>' : '<rect x="46" y="18" width="8" height="10" rx="2" fill="' + col + '"/><circle cx="50" cy="16" r="3" fill="' + C.CORAL + '"/>';
    var mouth = happy ? '<path d="M44 56 Q50 62 56 56" stroke="#2A2A35" stroke-width="2.2" fill="none" stroke-linecap="round"/>' : '<path d="M45 57 Q50 59 55 57" stroke="#2A2A35" stroke-width="2" fill="none" stroke-linecap="round"/>';
    return '<svg class="sd-cust-svg" viewBox="0 0 100 100" role="img" aria-label="' + esc(kind) + '">' + ears + '<' + (kind === 'robot' ? 'rect x="28" y="30" width="44" height="42" rx="10"' : 'circle cx="50" cy="48" r="24"') + ' fill="' + col + '"/>' + eyes + mouth + '</svg>';
  }

  global.SunnySideDinerActivity = {
    id: 'sunny-side-diner-activity',

    strings: {
      title: { en: 'Sunny-Side Diner', fr: 'Le restaurant de Sunny' },
      prompt: { en: 'Take the order, waiter!', fr: 'Prends la commande, serveur !' },
      gather: { en: 'Listen, then put the food on the tray.', fr: 'Écoute, puis pose les aliments sur le plateau.' },
      replay: { en: '🔊 Hear it again', fr: '🔊 Réécouter' },
      toReadback: { en: 'Now say the whole order back!', fr: 'Maintenant, répète toute la commande !' },
      sayBack: { en: 'Tap each part, then place "and".', fr: 'Touche chaque partie, puis place « et ».' },
      sayIt: { en: 'Say it back', fr: 'Répète la commande' },
      needAnd: { en: 'Join the two parts with "and"!', fr: 'Relie les deux parties avec « et » !' },
      robotSays: { en: 'Trainee Robot got one wrong — fix it!', fr: 'Le robot stagiaire s’est trompé — corrige-le !' },
      extendSays: { en: '…and one more thing, please!', fr: '… et encore une chose, s’il te plaît !' },
      winA: { en: 'Yes! That\'s my whole order!', fr: 'Oui ! C’est toute ma commande !' },
      winRobot: { en: 'You fixed it! Thank you!', fr: 'Tu l’as réparé ! Merci !' },
      tryAgain: { en: 'Hmm, that\'s not quite my order…', fr: 'Hmm, ce n’est pas tout à fait ma commande…' },
      hintCheck: { en: 'Say the order back, then tap Check.', fr: 'Répète la commande, puis appuie sur Vérifier.' }
    },

    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._curPass = 0; this._orderForPool = null;
      this.round = null; this.phase = 'tray'; this.tray = []; this.assembled = null; this.activeOrder = null;
      this.readOnly = false; this.solved = 0; this.extended = false; this.misTray = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) { this._loadActivity(); }
    },

    setupTask: function (round) {
      this.round = round; this.phase = 'tray'; this.tray = []; this.readOnly = false; this.extended = false; this.misTray = 0;
      this.activeOrder = { items: round.order.items.map(function (i) { return { food: i.food, quantity: i.quantity }; }), conjunction: round.order.conjunction };
      this._initAssembled();
      this._palette = null;
    },
    _initAssembled: function () {
      var r = this.round, items = this.activeOrder.items, slots = items.map(function () { return null; });
      if (r.type === 'insert-and') { slots = items.map(function (i) { return { food: i.food, count: i.quantity }; }); this.assembled = { slots: slots, coupler: false }; }
      else if (r.type === 'repair-item') { slots = items.map(function (i) { return { food: i.food, count: i.quantity }; }); slots[r.robotError.slot] = { food: r.robotError.wrongFood, count: items[r.robotError.slot].quantity }; this.assembled = { slots: slots, coupler: true }; }
      else { this.assembled = { slots: slots, coupler: false }; }
      this.activeSlot = this.assembled.slots.findIndex(function (s) { return !s; }); if (this.activeSlot < 0) this.activeSlot = 0;
    },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'sd-wrap');
      var diner = api.el('div', 'sd-diner'); this._dinerEl = diner;
      if (!this.round) { wrap.appendChild(diner); stage.appendChild(wrap); return; }
      if (this.phase === 'done') this._renderDone(diner);
      else if (this.phase === 'read-back') this._renderReadback(diner);
      else this._renderTray(diner);
      // happy-plate vessel
      var shelf = api.el('div', 'sd-shelf');
      for (var i = 0; i < ((this._pool && this._pool.length) || 9); i++) { var p = api.el('span', 'sd-plate'); shelf.appendChild(p); }
      this._shelfEl = shelf; diner.appendChild(shelf);
      wrap.appendChild(diner); stage.appendChild(wrap);
      this._paintShelf();
    },

    _custRow: function (parent, line) {
      var api = this.api;
      var row = api.el('div', 'sd-custrow');
      var cust = api.el('div', 'sd-cust'); cust.innerHTML = custSVG(this.round.customer, this.phase === 'done' ? 'happy' : 'idle'); row.appendChild(cust);
      if (line) { var bub = api.el('div', 'sd-saying'); bub.textContent = line; row.appendChild(bub); }
      parent.appendChild(row);
    },

    /* ----- phase: tray-gather ----- */
    _renderTray: function (diner) {
      var self = this, api = this.api, r = this.round;
      this._custRow(diner, this.api.t('gather'));
      // the order-pad (the items the customer wants) — VISIBLE here, HIDDEN at read-back
      var pad = api.el('div', 'sd-pad'); pad.setAttribute('data-role', 'order-pad');
      this.activeOrder.items.forEach(function (it) { var c = api.el('div', 'sd-paditem'); c.innerHTML = '<span class="sd-padcount">' + it.quantity + '</span>' + foodSVG(it.food); pad.appendChild(c); });
      var replay = api.el('button', 'sd-replay'); replay.type = 'button'; replay.textContent = api.t('replay'); replay.addEventListener('click', function () { speak((LANG === 'fr' ? frUtter(self.activeOrder) : Core.utter(self.activeOrder, 'en'))); }); pad.appendChild(replay);
      diner.appendChild(pad);
      if (!this._spokeOrder) { this._spokeOrder = true; setTimeout(function () { speak((LANG === 'fr' ? frUtter(self.activeOrder) : Core.utter(self.activeOrder, 'en'))); }, 350); }

      // the tray
      var tray = api.el('div', 'sd-tray');
      var tm = Core.trayMultiset(this.activeOrder), got = Core.multisetOf(this.tray);
      if (!this.tray.length) { var ph = api.el('span', 'sd-tray-ph'); ph.textContent = '🍽️'; tray.appendChild(ph); }
      this.tray.forEach(function (food, i) { var c = api.el('button', 'sd-trayobj'); c.type = 'button'; c.innerHTML = foodSVG(food); c.addEventListener('click', function () { self.tray.splice(i, 1); self.render(); }); tray.appendChild(c); });
      diner.appendChild(tray);

      // the food palette
      if (!this._palette) this._palette = shuffle(this._paletteFoods());
      var pal = api.el('div', 'sd-palette');
      this._palette.forEach(function (food) { var b = api.el('button', 'sd-foodchip'); b.type = 'button'; b.innerHTML = foodSVG(food); b.setAttribute('aria-label', (LANG === 'fr' && FOOD_FR[food]) ? frAgree(food, 1) : food); b.addEventListener('click', function () { self.tray.push(food); self.api.sound && self.api.sound(560); self.render(); }); pal.appendChild(b); });
      diner.appendChild(pal);

      // proceed when the tray matches
      if (Core.sameMultiset(got, tm)) {
        var go = api.el('button', 'sd-go'); go.type = 'button'; go.textContent = api.t('toReadback');
        go.addEventListener('click', function () { self.phase = 'read-back'; self.api.sound && self.api.sound(700); self.render(); });
        diner.appendChild(go);
      }
    },
    _paletteFoods: function () {
      var foods = {}; this.activeOrder.items.forEach(function (i) { foods[i.food] = 1; });
      (this.round.distractors && this.round.distractors.foods || []).forEach(function (f) { foods[f] = 1; });
      return Object.keys(foods);
    },

    /* ----- phase: read-back (the order-pad MODEL is GONE; tray-objects remain) ----- */
    _renderReadback: function (diner) {
      var self = this, api = this.api, r = this.round;
      var line = r.type === 'repair-item' ? api.t('robotSays') : (this.extended ? api.t('extendSays') : null);
      this._custRow(diner, line);
      // tray-objects reference (the gathered food — NOT the sentence model)
      var ref = api.el('div', 'sd-ref');
      this.tray.forEach(function (food) { var c = api.el('div', 'sd-refobj'); c.innerHTML = foodSVG(food); ref.appendChild(c); });
      diner.appendChild(ref);

      // the sentence frame: I'd like [half1] (and) [half2], please
      var frame = api.el('div', 'sd-frame' + (this.assembled.coupler ? ' sd-joined' : ''));
      var pre = api.el('span', 'sd-frameword'); pre.textContent = LANG === 'fr' ? 'Je voudrais' : "I'd like"; frame.appendChild(pre);
      this.assembled.slots.forEach(function (slot, i) {
        if (i > 0) {
          // the coupler gap between halves
          var gap = api.el('span', 'sd-gap' + (self.assembled.coupler ? ' sd-gap-on' : ''));
          if (self.assembled.coupler) gap.textContent = couplerWord();
          else { var cb = api.el('button', 'sd-couplerslot'); cb.type = 'button'; cb.textContent = '?'; if (!self.readOnly) cb.addEventListener('click', function () { self._placeCoupler(); }); gap.appendChild(cb); }
          frame.appendChild(gap);
        }
        frame.appendChild(self._slotEl(slot, i));
      });
      var post = api.el('span', 'sd-frameword'); post.textContent = LANG === 'fr' ? ', s’il vous plaît.' : ', please.'; frame.appendChild(post);
      diner.appendChild(frame);

      // sub-hint
      var hint = api.el('div', 'sd-sub'); hint.textContent = this.assembled.coupler ? '' : api.t(r.type === 'insert-and' ? 'needAnd' : 'sayBack'); if (hint.textContent) diner.appendChild(hint);

      // the food rail (place into the active/next slot) + the coupler chip
      var rail = api.el('div', 'sd-rail');
      shuffle(this._paletteFoods()).forEach(function (food) {
        var b = api.el('button', 'sd-foodchip sd-railchip'); b.type = 'button'; b.innerHTML = foodSVG(food); b.setAttribute('aria-label', (LANG === 'fr' && FOOD_FR[food]) ? frAgree(food, 1) : food);
        if (self.readOnly) b.disabled = true; else b.addEventListener('click', function () { self._placeFood(food); });
        rail.appendChild(b);
      });
      if (!this.assembled.coupler) { var coup = api.el('button', 'sd-coupler'); coup.type = 'button'; coup.textContent = couplerWord(); if (!this.readOnly) coup.addEventListener('click', function () { self._placeCoupler(); }); rail.appendChild(coup); }
      diner.appendChild(rail);

      // Say it back (lights on STRUCTURAL COMPLETENESS, not correctness)
      var complete = Core.structurallyComplete(this.activeOrder, this.assembled);
      var say = api.el('button', 'sd-say' + (complete ? '' : ' sd-say-off')); say.type = 'button'; say.textContent = api.t('sayIt'); say.disabled = !complete || this.readOnly;
      if (complete && !this.readOnly) say.addEventListener('click', function () { self._sayBack(); });
      diner.appendChild(say);
    },
    _slotEl: function (slot, i) {
      var self = this, api = this.api;
      var el = api.el('span', 'sd-slot' + (slot ? ' sd-slot-full' : '') + (this.activeSlot === i ? ' sd-slot-active' : ''));
      if (slot) {
        var badge = api.el('button', 'sd-count'); badge.type = 'button'; badge.textContent = slot.count;
        if (!this.readOnly) badge.addEventListener('click', function (e) { e.stopPropagation(); slot.count = slot.count >= 3 ? 1 : slot.count + 1; self.api.sound && self.api.sound(500); self.render(); });
        el.appendChild(badge);
        var ic = api.el('span', 'sd-slot-food'); ic.innerHTML = foodSVG(slot.food); el.appendChild(ic);
        if (!this.readOnly) el.addEventListener('click', function () { self.assembled.slots[i] = null; self.activeSlot = i; self.render(); });
      } else { el.textContent = '?'; if (!this.readOnly) el.addEventListener('click', function () { self.activeSlot = i; self.render(); }); }
      return el;
    },
    _placeFood: function (food) {
      if (this.readOnly) return;
      var idx = this.activeSlot; if (this.assembled.slots[idx]) { var e = this.assembled.slots.findIndex(function (s) { return !s; }); idx = e >= 0 ? e : this.activeSlot; }
      this.assembled.slots[idx] = { food: food, count: 1 }; this.activeSlot = idx;
      this.api.sound && this.api.sound(560); speak(LANG === 'fr' ? frAgree(food, 1) : Core.agree(food, 1)); this.render();
    },
    _placeCoupler: function () {
      if (this.readOnly) return;
      this.assembled.coupler = true; this.api.sound && this.api.sound(680); speak(couplerWord()); this.render();
    },

    _sayBack: function () {
      if (this.readOnly) return;
      var ok = Core.readBackValid(this.activeOrder, this.assembled);
      // build the spoken sentence from what the child assembled (their production)
      var spokenOrder = { items: this.assembled.slots.map(function (s) { return { food: s.food, quantity: s.count }; }), conjunction: this.activeOrder.conjunction };
      speak(LANG === 'fr' ? frUtter(spokenOrder) : Core.utter(spokenOrder, 'en'));
      if (ok) {
        if (this.round.type === 'extend' && !this.extended) { this._grow(); return; }
        this._win();
      } else {
        this.api.sound && this.api.sound(300); this.api.announce && this.api.announce(this.api.t('tryAgain'));
        var f = this._dinerEl; if (f) { f.classList.add('sd-shake'); var d = f; setTimeout(function () { d.classList.remove('sd-shake'); }, 460); }
      }
    },
    _grow: function () {
      this.extended = true; this.activeOrder.items.push({ food: this.round.extension.food, quantity: this.round.extension.quantity });
      this.tray.push(this.round.extension.food);
      // keep the two correct halves, add a fresh empty 3rd + a new coupler gap
      this.assembled = { slots: this.activeOrder.items.map(function (i, k) { return k < 2 ? { food: i.food, count: i.quantity } : null; }), coupler: false };
      this.activeSlot = 2; this.api.sound && this.api.sound(640);
      this.api.announce && this.api.announce(this.api.t('extendSays')); this.render();
    },

    _win: function () {
      this.readOnly = true; this.phase = 'done';
      this.solved = Math.min(this.solved + 1, (this._pool && this._pool.length) || 9);
      this.api.sound && this.api.sound(880);
      this.render();
      var msg = this.api.t(this.round.type === 'repair-item' ? 'winRobot' : 'winA');
      this.api.announce && this.api.announce(msg); speak((LANG === 'fr' ? frUtter(this.activeOrder) : Core.utter(this.activeOrder, 'en')));
    },

    _renderDone: function (diner) {
      var api = this.api;
      this._custRow(diner, this.api.t(this.round.type === 'repair-item' ? 'winRobot' : 'winA'));
      var bubble = api.el('div', 'sd-bubble'); bubble.textContent = '“' + (LANG === 'fr' ? frUtter(this.activeOrder) : Core.utter(this.activeOrder, 'en')) + '”'; diner.appendChild(bubble);
      var plate = api.el('div', 'sd-plated'); plate.textContent = '🍽️✨'; diner.appendChild(plate);
    },

    _paintShelf: function () { if (!this._shelfEl) return; var p = this._shelfEl.children; for (var i = 0; i < p.length; i++) p[i].classList.toggle('sd-plate-on', i < this.solved); },
    isCorrect: function () { return this.phase === 'done'; },
    reset: function () { this.setupTask(this.round); this._spokeOrder = false; this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]);
      var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n);
      if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      this._spokeOrder = false;
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/sunny-side-diner-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[sunny-side-diner] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.sd-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.sd-diner{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.4vw,9px);'
        +   'background:linear-gradient(180deg,#FBF3E4,#F4E7CF);border-radius:20px;padding:clamp(7px,1.8vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.sd-diner.sd-shake{animation:sdShake .46s ease;}@keyframes sdShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}'
        /* customer row */
        + '.sd-custrow{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;width:100%;}'
        + '.sd-cust{width:clamp(44px,11vw,58px);flex:0 0 auto;}.sd-cust-svg{width:100%;height:auto;display:block;}'
        + '.sd-saying{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:12px 12px 12px 3px;padding:5px 10px;font:700 clamp(12px,3.2vw,15px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';max-width:74%;}'
        /* order-pad (tray phase only) */
        + '.sd-pad{display:flex;flex-wrap:wrap;gap:clamp(5px,1.6vw,9px);align-items:center;justify-content:center;padding:clamp(5px,1.6vw,9px);background:#FFF9EC;border:2px dashed rgba(20,107,94,.25);border-radius:12px;}'
        + '.sd-paditem{position:relative;width:clamp(40px,11vw,54px);height:clamp(40px,11vw,54px);}.sd-paditem .sd-food-svg{width:100%;height:100%;}'
        + '.sd-padcount{position:absolute;top:-4px;left:-4px;z-index:2;min-width:18px;height:18px;border-radius:9px;background:' + C.CORAL + ';color:#fff;font:800 12px/18px "Baloo 2",sans-serif;text-align:center;}'
        + '.sd-replay{min-height:36px;padding:0 12px;border-radius:11px;border:0;background:#EAF2EE;color:' + C.T + ';font:700 clamp(12px,3vw,14px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;}'
        /* tray */
        + '.sd-tray{display:flex;flex-wrap:wrap;gap:clamp(4px,1.4vw,7px);justify-content:center;align-items:center;min-height:46px;width:auto;min-width:min(100%,300px);max-width:100%;padding:4px 14px;background:#E7D9BD;border-radius:26px;box-shadow:inset 0 2px 6px rgba(120,90,40,.18);}'
        + '.sd-tray-ph{font-size:22px;opacity:.45;}'
        + '.sd-trayobj{width:clamp(42px,11vw,54px);height:clamp(42px,11vw,54px);border:0;background:#FCF6EA;border-radius:9px;cursor:pointer;touch-action:manipulation;}.sd-trayobj .sd-food-svg{width:98%;height:98%;}'
        /* palette */
        + '.sd-palette,.sd-rail{display:flex;flex-wrap:wrap;gap:clamp(5px,1.6vw,9px);justify-content:center;}'
        + '.sd-foodchip{width:clamp(48px,12vw,62px);height:clamp(48px,12vw,62px);border:2px solid rgba(20,107,94,.18);background:#FFF6E6;border-radius:13px;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.2);touch-action:manipulation;display:inline-flex;align-items:center;justify-content:center;}.sd-foodchip .sd-food-svg{width:96%;height:96%;}'
        + '.sd-foodchip:active{transform:translateY(2px);}'
        + '.sd-foodchip:focus-visible,.sd-go:focus-visible,.sd-say:focus-visible,.sd-coupler:focus-visible,.sd-count:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '.sd-go{min-height:46px;padding:0 clamp(16px,5vw,26px);border-radius:14px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(14px,3.8vw,18px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.sd-go:active{transform:translateY(2px);}'
        /* read-back: the tray reference */
        + '.sd-ref{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;opacity:.9;}'
        + '.sd-refobj{width:clamp(30px,8vw,40px);height:clamp(30px,8vw,40px);}.sd-refobj .sd-food-svg{width:100%;height:100%;}'
        /* the sentence frame + coupler */
        + '.sd-frame{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:clamp(4px,1.4vw,8px);width:100%;font-family:"Baloo 2",sans-serif;}'
        + '.sd-frameword{font:700 clamp(14px,3.8vw,18px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.sd-slot{display:inline-flex;align-items:center;gap:3px;min-width:clamp(48px,13vw,64px);min-height:48px;border-radius:12px;border:2px dashed rgba(20,107,94,.3);background:#FFF;justify-content:center;font:800 22px/1 "Baloo 2",sans-serif;color:rgba(20,107,94,.4);cursor:pointer;padding:2px 6px;}'
        + '.sd-slot-full{border-style:solid;border-color:' + C.T + ';background:#EAF2EE;}'
        + '.sd-slot-active{box-shadow:0 0 0 3px rgba(242,120,75,.3);}'
        + '.sd-slot-food{width:clamp(30px,8vw,38px);height:clamp(30px,8vw,38px);}.sd-slot-food .sd-food-svg{width:100%;height:100%;}'
        + '.sd-count{min-width:24px;height:24px;border-radius:12px;border:0;background:' + C.CORAL + ';color:#fff;font:800 14px/1 "Baloo 2",sans-serif;cursor:pointer;}'
        + '.sd-gap{display:inline-flex;align-items:center;justify-content:center;min-width:42px;}'
        + '.sd-gap.sd-gap-on{font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;color:' + C.GOLD + ';text-shadow:0 1px 0 rgba(180,120,30,.3);min-width:auto;padding:0 4px;}'
        + '.sd-couplerslot{min-width:40px;min-height:44px;border-radius:11px;border:2px dashed ' + C.GOLD + ';background:#FFFBF0;color:' + C.GOLD + ';font:800 20px/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 0 0 4px rgba(232,165,58,.16);animation:sdGlow 1.3s ease-in-out infinite;}'
        + '@keyframes sdGlow{0%,100%{box-shadow:0 0 0 4px rgba(232,165,58,.14)}50%{box-shadow:0 0 0 7px rgba(232,165,58,.28)}}'
        + '.sd-coupler{min-width:54px;min-height:46px;border-radius:13px;border:0;background:linear-gradient(180deg,#F6C95A,' + C.GOLD + ');color:#7a4e12;font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 #B57E22;touch-action:manipulation;}'
        + '.sd-coupler:active{transform:translateY(2px);}'
        + '.sd-sub{font:700 clamp(12px,3.2vw,15px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';opacity:.85;text-align:center;}'
        + '.sd-say{min-height:46px;padding:0 clamp(18px,6vw,30px);border-radius:14px;border:0;background:' + C.GOOD + ';color:#fff;font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 #1f7a4d;touch-action:manipulation;}'
        + '.sd-say:active{transform:translateY(2px);}.sd-say-off{opacity:.45;box-shadow:0 3px 0 rgba(20,107,94,.25);}'
        /* done */
        + '.sd-bubble{max-width:90%;background:#fff;border:2px solid rgba(20,107,94,.2);border-radius:13px;padding:7px 13px;font:700 clamp(15px,4vw,19px)/1.3 "Baloo 2",sans-serif;color:' + C.INK + ';text-align:center;}'
        + '.sd-plated{font-size:clamp(26px,7vw,36px);}'
        /* vessel */
        + '.sd-shelf{display:flex;gap:4px;flex-wrap:wrap;justify-content:center;}'
        + '.sd-plate{width:clamp(11px,3vw,16px);height:7px;border-radius:3px;background:rgba(20,107,94,.16);transition:background .3s;}'
        + '.sd-plate-on{background:' + C.GOLD + ';}'
        + '@media (max-width:412px){.sd-diner{padding:6px;gap:4px;}.sd-foodchip{width:44px;height:44px;}.sd-paditem,.sd-trayobj{width:38px;height:38px;}.sd-slot{min-width:46px;}.sd-refobj{width:30px;height:30px;}}'
        /* ≤360: drop the carrier words, tighten the gap + chips — the frame stays a SINGLE
           horizontal row ([slot] and [slot]) that fits 280px without the vertical-stack cost. */
        + '@media (max-width:360px){.sd-frameword{display:none;}.sd-gap{min-width:32px;}.sd-gap.sd-gap-on{min-width:auto;}.sd-slot{min-width:42px;}.sd-couplerslot{min-width:36px;}.sd-foodchip{width:40px;height:40px;}}'
        /* short viewports (the 280×600 / phone-landscape class): compact the chrome so the
           read-back rail + Say-it-back never fall below the fold. */
        + '@media (max-height:700px){.sd-diner{gap:3px;}.sd-cust{width:clamp(38px,9vw,46px);}.sd-saying{font-size:12px;padding:3px 7px;}.sd-refobj{width:26px;height:26px;}.sd-ref{gap:3px;}}'
        + '@media (prefers-reduced-motion: reduce){.sd-couplerslot{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-sunny-diner', ''); tag.textContent = css;
      document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'sunny-side-diner.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
