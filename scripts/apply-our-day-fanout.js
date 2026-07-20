#!/usr/bin/env node
/* =====================================================================
   apply-our-day-fanout.js — applies the 10-agent native fan-out for
   Our Day (tool #20):
     1. strings + NAMES corrections into `mini tools/our-day.js`
        (per-line locale-segment rewrite; every miss is FATAL)
     2. the ANNOUNCE block replaced wholesale (fi complete 44-entry
        table + new de/nl/sv tables) + a new fi TIME_NAMES table wired
        into timeSentence
     3. per-locale frame overrides (es NOW/TIME frames; sv TIME frame)
     4. card-set rulings: breakfast → de/es/fi (nl tien-uurtje drop),
        aftercare → 8 locales, honores → es/pt, brushing → pt/de,
        NEW it-only `italiano` card (+ icon + NAMES row)
     5. ToolEntry into tool-content/<locale>.json ×10
     6. the manipulatives entry (11 locales)
   STANDING SLUG GATE: every new slug checked against EVERY tool slug
   AND worksheet-MAKER slug across all 11 locale files.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const TOOL = path.join(REPO, 'mini tools', 'our-day.js');
const LOCS = ['de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const ALL = ['en'].concat(LOCS);

const FANOUT = {
  "de": {
    "strings": {
      "sunAria": "Die Sonne — antippen, dann wandert sie zur nächsten Aktivität",
      "changeSpoken": "Heute ist etwas anders: Wir haben {nw} statt {old}.",
      "setVoice": "Aktivitäten und Uhrzeiten ansagen",
      "setCues": "Töne"
    },
    "names": {
      "home": "Schulschluss",
      "phonics": "Buchstabenzeit",
      "storytime": "Vorlesen",
      "washhands": "Händewaschen",
      "stations": "Freiarbeit",
      "computers": "Tablet-Zeit",
      "assembly": "Schulversammlung",
      "guest": "Vertretung",
      "religion": "Religion",
      "brushing": "Zähneputzen"
    },
    "announce": {
      "home": "Nachhausegehen",
      "celebrate": "Feiern"
    },
    "cardSetChanges": {
      "aftercareAddDe": true,
      "brushingAddDe": true
    },
    "toolEntry": {
      "slug": "unser-tag",
      "name": "Unser Tag",
      "tagline": "Der visuelle Tagesplan: Bildkarten, eine wandernde Sonne und ein ruhiges Ritual, wenn etwas anders ist.",
      "metaTitle": "Visueller Tagesplan für Grundschule & Kita | Unser Tag",
      "metaDescription": "Die digitale Tagestransparenz für Grundschule und Kita: Bildkarten machen den Tagesablauf sichtbar, eine freundliche Sonne zeigt, was gerade dran ist.",
      "about": [
        "Unser Tag macht den Tagesablauf sichtbar — als digitale Tagestransparenz für Tafel, Whiteboard oder Beamer. Aus über vierzig Bildkarten baut ihr in einer halben Minute den heutigen Tagesstreifen: Ankommen, Morgenkreis, Buchstabenzeit, Hofpause. Eine freundliche Sonne wandert von Karte zu Karte und zeigt, was gerade dran ist — weitergetippt wird sie von einem Menschen, nie von der Uhr. Erledigte Karten klappen sanft ein und bleiben den ganzen Tag sichtbar. Gerade Kinder, die Verlässlichkeit brauchen — auch autistische Kinder — finden in diesem immer gleichen Ablauf Halt. Und wenn etwas anders ist, gibt es ein ruhiges Änderungsritual: Die neue Karte kommt in den Streifen, „vorher: Sport“ bleibt klein und gut lesbar stehen.",
        "Mit Premium bekommen die Karten Uhrzeiten mit kleiner Analog- und Digitaluhr, und die Ansagestimme sagt sie so, wie man wirklich spricht: „Mittagessen ist um halb 1.“ Wochenpläne für Montag bis Freitag lassen sich speichern und liegen morgens automatisch bereit, und der fertige Tagesplan lässt sich als Streifen für den Tisch ausdrucken — für Kinder, die ihren eigenen Plan in der Hand halten möchten. Ehrlich aufgeteilt: Den Tag bauen — mit der Sonne, dem Änderungsritual und allen Aktivitätskarten — ist dauerhaft kostenlos; Uhrzeiten, Stimme, Wochenpläne und Druck gehören zu Premium."
      ],
      "howToUse": [
        "Tippt morgens links auf die Bildkarten — jede landet sofort im Tagesstreifen. Die Reihenfolge lässt sich jederzeit noch ändern.",
        "Tippt auf „Den Tag beginnen“: Die Sonne stellt sich auf die erste Karte und sagt an, womit der Tag anfängt.",
        "Nach jeder Aktivität tippt ihr — oder euer Tagesplan-Kind — auf die Sonne. Sie wandert weiter, die fertige Karte klappt sanft ein.",
        "Wenn sich etwas ändert, tippt auf die betroffene Karte und wählt Tauschen, Herausnehmen oder Einfügen — die alte Aktivität bleibt als „vorher: …“ sichtbar, damit kein Kind den Faden verliert."
      ],
      "classroomIdeas": [
        "Tagesplan-Dienst: Jede Woche darf ein anderes Kind die Sonne weitertippen — ein echtes Ämtchen, das Struktur gibt und stolz macht.",
        "Im Morgenkreis den Streifen gemeinsam durchgehen und den Tag versprachlichen: „Hofpause kommt nach Mathe.“ So üben die Kinder Zeitbegriffe ganz nebenbei.",
        "Für einzelne Kinder, die ihren eigenen Plan brauchen, den Tagesstreifen ausdrucken und auf den Tisch legen — Erledigtes wird mit dem Stift abgehakt, genau wie an der Tafel."
      ]
    },
    "manip": {
      "title": "Unser Tag",
      "tagline": "Bildkarten und eine wandernde Sonne zeigen, was heute kommt und was gerade dran ist.",
      "description": "Baut den Tag aus Bildkarten zu einem Streifen und lasst die Sonne von Karte zu Karte wandern. Ein ruhiges Änderungsritual hilft, wenn etwas anders läuft als geplant — die alte Karte bleibt klein und lesbar stehen. Mit Premium sagen die Karten ihre Uhrzeiten so an, wie man wirklich spricht."
    }
  },
  "fr": {
    "strings": {
      "changeSpoken": "Changement : aujourd’hui, c’est {nw} qui remplace {old}.",
      "removedNote": "{name}, ce sera pour un autre jour.",
      "timeAria": "Régler l’heure pour {name}",
      "tmplUse": "Le garder",
      "grpCare": "Repas & soins",
      "setVoice": "Annoncer les activités et les heures"
    },
    "names": {
      "outdoor": "les jeux dehors",
      "guest": "l’intervenant"
    },
    "announce": {},
    "cardSetChanges": {
      "aftercareAddFr": true
    },
    "toolEntry": {
      "slug": "notre-journee",
      "name": "Notre journée",
      "tagline": "La frise de la journée en version interactive : des cartes illustrées et un soleil qui avance au rythme de la classe.",
      "metaTitle": "Frise de la journée maternelle — emploi du temps visuel gratuit",
      "metaDescription": "Construisez votre frise de la journée : cartes illustrées, soleil qui avance, rituel du changement. Emploi du temps visuel gratuit pour la maternelle et le CP.",
      "about": [
        "Notre journée transforme la frise de la journée — cet emploi du temps visuel affiché dans presque toutes les classes de maternelle — en un grand affichage interactif pour le vidéoprojecteur ou le TNI. En une trentaine de secondes, vous touchez les cartes illustrées (l’accueil, le regroupement, les ateliers, la cantine, la récréation, la sieste…) pour construire le déroulé du jour. Ensuite, c’est un humain qui fait avancer le soleil : vous, ou votre responsable de la journée. À chaque étape, la carte terminée se replie doucement et la classe entend « Maintenant, c’est la récréation ! ». Aucun compte à rebours, aucune course contre la montre : l’outil ne compare jamais l’horloge au programme.",
        "Quand quelque chose change — piscine annulée, intervenant en retard — le rituel du changement remplace la carte en trois gestes, en gardant l’ancienne visible en petit (« avant : la motricité ») pour rassurer les enfants qui ont besoin de prévisibilité. Construire la journée, avec toutes les cartes et le soleil, est gratuit, sans compte. La version Premium ajoute les heures sur les cartes, dites à la française (« La cantine, c’est à midi et demi. »), la voix qui annonce les activités, les plans de la semaine enregistrés et l’impression du déroulé."
      ],
      "howToUse": [
        "Touchez les cartes à gauche pour construire la journée du jour — vous pouvez répéter une carte, et en placer jusqu’à 16.",
        "Appuyez sur « Commencer la journée », puis projetez la frise : le soleil se pose sur la première activité.",
        "À chaque transition, touchez le soleil (ou laissez votre responsable du jour le faire) : la carte terminée se replie et la suivante s’annonce.",
        "En cas d’imprévu, touchez une carte puis « Remplacer », « Retirer » ou « Ajouter » : l’ancienne activité reste visible en petit pour rassurer la classe."
      ],
      "classroomIdeas": [
        "Nommez un « responsable de la journée » : à chaque transition, c’est cet enfant qui vient faire avancer le soleil — un rituel très attendu qui rend le temps concret.",
        "Lors du regroupement du matin, lisez la frise ensemble : « On commence la journée avec l’accueil… la récréation vient après les maths » — un vrai travail sur la structuration du temps.",
        "Pour les enfants anxieux face aux imprévus, utilisez la carte « changement » de façon systématique : montrer ce qui change, et ce qui ne change pas, apaise beaucoup les transitions."
      ]
    },
    "manip": {
      "title": "Notre journée",
      "tagline": "L’emploi du temps visuel de la classe, avec un soleil qui avance de carte en carte.",
      "description": "Construisez la frise de la journée avec des cartes illustrées, puis faites avancer le soleil à chaque transition : la carte terminée se replie et l’activité suivante s’annonce. Un rituel du changement en trois gestes rassure les enfants quand le programme bouge. Gratuit à projeter, sans compte."
    }
  },
  "it": {
    "strings": {
      "changeTitle": "Oggi qualcosa è cambiato",
      "changeSwap": "Cambia",
      "changeSpoken": "Cambio di programma: oggi c’è {nw}, non {old}.",
      "removedNote": "{name} passa a un altro giorno.",
      "dayFull": "La giornata è piena — il massimo è 16 carte.",
      "grpArrival": "Arrivo e uscita",
      "grpCare": "Pasti e cura",
      "grpMove": "Movimento e aria aperta",
      "timeAria": "Imposta l’orario per {name}",
      "setVoice": "Leggi attività e orari a voce alta",
      "gatePremium": "Gli orari sulle carte, la voce che legge, i piani della settimana e la stampa fanno parte di Premium. Costruire la giornata — con il sole, i cambi di programma e tutte le attività — resta sempre gratuito."
    },
    "names": {
      "phonics": "l’alfabeto",
      "science": "la scienza",
      "crafts": "il lavoretto",
      "washhands": "il lavaggio delle mani",
      "pe": "la motoria",
      "outdoor": "il gioco all’aperto",
      "forest": "la passeggiata nella natura",
      "dance": "il ballo",
      "stations": "il laboratorio",
      "computers": "il tablet",
      "calendar": "il calendario e il meteo",
      "visitor": "l’ospite",
      "change": "il cambio di programma"
    },
    "announce": {},
    "cardSetChanges": {
      "addItaliano": true
    },
    "toolEntry": {
      "slug": "la-nostra-giornata",
      "name": "La nostra giornata",
      "tagline": "L’agenda visiva della classe: carte illustrate e un sole che accompagna i bambini lungo tutta la giornata.",
      "metaTitle": "Agenda visiva della giornata — scuola dell’infanzia e primaria",
      "metaDescription": "Costruisci la giornata scolastica con carte illustrate: i bambini vedono cosa c’è adesso e cosa viene dopo. Agenda visiva calma, senza timer, in italiano.",
      "about": [
        "La nostra giornata è un’agenda visiva da proiettare in classe: una striscia di carte illustrate che racconta la giornata dall’accoglienza all’uscita. Si costruisce in mezzo minuto toccando le carte, poi un sole gentile accompagna la classe da un’attività all’altra: le carte finite si ripiegano con calma e restano visibili tutto il giorno. Ogni bambino vede che cosa c’è adesso e che cosa viene dopo — e quando il programma cambia, un piccolo rituale in tre tocchi mostra il cambio senza agitazione, con la vecchia attività ancora leggibile in piccolo, perché i bambini più ansiosi hanno bisogno di capire, non di indovinare.",
        "Costruire e usare la giornata è gratuito, per sempre: tutte le carte, il sole, i cambi di programma e la modalità proiezione. Con Premium si aggiungono gli orari sulle carte, letti come si dice davvero — «La mensa comincia quando l’orologio segna mezzogiorno e mezzo» — la voce che annuncia le attività, i piani salvati per ogni giorno della settimana e la stampa della striscia da appendere in classe. Niente timer e niente conti alla rovescia: questo strumento non mette fretta a nessuno."
      ],
      "howToUse": [
        "Tocca le carte a sinistra per comporre la giornata di oggi — una carta si può ripetere tutte le volte che serve.",
        "Tocca «Inizia la giornata»: il sole si posa sulla prima attività.",
        "Quando un’attività finisce, tocca il sole: la carta si ripiega e la classe sente che cosa c’è adesso.",
        "Se il programma cambia, tocca la carta e scegli: cambia, togli o aggiungi — la vecchia attività resta indicata in piccolo."
      ],
      "classroomIdeas": [
        "Nomina ogni mattina un responsabile della giornata: è lui o lei a far avanzare il sole — un incarico perfetto per la routine dell’infanzia.",
        "Per i bambini che soffrono i cambiamenti, usa il cambio di programma come rituale fisso: si nomina ciò che oggi non c’è, si accoglie ciò che arriva.",
        "Stampa la striscia della giornata e appendila accanto alla porta, oppure mettila sul banco di chi ha bisogno di averla sempre vicina."
      ]
    },
    "manip": {
      "title": "La nostra giornata",
      "tagline": "Carte illustrate e un sole gentile che mostra ai bambini cosa c’è adesso e cosa viene dopo.",
      "description": "Costruisci il programma di oggi con le carte illustrate e lascia che il sole segni l’attività in corso. Le carte finite si ripiegano con calma e i cambi di programma diventano un piccolo rituale rassicurante. Senza timer e senza fretta, dall’accoglienza all’uscita."
    }
  },
  "es": {
    "strings": {
      "grpCare": "Comer y descansar",
      "grpMove": "Movimiento y aire libre",
      "timeAria": "Poner la hora para {name}",
      "tmplReady": "{day}: el plan está listo — ¿cambiamos algo?",
      "changeSpoken": "Cambio: hoy cambiamos {old} por {nw}.",
      "removedNote": "Guardamos {name} para otro día.",
      "afterFrame": "{a}, cuando terminemos con {b}.",
      "firstFrame": "{a}: así empezamos el día.",
      "setVoice": "Leer las actividades y las horas en voz alta"
    },
    "frames": {
      "NOW_FRAME": "¡Ahora vamos con {a}!",
      "TIME_FRAME": "{a}, a {t}."
    },
    "names": {
      "tidyup": "la hora de guardar",
      "lunch": "la comida",
      "washhands": "el lavado de manos",
      "brainbreak": "la activación física",
      "forest": "el día en la naturaleza",
      "breakfast": "el desayuno"
    },
    "announce": {},
    "cardSetChanges": {
      "breakfastAddEs": true
    },
    "toolEntry": {
      "slug": "nuestro-dia",
      "name": "Nuestro día",
      "tagline": "La agenda visual de toda la jornada: tarjetas ilustradas, un sol que avanza y cambios anunciados sin sorpresas.",
      "metaTitle": "Agenda visual y horario del día para preescolar | Nuestro día",
      "metaDescription": "Arma el horario del día con tarjetas ilustradas y un sol que avanza actividad por actividad. Rutinas predecibles para preescolar y primaria baja, gratis.",
      "about": [
        "Nuestro día convierte el horario en algo que los niños pueden ver y tocar: una tira de tarjetas ilustradas —la llegada, el círculo de la mañana, el refrigerio, el recreo— y un sol que una persona mueve de tarjeta en tarjeta. Saber qué sigue calma; para los niños con ansiedad o autistas, esa predictibilidad vale oro. Por eso el sol nunca corre solo con el reloj: lo avanza la maestra o el encargado del día, y cuando algo cambia, una tarjeta amable lo anuncia con tiempo, sin sustos.",
        "Armar el día es gratis y lo será siempre: todas las tarjetas, el sol, los cambios y el modo de pantalla para proyectar toda la jornada. Con Premium se suman las cosas que ahorran tiempo: horas en cada tarjeta con reloj de manecillas y digital, la voz que anuncia cada actividad («La comida, a las doce y media»), planes guardados de lunes a viernes y la versión para imprimir. Si solo necesitas la rutina visual, la versión gratuita está completa."
      ],
      "howToUse": [
        "Toca las tarjetas de la izquierda para armar el día de hoy; puedes repetir las que ocurren varias veces, como el recreo.",
        "Pulsa «Empezar el día» y proyecta la tira: el sol se queda en la actividad actual.",
        "Cuando termine una actividad, tú o el encargado del día tocan el sol para pasar a la siguiente.",
        "¿Cambió el plan? Toca la tarjeta y elige cambiarla, quitarla o agregar otra; la actividad anterior queda visible en pequeño: «antes: la educación física»."
      ],
      "classroomIdeas": [
        "Nombra cada semana a un «encargado del sol»: mover el sol es una comisión rotativa que refuerza la secuencia del día y el sentido de responsabilidad.",
        "Convierte la tarjeta de cambio en un ritual: reúne al grupo, muestren juntos qué cambió y qué sigue igual. Para quien se angustia con las sorpresas, verlo con anticipación lo cambia todo.",
        "Con Premium, imprime la tira del día y pégala en la banca de quien la necesite cerca: una mini agenda personal idéntica a la del pizarrón."
      ]
    },
    "manip": {
      "title": "Nuestro día",
      "tagline": "El horario visual de toda la jornada, con un sol que avanza tarjeta por tarjeta.",
      "description": "Arma la rutina del día con tarjetas ilustradas y proyéctala en grande. El sol marca qué toca ahora, los cambios se anuncian con calma y sin sorpresas, y con Premium cada tarjeta puede decir su hora en voz alta."
    }
  },
  "pt": {
    "strings": {
      "changeSpoken": "Mudança: hoje temos {nw}, e não {old}.",
      "afterFrame": "{a} vem depois que {b} termina.",
      "firstFrame": "{a} abre o nosso dia.",
      "timeAria": "Definir o horário: {name}",
      "printNotes": "Anotações",
      "setVoice": "Ler as atividades e os horários em voz alta",
      "grpCare": "Comida e cuidados"
    },
    "names": {
      "packup": "a hora da mochila",
      "storytime": "a hora da história",
      "phonics": "a hora das letras",
      "science": "ciências",
      "crafts": "a hora das atividades manuais",
      "washhands": "a hora de lavar as mãos",
      "bathroom": "a hora do banheiro",
      "stations": "a hora dos cantinhos",
      "computers": "a hora do tablet",
      "calendar": "a hora do calendário",
      "honores": "a hora cívica",
      "aftercare": "o contraturno"
    },
    "announce": {},
    "cardSetChanges": {
      "honoresAddPt": true,
      "aftercareAddPt": true
    },
    "toolEntry": {
      "slug": "nosso-dia",
      "name": "Nosso dia",
      "tagline": "A rotina do dia em cartões ilustrados: o sol avança, a turma antecipa o que vem e ninguém se perde.",
      "metaTitle": "Quadro de rotina visual para educação infantil – Nosso dia",
      "metaDescription": "Monte o quadro de rotina do dia com cartões ilustrados: o sol avança pelas atividades, mudanças viram ritual tranquilo e a turma sabe o que vem agora. Grátis.",
      "about": [
        "Toda professora de Educação Infantil sabe: quando a criança enxerga o que vem depois, o dia flui. Nosso dia transforma a rotina em um quadro visual grande e bonito — a acolhida, a roda de conversa, o lanche, o parquinho — com um sol que caminha de cartão em cartão conforme o dia acontece. Essa previsibilidade acalma a turma inteira e é um apoio precioso para crianças ansiosas ou autistas, que se organizam muito melhor quando conseguem antecipar cada momento. É a rotina como a BNCC propõe para a Educação Infantil: tempo estruturado, previsível e acolhedor.",
        "Montar o dia é gratuito para sempre: todos os cartões, o sol, o ritual de mudança — quando a educação física vira outra coisa, o cartão antigo continua ali, pequeno e legível, porque criança confia em quem avisa. No Premium entram os horários nos cartões, falados do jeito que a gente fala de verdade (\"O almoço começa quando o relógio marca meio-dia e meia\"), a voz que anuncia cada atividade, os planos da semana salvos para cada dia e a impressão da fita da rotina para a mesa da criança."
      ],
      "howToUse": [
        "Toque nos cartões para montar o dia de hoje — a acolhida, a roda de conversa, o lanche, o parquinho — na ordem da sua turma.",
        "Projete o quadro e toque em \"Começar o dia\": o sol pousa no primeiro cartão e anuncia \"Agora é a acolhida!\".",
        "Terminou uma atividade? Toque no sol — ou deixe o ajudante do dia tocar — e ele caminha para o próximo cartão, dobrando o anterior com carinho.",
        "Mudou algo? Use o ritual de mudança: o cartão novo entra e o antigo fica visível, pequenininho — \"antes: a educação física\" — para ninguém ser pego de surpresa."
      ],
      "classroomIdeas": [
        "Crie o cargo de guardião do sol: a criança ajudante da vez é quem avança o sol a cada atividade — uma responsabilidade disputadíssima na rodinha.",
        "Para crianças autistas ou muito ansiosas, imprima a fita do dia e deixe na mesa da criança que precisa conferir a rotina de pertinho, quantas vezes quiser.",
        "Quando a rotina mudar de verdade, reúna a turma na roda, mostre o cartão de mudança e conversem sobre o que ficou para outro dia — antecipar mudanças também é cuidado."
      ]
    },
    "manip": {
      "title": "Nosso dia",
      "tagline": "O quadro de rotina visual que acompanha a turma do bom-dia até a saída.",
      "description": "Monte a rotina do dia com cartões ilustrados e deixe o sol caminhar de atividade em atividade. Mudanças viram um ritual tranquilo, sem susto — o cartão antigo continua visível. No Premium, cada cartão fala seu horário do jeito que a gente diz de verdade."
    }
  },
  "nl": {
    "strings": {
      "timeNone": "Zonder tijd"
    },
    "names": {
      "arrival": "De inloop",
      "snack": "Tien-uurtje",
      "lunch": "De lunch",
      "recess": "Pauze",
      "outdoor": "Buitenspelen",
      "library": "De bieb",
      "guest": "Invaljuf of invalmeester"
    },
    "announce": {
      "arrival": "de inloop",
      "circle": "de kring",
      "tidyup": "opruimen",
      "lineup": "de rij",
      "packup": "inpakken",
      "home": "naar huis",
      "aftercare": "de opvang",
      "reading": "lezen",
      "storytime": "voorlezen",
      "writing": "schrijven",
      "math": "rekenen",
      "phonics": "letters",
      "science": "wereldoriëntatie",
      "art": "knutselen",
      "crafts": "handvaardigheid",
      "music": "muziek",
      "language": "Engels",
      "religion": "levensbeschouwing",
      "snack": "het tien-uurtje",
      "lunch": "de lunch",
      "washhands": "handen wassen",
      "bathroom": "de wc",
      "rest": "het rustmoment",
      "pe": "gym",
      "swimming": "schoolzwemmen",
      "recess": "pauze",
      "outdoor": "buitenspelen",
      "forest": "de natuurdag",
      "brainbreak": "een beweegpauze",
      "dance": "dansen",
      "centers": "vrij spelen",
      "stations": "hoekenwerk",
      "library": "de bieb",
      "computers": "de tablets",
      "calendar": "de kalender en het weer",
      "birthday": "de verjaardag",
      "assembly": "de weekopening",
      "fieldtrip": "het schoolreisje",
      "visitor": "het bezoek",
      "surprise": "een verrassing",
      "guest": "een invaljuf of invalmeester",
      "celebrate": "feest"
    },
    "cardSetChanges": {
      "dropBreakfastNl": true,
      "aftercareAddNl": true
    },
    "toolEntry": {
      "slug": "onze-dag",
      "name": "Onze dag",
      "tagline": "Digitale dagritmekaarten voor op het digibord: bouw de schooldag met kaartjes en laat de zon meelopen.",
      "metaTitle": "Digitale dagritmekaarten voor het digibord — Onze dag",
      "metaDescription": "Gratis digitale dagritmekaarten voor kleuters en groep 3-4: bouw de schooldag met kaartjes, laat de zon meelopen en bespreek veranderingen rustig.",
      "about": [
        "Dagritmekaarten hangen in bijna elke kleuterklas — dit is de digitale versie voor op het digibord. Je bouwt de schooldag met herkenbare kaartjes: de inloop, de kring, het tien-uurtje, buitenspelen, gym. Een vriendelijke zon laat zien waar jullie zijn; jij (of een kind) tikt de zon door naar het volgende kaartje en de stem zegt: \"Nu is het tijd voor de kring!\" Is er vandaag iets anders? Met de veranderkaartjes bespreek je dat rustig vooraf, met het label \"eerst: gym\" als geheugensteuntje. Zo zien ook kinderen die nog geen klok kijken in één oogopslag wat er komt.",
        "Onze dag is gratis te gebruiken: alle kaartjes, de zon en de veranderkaartjes werken meteen, zonder account. Met Premium komen daar de tijden op de kaartjes bij — uitgesproken zoals wij het zeggen: \"De lunch is om half 1\" — plus de voorleesstem, weekplannen die je per dag opslaat en hergebruikt, en een printversie voor op de deur of voor de invaljuf. Wat gratis is, blijft gratis; zo probeer je alles eerst rustig uit met je eigen groep."
      ],
      "howToUse": [
        "Tik links op de kaartjes om de dag van vandaag te bouwen — van de inloop tot naar huis. Versleep of verwijder kaartjes tot het klopt.",
        "Tik op \"De dag beginnen\": de zon verschijnt bij het eerste kaartje.",
        "Klaar met een activiteit? Tik op de zon — die schuift een kaartje op en vertelt wat er nu komt.",
        "Verandert er iets? Gebruik een veranderkaartje om te ruilen of iets weg te halen; het label \"eerst: ...\" laat zien wat er anders is. Met Premium zet je tijden op de kaartjes, sla je weekplannen op en druk je het dagritme af."
      ],
      "classroomIdeas": [
        "Dagopening in de kring: loop elke ochtend samen langs de kaartjes en laat kinderen voorspellen wat er na het tien-uurtje komt — taal én tijdsbesef in één.",
        "Houvast bij verandering: valt gym uit of komt er een invaljuf? Bespreek het vooraf met een veranderkaartje. Juist kinderen die op structuur leunen, zijn zo veel rustiger.",
        "Maak er een klassentaak van: de \"zonnekapitein\" van de dag mag de zon doortikken. Met Premium sla je voor elke weekdag een eigen plan op en hangt de afdruk bij de deur — ook handig voor ouders en de opvang."
      ]
    },
    "manip": {
      "title": "Onze dag",
      "tagline": "Dagritmekaarten op het digibord: de zon wandelt van kaartje naar kaartje door de schooldag.",
      "description": "Bouw de schooldag met herkenbare dagritmekaarten en laat de zon aanwijzen waar jullie zijn. De stem vertelt wat er nu komt, en veranderingen bespreek je rustig met een veranderkaartje. Gratis op het digibord — met Premium ook tijden, weekplannen en een printversie."
    }
  },
  "sv": {
    "strings": {
      "dayFull": "Dagen är full — fler än 16 kort får inte plats."
    },
    "names": {
      "writing": "Skrivstund",
      "crafts": "Pyssel",
      "religion": "SO",
      "lineup": "Uppställning",
      "washhands": "Handtvätt",
      "library": "Bibliotek",
      "guest": "Vikarie",
      "computers": "Lärplattor"
    },
    "announce": {
      "science": "N O",
      "religion": "S O",
      "calendar": "kalender och väder",
      "surprise": "en överraskning"
    },
    "timeFrame": "{a} börjar klockan {t}.",
    "toolEntry": {
      "slug": "var-dag",
      "name": "Vår dag",
      "tagline": "Ett digitalt bildschema för hela dagen — bygg schemat med kort och låt solen visa var ni är.",
      "metaTitle": "Bildschema för förskola och skola – digitalt dagsschema",
      "metaDescription": "Digitalt bildschema för förskola och F–3: bygg dagen med bildkort, flytta solen aktivitet för aktivitet och gör ändringar trygga. Gratis att använda.",
      "about": [
        "Ett bildschema på tavlan är vardag i svenska klassrum och förskolor. Inom tydliggörande pedagogik är dagsschemat en av de viktigaste anpassningarna för barn med NPF: när dagen är synlig blir den förutsägbar, och när den är förutsägbar minskar oron. Vår dag gör bildschemat digitalt — ni bygger dagen med illustrerade kort, från samling och fruktstund till rast, idrott och hemgång, och en vänlig sol visar var i dagen ni är. Det är alltid en människa som flyttar solen, aldrig klockan. Och när något ändras står det gamla kortet kvar, litet och läsbart, med etiketten ”förut” — så blir även schemabrytande dagar begripliga.",
        "Att bygga och använda schemat är gratis, varje dag: alla aktivitetskort, solen, ändringskorten och överraskningskortet ingår utan konto. Premium lägger till det som sparar tid i längden — klockslag på korten som läses upp som ni faktiskt säger dem (”Lunch börjar klockan halv tolv”), uppläst röst när solen flyttas, sparade veckoplaner för måndag till fredag och en utskrift att sätta på bänken eller skicka hem. Inget av det låser den vanliga användningen — tavlan fungerar alltid."
      ],
      "howToUse": [
        "Tryck på korten till vänster för att bygga dagens schema — de lägger sig i ordning på remsan.",
        "Tryck på Starta dagen. När ni går vidare trycker du eller dagens schemavärd på solen — den vandrar till nästa kort.",
        "Om något ändras: välj kortet och tryck Byt ut. Det gamla kortet står kvar med ”förut”, så att ändringen syns i stället för att försvinna.",
        "Med Premium kan du sätta klockslag på korten, spara veckoplaner för varje veckodag och skriva ut dagens schema."
      ],
      "classroomIdeas": [
        "Gör schemavärd till ett klassrumsjobb: dagens värd flyttar solen och säger vad som händer nu — en liten rutin som stärker både trygghet och språk.",
        "Skriv ut dagens schema som bänkremsa till barn som behöver ett eget schema nära sig — samma bilder som på tavlan, utan extra förberedelse.",
        "Låt schemat stå framme på projektorn hela dagen. Vid varje samling tittar ni tillbaka tillsammans: vad har vi gjort, och vad kommer nu?"
      ]
    },
    "manip": {
      "title": "Vår dag",
      "tagline": "Ett digitalt bildschema som gör hela dagen synlig och trygg.",
      "description": "Bygg dagens schema med illustrerade kort och låt en vänlig sol visa var i dagen ni är. Ändringar får en egen lugn ritual — det gamla kortet står kvar med ”förut”, så att även annorlunda dagar blir begripliga. Tydliggörande pedagogik, från samling till hemgång."
    }
  },
  "da": {
    "strings": {
      "editChip": "Rediger",
      "changeSwap": "Byt den ud",
      "changeRemove": "Tag den ud",
      "dayFull": "Dagen er fuld — der er plads til 16 kort.",
      "tmplFresh": "Start forfra"
    },
    "names": {
      "lineup": "Opstilling",
      "packup": "Pakketid",
      "home": "Hjemtid",
      "science": "Natur og teknologi",
      "crafts": "Krea",
      "religion": "Kristendom",
      "washhands": "Håndvask",
      "bathroom": "Toilettid",
      "library": "Bibliotekstid",
      "calendar": "Kalender og vejr",
      "guest": "Vikartime"
    },
    "announce": {},
    "toolEntry": {
      "slug": "vores-dag",
      "name": "Vores dag",
      "tagline": "Byg dagens program af piktogramkort — og lad solen vise, hvad der sker nu.",
      "metaTitle": "Visuelt dagsskema med piktogrammer – dagsstruktur for børn",
      "metaDescription": "Byg dagens program med piktogramkort, og lad solen vise, hvad der sker nu. Forudsigelig dagsstruktur til børnehaveklassen, indskolingen og børnehaven – gratis.",
      "about": [
        "Vores dag er et visuelt dagsskema til klassen eller stuen. I bygger dagens program sammen af piktogramkort — samling, madpakketid, frikvarter, idræt — og solen flytter sig fra kort til kort, når I går videre. Sådan kan alle børn se, hvad der sker nu, og hvad der kommer bagefter. Den faste dagsstruktur giver ro og forudsigelighed for hele gruppen — og især for børn, der har brug for at vide, hvad dagen bringer, før den sker. Og når noget bliver anderledes, viser skemaet det tydeligt med et lille, trygt ritual i stedet for, at det bare sker.",
        "Det vigtigste er gratis: I kan bygge dagen af alle aktivitetskort, flytte solen, bruge ændringskortene og begynde forfra i morgen — uden konto. Med Premium får I mere til hverdagen: klokkeslæt på kortene, som læses højt, sådan som man faktisk siger det — fx at madpakketid er klokken halv 12 — en stemme, der fortæller, hvad der sker nu, faste ugeplaner for hver ugedag og et printvenligt skema til opslagstavlen eller med hjem."
      ],
      "howToUse": [
        "Tryk på kortene i venstre side for at bygge dagens program — det samme kort må gerne bruges flere gange.",
        "Tryk på Start dagen, og flyt solen videre, hver gang I skifter aktivitet — det må et barn meget gerne gøre.",
        "Sker der noget nyt? Byt, fjern eller tilføj et kort — skemaet viser tydeligt, hvad der er anderledes i dag, og hvad der var der før.",
        "Med Premium kan I sætte klokkeslæt på kortene, gemme en fast plan for hver ugedag og udskrive dagens skema."
      ],
      "classroomIdeas": [
        "Gør solen til en klassetjans: dagens solbarn flytter solen og siger med på, hvad der sker nu.",
        "Når noget aflyses, så brug ændringskortet og lad børnene se, at aktiviteten ikke er væk — den er bare flyttet til en anden dag.",
        "Gennemgå hele skemaet ved morgensamlingen, og vend tilbage til det lige før hvert skift — det gør overgangene lettere for børn, der har brug for ekstra forudsigelighed."
      ]
    },
    "manip": {
      "title": "Vores dag",
      "tagline": "Et visuelt dagsskema med piktogramkort og en sol, der viser, hvad der sker nu.",
      "description": "Byg dagens program sammen af piktogramkort, og flyt solen fra aktivitet til aktivitet. Den faste dagsstruktur giver ro og forudsigelighed — især for børn, der har brug for at vide, hvad der kommer. Og når noget er anderledes i dag, viser skemaet det tydeligt og trygt."
    }
  },
  "no": {
    "strings": {
      "dayFull": "Dagen er full — det er plass til 16 kort.",
      "timeNone": "Uten klokkeslett",
      "setCues": "Lydsignaler",
      "gatePremium": "Klokkeslett på kortene, stemmen, ukeplaner og utskrift er en del av Premium. Å bygge dagen — med sola, endringskortene og alle aktivitetene — er alltid gratis."
    },
    "names": {
      "tidyup": "Ryddetid",
      "lineup": "Oppstilling",
      "packup": "Pakketid",
      "home": "Skoleslutt",
      "crafts": "Forming",
      "snack": "Fruktstund",
      "lunch": "Matpakketid",
      "washhands": "Håndvask",
      "bathroom": "Dopause",
      "library": "Bibliotek",
      "calendar": "Kalender og vær",
      "fieldtrip": "Skoletur",
      "guest": "Vikar"
    },
    "announce": {},
    "toolEntry": {
      "slug": "dagen-var",
      "name": "Dagen vår",
      "tagline": "En visuell dagtavle for klasserommet — bygg dagen med kort, og la sola vise hvor dere er.",
      "metaTitle": "Dagtavle på nett – visuell dagsplan for skole og barnehage",
      "metaDescription": "Bygg dagens plan med illustrerte kort, flytt sola fra aktivitet til aktivitet, og forbered barna på endringer. Gratis dagtavle for barnehage og 1.–2. trinn.",
      "about": [
        "Dagen vår er en digital dagtavle for barnehagen og de første trinnene. Dere bygger dagens plan sammen med illustrerte aktivitetskort — samlingsstund, matpakketid, friminutt, utetid — og en vennlig sol viser hvor på dagen dere er. Det er alltid et menneske som flytter sola videre, aldri klokka: tavla sammenligner aldri planen med tiden, og ingenting blinker eller teller ned. Ferdige aktiviteter brettes rolig sammen, men blir stående synlige, slik at barna ser både det som er gjort og det som kommer. Forutsigbarhet er hele poenget.",
        "Alt det viktigste er gratis: hele kortsamlingen, sola og endringsritualet som forbereder barna når noe blir annerledes — det gamle kortet blir stående i det små, med «før: gym» under det nye. Med Premium kan hvert kort få sitt eget klokkeslett, vist på analog og digital klokke og lest opp slik vi faktisk sier det — «Matpakketid er klokka halv tolv» — i tillegg til opplesing av aktivitetene, lagrede ukeplaner for hver ukedag og en utskriftsvennlig pultstripe."
      ],
      "howToUse": [
        "Trykk på kortene til venstre og bygg dagens plan — rekkefølgen kan endres når som helst.",
        "Trykk på «Start dagen» når planen er klar, og la tavla stå fremme på storskjermen.",
        "La dagens ordenselev eller deg selv flytte sola videre når en aktivitet er ferdig.",
        "Blir noe annerledes? Bruk endringskortet: det nye kortet kommer inn, og det gamle blir stående i det små — trygt og tydelig for alle."
      ],
      "classroomIdeas": [
        "La ordenseleven være «solvakt» som flytter sola og sier høyt: «Nå er det friminutt!»",
        "Gå gjennom tavla i samlingsstunden om morgenen, og la barna gjette hva som kommer etter hva.",
        "Skriv ut pultstripen til barn som trenger sin egen plan på pulten — samme kort, samme rekkefølge."
      ]
    },
    "manip": {
      "title": "Dagen vår",
      "tagline": "En visuell dagtavle med aktivitetskort og en sol som følger dagen.",
      "description": "Bygg dagens plan med illustrerte kort og la en vennlig sol vandre fra aktivitet til aktivitet. Endringsritualet forbereder barna når noe blir annerledes, og ferdige aktiviteter brettes rolig sammen. Laget for barnehage og 1.–2. trinn."
    }
  },
  "fi": {
    "strings": {
      "changeAddB": "Lisää edelle",
      "changeAddA": "Lisää perään",
      "timeNone": "Ei kellonaikaa"
    },
    "names": {
      "breakfast": "Aamupala"
    },
    "announce": {
      "arrival": "saapumisen aika",
      "circle": "aamupiiri",
      "tidyup": "siivouksen aika",
      "lineup": "aika mennä jonoon",
      "packup": "pakkaamisen aika",
      "home": "kotiinlähdön aika",
      "aftercare": "iltapäiväkerho",
      "reading": "lukemista",
      "storytime": "satuhetki",
      "writing": "kirjoittamista",
      "math": "matikkaa",
      "phonics": "kirjainhetki",
      "science": "ympäristöoppia",
      "art": "kuvataidetta",
      "crafts": "käsitöitä",
      "music": "musiikkia",
      "language": "englantia",
      "religion": "katsomustunti",
      "breakfast": "aamupala",
      "snack": "välipala",
      "lunch": "ruokailu",
      "washhands": "käsienpesun aika",
      "bathroom": "vessahetki",
      "rest": "lepohetki",
      "pe": "liikuntaa",
      "swimming": "uintia",
      "recess": "välitunti",
      "outdoor": "ulkoilu",
      "forest": "metsäretki",
      "brainbreak": "taukojumppa",
      "dance": "tanssia",
      "centers": "vapaata leikkiä",
      "stations": "pistetyöskentelyä",
      "library": "kirjastohetki",
      "computers": "tablettihetki",
      "calendar": "kalenterihetki",
      "birthday": "syntymäpäivä",
      "assembly": "aamunavaus",
      "fieldtrip": "retki",
      "visitor": "vierailu",
      "change": "muutos",
      "surprise": "yllätys",
      "guest": "vierailevan opettajan tunti",
      "celebrate": "juhla"
    },
    "timeNames": {
      "lineup": "Jonoon meno",
      "bathroom": "Vessakäynti",
      "computers": "Tablettihetki",
      "phonics": "Kirjainhetki",
      "visitor": "Vierailu",
      "guest": "Vierailevan opettajan tunti",
      "calendar": "Kalenterihetki"
    },
    "cardSetChanges": {
      "aftercareAddFi": true,
      "breakfastAddFi": true
    },
    "toolEntry": {
      "slug": "meidan-paiva",
      "name": "Meidän päivä",
      "tagline": "Kuvitettu päiväjärjestys, joka tekee koulupäivästä ennakoitavan.",
      "metaTitle": "Kuvitettu päiväjärjestys – Meidän päivä eskariin ja kouluun",
      "metaDescription": "Rakenna luokan kuvitettu päiväjärjestys hetkessä: kuvakortit, päivän mukana kulkeva aurinko ja lempeä tapa kertoa muutoksista. Sopii eskariin ja alkuopetukseen.",
      "about": [
        "Meidän päivä on luokan yhteinen kuvitettu päiväjärjestys — sama tuttu rakenne, johon moni suomalainen eskari ja alkuopetuksen luokka jo nojaa. Päivä kootaan kuvakorteista muutamassa sekunnissa, ja aurinko siirtyy kortilta toiselle aina silloin, kun opettaja tai päivän apulainen sitä napauttaa — ei koskaan kellon komennosta. Ennakoitava rakenne rauhoittaa: kun lapsi näkee, mitä on jo tehty ja mitä tulee seuraavaksi, siirtymät sujuvat ja epävarmuus vähenee. Muutoksillekin on oma lempeä rituaalinsa: uusi kortti tulee tilalle, ja vanha jää pienenä näkyviin — 'aiemmin: liikunta'. Työkalu sopii erityisen hyvin strukturoitua opetusta hyödyntäviin ryhmiin ja tukee lapsia, joille kuvat kertovat enemmän kuin sanat.",
        "Ilmaisversiolla rakennat koko päivän: kaikki kuvakortit, aurinko, muutoskortit ja lempeät taittumat ovat aina käytössä ilman kirjautumista. Premium lisää arkea helpottavat mukavuudet: kellonajat kortteihin viiden minuutin tarkkuudella, puhutut kuulutukset luonnollisilla suomen aikailmauksilla — 'puoli 12', 'varttia vaille 12' — tallennettavat viikkosuunnitelmat maanantaista perjantaihin sekä tulostettavan pöytänauhan. Mikään ei mene lukkoon kesken päivän: ilmainen osa on kokonainen työkalu, ei maistiainen."
      ],
      "howToUse": [
        "Avaa työkalu taululle ja kokoa päivän ohjelma napauttamalla kuvakortteja — järjestys on valmis alle minuutissa.",
        "Aloita päivä: aurinko asettuu ensimmäisen kortin kohdalle. Napauta aurinkoa aina, kun siirrytte seuraavaan puuhaan.",
        "Kun jokin muuttuu, käytä muutosrituaalia: vaihda kortti, ja vanha jää pienenä näkyviin, jotta muutos on lapselle turvallinen.",
        "Premiumilla lisäät kortteihin kellonajat, kuuntelutat kuulutukset ja tallennat viikon päivät valmiiksi suunnitelmiksi."
      ],
      "classroomIdeas": [
        "Valitse viikoittain vaihtuva päivän apulainen, joka saa siirtää aurinkoa siirtymien merkiksi — vastuu motivoi ja rytmittää päivää.",
        "Käykää aamupiirissä koko päivä läpi kortti kerrallaan: mitä tehdään ensin, mitä sitten — ajan hahmottaminen ja järjestyssanat harjaantuvat samalla.",
        "Tulosta päiväjärjestys pöytänauhaksi lapselle, joka hyötyy omasta lähistruktuurista — sama kuva taululla ja pulpetilla rauhoittaa."
      ]
    },
    "manip": {
      "title": "Meidän päivä",
      "tagline": "Luokan kuvitettu päiväjärjestys, jota aurinko kuljettaa.",
      "description": "Rakenna päivän ohjelma kuvakorteista ja anna auringon siirtyä puuhasta toiseen — aina ihmisen, ei kellon, napautuksesta. Lempeä muutosrituaali pitää yllätyksetkin turvallisina, ja premiumilla saat kellonajat, puhutut kuulutukset ja viikkosuunnitelmat."
    }
  }
};

const MANIP_EN = {
  "title": "Our Day",
  "tagline": "The visual daily schedule that makes the whole day feel safe and knowable.",
  "description": "Build today from illustrated activity cards and let a gentle sun mark what's now — advanced by a person, never the clock. Finished cards fold softly and stay visible, and changes get a friendly ritual with the old plan still readable. With Premium, cards speak their times the way people really say them."
};

function die(msg) { console.error('FATAL: ' + msg); process.exit(1); }

/* ---------- 0. standing slug gate ---------- */
for (const L of LOCS) {
  const slug = FANOUT[L].toolEntry.slug;
  for (const file of ALL) {
    for (const kind of ['tool-content', 'maker-content']) {
      const p = path.join(REPO, 'frontend', 'messages', kind, file + '.json');
      if (!fs.existsSync(p)) continue;
      const j = JSON.parse(fs.readFileSync(p, 'utf8'));
      for (const key of Object.keys(j)) {
        if (key === 'labels' || key === 'our-day') continue;
        if (j[key] && j[key].slug === slug) die(`slug collision: ${L} "${slug}" already used by ${kind}/${file}.json → ${key}`);
      }
    }
  }
}
console.log('slug gate: 10 slugs clean vs tool-content AND maker-content ×11');

