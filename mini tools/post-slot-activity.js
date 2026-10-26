/* =====================================================================
   post-slot-activity.js — ACTIVITY #39 of the one-by-one rebuild:
   "Flat or Solid?" → THE LETTERBOX (K.G.A.3; G2 count the faces).
   Design sheet: docs/activities-rebuild/designs/039-choice-board.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: only something flat fits through the letterbox slot. The
   child sorts the mail bag onto the letter tray or the parcel tray; at
   Check each letter turns on its edge at the slot — a flat shape becomes a
   line and slips through, a solid stays thick and jams — and each parcel
   goes to the shelf, where a flat shape topples into a line and slides off.
   In the counting tasks the solid opens out into its flat net, every face
   needs a postmark, and only a fully stamped net with the right number is
   posted through the slot.

   ACTIVITY LAYER ONLY: the model is post-slot-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.PostSlotActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var PostSlotActivity = {
  id: 'post-slot',
  apparatusClasses: ['ps-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:        {en:'The Letterbox',de:'Der Briefkasten',fr:'La boîte aux lettres',es:'El buzón',pt:'A caixa de correio',it:'La cassetta delle lettere',nl:'De brievenbus',sv:'Brevlådan',da:'Postkassen',no:'Postkassen',fi:'Postilaatikko'},
    instruction:  {en:'Sort the mail, or open a solid out flat, then press Check.',de:'Sortiere die Post oder klapp einen Körper flach auf und tippe dann auf Prüfen.',fr:'Trie le courrier ou déplie un solide à plat, puis touche Vérifier.',es:'Clasifica el correo o despliega un cuerpo geométrico y luego toca Revisar.',pt:'Separe a correspondência ou abra um sólido até ficar plano e depois toque em Conferir.',it:'Smista la posta oppure apri un solido fino a renderlo piatto, poi tocca Controlla.',nl:'Sorteer de post of vouw een ruimtefiguur plat open en tik dan op Controleren.',sv:'Sortera posten eller vik ut en kropp platt och tryck sedan på Kontrollera.',da:'Sorter posten, eller fold en rumfigur ud, så den bliver flad, og tryk så på Tjek.',no:'Sorter posten, eller brett ut en romfigur så den blir flat, og trykk så på Sjekk.',fi:'Lajittele posti tai avaa kappale tasoksi ja paina sitten Tarkista.'},
    check:        {en:'Check',de:'Prüfen',fr:'Vérifier',es:'Revisar',pt:'Conferir',it:'Controlla',nl:'Controleren',sv:'Kontrollera',da:'Tjek',no:'Sjekk',fi:'Tarkista'},
    pSort:        {en:'Is it flat or solid? Put it on the letter tray or the parcel tray.',de:'Flache Form oder Körper? Leg sie in die Briefablage oder in die Paketablage.',fr:'Figure plane ou solide ? Pose-la sur le bac à lettres ou sur le bac à colis.',es:'¿Es una figura plana o un cuerpo geométrico? Ponla en la charola de cartas o en la charola de paquetes.',pt:'É uma figura plana ou um sólido? Coloque na bandeja de cartas ou na bandeja de pacotes.',it:'È una figura piana o un solido? Mettila nel vassoio delle lettere o nel vassoio dei pacchi.',nl:'Is het een vlakke figuur of een ruimtefiguur? Leg hem in de brievenbak of in de pakketbak.',sv:'Är den platt eller en kropp? Lägg den i brevfacket eller i paketfacket.',da:'Er den flad, eller er den en rumfigur? Læg den i brevbakken eller i pakkebakken.',no:'Er den flat, eller er den en romfigur? Legg den i brevkurven eller i pakkekurven.',fi:'Onko se litteä tasokuvio vai kappale? Laita se kirjekoriin tai pakettikoriin.'},
    pFaces:       {en:'Open it out flat. Stamp every flat face. How many flat faces?',de:'Klapp ihn flach auf. Stemple jede ebene Fläche. Wie viele ebene Flächen?',fr:'Déplie-le à plat. Tamponne chaque face plane. Combien de faces planes ?',es:'Despliégalo en plano. Sella cada cara plana. ¿Cuántas caras planas tiene?',pt:'Abra até ficar plano. Carimbe cada face plana. Quantas faces planas?',it:'Aprilo fino a renderlo piatto. Timbra ogni faccia piana. Quante facce piane ha?',nl:'Vouw hem plat open. Stempel elk plat vlak. Hoeveel platte vlakken?',sv:'Vik ut den platt. Stämpla varje plan yta. Hur många plana ytor?',da:'Fold den ud, så den bliver flad. Stempl hver plan flade. Hvor mange plane flader?',no:'Brett den ut så den blir flat. Stemple hver plan flate. Hvor mange plane flater?',fi:'Avaa kappale tasoksi. Leimaa jokainen tasainen pinta. Montako tasaista pintaa?'},
    pThings:      {en:'Open its shape out flat. Stamp every flat face. How many flat faces?',de:'Klapp die Form flach auf. Stemple jede ebene Fläche. Wie viele ebene Flächen?',fr:'Déplie sa forme à plat. Tamponne chaque face plane. Combien de faces planes ?',es:'Despliega su forma en plano. Sella cada cara plana. ¿Cuántas caras planas tiene?',pt:'Abra a forma até ficar plana. Carimbe cada face plana. Quantas faces planas?',it:'Apri la sua forma fino a renderla piatta. Timbra ogni faccia piana. Quante facce piane ha?',nl:'Vouw de vorm plat open. Stempel elk plat vlak. Hoeveel platte vlakken?',sv:'Vik ut formen platt. Stämpla varje plan yta. Hur många plana ytor?',da:'Fold formen ud, så den bliver flad. Stempl hver plan flade. Hvor mange plane flader?',no:'Brett ut formen så den blir flat. Stemple hver plan flate. Hvor mange plane flater?',fi:'Avaa esineen muoto tasoksi. Leimaa jokainen tasainen pinta. Montako tasaista pintaa?'},
    hintBag:      {en:'Put every shape on a tray.',de:'Leg jede Form in eine Ablage.',fr:'Pose chaque forme sur un bac.',es:'Pon cada figura en una charola.',pt:'Coloque cada forma numa bandeja.',it:'Metti ogni forma in un vassoio.',nl:'Leg elke vorm in een bak.',sv:'Lägg varje form i ett fack.',da:'Læg hver form i en bakke.',no:'Legg hver form i en kurv.',fi:'Laita jokainen muoto koriin.'},
    hintChip:     {en:'How many? Tap a number.',de:'Wie viele? Tippe auf eine Zahl.',fr:'Combien ? Touche un nombre.',es:'¿Cuántas? Toca un número.',pt:'Quantas? Toque num número.',it:'Quante? Tocca un numero.',nl:'Hoeveel? Tik op een getal.',sv:'Hur många? Tryck på ett tal.',da:'Hvor mange? Tryk på et tal.',no:'Hvor mange? Trykk på et tall.',fi:'Montako? Napauta lukua.'},
    hintTab:      {en:'Pull the tab to open it out flat.',de:'Zieh an der Lasche, dann klappt er flach auf.',fr:'Tire la languette pour le déplier à plat.',es:'Jala la pestaña para desplegarlo en plano.',pt:'Puxe a aba para abrir até ficar plano.',it:'Tira la linguetta per aprirlo fino a renderlo piatto.',nl:'Trek aan het lipje om hem plat open te vouwen.',sv:'Dra i fliken så viks den ut platt.',da:'Træk i fligen, så foldes den ud.',no:'Dra i fliken, så brettes den ut.',fi:'Vedä kielekkeestä, niin se avautuu tasoksi.'},
    hintLine:     {en:'Flat shapes turn into a thin line on their edge. Solids stay thick.',de:'Auf der Kante werden flache Formen zu einem dünnen Strich. Körper bleiben dick.',fr:'Sur la tranche, une figure plane devient un trait fin. Un solide reste épais.',es:'De canto, una figura plana se vuelve una línea delgada. Un cuerpo sigue grueso.',pt:'De lado, uma figura plana vira uma linha fina. Um sólido continua grosso.',it:'Vista di taglio, una figura piana diventa una linea sottile. Un solido resta spesso.',nl:'Op hun kant worden vlakke figuren een dunne lijn. Ruimtefiguren blijven dik.',sv:'På kant blir en platt form ett tunt streck. En kropp är fortfarande tjock.',da:'På højkant bliver en flad figur til en tynd streg. En rumfigur er stadig tyk.',no:'På høykant blir en flat figur en tynn strek. En romfigur er fortsatt tykk.',fi:'Syrjällään litteä tasokuvio on vain ohut viiva. Kappale pysyy paksuna.'},
    hintArrows:   {en:'Follow the arrows.',de:'Folge den Pfeilen.',fr:'Suis les flèches.',es:'Sigue las flechas.',pt:'Siga as setas.',it:'Segui le frecce.',nl:'Volg de pijlen.',sv:'Följ pilarna.',da:'Følg pilene.',no:'Følg pilene.',fi:'Seuraa nuolia.'},
    hintFaces:    {en:'Stamp every flat face — look for the back and the bottom.',de:'Stemple jede ebene Fläche – denk an die Rückseite und an den Boden.',fr:'Tamponne chaque face plane : pense à l’arrière et au dessous.',es:'Sella cada cara plana: busca la de atrás y la de abajo.',pt:'Carimbe cada face plana: procure a de trás e a de baixo.',it:'Timbra ogni faccia piana: cerca quella dietro e quella sotto.',nl:'Stempel elk plat vlak – denk aan de achterkant en de onderkant.',sv:'Stämpla varje plan yta – titta efter baksidan och undersidan.',da:'Stempl hver plan flade – husk bagsiden og bunden.',no:'Stemple hver plan flate – husk baksiden og bunnen.',fi:'Leimaa jokainen tasainen pinta – muista takana ja alla olevat.'},
    hintNumbers:  {en:'Count along with the numbers.',de:'Zähl mit den Zahlen mit.',fr:'Compte avec les nombres.',es:'Cuenta junto con los números.',pt:'Conte junto com os números.',it:'Conta insieme ai numeri.',nl:'Tel mee met de getallen.',sv:'Räkna med talen.',da:'Tæl med tallene.',no:'Tell med tallene.',fi:'Laske numeroiden mukana.'},
    hintCurve:    {en:'The curved side is not a flat face. It takes no stamp.',de:'Die gewölbte Fläche ist keine ebene Fläche. Sie bekommt keinen Stempel.',fr:'La surface courbe n’est pas une face plane. Elle ne reçoit pas de tampon.',es:'La superficie curva no es una cara plana. No lleva sello.',pt:'A superfície curva não é uma face plana. Ela não leva carimbo.',it:'La superficie curva non è una faccia piana. Non riceve il timbro.',nl:'De gebogen kant is geen plat vlak. Die krijgt geen stempel.',sv:'Den böjda ytan är ingen plan yta. Den får ingen stämpel.',da:'Den buede side er ikke en plan flade. Den får ikke et stempel.',no:'Den buede siden er ikke en plan flate. Den får ikke stempel.',fi:'Kaareva vaippa ei ole tasainen pinta. Siihen ei tule leimaa.'},
    okSort:       {en:'Yes — the flat shapes went through the slot!',de:'Ja – die flachen Formen sind durch den Schlitz gerutscht!',fr:'Oui ! Les figures planes sont passées par la fente.',es:'¡Sí! Las figuras planas pasaron por la ranura.',pt:'Isso! As figuras planas passaram pela fenda.',it:'Sì! Le figure piane sono passate dalla fessura.',nl:'Ja! De vlakke figuren gingen door de gleuf.',sv:'Ja – de platta formerna åkte genom springan!',da:'Ja – de flade figurer gled gennem sprækken!',no:'Ja – de flate figurene gled gjennom sprekken!',fi:'Kyllä – litteät kuviot menivät raosta läpi!'},
    okFaces:      {en:'Yes — {n} flat faces! Opened out, it is flat.',de:'Ja – {n} ebene Flächen! Aufgeklappt ist er flach.',fr:'Oui ! {n} faces planes. Déplié, il est tout plat.',es:'¡Sí! {n} caras planas. Desplegado, es plano.',pt:'Isso! {n} faces planas. Aberto, fica plano.',it:'Sì! {n} facce piane. Aperto, è piatto.',nl:'Ja! {n} platte vlakken. Opengevouwen is hij plat.',sv:'Ja – {n} plana ytor! Utvikt är den platt.',da:'Ja – {n} plane flader! Foldet ud er den flad.',no:'Ja – {n} plane flater! Brettet ut er den flat.',fi:'Kyllä – {n} tasaista pintaa! Avattuna se on litteä.'},
    ok_dice:      {en:'Yes — the dice has 6 flat faces, like a cube!',de:'Ja – der Spielwürfel hat 6 ebene Flächen, wie ein Würfel!',fr:'Oui ! Le dé a 6 faces planes, comme un cube.',es:'¡Sí! El dado tiene 6 caras planas, como un cubo.',pt:'Isso! O dado tem 6 faces planas, como um cubo.',it:'Sì! Il dado ha 6 facce piane, come un cubo.',nl:'Ja! De dobbelsteen heeft 6 platte vlakken, net als een kubus.',sv:'Ja – tärningen har 6 plana ytor, precis som en kub!',da:'Ja – spilleterningen har 6 plane flader, ligesom en terning!',no:'Ja – terningen har 6 plane flater, akkurat som en kube!',fi:'Kyllä – nopassa on 6 tasaista pintaa, kuten kuutiossa!'},
    ok_present:   {en:'Yes — the present has 6 flat faces, like a rectangular prism!',de:'Ja – das Geschenk hat 6 ebene Flächen, wie ein Quader!',fr:'Oui ! Le cadeau a 6 faces planes, comme un pavé.',es:'¡Sí! El regalo tiene 6 caras planas, como un prisma rectangular.',pt:'Isso! O presente tem 6 faces planas, como um bloco retangular.',it:'Sì! Il regalo ha 6 facce piane, come un parallelepipedo.',nl:'Ja! Het cadeau heeft 6 platte vlakken, net als een balk.',sv:'Ja – presenten har 6 plana ytor, precis som ett rätblock!',da:'Ja – gaven har 6 plane flader, ligesom en kasse!',no:'Ja – gaven har 6 plane flater, akkurat som et firkantet prisme!',fi:'Kyllä – lahjassa on 6 tasaista pintaa, kuten suorakulmaisessa särmiössä!'},
    ok_book:      {en:'Yes — the book has 6 flat faces, like a rectangular prism!',de:'Ja – das Buch hat 6 ebene Flächen, wie ein Quader!',fr:'Oui ! Le livre a 6 faces planes, comme un pavé.',es:'¡Sí! El libro tiene 6 caras planas, como un prisma rectangular.',pt:'Isso! O livro tem 6 faces planas, como um bloco retangular.',it:'Sì! Il libro ha 6 facce piane, come un parallelepipedo.',nl:'Ja! Het boek heeft 6 platte vlakken, net als een balk.',sv:'Ja – boken har 6 plana ytor, precis som ett rätblock!',da:'Ja – bogen har 6 plane flader, ligesom en kasse!',no:'Ja – boka har 6 plane flater, akkurat som et firkantet prisme!',fi:'Kyllä – kirjassa on 6 tasaista pintaa, kuten suorakulmaisessa särmiössä!'},
    ok_eraser:    {en:'Yes — the eraser has 6 flat faces, like a rectangular prism!',de:'Ja – der Radiergummi hat 6 ebene Flächen, wie ein Quader!',fr:'Oui ! La gomme a 6 faces planes, comme un pavé.',es:'¡Sí! La goma tiene 6 caras planas, como un prisma rectangular.',pt:'Isso! A borracha tem 6 faces planas, como um bloco retangular.',it:'Sì! La gomma ha 6 facce piane, come un parallelepipedo.',nl:'Ja! De gum heeft 6 platte vlakken, net als een balk.',sv:'Ja – suddgummit har 6 plana ytor, precis som ett rätblock!',da:'Ja – viskelæderet har 6 plane flader, ligesom en kasse!',no:'Ja – viskelæret har 6 plane flater, akkurat som et firkantet prisme!',fi:'Kyllä – pyyhekumissa on 6 tasaista pintaa, kuten suorakulmaisessa särmiössä!'},
    ok_can:       {en:'Yes — the can has 2 flat faces, like a cylinder!',de:'Ja – die Dose hat 2 ebene Flächen, wie ein Zylinder!',fr:'Oui ! La boîte de conserve a 2 faces planes, comme un cylindre.',es:'¡Sí! La lata tiene 2 caras planas, como un cilindro.',pt:'Isso! A lata tem 2 faces planas, como um cilindro.',it:'Sì! La lattina ha 2 facce piane, come un cilindro.',nl:'Ja! Het blik heeft 2 platte vlakken, net als een cilinder.',sv:'Ja – burken har 2 plana ytor, precis som en cylinder!',da:'Ja – dåsen har 2 plane flader, ligesom en cylinder!',no:'Ja – boksen har 2 plane flater, akkurat som en sylinder!',fi:'Kyllä – tölkissä on 2 tasaista pintaa, kuten lieriössä!'},
    ok_drum:      {en:'Yes — the drum has 2 flat faces, like a cylinder!',de:'Ja – die Trommel hat 2 ebene Flächen, wie ein Zylinder!',fr:'Oui ! Le tambour a 2 faces planes, comme un cylindre.',es:'¡Sí! El tambor tiene 2 caras planas, como un cilindro.',pt:'Isso! O tambor tem 2 faces planas, como um cilindro.',it:'Sì! Il tamburo ha 2 facce piane, come un cilindro.',nl:'Ja! De trommel heeft 2 platte vlakken, net als een cilinder.',sv:'Ja – trumman har 2 plana ytor, precis som en cylinder!',da:'Ja – trommen har 2 plane flader, ligesom en cylinder!',no:'Ja – trommen har 2 plane flater, akkurat som en sylinder!',fi:'Kyllä – rummussa on 2 tasaista pintaa, kuten lieriössä!'},
    setTask:      {en:'Task',de:'Aufgabe',fr:'Activité',es:'Actividad',pt:'Atividade',it:'Attività',nl:'Opdracht',sv:'Uppgift',da:'Opgave',no:'Oppgave',fi:'Tehtävä'},
    tSort:        {en:'flat or solid?',de:'flach oder Körper?',fr:'plane ou solide ?',es:'¿figura plana o cuerpo?',pt:'plana ou sólida?',it:'piana o solida?',nl:'vlakke figuur of ruimtefiguur?',sv:'platt eller kropp?',da:'flad eller rumlig?',no:'flat eller romfigur?',fi:'litteä vai kappale?'},
    tFaces:       {en:'count faces',de:'Flächen zählen',fr:'compter les faces',es:'contar caras',pt:'contar faces',it:'contare le facce',nl:'vlakken tellen',sv:'räkna plana ytor',da:'tæl flader',no:'tell flater',fi:'laske tasaiset pinnat'},
    tThings:      {en:'everyday things',de:'Dinge aus dem Alltag',fr:'objets du quotidien',es:'cosas de todos los días',pt:'objetos do dia a dia',it:'oggetti di ogni giorno',nl:'dingen van elke dag',sv:'vardagssaker',da:'ting fra hverdagen',no:'ting fra hverdagen',fi:'arkiset esineet'},
    ariaShape:    {en:'shape {k}',de:'Form {k}',fr:'forme {k}',es:'figura {k}',pt:'forma {k}',it:'forma {k}',nl:'vorm {k}',sv:'form {k}',da:'form {k}',no:'form {k}',fi:'muoto {k}'},
    ariaBag:      {en:'mail bag',de:'Postsack',fr:'sac postal',es:'saco del correo',pt:'saco de cartas',it:'sacco della posta',nl:'postzak',sv:'postsäck',da:'postsæk',no:'postsekk',fi:'postisäkki'},
    ariaLetter:   {en:'letter tray (flat)',de:'Briefablage (flach)',fr:'bac à lettres (plat)',es:'charola de cartas (plana)',pt:'bandeja de cartas (plana)',it:'vassoio delle lettere (piatte)',nl:'brievenbak (plat)',sv:'brevfacket (platt)',da:'brevbakken (flad)',no:'brevkurven (flat)',fi:'kirjekori (litteä)'},
    ariaParcel:   {en:'parcel tray (solid)',de:'Paketablage (Körper)',fr:'bac à colis (solide)',es:'charola de paquetes (cuerpo)',pt:'bandeja de pacotes (sólido)',it:'vassoio dei pacchi (solidi)',nl:'pakketbak (ruimtefiguur)',sv:'paketfacket (kropp)',da:'pakkebakken (rumfigur)',no:'pakkekurven (romfigur)',fi:'pakettikori (kappale)'},
    ariaTab:      {en:'open it out flat',de:'flach aufklappen',fr:'déplier à plat',es:'desplegar en plano',pt:'abrir até ficar plano',it:'aprire fino a renderlo piatto',nl:'plat openvouwen',sv:'vik ut platt',da:'fold ud',no:'brett ut',fi:'avaa tasoksi'},
    ariaFold:     {en:'fold it up again',de:'wieder zusammenklappen',fr:'replier',es:'volver a armar',pt:'fechar de novo',it:'richiudere',nl:'weer dichtvouwen',sv:'vik ihop igen',da:'fold sammen igen',no:'brett sammen igjen',fi:'taita takaisin'},
    ariaTurn:     {en:'turn it',de:'drehen',fr:'tourner',es:'girar',pt:'girar',it:'girare',nl:'draaien',sv:'vrid',da:'drej',no:'drei',fi:'käännä'},
    ariaFace:     {en:'face {k}',de:'Fläche {k}',fr:'face {k}',es:'cara {k}',pt:'face {k}',it:'faccia {k}',nl:'vlak {k}',sv:'yta {k}',da:'flade {k}',no:'flate {k}',fi:'pinta {k}'},
    ariaStamped:  {en:'stamped',de:'gestempelt',fr:'tamponnée',es:'sellada',pt:'carimbada',it:'timbrata',nl:'gestempeld',sv:'stämplad',da:'stemplet',no:'stemplet',fi:'leimattu'},
    ariaUnstamped:{en:'not stamped',de:'nicht gestempelt',fr:'pas tamponnée',es:'sin sello',pt:'sem carimbo',it:'non timbrata',nl:'niet gestempeld',sv:'inte stämplad',da:'ikke stemplet',no:'ikke stemplet',fi:'ei leimattu'},
    ariaSheet:    {en:'curved side',de:'gewölbte Fläche',fr:'surface courbe',es:'superficie curva',pt:'superfície curva',it:'superficie curva',nl:'gebogen kant',sv:'böjd yta',da:'buet side',no:'buet side',fi:'kaareva vaippa'}
    /*STRINGS-END*/
  },
  defaults: { task: 'sort' },
  settings: [
    { key: 'task', type: 'choice', labelKey: 'setTask', options: [{ value: 'sort', labelKey: 'tSort' }, { value: 'faces', labelKey: 'tFaces' }, { value: 'things', labelKey: 'tThings' }] }
  ],

  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false;
    injectPostSlotCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._task()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._render2();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (dir, n) { return '/image-library-webp/themes/' + encodeURIComponent(dir) + '/' + n + '@2x.webp'; },

  /* ---------------- rounds ---------------- */
  _task: function () { return PostSlotCore.task(this.api && this.api.settings ? this.api.settings.task : null); },
  _ensurePool: function () { var t = this._task(); if (!this._pool || this._poolKey !== t) { this._pool = PostSlotCore.rounds(t); this._poolKey = t; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = PostSlotCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]];
    return {
      id: 'post-slot.' + r.id,
      promptKey: r.task === 'sort' ? 'pSort' : r.task === 'faces' ? 'pFaces' : 'pThings',
      promptArgs: { n: r.answer || '' },
      celebrateKey: r.task === 'sort' ? 'okSort' : r.task === 'faces' ? 'okFaces' : 'ok_' + r.object,
      answerType: 'state',
      setup: function (tool) { tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._sel = null; tool.st = C.newState(r, tool.FAST ? null : Math.random); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) this.st = PostSlotCore.newState(PostSlotCore.rounds('sort')[0], null);
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
    var api = this.api, self = this, st = this.st, r = st.r, C = PostSlotCore;
    api.stage.innerHTML = '';
    var L = this._L = C.layout(this._width(), r.task);
    var wrap = api.el('div', 'ps-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + ' is-' + (r.task === 'sort' ? 'sort' : 'faces')); this._wrap = wrap;
    wrap.style.setProperty('--ps-cell', L.cell + 'px'); wrap.style.setProperty('--ps-tcell', L.trayCell + 'px'); wrap.style.setProperty('--ps-chip', L.chip + 'px'); wrap.style.setProperty('--ps-postw', L.post + 'px');
    var stage = api.el('div', 'ps-stage'); this._stage = stage; wrap.appendChild(stage);
    if (L.mode !== 'wide' && r.task === 'sort') stage.appendChild(this._postEl('strip'));
    var main = api.el('div', 'ps-main'); stage.appendChild(main);
    var counter = api.el('div', 'ps-counter'); main.appendChild(counter); this._counter = counter;
    if (r.task === 'sort') this._buildSort(counter); else this._buildFaces(counter);
    if (L.mode === 'wide') main.appendChild(this._postEl('column'));
    var note = api.el('div', 'ps-note'); note.setAttribute('aria-live', 'polite'); this._note = note;
    var ask = api.el('div', 'ps-ask'); if (L.mode !== 'wide' && r.task !== 'sort') ask.appendChild(this._postEl('mini')); ask.appendChild(note);
    var chk = api.el('button', 'ps-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.appendChild(ask);
    api.stage.appendChild(wrap);
    this._paint();
  },

  /* the post box: a red box with a thin slot and a flag; in the sort task, the parcel shelf and its side window */
  _postEl: function (form) {
    var el = this.api.el('div', 'ps-post is-' + form), sort = this.st.r.task === 'sort', svg;
    if (form === 'strip') {
      svg = '<svg class="ps-postsvg" viewBox="0 0 330 112" aria-hidden="true">'
        + '<rect x="14" y="10" width="132" height="96" rx="16" class="ps-box"/><rect x="14" y="10" width="132" height="22" rx="11" class="ps-boxtop"/>'
        + '<rect x="34" y="50" width="92" height="9" rx="4" class="ps-slot"/>'
        + '<g class="ps-flag" transform="translate(150 58)"><g class="ps-flagarm"><rect x="0" y="0" width="5" height="34" class="ps-pole"/><rect x="5" y="21" width="20" height="13" class="ps-pennant"/></g></g>'
        + '<rect x="186" y="84" width="136" height="9" rx="2" class="ps-shelf"/><g class="ps-shelved" transform="translate(186 84)"></g>'
        + '<g transform="translate(262 6)"><rect width="62" height="40" rx="5" class="ps-window"/><g class="ps-side" transform="translate(31 30)"></g></g>'
        + '</svg>';
    } else {
      svg = '<svg class="ps-postsvg" viewBox="0 0 186 ' + (sort ? 330 : 230) + '" aria-hidden="true">'
        + '<rect x="18" y="12" width="134" height="200" rx="18" class="ps-box"/><rect x="18" y="12" width="134" height="28" rx="14" class="ps-boxtop"/>'
        + '<rect x="38" y="70" width="94" height="10" rx="5" class="ps-slot"/>'
        + '<g class="ps-flag" transform="translate(152 104)"><g class="ps-flagarm"><rect x="0" y="0" width="5" height="44" class="ps-pole"/><rect x="5" y="29" width="22" height="15" class="ps-pennant"/></g></g>'
        + (sort ? '<rect x="6" y="312" width="158" height="10" rx="2" class="ps-shelf"/><g class="ps-shelved" transform="translate(6 312)"></g>'
          + '<g transform="translate(70 226)"><rect width="94" height="56" rx="6" class="ps-window"/><g class="ps-side" transform="translate(47 42)"></g></g>' : '')
        + '</svg>';
    }
    el.innerHTML = svg;
    this._postSvg = el.querySelector('svg');
    return el;
  },

  /* ---- sort: the mail bag and the two trays ---- */
  _buildSort: function (counter) {
    var api = this.api, self = this;
    var edges = api.el('div', 'ps-edges'); edges.setAttribute('aria-hidden', 'true'); this._edges = edges; counter.appendChild(edges);
    var bag = api.el('div', 'ps-bag'); bag.setAttribute('aria-label', this._t('ariaBag')); this._bag = bag; counter.appendChild(bag);
    bag.addEventListener('click', function (ev) { if (ev.target.closest('.ps-it')) return; if (self._sel) { var id = self._sel; self._sel = null; self._moveTo(id, 'bag'); } });
    var trays = api.el('div', 'ps-trays'); counter.appendChild(trays); this._trays = {};
    ['letter', 'parcel'].forEach(function (d) {
      var tray = api.el('button', 'ps-tray is-' + d); tray.type = 'button'; tray.setAttribute('data-dest', d); tray.setAttribute('aria-label', self._t(d === 'letter' ? 'ariaLetter' : 'ariaParcel'));
      tray.innerHTML = '<svg class="ps-motif" viewBox="0 0 40 28" aria-hidden="true">' + (d === 'letter' ? '<rect x="2" y="4" width="36" height="20" rx="2"/><path d="M2 5 L20 17 L38 5"/>' : '<path d="M4 10 L20 3 L36 10 L36 24 L20 27 L4 24 Z"/><path d="M4 10 L20 16 L36 10 M20 16 V27"/>') + '</svg><span class="ps-tin"></span>';
      tray.addEventListener('click', function (ev) { if (ev.target.closest('.ps-it')) return; self._tapTray(d); });
      trays.appendChild(tray); self._trays[d] = tray;
    });
  },
  /* ---- faces: the solid on its turntable (or the picture), its pull tab, the net, the chips ---- */
  _buildFaces: function (counter) {
    var api = this.api, self = this, L = this._L;
    var table = api.el('div', 'ps-table'); table.style.height = L.netH + 'px'; this._table = table; counter.appendChild(table);
    var row = api.el('div', 'ps-chiprow'); counter.appendChild(row);
    var chips = api.el('div', 'ps-chips'); row.appendChild(chips); this._chips = [];
    for (var n = 1; n <= 9; n++) (function (n) {
      var b = api.el('button', 'ps-chip'); b.type = 'button'; b.textContent = String(n); b.setAttribute('data-n', n);
      b.addEventListener('click', function () { if (self._busy) return; if (PostSlotCore.setChip(self.st, n)) { self.api.sound(500 + n * 40); self._paint(); } });
      chips.appendChild(b); self._chips.push(b);
    })(n);
  },

  _paint: function () {
    if (!this._stage) return;
    if (this.st.r.task === 'sort') this._paintSort(); else this._paintFaces();
    var st = this.st, C = PostSlotCore, h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : this._celebrate();
    else if (h) msg = this._t(h);
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.last && st.last.result === 'wrong'));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
    if (this._postSvg) { this._postSvg.classList.toggle('is-done', !!st.done); var arm = this._postSvg.querySelector('.ps-flagarm'); if (arm) { if (st.done) arm.setAttribute('transform', 'scale(1 -1)'); else arm.removeAttribute('transform'); } }
  },
  _celebrate: function () { var r = this.st.r; return r.task === 'sort' ? this._t('okSort') : r.task === 'faces' ? this._t('okFaces', { n: r.answer }) : this._t('ok_' + r.object); },

  _paintSort: function () {
    var self = this, st = this.st, r = st.r, C = PostSlotCore;
    this._bag.innerHTML = '';
    st.bag.forEach(function (id) { self._bag.appendChild(self._itemEl(id, 'bag')); });
    ['letter', 'parcel'].forEach(function (d) { var box = self._trays[d].querySelector('.ps-tin'); box.innerHTML = ''; st.trays[d].forEach(function (id) { box.appendChild(self._itemEl(id, d)); }); self._trays[d].classList.toggle('is-target', !!self._sel); });
    /* the slot's verdict on the bounced shapes: edge-on, a line beside a thick block */
    this._edges.innerHTML = '';
    var showEdges = st.show && st.help >= 1 && st.bounced.length;
    this._edges.hidden = !showEdges;
    if (showEdges) st.bounced.forEach(function (id) { var it = C.byId(r, id); var d = document.createElement('span'); d.className = 'ps-edge' + (it.flat ? ' is-flat' : ''); d.innerHTML = self._itemSVG(it, false); self._edges.appendChild(d); });
    /* the shelf and its side window */
    if (this._postSvg) {
      var sh = this._postSvg.querySelector('.ps-shelved'), side = this._postSvg.querySelector('.ps-side');
      if (sh) {
        var wide = this._L.mode === 'wide', step = wide ? 26 : 22, s = wide ? 24 : 21, out = '', sv = '';
        st.shelved.forEach(function (id, i) { var it = C.byId(r, id); out += '<g transform="translate(' + (14 + i * step) + ' ' + (-s / 2 - 1) + ') scale(' + (s / 100) + ')">' + self._itemInner(it, false) + '</g>'; });
        sh.innerHTML = out;
        var n = st.shelved.length; st.shelved.forEach(function (id, i) { var x = (i - (n - 1) / 2) * (wide ? 16 : 11); sv += '<rect x="' + (x - 4) + '" y="-24" width="8" height="24" rx="1" class="ps-sideblock"/>'; });
        side.innerHTML = sv;
      }
    }
  },
  _itemEl: function (id, where) {
    var self = this, st = this.st, r = st.r, C = PostSlotCore, it = C.byId(r, id), k = r.items.indexOf(it) + 1;
    var b = this.api.el('button', 'ps-it ' + (where === 'bag' ? 'in-bag' : 'in-tray') + (it.flat ? ' is-flat' : ' is-solid') + (this._sel === id ? ' is-sel' : '') + (this._edge && this._edge[id] ? ' is-edge' : ''));
    b.type = 'button'; b.setAttribute('data-id', id);
    b.setAttribute('aria-label', this._t('ariaShape', { k: k }) + (where === 'bag' ? '' : ', ' + this._t(where === 'letter' ? 'ariaLetter' : 'ariaParcel')));
    var html = this._itemSVG(it, false);
    if (where === 'bag' && st.help >= 2 && st.show && st.bounced.indexOf(id) >= 0) html += '<span class="ps-arrow is-' + (it.flat ? 'letter' : 'parcel') + '" aria-hidden="true"><svg viewBox="0 0 30 30"><path d="M15 3 V22 M7 15 L15 24 L23 15"/></svg></span>';
    b.innerHTML = html;
    this._bindDrag(b, id);
    return b;
  },
  _itemSVG: function (it, see) { return '<svg class="ps-svg" viewBox="-50 -50 100 100" aria-hidden="true">' + this._itemInner(it, see) + '</svg>'; },
  _itemInner: function (it, see) {
    var a = it.a || 0, s = it.s || 0.85;
    return '<g transform="rotate(' + a + ') scale(' + s + ')">' + (PostSlotCore.isFlat(it.kind) ? this._flatInner(it.kind) : this._solidInner(it.kind, { yaw: 30, pitch: 22 }, see)) + '</g>';
  },
  _flatInner: function (k) {
    var fill = { circle: '#F6C9B5', square: '#CFE6DF', triangle: '#F3D9A8', rectangle: '#D8D3F0', hexagon: '#CDE7C8', oval: '#F9D3E0', star: '#FBE7A1' }[k], c = ' class="ps-flatshape" style="fill:' + fill + '"';
    var poly = function (p) { return '<polygon' + c + ' points="' + p.map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' ') + '"/>'; };
    var ng = function (n, R, rot) { var p = []; for (var i = 0; i < n; i++) { var t = rot + i * 2 * Math.PI / n; p.push([R * Math.cos(t), R * Math.sin(t)]); } return p; };
    if (k === 'circle') return '<circle' + c + ' r="40"/>';
    if (k === 'oval') return '<ellipse' + c + ' rx="45" ry="27"/>';
    if (k === 'square') return '<rect' + c + ' x="-36" y="-36" width="72" height="72"/>';
    if (k === 'rectangle') return '<rect' + c + ' x="-46" y="-26" width="92" height="52"/>';
    if (k === 'triangle') return poly(ng(3, 44, -Math.PI / 2).map(function (p) { return [p[0], p[1] + 8]; }));
    if (k === 'hexagon') return poly(ng(6, 42, 0));
    var st = []; for (var i = 0; i < 10; i++) { var t = -Math.PI / 2 + i * Math.PI / 5, R = i % 2 ? 19 : 45; st.push([R * Math.cos(t), R * Math.sin(t) + 4]); } return poly(st);
  },
  /* a solid, shaded; see-through (hidden edges dashed) in the counting tasks */
  _solidInner: function (k, pose, see) {
    var base = { sphere: '#F3A6A0', cube: '#8EC5E8', box: '#F2A97E', sqpyr: '#E9C9A1', tripyr: '#C9B6E8', triprism: '#A9D8B8', hexprism: '#F4C26B', cylinder: '#9FD0E6', cone: '#F3B6A0' }[k];
    var dash = see ? '' : ' style="display:none"';
    if (k === 'sphere') return '<circle r="40" class="ps-solidface" fill="url(#ps-sph)"/><ellipse cx="-14" cy="-16" rx="11" ry="8" fill="#fff" opacity=".8"/><path class="ps-sedge" d="M-40 0 A40 12 0 0 0 40 0"/><path class="ps-hid"' + dash + ' d="M-40 0 A40 12 0 0 1 40 0"/>';
    if (k === 'cylinder') return '<path class="ps-solidface" style="fill:' + shade(base, -0.08) + '" d="M-30 -34 V32 A30 9 0 0 0 30 32 V-34 Z"/><ellipse class="ps-solidface" style="fill:' + shade(base, 0.22) + '" cx="0" cy="-34" rx="30" ry="9"/><path class="ps-hid"' + dash + ' d="M-30 32 A30 9 0 0 1 30 32"/>';
    if (k === 'cone') return '<path class="ps-solidface" style="fill:' + shade(base, 0) + '" d="M0 -42 L32 30 A32 9 0 0 1 -32 30 Z"/><path class="ps-hid"' + dash + ' d="M-32 30 A32 9 0 0 1 32 30"/>';
    var v = PostSlotCore.view(k, pose), xs = [], ys = [];
    v.faces.forEach(function (f) { f.pts.forEach(function (p) { xs.push(p[0]); ys.push(p[1]); }); });
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys), sc = 84 / Math.max(x1 - x0, y1 - y0), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    var P = function (p) { return ((p[0] - cx) * sc).toFixed(1) + ',' + ((p[1] - cy) * sc).toFixed(1); }, out = '';
    v.faces.filter(function (f) { return f.vis; }).sort(function (a, b) { return a.depth - b.depth; }).forEach(function (f) { out += '<polygon class="ps-solidface' + (see ? ' is-see' : '') + '" style="fill:' + shade(base, 0.25 * f.light) + '" points="' + f.pts.map(P).join(' ') + '"/>'; });
    if (see) v.edges.filter(function (e) { return !e.vis; }).forEach(function (e) { out += '<line class="ps-hid" x1="' + P(e.a).split(',')[0] + '" y1="' + P(e.a).split(',')[1] + '" x2="' + P(e.b).split(',')[0] + '" y2="' + P(e.b).split(',')[1] + '"/>'; });
    return out;
  },

  /* ---- sort: the hand ---- */
  _bindDrag: function (el, id) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      if (self._busy) return;
      var where = PostSlotCore.whereIs(self.st, id); if (where === 'posted' || where === 'shelved') return;
      ev.preventDefault();
      var x0 = ev.clientX, y0 = ev.clientY, moved = false, ghost = null;
      var move = function (e) {
        if (self.st.done) return;
        if (!moved && Math.hypot(e.clientX - x0, e.clientY - y0) < 6) return;
        if (!moved) { moved = true; ghost = el.cloneNode(true); ghost.className = 'ps-it ps-dragging'; document.body.appendChild(ghost); }
        ghost.style.left = (e.clientX - 30) + 'px'; ghost.style.top = (e.clientY - 30) + 'px';
      };
      var up = function (e) {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        if (ghost) ghost.remove();
        if (!moved) { self._tapItem(id); return; }
        var dest = self._destAt(e.clientX, e.clientY);
        self._sel = null;
        if (dest) self._moveTo(id, dest); else self._paint();
      };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
    el.addEventListener('click', function (ev) { if (ev.detail !== 0) return; ev.stopPropagation(); self._tapItem(id); var nx = self._stage.querySelector('.ps-it[data-id="' + id + '"]'); if (nx) nx.focus(); });
  },
  /* a tap picks a shape up (a lift and a wiggle — it does NOT turn on its edge); after success it turns edge-on and back */
  _tapItem: function (id) {
    if (this._busy) return;
    if (this.st.done) { if (PostSlotCore.edgeOnAllowed(this.st)) { this._edge = this._edge || {}; this._edge[id] = !this._edge[id]; this.api.sound(720); this._paint(); } return; }
    this._sel = this._sel === id ? null : id; this.api.sound(660); this._paint();
  },
  _tapTray: function (d) { if (this._busy || !this._sel) return; var id = this._sel; this._sel = null; this._moveTo(id, d); var t = this._trays[d]; if (t) t.focus(); },
  _destAt: function (x, y) {
    for (var d in this._trays) { var r = this._trays[d].getBoundingClientRect(); if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return d; }
    var b = this._bag.getBoundingClientRect(); if (x >= b.left && x <= b.right && y >= b.top - 10 && y <= b.bottom + 10) return 'bag';
    return null;
  },
  _moveTo: function (id, dest) { if (PostSlotCore.move(this.st, id, dest)) this.api.sound(dest === 'bag' ? 420 : 560); this._paint(); },

  /* ---- faces: paint ---- */
  _paintFaces: function () {
    var self = this, st = this.st, r = st.r, C = PostSlotCore, L = this._L;
    var table = this._table; table.innerHTML = '';
    if (!st.unfolded) {
      var w = Math.min(L.solid, L.netH - 10);
      if (r.task === 'faces') {
        var it = { kind: r.kind, a: 0, s: r.s * 1.1 };
        table.insertAdjacentHTML('beforeend', '<div class="ps-turntable" style="width:' + w + 'px;height:' + w + 'px"><svg class="ps-svg" viewBox="-50 -50 100 100" aria-hidden="true"><ellipse class="ps-disc" cx="0" cy="' + (42 * it.s - 2).toFixed(1) + '" rx="44" ry="7"/><g transform="scale(' + it.s + ')">' + this._solidInner(r.kind, st.pose, true) + '</g></svg></div>');
      } else {
        var o = C.OBJ[r.object];
        table.insertAdjacentHTML('beforeend', '<div class="ps-turntable is-thing' + (r.lying ? ' is-lying' : '') + '" style="width:' + w + 'px;height:' + w + 'px"><img class="ps-thing" alt="" draggable="false" src="' + this._pic(o.dir, r.object) + '"><svg class="ps-outline" viewBox="0 0 1 1" aria-hidden="true">' + this._outlineInner(o) + '</svg></div>');
      }
      var tab = this.api.el('button', 'ps-tab'); tab.type = 'button'; tab.setAttribute('aria-label', this._t('ariaTab'));
      tab.innerHTML = '<svg viewBox="0 0 44 44" aria-hidden="true"><path class="ps-tabshape" d="M6 10 H30 L38 22 L30 34 H6 Z"/><path class="ps-tabarrow" d="M14 22 H28 M23 16 L29 22 L23 28"/></svg>';
      this._bindTab(tab);
      table.appendChild(tab);
      if (r.task === 'faces') { var tb = this.api.el('button', 'ps-turn'); tb.type = 'button'; tb.setAttribute('aria-label', this._t('ariaTurn')); tb.textContent = '↻'; tb.addEventListener('click', function () { if (self._busy) return; if (C.turn(st)) { self.api.sound(380); self._paint(); } }); table.appendChild(tb); }
    } else {
      table.appendChild(this._netEl());
      if (st.done) { var ft = this.api.el('button', 'ps-tab is-fold'); ft.type = 'button'; ft.setAttribute('aria-label', this._t('ariaFold')); ft.innerHTML = '<svg viewBox="0 0 44 44" aria-hidden="true"><path class="ps-tabshape" d="M6 10 H30 L38 22 L30 34 H6 Z"/><path class="ps-tabarrow" d="M30 22 H16 M21 16 L15 22 L21 28"/></svg>'; ft.addEventListener('click', function () { if (C.fold(st)) { self.api.sound(300); self._paint(); } }); table.appendChild(ft); }
    }
    this._chips.forEach(function (b) { var n = +b.getAttribute('data-n'); b.classList.toggle('is-on', st.chip === n); b.setAttribute('aria-pressed', st.chip === n ? 'true' : 'false'); b.disabled = !!st.done; });
  },
  _outlineInner: function (o) {
    var f = function (p) { return p[0].toFixed(3) + ' ' + p[1].toFixed(3); }, out = '';
    if (o.hex) {
      var ol = PostSlotCore.boxOutline(o.hex);
      ol.hid.forEach(function (e) { out += '<path class="ps-ohid" d="M' + f(e[0]) + ' L' + f(e[1]) + '"/>'; });
      ol.vis.forEach(function (e) { out += '<path class="ps-ovis" d="M' + f(e[0]) + ' L' + f(e[1]) + '"/>'; });
      return out;
    }
    var c = o.cyl;
    out += '<ellipse class="ps-ovis" cx="' + c.cx + '" cy="' + c.top + '" rx="' + c.rx + '" ry="' + c.ry + '"/>';
    out += '<path class="ps-ovis" d="M' + (c.cx - c.rx) + ' ' + c.top + ' V' + c.bot + ' A' + c.rx + ' ' + c.ry + ' 0 0 0 ' + (c.cx + c.rx) + ' ' + c.bot + ' V' + c.top + '"/>';
    out += '<path class="ps-ohid" d="M' + (c.cx - c.rx) + ' ' + c.bot + ' A' + c.rx + ' ' + c.ry + ' 0 0 1 ' + (c.cx + c.rx) + ' ' + c.bot + '"/>';
    return out;
  },
  /* the pull tab: drag it outward, or tap it, or Enter — the solid opens out into its flat net */
  _bindTab: function (tab) {
    var self = this, x0 = 0, down = false;
    tab.addEventListener('pointerdown', function (e) { down = true; x0 = e.clientX; });
    tab.addEventListener('pointerup', function () { down = false; });
    tab.addEventListener('click', function () { self._open(); });
    void x0; void down;
  },
  _open: function () {
    var self = this, C = PostSlotCore;
    if (this._busy || !C.unfold(this.st)) return;
    this.api.sound(330);
    this._paint();
    if (this.FAST) return;
    /* the faces swing out of their hinges one after another */
    var groups = this._table.querySelectorAll('.ps-fg'), order = this._bfs();
    order.forEach(function (fi, i) { var g = groups[fi]; if (!g || !g.animate) return; g.animate([{ transform: 'scale(.12)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 250, delay: i * 200, easing: 'ease-out', fill: 'backwards' }); });
    void self;
  },
  _bfs: function () { var F = this.st.net.faces, out = [], q = [0]; while (q.length) { var p = q.shift(); out.push(p); F.forEach(function (f, i) { if (f.parent === p && out.indexOf(i) < 0 && q.indexOf(i) < 0) q.push(i); }); } return out; },
  _netEl: function () {
    var self = this, st = this.st, net = st.net, L = this._L, C = PostSlotCore;
    var bw = (this._table && this._table.clientWidth ? this._table.clientWidth : (L.mode === 'wide' ? L.counterW : L.W) - 24) - 12, bh = L.netH - 12, sc = C.netScale(net, bw, bh), W = net.w * sc, H = net.h * sc;
    var NS = 'http://www.w3.org/2000/svg', svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'ps-net'); svg.setAttribute('viewBox', '-4 -4 ' + (W + 8) + ' ' + (H + 8)); svg.setAttribute('width', W + 8); svg.setAttribute('height', H + 8);
    var kind = st.r.kind, base = { cube: '#8EC5E8', box: '#F2A97E', sqpyr: '#E9C9A1', tripyr: '#C9B6E8', triprism: '#A9D8B8', hexprism: '#F4C26B', cylinder: '#9FD0E6' }[kind];
    var defs = '<defs><pattern id="ps-curve" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="' + shade(base, 0.25) + '"/><path d="M0 0 V10" stroke="' + shade(base, -0.2) + '" stroke-width="3"/></pattern></defs>';
    var html = defs, help2 = st.help >= 2;
    net.faces.forEach(function (f, i) {
      var pts = f.pts.map(function (p) { return [p[0] * sc, p[1] * sc]; }), cx = 0, cy = 0;
      pts.forEach(function (p) { cx += p[0]; cy += p[1]; }); cx /= pts.length; cy /= pts.length;
      var hingeMid = f.hinge ? [(f.hinge[0][0] + f.hinge[1][0]) / 2 * sc, (f.hinge[0][1] + f.hinge[1][1]) / 2 * sc] : [cx, cy];
      var stamped = st.stamps.indexOf(i) >= 0, unpaidShow = st.show && !stamped && !f.curved;
      var label = f.curved ? self._t('ariaSheet') : self._t('ariaFace', { k: i + 1 }) + ', ' + self._t(stamped ? 'ariaStamped' : 'ariaUnstamped');
      var poly = f.round ? '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + (Math.abs(pts[0][0] - cx)).toFixed(1) + '"' : '<polygon points="' + pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') + '"';
      var inr = f.round ? Math.abs(pts[0][0] - cx) : inradius(pts, cx, cy), ring = Math.max(9, Math.min(26, inr * 0.6));
      var mark = '';
      if (stamped) {
        var wv = Math.min(ring * 0.5, (inr - 2) / 2), w0 = cx - wv * 2;
        mark = '<g class="ps-mark"><circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + ring.toFixed(1) + '"/><path d="M' + w0.toFixed(1) + ' ' + (cy - ring * 0.2).toFixed(1) + ' q' + (wv / 2).toFixed(1) + ' ' + (-ring * 0.25).toFixed(1) + ' ' + wv.toFixed(1) + ' 0 t' + wv.toFixed(1) + ' 0 t' + wv.toFixed(1) + ' 0 t' + wv.toFixed(1) + ' 0"/>';
        if (help2) mark += '<text x="' + cx.toFixed(1) + '" y="' + (cy + 6).toFixed(1) + '" text-anchor="middle" class="ps-num">' + (st.stamps.indexOf(i) + 1) + '</text>';
        mark += '</g>';
      }
      html += '<g class="ps-fg' + (f.curved ? ' is-curved' : '') + (stamped ? ' is-stamped' : '') + (unpaidShow ? ' is-wobble' : '') + '" data-f="' + i + '" style="transform-origin:' + hingeMid[0].toFixed(1) + 'px ' + hingeMid[1].toFixed(1) + 'px" tabindex="0" role="button" aria-label="' + label.replace(/"/g, '&quot;') + '">'
        + poly + ' class="ps-face" style="fill:' + (f.curved ? 'url(#ps-curve)' : shade(base, 0.1)) + '"/>' + mark + '</g>';
    });
    svg.innerHTML = html;
    svg.querySelectorAll('.ps-fg').forEach(function (g) {
      var fi = +g.getAttribute('data-f');
      var act = function () { self._stamp(fi); };
      g.addEventListener('click', act);
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
    });
    var holder = document.createElement('div'); holder.className = 'ps-netbox'; holder.appendChild(svg);
    return holder;
  },
  _stamp: function (fi) {
    if (this._busy) return;
    var res = PostSlotCore.stamp(this.st, fi);
    if (res === 'curl') { this.api.sound(240); this._note.textContent = this._t('hintCurve'); var g = this._table.querySelector('.ps-fg[data-f="' + fi + '"]'); if (g && g.animate && !this.FAST) g.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(.55)' }, { transform: 'scaleY(1)' }], { duration: 500 }); return; }
    if (!res) return;
    this.api.sound(res === 'on' ? 180 : 420);
    this._paint();
    var nx = this._table.querySelector('.ps-fg[data-f="' + fi + '"]'); if (nx) nx.focus();
  },

  /* ---------------- Check ---------------- */
  _check: function () {
    var C = PostSlotCore, st = this.st, self = this;
    if (this._busy || st.done) return;
    if (st.r.task === 'sort') return this._checkSort();
    var res = C.check(st);
    if (res.result === 'ok') return this._postNet();
    if (res.result === 'wrong' || res.result === 'unpaid') { this.api.sound(196); this._paint(); this._bump(); return; }
    this._paint();
    void self;
  },
  _bump: function () { if (this.FAST) return; var n = this._table.querySelector('.ps-net'); if (n && n.animate) n.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-14px)' }, { transform: 'translateY(0)' }], { duration: 420 }); },
  /* the sort check: letters go to the slot one at a time, parcels to the shelf */
  _checkSort: function () {
    var C = PostSlotCore, st = this.st, self = this;
    if (st.bag.length) { C.check(st); this._paint(); return; }
    var rects = {}, list = [];
    ['letter', 'parcel'].forEach(function (d) { st.trays[d].forEach(function (id) { var el = self._stage.querySelector('.ps-it[data-id="' + id + '"]'); if (el) { rects[id] = el.getBoundingClientRect(); list.push({ id: id, from: d, html: el.innerHTML }); } }); });
    var res = C.check(st), slot = this._postSvg ? this._postSvg.querySelector('.ps-slot').getBoundingClientRect() : null, shelf = this._postSvg ? this._postSvg.querySelector('.ps-shelf').getBoundingClientRect() : null;
    var finish = function () { self._busy = false; self._paint(); if (res.result === 'ok') self._win(); else self.api.sound(196); };
    if (this.FAST || !slot || !document.body.animate) { finish(); return; }
    this._busy = true; this._paint(); this._busy = true;
    var step = 560, flat = function (id) { return C.byId(st.r, id).flat; };
    list.forEach(function (o, i) {
      var r0 = rects[o.id]; if (!r0) return;
      var fl = document.createElement('div'); fl.className = 'ps-flyer'; fl.innerHTML = o.html; fl.style.left = r0.left + 'px'; fl.style.top = r0.top + 'px'; fl.style.width = r0.width + 'px'; fl.style.height = r0.height + 'px'; fl.style.opacity = '0';
      document.body.appendChild(fl);
      var tgt = o.from === 'letter' ? slot : shelf, dx = tgt.left + tgt.width / 2 - (r0.left + r0.width / 2), dy = tgt.top + tgt.height / 2 - (r0.top + r0.height / 2) - (o.from === 'letter' ? 0 : 18), F = flat(o.id), kf;
      if (o.from === 'letter') kf = F ? [{ opacity: 1, transform: 'translate(0,0)' }, { opacity: 1, transform: 'translate(' + dx + 'px,' + dy + 'px) scaleY(1)', offset: 0.45 }, { opacity: 1, transform: 'translate(' + dx + 'px,' + dy + 'px) scaleY(.05)', offset: 0.7 }, { opacity: 0, transform: 'translate(' + dx + 'px,' + (dy + 30) + 'px) scaleY(.05)' }]
        : [{ opacity: 1, transform: 'translate(0,0)' }, { opacity: 1, transform: 'translate(' + dx + 'px,' + dy + 'px) scaleY(.6)', offset: 0.45 }, { opacity: 1, transform: 'translate(' + (dx - 4) + 'px,' + dy + 'px) scaleY(.6)', offset: 0.55 }, { opacity: 1, transform: 'translate(' + (dx + 4) + 'px,' + dy + 'px) scaleY(.6)', offset: 0.65 }, { opacity: 0, transform: 'translate(0,0)' }];
      else kf = F ? [{ opacity: 1, transform: 'translate(0,0)' }, { opacity: 1, transform: 'translate(' + dx + 'px,' + dy + 'px)', offset: 0.45 }, { opacity: 1, transform: 'translate(' + dx + 'px,' + (dy + 12) + 'px) rotate(90deg) scaleX(.06)', offset: 0.7 }, { opacity: 0, transform: 'translate(' + (dx + 40) + 'px,' + (dy + 40) + 'px) rotate(90deg) scaleX(.06)' }]
        : [{ opacity: 1, transform: 'translate(0,0)' }, { opacity: 1, transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.5)', offset: 0.8 }, { opacity: 0, transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.4)' }];
      self._later(function () { self.api.sound(o.from === 'letter' ? (F ? 880 : 150) : (F ? 150 : 520)); }, i * step + 260);
      fl.animate(kf, { duration: step + 200, delay: i * step, easing: 'ease-in-out' }).onfinish = function () { fl.remove(); };
    });
    this._later(finish, list.length * step + 260);
  },
  _postNet: function () {
    var self = this;
    this.api.sound(880);
    this._paint();
    if (!this.FAST && this._postSvg) {
      var n = this._table.querySelector('.ps-net'), slot = this._postSvg.querySelector('.ps-slot');
      if (n && n.animate && slot) { var a = n.getBoundingClientRect(), b = slot.getBoundingClientRect(); n.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: 'translate(' + (b.left + b.width / 2 - a.left - a.width / 2) + 'px,' + (b.top - a.top - a.height / 2) + 'px) scale(.18,.04)', opacity: 1, offset: 0.8 }, { transform: 'translate(' + (b.left + b.width / 2 - a.left - a.width / 2) + 'px,' + (b.top - a.top - a.height / 2 + 20) + 'px) scale(.18,.04)', opacity: 0 }], { duration: 1100, easing: 'ease-in' }); }
    }
    this._win();
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

/* the distance from a point inside a convex polygon to its nearest side */
function inradius(pts, cx, cy) {
  var best = Infinity;
  for (var i = 0; i < pts.length; i++) { var a = pts[i], b = pts[(i + 1) % pts.length], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; best = Math.min(best, Math.abs((cx - a[0]) * dy - (cy - a[1]) * dx) / L); }
  return best;
}

/* a colour lighter (f > 0) or darker (f < 0) */
function shade(hex, f) {
  var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  var m = function (c) { return Math.round(f >= 0 ? c + (255 - c) * f : c * (1 + f)); };
  return '#' + ((1 << 24) + (m(r) << 16) + (m(g) << 8) + m(b)).toString(16).slice(1);
}

var psCssDone = false;
function injectPostSlotCSS() {
  if (psCssDone || typeof document === 'undefined') return;
  psCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.ps-wrap{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:10px;--ps-ink:#0F4A40;--ps-teal:#146B5E;--ps-coral:#F2784B;}'
  + '.ps-stage{display:flex;flex-direction:column;align-items:stretch;gap:8px;user-select:none;-webkit-user-select:none;width:100%;}'
  + '.ps-main{display:flex;gap:12px;align-items:flex-start;} .is-narrow .ps-main{flex-direction:column;align-items:stretch;}'
  + '.ps-counter{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px;padding:10px;border-radius:14px;background:linear-gradient(#F3E2C4,#E8D2AB);box-shadow:inset 0 -4px 0 #C9AE80;} .is-narrow .ps-counter{padding:6px;}'
  + '.ps-post{flex:none;display:flex;align-items:flex-start;justify-content:center;} .ps-post.is-column{width:var(--ps-postw);} .ps-post.is-strip{width:100%;} .ps-post.is-mini{width:48px;} .ps-postsvg{width:100%;height:auto;display:block;} .ps-post.is-mini .ps-postsvg{height:64px;width:48px;}'
  + '.ps-box{fill:#D9473C;stroke:#2A2A35;stroke-width:3;} .ps-boxtop{fill:#B9362D;stroke:#2A2A35;stroke-width:3;} .ps-slot{fill:#1B1B24;} .ps-pole{fill:#2A2A35;} .ps-pennant{fill:#F2C14B;stroke:#2A2A35;stroke-width:1.5;}'
  + ''
  + '.ps-postsvg.is-done .ps-box{animation:ps-thump .5s ease-out .2s;} @keyframes ps-thump{40%{transform:translateY(3px);}}'
  + '.ps-shelf{fill:#A9773F;stroke:#2A2A35;stroke-width:2;} .ps-window{fill:#EAF4F2;stroke:#2A2A35;stroke-width:2.5;} .ps-sideblock{fill:#7A8E8B;stroke:#2A2A35;stroke-width:1;}'
  + '.ps-edges{display:flex;justify-content:center;gap:10px;min-height:0;} .ps-edges[hidden]{display:none;} .ps-edge{width:48px;height:48px;display:block;border-radius:8px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #C9B897;} .ps-edge .ps-svg{transform:scaleY(.55);} .ps-edge.is-flat .ps-svg{transform:scaleY(.06);}'
  + '.ps-bag{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;padding:8px;min-height:calc(var(--ps-cell) + 16px);border-radius:16px 16px 28px 28px;background:#C9A86B;box-shadow:inset 0 0 0 3px #8C6A35,inset 0 -6px 0 rgba(0,0,0,.12);}'
  + '.ps-trays{display:grid;grid-template-columns:1fr 1fr;gap:8px;}'
  + '.ps-tray{position:relative;min-height:calc(var(--ps-tcell) * 2 + 18px);padding:22px 6px 6px;border:0;border-radius:12px;background:#FBF3E4;box-shadow:inset 0 0 0 3px #8C6A35,0 3px 0 #8C6A35;cursor:pointer;} .ps-tray.is-target{box-shadow:inset 0 0 0 3px var(--ps-teal),0 0 0 3px rgba(20,107,94,.25);}'
  + '.ps-motif{position:absolute;left:8px;top:4px;width:28px;height:20px;fill:none;stroke:#8C6A35;stroke-width:2.5;stroke-linejoin:round;} .ps-tin{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;}'
  + '.ps-it{position:relative;padding:0;border:0;border-radius:10px;background:#FFFDF6;box-shadow:0 2px 0 rgba(0,0,0,.2);cursor:grab;touch-action:none;} .ps-it.in-bag{width:var(--ps-cell);height:var(--ps-cell);} .ps-it.in-tray{width:var(--ps-tcell);height:var(--ps-tcell);}'
  + '.ps-it.is-sel{box-shadow:0 0 0 4px var(--ps-teal);animation:ps-wiggle .4s ease;} @keyframes ps-wiggle{30%{transform:translateY(-6px) rotate(-5deg);}70%{transform:translateY(-4px) rotate(5deg);}}'
  + '.ps-svg{width:100%;height:100%;display:block;transition:transform .25s ease;} .ps-it.is-edge.is-flat .ps-svg{transform:scaleY(.06);} .ps-it.is-edge.is-solid .ps-svg{transform:scaleY(.55);}'
  + '.ps-flatshape{stroke:#2A2A35;stroke-width:3;stroke-linejoin:round;vector-effect:non-scaling-stroke;} .ps-solidface{stroke:#2A2A35;stroke-width:2.5;stroke-linejoin:round;vector-effect:non-scaling-stroke;} .ps-solidface.is-see{fill-opacity:.82;}'
  + '.ps-sedge{fill:none;stroke:#2A2A35;stroke-width:1.5;opacity:.55;vector-effect:non-scaling-stroke;} .ps-hid{fill:none;stroke:#2A2A35;stroke-width:2;stroke-dasharray:5 4;vector-effect:non-scaling-stroke;}'
  + '.ps-arrow{position:absolute;right:-6px;top:-10px;width:26px;height:26px;border-radius:50%;background:#fff;box-shadow:0 0 0 2px currentColor;} .ps-arrow svg{width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round;} .ps-arrow.is-letter{color:#146B5E;transform:rotate(30deg);} .ps-arrow.is-parcel{color:#B0532E;transform:rotate(-30deg);}'
  + '.ps-dragging{position:fixed;z-index:50;width:60px;height:60px;pointer-events:none;opacity:.92;box-shadow:0 8px 16px rgba(0,0,0,.25);} .ps-flyer{position:fixed;z-index:40;pointer-events:none;border-radius:10px;background:#FFFDF6;}'
  + '.ps-table{position:relative;display:flex;align-items:center;justify-content:center;border-radius:12px;background:#FBF3E4;box-shadow:inset 0 0 0 2px #C9B897;}'
  + '.ps-turntable{position:relative;} .ps-disc{fill:#C9AE80;stroke:#2A2A35;stroke-width:2;vector-effect:non-scaling-stroke;} .ps-thing{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;} .ps-outline{position:absolute;inset:0;width:100%;height:100%;overflow:visible;} .ps-turntable.is-lying{transform:rotate(-90deg);}'
  + '.ps-ovis{fill:none;stroke:#0E7C6B;stroke-width:2.5;vector-effect:non-scaling-stroke;stroke-linejoin:round;} .ps-ohid{fill:none;stroke:#0E7C6B;stroke-width:2.5;stroke-dasharray:6 5;vector-effect:non-scaling-stroke;}'
  + '.ps-tab{position:absolute;right:8px;bottom:8px;width:52px;height:52px;padding:0;border:0;border-radius:12px;background:#FFF6DA;box-shadow:0 3px 0 #C9AE80;cursor:pointer;touch-action:none;} .ps-tab svg{width:100%;height:100%;} .ps-tabshape{fill:#F2C14B;stroke:#2A2A35;stroke-width:2;} .ps-tabarrow{fill:none;stroke:#2A2A35;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;}'
  + '.ps-tab:not(.is-fold){animation:ps-nudge 1.6s ease-in-out 2 .8s;} @keyframes ps-nudge{50%{transform:translateX(6px);}}'
  + '.ps-turn{position:absolute;left:8px;bottom:8px;width:48px;height:48px;border:0;border-radius:50%;background:#E3F1EC;color:var(--ps-teal);font-size:26px;font-weight:800;line-height:1;cursor:pointer;box-shadow:0 3px 0 #9CC9BC;}'
  + '.ps-netbox{display:flex;align-items:center;justify-content:center;width:100%;height:100%;} .ps-net{display:block;overflow:visible;max-width:100%;}'
  + '.ps-fg{cursor:pointer;transform-box:view-box;outline:none;} .ps-face{stroke:#2A2A35;stroke-width:2.5;stroke-linejoin:round;} .ps-fg:focus-visible .ps-face{stroke:var(--ps-teal);stroke-width:5;}'
  + '.ps-fg.is-wobble{animation:ps-wob .35s ease-in-out 3;} @keyframes ps-wob{25%{transform:rotate(-3deg);}75%{transform:rotate(3deg);}}'
  + '.ps-mark circle{fill:none;stroke:#5B4BA0;stroke-width:3;} .ps-mark path{fill:none;stroke:#5B4BA0;stroke-width:2.5;opacity:.8;} .ps-num{fill:#5B4BA0;font-weight:800;font-size:18px;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);}'
  + '.ps-chiprow{display:flex;align-items:center;justify-content:center;gap:8px;} .ps-pad{width:56px;height:56px;flex:none;} .ps-pad svg{width:100%;height:100%;} .ps-padbase{fill:#5B4BA0;} .ps-stamphandle{fill:#A9773F;stroke:#2A2A35;stroke-width:2;} .ps-stampfoot{fill:#2A2A35;}'
  + '.ps-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:4px;} .is-narrow .ps-chips{max-width:calc(var(--ps-chip) * 5 + 16px);}'
  + '.ps-chip{width:var(--ps-chip);height:var(--ps-chip);border:0;border-radius:10px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #C9B897,0 2px 0 #C9B897;font-weight:800;font-size:22px;line-height:1;color:var(--ps-ink);font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);cursor:pointer;} .ps-chip.is-on{background:var(--ps-teal);color:#fff;box-shadow:0 2px 0 #0B4A40;} .ps-chip:disabled{cursor:default;}'
  + '.ps-note{min-height:28px;font:700 18px/1.3 var(--lcs-font-body,Nunito,sans-serif);color:var(--ps-ink);text-align:center;flex:1;} .ps-note:empty{display:none;} .ps-note.is-ok{color:var(--ps-teal);font-weight:800;} .ps-note.is-wrong{color:#A6461F;} .is-narrow .ps-note{font-size:15px;text-align:left;}'
  + '.ps-ask{display:flex;align-items:center;justify-content:center;gap:10px;}'
  + '.ps-check{min-height:48px;padding:0 24px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;line-height:1;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .ps-check[hidden]{display:none;} .ps-check:disabled{opacity:.5;}'
  + '.ps-it:focus-visible,.ps-tray:focus-visible,.ps-tab:focus-visible,.ps-turn:focus-visible,.ps-chip:focus-visible,.ps-check:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '@media (prefers-reduced-motion: reduce){.ps-wrap *{animation:none !important;transition:none !important;}}';
  var el = document.createElement('style'); el.id = 'ps-css'; el.textContent = css; document.head.appendChild(el);
  var defs = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><radialGradient id="ps-sph" cx="35%" cy="35%" r="70%"><stop offset="0" stop-color="#FDE3D1"/><stop offset="1" stop-color="#E8806E"/></radialGradient></defs></svg>';
  document.body.insertAdjacentHTML('beforeend', defs);
}

if (typeof window !== 'undefined') window.PostSlotActivity = PostSlotActivity;
