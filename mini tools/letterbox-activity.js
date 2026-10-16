/* =====================================================================
   letterbox-activity.js — ACTIVITY #6 of the one-by-one rebuild:
   "Pip's Round" (K.CC.A.3) — THE LETTERBOX STREET.
   Design sheet: docs/activities-rebuild/006-letterbox.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: THE LETTERBOX STREET. Five houses with PRINTED number
   plates and a post van with three letters whose addresses are WRITTEN
   BY HAND — the handwriting instrument's own glyphs (an open 4, a flagged
   1, the barred 7 where the country writes it) — so the number has to be
   read, not matched. The child drags a letter to a house; it goes through
   one slot only: the right door opens and the neighbour (a library animal)
   steps onto the doorstep while the number is spoken; a wrong door reads
   its own number back beside the letter's and names the slip (13 and 31 —
   the same digits the other way round; 14 and 4 — one digit, two digits;
   14 and 15 — the last digit; 6 and 9 — the shape). After two misses the
   right plate glows. When the third letter is posted the round checks
   itself. No mascot: houses, plates, a van, paper, the child's hand.

   ACTIVITY LAYER ONLY: the model is letterbox-core.js (which loads
   number-trace-core.js + stroke-trace-core.js unchanged); pictures through
   lcs-pictures.js; lcs-shell.js is untouched.
   Test seams: window.LetterboxActivity.st / ._order / ._pool.
   ===================================================================== */
'use strict';

