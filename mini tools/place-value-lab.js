/* =====================================================================
   Place Value Lab — premium teacher tool #11 (Math Table).
   A base-10 blocks workmat with THREE LIVE-LINKED displays — blocks,
   numeral, NUMBER WORD — where ones bundle into a ten (rubber-band
   snap, child-invoked by default) and unbundle (pop) for regrouping.
   The moat: PV_WORD_SPANS tags each locale's number word into
   hundreds/tens/ones/joiner/teen/mixed parts so the word is color-
   coded to match the blocks and digits — German "vierundzwanzig"
   visibly says the 4 (ones, coral) FIRST while the numeral writes it
   LAST (the Zahlendreher inversion made teachable). Modes: Free-build,
   Show me N (free), Subtract lab (premium, borrow-forced, the break
   is load-bearing). Premium: hundreds place, Subtract lab, saved
   workmats. NUM_WORDS_HELPERS + _DECOMP_SPEAK are byte-faithful
   splices from place-value-core.js (the protected live-activity core
   is never imported); PV_WORD_SPANS is gate-verified byte-equal to
   the composers for 0-999 × 11 (scripts/verify-place-value-lab.js).
   ===================================================================== */
'use strict';

var PlaceValueLab = {
  id: 'place-value-lab',

  /* ---------------- strings ×11 ---------------- */
  strings: {
    title:        {en:'Place Value Lab',de:'Stellenwert-Labor',fr:'Labo des nombres',it:'Laboratorio di decine e unità',es:'Laboratorio de decenas y unidades',pt:'Laboratório das dezenas',nl:'Bouw het getal',sv:'Tiotalslabbet',da:'Tierværkstedet',no:'Tierverkstedet',fi:'Kymmenpaja'},
    instruction:  {en:'Tap to add blocks — the number and the word build themselves. Ten ones can become a ten!',de:'Tippe, um Blöcke zu legen — Zahl und Zahlwort bauen mit. Aus zehn Einern kann ein Zehner werden!',fr:'Appuie pour ajouter des blocs — le nombre et le mot se construisent tout seuls. Dix unités peuvent devenir une dizaine !',it:'Tocca per aggiungere i blocchi — il numero e la parola si costruiscono da soli. Dieci unità possono diventare una decina!',es:'Toca para poner bloques — el número y la palabra se arman solos. ¡Diez unidades pueden convertirse en una decena!',pt:'Toque para colocar blocos — o número e a palavra se montam sozinhos. Dez unidades podem virar uma dezena!',nl:'Tik om blokjes te leggen — het getal en het woord bouwen mee. Tien losse blokjes kunnen een tiental worden!',sv:'Tryck för att lägga block — talet och ordet växer fram samtidigt. Tio ental kan bli ett tiotal!',da:'Tryk for at lægge klodser — tallet og ordet bygger med. Ti enere kan blive en tier!',no:'Trykk for å legge klosser — tallet og tallordet bygger seg opp av seg selv. Ti enere kan bli en tier!',fi:'Lisää palikoita napauttamalla — luku ja lukusana rakentuvat mukana. Kymmenestä ykkösestä voi tulla kymppi!'},
    colHundreds:  {en:'Hundreds',de:'Hunderter',fr:'Centaines',it:'Centinaia',es:'Centenas',pt:'Centenas',nl:'Honderdtallen',sv:'Hundratal',da:'Hundreder',no:'Hundrere',fi:'Sadat'},
    colTens:      {en:'Tens',de:'Zehner',fr:'Dizaines',it:'Decine',es:'Decenas',pt:'Dezenas',nl:'Tientallen',sv:'Tiotal',da:'Tiere',no:'Tiere',fi:'Kymmenet'},
    colOnes:      {en:'Ones',de:'Einer',fr:'Unités',it:'Unità',es:'Unidades',pt:'Unidades',nl:'Eenheden',sv:'Ental',da:'Enere',no:'Enere',fi:'Ykköset'},
    slotH:        {en:'H',de:'H',fr:'C',it:'h',es:'C',pt:'C',nl:'H',sv:'H',da:'H',no:'H',fi:'S'},
    slotT:        {en:'T',de:'Z',fr:'D',it:'da',es:'D',pt:'D',nl:'T',sv:'T',da:'T',no:'T',fi:'K'},
    slotO:        {en:'O',de:'E',fr:'U',it:'u',es:'U',pt:'U',nl:'E',sv:'E',da:'E',no:'E',fi:'Y'},
    addOne:       {en:'Add a one',de:'Einen Einer dazulegen',fr:'Ajouter une unité',it:'Aggiungi un’unità',es:'Poner una unidad',pt:'Colocar uma unidade',nl:'Een eenheid erbij',sv:'Lägg till ett ental',da:'Læg en ener til',no:'Legg til en ener',fi:'Lisää ykkönen'},
    addTen:       {en:'Add a ten',de:'Einen Zehner dazulegen',fr:'Ajouter une dizaine',it:'Aggiungi una decina',es:'Poner una decena',pt:'Colocar uma dezena',nl:'Een tiental erbij',sv:'Lägg till ett tiotal',da:'Læg en tier til',no:'Legg til en tier',fi:'Lisää kymppi'},
    addHundred:   {en:'Add a hundred',de:'Einen Hunderter dazulegen',fr:'Ajouter une centaine',it:'Aggiungi un centinaio',es:'Poner una centena',pt:'Colocar uma centena',nl:'Een honderdtal erbij',sv:'Lägg till ett hundratal',da:'Læg en hundreder til',no:'Legg til en hundrer',fi:'Lisää satanen'},
    srUnitCube:   {en:'a one — tap to remove',de:'ein Einer — tippe zum Entfernen',fr:'une unité — appuie pour retirer',it:'un’unità — tocca per togliere',es:'una unidad — toca para quitar',pt:'uma unidade — toque para tirar',nl:'een eenheid — tik om weg te halen',sv:'ett ental — tryck för att ta bort',da:'en ener — tryk for at fjerne',no:'en ener — trykk for å fjerne',fi:'ykkönen — napauta poistaaksesi'},
    srTenRod:     {en:'a ten — tap to remove',de:'ein Zehner — tippe zum Entfernen',fr:'une dizaine — appuie pour retirer',it:'una decina — tocca per togliere',es:'una decena — toca para quitar',pt:'uma dezena — toque para tirar',nl:'een tiental — tik om weg te halen',sv:'ett tiotal — tryck för att ta bort',da:'en tier — tryk for at fjerne',no:'en tier — trykk for å fjerne',fi:'kymppi — napauta poistaaksesi'},
    srHundredFlat:{en:'a hundred — tap to remove',de:'ein Hunderter — tippe zum Entfernen',fr:'une centaine — appuie pour retirer',it:'un centinaio — tocca per togliere',es:'una centena — toca para quitar',pt:'uma centena — toque para tirar',nl:'een honderdtal — tik om weg te halen',sv:'ett hundratal — tryck för att ta bort',da:'en hundreder — tryk for at fjerne',no:'en hundrer — trykk for å fjerne',fi:'satanen — napauta poistaaksesi'},
    bundleInvite: {en:'Ten ones! Can you make a ten?',de:'Zehn Einer! Machst du einen Zehner daraus?',fr:'Dix unités ! Tu en fais une dizaine ?',it:'Dieci unità! Le cambi con una decina?',es:'¡Diez unidades! ¿Armas una decena?',pt:'Dez unidades! Vamos fazer uma dezena?',nl:'Tien losse! Maak jij er een tiental van?',sv:'Tio ental! Kan du göra ett tiotal av dem?',da:'Ti enere! Laver du en tier af dem?',no:'Ti enere! Lager du en tier av dem?',fi:'Kymmenen ykköstä! Teetkö niistä kympin?'},
    makeTen:      {en:'Make a ten!',de:'Zehner bündeln!',fr:'Faire une dizaine !',it:'Fai una decina!',es:'¡Armar una decena!',pt:'Fazer uma dezena!',nl:'Maak een tiental!',sv:'Gör ett tiotal!',da:'Lav en tier!',no:'Lag en tier!',fi:'Tee kymppi!'},
    makeHundred:  {en:'Make a hundred!',de:'Hunderter bündeln!',fr:'Faire une centaine !',it:'Fai un centinaio!',es:'¡Armar una centena!',pt:'Fazer uma centena!',nl:'Maak een honderdtal!',sv:'Gör ett hundratal!',da:'Lav en hundreder!',no:'Lag en hundrer!',fi:'Tee satanen!'},
    breakTen:     {en:'Break a ten',de:'Einen Zehner tauschen',fr:'Casser une dizaine',it:'Cambia una decina',es:'Desarmar una decena',pt:'Trocar uma dezena',nl:'Wissel een tiental in',sv:'Växla ett tiotal',da:'Veksl en tier',no:'Veksle en tier',fi:'Vaihda kymppi'},
    breakHundred: {en:'Break a hundred',de:'Einen Hunderter tauschen',fr:'Casser une centaine',it:'Cambia un centinaio',es:'Desarmar una centena',pt:'Trocar uma centena',nl:'Wissel een honderdtal in',sv:'Växla ett hundratal',da:'Veksl en hundreder',no:'Veksle en hundrer',fi:'Vaihda satanen'},
    modeBuild:    {en:'Build',de:'Bauen',fr:'Construire',it:'Costruisci',es:'Construir',pt:'Montar',nl:'Bouwen',sv:'Bygg',da:'Byg',no:'Bygg',fi:'Rakenna'},
    modeShow:     {en:'Show me',de:'Zeig mir',fr:'Montre-moi',it:'Mostrami',es:'Muéstrame',pt:'Me mostre',nl:'Laat zien',sv:'Visa mig',da:'Vis mig',no:'Vis meg',fi:'Näytä'},
    modeSub:      {en:'Subtract',de:'Abziehen',fr:'Soustraire',it:'Sottrai',es:'Restar',pt:'Subtrair',nl:'Eraf halen',sv:'Dra ifrån',da:'Træk fra',no:'Trekk fra',fi:'Vähennä'},
    showPrompt:   {en:'Can you build {n}?',de:'Kannst du {n} bauen?',fr:'Peux-tu construire {n} ?',it:'Sai costruire {n}?',es:'¿Puedes construir {n}?',pt:'Você consegue montar {n}?',nl:'Kun jij {n} bouwen?',sv:'Kan du bygga {n}?',da:'Kan du bygge {n}?',no:'Kan du bygge {n}?',fi:'Osaatko rakentaa luvun {n}?'},
    showPromptWord:{en:'Listen — build the number you hear!',de:'Hör zu — baue die Zahl, die du hörst!',fr:'Écoute — construis le nombre que tu entends !',it:'Ascolta — costruisci il numero che senti!',es:'Escucha — ¡construye el número que oyes!',pt:'Escute — monte o número que você ouvir!',nl:'Luister — bouw het getal dat je hoort!',sv:'Lyssna — bygg talet du hör!',da:'Lyt — byg det tal, du hører!',no:'Lytt — bygg tallet du hører!',fi:'Kuuntele — rakenna luku, jonka kuulet!'},
    hearAgain:    {en:'Hear it again',de:'Nochmal hören',fr:'Réécouter',it:'Riascolta',es:'Escuchar otra vez',pt:'Ouvir de novo',nl:'Nog eens horen',sv:'Lyssna igen',da:'Hør igen',no:'Hør igjen',fi:'Kuuntele uudelleen'},
    checkBtn:     {en:'Check',de:'Prüfen',fr:'Vérifier',it:'Controlla',es:'Comprobar',pt:'Conferir',nl:'Nakijken',sv:'Kolla',da:'Tjek',no:'Sjekk',fi:'Tarkista'},
    nextBtn:      {en:'Next',de:'Weiter',fr:'Suivant',it:'Avanti',es:'Siguiente',pt:'Próximo',nl:'Volgende',sv:'Nästa',da:'Næste',no:'Neste',fi:'Seuraava'},
    showNice:     {en:'Yes! That is {n} — {word}!',de:'Ja! Das ist {n} — {word}!',fr:'Oui ! C’est {n} — {word} !',it:'Sì! È {n} — {word}!',es:'¡Sí! Es {n} — ¡{word}!',pt:'Isso! É {n} — {word}!',nl:'Ja! Dat is {n} — {word}!',sv:'Ja! Det är {n} — {word}!',da:'Ja! Det er {n} — {word}!',no:'Ja! Det er {n} — {word}!',fi:'Juuri niin! Se on {n} — {word}!'},
    showMiss:     {en:'You built {n} — {word}. Look at the word and try again!',de:'Du hast {n} gebaut — {word}. Schau aufs Zahlwort und probier’s noch einmal!',fr:'Tu as construit {n} — {word}. Regarde le mot et réessaie !',it:'Hai costruito {n} — {word}. Guarda la parola e riprova!',es:'Construiste {n} — {word}. ¡Fíjate en la palabra e inténtalo otra vez!',pt:'Você montou {n} — {word}. Olhe a palavra e tente de novo!',nl:'Je hebt {n} gebouwd — {word}. Kijk goed naar het woord en probeer het nog eens!',sv:'Du byggde {n} — {word}. Titta på ordet och försök igen!',da:'Du byggede {n} — {word}. Kig på ordet, og prøv en gang til!',no:'Du bygde {n} — {word}. Se på ordet og prøv igjen!',fi:'Rakensit luvun {n} — {word}. Katso sanaa ja yritä uudelleen!'},
    subPrompt:    {en:'Take away {b} from {a}',de:'Nimm {b} von {a} weg',fr:'Enlève {b} à {a}',it:'Togli {b} da {a}',es:'Quita {b} de {a}',pt:'Tire {b} de {a}',nl:'Haal {b} van {a} af',sv:'Ta bort {b} från {a}',da:'Tag {b} fra {a}',no:'Ta bort {b} fra {a}',fi:'Vähennä {b} luvusta {a}'},
    subNudge:     {en:'Not enough loose ones — break a ten!',de:'Nicht genug lose Einer — tausche einen Zehner!',fr:'Pas assez d’unités — casse une dizaine !',it:'Non bastano le unità — cambia una decina!',es:'No alcanzan las unidades sueltas — ¡desarma una decena!',pt:'Faltam unidades soltas — troque uma dezena!',nl:'Niet genoeg losse blokjes — wissel een tiental in!',sv:'De lösa entalen räcker inte — växla ett tiotal!',da:'Ikke nok løse enere — veksl en tier!',no:'Ikke nok løse enere — veksle en tier!',fi:'Ykköset eivät riitä — vaihda kymppi!'},
    subDone:      {en:'{a} − {b} = {c}. You broke a ten to do it!',de:'{a} − {b} = {c}. Dafür hast du einen Zehner getauscht!',fr:'{a} − {b} = {c}. Tu as cassé une dizaine pour y arriver !',it:'{a} − {b} = {c}. Hai cambiato una decina per riuscirci!',es:'{a} − {b} = {c}. ¡Desarmaste una decena para lograrlo!',pt:'{a} − {b} = {c}. Você trocou uma dezena para conseguir!',nl:'{a} − {b} = {c}. Daarvoor heb je een tiental ingewisseld!',sv:'{a} − {b} = {c}. Du växlade ett tiotal för att klara det!',da:'{a} − {b} = {c}. Du vekslede en tier for at klare det!',no:'{a} − {b} = {c}. Du vekslet en tier for å klare det!',fi:'{a} − {b} = {c}. Vaihdoit kympin ykkösiksi!'},
    subRemove:    {en:'Tap the marked blocks to take them away.',de:'Tippe die markierten Blöcke an, um sie wegzunehmen.',fr:'Appuie sur les blocs marqués pour les enlever.',it:'Tocca i blocchi segnati per toglierli.',es:'Toca los bloques marcados para quitarlos.',pt:'Toque nos blocos marcados para tirá-los.',nl:'Tik op de gemarkeerde blokjes om ze weg te halen.',sv:'Tryck på de markerade blocken för att ta bort dem.',da:'Tryk på de markerede klodser for at fjerne dem.',no:'Trykk på de markerte klossene for å fjerne dem.',fi:'Napauta merkittyjä palikoita poistaaksesi ne.'},
    keypadBtn:    {en:'Type a number',de:'Zahl eintippen',fr:'Taper un nombre',it:'Scrivi un numero',es:'Escribir un número',pt:'Digitar um número',nl:'Getal typen',sv:'Skriv ett tal',da:'Skriv et tal',no:'Skriv et tall',fi:'Kirjoita luku'},
    keypadDone:   {en:'Build it',de:'Bauen',fr:'Construire',it:'Costruisci',es:'Construir',pt:'Montar',nl:'Bouwen',sv:'Bygg',da:'Byg',no:'Bygg',fi:'Rakenna'},
    keypadClear:  {en:'Clear',de:'Löschen',fr:'Effacer',it:'Cancella',es:'Borrar',pt:'Apagar',nl:'Wissen',sv:'Rensa',da:'Ryd',no:'Tøm',fi:'Tyhjennä'},
    ourMats:      {en:'Our numbers',de:'Unsere Zahlen',fr:'Nos nombres',it:'I nostri numeri',es:'Nuestros números',pt:'Nossos números',nl:'Onze getallen',sv:'Våra tal',da:'Vores tal',no:'Tallene våre',fi:'Meidän luvut'},
    saveMat:      {en:'Save this number',de:'Diese Zahl speichern',fr:'Enregistrer ce nombre',it:'Salva questo numero',es:'Guardar este número',pt:'Salvar este número',nl:'Dit getal bewaren',sv:'Spara det här talet',da:'Gem dette tal',no:'Lagre dette tallet',fi:'Tallenna tämä luku'},
    matLabelPh:   {en:'What is this number? (e.g. days of school)',de:'Wofür steht die Zahl? (z. B. Schultage)',fr:'C’est le nombre de quoi ? (ex. jours d’école)',it:'Di che cos’è questo numero? (es. giorni di scuola)',es:'¿De qué es este número? (ej. días de clase)',pt:'Este número é de quê? (ex.: dias de aula)',nl:'Waar staat dit getal voor? (bv. schooldagen)',sv:'Vad står talet för? (t.ex. skoldagar)',da:'Hvad står tallet for? (fx skoledage)',no:'Hva forteller dette tallet? (f.eks. skoledager)',fi:'Mitä tämä luku kertoo? (esim. koulupäivät)'},
    matFull:      {en:'The list is full — remove one first.',de:'Die Liste ist voll — lösche zuerst eine Zahl.',fr:'La liste est pleine — retire d’abord un nombre.',it:'La lista è piena — togli prima un numero.',es:'La lista está llena — quita uno primero.',pt:'A lista está cheia — tire um primeiro.',nl:'De lijst is vol — haal er eerst een weg.',sv:'Listan är full — ta bort ett först.',da:'Listen er fuld — fjern et først.',no:'Listen er full — fjern ett først.',fi:'Lista on täynnä — poista ensin yksi.'},
    deleteBtn:    {en:'Delete',de:'Löschen',fr:'Supprimer',it:'Elimina',es:'Eliminar',pt:'Excluir',nl:'Verwijderen',sv:'Ta bort',da:'Slet',no:'Slett',fi:'Poista'},
    confirmBtn:   {en:'Really delete?',de:'Wirklich löschen?',fr:'Vraiment supprimer ?',it:'Eliminare davvero?',es:'¿Eliminar de verdad?',pt:'Excluir mesmo?',nl:'Echt verwijderen?',sv:'Ta bort på riktigt?',da:'Vil du slette?',no:'Helt sikker?',fi:'Poistetaanko varmasti?'},
    speakWordAria:{en:'Say the number',de:'Zahl ansagen',fr:'Dire le nombre',it:'Di’ il numero',es:'Decir el número',pt:'Falar o número',nl:'Zeg het getal',sv:'Säg talet',da:'Sig tallet',no:'Si tallet',fi:'Sano luku'},
    speakDecompAria:{en:'Say it as tens and ones',de:'Als Zehner und Einer ansagen',fr:'Dire en dizaines et unités',it:'Dillo in decine e unità',es:'Decirlo en decenas y unidades',pt:'Falar em dezenas e unidades',nl:'Zeg het in tientallen en eenheden',sv:'Säg det i tiotal och ental',da:'Sig det i tiere og enere',no:'Si det i tiere og enere',fi:'Sano luku kymmeninä ja ykkösinä'},
    tapDigitAria: {en:'Which part of the word says this digit?',de:'Welcher Teil des Wortes sagt diese Ziffer?',fr:'Quelle partie du mot dit ce chiffre ?',it:'Quale parte della parola dice questa cifra?',es:'¿Qué parte de la palabra dice esta cifra?',pt:'Que parte da palavra fala este algarismo?',nl:'Welk deel van het woord zegt dit cijfer?',sv:'Vilken del av ordet säger den här siffran?',da:'Hvilken del af ordet siger dette ciffer?',no:'Hvilken del av ordet sier dette sifferet?',fi:'Mikä osa sanasta sanoo tämän numeron?'},
    mixedNote:    {en:'A special number word!',de:'Ein besonderes Zahlwort!',fr:'Un nombre un peu spécial !',it:'Una parola speciale!',es:'¡Una palabra especial!',pt:'Uma palavra especial!',nl:'Een bijzonder telwoord!',sv:'Ett speciellt räkneord!',da:'Et særligt talord!',no:'Et spesielt tallord!',fi:'Erityinen lukusana!'},
    noTensChip:   {en:'no tens',de:'keine Zehner',fr:'pas de dizaine',it:'zero decine',es:'sin decenas',pt:'sem dezenas',nl:'geen tientallen',sv:'inga tiotal',da:'ingen tiere',no:'ingen tiere',fi:'ei kymmeniä'},
    gateHundreds: {en:'Hundreds live in the full Lab. Unlock every place!',de:'Die Hunderter wohnen im ganzen Labor. Schalte alle Stellen frei!',fr:'Les centaines vivent dans le grand labo. Débloque toutes les colonnes !',it:'Le centinaia vivono nel laboratorio completo. Sblocca tutte le posizioni!',es:'Las centenas viven en el laboratorio completo. ¡Desbloquea todas las posiciones!',pt:'As centenas moram no laboratório completo. Desbloqueie todas as ordens!',nl:'De honderdtallen wonen in het volledige lab. Ontgrendel alle plaatsen!',sv:'Hundratalen bor i hela labbet. Lås upp alla talsorter!',da:'Hundrederne bor i det fulde værksted. Lås alle pladser op!',no:'Hundrerne bor i hele verkstedet. Lås opp alle plassene!',fi:'Sadat asuvat koko pajassa. Avaa kaikki paikat!'},
    gateSub:      {en:'The Subtract lab — where borrowing becomes real — is part of the full toolkit.',de:'Das Abzieh-Labor — wo der Zehnerübergang begreifbar wird — gehört zum vollen Werkzeugkasten.',fr:'Le labo de soustraction — où l’emprunt devient réel — fait partie de la boîte complète.',it:'Il laboratorio delle sottrazioni — dove il cambio si vede davvero — fa parte del kit completo.',es:'El laboratorio de restas — donde pedir prestado se vuelve real — es parte del kit completo.',pt:'O laboratório de subtração — onde o “pedir emprestado” vira algo concreto — faz parte do kit completo.',nl:'Het aftreklab — waar inwisselen echt wordt — hoort bij de volledige gereedschapskist.',sv:'Subtraktionslabbet — där växling blir på riktigt — ingår i hela verktygslådan.',da:'Minus-værkstedet — hvor veksling bliver håndgribelig — er en del af den fulde værktøjskasse.',no:'Minus-verkstedet — der veksling blir ekte — er en del av den fulle verktøykassen.',fi:'Vähennyspaja — jossa vaihtaminen tulee todeksi — kuuluu koko työkalupakkiin.'},
    gateSaves:    {en:'Saving your class’s own numbers is a full-toolkit treat.',de:'Die eigenen Zahlen deiner Klasse zu speichern gehört zum vollen Werkzeugkasten.',fr:'Enregistrer les nombres de ta classe fait partie de la boîte complète.',it:'Salvare i numeri della tua classe fa parte del kit completo.',es:'Guardar los números de tu clase es parte del kit completo.',pt:'Salvar os números da sua turma faz parte do kit completo.',nl:'De eigen getallen van je klas bewaren hoort bij de volledige kist.',sv:'Att spara klassens egna tal ingår i hela verktygslådan.',da:'At gemme klassens egne tal er en del af den fulde kasse.',no:'Å lagre klassens egne tall er en del av den fulle kassen.',fi:'Oman luokan lukujen tallentaminen kuuluu koko työkalupakkiin.'},
    unlock:       {en:'Unlock the full toolkit',de:'Ganzen Werkzeugkasten freischalten',fr:'Débloquer la boîte complète',it:'Sblocca il kit completo',es:'Desbloquear el kit completo',pt:'Desbloquear o kit completo',nl:'Volledige kist ontgrendelen',sv:'Lås upp hela verktygslådan',da:'Lås hele kassen op',no:'Lås opp hele verktøykassen',fi:'Avaa koko työkalupakki'},
    setBundle:    {en:'Making a ten',de:'Zehner bündeln',fr:'Faire la dizaine',it:'Fare la decina',es:'Armar la decena',pt:'Fazer a dezena',nl:'Tiental maken',sv:'Göra tiotal',da:'At lave en tier',no:'Å lage en tier',fi:'Kympin tekeminen'},
    setBundleInvited:{en:'The child taps to bundle',de:'Das Kind tippt zum Bündeln',fr:'L’enfant appuie pour grouper',it:'Il bambino tocca per raggruppare',es:'El niño toca para agrupar',pt:'A criança toca para agrupar',nl:'Het kind tikt om te bundelen',sv:'Barnet trycker för att bunta',da:'Barnet trykker for at bundte',no:'Barnet trykker for å bunte',fi:'Lapsi niputtaa napauttamalla'},
    setBundleAuto:{en:'Bundles by itself at ten',de:'Bündelt von selbst bei zehn',fr:'Se groupe tout seul à dix',it:'Si raggruppa da solo a dieci',es:'Se agrupa solo al llegar a diez',pt:'Agrupa sozinho ao chegar em dez',nl:'Bundelt vanzelf bij tien',sv:'Buntas ihop av sig själv vid tio',da:'Bundter sig selv ved ti',no:'Bunter seg selv ved ti',fi:'Niputtuu itsestään kymmenen kohdalla'},
    setHighlight: {en:'Color the word parts',de:'Wortteile einfärben',fr:'Colorer les parties du mot',it:'Colora le parti della parola',es:'Colorear las partes de la palabra',pt:'Colorir as partes da palavra',nl:'Woorddelen kleuren',sv:'Färga ordets delar',da:'Farv ordets dele',no:'Fargelegg orddelene',fi:'Väritä sanan osat'},
    setHundreds:  {en:'Hundreds place',de:'Hunderterstelle',fr:'Colonne des centaines',it:'Posizione delle centinaia',es:'Posición de las centenas',pt:'Ordem das centenas',nl:'Plaats van de honderdtallen',sv:'Hundratalens plats',da:'Hundredeplads',no:'Hundrerplass',fi:'Satojen paikka'},
    setSpeak:     {en:'Say the number after changes',de:'Zahl nach Änderungen ansagen',fr:'Dire le nombre après un changement',it:'Di’ il numero dopo ogni modifica',es:'Decir el número tras los cambios',pt:'Falar o número após mudanças',nl:'Zeg het getal na elke verandering',sv:'Säg talet efter ändringar',da:'Sig tallet efter ændringer',no:'Si tallet etter endringer',fi:'Sano luku muutosten jälkeen'}
  },

  /* ---------------- the span-tagged word composer (THE MOAT) --------
     PV_WORD_SPANS[loc](n) → [{t:text, p:part}], parts:
     hundreds|tens|ones|joiner|teen|mixed. Gate-verified: the span
     texts concatenate BYTE-EQUAL to NUM_WORDS_HELPERS[loc](n,'cardinal')
     for 0-999 (scripts/verify-place-value-lab.js). One line per locale;
     the /*__SP_xx__* / markers let the fan-out whole-line replace.
     MIXED_RANGES: locales where a clean tens/ones split does not exist
     in the surface form (fr vigesimal 70-99 only) — gate-asserted. */
  MIXED_RANGES: { fr: [70, 99] },

  PV_WORD_SPANS: {
    /*__SP_en__*/ en: function (n) { var L=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'],T=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];function s99(m){if(m<10)return[{t:L[m],p:'ones'}];if(m<20)return[{t:L[m],p:'teen'}];var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens'}];return[{t:T[t],p:'tens'},{t:'-',p:'joiner'},{t:L[o],p:'ones'}];}if(n<100)return s99(n);var h=Math.floor(n/100),r=n%100,out=[{t:L[h]+' hundred',p:'hundreds'}];if(r===0)return out;return out.concat([{t:' ',p:'joiner'}],s99(r)); },
    /*__SP_de__*/ de: function (n) { var C=['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun'],A=['null','ein','zwei','drei','vier','fünf','sechs','sieben','acht','neun'],E=['zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn'],T=['','','zwanzig','dreißig','vierzig','fünfzig','sechzig','siebzig','achtzig','neunzig'];if(n<100){if(n<10)return[{t:C[n],p:'ones'}];if(n<20)return[{t:E[n-10],p:'teen'}];var t=Math.floor(n/10),o=n%10;if(o===0)return[{t:T[t],p:'tens'}];return[{t:A[o],p:'ones'},{t:'und',p:'joiner'},{t:T[t],p:'tens'}];}var h=Math.floor(n/100),r=n%100,out=[{t:A[h]+'hundert',p:'hundreds'}];if(r===0)return out;if(r<10)return out.concat([{t:C[r],p:'ones'}]);if(r<20)return out.concat([{t:E[r-10],p:'teen'}]);var t2=Math.floor(r/10),o2=r%10;if(o2===0)return out.concat([{t:T[t2],p:'tens'}]);return out.concat([{t:A[o2],p:'ones'},{t:'und',p:'joiner'},{t:T[t2],p:'tens'}]); },
    /*__SP_es__*/ es: function (n) { var L=['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'],T=['','','veinte','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];function s99(m){if(m<10)return[{t:L[m],p:'ones'}];if(m<20)return[{t:L[m],p:'teen'}];if(m===20)return[{t:'veinte',p:'tens'}];if(m<30)return[{t:'veinti',p:'tens'},{t:L[m].slice(6),p:'ones'}];var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens'}];return[{t:T[t],p:'tens'},{t:' y ',p:'joiner'},{t:L[o],p:'ones'}];}if(n<100)return s99(n);if(n===100)return[{t:'cien',p:'hundreds'}];var H=['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'],h=Math.floor(n/100),r=n%100,out=[{t:H[h],p:'hundreds'}];if(r===0)return out;return out.concat([{t:' ',p:'joiner'}],s99(r)); },
    /*__SP_it__*/ it: function (n) { var L=['zero','uno','due','tre','quattro','cinque','sei','sette','otto','nove','dieci','undici','dodici','tredici','quattordici','quindici','sedici','diciassette','diciotto','diciannove'],T=['','','venti','trenta','quaranta','cinquanta','sessanta','settanta','ottanta','novanta'],O=['','uno','due','tré','quattro','cinque','sei','sette','otto','nove'];function s99(m){if(m<10)return[{t:L[m],p:'ones'}];if(m<20)return[{t:L[m],p:'teen'}];var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens'}];var ts=T[t];if(o===1||o===8)ts=ts.slice(0,-1);return[{t:ts,p:'tens'},{t:O[o],p:'ones'}];}if(n<100)return s99(n);var M=['','','due','tre','quattro','cinque','sei','sette','otto','nove'],h=Math.floor(n/100),r=n%100,hw=(h===1)?'cento':M[h]+'cento';if(r===0)return[{t:hw,p:'hundreds'}];var tail=s99(r),f=tail[0].t.charAt(0);if(f==='o'||f==='u')hw=hw.slice(0,-1);return[{t:hw,p:'hundreds'}].concat(tail); },
    /*__SP_fr__*/ fr: function (n) { var L=['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix','onze','douze','treize','quatorze','quinze','seize','dix-sept','dix-huit','dix-neuf'],T=['','','vingt','trente','quarante','cinquante','soixante'];function w99(m){if(m<20)return L[m];var t=Math.floor(m/10),o=m%10;if(t>=2&&t<=6){if(o===0)return T[t];if(o===1)return T[t]+' et un';return T[t]+'-'+L[o];}if(t===7){if(o===0)return 'soixante-dix';if(o===1)return 'soixante et onze';return 'soixante-'+L[10+o];}if(t===8){if(o===0)return 'quatre-vingts';return 'quatre-vingt-'+L[o];}if(o===0)return 'quatre-vingt-dix';return 'quatre-vingt-'+L[10+o];}function s99(m){if(m<10)return[{t:L[m],p:'ones'}];if(m<20)return[{t:L[m],p:'teen'}];if(m>=70)return[{t:w99(m),p:'mixed'}];var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens'}];if(o===1)return[{t:T[t],p:'tens'},{t:' et ',p:'joiner'},{t:'un',p:'ones'}];return[{t:T[t],p:'tens'},{t:'-',p:'joiner'},{t:L[o],p:'ones'}];}if(n<100)return s99(n);var M=['','','deux','trois','quatre','cinq','six','sept','huit','neuf'],h=Math.floor(n/100),r=n%100,hw;if(h===1)hw='cent';else hw=M[h]+' cent'+(r===0?'s':'');var out=[{t:hw,p:'hundreds'}];if(r===0)return out;return out.concat([{t:' ',p:'joiner'}],s99(r)); },
    /*__SP_pt__*/ pt: function (n) { var L=['zero','um','dois','três','quatro','cinco','seis','sete','oito','nove','dez','onze','doze','treze','quatorze','quinze','dezesseis','dezessete','dezoito','dezenove'],T=['','','vinte','trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa'];function s99(m){if(m<10)return[{t:L[m],p:'ones'}];if(m<20)return[{t:L[m],p:'teen'}];var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens'}];return[{t:T[t],p:'tens'},{t:' e ',p:'joiner'},{t:L[o],p:'ones'}];}if(n<100)return s99(n);if(n===100)return[{t:'cem',p:'hundreds'}];var H=['','cento','duzentos','trezentos','quatrocentos','quinhentos','seiscentos','setecentos','oitocentos','novecentos'],h=Math.floor(n/100),r=n%100,out=[{t:H[h],p:'hundreds'}];if(r===0)return out;return out.concat([{t:' e ',p:'joiner'}],s99(r)); },
    /*__SP_nl__*/ nl: function (n) { var L=['nul','een','twee','drie','vier','vijf','zes','zeven','acht','negen','tien','elf','twaalf','dertien','veertien','vijftien','zestien','zeventien','achttien','negentien'],T=['','','twintig','dertig','veertig','vijftig','zestig','zeventig','tachtig','negentig'],O=['','een','twee','drie','vier','vijf','zes','zeven','acht','negen'];function s99(m){if(m<10)return[{t:L[m],p:'ones'}];if(m<20)return[{t:L[m],p:'teen'}];var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens'}];var j=(o===2||o===3)?'ën':'en';return[{t:O[o],p:'ones'},{t:j,p:'joiner'},{t:T[t],p:'tens'}];}if(n<100)return s99(n);var h=Math.floor(n/100),r=n%100,hw=(h===1)?'honderd':O[h]+'honderd',out=[{t:hw,p:'hundreds'}];if(r===0)return out;return out.concat(s99(r)); },
    /*__SP_sv__*/ sv: function (n) { var L=['noll','ett','två','tre','fyra','fem','sex','sju','åtta','nio','tio','elva','tolv','tretton','fjorton','femton','sexton','sjutton','arton','nitton'],T=['','','tjugo','trettio','fyrtio','femtio','sextio','sjuttio','åttio','nittio'],O=['','ett','två','tre','fyra','fem','sex','sju','åtta','nio'];function s99(m){if(m<10)return[{t:L[m],p:'ones'}];if(m<20)return[{t:L[m],p:'teen'}];var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens'}];return[{t:T[t],p:'tens'},{t:L[o],p:'ones'}];}if(n<100)return s99(n);var h=Math.floor(n/100),r=n%100,hw=(h===1)?'hundra':O[h]+'hundra',out=[{t:hw,p:'hundreds'}];if(r===0)return out;return out.concat(s99(r)); },
    /*__SP_da__*/ da: function (n) { var L=['nul','en','to','tre','fire','fem','seks','syv','otte','ni','ti','elleve','tolv','tretten','fjorten','femten','seksten','sytten','atten','nitten'],T=['','','tyve','tredive','fyrre','halvtreds','tres','halvfjerds','firs','halvfems'],O=['','en','to','tre','fire','fem','seks','syv','otte','ni'];function s99(m){if(m<10)return[{t:L[m],p:'ones'}];if(m<20)return[{t:L[m],p:'teen'}];var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens'}];return[{t:L[o],p:'ones'},{t:'og',p:'joiner'},{t:T[t],p:'tens'}];}if(n<100)return s99(n);var h=Math.floor(n/100),r=n%100,hw=(h===1)?'hundrede':O[h]+'hundrede',out=[{t:hw,p:'hundreds'}];if(r===0)return out;return out.concat([{t:' og ',p:'joiner'}],s99(r)); },
    /*__SP_no__*/ no: function (n) { var L=['null','én','to','tre','fire','fem','seks','sju','åtte','ni','ti','elleve','tolv','tretten','fjorten','femten','seksten','sytten','atten','nitten'],T=['','','tjue','tretti','førti','femti','seksti','sytti','åtti','nitti'],O=['','én','to','tre','fire','fem','seks','sju','åtte','ni'];function s99(m){if(m<10)return[{t:L[m],p:'ones'}];if(m<20)return[{t:L[m],p:'teen'}];var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens'}];return[{t:T[t],p:'tens'},{t:L[o],p:'ones'}];}if(n<100)return s99(n);var h=Math.floor(n/100),r=n%100,hw=(h===1)?'hundre':O[h]+'hundre',out=[{t:hw,p:'hundreds'}];if(r===0)return out;return out.concat([{t:'og',p:'joiner'}],s99(r)); },
    /*__SP_fi__*/ fi: function (n) { var L=['nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän','kymmenen','yksitoista','kaksitoista','kolmetoista','neljätoista','viisitoista','kuusitoista','seitsemäntoista','kahdeksantoista','yhdeksäntoista'],T=['','','kaksikymmentä','kolmekymmentä','neljäkymmentä','viisikymmentä','kuusikymmentä','seitsemänkymmentä','kahdeksankymmentä','yhdeksänkymmentä'],O=['','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän'];function s99(m){if(m<10)return[{t:L[m],p:'ones'}];if(m<20)return[{t:L[m],p:'teen'}];var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens'}];return[{t:T[t],p:'tens'},{t:L[o],p:'ones'}];}if(n<100)return s99(n);var h=Math.floor(n/100),r=n%100,hw=(h===1)?'sata':O[h]+'sataa',out=[{t:hw,p:'hundreds'}];if(r===0)return out;return out.concat(s99(r)); }
  },

    /* ==== BYTE-FAITHFUL SPLICE from place-value-core.js _NUMBER_WORD_HELPERS (0-999 x11) ==== */
  NUM_WORDS_HELPERS: {
    en: function (n, mode) {
      /* 0-19 lookup; 20-99 = tens-word + "-" + ones-word (or tens-word
         alone when ones===0). 100-999 = ones-word + "hundred" + " " +
         sub99(remainder) — US Common Core convention with NO "and"
         between hundreds and tens (305 = "three hundred five", NOT
         "three hundred and five"). Round hundreds: 200 = "two hundred".
         Zero-tens: 305 = "three hundred five". Zero-ones: 420 = "four
         hundred twenty". mode is ignored (cardinal===attributive). */
      var ones = ['zero','one','two','three','four','five','six','seven','eight','nine',
                  'ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
      var tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
      function sub99(m) {
        if (m < 20) return ones[m];
        var t = Math.floor(m / 10), o = m % 10;
        return (o === 0) ? tens[t] : (tens[t] + '-' + ones[o]);
      }
      if (n < 100) return sub99(n);
      var h = Math.floor(n / 100), rem = n % 100;
      var hPart = ones[h] + ' hundred';
      if (rem === 0) return hPart;
      return hPart + ' ' + sub99(rem);
    },
    de: function (n, mode) {
      /* German 0-999. 0-99 units-first compound (einundzwanzig = 1 +
         und + 20) — BYTE-IDENTICAL to prior shipped (load-bearing for
         the LIVE 1.NBT.B.2 DE tens-and-ones activity at /de/activities/
         zehner-und-einer; the existing logic is preserved verbatim
         under `if (n < 100)` guard).

         100-999 NEW layer (2.NBT.A.1 activity 2 DE fan-out):
         <ones-attributive>hundert + agglutinated 0-99 tail as a single
         word (zweihundertsiebenundvierzig). Classroom convention:
         100 = "einhundert" (NOT colloquial bare "hundert"); 101 =
         "einhunderteins" (cardinal `eins` at ones-only tail position,
         not attributive `ein`); 305 = "dreihundertfünf" (zero-tens
         skipped, no `null` inserted); 420 = "vierhundertzwanzig"
         (zero-ones, ends on tens-word). */
      var onesCard = ['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun'];
      var onesAttr = ['null','ein', 'zwei','drei','vier','fünf','sechs','sieben','acht','neun'];
      var teens    = ['zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn'];
      var tens     = ['','','zwanzig','dreißig','vierzig','fünfzig','sechzig','siebzig','achtzig','neunzig'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive') ? onesAttr[n] : onesCard[n];
        if (n < 20) return teens[n - 10];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return onesAttr[o] + 'und' + tens[t];  // e.g. einundzwanzig
      }
      /* 100-999 layer */
      var h = Math.floor(n / 100), rem = n % 100;
      var hPart = onesAttr[h] + 'hundert';     // ein/zwei/.../neun + hundert
      if (rem === 0) return hPart;             // 200 → zweihundert
      if (rem < 10) return hPart + onesCard[rem];     // 305 → dreihundertfünf, 101 → einhunderteins
      if (rem < 20) return hPart + teens[rem - 10];   // 215 → zweihundertfünfzehn
      var t2 = Math.floor(rem / 10), o2 = rem % 10;
      if (o2 === 0) return hPart + tens[t2];          // 420 → vierhundertzwanzig
      return hPart + onesAttr[o2] + 'und' + tens[t2]; // 247 → zweihundertsiebenundvierzig
    },
    es: function (n, mode) {
      /* Spanish 0-999. 0-99 BYTE-IDENTICAL to prior shipped (load-bearing
         for the LIVE 1.NBT.B.2 ES tens-and-ones activity at /es/activities/
         decenas-y-unidades; existing logic preserved verbatim under
         `if (n < 100)` guard).

         100-999 NEW layer for 2.NBT.A.1 activity 2 ES fan-out:
         - n=100 → "cien" (standalone form; NOT "ciento")
         - n=101-199 → "ciento " + sub99(rem) (space-separated)
         - n=200-999 → hundreds[h] + (rem ? " " + sub99(rem) : "")
         - hundreds[2..9]: doscientos, trescientos, cuatrocientos,
           QUINIENTOS (irregular 500, NOT cincocientos), seiscientos,
           SETECIENTOS (irregular 700, NOT sietecientos), ochocientos,
           NOVECIENTOS (irregular 900, NOT nuevecientos)
         - "y" appears ONLY inside sub99 between tens and units
           (existing rule). NEVER between hundreds and tens:
           305 = "trescientos cinco", NOT "trescientos y cinco". */
      var lookup = [
        'cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve',
        'diez','once','doce','trece','catorce','quince',
        'dieciséis','diecisiete','dieciocho','diecinueve',
        'veinte','veintiuno','veintidós','veintitrés','veinticuatro',
        'veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'
      ];
      var attrFem = ['cero','una','dos','tres','cuatro','cinco','seis','siete','ocho','nueve'];
      var tens = ['','','veinte','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive-fem') ? attrFem[n] : lookup[n];
        if (n < 30) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return tens[t] + ' y ' + lookup[o];  // e.g. cuarenta y siete
      }
      /* 100-999 layer */
      if (n === 100) return 'cien';
      var hundredsBare = ['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'];
      var h = Math.floor(n / 100), rem = n % 100;
      var hPart = hundredsBare[h];
      if (rem === 0) return hPart;
      /* sub99 inline — cardinal-form tail; "y" between tens and units */
      function sub99(m) {
        if (m < 30) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        return tens[t2] + ' y ' + lookup[o2];
      }
      return hPart + ' ' + sub99(rem);
    },
    it: function (n, mode) {
      /* Italian 0-999. 0-99 BYTE-IDENTICAL to prior shipped (load-bearing
         for the LIVE 1.NBT.B.2 IT activity at /it/activities/decine-e-unita;
         existing logic — ventuno/ventotto vowel-elision + tré grave-accent
         in compound — preserved verbatim under `if (n < 100)` guard).

         100-999 NEW layer for 2.NBT.A.1 activity 2 IT fan-out:
         - n=100 → "cento" (standalone)
         - n=200-900 round → multiplier + "cento": duecento, trecento,
           ..., novecento. cento INVARIANT (NEVER "duecenti").
         - n=101-999 compound → hundreds-word + sub99(rem) AGGLUTINATED
           with VOWEL ELISION at cento boundary when sub99 starts with
           'o' or 'u':
             cento + uno → centuno
             cento + otto → centotto
             cento + ottanta → centottanta
             cinquecento + ottantatré → cinquecentottantatré
           No elision when sub99 starts with consonant or other vowel:
             cento + due → centodue
             cento + venti → centoventi (no cento elision; internal
             ventuno/ventotto elision preserved in sub99). */
      var lookup = [
        'zero','uno','due','tre','quattro','cinque','sei','sette','otto','nove',
        'dieci','undici','dodici','tredici','quattordici','quindici',
        'sedici','diciassette','diciotto','diciannove'
      ];
      var attrFem = ['zero','una','due','tre','quattro','cinque','sei','sette','otto','nove'];
      var tens = ['','','venti','trenta','quaranta','cinquanta','sessanta','settanta','ottanta','novanta'];
      /* Compound-position ones forms: same as standalone except 3 → 'tré'. */
      var onesForCompound = ['','uno','due','tré','quattro','cinque','sei','sette','otto','nove'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive-fem') ? attrFem[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        var tensStr = tens[t];
        if (o === 1 || o === 8) tensStr = tensStr.slice(0, -1);  // elision: ventuno, ventotto
        return tensStr + onesForCompound[o];
      }
      /* 100-999 layer */
      var hundredsMul = ['','','due','tre','quattro','cinque','sei','sette','otto','nove'];
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord = (h === 1) ? 'cento' : hundredsMul[h] + 'cento';
      if (rem === 0) return hWord;
      /* sub99 inline — cardinal-form tail with internal ventuno/ventotto
         elision + tré grave-accent preserved. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        var tensStr2 = tens[t2];
        if (o2 === 1 || o2 === 8) tensStr2 = tensStr2.slice(0, -1);
        return tensStr2 + onesForCompound[o2];
      }
      var tail = sub99(rem);
      /* Cento elision: drop final 'o' of hundreds-word when tail starts
         with 'o' or 'u' (cento+uno → centuno; cento+ottanta → centottanta;
         cinquecento+ottantatré → cinquecentottantatré). */
      var first = tail.charAt(0);
      if (first === 'o' || first === 'u') {
        hWord = hWord.slice(0, -1);
      }
      return hWord + tail;
    },
    fr: function (n, mode) {
      /* French 0-999. 0-99 BYTE-IDENTICAL to prior shipped (load-bearing
         for the LIVE 1.NBT.B.2 FR activity at /fr/activities/dizaines-
         et-unites; existing vigesimal 70s/80s/90s + "et un" at 21/31/…/
         71 + soixante-et-onze + quatre-vingts -s at exactly 80 logic
         preserved verbatim under `if (n < 100)` guard).

         100-999 NEW layer for 2.NBT.A.1 activity 2 FR fan-out — the
         TWO -s rules colliding:
         - n=100 → "cent" (bare, no multiplier, no -s)
         - n=200-900 round → multiplier + "cents" WITH -s (multiplied
           AND final): "deux cents", "cinq cents", "neuf cents"
         - n=201-999 non-final → multiplier + "cent" DROPS -s
           (multiplied but non-final): "deux cent quarante-sept",
           "trois cent cinq", "trois cent quatre-vingts" (cent drops;
           quatre-vingts keeps via sub99's own rule), "trois cent
           quatre-vingt-deux" (both drop)
         - "et" join preserved inside sub99 only (cent vingt et un = 121,
           deux cent soixante et onze = 271; NO "et" at 81/91 even in
           hundreds frame: quatre-vingt-un, quatre-vingt-onze) */
      var lookup = [
        'zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf',
        'dix','onze','douze','treize','quatorze','quinze','seize',
        'dix-sept','dix-huit','dix-neuf'
      ];
      var attrFem = ['zéro','une','deux','trois','quatre','cinq','six','sept','huit','neuf'];
      var tens20to60 = ['','','vingt','trente','quarante','cinquante','soixante'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive-fem') ? attrFem[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (t >= 2 && t <= 6) {
          /* 20-69 */
          if (o === 0) return tens20to60[t];
          if (o === 1) return tens20to60[t] + ' et un';
          return tens20to60[t] + '-' + lookup[o];
        }
        if (t === 7) {
          /* 70-79 = soixante + (10..19); "soixante et onze" at 71 */
          if (o === 0) return 'soixante-dix';
          if (o === 1) return 'soixante et onze';
          return 'soixante-' + lookup[10 + o];
        }
        if (t === 8) {
          /* 80 = "quatre-vingts" with -s; 81-89 = "quatre-vingt-" + ones (no -s, no "et") */
          if (o === 0) return 'quatre-vingts';
          return 'quatre-vingt-' + lookup[o];
        }
        /* t === 9: 90-99 = "quatre-vingt-" + (10..19), NO "et" */
        if (o === 0) return 'quatre-vingt-dix';
        return 'quatre-vingt-' + lookup[10 + o];
      }
      /* 100-999 layer */
      /* Inline sub99 for the tail — cardinal mode only. Replicates the
         0-99 logic above (no attributive-fem needed in compound
         position; gender-invariant cardinal). The vigesimal -s rule at
         exactly 80 emerges naturally: sub99(80)="quatre-vingts" with
         -s; sub99(82)="quatre-vingt-deux" without. This drives 380
         vs 382 distinction inside the hundreds frame. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (t2 >= 2 && t2 <= 6) {
          if (o2 === 0) return tens20to60[t2];
          if (o2 === 1) return tens20to60[t2] + ' et un';
          return tens20to60[t2] + '-' + lookup[o2];
        }
        if (t2 === 7) {
          if (o2 === 0) return 'soixante-dix';
          if (o2 === 1) return 'soixante et onze';
          return 'soixante-' + lookup[10 + o2];
        }
        if (t2 === 8) {
          if (o2 === 0) return 'quatre-vingts';
          return 'quatre-vingt-' + lookup[o2];
        }
        if (o2 === 0) return 'quatre-vingt-dix';
        return 'quatre-vingt-' + lookup[10 + o2];
      }
      var hMul = ['','','deux','trois','quatre','cinq','six','sept','huit','neuf'];
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord;
      if (h === 1) {
        hWord = 'cent';  // bare; no multiplier, no -s
      } else {
        /* h ≥ 2: multiplier + cent/cents. Rule: -s ONLY when rem === 0
           (multiplied AND final). Drop -s when rem > 0 (multiplied but
           non-final — tail follows). */
        hWord = hMul[h] + ' cent' + (rem === 0 ? 's' : '');
      }
      if (rem === 0) return hWord;
      return hWord + ' ' + sub99(rem);
    },
    pt: function (n, mode) {
      /* Brazilian Portuguese ('pt' canonical per CLAUDE.md §6; NEVER
         pt-BR). 0-99 BYTE-IDENTICAL to prior shipped (load-bearing for
         the LIVE 1.NBT.B.2 PT activity at /pt/activities/dezenas-e-
         unidades; existing BR forms preserved verbatim under `if (n <
         100)` guard: dezesseis/dezessete/dezenove + cinquenta/setenta
         + feminine duas at count=2).

         100-999 NEW layer for 2.NBT.A.1 activity 2 PT fan-out:
         - n=100 → "cem" (standalone)
         - n=101-199 → "cento e " + sub99(rem) (BR "e"-connector)
         - n=200-999 → hundreds[h] + (rem ? " e " + sub99(rem) : "")
         - hundreds[2..9] BR-canonical: duzentos, trezentos,
           quatrocentos, QUINHENTOS (irregular 500), seiscentos,
           SETECENTOS (irregular 700), oitocentos, NOVECENTOS
           (irregular 900) — distinct from ES doscientos/trescientos/
           cuatrocientos/quinientos/etc.
         - "e" appears BETWEEN hundreds and tail (BR-specific; ES omits
           "y" there): 305 = "trezentos e cinco". Internal "e" inside
           sub99 stays between tens and units. So 247 = "duzentos e
           quarenta e sete" (two "e"s). */
      var lookup = [
        'zero','um','dois','três','quatro','cinco','seis','sete','oito','nove',
        'dez','onze','doze','treze','quatorze','quinze',
        'dezesseis','dezessete','dezoito','dezenove'
      ];
      var attrFem = ['zero','uma','duas','três','quatro','cinco','seis','sete','oito','nove'];
      var tens = ['','','vinte','trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive-fem') ? attrFem[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return tens[t] + ' e ' + lookup[o];  // e.g. quarenta e sete; setenta e dois
      }
      /* 100-999 layer */
      if (n === 100) return 'cem';
      var hundredsBare = ['','cento','duzentos','trezentos','quatrocentos','quinhentos','seiscentos','setecentos','oitocentos','novecentos'];
      var h = Math.floor(n / 100), rem = n % 100;
      var hPart = hundredsBare[h];
      if (rem === 0) return hPart;
      /* sub99 inline — cardinal-form tail; internal "e" between
         tens and units preserved (47 → "quarenta e sete"). */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        return tens[t2] + ' e ' + lookup[o2];
      }
      return hPart + ' e ' + sub99(rem);  // BR "e"-connector between hundreds and tail
    },
    nl: function (n, mode) {
      /* Dutch 0-999. 0-99 BYTE-IDENTICAL to prior shipped (load-bearing
         for the LIVE 1.NBT.B.2 NL activity at /nl/activities/tientallen-
         en-eenheden; existing units-first compound + trema "ën" at
         ones=2/3 + accented "één" at attributive 1 logic preserved
         verbatim under `if (n < 100)` guard).

         Standard Dutch. 0-12 direct lookup; 13-19 irregular teens with
         morphological stems (dertien/veertien). Tens 20-90 with irregular
         forms (dertig/veertig/tachtig). 20-99: units-first compound
         <onesForCompound> + connector + <tens-word> where connector is
         "ën" (TREMA) when ones is 2 or 3, else plain "en". The trema
         marks vowel-collision: twee+en→tweeën (two syllables); without
         trema "tweeen" could misread as a digraph.
         attributive: 1→"één" (with acute accents) to disambiguate from
         indefinite article "een" (which means "a/an"). K-1 readers benefit
         from the visual disambiguator before noun.

         100-999 NEW layer for 2.NBT.A.1 activity 2 NL fan-out:
         - n=100 → "honderd" (bare; K-1 classroom standard; "éénhonderd"
           is formal/archaic, not emitted)
         - n=101-199 → "honderd" + sub99(rem) (agglutinated; 101 →
           "honderdeen", 121 → "honderdeenentwintig", 122 →
           "honderdtweeëntwintig" with trema preserved)
         - n=200-999 → onesForCompound[h] + "honderd" + (rem ? sub99(rem) : "")
           — honderd INVARIANT (NEVER "honderden"). Examples:
             200 = tweehonderd
             247 = tweehonderdzevenenveertig
             305 = driehonderdvijf (zero-tens; NO "nul" inserted in cardinal)
             420 = vierhonderdtwintig (zero-ones; tens-only tail)
             583 = vijfhonderddrieëntachtig (trema at ones=3 preserved)
             906 = negenhonderdzes
             999 = negenhonderdnegenennegentig */
      var lookup = [
        'nul','een','twee','drie','vier','vijf','zes','zeven','acht','negen',
        'tien','elf','twaalf','dertien','veertien','vijftien','zestien',
        'zeventien','achttien','negentien'
      ];
      var attr = ['nul','één','twee','drie','vier','vijf','zes','zeven','acht','negen'];
      var tens = ['','','twintig','dertig','veertig','vijftig','zestig','zeventig','tachtig','negentig'];
      var onesForCompound = ['','een','twee','drie','vier','vijf','zes','zeven','acht','negen'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        var joinPart = (o === 2 || o === 3) ? 'ën' : 'en';  // trema when ones is 2 or 3
        return onesForCompound[o] + joinPart + tens[t];  // e.g. tweeëntwintig, zevenenveertig
      }
      /* 100-999 layer */
      /* sub99 inline — cardinal-form tail, units-first with trema preserved. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        var joinPart2 = (o2 === 2 || o2 === 3) ? 'ën' : 'en';
        return onesForCompound[o2] + joinPart2 + tens[t2];
      }
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord = (h === 1) ? 'honderd' : onesForCompound[h] + 'honderd';
      if (rem === 0) return hWord;
      return hWord + sub99(rem);  // agglutinated; no joiner
    },
    sv: function (n, mode) {
      /* Swedish 0-999. 0-99 BYTE-IDENTICAL to prior shipped (load-bearing
         for the LIVE 1.NBT.B.2 SV activity at /sv/activities/tiotal-och-
         ental; existing tens-first compound + irregular fyrtio/sjuttio +
         ett-at-1 logic preserved verbatim under `if (n < 100)` guard).

         Swedish. 0-19 lookup; 20-99 = tens-first concat (no space, no
         joiner). Tens-words have IRREGULAR forms (load-bearing):
           fyrtio (NOT fyratio — 40)
           sjuttio (NOT sjutio — 70)
         attributive: 1→"ett" (neuter form before neuter nouns tiotal/
         ental/hundratal). Cardinal[1] also "ett" (locked as Swedish K-1
         counting default; "en" is the common-gender variant, not
         emitted here).

         100-999 NEW layer for 2.NBT.A.1 activity 2 SV fan-out:
         - n=100 → "hundra" (bare; K-1 classroom standard; "etthundra"
           is formal/numerical, not emitted)
         - n=101-199 → "hundra" + sub99(rem) (agglutinated; 101 →
           "hundraett", 121 → "hundratjugoett", 147 → "hundrafyrtiosju")
         - n=200-999 → onesForCompound[h] + "hundra" + (rem ? sub99(rem) : "")
           — hundra INVARIANT (NEVER "hundror"). Examples:
             200 = tvåhundra
             247 = tvåhundrafyrtiosju (irregular fyrtio preserved)
             305 = trehundrafem (zero-tens; NO "noll" inserted in cardinal)
             420 = fyrahundratjugo (zero-ones; tens-only tail)
             583 = femhundraåttiotre (irregular åttio preserved)
             906 = niohundrasex
             999 = niohundranittionio */
      var lookup = [
        'noll','ett','två','tre','fyra','fem','sex','sju','åtta','nio',
        'tio','elva','tolv','tretton','fjorton','femton','sexton',
        'sjutton','arton','nitton'
      ];
      var attr = ['noll','ett','två','tre','fyra','fem','sex','sju','åtta','nio'];
      var tens = ['','','tjugo','trettio','fyrtio','femtio','sextio','sjuttio','åttio','nittio'];
      /* onesForCompound: ones-multiplier for hundreds layer. Swedish
         doesn't drop "ett" at sub-100 compound boundaries the way some
         Germanic locales do, but at n=100 standalone canonical Swedish
         emits bare "hundra" (not "etthundra"); so onesForCompound[1] is
         unused for hundreds construction (n=100 is handled by hWord
         shortcut). */
      var onesForCompound = ['','ett','två','tre','fyra','fem','sex','sju','åtta','nio'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return tens[t] + lookup[o];  // e.g. fyrtiosju, sjuttiotvå, åttionio
      }
      /* 100-999 layer */
      /* sub99 inline — cardinal-form tail, tens-first agglutinated. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        return tens[t2] + lookup[o2];
      }
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord = (h === 1) ? 'hundra' : onesForCompound[h] + 'hundra';
      if (rem === 0) return hWord;
      return hWord + sub99(rem);  // agglutinated; no joiner
    },
    fi: function (n, mode) {
      /* Finnish 0-999 (Uralic; not Indo-European). 0-99 BYTE-IDENTICAL
         to prior shipped (load-bearing for the LIVE 1.NBT.B.2 FI
         activity at /fi/activities/kymmenet-ja-ykkoset; agglutinated
         tens-first compound + -toista teens + nolla-at-0 + kymmenen
         cardinal-10 logic preserved verbatim under `if (n < 100)`
         guard).

         Finnish. 0-19 lookup; 20-99 = AGGLUTINATED compound (tens-
         first, single word, no joiner, no space). Teens 11-19 use
         "-toista" suffix (yksitoista, kaksitoista, ...,
         yhdeksäntoista). Tens 20-90: Xkymmentä (kaksikymmentä 20, ...,
         yhdeksänkymmentä 90). Compound 21-99 is single agglutinated
         word: tens[t] + lookup[o] without space (neljäkymmentä-
         seitsemän 47, seitsemänkymmentäkaksi 72, kahdeksankymmentä-
         yhdeksän 89, yhdeksänkymmentäyhdeksän 99). Cardinal[10] =
         "kymmenen" — the genitive form of the noun "kymmen" functions
         as the standalone cardinal "10" in Finnish. Attributive mode:
         same as cardinal lookup for the number-word itself. Finnish
         has no gender — the number-word doesn't change form for
         attributive use. What CHANGES is the case of the COUNTED NOUN
         (nominative sg at 1, partitive sg at 0 or 2+) — that case-
         switch lives in speakDecomposition, not here.

         100-999 NEW layer for 2.NBT.A.1 activity 2 FI fan-out:
         - n=100 → "sata" (bare nominative; K-1 classroom standard;
           "yksisataa" with multiplier-1 is formal/redundant, not emitted)
         - n=101-199 → "sata" + sub99(rem) (agglutinated single word;
           101 → "satayksi", 110 → "satakymmenen", 147 →
           "sataneljäkymmentäseitsemän")
         - n=200-999 → onesForCompound[h] + "sataa" + (rem ? sub99(rem) : "")
           — multiplier governs partitive `sataa` inside cardinal
           (Finnish 2+ governs partitive). Agglutinated single word.
           Examples:
             200 = kaksisataa
             247 = kaksisataaneljäkymmentäseitsemän
             305 = kolmesataaviisi (zero-tens; NO "nolla" inserted)
             420 = neljäsataakaksikymmentä (zero-ones; tens-only tail)
             583 = viisisataakahdeksankymmentäkolme
             906 = yhdeksänsataakuusi
             999 = yhdeksänsataayhdeksänkymmentäyhdeksän */
      var lookup = [
        'nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän',
        'kymmenen','yksitoista','kaksitoista','kolmetoista','neljätoista','viisitoista','kuusitoista',
        'seitsemäntoista','kahdeksantoista','yhdeksäntoista'
      ];
      var attr = ['nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän'];
      var tens = ['','','kaksikymmentä','kolmekymmentä','neljäkymmentä','viisikymmentä','kuusikymmentä','seitsemänkymmentä','kahdeksankymmentä','yhdeksänkymmentä'];
      /* onesForCompound: ones-multiplier for hundreds layer. n=100 is
         bare "sata" (not "yksisataa"), so onesForCompound[1] is unused
         for hundreds construction (handled by hWord shortcut). For
         h=2..9, bare cardinal multiplier prepends to partitive "sataa". */
      var onesForCompound = ['','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return tens[t] + lookup[o];  // agglutinated: neljäkymmentäseitsemän, kahdeksankymmentäyhdeksän
      }
      /* 100-999 layer */
      /* sub99 inline — cardinal-form tail, agglutinated tens-first; partitive `kymmentä` inside tens-word preserved. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        return tens[t2] + lookup[o2];
      }
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord = (h === 1) ? 'sata' : onesForCompound[h] + 'sataa';  // n=100 bare nominative; n=200+ multiplier+partitive
      if (rem === 0) return hWord;
      return hWord + sub99(rem);  // agglutinated single word (no joiner)
    },
    no: function (n, mode) {
      /* Norwegian Bokmål 0-999. 0-99 BYTE-IDENTICAL to prior shipped
         (load-bearing for the LIVE 1.NBT.B.2 NO activity at
         /no/activities/tiere-og-enere; modern post-1951 tens-first
         concat + irregular ø/å tens-words + acute én-at-1 + sju-
         preferred logic preserved verbatim under `if (n < 100)` guard).

         Norwegian Bokmål. 0-19 lookup; 20-99 = TENS-FIRST concat (no
         space, no joiner; modern post-1951 reform; mirrors SV pattern;
         OPPOSITE of DA's ones-first compound).
         Tens-words 20-90 IRREGULAR (load-bearing Norwegian-specific):
           tjue    (20; NOT pre-1951 "tyve" which is DA's form)
           tretti  (30; NOT pre-1951 "tredve")
           førti   (40; ø vowel — irregular)
           femti
           seksti
           sytti
           åtti    (80; å vowel — irregular)
           nitti
         "sju" preferred over "syv" per modern K-1 Bokmål convention.
         attributive: 1 → "én" with acute accent (K-1 emphatic form
         before noun, distinguishes from indefinite article "en").
         Cardinal[1] also "én". Compound examples: 21=tjueén,
         47=førtisju, 72=syttito, 89=åttini, 99=nittini.

         100-999 NEW layer for 2.NBT.A.1 activity 2 NO fan-out:
         - n=100 → "hundre" (bare; K-1 classroom standard; "etthundre"
           is formal/numerical, not emitted)
         - n=101-199 → "hundreog" + sub99(rem) (Bokmål agglutinated-with-
           og convention; 101 → "hundreogén", 147 → "hundreogførtisju")
         - n=200-999 → onesForCompound[h] + "hundre" + (rem ? "og" + sub99(rem) : "")
           — `hundre` is the cardinal hundreds-word, agglutinated to
           ones-multiplier (tohundre, trehundre, firehundre, ...,
           nihundre). NEVER pluralizes to "hundrer" inside cardinal
           (hundrer is the place-unit-noun singular reserved for column/
           decomp). Bokmål joins hundreds to tail with agglutinated "og"
           forming ONE orthographic word (DISTINCT from DA's spaced
           " og " convention). Examples:
             200 = tohundre
             247 = tohundreogførtisju (modern førti+sju tens-first)
             305 = trehundreogfem (zero-tens; "og"-join with bare-5)
             420 = firehundreogtjue (zero-ones; "og"-join with tens-only)
             583 = femhundreogåttitre (modern åtti=80, NOT DA firs)
             906 = nihundreogseks
             999 = nihundreognittini (modern nitti=90, NOT DA halvfems) */
      var lookup = [
        'null','én','to','tre','fire','fem','seks','sju','åtte','ni',
        'ti','elleve','tolv','tretten','fjorten','femten','seksten',
        'sytten','atten','nitten'
      ];
      var attr = ['null','én','to','tre','fire','fem','seks','sju','åtte','ni'];
      var tens = ['','','tjue','tretti','førti','femti','seksti','sytti','åtti','nitti'];
      /* onesForCompound: ones-multiplier for hundreds layer. n=100 is
         bare "hundre" (not "etthundre" — kid-natural K-1), so
         onesForCompound[1] is unused for hundreds construction
         (handled by hWord shortcut). */
      var onesForCompound = ['','én','to','tre','fire','fem','seks','sju','åtte','ni'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return tens[t] + lookup[o];  // tens-first concat: førtisju, syttito, åttini
      }
      /* 100-999 layer */
      /* sub99 inline — cardinal-form tail, tens-first agglutinated; modern tens preserved. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        return tens[t2] + lookup[o2];
      }
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord = (h === 1) ? 'hundre' : onesForCompound[h] + 'hundre';
      if (rem === 0) return hWord;
      return hWord + 'og' + sub99(rem);  // agglutinated-with-og (single orthographic word per Bokmål convention)
    },
    da: function (n, mode) {
      /* Danish 0-999. 0-99 BYTE-IDENTICAL to prior shipped (load-bearing
         for the LIVE 1.NBT.B.2 DA activity at /da/activities/tiere-og-
         enere; vigesimal tens (halvtreds/tres/halvfjerds/firs/halvfems)
         + ones-first "og" compound + en-at-1 logic preserved verbatim
         under `if (n < 100)` guard. Strictest 0-99 preservation across
         the 11-locale set — DA has the most irregular sub-100 logic).

         Danish. 0-19 lookup; 20-99 = ONES-FIRST + "og" (and) + TENS-word
         compound (Germanic, like German "einundzwanzig").
         Tens-words 50/60/70/80/90 are VICESIMAL (base-20) — load-bearing
         irregulars rooted in Old Norse halv-tredje-sinds-tyve etc.:
           halvtreds (50 = 2.5 × 20)
           tres      (60 = 3   × 20)
           halvfjerds(70 = 3.5 × 20)
           firs      (80 = 4   × 20)
           halvfems  (90 = 4.5 × 20)
         Regular tens 20=tyve, 30=tredive, 40=fyrre.
         attributive: 1 → "en" (common-gender form before common-gender
         nouns tier / ener — both common gender, taking the "en" article).
         Cardinal[1] also "en" (locked as Danish K-1 default; "et" is the
         neuter variant, not emitted here for tier/ener). Compound
         examples: 21=enogtyve, 47=syvogfyrre, 50=halvtreds, 72=tooghalv-
         fjerds, 89=niogfirs, 90=halvfems, 99=niooghalvfems.

         100-999 NEW layer for 2.NBT.A.1 activity 2 DA fan-out:
         - n=100 → "hundrede" (bare; K-1 classroom standard; "ethundrede"
           is formal/numerical, not emitted)
         - n=101-199 → "hundrede og " + sub99(rem) (Danish "og"-join
           between hundreds-word and tail; 101 → "hundrede og en",
           147 → "hundrede og syvogfyrre" with vigesimal tens via sub99)
         - n=200-999 → onesForCompound[h] + "hundrede" + (rem ? " og " + sub99(rem) : "")
           — `hundrede` is the cardinal hundreds-word, agglutinated to
           ones-multiplier (tohundrede, trehundrede, firehundrede ...
           nihundrede). NEVER pluralizes to "hundreder" inside cardinal
           (hundreder is the place-unit-noun plural for column/decomp).
           DA joins hundreds to tail with explicit " og " (DISTINCT from
           DE's fully-agglutinated compound). Examples:
             200 = tohundrede
             247 = tohundrede og syvogfyrre
             305 = trehundrede og fem (zero-tens; bare-5 tail via "og")
             420 = firehundrede og tyve (zero-ones; tens-20 tail via "og")
             583 = femhundrede og treogfirs (VIGESIMAL firs=80 inside)
             906 = nihundrede og seks
             999 = nihundrede og niooghalvfems (VIGESIMAL halvfems=90) */
      var lookup = [
        'nul','en','to','tre','fire','fem','seks','syv','otte','ni',
        'ti','elleve','tolv','tretten','fjorten','femten','seksten',
        'sytten','atten','nitten'
      ];
      var attr = ['nul','en','to','tre','fire','fem','seks','syv','otte','ni'];
      var tens = ['','','tyve','tredive','fyrre','halvtreds','tres','halvfjerds','firs','halvfems'];
      /* onesForCompound: ones-multiplier for hundreds layer. n=100 is
         bare "hundrede" (not "ethundrede" — kid-natural K-1), so
         onesForCompound[1] is unused for hundreds construction (handled
         by hWord shortcut). */
      var onesForCompound = ['','en','to','tre','fire','fem','seks','syv','otte','ni'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return lookup[o] + 'og' + tens[t];  // ones-first: syvogfyrre, niogfirs, tooghalvfjerds
      }
      /* 100-999 layer */
      /* sub99 inline — cardinal-form tail, ones-first; vigesimal tens preserved. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        return lookup[o2] + 'og' + tens[t2];
      }
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord = (h === 1) ? 'hundrede' : onesForCompound[h] + 'hundrede';
      if (rem === 0) return hWord;
      return hWord + ' og ' + sub99(rem);  // "og"-join between hundreds-word and tail
    }
  },

    /* ==== BYTE-FAITHFUL SPLICE from place-value-core.js speakDecomposition (call with a shim ctx) ==== */
  _DECOMP_SPEAK: function () {
    if (!window.LCSAudio || !window.LCSAudio.speak) return;
    var lang = this.language;
    var sentence;
    /* 3-place mode (activity 2 — 2.NBT.A.1). Gated on this.places
       including 'hundreds'. EN-only for now; future fan-out adds other
       locale branches here. Zero places ARE spoken — naming "0 tens" is
       the 2.NBT.A.1 teaching point. */
    if (this.places && this.places.indexOf('hundreds') >= 0) {
      if (lang === 'en') {
        var hWordEN3 = this._numberWord(this.targetHundreds, 'en');
        var tWordEN3 = this._numberWord(this.targetTens,     'en');
        var oWordEN3 = this._numberWord(this.targetOnes,     'en');
        var nWordEN3 = this._numberWord(this.targetNumber,   'en');
        var hPartEN3 = hWordEN3 + ' hundred' + (this.targetHundreds === 1 ? '' : 's');
        var tPartEN3 = tWordEN3 + ' ten'     + (this.targetTens     === 1 ? '' : 's');
        var oPartEN3 = oWordEN3 + ' one'     + (this.targetOnes     === 1 ? '' : 's');
        sentence = hPartEN3 + ', ' + tPartEN3 + ', and ' + oPartEN3 + ' make ' + nWordEN3;
      } else if (lang === 'de') {
        /* DE 3-place: Hunderter/Zehner/Einer INVARIANT (no plural -s
           per activity 1's lock — matches the 1.NBT.B.2 DE convention).
           Capitalize tens-of-hundreds-word at sentence start (Zwei /
           Drei / etc. via capitalize=true). Zero places SPOKEN
           ("null Zehner" / "null Einer") per 2.NBT.A.1 teaching point.
           Copula "ergeben" (plural verb; matches activity 1). Comma
           between Hunderter and Zehner; "und" before Einer. Cardinal
           target via DE helper renders agglutinated units-first inside
           hundreds frame (zweihundertsiebenundvierzig, dreihundertfünf). */
        var hWordDE3 = this._numberWord(this.targetHundreds, 'de', 'attributive', true);   // capitalize sentence-start
        var tWordDE3 = this._numberWord(this.targetTens,     'de', 'attributive', false);
        var oWordDE3 = this._numberWord(this.targetOnes,     'de', 'attributive', false);
        var nWordDE3 = this._numberWord(this.targetNumber,   'de', 'cardinal',    false);
        sentence = hWordDE3 + ' Hunderter, ' + tWordDE3 + ' Zehner und ' + oWordDE3 + ' Einer ergeben ' + nWordDE3;
      } else if (lang === 'es') {
        /* ES 3-place: centena/decena/unidad INFLECT (matches activity 1
           lock — 1 → singular; 0 or 2+ → plural with -s / -es suffix).
           attributive-fem mode for counts (matches "una decena"
           feminine agreement from activity 1; gender-invariant 2-9).
           Zero places SPOKEN ("cero decenas" / "cero unidades") per
           2.NBT.A.1 teaching point. Copula "son" matches activity 1.
           Comma between Centenas and Decenas; "y" before Unidades.
           Cardinal target via ES helper renders cien/ciento split +
           three irregular hundreds (quinientos/setecientos/novecientos);
           NO "y" between hundreds and tens. */
        var hWordES3 = this._numberWord(this.targetHundreds, 'es', 'attributive-fem', false);
        var tWordES3 = this._numberWord(this.targetTens,     'es', 'attributive-fem', false);
        var oWordES3 = this._numberWord(this.targetOnes,     'es', 'attributive-fem', false);
        var nWordES3 = this._numberWord(this.targetNumber,   'es', 'cardinal',         false);
        var hPartES3 = hWordES3 + ' centena' + (this.targetHundreds === 1 ? '' : 's');
        var tPartES3 = tWordES3 + ' decena' + (this.targetTens === 1 ? '' : 's');
        var oPartES3 = oWordES3 + ' unidad' + (this.targetOnes === 1 ? '' : 'es');
        sentence = hPartES3 + ', ' + tPartES3 + ' y ' + oPartES3 + ' son ' + nWordES3;
      } else if (lang === 'pt') {
        /* PT 3-place: centena/dezena/unidade INFLECT per activity 1 PT
           lock — count=1 → singular; count=0 or 2+ → plural with -s
           suffix (zero takes plural, matches activity 1's "zero
           unidades"). attributive-fem mode for counts (matches
           feminine duas at count=2 — PT divergence from ES "dos").
           Copula "são" matches activity 1. Comma between Centenas and
           Dezenas; "e" before Unidades. Zero places SPOKEN per
           2.NBT.A.1 teaching point. Cardinal target via PT helper
           renders BR forms with cem/cento split + irregular
           quinhentos/setecentos/novecentos + "e"-connector between
           hundreds and tail. */
        var hWordPT3 = this._numberWord(this.targetHundreds, 'pt', 'attributive-fem', false);
        var tWordPT3 = this._numberWord(this.targetTens,     'pt', 'attributive-fem', false);
        var oWordPT3 = this._numberWord(this.targetOnes,     'pt', 'attributive-fem', false);
        var nWordPT3 = this._numberWord(this.targetNumber,   'pt', 'cardinal',         false);
        var hPartPT3 = hWordPT3 + ' centena' + (this.targetHundreds === 1 ? '' : 's');
        var tPartPT3 = tWordPT3 + ' dezena'  + (this.targetTens     === 1 ? '' : 's');
        var oPartPT3 = oWordPT3 + ' unidade' + (this.targetOnes     === 1 ? '' : 's');
        sentence = hPartPT3 + ', ' + tPartPT3 + ' e ' + oPartPT3 + ' são ' + nWordPT3;
      } else if (lang === 'fr') {
        /* FR 3-place: centaine/dizaine/unité INFLECT per activity 1 FR
           lock — count=0 OR 1 → SINGULAR; count=2+ → plural with -s
           suffix. Zero places spoken AS SINGULAR per FR convention
           ("zéro dizaine" not "zéro dizaines") — matches activity 1's
           "zéro unité" lock. attributive-fem mode for counts (matches
           "une dizaine"/"une unité" feminine agreement from activity 1).
           Copula "font" plural (matches activity 1). Comma between
           Centaines and Dizaines; "et" before Unités. Cardinal target
           via FR helper renders BOTH -s rules: cent → cents add/drop
           by position (multiplied+final vs multiplied+non-final); and
           quatre-vingts -s preserved from sub99 (drives 280→quatre-
           vingts vs 282→quatre-vingt-deux distinction inside hundreds). */
        var hWordFR3 = this._numberWord(this.targetHundreds, 'fr', 'attributive-fem', false);
        var tWordFR3 = this._numberWord(this.targetTens,     'fr', 'attributive-fem', false);
        var oWordFR3 = this._numberWord(this.targetOnes,     'fr', 'attributive-fem', false);
        var nWordFR3 = this._numberWord(this.targetNumber,   'fr', 'cardinal',         false);
        var hPartFR3 = hWordFR3 + ' centaine' + (this.targetHundreds >= 2 ? 's' : '');
        var tPartFR3 = tWordFR3 + ' dizaine' + (this.targetTens     >= 2 ? 's' : '');
        var oPartFR3 = oWordFR3 + ' unité'   + (this.targetOnes     >= 2 ? 's' : '');
        sentence = hPartFR3 + ', ' + tPartFR3 + ' et ' + oPartFR3 + ' font ' + nWordFR3;
      } else if (lang === 'it') {
        /* IT 3-place: MIXED inflection per activity 1 lock —
           - centinaio (masc sg) / centinaia (fem pl) — irregular
             -aio/-aia plural
           - decina (fem sg) / decine (fem pl) — regular -a/-e
           - unità (fem) — INVARIANT
           Article at count=1: "un centinaio" (masc), "una decina"
           (fem), "una unità" (fem). Task targets [200..906] all have
           H≥2 → centinaia plural path; H=1 defensive path emits
           masculine "un" hardcoded. Copula "fanno" plural (matches
           activity 1). Comma between Centinaia and Decine; "e" before
           Unità. Zero places SPOKEN ("zero decine" / "zero unità")
           per 2.NBT.A.1 teaching point. Cardinal target via IT helper
           renders cento-elision compounds (duecentoquarantasette,
           trecentocinque, cinquecentottantatré). */
        var hWordIT3 = (this.targetHundreds === 1)
          ? 'un'
          : this._numberWord(this.targetHundreds, 'it', 'attributive-fem', false);
        var tWordIT3 = this._numberWord(this.targetTens, 'it', 'attributive-fem', false);
        var oWordIT3 = this._numberWord(this.targetOnes, 'it', 'attributive-fem', false);
        var nWordIT3 = this._numberWord(this.targetNumber, 'it', 'cardinal', false);
        var hPartIT3 = hWordIT3 + ' ' + (this.targetHundreds === 1 ? 'centinaio' : 'centinaia');
        var tPartIT3 = tWordIT3 + ' decin' + (this.targetTens === 1 ? 'a' : 'e');
        var oPartIT3 = oWordIT3 + ' unità';   // INVARIANT
        sentence = hPartIT3 + ', ' + tPartIT3 + ' e ' + oPartIT3 + ' fanno ' + nWordIT3;
      } else if (lang === 'nl') {
        /* NL 3-place: honderdtal/tiental/eenheid INFLECT per activity 1
           NL lock — count=1 → singular; count=0 or 2+ → plural (zero
           takes plural, matches activity 1 "nul eenheden"). Suffix
           patterns: -tal → -tallen (honderdtal/tiental); -eid → -eden
           (eenheid). Attributive mode for counts (returns accented "één"
           at count=1). Copula "maken" plural (matches activity 1).
           Connective: standard Dutch enumeration of 3+ items uses comma
           between first two and "en" before last (NOT triple-"en").
           Zero places SPOKEN per 2.NBT.A.1 teaching point. Cardinal
           target via NL helper renders units-first agglutinated compound
           with honderd invariant and trema preserved inside
           (tweehonderd, vijfhonderddrieëntachtig). */
        var hWordNL3 = this._numberWord(this.targetHundreds, 'nl', 'attributive', false);
        var tWordNL3 = this._numberWord(this.targetTens,     'nl', 'attributive', false);
        var oWordNL3 = this._numberWord(this.targetOnes,     'nl', 'attributive', false);
        var nWordNL3 = this._numberWord(this.targetNumber,   'nl', 'cardinal',    false);
        var hPartNL3 = hWordNL3 + ' honderdtal' + (this.targetHundreds === 1 ? '' : 'len');
        var tPartNL3 = tWordNL3 + ' tiental'    + (this.targetTens     === 1 ? '' : 'len');
        var oPartNL3 = oWordNL3 + ' eenhe'      + (this.targetOnes     === 1 ? 'id' : 'den');
        sentence = hPartNL3 + ', ' + tPartNL3 + ' en ' + oPartNL3 + ' maken ' + nWordNL3;
      } else if (lang === 'sv') {
        /* SV 3-place: hundratal/tiotal/ental ALL INVARIANT (neuter
           zero-plural per activity 1 SV lock — same form singular and
           plural, like får/får sheep, bord/bord table). NEVER append
           plural suffix. Attributive mode for counts (returns "ett" at
           count=1; otherwise standard cardinal). Copula "blir" plural
           (matches activity 1). Connective: standard Swedish
           enumeration of 3+ items uses comma between first two and
           "och" before last (NOT triple-"och"). Zero places SPOKEN per
           2.NBT.A.1 teaching point. Cardinal target via SV helper
           renders tens-first agglutinated compound with hundra
           invariant and irregular tens (fyrtio/sjuttio/etc.) preserved
           inside (tvåhundrafyrtiosju, trehundrafem, femhundraåttiotre). */
        var hWordSV3 = this._numberWord(this.targetHundreds, 'sv', 'attributive', false);
        var tWordSV3 = this._numberWord(this.targetTens,     'sv', 'attributive', false);
        var oWordSV3 = this._numberWord(this.targetOnes,     'sv', 'attributive', false);
        var nWordSV3 = this._numberWord(this.targetNumber,   'sv', 'cardinal',    false);
        var hPartSV3 = hWordSV3 + ' hundratal';   // INVARIANT
        var tPartSV3 = tWordSV3 + ' tiotal';      // INVARIANT
        var oPartSV3 = oWordSV3 + ' ental';       // INVARIANT
        sentence = hPartSV3 + ', ' + tPartSV3 + ' och ' + oPartSV3 + ' blir ' + nWordSV3;
      } else if (lang === 'da') {
        /* DA 3-place: hundrede/tier/ener all DECLINE per activity 1 DA
           lock — count=1 → singular (hundrede/tier/ener); count=0 or
           2+ → plural (hundreder/tiere/enere). Zero takes plural per
           Germanic+Romance convention. Article gender at count=1: "et
           hundrede" (neuter) vs "en tier"/"en ener" (common). All 6
           task targets are H≥2 so hundreds-count=1 path is defensive-
           only — DA helper attr[1]='en' (common gender for tier/ener);
           the H=1 path here hardcodes the correct neuter article "et"
           rather than relying on attributive. Copula "er" (matches
           activity 1). Connective: standard Danish enumeration of 3+
           items uses comma between first two and "og" before last.
           Zero places SPOKEN per 2.NBT.A.1 teaching point. Cardinal
           target via DA helper renders the VIGESIMAL-inside-hundreds
           frame with explicit "og"-join between hundreds and tail
           (tohundrede og syvogfyrre, trehundrede og fem, femhundrede
           og treogfirs). */
        var hWordDA3 = (this.targetHundreds === 1)
          ? 'et'   // neuter article for neuter noun hundrede (defensive; H≥2 in shipped targets)
          : this._numberWord(this.targetHundreds, 'da', 'attributive', false);
        var tWordDA3 = this._numberWord(this.targetTens,     'da', 'attributive', false);
        var oWordDA3 = this._numberWord(this.targetOnes,     'da', 'attributive', false);
        var nWordDA3 = this._numberWord(this.targetNumber,   'da', 'cardinal',    false);
        var hPartDA3 = hWordDA3 + ' hundred' + (this.targetHundreds === 1 ? 'e' : 'er');  // hundrede/hundreder
        var tPartDA3 = tWordDA3 + ' tier'    + (this.targetTens     === 1 ? '' : 'e');
        var oPartDA3 = oWordDA3 + ' ener'    + (this.targetOnes     === 1 ? '' : 'e');
        sentence = hPartDA3 + ', ' + tPartDA3 + ' og ' + oPartDA3 + ' er ' + nWordDA3;
      } else if (lang === 'no') {
        /* NO 3-place: hundrer/tier/ener all DECLINE per activity 1 NO
           lock — count=1 → singular; count=0 or 2+ → plural
           (hundrere/tiere/enere). Zero takes plural per Germanic+
           Romance convention. All 3 place-unit nouns are common-gender
           — helper attr[1]='én' (acute) emits the correct count=1 form
           for all three (no neuter-vs-common hardcode needed, unlike
           DA where hundrede is neuter). Copula "blir" (matches activity
           1; mirrors SV; OPPOSITE of DA's "er"). Connective: standard
           Bokmål enumeration of 3+ items uses comma between first two
           and "og" before last. Zero places SPOKEN per 2.NBT.A.1
           teaching point. Cardinal target via NO helper renders the
           MODERN tens-first frame agglutinated-with-og (DA contrast:
           vigesimal ones-first) — tohundreogførtisju, trehundreogfem,
           femhundreogåttitre. */
        var hWordNO3 = this._numberWord(this.targetHundreds, 'no', 'attributive', false);
        var tWordNO3 = this._numberWord(this.targetTens,     'no', 'attributive', false);
        var oWordNO3 = this._numberWord(this.targetOnes,     'no', 'attributive', false);
        var nWordNO3 = this._numberWord(this.targetNumber,   'no', 'cardinal',    false);
        var hPartNO3 = hWordNO3 + ' hundrer' + (this.targetHundreds === 1 ? '' : 'e');  // hundrer/hundrere
        var tPartNO3 = tWordNO3 + ' tier'    + (this.targetTens     === 1 ? '' : 'e');
        var oPartNO3 = oWordNO3 + ' ener'    + (this.targetOnes     === 1 ? '' : 'e');
        sentence = hPartNO3 + ', ' + tPartNO3 + ' og ' + oPartNO3 + ' blir ' + nWordNO3;
      } else if (lang === 'fi') {
        /* FI 3-place: sata/kymmen/ykkönen all FOLLOW THE PARTITIVE
           CASE-RULE (load-bearing FI-specific morphology — OPPOSITE
           of every other locale): count=1 → NOMINATIVE singular
           (sata/kymmen/ykkönen); count=0 or 2+ → PARTITIVE singular
           (sataa/kymmentä/ykköstä — NOT pluralized to satoja/kymmeniä/
           ykkösiä; Finnish counts govern partitive SG, not partitive
           PL). Copula "on" (3sg present of olla = is/equals; Finnish
           K-1 math-decomposition convention; matches activity 1).
           Connective: standard Finnish enumeration of 3+ items uses
           comma between first two and "ja" before last. Zero places
           SPOKEN per 2.NBT.A.1 teaching point. Cardinal target via FI
           helper renders agglutinated single-word compound with
           partitive sataa inside (kaksisataaneljäkymmentäseitsemän,
           kolmesataaviisi, viisisataakahdeksankymmentäkolme). */
        var hWordFI3 = this._numberWord(this.targetHundreds, 'fi', 'attributive', false);
        var tWordFI3 = this._numberWord(this.targetTens,     'fi', 'attributive', false);
        var oWordFI3 = this._numberWord(this.targetOnes,     'fi', 'attributive', false);
        var nWordFI3 = this._numberWord(this.targetNumber,   'fi', 'cardinal',    false);
        var hNounFI3 = (this.targetHundreds === 1) ? 'sata'    : 'sataa';
        var tNounFI3 = (this.targetTens     === 1) ? 'kymmen'  : 'kymmentä';
        var oNounFI3 = (this.targetOnes     === 1) ? 'ykkönen' : 'ykköstä';
        sentence = hWordFI3 + ' ' + hNounFI3 + ', ' + tWordFI3 + ' ' + tNounFI3 + ' ja ' + oWordFI3 + ' ' + oNounFI3 + ' on ' + nWordFI3;
      }
      /* Other locales in 3-place mode without a per-locale 3P branch
         leave `sentence` undefined → falls through to the 2-place
         branches below (graceful degradation; will not occur in
         shipped state — activity 2 manifest only ships en + de). */
    }
    if (sentence) {
      // 3-place sentence resolved above; skip 2-place branches.
    } else if (lang === 'fi') {
      var tensWordFI   = this._numberWord(this.targetTens,   'fi', 'attributive', false);
      var onesWordFI   = this._numberWord(this.targetOnes,   'fi', 'attributive', false);
      var targetWordFI = this._numberWord(this.targetNumber, 'fi', 'cardinal',     false);
      /* FI case-rule (LOAD-BEARING — opposite of every prior locale):
           count=1   → NOMINATIVE singular (kymmen / ykkönen)
           count=0 OR 2+ → PARTITIVE singular (kymmentä / ykköstä —
                      NOT pluralized; Finnish counts govern partitive
                      SG, not partitive PL).
         Copula "on" (3sg present of olla = is/equals) — Finnish K-1
         math-decomposition convention; matches existing FI math
         precedent in ten-frame + choice-board + syllable-builder.
         Cardinal target via FI helper handles agglutinated tens-first
         compound: neljäkymmentäseitsemän, kahdeksankymmentäyhdeksän. */
      var tensNounFI = (this.targetTens === 1) ? 'kymmen' : 'kymmentä';
      var onesNounFI = (this.targetOnes === 1) ? 'ykkönen' : 'ykköstä';
      sentence = tensWordFI + ' ' + tensNounFI + ' ja ' + onesWordFI + ' ' + onesNounFI + ' on ' + targetWordFI;
    } else if (lang === 'no') {
      var tensWordNO   = this._numberWord(this.targetTens,   'no', 'attributive', false);
      var onesWordNO   = this._numberWord(this.targetOnes,   'no', 'attributive', false);
      var targetWordNO = this._numberWord(this.targetNumber, 'no', 'cardinal',     false);
      /* NO inflection: tier/ener are COMMON-gender nouns that decline
         identically to DA. count=1 → singular (tier/ener); count=0 or
         2+ → plural (tiere/enere). Zero takes plural per Germanic+
         Romance convention. Copula "blir" (3sg/3pl present of "bli" =
         "to become") — K-1 Norwegian Bokmål math-decomposition
         convention; mirrors SV. Cardinal target via NO helper handles
         modern post-1951 tens-first compound with irregular ø/å tens-
         words (førti, åtti). Acute "én" emitted by helper's attributive
         lookup at count=1. */
      var tensNounNO = (this.targetTens === 1) ? 'tier' : 'tiere';
      var onesNounNO = (this.targetOnes === 1) ? 'ener' : 'enere';
      sentence = tensWordNO + ' ' + tensNounNO + ' og ' + onesWordNO + ' ' + onesNounNO + ' blir ' + targetWordNO;
    } else if (lang === 'da') {
      var tensWordDA   = this._numberWord(this.targetTens,   'da', 'attributive', false);
      var onesWordDA   = this._numberWord(this.targetOnes,   'da', 'attributive', false);
      var targetWordDA = this._numberWord(this.targetNumber, 'da', 'cardinal',     false);
      /* DA inflection: tier/ener are COMMON-gender nouns that decline.
         count=1 → singular (tier/ener); count=0 or 2+ → plural (tiere/enere).
         Zero takes plural per Germanic+Romance convention. Copula "er"
         (3sg/3pl present of "være" = is/equals) — K-1 Danish math
         decomposition convention. Cardinal target via DA helper handles
         vicesimal tens (halvtreds/halvfjerds/firs) + ones-first compound. */
      var tensNounDA = (this.targetTens === 1) ? 'tier' : 'tiere';
      var onesNounDA = (this.targetOnes === 1) ? 'ener' : 'enere';
      sentence = tensWordDA + ' ' + tensNounDA + ' og ' + onesWordDA + ' ' + onesNounDA + ' er ' + targetWordDA;
    } else if (lang === 'sv') {
      var tensWordSV   = this._numberWord(this.targetTens,   'sv', 'attributive', false);
      var onesWordSV   = this._numberWord(this.targetOnes,   'sv', 'attributive', false);
      var targetWordSV = this._numberWord(this.targetNumber, 'sv', 'cardinal',     false);
      /* SV: tiotal/ental are NEUTER nouns with ZERO-PLURAL morphology.
         Same form singular and plural (like får/får sheep, bord/bord
         table). NEVER append a plural suffix. Copula "blir" (becomes)
         per K-1 Swedish math-decomposition convention. */
      var tensPartSV = tensWordSV + ' tiotal';   // INVARIANT
      var onesPartSV = onesWordSV + ' ental';    // INVARIANT
      sentence = tensPartSV + ' och ' + onesPartSV + ' blir ' + targetWordSV;
    } else if (lang === 'nl') {
      var tensWordNL   = this._numberWord(this.targetTens,   'nl', 'attributive', false);
      var onesWordNL   = this._numberWord(this.targetOnes,   'nl', 'attributive', false);
      var targetWordNL = this._numberWord(this.targetNumber, 'nl', 'cardinal',     false);
      /* NL inflection: 1 → singular noun; 0 or 2+ → plural.
         tiental → tientallen (Dutch neuter -tal → -tallen suffix);
         eenheid → eenheden (Dutch -eid → -eden suffix).
         Plural verb "maken" (3pl present of maken = "to make"). */
      var tensPartNL = tensWordNL + ' tiental' + (this.targetTens === 1 ? '' : 'len');
      var onesPartNL = onesWordNL + ' eenhe' + (this.targetOnes === 1 ? 'id' : 'den');
      sentence = tensPartNL + ' en ' + onesPartNL + ' maken ' + targetWordNL;
    } else if (lang === 'pt') {
      var tensWordPT   = this._numberWord(this.targetTens,   'pt', 'attributive-fem', false);
      var onesWordPT   = this._numberWord(this.targetOnes,   'pt', 'attributive-fem', false);
      var targetWordPT = this._numberWord(this.targetNumber, 'pt', 'cardinal',         false);
      /* PT inflection: 1 → singular; 0 or 2+ → plural (zero takes plural).
         Plural verb "são". Note feminine "duas" at ones=2 (e.g., 12 → "uma
         dezena e duas unidades são doze") — PT divergence from ES "dos"
         invariant. */
      var tensPartPT = tensWordPT + ' dezena' + (this.targetTens === 1 ? '' : 's');
      var onesPartPT = onesWordPT + ' unidade' + (this.targetOnes === 1 ? '' : 's');
      sentence = tensPartPT + ' e ' + onesPartPT + ' são ' + targetWordPT;
    } else if (lang === 'fr') {
      var tensWordFR   = this._numberWord(this.targetTens,   'fr', 'attributive-fem', false);
      var onesWordFR   = this._numberWord(this.targetOnes,   'fr', 'attributive-fem', false);
      var targetWordFR = this._numberWord(this.targetNumber, 'fr', 'cardinal',         false);
      /* FR inflection: 0 or 1 → singular noun; 2+ → plural. Singular after
         "zéro" is the FR-specific decade-case rule (zéro treated as <1 in
         agreement) — different from ES/IT/DE/EN which take plural after 0. */
      var tensPartFR = tensWordFR + ' dizaine' + (this.targetTens >= 2 ? 's' : '');
      var onesPartFR = onesWordFR + ' unité'   + (this.targetOnes >= 2 ? 's' : '');
      sentence = tensPartFR + ' et ' + onesPartFR + ' font ' + targetWordFR;
    } else if (lang === 'it') {
      var tensWordIT   = this._numberWord(this.targetTens,   'it', 'attributive-fem', false);
      var onesWordIT   = this._numberWord(this.targetOnes,   'it', 'attributive-fem', false);
      var targetWordIT = this._numberWord(this.targetNumber, 'it', 'cardinal',         false);
      /* decina inflects: 1 → decina (singular), 0 or 2+ → decine (plural). */
      var tensPartIT = tensWordIT + ' decin' + (this.targetTens === 1 ? 'a' : 'e');
      /* unità INVARIANT regardless of number. */
      var onesPartIT = onesWordIT + ' unità';
      sentence = tensPartIT + ' e ' + onesPartIT + ' fanno ' + targetWordIT;
    } else if (lang === 'es') {
      var tensWordES   = this._numberWord(this.targetTens,   'es', 'attributive-fem', false);
      var onesWordES   = this._numberWord(this.targetOnes,   'es', 'attributive-fem', false);
      var targetWordES = this._numberWord(this.targetNumber, 'es', 'cardinal',         false);
      var tensPartES = tensWordES + ' decena' + (this.targetTens === 1 ? '' : 's');
      var onesPartES = onesWordES + ' unidad' + (this.targetOnes === 1 ? '' : 'es');
      sentence = tensPartES + ' y ' + onesPartES + ' son ' + targetWordES;
    } else if (lang === 'de') {
      /* tensWord capitalized as sentence-start ("Ein" / "Vier" / …);
         onesWord lower-case ("ein" / "zwei" / …); targetWord cardinal
         lower-case (TTS reads "zwölf" / "zweiundvierzig" naturally). */
      var tensWord  = this._numberWord(this.targetTens,   'de', 'attributive', true);
      var onesWord  = this._numberWord(this.targetOnes,   'de', 'attributive', false);
      var targetWord = this._numberWord(this.targetNumber, 'de', 'cardinal',    false);
      sentence = tensWord + ' Zehner und ' + onesWord + ' Einer ergeben ' + targetWord;
    } else {
      /* EN default: "N tens and M ones make T". Grammar: "one ten" (sg)
         vs "two tens" (pl); same for ones. For decade tasks (ones === 0)
         "zero ones" reads correctly per CCSS 1.NBT.B.2.C. */
      var tensWordEN   = this._numberWord(this.targetTens,   'en');
      var onesWordEN   = this._numberWord(this.targetOnes,   'en');
      var targetWordEN = this._numberWord(this.targetNumber, 'en');
      var tensPart = tensWordEN + ' ten' + (this.targetTens === 1 ? '' : 's');
      var onesPart = onesWordEN + ' one' + (this.targetOnes === 1 ? '' : 's');
      sentence = tensPart + ' and ' + onesPart + ' make ' + targetWordEN;
    }
    window.LCSAudio.speak({
      type: 'ui',
      text: sentence,
      lang: lang,
      rate: 0.9
    });
  },

  /* ---------------- pure engine (DOM-free; the gate fuzzes these) ----
     Single committed state {h,t,o}. AUTO mode: adding the 10th one
     bundles synchronously (committed ones ≤ 9 always on the add/remove
     paths — the fuzz invariant). INVITED mode (default): ones may sit
     at 10-19 while the mat OFFERS the bundle; the child's tap calls
     engineMakeTen. breakTen is the borrow in BOTH modes (the transient
     10-19 state is the point of a borrow) and stamps _decomposed —
     the subtract grader requires it (the regroup-core recipe). */
  engineNew: function (opts) {
    opts = opts || {};
    return { h: 0, t: 0, o: 0, bundleMode: opts.bundle || 'invited', maxPlaces: opts.maxPlaces || 2, _decomposed: false };
  },
  engineValue: function (st) { return st.h * 100 + st.t * 10 + st.o; },
  engineAddOne: function (st) {
    if (st.bundleMode === 'auto') {
      if (st.o < 9) { st.o += 1; return 'added'; }
      /* the 10th one: bundle synchronously (cascade to a hundred when full) */
      if (st.t < 9) { st.t += 1; st.o = 0; return 'snapped'; }
      if (st.maxPlaces >= 3 && st.h < 9) { st.h += 1; st.t = 0; st.o = 0; return 'snapped'; }
      return 'cap';
    }
    if (st.o < 19) { st.o += 1; return 'added'; }
    return 'cap';
  },
  engineAddTen: function (st) {
    var cap = (st.bundleMode === 'invited' && st.maxPlaces >= 3) ? 19 : 9;
    if (st.t < cap) { st.t += 1; return 'added'; }
    return 'cap';
  },
  engineAddHundred: function (st) {
    if (st.maxPlaces >= 3 && st.h < 9) { st.h += 1; return 'added'; }
    return 'cap';
  },
  engineRemove: function (st, place) {
    if (place === 'ones' && st.o > 0) { st.o -= 1; return true; }
    if (place === 'tens' && st.t > 0) { st.t -= 1; return true; }
    if (place === 'hundreds' && st.h > 0) { st.h -= 1; return true; }
    return false;
  },
  engineCanMakeTen: function (st) { return st.o >= 10 && st.t < 9 + (st.maxPlaces >= 3 ? 1 : 0); },
  engineMakeTen: function (st) { if (st.o >= 10) { st.o -= 10; st.t += 1; return true; } return false; },
  engineCanMakeHundred: function (st) { return st.t >= 10 && st.maxPlaces >= 3 && st.h < 9; },
  engineMakeHundred: function (st) { if (st.t >= 10 && st.maxPlaces >= 3) { st.t -= 10; st.h += 1; return true; } return false; },
  engineBreakTen: function (st) { if (st.t >= 1 && st.o <= 9) { st.t -= 1; st.o += 10; st._decomposed = true; return true; } return false; },
  engineBreakHundred: function (st) { if (st.h >= 1 && st.t <= 9) { st.h -= 1; st.t += 10; st._decomposed = true; return true; } return false; },
  /* the borrow is load-bearing: a correct difference WITHOUT the break
     is rejected (regroup-core recipe) — and the mat must be canonical */
  gradeSubtract: function (st, a, b) {
    return this.engineValue(st) === a - b && st._decomposed === true && st.o <= 9 && st.t <= 9;
  },
  /* the canonical-state test the word-highlight honesty hangs on */
  engineCanonical: function (st) { return st.o <= 9 && st.t <= 9; },

  /* wrappers over the splices */
  _numberWord: function (n, lang, mode, capitalize) {
    lang = lang || (this.api && this.api.lang) || 'en';
    mode = mode || 'cardinal';
    if (n < 0 || n > 999) return String(n);
    var helper = this.NUM_WORDS_HELPERS[lang] || this.NUM_WORDS_HELPERS.en;
    var word = helper(n, mode);
    if (capitalize && word) word = word.charAt(0).toUpperCase() + word.slice(1);
    return word;
  },
  wordSpans: function (lang, n) {
    var fn = this.PV_WORD_SPANS[lang] || this.PV_WORD_SPANS.en;
    return fn(n);
  },
  /* speak the decomposition sentence via the verbatim spliced core fn */
  speakDecomposition: function () {
    var st = this.st;
    var ctx = {
      language: this.api.lang,
      places: this._places(),
      targetHundreds: st.h, targetTens: st.t, targetOnes: st.o,
      targetNumber: this.engineValue(st),
      _numberWord: this._numberWord.bind(this)
    };
    this._DECOMP_SPEAK.call(ctx);
  },

  /* =========================== lifecycle =========================== */

  STORE_KEY: 'lcs:place-value-lab:v1',
  ENT_TRUST_DAYS: 14,
  C: { T: '#146B5E', CORAL: '#F2784B', CORALD: '#C9502A', FACE: '#FBF3E4', HONEY: '#F2C879', HONEYD: '#B98A2E', CARD: '#FFFEFB' },

  defaults: { bundle: 'invited', wordHighlight: true, hundreds: false, speakOnChange: true },
  settings: [
    { key: 'bundle', type: 'choice', labelKey: 'setBundle', options: [
      { value: 'invited', labelKey: 'setBundleInvited' },
      { value: 'auto', labelKey: 'setBundleAuto' }
    ]},
    { key: 'wordHighlight', type: 'toggle', labelKey: 'setHighlight' },
    { key: 'hundreds', type: 'toggle', labelKey: 'setHundreds' },
    { key: 'speakOnChange', type: 'toggle', labelKey: 'setSpeak' }
  ],

  init: function (api) {
    this.api = api;
    this.premium = false;
    this.mode = 'build';
    this.show = { target: null, kind: 'numeral', phase: 'set' };
    this.sub = { a: null, b: null, phase: 'idle', removedT: 0, removedO: 0 };
    this._speakTimer = null;
    this._echoTimer = null;

    this._store = this._loadStore() || {};
    if (!this._store.v) this._store = { v: 1, ent: null, mats: [] };
    /* resolver-side normalization (the async-entitlement rule) */
    this._store.mats = (this._store.mats || []).filter(function (m) {
      return m && typeof m.label === 'string' && m.h >= 0 && m.h <= 9 && m.t >= 0 && m.t <= 9 && m.o >= 0 && m.o <= 9;
    }).slice(0, 12);
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    this.st = this.engineNew({ bundle: api.settings.bundle, maxPlaces: this._maxPlaces() });
    /* the demo pose: 24 — the inversion number */
    this.st.t = 2; this.st.o = 4;

    this._fetchEntitlement();
  },
  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)); } catch (_) { return null; }
  },
  _saveStore: function () {
    var st = this._store;
    st.settings = {};
    for (var i = 0; i < this.settings.length; i++) st.settings[this.settings[i].key] = this.api.settings[this.settings[i].key];
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(st)); } catch (_) {}
  },
  _fetchEntitlement: function () {
    var self = this;
    var cached = this._store.ent;
    var trustCache = function () {
      if (cached && cached.tier === 'full' && cached.checkedAt) {
        var age = (Date.now() - new Date(cached.checkedAt).getTime()) / 86400000;
        if (age <= self.ENT_TRUST_DAYS) { self.premium = true; self._applyEntitlement(); }
      }
    };
    var token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}
    if (!token) return;
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { trustCache(); return; }
        var tier = j.user && j.user.subscriptionTier;
        var sub = j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        self._applyEntitlement();
      })
      .catch(function () { trustCache(); });
  },
  _applyEntitlement: function () {
    /* premium may change maxPlaces — re-derive in the resolver, not init */
    this.st.maxPlaces = this._maxPlaces();
    if (this.st.maxPlaces < 3 && this.st.h > 0) { this.st.h = 0; }
    if (this._wrap) this.render();
  },
  _maxPlaces: function () {
    return (this.premium && this.api.settings.hundreds) ? 3 : 2;
  },

  fmt: function (key, args) {
    var s = this.api.t(key);
    return s.replace(/\{(\w+)\}/g, function (m2, k) { return (args && k in args) ? String(args[k]) : m2; });
  },
  _reducedMotion: function () {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  _places: function () {
    return this._maxPlaces() >= 3 ? ['hundreds', 'tens', 'ones'] : ['tens', 'ones'];
  },
  _speakNow: function (text) {
    try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.9 }); } catch (_) {}
    this.api.announce(text);
  },
  _speakNumber: function (n) {
    try { LCSAudio.speak({ type: 'number', text: this._numberWord(n, this.api.lang), lang: this.api.lang, rate: 0.9 }); } catch (_) {}
  },

  /* debounced settle-speech (speech is punctuation, not narration) */
  _settleSpeech: function () {
    var self = this;
    if (this._speakTimer) clearTimeout(this._speakTimer);
    if (!this.api.settings.speakOnChange || !this._userGestured) return;
    if (!this.engineCanonical(this.st)) return;
    this._speakTimer = setTimeout(function () {
      self._speakNumber(self.engineValue(self.st));
    }, 1200);
  },

  /* ============================ render ============================= */

  render: function () {
    var api = this.api, self = this;
    var stage = api.stage;
    /* cancel queued echo steps — their chip nodes die with this render */
    (this._echoTimers || []).forEach(clearTimeout);
    this._echoTimers = [];
    stage.innerHTML = '';
    document.body.classList.add('pvl-wide');
    var wrap = api.el('div', 'pvl-wrap');
    this._wrap = wrap;
    var places = this._places();
    wrap.style.setProperty('--pvl-p', String(places.length));

    /* mode prompt strip — its extra height puts the page in COMPACT
       (the dock must stay above the 1024×768 fold in every mode) */
    var prompt = this._buildPrompt();
    if (prompt) { wrap.classList.add('compact'); wrap.appendChild(prompt); }

    /* ---- the display band: digit cards + word line ---- */
    var top = api.el('div', 'pvl-top');
    var digits = api.el('div', 'pvl-grid pvl-digits');
    var value = this.engineValue(this.st);
    var dvals = { hundreds: Math.floor(value / 100), tens: Math.floor(value / 10) % 10, ones: value % 10 };
    var slotKeys = { hundreds: 'slotH', tens: 'slotT', ones: 'slotO' };
    this._digitEls = {};
    places.forEach(function (pl) {
      var card = api.el('button', 'pvl-digit pvl-hue-' + pl);
      card.type = 'button';
      card.setAttribute('aria-label', api.t(slotKeys[pl]) + ' ' + dvals[pl] + ' — ' + api.t('tapDigitAria'));
      var lbl = api.el('span', 'pvl-slotlbl');
      lbl.textContent = api.t(slotKeys[pl]);
      var dg = api.el('span', 'pvl-dg' + (dvals[pl] === 0 && pl !== 'ones' && value < (pl === 'hundreds' ? 100 : 10) ? ' ghost' : ''));
      dg.textContent = String(dvals[pl]);
      card.append(lbl, dg);
      card.addEventListener('click', function () { self._interrogate(pl); });
      digits.appendChild(card);
      self._digitEls[pl] = card;
    });
    top.appendChild(digits);

    /* the word line */
    var wordRow = api.el('div', 'pvl-wordrow');
    var word = api.el('div', 'pvl-word');
    this._wordEl = word;
    if (!this.engineCanonical(this.st)) {
      /* non-canonical: the highlight would lie. In build/show, invite
         the bundle; in subtract the 10+ loose ones ARE the borrow —
         no invite (the prompt strip carries the instruction). */
      if (this.mode !== 'sub') {
        var invite = api.el('span', 'pvl-invite');
        invite.textContent = api.t('bundleInvite');
        word.appendChild(invite);
      }
    } else {
      this._renderSpans(word, value);
    }
    wordRow.appendChild(word);
    /* speak chips */
    var spk = api.el('button', 'pvl-speak');
    spk.type = 'button';
    spk.setAttribute('aria-label', api.t('speakWordAria'));
    spk.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg>';
    spk.addEventListener('click', function () { self._userGestured = true; self._speakNumber(self.engineValue(self.st)); self._echo(); });
    var spkD = api.el('button', 'pvl-speak decomp');
    spkD.type = 'button';
    spkD.setAttribute('aria-label', api.t('speakDecompAria'));
    spkD.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="5" width="7" height="14" rx="1.5"/><rect x="14" y="11" width="7" height="8" rx="1.5"/></svg>';
    spkD.addEventListener('click', function () { self._userGestured = true; self.speakDecomposition(); });
    wordRow.append(spk, spkD);
    top.appendChild(wordRow);

    /* the echo-arc overlay */
    var arcSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arcSvg.setAttribute('class', 'pvl-arcs');
    arcSvg.setAttribute('aria-hidden', 'true');
    top.appendChild(arcSvg);
    this._arcSvg = arcSvg;
    this._topEl = top;
    wrap.appendChild(top);

    /* ---- the mat band ---- */
    var mat = api.el('div', 'pvl-grid pvl-mat');
    this._trays = {};
    places.forEach(function (pl) { mat.appendChild(self._buildCol(pl)); });
    wrap.appendChild(mat);

    /* ---- the dock ---- */
    wrap.appendChild(this._buildDock());

    stage.appendChild(wrap);
    this._paintBlocks();
    this._paintAffordances();
  },

  _buildCol: function (pl) {
    var api = this.api, self = this;
    var colKeys = { hundreds: 'colHundreds', tens: 'colTens', ones: 'colOnes' };
    var addKeys = { hundreds: 'addHundred', tens: 'addTen', ones: 'addOne' };
    var col = api.el('div', 'pvl-col pvl-col--' + pl);
    var lbl = api.el('div', 'pvl-collbl');
    lbl.textContent = api.t(colKeys[pl]);
    col.appendChild(lbl);
    var add = api.el('button', 'pvl-add pvl-hue-' + pl);
    add.type = 'button';
    add.setAttribute('aria-label', api.t(addKeys[pl]));
    add.textContent = '+';
    add.addEventListener('click', function () { self._userGestured = true; self._add(pl); });
    col.appendChild(add);
    var tray = api.el('div', 'pvl-tray pvl-tray--' + pl);
    col.appendChild(tray);
    this._trays[pl] = tray;
    /* context regroup buttons live under the column */
    var ctx = api.el('div', 'pvl-ctx');
    col.appendChild(ctx);
    this._ctx = this._ctx || {};
    this._ctx[pl] = ctx;
    return col;
  },

  /* re-create the blocks per paint (≤27 nodes, the core recipe) */
  _paintBlocks: function () {
    var api = this.api, self = this;
    var st = this.st;
    var srKeys = { hundreds: 'srHundredFlat', tens: 'srTenRod', ones: 'srUnitCube' };
    var counts = { hundreds: st.h, tens: st.t, ones: st.o };
    this._places().forEach(function (pl) {
      var tray = self._trays[pl];
      if (!tray) return;
      tray.innerHTML = '';
      if (pl === 'ones') {
        /* the 5×2 ghost grid — "how close to ten" always visible */
        for (var g = 0; g < Math.max(10, counts.ones); g++) {
          var slot = api.el('div', 'pvl-slot' + (g >= 10 ? ' extra' : ''));
          if (g < counts.ones) {
            var cube = self._blockBtn('cube', srKeys.ones, pl, g);
            slot.appendChild(cube);
          }
          tray.appendChild(slot);
        }
      } else {
        for (var i = 0; i < counts[pl]; i++) {
          tray.appendChild(self._blockBtn(pl === 'tens' ? 'rod' : 'flat', srKeys[pl], pl, i));
        }
      }
    });
  },
  _blockBtn: function (kind, srKey, place, idx) {
    var api = this.api, self = this;
    var b = api.el('button', 'pvl-block pvl-' + kind + (this._marked && this._marked[place] > idx ? ' marked' : ''));
    b.type = 'button';
    b.setAttribute('aria-label', api.t(srKey));
    b.innerHTML = kind === 'cube' ? this._cubeSvg() : kind === 'rod' ? this._rodSvg() : this._flatSvg();
    b.addEventListener('click', function () { self._userGestured = true; self._removeBlock(place); });
    return b;
  },
  _cubeSvg: function () {
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="6" y="6" width="88" height="88" rx="14" fill="#F2784B" stroke="#C9502A" stroke-width="5"/></svg>';
  },
  _rodSvg: function () {
    var lines = '';
    for (var i = 1; i < 10; i++) lines += '<line x1="8" x2="92" y1="' + (i * 50) + '" y2="' + (i * 50) + '" stroke="#FFFEFB" stroke-width="6"/>';
    return '<svg viewBox="0 0 100 500" preserveAspectRatio="none" aria-hidden="true"><rect x="4" y="4" width="92" height="492" rx="12" fill="#146B5E" stroke="#0E4A41" stroke-width="4"/>' + lines + '</svg>';
  },
  _flatSvg: function () {
    var g = '';
    for (var i = 1; i < 10; i++) {
      g += '<line x1="' + (i * 10) + '" x2="' + (i * 10) + '" y1="2" y2="98" stroke="#146B5E" stroke-width="1.4" opacity="0.55"/>';
      g += '<line y1="' + (i * 10) + '" y2="' + (i * 10) + '" x1="2" x2="98" stroke="#146B5E" stroke-width="1.4" opacity="0.55"/>';
    }
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="2" y="2" width="96" height="96" rx="8" fill="#F2C879" stroke="#B98A2E" stroke-width="3"/>' + g + '</svg>';
  },

  /* the word line spans */
  _renderSpans: function (host, value) {
    var api = this.api, self = this;
    var spans = this.wordSpans(api.lang, value);
    var hi = !!api.settings.wordHighlight;
    this._spanEls = {};
    var st = this.st;
    spans.forEach(function (s) {
      var el = api.el('span', 'pvl-span pvl-part-' + s.p + (hi ? '' : ' plain'));
      el.textContent = s.t;
      host.appendChild(el);
      if (!self._spanEls[s.p]) self._spanEls[s.p] = el;
      /* the 304 case: a grey placeholder where the tens part would sit */
      if (s.p === 'hundreds' && st.h > 0 && st.t === 0 && st.o > 0 && hi) {
        var ph = api.el('span', 'pvl-span pvl-part-none');
        ph.textContent = api.t('noTensChip');
        host.appendChild(ph);
      }
    });
    /* the fr mixed treatment */
    if (this._spanEls.mixed && hi) {
      var note = api.el('span', 'pvl-mixednote');
      note.textContent = api.t('mixedNote');
      host.appendChild(note);
    }
  },

  /* ============================ verbs ============================= */

  _add: function (pl) {
    var st = this.st;
    var r = pl === 'ones' ? this.engineAddOne(st) : pl === 'tens' ? this.engineAddTen(st) : this.engineAddHundred(st);
    if (r === 'cap') { this._nudgeCol(pl); return; }
    if (r === 'snapped') {
      /* auto mode: state already canonical — play the full snap */
      this.render();
      this._animSnap();
      this._sfxSnap();
    } else {
      this.render();
      this._pulseChanged(pl);
    }
    this._settleSpeech();
    this._maybeCheckSub();
  },
  _removeBlock: function (pl) {
    if (this.engineRemove(this.st, pl)) {
      this.render();
      this._pulseChanged(pl);
      this._settleSpeech();
      this._maybeCheckSub();
    }
  },
  _makeTen: function () {
    if (!this.engineCanMakeTen(this.st)) return;
    var fromRects = this._cubeRects(10);
    this.engineMakeTen(this.st);
    this.render();
    this._animSnap(fromRects);
    this._sfxSnap();
    this._settleSpeech();
  },
  _makeHundred: function () {
    if (!this.engineCanMakeHundred(this.st)) return;
    this.engineMakeHundred(this.st);
    this.render();
    this._animSnap();
    this._sfxSnap();
    this._settleSpeech();
  },
  _breakTen: function () {
    var st = this.st;
    var rodRect = null;
    var rods = this._trays.tens ? this._trays.tens.querySelectorAll('.pvl-rod') : [];
    if (rods.length) rodRect = rods[rods.length - 1].getBoundingClientRect();
    if (!this.engineBreakTen(st)) return;
    this.render();
    this._animPop(rodRect);
    this._sfxPop();
    this._settleSpeech();
  },
  _breakHundred: function () {
    if (!this.engineBreakHundred(this.st)) return;
    this.render();
    this._animPop(null);
    this._sfxPop();
    this._settleSpeech();
  },
  _nudgeCol: function (pl) {
    var tray = this._trays[pl];
    if (tray && tray.animate && !this._reducedMotion()) tray.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-4px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(0)' }], { duration: 260 });
  },

  /* the context affordances: Make-a-ten (invited), Break-a-ten, hundreds */
  _paintAffordances: function () {
    var api = this.api, self = this, st = this.st;
    var ctxO = this._ctx.ones, ctxT = this._ctx.tens, ctxH = this._ctx.hundreds;
    if (ctxO) {
      ctxO.innerHTML = '';
      /* never offer re-bundling mid-borrow — it would undo the break */
      if (this.engineCanMakeTen(st) && this.mode !== 'sub') {
        var mk = api.el('button', 'pvl-ctxbtn make');
        mk.type = 'button';
        mk.textContent = api.t('makeTen');
        mk.addEventListener('click', function () { self._userGestured = true; self._makeTen(); });
        ctxO.appendChild(mk);
      } else if (st.t >= 1 && st.o <= 9 && (this.mode === 'sub' ? this._subNeedsBreak() : this.mode === 'build')) {
        var bk = api.el('button', 'pvl-ctxbtn break' + (this.mode === 'sub' && this._subNeedsBreak() ? ' glow' : ''));
        bk.type = 'button';
        bk.textContent = api.t('breakTen');
        bk.addEventListener('click', function () { self._userGestured = true; self._breakTen(); });
        ctxO.appendChild(bk);
      }
    }
    if (ctxT) {
      ctxT.innerHTML = '';
      if (this.engineCanMakeHundred(st)) {
        var mh = api.el('button', 'pvl-ctxbtn make');
        mh.type = 'button';
        mh.textContent = api.t('makeHundred');
        mh.addEventListener('click', function () { self._userGestured = true; self._makeHundred(); });
        ctxT.appendChild(mh);
      } else if (st.h >= 1 && st.t <= 9 && this.mode === 'build') {
        var bh = api.el('button', 'pvl-ctxbtn break');
        bh.type = 'button';
        bh.textContent = api.t('breakHundred');
        bh.addEventListener('click', function () { self._userGestured = true; self._breakHundred(); });
        ctxT.appendChild(bh);
      }
    }
    if (ctxH) ctxH.innerHTML = '';
    /* the invited rubber-band affordance on the ones tray */
    var tray = this._trays.ones;
    if (tray) tray.classList.toggle('offer', this.engineCanMakeTen(st) && this.mode !== 'sub');
  },

  /* ======================= animations & sound ====================== */

  _cubeRects: function (n) {
    var tray = this._trays.ones;
    if (!tray) return [];
    var cubes = tray.querySelectorAll('.pvl-cube');
    var rects = [];
    for (var i = Math.max(0, cubes.length - n); i < cubes.length; i++) rects.push(cubes[i].getBoundingClientRect());
    return rects;
  },
  /* the rubber-band snap: clone cubes fly into the newest rod */
  _animSnap: function (fromRects) {
    if (this._reducedMotion()) { this._pulseChanged('tens'); return; }
    var rods = this._trays.tens ? this._trays.tens.querySelectorAll('.pvl-rod') : [];
    if (!rods.length) { this._pulseChanged('tens'); return; }
    var rod = rods[rods.length - 1];
    var to = rod.getBoundingClientRect();
    rod.classList.add('pvl-incoming');
    var overlay = document.createElement('div');
    overlay.className = 'pvl-overlay';
    document.body.appendChild(overlay);
    var rects = (fromRects && fromRects.length) ? fromRects : [to];
    var done = 0, total = rects.length;
    var self = this;
    rects.forEach(function (r, i) {
      var c = document.createElement('div');
      c.className = 'pvl-clone';
      c.style.left = r.left + 'px'; c.style.top = r.top + 'px';
      c.style.width = r.width + 'px'; c.style.height = r.height + 'px';
      c.innerHTML = self._cubeSvg();
      overlay.appendChild(c);
      var dx = (to.left + to.width / 2) - (r.left + r.width / 2);
      var dy = (to.top + to.height * (i + 0.5) / total) - (r.top + r.height / 2);
      c.animate([
        { transform: 'translate(0,0) scale(1)' },
        { transform: 'translate(' + dx * 0.7 + 'px,' + dy * 0.7 + 'px) scale(0.82)', offset: 0.6 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(0.5)', opacity: 0.4 }
      ], { duration: 700, delay: i * 25, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'forwards' }).finished.then(fin).catch(fin);
    });
    function fin() {
      done++;
      if (done >= total) {
        overlay.remove();
        rod.classList.remove('pvl-incoming');
        if (rod.animate) rod.animate([{ transform: 'scale(1.12)' }, { transform: 'scale(1)' }], { duration: 220, easing: 'cubic-bezier(.34,1.56,.64,1)' });
        self._pulseChanged('tens');
      }
    }
  },
  /* the pop: a rod bursts into cubes scattering into the ones tray */
  _animPop: function (rodRect) {
    if (this._reducedMotion() || !rodRect) { this._pulseChanged('ones'); return; }
    var tray = this._trays.ones;
    if (!tray) return;
    var to = tray.getBoundingClientRect();
    var overlay = document.createElement('div');
    overlay.className = 'pvl-overlay';
    document.body.appendChild(overlay);
    var self = this, done = 0;
    for (var i = 0; i < 10; i++) {
      var c = document.createElement('div');
      c.className = 'pvl-clone';
      var w = Math.min(44, to.width / 6);
      c.style.left = (rodRect.left + rodRect.width / 2 - w / 2) + 'px';
      c.style.top = (rodRect.top + rodRect.height * (i + 0.5) / 10 - w / 2) + 'px';
      c.style.width = w + 'px'; c.style.height = w + 'px';
      c.innerHTML = this._cubeSvg();
      overlay.appendChild(c);
      var tx = (to.left + (i % 5 + 0.5) * to.width / 5) - (rodRect.left + rodRect.width / 2);
      var ty = (to.top + (Math.floor(i / 5) + 0.5) * Math.min(to.height, 120) / 2) - (rodRect.top + rodRect.height * (i + 0.5) / 10);
      c.animate([
        { transform: 'translate(0,0) scale(0.6)', opacity: 0.9 },
        { transform: 'translate(' + tx * 0.6 + 'px,' + (ty - 30) + 'px) scale(1.05)', offset: 0.55 },
        { transform: 'translate(' + tx + 'px,' + ty + 'px) scale(1)', opacity: 0 }
      ], { duration: 480, delay: i * 15, easing: 'cubic-bezier(.2,.8,.3,1)', fill: 'forwards' }).finished.then(fin).catch(fin);
    }
    function fin() { done++; if (done >= 10) { overlay.remove(); self._pulseChanged('ones'); } }
  },
  _pulseChanged: function (pl) {
    var dg = this._digitEls && this._digitEls[pl];
    var sp = this._spanEls && (this._spanEls[pl] || this._spanEls.teen || this._spanEls.mixed);
    [dg, sp].forEach(function (el) {
      if (el && el.animate) el.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.14)' }, { transform: 'scale(1)' }], { duration: 320, easing: 'ease-out' });
    });
  },

  /* one AudioContext; every sound sine-built, ≤0.3 gain (no-alarm rules) */
  _ctx2: null,
  _audio: function () {
    if (!this._ctx2) { try { this._ctx2 = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) {} }
    if (this._ctx2 && this._ctx2.state === 'suspended') { try { this._ctx2.resume(); } catch (_) {} }
    return this._ctx2;
  },
  _note: function (freq, at, dur, peak) {
    var ctx = this._audio();
    if (!ctx) return;
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, ctx.currentTime + at);
    g.gain.exponentialRampToValueAtTime(Math.min(peak || 0.22, 0.3), ctx.currentTime + at + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + at + dur);
    o.connect(g); g.connect(ctx.destination);
    o.start(ctx.currentTime + at); o.stop(ctx.currentTime + at + dur + 0.05);
  },
  _sfxSnap: function () { this._note(392, 0, 0.12, 0.2); this._note(523, 0.1, 0.16, 0.24); this._note(659, 0.22, 0.2, 0.2); },
  _sfxPop: function () { this._note(659, 0, 0.08, 0.24); this._note(440, 0.07, 0.14, 0.18); },

  /* ===================== the echo-arc primitive ==================== */

  /* spoken order = span order (that IS the moat); arcs cross for de/nl/da */
  _echo: function () {
    var self = this;
    if (!this.api.settings.wordHighlight || !this.engineCanonical(this.st)) return;
    if (!this._spanEls || !this._arcSvg) return;
    while (this._arcSvg.firstChild) this._arcSvg.removeChild(this._arcSvg.firstChild);
    var order = [];
    var seen = {};
    var wordEl = this._wordEl;
    if (!wordEl) return;
    var kids = wordEl.querySelectorAll('.pvl-span');
    for (var i = 0; i < kids.length; i++) {
      var cls = kids[i].className.match(/pvl-part-(\w+)/);
      var p = cls && cls[1];
      if (p && !seen[p] && (p === 'hundreds' || p === 'tens' || p === 'ones' || p === 'teen' || p === 'mixed')) { seen[p] = true; order.push({ p: p, el: kids[i] }); }
    }
    var reduced = this._reducedMotion();
    var step = reduced ? 300 : 620;
    this._echoTimers = this._echoTimers || [];
    order.forEach(function (item, idx) {
      self._echoTimers.push(setTimeout(function () { self._echoOne(item.p, item.el, reduced); }, idx * step));
    });
  },
  _echoOne: function (p, chipEl, reduced) {
    /* a queued step may fire after a re-render — a detached chip reads
       rect (0,0) and would draw a corner arc. Skip stale nodes. */
    if (chipEl && !chipEl.isConnected) return;
    var targets = p === 'teen' || p === 'mixed' ? ['tens', 'ones'] : [p];
    var self = this;
    if (chipEl && chipEl.animate) chipEl.animate([{ filter: 'brightness(1)' }, { filter: 'brightness(0.82)' }, { filter: 'brightness(1)' }], { duration: 300 });
    targets.forEach(function (pl) {
      var dg = self._digitEls[pl];
      if (!dg) return;
      if (!reduced && chipEl && self._arcSvg && (p === 'tens' || p === 'ones' || p === 'hundreds')) {
        var topR = self._topEl.getBoundingClientRect();
        var a = chipEl.getBoundingClientRect(), b = dg.getBoundingClientRect();
        var x1 = a.left + a.width / 2 - topR.left, y1 = a.top - topR.top;
        var x2 = b.left + b.width / 2 - topR.left, y2 = b.bottom - topR.top;
        var midY = Math.min(y1, y2) - 26;
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M' + x1 + ' ' + y1 + ' Q' + ((x1 + x2) / 2) + ' ' + midY + ' ' + x2 + ' ' + y2);
        path.setAttribute('class', 'pvl-arc pvl-arc-' + p);
        self._arcSvg.appendChild(path);
        var len = path.getTotalLength();
        path.style.strokeDasharray = String(len);
        path.style.strokeDashoffset = String(len);
        path.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 320, fill: 'forwards', easing: 'ease-out' });
        setTimeout(function () { if (path.parentNode) path.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 350, fill: 'forwards' }); }, 900);
        setTimeout(function () { if (path.parentNode) path.parentNode.removeChild(path); }, 1300);
      }
      setTimeout(function () {
        if (dg.animate) dg.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.16)' }, { transform: 'scale(1)' }], { duration: 280 });
      }, reduced ? 80 : 300);
    });
  },
  /* tap-a-digit: the "Wo steckt die Vier?" gesture, reversed */
  _interrogate: function (pl) {
    this._userGestured = true;
    var st = this.st;
    if (!this.engineCanonical(st)) return;
    var chip = this._spanEls && (this._spanEls[pl] || this._spanEls.teen || this._spanEls.mixed);
    if (chip && chip.animate) chip.animate([{ filter: 'brightness(1)' }, { filter: 'brightness(0.78)' }, { filter: 'brightness(1)' }], { duration: 450 });
    var col = this._trays[pl];
    if (col && col.parentNode && col.parentNode.animate) col.parentNode.animate([{ opacity: 1 }, { opacity: 0.55 }, { opacity: 1 }], { duration: 450 });
    var value = pl === 'hundreds' ? st.h * 100 : pl === 'tens' ? st.t * 10 : st.o;
    this._speakNumber(value);
    this._echoOne(pl, chip, this._reducedMotion());
  },

  /* ============================ dock =============================== */

  /* ====================== Show me N (free) ========================= */

  /* ≥7 originals + no-repeat-till-exhausted + reshuffle ≠ previous —
     the house variety rule. Inversion-sensitive targets. */
  SHOW_POOL: [24, 47, 61, 35, 83, 52, 76, 91, 68, 39, 17, 45],
  _nextShow: function () {
    var sh = this.show;
    if (!sh.order || !sh.order.length) {
      var prevFirst = sh.target;
      var order = this.SHOW_POOL.slice();
      for (var i = order.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var tmp = order[i]; order[i] = order[j]; order[j] = tmp; }
      if (order[0] === prevFirst && order.length > 1) { var t2 = order[0]; order[0] = order[1]; order[1] = t2; }
      sh.order = order;
    }
    sh.target = sh.order.shift();
    sh.kind = Math.random() < 0.45 ? 'word' : 'numeral';
    sh.phase = 'set';
    this._showNote = null;
    /* fresh mat for the child to build on */
    this.st = this.engineNew({ bundle: this.api.settings.bundle, maxPlaces: this._maxPlaces() });
    this.render();
    if (sh.kind === 'word' && this._userGestured) this._speakNumber(sh.target);
  },
  _checkShow: function () {
    var sh = this.show;
    var built = this.engineValue(this.st);
    var word = this._numberWord(built, this.api.lang);
    if (built === sh.target && this.engineCanonical(this.st)) {
      sh.phase = 'done';
      this._showNote = this.fmt('showNice', { n: built, word: word });
      this._showNoteKind = 'good';
      this._speakNow(this._showNote);
      this.render();
      var card = this._wrap.querySelector('.pvl-top');
      if (card && card.animate && !this._reducedMotion()) card.animate([{ filter: 'drop-shadow(0 0 0 rgba(242,200,121,0))' }, { filter: 'drop-shadow(0 0 18px rgba(242,200,121,.9))' }, { filter: 'drop-shadow(0 0 0 rgba(242,200,121,0))' }], { duration: 1100 });
    } else {
      /* the warm compare: name what the child DID build — the miss IS
         the inversion lesson. Never red. */
      this._showNote = this.fmt('showMiss', { n: built, word: word });
      this._showNoteKind = '';
      this._speakNow(this._showNote);
      this.render();
      this._echo();
    }
  },

  /* ==================== Subtract lab (premium) ===================== */

  _nextSub: function () {
    /* 2-digit − 2-digit with the borrow forced: onesOf(a) < onesOf(b) */
    var at = 3 + Math.floor(Math.random() * 6);           /* 3-8 */
    var ao = 1 + Math.floor(Math.random() * 4);           /* 1-4 */
    var bt = 1 + Math.floor(Math.random() * (at - 1));    /* 1..at-1 */
    var bo = ao + 1 + Math.floor(Math.random() * (9 - ao)); /* ao+1..9 */
    this.sub = { a: at * 10 + ao, b: bt * 10 + bo, phase: 'work', removedT: 0, removedO: 0 };
    this.st = this.engineNew({ bundle: this.api.settings.bundle, maxPlaces: 2 });
    this.st.t = at; this.st.o = ao;
    this._marked = { tens: bt, ones: bo };
    this._subNote = this.api.t('subRemove');
    this._subNoteKind = '';
    this.render();
  },
  _subNeedsBreak: function () {
    var s = this.sub;
    if (!s || s.phase !== 'work' || this.st._decomposed) return false;
    return this.st.o < (s.b % 10);
  },
  _maybeCheckSub: function () {
    var s = this.sub;
    if (this.mode !== 'sub' || !s || s.phase !== 'work') return;
    if (this._subNeedsBreak()) { this._subNote = this.api.t('subNudge'); this._subNoteKind = ''; this._paintSubNote(); return; }
    if (this.gradeSubtract(this.st, s.a, s.b)) {
      s.phase = 'done';
      this._marked = null;
      this._subNote = this.fmt('subDone', { a: s.a, b: s.b, c: s.a - s.b });
      this._subNoteKind = 'good';
      this._speakNow(this._subNote);
      this.render();
    }
  },
  _paintSubNote: function () {
    var el = this._wrap && this._wrap.querySelector('.pvl-tasknote');
    if (el) el.textContent = this._subNote;
  },

  /* ===================== the prompt strip =========================== */

  _buildPrompt: function () {
    var api = this.api, self = this;
    if (this.mode === 'show' && this.show.target !== null) {
      var box = api.el('div', 'pvl-promptbox');
      var p = api.el('div', 'pvl-prompt');
      if (this.show.kind === 'numeral') {
        var parts = this.fmt('showPrompt', { n: ' ' }).split(' ');
        p.appendChild(document.createTextNode(parts[0]));
        var em = api.el('em', '');
        em.textContent = String(this.show.target);
        p.appendChild(em);
        if (parts[1]) p.appendChild(document.createTextNode(parts[1]));
      } else {
        p.textContent = api.t('showPromptWord');
        var hear = api.el('button', 'pvl-chip');
        hear.type = 'button';
        hear.textContent = '🔊 ' + api.t('hearAgain');
        hear.addEventListener('click', function () { self._userGestured = true; self._speakNumber(self.show.target); });
        p.appendChild(document.createTextNode(' '));
        p.appendChild(hear);
      }
      box.appendChild(p);
      var act = api.el('button', 'pvl-big coral');
      act.type = 'button';
      act.textContent = api.t(this.show.phase === 'done' ? 'nextBtn' : 'checkBtn');
      act.addEventListener('click', function () {
        self._userGestured = true;
        if (self.show.phase === 'done') self._nextShow();
        else self._checkShow();
      });
      box.appendChild(act);
      if (this._showNote) {
        var note = api.el('div', 'pvl-tasknote' + (this._showNoteKind === 'good' ? ' good' : ''));
        note.textContent = this._showNote;
        box.appendChild(note);
      }
      return box;
    }
    if (this.mode === 'sub' && this.sub.a !== null) {
      var box2 = api.el('div', 'pvl-promptbox');
      var p2 = api.el('div', 'pvl-prompt');
      var txt = this.fmt('subPrompt', { a: this.sub.a, b: ' ' }).split(' ');
      p2.appendChild(document.createTextNode(txt[0]));
      var em2 = api.el('em', '');
      em2.textContent = String(this.sub.b);
      p2.appendChild(em2);
      if (txt[1]) p2.appendChild(document.createTextNode(txt[1]));
      box2.appendChild(p2);
      if (this.sub.phase === 'done') {
        var nx = api.el('button', 'pvl-big coral');
        nx.type = 'button';
        nx.textContent = api.t('nextBtn');
        nx.addEventListener('click', function () { self._userGestured = true; self._nextSub(); });
        box2.appendChild(nx);
      }
      if (this._subNote) {
        var note2 = api.el('div', 'pvl-tasknote' + (this._subNoteKind === 'good' ? ' good' : ''));
        note2.textContent = this._subNote;
        box2.appendChild(note2);
      }
      return box2;
    }
    return null;
  },

  /* ======================= keypad + workmats ======================= */

  _openKeypad: function () {
    var api = this.api, self = this;
    this._closePanel();
    var scrim = api.el('div', 'pvl-scrim');
    var panel = api.el('div', 'pvl-panel');
    var disp = api.el('div', 'pvl-kpdisp');
    var buf = '';
    var maxLen = this._maxPlaces() >= 3 ? 3 : 2;
    var refresh = function () { disp.textContent = buf || '–'; };
    refresh();
    panel.appendChild(disp);
    var grid = api.el('div', 'pvl-kpgrid');
    '1234567890'.split('').forEach(function (d) {
      var b = api.el('button', 'pvl-chip');
      b.type = 'button';
      b.textContent = d;
      b.addEventListener('click', function () { if (buf.length < maxLen) { buf += d; refresh(); } });
      grid.appendChild(b);
    });
    panel.appendChild(grid);
    var row = api.el('div', 'pvl-kprow');
    var clr = api.el('button', 'pvl-chip');
    clr.type = 'button';
    clr.textContent = api.t('keypadClear');
    clr.addEventListener('click', function () { buf = ''; refresh(); });
    var go = api.el('button', 'pvl-big coral');
    go.type = 'button';
    go.textContent = api.t('keypadDone');
    go.addEventListener('click', function () {
      var v = parseInt(buf || '0', 10);
      var max = self._maxPlaces() >= 3 ? 999 : 99;
      if (v > max) v = max;
      self.st = self.engineNew({ bundle: api.settings.bundle, maxPlaces: self._maxPlaces() });
      self.st.h = Math.floor(v / 100); self.st.t = Math.floor(v / 10) % 10; self.st.o = v % 10;
      self._userGestured = true;
      self._closePanel();
      self.render();
      self._settleSpeech();
    });
    row.append(clr, go);
    panel.appendChild(row);
    this._mountPanel(scrim, panel);
  },
  _openPanel: function () {
    var api = this.api, self = this;
    this._closePanel();
    var scrim = api.el('div', 'pvl-scrim');
    var panel = api.el('div', 'pvl-panel');
    var head = api.el('div', 'pvl-panelhead');
    head.textContent = api.t('ourMats');
    panel.appendChild(head);
    /* save-current row */
    var saveRow = api.el('div', 'pvl-kprow');
    var input = api.el('input', 'pvl-input');
    input.type = 'text';
    input.maxLength = 40;
    input.placeholder = api.t('matLabelPh');
    var save = api.el('button', 'pvl-chip manage');
    save.type = 'button';
    save.textContent = api.t('saveMat');
    save.addEventListener('click', function () {
      if (self._store.mats.length >= 12) { head.textContent = api.t('matFull'); return; }
      var st = self.st;
      if (!self.engineCanonical(st)) return;
      self._store.mats.push({ id: 'm' + Date.now().toString(36), label: (input.value || String(self.engineValue(st))).trim(), h: st.h, t: st.t, o: st.o, created: new Date().toISOString() });
      self._saveStore();
      self._closePanel();
      self._openPanel();
    });
    saveRow.append(input, save);
    panel.appendChild(saveRow);
    /* the list */
    this._store.mats.forEach(function (m) {
      var row = api.el('div', 'pvl-matrow');
      var load = api.el('button', 'pvl-chip');
      load.type = 'button';
      load.textContent = m.label + ' — ' + (m.h * 100 + m.t * 10 + m.o);
      load.addEventListener('click', function () {
        self.st = self.engineNew({ bundle: api.settings.bundle, maxPlaces: self._maxPlaces() });
        self.st.h = self._maxPlaces() >= 3 ? m.h : 0;
        self.st.t = m.t; self.st.o = m.o;
        if (self._maxPlaces() < 3 && m.h > 0) { self.st.t = Math.min(9, m.t); }
        self.mode = 'build';
        self._userGestured = true;
        self._closePanel();
        self.render();
        self._echo();
      });
      var del = api.el('button', 'pvl-chip');
      del.type = 'button';
      del.textContent = api.t('deleteBtn');
      var armed = false;
      del.addEventListener('click', function () {
        if (!armed) { armed = true; del.textContent = api.t('confirmBtn'); return; }
        self._store.mats = self._store.mats.filter(function (x) { return x.id !== m.id; });
        self._saveStore();
        self._closePanel();
        self._openPanel();
      });
      row.append(load, del);
      panel.appendChild(row);
    });
    this._mountPanel(scrim, panel);
  },
  _mountPanel: function (scrim, panel) {
    var self = this;
    scrim.addEventListener('click', function () { self._closePanel(); });
    document.body.appendChild(scrim);
    document.body.appendChild(panel);
    this._panelEl = panel;
    this._scrimEl = scrim;
  },
  _closePanel: function () {
    if (this._panelEl) { this._panelEl.remove(); this._panelEl = null; }
    if (this._scrimEl) { this._scrimEl.remove(); this._scrimEl = null; }
  },

  _buildDock: function () {
    var api = this.api, self = this;
    var dock = api.el('div', 'pvl-dock');
    var modes = api.el('div', 'pvl-modes');
    [['build', 'modeBuild', true], ['show', 'modeShow', true], ['sub', 'modeSub', this.premium]].forEach(function (m) {
      var chip = api.el('button', 'pvl-chip' + (self.mode === m[0] ? ' active' : '') + (m[2] ? '' : ' locked'));
      chip.type = 'button';
      chip.textContent = api.t(m[1]);
      if (!m[2]) chip.innerHTML += ' <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
      chip.addEventListener('click', function () {
        if (!m[2]) { self._gateInline(dock, 'gateSub'); return; }
        self._setMode(m[0]);
      });
      modes.appendChild(chip);
    });
    dock.appendChild(modes);
    var tools = api.el('div', 'pvl-modes');
    var kp = api.el('button', 'pvl-chip');
    kp.type = 'button';
    kp.textContent = '⌨ ' + api.t('keypadBtn');
    kp.addEventListener('click', function () { self._openKeypad(); });
    tools.appendChild(kp);
    var om = api.el('button', 'pvl-chip manage' + (this.premium ? '' : ' locked'));
    om.type = 'button';
    om.textContent = api.t('ourMats');
    om.addEventListener('click', function () {
      if (!self.premium) { self._gateInline(dock, 'gateSaves'); return; }
      self._openPanel();
    });
    tools.appendChild(om);
    dock.appendChild(tools);
    return dock;
  },
  _setMode: function (m) {
    this.mode = m;
    this.sub = { a: null, b: null, phase: 'idle', removedT: 0, removedO: 0 };
    this._marked = null;
    if (m === 'show') this._nextShow();
    else if (m === 'sub') this._nextSub();
    else this.render();
  },

  _gateInline: function (host, key) {
    var api = this.api;
    var old = (this._wrap || document).querySelector('.pvl-gate');
    if (old) old.remove();
    var gate = api.el('div', 'pvl-gate');
    var msg = api.el('span', 'pvl-gatemsg');
    msg.textContent = api.t(key);
    var a = api.el('a', 'pvl-gatelink');
    a.href = '/' + api.lang + '/pricing?from=tool-place-value-lab';
    a.textContent = api.t('unlock');
    gate.append(msg, a);
    host.insertAdjacentElement('beforebegin', gate);
    setTimeout(function () { if (gate.parentNode) gate.remove(); }, 12000);
  },

  /* shell reset: back to the demo pose; keeps settings + saved mats */
  reset: function () {
    this.mode = 'build';
    this.st = this.engineNew({ bundle: this.api.settings.bundle, maxPlaces: this._maxPlaces() });
    this.st.t = 2; this.st.o = 4;
    this.sub = { a: null, b: null, phase: 'idle', removedT: 0, removedO: 0 };
    this._marked = null;
    if (this._panelEl) this._closePanel();
    this.render();
  },
  onSettings: function () {
    /* the hundreds toggle is premium-gated */
    if (this.api.settings.hundreds && !this.premium) {
      this.api.settings.hundreds = false;
      if (this._wrap) this._gateInline(this._wrap.querySelector('.pvl-dock') || this._wrap, 'gateHundreds');
    }
    this.st.bundleMode = this.api.settings.bundle;
    var mp = this._maxPlaces();
    if (mp !== this.st.maxPlaces) {
      this.st.maxPlaces = mp;
      if (mp < 3 && this.st.h > 0) this.st.h = 0;
    }
    /* switching to auto with a pending offer canonicalizes (full anim) */
    if (this.st.bundleMode === 'auto') {
      var did = false;
      while (this.st.o > 9) { this.engineMakeTen(this.st); did = true; }
      while (this.st.t > 9 && this.st.maxPlaces >= 3) { this.engineMakeHundred(this.st); did = true; }
      if (did) this._sfxSnap();
    }
    this._saveStore();
    this.render();
  }
};

