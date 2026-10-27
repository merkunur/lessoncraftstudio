/* =====================================================================
   accordion-activity.js — ACTIVITY #139 of the one-by-one rebuild:
   "Equal Groups" → THE ACCORDION SENTENCE (2.OA.C.4; all 11 locales).
   Model: accordion-core.js (AccordionCore).
   Design: docs/activities-rebuild/designs/139-array.md
   ---------------------------------------------------------------------
   The invention: the repeated-addition sentence is printed on an
   accordion — one pleat per group, each pleat as tall as its group.
   Squeeze it: equal pleats fold flat into one panel that reads as the
   multiplication; an unequal strip springs back open and its odd pleat
   stands out. Level 1 fills empty trays for "Make 3 groups of 4"; Level 2
   delivers the trays (one may be off by one) and asks the running totals;
   Level 3 (trays and arrays) asks the times sentence. A times book in the
   corner gains a page for every fair fold. No timer, no score.
   Test seams: window.AccordionActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._add / ._remove /
   ._squeeze / ._focus / ._type / ._del / ._check / .FAST / .OK_MS.
   ===================================================================== */
var AccordionActivity = {
  id: 'accordion',
  /* the drawn apparatus (the hierarchy gate): the felt board, the trays, the strip, the book */
  apparatusClasses: ['ac-art'],
  /*STRINGS-BEGIN*/strings: {
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    title: {"en":"Equal Groups","de":"Gleich große Gruppen","fr":"Groupes égaux","es":"Grupos iguales","pt":"Grupos iguais","it":"Gruppi uguali","nl":"Gelijke groepen","sv":"Lika stora grupper","da":"Lige store grupper","no":"Like store grupper","fi":"Yhtä suuret ryhmät"},
    instruction: {"en":"Put the same number in every group, then squeeze the sentence.","de":"Füll die Gruppen gleich voll und drück dann den Satz zusammen.","fr":"Remplis les groupes de la même façon, puis serre la phrase.","es":"Pon la misma cantidad en cada grupo y luego aprieta la frase.","pt":"Encha os grupos igualzinho e depois aperte a frase.","it":"Riempi i gruppi allo stesso modo, poi schiaccia la frase.","nl":"Vul de groepen even vol en druk dan de zin in elkaar.","sv":"Fyll grupperna lika mycket och tryck sedan ihop meningen.","da":"Fyld grupperne lige meget, og tryk så sætningen sammen.","no":"Fyll gruppene likt, og trykk så sammen setningen.","fi":"Täytä ryhmät yhtä täyteen ja purista sitten lause kokoon."},
    pMake: {"en":"Make {groups} groups of {each}.","de":"Bilde {groups} Gruppen mit je {each}.","fr":"Fais {groups} groupes de {each}.","es":"Haz {groups} grupos de {each}.","pt":"Faça {groups} grupos de {each}.","it":"Fai {groups} gruppi da {each}.","nl":"Maak {groups} groepen van {each}.","sv":"Gör {groups} grupper med {each} i varje.","da":"Lav {groups} grupper med {each} i hver.","no":"Lag {groups} grupper med {each} i hver.","fi":"Tee {groups} ryhmää, joissa kussakin on {each}."},
    pAdd: {"en":"Add up the groups.","de":"Rechne die Gruppen zusammen.","fr":"Additionne les groupes.","es":"Suma los grupos.","pt":"Some os grupos.","it":"Somma i gruppi.","nl":"Tel de groepen bij elkaar op.","sv":"Lägg ihop grupperna.","da":"Læg grupperne sammen.","no":"Legg sammen gruppene.","fi":"Laske ryhmät yhteen."},
    pFix: {"en":"One group has a different number. Make them all the same.","de":"Eine Gruppe hat eine andere Anzahl. Mach alle gleich.","fr":"Un groupe n’en a pas autant que les autres. Rends-les tous pareils.","es":"Un grupo tiene una cantidad diferente. Haz que todos tengan lo mismo.","pt":"Um grupo tem uma quantidade diferente. Deixe todos iguais.","it":"Un gruppo ne ha un numero diverso. Rendili tutti uguali.","nl":"Eén groep heeft een ander aantal. Maak ze allemaal gelijk.","sv":"En grupp har ett annat antal. Gör alla lika stora.","da":"Én gruppe har et andet antal. Gør dem alle lige store.","no":"Én gruppe har et annet antall. Gjør alle like store.","fi":"Yhdessä ryhmässä on eri määrä. Tee kaikista yhtä suuret."},
    pTimes: {"en":"How many in all? Write the times sentence.","de":"Wie viele sind es insgesamt? Schreib die Malaufgabe.","fr":"Combien en tout ? Écris la multiplication.","es":"¿Cuántos hay en total? Escribe la multiplicación.","pt":"Quantos há no total? Escreva a multiplicação.","it":"Quanti sono in tutto? Scrivi la moltiplicazione.","nl":"Hoeveel zijn het er samen? Schrijf de keersom.","sv":"Hur många är det sammanlagt? Skriv multiplikationen.","da":"Hvor mange er der i alt? Skriv gangestykket.","no":"Hvor mange er det til sammen? Skriv gangestykket.","fi":"Montako niitä on yhteensä? Kirjoita kertolasku."},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Comprobar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kolla","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setLevel: {"en":"Level","de":"Stufe","fr":"Niveau","es":"Nivel","pt":"Nível","it":"Livello","nl":"Niveau","sv":"Nivå","da":"Niveau","no":"Nivå","fi":"Taso"},
    lv1: {"en":"Fill and add","de":"Füllen und rechnen","fr":"Remplir et additionner","es":"Llenar y sumar","pt":"Encher e somar","it":"Riempi e somma","nl":"Vullen en optellen","sv":"Fyll och addera","da":"Fyld og læg sammen","no":"Fyll og legg sammen","fi":"Täytä ja laske"},
    lv2: {"en":"Easy groups","de":"Leichte Gruppen","fr":"Groupes faciles","es":"Grupos fáciles","pt":"Grupos fáceis","it":"Gruppi facili","nl":"Makkelijke groepen","sv":"Enkla grupper","da":"Lette grupper","no":"Lette grupper","fi":"Helpot ryhmät"},
    lv3: {"en":"Tricky groups and arrays","de":"Knifflige Gruppen und Punktefelder","fr":"Groupes difficiles et dispositions rectangulaires","es":"Grupos difíciles y arreglos","pt":"Grupos difíceis e disposições retangulares","it":"Gruppi difficili e schieramenti","nl":"Lastige groepen en rechthoeken","sv":"Kluriga grupper och rektanglar","da":"Svære grupper og rektangler","no":"Vanskelige grupper og rektangler","fi":"Vaikeat ryhmät ja suorakulmiot"},
    setRun: {"en":"Running totals","de":"Zwischensummen","fr":"Totaux intermédiaires","es":"Totales parciales","pt":"Totais parciais","it":"Totali parziali","nl":"Tussentotalen","sv":"Delsummor","da":"Delsummer","no":"Delsummer","fi":"Välisummat"},
    rShown: {"en":"Shown","de":"Sichtbar","fr":"Affichés","es":"Visibles","pt":"Visíveis","it":"Visibili","nl":"Zichtbaar","sv":"Visas","da":"Synlige","no":"Vises","fi":"Näkyvissä"},
    rHidden: {"en":"Hidden","de":"Versteckt","fr":"Cachés","es":"Ocultos","pt":"Escondidos","it":"Nascosti","nl":"Verborgen","sv":"Dolda","da":"Skjulte","no":"Skjult","fi":"Piilossa"},
    hEmpty: {"en":"Put beads in the groups first.","de":"Leg zuerst Perlen in die Gruppen.","fr":"Mets d’abord des perles dans les groupes.","es":"Primero pon cuentas en los grupos.","pt":"Primeiro coloque miçangas nos grupos.","it":"Prima metti delle perline nei gruppi.","nl":"Leg eerst kralen in de groepen.","sv":"Lägg pärlor i grupperna först.","da":"Læg perler i grupperne først.","no":"Legg perler i gruppene først.","fi":"Laita ensin helmiä ryhmiin."},
    hTotal: {"en":"Type how many in all.","de":"Tippe ein, wie viele es insgesamt sind.","fr":"Tape combien il y en a en tout.","es":"Escribe cuántos hay en total.","pt":"Digite quantos há no total.","it":"Scrivi quanti sono in tutto.","nl":"Typ hoeveel het er samen zijn.","sv":"Skriv hur många det är sammanlagt.","da":"Skriv, hvor mange der er i alt.","no":"Skriv hvor mange det er til sammen.","fi":"Kirjoita, montako niitä on yhteensä."},
    hWindows: {"en":"Type the total after each group.","de":"Tippe die Summe nach jeder Gruppe ein.","fr":"Tape le total après chaque groupe.","es":"Escribe el total después de cada grupo.","pt":"Digite o total depois de cada grupo.","it":"Scrivi il totale dopo ogni gruppo.","nl":"Typ het totaal na elke groep.","sv":"Skriv summan efter varje grupp.","da":"Skriv summen efter hver gruppe.","no":"Skriv summen etter hver gruppe.","fi":"Kirjoita summa jokaisen ryhmän jälkeen."},
    hSentence: {"en":"Write the times sentence.","de":"Schreib die Malaufgabe.","fr":"Écris la multiplication.","es":"Escribe la multiplicación.","pt":"Escreva a multiplicação.","it":"Scrivi la moltiplicazione.","nl":"Schrijf de keersom.","sv":"Skriv multiplikationen.","da":"Skriv gangestykket.","no":"Skriv gangestykket.","fi":"Kirjoita kertolasku."},
    missUnequal: {"en":"One group is different. Make every group the same, then squeeze.","de":"Eine Gruppe ist anders. Mach alle Gruppen gleich und drück dann zusammen.","fr":"Un groupe est différent. Rends tous les groupes pareils, puis serre.","es":"Un grupo es diferente. Haz todos los grupos iguales y luego aprieta.","pt":"Um grupo está diferente. Deixe todos os grupos iguais e depois aperte.","it":"Un gruppo è diverso. Rendi tutti i gruppi uguali, poi schiaccia.","nl":"Eén groep is anders. Maak alle groepen gelijk en druk dan in elkaar.","sv":"En grupp är annorlunda. Gör alla grupper lika och tryck sedan ihop.","da":"Én gruppe er anderledes. Gør alle grupper ens, og tryk så sammen.","no":"Én gruppe er annerledes. Gjør alle gruppene like, og trykk så sammen.","fi":"Yksi ryhmä on erilainen. Tee kaikista ryhmistä samanlaisia ja purista sitten."},
    missWrongSize: {"en":"Equal groups! But each group needs {each}.","de":"Gleich große Gruppen! Aber in jede Gruppe gehören {each}.","fr":"Des groupes égaux ! Mais chaque groupe doit en avoir {each}.","es":"¡Grupos iguales! Pero cada grupo necesita {each}.","pt":"Grupos iguais! Mas cada grupo precisa ter {each}.","it":"Gruppi uguali! Ma ogni gruppo deve averne {each}.","nl":"Gelijke groepen! Maar in elke groep horen er {each}.","sv":"Lika stora grupper! Men varje grupp ska ha {each}.","da":"Lige store grupper! Men hver gruppe skal have {each}.","no":"Like store grupper! Men hver gruppe skal ha {each}.","fi":"Yhtä suuret ryhmät! Mutta jokaisessa ryhmässä pitää olla {each}."},
    missRun: {"en":"Add one more group of {each} to {previous}.","de":"Rechne zu {previous} noch eine Gruppe mit {each} dazu.","fr":"Ajoute encore un groupe de {each} à {previous}.","es":"Suma otro grupo de {each} a {previous}.","pt":"Some mais um grupo de {each} a {previous}.","it":"Aggiungi a {previous} un altro gruppo da {each}.","nl":"Tel bij {previous} nog een groep van {each} op.","sv":"Lägg en grupp med {each} till på {previous}.","da":"Læg en gruppe mere med {each} til {previous}.","no":"Legg en gruppe med {each} til på {previous}.","fi":"Lisää lukuun {previous} vielä yksi ryhmä, jossa on {each}."},
    missRunFirst: {"en":"Count the beads in the first group.","de":"Zähl die Perlen in der ersten Gruppe.","fr":"Compte les perles du premier groupe.","es":"Fíjate cuántas cuentas hay en el primer grupo.","pt":"Conte as miçangas do primeiro grupo.","it":"Conta le perline del primo gruppo.","nl":"Tel de kralen in de eerste groep.","sv":"Räkna pärlorna i den första gruppen.","da":"Tæl perlerne i den første gruppe.","no":"Tell perlene i den første gruppen.","fi":"Laske ensimmäisen ryhmän helmet."},
    missTotal: {"en":"Count by {each}s: one jump for each group.","de":"Zähl in {each}er-Schritten: ein Sprung für jede Gruppe.","fr":"Compte de {each} en {each} : un bond pour chaque groupe.","es":"Cuenta de {each} en {each}: un salto por cada grupo.","pt":"Conte de {each} em {each}: um pulo para cada grupo.","it":"Conta di {each} in {each}: un salto per ogni gruppo.","nl":"Tel met sprongen van {each}: één sprong voor elke groep.","sv":"Räkna med {each} i taget: ett hopp för varje grupp.","da":"Tæl med {each} ad gangen: ét hop for hver gruppe.","no":"Tell med {each} om gangen: ett hopp for hver gruppe.","fi":"Laske {each} kerrallaan: yksi hyppy jokaista ryhmää kohti."},
    missSentence: {"en":"How many groups? How many in each?","de":"Wie viele Gruppen? Wie viele in jeder?","fr":"Combien de groupes ? Combien dans chacun ?","es":"¿Cuántos grupos? ¿Cuántos en cada uno?","pt":"Quantos grupos? Quantos em cada um?","it":"Quanti gruppi? Quanti in ognuno?","nl":"Hoeveel groepen? Hoeveel in elke groep?","sv":"Hur många grupper? Hur många i varje?","da":"Hvor mange grupper? Hvor mange i hver?","no":"Hvor mange grupper? Hvor mange i hver?","fi":"Montako ryhmää? Montako kussakin?"},
    miss2Row: {"en":"Look at the row: every group needs {each}.","de":"Schau dir die Reihe an: In jede Gruppe gehören {each}.","fr":"Regarde la rangée : chaque groupe doit en avoir {each}.","es":"Mira la fila: cada grupo necesita {each}.","pt":"Olhe a fileira: cada grupo precisa ter {each}.","it":"Guarda la fila: ogni gruppo deve averne {each}.","nl":"Kijk naar de rij: in elke groep horen er {each}.","sv":"Titta på raden: varje grupp ska ha {each}.","da":"Se på rækken: hver gruppe skal have {each}.","no":"Se på raden: hver gruppe skal ha {each}.","fi":"Katso riviä: jokaisessa ryhmässä pitää olla {each}."},
    miss2Total: {"en":"Look at the row: count on by {each} for each group.","de":"Schau dir die Reihe an: Zähl für jede Gruppe {each} weiter.","fr":"Regarde la rangée : avance de {each} pour chaque groupe.","es":"Mira la fila: sigue contando {each} por cada grupo.","pt":"Olhe a fileira: conte mais {each} para cada grupo.","it":"Guarda la fila: vai avanti di {each} per ogni gruppo.","nl":"Kijk naar de rij: tel voor elke groep {each} verder.","sv":"Titta på raden: räkna vidare {each} för varje grupp.","da":"Se på rækken: tæl {each} videre for hver gruppe.","no":"Se på raden: tell {each} videre for hver gruppe.","fi":"Katso riviä: laske {each} eteenpäin jokaista ryhmää kohti."},
    okGroups: {"en":"{sum} = {total}. That is {groups} groups of {each}: {groups} × {each} = {total}!","de":"{sum} = {total}. Das sind {groups} Gruppen mit je {each}: {groups} · {each} = {total}!","fr":"{sum} = {total}. Ce sont {groups} groupes de {each} : {groups} × {each} = {total} !","es":"{sum} = {total}. Son {groups} grupos de {each}: ¡{groups} × {each} = {total}!","pt":"{sum} = {total}. São {groups} grupos de {each}: {groups} × {each} = {total}!","it":"{sum} = {total}. Sono {groups} gruppi da {each}: {groups} × {each} = {total}!","nl":"{sum} = {total}. Dat zijn {groups} groepen van {each}: {groups} × {each} = {total}!","sv":"{sum} = {total}. Det är {groups} grupper med {each} i varje: {groups} · {each} = {total}!","da":"{sum} = {total}. Det er {groups} grupper med {each} i hver: {groups} · {each} = {total}!","no":"{sum} = {total}. Det er {groups} grupper med {each} i hver: {groups} · {each} = {total}!","fi":"{sum} = {total}. Siinä on {groups} ryhmää, joissa kussakin on {each}: {groups} · {each} = {total}!"},
    okRows: {"en":"{sum} = {total}. {rows} rows of {cols}: {rows} × {cols} = {total}!","de":"{sum} = {total}. {rows} Reihen mit je {cols}: {rows} · {cols} = {total}!","fr":"{sum} = {total}. {rows} rangées de {cols} : {rows} × {cols} = {total} !","es":"{sum} = {total}. {rows} filas de {cols}: ¡{rows} × {cols} = {total}!","pt":"{sum} = {total}. {rows} fileiras de {cols}: {rows} × {cols} = {total}!","it":"{sum} = {total}. {rows} righe da {cols}: {rows} × {cols} = {total}!","nl":"{sum} = {total}. {rows} rijen van {cols}: {rows} × {cols} = {total}!","sv":"{sum} = {total}. {rows} rader med {cols} i varje: {rows} · {cols} = {total}!","da":"{sum} = {total}. {rows} rækker med {cols} i hver: {rows} · {cols} = {total}!","no":"{sum} = {total}. {rows} rader med {cols} i hver: {rows} · {cols} = {total}!","fi":"{sum} = {total}. {rows} riviä, joissa kussakin {cols}: {rows} · {cols} = {total}!"},
    lblTotal: {"en":"How many in all?","de":"Wie viele insgesamt?","fr":"Combien en tout ?","es":"¿Cuántos en total?","pt":"Quantos no total?","it":"Quanti in tutto?","nl":"Hoeveel samen?","sv":"Hur många sammanlagt?","da":"Hvor mange i alt?","no":"Hvor mange til sammen?","fi":"Montako yhteensä?"},
    aTray: {"en":"Group {i}: {n}. Tap to add a bead, hold to take one out.","de":"Gruppe {i}: {n}. Tippe, um eine Perle dazuzulegen, halte gedrückt, um eine herauszunehmen.","fr":"Groupe {i} : {n}. Touche pour ajouter une perle, garde le doigt appuyé pour en retirer une.","es":"Grupo {i}: {n}. Toca para poner una cuenta, mantén presionado para quitar una.","pt":"Grupo {i}: {n}. Toque para pôr uma miçanga, segure para tirar uma.","it":"Gruppo {i}: {n}. Tocca per aggiungere una perlina, tieni premuto per toglierne una.","nl":"Groep {i}: {n}. Tik om een kraal toe te voegen, houd vast om er een weg te halen.","sv":"Grupp {i}: {n}. Tryck för att lägga i en pärla, håll inne för att ta ut en.","da":"Gruppe {i}: {n}. Tryk for at lægge en perle i, hold nede for at tage en ud.","no":"Gruppe {i}: {n}. Trykk for å legge i en perle, hold inne for å ta ut en.","fi":"Ryhmä {i}: {n}. Napauta lisätäksesi helmen, pidä painettuna ottaaksesi yhden pois."},
    aWindow: {"en":"Total after group {i}","de":"Summe nach Gruppe {i}","fr":"Total après le groupe {i}","es":"Total después del grupo {i}","pt":"Total depois do grupo {i}","it":"Totale dopo il gruppo {i}","nl":"Totaal na groep {i}","sv":"Summa efter grupp {i}","da":"Sum efter gruppe {i}","no":"Sum etter gruppe {i}","fi":"Summa ryhmän {i} jälkeen"},
    aA: {"en":"How many groups","de":"Wie viele Gruppen","fr":"Combien de groupes","es":"Cuántos grupos","pt":"Quantos grupos","it":"Quanti gruppi","nl":"Hoeveel groepen","sv":"Hur många grupper","da":"Hvor mange grupper","no":"Hvor mange grupper","fi":"Montako ryhmää"},
    aB: {"en":"How many in each","de":"Wie viele in jeder","fr":"Combien dans chacun","es":"Cuántos en cada uno","pt":"Quantos em cada um","it":"Quanti in ognuno","nl":"Hoeveel in elke groep","sv":"Hur många i varje","da":"Hvor mange i hver","no":"Hvor mange i hver","fi":"Montako kussakin"},
    aSqueeze: {"en":"Squeeze the sentence","de":"Den Satz zusammendrücken","fr":"Serrer la phrase","es":"Apretar la frase","pt":"Apertar a frase","it":"Schiacciare la frase","nl":"De zin in elkaar drukken","sv":"Tryck ihop meningen","da":"Tryk sætningen sammen","no":"Trykk sammen setningen","fi":"Purista lause kokoon"},
    aBook: {"en":"Times book: {n} pages","de":"Einmaleins-Buch: {n} Seiten","fr":"Livre des multiplications : {n} pages","es":"Libro de multiplicaciones: {n} páginas","pt":"Livro da multiplicação: {n} páginas","it":"Libro delle moltiplicazioni: {n} pagine","nl":"Keersommenboek: {n} bladzijden","sv":"Gångerboken: {n} sidor","da":"Gangebogen: {n} sider","no":"Gangeboka: {n} sider","fi":"Kertolaskukirja: {n} sivua"},
    aDel: {"en":"Delete","de":"Löschen","fr":"Effacer","es":"Borrar","pt":"Apagar","it":"Cancella","nl":"Wissen","sv":"Sudda","da":"Slet","no":"Slett","fi":"Poista"},
  },/*STRINGS-END*/

  defaults: { level: '1', run: 'shown' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: '1', labelKey: 'lv1' }, { value: '2', labelKey: 'lv2' }, { value: '3', labelKey: 'lv3' }] },
    { key: 'run', type: 'choice', labelKey: 'setRun', options: [{ value: 'shown', labelKey: 'rShown' }, { value: 'hidden', labelKey: 'rHidden' }] }
  ],
  OK_MS: 500, FAST: false, SPRING_MS: 650, HOLD_MS: 450,
  COLORS: ['#2E9C88', '#F2784B', '#E9B92E', '#6C8EDB', '#C26FB3', '#5DBB63', '#E0663A', '#4FB3C9', '#9C7BD9'],

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._pages = 0;
    this._timers = []; this._ro = null; this._view = {};
    injectAccordionCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._level()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return AccordionCore.levelOf(this._setting('level')); },
  _run: function () { return AccordionCore.runOf(this._setting('run')); },
  _loc: function () { return String((this.api && this.api.lang) || 'en').slice(0, 2); },
  _times: function () { return /^(de|sv|da|no|fi)$/.test(this._loc()) ? '·' : '×'; },
  _ensurePool: function () {
    var k = this._level();
    if (!this._pool || this._poolKey !== k) { this._pool = AccordionCore.rounds(k); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = AccordionCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._level(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }, p = pass; this._pa = pa;
    return {
      id: 'accordion.' + this._level() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k, p); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function () {
    var st = this.st; if (!st) return '';
    if (st.level === '1') return this._t('pMake', { groups: st.g, each: st.e });
    if (st.level === '3') return this._t('pTimes');
    return st.fix ? this._t('pFix', { each: st.e }) : this._t('pAdd');
  },
  _setPrompt: function () { if (this.st && this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k, pass) {
    this._clearTimers();
    this.st = AccordionCore.newState(this._level(), k, pass || 0);
    var st = this.st; st.focus = st.level === '3' ? 's0' : (AccordionCore.windowsTyped(st, this._run()) ? 'w0' : 'total');
    this._view = { note: '', ok: '', spring: false, pulse: null };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0, 0); this._render2(); this._watchWidth();
  },
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
  _dims: function () { var W = this._width(), B = AccordionCore.band(W); return { W: W, wide: B.wide, cramp: B.cramp }; },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'ac-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="ac-board ac-art"></div><div class="ac-stripbox"></div><p class="ac-note" aria-live="polite"></p><div class="ac-answer"></div><div class="ac-pad"></div><p class="ac-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('keydown', function (e) { self._key_(e); });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _help: function () { var st = this.st; return st.last && st.misses > 0 && !st.done ? st.last.result : null; },
  _paint_: function () {
    var st = this.st, D = this._dims(), v = this._view;
    this._wrap.className = 'ac-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' lv-' + st.level;
    this._paintBoard(D); this._paintStrip(D); this._paintAnswer(D); this._paintPad(D);
    var note = this._qs('.ac-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'ac-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'ac-note is-hint'; }
    else { note.textContent = ''; note.className = 'ac-note'; }
    this._setPrompt();
  },

  /* ---------- the felt board ---------- */
  _beadPos: function (n) {
    var P = { 1: [[0, 0]], 2: [[-.45, 0], [.45, 0]], 3: [[-.45, .35], [.45, .35], [0, -.42]], 4: [[-.4, -.4], [.4, -.4], [-.4, .4], [.4, .4]], 5: [[-.42, -.42], [.42, -.42], [0, 0], [-.42, .42], [.42, .42]], 6: [[-.42, -.5], [.42, -.5], [-.42, 0], [.42, 0], [-.42, .5], [.42, .5]],
      7: [[-.45, -.5], [.45, -.5], [-.45, 0], [.45, 0], [-.45, .5], [.45, .5], [0, 0]], 8: [[-.3, -.6], [.3, -.6], [-.3, -.2], [.3, -.2], [-.3, .2], [.3, .2], [-.3, .6], [.3, .6]],
      9: [[-.48, -.48], [0, -.48], [.48, -.48], [-.48, 0], [0, 0], [.48, 0], [-.48, .48], [0, .48], [.48, .48]], 10: [[-.3, -.68], [.3, -.68], [-.3, -.34], [.3, -.34], [-.3, 0], [.3, 0], [-.3, .34], [.3, .34], [-.3, .68], [.3, .68]] };
    return P[n] || [];
  },
  _traySize: function (D) {
    var st = this.st, perRow = st.g <= (D.wide ? 5 : 4) ? st.g : Math.ceil(st.g / 2), gap = D.wide ? 14 : 8;
    var avail = (D.wide ? Math.min(D.W, 620) : D.W - 8) - 70;
    var s = Math.floor((avail - gap * (perRow - 1)) / perRow), max = D.wide ? 96 : D.cramp ? 60 : 66;
    /* two rows of crease windows on a phone: the trays give up a little height so the keys stay above the fold */
    if (!D.wide && st.g >= 5 && AccordionCore.windowsTyped(st, this._run())) max = Math.min(max, 56);
    return { s: Math.max(48, Math.min(max, s)), perRow: perRow };
  },
  _paintBoard: function (D) {
    var st = this.st, self = this, board = this._qs('.ac-board'), help = this._help(), v = this._view;
    board.innerHTML = '';
    var pot = this.api.el('div', 'ac-pot ac-art'); pot.setAttribute('aria-hidden', 'true');
    pot.innerHTML = '<svg viewBox="0 0 56 64"><rect class="ac-jar" x="8" y="14" width="40" height="44" rx="8"/><rect class="ac-lid" x="6" y="8" width="44" height="10" rx="4"/>' + [[18, 44], [30, 46], [40, 40], [24, 32], [36, 28]].map(function (p, i) { return '<circle class="ac-bead" cx="' + p[0] + '" cy="' + p[1] + '" r="5" fill="' + self.COLORS[i] + '"/>'; }).join('') + '</svg>';
    if (help === 'empty' || (st.last && st.last.result === 'empty')) pot.classList.add('is-wiggle');
    board.appendChild(pot);
    var book = this.api.el('div', 'ac-book ac-art');
    var pages = ''; for (var p = 0; p < Math.min(this._pages, 8); p++) pages += '<line x1="12" x2="40" y1="' + (48 - p * 2.5) + '" y2="' + (48 - p * 2.5) + '"/>';
    book.innerHTML = '<svg viewBox="0 0 52 60" aria-hidden="true"><rect class="ac-cover" x="8" y="6" width="36" height="46" rx="4"/><g class="ac-pages">' + pages + '</g><text x="26" y="34" text-anchor="middle" class="ac-bookx">' + this._times() + '</text></svg>' + '<span class="ac-sr">' + esc(this._t('aBook', { n: this._pages })) + '</span>';
    board.appendChild(book);
    var area = this.api.el('div', 'ac-trays');
    if (st.array) { area.appendChild(this._arrayEl(D)); board.appendChild(area); return; }
    var T = this._traySize(D); area.style.gridTemplateColumns = 'repeat(' + T.perRow + ', ' + T.s + 'px)';
    var oddI = this._oddPleat();
    st.beads.forEach(function (n, i) {
      var r = T.s / 2, beads = '', pos = self._beadPos(n), br = (n <= 6 ? 0.2 : 0.15) * r * 1.0;
      pos.forEach(function (q) { beads += '<circle class="ac-bead" cx="' + (r + q[0] * r * 0.72) + '" cy="' + (r + q[1] * r * 0.72) + '" r="' + br + '" fill="' + self.COLORS[i % 9] + '"/>'; });
      /* miss 2 of a wrong size: ghost beads where beads are missing */
      if (st.help && (help === 'wrongSize' || help === 'unequal') && n < st.e) self._beadPos(st.e).slice(n).forEach(function (q) { beads += '<circle class="ac-ghost" cx="' + (r + q[0] * r * 0.72) + '" cy="' + (r + q[1] * r * 0.72) + '" r="' + br + '"/>'; });
      var extra = st.help && help === 'unequal' && n > st.e;
      var b = self._btn('ac-tray ac-art' + (extra ? ' is-extra' : '') + (help === 'unequal' && i === oddI ? ' is-odd' : ''), 'tray-' + i, self._t('aTray', { i: i + 1, n: n }),
        '<svg viewBox="0 0 ' + T.s + ' ' + T.s + '" aria-hidden="true"><circle class="ac-ring" cx="' + r + '" cy="' + r + '" r="' + (r - 3) + '" style="stroke:' + self.COLORS[i % 9] + '"/>' + beads + '</svg>');
      b.style.width = T.s + 'px'; b.style.height = T.s + 'px';
      b.disabled = st.done;
      self._wireTray(b, i);
      area.appendChild(b);
    });
    board.appendChild(area);
  },
  /* tap adds a bead; a press held for HOLD_MS takes one out (no add) */
  _wireTray: function (b, i) {
    var self = this, timer = null, held = false;
    b.addEventListener('pointerdown', function () { held = false; timer = setTimeout(function () { held = true; self._remove(i); }, self.HOLD_MS); });
    var stop = function () { if (timer) { clearTimeout(timer); timer = null; } };
    b.addEventListener('pointerup', stop); b.addEventListener('pointerleave', stop); b.addEventListener('pointercancel', stop);
    b.addEventListener('click', function () { if (held) { held = false; return; } self._add(i); });
    b.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  },
  _arrayEl: function (D) {
    var st = this.st, self = this, w = D.wide ? 34 : D.cramp ? 22 : 26, r = w * 0.32, W = st.e * w + 16, H = st.g * w + 8, h = '';
    for (var i = 0; i < st.g; i++) {
      h += '<rect class="ac-band" x="2" y="' + (4 + i * w + 2) + '" width="' + (W - 4) + '" height="' + (w - 4) + '" rx="' + (w / 2 - 2) + '" style="fill:' + this.COLORS[i % 9] + '"/>';
      for (var j = 0; j < st.e; j++) h += '<circle class="ac-bead" cx="' + (8 + j * w + w / 2) + '" cy="' + (4 + i * w + w / 2) + '" r="' + r + '" fill="' + this.COLORS[i % 9] + '"/>';
    }
    var d = this.api.el('div', 'ac-array ac-art'); d.setAttribute('aria-hidden', 'true');
    d.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" aria-hidden="true">' + h + '</svg>';
    return d;
  },
  /* the pleat that differs from the others (the odd one out) */
  _oddPleat: function () {
    var b = this.st.beads, cnt = {}; b.forEach(function (x) { cnt[x] = (cnt[x] || 0) + 1; });
    var common = +Object.keys(cnt).sort(function (a, c) { return cnt[c] - cnt[a]; })[0];
    for (var i = 0; i < b.length; i++) if (b[i] !== common) return i;
    return -1;
  },

  /* ---------- the accordion strip ---------- */
  _paintStrip: function (D) {
    var st = this.st, self = this, box = this._qs('.ac-stripbox'), help = this._help(), v = this._view, C = AccordionCore, run = this._run();
    box.innerHTML = '';
    var Wb = Math.min(D.W, D.wide ? 600 : D.W), handleW = 52, Ws = Wb - handleW - 16, g = st.g, pw = Math.max(D.wide ? 46 : 30, Math.floor(Ws / g)), scale = D.wide ? 1 : 0.6;
    /* the strip is as tall as this round can get (one bead over the target, or what the trays hold) */
    var tallest = Math.min(C.MAX, Math.max.apply(null, st.beads.concat([st.e + 1]))), showRun = !st.folded && !st.done && ((run === 'shown' && st.level === '1') || help === 'total');
    var maxH = (24 + 8 * tallest) * scale, Hs = maxH + (showRun || ((st.folded || st.done) && (st.level !== '3' || st.done)) ? 54 : 30), base = maxH + 8, h = '', b = st.beads, rt = C.runningTotals(b), oddI = this._oddPleat(), x0 = 8;
    var folded = st.folded || st.done;
    if (folded) {
      /* the folded panel: one face (how many in each), the pleat edges stacked (how many groups) */
      var ph = (24 + 8 * b[0]) * scale, fw = Math.min(150, pw * 1.6), fx = (Ws - fw) / 2;
      for (var e = g - 1; e >= 0; e--) h += '<rect class="ac-edge" x="' + (fx + e * 4) + '" y="' + (base - ph - e * 3) + '" width="' + fw + '" height="' + ph + '" rx="6" style="fill:' + this.COLORS[e % 9] + '"/>';
      h += '<rect class="ac-face" x="' + fx + '" y="' + (base - ph) + '" width="' + fw + '" height="' + ph + '" rx="6"/>';
      /* the ribbon ties the top of the stack, clear of the face numeral */
      if (st.done) h += '<path class="ac-ribbon" d="M' + (fx - 4) + ' ' + (base - ph + 7) + ' h' + (fw + 8 + g * 4) + '"/>';
      h += '<text class="ac-facenum' + (help === 'wrongSize' || help === 'sentence' ? ' is-pulse' : '') + '" x="' + (fx + fw / 2) + '" y="' + (base - ph / 2 + 10) + '" text-anchor="middle">' + b[0] + '</text>';
      if (help === 'sentence') for (var t2 = 0; t2 < g; t2++) h += '<text class="ac-tick" x="' + (fx + fw + 14 + t2 * 18) + '" y="' + (base - 6) + '">' + (t2 + 1) + '</text>';
      /* Levels 1 and 2 stamp the factors on the fold; Level 3 asks for them, so only after success */
      if (st.level !== '3' || st.done) h += '<text class="ac-times" x="' + (fx + fw / 2) + '" y="' + (base + 30) + '" text-anchor="middle">' + g + ' ' + this._times() + ' ' + b[0] + (st.done ? ' = ' + (g * b[0]) : '') + '</text>';
    } else {
      for (var i = 0; i < g; i++) {
        var hh = (24 + 8 * b[i]) * scale, x = x0 + i * pw, odd = help === 'unequal' && i === oddI;
        h += '<rect class="ac-pleat' + (i % 2 ? ' is-b' : '') + (odd ? (b[i] > b[(i + 1) % g] ? ' is-tall' : ' is-short') : '') + '" x="' + x + '" y="' + (base - hh) + '" width="' + (pw - 2) + '" height="' + hh + '" rx="4"/>';
        h += '<rect class="ac-tab" x="' + x + '" y="' + (base - hh) + '" width="' + (pw - 2) + '" height="6" rx="3" style="fill:' + this.COLORS[i % 9] + '"/>';
        /* never a 0: an empty pleat carries no numeral */
        if (b[i] > 0) h += '<text class="ac-num" x="' + (x + pw / 2 - 1) + '" y="' + (base - hh / 2 + 8) + '" text-anchor="middle">' + b[i] + '</text>';
        if (i) h += '<text class="ac-plus" x="' + x + '" y="' + (base + 18) + '" text-anchor="middle">+</text>';
      }
      /* the running totals on the creases: shown by themselves (Level 1/3), or when a total was missed */
      /* a running total only once every pleat before it holds beads */
      if (showRun) for (var c = 0; c < g - 1; c++) { if (b.slice(0, c + 1).some(function (n) { return n === 0; })) break; h += '<text class="ac-run" x="' + (x0 + (c + 1) * pw) + '" y="' + (base + 40) + '" text-anchor="middle">' + rt[c] + '</text>'; }
    }
    /* miss 2: the beads in one row, grouped, tray colours; ghosts where a bead is missing */
    if (st.help && help) {
      var y = Hs + 18, bx = 8, br = D.wide ? 6 : 4.5, step = br * 2 + 2;
      b.forEach(function (n, gi) {
        var want = Math.max(n, st.e);
        for (var q = 0; q < want; q++) { var cls = q < n ? (q >= st.e ? 'ac-rowbead is-extra' : 'ac-rowbead') : 'ac-ghost'; h += '<circle class="' + cls + '" cx="' + (bx + br) + '" cy="' + y + '" r="' + br + '"' + (q < n && q < st.e ? ' fill="' + self.COLORS[gi % 9] + '"' : '') + '/>'; bx += step; }
        if ((help === 'total' || help === 'run' || help === 'sentence') && gi < g - 1) h += '<text class="ac-rowrun" x="' + (bx - step / 2) + '" y="' + (y + 22) + '" text-anchor="middle">' + rt[gi] + '</text>';
        bx += br * 2;
      });
      Hs += 44;
    }
    var strip = this.api.el('div', 'ac-strip ac-art' + (v.spring ? ' is-spring' : '') + (folded ? ' is-folded' : ''));
    var svgW = Math.max(Ws + 16, g * pw + 24);
    strip.innerHTML = '<svg class="ac-svg ac-art" viewBox="0 0 ' + svgW + ' ' + Hs + '" width="' + svgW + '" height="' + Hs + '" aria-hidden="true">' + h + '</svg>';
    /* typed windows on the creases (Level 2, running totals shown) */
    if (C.windowsTyped(st, run) && !folded) for (var w = 0; w < g - 1; w++) {
      var wb = this._btn('ac-win' + (st.focus === 'w' + w ? ' is-focus' : '') + (help === 'run' && st.last.at === w ? ' is-shake' : ''), 'w' + w, this._t('aWindow', { i: w + 1 }), esc(st.windows[w] || ''));
      var two = pw < 48;
      wb.style.left = (x0 + (w + 1) * pw - 22) + 'px'; wb.style.top = (base + 21 + (two && w % 2 ? 46 : 0)) + 'px';
      (function (n) { wb.addEventListener('click', function () { self._focus('w' + n); }); })(w);
      strip.appendChild(wb);
    }
    var row = this.api.el('div', 'ac-striprow');
    row.appendChild(strip);
    var handle = this._btn('ac-handle ac-art', 'squeeze', this._t('aSqueeze'), '<svg viewBox="0 0 48 48" aria-hidden="true"><rect class="ac-cpl" x="15" y="12" width="5" height="24" rx="1"/><rect class="ac-cpl" x="21.5" y="12" width="5" height="24" rx="1"/><rect class="ac-cpl" x="28" y="12" width="5" height="24" rx="1"/><path class="ac-arrow" d="M2 24 h9 m-4 -4 l4 4 l-4 4 M46 24 h-9 m4 -4 l-4 4 l4 4"/></svg>');
    handle.disabled = st.done;
    handle.addEventListener('click', function () { self._squeeze(); });
    row.appendChild(handle);
    /* exactly room for the windows below the strip (one row, or two when the creases are close) */
    if (C.windowsTyped(st, run) && !folded) strip.style.paddingBottom = Math.max(2, base + 21 + (pw < 48 && g > 2 ? 46 : 0) + 44 + 2 - (6 + Hs)) + 'px';
    box.appendChild(row);
  },

  /* ---------- the answer and the keys ---------- */
  _paintAnswer: function (D) {
    var st = this.st, self = this, ans = this._qs('.ac-answer'); ans.innerHTML = '';
    var box = function (key, label) { var b = self._btn('ac-box' + (st.focus === key && !st.done ? ' is-focus' : '') + (st.done ? ' is-ok' : ''), key, label, esc(key === 'total' ? st.total : st.sentence[+key[1]])); b.disabled = st.done; b.addEventListener('click', function () { self._focus(key); }); return b; };
    if (st.level === '3') {
      ans.appendChild(box('s0', this._t('aA'))); ans.insertAdjacentHTML('beforeend', '<span class="ac-op">' + this._times() + '</span>');
      ans.appendChild(box('s1', this._t('aB'))); ans.insertAdjacentHTML('beforeend', '<span class="ac-op">=</span>');
      ans.appendChild(box('s2', this._t('lblTotal')));
    } else {
      ans.insertAdjacentHTML('beforeend', '<span class="ac-lbl">' + esc(this._t('lblTotal')) + '</span>');
      ans.appendChild(box('total', this._t('lblTotal')));
    }
  },
  _paintPad: function (D) {
    var st = this.st, self = this, pad = this._qs('.ac-pad'); pad.innerHTML = '';
    if (st.done) return;
    var keys = this.api.el('div', 'ac-keys');
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del'].forEach(function (k) {
      var b = self._btn('ac-key' + (k === 'del' ? ' is-del' : ''), 'key-' + k, k === 'del' ? self._t('aDel') : null, k === 'del' ? '⌫' : k);
      b.addEventListener('click', function () { if (k === 'del') self._del(); else self._type(k); });
      keys.appendChild(b);
    });
    var chk = this._btn(D.wide ? 'ac-check' : 'ac-key ac-checkkey', 'check', D.wide ? null : this._t('checkBtn'), D.wide ? esc(this._t('checkBtn')) : '✓');
    chk.addEventListener('click', function () { self._check(); });
    if (D.wide) { pad.appendChild(keys); pad.appendChild(chk); } else { keys.appendChild(chk); pad.appendChild(keys); }
  },

  /* ---------------- the hand ---------------- */
  _clearHelp: function () { this._view.note = ''; this._view.spring = false; },
  _add: function (i) { if (AccordionCore.addBead(this.st, i) === 'no') return; this._clearHelp(); this.api.sound(520 + 30 * this.st.beads[i]); this._paint(); },
  _remove: function (i) { if (AccordionCore.removeBead(this.st, i) === 'no') return; this._clearHelp(); this.api.sound(380); this._paint(); },
  _springBack: function () {
    var v = this._view, self = this; v.spring = true; this.api.sound(200);
    var done = function () { v.spring = false; self._paint(); };
    if (this.FAST) return; this._later(done, this.SPRING_MS);
  },
  _squeeze: function () {
    var res = AccordionCore.squeeze(this.st); if (res === 'no') return;
    this._view.note = '';
    if (res === 'folded') { this.api.sound(660); this._paint(); return; }
    this._springBack(); this._paint();
  },
  _focus: function (k) { if (AccordionCore.focus(this.st, k) === 'no') return; this._paint(); },
  _type: function (d) { if (AccordionCore.type(this.st, d) === 'no') return; this._view.note = ''; this.api.sound(520); this._paint(); },
  _del: function () { if (AccordionCore.del(this.st) === 'no') return; this._view.note = ''; this.api.sound(380); this._paint(); },
  _check: function () {
    var C = AccordionCore, st = this.st, v = this._view;
    var res = C.check(st, this._run()); if (res.result === 'done') return;
    if (res.result === 'ok') { this._success(); return; }
    v.note = this._t(C.hint(st), { each: st.e, previous: res.previous, groups: st.g });
    if (res.result === 'unequal') this._springBack();
    else if (st.misses) this.api.sound(240);
    this._paint(); this.api.announce(v.note);
  },
  _key_: function (e) {
    if (/^[0-9]$/.test(e.key)) { e.preventDefault(); this._type(e.key); return; }
    if (e.key === 'Backspace') { e.preventDefault(); this._del(); return; }
    if (e.key === ' ' && e.target === this._wrap) { e.preventDefault(); this._squeeze(); }
  },
  _success: function () {
    var st = this.st, v = this._view, sum = st.beads.join(' + '), t = st.g * st.e, msg;
    msg = st.array ? this._t('okRows', { sum: sum, total: t, rows: st.g, cols: st.e }) : this._t('okGroups', { sum: sum, total: t, groups: st.g, each: st.e });
    this._pages++;
    v.note = ''; v.ok = msg; v.spring = false;
    if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectAccordionCSS() {
  if (typeof document === 'undefined' || document.getElementById('ac-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.ac-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .ac-wrap:focus{outline:none;}'
  + '.ac-board{position:relative;display:flex;align-items:center;justify-content:center;gap:12px;padding:12px 60px 12px 66px;border-radius:18px;background:#3E7D68;box-shadow:inset 0 0 0 3px #2B5E4E,inset 0 6px 14px rgba(0,0,0,.18);min-height:110px;}'
  + '.ac-pot{position:absolute;left:8px;top:10px;width:48px;height:56px;} .ac-pot svg{display:block;width:100%;height:100%;} .ac-pot.is-wiggle{animation:acWig .45s 2;} @keyframes acWig{25%{transform:rotate(-8deg);}75%{transform:rotate(8deg);}}'
  + '.ac-jar{fill:rgba(255,255,255,.55);stroke:' + INK + ';stroke-width:2.5;} .ac-lid{fill:#B08850;stroke:' + INK + ';stroke-width:2;} .ac-bead{stroke:' + INK + ';stroke-width:1.5;}'
  + '.ac-book{position:absolute;right:8px;top:8px;width:44px;height:52px;} .ac-book svg{display:block;width:100%;height:100%;} .ac-cover{fill:#F4CF62;stroke:' + INK + ';stroke-width:2.5;} .ac-pages line{stroke:#fff;stroke-width:1.6;} .ac-bookx{font-family:' + H + ';font-weight:800;font-size:18px;fill:' + INK + ';}'
  + '.ac-trays{display:grid;gap:10px;justify-content:center;}'
  + '.ac-tray{border:0;padding:0;border-radius:50%;background:radial-gradient(circle at 40% 35%,#F7FBFA,#D7ECE6);box-shadow:0 3px 0 rgba(0,0,0,.25);cursor:pointer;} .ac-tray svg{display:block;width:100%;height:100%;} .ac-tray:disabled{cursor:default;}'
  + '.ac-ring{fill:none;stroke-width:3;} .ac-ghost{fill:none;stroke:#fff;stroke-width:2;stroke-dasharray:3 2;} .ac-tray.is-odd{animation:acWig .45s 2;box-shadow:0 0 0 4px #F2784B,0 3px 0 rgba(0,0,0,.25);}'
  + '.ac-array svg{display:block;} .ac-band{fill-opacity:.28;}'
  /* the strip */
  + '.ac-stripbox{display:flex;justify-content:center;} .ac-striprow{display:flex;align-items:flex-end;gap:8px;max-width:100%;}'
  + '.ac-strip{position:relative;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #E2D5BC;padding:6px 4px 2px;overflow:visible;max-width:100%;} .ac-svg{display:block;max-width:100%;height:auto;}'
  + '.ac-pleat{fill:#FFF8E8;stroke:' + INK + ';stroke-width:1.6;transition:height .12s,y .12s;} .ac-pleat.is-b{fill:#F6ECD6;} .ac-pleat.is-tall{fill:#FBD3C2;stroke:#E0663A;stroke-width:3;} .ac-pleat.is-short{stroke:#E0663A;stroke-width:3;stroke-dasharray:6 4;}'
  + '.ac-num{font-family:' + H + ';font-weight:800;font-size:22px;fill:' + INK + ';} .ac-plus{font-family:' + H + ';font-weight:800;font-size:18px;fill:#6B6478;} .ac-run,.ac-rowrun{font-family:' + H + ';font-weight:800;font-size:16px;fill:#146B5E;} .ac-tick{font-family:' + H + ';font-weight:800;font-size:14px;fill:#E0663A;}'
  + '.ac-edge{stroke:' + INK + ';stroke-width:1.5;} .ac-face{fill:#FFF8E8;stroke:' + INK + ';stroke-width:2;} .ac-facenum{font-family:' + H + ';font-weight:800;font-size:30px;fill:' + INK + ';} .ac-facenum.is-pulse{fill:#E0663A;animation:acPulse 1s ease-in-out infinite;} @keyframes acPulse{50%{opacity:.4;}}'
  + '.ac-times{font-family:' + H + ';font-weight:800;font-size:24px;fill:#146B5E;} .ac-ribbon{stroke:#C26FB3;stroke-width:5;stroke-linecap:round;fill:none;}'
  + '.ac-rowbead{stroke:' + INK + ';stroke-width:1.2;} .ac-rowbead.is-extra{fill:#FBD3C2;stroke:#E0663A;stroke-width:2;}'
  + '.ac-strip.is-spring .ac-svg{animation:acSpring .65s ease-out;} @keyframes acSpring{0%{transform:scaleX(.35);}55%{transform:scaleX(1.06);}100%{transform:scaleX(1);}} .ac-strip.is-spring .ac-svg{transform-origin:left center;}'
  + '.ac-strip.is-folded .ac-svg{animation:acFold .35s ease-out;} @keyframes acFold{from{transform:scaleX(1.4);opacity:.6;}}'
  + '.ac-win{position:absolute;width:44px;height:44px;border:0;border-radius:8px;background:#fff;box-shadow:inset 0 0 0 2px #CDBFA4;font-family:' + H + ';font-weight:800;font-size:18px;color:' + INK + ';cursor:pointer;padding:0;} .ac-win.is-focus{box-shadow:inset 0 0 0 3px #F2784B;} .ac-win.is-shake{animation:acWig .4s 2;box-shadow:inset 0 0 0 3px #E0663A;}'
  + '.ac-handle{flex:0 0 52px;width:52px;height:52px;border:0;border-radius:12px;background:#D9B98A;box-shadow:inset 0 0 0 2px ' + INK + ',0 3px 0 #9C7B4C;cursor:pointer;padding:4px;} .ac-handle svg{display:block;width:100%;height:100%;} .ac-cpl{fill:#FFF8E8;stroke:' + INK + ';stroke-width:1.8;} .ac-arrow{fill:none;stroke:#146B5E;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;} .ac-handle:disabled{opacity:.5;cursor:default;}'
  /* answer + pad */
  + '.ac-answer{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;} .ac-lbl{font-family:' + B + ';font-weight:800;font-size:18px;color:' + INK + ';} .ac-op{font-family:' + H + ';font-weight:800;font-size:28px;color:' + INK + ';}'
  + '.ac-box{width:64px;height:52px;border:0;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 3px #CDBFA4;font-family:' + H + ';font-weight:800;font-size:28px;color:' + INK + ';cursor:pointer;padding:0;} .ac-box.is-focus{box-shadow:inset 0 0 0 3px #F2784B;} .ac-box.is-ok{box-shadow:inset 0 0 0 3px #2E9C88;background:#EAF6F2;}'
  + '.ac-pad{display:flex;flex-direction:column;gap:8px;} .ac-pad:empty{display:none;} .ac-keys{display:flex;justify-content:center;gap:6px;} .ac-key{flex:0 0 52px;height:50px;border:0;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:22px;color:' + INK + ';cursor:pointer;} .ac-key.is-del{background:#FFF1EA;}'
  + '.ac-check{min-height:50px;border:0;border-radius:12px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:21px;cursor:pointer;box-shadow:0 4px 0 #0E4E44;} .ac-checkkey{background:#146B5E;color:#fff;box-shadow:0 3px 0 #0E4E44;font-size:26px;}'
  + '.ac-note{margin:0;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .ac-note:empty{display:none;} .ac-note.is-hint{color:#9A3D1C;} .ac-note.is-ok{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.ac-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones */
  + '.ac-wrap.is-narrow{gap:6px;} .ac-wrap.is-narrow .ac-board{padding:8px 36px 8px 36px;min-height:0;} .ac-wrap.is-narrow .ac-pot{left:8px;top:5px;width:32px;height:37px;} .ac-wrap.is-narrow .ac-book{width:30px;height:36px;top:5px;} .ac-wrap.is-narrow .ac-trays{gap:6px;}'
  + '.ac-wrap.is-narrow .ac-keys{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:4px;} .ac-wrap.is-narrow .ac-key{height:44px;font-size:20px;} .ac-wrap.is-narrow .ac-note{font-size:16px;} .ac-wrap.is-narrow .ac-num{font-size:18px;} .ac-wrap.is-narrow .ac-box{width:56px;height:46px;font-size:24px;} .ac-wrap.is-narrow .ac-lbl{font-size:16px;}'
  + '.ac-wrap.is-narrow .ac-handle{flex-basis:48px;width:48px;height:48px;}'
  + '.ac-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.ac-wrap *{animation:none !important;transition:none !important;}}'
  + '.ac-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'ac-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.AccordionActivity = AccordionActivity;
