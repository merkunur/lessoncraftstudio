/* =====================================================================
   jar-label-activity.js — ACTIVITY #7 of the one-by-one rebuild:
   "Rivet's Number Forge" (K.CC.A.3) — THE JAR LABEL.
   Design sheet: docs/activities-rebuild/007-jar-label.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: THE LABEL LAID AGAINST THE JAR. A glass jar of library
   toys with an empty label on its lid. The child counts — every toy takes
   a mark when tapped — and writes the number on the keys; the digits
   appear on the label. Check lays the written number against the jar:
   the toys file into as many places as the label says, so a label too
   small leaves toys standing without a place, a label too big leaves
   empty dashed places, and the slip is named (41 for 14 — the digits the
   other way round; 4 for 14 — only the ones; 3 for none — zero). A right
   label turns gold and sticks, the number is spoken. In fill rounds the
   label is already written and the jar is empty: the child drops toys in
   from the shelf until it holds that many. No mascot: a jar, a lid, a
   label, number keys, the toys.

   ACTIVITY LAYER ONLY: the model is jar-label-core.js; pictures through
   lcs-pictures.js; lcs-shell.js is untouched.
   Test seams: window.JarLabelActivity.st / ._order / ._pool.
   ===================================================================== */
'use strict';

var JarLabelActivity = {
  id: 'jar-label',
  apparatusClasses: ['jl-'],

  strings: {
    title:          {en:'Label the Jar',de:'Beschrifte das Glas',fr:'L’étiquette du bocal',it:'L’etichetta del barattolo',es:'La etiqueta del frasco',pt:'A etiqueta do pote',nl:'Het etiket op de pot',sv:'Etiketten på burken',da:'Etiketten på glasset',no:'Etiketten på glasset',fi:'Purkin etiketti'},
    instruction:    {en:'A jar of toys with a label on its lid. Tap each toy as you count it, write how many on the keys, and the label is laid against the jar: if it is right, it sticks. When the label is already written, put that many toys in the jar.',de:'Ein Glas voller Spielsachen mit einem Etikett auf dem Deckel. Tippe jedes Spielzeug an, während du zählst, schreib mit den Tasten, wie viele es sind, und das Etikett wird ans Glas gehalten: Stimmt es, dann klebt es. Steht die Zahl schon auf dem Etikett, lege so viele Spielsachen ins Glas.',fr:'Un bocal de jouets avec une étiquette sur le couvercle. Touche chaque jouet en le comptant, écris combien il y en a avec les touches, et l’étiquette est posée contre le bocal : si elle est juste, elle se colle. Quand l’étiquette est déjà écrite, mets autant de jouets dans le bocal.',it:'Un barattolo di giocattoli con un’etichetta sul coperchio. Tocca ogni giocattolo mentre conti, scrivi quanti sono con i tasti, e l’etichetta viene accostata al barattolo: se è giusta, si attacca. Quando l’etichetta è già scritta, metti nel barattolo altrettanti giocattoli.',es:'Un frasco con juguetes y una etiqueta en la tapa. Toca cada juguete mientras lo cuentas, escribe cuántos hay con las teclas, y la etiqueta se compara con el frasco: si es correcta, se pega. Cuando la etiqueta ya está escrita, mete esa cantidad de juguetes en el frasco.',pt:'Um pote de brinquedos com uma etiqueta na tampa. Toque em cada brinquedo enquanto conta, escreva quantos são com as teclas, e a etiqueta é encostada no pote: se estiver certa, ela cola. Quando a etiqueta já está escrita, coloque essa quantidade de brinquedos no pote.',nl:'Een pot met speelgoed en een etiket op het deksel. Tik elk stuk speelgoed aan terwijl je telt, schrijf met de toetsen hoeveel het er zijn, en het etiket wordt tegen de pot gelegd: klopt het, dan plakt het. Staat het getal al op het etiket, doe dan zoveel speelgoed in de pot.',sv:'En burk med leksaker och en etikett på locket. Tryck på varje leksak medan du räknar, skriv hur många det är med knapparna, och etiketten hålls mot burken: stämmer den, så fastnar den. När talet redan står på etiketten lägger du så många leksaker i burken.',da:'Et glas med legetøj og en etiket på låget. Tryk på hvert stykke legetøj, mens du tæller, skriv med tasterne, hvor mange der er, og etiketten holdes op mod glasset: passer den, sidder den fast. Når tallet allerede står på etiketten, lægger du så meget legetøj i glasset.',no:'Et glass med leker og en etikett på lokket. Trykk på hver leke mens du teller, skriv hvor mange det er med tastene, og etiketten holdes mot glasset: stemmer den, sitter den fast. Når tallet allerede står på etiketten, legger du så mange leker i glasset.',fi:'Purkki täynnä leluja ja etiketti kannessa. Napauta jokaista lelua laskiessasi, kirjoita näppäimillä, montako niitä on, ja etiketti asetetaan purkkia vasten: jos se on oikein, se tarttuu kiinni. Kun luku on jo etiketissä, laita purkkiin yhtä monta lelua.'},
    promptCount:    {en:'Count the toys. Write the number.',de:'Zähle die Spielsachen. Schreib die Zahl.',fr:'Compte les jouets. Écris le nombre.',it:'Conta i giocattoli. Scrivi il numero.',es:'Cuenta los juguetes. Escribe el número.',pt:'Conte os brinquedos. Escreva o número.',nl:'Tel het speelgoed. Schrijf het getal.',sv:'Räkna leksakerna. Skriv talet.',da:'Tæl legetøjet. Skriv tallet.',no:'Tell lekene. Skriv tallet.',fi:'Laske lelut. Kirjoita luku.'},
    promptFill:     {en:'The label says {n}. Put that many in the jar.',de:'Auf dem Etikett steht {n}. Lege so viele ins Glas.',fr:'L’étiquette dit {n}. Mets-en autant dans le bocal.',it:'L’etichetta dice {n}. Mettine altrettanti nel barattolo.',es:'La etiqueta dice {n}. Mete esa cantidad en el frasco.',pt:'A etiqueta diz {n}. Coloque essa quantidade no pote.',nl:'Op het etiket staat {n}. Doe er zoveel in de pot.',sv:'På etiketten står {n}. Lägg så många i burken.',da:'På etiketten står {n}. Læg så mange i glasset.',no:'På etiketten står {n}. Legg så mange i glasset.',fi:'Etiketissä lukee {n}. Laita purkkiin yhtä monta.'},
    hintNoLabel:    {en:'Write how many on the label first.',de:'Schreib zuerst auf das Etikett, wie viele es sind.',fr:'Écris d’abord sur l’étiquette combien il y en a.',it:'Prima scrivi sull’etichetta quanti sono.',es:'Primero escribe en la etiqueta cuántos hay.',pt:'Primeiro escreva na etiqueta quantos são.',nl:'Schrijf eerst op het etiket hoeveel het er zijn.',sv:'Skriv först på etiketten hur många det är.',da:'Skriv først på etiketten, hvor mange der er.',no:'Skriv først på etiketten hvor mange det er.',fi:'Kirjoita ensin etikettiin, montako niitä on.'},
    hintZero:       {en:'The jar is empty. Which number means none?',de:'Das Glas ist leer. Welche Zahl heißt „keins“?',fr:'Le bocal est vide. Quel nombre veut dire « aucun » ?',it:'Il barattolo è vuoto. Quale numero vuol dire «nessuno»?',es:'El frasco está vacío. ¿Qué número significa «ninguno»?',pt:'O pote está vazio. Qual número quer dizer “nenhum”?',nl:'De pot is leeg. Welk getal betekent ‘geen’?',sv:'Burken är tom. Vilket tal betyder ”inga”?',da:'Glasset er tomt. Hvilket tal betyder ”ingen”?',no:'Glasset er tomt. Hvilket tall betyr «ingen»?',fi:'Purkki on tyhjä. Mikä luku tarkoittaa ”ei yhtään”?'},
    hintReversed:   {en:'You wrote the digits the other way round. Which digit comes first?',de:'Du hast die Ziffern andersherum geschrieben. Welche Ziffer kommt zuerst?',fr:'Tu as écrit les chiffres dans l’autre sens. Quel chiffre vient en premier ?',it:'Hai scritto le cifre al contrario. Quale cifra viene prima?',es:'Escribiste los dígitos al revés. ¿Cuál va primero?',pt:'Você escreveu os algarismos ao contrário. Qual vem primeiro?',nl:'Je hebt de cijfers andersom geschreven. Welk cijfer komt eerst?',sv:'Du skrev siffrorna tvärtom. Vilken siffra kommer först?',da:'Du skrev cifrene omvendt. Hvilket ciffer kommer først?',no:'Du skrev sifrene motsatt vei. Hvilket siffer kommer først?',fi:'Kirjoitit numerot toisin päin. Kumpi numero tulee ensin?'},
    hintOneDigit:   {en:'That is only the ones. There are more than nine — the number has two digits.',de:'Das sind nur die Einer. Es sind mehr als neun – die Zahl hat zwei Ziffern.',fr:'Ce ne sont que les unités. Il y en a plus de neuf : le nombre a deux chiffres.',it:'Quelle sono solo le unità. Sono più di nove: il numero ha due cifre.',es:'Esas son solo las unidades. Hay más de nueve: el número tiene dos dígitos.',pt:'Essas são só as unidades. São mais de nove: o número tem dois algarismos.',nl:'Dat zijn alleen de eenheden. Het zijn er meer dan negen: het getal heeft twee cijfers.',sv:'Det är bara entalen. Det är fler än nio – talet har två siffror.',da:'Det er kun enerne. Der er flere end ni – tallet har to cifre.',no:'Det er bare enerne. Det er flere enn ni – tallet har to sifre.',fi:'Nuo ovat vain ykköset. Niitä on enemmän kuin yhdeksän – luvussa on kaksi numeroa.'},
    hintMore:       {en:'There are more toys than your label says — some have no place. Count again.',de:'Es sind mehr Spielsachen, als auf deinem Etikett steht – einige haben keinen Platz. Zähl noch einmal.',fr:'Il y a plus de jouets que ton étiquette ne le dit : certains n’ont pas de place. Recompte.',it:'Ci sono più giocattoli di quanto dice la tua etichetta: alcuni non hanno posto. Conta di nuovo.',es:'Hay más juguetes de lo que dice tu etiqueta: algunos se quedan sin lugar. Cuenta otra vez.',pt:'Tem mais brinquedos do que a sua etiqueta diz: alguns ficaram sem lugar. Conte de novo.',nl:'Er is meer speelgoed dan op je etiket staat: er is niet voor alles plek. Tel nog eens.',sv:'Det är fler leksaker än etiketten säger – några får ingen plats. Räkna igen.',da:'Der er mere legetøj, end din etiket siger – noget har ingen plads. Tæl igen.',no:'Det er flere leker enn etiketten sier – noen får ingen plass. Tell igjen.',fi:'Leluja on enemmän kuin etikettisi sanoo – osalle ei riitä paikkaa. Laske uudelleen.'},
    hintFewer:      {en:'There are fewer toys than your label says — some places are empty. Count again.',de:'Es sind weniger Spielsachen, als auf deinem Etikett steht – einige Plätze bleiben leer. Zähl noch einmal.',fr:'Il y a moins de jouets que ton étiquette ne le dit : des places restent vides. Recompte.',it:'Ci sono meno giocattoli di quanto dice la tua etichetta: alcuni posti restano vuoti. Conta di nuovo.',es:'Hay menos juguetes de lo que dice tu etiqueta: quedan lugares vacíos. Cuenta otra vez.',pt:'Tem menos brinquedos do que a sua etiqueta diz: sobraram lugares vazios. Conte de novo.',nl:'Er is minder speelgoed dan op je etiket staat: er blijven plekken leeg. Tel nog eens.',sv:'Det är färre leksaker än etiketten säger – några platser är tomma. Räkna igen.',da:'Der er mindre legetøj, end din etiket siger – nogle pladser er tomme. Tæl igen.',no:'Det er færre leker enn etiketten sier – noen plasser er tomme. Tell igjen.',fi:'Leluja on vähemmän kuin etikettisi sanoo – osa paikoista jää tyhjäksi. Laske uudelleen.'},
    hintFillMore:   {en:'The jar needs more. Tap toys on the shelf to drop them in.',de:'Ins Glas gehören noch mehr. Tippe Spielsachen im Regal an, damit sie hineinfallen.',fr:'Il en faut encore dans le bocal. Touche des jouets sur l’étagère pour les faire tomber dedans.',it:'Nel barattolo ne servono altri. Tocca i giocattoli sulla mensola per farli cadere dentro.',es:'Al frasco le faltan juguetes. Toca juguetes del estante para que caigan dentro.',pt:'O pote precisa de mais. Toque em brinquedos na prateleira para eles caírem dentro.',nl:'Er moet nog meer in de pot. Tik op speelgoed op de plank om het erin te laten vallen.',sv:'Burken behöver fler. Tryck på leksaker på hyllan så ramlar de ner i burken.',da:'Glasset skal have flere. Tryk på legetøj på hylden, så det falder ned i glasset.',no:'Glasset trenger flere. Trykk på leker på hylla så faller de nedi.',fi:'Purkkiin tarvitaan lisää. Napauta hyllyn leluja, niin ne putoavat sisään.'},
    hintFillFewer:  {en:'Too many in the jar. Tap a toy in the jar to put it back.',de:'Zu viele im Glas. Tippe ein Spielzeug im Glas an, um es zurückzulegen.',fr:'Il y en a trop dans le bocal. Touche un jouet dans le bocal pour le remettre.',it:'Troppi nel barattolo. Tocca un giocattolo nel barattolo per rimetterlo a posto.',es:'Hay demasiados en el frasco. Toca un juguete del frasco para devolverlo.',pt:'Tem brinquedo demais no pote. Toque em um brinquedo do pote para devolver.',nl:'Te veel in de pot. Tik op een stuk speelgoed in de pot om het terug te leggen.',sv:'För många i burken. Tryck på en leksak i burken för att lägga tillbaka den.',da:'For mange i glasset. Tryk på et stykke legetøj i glasset for at lægge det tilbage.',no:'For mange i glasset. Trykk på en leke i glasset for å legge den tilbake.',fi:'Purkissa on liikaa. Napauta purkin lelua, niin se palaa takaisin.'},
    noteCount:      {en:'Tap each toy as you count it.',de:'Tippe jedes Spielzeug an, während du zählst.',fr:'Touche chaque jouet en le comptant.',it:'Tocca ogni giocattolo mentre conti.',es:'Toca cada juguete mientras lo cuentas.',pt:'Toque em cada brinquedo enquanto conta.',nl:'Tik elk stuk speelgoed aan terwijl je telt.',sv:'Tryck på varje leksak medan du räknar.',da:'Tryk på hvert stykke legetøj, mens du tæller.',no:'Trykk på hver leke mens du teller.',fi:'Napauta jokaista lelua laskiessasi.'},
    noteFill:       {en:'Tap a toy on the shelf to drop it in.',de:'Tippe ein Spielzeug im Regal an, damit es hineinfällt.',fr:'Touche un jouet sur l’étagère pour le faire tomber dedans.',it:'Tocca un giocattolo sulla mensola per farlo cadere dentro.',es:'Toca un juguete del estante para que caiga dentro.',pt:'Toque em um brinquedo na prateleira para ele cair dentro.',nl:'Tik op een stuk speelgoed op de plank om het erin te laten vallen.',sv:'Tryck på en leksak på hyllan så ramlar den ner i burken.',da:'Tryk på et stykke legetøj på hylden, så det falder ned i glasset.',no:'Trykk på en leke på hylla så faller den nedi.',fi:'Napauta hyllyn lelua, niin se putoaa sisään.'},
    noteLeft:       {en:'{k} left over',de:'{k} übrig',fr:'{k} en trop',it:'{k} in più',es:'{k} de sobra',pt:'{k} sobrando',nl:'{k} over',sv:'{k} över',da:'{k} tilovers',no:'{k} til overs',fi:'{k} yli'},
    noteEmpty:      {en:'Empty: {k}',de:'Leer: {k}',fr:'Vides : {k}',it:'Vuoti: {k}',es:'Vacíos: {k}',pt:'Vazios: {k}',nl:'Leeg: {k}',sv:'Tomma: {k}',da:'Tomme: {k}',no:'Tomme: {k}',fi:'Tyhjiä: {k}'},
    noteNeed:       {en:'{k} more to go',de:'Noch {k}',fr:'Encore {k}',it:'Ancora {k}',es:'{k} más',pt:'{k} faltando',nl:'Nog {k}',sv:'{k} till',da:'{k} mere',no:'{k} til',fi:'Vielä {k}'},
    noteOver:       {en:'{k} too many',de:'{k} zu viel',fr:'{k} de trop',it:'{k} di troppo',es:'{k} de más',pt:'{k} a mais',nl:'{k} te veel',sv:'{k} för många',da:'{k} for mange',no:'{k} for mange',fi:'{k} liikaa'},
    celebrateCount: {en:'Yes! {n} — the label sticks.',de:'Ja! {n} – das Etikett klebt.',fr:'Oui ! {n} : l’étiquette se colle.',it:'Sì! {n}: l’etichetta si attacca.',es:'¡Sí! {n}: la etiqueta se pega.',pt:'Isso! {n}: a etiqueta colou.',nl:'Ja! {n} – het etiket plakt.',sv:'Ja! {n} – etiketten fastnar.',da:'Ja! {n} – etiketten sidder fast.',no:'Ja! {n} – etiketten sitter fast.',fi:'Hienoa! {n} – etiketti tarttuu kiinni.'},
    celebrateFill:  {en:'Yes! {n} in the jar.',de:'Ja! {n} im Glas.',fr:'Oui ! {n} dans le bocal.',it:'Sì! {n} nel barattolo.',es:'¡Sí! {n} en el frasco.',pt:'Isso! {n} no pote.',nl:'Ja! {n} in de pot.',sv:'Ja! {n} i burken.',da:'Ja! {n} i glasset.',no:'Ja! {n} i glasset.',fi:'Hienoa! {n} purkissa.'},
    jarLabel:       {en:'The jar',de:'Das Glas',fr:'Le bocal',it:'Il barattolo',es:'El frasco',pt:'O pote',nl:'De pot',sv:'Burken',da:'Glasset',no:'Glasset',fi:'Purkki'},
    labelFor:       {en:'the label: {a}',de:'das Etikett: {a}',fr:'l’étiquette : {a}',it:'l’etichetta: {a}',es:'la etiqueta: {a}',pt:'a etiqueta: {a}',nl:'het etiket: {a}',sv:'etiketten: {a}',da:'etiketten: {a}',no:'etiketten: {a}',fi:'etiketti: {a}'},
    labelEmpty:     {en:'the label, still empty',de:'das Etikett, noch leer',fr:'l’étiquette, encore vide',it:'l’etichetta, ancora vuota',es:'la etiqueta, todavía vacía',pt:'a etiqueta, ainda vazia',nl:'het etiket, nog leeg',sv:'etiketten, ännu tom',da:'etiketten, stadig tom',no:'etiketten, ennå tom',fi:'etiketti, vielä tyhjä'},
    toyTap:         {en:'{t} {i}, tap to count it',de:'{t} {i}, zum Zählen antippen',fr:'{t} {i}, touche pour compter',it:'{t} {i}, tocca per contare',es:'{t} {i}, toca para contar',pt:'{t} {i}, toque para contar',nl:'{t} {i}, tik om te tellen',sv:'{t} {i}, tryck för att räkna',da:'{t} {i}, tryk for at tælle',no:'{t} {i}, trykk for å telle',fi:'{t} {i}, napauta laskeaksesi'},
    toyMarked:      {en:'{t} {i}, counted',de:'{t} {i}, gezählt',fr:'{t} {i}, compté',it:'{t} {i}, contato',es:'{t} {i}, contado',pt:'{t} {i}, contado',nl:'{t} {i}, geteld',sv:'{t} {i}, räknad',da:'{t} {i}, talt',no:'{t} {i}, telt',fi:'{t} {i}, laskettu'},
    toyInJar:       {en:'{t} {i} in the jar, tap to put it back',de:'{t} {i} im Glas, zum Zurücklegen antippen',fr:'{t} {i} dans le bocal, touche pour remettre sur l’étagère',it:'{t} {i} nel barattolo, tocca per rimettere sulla mensola',es:'{t} {i} en el frasco, toca para devolver al estante',pt:'{t} {i} no pote, toque para devolver',nl:'{t} {i} in de pot, tik om terug te leggen',sv:'{t} {i} i burken, tryck för att lägga tillbaka',da:'{t} {i} i glasset, tryk for at lægge tilbage',no:'{t} {i} i glasset, trykk for å legge tilbake',fi:'{t} {i} purkissa, napauta palauttaaksesi'},
    shelfLabel:     {en:'The shelf',de:'Das Regal',fr:'L’étagère',it:'La mensola',es:'El estante',pt:'A prateleira',nl:'De plank',sv:'Hyllan',da:'Hylden',no:'Hylla',fi:'Hylly'},
    shelfToy:       {en:'{t} on the shelf, tap to drop it in',de:'{t} im Regal, antippen, dann fällt das Spielzeug ins Glas',fr:'{t} sur l’étagère, touche pour faire tomber dans le bocal',it:'{t} sulla mensola, tocca e cade nel barattolo',es:'{t} en el estante, toca para que caiga dentro',pt:'{t} na prateleira, toque para cair dentro',nl:'{t} op de plank, tik om erin te laten vallen',sv:'{t} på hyllan, tryck så ramlar leksaken ner i burken',da:'{t} på hylden, tryk, så legetøjet falder ned i glasset',no:'{t} på hylla, trykk så faller leken nedi glasset',fi:'{t} hyllyllä, napauta niin se putoaa sisään'},
    padLabel:       {en:'Number keys',de:'Zifferntasten',fr:'Touches des chiffres',it:'Tasti dei numeri',es:'Teclas de números',pt:'Teclas de números',nl:'Cijfertoetsen',sv:'Sifferknappar',da:'Taltaster',no:'Talltaster',fi:'Numeronäppäimet'},
    write:          {en:'Write',de:'Schreiben',fr:'Écrire',it:'Scrivi',es:'Escribir',pt:'Escrever',nl:'Schrijven',sv:'Skriv',da:'Skriv',no:'Skriv',fi:'Kirjoita'},
    done:           {en:'Done',de:'Fertig',fr:'Terminé',it:'Fatto',es:'Listo',pt:'Pronto',nl:'Klaar',sv:'Klar',da:'Færdig',no:'Ferdig',fi:'Valmis'},
    erase:          {en:'Erase',de:'Löschen',fr:'Effacer',it:'Cancella',es:'Borrar',pt:'Apagar',nl:'Wissen',sv:'Sudda',da:'Slet',no:'Slett',fi:'Pyyhi'},
    setRange:       {en:'Numbers',de:'Zahlen',fr:'Nombres',it:'Numeri',es:'Números',pt:'Números',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    rangeTo10:      {en:'To 10',de:'Bis 10',fr:'Jusqu’à 10',it:'Fino a 10',es:'Hasta 10',pt:'Até 10',nl:'Tot en met 10',sv:'Till 10',da:'Til 10',no:'Til 10',fi:'10:een asti'},
    rangeTo20:      {en:'To 20',de:'Bis 20',fr:'Jusqu’à 20',it:'Fino a 20',es:'Hasta 20',pt:'Até 20',nl:'Tot en met 20',sv:'Till 20',da:'Til 20',no:'Til 20',fi:'20:een asti'},
    setTask:        {en:'Rounds',de:'Aufgaben',fr:'Manches',it:'Turni',es:'Rondas',pt:'Rodadas',nl:'Rondes',sv:'Omgångar',da:'Runder',no:'Runder',fi:'Kierrokset'},
    taskBoth:       {en:'Both',de:'Beides',fr:'Les deux',it:'Entrambi',es:'Ambas',pt:'As duas',nl:'Allebei',sv:'Båda',da:'Begge',no:'Begge',fi:'Molemmat'},
    taskCount:      {en:'Count and write',de:'Zählen und schreiben',fr:'Compter et écrire',it:'Contare e scrivere',es:'Contar y escribir',pt:'Contar e escrever',nl:'Tellen en schrijven',sv:'Räkna och skriv',da:'Tæl og skriv',no:'Tell og skriv',fi:'Laske ja kirjoita'},
    taskFill:       {en:'Fill the jar',de:'Das Glas füllen',fr:'Remplir le bocal',it:'Riempire il barattolo',es:'Llenar el frasco',pt:'Encher o pote',nl:'De pot vullen',sv:'Fyll burken',da:'Fyld glasset',no:'Fyll glasset',fi:'Täytä purkki'}
  },

  defaults: { range: 'to20', task: 'both' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: 'to10', labelKey: 'rangeTo10' }, { value: 'to20', labelKey: 'rangeTo20' }] },
    { key: 'task', type: 'choice', labelKey: 'setTask', options: [{ value: 'both', labelKey: 'taskBoth' }, { value: 'count', labelKey: 'taskCount' }, { value: 'fill', labelKey: 'taskFill' }] }
  ],

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._ro = null; this._theme = null; this._padOpen = false; this._outside = null;
    injectJarLabelCSS();
    if (typeof LCSPictures !== 'undefined') {
      LCSPictures.load(JarLabelCore.THEME).then(function (theme) { self._theme = theme; if (self._wrap) self._paintAll(); }).catch(function () { /* the jar stays empty-handed */ });
    }
  },
  destroy: function () {
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
    this._unwatchOutside();
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
  _range: function () { var r = this.api && this.api.settings && this.api.settings.range; return JarLabelCore.POOLS[r] ? r : 'to20'; },
  _task: function () { var t = this.api && this.api.settings && this.api.settings.task; return JarLabelCore.TASKS.indexOf(t) >= 0 ? t : 'both'; },
  _ensurePool: function () { var key = this._range() + '/' + this._task(); if (!this._pool || this._poolKey !== key) { this._pool = JarLabelCore.rounds(this._range(), this._task(), 'jl'); this._poolKey = key; this._order = null; } return this._pool; },
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
      id: 'jar-label.' + r.id,
      promptKey: r.kind === 'fill' ? 'promptFill' : 'promptCount',
      promptArgs: { n: r.n },
      celebrateKey: r.kind === 'fill' ? 'celebrateFill' : 'celebrateCount',
      answerType: 'state',
      setup: function (tool) { tool.st = JarLabelCore.newState(r); tool._padOpen = false; tool._preload(); },
      check: function (tool) { var res = JarLabelCore.check(tool.st); tool._afterCheck(res); return res.ok; },
      hintKey: function (tool) {
        var c = tool.st.checked, slip = c ? c.slip : 'none';
        return { none: 'hintNoLabel', zero: 'hintZero', reversed: 'hintReversed', oneDigit: 'hintOneDigit', more: 'hintMore', fewer: 'hintFewer', fillMore: 'hintFillMore', fillFewer: 'hintFillFewer' }[slip] || 'hintNoLabel';
      }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    this._unwatchOutside();
    if (!this.st) this.st = JarLabelCore.newState(JarLabelCore.rounds('to20', 'both', 'jl')[6]);
    var wrap = api.el('div', 'jl-wrap');
    this._wrap = wrap;

    var main = api.el('div', 'jl-main'); this._main = main;
    /* the jar */
    var jar = api.el('div', 'jl-jar'); jar.setAttribute('role', 'group'); jar.setAttribute('aria-label', t('jarLabel'));
    var lid = api.el('div', 'jl-lid');
    var label = api.el('div', 'jl-label'); label.setAttribute('role', 'status'); this._label = label; lid.appendChild(label);
    var pencil = api.el('button', 'jl-pencil'); pencil.type = 'button';
    pencil.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4l10-10-4-4L4 16v4z"/><path d="M13 7l4 4"/></svg>';
    pencil.setAttribute('aria-label', t('write')); pencil.title = t('write');
    pencil.addEventListener('click', function (ev) { ev.stopPropagation(); self._togglePad(); });
    this._pencil = pencil; lid.appendChild(pencil);
    jar.appendChild(lid);
    var body = api.el('div', 'jl-body'); this._body = body; jar.appendChild(body);
    this._jar = jar; main.appendChild(jar);
    /* the pad */
    var pad = api.el('div', 'jl-pad'); pad.setAttribute('role', 'group'); pad.setAttribute('aria-label', t('padLabel'));
    this._pad = pad; this._keys = [];
    var order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    for (var k = 0; k < order.length; k++) {
      (function (d) { var key = api.el('button', 'jl-key'); key.type = 'button'; key.textContent = String(d); key.addEventListener('click', function () { self._type(d); }); pad.appendChild(key); self._keys.push(key); }(order[k]));
    }
    var er = api.el('button', 'jl-key jl-key-erase'); er.type = 'button'; er.textContent = '⌫'; er.setAttribute('aria-label', t('erase')); er.addEventListener('click', function () { self._erase(); }); pad.appendChild(er); this._erase_ = er;
    var done = api.el('button', 'jl-key jl-key-done'); done.type = 'button'; done.textContent = t('done'); done.addEventListener('click', function () { self._togglePad(false); }); pad.appendChild(done); this._done = done;
    main.appendChild(pad);
    wrap.appendChild(main);
    /* the shelf (fill rounds) */
    var shelf = api.el('div', 'jl-shelf'); shelf.setAttribute('role', 'group'); shelf.setAttribute('aria-label', t('shelfLabel')); this._shelf = shelf; wrap.appendChild(shelf);
    /* the note */
    var note = api.el('div', 'jl-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);

    stage.appendChild(wrap);
    this._layout();
    this._paintAll();
    this._watchWidth();
  },
  _layout: function () {
    var L = this._L = JarLabelCore.layout(this._width());
    this._wrap.classList.toggle('is-side', L.mode === 'side');
    this._wrap.classList.toggle('is-stack', L.mode === 'stack');
    this._wrap.style.setProperty('--jl-cell', L.cell + 'px');
    this._wrap.style.setProperty('--jl-pic', L.pic + 'px');
    this._wrap.style.setProperty('--jl-gap', L.gap + 'px');
    this._wrap.style.setProperty('--jl-jarpad', L.jarPad + 'px');
    this._wrap.style.setProperty('--jl-padw', L.padW + 'px');
    this._wrap.style.setProperty('--jl-cols', String(L.cols));
    if (L.mode === 'side') { this._padOpen = false; this._unwatchOutside(); }
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
    var st = this.st, t = this.api.t, lang = this.api.lang, L = this._L, self = this;
    var count = st.kind === 'count', shown = JarLabelCore.shown(st), a = JarLabelCore.answer(st);
    var toyName = this._toyName(st.noun);
    this._wrap.classList.toggle('is-fill', !count);
    this._wrap.classList.toggle('is-done', st.done);
    this._wrap.classList.toggle('is-pad-open', this._padOpen && L.mode === 'stack');
    /* the label */
    var text = count ? (st.typed === '' ? '' : st.typed) : String(st.n);
    this._label.textContent = text;
    this._label.classList.toggle('is-empty', text === '');
    this._label.classList.toggle('is-stuck', st.done);
    this._label.classList.toggle('is-wrong', !!(st.checked && !st.checked.ok && count && a !== null));
    this._label.setAttribute('aria-label', text === '' ? t('labelEmpty') : interp(t('labelFor'), { a: text }));
    this._pencil.hidden = !count || L.mode !== 'stack' || st.done;
    /* the body: the toys in their cells, marks, places */
    var body = this._body, places = JarLabelCore.places(st);
    var cells = Math.max(shown, places.length);
    var rows = JarLabelCore.rowsFor(cells, L.cols);
    body.style.setProperty('--jl-rows', String(rows));
    while (body.children.length > cells) body.removeChild(body.lastChild);
    for (var i = 0; i < cells; i++) {
      var cell = body.children[i];
      if (!cell) { cell = this._makeCell(i); body.appendChild(cell); }
      var isToy = i < shown, place = places[i] || '';
      cell.classList.toggle('is-toy', isToy);
      cell.classList.toggle('is-empty', !isToy);
      cell.classList.toggle('is-marked', count && isToy && st.marks[i]);
      cell.classList.toggle('is-ticked', place === 'ticked');
      cell.classList.toggle('is-over', place === 'leftover');
      cell.classList.toggle('is-place', place === 'empty');
      cell.disabled = st.done || !isToy;
      var img = cell.querySelector('img');
      if (isToy && !img && this._theme && this._theme.nouns[st.noun]) { img = LCSPictures.img(this._theme, st.noun, lang, { plural: false }); img.className = 'jl-toy'; cell.insertBefore(img, cell.firstChild); }
      if (img && (!isToy || img.getAttribute('data-noun') !== st.noun)) { if (!isToy) { cell.removeChild(img); img = null; } else { img.src = LCSPictures.url(this._theme, st.noun); img.alt = toyName; } }
      if (img) img.setAttribute('data-noun', st.noun);
      var o = isToy ? JarLabelCore.offset(st, i, L) : { x: 0, y: 0 };
      cell.style.setProperty('--jl-ox', o.x + 'px'); cell.style.setProperty('--jl-oy', o.y + 'px');
      cell.setAttribute('aria-label', !isToy ? '' : count ? interp(t(st.marks[i] ? 'toyMarked' : 'toyTap'), { t: toyName, i: i + 1 }) : interp(t('toyInJar'), { t: toyName, i: i + 1 }));
    }
    /* the pad */
    this._pad.hidden = !count || (L.mode === 'stack' && (!this._padOpen || st.done));   /* beside the jar the pad stays when the label sticks (keys disabled) — the jar keeps its width */
    for (var k = 0; k < this._keys.length; k++) this._keys[k].disabled = st.done || st.typed.length >= JarLabelCore.DIGITS;
    this._erase_.disabled = st.done || st.typed === '';
    this._done.hidden = L.mode !== 'stack';
    /* the shelf */
    var shelf = this._shelf;
    shelf.hidden = count || st.done;
    /* shelf toys ≥ 44 px and as many as the shelf can seat without shrinking */
    var shelfPic = Math.max(44, Math.round(L.pic * 0.78)); this._wrap.style.setProperty('--jl-shelfpic', shelfPic + 'px');
    var seats = Math.max(1, Math.floor((this._width() - 20 + 8) / (shelfPic + 8)));
    var want = (!count && !st.done) ? Math.min(6, seats, JarLabelCore.MAX - shown) : 0;
    while (shelf.children.length > want) shelf.removeChild(shelf.lastChild);
    while (shelf.children.length < want) shelf.appendChild(this._makeShelfToy());
    for (var s = 0; s < shelf.children.length; s++) {
      var sb = shelf.children[s], si = sb.querySelector('img');
      if (!si && this._theme && this._theme.nouns[st.noun]) { si = LCSPictures.img(this._theme, st.noun, lang, { plural: false }); si.className = 'jl-toy'; sb.appendChild(si); }
      if (si && si.getAttribute('data-noun') !== st.noun) { si.src = LCSPictures.url(this._theme, st.noun); si.alt = toyName; si.setAttribute('data-noun', st.noun); }
      sb.setAttribute('aria-label', interp(t('shelfToy'), { t: toyName }));
    }
    /* the note */
    var c = st.checked, nk = null, args = {};
    if (c && !c.ok) {
      if (c.slip === 'more') { nk = 'noteLeft'; args = { k: c.k }; }
      else if (c.slip === 'fewer') { nk = 'noteEmpty'; args = { k: c.k }; }
      else if (c.slip === 'fillMore') { nk = 'noteNeed'; args = { k: c.k }; }
      else if (c.slip === 'fillFewer') { nk = 'noteOver'; args = { k: c.k }; }
    }
    /* the standing note only where the stage has room for it (beside the pad); a phone keeps its fold for the jar */
    if (!nk && !st.done && L.mode === 'side') nk = count ? 'noteCount' : 'noteFill';
    this._note.textContent = nk ? interp(t(nk), args) : '';
    this._note.classList.toggle('is-slip', !!(c && !c.ok && nk && /^note(Left|Empty|Need|Over)$/.test(nk)));
    this._note.hidden = !nk;
    void self;
  },
  _makeCell: function (i) {
    var self = this, cell = this.api.el('button', 'jl-cell'); cell.type = 'button'; cell.dataset.i = String(i);
    var mark = this.api.el('span', 'jl-mark'); mark.setAttribute('aria-hidden', 'true'); cell.appendChild(mark);
    cell.addEventListener('click', function () { self._tapCell(i); });
    return cell;
  },
  _makeShelfToy: function () {
    var self = this, b = this.api.el('button', 'jl-shelf-toy'); b.type = 'button';
    b.addEventListener('click', function () { self._drop(b); });
    return b;
  },
  _toyName: function (noun) {
    if (!this._theme || !this._theme.nouns[noun]) return noun;
    try { return LCSPictures.label(this._theme, noun, this.api.lang, { plural: false }); } catch (e) { return noun; }
  },
  _preload: function () {
    if (!this._theme || !this.st || typeof Image === 'undefined') return;
    if (this._theme.nouns[this.st.noun]) { var im = new Image(); im.src = LCSPictures.url(this._theme, this.st.noun); }
  },

  /* ---------------- the hand ---------------- */
  _tapCell: function (i) {
    var st = this.st;
    if (!st || st.done) return;
    if (st.kind === 'count') {
      if (!JarLabelCore.toggleMark(st, i)) return;
      this.api.sound(st.marks[i] ? 560 : 380);
      this._paintAll();
      bounce(this._body.children[i], 'jl-bob');
      this.api.track('mark', { n: st.n, i: i, on: st.marks[i], marked: JarLabelCore.marked(st) });
      return;
    }
    if (!JarLabelCore.removeFromJar(st)) return;
    this.api.sound(380);
    this._paintAll();
    this.api.announce(interp(this.api.t('shelfToy'), { t: this._toyName(st.noun) }));
    this.api.track('takeOut', { n: st.n, inJar: st.inJar });
  },
  _drop: function (btn) {
    var st = this.st;
    if (!st || !JarLabelCore.addToJar(st)) return;
    this.api.sound(520 + 10 * st.inJar);
    this._paintAll();
    var cell = this._body.children[st.inJar - 1];
    if (cell) bounce(cell, 'jl-drop');
    this.api.announce(interp(this.api.t('toyInJar'), { t: this._toyName(st.noun), i: st.inJar }));
    this.api.track('dropIn', { n: st.n, inJar: st.inJar });
  },
  _type: function (d) {
    var st = this.st;
    if (!st || !JarLabelCore.typeDigit(st, d)) return;
    this.api.sound(640);
    this._paintAll();
    bounce(this._label, 'jl-bob');
    this.api.announce(interp(this.api.t('labelFor'), { a: st.typed }));
    this.api.track('type', { n: st.n, typed: st.typed });
  },
  _erase: function () {
    var st = this.st;
    if (!st || !JarLabelCore.erase(st)) return;
    this.api.sound(380);
    this._paintAll();
    this.api.track('erase', { n: st.n, typed: st.typed });
  },
  _togglePad: function (open) {
    var st = this.st;
    if (!st || st.kind !== 'count' || st.done || !this._L || this._L.mode !== 'stack') return;
    this._padOpen = (open === undefined) ? !this._padOpen : !!open;
    this._paintAll();
    if (this._padOpen) { this._watchOutside(); var k = this._keys[0]; if (k) k.focus(); }
    else { this._unwatchOutside(); this._pencil.focus(); }
    this.api.track('pad', { open: this._padOpen });
  },
  _watchOutside: function () {
    var self = this;
    this._unwatchOutside();
    this._outside = function (ev) { if (!self._pad.contains(ev.target) && !self._pencil.contains(ev.target) && !self._label.contains(ev.target)) self._togglePad(false); };
    setTimeout(function () { if (self._outside) document.addEventListener('pointerdown', self._outside, true); }, 0);
  },
  _unwatchOutside: function () { if (this._outside) { document.removeEventListener('pointerdown', this._outside, true); this._outside = null; } },
  /* Check has run: the places are laid (wrong) or the label sticks (right) */
  _afterCheck: function (res) {
    var st = this.st, self = this;
    this._padOpen = false; this._unwatchOutside();
    this._paintAll();
    if (res.ok) {
      this.api.sound(660); setTimeout(function () { self.api.sound(880); }, 140);
      this._speakNumber(st.n);
      bounce(this._label, 'jl-stick');
      for (var i = 0; i < JarLabelCore.shown(st); i++) (function (cell, d) { setTimeout(function () { bounce(cell, 'jl-bob'); }, 60 * d); }(this._body.children[i], i));
      this.api.track('right', { id: st.id, n: st.n });
      return;
    }
    this.api.sound(300);
    bounce(this._jar, 'jl-wobble');
    if (st.kind === 'count') { var cells = this._body.children; for (var j = 0; j < cells.length; j++) if (cells[j].classList.contains('is-over') || cells[j].classList.contains('is-place')) bounce(cells[j], 'jl-bob'); }
    this.api.track('wrong', { id: st.id, slip: res.slip, a: res.a, k: res.k });
  },
  _speakNumber: function (n) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: 0.95 }); } catch (e) { /* silent */ }
  }
};

