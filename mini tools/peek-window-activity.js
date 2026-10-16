/* =====================================================================
   peek-window-activity.js — ACTIVITY #12 of the one-by-one rebuild:
   "How Many Are There?" (K.CC.B.5) — THE PEEK WINDOW.
   Design sheet: docs/activities-rebuild/012-peek-window.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: THE WINDOW THAT SHOWS, THEN HIDES. A little window with
   two shutters; behind it a group of library pictures in a shape teachers
   use in number talks (dice faces, five in a line and some more, pairs, a
   short line, a small scatter). The shutters swing open for a moment and
   close: the child reads the group as a whole and taps how many on the
   number rail; "Look again" opens it again, as often as wanted, never
   punished. Check: right → the pictures count themselves, the last number
   gold; wrong → the window stays open (count them); wrong again → the
   numbers run along the pictures to a "?" on the last one. Teacher setting:
   opens for a moment / a little longer / stays open. No mascot.

   ACTIVITY LAYER ONLY: the model is peek-window-core.js; pictures through
   lcs-pictures.js; lcs-shell.js is untouched.
   Test seams: window.PeekWindowActivity.st / ._order / ._pool.
   ===================================================================== */
'use strict';

var PeekWindowActivity = {
  id: 'peek-window',
  apparatusClasses: ['pw-'],

  strings: {
    title:          {en:'The Peek Window',de:'Das Guckfenster',fr:'La petite fenêtre',es:'La ventanita',pt:'A janelinha',it:'La finestrella',nl:'Het kijkraampje',sv:'Tittfönstret',da:'Kiggevinduet',no:'Kikkevinduet',fi:'Kurkistusikkuna'},
    instruction:    {en:'Look in the window. How many did you see? You can always look again.',de:'Schau ins Fenster. Wie viele hast du gesehen? Du kannst immer noch einmal schauen.',fr:'Regarde par la fenêtre. Combien en as-tu vu ? Tu peux toujours regarder encore.',es:'Mira por la ventana. ¿Cuántos viste? Siempre puedes volver a mirar.',pt:'Olhe pela janela. Quantos você viu? Você sempre pode olhar de novo.',it:'Guarda nella finestra. Quanti ne hai visti? Puoi sempre guardare di nuovo.',nl:'Kijk door het raampje. Hoeveel heb je gezien? Je mag altijd nog een keer kijken.',sv:'Titta i fönstret. Hur många såg du? Du kan alltid titta igen.',da:'Kig ind ad vinduet. Hvor mange så du? Du kan altid kigge igen.',no:'Kikk inn i vinduet. Hvor mange så du? Du kan alltid kikke igjen.',fi:'Katso ikkunaan. Montako näit? Voit aina katsoa uudelleen.'},
    prompt:         {en:'How many are behind the window? Tap the number, then press Check.',de:'Wie viele sind hinter dem Fenster? Tippe auf die Zahl und drücke dann auf Prüfen.',fr:'Combien y en a-t-il derrière la fenêtre ? Touche le nombre, puis appuie sur Vérifier.',es:'¿Cuántos hay detrás de la ventana? Toca el número y luego oprime Comprobar.',pt:'Quantos há atrás da janela? Toque no número e depois aperte Verificar.',it:'Quanti ce ne sono dietro la finestra? Tocca il numero, poi premi Verifica.',nl:'Hoeveel zijn er achter het raampje? Tik op het getal en druk dan op Controleer.',sv:'Hur många finns det bakom fönstret? Tryck på talet och tryck sedan på Kontrollera.',da:'Hvor mange er der bag vinduet? Tryk på tallet, og tryk så på Tjek.',no:'Hvor mange er det bak vinduet? Trykk på tallet, og trykk så på Sjekk.',fi:'Montako ikkunan takana on? Napauta lukua ja paina sitten Tarkista.'},
    lookAgain:      {en:'Look again',de:'Noch mal schauen',fr:'Regarder encore',es:'Mirar otra vez',pt:'Olhar de novo',it:'Guarda ancora',nl:'Nog een keer kijken',sv:'Titta igen',da:'Kig igen',no:'Kikk igjen',fi:'Katso uudelleen'},
    windowLabel:    {en:'The window',de:'Das Fenster',fr:'La fenêtre',es:'La ventana',pt:'A janela',it:'La finestra',nl:'Het raampje',sv:'Fönstret',da:'Vinduet',no:'Vinduet',fi:'Ikkuna'},
    railLabel:      {en:'How many?',de:'Wie viele?',fr:'Combien ?',es:'¿Cuántos?',pt:'Quantos?',it:'Quanti?',nl:'Hoeveel?',sv:'Hur många?',da:'Hvor mange?',no:'Hvor mange?',fi:'Montako?'},
    hintNone:       {en:'Tap how many you saw.',de:'Tippe auf die Zahl, die sagt, wie viele du gesehen hast.',fr:'Touche le nombre qui dit combien tu en as vu.',es:'Toca cuántos viste.',pt:'Toque em quantos você viu.',it:'Tocca quanti ne hai visti.',nl:'Tik op het getal: hoeveel heb je er gezien?',sv:'Tryck på hur många du såg.',da:'Tryk på, hvor mange du så.',no:'Trykk på hvor mange du så.',fi:'Napauta, montako näit.'},
    hintCount:      {en:'Not quite. The window stays open now — count them, then tap how many.',de:'Noch nicht ganz. Jetzt bleibt das Fenster offen – zähle sie und tippe dann auf die Zahl, die sagt, wie viele es sind.',fr:'Pas tout à fait. La fenêtre reste ouverte maintenant — compte-les, puis touche combien il y en a.',es:'Todavía no. Ahora la ventana se queda abierta: cuéntalos y luego toca cuántos hay.',pt:'Ainda não. Agora a janela fica aberta: conte e depois toque em quantos há.',it:'Non ancora. Ora la finestra resta aperta: contali, poi tocca quanti sono.',nl:'Nog niet helemaal. Het raampje blijft nu open – tel ze en tik dan op het getal dat zegt hoeveel het er zijn.',sv:'Inte riktigt. Nu får fönstret stå öppet – räkna dem och tryck sedan på hur många det är.',da:'Ikke helt. Nu bliver vinduet stående åbent – tæl dem, og tryk så på, hvor mange der er.',no:'Ikke helt. Nå blir vinduet stående åpent – tell dem, og trykk så på hvor mange det er.',fi:'Ei ihan. Nyt ikkuna pysyy auki – laske ne ja napauta sitten, montako niitä on.'},
    hintFive:       {en:'Not quite. The window stays open now. Five stand in one line — count on from five.',de:'Noch nicht ganz. Jetzt bleibt das Fenster offen. Fünf stehen in einer Reihe – zähle von fünf weiter.',fr:'Pas tout à fait. La fenêtre reste ouverte maintenant. Cinq sont alignés — continue à compter à partir de cinq.',es:'Todavía no. Ahora la ventana se queda abierta. Cinco están en línea: sigue contando desde cinco.',pt:'Ainda não. Agora a janela fica aberta. Cinco estão em linha: continue contando a partir do cinco.',it:'Non ancora. Ora la finestra resta aperta. Cinque sono in fila: continua a contare da cinque.',nl:'Nog niet helemaal. Het raampje blijft nu open. Vijf staan op een rij – tel verder vanaf vijf.',sv:'Inte riktigt. Nu får fönstret stå öppet. Fem står på rad – räkna vidare från fem.',da:'Ikke helt. Nu bliver vinduet stående åbent. Fem står på række – tæl videre fra fem.',no:'Ikke helt. Nå blir vinduet stående åpent. Fem står på rad – tell videre fra fem.',fi:'Ei ihan. Nyt ikkuna pysyy auki. Viisi on rivissä – jatka laskemista viidestä.'},
    hintCountOn:    {en:'Count along the numbers to the question mark. How many are there?',de:'Zähle an den Zahlen entlang bis zum Fragezeichen. Wie viele sind es?',fr:'Compte en suivant les nombres jusqu’au point d’interrogation. Combien y en a-t-il ?',es:'Cuenta siguiendo los números hasta el signo de interrogación. ¿Cuántos hay?',pt:'Conte seguindo os números até o ponto de interrogação. Quantos há?',it:'Conta seguendo i numeri fino al punto interrogativo. Quanti sono?',nl:'Tel mee met de getallen tot het vraagteken. Hoeveel zijn er?',sv:'Räkna med talen fram till frågetecknet. Hur många är det?',da:'Tæl med tallene hen til spørgsmålstegnet. Hvor mange er der?',no:'Tell med tallene fram til spørsmålstegnet. Hvor mange er det?',fi:'Laske lukujen mukana kysymysmerkkiin asti. Montako niitä on?'},
    celebrate:      {en:'Yes — {n}!',de:'Ja – {n}!',fr:'Oui — {n} !',es:'¡Sí, {n}!',pt:'Isso, {n}!',it:'Sì, {n}!',nl:'Ja – {n}!',sv:'Ja – {n}!',da:'Ja – {n}!',no:'Ja – {n}!',fi:'Hienoa – {n}!'},
    setRange:       {en:'Numbers',de:'Zahlen',fr:'Nombres',es:'Números',pt:'Números',it:'Numeri',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    rangeTo5:       {en:'Up to 5',de:'Bis 5',fr:'Jusqu’à 5',it:'Fino a 5',es:'Hasta 5',pt:'Até 5',nl:'Tot en met 5',sv:'Upp till 5',da:'Op til 5',no:'Opptil 5',fi:'5:een asti'},
    rangeTo10:      {en:'Up to 10',de:'Bis 10',fr:'Jusqu’à 10',it:'Fino a 10',es:'Hasta 10',pt:'Até 10',nl:'Tot en met 10',sv:'Upp till 10',da:'Op til 10',no:'Opptil 10',fi:'10:een asti'},
    setLook:        {en:'The window',de:'Das Fenster',fr:'La fenêtre',es:'La ventana',pt:'A janela',it:'La finestra',nl:'Het raampje',sv:'Fönstret',da:'Vinduet',no:'Vinduet',fi:'Ikkuna'},
    lookQuick:      {en:'Opens for a moment',de:'Geht kurz auf',fr:'S’ouvre un instant',es:'Se abre un momento',pt:'Abre por um instante',it:'Si apre per un attimo',nl:'Gaat even open',sv:'Öppnas en kort stund',da:'Åbner et øjeblik',no:'Åpner seg et øyeblikk',fi:'Aukeaa hetkeksi'},
    lookLong:       {en:'Opens a little longer',de:'Geht etwas länger auf',fr:'S’ouvre un peu plus longtemps',es:'Se abre un poco más',pt:'Abre um pouco mais',it:'Si apre un po’ di più',nl:'Gaat wat langer open',sv:'Öppnas lite längre',da:'Åbner lidt længere',no:'Åpner seg litt lenger',fi:'Aukeaa vähän pidemmäksi aikaa'},
    lookOpen:       {en:'Stays open (count)',de:'Bleibt offen (zählen)',fr:'Reste ouverte (compter)',es:'Se queda abierta (contar)',pt:'Fica aberta (contar)',it:'Resta aperta (contare)',nl:'Blijft open (tellen)',sv:'Står öppet (räkna)',da:'Står åbent (tælle)',no:'Står åpent (telle)',fi:'Pysyy auki (laske)'}
  },

  defaults: { range: 'to10', look: 'quick' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: 'to5', labelKey: 'rangeTo5' }, { value: 'to10', labelKey: 'rangeTo10' }] },
    { key: 'look', type: 'choice', labelKey: 'setLook', options: [{ value: 'quick', labelKey: 'lookQuick' }, { value: 'long', labelKey: 'lookLong' }, { value: 'open', labelKey: 'lookOpen' }] }
  ],

  FIRST_MS: 500,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._ro = null; this._themes = {}; this._timers = []; this._open = false; this._lookUntil = 0;
    injectPeekWindowCSS();
    if (typeof LCSPictures !== 'undefined') {
      PeekWindowCore.THEMES.forEach(function (th) {
        LCSPictures.load(th).then(function (theme) { self._themes[th] = theme; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () { /* that theme stays empty */ });
      });
    }
  },
  destroy: function () { if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } this._clearTimers(); },
  onSettings: function () {
    this._pool = null; this._order = null;
    if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },

  /* ---------------- rounds ---------------- */
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 640;
  },
  _range: function () { var r = this.api && this.api.settings && this.api.settings.range; return PeekWindowCore.POOLS[r] ? r : 'to10'; },
  _look: function () { var l = this.api && this.api.settings && this.api.settings.look; return PeekWindowCore.LOOKS.indexOf(l) >= 0 ? l : 'quick'; },
  _ensurePool: function () { var key = this._range(); if (!this._pool || this._poolKey !== key) { this._pool = PeekWindowCore.rounds(key, 'pw'); this._poolKey = key; this._order = null; } return this._pool; },
  _shuffled: function (n, prev) {
    var a = [], i, j, t;
    for (i = 0; i < n; i++) a.push(i);
    for (var g = 0; g < 10; g++) {
      for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; }
      if (!prev || n < 2 || a.join(',') !== prev.join(',')) break;
    }
    return a;
  },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length;
    var index = (opts && opts.index) || 0;
    if (!this._order || this._order.length !== n) { this._order = this._shuffled(n, null); this._curPass = Math.floor(index / n); }
    var pass = Math.floor(index / n);
    if (pass > this._curPass) { this._order = this._shuffled(n, this._order); this._curPass = pass; }
    var r = pool[this._order[index % n]];
    return {
      id: 'peek-window.' + r.id,
      promptKey: 'prompt',
      promptArgs: { n: r.n },
      celebrateKey: 'celebrate',
      answerType: 'state',
      setup: function (tool) { tool._clearTimers(); tool.st = PeekWindowCore.newState(r); tool._open = false; tool._fresh = true; tool._preload(); },
      check: function (tool) { var res = PeekWindowCore.check(tool.st); tool._afterCheck(res); return res.ok; },
      hintKey: function (tool) { return PeekWindowCore.hintKey(tool.st); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this, C = PeekWindowCore;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = C.newState(C.rounds('to10', 'pw')[1]);
    var wrap = api.el('div', 'pw-wrap'); this._wrap = wrap;
    var row = api.el('div', 'pw-row'); this._row = row;

    /* the window: the box of pictures and two shutters */
    var win = api.el('div', 'pw-window'); win.setAttribute('role', 'img'); win.setAttribute('aria-label', t('windowLabel'));
    var box = api.el('div', 'pw-box'); this._box = box; win.appendChild(box);
    var shL = api.el('div', 'pw-shutter pw-shutter-l'), shR = api.el('div', 'pw-shutter pw-shutter-r');
    shL.setAttribute('aria-hidden', 'true'); shR.setAttribute('aria-hidden', 'true');
    win.appendChild(shL); win.appendChild(shR);
    this._win = win; row.appendChild(win);

    /* the side: the number rail and Look again */
    var side = api.el('div', 'pw-side'); this._side = side;
    var rail = api.el('div', 'pw-rail'); rail.setAttribute('role', 'group'); rail.setAttribute('aria-label', t('railLabel'));
    this._rail = rail; this._chips = [];
    for (var v = 1; v <= 10; v++) {
      (function (val) { var b = api.el('button', 'pw-chip'); b.type = 'button'; b.textContent = String(val); b.addEventListener('click', function () { self._choose(val); }); rail.appendChild(b); self._chips.push(b); }(v));
    }
    side.appendChild(rail);
    var look = api.el('button', 'pw-look'); look.type = 'button';
    look.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg><span></span>';
    look.querySelector('span').textContent = t('lookAgain');
    look.setAttribute('aria-label', t('lookAgain')); look.title = t('lookAgain');
    look.addEventListener('click', function () { self._peek(); });
    this._lookBtn = look; side.appendChild(look);
    row.appendChild(side);
    wrap.appendChild(row);

    stage.appendChild(wrap);
    this._layout();
    this._build();
    this._paint();
    this._watchWidth();
    if (this._fresh) { this._fresh = false; var me = this; this._later(function () { me._peek(true); }, this.FIRST_MS); }
  },
  _layout: function () {
    var st = this.st, L = this._L = PeekWindowCore.layout(this._width(), st ? st.max : 10);
    var w = this._wrap;
    ['wide', 'side', 'narrow'].forEach(function (m) { w.classList.toggle('is-' + m, L.mode === m); });
    w.style.setProperty('--pw-cell', L.cell + 'px');
    w.style.setProperty('--pw-pic', L.pic + 'px');
    w.style.setProperty('--pw-winw', L.winW + 'px');
    w.style.setProperty('--pw-winh', L.winH + 'px');
    w.style.setProperty('--pw-chip', L.chip + 'px');
    w.style.setProperty('--pw-rail-cols', String(L.railCols));
  },
  /* the pictures for this round, placed for this layout */
  _build: function () {
    var st = this.st, L = this._L, box = this._box, C = PeekWindowCore;
    box.innerHTML = '';
    this._items = [];
    var pos = C.positions(st.p, st.n) || [];
    for (var i = 0; i < pos.length; i++) {
      var p = C.place(pos[i], L);
      var it = document.createElement('div'); it.className = 'pw-item';
      it.style.left = Math.round(p.cx - L.pic / 2) + 'px'; it.style.top = Math.round(p.cy - L.pic / 2) + 'px';
      var nb = document.createElement('span'); nb.className = 'pw-num'; nb.setAttribute('aria-hidden', 'true'); it.appendChild(nb);
      box.appendChild(it); this._items.push(it);
    }
    this._builtFor = st.id + ':' + L.mode + ':' + L.cell;
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return;
      last = w; self._layout(); self._build(); self._paint();
    });
    this._ro.observe(this.api.stage);
  },
  _preload: function () {
    var th = this.st && this._themes[this.st.theme];
    if (!th || !th.nouns[this.st.noun] || typeof Image === 'undefined') return;
    var im = new Image(); im.src = LCSPictures.url(th, this.st.noun);
  },
  _isOpen: function () { return this._open || this._look() === 'open' || PeekWindowCore.staysOpen(this.st); },

  _paint: function () {
    var st = this.st, C = PeekWindowCore, lang = this.api.lang;
    if (this._builtFor !== st.id + ':' + this._L.mode + ':' + this._L.cell) this._build();
    var th = this._themes[st.theme];
    var labels = C.labels(st), open = this._isOpen();
    this._wrap.classList.toggle('is-open', open);
    this._wrap.classList.toggle('is-done', st.done);
    for (var i = 0; i < this._items.length; i++) {
      var it = this._items[i], img = it.querySelector('img');
      if (th && th.nouns[st.noun]) {
        if (!img) { img = LCSPictures.img(th, st.noun, lang, { plural: false }); img.className = 'pw-pic'; img.alt = ''; img.setAttribute('aria-hidden', 'true'); it.insertBefore(img, it.firstChild); }
        else if (img.getAttribute('data-noun') !== st.noun) img.src = LCSPictures.url(th, st.noun);
        img.setAttribute('data-noun', st.noun);
      }
      var nb = it.querySelector('.pw-num'), v = labels[i] || '';
      nb.textContent = v;
      nb.classList.toggle('is-on', v !== '');
      nb.classList.toggle('is-q', v === '?');
      nb.classList.toggle('is-gold', st.done && i === st.n - 1);
    }
    for (var c = 0; c < this._chips.length; c++) {
      var b = this._chips[c], val = c + 1;
      b.hidden = val > st.max;
      var picked = st.answer === val;
      b.classList.toggle('is-picked', picked);
      b.classList.toggle('is-wrong', !!(picked && st.checked && !st.checked.ok && st.checked.slip !== 'none'));
      b.classList.toggle('is-right', picked && st.done);
      b.setAttribute('aria-pressed', String(picked));
      b.disabled = st.done;
    }
    this._lookBtn.hidden = open && (this._look() === 'open' || C.staysOpen(st));
    this._lookBtn.disabled = st.done || this._open;
  },

  /* ---------------- the hand ---------------- */
  _peek: function (auto) {
    var st = this.st, self = this, C = PeekWindowCore;
    if (!st || st.done || this._open || C.staysOpen(st) || this._look() === 'open') { if (auto) this._paint(); return; }
    C.look(st);
    this._open = true; this._paint();
    this.api.sound(520);
    this.api.track('look', { id: st.id, n: st.n, looks: st.looks, auto: !!auto });
    var me = st;
    this._later(function () { if (self.st !== me) return; self._open = false; self._paint(); }, C.LOOK_MS[this._look()] || C.LOOK_MS.quick);
  },
  _choose: function (v) {
    var st = this.st;
    if (!st || !PeekWindowCore.choose(st, v)) return;
    this.api.sound(560 + 18 * v);
    this._paint();
    this.api.track('choose', { id: st.id, n: st.n, a: v });
  },
  _afterCheck: function (res) {
    var st = this.st;
    this._open = false;
    this._paint();
    if (res.slip === 'none') return;
    if (res.ok || st.misses >= 2) for (var i = 0; i < this._items.length; i++) { var nb = this._items[i].querySelector('.pw-num'); nb.style.setProperty('--pw-delay', (i * 90) + 'ms'); bounce(nb, 'pw-pop'); }
    if (res.ok) { this.api.sound(660); this._speakNumber(st.n); } else this.api.sound(280);
    this.api.track('check', { id: st.id, ok: res.ok, slip: res.slip, a: res.a, misses: st.misses, looks: st.looks });
  },
  _speakNumber: function (n) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: 1 }); } catch (e) { /* silent */ }
  }
};