var LetterboxActivity = {
  id: 'letterbox',
  apparatusClasses: ['lb-'],

  strings: {
    title:            {en:'Deliver the Letters',de:'Briefe austragen',fr:'Distribue le courrier',it:'Consegna le lettere',es:'Entrega las cartas',pt:'Entregue as cartas',nl:'Bezorg de brieven',sv:'Dela ut breven',da:'Del brevene ud',no:'Del ut brevene',fi:'Jaa kirjeet'},
    instruction:      {en:'A street of five houses, each with a number plate over its door, and a van with three letters. Read the number written on the letter and drag it to the house with that number — it only fits through that letterbox.',de:'Eine Straße mit fünf Häusern, jedes mit einer Hausnummer über der Tür, und ein Postauto mit drei Briefen. Lies die Zahl auf dem Brief und zieh ihn zum Haus mit dieser Nummer – nur dort passt er in den Briefschlitz.',fr:'Une rue de cinq maisons, chacune avec un numéro au-dessus de la porte, et une camionnette avec trois lettres. Lis le nombre écrit sur la lettre et fais-la glisser jusqu’à la maison qui porte ce numéro : elle n’entre que dans cette boîte aux lettres.',it:'Una via con cinque case, ognuna con il numero civico sopra la porta, e un furgoncino con tre lettere. Leggi il numero scritto sulla lettera e trascinala fino alla casa con quel numero: entra solo in quella buca delle lettere.',es:'Una calle con cinco casas, cada una con su número sobre la puerta, y una camioneta con tres cartas. Lee el número escrito en la carta y arrástrala hasta la casa con ese número: solo entra en ese buzón.',pt:'Uma rua com cinco casas, cada uma com o número em cima da porta, e uma van com três cartas. Leia o número escrito na carta e arraste até a casa com esse número: ela só entra nessa caixa de correio.',nl:'Een straat met vijf huizen, elk met een huisnummer boven de deur, en een bestelbus met drie brieven. Lees het getal op de brief en sleep hem naar het huis met dat nummer: alleen daar past hij door de brievenbus.',sv:'En gata med fem hus, vart och ett med ett husnummer över dörren, och en postbil med tre brev. Läs talet som står på brevet och dra det till huset med det numret – det går bara ner i den brevlådan.',da:'En gade med fem huse, hvert med et husnummer over døren, og en postbil med tre breve. Læs tallet på brevet, og træk det hen til huset med det nummer – det passer kun ned i den postkasse.',no:'En gate med fem hus, hvert med et husnummer over døra, og en postbil med tre brev. Les tallet på brevet og dra det til huset med det nummeret – det passer bare ned i den postkassen.',fi:'Katu, jolla on viisi taloa, jokaisen oven yllä talonumero, ja postiauto, jossa on kolme kirjettä. Lue kirjeeseen kirjoitettu luku ja vedä kirje taloon, jolla on sama numero – se mahtuu vain sen talon postiluukkuun.'},
    promptWritten:    {en:'Read the number on each letter and post it through the right door.',de:'Lies die Zahl auf jedem Brief und wirf ihn an der richtigen Tür ein.',fr:'Lis le nombre sur chaque lettre et glisse-la dans la bonne boîte aux lettres.',it:'Leggi il numero su ogni lettera e imbucala alla porta giusta.',es:'Lee el número de cada carta y échala en el buzón de la casa correcta.',pt:'Leia o número de cada carta e entregue na porta certa.',nl:'Lees het getal op elke brief en doe hem in de juiste brievenbus.',sv:'Läs talet på varje brev och lägg det i rätt brevlåda.',da:'Læs tallet på hvert brev, og læg det i den rigtige postkasse.',no:'Les tallet på hvert brev og legg det i riktig postkasse.',fi:'Lue jokaisen kirjeen luku ja pudota kirje oikeaan postiluukkuun.'},
    promptSpoken:     {en:'Listen to the number on each letter and post it through the right door.',de:'Hör die Zahl auf jedem Brief und wirf ihn an der richtigen Tür ein.',fr:'Écoute le nombre de chaque lettre et glisse-la dans la bonne boîte aux lettres.',it:'Ascolta il numero di ogni lettera e imbucala alla porta giusta.',es:'Escucha el número de cada carta y échala en el buzón de la casa correcta.',pt:'Escute o número de cada carta e entregue na porta certa.',nl:'Luister naar het getal op elke brief en doe hem in de juiste brievenbus.',sv:'Lyssna på talet på varje brev och lägg det i rätt brevlåda.',da:'Lyt til tallet på hvert brev, og læg det i den rigtige postkasse.',no:'Lytt til tallet på hvert brev og legg det i riktig postkasse.',fi:'Kuuntele jokaisen kirjeen luku ja pudota kirje oikeaan postiluukkuun.'},
    hintStart:        {en:'Take the letter from the van and drag it to the house with the same number.',de:'Nimm den Brief aus dem Postauto und zieh ihn zum Haus mit derselben Zahl.',fr:'Prends la lettre dans la camionnette et fais-la glisser jusqu’à la maison qui a le même nombre.',it:'Prendi la lettera dal furgoncino e trascinala fino alla casa con lo stesso numero.',es:'Toma la carta de la camioneta y arrástrala hasta la casa que tiene el mismo número.',pt:'Pegue a carta na van e arraste até a casa que tem o mesmo número.',nl:'Pak de brief uit de bestelbus en sleep hem naar het huis met hetzelfde getal.',sv:'Ta brevet från postbilen och dra det till huset med samma tal.',da:'Tag brevet fra postbilen, og træk det hen til huset med det samme tal.',no:'Ta brevet fra postbilen og dra det til huset med det samme tallet.',fi:'Ota kirje postiautosta ja vedä se taloon, jolla on sama luku.'},
    hintUnfinished:   {en:'Not finished yet — there are still letters in the van.',de:'Noch nicht fertig – im Postauto liegen noch Briefe.',fr:'Ce n’est pas fini : il reste des lettres dans la camionnette.',it:'Non è ancora finito: nel furgoncino ci sono ancora lettere.',es:'Todavía no terminas: aún hay cartas en la camioneta.',pt:'Ainda não acabou: ainda tem carta na van.',nl:'Nog niet klaar: er liggen nog brieven in de bestelbus.',sv:'Inte klart än – det ligger brev kvar i postbilen.',da:'Ikke færdig endnu – der ligger stadig breve i postbilen.',no:'Ikke ferdig ennå – det ligger brev igjen i postbilen.',fi:'Ei vielä valmis – postiautossa on vielä kirjeitä.'},
    noteStart:        {en:'Read the number on the letter and find that door.',de:'Lies die Zahl auf dem Brief und such diese Tür.',fr:'Lis le nombre sur la lettre et trouve cette porte.',it:'Leggi il numero sulla lettera e trova quella porta.',es:'Lee el número de la carta y busca esa puerta.',pt:'Leia o número da carta e procure essa porta.',nl:'Lees het getal op de brief en zoek die deur.',sv:'Läs talet på brevet och hitta den dörren.',da:'Læs tallet på brevet, og find den dør.',no:'Les tallet på brevet og finn den døra.',fi:'Lue kirjeen luku ja etsi se ovi.'},
    noteNext:         {en:'Delivered! Now the next letter.',de:'Zugestellt! Jetzt der nächste Brief.',fr:'Distribuée ! Maintenant la lettre suivante.',it:'Consegnata! Ora la prossima lettera.',es:'¡Entregada! Ahora la siguiente carta.',pt:'Carta entregue! Agora a próxima.',nl:'Bezorgd! Nu de volgende brief.',sv:'Utdelat! Nu nästa brev.',da:'Afleveret! Nu det næste brev.',no:'Levert! Nå neste brev.',fi:'Perillä! Nyt seuraava kirje.'},
    noteSpoken:       {en:'Listen to the number, then find that door. Tap Show if you want to see it.',de:'Hör die Zahl und such diese Tür. Tippe auf Zeigen, wenn du sie sehen willst.',fr:'Écoute le nombre, puis trouve cette porte. Touche Montrer si tu veux le voir.',it:'Ascolta il numero, poi trova quella porta. Tocca Mostra se vuoi vederlo.',es:'Escucha el número y busca esa puerta. Toca Mostrar si quieres verlo.',pt:'Escute o número e procure essa porta. Toque em Mostrar se quiser ver.',nl:'Luister naar het getal en zoek die deur. Tik op Laat zien als je het wilt zien.',sv:'Lyssna på talet och hitta den dörren. Tryck på Visa om du vill se det.',da:'Lyt til tallet, og find den dør. Tryk på Vis, hvis du vil se det.',no:'Lytt til tallet og finn den døra. Trykk på Vis hvis du vil se det.',fi:'Kuuntele luku ja etsi se ovi. Paina Näytä, jos haluat nähdä sen.'},
    wrongReversed:    {en:'This door is {h}. The letter says {n} — the same digits, the other way round.',de:'Das ist Haus {h}. Auf dem Brief steht {n} – dieselben Ziffern, nur andersherum.',fr:'C’est la maison {h}. Sur la lettre, il y a {n} : les mêmes chiffres, mais dans l’autre sens.',it:'Questa è la casa {h}. Sulla lettera c’è {n}: le stesse cifre, ma al contrario.',es:'Esa es la casa {h}. La carta dice {n}: los mismos dígitos, pero al revés.',pt:'Essa é a casa {h}. A carta diz {n}: os mesmos algarismos, mas ao contrário.',nl:'Dit is huis {h}. Op de brief staat {n}: dezelfde cijfers, maar andersom.',sv:'Det här är hus {h}. På brevet står {n} – samma siffror, fast tvärtom.',da:'Det her er hus {h}. På brevet står der {n} – de samme cifre, bare omvendt.',no:'Dette er hus {h}. På brevet står det {n} – de samme sifrene, bare motsatt vei.',fi:'Tämä on talo {h}. Kirjeessä lukee {n} – samat numerot, mutta toisin päin.'},
    wrongLastDigit:   {en:'This door is {h}. The letter says {n} — look at the last digit.',de:'Das ist Haus {h}. Auf dem Brief steht {n} – schau auf die letzte Ziffer.',fr:'C’est la maison {h}. Sur la lettre, il y a {n} : regarde le dernier chiffre.',it:'Questa è la casa {h}. Sulla lettera c’è {n}: guarda l’ultima cifra.',es:'Esa es la casa {h}. La carta dice {n}: fíjate en el último dígito.',pt:'Essa é a casa {h}. A carta diz {n}: olhe o último algarismo.',nl:'Dit is huis {h}. Op de brief staat {n}: kijk naar het laatste cijfer.',sv:'Det här är hus {h}. På brevet står {n} – titta på den sista siffran.',da:'Det her er hus {h}. På brevet står der {n} – se på det sidste ciffer.',no:'Dette er hus {h}. På brevet står det {n} – se på det siste sifferet.',fi:'Tämä on talo {h}. Kirjeessä lukee {n} – katso viimeistä numeroa.'},
    wrongOneDigit:    {en:'This door is {h}, one digit. The letter has two: {n}.',de:'Das ist Haus {h}, eine Ziffer. Auf dem Brief stehen zwei: {n}.',fr:'C’est la maison {h}, un seul chiffre. Sur la lettre, il y en a deux : {n}.',it:'Questa è la casa {h}, una cifra sola. Sulla lettera ce ne sono due: {n}.',es:'Esa es la casa {h}, de un dígito. La carta tiene dos: {n}.',pt:'Essa é a casa {h}, de um algarismo. A carta tem dois: {n}.',nl:'Dit is huis {h}, één cijfer. Op de brief staan er twee: {n}.',sv:'Det här är hus {h}, en siffra. På brevet står två: {n}.',da:'Det her er hus {h}, ét ciffer. På brevet står der to: {n}.',no:'Dette er hus {h}, ett siffer. På brevet står det to: {n}.',fi:'Tämä on talo {h}, yksi numero. Kirjeessä on kaksi: {n}.'},
    wrongTwoDigits:   {en:'This door is {h}, two digits. The letter has only one: {n}.',de:'Das ist Haus {h}, zwei Ziffern. Auf dem Brief steht nur eine: {n}.',fr:'C’est la maison {h}, deux chiffres. Sur la lettre, il n’y en a qu’un : {n}.',it:'Questa è la casa {h}, due cifre. Sulla lettera ce n’è una sola: {n}.',es:'Esa es la casa {h}, de dos dígitos. La carta tiene solo uno: {n}.',pt:'Essa é a casa {h}, de dois algarismos. A carta tem só um: {n}.',nl:'Dit is huis {h}, twee cijfers. Op de brief staat er maar één: {n}.',sv:'Det här är hus {h}, två siffror. På brevet står bara en: {n}.',da:'Det her er hus {h}, to cifre. På brevet står der kun ét: {n}.',no:'Dette er hus {h}, to sifre. På brevet står det bare ett: {n}.',fi:'Tämä on talo {h}, kaksi numeroa. Kirjeessä on vain yksi: {n}.'},
    wrongFirstDigit:  {en:'This door is {h}. The letter says {n} — look at the first digit.',de:'Das ist Haus {h}. Auf dem Brief steht {n} – schau auf die erste Ziffer.',fr:'C’est la maison {h}. Sur la lettre, il y a {n} : regarde le premier chiffre.',it:'Questa è la casa {h}. Sulla lettera c’è {n}: guarda la prima cifra.',es:'Esa es la casa {h}. La carta dice {n}: fíjate en el primer dígito.',pt:'Essa é a casa {h}. A carta diz {n}: olhe o primeiro algarismo.',nl:'Dit is huis {h}. Op de brief staat {n}: kijk naar het eerste cijfer.',sv:'Det här är hus {h}. På brevet står {n} – titta på den första siffran.',da:'Det her er hus {h}. På brevet står der {n} – se på det første ciffer.',no:'Dette er hus {h}. På brevet står det {n} – se på det første sifferet.',fi:'Tämä on talo {h}. Kirjeessä lukee {n} – katso ensimmäistä numeroa.'},
    wrongShape:       {en:'This door is {h}. Look again at the shape — the letter says {n}.',de:'Das ist Haus {h}. Schau noch mal genau auf die Form – auf dem Brief steht {n}.',fr:'C’est la maison {h}. Regarde bien la forme : sur la lettre, il y a {n}.',it:'Questa è la casa {h}. Guarda bene la forma: sulla lettera c’è {n}.',es:'Esa es la casa {h}. Mira bien la forma: la carta dice {n}.',pt:'Essa é a casa {h}. Olhe bem a forma: a carta diz {n}.',nl:'Dit is huis {h}. Kijk nog eens goed naar de vorm: op de brief staat {n}.',sv:'Det här är hus {h}. Titta noga på formen – på brevet står {n}.',da:'Det her er hus {h}. Se godt på formen – på brevet står der {n}.',no:'Dette er hus {h}. Se nøye på formen – på brevet står det {n}.',fi:'Tämä on talo {h}. Katso muotoa tarkasti – kirjeessä lukee {n}.'},
    wrongOff:         {en:'This door is {h}. Look for house {n}.',de:'Das ist Haus {h}. Such Haus {n}.',fr:'C’est la maison {h}. Cherche la maison {n}.',it:'Questa è la casa {h}. Cerca la casa {n}.',es:'Esa es la casa {h}. Busca la casa {n}.',pt:'Essa é a casa {h}. Procure a casa {n}.',nl:'Dit is huis {h}. Zoek huis {n}.',sv:'Det här är hus {h}. Leta efter hus {n}.',da:'Det her er hus {h}. Led efter hus {n}.',no:'Dette er hus {h}. Let etter hus {n}.',fi:'Tämä on talo {h}. Etsi talo {n}.'},
    wrongSpoken:      {en:'This door is {h}. Listen again.',de:'Das ist Haus {h}. Hör noch einmal zu.',fr:'C’est la maison {h}. Écoute encore une fois.',it:'Questa è la casa {h}. Ascolta ancora.',es:'Esa es la casa {h}. Escucha otra vez.',pt:'Essa é a casa {h}. Escute de novo.',nl:'Dit is huis {h}. Luister nog een keer.',sv:'Det här är hus {h}. Lyssna en gång till.',da:'Det her er hus {h}. Lyt en gang til.',no:'Dette er hus {h}. Lytt en gang til.',fi:'Tämä on talo {h}. Kuuntele vielä kerran.'},
    noteHelp:         {en:'The right door is glowing — post it there.',de:'Die richtige Tür leuchtet – wirf den Brief dort ein.',fr:'La bonne porte brille : glisse la lettre là.',it:'La porta giusta brilla: imbuca lì la lettera.',es:'La puerta correcta está brillando: echa la carta ahí.',pt:'A porta certa está brilhando: coloque a carta lá.',nl:'De juiste deur licht op: doe de brief daar in.',sv:'Rätt dörr lyser – lägg brevet där.',da:'Den rigtige dør lyser – læg brevet der.',no:'Riktig dør lyser – legg brevet der.',fi:'Oikea ovi hohtaa – pudota kirje sinne.'},
    noteDone:         {en:'All three letters delivered!',de:'Alle drei Briefe sind zugestellt!',fr:'Les trois lettres sont distribuées !',it:'Tutte e tre le lettere consegnate!',es:'¡Las tres cartas están entregadas!',pt:'As três cartas foram entregues!',nl:'Alle drie de brieven zijn bezorgd!',sv:'Alla tre breven är utdelade!',da:'Alle tre breve er afleveret!',no:'Alle tre brevene er levert!',fi:'Kaikki kolme kirjettä on jaettu!'},
    celebrate:        {en:'Yes! {a}, {b} and {c} — every letter at the right door.',de:'Ja! {a}, {b} und {c} – jeder Brief an der richtigen Tür.',fr:'Oui ! {a}, {b} et {c} : chaque lettre à la bonne porte.',it:'Sì! {a}, {b} e {c}: ogni lettera alla porta giusta.',es:'¡Sí! {a}, {b} y {c}: cada carta en la puerta correcta.',pt:'Isso! {a}, {b} e {c}: cada carta na porta certa.',nl:'Ja! {a}, {b} en {c}: elke brief bij de juiste deur.',sv:'Ja! {a}, {b} och {c} – varje brev vid rätt dörr.',da:'Ja! {a}, {b} og {c} – hvert brev ved den rigtige dør.',no:'Ja! {a}, {b} og {c} – hvert brev ved riktig dør.',fi:'Hienoa! {a}, {b} ja {c} – jokainen kirje oikealle ovelle.'},
    streetLabel:      {en:'The street',de:'Die Straße',fr:'La rue',it:'La via',es:'La calle',pt:'A rua',nl:'De straat',sv:'Gatan',da:'Gaden',no:'Gata',fi:'Katu'},
    houseLabel:       {en:'house {h}',de:'Haus {h}',fr:'maison {h}',it:'casa {h}',es:'casa {h}',pt:'casa {h}',nl:'huis {h}',sv:'hus {h}',da:'hus {h}',no:'hus {h}',fi:'talo {h}'},
    houseDone:        {en:'house {h}: delivered',de:'Haus {h}: zugestellt',fr:'maison {h} : distribuée',it:'casa {h}: consegnata',es:'casa {h}: entregada',pt:'casa {h}: entregue',nl:'huis {h}: bezorgd',sv:'hus {h}: utdelat',da:'hus {h}: afleveret',no:'hus {h}: levert',fi:'talo {h}: jaettu'},
    letterLabel:      {en:'letter for number {n} — drag it to a house',de:'Brief für die Nummer {n} – zieh ihn zu einem Haus',fr:'lettre pour le numéro {n} – fais-la glisser vers une maison',it:'lettera per il numero {n} – trascinala su una casa',es:'carta para el número {n}: arrástrala a una casa',pt:'carta para o número {n}: arraste até uma casa',nl:'brief voor nummer {n} – sleep hem naar een huis',sv:'brev till nummer {n} – dra det till ett hus',da:'brev til nummer {n} – træk det hen til et hus',no:'brev til nummer {n} – dra det til et hus',fi:'kirje numeroon {n} – vedä se taloon'},
    letterSpokenLabel:{en:'letter — tap to hear the number',de:'Brief – tippe, um die Zahl zu hören',fr:'lettre – touche pour entendre le nombre',it:'lettera – tocca per sentire il numero',es:'carta: toca para oír el número',pt:'carta: toque para ouvir o número',nl:'brief – tik om het getal te horen',sv:'brev – tryck för att höra talet',da:'brev – tryk for at høre tallet',no:'brev – trykk for å høre tallet',fi:'kirje – paina kuullaksesi luvun'},
    stackLabel:       {en:'{k} of 3 letters delivered',de:'{k} von 3 Briefen zugestellt',fr:'Lettres distribuées : {k} sur 3',it:'Lettere consegnate: {k} su 3',es:'{k} de 3 cartas entregadas',pt:'{k} de 3 cartas entregues',nl:'{k} van 3 brieven bezorgd',sv:'{k} av 3 brev utdelade',da:'{k} af 3 breve afleveret',no:'{k} av 3 brev levert',fi:'{k}/3 kirjettä jaettu'},
    hear:             {en:'Hear it',de:'Anhören',fr:'Écouter',it:'Ascolta',es:'Escuchar',pt:'Ouvir',nl:'Luister',sv:'Lyssna',da:'Lyt',no:'Lytt',fi:'Kuuntele'},
    show:             {en:'Show',de:'Zeigen',fr:'Montrer',it:'Mostra',es:'Mostrar',pt:'Mostrar',nl:'Laat zien',sv:'Visa',da:'Vis',no:'Vis',fi:'Näytä'},
    setRange:         {en:'Numbers',de:'Zahlen',fr:'Nombres',it:'Numeri',es:'Números',pt:'Números',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    rangeTo10:        {en:'To 10',de:'Bis 10',fr:'Jusqu’à 10',it:'Fino a 10',es:'Hasta 10',pt:'Até 10',nl:'Tot en met 10',sv:'Till 10',da:'Til 10',no:'Til 10',fi:'10:een asti'},
    rangeTo20:        {en:'To 20',de:'Bis 20',fr:'Jusqu’à 20',it:'Fino a 20',es:'Hasta 20',pt:'Até 20',nl:'Tot en met 20',sv:'Till 20',da:'Til 20',no:'Til 20',fi:'20:een asti'},
    setAddress:       {en:'Address',de:'Adresse',fr:'Adresse',it:'Indirizzo',es:'Dirección',pt:'Endereço',nl:'Adres',sv:'Adress',da:'Adresse',no:'Adresse',fi:'Osoite'},
    addrWritten:      {en:'Written',de:'Geschrieben',fr:'Écrite',it:'Scritto',es:'Escrita',pt:'Escrito',nl:'Geschreven',sv:'Skriven',da:'Skrevet',no:'Skrevet',fi:'Kirjoitettu'},
    addrSpoken:       {en:'Spoken',de:'Gesprochen',fr:'Parlée',it:'Detto a voce',es:'Hablada',pt:'Falado',nl:'Gesproken',sv:'Uppläst',da:'Læst op',no:'Lest opp',fi:'Ääneen luettu'}
  },

  defaults: { range: 'to20', address: 'written' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: 'to10', labelKey: 'rangeTo10' }, { value: 'to20', labelKey: 'rangeTo20' }] },
    { key: 'address', type: 'choice', labelKey: 'setAddress', options: [{ value: 'written', labelKey: 'addrWritten' }, { value: 'spoken', labelKey: 'addrSpoken' }] }
  ],

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null;
    this._pool = null; this._poolRange = null; this._order = null; this._curPass = 0;
    this._ro = null; this._note = null; this._autoCheck = null; this._theme = null; this._drag = null; this._speakTimer = null;
    injectLetterboxCSS();
    if (typeof LCSPictures !== 'undefined') {
      LCSPictures.load(LetterboxCore.THEME).then(function (theme) { self._theme = theme; if (self._street) self._paintAll(); self._preload(); }).catch(function () { /* the doors open on an empty step */ });
    }
  },
  destroy: function () {
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
    if (this._autoCheck) { clearTimeout(this._autoCheck); this._autoCheck = null; }
    if (this._speakTimer) { clearTimeout(this._speakTimer); this._speakTimer = null; }
  },
  onSettings: function (key) {
    if (key === 'range') { this._pool = null; this._order = null; }
    if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
  },

  /* ---------------- rounds ---------------- */
  /* the stage's CONTENT width (clientWidth counts the padding, and a row of five is cut exactly to the width) */
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    /* floored from the fractional width: clientWidth rounds UP past the true width and a row cut exactly to it would wrap */
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 560;
  },
  _range: function () { var r = this.api && this.api.settings && this.api.settings.range; return LetterboxCore.POOLS[r] ? r : 'to20'; },
  _spoken: function () { return !!(this.api && this.api.settings && this.api.settings.address === 'spoken'); },
  _ensurePool: function () { var r = this._range(); if (!this._pool || this._poolRange !== r) { this._pool = LetterboxCore.rounds(r, 'lb'); this._poolRange = r; this._order = null; } return this._pool; },
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
    var r = pool[this._order[index % n]], spoken = this._spoken();
    return {
      id: 'letterbox.' + r.id + (spoken ? '.spoken' : ''),
      promptKey: spoken ? 'promptSpoken' : 'promptWritten',
      promptArgs: { a: r.letters[0], b: r.letters[1], c: r.letters[2] },
      celebrateKey: 'celebrate',
      answerType: 'state',
      setup: function (tool) {
        if (tool._autoCheck) { clearTimeout(tool._autoCheck); tool._autoCheck = null; }
        tool._note = null;
        tool.st = LetterboxCore.newState(r, tool.api.lang, { spoken: spoken });
        tool._preload();
        if (spoken) tool._speakSoon();
      },
      check: function (tool) { var ok = LetterboxCore.verdict(tool.st) === 'done'; if (ok) tool._onRight(); return ok; },
      hintKey: function (tool) { tool._nudge(); return (LetterboxCore.delivered(tool.st) === 0 && tool.st.misses === 0) ? 'hintStart' : 'hintUnfinished'; }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = LetterboxCore.newState(LetterboxCore.rounds('to20', 'lb')[4], api.lang, { spoken: false });
    var wrap = api.el('div', 'lb-wrap');
    this._wrap = wrap;

    /* the street */
    var street = api.el('div', 'lb-street');
    street.setAttribute('role', 'group');
    street.setAttribute('aria-label', t('streetLabel'));
    this._street = street;
    this._houses = [];
    for (var i = 0; i < LetterboxCore.HOUSES; i++) {
      var house = api.el('button', 'lb-house lb-house-' + i); house.type = 'button'; house.dataset.i = String(i);
      house.innerHTML = houseSVG(i);
      (function (idx) { house.addEventListener('click', function () { if (self._drag && self._drag.moved) return; self._deliver(idx); }); }(i));
      street.appendChild(house);
      this._houses.push(house);
    }
    wrap.appendChild(street);

    /* the van: the current letter + the stack dots */
    var van = api.el('div', 'lb-van');
    var letter = api.el('button', 'lb-letter'); letter.type = 'button';
    letter.innerHTML = '<span class="lb-stamp" aria-hidden="true"></span>';
    var addr = svgEl('svg', { class: 'lb-address', viewBox: '0 0 100 100', 'aria-hidden': 'true' });
    letter.appendChild(addr);
    this._letter = letter; this._addr = addr;
    this._wireLetter(letter);
    van.appendChild(letter);
    var stack = api.el('div', 'lb-stack'); stack.setAttribute('role', 'img');
    this._stack = stack; this._dots = [];
    for (var k = 0; k < LetterboxCore.LETTERS; k++) { var dot = api.el('span', 'lb-dot'); stack.appendChild(dot); this._dots.push(dot); }
    van.appendChild(stack);
    this._van = van;

    /* the kerb: (the van on a wide stage) + the strip */
    var kerb = api.el('div', 'lb-kerb');
    this._kerb = kerb;
    var strip = api.el('div', 'lb-strip');
    var hear = api.el('button', 'lb-tool lb-hear'); hear.type = 'button';
    hear.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M19 7a8 8 0 0 1 0 10"/></svg><span class="lb-tool-text"></span>';
    hear.lastChild.textContent = t('hear'); hear.setAttribute('aria-label', t('hear'));
    hear.addEventListener('click', function () { self._speakLetter(); });
    this._hear = hear; strip.appendChild(hear);
    var note = api.el('div', 'lb-note'); note.setAttribute('aria-live', 'polite'); this._noteEl = note; strip.appendChild(note);
    var show = api.el('button', 'lb-tool lb-show'); show.type = 'button';
    show.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg><span class="lb-tool-text"></span>';
    show.lastChild.textContent = t('show'); show.setAttribute('aria-label', t('show'));
    show.addEventListener('click', function () { self._show(); });
    this._showBtn = show; strip.appendChild(show);
    this._strip = strip;
    kerb.appendChild(strip);
    wrap.appendChild(kerb);

    stage.appendChild(wrap);
    this._layout();
    this._paintAll();
    this._watchWidth();
  },

  _layout: function () {
    var L = this._L = LetterboxCore.layout(this._width());
    this._wrap.classList.toggle('is-row', L.mode === 'row');
    this._wrap.classList.toggle('is-grid', L.mode === 'grid');
    this._wrap.style.setProperty('--lb-hw', L.hw + 'px');
    this._wrap.style.setProperty('--lb-gap', L.gap + 'px');
    if (L.mode === 'row') { if (this._van.parentNode !== this._kerb) this._kerb.insertBefore(this._van, this._strip); }
    else if (this._van.parentNode !== this._street) this._street.appendChild(this._van);
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._street || !self._street.isConnected) return;
      last = w;
      self._layout(); self._paintAll();
    });
    this._ro.observe(this.api.stage);
  },

  _paintAll: function () {
    var st = this.st, t = this.api.t, lang = this.api.lang, self = this;
    var right = LetterboxCore.rightHouse(st), n = LetterboxCore.letter(st);
    /* houses */
    for (var i = 0; i < this._houses.length; i++) {
      var h = st.houses[i], el = this._houses[i];
      el.querySelector('.lb-plate').textContent = String(h.n);
      el.classList.toggle('is-open', h.open);
      el.classList.toggle('is-help', !st.done && st.help && i === right);
      el.disabled = h.open || st.done;
      var who = this._residentLabel(h.resident);
      el.setAttribute('aria-label', h.open ? (interp(t('houseDone'), { h: h.n }) + (who ? ' — ' + who : '')) : interp(t('houseLabel'), { h: h.n }));
      var img = el.querySelector('.lb-resident');
      if (h.open && !img && this._theme && this._theme.nouns[h.resident]) {
        img = LCSPictures.img(this._theme, h.resident, lang, { plural: false });
        img.className = 'lb-resident';
        el.appendChild(img);
      } else if (!h.open && img) el.removeChild(img);
    }
    /* the letter */
    var letter = this._letter;
    letter.hidden = st.done;
    letter.classList.toggle('is-hidden-number', st.spoken && !st.revealed);
    letter.setAttribute('aria-label', (st.spoken && !st.revealed) ? t('letterSpokenLabel') : interp(t('letterLabel'), { n: n }));
    this._paintAddress(n);
    /* the stack */
    for (var k = 0; k < this._dots.length; k++) { this._dots[k].classList.toggle('is-done', k < st.at); this._dots[k].classList.toggle('is-now', k === st.at && !st.done); }
    this._stack.setAttribute('aria-label', interp(t('stackLabel'), { k: st.at }));
    /* the strip */
    var note = this._note || { key: st.done ? 'noteDone' : (st.spoken && !st.revealed) ? 'noteSpoken' : (st.at > 0 ? 'noteNext' : 'noteStart'), args: {}, slip: false };
    this._noteEl.textContent = interp(t(note.key), note.args);
    this._noteEl.classList.toggle('is-slip', !!note.slip);
    this._noteEl.classList.toggle('is-done', st.done);
    this._hear.disabled = st.done;
    this._showBtn.hidden = !st.spoken;
    this._showBtn.disabled = st.done || st.revealed;
    void self;
  },
  /* the address: the handwritten digits (the handwriting instrument's glyphs), or a speaker until Show */
  _paintAddress: function (n) {
    var sv = this._addr, st = this.st;
    while (sv.firstChild) sv.removeChild(sv.firstChild);
    if (n === null || n === undefined) return;
    if (st.spoken && !st.revealed) {
      sv.setAttribute('viewBox', '0 0 100 100');
      sv.appendChild(svgEl('path', { d: 'M22 40v20h14l16 13V27L36 40H22z', class: 'lb-speakerglyph' }));
      sv.appendChild(svgEl('path', { d: 'M60 40a14 14 0 0 1 0 20', class: 'lb-speakerwave' }));
      sv.appendChild(svgEl('path', { d: 'M68 31a26 26 0 0 1 0 38', class: 'lb-speakerwave' }));
      return;
    }
    var digits = LetterboxCore.handwriting(n, this.api.lang), STEP = 62;
    sv.setAttribute('viewBox', '0 0 ' + (100 + STEP * (digits.length - 1)) + ' 100');
    for (var i = 0; i < digits.length; i++) {
      var g = svgEl('g', { transform: 'translate(' + (STEP * i) + ' 0)' });
      for (var s = 0; s < digits[i].strokes.length; s++) g.appendChild(svgEl('path', { d: pathOf(digits[i].strokes[s]), class: 'lb-ink' }));
      sv.appendChild(g);
    }
  },
  _residentLabel: function (noun) {
    if (!this._theme || !this._theme.nouns[noun]) return '';
    try { return LCSPictures.label(this._theme, noun, this.api.lang, { plural: false }); } catch (e) { return ''; }
  },
  _preload: function () {
    if (!this._theme || !this.st || typeof Image === 'undefined') return;
    for (var i = 0; i < this.st.houses.length; i++) { var r = this.st.houses[i].resident; if (this._theme.nouns[r]) { var im = new Image(); im.src = LCSPictures.url(this._theme, r); } }
  },

  /* ---------------- the hand: drag the letter, or tap a door ---------------- */
  _wireLetter: function (letter) {
    var self = this;
    letter.addEventListener('pointerdown', function (ev) {
      if (!self.st || self.st.done || letter.hidden) return;
      if (ev.button !== undefined && ev.button !== 0) return;
      ev.preventDefault();
      self._drag = { id: ev.pointerId, x0: ev.clientX, y0: ev.clientY, moved: false, over: -1 };
      try { letter.setPointerCapture(ev.pointerId); } catch (e) {}
    });
    letter.addEventListener('pointermove', function (ev) {
      var d = self._drag; if (!d || d.id !== ev.pointerId) return;
      var dx = ev.clientX - d.x0, dy = ev.clientY - d.y0;
      if (!d.moved) { if (Math.hypot(dx, dy) < 6) return; d.moved = true; letter.classList.remove('lb-return'); letter.classList.add('is-dragging'); }
      letter.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(1.06)';
      var over = self._houseAt(ev.clientX, ev.clientY);
      if (over !== d.over) { if (d.over >= 0) self._houses[d.over].classList.remove('is-over'); d.over = over; if (over >= 0) self._houses[over].classList.add('is-over'); }
    });
    var end = function (ev) {
      var d = self._drag; if (!d || d.id !== ev.pointerId) return;
      try { letter.releasePointerCapture(ev.pointerId); } catch (e) {}
      /* the door under the finger is read while the letter is still transparent to hit-testing —
         once is-dragging is removed the letter itself sits under the pointer */
      var dropped = (d.moved && ev.type === 'pointerup') ? self._houseAt(ev.clientX, ev.clientY) : -1;
      if (d.over >= 0) self._houses[d.over].classList.remove('is-over');
      letter.classList.remove('is-dragging');
      if (d.moved) {
        letter.classList.add('lb-return'); letter.style.transform = '';
        if (dropped >= 0) self._deliver(dropped);
        setTimeout(function () { self._drag = null; }, 0);   /* the click that follows a drag is not a tap */
        return;
      }
      self._drag = null;
      self._tapLetter();
    };
    letter.addEventListener('pointerup', end);
    letter.addEventListener('pointercancel', end);
    letter.addEventListener('click', function (ev) { ev.preventDefault(); });
    letter.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); self._tapLetter(); } });
  },
  _houseAt: function (x, y) {
    var el = document.elementFromPoint(x, y), h = el && el.closest ? el.closest('.lb-house') : null;
    if (!h || h.disabled) return -1;
    return parseInt(h.dataset.i, 10);
  },
  _tapLetter: function () {
    if (!this.st || this.st.done) return;
    bounce(this._letter, 'lb-bounce');
    this._speakLetter();
    this.api.track('tapLetter', { n: LetterboxCore.letter(this.st) });
  },
  _deliver: function (i) {
    var st = this.st, self = this, t = this.api.t;
    if (!st || st.done) return;
    var res = LetterboxCore.deliver(st, i);
    if (res.result === 'none') return;
    if (res.result === 'right') {
      this._note = null;
      this.api.sound(660); setTimeout(function () { self.api.sound(880); }, 140);
      this._speakNumber(res.n);
      /* the letter flies to the slot, the door opens, the neighbour steps out */
      var house = this._houses[i];
      this._fly(house);
      bounce(house, 'lb-pop');
      this.api.announce(interp(t('houseDone'), { h: res.n }));
      this.api.track('right', { n: res.n, house: i, misses: st.log[st.log.length - 1].misses });
      setTimeout(function () { if (self.st !== st) return; self._paintAll(); if (!st.done) { bounce(self._letter, 'lb-new'); if (st.spoken) self._speakSoon(); } }, 380);
      if (res.round) {
        if (this._autoCheck) clearTimeout(this._autoCheck);
        this._autoCheck = setTimeout(function () {
          self._autoCheck = null;
          var btn = document.querySelector('.lcs-activity-check');
          if (btn && !btn.hidden && !btn.disabled && self.st === st && st.done) btn.click();
        }, 900);
      }
      return;
    }
    /* a wrong door: it reads its own number back; the slip is named; the letter comes back */
    var key = (st.spoken && !st.revealed) ? 'wrongSpoken' : ({ reversed: 'wrongReversed', lastDigit: 'wrongLastDigit', oneDigit: 'wrongOneDigit', twoDigits: 'wrongTwoDigits', firstDigit: 'wrongFirstDigit', shape: 'wrongShape', off: 'wrongOff' }[res.slip] || 'wrongOff');
    if (res.helped) key = 'noteHelp';
    this._note = { key: key, args: { h: res.door, n: res.n }, slip: !res.helped };
    this.api.sound(300);
    this._speakNumber(res.door);
    this._paintAll();
    bounce(this._houses[i], 'lb-wobble');
    bounce(this._letter, 'lb-bounce');
    this.api.announce(this._noteEl.textContent);
    this.api.track('wrong', { n: res.n, door: res.door, slip: res.slip, helped: !!res.helped });
  },
  /* the posted letter: a copy slides into the slot of the house and fades */
  _fly: function (house) {
    var letter = this._letter;
    if (!letter || !house || !letter.isConnected) return;
    var a = letter.getBoundingClientRect(), b = house.getBoundingClientRect();
    var ghost = letter.cloneNode(true);
    ghost.classList.add('lb-ghost'); ghost.removeAttribute('aria-label'); ghost.setAttribute('aria-hidden', 'true'); ghost.tabIndex = -1;
    ghost.style.position = 'fixed'; ghost.style.left = a.left + 'px'; ghost.style.top = a.top + 'px'; ghost.style.width = a.width + 'px'; ghost.style.height = a.height + 'px'; ghost.style.margin = '0';
    var tx = (b.left + b.width / 2) - (a.left + a.width / 2), ty = (b.top + b.height * 0.74) - (a.top + a.height / 2);
    ghost.style.setProperty('--lb-dx', tx + 'px'); ghost.style.setProperty('--lb-dy', ty + 'px');
    document.body.appendChild(ghost);
    letter.classList.add('is-sent');
    setTimeout(function () { if (ghost.parentNode) ghost.parentNode.removeChild(ghost); letter.classList.remove('is-sent'); }, 420);
  },
  _show: function () {
    var st = this.st;
    if (!st || !LetterboxCore.reveal(st)) return;
    this._note = null;
    this._paintAll();
    bounce(this._letter, 'lb-bounce');
    this.api.track('show', { n: LetterboxCore.letter(st) });
  },
  _nudge: function () {
    if (this.st && !this.st.done) bounce(this._letter, 'lb-bounce');
  },
  _onRight: function () {
    var st = this.st;
    this._note = null;
    this._paintAll();
    for (var i = 0; i < this._houses.length; i++) if (st.houses[i].open) (function (h, d) { setTimeout(function () { bounce(h, 'lb-pop'); }, 110 * d); }(this._houses[i], i));
    this.api.track('round', { id: st.id, misses: st.log.map(function (l) { return l.misses; }) });
  },

  /* ---------------- the voice ---------------- */
  _speakLetter: function () { var n = this.st && LetterboxCore.letter(this.st); if (n !== null && n !== undefined) this._speakNumber(n); },
  _speakSoon: function () { var self = this; if (this._speakTimer) clearTimeout(this._speakTimer); this._speakTimer = setTimeout(function () { self._speakTimer = null; self._speakLetter(); }, 350); },
  _speakNumber: function (n) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: 0.95 }); } catch (e) { /* silent */ }
  }
};

