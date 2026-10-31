/* =====================================================================
   author-purpose-activity.js — ACTIVITY #174 of the one-by-one rebuild:
   "The Harbor Post" (RI.2.6) → THE THREE HARBOR MACHINES.
   Model: harbor-machines-core.js; notes: harbor-machines-data.js. Design:
   docs/activities-rebuild/designs/174-author-purpose.md
   ---------------------------------------------------------------------
   Marlow the pelican holds a short note. Along the quay stand three
   machines, each running only on its own kind of sentence: the lighthouse
   lights a lamp for every FACT, the stage lights a footlight (and its
   curtain rises a third) for every bit of STORY, the crane lifts a crate
   for every STEP that tells you what to do. The child taps a machine to
   post the note there (that is the Check). The machine reads the note
   sentence by sentence; when more than half of the sentences are its kind
   it RUNS (beam sweeps, curtain opens, ship sails) — the author's main
   purpose. Otherwise it sputters, and every sentence gets the shape of the
   machine it would power. A second miss reads the note in every machine
   at once, so the child can count. Next appears .OK_MS after success.
   ===================================================================== */
var AuthorPurposeActivity = {
  id: 'author-purpose-activity',
  /* the drawn apparatus (quay, machines, part icons, curtain, crane, note paper, pigeonholes): declared for the hierarchy audit */
  apparatusClasses: ['hm-'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"The Harbor Post","de":"Marlows Hafenpost","fr":"Le courrier du port de Marlow","es":"El correo del puerto de Marlow","pt":"O correio do porto do Marujo","it":"La posta del porto di Marino","nl":"De havenpost van Marlow","sv":"Marlows hamnpost","da":"Marlows havnepost","no":"Marlows havnepost","fi":"Marlow’n satamaposti"},
    instruction: {"en":"Read the note, then tap the machine it powers.","de":"Lies die Notiz und tippe auf die Maschine, die sie antreibt.","fr":"Lis la note, puis touche la machine qu’elle fait marcher.","es":"Lee la nota y toca la máquina que hace funcionar.","pt":"Leia o bilhete e toque na máquina que ele faz funcionar.","it":"Leggi il biglietto e tocca la macchina che fa funzionare.","nl":"Lees het briefje en tik op de machine die het laat werken.","sv":"Läs lappen och tryck på maskinen som den får igång.","da":"Læs sedlen, og tryk på den maskine, den får til at køre.","no":"Les lappen og trykk på maskinen den får i gang.","fi":"Lue lappu ja napauta konetta, jonka se saa käyntiin."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Comprobar","pt":"Verificar","it":"Verifica","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    qWhy: {"en":"Why did the author write this note?","de":"Warum hat der Autor diese Notiz geschrieben?","fr":"Pourquoi l’auteur a-t-il écrit cette note ?","es":"¿Para qué se escribió esta nota?","pt":"Para que este bilhete foi escrito?","it":"Perché è stato scritto questo biglietto?","nl":"Waarom schreef de schrijver dit briefje?","sv":"Varför skrev författaren den här lappen?","da":"Hvorfor skrev forfatteren denne seddel?","no":"Hvorfor skrev forfatteren denne lappen?","fi":"Miksi kirjoittaja kirjoitti tämän lapun?"},
    hintOne: {"en":"Only one sentence powered this machine. Look at the shapes on the note.","de":"Nur ein Satz treibt diese Maschine an. Schau dir die Formen auf der Notiz an.","fr":"Une seule phrase fait marcher cette machine. Regarde les formes sur la note.","es":"Solo una oración hace funcionar esta máquina. Mira las figuras en la nota.","pt":"Só uma frase faz esta máquina funcionar. Olhe as formas no bilhete.","it":"Solo una frase fa funzionare questa macchina. Guarda le forme sul biglietto.","nl":"Maar één zin laat deze machine werken. Kijk naar de vormpjes op het briefje.","sv":"Bara en mening får igång den här maskinen. Titta på formerna på lappen.","da":"Kun én sætning får maskinen til at køre. Se på figurerne på sedlen.","no":"Bare én setning får i gang denne maskinen. Se på formene på lappen.","fi":"Vain yksi lause saa tämän koneen käyntiin. Katso lapun kuvioita."},
    hintNone: {"en":"No sentence powered this machine. Look at the shapes on the note.","de":"Kein Satz treibt diese Maschine an. Schau dir die Formen auf der Notiz an.","fr":"Aucune phrase ne fait marcher cette machine. Regarde les formes sur la note.","es":"Ninguna oración hace funcionar esta máquina. Mira las figuras en la nota.","pt":"Nenhuma frase faz esta máquina funcionar. Olhe as formas no bilhete.","it":"Nessuna frase fa funzionare questa macchina. Guarda le forme sul biglietto.","nl":"Geen enkele zin laat deze machine werken. Kijk naar de vormpjes op het briefje.","sv":"Ingen mening får igång den här maskinen. Titta på formerna på lappen.","da":"Ingen sætning får maskinen til at køre. Se på figurerne på sedlen.","no":"Ingen setning får i gang denne maskinen. Se på formene på lappen.","fi":"Mikään lause ei saa tätä konetta käyntiin. Katso lapun kuvioita."},
    hintMiss2: {"en":"Look at all the machines. Which one lit up the most?","de":"Schau dir alle Maschinen an. Welche leuchtet am meisten?","fr":"Regarde toutes les machines. Laquelle s’allume le plus ?","es":"Mira todas las máquinas. ¿Cuál se encendió más?","pt":"Olhe todas as máquinas. Qual acendeu mais?","it":"Guarda tutte le macchine. Quale si è accesa di più?","nl":"Kijk naar alle machines. Welke licht het meest op?","sv":"Titta på alla maskinerna. Vilken lyser mest?","da":"Se på alle maskinerne. Hvilken lyser mest?","no":"Se på alle maskinene. Hvilken lyser mest?","fi":"Katso kaikkia koneita. Mikä niistä syttyi eniten?"},
    okInform: {"en":"Lights on! {w}","de":"Licht an! {w}","fr":"Lumière ! {w}","es":"¡Luces! {w}","pt":"Luzes acesas! {w}","it":"Luce accesa! {w}","nl":"Licht aan! {w}","sv":"Ljuset tänds! {w}","da":"Lyset tændes! {w}","no":"Lyset tennes! {w}","fi":"Valot syttyvät! {w}"},
    okEntertain: {"en":"Curtain up! {w}","de":"Vorhang auf! {w}","fr":"Lever de rideau ! {w}","es":"¡Se abre el telón! {w}","pt":"Abram as cortinas! {w}","it":"Si apre il sipario! {w}","nl":"Doek op! {w}","sv":"Ridån går upp! {w}","da":"Tæppet går op! {w}","no":"Teppet går opp! {w}","fi":"Esirippu nousee! {w}"},
    okInstruct: {"en":"All loaded! {w}","de":"Alles verladen! {w}","fr":"Tout est chargé ! {w}","es":"¡Todo cargado! {w}","pt":"Tudo carregado! {w}","it":"Tutto caricato! {w}","nl":"Alles geladen! {w}","sv":"Allt är lastat! {w}","da":"Alt er læsset! {w}","no":"Alt er lastet! {w}","fi":"Kaikki lastattu! {w}"},
    mostlyFirst: {"en":"The first sentence is just a little extra.","de":"Der erste Satz ist nur eine kleine Zugabe.","fr":"La première phrase n’est qu’un petit plus.","es":"La primera oración es solo un extra.","pt":"A primeira frase é só um extra.","it":"La prima frase è solo un piccolo extra.","nl":"De eerste zin is maar een extraatje.","sv":"Den första meningen är bara lite extra.","da":"Den første sætning er bare lidt ekstra.","no":"Den første setningen er bare litt ekstra.","fi":"Ensimmäinen lause on vain pieni lisä."},
    mostlyLast: {"en":"The last sentence is just a little extra.","de":"Der letzte Satz ist nur eine kleine Zugabe.","fr":"La dernière phrase n’est qu’un petit plus.","es":"La última oración es solo un extra.","pt":"A última frase é só um extra.","it":"L’ultima frase è solo un piccolo extra.","nl":"De laatste zin is maar een extraatje.","sv":"Den sista meningen är bara lite extra.","da":"Den sidste sætning er bare lidt ekstra.","no":"Den siste setningen er bare litt ekstra.","fi":"Viimeinen lause on vain pieni lisä."},
    setNotes: {"en":"Notes","de":"Notizen","fr":"Notes","es":"Notas","pt":"Bilhetes","it":"Biglietti","nl":"Briefjes","sv":"Lappar","da":"Sedler","no":"Lapper","fi":"Laput"},
    nFirst: {"en":"First look","de":"Erster Blick","fr":"Premier coup d’œil","es":"Primera vista","pt":"Primeira olhada","it":"Primo sguardo","nl":"Eerste kennismaking","sv":"Första titt","da":"Første kig","no":"Første titt","fi":"Ensi kurkistus"},
    nMostly: {"en":"Mostly …","de":"Vor allem …","fr":"Surtout …","es":"Sobre todo …","pt":"Principalmente …","it":"Soprattutto …","nl":"Vooral …","sv":"Mest …","da":"Mest …","no":"Mest …","fi":"Enimmäkseen …"},
    setMachines: {"en":"Machines","de":"Maschinen","fr":"Machines","es":"Máquinas","pt":"Máquinas","it":"Macchine","nl":"Machines","sv":"Maskiner","da":"Maskiner","no":"Maskiner","fi":"Koneet"},
    mThree: {"en":"Three","de":"Drei","fr":"Trois","es":"Tres","pt":"Três","it":"Tre","nl":"Drie","sv":"Tre","da":"Tre","no":"Tre","fi":"Kolme"},
    mTwo: {"en":"Two","de":"Zwei","fr":"Deux","es":"Dos","pt":"Duas","it":"Due","nl":"Twee","sv":"Två","da":"To","no":"To","fi":"Kaksi"},
    nInform: {"en":"Lighthouse","de":"Leuchtturm","fr":"Phare","es":"Faro","pt":"Farol","it":"Faro","nl":"Vuurtoren","sv":"Fyr","da":"Fyrtårn","no":"Fyr","fi":"Majakka"},
    nEntertain: {"en":"Stage","de":"Bühne","fr":"Scène","es":"Escenario","pt":"Palco","it":"Palco","nl":"Podium","sv":"Scen","da":"Scene","no":"Scene","fi":"Näyttämö"},
    nInstruct: {"en":"Crane","de":"Kran","fr":"Grue","es":"Grúa","pt":"Guindaste","it":"Gru","nl":"Kraan","sv":"Kran","da":"Kran","no":"Kran","fi":"Nosturi"},
    aSentence: {"en":"Sentence {i}: {t}","de":"Satz {i}: {t}","fr":"Phrase {i} : {t}","es":"Oración {i}: {t}","pt":"Frase {i}: {t}","it":"Frase {i}: {t}","nl":"Zin {i}: {t}","sv":"Mening {i}: {t}","da":"Sætning {i}: {t}","no":"Setning {i}: {t}","fi":"Lause {i}: {t}"},
    aSentenceDot: {"en":"Sentence {i} ({name}): {t}","de":"Satz {i} ({name}): {t}","fr":"Phrase {i} ({name}) : {t}","es":"Oración {i} ({name}): {t}","pt":"Frase {i} ({name}): {t}","it":"Frase {i} ({name}): {t}","nl":"Zin {i} ({name}): {t}","sv":"Mening {i} ({name}): {t}","da":"Sætning {i} ({name}): {t}","no":"Setning {i} ({name}): {t}","fi":"Lause {i} ({name}): {t}"},
    aMachine: {"en":"{name} — {sign}. {k} of 3 lit.","de":"{name} – {sign}. {k} von 3 leuchten.","fr":"{name} : {sign}. {k} sur 3 allumés.","es":"{name}: {sign}. {k} de 3 encendidas.","pt":"{name}: {sign}. {k} de 3 acesas.","it":"{name}: {sign}. {k} su 3 accese.","nl":"{name}: {sign}. {k} van 3 aan.","sv":"{name}: {sign}. {k} av 3 tända.","da":"{name}: {sign}. {k} af 3 tændt.","no":"{name}: {sign}. {k} av 3 tent.","fi":"{name}: {sign}. {k}/3 syttynyt."},
    aRead: {"en":"{name}: {n} of {m}.","de":"{name}: {n} von {m}.","fr":"{name} : {n} sur {m}.","es":"{name}: {n} de {m}.","pt":"{name}: {n} de {m}.","it":"{name}: {n} su {m}.","nl":"{name}: {n} van {m}.","sv":"{name}: {n} av {m}.","da":"{name}: {n} af {m}.","no":"{name}: {n} av {m}.","fi":"{name}: {n}/{m}."},
    aMarlow: {"en":"Marlow the pelican","de":"Marlow, der Pelikan","fr":"Marlow le pélican","es":"Marlow el pelícano","pt":"O pelicano Marujo","it":"Il pellicano Marino","nl":"Marlow de pelikaan","sv":"Pelikanen Marlow","da":"Pelikanen Marlow","no":"Pelikanen Marlow","fi":"Pelikaani Marlow"}
  },/*STRINGS-END*/
  defaults: { notes: 'first', machines: 'three' },
  settings: [
    { key: 'notes', type: 'choice', labelKey: 'setNotes', options: [{ value: 'first', labelKey: 'nFirst' }, { value: 'mostly', labelKey: 'nMostly' }] },
    { key: 'machines', type: 'choice', labelKey: 'setMachines', options: [{ value: 'three', labelKey: 'mThree' }, { value: 'two', labelKey: 'mTwo' }] }
  ],
  OK_MS: 500, FAST: false,
  STEP_MS: 220,
  PICS: { pelican: 'beach/pelican', inform: 'beach/lighthouse', entertain: 'music/stage', instruct: 'vehicles/ship' },
  /* each machine's colour and shape — the same shape marks a sentence of its kind */
  LOOK: { inform: { c: '#D99A12', shape: 'circle' }, entertain: { c: '#C8433A', shape: 'tri' }, instruct: { c: '#2F6FB0', shape: 'square' } },
  NAME_KEY: { inform: 'nInform', entertain: 'nEntertain', instruct: 'nInstruct' },
  OK_KEY: { inform: 'okInform', entertain: 'okEntertain', instruct: 'okInstruct' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this.filed = { inform: 0, entertain: 0, instruct: 0 };
    injectHarborMachinesCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return HarborMachinesCore.levelOf(this._setting('notes')); },
  _machines: function () { return HarborMachinesCore.machinesOf(this._setting('machines')); },
  _loc: function () { return HarborMachinesCore.locOf(this.api && this.api.lang); },
  _key: function () { return this._level() + '.' + this._machines(); },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _sign: function (m) { return HarborMachinesData[this._loc()].labels[m]; },
  /* French spacing: a narrow no-break space before ! ? : ; so the mark never wraps alone */
  _typo: function (s) { return this._loc() === 'fr' ? String(s).replace(/ ([!?:;»])/g, ' $1').replace(/« /g, '« ') : String(s); },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = HarborMachinesCore.rounds(this._loc(), this._level(), this._machines()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = HarborMachinesCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(pool, Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'harbor-machines.' + this._key() + '.' + pool[k].id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._t('qWhy'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers();
    this.st = HarborMachinesCore.newState(this._loc(), this._level(), this._machines(), k);
    this._view = { note: '', soft: false, reading: -1, lit: {}, dots: false, run: null, sputter: null, said: null };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'hm-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="hm-top"><div class="hm-paper" data-qa="note"></div><div class="hm-side" data-qa="side"></div></div><div class="hm-quay" data-qa="quay"></div><p class="hm-hint" data-qa="hint" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    var self = this;
    wrap.addEventListener('keydown', function (e) {
      if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
      var m = { '1': 'inform', '2': 'entertain', '3': 'instruct' }[e.key];
      if (m && self.st && self.st.list.indexOf(m) >= 0) { e.preventDefault(); self._post(m); }
    });
    /* tap a sentence (or Enter / Space on it): it is read aloud where the browser has a voice */
    wrap.addEventListener('click', function (e) { var li = e.target.closest && e.target.closest('.hm-line'); if (li) self._say(+li.getAttribute('data-i')); });
    wrap.addEventListener('keydown', function (e) { var li = e.target.closest && e.target.closest('.hm-line'); if (li && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); self._say(+li.getAttribute('data-i')); } });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _say: function (i) {
    var x = this.st && this.st.note.s[i]; if (!x) return;
    this._view.said = i; this._paint();
    if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'ui', text: x.t, lang: this.api.lang, rate: 0.9 }); } catch (e) {} }
    var self = this; this._later(function () { if (self._view.said === i) { self._view.said = null; if (self._wrap) self._paint(); } }, 1600);
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _paint_: function () {
    var st = this.st, v = this._view, W = this._width(), wide = W >= 600, cramp = W < 300;
    this._g = { W: W, wide: wide, cramp: cramp };
    this._wrap.setAttribute('lang', this._loc());
    this._wrap.className = 'hm-wrap is-' + st.level + ' is-' + st.machines + (wide ? ' is-wide' : ' is-narrow') + (cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (st.help ? ' is-help' : '');
    this._paintNote(); this._paintSide(); this._paintQuay();
    var h = this._qs('.hm-hint');
    h.textContent = v.note || ''; h.className = 'hm-hint' + (v.note && !v.soft ? ' is-hint' : '');
    this._setPrompt();
  },
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); },
  _btn: function (cls, k, label, html) { var b = document.createElement('button'); b.type = 'button'; b.className = cls; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  /* a machine's shape icon (svg, drawn): circle = lamp, triangle = footlight, square = crate */
  _shape: function (m, on, cls) {
    var L = this.LOOK[m], fill = on ? L.c : '#FFFDF6', stroke = on ? L.c : '#8A7A5C', d;
    if (L.shape === 'circle') d = '<circle cx="12" cy="12" r="8.5" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2.4"/>' + (on ? '<circle cx="12" cy="12" r="11" fill="none" stroke="' + L.c + '" stroke-opacity=".35" stroke-width="2"/>' : '');
    else if (L.shape === 'tri') d = '<path d="M12 3.5 21 19.5H3Z" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2.4" stroke-linejoin="round"/>';
    else d = '<rect x="3.5" y="5" width="17" height="15" rx="2" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2.4"/>' + (on ? '<path d="M3.5 12.5h17M12 5v15" stroke="#FFFDF6" stroke-opacity=".7" stroke-width="1.6"/>' : '');
    return '<svg class="' + (cls || 'hm-shape') + '" viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>';
  },

  /* ---- the note on Marlow's paper ---- */
  _paintNote: function () {
    var st = this.st, v = this._view, g = this._g, el = this._qs('.hm-paper'), self = this, C = HarborMachinesCore;
    var html = '';
    if (!g.wide) html += '<img class="hm-marlow" src="' + this._pic(this.PICS.pelican) + '" alt="' + this._esc(this._t('aMarlow')) + '" draggable="false">';
    html += '<ol class="hm-lines' + (v.dots ? ' has-dots' : '') + '">';
    st.note.s.forEach(function (x, i) {
      var m = C.dotOf(x), dot = v.dots && m && st.list.indexOf(m) >= 0;
      var lab = dot ? self._t('aSentenceDot', { i: i + 1, name: self._t(self.NAME_KEY[m]), t: x.t }) : self._t('aSentence', { i: i + 1, t: x.t });
      html += '<li class="hm-line' + (v.reading === i ? ' is-reading' : '') + (v.said === i ? ' is-said' : '') + '" data-i="' + i + '" tabindex="0" aria-label="' + self._esc(lab) + '">'
        + '<span class="hm-dot" aria-hidden="true">' + (dot ? self._shape(m, true, 'hm-shape') : '') + '</span>'
        + '<span class="hm-txt">' + self._esc(self._typo(x.t)) + '</span></li>';
    });
    html += '</ol>';
    el.innerHTML = html;
  },
  /* ---- Marlow and the pigeonholes (wide screens) ---- */
  _paintSide: function () {
    var el = this._qs('.hm-side'), self = this;
    if (!this._g.wide) { el.innerHTML = ''; return; }
    var cols = this.st.list.map(function (m) {
      var n = Math.min(self.filed[m], 8), toks = '';
      for (var i = 0; i < n; i++) toks += '<i style="background:' + self.LOOK[m].c + '"></i>';
      return '<div class="hm-hole">' + self._shape(m, false, 'hm-hole-ico') + '<div class="hm-toks">' + toks + '</div></div>';
    }).join('');
    el.innerHTML = '<img class="hm-marlow" src="' + this._pic(this.PICS.pelican) + '" alt="' + this._esc(this._t('aMarlow')) + '" draggable="false"><div class="hm-holes" aria-hidden="true">' + cols + '</div>';
  },
  /* ---- the quay: the machines ---- */
  _lit: function (m) {
    var st = this.st, v = this._view, C = HarborMachinesCore;
    if (v.lit[m] != null) return v.lit[m];
    if (st.done && st.posted === m) return 3;
    if (st.help && !st.done) return C.partsLit(C.read(st.note, m));
    return 0;
  },
  _paintQuay: function () {
    var st = this.st, v = this._view, el = this._qs('.hm-quay'), self = this;
    el.innerHTML = '<div class="hm-sea" aria-hidden="true"></div>';
    var row = document.createElement('div'); row.className = 'hm-row';
    st.list.forEach(function (m, idx) {
      var k = self._lit(m), runs = v.run === m, sp = v.sputter === m;
      var lab = self._t('aMachine', { name: self._t(self.NAME_KEY[m]), sign: self._sign(m), k: k });
      var b = self._btn('hm-mach hm-' + m + (runs ? ' is-run' : '') + (sp ? ' is-sputter' : '') + (st.posted === m && !st.done && !st.help ? ' is-posted' : ''), 'mach-' + m, lab, self._machineHtml(m, k, runs));
      b.disabled = st.done || v.reading >= 0;
      b.addEventListener('click', function () { self._post(m); });
      row.appendChild(b);
    });
    el.appendChild(row);
  },
  _machineHtml: function (m, k, runs) {
    var parts = '', i, over = '';
    for (i = 0; i < 3; i++) parts += this._shape(m, i < k, 'hm-part');
    if (m === 'inform') over = '<svg class="hm-beam" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 22 L100 6 L100 40 Z" fill="#FFE27A" opacity=".75"/><path d="M50 22 L0 6 L0 40 Z" fill="#FFE27A" opacity=".55"/></svg>';
    if (m === 'entertain') over = '<div class="hm-curtain" style="height:' + Math.max(0, 60 - 20 * k) + '%" aria-hidden="true"></div><div class="hm-spot" aria-hidden="true"></div>';
    if (m === 'instruct') {
      var cr = '';
      for (i = 0; i < 3; i++) cr += '<rect class="hm-crate' + (i < k ? ' is-up' : '') + '" x="' + (8 + i * 12) + '" y="' + (i < k ? 40 : 82) + '" width="10" height="9" rx="1.2"/>';
      over = '<svg class="hm-crane" viewBox="0 0 100 100" aria-hidden="true"><path d="M6 96V14M6 16H44M44 16V' + (k > 0 && k < 3 ? '34' : '26') + '" fill="none" stroke="#5B4A33" stroke-width="2.4" stroke-linecap="round"/>' + cr + '</svg>';
    }
    return '<span class="hm-art"><img class="hm-pic" src="' + this._pic(this.PICS[m]) + '" alt="" draggable="false">' + over + '</span>'
      + '<span class="hm-parts">' + parts + '</span>'
      + '<span class="hm-sign">' + this._esc(this._sign(m)) + '</span>';
  },

  /* ---------------- posting = the Check ---------------- */
  _post: function (m) {
    var st = this.st, v = this._view, C = HarborMachinesCore, self = this;
    if (st.done || v.reading >= 0) return;
    var res = C.post(st, m);
    if (res.result === 'no') return;
    this.api.sound(320);
    var rd = res.read, n = st.note.s.length;
    v.note = ''; v.run = null; v.sputter = null; v.dots = false; v.lit = {}; v.lit[m] = 0;
    var finish = function () {
      v.reading = -1;
      if (res.result === 'ok') { v.lit = {}; self._success(m); return; }
      v.sputter = m; v.dots = true;
      if (st.help) v.lit = {};
      else { v.lit = {}; v.lit[m] = C.partsLit(rd); }
      v.soft = false; v.note = st.help ? self._t('hintMiss2') : self._t(rd.powered.length ? 'hintOne' : 'hintNone');
      self.api.sound(150);
      self._paint();
      self.api.announce(self._t('aRead', { name: self._t(self.NAME_KEY[m]), n: rd.powered.length, m: n }) + ' ' + v.note);
    };
    if (this.FAST) { finish(); return; }
    /* the machine reads the note, one sentence at a time */
    var lit = 0;
    st.note.s.forEach(function (x, i) {
      self._later(function () {
        v.reading = i;
        if (rd.powered.indexOf(i) >= 0) { lit = Math.min(3, lit + 1); v.lit[m] = lit; self.api.sound(600 + 90 * lit); } else self.api.sound(140);
        self._paint();
      }, self.STEP_MS * (i + 1));
    });
    this._later(finish, this.STEP_MS * (n + 1) + 120);
    v.reading = n; /* busy: blocks a second post during the reading */
    this._paint();
  },
  _success: function (m) {
    var st = this.st, v = this._view, C = HarborMachinesCore, mo = C.mostly(st.note);
    var msg = this._t(this.OK_KEY[m], { w: st.note.w }) + (mo ? ' ' + this._t(mo.pos === 'first' ? 'mostlyFirst' : 'mostlyLast') : '');
    v.run = m; v.note = ''; v.dots = false; this.filed[m]++;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg); this.api.sound(660); var self = this; this._later(function () { self.api.sound(990); }, 160);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectHarborMachinesCSS() {
  if (typeof document === 'undefined' || document.getElementById('hm-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif";
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.hm-wrap{position:relative;width:100%;max-width:900px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:12px;} .hm-wrap:focus{outline:none;}'
  + '.hm-top{display:flex;gap:14px;align-items:stretch;}'
  + '.hm-paper{position:relative;flex:1 1 auto;min-width:0;padding:16px 16px 12px;background:#FFFDF6;border-radius:6px;box-shadow:0 2px 0 #E2D4B4,0 6px 14px rgba(60,40,10,.12);border-top:6px dashed #E9DCC0;}'
  + '.hm-lines{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:4px;}'
  + '.hm-line{display:flex;align-items:center;gap:8px;min-height:44px;padding:4px 8px;border-radius:8px;font:600 19px/1.4 ' + B + ';color:#2B2B2B;transition:background .15s;} .hm-line:focus-visible{outline:3px solid #146B5E;outline-offset:1px;} .hm-line.is-reading{background:#FFF1C6;} .hm-line{cursor:pointer;} .hm-line.is-said{background:#E3F2EE;}'
  + '.hm-dot{display:none;} .hm-lines.has-dots .hm-dot{flex:0 0 22px;width:22px;height:22px;display:flex;align-items:center;justify-content:center;} .hm-dot .hm-shape{width:22px;height:22px;}'
  + '.hm-txt{flex:1 1 auto;min-width:0;}'
  + '.hm-side{flex:0 0 132px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:8px;} .hm-wrap.is-narrow .hm-side{display:none;}'
  + '.hm-marlow{display:block;width:96px;height:96px;object-fit:contain;}'
  + '.hm-holes{display:flex;gap:6px;padding:6px;background:#C99B62;border-radius:8px;box-shadow:inset 0 2px 0 rgba(0,0,0,.15);} .hm-hole{width:34px;display:flex;flex-direction:column;align-items:center;gap:3px;padding:3px 0;background:#8C6339;border-radius:4px;} .hm-hole-ico{width:16px;height:16px;} .hm-toks{display:flex;flex-direction:column-reverse;gap:2px;min-height:36px;} .hm-toks i{display:block;width:22px;height:4px;border-radius:1px;}'
  + '.hm-wrap.is-narrow .hm-paper .hm-marlow{float:right;width:64px;height:64px;margin:-6px -6px 2px 6px;}'
  + '.hm-quay{position:relative;border-radius:16px;background:linear-gradient(#BFE3EE 0,#BFE3EE 40%,#C9A26E 40%,#B98A55 100%);box-shadow:inset 0 0 0 3px #A97E45;padding:10px 10px 12px;overflow:hidden;}'
  + '.hm-row{position:relative;display:flex;gap:10px;justify-content:center;}'
  + '.hm-mach{flex:1 1 0;min-width:0;max-width:220px;display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px 6px 10px;border:0;border-radius:14px;background:rgba(255,253,246,.72);box-shadow:0 3px 0 #9C7443;cursor:pointer;font:inherit;color:#2B2B2B;transition:transform .12s;}'
  + '.hm-mach:hover{transform:translateY(-2px);} .hm-mach:focus-visible{outline:3px solid #146B5E;outline-offset:2px;} .hm-mach:disabled{cursor:default;transform:none;}'
  + '.hm-mach.is-sputter{animation:hmShake .45s ease 1;} @keyframes hmShake{20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translateX(-3px)}80%{transform:translateX(2px)}}'
  + '.hm-art{position:relative;display:block;width:150px;height:150px;max-width:100%;}'
  + '.hm-pic{display:block;width:100%;height:100%;object-fit:contain;}'
  + '.hm-beam{position:absolute;inset:0;width:100%;height:100%;opacity:0;pointer-events:none;transform-origin:50% 22%;} .hm-mach.is-run .hm-beam{opacity:1;animation:hmSweep 1.6s ease-in-out infinite alternate;} @keyframes hmSweep{from{transform:rotate(-10deg)}to{transform:rotate(10deg)}}'
  + '.hm-curtain{position:absolute;left:22%;right:22%;top:20%;background:repeating-linear-gradient(90deg,#9E1F2B 0 7px,#B8303A 7px 14px);border-bottom:3px solid #6E141D;border-radius:0 0 6px 6px;transition:height .25s ease;pointer-events:none;}'
  + '.hm-spot{position:absolute;left:30%;right:30%;top:30%;bottom:22%;border-radius:50%;background:radial-gradient(#FFF3B0,rgba(255,243,176,0));opacity:0;pointer-events:none;} .hm-mach.is-run .hm-spot{opacity:.9;transition:opacity .4s;}'
  + '.hm-crane{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;} .hm-crate{fill:#C9893B;stroke:#7A4E1C;stroke-width:1.2;transition:y .25s ease;}'
  + '.hm-mach.hm-instruct.is-run .hm-pic{animation:hmSail 1.4s ease-in-out 1 forwards;} @keyframes hmSail{to{transform:translateX(10px)}}'
  + '.hm-parts{display:flex;gap:6px;justify-content:center;} .hm-part{width:24px;height:24px;}'
  + '.hm-sign{display:block;min-height:2.5em;font:800 15px/1.2 ' + H + ';text-align:center;color:#2B2B2B;}'
  + '.hm-hint{margin:0;min-height:1.3em;font:700 17px/1.3 ' + B + ';color:#146B5E;text-align:center;} .hm-hint.is-hint{color:#A3401F;} .hm-hint:empty{display:none;}'
  + '.hm-wrap.is-narrow{gap:8px;} .hm-wrap.is-narrow .hm-paper{padding:10px 10px 8px;} .hm-wrap.is-narrow .hm-line{font-size:17px;line-height:1.35;padding:3px 6px;}'
  + '.hm-wrap.is-narrow .hm-quay{padding:8px 6px 10px;} .hm-wrap.is-narrow .hm-row{gap:6px;} .hm-wrap.is-narrow .hm-mach{padding:6px 3px 8px;gap:4px;} .hm-wrap.is-narrow .hm-art{width:76px;height:76px;} .hm-wrap.is-narrow .hm-part{width:18px;height:18px;} .hm-wrap.is-narrow .hm-parts{gap:3px;} .hm-wrap.is-narrow .hm-sign{font-size:13px;min-height:3.6em;} .hm-wrap.is-narrow .hm-hint{font-size:15px;}'
  + '.hm-wrap.is-cramp .hm-line{font-size:16px;min-height:40px;} .hm-wrap.is-cramp .hm-art{width:64px;height:64px;} .hm-wrap.is-cramp .hm-sign{font-size:12px;} .hm-wrap.is-cramp .hm-paper .hm-marlow{width:52px;height:52px;}'
  + '.hm-wrap.is-two .hm-mach{max-width:240px;}'
  /* solved on a phone: the note and the quay step back so the success line and Next stay above the fold */
  + '.hm-wrap.is-narrow.is-done{gap:6px;} .hm-wrap.is-narrow.is-done .hm-paper{padding:6px 8px;} .hm-wrap.is-narrow.is-done .hm-line{font-size:14px;line-height:1.25;min-height:0;padding:1px 4px;} .hm-wrap.is-narrow.is-done .hm-paper .hm-marlow{width:40px;height:40px;margin:-2px -2px 0 4px;} .hm-wrap.is-narrow.is-done .hm-art{width:50px;height:50px;} .hm-wrap.is-narrow.is-done .hm-parts{display:none;} .hm-wrap.is-narrow.is-done .hm-sign{min-height:0;font-size:12px;} .hm-wrap.is-narrow.is-done .hm-quay{padding:5px 5px 6px;} .hm-wrap.is-narrow.is-done .hm-mach{padding:4px 8px;gap:8px;flex-direction:row;max-width:none;} .hm-wrap.is-narrow.is-done .hm-mach:not(.is-run){display:none;} .hm-wrap.is-narrow.is-done .hm-sign{text-align:left;font-size:14px;} .hm-wrap.is-narrow.is-done .hm-paper .hm-marlow{display:none;}'
  + '@media (prefers-reduced-motion:reduce){.hm-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'hm-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.AuthorPurposeActivity = AuthorPurposeActivity;
