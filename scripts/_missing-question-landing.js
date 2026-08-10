/* =====================================================================
   TOOL #55 — THE MISSING QUESTION: the eleven ToolEntry landing records.
   ---------------------------------------------------------------------
   ⚠ NOT machine-translated and NOT concatenated out of the tool's UI
   strings (the #54 landing file did the latter and its howToUse rows
   read as two glued fragments in ten locales). Each locale is written
   in ITS OWN apparatus vocabulary, taken from the tool's shipped
   strings — the noun a native panel chose, never a calque of "ledge":

     en ledge / air / shutters / marks       de Geländer / Luft / Plättchen / Fensterläden
     fr rebord / l'air / ronds / volets      es repisa / aire / marcas / persianas
     pt parapeito / ar / marcas / persianas  it mensola / aria / pallini / tapparelle
     nl richel / lucht / stippen / luifels   sv avsats / luften / prickar / luckor
     da afsats / luften / prikker / gardiner no gjerdet / lufta / prikker / luker
     fi hylly / ilma / merkit / luukut

   ⚠ `name` is the tool's OWN strings.title[loc], verbatim. Ten native
   panels chose those deliberately and several are not translations of
   each other (nl "Twee luifels", da "Gemmegardinet").

   ⚠ THE PLAN NAME IS THE SHIPPED ONE PER LOCALE, never "Premium" —
   that word exists in no locale file. Teacher plan / Lehrkraft-Abo /
   abonnement Enseignant / plan Docente / plano Professor / piano
   Insegnante / Leerkracht-abonnement / Lärarplanen / Lærerabonnementet
   (da+no) / Opettajatilaus, matching each locale's own `lockedTitle`.

   ⚠ NO EFFICACY CLAIM anywhere. Every locale's third paragraph says
   "research-based, not evidence-based" in its own register and states
   plainly that no measured effect is claimed — the tool's refuse-list
   is binding on the marketing surface too.

   Slugs are native, /^[a-z0-9-]+$/, ASCII-folded (da ø→oe + å→aa,
   no ø→o + å→a, so the two Scandinavian slugs cannot collide).
   ===================================================================== */
