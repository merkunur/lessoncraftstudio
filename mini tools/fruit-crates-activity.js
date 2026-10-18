/* =====================================================================
   fruit-crates-activity.js — ACTIVITY #8 of the one-by-one rebuild:
   "Write the Number 0 to 20 with Fruits" (K.CC.A.3) — THE FRUIT CRATES.
   Design sheet: docs/activities-rebuild/008-fruit-crates.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: THE CRATES READ THEMSELVES. Two wooden fruit crates of
   ten boxes each (a full crate is ten); at the start of a round the fruit
   drops in, one box after another, the first line of five first. The
   child writes how many on a slate with number keys. Check reads the
   slate against the crates: a wrong number is named (41 for 14 — the
   digits the other way round; 4 for 14 — only the second crate; 10 for 14
   — only the first crate; a number for empty crates — zero) and the crates
   start to read themselves — first the landmark numbers on the fruit (5,
   10, 15), then the count-on numbers, stopping at a "?" on the last fruit
   so the child still says the number. A right number turns the slate
   gold, the last fruit carries it, and it is spoken. Teacher setting
   "Quick look": a cloth covers the crates after a moment; Peek lifts it.
   No mascot: crates, fruit, a slate, number keys.

   ACTIVITY LAYER ONLY: the model is fruit-crates-core.js; pictures through
   lcs-pictures.js; lcs-shell.js is untouched.
   Test seams: window.FruitCratesActivity.st / ._order / ._pool.
   ===================================================================== */
'use strict';

