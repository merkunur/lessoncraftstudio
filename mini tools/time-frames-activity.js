/* =====================================================================
   time-frames-activity.js — ACTIVITY #125 of the one-by-one rebuild:
   "The Clock Tower" → PHOTO, WINDOW, ENVELOPE (L.1.1.e; all 11 locales).
   Model: time-frames-core.js (TimeFramesCore).
   Design: docs/activities-rebuild/designs/125-tense.md
   ---------------------------------------------------------------------
   A sentence card (the subject's picture, the sentence with its time
   word and a gap), plain paper verb cards, and the clock tower's front
   with three openings: the album, the window, the post slot. Tap a card
   into the gap; tap the eye to develop it for a moment. Check develops it
   — the past into a still sepia photo, the present into a live window,
   the future into a sealed envelope (fi: the present is a window with a
   shutter, which fits the window and the post slot) — and sends it to
   the opening the time word names: it files in, or bumps. Tap the time
   word to see which opening it names. Level 3 gives the verb and asks for
   the time word; level 4 puts past photos on their base-form windows;
   levels 5–6 find the verb and name (or write) its base form. No timer,
   no score. Test seams: window.TimeFramesActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._drop / ._pick /
   ._pane / ._word / ._type / .FAST / .OK_MS.
   ===================================================================== */
