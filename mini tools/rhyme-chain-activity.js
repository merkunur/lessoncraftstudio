/* =====================================================================
   rhyme-chain-activity.js — ACTIVITY #42 of the one-by-one rebuild:
   "Rosa Raccoon's Rhyme Wagon" → THE RHYME CHAIN (RF.K.2.a).
   Design sheet: docs/activities-rebuild/designs/042-rhyme-shop.md
   ---------------------------------------------------------------------
   THE INVENTION: Rosa's wagon pulls a chain of rings, and a ring only
   closes on a ring whose word ENDS WITH THE SAME SOUND. Tap a picture to
   hear its name, drag it to the end of the chain: a rhyme snaps shut and
   both rings glow the same pattern; a non-rhyme springs its ring open and
   the picture falls back onto the grass. Same pattern, same ending — the
   children start to see sound.

   ACTIVITY LAYER ONLY: the model is rhyme-chain-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.RhymeChainActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var RhymeChainActivity = {
  id: 'rhyme-chain',
  apparatusClasses: ['rc-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:           {en:'Rosa’s Rhyme Wagon',de:'Rosas Reimwagen',fr:'Le chariot à rimes de Rosa',es:'El carrito de rimas de Rosa',pt:'A carroça de rimas da Rosa',it:'Il carretto delle rime di Rosa',nl:'Rosa’s rijmkar',sv:'Rosas rimvagn',da:'Rosas rimvogn',no:'Rosas rimvogn',fi:'Rosan riimikärryt'},
    instruction:     {en:'Tap a picture to hear its name. Hang it on Rosa’s chain — a ring only closes if the ending sounds the same!',de:'Tippe ein Bild an, dann hörst du seinen Namen. Häng es an Rosas Kette – ein Ring schließt sich nur, wenn das Ende gleich klingt!',fr:'Touche une image pour entendre son nom. Accroche-la à la chaîne de Rosa : un anneau ne se ferme que si la fin sonne pareil !',es:'Toca una imagen para oír su nombre. Cuélgala en la cadena de Rosa: ¡un aro solo se cierra si el final suena igual!',pt:'Toque numa figura para ouvir o nome dela. Pendure-a na corrente da Rosa: um anel só se fecha se o final soar igual!',it:'Tocca un’immagine per sentire il suo nome. Appendila alla catena di Rosa: un anello si chiude solo se la fine suona uguale!',nl:'Tik op een plaatje om de naam te horen. Hang het aan Rosa’s ketting: een ring gaat alleen dicht als het einde hetzelfde klinkt!',sv:'Tryck på en bild för att höra vad den heter. Häng den på Rosas kedja – en ring stängs bara om slutet låter likadant!',da:'Tryk på et billede for at høre, hvad det hedder. Hæng det på Rosas kæde – en ring lukker sig kun, hvis slutningen lyder ens!',no:'Trykk på et bilde for å høre hva det heter. Heng det på Rosas kjede – en ring lukker seg bare hvis slutten høres lik ut!',fi:'Napauta kuvaa, niin kuulet sen nimen. Ripusta se Rosan ketjuun – rengas sulkeutuu vain, jos sanan loppu kuulostaa samalta!'},
    check:           {en:'Pull the wagon',de:'Wagen ziehen',fr:'Tirer le chariot',es:'Jalar el carrito',pt:'Puxar a carroça',it:'Tira il carretto',nl:'Trek de kar',sv:'Dra vagnen',da:'Træk vognen',no:'Trekk vogna',fi:'Vedä kärryjä'},
    pJudge:          {en:'Do {a} and {b} rhyme?',de:'Reimen sich {a} und {b}?',fr:'Est-ce que {a} et {b} riment ?',es:'¿Riman {a} y {b}?',pt:'{A} e {b} rimam?',it:'{A} e {b} fanno rima?',nl:'Rijmen {a} en {b}?',sv:'Rimmar {a} och {b}?',da:'Rimer {a} og {b}?',no:'Rimer {a} og {b}?',fi:'Rimmaavatko {a} ja {b}?'},
    pPick:           {en:'Which one rhymes with {anchor}?',de:'Was reimt sich auf {anchor}?',fr:'Quel mot rime avec {anchor} ?',es:'¿Qué palabra rima con {anchor}?',pt:'Qual rima com {anchor}?',it:'Che cosa fa rima con {anchor}?',nl:'Wat rijmt op {anchor}?',sv:'Vad rimmar på {anchor}?',da:'Hvad rimer på {anchor}?',no:'Hva rimer på {anchor}?',fi:'Mikä rimmaa sanan {anchor} kanssa?'},
    pOdd:            {en:'Which one doesn’t rhyme?',de:'Was reimt sich nicht?',fr:'Quel mot ne rime pas ?',es:'¿Cuál no rima?',pt:'Qual não rima?',it:'Quale non fa rima?',nl:'Wat rijmt niet?',sv:'Vilken rimmar inte?',da:'Hvilket rimer ikke?',no:'Hvilket rimer ikke?',fi:'Mikä ei rimmaa?'},
    pSort:           {en:'Hang each picture on the chain it rhymes with.',de:'Häng jedes Bild an die Kette, auf die es sich reimt.',fr:'Accroche chaque image à la chaîne avec laquelle elle rime.',es:'Cuelga cada imagen en la cadena con la que rima.',pt:'Pendure cada figura na corrente com que ela rima.',it:'Appendi ogni immagine alla catena con cui fa rima.',nl:'Hang elk plaatje aan de ketting waar het op rijmt.',sv:'Häng varje bild på den kedja den rimmar med.',da:'Hæng hvert billede på den kæde, det rimer med.',no:'Heng hvert bilde på kjeden det rimer med.',fi:'Ripusta jokainen kuva siihen ketjuun, jonka kanssa se rimmaa.'},
    pFinish:         {en:'Finish Rosa’s rhyme!',de:'Mach Rosas Reim fertig!',fr:'Termine la comptine de Rosa !',es:'¡Termina la rima de Rosa!',pt:'Complete a rima da Rosa!',it:'Completa la rima di Rosa!',nl:'Maak Rosa’s rijmpje af!',sv:'Gör klart Rosas ramsa!',da:'Gør Rosas rim færdigt!',no:'Gjør ferdig Rosas regle!',fi:'Täydennä Rosan loru!'},
    pField:          {en:'Find the {n} that rhyme with {anchor}.',de:'Finde die {n} Bilder, die sich auf {anchor} reimen.',fr:'Trouve les {n} images qui riment avec {anchor}.',es:'Encuentra las {n} imágenes que riman con {anchor}.',pt:'Ache as {n} figuras que rimam com {anchor}.',it:'Trova le {n} immagini che fanno rima con {anchor}.',nl:'Zoek de {n} plaatjes die rijmen op {anchor}.',sv:'Hitta de {n} bilderna som rimmar på {anchor}.',da:'Find de {n} billeder, der rimer på {anchor}.',no:'Finn de {n} bildene som rimer på {anchor}.',fi:'Etsi {n} kuvaa, jotka rimmaavat sanan {anchor} kanssa.'},
    pChain:          {en:'Make a rhyme chain with {anchor}!',de:'Mach eine Reimkette mit {anchor}!',fr:'Fais une chaîne de rimes avec {anchor} !',es:'¡Haz una cadena de rimas con {anchor}!',pt:'Faça uma corrente de rimas com {anchor}!',it:'Fai una catena di rime con {anchor}!',nl:'Maak een rijmketting met {anchor}!',sv:'Gör en rimkedja med {anchor}!',da:'Lav en rimkæde med {anchor}!',no:'Lag en rimkjede med {anchor}!',fi:'Tee riimiketju sanasta {anchor}!'},
    hintEmpty:       {en:'Tap a picture to hear it. Then hang the one that rhymes.',de:'Tippe ein Bild an und hör zu. Dann häng das Bild an, das sich reimt.',fr:'Touche une image pour l’entendre. Puis accroche celle qui rime.',es:'Toca una imagen para oírla. Luego cuelga la que rima.',pt:'Toque numa figura para ouvir. Depois pendure a que rima.',it:'Tocca un’immagine per sentirla. Poi appendi quella che fa rima.',nl:'Tik op een plaatje om het te horen. Hang dan het plaatje op dat rijmt.',sv:'Tryck på en bild och lyssna. Häng sedan på den som rimmar.',da:'Tryk på et billede, og lyt. Hæng så det billede på, der rimer.',no:'Trykk på et bilde og lytt. Heng så på det som rimer.',fi:'Napauta kuvaa ja kuuntele. Ripusta sitten se, joka rimmaa.'},
    hintJudge:       {en:'Say both names. Then tap the closed rings or the open rings.',de:'Sprich beide Namen. Dann tippe auf die geschlossenen oder die offenen Ringe.',fr:'Dis les deux noms. Puis touche les anneaux fermés ou les anneaux ouverts.',es:'Di los dos nombres. Luego toca los aros cerrados o los aros abiertos.',pt:'Diga os dois nomes. Depois toque nos anéis fechados ou nos anéis abertos.',it:'Di’ i due nomi. Poi tocca gli anelli chiusi o gli anelli aperti.',nl:'Zeg allebei de namen. Tik dan op de dichte of de open ringen.',sv:'Säg båda namnen. Tryck sedan på de stängda eller de öppna ringarna.',da:'Sig begge navne. Tryk så på de lukkede eller de åbne ringe.',no:'Si begge navnene. Trykk så på de lukkede eller de åpne ringene.',fi:'Sano molemmat nimet. Napauta sitten suljettuja tai avoimia renkaita.'},
    hintOddEmpty:    {en:'Tap the picture that won’t hold, then pull the wagon.',de:'Tippe das Bild an, das nicht hält, und zieh dann den Wagen.',fr:'Touche l’image qui ne tiendra pas, puis tire le chariot.',es:'Toca la imagen que no se va a quedar colgada y luego jala el carrito.',pt:'Toque na figura que não vai ficar presa e depois puxe a carroça.',it:'Tocca l’immagine che non resterà appesa, poi tira il carretto.',nl:'Tik op het plaatje dat niet blijft hangen en trek dan de kar.',sv:'Tryck på bilden som inte håller och dra sedan vagnen.',da:'Tryk på det billede, der ikke kan holde, og træk så vognen.',no:'Trykk på bildet som ikke holder, og trekk så vogna.',fi:'Napauta kuvaa, joka ei pysy ketjussa, ja vedä sitten kärryjä.'},
    hintEnds:        {en:'Listen to the ends: {a} … {b}. Do they sound the same?',de:'Hör auf das Ende: {a} … {b}. Klingt es gleich?',fr:'Écoute la fin : {a} … {b}. Est-ce que ça sonne pareil ?',es:'Escucha el final: {a} … {b}. ¿Suenan igual?',pt:'Escute o final: {a} … {b}. Soam iguais?',it:'Ascolta la fine: {a} … {b}. Suonano uguali?',nl:'Luister naar het einde: {a} … {b}. Klinkt het hetzelfde?',sv:'Lyssna på slutet: {a} … {b}. Låter de likadant?',da:'Lyt til slutningen: {a} … {b}. Lyder de ens?',no:'Lytt til slutten: {a} … {b}. Høres de like ut?',fi:'Kuuntele loppua: {a} … {b}. Kuulostavatko ne samalta?'},
    hintOdd:         {en:'Say all four names. {X} rhymes with another one here.',de:'Sprich alle vier Namen. {X} reimt sich auf ein anderes Bild hier.',fr:'Dis les quatre noms. {X} rime avec une autre image ici.',es:'Di los cuatro nombres. {X} rima con otra imagen de aquí.',pt:'Diga os quatro nomes. {X} rima com outra figura daqui.',it:'Di’ i quattro nomi. {X} fa rima con un’altra immagine qui.',nl:'Zeg alle vier de namen. {X} rijmt op een ander plaatje hier.',sv:'Säg alla fyra namnen. {X} rimmar på en annan bild här.',da:'Sig alle fire navne. {X} rimer på et andet billede her.',no:'Si alle fire navnene. {X} rimer på et annet bilde her.',fi:'Sano kaikki neljä nimeä. {X} rimmaa toisen kuvan kanssa.'},
    hintMore:        {en:'{k} more to hang.',de:'Noch {k} zum Anhängen.',fr:'Encore {k} à accrocher.',es:'Faltan {k} por colgar.',pt:'Faltam {k} para pendurar.',it:'Ne mancano ancora {k} da appendere.',nl:'Nog {k} om op te hangen.',sv:'{k} kvar att hänga på.',da:'{k} tilbage at hænge på.',no:'{k} igjen å henge på.',fi:'Vielä {k} ripustettavaa.'},
    hintChainMore:   {en:'The chain wants one more link.',de:'Die Kette braucht noch ein Glied.',fr:'Il manque encore un anneau à la chaîne.',es:'A la cadena le falta un aro más.',pt:'A corrente precisa de mais um anel.',it:'Alla catena manca ancora un anello.',nl:'De ketting mist nog een schakel.',sv:'Kedjan behöver en länk till.',da:'Kæden mangler et led mere.',no:'Kjeden trenger ett ledd til.',fi:'Ketjuun puuttuu vielä yksi lenkki.'},
    hintPattern:     {en:'Find the ring with the same pattern as {anchor}.',de:'Such den Ring mit demselben Muster wie {anchor}.',fr:'Trouve l’anneau qui a le même motif que {anchor}.',es:'Busca el aro con el mismo dibujo que {anchor}.',pt:'Procure o anel com o mesmo desenho de {anchor}.',it:'Cerca l’anello con lo stesso disegno di {anchor}.',nl:'Zoek de ring met hetzelfde patroon als {anchor}.',sv:'Hitta ringen med samma mönster som {anchor}.',da:'Find ringen med samme mønster som {anchor}.',no:'Finn ringen med samme mønster som {anchor}.',fi:'Etsi rengas, jossa on sama kuvio kuin sanalla {anchor}.'},
    hintPatternJudge:{en:'Look at the two rings: the same pattern means the same ending.',de:'Schau dir die zwei Ringe an: Gleiches Muster heißt gleiches Ende.',fr:'Regarde les deux anneaux : même motif, même fin.',es:'Mira los dos aros: el mismo dibujo quiere decir el mismo final.',pt:'Olhe os dois anéis: o mesmo desenho quer dizer o mesmo final.',it:'Guarda i due anelli: stesso disegno, stessa fine.',nl:'Kijk naar de twee ringen: hetzelfde patroon betekent hetzelfde einde.',sv:'Titta på de två ringarna: samma mönster betyder samma slut.',da:'Se på de to ringe: samme mønster betyder samme slutning.',no:'Se på de to ringene: samme mønster betyr samme slutt.',fi:'Katso kahta rengasta: sama kuvio tarkoittaa samaa loppua.'},
    hintPatternOdd:  {en:'Look at the rings: which pattern is different?',de:'Schau dir die Ringe an: Welches Muster ist anders?',fr:'Regarde les anneaux : quel motif est différent ?',es:'Mira los aros: ¿cuál dibujo es diferente?',pt:'Olhe os anéis: qual desenho é diferente?',it:'Guarda gli anelli: quale disegno è diverso?',nl:'Kijk naar de ringen: welk patroon is anders?',sv:'Titta på ringarna: vilket mönster är annorlunda?',da:'Se på ringene: hvilket mønster er anderledes?',no:'Se på ringene: hvilket mønster er annerledes?',fi:'Katso renkaita: mikä kuvio on erilainen?'},
    okPick:          {en:'{A}, {b} — they rhyme!',de:'{A} und {b} – sie reimen sich!',fr:'{A} et {b} : ça rime !',es:'¡{A} y {b} riman!',pt:'{A} e {b}: rimam!',it:'{A} e {b}: fanno rima!',nl:'{A} en {b}: dat rijmt!',sv:'{A} och {b} – de rimmar!',da:'{A} og {b} – de rimer!',no:'{A} og {b} – de rimer!',fi:'{A} ja {b} – ne rimmaavat!'},
    okChain:         {en:'{list} — a rhyme chain!',de:'{list} – eine Reimkette!',fr:'{list} : une chaîne de rimes !',es:'¡{list}: una cadena de rimas!',pt:'{list}: uma corrente de rimas!',it:'{list}: una catena di rime!',nl:'{list}: een rijmketting!',sv:'{list} – en rimkedja!',da:'{list} – en rimkæde!',no:'{list} – en rimkjede!',fi:'{list} – riimiketju!'},
    okYes:           {en:'Yes! {A} and {b} rhyme.',de:'Ja! {a} und {b} reimen sich.',fr:'Oui ! {A} et {b} riment.',es:'¡Sí! {A} y {b} riman.',pt:'Sim! {A} e {b} rimam.',it:'Sì! {A} e {b} fanno rima.',nl:'Ja! {A} en {b} rijmen.',sv:'Ja! {A} och {b} rimmar.',da:'Ja! {A} og {b} rimer.',no:'Ja! {A} og {b} rimer.',fi:'Kyllä! {A} ja {b} rimmaavat.'},
    okNo:            {en:'Right — {a} and {b} don’t rhyme.',de:'Richtig – {a} und {b} reimen sich nicht.',fr:'Bravo : {a} et {b} ne riment pas.',es:'¡Muy bien! {A} y {b} no riman.',pt:'Isso! {A} e {b} não rimam.',it:'Giusto! {A} e {b} non fanno rima.',nl:'Goed zo! {A} en {b} rijmen niet.',sv:'Rätt! {A} och {b} rimmar inte.',da:'Rigtigt! {A} og {b} rimer ikke.',no:'Riktig! {A} og {b} rimer ikke.',fi:'Oikein! {A} ja {b} eivät rimmaa.'},
    okOdd:           {en:'{X} doesn’t rhyme with the others!',de:'{X} reimt sich nicht auf die anderen!',fr:'{X} ne rime pas avec les autres !',es:'¡{X} no rima con las demás!',pt:'{X} não rima com as outras!',it:'{X} non fa rima con le altre!',nl:'{X} rijmt niet op de rest!',sv:'{X} rimmar inte på de andra!',da:'{X} rimer ikke på de andre!',no:'{X} rimer ikke på de andre!',fi:'{X} ei rimmaa muiden kanssa!'},
    okSort:          {en:'Every picture is on its rhyme chain!',de:'Jedes Bild hängt an seiner Reimkette!',fr:'Chaque image est sur sa chaîne de rimes !',es:'¡Cada imagen está en su cadena de rimas!',pt:'Cada figura está na sua corrente de rimas!',it:'Ogni immagine è sulla sua catena di rime!',nl:'Elk plaatje hangt aan zijn rijmketting!',sv:'Varje bild hänger på sin rimkedja!',da:'Hvert billede hænger på sin rimkæde!',no:'Hvert bilde henger på rimkjeden sin!',fi:'Jokainen kuva on omassa riimiketjussaan!'},
    okFinish:        {en:'{sung}',de:'{sung}',fr:'{sung}',es:'{sung}',pt:'{sung}',it:'{sung}',nl:'{sung}',sv:'{sung}',da:'{sung}',no:'{sung}',fi:'{sung}'},
    yourTurn:        {en:'Your turn! Say another word that rhymes.',de:'Jetzt du! Sag noch ein Wort, das sich reimt.',fr:'À toi ! Dis un autre mot qui rime.',es:'¡Te toca! Di otra palabra que rime.',pt:'Sua vez! Diga outra palavra que rime.',it:'Tocca a te! Di’ un’altra parola che fa rima.',nl:'Nu jij! Zeg nog een woord dat rijmt.',sv:'Din tur! Säg ett nytt ord som rimmar.',da:'Din tur! Sig et andet ord, der rimer.',no:'Din tur! Si et annet ord som rimer.',fi:'Sinun vuorosi! Keksi uusi sana, joka rimmaa.'},
    setNames:        {en:'Names',de:'Namen',fr:'Noms',es:'Nombres',pt:'Nomes',it:'Nomi',nl:'Namen',sv:'Namn',da:'Navne',no:'Navn',fi:'Nimet'},
    optOff:          {en:'Off',de:'Aus',fr:'Masqués',es:'No',pt:'Não',it:'No',nl:'Uit',sv:'Av',da:'Fra',no:'Av',fi:'Pois'},
    optOn:           {en:'On',de:'An',fr:'Affichés',es:'Sí',pt:'Sim',it:'Sì',nl:'Aan',sv:'På',da:'Til',no:'På',fi:'Päällä'},
    setPatterns:     {en:'Patterns',de:'Muster',fr:'Motifs',es:'Dibujos',pt:'Desenhos',it:'Disegni',nl:'Patronen',sv:'Mönster',da:'Mønstre',no:'Mønstre',fi:'Kuviot'},
    patAfter:        {en:'After hanging',de:'Nach dem Anhängen',fr:'Après l’accrochage',es:'Al colgar',pt:'Depois de pendurar',it:'Dopo averle appese',nl:'Na het ophangen',sv:'Efter upphängning',da:'Efter ophængning',no:'Etter oppheng',fi:'Ripustuksen jälkeen'},
    patAlways:       {en:'Always',de:'Immer',fr:'Toujours',es:'Siempre',pt:'Sempre',it:'Sempre',nl:'Altijd',sv:'Alltid',da:'Altid',no:'Alltid',fi:'Aina'},
    ariaCard:        {en:'{name} — tap to hear',de:'{name} – antippen zum Hören',fr:'{name} : touche pour entendre',es:'{name}: toca para oír',pt:'{name}: toque para ouvir',it:'{name}: tocca per sentire',nl:'{name}: tik om te horen',sv:'{name} – tryck för att höra',da:'{name} – tryk for at høre',no:'{name} – trykk for å høre',fi:'{name} – napauta ja kuuntele'},
    ariaChain:       {en:'chain: {list}',de:'Kette: {list}',fr:'chaîne : {list}',es:'cadena: {list}',pt:'corrente: {list}',it:'catena: {list}',nl:'ketting: {list}',sv:'kedja: {list}',da:'kæde: {list}',no:'kjede: {list}',fi:'ketju: {list}'},
    ariaSlot:        {en:'next ring of the {a} chain',de:'nächster Ring der Kette {a}',fr:'prochain anneau de la chaîne {a}',es:'siguiente aro de la cadena de {a}',pt:'próximo anel da corrente de {a}',it:'prossimo anello della catena di {a}',nl:'volgende ring van de ketting {a}',sv:'nästa ring på kedjan med {a}',da:'næste ring på kæden med {a}',no:'neste ring på kjeden med {a}',fi:'sanan {a} ketjun seuraava rengas'},
    ariaHolds:       {en:'{B} holds — it rhymes with {a}.',de:'{B} hält – es reimt sich auf {a}.',fr:'{B} tient : ça rime avec {a}.',es:'{B} se sostiene: rima con {a}.',pt:'{B} se prende: rima com {a}.',it:'{B} tiene: fa rima con {a}.',nl:'{B} blijft hangen: het rijmt op {a}.',sv:'{B} håller – den rimmar på {a}.',da:'{B} holder – det rimer på {a}.',no:'{B} holder – det rimer på {a}.',fi:'{B} pysyy – se rimmaa sanan {a} kanssa.'},
    ariaFalls:       {en:'{B} falls off — it does not rhyme with {a}.',de:'{B} fällt ab – es reimt sich nicht auf {a}.',fr:'{B} tombe : ça ne rime pas avec {a}.',es:'{B} se cae: no rima con {a}.',pt:'{B} cai: não rima com {a}.',it:'{B} cade: non fa rima con {a}.',nl:'{B} valt eraf: het rijmt niet op {a}.',sv:'{B} ramlar av – den rimmar inte på {a}.',da:'{B} falder af – det rimer ikke på {a}.',no:'{B} faller av – det rimer ikke på {a}.',fi:'{B} putoaa – se ei rimmaa sanan {a} kanssa.'},
    ariaYes:         {en:'They rhyme (closed rings)',de:'Sie reimen sich (geschlossene Ringe)',fr:'Ça rime (anneaux fermés)',es:'Riman (aros cerrados)',pt:'Rimam (anéis fechados)',it:'Fanno rima (anelli chiusi)',nl:'Ze rijmen (dichte ringen)',sv:'De rimmar (stängda ringar)',da:'De rimer (lukkede ringe)',no:'De rimer (lukkede ringer)',fi:'Ne rimmaavat (suljetut renkaat)'},
    ariaNo:          {en:'They don’t rhyme (open rings)',de:'Sie reimen sich nicht (offene Ringe)',fr:'Ça ne rime pas (anneaux ouverts)',es:'No riman (aros abiertos)',pt:'Não rimam (anéis abertos)',it:'Non fanno rima (anelli aperti)',nl:'Ze rijmen niet (open ringen)',sv:'De rimmar inte (öppna ringar)',da:'De rimer ikke (åbne ringe)',no:'De rimer ikke (åpne ringer)',fi:'Ne eivät rimmaa (avoimet renkaat)'}
    /*STRINGS-END*/
  },
  defaults: { names: 'off', patterns: 'after' },
  settings: [
    { key: 'names', type: 'choice', labelKey: 'setNames', options: [{ value: 'off', labelKey: 'optOff' }, { value: 'on', labelKey: 'optOn' }] },
    { key: 'patterns', type: 'choice', labelKey: 'setPatterns', options: [{ value: 'after', labelKey: 'patAfter' }, { value: 'always', labelKey: 'patAlways' }] }
  ],

  OK_MS: 2600, FAST: false,
  /* locales whose browser voices are unreliable start with the names printed (design §9) */
  NAMES_ON: ['sv', 'da', 'no', 'fi'],

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._sel = null; this._hearing = null;
    if (this.NAMES_ON.indexOf(this._lang()) >= 0 && api.settings) api.settings.names = 'on';
    injectRhymeChainCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () { if (this._wrap) this._render2(); },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var s = p.split('/'); return '/image-library-webp/themes/' + encodeURIComponent(s[0]) + '/' + s[1] + '@2x.webp'; },
  _lang: function () { var l = (this.api && this.api.lang) || (document.documentElement.getAttribute('lang') || 'en'); return RhymeChainCore.loc(String(l).slice(0, 2)); },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _names: function () { return this._set('names') === 'on'; },
  _always: function () { return this._set('patterns') === 'always'; },
  _say: function (text, rate) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: this._lang(), rate: rate || 0.9 }); } catch (e) {} },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._lang(); if (!this._pool || this._poolKey !== k) { this._pool = RhymeChainCore.rounds(k); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = RhymeChainCore, l = this._lang();
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]], ans = C.answerOf(r), D = function (k) { return C.display(l, C.word(l, k)); };
    var args = {}, pk, ck;
    if (r.kind === 'judge') { args.a = D(r.a); args.b = D(r.b); pk = 'pJudge'; ck = ans ? 'okYes' : 'okNo'; }
    else if (r.kind === 'pick') { args.anchor = D(r.anchor); args.a = args.anchor; args.b = D(ans[0]); pk = 'pPick'; ck = 'okPick'; }
    else if (r.kind === 'finish') { args.anchor = D(r.anchor); args.a = args.anchor; args.b = D(ans[0]); args.sung = r.sung; pk = 'pFinish'; ck = 'okFinish'; }
    else if (r.kind === 'odd') { args.x = D(ans[0]); pk = 'pOdd'; ck = 'okOdd'; }
    else if (r.kind === 'sort') { args.a = D(r.anchors[0]); args.b = D(r.anchors[1]); pk = 'pSort'; ck = 'okSort'; }
    else if (r.kind === 'field') { args.anchor = D(r.anchor); args.n = ans.length; args.list = [args.anchor].concat(ans.map(D)).join(', '); pk = 'pField'; ck = 'okChain'; }
    else { args.anchor = D(r.anchor); args.list = [args.anchor].concat(ans.map(function (s) { return D(s[0]); })).join(', '); pk = 'pChain'; ck = 'okChain'; }
    if (args.list) args.list = this._cap(args.list);
    ['a', 'b', 'x'].forEach(function (k) { if (args[k]) args[k.toUpperCase()] = RhymeChainActivity._cap(args[k]); });
    var pss = pass;
    return {
      id: 'rhyme-chain.' + r.id, promptKey: pk, promptArgs: args, celebrateKey: ck, answerType: 'state',
      setup: function (tool) { tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._sel = null; tool.st = C.newState(r, pss); tool._args = args; },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var r = RhymeChainCore.rounds(this._lang()).filter(function (x) { return x.kind === 'pick'; })[0]; this.st = RhymeChainCore.newState(r, 0); this._args = {}; }
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
    var L = this._L = RhymeChainCore.layout(this._width());
    var wrap = api.el('div', 'rc-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + ' is-' + r.kind + (this._names() ? ' has-names' : '')); this._wrap = wrap;
    wrap.style.setProperty('--rc-card', L.card + 'px'); wrap.style.setProperty('--rc-ring', L.ring + 'px'); wrap.style.setProperty('--rc-wagon', L.wagon + 'px'); wrap.style.setProperty('--rc-btn', L.btn + 'px');
    wrap.addEventListener('keydown', function (ev) {
      if (ev.defaultPrevented || self.st.r.kind !== 'judge') return;
      if (ev.key === 'y' || ev.key === 'Y') { ev.preventDefault(); self._judge(true); } else if (ev.key === 'n' || ev.key === 'N') { ev.preventDefault(); self._judge(false); }
    });
    if (r.kind === 'finish') { var song = api.el('div', 'rc-song'); this._song = song; wrap.appendChild(song); } else this._song = null;
    var yard = api.el('div', 'rc-yard'); this._yard = yard; wrap.appendChild(yard);
    var grass = api.el('div', 'rc-grass'); this._grass = grass; wrap.appendChild(grass);
    var note = api.el('div', 'rc-note'); note.setAttribute('aria-live', 'polite'); this._note = note;
    var ask = api.el('div', 'rc-ask'); ask.appendChild(note);
    var chk = api.el('button', 'rc-check'); chk.type = 'button';
    chk.innerHTML = '<svg viewBox="0 0 40 28" aria-hidden="true"><path d="M3 22 L22 10" class="rc-hb"/><rect x="20" y="4" width="17" height="11" rx="3" class="rc-hg"/></svg><span>' + this._t('check') + '</span>';
    chk.addEventListener('click', function () { self._pull(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.appendChild(ask);
    api.stage.appendChild(wrap);
    this._paint();
  },

  /* a ring: family pattern when known, plain steel otherwise; open = sprung */
  _ring: function (c, open, size) {
    var st = this.st, C = RhymeChainCore, on = c && C.showsPattern(st, c, this._always()), p = on ? C.patternOf(st, c) : null;
    var stroke = p ? p.c : '#A7AFB6', dash = open ? '64 30' : (p ? p.d : '');
    return '<svg class="rc-ring' + (p ? ' is-pat' : '') + (open ? ' is-open' : '') + '" viewBox="0 0 40 40" aria-hidden="true"' + (size ? ' style="width:' + size + 'px;height:' + size + 'px"' : '') + '>'
      + '<circle cx="20" cy="20" r="14" fill="none" stroke="#2A2A35" stroke-width="9"' + (open ? ' stroke-dasharray="64 30" transform="rotate(-70 20 20)"' : '') + '/>'
      + '<circle cx="20" cy="20" r="14" fill="none" stroke="' + stroke + '" stroke-width="6"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + (open ? ' transform="rotate(-70 20 20)"' : '') + ' stroke-linecap="round"/></svg>';
  },
  _tag: function (c) {
    return '<span class="rc-tag"><img class="rc-pic" alt="' + c.word.replace(/"/g, '') + '" draggable="false" src="' + this._pic(c.pic) + '">' + (this._names() ? '<span class="rc-name" lang="' + this._lang() + '">' + c.word + '</span>' : '') + '</span>';
  },
  _wagonHTML: function () {
    return '<div class="rc-wagon" aria-hidden="true"><img class="rc-rosa" alt="" draggable="false" src="' + this._pic('forest creatures/raccoon') + '">'
      + '<svg viewBox="0 0 120 70" class="rc-cart"><path d="M6 14 H104 L96 46 H14 Z" class="rc-bed"/><path d="M104 22 H120" class="rc-bar"/><circle cx="30" cy="54" r="12" class="rc-wheel"/><circle cx="80" cy="54" r="12" class="rc-wheel"/><circle cx="30" cy="54" r="3" class="rc-hub"/><circle cx="80" cy="54" r="3" class="rc-hub"/></svg></div>';
  },
  _ear: '<svg class="rc-ear" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 16c0 2 1 4 3.5 4S15 18 15 16s3-3 3-7a6 6 0 0 0-12 0" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M10 10a2 2 0 0 1 4 0c0 2-2 2-2 4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',

  _paint: function () {
    if (!this._yard) return;
    var st = this.st, r = st.r, C = RhymeChainCore, self = this;
    this._wrap.classList.toggle('has-names', this._names());
    if (this._song) {
      var line = r.line, parts = line.split('…');
      this._song.innerHTML = '<span class="rc-note-ic" aria-hidden="true">♪</span><span class="rc-line" lang="' + this._lang() + '">' + (st.done ? this._esc(r.sung) : this._esc(parts[0]) + '<b class="rc-blank">' + (st.done ? '' : '&nbsp;?&nbsp;') + '</b>' + this._esc(parts[1] || '')) + '</span>';
    }
    if (r.kind === 'judge') this._paintJudge(); else this._paintChains();
    this._paintGrass();
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : this._celebrate();
    else if (h) msg = this._t(h, this._hintArgs(h));
    this._note.innerHTML = '';
    if (msg) { var m = document.createElement('span'); m.textContent = msg; this._note.appendChild(m); }
    if (st.done && !this._afterOk && r.kind !== 'judge' && r.kind !== 'odd') { var y = document.createElement('span'); y.className = 'rc-turn-line'; y.textContent = this._t('yourTurn'); this._note.appendChild(y); }
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.last && /falls|judge|oddwrong/.test(st.last.result)));
    this._checkBtn.hidden = !!st.done || r.kind === 'pick' || r.kind === 'finish' || r.kind === 'judge'; this._checkBtn.disabled = !!this._busy;
  },
  _cap: function (s) { s = String(s || ''); return s.charAt(0).toLocaleUpperCase(this._lang()) + s.slice(1); },
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); },
  _hintArgs: function (h) {
    var st = this.st, L = st.last || {}, a = {};
    a.a = L.a || (st.chains[0] && st.chains[0].anchor ? st.chains[0].anchor.word : st.pair ? st.pair[0].word : '');
    a.b = L.b || (st.pair ? st.pair[1].word : '');
    a.anchor = st.chains[0] && st.chains[0].anchor ? st.chains[0].anchor.word : a.a;
    if (h === 'hintPattern' && L.a) a.anchor = L.a;
    a.k = L.k; a.x = L.x; a.A = this._cap(a.a); a.B = this._cap(a.b); a.X = this._cap(a.x);
    return a;
  },
  _celebrate: function () {
    var r = this.st.r, a = this._args || {};
    if (r.kind === 'judge') return this._t(this.st.last && this.st.last.result === 'yes' ? 'okYes' : 'okNo', a);
    var k = r.kind === 'pick' || r.kind === 'finish' ? 'okPick' : r.kind === 'odd' ? 'okOdd' : r.kind === 'sort' ? 'okSort' : 'okChain';
    return this._t(k, a);
  },

  /* the rigs: a wagon + its chain (two in SORT) */
  _paintChains: function () {
    var self = this, st = this.st, r = st.r, yard = this._yard;
    yard.innerHTML = '';
    st.chains.forEach(function (ch, ci) {
      var rig = self.api.el('div', 'rc-rig'); rig.setAttribute('data-ci', ci); yard.appendChild(rig);
      var names = (ch.anchor ? [ch.anchor] : []).concat(ch.links).map(function (c) { return c.word; });
      rig.setAttribute('role', 'group'); rig.setAttribute('aria-label', self._t('ariaChain', { list: names.join(', ') }));
      rig.insertAdjacentHTML('beforeend', self._wagonHTML());
      var chain = self.api.el('div', 'rc-chain'); rig.appendChild(chain);
      var all = (ch.anchor ? [ch.anchor] : []).concat(ch.links);
      all.forEach(function (c, i) {
        var isOdd = r.kind === 'odd', fallen = isOdd && st.done && C_odd(st) === c, picked = isOdd && st.oddPick === c.id;
        var el = self.api.el(isOdd || c === ch.anchor ? 'button' : 'div', 'rc-link' + (c === ch.anchor ? ' is-anchor' : '') + (picked ? ' is-pick' : '') + (fallen ? ' is-fallen' : '') + (isOdd && st.show && st.last && st.last.result === 'oddwrong' && picked ? ' is-wobble' : '') + (st.last && st.last.result === 'holds' && st.last.b === c.word && i === all.length - 1 && !self.FAST ? ' is-new' : ''));
        if (el.tagName === 'BUTTON') el.type = 'button';
        el.setAttribute('data-id', c.id);
        el.setAttribute('aria-label', c.word);
        if (isOdd) el.setAttribute('aria-pressed', picked ? 'true' : 'false');
        el.innerHTML = self._ring(c, fallen) + '<span class="rc-hook"></span>' + self._tag(c);
        if (isOdd) el.addEventListener('click', function () { self._hear(c, el); self._odd(c.id); });
        else if (c === ch.anchor) el.addEventListener('click', function () { if (self._sel) self._hang(self._sel, ci); else self._hear(c, el); });
        chain.appendChild(el);
      });
      var open = !st.done && r.kind !== 'odd' && (r.kind !== 'chain' || st.step < st.stepCards.length) && st.grass.length;
      if (open) {
        var slot = self.api.el('button', 'rc-link rc-slot' + (self._sel ? ' is-armed' : '')); slot.type = 'button'; slot.setAttribute('data-ci', ci);
        slot.setAttribute('aria-label', self._t('ariaSlot', { a: ch.anchor ? ch.anchor.word : '' }));
        slot.innerHTML = '<svg class="rc-ring" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="14" fill="none" stroke="#8A939B" stroke-width="4" stroke-dasharray="4 5"/></svg><span class="rc-hook"></span><span class="rc-tag rc-ghost"></span>';
        slot.addEventListener('click', function () { if (self._sel) self._hang(self._sel, ci); else { self._flash(); } });
        chain.appendChild(slot);
      }
      if (st.done && r.kind !== 'odd') {
        var turn = self.api.el('div', 'rc-link rc-turn'); turn.setAttribute('aria-hidden', 'true');
        turn.innerHTML = '<svg class="rc-ring" viewBox="0 0 40 40"><circle cx="20" cy="20" r="14" fill="none" stroke="#2A2A35" stroke-width="7" stroke-dasharray="64 30" transform="rotate(-70 20 20)"/></svg><span class="rc-hook"></span><span class="rc-tag rc-ghost">' + self._ear + '</span>';
        chain.appendChild(turn);
      }
    });
    function C_odd(s) { return RhymeChainCore.oddOne(s); }
  },
  /* JUDGE: two rings side by side; the buttons are a closed link and an open link */
  _paintJudge: function () {
    var self = this, st = this.st, yard = this._yard, answered = st.judge !== null, truth = st.pair[0].rime === st.pair[1].rime;
    yard.innerHTML = '';
    var box = this.api.el('div', 'rc-judge' + (answered ? (truth ? ' is-joined' : ' is-sprung') : '')); yard.appendChild(box);
    box.insertAdjacentHTML('beforeend', this._wagonHTML());
    var pairEl = this.api.el('div', 'rc-pair'); box.appendChild(pairEl);
    st.pair.forEach(function (c, i) {
      var el = self.api.el('button', 'rc-link'); el.type = 'button'; el.setAttribute('data-id', c.id); el.setAttribute('aria-label', c.word);
      el.innerHTML = self._ring(c, answered && !truth && i === 1) + '<span class="rc-hook"></span>' + self._tag(c);
      el.addEventListener('click', function () { self._hear(c, el); });
      pairEl.appendChild(el);
    });
    var v = this.api.el('div', 'rc-verdict'); yard.appendChild(v);
    [true, false].forEach(function (yes) {
      var b = self.api.el('button', 'rc-vbtn ' + (yes ? 'is-yes' : 'is-no') + (answered && st.judge === yes ? ' is-chosen' : '')); b.type = 'button';
      b.setAttribute('aria-label', self._t(yes ? 'ariaYes' : 'ariaNo')); b.setAttribute('data-v', yes ? 'yes' : 'no');
      b.innerHTML = yes
        ? '<svg viewBox="0 0 64 40" aria-hidden="true"><circle cx="24" cy="20" r="12" fill="none" stroke="#146B5E" stroke-width="6"/><circle cx="40" cy="20" r="12" fill="none" stroke="#146B5E" stroke-width="6"/></svg>'
        : '<svg viewBox="0 0 64 40" aria-hidden="true"><circle cx="16" cy="20" r="11" fill="none" stroke="#B4532A" stroke-width="6"/><circle cx="48" cy="20" r="11" fill="none" stroke="#B4532A" stroke-width="6" stroke-dasharray="52 18" transform="rotate(150 48 20)"/></svg>';
      b.disabled = !!st.done;
      b.addEventListener('click', function () { self._judge(yes); });
      v.appendChild(b);
    });
  },
  _paintGrass: function () {
    var self = this, st = this.st, grass = this._grass;
    grass.innerHTML = '';
    grass.hidden = !st.grass.length;
    st.grass.forEach(function (c) {
      var b = self.api.el('button', 'rc-card' + (self._sel === c.id ? ' is-sel' : '') + (st.falling === c.id && st.show && !self.FAST ? ' is-fall' : '') + (c.revealed ? ' is-known' : ''));
      b.type = 'button'; b.setAttribute('data-id', c.id); b.setAttribute('aria-label', self._t('ariaCard', { name: c.word })); b.setAttribute('aria-pressed', self._sel === c.id ? 'true' : 'false');
      b.innerHTML = self._ring(c, false) + self._tag(c) + '<span class="rc-earbtn">' + self._ear + '</span>';
      self._bindCard(b, c);
      grass.appendChild(b);
    });
  },

  /* ---- the hand ---- */
  _hear: function (c, el) {
    this._say(c.word);
    if (el && !this.FAST) { el.classList.remove('is-hear'); void el.offsetWidth; el.classList.add('is-hear'); }
  },
  _flash: function () { var g = this._grass && this._grass.querySelector('.rc-card'); if (g && !this.FAST) { g.classList.remove('is-hear'); void g.offsetWidth; g.classList.add('is-hear'); } },
  _bindCard: function (el, c) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done) return;
      ev.preventDefault();
      var x0 = ev.clientX, y0 = ev.clientY, moved = false, ghost = null;
      var move = function (e) {
        if (!moved && Math.hypot(e.clientX - x0, e.clientY - y0) < 6) return;
        if (!moved) { moved = true; ghost = el.cloneNode(true); ghost.className = 'rc-card rc-dragging'; ghost.style.width = el.offsetWidth + 'px'; document.body.appendChild(ghost); el.classList.add('is-lifted'); }
        ghost.style.left = (e.clientX - el.offsetWidth / 2) + 'px'; ghost.style.top = (e.clientY - el.offsetHeight / 2) + 'px';
      };
      var up = function (e) {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        if (ghost) ghost.remove();
        el.classList.remove('is-lifted');
        if (!moved) { self._tapCard(c, el); return; }
        var ci = self._rigAt(e.clientX, e.clientY);
        if (ci >= 0) self._hang(c.id, ci); else self._paint();
      };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
    el.addEventListener('click', function (ev) { if (ev.detail !== 0) return; self._tapCard(c, el); });
    el.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter') { ev.preventDefault(); self._hang(c.id, 0); }
      else if ((ev.key === '1' || ev.key === '2') && self.st.chains.length > 1) { ev.preventDefault(); self._hang(c.id, +ev.key - 1); }
    });
  },
  _tapCard: function (c, el) {
    if (this._busy || this.st.done) return;
    this._hear(c, el);
    this._sel = this._sel === c.id ? null : c.id;
    this._paint();
    var nx = this._grass.querySelector('.rc-card[data-id="' + c.id + '"]'); if (nx) nx.focus();
  },
  _rigAt: function (x, y) {
    var rigs = this._yard.querySelectorAll('.rc-rig');
    for (var i = 0; i < rigs.length; i++) { var b = rigs[i].getBoundingClientRect(); if (x >= b.left - 12 && x <= b.right + 12 && y >= b.top - 12 && y <= b.bottom + 12) return +rigs[i].getAttribute('data-ci'); }
    if (rigs.length === 1) { var yb = this._yard.getBoundingClientRect(); if (x >= yb.left && x <= yb.right && y >= yb.top - 12 && y <= yb.bottom + 12) return 0; }
    return -1;
  },
  _hang: function (id, ci) {
    if (this._busy || this.st.done) return;
    var st = this.st, res = RhymeChainCore.hang(st, id, ci); this._sel = null;
    if (!res) return;
    if (res.result === 'holds') {
      this.api.sound(880); this._say(res.a.word + ' … ' + res.b.word, 0.85);
      this.api.announce(this._t('ariaHolds', { a: res.a.word, B: this._cap(res.b.word) }));
      this._paint();
      if (st.done) return this._win();
      var nx = this._grass.querySelector('.rc-card'); if (nx) nx.focus();
      return;
    }
    this.api.sound(196); this._say(res.a.word + ' … ' + res.b.word, 0.7);
    this.api.announce(this._t('ariaFalls', { a: res.a.word, B: this._cap(res.b.word) }));
    this._paint();
    var self = this; if (!this.FAST) this._later(function () { if (self.st === st) { st.falling = null; var f = self._grass.querySelector('.is-fall'); if (f) f.classList.remove('is-fall'); } }, 700);
  },
  _judge: function (v) {
    if (this._busy || this.st.done) return;
    var res = RhymeChainCore.answerJudge(this.st, v); if (!res) return;
    if (res.result === 'ok') { this.api.sound(res.truth ? 880 : 520); this._paint(); return this._win(); }
    this.api.sound(196); this._say(this.st.pair[0].word + ' … ' + this.st.pair[1].word, 0.7); this._paint();
  },
  _odd: function (id) { if (this._busy) return; if (RhymeChainCore.pickOdd(this.st, id)) { this.api.sound(620); this._paint(); var nx = this._yard.querySelector('.rc-link[data-id="' + id + '"]'); if (nx) nx.focus(); } },
  _pull: function () {
    if (this._busy || this.st.done) return;
    var res = RhymeChainCore.pull(this.st);
    if (res.result === 'ok') return this._win();
    this.api.sound(res.result === 'wrong' ? 196 : 460);
    this._paint();
    if (res.result === 'empty') this._flash();
  },
  _win: function () {
    var self = this, r = this.st.r;
    this.api.sound(523); this._later(function () { self.api.sound(659); }, 110); this._later(function () { self.api.sound(784); }, 220);
    if (r.kind === 'finish') this._say(r.sung, 0.85);
    this._paint();
    if (!this.FAST) { this._yard.classList.remove('is-parade'); void this._yard.offsetWidth; this._yard.classList.add('is-parade'); }
    this._busy = true;
    this._later(function () {
      self._busy = false; self._afterOk = true; self._paint();
      var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click();
    }, this._ms(this.OK_MS));
  }
};

