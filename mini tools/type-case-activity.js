/* =====================================================================
   type-case-activity.js — ACTIVITY #41 of the one-by-one rebuild:
   "Match Uppercase and Lowercase Letters" → THE PRINTER'S TYPE CASE
   (RF.K.1.d). Design sheet: docs/activities-rebuild/designs/041-choice-board.md
   ---------------------------------------------------------------------
   THE INVENTION: capitals live in the UPPER drawer, small letters in the
   LOWER drawer, and every metal letter carries its other form on its back.
   Drop the right sort under (or over) the given one; a wrong sort tips over
   and shows whose letter it really is. Pull the press and the pair prints
   onto the alphabet poster. Look-alikes: tap every copy of a letter among
   b/d/p/q-type twins. In words: tap every copy in three picture-words and
   say how many.

   ACTIVITY LAYER ONLY: the model is type-case-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.TypeCaseActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var TypeCaseActivity = {
  id: 'type-case',
  apparatusClasses: ['tc-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:        {en:'Match Uppercase and Lowercase Letters',de:'Große und kleine Buchstaben',fr:'Majuscules et minuscules',es:'Mayúsculas y minúsculas',pt:'Maiúsculas e minúsculas',it:'Maiuscole e minuscole',nl:'Hoofdletters en kleine letters',sv:'Stora och små bokstäver',da:'Store og små bogstaver',no:'Store og små bokstaver',fi:'Isot ja pienet kirjaimet'},
    instruction:  {en:'Capitals live in the upper drawer, small letters in the lower drawer. Put the letter’s other form in the empty slot, then pull the press.',de:'Große Buchstaben wohnen in der oberen Schublade, kleine in der unteren. Leg die andere Form des Buchstabens in das leere Fach und zieh dann an der Presse.',fr:'Les majuscules vivent dans le tiroir du haut, les minuscules dans celui du bas. Mets l’autre forme de la lettre dans la case vide, puis tire la presse.',es:'Las mayúsculas viven en el cajón de arriba y las minúsculas en el de abajo. Pon la otra forma de la letra en el hueco vacío y luego jala la prensa.',pt:'As maiúsculas moram na gaveta de cima e as minúsculas na de baixo. Coloque a outra forma da letra no espaço vazio e depois puxe a prensa.',it:'Le maiuscole abitano nel cassetto di sopra, le minuscole in quello di sotto. Metti l’altra forma della lettera nello scomparto vuoto, poi tira la pressa.',nl:'Hoofdletters wonen in de bovenste lade, kleine letters in de onderste. Leg de andere vorm van de letter in het lege vakje en trek dan aan de pers.',sv:'Stora bokstäver bor i den övre lådan och små i den nedre. Lägg bokstavens andra form i det tomma facket och dra sedan i pressen.',da:'Store bogstaver bor i den øverste skuffe og små i den nederste. Læg bogstavets anden form i det tomme rum, og træk så i pressen.',no:'Store bokstaver bor i den øverste skuffen og små i den nederste. Legg den andre formen av bokstaven i det tomme rommet, og trekk så i pressen.',fi:'Isot kirjaimet asuvat ylälaatikossa ja pienet alalaatikossa. Laita kirjaimen toinen muoto tyhjään lokeroon ja vedä sitten painokoneen vipua.'},
    check:        {en:'Pull the press',de:'An der Presse ziehen',fr:'Tirer la presse',es:'Jalar la prensa',pt:'Puxar a prensa',it:'Tira la pressa',nl:'Trek aan de pers',sv:'Dra i pressen',da:'Træk i pressen',no:'Trekk i pressen',fi:'Vedä vipua'},
    pCap:         {en:'Find the small {given}.',de:'Finde das kleine {given}.',fr:'Trouve le {given} minuscule.',es:'Encuentra la {given} minúscula.',pt:'Ache o {given} minúsculo.',it:'Trova la {given} minuscola.',nl:'Zoek de kleine {given}.',sv:'Hitta lilla {given}.',da:'Find det lille {given}.',no:'Finn lille {given}.',fi:'Etsi pieni {given}.'},
    pSmall:       {en:'Find the capital {given}.',de:'Finde das große {given}.',fr:'Trouve le {given} majuscule.',es:'Encuentra la {given} mayúscula.',pt:'Ache o {given} maiúsculo.',it:'Trova la {given} maiuscola.',nl:'Zoek de hoofdletter {given}.',sv:'Hitta stora {given}.',da:'Find det store {given}.',no:'Finn store {given}.',fi:'Etsi iso {given}.'},
    pLook:        {en:'Tap every {target}.',de:'Tippe jedes {target} an.',fr:'Touche chaque {target}.',es:'Toca cada {target}.',pt:'Toque em cada {target}.',it:'Tocca ogni {target}.',nl:'Tik elke {target} aan.',sv:'Tryck på varje {target}.',da:'Tryk på hvert {target}.',no:'Trykk på hver {target}.',fi:'Napauta jokaista {target}-kirjainta.'},
    pWords:       {en:'Tap every {target} in the words. How many?',de:'Tippe jedes {target} in den Wörtern an. Wie viele sind es?',fr:'Touche chaque {target} dans les mots. Combien y en a-t-il ?',es:'Toca cada {target} en las palabras. ¿Cuántas hay?',pt:'Toque em cada {target} nas palavras. Quantos são?',it:'Tocca ogni {target} nelle parole. Quante sono?',nl:'Tik elke {target} in de woorden aan. Hoeveel zijn het er?',sv:'Tryck på varje {target} i orden. Hur många är det?',da:'Tryk på hvert {target} i ordene. Hvor mange er der?',no:'Trykk på hver {target} i ordene. Hvor mange er det?',fi:'Napauta jokaista {target}-kirjainta sanoissa. Montako niitä on?'},
    hintEmpty:    {en:'Put a letter in the empty slot.',de:'Leg einen Buchstaben in das leere Fach.',fr:'Mets une lettre dans la case vide.',es:'Pon una letra en el hueco vacío.',pt:'Coloque uma letra no espaço vazio.',it:'Metti una lettera nello scomparto vuoto.',nl:'Leg een letter in het lege vakje.',sv:'Lägg en bokstav i det tomma facket.',da:'Læg et bogstav i det tomme rum.',no:'Legg en bokstav i det tomme rommet.',fi:'Laita kirjain tyhjään lokeroon.'},
    hintTap:      {en:'Tap every {target}.',de:'Tippe jedes {target} an.',fr:'Touche chaque {target}.',es:'Toca cada {target}.',pt:'Toque em cada {target}.',it:'Tocca ogni {target}.',nl:'Tik elke {target} aan.',sv:'Tryck på varje {target}.',da:'Tryk på hvert {target}.',no:'Trykk på hver {target}.',fi:'Napauta jokaista {target}-kirjainta.'},
    hintWrong:    {en:'That one is {letter}, not {target}.',de:'Das ist ein {letter}, kein {target}.',fr:'Ça, c’est un {letter}, pas un {target}.',es:'Esa es la {letter}, no la {target}.',pt:'Esse é o {letter}, não o {target}.',it:'Questa è la {letter}, non la {target}.',nl:'Dat is een {letter}, geen {target}.',sv:'Det där är {letter}, inte {target}.',da:'Det dér er {letter}, ikke {target}.',no:'Det der er {letter}, ikke {target}.',fi:'Tuo on {letter}, ei {target}.'},
    hintBack:     {en:'This is what {target} looks like on the back. Find it in the tray.',de:'So sieht {target} auf der Rückseite aus. Such es auf dem Tablett.',fr:'Voici à quoi ressemble {target} au dos. Trouve-le sur le plateau.',es:'Así se ve la {target} por detrás. Búscala en la charola.',pt:'Veja como é o {target} no verso. Procure-o na bandeja.',it:'Ecco com’è la {target} sul retro. Cercala nel vassoio.',nl:'Zo ziet de {target} er aan de achterkant uit. Zoek hem op het plankje.',sv:'Så här ser {target} ut på baksidan. Hitta den på brickan.',da:'Sådan ser {target} ud på bagsiden. Find det på bakken.',no:'Slik ser {target} ut på baksiden. Finn den på brettet.',fi:'Tältä {target} näyttää kääntöpuolella. Etsi se tarjottimelta.'},
    hintMore:     {en:'{k} more to find.',de:'Noch {k} zu finden.',fr:'Encore {k} à trouver.',es:'Faltan {k} por encontrar.',pt:'Faltam {k} para achar.',it:'Ne mancano ancora {k}.',nl:'Nog {k} te vinden.',sv:'{k} kvar att hitta.',da:'{k} mere at finde.',no:'{k} igjen å finne.',fi:'Vielä {k} löytämättä.'},
    hintNotTarget:{en:'Not every one of these is {target}.',de:'Nicht jeder davon ist ein {target}.',fr:'Ce ne sont pas tous des {target}.',es:'No todas estas son {target}.',pt:'Nem todos estes são {target}.',it:'Non sono tutte {target}.',nl:'Niet elke letter hier is een {target}.',sv:'Inte alla de här är {target}.',da:'Ikke alle disse er {target}.',no:'Ikke alle disse er {target}.',fi:'Kaikki nämä eivät ole {target}-kirjaimia.'},
    hintCount:    {en:'Count the letters you found.',de:'Zähl die Buchstaben, die du gefunden hast.',fr:'Compte les lettres que tu as trouvées.',es:'Cuenta las letras que encontraste.',pt:'Conte as letras que você achou.',it:'Conta le lettere che hai trovato.',nl:'Tel de letters die je gevonden hebt.',sv:'Räkna bokstäverna du har hittat.',da:'Tæl de bogstaver, du har fundet.',no:'Tell bokstavene du har funnet.',fi:'Laske löytämäsi kirjaimet.'},
    hintCountSet: {en:'How many? Tap a number.',de:'Wie viele? Tippe auf eine Zahl.',fr:'Combien ? Touche un nombre.',es:'¿Cuántas? Toca un número.',pt:'Quantos? Toque num número.',it:'Quante? Tocca un numero.',nl:'Hoeveel? Tik op een getal.',sv:'Hur många? Tryck på ett tal.',da:'Hvor mange? Tryk på et tal.',no:'Hvor mange? Trykk på et tall.',fi:'Montako? Napauta lukua.'},
    hintBoth:     {en:'Look for both forms: {Target} and {low}.',de:'Such beide Formen: {Target} und {low}.',fr:'Cherche les deux formes : {Target} et {low}.',es:'Busca las dos formas: {Target} y {low}.',pt:'Procure as duas formas: {Target} e {low}.',it:'Cerca le due forme: {Target} e {low}.',nl:'Zoek beide vormen: {Target} en {low}.',sv:'Leta efter båda formerna: {Target} och {low}.',da:'Kig efter begge former: {Target} og {low}.',no:'Se etter begge formene: {Target} og {low}.',fi:'Etsi molemmat muodot: {Target} ja {low}.'},
    okPairs:      {en:'{Target} and {target} — the same letter!',de:'{Target} und {target} – derselbe Buchstabe!',fr:'{Target} et {target} : la même lettre !',es:'¡{Target} y {target}: la misma letra!',pt:'{Target} e {target}: a mesma letra!',it:'{Target} e {target}: la stessa lettera!',nl:'{Target} en {target}: dezelfde letter!',sv:'{Target} och {target} – samma bokstav!',da:'{Target} og {target} – det samme bogstav!',no:'{Target} og {target} – samme bokstav!',fi:'{Target} ja {target} – sama kirjain!'},
    okLook:       {en:'You found every {target} — {n} of them!',de:'Du hast jedes {target} gefunden – {n} Stück!',fr:'Tu as trouvé tous les {target} : il y en a {n} !',es:'¡Encontraste todas las {target}: son {n}!',pt:'Você achou todos os {target}: são {n}!',it:'Hai trovato tutte le {target}: sono {n}!',nl:'Je hebt elke {target} gevonden: het zijn er {n}!',sv:'Du hittade varje {target} – {n} stycken!',da:'Du fandt hvert {target} – {n} i alt!',no:'Du fant hver {target} – {n} til sammen!',fi:'Löysit jokaisen {target}-kirjaimen – niitä on {n}!'},
    okWords:      {en:'{n} {target}’s in the words!',de:'{n}-mal {target} in den Wörtern!',fr:'{n} fois la lettre {target} dans les mots !',es:'¡{n} veces la {target} en las palabras!',pt:'{n} vezes o {target} nas palavras!',it:'{n} volte la {target} nelle parole!',nl:'{n} keer de {target} in de woorden!',sv:'{n} stycken {target} i orden!',da:'{n} gange {target} i ordene!',no:'{n} ganger {target} i ordene!',fi:'{n} {target}-kirjainta sanoissa!'},
    setLevel:     {en:'Level',de:'Stufe',fr:'Niveau',es:'Nivel',pt:'Nível',it:'Livello',nl:'Niveau',sv:'Nivå',da:'Niveau',no:'Nivå',fi:'Taso'},
    lvPairs:      {en:'Big and small',de:'Groß und klein',fr:'Majuscules et minuscules',es:'Mayúsculas y minúsculas',pt:'Maiúsculas e minúsculas',it:'Maiuscole e minuscole',nl:'Groot en klein',sv:'Stor och liten',da:'Stor og lille',no:'Stor og liten',fi:'Iso ja pieni'},
    lvLook:       {en:'Look-alikes',de:'Doppelgänger',fr:'Lettres jumelles',es:'Letras parecidas',pt:'Letras parecidas',it:'Lettere simili',nl:'Lijken op elkaar',sv:'Liknande bokstäver',da:'Ligner hinanden',no:'Bokstaver som ligner',fi:'Samannäköiset'},
    lvWords:      {en:'In words',de:'In Wörtern',fr:'Dans les mots',es:'En palabras',pt:'Nas palavras',it:'Nelle parole',nl:'In woorden',sv:'I ord',da:'I ord',no:'I ord',fi:'Sanoissa'},
    setDir:       {en:'Direction',de:'Richtung',fr:'Sens',es:'Dirección',pt:'Direção',it:'Direzione',nl:'Richting',sv:'Riktning',da:'Retning',no:'Retning',fi:'Suunta'},
    dBoth:        {en:'Both',de:'Beides',fr:'Les deux',es:'Las dos',pt:'As duas',it:'Entrambe',nl:'Allebei',sv:'Båda',da:'Begge',no:'Begge',fi:'Molemmat'},
    dCap:         {en:'Capital first',de:'Großbuchstabe zuerst',fr:'Majuscule d’abord',es:'Mayúscula primero',pt:'Maiúscula primeiro',it:'Prima la maiuscola',nl:'Hoofdletter eerst',sv:'Stor först',da:'Stort først',no:'Stor først',fi:'Iso ensin'},
    dSmall:       {en:'Small first',de:'Kleinbuchstabe zuerst',fr:'Minuscule d’abord',es:'Minúscula primero',pt:'Minúscula primeiro',it:'Prima la minuscola',nl:'Kleine letter eerst',sv:'Liten först',da:'Lille først',no:'Liten først',fi:'Pieni ensin'},
    ariaSort:     {en:'letter {x}',de:'Buchstabe {x}',fr:'lettre {x}',es:'letra {x}',pt:'letra {x}',it:'lettera {x}',nl:'letter {x}',sv:'bokstav {x}',da:'bogstav {x}',no:'bokstav {x}',fi:'kirjain {x}'},
    ariaUpper:    {en:'upper drawer',de:'obere Schublade',fr:'tiroir du haut',es:'cajón de arriba',pt:'gaveta de cima',it:'cassetto di sopra',nl:'bovenste lade',sv:'övre lådan',da:'øverste skuffe',no:'øverste skuff',fi:'ylälaatikko'},
    ariaLower:    {en:'lower drawer',de:'untere Schublade',fr:'tiroir du bas',es:'cajón de abajo',pt:'gaveta de baixo',it:'cassetto di sotto',nl:'onderste lade',sv:'nedre lådan',da:'nederste skuffe',no:'nederste skuff',fi:'alalaatikko'},
    ariaEmpty:    {en:'empty slot',de:'leeres Fach',fr:'case vide',es:'hueco vacío',pt:'espaço vazio',it:'scomparto vuoto',nl:'leeg vakje',sv:'tomt fack',da:'tomt rum',no:'tomt rom',fi:'tyhjä lokero'},
    ariaPoster:   {en:'{n} letters printed',de:'{n} Buchstaben gedruckt',fr:'{n} lettres imprimées',es:'{n} letras impresas',pt:'{n} letras impressas',it:'{n} lettere stampate',nl:'{n} letters gedrukt',sv:'{n} bokstäver tryckta',da:'{n} bogstaver trykt',no:'{n} bokstaver trykt',fi:'{n} kirjainta painettu'}
    /*STRINGS-END*/
  },
  defaults: { level: 'pairs', direction: 'both' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'pairs', labelKey: 'lvPairs' }, { value: 'look', labelKey: 'lvLook' }, { value: 'words', labelKey: 'lvWords' }] },
    { key: 'direction', type: 'choice', labelKey: 'setDir', options: [{ value: 'both', labelKey: 'dBoth' }, { value: 'capital', labelKey: 'dCap' }, { value: 'small', labelKey: 'dSmall' }] }
  ],

  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._printed = {};
    injectTypeCaseCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._render2();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (dir, n) { return '/image-library-webp/themes/' + encodeURIComponent(dir) + '/' + n + '@2x.webp'; },
  _lang: function () { var l = (this.api && this.api.lang) || (document.documentElement.getAttribute('lang') || 'en'); return TypeCaseCore.loc(String(l).slice(0, 2)); },

  /* ---------------- rounds ---------------- */
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _key: function () { return this._lang() + '/' + TypeCaseCore.level(this._set('level')) + '/' + TypeCaseCore.dir(this._set('direction')); },
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = TypeCaseCore.rounds(this._lang(), this._set('level'), this._set('direction')); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = TypeCaseCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]], up, low, args;
    if (r.kind === 'pairs') { up = r.upper ? r.given : r.answer; low = r.upper ? r.answer : r.given; args = { given: r.given, Target: up, target: low }; }
    else { up = C.pairOf(r.target) && C.isLower(r.target) ? C.pairOf(r.target) : r.target; low = C.isUpper(r.target) ? (C.pairOf(r.target) || r.target) : r.target; args = { target: r.target, Target: up, low: low, n: r.answer }; }
    var pk = r.kind === 'pairs' ? (r.upper ? 'pCap' : 'pSmall') : r.kind === 'look' ? 'pLook' : 'pWords';
    var ck = r.kind === 'pairs' ? 'okPairs' : r.kind === 'look' ? 'okLook' : 'okWords';
    var pss = pass;
    return {
      id: 'type-case.' + r.id, promptKey: pk, promptArgs: args, celebrateKey: ck, answerType: 'state',
      setup: function (tool) { tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._sel = null; tool.st = C.newState(r, tool.FAST ? null : Math.random, pss); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) this.st = TypeCaseCore.newState(TypeCaseCore.rounds(this._lang(), 'pairs', 'both')[0], null, 0);
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._busy) return; last = w; self._render2(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this, st = this.st, r = st.r;
    api.stage.innerHTML = '';
    var L = this._L = TypeCaseCore.layout(this._width());
    var wrap = api.el('div', 'tc-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + ' is-' + r.kind); this._wrap = wrap;
    wrap.style.setProperty('--tc-sort', L.sort + 'px'); wrap.style.setProperty('--tc-sorth', L.sortH + 'px'); wrap.style.setProperty('--tc-glyph', L.glyph + 'px'); wrap.style.setProperty('--tc-stick', L.stick + 'px'); wrap.style.setProperty('--tc-pic', L.pic + 'px'); wrap.style.setProperty('--tc-key', L.key + 'px'); wrap.style.setProperty('--tc-side', L.side + 'px');
    var stage = api.el('div', 'tc-stage'); this._stage = stage; wrap.appendChild(stage);
    wrap.addEventListener('keydown', function (ev) { if ((ev.key === 'p' || ev.key === 'P') && !ev.defaultPrevented) { ev.preventDefault(); self._press_(); } });
    var left = api.el('div', 'tc-left'); stage.appendChild(left);
    var cse = api.el('div', 'tc-case'); this._case = cse; left.appendChild(cse);
    var work = api.el('div', 'tc-work'); this._work = work; left.appendChild(work);
    var side = api.el('div', 'tc-side'); if (L.mode === 'wide') stage.appendChild(side);
    var press = api.el('div', 'tc-press'); press.setAttribute('aria-hidden', 'true'); press.innerHTML = '<svg viewBox="0 0 196 120"><rect x="10" y="92" width="176" height="16" rx="3" class="tc-bed"/><rect x="26" y="70" width="144" height="22" rx="4" class="tc-platen"/><circle cx="98" cy="82" r="9" class="tc-roller"/><path d="M150 72 L178 22" class="tc-lever"/><circle cx="178" cy="22" r="11" class="tc-knob"/></svg>'; this._press = press; side.appendChild(press);
    var poster = api.el('div', 'tc-poster'); this._poster = poster; side.appendChild(poster);
    var note = api.el('div', 'tc-note'); note.setAttribute('aria-live', 'polite'); this._note = note;
    var ask = api.el('div', 'tc-ask'); ask.appendChild(note);
    var chk = api.el('button', 'tc-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._press_(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.appendChild(ask);
    if (L.mode !== 'wide') wrap.appendChild(side);
    api.stage.appendChild(wrap);
    this._paint();
  },

  /* a metal sort: the face, or (flipped / tipped) its back */
  _sortHTML: function (face, back, flipped) {
    var ch = flipped && back ? back : face;
    return '<span class="tc-face' + (flipped ? ' is-back' : '') + '" lang="' + this._lang() + '">' + ch + '</span>';
  },
  _paint: function () {
    if (!this._stage) return;
    var st = this.st, r = st.r;
    this._paintCase();
    if (r.kind === 'pairs') this._paintTray(); else if (r.kind === 'look') this._paintStick(); else this._paintWords();
    this._paintPoster();
    var C = TypeCaseCore, h = C.hint(st), msg = '', a = this._args();
    if (st.done) msg = this._afterOk ? '' : this._celebrate();
    else if (h) msg = this._t(h, a);
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
    this._press.classList.toggle('is-ready', !!(r.kind === 'pairs' ? st.placed : true) && !st.done);
  },
  _args: function () {
    var st = this.st, r = st.r, C = TypeCaseCore, a = {};
    if (r.kind === 'pairs') { a.target = r.answer; a.Target = r.upper ? r.given : r.answer; a.low = r.upper ? r.answer : r.given; a.given = r.given; if (st.last && st.last.face) a.letter = st.last.face; }
    else { a.target = r.target; a.Target = C.isLower(r.target) ? C.pairOf(r.target) : r.target; a.low = C.isUpper(r.target) ? C.pairOf(r.target) : r.target; a.n = r.answer; if (st.last && st.last.missing != null) a.k = st.last.missing; }
    return a;
  },
  _celebrate: function () {
    var r = this.st.r, a = this._args();
    if (r.kind === 'pairs') return this._t('okPairs', { Target: a.Target, target: a.low });
    if (r.kind === 'look') return this._t('okLook', { target: r.target, n: r.answer });
    return this._t('okWords', { target: r.target, n: r.answer });
  },

  /* the case: an upper and a lower drawer, the lit column in the middle */
  _paintCase: function () {
    var self = this, st = this.st, r = st.r, C = TypeCaseCore, cse = this._case;
    cse.innerHTML = '';
    var drawer = function (which) {
      var d = self.api.el('div', 'tc-drawer is-' + which); d.setAttribute('aria-label', self._t(which === 'upper' ? 'ariaUpper' : 'ariaLower'));
      d.appendChild(self.api.el('span', 'tc-dim')); d.appendChild(self.api.el('span', 'tc-dim'));
      var lit = self.api.el('div', 'tc-lit'); d.appendChild(lit);
      d.appendChild(self.api.el('span', 'tc-dim')); d.appendChild(self.api.el('span', 'tc-dim'));
      cse.appendChild(d);
      return lit;
    };
    var up = drawer('upper'), low = r.kind === 'pairs' ? drawer('lower') : null;
    this._lits = { upper: up, lower: low };
    if (r.kind === 'pairs') {
      var given = r.upper ? up : low, empty = r.upper ? low : up;
      given.innerHTML = '<span class="tc-sort is-given' + (st.help >= 2 && !st.done ? ' is-flipped' : '') + '">' + this._sortHTML(r.given, C.pairOf(r.given), st.help >= 2 && !st.done) + '</span>';
      if (st.placed) { var s = C.byId(st.tray, st.placed); empty.innerHTML = '<span class="tc-sort is-placed">' + this._sortHTML(s.face, s.back, false) + '</span>'; empty.classList.add('is-fit'); }
      else if (st.show && st.bounced) { var b = C.byId(st.tray, st.bounced); empty.innerHTML = '<span class="tc-sort is-tipped">' + this._sortHTML(b.face, b.back, true) + '</span>'; }
      else { empty.classList.add('is-empty'); empty.setAttribute('aria-label', this._t('ariaEmpty')); }
      empty.addEventListener('click', function () { if (self._sel) { var id = self._sel; self._sel = null; self._drop(id); } else if (st.placed && !st.done) { TypeCaseCore.lift(st); self.api.sound(420); self._paint(); } });
      return;
    }
    /* look / words: the target's sort stands in the upper compartment; at help 2 both forms side by side */
    var both = st.help >= 2 && !st.done && C.pairOf(r.target);
    up.innerHTML = '<span class="tc-sort is-given">' + this._sortHTML(r.target, C.pairOf(r.target), false) + '</span>' + (both ? '<span class="tc-sort is-given is-flipped">' + this._sortHTML(r.target, C.pairOf(r.target), true) + '</span>' : '');
    if (both) up.classList.add('is-both');
  },
  /* pairs: four sorts in the composing tray */
  _paintTray: function () {
    var self = this, st = this.st, C = TypeCaseCore, work = this._work;
    work.innerHTML = '';
    var tray = this.api.el('div', 'tc-tray'); work.appendChild(tray);
    st.tray.forEach(function (s) {
      var b = self.api.el('button', 'tc-sort is-tray' + (self._sel === s.id ? ' is-sel' : '') + (st.placed === s.id ? ' is-gone' : '') + (st.flipped[s.id] ? ' is-flipped' : '')); b.type = 'button'; b.setAttribute('data-id', s.id);
      b.setAttribute('aria-label', self._t('ariaSort', { x: st.flipped[s.id] ? s.back : s.face }));
      b.innerHTML = self._sortHTML(s.face, s.back, !!st.flipped[s.id]);
      if (st.placed === s.id) b.disabled = true;
      self._bindSort(b, s.id, 'tray');
      tray.appendChild(b);
    });
  },
  /* look-alikes: eight sorts on the composing stick, two rows of four */
  _paintStick: function () {
    var self = this, st = this.st, C = TypeCaseCore, r = st.r, work = this._work, wrongs = st.show && st.last && st.last.extra ? st.last.extra : [];
    work.innerHTML = '';
    var stick = this.api.el('div', 'tc-stick'); work.appendChild(stick);
    var targets = C.targetsOf(st);
    st.stick.forEach(function (s) {
      var flip = !!st.flipped[s.id] || wrongs.indexOf(s.id) >= 0, shimmer = st.help >= 2 && st.show && !s.marked && targets.indexOf(s.id) >= 0;
      var b = self.api.el('button', 'tc-sort is-stick' + (s.marked ? ' is-marked' : '') + (flip ? ' is-flipped' : '') + (shimmer ? ' is-shimmer' : '')); b.type = 'button'; b.setAttribute('data-id', s.id);
      b.setAttribute('aria-label', self._t('ariaSort', { x: flip ? s.back || s.face : s.face })); b.setAttribute('aria-pressed', s.marked ? 'true' : 'false');
      b.innerHTML = self._sortHTML(s.face, s.back, flip);
      if (shimmer) b.style.animationDelay = (st.stick.indexOf(s) * 140) + 'ms';
      self._bindSort(b, s.id, 'mark');
      stick.appendChild(b);
    });
    if (st.show && st.last && st.last.missing) { var dots = this.api.el('div', 'tc-dots'); dots.setAttribute('aria-hidden', 'true'); for (var i = 0; i < st.last.missing; i++) dots.appendChild(this.api.el('i', 'tc-hollow')); work.appendChild(dots); }
    void r;
  },
  /* in words: three picture-words, each letter a sort; then the count keys */
  _paintWords: function () {
    var self = this, st = this.st, C = TypeCaseCore, work = this._work, wrongs = st.show && st.last && st.last.extra ? st.last.extra : [], targets = C.targetsOf(st);
    work.innerHTML = '';
    var box = this.api.el('div', 'tc-words'); work.appendChild(box);
    var numbered = st.show && st.last && st.last.result === 'count', k = 0;
    st.words.forEach(function (w, wi) {
      var row = self.api.el('div', 'tc-wordrow'); box.appendChild(row);
      row.insertAdjacentHTML('beforeend', '<img class="tc-pic" alt="' + w.word.replace(/"/g, '') + '" draggable="false" src="' + self._pic(w.dir, w.key) + '">');
      var letters = self.api.el('div', 'tc-letters'); row.appendChild(letters);
      st.letters.filter(function (s) { return s.word === wi; }).forEach(function (s) {
        var flip = wrongs.indexOf(s.id) >= 0, shimmer = st.help >= 2 && st.show && !s.marked && targets.indexOf(s.id) >= 0;
        var b = self.api.el('button', 'tc-sort is-letter' + (s.marked ? ' is-marked' : '') + (flip ? ' is-flipped' : '') + (shimmer ? ' is-shimmer' : '')); b.type = 'button'; b.setAttribute('data-id', s.id);
        b.setAttribute('aria-label', self._t('ariaSort', { x: s.face })); b.setAttribute('aria-pressed', s.marked ? 'true' : 'false');
        b.innerHTML = self._sortHTML(s.face, C.pairOf(s.face), flip) + (numbered && s.marked ? '<em class="tc-numtag">' + (++k) + '</em>' : '');
        self._bindSort(b, s.id, 'mark');
        letters.appendChild(b);
      });
    });
    if (st.show && st.last && st.last.missing) { var dots = this.api.el('div', 'tc-dots'); dots.setAttribute('aria-hidden', 'true'); for (var i = 0; i < st.last.missing; i++) dots.appendChild(this.api.el('i', 'tc-hollow')); work.appendChild(dots); }
    var keys = this.api.el('div', 'tc-keys'); work.appendChild(keys);
    for (var n = 1; n <= 6; n++) (function (n) {
      var b = self.api.el('button', 'tc-key' + (st.count === n ? ' is-on' : '')); b.type = 'button'; b.textContent = String(n); b.setAttribute('data-n', n); b.setAttribute('aria-pressed', st.count === n ? 'true' : 'false');
      b.disabled = !!st.done;
      b.addEventListener('click', function () { if (self._busy) return; if (TypeCaseCore.setCount(st, n)) { self.api.sound(500 + n * 40); self._paint(); } });
      keys.appendChild(b);
    })(n);
  },
  /* the poster: the locale's alphabet, printed pairs in ink */
  _paintPoster: function () {
    var C = TypeCaseCore, A = C.POSTER[this._lang()], self = this, p = this._poster, printed = this._printed, n = 0, html = '';
    A.forEach(function (ch) { var on = !!printed[ch]; if (on) n++; html += '<span class="tc-cell' + (on ? ' is-on' : '') + '">' + ch + (C.pairOf(ch) || '') + '</span>'; });
    p.innerHTML = '<div class="tc-grid" lang="' + this._lang() + '">' + html + '</div>';
    p.setAttribute('aria-label', this._t('ariaPoster', { n: n }));
    void self;
  },

  /* ---- the hand ---- */
  _bindSort: function (el, id, mode) {
    var self = this, timer = null, longDone = false;
    el.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done && mode !== 'tray') { if (self.st.done) self._armLong(el, id); return; }
      longDone = false;
      timer = setTimeout(function () { longDone = true; self._flip(id); }, 500);
      if (mode !== 'tray') return;
      ev.preventDefault();
      var x0 = ev.clientX, y0 = ev.clientY, moved = false, ghost = null;
      var move = function (e) {
        if (!moved && Math.hypot(e.clientX - x0, e.clientY - y0) < 6) return;
        if (!moved) { moved = true; clearTimeout(timer); ghost = el.cloneNode(true); ghost.className = 'tc-sort tc-dragging'; document.body.appendChild(ghost); }
        ghost.style.left = (e.clientX - 34) + 'px'; ghost.style.top = (e.clientY - 38) + 'px';
      };
      var up = function (e) {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        clearTimeout(timer);
        if (ghost) ghost.remove();
        if (longDone) return;
        if (!moved) { self._drop(id); return; }
        var target = self._emptyLit(), rr = target && target.getBoundingClientRect();
        if (rr && e.clientX >= rr.left - 8 && e.clientX <= rr.right + 8 && e.clientY >= rr.top - 8 && e.clientY <= rr.bottom + 8) self._drop(id); else self._paint();
      };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
    if (mode !== 'tray') {
      el.addEventListener('pointerup', function () { clearTimeout(timer); });
      el.addEventListener('pointerleave', function () { clearTimeout(timer); });
      el.addEventListener('click', function () { if (longDone) { longDone = false; return; } self._mark(id); });
    } else el.addEventListener('click', function (ev) { if (ev.detail !== 0) return; self._drop(id); });
    el.addEventListener('keydown', function (ev) { if (ev.key === 'f' || ev.key === 'F') { ev.preventDefault(); self._flip(id); } });
  },
  _armLong: function (el, id) { var self = this, t = setTimeout(function () { self._flip(id); }, 500); var stop = function () { clearTimeout(t); el.removeEventListener('pointerup', stop); el.removeEventListener('pointerleave', stop); }; el.addEventListener('pointerup', stop); el.addEventListener('pointerleave', stop); },
  _emptyLit: function () { var r = this.st.r; if (r.kind !== 'pairs') return null; return this._lits[r.upper ? 'lower' : 'upper']; },
  _flip: function (id) { if (TypeCaseCore.flip(this.st, id)) { this.api.sound(1180); this._paint(); var nx = this._stage.querySelector('.tc-sort[data-id="' + id + '"]'); if (nx) nx.focus(); } },
  _drop: function (id) {
    if (this._busy) return;
    var st = this.st, res = TypeCaseCore.drop(st, id); if (!res) return;
    this.api.sound(res.result === 'fits' ? 300 : 1180);
    this._paint();
    if (res.result === 'fits' && this._checkBtn) this._checkBtn.focus();
  },
  _mark: function (id) { if (this._busy) return; if (TypeCaseCore.mark(this.st, id)) { this.api.sound(620); this._paint(); var nx = this._stage.querySelector('.tc-sort[data-id="' + id + '"]'); if (nx) nx.focus(); } },
  _press_: function () {
    if (this._busy || this.st.done) return;
    var st = this.st, res = TypeCaseCore.press(st);
    if (res.result === 'ok') {
      var r = st.r, C = TypeCaseCore, up = r.kind === 'pairs' ? (r.upper ? r.given : r.answer) : (C.isLower(r.target) ? C.pairOf(r.target) : r.target);
      if (up) this._printed[up] = true;
      this.api.sound(260);
      if (!this.FAST) { var pr = this._press; pr.classList.remove('is-pull'); void pr.offsetWidth; pr.classList.add('is-pull'); }
      return this._win();
    }
    this.api.sound(res.result === 'empty' || res.result === 'nocount' ? 460 : 196);
    this._paint();
  },
  _win: function () {
    var self = this;
    this.api.sound(523); this._later(function () { self.api.sound(659); }, 110); this._later(function () { self.api.sound(784); }, 220);
    this._paint();
    this._busy = true;
    this._later(function () {
      self._busy = false; self._afterOk = true; self._paint();
      var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click();
    }, this._ms(this.OK_MS));
  }
};

var tcCssDone = false;
function injectTypeCaseCSS() {
  if (tcCssDone || typeof document === 'undefined') return;
  tcCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.tc-wrap{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:10px;--tc-ink:#0F4A40;--tc-teal:#146B5E;--tc-coral:#F2784B;--tc-brass:#C79A3B;}'
  + '.tc-stage{display:flex;gap:12px;align-items:flex-start;user-select:none;-webkit-user-select:none;width:100%;} .is-narrow .tc-stage{flex-direction:column;align-items:stretch;}'
  + '.tc-left{flex:1;min-width:0;display:flex;flex-direction:column;gap:10px;} .tc-side{width:var(--tc-side);flex:none;display:flex;flex-direction:column;gap:8px;} .is-narrow .tc-side{width:100%;flex-direction:row;align-items:center;}'
  + '.tc-case{display:flex;flex-direction:column;gap:6px;padding:8px;border-radius:12px;background:#C98A4B;box-shadow:inset 0 0 0 3px #2A2A35,inset 0 -5px 0 #A06A33;}'
  + '.tc-drawer{display:flex;gap:6px;align-items:stretch;justify-content:center;padding:6px;border-radius:8px;background:#E2B07A;box-shadow:inset 0 0 0 2px #8C5A2A;}'
  + '.tc-dim{flex:1;min-width:16px;max-width:72px;border-radius:6px;background:repeating-linear-gradient(90deg,#B98A5C 0 10px,#A97A4C 10px 20px);opacity:.55;}'
  + '.tc-lit{position:relative;width:calc(var(--tc-sort) + 24px);min-height:calc(var(--tc-sorth) + 12px);display:flex;align-items:center;justify-content:center;gap:4px;border-radius:8px;background:#FBF3E4;box-shadow:inset 0 0 0 3px var(--tc-brass);cursor:pointer;} .tc-lit.is-both{width:calc(var(--tc-sort) * 2 + 32px);}'
  + '.tc-lit.is-empty{animation:tc-glow 1.6s ease-in-out infinite;} @keyframes tc-glow{50%{box-shadow:inset 0 0 0 3px var(--tc-brass),0 0 12px rgba(242,193,75,.9);}} .tc-lit.is-fit{box-shadow:inset 0 0 0 3px var(--tc-teal),0 0 10px rgba(20,107,94,.5);}'
  + '.tc-sort{position:relative;width:var(--tc-sort);height:var(--tc-sorth);padding:0;border:0;border-radius:10px;background:linear-gradient(#C5CCD2,#9AA3AB);box-shadow:inset 0 0 0 2px #2A2A35,inset 0 6px 0 rgba(255,255,255,.35),0 3px 0 #5E666D;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#2A2A35;touch-action:none;transition:transform .2s ease;}'
  + '.tc-sort.is-flipped{background:linear-gradient(#8E979F,#6E777F);color:#FFF6DA;} .tc-sort.is-sel{transform:translateY(-6px);box-shadow:inset 0 0 0 2px #2A2A35,0 0 0 4px var(--tc-teal);}'
  + '.tc-sort.is-gone{visibility:hidden;} .tc-sort.is-tipped{transform:rotate(-14deg) translateY(6px);background:linear-gradient(#8E979F,#6E777F);color:#FFE7A6;box-shadow:inset 0 0 0 2px #E06A3A,0 3px 0 #5E666D;}'
  + '.tc-sort.is-marked{transform:translateY(-8px);box-shadow:inset 0 0 0 2px #2A2A35,inset 0 -6px 0 var(--tc-brass),0 3px 0 #5E666D;}'
  + '.tc-sort.is-shimmer{animation:tc-shim 1.2s ease-in-out 1 both;} @keyframes tc-shim{40%{box-shadow:inset 0 0 0 2px #2A2A35,0 0 14px #FFE7A6;filter:brightness(1.25);}}'
  + '.tc-face{font-family:\'Andika\',\'Andika New Basic\',var(--lcs-font-body,Nunito),sans-serif;font-weight:700;font-size:var(--tc-glyph);line-height:1;}'
  + '.tc-tray{display:flex;gap:8px;justify-content:center;padding:8px;border-radius:10px;background:#5E666D;box-shadow:inset 0 0 0 3px #2A2A35;}'
  + '.tc-stick{display:grid;grid-template-columns:repeat(4,var(--tc-stick));gap:8px;justify-content:center;padding:12px 8px 8px;border-radius:10px;background:#5E666D;box-shadow:inset 0 0 0 3px #2A2A35;} .tc-stick .tc-sort{width:var(--tc-stick);} .is-narrow .tc-stick .tc-sort{height:70px;} .is-narrow .tc-lit{min-height:calc(var(--tc-sorth) - 4px);} .is-narrow:not(.is-pairs) .tc-sort.is-given{height:64px;width:60px;} .is-narrow:not(.is-pairs) .tc-sort.is-given .tc-face{font-size:44px;} .is-narrow:not(.is-pairs) .tc-lit{min-height:72px;width:auto;padding:0 6px;}'
  + '.tc-words{display:flex;flex-direction:column;gap:8px;padding:8px;border-radius:10px;background:#5E666D;box-shadow:inset 0 0 0 3px #2A2A35;}'
  + '.tc-wordrow{display:flex;align-items:center;gap:8px;} .tc-pic{width:var(--tc-pic);height:var(--tc-pic);object-fit:contain;flex:none;border-radius:8px;background:#FFFDF6;}'
  + '.tc-letters{flex:1;min-width:0;display:flex;flex-wrap:nowrap;gap:3px;padding-top:6px;} .tc-sort.is-letter{flex:1 1 0;min-width:20px;max-width:48px;width:auto;height:46px;} .tc-sort.is-letter .tc-face{font-size:clamp(20px,6vw,32px);} .is-wide .tc-sort.is-letter{max-width:52px;height:56px;} .is-wide .tc-sort.is-letter .tc-face{font-size:36px;}'
  + '.tc-numtag{position:absolute;bottom:-8px;right:-6px;min-width:18px;height:18px;border-radius:9px;background:var(--tc-coral);color:#fff;font:800 12px/18px var(--lcs-font-body,Nunito,sans-serif);font-style:normal;text-align:center;}'
  + '.tc-dots{display:flex;gap:6px;justify-content:center;} .tc-hollow{width:14px;height:14px;border-radius:50%;box-shadow:inset 0 0 0 3px var(--tc-coral);}'
  + '.tc-keys{display:flex;gap:4px;justify-content:center;flex-wrap:wrap;} .tc-key{width:var(--tc-key);height:var(--tc-key);border:0;border-radius:10px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #C9B897,0 2px 0 #C9B897;font:800 22px/1 var(--lcs-font-display,\'Baloo 2\',sans-serif);color:var(--tc-ink);cursor:pointer;} .tc-key.is-on{background:var(--tc-teal);color:#fff;box-shadow:0 2px 0 #0B4A40;}'
  + '.tc-press{width:100%;opacity:.55;transition:opacity .2s ease;} .tc-press.is-ready{opacity:1;} .tc-press svg{width:100%;height:auto;display:block;} .is-narrow .tc-press{width:110px;flex:none;}'
  + '.tc-bed{fill:#5E666D;stroke:#2A2A35;stroke-width:2;} .tc-platen{fill:#9AA3AB;stroke:#2A2A35;stroke-width:2;} .tc-roller{fill:#F2784B;stroke:#2A2A35;stroke-width:2;} .tc-lever{stroke:#2A2A35;stroke-width:6;stroke-linecap:round;} .tc-knob{fill:#F2C14B;stroke:#2A2A35;stroke-width:2;}'
  + '.tc-press.is-pull .tc-roller{animation:tc-roll .4s ease-in-out;} @keyframes tc-roll{50%{transform:translateX(50px);}} .tc-press.is-pull .tc-lever,.tc-press.is-pull .tc-knob{transform-box:view-box;transform-origin:150px 72px;animation:tc-lev .4s ease-in-out;} @keyframes tc-lev{50%{transform:rotate(40deg);}}'
  + '.tc-poster{padding:6px;border-radius:6px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #C9B897,0 2px 0 #C9B897;} .is-narrow .tc-poster{flex:1;min-width:0;overflow-x:auto;}'
  + '.tc-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:2px;} .is-narrow .tc-grid{display:flex;gap:4px;}'
  + '.tc-cell{font-family:\'Andika\',var(--lcs-font-body,Nunito),sans-serif;font-size:13px;font-weight:700;text-align:center;color:#D9CDB4;padding:2px 0;border-radius:3px;white-space:nowrap;} .tc-cell.is-on{color:#2A2A35;background:#FFE7A6;} .is-narrow .tc-cell{flex:none;padding:2px 3px;}'
  + '.tc-dragging{position:fixed;z-index:50;pointer-events:none;opacity:.92;}'
  + '.tc-note{min-height:28px;font:700 18px/1.3 var(--lcs-font-body,Nunito,sans-serif);color:var(--tc-ink);text-align:center;flex:1;} .tc-note:empty{display:none;} .tc-note.is-ok{color:var(--tc-teal);font-weight:800;} .tc-note.is-wrong{color:#A6461F;} .is-narrow .tc-note{font-size:15px;text-align:left;}'
  + '.tc-ask{display:flex;align-items:center;justify-content:center;gap:10px;}'
  + '.tc-check{min-height:48px;padding:0 20px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;line-height:1.1;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;max-width:60%;} .tc-check[hidden]{display:none;} .tc-check:disabled{opacity:.5;}'
  + '.tc-sort:focus-visible,.tc-key:focus-visible,.tc-check:focus-visible,.tc-lit:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '@media (prefers-reduced-motion: reduce){.tc-wrap *{animation:none !important;transition:none !important;}}';
  var el = document.createElement('style'); el.id = 'tc-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.TypeCaseActivity = TypeCaseActivity;