function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; }); }
function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }

var jlCssDone = false;
function injectJarLabelCSS() {
  if (jlCssDone || typeof document === 'undefined') return;
  jlCssDone = true;
  var css = ''
  + '.jl-wrap{width:100%;position:relative;display:flex;flex-direction:column;align-items:stretch;gap:6px;--jl-cell:96px;--jl-pic:92px;--jl-gap:4px;--jl-jarpad:8px;--jl-padw:112px;--jl-cols:5;--jl-glass:#EAF4F6;--jl-glass2:#D7E9EC;}'
  + '.jl-main{display:flex;gap:12px;align-items:flex-start;width:100%;}'
  /* the jar */
  + '.jl-jar{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;align-items:stretch;}'
  + '.jl-wrap.is-side .jl-jar{flex:0 0 calc(100% - 12px - var(--jl-padw));width:calc(100% - 12px - var(--jl-padw));}'
  + '.jl-lid{height:46px;box-sizing:border-box;margin:0 6%;border-radius:12px 12px 4px 4px;background:var(--lcs-structure);display:flex;align-items:center;justify-content:center;gap:8px;position:relative;box-shadow:inset 0 -3px 0 rgba(0,0,0,.18);}'
  + '.jl-label{min-width:72px;height:32px;box-sizing:border-box;padding:0 12px;border-radius:7px;background:#FFFDF6;border:2px solid var(--lcs-line);font-family:var(--lcs-font-display);font-weight:800;font-size:22px;line-height:28px;color:var(--lcs-ink);text-align:center;transition:background .25s,border-color .25s;}'
  + '.jl-label.is-empty::before{content:"";display:inline-block;width:22px;height:3px;border-radius:2px;background:var(--lcs-line);vertical-align:middle;}'
  + '.jl-label.is-wrong{border-color:var(--lcs-accent);color:#B3512A;}'
  + '.jl-label.is-stuck{background:#F6D98A;border-color:#C9A24A;color:#5B4312;box-shadow:0 0 0 3px rgba(246,217,138,.45);}'
  + '.jl-pencil{position:absolute;right:4px;top:1px;width:44px;height:44px;border-radius:10px;border:0;background:var(--lcs-accent);color:#fff;display:grid;place-items:center;cursor:pointer;touch-action:manipulation;} .jl-pencil[hidden]{display:none;}'
  + '.jl-body{box-sizing:border-box;padding:4px var(--jl-jarpad);display:grid;grid-template-columns:repeat(var(--jl-cols),var(--jl-cell));grid-auto-rows:var(--jl-cell);gap:var(--jl-gap);justify-content:center;min-height:calc(var(--jl-cell) + 8px);'
  + 'background:linear-gradient(180deg,var(--jl-glass),var(--jl-glass2));border:3px solid var(--lcs-structure);border-top-width:0;border-radius:0 0 26px 26px;box-shadow:inset 6px 0 14px rgba(255,255,255,.55),inset -6px 0 14px rgba(20,107,94,.08),0 6px 14px rgba(20,30,28,.08);}'
  + '.jl-cell{position:relative;width:var(--jl-cell);height:var(--jl-cell);border:0;padding:0;margin:0;background:none;border-radius:12px;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;display:grid;place-items:center;}'
  + '.jl-cell:disabled{cursor:default;} .jl-cell:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:-3px;}'
  + '.jl-cell.is-empty{visibility:hidden;} .jl-cell.is-place{visibility:visible;border:3px dashed var(--lcs-accent);border-radius:14px;box-sizing:border-box;opacity:.9;}'
  + '.jl-toy{width:var(--jl-pic);height:var(--jl-pic);object-fit:contain;display:block;transform:translate(var(--jl-ox,0),var(--jl-oy,0));pointer-events:none;filter:drop-shadow(0 2px 2px rgba(20,30,28,.15));transition:transform .2s var(--lcs-ease),opacity .2s;}'
  + '.jl-mark{position:absolute;right:8%;top:8%;width:22px;height:22px;border-radius:50%;background:var(--lcs-accent);border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transform:scale(0);transition:transform .18s var(--lcs-ease);}'
  + '.jl-cell.is-marked .jl-mark{transform:scale(1);} .jl-cell.is-marked .jl-toy{opacity:.82;}'
  + '.jl-cell.is-ticked .jl-mark{transform:scale(1);background:var(--lcs-good);} .jl-cell.is-ticked .jl-mark::after{content:"";position:absolute;left:6px;top:3px;width:5px;height:9px;border:solid #fff;border-width:0 2.5px 2.5px 0;transform:rotate(45deg);}'
  + '.jl-cell.is-over{box-shadow:inset 0 0 0 3px var(--lcs-accent);border-radius:14px;} .jl-cell.is-over .jl-mark{transform:scale(0);} .jl-cell.is-over .jl-toy{opacity:1;}'
  /* the pad */
  + '.jl-pad{display:grid;grid-template-columns:repeat(2,52px);gap:4px;box-sizing:border-box;padding:6px;border-radius:16px;background:var(--lcs-surface);border:2px solid var(--lcs-line);flex:0 0 auto;width:var(--jl-padw);} .jl-pad[hidden]{display:none;}'
  + '.jl-key{height:52px;border-radius:12px;border:2px solid var(--lcs-structure-soft);background:#fff;font-family:var(--lcs-font-display);font-weight:800;font-size:22px;color:var(--lcs-structure);cursor:pointer;touch-action:manipulation;display:grid;place-items:center;}'
  + '.jl-key:hover{background:var(--lcs-structure-soft);} .jl-key:disabled{opacity:.4;cursor:default;} .jl-key:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  + '.jl-key-erase{color:var(--lcs-accent);} .jl-key-done{grid-column:1 / -1;font-size:17px;background:var(--lcs-structure);color:#fff;border-color:var(--lcs-structure);} .jl-key-done[hidden]{display:none;}'
  + '.jl-wrap.is-stack .jl-pad{position:absolute;left:50%;transform:translateX(-50%);bottom:0;z-index:6;grid-template-columns:repeat(3,56px);width:auto;box-shadow:0 10px 24px rgba(20,30,28,.22);}'
  + '.jl-wrap.is-stack .jl-key{height:50px;}'
  /* the shelf */
  + '.jl-shelf{display:flex;gap:8px;justify-content:center;align-items:center;box-sizing:border-box;padding:8px 10px;border-radius:14px;background:var(--lcs-surface-2);border:2px solid var(--lcs-line);min-height:calc(var(--jl-shelfpic) + 20px);} .jl-shelf[hidden]{display:none;}'
  + '.jl-shelf-toy{width:var(--jl-shelfpic);height:var(--jl-shelfpic);flex:0 0 auto;border:0;padding:0;margin:0;background:none;border-radius:10px;cursor:pointer;touch-action:manipulation;display:grid;place-items:center;}'
  + '.jl-shelf-toy .jl-toy{width:100%;height:100%;transform:none;} .jl-shelf-toy:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  /* the note */
  + '.jl-note{font-family:var(--lcs-font-body);font-weight:700;font-size:clamp(14px, 1.2vw + 10px, 17px);line-height:1.3;color:var(--lcs-structure);text-align:center;min-height:20px;} .jl-note.is-slip{color:var(--lcs-accent);font-size:clamp(16px, 1.2vw + 12px, 19px);} .jl-note[hidden]{display:none;}'
  /* motion */
  + '.jl-bob{animation:jl-bob .4s var(--lcs-ease) 1;} @keyframes jl-bob{0%,100%{transform:none;}40%{transform:translateY(-6px) scale(1.04);}}'
  + '.jl-drop{animation:jl-drop .45s var(--lcs-ease) 1;} @keyframes jl-drop{0%{transform:translateY(-40px) scale(.7);opacity:0;}70%{transform:translateY(3px) scale(1.02);opacity:1;}100%{transform:none;}}'
  + '.jl-stick{animation:jl-stick .5s var(--lcs-ease) 1;} @keyframes jl-stick{0%{transform:scale(1);}40%{transform:scale(1.18) rotate(-3deg);}100%{transform:none;}}'
  + '.jl-wobble{animation:jl-wobble .45s var(--lcs-ease) 1;} @keyframes jl-wobble{0%,100%{transform:translateX(0);}25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}'
  + '@media (prefers-reduced-motion:reduce){.jl-toy,.jl-mark,.jl-label,.jl-cell{animation:none!important;transition:none!important;}}';
  var style = document.createElement('style');
  style.id = 'jl-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = JarLabelActivity;
if (typeof window !== 'undefined') window.JarLabelActivity = JarLabelActivity;