/* ---------- 1. strings + NAMES locale-segment rewrites ---------- */
let src = fs.readFileSync(TOOL, 'utf8');
let applied = 0;
function lineReplace(sectionTag, key, L, val) {
  if (val.indexOf("'") >= 0) die(`${sectionTag}.${key}.${L}: ASCII apostrophe in value`);
  const lineRe = new RegExp('^(    ' + key + ':\\s*\\{.*)$', 'm');
  const m = src.match(lineRe);
  if (!m) die(`${sectionTag} line not found for key "${key}"`);
  const line = m[1];
  const segRe = new RegExp('([,{])' + L + ":'[^']*'");
  if (!segRe.test(line)) die(`locale segment ${L} not found on line for "${key}"`);
  const newLine = line.replace(segRe, (mm, pre) => pre + L + ":'" + val + "'");
  src = src.replace(line, newLine);
  applied++;
}
for (const L of LOCS) {
  const F = FANOUT[L];
  for (const key of Object.keys(F.strings || {})) lineReplace('strings', key, L, F.strings[key]);
}
console.log(`strings: ${applied} locale corrections queued`);

/* ---------- 2. card-set rulings BEFORE names (new rows first) ---------- */
function must(old, neu, tag) {
  if (src.indexOf(old) < 0) die('structural anchor missing: ' + tag);
  src = src.replace(old, neu);
}
must("{ id: 'aftercare', group: 0, only: ['sv', 'da', 'no'] },",
     "{ id: 'aftercare', group: 0, only: ['sv', 'da', 'no', 'nl', 'fr', 'de', 'pt', 'fi'] },", 'aftercare only');