'use strict';
module.exports = {

  "en": {
    "name": "The Missing Question",
    "slug": "missing-question-decompose-numbers-kindergarten",
    "tagline": "Something has happened, and nobody has asked you anything yet. Closing a shutter is how a question gets asked — and where you close it is which question it was.",
    "metaTitle": "The Missing Question — decomposing numbers, K and Grade 1",
    "metaDescription": "Free whiteboard tool: a ledge, the air above it, and one total. Close a shutter and the class decides what to ask. Close both and several answers still fit.",
    "about": [
      "A ledge with marks on it, the air above it with more marks in it, and a numeral saying how many there were in all. Nothing else. No sentence, no picture of what happened, and no question — because the question is the thing the class is going to make. The marks on the ledge and the marks in the air are drawn identically, so the tool never hands over the partition it is asking about.",
      "The shutter is how a question gets asked. Put it over the ledge and you have asked how many stayed; put it over the air and you have asked how many went; neither sentence is ever written down. Close both and it stops being a question with one answer: the total is all that is left, and several different pairs still fit it. That is decomposing a number in more than one way, on screen rather than described.",
      "The list of pairs enumerates; it never compares. It shows what is still consistent with what can be seen. It never checks a child's answer against anything, never counts how many pairs have been found, and never ranks one question above another. Nothing is scored and nothing is timed. This routine is research-based, not evidence-based: problem posing is widely described in the research literature, and we claim no measured effect for it.",
      "Everything here is free — every new frame, both shutters, and the list of what still fits. The Teacher plan adds the printable sheet: the ledge and the marks exactly as the class just saw them, with ruled lines for the questions they asked and the number sentences that go with them."
    ],
    "howToUse": [
      "Deal a frame and say nothing at all. The first job is looking, and nobody has been asked anything yet.",
      "Take the questions before you close anything. \"What could we ask here?\" — every question the class produces counts, and none of them is marked.",
      "Close one shutter over whichever part the class chose to wonder about. Now there is a single number to work out, and the total plus what stays visible is the whole of the evidence.",
      "Close both shutters and ask the same question again. This time more than one pair fits, and the list will show them all once the class has finished arguing."
    ],
    "classroomIdeas": [
      "A two-minute routine: one frame, three questions taken from the class, and the shutter closed over whichever one they most want settled.",
      "With both shutters closed, take one pair from the class and ask whether any other pair would also have worked. Open the list only after somebody has found a second one.",
      "Deal the same total twice with the marks split differently. The numeral does not change and everything else does — which is the whole of why the total alone cannot tell you what happened."
    ]
  },

  "de": {
    "name": "Was ist hier passiert?",
    "slug": "zahlen-zerlegen-und-fragen-finden-klasse-1",
    "tagline": "Hier ist etwas passiert, und gefragt hat noch niemand etwas. Der Fensterladen ist die Frage — und wo er zugeht, ist, was gefragt wird.",
    "metaTitle": "Zahlen zerlegen und eigene Fragen finden — Klasse 1",
    "metaDescription": "Kostenloses Tafelwerkzeug: ein Geländer, die Luft darüber und eine Zahl. Schließt einen Fensterladen — und die Klasse entscheidet selbst, was hier gefragt wird.",
    "about": [
      "Ein Geländer mit Plättchen darauf, darüber die Luft mit weiteren Plättchen, und eine Zahl, die sagt, wie viele es zusammen waren. Mehr nicht. Kein Satz, kein Bild von dem, was passiert ist, und keine Frage — denn die Frage soll die Klasse selbst finden. Die Plättchen auf dem Geländer und die in der Luft sehen genau gleich aus; das Werkzeug verrät die Aufteilung also nicht, nach der es fragt.",
      "Der Fensterladen ist die Frage. Über dem Geländer gefragt heißt: Wie viele sind geblieben? Über der Luft: Wie viele sind weg? Ausgeschrieben wird keiner der beiden Sätze. Schließt beide, und aus der Frage mit einer Antwort wird etwas anderes: Übrig bleibt nur die Zahl im Ganzen, und dazu passen mehrere verschiedene Paare. Das ist das Zerlegen einer Zahl auf mehr als eine Weise — sichtbar statt erklärt.",
      "Die Liste zählt nur auf; sie vergleicht nie. Sie zeigt, was zu dem passt, was noch zu sehen ist. Sie prüft keine Antwort eines Kindes, zählt nicht mit, wie viele Paare schon gefunden wurden, und bewertet keine Frage als die bessere. Nichts wird bepunktet, nichts läuft gegen die Uhr. Diese Routine ist forschungsgestützt, nicht evidenzbasiert: Das Finden eigener Fragen ist in der Forschungsliteratur breit beschrieben — eine Wirkungsaussage machen wir nicht.",
      "Alles hier ist kostenlos: jede neue Situation, beide Fensterläden und die Liste der Möglichkeiten. Das Lehrkraft-Abo bringt zusätzlich das Blatt zum Ausdrucken — mit dem Geländer und den Plättchen, wie die Klasse sie gerade gesehen hat, und mit Linien für die Fragen und die passenden Rechnungen."
    ],
    "howToUse": [
      "Eine Situation austeilen und erst einmal nichts sagen. Zuerst wird nur geschaut — gefragt hat noch niemand etwas.",
      "Die Fragen der Klasse einsammeln, bevor irgendetwas geschlossen wird: „Was könnte man hier fragen?“ Jede Frage zählt, keine wird bewertet.",
      "Einen Fensterladen über den Teil schließen, über den die Klasse nachdenken will. Jetzt gibt es eine Zahl herauszufinden — die Gesamtzahl und das Sichtbare sind alles, was man hat.",
      "Beide Fensterläden schließen und dieselbe Frage noch einmal stellen. Nun passt mehr als ein Paar, und die Liste zeigt am Ende alle."
    ],
    "classroomIdeas": [
      "Zwei Minuten als feste Routine: eine Situation, drei Fragen aus der Klasse, und dann der Fensterladen über der Frage, die alle am meisten klären wollen.",
      "Beide Fensterläden schließen, ein Paar aus der Klasse annehmen und fragen, ob auch ein anderes Paar gepasst hätte. Die Liste erst öffnen, wenn jemand ein zweites gefunden hat.",
      "Dieselbe Gesamtzahl zweimal austeilen, mit unterschiedlich vielen Plättchen auf dem Geländer. Die Zahl bleibt gleich, alles andere ändert sich — genau deshalb sagt die Zahl allein nicht, was passiert ist."
    ]
  },

  "fr": {
    "name": "Que peut-on demander ?",
    "slug": "decomposer-les-nombres-et-poser-la-question-cp",
    "tagline": "Il s’est passé quelque chose, et personne n’a encore rien demandé. Le volet, c’est la question — et l’endroit où on le ferme, c’est laquelle.",
    "metaTitle": "Décomposer les nombres et poser la question — CP-CE1",
    "metaDescription": "Outil de tableau gratuit : un rebord, l’air au-dessus et un total. Fermez un volet, la classe choisit la question ; fermez les deux, plusieurs réponses tiennent.",
    "about": [
      "Un rebord avec des ronds posés dessus, l’air au-dessus avec d’autres ronds, et un nombre qui dit combien il y en avait en tout. Rien d’autre. Aucune phrase, aucune image de ce qui s’est passé, aucune question — parce que la question, c’est la classe qui va la fabriquer. Les ronds du rebord et ceux de l’air sont dessinés exactement pareil : l’outil ne donne donc jamais le partage sur lequel il interroge.",
      "Le volet, c’est la question. Posé sur le rebord, il demande combien sont restés ; posé sur l’air, combien sont partis ; ni l’une ni l’autre de ces phrases n’est jamais écrite. Fermez les deux et ce n’est plus une question à une seule réponse : il ne reste que le total, et plusieurs couples différents lui vont encore. C’est décomposer un nombre de plusieurs façons, montré plutôt que raconté.",
      "La liste énumère, elle ne compare jamais. Elle montre ce qui reste compatible avec ce que l’on voit encore. Elle ne vérifie la réponse d’aucun enfant, ne compte pas combien de couples ont déjà été trouvés et ne classe aucune question comme meilleure. Rien n’est noté, rien n’est chronométré. Cette routine est fondée sur la recherche, mais pas sur des preuves d’efficacité : formuler ses propres questions est largement décrit dans la littérature, et nous n’avançons aucun effet mesuré.",
      "Tout est gratuit ici : chaque nouvelle situation, les deux volets et la liste des possibles. L’abonnement Enseignant ajoute la fiche à imprimer — le rebord et les ronds tels que la classe vient de les voir, avec des lignes réglées pour écrire les questions posées et les calculs qui vont avec."
    ],
    "howToUse": [
      "Distribuez une situation et ne dites rien. On regarde d’abord : personne n’a encore rien demandé.",
      "Recueillez les questions avant de fermer quoi que ce soit : « Qu’est-ce qu’on pourrait demander ici ? » Toutes les questions comptent, aucune n’est corrigée.",
      "Fermez un volet sur la partie que la classe veut chercher. Il y a maintenant un nombre à trouver, et le total avec ce qui reste visible sont toute la preuve disponible.",
      "Fermez les deux volets et reposez la même question. Cette fois plusieurs couples conviennent, et la liste les montrera tous quand la discussion sera finie."
    ],
    "classroomIdeas": [
      "Deux minutes en rituel : une situation, trois questions prises dans la classe, et le volet fermé sur celle qu’ils veulent le plus trancher.",
      "Les deux volets fermés, prenez un couple proposé par la classe et demandez si un autre couple aurait aussi convenu. N’ouvrez la liste qu’une fois qu’un deuxième a été trouvé.",
      "Distribuez deux fois le même total avec les ronds répartis autrement. Le nombre ne change pas, tout le reste change — voilà pourquoi le total seul ne dit pas ce qui s’est passé."
    ]
  },

  "es": {
    "name": "Falta la pregunta",
    "slug": "descomponer-numeros-y-formular-preguntas-primaria",
    "tagline": "Ha pasado algo y todavía nadie ha preguntado nada. La persiana es la pregunta, y el sitio donde se baja es cuál.",
    "metaTitle": "Descomponer números y formular la pregunta — Primaria",
    "metaDescription": "Herramienta gratuita para la pizarra: una repisa, el aire y un total. Bajen una persiana y la clase decide qué preguntar; bajen las dos y caben varias respuestas.",
    "about": [
      "Una repisa con marcas encima, el aire por encima con más marcas, y un número que dice cuántas había en total. Nada más. Ni una frase, ni un dibujo de lo que pasó, ni una pregunta: la pregunta la va a fabricar la clase. Las marcas de la repisa y las del aire están dibujadas exactamente igual, así que la herramienta nunca regala el reparto por el que pregunta.",
      "La persiana es la pregunta. Bajada sobre la repisa, pregunta cuántas se quedaron; bajada sobre el aire, cuántas se fueron; ninguna de las dos frases se escribe nunca. Bajen las dos y deja de ser una pregunta con una sola respuesta: solo queda el total, y le siguen encajando varias parejas distintas. Eso es descomponer un número de más de una manera, visto en lugar de contado.",
      "La lista enumera; nunca compara. Muestra lo que todavía encaja con lo que se ve. No corrige la respuesta de ningún niño, no lleva la cuenta de cuántas parejas se han encontrado y no califica ninguna pregunta como la mejor. No hay puntos ni reloj. Esta rutina está basada en la investigación, no en la evidencia: formular preguntas propias está ampliamente descrito en la literatura, y no afirmamos ningún efecto medido.",
      "Aquí todo es gratis: cada escena nueva, las dos persianas y la lista de posibilidades. El plan Docente añade la hoja para imprimir — la repisa y las marcas tal como acaba de verlas la clase, con renglones para las preguntas y las operaciones que les corresponden."
    ],
    "howToUse": [
      "Repartan una escena y no digan nada. Primero se mira: todavía nadie ha preguntado nada.",
      "Recojan las preguntas antes de bajar nada: «¿Qué se podría preguntar aquí?». Todas valen y ninguna se corrige.",
      "Bajen una persiana sobre la parte que la clase quiere averiguar. Ahora hay un número que encontrar, y el total y lo visible son toda la información.",
      "Bajen las dos persianas y vuelvan a hacer la misma pregunta. Ahora encaja más de una pareja, y la lista las mostrará todas cuando termine la discusión."
    ],
    "classroomIdeas": [
      "Dos minutos de rutina: una escena, tres preguntas de la clase y la persiana bajada sobre la que más quieran resolver.",
      "Con las dos persianas bajadas, acepten una pareja de la clase y pregunten si habría servido otra. Abran la lista solo cuando alguien haya encontrado la segunda.",
      "Repartan dos veces el mismo total con distinto reparto en la repisa. El número no cambia y todo lo demás sí: por eso el total por sí solo no dice qué pasó."
    ]
  },

  "pt": {
    "name": "A pergunta que ninguém fez",
    "slug": "decompor-numeros-e-formular-perguntas-anos-iniciais",
    "tagline": "Aconteceu alguma coisa e ninguém perguntou nada ainda. A persiana é a pergunta — e o lugar onde ela fecha diz qual é.",
    "metaTitle": "Decompor números e formular a pergunta — anos iniciais",
    "metaDescription": "Ferramenta gratuita de lousa: um parapeito, o ar acima e um total. Feche uma persiana e a turma decide o que perguntar; feche as duas e várias respostas cabem.",
    "about": [
      "Um parapeito com marcas em cima, o ar acima dele com mais marcas, e um número dizendo quantas havia ao todo. Nada além disso. Nenhuma frase, nenhum desenho do que aconteceu e nenhuma pergunta — porque a pergunta é o que a turma vai construir. As marcas do parapeito e as do ar são desenhadas exatamente iguais, então a ferramenta nunca entrega a separação sobre a qual ela pergunta.",
      "A persiana é a pergunta. Fechada sobre o parapeito, ela pergunta quantas ficaram; fechada sobre o ar, quantas foram embora; nenhuma dessas frases aparece escrita. Feche as duas e deixa de ser uma pergunta com uma resposta só: sobra o total, e vários pares diferentes ainda cabem nele. Isso é decompor um número de mais de um jeito, mostrado em vez de explicado.",
      "A lista enumera; ela nunca compara. Mostra o que ainda combina com o que dá para ver. Não corrige a resposta de nenhuma criança, não conta quantos pares já foram achados e não classifica nenhuma pergunta como a melhor. Não há pontuação nem cronômetro. Esta rotina é baseada em pesquisa, não em evidências de eficácia: formular as próprias perguntas é amplamente descrito na literatura, e não afirmamos nenhum efeito medido.",
      "Aqui tudo é gratuito: cada situação nova, as duas persianas e a lista de possibilidades. O plano Professor acrescenta a folha para imprimir — o parapeito e as marcas do jeito que a turma acabou de ver, com linhas para as perguntas e as sentenças matemáticas correspondentes."
    ],
    "howToUse": [
      "Dê uma situação e não diga nada. Primeiro se olha: ninguém perguntou nada ainda.",
      "Recolha as perguntas antes de fechar qualquer coisa: “O que dá para perguntar aqui?”. Toda pergunta vale e nenhuma é corrigida.",
      "Feche uma persiana sobre a parte que a turma quer descobrir. Agora há um número a achar, e o total mais o que está à vista são tudo o que se tem.",
      "Feche as duas persianas e faça a mesma pergunta de novo. Agora mais de um par serve, e a lista mostra todos quando a conversa terminar."
    ],
    "classroomIdeas": [
      "Dois minutos de rotina: uma situação, três perguntas da turma e a persiana fechada sobre a que eles mais querem resolver.",
      "Com as duas persianas fechadas, aceite um par da turma e pergunte se outro par também serviria. Só abra a lista depois que alguém achar o segundo.",
      "Dê duas vezes o mesmo total com repartições diferentes no parapeito. O número não muda e todo o resto muda — é por isso que o total sozinho não diz o que aconteceu."
    ]
  },

  "it": {
    "name": "La domanda che manca",
    "slug": "scomporre-i-numeri-e-inventare-la-domanda-primaria",
    "tagline": "È successo qualcosa e nessuno ha ancora chiesto niente. La tapparella è la domanda, e il punto in cui la abbassate dice quale.",
    "metaTitle": "Scomporre i numeri e inventare la domanda — primaria",
    "metaDescription": "Strumento gratuito per la LIM: una mensola, l’aria sopra e un totale. La domanda la sceglie la classe, e con due tapparelle abbassate restano più risposte possibili.",
    "about": [
      "Una mensola con dei pallini sopra, l’aria sopra la mensola con altri pallini, e un numero che dice quanti erano in tutto. Nient’altro. Nessuna frase, nessun disegno di quello che è successo e nessuna domanda — perché la domanda la costruisce la classe. I pallini sulla mensola e quelli in aria sono disegnati esattamente uguali, così lo strumento non regala mai la divisione su cui sta interrogando.",
      "La tapparella è la domanda. Abbassata sulla mensola chiede quanti sono rimasti; abbassata in aria, quanti se ne sono andati; nessuna delle due frasi viene mai scritta. Abbassatele tutte e due e non è più una domanda con una sola risposta: resta solo il totale, e più coppie diverse continuano ad andargli bene. Questo è scomporre un numero in più modi, visto invece che raccontato.",
      "L’elenco enumera; non confronta mai. Mostra quello che è ancora compatibile con ciò che si vede. Non controlla la risposta di nessun bambino, non tiene il conto di quante coppie sono state trovate e non giudica una domanda migliore di un’altra. Niente punteggi, niente tempo. Questa routine è basata sulla ricerca, non su prove di efficacia: inventare domande proprie è ampiamente descritto in letteratura, e non dichiariamo alcun effetto misurato.",
      "Qui è tutto gratuito: ogni nuova situazione, tutte e due le tapparelle e l’elenco delle coppie. Il piano Insegnante aggiunge la scheda da stampare — la mensola e i pallini come la classe li ha appena visti, con le righe per scrivere le domande e le operazioni corrispondenti."
    ],
    "howToUse": [
      "Fate comparire una situazione e non dite niente. Prima si guarda: nessuno ha ancora chiesto nulla.",
      "Raccogliete le domande prima di abbassare qualsiasi cosa: «Che cosa si potrebbe chiedere qui?». Ogni domanda vale e nessuna viene corretta.",
      "Abbassate una tapparella sulla parte su cui la classe vuole ragionare. Adesso c’è un numero da trovare, e il totale con quello che resta in vista sono tutti gli indizi.",
      "Abbassate tutte e due le tapparelle e rifate la stessa domanda. Ora va bene più di una coppia, e l’elenco le mostrerà tutte alla fine della discussione."
    ],
    "classroomIdeas": [
      "Due minuti di rito: una situazione, tre domande prese dalla classe e la tapparella abbassata su quella che vogliono chiarire di più.",
      "Con tutte e due le tapparelle abbassate, accettate una coppia proposta dalla classe e chiedete se ne sarebbe andata bene un’altra. Aprite l’elenco solo dopo che qualcuno ha trovato la seconda.",
      "Proponete due volte lo stesso totale con i pallini divisi in modo diverso. Il numero non cambia e tutto il resto sì: ecco perché il totale da solo non dice che cosa è successo."
    ]
  },

  "nl": {
    "name": "Twee luifels",
    "slug": "getallen-splitsen-en-zelf-vragen-bedenken-groep-3",
    "tagline": "Er is iets gebeurd en niemand heeft nog iets gevraagd. De luifel is de vraag — en waar je hem dichtschuift, is welke.",
    "metaTitle": "Getallen splitsen en zelf vragen bedenken — groep 3 en 4",
    "metaDescription": "Gratis digibordtool: een richel, de lucht erboven en één totaal. Schuif één luifel dicht en de klas kiest de vraag; schuif ze allebei dicht en meerdere paren passen.",
    "about": [
      "Een richel met stippen erop, de lucht erboven met nog meer stippen, en een getal dat zegt hoeveel het er bij elkaar waren. Meer niet. Geen zin, geen plaatje van wat er gebeurd is en geen vraag — want de vraag maakt de klas zelf. De stippen op de richel en die in de lucht zijn precies hetzelfde getekend, dus de tool geeft de verdeling waar het om draait nooit weg.",
      "De luifel is de vraag. Over de richel vraagt hij hoeveel er bleven; over de lucht hoeveel er weg zijn; geen van beide zinnen komt ooit in beeld. Schuif ze allebei dicht en het is geen vraag met één antwoord meer: alleen het totaal blijft over, en daar passen verschillende paren bij. Dat is een getal op meer dan één manier splitsen, te zien in plaats van uitgelegd.",
      "De lijst somt op; hij vergelijkt nooit. Hij laat zien wat nog past bij wat je ziet. Hij controleert geen antwoord van een kind, houdt niet bij hoeveel paren er al gevonden zijn en noemt geen vraag beter dan een andere. Er zijn geen punten en geen klok. Deze routine is gebaseerd op onderzoek, niet op bewijs van effect: zelf vragen bedenken is uitgebreid beschreven in de literatuur, en wij claimen geen enkel gemeten resultaat.",
      "Alles hier is gratis: elke nieuwe situatie, beide luifels en de lijst met mogelijkheden. Het Leerkracht-abonnement voegt het werkblad toe om af te drukken — de richel en de stippen zoals de klas ze net zag, met lijnen voor hun vragen en de sommen die erbij horen."
    ],
    "howToUse": [
      "Laat een situatie verschijnen en zeg niets. Eerst kijken: er is nog niets gevraagd.",
      "Verzamel de vragen voordat je iets dichtschuift: „Wat zou je hier kunnen vragen?” Elke vraag telt en geen enkele wordt nagekeken.",
      "Schuif één luifel over het deel waar de klas iets over wil weten. Nu is er één getal te vinden, en het totaal plus wat zichtbaar blijft is alles wat je hebt.",
      "Schuif ze allebei dicht en stel dezelfde vraag opnieuw. Nu passen er meerdere paren, en de lijst laat ze allemaal zien als de klas uitgepraat is."
    ],
    "classroomIdeas": [
      "Twee minuten als vast ritueel: één situatie, drie vragen uit de klas, en de luifel dicht over de vraag die ze het liefst willen oplossen.",
      "Schuif beide luifels dicht, neem één paar van de klas aan en vraag of een ander paar ook gepast had. Open de lijst pas als iemand een tweede gevonden heeft.",
      "Geef twee keer hetzelfde totaal met de stippen anders verdeeld. Het getal blijft gelijk en al het andere verandert — daarom zegt het totaal alleen niet wat er gebeurd is."
    ]
  },

  "sv": {
    "name": "Vad kan vi fråga?",
    "slug": "dela-upp-tal-och-hitta-fragan-lagstadiet",
    "tagline": "Något har hänt, och ingen har frågat något än. Luckan är frågan — och var ni stänger den är vilken.",
    "metaTitle": "Dela upp tal och hitta frågan — lågstadiet",
    "metaDescription": "Gratis tavelverktyg: en avsats, luften ovanför och ett antal. Stäng en lucka så väljer klassen frågan; stäng båda och flera svar är fortfarande möjliga.",
    "about": [
      "En avsats med prickar på, luften ovanför med fler prickar, och ett tal som säger hur många det var sammanlagt. Inget mer. Ingen mening, ingen bild av vad som hände och ingen fråga — för frågan är det klassen ska göra själv. Prickarna på avsatsen och prickarna i luften är ritade exakt likadant, så verktyget avslöjar aldrig den uppdelning det frågar om.",
      "Luckan är frågan. Stängd över avsatsen frågar den hur många som blev kvar, stängd över luften hur många som försvann — och ingen av meningarna skrivs någonsin ut. Stäng båda, och det är inte längre en fråga med ett enda svar: kvar finns bara antalet, och flera olika par stämmer fortfarande med det. Det är att dela upp ett tal på mer än ett sätt, sett i stället för berättat.",
      "Listan räknar upp; den jämför aldrig. Den visar det som fortfarande stämmer med det som syns. Den rättar inget barns svar, håller inte räkningen på hur många par som hittats och rangordnar ingen fråga som bättre. Inga poäng, ingen tid. Den här rutinen är forskningsbaserad, inte evidensbaserad: att formulera egna frågor är väl beskrivet i forskningslitteraturen, och vi påstår ingenting om någon uppmätt effekt.",
      "Allt här är gratis: varje ny situation, båda luckorna och listan med möjligheter. Lärarplanen lägger till arbetsbladet att skriva ut — avsatsen och prickarna precis som klassen nyss såg dem, med linjerade rader för frågorna och talen som hör till."
    ],
    "howToUse": [
      "Ta fram en situation och säg ingenting. Först tittar man: ingen har frågat något än.",
      "Samla in klassens frågor innan något stängs: ”Vad skulle man kunna fråga här?” Alla frågor duger och ingen rättas.",
      "Stäng en lucka över den del klassen vill fundera på. Nu finns ett tal att komma fram till, och antalet plus det som syns är allt man har.",
      "Stäng båda luckorna och ställ samma fråga igen. Nu passar mer än ett par, och listan visar alla när klassen har pratat färdigt."
    ],
    "classroomIdeas": [
      "Två minuter som rutin: en situation, tre frågor från klassen och luckan stängd över den de helst vill reda ut.",
      "Stäng båda luckorna, ta emot ett par från klassen och fråga om något annat par också hade fungerat. Öppna listan först när någon hittat ett andra.",
      "Ta samma antal två gånger med prickarna fördelade olika. Talet är detsamma och allt annat är nytt — därför kan antalet ensamt inte berätta vad som hände."
    ]
  },

  "da": {
    "name": "Gemmegardinet",
    "slug": "dele-tal-op-og-finde-spoergsmaalet-indskoling",
    "tagline": "Der er sket noget, og ingen har spurgt om noget endnu. Gardinet er spørgsmålet — og der, hvor I lukker det, er hvilket.",
    "metaTitle": "Dele tal op og finde spørgsmålet — indskolingen",
    "metaDescription": "Gratis tavleværktøj: en afsats, luften ovenover og et antal. Luk ét gardin, så vælger klassen spørgsmålet; luk begge, og flere svar kan stadig passe.",
    "about": [
      "En afsats med prikker på, luften ovenover med flere prikker, og et tal, der siger, hvor mange der var i alt. Ikke andet. Ingen sætning, intet billede af det, der skete, og intet spørgsmål — for spørgsmålet er det, klassen selv skal lave. Prikkerne på afsatsen og prikkerne i luften er tegnet præcis ens, så værktøjet røber aldrig den opdeling, det spørger om.",
      "Gardinet er spørgsmålet. Lukket for afsatsen spørger det, hvor mange der blev, lukket for luften, hvor mange der forsvandt — og ingen af sætningerne bliver nogensinde skrevet. Luk begge, og det er ikke længere et spørgsmål med ét svar: tilbage er kun antallet, og flere forskellige par passer stadig til det. Det er at dele et tal op på mere end én måde, set i stedet for fortalt.",
      "Listen remser op; den sammenligner aldrig. Den viser det, der stadig passer med det, man kan se. Den retter ikke noget barns svar, tæller ikke, hvor mange par der er fundet, og kalder ikke ét spørgsmål bedre end et andet. Ingen point, intet ur. Denne rutine er forskningsbaseret, ikke evidensbaseret: at stille sine egne spørgsmål er grundigt beskrevet i litteraturen, og vi påstår ingen målt effekt.",
      "Alt her er gratis: hver ny situation, begge gardiner og listen over muligheder. Lærerabonnementet lægger arket til at printe oveni — afsatsen og prikkerne, som klassen lige har set dem, med linjer til spørgsmålene og de regnestykker, der hører til."
    ],
    "howToUse": [
      "Hent en situation frem, og sig ikke noget. Først kigger man: ingen har spurgt om noget endnu.",
      "Saml klassens spørgsmål, før der lukkes noget: „Hvad kunne man spørge om her?“ Alle spørgsmål tæller, og ingen bliver rettet.",
      "Luk ét gardin for den del, klassen vil undre sig over. Nu er der ét tal at finde, og antallet plus det, der stadig kan ses, er alt, man har.",
      "Luk begge gardiner, og stil det samme spørgsmål igen. Nu passer mere end ét par, og listen viser dem alle, når klassen er færdig med at snakke."
    ],
    "classroomIdeas": [
      "To minutter som fast rutine: én situation, tre spørgsmål fra klassen, og gardinet lukket for det, de helst vil have afklaret.",
      "Luk begge gardiner, tag imod ét par fra klassen, og spørg, om et andet par også ville have passet. Åbn først listen, når nogen har fundet det andet.",
      "Tag det samme antal to gange med prikkerne fordelt forskelligt. Tallet er det samme, og alt andet er nyt — derfor kan tallet alene ikke fortælle, hvad der skete."
    ]
  },

  "no": {
    "name": "Spørsmålet som mangler",
    "slug": "dele-opp-tall-og-finne-sporsmalet-smatrinnet",
    "tagline": "Noe har skjedd, og ingen har spurt om noe ennå. Luka er spørsmålet — og der dere lukker den, er hvilket.",
    "metaTitle": "Dele opp tall og finne spørsmålet — småtrinnet",
    "metaDescription": "Gratis tavleverktøy: et gjerde, lufta over og et antall. Lukk ei luke, så velger klassen spørsmålet; lukk begge, og flere svar kan fortsatt stemme.",
    "about": [
      "Et gjerde med prikker på, lufta over med flere prikker, og et tall som sier hvor mange det var i alt. Ikke noe mer. Ingen setning, ingen tegning av det som skjedde, og ikke noe spørsmål — for spørsmålet er det klassen skal lage selv. Prikkene på gjerdet og prikkene i lufta er tegnet helt like, så verktøyet røper aldri den fordelingen det spør om.",
      "Luka er spørsmålet. Lukket over gjerdet spør den hvor mange som ble igjen, lukket over lufta hvor mange som dro — og ingen av setningene blir noen gang skrevet. Lukk begge, og det er ikke lenger et spørsmål med ett svar: igjen står bare antallet, og flere ulike par stemmer fortsatt med det. Det er å dele opp et tall på mer enn én måte, sett i stedet for fortalt.",
      "Lista ramser opp; den sammenligner aldri. Den viser det som fortsatt stemmer med det man ser. Den retter ingen barns svar, teller ikke hvor mange par som er funnet, og rangerer ingen spørsmål som bedre. Ingen poeng, ingen tid. Denne rutinen er forskningsbasert, ikke evidensbasert: å stille egne spørsmål er godt beskrevet i litteraturen, og vi påstår ingen målt effekt.",
      "Alt her er gratis: hver ny situasjon, begge lukene og lista over muligheter. Lærerabonnementet legger til arbeidsarket til utskrift — gjerdet og prikkene slik klassen nettopp så dem, med linjer til spørsmålene og regnestykkene som hører til."
    ],
    "howToUse": [
      "Hent fram en situasjon og si ingenting. Først ser man: ingen har spurt om noe ennå.",
      "Samle inn spørsmålene før noe lukkes: «Hva kan vi spørre om her?» Alle spørsmål teller, og ingen blir rettet.",
      "Lukk ei luke over den delen klassen vil lure på. Nå er det ett tall å finne, og antallet pluss det som fortsatt synes er alt man har.",
      "Lukk begge lukene og still det samme spørsmålet igjen. Nå passer mer enn ett par, og lista viser alle når klassen er ferdig med å diskutere."
    ],
    "classroomIdeas": [
      "To minutter som fast rutine: én situasjon, tre spørsmål fra klassen, og luka lukket over det de helst vil finne ut av.",
      "Lukk begge lukene, ta imot ett par fra klassen og spør om et annet par også ville ha passet. Åpne lista først når noen har funnet det andre.",
      "Ta det samme antallet to ganger med prikkene fordelt ulikt. Tallet er det samme og alt annet er nytt — derfor kan tallet alene ikke fortelle hva som skjedde."
    ]
  },

  "fi": {
    "name": "Mitä kysyisit?",
    "slug": "lukujen-hajottaminen-ja-kysymyksen-keksiminen-alkuopetus",
    "tagline": "Jotain on tapahtunut, eikä kukaan ole vielä kysynyt mitään. Luukku on kysymys — ja se, minkä päälle sen sulkee, kertoo minkä.",
    "metaTitle": "Lukujen hajottaminen ja oman kysymyksen keksiminen",
    "metaDescription": "Maksuton taulutyökalu: hylly, sen yläpuolinen ilma ja kokonaismäärä. Sulje luukku, niin luokka valitsee kysymyksen; sulje molemmat, ja moni pari sopii yhä.",
    "about": [
      "Hylly, jolla on merkkejä, sen yläpuolella ilmaa ja siinä lisää merkkejä, ja luku, joka kertoo kuinka monta niitä oli kaikkiaan. Ei muuta. Ei lausetta, ei kuvaa tapahtuneesta eikä kysymystä — sillä kysymyksen tekee luokka itse. Hyllyn merkit ja ilmassa olevat merkit on piirretty täsmälleen samanlaisiksi, joten työkalu ei koskaan paljasta sitä jakoa, jota se kysyy.",
      "Luukku on kysymys. Hyllyn päällä se kysyy, kuinka moni jäi; ilman päällä, kuinka moni lähti — kumpaakaan lausetta ei kirjoiteta koskaan näkyviin. Sulkekaa molemmat, eikä se ole enää kysymys, jolla on yksi vastaus: jäljelle jää vain kokonaismäärä, ja siihen sopii yhä useampi eri pari. Se on luvun hajottamista useammalla kuin yhdellä tavalla — nähtynä eikä kerrottuna.",
      "Luettelo luettelee; se ei vertaa koskaan. Se näyttää sen, mikä sopii yhä siihen, mitä on näkyvissä. Se ei tarkista yhdenkään lapsen vastausta, ei laske montako paria on jo löytynyt eikä pidä mitään kysymystä parempana kuin toista. Ei pisteitä, ei kelloa. Tämä rutiini on tutkimukseen perustuva, ei näyttöön perustuva: omien kysymysten keksiminen on laajasti kuvattu tutkimuskirjallisuudessa, emmekä väitä mitään mitatusta vaikutuksesta.",
      "Täällä kaikki on maksutonta: jokainen uusi tilanne, molemmat luukut ja luettelo vaihtoehdoista. Opettajatilaus tuo lisäksi tulostettavan paperipohjan — hyllyn ja merkit juuri sellaisina kuin luokka ne näki, ja viivat kysymyksille ja niihin kuuluville laskuille."
    ],
    "howToUse": [
      "Ottakaa tilanne esiin älkääkä sanoko mitään. Ensin katsotaan: kukaan ei ole vielä kysynyt mitään.",
      "Kerätkää luokan kysymykset ennen kuin mitään suljetaan: ”Mitä tästä voisi kysyä?” Jokainen kysymys kelpaa eikä yhtäkään korjata.",
      "Sulkekaa luukku sen osan päälle, jota luokka haluaa pohtia. Nyt on yksi luku selvitettävänä, ja kokonaismäärä sekä näkyvissä oleva osa ovat kaikki, mitä on.",
      "Sulkekaa molemmat luukut ja esittäkää sama kysymys uudelleen. Nyt sopivia pareja on useampi, ja luettelo näyttää ne kaikki, kun keskustelu on käyty."
    ],
    "classroomIdeas": [
      "Kahden minuutin rutiini: yksi tilanne, kolme luokan kysymystä ja luukku sen päälle, jonka he haluavat eniten ratkaista.",
      "Sulkekaa molemmat luukut, ottakaa vastaan yksi luokan ehdottama pari ja kysykää, olisiko jokin toinen pari myös sopinut. Avatkaa luettelo vasta, kun joku on löytänyt toisen.",
      "Antakaa sama kokonaismäärä kahdesti niin, että merkit jakautuvat eri tavalla. Luku pysyy samana ja kaikki muu muuttuu — juuri siksi luku yksin ei kerro, mitä tapahtui."
    ]
  }
};
