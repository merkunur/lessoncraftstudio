/* =====================================================================
   next-number-activity.js — ACTIVITY #3 of the one-by-one rebuild:
   "What number comes next?" (K.CC.A.2) — THE PEEK PATH.
   Design sheet: docs/activities-rebuild/003-next-number.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: THE LIDDED NUMBER PATH. Ten (or twenty) stones lie in a
   path under cream lids. The child STANDS on a number — that stone is open,
   with a counter resting on it — and the stone after it is the question.
   The child WRITES the next number on big number keys (the digits appear on
   the question stone), presses Check, and the counter HOPS onto it while the
   lid flips open. The stones behind are hidden, so counting ON is the cheap
   move and starting over at 1 is not; a lid can still be peeked (one per
   tap) and the teacher can show the whole run-up. A wrong answer is named
   (the same number · the one before · too far) and the run-up opens so the
   child counts on from it. Nothing here is drawn by hand: stones, lids, a
   counter and keys in the shell palette; numerals are the only words.

   ACTIVITY LAYER ONLY: the model is next-number-core.js; lcs-shell.js is
   untouched. Test seams: window.NextNumberActivity.st / ._order / ._pool.
   ===================================================================== */
'use strict';

var NextNumberActivity = {
  id: 'next-number',
  apparatusClasses: ['np-'],

  strings: {
    title:        {en:'What number comes next?',de:'Welche Zahl kommt danach?',fr:'Quel nombre vient après ?',it:'Quale numero viene dopo?',es:'¿Qué número sigue?',pt:'Qual número vem depois?',nl:'Welk getal komt erna?',sv:'Vilket tal kommer efter?',da:'Hvilket tal kommer efter?',no:'Hvilket tall kommer etter?',fi:'Mikä luku tulee seuraavaksi?'},
    instruction:  {en:'A number path with lids. You stand on a number — write the one that comes next. Count on from where you are; you don’t have to start at 1. Tap a lid to peek at an earlier number.',de:'Ein Zahlenweg mit Deckeln. Du stehst auf einer Zahl – schreibe die Zahl, die danach kommt. Zähle von dort weiter; du musst nicht bei 1 anfangen. Tippe auf einen Deckel, um eine frühere Zahl anzusehen.',fr:'Un chemin de nombres avec des couvercles. Tu es sur un nombre : écris celui qui vient juste après. Continue à compter à partir de là, sans repartir de 1. Touche un couvercle pour voir un nombre d’avant.',it:'Un sentiero di numeri con i coperchi. Sei su un numero: scrivi quello che viene dopo. Continua a contare da lì, senza ripartire da 1. Tocca un coperchio per sbirciare un numero precedente.',es:'Un camino de números con tapas. Estás parado en un número: escribe el que sigue. Sigue contando desde ahí, sin empezar en 1. Toca una tapa para ver un número anterior.',pt:'Um caminho de números com tampas. Você está em um número: escreva o que vem logo depois. Continue contando dali, sem recomeçar do 1. Toque em uma tampa para espiar um número anterior.',nl:'Een getallenpad met deksels. Je staat op een getal: schrijf het getal dat erna komt. Tel verder vanaf daar; je hoeft niet bij 1 te beginnen. Tik op een deksel om een eerder getal te bekijken.',sv:'En talstig med lock. Du står på ett tal – skriv det tal som kommer efter. Räkna vidare därifrån; du behöver inte börja på 1. Tryck på ett lock för att titta på ett tidigare tal.',da:'En talsti med låg. Du står på et tal – skriv det tal, der kommer efter. Tæl videre derfra; du behøver ikke at starte ved 1. Tryk på et låg for at kigge på et tidligere tal.',no:'En tallsti med lokk. Du står på et tall – skriv tallet som kommer etter. Tell videre derfra; du trenger ikke å begynne på 1. Trykk på et lokk for å titte på et tidligere tall.',fi:'Lukupolku, jossa on kansia. Seisot luvun päällä – kirjoita luku, joka tulee seuraavaksi. Jatka laskemista siitä; ei tarvitse aloittaa ykkösestä. Napauta kantta, niin näet aiemman luvun.'},
    prompt:       {en:'What number comes after {n}?',de:'Welche Zahl kommt nach {n}?',fr:'Quel nombre vient juste après {n} ?',it:'Quale numero viene dopo {n}?',es:'¿Qué número viene después del {n}?',pt:'Qual número vem depois do {n}?',nl:'Welk getal komt na {n}?',sv:'Vilket tal kommer efter {n}?',da:'Hvilket tal kommer efter {n}?',no:'Hvilket tall kommer etter {n}?',fi:'Mikä luku tulee luvun {n} jälkeen?'},
    hintNoAnswer: {en:'Write the number that comes next — tap the digits.',de:'Schreibe die Zahl, die danach kommt – tippe auf die Ziffern.',fr:'Écris le nombre qui vient juste après : touche les chiffres.',it:'Scrivi il numero che viene dopo: tocca le cifre.',es:'Escribe el número que sigue: toca los dígitos.',pt:'Escreva o número que vem depois: toque nos algarismos.',nl:'Schrijf het getal dat erna komt: tik op de cijfers.',sv:'Skriv talet som kommer efter – tryck på siffrorna.',da:'Skriv det tal, der kommer efter – tryk på cifrene.',no:'Skriv tallet som kommer etter – trykk på sifrene.',fi:'Kirjoita seuraava luku – napauta numeroita.'},
    hintSame:     {en:'That is the number you are standing on. Count on one more.',de:'Das ist die Zahl, auf der du stehst. Zähle eins weiter.',fr:'C’est le nombre sur lequel tu es. Compte un de plus.',it:'È il numero su cui ti trovi. Conta uno in più.',es:'Ese es el número en el que estás parado. Cuenta uno más.',pt:'Esse é o número em que você está. Conte mais um.',nl:'Dat is het getal waar je op staat. Tel één verder.',sv:'Det är talet du står på. Räkna ett steg vidare.',da:'Det er det tal, du står på. Tæl ét videre.',no:'Det er tallet du står på. Tell ett videre.',fi:'Se on luku, jonka päällä seisot. Laske yksi eteenpäin.'},
    hintBefore:   {en:'That number comes before yours. Count forward, not back.',de:'Diese Zahl kommt vor deiner Zahl. Zähle vorwärts, nicht rückwärts.',fr:'Ce nombre vient avant le tien. Compte en avant, pas en arrière.',it:'Quel numero viene prima del tuo. Conta in avanti, non indietro.',es:'Ese número viene antes del tuyo. Cuenta hacia adelante, no hacia atrás.',pt:'Esse número vem antes do seu. Conte para a frente, não para trás.',nl:'Dat getal komt vóór jouw getal. Tel vooruit, niet terug.',sv:'Det talet kommer före ditt. Räkna framåt, inte bakåt.',da:'Det tal kommer før dit. Tæl fremad, ikke tilbage.',no:'Det tallet kommer før ditt. Tell framover, ikke bakover.',fi:'Se luku tulee ennen omaa lukuasi. Laske eteenpäin, älä taaksepäin.'},
    hintFar:      {en:'Too far. The next number is just one step on.',de:'Zu weit. Die nächste Zahl ist nur einen Schritt weiter.',fr:'Trop loin. Le nombre suivant est juste un pas plus loin.',it:'Troppo lontano. Il numero dopo è solo un passo più avanti.',es:'Demasiado lejos. El número que sigue está a un solo paso.',pt:'Longe demais. O próximo número está a um passo só.',nl:'Te ver. Het volgende getal is maar één stap verder.',sv:'För långt. Nästa tal är bara ett steg bort.',da:'For langt. Det næste tal er kun ét skridt væk.',no:'For langt. Det neste tallet er bare ett steg videre.',fi:'Liian pitkälle. Seuraava luku on vain yhden askeleen päässä.'},
    celebrate:    {en:'Yes! After {n} comes {m}.',de:'Ja! Nach {n} kommt {m}.',fr:'Oui ! Après {n} vient {m}.',it:'Sì! Dopo {n} viene {m}.',es:'¡Sí! Después del {n} viene el {m}.',pt:'Isso! Depois do {n} vem o {m}.',nl:'Ja! Na {n} komt {m}.',sv:'Ja! Efter {n} kommer {m}.',da:'Ja! Efter {n} kommer {m}.',no:'Ja! Etter {n} kommer {m}.',fi:'Kyllä! Luvun {n} jälkeen tulee {m}.'},
    locked:       {en:'That lid opens after you answer.',de:'Dieser Deckel öffnet sich nach deiner Antwort.',fr:'Ce couvercle s’ouvre après ta réponse.',it:'Questo coperchio si apre dopo la tua risposta.',es:'Esa tapa se abre después de tu respuesta.',pt:'Essa tampa abre depois da sua resposta.',nl:'Dat deksel gaat open na je antwoord.',sv:'Det locket öppnas efter ditt svar.',da:'Det låg åbner efter dit svar.',no:'Det lokket åpnes etter svaret ditt.',fi:'Tämä kansi aukeaa vastauksesi jälkeen.'},
    pathLabel:    {en:'The number path',de:'Der Zahlenweg',fr:'Le chemin des nombres',it:'Il sentiero dei numeri',es:'El camino de números',pt:'O caminho dos números',nl:'Het getallenpad',sv:'Talstigen',da:'Talstien',no:'Tallstien',fi:'Lukupolku'},
    stoneHidden:  {en:'hidden stone — tap to peek',de:'verdeckter Stein – zum Ansehen antippen',fr:'pierre cachée, touche pour voir',it:'pietra coperta, tocca per sbirciare',es:'piedra tapada: toca para ver',pt:'pedra tampada: toque para espiar',nl:'verborgen steen, tik om te kijken',sv:'dold sten – tryck för att titta',da:'skjult sten – tryk for at kigge',no:'skjult stein – trykk for å titte',fi:'piilotettu kivi – napauta kurkistaaksesi'},
    stoneLocked:  {en:'stone after the question, still closed',de:'Stein hinter der Frage, noch zu',fr:'pierre après la question, encore fermée',it:'pietra dopo la domanda, ancora chiusa',es:'piedra después de la pregunta, aún cerrada',pt:'pedra depois da pergunta, ainda fechada',nl:'steen na de vraag, nog dicht',sv:'sten efter frågan, ännu stängd',da:'sten efter spørgsmålet, stadig lukket',no:'stein etter spørsmålet, fortsatt lukket',fi:'kysymyksen jälkeinen kivi, vielä kiinni'},
    stoneAsk:     {en:'the next stone — write its number',de:'der nächste Stein – schreibe seine Zahl',fr:'la pierre suivante : écris son nombre',it:'la pietra dopo: scrivi il suo numero',es:'la siguiente piedra: escribe su número',pt:'a próxima pedra: escreva o número dela',nl:'de volgende steen: schrijf het getal',sv:'nästa sten – skriv dess tal',da:'den næste sten – skriv dens tal',no:'den neste steinen – skriv tallet dens',fi:'seuraava kivi – kirjoita sen luku'},
    stoneHere:    {en:'you are on {v}',de:'du stehst auf {v}',fr:'tu es sur {v}',it:'sei sul numero {v}',es:'estás en el {v}',pt:'você está no {v}',nl:'je staat op {v}',sv:'du står på {v}',da:'du står på {v}',no:'du står på {v}',fi:'seisot luvun {v} päällä'},
    keypadLabel:  {en:'Number keys',de:'Zifferntasten',fr:'Touches des chiffres',it:'Tasti dei numeri',es:'Teclas de números',pt:'Teclas de números',nl:'Cijfertoetsen',sv:'Siffertangenter',da:'Taltaster',no:'Talltaster',fi:'Numeronäppäimet'},
    erase:        {en:'Erase',de:'Löschen',fr:'Effacer',it:'Cancella',es:'Borrar',pt:'Apagar',nl:'Wissen',sv:'Sudda',da:'Slet',no:'Slett',fi:'Pyyhi'},
    closeLids:    {en:'Close the lids',de:'Deckel schließen',fr:'Fermer les couvercles',it:'Chiudi i coperchi',es:'Cerrar las tapas',pt:'Fechar as tampas',nl:'Deksels dicht',sv:'Stäng locken',da:'Luk lågene',no:'Lukk lokkene',fi:'Sulje kannet'},
    setRange:     {en:'Numbers',de:'Zahlen',fr:'Nombres',it:'Numeri',es:'Números',pt:'Números',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    range10:      {en:'to 10',de:'bis 10',fr:'jusqu’à 10',it:'fino a 10',es:'hasta 10',pt:'até 10',nl:'t/m 10',sv:'till 10',da:'til 10',no:'til 10',fi:'10:een asti'},
    range20:      {en:'to 20',de:'bis 20',fr:'jusqu’à 20',it:'fino a 20',es:'hasta 20',pt:'até 20',nl:'t/m 20',sv:'till 20',da:'til 20',no:'til 20',fi:'20:een asti'},
    setPath:      {en:'Path',de:'Weg',fr:'Chemin',it:'Sentiero',es:'Camino',pt:'Caminho',nl:'Pad',sv:'Stig',da:'Sti',no:'Sti',fi:'Polku'},
    pathHidden:   {en:'Hidden',de:'Verdeckt',fr:'Caché',it:'Coperto',es:'Tapado',pt:'Tampado',nl:'Verborgen',sv:'Dold',da:'Skjult',no:'Skjult',fi:'Piilossa'},
    pathShown:    {en:'Shown',de:'Sichtbar',fr:'Visible',it:'Visibile',es:'A la vista',pt:'À vista',nl:'Zichtbaar',sv:'Synlig',da:'Synlig',no:'Synlig',fi:'Näkyvissä'}
  },

  defaults: { range: '10', path: 'hidden' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: '10', labelKey: 'range10' }, { value: '20', labelKey: 'range20' }] },
    { key: 'path', type: 'choice', labelKey: 'setPath', options: [{ value: 'hidden', labelKey: 'pathHidden' }, { value: 'shown', labelKey: 'pathShown' }] }
  ],

  init: function (api) {
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = ''; this._order = null; this._curPass = 0;
    this._ro = null;
    injectNextNumberCSS();
    this._onKeyDown = this._onKeyDown.bind(this);
    if (typeof document !== 'undefined') document.addEventListener('keydown', this._onKeyDown);
  },
  destroy: function () {
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
    if (typeof document !== 'undefined') document.removeEventListener('keydown', this._onKeyDown);
  },
  onSettings: function (key) {
    if (key === 'range') { this._pool = null; this._order = null; }
    if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
  },

  /* ---------------- rounds ---------------- */
  _matWidth: function () { var s = this.api && this.api.stage; var w = s ? s.clientWidth : 0; return w > 160 ? w : 560; },
  _range: function () { return (this.api && this.api.settings && this.api.settings.range === '20') ? 20 : 10; },
  _path: function () { return (this.api && this.api.settings && this.api.settings.path === 'shown') ? 'shown' : 'hidden'; },
  _ensurePool: function () {
    var key = String(this._range());
    if (this._pool && this._poolKey === key) return this._pool;
    this._pool = NextNumberCore.rounds(this._range(), 'np');
    this._poolKey = key;
    if (!(this._order && this._order.length === this._pool.length)) { this._order = null; this._curPass = 0; }
    return this._pool;
  },
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
    if (!n) return null;
    var index = (opts && opts.index) || 0;
    if (!this._order || this._order.length !== n) { this._order = this._shuffled(n, null); this._curPass = Math.floor(index / n); }
    var pass = Math.floor(index / n);
    if (pass > this._curPass) { this._order = this._shuffled(n, this._order); this._curPass = pass; }
    var r = pool[this._order[index % n]];
    var round = { n: r.n, N: r.N, seed: r.seed + ':' + index };
    return {
      id: 'next-number.' + r.N + '.' + r.n,
      promptKey: 'prompt',
      promptArgs: { n: r.n, m: r.n + 1 },
      celebrateKey: 'celebrate',
      answerType: 'state',
      setup: function (tool) { tool.st = NextNumberCore.newState(round, tool._path()); },
      check: function (tool) { var ok = NextNumberCore.finish(tool.st); if (ok) tool._onRight(); return ok; },
      hintKey: function (tool) {
        var v = NextNumberCore.verdict(tool.st);
        tool._showSlip(v);
        return { noAnswer: 'hintNoAnswer', same: 'hintSame', before: 'hintBefore', far: 'hintFar' }[v] || 'hintBefore';
      }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = NextNumberCore.newState({ n: 4, N: 10, seed: 'boot' }, 'hidden');
    var st = this.st;
    var wrap = api.el('div', 'np-wrap');
    this._wrap = wrap;

    /* ---- the path ---- */
    var mat = api.el('div', 'np-mat');
    mat.setAttribute('role', 'group');
    mat.setAttribute('aria-label', t('pathLabel'));
    this._mat = mat;
    this._bands = [];
    this._stones = [];
    for (var v = 1; v <= st.N; v++) {
      var b = api.el('button', 'np-stone');
      b.type = 'button';
      b.dataset.v = String(v);
      b.innerHTML = '<span class="np-face"></span><span class="np-lid" aria-hidden="true"></span>';
      b.addEventListener('click', this._onStone.bind(this, v));
      this._stones.push(b);
      mat.appendChild(b);
    }
    var puck = api.el('div', 'np-puck');
    puck.setAttribute('aria-hidden', 'true');
    this._puck = puck;
    mat.appendChild(puck);
    wrap.appendChild(mat);

    /* ---- the number keys ---- */
    var keys = api.el('div', 'np-keys');
    keys.setAttribute('role', 'group');
    keys.setAttribute('aria-label', t('keypadLabel'));
    this._keys = [];
    for (var d = 0; d <= 9; d++) {
      var k = api.el('button', 'np-key');
      k.type = 'button'; k.textContent = String(d); k.dataset.d = String(d);
      k.addEventListener('click', this._onKey.bind(this, String(d)));
      keys.appendChild(k); this._keys.push(k);
    }
    var er = api.el('button', 'np-key np-erase');
    er.type = 'button';
    er.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5h11a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H9l-6-7z"/><path d="M12 9l5 5M17 9l-5 5"/></svg>';
    er.setAttribute('aria-label', t('erase'));
    er.addEventListener('click', this._onErase.bind(this));
    keys.appendChild(er); this._keys.push(er);
    this._keysEl = keys;
    wrap.appendChild(keys);

    /* ---- free move ---- */
    var tools = api.el('div', 'np-tools');
    var close = api.el('button', 'np-tool np-close');
    close.type = 'button'; close.textContent = t('closeLids');
    close.addEventListener('click', this._closeLids.bind(this));
    tools.appendChild(close);
    this._tools = tools;
    wrap.appendChild(tools);

    stage.appendChild(wrap);
    this._layout();
    this._paintStones(false);
    this._watchWidth();
  },

  _layout: function () {
    var st = this.st, W = this._matWidth();
    var L = NextNumberCore.layout(st.N, W);
    this._L = L;
    var mat = this._mat;
    mat.style.height = L.height + 'px';
    mat.style.setProperty('--np-w', L.w + 'px');
    mat.style.setProperty('--np-h', L.h + 'px');
    mat.style.setProperty('--np-puck', L.puck + 'px');
    /* path bands: one soft band behind each row */
    while (this._bands.length < L.rows) { var band = this.api.el('div', 'np-band'); band.setAttribute('aria-hidden', 'true'); mat.insertBefore(band, mat.firstChild); this._bands.push(band); }
    for (var r = 0; r < this._bands.length; r++) {
      var bd = this._bands[r];
      if (r >= L.rows) { bd.style.display = 'none'; continue; }
      var first = L.points[r * L.cols], inRow = Math.min(L.cols, st.N - r * L.cols);
      bd.style.display = '';
      bd.style.left = (first.x - 6) + 'px'; bd.style.top = (first.y - 5) + 'px';
      bd.style.width = (inRow * L.w + (inRow - 1) * L.gap + 12) + 'px'; bd.style.height = (L.h + 10) + 'px';
    }
    for (var i = 0; i < this._stones.length; i++) {
      var p = L.points[i], b = this._stones[i];
      b.style.left = p.x + 'px'; b.style.top = p.y + 'px';
      b.style.width = L.w + 'px'; b.style.height = L.h + 'px';
    }
    this._placePuck(st.done ? st.n + 1 : st.n, false);
    var K = NextNumberCore.keypad(W);
    this._keysEl.style.setProperty('--np-key', K.chip + 'px');
    this._keysEl.style.setProperty('--np-kgap', K.gap + 'px');
    this._keysEl.style.width = K.width + 'px';
    if (this._tools) this._tools.style.display = W < 300 ? 'none' : '';
  },
  _placePuck: function (v, animate) {
    var L = this._L, p = L.points[v - 1]; if (!p) return;
    var d = L.puck;
    var x = p.x + Math.round((L.w - d) / 2), y = p.y + L.h - Math.round(d * 0.62);
    var puck = this._puck;
    if (!animate) puck.classList.add('np-still'); else puck.classList.remove('np-still');
    puck.style.left = x + 'px'; puck.style.top = y + 'px';
    if (animate) { puck.classList.remove('np-hop'); void puck.offsetWidth; puck.classList.add('np-hop'); }
  },
  _paintStones: function (animate) {
    var st = this.st, t = this.api.t;
    for (var i = 0; i < this._stones.length; i++) {
      var v = i + 1, b = this._stones[i], face = b.firstChild;
      var isHere = v === st.n, isAsk = !st.done && v === st.n + 1, isDone = st.done && v === st.n + 1;
      var open = NextNumberCore.isOpen(st, v);
      var locked = !st.done && v > st.n + 1;
      b.classList.toggle('is-here', isHere);
      b.classList.toggle('is-ask', isAsk);
      b.classList.toggle('is-done', isDone);
      b.classList.toggle('is-open', open && !isAsk);
      b.classList.toggle('is-locked', locked);
      b.classList.toggle('np-still', !animate);
      if (isAsk) { face.textContent = st.typed || '?'; b.classList.toggle('is-typed', !!st.typed); }
      else face.textContent = String(v);
      b.setAttribute('aria-label', isHere ? interp(t('stoneHere'), { v: v }) : isAsk ? t('stoneAsk') + (st.typed ? ', ' + st.typed : '') : locked ? t('stoneLocked') : open ? String(v) : t('stoneHidden'));
      b.setAttribute('aria-pressed', String(open && !isHere && !isAsk));
    }
    var any = st.open.length > 0;
    if (this._tools) this._tools.firstChild.disabled = !any;
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._matWidth();
    this._ro = new ResizeObserver(function () {
      var w = self._matWidth();
      if (Math.abs(w - last) < 8 || !self._mat || !self._mat.isConnected) return;
      last = w;
      self._layout();
    });
    this._ro.observe(this.api.stage);
  },

  /* ---------------- interaction ---------------- */
  _onStone: function (v) {
    var st = this.st, t = this.api.t, b = this._stones[v - 1];
    if (!st.done && v === st.n + 1) { bounce(b, 'np-bounce'); this.api.announce(t('stoneAsk')); return; }
    var res = NextNumberCore.peek(st, v);
    if (!res.ok) {
      if (res.reason === 'locked') { bounce(b, 'np-wobble'); this.api.announce(t('locked')); }
      return;
    }
    this._paintStones(true);
    this.api.sound(res.open ? 520 : 380);
    this.api.announce(res.open ? String(v) : t('stoneHidden'));
    this.api.track('peek', { v: v, n: st.n, open: res.open });
  },
  _onKey: function (d) {
    var st = this.st;
    if (!NextNumberCore.type(st, d)) { bounce(this._stones[st.n], 'np-wobble'); return; }
    this._paintStones(true);
    bounce(this._stones[st.n], 'np-bounce');
    this.api.sound(600 + 30 * Number(d));
    this.api.announce(st.typed);
    this.api.track('type', { typed: st.typed, n: st.n });
  },
  _onErase: function () {
    var st = this.st;
    if (!NextNumberCore.erase(st)) return;
    this._paintStones(true);
    this.api.sound(300);
    this.api.announce(st.typed || this.api.t('stoneAsk'));
  },
  _onKeyDown: function (e) {
    if (!this.st || !this._mat || !this._mat.isConnected) return;
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.ctrlKey || e.metaKey || e.altKey) return;
    if (/^\d$/.test(e.key)) { this._onKey(e.key); e.preventDefault(); }
    else if (e.key === 'Backspace') { this._onErase(); e.preventDefault(); }
  },
  _closeLids: function () {
    NextNumberCore.closeAll(this.st);
    this._paintStones(true);
    this.api.sound(380);
    this.api.announce(this.api.t('pathHidden'));
    this.api.track('closeLids', { n: this.st.n });
  },
  _showSlip: function (v) {
    var st = this.st;
    if (v === 'noAnswer') {
      for (var i = 0; i < this._keys.length; i++) bounce(this._keys[i], 'np-nudge');
      bounce(this._stones[st.n], 'np-bounce');
      return;
    }
    /* the run-up scaffold: the path opens up to the counter — never past it */
    NextNumberCore.revealRunUp(st);
    this._paintStones(true);
    bounce(this._stones[st.n - 1], 'np-bounce');
    bounce(this._stones[st.n], 'np-wobble');
  },
  _onRight: function () {
    var st = this.st, self = this;
    this._paintStones(true);
    this._placePuck(st.n + 1, true);
    this.api.sound(660); setTimeout(function () { self.api.sound(880); }, 160);
    this._speakNumber(st.n + 1);
    var open = [];
    for (var v = 1; v <= st.n + 1; v++) if (NextNumberCore.isOpen(st, v)) open.push(this._stones[v - 1]);
    for (var k = 0; k < open.length; k++) (function (b, d) { setTimeout(function () { bounce(b, 'np-hopup'); }, 240 + d); }(open[k], 50 * k));
    this.api.track('right', { n: st.n, N: st.N });
  },
  _speakNumber: function (n) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: 1 }); } catch (e) { /* silent */ }
  }
};

