/* =====================================================================
   TOOL #8 — NUMBER TALK EASEL   (number-talk-easel.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks`). Tool #5 of the Premium Tools
   Program pilot wave — the second daily Morning-Circle routine:
   subitizing quick images ("Blitzblick") behind a teacher-controlled
   curtain. Flash ~3 seconds so counting one-by-one is impossible and
   structure-seeing is forced; then the discussion layer.

   PEDAGOGY (locked by the 2026-07-16 expert-ensemble design):
     The curtain is the pedagogy. Show = a timed flash (the arc drains
     on the BUTTON, peripheral — never a child-facing countdown);
     press-and-hold keeps the curtain open exactly while pressed; Show
     again re-flashes the IDENTICAL image (authored/stored seed — the
     child checks their mental image against the same picture). Reveal
     parks the curtain open for discussion: tap-to-tint groupings on
     dots/objects ("I saw 5 and 3"), crayon ink for circling structure.
     FEEDBACK: NONE — no right/wrong, ever. The only confirmation is
     the teacher-invoked Count-it, which counts the STRUCTURE aloud
     ("five… three… eight") and raises the reveal card.
     NUMERAL-LEAK DISCIPLINE: the quantity never appears in DOM, aria
     or announcements before Count-it (a harness gate asserts it).

   Representations ladder: random dots (1-6 HARD CAP — random >6 is
   noise, not math) · dice pips (2-10) · circular (3-10) · ten frame
   (3-10) · double ten frame (8-20) · rekenrek (1-20, 5-structure) ·
   scattered identical objects (6-12). Free = the dot-flash routine
   (all three dot arrangements) + one starter string; premium = the
   frame/rekenrek/objects ladder, the strings library, custom sets,
   ink + tint. Strings live in number-talk-easel-strings.json with
   AUTHORED seeds (identical flash in every classroom).
   ===================================================================== */