/* ---- the house: roof, body, a printed plate, a door with a slot (apparatus geometry only) ---- */
var HOUSE_FILL = ['#F6D9C6', '#CFE4F4', '#D6EDCC', '#F7E6A8', '#E4D8F3'];
var ROOF_FILL = ['#D98B6E', '#6FA3C9', '#7DB86A', '#D9B14A', '#9C85C8'];
function houseSVG(i) {
  var f = HOUSE_FILL[i % HOUSE_FILL.length], r = ROOF_FILL[i % ROOF_FILL.length];
  return '<svg class="lb-housesvg" viewBox="0 0 100 136" aria-hidden="true" focusable="false">'
    + '<rect class="lb-body" x="6" y="38" width="88" height="96" rx="5" fill="' + f + '"/>'
    + '<polygon class="lb-roof" points="0,40 50,2 100,40" fill="' + r + '"/>'
    + '<rect class="lb-door" x="30" y="76" width="40" height="58" rx="4"/>'
    + '<rect class="lb-slot" x="40" y="98" width="20" height="5" rx="2.5"/>'
    + '<circle class="lb-knob" cx="63" cy="110" r="2.6"/>'
    + '<rect class="lb-plate-bg" x="20" y="19" width="60" height="28" rx="7"/>'
    + '<text class="lb-plate" x="50" y="40"></text>'
    + '</svg>';
}

