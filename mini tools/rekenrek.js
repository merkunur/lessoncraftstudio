/* =====================================================================
   TOOL #9 — REKENREK   (rekenrek.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks`). Tool #6 of the Premium Tools
   Program pilot wave — the Dutch/German number-sense instrument as a
   DRAGGABLE manipulable: 1-2 rows × 10 beads (5 coral + 5 white) with
   push-chain drag + a wooden clack, flash mode on the live instrument,
   spoken number words (the einundzwanzig moat), up to the 10-rack
   100-bead wall.

   PEDAGOGY (locked by the 2026-07-16 expert-ensemble design):
     All beads start parked RIGHT; the count side is LEFT (Freudenthal/
     Fosnot/MLC — reds innermost, so a push always arrives red-first:
     7 is SEEN as 5+2). "ONE PUSH" is the soul: showing 7 = grabbing
     the 7th bead and sweeping once; the rattle-run of per-travel
     clacks lets the teacher HEAR one-push vs seven-pushes. NO
     tap-to-move (drag distance IS the counting/structuring
     distinction — tap only wobbles). No answer checking, no equations,
     no themed colors (the 5-break IS the perceptual theory), no
     3+ rows, no auto-counting animation.
     Flash mode: set VISIBLY then Cover (any setting control on the one
     shared screen leaks — the classroom ritual carries improvised
     secrecy; sequences apply configs silently under the shade = true
     secrecy). Half-cover = the "How many are hiding?" missing-part
     game. Readout numerals default OFF (the physical rack has none —
     that absence is pedagogy) and are REMOVED FROM DOM while covered/
     flashing (the numeral-leak gate).

   ENGINE: per-rod state = ONE integer `pushed` (0-10); bead order
   fixed, colors positional. Chain = grab the j-th bead counting from
   the pack's INNER edge → j beads move as a rigid block. Commit at
   ≥50% gap travel or flick; else snap back. No floating beads — the
   gap is not a place. NUM_WORDS_HELPERS is a byte-faithful copy of
   place-value-core's composers (0-999 ×11; used 0-100).
   ===================================================================== */