var NumberTalkEasel = {
  id: 'number-talk-easel',

  strings: {
    title: {en:'Number Talk Easel',de:'Blitzblick-Tafel',fr:'Cartes à points',it:'Immagini lampo',es:'Caballete numérico',pt:'Conversa numérica',nl:'Flitsbeelden',sv:'Blixtbilder',da:'Lynbilleder',no:'Kvikkbilder',fi:'Välähdyskuvat'},
    instruction: {en:'Flash a quantity picture, talk about how children saw it — the curtain is yours.',de:'Lass ein Mengenbild kurz aufblitzen und sprecht darüber, wie die Kinder es gesehen haben — der Vorhang gehört dir.',fr:'Montrez une image flash et cherchez ensemble comment les enfants l’ont vue — le rideau est à vous.',it:'Mostra un’immagine lampo e parlate di come i bambini l’hanno vista — il sipario è tuo.',es:'Muestra una imagen relámpago y platiquen cómo la vieron — la cortina es tuya.',pt:'Mostre uma imagem relâmpago e conversem sobre como cada um viu — a cortina é sua.',nl:'Flits een getalbeeld en praat na over wat de kinderen zagen — het gordijn is van jou.',sv:'Visa en blixtbild och prata om hur barnen såg den — rullgardinen är din.',da:'Vis et talbillede i et kort glimt, og tal om, hvordan børnene så det — tæppet er dit.',no:'Vis et tallbilde i et kort glimt, og snakk om hvordan barna så det — teppet er ditt.',fi:'Välähdytä lukumääräkuva ja puhukaa siitä, miten lapset sen näkivät — verho on sinun käsissäsi.'},

    /* the sentence stems — the localization moat (natives refine) */
    stem1: {en:'How many did you see?',de:'Wie viele hast du gesehen?',fr:'Combien en as-tu vu ?',it:'Quanti ne hai visti?',es:'¿Cuántos viste?',pt:'Quantos você viu?',nl:'Hoeveel zag je er?',sv:'Hur många såg du?',da:'Hvor mange så du?',no:'Hvor mange så du nå?',fi:'Montako näit?'},
    stem2: {en:'How did you see it?',de:'Wie hast du es gesehen?',fr:'Comment as-tu fait pour le voir ?',it:'Come li hai visti?',es:'¿Cómo lo viste?',pt:'Como você viu?',nl:'Hoe zag je het?',sv:'Hur såg du det?',da:'Hvordan så du det?',no:'Hvordan tenkte du?',fi:'Miten sinä sen näit?'},
    stem3: {en:'Did anyone see it differently?',de:'Wer hat es anders gesehen?',fr:'Qui l’a vu d’une autre façon ?',it:'Qualcuno li ha visti in un altro modo?',es:'¿Alguien lo vio de otra manera?',pt:'Alguém viu de outro jeito?',nl:'Zag iemand het anders?',sv:'Var det någon som såg det på ett annat sätt?',da:'Er der nogen, der så det på en anden måde?',no:'Så noen det på en annen måte?',fi:'Näkikö joku sen eri tavalla?'},
    stem4: {en:'Turn and tell your partner.',de:'Erzähl es deinem Sitznachbarn.',fr:'Explique à ton voisin.',it:'Raccontalo al tuo compagno di banco.',es:'Platícale a tu compañero.',pt:'Conte para o colega do lado.',nl:'Vertel het aan je maatje.',sv:'Berätta för kompisen bredvid dig.',da:'Fortæl det til din makker.',no:'Snu deg og fortell læringspartneren din.',fi:'Kerro parillesi.'},
    stem5: {en:'Shall we look again?',de:'Wollen wir noch einmal schauen?',fr:'On regarde encore une fois ?',it:'Lo guardiamo ancora una volta?',es:'¿Lo vemos otra vez?',pt:'Vamos olhar de novo?',nl:'Zullen we nog eens kijken?',sv:'Ska vi titta en gång till?',da:'Skal vi kigge en gang til?',no:'Skal vi se en gang til?',fi:'Katsotaanko vielä kerran?'},
    nextStem: {en:'Next question',de:'Nächste Frage',fr:'Question suivante',it:'Prossima domanda',es:'Siguiente pregunta',pt:'Próxima pergunta',nl:'Volgende vraag',sv:'Nästa fråga',da:'Næste spørgsmål',no:'Neste spørsmål',fi:'Seuraava kysymys'},

    /* controls */
    show: {en:'Show',de:'Zeigen',fr:'Montrer',it:'Mostra',es:'Mostrar',pt:'Mostrar',nl:'Laat zien',sv:'Visa',da:'Vis',no:'Vis',fi:'Näytä'},
    hideNow: {en:'Hide now',de:'Jetzt verdecken',fr:'Cacher',it:'Nascondi',es:'Ocultar',pt:'Esconder',nl:'Verberg',sv:'Dra ner',da:'Skjul',no:'Ned med teppet',fi:'Piilota'},
    showAgain: {en:'Show again',de:'Noch einmal zeigen',fr:'Remontrer',it:'Mostra ancora',es:'Mostrar otra vez',pt:'Mostrar de novo',nl:'Laat nog eens zien',sv:'Visa igen',da:'Vis igen',no:'Vis igjen',fi:'Näytä uudelleen'},
    reveal: {en:'Reveal',de:'Aufdecken',fr:'Dévoiler',it:'Scopri',es:'Destapar',pt:'Revelar',nl:'Gordijn open',sv:'Ta fram',da:'Tæppet fra',no:'Opp med teppet',fi:'Paljasta'},
    nextImage: {en:'Next',de:'Weiter',fr:'Suivant',it:'Avanti',es:'Siguiente',pt:'Próxima',nl:'Volgende',sv:'Nästa',da:'Næste',no:'Neste',fi:'Seuraava'},
    countIt: {en:'Count it',de:'Wir zählen nach!',fr:'On compte !',it:'Contiamo!',es:'¡A contar!',pt:'Vamos contar!',nl:'Tellen maar!',sv:'Vi räknar!',da:'Vi tæller!',no:'Vi teller!',fi:'Lasketaan!'},
    clear: {en:'Clear',de:'Löschen',fr:'Effacer',it:'Cancella',es:'Borrar',pt:'Limpar',nl:'Wissen',sv:'Sudda allt',da:'Ryd',no:'Ta bort alt',fi:'Tyhjennä'},
    todaysImage: {en:'Today’s quick image',de:'Blitzbild des Tages',fr:'Image flash du jour',it:'Immagine lampo del giorno',es:'Imagen relámpago de hoy',pt:'Imagem relâmpago de hoje',nl:'Flitsbeeld van vandaag',sv:'Dagens blixtbild',da:'Dagens lynbillede',no:'Dagens kvikkbilde',fi:'Päivän välähdyskuva'},

    /* representations + ranges */
    reprRandom:   {en:'Dots',de:'Punkte',fr:'Points',it:'Punti',es:'Puntos',pt:'Pontos',nl:'Stippen',sv:'Prickar',da:'Prikker',no:'Prikker',fi:'Pisteet'},
    reprDice: {en:'Dice',de:'Würfelbild',fr:'Constellations',it:'Dado',es:'Dados',pt:'Dados',nl:'Dobbelsteen',sv:'Tärningsbild',da:'Terning',no:'Terning',fi:'Noppa'},
    reprCircular: {en:'Circle',de:'Kreisbild',fr:'En cercle',it:'Cerchio',es:'Círculo',pt:'Círculo',nl:'Cirkel',sv:'Cirkel',da:'Cirkel',no:'Sirkel',fi:'Ympyrä'},
    reprTenframe: {en:'Ten frame',de:'Zehnerfeld',fr:'Boîte de dix',it:'Tabella del dieci',es:'Marco de diez',pt:'Quadro de dez',nl:'Tienraam',sv:'Tioram',da:'Tierramme',no:'Tierramme',fi:'Kymmenruudukko'},
    reprDouble: {en:'Double frame',de:'Zwanzigerfeld',fr:'Double boîte',it:'Doppia tabella',es:'Marco doble',pt:'Quadro duplo',nl:'Dubbel tienraam',sv:'Dubbel tioram',da:'Dobbelt tierramme',no:'Dobbel tierramme',fi:'Kaksoiskymmenruudukko'},
    reprRekenrek: {en:'Bead rack',de:'Rechenrahmen',fr:'Boulier',it:'Abaco',es:'Ábaco',pt:'Ábaco',nl:'Rekenrek',sv:'Kulram',da:'Kugleramme',no:'Kuleramme',fi:'Helmitaulu'},
    reprObjects: {en:'Pictures',de:'Bilder',fr:'Images',it:'Oggetti',es:'Objetos',pt:'Figuras',nl:'Plaatjes',sv:'Bilder',da:'Billeder',no:'Bilder',fi:'Kuvat'},
    range15:      {en:'1–5',de:'1–5',fr:'1–5',it:'1–5',es:'1–5',pt:'1–5',nl:'1–5',sv:'1–5',da:'1–5',no:'1–5',fi:'1–5'},
    range110:     {en:'1–10',de:'1–10',fr:'1–10',it:'1–10',es:'1–10',pt:'1–10',nl:'1–10',sv:'1–10',da:'1–10',no:'1–10',fi:'1–10'},
    range1020:    {en:'10–20',de:'10–20',fr:'10–20',it:'10–20',es:'10–20',pt:'10–20',nl:'10–20',sv:'10–20',da:'10–20',no:'10–20',fi:'10–20'},

    /* discussion tools */
    penTint: {en:'Tap to color',de:'Tippen färbt',fr:'Toucher pour colorier',it:'Tocca per colorare',es:'Toca y colorea',pt:'Toque para colorir',nl:'Tik om te kleuren',sv:'Tryck för att färga',da:'Tryk for at farve',no:'Trykk for å farge',fi:'Väritä napauttamalla'},
    penInk:       {en:'Crayon',de:'Stift',fr:'Crayon',it:'Pastello',es:'Crayón',pt:'Giz',nl:'Krijtje',sv:'Krita',da:'Farvekridt',no:'Fargestift',fi:'Liitu'},
    penErase:     {en:'Eraser',de:'Radierer',fr:'Gomme',it:'Gomma',es:'Borrador',pt:'Borracha',nl:'Gum',sv:'Sudd',da:'Viskelæder',no:'Viskelær',fi:'Pyyhekumi'},

    /* strings + panel */
    stringsTitle: {en:'Number talk strings',de:'Blitzblick-Reihen',fr:'Suites d’images',it:'Serie di immagini',es:'Series de imágenes',pt:'Séries de imagens',nl:'Flitsreeksen',sv:'Bildserier',da:'Billedserier',no:'Bildeserier',fi:'Kuvasarjat'},
    mySets: {en:'My sets',de:'Meine Reihen',fr:'Mes suites',it:'Le mie serie',es:'Mis series',pt:'Minhas séries',nl:'Mijn reeksen',sv:'Mina serier',da:'Mine serier',no:'Egne serier',fi:'Omat sarjat'},
    bandK: {en:'Kindergarten',de:'Vorschule / Klasse 1',fr:'Maternelle (GS)',it:'Infanzia / prima',es:'Preescolar',pt:'Educação Infantil',nl:'Kleuters / groep 3',sv:'Förskoleklass',da:'Børnehaveklasse',no:'1. trinn',fi:'Esiopetus / 1. luokka'},
    bandG1: {en:'Grade 1',de:'Klasse 1–2',fr:'CP',it:'Prima / seconda',es:'1.º de primaria',pt:'1º ano',nl:'Groep 3–4',sv:'Åk 1',da:'1. klasse',no:'1.–2. trinn',fi:'1.–2. luokka'},
    bandG2: {en:'Grade 2',de:'Klasse 2',fr:'CE1',it:'Seconda',es:'2.º de primaria',pt:'2º ano',nl:'Groep 4–5',sv:'Åk 2',da:'2. klasse',no:'2. trinn',fi:'2. luokka'},
    imagesCount:  {en:'{n} images',de:'{n} Bilder',fr:'{n} images',it:'{n} immagini',es:'{n} imágenes',pt:'{n} imagens',nl:'{n} beelden',sv:'{n} bilder',da:'{n} billeder',no:'{n} bilder',fi:'{n} kuvaa'},
    freeBadge: {en:'Free',de:'Kostenlos',fr:'Gratuite',it:'Gratis',es:'Gratis',pt:'Grátis',nl:'Gratis',sv:'Gratis',da:'Gratis',no:'Gratis',fi:'Ilmainen'},
    stringDone: {en:'String finished — lovely talk!',de:'Reihe geschafft — ein schönes Gespräch!',fr:'Suite terminée — belle discussion !',it:'Serie finita — che bella conversazione!',es:'Serie terminada — ¡qué buena charla!',pt:'Série concluída — que conversa boa!',nl:'Reeks klaar — mooi gesprek!',sv:'Serien är klar — vilket fint samtal!',da:'Serien er færdig — sikke en god snak!',no:'Serien er ferdig — for en fin samtale!',fi:'Sarja valmis — hieno keskustelu!'},
    restart: {en:'Restart',de:'Von vorn',fr:'Recommencer',it:'Ricomincia',es:'Reiniciar',pt:'Recomeçar',nl:'Opnieuw',sv:'Börja om',da:'Forfra',no:'På nytt',fi:'Aloita alusta'},
    backToLibrary:{en:'Back to the library',de:'Zurück zur Übersicht',fr:'Retour aux suites',it:'Torna alle serie',es:'Volver a las series',pt:'Voltar às séries',nl:'Terug naar de reeksen',sv:'Tillbaka till serierna',da:'Tilbage til serierne',no:'Tilbake til seriene',fi:'Takaisin sarjoihin'},
    freeBuild: {en:'Quick images',de:'Blitzbilder',fr:'Images flash',it:'Punti lampo',es:'Imágenes relámpago',pt:'Imagens relâmpago',nl:'Zelf flitsen',sv:'Blixtbilder',da:'Lynbilleder',no:'Kvikkbilder',fi:'Välähdyskuvat'},

    /* my sets builder */
    addItem:      {en:'Add image',de:'Bild hinzufügen',fr:'Ajouter une image',it:'Aggiungi immagine',es:'Agregar imagen',pt:'Adicionar imagem',nl:'Beeld toevoegen',sv:'Lägg till bild',da:'Tilføj billede',no:'Legg til bilde',fi:'Lisää kuva'},
    setName: {en:'Name your set',de:'Name der Reihe',fr:'Nom de la suite',it:'Nome della serie',es:'Nombre de la serie',pt:'Nome da série',nl:'Naam van de reeks',sv:'Seriens namn',da:'Seriens navn',no:'Hva skal serien hete?',fi:'Sarjan nimi'},
    saveSet:      {en:'Save set',de:'Reihe speichern',fr:'Enregistrer',it:'Salva serie',es:'Guardar serie',pt:'Salvar série',nl:'Reeks opslaan',sv:'Spara serien',da:'Gem serien',no:'Lagre serien',fi:'Tallenna sarja'},
    playSet: {en:'Play this set',de:'Reihe starten',fr:'Lancer la suite',it:'Avvia la serie',es:'Usar esta serie',pt:'Usar esta série',nl:'Reeks starten',sv:'Starta serien',da:'Start serien',no:'Sett i gang serien',fi:'Aloita sarja'},
    deleteSet:    {en:'Delete',de:'Löschen',fr:'Supprimer',it:'Elimina',es:'Eliminar',pt:'Excluir',nl:'Verwijderen',sv:'Ta bort',da:'Slet',no:'Slett',fi:'Poista'},

    /* gates */
    gateStrings: {en:'The full strings library is part of Premium — the starter string and the dot flash are always free.',de:'Die ganze Reihen-Bibliothek gehört zu Premium — die Startreihe und die Blitzbilder bleiben immer kostenlos.',fr:'La bibliothèque complète des suites fait partie de Premium — la suite de départ et les images flash restent gratuites.',it:'La raccolta completa delle serie fa parte di Premium — la serie iniziale e i punti lampo restano sempre gratuiti.',es:'La biblioteca completa de series es parte de Premium — la serie inicial y las imágenes relámpago siempre son gratis.',pt:'A biblioteca completa de séries faz parte do Premium — a série inicial e as imagens relâmpago são sempre gratuitas.',nl:'De volledige reeksenbibliotheek hoort bij Premium — de startreeks en het flitsen met stippen blijven altijd gratis.',sv:'Hela seriebiblioteket ingår i Premium — startserien och blixtbilderna är alltid gratis.',da:'Hele biblioteket er en del af Premium — startserien og lynbillederne er altid gratis.',no:'Hele seriebiblioteket er en del av Premium — gratisversjonen har alltid startserien og kvikkbildene med prikker.',fi:'Kaikki kuvasarjat kuuluvat Premiumiin — aloitussarja ja pisteiden välähdykset ovat aina ilmaisia.'},
    gateReprs: {en:'Frames, the bead rack and picture images are part of Premium — the dot flash is always free.',de:'Zehnerfelder, Rechenrahmen und Bilder gehören zu Premium — die Blitzbilder mit Punkten bleiben immer kostenlos.',fr:'Les boîtes de dix, le boulier et les images font partie de Premium — le flash de points reste gratuit.',it:'Tabelle, abaco e oggetti fanno parte di Premium — i punti lampo restano sempre gratuiti.',es:'Los marcos de diez, el ábaco y los objetos son parte de Premium — los puntos relámpago siempre son gratis.',pt:'Quadros de dez, ábaco e figuras fazem parte do Premium — os pontos relâmpago são sempre gratuitos.',nl:'Tienramen, rekenrek en plaatjes horen bij Premium — flitsen met stippen blijft altijd gratis.',sv:'Tioramar, kulramen och bilderna ingår i Premium — blixtbilder med prickar är alltid gratis.',da:'Tierrammer, kugleramme og billeder er en del af Premium — lynprikkerne er altid gratis.',no:'Tierrammer, kuleramme og bildekort er en del av Premium — kvikkbilder med prikker er alltid med i gratisversjonen.',fi:'Ruudukot, helmitaulu ja kuvat kuuluvat Premiumiin — pisteiden välähdykset ovat aina ilmaisia.'},
    gateInk: {en:'Coloring and crayon notes are part of Premium — the flash routine is always free.',de:'Färben und Stift-Notizen gehören zu Premium — der Blitzblick bleibt immer kostenlos.',fr:'Le coloriage et le crayon font partie de Premium — le rituel du flash reste gratuit.',it:'Il colore al tocco e il pastello fanno parte di Premium — la routine lampo resta sempre gratuita.',es:'Colorear y el crayón son parte de Premium — la rutina del destello siempre es gratis.',pt:'Colorir e o giz fazem parte do Premium — a rotina de imagens relâmpago é sempre gratuita.',nl:'Kleuren en het krijtje horen bij Premium — de flitsroutine blijft altijd gratis.',sv:'Färgläggning och kritan ingår i Premium — blixtrutinen är alltid gratis.',da:'Farvelægning og farvekridtet er en del af Premium — lynrutinen er altid gratis.',no:'Farging og fargestift er en del av Premium — selve kvikkbilderutinen er alltid med i gratisversjonen.',fi:'Värittäminen ja liitu kuuluvat Premiumiin — välähdysrutiini on aina ilmainen.'},
    gateSave: {en:'Saving your own sets is part of Premium — composing is free to try.',de:'Eigene Reihen speichern gehört zu Premium — das Zusammenstellen ist kostenlos.',fr:'Enregistrer ses suites fait partie de Premium — les composer reste gratuit.',it:'Salvare le tue serie fa parte di Premium — comporle è sempre gratis.',es:'Guardar tus series es parte de Premium — armarlas es gratis.',pt:'Salvar suas séries faz parte do Premium — montar é grátis.',nl:'Eigen reeksen opslaan hoort bij Premium — samenstellen kun je gratis proberen.',sv:'Att spara egna serier ingår i Premium — att sätta ihop dem är gratis.',da:'At gemme egne serier er en del af Premium — det er gratis at sætte dem sammen.',no:'Å lagre egne serier er en del av Premium — å sette sammen en serie kan du alltid prøve i gratisversjonen.',fi:'Omien sarjojen tallentaminen kuuluu Premiumiin — kokoaminen on ilmaista.'},
    unlock: {en:'Unlock the whole easel',de:'Die ganze Tafel freischalten',fr:'Débloquer l’outil complet',it:'Sblocca lo strumento completo',es:'Desbloquear todo el caballete',pt:'Desbloquear a ferramenta completa',nl:'Alles ontgrendelen',sv:'Lås upp hela staffliet',da:'Lås det hele op',no:'Lås opp alt i Kvikkbilder',fi:'Avaa koko taulu'},

    /* settings */
    setFlash: {en:'Flash time',de:'Blitzdauer',fr:'Durée du flash',it:'Durata del lampo',es:'Duración del destello',pt:'Duração do relâmpago',nl:'Flitsduur',sv:'Blixttid',da:'Visningstid',no:'Visningstid',fi:'Välähdysaika'},
    setFlash2:    {en:'2 seconds',de:'2 Sekunden',fr:'2 secondes',it:'2 secondi',es:'2 segundos',pt:'2 segundos',nl:'2 seconden',sv:'2 sekunder',da:'2 sekunder',no:'2 sekunder',fi:'2 sekuntia'},
    setFlash3:    {en:'3 seconds',de:'3 Sekunden',fr:'3 secondes',it:'3 secondi',es:'3 segundos',pt:'3 segundos',nl:'3 seconden',sv:'3 sekunder',da:'3 sekunder',no:'3 sekunder',fi:'3 sekuntia'},
    setFlash5:    {en:'5 seconds',de:'5 Sekunden',fr:'5 secondes',it:'5 secondi',es:'5 segundos',pt:'5 segundos',nl:'5 seconden',sv:'5 sekunder',da:'5 sekunder',no:'5 sekunder',fi:'5 sekuntia'},
    setSpeak: {en:'Say the number on Count it',de:'Zahl beim Nachzählen vorsprechen',fr:'Dire le nombre quand on compte',it:'Pronuncia il numero al «Contiamo!»',es:'Decir el número al contar',pt:'Falar o número ao contar',nl:'Getal uitspreken bij het natellen',sv:'Säg talet när vi räknar',da:'Sig tallet højt ved »Vi tæller!«',no:'Si tallet når dere teller',fi:'Sano luku laskettaessa'},
    setTheme: {en:'Picture theme',de:'Bilderthema',fr:'Thème des images',it:'Tema degli oggetti',es:'Tema de los objetos',pt:'Tema das figuras',nl:'Plaatjesthema',sv:'Bildtema',da:'Billedtema',no:'Bildetema',fi:'Kuvateema'},
    setThemeAnimals:{en:'Animals',de:'Tiere',fr:'Animaux',it:'Animali',es:'Animales',pt:'Animais',nl:'Dieren',sv:'Djur',da:'Dyr',no:'Dyr',fi:'Eläimet'},
    setThemeFruits: {en:'Fruits',de:'Obst',fr:'Fruits',it:'Frutta',es:'Frutas',pt:'Frutas',nl:'Fruit',sv:'Frukter',da:'Frugter',no:'Frukt',fi:'Hedelmät'},
    setThemeMixed: {en:'Mixed',de:'Gemischt',fr:'Varié',it:'Misto',es:'Mixto',pt:'Misto',nl:'Gemengd',sv:'Blandat',da:'Blandet',no:'Litt av alt',fi:'Sekalaiset'},
    setCues: {en:'Sound cues',de:'Signaltöne',fr:'Signaux sonores',it:'Segnali sonori',es:'Señales sonoras',pt:'Sinais sonoros',nl:'Geluidssignalen',sv:'Ljudsignaler',da:'Lydsignaler',no:'Lydeffekter',fi:'Äänimerkit'},
    loading: {en:'Setting up the easel…',de:'Die Tafel wird aufgestellt…',fr:'Préparation des cartes…',it:'Preparo le immagini lampo…',es:'Preparando el caballete…',pt:'Preparando a conversa numérica…',nl:'We zetten de flitsbeelden klaar…',sv:'Ställer fram staffliet…',da:'Gør tavlen klar…',no:'Gjør klar tavla…',fi:'Pystytetään taulua…'},
    coveredAria: {en:'The picture is hidden behind the curtain',de:'Das Bild ist hinter dem Vorhang verdeckt',fr:'L’image est cachée derrière le rideau',it:'L’immagine è nascosta dietro il sipario',es:'La imagen está escondida detrás de la cortina',pt:'A imagem está escondida atrás da cortina',nl:'Het beeld is verborgen achter het gordijn',sv:'Bilden är gömd bakom rullgardinen',da:'Billedet er gemt bag tæppet',no:'Bildet er gjemt bak teppet',fi:'Kuva on piilossa verhon takana'},
    lookAria: {en:'Look!',de:'Schaut genau!',fr:'Regardez !',it:'Guarda!',es:'¡Mira!',pt:'Olha!',nl:'Kijk!',sv:'Titta!',da:'Se!',no:'Se nå!',fi:'Katso!'},
    revealedAria: {en:'The picture stays open for talking',de:'Das Bild bleibt für das Gespräch offen',fr:'L’image reste affichée pour la discussion',it:'L’immagine resta aperta per parlarne',es:'La imagen queda abierta para platicar',pt:'A imagem fica aberta para a conversa',nl:'Het beeld blijft open voor het nagesprek',sv:'Bilden är framme för samtalet',da:'Billedet bliver fremme til samtalen',no:'Bildet står framme mens dere snakker',fi:'Kuva jää näkyviin keskustelua varten'},
  },

  /* number words 1-20 ×11 — copies of the place-value conventions
     (nl één per the letter-tiles ruling; no sju/tjue per the 1951
     tellemåte; natives verify in the fan-out) */
  NUMBER_WORDS: {
    en:['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'],
    de:['eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn','zwanzig'],
    fr:['un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix','onze','douze','treize','quatorze','quinze','seize','dix-sept','dix-huit','dix-neuf','vingt'],
    it:['uno','due','tre','quattro','cinque','sei','sette','otto','nove','dieci','undici','dodici','tredici','quattordici','quindici','sedici','diciassette','diciotto','diciannove','venti'],
    es:['uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte'],
    pt:['um','dois','três','quatro','cinco','seis','sete','oito','nove','dez','onze','doze','treze','quatorze','quinze','dezesseis','dezessete','dezoito','dezenove','vinte'],
    nl:['één','twee','drie','vier','vijf','zes','zeven','acht','negen','tien','elf','twaalf','dertien','veertien','vijftien','zestien','zeventien','achttien','negentien','twintig'],
    sv:['ett','två','tre','fyra','fem','sex','sju','åtta','nio','tio','elva','tolv','tretton','fjorton','femton','sexton','sjutton','arton','nitton','tjugo'],
    da:['en','to','tre','fire','fem','seks','syv','otte','ni','ti','elleve','tolv','tretten','fjorten','femten','seksten','sytten','atten','nitten','tyve'],
    no:['en','to','tre','fire','fem','seks','sju','åtte','ni','ti','elleve','tolv','tretten','fjorten','femten','seksten','sytten','atten','nitten','tjue'],
    fi:['yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän','kymmenen','yksitoista','kaksitoista','kolmetoista','neljätoista','viisitoista','kuusitoista','seitsemäntoista','kahdeksantoista','yhdeksäntoista','kaksikymmentä']
  },

  /* the Clements/Sarama ladder — locked pedagogy ranges */
  REPR_RULES: {
    random:         { min: 1, max: 6,  free: true  },
    dice:           { min: 2, max: 10, free: true  },
    circular:       { min: 3, max: 10, free: true  },
    tenframe:       { min: 3, max: 10, free: false },
    doubletenframe: { min: 8, max: 20, free: false },
    rekenrek:       { min: 1, max: 20, free: false },
    objects:        { min: 6, max: 12, free: false }
  },
  REPR_KEYS: ['random', 'dice', 'circular', 'tenframe', 'doubletenframe', 'rekenrek', 'objects'],
  REPR_LABELS: { random:'reprRandom', dice:'reprDice', circular:'reprCircular', tenframe:'reprTenframe', doubletenframe:'reprDouble', rekenrek:'reprRekenrek', objects:'reprObjects' },

  /* verified image pools (ten-frame-image-themes.json content, inlined) */
  POOLS: {
    animals: ['cat', 'dog', 'duck', 'elephant', 'fish', 'fox', 'tiger'],
    fruits: ['apple', 'banana', 'cherry', 'lemon', 'orange', 'peach', 'pear', 'strawberry', 'watermelon']
  },
  THEME_DIRS: { animals: 'animals', fruits: 'fruits' },

  defaults: {
    flashDuration: '3', speakOnReveal: true, objectTheme: 'mixed', soundCues: true
  },
  settings: [
    { key:'flashDuration', type:'choice', labelKey:'setFlash', options:[
        { value:'2', labelKey:'setFlash2' },
        { value:'3', labelKey:'setFlash3' },
        { value:'5', labelKey:'setFlash5' }
    ]},
    { key:'speakOnReveal', type:'toggle', labelKey:'setSpeak' },
    { key:'objectTheme', type:'choice', labelKey:'setTheme', options:[
        { value:'mixed',   labelKey:'setThemeMixed'   },
        { value:'animals', labelKey:'setThemeAnimals' },
        { value:'fruits',  labelKey:'setThemeFruits'  }
    ]},
    { key:'soundCues', type:'toggle', labelKey:'setCues' }
  ],

  STORE_KEY: 'lcs:number-talk-easel:v1',
  ENT_TRUST_DAYS: 14,
  TINT_CLASSES: ['', 'nte-t1', 'nte-t2', 'nte-t3'],

  /* =========================== lifecycle =========================== */

  init: function (api) {
    this.api = api;
    this.premium = false;
    this.library = null;          /* strings JSON */
    this._strokes = [];           /* ink is RAM-only — discussion residue */
    this._penMode = 'tint';       /* tint | ink | erase */
    this._penColor = '#F2784B';
    this._stemIdx = 0;
    this._panelTab = 'strings';
    this._draft = { items: [], name: '' };
    this._flashTimer = null;
    this._holdMode = false;

    this._store = this._loadStore();
    if (!this._store.v) this._store = { v: 1, ent: null, session: null, customSets: {} };
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    var s = this._store.session;
    if (s && s.item) {
      this.session = s;
      if (this.session.phase === 'flashing') this.session.phase = 'covered'; /* never resume mid-flash */
    } else {
      this.session = this._freshSession();
    }

    /* deep links */
    var params = new URLSearchParams(location.search);
    this._deepString = params.get('string');
    var repr = params.get('repr'), n = parseInt(params.get('n'), 10);
    if (repr && this.REPR_RULES[repr] && n >= this.REPR_RULES[repr].min && n <= this.REPR_RULES[repr].max) {
      this.session = this._freshSession();
      this.session.item = this._completeItem({ repr: repr, qty: n, seed: (n * 7919 + 13) });
      this.session.todays = false;
    }
    var range = params.get('range');
    if (range === '1-5' || range === '1-10' || range === '10-20') this.session.range = range;

    this._fetchLibrary();
    this._fetchEntitlement();
  },

  _freshSession: function () {
    /* Today's quick image: deterministic UTC-day rotation (the
       BreadthGrid pattern) — the free tile is ritual-shaped */
    var d = new Date();
    var day = d.getUTCFullYear() * 10000 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate();
    var reprs = ['random', 'dice', 'circular'];
    var repr = reprs[day % 3];
    var r = this.REPR_RULES[repr];
    var qty = r.min + (day % (r.max - r.min + 1));
    return { mode: 'random', stringId: null, stringPos: 0,
      item: { repr: repr, qty: qty, seed: day },
      phase: 'covered', lastQty: qty, tints: {}, range: '1-10', todays: true };
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
    fetch('/mini-tools/number-talk-easel-strings.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        self.library = j || { strings: [] };
        if (self._deepString) {
          var st = self._stringById(self._deepString);
          if (st && (st.free || self.premium)) self._enterString(st.id, false);
          self._deepString = null;
        }
        if (self._wrap) self.render();
      })
      .catch(function () { self.library = { strings: [] }; if (self._wrap) self.render(); });
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
  _rng: function (seed) {
    /* mulberry32 — layout is a pure function of (repr,qty,arrangement,seed) */
    var a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  },
  _numberWord: function (n) {
    var w = (this.NUMBER_WORDS[this.api.lang] || this.NUMBER_WORDS.en)[n - 1];
    return w || String(n);
  },
  _cue: function (freq) { if (this.api.settings.soundCues) this.api.sound(freq); },
  _stringById: function (id) {
    var arr = (this.library && this.library.strings) || [];
    for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i];
    return null;
  },

  /* structural groups for Count-it — the ONLY place a quantity speaks */
  _groups: function (item) {
    var q = item.qty;
    if (item.groups) return item.groups.slice();
    if (item.repr === 'dice') {
      if (q <= 6) return [q];
      var a = Math.ceil(q / 2); return [a, q - a];
    }
    if (item.repr === 'tenframe') {
      var sp = item.split;
      if (sp && sp > 0 && sp < q) return [sp, q - sp];
      return [q];
    }
    if (item.repr === 'doubletenframe') {
      var f1 = Math.min(item.split || 10, 10, q);
      return q > f1 ? [f1, q - f1] : [q];
    }
    if (item.repr === 'rekenrek') {
      if (item.rows) return item.rows.filter(function (r) { return r > 0; });
      return q > 10 ? [10, q - 10] : [q];
    }
    if (item.repr === 'objects' && item.arrangement === 'pairs') {
      var g = []; for (var i = 0; i < Math.floor(q / 2); i++) g.push(2);
      if (q % 2) g.push(1);
      return g;
    }
    return [q];
  },

  /* ============================ render ============================== */

  render: function () {
    var api = this.api, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    document.body.classList.add('nte-wide');

    var wrap = api.el('div', 'nte-wrap');
    stage.appendChild(wrap);
    this._wrap = wrap;

    if (!this.library) {
      var load = api.el('div', 'nte-loading');
      load.textContent = api.t('loading');
      wrap.appendChild(load);
      return;
    }

    /* ---- prompt pill (the sentence stems) ---- */
    var stems = ['stem1', 'stem2', 'stem3', 'stem4', 'stem5'];
    var pill = api.el('button', 'nte-prompt');
    pill.type = 'button';
    pill.setAttribute('aria-label', api.t('nextStem'));
    pill.innerHTML = '<span class="nte-prompt-txt">' + api.t(stems[this._stemIdx % stems.length]) + '</span>' +
      '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 3l4 4L8 20l-5 1 1-5L17 3z"/></svg>';
    pill.addEventListener('click', function () {
      self._stemIdx = (self._stemIdx + 1) % stems.length;
      pill.querySelector('.nte-prompt-txt').textContent = api.t(stems[self._stemIdx]);
    });
    wrap.appendChild(pill);

    /* ---- mode strip: quick images | string stepper ---- */
    wrap.appendChild(this._modeStrip());

    /* ---- the easel ---- */
    var easel = api.el('div', 'nte-easel');
    var clipL = api.el('span', 'nte-clip'); clipL.style.left = '18%';
    var clipR = api.el('span', 'nte-clip'); clipR.style.left = '78%'; clipR.style.transform = 'rotate(3deg)';
    var pad = api.el('div', 'nte-pad');
    var art = api.el('div', 'nte-art');
    art.setAttribute('aria-hidden', 'true');       /* numeral-leak: art is decorative to AT */
    pad.appendChild(art);
    var ink = document.createElement('canvas');
    ink.className = 'nte-ink';
    pad.appendChild(ink);
    var shade = this._buildShade();
    pad.appendChild(shade);
    var tray = api.el('div', 'nte-tray');
    easel.append(clipL, clipR, pad, tray);
    wrap.appendChild(easel);
    this._padEl = pad; this._artEl = art; this._inkEl = ink; this._shadeEl = shade;

    /* pen tray (right rail, premium) */
    var pens = this._penTray();
    easel.appendChild(pens);

    /* reveal card slot */
    var cardSlot = api.el('div', 'nte-cardslot');
    wrap.appendChild(cardSlot);
    this._cardSlot = cardSlot;

    /* ---- control dock ---- */
    wrap.appendChild(this._dock());

    /* draw the current item behind the shade */
    this._drawItem();
    this._applyPhase(true);
    this._bindInk();
    /* tint mode: the canvas goes pointer-transparent so token taps land */
    ink.classList.toggle('tintmode', this._penMode === 'tint');
    var selfSize = this;
    requestAnimationFrame(function () { selfSize._sizeInk(); selfSize._redrawInk(); });

    if (!this._keysBound) {
      this._keysBound = true;
      document.addEventListener('keydown', function (e) {
        if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
        if (self._panelEl && self._panelEl.classList.contains('open')) return;
        if (e.key === ' ') { e.preventDefault(); self._spaceAction(); }
        else if (e.key === 's' || e.key === 'S') self.showAgain();
        else if (e.key === 'r' || e.key === 'R') self.reveal();
        else if (e.key === 'ArrowRight') self.nextItem();
        else if (e.key === 'c' || e.key === 'C') self.clearDiscussion();
      });
    }
    this._saveStore();
  },

  _modeStrip: function () {
    var api = this.api, self = this;
    var strip = api.el('div', 'nte-modestrip');
    if (this.session.mode === 'random') {
      var lbl = api.el('button', 'nte-modechip');
      lbl.type = 'button';
      lbl.textContent = this.session.todays ? api.t('todaysImage') : api.t('freeBuild');
      lbl.addEventListener('click', function () { self._openPanel(); });
      strip.appendChild(lbl);
      /* repr chips */
      var reprRow = api.el('div', 'nte-reprrow');
      for (var i = 0; i < this.REPR_KEYS.length; i++) {
        (function (key) {
          var rule = self.REPR_RULES[key];
          var locked = !rule.free && !self.premium;
          var chip = api.el('button', 'nte-chip' + (self.session.item.repr === key ? ' active' : '') + (locked ? ' locked' : ''));
          chip.type = 'button';
          chip.textContent = api.t(self.REPR_LABELS[key]);
          if (locked) chip.innerHTML += ' <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
          chip.addEventListener('click', function () {
            if (locked) { self._inlineGate(strip, 'gateReprs'); return; }
            self._newRandom(key);
          });
          reprRow.appendChild(chip);
        }(this.REPR_KEYS[i]));
      }
      strip.appendChild(reprRow);
      /* range chips */
      var ranges = [['1-5', 'range15'], ['1-10', 'range110'], ['10-20', 'range1020']];
      var rangeRow = api.el('div', 'nte-rangerow');
      for (var r = 0; r < ranges.length; r++) {
        (function (val, key) {
          var chip = api.el('button', 'nte-chip small' + (self.session.range === val ? ' active' : ''));
          chip.type = 'button';
          chip.textContent = api.t(key);
          chip.addEventListener('click', function () {
            self.session.range = val;
            self._newRandom(self.session.item.repr);
          });
          rangeRow.appendChild(chip);
        }(ranges[r][0], ranges[r][1]));
      }
      strip.appendChild(rangeRow);
    } else {
      /* string stepper */
      var st = this.session.mode === 'string' ? this._stringById(this.session.stringId)
        : (this._store.customSets[this.session.stringId] || null);
      var items = st ? st.items : [];
      var name = st ? (st.name && st.name[api.lang] ? st.name[api.lang] : (st.name && st.name.en) || st.name || '') : '';
      var stepper = api.el('div', 'nte-stepper');
      var back = api.el('button', 'nte-stepnav');
      back.type = 'button'; back.textContent = '‹';
      back.setAttribute('aria-label', api.t('backToLibrary'));
      back.addEventListener('click', function () { self._openPanel(); });
      var lblName = api.el('span', 'nte-stepname');
      lblName.textContent = name;
      var dots = api.el('span', 'nte-stepdots');
      for (var d = 0; d < items.length; d++) {
        (function (d) {
          var dot = api.el('button', 'nte-stepdot' + (d === self.session.stringPos ? ' active' : '') + (d < self.session.stringPos ? ' done' : ''));
          dot.type = 'button';
          dot.setAttribute('aria-label', String(d + 1) + ' / ' + items.length);
          dot.addEventListener('click', function () { self._jumpTo(d); });
          dots.appendChild(dot);
        }(d));
      }
      var counter = api.el('span', 'nte-stepcount');
      counter.textContent = (this.session.stringPos + 1) + ' / ' + items.length;
      stepper.append(back, lblName, dots, counter);
      strip.appendChild(stepper);
      /* teaching note */
      var note = st && st.note ? (st.note[api.lang] || st.note.en) : null;
      if (note) {
        var noteEl = api.el('div', 'nte-note');
        noteEl.textContent = note;
        strip.appendChild(noteEl);
      }
    }
    return strip;
  },

  _buildShade: function () {
    var api = this.api;
    var shade = api.el('div', 'nte-shade');
    shade.setAttribute('aria-hidden', 'true');
    var roll = api.el('div', 'nte-roll');
    var cloth = api.el('div', 'nte-cloth');
    var hem = api.el('div', 'nte-hem');
    var scallops = '<svg viewBox="0 0 700 30" preserveAspectRatio="none" class="nte-scallops">';
    for (var i = 0; i < 7; i++) {
      scallops += '<path d="M' + (i * 100) + ',0 a50,26 0 0 0 100,0 z" fill="#146B5E"/>';
    }
    scallops += '</svg>';
    hem.innerHTML = '<div class="nte-stitch"></div>' + scallops +
      '<span class="nte-ring" aria-hidden="true"><svg viewBox="0 0 40 46" width="34" height="40"><rect x="16" y="0" width="8" height="14" rx="3" fill="#146B5E"/><circle cx="20" cy="28" r="13" fill="none" stroke="#146B5E" stroke-width="6"/></svg></span>';
    cloth.appendChild(hem);
    shade.append(roll, cloth);
    return shade;
  },

  _penTray: function () {
    var api = this.api, self = this;
    var tray = api.el('div', 'nte-pens');
    var locked = !this.premium;
    var mk = function (mode, colorOrIcon, label) {
      var b = api.el('button', 'nte-pen' + (self._penMode === mode && (mode !== 'ink' || self._penColor === colorOrIcon) ? ' active' : '') + (locked ? ' locked' : ''));
      b.type = 'button';
      b.setAttribute('aria-label', label);
      if (mode === 'ink') b.style.background = colorOrIcon;
      else b.innerHTML = colorOrIcon;
      b.addEventListener('click', function () {
        if (locked) { self._inlineGate(self._wrap.querySelector('.nte-easel'), 'gateInk'); return; }
        self._penMode = mode;
        if (mode === 'ink') self._penColor = colorOrIcon;
        self.render();
      });
      return b;
    };
    tray.appendChild(mk('tint',
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="9" r="5"/><circle cx="16" cy="15" r="5"/></svg>',
      api.t('penTint')));
    tray.appendChild(mk('ink', '#F2784B', api.t('penInk') + ' 1'));
    tray.appendChild(mk('ink', '#146B5E', api.t('penInk') + ' 2'));
    tray.appendChild(mk('ink', '#E8A33D', api.t('penInk') + ' 3'));
    tray.appendChild(mk('erase',
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20l-4-4 10-10 6 6-8 8H7z"/><path d="M9 8l6 6"/></svg>',
      api.t('penErase')));
    var clr = api.el('button', 'nte-clearbtn' + (locked ? ' locked' : ''));
    clr.type = 'button';
    clr.textContent = api.t('clear');
    clr.addEventListener('click', function () {
      if (locked) { self._inlineGate(self._wrap.querySelector('.nte-easel'), 'gateInk'); return; }
      self.clearDiscussion();
    });
    tray.appendChild(clr);
    return tray;
  },

  _dock: function () {
    var api = this.api, self = this;
    var dock = api.el('div', 'nte-dock');
    var phase = this.session.phase;

    if (phase !== 'revealed') {
      /* Show (morphs to Hide-now while flashing) with the draining arc */
      var show = api.el('button', 'nte-show');
      show.type = 'button';
      show.innerHTML = '<svg class="nte-arc" viewBox="0 0 100 100" aria-hidden="true"><circle class="nte-arc-track" cx="50" cy="50" r="46" fill="none"/><circle class="nte-arc-fill" cx="50" cy="50" r="46" fill="none"/></svg>' +
        '<span class="nte-show-label">' + api.t('show') + '</span>';
      this._bindShowGesture(show);
      dock.appendChild(show);
      this._showBtn = show;

      var again = api.el('button', 'nte-ctrlchip');
      again.type = 'button';
      again.textContent = api.t('showAgain');
      again.addEventListener('click', function () { self.showAgain(); });
      dock.appendChild(again);

      var reveal = api.el('button', 'nte-ctrlchip teal');
      reveal.type = 'button';
      reveal.textContent = api.t('reveal');
      reveal.addEventListener('click', function () { self.reveal(); });
      dock.appendChild(reveal);
    } else {
      var count = api.el('button', 'nte-show counted');
      count.type = 'button';
      count.innerHTML = '<span class="nte-show-label">' + api.t('countIt') + '</span>';
      count.addEventListener('click', function () { self.countIt(); });
      dock.appendChild(count);

      var next = api.el('button', 'nte-ctrlchip teal');
      next.type = 'button';
      next.textContent = api.t('nextImage');
      next.addEventListener('click', function () { self.nextItem(); });
      dock.appendChild(next);
    }
    return dock;
  },

  /* Show gesture: tap = timed flash; hold ≥350ms = open while pressed */
  _bindShowGesture: function (btn) {
    var self = this;
    var downAt = 0, holding = false, pid = null;
    btn.addEventListener('pointerdown', function (e) {
      if (self.session.phase === 'flashing' && !self._holdMode) { return; } /* handled by click→hide-now */
      if (self.session.phase !== 'covered') return;
      downAt = Date.now(); pid = e.pointerId; holding = false;
      try { btn.setPointerCapture(e.pointerId); } catch (_) {}
      self._openShade();
      self._setPhase('flashing');
      self._holdMode = false;
      /* decide at 350ms: still down → hold mode (no timer) */
      self._decideTimer = setTimeout(function () {
        if (pid !== null) { holding = true; self._holdMode = true; self._setArc(0); }
      }, 350);
      /* provisional timed flash (cancelled if hold engages) */
      self._startFlashTimer();
    });
    var up = function (e) {
      if (pid === null || e.pointerId !== pid) return;
      pid = null;
      clearTimeout(self._decideTimer);
      if (holding) {
        /* hold released → cover now */
        self._holdMode = false;
        self._coverNow();
      }
      /* tap: the timed flash continues on its own */
    };
    btn.addEventListener('pointerup', up);
    btn.addEventListener('pointercancel', up);
    btn.addEventListener('click', function () {
      /* mid-flash tap (timed mode) = Hide now */
      if (self.session.phase === 'flashing' && !self._holdMode && Date.now() - downAt > 400) {
        self._coverNow();
      }
    });
  },

  _flashMs: function () { return (parseInt(this.api.settings.flashDuration, 10) || 3) * 1000; },

  _startFlashTimer: function () {
    var self = this;
    clearTimeout(this._flashTimer);
    var ms = this._flashMs();
    this._setArc(ms);
    this._flashTimer = setTimeout(function () {
      if (self._holdMode) return;      /* hold engaged — no auto-cover */
      self._coverNow();
    }, ms);
  },

  _setArc: function (ms) {
    var arc = this._showBtn && this._showBtn.querySelector('.nte-arc-fill');
    if (!arc) return;
    var C = 2 * Math.PI * 46;
    arc.style.transition = 'none';
    arc.style.strokeDasharray = C;
    arc.style.strokeDashoffset = ms ? '0' : C;
    if (!ms) return;
    if (this._reducedMotion()) {
      /* stepped 3-segment drain */
      var self = this, step = ms / 3;
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
    this._shadeEl.classList.add('up');
    this._cue(760);
    this.api.announce(this.api.t('lookAria'));
    var lbl = this._showBtn && this._showBtn.querySelector('.nte-show-label');
    if (lbl) lbl.textContent = this.api.t('hideNow');
  },
  _coverNow: function () {
    clearTimeout(this._flashTimer);
    this._holdMode = false;
    this._shadeEl.classList.remove('up');
    this._setPhase('covered');
    this._setArc(0);
    this._cue(380);
    this.api.announce(this.api.t('coveredAria'));
    var lbl = this._showBtn && this._showBtn.querySelector('.nte-show-label');
    if (lbl) lbl.textContent = this.api.t('show');
  },

  _setPhase: function (p) {
    this.session.phase = p;
    if (p !== 'flashing') this._saveStore();   /* flashing is never persisted */
    if (this._padEl) this._padEl.classList.toggle('revealed', p === 'revealed');
  },

  showAgain: function () {
    if (this.session.phase !== 'covered') return;
    /* SAME item, SAME seed — a pixel-identical re-flash */
    this._setPhase('flashing');
    this._openShade();
    this._startFlashTimer();
    this.api.track('showAgain', {});
  },

  reveal: function () {
    if (this.session.phase === 'revealed') return;
    clearTimeout(this._flashTimer);
    this._holdMode = false;
    this._shadeEl.classList.add('up');
    this._setPhase('revealed');
    this._cue(560);
    this.api.announce(this.api.t('revealedAria'));
    this.render();       /* dock swaps to Count-it + Next; shade re-parks open */
    this._shadeEl.classList.add('up');
  },

  nextItem: function () {
    var api = this.api;
    this._strokes = [];
    this.session.tints = {};
    this._clearCard();
    if (this.session.mode === 'random') {
      this._newRandom(this.session.item.repr);
      return;
    }
    var st = this.session.mode === 'string' ? this._stringById(this.session.stringId) : this._store.customSets[this.session.stringId];
    var items = st ? st.items : [];
    if (this.session.stringPos + 1 >= items.length) {
      this._finishString();
      return;
    }
    this.session.stringPos += 1;
    this.session.item = this._materialize(items[this.session.stringPos]);
    this._setPhase('covered');
    this._saveStore();
    this.render();
  },

  _jumpTo: function (pos) {
    var st = this.session.mode === 'string' ? this._stringById(this.session.stringId) : this._store.customSets[this.session.stringId];
    if (!st || !st.items[pos]) return;
    this._strokes = [];
    this.session.tints = {};
    this.session.stringPos = pos;
    this.session.item = this._materialize(st.items[pos]);
    this._setPhase('covered');
    this._saveStore();
    this.render();
  },

  _finishString: function () {
    var api = this.api, self = this;
    var card = api.el('div', 'nte-done');
    var msg = api.el('p');
    msg.textContent = api.t('stringDone');
    var restart = api.el('button', 'nte-ctrlchip teal');
    restart.type = 'button';
    restart.textContent = api.t('restart');
    restart.addEventListener('click', function () { self._jumpTo(0); });
    var lib = api.el('button', 'nte-ctrlchip');
    lib.type = 'button';
    lib.textContent = api.t('backToLibrary');
    lib.addEventListener('click', function () { self._openPanel(); });
    card.append(msg, restart, lib);
    this._cardSlot.innerHTML = '';
    this._cardSlot.appendChild(card);
  },

  _materialize: function (raw) {
    return { repr: raw.repr, qty: raw.qty, seed: raw.seed,
      split: raw.split, rows: raw.rows, groups: raw.groups,
      arrangement: raw.arrangement, theme: raw.theme, noun: raw.noun };
  },

  /* fill the representation-specific fields every generated item needs
     (used by random generation AND the ?repr= deep link — the deep link
     without this shipped undefined@2x.webp object images) */
  _completeItem: function (item) {
    if (item.repr === 'tenframe' && item.qty > 5 && item.split === undefined) item.split = 5;
    if (item.repr === 'doubletenframe' && item.split === undefined) item.split = 10;
    if (item.repr === 'objects' && !item.noun) {
      var theme = this.api.settings.objectTheme;
      if (theme === 'mixed' || !this.POOLS[theme]) {
        var rng = this._rng(item.seed);
        theme = rng() < 0.5 ? 'animals' : 'fruits';
      }
      var pool = this.POOLS[theme];
      var rng2 = this._rng(item.seed + 1);
      item.theme = theme;
      item.noun = pool[Math.floor(rng2() * pool.length)];
      if (item.qty > 10) item.arrangement = 'pairs';
    }
    return item;
  },

  _newRandom: function (repr) {
    var r = this.REPR_RULES[repr];
    var range = this.session.range === '1-5' ? [1, 5] : this.session.range === '10-20' ? [10, 20] : [1, 10];
    var min = Math.max(r.min, range[0]), max = Math.min(r.max, range[1]);
    if (min > max) { min = r.min; max = r.max; }
    var qty = min + Math.floor(Math.random() * (max - min + 1));
    if (qty === this.session.lastQty && max > min) {
      qty = min + Math.floor(Math.random() * (max - min + 1));   /* one re-roll */
    }
    var item = this._completeItem({ repr: repr, qty: qty, seed: Math.floor(Math.random() * 1e9) });
    this.session.item = item;
    this.session.lastQty = qty;
    this.session.todays = false;
    this.session.tints = {};
    this._strokes = [];
    this._setPhase('covered');
    this._saveStore();
    this.render();
  },

  _enterString: function (id, custom) {
    this.session.mode = custom ? 'custom' : 'string';
    this.session.stringId = id;
    this.session.stringPos = 0;
    var st = custom ? this._store.customSets[id] : this._stringById(id);
    this.session.item = this._materialize(st.items[0]);
    this.session.tints = {};
    this._strokes = [];
    this._setPhase('covered');
    this._saveStore();
    if (this._panelEl) this._closePanel();
    this.render();
  },

  /* shell reset = re-cover + clear discussion; KEEPS string progress */
  reset: function () {
    clearTimeout(this._flashTimer);
    this._holdMode = false;
    this._strokes = [];
    this.session.tints = {};
    if (this.session.phase !== 'covered') this.session.phase = 'covered';
    this._clearCard();
    if (this._panelEl) this._closePanel();
    this._saveStore();
    this.render();
  },

  clearDiscussion: function () {
    this._strokes = [];
    this.session.tints = {};
    this._redrawInk();
    this._applyTints();
    this._saveStore();
  },

  onSettings: function () { this._saveStore(); },
  paint: function () {},

  /* ===================== drawing the item ========================== */

  _drawItem: function () {
    var item = this.session.item;
    var art = this._artEl;
    art.innerHTML = '';
    art.className = 'nte-art nte-r-' + item.repr;
    if (item.repr === 'random' || item.repr === 'circular') this._drawDots(art, item);
    else if (item.repr === 'dice') this._drawDice(art, item);
    else if (item.repr === 'tenframe') this._drawFrame(art, item, 1);
    else if (item.repr === 'doubletenframe') this._drawFrame(art, item, 2);
    else if (item.repr === 'rekenrek') this._drawRekenrek(art, item);
    else if (item.repr === 'objects') this._drawObjects(art, item);
    this._applyTints();
    this._sizeInk();
    this._redrawInk();
  },

  /* noTint: frames/rekenrek keep data-ti for the Count-it pulse but
     refuse tap-tint — they already encode structure (5-rows, splits) */
  _dotEl: function (idx, sizePx, noTint) {
    var d = this.api.el('button', 'nte-dot');
    d.type = 'button';
    d.setAttribute('data-ti', String(idx));
    d.setAttribute('aria-hidden', 'true');   /* numeral-leak: tokens invisible to AT */
    d.tabIndex = -1;
    if (sizePx) { d.style.width = sizePx + 'px'; d.style.height = sizePx + 'px'; }
    if (!noTint) this._bindTint(d);
    return d;
  },
  _bindTint: function (el) {
    var self = this;
    el.addEventListener('click', function () {
      if (self.session.phase !== 'revealed') return;
      if (self._penMode !== 'tint') return;
      if (!self.premium) { self._inlineGate(self._wrap.querySelector('.nte-easel'), 'gateInk'); return; }
      var idx = el.getAttribute('data-ti');
      var cur = self.session.tints[idx] || 0;
      var next = (cur + 1) % 4;
      if (next === 0) delete self.session.tints[idx]; else self.session.tints[idx] = next;
      self._applyTints();
      el.classList.remove('nte-pop'); void el.offsetWidth; el.classList.add('nte-pop');
      self._cue(523 + next * 60);
      self._saveStore();
    });
  },
  _applyTints: function () {
    var self = this;
    var tokens = this._artEl.querySelectorAll('[data-ti]');
    tokens.forEach(function (el) {
      el.classList.remove('nte-t1', 'nte-t2', 'nte-t3');
      var c = self.session.tints[el.getAttribute('data-ti')];
      if (c) el.classList.add('nte-t' + c);
    });
  },

  _drawDots: function (art, item) {
    var rng = this._rng(item.seed);
    var q = item.qty;
    /* ⭐ AN INLINE-STYLE SIZE, so a CSS tier cannot reach it: `_dotEl` writes
       `style.width = sizePx + 'px'` and an inline style beats any rule. My
       first attempt at this tool ramped `.nte-dot` in CSS and was DEAD CODE —
       the gate reported the dot at 64px on both a 1366 and a 2560 board and
       was right. The scale comes from CSS so the tiers can key it on width
       AND height; the two sizes keep their ratio (a 7+ dot arrangement stays
       proportionally smaller, which is what keeps it subitisable). */
    var _ds = parseFloat(getComputedStyle(document.body).getPropertyValue('--nte-dotscale'));
    if (!(_ds > 0)) _ds = 1;
    var size = Math.round((q <= 6 ? 64 : 52) * _ds);
    var positions = [];
    if (item.repr === 'circular') {
      for (var i = 0; i < q; i++) {
        var ang = (-90 + i * 360 / q) * Math.PI / 180;
        positions.push([50 + 35 * Math.cos(ang), 50 + 35 * Math.sin(ang)]);
      }
    } else {
      /* jittered grid (the wondering-jar recipe) — min gap by construction */
      var cols = Math.ceil(Math.sqrt(q)), rows = Math.ceil(q / cols);
      var cw = 100 / cols, ch = 100 / rows;
      for (var j = 0; j < q; j++) {
        var cx = (j % cols) * cw + cw / 2 + (rng() - 0.5) * cw * 0.34;
        var cy = Math.floor(j / cols) * ch + ch / 2 + (rng() - 0.5) * ch * 0.34;
        positions.push([cx, cy]);
      }
    }
    for (var k = 0; k < positions.length; k++) {
      var d = this._dotEl(k, size);
      d.style.left = positions[k][0] + '%';
      d.style.top = positions[k][1] + '%';
      art.appendChild(d);
    }
  },

  /* classic pip geometry on an invisible 3×3; 7-10 = two dice faces */
  PIPS: { 1:[4], 2:[0,8], 3:[0,4,8], 4:[0,2,6,8], 5:[0,2,4,6,8], 6:[0,2,3,5,6,8] },
  _drawDice: function (art, item) {
    var q = item.qty;
    var faces = q <= 6 ? [q] : [Math.ceil(q / 2), Math.floor(q / 2)];
    var idx = 0;
    for (var f = 0; f < faces.length; f++) {
      var die = this.api.el('div', 'nte-die');
      die.setAttribute('aria-hidden', 'true');
      var cells = this.PIPS[faces[f]] || [];
      for (var c = 0; c < cells.length; c++) {
        var pos = cells[c];
        var d = this._dotEl(idx++, 0);
        d.classList.add('nte-pip');
        d.style.left = ((pos % 3) * 33.3 + 16.6) + '%';
        d.style.top = (Math.floor(pos / 3) * 33.3 + 16.6) + '%';
        die.appendChild(d);
      }
      art.appendChild(die);
    }
  },

  _drawFrame: function (art, item, frames) {
    var q = item.qty;
    var f1 = frames === 2 ? Math.min(item.split || 10, 10, q) : Math.min(q, 10);
    var fills = frames === 2 ? [f1, q - f1] : [q];
    /* single-frame authored split → two-color within one frame */
    var split1 = frames === 1 ? (item.split || 0) : 0;
    var idx = 0;
    for (var f = 0; f < frames; f++) {
      var frame = this.api.el('div', 'nte-tf' + (frames === 2 ? ' double' : ''));
      frame.setAttribute('aria-hidden', 'true');
      for (var c = 0; c < 10; c++) {
        var cell = this.api.el('span', 'nte-tfcell');
        if (c < fills[f]) {
          var d = this._dotEl(idx, 0, true);
          d.classList.add('nte-framedot');
          if (frames === 1 && split1 && idx >= split1) d.classList.add('nte-splitB');
          if (frames === 2 && f === 1) d.classList.add('nte-splitB');
          cell.appendChild(d);
          idx++;
        }
        frame.appendChild(cell);
      }
      art.appendChild(frame);
    }
  },

  _drawRekenrek: function (art, item) {
    var q = item.qty;
    var rows = item.rows || (q > 10 ? [10, q - 10] : [q, 0]);
    var rack = this.api.el('div', 'nte-rek');
    rack.setAttribute('aria-hidden', 'true');
    var idx = 0;
    for (var r = 0; r < 2; r++) {
      var rod = this.api.el('div', 'nte-rod');
      var pushed = rows[r] || 0;
      for (var b = 0; b < 10; b++) {
        var bead = this.api.el('span', 'nte-bead' + (b < 5 ? ' five' : '') + (b < pushed ? ' pushed' : ' parked'));
        if (b < pushed) {
          bead.setAttribute('data-ti', String(idx++));
        }
        rod.appendChild(bead);
      }
      rack.appendChild(rod);
    }
    art.appendChild(rack);
  },

  _drawObjects: function (art, item) {
    var rng = this._rng(item.seed);
    var q = item.qty;
    var dir = this.THEME_DIRS[item.theme] || 'animals';
    var src = '/image-library-webp/themes/' + encodeURIComponent(dir) + '/' + encodeURIComponent(item.noun) + '@2x.webp';
    var positions = [];
    if (item.arrangement === 'pairs') {
      var pairs = Math.ceil(q / 2);
      var pcols = Math.ceil(Math.sqrt(pairs)), prows = Math.ceil(pairs / pcols);
      var pw = 100 / pcols, ph = 100 / prows;
      for (var p = 0; p < pairs; p++) {
        var px = (p % pcols) * pw + pw / 2 + (rng() - 0.5) * pw * 0.2;
        var py = Math.floor(p / pcols) * ph + ph / 2 + (rng() - 0.5) * ph * 0.2;
        positions.push([px - 6, py]);
        if (positions.length < q + 1 && (p * 2 + 1) < q) positions.push([px + 6, py]);
      }
      positions = positions.slice(0, q);
    } else if (item.arrangement === 'groups' && item.groups) {
      var gN = item.groups.length;
      for (var g = 0; g < gN; g++) {
        var gx = (g % Math.ceil(gN / 2)) * (100 / Math.ceil(gN / 2)) + (100 / Math.ceil(gN / 2)) / 2;
        var gy = gN > 2 ? (g < Math.ceil(gN / 2) ? 30 : 72) : 50;
        var n = item.groups[g];
        for (var m = 0; m < n; m++) {
          var ang2 = (m * 360 / n) * Math.PI / 180;
          var rad = n > 1 ? 11 : 0;
          positions.push([gx + rad * Math.cos(ang2), gy + rad * Math.sin(ang2) * 0.9]);
        }
      }
    } else {
      var cols = Math.ceil(Math.sqrt(q)), rows2 = Math.ceil(q / cols);
      var cw2 = 100 / cols, ch2 = 100 / rows2;
      for (var j = 0; j < q; j++) {
        positions.push([
          (j % cols) * cw2 + cw2 / 2 + (rng() - 0.5) * cw2 * 0.3,
          Math.floor(j / cols) * ch2 + ch2 / 2 + (rng() - 0.5) * ch2 * 0.3
        ]);
      }
    }
    for (var k = 0; k < positions.length; k++) {
      var holder = this.api.el('button', 'nte-obj');
      holder.type = 'button';
      holder.tabIndex = -1;
      holder.setAttribute('data-ti', String(k));
      holder.setAttribute('aria-hidden', 'true');
      holder.style.left = positions[k][0] + '%';
      holder.style.top = positions[k][1] + '%';
      holder.style.transform = 'translate(-50%,-50%) rotate(' + ((rng() - 0.5) * 12) + 'deg)';
      var img = document.createElement('img');
      img.src = src; img.alt = ''; img.draggable = false; img.loading = 'lazy';
      holder.appendChild(img);
      this._bindTint(holder);
      art.appendChild(holder);
    }
  },

  /* ===================== phase visuals ============================= */

  _applyPhase: function (initial) {
    var p = this.session.phase;
    if (p === 'revealed') this._shadeEl.classList.add('up');
    else this._shadeEl.classList.remove('up');
    if (this._padEl) this._padEl.classList.toggle('revealed', p === 'revealed');
    if (initial && p === 'covered') this.api.announce(this.api.t('coveredAria'));
  },

  _spaceAction: function () {
    if (this.session.phase === 'covered') {
      /* keyboard: timed flash */
      this._setPhase('flashing');
      this._openShade();
      this._startFlashTimer();
    } else if (this.session.phase === 'flashing') {
      this._coverNow();
    }
  },

  /* ======================= Count-it ================================ */

  countIt: function () {
    var api = this.api, self = this;
    if (this.session.phase !== 'revealed') return;
    var item = this.session.item;
    var groups = this._groups(item);
    var speak = api.settings.speakOnReveal;
    var tokens = Array.prototype.slice.call(this._artEl.querySelectorAll('[data-ti]'));

    /* highlight group by group; speak each group's number word */
    var offset = 0;
    var stepMs = this._reducedMotion() ? 350 : 700;
    groups.forEach(function (g, gi) {
      (function (start, len, word, delay) {
        setTimeout(function () {
          for (var i = start; i < start + len && i < tokens.length; i++) {
            tokens[i].classList.remove('nte-countpulse'); void tokens[i].offsetWidth;
            tokens[i].classList.add('nte-countpulse');
          }
          if (speak && groups.length > 1) LCSAudio.speak({ type: 'number', text: word, lang: api.lang, rate: 0.9 });
          self._cue(523 + gi * 80);
        }, delay);
      }(offset, g, self._numberWord(g), gi * stepMs));
      offset += g;
    });

    var total = item.qty;
    var totalDelay = groups.length * stepMs + 200;
    setTimeout(function () {
      var word = self._numberWord(total);
      if (speak) LCSAudio.speak({ type: 'number', text: word, lang: api.lang, rate: 0.9 });
      self._cue(784);
      api.announce(String(total) + ' — ' + word);
      /* the reveal card rises from behind the chalk tray */
      var card = api.el('div', 'nte-card');
      card.innerHTML = '<span class="nte-card-num">' + total + '</span>' +
        '<span class="nte-card-dash" aria-hidden="true">—</span>' +
        '<span class="nte-card-word">' + word + '</span>' +
        '<svg class="nte-card-spk" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg>';
      card.addEventListener('click', function () {
        LCSAudio.speak({ type: 'number', text: word, lang: api.lang, rate: 0.9 });
      });
      self._cardSlot.innerHTML = '';
      self._cardSlot.appendChild(card);
    }, totalDelay);
    api.track('countIt', { qty: total, groups: groups.join('+') });
  },

  _clearCard: function () { if (this._cardSlot) this._cardSlot.innerHTML = ''; },

  /* ========================= ink =================================== */

  _sizeInk: function () {
    var pad = this._padEl, ink = this._inkEl;
    if (!pad || !ink) return;
    var r = pad.getBoundingClientRect();
    if (r.width < 10) return;
    ink.width = Math.round(r.width);
    ink.height = Math.round(r.height);
  },

  _bindInk: function () {
    var self = this, ink = this._inkEl;
    var drawing = null;
    ink.addEventListener('pointerdown', function (e) {
      if (self.session.phase !== 'revealed') return;
      if (self._penMode === 'tint') return;      /* canvas is pointer-transparent for tint */
      if (!self.premium) { self._inlineGate(self._wrap.querySelector('.nte-easel'), 'gateInk'); return; }
      var r = ink.getBoundingClientRect();
      drawing = { pts: [[e.clientX - r.left, e.clientY - r.top]], color: self._penColor, erase: self._penMode === 'erase' };
      try { ink.setPointerCapture(e.pointerId); } catch (_) {}
    });
    ink.addEventListener('pointermove', function (e) {
      if (!drawing) return;
      var r = ink.getBoundingClientRect();
      drawing.pts.push([e.clientX - r.left, e.clientY - r.top]);
      self._strokes.push(null);   /* placeholder to trigger live draw below */
      self._strokes.pop();
      self._drawStroke(drawing, true);
    });
    var up = function () {
      if (!drawing) return;
      if (drawing.pts.length > 1) self._strokes.push(drawing);
      drawing = null;
      self._redrawInk();
    };
    ink.addEventListener('pointerup', up);
    ink.addEventListener('pointercancel', up);
  },

  _drawStroke: function (s, live) {
    var ctx = this._inkEl.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (s.erase) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 26;
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 7;
      ctx.globalAlpha = 0.92;
      ctx.strokeStyle = s.color;
    }
    ctx.beginPath();
    var pts = live ? s.pts.slice(-2) : s.pts;
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  },

  _redrawInk: function () {
    var ink = this._inkEl;
    if (!ink) return;
    var ctx = ink.getContext('2d');
    ctx.clearRect(0, 0, ink.width, ink.height);
    for (var i = 0; i < this._strokes.length; i++) this._drawStroke(this._strokes[i], false);
  },

  /* ==================== gates + panel ============================== */

  _inlineGate: function (host, key) {
    var api = this.api;
    var old = host.querySelector('.nte-gate');
    if (old) old.remove();
    var g = api.el('div', 'nte-gate');
    var txt = api.el('span');
    txt.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-number-talk-easel';
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(txt, a);
    host.appendChild(g);
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
    var scrim = api.el('div', 'nte-scrim');
    scrim.addEventListener('click', function () { self._closePanel(); });
    var panel = api.el('div', 'nte-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', api.t('stringsTitle'));
    document.querySelector('.lcs-app').append(scrim, panel);
    this._panelEl = panel;
    this._scrimEl = scrim;
  },

  _renderPanel: function () {
    var api = this.api, self = this;
    var panel = this._panelEl;
    panel.innerHTML = '';

    var head = api.el('div', 'nte-panel-head');
    var tabs = api.el('div', 'nte-tabs');
    var mkTab = function (id, label) {
      var t = api.el('button', 'nte-tab' + (self._panelTab === id ? ' active' : ''));
      t.type = 'button';
      t.textContent = label;
      t.addEventListener('click', function () { self._panelTab = id; self._renderPanel(); });
      return t;
    };
    tabs.append(mkTab('strings', api.t('stringsTitle')), mkTab('sets', api.t('mySets')));
    var x = api.el('button', 'nte-panel-close');
    x.type = 'button';
    x.setAttribute('aria-label', api.t('clear'));
    x.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    x.addEventListener('click', function () { self._closePanel(); });
    head.append(tabs, x);
    panel.appendChild(head);

    var body = api.el('div', 'nte-panel-body');
    panel.appendChild(body);

    if (this._panelTab === 'strings') this._renderStringsTab(body);
    else this._renderSetsTab(body);

    /* free-build escape */
    var foot = api.el('div', 'nte-panel-foot');
    var free = api.el('button', 'nte-linkbtn');
    free.type = 'button';
    free.textContent = api.t('freeBuild');
    free.addEventListener('click', function () {
      self.session = self._freshSession();
      self.session.todays = false;
      self._strokes = [];
      self._saveStore();
      self._closePanel();
      self.render();
    });
    foot.appendChild(free);
    panel.appendChild(foot);
  },

  REPR_GLYPHS: { random:'·•·', dice:'⚄', circular:'◌', tenframe:'▦', doubletenframe:'▦▦', rekenrek:'━●', objects:'🖼' },

  _renderStringsTab: function (body) {
    var api = this.api, self = this;
    var bands = [['k', 'bandK'], ['g1', 'bandG1'], ['g2', 'bandG2']];
    var all = (this.library && this.library.strings) || [];
    for (var b = 0; b < bands.length; b++) {
      var bandId = bands[b][0];
      var group = all.filter(function (s) { return s.band === bandId; });
      if (!group.length) continue;
      var h = api.el('div', 'nte-bandhead');
      h.textContent = api.t(bands[b][1]);
      body.appendChild(h);
      group.forEach(function (st) {
        var unlocked = st.free || self.premium;
        var row = api.el('button', 'nte-strrow' + (self.session.stringId === st.id ? ' active' : '') + (unlocked ? '' : ' locked'));
        row.type = 'button';
        var name = api.el('span', 'nte-strname');
        name.textContent = (st.name && (st.name[api.lang] || st.name.en)) || st.id;
        var meta = api.el('span', 'nte-strmeta');
        meta.textContent = self.fmt('imagesCount', { n: st.items.length });
        var glyphs = api.el('span', 'nte-strglyphs');
        var seen = {};
        st.items.forEach(function (it) {
          if (seen[it.repr]) return;
          seen[it.repr] = 1;
          glyphs.innerHTML += '<span class="nte-glyph">' + (self.REPR_GLYPHS[it.repr] || '·') + '</span>';
        });
        row.append(name, glyphs, meta);
        if (st.free) {
          var badge = api.el('span', 'nte-freebadge');
          badge.textContent = api.t('freeBadge');
          row.appendChild(badge);
        } else if (!unlocked) {
          row.innerHTML += '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
        }
        row.addEventListener('click', function () {
          if (!unlocked) {
            var old = body.querySelector('.nte-gate');
            if (old) old.remove();
            var g = self._gateEl('gateStrings');
            row.insertAdjacentElement('afterend', g);
            return;
          }
          self._enterString(st.id, false);
        });
        body.appendChild(row);
      });
    }
  },

  _gateEl: function (key) {
    var api = this.api;
    var g = api.el('div', 'nte-gate');
    var txt = api.el('span');
    txt.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-number-talk-easel';
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(txt, a);
    return g;
  },

  _renderSetsTab: function (body) {
    var api = this.api, self = this;

    /* saved sets */
    var sets = this._store.customSets || {};
    Object.keys(sets).forEach(function (id) {
      var st = sets[id];
      var row = api.el('div', 'nte-setrow');
      var play = api.el('button', 'nte-strrow' + (self.session.stringId === id ? ' active' : ''));
      play.type = 'button';
      var nm = api.el('span', 'nte-strname');
      nm.textContent = st.name;
      var meta = api.el('span', 'nte-strmeta');
      meta.textContent = self.fmt('imagesCount', { n: st.items.length });
      play.append(nm, meta);
      play.addEventListener('click', function () {
        if (!self.premium) { row.appendChild(self._gateEl('gateSave')); return; }
        self._enterString(id, true);
      });
      var del = api.el('button', 'nte-linkbtn danger');
      del.type = 'button';
      del.textContent = api.t('deleteSet');
      del.addEventListener('click', function () {
        delete self._store.customSets[id];
        self._saveStore();
        self._renderPanel();
      });
      row.append(play, del);
      body.appendChild(row);
    });

    /* composer */
    var comp = api.el('div', 'nte-composer');
    var reprSel = api.el('div', 'nte-reprrow');
    if (!this._draft.repr) this._draft.repr = 'random';
    for (var i = 0; i < this.REPR_KEYS.length; i++) {
      (function (key) {
        var chip = api.el('button', 'nte-chip small' + (self._draft.repr === key ? ' active' : ''));
        chip.type = 'button';
        chip.textContent = api.t(self.REPR_LABELS[key]);
        chip.addEventListener('click', function () {
          self._draft.repr = key;
          var r = self.REPR_RULES[key];
          if (self._draft.qty < r.min || self._draft.qty > r.max) self._draft.qty = r.min;
          self._renderPanel();
        });
        reprSel.appendChild(chip);
      }(this.REPR_KEYS[i]));
    }
    comp.appendChild(reprSel);
    var rule = this.REPR_RULES[this._draft.repr];
    if (!this._draft.qty || this._draft.qty < rule.min || this._draft.qty > rule.max) this._draft.qty = rule.min;
    var qtyRow = api.el('div', 'nte-qtyrow');
    var minus = api.el('button', 'nte-stepbtn'); minus.type = 'button'; minus.textContent = '−';
    var qv = api.el('span', 'nte-qtyval'); qv.textContent = String(this._draft.qty);
    var plus = api.el('button', 'nte-stepbtn'); plus.type = 'button'; plus.textContent = '+';
    minus.addEventListener('click', function () { self._draft.qty = Math.max(rule.min, self._draft.qty - 1); qv.textContent = String(self._draft.qty); });
    plus.addEventListener('click', function () { self._draft.qty = Math.min(rule.max, self._draft.qty + 1); qv.textContent = String(self._draft.qty); });
    var add = api.el('button', 'nte-btn');
    add.type = 'button';
    add.textContent = api.t('addItem');
    add.addEventListener('click', function () {
      if (self._draft.items.length >= 8) return;
      var it = { repr: self._draft.repr, qty: self._draft.qty, seed: Math.floor(Math.random() * 1e9) };
      if (it.repr === 'tenframe' && it.qty > 5) it.split = 5;
      if (it.repr === 'doubletenframe') it.split = 10;
      if (it.repr === 'objects') {
        var theme = api.settings.objectTheme === 'fruits' ? 'fruits' : 'animals';
        it.theme = theme;
        it.noun = self.POOLS[theme][Math.floor(Math.random() * self.POOLS[theme].length)];
        if (it.qty > 10) it.arrangement = 'pairs';
      }
      self._draft.items.push(it);
      self._renderPanel();
    });
    qtyRow.append(minus, qv, plus, add);
    comp.appendChild(qtyRow);

    if (this._draft.items.length) {
      var trayEl = api.el('div', 'nte-drafttray');
      this._draft.items.forEach(function (it, i) {
        var chip = api.el('span', 'nte-draftchip');
        chip.textContent = api.t(self.REPR_LABELS[it.repr]) + ' · ' + it.qty;
        var rm = api.el('button', 'nte-draftrm');
        rm.type = 'button'; rm.textContent = '×';
        rm.setAttribute('aria-label', api.t('deleteSet'));
        rm.addEventListener('click', function () { self._draft.items.splice(i, 1); self._renderPanel(); });
        chip.appendChild(rm);
        trayEl.appendChild(chip);
      });
      comp.appendChild(trayEl);

      var nameIn = document.createElement('input');
      nameIn.className = 'nte-nameinput';
      nameIn.type = 'text';
      nameIn.maxLength = 40;
      nameIn.placeholder = api.t('setName');
      nameIn.value = this._draft.name || '';
      nameIn.addEventListener('input', function () { self._draft.name = nameIn.value; });
      comp.appendChild(nameIn);

      var save = api.el('button', 'nte-btn primary' + (this.premium ? '' : ' locked'));
      save.type = 'button';
      save.textContent = api.t('saveSet');
      save.addEventListener('click', function () {
        if (!self.premium) {
          var old = comp.querySelector('.nte-gate');
          if (old) old.remove();
          save.insertAdjacentElement('beforebegin', self._gateEl('gateSave'));
          return;
        }
        if (self._draft.items.length < 1) return;
        if (Object.keys(self._store.customSets).length >= 20) return;
        var id = 'c_' + Math.random().toString(36).slice(2, 8);
        self._store.customSets[id] = { name: (self._draft.name || api.t('mySets')).slice(0, 40), createdAt: new Date().toISOString(), items: self._draft.items.slice() };
        self._draft = { items: [], name: '' };
        self._saveStore();
        self._renderPanel();
      });
      comp.appendChild(save);
    }
    body.appendChild(comp);
  }
};

