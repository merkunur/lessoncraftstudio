#!/usr/bin/env node
/* =====================================================================
   register-number-balance.js — registration insert for TOOL #31.

   ⚠ A tool is not shippable until `frontend/config/live-tool-slugs.ts`
   carries its key — miss that and all eleven locales return 410.

   ⚠ CURATION: en authored; the other ten are builder drafts written IN
   the locale, corrected later by the native 3-agent ensembles (§A.13.48).
   [NSR-FLAG] sv/da/no/fi. pt Brazilian per §6.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const KEY = 'number-balance';

const A = (s) => s;   /* readability only */

const E = {
  en: {
    slug: 'number-balance', name: 'Number Balance',
    tagline: 'The beam tips, so nobody has to say wrong — and the size of the tip tells you how far off you are.',
    about: [
      A("Number Balance is a beam on a fulcrum with a pan hanging at each end. Children drag number tiles into the pans; a pan is worth the sum of its tiles; and the beam is level only when the two sides are worth the same. That is the whole apparatus, and it exists to fix one thing."),
      A("Children read the equals sign as “and here comes the answer”. So 8 = 3 + 5 looks backwards to them, and asked to complete 3 + 5 = □ + 2 a large majority of K-2 children write 8. It is the most documented arithmetic misconception in the world and it is invisible on a worksheet, because a worksheet only ever shows the equals sign with a box after it. Here the sign gets its meaning from a beam that is level — a state of the world you can see, not an instruction to compute."),
      A("The feedback is the tip itself, and it is analog. A near miss leans a little; a wild miss slams down. A child can read how far off they are and act on it, and nothing anywhere says wrong. Two teacher moves make it a lesson: hold the beam so the class predicts which way it will go before you let go, and put a cloth over a pan and ask what must be underneath for it to balance. Turn notation on and the tool writes what the beam is doing — level is =, tipped is > or < pointing at the heavier side — which is exactly how those two signs should first be met.")
    ],
    howToUse: [
      A('Open it on the class screen. Two empty pans, a tray of numbers, nothing to set up.'),
      A('Drag a number into a pan. The beam moves as soon as you let go. Drag more in, or tap a tile in a pan to take it out again.'),
      A('Tap “Hold the beam” before the last tile goes in, and ask the class which way it will tip. Then let go. That pause is the best minute in the tool.'),
      A('Put a cloth over one pan and build the other. “What must be under the cloth to make it level?” is the missing-addend question, and the lean is an honest clue rather than a giveaway.'),
      A('Leave the totals and the notation off to begin with. Switch them on when the class has stopped computing and started looking.')
    ],
    classroomIdeas: [
      A('Put 8 alone on the left and ask the class to make the right side match. Then do it again with a different pair. Writing 8 = 3 + 5 afterwards feels obvious instead of backwards.'),
      A('Build 3 + 5 on the left and 2 on the right, and ask what is missing. The beam tells them whether their guess was close, which is more useful than being told it was wrong.'),
      A('Add 2 to one side and ask what has to happen on the other. Compensation is nearly impossible to explain and nearly obvious to watch.'),
      A('Use the tip as a discussion, not an answer: “it only leaned a little — what does that tell us?” The size of the lean is information, and children read it faster than adults expect.')
    ],
    metaTitle: 'Number Balance — the Equals Sign as a Beam | Free Tool',
    metaDescription: 'A free K-2 balance for teaching what the equals sign means: build both sides, watch the beam tip, and see that level means the same. Nothing is marked.'
  },
  de: {
    slug: 'zahlenwaage', name: 'Zahlenwaage',
    tagline: 'Der Balken kippt — niemand muss „falsch“ sagen, und wie weit er kippt, zeigt, wie weit es daneben ist.',
    about: [
      A('Die Zahlenwaage ist ein Balken auf einem Drehpunkt mit je einer Schale an jedem Ende. Kinder ziehen Zahlenplättchen hinein; eine Schale ist so viel wert wie die Summe ihrer Plättchen; und der Balken ist nur dann waagerecht, wenn beide Seiten gleich viel wert sind.'),
      A('Kinder lesen das Gleichheitszeichen als „und jetzt kommt das Ergebnis“. Deshalb sieht 8 = 3 + 5 für sie verkehrt herum aus, und bei 3 + 5 = □ + 2 schreibt die große Mehrheit eine 8. Es ist die am besten dokumentierte Fehlvorstellung der Grundschulmathematik, und auf einem Arbeitsblatt ist sie unsichtbar. Hier bekommt das Zeichen seine Bedeutung von einem waagerechten Balken — von einem Zustand, den man sehen kann, nicht von einer Rechenaufforderung.'),
      A('Die Rückmeldung ist das Kippen selbst, und sie ist analog: knapp daneben neigt sich leicht, weit daneben schlägt durch. Ein Kind sieht, wie weit es daneben liegt, und niemand sagt „falsch“. Zwei Lehrerzüge machen daraus eine Stunde: den Balken festhalten, damit die Klasse vorhersagt, wohin er kippt, und ein Tuch über eine Schale legen — „was muss darunter liegen, damit es waagerecht wird?“. Mit eingeschalteter Notation schreibt das Werkzeug auf, was der Balken tut: waagerecht ist =, gekippt ist > oder < in Richtung der schwereren Seite.')
    ],
    howToUse: [
      A('Am Klassenbildschirm öffnen. Zwei leere Schalen, ein Tablett mit Zahlen, nichts einzurichten.'),
      A('Ziehen Sie eine Zahl in eine Schale. Der Balken bewegt sich, sobald Sie loslassen. Ein Plättchen in der Schale antippen nimmt es wieder heraus.'),
      A('Tippen Sie vor dem letzten Plättchen auf „Balken festhalten“ und fragen Sie die Klasse, wohin er kippen wird. Dann loslassen. Diese Pause ist die beste Minute im Werkzeug.'),
      A('Decken Sie eine Schale zu und bauen Sie die andere. „Was muss unter dem Tuch liegen, damit es waagerecht wird?“ ist die Frage nach dem fehlenden Summanden.'),
      A('Lassen Sie Summen und Notation zuerst aus. Schalten Sie sie ein, wenn die Klasse aufgehört hat zu rechnen und angefangen hat zu schauen.')
    ],
    classroomIdeas: [
      A('Legen Sie die 8 allein nach links und lassen Sie die Klasse rechts dasselbe bauen. Danach ist 8 = 3 + 5 selbstverständlich statt verkehrt herum.'),
      A('Bauen Sie links 3 + 5 und rechts nur die 2 und fragen Sie, was fehlt. Der Balken sagt, ob die Vermutung nah dran war.'),
      A('Legen Sie auf einer Seite 2 dazu und fragen Sie, was auf der anderen passieren muss. Ausgleichen lässt sich kaum erklären und fast von selbst beobachten.'),
      A('Nutzen Sie das Kippen als Gespräch: „Es hat sich nur ein bisschen geneigt — was sagt uns das?“ Die Größe der Neigung ist eine Information.')
    ],
    metaTitle: 'Zahlenwaage — das Gleichheitszeichen als Balken | Kostenlos',
    metaDescription: 'Kostenlose Zahlenwaage für die Grundschule: beide Seiten selbst bauen, den Balken kippen sehen und begreifen, dass waagerecht „gleich viel“ heißt. Ohne Bewertung.'
  },
  fr: {
    slug: 'balance-des-nombres', name: 'Balance des nombres',
    tagline: 'Le fléau penche — personne n’a besoin de dire « faux », et l’ampleur du penchant dit de combien on s’est trompé.',
    about: [
      A('La Balance des nombres, c’est un fléau sur un pivot avec un plateau suspendu à chaque bout. Les enfants y font glisser des jetons-nombres ; un plateau vaut la somme de ses jetons ; et le fléau n’est horizontal que si les deux côtés valent la même chose.'),
      A('Les enfants lisent le signe égal comme « et voici la réponse ». Alors 8 = 3 + 5 leur paraît à l’envers, et devant 3 + 5 = □ + 2 une large majorité écrit 8. C’est l’erreur la mieux documentée du calcul à l’école élémentaire, et elle est invisible sur une fiche. Ici le signe prend son sens dans un fléau horizontal — un état du monde qu’on voit, pas une consigne de calcul.'),
      A('Le retour, c’est le penchant lui-même, et il est analogique : presque juste penche un peu, très faux bascule d’un coup. L’enfant voit de combien il s’est trompé et personne ne dit « faux ». Deux gestes de l’enseignant en font une leçon : bloquer le fléau pour que la classe prédise de quel côté il ira, et couvrir un plateau d’un tissu — « que faut-il dessous pour que ce soit horizontal ? ». Avec la notation activée, l’outil écrit ce que fait le fléau : horizontal, c’est = ; penché, c’est > ou < vers le côté le plus lourd.')
    ],
    howToUse: [
      A('Ouvrez-le sur l’écran de la classe. Deux plateaux vides, un plateau de nombres, rien à installer.'),
      A('Faites glisser un nombre dans un plateau. Le fléau bouge dès que vous lâchez. Toucher un jeton posé le retire.'),
      A('Touchez « Bloquer le fléau » avant le dernier jeton et demandez de quel côté il penchera. Puis lâchez. Cette pause est la meilleure minute de l’outil.'),
      A('Couvrez un plateau et construisez l’autre. « Que faut-il sous le tissu pour que ce soit horizontal ? » est la question du terme manquant.'),
      A('Laissez d’abord les totaux et la notation désactivés. Activez-les quand la classe a cessé de calculer et s’est mise à regarder.')
    ],
    classroomIdeas: [
      A('Posez le 8 seul à gauche et demandez à la classe de faire pareil à droite. Écrire 8 = 3 + 5 ensuite paraît évident au lieu d’être à l’envers.'),
      A('Construisez 3 + 5 à gauche et seulement 2 à droite, puis demandez ce qui manque. Le fléau dit si la proposition était proche.'),
      A('Ajoutez 2 d’un côté et demandez ce qui doit se passer de l’autre. La compensation s’explique mal et s’observe très bien.'),
      A('Servez-vous du penchant comme d’une discussion : « ça a très peu penché — qu’est-ce que ça nous dit ? »')
    ],
    metaTitle: 'Balance des nombres — le signe égal comme un fléau | Gratuit',
    metaDescription: 'Balance gratuite pour la maternelle et le CP : construire les deux côtés, voir le fléau pencher, comprendre qu’horizontal veut dire « autant que ». Rien n’est corrigé.'
  },
  it: {
    slug: 'bilancia-dei-numeri', name: 'Bilancia dei numeri',
    tagline: 'L’asta pende — nessuno deve dire «sbagliato», e quanto pende dice di quanto ci si è allontanati.',
    about: [
      A('La Bilancia dei numeri è un’asta su un perno con un piatto appeso a ogni estremità. I bambini ci trascinano dentro le tessere-numero; un piatto vale la somma delle sue tessere; e l’asta è dritta solo quando i due lati valgono la stessa cosa.'),
      A('I bambini leggono il segno di uguale come «ed ecco il risultato». Così 8 = 3 + 5 sembra loro al contrario, e davanti a 3 + 5 = □ + 2 la grande maggioranza scrive 8. È l’errore più documentato dell’aritmetica della scuola primaria ed è invisibile su una scheda. Qui il segno prende senso da un’asta dritta — uno stato del mondo che si vede, non un ordine di calcolare.'),
      A('Il riscontro è la pendenza stessa, ed è analogica: quasi giusto pende poco, del tutto sbagliato crolla. Il bambino vede di quanto ha sbagliato e nessuno dice «sbagliato». Due mosse dell’insegnante lo rendono una lezione: tenere ferma l’asta perché la classe preveda da che parte andrà, e coprire un piatto con un telo — «che cosa deve esserci sotto perché sia dritta?». Con la notazione attiva lo strumento scrive che cosa fa l’asta: dritta è =, pendente è > o < verso il lato più pesante.')
    ],
    howToUse: [
      A('Aprila sullo schermo della classe. Due piatti vuoti, un vassoio di numeri, niente da impostare.'),
      A('Trascina un numero in un piatto. L’asta si muove appena lasci. Toccare una tessera nel piatto la toglie.'),
      A('Tocca «Tieni ferma l’asta» prima dell’ultima tessera e chiedi da che parte penderà. Poi lascia. Quella pausa è il minuto migliore dello strumento.'),
      A('Copri un piatto e costruisci l’altro. «Che cosa deve esserci sotto il telo perché sia dritta?» è la domanda sull’addendo mancante.'),
      A('All’inizio lascia spenti i totali e la notazione. Accendili quando la classe ha smesso di calcolare e ha cominciato a guardare.')
    ],
    classroomIdeas: [
      A('Metti l’8 da solo a sinistra e chiedi alla classe di pareggiarlo a destra. Scrivere poi 8 = 3 + 5 sembra ovvio invece che al contrario.'),
      A('Costruisci 3 + 5 a sinistra e solo il 2 a destra, poi chiedi che cosa manca. L’asta dice se la proposta era vicina.'),
      A('Aggiungi 2 da una parte e chiedi che cosa deve succedere dall’altra. La compensazione si spiega male e si guarda benissimo.'),
      A('Usa la pendenza come conversazione: «ha pesato solo un pochino — che cosa ci dice?»')
    ],
    metaTitle: 'Bilancia dei numeri — il segno di uguale come un’asta | Gratis',
    metaDescription: 'Bilancia gratuita per la scuola primaria: costruire i due lati, vedere l’asta pendere e capire che dritta vuol dire «tanto quanto». Niente viene corretto.'
  },
  es: {
    slug: 'balanza-numerica', name: 'Balanza numérica',
    tagline: 'El brazo se inclina — nadie tiene que decir «mal», y cuánto se inclina dice cuánto falta.',
    about: [
      A('La Balanza numérica es un brazo sobre un eje con un platillo colgando de cada extremo. Los niños arrastran fichas de números dentro; un platillo vale la suma de sus fichas; y el brazo solo queda recto cuando los dos lados valen lo mismo.'),
      A('Los niños leen el signo igual como «y aquí viene la respuesta». Por eso 8 = 3 + 5 les parece al revés, y ante 3 + 5 = □ + 2 la gran mayoría escribe 8. Es el error mejor documentado de la aritmética de primaria y en una ficha es invisible. Aquí el signo toma su sentido de un brazo recto — un estado del mundo que se ve, no una orden de calcular.'),
      A('La respuesta es la inclinación misma, y es analógica: casi acertado se inclina poco, muy equivocado se desploma. El niño ve cuánto le falta y nadie dice «mal». Dos gestos del docente lo convierten en clase: sujetar el brazo para que el grupo prediga hacia dónde irá, y tapar un platillo con una tela — «¿qué tiene que haber debajo para que quede recto?». Con la notación activada, la herramienta escribe lo que hace el brazo: recto es =, inclinado es > o < señalando el lado más pesado.')
    ],
    howToUse: [
      A('Ábrela en la pantalla del aula. Dos platillos vacíos, una bandeja de números, nada que configurar.'),
      A('Arrastra un número a un platillo. El brazo se mueve en cuanto sueltas. Tocar una ficha del platillo la retira.'),
      A('Toca «Sujetar el brazo» antes de la última ficha y pregunta hacia dónde se inclinará. Luego suelta. Esa pausa es el mejor minuto de la herramienta.'),
      A('Tapa un platillo y construye el otro. «¿Qué tiene que haber debajo de la tela para que quede recto?» es la pregunta del sumando que falta.'),
      A('Deja al principio los totales y la notación apagados. Enciéndelos cuando el grupo haya dejado de calcular y se haya puesto a mirar.')
    ],
    classroomIdeas: [
      A('Pon el 8 solo a la izquierda y pide al grupo que lo iguale a la derecha. Escribir después 8 = 3 + 5 resulta evidente en vez de al revés.'),
      A('Construye 3 + 5 a la izquierda y solo el 2 a la derecha, y pregunta qué falta. El brazo dice si la propuesta estaba cerca.'),
      A('Añade 2 a un lado y pregunta qué tiene que pasar en el otro. La compensación se explica mal y se observa muy bien.'),
      A('Usa la inclinación como conversación: «se inclinó solo un poquito, ¿qué nos dice eso?»')
    ],
    metaTitle: 'Balanza numérica — el signo igual como un brazo | Gratis',
    metaDescription: 'Balanza gratuita para infantil y primaria: construir los dos lados, ver inclinarse el brazo y entender que recto significa «lo mismo». No se corrige nada.'
  },
  pt: {
    slug: 'balanca-numerica', name: 'Balança numérica',
    tagline: 'O braço pende — ninguém precisa dizer «errado», e o quanto ele pende mostra o quanto falta.',
    about: [
      A('A Balança numérica é um braço sobre um eixo com um prato pendurado em cada ponta. As crianças arrastam peças de números para dentro; um prato vale a soma das suas peças; e o braço só fica reto quando os dois lados valem a mesma coisa.'),
      A('As crianças leem o sinal de igual como «e aqui vem a resposta». Por isso 8 = 3 + 5 parece de trás para a frente, e diante de 3 + 5 = □ + 2 a grande maioria escreve 8. É o erro mais documentado da aritmética dos anos iniciais e numa folha ele é invisível. Aqui o sinal ganha sentido a partir de um braço reto — um estado do mundo que dá para ver, não uma ordem de calcular.'),
      A('A resposta é a inclinação em si, e ela é analógica: quase certo pende pouco, muito errado desaba. A criança vê o quanto errou e ninguém diz «errado». Dois gestos do professor transformam isso numa aula: segurar o braço para a turma prever para que lado vai, e tapar um prato com um pano — «o que tem de estar debaixo para ficar reto?». Com a notação ligada, a ferramenta escreve o que o braço faz: reto é =, pendido é > ou < apontando para o lado mais pesado.')
    ],
    howToUse: [
      A('Abra na tela da turma. Dois pratos vazios, uma bandeja de números, nada para configurar.'),
      A('Arraste um número para um prato. O braço se mexe assim que você solta. Tocar numa peça do prato tira ela de volta.'),
      A('Toque em «Segurar o braço» antes da última peça e pergunte para que lado vai pender. Depois solte. Essa pausa é o melhor minuto da ferramenta.'),
      A('Tape um prato e construa o outro. «O que tem de estar debaixo do pano para ficar reto?» é a pergunta da parcela que falta.'),
      A('No começo deixe os totais e a notação desligados. Ligue quando a turma tiver parado de calcular e começado a olhar.')
    ],
    classroomIdeas: [
      A('Ponha o 8 sozinho à esquerda e peça para a turma igualar à direita. Escrever depois 8 = 3 + 5 fica óbvio em vez de invertido.'),
      A('Construa 3 + 5 à esquerda e só o 2 à direita, e pergunte o que falta. O braço diz se o palpite estava perto.'),
      A('Acrescente 2 de um lado e pergunte o que precisa acontecer do outro. Compensação quase não dá para explicar e dá muito bem para ver.'),
      A('Use a inclinação como conversa: «pendeu só um pouquinho — o que isso diz para a gente?»')
    ],
    metaTitle: 'Balança numérica — o sinal de igual como um braço | Grátis',
    metaDescription: 'Balança gratuita para a educação infantil e anos iniciais: construir os dois lados, ver o braço pender e entender que reto quer dizer «a mesma coisa».'
  },
  nl: {
    slug: 'getallenbalans', name: 'Getallenbalans',
    tagline: 'De balk kantelt — niemand hoeft «fout» te zeggen, en hoe ver hij kantelt zegt hoeveel het scheelt.',
    about: [
      A('De Getallenbalans is een balk op een draaipunt met aan elk uiteinde een schaal. Kinderen slepen er getalfiches in; een schaal is de som van zijn fiches waard; en de balk is alleen recht als beide kanten evenveel waard zijn.'),
      A('Kinderen lezen het isgelijkteken als «en hier komt het antwoord». Daardoor ziet 8 = 3 + 5 er voor hen omgekeerd uit, en bij 3 + 5 = □ + 2 schrijft de grote meerderheid 8. Het is de best gedocumenteerde misvatting in het rekenen van de onderbouw en op een werkblad is die onzichtbaar. Hier krijgt het teken zijn betekenis van een rechte balk — een toestand die je ziet, geen opdracht om te rekenen.'),
      A('De terugkoppeling is het kantelen zelf, en die is analoog: bijna goed helt een beetje, ver ernaast klapt door. Een kind ziet hoeveel het scheelt en niemand zegt «fout». Twee zetten van de leerkracht maken er een les van: de balk vasthouden zodat de klas voorspelt welke kant hij op gaat, en een doek over een schaal leggen — «wat moet eronder liggen om het recht te krijgen?». Met notatie aan schrijft het gereedschap op wat de balk doet: recht is =, gekanteld is > of < naar de zwaardere kant.')
    ],
    howToUse: [
      A('Open het op het klassenscherm. Twee lege schalen, een blad met getallen, niets in te stellen.'),
      A('Sleep een getal in een schaal. De balk beweegt zodra u loslaat. Op een fiche in de schaal tikken haalt het er weer uit.'),
      A('Tik op «Balk vasthouden» vóór het laatste fiche en vraag de klas welke kant hij op gaat. Dan loslaten. Die pauze is de beste minuut van het gereedschap.'),
      A('Dek één schaal af en bouw de andere. «Wat moet er onder de doek liggen om het recht te krijgen?» is de vraag naar het ontbrekende getal.'),
      A('Laat de totalen en de notatie eerst uit. Zet ze aan als de klas gestopt is met rekenen en begonnen is met kijken.')
    ],
    classroomIdeas: [
      A('Leg de 8 alleen links en laat de klas rechts hetzelfde maken. Daarna voelt 8 = 3 + 5 vanzelfsprekend in plaats van omgekeerd.'),
      A('Bouw links 3 + 5 en rechts alleen de 2, en vraag wat er mist. De balk zegt of de gok dichtbij was.'),
      A('Leg er aan één kant 2 bij en vraag wat er aan de andere kant moet gebeuren. Compenseren laat zich slecht uitleggen en prima bekijken.'),
      A('Gebruik het kantelen als gesprek: «hij helde maar een beetje — wat zegt ons dat?»')
    ],
    metaTitle: 'Getallenbalans — het isgelijkteken als een balk | Gratis tool',
    metaDescription: 'Gratis balans voor groep 1-4: bouw beide kanten, zie de balk kantelen en begrijp dat recht «evenveel als» betekent. Er wordt niets nagekeken.'
  },
  sv: {
    slug: 'talvag', name: 'Talvåg',
    tagline: 'Balken lutar — ingen behöver säga «fel», och hur mycket den lutar visar hur långt ifrån man är.',
    about: [
      A('Talvågen är en balk på ett vridcentrum med en skål hängande i varje ände. Barnen drar in talbrickor; en skål är värd summan av sina brickor; och balken är rak bara när de båda sidorna är värda lika mycket.'),
      A('Barn läser likhetstecknet som «och här kommer svaret». Därför ser 8 = 3 + 5 baklänges ut för dem, och inför 3 + 5 = □ + 2 skriver en stor majoritet 8. Det är den mest dokumenterade missuppfattningen i lågstadiets räkning, och på ett arbetsblad syns den inte. Här får tecknet sin mening av en rak balk — ett tillstånd i världen som går att se, inte en uppmaning att räkna.'),
      A('Återkopplingen är lutningen själv, och den är analog: nästan rätt lutar lite, helt fel slår i botten. Barnet ser hur långt ifrån det är och ingen säger «fel». Två lärardrag gör det till en lektion: håll balken så att klassen förutsäger åt vilket håll den ska, och lägg ett tyg över en skål — «vad måste ligga under för att den ska bli rak?». Med notationen på skriver verktyget vad balken gör: rak är =, lutande är > eller < mot den tyngre sidan.')
    ],
    howToUse: [
      A('Öppna den på klassens skärm. Två tomma skålar, en bricka med tal, inget att ställa in.'),
      A('Dra in ett tal i en skål. Balken rör sig så fort du släpper. Att trycka på en bricka i skålen tar bort den igen.'),
      A('Tryck på «Håll balken» före den sista brickan och fråga klassen åt vilket håll den lutar. Släpp sedan. Den pausen är verktygets bästa minut.'),
      A('Täck en skål och bygg den andra. «Vad måste ligga under tyget för att den ska bli rak?» är frågan om den saknade termen.'),
      A('Låt summorna och notationen vara avstängda till att börja med. Slå på dem när klassen har slutat räkna och börjat titta.')
    ],
    classroomIdeas: [
      A('Lägg 8 ensam till vänster och låt klassen göra likadant till höger. Att sedan skriva 8 = 3 + 5 känns självklart i stället för baklänges.'),
      A('Bygg 3 + 5 till vänster och bara 2 till höger, och fråga vad som saknas. Balken säger om gissningen var nära.'),
      A('Lägg till 2 på ena sidan och fråga vad som måste hända på den andra. Kompensation är svår att förklara och lätt att se.'),
      A('Använd lutningen som ett samtal: «den lutade bara lite — vad säger det oss?»')
    ],
    metaTitle: 'Talvåg — likhetstecknet som en balk | Gratis verktyg',
    metaDescription: 'Gratis våg för förskoleklass och lågstadiet: bygg båda sidorna, se balken luta och förstå att rak betyder «lika mycket». Ingenting rättas.'
  },
  da: {
    slug: 'talvagt', name: 'Talvægt',
    tagline: 'Bjælken vipper — ingen behøver sige «forkert», og hvor meget den vipper viser, hvor langt fra man er.',
    about: [
      A('Talvægten er en bjælke på et omdrejningspunkt med en skål hængende i hver ende. Børnene trækker talbrikker ind; en skål er lige så meget værd som summen af sine brikker; og bjælken er kun lige, når de to sider er lige meget værd.'),
      A('Børn læser lighedstegnet som «og her kommer svaret». Derfor ser 8 = 3 + 5 bagvendt ud for dem, og over for 3 + 5 = □ + 2 skriver et stort flertal 8. Det er den bedst dokumenterede misforståelse i indskolingens regning, og på et arbejdsark er den usynlig. Her får tegnet sin betydning fra en lige bjælke — en tilstand i verden, man kan se, ikke en opfordring til at regne.'),
      A('Tilbagemeldingen er selve vippet, og den er analog: næsten rigtigt vipper lidt, helt forkert slår i bund. Barnet ser, hvor langt fra det er, og ingen siger «forkert». To lærertræk gør det til en lektion: hold bjælken, så klassen forudsiger, hvilken vej den går, og læg et klæde over en skål — «hvad skal ligge under, for at den bliver lige?». Med notationen slået til skriver værktøjet, hvad bjælken gør: lige er =, vippet er > eller < mod den tungeste side.')
    ],
    howToUse: [
      A('Åbn den på klassens skærm. To tomme skåle, en bakke med tal, intet at indstille.'),
      A('Træk et tal ind i en skål. Bjælken bevæger sig, så snart du slipper. Tryk på en brik i skålen for at tage den ud igen.'),
      A('Tryk på «Hold bjælken» før den sidste brik, og spørg klassen, hvilken vej den vipper. Slip så. Den pause er værktøjets bedste minut.'),
      A('Dæk den ene skål til og byg den anden. «Hvad skal ligge under klædet, for at den bliver lige?» er spørgsmålet om det manglende tal.'),
      A('Lad summerne og notationen være slået fra til at begynde med. Slå dem til, når klassen er holdt op med at regne og begyndt at kigge.')
    ],
    classroomIdeas: [
      A('Læg 8 alene til venstre, og lad klassen gøre det samme til højre. Bagefter føles 8 = 3 + 5 selvfølgeligt i stedet for bagvendt.'),
      A('Byg 3 + 5 til venstre og kun 2 til højre, og spørg, hvad der mangler. Bjælken siger, om gættet var tæt på.'),
      A('Læg 2 til på den ene side, og spørg, hvad der skal ske på den anden. Udligning er svær at forklare og let at se.'),
      A('Brug vippet som en samtale: «den vippede kun en lille smule — hvad fortæller det os?»')
    ],
    metaTitle: 'Talvægt — lighedstegnet som en bjælke | Gratis værktøj',
    metaDescription: 'Gratis vægt til børnehaveklassen og indskolingen: byg begge sider, se bjælken vippe og forstå, at lige betyder «lige meget». Intet bliver rettet.'
  },
  no: {
    slug: 'tallvekt', name: 'Tallvekt',
    tagline: 'Bjelken vipper — ingen trenger å si «feil», og hvor mye den vipper viser hvor langt unna man er.',
    about: [
      A('Tallvekta er en bjelke på et dreiepunkt med en skål hengende i hver ende. Barna drar inn tallbrikker; en skål er verdt summen av brikkene sine; og bjelken er bare rett når de to sidene er verdt like mye.'),
      A('Barn leser likhetstegnet som «og her kommer svaret». Derfor ser 8 = 3 + 5 baklengs ut for dem, og foran 3 + 5 = □ + 2 skriver de aller fleste 8. Det er den best dokumenterte misoppfatningen i regning på småtrinnet, og på et arbeidsark er den usynlig. Her får tegnet meningen sin fra en rett bjelke — en tilstand i verden du kan se, ikke en oppfordring til å regne.'),
      A('Tilbakemeldingen er selve vippingen, og den er analog: nesten riktig vipper litt, helt feil slår i bunnen. Barnet ser hvor langt unna det er, og ingen sier «feil». To lærergrep gjør det til en leksjon: hold bjelken så klassen forutsier hvilken vei den går, og legg et klede over en skål — «hva må ligge under for at den skal bli rett?». Med notasjonen på skriver verktøyet hva bjelken gjør: rett er =, vippet er > eller < mot den tyngste siden.')
    ],
    howToUse: [
      A('Åpne den på klassens skjerm. To tomme skåler, et brett med tall, ingenting å stille inn.'),
      A('Dra et tall inn i en skål. Bjelken beveger seg med en gang du slipper. Trykk på en brikke i skåla for å ta den ut igjen.'),
      A('Trykk på «Hold bjelken» før den siste brikka, og spør klassen hvilken vei den vipper. Slipp så. Den pausen er verktøyets beste minutt.'),
      A('Dekk til den ene skåla og bygg den andre. «Hva må ligge under kledet for at den skal bli rett?» er spørsmålet om tallet som mangler.'),
      A('La summene og notasjonen være av til å begynne med. Slå dem på når klassen har sluttet å regne og begynt å se.')
    ],
    classroomIdeas: [
      A('Legg 8 alene til venstre, og la klassen gjøre det samme til høyre. Etterpå føles 8 = 3 + 5 selvsagt i stedet for baklengs.'),
      A('Bygg 3 + 5 til venstre og bare 2 til høyre, og spør hva som mangler. Bjelken sier om gjettet var nære.'),
      A('Legg til 2 på den ene sida, og spør hva som må skje på den andre. Utjevning er vanskelig å forklare og lett å se.'),
      A('Bruk vippingen som en samtale: «den vippet bare litt — hva forteller det oss?»')
    ],
    metaTitle: 'Tallvekt — likhetstegnet som en bjelke | Gratis verktøy',
    metaDescription: 'Gratis vekt for 1.-3. trinn: bygg begge sidene, se bjelken vippe og forstå at rett betyr «like mye». Ingenting blir rettet.'
  },
  fi: {
    slug: 'lukuvaaka', name: 'Lukuvaaka',
    tagline: 'Vipu kallistuu — kenenkään ei tarvitse sanoa «väärin», ja kallistuman koko kertoo, kuinka kaukana ollaan.',
    about: [
      A('Lukuvaaka on vipu tukipisteen päällä, ja kummassakin päässä roikkuu kuppi. Lapset vetävät lukulaattoja kuppeihin; kupin arvo on sen laattojen summa; ja vipu on suorassa vain silloin, kun molemmat puolet ovat yhtä arvokkaat.'),
      A('Lapset lukevat yhtäsuuruusmerkin niin, että «tästä tulee vastaus». Siksi 8 = 3 + 5 näyttää heistä väärinpäin, ja tehtävässä 3 + 5 = □ + 2 valtaosa kirjoittaa 8. Se on alkuopetuksen laskennan parhaiten dokumentoitu virhekäsitys, eikä se näy tehtävämonisteessa lainkaan. Täällä merkki saa merkityksensä suorasta vivusta — maailman tilasta, jonka näkee, ei kehotuksesta laskea.'),
      A('Palaute on itse kallistuma, ja se on liukuva: melkein oikein kallistuu vähän, aivan pielessä painuu pohjaan. Lapsi näkee, kuinka kaukana on, eikä kukaan sano «väärin». Kaksi opettajan siirtoa tekee tästä oppitunnin: pidä vipua paikallaan, jotta luokka ennustaa kumpaan suuntaan se lähtee, ja peitä toinen kuppi liinalla — «mitä liinan alla pitää olla, jotta vipu on suorassa?». Kun kirjoitusasu on päällä, työkalu kirjoittaa mitä vipu tekee: suora on =, kallistunut on > tai < raskaampaan suuntaan.')
    ],
    howToUse: [
      A('Avaa se luokan näytölle. Kaksi tyhjää kuppia, tarjotin lukuja, mitään ei tarvitse asettaa.'),
      A('Vedä luku kuppiin. Vipu liikkuu heti kun päästät irti. Kupissa olevan laatan napauttaminen ottaa sen pois.'),
      A('Napauta «Pidä vipua paikallaan» ennen viimeistä laattaa ja kysy luokalta, kumpaan suuntaan se kallistuu. Päästä sitten irti. Se tauko on työkalun paras minuutti.'),
      A('Peitä toinen kuppi ja rakenna toinen. «Mitä liinan alla pitää olla, jotta vipu on suorassa?» on kysymys puuttuvasta yhteenlaskettavasta.'),
      A('Pidä summat ja kirjoitusasu aluksi pois päältä. Laita ne päälle, kun luokka on lakannut laskemasta ja alkanut katsoa.')
    ],
    classroomIdeas: [
      A('Laita 8 yksin vasemmalle ja pyydä luokkaa tekemään oikealle sama verran. Sen jälkeen 8 = 3 + 5 tuntuu itsestään selvältä eikä väärinpäin olevalta.'),
      A('Rakenna vasemmalle 3 + 5 ja oikealle pelkkä 2, ja kysy mitä puuttuu. Vipu kertoo, oliko arvaus lähellä.'),
      A('Lisää toiselle puolelle 2 ja kysy, mitä toisella puolella pitää tapahtua. Tasoittamista on vaikea selittää ja helppo katsoa.'),
      A('Käytä kallistumaa keskusteluna: «se kallistui vain vähän — mitä se meille kertoo?»')
    ],
    metaTitle: 'Lukuvaaka — yhtäsuuruusmerkki vipuna | Maksuton työkalu',
    metaDescription: 'Maksuton vaaka esi- ja alkuopetukseen: rakenna molemmat puolet, katso vivun kallistuvan ja ymmärrä että suora tarkoittaa «yhtä paljon». Mitään ei arvioida.'
  }
};

