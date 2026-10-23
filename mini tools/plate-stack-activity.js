/* =====================================================================
   plate-stack-activity.js — ACTIVITY #75 of the one-by-one rebuild:
   "Daisy's Plate Stack" → THE ENDING THAT ARRIVES WITH THE SECOND PLATE
   (L.K.1.c, 11 locales). Design sheet: docs/activities-rebuild/designs/075-daisy-plate-stack.md
   ---------------------------------------------------------------------
   THE INVENTION: number and ending are coupled by the apparatus. Tap the
   pile and a plate (or, for an animal customer, a stool) lands on the
   stand with the round's library picture on it; the moment the SECOND one
   lands, the word on the bench slides its ending slot open — it needs an
   ending tile now. Back to one and the ending has to come off: a tile left
   in the slot rattles. A word that changes inside has no slot: its card
   flips (the flip tile). The order goes out with a bell.
   ACTIVITY LAYER ONLY: the model is plate-stack-core.js; pictures through
   lcs-pictures.js; lcs-shell.js untouched (the shell's Check is hidden and
   pressed by this activity on success). Test seams:
   window.PlateStackActivity.st / ._pool / ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var PlateStackActivity = {
  id: 'plate-stack',
  apparatusClasses: ['ps-'],

  strings: {
    title:       {en:'Daisy\'s Plate Stack',de:'Daisys Tellerstapel',nl:'De bordenstapel van Daisy',da:'Daisys tallerkenstabel',sv:'Daisys tallriksstapel',no:'Daisys tallerkenstabel',es:'La pila de platos de Daisy',it:'La pila di piatti di Daisy',pt:'A pilha de pratos da Daisy',fr:'La pile d’assiettes de Daisy',fi:'Daisyn lautaspino'},
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    tBuild:      {en:'Fill the order on the ticket, then finish the word.',de:'Mach die Bestellung auf dem Zettel fertig, dann das Wort.',nl:'Maak de bestelling op het bonnetje klaar en maak dan het woord af.',da:'Gør bestillingen på sedlen klar, og gør så ordet færdigt.',sv:'Gör i ordning beställningen på lappen och gör sedan klart ordet.',no:'Gjør klar bestillingen på lappen, og gjør så ordet ferdig.',es:'Prepara el pedido de la nota y luego termina la palabra.',it:'Prepara l’ordine del biglietto, poi completa la parola.',pt:'Prepare o pedido da comanda e depois termine a palavra.',fr:'Prépare la commande du ticket, puis termine le mot.',fi:'Tee lapun tilaus valmiiksi ja täydennä sitten sana.'},
    tBack:       {en:'Make it just one again.',de:'Mach wieder nur eins daraus.',nl:'Maak er weer één van.',da:'Gør det til kun én igen.',sv:'Gör det till bara en igen.',no:'Gjør det til bare én igjen.',es:'Vuelve a dejar solo uno.',it:'Fanne di nuovo uno solo.',pt:'Deixe só um de novo.',fr:'Remets-en un seul.',fi:'Tee siitä taas vain yksi.'},
    tSentence:   {en:'Read the order, fill it, then finish the word.',de:'Lies die Bestellung, mach sie fertig, dann das Wort.',nl:'Lees de bestelling, maak hem klaar en maak dan het woord af.',da:'Læs bestillingen, gør den klar, og gør så ordet færdigt.',sv:'Läs beställningen, gör den i ordning och gör sedan klart ordet.',no:'Les bestillingen, gjør den klar, og gjør så ordet ferdig.',es:'Lee el pedido, prepáralo y luego termina la palabra.',it:'Leggi l’ordine, preparalo, poi completa la parola.',pt:'Leia o pedido, prepare-o e depois termine a palavra.',fr:'Lis la commande, prépare-la, puis termine le mot.',fi:'Lue tilaus, tee se valmiiksi ja täydennä sitten sana.'},
    check:       {en:'Check',de:'Prüfen',nl:'Controleren',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    hEmpty:      {en:'Look at the ticket. How many does the order need?',de:'Schau auf den Zettel. Wie viele braucht die Bestellung?',nl:'Kijk op het bonnetje. Hoeveel heeft de bestelling nodig?',da:'Se på sedlen. Hvor mange skal der bruges til bestillingen?',sv:'Titta på lappen. Hur många behövs till beställningen?',no:'Se på lappen. Hvor mange trenger bestillingen?',es:'Mira la nota. ¿Cuántos necesita el pedido?',it:'Guarda il biglietto. Quanti ne servono per l’ordine?',pt:'Olhe a comanda. De quantos o pedido precisa?',fr:'Regarde le ticket. Combien en faut-il pour la commande ?',fi:'Katso lappua. Montako tilaukseen tarvitaan?'},
    hEmptyBack:  {en:'The ticket says just one. Take some off.',de:'Auf dem Zettel steht nur eins. Nimm welche weg.',nl:'Op het bonnetje staat er maar één. Haal er een paar af.',da:'Der står kun én på sedlen. Tag nogle af.',sv:'På lappen står det bara en. Ta bort några.',no:'Det står bare én på lappen. Ta bort noen.',es:'La nota dice solo uno. Quita algunos.',it:'Sul biglietto ce n’è uno solo. Togline qualcuno.',pt:'A comanda diz só um. Tire alguns.',fr:'Le ticket n’en demande qu’un. Enlèves-en.',fi:'Lapussa on vain yksi piste. Ota niitä pois.'},
    hCount:      {en:'Count again: the shelf needs as many as the ticket shows.',de:'Zähl noch mal: Auf das Regal gehören so viele, wie der Zettel zeigt.',nl:'Tel nog eens: er moeten er evenveel op de plank staan als op het bonnetje.',da:'Tæl igen: Der skal være lige så mange på hylden, som sedlen viser.',sv:'Räkna igen: Det ska vara lika många på hyllan som lappen visar.',no:'Tell igjen: Det skal være like mange på hylla som lappen viser.',es:'Cuenta otra vez: en el estante van tantos como dice la nota.',it:'Conta di nuovo: sulla mensola ne servono tanti quanti dice il biglietto.',pt:'Conte de novo: na prateleira vão tantos quantos a comanda mostra.',fr:'Compte encore : il en faut autant sur l’étagère que sur le ticket.',fi:'Laske uudestaan: hyllylle tulee yhtä monta kuin lapussa on pisteitä.'},
    hNoEnding:   {en:'More than one! The word needs its ending.',de:'Mehr als eins! Das Wort braucht seine Endung.',nl:'Meer dan één! Het woord heeft zijn uitgang nodig.',da:'Mere end én! Ordet skal have sin endelse.',sv:'Fler än en! Ordet behöver sin ändelse.',no:'Flere enn én! Ordet trenger endelsen sin.',es:'¡Más de uno! La palabra necesita su terminación.',it:'Più di uno! La parola deve cambiare desinenza.',pt:'Mais de um! A palavra precisa da terminação.',fr:'Plus d’un ! Le mot a besoin de sa marque du pluriel.',fi:'Enemmän kuin yksi! Sana tarvitsee päätteen.'},
    hBeats:      {en:'Say it slowly and count the beats. The dots show how many the word has.',de:'Sprich es langsam und klatsch die Silben. Die Punkte zeigen, wie viele das Wort hat.',nl:'Zeg het langzaam en klap de lettergrepen. De stippen laten zien hoeveel het woord er heeft.',da:'Sig det langsomt, og klap stavelserne. Prikkerne viser, hvor mange ordet har.',sv:'Säg det långsamt och klappa stavelserna. Prickarna visar hur många ordet har.',no:'Si det sakte, og klapp stavelsene. Prikkene viser hvor mange ordet har.',es:'Dilo despacio y cuenta las sílabas. Los puntos muestran cuántas tiene la palabra.',it:'Dillo piano e conta le sillabe. I puntini mostrano quante ne ha la parola.',pt:'Fale devagar e conte as sílabas. Os pontos mostram quantas a palavra tem.',fr:'Dis-le lentement et compte les syllabes. Les points montrent combien le mot en a.',fi:'Sano se hitaasti ja taputa tavut. Pisteet näyttävät, montako tavua sanassa on.'},
    hWrong:      {en:'Say the word slowly. Which ending sounds right?',de:'Sprich das Wort langsam. Welche Endung klingt richtig?',nl:'Zeg het woord langzaam. Welke uitgang klinkt goed?',da:'Sig ordet langsomt. Hvilken endelse lyder rigtig?',sv:'Säg ordet långsamt. Vilken ändelse låter rätt?',no:'Si ordet sakte. Hvilken endelse høres riktig ut?',es:'Di la palabra despacio. ¿Qué terminación suena bien?',it:'Di’ la parola piano. Quale desinenza suona giusta?',pt:'Fale a palavra devagar. Qual terminação soa certa?',fr:'Regarde bien la fin du mot. Quelle marque du pluriel lui va ?',fi:'Sano sana hitaasti. Mikä pääte kuulostaa oikealta?'},
    hChanges:    {en:'An ending alone is not enough here. The word itself changes.',de:'Hier reicht eine Endung allein nicht. Das Wort selbst verändert sich.',nl:'Alleen een uitgang erachter is niet genoeg. Het woord verandert zelf ook.',da:'Her er en endelse ikke nok. Selve ordet ændrer sig.',sv:'Här räcker det inte med en ändelse. Själva ordet ändras.',no:'Her holder det ikke med en endelse. Selve ordet endrer seg.',es:'Esta palabra no lleva solo una terminación: además cambia al escribirse.',it:'Qui non basta cambiare la desinenza: la parola cambia anche dentro.',pt:'Aqui não basta pôr uma terminação: a própria palavra muda.',fr:'Ce mot ne prend pas juste un s ou un x : sa fin change.',fi:'Pelkkä pääte ei riitä: sana muuttuu myös sisältä.'},
    hStillOn:    {en:'Only one now. Take the ending off.',de:'Jetzt nur noch eins. Nimm die Endung ab.',nl:'Nu nog maar één. Haal de uitgang eraf.',da:'Nu er der kun én. Tag endelsen af.',sv:'Nu är det bara en. Ta bort ändelsen.',no:'Nå er det bare én. Ta av endelsen.',es:'Ahora solo hay uno. Quita la terminación.',it:'Ora ce n’è uno solo. Togli la desinenza del plurale.',pt:'Agora só tem um. Tire a terminação.',fr:'Il n’en reste qu’un. Enlève la marque du pluriel.',fi:'Nyt on vain yksi. Ota pääte pois.'},
    hMiss2:      {en:'Try the tile that is glowing.',de:'Probier das Plättchen, das leuchtet.',nl:'Probeer het tegeltje dat oplicht.',da:'Prøv brikken, der lyser.',sv:'Prova brickan som lyser.',no:'Prøv brikken som lyser.',es:'Prueba la ficha que brilla.',it:'Prova la tessera che brilla.',pt:'Experimente a peça que está brilhando.',fr:'Essaie la tuile qui brille.',fi:'Kokeile laattaa, joka hehkuu.'},
    nOne:        {en:'With just one, the word needs no ending.',de:'Mit nur einem braucht das Wort keine Endung.',nl:'Met maar één heeft het woord geen uitgang nodig.',da:'Med kun én skal ordet ikke have nogen endelse.',sv:'Med bara en behöver ordet ingen ändelse.',no:'Med bare én trenger ordet ingen endelse.',es:'Con uno solo, la palabra no necesita terminación.',it:'Con uno solo, la parola tiene la sua vocale finale.',pt:'Com um só, a palavra não precisa de terminação.',fr:'Avec un seul, le mot n’a pas besoin de marque du pluriel.',fi:'Kun on vain yksi, sana ei tarvitse päätettä.'},
    nChanges:    {en:'This word has no ending slot. The word itself changes.',de:'Dieses Wort hat keinen Platz für eine Endung. Das Wort selbst verändert sich.',nl:'Dit woord heeft geen plek voor een uitgang. Het woord verandert zelf ook.',da:'Dette ord har ingen plads til en endelse. Selve ordet ændrer sig.',sv:'Det här ordet har ingen plats för en ändelse. Själva ordet ändras.',no:'Dette ordet har ingen plass til en endelse. Selve ordet endrer seg.',es:'Esta palabra no tiene hueco para una terminación: cambia al escribirse.',it:'Questa parola non ha posto per una desinenza: cambia anche dentro.',pt:'Esta palavra não tem espaço para uma terminação: a própria palavra muda.',fr:'Ce mot n’a pas de place pour une marque du pluriel : sa fin change.',fi:'Tässä sanassa ei ole paikkaa pelkälle päätteelle: sana muuttuu myös sisältä.'},
    nSame:       {en:'This word stays the same.',de:'Dieses Wort bleibt gleich.',nl:'Dit woord blijft hetzelfde.',da:'Dette ord forbliver det samme.',sv:'Det här ordet förblir detsamma.',no:'Dette ordet forblir det samme.',es:'Esta palabra se queda igual.',it:'Questa parola resta uguale.',pt:'Esta palavra continua igual.',fr:'Ce mot ne change pas.',fi:'Tämä sana pysyy samana.'},
    nNoChange:   {en:'Here the word itself does not change. It only needs an ending.',de:'Hier verändert sich das Wort selbst nicht. Es braucht nur eine Endung.',nl:'Hier verandert het woord zelf niet. Het heeft alleen een uitgang nodig.',da:'Her ændrer selve ordet sig ikke. Det skal bare have en endelse.',sv:'Här ändras inte själva ordet. Det behöver bara en ändelse.',no:'Her endrer ikke selve ordet seg. Det trenger bare en endelse.',es:'Aquí la palabra no cambia: solo necesita una terminación.',it:'Qui la parola non cambia dentro: le basta cambiare desinenza.',pt:'Aqui a palavra não muda: só precisa de uma terminação.',fr:'Ici, la fin du mot ne change pas : il lui faut seulement une marque du pluriel.',fi:'Tässä sana itse ei muutu. Se tarvitsee vain päätteen.'},
    okAdd:       {en:'More than one, so the word gets its ending: {w}!',de:'Mehr als eins, also bekommt das Wort seine Endung: {w}!',nl:'Meer dan één, dus krijgt het woord zijn uitgang: {w}!',da:'Mere end én, så ordet får sin endelse: {w}!',sv:'Fler än en, så ordet får sin ändelse: {w}!',no:'Flere enn én, så ordet får endelsen sin: {w}!',es:'Más de uno, así que la palabra lleva su terminación: ¡{w}!',it:'Più di uno, quindi la parola cambia desinenza: {w}!',pt:'Mais de um, então a palavra ganha a terminação: {w}!',fr:'Plus d’un, alors le mot prend sa marque du pluriel : {w} !',fi:'Enemmän kuin yksi, joten sana saa päätteen: {w}!'},
    okFlip:      {en:'More than one, and this word changes: {w}!',de:'Mehr als eins, und dieses Wort verändert sich: {w}!',nl:'Meer dan één, en dit woord verandert zelf ook: {w}!',da:'Mere end én, og selve ordet ændrer sig: {w}!',sv:'Fler än en, och själva ordet ändras: {w}!',no:'Flere enn én, og selve ordet endrer seg: {w}!',es:'Más de uno, y esta palabra cambia al escribirse: ¡{w}!',it:'Più di uno, e questa parola cambia anche dentro: {w}!',pt:'Mais de um, e a própria palavra muda: {w}!',fr:'Plus d’un, et la fin de ce mot change : {w} !',fi:'Enemmän kuin yksi, ja sana muuttuu myös sisältä: {w}!'},
    okSame:      {en:'{w} stays {w}: no ending at all!',de:'{w} bleibt {w}: ganz ohne Endung!',nl:'{w} blijft {w}: helemaal zonder uitgang!',da:'{w} er stadig {w}: helt uden endelse!',sv:'{w} förblir {w}: helt utan ändelse!',no:'{w} forblir {w}: helt uten endelse!',es:'{w} sigue siendo {w}: ¡sin terminación!',it:'{w} resta {w}: la desinenza non cambia!',pt:'{w} continua {w}: sem terminação nenhuma!',fr:'{w} reste {w} : pas de marque du pluriel !',fi:'{w} pysyy sanana {w}: ei päätettä lainkaan!'},
    okBack:      {en:'Just one, so the ending comes off: {w}!',de:'Nur eins, also kommt die Endung ab: {w}!',nl:'Maar één, dus de uitgang gaat eraf: {w}!',da:'Kun én, så endelsen kommer af: {w}!',sv:'Bara en, så ändelsen tas bort: {w}!',no:'Bare én, så endelsen tas av: {w}!',es:'Solo uno, así que la terminación se va: ¡{w}!',it:'Uno solo, quindi torna la desinenza del singolare: {w}!',pt:'Só um, então a terminação sai: {w}!',fr:'Un seul, alors la marque du pluriel s’en va : {w} !',fi:'Vain yksi, joten pääte lähtee pois: {w}!'},
    setLevel:    {en:'Words',de:'Wörter',nl:'Woorden',da:'Ord',sv:'Ord',no:'Ord',es:'Palabras',it:'Parole',pt:'Palavras',fr:'Mots',fi:'Sanat'},
    l1:          {en:'First words',de:'Erste Wörter',nl:'Eerste woorden',da:'De første ord',sv:'De första orden',no:'De første ordene',es:'Primeras palabras',it:'Prime parole',pt:'Primeiras palavras',fr:'Premiers mots',fi:'Ensimmäiset sanat'},
    l2:          {en:'s or es?',de:'Welche Endung?',nl:'Welke uitgang?',da:'Hvilken endelse?',sv:'Vilken ändelse?',no:'Hvilken endelse?',es:'¿s o es?',it:'i oppure e?',pt:'s ou es?',fr:'s ou x ?',fi:'Mikä pääte?'},
    l3:          {en:'Words that change',de:'Wörter, die sich verändern',nl:'Woorden die veranderen',da:'Ord, der ændrer sig',sv:'Ord som ändras',no:'Ord som endrer seg',es:'Palabras que cambian al escribirse',it:'Parole che cambiano',pt:'Palavras que mudam',fr:'Mots qui changent',fi:'Sanat, jotka muuttuvat'},
    l4:          {en:'Back to one',de:'Zurück zu eins',nl:'Terug naar één',da:'Tilbage til én',sv:'Tillbaka till en',no:'Tilbake til én',es:'De vuelta a uno',it:'Di nuovo uno',pt:'De volta a um',fr:'Retour à un',fi:'Takaisin yhteen'},
    l5:          {en:'Sentences',de:'Sätze',nl:'Zinnen',da:'Sætninger',sv:'Meningar',no:'Setninger',es:'Oraciones',it:'Frasi',pt:'Frases',fr:'Phrases',fi:'Lauseet'},
    setAnswer:   {en:'Answer',de:'Antwort',nl:'Antwoord',da:'Svar',sv:'Svar',no:'Svar',es:'Respuesta',it:'Risposta',pt:'Resposta',fr:'Réponse',fi:'Vastaus'},
    aTiles:      {en:'Ending tiles',de:'Endungsplättchen',nl:'Uitgangtegels',da:'Endelsesbrikker',sv:'Ändelsebrickor',no:'Endelsesbrikker',es:'Fichas de terminación',it:'Tessere delle desinenze',pt:'Peças de terminação',fr:'Tuiles du pluriel',fi:'Päätelaatat'},
    aWrite:      {en:'Write it',de:'Selbst schreiben',nl:'Zelf schrijven',da:'Skriv selv',sv:'Skriv själv',no:'Skriv selv',es:'Escríbela',it:'Scrivila tu',pt:'Escreva você',fr:'Écris-la',fi:'Kirjoita itse'},
    ariaStand:   {en:'Shelf with {n}: {noun}',de:'Regal mit {n}: {noun}',nl:'Plank met {n}: {noun}',da:'Hylde med {n}: {noun}',sv:'Hylla med {n}: {noun}',no:'Hylle med {n}: {noun}',es:'Estante con {n}: {noun}',it:'Mensola con {n}: {noun}',pt:'Prateleira com {n}: {noun}',fr:'Étagère avec {n} : {noun}',fi:'Hylly, jossa {n}: {noun}'},
    ariaPile:    {en:'Add one to the shelf',de:'Eins aufs Regal stellen',nl:'Er een op de plank zetten',da:'Sæt én mere på hylden',sv:'Ställ en till på hyllan',no:'Sett én til på hylla',es:'Poner uno más en el estante',it:'Metti uno in più sulla mensola',pt:'Pôr mais um na prateleira',fr:'En mettre un de plus sur l’étagère',fi:'Lisää yksi hyllylle'},
    ariaTop:     {en:'Take one off the shelf',de:'Eins vom Regal nehmen',nl:'Er een van de plank halen',da:'Tag én af hylden',sv:'Ta bort en från hyllan',no:'Ta én av hylla',es:'Quitar uno del estante',it:'Togli uno dalla mensola',pt:'Tirar um da prateleira',fr:'En enlever un de l’étagère',fi:'Ota yksi pois hyllyltä'},
    ariaWord:    {en:'Word: {w}. The ending slot is {s}.',de:'Wort: {w}. Der Platz für die Endung ist {s}.',nl:'Woord: {w}. De plek voor de uitgang is {s}.',da:'Ord: {w}. Pladsen til endelsen er {s}.',sv:'Ord: {w}. Platsen för ändelsen är {s}.',no:'Ord: {w}. Plassen til endelsen er {s}.',es:'Palabra: {w}. El hueco de la terminación está {s}.',it:'Parola: {w}. Il posto della desinenza è {s}.',pt:'Palavra: {w}. O espaço da terminação está {s}.',fr:'Mot : {w}. La place de la marque est {s}.',fi:'Sana: {w}. Päätteen paikka on {s}.'},
    sOpen:       {en:'open',de:'offen',nl:'open',da:'åben',sv:'öppen',no:'åpen',es:'abierto',it:'aperto',pt:'aberto',fr:'ouverte',fi:'auki'},
    sShut:       {en:'closed',de:'zu',nl:'dicht',da:'lukket',sv:'stängd',no:'lukket',es:'cerrado',it:'chiuso',pt:'fechado',fr:'fermée',fi:'kiinni'},
    ariaTile:    {en:'Ending tile {t}',de:'Endungsplättchen {t}',nl:'Uitgangtegel {t}',da:'Endelsesbrik {t}',sv:'Ändelsebricka {t}',no:'Endelsesbrikke {t}',es:'Ficha de terminación {t}',it:'Tessera della desinenza {t}',pt:'Peça de terminação {t}',fr:'Tuile du pluriel {t}',fi:'Päätelaatta {t}'},
    ariaFlip:    {en:'Flip tile: the word changes inside',de:'Wendeplättchen: Das Wort verändert sich innen',nl:'Draaitegel: het woord verandert vanbinnen',da:'Vendebrik: Ordet ændrer sig indeni',sv:'Vändbricka: ordet ändras inuti',no:'Snubrikke: Ordet endrer seg inni',es:'Ficha para voltear: la palabra cambia por dentro',it:'Tessera da girare: la parola cambia dentro',pt:'Peça de virar: a palavra muda por dentro',fr:'Tuile à retourner : le mot change à l’intérieur',fi:'Kääntölaatta: sana muuttuu sisältä'},
    ariaNone:    {en:'Empty tile: no ending',de:'Leeres Plättchen: keine Endung',nl:'Leeg tegeltje: geen uitgang',da:'Tom brik: ingen endelse',sv:'Tom bricka: ingen ändelse',no:'Tom brikke: ingen endelse',es:'Ficha vacía: sin terminación',it:'Tessera vuota: nessuna desinenza',pt:'Peça vazia: sem terminação',fr:'Tuile vide : pas de marque',fi:'Tyhjä laatta: ei päätettä'},
    ariaTicket:  {en:'Ticket: {n}',de:'Zettel: {n}',nl:'Bonnetje: {n}',da:'Seddel: {n}',sv:'Lapp: {n}',no:'Lapp: {n}',es:'Nota: {n}',it:'Biglietto: {n}',pt:'Comanda: {n}',fr:'Ticket : {n}',fi:'Lappu: {n}'},
    ariaBack:    {en:'Rub out a letter',de:'Einen Buchstaben löschen',nl:'Een letter weghalen',da:'Slet et bogstav',sv:'Sudda en bokstav',no:'Slett en bokstav',es:'Borrar una letra',it:'Cancella una lettera',pt:'Apagar uma letra',fr:'Effacer une lettre',fi:'Pyyhi kirjain'}
  },

  defaults: { level: 'l1', answer: 'tiles' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'l1', labelKey: 'l1' }, { value: 'l2', labelKey: 'l2' }, { value: 'l3', labelKey: 'l3' }, { value: 'l4', labelKey: 'l4' }, { value: 'l5', labelKey: 'l5' }] },
    { key: 'answer', type: 'choice', labelKey: 'setAnswer', options: [{ value: 'tiles', labelKey: 'aTiles' }, { value: 'write', labelKey: 'aWrite' }] }
  ],

  OK_MS: 2600, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._pics = {}; this._served = 0;
    injectPlateCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st && this.st.answer !== this._answer()) { if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return PlateStackCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return PlateStackCore.levelOf(this._setting('level')); },
  _answer: function () { return PlateStackCore.answerOf(this._setting('answer')); },
  _key: function () { return this._loc() + '/' + this._level(); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = PlateStackCore.ids(this._loc(), this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = PlateStackCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice();
      this._order = C.plan(this._loc(), this._level(), Math.random, prev); this._orderForPool = pool;
      this._pass = pass;
    }
    var idx = this._order[pos], r = C.round(this._loc(), this._level(), idx);
    var pa = { msg: this._taskLine(r) }; this._pa = pa;
    return {
      id: 'plates.' + this._loc() + '.' + r.id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function (r) { return this._t(r.back ? 'tBack' : r.level === 'l5' ? 'tSentence' : 'tBuild'); },
  _start: function (idx) {
    var C = PlateStackCore, r = C.round(this._loc(), this._level(), idx);
    this._clearTimers(); this._busy = false; this._view = {};
    this.st = C.newState(r, this._answer());
    if (this._pa) this._pa.msg = this._taskLine(r);
    var el = document.querySelector('.lcs-activity-prompt-text'); if (el) el.textContent = this._taskLine(r);
    this._loadPic(r.theme);
  },
  _loadPic: function (dir) {
    var self = this;
    if (this._pics[dir] || typeof LCSPictures === 'undefined') return;
    LCSPictures.load(dir).then(function (th) { self._pics[dir] = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {});
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = PlateStackCore; this.st = C.newState(C.round(this._loc(), this._level(), 0), this._answer()); this._loadPic(this.st.r.theme); }
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
    var wrap = api.el('div', 'ps-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<p class="ps-sentence"></p><div class="ps-main"><div class="ps-side"><div class="ps-ticket"></div><button type="button" class="ps-pile" data-k="pile"></button><div class="ps-served" aria-hidden="true"></div></div><div class="ps-standbox"></div></div><div class="ps-bench"></div><div class="ps-beats" aria-hidden="true"></div><div class="ps-tray"></div><p class="ps-note" aria-live="polite"></p><div class="ps-row"><button type="button" class="ps-check" data-k="check"></button></div>';
    this._q = function (s) { return wrap.querySelector(s); };
    this._q('.ps-pile').addEventListener('click', function () { self._add(); });
    this._q('.ps-check').addEventListener('click', function () { self._check(); });
    wrap.addEventListener('keydown', function (ev) {
      if (ev.target && ev.target.tagName === 'BUTTON' && (ev.key === 'Enter' || ev.key === ' ')) return;
      if (ev.key === '+') { ev.preventDefault(); self._add(); } else if (ev.key === '-') { ev.preventDefault(); self._remove(); }
      else if (ev.key === 'Backspace') { ev.preventDefault(); if (PlateStackCore.writes(self.st)) self._type('⌫'); else self._pull(); }
      else if (ev.key === 'Enter') { ev.preventDefault(); self._check(); }
      else if (ev.key.length === 1 && PlateStackCore.writes(self.st) && PlateStackCore.keys(self._loc()).indexOf(ev.key.toLowerCase()) >= 0) { ev.preventDefault(); self._type(ev.key.toLowerCase()); }
    });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx || this._wrap).focus(); }
  },
  _paint_: function () {
    if (!this._wrap) return;
    var C = PlateStackCore, st = this.st, r = st.r, L = this._L = C.layout(this._width()), v = this._view, loc = this._loc();
    this._wrap.className = 'ps-wrap is-' + L.mode + (L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + r.holder;
    this._wrap.style.setProperty('--ps-pic', L.pic + 'px');
    this._wrap.style.setProperty('--ps-tile', L.tile + 'px');
    this._paintSentence();
    this._paintTicket();
    this._paintPile();
    this._paintStand();
    this._paintBench();
    this._paintTray();
    var h = C.hint(st), msg = '';
    if (v.msg) msg = v.msg; else if (v.flash) msg = this._t(v.flash); else if (h) msg = this._t(h);
    var note = this._q('.ps-note'); note.textContent = msg;
    note.className = 'ps-note' + (st.done ? ' is-ok' : (h && h !== 'hEmpty' && h !== 'hEmptyBack') || v.flash ? ' is-hint' : '');
    var chk = this._q('.ps-check'); chk.textContent = this._t('check'); chk.disabled = !!this._busy || st.done;
    var beats = this._q('.ps-beats'); beats.innerHTML = '';
    if (st.last && st.last.reason === 'beats' && !st.done) {
      var want = C.beats(r.plural), got = C.beats(C.word(st)), s = '';
      for (var i = 0; i < want; i++) s += '<span class="ps-beat"></span>';
      beats.innerHTML = '<span class="ps-beatrow">' + s + '</span>';
      beats.setAttribute('data-want', want); beats.setAttribute('data-got', got);
    }
  },
  _paintSentence: function () {
    var st = this.st, r = st.r, el = this._q('.ps-sentence');
    if (!r.sentence) { el.className = 'ps-sentence is-off'; el.innerHTML = ''; return; }
    var parts = r.sentence.split('___'), w = PlateStackCore.show(this._loc(), PlateStackCore.word(st));
    if (parts[0] === '' && this._loc() !== 'de') w = w.charAt(0).toLocaleUpperCase() + w.slice(1);
    el.className = 'ps-sentence';
    el.innerHTML = esc(parts[0]) + '<span class="ps-gap' + (st.done ? ' is-ok' : '') + '">' + esc(w) + '</span>' + esc(parts[1] || '');
  },
  _paintTicket: function () {
    var st = this.st, r = st.r, el = this._q('.ps-ticket'), n = r.target, fi = this._loc() === 'fi', s = '';
    for (var i = 0; i < n; i++) s += '<span class="ps-tdot"></span>';
    el.className = 'ps-ticket' + (st.done ? ' is-stamped' : '') + (st.last && st.last.reason === 'count' ? ' is-pulse' : '');
    el.setAttribute('role', 'img'); el.setAttribute('aria-label', this._t('ariaTicket', { n: n }));
    el.innerHTML = '<span class="ps-clip"></span>' + (fi ? '' : '<b class="ps-tnum">' + n + '</b>') + '<span class="ps-tdots">' + s + '</span>' + (st.done ? '<span class="ps-stamp">✓</span>' : '');
  },
  _paintPile: function () {
    var st = this.st, el = this._q('.ps-pile'), stool = st.r.holder === 'stool', s = '<svg viewBox="0 0 100 70" aria-hidden="true">';
    for (var i = 0; i < 4; i++) s += stool ? '<g transform="translate(' + (6 + i * 7) + ' ' + (44 - i * 12) + ')">' + stoolSvg(60) + '</g>' : '<g transform="translate(12 ' + (52 - i * 11) + ')">' + plateSvg(76) + '</g>';
    el.innerHTML = s + '</svg>';
    el.setAttribute('aria-label', this._t('ariaPile')); el.disabled = st.done || st.holders >= PlateStackCore.MAXH;
  },
  /* the stand: one holder per order item, each with the round's library picture on it; plates stack up, stools climb a stepped counter */
  _paintStand: function () {
    var C = PlateStackCore, st = this.st, r = st.r, L = this._L, box = this._q('.ps-standbox'), self = this, stool = r.holder === 'stool';
    var th = this._pics[r.theme], dx = Math.round(L.pic * 0.55), pw = Math.round(L.pic * 1.08), bh = Math.round(pw * 0.26);
    var W = pw + (C.MAXH - 1) * dx + 24, H = (C.MAXH - 1) * L.step + L.pic + bh + 10, room = L.W - L.side - 24;
    if (W > room) { dx = Math.max(6, Math.floor((room - pw - 24) / (C.MAXH - 1))); W = pw + (C.MAXH - 1) * dx + 24; }
    box.style.height = H + 'px'; box.style.width = W + 'px';
    box.setAttribute('role', 'group'); box.setAttribute('aria-label', this._t('ariaStand', { n: st.holders, noun: th ? LCSPictures.label(th, r.key, this._loc(), { plural: st.holders > 1 }) : '' }));
    var key = [r.id, st.holders, L.mode, L.W, !!th, st.done].join('|');
    if (box._key === key) return;
    box._key = key; box.innerHTML = '';
    /* the apparatus: five steps with a ghost holder on each — a brass serving shelf for plates, the diner's stepped counter for stool customers */
    var g = '<svg class="ps-stage" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" aria-hidden="true">';
    var xOf = function (i) { return 12 + i * dx; }, yOf = function (i) { return H - 4 - i * L.step; };
    for (var k = 0; k < C.MAXH; k++) g += '<rect class="ps-step' + (stool ? '' : ' is-shelf') + '" x="' + (xOf(k) - 6) + '" y="' + (yOf(k) - 2) + '" width="' + (W - xOf(k) + 6) + '" height="' + (L.step + 2) + '" rx="4"/>';
    for (var j = st.holders; j < C.MAXH; j++) g += '<ellipse class="ps-ghost" cx="' + (xOf(j) + pw / 2) + '" cy="' + (yOf(j) - bh / 2) + '" rx="' + (pw / 2 - 4) + '" ry="' + (bh / 2 - 1) + '"/>';
    box.innerHTML = g + '</svg>';
    for (var i = 0; i < st.holders; i++) {
      var h = this.api.el('div', 'ps-holder' + (i === st.holders - 1 && i > 0 ? ' is-top' : '') + (i === st.holders - 1 && this._view.landed ? ' is-landed' : ''));
      h.style.left = xOf(i) + 'px'; h.style.bottom = (4 + i * L.step) + 'px'; h.style.width = pw + 'px'; h.style.zIndex = String(2 + i);
      var base = this.api.el('div', 'ps-base'); base.innerHTML = '<svg viewBox="0 0 100 26" aria-hidden="true">' + (stool ? stoolSvg(100) : plateSvg(100)) + '</svg>'; h.appendChild(base);
      if (th && th.nouns[r.key]) { var im = LCSPictures.img(th, r.key, this._loc(), { size: L.pic, plural: false }); im.className = 'ps-pic'; im.style.width = L.pic + 'px'; im.style.height = L.pic + 'px'; h.insertBefore(im, base); }
      if (i === st.holders - 1 && i > 0) { h.setAttribute('role', 'button'); h.setAttribute('tabindex', '0'); h.setAttribute('data-k', 'top'); h.setAttribute('aria-label', this._t('ariaTop')); h.addEventListener('click', function () { self._remove(); }); h.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); self._remove(); } }); }
      box.appendChild(h);
    }
  },
  /* the bench: the word in letter tiles; the ending slot opens with the second holder; a word that changes inside is one card that flips */
  _paintBench: function () {
    var C = PlateStackCore, st = this.st, r = st.r, L = this._L, el = this._q('.ps-bench'), self = this, loc = this._loc(), v = this._view;
    el.innerHTML = '';
    var w = C.show(loc, C.word(st)), len = Math.max(w.length, r.sing.length) + 2, tw = Math.max(18, Math.min(L.letter + 6, Math.floor((L.W - 24) / len) - 3));
    el.style.setProperty('--ps-lt', tw + 'px');
    var open = C.open(st), slot = C.slotText(st);
    el.setAttribute('role', 'group'); el.setAttribute('aria-label', this._t('ariaWord', { w: w, s: this._t(open ? 'sOpen' : 'sShut') }));
    if (r.cls === 'flip') {
      var card = this.api.el('div', 'ps-card' + (st.flipped ? ' is-flipped' : '') + (st.holders >= 2 && !st.flipped && !st.done ? ' is-edge' : '') + (v.flipAnim ? ' is-anim' : '') + (st.last && st.last.reason === 'changes' ? ' is-glow' : '') + (v.flash === 'nNoChange' ? '' : ''));
      w.split('').forEach(function (ch) { var t = self.api.el('span', 'ps-lt'); t.textContent = ch; card.appendChild(t); });
      card.appendChild(this.api.el('span', 'ps-fold'));
      el.appendChild(card);
      return;
    }
    var stem = C.show(loc, r.stem), row = this.api.el('div', 'ps-word' + (v.nochange ? ' is-spin' : ''));
    stem.split('').forEach(function (ch) { var t = self.api.el('span', 'ps-lt'); t.textContent = ch; row.appendChild(t); });
    var sl = this.api.el('span', 'ps-slot');
    if (slot === null) {
      sl.className = 'ps-slot is-shut';
      if (r.sEnd) { var e = this.api.el('span', 'ps-lt is-own'); e.textContent = C.show(loc, r.sEnd); sl.appendChild(e); }
    } else if (st.tile || (C.writes(st) && st.typed)) {
      var t = st.tile === 'none' ? '' : (C.writes(st) ? st.typed : st.tile.slice(2));
      sl.className = 'ps-slot is-full' + (st.holders < 2 ? ' is-rattle' : '') + (st.last && st.last.reason === 'stillOn' ? ' is-rattle' : '');
      var tile = this.api.el('button', 'ps-seated' + (st.tile === 'none' ? ' is-none' : '')); tile.type = 'button'; tile.setAttribute('data-k', 'seated');
      if (t) t.split('').forEach(function (ch) { var x = self.api.el('span', 'ps-lt is-end'); x.textContent = C.show(loc, ch); tile.appendChild(x); }); else tile.appendChild(this.api.el('span', 'ps-lt is-blank'));
      if (!C.writes(st)) tile.addEventListener('click', function () { self._pull(); });
      else tile.addEventListener('click', function () { self._type('⌫'); });
      sl.appendChild(tile);
    } else {
      sl.className = 'ps-slot is-open' + (st.last && st.last.reason === 'noEnding' ? ' is-pulse' : '');
      sl.appendChild(this.api.el('span', 'ps-hole'));
    }
    row.appendChild(sl);
    el.appendChild(row);
  },
  _paintTray: function () {
    var C = PlateStackCore, st = this.st, r = st.r, el = this._q('.ps-tray'), self = this, loc = this._loc();
    el.innerHTML = '';
    if (C.writes(st)) {
      el.className = 'ps-tray is-keys';
      C.keys(loc).concat(['⌫']).forEach(function (ch) {
        var b = self.api.el('button', 'ps-key' + (ch === '⌫' ? ' is-back' : '')); b.type = 'button'; b.textContent = ch === '⌫' ? '⌫' : C.show(loc, ch); b.setAttribute('data-k', 'key-' + ch);
        if (ch === '⌫') b.setAttribute('aria-label', self._t('ariaBack'));
        b.disabled = st.done || (ch !== '⌫' && st.holders < 2);
        if (st.help >= 2 && ch === r.pEnd.charAt(st.typed.length) && !st.done) b.className += ' is-help';
        b.addEventListener('click', function () { self._type(ch); });
        el.appendChild(b);
      });
      return;
    }
    el.className = 'ps-tray';
    r.tray.forEach(function (t, i) {
      var b = self.api.el('button', 'ps-tile'); b.type = 'button'; b.setAttribute('data-k', 'tile-' + i); b.setAttribute('data-tile', t);
      if (t === 'flip') { b.className += ' is-flip'; b.innerHTML = '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M30 14a11 11 0 1 0 2 10" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><path d="M33 7v8h-8" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'; b.setAttribute('aria-label', self._t('ariaFlip')); }
      else if (t === 'none') { b.className += ' is-none'; b.setAttribute('aria-label', self._t('ariaNone')); }
      else {
        var e = t.slice(2); b.textContent = C.show(loc, e); b.setAttribute('aria-label', self._t('ariaTile', { t: e }));
        /* the hump: this ending adds a beat to THIS word (peach → peach-es), never by looks alone */
        if (r.cls !== 'flip' && C.beats(r.stem + e) > C.beats(r.sing)) b.className += ' is-hump';
      }
      var inUse = st.tile === t;
      b.disabled = st.done || inUse;
      if (st.help >= 2 && t === r.right && !st.done) b.className += ' is-help';
      b.addEventListener('click', function () { self._drop(t); });
      el.appendChild(b);
    });
  },

  /* ---------------- the hand ---------------- */
  _add: function () { if (this._busy) return; var st = this.st; if (!PlateStackCore.add(st)) return; this._view = { landed: true }; this.api.sound(520 + st.holders * 60); this._paint(); },
  _remove: function () { if (this._busy) return; var res = PlateStackCore.remove(this.st); if (!res) return; this._view = res.rattle ? { flash: 'hStillOn' } : {}; this.api.sound(res.rattle ? 200 : 440); this._paint(); },
  _drop: function (t) {
    if (this._busy) return;
    var res = PlateStackCore.drop(this.st, t);
    if (res.seated) { this._view = res.flipped !== undefined ? { flipAnim: true } : {}; this.api.sound(660); }
    else { this._view = { flash: res.reason === 'one' ? 'nOne' : res.reason === 'changes' ? 'nChanges' : res.reason === 'nochange' ? 'nNoChange' : res.reason === 'same' ? 'nSame' : null, nochange: res.reason === 'nochange' }; this.api.sound(240); }
    this._paint();
  },
  _pull: function () { if (this._busy) return; if (PlateStackCore.pull(this.st)) { this._view = {}; this.api.sound(380); this._paint(); } },
  _type: function (ch) { if (this._busy) return; if (PlateStackCore.type(this.st, ch)) { this._view = {}; this.api.sound(600); this._paint(); } },
  _check: function () {
    if (this._busy || this.st.done) return;
    var C = PlateStackCore, st = this.st, res = C.check(st);
    this._view = {};
    if (!res.ok) { this.api.sound(st.last && (st.last.reason === 'empty' || st.last.reason === 'emptyBack') ? 460 : 220); this._paint(); this.api.announce(this._q('.ps-note').textContent || ''); return; }
    var self = this, pa = this._pa || {}, w = C.show(this._loc(), C.word(st));
    var msg = this._t(C.okKey(st), { w: w });
    this._served++; pa.msg = msg; this._view = { msg: msg };
    this.api.sound(1046); this._later(function () { self.api.sound(1318); }, this._ms(140));
    this._paint(); this._paintServed(); this.api.announce(msg);
    if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'word', text: w, lang: this.api.lang, rate: 0.95 }); } catch (e) {} }
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  },
  _paintServed: function () { var el = this._q('.ps-served'), s = ''; for (var i = 0; i < Math.min(this._served, 9); i++) s += '<span class="ps-sv"></span>'; el.innerHTML = s; }
};

