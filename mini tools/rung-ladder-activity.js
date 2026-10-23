/* =====================================================================
   rung-ladder-activity.js — ACTIVITY #87 of the one-by-one rebuild:
   "Addition & Subtraction Pairs" → THE RUNG LADDER (1.OA.D.7, 11 locales).
   Design sheet: docs/activities-rebuild/designs/087-match-pairs.md
   ---------------------------------------------------------------------
   THE INVENTION: every card becomes one rail of a ladder — an addition is
   two rails clicked end to end, a subtraction is a tall rail with its top
   sawn off. Tap an addition and a subtraction, then the squirrel: it
   climbs a rung at every height with a hole on BOTH rails. Equal rails →
   the gold cap rung and the acorn, and the ladder folds into a tag that
   reads "2 + 3 = 9 − 4": the finished ladder IS the equals sign. Unequal
   → its paw reaches into air and the extra holes glow. "Undo it": the four
   facts of one family — every rail is as tall, so only the colour seam
   (where the first part ends) decides.
   ACTIVITY LAYER ONLY: the model is rung-ladder-core.js; the squirrel and
   the acorn are library pictures (forest-creatures/squirrel,
   miscellaneous/acorn) via lcs-pictures.js; lcs-shell.js untouched (the
   shell's Check is hidden and pressed by this activity when the round is
   complete). Test seams: window.RungLadderActivity.st / ._pool / ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var RungLadderActivity = {
  id: 'rung-ladder',
  apparatusClasses: ['rl-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'The Rung Ladder',de:'Die Sprossenleiter',nl:'De klimladder',da:'Trinstigen',sv:'Pinnstegen',no:'Trinnstigen',es:'La escalera de mano',it:'La scala a pioli',pt:'A escada de mão',fr:'L’échelle à barreaux',fi:'Puolatikkaat'},
    tLine:       {en:'Tap an addition and the subtraction worth the same. Then send the squirrel up!',de:'Tipp auf eine Plusaufgabe und die Minusaufgabe, die gleich viel ergibt. Dann schick das Eichhörnchen hoch!',nl:'Tik op een plussom en de minsom die evenveel is. Stuur dan de eekhoorn naar boven!',da:'Tryk på et plusstykke og det minusstykke, der giver lige meget. Send så egernet op!',sv:'Tryck på en plusuppgift och den minusuppgift som blir lika mycket. Skicka sedan upp ekorren!',no:'Trykk på en plussoppgave og minusoppgaven som blir like mye. Send så ekornet opp!',es:'Toca una suma y la resta que vale lo mismo. ¡Luego manda a la ardilla hacia arriba!',it:'Tocca un’addizione e la sottrazione che vale lo stesso. Poi fai salire lo scoiattolo!',pt:'Toque numa soma e na subtração que vale o mesmo. Depois mande o esquilo subir!',fr:'Touche une addition et la soustraction qui vaut autant. Puis fais monter l’écureuil !',fi:'Napauta yhteenlaskua ja vähennyslaskua, joka on yhtä paljon. Lähetä sitten orava ylös!'},
    tLineUndo:   {en:'Tap an addition and the subtraction that undoes it. Then send the squirrel up!',de:'Tipp auf eine Plusaufgabe und ihre Umkehraufgabe. Dann schick das Eichhörnchen hoch!',nl:'Tik op een plussom en de omgekeerde minsom. Stuur dan de eekhoorn naar boven!',da:'Tryk på et plusstykke og det omvendte minusstykke. Send så egernet op!',sv:'Tryck på en plusuppgift och den omvända minusuppgiften. Skicka sedan upp ekorren!',no:'Trykk på en plussoppgave og den omvendte minusoppgaven. Send så ekornet opp!',es:'Toca una suma y la resta que la deshace. ¡Luego manda a la ardilla hacia arriba!',it:'Tocca un’addizione e la sua sottrazione inversa. Poi fai salire lo scoiattolo!',pt:'Toque numa soma e na subtração que a desfaz. Depois mande o esquilo subir!',fr:'Touche une addition et sa soustraction inverse. Puis fais monter l’écureuil !',fi:'Napauta yhteenlaskua ja sen käänteistä vähennyslaskua. Lähetä sitten orava ylös!'},
    hKind:       {en:'Pick one addition and one subtraction.',de:'Nimm eine Plusaufgabe und eine Minusaufgabe.',nl:'Kies één plussom en één minsom.',da:'Vælg ét plusstykke og ét minusstykke.',sv:'Välj en plusuppgift och en minusuppgift.',no:'Velg én plussoppgave og én minusoppgave.',es:'Elige una suma y una resta.',it:'Scegli un’addizione e una sottrazione.',pt:'Escolha uma soma e uma subtração.',fr:'Choisis une addition et une soustraction.',fi:'Valitse yksi yhteenlasku ja yksi vähennyslasku.'},
    hClimb:      {en:'Tap the squirrel to climb!',de:'Tipp auf das Eichhörnchen, dann klettert es!',nl:'Tik op de eekhoorn om te klimmen!',da:'Tryk på egernet, så klatrer det!',sv:'Tryck på ekorren så klättrar den!',no:'Trykk på ekornet, så klatrer det!',es:'¡Toca la ardilla para que suba!',it:'Tocca lo scoiattolo per farlo salire!',pt:'Toque no esquilo para ele subir!',fr:'Touche l’écureuil pour qu’il grimpe !',fi:'Napauta oravaa, niin se kiipeää!'},
    hMore:       {en:'The squirrel can’t reach the top — one side has {k} more.',de:'Das Eichhörnchen kommt nicht bis oben – eine Seite hat {k} mehr.',nl:'De eekhoorn komt niet tot boven – één kant heeft er {k} meer.',da:'Egernet kan ikke nå toppen – den ene side har {k} flere.',sv:'Ekorren når inte toppen – ena sidan har {k} fler.',no:'Ekornet når ikke toppen – den ene siden har {k} flere.',es:'La ardilla no llega arriba: un lado tiene {k} más.',it:'Lo scoiattolo non arriva in cima: un lato ne ha {k} in più.',pt:'O esquilo não chega lá em cima: um lado tem {k} a mais.',fr:'L’écureuil n’arrive pas en haut : un côté en a {k} de plus.',fi:'Orava ei pääse ylös asti – toisella sivulla on {k} enemmän.'},
    hColour:     {en:'The colours don’t match — where does each colour end?',de:'Die Farben passen nicht zusammen – wo hört jede Farbe auf?',nl:'De kleuren passen niet – waar houdt elke kleur op?',da:'Farverne passer ikke – hvor holder hver farve op?',sv:'Färgerna stämmer inte – var tar varje färg slut?',no:'Fargene stemmer ikke – hvor slutter hver farge?',es:'Los colores no coinciden: ¿dónde termina cada color?',it:'I colori non combaciano: dove finisce ogni colore?',pt:'As cores não combinam: onde termina cada cor?',fr:'Les couleurs ne correspondent pas : où s’arrête chaque couleur ?',fi:'Värit eivät täsmää – missä kumpikin väri loppuu?'},
    hLook:       {en:'Look at the little sides on the cards. Which are the same height?',de:'Schau dir die kleinen Seiten auf den Karten an. Welche sind gleich hoch?',nl:'Kijk naar de kleine zijkanten op de kaarten. Welke zijn even hoog?',da:'Se på de små sider på kortene. Hvilke er lige høje?',sv:'Titta på de små sidorna på korten. Vilka är lika höga?',no:'Se på de små sidene på kortene. Hvilke er like høye?',es:'Mira los lados pequeños en las tarjetas. ¿Cuáles son igual de altos?',it:'Guarda i lati piccoli sulle carte. Quali hanno la stessa altezza?',pt:'Olhe os lados pequenos nas cartas. Quais têm a mesma altura?',fr:'Regarde les petits côtés sur les cartes. Lesquels ont la même hauteur ?',fi:'Katso korttien pieniä sivuja. Mitkä ovat yhtä korkeita?'},
    hSeam:       {en:'Find where the colour changes on each side.',de:'Such auf jeder Seite die Stelle, wo die Farbe wechselt.',nl:'Zoek aan elke kant waar de kleur verandert.',da:'Find det sted på hver side, hvor farven skifter.',sv:'Hitta var färgen skiftar på varje sida.',no:'Finn stedet på hver side der fargen skifter.',es:'Busca en cada lado dónde cambia el color.',it:'Trova su ogni lato dove cambia il colore.',pt:'Procure em cada lado onde a cor muda.',fr:'Trouve sur chaque côté où la couleur change.',fi:'Etsi kummastakin sivusta kohta, jossa väri vaihtuu.'},
    okPair:      {en:'{L} and {R} are worth the same!',de:'{L} und {R} ergeben gleich viel!',nl:'{L} en {R} zijn evenveel!',da:'{L} og {R} giver lige meget!',sv:'{L} och {R} blir lika mycket!',no:'{L} og {R} blir like mye!',es:'¡{L} y {R} valen lo mismo!',it:'{L} e {R} valgono lo stesso!',pt:'{L} e {R} valem o mesmo!',fr:'{L} et {R} valent autant !',fi:'{L} ja {R} ovat yhtä paljon!'},
    okUndo:      {en:'{R} undoes {L}!',de:'{R} ist die Umkehraufgabe von {L}!',nl:'{R} is de omgekeerde som van {L}!',da:'{R} er det omvendte regnestykke til {L}!',sv:'{R} är den omvända uppgiften till {L}!',no:'{R} er det omvendte regnestykket til {L}!',es:'¡{R} deshace {L}!',it:'{R} è l’operazione inversa di {L}!',pt:'{R} desfaz {L}!',fr:'{R} est l’opération inverse de {L} !',fi:'{R} on laskun {L} käänteinen lasku!'},
    okAll:       {en:'Every addition found its subtraction!',de:'Jede Plusaufgabe hat ihre Minusaufgabe gefunden!',nl:'Elke plussom heeft zijn minsom gevonden!',da:'Hvert plusstykke har fundet sit minusstykke!',sv:'Varje plusuppgift har hittat sin minusuppgift!',no:'Hver plussoppgave har funnet minusoppgaven sin!',es:'¡Cada suma encontró su resta!',it:'Ogni addizione ha trovato la sua sottrazione!',pt:'Cada soma achou a sua subtração!',fr:'Chaque addition a trouvé sa soustraction !',fi:'Jokainen yhteenlasku löysi vähennyslaskunsa!'},
    okFamily:    {en:'One family: {a} + {b}, {b} + {a}, {w} − {b}, {w} − {a}.',de:'Eine Familie: {a} + {b}, {b} + {a}, {w} − {b}, {w} − {a}.',nl:'Eén familie: {a} + {b}, {b} + {a}, {w} − {b}, {w} − {a}.',da:'Én familie: {a} + {b}, {b} + {a}, {w} − {b}, {w} − {a}.',sv:'En familj: {a} + {b}, {b} + {a}, {w} − {b}, {w} − {a}.',no:'Én familie: {a} + {b}, {b} + {a}, {w} − {b}, {w} − {a}.',es:'Una familia: {a} + {b}, {b} + {a}, {w} − {b}, {w} − {a}.',it:'Una famiglia: {a} + {b}, {b} + {a}, {w} − {b}, {w} − {a}.',pt:'Uma família: {a} + {b}, {b} + {a}, {w} − {b}, {w} − {a}.',fr:'Une famille : {a} + {b}, {b} + {a}, {w} − {b}, {w} − {a}.',fi:'Yksi perhe: {a} + {b}, {b} + {a}, {w} − {b}, {w} − {a}.'},
    setPairs:    {en:'Pairs',de:'Paare',nl:'Paren',da:'Par',sv:'Par',no:'Par',es:'Parejas',it:'Coppie',pt:'Pares',fr:'Paires',fi:'Parit'},
    pSame:       {en:'Same answer',de:'Gleiches Ergebnis',nl:'Zelfde uitkomst',da:'Samme resultat',sv:'Samma svar',no:'Samme svar',es:'Mismo resultado',it:'Stesso risultato',pt:'Mesmo resultado',fr:'Même résultat',fi:'Sama tulos'},
    pUndo:       {en:'Undo it',de:'Umkehraufgabe',nl:'Omgekeerde som',da:'Omvendt regnestykke',sv:'Omvänd uppgift',no:'Omvendt regnestykke',es:'Operación inversa',it:'Operazione inversa',pt:'Operação inversa',fr:'Opération inverse',fi:'Käänteinen lasku'},
    setRails:    {en:'Show rails',de:'Seiten zeigen',nl:'Zijkanten tonen',da:'Vis siderne',sv:'Visa sidorna',no:'Vis sidene',es:'Mostrar lados',it:'Mostra i lati',pt:'Mostrar lados',fr:'Montrer les côtés',fi:'Näytä sivut'},
    rAfter:      {en:'After I choose',de:'Nach der Auswahl',nl:'Na het kiezen',da:'Når jeg har valgt',sv:'När jag har valt',no:'Når jeg har valgt',es:'Al elegir',it:'Dopo la scelta',pt:'Depois de escolher',fr:'Après mon choix',fi:'Valinnan jälkeen'},
    rCards:      {en:'On the cards',de:'Auf den Karten',nl:'Op de kaarten',da:'På kortene',sv:'På korten',no:'På kortene',es:'En las tarjetas',it:'Sulle carte',pt:'Nas cartas',fr:'Sur les cartes',fi:'Korteissa'},
    ariaSquirrel:{en:'Squirrel: tap to climb',de:'Eichhörnchen: tippen zum Klettern',nl:'Eekhoorn: tik om te klimmen',da:'Egern: tryk for at klatre',sv:'Ekorre: tryck för att klättra',no:'Ekorn: trykk for å klatre',es:'Ardilla: toca para subir',it:'Scoiattolo: tocca per salire',pt:'Esquilo: toque para subir',fr:'Écureuil : touche pour grimper',fi:'Orava: napauta, niin se kiipeää'},
    ariaTag:     {en:'{t}. Tap to take this ladder apart.',de:'{t}. Tippen, um diese Leiter wieder auseinanderzunehmen.',nl:'{t}. Tik om deze ladder weer uit elkaar te halen.',da:'{t}. Tryk for at skille denne stige ad igen.',sv:'{t}. Tryck för att ta isär stegen igen.',no:'{t}. Trykk for å ta stigen fra hverandre igjen.',es:'{t}. Toca para desarmar esta escalera.',it:'{t}. Tocca per smontare questa scala.',pt:'{t}. Toque para desmontar esta escada.',fr:'{t}. Touche pour défaire cette échelle.',fi:'{t}. Napauta, niin tikkaat puretaan.'},
    ariaPlus:    {en:'{a} plus {b}',de:'{a} plus {b}',nl:'{a} plus {b}',da:'{a} plus {b}',sv:'{a} plus {b}',no:'{a} pluss {b}',es:'{a} más {b}',it:'{a} più {b}',pt:'{a} mais {b}',fr:'{a} plus {b}',fi:'{a} plus {b}'},
    ariaMinus:   {en:'{a} minus {b}',de:'{a} minus {b}',nl:'{a} min {b}',da:'{a} minus {b}',sv:'{a} minus {b}',no:'{a} minus {b}',es:'{a} menos {b}',it:'{a} meno {b}',pt:'{a} menos {b}',fr:'{a} moins {b}',fi:'{a} miinus {b}'}
  },/*STRINGS-END*/

  defaults: { pairs: 'same', rails: 'after' },
  settings: [
    { key: 'pairs', type: 'choice', labelKey: 'setPairs', options: [{ value: 'same', labelKey: 'pSame' }, { value: 'undo', labelKey: 'pUndo' }] },
    { key: 'rails', type: 'choice', labelKey: 'setRails', options: [{ value: 'after', labelKey: 'rAfter' }, { value: 'cards', labelKey: 'rCards' }] }
  ],
  OK_MS: 3800, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0;
    this._timers = []; this._ro = null; this._view = {}; this._grid = []; this._pics = {};
    injectLadderCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') ['forest creatures', 'miscellaneous'].forEach(function (dir) { LCSPictures.load(dir).then(function (th) { self._pics[dir] = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {}); });
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return RungLadderCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return RungLadderCore.levelOf(this._setting('pairs')); },
  _key: function () { return this._level(); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = RungLadderCore.ids(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = RungLadderCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice(), p = C.plan(this._level(), Math.random, prev);
      this._order = p.order; this._orderForPool = pool; this._pass = pass;
    }
    var idx = this._order[pos], pa = { msg: this._t(this._level() === 'undo' ? 'tLineUndo' : 'tLine') }; this._pa = pa;
    return {
      id: 'ladder.' + this._loc() + '.' + this._level() + '.' + idx, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _start: function (idx, grid) {
    var C = RungLadderCore;
    this._clearTimers(); this._view = {};
    this.st = C.newState(C.round(this._level(), idx));
    this._grid = grid || C.grid(this.st.r, Math.random);   /* reshuffled every time a round appears */
    var line = this._t(this._level() === 'undo' ? 'tLineUndo' : 'tLine'); if (this._pa) this._pa.msg = line;
    var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line;
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) this._start(0);
    this._render2();
    this._watchWidth();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'rl-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="rl-main"><div class="rl-cards" role="group"></div><div class="rl-side"><div class="rl-rack"></div><div class="rl-yard"></div></div></div><p class="rl-note" aria-live="polite"></p>';
    this._q = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _pic: function (dir, key, size, cls) {
    var th = this._pics[dir]; if (!th || typeof LCSPictures === 'undefined') return null;
    var im = LCSPictures.img(th, key, this._loc(), { size: size }); im.className = cls; im.alt = ''; im.style.width = size + 'px'; im.style.height = size + 'px'; return im;
  },
  _paint_: function () {
    if (!this._wrap) return;
    var C = RungLadderCore, st = this.st, r = st.r, L = C.layout(this._width()), narrow = L.mode !== 'wide', self = this, v = this._view, undo = r.level === 'undo';
    this._wrap.className = 'rl-wrap is-' + L.mode + (L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + (undo ? ' is-undo' : '');
    var showRails = this._setting('rails') === 'cards' || st.show >= 2;
    /* ---- the cards ---- */
    var cards = this._q('.rl-cards'); cards.innerHTML = '';
    var pend = st.pending || (v.show && v.show.pair) || [];
    this._grid.forEach(function (id) {
      var c = C.card(r, id), usedC = C.used(st, id), b = self.api.el('button', 'rl-card is-' + c.kind + (st.selected === id ? ' is-sel' : '') + (usedC ? ' is-used' : '') + (pend.indexOf(id) >= 0 ? ' is-pend' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'card-' + id); b.setAttribute('data-id', id);
      b.setAttribute('aria-label', self._t(c.kind === 'add' ? 'ariaPlus' : 'ariaMinus', { a: c.a, b: c.b }));
      b.setAttribute('aria-pressed', st.selected === id ? 'true' : 'false');
      var h = '<span class="rl-expr">' + C.text(c) + '</span>';
      if (showRails && !usedC) h += miniRail(C.rail(c, r.level), narrow);
      if (usedC) h += '<svg class="rl-mini-icon" viewBox="0 0 20 28" aria-hidden="true"><path d="M4 2v24M16 2v24M4 8h12M4 14h12M4 20h12" stroke="#146B5E" stroke-width="2.4" stroke-linecap="round" fill="none"/></svg>';
      b.innerHTML = h;
      b.disabled = st.done || usedC;
      b.addEventListener('click', function () { self._tapCard(id); });
      cards.appendChild(b);
    });
    /* ---- the rack of finished ladders ---- */
    var rack = this._q('.rl-rack'); rack.innerHTML = '';
    st.climbed.forEach(function (p, i) {
      var t = C.tag(r, p), b = self.api.el('button', 'rl-tag' + (v.fresh === i ? ' is-new' : '')); b.type = 'button'; b.setAttribute('data-k', 'tag-' + i);
      b.innerHTML = '<svg viewBox="0 0 14 22" aria-hidden="true"><path d="M3 1v20M11 1v20M3 6h8M3 11h8M3 16h8" stroke="#8A5A00" stroke-width="2" stroke-linecap="round" fill="none"/></svg><span>' + t + '</span>';
      b.setAttribute('aria-label', self._t('ariaTag', { t: t }));
      b.disabled = st.done;
      b.addEventListener('click', function () { if (RungLadderCore.unfold(self.st, i)) { self._view = {}; self.api.sound(300); self._paint(); } });
      rack.appendChild(b);
    });
    rack.hidden = !st.climbed.length;
    /* ---- the ladder yard ---- */
    this._paintYard(narrow);
    /* ---- the note ---- */
    var note = this._q('.rl-note'), hk = C.hint(st), txt = '', cls = 'rl-note';
    if (v.msg) { txt = v.msg; cls += ' is-ok'; }
    else if (hk) { txt = this._t(hk, { k: st.last && st.last.k }); cls += hk === 'hKind' ? ' is-hint' : ' is-hint'; }
    else if (st.pending) { txt = this._t('hClimb'); cls += ' is-ok'; }
    note.className = cls; note.textContent = txt;
  },
  /* the yard: two rails standing on the grass, the rungs the squirrel laid, the squirrel and the acorn */
  _paintYard: function (narrow) {
    var C = RungLadderCore, st = this.st, r = st.r, v = this._view, yard = this._q('.rl-yard'), self = this, undo = r.level === 'undo';
    yard.innerHTML = '';
    var W = narrow ? Math.min(this._width(), 360) : 280, H = narrow ? 300 : 430, sq = narrow ? 64 : 96, grass = 20;
    yard.style.width = W + 'px'; yard.style.height = H + 'px';
    var show = v.show || (st.pending ? { pair: st.pending, res: null } : null);
    var s = '<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true"><rect x="0" y="' + (H - grass) + '" width="' + W + '" height="' + grass + '" rx="6" class="rl-grass"/>';
    if (show) {
      var A = C.card(r, show.pair[0]), S = C.card(r, show.pair[1]), ra = C.rail(A, r.level), rs = C.rail(S, r.level), res = show.res;
      var pre = S.a, tallest = Math.max(ra.length, undo ? rs.length : pre), top = sq + 30, p = Math.min(narrow ? 22 : 28, Math.floor((H - grass - top) / tallest)), hole = Math.max(9, p * 0.6), rw = Math.max(16, p + 2);
      var cx = W / 2, gap = narrow ? 30 : 34, xl = cx - gap - rw / 2, xr = cx + gap - rw / 2, base = H - grass;
      var railSVG = function (x, holes, sawn, side) {
        var o = '<rect x="' + x + '" y="' + (base - holes.length * p - 6) + '" width="' + rw + '" height="' + (holes.length * p + 6) + '" rx="5" class="rl-rail"/>';
        holes.forEach(function (k, i) {
          /* the help: Same answer marks the holes one side has MORE (numbered); Undo it marks the band where the colours disagree, on both rails */
          var y = base - (i + 0.5) * p, extra = res && !res.done && st.show >= 1 && i >= res.rungs && (undo ? i < res.rungs + res.open : side === res.side);
          o += '<circle cx="' + (x + rw / 2) + '" cy="' + y.toFixed(1) + '" r="' + (hole / 2).toFixed(1) + '" class="rl-hole is-' + k + (extra ? ' is-extra' : '') + '"/>';
          if (extra && st.show === 1 && !undo) o += '<text x="' + (x + rw + 6) + '" y="' + (y + 4).toFixed(1) + '" class="rl-num" font-size="' + Math.round(p * 0.7) + '">' + (i - res.rungs + 1) + '</text>';
        });
        if (sawn) for (var j = 0; j < sawn; j++) { var yy = base - (holes.length + j + 0.5) * p; o += '<circle cx="' + (x + rw / 2) + '" cy="' + yy.toFixed(1) + '" r="' + (hole / 2).toFixed(1) + '" class="rl-hole is-fall" style="animation-delay:' + (j * 40) + 'ms"/>'; }
        return o;
      };
      s += railSVG(xl, ra, 0, 'add') + railSVG(xr, rs, undo || res || self.FAST ? 0 : S.b, 'sub');   /* the sawn-off top falls away while the rail is built, then it is gone */
      s += '<rect x="' + (xl + rw / 2 + 3) + '" y="' + (base - A.a * p - 3) + '" width="' + (rw * 0.5) + '" height="6" rx="3" class="rl-collar"/>';
      /* the plates at the foot */
      s += '<text x="' + (xl + rw / 2) + '" y="' + (base + 15) + '" class="rl-plate" font-size="' + (narrow ? 12 : 14) + '">' + C.text(A) + '</text><text x="' + (xr + rw / 2) + '" y="' + (base + 15) + '" class="rl-plate" font-size="' + (narrow ? 12 : 14) + '">' + C.text(S) + '</text>';
      /* the rungs the squirrel laid */
      var rungs = res ? res.rungs : 0;
      for (var k = 0; k < rungs; k++) { var ry = base - (k + 0.5) * p; s += '<line x1="' + (xl + rw / 2) + '" y1="' + ry.toFixed(1) + '" x2="' + (xr + rw / 2) + '" y2="' + ry.toFixed(1) + '" class="rl-rung" style="animation-delay:' + (k * 60) + 'ms"/>'; }
      if (res && res.done) { var cy = base - ra.length * p - 8; s += '<rect x="' + (xl - 4) + '" y="' + cy + '" width="' + (xr - xl + rw + 8) + '" height="8" rx="4" class="rl-cap"/>'; }
      s += '</svg>'; yard.innerHTML = s;
      /* the squirrel: at the foot, or on the last rung it reached */
      var sy = res ? (res.done ? base - ra.length * p - 8 - sq : base - rungs * p - sq * 0.85) : base - sq;
      var btn = this.api.el('button', 'rl-squirrel' + (res && !res.done ? ' is-stuck' : '') + (res && res.done ? ' is-top' : '')); btn.type = 'button'; btn.setAttribute('data-k', 'squirrel'); btn.setAttribute('aria-label', this._t('ariaSquirrel'));
      var sx = res && !res.done ? Math.max(2, xl - sq - 4) : cx - sq / 2;   /* a stuck squirrel waits BESIDE the ladder, so the help on the rails stays in view */
      btn.style.cssText = 'left:' + sx + 'px;top:' + Math.max(0, sy) + 'px;width:' + sq + 'px;height:' + sq + 'px;';
      var im = this._pic('forest creatures', 'squirrel', sq, 'rl-sq'); if (im) btn.appendChild(im);
      btn.disabled = !st.pending || st.done;
      btn.addEventListener('click', function () { self._climb(); });
      yard.appendChild(btn);
      /* the acorn: above the yard, or on the cap rung */
      var ac = this._pic('miscellaneous', 'acorn', narrow ? 64 : 96, 'rl-acorn' + (res && res.done ? ' is-got' : ''));
      if (ac) { ac.style.left = (res && res.done ? cx + sq * 0.2 : cx - (narrow ? 32 : 48)) + 'px'; ac.style.top = (res && res.done ? Math.max(0, sy - 8) : 2) + 'px'; yard.appendChild(ac); }
    } else {
      s += '</svg>'; yard.innerHTML = s;
      var ac2 = this._pic('miscellaneous', 'acorn', narrow ? 64 : 96, 'rl-acorn is-wait'); if (ac2) { ac2.style.left = (W / 2 - (narrow ? 32 : 48)) + 'px'; ac2.style.top = '2px'; yard.appendChild(ac2); }
      var sqi = this._pic('forest creatures', 'squirrel', sq, 'rl-sq is-rest'); if (sqi) { sqi.style.position = 'absolute'; sqi.style.left = (W / 2 - sq / 2) + 'px'; sqi.style.top = (H - grass - sq) + 'px'; yard.appendChild(sqi); }
    }
  },
  /* ---------------- actions ---------------- */
  _tapCard: function (id) {
    var C = RungLadderCore, st = this.st;
    if (st.done) return;
    if (this._view.show) { if (this._view.show.res && this._view.show.res.done) return; this._view = {}; }   /* a stopped ladder stays (with its help) until the next card is tapped */
    if (st.pending) C.cancel(st);
    var res = C.select(st, id);
    if (!res) return;
    this._view = {};
    this.api.sound(res === 'pair' ? 660 : res === 'kind' ? 300 : 520);
    this._paint();
    if (res === 'pair') { var y = this._q('.rl-yard'); if (y && y.scrollIntoView) y.scrollIntoView({ block: 'nearest' }); }
  },
  _climb: function () {
    var C = RungLadderCore, st = this.st, self = this, r = st.r;
    if (!st.pending || st.done || this._view.show) return;
    var pair = st.pending.slice(), res = C.go(st);
    if (!res) return;
    this._view = { show: { pair: pair, res: res } };
    for (var k = 0; k < res.rungs; k++) (function (k) { self._later(function () { self.api.sound(440 + k * 30); }, self._ms(60 * k)); })(k);
    this._paint();
    var A = C.card(r, pair[0]), S = C.card(r, pair[1]);
    if (res.done) {
      var msg = this._t(r.level === 'undo' ? 'okUndo' : 'okPair', { L: C.text(A), R: C.text(S) });
      this._view.msg = msg; this._paint(); this.api.announce(msg);
      this._later(function () {
        self._view = { fresh: st.climbed.length - 1, msg: msg };   /* the line stays with the folded ladder until the next tap */
        if (st.done) {
          var all = r.level === 'undo' ? self._t('okFamily', { a: r.fa, b: r.fb, w: r.w }) : self._t('okAll');
          self._view.msg = all; if (self._pa) self._pa.msg = all; self._paint(); self.api.announce(all);
          self._advance(all.length * 60 + 1500);
        } else self._paint();
      }, this._ms(1300));
    } else {
      this.api.sound(200); this.api.announce(this._q('.rl-note').textContent || '');
    }
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 3800 ? ms : 0));
  }
};

/* a card's little rail: its holes, unnumbered (the "On the cards" support and the miss-2 ghost) */
function miniRail(holes, narrow) {
  var p = narrow ? 5 : 6, h = holes.length * p + 4, s = '<svg class="rl-mini" width="12" height="' + h + '" viewBox="0 0 12 ' + h + '" aria-hidden="true"><rect x="1" y="0" width="10" height="' + h + '" rx="3" class="rl-rail"/>';
  holes.forEach(function (k, i) { s += '<circle cx="6" cy="' + (h - 2 - (i + 0.5) * p).toFixed(1) + '" r="' + (p * 0.32).toFixed(1) + '" class="rl-hole is-' + k + '"/>'; });
  return s + '</svg>';
}

var rlCssDone = false;
function injectLadderCSS() {
  if (rlCssDone || typeof document === 'undefined') return;
  rlCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.rl-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;}'
  + '.rl-main{display:flex;gap:18px;align-items:flex-start;justify-content:center;width:100%;} .rl-wrap.is-narrow .rl-main{flex-direction:column;align-items:center;gap:8px;}'
  + '.rl-cards{display:grid;grid-template-columns:repeat(2,150px);gap:12px;align-content:start;} .rl-wrap.is-narrow .rl-cards{grid-template-columns:repeat(2,minmax(120px,146px));gap:8px;}'
  + '.rl-card{height:72px;padding:0 8px;border:0;border-radius:14px;background:#FFFDF7;font-family:' + H + ';font-weight:800;font-size:34px;color:#0F4A40;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:transform .15s,opacity .3s;}'
  + '.rl-card.is-add{box-shadow:inset 0 0 0 3px #1E8A78,0 4px 0 #9CC9BE;} .rl-card.is-sub{box-shadow:inset 0 0 0 3px #E0603A,0 4px 0 #F2C2A8;}'
  + '.rl-card.is-sel{transform:translateY(-6px);box-shadow:inset 0 0 0 4px #D4A21E,0 8px 0 #E8C26A;} .rl-card.is-pend{opacity:.45;} .rl-card.is-used{opacity:.3;cursor:default;} .rl-card:disabled{cursor:default;}'
  + '.rl-card:focus-visible,.rl-squirrel:focus-visible,.rl-tag:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.rl-expr{white-space:nowrap;} .rl-mini{display:block;flex:none;} .rl-mini-icon{width:16px;height:22px;flex:none;}'
  + '.rl-side{display:flex;flex-direction:column;align-items:center;gap:6px;}'
  + '.rl-rack{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:300px;min-height:0;} .rl-rack[hidden]{display:none;}'
  + '.rl-tag{min-height:44px;padding:4px 10px;border:0;border-radius:10px;background:#FFF6D6;box-shadow:inset 0 0 0 2px #D4A21E;display:flex;align-items:center;gap:6px;font-family:' + H + ';font-weight:800;font-size:16px;color:#5A3D00;cursor:pointer;} .rl-tag svg{width:12px;height:20px;} .rl-tag.is-new{animation:rlSwing .6s ease-out;} @keyframes rlSwing{30%{transform:rotate(-6deg);}60%{transform:rotate(4deg);}} .rl-tag:disabled{cursor:default;}'
  + '.rl-yard{position:relative;border-radius:16px;background:#FBF3E4;box-shadow:inset 0 0 0 2px #EADBC0;} .rl-yard>svg{position:absolute;left:0;top:0;display:block;} .rl-grass{fill:#CFE3B5;}'
  + '.rl-rail{fill:#D9B98A;stroke:#3A2E1F;stroke-width:2;} .rl-hole.is-p{fill:#FBF6EA;stroke:#7A5A33;stroke-width:1.5;} .rl-hole.is-q{fill:#FBF6EA;stroke:#7A5A33;stroke-width:1.5;}'
  + '.rl-wrap.is-undo .rl-hole.is-p{fill:#F2784B;stroke:#B5461F;} .rl-wrap.is-undo .rl-hole.is-q{fill:#1E8A78;stroke:#0F5C4F;} .rl-hole.is-g{fill:none;stroke:#1E8A78;stroke-width:2;stroke-dasharray:3 2;}'
  + '.rl-hole.is-fall{fill:#FBF6EA;stroke:#7A5A33;animation:rlFall .7s ease-in both;} @keyframes rlFall{0%{opacity:1;}60%{opacity:1;transform:translateY(0);}100%{opacity:0;transform:translate(30px,40px) rotate(40deg);}}'
  + '.rl-wrap .rl-hole.is-extra{fill:#FFE3B8;stroke:#D9822B;stroke-width:2.5;} .rl-wrap.is-undo .rl-hole.is-extra{stroke:#D9822B;stroke-width:4;} .rl-num{fill:#B5461F;font-family:' + H + ';font-weight:800;}'
  + '.rl-collar{fill:#C79A3E;} .rl-plate{fill:#0F4A40;font-family:' + H + ';font-weight:800;text-anchor:middle;}'
  + '.rl-rung{stroke:#8A6B42;stroke-width:5;stroke-linecap:round;animation:rlRung .25s ease-out both;} @keyframes rlRung{from{opacity:0;}}'
  + '.rl-cap{fill:#E8B53A;stroke:#8A5A00;stroke-width:2;}'
  + '.rl-squirrel{position:absolute;z-index:3;padding:0;border:0;background:none;cursor:pointer;transition:top .9s ease-out;} .rl-squirrel:disabled{cursor:default;} .rl-sq{display:block;pointer-events:none;}'
  + '.rl-squirrel:not(:disabled) .rl-sq{animation:rlNudge 1.6s ease-in-out infinite;} @keyframes rlNudge{50%{translate:0 -5px;}}'
  + '.rl-squirrel.is-stuck .rl-sq{animation:rlWobble .18s ease-in-out 3;} @keyframes rlWobble{50%{rotate:-8deg;}}'
  + '.rl-acorn{position:absolute;z-index:2;display:block;transition:left .4s,top .4s;} .rl-acorn.is-wait{opacity:.85;}'
  + '.rl-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .rl-note:empty{display:none;} .rl-note.is-hint{color:#B5461F;} .rl-note.is-ok{color:#146B5E;}'
  + '.rl-wrap.is-narrow .rl-card{height:64px;font-size:30px;} .rl-wrap.is-narrow .rl-note{font-size:17px;}'
  + '.rl-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media print{.rl-note,.rl-yard{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.rl-wrap *{animation-duration:.15s !important;animation-iteration-count:1 !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'rl-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.RungLadderActivity = RungLadderActivity;