must("{ id: 'breakfast', group: 2, only: ['de', 'nl'] },",
     "{ id: 'breakfast', group: 2, only: ['de', 'es', 'fi'] },", 'breakfast only');
must("{ id: 'brushing',  group: 2, only: ['pt'] },",
     "{ id: 'brushing',  group: 2, only: ['pt', 'de'] },", 'brushing only');
must("{ id: 'honores',   group: 4, only: ['es'] },",
     "{ id: 'honores',   group: 4, only: ['es', 'pt'] },", 'honores only');
must("{ id: 'language',  group: 1 },",
     "{ id: 'language',  group: 1 },\n    { id: 'italiano',  group: 1, only: ['it'] },", 'italiano card');
must("    language:  {en:'Language class'",
     "    italiano:  {en:'Italian',de:'—',fr:'—',it:'l’italiano',es:'—',pt:'—',nl:'—',sv:'—',da:'—',no:'—',fi:'—'},\n    language:  {en:'Language class'", 'italiano NAMES');
must("    language:  '<path d=\"M6 10h22v14H16l-6 6v-6H6z\"",
     "    italiano:  '<text x=\"7\" y=\"33\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"26\" fill=\"#146B5E\">A</text><text x=\"25\" y=\"33\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"22\" fill=\"#F2784B\">a</text><path d=\"M8 38h32\" stroke=\"#E0A63C\" stroke-width=\"3\" stroke-linecap=\"round\"/>',\n    language:  '<path d=\"M6 10h22v14H16l-6 6v-6H6z\"", 'italiano icon');