var Rekenrek = {
  id: 'rekenrek',

  strings: {
    title:        {en:'Rekenrek',de:'Rechenrahmen',fr:'Boulier de calcul',it:'Abaco da 20',es:'Ábaco de 20',pt:'Ábaco de 20',nl:'Rekenrek',sv:'Kulram',da:'Kugleramme',no:'Kuleramme',fi:'Helmitaulu'},
    instruction:  {en:'Slide the beads — five red, five white on every rod. Show a number in one push!',de:'Schiebe die Kugeln — fünf rote, fünf weiße auf jeder Stange. Zeige eine Zahl mit einem Schwung!',fr:'Fais glisser les boules — cinq rouges, cinq blanches sur chaque tige. Montre un nombre en un seul geste !',it:'Fai scorrere le palline — cinque rosse, cinque bianche su ogni asta. Mostra un numero con una spinta sola!',es:'Desliza las cuentas — cinco rojas y cinco blancas en cada fila. ¡Muestra un número de un solo empujón!',pt:'Deslize as contas — cinco vermelhas, cinco brancas em cada haste. Mostre um número de um empurrão só!',nl:'Schuif de kralen — vijf rode en vijf witte op elke rij. Laat een getal in één keer zien!',sv:'Skjut kulorna — fem röda, fem vita på varje stång. Visa ett tal med en knuff!',da:'Skub kuglerne — fem røde, fem hvide på hver stang. Vis et tal med ét skub!',no:'Skyv kulene — fem røde, fem hvite på hver stang. Vis et tall med ett skyv!',fi:'Liu’uta helmiä — viisi punaista, viisi valkoista joka tangolla. Näytä luku yhdellä työnnöllä!'},
    /* in-stage controls */
    racksLabel:   {en:'Racks',de:'Rahmen',fr:'Bouliers',it:'Abachi',es:'Ábacos',pt:'Ábacos',nl:'Rekken',sv:'Ramar',da:'Rammer',no:'Rammer',fi:'Taulut'},
    resetBeads:   {en:'Park the beads',de:'Kugeln zurückschieben',fr:'Ranger les boules',it:'Riporta le palline',es:'Regresar las cuentas',pt:'Recolher as contas',nl:'Kralen terugschuiven',sv:'Skjut tillbaka kulorna',da:'Kuglerne på plads',no:'Parker kulene',fi:'Palauta helmet'},
    speak:        {en:'Say the number',de:'Zahl sprechen',fr:'Dire le nombre',it:'Di’ il numero',es:'Decir el número',pt:'Falar o número',nl:'Zeg het getal',sv:'Säg talet',da:'Sig tallet',no:'Si tallet',fi:'Sano luku'},
    readoutOn:    {en:'Show the numeral',de:'Zahl anzeigen',fr:'Afficher le nombre',it:'Mostra il numero',es:'Mostrar el número',pt:'Mostrar o número',nl:'Toon het getal',sv:'Visa talet',da:'Vis tallet',no:'Vis tallet',fi:'Näytä numero'},
    flashMode:    {en:'Flash',de:'Blitzblick',fr:'Flash',it:'Lampo',es:'Destello',pt:'Relâmpago',nl:'Flitsen',sv:'Blixt',da:'Lyn',no:'Glimt',fi:'Välähdys'},
    exitFlash:    {en:'Leave flash mode',de:'Blitzblick verlassen',fr:'Quitter le mode flash',it:'Esci dal lampo',es:'Salir del destello',pt:'Sair do relâmpago',nl:'Flitsen stoppen',sv:'Lämna blixtläget',da:'Forlad lyntilstand',no:'Avslutt glimtmodus',fi:'Poistu välähdystilasta'},
    rowsNote:     {en:'One row per rack on the big wall.',de:'An der großen Wand hat jeder Rahmen nur eine Stange.',fr:'Sur le grand mur, une rangée par boulier.',it:'Sulla parete del 100, una fila per abaco.',es:'En la pared grande, una fila por ábaco.',pt:'Na parede grande, uma fileira por ábaco.',nl:'Op de grote wand één rij per rek.',sv:'På den stora väggen har varje ram en rad.',da:'På den store væg har hver ramme én række.',no:'På den store veggen har hver ramme én rad.',fi:'Isolla seinällä jokaisessa taulussa on yksi rivi.'},
    /* flash dock */
    cover:        {en:'Cover',de:'Verdecken',fr:'Cacher',it:'Copri',es:'Tapar',pt:'Cobrir',nl:'Gordijn dicht',sv:'Täck över',da:'Dæk til',no:'Dekk til',fi:'Peitä'},
    coverHalf:    {en:'Half',de:'Halb',fr:'Moitié',it:'Metà',es:'Mitad',pt:'Metade',nl:'Half',sv:'Hälften',da:'Halvt',no:'Halvt',fi:'Puoliksi'},
    show:         {en:'Show',de:'Zeigen',fr:'Montrer',it:'Mostra',es:'Mostrar',pt:'Mostrar',nl:'Laat zien',sv:'Visa',da:'Vis',no:'Vis',fi:'Näytä'},
    hideNow:      {en:'Hide now',de:'Jetzt verdecken',fr:'Recacher',it:'Nascondi',es:'Tapar ya',pt:'Esconder',nl:'Verstop',sv:'Dölj',da:'Skjul',no:'Skjul',fi:'Piilota'},
    showAgain:    {en:'Show again',de:'Noch einmal zeigen',fr:'Remontrer',it:'Mostra ancora',es:'Mostrar otra vez',pt:'Mostrar de novo',nl:'Laat nog eens zien',sv:'Visa igen',da:'Vis igen',no:'Vis igjen',fi:'Näytä uudelleen'},
    reveal:       {en:'Reveal',de:'Aufdecken',fr:'Dévoiler',it:'Scopri',es:'Destapar',pt:'Revelar',nl:'Gordijn open',sv:'Ta fram',da:'Tæppet fra',no:'Opp med teppet',fi:'Paljasta'},
    nextStep:     {en:'Next',de:'Weiter',fr:'Suivant',it:'Avanti',es:'Siguiente',pt:'Próximo',nl:'Volgende',sv:'Nästa',da:'Næste',no:'Neste',fi:'Seuraava'},
    coveredAria:  {en:'The rack is hidden behind the curtain',de:'Der Rahmen ist hinter dem Vorhang verdeckt',fr:'Le boulier est caché derrière le rideau',it:'L’abaco è nascosto dietro il sipario',es:'El ábaco está escondido detrás de la cortina',pt:'O ábaco está escondido atrás da cortina',nl:'Het rek zit verstopt achter het gordijn',sv:'Ramen är gömd bakom ridån',da:'Rammen er gemt bag tæppet',no:'Rammen er gjemt bak teppet',fi:'Taulu on piilossa verhon takana'},
    lookAria:     {en:'Look!',de:'Schaut genau!',fr:'Regardez !',it:'Guarda!',es:'¡Miren!',pt:'Olha!',nl:'Kijk!',sv:'Titta!',da:'Se!',no:'Se!',fi:'Katsokaa!'},
    revealedAria: {en:'The rack stays open for talking',de:'Der Rahmen bleibt für das Gespräch offen',fr:'Le boulier reste visible pour la discussion',it:'L’abaco resta visibile per parlarne',es:'El ábaco queda a la vista para platicar',pt:'O ábaco fica visível para a conversa',nl:'Het rek blijft open voor het nagesprek',sv:'Ramen står framme under samtalet',da:'Rammen er åben til samtalen',no:'Rammen er åpen for samtalen',fi:'Taulu jää auki keskustelua varten'},
    /* sequences + panel */
    seqTitle:     {en:'Bead sequences',de:'Kugel-Reihen',fr:'Suites de boules',it:'Serie di palline',es:'Series de cuentas',pt:'Séries de contas',nl:'Kralenreeksen',sv:'Kulserier',da:'Kugleserier',no:'Kuleserier',fi:'Helmisarjat'},
    mySeqs:       {en:'My sequences',de:'Meine Reihen',fr:'Mes suites',it:'Le mie serie',es:'Mis series',pt:'Minhas séries',nl:'Mijn reeksen',sv:'Mina serier',da:'Mine serier',no:'Mine serier',fi:'Omat sarjat'},
    bandK:        {en:'Kindergarten',de:'Vorschule / Klasse 1',fr:'Maternelle (GS)',it:'Infanzia / prima',es:'Preescolar',pt:'Educação Infantil',nl:'Kleuters / groep 3',sv:'Förskoleklass',da:'Børnehaveklasse',no:'1. trinn',fi:'Esiopetus / 1. lk'},
    bandG1:       {en:'Grade 1',de:'Klasse 1–2',fr:'CP',it:'Prima / seconda',es:'1.º de primaria',pt:'1º ano',nl:'Groep 3–4',sv:'Åk 1',da:'1. klasse',no:'1.–2. trinn',fi:'1.–2. luokka'},
    bandG2:       {en:'Grade 2',de:'Klasse 2',fr:'CE1',it:'Seconda',es:'2.º de primaria',pt:'2º ano',nl:'Groep 4–5',sv:'Åk 2',da:'2. klasse',no:'2. trinn',fi:'2. luokka'},
    stepsCount:   {en:'{n} steps',de:'{n} Schritte',fr:'{n} étapes',it:'{n} passi',es:'{n} pasos',pt:'{n} passos',nl:'{n} stappen',sv:'{n} steg',da:'{n} trin',no:'{n} steg',fi:'{n} askelta'},
    freeBadge:    {en:'Free',de:'Kostenlos',fr:'Gratuit',it:'Gratis',es:'Gratis',pt:'Grátis',nl:'Gratis',sv:'Gratis',da:'Gratis',no:'Gratis',fi:'Ilmainen'},
    seqDone:      {en:'Sequence finished — lovely work!',de:'Reihe geschafft — schön gemacht!',fr:'Suite terminée — beau travail !',it:'Serie finita — bel lavoro!',es:'Serie terminada — ¡buen trabajo!',pt:'Série concluída — muito bem!',nl:'Reeks klaar — mooi gedaan!',sv:'Serien klar — fint jobbat!',da:'Serien er færdig — flot klaret!',no:'Serien er ferdig — fint jobbet!',fi:'Sarja valmis — hienoa työtä!'},
    restart:      {en:'Restart',de:'Von vorn',fr:'Recommencer',it:'Ricomincia',es:'Empezar de nuevo',pt:'Recomeçar',nl:'Opnieuw',sv:'Börja om',da:'Forfra',no:'På nytt',fi:'Aloita alusta'},
    backToLibrary:{en:'Back to the sequences',de:'Zurück zu den Reihen',fr:'Retour aux suites',it:'Torna alle serie',es:'Regresar a las series',pt:'Voltar às séries',nl:'Terug naar de reeksen',sv:'Tillbaka till serierna',da:'Tilbage til serierne',no:'Tilbake til seriene',fi:'Takaisin sarjoihin'},
    freePlay:     {en:'Free play',de:'Freies Spiel',fr:'Jeu libre',it:'Gioco libero',es:'Juego libre',pt:'Brincadeira livre',nl:'Vrij spelen',sv:'Fri lek',da:'Fri leg',no:'Fri lek',fi:'Vapaa leikki'},
    /* show a number */
    showNumber:   {en:'Show a number',de:'Eine Zahl zeigen',fr:'Montrer un nombre',it:'Mostra un numero',es:'Mostrar un número',pt:'Mostrar um número',nl:'Een getal tonen',sv:'Visa ett tal',da:'Vis et tal',no:'Vis et tall',fi:'Näytä luku'},
    apply:        {en:'Set the beads',de:'Kugeln einstellen',fr:'Placer les boules',it:'Sistema le palline',es:'Acomodar las cuentas',pt:'Posicionar as contas',nl:'Kralen klaarzetten',sv:'Ställ in kulorna',da:'Sæt kuglerne',no:'Still kulene',fi:'Aseta helmet'},
    /* custom saves */
    addStep:      {en:'Add this as a step',de:'Als Schritt hinzufügen',fr:'Ajouter comme étape',it:'Aggiungi come passo',es:'Agregar como paso',pt:'Adicionar como passo',nl:'Als stap toevoegen',sv:'Lägg till som steg',da:'Tilføj som trin',no:'Legg til som steg',fi:'Lisää askeleeksi'},
    seqName:      {en:'Name your sequence',de:'Name der Reihe',fr:'Nom de la suite',it:'Nome della serie',es:'Nombre de la serie',pt:'Nome da série',nl:'Naam van de reeks',sv:'Seriens namn',da:'Seriens navn',no:'Gi serien et navn',fi:'Sarjan nimi'},
    saveSeq:      {en:'Save sequence',de:'Reihe speichern',fr:'Enregistrer la suite',it:'Salva la serie',es:'Guardar la serie',pt:'Salvar a série',nl:'Reeks opslaan',sv:'Spara serien',da:'Gem serien',no:'Lagre serien',fi:'Tallenna sarja'},
    playSeq:      {en:'Play',de:'Starten',fr:'Lancer',it:'Avvia',es:'Usar',pt:'Usar',nl:'Starten',sv:'Starta',da:'Start',no:'Start',fi:'Aloita'},
    deleteSeq:    {en:'Delete',de:'Löschen',fr:'Supprimer',it:'Elimina',es:'Eliminar',pt:'Excluir',nl:'Verwijderen',sv:'Ta bort',da:'Slet',no:'Slett',fi:'Poista'},

    /* gates */
    gateFlash:    {en:'Flash mode is part of Premium — the rack itself is always free.',de:'Der Blitzblick gehört zu Premium — der Rechenrahmen selbst bleibt immer kostenlos.',fr:'Le mode flash fait partie de Premium — le boulier lui-même reste gratuit.',it:'Il lampo fa parte di Premium — l’abaco resta sempre gratuito.',es:'El destello es parte de Premium — el ábaco siempre es gratis.',pt:'O relâmpago faz parte do Premium — o ábaco é sempre gratuito.',nl:'Flitsen hoort bij Premium — het rekenrek zelf blijft altijd gratis.',sv:'Blixtläget ingår i Premium — kulramen är alltid gratis.',da:'Lyntilstand er en del af Premium — kuglerammen er altid gratis.',no:'Glimtmodus er en del av Premium — kulerammen er alltid gratis.',fi:'Välähdys kuuluu Premiumiin — itse helmitaulu on aina ilmainen.'},
    gateRacks:    {en:'More racks — up to the 100-bead wall — are part of Premium. One rack is always free.',de:'Mehr Rahmen — bis zur 100er-Wand — gehören zu Premium. Ein Rahmen bleibt immer kostenlos.',fr:'Plus de bouliers — jusqu’au mur de 100 — font partie de Premium. Un boulier reste gratuit.',it:'Più abachi — fino alla parete del 100 — fanno parte di Premium. Un abaco resta gratuito.',es:'Más ábacos — hasta la pared de 100 — son parte de Premium. Un ábaco siempre es gratis.',pt:'Mais ábacos — até a parede de 100 — fazem parte do Premium. Um ábaco é sempre gratuito.',nl:'Meer rekken — tot de wand van 100 — horen bij Premium. Eén rek blijft altijd gratis.',sv:'Fler ramar — ända till väggen med 100 kulor — ingår i Premium. En ram är alltid gratis.',da:'Flere rammer — op til 100-væggen — er en del af Premium. Én ramme er altid gratis.',no:'Flere rammer — opp til 100-veggen — er en del av Premium. Én ramme er alltid gratis.',fi:'Lisätaulut — aina 100 helmen seinään asti — kuuluvat Premiumiin. Yksi taulu on aina ilmainen.'},
    gateSeqs:     {en:'The sequence library is part of Premium — the starter sequence and free play stay free.',de:'Die Reihen-Bibliothek gehört zu Premium — Startreihe und freies Spiel bleiben kostenlos.',fr:'La bibliothèque de suites fait partie de Premium — la suite de départ et le jeu libre restent gratuits.',it:'La raccolta di serie fa parte di Premium — la serie iniziale e il gioco libero restano gratuiti.',es:'La biblioteca de series es parte de Premium — la serie inicial y el juego libre siguen gratis.',pt:'A biblioteca de séries faz parte do Premium — a série inicial e a brincadeira livre continuam gratuitas.',nl:'De reeksenbibliotheek hoort bij Premium — de startreeks en vrij spelen blijven gratis.',sv:'Seriebiblioteket ingår i Premium — startserien och fri lek är alltid gratis.',da:'Seriebiblioteket er en del af Premium — startserien og fri leg er gratis.',no:'Seriebiblioteket er en del av Premium — startserien og fri lek er gratis.',fi:'Sarjakirjasto kuuluu Premiumiin — aloitussarja ja vapaa leikki ovat ilmaisia.'},
    gateSave:     {en:'Saving your own sequences is part of Premium — composing is free to try.',de:'Eigene Reihen speichern gehört zu Premium — das Zusammenstellen ist kostenlos.',fr:'Enregistrer ses propres suites fait partie de Premium — les composer reste gratuit.',it:'Salvare le proprie serie fa parte di Premium — comporle è gratis.',es:'Guardar tus series es parte de Premium — armarlas es gratis.',pt:'Salvar suas séries faz parte do Premium — montar é grátis.',nl:'Eigen reeksen opslaan hoort bij Premium — samenstellen is gratis.',sv:'Att spara egna serier ingår i Premium — att bygga är gratis.',da:'At gemme egne serier er en del af Premium — at bygge er gratis.',no:'Å lagre egne serier er en del av Premium — å bygge er gratis.',fi:'Omien sarjojen tallennus kuuluu Premiumiin — kokoaminen on ilmaista.'},
    unlock:       {en:'Unlock the whole rack',de:'Den ganzen Rahmen freischalten',fr:'Débloquer tout le boulier',it:'Sblocca tutto l’abaco',es:'Desbloquear todo el ábaco',pt:'Desbloquear o ábaco todo',nl:'Het hele rek ontgrendelen',sv:'Lås upp hela kulramen',da:'Lås hele kuglerammen op',no:'Lås opp hele kulerammen',fi:'Avaa koko helmitaulu'},

    /* settings */
    setRows:      {en:'Rows per rack',de:'Stangen pro Rahmen',fr:'Rangées par boulier',it:'File per abaco',es:'Filas por ábaco',pt:'Fileiras por ábaco',nl:'Rijen per rek',sv:'Rader per ram',da:'Rækker pr. ramme',no:'Rader per ramme',fi:'Rivejä taulussa'},
    setRows1:     {en:'1 row (to 10)',de:'1 Stange (bis 10)',fr:'1 rangée (jusqu’à 10)',it:'1 fila (fino a 10)',es:'1 fila (hasta 10)',pt:'1 fileira (até 10)',nl:'1 rij (tot 10)',sv:'1 rad (till 10)',da:'1 række (til 10)',no:'1 rad (til 10)',fi:'1 rivi (10:een asti)'},
    setRows2:     {en:'2 rows (to 20)',de:'2 Stangen (bis 20)',fr:'2 rangées (jusqu’à 20)',it:'2 file (fino a 20)',es:'2 filas (hasta 20)',pt:'2 fileiras (até 20)',nl:'2 rijen (tot 20)',sv:'2 rader (till 20)',da:'2 rækker (til 20)',no:'2 rader (til 20)',fi:'2 riviä (20:een asti)'},
    setReadout:   {en:'Show the numeral',de:'Zahl anzeigen',fr:'Afficher le nombre',it:'Mostra il numero',es:'Mostrar el número',pt:'Mostrar o número',nl:'Getal tonen',sv:'Visa talet',da:'Vis tallet',no:'Vis tallet',fi:'Näytä numero'},
    setClacks:    {en:'Bead sounds',de:'Kugelgeräusche',fr:'Sons des boules',it:'Suoni delle palline',es:'Sonidos de las cuentas',pt:'Sons das contas',nl:'Kralengeluiden',sv:'Kulljud',da:'Kuglelyde',no:'Kulelyder',fi:'Helmiäänet'},
    setFlash:     {en:'Flash time',de:'Blitzdauer',fr:'Durée du flash',it:'Durata del lampo',es:'Duración del destello',pt:'Duração do relâmpago',nl:'Flitsduur',sv:'Blixttid',da:'Visningstid',no:'Visningstid',fi:'Välähdysaika'},
    setFlash2:    {en:'2 seconds',de:'2 Sekunden',fr:'2 secondes',it:'2 secondi',es:'2 segundos',pt:'2 segundos',nl:'2 seconden',sv:'2 sekunder',da:'2 sekunder',no:'2 sekunder',fi:'2 sekuntia'},
    setFlash3:    {en:'3 seconds',de:'3 Sekunden',fr:'3 secondes',it:'3 secondi',es:'3 segundos',pt:'3 segundos',nl:'3 seconden',sv:'3 sekunder',da:'3 sekunder',no:'3 sekunder',fi:'3 sekuntia'},
    setFlash5:    {en:'5 seconds',de:'5 Sekunden',fr:'5 secondes',it:'5 secondi',es:'5 segundos',pt:'5 segundos',nl:'5 seconden',sv:'5 sekunder',da:'5 sekunder',no:'5 sekunder',fi:'5 sekuntia'},
    setSpeakRev:  {en:'Say the number on Reveal',de:'Zahl beim Aufdecken sprechen',fr:'Dire le nombre en dévoilant',it:'Di’ il numero allo «Scopri»',es:'Decir el número al destapar',pt:'Falar o número ao revelar',nl:'Getal zeggen bij Gordijn open',sv:'Säg talet vid Ta fram',da:'Sig tallet ved Tæppet fra',no:'Si tallet når teppet går opp',fi:'Sano luku paljastettaessa'},
    loading:      {en:'Stringing the beads…',de:'Die Kugeln werden aufgefädelt…',fr:'On enfile les boules…',it:'Infiliamo le palline…',es:'Ensartando las cuentas…',pt:'Enfiando as contas…',nl:'De kralen worden geregen…',sv:'Kulorna träs upp…',da:'Kuglerne sættes på stængerne…',no:'Kulene tres på…',fi:'Helmiä pujotetaan…'},
    rodAria:      {en:'Bead rod — arrow keys slide beads',de:'Kugelstange — Pfeiltasten schieben Kugeln',fr:'Tige de boules — les flèches font glisser',it:'Asta delle palline — le frecce fanno scorrere',es:'Fila de cuentas — las flechas las deslizan',pt:'Haste de contas — as setas do teclado deslizam as contas',nl:'Kralenrij — schuif de kralen met de pijltjestoetsen',sv:'Kulstång — piltangenterna skjuter kulorna',da:'Kuglestang — piletasterne skubber kuglerne',no:'Kulestang — piltastene skyver kulene',fi:'Helmitanko — nuolinäppäimet liu’uttavat helmiä'},
    pushedAria:   {en:'{n} pushed',de:'{n} geschoben',fr:'{n} poussées',it:'{n} in gioco',es:'{n} empujadas',pt:'{n} empurradas',nl:'{n} geschoven',sv:'{n} framskjutna',da:'{n} skubbet frem',no:'{n} skjøvet',fi:'Työnnetty: {n}'}
  },

  /* byte-faithful copy of place-value-core's per-locale composers
     (0-999; used 0-100 here) — spliced at build time, verified by the
     harness (de 47 = siebenundvierzig, fr 71 = soixante et onze,
     da 50 = halvtreds). */
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

  defaults: {
    rows: '2', readout: false, clacks: true, flashDuration: '3', speakOnReveal: true
  },
  settings: [
    { key:'rows', type:'choice', labelKey:'setRows', options:[
        { value:'2', labelKey:'setRows2' },
        { value:'1', labelKey:'setRows1' }
    ]},
    { key:'readout', type:'toggle', labelKey:'setReadout' },
    { key:'clacks', type:'toggle', labelKey:'setClacks' },
    { key:'flashDuration', type:'choice', labelKey:'setFlash', options:[
        { value:'2', labelKey:'setFlash2' },
        { value:'3', labelKey:'setFlash3' },
        { value:'5', labelKey:'setFlash5' }
    ]},
    { key:'speakOnReveal', type:'toggle', labelKey:'setSpeakRev' }
  ],

  STORE_KEY: 'lcs:rekenrek:v1',
  ENT_TRUST_DAYS: 14,
  BEAD_D: { 1: 64, 2: 52, 5: 40, 10: 34 },
  ROD_PITCH: { 1: 84, 2: 68, 5: 52, 10: 46 },

  /* =========================== lifecycle =========================== */

  init: function (api) {
    this.api = api;
    this.premium = false;
    this.library = null;
    this._flashOn = false;      /* flash-mode layout toggled */
    this._panelTab = 'seqs';
    this._draft = { steps: [], name: '' };
    this._flashTimer = null;
    this._holdMode = false;
    this._audio = null;
    this._lastClack = 0;

    this._store = this._loadStore();
    if (!this._store.v) this._store = { v: 1, ent: null, session: null, customSeqs: {} };
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    var s = this._store.session;
    if (s && s.racks) {
      this.session = s;
      if (this.session.phase === 'flashing') this.session.phase = 'covered';
    } else {
      this.session = { rackCount: 1, racks: [{ top: 0, bottom: 0 }], phase: 'open', seq: null, halfCover: false };
    }

    /* deep links */
    var params = new URLSearchParams(location.search);
    var rk = parseInt(params.get('racks'), 10);
    if ([1, 2, 5, 10].indexOf(rk) >= 0) this._setRackCount(rk, true);
    var n = parseInt(params.get('n'), 10);
    if (!isNaN(n) && n >= 0 && n <= 100) this._distribute(n);
    this._deepSeq = params.get('seq');

    this._fetchLibrary();
    this._fetchEntitlement();
  },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; }
    catch (_) { return {}; }
  },
  _saveStore: function () {
    var st = this._store;
    st.session = this.session;
    st.settings = {};
    for (var i = 0; i < this.settings.length; i++) {
      var key = this.settings[i].key;
      st.settings[key] = this.api.settings[key];
    }
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(st)); } catch (_) {}
  },

  _fetchLibrary: function () {
    var self = this;
    fetch('/mini-tools/rekenrek-seqs.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        self.library = j || { sequences: [] };
        if (self._deepSeq) {
          var sq = self._seqById(self._deepSeq);
          if (sq && (sq.free || self.premium)) self._enterSeq(sq.id, false);
          self._deepSeq = null;
        }
        if (self._wrap) self.render();
      })
      .catch(function () { self.library = { sequences: [] }; if (self._wrap) self.render(); });
  },

  _fetchEntitlement: function () {
    var self = this;
    var cached = this._store.ent;
    var trustCache = function () {
      if (cached && cached.tier === 'full' && cached.checkedAt) {
        var age = (Date.now() - new Date(cached.checkedAt).getTime()) / 86400000;
        if (age <= self.ENT_TRUST_DAYS) { self.premium = true; if (self._wrap) self.render(); }
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
        if (self._wrap) self.render();
      })
      .catch(function () { trustCache(); });
  },

  /* ============================ helpers ============================ */

  fmt: function (key, args) {
    var s = this.api.t(key);
    return s.replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; });
  },
  _reducedMotion: function () {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  _rowsFor: function () {
    return this.session.rackCount > 2 ? 1 : (this.api.settings.rows === '1' ? 1 : 2);
  },
  _total: function () {
    var t = 0, rows = this._rowsFor();
    for (var i = 0; i < this.session.racks.length; i++) {
      t += this.session.racks[i].top || 0;
      if (rows === 2) t += this.session.racks[i].bottom || 0;
    }
    return t;
  },
  _numberWord: function (n) {
    var fn = this.NUM_WORDS_HELPERS[this.api.lang] || this.NUM_WORDS_HELPERS.en;
    try { return fn(n, 'cardinal'); } catch (_) { return String(n); }
  },
  _seqById: function (id) {
    var arr = (this.library && this.library.sequences) || [];
    for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i];
    return null;
  },
  _setRackCount: function (n, silent) {
    this.session.rackCount = n;
    var racks = this.session.racks;
    while (racks.length < n) racks.push({ top: 0, bottom: 0 });
    racks.length = n;
    if (!silent) { this._saveStore(); this.render(); }
  },
  /* canonical distribution: complete rows first, top-down, left-packed */
  _distribute: function (n) {
    var rows = this._rowsFor();
    var racks = this.session.racks;
    var rods = [];
    for (var i = 0; i < racks.length; i++) {
      rods.push([racks[i], 'top']);
      if (rows === 2) rods.push([racks[i], 'bottom']);
    }
    var left = Math.min(n, rods.length * 10);
    for (var r = 0; r < rods.length; r++) {
      var take = Math.min(10, left);
      rods[r][0][rods[r][1]] = take;
      left -= take;
    }
  },

  /* ------------------------- clack synthesis ----------------------- */
  _ctx: function () {
    if (this._audio === undefined || this._audio === null) {
      try {
        var AC = window.AudioContext || window.webkitAudioContext;
        this._audio = AC ? new AC() : false;
      } catch (_) { this._audio = false; }
    }
    return this._audio;
  },
  _noiseBuf: function (ctx) {
    if (!this._noise) {
      var len = Math.floor(ctx.sampleRate * 0.1);
      var buf = ctx.createBuffer(1, len, ctx.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      this._noise = buf;
    }
    return this._noise;
  },
  /* the wooden clack: noise burst through a bandpass + a 180Hz thump */
  clack: function (vel, deep) {
    if (!this.api.settings.clacks) return;
    var now = Date.now();
    if (now - this._lastClack < 30) return;        /* coalesce chains */
    this._lastClack = now;
    var ctx = this._ctx();
    if (!ctx) return;
    if (ctx.state === 'suspended') { try { ctx.resume(); } catch (_) {} }
    var t = ctx.currentTime;
    var v = Math.max(0.15, Math.min(1, vel || 0.6));
    var decay = deep ? 0.12 : 0.06 + v * 0.03;

    var noise = ctx.createBufferSource();
    noise.buffer = this._noiseBuf(ctx);
    var bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = (deep ? 1200 : 2000) * (0.92 + Math.random() * 0.16);
    bp.Q.value = 8;
    var ng = ctx.createGain();
    ng.gain.setValueAtTime(0.28 * v * (deep ? 1.4 : 1), t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + decay);
    noise.connect(bp); bp.connect(ng); ng.connect(ctx.destination);
    noise.start(t); noise.stop(t + decay + 0.02);

    var osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 180 * (0.95 + Math.random() * 0.1);
    var og = ctx.createGain();
    og.gain.setValueAtTime(0.12 * v, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + decay);
    osc.connect(og); og.connect(ctx.destination);
    osc.start(t); osc.stop(t + decay + 0.02);
  },

  /* ============================ render ============================== */

  render: function () {
    var api = this.api, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    document.body.classList.add('rkr-wide');

    var wrap = api.el('div', 'rkr-wrap');
    stage.appendChild(wrap);
    this._wrap = wrap;

    if (!this.library) {
      var load = api.el('div', 'rkr-loading');
      load.textContent = api.t('loading');
      wrap.appendChild(load);
      return;
    }

    /* ---- top strip: seq stepper OR chips ---- */
    if (this.session.seq) wrap.appendChild(this._seqStrip());
    else wrap.appendChild(this._chipStrip());

    /* ---- readout (numeral-leak: only when open/revealed) ---- */
    var phase = this.session.phase;
    if (api.settings.readout && (phase === 'open' || phase === 'revealed')) {
      var ro = api.el('div', 'rkr-readout');
      ro.textContent = String(this._total());
      wrap.appendChild(ro);
    }

    /* ---- the board (in a scroller so phones pan the wide rod) ---- */
    var scroller = api.el('div', 'rkr-boardscroll');
    var board = api.el('div', 'rkr-board rkr-n' + this.session.rackCount);
    var railL = api.el('span', 'rkr-rail left');
    var railR = api.el('span', 'rkr-rail right');
    board.append(railL, railR);
    this._board = board;
    this._buildRods(board);
    var shade = this._buildShade();
    board.appendChild(shade);
    this._shadeEl = shade;
    scroller.appendChild(board);
    wrap.appendChild(scroller);
    this._applyPhase();

    /* ---- dock ---- */
    wrap.appendChild(this._dock());

    if (!this._keysBound) {
      this._keysBound = true;
      window.addEventListener('resize', function () {
        clearTimeout(self._rz);
        self._rz = setTimeout(function () { self._layoutAll(); }, 120);
      });
    }
    this._saveStore();
    requestAnimationFrame(function () { self._layoutAll(); });
  },

  _chipStrip: function () {
    var api = this.api, self = this;
    var strip = api.el('div', 'rkr-strip');
    /* rack count chips */
    var lbl = api.el('span', 'rkr-striplabel');
    lbl.textContent = api.t('racksLabel');
    strip.appendChild(lbl);
    [1, 2, 5, 10].forEach(function (n) {
      var locked = n > 1 && !self.premium;
      var chip = api.el('button', 'rkr-chip' + (self.session.rackCount === n ? ' active' : '') + (locked ? ' locked' : ''));
      chip.type = 'button';
      chip.setAttribute('data-n', String(n));
      chip.textContent = String(n);
      if (locked) chip.innerHTML += ' <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
      chip.addEventListener('click', function () {
        if (locked) { self._gateInline(strip, 'gateRacks'); return; }
        self._setRackCount(n);
      });
      strip.appendChild(chip);
    });
    var sep = api.el('span', 'rkr-sep'); sep.setAttribute('aria-hidden', 'true');
    strip.appendChild(sep);
    /* reset */
    var reset = api.el('button', 'rkr-chip');
    reset.type = 'button';
    reset.textContent = api.t('resetBeads');
    reset.addEventListener('click', function () { self._parkAll(); });
    strip.appendChild(reset);
    /* speak */
    var speak = api.el('button', 'rkr-chip');
    speak.type = 'button';
    speak.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg> ' + api.t('speak');
    speak.addEventListener('click', function () { self._speakTotal(); });
    strip.appendChild(speak);
    /* sequences panel */
    var seqs = api.el('button', 'rkr-chip');
    seqs.type = 'button';
    seqs.textContent = api.t('seqTitle');
    seqs.addEventListener('click', function () { self._openPanel(); });
    strip.appendChild(seqs);
    /* flash toggle */
    var flash = api.el('button', 'rkr-chip' + (this._flashOn ? ' active' : '') + (!this.premium ? ' locked' : ''));
    flash.type = 'button';
    flash.textContent = api.t('flashMode');
    if (!this.premium) flash.innerHTML += ' <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
    flash.addEventListener('click', function () {
      if (!self.premium) { self._gateInline(strip, 'gateFlash'); return; }
      self._flashOn = !self._flashOn;
      if (!self._flashOn) { self.session.phase = 'open'; self.session.halfCover = false; }
      self.render();
    });
    strip.appendChild(flash);
    return strip;
  },

  _seqStrip: function () {
    var api = this.api, self = this;
    var sq = this.session.seq.custom ? this._store.customSeqs[this.session.seq.id] : this._seqById(this.session.seq.id);
    var steps = sq ? sq.steps : [];
    var name = sq ? (sq.name && (sq.name[api.lang] || sq.name.en) || sq.name) : '';
    var strip = api.el('div', 'rkr-strip');
    var back = api.el('button', 'rkr-chip');
    back.type = 'button';
    back.textContent = '‹ ' + api.t('backToLibrary');
    back.addEventListener('click', function () { self._openPanel(); });
    var lblName = api.el('span', 'rkr-seqname');
    lblName.textContent = name;
    var count = api.el('span', 'rkr-seqcount');
    count.textContent = (this.session.seq.pos + 1) + ' / ' + steps.length;
    var next = api.el('button', 'rkr-chip teal');
    next.type = 'button';
    next.textContent = api.t('nextStep');
    next.addEventListener('click', function () { self._nextStep(); });
    var exit = api.el('button', 'rkr-chip');
    exit.type = 'button';
    exit.textContent = api.t('freePlay');
    exit.addEventListener('click', function () {
      self.session.seq = null;
      self._flashOn = false;
      self.session.phase = 'open';
      self.session.halfCover = false;
      self._saveStore();
      self.render();
    });
    strip.append(back, lblName, count, next, exit);
    /* teaching note */
    var note = sq && sq.note ? (sq.note[api.lang] || sq.note.en) : null;
    if (note) {
      var noteEl = api.el('div', 'rkr-note');
      noteEl.textContent = note;
      var outer = api.el('div', 'rkr-stripcol');
      outer.append(strip, noteEl);
      return outer;
    }
    return strip;
  },

  /* ======================= rods + beads ============================ */

  _buildRods: function (board) {
    var api = this.api, self = this;
    var rows = this._rowsFor();
    this._rods = [];
    var rodIdx = 0;
    for (var r = 0; r < this.session.rackCount; r++) {
      var rowsHere = rows;
      for (var w = 0; w < rowsHere; w++) {
        (function (rackI, rodKey) {
          var rod = api.el('div', 'rkr-rod');
          rod.tabIndex = 0;
          rod.setAttribute('role', 'slider');
          rod.setAttribute('aria-label', api.t('rodAria'));
          rod.setAttribute('aria-valuemin', '0');
          rod.setAttribute('aria-valuemax', '10');
          var wire = api.el('span', 'rkr-wire');
          rod.appendChild(wire);
          var beads = [];
          for (var b = 0; b < 10; b++) {
            var bead = api.el('span', 'rkr-bead' + (b < 5 ? ' red' : ''));
            rod.appendChild(bead);
            beads.push(bead);
          }
          var entry = { el: rod, beads: beads, rackI: rackI, rodKey: rodKey };
          self._rods.push(entry);
          self._bindRod(entry);
          board.appendChild(rod);
        }(r, w === 0 ? 'top' : 'bottom'));
      }
      rodIdx++;
    }
    /* decade labels + per-rod chips (numeral-leak: open/revealed + readout only) */
    this._decorate();
  },

  _decorate: function () {
    var api = this.api;
    var show = api.settings.readout && (this.session.phase === 'open' || this.session.phase === 'revealed');
    this._rods.forEach(function (entry) {
      var old = entry.el.querySelector('.rkr-rodchip');
      if (old) old.remove();
    });
    if (!show) return;
    var self = this;
    var cum = 0;
    this._rods.forEach(function (entry) {
      var pushed = self.session.racks[entry.rackI][entry.rodKey] || 0;
      var chip = api.el('span', 'rkr-rodchip');
      chip.textContent = String(pushed);
      entry.el.appendChild(chip);
    });
  },

  _pushedOf: function (entry) { return this.session.racks[entry.rackI][entry.rodKey] || 0; },
  _setPushed: function (entry, n) {
    this.session.racks[entry.rackI][entry.rodKey] = Math.max(0, Math.min(10, n));
    entry.el.setAttribute('aria-valuenow', String(this._pushedOf(entry)));
  },

  _geom: function () {
    var rc = this.session.rackCount;
    var base = this.BEAD_D[rc] || 52;
    /* rod pitch has always been a fixed multiple of the bead — keep the SAME
       ratio when the bead grows, or the flex `gap: pitch - d` goes negative
       and the rods overlap. At the unscaled diameter this reproduces
       ROD_PITCH exactly (64x1.3125=84, 52x1.3077=68, 40x1.3=52, 34x1.3529=46),
       so nothing moves below the tiers. */
    var ratio = (this.ROD_PITCH[rc] || 60) / base;
    var w = this._board ? this._board.clientWidth : 800;
    /* fit: 10 beads + ≥4 diameters travel must fit the rod span */
    var span = w - 56;                    /* board padding + breathing */
    var maxD = Math.floor(span / 14.5);   /* 10 beads + 4.5 travel */
    /* ⭐⭐ THE BEAD CEILING WAS A JS CONSTANT, AND THAT IS WHY THE FIRST
       ATTEMPT AT THIS TOOL WAS WITHDRAWN. Raising the card alone grew the
       BOARD and left the beads at 64px — bead fill fell from 62% to 38% and
       every measured assertion still passed. The diameter is what the child
       actually looks at, so the ceiling now comes from --rkr-dmax, declared
       in CSS where it can key on width AND height together.
       ⚠ The width rule above still binds: at 2560 `span/14.5` allows ~113px,
       so the bead grows until the rod runs out of travel and no further. The
       cap raises a ceiling; it does not set a size. */
    var cap = parseFloat(getComputedStyle(document.body).getPropertyValue('--rkr-dmax'));
    if (!(cap > 0)) cap = 1;
    var d = Math.min(base * cap, Math.max(24, maxD));
    /* ⚠ AND A TALL RACK IS BOUND BY HEIGHT, NOT WIDTH. Ten rods at a 113px
       bead would stand 1500px — taller than the 1150 board this tier's floor
       assumes. Measure the room actually left under the board rather than
       assuming it. Applied ONLY when the cap is raised, so the layout at or
       below 1366 is byte-identical to before. */
    if (cap > 1 && this._board && this._wrap) {
      var br = this._board.getBoundingClientRect();
      var below = this._wrap.getBoundingClientRect().bottom - br.bottom;
      /* ⚠ COUNT RODS, NOT RACKS, AND USE THE REAL STACK FORMULA. The board is
         a flex column with `gap: pitch - d`, so N rods stand
         d + (N-1)·pitch — NOT N·pitch. And a rack is two rods up to two
         racks and one thereafter (_rowsFor). The first version got both wrong
         and a ten-rod board overran the fold by 4-6px at 1920 and 2400. */
      var nRods = rc * this._rowsFor();
      /* ⚠ AND THE BOARD'S OWN CHROME MUST NOT BE DERIVED FROM THE STACK IT IS
         SIZING. Deducing it as `board.height - stack` is self-referential —
         during a re-layout the height and the --rkr-d it is compared against
         belong to different frames, and the estimate collapsed a ten-rod board
         to a 32px bead at 1920, SMALLER than the 34px it has at 1366. Padding
         and border are stable and exact; read them. */
      var cs = getComputedStyle(this._board);
      var boardChrome = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0)
        + (parseFloat(cs.borderTopWidth) || 0) + (parseFloat(cs.borderBottomWidth) || 0);
      var availH = window.innerHeight - br.top - below - boardChrome - 28;
      var denom = 1 + (nRods - 1) * ratio;
      if (availH > 60) d = Math.min(d, Math.max(24, Math.floor(availH / denom)));
    }
    return { d: d, pitch: Math.round(d * ratio), span: span, inset: 2 };
  },

  _layoutAll: function () {
    var self = this;
    if (!this._rods) return;
    var g = this._geom();
    this._board.style.setProperty('--rkr-d', g.d + 'px');
    this._board.style.setProperty('--rkr-pitch', g.pitch + 'px');
    this._rods.forEach(function (entry) { self._layoutRod(entry, 0, null); });
  },

  /* position all 10 beads of a rod; chainOffset shifts beads [from..to] */
  _layoutRod: function (entry, offsetPx, chain) {
    var g = this._geom();
    var pushed = this._pushedOf(entry);
    var rodW = entry.el.clientWidth || (g.span + 76);
    for (var i = 0; i < 10; i++) {
      var x;
      if (i < pushed) x = g.inset + i * g.d;
      else x = rodW - g.inset - (10 - i) * g.d;
      if (chain && i >= chain[0] && i <= chain[1]) x += offsetPx;
      entry.beads[i].style.transform = 'translate3d(' + Math.round(x) + 'px,-50%,0)';
    }
  },

  _bindRod: function (entry) {
    var self = this, api = this.api;
    var rod = entry.el;
    var drag = null;

    rod.addEventListener('pointerdown', function (e) {
      if (self.session.phase === 'covered' || self.session.phase === 'flashing') return;
      var rect = rod.getBoundingClientRect();
      var g = self._geom();
      var x = e.clientX - rect.left;
      var pushed = self._pushedOf(entry);
      var rodW = rect.width;
      /* hit-test bead index */
      var idx = -1;
      for (var i = 0; i < 10; i++) {
        var bx = i < pushed ? g.inset + i * g.d : rodW - g.inset - (10 - i) * g.d;
        if (x >= bx - 4 && x <= bx + g.d + 4) { idx = i; break; }
      }
      if (idx < 0) return;
      var side = idx < pushed ? 'pushed' : 'parked';
      /* chain: j-th bead counting from the pack's INNER edge */
      var chain, dir;
      if (side === 'parked') { chain = [pushed, idx]; dir = -1; }   /* drag left */
      else { chain = [idx, pushed - 1]; dir = 1; }                  /* drag right */
      var gap = rodW - 2 * g.inset - 10 * g.d;                      /* travel */
      drag = { id: e.pointerId, x0: e.clientX, t0: Date.now(), entry: entry,
        chain: chain, dir: dir, gap: gap, side: side, moved: false,
        lastX: e.clientX, lastT: Date.now(), clacked: 0 };
      try { rod.setPointerCapture(e.pointerId); } catch (_) {}
      for (var c = chain[0]; c <= chain[1]; c++) entry.beads[c].classList.add('grab');
    });

    rod.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x0;
      var g = self._geom();
      /* clamp to the allowed direction + gap */
      var off = drag.dir === -1 ? Math.max(-drag.gap, Math.min(0, dx)) : Math.min(drag.gap, Math.max(0, dx));
      if (Math.abs(dx) > 6) drag.moved = true;
      drag.off = off;
      drag.vx = (e.clientX - drag.lastX) / Math.max(1, Date.now() - drag.lastT);
      drag.lastX = e.clientX; drag.lastT = Date.now();
      self._layoutRod(drag.entry, off, drag.chain);
      /* the rattle-run: a clack per bead-width traveled */
      var ticks = Math.floor(Math.abs(off) / g.d);
      if (ticks > drag.clacked) { drag.clacked = ticks; self.clack(Math.min(1, Math.abs(drag.vx))); }
    });

    var up = function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var d = drag; drag = null;
      var entry2 = d.entry;
      for (var c = d.chain[0]; c <= d.chain[1]; c++) entry2.beads[c].classList.remove('grab');
      var k = d.chain[1] - d.chain[0] + 1;
      var off = d.off || 0;
      var flick = Math.abs(d.vx || 0) > 0.8 && (d.dir === -1 ? (d.vx < 0) : (d.vx > 0));
      var commit = d.moved && (Math.abs(off) >= d.gap * 0.5 || flick);
      if (!d.moved) {
        /* tap = wobble only (pedagogue-locked: drag distance IS the pedagogy) */
        var bead = entry2.beads[d.chain[d.side === 'parked' ? 1 : 0]];
        bead.classList.remove('rkr-wobble'); void bead.offsetWidth; bead.classList.add('rkr-wobble');
        return;
      }
      entry2.el.classList.add('settle');
      if (commit) {
        var pushed = self._pushedOf(entry2);
        self._setPushed(entry2, d.side === 'parked' ? pushed + k : pushed - k);
        self.clack(0.9, true);        /* the deeper sweep-arrival clack */
        api.announce(self.fmt('pushedAria', { n: self._pushedOf(entry2) }));
        self._saveStore();
      } else {
        self.clack(0.3);
      }
      self._layoutRod(entry2, 0, null);
      self._decorate();
      self._updateReadout();
      setTimeout(function () { entry2.el.classList.remove('settle'); }, 300);
    };
    rod.addEventListener('pointerup', up);
    rod.addEventListener('pointercancel', up);

    rod.addEventListener('keydown', function (e) {
      if (self.session.phase === 'flashing') return;
      var pushed = self._pushedOf(entry);
      var n = null;
      if (e.key === 'ArrowLeft') n = pushed + (e.shiftKey ? 5 : 1);        /* push left = show more */
      else if (e.key === 'ArrowRight') n = pushed - (e.shiftKey ? 5 : 1);
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = 10;
      if (n === null) return;
      e.preventDefault();
      var before = pushed;
      self._setPushed(entry, n);
      if (self._pushedOf(entry) !== before) {
        self.clack(0.6);
        entry.el.classList.add('settle');
        self._layoutRod(entry, 0, null);
        self._decorate();
        self._updateReadout();
        api.announce(self.fmt('pushedAria', { n: self._pushedOf(entry) }));
        self._saveStore();
        setTimeout(function () { entry.el.classList.remove('settle'); }, 300);
      }
    });
  },

  _updateReadout: function () {
    var ro = this._wrap && this._wrap.querySelector('.rkr-readout');
    if (ro) ro.textContent = String(this._total());
  },

  _parkAll: function () {
    var self = this;
    this.session.racks.forEach(function (r) { r.top = 0; r.bottom = 0; });
    this._saveStore();
    /* descending cascade */
    var i = 0;
    this._rods.forEach(function (entry) {
      setTimeout(function () { self.clack(0.7 - i * 0.02, i === 0); }, i * 45);
      i++;
    });
    this.render();
  },

  _speakTotal: function () {
    var api = this.api;
    var n = this._total();
    var word = this._numberWord(n);
    LCSAudio.speak({ type: 'number', text: word, lang: api.lang, rate: 0.9 });
    api.announce(String(n) + ' — ' + word);
    var ro = this._wrap.querySelector('.rkr-readout');
    if (ro) { ro.classList.remove('rkr-pop'); void ro.offsetWidth; ro.classList.add('rkr-pop'); }
  },

  /* ======================= flash machine =========================== */

  _buildShade: function () {
    var api = this.api;
    var shade = api.el('div', 'rkr-shade');
    shade.setAttribute('aria-hidden', 'true');
    var cloth = api.el('div', 'rkr-cloth');
    var hem = api.el('div', 'rkr-hem');
    var scallops = '<svg viewBox="0 0 700 30" preserveAspectRatio="none" class="rkr-scallops">';
    for (var i = 0; i < 7; i++) scallops += '<path d="M' + (i * 100) + ',0 a50,26 0 0 0 100,0 z" fill="#146B5E"/>';
    scallops += '</svg>';
    hem.innerHTML = '<div class="rkr-stitch"></div>' + scallops +
      '<span class="rkr-ring" aria-hidden="true"><svg viewBox="0 0 40 46" width="30" height="35"><rect x="16" y="0" width="8" height="14" rx="3" fill="#146B5E"/><circle cx="20" cy="28" r="13" fill="none" stroke="#146B5E" stroke-width="6"/></svg></span>';
    cloth.appendChild(hem);
    shade.appendChild(cloth);
    return shade;
  },

  _applyPhase: function () {
    var self = this;
    var p = this.session.phase;
    var shade = this._shadeEl;
    shade.classList.toggle('down', p === 'covered');
    shade.classList.toggle('half', p === 'covered' && !!this.session.halfCover);
    shade.classList.toggle('lifted', p !== 'covered');
    if (this._board) this._board.classList.toggle('nodrag', p === 'covered' || p === 'flashing');
    /* numeral-leak: no per-rod count in the aria tree while hidden */
    var hidden = p === 'covered' || p === 'flashing';
    if (this._rods) this._rods.forEach(function (entry) {
      if (hidden) entry.el.removeAttribute('aria-valuenow');
      else entry.el.setAttribute('aria-valuenow', String(self._pushedOf(entry)));
    });
  },

  _dock: function () {
    var api = this.api, self = this;
    var dock = api.el('div', 'rkr-dock');
    if (!this._flashOn && !(this.session.seq && this._seqHasCover())) return dock;
    if (!this.premium) return dock;

    var phase = this.session.phase;
    if (phase === 'open' || phase === 'revealed') {
      var cover = api.el('button', 'rkr-ctrlchip teal');
      cover.type = 'button';
      cover.textContent = api.t('cover');
      cover.addEventListener('click', function () {
        self.session.halfCover = false;
        self.session.phase = 'covered';
        self._saveStore();
        self.clack(0.4);
        api.announce(api.t('coveredAria'));
        self.render();
      });
      dock.appendChild(cover);
      if (this._rowsFor() === 2 || this.session.rackCount > 1) {
        var half = api.el('button', 'rkr-ctrlchip');
        half.type = 'button';
        half.textContent = api.t('coverHalf');
        half.addEventListener('click', function () {
          self.session.halfCover = true;
          self.session.phase = 'covered';
          self._saveStore();
          api.announce(api.t('coveredAria'));
          self.render();
        });
        dock.appendChild(half);
      }
      var exit = api.el('button', 'rkr-ctrlchip');
      exit.type = 'button';
      exit.setAttribute('aria-label', api.t('exitFlash'));
      exit.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
      exit.addEventListener('click', function () {
        self._flashOn = false;
        self.session.phase = 'open';
        self.session.halfCover = false;
        self._saveStore();
        self.render();
      });
      dock.appendChild(exit);
    } else {
      /* covered: Show (timed/hold) + Show again + Reveal */
      var show = api.el('button', 'rkr-show');
      show.type = 'button';
      show.innerHTML = '<svg class="rkr-arc" viewBox="0 0 100 100" aria-hidden="true"><circle class="rkr-arc-fill" cx="50" cy="50" r="46" fill="none"/></svg>' +
        '<span class="rkr-show-label">' + api.t('show') + '</span>';
      this._bindShowGesture(show);
      dock.appendChild(show);
      this._showBtn = show;

      var again = api.el('button', 'rkr-ctrlchip');
      again.type = 'button';
      again.textContent = api.t('showAgain');
      again.addEventListener('click', function () { self._flash(); });
      dock.appendChild(again);

      var reveal = api.el('button', 'rkr-ctrlchip teal');
      reveal.type = 'button';
      reveal.textContent = api.t('reveal');
      reveal.addEventListener('click', function () { self._reveal(); });
      dock.appendChild(reveal);
    }
    return dock;
  },

  _seqHasCover: function () {
    var sq = this.session.seq && (this.session.seq.custom ? this._store.customSeqs[this.session.seq.id] : this._seqById(this.session.seq.id));
    if (!sq) return false;
    return sq.steps.some(function (st) { return !!st.cover; });
  },

  _flashMs: function () { return (parseInt(this.api.settings.flashDuration, 10) || 3) * 1000; },

  _bindShowGesture: function (btn) {
    var self = this;
    var pid = null, downAt = 0, holding = false;
    btn.addEventListener('pointerdown', function (e) {
      if (self.session.phase !== 'covered') return;
      pid = e.pointerId; downAt = Date.now(); holding = false;
      try { btn.setPointerCapture(e.pointerId); } catch (_) {}
      self._openShade();
      self.session.phase = 'flashing';
      self._holdMode = false;
      self._decideTimer = setTimeout(function () {
        if (pid !== null) { holding = true; self._holdMode = true; self._setArc(0); }
      }, 350);
      self._startFlashTimer();
    });
    var up = function (e) {
      if (pid === null || e.pointerId !== pid) return;
      pid = null;
      clearTimeout(self._decideTimer);
      if (holding) { self._holdMode = false; self._coverNow(); }
    };
    btn.addEventListener('pointerup', up);
    btn.addEventListener('pointercancel', up);
    btn.addEventListener('click', function () {
      if (self.session.phase === 'flashing' && !self._holdMode && Date.now() - downAt > 400) self._coverNow();
    });
  },

  _flash: function () {
    if (this.session.phase !== 'covered') return;
    this.session.phase = 'flashing';
    this._openShade();
    this._startFlashTimer();
  },

  _startFlashTimer: function () {
    var self = this;
    clearTimeout(this._flashTimer);
    var ms = this._flashMs();
    this._setArc(ms);
    this._flashTimer = setTimeout(function () {
      if (self._holdMode) return;
      self._coverNow();
    }, ms);
  },

  _setArc: function (ms) {
    var arc = this._showBtn && this._showBtn.querySelector('.rkr-arc-fill');
    if (!arc) return;
    var C = 2 * Math.PI * 46;
    arc.style.transition = 'none';
    arc.style.strokeDasharray = C;
    arc.style.strokeDashoffset = ms ? '0' : C;
    if (!ms) return;
    if (this._reducedMotion()) {
      var step = ms / 3;
      [1, 2, 3].forEach(function (i) {
        setTimeout(function () { arc.style.strokeDashoffset = String(C * i / 3); }, step * i);
      });
      return;
    }
    void arc.getBoundingClientRect();
    arc.style.transition = 'stroke-dashoffset ' + ms + 'ms linear';
    arc.style.strokeDashoffset = String(C);
  },

  _openShade: function () {
    this._shadeEl.classList.remove('down', 'half');
    this._shadeEl.classList.add('lifted');
    this.api.announce(this.api.t('lookAria'));
    var lbl = this._showBtn && this._showBtn.querySelector('.rkr-show-label');
    if (lbl) lbl.textContent = this.api.t('hideNow');
  },
  _coverNow: function () {
    clearTimeout(this._flashTimer);
    this._holdMode = false;
    this.session.phase = 'covered';
    this._applyPhase();
    this._setArc(0);
    this.clack(0.3);
    this.api.announce(this.api.t('coveredAria'));
    var lbl = this._showBtn && this._showBtn.querySelector('.rkr-show-label');
    if (lbl) lbl.textContent = this.api.t('show');
    this._saveStore();
  },
  _reveal: function () {
    clearTimeout(this._flashTimer);
    this._holdMode = false;
    this.session.phase = 'revealed';
    this.session.halfCover = false;
    this._saveStore();
    this.api.announce(this.api.t('revealedAria'));
    this.render();
    if (this.api.settings.speakOnReveal) {
      var self = this;
      setTimeout(function () { self._speakTotal(); }, 500);
    }
  },

  /* ======================== sequences ============================== */

  _enterSeq: function (id, custom) {
    this.session.seq = { id: id, pos: 0, custom: !!custom };
    this._applyStep();
    if (this._panelEl) this._closePanel();
    this.render();
  },

  _applyStep: function () {
    var sq = this.session.seq.custom ? this._store.customSeqs[this.session.seq.id] : this._seqById(this.session.seq.id);
    if (!sq) { this.session.seq = null; return; }
    var st = sq.steps[this.session.seq.pos];
    if (!st) return;
    /* apply the configuration */
    this.session.rackCount = st.racks.length === 2 ? 2 : (st.racks.length >= 5 ? st.racks.length : 1);
    if ([1, 2, 5, 10].indexOf(st.racks.length) >= 0) this.session.rackCount = st.racks.length;
    this.session.racks = st.racks.map(function (r) { return { top: r.top || 0, bottom: r.bottom || 0 }; });
    /* rows: honored via the seq's rows via settings? sequences carry rows at seq level */
    if (sq.rows === 1) this.api.settings.rows = '1';
    if (sq.rows === 2 && this.session.rackCount <= 2) this.api.settings.rows = '2';
    /* cover lane: apply silently under the shade */
    if (st.cover) {
      this._flashOn = true;
      this.session.halfCover = st.cover === 'half';
      this.session.phase = 'covered';
    } else if (this.session.phase !== 'open' && this.session.phase !== 'revealed') {
      this.session.phase = 'open';
    }
    this._saveStore();
  },

  _nextStep: function () {
    var sq = this.session.seq.custom ? this._store.customSeqs[this.session.seq.id] : this._seqById(this.session.seq.id);
    if (!sq) return;
    if (this.session.seq.pos + 1 >= sq.steps.length) {
      this._finishSeq();
      return;
    }
    this.session.seq.pos += 1;
    this._applyStep();
    this.render();
  },

  _finishSeq: function () {
    var api = this.api, self = this;
    var dock = this._wrap.querySelector('.rkr-dock');
    var card = api.el('div', 'rkr-done');
    var msg = api.el('p');
    msg.textContent = api.t('seqDone');
    var restart = api.el('button', 'rkr-ctrlchip teal');
    restart.type = 'button';
    restart.textContent = api.t('restart');
    restart.addEventListener('click', function () { self.session.seq.pos = 0; self._applyStep(); self.render(); });
    var lib = api.el('button', 'rkr-ctrlchip');
    lib.type = 'button';
    lib.textContent = api.t('backToLibrary');
    lib.addEventListener('click', function () { self._openPanel(); });
    card.append(msg, restart, lib);
    (dock || this._wrap).appendChild(card);
  },

  /* shell reset = park beads + raise the shade; PRESERVES rackCount,
     settings, sequences + position (beads are 2 seconds of work;
     the library is real damage) */
  reset: function () {
    clearTimeout(this._flashTimer);
    this._holdMode = false;
    this.session.racks.forEach(function (r) { r.top = 0; r.bottom = 0; });
    this.session.phase = 'open';
    this.session.halfCover = false;
    if (this._panelEl) this._closePanel();
    this._saveStore();
    this.render();
  },

  onSettings: function () { this._saveStore(); },
  paint: function () {},

  /* ==================== gates + panel ============================== */

  _gateInline: function (host, key) {
    var api = this.api;
    var old = this._wrap.querySelector('.rkr-gate');
    if (old) old.remove();
    var g = api.el('div', 'rkr-gate');
    var txt = api.el('span');
    txt.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-rekenrek';
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(txt, a);
    host.insertAdjacentElement('afterend', g);
    setTimeout(function () { if (g.parentNode) g.remove(); }, 12000);
  },

  _openPanel: function () {
    if (!this._panelEl) this._buildPanel();
    this._renderPanel();
    this._panelEl.classList.add('open');
    this._scrimEl.classList.add('open');
  },
  _closePanel: function () {
    if (this._panelEl) { this._panelEl.classList.remove('open'); this._scrimEl.classList.remove('open'); }
  },
  _buildPanel: function () {
    var api = this.api, self = this;
    var scrim = api.el('div', 'rkr-scrim');
    scrim.addEventListener('click', function () { self._closePanel(); });
    var panel = api.el('div', 'rkr-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', api.t('seqTitle'));
    document.querySelector('.lcs-app').append(scrim, panel);
    this._panelEl = panel;
    this._scrimEl = scrim;
  },

  _renderPanel: function () {
    var api = this.api, self = this;
    var panel = this._panelEl;
    panel.innerHTML = '';

    var head = api.el('div', 'rkr-panel-head');
    var tabs = api.el('div', 'rkr-tabs');
    var mkTab = function (id, label) {
      var t = api.el('button', 'rkr-tab' + (self._panelTab === id ? ' active' : ''));
      t.type = 'button';
      t.textContent = label;
      t.addEventListener('click', function () { self._panelTab = id; self._renderPanel(); });
      return t;
    };
    tabs.append(mkTab('seqs', api.t('seqTitle')), mkTab('mine', api.t('mySeqs')));
    var x = api.el('button', 'rkr-panel-close');
    x.type = 'button';
    x.setAttribute('aria-label', api.t('deleteSeq'));
    x.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    x.addEventListener('click', function () { self._closePanel(); });
    head.append(tabs, x);
    panel.appendChild(head);

    var body = api.el('div', 'rkr-panel-body');
    panel.appendChild(body);
    if (this._panelTab === 'seqs') this._renderSeqsTab(body);
    else this._renderMineTab(body);
  },

  _renderSeqsTab: function (body) {
    var api = this.api, self = this;
    /* Show a number (premium) */
    var showRow = api.el('div', 'rkr-shownum');
    var lbl = api.el('span', 'rkr-shownum-label');
    lbl.textContent = api.t('showNumber');
    var minus = api.el('button', 'rkr-stepbtn'); minus.type = 'button'; minus.textContent = '−';
    var input = document.createElement('input');
    input.className = 'rkr-numinput';
    input.type = 'number'; input.min = '0'; input.max = '100';
    input.value = String(this._total());
    var plus = api.el('button', 'rkr-stepbtn'); plus.type = 'button'; plus.textContent = '+';
    var go = api.el('button', 'rkr-btn primary' + (this.premium ? '' : ' locked'));
    go.type = 'button';
    go.textContent = api.t('apply');
    minus.addEventListener('click', function () { input.value = String(Math.max(0, (+input.value || 0) - 1)); });
    plus.addEventListener('click', function () { input.value = String(Math.min(100, (+input.value || 0) + 1)); });
    go.addEventListener('click', function () {
      if (!self.premium) {
        var old = body.querySelector('.rkr-gate'); if (old) old.remove();
        showRow.insertAdjacentElement('afterend', self._gateEl('gateSeqs'));
        return;
      }
      var n = Math.max(0, Math.min(100, +input.value || 0));
      /* grow racks if needed */
      var cap = self.session.rackCount * (self._rowsFor() === 2 ? 20 : 10);
      if (n > cap) {
        var need = self._rowsFor() === 2 ? Math.ceil(n / 20) : Math.ceil(n / 10);
        var target = [1, 2, 5, 10].filter(function (x) { return x >= need; })[0] || 10;
        self._setRackCount(target, true);
      }
      self._distribute(n);
      self._saveStore();
      self._closePanel();
      self.render();
    });
    showRow.append(lbl, minus, input, plus, go);
    body.appendChild(showRow);

    var bands = [['k', 'bandK'], ['g1', 'bandG1'], ['g2', 'bandG2']];
    var all = (this.library && this.library.sequences) || [];
    bands.forEach(function (band) {
      var group = all.filter(function (s) { return s.band === band[0]; });
      if (!group.length) return;
      var h = api.el('div', 'rkr-bandhead');
      h.textContent = api.t(band[1]);
      body.appendChild(h);
      group.forEach(function (sq) {
        var unlocked = sq.free || self.premium;
        var row = api.el('button', 'rkr-seqrow' + (self.session.seq && self.session.seq.id === sq.id ? ' active' : '') + (unlocked ? '' : ' locked'));
        row.type = 'button';
        var name = api.el('span', 'rkr-seqrowname');
        name.textContent = (sq.name && (sq.name[api.lang] || sq.name.en)) || sq.id;
        var meta = api.el('span', 'rkr-seqrowmeta');
        meta.textContent = self.fmt('stepsCount', { n: sq.steps.length });
        row.append(name, meta);
        if (sq.free) {
          var badge = api.el('span', 'rkr-freebadge');
          badge.textContent = api.t('freeBadge');
          row.appendChild(badge);
        } else if (!unlocked) {
          row.innerHTML += '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
        }
        row.addEventListener('click', function () {
          if (!unlocked) {
            var old = body.querySelector('.rkr-gate'); if (old) old.remove();
            row.insertAdjacentElement('afterend', self._gateEl('gateSeqs'));
            return;
          }
          self._enterSeq(sq.id, false);
        });
        body.appendChild(row);
      });
    });
  },

  _gateEl: function (key) {
    var api = this.api;
    var g = api.el('div', 'rkr-gate');
    var txt = api.el('span');
    txt.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-rekenrek';
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(txt, a);
    return g;
  },

  _renderMineTab: function (body) {
    var api = this.api, self = this;
    var seqs = this._store.customSeqs || {};
    Object.keys(seqs).forEach(function (id) {
      var sq = seqs[id];
      var row = api.el('div', 'rkr-minerow');
      var play = api.el('button', 'rkr-seqrow' + (self.session.seq && self.session.seq.id === id ? ' active' : ''));
      play.type = 'button';
      var nm = api.el('span', 'rkr-seqrowname');
      nm.textContent = sq.name;
      var meta = api.el('span', 'rkr-seqrowmeta');
      meta.textContent = self.fmt('stepsCount', { n: sq.steps.length });
      play.append(nm, meta);
      play.addEventListener('click', function () {
        if (!self.premium) { row.appendChild(self._gateEl('gateSave')); return; }
        self._enterSeq(id, true);
      });
      var del = api.el('button', 'rkr-linkbtn danger');
      del.type = 'button';
      del.textContent = api.t('deleteSeq');
      del.addEventListener('click', function () {
        delete self._store.customSeqs[id];
        self._saveStore();
        self._renderPanel();
      });
      row.append(play, del);
      body.appendChild(row);
    });

    /* composer: snapshot the current rack state as steps */
    var comp = api.el('div', 'rkr-composer');
    var add = api.el('button', 'rkr-btn');
    add.type = 'button';
    add.textContent = api.t('addStep');
    add.addEventListener('click', function () {
      if (self._draft.steps.length >= 8) return;
      self._draft.steps.push({ racks: self.session.racks.map(function (r) { return { top: r.top || 0, bottom: r.bottom || 0 }; }) });
      self._renderPanel();
    });
    comp.appendChild(add);
    if (this._draft.steps.length) {
      var trayEl = api.el('div', 'rkr-drafttray');
      this._draft.steps.forEach(function (st, i) {
        var chip = api.el('span', 'rkr-draftchip');
        var tot = st.racks.reduce(function (a, r) { return a + (r.top || 0) + (r.bottom || 0); }, 0);
        chip.textContent = (i + 1) + ' · ' + tot;
        var rm = api.el('button', 'rkr-draftrm');
        rm.type = 'button'; rm.textContent = '×';
        rm.setAttribute('aria-label', api.t('deleteSeq'));
        rm.addEventListener('click', function () { self._draft.steps.splice(i, 1); self._renderPanel(); });
        chip.appendChild(rm);
        trayEl.appendChild(chip);
      });
      comp.appendChild(trayEl);
      var nameIn = document.createElement('input');
      nameIn.className = 'rkr-numinput wide';
      nameIn.type = 'text';
      nameIn.maxLength = 40;
      nameIn.placeholder = api.t('seqName');
      nameIn.value = this._draft.name || '';
      nameIn.addEventListener('input', function () { self._draft.name = nameIn.value; });
      comp.appendChild(nameIn);
      var save = api.el('button', 'rkr-btn primary' + (this.premium ? '' : ' locked'));
      save.type = 'button';
      save.textContent = api.t('saveSeq');
      save.addEventListener('click', function () {
        if (!self.premium) {
          var old = comp.querySelector('.rkr-gate'); if (old) old.remove();
          save.insertAdjacentElement('beforebegin', self._gateEl('gateSave'));
          return;
        }
        if (self._draft.steps.length < 1) return;
        if (Object.keys(self._store.customSeqs).length >= 20) return;
        var id = 'c_' + Math.random().toString(36).slice(2, 8);
        self._store.customSeqs[id] = { name: (self._draft.name || api.t('mySeqs')).slice(0, 40), steps: self._draft.steps.slice() };
        self._draft = { steps: [], name: '' };
        self._saveStore();
        self._renderPanel();
      });
      comp.appendChild(save);
    }
    body.appendChild(comp);
  }
};

