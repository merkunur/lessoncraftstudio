/* =====================================================================
   merge-drops-activity.js — ACTIVITY #83 of the one-by-one rebuild:
   "Add Three Numbers" → THE MERGING DROPS (1.OA.A.2, 11 locales).
   Design sheet: docs/activities-rebuild/designs/083-numberbond.md
   ---------------------------------------------------------------------
   THE INVENTION: each number is a glassy drop of beads sitting in a part
   circle of a three-part bond. Drag any drop onto another (or tap one,
   then the other) and they melt into one, keeping each bead's colour; a
   drop of ten or more packs its first ten into a gold-ringed PEARL (a 2 ×
   5 frame) with the rest in a droplet. The last drop rises into the whole
   circle. Any order ends in the same drop ("Try another way"). A wrong
   total that is the sum of two drops joins exactly those two and leaves
   the third outside, pulsing.
   ACTIVITY LAYER ONLY: the model is merge-drops-core.js; no pictures (the
   beads are apparatus); lcs-shell.js untouched (the shell's Check is
   hidden and pressed by this activity on success). Test seams:
   window.MergeDropsActivity.st / ._pool / ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var MergeDropsActivity = {
  id: 'merge-drops',
  apparatusClasses: ['md-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'The Merging Drops',de:'Die Tropfen fließen zusammen',nl:'Samensmeltende druppels',da:'Dråber der flyder sammen',sv:'Droppar som flyter ihop',no:'Dråper som flyter sammen',es:'Las gotas que se juntan',it:'Le gocce che si uniscono',pt:'As gotas que se juntam',fr:'Les gouttes qui fusionnent',fi:'Yhteen sulautuvat pisarat'},
    tLine:       {en:'Join the drops in any order, then type how many beads there are.',de:'Lass die Tropfen in beliebiger Reihenfolge zusammenfließen und tippe ein, wie viele Kugeln es sind.',nl:'Laat de druppels samensmelten in de volgorde die je wilt en typ hoeveel kralen het zijn.',da:'Lad dråberne flyde sammen i den rækkefølge, du vil, og skriv, hvor mange kugler der er.',sv:'Låt dropparna flyta ihop i vilken ordning du vill och skriv hur många kulor det är.',no:'La dråpene flyte sammen i den rekkefølgen du vil, og skriv hvor mange kuler det er.',es:'Junta las gotas en el orden que quieras y escribe cuántas bolitas hay.',it:'Unisci le gocce nell’ordine che vuoi e scrivi quante palline ci sono.',pt:'Junte as gotas na ordem que quiser e digite quantas bolinhas há.',fr:'Fusionne les gouttes dans l’ordre que tu veux, puis tape le nombre de billes.',fi:'Yhdistä pisarat haluamassasi järjestyksessä ja kirjoita, montako palloa on yhteensä.'},
    hEmpty:      {en:'Join the drops, or add in your head — then type how many beads there are.',de:'Lass die Tropfen zusammenfließen oder rechne im Kopf – und tippe dann ein, wie viele Kugeln es sind.',nl:'Laat de druppels samensmelten of reken uit je hoofd – en typ dan hoeveel kralen het zijn.',da:'Lad dråberne flyde sammen, eller regn i hovedet – og skriv så, hvor mange kugler der er.',sv:'Låt dropparna flyta ihop eller räkna i huvudet – och skriv sedan hur många kulor det är.',no:'La dråpene flyte sammen eller regn i hodet – og skriv så hvor mange kuler det er.',es:'Junta las gotas o suma mentalmente, y luego escribe cuántas bolitas hay.',it:'Unisci le gocce o calcola a mente, poi scrivi quante palline ci sono.',pt:'Junte as gotas ou some de cabeça e depois digite quantas bolinhas há.',fr:'Fusionne les gouttes ou calcule dans ta tête, puis tape le nombre de billes.',fi:'Yhdistä pisarat tai laske päässä – ja kirjoita sitten, montako palloa on yhteensä.'},
    hTwo:        {en:'Your {n} is only two of the drops. One drop is still left out!',de:'Deine {n} – das sind nur zwei der Tropfen. Ein Tropfen ist noch übrig!',nl:'Jouw {n}, dat zijn maar twee van de druppels. Eén druppel doet nog niet mee!',da:'Dit svar, {n}, er kun to af dråberne. Én dråbe er stadig tilbage!',sv:'Ditt svar, {n}, är bara två av dropparna. En droppe är fortfarande kvar!',no:'Svaret ditt, {n}, er bare to av dråpene. Én dråpe er fortsatt igjen!',es:'Tu {n} son solo dos de las gotas. ¡Todavía queda una gota afuera!',it:'Il tuo {n} sono solo due delle gocce. Una goccia è rimasta fuori!',pt:'O seu {n} são só duas das gotas. Ainda tem uma gota de fora!',fr:'Ton {n}, ce sont seulement deux des gouttes. Il reste encore une goutte à part !',fi:'Lukusi {n} on vain kaksi pisaroista yhdessä. Yksi pisara on vielä erillään!'},
    hPearl:      {en:'Look for the pearl. A full ten and how many more?',de:'Such die Perle. Ein voller Zehner und wie viele noch?',nl:'Zoek de parel. Een volle tien en hoeveel nog meer?',da:'Find perlen. En hel tier og hvor mange flere?',sv:'Leta efter pärlan. Ett helt tiotal och hur många till?',no:'Se etter perlen. En hel tier og hvor mange til?',es:'Busca la perla. ¿Una decena completa y cuántas más?',it:'Cerca la perla. Una decina completa e quante in più?',pt:'Procure a pérola. Uma dezena completa e quantas mais?',fr:'Cherche la perle. Une dizaine complète, et combien en plus ?',fi:'Etsi helmi. Täysi kymppi ja montako lisää?'},
    hPearlTen:   {en:'The drops fill the pearl. How many beads make a full pearl?',de:'Die Tropfen füllen die Perle. Wie viele Kugeln sind eine volle Perle?',nl:'De druppels vullen de parel. Hoeveel kralen zitten er in een volle parel?',da:'Dråberne fylder perlen. Hvor mange kugler er der i en fuld perle?',sv:'Dropparna fyller pärlan. Hur många kulor är en full pärla?',no:'Dråpene fyller perlen. Hvor mange kuler er en full perle?',es:'Las gotas llenan la perla. ¿Cuántas bolitas hay en una perla completa?',it:'Le gocce riempiono la perla. Quante palline ci sono in una perla piena?',pt:'As gotas enchem a pérola. Quantas bolinhas tem uma pérola cheia?',fr:'Les gouttes remplissent la perle. Combien de billes dans une perle pleine ?',fi:'Pisarat täyttävät helmen. Montako palloa on täydessä helmessä?'},
    hJoined:     {en:'All the drops are joined now. How many beads are there?',de:'Jetzt sind alle Tropfen zusammengeflossen. Wie viele Kugeln sind es?',nl:'Nu zijn alle druppels samengesmolten. Hoeveel kralen zijn het?',da:'Nu er alle dråberne flydt sammen. Hvor mange kugler er der?',sv:'Nu har alla dropparna flutit ihop. Hur många kulor är det?',no:'Nå har alle dråpene flytt sammen. Hvor mange kuler er det?',es:'Ahora todas las gotas están juntas. ¿Cuántas bolitas hay?',it:'Ora tutte le gocce sono unite. Quante palline ci sono?',pt:'Agora todas as gotas estão juntas. Quantas bolinhas há?',fr:'Maintenant, toutes les gouttes ont fusionné. Combien y a-t-il de billes ?',fi:'Nyt kaikki pisarat ovat yhdessä. Montako palloa pisarassa on?'},
    hCount:      {en:'Ten in the pearl — count on from 10.',de:'Zehn in der Perle – zähl von 10 weiter.',nl:'Tien in de parel – tel verder vanaf 10.',da:'Ti i perlen – tæl videre fra 10.',sv:'Tio i pärlan – räkna vidare från 10.',no:'Ti i perlen – tell videre fra 10.',es:'Diez en la perla: sigue contando desde 10.',it:'Dieci nella perla: continua a contare da 10.',pt:'Dez na pérola: continue contando a partir de 10.',fr:'Il y a dix dans la perle : continue de compter à partir de 10.',fi:'Helmessä on kymmenen – jatka laskemista luvusta 10 eteenpäin.'},
    hCountAll:   {en:'Count the beads in the last drop.',de:'Zähl die Kugeln im letzten Tropfen.',nl:'Tel de kralen in de laatste druppel.',da:'Tæl kuglerne i den sidste dråbe.',sv:'Räkna kulorna i den sista droppen.',no:'Tell kulene i den siste dråpen.',es:'Cuenta las bolitas de la última gota.',it:'Conta le palline nell’ultima goccia.',pt:'Conte as bolinhas da última gota.',fr:'Compte les billes de la dernière goutte.',fi:'Laske viimeisen pisaran pallot.'},
    hCountTen:   {en:'The pearl is full — a full ten.',de:'Die Perle ist voll – ein voller Zehner.',nl:'De parel is vol – een volle tien.',da:'Perlen er fuld – en hel tier.',sv:'Pärlan är full – ett helt tiotal.',no:'Perlen er full – en hel tier.',es:'La perla está llena: una decena completa.',it:'La perla è piena: una decina completa.',pt:'A pérola está cheia: uma dezena completa.',fr:'La perle est pleine : une dizaine complète.',fi:'Helmi on täynnä – täysi kymppi.'},
    okPath:      {en:'{a} + {b} = {s} and {s} + {c} = {total}',de:'{a} + {b} = {s} und {s} + {c} = {total}',nl:'{a} + {b} = {s} en {s} + {c} = {total}',da:'{a} + {b} = {s} og {s} + {c} = {total}',sv:'{a} + {b} = {s} och {s} + {c} = {total}',no:'{a} + {b} = {s} og {s} + {c} = {total}',es:'{a} + {b} = {s} y {s} + {c} = {total}',it:'{a} + {b} = {s} e {s} + {c} = {total}',pt:'{a} + {b} = {s} e {s} + {c} = {total}',fr:'{a} + {b} = {s} et {s} + {c} = {total}',fi:'{a} + {b} = {s} ja {s} + {c} = {total}'},
    okPlain:     {en:'{a} + {b} + {c} = {total}',de:'{a} + {b} + {c} = {total}',nl:'{a} + {b} + {c} = {total}',da:'{a} + {b} + {c} = {total}',sv:'{a} + {b} + {c} = {total}',no:'{a} + {b} + {c} = {total}',es:'{a} + {b} + {c} = {total}',it:'{a} + {b} + {c} = {total}',pt:'{a} + {b} + {c} = {total}',fr:'{a} + {b} + {c} = {total}',fi:'{a} + {b} + {c} = {total}'},
    okAny:       {en:'Any order — still {total}!',de:'Egal in welcher Reihenfolge – immer {total}!',nl:'In elke volgorde – nog steeds {total}!',da:'Lige meget hvilken rækkefølge – stadig {total}!',sv:'Vilken ordning som helst – fortfarande {total}!',no:'Uansett rekkefølge – fortsatt {total}!',es:'En cualquier orden: ¡siempre {total}!',it:'In qualsiasi ordine: sempre {total}!',pt:'Em qualquer ordem: sempre {total}!',fr:'Dans n’importe quel ordre, toujours {total} !',fi:'Missä järjestyksessä tahansa – aina {total}!'},
    tryOther:    {en:'See other ways',de:'Andere Wege zeigen',nl:'Andere manieren',da:'Se andre måder',sv:'Visa andra sätt',no:'Se andre måter',es:'Ver otros caminos',it:'Vedi altri modi',pt:'Ver outros jeitos',fr:'Voir d’autres façons',fi:'Katso muut tavat'},
    setNumbers:  {en:'Numbers',de:'Zahlen',nl:'Getallen',da:'Tal',sv:'Tal',no:'Tall',es:'Números',it:'Numeri',pt:'Números',fr:'Nombres',fi:'Luvut'},
    w10:         {en:'Within 10',de:'bis 10',nl:'tot 10',da:'op til 10',sv:'upp till 10',no:'opp til 10',es:'hasta 10',it:'fino a 10',pt:'até 10',fr:'jusqu’à 10',fi:'10:een asti'},
    w20:         {en:'Within 20',de:'bis 20',nl:'tot 20',da:'op til 20',sv:'upp till 20',no:'opp til 20',es:'hasta 20',it:'fino a 20',pt:'até 20',fr:'jusqu’à 20',fi:'20:een asti'},
    setBeads:    {en:'Beads',de:'Kugeln',nl:'Kralen',da:'Kugler',sv:'Kulor',no:'Kuler',es:'Bolitas',it:'Palline',pt:'Bolinhas',fr:'Billes',fi:'Pallot'},
    bShow:       {en:'Show beads',de:'Kugeln zeigen',nl:'Kralen laten zien',da:'Vis kugler',sv:'Visa kulor',no:'Vis kuler',es:'Mostrar bolitas',it:'Mostra le palline',pt:'Mostrar bolinhas',fr:'Montrer les billes',fi:'Näytä pallot'},
    bNum:        {en:'Numerals only',de:'Nur Zahlen',nl:'Alleen getallen',da:'Kun tal',sv:'Bara siffror',no:'Bare tall',es:'Solo números',it:'Solo numeri',pt:'Só números',fr:'Seulement les nombres',fi:'Vain numerot'},
    ariaDrop:    {en:'Drop, {n} beads',de:'Tropfen, {n} Kugeln',nl:'Druppel, {n} kralen',da:'Dråbe, {n} kugler',sv:'Droppe, {n} kulor',no:'Dråpe, {n} kuler',es:'Gota, {n} bolitas',it:'Goccia, {n} palline',pt:'Gota, {n} bolinhas',fr:'Goutte, {n} billes',fi:'Pisara, {n} palloa'},
    ariaDrop1:   {en:'Drop, 1 bead',de:'Tropfen, 1 Kugel',nl:'Druppel, 1 kraal',da:'Dråbe, 1 kugle',sv:'Droppe, 1 kula',no:'Dråpe, 1 kule',es:'Gota, 1 bolita',it:'Goccia, 1 pallina',pt:'Gota, 1 bolinha',fr:'Goutte, 1 bille',fi:'Pisara, 1 pallo'},
    ariaJoined:  {en:'Joined drop',de:'Zusammengeflossener Tropfen',nl:'Samengesmolten druppel',da:'Sammenflydt dråbe',sv:'Hopfluten droppe',no:'Sammenflytt dråpe',es:'Gota unida',it:'Goccia unita',pt:'Gota unida',fr:'Goutte fusionnée',fi:'Yhdistetty pisara'},
    ariaUndo:    {en:'Undo the last join',de:'Letztes Zusammenfließen rückgängig machen',nl:'Laatste samensmelting ongedaan maken',da:'Fortryd den sidste sammenlægning',sv:'Ångra den senaste sammanslagningen',no:'Angre den siste sammenslåingen',es:'Deshacer la última unión',it:'Annulla l’ultima unione',pt:'Desfazer a última junção',fr:'Annuler la dernière fusion',fi:'Peru viimeisin yhdistäminen'},
    ariaCheck:   {en:'Check',de:'Prüfen',nl:'Controleren',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    ariaDel:     {en:'Delete',de:'Löschen',nl:'Wissen',da:'Slet',sv:'Radera',no:'Slett',es:'Borrar',it:'Cancella',pt:'Apagar',fr:'Effacer',fi:'Poista'},
    ariaAnswer:  {en:'Beads in all: {n}',de:'Kugeln zusammen: {n}',nl:'Kralen samen: {n}',da:'Kugler i alt: {n}',sv:'Kulor sammanlagt: {n}',no:'Kuler til sammen: {n}',es:'Bolitas en total: {n}',it:'Palline in tutto: {n}',pt:'Bolinhas ao todo: {n}',fr:'Billes en tout : {n}',fi:'Palloja yhteensä: {n}'}
  },/*STRINGS-END*/

  defaults: { numbers: 'w20', beads: 'show' },
  settings: [
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: 'w10', labelKey: 'w10' }, { value: 'w20', labelKey: 'w20' }] },
    { key: 'beads', type: 'choice', labelKey: 'setBeads', options: [{ value: 'show', labelKey: 'bShow' }, { value: 'num', labelKey: 'bNum' }] }
  ],

  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._drag = null;
    injectDropsCSS();
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
  _loc: function () { return MergeDropsCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return MergeDropsCore.levelOf(this._setting('numbers')); },
  _key: function () { return this._level(); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = MergeDropsCore.ids(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = MergeDropsCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice(), p = C.plan(this._level(), Math.random, prev);
      this._order = p.order; this._orderForPool = pool; this._pass = pass;
    }
    var idx = this._order[pos], pa = { msg: this._t('tLine') }; this._pa = pa;
    return {
      id: 'drops.' + this._loc() + '.' + this._level() + '.' + idx, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _start: function (idx) {
    var C = MergeDropsCore;
    this._clearTimers(); this._busy = false; this._view = {}; this._drag = null;
    this.st = C.newState(C.round(this._level(), idx));
    var line = this._t('tLine');
    if (this._pa) this._pa.msg = line;
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
    var wrap = api.el('div', 'md-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="md-bond"></div><div class="md-tbtns"><button type="button" class="md-tbtn md-undo" data-k="undo"></button><button type="button" class="md-tbtn md-other" data-k="other"></button></div><div class="md-ways"></div><p class="md-note" aria-live="polite"></p><div class="md-keys" role="group"></div>';
    this._q = function (s) { return wrap.querySelector(s); };
    var un = this._q('.md-undo'); un.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 9 4 15l6 6" fill="none" stroke="#146B5E" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 15h13a8 8 0 0 1 0 16h-3" fill="none" stroke="#146B5E" stroke-width="3.5" stroke-linecap="round"/></svg>';
    un.setAttribute('aria-label', this._t('ariaUndo'));
    un.addEventListener('click', function () { if (MergeDropsCore.undo(self.st)) { self._view = {}; self.api.sound(380); self._paint(); } });
    this._q('.md-other').textContent = this._t('tryOther');
    this._q('.md-other').addEventListener('click', function () { self._view.ways = true; self._paint(); self._advance(4500); });
    wrap.addEventListener('keydown', function (e) {
      if (/^[0-9]$/.test(e.key)) { self._type(e.key); e.preventDefault(); }
      else if (e.key === 'Backspace') { self._type('del'); e.preventDefault(); }
      else if (e.key === 'u' || e.key === 'U') { if (MergeDropsCore.undo(self.st)) { self._view = {}; self._paint(); } e.preventDefault(); }
    });
    var keys = this._q('.md-keys');
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del', 'ok'].forEach(function (k) {
      var b = api.el('button', 'md-key' + (k === 'ok' ? ' is-ok' : k === 'del' ? ' is-del' : '')); b.type = 'button'; b.setAttribute('data-k', 'key-' + k);
      if (k === 'ok') { b.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 17l6 6 12-14" fill="none" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'; b.setAttribute('aria-label', self._t('ariaCheck')); }
      else if (k === 'del') { b.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12 8h14v16H12l-7-8z" fill="none" stroke="#146B5E" stroke-width="3" stroke-linejoin="round"/><path d="M15 13l6 6M21 13l-6 6" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/></svg>'; b.setAttribute('aria-label', self._t('ariaDel')); }
      else b.textContent = k;
      b.addEventListener('click', function () { if (k === 'ok') self._check(); else self._type(k); });
      keys.appendChild(b);
    });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  /* where every drop sits: one drop rises into the whole circle; on phones a joined drop takes the centre part circle */
  _places: function (G) {
    var st = this.st, out = {}, narrow = this._L.mode !== 'wide';
    if (st.drops.length === 1) { out[st.drops[0].id] = { x: G.cx, y: G.wy, whole: true }; return out; }
    var used = {};
    var joined = st.drops.filter(function (d) { return d.parts.length > 1; })[0];
    if (joined && narrow) { out[joined.id] = { x: G.px[1], y: G.py }; used[1] = 1; }
    st.drops.forEach(function (d) {
      if (out[d.id]) return;
      var s = d.slot; if (used[s]) { s = [0, 2, 1].filter(function (k) { return !used[k] && !st.drops.some(function (o) { return o !== d && o.slot === k && !out[o.id]; }); })[0]; if (s == null) s = d.slot; }
      used[s] = 1; out[d.id] = { x: G.px[s], y: G.py };
    });
    return out;
  },
  _geom: function () {
    var L = this._L, W = Math.min(this._width(), 660), wide = L.mode === 'wide';
    var gap = wide ? 46 : 20, wy = L.whole / 2 + 4, py = L.whole + gap + L.part / 2;
    var spread = Math.min(wide ? 212 : 999, (W - L.part) / 2 - 2), cx = W / 2;
    var droplet = !wide && this.st.drops.length > 1 && this.st.drops.some(function (d) { return d.parts.length > 1 && d.n > 10; });   /* a phone's droplet hangs below its drop */
    return { W: W, H: py + L.part / 2 + (wide ? 18 : droplet ? 46 : 8), cx: cx, wy: wy, py: py, px: [cx - spread, cx, cx + spread] };
  },
  _paint_: function () {
    if (!this._wrap) return;
    var C = MergeDropsCore, st = this.st, r = st.r, L = this._L = C.layout(this._width()), v = this._view, self = this;
    if (st.drops.length === 1) { if (L.mode !== 'wide') { L.whole = Math.min(168, L.W - 40); L.part = 64; } else { L.whole = 280; L.part = 110; } }   /* … and the three empty part circles step back */   /* the last drop on a phone gets a bigger whole circle, so its counted beads stay readable */
    this._wrap.className = 'md-wrap is-' + L.mode + (L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    var G = this._geom(), bond = this._q('.md-bond'); bond.innerHTML = '';
    bond.style.width = G.W + 'px'; bond.style.height = G.H + 'px';
    /* the bond: three part circles, one whole circle, three lines */
    var sv = '<svg class="md-lines" width="' + G.W + '" height="' + G.H + '" aria-hidden="true">';
    G.px.forEach(function (x) { sv += '<line x1="' + G.cx + '" y1="' + (G.wy + L.whole / 2 - 6) + '" x2="' + x + '" y2="' + (G.py - L.part / 2 + 6) + '" class="md-line' + (st.done ? ' is-glow' : '') + '"/>'; });
    sv += '</svg>'; bond.insertAdjacentHTML('beforeend', sv);
    var places = this._places(G), filled = {};
    Object.keys(places).forEach(function (id) { if (!places[id].whole) filled[G.px.indexOf(places[id].x)] = 1; });
    G.px.forEach(function (x, s) { var c = self.api.el('span', 'md-pc' + (filled[s] ? '' : ' is-empty')); c.style.cssText = 'left:' + (x - L.part / 2) + 'px;top:' + (G.py - L.part / 2) + 'px;width:' + L.part + 'px;height:' + L.part + 'px;'; bond.appendChild(c); });
    var wc = this.api.el('span', 'md-wc' + (st.done ? ' is-full' : '')); wc.style.cssText = 'left:' + (G.cx - L.whole / 2) + 'px;top:4px;width:' + L.whole + 'px;height:' + L.whole + 'px;'; bond.appendChild(wc);
    var box = this.api.el('span', 'md-ans' + (st.done ? ' is-ok' : '')); box.textContent = st.typed || ''; box.setAttribute('aria-label', this._t('ariaAnswer', { n: st.typed || '–' }));
    box.style.cssText = 'left:' + (G.cx + L.whole / 2 - (L.mode === 'wide' ? 40 : 30)) + 'px;top:' + (L.whole - (L.mode === 'wide' ? 46 : 34)) + 'px;'; bond.appendChild(box);
    /* the drops */
    var out = st.last && st.last.reason === 'two' && !st.done ? 'ABC'.charAt(st.last.out) : null;
    st.drops.forEach(function (d) {
      var p = places[d.id], LL = p.whole && L.mode !== 'wide' ? { mode: L.mode, tiny: false, bead: 14 } : L, g = dropSVG(d, LL, self._setting('beads') !== 'num' || d.parts.length > 1, st.show >= 2 && st.drops.length === 1 && !st.done, p.whole ? L.whole - 14 : (L.mode === 'wide' ? 999 : L.part + 34));
      var b = self.api.el('button', 'md-drop' + (d.parts.length > 1 ? ' is-joined' : ' is-' + d.id) + (st.sel === d.id ? ' is-sel' : '') + (d.id === out ? ' is-out' : '') + (p.whole ? ' is-whole' : '') + (C.isPearl(d) && d.parts.length > 1 ? ' is-pearl' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'drop-' + d.id); b.setAttribute('data-id', d.id);
      b.setAttribute('aria-label', d.parts.length > 1 ? self._t('ariaJoined') : (d.n === 1 ? self._t('ariaDrop1') : self._t('ariaDrop', { n: d.n })));
      b.style.cssText = 'left:' + (p.x - g.w / 2) + 'px;top:' + (p.y - g.h / 2) + 'px;width:' + g.w + 'px;height:' + g.h + 'px;';
      b.innerHTML = g.svg;
      if (d.parts.length === 1) { var nb = self.api.el('span', 'md-num'); nb.textContent = String(d.n); b.appendChild(nb); }
      b.disabled = st.done || st.drops.length === 1;
      self._wireDrop(b, d.id);
      bond.appendChild(b);
    });
    /* chips, ways, note */
    this._q('.md-undo').disabled = st.done || !st.log.length;
    var other = this._q('.md-other'); other.hidden = !st.done; other.disabled = !!v.ways;
    var ways = this._q('.md-ways'); ways.innerHTML = '';
    if (st.done && v.ways) C.allOrders(r).forEach(function (o) { var c = self.api.el('div', 'md-way'); c.innerHTML = '<span>' + o.a + ' + ' + o.b + ' = ' + o.s + '</span><span>' + o.s + ' + ' + o.c + ' = <b>' + o.total + '</b></span>'; ways.appendChild(c); });
    [].forEach.call(this._wrap.querySelectorAll('.md-key'), function (k) { k.disabled = st.done; });
    var note = this._q('.md-note'), hk = C.hint(st), txt = '', cls = 'md-note';
    if (v.msg) { txt = v.ways ? v.msg + ' ' + this._t('okAny', { total: r.total }) : v.msg; cls += ' is-ok'; }
    else if (hk) { txt = this._t(hk, { n: st.last && st.last.n }); cls += ' is-hint'; }
    note.className = cls; note.textContent = txt;
  },
  /* drag a drop onto another, or tap one and then the other */
  _wireDrop: function (b, id) {
    var self = this;
    b.addEventListener('pointerdown', function (e) {
      if (self.st.done || self._busy) return;
      self._drag = { id: id, x0: e.clientX, y0: e.clientY, moved: false, el: b };
      try { b.setPointerCapture(e.pointerId); } catch (er) {}
    });
    b.addEventListener('pointermove', function (e) {
      var d = self._drag; if (!d || d.id !== id) return;
      var dx = e.clientX - d.x0, dy = e.clientY - d.y0;
      if (!d.moved && Math.abs(dx) + Math.abs(dy) > 8) { d.moved = true; b.classList.add('is-dragging'); }
      if (d.moved) b.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
    });
    b.addEventListener('pointerup', function (e) {
      var d = self._drag; self._drag = null; if (!d || d.id !== id) return;
      if (!d.moved) return;   /* a tap: handled by click */
      b.classList.remove('is-dragging'); b.style.transform = '';
      var hit = null;
      [].forEach.call(self._wrap.querySelectorAll('.md-drop'), function (o) { if (o === b) return; var r = o.getBoundingClientRect(); if (e.clientX >= r.left - 10 && e.clientX <= r.right + 10 && e.clientY >= r.top - 10 && e.clientY <= r.bottom + 10) hit = o.getAttribute('data-id'); });
      b._noClick = true;
      if (hit) self._merge(id, hit);
    });
    b.addEventListener('click', function () {
      if (b._noClick) { b._noClick = false; return; }
      var st = self.st; if (st.done || self._busy) return;
      if (st.sel && st.sel !== id) self._merge(st.sel, id);
      else { st.sel = st.sel === id ? null : id; self._paint(); }
    });
  },
  _merge: function (from, to) {
    var C = MergeDropsCore, st = this.st, d = C.merge(st, from, to);
    if (!d) return;
    this._view = {}; this.api.sound(Math.max(180, 700 - d.n * 22));
    if (d.n === 10) { var self = this; this._later(function () { self.api.sound(1760); }, this._ms(120)); }
    this._paint();
  },
  _type: function (k) { if (this.st.done) return; if (MergeDropsCore.type(this.st, k)) { this._view = {}; this.api.sound(560); this._paint(); } },
  _advance: function (ms) {
    var self = this;
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  },
  _check: function () {
    if (this.st.done) return;
    var C = MergeDropsCore, st = this.st, self = this;
    var p0 = C.path(st), res = C.check(st);
    this._view = {};
    if (!res.ok) { this.api.sound(res.reason === 'empty' ? 460 : 220); this._paint(); this.api.announce(this._q('.md-note').textContent || ''); var kk = this._q('.md-keys'); if (kk && kk.scrollIntoView) kk.scrollIntoView({ block: 'nearest' }); return; }   /* a phone keeps the keypad in reach after the help grows the bond */
    var msg = p0.kind === 'path' ? this._t('okPath', p0) : this._t('okPlain', p0);
    if (this._pa) this._pa.msg = msg; this._view = { msg: msg };
    this.api.sound(1046); this._later(function () { self.api.sound(1318); }, this._ms(140)); this._later(function () { self.api.sound(1568); }, this._ms(280));
    this._paint(); this.api.announce(msg);
    this._later(function () { var n = self._q('.md-note'); if (n && n.scrollIntoView) n.scrollIntoView({ block: 'nearest' }); }, 0);
    this._advance(msg.length * 60 + 1500);
  }
};

/* a drop: one colour and its beads in rows of 5, or (joined) a 2 × 5 frame — gold-ringed as a pearl once it holds ten — with the rest in a droplet */
var MD_COL = { A: '#F2784B', B: '#1E8A78', C: '#E8A53A' };
function dropSVG(d, L, beads, numbered, maxW) {
  var wide = L.mode === 'wide', bs = L.tiny ? 9 : L.bead, gp = wide ? 4 : 3, cs = bs + gp, s = '', W, H;
  if (d.parts.length === 1) {
    var D = Math.max(wide ? 70 + 9 * d.n : (L.tiny ? 50 + 4.5 * d.n : 56 + 5 * d.n), d.n >= 5 ? 5 * cs + (wide ? 24 : 16) : 0), c = MD_COL[d.id];   /* a full row of five always fits inside the rim */
    W = H = Math.round(D);
    s += '<circle cx="' + W / 2 + '" cy="' + H / 2 + '" r="' + (D / 2 - 2) + '" fill="' + c + '" fill-opacity=".22" stroke="' + c + '" stroke-width="3"/>';
    s += '<ellipse cx="' + (W * 0.36) + '" cy="' + (H * 0.28) + '" rx="' + (D * 0.12) + '" ry="' + (D * 0.07) + '" fill="#FFFFFF" fill-opacity=".55"/>';
    if (beads) { var rows = Math.ceil(d.n / 5); for (var i = 0; i < d.n; i++) { var row = Math.floor(i / 5), inRow = Math.min(5, d.n - row * 5), col = i % 5; var x = W / 2 + (col - (inRow - 1) / 2) * cs, y = H / 2 + (row - (rows - 1) / 2) * cs + (wide ? 6 : 4); s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (bs / 2) + '" fill="' + c + '" class="md-bead"/>'; } }
    return { svg: '<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' + s + '</svg>', w: W, h: H };
  }
  var P = MergeDropsCore.pack(d), fw = 5 * cs, fh = 2 * cs, D2 = Math.round(Math.max(fw, fh) + (wide ? 34 : 22)), rest = P.rest.length;
  var side = wide, dw = rest ? Math.min(5, rest) * cs + 12 : 0, dh = rest ? Math.ceil(rest / 5) * cs + 12 : 0;
  W = D2 + (rest && side ? dw - 6 : 0); H = D2 + (rest && !side ? dh - 6 : 0);
  var cx = D2 / 2, cy = D2 / 2;
  s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (D2 / 2 - 2) + '" fill="#EAF6F2" stroke="#6FB3A6" stroke-width="3"/>';
  if (rest) { var dx = side ? D2 - 6 + dw / 2 : cx, dy = side ? cy : D2 - 6 + dh / 2; s += '<rect x="' + (dx - dw / 2) + '" y="' + (dy - dh / 2) + '" width="' + dw + '" height="' + dh + '" rx="' + Math.min(dw, dh) / 2 + '" fill="#EAF6F2" stroke="#6FB3A6" stroke-width="3"/>'; }
  var x0 = cx - fw / 2, y0 = cy - fh / 2;
  if (P.pearl) s += '<rect x="' + (x0 - 6) + '" y="' + (y0 - 6) + '" width="' + (fw + 12) + '" height="' + (fh + 12) + '" rx="' + (cs * 0.7) + '" fill="#FFF6D6" stroke="#D4A21E" stroke-width="3" class="md-pearl"/>';
  for (var k2 = 0; k2 < 10; k2++) { var fx = x0 + (k2 % 5) * cs + cs / 2, fy = y0 + Math.floor(k2 / 5) * cs + cs / 2; s += '<circle cx="' + fx + '" cy="' + fy + '" r="' + (bs / 2) + '" fill="' + (k2 < P.ten.length ? MD_COL[P.ten[k2]] : 'none') + '" stroke="' + (k2 < P.ten.length ? 'none' : '#B9D9D1') + '" stroke-width="1.5"' + (k2 < P.ten.length ? ' class="md-bead"' : '') + '/>'; }
  if (numbered && P.pearl) s += '<text x="' + cx + '" y="' + (y0 - 9) + '" class="md-ten" font-size="' + (wide ? 18 : 13) + '">10</text>';
  for (var m = 0; m < rest; m++) {
    var rx0 = side ? D2 - 6 + 6 : cx - Math.min(5, rest) * cs / 2, ry0 = side ? cy - Math.ceil(rest / 5) * cs / 2 : D2 - 6 + 6;
    var bx = rx0 + (m % 5) * cs + cs / 2, by = ry0 + Math.floor(m / 5) * cs + cs / 2;
    s += '<circle cx="' + bx + '" cy="' + by + '" r="' + (bs / 2) + '" fill="' + MD_COL[P.rest[m]] + '" class="md-bead"/>';   /* never numbered: miss 2 labels the pearl "10" and the child counts on (a numbered last bead would be the answer) */
  }
  var k = Math.min(1, maxW / W);   /* a drop that would not fit its circle is drawn smaller, never cut */
  return { svg: '<svg width="' + Math.round(W * k) + '" height="' + Math.round(H * k) + '" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' + s + '</svg>', w: Math.round(W * k), h: Math.round(H * k) };
}

var mdCssDone = false;
function injectDropsCSS() {
  if (mdCssDone || typeof document === 'undefined') return;
  mdCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.md-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;}'
  + '.md-bond{position:relative;max-width:100%;}'
  + '.md-lines{position:absolute;left:0;top:0;pointer-events:none;} .md-line{stroke:#146B5E;stroke-width:4;stroke-linecap:round;opacity:.55;} .md-line.is-glow{opacity:1;stroke:#D4A21E;}'
  + '.md-pc,.md-wc{position:absolute;border-radius:50%;background:#FFFDF7;box-shadow:inset 0 0 0 3px #146B5E;pointer-events:none;} .md-pc.is-empty{background:transparent;box-shadow:inset 0 0 0 2px #9CC9BE;border:2px dashed #9CC9BE;box-sizing:border-box;}'
  + '.md-wc.is-full{box-shadow:inset 0 0 0 4px #D4A21E,0 0 0 6px #FFF0C2;}'
  + '.md-ans{position:absolute;z-index:4;min-width:72px;height:56px;padding:0 8px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;border-radius:14px;background:#FFFFFF;box-shadow:inset 0 0 0 3px #0F4A40,0 3px 0 rgba(0,0,0,.15);font-family:' + H + ';font-weight:800;font-size:36px;color:#0F4A40;} .md-ans:empty::after{content:"?";color:#9CC9BE;} .md-ans.is-ok{background:#146B5E;color:#FFFFFF;}'
  + '.md-drop{position:absolute;z-index:2;padding:0;border:0;background:none;cursor:grab;touch-action:none;transition:left .3s,top .3s;} .md-drop svg{display:block;} .md-drop:disabled{cursor:default;}'
  + '.md-drop.is-sel{filter:drop-shadow(0 0 6px #F2784B);} .md-drop.is-dragging{z-index:6;transition:none;cursor:grabbing;filter:drop-shadow(0 6px 8px rgba(0,0,0,.25));}'
  + '.md-drop.is-out{animation:mdOut .7s ease-in-out 3;} @keyframes mdOut{50%{transform:translateY(-6px);filter:drop-shadow(0 0 8px #F2784B);}}'
  + '.md-drop.is-A:not(.is-dragging),.md-drop.is-B:not(.is-dragging),.md-drop.is-C:not(.is-dragging){animation:mdBreathe 3s ease-in-out infinite;} .md-drop.is-B{animation-delay:-1s;} .md-drop.is-C{animation-delay:-2s;} @keyframes mdBreathe{50%{transform:translateY(-3px);}}'
  + '.md-drop.is-pearl .md-pearl{animation:mdShine .6s ease-out both;} @keyframes mdShine{from{stroke:#FFFFFF;stroke-width:6;}}'
  + '.md-drop:focus-visible{outline:3px solid #146B5E;outline-offset:2px;border-radius:50%;}'
  + '.md-num{position:absolute;left:50%;top:-6px;transform:translateX(-50%);min-width:32px;height:32px;padding:0 6px;box-sizing:border-box;border-radius:16px;display:flex;align-items:center;justify-content:center;background:#FFFFFF;box-shadow:inset 0 0 0 2px #0F4A40;font-family:' + H + ';font-weight:800;font-size:22px;color:#0F4A40;}'
  + '.md-ten{fill:#8A6500;font-family:' + H + ';font-weight:800;text-anchor:middle;}'
  + '.md-tbtns{display:flex;gap:10px;align-items:center;justify-content:center;min-height:48px;}'
  + '.md-tbtn{height:48px;min-width:48px;padding:0 16px;border:0;border-radius:24px;background:#FFFDF7;box-shadow:inset 0 0 0 2.5px #146B5E;font-family:' + H + ';font-weight:800;font-size:17px;color:#146B5E;cursor:pointer;display:flex;align-items:center;justify-content:center;} .md-tbtn svg{width:24px;height:24px;} .md-tbtn:disabled{opacity:.35;cursor:default;} .md-tbtn[hidden]{display:none;}'
  + '.md-ways{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;} .md-way{display:flex;flex-direction:column;align-items:center;padding:6px 12px;border-radius:12px;background:#F2F8F6;box-shadow:inset 0 0 0 2px #9CC9BE;font-family:' + H + ';font-weight:700;font-size:17px;color:#0F4A40;animation:mdUp .3s ease-out both;} .md-way b{color:#B07A00;} @keyframes mdUp{from{transform:translateY(8px);opacity:0;}}'
  + '.md-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .md-note:empty{display:none;} .md-note.is-hint{color:#B5461F;} .md-note.is-ok{color:#146B5E;font-family:' + H + ';font-size:22px;}'
  + '.md-keys{display:grid;grid-template-columns:repeat(12,minmax(44px,52px));gap:6px;justify-content:center;width:100%;}'
  + '.md-key{height:52px;border:0;border-radius:14px;background:#FFFDF7;box-shadow:inset 0 0 0 2.5px #0F4A40,0 4px 0 #9CC9BE;font-family:' + H + ';font-weight:800;font-size:26px;color:#0F4A40;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
  + '.md-key svg{width:28px;height:28px;} .md-key.is-ok{background:#146B5E;box-shadow:0 4px 0 #0F4A40;} .md-key:disabled{opacity:.5;cursor:default;} .md-key:focus-visible,.md-tbtn:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.md-wrap.is-narrow{gap:6px;} .md-wrap.is-narrow .md-keys{grid-template-columns:repeat(6,minmax(44px,1fr));max-width:420px;gap:5px;} .md-wrap.is-narrow .md-key{height:46px;font-size:24px;}'
  + '.md-wrap.is-narrow .md-ans{min-width:54px;height:44px;font-size:28px;border-radius:12px;} .md-wrap.is-narrow .md-num{min-width:26px;height:26px;font-size:18px;top:-5px;} .md-wrap.is-narrow .md-note{font-size:17px;} .md-wrap.is-narrow .md-way{font-size:15px;padding:4px 8px;}'
  + '.md-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media print{.md-keys,.md-tbtns,.md-note{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.md-wrap *{animation-duration:.15s !important;animation-iteration-count:1 !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'md-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.MergeDropsActivity = MergeDropsActivity;