function plateSvg(w) { return '<ellipse cx="' + (w / 2) + '" cy="12" rx="' + (w / 2 - 2) + '" ry="10" fill="#FFFEFB" stroke="#146B5E" stroke-width="2.6"/><ellipse cx="' + (w / 2) + '" cy="11" rx="' + (w / 2 - 16) + '" ry="5" fill="none" stroke="#9CC9BE" stroke-width="1.6"/>'; }
function stoolSvg(w) { var c = w / 2; return '<rect x="' + (c - 3) + '" y="10" width="6" height="14" rx="2" fill="#146B5E"/><rect x="' + (c - 16) + '" y="21" width="32" height="4" rx="2" fill="#146B5E"/><ellipse cx="' + c + '" cy="9" rx="' + (w / 2 - 6) + '" ry="8" fill="#F2784B" stroke="#B5461F" stroke-width="2.2"/>'; }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

var psCssDone = false;
function injectPlateCSS() {
  if (psCssDone || typeof document === 'undefined') return;
  psCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.ps-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;}'
  + '.ps-wrap:focus{outline:none;}'
  + '.ps-sentence{margin:0;padding:8px 14px;border-radius:14px;background:#FFFEFB;box-shadow:inset 0 0 0 2px #E2D6BE;font-family:' + B + ';font-weight:700;font-size:21px;line-height:1.4;color:#2A2A35;text-align:center;} .ps-sentence.is-off{display:none;}'
  + '.ps-gap{display:inline-block;min-width:3em;padding:0 3px;margin:0;border-bottom:3px solid #146B5E;color:#146B5E;font-weight:800;} .ps-gap.is-ok{background:#E6F4EF;border-radius:6px;}'
  + '.ps-main{display:flex;align-items:flex-end;justify-content:center;gap:14px;width:100%;}'
  + '.ps-side{display:flex;flex-direction:column;align-items:center;gap:10px;flex:0 0 auto;}'
  /* the ticket */
  + '.ps-ticket{position:relative;width:120px;min-height:86px;box-sizing:border-box;padding:16px 8px 8px;border-radius:6px;background:#FFFEFB;box-shadow:0 2px 0 #E2D6BE,inset 0 0 0 1.5px #E2D6BE;display:flex;flex-direction:column;align-items:center;gap:4px;transform:rotate(-2deg);}'
  + '.ps-clip{position:absolute;top:-8px;left:50%;width:30px;height:14px;margin-left:-15px;border-radius:4px;background:#C9A34A;box-shadow:inset 0 0 0 2px #8C6A26;}'
  + '.ps-tnum{font-family:' + H + ';font-weight:800;font-size:44px;line-height:1;color:#146B5E;}'
  + '.ps-tdots{display:flex;flex-wrap:wrap;justify-content:center;gap:4px;max-width:84px;} .ps-tdot{width:14px;height:14px;border-radius:50%;background:#F2784B;}'
  + '.ps-ticket.is-pulse{animation:psPulse .7s ease-in-out 2;} @keyframes psPulse{50%{box-shadow:0 0 0 5px rgba(242,120,75,.35),inset 0 0 0 1.5px #E2D6BE;}}'
  + '.ps-stamp{position:absolute;right:4px;bottom:2px;font-size:22px;color:#2FA56A;font-weight:900;transform:rotate(-14deg);animation:psStamp .3s ease-out;} @keyframes psStamp{from{transform:scale(2) rotate(-14deg);opacity:0;}}'
  /* the pile */
  + '.ps-pile{width:110px;height:78px;padding:0;border:0;border-radius:14px;background:#F6EFE6;box-shadow:inset 0 0 0 2px #E2D6BE,0 3px 0 #E2D6BE;cursor:pointer;} .ps-pile svg{width:100%;height:100%;display:block;} .ps-pile:disabled{opacity:.5;cursor:default;}'
  + '.ps-served{display:flex;flex-wrap:wrap;gap:3px;max-width:110px;justify-content:center;min-height:10px;} .ps-sv{width:14px;height:6px;border-radius:50%;background:#FFFEFB;box-shadow:0 0 0 1.6px #146B5E;}'
  /* the stand */
  + '.ps-standbox{position:relative;flex:0 0 auto;} .ps-stage{position:absolute;left:0;top:0;display:block;}'
  + '.ps-pole{fill:#D8B25A;stroke:#8C6A26;stroke-width:1.4;} .ps-foot{fill:#C9A34A;stroke:#8C6A26;stroke-width:1.4;} .ps-step{fill:#F3E2C4;stroke:#C9A46A;stroke-width:1.6;} .ps-step.is-shelf{fill:#EFE3C9;stroke:#B48C3E;}'
  + '.ps-ghost{fill:rgba(255,254,251,.5);stroke:#9CC9BE;stroke-width:2;stroke-dasharray:6 5;}'
  + '.ps-holder{position:absolute;display:flex;flex-direction:column;align-items:center;transition:bottom .2s ease-out;}'
  + '.ps-holder.is-top{cursor:pointer;} .ps-holder.is-top:focus-visible{outline:3px solid #146B5E;outline-offset:2px;border-radius:8px;}'
  + '.ps-holder.is-landed{animation:psLand .26s ease-out;} @keyframes psLand{from{transform:translateY(-28px);opacity:.3;}}'
  + '.ps-pic{display:block;object-fit:contain;margin-bottom:-6px;position:relative;z-index:1;}'
  + '.ps-base{width:108%;} .ps-base svg{width:100%;display:block;}'
  /* the bench */
  + '.ps-bench{display:flex;justify-content:center;min-height:calc(var(--ps-lt,40px) * 1.45);}'
  + '.ps-word,.ps-card{display:flex;align-items:flex-end;gap:3px;padding:8px 10px;border-radius:12px;background:#E8D2A8;box-shadow:inset 0 0 0 2px #B9965C,0 3px 0 #9C7B45;}'
  + '.ps-lt{display:inline-flex;align-items:center;justify-content:center;width:var(--ps-lt,40px);height:calc(var(--ps-lt,40px) * 1.35);border-radius:7px;background:#FFF4DE;box-shadow:inset 0 0 0 1.5px #C9A46A,0 2px 0 #B9965C;font-family:' + H + ';font-weight:700;font-size:calc(var(--ps-lt,40px) * .95);line-height:1;color:#2A2A35;}'
  + '.ps-lt.is-own{background:#FDE7DC;} .ps-lt.is-end{background:#DDF1EA;color:#146B5E;} .ps-lt.is-blank{background:transparent;box-shadow:inset 0 0 0 2px #146B5E;}'
  + '.ps-slot{display:inline-flex;gap:3px;transition:width .18s ease-out;} .ps-slot.is-shut:empty{width:0;}'
  + '.ps-hole{display:inline-block;width:calc(var(--ps-lt,40px) * 2 + 3px);height:calc(var(--ps-lt,40px) * 1.35);border-radius:8px;background:rgba(20,107,94,.08);box-shadow:inset 0 0 0 2.5px #146B5E;animation:psOpen .18s ease-out;} @keyframes psOpen{from{width:0;}}'
  + '.ps-slot.is-open .ps-hole{box-shadow:inset 0 0 0 2.5px #146B5E,0 0 12px rgba(47,165,106,.55);}'
  + '.ps-slot.is-pulse .ps-hole{animation:psPulse2 .6s ease-in-out 3;} @keyframes psPulse2{50%{box-shadow:inset 0 0 0 3px #F2784B,0 0 16px rgba(242,120,75,.7);}}'
  + '.ps-seated{display:inline-flex;align-items:center;justify-content:center;gap:3px;min-width:44px;min-height:44px;padding:0;border:0;background:none;cursor:pointer;} .ps-seated:focus-visible{outline:3px solid #146B5E;outline-offset:2px;border-radius:7px;}'
  + '.ps-slot.is-rattle .ps-seated{animation:psRattle .4s ease-in-out 2;} @keyframes psRattle{25%{transform:rotate(-7deg);}75%{transform:rotate(7deg);}}'
  + '.ps-card{position:relative;padding-right:22px;transition:transform .36s;} .ps-card.is-anim{animation:psFlip .36s ease-in-out;} @keyframes psFlip{50%{transform:rotateX(90deg);}}'
  + '.ps-fold{position:absolute;right:6px;top:8px;bottom:8px;width:6px;border-radius:3px;background:#C9A46A;} .ps-card.is-edge .ps-fold,.ps-card.is-glow .ps-fold{background:#2FA56A;box-shadow:0 0 10px rgba(47,165,106,.8);}'
  + '.ps-word.is-spin{animation:psFlip .36s ease-in-out;}'
  + '.ps-beats{min-height:0;} .ps-beatrow{display:flex;gap:8px;} .ps-beat{width:14px;height:14px;border-radius:50%;background:#F2784B;}'
  /* the tray and the keys */
  + '.ps-tray{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;} .ps-tray.is-keys{gap:6px;max-width:420px;}'
  + '.ps-tile{position:relative;min-width:var(--ps-tile,64px);height:var(--ps-tile,64px);padding:0 10px;border:0;border-radius:14px;background:#DDF1EA;color:#146B5E;font-family:' + H + ';font-weight:800;font-size:32px;line-height:1;box-shadow:inset 0 0 0 2.5px #146B5E,0 4px 0 #9CC9BE;cursor:pointer;}'
  + '.ps-tile.is-hump::before{content:"";position:absolute;left:50%;top:-9px;width:26px;height:12px;margin-left:-13px;border-radius:13px 13px 0 0;background:#DDF1EA;box-shadow:inset 0 2.5px 0 #146B5E,inset 2.5px 0 0 #146B5E,inset -2.5px 0 0 #146B5E;}'
  + '.ps-tile.is-flip{background:#FDE7DC;color:#B5461F;box-shadow:inset 0 0 0 2.5px #B5461F,0 4px 0 #F2B9A3;} .ps-tile.is-flip svg{width:36px;height:36px;display:block;margin:auto;}'
  + '.ps-tile.is-none{background:transparent;box-shadow:inset 0 0 0 2.5px #146B5E;border:2px dashed #9CC9BE;}'
  + '.ps-tile:disabled{opacity:.4;cursor:default;} .ps-tile.is-help,.ps-key.is-help{transform:translateY(-6px);box-shadow:inset 0 0 0 2.5px #146B5E,0 0 0 4px #2FA56A,0 4px 0 #9CC9BE;}'
  + '.ps-key{min-width:44px;height:48px;padding:0 6px;border:0;border-radius:10px;background:#FFF4DE;color:#2A2A35;font-family:' + H + ';font-weight:700;font-size:24px;box-shadow:inset 0 0 0 1.5px #C9A46A,0 3px 0 #B9965C;cursor:pointer;} .ps-key:disabled{opacity:.45;cursor:default;} .ps-key.is-back{background:#F6EFE6;}'
  + '.ps-tile:focus-visible,.ps-key:focus-visible,.ps-pile:focus-visible,.ps-check:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.ps-row{display:flex;justify-content:center;}'
  + '.ps-check{min-height:52px;min-width:120px;padding:0 26px;border:0;border-radius:26px;background:#146B5E;color:#FFFFFF;font-family:' + B + ';font-weight:800;font-size:20px;box-shadow:0 4px 0 #0C4A41;cursor:pointer;} .ps-check:disabled{opacity:.5;cursor:default;}'
  + '.ps-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:620px;} .ps-note.is-hint{color:#B5461F;} .ps-note.is-ok{color:#146B5E;}'
  /* phones */
  + '.ps-wrap.is-narrow{gap:8px;} .ps-wrap.is-narrow .ps-ticket{width:84px;min-height:64px;padding:12px 6px 6px;} .ps-wrap.is-narrow .ps-tnum{font-size:30px;} .ps-wrap.is-narrow .ps-tdot{width:10px;height:10px;}'
  + '.ps-wrap.is-narrow .ps-pile{width:84px;height:60px;} .ps-wrap.is-narrow .ps-served{max-width:84px;} .ps-wrap.is-narrow .ps-main{gap:8px;}'
  + '.ps-wrap.is-narrow .ps-tile{font-size:26px;} .ps-wrap.is-narrow .ps-tray{gap:12px;} .ps-wrap.is-narrow .ps-note{font-size:17px;} .ps-wrap.is-narrow .ps-sentence{font-size:18px;padding:6px 10px;} .ps-wrap.is-narrow .ps-check{font-size:18px;min-width:104px;}'
  + '@media print{.ps-row,.ps-note,.ps-tray{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.ps-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'ps-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.PlateStackActivity = PlateStackActivity;