/* per-tool styling: STAGE ONLY, consuming shell tokens; sanctioned
   page-level touches: body.nte-wide + the ≤480 stacked header. */
(function injectCSS() {
  var css = ''
  + 'body.nte-wide .lcs-app{max-width:min(1080px,96vw);}'

  /* ---- wide board (§23 the apparatus a teacher teaches FROM) ----
     The easel is a flat `width:min(720px,100%)` and the pad hangs off it at
     `aspect-ratio:3/2`, so ONE number carries the drawing surface — but the
     DOTS do not follow it. They are absolutely positioned at percentages with
     a FIXED 64px diameter, so a bigger pad would have held the same small
     dots in the same arrangement: a subitising board whose dots got relatively
     SMALLER. The dot keeps its ratio to the easel (64/720 = 0.0889).
     ⚠ The pad's own `max-height:clamp(280px,46vh,460px)` has to rise too or
     it caps the pad before the easel width does — 3:2 means a 1360px easel
     wants a 907px pad. */
  + '@media (min-width:1367px) and (min-height:880px){'
  +   'body.nte-wide .lcs-app{max-width:min(1192px,96vw);}'
  +   'body.nte-wide .nte-easel{width:min(900px,100%);}'
  +   'body.nte-wide .nte-pad{max-height:clamp(280px,46vh,600px);}'
  +   'body.nte-wide{--nte-dotscale:1.25;}'
  +   'body.nte-wide .nte-chip{font-size:17px;min-height:52px;}'
  + '}'
  + '@media (min-width:1800px) and (min-height:1080px){'
  +   'body.nte-wide .lcs-app{max-width:min(1560px,96vw);}'
  +   'body.nte-wide .nte-easel{width:min(1180px,100%);}'
  +   'body.nte-wide .nte-pad{max-height:clamp(280px,48vh,700px);}'
  +   'body.nte-wide{--nte-dotscale:1.64;}'
  +   'body.nte-wide .nte-chip{font-size:19px;min-height:56px;}'
  + '}'
  + '@media (min-width:2400px) and (min-height:1150px){'
  +   'body.nte-wide .lcs-app{max-width:min(1752px,96vw);}'
  +   'body.nte-wide .nte-easel{width:min(1360px,100%);}'
  +   'body.nte-wide .nte-pad{max-height:clamp(280px,50vh,820px);}'
  +   'body.nte-wide{--nte-dotscale:1.89;}'
  +   'body.nte-wide .nte-chip{font-size:21px;min-height:60px;}'
  + '}'
  + 'body.nte-wide .lcs-title{overflow-wrap:break-word;word-break:normal;hyphens:auto;}'
  + '@media (max-width:480px){'
  +   'body.nte-wide .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}'
  +   'body.nte-wide .lcs-title{font-size:clamp(18px,6vw,26px);}'
  + '}'
  + '.nte-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(8px,1.4vmin,14px);width:100%;}'
  + '.nte-loading{padding:48px 0;color:var(--lcs-ink-soft);font-family:var(--lcs-font-body);font-weight:700;}'

  /* prompt pill */
  + '.nte-prompt{display:inline-flex;align-items:center;gap:8px;font-family:var(--lcs-font-body);'
  +   'font-weight:800;font-size:clamp(13.5px,2vmin,17px);color:var(--lcs-structure);'
  +   'background:var(--lcs-structure-soft);border:none;border-radius:var(--lcs-radius-pill);'
  +   'padding:8px 20px;min-height:40px;cursor:pointer;}'

  /* mode strip */
  + '.nte-modestrip{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;}'
  + '.nte-modechip{font-family:var(--lcs-font-display);font-weight:700;font-size:14px;'
  +   'color:var(--lcs-structure);background:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);padding:6px 16px;min-height:38px;cursor:pointer;'
  +   'box-shadow:var(--lcs-shadow-sm);}'
  + '.nte-reprrow,.nte-rangerow{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;}'
  + '.nte-chip{display:inline-flex;align-items:center;gap:5px;font-family:var(--lcs-font-display);'
  +   'font-weight:700;font-size:13.5px;color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);'
  +   'padding:7px 14px;min-height:44px;cursor:pointer;'
  +   'transition:transform .1s var(--lcs-ease),background .12s;}'
  + '.nte-chip:active{transform:scale(.96);}'
  + '.nte-chip.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.nte-chip.locked{color:var(--lcs-ink-soft);}'
  + '.nte-chip.small{font-size:12.5px;min-height:40px;padding:5px 12px;}'

  /* stepper */
  + '.nte-stepper{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;}'
  + '.nte-stepnav{width:40px;height:40px;display:grid;place-items:center;border-radius:50%;'
  +   'font-size:22px;color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'box-shadow:var(--lcs-shadow-sm);cursor:pointer;font-family:var(--lcs-font-display);}'
  + '.nte-stepname{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(15px,2.4vmin,20px);color:var(--lcs-ink);}'
  + '.nte-stepdots{display:inline-flex;gap:6px;}'
  + '.nte-stepdot{width:16px;height:16px;border-radius:50%;background:var(--lcs-surface);'
  +   'border:2px solid var(--lcs-line);cursor:pointer;padding:0;}'
  + '.nte-stepdot.done{background:var(--lcs-structure-soft);border-color:var(--lcs-structure);}'
  + '.nte-stepdot.active{background:var(--lcs-structure);border-color:var(--lcs-structure);}'
  + '.nte-stepcount{font-family:var(--lcs-font-display);font-weight:700;font-size:18px;color:var(--lcs-structure);}'
  + '.nte-note{font-family:var(--lcs-font-body);font-weight:700;font-size:13px;'
  +   'color:var(--lcs-ink-soft);background:var(--lcs-surface);border-radius:var(--lcs-radius-pill);'
  +   'padding:5px 14px;box-shadow:var(--lcs-shadow-sm);max-width:640px;text-align:center;}'

  /* the easel */
  + '.nte-easel{position:relative;width:min(720px,100%);}'
  + '.nte-clip{position:absolute;top:-14px;width:38px;height:26px;z-index:6;'
  +   'background:#F2784B;border-radius:6px 6px 3px 3px;'
  +   'box-shadow:inset 0 -3px 0 rgba(0,0,0,.14),0 2px 4px rgba(20,30,28,.18);}'
  + '.nte-clip::after{content:"";position:absolute;left:50%;top:6px;width:10px;height:10px;'
  +   'transform:translateX(-50%);border-radius:50%;background:#C9502A;}'
  + '.nte-pad{position:relative;background:#FFFEFB;border:12px solid var(--lcs-structure);'
  +   'border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow);overflow:hidden;'
  +   'aspect-ratio:3/2;max-height:clamp(280px,46vh,460px);width:100%;'
  +   'box-sizing:border-box;}'
  + '.nte-tray{height:18px;margin:0 6%;background:var(--lcs-structure);'
  +   'border-radius:0 0 12px 12px;box-shadow:0 4px 8px rgba(20,30,28,.14);}'

  /* art layer */
  + '.nte-art{position:absolute;inset:0;z-index:1;}'
  + '.nte-dot{position:absolute;width:64px;height:64px;border-radius:50%;background:#2A3B37;'
  +   'transform:translate(-50%,-50%);border:none;padding:0;cursor:pointer;'
  +   'box-shadow:inset 0 -4px 0 rgba(0,0,0,.18),inset 6px 8px 0 rgba(255,255,255,.14);}'
  + '.nte-dot.nte-t1{background:#F2784B;}'
  + '.nte-dot.nte-t2{background:#146B5E;}'
  + '.nte-dot.nte-t3{background:#E8A33D;}'
  + '.nte-obj.nte-t1 img{filter:drop-shadow(0 0 0 #F2784B) sepia(.4) hue-rotate(-25deg) saturate(2);}'
  + '.nte-obj.nte-t1{outline:4px solid #F2784B;outline-offset:2px;border-radius:14px;}'
  + '.nte-obj.nte-t2{outline:4px solid #146B5E;outline-offset:2px;border-radius:14px;}'
  + '.nte-obj.nte-t3{outline:4px solid #E8A33D;outline-offset:2px;border-radius:14px;}'
  + '.nte-obj.nte-t1 img,.nte-obj.nte-t2 img,.nte-obj.nte-t3 img{filter:none;}'
  + '.nte-pop{animation:ntePop .18s var(--lcs-ease);}'
  + '@keyframes ntePop{0%{transform:translate(-50%,-50%) scale(.6);}100%{transform:translate(-50%,-50%) scale(1);}}'
  + '.nte-countpulse{animation:nteCount .6s var(--lcs-ease);}'
  + '@keyframes nteCount{0%{filter:brightness(1);}40%{filter:brightness(1.6);}100%{filter:brightness(1);}}'

  /* dice */
  + '.nte-art.nte-r-dice{display:flex;align-items:center;justify-content:center;gap:6%;padding:5%;}'
  + '.nte-die{position:relative;width:min(38%,300px);aspect-ratio:1;background:var(--lcs-surface);'
  +   'border-radius:18px;border:2.5px solid var(--lcs-line);'
  +   'box-shadow:inset 0 2px 0 rgba(255,255,255,.8),0 4px 0 0 #E6D8AF,0 6px 12px rgba(20,30,28,.10);}'
  + '.nte-die .nte-pip{width:22%;height:22%;}'

  /* ten frame */
  + '.nte-art.nte-r-tenframe,.nte-art.nte-r-doubletenframe{display:flex;align-items:center;'
  +   'justify-content:center;gap:3%;padding:4%;}'
  + '.nte-tf{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;'
  +   'background:var(--lcs-structure);padding:8px;border-radius:12px;'
  +   'box-shadow:var(--lcs-shadow-sm);width:min(72%,460px);}'
  + '.nte-tf.double{width:min(46%,340px);}'
  + '.nte-tfcell{aspect-ratio:1;background:var(--lcs-surface);border-radius:7px;'
  +   'display:grid;place-items:center;position:relative;}'
  + '.nte-framedot{position:relative;left:auto;top:auto;transform:none;width:68%!important;height:68%!important;}'
  + '.nte-framedot.nte-splitB:not(.nte-t1):not(.nte-t2):not(.nte-t3){background:#4A90B8;}'
  + '.nte-framedot.nte-pop{animation-name:ntePopFrame;}'
  + '@keyframes ntePopFrame{0%{transform:scale(.6);}100%{transform:scale(1);}}'

  /* rekenrek */
  + '.nte-art.nte-r-rekenrek{display:flex;align-items:center;justify-content:center;padding:4%;}'
  + '.nte-rek{display:flex;flex-direction:column;gap:clamp(18px,4vmin,36px);width:min(86%,560px);'
  +   'padding:clamp(10px,2vmin,20px) clamp(14px,2.4vmin,24px);'
  +   'border-left:12px solid var(--lcs-structure);border-right:12px solid var(--lcs-structure);'
  +   'border-radius:14px;}'
  + '.nte-rod{position:relative;display:flex;align-items:center;gap:2px;height:clamp(34px,7vmin,54px);}'
  + '.nte-rod::before{content:"";position:absolute;left:-14px;right:-14px;top:50%;height:9px;'
  +   'transform:translateY(-50%);background:var(--lcs-structure);border-radius:5px;}'
  + '.nte-bead{position:relative;z-index:1;width:clamp(24px,5.4vmin,42px);aspect-ratio:1;'
  +   'border-radius:50%;background:#FFFEFB;border:2.5px solid var(--lcs-structure);'
  +   'box-shadow:inset 0 -4px 0 rgba(0,0,0,.10),inset 6px 8px 0 rgba(255,255,255,.35);'
  +   'box-sizing:border-box;flex:0 0 auto;}'
  + '.nte-bead.five{background:#F2784B;border-color:#C9502A;}'
  + '.nte-bead.parked{margin-left:0;}'
  + '.nte-bead.pushed + .nte-bead.parked{margin-left:auto;}'
  + '.nte-rod .nte-bead.parked:first-child{margin-left:auto;}'

  /* objects */
  + '.nte-obj{position:absolute;width:clamp(84px,17%,130px);aspect-ratio:1;border:none;'
  +   'background:transparent;padding:0;cursor:pointer;}'
  + '.nte-obj img{width:100%;height:100%;object-fit:contain;pointer-events:none;}'

  /* ink */
  + '.nte-ink{position:absolute;inset:0;z-index:2;width:100%;height:100%;pointer-events:none;'
  +   'touch-action:none;}'
  + '.nte-pad.revealed .nte-ink{pointer-events:auto;}'
  + '.nte-pad.revealed .nte-ink.tintmode{pointer-events:none;}'

  /* the roller shade */
  + '.nte-shade{position:absolute;inset:0;z-index:4;transform:translateY(0);'
  +   'transition:transform .26s cubic-bezier(.34,1.56,.64,1);}'
  + '.nte-shade.up{transform:translateY(calc(-100% + 26px));transition:transform .22s ease-out;}'
  + '.nte-roll{position:absolute;left:0;right:0;bottom:-2px;height:0;}'
  + '.nte-cloth{position:absolute;inset:0;background-color:#FBF6E9;'
  +   'background-image:radial-gradient(rgba(242,120,75,.3) 1.6px,transparent 1.6px);'
  +   'background-size:10px 10px;box-shadow:0 6px 14px rgba(20,30,28,.16);}'
  + '.nte-shade.up .nte-cloth{box-shadow:0 10px 18px rgba(20,30,28,.22);}'
  + '.nte-hem{position:absolute;left:0;right:0;bottom:2px;height:30px;}'
  + '.nte-scallops{position:absolute;left:0;right:0;top:0;width:100%;height:26px;}'
  + '.nte-stitch{position:absolute;left:2%;right:2%;top:-7px;border-top:2.5px dashed rgba(242,120,75,.55);}'
  + '.nte-ring{position:absolute;left:50%;top:-46px;transform:translateX(-50%);}'
  + '.nte-shade::after{content:"";position:absolute;left:0;right:0;top:100%;margin-top:-4px;height:0;}'
  /* the hem sway on settle */
  + '.nte-shade:not(.up) .nte-hem{animation:nteSway .3s var(--lcs-ease);}'
  + '@keyframes nteSway{0%{transform:skewX(0);}40%{transform:skewX(2deg);}100%{transform:skewX(0);}}'
  /* the rolled-cloth bar that stays visible when up */
  + '.nte-shade.up::before{content:"";position:absolute;left:-2%;right:-2%;bottom:-14px;height:22px;'
  +   'background:#F3E7CF;border-radius:11px;'
  +   'box-shadow:inset 0 2px 0 rgba(255,255,255,.7),0 3px 6px rgba(20,30,28,.18);}'

  /* pens */
  + '.nte-pens{position:absolute;right:-8px;top:8%;display:flex;flex-direction:column;gap:8px;'
  +   'z-index:6;align-items:center;}'
  + '.nte-pen{width:44px;height:44px;border-radius:50%;border:2.5px solid var(--lcs-surface);'
  +   'background:var(--lcs-surface);color:var(--lcs-structure);cursor:pointer;'
  +   'box-shadow:var(--lcs-shadow-sm);display:grid;place-items:center;'
  +   'transition:transform .12s var(--lcs-ease);}'
  + '.nte-pen.active{transform:scale(1.15);border-color:#fff;outline:2px solid var(--lcs-structure);}'
  + '.nte-pen.locked{filter:saturate(.35);opacity:.9;}'
  + '.nte-clearbtn{font-family:var(--lcs-font-body);font-weight:700;font-size:12px;'
  +   'color:var(--lcs-structure);background:var(--lcs-surface);border:1.5px dashed var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);padding:6px 10px;cursor:pointer;min-height:36px;}'
  + '.nte-clearbtn.locked{color:var(--lcs-ink-soft);}'

  /* reveal card */
  + '.nte-cardslot{min-height:clamp(58px,9vmin,96px);display:grid;place-items:center;width:100%;}'
  + '.nte-card{display:inline-flex;align-items:center;gap:14px;background:var(--lcs-surface);'
  +   'border-radius:var(--lcs-radius);padding:6px 26px;box-shadow:var(--lcs-shadow);cursor:pointer;'
  +   'animation:nteCardUp .26s cubic-bezier(.34,1.56,.64,1);}'
  + '@keyframes nteCardUp{0%{transform:translateY(26px);opacity:0;}100%{transform:translateY(0);opacity:1;}}'
  + '.nte-card-num{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(44px,8vmin,84px);line-height:1;color:var(--lcs-structure);}'
  + '.nte-card-dash{color:var(--lcs-ink-soft);font-size:24px;}'
  + '.nte-card-word{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(20px,3.6vmin,38px);color:#C9502A;}'
  + '.nte-card-spk{color:var(--lcs-structure);}'
  + '.nte-done{display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:center;'
  +   'background:#FDE8DE;border-radius:var(--lcs-radius);padding:12px 22px;}'
  + '.nte-done p{margin:0;font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(15px,2.4vmin,20px);color:var(--lcs-ink);}'

  /* dock */
  + '.nte-dock{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;width:100%;}'
  + '.nte-show{position:relative;display:inline-flex;align-items:center;justify-content:center;'
  +   'min-width:132px;min-height:56px;padding:12px 34px;border-radius:var(--lcs-radius-pill);'
  +   'border:none;cursor:pointer;background:#F2784B;color:#fff;'
  +   'font-family:var(--lcs-font-display);font-weight:800;font-size:clamp(17px,2.6vmin,23px);'
  +   'box-shadow:0 4px 0 0 #C9502A,0 6px 14px rgba(20,30,28,.14);'
  +   'transition:transform .1s var(--lcs-ease);touch-action:none;}'
  + '.nte-show:active{transform:translateY(3px);box-shadow:0 1px 0 0 #C9502A;}'
  + '.nte-show.counted{background:var(--lcs-structure);box-shadow:0 4px 0 0 #0d4a41,0 6px 14px rgba(20,30,28,.14);}'
  + '.nte-arc{position:absolute;inset:-4px;width:calc(100% + 8px);height:calc(100% + 8px);'
  +   'pointer-events:none;transform:rotate(-90deg);}'
  + '.nte-arc-track{stroke:transparent;stroke-width:0;}'
  + '.nte-arc-fill{stroke:#fff;stroke-opacity:.85;stroke-width:3;stroke-linecap:round;stroke-dasharray:289;stroke-dashoffset:289;}'
  + '.nte-ctrlchip{font-family:var(--lcs-font-display);font-weight:700;font-size:15px;'
  +   'color:var(--lcs-structure);background:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);padding:10px 20px;min-height:52px;cursor:pointer;'
  +   'box-shadow:var(--lcs-shadow-sm);transition:transform .1s var(--lcs-ease);}'
  + '.nte-ctrlchip:active{transform:scale(.97);}'
  + '.nte-ctrlchip.teal{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'

  /* gates */
  + '.nte-gate{display:flex;flex-direction:column;gap:5px;padding:10px 14px;max-width:520px;'
  +   'margin:8px auto;background:#FDE8DE;border-radius:var(--lcs-radius-sm);'
  +   'font-size:13.5px;font-family:var(--lcs-font-body);color:var(--lcs-ink);text-align:center;z-index:7;position:relative;}'
  + '.nte-gate a{color:#C9502A;font-weight:800;text-decoration:underline;}'

  /* panel */
  + '.nte-scrim{position:absolute;inset:0;background:rgba(38,51,47,.28);opacity:0;'
  +   'pointer-events:none;transition:opacity .2s;z-index:70;border-radius:inherit;}'
  + '.nte-scrim.open{opacity:1;pointer-events:auto;}'
  + '.nte-panel{position:absolute;left:50%;top:6%;transform:translateX(-50%) translateY(8px);'
  +   'width:min(560px,92%);max-height:86%;overflow:auto;background:var(--lcs-surface);'
  +   'border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow);z-index:71;'
  +   'opacity:0;pointer-events:none;transition:opacity .2s,transform .2s var(--lcs-ease);'
  +   'display:flex;flex-direction:column;}'
  + '.nte-panel.open{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0);}'
  + '.nte-panel-head{display:flex;align-items:center;justify-content:space-between;'
  +   'padding:14px 16px 10px;border-bottom:1px solid var(--lcs-line);}'
  + '.nte-tabs{display:flex;gap:8px;}'
  + '.nte-tab{font-family:var(--lcs-font-display);font-weight:700;font-size:14px;'
  +   'padding:7px 14px;border-radius:var(--lcs-radius-pill);color:var(--lcs-ink-soft);'
  +   'background:transparent;cursor:pointer;}'
  + '.nte-tab.active{background:var(--lcs-structure);color:var(--lcs-surface);}'
  + '.nte-panel-close{width:36px;height:36px;display:grid;place-items:center;border-radius:50%;'
  +   'color:var(--lcs-ink-soft);background:transparent;cursor:pointer;}'
  + '.nte-panel-body{padding:12px 16px;display:flex;flex-direction:column;gap:8px;}'
  + '.nte-panel-foot{padding:10px 16px 14px;border-top:1px solid var(--lcs-line);}'
  + '.nte-bandhead{font-family:var(--lcs-font-display);font-weight:700;font-size:13px;'
  +   'color:var(--lcs-ink-soft);text-transform:uppercase;letter-spacing:.05em;margin-top:6px;}'
  + '.nte-strrow{display:flex;align-items:center;gap:10px;text-align:left;width:100%;'
  +   'padding:11px 14px;border-radius:var(--lcs-radius-sm);cursor:pointer;'
  +   'background:var(--lcs-surface-2);border:1.5px solid var(--lcs-line);'
  +   'font-family:var(--lcs-font-body);}'
  + '.nte-strrow.active{border-color:var(--lcs-structure);background:var(--lcs-structure-soft);}'
  + '.nte-strrow.locked .nte-strname{color:var(--lcs-ink-soft);}'
  + '.nte-strname{font-weight:800;color:var(--lcs-ink);flex:1;}'
  + '.nte-strmeta{font-size:12.5px;color:var(--lcs-ink-soft);font-weight:700;}'
  + '.nte-strglyphs{display:inline-flex;gap:6px;font-size:17px;color:var(--lcs-structure);}'
  + '.nte-freebadge{font-family:var(--lcs-font-display);font-weight:800;font-size:11px;'
  +   'color:#fff;background:#F2784B;border-radius:8px;padding:2px 8px;}'
  + '.nte-setrow{display:flex;align-items:center;gap:8px;}'
  + '.nte-setrow .nte-strrow{flex:1;}'
  + '.nte-composer{display:flex;flex-direction:column;gap:10px;padding-top:8px;'
  +   'border-top:1.5px dashed var(--lcs-line);margin-top:6px;}'
  + '.nte-qtyrow{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}'
  + '.nte-stepbtn{width:44px;height:44px;border-radius:50%;font-size:24px;cursor:pointer;'
  +   'font-family:var(--lcs-font-display);background:var(--lcs-surface);color:var(--lcs-structure);'
  +   'box-shadow:var(--lcs-shadow-sm);border:1.5px solid var(--lcs-line);}'
  + '.nte-qtyval{font-family:var(--lcs-font-display);font-weight:700;font-size:26px;'
  +   'color:var(--lcs-ink);min-width:44px;text-align:center;}'
  + '.nte-btn{align-self:flex-start;font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:14px;padding:9px 18px;border-radius:var(--lcs-radius-pill);cursor:pointer;'
  +   'background:var(--lcs-surface);border:1.5px solid var(--lcs-structure);color:var(--lcs-structure);}'
  + '.nte-btn.primary{background:var(--lcs-structure);color:var(--lcs-surface);}'
  + '.nte-btn.locked{opacity:.75;}'
  + '.nte-drafttray{display:flex;gap:6px;flex-wrap:wrap;}'
  + '.nte-draftchip{display:inline-flex;align-items:center;gap:6px;'
  +   'font-family:var(--lcs-font-body);font-weight:700;font-size:13px;color:var(--lcs-ink);'
  +   'background:var(--lcs-surface-2);border:1.5px solid var(--lcs-line);border-radius:8px;'
  +   'padding:4px 8px;}'
  + '.nte-draftrm{border:none;background:transparent;color:var(--lcs-ink-soft);'
  +   'font-size:16px;cursor:pointer;padding:0 2px;}'
  + '.nte-nameinput{width:100%;box-sizing:border-box;font-family:var(--lcs-font-body);'
  +   'font-size:15px;padding:10px 12px;border:1.5px solid var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-sm);background:var(--lcs-surface-2);color:var(--lcs-ink);}'
  + '.nte-linkbtn{font-family:var(--lcs-font-body);font-weight:700;font-size:13px;'
  +   'color:var(--lcs-structure);background:transparent;border:none;cursor:pointer;'
  +   'text-decoration:underline;padding:4px;}'
  + '.nte-linkbtn.danger{color:#C9502A;}'

  /* short screens (1024×768 projectors) */
  + '@media (max-height:960px) and (min-width:768px){'
  +   '.nte-wrap{gap:6px;}'
  +   '.nte-pad{max-height:clamp(240px,42vh,400px);}'
  +   '.nte-cardslot{min-height:48px;}'
  +   '.nte-prompt{min-height:34px;padding:5px 16px;}'
  +   '.nte-dock .nte-show{min-height:52px;}'
  + '}'
  /* phone */
  + '@media (max-width:560px){'
  +   '.nte-wrap{flex-direction:column;}'
  +   '.nte-dock{order:4;}'
  +   '.nte-cardslot{order:5;min-height:40px;}'
  +   '.nte-pens{position:static;flex-direction:row;justify-content:center;margin-top:6px;}'
  +   '.nte-easel{display:flex;flex-direction:column;}'
  +   '.nte-die{width:44%;}'
  + '}'

  /* reduced motion */
  + '@media (prefers-reduced-motion: reduce){'
  +   '.nte-shade{transition:opacity .12s;transform:none!important;opacity:1;}'
  +   '.nte-shade.up{opacity:0;pointer-events:none;}'
  +   '.nte-shade:not(.up) .nte-hem{animation:none;}'
  +   '.nte-card,.nte-pop,.nte-countpulse{animation:none;}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
