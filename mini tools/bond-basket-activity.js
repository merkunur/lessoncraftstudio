/* =====================================================================
   bond-basket-activity.js — ACTIVITY #81 of the one-by-one rebuild:
   "Find the Total" → THE COVERED BASKET (1.OA.A.1, 11 locales).
   Design sheet: docs/activities-rebuild/designs/081-numberbond.md
   ---------------------------------------------------------------------
   THE INVENTION: the child pours one bowl into the basket — the basket
   counts the things on its tag as they fall, then a checked cloth drops
   over them and only the number stays. The other bowl is posted in one
   thing at a time through a slot in the cloth; the running count is never
   shown, so the only way to the total is to count on from the cloth.
   Which bowl to pour is the child's choice (pouring the one with more is
   quicker — found by the hand, nudged once per pass). Miss 1 writes the
   counting-on numbers over the posted things (one AFTER the cloth's
   number); miss 2 lifts the cloth: everything in ten-frame rows, two
   colours. Success: the cloth whips off and the whole circle fills.
   ACTIVITY LAYER ONLY: the model is bond-basket-core.js; pictures through
   lcs-pictures.js; lcs-shell.js untouched (the shell's Check is hidden and
   pressed by this activity on success). Test seams:
   window.BondBasketActivity.st / ._pool / ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var BondBasketActivity = {
  id: 'bond-basket',
  apparatusClasses: ['bb-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'Find the Total',de:'Finde das Ganze',nl:'Vind het totaal',da:'Find det hele',sv:'Hitta det hela',no:'Finn summen',es:'Encuentra el total',it:'Trova il totale',pt:'Encontre o total',fr:'Trouve le total',fi:'Etsi kokonaisuus'},
    tTotal:      {en:'Pour one bowl in. Post the other bowl’s things one by one. How many in all?',de:'Schütte eine Schale hinein. Steck die Dinge aus der anderen Schale einzeln dazu. Wie viele sind es zusammen?',nl:'Giet één schaal erin. Stop de andere er één voor één bij. Hoeveel zijn het er samen?',da:'Hæld den ene skål i. Put tingene fra den anden skål i én ad gangen. Hvor mange er der i alt?',sv:'Häll i den ena skålen. Stoppa i sakerna från den andra skålen en i taget. Hur många är det sammanlagt?',no:'Hell den ene bollen oppi. Putt tingene fra den andre bollen oppi én om gangen. Hvor mange blir det til sammen?',es:'Vacía un tazón en la canasta. Mete las cosas del otro de una en una. ¿Cuántas hay en total?',it:'Versa una ciotola nel cesto. Infila le cose dell’altra una alla volta. Quante sono in tutto?',pt:'Despeje uma tigela no cesto. Coloque as coisas da outra, uma de cada vez. Quantas são ao todo?',fr:'Verse un bol dans le panier. Glisse les objets de l’autre un par un. Combien y en a-t-il en tout ?',fi:'Kaada yksi kulho koriin. Pudota toisen kulhon tavarat yksi kerrallaan. Montako niitä on yhteensä?'},
    tWhole:      {en:'Post things until the basket holds {whole}. How many did you post?',de:'Steck Dinge hinein, bis {whole} im Korb sind. Wie viele hast du hineingesteckt?',nl:'Stop er dingen in tot er {whole} in de mand zitten. Hoeveel heb je erin gestopt?',da:'Put ting i, til der er {whole} i kurven. Hvor mange puttede du i?',sv:'Stoppa i saker tills det är {whole} i korgen. Hur många stoppade du i?',no:'Putt ting oppi til det er {whole} i kurven. Hvor mange puttet du oppi?',es:'Mete cosas hasta que en la canasta haya {whole}. ¿Cuántas metiste?',it:'Infila delle cose finché nel cesto ce ne sono {whole}. Quante ne hai infilate?',pt:'Coloque coisas até o cesto ficar com {whole}. Quantas você colocou?',fr:'Glisse des objets jusqu’à ce que le panier en contienne {whole}. Combien en as-tu glissé ?',fi:'Pudota koriin tavaroita, kunnes niitä on {whole}. Montako pudotit?'},
    promptWhole: {en:'How many in all?',de:'Wie viele sind es zusammen?',nl:'Hoeveel zijn het er samen?',da:'Hvor mange er der i alt?',sv:'Hur många är det sammanlagt?',no:'Hvor mange blir det til sammen?',es:'¿Cuántas hay en total?',it:'Quante sono in tutto?',pt:'Quantas são ao todo?',fr:'Combien y en a-t-il en tout ?',fi:'Montako niitä on yhteensä?'},
    promptAdd:   {en:'How many did you post?',de:'Wie viele hast du dazugetan?',nl:'Hoeveel heb je erbij gedaan?',da:'Hvor mange lagde du til?',sv:'Hur många lade du till?',no:'Hvor mange la du til?',es:'¿Cuántas agregaste?',it:'Quante ne hai aggiunte?',pt:'Quantas você colocou?',fr:'Combien en as-tu ajouté ?',fi:'Montako lisäsit?'},
    hPour:       {en:'Pour one bowl into the basket first.',de:'Schütte zuerst eine Schale in den Korb.',nl:'Giet eerst één schaal in de mand.',da:'Hæld først den ene skål i kurven.',sv:'Häll först den ena skålen i korgen.',no:'Hell først den ene bollen i kurven.',es:'Primero vacía un tazón en la canasta.',it:'Prima versa una ciotola nel cesto.',pt:'Primeiro despeje uma tigela no cesto.',fr:'Verse d’abord un bol dans le panier.',fi:'Kaada ensin yksi kulho koriin.'},
    hWaiting:    {en:'Some are still waiting to go in.',de:'Ein paar warten noch darauf, hineinzukommen.',nl:'Er wachten er nog een paar om erin te gaan.',da:'Der venter stadig nogle på at komme i.',sv:'Några väntar fortfarande på att få komma i.',no:'Noen venter fortsatt på å komme oppi.',es:'Todavía quedan algunas por meter.',it:'Ce ne sono ancora alcune da infilare.',pt:'Ainda tem algumas esperando para entrar.',fr:'Il en reste encore à glisser.',fi:'Muutama odottaa vielä pääsyä koriin.'},
    hMiss1:      {en:'Start at {first} on the cloth and count on: {next} …',de:'Fang bei {first} auf dem Tuch an und zähl weiter: {next} …',nl:'Begin bij {first} op de doek en tel verder: {next} …',da:'Start ved {first} på dugen og tæl videre: {next} …',sv:'Börja på {first} på duken och räkna vidare: {next} …',no:'Begynn på {first} på duken og tell videre: {next} …',es:'Empieza en {first}, el número de la tela, y sigue contando: {next}…',it:'Parti da {first}, il numero sul telo, e continua a contare: {next}…',pt:'Comece pelo número do pano, {first}, e continue contando: {next}…',fr:'Pars de {first}, le nombre sur le tissu, et continue de compter : {next}…',fi:'Aloita kankaan luvusta {first} ja laske eteenpäin: {next} …'},
    hMiss1w:     {en:'From {first}, the basket counted {next}. How many numbers is that?',de:'Ab {first} hat der Korb {next} gezählt. Wie viele Zahlen sind das?',nl:'Vanaf {first} telde de mand {next}. Hoeveel getallen zijn dat?',da:'Fra {first} talte kurven {next}. Hvor mange tal er det?',sv:'Från {first} räknade korgen {next}. Hur många tal är det?',no:'Fra {first} telte kurven {next}. Hvor mange tall er det?',es:'Desde {first}, la canasta contó {next}. ¿Cuántos números son?',it:'Da {first} il cesto ha contato {next}. Quanti numeri sono?',pt:'A partir de {first}, o cesto contou {next}. Quantos números são?',fr:'À partir de {first}, le panier a compté {next}. Combien de nombres ça fait ?',fi:'Luvusta {first} kori laski {next}. Montako lukua se on?'},
    hMiss2:      {en:'{a} and {b} make {total}.',de:'{a} und {b} sind zusammen {total}.',nl:'{a} en {b} is samen {total}.',da:'{a} og {b} er tilsammen {total}.',sv:'{a} och {b} är tillsammans {total}.',no:'{a} og {b} blir til sammen {total}.',es:'{a} y {b} son {total}.',it:'{a} e {b} fanno {total}.',pt:'{a} e {b} são {total}.',fr:'{a} et {b} font {total}.',fi:'{a} ja {b} on yhteensä {total}.'},
    hMiss2w:     {en:'{given} and {added} make {whole}.',de:'{given} und {added} sind zusammen {whole}.',nl:'{given} en {added} is samen {whole}.',da:'{given} og {added} er tilsammen {whole}.',sv:'{given} och {added} är tillsammans {whole}.',no:'{given} og {added} blir til sammen {whole}.',es:'{given} y {added} son {whole}.',it:'{given} e {added} fanno {whole}.',pt:'{given} e {added} são {whole}.',fr:'{given} et {added} font {whole}.',fi:'{given} ja {added} on yhteensä {whole}.'},
    hBigger:     {en:'Try pouring the bowl with more first.',de:'Probier mal, zuerst die Schale mit mehr Dingen zu schütten.',nl:'Probeer eens eerst de schaal met de meeste dingen erin te gieten.',da:'Prøv at hælde skålen med flest ting i først.',sv:'Prova att hälla i skålen med flest saker först.',no:'Prøv å helle bollen med flest ting oppi først.',es:'Prueba a vaciar primero el tazón que tiene más.',it:'Prova a versare prima la ciotola che ne ha di più.',pt:'Tente despejar primeiro a tigela que tem mais.',fr:'Essaie de verser d’abord le bol qui en a le plus.',fi:'Kokeile kaataa ensin se kulho, jossa on enemmän.'},
    hFull:       {en:'The basket is full when it holds {whole}.',de:'Der Korb ist voll, wenn {whole} darin sind.',nl:'De mand is vol als er {whole} in zitten.',da:'Kurven er fuld, når der er {whole} i.',sv:'Korgen är full när det är {whole} i den.',no:'Kurven er full når det er {whole} oppi.',es:'La canasta se llena con {whole}.',it:'Il cesto è pieno quando ce ne sono {whole}.',pt:'O cesto fica cheio com {whole}.',fr:'Le panier est plein quand il y en a {whole}.',fi:'Kori on täynnä, kun siinä on {whole}.'},
    okTotal:     {en:'{a} and {b} make {total} — you counted on from {first}!',de:'{a} und {b} sind zusammen {total} – du hast von {first} aus weitergezählt!',nl:'{a} en {b} is samen {total} – je telde verder vanaf {first}!',da:'{a} og {b} er tilsammen {total} – du talte videre fra {first}!',sv:'{a} och {b} är tillsammans {total} – du räknade vidare från {first}!',no:'{a} og {b} blir til sammen {total} – du telte videre fra {first}!',es:'{a} y {b} son {total}: ¡seguiste contando desde {first}!',it:'{a} e {b} fanno {total}: hai continuato a contare da {first}!',pt:'{a} e {b} são {total}: você continuou contando a partir de {first}!',fr:'{a} et {b} font {total} : tu as continué à compter à partir de {first} !',fi:'{a} ja {b} on yhteensä {total} – laskit eteenpäin luvusta {first}!'},
    okWhole:     {en:'{given} and {added} make {whole}!',de:'{given} und {added} sind zusammen {whole}!',nl:'{given} en {added} is samen {whole}!',da:'{given} og {added} er tilsammen {whole}!',sv:'{given} och {added} är tillsammans {whole}!',no:'{given} og {added} blir til sammen {whole}!',es:'¡{given} y {added} son {whole}!',it:'{given} e {added} fanno {whole}!',pt:'{given} e {added} são {whole}!',fr:'{given} et {added} font {whole} !',fi:'{given} ja {added} on yhteensä {whole}!'},
    setTask:     {en:'Task',de:'Aufgabe',nl:'Opdracht',da:'Opgave',sv:'Uppgift',no:'Oppgave',es:'Tarea',it:'Compito',pt:'Tarefa',fr:'Tâche',fi:'Tehtävä'},
    tkTotal:     {en:'find the total',de:'das Ganze finden',nl:'het totaal vinden',da:'find det hele',sv:'hitta det hela',no:'finn summen',es:'encontrar el total',it:'trovare il totale',pt:'encontrar o total',fr:'trouver le total',fi:'etsi kokonaisuus'},
    tkBonds:     {en:'bonds within 10',de:'Zerlegungen bis 10',nl:'splitsen tot 10',da:'taldeling op til 10',sv:'uppdelning upp till 10',no:'oppdeling opp til 10',es:'partes y todo hasta 10',it:'scomposizioni fino a 10',pt:'partes e todo até 10',fr:'décompositions jusqu’à 10',fi:'hajotelmat 10:een asti'},
    tkWhole:     {en:'make the whole',de:'das Ganze auffüllen',nl:'aanvullen tot het geheel',da:'fyld op til det hele',sv:'fyll upp till det hela',no:'fyll opp til helheten',es:'completar el todo',it:'completare l’intero',pt:'completar o todo',fr:'compléter le tout',fi:'täydennä kokonaisuudeksi'},
    tk20:        {en:'bigger totals to 20',de:'bis 20',nl:'tot 20',da:'til 20',sv:'till 20',no:'opp til 20',es:'hasta 20',it:'fino a 20',pt:'até 20',fr:'jusqu’à 20',fi:'20:een asti'},
    setCoat:     {en:'Parts look like',de:'Darstellung der Teile',nl:'Zo zien de delen eruit',da:'Delene vises som',sv:'Delarna visas som',no:'Delene vises som',es:'Las partes se ven como',it:'Aspetto delle parti',pt:'As partes aparecem como',fr:'Aspect des parties',fi:'Osat näkyvät'},
    cPics:       {en:'pictures',de:'Bilder',nl:'plaatjes',da:'billeder',sv:'bilder',no:'bilder',es:'dibujos',it:'immagini',pt:'figuras',fr:'images',fi:'kuvina'},
    cDots:       {en:'dots',de:'Würfelpunkte',nl:'stippen',da:'prikker',sv:'prickar',no:'prikker',es:'puntos',it:'puntini',pt:'pontinhos',fr:'points',fi:'pisteinä'},
    cFrames:     {en:'ten frames',de:'Zehnerfelder',nl:'tienvakken',da:'tierrammer',sv:'tiorutor',no:'tierammer',es:'marcos de diez',it:'griglie del dieci',pt:'quadros de dez',fr:'cadres de dix',fi:'kymppiruudukkoina'},
    ariaL:       {en:'Left bowl',de:'Linke Schale',nl:'Linker schaal',da:'Venstre skål',sv:'Vänstra skålen',no:'Venstre bolle',es:'Tazón de la izquierda',it:'Ciotola a sinistra',pt:'Tigela da esquerda',fr:'Bol de gauche',fi:'Vasen kulho'},
    ariaR:       {en:'Right bowl',de:'Rechte Schale',nl:'Rechter schaal',da:'Højre skål',sv:'Högra skålen',no:'Høyre bolle',es:'Tazón de la derecha',it:'Ciotola a destra',pt:'Tigela da direita',fr:'Bol de droite',fi:'Oikea kulho'},
    ariaTray:    {en:'Tray',de:'Tablett',nl:'Dienblad',da:'Bakke',sv:'Bricka',no:'Brett',es:'Charola',it:'Vassoio',pt:'Bandeja',fr:'Plateau',fi:'Tarjotin'},
    ariaEmptyB:  {en:'empty',de:'leer',nl:'leeg',da:'tom',sv:'tom',no:'tom',es:'vacío',it:'vuota',pt:'vazia',fr:'vide',fi:'tyhjä'},
    aPour:       {en:'tap to pour it in',de:'tippen zum Hineinschütten',nl:'tik om hem erin te gieten',da:'tryk for at hælde den i',sv:'tryck för att hälla i den',no:'trykk for å helle den oppi',es:'toca para vaciarlo',it:'tocca per versarla',pt:'toque para despejar',fr:'touche pour le verser',fi:'napauta, niin se kaadetaan'},
    aPost:       {en:'tap to post one',de:'tippen, um eins hineinzustecken',nl:'tik om er één in te stoppen',da:'tryk for at putte én i',sv:'tryck för att stoppa i en',no:'trykk for å putte én oppi',es:'toca para meter una',it:'tocca per infilarne una',pt:'toque para colocar uma',fr:'touche pour en glisser un',fi:'napauta, niin yksi pudotetaan'},
    ariaBasket:  {en:'Basket: {n} under the cloth, {p} posted',de:'Korb: {n} unter dem Tuch, {p} hineingesteckt',nl:'Mand: {n} onder de doek, {p} erin gestopt',da:'Kurv: {n} under dugen, {p} puttet i',sv:'Korg: {n} under duken, {p} istoppade',no:'Kurv: {n} under duken, {p} puttet oppi',es:'Canasta: {n} bajo la tela, {p} metidas',it:'Cesto: {n} sotto il telo, {p} infilate',pt:'Cesto: {n} debaixo do pano, {p} colocadas',fr:'Panier : {n} sous le tissu, {p} glissés',fi:'Kori: {n} kankaan alla, {p} pudotettu'},
    ariaBasket0: {en:'Basket, empty',de:'Korb, leer',nl:'Mand, leeg',da:'Kurv, tom',sv:'Korg, tom',no:'Kurv, tom',es:'Canasta vacía',it:'Cesto vuoto',pt:'Cesto vazio',fr:'Panier vide',fi:'Kori, tyhjä'},
    ariaEmpty:   {en:'Empty the basket',de:'Korb ausleeren',nl:'Mand leegmaken',da:'Tøm kurven',sv:'Töm korgen',no:'Tøm kurven',es:'Vaciar la canasta',it:'Svuota il cesto',pt:'Esvaziar o cesto',fr:'Vider le panier',fi:'Tyhjennä kori'},
    ariaPeek:    {en:'Peek under the cloth',de:'Unter das Tuch schauen',nl:'Onder de doek kijken',da:'Kig under dugen',sv:'Kika under duken',no:'Kikk under duken',es:'Asomarse bajo la tela',it:'Sbircia sotto il telo',pt:'Espiar debaixo do pano',fr:'Jeter un œil sous le tissu',fi:'Kurkista kankaan alle'},
    ariaCheck:   {en:'Check',de:'Prüfen',nl:'Controleren',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    ariaDel:     {en:'Delete',de:'Löschen',nl:'Wissen',da:'Slet',sv:'Radera',no:'Slett',es:'Borrar',it:'Cancella',pt:'Apagar',fr:'Effacer',fi:'Poista'},
    ariaAnswer:  {en:'In all: {n}',de:'Zusammen: {n}',nl:'Samen: {n}',da:'I alt: {n}',sv:'Sammanlagt: {n}',no:'Til sammen: {n}',es:'En total: {n}',it:'In tutto: {n}',pt:'Ao todo: {n}',fr:'En tout : {n}',fi:'Yhteensä: {n}'}
  },/*STRINGS-END*/

  defaults: { task: 'total', coat: 'pictures' },
  settings: [
    { key: 'task', type: 'choice', labelKey: 'setTask', options: [{ value: 'total', labelKey: 'tkTotal' }, { value: 'bonds', labelKey: 'tkBonds' }, { value: 'whole', labelKey: 'tkWhole' }, { value: 'to20', labelKey: 'tk20' }] },
    { key: 'coat', type: 'choice', labelKey: 'setCoat', options: [{ value: 'pictures', labelKey: 'cPics' }, { value: 'dots', labelKey: 'cDots' }, { value: 'frames', labelKey: 'cFrames' }] }
  ],

  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._pics = {}; this._wantNudge = false; this._nudgedPass = -1;
    injectBasketCSS();
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
  _loc: function () { return BondBasketCore.locale(((this.api && this.api.lang) || 'en')); },
  _face: function () { return BondBasketCore.faceOf(this._setting('task')); },
  _coat: function () { return BondBasketCore.coatOf(this._setting('coat')); },
  _key: function () { return this._face(); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = BondBasketCore.ids(this._face()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = BondBasketCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice(), p = C.plan(this._face(), Math.random, prev);
      this._order = p.order; this._orderForPool = pool; this._pass = pass;
    }
    var idx = this._order[pos], pa = { msg: this._line(C.round(this._face(), idx)) }; this._pa = pa;
    return {
      id: 'basket.' + this._loc() + '.' + this._face() + '.' + idx, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _line: function (r) { return r.face === 'whole' ? this._t('tWhole', { whole: r.whole }) : this._t('tTotal'); },
  _start: function (idx) {
    var C = BondBasketCore, r = C.round(this._face(), idx);
    this._clearTimers(); this._busy = false; this._view = {};
    this.st = C.newState(r);
    if (this._wantNudge && r.face !== 'whole' && this._nudgedPass !== this._pass) { this._view.nudge = true; this._nudgedPass = this._pass; }
    this._wantNudge = false;
    var line = this._line(r);
    if (this._pa) this._pa.msg = line;
    var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line;
    this._loadPics();
  },
  _loadPics: function () {
    var self = this;
    BondBasketCore.DATA.KINDS.forEach(function (p) {
      var dir = p.split('/')[0];
      if (self._pics[dir] || typeof LCSPictures === 'undefined') return;
      self._pics[dir] = 'loading';
      LCSPictures.load(dir).then(function (th) { self._pics[dir] = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () { delete self._pics[dir]; });
    });
  },
  _theme: function (path) { var th = this._pics[path.split('/')[0]]; return th && th !== 'loading' ? th : null; },
  _pic: function (path, size, cls) {
    var th = this._theme(path), key = path.split('/')[1];
    if (!th || !th.nouns[key]) return null;
    var im = LCSPictures.img(th, key, this._loc(), { size: size }); im.className = 'bb-pic' + (cls ? ' ' + cls : ''); im.alt = ''; im.style.width = size + 'px'; im.style.height = size + 'px';
    return im;
  },
  _plural: function (path) { var th = this._theme(path); return th ? LCSPictures.label(th, path.split('/')[1], this._loc(), { plural: true }) : ''; },

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
    var wrap = api.el('div', 'bb-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="bb-bowls"></div><svg class="bb-links" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true"><path class="bb-link is-L" d="M25 0 C25 12 45 10 50 20"/><path class="bb-link is-R" d="M75 0 C75 12 55 10 50 20"/></svg>'
      + '<div class="bb-mid"><div class="bb-basketcol"><div class="bb-basket" tabindex="0" role="group"></div><div class="bb-under"><div class="bb-whole" aria-live="polite"></div><button type="button" class="bb-empty" data-k="empty"></button></div></div><div class="bb-keys" role="group"></div></div>'
      + '<p class="bb-note" aria-live="polite"></p>';
    this._q = function (s) { return wrap.querySelector(s); };
    var emp = this._q('.bb-empty'); emp.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 12a9 9 0 1 1 1 10" fill="none" stroke="#146B5E" stroke-width="3.5" stroke-linecap="round"/><path d="M4 7l5 6 6-4" fill="none" stroke="#146B5E" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    emp.setAttribute('aria-label', this._t('ariaEmpty'));
    emp.addEventListener('click', function () { if (self._busy) return; if (BondBasketCore.empty(self.st)) { self._view = {}; self.api.sound(330); self._paint(); } });
    var bk = this._q('.bb-basket');
    bk.addEventListener('pointerdown', function () { self._peekLater = self._later(function () { self._peek(); }, self._ms(350)); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (e) { bk.addEventListener(e, function () { if (self._peekLater) { clearTimeout(self._peekLater); self._peekLater = null; } }); });
    wrap.addEventListener('keydown', function (e) {
      if (/^[0-9]$/.test(e.key)) { self._type(e.key); e.preventDefault(); }
      else if (e.key === 'Backspace') { self._type('del'); e.preventDefault(); }
      else if (e.key === 'p' || e.key === 'P') { self._peek(); e.preventDefault(); }
    });
    var keys = this._q('.bb-keys'), wide = BondBasketCore.layout(this._width()).mode === 'wide';
    var order = wide ? ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'ok'] : ['1', '2', '3', '4', '5', 'del', '6', '7', '8', '9', '0', 'ok'];
    this._keyMode = wide;
    order.forEach(function (k) {
      var b = api.el('button', 'bb-key' + (k === 'ok' ? ' is-ok' : k === 'del' ? ' is-del' : '')); b.type = 'button'; b.setAttribute('data-k', 'key-' + k);
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
    var L = BondBasketCore.layout(this._width());
    if ((L.mode === 'wide') !== this._keyMode) { this._render2(); return; }
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }   /* a control that just went disabled hands focus to the wrap, so typed digits still land */
  },
  _paint_: function () {
    if (!this._wrap) return;
    var C = BondBasketCore, st = this.st, r = st.r, L = this._L = C.layout(this._width()), v = this._view, self = this;
    var lifted = st.done || st.show >= 2;
    this._wrap.className = 'bb-wrap is-' + L.mode + (L.tiny ? ' is-tiny' : '') + ' is-' + r.face + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    this._wrap.style.setProperty('--bb-pic', L.pic + 'px');
    /* ---- the bowls (whole: the poured bowl + the tray) ---- */
    var bowls = this._q('.bb-bowls'); bowls.innerHTML = '';
    var sides = r.face === 'whole' ? [['L', r.given, true], ['R', r.tray, false]] : [['L', r.a, st.poured === 'L'], ['R', r.b, st.poured === 'R']];
    sides.forEach(function (sd) {
      var side = sd[0], n = sd[1], isPoured = sd[2], postsHere = st.poured && !isPoured, gone = postsHere ? st.posted : 0;
      var canPour = !st.poured && r.face !== 'whole', canPost = postsHere && st.left > 0 && !st.done;
      var b = self.api.el('button', 'bb-bowl is-' + side + (isPoured ? ' is-poured' : '') + (canPour ? ' can-pour' : '') + (canPost ? ' can-post' : '') + (r.face === 'whole' && side === 'R' ? ' is-tray' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'bowl-' + side); b.setAttribute('data-side', side);
      b.disabled = st.done || self._busy || !(canPour || canPost);
      var what = isPoured ? self._t('ariaEmptyB') : self._plural(r.kind) + ': ' + (n - gone);
      b.setAttribute('aria-label', (r.face === 'whole' && side === 'R' ? self._t('ariaTray') : self._t(side === 'L' ? 'ariaL' : 'ariaR')) + '. ' + what + (canPour ? '. ' + self._t('aPour') : canPost ? '. ' + self._t('aPost') : ''));
      if (isPoured) { b.innerHTML = '<svg class="bb-flip" viewBox="0 0 120 60" aria-hidden="true"><path d="M10 52 Q60 -14 110 52 Z" fill="#FFF8EC" stroke="' + (side === 'L' ? '#F2784B' : '#146B5E') + '" stroke-width="5"/></svg>'; }
      else b.appendChild(self._contents(r, n, gone, side, L));
      b.addEventListener('click', function () { if (canPour) self._pour(side); else if (canPost) self._post(); });
      bowls.appendChild(b);
    });
    this._q('.bb-links').classList.toggle('is-glow', st.done);
    /* ---- the basket ---- */
    var bk = this._q('.bb-basket'); bk.innerHTML = '';
    bk.className = 'bb-basket' + (st.poured && !v.pouring ? ' is-covered' : '') + (lifted ? ' is-lifted' : '') + (v.peek ? ' is-peek' : '') + (v.roll ? ' is-roll' : '');
    bk.setAttribute('aria-label', st.poured ? this._t('ariaBasket', { n: st.under, p: st.posted }) + '. ' + this._t('ariaPeek') : this._t('ariaBasket0'));
    bk.appendChild(this.api.el('span', 'bb-weave'));
    if (v.pouring != null) {   /* the things fall in and the tag counts them */
      var heap = this.api.el('span', 'bb-heap'); for (var h = 0; h < v.pouring; h++) { var tk = this.api.el('span', 'bb-tok is-' + st.poured); tk.style.left = (12 + (h * 37) % 70) + '%'; tk.style.bottom = (8 + Math.floor(h / 3) * 9) + '%'; heap.appendChild(tk); } bk.appendChild(heap);
      var tg = this.api.el('span', 'bb-tag is-counting'); tg.textContent = v.pouring ? String(v.pouring) : ''; bk.appendChild(tg);
    } else if (lifted) {
      bk.appendChild(this._rows(st, L));
    } else if (st.poured) {
      if (v.peek) { var pile = this.api.el('span', 'bb-pile'); for (var q = 0; q < Math.min(st.under + st.posted, 7); q++) { var pt = this.api.el('span', 'bb-tok is-' + (q < st.under ? st.poured : (st.poured === 'L' ? 'R' : 'L'))); pt.style.left = (6 + (q * 13) % 24) + 'px'; pt.style.top = (6 + (q * 7) % 16) + 'px'; pile.appendChild(pt); } bk.appendChild(pile); }
      var cloth = this.api.el('span', 'bb-cloth' + (v.drop ? ' is-drop' : '') + (v.bump ? ' is-bump' : ''));
      cloth.style.setProperty('--bulge', Math.min(st.posted, 10) * 4 + 'px');
      cloth.appendChild(this.api.el('span', 'bb-slot'));
      var tag = this.api.el('span', 'bb-tag'); tag.textContent = String(st.under); cloth.appendChild(tag);
      bk.appendChild(cloth);
      if (st.show === 1 && st.posted) { var arcEl = this.api.el('span', 'bb-arc'); C.arc(st).forEach(function (n) { var s = self.api.el('span', 'bb-arcn'); s.textContent = String(n); arcEl.appendChild(s); }); bk.appendChild(arcEl); }
    }
    if (r.face === 'whole') { var rim = this.api.el('span', 'bb-rimtag'); rim.textContent = String(r.whole); bk.appendChild(rim); }
    if (v.roll) { var rl = this.api.el('span', 'bb-tok bb-roll is-R'); bk.appendChild(rl); }
    /* ---- the whole circle ---- */
    var wh = this._q('.bb-whole');
    wh.className = 'bb-whole' + (st.done ? ' is-full' : '') + (st.show >= 2 && !st.done && !st.typed ? ' is-pencil' : '');
    wh.textContent = st.done ? String(r.answer) : st.typed ? st.typed : st.show >= 2 ? String(r.answer) : '';
    wh.setAttribute('aria-label', this._t('ariaAnswer', { n: st.typed || '–' }));
    this._q('.bb-empty').disabled = st.done || this._busy || (r.face === 'whole' ? st.posted === 0 : !st.poured);
    [].forEach.call(this._wrap.querySelectorAll('.bb-key'), function (k) { k.disabled = st.done || self._busy; });
    /* ---- the note ---- */
    var note = this._q('.bb-note'), hk = C.hint(st), txt = '', cls = 'bb-note';
    if (v.msg) { txt = v.msg; cls += ' is-ok'; }
    else if (hk) { txt = this._t(hk, this._args(st)); cls += ' is-hint'; }
    else if (v.nudge && !st.poured) { txt = this._t('hBigger'); cls += ' is-hint'; }
    note.className = cls; note.textContent = txt;
  },
  _args: function (st) {
    var r = st.r, nx = BondBasketCore.arc(st).slice(0, r.face === 'whole' ? 10 : 3);   /* make-the-whole names EVERY number the basket counted, so the child can count them */
    if (!nx.length) nx = [st.under + 1, st.under + 2];
    if (r.face === 'whole') return { whole: r.whole, given: r.given, added: r.answer, first: st.under, next: nx.join(', ') };
    return { a: st.under || r.a, b: st.poured ? (st.poured === 'L' ? r.b : r.a) : r.b, total: r.answer, first: st.under, next: nx.join(', ') };
  },
  /* what sits in a bowl: library pictures while they fit, else a drawn ten frame or dice with the kind as one label picture */
  _contents: function (r, n, gone, side, L) {
    var C = BondBasketCore, coat = C.coatFor(this._coat(), n, L.cap), box = this.api.el('span', 'bb-in is-' + coat), self = this;
    if (coat === 'pictures') {
      for (var i = 0; i < n; i++) { if (i >= n - gone) { box.appendChild(this.api.el('span', 'bb-dimple')); continue; } var im = this._pic(r.kind, L.pic); box.appendChild(im || this.api.el('span', 'bb-dimple is-wait')); }
      return box;
    }
    var lab = this._pic(r.kind, L.pic, 'is-label'); if (lab) box.appendChild(lab);
    var col = side === 'L' ? '#F2784B' : '#2A9D8F', svg;
    if (coat === 'frames') {
      var cell = L.mode === 'wide' ? 30 : 20, rows = n > 5 || L.mode !== 'wide' ? 2 : 1, cols = 5, w = cols * cell + 6, h = rows * cell + 6, s = '';
      for (var k = 0; k < rows * cols; k++) {
        var x = 3 + (k % cols) * cell, y = 3 + Math.floor(k / cols) * cell;
        s += '<rect x="' + x + '" y="' + y + '" width="' + cell + '" height="' + cell + '" fill="#FFFDF7" stroke="#0F4A40" stroke-width="2"/>';
        if (k < n) s += k >= n - gone ? '<circle cx="' + (x + cell / 2) + '" cy="' + (y + cell / 2) + '" r="' + (cell * 0.32) + '" fill="none" stroke="#B9AD98" stroke-width="2" stroke-dasharray="3 3"/>' : '<circle cx="' + (x + cell / 2) + '" cy="' + (y + cell / 2) + '" r="' + (cell * 0.36) + '" fill="' + col + '"/>';
      }
      svg = '<svg class="bb-frame" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true">' + s + '</svg>';
      box.insertAdjacentHTML('beforeend', svg);
    } else {
      var faces = C.dice(n), sz = L.mode === 'wide' ? 84 : 56, idx = 0, PIPS = { 1: [[2, 2]], 2: [[1, 1], [3, 3]], 3: [[1, 1], [2, 2], [3, 3]], 4: [[1, 1], [3, 1], [1, 3], [3, 3]], 5: [[1, 1], [3, 1], [2, 2], [1, 3], [3, 3]], 6: [[1, 1], [3, 1], [1, 2], [3, 2], [1, 3], [3, 3]] };
      faces.forEach(function (f) {
        var s2 = '<rect x="2" y="2" width="' + (sz - 4) + '" height="' + (sz - 4) + '" rx="' + (sz * 0.16) + '" fill="#FFFDF7" stroke="#0F4A40" stroke-width="2.5"/>';
        PIPS[f].forEach(function (p) { var cx = sz * p[0] / 4, cy = sz * p[1] / 4; s2 += idx >= n - gone ? '<circle cx="' + cx + '" cy="' + cy + '" r="' + (sz * 0.085) + '" fill="none" stroke="#B9AD98" stroke-width="2" stroke-dasharray="2 2"/>' : '<circle cx="' + cx + '" cy="' + cy + '" r="' + (sz * 0.09) + '" fill="' + col + '"/>'; idx++; });
        box.insertAdjacentHTML('beforeend', '<svg class="bb-die" width="' + sz + '" height="' + sz + '" viewBox="0 0 ' + sz + ' ' + sz + '" aria-hidden="true">' + s2 + '</svg>');
      });
    }
    return box;
  },
  /* under the lifted cloth: ten-frame rows, the poured part in its bowl's colour, the posted part in the other */
  _rows: function (st, L) {
    var n = st.under + st.posted, cell = L.mode === 'wide' ? 20 : 14, s = '', frames = n > 10 ? 2 : 1, w = frames * (5 * cell + 6) + (frames - 1) * 8, h = 2 * cell + 6;
    var cA = st.poured === 'R' ? '#2A9D8F' : '#F2784B', cB = st.poured === 'R' ? '#F2784B' : '#2A9D8F';
    for (var f = 0; f < frames; f++) for (var k = 0; k < 10; k++) {
      var i = f * 10 + k, x = f * (5 * cell + 14) + 3 + (k % 5) * cell, y = 3 + Math.floor(k / 5) * cell;
      s += '<rect x="' + x + '" y="' + y + '" width="' + cell + '" height="' + cell + '" fill="#FFFDF7" stroke="#0F4A40" stroke-width="1.5"/>';
      if (i < n) s += '<circle cx="' + (x + cell / 2) + '" cy="' + (y + cell / 2) + '" r="' + (cell * 0.36) + '" fill="' + (i < st.under ? cA : cB) + '"/>';
    }
    var wrap = this.api.el('span', 'bb-rows'); wrap.innerHTML = '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true">' + s + '</svg>';
    return wrap;
  },

  /* ---------------- moves ---------------- */
  _pour: function (side) {
    var C = BondBasketCore, st = this.st, self = this;
    if (this._busy || !C.pour(st, side)) return;
    this._view = { pouring: 0 }; this._busy = !this.FAST;
    var n = st.under, step = function (k) {
      if (!self.st || self.st !== st) return;
      self._view.pouring = k; self.api.sound(300 + k * 30); self._paint();
      if (k < n) self._later(function () { step(k + 1); }, self._ms(120));
      else self._later(function () { self._view = { drop: true }; self._busy = false; self._paint(); }, self._ms(240));
    };
    if (this.FAST) { this._view = {}; this._busy = false; this._paint(); return; }
    step(1);
  },
  _post: function () {
    var C = BondBasketCore, st = this.st, self = this;
    if (this._busy) return;
    var res = C.post(st);
    if (res === 'full') { this._view = { roll: true }; this.api.sound(200); this._paint(); this._later(function () { self._view.roll = false; if (self._wrap) self._paint(); }, 700); return; }
    if (!res) return;
    this._view = { bump: true }; this.api.sound(880); this._paint();
  },
  _type: function (k) { if (this._busy) return; if (BondBasketCore.type(this.st, k)) { this._view = {}; this.api.sound(560); this._paint(); } },
  _peek: function () {
    var st = this.st, self = this;
    if (!st.poured || st.done || this._view.pouring != null) return;
    this._view.peek = true; this._paint();
    this._later(function () { self._view.peek = false; if (self._wrap) self._paint(); }, 600);   /* a glimpse lasts 600 ms even in the fast test mode */
  },
  _check: function () {
    if (this._busy || this.st.done) return;
    var C = BondBasketCore, st = this.st, res = C.check(st), self = this, r = st.r;
    this._view = {};
    if (!res.ok) { this.api.sound(res.reason === 'wrong' || res.reason === 'notFull' ? 220 : 460); this._paint(); this.api.announce(this._q('.bb-note').textContent || ''); return; }
    var a = this._args(st), msg = r.face === 'whole' ? this._t('okWhole', a) : this._t('okTotal', a);
    this._wantNudge = st.smallerFirst && r.face !== 'whole';
    if (this._pa) this._pa.msg = msg; this._view = { msg: msg };
    this.api.sound(1046); this._later(function () { self.api.sound(1318); }, this._ms(140)); this._later(function () { self.api.sound(1568); }, this._ms(280));
    this._paint(); this.api.announce(msg);
    this._later(function () { var n = self._q('.bb-note'); if (n && n.scrollIntoView) n.scrollIntoView({ block: 'nearest' }); }, 0);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

var bbCssDone = false;
function injectBasketCSS() {
  if (bbCssDone || typeof document === 'undefined') return;
  bbCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.bb-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;}'
  + '.bb-bowls{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;width:100%;max-width:680px;}'
  + '.bb-bowl{position:relative;display:flex;align-items:center;justify-content:center;min-height:calc(2 * var(--bb-pic) + 34px);padding:12px 10px 16px;border:0;border-top:7px solid #F2784B;border-radius:22px 22px 48% 48% / 22px 22px 34% 34%;background:#FFF8EC;box-shadow:inset 0 -6px 0 rgba(15,74,64,.10),0 4px 0 #E3D3B8;font:inherit;cursor:default;}'
  + '.bb-bowl.is-R{border-top-color:#146B5E;} .bb-bowl.can-pour,.bb-bowl.can-post{cursor:pointer;} .bb-bowl.can-pour:hover,.bb-bowl.can-post:hover{background:#FFF2DC;}'
  + '.bb-bowl.can-pour{animation:bbBreathe 2.4s ease-in-out infinite;} @keyframes bbBreathe{50%{transform:translateY(-3px);}}'
  + '.bb-bowl:disabled{opacity:1;} .bb-bowl:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.bb-in{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:4px;max-width:calc(3 * var(--bb-pic) + 12px);}'
  + '.bb-in.is-frames,.bb-in.is-dots{flex-wrap:nowrap;gap:8px;max-width:none;}'
  + '.bb-pic{display:block;object-fit:contain;pointer-events:none;}'
  + '.bb-dimple{display:block;width:var(--bb-pic);height:var(--bb-pic);background:radial-gradient(circle at 50% 62%,#EADCC3 0 18%,#F4EADA 19% 30%,transparent 31%);}'
  + '.bb-flip{width:70%;max-width:200px;height:auto;}'
  + '.bb-links{width:100%;max-width:680px;height:22px;display:block;} .bb-link{fill:none;stroke:#C8B89C;stroke-width:3;vector-effect:non-scaling-stroke;} .bb-link.is-L{stroke:#F2A07D;} .bb-link.is-R{stroke:#6FB3A6;} .bb-links.is-glow .bb-link{stroke-width:6;}'
  + '.bb-mid{display:flex;align-items:flex-start;justify-content:center;gap:22px;width:100%;max-width:680px;}'
  + '.bb-basketcol{display:flex;flex-direction:column;align-items:center;gap:8px;}'
  + '.bb-basket{position:relative;width:260px;height:180px;border-radius:14px 14px 40px 40px;background:#C98B4E;box-shadow:inset 0 0 0 4px #8F5A2B,0 5px 0 #7A4A22;overflow:visible;outline:none;}'
  + '.bb-basket:focus-visible{box-shadow:inset 0 0 0 4px #8F5A2B,0 0 0 4px #146B5E;}'
  + '.bb-weave{position:absolute;inset:8px;border-radius:10px 10px 34px 34px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.14) 0 10px,transparent 10px 20px),repeating-linear-gradient(0deg,rgba(0,0,0,.10) 0 8px,transparent 8px 16px);}'
  + '.bb-cloth{position:absolute;left:-8px;right:-8px;top:calc(-18px - var(--bulge,0px));height:calc(118px + var(--bulge,0px));border-radius:46% 46% 14px 14px / 60% 60% 14px 14px;background-color:#FFFFFF;background-image:linear-gradient(90deg,rgba(233,86,122,.55) 50%,transparent 50%),linear-gradient(0deg,rgba(233,86,122,.55) 50%,transparent 50%);background-size:24px 24px;box-shadow:inset 0 0 0 3px #B03A5B,0 4px 0 rgba(0,0,0,.12);transition:top .14s,height .14s;}'
  + '.bb-cloth.is-drop{animation:bbDrop .24s ease-out both;} @keyframes bbDrop{from{transform:translateY(-60px);opacity:0;}}'
  + '.bb-cloth.is-bump{animation:bbBump .2s ease-out;} @keyframes bbBump{40%{transform:translateY(4px);}}'
  + '.bb-basket.is-peek .bb-cloth{transform:translate(28px,-26px) rotate(9deg);transition:transform .15s;}'
  + '.bb-slot{position:absolute;left:50%;top:22%;width:64px;height:14px;margin-left:-32px;border-radius:8px;background:#5A2A36;box-shadow:inset 0 3px 0 rgba(0,0,0,.35);}'
  + '.bb-tag{position:absolute;left:50%;top:46%;min-width:64px;height:58px;margin:-6px 0 0 -32px;padding:0 6px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;border-radius:8px;background:#FFFDF7;box-shadow:inset 0 0 0 3px #0F4A40,0 3px 0 rgba(0,0,0,.18);font-family:' + H + ';font-weight:800;font-size:46px;line-height:1;color:#0F4A40;}'
  + '.bb-tag.is-counting{top:-30px;margin-top:0;z-index:3;}'
  + '.bb-tag::before{content:"";position:absolute;left:50%;top:-8px;width:10px;height:10px;margin-left:-5px;border-radius:50%;background:#F2784B;box-shadow:0 0 0 2px #0F4A40;}'
  + '.bb-rimtag{position:absolute;right:-14px;top:52%;min-width:54px;height:46px;display:flex;align-items:center;justify-content:center;border-radius:23px;background:#146B5E;color:#FFFFFF;font-family:' + H + ';font-weight:800;font-size:30px;box-shadow:0 3px 0 #0F4A40;z-index:3;}'
  + '.bb-heap,.bb-pile{position:absolute;inset:10px;} .bb-pile{inset:auto;left:4px;top:-4px;width:70px;height:50px;z-index:1;}'
  + '.bb-tok{position:absolute;width:22px;height:22px;border-radius:50%;background:#F2784B;box-shadow:inset 0 -3px 0 rgba(0,0,0,.18);} .bb-tok.is-R{background:#2A9D8F;}'
  + '.bb-heap .bb-tok{animation:bbFall .12s ease-in both;} @keyframes bbFall{from{transform:translateY(-70px);}}'
  + '.bb-roll{left:56%;top:-26px;animation:bbRoll .7s ease-in both;} @keyframes bbRoll{40%{transform:translateY(-6px);}100%{transform:translate(130px,40px);opacity:0;}}'
  + '.bb-arc{position:absolute;left:-10px;right:-10px;top:-44px;display:flex;flex-wrap:wrap;justify-content:center;gap:4px;z-index:3;}'
  + '.bb-arcn{min-width:30px;height:30px;padding:0 4px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;border-radius:15px;background:#FFF3C4;box-shadow:inset 0 0 0 2px #C9A227;font-family:' + H + ';font-weight:800;font-size:19px;color:#5A4500;animation:bbRise .3s ease-out both;} @keyframes bbRise{from{transform:translateY(10px);opacity:0;}}'
  + '.bb-rows{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);display:flex;justify-content:center;}'
  + '.bb-basket.is-lifted{background:#C98B4E;} .bb-wrap.is-done .bb-rows svg{animation:bbHop .3s ease-out both;} @keyframes bbHop{from{transform:translateY(-14px);}}'
  + '.bb-under{display:flex;align-items:center;gap:14px;}'
  + '.bb-whole{width:88px;height:88px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#FFFDF7;box-shadow:inset 0 0 0 4px #146B5E;font-family:' + H + ';font-weight:800;font-size:44px;color:#0F4A40;}'
  + '.bb-whole.is-pencil{color:transparent;-webkit-text-stroke:2px #8A8A95;} .bb-whole.is-full{background:#146B5E;color:#FFFFFF;box-shadow:0 0 0 6px #BFE3DA;}'
  + '.bb-empty{width:48px;height:48px;border:0;border-radius:50%;background:#FFFDF7;box-shadow:inset 0 0 0 2.5px #146B5E;cursor:pointer;display:flex;align-items:center;justify-content:center;} .bb-empty svg{width:26px;height:26px;} .bb-empty:disabled{opacity:.35;cursor:default;}'
  + '.bb-keys{display:grid;grid-template-columns:repeat(3,54px);gap:8px;}'
  + '.bb-key{height:54px;border:0;border-radius:14px;background:#FFFDF7;box-shadow:inset 0 0 0 2.5px #0F4A40,0 4px 0 #9CC9BE;font-family:' + H + ';font-weight:800;font-size:26px;color:#0F4A40;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
  + '.bb-key svg{width:28px;height:28px;} .bb-key.is-ok{background:#146B5E;box-shadow:0 4px 0 #0F4A40;} .bb-key:disabled{opacity:.5;cursor:default;}'
  + '.bb-key:focus-visible,.bb-empty:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.bb-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .bb-note:empty{display:none;} .bb-note.is-hint{color:#B5461F;} .bb-note.is-ok{color:#146B5E;}'
  /* phones: bowls side by side and smaller, the basket with the circle beside it, the keypad in two rows of six */
  + '.bb-wrap.is-narrow .bb-bowls{gap:8px;} .bb-wrap.is-narrow .bb-bowl{padding:8px 6px 12px;min-height:calc(2 * var(--bb-pic) + 24px);}'
  + '.bb-wrap.is-narrow .bb-in{max-width:calc(2 * var(--bb-pic) + 6px);} .bb-wrap.is-narrow .bb-in.is-frames,.bb-wrap.is-narrow .bb-in.is-dots{flex-direction:column;gap:4px;}'
  + '.bb-wrap.is-narrow .bb-mid{flex-direction:column;align-items:center;gap:8px;} .bb-wrap.is-narrow .bb-basketcol{flex-direction:row;gap:12px;}'
  + '.bb-wrap.is-narrow .bb-basket{width:190px;height:130px;} .bb-wrap.is-narrow .bb-cloth{height:calc(86px + var(--bulge,0px));top:calc(-14px - var(--bulge,0px));}'
  + '.bb-wrap.is-narrow .bb-tag{min-width:52px;height:46px;margin-left:-26px;font-size:36px;} .bb-wrap.is-narrow .bb-slot{width:54px;margin-left:-27px;height:12px;}'
  + '.bb-wrap.is-narrow .bb-under{flex-direction:column;gap:8px;} .bb-wrap.is-narrow .bb-whole{width:66px;height:66px;font-size:34px;}'
  + '.bb-wrap.is-narrow .bb-keys{grid-template-columns:repeat(6,minmax(44px,1fr));width:100%;max-width:420px;gap:5px;} .bb-wrap.is-narrow .bb-key{height:46px;font-size:24px;}'
  + '.bb-wrap.is-narrow .bb-note{font-size:17px;} .bb-wrap.is-narrow .bb-rimtag{right:-8px;min-width:44px;height:38px;font-size:24px;} .bb-wrap.is-narrow .bb-tok{width:16px;height:16px;}'
  + '.bb-wrap.is-tiny .bb-bowl{padding:6px 2px 10px;} .bb-wrap.is-tiny .bb-in{gap:2px;} .bb-wrap.is-tiny .bb-basket{width:168px;height:120px;} .bb-wrap.is-tiny .bb-cloth{height:calc(80px + var(--bulge,0px));} .bb-wrap.is-tiny .bb-links{height:14px;} .bb-wrap.is-tiny{gap:6px;} .bb-wrap.is-tiny .bb-key{height:44px;}'
  + '.bb-wrap.is-fast *,.bb-wrap.is-fast *::after,.bb-wrap.is-fast *::before{animation:none !important;transition:none !important;}'
  + '@media print{.bb-keys,.bb-note,.bb-empty{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.bb-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;} .bb-bowl.can-pour{animation:none;}}';
  var s = document.createElement('style'); s.id = 'bb-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.BondBasketActivity = BondBasketActivity;
