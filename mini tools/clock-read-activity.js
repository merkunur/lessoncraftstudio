/* =====================================================================
   OWL'S CUCKOO COTTAGE — read (and set) the clock — ACTIVITY  (clock-read-activity.js)
   ---------------------------------------------------------------------
   CCSS 1.MD.B.3 — tell time, hours + half-hours, BOTH directions. Owl's
   day unfolds in a cuckoo cottage; the child is the timekeeper-and-reader.
     • READ (the premium spine E10 omits): a clock is pre-set; the cuckoo
       asks "What's Owl doing now?" → the child READS the coupled analog
       face + taps the matching moment (each event-card carries its time;
       exactly one matches the wall clock; NO digital target shown).
     • SET (the on-ramp): a named time in WORDS → radial-drag the coupled
       hands → "Wake the cuckoo!" (the deliberate commit).
     • ORDER: three set clocks → tap the one showing the asked event.
     • WORLD-CUE: a sky cue (dawn/noon) → decode → set.
   Correct → the cuckoo bursts out + acts out the moment + speaks the time
   (closing the analog↔words loop). The cottage is FROZEN during the solve
   (no proximity cheat); the day-arc advances per round (not a streak);
   wrong is SILENT (peek-and-tuck). Coupled hour-hand (30H+0.5M) is
   mandatory; NO digital target. All math from clock-read-core.js (which
   MODELS, never imports, the E10 clock-core). 0 lines to any protected
   core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.ClockReadCore;
  var NS = 'http://www.w3.org/2000/svg';
  var C = { T: '#146B5E', FACE: '#FBF3E4', HOUR: '#146B5E', MIN: '#F2784B', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A' };
  var LANG = 'en';
  var EVENT_DE = { Lunch: 'Mittagessen', Breakfast: 'Frühstück', 'Garden time': 'Gartenzeit', Bedtime: 'Schlafenszeit', Supper: 'Abendessen', 'Morning tea': 'Morgentee', Snack: 'Naschzeit' };
  var CUE_DE = { dawn: 'Der Himmel leuchtet rosa — früher Morgen.', noon: 'Die Sonne steht hoch am Himmel — Mittag.' };
  function naechsteStunde(h) { return h === 12 ? 1 : h + 1; }
  function wordForDE(h, m) {
    if (m === 0) return h === 1 ? 'ein Uhr' : (h + ' Uhr');
    if (m === 15) return 'Viertel nach ' + h;
    if (m === 30) return 'halb ' + naechsteStunde(h);
    if (m === 45) return 'Viertel vor ' + naechsteStunde(h);
    return h + ':' + (m < 10 ? '0' : '') + m;
  }
  /* French time-words (heures + demi + quarts). Native half-hour idiom = current-hour
     + « et demie » (Romance, NOT the German toward-next-hour « halb 8 »); 1 = « une heure »
     (singular); « moins le quart » is toward the next hour; 12:00 = « midi ». */
  var HOUR_WORD_FR = ['', 'une', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze'];
  function hourPhraseFR(h) { return h === 1 ? 'une heure' : HOUR_WORD_FR[h] + ' heures'; }
  function wordForFR(h, m) {
    h = h | 0; m = m | 0;
    if (h === 12 && m === 0) return 'midi';
    if (m === 0) return hourPhraseFR(h);
    if (m === 15) return hourPhraseFR(h) + ' et quart';
    if (m === 30) return hourPhraseFR(h) + ' et demie';
    if (m === 45) return hourPhraseFR(naechsteStunde(h)) + ' moins le quart';
    return hourPhraseFR(h) + ' ' + m;
  }
  var EVENT_FR = { Lunch: 'Déjeuner', Breakfast: 'Petit-déjeuner', 'Garden time': 'Jardinage', Bedtime: 'Dodo', Supper: 'Dîner', 'Morning tea': 'Collation', Snack: 'Goûter' };
  var CUE_FR = { dawn: 'Le ciel devient rose — c’est le petit matin.', noon: 'Le soleil est haut dans le ciel — c’est midi.' };
  function wordFor(h, m) { return LANG === 'fr' ? wordForFR(h, m) : (LANG === 'de' ? wordForDE(h, m) : Core.wordFor(h, m)); }
  function setWordFor(r) { return LANG === 'fr' ? wordForFR(r.targetTime.hour, r.targetTime.minute) : (LANG === 'de' ? wordForDE(r.targetTime.hour, r.targetTime.minute) : Core.setWord(r)); }
  function eventLabel(label) { return LANG === 'de' ? (EVENT_DE[label] || label) : (LANG === 'fr' ? (EVENT_FR[label] || label) : label); }
  function cueLabel(cue) { return LANG === 'de' ? (CUE_DE[cue.id] || cue.label) : (LANG === 'fr' ? (CUE_FR[cue.id] || cue.label) : cue.label); }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG, rate: rate || 0.92 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.92; u.lang = (LANG === 'de' ? 'de-DE' : (LANG === 'fr' ? 'fr-FR' : 'en-US')); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function elNS(tag, attrs) { var e = document.createElementNS(NS, tag); for (var k in attrs) { if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); } return e; }

  /* a clock face SVG (face + ticks + numerals + the two coupled hands).
     opts.draggable wires the radial drag; else fixed (read/order). */
  function buildClock(hour, minute, opts, hooks) {
    opts = opts || {};
    var svg = elNS('svg', { viewBox: '0 0 100 100', class: 'crd-svg' + (opts.mini ? ' crd-mini' : ''), role: 'group', 'aria-label': (LANG === 'de' ? 'Zifferblatt' : (LANG === 'fr' ? 'cadran de l’horloge' : 'clock face')) });
    svg.appendChild(elNS('circle', { cx: 50, cy: 50, r: 46, fill: C.FACE, stroke: C.T, 'stroke-width': 3 }));
    for (var i = 1; i <= 12; i++) {
      var a = 30 * i * Math.PI / 180, big = (i % 3 === 0), r1 = big ? 38 : 41, r2 = 45;
      svg.appendChild(elNS('line', { x1: (50 + r1 * Math.sin(a)).toFixed(2), y1: (50 - r1 * Math.cos(a)).toFixed(2), x2: (50 + r2 * Math.sin(a)).toFixed(2), y2: (50 - r2 * Math.cos(a)).toFixed(2), stroke: C.T, 'stroke-width': big ? 2 : 1, 'stroke-linecap': 'round', opacity: big ? 0.9 : 0.45 }));
      var nx = 50 + 33 * Math.sin(a), ny = 50 - 33 * Math.cos(a);
      var num = elNS('text', { x: nx.toFixed(2), y: ny.toFixed(2), 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: C.T, 'font-size': opts.mini ? 9 : 8, 'font-weight': 700, 'font-family': 'Nunito,system-ui,sans-serif' });
      num.textContent = String(i); svg.appendChild(num);
    }
    var ang = Core.handAngles(hour, minute);
    var hourG = makeHand('hour', 26, 4.5, C.HOUR, ang.hour, opts);
    var minG = makeHand('minute', 38, 3, C.MIN, ang.minute, opts);
    svg.appendChild(hourG.g); svg.appendChild(minG.g);
    svg.appendChild(elNS('circle', { cx: 50, cy: 50, r: 3.4, fill: C.T }));
    if (opts.draggable && hooks) { wireHand(svg, hourG, 'hour', hooks); wireHand(svg, minG, 'minute', hooks); }
    return { svg: svg, hourG: hourG, minG: minG };
  }
  function makeHand(which, len, w, color, angle, opts) {
    var g = elNS('g', { class: 'crd-hand crd-hand-' + which, transform: 'rotate(' + angle.toFixed(2) + ' 50 50)' });
    if (opts.draggable) { g.setAttribute('role', 'button'); g.setAttribute('tabindex', '0'); g.setAttribute('aria-label', LANG === 'de' ? (which === 'hour' ? 'Stundenzeiger' : 'Minutenzeiger') : (LANG === 'fr' ? (which === 'hour' ? 'aiguille des heures' : 'aiguille des minutes') : (which === 'hour' ? 'hour hand' : 'minute hand'))); }
    g.appendChild(elNS('line', { x1: 50, y1: 50, x2: 50, y2: 50 - len, stroke: 'transparent', 'stroke-width': 24, 'stroke-linecap': 'round', class: 'crd-hit' }));
    g.appendChild(elNS('line', { x1: 50, y1: 50, x2: 50, y2: 50 - len, stroke: color, 'stroke-width': w, 'stroke-linecap': 'round', class: 'crd-vis' }));
    return { g: g, len: len };
  }
  function wireHand(svg, hand, which, hooks) {
    var g = hand.g;
    g.addEventListener('pointerdown', function (e) {
      if (e.button != null && e.button !== 0 && e.pointerType === 'mouse') return;
      e.preventDefault();
      try { g.setPointerCapture(e.pointerId); } catch (err) {}
      move(e.clientX, e.clientY);
      function onMove(ev) { ev.preventDefault(); move(ev.clientX, ev.clientY); }
      function onUp(ev) { g.removeEventListener('pointermove', onMove); g.removeEventListener('pointerup', onUp); g.removeEventListener('pointercancel', onUp); try { g.releasePointerCapture(ev.pointerId); } catch (err) {} }
      g.addEventListener('pointermove', onMove); g.addEventListener('pointerup', onUp); g.addEventListener('pointercancel', onUp);
    });
    g.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar' && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault(); hooks.step(which, e.key === 'ArrowLeft' ? -1 : 1);
    });
    function move(cx, cy) { var ang = Core.angleFromPointer(cx, cy, svg.getBoundingClientRect()); hooks.drag(which, ang); }
  }

  global.ClockReadActivity = {
    id: 'clock-read-activity',

    strings: {
      title: { en: "Owl's Cuckoo Cottage", de: 'Eulchens Kuckucksuhr', fr: 'La maison à coucou de Chouette' },
      instruction: { en: '', de: '', fr: '' },
      prompt: { en: 'What time is it in the cottage?', de: 'Wie spät ist es im Häuschen?', fr: 'Quelle heure est-il dans la maison ?' },
      readPrompt: { en: "What is Owl doing now?", de: 'Was macht Eulchen gerade?', fr: 'Que fait Chouette maintenant ?' },
      orderPrompt: { en: 'Which clock shows {event}?', de: 'Welche Uhr zeigt {event}?', fr: 'Quelle horloge montre {event} ?' },
      setPrompt: { en: 'Set the clock to {time}.', de: 'Stell die Uhr auf {time}.', fr: 'Règle l’horloge sur {time}.' },
      wake: { en: 'Wake the cuckoo! 🐦', de: 'Weck den Kuckuck! 🐦', fr: 'Réveille le coucou ! 🐦' },
      owlListen: { en: "Read Owl's clock…", de: 'Lies Eulchens Uhr …', fr: 'Lis l’horloge de Chouette…' },
      owlWin: { en: 'Cuckoo! ', de: 'Kuckuck! ', fr: 'Coucou ! ' },
      owlWrong: { en: '', de: '', fr: '' },
      hintCheck: { en: 'Find the time, then tap Check!', de: 'Finde die Uhrzeit, dann tippe auf „Prüfen"!', fr: 'Trouve l’heure, puis touche Vérifier !' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.solved = false; this.setHour = 12; this.setMinute = 0;
      this.picked = null; this.dayArc = 0; this.msg = null; this._eventOrder = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.solved = false; this.picked = null; this.msg = null;
      var tt = round.targetTime || { hour: 12, minute: 0 };
      this.setHour = (tt.hour === 12 && tt.minute === 0) ? 6 : 12; this.setMinute = 0;
      this.dayArc = Math.min(this.dayArc + 1, (this._pool && this._pool.length) || 14);   /* the day passes per round reached — monotonic, NOT a streak */
      this._eventOrder = round.events ? shuffle(round.events.map(function (e) { return e.id; })) : null;
    },

    /* ---------- render (dispatch by mode) ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var root = api.el('div', 'crd-root'); root.setAttribute('data-solved', this.solved ? '1' : '0'); this._rootEl = root;
      if (!this.round) { stage.appendChild(root); return; }
      var self = this;
      /* Owl's say line + the cuckoo */
      var say = api.el('div', 'crd-saytop');
      say.innerHTML = '<span class="crd-cuckoo' + (this.solved ? ' crd-coo' : '') + '">' + (this.solved ? '🐦' : '🦉') + '</span><span>' + esc(this.msg || this._promptLine()) + '</span>';
      root.appendChild(say);

      var main = api.el('div', 'crd-main');
      if (this.round.mode === 'order') this._renderOrder(main);
      else if (this.round.mode === 'read') this._renderRead(main);
      else this._renderSet(main);   /* set / world-cue / five-min set */
      root.appendChild(main);

      this._renderDayArc(root);
      stage.appendChild(root);
    },
    _promptLine: function () {
      var api = this.api, r = this.round;
      if (r.mode === 'read') return api.t('readPrompt');
      if (r.mode === 'order') return api.t('orderPrompt').replace('{event}', eventLabel(r.askEvent.label));
      if (r.mode === 'world-cue') return cueLabel(r.cue);
      return api.t('setPrompt').replace('{time}', setWordFor(r));
    },

    /* ----- READ: a pre-set clock + event-cards ----- */
    _renderRead: function (main) {
      var self = this, api = this.api;
      var left = api.el('div', 'crd-left');
      var c = buildClock(this.round.targetTime.hour, this.round.targetTime.minute, { draggable: false }, null);
      left.appendChild(c.svg); main.appendChild(left);
      var right = api.el('div', 'crd-right');
      var cards = api.el('div', 'crd-cards');
      this._eventOrder.forEach(function (id) {
        var e = self.round.events.find(function (x) { return x.id === id; });
        var picked = (self.picked === id);
        var b = api.el('button', 'crd-card' + (picked ? ' crd-picked' : '')); b.type = 'button'; b.setAttribute('data-id', id);
        var word = wordFor(e.hour, e.minute);
        var elab = eventLabel(e.label);
        b.innerHTML = '<span class="crd-emoji">' + e.emoji + '</span><span class="crd-cardbody"><span class="crd-cardtext">' + esc(elab) + '</span><span class="crd-cardtime">' + esc(word) + '</span></span>';
        b.setAttribute('aria-label', elab + ', ' + word);
        if (!self.solved) b.addEventListener('click', function () { self._pickEvent(id); });
        cards.appendChild(b);
      });
      right.appendChild(cards); main.appendChild(right);
    },
    _pickEvent: function (id) {
      this.picked = id;
      if (Core.isCorrectRead(this.round, id)) this._correct();
      else this._wrongSilent();
    },

    /* ----- SET / WORLD-CUE: a draggable clock + the readout + commit ----- */
    _renderSet: function (main) {
      var self = this, api = this.api;
      var left = api.el('div', 'crd-left');
      var hooks = {
        drag: function (which, ang) {
          if (self.solved) return;
          if (which === 'hour') self.setHour = Core.snapHour(ang, self.setMinute);
          else self.setMinute = Core.snapMinute(ang, self.round.minuteStep || 30);
          self.api.sound && self.api.sound(which === 'hour' ? 560 : 720);
          self._paint();
        },
        step: function (which, dir) {
          if (self.solved) return;
          if (which === 'hour') self.setHour = ((self.setHour - 1 + (dir > 0 ? 1 : 11)) % 12) + 1;
          else { var st = self.round.minuteStep || 30; self.setMinute = ((self.setMinute + (dir > 0 ? st : 60 - st)) % 60); }
          self.api.sound && self.api.sound(640); self._paint();
        }
      };
      this._clock = buildClock(this.setHour, this.setMinute, { draggable: true }, hooks);
      left.appendChild(this._clock.svg); main.appendChild(left);
      var right = api.el('div', 'crd-right');
      if (this.round.mode === 'world-cue') { var cue = api.el('div', 'crd-cue'); cue.innerHTML = '<span class="crd-emoji">' + this.round.cue.emoji + '</span>'; right.appendChild(cue); }
      var read = api.el('div', 'crd-readout'); read.setAttribute('aria-hidden', 'true'); this._readoutEl = read;
      read.textContent = this.setHour + ':' + (this.setMinute < 10 ? '0' : '') + this.setMinute;
      right.appendChild(read);
      var wake = api.el('button', 'crd-wake'); wake.type = 'button'; wake.textContent = api.t('wake');
      if (!this.solved) wake.addEventListener('click', function () { self._commit(); });
      right.appendChild(wake); main.appendChild(right);
    },
    _paint: function () {
      if (!this._clock) return;
      var ang = Core.handAngles(this.setHour, this.setMinute);
      this._clock.hourG.g.setAttribute('transform', 'rotate(' + ang.hour.toFixed(2) + ' 50 50)');
      this._clock.minG.g.setAttribute('transform', 'rotate(' + ang.minute.toFixed(2) + ' 50 50)');
      if (this._readoutEl) this._readoutEl.textContent = this.setHour + ':' + (this.setMinute < 10 ? '0' : '') + this.setMinute;
    },
    _commit: function () {
      if (Core.isCorrectSet(this.round, this.setHour, this.setMinute)) this._correct();
      else this._wrongSilent();
    },

    /* ----- ORDER: three set clocks ----- */
    _renderOrder: function (main) {
      var self = this, api = this.api;
      var row = api.el('div', 'crd-clockrow');
      this.round.clocks.forEach(function (cl, i) {
        var wrap = api.el('button', 'crd-clockbtn' + (self.picked === i ? ' crd-picked' : '')); wrap.type = 'button'; wrap.setAttribute('data-i', i);
        wrap.setAttribute('aria-label', (LANG === 'de' ? 'Uhr ' : (LANG === 'fr' ? 'horloge ' : 'clock ')) + (i + 1));
        var c = buildClock(cl.hour, cl.minute, { draggable: false, mini: true }, null);
        wrap.appendChild(c.svg);
        if (!self.solved) wrap.addEventListener('click', function () { self._pickClock(i); });
        row.appendChild(wrap);
      });
      main.appendChild(row);
    },
    _pickClock: function (i) {
      this.picked = i;
      if (Core.isCorrectOrder(this.round, i)) this._correct();
      else this._wrongSilent();
    },

    /* ----- outcomes ----- */
    _correct: function () {
      var self = this, api = this.api;
      this.solved = true;
      var tt = this.round.targetTime || this.round.askEvent;
      var word = wordFor(tt.hour, tt.minute);
      var evLabel = this._eventLabel();
      this.msg = api.t('owlWin') + word + (evLabel ? (' — ' + evLabel + '!') : '!');
      this.api.sound && this.api.sound(880);
      this.render();
      api.announce && api.announce(this.msg);
      setTimeout(function () { speak(word + (evLabel ? '. ' + evLabel + '!' : '!')); }, 250);
    },
    _eventLabel: function () {
      var r = this.round;
      if (r.mode === 'read') { var e = r.events.find(function (x) { return x.id === Core.correctEventId(r); }); return e ? eventLabel(e.label) : ''; }
      if (r.mode === 'order') return eventLabel(r.askEvent.label);
      return '';
    },
    _wrongSilent: function () {
      /* the cuckoo peeks and tucks back in — SILENT (no color/sound/red); instant re-try */
      var self = this;
      this.picked = null; this.msg = null;
      this.render();
      api_announce_safe(this.api, ' ');
    },

    _renderDayArc: function (root) {
      var api = this.api, total = (this._pool && this._pool.length) || 14;
      var v = api.el('div', 'crd-arc'); v.setAttribute('aria-hidden', 'true');
      var sun = api.el('span', 'crd-sun'); sun.textContent = this.dayArc >= total ? '🌙' : '☀️';
      sun.style.left = Math.round(100 * Math.min(1, (this.dayArc - 0.5) / total)) + '%';
      var track = api.el('div', 'crd-track'); track.appendChild(sun);
      v.appendChild(track); root.appendChild(v);
    },

    isCorrect: function () { return this.solved; },
    reset: function () { this.setupTask(this.round); this.dayArc = Math.max(0, this.dayArc - 1); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]); var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n); if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/clock-read-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) {
          var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return;
          self._activityRow = row;
          self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); }));
          self._order = null;
          if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
        })
        .catch(function (e) { if (global.console && console.warn) console.warn('[clock-read] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.crd-root{position:relative;width:100%;max-width:min(96vw,640px);margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#FBF3E4,#EAF0F6);border-radius:18px;padding:clamp(6px,1.6vw,11px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.crd-saytop{display:flex;align-items:center;gap:8px;justify-content:center;font:700 clamp(12px,3.1vw,15px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.crd-cuckoo{font-size:clamp(22px,5.5vw,30px);flex:0 0 auto;}.crd-coo{animation:crdPop .4s ease;}'
        + '@keyframes crdPop{0%{transform:translateY(6px) scale(.6)}60%{transform:translateY(-3px) scale(1.15)}100%{transform:none}}'
        /* main = 2 columns at EVERY width (clock | cards/commit) so the block
           height is max(), not sum() — the clock never stacks above its
           controls. order is its own full-width row of 3 clocks. */
        + '.crd-main{display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center;justify-content:center;gap:clamp(8px,2.4vw,20px);}'
        + '.crd-left{flex:0 0 auto;}'
        + '.crd-right{flex:1 1 auto;display:flex;flex-direction:column;gap:clamp(6px,1.4vw,9px);align-items:center;min-width:104px;}'
        /* the clock */
        + '.crd-svg{width:clamp(118px,45vw,194px)!important;height:auto!important;aspect-ratio:1!important;display:block;touch-action:none;}'
        + '.crd-svg.crd-mini{width:clamp(76px,24vw,106px)!important;}'
        + '.crd-hand{cursor:grab;touch-action:none;}.crd-vis{pointer-events:none;transition:stroke-width .1s;}.crd-hit{cursor:grab;}'
        + '.crd-hand:focus-visible{outline:none;}.crd-hand:focus-visible .crd-vis{stroke-width:7;}'
        + '.crd-readout{font:800 clamp(20px,5vw,26px)/1 "Baloo 2",sans-serif;color:' + C.T + ';background:#fff;border:2px solid ' + C.T + ';border-radius:12px;padding:3px 14px;min-width:74px;text-align:center;letter-spacing:1px;}'
        + '.crd-cue{font-size:clamp(34px,9vw,52px);line-height:1;}'
        /* read cards */
        + '.crd-cards{display:flex;flex-direction:column;gap:clamp(6px,1.6vw,9px);width:100%;max-width:300px;}'
        + '.crd-card{display:flex;align-items:center;gap:10px;text-align:left;padding:8px 12px;border-radius:14px;border:2px solid rgba(20,107,94,.2);background:#fff;cursor:pointer;min-height:52px;box-shadow:0 2px 0 rgba(160,120,60,.14);touch-action:manipulation;}'
        + '.crd-card.crd-picked{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.3);}'
        + '.crd-emoji{font-size:clamp(22px,6vw,28px);flex:0 0 auto;}'
        + '.crd-cardbody{display:flex;flex-direction:column;gap:1px;min-width:0;flex:1 1 auto;}'
        + '.crd-cardtext{font:800 clamp(13px,3.4vw,16px)/1.15 "Baloo 2",sans-serif;color:' + C.INK + ';overflow-wrap:break-word;word-break:break-word;}'
        + '.crd-cardtime{font:700 clamp(11px,2.9vw,13px)/1.1 "Nunito",sans-serif;color:' + C.T + ';overflow-wrap:break-word;}'
        + '.crd-card:active{transform:translateY(1px);}'
        /* set commit */
        + '.crd-wake{min-height:50px;padding:0 clamp(18px,5vw,28px);border-radius:26px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.crd-wake:active{transform:translateY(2px);}'
        /* order */
        + '.crd-clockrow{flex:1 1 100%;width:100%;display:flex;flex-wrap:wrap;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.crd-clockbtn{padding:5px;border-radius:14px;border:2px solid rgba(20,107,94,.18);background:#fff;cursor:pointer;touch-action:manipulation;min-height:44px;}'
        + '.crd-clockbtn.crd-picked{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.3);}'
        /* day-arc vessel */
        + '.crd-arc{width:100%;display:flex;justify-content:center;}'
        + '.crd-track{position:relative;width:min(90%,360px);height:13px;border-radius:7px;background:linear-gradient(90deg,#FCE9C8,#CFE0F2,#2A3550);}'
        + '.crd-sun{position:absolute;top:-4px;transform:translateX(-50%);font-size:16px;line-height:1;transition:left .4s;}'
        + '.crd-card:focus-visible,.crd-wake:focus-visible,.crd-clockbtn:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* phones */
        + '@media (max-width:480px){.crd-root{gap:5px;padding:8px;}.crd-saytop{font-size:12px;}.crd-card{min-height:50px;}.crd-wake{min-height:48px;}}'
        /* small phones + short viewports: trim the clock + chrome so the
           controls + the shell Check clear the fold. */
        + '@media (max-height:760px), (max-width:380px){.crd-root{gap:4px;padding:6px;}.crd-main{gap:8px;}.crd-left,.crd-right{gap:6px;}.crd-saytop{font-size:11px;}.crd-cuckoo{font-size:22px;}.crd-svg{width:clamp(100px,35vw,144px)!important;}.crd-readout{font-size:19px;min-height:30px;padding:2px 12px;}.crd-card{min-height:46px;padding:6px 9px;}.crd-cardtext{font-size:12px;}.crd-cardtime{font-size:11px;}.crd-wake{min-height:46px;}.crd-arc .crd-track{height:12px;}.crd-svg.crd-mini{width:clamp(70px,23vw,92px)!important;}.crd-cue{font-size:32px;}}'
        + '@media (max-width:340px) and (max-height:660px){.crd-svg{width:clamp(96px,33vw,134px)!important;}.crd-card{min-height:44px;}.crd-cardtext{font-size:12.5px;}.crd-wake{min-height:44px;}.crd-clockbtn{min-height:44px;}.crd-cuckoo{font-size:20px;}}'
        + '@media (prefers-reduced-motion: reduce){.crd-coo{animation:none!important;}.crd-sun{transition:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-clock-read', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function api_announce_safe(api, msg) { if (api && api.announce) api.announce(msg); }

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'clock-read.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
