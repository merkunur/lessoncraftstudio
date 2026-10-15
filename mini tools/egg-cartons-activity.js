/* =====================================================================
   egg-cartons-activity.js — ACTIVITY #2 of the one-by-one rebuild:
   "Count by tens" (K.CC.A.1) — POSY'S EGG CARTONS, THE TEN-SHELF.
   Design sheet: docs/activities-rebuild/002-egg-cartons.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: EACH CARTON WEARS ITS RUNNING TOTAL. A carton is ten eggs
   (a lidded two-by-five tray — the ten-frame in egg form). In a COUNT round
   the child taps each carton once and the tag that drops says 10, 20, 30…
   so the fourth carton says 40 and the last carton IS the answer, which the
   child names on a 10…100 rail. In a PACK round the shelf starts empty and
   the child adds cartons from the crate until the last one says the target.
   The by-ones slip (four cartons → "4") gets its own hint. Nothing here is
   drawn by hand: the carton is apparatus geometry in the shell palette; there
   is no mascot (Posy keeps her name in the title only).

   ACTIVITY LAYER ONLY: the model is egg-cartons-core.js; lcs-shell.js is
   untouched. Test seams: window.EggCartonsActivity.st / ._order / ._pool.
   ===================================================================== */
'use strict';

var EggCartonsActivity = {
  id: 'egg-cartons',
  apparatusClasses: ['ec-'],

  strings: {
    title:        {en:"Posy's Egg Cartons",de:'Posys Eierschachteln',fr:'Les boîtes d’œufs de Posy',it:'Le scatole di uova di Posy',es:'Las cajas de huevos de Posy',pt:'As caixas de ovos da Posy',nl:"Posy's eierdozen",sv:'Posys äggkartonger',da:'Posys æggebakker',no:'Posys eggkartonger',fi:'Posyn munakennot'},
    instruction:  {en:'A carton holds ten eggs. Tap each carton and count by tens; then tap how many eggs. In a packing round, add cartons until the last one says the number.',de:'In jede Schachtel passen zehn Eier. Tippe jede Schachtel an und zähle in Zehnerschritten; tippe dann auf die Anzahl der Eier. Beim Packen fügst du Schachteln hinzu, bis die letzte die Zahl zeigt.',fr:'Une boîte contient dix œufs. Touche chaque boîte en comptant de dix en dix, puis touche le nombre d’œufs. Pour emballer, ajoute des boîtes jusqu’à ce que la dernière affiche le nombre.',it:'Una scatola contiene dieci uova. Tocca ogni scatola contando di dieci in dieci, poi tocca quante uova sono. Per impacchettare, aggiungi scatole finché l’ultima mostra il numero.',es:'Una caja tiene diez huevos. Toca cada caja contando de diez en diez; luego toca cuántos huevos hay. Para empacar, agrega cajas hasta que la última muestre el número.',pt:'Uma caixa tem dez ovos. Toque em cada caixa contando de 10 em 10; depois toque em quantos ovos são. Para embalar, acrescente caixas até a última mostrar o número.',nl:'In een eierdoos zitten tien eieren. Tik elke doos aan en tel met sprongen van tien; tik daarna op hoeveel eieren het zijn. Bij inpakken voeg je dozen toe tot de laatste het getal laat zien.',sv:'En kartong rymmer tio ägg. Tryck på varje kartong och räkna med tiotal; tryck sedan på hur många ägg det är. När du packar lägger du till kartonger tills den sista visar talet.',da:'En bakke rummer ti æg. Tryk på hver bakke og tæl med tiere; tryk så på hvor mange æg der er. Når du pakker, lægger du bakker til, indtil den sidste viser tallet.',no:'En kartong rommer ti egg. Trykk på hver kartong og tell med tiere; trykk så på hvor mange egg det er. Når du pakker, legger du til kartonger til den siste viser tallet.',fi:'Kennossa on kymmenen munaa. Napauta jokaista kennoa ja laske kymmenittäin; napauta sitten, kuinka monta munaa on. Pakatessa lisää kennoja, kunnes viimeinen näyttää luvun.'},
    promptCount:  {en:'Tap each carton: 10, 20, 30… Then tap how many eggs.',de:'Tippe jede Schachtel an: 10, 20, 30 … Tippe dann auf die Zahl der Eier.',fr:'Touche chaque boîte : 10, 20, 30… Puis touche le nombre d’œufs.',it:'Tocca ogni scatola: 10, 20, 30… Poi tocca quante uova sono.',es:'Toca cada caja: 10, 20, 30… Luego toca cuántos huevos hay.',pt:'Toque em cada caixa: 10, 20, 30… Depois toque em quantos ovos são.',nl:'Tik elke doos aan: 10, 20, 30… Tik daarna op hoeveel eieren.',sv:'Tryck på varje kartong: 10, 20, 30 … Tryck sedan på hur många ägg.',da:'Tryk på hver bakke: 10, 20, 30 … Tryk så på hvor mange æg.',no:'Trykk på hver kartong: 10, 20, 30 … Trykk så på hvor mange egg.',fi:'Napauta jokaista kennoa: 10, 20, 30… Napauta sitten, kuinka monta munaa.'},
    promptPack:   {en:'Pack {n} eggs. Add cartons of ten.',de:'Packe {n} Eier. Füge Zehnerschachteln hinzu.',fr:'Emballe {n} œufs. Ajoute des boîtes de dix.',it:'Impacchetta {n} uova. Aggiungi scatole da dieci.',es:'Empaca {n} huevos. Agrega cajas de diez.',pt:'Embale {n} ovos. Acrescente caixas de dez.',nl:'Pak {n} eieren in. Voeg dozen van tien toe.',sv:'Packa {n} ägg. Lägg till kartonger med tio.',da:'Pak {n} æg. Læg bakker med ti til.',no:'Pakk {n} egg. Legg til kartonger med ti.',fi:'Pakkaa {n} munaa. Lisää kymmenen munan kennoja.'},
    matLabel:     {en:'The shelf of cartons',de:'Das Regal mit den Schachteln',fr:'L’étagère des boîtes',it:'Lo scaffale delle scatole',es:'El estante de las cajas',pt:'A prateleira das caixas',nl:'De plank met eierdozen',sv:'Hyllan med kartonger',da:'Hylden med bakker',no:'Hylla med kartonger',fi:'Kennohylly'},
    railLabel:    {en:'How many eggs?',de:'Wie viele Eier?',fr:'Combien d’œufs ?',it:'Quante uova?',es:'¿Cuántos huevos hay?',pt:'Quantos ovos?',nl:'Hoeveel eieren?',sv:'Hur många ägg?',da:'Hvor mange æg?',no:'Hvor mange egg?',fi:'Kuinka monta munaa?'},
    addCarton:    {en:'Add a carton',de:'Schachtel dazu',fr:'Ajouter une boîte',it:'Aggiungi una scatola',es:'Agregar una caja',pt:'Acrescentar uma caixa',nl:'Doos erbij',sv:'Lägg till kartong',da:'Læg en bakke til',no:'Legg til kartong',fi:'Lisää kenno'},
    takeOff:      {en:'Tap a carton on the shelf to take the last one off.',de:'Tippe eine Schachtel im Regal an, um die letzte wegzunehmen.',fr:'Touche une boîte sur l’étagère pour enlever la dernière.',it:'Tocca una scatola sullo scaffale per togliere l’ultima.',es:'Toca una caja del estante para quitar la última.',pt:'Toque numa caixa da prateleira para tirar a última.',nl:'Tik op een doos op de plank om de laatste weg te halen.',sv:'Tryck på en kartong på hyllan för att ta bort den sista.',da:'Tryk på en bakke på hylden for at tage den sidste af.',no:'Trykk på en kartong på hylla for å ta bort den siste.',fi:'Napauta hyllyn kennoa ottaaksesi viimeisen pois.'},
    again:        {en:'Count again',de:'Noch mal zählen',fr:'Recompter',it:'Conta di nuovo',es:'Contar otra vez',pt:'Contar de novo',nl:'Opnieuw tellen',sv:'Räkna igen',da:'Tæl igen',no:'Tell igjen',fi:'Laske uudelleen'},
    hintUntagged: {en:'Some cartons are not counted yet. Tap every carton once.',de:'Einige Schachteln sind noch nicht gezählt. Tippe jede genau einmal an.',fr:'Il reste des boîtes à compter. Touche chaque boîte une seule fois.',it:'Ci sono ancora scatole da contare. Tocca ogni scatola una volta sola.',es:'Faltan cajas por contar. Toca cada caja una sola vez.',pt:'Ainda faltam caixas. Toque em cada caixa uma só vez.',nl:'Sommige dozen zijn nog niet geteld. Tik elke doos één keer aan.',sv:'Några kartonger är inte räknade än. Tryck en gång på varje.',da:'Nogle bakker er ikke talt endnu. Tryk én gang på hver.',no:'Noen kartonger er ikke telt ennå. Trykk én gang på hver.',fi:'Osa kennoista on vielä laskematta. Napauta jokaista kerran.'},
    hintNoAnswer: {en:'All counted! Now tap how many eggs.',de:'Alle gezählt! Tippe jetzt auf die Zahl der Eier.',fr:'Tout est compté ! Touche maintenant le nombre d’œufs.',it:'Contate tutte! Ora tocca quante uova sono.',es:'¡Todas contadas! Ahora toca cuántos huevos hay.',pt:'Todas contadas! Agora toque em quantos ovos são.',nl:'Allemaal geteld! Tik nu op hoeveel eieren.',sv:'Alla räknade! Tryck nu på hur många ägg.',da:'Alle talt! Tryk nu på hvor mange æg.',no:'Alle telt! Trykk nå på hvor mange egg.',fi:'Kaikki laskettu! Napauta nyt, kuinka monta munaa.'},
    hintOnes:     {en:'Each carton is ten eggs, not one. Count 10, 20, 30…',de:'In jeder Schachtel sind zehn Eier, nicht eins. Zähle 10, 20, 30 …',fr:'Chaque boîte, c’est dix œufs, pas un. Compte 10, 20, 30…',it:'In ogni scatola ci sono dieci uova, non una sola. Conta 10, 20, 30…',es:'Cada caja son diez huevos, no uno. Cuenta 10, 20, 30…',pt:'Cada caixa são dez ovos, não um. Conte 10, 20, 30…',nl:'Elke doos is tien eieren, niet één. Tel 10, 20, 30…',sv:'Varje kartong är tio ägg, inte ett. Räkna 10, 20, 30 …',da:'Hver bakke er ti æg, ikke ét. Tæl 10, 20, 30 …',no:'Hver kartong er ti egg, ikke ett. Tell 10, 20, 30 …',fi:'Jokainen kenno on kymmenen munaa, ei yksi. Laske 10, 20, 30…'},
    hintWrong:    {en:'Look at the last carton. Its number tells how many eggs.',de:'Schau auf die letzte Schachtel. Ihre Zahl sagt, wie viele Eier es sind.',fr:'Regarde la dernière boîte. Son nombre dit combien il y a d’œufs.',it:'Guarda l’ultima scatola. Il suo numero dice quante uova sono.',es:'Mira la última caja. Su número dice cuántos huevos hay.',pt:'Olhe para a última caixa. O número dela diz quantos ovos são.',nl:'Kijk naar de laatste doos. Dat getal zegt hoeveel eieren.',sv:'Titta på den sista kartongen. Talet på den säger hur många ägg det är.',da:'Se på den sidste bakke. Tallet på den siger, hvor mange æg der er.',no:'Se på den siste kartongen. Tallet der sier hvor mange egg.',fi:'Katso viimeistä kennoa. Sen luku kertoo, kuinka monta munaa.'},
    hintShort:    {en:'Not yet. Keep adding and count on: 10, 20, 30…',de:'Noch nicht. Füge weiter hinzu und zähle weiter: 10, 20, 30 …',fr:'Pas encore. Continue à ajouter et à compter : 10, 20, 30…',it:'Non ancora. Continua ad aggiungere e a contare: 10, 20, 30…',es:'Todavía no. Sigue agregando y contando: 10, 20, 30…',pt:'Ainda não. Continue acrescentando e contando: 10, 20, 30…',nl:'Nog niet. Blijf toevoegen en tel door: 10, 20, 30…',sv:'Inte än. Fortsätt lägga till och räkna vidare: 10, 20, 30 …',da:'Ikke endnu. Bliv ved med at lægge til og tæl videre: 10, 20, 30 …',no:'Ikke ennå. Fortsett å legge til og tell videre: 10, 20, 30 …',fi:'Ei vielä. Lisää vielä kennoja ja jatka laskemista: 10, 20, 30…'},
    hintOver:     {en:'Too many eggs. Tap a carton to take one off.',de:'Zu viele Eier. Tippe eine Schachtel an, um eine wegzunehmen.',fr:'Trop d’œufs. Touche une boîte pour en enlever une.',it:'Troppe uova. Tocca una scatola per toglierne una.',es:'Demasiados huevos. Toca una caja para quitar una.',pt:'Ovos demais. Toque numa caixa para tirar uma.',nl:'Te veel eieren. Tik op een doos om er een weg te halen.',sv:'För många ägg. Tryck på en kartong för att ta bort en.',da:'For mange æg. Tryk på en bakke for at tage en af.',no:'For mange egg. Trykk på en kartong for å ta bort en.',fi:'Liikaa munia. Napauta kennoa ottaaksesi yhden pois.'},
    celebrateCount:{en:'Yes — {n} eggs!',de:'Ja – {n} Eier!',fr:'Oui, {n} œufs !',it:'Sì, {n} uova!',es:'¡Sí, {n} huevos!',pt:'Isso, {n} ovos!',nl:'Ja, {n} eieren!',sv:'Ja – {n} ägg!',da:'Ja – {n} æg!',no:'Ja – {n} egg!',fi:'Oikein – {n} munaa!'},
    celebratePack:{en:'Yes — {n} eggs in {k} cartons!',de:'Ja – {n} Eier in {k} Schachteln!',fr:'Oui, {n} œufs dans {k} boîtes !',it:'Sì, {n} uova in {k} scatole!',es:'¡Sí, {n} huevos en {k} cajas!',pt:'Isso, {n} ovos em {k} caixas!',nl:'Ja, {n} eieren in {k} dozen!',sv:'Ja – {n} ägg i {k} kartonger!',da:'Ja – {n} æg i {k} bakker!',no:'Ja – {n} egg i {k} kartonger!',fi:'Oikein – {n} munaa {k} kennossa!'},
    alreadyCounted:{en:'Already counted.',de:'Schon gezählt.',fr:'Déjà comptée.',it:'Già contata.',es:'Ya está contada.',pt:'Já foi contada.',nl:'Al geteld.',sv:'Redan räknad.',da:'Allerede talt.',no:'Allerede telt.',fi:'Jo laskettu.'},
    cartonSr:     {en:'carton of ten eggs',de:'Schachtel mit zehn Eiern',fr:'boîte de dix œufs',it:'scatola da dieci uova',es:'caja de diez huevos',pt:'caixa com dez ovos',nl:'doos met tien eieren',sv:'kartong med tio ägg',da:'bakke med ti æg',no:'kartong med ti egg',fi:'kymmenen munan kenno'},
    counted:      {en:"counted: {k}",de:"gezählt: {k}",fr:"comptée : {k}",it:"contata: {k}",es:"contada: {k}",pt:"contada: {k}",nl:"geteld: {k}",sv:"räknad: {k}",da:"talt: {k}",no:"telt: {k}",fi:"laskettu: {k}"},
    notCounted:   {en:'not counted yet',de:'noch nicht gezählt',fr:'pas encore comptée',it:'non ancora contata',es:'aún sin contar',pt:'ainda não contada',nl:'nog niet geteld',sv:'inte räknad än',da:'ikke talt endnu',no:'ikke telt ennå',fi:'ei vielä laskettu'},
    setRange:     {en:'Numbers',de:'Zahlen',fr:'Nombres',it:'Numeri',es:'Números',pt:'Números',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    range50:      {en:'to 50',de:'bis 50',fr:'jusqu’à 50',it:'fino a 50',es:'hasta 50',pt:'até 50',nl:'t/m 50',sv:'till 50',da:'til 50',no:'til 50',fi:'50:een asti'},
    range100:     {en:'to 100',de:'bis 100',fr:'jusqu’à 100',it:'fino a 100',es:'hasta 100',pt:'até 100',nl:'t/m 100',sv:'till 100',da:'til 100',no:'til 100',fi:'100:aan asti'},
    setKind:      {en:'Rounds',de:'Aufgaben',fr:'Manches',it:'Round',es:'Rondas',pt:'Rodadas',nl:'Rondes',sv:'Omgångar',da:'Runder',no:'Runder',fi:'Kierrokset'},
    kindBoth:     {en:'Count and pack',de:'Zählen und packen',fr:'Compter et emballer',it:'Contare e impacchettare',es:'Contar y empacar',pt:'Contar e embalar',nl:'Tellen en inpakken',sv:'Räkna och packa',da:'Tæl og pak',no:'Tell og pakk',fi:'Laske ja pakkaa'},
    kindCount:    {en:'Count the shelf',de:'Regal zählen',fr:'Compter l’étagère',it:'Contare lo scaffale',es:'Contar el estante',pt:'Contar a prateleira',nl:'De plank tellen',sv:'Räkna hyllan',da:'Tæl hylden',no:'Tell hylla',fi:'Laske hyllyn kennot'},
    kindPack:     {en:'Pack the shelf',de:'Regal packen',fr:'Emballer',it:'Impacchettare',es:'Empacar',pt:'Embalar',nl:'De plank inpakken',sv:'Packa hyllan',da:'Pak hylden',no:'Pakk hylla',fi:'Pakkaa hylly'}
  },

  defaults: { range: '100', kind: 'both' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: '50', labelKey: 'range50' }, { value: '100', labelKey: 'range100' }] },
    { key: 'kind', type: 'choice', labelKey: 'setKind', options: [{ value: 'both', labelKey: 'kindBoth' }, { value: 'count', labelKey: 'kindCount' }, { value: 'pack', labelKey: 'kindPack' }] }
  ],

  init: function (api) {
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = ''; this._order = null; this._curPass = 0;
    this._ro = null;
    injectEggCartonsCSS();
  },
  destroy: function () { if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    this._pool = null; this._order = null;
    if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
  },

  /* ---------------- rounds ---------------- */
  _matWidth: function () { var s = this.api && this.api.stage; var w = s ? s.clientWidth : 0; return w > 160 ? w : 560; },
  _maxTens: function () { return (this.api && this.api.settings && this.api.settings.range === '50') ? 5 : 10; },
  _ensurePool: function () {
    var kind = (this.api && this.api.settings && this.api.settings.kind) || 'both';
    var key = kind + ':' + this._maxTens();
    if (this._pool && this._poolKey === key) return this._pool;
    this._pool = EggCartonsCore.rounds(this._maxTens(), kind, 'ec');
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
    var round = { kind: r.kind, tens: r.tens, seed: r.seed + ':' + index };
    return {
      id: 'egg-cartons.' + r.kind + '.' + r.tens,
      promptKey: r.kind === 'pack' ? 'promptPack' : 'promptCount',
      promptArgs: { n: 10 * r.tens, k: r.tens },
      celebrateKey: r.kind === 'pack' ? 'celebratePack' : 'celebrateCount',
      answerType: 'state',
      setup: function (tool) { tool.st = EggCartonsCore.newState(round); },
      check: function (tool) { var ok = EggCartonsCore.verdict(tool.st) === 'ok'; if (ok) tool._celebrate(); return ok; },
      hintKey: function (tool) {
        var v = EggCartonsCore.verdict(tool.st);
        tool._showSlip(v);
        return { untagged: 'hintUntagged', noAnswer: 'hintNoAnswer', ones: 'hintOnes', wrong: 'hintWrong', short: 'hintShort', over: 'hintOver' }[v] || 'hintWrong';
      }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = EggCartonsCore.newState({ kind: 'count', tens: 3, seed: 'boot' });
    var st = this.st, W = this._matWidth();
    var wrap = api.el('div', 'ec-wrap');
    this._wrap = wrap;

    /* ---- the shelf ---- */
    var mat = api.el('div', 'ec-mat');
    mat.setAttribute('role', 'group');
    mat.setAttribute('aria-label', t('matLabel'));
    this._mat = mat;
    this._cartons = [];
    var shown = st.kind === 'pack' ? st.packed : st.tens;
    for (var i = 0; i < shown; i++) mat.appendChild(this._makeCarton(i));
    if (st.kind === 'pack' && shown === 0) mat.classList.add('ec-empty');
    wrap.appendChild(mat);

    if (st.kind === 'count') {
      /* ---- the rail: 10 … max ---- */
      var rail = api.el('div', 'ec-rail');
      var railLabel = api.el('div', 'ec-rail-label');
      railLabel.textContent = t('railLabel');
      if (W >= 330) rail.appendChild(railLabel);
      var nums = api.el('div', 'ec-nums');
      nums.setAttribute('role', 'group');
      nums.setAttribute('aria-label', t('railLabel'));
      this._nums = [];
      var max = this._maxTens();
      var oneRowW = max * 44 + (max - 1) * 4;
      var perRow = (max > 5 && W < oneRowW) ? 5 : max;
      var chip = Math.max(44, Math.min(56, Math.floor((W - (perRow - 1) * 4) / perRow)));
      nums.style.setProperty('--ec-chip', chip + 'px');
      var rowEl = null;
      for (var v = 1, c = 0; v <= max; v++, c++) {
        if (c % perRow === 0) { rowEl = api.el('div', 'ec-numrow'); nums.appendChild(rowEl); }
        var nb = api.el('button', 'ec-num');
        nb.type = 'button';
        nb.textContent = String(10 * v);
        nb.dataset.v = String(10 * v);
        nb.setAttribute('aria-pressed', String(st.answer === 10 * v));
        nb.addEventListener('click', this._onNum.bind(this, 10 * v));
        rowEl.appendChild(nb);
        this._nums.push(nb);
      }
      rail.appendChild(nums);
      this._rail = rail;
      wrap.appendChild(rail);

      var tools = api.el('div', 'ec-tools');
      var again = api.el('button', 'ec-tool ec-again');
      again.type = 'button'; again.textContent = t('again');
      again.addEventListener('click', this._countAgain.bind(this));
      tools.appendChild(again);
      if (W >= 330) wrap.appendChild(tools);
    } else {
      /* ---- the crate: add a carton ---- */
      var crate = api.el('div', 'ec-crate');
      var addBtn = api.el('button', 'ec-add');
      addBtn.type = 'button';
      addBtn.innerHTML = cartonSVG(true) + '<span class="ec-add-label">' + escapeHtml(t('addCarton')) + '</span>';
      addBtn.setAttribute('aria-label', t('addCarton'));
      addBtn.addEventListener('click', this._onAdd.bind(this));
      crate.appendChild(addBtn);
      var hint = api.el('div', 'ec-crate-hint');
      hint.textContent = t('takeOff');
      if (W >= 330) crate.appendChild(hint);
      this._addBtn = addBtn;
      wrap.appendChild(crate);
      this._rail = null;
    }

    stage.appendChild(wrap);
    this._layout();
    for (var k = 0; k < this._cartons.length; k++) this._paintLabel(k, false);
    this._watchWidth();
  },

  _makeCarton: function (i) {
    var b = this.api.el('button', 'ec-carton');
    b.type = 'button';
    b.dataset.i = String(i);
    b.innerHTML = cartonSVG(false) + '<span class="ec-tag" aria-hidden="true"></span>';
    b.addEventListener('click', this._onCarton.bind(this, i));
    this._cartons.push(b);
    return b;
  },
  _layout: function () {
    var st = this.st, W = this._matWidth();
    var k = st.kind === 'pack' ? st.packed : st.tens;
    var L = EggCartonsCore.layout(k, W);
    this._L = L;
    this._mat.style.height = L.height + 'px';
    for (var i = 0; i < this._cartons.length; i++) {
      var p = L.points[i], b = this._cartons[i];
      if (!p) continue;
      b.style.left = p.x + 'px'; b.style.top = p.y + 'px';
      b.style.width = L.w + 'px'; b.style.height = L.h + 'px';
    }
    this._labelAll();
  },
  _labelAll: function () {
    var t = this.api.t, st = this.st;
    for (var i = 0; i < this._cartons.length; i++) {
      var v = EggCartonsCore.labelOf(st, i);
      this._cartons[i].setAttribute('aria-label', t('cartonSr') + ', ' + (v !== null ? interp(t('counted'), { k: v }) : t('notCounted')));
    }
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._matWidth();
    this._ro = new ResizeObserver(function () {
      var w = self._matWidth();
      if (Math.abs(w - last) < 24 || !self._mat || !self._mat.isConnected) return;
      if ((w < 330) !== (last < 330) || (w < 520) !== (last < 520)) { last = w; self.render(); return; }
      last = w;
      self._layout();
    });
    this._ro.observe(this.api.stage);
  },

  /* ---------------- interaction ---------------- */
  _onCarton: function (i) {
    var st = this.st, t = this.api.t, b = this._cartons[i];
    if (st.kind === 'pack') {
      if (EggCartonsCore.remove(st)) {
        var gone = this._cartons.pop();
        if (gone && gone.parentNode) gone.parentNode.removeChild(gone);
        if (st.packed === 0) this._mat.classList.add('ec-empty');
        this._layout();
        this.api.sound(330);
        this.api.announce(st.packed ? String(10 * st.packed) : t('promptPack'));
        this.api.track('remove', { packed: st.packed });
      }
      return;
    }
    var res = EggCartonsCore.tag(st, i);
    if (!res.ok) {
      if (res.reason === 'again') { b.classList.remove('ec-wobble'); void b.offsetWidth; b.classList.add('ec-wobble'); this.api.announce(t('alreadyCounted')); }
      return;
    }
    this._paintLabel(i, true);
    this.api.sound(440 + 40 * res.k);
    this._speakNumber(res.total);
    this._labelAll();
    if (EggCartonsCore.allTagged(st)) { this._rail.classList.add('ec-ready'); this.api.announce(t('hintNoAnswer')); }
    else this.api.announce(String(res.total));
    this.api.track('tag', { k: res.k, tens: st.tens });
  },
  _onAdd: function () {
    var st = this.st;
    if (!EggCartonsCore.add(st)) { this._addBtn.classList.remove('ec-wobble'); void this._addBtn.offsetWidth; this._addBtn.classList.add('ec-wobble'); return; }
    this._mat.classList.remove('ec-empty');
    var i = st.packed - 1;
    var b = this._makeCarton(i);
    this._mat.appendChild(b);
    this._layout();
    this._paintLabel(i, true);
    this.api.sound(440 + 40 * st.packed);
    this._speakNumber(10 * st.packed);
    this.api.announce(String(10 * st.packed));
    this.api.track('add', { packed: st.packed });
  },
  _paintLabel: function (i, animate) {
    var b = this._cartons[i]; if (!b) return;
    var v = EggCartonsCore.labelOf(this.st, i);
    var tag = b.querySelector('.ec-tag');
    if (v === null) { b.classList.remove('is-tagged', 'ec-still'); tag.textContent = ''; return; }
    tag.textContent = String(v);
    b.classList.add('is-tagged');
    if (!animate) b.classList.add('ec-still');
    b.classList.remove('ec-missing');
  },
  _onNum: function (v) {
    var st = this.st;
    EggCartonsCore.setAnswer(st, v);
    for (var i = 0; i < this._nums.length; i++) this._nums[i].setAttribute('aria-pressed', String(Number(this._nums[i].dataset.v) === v));
    this._rail.classList.remove('ec-nudge');
    this.api.sound(660);
    this.api.track('answer', { v: v, tens: st.tens });
  },
  _countAgain: function () {
    var st = this.st;
    EggCartonsCore.untagAll(st);
    for (var i = 0; i < this._cartons.length; i++) { this._cartons[i].classList.remove('is-tagged', 'is-last', 'ec-still', 'ec-missing'); this._cartons[i].querySelector('.ec-tag').textContent = ''; }
    if (this._nums) for (var j = 0; j < this._nums.length; j++) this._nums[j].setAttribute('aria-pressed', 'false');
    if (this._rail) this._rail.classList.remove('ec-ready', 'ec-nudge');
    this._labelAll();
    this.api.announce(this.api.t('promptCount'));
    this.api.track('again', { tens: st.tens });
  },
  _showSlip: function (v) {
    var st = this.st;
    if (v === 'untagged') {
      var miss = EggCartonsCore.untagged(st);
      for (var i = 0; i < miss.length; i++) { var b = this._cartons[miss[i]]; if (b) { b.classList.remove('ec-missing'); void b.offsetWidth; b.classList.add('ec-missing'); } }
    } else if (v === 'noAnswer') {
      this._rail.classList.remove('ec-nudge'); void this._rail.offsetWidth; this._rail.classList.add('ec-nudge');
    } else if (v === 'wrong' || v === 'ones') {
      var last = this._cartons[EggCartonsCore.lastTagged(st)];
      if (last) { last.classList.remove('is-last'); void last.offsetWidth; last.classList.add('is-last'); }
    } else if (v === 'short') {
      if (this._addBtn) { this._addBtn.classList.remove('ec-grow'); void this._addBtn.offsetWidth; this._addBtn.classList.add('ec-grow'); }
    } else if (v === 'over') {
      var lastP = this._cartons[this._cartons.length - 1];
      if (lastP) { lastP.classList.remove('ec-missing'); void lastP.offsetWidth; lastP.classList.add('ec-missing'); }
    }
  },
  _celebrate: function () {
    var cs = this._cartons;
    for (var i = 0; i < cs.length; i++) (function (b, d) { setTimeout(function () { b.classList.remove('ec-hop'); void b.offsetWidth; b.classList.add('ec-hop'); }, d); }(cs[i], 60 * i));
  },
  _speakNumber: function (n) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: 1 }); } catch (e) { /* silent */ }
  }
};

