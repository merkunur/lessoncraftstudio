/* =====================================================================
   letter-magnet-activity.js — ACTIVITY #59 of the one-by-one rebuild:
   "Beginning Sounds" → THE LETTER MAGNET (RF.K.3.a, 11 locales).
   Design sheet: docs/activities-rebuild/designs/059-choice-board.md
   ---------------------------------------------------------------------
   THE INVENTION: the letter is a horseshoe magnet that only pulls pictures
   whose names start with its sound. Gather the pictures you think belong
   into its pull zone and switch it on: the right ones fly up onto its
   hooks, the others shiver and stay on the table. The empty hooks are how
   many are still to find. Team levels: letter-team magnets (sh · ch · th)
   and word strips with a gap the team drops into; read-and-match rounds
   hang whole WORDS on the magnets.

   ACTIVITY LAYER ONLY: the model is letter-magnet-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.LetterMagnetActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var LetterMagnetActivity = {
  id: 'letter-magnet',
  apparatusClasses: ['lmg-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:        {en:'The Letter Magnet',de:'Der Buchstabenmagnet',nl:'De lettermagneet',da:'Bogstavmagneten',sv:'Bokstavsmagneten',no:'Bokstavmagneten',es:'El imán de letras',it:'La calamita delle lettere',pt:'O ímã de letras',fr:'L’aimant à lettres',fi:'Kirjainmagneetti'},
    instruction:  {en:'Gather the pictures that start with the magnet’s sound, then switch it on.',de:'Sammle die Bilder, die mit dem Laut des Magneten anfangen, und schalte ihn dann ein.',nl:'Verzamel de plaatjes die beginnen met de klank van de magneet en zet hem dan aan.',da:'Saml de billeder, der begynder med magnetens lyd, og tænd så for den.',sv:'Samla bilderna som börjar med magnetens ljud och slå sedan på den.',no:'Samle bildene som begynner med lyden til magneten, og slå den så på.',es:'Junta los dibujos que empiezan con el sonido del imán y luego enciéndelo.',it:'Raccogli i disegni che iniziano con il suono della calamita, poi accendila.',pt:'Junte as figuras que começam com o som do ímã e depois ligue o ímã.',fr:'Rassemble les images qui commencent par le son de l’aimant, puis allume-le.',fi:'Kerää kuvat, jotka alkavat magneetin äänteellä, ja kytke magneetti sitten päälle.'},
    check:        {en:'Switch on',de:'Einschalten',nl:'Aanzetten',da:'Tænd',sv:'Slå på',no:'Slå på',es:'Encender',it:'Accendi',pt:'Ligar',fr:'Allumer',fi:'Kytke päälle'},
    pOne:         {en:'Which picture starts with the sound of {u}?',de:'Welches Bild fängt mit dem Laut {u} an?',nl:'Welk plaatje begint met de klank {u}?',da:'Hvilket billede begynder med lyden {u}?',sv:'Vilken bild börjar med ljudet {u}?',no:'Hvilket bilde begynner med lyden {u}?',es:'¿Qué dibujo empieza con el sonido de {u}?',it:'Quale disegno inizia con il suono di {u}?',pt:'Qual figura começa com o som de {u}?',fr:'Quelle image commence par le son {u} ?',fi:'Mikä kuva alkaa äänteellä {u}?'},
    pWeek:        {en:'Find the pictures that start with the sound of {u}.',de:'Finde die Bilder, die mit dem Laut {u} anfangen.',nl:'Zoek de plaatjes die beginnen met de klank {u}.',da:'Find de billeder, der begynder med lyden {u}.',sv:'Hitta bilderna som börjar med ljudet {u}.',no:'Finn bildene som begynner med lyden {u}.',es:'Encuentra los dibujos que empiezan con el sonido de {u}.',it:'Trova i disegni che iniziano con il suono di {u}.',pt:'Encontre as figuras que começam com o som de {u}.',fr:'Trouve les images qui commencent par le son {u}.',fi:'Etsi kuvat, jotka alkavat äänteellä {u}.'},
    pTwo:         {en:'Which magnet will pull each picture?',de:'Welcher Magnet zieht welches Bild an?',nl:'Welke magneet trekt elk plaatje aan?',da:'Hvilken magnet trækker hvert billede?',sv:'Vilken magnet drar till sig varje bild?',no:'Hvilken magnet trekker hvert bilde?',es:'¿Qué imán jalará cada dibujo?',it:'Quale calamita attira ogni disegno?',pt:'Qual ímã vai puxar cada figura?',fr:'Quel aimant attire chaque image ?',fi:'Kumpi magneetti vetää kunkin kuvan?'},
    pTeam:        {en:'Which letter team do you hear in each word?',de:'Welche Buchstabengruppe hörst du in jedem Wort?',nl:'Welke lettercombinatie hoor je in elk woord?',da:'Hvilken bogstavgruppe hører du i hvert ord?',sv:'Vilken bokstavsgrupp hör du i varje ord?',no:'Hvilken bokstavgruppe hører du i hvert ord?',es:'¿Qué par de letras oyes en cada palabra?',it:'Quale gruppo di lettere senti in ogni parola?',pt:'Qual dígrafo você ouve em cada palavra?',fr:'Quel groupe de lettres entends-tu dans chaque mot ?',fi:'Minkä kirjainparin kuulet kussakin sanassa?'},
    pGap:         {en:'Put the right letter team into each word.',de:'Setz die richtige Buchstabengruppe in jedes Wort.',nl:'Zet de goede lettercombinatie in elk woord.',da:'Sæt den rigtige bogstavgruppe ind i hvert ord.',sv:'Sätt in rätt bokstavsgrupp i varje ord.',no:'Sett inn riktig bokstavgruppe i hvert ord.',es:'Pon el par de letras correcto en cada palabra.',it:'Metti il gruppo di lettere giusto in ogni parola.',pt:'Coloque o dígrafo certo em cada palavra.',fr:'Mets le bon groupe de lettres dans chaque mot.',fi:'Laita oikea kirjainpari jokaiseen sanaan.'},
    pRead:        {en:'Read the words on the magnets. Which picture does each one name?',de:'Lies die Wörter an den Magneten. Welches Bild gehört zu welchem Wort?',nl:'Lees de woorden op de magneten. Bij welk plaatje hoort elk woord?',da:'Læs ordene på magneterne. Hvilket billede passer til hvert ord?',sv:'Läs orden på magneterna. Vilken bild hör till varje ord?',no:'Les ordene på magnetene. Hvilket bilde hører til hvert ord?',es:'Lee las palabras de los imanes. ¿Qué dibujo nombra cada una?',it:'Leggi le parole sulle calamite. A quale disegno corrisponde ognuna?',pt:'Leia as palavras nos ímãs. A que figura cada uma corresponde?',fr:'Lis les mots sur les aimants. Quelle image va avec chaque mot ?',fi:'Lue sanat magneeteista. Minkä kuvan kukin sana nimeää?'},
    hintEmpty:    {en:'Bring the pictures that start with the sound of {u} under the magnet.',de:'Bring die Bilder, die mit dem Laut {u} anfangen, unter den Magneten.',nl:'Breng de plaatjes die beginnen met de klank {u} onder de magneet.',da:'Flyt de billeder, der begynder med lyden {u}, ind under magneten.',sv:'Flytta bilderna som börjar med ljudet {u} under magneten.',no:'Flytt bildene som begynner med lyden {u}, inn under magneten.',es:'Lleva bajo el imán los dibujos que empiezan con el sonido de {u}.',it:'Porta sotto la calamita i disegni che iniziano con il suono di {u}.',pt:'Leve para baixo do ímã as figuras que começam com o som de {u}.',fr:'Amène sous l’aimant les images qui commencent par le son {u}.',fi:'Vie magneetin alle kuvat, jotka alkavat äänteellä {u}.'},
    hintEmptyTwo: {en:'Bring each picture under the magnet whose sound it starts with.',de:'Bring jedes Bild unter den Magneten, mit dessen Laut es anfängt.',nl:'Breng elk plaatje onder de magneet met de klank waarmee het begint.',da:'Flyt hvert billede ind under den magnet, hvis lyd det begynder med.',sv:'Flytta varje bild under magneten med det ljud som bilden börjar med.',no:'Flytt hvert bilde inn under magneten med lyden det begynner med.',es:'Lleva cada dibujo bajo el imán del sonido con que empieza.',it:'Porta ogni disegno sotto la calamita del suono con cui inizia.',pt:'Leve cada figura para baixo do ímã do som com que ela começa.',fr:'Amène chaque image sous l’aimant du son par lequel elle commence.',fi:'Vie jokainen kuva sen magneetin alle, jonka äänteellä kuva alkaa.'},
    hintEmptyTeam:{en:'Bring each picture under the team you hear in its name.',de:'Bring jedes Bild unter die Buchstabengruppe, die du in seinem Namen hörst.',nl:'Breng elk plaatje onder de lettercombinatie die je in de naam hoort.',da:'Flyt hvert billede ind under den bogstavgruppe, du hører i navnet.',sv:'Flytta varje bild under den bokstavsgrupp du hör i namnet.',no:'Flytt hvert bilde inn under bokstavgruppen du hører i navnet.',es:'Lleva cada dibujo bajo el par de letras que oyes en su nombre.',it:'Porta ogni disegno sotto il gruppo di lettere che senti nel suo nome.',pt:'Leve cada figura para baixo do dígrafo que você ouve no nome dela.',fr:'Amène chaque image sous le groupe de lettres que tu entends dans son nom.',fi:'Vie jokainen kuva sen kirjainparin alle, jonka kuulet kuvan nimessä.'},
    hintEmptyRead:{en:'Bring each picture under the word that names it.',de:'Bring jedes Bild unter das Wort, das es benennt.',nl:'Breng elk plaatje onder het woord dat erbij hoort.',da:'Flyt hvert billede ind under det ord, der passer til det.',sv:'Flytta varje bild under ordet som hör till den.',no:'Flytt hvert bilde inn under ordet som hører til det.',es:'Lleva cada dibujo bajo la palabra que lo nombra.',it:'Porta ogni disegno sotto la parola che lo nomina.',pt:'Leve cada figura para baixo da palavra que a nomeia.',fr:'Amène chaque image sous le mot qui la nomme.',fi:'Vie jokainen kuva sen sanan alle, joka nimeää sen.'},
    hintStayed:   {en:'A picture stayed down. Say its name: which sound does it start with?',de:'Ein Bild ist unten geblieben. Sprich seinen Namen: Mit welchem Laut fängt er an?',nl:'Er bleef een plaatje liggen. Zeg de naam: met welke klank begint die?',da:'Et billede blev liggende. Sig navnet: Hvilken lyd begynder det med?',sv:'En bild blev liggande. Säg namnet: vilket ljud börjar det med?',no:'Et bilde ble liggende. Si navnet: Hvilken lyd begynner det med?',es:'Un dibujo se quedó abajo. Di su nombre: ¿con qué sonido empieza?',it:'Un disegno è rimasto giù. Di’ il suo nome: con quale suono inizia?',pt:'Uma figura ficou embaixo. Diga o nome dela: com que som começa?',fr:'Une image est restée en bas. Dis son nom : par quel son commence-t-il ?',fi:'Yksi kuva jäi alas. Sano sen nimi: millä äänteellä se alkaa?'},
    hintHooks:    {en:'A hook is still empty. Find one more picture for that magnet.',de:'Ein Haken ist noch leer. Finde noch ein Bild für diesen Magneten.',nl:'Er is nog een haakje leeg. Zoek nog een plaatje voor die magneet.',da:'En krog er stadig tom. Find et billede mere til den magnet.',sv:'En krok är fortfarande tom. Hitta en bild till för den magneten.',no:'En krok er fortsatt tom. Finn ett bilde til for den magneten.',es:'Todavía hay un gancho vacío. Busca un dibujo más para ese imán.',it:'C’è ancora un gancio vuoto. Trova un altro disegno per quella calamita.',pt:'Ainda há um gancho vazio. Encontre mais uma figura para esse ímã.',fr:'Un crochet est encore vide. Trouve une image de plus pour cet aimant.',fi:'Yksi koukku on vielä tyhjä. Etsi sille magneetille vielä yksi kuva.'},
    hintHelp:     {en:'Look at the little letters. Which ones match the magnet?',de:'Schau dir die kleinen Buchstaben an. Welche passen zum Magneten?',nl:'Kijk naar de kleine letters. Welke passen bij de magneet?',da:'Se på de små bogstaver. Hvilke passer til magneten?',sv:'Titta på de små bokstäverna. Vilka passar till magneten?',no:'Se på de små bokstavene. Hvilke passer til magneten?',es:'Mira las letritas. ¿Cuáles coinciden con el imán?',it:'Guarda le letterine. Quali corrispondono alla calamita?',pt:'Olhe as letrinhas. Quais combinam com o ímã?',fr:'Regarde les petites lettres. Lesquelles vont avec l’aimant ?',fi:'Katso pieniä kirjaimia. Mitkä sopivat magneettiin?'},
    hintStayedTeam:{en:'That team does not fit there. Say the word and listen for the team.',de:'Diese Buchstabengruppe passt dort nicht. Sprich das Wort und hör auf die Gruppe.',nl:'Die lettercombinatie past daar niet. Zeg het woord en luister naar de klank.',da:'Den bogstavgruppe passer ikke der. Sig ordet, og lyt efter gruppen.',sv:'Den bokstavsgruppen passar inte där. Säg ordet och lyssna efter gruppen.',no:'Den bokstavgruppen passer ikke der. Si ordet og lytt etter gruppen.',es:'Ese par de letras no va ahí. Di la palabra y escucha el par.',it:'Quel gruppo di lettere non va lì. Di’ la parola e ascolta il gruppo.',pt:'Esse dígrafo não combina ali. Diga a palavra e escute o dígrafo.',fr:'Ce groupe de lettres ne va pas là. Dis le mot et écoute le groupe.',fi:'Se kirjainpari ei sovi siihen. Sano sana ja kuuntele kirjainparia.'},
    hintHelpTeam: {en:'Is it this team or that one? Look at the two glowing magnets.',de:'Ist es diese Gruppe oder jene? Schau auf die zwei leuchtenden Magneten.',nl:'Is het deze combinatie of die? Kijk naar de twee magneten die oplichten.',da:'Er det den gruppe eller den? Se på de to magneter, der lyser.',sv:'Är det den här gruppen eller den där? Titta på de två magneterna som lyser.',no:'Er det denne gruppen eller den? Se på de to magnetene som lyser.',es:'¿Es este par o aquel? Mira los dos imanes que brillan.',it:'È questo gruppo o quello? Guarda le due calamite che brillano.',pt:'É este dígrafo ou aquele? Olhe os dois ímãs que brilham.',fr:'Est-ce ce groupe-ci ou celui-là ? Regarde les deux aimants qui brillent.',fi:'Onko se tämä kirjainpari vai tuo? Katso kahta hehkuvaa magneettia.'},
    hintStayedRead:{en:'That picture stayed down. Read the word again, all the way to the end.',de:'Das Bild ist unten geblieben. Lies das Wort noch einmal bis zum Ende.',nl:'Dat plaatje bleef liggen. Lees het woord nog eens tot het eind.',da:'Det billede blev liggende. Læs ordet igen helt til ende.',sv:'Den bilden blev liggande. Läs ordet igen ända till slutet.',no:'Det bildet ble liggende. Les ordet igjen helt til slutten.',es:'Ese dibujo se quedó abajo. Lee otra vez la palabra hasta el final.',it:'Quel disegno è rimasto giù. Rileggi la parola fino alla fine.',pt:'Essa figura ficou embaixo. Leia a palavra de novo até o fim.',fr:'Cette image est restée en bas. Relis le mot jusqu’au bout.',fi:'Se kuva jäi alas. Lue sana uudelleen loppuun asti.'},
    hintHelpRead: {en:'Look at the little letters on the pictures and read each word again.',de:'Schau auf die kleinen Buchstaben an den Bildern und lies jedes Wort noch einmal.',nl:'Kijk naar de kleine letters bij de plaatjes en lees elk woord nog eens.',da:'Se på de små bogstaver på billederne, og læs hvert ord igen.',sv:'Titta på de små bokstäverna på bilderna och läs varje ord igen.',no:'Se på de små bokstavene på bildene og les hvert ord igjen.',es:'Mira las letritas de los dibujos y lee otra vez cada palabra.',it:'Guarda le letterine sui disegni e rileggi ogni parola.',pt:'Olhe as letrinhas nas figuras e leia cada palavra de novo.',fr:'Regarde les petites lettres sur les images et relis chaque mot.',fi:'Katso kuvien pieniä kirjaimia ja lue jokainen sana uudelleen.'},
    okOne:        {en:'{list} starts with the sound of {u}!',de:'{list} fängt mit dem Laut {u} an!',nl:'{list} begint met de klank {u}!',da:'{list} begynder med lyden {u}!',sv:'{list} börjar med ljudet {u}!',no:'{list} begynner med lyden {u}!',es:'¡{list} empieza con el sonido de {u}!',it:'{list} inizia con il suono di {u}!',pt:'{list} começa com o som de {u}!',fr:'{list} commence par le son {u} !',fi:'{list} alkaa äänteellä {u}!'},
    okWeek:       {en:'{list}: they all start with the sound of {u}!',de:'{list}: Alle fangen mit dem Laut {u} an!',nl:'{list}: ze beginnen allemaal met de klank {u}!',da:'{list}: De begynder alle med lyden {u}!',sv:'{list}: alla börjar med ljudet {u}!',no:'{list}: Alle begynner med lyden {u}!',es:'{list}: ¡todos empiezan con el sonido de {u}!',it:'{list}: iniziano tutti con il suono di {u}!',pt:'{list}: todas começam com o som de {u}!',fr:'{list} : ils commencent tous par le son {u} !',fi:'{list}: kaikki alkavat äänteellä {u}!'},
    okTwo:        {en:'{a} pulled {la}. {b} pulled {lb}.',de:'{a} hat {la} angezogen. {b} hat {lb} angezogen.',nl:'{a} trok {la} aan. {b} trok {lb} aan.',da:'{a} trak {la}. {b} trak {lb}.',sv:'{a} drog till sig {la}. {b} drog till sig {lb}.',no:'{a} trakk {la}. {b} trakk {lb}.',es:'{a} jaló {la}. {b} jaló {lb}.',it:'{a} ha attirato {la}. {b} ha attirato {lb}.',pt:'{a} puxou {la}. {b} puxou {lb}.',fr:'{a} a attiré {la}. {b} a attiré {lb}.',fi:'{a} veti kuvat {la}. {b} veti kuvat {lb}.'},
    okTeam:       {en:'{list}: you found every team!',de:'{list}: Du hast jede Buchstabengruppe gefunden!',nl:'{list}: je hebt elke lettercombinatie gevonden!',da:'{list}: Du fandt alle bogstavgrupperne!',sv:'{list}: du hittade alla bokstavsgrupper!',no:'{list}: Du fant alle bokstavgruppene!',es:'{list}: ¡encontraste todos los pares de letras!',it:'{list}: hai trovato tutti i gruppi di lettere!',pt:'{list}: você encontrou todos os dígrafos!',fr:'{list} : tu as trouvé tous les groupes de lettres !',fi:'{list}: löysit kaikki kirjainparit!'},
    okRead:       {en:'Every word found its picture!',de:'Jedes Wort hat sein Bild gefunden!',nl:'Elk woord heeft zijn plaatje gevonden!',da:'Hvert ord fandt sit billede!',sv:'Varje ord hittade sin bild!',no:'Hvert ord fant bildet sitt!',es:'¡Cada palabra encontró su dibujo!',it:'Ogni parola ha trovato il suo disegno!',pt:'Cada palavra encontrou a sua figura!',fr:'Chaque mot a trouvé son image !',fi:'Jokainen sana löysi kuvansa!'},
    setLevel:     {en:'Magnets',de:'Magnete',nl:'Magneten',da:'Magneter',sv:'Magneter',no:'Magneter',es:'Imanes',it:'Calamite',pt:'Ímãs',fr:'Aimants',fi:'Magneetit'},
    lvOne:        {en:'One hook',de:'Ein Haken',nl:'Eén haakje',da:'Én krog',sv:'En krok',no:'Én krok',es:'Un gancho',it:'Un gancio',pt:'Um gancho',fr:'Un crochet',fi:'Yksi koukku'},
    lvWeek:       {en:'Letter of the week',de:'Buchstabe der Woche',nl:'Letter van de week',da:'Ugens bogstav',sv:'Veckans bokstav',no:'Ukas bokstav',es:'Letra de la semana',it:'Lettera della settimana',pt:'Letra da semana',fr:'Lettre de la semaine',fi:'Viikon kirjain'},
    lvTwo:        {en:'Two magnets',de:'Zwei Magnete',nl:'Twee magneten',da:'To magneter',sv:'Två magneter',no:'To magneter',es:'Dos imanes',it:'Due calamite',pt:'Dois ímãs',fr:'Deux aimants',fi:'Kaksi magneettia'},
    lvTeam:       {en:'Which team?',de:'Welche Gruppe?',nl:'Welke combinatie?',da:'Hvilken gruppe?',sv:'Vilken grupp?',no:'Hvilken gruppe?',es:'¿Qué par?',it:'Quale gruppo?',pt:'Qual dígrafo?',fr:'Quel groupe ?',fi:'Mikä kirjainpari?'},
    lvGap:        {en:'Team in the word',de:'Gruppe im Wort',nl:'Combinatie in het woord',da:'Gruppe i ordet',sv:'Grupp i ordet',no:'Gruppe i ordet',es:'El par en la palabra',it:'Il gruppo nella parola',pt:'Dígrafo na palavra',fr:'Le groupe dans le mot',fi:'Kirjainpari sanassa'},
    setLetters:   {en:'Letters',de:'Buchstaben',nl:'Letters',da:'Bogstaver',sv:'Bokstäver',no:'Bokstaver',es:'Letras',it:'Lettere',pt:'Letras',fr:'Lettres',fi:'Kirjaimet'},
    lettersBoth:  {en:'Capital and small',de:'Groß und klein',nl:'Hoofdletter en kleine letter',da:'Store og små',sv:'Stora och små',no:'Store og små',es:'Mayúscula y minúscula',it:'Maiuscola e minuscola',pt:'Maiúscula e minúscula',fr:'Majuscule et minuscule',fi:'Iso ja pieni'},
    lettersUpper: {en:'Capital',de:'Groß',nl:'Hoofdletter',da:'Store',sv:'Stora',no:'Store',es:'Mayúscula',it:'Maiuscola',pt:'Maiúscula',fr:'Majuscule',fi:'Iso'},
    lettersLower: {en:'Small',de:'Klein',nl:'Kleine letter',da:'Små',sv:'Små',no:'Små',es:'Minúscula',it:'Minuscola',pt:'Minúscula',fr:'Minuscule',fi:'Pieni'},
    ariaCard:     {en:'Picture: {name}',de:'Bild: {name}',nl:'Plaatje: {name}',da:'Billede: {name}',sv:'Bild: {name}',no:'Bilde: {name}',es:'Dibujo: {name}',it:'Disegno: {name}',pt:'Figura: {name}',fr:'Image : {name}',fi:'Kuva: {name}'},
    ariaMagnet:   {en:'Magnet {u}: {n} hooks empty',de:'Magnet {u}: {n} Haken leer',nl:'Magneet {u}: {n} haakjes leeg',da:'Magnet {u}: {n} kroge tomme',sv:'Magnet {u}: {n} krokar tomma',no:'Magnet {u}: {n} kroker tomme',es:'Imán {u}: {n} ganchos vacíos',it:'Calamita {u}: {n} ganci vuoti',pt:'Ímã {u}: {n} ganchos vazios',fr:'Aimant {u} : {n} crochets vides',fi:'Magneetti {u}: {n} tyhjää koukkua'},
    ariaSay:      {en:'Say the name',de:'Namen anhören',nl:'Naam laten horen',da:'Hør navnet',sv:'Hör namnet',no:'Hør navnet',es:'Escuchar el nombre',it:'Ascolta il nome',pt:'Ouvir o nome',fr:'Écouter le nom',fi:'Kuuntele nimi'}
    /*STRINGS-END*/
  },

  defaults: { level: 'one', letters: 'both' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'one', labelKey: 'lvOne' }, { value: 'week', labelKey: 'lvWeek' }, { value: 'two', labelKey: 'lvTwo' }, { value: 'team', labelKey: 'lvTeam' }, { value: 'gap', labelKey: 'lvGap' }] },
    { key: 'letters', type: 'choice', labelKey: 'setLetters', options: [{ value: 'both', labelKey: 'lettersBoth' }, { value: 'upper', labelKey: 'lettersUpper' }, { value: 'lower', labelKey: 'lettersLower' }] }
  ],

  OK_MS: 3000, FAST: false,
  LV_KEY: { one: 'lvOne', week: 'lvWeek', two: 'lvTwo', team: 'lvTeam', gap: 'lvGap' },
  QUOTES: { en: ['“', '”'], de: ['„', '“'], nl: ['‘', '’'], da: ['»', '«'], sv: ['”', '”'], no: ['«', '»'], es: ['«', '»'], it: ['«', '»'], pt: ['“', '”'], fr: ['« ', ' »'], fi: ['”', '”'] },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._deals = null; this._dealKey = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._drag = null; this._view = {}; this._sel = -1;
    var ls = LetterMagnetCore.levels(this._loc()), self = this;
    this.settings = [
      { key: 'level', type: 'choice', labelKey: 'setLevel', options: ls.map(function (v) { return { value: v, labelKey: self.LV_KEY[v] }; }) },
      { key: 'letters', type: 'choice', labelKey: 'setLetters', options: [{ value: 'both', labelKey: 'lettersBoth' }, { value: 'upper', labelKey: 'lettersUpper' }, { value: 'lower', labelKey: 'lettersLower' }] }
    ];
    injectMagnetCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () { if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); } else if (this._wrap) this._paint(); },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return LetterMagnetCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _lv: function () { return LetterMagnetCore.level(this._loc(), this._set('level')); },
  _key: function () { return this._loc() + '/' + this._lv(); },
  _say: function (text, rate) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: this._loc(), rate: rate || 0.9 }); } catch (e) {} },
  _q: function (s) { var Q = this.QUOTES[this._loc()] || this.QUOTES.en; return Q[0] + s + Q[1]; },
  /* a magnet's label in the Letters setting (words stay as written; German nouns keep their capital) */
  _label: function (mg) {
    var mode = this._set('letters') || 'both', u = mg.label;
    if (mg.kind === 'word') return u;
    var up = u.charAt(0).toLocaleUpperCase() + u.slice(1);
    if (mode === 'upper') return u.length > 1 ? u.toLocaleUpperCase() : up;
    if (mode === 'lower') return u;
    return u.length > 1 ? up + ' ' + u : up + u;
  },
  _uArg: function (r) { return this._q(this._label(r.magnets[0])); },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = LetterMagnetCore.rounds(this._loc(), this._lv()); this._poolKey = k; this._order = null; } return this._pool; },
  _cols: function (r) { return r.cards.length === 4 ? 2 : 3; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = LetterMagnetCore, self = this;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); this._deals = null; }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); this._deals = null; }
    if (!this._deals || this._dealKey !== this._poolKey || this._deals.length !== n) { this._deals = C.dealTables(pool, Math.random, this._cols(pool[0])); this._dealKey = this._poolKey; }
    var r = pool[this._order[index % n]], tb = this._deals[this._order[index % n]];
    /* two magnets swap sides every pass */
    var ord = r.magnets.map(function (_, i) { return i; }); if (r.level === 'two' && pass % 2 === 1) ord.reverse();
    var pk = r.level === 'one' ? 'pOne' : r.level === 'week' ? 'pWeek' : r.level === 'two' ? 'pTwo' : r.level === 'team' ? 'pTeam' : r.read ? 'pRead' : 'pGap';
    var ck = r.level === 'one' ? 'okOne' : r.level === 'week' ? 'okWeek' : r.level === 'two' ? 'okTwo' : r.read ? 'okRead' : 'okTeam';
    return {
      id: 'letter-magnet.' + r.loc + '.' + r.id, promptKey: pk, promptArgs: { u: this._uArg(r) }, celebrateKey: ck, answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._view = {}; tool._drag = null; tool._sel = -1;
        tool.st = C.newState(r, { table: tb, order: ord });
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = LetterMagnetCore, r0 = C.rounds(this._loc(), 'one')[0]; this.st = C.newState(r0, {}); }
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._busy || self._drag) return; last = w; self._render2(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var L = this._L = LetterMagnetCore.layout(this._width());
    var wrap = api.el('div', 'lmg-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.W < 340 ? ' is-tiny' : '')); this._wrap = wrap; wrap.tabIndex = -1;
    [['card', L.card], ['pic', L.pic], ['magnet', L.magnet]].forEach(function (p) { wrap.style.setProperty('--lmg-' + p[0], p[1] + 'px'); });
    this._gantry = api.el('div', 'lmg-gantry'); wrap.appendChild(this._gantry);
    this._table = api.el('div', 'lmg-table'); wrap.appendChild(this._table);
    var ask = api.el('div', 'lmg-ask'); wrap.appendChild(ask);
    var note = api.el('p', 'lmg-note'); note.setAttribute('aria-live', 'polite'); this._note = note; ask.appendChild(note);
    var chk = api.el('button', 'lmg-check'); chk.type = 'button'; chk.setAttribute('data-k', 'lever');
    chk.innerHTML = '<span class="lmg-lever" aria-hidden="true"><i></i></span><span class="lmg-checkword"></span>';
    chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.addEventListener('keydown', function (ev) { self._onKey(ev); });
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
    if (!this._gantry) return;
    var st = this.st, C = LetterMagnetCore, r = st.r, v = this._view;
    this._wrap.className = this._wrap.className.replace(/ is-lv-\w+/g, '') + ' is-lv-' + r.level + (r.read ? ' is-read' : '');
    this._wrap.classList.toggle('is-fast', !!this.FAST);
    this._wrap.style.setProperty('--lmg-n', r.magnets.length);
    var gaps = this._L.mode === 'wide' ? 10 : 6, cw = Math.min(this._L.magnet, (Math.min(640, this._L.W) - gaps * (r.magnets.length - 1)) / r.magnets.length);
    this._wrap.style.setProperty('--lmg-colw', Math.floor(cw - 4) + 'px');
    this._paintGantry(); this._paintTable();
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : (v.won ? this._okText() : '');
    else if (h && !this._busy) msg = this._t(h, { u: this._uArg(r) });
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.last && st.last.result !== 'empty'));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
    this._checkBtn.querySelector('.lmg-checkword').textContent = this._t('check');
    this._checkBtn.classList.toggle('is-on', !!(v.on));
  },
  _names: function (ids) { var r = this.st.r; return ids.map(function (i) { return r.cards[i].word; }).join(', '); },
  _okText: function () {
    var st = this.st, r = st.r;
    if (r.level === 'one') return this._t('okOne', { list: this._names(st.hung[0]), u: this._uArg(r) });
    if (r.level === 'week') return this._t('okWeek', { list: this._names(st.hung[0]), u: this._uArg(r) });
    if (r.level === 'two') return this._t('okTwo', { a: this._q(this._label(r.magnets[0])), la: this._names(st.hung[0]), b: this._q(this._label(r.magnets[1])), lb: this._names(st.hung[1]) });
    if (r.read) return this._t('okRead');
    var all = []; st.hung.forEach(function (h) { all = all.concat(h); });
    return this._t('okTeam', { list: this._names(all) });
  },
  /* the gantry: one to three magnets, each with its hooks and its pull zone */
  _paintGantry: function () {
    var el = this._gantry, st = this.st, r = st.r, C = LetterMagnetCore, self = this, v = this._view; el.innerHTML = '';
    var help = C.helpOn(st), pulse = {};
    if (help && (r.level === 'team' || r.level === 'gap') && !r.read) (st.last.stayed || []).forEach(function (s) { pulse[s.magnet] = 1; if (s.right >= 0) pulse[s.right] = 1; });
    var beam = this.api.el('div', 'lmg-beam'); beam.setAttribute('aria-hidden', 'true'); el.appendChild(beam);
    var row = this.api.el('div', 'lmg-magnets'); el.appendChild(row);
    st.order.forEach(function (m) {
      var mg = r.magnets[m], hooks = C.hooksOf(r, m), col = self.api.el('div', 'lmg-col' + (pulse[m] ? ' is-pulse' : '') + (v.on ? ' is-on' : ''));
      col.setAttribute('data-magnet', m);
      var mag = self.api.el('div', 'lmg-magnet' + (mg.kind === 'word' ? ' is-word' : '') + (self._label(mg).length > 2 ? ' is-long' : '') + (v.won ? ' is-won' : ''));
      mag.innerHTML = '<span class="lmg-u" aria-hidden="true"></span><span class="lmg-disc"></span>';
      mag.querySelector('.lmg-disc').textContent = self._label(mg); mag.style.setProperty('--lmg-len', Math.max(4, self._label(mg).length));
      mag.setAttribute('role', 'img'); mag.setAttribute('aria-label', self._t('ariaMagnet', { u: self._label(mg), n: hooks - st.hung[m].length }));
      col.appendChild(mag);
      var hk = self.api.el('div', 'lmg-hooks');
      for (var h = 0; h < hooks; h++) (function (h) {
        var ci = st.hung[m][h], slot = self.api.el('div', 'lmg-hook' + (ci !== undefined ? ' is-full' : '') + (v.lifted && v.lifted.indexOf(ci) >= 0 ? ' is-fly' : ''));
        slot.innerHTML = '<span class="lmg-hookline" aria-hidden="true"></span>';
        if (ci !== undefined) {
          var c = r.cards[ci], th = self.api.el('div', 'lmg-hung'); th.innerHTML = '<img alt="" draggable="false" src="' + self._pic(c.pic) + '">'; slot.appendChild(th);
          if (st.done && v.won) slot.appendChild(self._nameStrip(c, mg));
        } else if (st.show && st.last && st.last.result !== 'empty' && st.last.empty && st.last.empty[m] > 0) slot.classList.add('is-wiggle');
        hk.appendChild(slot);
      })(h);
      col.appendChild(hk);
      var zone = self.api.el('button', 'lmg-zone' + (self._sel >= 0 ? ' is-ready' : '')); zone.type = 'button'; zone.setAttribute('data-k', 'zone' + m); zone.setAttribute('data-zone', m);
      zone.setAttribute('aria-label', self._t('ariaMagnet', { u: self._label(mg), n: hooks - st.hung[m].length }));
      zone.addEventListener('click', function () { self._zoneTap(m); });
      st.zone[m].forEach(function (ci) {
        var c = r.cards[ci], z = self.api.el('span', 'lmg-zcard'); z.setAttribute('data-k', 'zc' + ci); z.setAttribute('data-card', ci); z.setAttribute('role', 'button'); z.tabIndex = 0;
        z.setAttribute('aria-label', self._t('ariaCard', { name: c.word }));
        z.innerHTML = '<img alt="" draggable="false" src="' + self._pic(c.pic) + '">';
        z.addEventListener('click', function (ev) { ev.stopPropagation(); if (self._sel >= 0) self._zoneTap(m); else self._back(ci); });
        z.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); ev.stopPropagation(); self._back(ci); } });
        zone.appendChild(z);
      });
      if (!st.zone[m].length) { var zh = self.api.el('span', 'lmg-zonehint'); zh.setAttribute('aria-hidden', 'true'); zone.appendChild(zh); }
      col.appendChild(zone);
      row.appendChild(col);
    });
  },
  /* the name strip under a hung picture: the first letter (or the team) in coral, under the magnet's letter */
  _nameStrip: function (c, mg) {
    var s = this.api.el('span', 'lmg-name'), w = c.word, n = mg.kind === 'word' ? 0 : (c.team ? null : mg.label.length);
    if (c.team) { var i = w.toLocaleLowerCase().indexOf(c.team); s.innerHTML = ''; s.appendChild(document.createTextNode(w.slice(0, i))); var b = document.createElement('b'); b.textContent = w.slice(i, i + c.team.length); s.appendChild(b); s.appendChild(document.createTextNode(w.slice(i + c.team.length))); return s; }
    if (n) { var b2 = document.createElement('b'); b2.textContent = w.slice(0, n); s.appendChild(b2); s.appendChild(document.createTextNode(w.slice(n))); return s; }
    s.textContent = w; return s;
  },
  _paintTable: function () {
    var el = this._table, st = this.st, r = st.r, C = LetterMagnetCore, self = this, v = this._view; el.innerHTML = '';
    var cols = this._L.mode === 'wide' ? (r.cards.length === 4 ? 4 : 3) : (r.cards.length === 4 ? 2 : 3);
    el.style.setProperty('--lmg-cols', cols);
    /* a row whose pictures have all gone up folds flat, so the switch rises as the zones fill */
    var flat = {}; for (var row = 0; row * cols < st.table.length; row++) flat[row] = st.table.slice(row * cols, row * cols + cols).every(function (ci) { return !C.whereIs(st, ci).table; });
    var help = C.helpOn(st), stayed = (st.show && st.last && st.last.stayed || []).map(function (s) { return s.card; });
    st.table.forEach(function (ci, slot) {
      var c = r.cards[ci], w = C.whereIs(st, ci), cell = self.api.el('div', 'lmg-cell');
      if (w.table) {
        var b = self.api.el('button', 'lmg-card' + (self._sel === ci ? ' is-sel' : '') + (stayed.indexOf(ci) >= 0 && v.shiver ? ' is-shiver' : '') + (c.strip ? ' has-strip' : ''));
        b.type = 'button'; b.setAttribute('data-k', 'card' + ci); b.setAttribute('data-card', ci); b.setAttribute('aria-label', self._t('ariaCard', { name: c.word })); b.setAttribute('aria-pressed', String(self._sel === ci));
        b.innerHTML = '<img alt="" draggable="false" src="' + self._pic(c.pic) + '">';
        if (c.strip) {
          var sp = self.api.el('span', 'lmg-strip'); sp.appendChild(document.createTextNode(c.strip.before));
          var g = self.api.el('span', 'lmg-gapbox' + (c.strip.before ? '' : ' is-front')); g.setAttribute('aria-hidden', 'true'); g.style.setProperty('--lmg-gap', c.strip.gap.length); sp.appendChild(g);
          sp.appendChild(document.createTextNode(c.strip.after)); b.appendChild(sp);
        }
        if (help) { var tab = self.api.el('span', 'lmg-tab'); tab.textContent = C.tabOf(st, ci); tab.setAttribute('aria-hidden', 'true'); b.appendChild(tab); }
        self._bindDrag(b, ci);
        cell.appendChild(b);
        var say = self.api.el('button', 'lmg-say'); say.type = 'button'; say.setAttribute('data-k', 'say' + ci); say.setAttribute('aria-label', self._t('ariaSay'));
        say.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a4.5 4.5 0 010 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
        say.addEventListener('click', function () { self._say(c.word); });
        cell.appendChild(say);
      } else { var e = self.api.el('div', 'lmg-spot' + (flat[Math.floor(slot / cols)] ? ' is-flat' : '')); e.setAttribute('aria-hidden', 'true'); cell.appendChild(e); }
      el.appendChild(cell);
    });
  },

  /* ---------------- the hand ---------------- */
  _multi: function () { return this.st.r.magnets.length > 1; },
  _cardTap: function (ci) {
    if (this._busy || this.st.done) return;
    if (!this._multi()) { this._toZone(ci, 0); return; }
    this._sel = this._sel === ci ? -1 : ci; this.api.sound(500); this._paint();
  },
  _zoneTap: function (m) { if (this._sel >= 0) this._toZone(this._sel, m); },
  _toZone: function (ci, m) { if (LetterMagnetCore.toZone(this.st, ci, m)) { this._sel = -1; this._view = {}; this.api.sound(587); this._paint(); } },
  _back: function (ci) { if (this._busy) return; if (LetterMagnetCore.toTable(this.st, ci)) { this.api.sound(330); this._view = {}; this._paint(); } },
  _bindDrag: function (b, ci) {
    var self = this;
    b.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done || (ev.button !== undefined && ev.button !== 0)) return;
      var sx = ev.clientX, sy = ev.clientY, moved = false, ghost = null;
      try { b.setPointerCapture(ev.pointerId); } catch (e) {}
      var hitAt = function (x, y) { var zs = self._wrap.querySelectorAll('.lmg-col'); for (var z = 0; z < zs.length; z++) { var rc = zs[z].getBoundingClientRect(); if (x >= rc.left && x <= rc.right && y >= rc.top && y <= rc.bottom + 14) return +zs[z].getAttribute('data-magnet'); } return -1; };
      var move = function (e) {
        if (!moved && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) < 8) return;
        if (!moved) { moved = true; self._drag = {}; ghost = self.api.el('div', 'lmg-ghost'); ghost.innerHTML = b.querySelector('img').outerHTML; document.body.appendChild(ghost); b.classList.add('is-lifted'); }
        ghost.style.left = (e.clientX - 40) + 'px'; ghost.style.top = (e.clientY - 40) + 'px';
        var h = hitAt(e.clientX, e.clientY);
        [].forEach.call(self._wrap.querySelectorAll('.lmg-col'), function (s) { s.classList.toggle('is-over', +s.getAttribute('data-magnet') === h); });
      };
      var up = function (e) {
        b.removeEventListener('pointermove', move); b.removeEventListener('pointerup', up); b.removeEventListener('pointercancel', up);
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
        b.classList.remove('is-lifted'); self._drag = null;
        if (!moved) { if (e.type === 'pointerup') self._cardTap(ci); return; }
        var h = hitAt(e.clientX, e.clientY);
        if (h >= 0) self._toZone(ci, h); else self._paint();
      };
      b.addEventListener('pointermove', move); b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up);
      ev.preventDefault();
    });
    b.addEventListener('keydown', function (ev) {
      var st = self.st, k = ev.key;
      if (k === 'Enter' || k === ' ') { ev.preventDefault(); ev.stopPropagation(); self._toZone(ci, self._multi() ? (self._sel >= 0 ? 0 : 0) : 0); return; }
      if (/^[1-3]$/.test(k) && +k <= st.r.magnets.length) { ev.preventDefault(); ev.stopPropagation(); self._toZone(ci, st.order[+k - 1]); }
    });
  },
  _onKey: function (ev) { if (ev.key === 'Enter' && ev.target === this._wrap) { ev.preventDefault(); this._check(); } },

  _check: function () {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, C = LetterMagnetCore, r = st.r;
    var res = C.flip(st);
    if (res.kase === 'empty') { this.api.sound(460); this._view = {}; this._paint(); return; }
    /* the lever snaps up, the magnet hums, the right pictures fly up one after another, the others shiver and stay */
    this._busy = true; this._view = { on: true, lifted: (res.lifted || []).map(function (x) { return x.card; }), shiver: true };
    this.api.sound(110); this._paint();
    (res.lifted || []).forEach(function (x, i) { self._later(function () { self.api.sound(660 + i * 40); }, self._ms(200 + i * 90)); });
    if (res.ok) { if ((res.stayed || []).length) this._later(function () { self.api.sound(196); }, this._ms(300)); return this._win(); }
    this._later(function () { self.api.sound(196); }, this._ms(300 + (res.lifted || []).length * 90));
    this._later(function () { self._busy = false; self._view = {}; self._paint(); self.api.announce(self._note.textContent || ''); }, this._ms(700));
  },
  _win: function () {
    var self = this;
    this._later(function () {
      self._view = { won: true };
      self.api.sound(659); self._later(function () { self.api.sound(784); }, 110); self._later(function () { self.api.sound(1046); }, 220);
      self._busy = false; self._paint(); self.api.announce(self._note.textContent || '');
    }, this._ms(650));
    this._later(function () { self._afterOk = true; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this._ms(this.OK_MS));
  }
};