function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; }); }
function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
function svgEl(tag, attrs) { var e = document.createElementNS('http://www.w3.org/2000/svg', tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
function pathOf(pts) { var d = ''; for (var i = 0; i < pts.length; i++) d += (i ? ' L ' : 'M ') + pts[i].x.toFixed(1) + ' ' + pts[i].y.toFixed(1); return d; }

var lbCssDone = false;
function injectLetterboxCSS() {
  if (lbCssDone || typeof document === 'undefined') return;
  lbCssDone = true;
  var css = ''
  + '.lb-wrap{width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;--lb-hw:120px;--lb-gap:12px;--lb-ink:#1F3C88;}'
  /* the street */
  + '.lb-street{display:flex;flex-wrap:wrap;gap:var(--lb-gap);justify-content:center;align-items:flex-end;width:100%;}'
  + '.lb-house{width:var(--lb-hw);height:calc(var(--lb-hw) * 1.36);flex:0 0 auto;position:relative;border:0;background:none;padding:0;margin:0;cursor:pointer;border-radius:12px;touch-action:manipulation;transition:transform .15s var(--lcs-ease);-webkit-tap-highlight-color:transparent;}'
  + '.lb-house:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:3px;}'
  + '.lb-house:disabled{cursor:default;}'
  + '.lb-house.is-over{transform:translateY(-5px) scale(1.05);}'
  + '.lb-housesvg{width:100%;height:100%;display:block;overflow:visible;}'
  + '.lb-body,.lb-roof{stroke:var(--lcs-structure);stroke-width:2.6;stroke-linejoin:round;}'
  + '.lb-door{fill:var(--lcs-structure);stroke:var(--lcs-structure);stroke-width:2.6;transition:fill .25s;} .lb-house.is-open .lb-door{fill:#2A2A35;}'
  + '.lb-slot{fill:#2A2A35;opacity:.55;} .lb-house.is-open .lb-slot{opacity:0;} .lb-knob{fill:#F2C879;} .lb-house.is-open .lb-knob{opacity:0;}'
  + '.lb-plate-bg{fill:#FFFFFF;stroke:var(--lcs-structure);stroke-width:2.6;transition:stroke .25s;} .lb-house.is-open .lb-plate-bg{stroke:var(--lcs-good);stroke-width:3.2;}'
  + '.lb-house.is-over .lb-plate-bg{fill:var(--lcs-structure-soft);}'
  + '.lb-house.is-help .lb-plate-bg{stroke:var(--lcs-accent);stroke-width:4;animation:lb-glow 1.1s ease-in-out infinite;}'
  + '@keyframes lb-glow{0%,100%{filter:drop-shadow(0 0 0 rgba(242,120,75,0));}50%{filter:drop-shadow(0 0 6px rgba(242,120,75,.9));}}'
  + '.lb-plate{font-family:var(--lcs-font-display);font-weight:800;font-size:24px;fill:var(--lcs-ink);text-anchor:middle;}'
  + '.lb-resident{position:absolute;left:8%;bottom:1.5%;width:84%;height:auto;aspect-ratio:1/1;object-fit:contain;opacity:0;transform:translateY(10px) scale(.6);transition:transform .35s var(--lcs-ease),opacity .25s;pointer-events:none;filter:drop-shadow(0 3px 2px rgba(20,30,28,.18));}'
  + '.lb-house.is-open .lb-resident{opacity:1;transform:none;}'
  /* the van */
  + '.lb-van{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;border-radius:16px;background:var(--lcs-surface-2);border:2px solid var(--lcs-line);box-sizing:border-box;padding:8px;flex:0 0 auto;}'
  + '.lb-street .lb-van{width:var(--lb-hw);height:calc(var(--lb-hw) * 1.36);padding:6px 4px;}'
  + '.lb-kerb .lb-van{width:188px;min-height:132px;}'
  + '.lb-letter{position:relative;width:100%;max-width:170px;aspect-ratio:4/3;border-radius:10px;background:#FFFDF6;border:2.5px solid var(--lcs-structure);box-sizing:border-box;box-shadow:0 3px 0 rgba(20,107,94,.12),0 6px 14px rgba(20,30,28,.08);cursor:grab;touch-action:none;-webkit-user-select:none;user-select:none;padding:0;margin:0;display:flex;align-items:center;justify-content:center;transition:box-shadow .15s;}'
  + '.lb-letter:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:3px;}'
  + '.lb-letter.is-dragging{cursor:grabbing;z-index:5;pointer-events:none;box-shadow:0 10px 24px rgba(20,30,28,.22);}'
  + '.lb-letter.lb-return{transition:transform .25s var(--lcs-ease),box-shadow .15s;}'
  + '.lb-letter.is-sent{opacity:0;}'
  + '.lb-letter[hidden]{display:none;}'
  + '.lb-stamp{position:absolute;top:6%;right:5%;width:15%;aspect-ratio:1/1;border:1.5px dashed var(--lcs-structure);border-radius:2px;background:rgba(242,120,75,.28);pointer-events:none;}'
  + '.lb-address{width:76%;height:72%;display:block;pointer-events:none;}'
  + '.lb-ink{fill:none;stroke:var(--lb-ink);stroke-width:7;stroke-linecap:round;stroke-linejoin:round;}'
  + '.lb-speakerglyph{fill:var(--lcs-structure);} .lb-speakerwave{fill:none;stroke:var(--lcs-structure);stroke-width:6;stroke-linecap:round;}'
  + '.lb-ghost{z-index:20;pointer-events:none;animation:lb-fly .42s var(--lcs-ease) forwards;}'
  + '@keyframes lb-fly{0%{transform:translate(0,0) scale(1);opacity:1;}70%{opacity:1;}100%{transform:translate(var(--lb-dx),var(--lb-dy)) scale(.22);opacity:0;}}'
  + '.lb-stack{display:flex;gap:6px;} .lb-dot{width:12px;height:12px;border-radius:50%;border:2px solid var(--lcs-structure);box-sizing:border-box;background:transparent;transition:background .2s;}'
  + '.lb-dot.is-now{background:var(--lcs-structure);} .lb-dot.is-done{background:var(--lcs-good);border-color:var(--lcs-good);}'
  /* the kerb + the strip */
  + '.lb-kerb{display:flex;gap:12px;align-items:stretch;width:100%;}'
  + '.lb-strip{flex:1 1 auto;min-width:0;display:flex;align-items:center;gap:10px;box-sizing:border-box;padding:10px 12px;border-radius:18px;background:var(--lcs-surface);border:2px solid var(--lcs-line);}'
  + '.lb-note{flex:1 1 120px;min-width:0;font-family:var(--lcs-font-body);font-weight:700;font-size:15px;line-height:1.3;color:var(--lcs-structure);text-align:center;}'
  + '.lb-note.is-slip{color:var(--lcs-accent);} .lb-note.is-done{color:var(--lcs-good);}'
  + '.lb-tool{min-height:44px;min-width:44px;padding:0 16px 0 12px;border-radius:999px;border:2px solid var(--lcs-structure-soft);background:var(--lcs-surface);font-family:var(--lcs-font-body);font-weight:700;font-size:15px;color:var(--lcs-structure);cursor:pointer;touch-action:manipulation;display:inline-flex;align-items:center;gap:6px;flex:0 0 auto;}'
  + '.lb-tool:hover{background:var(--lcs-structure-soft);} .lb-tool:disabled{opacity:.45;cursor:default;} .lb-tool[hidden]{display:none;}'
  /* motion */
  + '.lb-bounce{animation:lb-bounce .4s var(--lcs-ease) 1;} @keyframes lb-bounce{0%,100%{transform:none;}40%{transform:translateY(-6px) scale(1.03);}}'
  + '.lb-new{animation:lb-new .4s var(--lcs-ease) 1;} @keyframes lb-new{0%{transform:scale(.6);opacity:0;}100%{transform:none;opacity:1;}}'
  + '.lb-wobble{animation:lb-wobble .45s var(--lcs-ease) 1;} @keyframes lb-wobble{0%,100%{transform:translateX(0);}25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}'
  + '.lb-pop{animation:lb-pop .5s var(--lcs-ease) 1;} @keyframes lb-pop{0%{transform:none;}45%{transform:scale(1.06);}100%{transform:none;}}'
  + '@media (max-width:420px){.lb-strip{gap:8px;padding:8px 10px;} .lb-tool{padding:0;width:44px;justify-content:center;} .lb-tool-text{display:none;} .lb-note{font-size:14px;}}'
  + '@media (prefers-reduced-motion:reduce){.lb-house,.lb-letter,.lb-resident,.lb-plate-bg{animation:none!important;transition:none!important;} .lb-ghost{display:none;}}';
  var style = document.createElement('style');
  style.id = 'lb-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = LetterboxActivity;
if (typeof window !== 'undefined') window.LetterboxActivity = LetterboxActivity;