/* names AFTER structural (the italiano row exists now) */
for (const L of LOCS) {
  const F = FANOUT[L];
  for (const key of Object.keys(F.names || {})) lineReplace('NAMES', key, L, F.names[key]);
}
console.log('NAMES + card-set rulings applied');

/* ---------- 3. ANNOUNCE wholesale + TIME_NAMES + frames ---------- */
function jsObj(obj, indent) {
  const q = (s) => "'" + s + "'";
  const rows = Object.keys(obj).map((k) => k + ': ' + q(obj[k]));
  return '{ ' + rows.join(', ') + ' }';
}
const annLocales = [];
for (const L of LOCS) {
  const a = FANOUT[L].announce || {};
  if (Object.keys(a).length) annLocales.push('    ' + L + ': ' + jsObj(a));
}
const annBlock = 'ANNOUNCE: {\n' + annLocales.join(',\n') + '\n  },';
const annRe = /ANNOUNCE: \{[\s\S]*?\n  \},/;
if (!annRe.test(src)) die('ANNOUNCE block not found');
src = src.replace(annRe, annBlock);

const tn = (FANOUT.fi.timeNames) || {};
const NOW_ANCHOR = "  /* the \"Now it's …\" frame per locale";
const tnBlock = '  /* fi time-safe card names for the "{a} alkaa…" frame (labels like\n     "Jonoon" cannot be sentence subjects) */\n  TIME_NAMES: {\n    fi: ' + jsObj(tn) + '\n  },\n' + NOW_ANCHOR;
must(NOW_ANCHOR, tnBlock, 'TIME_NAMES insert');
must("var frame = this.TIME_FRAME[loc] || this.TIME_FRAME.en;\n    return frame.split('{a}').join(this._cap(this.cardName(cardId, loc))).split('{t}').join(t);",
     "var frame = this.TIME_FRAME[loc] || this.TIME_FRAME.en;\n    var tname = ((this.TIME_NAMES || {})[loc] || {})[cardId] || this.cardName(cardId, loc);\n    return frame.split('{a}').join(this._cap(tname)).split('{t}').join(t);", 'timeSentence TIME_NAMES hook');

