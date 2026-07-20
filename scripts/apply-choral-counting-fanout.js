#!/usr/bin/env node
/* =====================================================================
   apply-choral-counting-fanout.js — applies the 10-agent native fan-out
   for Choral Counting (tool #19):
     1. strings corrections into `mini tools/choral-counting.js`
        (per-line locale-segment rewrite; every miss is FATAL)
     2. ToolEntry into frontend/messages/tool-content/<locale>.json
     3. the manipulatives entry (all 11 locales) into
        frontend/lib/manipulatives.ts
   STANDING SLUG GATE: every new slug is checked against EVERY tool slug
   AND every worksheet-MAKER slug across all 11 locale files (the /tools/
   namespace is shared — the WODB lesson).
   Idempotent-ish: re-running after success FAILS loudly on the JSON
   inserts (entry already present) rather than duplicating.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const TOOL = path.join(REPO, 'mini tools', 'choral-counting.js');
const LOCS = ['de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const ALL = ['en'].concat(LOCS);

const FANOUT = {
  "de": {
    "corrections": {
      "instruction": "Zählt gemeinsam laut — bei jedem Antippen wird die nächste Zahl auf das Blatt geschrieben.",
      "skipLabel": "In Schritten von",
      "colwiseChip": "Spaltenweise schreiben",
      "wonderAria": "Dieses Feld beobachten — welche Zahl wird hier stehen?",
      "pK4": "Rückwärts von 20",
      "pG1a": "In Zweierschritten bis 60",
      "pG1b": "In Fünferschritten bis 120",
      "pG1c": "Ab 7 in Zehnerschritten",
      "pG2a": "In 25er-Schritten bis 500",
      "pG2c": "Von 1000 abwärts",
      "showTeens": "Die Zahlen von 11 bis 20",
      "showBoundary": "Die Zahlendreher-Strecke",
      "showTens": "In Zehnerschritten",
      "gatePremium": "Alle Schrittweiten und Startzahlen, das Rückwärtszählen, die Stifte, die Spaltenwahl und gespeicherte Zählungen gehören zu Premium. Das Zählen in Einer- und Zehnerschritten — mit Fragezeichen-Feldern und vorgesprochenen Zahlen — bleibt immer kostenlos."
    },
    "toolEntry": {
      "slug": "zaehlen-im-chor",
      "name": "Zählen im Chor",
      "tagline": "Gemeinsam laut zählen, Muster entdecken — das digitale Zahlenblatt für den Morgenkreis.",
      "metaTitle": "Gemeinsam zählen & Zahlenmuster entdecken – Zählen im Chor",
      "metaDescription": "Die Klasse zählt laut, jedes Tippen schreibt die nächste Zahl aufs Zahlenblatt. Muster markieren, Zahlen anhören, staunen – von Kindergarten bis Klasse 2.",
      "about": [
        "Zählen im Chor bringt das gemeinsame laute Zählen an die Tafel: Die Klasse zählt im Chor, und bei jedem Antippen erscheint die nächste Zahl handschriftlich auf einem großen Zahlenblatt — Reihe für Reihe, wie auf Plakatpapier. Das Werkzeug zählt nie von selbst weiter; die Pause gehört dem Gespräch. So werden Zahlenmuster sichtbar: Die Einer wiederholen sich, die Zehner wachsen. Auf Wunsch spricht das Werkzeug jede Zahl vor — auf dem Blatt steht 21, im Raum klingt „einundzwanzig“. Genau diese Umkehrung übt das sichere Schreiben zweistelliger Zahlen und beugt Zahlendrehern vor.",
        "Mit den Fragezeichen-Feldern markiert ihr leere Felder zum Mitdenken: Welche Zahl wird hier stehen? Kein Tipp wird bewertet — wenn die Zahl ankommt, freut sich die Klasse einfach mit. Bunte Stifte heben Muster hervor, ganze Zeilen und Spalten lassen sich färben. Fertige Zählungen für Kindergarten, Klasse 1 und Klasse 2 sowie die Gruppe „Genau hinhören“ liegen bereit. Das Zählen in Einer- und Zehnerschritten ist dauerhaft kostenlos; alle weiteren Schrittweiten, das Rückwärtszählen, die Stifte, die Spaltenwahl und gespeicherte Zählungen gehören zu Premium."
      ],
      "howToUse": [
        "Wählt eine fertige Zählung aus oder stellt Startzahl, Schrittweite und Spalten selbst ein.",
        "Zählt gemeinsam laut — tippt auf „Weiter“, sobald die Klasse die nächste Zahl gesprochen hat.",
        "Haltet an und fragt: „Was fällt euch auf?“ Markiert Muster mit den Stiften oder färbt Einer und Zehner.",
        "Setzt Fragezeichen auf leere Felder und zählt weiter, bis sich die Vermutung von selbst auflöst."
      ],
      "classroomIdeas": [
        "Morgenkreis-Ritual: Jeden Tag ein Stück weiterzählen und das wachsende Zahlenblatt gemeinsam an der Tafel begleiten.",
        "Zahlendreher-Training: Mit der „Zahlendreher-Strecke“ (18–42) hören die Kinder „einundzwanzig“, während 21 erscheint — und besprechen, was zuerst gesagt und was zuerst geschrieben wird.",
        "Vermutungs-Spiel: Ein Fragezeichen weit unten im Blatt setzen — wer kann begründen, welche Zahl dort stehen wird, bevor die Klasse dort ankommt?"
      ]
    },
    "manip": {
      "title": "Zählen im Chor",
      "tagline": "Die Klasse zählt laut — jedes Antippen schreibt die nächste Zahl aufs Zahlenblatt.",
      "description": "Ein digitales Zahlenblatt für das gemeinsame laute Zählen im Morgenkreis. Jedes Antippen schreibt die nächste Zahl ins Raster; bunte Stifte und Fragezeichen-Felder machen Zahlenmuster sichtbar. Auf Wunsch spricht das Werkzeug jede Zahl vor — die Klasse sieht 21 und hört „einundzwanzig“."
    }
  },
  "fr": {
    "corrections": {
      "startLabel": "Partir de",
      "skipLabel": "Compter de … en …",
      "colwiseChip": "Écrire colonne par colonne",
      "doneLine": "On a compté de {a} à {b} !",
      "wonderAria": "Marquer cette case — quel nombre viendra ici ?",
      "tintOnes": "Colorier les unités",
      "tintTens": "Colorier les dizaines",
      "pK2": "Où se cachent les cinq ?",
      "pK3": "De 10 en 10 jusqu’à 100",
      "pK4": "Compte à rebours à partir de 20",
      "pG1c": "De 10 en 10 à partir de 7",
      "pG1d": "Franchir la centaine",
      "pG2b": "D’une centaine à l’autre",
      "showBoundary": "Soixante-dix, quatre-vingt-dix…",
      "setSpeak": "Prononcer chaque nombre",
      "voiceMissing": "Aucune voix n’est installée pour cette langue sur cet appareil.",
      "gatePremium": "Tous les pas de comptage et tous les départs, le compte à rebours, les feutres, le choix des colonnes et les comptages enregistrés font partie de l’offre Premium. Compter de 1 en 1 et de 10 en 10 — avec les cases « ? » et les nombres dits à voix haute — reste toujours gratuit."
    },
    "toolEntry": {
      "slug": "comptons-ensemble",
      "name": "Comptons ensemble",
      "tagline": "La classe compte à voix haute ; chaque appui écrit le nombre suivant dans le tableau.",
      "metaTitle": "Rituel de comptage collectif — tableau des nombres interactif",
      "metaDescription": "La classe compte à voix haute, chaque appui écrit le nombre suivant dans le tableau : feutres, cases « ? », nombres prononcés. De la maternelle au CE1.",
      "about": [
        "Comptons ensemble met à l’écran le rituel du comptage collectif — le « comptage choral » cher aux formateurs, cousin du jeu du furet. La classe compte à voix haute ; à chaque appui, le nombre suivant s’écrit dans un grand tableau, comme sur une affiche de classe. Rien n’avance tout seul : c’est la voix des élèves qui mène, et la pause fait partie de la leçon. Activez « Prononcer chaque nombre » et le tableau affiche 70 pendant que la classe entend « soixante-dix » — exactement là où l’écrit et l’oral se séparent, de soixante à cent.",
        "Posez une case « ? » sur un nombre à venir et laissez la classe prédire — l’arrivée du nombre est une découverte, jamais une sanction. Les feutres colorent des cases, des lignes entières, ou les unités et les dizaines, pour faire parler les régularités après la question « Que remarquez-vous ? ». Des comptages préparés par niveau (Maternelle, CP, CE1) se lancent en un appui, et vos propres comptages s’enregistrent pour demain. Compter de 1 en 1 et de 10 en 10 reste gratuit ; les autres pas, les départs libres et les feutres font partie de Premium."
      ],
      "howToUse": [
        "Choisissez un comptage préparé (Maternelle, CP ou CE1) ou réglez vous-même le départ, le pas et le nombre de colonnes.",
        "La classe compte à voix haute ; appuyez sur « Suivant » quand le nombre est dit — il s’écrit aussitôt dans le tableau.",
        "Posez des cases « ? » sur les nombres à venir, puis demandez « Que remarquez-vous ? » et coloriez les régularités au feutre.",
        "Activez « Prononcer chaque nombre » pour entendre soixante-dix ou quatre-vingt-dix, et enregistrez le comptage pour le reprendre plus tard."
      ],
      "classroomIdeas": [
        "En rituel du matin, façon jeu du furet : chaque élève dit le nombre suivant à tour de rôle, et le tableau garde la trace écrite de la chaîne orale.",
        "En GS ou au CP, lancez « Tendez l’oreille » de 55 à 104 : la colonne des 60, 70, 80, 90, 100 s’empile, et la classe compare ce qu’elle entend à ce qui s’écrit.",
        "Au CE1, comptez de 25 en 25 jusqu’à 500 : posez un « ? » sur la case qui suivra 75, laissez la classe débattre de ce qui va s’écrire, puis appuyez pour voir le nombre arriver."
      ]
    },
    "manip": {
      "title": "Comptons ensemble",
      "tagline": "La classe compte à voix haute ; chaque appui écrit le nombre suivant dans le tableau.",
      "description": "Un tableau de comptage collectif façon affiche de classe : départ et pas au choix, cases « ? » pour prédire, feutres pour colorier les régularités. Avec la voix activée, la classe entend « soixante-dix » pendant que le tableau affiche 70."
    }
  },
  "it": {
    "corrections": {
      "skipLabel": "A salti di",
      "colwiseChip": "Scrivi per colonne",
      "wonderAria": "Segna questa casella — quale numero ci andrà?",
      "markerAria": "Pennarello {n}",
      "pG1c": "Da 7, di 10 in 10",
      "pG2b": "Scavalchiamo le centinaia",
      "pG2c": "Giù dal 1000",
      "showBoundary": "I numeri dispettosi",
      "gatePremium": "Tutti i salti e i punti di partenza, il conto all’indietro, i pennarelli, la scelta delle colonne e i conteggi salvati fanno parte di Premium. Contare di 1 in 1 e di 10 in 10 — con le caselle «?» e i numeri pronunciati ad alta voce — resta sempre gratuito."
    },
    "toolEntry": {
      "slug": "contiamo-insieme",
      "name": "Contiamo insieme",
      "tagline": "La classe conta ad alta voce e ogni tocco scrive il numero successivo sulla griglia.",
      "metaTitle": "Conteggio ad alta voce in classe – Contiamo insieme",
      "metaDescription": "La classe conta ad alta voce e ogni tocco scrive il numero successivo sulla griglia: salti, segni colorati e domande per scoprire insieme le regolarità.",
      "about": [
        "Contiamo insieme porta in digitale una routine amatissima del cerchio del mattino: la classe conta ad alta voce con una sola voce e, a ogni tocco dell’insegnante, il numero successivo appare scritto «a mano» sulla griglia, come su un cartellone. Lo strumento non va mai avanti da solo: la pausa è il cuore dell’attività. Quando la conta si ferma arriva la domanda «Che cosa notate?»: con i pennarelli si evidenziano le caselle, si colorano unità e decine e si scoprono insieme le regolarità. Con la voce attivata, ogni numero può anche essere pronunciato nella lingua della classe.",
        "La versione gratuita include tutto ciò che serve per cominciare domattina: il conteggio di 1 in 1 e di 10 in 10, le caselle «?» per fermarsi a prevedere, i numeri pronunciati ad alta voce e due conte pronte per la scuola dell’infanzia. Con Premium si aprono tutti i salti e i punti di partenza, il conto all’indietro, la scrittura per colonne, i pennarelli per evidenziare le regolarità e fino a 8 conteggi salvati, pronti per la prossima mattina."
      ],
      "howToUse": [
        "Scegli una conta pronta per la tua classe oppure imposta il punto di partenza e il salto.",
        "La classe conta ad alta voce: quando il coro dice il numero, tocca «Avanti» e il numero compare sulla griglia.",
        "Fermati e chiedi: «Che cosa notate?» — evidenzia le caselle con i pennarelli oppure colora unità e decine.",
        "Metti un «?» su una casella vuota e chiedete quale numero ci andrà; poi continuate a contare fino ad arrivarci."
      ],
      "classroomIdeas": [
        "In classe prima aprite il cerchio del mattino partendo da 15: attraverserete insieme ventuno, ventotto e il passaggio da venti a trenta — proprio i punti dove la voce della classe tende a esitare.",
        "Prima di superare una decina, mettete un «?» qualche casella più avanti e raccogliete le previsioni a voce: quando il numero arriva davvero sulla griglia, il momento è una scoperta condivisa.",
        "Nella conta di 10 in 10, a ogni numero scritto un bambino alza tutte e dieci le dita: la griglia cresce insieme alle mani alzate e le decine si vedono, oltre a sentirsi."
      ]
    },
    "manip": {
      "title": "Contiamo insieme",
      "tagline": "La classe conta ad alta voce e ogni tocco scrive il numero successivo sulla griglia.",
      "description": "Una routine di conteggio corale per il cerchio del mattino: l’insegnante tocca, il numero appare scritto a mano, la classe scandisce. Segni colorati, caselle «?» e la domanda «Che cosa notate?» trasformano la conta in una conversazione sulle regolarità dei numeri."
    }
  },
  "es": {
    "corrections": {
      "instruction": "Cuenten todos juntos en voz alta — cada toque escribe el siguiente número en la hoja.",
      "skipLabel": "Saltos de",
      "doneLine": "¡Contamos del {a} al {b}!",
      "wonderAria": "Marcar esta casilla — ¿qué número irá aquí?",
      "markerAria": "Plumón {n}",
      "grade1": "1er grado",
      "pK4": "Cuenta regresiva desde el 20",
      "pG1c": "Desde el 7, de 10 en 10",
      "pG2b": "Cruzando las centenas",
      "pG2c": "Bajando desde el 1000",
      "setCues": "Efectos de sonido",
      "gatePremium": "Todos los saltos y números de inicio, la cuenta regresiva, los plumones, la elección de columnas y los conteos guardados forman parte de Premium. Contar de 1 en 1 y de 10 en 10 — con las casillas de «?» y los números en voz alta — es gratis para siempre.",
      "inkedAria": "El {n} ya está en la hoja"
    },
    "toolEntry": {
      "slug": "conteo-en-coro",
      "name": "Conteo en coro",
      "tagline": "La clase cuenta en voz alta y cada toque escribe el siguiente número en la cuadrícula.",
      "metaTitle": "Conteo en coro: conteo en voz alta para preescolar y primaria",
      "metaDescription": "Proyecta la cuadrícula, cuenten en voz alta y cada toque escribe el siguiente número. Marquen patrones y hagan predicciones. Gratis de 1 en 1 y de 10 en 10.",
      "about": [
        "El conteo en coro convierte el conteo en voz alta en una rutina para todo el grupo: los niños dicen los números juntos mientras tú, con cada toque, escribes el siguiente en una cuadrícula que se ve como hoja de rotafolio. La herramienta nunca se adelanta sola — la pausa es parte de la enseñanza. Cuando el grupo llega a un tramo interesante, detén el conteo, colorea casillas con los plumones y pregunta: «¿Qué observan?». Es una rutina de pensamiento matemático que fortalece el sentido numérico en preescolar y primaria, en sintonía con el enfoque de la Nueva Escuela Mexicana: primero la voz de los niños, después el registro.",
        "La versión gratuita incluye lo esencial de la rutina: contar de 1 en 1 y de 10 en 10, las casillas de «?» para predecir y, si quieres, una voz que dice cada número en español. Con Premium se abren todos los saltos y números de inicio, la cuenta regresiva, la elección de columnas, la escritura por columnas, los plumones para señalar patrones y hasta ocho conteos guardados, listos para la siguiente clase. Así lo decimos tal cual: lo gratuito alcanza para la rutina diaria; Premium la lleva a 1º y 2º grado completos."
      ],
      "howToUse": [
        "Elige un conteo preparado para tu grado — o define el número de inicio y el salto.",
        "Proyecta la cuadrícula y cuenten todos juntos en voz alta; cada toque en «Siguiente» escribe el siguiente número.",
        "Detén el conteo donde convenga, colorea casillas con los plumones y pregunta: «¿Qué observan?».",
        "Coloca un «?» en una casilla vacía para que el grupo prediga qué número llegará ahí — y sigan contando hasta comprobarlo."
      ],
      "classroomIdeas": [
        "Rutina de inicio de jornada: retomen cada mañana el conteo donde se quedó el grupo — los días de escuela, los puntos ganados o una colección del salón.",
        "El brinco al treinta: empiecen en el 15, deténganse en el 29 y dejen que el grupo prediga cómo se dice y cómo se escribe el número que sigue antes de escribirlo.",
        "Decenas con material concreto: cuenten de 10 en 10 mientras una niña o un niño junta paquetes de diez palitos; la cuadrícula crece al mismo ritmo que los montones."
      ]
    },
    "manip": {
      "title": "Conteo en coro",
      "tagline": "La clase cuenta en voz alta y cada toque escribe el siguiente número en la cuadrícula.",
      "description": "Una rutina de conteo colectivo para proyectar: el grupo dice los números en voz alta, tú los vas escribiendo con un toque y se detienen a observar patrones. Con casillas de «?» para predecir y una voz opcional que dice cada número en español."
    }
  },
  "pt": {
    "corrections": {
      "downChip": "Contagem regressiva",
      "noticePrompt": "O que vocês perceberam?",
      "wonderAria": "Marcar esta casinha — o que vai aparecer aqui?",
      "markerAria": "Canetinha {n}",
      "gradeListen": "Ouvidos atentos",
      "pG1c": "Do 7, de 10 em 10",
      "pG2b": "Atravessando as centenas",
      "replaceAsk": "Os 8 espaços já estão ocupados — substituir a contagem mais antiga?",
      "gatePremium": "Todos os passos e pontos de partida, a contagem regressiva, as canetinhas, a escolha de colunas e as contagens salvas fazem parte do Premium. Contar de 1 em 1 e de 10 em 10 — com as casinhas “?” e os números falados — é sempre gratuito."
    },
    "toolEntry": {
      "slug": "contagem-em-coro",
      "name": "Contagem em coro",
      "tagline": "A turma conta em voz alta e cada toque escreve o próximo número no quadro de contagem.",
      "metaTitle": "Contagem Oral na Educação Infantil e 1º Ano | Contagem em Coro",
      "metaDescription": "A turma conta em coro e cada toque escreve o próximo número no quadro. Contagem oral com marcação de padrões e voz em português — pronta para projetar.",
      "about": [
        "A contagem em coro é uma rotina curta e poderosa de matemática: a turma inteira conta em voz alta enquanto você registra — cada toque no botão escreve o próximo número no quadro de contagem projetado. A ferramenta nunca avança sozinha: a pausa entre um número e outro é justamente o momento de pensar. No meio da contagem (ou no fim), vem a pergunta que importa: o que vocês perceberam? Canetinhas coloridas destacam padrões, as casinhas com “?” convidam a prever o que vem por aí, e a voz opcional fala cada numeral em português. Da Educação Infantil ao 2º ano, na direção da BNCC: contagem oral, sequência numérica e regularidades do sistema decimal.",
        "A versão gratuita já cobre a rotina essencial: contar de 1 em 1 e de 10 em 10 (começando em 0, 1 ou 10), com as casinhas de “?”, os números falados e duas contagens prontas para a Educação Infantil. O Premium abre o resto: qualquer passo e ponto de partida (de 0 a 999), contagem regressiva, escolha do número de colunas, registro em colunas, todas as canetinhas e os destaques de unidades e dezenas, a prateleira completa de contagens planejadas e até 8 contagens salvas."
      ],
      "howToUse": [
        "Escolha uma contagem pronta na prateleira ou monte a sua: número inicial, passo e quantidade de colunas.",
        "A turma conta em voz alta; a cada número falado, toque em Próximo — ele aparece escrito no quadro.",
        "Pause quando quiser: destaque padrões com as canetinhas ou coloque um “?” numa casinha vazia para a turma prever o número.",
        "No fim, pergunte “O que vocês perceberam?” e deixe a conversa matemática acontecer — a discussão é o objetivo, não a velocidade."
      ],
      "classroomIdeas": [
        "Roda de matemática na Educação Infantil: contem até 30 e pintem todos os números que terminam em zero — o que essa coluna revela?",
        "No 1º ano, contem de 10 em 10 começando no 7 e coloquem um “?” três casinhas à frente: quem descobre o número antes de ele chegar?",
        "No 2º ano, contem de 25 em 25 até 500 e conversem sobre por que os finais 25, 50, 75 e 00 se repetem — uma ponte natural para as moedas de 25 centavos e os quartos de hora."
      ]
    },
    "manip": {
      "title": "Contagem em coro",
      "tagline": "A turma conta em coro enquanto cada toque escreve o próximo número no quadro.",
      "description": "Uma rotina de contagem oral para projetar: a classe conta em voz alta, você toca, e o número aparece no quadro de contagem — sem pressa e sem placar. Canetinhas destacam padrões, as casinhas com “?” convidam a prever, e a voz opcional fala cada número em português. Da Educação Infantil ao 2º ano."
    }
  },
  "nl": {
    "corrections": {
      "noticePrompt": "Wat valt jullie op?",
      "pK2": "De vijven verstoppen zich",
      "pG1c": "Vanaf 7 met tienen",
      "showBoundary": "Het lastige stukje",
      "wonderAria": "Markeer dit vakje — wat komt hier te staan?"
    },
    "toolEntry": {
      "slug": "samen-tellen",
      "name": "Samen tellen",
      "tagline": "De hele klas telt hardop mee — elke tik schrijft het volgende getal op het bord.",
      "metaTitle": "Samen tellen – telrij oefenen in groep 1 t/m 4 | Digibord-tool",
      "metaDescription": "Tel samen hardop: elke tik schrijft het volgende getal in het rooster. Gratis digibord-tool voor de telrij in groep 1 t/m 4, met sprongen en terugtellen.",
      "about": [
        "Samen tellen is een klassikale telroutine voor op het digibord. De klas telt hardop en bij elke tik verschijnt het volgende getal in het telrooster, alsof je het zelf op een groot vel papier schrijft. De tool telt nooit vanzelf verder — jij bepaalt het tempo, en juist de pauzes maken het rekenen. Kleur daarna met de stiften de eenheden of de tientallen en vraag: wat valt jullie op? Zet de spraak aan en de klas hoort eenentwintig terwijl er 21 staat — precies de omkering waar getalbegrip in groep 3 en 4 om vraagt.",
        "Gratis tel je met sprongen van 1 en 10, vanaf 0, 1 of 10 — met vraagteken-vakjes op lege plekken en de gesproken getallen erbij. Met Premium komt de rest: elke sprong en elk startgetal tot 1000, terugtellen, zelf kolommen kiezen, in kolommen schrijven, alle stiften en kleurhulpen voor het patroonwerk, de volledige plank met kant-en-klare tellingen — waaronder Goed luisteren met het lastige stukje 18–42 — en acht opgeslagen tellingen voor je eigen vaste routines."
      ],
      "howToUse": [
        "Kies een kant-en-klare telling, of stel zelf startgetal, sprong en aantal kolommen in.",
        "Tel samen hardop en tik op Volgende — het getal wordt in het rooster geschreven, in jouw tempo.",
        "Pauzeer onderweg: zet een vraagteken op een leeg vakje en laat de klas voorspellen wat daar komt te staan.",
        "Kleur na afloop patronen met de stiften of kleur de eenheden en tientallen, en bespreek samen: wat valt jullie op?"
      ],
      "classroomIdeas": [
        "Maak er een vaste routine van: vijf minuten samen tellen aan het begin van elke rekenles, bij kleuters gewoon in de kring.",
        "Zet de spraak aan bij het stukje 18–42: de klas hoort eenentwintig terwijl er 21 staat — precies waar omkeringsfouten in groep 3 ontstaan.",
        "Laat de klas terugtellen vanaf 20 als aftelmoment voor het opruimen — zo oefent de telrij achteruit zich vanzelf."
      ]
    },
    "manip": {
      "title": "Samen tellen",
      "tagline": "Tel hardop met de hele klas terwijl elk getal in het telrooster verschijnt.",
      "description": "Een klassikale telroutine voor het digibord: elke tik schrijft het volgende getal op het blad, in jouw tempo. Kleur patronen met de stiften en zet vraagtekens op lege vakjes om de klas te laten voorspellen. Met de spraak aan hoort de groep eenentwintig terwijl er 21 staat."
    }
  },
  "sv": {
    "corrections": {
      "presetsTitle": "Planerade räkningar",
      "pG1a": "Tvåhopp till 60",
      "pG1b": "Femhopp till 120",
      "pG1c": "Tiohopp från 7",
      "pG1d": "Förbi 100",
      "pG2b": "Förbi hundratalen",
      "saveCount": "Spara den här räkningen",
      "setSpeak": "Läs upp varje tal",
      "voiceMissing": "Det finns ingen röst för det här språket på den här enheten.",
      "wonderAria": "Markera den här rutan — vad ska stå här?",
      "replaceAsk": "Alla 8 platserna är fulla — ersätta den äldsta?",
      "gatePremium": "Alla hopp och starttal, baklängesräkning, pennorna, kolumnvalet och sparade räkningar ingår i Premium. Att räkna med 1 och 10 — med frågeteckensrutor och upplästa tal — är alltid gratis."
    },
    "toolEntry": {
      "slug": "rakna-i-kor",
      "name": "Räkna i kör",
      "tagline": "Klassen räknar högt i kör — varje tryck skriver nästa tal i rutnätet.",
      "metaTitle": "Räkna i kör – räkna högt tillsammans i klassen (F–åk 2)",
      "metaDescription": "Ett tavelverktyg för gemensam räkning i F-klass–åk 2: varje tryck skriver nästa tal, klassen räknar högt och samtalar om mönstren. Räkna med 1 och 10 gratis.",
      "about": [
        "Räkna i kör är ett tavelverktyg för gemensam räkning i klassrummet. Klassen räknar högt tillsammans, och vid varje tryck på Nästa skrivs nästa tal in i rutnätet — verktyget går aldrig vidare av sig självt, för pausen är själva poängen. Stanna upp, sätt ett frågetecken på en tom ruta och låt barnen förutsäga vilket tal som ska stå där. Ni kan också låta enheten läsa upp varje tal, så att klassen hör hur talen låter medan de skrivs. Frågan som bär hela samtalet är densamma varje gång: vad lägger ni märke till?",
        "Att räkna med 1 och 10 i taget är alltid gratis — med frågeteckensrutor, upplästa tal och två planerade räkningar för förskoleklassen. Med Premium öppnar ni resten: alla hopp och starttal (till exempel tvåhopp, femhopp eller 25-hopp), baklängesräkning, valfritt antal kolumner, att skriva nedåt i kolumner, pennorna och färgningen av ental och tiotal, hela hyllan med planerade räkningar för åk 1 och åk 2 samt upp till åtta sparade räkningar."
      ],
      "howToUse": [
        "Välj en planerad räkning på hyllan eller ställ in starttal, hopp och antal kolumner själv.",
        "Räkna högt i kör med klassen. När ni har sagt talet tillsammans trycker du på Nästa — och talet skrivs in i rutnätet.",
        "Stanna upp och sätt ett frågetecken på en tom ruta: vilket tal ska stå här? Låt barnen motivera sina förslag innan ni räknar vidare.",
        "Avsluta med samtalet: vad lägger ni märke till? Färga mönster med pennorna eller färga entalen och tiotalen."
      ],
      "classroomIdeas": [
        "Gör räkningen till en fast punkt i samlingen — börja terminen med att räkna till 30 och låt räkningarna växa med klassen genom året.",
        "Slå på Läs upp varje tal och välj Lyssna noga-räkningarna: klassen hör hur elva, tolv och tretton bryter mönstret, medan tjugoett och tjugotvå följer det.",
        "Räkna baklänges från 20 som nedräkning inför rast eller utflykt — eller ta 25-hoppen till 500 i åk 2 och prata om hundraövergångarna."
      ]
    },
    "manip": {
      "title": "Räkna i kör",
      "tagline": "Klassen räknar högt tillsammans — varje tryck skriver nästa tal i rutnätet.",
      "description": "Ett tavelverktyg för gemensam räkning: klassen räknar i kör, du trycker, och talen skrivs in ett i taget. Sätt frågetecken på tomma rutor, färga mönster med pennorna och fråga: vad lägger ni märke till? Från förskoleklassens räkna-till-30 till 25-hoppen mot 500 i åk 2."
    }
  },
  "da": {
    "corrections": {
      "backOne": "Ét tal tilbage",
      "wonderAria": "Markér dette felt — hvad mon der kommer her?",
      "pG1c": "Syv i tierspring",
      "showTens": "I tierspring",
      "showBoundary": "De drilske tal",
      "replaceAsk": "Alle 8 pladser er fulde — skal den ældste erstattes?",
      "gatePremium": "Alle spring og starttal, baglæns tælling, tuscherne, kolonnevalget og gemte tællinger er en del af Premium. At tælle med 1 og 10 — med spørgsmålstegn og oplæste tal — er altid gratis."
    },
    "toolEntry": {
      "slug": "taelle-i-kor",
      "name": "Tælle i kor",
      "tagline": "Klassen tæller højt sammen — hvert tryk skriver det næste tal på arket.",
      "metaTitle": "Tælle i kor – tæl højt sammen i indskolingen | LessonCraftStudio",
      "metaDescription": "Tæl højt sammen: hvert tryk skriver det næste tal i talrækken, mens klassen hører enogtyve og halvtreds. Gratis tavleværktøj til børnehaveklasse–2. klasse.",
      "about": [
        "Tælle i kor er en fælles tællerutine til tavlen: klassen tæller højt sammen, og hvert tryk skriver det næste tal ind i talrækken på arket — i jeres eget tempo, for værktøjet går aldrig videre af sig selv. Slå oplæsningen til, og klassen hører enogtyve og halvtreds, mens tavlen viser 21 og 50 — lige dér, hvor de danske talord driller mest. Med tuscherne markerer I mønstre i rækkerne, og med et spørgsmålstegn udpeger I et tomt felt og taler om, hvad der mon kommer dér, før I tæller videre. Rutinen passer til arbejdet med tal og talrækker fra børnehaveklassen til 2. klasse.",
        "Det vigtigste er gratis: I kan tælle med 1 og med 10, sætte spørgsmålstegn i felterne og få hvert tal læst højt — rigeligt til den daglige tællerutine i børnehaveklassen. Med Premium åbner resten: alle spring og starttal (fx 25-spring til 500), baglæns tælling, valg af kolonner, at skrive ned ad kolonnerne, alle tuscher og farvninger samt op til otte gemte tællinger, så morgendagens tælling ligger klar, før klassen møder ind."
      ],
      "howToUse": [
        "Vælg en planlagt tælling — eller indstil selv starttal, spring og kolonner.",
        "Lad klassen tælle højt i kor, og tryk på Næste, når tallet er sagt — så bliver det skrevet på arket.",
        "Stop op undervejs: spørg »Hvad lægger I mærke til?«, og markér mønstrene med tuscherne.",
        "Sæt et spørgsmålstegn på et tomt felt, og tal sammen om, hvad der mon kommer dér, før I tæller derhen."
      ],
      "classroomIdeas": [
        "Morgenrutine: Tæl fem minutter i kor hver dag — skift starttal hver uge, og lad talrækken vokse på tavlen, mens klassen finder mønstrene.",
        "Lyt til de drilske tal: Slå oplæsningen til og tæl fra 40 — klassen hører halvtreds og tres, mens tavlen viser 50 og 60. Tal om, hvad man hører, og hvad man ser.",
        "Mønsterjagt: Farv enerne eller tierne, sæt et spørgsmålstegn længere nede i rækken, og lad børnene forudsige tallet — tæl så derhen sammen og se det lande."
      ]
    },
    "manip": {
      "title": "Tælle i kor",
      "tagline": "Klassen tæller højt sammen, og hvert tryk skriver det næste tal på arket.",
      "description": "En fælles tællerutine til tavlen: talrækken vokser frem, mens klassen tæller i kor, og oplæsningen lader børnene høre enogtyve og halvtreds, mens de ser 21 og 50. Markér mønstre med tuscherne, og sæt et spørgsmålstegn dér, hvor I vil stoppe op og undre jer sammen."
    }
  },
  "no": {
    "corrections": {
      "newCountAsk": "Starte en ny telling?",
      "wonderAria": "Marker denne ruten — hva kommer her?",
      "tintOnes": "Fargelegg enerne",
      "tintTens": "Fargelegg tierne",
      "pK1": "Tell til 30",
      "pG1c": "Tierhopp fra 7",
      "pG2b": "Over hundrerne",
      "showBoundary": "Den vriene biten",
      "showTens": "Med tiere",
      "setSpeak": "Les opp hvert tall",
      "voiceMissing": "Det er ikke installert noen stemme for dette språket på denne enheten.",
      "gatePremium": "Alle steg og starttall, baklengs telling, tusjene, kolonnevalget og lagrede tellinger er en del av Premium. Å telle med 1 og 10 — med spørsmålstegnruter og oppleste tall — er alltid gratis."
    },
    "toolEntry": {
      "slug": "telle-i-kor",
      "name": "Telle i kor",
      "tagline": "Hele klassen teller høyt sammen — hvert trykk skriver neste tall inn i rutenettet.",
      "metaTitle": "Telle i kor – tallrekker for småskolen | LessonCraftStudio",
      "metaDescription": "Digital telletavle: hvert trykk skriver neste tall i rutenettet. Tell høyt sammen, marker mønstre og øv på tallrekker i småskolen – rett i nettleseren.",
      "about": [
        "Telle i kor er en digital telletavle for hele klassen. Dere teller høyt sammen, og for hvert trykk på «Neste» skrives det neste tallet inn i rutenettet — i lærerens tempo, aldri automatisk. Pausene er selve poenget: Klassen rekker å tenke før tallet kommer. Med tusjene kan dere fargelegge ruter og rader når noen oppdager et mønster, og spørsmålstegnet lar dere stoppe ved en tom rute og undre: Hva kommer her? Slå på talestemmen, så leses hvert tall opp mens tallene vokser fram på tavla.",
        "Verktøyet dekker tallrekkene klassen møter i matematikk på 1. og 2. trinn (LK20): telle til 100, tierhopp, toere og femmere, telle baklengs og over hundrerne. Gratisversjonen lar dere telle med 1 og 10, med spørsmålstegnruter og oppleste tall — nok til den daglige samlingsstunden. Med Premium åpner du alle steg og starttall, baklengs telling, tusjene, kolonnevalget og de ferdige tellingene for skolestart, 1. og 2. trinn, og du kan lagre inntil åtte planlagte tellinger til senere økter."
      ],
      "howToUse": [
        "Velg en ferdig telling, eller sett starttall, steg og antall kolonner selv.",
        "Tell høyt i kor med klassen, og trykk på «Neste» for hvert tall — tavla venter alltid på dere.",
        "Stopp underveis: Fargelegg ruter med tusjene og spør «Hva legger dere merke til?»",
        "Sett et spørsmålstegn på en tom rute, la klassen forutsi tallet, og tell dere fram til svaret sammen."
      ],
      "classroomIdeas": [
        "Samlingsstund: Tell til 30 i kor mens tallene vokser fram rad for rad, og la barna oppdage at kolonnene gjentar seg.",
        "Tierhopp fra 7: La klassen forutsi neste tall, og fargelegg enerne — hvorfor står det en sjuer i alle rutene?",
        "Tell baklengs fra 20 som overgangsrutine før friminuttet — sett et spørsmålstegn på et par ruter, og la klassen hviske tallet når dere kommer dit."
      ]
    },
    "manip": {
      "title": "Telle i kor",
      "tagline": "Hele klassen teller høyt sammen mens tallene vokser fram i rutenettet.",
      "description": "En digital telletavle i lærerens tempo: hvert trykk skriver neste tall, og klassen teller i kor. Fargelegg mønstre med tusjene, sett spørsmålstegn på tomme ruter, og la talestemmen lese hvert tall høyt."
    }
  },
  "fi": {
    "corrections": {
      "instruction": "Lasketaan yhdessä ääneen — jokainen napautus kirjoittaa seuraavan luvun taululle.",
      "skipLabel": "Askel",
      "newCountAsk": "Aloitetaanko uusi lukujono?",
      "newCountYes": "Uusi lukujono",
      "presetsTitle": "Valmiit lukujonot",
      "pG1c": "Seitsemästä kymmenittäin",
      "pG2c": "Tuhannesta alaspäin",
      "showBoundary": "Pitkät lukusanat",
      "saveCount": "Tallenna lukujono",
      "savedList": "Tallennetut lukujonot",
      "replaceAsk": "Kaikki 8 paikkaa on täynnä — korvataanko vanhin?",
      "deleteSave": "Poista tallennettu lukujono",
      "setSpeak": "Lue jokainen luku ääneen",
      "voiceMissing": "Tässä laitteessa ei ole puheääntä tälle kielelle.",
      "gatePremium": "Kaikki askeleet ja aloitusluvut, taaksepäin laskeminen, tussit, sarakevalinta ja tallennetut lukujonot kuuluvat Premiumiin. Ykkösin ja kymmenin laskeminen — kysymysmerkkiruutuineen ja ääneen luettuine lukuineen — on aina ilmaista."
    },
    "toolEntry": {
      "slug": "lasketaan-yhdessa",
      "name": "Lasketaan yhdessä",
      "tagline": "Koko luokka laskee ääneen — jokainen napautus kirjoittaa seuraavan luvun taululle.",
      "metaTitle": "Lasketaan yhdessä – lukujonot ja ääneen laskeminen luokassa",
      "metaDescription": "Taulutyökalu yhteiseen ääneen laskemiseen: jokainen napautus kirjoittaa seuraavan luvun ruudukkoon. Lukujonot, merkit ja puheääni esikoulusta 2. luokalle.",
      "about": [
        "Lasketaan yhdessä tuo koko luokan yhteisen ääneen laskemisen taululle. Luokka laskee yhteen ääneen, ja jokainen napautus kirjoittaa seuraavan luvun ruudukkoon — työkalu ei koskaan kiirehdi eteenpäin, vaan opettaja määrää tahdin. Kun lukujono on taululla, alkaa tärkein vaihe: Mitä huomaatte? Tussiväreillä voi korostaa ruutuja ja kuvioita, ja kysymysmerkillä voi merkitä tyhjän ruudun, jota jäädään yhdessä odottamaan. Halutessaan opettaja voi antaa laitteen lukea jokaisen luvun ääneen: suomen pitkät, läpinäkyvät lukusanat, kuten kaksikymmentäyksi, kuuluvat selvästi, ja sadan jälkeen puhe hidastuu automaattisesti, jotta lukusanan osat erottuvat. Lukujonotaidot ovat esi- ja alkuopetuksen matematiikan ydintä, ja yhdessä laskien niitä harjoittelee koko luokka kerralla.",
        "Ilmaisversiolla lasketaan ykkösin ja kymmenin: aloitusluvuksi 0, 1 tai 10, käytössä kysymysmerkit, puheääni ja kaksi esikoulun valmista lukujonoa. Premium avaa loput: kaikki askeleet ja aloitusluvut aina tuhanteen asti, taaksepäin laskemisen, sarakkeiden valinnan, tussit ja korostukset, koko valmiiden lukujonojen hyllyn — myös Kuunnellaan tarkasti -jonot, joissa lukusanat pääsevät oikeuksiinsa — sekä enintään kahdeksan tallennettua omaa lukujonoa. Pisteitä tai ajastimia ei ole: vain yhteistä laskemista ja huomaamisen iloa."
      ],
      "howToUse": [
        "Valitse valmis lukujono tai kokoa oma: aloitusluku, askel ja sarakkeiden määrä.",
        "Lasketaan yhdessä ääneen — napauta Seuraava vasta, kun luokka on sanonut luvun.",
        "Merkitse kysymysmerkillä ruutu, jota jäädään odottamaan, ja korosta tusseilla lukujen kuvioita.",
        "Kysy lopuksi: Mitä huomaatte? — keskustelu on koko harjoituksen tärkein osa."
      ],
      "classroomIdeas": [
        "Aamupiirin rutiini: lasketaan joka aamu samaa lukujonoa ja jatketaan siitä, mihin eilen jäätiin.",
        "Kuunnellaan tarkasti: laita puheääni päälle ja lasketaan sadan yli — huomaatteko, miten lukusanat pitenevät, vaikka puhe rauhoittuu?",
        "Ennustusleikki: merkitse kysymysmerkki kauas tulevaan ruutuun ja pohtikaa matkan varrella, mikä luku siihen aikanaan kirjoitetaan."
      ]
    },
    "manip": {
      "title": "Lasketaan yhdessä",
      "tagline": "Koko luokka laskee ääneen, ja jokainen napautus kirjoittaa seuraavan luvun taululle.",
      "description": "Yhteisen ääneen laskemisen taulu: valitse aloitusluku ja askel, ja luvut ilmestyvät ruudukkoon napautus kerrallaan — opettajan tahdissa. Kysymysmerkit ja tussivärit kutsuvat huomaamaan kuvioita, ja puheääni lukee halutessa jokaisen luvun rauhallisesti, pitkät lukusanat selvästi. Esikoulusta toiselle luokalle."
    }
  }
};

const MANIP_EN = {
  "title": "Choral Counting",
  "tagline": "Count aloud together while the chart writes itself — and the patterns pop.",
  "description": "A whole-class counting chart for the projector: the class chants, you tap, and each number inks onto the chart in your tempo — never its own. Markers, digit tints, and wonder-mark “?” cells turn the count into a conversation about patterns. With speech on, the room hears each number in your language."
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
        if (key === 'labels' || key === 'choral-counting') continue;
        if (j[key] && j[key].slug === slug) die(`slug collision: ${L} "${slug}" already used by ${kind}/${file}.json → ${key}`);
      }
    }
  }
}
console.log('slug gate: 10 slugs clean vs tool-content AND maker-content ×11');

/* ---------- 1. strings corrections ---------- */
let src = fs.readFileSync(TOOL, 'utf8');
let applied = 0;
for (const L of LOCS) {
  const corr = FANOUT[L].corrections;
  for (const key of Object.keys(corr)) {
    const lineRe = new RegExp('^(    ' + key + ':\\s*\\{.*)$', 'm');
    const m = src.match(lineRe);
    if (!m) die(`strings line not found for key "${key}"`);
    const line = m[1];
    const segRe = new RegExp('([,{])' + L + ":'[^']*'");
    if (!segRe.test(line)) die(`locale segment ${L} not found on line for "${key}"`);
    const newLine = line.replace(segRe, (mm, pre) => pre + L + ":'" + corr[key] + "'");
    src = src.replace(line, newLine);
    applied++;
  }
}
fs.writeFileSync(TOOL, src);
console.log(`strings: ${applied} locale corrections applied`);