/* per-tool styling: STAGE ONLY, consuming shell tokens; sanctioned
   page-level touches: body.rkr-wide + the ≤480 stacked header. */
(function injectCSS() {
  var css = ''
  + 'body.rkr-wide .lcs-app{max-width:min(1080px,96vw);}'
  + 'body.rkr-wide .lcs-title{overflow-wrap:break-word;word-break:normal;hyphens:auto;}'
  + '@media (max-width:480px){'
  +   'body.rkr-wide .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}'
  +   'body.rkr-wide .lcs-title{font-size:clamp(18px,6vw,26px);}'
  + '}'
  + '.rkr-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(8px,1.4vmin,14px);width:100%;}'
  + '.rkr-loading{padding:48px 0;color:var(--lcs-ink-soft);font-family:var(--lcs-font-body);font-weight:700;}'

  /* strips + chips */
  + '.rkr-strip{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;width:100%;}'
  + '.rkr-stripcol{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;}'
  + '.rkr-striplabel{font-family:var(--lcs-font-body);font-weight:800;font-size:13px;color:var(--lcs-ink-soft);}'
  + '.rkr-chip{display:inline-flex;align-items:center;gap:5px;font-family:var(--lcs-font-display);'
  +   'font-weight:700;font-size:13.5px;color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);'
  +   'padding:7px 14px;min-height:44px;cursor:pointer;transition:transform .1s var(--lcs-ease),background .12s;}'
  + '.rkr-chip:active{transform:scale(.96);}'
  + '.rkr-chip.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.rkr-chip.teal{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.rkr-chip.locked{color:var(--lcs-ink-soft);}'
  + '.rkr-sep{width:1.5px;height:26px;background:var(--lcs-line);margin:0 2px;}'
  + '.rkr-seqname{font-family:var(--lcs-font-display);font-weight:700;font-size:clamp(15px,2.4vmin,20px);color:var(--lcs-ink);}'
  + '.rkr-seqcount{font-family:var(--lcs-font-display);font-weight:700;font-size:16px;color:var(--lcs-structure);}'
  + '.rkr-note{font-family:var(--lcs-font-body);font-weight:700;font-size:13px;color:var(--lcs-ink-soft);'
  +   'background:var(--lcs-surface);border-radius:var(--lcs-radius-pill);padding:5px 14px;'
  +   'box-shadow:var(--lcs-shadow-sm);max-width:680px;text-align:center;}'

  /* readout */
  + '.rkr-readout{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(40px,7vmin,72px);line-height:1;color:var(--lcs-structure);'
  +   'background:var(--lcs-surface);border-radius:var(--lcs-radius);padding:4px 26px;'
  +   'box-shadow:var(--lcs-shadow);}'
  + '.rkr-readout.rkr-pop{animation:rkrPop .3s var(--lcs-ease);}'
  + '@keyframes rkrPop{0%{transform:scale(.85);}60%{transform:scale(1.06);}100%{transform:scale(1);}}'

  /* the board */
  + '.rkr-boardscroll{width:100%;overflow-x:auto;overflow-y:hidden;border-radius:20px;}'
  + '.rkr-board{position:relative;width:100%;background:#FFFEFB;border-radius:20px;'
  +   'box-shadow:var(--lcs-shadow);padding:calc(var(--rkr-pitch,84px)*0.35) 26px;'
  +   'display:flex;flex-direction:column;gap:calc(var(--rkr-pitch,84px) - var(--rkr-d,64px));'
  +   'overflow:hidden;box-sizing:border-box;}'
  + '.rkr-rail{position:absolute;top:-10px;bottom:-10px;width:22px;background:var(--lcs-structure);'
  +   'border-radius:11px;z-index:3;box-shadow:inset 0 3px 0 rgba(255,255,255,.22),inset 0 -5px 0 rgba(0,0,0,.20);}'
  + '.rkr-rail.left{left:2px;}'
  + '.rkr-rail.right{right:2px;}'

  /* rods + beads */
  + '.rkr-rod{position:relative;height:var(--rkr-d,64px);touch-action:none;outline-offset:4px;}'
  + '.rkr-rod:focus-visible{outline:3px solid #4A90B8;border-radius:10px;}'
  + '.rkr-wire{position:absolute;left:-26px;right:-26px;top:50%;height:12px;transform:translateY(-50%);'
  +   'background:var(--lcs-structure);border-radius:6px;'
  +   'box-shadow:inset 0 2px 0 rgba(255,255,255,.28);}'
  + '.rkr-bead{position:absolute;top:50%;left:0;width:var(--rkr-d,64px);height:var(--rkr-d,64px);'
  +   'border-radius:50%;background:#FFFEFB;border:2.5px solid var(--lcs-structure);'
  +   'box-sizing:border-box;z-index:2;will-change:transform;'
  +   'box-shadow:inset 0 calc(var(--rkr-d,64px)*-0.07) 0 rgba(0,0,0,.10),'
  +   'inset calc(var(--rkr-d,64px)*0.12) calc(var(--rkr-d,64px)*0.14) 0 rgba(255,255,255,.35),'
  +   '0 3px 4px rgba(20,30,28,.12);}'
  + '.rkr-bead.red{background:#F2784B;border-color:#C9502A;}'
  + '.rkr-bead.grab{filter:brightness(1.05);'
  +   'box-shadow:inset 0 calc(var(--rkr-d,64px)*-0.07) 0 rgba(0,0,0,.10),'
  +   'inset calc(var(--rkr-d,64px)*0.12) calc(var(--rkr-d,64px)*0.14) 0 rgba(255,255,255,.35),'
  +   '0 7px 10px rgba(20,30,28,.22);}'
  + '.rkr-rod.settle .rkr-bead{transition:transform .26s cubic-bezier(.34,1.56,.64,1);}'
  + '.rkr-bead.rkr-wobble{animation:rkrWobble .3s var(--lcs-ease);}'
  + '@keyframes rkrWobble{0%{margin-top:0;}30%{margin-top:-3px;}70%{margin-top:2px;}100%{margin-top:0;}}'
  + '.rkr-rodchip{position:absolute;right:-22px;top:50%;transform:translateY(-50%);'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:14px;color:var(--lcs-ink-soft);'
  +   'background:var(--lcs-surface);border:1.5px solid var(--lcs-line);border-radius:9px;'
  +   'padding:1px 7px;z-index:4;}'
  + '.rkr-board.nodrag .rkr-rod{pointer-events:none;}'

  /* the shade */
  + '.rkr-shade{position:absolute;inset:0;z-index:6;transform:translateY(-101%);'
  +   'transition:transform .26s cubic-bezier(.34,1.56,.64,1);pointer-events:none;}'
  + '.rkr-shade.down{transform:translateY(0);pointer-events:auto;}'
  /* half = the missing-part game: the LOWER half hides, the top row
     stays visible ("how many are hiding?") — cloth pockets up from the
     bottom, hem flipped to its leading (top) edge, no pull ring */
  + '.rkr-shade.down.half{transform:translateY(0);background:transparent;}'
  + '.rkr-shade.down.half .rkr-cloth{top:50%;}'
  + '.rkr-shade.down.half .rkr-hem{top:-10px;bottom:auto;transform:scaleY(-1);}'
  + '.rkr-shade.down.half .rkr-ring{display:none;}'
  + '.rkr-cloth{position:absolute;inset:0;background-color:#FBF6E9;'
  +   'background-image:radial-gradient(rgba(242,120,75,.3) 1.6px,transparent 1.6px);'
  +   'background-size:10px 10px;box-shadow:0 6px 14px rgba(20,30,28,.16);}'
  + '.rkr-hem{position:absolute;left:0;right:0;bottom:2px;height:28px;}'
  + '.rkr-scallops{position:absolute;left:0;right:0;top:2px;width:100%;height:24px;}'
  + '.rkr-stitch{position:absolute;left:2%;right:2%;top:-6px;border-top:2.5px dashed rgba(242,120,75,.55);}'
  + '.rkr-ring{position:absolute;left:50%;top:-42px;transform:translateX(-50%);}'

  /* dock */
  + '.rkr-dock{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;width:100%;min-height:8px;}'
  + '.rkr-show{position:relative;display:inline-flex;align-items:center;justify-content:center;'
  +   'min-width:126px;min-height:54px;padding:12px 32px;border-radius:var(--lcs-radius-pill);'
  +   'border:none;cursor:pointer;background:#F2784B;color:#fff;'
  +   'font-family:var(--lcs-font-display);font-weight:800;font-size:clamp(16px,2.4vmin,21px);'
  +   'box-shadow:0 4px 0 0 #C9502A,0 6px 14px rgba(20,30,28,.14);'
  +   'transition:transform .1s var(--lcs-ease);touch-action:none;}'
  + '.rkr-show:active{transform:translateY(3px);box-shadow:0 1px 0 0 #C9502A;}'
  + '.rkr-arc{position:absolute;inset:-4px;width:calc(100% + 8px);height:calc(100% + 8px);'
  +   'pointer-events:none;transform:rotate(-90deg);}'
  + '.rkr-arc-fill{stroke:#fff;stroke-opacity:.85;stroke-width:3;stroke-linecap:round;'
  +   'stroke-dasharray:289;stroke-dashoffset:289;}'
  + '.rkr-ctrlchip{font-family:var(--lcs-font-display);font-weight:700;font-size:14.5px;'
  +   'color:var(--lcs-structure);background:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);padding:10px 18px;min-height:50px;cursor:pointer;'
  +   'box-shadow:var(--lcs-shadow-sm);transition:transform .1s var(--lcs-ease);}'
  + '.rkr-ctrlchip:active{transform:scale(.97);}'
  + '.rkr-ctrlchip.teal{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.rkr-done{display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:center;'
  +   'background:#FDE8DE;border-radius:var(--lcs-radius);padding:12px 22px;}'
  + '.rkr-done p{margin:0;font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(15px,2.4vmin,20px);color:var(--lcs-ink);}'

  /* gates */
  + '.rkr-gate{display:flex;flex-direction:column;gap:5px;padding:10px 14px;max-width:520px;'
  +   'margin:8px auto;background:#FDE8DE;border-radius:var(--lcs-radius-sm);'
  +   'font-size:13.5px;font-family:var(--lcs-font-body);color:var(--lcs-ink);text-align:center;}'
  + '.rkr-gate a{color:#C9502A;font-weight:800;text-decoration:underline;}'

  /* panel */
  + '.rkr-scrim{position:absolute;inset:0;background:rgba(38,51,47,.28);opacity:0;'
  +   'pointer-events:none;transition:opacity .2s;z-index:70;border-radius:inherit;}'
  + '.rkr-scrim.open{opacity:1;pointer-events:auto;}'
  + '.rkr-panel{position:absolute;left:50%;top:6%;transform:translateX(-50%) translateY(8px);'
  +   'width:min(560px,92%);max-height:86%;overflow:auto;background:var(--lcs-surface);'
  +   'border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow);z-index:71;'
  +   'opacity:0;pointer-events:none;transition:opacity .2s,transform .2s var(--lcs-ease);'
  +   'display:flex;flex-direction:column;}'
  + '.rkr-panel.open{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0);}'
  + '.rkr-panel-head{display:flex;align-items:center;justify-content:space-between;'
  +   'padding:14px 16px 10px;border-bottom:1px solid var(--lcs-line);}'
  + '.rkr-tabs{display:flex;gap:8px;}'
  + '.rkr-tab{font-family:var(--lcs-font-display);font-weight:700;font-size:14px;'
  +   'padding:7px 14px;border-radius:var(--lcs-radius-pill);color:var(--lcs-ink-soft);'
  +   'background:transparent;cursor:pointer;}'
  + '.rkr-tab.active{background:var(--lcs-structure);color:var(--lcs-surface);}'
  + '.rkr-panel-close{width:36px;height:36px;display:grid;place-items:center;border-radius:50%;'
  +   'color:var(--lcs-ink-soft);background:transparent;cursor:pointer;}'
  + '.rkr-panel-body{padding:12px 16px 16px;display:flex;flex-direction:column;gap:8px;}'
  + '.rkr-bandhead{font-family:var(--lcs-font-display);font-weight:700;font-size:13px;'
  +   'color:var(--lcs-ink-soft);text-transform:uppercase;letter-spacing:.05em;margin-top:6px;}'
  + '.rkr-seqrow{display:flex;align-items:center;gap:10px;text-align:left;width:100%;'
  +   'padding:11px 14px;border-radius:var(--lcs-radius-sm);cursor:pointer;'
  +   'background:var(--lcs-surface-2);border:1.5px solid var(--lcs-line);'
  +   'font-family:var(--lcs-font-body);}'
  + '.rkr-seqrow.active{border-color:var(--lcs-structure);background:var(--lcs-structure-soft);}'
  + '.rkr-seqrow.locked .rkr-seqrowname{color:var(--lcs-ink-soft);}'
  + '.rkr-seqrowname{font-weight:800;color:var(--lcs-ink);flex:1;}'
  + '.rkr-seqrowmeta{font-size:12.5px;color:var(--lcs-ink-soft);font-weight:700;}'
  + '.rkr-freebadge{font-family:var(--lcs-font-display);font-weight:800;font-size:11px;'
  +   'color:#fff;background:#F2784B;border-radius:8px;padding:2px 8px;}'
  + '.rkr-minerow{display:flex;align-items:center;gap:8px;}'
  + '.rkr-minerow .rkr-seqrow{flex:1;}'
  + '.rkr-shownum{display:flex;align-items:center;gap:8px;flex-wrap:wrap;'
  +   'padding-bottom:10px;border-bottom:1.5px dashed var(--lcs-line);}'
  + '.rkr-shownum-label{font-family:var(--lcs-font-body);font-weight:800;font-size:13.5px;color:var(--lcs-ink);}'
  + '.rkr-stepbtn{width:44px;height:44px;border-radius:50%;font-size:24px;cursor:pointer;'
  +   'font-family:var(--lcs-font-display);background:var(--lcs-surface);color:var(--lcs-structure);'
  +   'box-shadow:var(--lcs-shadow-sm);border:1.5px solid var(--lcs-line);}'
  + '.rkr-numinput{width:80px;text-align:center;font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:20px;padding:8px;border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-sm);'
  +   'background:var(--lcs-surface-2);color:var(--lcs-ink);}'
  + '.rkr-numinput.wide{width:100%;box-sizing:border-box;text-align:left;font-family:var(--lcs-font-body);font-size:15px;}'
  + '.rkr-btn{align-self:flex-start;font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:14px;padding:9px 18px;border-radius:var(--lcs-radius-pill);cursor:pointer;'
  +   'background:var(--lcs-surface);border:1.5px solid var(--lcs-structure);color:var(--lcs-structure);}'
  + '.rkr-btn.primary{background:var(--lcs-structure);color:var(--lcs-surface);}'
  + '.rkr-btn.locked{opacity:.75;}'
  + '.rkr-composer{display:flex;flex-direction:column;gap:10px;padding-top:8px;}'
  + '.rkr-drafttray{display:flex;gap:6px;flex-wrap:wrap;}'
  + '.rkr-draftchip{display:inline-flex;align-items:center;gap:6px;'
  +   'font-family:var(--lcs-font-body);font-weight:700;font-size:13px;color:var(--lcs-ink);'
  +   'background:var(--lcs-surface-2);border:1.5px solid var(--lcs-line);border-radius:8px;padding:4px 8px;}'
  + '.rkr-draftrm{border:none;background:transparent;color:var(--lcs-ink-soft);font-size:16px;cursor:pointer;padding:0 2px;}'
  + '.rkr-linkbtn{font-family:var(--lcs-font-body);font-weight:700;font-size:13px;'
  +   'color:var(--lcs-structure);background:transparent;border:none;cursor:pointer;'
  +   'text-decoration:underline;padding:4px;}'
  + '.rkr-linkbtn.danger{color:#C9502A;}'

  /* short screens (projector 1024×768) */
  + '@media (max-height:960px) and (min-width:768px){'
  +   '.rkr-wrap{gap:6px;}'
  +   '.rkr-readout{font-size:clamp(30px,5.4vh,52px);padding:2px 20px;}'
  +   '.rkr-board{padding-top:calc(var(--rkr-pitch,84px)*0.22);padding-bottom:calc(var(--rkr-pitch,84px)*0.22);}'
  + '}'
  /* phone: the rod keeps a usable ≥440px width and pans; the wall
     chips (5/10 racks) hide — a 100-bead wall is a projector surface */
  + '@media (max-width:560px){'
  +   '.rkr-board{min-width:440px;}'
  +   '.rkr-chip[data-n="5"],.rkr-chip[data-n="10"]{display:none;}'
  + '}'

  /* reduced motion */
  /* =====================================================================
     ⚠⚠ NO CARD TIER HERE, AND THAT IS THE MEASURED ANSWER, NOT AN OMISSION.
     rekenrek looks card-bound — the board fills 96% of a card its own
     self-widen rule pins at 1080 — so I wrote it the same 1240/1560/1740
     ladder its siblings got, and EVERY GATE PASSED: FILL 40.3% -> 66.1%,
     116 assertions green, no cut-off in German or Italian, control unmoved.

     THEN I READ THE RENDER. The beads sat in the right third of a very long
     empty rail. Measured:
         1366   card 1080  board 1037  bead 64px  beads span 640   62% full
         1920   card 1560  board 1512  bead 64px  beads span 640   42% full
         2560   card 1740  board 1692  bead 64px  beads span 640   38% full
     THE BEAD IS 64px AT EVERY WIDTH. Only the empty rail grew, 397px to
     1052px, so the card raise took bead-fill from 62% to 38% and made the
     instrument WORSE while the FILL floor recorded a success. The floor
     measures the apparatus BOX, and a box that grows while its repeated
     children stay fixed is the draw-bag lesson in a new dress: the card
     grew and the instrument did not.

     ⚠ THE BEAD DIAMETER IS SET IN JS — `--rkr-d` from the geometry object —
     so no CSS tier could reach it. That work is now DONE: `_geom()` reads a
     --rkr-dmax ceiling from CSS, so the tiers below raise the ceiling and the
     tool's own `span/14.5` rule (10 beads plus travel) decides the actual
     size. A tall rack is bound by the measured room under the board instead,
     because ten rods at a 113px bead would stand 1500px. The rod pitch keeps
     its fixed ratio to the bead so the flex `gap: pitch - d` can never go
     negative. Below 1367 the cap is 1 and the height clamp is skipped, so the
     layout is byte-identical to the one measured above.
     ===================================================================== */
  + '@media (min-width:1367px) and (min-height:880px){'
  +   'body.rkr-wide{--rkr-dmax:1.55;}'
  +   'body.rkr-wide .lcs-app{max-width:min(1192px,96vw);}'
  +   'body.rkr-wide .rkr-ctrlchip{font-size:17px;min-height:56px;padding:12px 22px;}'
  +   'body.rkr-wide .rkr-chip{font-size:16px;min-height:52px;padding:10px 18px;}'
  +   'body.rkr-wide .rkr-show{font-size:22px;min-height:62px;min-width:150px;}'
  + '}'
  + '@media (min-width:1800px) and (min-height:1080px){'
  +   'body.rkr-wide{--rkr-dmax:1.95;}'
  +   'body.rkr-wide .lcs-app{max-width:min(1560px,96vw);}'
  +   'body.rkr-wide .rkr-ctrlchip{font-size:19px;min-height:60px;padding:13px 24px;}'
  +   'body.rkr-wide .rkr-chip{font-size:18px;min-height:56px;padding:11px 20px;}'
  +   'body.rkr-wide .rkr-show{font-size:25px;min-height:68px;min-width:170px;}'
  + '}'
  + '@media (min-width:2400px) and (min-height:1150px){'
  +   'body.rkr-wide{--rkr-dmax:2.3;}'
  +   'body.rkr-wide .lcs-app{max-width:min(1752px,96vw);}'
  +   'body.rkr-wide .rkr-ctrlchip{font-size:21px;min-height:64px;padding:14px 26px;}'
  +   'body.rkr-wide .rkr-chip{font-size:20px;min-height:60px;padding:12px 22px;}'
  +   'body.rkr-wide .rkr-show{font-size:28px;min-height:74px;min-width:190px;}'
  + '}'
  + '@media (prefers-reduced-motion: reduce){'
  +   '.rkr-rod.settle .rkr-bead{transition:transform .12s linear;}'
  +   '.rkr-bead.rkr-wobble,.rkr-readout.rkr-pop{animation:none;}'
  +   '.rkr-shade{transition:opacity .12s;transform:none!important;opacity:0;pointer-events:none;}'
  +   '.rkr-shade.down{opacity:1;pointer-events:auto;}'
  +   '.rkr-shade.down.half{opacity:1;clip-path:inset(50% 0 0 0);}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