/* frame overrides: es NOW/TIME, sv TIME (single-line locale segments) */
function frameSeg(constName, L, val) {
  if (val.indexOf("'") >= 0) die(`frame ${constName}.${L}: ASCII apostrophe`);
  const lineRe = new RegExp('^(  ' + constName + ': \\{.*)$', 'm');
  const m = src.match(lineRe);
  if (!m) die(constName + ' line not found');
  const line = m[1];
  const segRe = new RegExp('([,{])' + L + ":'[^']*'");
  if (!segRe.test(line)) die(`frame segment ${L} missing on ${constName}`);
  src = src.replace(line, line.replace(segRe, (mm, pre) => pre + L + ":'" + val + "'"));
}
frameSeg('NOW_FRAME', 'es', FANOUT.es.frames.NOW_FRAME);
frameSeg('TIME_FRAME', 'es', FANOUT.es.frames.TIME_FRAME);
frameSeg('TIME_FRAME', 'sv', FANOUT.sv.timeFrame);

fs.writeFileSync(TOOL, src);
console.log('ANNOUNCE/TIME_NAMES/frames applied');

/* ---------- 4. ToolEntry per locale ---------- */
for (const L of LOCS) {
  const p = path.join(REPO, 'frontend', 'messages', 'tool-content', L + '.json');
  const raw = fs.readFileSync(p, 'utf8');
  if (raw.includes('"our-day"')) die(`${L}.json already has our-day`);
  const j = JSON.parse(raw);
  const out = {};
  for (const key of Object.keys(j)) {
    if (key === 'labels') out['our-day'] = FANOUT[L].toolEntry;
    out[key] = j[key];
  }
  if (!out['our-day']) die(`${L}.json has no labels key`);
  fs.writeFileSync(p, JSON.stringify(out, null, 2) + '\n');
  console.log(`tool-content/${L}.json: our-day added (slug ${FANOUT[L].toolEntry.slug})`);
}