var rcCssDone = false;
function injectRhymeChainCSS() {
  if (rcCssDone || typeof document === 'undefined') return;
  rcCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.rc-wrap{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:10px;--rc-ink:#0F4A40;--rc-teal:#146B5E;--rc-coral:#F2784B;user-select:none;-webkit-user-select:none;}'
  + '.rc-song{display:flex;align-items:center;gap:8px;padding:8px 14px;border-radius:10px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #C9B897,0 2px 0 #C9B897;font:700 18px/1.35 var(--lcs-font-body,Nunito,sans-serif);color:var(--rc-ink);} .rc-note-ic{font-size:22px;color:var(--rc-coral);} .rc-blank{display:inline-block;min-width:44px;margin:0 4px;border-bottom:3px dashed var(--rc-coral);text-align:center;color:var(--rc-coral);}'
  + '.rc-yard{display:flex;flex-direction:column;gap:10px;padding:10px 8px 12px;border-radius:12px;background:linear-gradient(#EAF4FB 0 62%,#CFE7B4 62%);box-shadow:inset 0 0 0 2px #B9CFA0;overflow:hidden;}'
  + '.rc-rig{display:flex;align-items:flex-start;gap:6px;min-width:0;} .is-narrow .rc-rig{flex-wrap:wrap;}'
  + '.rc-wagon{position:relative;flex:none;width:var(--rc-wagon);height:calc(var(--rc-wagon) - 14px + var(--rc-wagon) * .3);} .rc-rosa{position:absolute;left:7px;top:0;width:calc(var(--rc-wagon) - 14px);height:calc(var(--rc-wagon) - 14px);object-fit:contain;} .rc-cart{position:absolute;left:0;bottom:0;width:100%;height:auto;}'
  + '.rc-bed{fill:#F4E2C0;stroke:#2A2A35;stroke-width:3;} .rc-bar{stroke:#2A2A35;stroke-width:4;stroke-linecap:round;} .rc-wheel{fill:#146B5E;stroke:#2A2A35;stroke-width:3;} .rc-hub{fill:#F2C14B;}'
  + '.rc-chain{display:flex;flex-wrap:wrap;align-items:flex-start;gap:8px 8px;min-width:0;flex:1;}'
  + '.rc-link{position:relative;display:flex;flex-direction:column;align-items:center;width:var(--rc-card);padding:0;border:0;background:none;cursor:pointer;font:inherit;color:inherit;}'
  + '.rc-link + .rc-link::before{content:"";position:absolute;left:calc(var(--rc-ring) * -.55 - 4px);top:calc(var(--rc-ring) * .33);width:calc(var(--rc-ring) * .9);height:calc(var(--rc-ring) * .36);border-radius:50%;box-shadow:inset 0 0 0 4px #6E777F;}'
  + '.rc-ring{width:var(--rc-ring);height:var(--rc-ring);display:block;flex:none;} .rc-hook{width:3px;height:8px;background:#2A2A35;}'
  + '.rc-tag{position:relative;width:var(--rc-card);height:var(--rc-card);display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #2A2A35,0 3px 0 #C9B897;overflow:hidden;}'
  + '.rc-pic{width:100%;height:100%;object-fit:contain;display:block;}'
  + '.rc-name{position:absolute;left:3px;right:3px;bottom:3px;font-weight:800;font-size:15px;line-height:1.15;font-family:var(--lcs-font-body,Nunito,sans-serif);color:var(--rc-ink);text-align:center;padding:1px 2px;border-radius:0 0 9px 9px;background:rgba(255,253,246,.9);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}'
  + '.rc-link.is-anchor .rc-tag{box-shadow:inset 0 0 0 3px var(--rc-teal),0 3px 0 #0B4A40;}'
  + '.rc-link.is-new{animation:rc-swing .5s ease-out;} @keyframes rc-swing{0%{transform:rotate(-14deg) translateY(-8px);}60%{transform:rotate(5deg);}100%{transform:none;}}'
  + '.rc-slot{cursor:pointer;} .rc-ghost{background:rgba(255,253,246,.55);box-shadow:inset 0 0 0 3px #8A939B;border:0;outline:3px dashed transparent;} .rc-slot .rc-ghost{box-shadow:none;outline:3px dashed #8A939B;outline-offset:-3px;} .rc-slot.is-armed .rc-ghost{outline-color:var(--rc-teal);background:#E2F2EE;animation:rc-glow 1.2s ease-in-out infinite;} @keyframes rc-glow{50%{background:#C6E8DF;}}'
  + '.rc-turn .rc-ghost{outline:3px dashed var(--rc-coral);outline-offset:-3px;box-shadow:none;color:var(--rc-coral);} .rc-turn .rc-ear{width:44%;height:44%;}'
  + '.rc-link.is-pick{transform:translateY(-6px);} .rc-link.is-pick .rc-tag{box-shadow:inset 0 0 0 4px var(--rc-coral),0 3px 0 #C95A31;}'
  + '.rc-link.is-fallen{transform:translateY(22px) rotate(10deg);opacity:.55;transition:transform .5s ease,opacity .5s ease;} .rc-link.is-wobble{animation:rc-wob .45s ease-in-out 2;} @keyframes rc-wob{25%{transform:rotate(-6deg);}75%{transform:rotate(6deg);}}'
  + '.rc-judge{display:flex;align-items:flex-start;gap:6px;justify-content:center;} .rc-pair{display:flex;gap:28px;transition:gap .35s ease;} .rc-judge.is-joined .rc-pair{gap:8px;} .rc-judge.is-sprung .rc-pair{gap:52px;} .rc-pair .rc-link + .rc-link::before{display:none;} .rc-judge.is-joined .rc-pair .rc-link + .rc-link::before{display:block;}'
  + '.rc-verdict{display:flex;gap:16px;justify-content:center;} .rc-vbtn{width:calc(var(--rc-btn) * 1.5);height:var(--rc-btn);border:0;border-radius:14px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #C9B897,0 3px 0 #C9B897;cursor:pointer;display:flex;align-items:center;justify-content:center;} .rc-vbtn svg{width:80%;height:auto;} .rc-vbtn.is-chosen{box-shadow:inset 0 0 0 3px #2A2A35,0 3px 0 #2A2A35;} .rc-vbtn:disabled{opacity:.6;cursor:default;}'
  + '.rc-grass{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;padding:10px 6px;border-radius:12px;background:#CFE7B4;box-shadow:inset 0 0 0 2px #9CC27A;} .rc-grass[hidden]{display:none;}'
  + '.rc-card{position:relative;display:flex;flex-direction:column;align-items:center;padding:0;border:0;background:none;cursor:grab;touch-action:none;font:inherit;color:inherit;} .rc-card .rc-ring{margin-bottom:-4px;}'
  + '.rc-card.is-sel{transform:translateY(-6px);} .rc-card.is-sel .rc-tag{box-shadow:inset 0 0 0 4px var(--rc-teal),0 3px 0 #0B4A40;} .rc-card.is-lifted{opacity:.35;}'
  + '.rc-earbtn{position:absolute;right:-4px;bottom:-4px;width:26px;height:26px;border-radius:13px;background:var(--rc-teal);color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 0 #0B4A40;} .rc-earbtn .rc-ear{width:18px;height:18px;}'
  + '.is-hear{animation:rc-bounce .32s ease-out;} @keyframes rc-bounce{40%{transform:translateY(-8px) scale(1.04);}}'
  + '.rc-card.is-fall{animation:rc-fall .65s ease-in;} @keyframes rc-fall{0%{transform:translateY(-70px) rotate(-8deg);}55%{transform:translateY(6px) rotate(6deg);}80%{transform:translateY(-4px);}100%{transform:none;}}'
  + '.rc-dragging{position:fixed;z-index:50;pointer-events:none;opacity:.92;}'
  + '.rc-yard.is-parade .rc-rig,.rc-yard.is-parade .rc-judge{animation:rc-parade 1.6s ease-in-out;} @keyframes rc-parade{45%{transform:translateX(26px);}100%{transform:none;}}'
  + '.rc-note{min-height:28px;font:700 18px/1.3 var(--lcs-font-body,Nunito,sans-serif);color:var(--rc-ink);text-align:center;flex:1;display:flex;flex-direction:column;gap:2px;} .rc-note:empty{display:none;} .rc-note.is-ok{color:var(--rc-teal);font-weight:800;} .rc-note.is-wrong{color:#A6461F;} .rc-turn-line{font-size:15px;color:#B4532A;font-weight:800;} .is-narrow .rc-note{font-size:15px;text-align:left;}'
  + '.rc-ask{display:flex;align-items:center;justify-content:center;gap:10px;}'
  + '.rc-check{min-height:48px;padding:0 18px 0 12px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;line-height:1.1;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;max-width:60%;display:flex;align-items:center;gap:8px;} .rc-check svg{width:34px;height:24px;flex:none;} .rc-hb{stroke:#fff;stroke-width:4;stroke-linecap:round;} .rc-hg{fill:#FFE7A6;stroke:#fff;stroke-width:2;} .rc-check[hidden]{display:none;} .rc-check:disabled{opacity:.5;}'
  + '.rc-card:focus-visible,.rc-link:focus-visible,.rc-vbtn:focus-visible,.rc-check:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '.is-narrow.rc-wrap{gap:6px;} .is-narrow .rc-yard{gap:6px;padding:6px 6px 8px;} .is-narrow .rc-grass{padding:6px 4px;gap:8px;} .is-narrow .rc-hook{height:5px;} .is-narrow .rc-song{font-size:16px;padding:6px 10px;}'
  + '@media (prefers-reduced-motion: reduce){.rc-wrap *{animation:none !important;transition:none !important;}}';
  var el = document.createElement('style'); el.id = 'rc-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.RhymeChainActivity = RhymeChainActivity;