function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var pwCssDone = false;
function injectPeekWindowCSS() {
  if (pwCssDone || typeof document === 'undefined') return;
  pwCssDone = true;
  var css = ''
  + '.pw-wrap{width:100%;position:relative;display:flex;flex-direction:column;align-items:center;--pw-cell:100px;--pw-pic:90px;--pw-winw:520px;--pw-winh:320px;--pw-chip:52px;--pw-rail-cols:10;--pw-wood:#B98552;--pw-wood2:#8A5A2B;--pw-shut:#3E8E7E;--pw-shut2:#2E7062;}'
  + '.pw-row{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;}'
  + '.pw-wrap.is-side .pw-row{flex-direction:row;align-items:flex-start;justify-content:center;gap:8px;}'
  /* the window */
  + '.pw-window{position:relative;width:var(--pw-winw);height:var(--pw-winh);box-sizing:border-box;padding:8px;border-radius:14px;background:linear-gradient(180deg,var(--pw-wood),var(--pw-wood2));box-shadow:inset 0 0 0 3px #6B4420,0 6px 14px rgba(60,35,10,.2);overflow:hidden;flex:0 0 auto;}'
  + '.pw-box{position:relative;width:100%;height:100%;border-radius:8px;background:linear-gradient(180deg,#FFFBF0,#F6EBD4);box-shadow:inset 0 2px 6px rgba(60,35,10,.25);}'
  + '.pw-item{position:absolute;width:var(--pw-pic);height:var(--pw-pic);}'
  + '.pw-pic{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none;filter:drop-shadow(0 2px 2px rgba(40,25,10,.2));}'
  /* the shutters: closed at rest, swung aside while looking */
  + '.pw-shutter{position:absolute;top:8px;bottom:8px;width:calc(50% - 8px);background:repeating-linear-gradient(180deg,var(--pw-shut) 0 14px,var(--pw-shut2) 14px 17px);box-shadow:inset 0 0 0 3px #22594E;transition:transform .32s cubic-bezier(.3,.7,.2,1);z-index:3;}'
  + '.pw-shutter-l{left:8px;border-radius:8px 0 0 8px;transform-origin:left center;} .pw-shutter-r{right:8px;border-radius:0 8px 8px 0;transform-origin:right center;}'
  + '.pw-shutter::after{content:"";position:absolute;top:50%;width:10px;height:10px;margin-top:-5px;border-radius:50%;background:#F4C542;box-shadow:0 1px 2px rgba(0,0,0,.35);} .pw-shutter-l::after{right:8px;} .pw-shutter-r::after{left:8px;}'
  + '.pw-wrap.is-open .pw-shutter-l{transform:translateX(calc(-100% - 10px));} .pw-wrap.is-open .pw-shutter-r{transform:translateX(calc(100% + 10px));}'
  /* the numbers on the pictures (help and done) */
  + '.pw-num{position:absolute;right:-4px;top:-4px;min-width:28px;height:28px;padding:0 5px;box-sizing:border-box;border-radius:14px;background:var(--lcs-structure);color:#fff;border:2px solid #fff;font-family:var(--lcs-font-display);font-weight:800;font-size:16px;line-height:24px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.28);pointer-events:none;z-index:2;}'
  + '.pw-num:not(.is-on){display:none;} .pw-num.is-q{background:var(--lcs-accent);} .pw-num.is-gold{background:#F6D98A;color:#5B4312;border-color:#C9A24A;min-width:36px;height:36px;line-height:32px;font-size:21px;border-radius:18px;}'
  + '.pw-num.pw-pop{animation:pw-pop .3s var(--lcs-ease) var(--pw-delay,0ms) both;} @keyframes pw-pop{0%{transform:scale(0);}70%{transform:scale(1.2);}100%{transform:scale(1);}}'
  /* the side: the rail and Look again */
  + '.pw-side{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}'
  + '.pw-wrap.is-side .pw-side{width:auto;flex:0 0 auto;}'
  + '.pw-rail{display:grid;grid-template-columns:repeat(var(--pw-rail-cols),var(--pw-chip));gap:4px;justify-content:center;}'
  + '.pw-wrap.is-wide .pw-rail{grid-template-columns:repeat(var(--pw-rail-cols),minmax(0,1fr));width:100%;}'
  + '.pw-chip{height:var(--pw-chip);min-height:44px;border-radius:14px;border:2px solid var(--lcs-structure-soft);background:#fff;font-family:var(--lcs-font-display);font-weight:800;font-size:22px;color:var(--lcs-structure);cursor:pointer;touch-action:manipulation;padding:0;box-shadow:0 3px 0 var(--lcs-structure-soft);} .pw-chip[hidden]{display:none;}'
  + '.pw-chip:hover:not(:disabled){background:var(--lcs-structure-soft);} .pw-chip:disabled{cursor:default;} .pw-chip:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  + '.pw-chip.is-picked{background:var(--lcs-structure);color:#fff;border-color:var(--lcs-structure);}'
  + '.pw-chip.is-wrong{background:#FFF0EA;color:#B3512A;border-color:var(--lcs-accent);box-shadow:0 3px 0 #F6C3AE;}'
  + '.pw-chip.is-right{background:#E7F6EE;color:#17694A;border-color:var(--lcs-good);box-shadow:0 3px 0 #A9DCC2;}'
  + '.pw-look{min-height:48px;padding:0 16px;border-radius:24px;border:2px solid var(--lcs-structure);background:#fff;color:var(--lcs-structure);display:inline-flex;align-items:center;gap:8px;font-family:var(--lcs-font-body);font-weight:800;font-size:16px;cursor:pointer;touch-action:manipulation;} .pw-look[hidden]{display:none;} .pw-look:disabled{opacity:.45;cursor:default;} .pw-look:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  + '.pw-wrap.is-side .pw-look{width:var(--pw-chip);min-width:94px;padding:0;justify-content:center;} .pw-wrap.is-side .pw-look span{display:none;}'
  + '@media (prefers-reduced-motion:reduce){.pw-shutter{transition:none!important;} .pw-num{animation:none!important;}}';
  var style = document.createElement('style');
  style.id = 'pw-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = PeekWindowActivity;
if (typeof window !== 'undefined') window.PeekWindowActivity = PeekWindowActivity;