/* ---------- 5. manipulatives.ts entry ---------- */
const MP = path.join(REPO, 'frontend', 'lib', 'manipulatives.ts');
let mp = fs.readFileSync(MP, 'utf8');
if (mp.includes('id: "our-day"')) die('manipulatives.ts already has our-day');
const q2 = (s) => '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
function block(field) {
  const lines = ALL.map((L) => {
    const v = L === 'en' ? MANIP_EN[field] : FANOUT[L].manip[field];
    return '      ' + L + ': ' + q2(v) + ',';
  });
  return '    ' + field + ': {\n' + lines.join('\n') + '\n    },';
}
const entry = '  {\n    id: "our-day",\n    mini_tool_url: "/mini-tools/our-day.html",\n'
  + block('title') + '\n' + block('tagline') + '\n' + block('description') + '\n  },\n';
const arrEnd = mp.indexOf('\n];', mp.indexOf('export const MANIPULATIVES'));
if (arrEnd < 0) die('MANIPULATIVES array end not found');
mp = mp.slice(0, arrEnd + 1) + entry + mp.slice(arrEnd + 1);
fs.writeFileSync(MP, mp);
console.log('manipulatives.ts: our-day entry added (11 locales)');

console.log('APPLIED — our-day.js (strings/NAMES/ANNOUNCE/frames/cards), 10 tool-content files, manipulatives.ts');