function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; }); }
function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }

var npCssDone = false;
function injectNextNumberCSS() {
  if (npCssDone || typeof document === 'undefined') return;
  npCssDone = true;
  var css = ''
  + '.np-wrap{width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;}'
  /* the path */
  + '.np-mat{position:relative;width:100%;border-radius:22px;background:#FFFDF8;border:3px solid var(--lcs-structure);--np-w:60px;--np-h:69px;--np-puck:30px;'
  + 'box-shadow:inset 0 2px 0 rgba(255,255,255,.8),inset 0 -6px 0 rgba(20,107,94,.08),0 6px 0 rgba(20,107,94,.16),0 10px 22px rgba(20,30,28,.08);}'
  + '.np-band{position:absolute;border-radius:18px;background:#F4EBDD;pointer-events:none;}'
  + '.np-stone{position:absolute;padding:0;margin:0;border:0;background:none;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;perspective:300px;}'
  + '.np-stone:focus-visible{outline:3px solid var(--lcs-focus);outline-offset:3px;border-radius:16px;}'
  + '.np-face,.np-lid{position:absolute;inset:0;border-radius:16px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;}'
  + '.np-face{background:#fff;border:2.5px solid var(--lcs-line);color:var(--lcs-structure);font-family:var(--lcs-font-display);font-weight:800;font-size:calc(var(--np-w) * .52);line-height:1;padding-bottom:calc(var(--np-h) * .14);box-shadow:inset 0 -4px 0 rgba(20,107,94,.08);}'
  + '.np-lid{background:linear-gradient(180deg,#F7EAD3,#EBD6B2);border:2.5px solid #CDB088;box-shadow:inset 0 2px 0 rgba(255,255,255,.7),0 3px 0 #C9A97C;transform-origin:50% 0;transition:transform .32s var(--lcs-ease),opacity .25s;}'
  + '.np-lid::after{content:"";width:34%;height:7%;border-radius:999px;background:#CDB088;opacity:.7;}'
  + '.np-stone.is-open .np-lid,.np-stone.is-ask .np-lid,.np-stone.is-done .np-lid{transform:rotateX(-92deg);opacity:0;pointer-events:none;}'
  + '.np-stone.np-still .np-lid{transition:none;}'
  + '.np-stone.is-here .np-face{border-color:var(--lcs-structure);box-shadow:0 0 0 3px rgba(20,107,94,.14),inset 0 -4px 0 rgba(20,107,94,.08);}'
  + '.np-stone.is-ask .np-face{border:3px dashed var(--lcs-structure);background:#F1F8F6;color:var(--lcs-accent);}'
  + '.np-stone.is-ask.is-typed .np-face{color:var(--lcs-ink);border-style:solid;background:#fff;}'
  + '.np-stone.is-done .np-face{border-color:var(--lcs-good);background:#F1FAF3;}'
  /* a locked lid (after the question) is flatter, paler and has no pull-tab — and fully
     opaque: a hidden numeral must never ghost through (that is an answer tell) */
  + '.np-stone.is-locked{cursor:default;} .np-stone.is-locked .np-lid{background:linear-gradient(180deg,#F5EBDA,#EFE1C9);border-color:#DCC6A4;box-shadow:inset 0 2px 0 rgba(255,255,255,.6),0 2px 0 #D8BE98;}'
  + '.np-stone.is-locked .np-lid::after{display:none;}'
  /* and the face of any closed stone is not painted at all (nothing to ghost) */
  + '.np-stone:not(.is-open):not(.is-ask):not(.is-done) .np-face{visibility:hidden;}'
  + '.np-stone:not(.is-locked):hover .np-lid,.np-stone:not(.is-locked):hover .np-face{filter:brightness(1.03);}'
  + '.np-stone:active{transform:scale(.96);}'
  + '.np-bounce{animation:np-bounce .4s var(--lcs-ease) 1;}'
  + '@keyframes np-bounce{0%,100%{transform:none;}40%{transform:translateY(-6px) scale(1.04);}}'
  + '.np-wobble{animation:np-wobble .4s var(--lcs-ease) 1;}'
  + '@keyframes np-wobble{0%,100%{transform:translateX(0);}25%{transform:translateX(-6px) rotate(-2deg);}75%{transform:translateX(6px) rotate(2deg);}}'
  + '.np-hopup{animation:np-hopup .5s var(--lcs-ease) 1;}'
  + '@keyframes np-hopup{0%{transform:none;}35%{transform:translateY(-10px) scale(1.04,.96);}70%{transform:translateY(0) scale(.98,1.02);}100%{transform:none;}}'
  /* the counter */
  + '.np-puck{position:absolute;width:var(--np-puck);height:var(--np-puck);border-radius:50%;pointer-events:none;z-index:2;'
  + 'background:radial-gradient(circle at 35% 32%,#FFB08E,var(--lcs-accent) 55%,#D65F33);border:3px solid #fff;box-shadow:0 3px 0 #B9522B,0 6px 12px rgba(0,0,0,.2);transition:left .5s var(--lcs-ease),top .5s var(--lcs-ease);}'
  + '.np-puck.np-still{transition:none;}'
  + '.np-puck.np-hop{animation:np-hop .5s var(--lcs-ease) 1;}'
  + '@keyframes np-hop{0%{transform:none;}45%{transform:translateY(-26px) scale(1.12);}100%{transform:none;}}'
  /* the number keys */
  + '.np-keys{display:flex;flex-wrap:wrap;justify-content:center;gap:var(--np-kgap,5px);--np-key:50px;max-width:100%;}'
  + '.np-key{width:var(--np-key);height:var(--np-key);padding:0;border-radius:14px;background:var(--lcs-surface);border:2px solid var(--lcs-line);'
  + 'font-family:var(--lcs-font-display);font-weight:800;font-size:calc(var(--np-key) * .46);color:var(--lcs-structure);cursor:pointer;touch-action:manipulation;display:flex;align-items:center;justify-content:center;'
  + 'box-shadow:0 3px 0 rgba(20,30,28,.10);transition:transform .1s var(--lcs-ease),background .15s;-webkit-tap-highlight-color:transparent;}'
  + '.np-key:hover{background:var(--lcs-structure-soft);} .np-key:active{transform:translateY(2px);box-shadow:0 1px 0 rgba(20,30,28,.10);}'
  + '.np-key:focus-visible{outline:3px solid var(--lcs-focus);outline-offset:2px;}'
  + '.np-erase{color:var(--lcs-accent);}'
  + '.np-nudge{animation:np-nudge .7s var(--lcs-ease) 1;}'
  + '@keyframes np-nudge{50%{transform:translateY(-4px);}}'
  /* free move */
  + '.np-tools{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}'
  + '.np-tool{min-height:44px;padding:0 16px;border-radius:999px;border:2px solid var(--lcs-structure-soft);background:var(--lcs-surface);font-family:var(--lcs-font-body);font-weight:700;font-size:15px;color:var(--lcs-structure);cursor:pointer;touch-action:manipulation;}'
  + '.np-tool:hover{background:var(--lcs-structure-soft);} .np-tool:disabled{opacity:.45;cursor:default;}'
  + '@media (prefers-reduced-motion:reduce){.np-stone,.np-lid,.np-puck,.np-key{animation:none!important;transition:none!important;}}';
  var style = document.createElement('style');
  style.id = 'np-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = NextNumberActivity;
if (typeof window !== 'undefined') window.NextNumberActivity = NextNumberActivity;