var FruitCratesActivity = {
  id: 'fruit-crates',
  apparatusClasses: ['fc-'],

  strings: {
    title:          {en:'Fruit Crates',de:'Obstkisten',fr:'Les cagettes de fruits',it:'Le cassette di frutta',es:'Las cajas de fruta',pt:'Os caixotes de frutas',nl:'De fruitkisten',sv:'Fruktlådorna',da:'Frugtkasserne',no:'Fruktkassene',fi:'Hedelmälaatikot'},
    instruction:    {en:'Each crate has ten boxes. Count the fruit and write how many on the slate.',de:'Jede Kiste hat zehn Fächer. Zähle die Früchte und schreib auf die Tafel, wie viele es sind.',fr:'Chaque cagette a dix cases. Compte les fruits et écris sur l’ardoise combien il y en a.',it:'Ogni cassetta ha dieci posti. Conta i frutti e scrivi sulla lavagnetta quanti sono.',es:'Cada caja tiene diez lugares. Cuenta las frutas y escribe en la pizarrita cuántas hay.',pt:'Cada caixote tem dez lugares. Conte as frutas e escreva na lousa quantas são.',nl:'Elke kist heeft tien vakjes. Tel het fruit en schrijf op het bordje hoeveel stuks het zijn.',sv:'Varje låda har tio fack. Räkna frukterna och skriv på tavlan hur många det är.',da:'Hver kasse har ti rum. Tæl frugterne, og skriv på tavlen, hvor mange der er.',no:'Hver kasse har ti rom. Tell fruktene og skriv på tavla hvor mange det er.',fi:'Jokaisessa laatikossa on kymmenen lokeroa. Laske hedelmät ja kirjoita tauluun, montako niitä on.'},
    promptCrates:   {en:'How many fruits are in the crates?',de:'Wie viele Früchte sind in den Kisten?',fr:'Combien de fruits y a-t-il dans les cagettes ?',it:'Quanti frutti ci sono nelle cassette?',es:'¿Cuántas frutas hay en las cajas?',pt:'Quantas frutas há nos caixotes?',nl:'Hoeveel stuks fruit zitten er in de kisten?',sv:'Hur många frukter finns i lådorna?',da:'Hvor mange frugter er der i kasserne?',no:'Hvor mange frukter er det i kassene?',fi:'Montako hedelmää laatikoissa on?'},
    promptCrate:    {en:'How many fruits are in the crate?',de:'Wie viele Früchte sind in der Kiste?',fr:'Combien de fruits y a-t-il dans la cagette ?',it:'Quanti frutti ci sono nella cassetta?',es:'¿Cuántas frutas hay en la caja?',pt:'Quantas frutas há no caixote?',nl:'Hoeveel stuks fruit zitten er in de kist?',sv:'Hur många frukter finns i lådan?',da:'Hvor mange frugter er der i kassen?',no:'Hvor mange frukter er det i kassa?',fi:'Montako hedelmää laatikossa on?'},
    celebrate:      {en:'Yes — {n}!',de:'Genau: {n}!',fr:'Oui : {n} !',it:'Esatto: {n}!',es:'¡Exacto: {n}!',pt:'Isso mesmo: {n}!',nl:'Precies: {n}!',sv:'Precis: {n}!',da:'Præcis: {n}!',no:'Helt riktig: {n}!',fi:'Hienoa – {n}!'},
    hintNone:       {en:'Write a number on the slate first, then press Check.',de:'Schreib zuerst eine Zahl auf die Tafel und drück dann auf Prüfen.',fr:'Écris d’abord un nombre sur l’ardoise, puis appuie sur Vérifier.',it:'Prima scrivi un numero sulla lavagnetta, poi premi Verifica.',es:'Primero escribe un número en la pizarrita y luego presiona Comprobar.',pt:'Primeiro escreva um número na lousa e depois toque em Verificar.',nl:'Schrijf eerst een getal op het bordje en tik dan op Controleer.',sv:'Skriv först ett tal på tavlan och tryck sedan på Kontrollera.',da:'Skriv først et tal på tavlen, og tryk så på Tjek.',no:'Skriv først et tall på tavla, og trykk så på Sjekk.',fi:'Kirjoita ensin luku tauluun ja paina sitten Tarkista.'},
    hintReversed:   {en:'The digits are the other way round. The first digit is for the full crate.',de:'Die Ziffern sind andersherum. Die erste Ziffer steht für die volle Kiste.',fr:'Les chiffres sont dans l’autre sens. Le premier chiffre, c’est pour la cagette pleine.',it:'Le cifre sono al contrario. La prima cifra è per la cassetta piena.',es:'Los dígitos están al revés. El primer dígito es de la caja llena.',pt:'Os algarismos estão ao contrário. O primeiro algarismo é do caixote cheio.',nl:'De cijfers staan andersom. Het eerste cijfer is voor de volle kist.',sv:'Siffrorna står tvärtom. Den första siffran är för den fulla lådan.',da:'Cifrene står omvendt. Det første ciffer er for den fulde kasse.',no:'Sifrene står motsatt vei. Det første sifferet er for den fulle kassa.',fi:'Numerot ovat väärin päin. Ensimmäinen numero kertoo täyden laatikon.'},
    hintOneDigit:   {en:'That is only the fruit in the second crate. The full crate counts too.',de:'Das sind nur die Früchte in der zweiten Kiste. Die volle Kiste zählt auch.',fr:'Ce sont seulement les fruits de la deuxième cagette. La cagette pleine compte aussi.',it:'Sono solo i frutti della seconda cassetta. Conta anche la cassetta piena.',es:'Esas son solo las frutas de la segunda caja. La caja llena también cuenta.',pt:'Essas são só as frutas do segundo caixote. O caixote cheio também conta.',nl:'Dat is alleen het fruit in de tweede kist. De volle kist telt ook mee.',sv:'Det är bara frukterna i den andra lådan. Den fulla lådan räknas också.',da:'Det er kun frugterne i den anden kasse. Den fulde kasse tæller også.',no:'Det er bare fruktene i den andre kassa. Den fulle kassa teller også.',fi:'Nuo ovat vain toisen laatikon hedelmät. Täysi laatikko lasketaan myös mukaan.'},
    hintTensOnly:   {en:'That is only the first crate. Count on with the fruit in the second crate.',de:'Das ist nur die erste Kiste. Zähl mit den Früchten in der zweiten Kiste weiter.',fr:'Ça, c’est seulement la première cagette. Continue à compter avec les fruits de la deuxième.',it:'Questa è solo la prima cassetta. Continua a contare con i frutti della seconda.',es:'Esa es solo la primera caja. Sigue contando con las frutas de la segunda.',pt:'Esse é só o primeiro caixote. Continue contando com as frutas do segundo.',nl:'Dat is alleen de eerste kist. Tel verder met het fruit in de tweede kist.',sv:'Det är bara den första lådan. Räkna vidare med frukterna i den andra.',da:'Det er kun den første kasse. Tæl videre med frugterne i den anden.',no:'Det er bare den første kassa. Tell videre med fruktene i den andre.',fi:'Se on vain ensimmäinen laatikko. Jatka laskemista toisen laatikon hedelmillä.'},
    hintMore:       {en:'There are more fruits than that. Start at the number on a fruit and count on.',de:'Es sind mehr Früchte. Fang bei der Zahl auf einer Frucht an und zähl weiter.',fr:'Il y a plus de fruits que ça. Pars du nombre écrit sur un fruit et continue à compter.',it:'I frutti sono di più. Parti dal numero su un frutto e continua a contare.',es:'Hay más frutas. Empieza en el número de una fruta y sigue contando.',pt:'Tem mais frutas. Comece pelo número em uma fruta e continue contando.',nl:'Er is meer fruit. Begin bij het getal op een vrucht en tel verder.',sv:'Det är fler frukter än så. Börja vid talet på en frukt och räkna vidare.',da:'Der er flere frugter end det. Begynd ved tallet på en frugt, og tæl videre.',no:'Det er flere frukter enn det. Begynn ved tallet på en frukt og tell videre.',fi:'Hedelmiä on enemmän. Aloita hedelmän päällä olevasta luvusta ja laske eteenpäin.'},
    hintFewer:      {en:'There are fewer fruits than that. Start at the number on a fruit and count on.',de:'Es sind weniger Früchte. Fang bei der Zahl auf einer Frucht an und zähl weiter.',fr:'Il y a moins de fruits que ça. Pars du nombre écrit sur un fruit et continue à compter.',it:'I frutti sono di meno. Parti dal numero su un frutto e continua a contare.',es:'Hay menos frutas. Empieza en el número de una fruta y sigue contando.',pt:'Tem menos frutas. Comece pelo número em uma fruta e continue contando.',nl:'Er is minder fruit. Begin bij het getal op een vrucht en tel verder.',sv:'Det är färre frukter än så. Börja vid talet på en frukt och räkna vidare.',da:'Der er færre frugter end det. Begynd ved tallet på en frugt, og tæl videre.',no:'Det er færre frukter enn det. Begynn ved tallet på en frukt og tell videre.',fi:'Hedelmiä on vähemmän. Aloita hedelmän päällä olevasta luvusta ja laske eteenpäin.'},
    hintRecountMore:{en:'There are more fruits than that. Count again, one at a time.',de:'Es sind mehr Früchte. Zähl noch einmal, eine nach der anderen.',fr:'Il y a plus de fruits que ça. Recompte, un par un.',it:'I frutti sono di più. Ricontali, uno alla volta.',es:'Hay más frutas. Vuelve a contar, una por una.',pt:'Tem mais frutas. Conte de novo, uma por uma.',nl:'Er is meer fruit. Tel nog eens, één voor één.',sv:'Det är fler frukter än så. Räkna igen, en i taget.',da:'Der er flere frugter end det. Tæl igen, én ad gangen.',no:'Det er flere frukter enn det. Tell igjen, én om gangen.',fi:'Hedelmiä on enemmän. Laske uudelleen yksi kerrallaan.'},
    hintRecountFewer:{en:'There are fewer fruits than that. Count again, one at a time.',de:'Es sind weniger Früchte. Zähl noch einmal, eine nach der anderen.',fr:'Il y a moins de fruits que ça. Recompte, un par un.',it:'I frutti sono di meno. Ricontali, uno alla volta.',es:'Hay menos frutas. Vuelve a contar, una por una.',pt:'Tem menos frutas. Conte de novo, uma por uma.',nl:'Er is minder fruit. Tel nog eens, één voor één.',sv:'Det är färre frukter än så. Räkna igen, en i taget.',da:'Der er færre frugter end det. Tæl igen, én ad gangen.',no:'Det er færre frukter enn det. Tell igjen, én om gangen.',fi:'Hedelmiä on vähemmän. Laske uudelleen yksi kerrallaan.'},
    hintCountOn:    {en:'Count on along the numbers on the fruit. Which number goes where the question mark is?',de:'Zähl mit den Zahlen auf den Früchten weiter. Welche Zahl gehört zum Fragezeichen?',fr:'Continue à compter avec les nombres sur les fruits. Quel nombre va à la place du point d’interrogation ?',it:'Continua a contare con i numeri sui frutti. Quale numero va al posto del punto interrogativo?',es:'Sigue contando con los números de las frutas. ¿Qué número va donde está el signo de interrogación?',pt:'Continue contando com os números nas frutas. Qual número vai no lugar do ponto de interrogação?',nl:'Tel verder met de getallen op het fruit. Welk getal hoort bij het vraagteken?',sv:'Räkna vidare med talen på frukterna. Vilket tal ska stå vid frågetecknet?',da:'Tæl videre med tallene på frugterne. Hvilket tal hører til spørgsmålstegnet?',no:'Tell videre med tallene på fruktene. Hvilket tall hører til spørsmålstegnet?',fi:'Laske eteenpäin hedelmien lukujen avulla. Mikä luku kuuluu kysymysmerkin paikalle?'},
    slateLabel:     {en:'The slate says {a}',de:'Auf der Tafel steht {a}',fr:'Sur l’ardoise, il y a {a}',it:'Sulla lavagnetta c’è {a}',es:'La pizarrita dice {a}',pt:'A lousa diz {a}',nl:'Op het bordje staat {a}',sv:'På tavlan står {a}',da:'På tavlen står {a}',no:'På tavla står {a}',fi:'Taulussa lukee {a}'},
    slateEmpty:     {en:'The slate is empty',de:'Die Tafel ist leer',fr:'L’ardoise est vide',it:'La lavagnetta è vuota',es:'La pizarrita está vacía',pt:'A lousa está vazia',nl:'Het bordje is leeg',sv:'Tavlan är tom',da:'Tavlen er tom',no:'Tavla er tom',fi:'Taulu on tyhjä'},
    write:          {en:'Write',de:'Schreiben',fr:'Écrire',it:'Scrivi',es:'Escribir',pt:'Escrever',nl:'Schrijven',sv:'Skriv',da:'Skriv',no:'Skriv',fi:'Kirjoita'},
    padLabel:       {en:'Number keys',de:'Zahlentasten',fr:'Touches des chiffres',it:'Tasti dei numeri',es:'Teclas de números',pt:'Teclas de números',nl:'Cijfertoetsen',sv:'Siffertangenter',da:'Taltaster',no:'Talltaster',fi:'Numeronäppäimet'},
    done:           {en:'Done',de:'Fertig',fr:'Terminé',it:'Fatto',es:'Listo',pt:'Pronto',nl:'Klaar',sv:'Klar',da:'Færdig',no:'Ferdig',fi:'Valmis'},
    erase:          {en:'Erase',de:'Löschen',fr:'Effacer',it:'Cancella',es:'Borrar',pt:'Apagar',nl:'Wissen',sv:'Sudda',da:'Slet',no:'Slett',fi:'Pyyhi'},
    peek:           {en:'Peek',de:'Kurz schauen',fr:'Regarder',it:'Sbircia',es:'Mirar',pt:'Espiar',nl:'Kijken',sv:'Kika',da:'Kig',no:'Kikk',fi:'Kurkista'},
    covered:        {en:'The crates are covered. Press Peek to look again.',de:'Die Kisten sind zugedeckt. Drück auf „Kurz schauen“, um noch einmal hinzusehen.',fr:'Les cagettes sont couvertes. Appuie sur Regarder pour les revoir.',it:'Le cassette sono coperte. Premi Sbircia per guardare di nuovo.',es:'Las cajas están tapadas. Presiona Mirar para verlas otra vez.',pt:'Os caixotes estão cobertos. Toque em Espiar para ver de novo.',nl:'De kisten zijn afgedekt. Tik op Kijken om nog eens te kijken.',sv:'Lådorna är övertäckta. Tryck på Kika för att titta igen.',da:'Kasserne er dækket til. Tryk på Kig for at se igen.',no:'Kassene er dekket til. Trykk på Kikk for å se igjen.',fi:'Laatikot on peitetty. Paina Kurkista, niin näet ne taas.'},
    crateLabel:     {en:'Crate {c}',de:'Kiste {c}',fr:'Cagette {c}',it:'Cassetta {c}',es:'Caja {c}',pt:'Caixote {c}',nl:'Kist {c}',sv:'Låda {c}',da:'Kasse {c}',no:'Kasse {c}',fi:'Laatikko {c}'},
    setRange:       {en:'Numbers',de:'Zahlen',fr:'Nombres',it:'Numeri',es:'Números',pt:'Números',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    rangeTo10:      {en:'To 10',de:'Bis 10',fr:'Jusqu’à 10',it:'Fino a 10',es:'Hasta 10',pt:'Até 10',nl:'Tot en met 10',sv:'Till 10',da:'Til 10',no:'Til 10',fi:'10:een asti'},
    rangeTo20:      {en:'To 20',de:'Bis 20',fr:'Jusqu’à 20',it:'Fino a 20',es:'Hasta 20',pt:'Até 20',nl:'Tot en met 20',sv:'Till 20',da:'Til 20',no:'Til 20',fi:'20:een asti'},
    setLook:        {en:'Crates',de:'Kisten',fr:'Cagettes',it:'Cassette',es:'Cajas',pt:'Caixotes',nl:'Kisten',sv:'Lådor',da:'Kasser',no:'Kasser',fi:'Laatikot'},
    lookOpen:       {en:'Always open',de:'Immer offen',fr:'Toujours ouvertes',it:'Sempre aperte',es:'Siempre abiertas',pt:'Sempre abertos',nl:'Altijd open',sv:'Alltid öppna',da:'Altid åbne',no:'Alltid åpne',fi:'Aina auki'},
    lookQuick:      {en:'Quick look',de:'Nur kurz zu sehen',fr:'Coup d’œil rapide',it:'Occhiata veloce',es:'Vistazo rápido',pt:'Olhada rápida',nl:'Even kijken',sv:'Snabbtitt',da:'Hurtigt kig',no:'Rask titt',fi:'Pikavilkaisu'}
  },

  defaults: { range: 'to20', look: 'open' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: 'to10', labelKey: 'rangeTo10' }, { value: 'to20', labelKey: 'rangeTo20' }] },
    { key: 'look', type: 'choice', labelKey: 'setLook', options: [{ value: 'open', labelKey: 'lookOpen' }, { value: 'quick', labelKey: 'lookQuick' }] }
  ],

  /* how long the fruit stays uncovered in a quick look, after it has dropped in */
  SHOW_MS: 2600, DROP_MS: 45,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._ro = null; this._theme = null; this._padOpen = false; this._outside = null;
    this._covered = false; this._coverTimer = null; this._fresh = false; this._keyHandler = null;
    injectFruitCratesCSS();
    if (typeof LCSPictures !== 'undefined') {
      LCSPictures.load(FruitCratesCore.THEME).then(function (theme) { self._theme = theme; if (self._wrap) self._paintAll(); }).catch(function () { /* the crates stay empty-handed */ });
    }
    this._keyHandler = function (ev) {
      if (!self.st || !self._wrap || !self._wrap.isConnected) return;
      var tg = ev.target && ev.target.tagName;
      if (tg === 'INPUT' || tg === 'TEXTAREA' || tg === 'SELECT' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
      if (/^[0-9]$/.test(ev.key)) { self._type(Number(ev.key)); ev.preventDefault(); }
      else if (ev.key === 'Backspace') { self._erase(); ev.preventDefault(); }
    };
    if (typeof document !== 'undefined') document.addEventListener('keydown', this._keyHandler);
  },
  destroy: function () {
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
    this._unwatchOutside();
    this._clearCover();
    if (this._keyHandler && typeof document !== 'undefined') document.removeEventListener('keydown', this._keyHandler);
  },
  onSettings: function () {
    this._pool = null; this._order = null;
    if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
  },

  /* ---------------- rounds ---------------- */
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 560;
  },
  _range: function () { var r = this.api && this.api.settings && this.api.settings.range; return FruitCratesCore.POOLS[r] ? r : 'to20'; },
  _look: function () { var l = this.api && this.api.settings && this.api.settings.look; return FruitCratesCore.LOOKS.indexOf(l) >= 0 ? l : 'open'; },
  _ensurePool: function () { var key = this._range(); if (!this._pool || this._poolKey !== key) { this._pool = FruitCratesCore.rounds(key, 'fc'); this._poolKey = key; this._order = null; } return this._pool; },
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
      id: 'fruit-crates.' + r.id,
      promptKey: r.crates === 1 ? 'promptCrate' : 'promptCrates',
      promptArgs: { n: r.n },
      celebrateKey: 'celebrate',
      answerType: 'state',
      setup: function (tool) { tool.st = FruitCratesCore.newState(r); tool._padOpen = false; tool._fresh = true; tool._clearCover(); tool._preload(); },
      check: function (tool) { var res = FruitCratesCore.check(tool.st); tool._afterCheck(res); return res.ok; },
      hintKey: function (tool) { return FruitCratesCore.hintKey(tool.st); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    this._unwatchOutside();
    if (!this.st) this.st = FruitCratesCore.newState(FruitCratesCore.rounds('to20', 'fc')[7]);
    var wrap = api.el('div', 'fc-wrap');
    this._wrap = wrap;

    /* the crates */
    var crates = api.el('div', 'fc-crates'); this._crates = crates;
    this._crateEls = [];
    for (var c = 0; c < 2; c++) {
      var crate = api.el('div', 'fc-crate'); crate.setAttribute('role', 'group');
      var boxes = api.el('div', 'fc-boxes');
      for (var j = 0; j < FruitCratesCore.CRATE; j++) {
        var box = api.el('div', 'fc-box');
        var chip = api.el('span', 'fc-chip'); chip.setAttribute('aria-hidden', 'true'); box.appendChild(chip);
        boxes.appendChild(box);
      }
      crate.appendChild(boxes);
      var cloth = api.el('div', 'fc-cloth'); cloth.setAttribute('aria-hidden', 'true'); crate.appendChild(cloth);
      var roll = api.el('div', 'fc-roll'); roll.setAttribute('aria-hidden', 'true'); crate.appendChild(roll);   /* quick look: the cloth waits rolled up on the crate */
      crates.appendChild(crate); this._crateEls.push(crate);
    }
    wrap.appendChild(crates);

    /* the desk: the slate, the pencil (phones), Peek, the keys */
    var desk = api.el('div', 'fc-desk'); this._desk = desk;
    var slateRow = api.el('div', 'fc-slaterow'); this._slateRow = slateRow;
    var slate = api.el('div', 'fc-slate'); slate.setAttribute('role', 'status'); this._slate = slate; slateRow.appendChild(slate);
    var pencil = api.el('button', 'fc-pencil'); pencil.type = 'button';
    pencil.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4l10-10-4-4L4 16v4z"/><path d="M13 7l4 4"/></svg>';
    pencil.setAttribute('aria-label', t('write')); pencil.title = t('write');
    pencil.addEventListener('click', function (ev) { ev.stopPropagation(); self._togglePad(); });
    this._pencil = pencil; slateRow.appendChild(pencil);
    var peek = api.el('button', 'fc-peek'); peek.type = 'button';
    peek.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg><span></span>';
    peek.querySelector('span').textContent = t('peek');
    peek.addEventListener('click', function () { self._peek(); });
    this._peekBtn = peek; slateRow.appendChild(peek);
    desk.appendChild(slateRow);
    var pad = api.el('div', 'fc-pad'); pad.setAttribute('role', 'group'); pad.setAttribute('aria-label', t('padLabel'));
    this._pad = pad; this._keys = [];
    var order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    for (var k = 0; k < order.length; k++) {
      (function (d) { var key = api.el('button', 'fc-key'); key.type = 'button'; key.textContent = String(d); key.addEventListener('click', function () { self._type(d); }); pad.appendChild(key); self._keys.push(key); }(order[k]));
    }
    var er = api.el('button', 'fc-key fc-key-erase'); er.type = 'button'; er.textContent = '⌫'; er.setAttribute('aria-label', t('erase')); er.addEventListener('click', function () { self._erase(); }); pad.appendChild(er); this._erase_ = er;
    var done = api.el('button', 'fc-key fc-key-done'); done.type = 'button'; done.textContent = t('done'); done.addEventListener('click', function () { self._togglePad(false); }); pad.appendChild(done); this._done = done;
    desk.appendChild(pad);
    wrap.appendChild(desk);

    stage.appendChild(wrap);
    this._layout();
    this._paintAll();
    this._watchWidth();
    if (this._fresh) { this._fresh = false; this._dropIn(); this._scheduleCover(); }
  },
  _layout: function () {
    var st = this.st, L = this._L = FruitCratesCore.layout(this._width(), st ? st.crates : 2);
    var w = this._wrap;
    w.classList.toggle('is-row', L.mode === 'row');
    w.classList.toggle('is-stack', L.mode === 'stack');
    w.classList.toggle('is-inline', !!L.inline);
    w.style.setProperty('--fc-box', L.box + 'px');
    w.style.setProperty('--fc-boxw', L.boxW + 'px');
    w.style.setProperty('--fc-frame', L.frame + 'px');
    w.style.setProperty('--fc-gap', L.gap + 'px');
    w.style.setProperty('--fc-key', L.key + 'px');
    w.style.setProperty('--fc-between', L.between + 'px');
    if (L.mode === 'row') { this._padOpen = false; this._unwatchOutside(); }
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return;
      last = w;
      self._layout(); self._paintAll();
    });
    this._ro.observe(this.api.stage);
  },

  _paintAll: function () {
    var st = this.st, t = this.api.t, lang = this.api.lang, L = this._L;
    var a = FruitCratesCore.answer(st), chips = FruitCratesCore.chips(st), lv = FruitCratesCore.helpLevel(st);
    var name = this._fruitName(st.noun);
    var quick = this._look() === 'quick';
    this._wrap.classList.toggle('is-done', st.done);
    this._wrap.classList.toggle('is-one', st.crates === 1);
    this._wrap.classList.toggle('is-pad-open', this._padOpen && L.mode === 'stack');
    this._wrap.classList.toggle('is-covered', this._covered);
    this._wrap.classList.toggle('is-quick', quick && !st.done && !(st.checked && st.checked.slip !== 'none'));
    /* the slate */
    var text = st.typed;
    this._slate.textContent = text;
    this._slate.classList.toggle('is-empty', text === '');
    this._slate.classList.toggle('is-gold', st.done);
    this._slate.classList.toggle('is-wrong', !!(st.checked && !st.checked.ok && st.checked.slip !== 'none' && a !== null && !st.done));
    this._slate.setAttribute('aria-label', text === '' ? t('slateEmpty') : interp(t('slateLabel'), { a: text }));
    this._pencil.hidden = L.mode !== 'stack' || st.done;
    this._peekBtn.hidden = !quick || st.done || !this._covered;
    this._peekBtn.setAttribute('aria-label', t('peek'));
    /* the crates */
    for (var c = 0; c < 2; c++) {
      var crate = this._crateEls[c];
      crate.hidden = c >= st.crates;
      crate.setAttribute('aria-label', interp(t('crateLabel'), { c: c + 1 }));
      var boxes = crate.firstChild.children;
      for (var j = 0; j < boxes.length; j++) {
        var i = c * FruitCratesCore.CRATE + j, box = boxes[j], has = i < st.n;
        box.classList.toggle('has-fruit', has);
        var img = box.querySelector('img');
        if (has && !img && this._theme && this._theme.nouns[st.noun]) { img = LCSPictures.img(this._theme, st.noun, lang, { plural: false }); img.className = 'fc-fruit'; box.insertBefore(img, box.firstChild); }
        if (img && (!has || img.getAttribute('data-noun') !== st.noun)) { if (!has) { box.removeChild(img); img = null; } else { img.src = LCSPictures.url(this._theme, st.noun); img.alt = name; } }
        if (img) img.setAttribute('data-noun', st.noun);
        var chip = box.querySelector('.fc-chip'), v = has ? chips[i] : '';
        chip.textContent = v === '' ? '' : String(v);
        chip.classList.toggle('is-on', v !== '');
        chip.classList.toggle('is-q', v === '?');
        chip.classList.toggle('is-mark', v !== '' && v !== '?' && FruitCratesCore.LANDMARKS.indexOf(v) >= 0 && !(st.done && v === st.n));
        chip.classList.toggle('is-gold', st.done && v === st.n);
      }
    }
    this._wrap.setAttribute('data-help', String(lv));
    /* the pad */
    this._pad.hidden = L.mode === 'stack' && (!this._padOpen || st.done);
    for (var k = 0; k < this._keys.length; k++) this._keys[k].disabled = st.done || st.typed.length >= FruitCratesCore.DIGITS;
    this._erase_.disabled = st.done || st.typed === '';
    this._done.hidden = L.mode !== 'stack';
  },
  _fruitName: function (noun) {
    if (!this._theme || !this._theme.nouns[noun]) return noun;
    try { return LCSPictures.label(this._theme, noun, this.api.lang, { plural: false }); } catch (e) { return noun; }
  },
  _preload: function () {
    if (!this._theme || !this.st || typeof Image === 'undefined') return;
    if (this._theme.nouns[this.st.noun]) { var im = new Image(); im.src = LCSPictures.url(this._theme, this.st.noun); }
  },

  /* ---------------- the fruit drops in; the cloth (quick look) ---------------- */
  _boxEl: function (i) { var c = Math.floor(i / FruitCratesCore.CRATE), crate = this._crateEls && this._crateEls[c]; return crate ? crate.firstChild.children[i % FruitCratesCore.CRATE] : null; },
  _dropIn: function () {
    var st = this.st;
    /* the fruit keeps its full size while it drops (slide + fade); the whole fill takes ≤ 0.8 s */
    var step = st.n ? Math.min(this.DROP_MS, Math.floor(450 / st.n)) : 0;
    for (var i = 0; i < st.n; i++) { var b = this._boxEl(i); if (!b) continue; b.style.setProperty('--fc-delay', (i * step) + 'ms'); bounce(b, 'fc-in'); }
  },
  _clearCover: function () { if (this._coverTimer) { clearTimeout(this._coverTimer); this._coverTimer = null; } this._covered = false; },
  _scheduleCover: function (ms) {
    var self = this, st = this.st;
    if (this._coverTimer) { clearTimeout(this._coverTimer); this._coverTimer = null; }
    if (this._look() !== 'quick' || !st || st.done || st.checked && st.checked.slip !== 'none') return;
    var wait = (ms !== undefined) ? ms : 850 + this.SHOW_MS;
    this._coverTimer = setTimeout(function () {
      self._coverTimer = null;
      if (!self.st || self.st !== st || st.done || self._look() !== 'quick' || !self._wrap || !self._wrap.isConnected) return;
      self._covered = true; self._paintAll();
      self.api.announce(self.api.t('covered'));
      self.api.track('cover', { n: st.n });
    }, wait);
  },
  _peek: function () {
    if (!this.st || this.st.done || !this._covered) return;
    this._covered = false; this._paintAll();
    this.api.sound(520);
    this.api.track('peek', { n: this.st.n });
    this._scheduleCover(this.SHOW_MS);
  },

  /* ---------------- the hand ---------------- */
  _type: function (d) {
    var st = this.st;
    if (!st || !FruitCratesCore.typeDigit(st, d)) return;
    this.api.sound(640);
    this._paintAll();
    bounce(this._slate, 'fc-bob');
    this.api.announce(interp(this.api.t('slateLabel'), { a: st.typed }));
    this.api.track('type', { n: st.n, typed: st.typed });
  },
  _erase: function () {
    var st = this.st;
    if (!st || !FruitCratesCore.erase(st)) return;
    this.api.sound(380);
    this._paintAll();
    this.api.track('erase', { n: st.n, typed: st.typed });
  },
  _togglePad: function (open) {
    var st = this.st;
    if (!st || st.done || !this._L || this._L.mode !== 'stack') return;
    this._padOpen = (open === undefined) ? !this._padOpen : !!open;
    this._paintAll();
    if (this._padOpen) { this._watchOutside(); var k = this._keys[0]; if (k) k.focus(); }
    else { this._unwatchOutside(); this._pencil.focus(); }
    this.api.track('pad', { open: this._padOpen });
  },
  _watchOutside: function () {
    var self = this;
    this._unwatchOutside();
    this._outside = function (ev) { if (!self._pad.contains(ev.target) && !self._pencil.contains(ev.target) && !self._slate.contains(ev.target)) self._togglePad(false); };
    setTimeout(function () { if (self._outside) document.addEventListener('pointerdown', self._outside, true); }, 0);
  },
  _unwatchOutside: function () { if (this._outside) { document.removeEventListener('pointerdown', this._outside, true); this._outside = null; } },
  /* Check has run: the crates are uncovered for good; they read themselves (wrong) or the slate turns gold (right) */
  _afterCheck: function (res) {
    var st = this.st, self = this;
    this._padOpen = false; this._unwatchOutside();
    if (res.slip !== 'none') { if (this._coverTimer) { clearTimeout(this._coverTimer); this._coverTimer = null; } this._covered = false; }
    this._paintAll();
    if (res.ok) {
      this.api.sound(660); setTimeout(function () { self.api.sound(880); }, 140);
      this._speakNumber(st.n);
      bounce(this._slate, 'fc-stick');
      this._popChips();
      this.api.track('right', { id: st.id, n: st.n, misses: st.misses });
      return;
    }
    if (res.slip === 'none') { bounce(this._slate, 'fc-wobble'); return; }
    this.api.sound(300);
    bounce(this._slate, 'fc-wobble');
    this._popChips();
    this.api.track('wrong', { id: st.id, slip: res.slip, a: res.a, misses: st.misses, help: FruitCratesCore.helpLevel(st) });
  },
  /* the chips appear one after another, in counting order */
  _popChips: function () {
    var st = this.st, chips = FruitCratesCore.chips(st), d = 0;
    for (var i = 0; i < chips.length; i++) {
      if (chips[i] === '') continue;
      (function (el, delay) { if (!el) return; el.style.setProperty('--fc-delay', delay + 'ms'); bounce(el, 'fc-pop'); }(this._boxEl(i) && this._boxEl(i).querySelector('.fc-chip'), (d++) * 110));
    }
  },
  _speakNumber: function (n) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: 0.95 }); } catch (e) { /* silent */ }
  }
};

