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
    /* ⭐ REUSED VERBATIM from number-line.js — the closest sibling
       manipulative, already native-panel-approved in eleven locales.
       A bare verb also carries no noun to collide with any tool's named
       parts, which is the trap an invented "print the mat" would walk
       straight into in ten languages at once. */
    printBtn:     {en:'Print',de:'Drucken',fr:'Imprimer',it:'Stampa',es:'Imprimir',pt:'Imprimir',nl:'Print',sv:'Skriv ut',da:'Print',no:'Skriv ut',fi:'Tulosta'},
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
    noTensChip:   {en:'no tens',de:'keine Zehner',fr:'pas de dizaine',it:'zero decine',es:'sin decenas',pt:'sem dezenas',nl:'geen tientallen',sv:'inga tiotal',da:'ingen tiere',no:'ingen tiere',fi:'ei kymmeniä'},
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
     PV_WORD_SPANS[loc](n) -> [{t:text, p:part, v:value, lemma?}].

     ⭐⭐ EVERY SPAN NAMES A VALUE, AND THEY MUST SUM TO n.
     That one numeric field is what turns the moat from a spelling
     check into a theorem. Byte-equality only proves the letters
     concatenate; `sum(v) === n` proves the coloured parts are a
     partition OF THE NUMBER — German vier(4) + zwanzig(20) = 24 with
     the ones span FIRST, English four(4) + teen(10) = 14 in the same
     order and for the same reason, French soixante(60) + onze(11) =
     71. Gate: I3 in scripts/verify-place-value-lab.js, 0-999 x 11.

     PARTS. `teen` and `mixed` are GONE — both existed to avoid the
     analysis, and both sat exactly where the analysis pays:
       hundreds/tens/ones  the places themselves
       tenMark   a bound ten-marker morpheme: -teen, -zehn, -tien,
                 -ton, -ten, dieci-, dez-, toista. Names 10.
                 ⭐ English "fourteen" says the 4 FIRST, exactly like
                 "vierundzwanzig" — the classic 14/41 reversal IS this
                 tool's own thesis, in the range K-1 actually lives
                 in, and the old `teen` blob hid it.
       scoreMark the French base-20 unit `quatre-vingt`. Names 80.
       atom      genuinely unanalysable in the modern language:
                 eleven, twelve, elf, once..quince, onze..seize,
                 undici..sedici, elva, elleve. An atom tag is honest
                 HERE and was a cop-out everywhere else.
       joiner    und, et, y, e, og, -. Names 0.

     `lemma` carries the citation form wherever the surface is a
     clipped or bound variant (thir- for three, sech- for sechs,
     dós for dos), so the screen can show what is written while the
     tool can say what it means, and nothing presents a fragment as
     a standalone word.
     ⚠ The Spanish and Italian fragments and the Danish halvtreds
     reading are flagged for the native panels as SOURCE TO AUDIT.

     MIXED_RANGES is now EMPTY and stays declared: French 70-99 used
     to be one opaque `mixed` lump with an apology string beside it,
     but 71 = soixante(60) + et + onze(11) is exactly what a CP
     teacher writes on the board — the tens word names 60 while the
     number is 70, and that mismatch IS the lesson. The sum invariant
     makes a lump structurally impossible: you cannot partition it.
     One line per locale; the /*__SP_xx__* / markers let the fan-out
     whole-line replace. */
  MIXED_RANGES: {},

  PV_WORD_SPANS: {
    /*__SP_en__*/ en: function (n) { var L=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'],T=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'],ST=['','','','thir','four','fif','six','seven','eigh','nine'];function s99(m){if(m<10)return[{t:L[m],p:'ones',v:m}];if(m===10)return[{t:'ten',p:'tens',v:10}];if(m<13)return[{t:L[m],p:'atom',v:m}];if(m<20){var u=m-10,sp={t:ST[u],p:'ones',v:u};if(ST[u]!==L[u])sp.lemma=L[u];return[sp,{t:'teen',p:'tenMark',v:10}];}var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens',v:t*10}];return[{t:T[t],p:'tens',v:t*10},{t:'-',p:'joiner',v:0},{t:L[o],p:'ones',v:o}];}if(n<100)return s99(n);var h=Math.floor(n/100),r=n%100,out=[{t:L[h]+' hundred',p:'hundreds',v:h*100}];if(r===0)return out;return out.concat([{t:' ',p:'joiner',v:0}],s99(r)); },
    /*__SP_de__*/ de: function (n) { var C=['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun'],A=['null','ein','zwei','drei','vier','fünf','sechs','sieben','acht','neun'],E=['zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn'],ST=['','','','drei','vier','fünf','sech','sieb','acht','neun'],T=['','','zwanzig','dreißig','vierzig','fünfzig','sechzig','siebzig','achtzig','neunzig'];function s99(m){if(m<10)return[{t:C[m],p:'ones',v:m}];if(m===10)return[{t:'zehn',p:'tens',v:10}];if(m<13)return[{t:E[m-10],p:'atom',v:m}];if(m<20){var u=m-10,sp={t:ST[u],p:'ones',v:u};if(ST[u]!==C[u])sp.lemma=C[u];return[sp,{t:'zehn',p:'tenMark',v:10}];}var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens',v:t*10}];var os={t:A[o],p:'ones',v:o};if(A[o]!==C[o])os.lemma=C[o];return[os,{t:'und',p:'joiner',v:0},{t:T[t],p:'tens',v:t*10}];}if(n<100)return s99(n);var h=Math.floor(n/100),r=n%100,out=[{t:A[h]+'hundert',p:'hundreds',v:h*100}];if(r===0)return out;return out.concat(s99(r)); },
    /*__SP_es__*/ es: function (n) { var L=['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'],T=['','','veinte','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];function tail(txt,u){var o={t:txt,p:'ones',v:u};if(txt!==L[u])o.lemma=L[u];return o;}function s99(m){if(m<10)return[{t:L[m],p:'ones',v:m}];if(m===10)return[{t:'diez',p:'tens',v:10}];if(m<16)return[{t:L[m],p:'atom',v:m}];if(m<20)return[{t:'dieci',p:'tenMark',v:10},tail(L[m].slice(5),m-10)];if(m===20)return[{t:'veinte',p:'tens',v:20}];if(m<30)return[{t:'veinti',p:'tens',v:20},tail(L[m].slice(6),m-20)];var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens',v:t*10}];return[{t:T[t],p:'tens',v:t*10},{t:' y ',p:'joiner',v:0},{t:L[o],p:'ones',v:o}];}if(n<100)return s99(n);if(n===100)return[{t:'cien',p:'hundreds',v:100}];var H=['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'],h=Math.floor(n/100),r=n%100,out=[{t:H[h],p:'hundreds',v:h*100}];if(r===0)return out;return out.concat([{t:' ',p:'joiner',v:0}],s99(r)); },
    /*__SP_it__*/ it: function (n) { var L=['zero','uno','due','tre','quattro','cinque','sei','sette','otto','nove','dieci','undici','dodici','tredici','quattordici','quindici','sedici','diciassette','diciotto','diciannove'],T=['','','venti','trenta','quaranta','cinquanta','sessanta','settanta','ottanta','novanta'],O=['','uno','due','tré','quattro','cinque','sei','sette','otto','nove'];function s99(m){if(m<10)return[{t:L[m],p:'ones',v:m}];if(m===10)return[{t:'dieci',p:'tens',v:10}];if(m<17)return[{t:L[m],p:'atom',v:m}];if(m<20){var rest=L[m].slice(4),u=m-10,sp={t:rest,p:'ones',v:u};if(rest!==L[u])sp.lemma=L[u];return[{t:'dici',p:'tenMark',v:10},sp];}var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens',v:t*10}];var ts=T[t],el=(o===1||o===8);if(el)ts=ts.slice(0,-1);var os={t:O[o],p:'ones',v:o};if(O[o]!==L[o])os.lemma=L[o];var tsp={t:ts,p:'tens',v:t*10};if(el)tsp.lemma=T[t];return[tsp,os];}if(n<100)return s99(n);var M=['','','due','tre','quattro','cinque','sei','sette','otto','nove'],h=Math.floor(n/100),r=n%100,hw=(h===1)?'cento':M[h]+'cento';if(r===0)return[{t:hw,p:'hundreds',v:h*100}];var tl=s99(r),f=tl[0].t.charAt(0),hs={t:hw,p:'hundreds',v:h*100};if(f==='o'||f==='u'){hs.t=hw.slice(0,-1);hs.lemma=hw;}return[hs].concat(tl); },
    /*__SP_fr__*/ fr: function (n) { var L=['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix','onze','douze','treize','quatorze','quinze','seize','dix-sept','dix-huit','dix-neuf'],T=['','','vingt','trente','quarante','cinquante','soixante'];function s99(m){if(m<10)return[{t:L[m],p:'ones',v:m}];if(m===10)return[{t:'dix',p:'tens',v:10}];if(m<17)return[{t:L[m],p:'atom',v:m}];if(m<20)return[{t:'dix',p:'tenMark',v:10},{t:'-',p:'joiner',v:0},{t:L[m-10],p:'ones',v:m-10}];var t=Math.floor(m/10),o=m%10;if(t>=2&&t<=6){if(o===0)return[{t:T[t],p:'tens',v:t*10}];if(o===1)return[{t:T[t],p:'tens',v:t*10},{t:' et ',p:'joiner',v:0},{t:'un',p:'ones',v:1}];return[{t:T[t],p:'tens',v:t*10},{t:'-',p:'joiner',v:0},{t:L[o],p:'ones',v:o}];}if(t===7){if(o===0)return[{t:'soixante',p:'tens',v:60},{t:'-',p:'joiner',v:0},{t:'dix',p:'tenMark',v:10}];if(o===1)return[{t:'soixante',p:'tens',v:60},{t:' et ',p:'joiner',v:0},{t:'onze',p:'atom',v:11}];return[{t:'soixante',p:'tens',v:60},{t:'-',p:'joiner',v:0},{t:L[10+o],p:'atom',v:10+o}];}if(t===8){if(o===0)return[{t:'quatre-vingts',p:'scoreMark',v:80}];return[{t:'quatre-vingt',p:'scoreMark',v:80},{t:'-',p:'joiner',v:0},{t:L[o],p:'ones',v:o}];}if(o===0)return[{t:'quatre-vingt',p:'scoreMark',v:80},{t:'-',p:'joiner',v:0},{t:'dix',p:'tenMark',v:10}];return[{t:'quatre-vingt',p:'scoreMark',v:80},{t:'-',p:'joiner',v:0},{t:L[10+o],p:'atom',v:10+o}];}if(n<100)return s99(n);var M=['','','deux','trois','quatre','cinq','six','sept','huit','neuf'],h=Math.floor(n/100),r=n%100,hw;if(h===1)hw='cent';else hw=M[h]+' cent'+(r===0?'s':'');var out=[{t:hw,p:'hundreds',v:h*100}];if(r===0)return out;return out.concat([{t:' ',p:'joiner',v:0}],s99(r)); },
    /*__SP_pt__*/ pt: function (n) { var L=['zero','um','dois','três','quatro','cinco','seis','sete','oito','nove','dez','onze','doze','treze','quatorze','quinze','dezesseis','dezessete','dezoito','dezenove'],T=['','','vinte','trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa'];function s99(m){if(m<10)return[{t:L[m],p:'ones',v:m}];if(m===10)return[{t:'dez',p:'tens',v:10}];if(m<16)return[{t:L[m],p:'atom',v:m}];if(m<20){var rest=L[m].slice(3),u=m-10,sp={t:rest,p:'ones',v:u};if(rest!==L[u])sp.lemma=L[u];return[{t:'dez',p:'tenMark',v:10},sp];}var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens',v:t*10}];return[{t:T[t],p:'tens',v:t*10},{t:' e ',p:'joiner',v:0},{t:L[o],p:'ones',v:o}];}if(n<100)return s99(n);if(n===100)return[{t:'cem',p:'hundreds',v:100}];var H=['','cento','duzentos','trezentos','quatrocentos','quinhentos','seiscentos','setecentos','oitocentos','novecentos'],h=Math.floor(n/100),r=n%100,out=[{t:H[h],p:'hundreds',v:h*100}];if(r===0)return out;return out.concat([{t:' e ',p:'joiner',v:0}],s99(r)); },
    /*__SP_nl__*/ nl: function (n) { var L=['nul','een','twee','drie','vier','vijf','zes','zeven','acht','negen','tien','elf','twaalf','dertien','veertien','vijftien','zestien','zeventien','achttien','negentien'],T=['','','twintig','dertig','veertig','vijftig','zestig','zeventig','tachtig','negentig'],O=['','een','twee','drie','vier','vijf','zes','zeven','acht','negen'],ST=['','','','der','veer','vijf','zes','zeven','acht','negen'];function s99(m){if(m<10)return[{t:L[m],p:'ones',v:m}];if(m===10)return[{t:'tien',p:'tens',v:10}];if(m<13)return[{t:L[m],p:'atom',v:m}];if(m<20){var u=m-10,sp={t:ST[u],p:'ones',v:u};if(ST[u]!==L[u])sp.lemma=L[u];return[sp,{t:'tien',p:'tenMark',v:10}];}var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens',v:t*10}];var j=(o===2||o===3)?'ën':'en';return[{t:O[o],p:'ones',v:o},{t:j,p:'joiner',v:0},{t:T[t],p:'tens',v:t*10}];}if(n<100)return s99(n);var h=Math.floor(n/100),r=n%100,hw=(h===1)?'honderd':O[h]+'honderd',out=[{t:hw,p:'hundreds',v:h*100}];if(r===0)return out;return out.concat(s99(r)); },
    /*__SP_sv__*/ sv: function (n) { var L=['noll','ett','två','tre','fyra','fem','sex','sju','åtta','nio','tio','elva','tolv','tretton','fjorton','femton','sexton','sjutton','arton','nitton'],T=['','','tjugo','trettio','fyrtio','femtio','sextio','sjuttio','åttio','nittio'],O=['','ett','två','tre','fyra','fem','sex','sju','åtta','nio'],ST=['','','','tret','fjor','fem','sex','sjut','ar','nit'];function s99(m){if(m<10)return[{t:L[m],p:'ones',v:m}];if(m===10)return[{t:'tio',p:'tens',v:10}];if(m<13)return[{t:L[m],p:'atom',v:m}];if(m<20){var u=m-10,sp={t:ST[u],p:'ones',v:u};if(ST[u]!==L[u])sp.lemma=L[u];return[sp,{t:'ton',p:'tenMark',v:10}];}var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens',v:t*10}];return[{t:T[t],p:'tens',v:t*10},{t:L[o],p:'ones',v:o}];}if(n<100)return s99(n);var h=Math.floor(n/100),r=n%100,hw=(h===1)?'hundra':O[h]+'hundra',out=[{t:hw,p:'hundreds',v:h*100}];if(r===0)return out;return out.concat(s99(r)); },
    /*__SP_da__*/ da: function (n) { var L=['nul','en','to','tre','fire','fem','seks','syv','otte','ni','ti','elleve','tolv','tretten','fjorten','femten','seksten','sytten','atten','nitten'],T=['','','tyve','tredive','fyrre','halvtreds','tres','halvfjerds','firs','halvfems'],ST=['','','','tret','fjor','fem','seks','syt','at','nit'];function s99(m){if(m<10)return[{t:L[m],p:'ones',v:m}];if(m===10)return[{t:'ti',p:'tens',v:10}];if(m<13)return[{t:L[m],p:'atom',v:m}];if(m<20){var u=m-10,sp={t:ST[u],p:'ones',v:u};if(ST[u]!==L[u])sp.lemma=L[u];return[sp,{t:'ten',p:'tenMark',v:10}];}var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens',v:t*10}];return[{t:L[o],p:'ones',v:o},{t:'og',p:'joiner',v:0},{t:T[t],p:'tens',v:t*10}];}if(n<100)return s99(n);var h=Math.floor(n/100),r=n%100,hw=(h===1)?'hundrede':L[h]+'hundrede',out=[{t:hw,p:'hundreds',v:h*100}];if(r===0)return out;return out.concat([{t:' og ',p:'joiner',v:0}],s99(r)); },
    /*__SP_no__*/ no: function (n) { var L=['null','én','to','tre','fire','fem','seks','sju','åtte','ni','ti','elleve','tolv','tretten','fjorten','femten','seksten','sytten','atten','nitten'],T=['','','tjue','tretti','førti','femti','seksti','sytti','åtti','nitti'],O=['','én','to','tre','fire','fem','seks','sju','åtte','ni'],ST=['','','','tret','fjor','fem','seks','syt','at','nit'];function s99(m){if(m<10)return[{t:L[m],p:'ones',v:m}];if(m===10)return[{t:'ti',p:'tens',v:10}];if(m<13)return[{t:L[m],p:'atom',v:m}];if(m<20){var u=m-10,sp={t:ST[u],p:'ones',v:u};if(ST[u]!==L[u])sp.lemma=L[u];return[sp,{t:'ten',p:'tenMark',v:10}];}var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens',v:t*10}];return[{t:T[t],p:'tens',v:t*10},{t:L[o],p:'ones',v:o}];}if(n<100)return s99(n);var h=Math.floor(n/100),r=n%100,hw=(h===1)?'hundre':O[h]+'hundre',out=[{t:hw,p:'hundreds',v:h*100}];if(r===0)return out;return out.concat([{t:'og',p:'joiner',v:0}],s99(r)); },
    /*__SP_fi__*/ fi: function (n) { var L=['nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän','kymmenen','yksitoista','kaksitoista','kolmetoista','neljätoista','viisitoista','kuusitoista','seitsemäntoista','kahdeksantoista','yhdeksäntoista'],T=['','','kaksikymmentä','kolmekymmentä','neljäkymmentä','viisikymmentä','kuusikymmentä','seitsemänkymmentä','kahdeksankymmentä','yhdeksänkymmentä'],O=['','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän'];function s99(m){if(m<10)return[{t:L[m],p:'ones',v:m}];if(m===10)return[{t:'kymmenen',p:'tens',v:10}];if(m<20){var u=m-10;return[{t:L[u],p:'ones',v:u},{t:'toista',p:'tenMark',v:10}];}var t=Math.floor(m/10),o=m%10;if(o===0)return[{t:T[t],p:'tens',v:t*10}];return[{t:T[t],p:'tens',v:t*10},{t:L[o],p:'ones',v:o}];}if(n<100)return s99(n);var h=Math.floor(n/100),r=n%100,hw=(h===1)?'sata':O[h]+'sataa',out=[{t:hw,p:'hundreds',v:h*100}];if(r===0)return out;return out.concat(s99(r)); }
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

  /* ⭐⭐ THE CEILING IS ON THE VALUE, NOT ON EACH PLACE — and getting
     that wrong is what produced a whole FAMILY of states in which the
     mat held a number the numeral could not show.

     The digit cards slice `engineValue` per place (render()), so a mat
     holding more than `places` digits can represent has its top digit
     SILENTLY DROPPED. With per-place caps only, invited/2-place could
     reach {t:9,o:10..19} — the mat holds 100-109 and the cards read
     "0 0" through "0 9" — and none of them could be bundled away,
     because canMakeTen refused at t=9. Thirty-odd dead ends in which
     the instrument displayed a number that was not on the table.

     A value ceiling makes every one of them unreachable by
     construction, and it is the honest rule anyway: a two-place
     instrument represents 0-99, a three-place one 0-999. Regrouping
     moves (make/break) preserve value and so can never breach it.
     Gated by I1 in scripts/verify-place-value-lab.js. */
  engineMaxValue: function (st) { return st.maxPlaces >= 3 ? 999 : 99; },

  engineAddOne: function (st) {
    if (this.engineValue(st) + 1 > this.engineMaxValue(st)) return 'cap';
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
    if (this.engineValue(st) + 10 > this.engineMaxValue(st)) return 'cap';
    /* ⚠ AUTO MUST CASCADE TENS→HUNDRED, or its own setting label lies.
       `setBundleAuto` reads "Bundles by itself at ten" — that was true
       of ones and FALSE of tens: the old cap pinned tens at 9 in auto
       mode, so a hundred was literally unreachable by adding tens. */
    if (st.bundleMode === 'auto') {
      if (st.t < 9) { st.t += 1; return 'added'; }
      if (st.maxPlaces >= 3 && st.h < 9) { st.h += 1; st.t = 0; return 'snapped'; }
      return 'cap';
    }
    var cap = st.maxPlaces >= 3 ? 19 : 9;
    if (st.t < cap) { st.t += 1; return 'added'; }
    return 'cap';
  },
  engineAddHundred: function (st) {
    if (this.engineValue(st) + 100 > this.engineMaxValue(st)) return 'cap';
    if (st.maxPlaces >= 3 && st.h < 9) { st.h += 1; return 'added'; }
    return 'cap';
  },
  engineRemove: function (st, place) {
    if (place === 'ones' && st.o > 0) { st.o -= 1; return true; }
    if (place === 'tens' && st.t > 0) { st.t -= 1; return true; }
    if (place === 'hundreds' && st.h > 0) { st.h -= 1; return true; }
    return false;
  },
  /* Bundling PRESERVES value, so with the value ceiling in place it can
     never create an unrepresentable mat — the old `t < 9+…` guard was
     the thing that turned a full tens column into a dead end. Ten loose
     ones can ALWAYS become a ten; that is the whole promise. */
  engineCanMakeTen: function (st) { return st.o >= 10; },
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

  defaults: { bundle: 'invited', wordHighlight: true, hundreds: true, speakOnChange: true },
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
    /* the demo pose: 124. It was 24, chosen because it is the inversion
       number — and it still is inside 124. But hundreds are free now, so
       the opening frame should show the whole apparatus rather than two
       thirds of it, and einhundertvierundzwanzig is where the German
       inversion actually gets hard. */
    this.st.h = 1; this.st.t = 2; this.st.o = 4;

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
  /* ⭐ HUNDREDS ARE FREE. They were gated behind premium AND a settings
     switch, which is "never gate the first affordance" in its worst
     form: a Grade-2 teacher opened the instrument named for place value
     and the place they teach was missing, with no way to discover it
     existed. It also gated the THESIS — the inversion a German
     classroom actually fights is `zweihundertsiebenundvierzig`, not
     `vierundzwanzig` — and it gated the only zero-placeholder
     affordance (the "no tens" chip needs h > 0). Place count is now a
     display choice the teacher makes, like a chart's range. */
  _maxPlaces: function () {
    return this.api.settings.hundreds ? 3 : 2;
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

    /* ---- the board: ONE unit for the digits AND the mat ----
       Custom properties inherit downwards only, so the unit has to be
       declared on a common ANCESTOR of both bands, not on either of
       them. --pvl-b is the board's width in units and --pvl-tracks the
       mat's column widths; both are derived from the place list here so
       the CSS never has to guess how many places are on screen. */
    var board = api.el('div', 'pvl-board');
    this._board = board;
    /* ⚠ the place count goes on an ATTRIBUTE, and the unit budget and
       column tracks are declared in CSS against it — NOT written inline
       here. An inline custom property cannot be overridden by a media
       or container query, so writing them from JS would make the
       stacked phone layout unreachable. */
    board.setAttribute('data-places', String(places.length));

    /* ---- the display band: digit cards + word line ---- */
    var top = api.el('div', 'pvl-top');
    /* ⚠ NOT .pvl-grid. The digit cards used to inherit the MAT's column
       template, so at three places "3", "0", "4" sat ~320px apart and
       read as three separate cards rather than as the number three
       hundred and four — on a tool whose own comment calls the word
       under the digits the teaching point. */
    var digits = api.el('div', 'pvl-digits');
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
      /* ⚠ `bundleInvite` says "Ten ones! Can you make a ten?" — it is
         about the ONES column and nothing else. It used to show for any
         non-canonical mat, so a board holding ten TENS was invited to
         make a ten out of its zero ones. Show it only when it is true;
         when the tens are over, the glowing "Make a hundred!" button is
         already the invitation and needs no authored sentence. */
      if (this.mode !== 'sub' && this.st.o >= 10) {
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
    board.appendChild(top);

    /* ---- the mat band ---- */
    var mat = api.el('div', 'pvl-grid pvl-mat');
    this._trays = {};
    places.forEach(function (pl) { mat.appendChild(self._buildCol(pl)); });
    board.appendChild(mat);
    /* ⭐ ONE regroup row under the mat, not a reserved 44px slot inside
       every column. Per-column slots cost the material ~50px of height
       in a layout that is already tight at 1024x768, and only one of
       them is ever occupied; German ("Einen Hunderter tauschen") also
       wrapped to three lines inside a narrow column. */
    var ctxRow = api.el('div', 'pvl-ctxrow');
    this._ctxRow = ctxRow;
    this._ctx = {};
    places.forEach(function (pl) {
      var slot = api.el('span', 'pvl-ctxslot');
      ctxRow.appendChild(slot);
      self._ctx[pl] = slot;
    });
    board.appendChild(ctxRow);
    wrap.appendChild(board);

    /* ---- the dock ---- */
    wrap.appendChild(this._buildDock());
    /* the print sheet lives in the DOM and is hidden on screen */
    wrap.appendChild(this._buildSheet());

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
        /* the 5×2 ghost frame — "how close to ten" always visible. A
           SECOND block of ten appears once the first is full, so the
           bundle invitation is the frame itself rather than a message:
           the child can see the ten that is ready to go. Bounded at 20,
           which is the engine's own ceiling for loose ones. */
        var shown = counts.ones > 10 ? 20 : 10;
        for (var g = 0; g < shown; g++) {
          var slot = api.el('div', 'pvl-slot' + (g >= 10 ? ' extra' : ''));
          if (g < counts.ones) slot.appendChild(self._blockBtn('cube', srKeys.ones, pl, g));
          tray.appendChild(slot);
        }
      } else if (pl === 'tens') {
        /* ⭐ TEN SLOTS PER BANK, FLUSH. Ten rods laid side by side with
           no gap occupy exactly one flat's footprint — a full bank IS a
           hundred, and the layout is what says so. The ghost slots keep
           the bank's width constant, so the mat cannot reflow as rods
           arrive, and they show at a glance how many more make a
           hundred. A second bank appears only when it is needed. */
        var shownT = counts.tens > 10 ? 20 : 10;
        for (var j = 0; j < shownT; j++) {
          var tslot = api.el('div', 'pvl-slot pvl-slot--rod' + (j >= 10 ? ' extra' : ''));
          if (j < counts.tens) tslot.appendChild(self._blockBtn('rod', srKeys.tens, pl, j));
          tray.appendChild(tslot);
        }
      } else {
        /* the 3-wide bay. Three wide is the only arrangement that is
           square at the ceiling, so the column is the same WIDTH at one
           hundred as at nine and the mat can never reflow sideways.
           ⚠ Only the rows in use are laid out (plus one waiting slot),
           because a permanent 3x3 of ghosts is seven empty boxes
           dominating a board that holds two hundreds. The column's
           HEIGHT is reserved for all three rows by --pvl-bh, so the
           unit never changes as hundreds arrive — a cube that shrinks
           when you add a hundred is a broken instrument. */
        var rows = Math.min(3, Math.max(1, Math.ceil((counts.hundreds + 1) / 3)));
        for (var i = 0; i < rows * 3; i++) {
          var hslot = api.el('div', 'pvl-slot pvl-slot--flat');
          if (i < counts.hundreds) hslot.appendChild(self._blockBtn('flat', srKeys.hundreds, pl, i));
          tray.appendChild(hslot);
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
  /* =====================================================================
     THE MATERIAL — and the one law it must obey.

     ⭐⭐ Every piece is drawn as TEN of the piece below it, AND at ten
     times its area. Both halves matter and the shipped tool had
     neither: it drew ten segments on a rod that was 4.32 cubes tall and
     a 10x10 grid on a flat that was 3.53 rods wide, so a child counting
     seams got the right answer and a child comparing sizes was told a
     ten is worth about three and a half ones — the exact misconception
     base-ten material exists to kill. The header asserted the correct
     law while the geometry violated it, and named the reason it
     survived: nothing measured it.

     Geometry, in units of --pvl-u:
        cube  1u x  1u     one unit
        rod   1u x 10u     ten cubes stacked, each segment EXACTLY 1u
        flat 10u x 10u     ten rods side by side, a hundred cubes
     so ten rods laid flush occupy exactly one flat's footprint. That
     identity is the tool's central claim and it is now the layout's own
     answer rather than an assertion — verify-place-value-lab.js
     measures it off the rendered SVG.

     ⚠ NO preserveAspectRatio="none" anywhere. The old rod stretched a
     square viewBox non-uniformly, which is why its vertical and
     horizontal edges rendered at different widths (1.36 vs 1.52px) and
     its corner radius came out an ellipse.
     ⚠ Every stroke carries vector-effect="non-scaling-stroke", so the
     weights below are DEVICE pixels at every size. Without it the rod's
     outline measured 0.88px at 360 (invisible) and the flat's 7.7px at
     2400 (a black band) — a 2.6x spread across three pieces that are
     supposed to be one material.
     ONE ink on every edge (#0F4A40, 10:1 on the card) so contrast comes
     from the outline rather than the fill; the honey flat's fill is
     only 1.56:1 and used to read as a hole in the mat. */
  INK: '#0F4A40',

  _cubeSvg: function () {
    /* the unit. The ONLY piece with no internal line — being plain is
       itself the countable signal ("the plain one is one"). */
    return '<svg viewBox="0 0 10 10" class="pvl-svg" aria-hidden="true">'
      + '<rect x="0.35" y="0.35" width="9.3" height="9.3" rx="1.9" fill="#F2784B"/>'
      + '<path d="M0.35 7.6 h9.3 v0.15 a1.9 1.9 0 0 1-1.9 1.9 h-5.5 a1.9 1.9 0 0 1-1.9-1.9 z" fill="' + this.INK + '" opacity=".13"/>'
      + '<rect x="0.35" y="0.35" width="9.3" height="9.3" rx="1.9" fill="none" stroke="' + this.INK + '" stroke-width="2" vector-effect="non-scaling-stroke"/>'
      + '</svg>';
  },

  _rodSvg: function () {
    /* ten cubes. Nine seams at SEAM weight, each gap exactly one unit.
       Seams are INK at 55%, not white: white dividers on teal read as
       gaps between separate bars, a dark seam reads as the join between
       adjoining cubes — which is what a rod is. */
    var seams = '';
    for (var i = 1; i < 10; i++) {
      seams += '<line x1="0.35" x2="9.65" y1="' + (i * 10) + '" y2="' + (i * 10) + '" data-seam="' + i + '"/>';
    }
    return '<svg viewBox="0 0 10 100" class="pvl-svg" aria-hidden="true">'
      + '<rect x="0.35" y="0.35" width="9.3" height="99.3" rx="1.9" fill="#146B5E"/>'
      + '<g stroke="' + this.INK + '" stroke-width="1.5" vector-effect="non-scaling-stroke" opacity=".55" data-units="10">' + seams + '</g>'
      + '<path d="M0.35 97.6 h9.3 v0.15 a1.9 1.9 0 0 1-1.9 1.9 h-5.5 a1.9 1.9 0 0 1-1.9-1.9 z" fill="' + this.INK + '" opacity=".13"/>'
      + '<rect x="0.35" y="0.35" width="9.3" height="99.3" rx="1.9" fill="none" stroke="' + this.INK + '" stroke-width="2" vector-effect="non-scaling-stroke"/>'
      + '</svg>';
  },

  _flatSvg: function () {
    /* ten rods. TWO weights, TWO meanings — this is the fix for the
       woven-mesh problem: the old flat drew 18 identical hairlines and
       so read as graph paper. Rod boundaries at SEAM weight make the
       ten rods countable; the unit lines sit at HAIR weight behind them
       so the hundred is present without becoming texture. */
    var rods = '', hair = '';
    for (var i = 1; i < 10; i++) {
      rods += '<line x1="' + (i * 10) + '" x2="' + (i * 10) + '" y1="0.35" y2="99.65" data-rod="' + i + '"/>';
      hair += '<line y1="' + (i * 10) + '" y2="' + (i * 10) + '" x1="0.35" x2="99.65"/>';
    }
    return '<svg viewBox="0 0 100 100" class="pvl-svg" aria-hidden="true">'
      + '<rect x="0.35" y="0.35" width="99.3" height="99.3" rx="1.9" fill="#F2C879"/>'
      + '<g class="pvl-flat-hair" stroke="' + this.INK + '" stroke-width="1" vector-effect="non-scaling-stroke" opacity=".30">' + hair + '</g>'
      + '<g stroke="' + this.INK + '" stroke-width="1.5" vector-effect="non-scaling-stroke" opacity=".55" data-rods="10">' + rods + '</g>'
      + '<path d="M0.35 97.6 h99.3 v0.15 a1.9 1.9 0 0 1-1.9 1.9 h-95.5 a1.9 1.9 0 0 1-1.9-1.9 z" fill="' + this.INK + '" opacity=".13"/>'
      + '<rect x="0.35" y="0.35" width="99.3" height="99.3" rx="1.9" fill="none" stroke="' + this.INK + '" stroke-width="2" vector-effect="non-scaling-stroke"/>'
      + '</svg>';
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
        /* tinted by the place it CREATES — honey for a hundred, teal
           for a ten. Honey used to mean both "hundreds" and "a bundle
           is available", so a honey offer beside the hundreds column
           read as "these belong over there". */
        var mh = api.el('button', 'pvl-ctxbtn make toHundred');
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
    var sp = this._spanEls && (this._spanEls[pl] || this._spanEls.atom || this._spanEls.tenMark || this._spanEls.scoreMark);
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
      if (p && !seen[p] && (p === 'hundreds' || p === 'tens' || p === 'ones' || p === 'tenMark' || p === 'scoreMark' || p === 'atom')) { seen[p] = true; order.push({ p: p, el: kids[i] }); }
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
    var chip = this._spanEls && (this._spanEls[pl] || this._spanEls.atom || this._spanEls.tenMark || this._spanEls.scoreMark);
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
        var parts = this.fmt('showPrompt', { n: '\u0000' }).split('\u0000');
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
      var txt = this.fmt('subPrompt', { a: this.sub.a, b: '\u0000' }).split('\u0000');
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
  /* ⭐ MOUNT INSIDE THE CARD, not on <body>. Both panels are
     position:fixed, so where they sit in the tree does not move them —
     but it decides whether anything can SEE them. The shared liveness
     gate snapshots `.lcs-app`, so a panel appended to <body> is
     invisible to it, and "Type a number" and "Our numbers" scored DEAD
     in every entitlement state while working perfectly.

     The diagnosis is in the gate's own output: "Our numbers" PASSED for
     anon and free — where it renders the paywall line inside the card —
     and FAILED for premium, where it opens the panel. Same control, same
     click, opposite verdicts, decided entirely by which side of
     `.lcs-app` the result landed on.

     ⚠ position:fixed resolves against the viewport unless an ancestor
     establishes a containing block (transform / filter / contain), which
     `.lcs-app` does not — it is position:relative + overflow:hidden, and
     neither of those captures a fixed descendant. Verified by measuring
     the rendered panel rect before and after. */
  _mountPanel: function (scrim, panel) {
    var self = this;
    scrim.addEventListener('click', function () { self._closePanel(); });
    var host = document.querySelector('.lcs-app') || document.body;
    host.appendChild(scrim);
    host.appendChild(panel);
    this._panelEl = panel;
    this._scrimEl = scrim;
  },
  _closePanel: function () {
    if (this._panelEl) { this._panelEl.remove(); this._panelEl = null; }
    if (this._scrimEl) { this._scrimEl.remove(); this._scrimEl = null; }
  },

  /* =====================================================================
     THE PRINT SHEET — three pages, and the third is the point.

     The tool shipped with NO print at all: no chip, no @media print, so
     it was not even on the roster of audit-tool-print-sheets.js. A v4
     instrument sells "free apparatus, paid depth AND RECORD", and there
     was nothing here that could leave the room.

     Built as REAL DOM (the build-plan pattern), display:none on screen,
     rather than printing the web page — the defect #40 and #41 both
     shipped, where a Print chip called window.print() with no print
     block at all.

     ⚠ ZERO FILLS, and deliberately NO print-color-adjust:exact. The
     sheet carries no colour, so it prints identically on any school
     printer and costs almost no ink — and in black and white the three
     places are still told apart, by LINE PATTERN: plain, ten seams, ten
     by ten. The redrawn material survives a photocopier losslessly;
     the old art did not, because #F2C879 and #F2784B both reduce to the
     same pale grey.

     ⭐ PAGE 3 IS THE ONE THAT EARNS THE CHIP. It prints cut-out blocks
     at a size where a child can cut a rod into ten squares with
     scissors and lay them on a flat — which makes the tool's central
     claim physically checkable, the one thing the screen cannot do at
     true scale (a true flat at a 34px cube is 340px square, and no
     column holds two of those). The compromise the geometry has to
     make, the paper does not.
     ===================================================================== */
  _buildSheet: function () {
    var api = this.api, self = this;
    var sheet = api.el('div', 'pvl-sheet');
    var colKeys = { hundreds: 'colHundreds', tens: 'colTens', ones: 'colOnes' };

    function page(cls) { var p = api.el('div', 'pvl-page ' + cls); sheet.appendChild(p); return p; }
    function label(host, txt) { var l = api.el('div', 'pvl-plabel'); l.textContent = txt; host.appendChild(l); return l; }

    /* ---- page 1: the mat, for pinning up and laying real blocks on -- */
    var p1 = page('pvl-page--mat');
    var mat = api.el('div', 'pvl-pmat');
    this._places().forEach(function (pl) {
      var col = api.el('div', 'pvl-pcol pvl-pcol--' + pl);
      label(col, api.t(colKeys[pl]));
      var bay = api.el('div', 'pvl-pbay pvl-pbay--' + pl);
      var n = pl === 'hundreds' ? 9 : pl === 'tens' ? 10 : 10;
      for (var i = 0; i < n; i++) bay.appendChild(api.el('div', 'pvl-pcell pvl-pcell--' + pl));
      col.appendChild(bay);
      mat.appendChild(col);
    });
    p1.appendChild(mat);

    /* ---- page 2: the record strip — what the class built ------------ */
    var p2 = page('pvl-page--record');
    for (var r = 0; r < 5; r++) {
      var row = api.el('div', 'pvl-prow');
      var boxes = api.el('div', 'pvl-pboxes');
      this._places().forEach(function (pl) {
        var b = api.el('div', 'pvl-pbox');
        var t = api.el('span', 'pvl-pboxlbl');
        t.textContent = api.t({ hundreds: 'slotH', tens: 'slotT', ones: 'slotO' }[pl]);
        b.appendChild(t);
        boxes.appendChild(b);
      });
      row.appendChild(boxes);
      row.appendChild(api.el('div', 'pvl-prule'));
      p2.appendChild(row);
    }

    /* ---- page 3: cut-outs, drawn on the SAME geometry as the screen -- */
    var p3 = page('pvl-page--cut');
    var cuts = api.el('div', 'pvl-pcuts');
    var i2;
    var flats = api.el('div', 'pvl-pcutrow');
    for (i2 = 0; i2 < 2; i2++) flats.appendChild(self._cutFlat());
    cuts.appendChild(flats);
    var rods = api.el('div', 'pvl-pcutrow');
    for (i2 = 0; i2 < 6; i2++) rods.appendChild(self._cutRod());
    cuts.appendChild(rods);
    var cubes = api.el('div', 'pvl-pcutrow pvl-pcutrow--cubes');
    for (i2 = 0; i2 < 20; i2++) cubes.appendChild(self._cutCube());
    cuts.appendChild(cubes);
    p3.appendChild(cuts);

    return sheet;
  },
  /* the cut-outs reuse the screen's own viewBoxes, so a printed rod is
     ten printed cubes by construction and not by a second drawing that
     could drift from the first */
  _cutCube: function () {
    var d = this.api.el('div', 'pvl-pcube');
    d.innerHTML = '<svg viewBox="0 0 10 10" aria-hidden="true"><rect x="0.4" y="0.4" width="9.2" height="9.2" rx="1.9" fill="none" stroke="#333" stroke-width="1.6" vector-effect="non-scaling-stroke"/></svg>';
    return d;
  },
  _cutRod: function () {
    var seams = '';
    for (var i = 1; i < 10; i++) seams += '<line x1="0.4" x2="9.6" y1="' + (i * 10) + '" y2="' + (i * 10) + '"/>';
    var d = this.api.el('div', 'pvl-prod');
    d.innerHTML = '<svg viewBox="0 0 10 100" aria-hidden="true">'
      + '<g stroke="#333" stroke-width="1" vector-effect="non-scaling-stroke">' + seams + '</g>'
      + '<rect x="0.4" y="0.4" width="9.2" height="99.2" rx="1.9" fill="none" stroke="#333" stroke-width="1.6" vector-effect="non-scaling-stroke"/></svg>';
    return d;
  },
  _cutFlat: function () {
    var rods = '', hair = '';
    for (var i = 1; i < 10; i++) {
      rods += '<line x1="' + (i * 10) + '" x2="' + (i * 10) + '" y1="0.4" y2="99.6"/>';
      hair += '<line y1="' + (i * 10) + '" y2="' + (i * 10) + '" x1="0.4" x2="99.6"/>';
    }
    var d = this.api.el('div', 'pvl-pflat');
    d.innerHTML = '<svg viewBox="0 0 100 100" aria-hidden="true">'
      + '<g stroke="#999" stroke-width="0.6" vector-effect="non-scaling-stroke">' + hair + '</g>'
      + '<g stroke="#333" stroke-width="1" vector-effect="non-scaling-stroke">' + rods + '</g>'
      + '<rect x="0.4" y="0.4" width="99.2" height="99.2" rx="1.9" fill="none" stroke="#333" stroke-width="1.6" vector-effect="non-scaling-stroke"/></svg>';
    return d;
  },

  _buildDock: function () {
    var api = this.api, self = this;
    var dock = api.el('div', 'pvl-dock');
    var modes = api.el('div', 'pvl-modes');
    [['build', 'modeBuild', true], ['show', 'modeShow', true], ['sub', 'modeSub', this.premium]].forEach(function (m) {
      var chip = api.el('button', 'pvl-chip' + (self.mode === m[0] ? ' active' : '') + (m[2] ? '' : ' locked'));
      chip.type = 'button';
      /* the active mode was signalled by a CSS class alone, so a screen
         reader could not tell which of the three was current */
      chip.setAttribute('aria-pressed', self.mode === m[0] ? 'true' : 'false');
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
    var pr = api.el('button', 'pvl-chip');
    pr.type = 'button';
    pr.textContent = api.t('printBtn');
    pr.addEventListener('click', function () { window.print(); });
    tools.appendChild(pr);
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
    this.st.h = 1; this.st.t = 2; this.st.o = 4;
    this.sub = { a: null, b: null, phase: 'idle', removedT: 0, removedO: 0 };
    this._marked = null;
    if (this._panelEl) this._closePanel();
    this.render();
  },
  onSettings: function () {
    this.st.bundleMode = this.api.settings.bundle;
    var mp = this._maxPlaces();
    if (mp !== this.st.maxPlaces) {
      this.st.maxPlaces = mp;
      /* dropping to two places must not leave the mat holding a value
         the two cards cannot show (the I1/R1 invariant) — fold the
         hundreds down if they fit, else clamp to the ceiling. */
      if (mp < 3 && this.st.h > 0) {
        this.st.h = 0;
        while (this.engineValue(this.st) > this.engineMaxValue(this.st)) {
          if (this.st.o > 0) this.st.o -= 1; else if (this.st.t > 0) this.st.t -= 1; else break;
        }
      }
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
  + '.pvl-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(8px,1.4vmin,14px);width:100%;'
  +   'container-type:inline-size;}'

  /* ===================================================================
     ⭐⭐ ONE UNIT, DECLARED UNCONDITIONALLY.

     --pvl-u used to be declared ONLY inside @media (min-width:1367px),
     while being READ at twenty sites — so at every viewport at or below
     1366 (every phone, every tablet, and the 1024/1366 desktop a
     teacher actually projects from) all twenty fell back to a hardcoded
     44px while the columns stayed fluid. Fixed geometry in a fluid box
     is the whole of the reported defect: a five-column 44px ones grid
     inside a column that shrinks with the viewport walks straight out
     of its card. Measured at the worst state, 24 blocks sat up to 195px
     outside their own column at 768.

     Declared on .pvl-board, which wraps the digits AND the mat, because
     custom properties inherit DOWNWARDS ONLY and those two are
     siblings — the trap that cost the ten-frame rebuild a day, where
     --tnf-u sat on the frame and its siblings silently used the
     fallback while every floor still passed.

     --pvl-b is the board's width in units (set from JS beside --pvl-p):
       3 places  hundreds 30u + tens 10u + ones 5u + chrome  = 52
       2 places             tens 10u + ones 5u + chrome      = 19
     Width sets demand; a height budget sets the ceiling, so a two-place
     mat on a wide short screen cannot grow a rod taller than the fold.
     =================================================================== */
  + '.pvl-board{--pvl-u:clamp(6px,min(calc(100cqw / var(--pvl-b,20.2)),calc(var(--pvl-hbudget,calc(100vh - 420px)) / var(--pvl-bh,27))),var(--pvl-umax,72px));'
  +   'display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.2vmin,12px);width:100%;}'
  /* the width budget and the mat's tracks, in units. 30/10/5 for the
     material + 1.2 of column padding each + 0.8 per gap + 2 of board
     margin. Keyed on the attribute so a container query can restack. */
  /* --pvl-bh is the board's HEIGHT in units: the tallest tray (a 3x3
     hundreds bay is 30.6u; two tens banks are 20u) plus slack for the
     column label and the fixed-size controls. */
  + '.pvl-board[data-places="2"]{--pvl-b:20.2;--pvl-bh:26;'
  +   '--pvl-tracks:calc(var(--pvl-u) * 11.2) calc(var(--pvl-u) * 6.2);}'
  + '.pvl-board[data-places="3"]{--pvl-b:52.2;--pvl-bh:38;'
  +   '--pvl-tracks:calc(var(--pvl-u) * 31.2) calc(var(--pvl-u) * 11.2) calc(var(--pvl-u) * 6.2);}'
  + '.pvl-grid{display:grid;gap:calc(var(--pvl-u) * 0.8);justify-content:center;width:100%;}'
  /* columns are sized to what they HOLD, not shared equally — a ones
     column is five units wide and a hundreds bay is thirty, and forcing
     them to 1fr is what made the mat read as three sparse boxes. */
  + '.pvl-mat{grid-template-columns:var(--pvl-tracks);align-items:stretch;}'
  /* ⭐ STACK when the board is too narrow to stand the places side by
     side. Three 30u-wide bays cannot share a phone; side-by-side there
     drives the unit down to a few pixels and pushes the material out of
     the card (measured: 144 blocks escaping by 59px at 360). Stacked,
     each place gets the full width and the budget is the widest one. */
  + '@container (max-width:700px){'
  /* stacked, the page scrolls (body.pvl-wide{overflow-y:auto} ≤560), so
     WIDTH should bind rather than the fold — a height-bound unit here
     drove the cube to 8px for no gain. */
  +   '.pvl-board[data-places="3"]{--pvl-b:33.2;--pvl-hbudget:400vh;}'
  +   '.pvl-board[data-places="2"]{--pvl-b:13.2;--pvl-hbudget:400vh;}'
  +   '.pvl-mat{grid-template-columns:minmax(0,max-content);}'
  + '}'

  /* prompt strip */
  + '.pvl-prompt{font-family:var(--lcs-font-display);font-weight:700;color:var(--lcs-structure);'
  +   'font-size:clamp(19px,2.8vmin,30px);text-align:center;}'
  + '.pvl-prompt em{color:#C9502A;font-style:normal;}'

  /* the display band */
  + '.pvl-top{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:8px;}'
  /* ONE numeral group, not three cards scattered across the mat's
     column template. Cells adjacent with a hairline place divider, so
     "304" reads as a number and the word beneath it lines up with it. */
  + '.pvl-digits{display:flex;align-items:stretch;justify-content:center;gap:0;'
  +   'background:#FFFEFB;border-radius:18px;box-shadow:var(--lcs-shadow);overflow:hidden;}'
  + '.pvl-digit{display:flex;flex-direction:column;align-items:center;gap:2px;'
  +   'background:none;border:none;cursor:pointer;'
  +   'padding:8px 22px 10px;min-width:64px;min-height:44px;transition:transform .1s var(--lcs-ease);}'
  /* AFTER .pvl-digit, or `border:none` above wins and the place
     dividers never render */
  + '.pvl-digit + .pvl-digit{border-left:1px solid var(--lcs-line);}'
  + '.pvl-digit:active{transform:scale(.97);}'
  /* was 13px — the place label is a name a child reads, not a caption */
  + '.pvl-slotlbl{font-family:var(--lcs-font-body);font-weight:800;font-size:16px;letter-spacing:.05em;opacity:.8;}'
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
  /* ⭐ A TEN-MARKER IS A TEN, SO IT WEARS THE TENS COLOUR. This is the
     whole gain from retiring `teen`: "four|teen" now shows a coral 4
     beside a teal ten, in that order — the same picture as German
     "vier|und|zwanzig", in the range a five-year-old actually lives in.
     Under-dotted to say it is a bound form rather than a word a child
     can lift out and say on its own. */
  + '.pvl-span.pvl-part-tenMark{color:#146B5E;background:rgba(20,107,94,.12);'
  +   'border-bottom:2px dotted rgba(20,107,94,.55);}'
  /* the French base-20 unit: eighty, said as four-twenties */
  + '.pvl-span.pvl-part-scoreMark{color:#146B5E;background:rgba(20,107,94,.12);'
  +   'border-bottom:2px double rgba(20,107,94,.55);}'
  /* genuinely unanalysable — eleven, once, seize. Neutral on purpose:
     colouring it would claim a structure it does not have. */
  + '.pvl-span.pvl-part-atom{color:var(--lcs-ink);background:rgba(20,30,28,.06);}'
  + '.pvl-span.pvl-part-joiner{color:#4A4A44;background:transparent;font-weight:600;}'
  + '.pvl-span.pvl-part-none{color:#75756D;background:rgba(20,30,28,.06);font-family:var(--lcs-font-body);'
  +   'font-weight:700;font-size:14px;align-self:center;padding:3px 9px;border-radius:999px;margin:0 5px;}'
  + '.pvl-span.plain{color:var(--lcs-ink)!important;background:transparent!important;}'
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
  /* a ten-marker and a score-marker are tens-magnitude, so their
     arcs travel in the tens colour; an atom is neutral. */
  + '.pvl-arc-tenMark,.pvl-arc-scoreMark{stroke:#146B5E;}'
  + '.pvl-arc-atom{stroke:#4A4A44;}'

  /* the mat */
  + '.pvl-col{background:#FFFEFB;border-radius:22px;box-shadow:var(--lcs-shadow);display:flex;'
  +   'flex-direction:column;align-items:center;gap:calc(var(--pvl-u) * .35);'
  +   'padding:calc(var(--pvl-u) * .6);min-width:0;}'
  + '.pvl-col--tens{background:linear-gradient(rgba(20,107,94,.06),rgba(20,107,94,.06)),#FFFEFB;}'
  + '.pvl-col--hundreds{background:linear-gradient(rgba(242,200,121,.1),rgba(242,200,121,.1)),#FFFEFB;}'
  + '.pvl-collbl{font-family:var(--lcs-font-body);font-weight:800;font-size:15px;letter-spacing:.06em;'
  +   'text-transform:uppercase;color:var(--lcs-ink-soft);}'
  /* ⚠ CONTROLS ARE CHROME, NOT MATERIAL — do NOT size them off the
     unit. They used to be u*1.273 wide, which was fine at u=44 and
     became a 21x18px button the moment the unit became honest. A
     control has a floor (44px) that has nothing to do with base ten.
     Tonal rather than filled, too: in an apparatus the material is loud
     and the controls are quiet, and a saturated pill in the middle of
     each column was competing with the blocks it produces. */
  + '.pvl-add{width:52px;height:44px;border-radius:14px;cursor:pointer;flex:none;'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:26px;line-height:1;'
  +   'color:#C9502A;background:rgba(242,120,75,.14);border:2px solid #C9502A;'
  +   'transition:transform .1s var(--lcs-ease),background .1s var(--lcs-ease);}'
  + '.pvl-add.pvl-hue-tens{color:#0E4A41;background:rgba(20,107,94,.14);border-color:#146B5E;}'
  + '.pvl-add.pvl-hue-hundreds{color:#6B4E12;background:rgba(242,200,121,.28);border-color:#B98A2E;}'
  + '.pvl-add:active{transform:translateY(2px);background:#F2784B;color:#fff;}'
  + '.pvl-add.pvl-hue-tens:active{background:#146B5E;color:#fff;}'
  + '.pvl-add.pvl-hue-hundreds:active{background:#F2C879;}'
  /* ===================================================================
     FIXED-TRACK TRAYS. Every tray is a grid of a KNOWN number of unit
     tracks, so its footprint is a function of (viewport, place count)
     and NEVER of state. That single property is what makes all three
     reported overflows structurally impossible rather than patched:
     nothing here can grow when a block is added, because the tracks
     were already there.

       hundreds  3 x 3 bay, 2 rows visible          30u wide, 20u tall
       tens      two flush banks of ten             10u wide, 20u tall
       ones      5 x 4 flush frame                   5u wide,  4u tall

     ⭐ THE TENS BANK IS THE POINT. Ten rods at 1u x 10u laid FLUSH
     occupy exactly 10u x 10u — pixel-identical to one flat. A completed
     bank IS a hundred, and the layout says so rather than the copy: the
     zero gap is load-bearing, not a style choice.

     Trays align to the BOTTOM (align-items:end on the mat, and the
     material sits at the end of the column) because material rests on a
     surface. It also stops a short ones column reading as a sparse box.
     =================================================================== */
  /* flex:1 + align-content:end — the material rests on the FLOOR of the
     column, which is where material rests. Columns stretch to a common
     height so the three bays read as one table rather than three boxes. */
  + '.pvl-tray{width:100%;flex:1;display:grid;justify-content:center;align-content:end;'
  +   'padding:calc(var(--pvl-u) * .3);border-radius:14px;}'
  /* ⚠ NO SCROLLING BAY. The first attempt showed two of the three rows
     and scrolled the third — but `align-content:end` inside an
     overflowing grid pushes the overflow off the TOP, so with two
     hundreds on the mat both flats rendered at their full 165px and
     neither was on screen. Every gate passed; the renders showed an
     empty bay. All nine are laid out, and the unit budget carries the
     height instead. */
  + '.pvl-tray--hundreds{grid-template-columns:repeat(3,calc(var(--pvl-u) * 10));'
  +   'grid-auto-rows:calc(var(--pvl-u) * 10);gap:calc(var(--pvl-u) * .3);}'
  /* zero gap — a full bank must be a flat, exactly */
  + '.pvl-tray--tens{grid-template-columns:repeat(10,var(--pvl-u));'
  +   'grid-auto-rows:calc(var(--pvl-u) * 10);gap:0;height:calc(var(--pvl-u) * 20);}'
  + '.pvl-tray--ones{grid-template-columns:repeat(5,var(--pvl-u));grid-auto-rows:var(--pvl-u);'
  +   'gap:0;height:calc(var(--pvl-u) * 4);}'
  + '.pvl-tray--ones.offer{outline:calc(var(--pvl-u) * .12) dashed #146B5E;outline-offset:3px;border-radius:10px;}'
  /* the ghost slot at ~2:1 against the card — it used to sit at 1.33:1,
     invisible from the back of a classroom, which silently removed the
     "how close to ten" frame that is half the bundling lesson. */
  + '.pvl-slot{width:var(--pvl-u);height:var(--pvl-u);border-radius:calc(var(--pvl-u) * .2);'
  +   'border:2px dashed rgba(15,74,64,.30);box-sizing:border-box;}'
  + '.pvl-slot--rod{width:var(--pvl-u);height:calc(var(--pvl-u) * 10);}'
  + '.pvl-slot--flat{width:calc(var(--pvl-u) * 10);height:calc(var(--pvl-u) * 10);}'
  /* past the frame — said with line STYLE, not a second hue (honey here
     would claim these ones belong to the hundreds column) */
  + '.pvl-slot.extra{border-style:solid;}'
  /* ⚠ the drawn cube is small at true 1:10:100 scale (16-33px), which is
     under the 34px canvas floor. The hit box is separated from the art
     rather than the floor being dropped — legitimate HERE because
     engineRemove decrements a COUNT and never identifies which block was
     tapped, so the blocks are fungible and overlapping hit boxes cost
     nothing. Declared, and gated. */
  + '.pvl-block{border:none;background:none;padding:0;cursor:pointer;position:relative;'
  +   'transition:transform .1s var(--lcs-ease);}'
  + '.pvl-block:after{content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);'
  +   'width:max(100%,34px);height:max(100%,34px);}'
  + '.pvl-block:active{transform:scale(.94);}'
  /* marked = LIFTED, not judged. The old treatment desaturated coral to
     a muddy tan that was in no palette and tonally closer to an empty
     slot than to a live block, then stamped a verdict on it — so "seven
     marked to take away" read as "seven already gone", and a fixed 26px
     disc covered the very seams a child counts. Kind, never hue. */
  + '.pvl-block.marked{transform:translateY(-6%);filter:drop-shadow(0 4px 3px rgba(15,74,64,.28));}'
  + '.pvl-block.marked .pvl-svg{opacity:.92;}'
  + '.pvl-block.marked rect[stroke]{stroke-dasharray:5 4;}'
  + '.pvl-cube{width:var(--pvl-u);height:var(--pvl-u);display:block;}'
  + '.pvl-rod{width:var(--pvl-u);height:calc(var(--pvl-u) * 10);display:block;}'
  + '.pvl-flat{width:calc(var(--pvl-u) * 10);height:calc(var(--pvl-u) * 10);display:block;}'
  + '.pvl-svg{width:100%;height:100%;display:block;}'
  /* the hundred cells become texture below ~100px of rendered flat —
     ten countable rods survive, a hundred 7px cells do not. */
  + '@container (max-width:760px){.pvl-flat-hair{display:none;}}'
  + '.pvl-incoming{visibility:hidden;}'
  + '.pvl-ctxrow{min-height:48px;display:flex;align-items:center;justify-content:center;gap:10px;'
  +   'flex-wrap:wrap;width:100%;}'
  + '.pvl-ctxslot{display:contents;}'
  + '.pvl-ctxbtn{font-family:var(--lcs-font-display);font-weight:700;font-size:15px;border-radius:999px;'
  +   'padding:9px 18px;min-height:44px;cursor:pointer;border:none;white-space:nowrap;}'
  + '.pvl-ctxbtn.make{background:#146B5E;color:#fff;box-shadow:0 3px 0 0 #0E4A41;animation:pvlBreathe 1.8s ease-in-out infinite;}.pvl-ctxbtn.make.toHundred{background:#F2C879;color:#6B4E12;box-shadow:0 3px 0 0 #B98A2E;}'
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
  /* ⚠ compact may shrink CHROME only. It used to override .pvl-rod and
     .pvl-flat to fixed pixel sizes while leaving .pvl-cube alone, which
     is one of the three places the ten-ness ratio silently drifted. The
     unit is the only lever now: change --pvl-hbudget, never a piece. */
  + '.pvl-wrap.compact{gap:6px;}'
  + '.pvl-wrap.compact .pvl-board{--pvl-hbudget:calc(100vh - 470px);}'
  + '.pvl-wrap.compact .pvl-dg{font-size:clamp(36px,5.2vmin,54px);}'
  + '.pvl-wrap.compact .pvl-digit{padding:5px 18px 7px;}'
  + '.pvl-wrap.compact .pvl-word{font-size:clamp(19px,2.5vmin,26px);}'
  + '.pvl-wrap.compact .pvl-prompt{font-size:clamp(17px,2.4vmin,25px);}'
  + '.pvl-wrap.compact .pvl-big{min-height:46px;padding:8px 22px;}'
  + '.pvl-wrap.compact .pvl-ctx{min-height:40px;}'

  /* phone. ⚠ NOT ONE PIECE SIZE HERE — the old block redeclared the
     cube at 40px, the rod at 28x110 and the flat at 76x76, three
     independent numbers whose ratio (2.75 and 2.24) was even further
     from base ten than the desktop's. The unit handles it now. */
  + '@media (max-width:560px){'
  +   'body.pvl-wide{overflow-y:auto;}'
  +   '.pvl-dg{font-size:40px;}'
  +   '.pvl-word{font-size:20px;}'
  +   '.pvl-arcs{display:none;}'
  +   '.pvl-wordrow{padding:0;}'
  +   '.pvl-speak{position:static;transform:none;}'
  +   '.pvl-speak.decomp{position:static;}'
  +   '.pvl-speak:active{transform:translateY(2px);}'
  + '}'
  /* ---- wide board (§23, the apparatus a teacher teaches FROM) ----
     The tiers now raise ONE number: the card width the container query
     measures, plus the unit's own ceiling. Nothing here touches a piece,
     so no ratio can drift — that was the previous block's stated
     intention and it did not hold, because the compact and phone blocks
     each redeclared rod and flat behind its back.
     ⚠ Chrome that sits OUTSIDE the block geometry (column labels,
     regroup chips) is still ramped by hand; leaving it turns a big
     apparatus into a big apparatus with phone-sized controls. */
  + '@media (min-width:1367px) and (min-height:880px){'
  +   'body.pvl-wide .lcs-app{max-width:min(1192px,97vw);}'
  +   'body.pvl-wide .pvl-board{--pvl-umax:26px;--pvl-hbudget:calc(100vh - 400px);}'
  +   'body.pvl-wide .pvl-collbl{font-size:18px;}'
  +   'body.pvl-wide .pvl-ctxbtn{font-size:18px;}'
  /* ⚠ .pvl-speak is position:absolute;right:56px inside a full-width row,
     so widening the board did not move it CLOSER to the number word — it
     pinned it to the right edge of a 1704px row, ~600px away from the
     thing it speaks. Put the two buttons back in the flow, as the phone
     rule already does. */
  +   'body.pvl-wide .pvl-speak{position:static;transform:none;width:48px;height:48px;}'
  +   'body.pvl-wide .pvl-speak:active{transform:translateY(2px);}'
  +   'body.pvl-wide .pvl-speak svg{width:60%;height:60%;}'
  +   'body.pvl-wide .pvl-wordrow{gap:16px;}'
  /* the word sitting directly under the digits IS the teaching point, so
     a mirror spacer the exact width of the two buttons and their gaps
     restores the centring with no DOM change. */
  +   'body.pvl-wide .pvl-wordrow::before{content:"";flex:0 0 128px;}'
  + '}'
  + '@media (min-width:1800px) and (min-height:1080px){'
  +   'body.pvl-wide .lcs-app{max-width:min(1560px,97vw);}'
  +   'body.pvl-wide .pvl-board{--pvl-umax:34px;--pvl-hbudget:calc(100vh - 400px);}'
  +   'body.pvl-wide .pvl-collbl{font-size:21px;}'
  +   'body.pvl-wide .pvl-ctxbtn{font-size:20px;}'
  + '}'
  + '@media (min-width:2400px) and (min-height:1150px){'
  +   'body.pvl-wide .lcs-app{max-width:min(1752px,97vw);}'
  +   'body.pvl-wide .pvl-board{--pvl-umax:44px;--pvl-hbudget:calc(100vh - 400px);}'
  +   'body.pvl-wide .pvl-collbl{font-size:23px;}'
  +   'body.pvl-wide .pvl-ctxbtn{font-size:22px;}'
  + '}'

  /* ===================== the print sheet ============================
     Hidden on screen, three pages on paper. No fills, no colour, and
     deliberately no print-color-adjust — the sheet is line art, so it
     prints the same on any school printer. */
  + '.pvl-sheet{display:none;}'
  + '@media print{'
  +   '.lcs-header,.lcs-bar,.pvl-top,.pvl-mat,.pvl-dock,.pvl-ctxrow,.pvl-gate,'
  +   '.pvl-prompt,.pvl-promptbox,.pvl-scrim,.pvl-panel{display:none !important;}'
  +   '.pvl-sheet{display:block !important;background:#fff !important;}'
  +   'html,body,.lcs-app,.lcs-stage{background:#fff !important;box-shadow:none !important;}'
  +   '.pvl-wrap,.pvl-board{display:block !important;gap:0 !important;}'
  +   '.pvl-page{break-after:page;break-inside:avoid;padding:0;}'
  +   '.pvl-page:last-child{break-after:auto;}'
  +   '@page{margin:14mm;}'
  /* page 1 — the mat, at a size a teacher lays real blocks on */
  +   '.pvl-pmat{display:flex;align-items:flex-start;justify-content:center;gap:6mm;}'
  +   '.pvl-pcol{border:0.5mm solid #333;border-radius:3mm;padding:3mm;}'
  +   '.pvl-plabel{font-family:var(--lcs-font-body);font-weight:800;font-size:11pt;'
  +     'text-transform:uppercase;letter-spacing:.05em;color:#000;text-align:center;margin-bottom:2.5mm;}'
  +   '.pvl-pbay{display:grid;gap:1mm;justify-content:center;}'
  +   '.pvl-pbay--hundreds{grid-template-columns:repeat(3,26mm);grid-auto-rows:26mm;}'
  /* ⚠ TEN ACROSS, not five. The first draft wrapped the bank into 5x2,
     which prints a shape that is not a hundred and quietly loses the
     one thing the tens bay is for: ten rods side by side occupy exactly
     one flat, so a full bank IS a hundred — on paper as on screen. */
  +   '.pvl-pbay--tens{grid-template-columns:repeat(10,2.6mm);grid-auto-rows:26mm;gap:0;}'
  +   '.pvl-pbay--ones{grid-template-columns:repeat(5,2.6mm);grid-auto-rows:2.6mm;gap:0;}'
  +   '.pvl-pcell{border:0.35mm dashed #666;box-sizing:border-box;}'
  /* page 2 — the record strip: digits, the word, and the blocks drawn */
  +   '.pvl-prow{display:flex;align-items:center;gap:5mm;padding:6mm 0;border-bottom:0.3mm solid #bbb;}'
  +   '.pvl-pboxes{display:flex;gap:0;}'
  +   '.pvl-pbox{width:16mm;height:20mm;border:0.5mm solid #333;position:relative;box-sizing:border-box;}'
  +   '.pvl-pbox + .pvl-pbox{border-left:0.25mm solid #333;}'
  +   '.pvl-pboxlbl{position:absolute;top:1mm;left:0;right:0;text-align:center;'
  +     'font-family:var(--lcs-font-body);font-weight:800;font-size:8pt;color:#666;}'
  +   '.pvl-prule{flex:1;border-bottom:0.4mm solid #333;height:14mm;}'
  /* page 3 — the cut-outs. A printed rod IS ten printed cubes. */
  +   '.pvl-pcuts{display:flex;flex-direction:column;gap:5mm;}'
  +   '.pvl-pcutrow{display:flex;flex-wrap:wrap;gap:3mm;align-items:flex-end;}'
  +   '.pvl-pcutrow--cubes{gap:2mm;}'
  +   '.pvl-pflat{width:52mm;height:52mm;}'
  +   '.pvl-prod{width:5.2mm;height:52mm;}'
  +   '.pvl-pcube{width:5.2mm;height:5.2mm;}'
  +   '.pvl-pflat svg,.pvl-prod svg,.pvl-pcube svg{width:100%;height:100%;display:block;}'
  + '}'

  /* reduced motion */
  + '@media (prefers-reduced-motion: reduce){'
  +   '.pvl-ctxbtn.make,.pvl-ctxbtn.break.glow{animation:none;box-shadow:0 3px 0 0 #B98A2E,0 0 0 4px rgba(242,200,121,.4);}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());