/* per-tool styling: STAGE ONLY + the sanctioned body class */
(function injectCSS() {
  var css = ''
  + 'body.pvl-wide .lcs-app{max-width:min(1120px,97vw);}'
  + '@media (max-width:480px){'
  +   'body.pvl-wide .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}'
  + '}'
  + '.pvl-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(8px,1.4vmin,14px);width:100%;}'
  + '.pvl-grid{display:grid;grid-template-columns:repeat(var(--pvl-p,2),minmax(0,calc(var(--pvl-u,44px) * 6.818)));gap:clamp(10px,2vw,20px);justify-content:center;width:100%;}'

  /* prompt strip */
  + '.pvl-prompt{font-family:var(--lcs-font-display);font-weight:700;color:var(--lcs-structure);'
  +   'font-size:clamp(19px,2.8vmin,30px);text-align:center;}'
  + '.pvl-prompt em{color:#C9502A;font-style:normal;}'

  /* the display band */
  + '.pvl-top{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:8px;}'
  + '.pvl-digits{align-items:end;}'
  + '.pvl-digit{justify-self:center;display:flex;flex-direction:column;align-items:center;gap:2px;'
  +   'background:#FFFEFB;border:none;border-radius:18px;box-shadow:var(--lcs-shadow);cursor:pointer;'
  +   'padding:8px 22px 10px;min-width:84px;min-height:44px;transition:transform .1s var(--lcs-ease);}'
  + '.pvl-digit:active{transform:scale(.97);}'
  + '.pvl-slotlbl{font-family:var(--lcs-font-body);font-weight:800;font-size:13px;letter-spacing:.08em;opacity:.75;}'
  + '.pvl-dg{font-family:var(--lcs-font-display);font-weight:700;font-size:clamp(44px,7vmin,76px);line-height:1;'
  +   'border-bottom:4px solid currentColor;padding:0 4px 2px;font-variant-numeric:tabular-nums;}'
  + '.pvl-dg.ghost{opacity:.28;border-bottom-style:dotted;}'
  + '.pvl-hue-ones{color:#C9502A;}'
  + '.pvl-hue-tens{color:#146B5E;}'
  + '.pvl-hue-hundreds{color:#B98A2E;}'

  /* the word line */
  /* the word chips center on the page; the speak buttons hang right */
  + '.pvl-wordrow{position:relative;display:flex;align-items:center;justify-content:center;gap:10px;'
  +   'width:100%;padding:0 110px;box-sizing:border-box;min-height:48px;}'
  + '.pvl-speak{position:absolute;right:56px;top:50%;transform:translateY(-50%);}'
  + '.pvl-speak.decomp{right:2px;}'
  + '.pvl-speak:active{transform:translateY(calc(-50% + 2px));}'
  + '.pvl-word{display:inline-flex;align-items:baseline;flex-wrap:wrap;justify-content:center;'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:clamp(22px,3.2vmin,34px);line-height:1.35;}'
  + '.pvl-span{border-radius:8px;padding:0 3px;}'
  + '.pvl-span.pvl-part-ones{color:#C9502A;background:rgba(242,120,75,.12);}'
  + '.pvl-span.pvl-part-tens{color:#146B5E;background:rgba(20,107,94,.12);}'
  + '.pvl-span.pvl-part-hundreds{color:#B98A2E;background:rgba(242,200,121,.2);}'
  + '.pvl-span.pvl-part-teen{color:var(--lcs-ink);background:rgba(20,30,28,.06);}'
  + '.pvl-span.pvl-part-mixed{color:var(--lcs-ink);background:rgba(20,30,28,.06);}'
  + '.pvl-span.pvl-part-joiner{color:#4A4A44;background:transparent;font-weight:600;}'
  + '.pvl-span.pvl-part-none{color:#75756D;background:rgba(20,30,28,.06);font-family:var(--lcs-font-body);'
  +   'font-weight:700;font-size:14px;align-self:center;padding:3px 9px;border-radius:999px;margin:0 5px;}'
  + '.pvl-span.plain{color:var(--lcs-ink)!important;background:transparent!important;}'
  + '.pvl-mixednote{font-family:var(--lcs-font-body);font-weight:700;font-size:12.5px;color:#B98A2E;'
  +   'background:#FDF0DC;border-radius:999px;padding:3px 10px;align-self:center;margin-inline-start:6px;}'
  + '.pvl-invite{font-family:var(--lcs-font-display);font-weight:700;font-size:clamp(19px,2.6vmin,27px);color:#B98A2E;}'
  + '.pvl-speak{width:44px;height:44px;flex:none;display:grid;place-items:center;border-radius:50%;'
  +   'background:#F2784B;color:#fff;border:none;cursor:pointer;box-shadow:0 3px 0 0 #C9502A;'
  +   'transition:transform .1s var(--lcs-ease);}'
  + '.pvl-speak.decomp{background:#146B5E;box-shadow:0 3px 0 0 #0E4A41;}'
  + '.pvl-arcs{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible;}'
  + '.pvl-arc{fill:none;stroke-width:3.5;opacity:.9;}'
  + '.pvl-arc-ones{stroke:#C9502A;}'
  + '.pvl-arc-tens{stroke:#146B5E;}'
  + '.pvl-arc-hundreds{stroke:#B98A2E;}'

  /* the mat */
  + '.pvl-col{background:#FFFEFB;border-radius:22px;box-shadow:var(--lcs-shadow);display:flex;'
  +   'flex-direction:column;align-items:center;gap:8px;padding:12px 12px 14px;min-height:calc(var(--pvl-u,44px) * 6.818);}'
  + '.pvl-col--tens{background:linear-gradient(rgba(20,107,94,.06),rgba(20,107,94,.06)),#FFFEFB;}'
  + '.pvl-col--hundreds{background:linear-gradient(rgba(242,200,121,.1),rgba(242,200,121,.1)),#FFFEFB;}'
  + '.pvl-collbl{font-family:var(--lcs-font-body);font-weight:800;font-size:15px;letter-spacing:.06em;'
  +   'text-transform:uppercase;color:var(--lcs-ink-soft);}'
  + '.pvl-add{width:calc(var(--pvl-u,44px) * 1.273);height:calc(var(--pvl-u,44px) * 1.091);border-radius:16px;border:none;cursor:pointer;'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:calc(var(--pvl-u,44px) * .682);line-height:1;color:#fff;'
  +   'background:#F2784B;box-shadow:0 3px 0 0 #C9502A;transition:transform .1s var(--lcs-ease);}'
  + '.pvl-add.pvl-hue-tens{background:#146B5E;box-shadow:0 3px 0 0 #0E4A41;}'
  + '.pvl-add.pvl-hue-hundreds{background:#F2C879;color:#6B4E12;box-shadow:0 3px 0 0 #B98A2E;}'
  + '.pvl-add:active{transform:translateY(2px);box-shadow:none;}'
  /* left-aligned wrap so a 7th rod reads "6 and one more", not a stray */
  + '.pvl-tray{flex:1;width:100%;display:flex;flex-wrap:wrap;gap:6px;align-content:flex-start;'
  +   'justify-content:flex-start;padding:8px 8px 8px 16px;border-radius:14px;}'
  + '.pvl-tray--ones{display:grid;grid-template-columns:repeat(5,var(--pvl-u,44px));grid-auto-rows:var(--pvl-u,44px);gap:calc(var(--pvl-u,44px) * .182);'
  +   'justify-content:center;align-content:flex-start;}'
  + '.pvl-tray--ones.offer{outline:3px dashed #F2C879;outline-offset:4px;border-radius:14px;}'
  + '.pvl-slot{width:var(--pvl-u,44px);height:var(--pvl-u,44px);border-radius:10px;border:2px dotted rgba(20,30,28,.14);}'
  + '.pvl-slot.extra{border-color:rgba(242,200,121,.7);}'
  + '.pvl-block{border:none;background:none;padding:0;cursor:pointer;transition:transform .1s var(--lcs-ease);}'
  + '.pvl-block:active{transform:scale(.94);}'
  + '.pvl-block.marked{filter:saturate(.4) brightness(1.08);position:relative;}'
  + '.pvl-block.marked:after{content:"✕";position:absolute;inset:0;margin:auto;width:26px;height:26px;'
  +   'display:grid;place-items:center;color:#8A5A3A;font-weight:800;font-size:18px;'
  +   'background:rgba(255,254,251,.92);border-radius:50%;box-shadow:0 1px 3px rgba(20,30,28,.18);}'
  + '.pvl-cube{width:var(--pvl-u,44px);height:var(--pvl-u,44px);display:block;}'
  + '.pvl-cube svg{width:100%;height:100%;display:block;}'
  + '.pvl-slot .pvl-cube{margin:-2px;}'
  /* rods NEVER wrap — they compress in one row (7 tens must not spawn
     a second 190px row and push the dock under the fold) */
  + '.pvl-tray--tens{flex-wrap:nowrap;}'
  + '.pvl-rod{width:calc(var(--pvl-u,44px) * .773);flex:0 1 calc(var(--pvl-u,44px) * .773);min-width:15px;height:calc(var(--pvl-u,44px) * 4.318);display:block;}'
  + '.pvl-rod svg{width:100%;height:100%;display:block;}'
  + '.pvl-flat{width:calc(var(--pvl-u,44px) * 2.727);height:calc(var(--pvl-u,44px) * 2.727);display:block;}'
  + '.pvl-flat svg{width:100%;height:100%;display:block;}'
  + '.pvl-incoming{visibility:hidden;}'
  + '.pvl-ctx{min-height:44px;display:flex;align-items:center;justify-content:center;}'
  + '.pvl-ctxbtn{font-family:var(--lcs-font-display);font-weight:700;font-size:15px;border-radius:999px;'
  +   'padding:9px 18px;min-height:44px;cursor:pointer;border:none;}'
  + '.pvl-ctxbtn.make{background:#F2C879;color:#6B4E12;box-shadow:0 3px 0 0 #B98A2E;animation:pvlBreathe 1.8s ease-in-out infinite;}'
  + '.pvl-ctxbtn.break{background:var(--lcs-surface);color:var(--lcs-structure);border:2px solid var(--lcs-line);}'
  + '.pvl-ctxbtn.break.glow{animation:pvlBreathe 1.8s ease-in-out infinite;border-color:#F2C879;}'
  + '@keyframes pvlBreathe{0%,100%{box-shadow:0 3px 0 0 #B98A2E,0 0 0 0 rgba(242,200,121,.6);}'
  +   '50%{box-shadow:0 3px 0 0 #B98A2E,0 0 0 10px rgba(242,200,121,0);}}'

  /* prompt box + panels */
  + '.pvl-promptbox{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
  + '.pvl-scrim{position:fixed;inset:0;background:rgba(20,30,28,.32);z-index:70;}'
  + '.pvl-panel{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:71;'
  +   'width:min(440px,92vw);max-height:min(80vh,640px);overflow:auto;background:var(--lcs-surface);'
  +   'border-radius:22px;box-shadow:var(--lcs-shadow);padding:18px;display:flex;flex-direction:column;gap:10px;}'
  + '.pvl-panelhead{font-family:var(--lcs-font-display);font-weight:700;font-size:19px;color:var(--lcs-structure);}'
  + '.pvl-kpdisp{font-family:var(--lcs-font-display);font-weight:700;font-size:44px;text-align:center;'
  +   'color:var(--lcs-structure);font-variant-numeric:tabular-nums;min-height:56px;}'
  + '.pvl-kpgrid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;}'
  + '.pvl-kpgrid .pvl-chip{justify-content:center;font-size:20px;min-width:44px;}'
  + '.pvl-kprow{display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;}'
  + '.pvl-matrow{display:flex;gap:8px;align-items:center;}'
  + '.pvl-matrow .pvl-chip:first-child{flex:1;justify-content:flex-start;text-align:left;}'
  + '.pvl-input{flex:1;min-width:160px;font-family:var(--lcs-font-body);font-weight:700;font-size:14.5px;'
  +   'border:2px solid var(--lcs-line);border-radius:12px;padding:10px 12px;background:#FFFEFB;color:var(--lcs-ink);}'

  /* clones overlay */
  + '.pvl-overlay{position:fixed;inset:0;pointer-events:none;z-index:60;}'
  + '.pvl-clone{position:fixed;}'
  + '.pvl-clone svg{width:100%;height:100%;display:block;}'

  /* dock + gate */
  + '.pvl-dock{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;width:100%;}'
  + '.pvl-modes{display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:center;}'
  + '.pvl-chip{display:inline-flex;align-items:center;gap:5px;font-family:var(--lcs-font-display);'
  +   'font-weight:700;font-size:15px;color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'border:2px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);'
  +   'padding:8px 15px;min-height:44px;cursor:pointer;transition:transform .1s var(--lcs-ease);}'
  + '.pvl-chip:active{transform:scale(.96);}'
  + '.pvl-chip.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.pvl-chip.locked{color:var(--lcs-ink-soft);}'
  + '.pvl-chip.manage{color:var(--lcs-structure);}'
  + '.pvl-gate{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;'
  +   'background:#FDF0DC;border:1.5px solid #F2C879;border-radius:16px;padding:10px 16px;max-width:560px;}'
  + '.pvl-gatemsg{font-family:var(--lcs-font-body);font-weight:700;font-size:13.5px;color:var(--lcs-ink);}'
  + '.pvl-gatelink{font-family:var(--lcs-font-display);font-weight:700;font-size:14px;color:#fff;'
  +   'background:#F2784B;border-radius:999px;padding:8px 16px;text-decoration:none;box-shadow:0 2px 0 0 #C9502A;}'

  /* the big action buttons (Check/Next) */
  + '.pvl-big{min-width:150px;min-height:54px;padding:11px 28px;border-radius:var(--lcs-radius-pill);'
  +   'border:none;cursor:pointer;font-family:var(--lcs-font-display);font-weight:700;font-size:19px;}'
  + '.pvl-big.coral{background:#F2784B;color:#fff;box-shadow:0 3px 0 0 #C9502A;}'
  + '.pvl-tasknote{font-family:var(--lcs-font-body);font-weight:700;font-size:14.5px;color:var(--lcs-ink);'
  +   'background:#FDF6E8;border-radius:14px;padding:10px 14px;max-width:640px;text-align:center;}'
  + '.pvl-tasknote.good{background:#EAF4EF;}'

  /* compact: any prompt-strip mode must keep the dock above the
     1024×768 fold (the §A.13.62 desktop cut-off class) */
  + '.pvl-wrap.compact{gap:6px;}'
  + '.pvl-wrap.compact .pvl-col{min-height:216px;padding:8px 10px 10px;}'
  + '.pvl-wrap.compact .pvl-rod{height:138px;}'
  + '.pvl-wrap.compact .pvl-flat{width:92px;height:92px;}'
  + '.pvl-wrap.compact .pvl-dg{font-size:clamp(36px,5.2vmin,54px);}'
  + '.pvl-wrap.compact .pvl-digit{padding:5px 18px 7px;}'
  + '.pvl-wrap.compact .pvl-word{font-size:clamp(19px,2.5vmin,26px);}'
  + '.pvl-wrap.compact .pvl-prompt{font-size:clamp(17px,2.4vmin,25px);}'
  + '.pvl-wrap.compact .pvl-big{min-height:46px;padding:8px 22px;}'
  + '.pvl-wrap.compact .pvl-ctx{min-height:40px;}'

  /* stacked + phone */
  + '@media (max-width:900px){'
  +   '.pvl-grid{grid-template-columns:repeat(var(--pvl-p,2),minmax(0,1fr));}'
  +   '.pvl-rod{height:150px;}'
  +   '.pvl-flat{width:96px;height:96px;}'
  + '}'
  + '@media (max-width:560px){'
  +   'body.pvl-wide{overflow-y:auto;}'
  +   '.pvl-dg{font-size:40px;}'
  +   '.pvl-word{font-size:20px;}'
  /* the MAT stacks single-column so the 5×2 ghost grid never clips;
     the digit cards STAY side-by-side (they mirror the numeral) */
  +   '.pvl-grid.pvl-mat{grid-template-columns:1fr;}'
  +   '.pvl-col{min-height:150px;padding:8px;}'
  +   '.pvl-tray--ones{grid-template-columns:repeat(5,40px);grid-auto-rows:40px;gap:7px;}'
  +   '.pvl-slot{width:40px;height:40px;}'
  +   '.pvl-cube{width:40px;height:40px;}'
  +   '.pvl-rod{width:28px;height:110px;}'
  +   '.pvl-flat{width:76px;height:76px;}'
  +   '.pvl-arcs{display:none;}'
  +   '.pvl-wordrow{padding:0;}'
  +   '.pvl-speak{position:static;transform:none;}'
  +   '.pvl-speak.decomp{position:static;}'
  +   '.pvl-speak:active{transform:translateY(2px);}'
  + '}'
  /* ---- wide board (§23 the apparatus a teacher teaches FROM) ----
     Every piece of this apparatus is a multiple of ONE unit — the ones cube
     is 44px, a rod is 34x190, a flat is 120x120, a column is 300 wide and
     300 tall, the add button 56x48. They are all expressed as ratios of
     --pvl-u above, so a tier is one number and no ratio can drift: a rod
     stays exactly ten cubes tall and a flat exactly ten rods wide, which is
     the entire point of the instrument. Ramping them one by one would let
     that relationship rot silently, and NOTHING in the gate suite measures
     "is a flat still ten rods" — the pieces are drawn art, not a computed
     model.
     ⚠ The column labels, place-value chips and dock sit outside the block
     geometry and are ramped separately; leaving them turns a big apparatus
     into a big apparatus with phone-sized controls. */
  + '@media (min-width:1367px) and (min-height:880px){'
  +   'body.pvl-wide .lcs-app{max-width:min(1192px,97vw);}'
  +   'body.pvl-wide .pvl-wrap{--pvl-u:min(56px,calc((1192px - 76px - (var(--pvl-p,2) - 1) * 20px) / var(--pvl-p,2) / 6.818));}'
  +   'body.pvl-wide .pvl-collbl{font-size:18px;}'
  +   'body.pvl-wide .pvl-ctxbtn{font-size:18px;}'