/* ---------- 2. ToolEntry per locale ---------- */
for (const L of LOCS) {
  const p = path.join(REPO, 'frontend', 'messages', 'tool-content', L + '.json');
  const raw = fs.readFileSync(p, 'utf8');
  if (raw.includes('"choral-counting"')) die(`${L}.json already has choral-counting`);
  const j = JSON.parse(raw);
  const out = {};
  for (const key of Object.keys(j)) {
    if (key === 'labels') out['choral-counting'] = FANOUT[L].toolEntry;
    out[key] = j[key];
  }
  if (!out['choral-counting']) die(`${L}.json has no labels key`);
  fs.writeFileSync(p, JSON.stringify(out, null, 2) + '\n');
  console.log(`tool-content/${L}.json: choral-counting added (slug ${FANOUT[L].toolEntry.slug})`);
}

/* ---------- 3. manipulatives.ts entry ---------- */
const MP = path.join(REPO, 'frontend', 'lib', 'manipulatives.ts');
let mp = fs.readFileSync(MP, 'utf8');
if (mp.includes('id: "choral-counting"')) die('manipulatives.ts already has choral-counting');
const q = (s) => '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
function block(field) {
  const lines = ALL.map((L) => {
    const v = L === 'en' ? MANIP_EN[field] : FANOUT[L].manip[field];
    return '      ' + L + ': ' + q(v) + ',';
  });
  return '    ' + field + ': {\n' + lines.join('\n') + '\n    },';
}
const entry = '  {\n    id: "choral-counting",\n    mini_tool_url: "/mini-tools/choral-counting.html",\n'
  + block('title') + '\n' + block('tagline') + '\n' + block('description') + '\n  },\n';
const anchor = mp.lastIndexOf('];');
if (anchor < 0) die('manipulatives.ts: closing ]; not found');
/* insert before the newline preceding the ]; that closes MANIPULATIVES */
const arrEnd = mp.indexOf('\n];', mp.indexOf('export const MANIPULATIVES'));
if (arrEnd < 0) die('MANIPULATIVES array end not found');
mp = mp.slice(0, arrEnd + 1) + entry + mp.slice(arrEnd + 1);
fs.writeFileSync(MP, mp);
console.log('manipulatives.ts: choral-counting entry added (11 locales)');

console.log('APPLIED — choral-counting.js strings, 10 tool-content files, manipulatives.ts');