var TimeFramesActivity = {
  id: 'time-frames',
  /* the drawn apparatus (the hierarchy gate): the tower front, the openings, the frames, the windows, the photos */
  apparatusClasses: ['vt-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"The Clock Tower",de:"Junipers Uhrturm",fr:"La tour du temps de Juniper",es:"La torre del tiempo de Juniper",pt:"A Torre do Tempo do Juniper",it:"La torre del tempo di Juniper",nl:"Junipers klokkentoren",sv:"Junipers tidstorn",da:"Junipers klokketårn",no:"Junipers klokketårn",fi:"Juniperin kellotorni"},
    instruction: {en:"Pick the verb for the time word. Past is a photo, now is a window, tomorrow is a letter.",de:"Wähl das Verb, das zum Signalwort passt. Vergangen ist ein Foto, jetzt ein Fenster, morgen ein Brief.",fr:"Choisis le verbe qui va avec l’indicateur de temps. Le passé est une photo, maintenant une fenêtre, demain une lettre.",es:"Elige el verbo para la palabra de tiempo. El pasado es una foto, ahora es una ventana, mañana es una carta.",pt:"Escolha o verbo para a palavra de tempo. O passado é uma foto, agora é uma janela, amanhã é uma carta.",it:"Scegli il verbo per la parola del tempo. Il passato è una foto, adesso è una finestra, domani è una lettera.",nl:"Kies het werkwoord bij het signaalwoord. Voorbij is een foto, nu een raam, morgen een brief.",sv:"Välj verbet som passar tidsordet. Det som har hänt är ett foto, nu är ett fönster, i morgon är ett brev.",da:"Vælg udsagnsordet, der passer til tidsordet. Det, der er sket, er et foto, nu er et vindue, i morgen er et brev.",no:"Velg verbet som passer til tidsordet. Det som har skjedd, er et bilde, nå er et vindu, i morgen er et brev.",fi:"Valitse aikasanaan sopiva verbi. Mennyt on valokuva, nyt on ikkuna, huominen on kirje."},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    t1: {en:"When does it happen? Pick the verb.",de:"Wann passiert es? Wähl das Verb.",fr:"Quand est-ce que ça se passe ? Choisis le verbe.",es:"¿Cuándo pasa? Elige el verbo.",pt:"Quando acontece? Escolha o verbo.",it:"Quando succede? Scegli il verbo.",nl:"Wanneer gebeurt het? Kies het werkwoord.",sv:"När händer det? Välj verbet.",da:"Hvornår sker det? Vælg udsagnsordet.",no:"Når skjer det? Velg verbet.",fi:"Milloin se tapahtuu? Valitse verbi."},
    t2: {en:"Tricky verbs! When does it happen?",de:"Knifflige Verben! Wann passiert es?",fr:"Des verbes difficiles ! Quand est-ce que ça se passe ?",es:"¡Verbos difíciles! ¿Cuándo pasa?",pt:"Verbos difíceis! Quando acontece?",it:"Verbi difficili! Quando succede?",nl:"Lastige werkwoorden! Wanneer gebeurt het?",sv:"Kluriga verb! När händer det?",da:"Svære udsagnsord! Hvornår sker det?",no:"Vanskelige verb! Når skjer det?",fi:"Hankalia verbejä! Milloin se tapahtuu?"},
    t3: {en:"Read the verb. When does it happen?",de:"Lies das Verb. Wann passiert es?",fr:"Lis le verbe. Quand est-ce que ça se passe ?",es:"Lee el verbo. ¿Cuándo pasa?",pt:"Leia o verbo. Quando acontece?",it:"Leggi il verbo. Quando succede?",nl:"Lees het werkwoord. Wanneer gebeurt het?",sv:"Läs verbet. När händer det?",da:"Læs udsagnsordet. Hvornår sker det?",no:"Les verbet. Når skjer det?",fi:"Lue verbi. Milloin se tapahtuu?"},
    t4: {en:"Put each photo on its window.",de:"Leg jedes Foto auf sein Fenster.",fr:"Pose chaque photo sur sa fenêtre.",es:"Pon cada foto en su ventana.",pt:"Coloque cada foto na sua janela.",it:"Metti ogni foto sulla sua finestra.",nl:"Leg elke foto bij zijn raam.",sv:"Lägg varje foto på sitt fönster.",da:"Læg hvert foto på sit vindue.",no:"Legg hvert bilde på vinduet sitt.",fi:"Laita jokainen valokuva omaan ikkunaansa."},
    t5: {en:"Tap the verb. What is its base form?",de:"Tipp auf das Verb. Wie heißt seine Grundform?",fr:"Touche le verbe. Quel est son infinitif ?",es:"Toca el verbo. ¿Cuál es su infinitivo?",pt:"Toque no verbo. Qual é o infinitivo?",it:"Tocca il verbo. Qual è il suo infinito?",nl:"Tik op het werkwoord. Wat is het hele werkwoord?",sv:"Tryck på verbet. Vad heter grundformen?",da:"Tryk på udsagnsordet. Hvad er navneformen?",no:"Trykk på verbet. Hva er infinitiven?",fi:"Napauta verbiä. Mikä on sen perusmuoto?"},
    t6: {en:"Find the verb, then write its base form.",de:"Finde das Verb und schreib seine Grundform.",fr:"Trouve le verbe, puis écris son infinitif.",es:"Encuentra el verbo y escribe su infinitivo.",pt:"Encontre o verbo e escreva o infinitivo.",it:"Trova il verbo, poi scrivi il suo infinito.",nl:"Zoek het werkwoord en schrijf het hele werkwoord.",sv:"Hitta verbet och skriv grundformen.",da:"Find udsagnsordet, og skriv navneformen.",no:"Finn verbet og skriv infinitiven.",fi:"Etsi verbi ja kirjoita sen perusmuoto."},
    check: {en:"Check",de:"Prüfen",fr:"Vérifier",es:"Comprobar",pt:"Verificar",it:"Controlla",nl:"Controleer",sv:"Kontrollera",da:"Tjek",no:"Sjekk",fi:"Tarkista"},
    setLevel: {en:"Verbs",de:"Verben",fr:"Verbes",es:"Verbos",pt:"Verbos",it:"Verbi",nl:"Werkwoorden",sv:"Verb",da:"Udsagnsord",no:"Verb",fi:"Verbit"},
    l1: {en:"Yesterday · now · tomorrow",de:"Gestern · gerade · morgen",fr:"Hier · en ce moment · demain",es:"Ayer · ahora · mañana",pt:"Ontem · agora · amanhã",it:"Ieri · adesso · domani",nl:"Gisteren · nu · morgen",sv:"I går · nu · i morgon",da:"I går · nu · i morgen",no:"I går · nå · i morgen",fi:"Eilen · juuri nyt · huomenna"},
    l2: {en:"Tricky verbs",de:"Knifflige Verben",fr:"Verbes difficiles",es:"Verbos difíciles",pt:"Verbos difíceis",it:"Verbi difficili",nl:"Lastige werkwoorden",sv:"Kluriga verb",da:"Svære udsagnsord",no:"Vanskelige verb",fi:"Hankalat verbit"},
    l3: {en:"Read the verb",de:"Das Verb lesen",fr:"Lire le verbe",es:"Leer el verbo",pt:"Ler o verbo",it:"Leggere il verbo",nl:"Het werkwoord lezen",sv:"Läs verbet",da:"Læs udsagnsordet",no:"Les verbet",fi:"Lue verbi"},
    l4: {en:"Match the past",de:"Vergangenheit zuordnen",fr:"Associer le passé",es:"Unir el pasado",pt:"Ligar o passado",it:"Abbinare il passato",nl:"Verleden tijd koppelen",sv:"Para ihop dåtiden",da:"Sæt datid sammen",no:"Finn fortiden",fi:"Yhdistä mennyt aika"},
    l5: {en:"Find the verb",de:"Das Verb finden",fr:"Trouver le verbe",es:"Encontrar el verbo",pt:"Achar o verbo",it:"Trovare il verbo",nl:"Het werkwoord vinden",sv:"Hitta verbet",da:"Find udsagnsordet",no:"Finn verbet",fi:"Etsi verbi"},
    l6: {en:"Write the base form",de:"Die Grundform schreiben",fr:"Écrire l’infinitif",es:"Escribir el infinitivo",pt:"Escrever o infinitivo",it:"Scrivere l’infinito",nl:"Het hele werkwoord schrijven",sv:"Skriv grundformen",da:"Skriv navneformen",no:"Skriv infinitiven",fi:"Kirjoita perusmuoto"},
    hintEmpty: {en:"Read the time word. When does it happen?",de:"Lies das Signalwort. Wann passiert es?",fr:"Lis l’indicateur de temps. Quand est-ce que ça se passe ?",es:"Lee la palabra de tiempo. ¿Cuándo pasa?",pt:"Leia a palavra de tempo. Quando acontece?",it:"Leggi la parola del tempo. Quando succede?",nl:"Lees het signaalwoord. Wanneer gebeurt het?",sv:"Läs tidsordet. När händer det?",da:"Læs tidsordet. Hvornår sker det?",no:"Les tidsordet. Når skjer det?",fi:"Lue aikasana. Milloin se tapahtuu?"},
    hintTime: {en:"Read the verb. Then put a time word in the gap.",de:"Lies das Verb. Dann leg ein Signalwort in die Lücke.",fr:"Lis le verbe. Puis pose un indicateur de temps dans le trou.",es:"Lee el verbo. Luego pon una palabra de tiempo en el espacio.",pt:"Leia o verbo. Depois coloque uma palavra de tempo na lacuna.",it:"Leggi il verbo. Poi metti una parola del tempo nello spazio.",nl:"Lees het werkwoord. Leg dan een signaalwoord in het gat.",sv:"Läs verbet. Lägg sedan ett tidsord i luckan.",da:"Læs udsagnsordet. Læg så et tidsord i hullet.",no:"Les verbet. Legg så et tidsord i luka.",fi:"Lue verbi. Laita sitten aikasana aukkoon."},
    hintPair: {en:"Put a photo on every window first.",de:"Leg zuerst auf jedes Fenster ein Foto.",fr:"Pose d’abord une photo sur chaque fenêtre.",es:"Primero pon una foto en cada ventana.",pt:"Primeiro coloque uma foto em cada janela.",it:"Prima metti una foto su ogni finestra.",nl:"Leg eerst bij elk raam een foto.",sv:"Lägg först ett foto på varje fönster.",da:"Læg først et foto på hvert vindue.",no:"Legg først et bilde på hvert vindu.",fi:"Laita ensin jokaiseen ikkunaan valokuva."},
    hintFind: {en:"Tap the word that tells what happens.",de:"Tipp auf das Wort, das sagt, was passiert.",fr:"Touche le mot qui dit ce qui se passe.",es:"Toca la palabra que dice qué pasa.",pt:"Toque na palavra que diz o que acontece.",it:"Tocca la parola che dice che cosa succede.",nl:"Tik op het woord dat zegt wat er gebeurt.",sv:"Tryck på ordet som säger vad som händer.",da:"Tryk på det ord, der siger, hvad der sker.",no:"Trykk på ordet som sier hva som skjer.",fi:"Napauta sanaa, joka kertoo, mitä tapahtuu."},
    hintType: {en:"Write the base form in the window.",de:"Schreib die Grundform ins Fenster.",fr:"Écris l’infinitif dans la fenêtre.",es:"Escribe el infinitivo en la ventana.",pt:"Escreva o infinitivo na janela.",it:"Scrivi l’infinito nella finestra.",nl:"Schrijf het hele werkwoord in het raam.",sv:"Skriv grundformen i fönstret.",da:"Skriv navneformen i vinduet.",no:"Skriv infinitiven i vinduet.",fi:"Kirjoita perusmuoto ikkunaan."},
    foundType: {en:"That is the verb! Now write its base form.",de:"Das ist das Verb! Schreib jetzt seine Grundform.",fr:"C’est le verbe ! Écris maintenant son infinitif.",es:"¡Ese es el verbo! Ahora escribe su infinitivo.",pt:"Esse é o verbo! Agora escreva o infinitivo.",it:"È il verbo! Ora scrivi il suo infinito.",nl:"Dat is het werkwoord! Schrijf nu het hele werkwoord.",sv:"Det är verbet! Skriv nu grundformen.",da:"Det er udsagnsordet! Skriv nu navneformen.",no:"Det er verbet! Skriv nå infinitiven.",fi:"Se on verbi! Kirjoita nyt sen perusmuoto."},
    missAlbum: {en:"That is over — it is a photo now. Which word is a photo?",de:"Das ist vorbei – jetzt ist es ein Foto. Welches Wort ist ein Foto?",fr:"C’est fini : c’est une photo maintenant. Quel mot est une photo ?",es:"Eso ya pasó: ahora es una foto. ¿Qué palabra es una foto?",pt:"Isso já passou: agora é uma foto. Que palavra é uma foto?",it:"È già passato: ora è una foto. Quale parola è una foto?",nl:"Dat is voorbij – het is nu een foto. Welk woord is een foto?",sv:"Det är över – nu är det ett foto. Vilket ord är ett foto?",da:"Det er forbi – nu er det et foto. Hvilket ord er et foto?",no:"Det er over – nå er det et bilde. Hvilket ord er et bilde?",fi:"Se on jo ohi – nyt se on valokuva. Mikä sana on valokuva?"},
    missPost: {en:"That has not happened yet. It needs the envelope.",de:"Das ist noch nicht passiert. Es braucht den Umschlag.",fr:"Ça n’est pas encore arrivé. Il faut l’enveloppe.",es:"Eso todavía no pasa. Necesita el sobre.",pt:"Isso ainda não aconteceu. Precisa do envelope.",it:"Non è ancora successo. Ci vuole la busta.",nl:"Dat is nog niet gebeurd. Het moet in de envelop.",sv:"Det har inte hänt än. Det behöver kuvertet.",da:"Det er ikke sket endnu. Det skal i konvolutten.",no:"Det har ikke skjedd ennå. Det trenger konvolutten.",fi:"Se ei ole vielä tapahtunut. Se tarvitsee kirjekuoren."},
    missWindow: {en:"It is happening right now. Which word is a live window?",de:"Es passiert gerade jetzt. Welches Wort ist ein lebendiges Fenster?",fr:"Ça se passe en ce moment. Quel mot est une fenêtre vivante ?",es:"Está pasando ahora mismo. ¿Qué palabra es una ventana viva?",pt:"Está acontecendo agora. Que palavra é uma janela viva?",it:"Sta succedendo adesso. Quale parola è una finestra viva?",nl:"Het gebeurt nu. Welk woord is een levend raam?",sv:"Det händer just nu. Vilket ord är ett levande fönster?",da:"Det sker lige nu. Hvilket ord er et levende vindue?",no:"Det skjer akkurat nå. Hvilket ord er et levende vindu?",fi:"Se tapahtuu juuri nyt. Mikä sana on elävä ikkuna?"},
    missPair: {en:"Some photos came off. Which past goes with each word?",de:"Ein paar Fotos sind abgefallen. Welche Vergangenheit gehört zu welchem Wort?",fr:"Des photos sont tombées. Quel passé va avec chaque mot ?",es:"Algunas fotos se cayeron. ¿Qué pasado va con cada palabra?",pt:"Algumas fotos caíram. Que passado combina com cada palavra?",it:"Alcune foto sono cadute. Quale passato va con ogni parola?",nl:"Er vielen foto's af. Welke verleden tijd hoort bij elk woord?",sv:"Några foton ramlade av. Vilken dåtid hör till varje ord?",da:"Nogle fotos faldt af. Hvilken datid hører til hvert ord?",no:"Noen bilder falt av. Hvilken fortid hører til hvert ord?",fi:"Osa valokuvista putosi. Mikä mennyt aika kuuluu kuhunkin sanaan?"},
    missVerb: {en:"That word stays plain paper. Which word tells what happens?",de:"Das Wort bleibt Papier. Welches Wort sagt, was passiert?",fr:"Ce mot reste du papier. Quel mot dit ce qui se passe ?",es:"Esa palabra sigue siendo papel. ¿Qué palabra dice qué pasa?",pt:"Essa palavra continua papel. Que palavra diz o que acontece?",it:"Quella parola resta carta. Quale parola dice che cosa succede?",nl:"Dat woord blijft papier. Welk woord zegt wat er gebeurt?",sv:"Det ordet förblir papper. Vilket ord säger vad som händer?",da:"Det ord forbliver papir. Hvilket ord siger, hvad der sker?",no:"Det ordet blir bare papir. Hvilket ord sier hva som skjer?",fi:"Se sana pysyy paperina. Mikä sana kertoo, mitä tapahtuu?"},
    missSpell: {en:"Not quite. Say it after “I can”: I can …",de:"Noch nicht ganz. Wie heißt das Verb in der Grundform?",fr:"Pas tout à fait. Quel est le verbe à l’infinitif ?",es:"Casi. ¿Cómo es el verbo en infinitivo?",pt:"Quase. Como é o verbo no infinitivo?",it:"Quasi. Com’è il verbo all’infinito?",nl:"Bijna. Hoe heet het hele werkwoord?",sv:"Nästan. Vad heter verbet i grundform?",da:"Næsten. Hvad hedder udsagnsordet i navneform?",no:"Nesten. Hva heter verbet i infinitiv?",fi:"Melkein. Mikä on verbin perusmuoto?"},
    missGlow: {en:"Try the card that is showing its frame.",de:"Probier die Karte, die ihren Rahmen zeigt.",fr:"Essaie la carte qui montre son cadre.",es:"Prueba la tarjeta que muestra su marco.",pt:"Experimente o cartão que mostra a moldura.",it:"Prova la scheda che mostra la sua cornice.",nl:"Probeer de kaart die haar lijst laat zien.",sv:"Prova kortet som visar sin ram.",da:"Prøv kortet, der viser sin ramme.",no:"Prøv kortet som viser rammen sin.",fi:"Kokeile korttia, joka näyttää kehyksensä."},
    missGlowP: {en:"Put the picked photo on the glowing window.",de:"Leg das gewählte Foto auf das leuchtende Fenster.",fr:"Pose la photo choisie sur la fenêtre qui brille.",es:"Pon la foto elegida en la ventana que brilla.",pt:"Coloque a foto escolhida na janela que brilha.",it:"Metti la foto scelta sulla finestra che brilla.",nl:"Leg de gekozen foto bij het raam dat oplicht.",sv:"Lägg det valda fotot på fönstret som lyser.",da:"Læg det valgte foto på vinduet, der lyser.",no:"Legg det valgte bildet på vinduet som lyser.",fi:"Laita valittu valokuva hohtavaan ikkunaan."},
    missGlowF: {en:"Tap the glowing word.",de:"Tipp auf das leuchtende Wort.",fr:"Touche le mot qui brille.",es:"Toca la palabra que brilla.",pt:"Toque na palavra que brilha.",it:"Tocca la parola che brilla.",nl:"Tik op het woord dat oplicht.",sv:"Tryck på ordet som lyser.",da:"Tryk på ordet, der lyser.",no:"Trykk på ordet som lyser.",fi:"Napauta hohtavaa sanaa."},
    missGlowW: {en:"Look at the window: copy the word you see.",de:"Schau ins Fenster: Schreib das Wort ab.",fr:"Regarde la fenêtre : recopie le mot.",es:"Mira la ventana: copia la palabra.",pt:"Olhe a janela: copie a palavra.",it:"Guarda la finestra: copia la parola.",nl:"Kijk in het raam: schrijf het woord over.",sv:"Titta i fönstret: skriv av ordet.",da:"Se i vinduet: skriv ordet af.",no:"Se i vinduet: skriv av ordet.",fi:"Katso ikkunaa: kirjoita sama sana."},
    okPast: {en:"{s} — it already happened!",de:"{s} – das ist schon passiert!",fr:"{s} : c’est déjà arrivé !",es:"{s}: ¡ya pasó!",pt:"{s}: já aconteceu!",it:"{s}: è già successo!",nl:"{s} – dat is al gebeurd!",sv:"{s} – det har redan hänt!",da:"{s} – det er allerede sket!",no:"{s} – det har allerede skjedd!",fi:"{s} – se tapahtui jo!"},
    okPresent: {en:"{s} — it is happening!",de:"{s} – das passiert gerade!",fr:"{s} : ça se passe maintenant !",es:"{s}: ¡está pasando!",pt:"{s}: está acontecendo!",it:"{s}: sta succedendo!",nl:"{s} – het gebeurt nu!",sv:"{s} – det händer nu!",da:"{s} – det sker nu!",no:"{s} – det skjer nå!",fi:"{s} – se tapahtuu nyt!"},
    okFuture: {en:"{s} — it has not happened yet!",de:"{s} – das ist noch nicht passiert!",fr:"{s} : ça n’est pas encore arrivé !",es:"{s}: ¡todavía no pasa!",pt:"{s}: ainda não aconteceu!",it:"{s}: non è ancora successo!",nl:"{s} – dat is nog niet gebeurd!",sv:"{s} – det har inte hänt än!",da:"{s} – det er ikke sket endnu!",no:"{s} – det har ikke skjedd ennå!",fi:"{s} – se ei ole vielä tapahtunut!"},
    okPair: {en:"Every photo is on its window!",de:"Jedes Foto liegt auf seinem Fenster!",fr:"Chaque photo est sur sa fenêtre !",es:"¡Cada foto está en su ventana!",pt:"Cada foto está na sua janela!",it:"Ogni foto è sulla sua finestra!",nl:"Elke foto ligt bij zijn raam!",sv:"Varje foto ligger på sitt fönster!",da:"Hvert foto ligger på sit vindue!",no:"Hvert bilde ligger på vinduet sitt!",fi:"Jokainen valokuva on omassa ikkunassaan!"},
    okFind: {en:"{W} comes from {B}!",de:"{W} kommt von {B}!",fr:"{W} vient de {B} !",es:"¡{W} viene de {B}!",pt:"{W} vem de {B}!",it:"{W} viene da {B}!",nl:"{W} komt van {B}!",sv:"{W} kommer från {B}!",da:"{W} kommer fra {B}!",no:"{W} kommer fra {B}!",fi:"{W} tulee sanasta {B}!"},
    aSentence: {en:"Sentence: {s}",de:"Satz: {s}",fr:"Phrase : {s}",es:"Oración: {s}",pt:"Frase: {s}",it:"Frase: {s}",nl:"Zin: {s}",sv:"Mening: {s}",da:"Sætning: {s}",no:"Setning: {s}",fi:"Lause: {s}"},
    aGap: {en:"gap",de:"Lücke",fr:"trou",es:"espacio",pt:"lacuna",it:"spazio",nl:"gat",sv:"lucka",da:"hul",no:"luke",fi:"aukko"},
    aCard: {en:"Card {w}",de:"Karte {w}",fr:"Carte {w}",es:"Tarjeta {w}",pt:"Cartão {w}",it:"Scheda {w}",nl:"Kaart {w}",sv:"Kort {w}",da:"Kort {w}",no:"Kort {w}",fi:"Kortti {w}"},
    aDevelop: {en:"Develop the card",de:"Karte entwickeln",fr:"Développer la carte",es:"Revelar la tarjeta",pt:"Revelar o cartão",it:"Sviluppare la scheda",nl:"Kaart ontwikkelen",sv:"Framkalla kortet",da:"Fremkald kortet",no:"Fremkall kortet",fi:"Kehitä kortti"},
    aTime: {en:"Time word: {w}",de:"Signalwort: {w}",fr:"Indicateur de temps : {w}",es:"Palabra de tiempo: {w}",pt:"Palavra de tempo: {w}",it:"Parola del tempo: {w}",nl:"Signaalwoord: {w}",sv:"Tidsord: {w}",da:"Tidsord: {w}",no:"Tidsord: {w}",fi:"Aikasana: {w}"},
    aPane: {en:"Window {w}",de:"Fenster {w}",fr:"Fenêtre {w}",es:"Ventana {w}",pt:"Janela {w}",it:"Finestra {w}",nl:"Raam {w}",sv:"Fönster {w}",da:"Vindue {w}",no:"Vindu {w}",fi:"Ikkuna {w}"},
    aPhoto: {en:"Photo {w}",de:"Foto {w}",fr:"Photo {w}",es:"Foto {w}",pt:"Foto {w}",it:"Foto {w}",nl:"Foto {w}",sv:"Foto {w}",da:"Foto {w}",no:"Bilde {w}",fi:"Valokuva {w}"},
    aType: {en:"Write the base form",de:"Schreib die Grundform",fr:"Écris l’infinitif",es:"Escribe el infinitivo",pt:"Escreva o infinitivo",it:"Scrivi l’infinito",nl:"Schrijf het hele werkwoord",sv:"Skriv grundformen",da:"Skriv navneformen",no:"Skriv infinitiven",fi:"Kirjoita perusmuoto"},
    aAlbum: {en:"Album",de:"Album",fr:"Album",es:"Álbum",pt:"Álbum",it:"Album",nl:"Album",sv:"Album",da:"Album",no:"Album",fi:"Albumi"},
    aWindow: {en:"Window",de:"Fenster",fr:"Fenêtre",es:"Ventana",pt:"Janela",it:"Finestra",nl:"Raam",sv:"Fönster",da:"Vindue",no:"Vindu",fi:"Ikkuna"},
    aPost: {en:"Post slot",de:"Briefschlitz",fr:"Fente à lettres",es:"Ranura del buzón",pt:"Fenda do correio",it:"Buca delle lettere",nl:"Brievenbus",sv:"Brevinkast",da:"Brevsprække",no:"Brevsprekk",fi:"Postiluukku"},
    srPhoto: {en:"{w} became a photo.",de:"{w} wurde ein Foto.",fr:"{w} est devenu une photo.",es:"{w} se volvió una foto.",pt:"{w} virou uma foto.",it:"{w} è diventato una foto.",nl:"{w} werd een foto.",sv:"{w} blev ett foto.",da:"{w} blev et foto.",no:"{w} ble et bilde.",fi:"{w} muuttui valokuvaksi."},
    srWindow: {en:"{w} became a live window.",de:"{w} wurde ein lebendiges Fenster.",fr:"{w} est devenu une fenêtre vivante.",es:"{w} se volvió una ventana viva.",pt:"{w} virou uma janela viva.",it:"{w} è diventato una finestra viva.",nl:"{w} werd een levend raam.",sv:"{w} blev ett levande fönster.",da:"{w} blev et levende vindue.",no:"{w} ble et levende vindu.",fi:"{w} muuttui eläväksi ikkunaksi."},
    srEnvelope: {en:"{w} became a sealed envelope.",de:"{w} wurde ein verschlossener Umschlag.",fr:"{w} est devenu une enveloppe fermée.",es:"{w} se volvió un sobre cerrado.",pt:"{w} virou um envelope fechado.",it:"{w} è diventato una busta chiusa.",nl:"{w} werd een dichte envelop.",sv:"{w} blev ett förseglat kuvert.",da:"{w} blev en lukket konvolut.",no:"{w} ble en lukket konvolutt.",fi:"{w} muuttui suljetuksi kirjekuoreksi."},
    srShutter: {en:"{w} became a window with a shutter.",de:"{w} wurde ein Fenster mit Laden.",fr:"{w} est devenu une fenêtre à volet.",es:"{w} se volvió una ventana con persiana.",pt:"{w} virou uma janela com veneziana.",it:"{w} è diventato una finestra con persiana.",nl:"{w} werd een raam met een luik.",sv:"{w} blev ett fönster med lucka.",da:"{w} blev et vindue med skodde.",no:"{w} ble et vindu med skodde.",fi:"{w} muuttui ikkunaksi, jossa on luukku."},
  },/*STRINGS-END*/

  defaults: { level: '1' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: '1', labelKey: 'l1' }, { value: '2', labelKey: 'l2' }, { value: '3', labelKey: 'l3' }, { value: '4', labelKey: 'l4' }, { value: '5', labelKey: 'l5' }, { value: '6', labelKey: 'l6' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._trays = {};
    this._timers = []; this._ro = null; this._view = {}; this._filed = { album: 0, window: 0, post: 0 }; this._fresh = null;
    injectTimeFramesCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return TimeFramesCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return TimeFramesCore.levelOf(this._setting('level')); },
  _key: function () { return this._loc() + '/' + this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = TimeFramesCore.rounds(); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._trays = {}; this._filed = { album: 0, window: 0, post: 0 }; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = TimeFramesCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._loc(), this._level(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._trays = P.trays; this._orderForPool = pool; if (pass > this._pass) this._filed = { album: 0, window: 0, post: 0 }; this._pass = pass; }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'timeframes.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t('t' + this._level()); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._fresh = null;
    this.st = TimeFramesCore.newState(this._loc(), this._level(), r, this._trays && this._trays[r]);
    this._view = { note: '', ok: '', shown: null, peek: false, glowOp: null };
    this._setPrompt();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : this._pool[0], 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'vt-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="vt-main"></div><div class="vt-foot"></div><p class="vt-note" aria-live="polite"></p><p class="vt-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _el: function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; },
  _dims: function () { var W = this._width(), B = TimeFramesCore.band(W); return { W: W, wide: B.wide, tiny: B.tiny, xs: B.xs, pic: B.wide ? 112 : B.tiny ? 72 : 80 }; },
  _img: function (pic, size, cls) { return '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="/image-library-webp/themes/' + pic + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  _sr: function (s) { var el = this._qs('.vt-sr'); if (el) el.textContent = s; },
  /* a frame: the photo (a white border, the picture still and sepia), the window (a blue frame, the picture alive), the envelope (sealed, the picture a shadow), the shutter (fi: a window with a shutter) */
  _frame: function (fr, word, pic, cls) {
    var inner = pic ? this._img(pic, 64) : '<i class="vt-ripple vt-art"></i>';
    var extra = fr === 'envelope' ? '<i class="vt-flap vt-art"></i><i class="vt-seal vt-art"></i>' : fr === 'shutter' ? '<i class="vt-shut vt-art"></i>' : fr === 'photo' ? '<i class="vt-corner c1 vt-art"></i><i class="vt-corner c2 vt-art"></i>' : '';
    return '<span class="vt-fr vt-art is-' + fr + (cls ? ' ' + cls : '') + '"><span class="vt-frpic">' + inner + '</span>' + extra + '<b>' + esc(word) + '</b></span>';
  },

  _paint_: function () {
    var C = TimeFramesCore, st = this.st, rd = st.rd, D = this._dims();
    this._wrap.className = 'vt-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.tiny ? ' is-tiny' : '') + (D.xs ? ' is-xs' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' k-' + rd.kind;
    var main = this._qs('.vt-main'); main.innerHTML = '';
    if (rd.kind === 'pick' || rd.kind === 'time') this._paintPick(main, D);
    else if (rd.kind === 'pair') this._paintPair(main, D);
    else this._paintFind(main, D);
    var foot = this._qs('.vt-foot'), self = this; foot.innerHTML = '';
    var chk = this._btn('vt-check', 'check', null, '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + esc(this._t('check')) + '</span>');
    chk.disabled = st.done; chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.vt-note'), v = this._view;
    if (v.ok) { note.textContent = v.ok; note.className = 'vt-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'vt-note is-hint'; }
    else { note.textContent = ''; note.className = 'vt-note'; }
    this._fresh = null;
  },
  /* the subject's picture(s) on the sentence card */
  _pics: function (rd, D) { var h = ''; for (var i = 0; i < Math.min(2, rd.n); i++) h += this._img(rd.pic, D.pic, 'vt-pic').replace('<img', i ? '<img style="margin-left:-' + Math.round(D.pic * 0.4) + 'px"' : '<img'); return '<span class="vt-pics' + (rd.n > 1 ? ' is-two' : '') + '" aria-hidden="true">' + h + '</span>'; },

  /* ---- levels 1–3 ---- */
  _paintPick: function (main, D) {
    var C = TimeFramesCore, st = this.st, rd = st.rd, self = this, v = this._view, glow = C.glow(st);
    var card = this._el('div', 'vt-card');
    var sent = this._el('p', 'vt-sent'), filledNow = st.gap ? C.filled(rd, st.gap) : C.filled(rd, null);
    sent.setAttribute('aria-label', this._t('aSentence', { s: st.gap ? filledNow : rd.tokens.map(function (k) { return k.t === 'g' || k.t === 'tg' ? self._t('aGap') : k.t === 'g2' ? '' : k.s; }).join('') }));
    var c = st.gap ? C.card(rd, st.gap) : null, pp = c ? C.parts(c.w) : null;
    rd.tokens.forEach(function (k) {
      if (k.t === 'w') { sent.appendChild(document.createTextNode(k.s)); return; }
      if (k.t === 'mark') {
        /* the time word: bold ink, never coloured; tapped, its opening glows */
        var tw = self._btn('vt-tw', 'tw', self._t('aTime', { w: k.s }), esc(k.s)); tw.addEventListener('click', function () { self._glowOpening(); }); sent.appendChild(tw); return;
      }
      if (k.t === 'g2') { if (pp && pp[1]) { sent.appendChild(document.createTextNode(' ')); sent.appendChild(self._el('span', 'vt-g2' + (st.done ? ' is-ok' : ''), esc(pp[1]))); } return; }
      if (!c) { sent.appendChild(self._el('span', 'vt-gap', '')); return; }
      var gb = self._btn('vt-gapw' + (st.done ? ' is-ok' : st.last === 'miss' ? ' is-bad' : ''), 'gap', self._t('aCard', { w: c.w }), esc(k.t === 'g' ? pp[0] : c.w));
      gb.disabled = st.done; gb.addEventListener('click', function () { self._back(); });
      sent.appendChild(gb);
      if (!st.done) { var eye = self._btn('vt-eye', 'develop', self._t('aDevelop'), '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12z" fill="none" stroke="#FFF" stroke-width="2.2"/><circle cx="12" cy="12" r="3" fill="#FFF"/></svg>'); eye.addEventListener('click', function () { self._peek(); }); sent.appendChild(eye); }
    });
    card.innerHTML = this._pics(rd, D); card.appendChild(sent);
    main.appendChild(card);
    /* the tray: plain paper cards */
    var tray = this._el('div', 'vt-tray');
    rd.cards.forEach(function (cd) {
      var on = st.gap === cd.tense, bt = self._btn('vt-cardw' + (on ? ' is-in' : '') + (glow && cd.tense === rd.right ? ' is-glow' : ''), 'card-' + cd.tense, self._t('aCard', { w: cd.w }), esc(cd.w));
      bt.disabled = st.done; bt.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (glow && cd.tense === rd.right) bt.innerHTML = '<span class="vt-ghostfr vt-art is-' + (rd.kind === 'pick' ? C.frame(rd.loc, cd.tense) : C.frame(rd.loc, rd.right)) + '"></span>' + esc(cd.w);
      bt.addEventListener('click', function () { self._drop(cd.tense); });
      tray.appendChild(bt);
    });
    main.appendChild(tray);
    /* the clock tower's front: the album, the window, the post slot; the developed card at its opening */
    var d = st.gap ? C.develop(st) : null, shown = v.shown || (v.peek && d ? { frame: d.frame, opening: null } : null);
    var front = this._el('div', 'vt-front vt-art');
    ['album', 'window', 'post'].forEach(function (op) {
      var box = self._el('div', 'vt-op vt-art op-' + op + (v.glowOp === op ? ' is-glow' : ''));
      box.setAttribute('role', 'img'); box.setAttribute('aria-label', self._t(op === 'album' ? 'aAlbum' : op === 'window' ? 'aWindow' : 'aPost'));
      var filed = ''; for (var i = 0; i < Math.min(5, self._filed[op]); i++) filed += '<i class="vt-mini m-' + op + '"></i>';
      box.innerHTML = '<span class="vt-opface"></span><span class="vt-filed">' + filed + '</span>';
      if (shown && shown.opening === op) {
        box.insertAdjacentHTML('beforeend', self._frame(shown.frame, C.card(rd, st.gap).w, rd.pic, shown.fits ? 'is-in' : 'is-bump'));
      }
      front.appendChild(box);
    });
    if (shown && shown.opening == null) front.insertAdjacentHTML('beforeend', '<div class="vt-peek">' + this._frame(shown.frame, C.card(rd, st.gap).w, rd.pic, 'is-peek') + '</div>');
    main.appendChild(front);
  },

  /* ---- level 4 ---- */
  _paintPair: function (main, D) {
    var C = TimeFramesCore, st = this.st, rd = st.rd, self = this, glow = C.glow(st);
    var panes = this._el('div', 'vt-panes');
    var firstLoose = st.link.indexOf(null);
    rd.pairs.forEach(function (p, i) {
      var pane = self._btn('vt-pane vt-art' + (st.locked[i] ? ' is-locked' : '') + (glow && st.sel != null && rd.photos[st.sel] === i ? ' is-glow' : ''), 'pane-' + i, self._t('aPane', { w: p.base }), '<span class="vt-panebox"><i class="vt-ripple vt-art"></i><b>' + esc(p.base) + '</b></span>');
      pane.disabled = st.done || st.locked[i] || st.sel == null;
      pane.addEventListener('click', function () { self._pane(i); });
      var slot = self._el('div', 'vt-slot');
      if (st.link[i] != null) {
        var ph = rd.pairs[rd.photos[st.link[i]]].past, b = self._btn('vt-photo is-on' + (st.locked[i] ? ' is-locked' : ''), 'photo-' + st.link[i], self._t('aPhoto', { w: ph }), esc(ph));
        b.disabled = st.done || st.locked[i]; (function (j) { b.addEventListener('click', function () { self._pick(j); }); })(st.link[i]);
        slot.appendChild(b);
      }
      var col = self._el('div', 'vt-pcol'); col.appendChild(pane); col.appendChild(slot); panes.appendChild(col);
    });
    main.appendChild(panes);
    var photos = this._el('div', 'vt-photos');
    rd.photos.forEach(function (pi, slotIdx) {
      if (st.link.indexOf(slotIdx) >= 0) return;
      var w = rd.pairs[pi].past, b = self._btn('vt-photo' + (st.sel === slotIdx ? ' is-sel' : ''), 'photo-' + slotIdx, self._t('aPhoto', { w: w }), esc(w));
      b.disabled = st.done; b.addEventListener('click', function () { self._pick(slotIdx); });
      photos.appendChild(b);
    });
    if (!photos.children.length) photos.appendChild(this._el('span', 'vt-photoempty', ''));
    main.appendChild(photos);
  },

  /* ---- levels 5–6 ---- */
  _paintFind: function (main, D) {
    var C = TimeFramesCore, st = this.st, rd = st.rd, self = this, glow = C.glow(st);
    var card = this._el('div', 'vt-card');
    var sent = this._el('p', 'vt-sent vt-find');
    rd.words.forEach(function (w, i) {
      if (w.sp != null) { sent.appendChild(document.createTextNode(w.sp)); return; }
      var cls = 'vt-word' + (st.sel === i ? ' is-sel' : '') + (st.found && w.verb ? ' is-verb' : '') + (st.last === 'miss' && st.reason === 'notVerb' && st.sel === i ? ' is-wiggle' : '') + (glow && !st.found && w.verb ? ' is-glow' : '');
      var b = self._btn(cls, 'word-' + i, null, esc(w.w)); b.disabled = st.done || st.found;
      b.addEventListener('click', function () { self._word(i); });
      sent.appendChild(b);
    });
    card.innerHTML = this._pics(rd, D); card.appendChild(sent);
    main.appendChild(card);
    /* the window the verb develops into: its base form (find), or an empty pane to write it in (write) */
    var pane = this._el('div', 'vt-basepane vt-art' + (st.found ? ' is-open' : ''));
    if (st.found && rd.kind === 'find') pane.innerHTML = '<span class="vt-panebox"><i class="vt-ripple vt-art"></i><b>' + esc(rd.base) + '</b></span>';
    else if (st.found) {
      pane.innerHTML = '<span class="vt-panebox is-write"></span>';
      var input = document.createElement('input'); input.className = 'vt-input'; input.type = 'text'; input.value = st.typed; input.setAttribute('aria-label', this._t('aType'));
      input.setAttribute('autocomplete', 'off'); input.setAttribute('autocapitalize', 'off'); input.setAttribute('spellcheck', 'false'); input.setAttribute('data-k', 'type');
      if (glow) input.setAttribute('placeholder', rd.base);
      input.disabled = st.done;
      input.addEventListener('input', function () { TimeFramesCore.type(st, input.value); self._view.note = ''; var n = self._qs('.vt-note'); if (n) { n.textContent = ''; n.className = 'vt-note'; } });
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); self._check(); } });
      pane.querySelector('.vt-panebox').appendChild(input);
    } else pane.innerHTML = '<span class="vt-panebox is-empty"></span>';
    main.appendChild(pane);
  },

  /* ---------------- the hand ---------------- */
  _moved: function () { this._clearTimers(); this._view.note = ''; this._view.ok = ''; this._view.shown = null; this._view.peek = false; },
  _drop: function (t) { var r = TimeFramesCore.drop(this.st, t); if (r === 'no') return; this._moved(); this.api.sound(r === 'in' ? 520 : 320); this._paint(); },
  _back: function () { if (TimeFramesCore.back(this.st) === 'no') return; this._moved(); this.api.sound(320); this._paint(); },
  /* free play: the card in the gap develops for a moment — no miss, no hint */
  _peek: function () {
    var st = this.st, self = this; if (st.gap == null || st.done) return;
    this._clearTimers(); this._view.peek = true; this._view.shown = null; this.api.sound(620); this._paint();
    var d = TimeFramesCore.develop(st); this._sr(this._t({ photo: 'srPhoto', window: 'srWindow', envelope: 'srEnvelope', shutter: 'srShutter' }[d.frame], { w: TimeFramesCore.card(st.rd, st.gap).w }));
    this._later(function () { if (self.st === st) { self._view.peek = false; self._paint(); } }, 1500);
  },
  /* the time word tapped: its opening glows for a moment (a reading aid) */
  _glowOpening: function () {
    var st = this.st, self = this, rd = st.rd; if (rd.kind !== 'pick') return;
    this._view.glowOp = rd.dest; this._paint();
    this._later(function () { if (self.st === st) { self._view.glowOp = null; self._paint(); } }, 1000);
  },
  _pick: function (i) { var r = TimeFramesCore.pickPhoto(this.st, i); if (r === 'no') return; this._moved(); this.api.sound(r === 'off' ? 320 : 480); this._paint(); },
  _pane: function (p) { var r = TimeFramesCore.toPane(this.st, p); if (r === 'no') return; this._moved(); this.api.sound(560); this._paint(); },
  _word: function (i) { var r = TimeFramesCore.tapWord(this.st, i); if (r === 'no') return; this._moved(); this.api.sound(480); this._paint(); },
  _type: function (s) { if (TimeFramesCore.type(this.st, s) === 'no') return; this._moved(); this._paint(); },
  _check: function () {
    var C = TimeFramesCore, st = this.st, v = this._view, rd = st.rd; if (st.done) return;
    this._clearTimers();
    var d = (rd.kind === 'pick' || rd.kind === 'time') && st.gap != null ? C.develop(st) : null;
    var res = C.check(st);
    if (res.result === 'ok') { if (d) v.shown = { frame: d.frame, opening: d.opening, fits: true }; this._success(); return; }
    v.ok = ''; v.note = this._t(C.hint(st)); v.peek = false;
    v.shown = d && res.result === 'miss' ? { frame: d.frame, opening: d.opening, fits: false } : null;
    this.api.sound(res.result === 'empty' ? 400 : res.result === 'found' ? 700 : 220); this._paint(); this.api.announce(v.note);
    if (res.result === 'found') { var inp = this._qs('.vt-input'); if (inp) try { inp.focus(); } catch (e) {} }
  },
  _success: function () {
    var C = TimeFramesCore, st = this.st, rd = st.rd, v = this._view, loc = this._loc(), msg;
    if (rd.kind === 'pick' || rd.kind === 'time') {
      var s = C.filled(rd, st.gap).replace(/[.!]$/, '');
      msg = this._t(C.okKey(rd), { s: s }); this._filed[v.shown ? v.shown.opening : rd.dest] = (this._filed[v.shown ? v.shown.opening : rd.dest] || 0) + 1;
    } else if (rd.kind === 'pair') msg = this._t('okPair');
    else msg = this._t('okFind', { W: rd.verb.toLocaleUpperCase(loc), B: rd.base.toLocaleUpperCase(loc) });
    v.note = ''; v.ok = msg; this._fresh = 'ok';
    this.api.sound(988); this._paint(); this.api.announce(msg);
    if ((rd.kind === 'pick' || rd.kind === 'time') && typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'word', text: C.filled(rd, st.gap), lang: this.api.lang, rate: 0.9 }); } catch (e) {} }
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectTimeFramesCSS() {
  if (typeof document === 'undefined' || document.getElementById('vt-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B', SKY = '#4F7FC0';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.vt-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:12px;user-select:none;-webkit-user-select:none;} .vt-wrap:focus{outline:none;}'
  + '.vt-main{display:flex;flex-direction:column;align-items:stretch;gap:12px;}'
  /* the sentence card */
  + '.vt-card{display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:12px;background:#FFFDF4;box-shadow:inset 0 0 0 3px #D9C29A,0 4px 0 #D9C29A;}'
  + '.vt-pics{flex:none;display:flex;} .vt-pic{display:block;object-fit:contain;}'
  + '.vt-sent{flex:1;min-width:0;margin:0;font-family:' + H + ';font-weight:800;font-size:28px;line-height:1.7;color:' + INK + ';overflow-wrap:break-word;}'
  + '.vt-tw{display:inline-block;min-width:44px;max-width:100%;min-height:44px;vertical-align:baseline;text-align:center;padding:0;border:0;background:none;font:inherit;color:' + INK + ';text-decoration:underline dotted 3px #9C7A4A;text-underline-offset:6px;cursor:pointer;}'
  + '.vt-gap{display:inline-block;vertical-align:middle;width:110px;height:42px;margin:0 4px;border-radius:8px;border:3px dashed #B98A55;box-sizing:border-box;}'
  + '.vt-gapw{display:inline-block;vertical-align:middle;min-height:44px;min-width:44px;margin:0 2px;padding:0 10px;border:0;border-radius:8px;background:#F3E2C4;box-shadow:inset 0 0 0 3px #B98A55;font:inherit;color:#7A4A1E;cursor:pointer;} .vt-gapw.is-ok{background:#DDF1EC;color:#146B5E;box-shadow:inset 0 0 0 3px #2E8C7E;} .vt-gapw.is-bad{box-shadow:inset 0 0 0 3px #F2784B;}'
  + '.vt-g2{padding:0 4px;border-radius:6px;background:#F3E2C4;color:#7A4A1E;} .vt-g2.is-ok{background:#DDF1EC;color:#146B5E;}'
  + '.vt-eye{display:inline-flex;vertical-align:middle;align-items:center;justify-content:center;width:44px;height:44px;margin-left:4px;border:0;border-radius:50%;background:#7A5638;box-shadow:0 3px 0 #4A321F;cursor:pointer;}'
  /* the tray */
  + '.vt-tray{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;}'
  + '.vt-cardw{position:relative;min-width:120px;min-height:56px;padding:6px 16px;border:0;border-radius:10px;background:#FFF8E8;box-shadow:inset 0 0 0 3px #C9B48E,0 4px 0 #C9B48E;font-family:' + H + ';font-weight:800;font-size:24px;color:' + INK + ';cursor:pointer;}'
  + '.vt-cardw.is-in{opacity:.45;} .vt-cardw:disabled{cursor:default;} .vt-cardw.is-glow{box-shadow:inset 0 0 0 3px #2E8C7E,0 0 0 5px rgba(46,140,126,.3),0 4px 0 #1B5F55;transform:translateY(-6px);}'
  + '.vt-ghostfr{position:absolute;inset:3px;border-radius:8px;opacity:.4;pointer-events:none;} .vt-ghostfr.is-photo{box-shadow:inset 0 0 0 6px #FFF,inset 0 0 0 8px #B9A07C;} .vt-ghostfr.is-window,.vt-ghostfr.is-shutter{box-shadow:inset 0 0 0 6px ' + SKY + ';} .vt-ghostfr.is-envelope{background:linear-gradient(135deg,transparent 48%,#C8503A 50%,transparent 52%),linear-gradient(225deg,transparent 48%,#C8503A 50%,transparent 52%);}'
  /* the tower front */
  + '.vt-front{position:relative;display:flex;justify-content:center;gap:18px;padding:16px 14px 14px;border-radius:14px 14px 6px 6px;background:repeating-linear-gradient(0deg,#CFC3AE 0 22px,#C2B49B 22px 24px);box-shadow:inset 0 0 0 3px #8C7A5A;}'
  + '.vt-op{position:relative;flex:1 1 0;max-width:170px;min-height:150px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:6px;border-radius:10px;box-sizing:border-box;transition:box-shadow .2s;}'
  + '.vt-op.is-glow{box-shadow:0 0 0 5px rgba(244,207,98,.85);}'
  + '.op-album{background:#EFE3C8;box-shadow:inset 0 0 0 3px #8C6239;} .op-album .vt-opface{position:absolute;inset:10px;background:linear-gradient(135deg,#8C6239 0 12px,transparent 12px),linear-gradient(225deg,#8C6239 0 12px,transparent 12px),linear-gradient(45deg,#8C6239 0 12px,transparent 12px),linear-gradient(315deg,#8C6239 0 12px,transparent 12px);opacity:.75;}'
  + '.op-window{background:#BFD9F2;box-shadow:inset 0 0 0 5px ' + SKY + ';} .op-window .vt-opface{position:absolute;left:50%;top:6px;bottom:22px;width:4px;margin-left:-2px;background:' + SKY + ';} .op-window::after{content:"";position:absolute;left:-6px;right:-6px;bottom:-6px;height:14px;border-radius:4px;background:#8C6239;}'
  + '.op-post{background:#C8503A;box-shadow:inset 0 0 0 3px #8C2E2B;} .op-post .vt-opface{position:absolute;left:18%;right:18%;top:30px;height:14px;border-radius:7px;background:#3A2616;box-shadow:0 0 0 4px #D6A846;}'
  + '.vt-filed{position:relative;display:flex;gap:3px;justify-content:center;min-height:14px;} .vt-mini{display:block;width:16px;height:12px;border-radius:2px;} .m-album{background:#FFF;box-shadow:inset 0 0 0 2px #B9A07C;} .m-window{background:#BFD9F2;box-shadow:inset 0 0 0 2px ' + SKY + ';} .m-post{background:#FFF8E8;box-shadow:inset 0 0 0 2px #C8503A;}'
  /* the frames */
  + '.vt-fr{position:absolute;left:50%;top:50%;z-index:2;display:flex;flex-direction:column;align-items:center;gap:2px;width:104px;margin-left:-52px;margin-top:-52px;padding:6px 6px 4px;border-radius:6px;box-sizing:border-box;font-family:' + H + ';font-weight:800;font-size:15px;line-height:1.1;color:' + INK + ';text-align:center;}'
  + '.vt-fr b{display:block;max-width:100%;overflow-wrap:anywhere;} .vt-frpic{display:flex;justify-content:center;} .vt-frpic img{display:block;width:64px;height:64px;object-fit:contain;}'
  + '.vt-fr.is-photo{background:#FFF;box-shadow:0 0 0 2px #B9A07C,0 4px 8px rgba(0,0,0,.18);} .vt-fr.is-photo img{filter:sepia(.85) saturate(.7);}'
  + '.vt-fr.is-window,.vt-fr.is-shutter{background:#E4F0FB;box-shadow:inset 0 0 0 5px ' + SKY + ',0 4px 8px rgba(0,0,0,.18);} .vt-fr.is-window img,.vt-fr.is-shutter img{animation:vtSway 1.6s ease-in-out infinite;} @keyframes vtSway{0%,100%{transform:rotate(-4deg);}50%{transform:rotate(4deg) translateY(-3px);}}'
  + '.vt-shut{position:absolute;left:5px;right:5px;top:5px;height:34%;background:repeating-linear-gradient(0deg,#6E8FBE 0 5px,#5A7BAA 5px 7px);border-radius:2px;}'
  + '.vt-fr.is-envelope{background:#FFF3DC;box-shadow:inset 0 0 0 2px #C9A46A,0 4px 8px rgba(0,0,0,.18);} .vt-fr.is-envelope img{opacity:.22;filter:blur(1.5px);} .vt-flap{position:absolute;left:0;right:0;top:0;height:46%;clip-path:polygon(0 0,100% 0,50% 100%);background:#F2DFB8;} .vt-seal{position:absolute;left:50%;top:38%;width:18px;height:18px;margin-left:-9px;border-radius:50%;background:#C8503A;box-shadow:0 0 0 2px #8C2E2B;}'
  + '.vt-corner{position:absolute;width:10px;height:10px;background:#B9A07C;} .vt-corner.c1{left:0;top:0;clip-path:polygon(0 0,100% 0,0 100%);} .vt-corner.c2{right:0;bottom:0;clip-path:polygon(100% 0,100% 100%,0 100%);}'
  + '.vt-fr.is-in{animation:vtIn .45s ease-out;} @keyframes vtIn{0%{transform:translateY(-60px) scale(1.1);opacity:.3;}}'
  + '.vt-fr.is-bump{top:46%;margin-top:-52px;transform:rotate(-8deg);box-shadow:0 0 0 3px #F2784B,0 4px 8px rgba(0,0,0,.18);animation:vtBump .5s ease-out;} @keyframes vtBump{0%{transform:translateY(-40px) rotate(0);}60%{transform:translateY(6px) rotate(-10deg);}}'
  + '.vt-peek{position:absolute;left:50%;top:-24px;width:0;height:0;} .vt-peek .vt-fr{top:0;margin-top:-60px;}'
  + '.vt-ripple{display:block;width:56px;height:40px;background:repeating-linear-gradient(170deg,transparent 0 7px,rgba(79,127,192,.45) 7px 9px);border-radius:4px;animation:vtRip 2s linear infinite;} @keyframes vtRip{to{background-position:0 18px;}}'
  /* level 4 */
  + '.vt-panes{display:flex;justify-content:center;gap:14px;} .vt-pcol{flex:1 1 0;max-width:180px;display:flex;flex-direction:column;align-items:stretch;gap:8px;}'
  + '.vt-pane{min-height:96px;padding:0;border:0;border-radius:10px;background:none;cursor:pointer;} .vt-pane:disabled{cursor:default;}'
  + '.vt-panebox{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-height:96px;padding:8px;border-radius:10px;background:#E4F0FB;box-shadow:inset 0 0 0 5px ' + SKY + ';font-family:' + H + ';font-weight:800;font-size:24px;color:' + INK + ';box-sizing:border-box;}'
  + '.vt-pane.is-glow .vt-panebox{box-shadow:inset 0 0 0 5px #2E8C7E,0 0 0 5px rgba(46,140,126,.3);} .vt-pane.is-locked .vt-ripple{animation:none;opacity:.3;} .vt-pane.is-locked .vt-panebox{background:#F3E2C4;box-shadow:inset 0 0 0 5px #B9A07C;}'
  + '.vt-slot{display:flex;justify-content:center;min-height:56px;}'
  + '.vt-photos{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;min-height:56px;} .vt-photoempty{display:block;height:56px;}'
  + '.vt-photo{min-width:96px;min-height:52px;padding:4px 12px;border:0;border-radius:4px;background:#FFF;box-shadow:inset 0 0 0 5px #FFF,inset 0 0 0 7px #B9A07C,0 4px 6px rgba(0,0,0,.15);font-family:' + H + ';font-weight:800;font-size:22px;color:#6E4F18;cursor:pointer;}'
  + '.vt-photo.is-sel{transform:translateY(-6px) rotate(-3deg);box-shadow:inset 0 0 0 5px #FFF,inset 0 0 0 7px #7A5638,0 8px 10px rgba(0,0,0,.2);} .vt-photo.is-on{transform:rotate(3deg);} .vt-photo.is-locked{box-shadow:inset 0 0 0 5px #FFF,inset 0 0 0 7px #2E8C7E;color:#146B5E;}'
  /* levels 5–6 */
  + '.vt-word{display:inline-block;min-height:44px;min-width:44px;margin:2px 0;padding:0 4px;border:0;border-radius:8px;background:transparent;font:inherit;color:' + INK + ';cursor:pointer;} .vt-word.is-sel{background:#F3E2C4;box-shadow:inset 0 0 0 3px #B98A55;} .vt-word.is-verb{background:#DDF1EC;color:#146B5E;box-shadow:inset 0 0 0 3px #2E8C7E;} .vt-word.is-glow{box-shadow:inset 0 0 0 3px #2E8C7E,0 0 0 4px rgba(46,140,126,.3);} .vt-word:disabled{cursor:default;}'
  + '.vt-word.is-wiggle{animation:vtWig .4s;} @keyframes vtWig{25%{transform:rotate(-6deg);}75%{transform:rotate(6deg);}}'
  + '.vt-basepane{display:flex;justify-content:center;} .vt-basepane .vt-panebox{min-width:220px;} .vt-panebox.is-empty{background:#F4EDE0;box-shadow:inset 0 0 0 3px #D9C29A;}'
  + '.vt-input{width:180px;min-height:48px;padding:4px 10px;border:0;border-radius:8px;background:#FFF;box-shadow:inset 0 0 0 3px #8C6239;font-family:' + H + ';font-weight:800;font-size:26px;color:' + INK + ';text-align:center;} .vt-input::placeholder{color:#B9A07C;}'
  + '.vt-foot{display:flex;justify-content:center;} .vt-check{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:54px;padding:8px 26px;border:0;border-radius:16px;background:#146B5E;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0D4A41;cursor:pointer;} .vt-check:disabled{opacity:.5;cursor:default;}'
  + '.vt-note{margin:0;min-height:1.3em;max-width:640px;align-self:center;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .vt-note.is-hint{color:#8A3B1F;}'
  + '.vt-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones */
  + '.vt-wrap.is-narrow{gap:9px;} .vt-wrap.is-narrow .vt-main{gap:9px;} .vt-wrap.is-narrow .vt-card{gap:8px;padding:6px 8px;} .vt-wrap.is-narrow .vt-sent{font-size:22px;line-height:1.75;}'
  + '.vt-wrap.is-narrow .vt-gap{width:80px;height:38px;} .vt-wrap.is-narrow .vt-cardw{min-width:min-content;flex:1 1 auto;max-width:170px;font-size:19px;padding:4px 6px;min-height:52px;} .vt-wrap.is-narrow .vt-tray{gap:8px;flex-wrap:nowrap;} .vt-wrap.is-narrow .vt-cardw::before{content:"";display:block;width:36px;height:0;margin:0 auto;}'
  + '.vt-wrap.is-narrow .vt-front{gap:8px;padding:12px 8px 12px;} .vt-wrap.is-narrow .vt-op{min-height:120px;} .vt-wrap.is-narrow .vt-fr{width:86px;margin-left:-43px;margin-top:-44px;font-size:13px;} .vt-wrap.is-narrow .vt-frpic img{width:52px;height:52px;}'
  + '.vt-wrap.is-tiny .vt-front{gap:6px;padding:12px 6px;} .vt-wrap.is-tiny .vt-fr{width:72px;margin-left:-36px;padding:4px 4px 3px;font-size:12px;} .vt-wrap.is-tiny .vt-frpic img{width:42px;height:42px;} .vt-wrap.is-tiny .vt-fr.is-bump{transform:rotate(-4deg);}'
  + '.vt-wrap.is-narrow .vt-panes{gap:8px;} .vt-wrap.is-narrow .vt-panebox{font-size:19px;min-height:84px;} .vt-wrap.is-narrow .vt-photo{font-size:18px;min-width:80px;padding:4px 8px;} .vt-wrap.is-narrow .vt-photos{gap:8px;}'
  + '.vt-wrap.is-narrow .vt-check{min-height:48px;min-width:130px;padding:6px 18px;font-size:20px;} .vt-wrap.is-narrow .vt-note{font-size:17px;}'
  + '.vt-wrap.is-tiny .vt-sent{font-size:20px;} .vt-wrap.is-tiny .vt-cardw{font-size:16px;flex:1 1 auto;min-width:min-content;padding:4px 5px;} .vt-wrap.is-tiny .vt-tray{gap:6px;} .vt-wrap.is-tiny .vt-op{min-height:104px;} .vt-wrap.is-tiny.is-done{gap:8px;} .vt-wrap.is-tiny.is-done .vt-main{gap:8px;} .vt-wrap.is-tiny.is-done .vt-op{min-height:84px;} .vt-wrap.is-tiny.is-done .vt-front{padding:8px 6px;} .vt-wrap.is-tiny.is-done .vt-card{padding:6px 10px;} .vt-wrap.is-tiny .vt-panebox{font-size:17px;}'
  /* a solved round on a phone: the tray and Check give their room to the shell's Next */
  + '.vt-wrap.is-narrow.is-done .vt-tray,.vt-wrap.is-narrow.is-done .vt-foot,.vt-wrap.is-narrow.is-done .vt-photos{display:none;}'
  + '.vt-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.vt-wrap *{animation:none !important;transition:none !important;}}'
  + '.vt-wrap button:focus-visible,.vt-input:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'vt-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.TimeFramesActivity = TimeFramesActivity;