/* ⚠ .pvl-speak is position:absolute;right:56px inside a full-width row,
     so widening the board did not move it CLOSER to the number word — it
     pinned it to the right edge of a 1704px row, ~600px away from the
     thing it speaks. The tool already has a correct layout for this: the
     phone rule puts the two buttons back in the flow, next to the word.
     Use it here too, and size them off the unit like everything else. */
  +   'body.pvl-wide .pvl-speak{position:static;transform:none;'
  +     'width:calc(var(--pvl-u,44px) * 1.09);height:calc(var(--pvl-u,44px) * 1.09);}'
  +   'body.pvl-wide .pvl-speak:active{transform:translateY(2px);}'
  +   'body.pvl-wide .pvl-speak svg{width:60%;height:60%;}'
  +   'body.pvl-wide .pvl-wordrow{gap:16px;}'
  /* ⚠ putting the buttons back in the flow pushed the number word off the
     centre line, and the word sitting directly under the digit cards IS the
     teaching point (24 = two tens and four ones). A mirror spacer the exact
     width of the two buttons and their gaps restores the centring with no
     DOM change: 2 x (u x 1.09) + two 16px gaps. */
  +   'body.pvl-wide .pvl-wordrow::before{content:"";flex:0 0 calc(var(--pvl-u,44px) * 2.18 + 32px);}'
  + '}'
  + '@media (min-width:1800px) and (min-height:1080px){'
  +   'body.pvl-wide .lcs-app{max-width:min(1560px,97vw);}'
  +   'body.pvl-wide .pvl-wrap{--pvl-u:min(70px,calc((1560px - 76px - (var(--pvl-p,2) - 1) * 20px) / var(--pvl-p,2) / 6.818));}'
  +   'body.pvl-wide .pvl-collbl{font-size:21px;}'
  +   'body.pvl-wide .pvl-ctxbtn{font-size:20px;}'
  + '}'
  + '@media (min-width:2400px) and (min-height:1150px){'
  +   'body.pvl-wide .lcs-app{max-width:min(1752px,97vw);}'
  +   'body.pvl-wide .pvl-wrap{--pvl-u:min(94px,calc((1752px - 76px - (var(--pvl-p,2) - 1) * 20px) / var(--pvl-p,2) / 6.818));}'
  +   'body.pvl-wide .pvl-collbl{font-size:23px;}'
  +   'body.pvl-wide .pvl-ctxbtn{font-size:22px;}'
  + '}'

  /* reduced motion */
  + '@media (prefers-reduced-motion: reduce){'
  +   '.pvl-ctxbtn.make,.pvl-ctxbtn.break.glow{animation:none;box-shadow:0 3px 0 0 #B98A2E,0 0 0 4px rgba(242,200,121,.4);}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());