const LOCALES = Object.keys(E);
let touched = 0;
for (const loc of LOCALES) {
  const p = path.join(ROOT, 'frontend', 'messages', 'tool-content', `${loc}.json`);
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  const out = {};
  for (const k of Object.keys(j)) {
    if (k === 'labels') out[KEY] = E[loc];
    if (k !== KEY) out[k] = j[k];
  }
  if (!out[KEY]) out[KEY] = E[loc];
  fs.writeFileSync(p, JSON.stringify(out, null, 2) + '\n', 'utf8');
  touched++;
}
console.log(`tool-content: ${touched}/11 written`);

const mp = path.join(ROOT, 'frontend', 'lib', 'manipulatives.ts');
let m = fs.readFileSync(mp, 'utf8');
if (m.includes(`id: "${KEY}"`)) console.log('manipulatives: already present');
else {
  const field = (name, pick) => `    ${name}: {\n` +
    LOCALES.map((l) => `      ${l}: ${JSON.stringify(pick(E[l]))},`).join('\n') + '\n    },';
  const entry = ['  {', `    id: "${KEY}",`, `    mini_tool_url: "/mini-tools/${KEY}.html",`,
    field('title', (e) => e.name), field('tagline', (e) => e.tagline),
    field('description', (e) => e.about.join(' ')), '  },', '];'].join('\n');
  const at = m.lastIndexOf('\n];');
  if (at === -1) { console.error('manipulatives: terminator not found'); process.exit(1); }
  m = m.slice(0, at + 1) + entry + m.slice(at + 3);
  fs.writeFileSync(mp, m, 'utf8');
  console.log('manipulatives: entry appended');
}