function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; }); }
function escapeHtml(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

/* The carton: apparatus geometry only — a cardboard tray with a lip, two rows
   of five egg cells, a small "10" stamp (the ten-frame in egg form). */
function cartonSVG(withPlus) {
  var cells = '';
  for (var r = 0; r < 2; r++) for (var c = 0; c < 5; c++) {
    var cx = 16 + c * 22, cy = 22 + r * 24;
    cells += '<ellipse cx="' + cx + '" cy="' + (cy + 1) + '" rx="9" ry="10.5" fill="#D9B98A" opacity=".55"/>'
          + '<ellipse cx="' + cx + '" cy="' + cy + '" rx="8" ry="10" fill="#FFF7E6" stroke="#CBA679" stroke-width="1.2"/>'
          + '<ellipse cx="' + (cx - 2.5) + '" cy="' + (cy - 3.5) + '" rx="2.2" ry="3" fill="#fff" opacity=".8"/>';
  }
  return '<svg class="ec-svg" viewBox="0 0 120 72" aria-hidden="true">'
    + '<rect x="2" y="4" width="116" height="64" rx="10" fill="#E8C79C" stroke="#B98E5C" stroke-width="2.5"/>'
    + '<rect x="2" y="4" width="116" height="10" rx="5" fill="#D6AF7E"/>'
    + cells
    + '<rect x="88" y="54" width="26" height="12" rx="6" fill="#146B5E"/>'
    + '<text x="101" y="63.5" text-anchor="middle" font-family="Baloo 2, Nunito, sans-serif" font-weight="700" font-size="10" fill="#fff">10</text>'
    + (withPlus ? '<circle cx="18" cy="56" r="11" fill="#F2784B" stroke="#fff" stroke-width="2.5"/><path d="M18 50v12M12 56h12" stroke="#fff" stroke-width="3" stroke-linecap="round"/>' : '')
    + '</svg>';
}

var ecCssDone = false;
function injectEggCartonsCSS() {
  if (ecCssDone || typeof document === 'undefined') return;
  ecCssDone = true;
  var css = ''
  + '.ec-wrap{width:100%;display:flex;flex-direction:column;align-items:center;gap:8px;}'
  + '.ec-mat{position:relative;width:100%;border-radius:22px;background:#FFFDF8;border:3px solid var(--lcs-structure);'
  + 'box-shadow:inset 0 2px 0 rgba(255,255,255,.8),inset 0 -6px 0 rgba(20,107,94,.08),0 6px 0 rgba(20,107,94,.16),0 10px 22px rgba(20,30,28,.08);}'
  + '.ec-mat.ec-empty{background:repeating-linear-gradient(135deg,#FFFDF8 0 14px,#FBF6EE 14px 16px);}'
  + '.ec-carton{position:absolute;padding:0;margin:0;border:0;background:none;border-radius:12px;cursor:pointer;touch-action:manipulation;transition:transform .12s var(--lcs-ease);-webkit-tap-highlight-color:transparent;}'
  + '.ec-svg{width:100%;height:100%;display:block;pointer-events:none;}'
  + '.ec-carton:hover{transform:translateY(-3px);} .ec-carton:active{transform:scale(.95);}'
  + '.ec-carton:focus-visible,.ec-add:focus-visible{outline:3px solid var(--lcs-focus);outline-offset:2px;}'
  + '.ec-tag{position:absolute;top:-10px;left:-10px;min-width:38px;height:34px;padding:0 8px;border-radius:17px;background:var(--lcs-accent);color:#fff;'
  + 'font-family:var(--lcs-font-display);font-weight:700;font-size:18px;line-height:34px;text-align:center;box-shadow:0 2px 0 #C2603C,0 4px 10px rgba(0,0,0,.18);transform:scale(0);pointer-events:none;}'
  + '.ec-carton.is-tagged .ec-tag{transform:scale(1);animation:ec-drop .34s var(--lcs-ease) 1;}'
  + '.ec-carton.is-tagged.ec-still .ec-tag{animation:none;}'
  + '@keyframes ec-drop{0%{transform:scale(.2) translateY(-18px);}60%{transform:scale(1.18) translateY(2px);}100%{transform:scale(1) translateY(0);}}'
  + '.ec-carton.is-last .ec-tag{box-shadow:0 0 0 4px #fff,0 0 0 8px var(--lcs-structure),0 4px 10px rgba(0,0,0,.18);animation:ec-pulse .8s var(--lcs-ease) 2;}'
  + '@keyframes ec-pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.25);}}'
  + '.ec-wobble{animation:ec-wobble .4s var(--lcs-ease) 1!important;}'
  + '@keyframes ec-wobble{0%,100%{transform:translateX(0);}25%{transform:translateX(-7px) rotate(-3deg);}75%{transform:translateX(7px) rotate(3deg);}}'
  + '.ec-missing{animation:ec-grow 1s var(--lcs-ease) 2;}'
  + '.ec-add.ec-grow{animation:ec-grow 1s var(--lcs-ease) 2;}'
  + '@keyframes ec-grow{50%{transform:scale(1.12);}}'
  + '.ec-carton.ec-hop{animation:ec-hop .55s var(--lcs-ease) 1;}'
  + '@keyframes ec-hop{0%{transform:none;}30%{transform:translateY(-14px) scale(1.05,.95);}60%{transform:translateY(0) scale(.97,1.03);}100%{transform:none;}}'
  /* rail */
  + '.ec-rail{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
  + '.ec-rail-label{font-family:var(--lcs-font-body);font-weight:700;font-size:15px;color:var(--lcs-ink-soft);}'
  + '.ec-nums{display:flex;flex-direction:column;align-items:center;gap:6px;--ec-chip:50px;}'
  + '.ec-numrow{display:flex;justify-content:center;gap:4px;}'
  + '.ec-num{width:var(--ec-chip);height:var(--ec-chip);padding:0;border-radius:13px;background:var(--lcs-surface);border:2px solid var(--lcs-line);'
  + 'font-family:var(--lcs-font-display);font-weight:700;font-size:calc(var(--ec-chip) * .38);color:var(--lcs-structure);cursor:pointer;touch-action:manipulation;'
  + 'box-shadow:0 2px 0 rgba(20,30,28,.08);transition:transform .12s var(--lcs-ease),background .15s,border-color .15s;}'
  + '.ec-num:hover{background:var(--lcs-structure-soft);border-color:var(--lcs-structure-soft);}'
  + '.ec-num[aria-pressed="true"]{background:var(--lcs-structure);color:#fff;border-color:var(--lcs-structure);transform:translateY(-2px);box-shadow:0 4px 0 #0F564B;}'
  + '.ec-rail.ec-ready .ec-rail-label{color:var(--lcs-structure);}'
  + '.ec-rail.ec-nudge .ec-num{animation:ec-grow .8s var(--lcs-ease) 2;}'
  /* crate */
  + '.ec-crate{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;}'
  + '.ec-add{display:flex;align-items:center;gap:12px;min-height:56px;padding:6px 18px 6px 8px;border-radius:999px;border:2px solid var(--lcs-structure-soft);background:var(--lcs-surface);'
  + 'font-family:var(--lcs-font-body);font-weight:700;font-size:16px;color:var(--lcs-structure);cursor:pointer;touch-action:manipulation;box-shadow:0 3px 0 rgba(20,30,28,.10);transition:transform .12s var(--lcs-ease),background .15s;}'
  + '.ec-add .ec-svg{width:70px;height:42px;}'
  + '.ec-add:hover{background:var(--lcs-structure-soft);transform:translateY(-2px);} .ec-add:active{transform:translateY(1px);}'
  + '.ec-crate-hint{font-family:var(--lcs-font-body);font-size:14px;color:var(--lcs-ink-soft);text-align:center;}'
  /* free move */
  + '.ec-tools{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}'
  + '.ec-tool{min-height:44px;padding:0 16px;border-radius:999px;border:2px solid var(--lcs-structure-soft);background:var(--lcs-surface);font-family:var(--lcs-font-body);font-weight:700;font-size:15px;color:var(--lcs-structure);cursor:pointer;touch-action:manipulation;}'
  + '.ec-tool:hover{background:var(--lcs-structure-soft);}'
  + '@media (prefers-reduced-motion:reduce){.ec-carton,.ec-tag,.ec-num,.ec-add{animation:none!important;transition:none!important;}}';
  var style = document.createElement('style');
  style.id = 'ec-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = EggCartonsActivity;
if (typeof window !== 'undefined') window.EggCartonsActivity = EggCartonsActivity;