function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; }); }
function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }

var fcCssDone = false;
function injectFruitCratesCSS() {
  if (fcCssDone || typeof document === 'undefined') return;
  fcCssDone = true;
  var css = ''
  + '.fc-wrap{width:100%;position:relative;display:flex;flex-direction:column;align-items:stretch;gap:10px;--fc-box:96px;--fc-boxw:96px;--fc-frame:8px;--fc-gap:3px;--fc-key:48px;--fc-between:10px;--fc-wood:#D9A86A;--fc-wood2:#C38C4C;--fc-wood3:#8A5A2B;--fc-cell:#FFF7E8;}'
  /* the crates */
  + '.fc-crates{display:flex;flex-direction:column;align-items:center;gap:var(--fc-between);}'
  + '.fc-wrap.is-stack .fc-crates{flex-direction:row;justify-content:center;align-items:flex-start;}'
  + '.fc-crate{position:relative;box-sizing:border-box;padding:var(--fc-frame);border-radius:14px;background:linear-gradient(180deg,var(--fc-wood),var(--fc-wood2));box-shadow:inset 0 0 0 2px var(--fc-wood3),0 5px 12px rgba(60,35,10,.16);overflow:hidden;} .fc-crate[hidden]{display:none;}'
  + '.fc-boxes{display:grid;grid-template-columns:repeat(5,var(--fc-boxw));grid-template-rows:repeat(2,var(--fc-box));gap:var(--fc-gap);}'
  + '.fc-wrap.is-stack .fc-boxes{grid-template-columns:repeat(2,var(--fc-boxw));grid-template-rows:repeat(5,var(--fc-box));grid-auto-flow:column;}'
  + '.fc-box{position:relative;width:var(--fc-boxw);height:var(--fc-box);box-sizing:border-box;border-radius:8px;background:var(--fc-cell);box-shadow:inset 0 2px 4px rgba(60,35,10,.18);display:grid;place-items:center;}'
  /* the first line of five gets a slightly warmer floor, so the five reads as a unit */
  + '.fc-wrap.is-row .fc-box:nth-child(-n+5),.fc-wrap.is-stack .fc-box:nth-child(-n+5){background:#FFF2DA;}'
  + '.fc-fruit{width:var(--fc-box);height:var(--fc-box);object-fit:contain;display:block;pointer-events:none;filter:drop-shadow(0 2px 2px rgba(40,25,10,.18));}'
  + '.fc-box.fc-in .fc-fruit{animation:fc-in .38s var(--lcs-ease) var(--fc-delay,0ms) both;} @keyframes fc-in{0%{transform:translateY(-30px);opacity:0;}70%{transform:translateY(3px);opacity:1;}100%{transform:none;opacity:1;}}'
  /* the chips: the crates reading themselves */
  + '.fc-chip{position:absolute;right:3px;top:3px;min-width:30px;height:30px;padding:0 5px;box-sizing:border-box;border-radius:15px;background:var(--lcs-structure);color:#fff;border:2px solid #fff;font-family:var(--lcs-font-display);font-weight:800;font-size:17px;line-height:26px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.28);transform:scale(0);transition:transform .2s var(--lcs-ease);pointer-events:none;}'
  + '.fc-chip:not(.is-on){display:none;} .fc-chip.is-on{transform:scale(1);} .fc-chip.is-mark{background:#0E5247;} .fc-chip.is-q{background:var(--lcs-accent);} .fc-chip.is-gold{background:#F6D98A;color:#5B4312;border-color:#C9A24A;min-width:38px;height:38px;line-height:34px;font-size:22px;border-radius:19px;}'
  + '.fc-chip.fc-pop{animation:fc-pop .32s var(--lcs-ease) var(--fc-delay,0ms) both;} @keyframes fc-pop{0%{transform:scale(0);}70%{transform:scale(1.2);}100%{transform:scale(1);}}'
  + '.fc-wrap.is-stack .fc-chip{min-width:24px;height:24px;font-size:14px;line-height:20px;right:1px;top:1px;}'
  /* the cloth (quick look) */
  + '.fc-cloth{position:absolute;inset:0;border-radius:14px;background:repeating-linear-gradient(45deg,#2C7A6C 0 14px,#25695D 14px 28px);box-shadow:inset 0 0 0 3px #1D5449;transform:translateY(-104%);transition:transform .42s var(--lcs-ease);pointer-events:none;}'
  + '.fc-wrap.is-covered .fc-cloth{transform:none;}'
  + '.fc-roll{display:none;position:absolute;left:6px;right:6px;top:0;height:10px;border-radius:0 0 6px 6px;background:repeating-linear-gradient(90deg,#2C7A6C 0 10px,#25695D 10px 20px);box-shadow:0 2px 3px rgba(0,0,0,.25);pointer-events:none;} .fc-wrap.is-quick:not(.is-covered) .fc-roll{display:block;}'
  /* the desk */
  + '.fc-desk{display:flex;flex-direction:column;align-items:center;gap:8px;}'
  + '.fc-wrap.is-inline .fc-desk{flex-direction:row;justify-content:center;align-items:stretch;}'
  + '.fc-slaterow{display:flex;align-items:center;justify-content:center;gap:8px;}'
  + '.fc-slate{min-width:96px;height:max(var(--fc-key),52px);box-sizing:border-box;padding:0 14px;border-radius:12px;background:#2F4A43;border:5px solid #B98552;color:#FDFBF3;font-family:var(--lcs-font-display);font-weight:800;font-size:30px;line-height:42px;text-align:center;letter-spacing:2px;box-shadow:0 3px 8px rgba(30,20,10,.18);transition:background .25s,border-color .25s,color .25s;}'
  + '.fc-wrap.is-inline .fc-slate{height:var(--fc-key);line-height:calc(var(--fc-key) - 10px);}'
  + '.fc-slate.is-empty::before{content:"";display:inline-block;width:26px;height:3px;border-radius:2px;background:rgba(253,251,243,.55);vertical-align:middle;}'
  + '.fc-slate.is-wrong{border-color:var(--lcs-accent);color:#FFD9C6;}'
  + '.fc-slate.is-gold{background:#F6D98A;border-color:#C9A24A;color:#5B4312;}'
  + '.fc-pencil{width:48px;height:48px;border-radius:12px;border:0;background:var(--lcs-accent);color:#fff;display:grid;place-items:center;cursor:pointer;touch-action:manipulation;} .fc-pencil[hidden]{display:none;}'
  + '.fc-peek{min-height:48px;padding:0 14px;border-radius:12px;border:2px solid var(--lcs-structure);background:#fff;color:var(--lcs-structure);display:inline-flex;align-items:center;gap:6px;font-family:var(--lcs-font-body);font-weight:800;font-size:16px;cursor:pointer;touch-action:manipulation;} .fc-peek[hidden]{display:none;}'
  + '.fc-pencil:focus-visible,.fc-peek:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  /* the keys: one aligned row — 1 2 3 4 5 6 7 8 9 0 ⌫ */
  + '.fc-pad{display:grid;grid-template-columns:repeat(11,var(--fc-key));gap:4px;justify-content:center;box-sizing:border-box;padding:0;} .fc-pad[hidden]{display:none;}'
  + '.fc-key{height:var(--fc-key);border-radius:12px;border:2px solid var(--lcs-structure-soft);background:#fff;font-family:var(--lcs-font-display);font-weight:800;font-size:22px;color:var(--lcs-structure);cursor:pointer;touch-action:manipulation;display:grid;place-items:center;padding:0;}'
  + '.fc-key:hover{background:var(--lcs-structure-soft);} .fc-key:disabled{opacity:.4;cursor:default;} .fc-key:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  + '.fc-key-erase{color:var(--lcs-accent);} .fc-key-done{grid-column:1 / -1;font-size:17px;background:var(--lcs-structure);color:#fff;border-color:var(--lcs-structure);} .fc-key-done[hidden]{display:none;}'
  + '.fc-wrap.is-row .fc-key-done{display:none;}'
  /* phones: the slate above the crates, the pad floating */
  + '.fc-wrap.is-stack .fc-desk{order:-1;}'
  + '.fc-wrap.is-stack .fc-pad{position:absolute;left:50%;transform:translateX(-50%);bottom:0;z-index:6;grid-template-columns:repeat(3,56px);padding:6px;border-radius:16px;background:var(--lcs-surface);border:2px solid var(--lcs-line);box-shadow:0 10px 24px rgba(20,30,28,.22);}'
  + '.fc-wrap.is-stack .fc-key{height:50px;}'
  /* motion */
  + '.fc-bob{animation:fc-bob .4s var(--lcs-ease) 1;} @keyframes fc-bob{0%,100%{transform:none;}40%{transform:translateY(-5px) scale(1.04);}}'
  + '.fc-stick{animation:fc-stick .5s var(--lcs-ease) 1;} @keyframes fc-stick{0%{transform:scale(1);}40%{transform:scale(1.16) rotate(-3deg);}100%{transform:none;}}'
  + '.fc-wobble{animation:fc-wobble .45s var(--lcs-ease) 1;} @keyframes fc-wobble{0%,100%{transform:translateX(0);}25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}'
  + '@media (prefers-reduced-motion:reduce){.fc-fruit,.fc-chip,.fc-slate,.fc-cloth{animation:none!important;transition:none!important;}}';
  var style = document.createElement('style');
  style.id = 'fc-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = FruitCratesActivity;
if (typeof window !== 'undefined') window.FruitCratesActivity = FruitCratesActivity;