var lmgCssDone = false;
function injectMagnetCSS() {
  if (lmgCssDone || typeof document === 'undefined') return;
  lmgCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.lmg-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;--lmg-ink:#2A2A35;--lmg-teal:#146B5E;--lmg-coral:#F2784B;--lmg-cream:#FFF8EC;--lmg-red:#E2533B;user-select:none;-webkit-user-select:none;}'
  + '.lmg-wrap:focus{outline:none;}'
  /* the gantry and its magnets */
  + '.lmg-gantry{position:relative;width:100%;max-width:640px;padding-top:12px;}'
  + '.lmg-beam{position:absolute;left:4%;right:4%;top:0;height:8px;border-radius:4px;background:var(--lmg-ink);} .lmg-beam::before,.lmg-beam::after{content:"";position:absolute;top:0;width:8px;height:40px;border-radius:4px;background:var(--lmg-ink);} .lmg-beam::before{left:0;} .lmg-beam::after{right:0;}'
  + '.lmg-magnets{display:flex;justify-content:center;gap:10px;}'
  + '.lmg-col{flex:1;max-width:max(var(--lmg-magnet),calc(var(--lmg-pic) * 1.5 + 28px));display:flex;flex-direction:column;align-items:center;gap:6px;border-radius:14px;padding:4px 2px 6px;}'
  + '.lmg-col.is-over{background:rgba(242,120,75,.12);} .lmg-col.is-pulse .lmg-disc{animation:lmg-glow 1s ease-in-out infinite;} @keyframes lmg-glow{50%{box-shadow:0 0 0 6px rgba(242,120,75,.5),inset 0 0 0 3px var(--lmg-ink);}}'
  + '.lmg-magnet{position:relative;width:min(100%,calc(var(--lmg-magnet) * .8));aspect-ratio:2/1;display:flex;align-items:flex-start;justify-content:center;}'
  + '.lmg-u{position:absolute;inset:0;border:calc(var(--lmg-magnet) * .14) solid var(--lmg-red);border-top-left-radius:50% 70%;border-top-right-radius:50% 70%;border-bottom:0;box-sizing:border-box;}'
  + '.lmg-u::before,.lmg-u::after{content:"";position:absolute;bottom:-2px;width:calc(var(--lmg-magnet) * .14);height:22%;background:#C9CFD6;} .lmg-u::before{left:calc(var(--lmg-magnet) * -.14);} .lmg-u::after{right:calc(var(--lmg-magnet) * -.14);}'
  + '.lmg-disc{position:relative;margin-top:8%;min-width:calc(var(--lmg-magnet) * .34);height:calc(var(--lmg-magnet) * .34);padding:0 8px;box-sizing:border-box;border-radius:calc(var(--lmg-magnet) * .17);background:var(--lmg-cream);box-shadow:inset 0 0 0 3px var(--lmg-ink);display:flex;align-items:center;justify-content:center;font-family:' + D + ';font-weight:800;font-size:calc(var(--lmg-magnet) * .2);line-height:1;color:var(--lmg-ink);white-space:nowrap;z-index:1;}'
  + '.lmg-magnet.is-long .lmg-disc{height:calc(var(--lmg-magnet) * .25);min-width:0;padding:0 12px;border-radius:999px;margin-top:10%;font-size:max(16px,calc(var(--lmg-magnet) * .14));}'
  + '.lmg-magnet.is-word .lmg-disc{padding:0 10px;max-width:var(--lmg-colw);font-size:clamp(14px,calc((var(--lmg-colw) - 20px) / (var(--lmg-len) * .58)),20px);}'
  + '.lmg-col.is-on .lmg-magnet::after{content:"";position:absolute;left:-6%;right:-6%;bottom:-14px;height:14px;border-radius:50%;border-bottom:3px solid rgba(20,107,94,.55);animation:lmg-field .35s ease-out 2;} @keyframes lmg-field{0%{opacity:0;transform:scaleX(.6);}100%{opacity:1;}}'
  + '.lmg-magnet.is-won .lmg-disc{box-shadow:inset 0 0 0 3px var(--lmg-teal),0 0 0 6px rgba(20,107,94,.25);}'
  + '.lmg-hooks{display:flex;justify-content:center;gap:4px;flex-wrap:wrap;min-height:20px;}'
  + '.lmg-hook{position:relative;display:flex;flex-direction:column;align-items:center;min-width:24px;}'
  + '.lmg-hookline{display:block;width:16px;height:16px;border:3px solid var(--lmg-teal);border-top:0;border-radius:0 0 10px 10px;}'
  + '.lmg-hook.is-wiggle .lmg-hookline{animation:lmg-wig .4s ease-in-out 3;} @keyframes lmg-wig{25%{transform:rotate(-14deg);}75%{transform:rotate(14deg);}}'
  + '.lmg-hung{width:calc(var(--lmg-pic) * .5);height:calc(var(--lmg-pic) * .5);border-radius:10px;background:#fff;box-shadow:inset 0 0 0 2px var(--lmg-teal);display:flex;align-items:center;justify-content:center;} .lmg-hung img{width:86%;height:86%;object-fit:contain;}'
  + '.lmg-hook.is-fly .lmg-hung{animation:lmg-fly .3s ease-out;} @keyframes lmg-fly{0%{transform:translateY(70px) scale(.8);opacity:.3;}}'
  + '.lmg-name{margin-top:2px;font-family:' + D + ';font-weight:700;font-size:15px;color:var(--lmg-ink);animation:lmg-unroll .3s ease-out;} .lmg-name b{color:#C4511F;} @keyframes lmg-unroll{0%{clip-path:inset(0 100% 0 0);}100%{clip-path:inset(0 0 0 0);}}'
  + '.lmg-zone{position:relative;display:flex;flex-wrap:wrap;justify-content:center;align-content:center;gap:4px;width:100%;min-height:calc(max(44px,var(--lmg-pic) * .5) + 14px);padding:6px;box-sizing:border-box;border:3px dashed rgba(20,107,94,.45);border-radius:16px;background:rgba(20,107,94,.05);cursor:pointer;}'
  + '.lmg-zone.is-ready{border-color:var(--lmg-coral);background:rgba(242,120,75,.08);}'
  + '.lmg-zcard{display:inline-flex;width:calc(var(--lmg-pic) * .5);height:calc(var(--lmg-pic) * .5);min-width:44px;min-height:44px;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 2px var(--lmg-ink);align-items:center;justify-content:center;cursor:pointer;} .lmg-zcard img{width:84%;height:84%;object-fit:contain;pointer-events:none;}'
  /* the table */
  + '.lmg-table{display:grid;grid-template-columns:repeat(var(--lmg-cols),var(--lmg-card));gap:12px;padding:12px;border-radius:16px;background:#E8D5B0;box-shadow:inset 0 0 0 2px #B9905B;}'
  + '.lmg-cell{position:relative;width:var(--lmg-card);}'
  + '.lmg-card{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;width:var(--lmg-card);min-height:var(--lmg-card);padding:6px 4px;box-sizing:border-box;border:0;border-radius:16px;background:var(--lmg-cream);box-shadow:inset 0 0 0 3px var(--lmg-ink),0 4px 0 #B9905B;cursor:pointer;touch-action:none;}'
  + '.lmg-card img{width:var(--lmg-pic);height:var(--lmg-pic);object-fit:contain;pointer-events:none;}'
  + '.lmg-card.is-sel{transform:translateY(-6px);box-shadow:inset 0 0 0 3px var(--lmg-coral),0 0 0 4px rgba(242,120,75,.3),0 6px 0 #B9905B;}'
  + '.lmg-card.is-shiver{animation:lmg-shiver .18s ease-in-out 3;} @keyframes lmg-shiver{25%{transform:translateX(-4px);}75%{transform:translateX(4px);}}'
  + '.lmg-card.is-lifted{opacity:.35;} .lmg-ghost{position:fixed;z-index:9999;pointer-events:none;width:80px;height:80px;border-radius:14px;background:var(--lmg-cream);box-shadow:inset 0 0 0 3px var(--lmg-ink),0 10px 18px rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;} .lmg-ghost img{width:70px;height:70px;object-fit:contain;}'
  + '.lmg-spot.is-flat{height:14px !important;} .lmg-spot{width:var(--lmg-card);height:var(--lmg-card);border-radius:16px;border:3px dashed rgba(185,144,91,.6);box-sizing:border-box;}'
  + '.lmg-say{position:absolute;right:-10px;top:-10px;width:44px;height:44px;padding:0;border:0;border-radius:50%;background:transparent;color:var(--lmg-teal);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;}'
  + '.lmg-say::before{content:"";position:absolute;left:7px;top:7px;width:30px;height:30px;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 2px #B2A794;} .lmg-say svg{position:relative;}'
  + '.lmg-tab{position:absolute;left:4px;top:4px;padding:1px 6px;border-radius:6px;background:#FFE3D6;box-shadow:inset 0 0 0 2px var(--lmg-coral);font-family:' + D + ';font-weight:800;font-size:16px;line-height:1.2;color:#A6461F;}'
  + '.lmg-strip{display:flex;align-items:center;justify-content:center;gap:1px;margin-top:4px;font-family:' + D + ';font-weight:700;font-size:16px;color:var(--lmg-ink);white-space:nowrap;}'
  + '.lmg-gapbox{display:inline-block;width:calc(var(--lmg-gap) * 9px + 8px);height:18px;border-radius:5px;background:#3B3A44;vertical-align:middle;}'
  /* the ask strip and the lever */
  + '.lmg-ask{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;}'
  + '.lmg-note{flex:1;min-height:28px;margin:0;font-weight:700;font-size:clamp(15px,2.3vw,18px);line-height:1.3;font-family:' + B + ';color:var(--lmg-teal);text-align:center;} .lmg-note:empty{display:none;} .lmg-note.is-ok{font-weight:800;} .lmg-note.is-wrong{color:#A6461F;}'
  + '.lmg-check{display:inline-flex;align-items:center;gap:8px;min-height:52px;padding:0 18px 0 10px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:' + D + ';cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .lmg-check[hidden]{display:none;} .lmg-check:disabled{opacity:.6;}'
  + '.lmg-lever{position:relative;display:inline-block;width:18px;height:34px;border-radius:9px;background:#fff;box-shadow:inset 0 0 0 2px #C95A31;} .lmg-lever i{position:absolute;left:3px;bottom:3px;width:12px;height:12px;border-radius:50%;background:var(--lmg-ink);transition:bottom .1s;} .lmg-check.is-on .lmg-lever i{bottom:19px;background:var(--lmg-teal);}'
  + '.lmg-wrap.is-narrow .lmg-note{text-align:left;} .lmg-wrap.is-narrow .lmg-table{gap:8px;padding:8px;} .lmg-wrap.is-narrow .lmg-magnets{gap:6px;}'
  + '.lmg-wrap.is-narrow .lmg-strip{font-size:14px;} .lmg-wrap.is-narrow .lmg-gapbox{height:16px;width:calc(var(--lmg-gap) * 8px + 6px);}'
  + '.lmg-wrap.is-tiny{gap:8px;} .lmg-wrap.is-tiny .lmg-table{gap:6px;padding:6px;}'
  + '.lmg-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.lmg-wrap *{animation-duration:.2s !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'lmg-css'; s.textContent = css; document.head.appendChild(s);
}
