/* =====================================================================
   _missing-question-strings.js — TOOL #55, the ten native panels
   ---------------------------------------------------------------------
   ⚠ CONSOLIDATED VERBATIM from the ten panel files: nothing here has
   been translated, reworded, or reordered inside a locale.
   `scripts/apply-missing-question-locales.js` reads it, writes the values
   into `mini tools/missing-question.js`, then re-requires the tool from
   DISK and compares every value back — against this file AND, while they
   are still present, against the raw panel files themselves.

   ⚠⚠ `tallyNone` IS DELIBERATELY ABSENT. All ten panels authored one.
   The tool does not declare it: `showTally()` refuses to open over
   nothing and `shut()` puts the tally away with the last shutter, so the
   state is unreachable — proven over all 714 button-reachable states and
   measured never-asked across 22 driven runs. It is DROPPED rather than
   recorded, so nothing downstream can revive a string with no state
   behind it (#39 `hintMark`). The refusal it was written for already
   speaks through `saidNoTally`, on the announce channel where a refusal
   belongs. The applier treats ANY undeclared key as FATAL.

   ⚠⚠ POSITIONAL WORDING IS FORBIDDEN in `tallyOne` / `tallyMany`. The
   row renders `r.b · r.c` in fixed slots, but the HIDDEN number sits in
   slot 1 when the LEDGE is shut and slot 2 when the AIR is shut — one
   button press apart, both rendering `tallyOne`. Measured: 102 states
   each way, and `legal()` forbids b === c so the flip is never masked.
   "the first one" / "on the left" would therefore be false in exactly
   half the states that show the string. What survives everywhere is
   "one is hidden, the OTHER is the one you can already see", or plain
   ADJACENCY (beside · à côté · accanto · bredvid · sammen med · erbij),
   which is true whichever slot the hidden number lands in.
   ⚠ Do NOT regex-hunt this in the Nordic and Finnish copy: `toinen`,
   `andre`, `andet` and `andra` mean BOTH "second" and "other", and the
   "other" reading is precisely the shape we want. Read the sentence.
   ===================================================================== */
'use strict';

module.exports = {
  /* German */
  de: {
    title: 'Was ist hier passiert?',
    instruction: 'Hier ist etwas passiert. Niemand hat euch etwas gefragt — überlegt gemeinsam, was man hier fragen könnte. Schließt dann einen Fensterladen über dem, worüber ihr nachdenken wollt. Und wenn ihr beide schließt, seht ihr, welche Paare dann überhaupt noch möglich sind.',
    deal: 'Es passiert etwas anderes',
    shutLedge: 'Fensterladen über dem Geländer',
    shutAir: 'Fensterladen über der Luft',
    tally: 'Was kann darunter sein?',
    hideTally: 'Möglichkeiten ausblenden',
    print: 'Blatt drucken',
    ariaFrame: 'Auf dem Geländer: {b} Plättchen. In der Luft darüber: {c} Plättchen. Zusammen sind es {a}.',
    ariaLedgeShut: 'Der Fensterladen über dem Geländer ist geschlossen. In der Luft: noch {c} Plättchen. Zusammen waren es {a}.',
    ariaAirShut: 'Der Fensterladen über der Luft ist geschlossen. Auf dem Geländer: noch {b} Plättchen. Zusammen waren es {a}.',
    ariaBothShut: 'Beide Fensterläden sind geschlossen. Zu sehen ist nur noch, dass es zusammen {a} Plättchen waren.',
    ariaTally: 'Alle Paare, die zusammen {a} Plättchen ergeben und zu dem passen, was noch zu sehen ist.',
    tallyOne: 'Nur ein Paar passt zu dem, was noch zu sehen ist.',
    tallyMany: 'Diese Paare passen alle zu dem, was noch zu sehen ist.',
    saidNoTally: 'Es ist nichts verdeckt, also gibt es auch nichts herauszufinden.',
    saidDealt: 'Etwas anderes ist passiert. Schaut erst hin, bevor ihr etwas schließt.',
    rangeLabel: 'Anzahl der Plättchen',
    rangeTen: 'bis zehn',
    rangeSixteen: 'bis sechzehn',
    sheetTitle: 'Was hier passiert ist — und Platz für eure Fragen',
    sheetHint: 'Für jede Frage aus der Klasse eine Zeile — und daneben die passende Rechnung.',
    lockedTitle: 'Das Blatt gehört zum Lehrkraft-Abo',
    lockedBody: 'Alles hier ist kostenlos — die Plättchen, beide Fensterläden und die Möglichkeiten. Das Lehrkraft-Abo bringt zusätzlich das Blatt zum Ausdrucken, mit dem Geländer und den Plättchen, wie sie gerade liegen, und mit Linien zum Schreiben.'
  },

  /* French */
  fr: {
    title: 'Que peut-on demander ?',
    instruction: 'Regardez le rebord, et ce qui est en l’air au-dessus. Personne ne vous a rien demandé : décidez ensemble ce qu’on pourrait demander. Fermez ensuite un volet sur ce que vous voulez chercher, puis les deux volets pour voir combien de réponses restent possibles.',
    deal: 'Une autre situation',
    shutLedge: 'Le volet sur le rebord',
    shutAir: 'Le volet au-dessus',
    tally: 'Qu’est-ce qui peut être dessous ?',
    hideTally: 'Retirer les cas',
    print: 'Imprimer la fiche',
    ariaFrame: 'Un rebord avec {b} ronds posés dessus, et {c} ronds en l’air au-dessus. {a} ronds en tout.',
    ariaLedgeShut: 'Le volet est fermé sur le rebord. Il reste {c} ronds en l’air, et il y en avait {a} en tout.',
    ariaAirShut: 'Le volet du dessus est fermé. Il reste {b} ronds sur le rebord, et il y en avait {a} en tout.',
    ariaBothShut: 'Les deux volets sont fermés. Tout ce qu’on voit encore, c’est qu’il y avait {a} ronds en tout.',
    ariaTally: 'Tous les cas encore possibles sous les volets, sachant qu’il y avait {a} ronds en tout.',
    tallyOne: 'Un seul nombre peut se cacher sous le volet. Le voici, à côté de celui qu’on voit déjà.',
    tallyMany: 'Voici les cas qui peuvent se trouver sous les deux volets.',
    saidNoTally: 'Rien n’est caché, il n’y a donc rien à chercher.',
    saidDealt: 'Tout a changé. Regardez bien avant de fermer quoi que ce soit.',
    rangeLabel: 'Combien de ronds',
    rangeTen: 'jusqu’à dix',
    rangeSixteen: 'jusqu’à seize',
    sheetTitle: 'Ce qu’on a vu, et de la place pour écrire ce qu’on a demandé',
    sheetHint: 'Une ligne pour chaque question posée par la classe, et le calcul qui va avec.',
    lockedTitle: 'La fiche fait partie de l’abonnement Enseignant',
    lockedBody: 'Tout est gratuit ici — chaque situation, les deux volets et tous les cas. L’abonnement Enseignant ajoute la fiche imprimée : elle reprend ce que la classe vient de regarder, avec des lignes réglées pour écrire ce qu’elle a demandé.'
  },

  /* Spanish */
  es: {
    title: 'Falta la pregunta',
    instruction: 'Algo ha pasado: unas marcas siguen en la repisa y otras están en el aire. Nadie ha preguntado nada todavía, así que decidan entre todos qué se podría preguntar. Luego bajen una persiana sobre aquello que quieran averiguar, y bajen las dos para ver todas las parejas que aún podrían estar debajo.',
    deal: 'Otra escena',
    shutLedge: 'La persiana de la repisa',
    shutAir: 'La persiana del aire',
    tally: '¿Qué podría haber debajo?',
    hideTally: 'Guardar las posibilidades',
    print: 'Imprimir la hoja',
    ariaFrame: 'Una repisa, y aire por encima. En la repisa: {b}. En el aire: {c}. En total, {a} marcas.',
    ariaLedgeShut: 'La persiana está bajada sobre la repisa. En el aire siguen a la vista: {c}. En total había {a} marcas.',
    ariaAirShut: 'La persiana está bajada sobre el aire. En la repisa siguen a la vista: {b}. En total había {a} marcas.',
    ariaBothShut: 'Las dos persianas están bajadas. Lo único que se sigue viendo es que en total había {a} marcas.',
    ariaTally: 'Las posibilidades que encajan con lo que todavía se ve, sabiendo que en total había {a} marcas.',
    tallyOne: 'Solo cabe una pareja: con una persiana bajada, el número escondido ya está decidido.',
    tallyMany: 'Estas son todas las parejas que encajan con lo que todavía se ve.',
    saidNoTally: 'No hay nada escondido, así que no hay nada que averiguar.',
    saidDealt: 'Una escena nueva. Mírenla bien antes de bajar nada.',
    rangeLabel: 'Cuántas marcas',
    rangeTen: 'hasta diez',
    rangeSixteen: 'hasta dieciséis',
    sheetTitle: 'La escena, y espacio para escribir lo que preguntaron',
    sheetHint: 'Una línea para cada pregunta que hizo la clase, con la operación que le corresponde.',
    lockedTitle: 'La hoja forma parte del plan Docente',
    lockedBody: 'Aquí todo es gratis: cada escena, las dos persianas y todas las posibilidades. El plan Docente añade la hoja impresa, que lleva la escena que la clase acaba de mirar y renglones para las frases que escribieron.'
  },

  /* Portuguese (BR) */
  pt: {
    title: 'A pergunta que ninguém fez',
    instruction: 'Alguma coisa aconteceu no parapeito. Ninguém fez nenhuma pergunta a vocês — decidam juntos o que daria para perguntar. Depois fechem uma persiana sobre o que vocês querem descobrir, e fechem as duas para ver quantas respostas ainda são possíveis.',
    deal: 'Acontece de novo',
    shutLedge: 'Persiana sobre o parapeito',
    shutAir: 'Persiana sobre o ar',
    tally: 'O que pode estar embaixo?',
    hideTally: 'Guardar as possibilidades',
    print: 'Imprimir a folha',
    ariaFrame: 'Um parapeito com {b} marcas em cima e {c} marcas no ar acima dele. {a} marcas ao todo.',
    ariaLedgeShut: 'A persiana está fechada sobre o parapeito. Ainda há {c} marcas no ar, e havia {a} ao todo.',
    ariaAirShut: 'A persiana está fechada sobre o ar. Ainda há {b} marcas no parapeito, e havia {a} ao todo.',
    ariaBothShut: 'As duas persianas estão fechadas. Só dá para saber que havia {a} marcas ao todo.',
    ariaTally: 'Tudo o que ainda pode estar escondido, sabendo que há {a} marcas ao todo.',
    tallyOne: 'Só um número cabe embaixo da persiana — o outro está à vista.',
    tallyMany: 'Estas são as possibilidades que ainda cabem embaixo das duas persianas.',
    saidNoTally: 'Não há nada escondido, então não há nada para descobrir.',
    saidDealt: 'Uma situação nova. Nada está fechado ainda.',
    rangeLabel: 'Quantas marcas',
    rangeTen: 'até dez',
    rangeSixteen: 'até dezesseis',
    sheetTitle: 'A situação, com espaço para escrever o que vocês perguntaram',
    sheetHint: 'Em cada linha, uma pergunta da turma e a sentença matemática que corresponde a ela.',
    lockedTitle: 'A folha faz parte do plano Professor',
    lockedBody: 'Aqui tudo é grátis — todas as situações, as duas persianas e as possibilidades. O plano Professor traz ainda a folha impressa, que leva a situação que a turma acabou de ver e linhas pautadas para as sentenças que a turma escreveu.'
  },

  /* Italian */
  it: {
    title: 'La domanda che manca',
    instruction: 'Sulla mensola è successo qualcosa, e nessuno vi ha chiesto niente: decidete insieme che cosa si potrebbe chiedere. Poi abbassate una tapparella su quello che volete far indovinare. Il numero grande resta sempre lì e dice quanti pallini c’erano in tutto. Abbassate tutte e due le tapparelle e guardate quante coppie diverse restano possibili.',
    deal: 'Succede qualcos’altro',
    shutLedge: 'Tapparella sulla mensola',
    shutAir: 'Tapparella in aria',
    tally: 'Che cosa può esserci sotto?',
    hideTally: 'Metti via le possibilità',
    print: 'Stampa la scheda',
    ariaFrame: 'Sulla mensola ci sono {b} pallini e in aria, sopra la mensola, ce ne sono {c}. In tutto sono {a}.',
    ariaLedgeShut: 'La tapparella è abbassata sulla mensola. In aria si vedono ancora {c} pallini, e in tutto erano {a}.',
    ariaAirShut: 'La tapparella è abbassata in aria. Sulla mensola si vedono ancora {b} pallini, e in tutto erano {a}.',
    ariaBothShut: 'Tutte e due le tapparelle sono abbassate. Si sa soltanto che in tutto i pallini erano {a}.',
    ariaTally: 'Tutte le possibilità ancora aperte, sapendo che in tutto i pallini erano {a}.',
    tallyOne: 'Sotto la tapparella può esserci un solo numero: eccolo, accanto a quello che si vede già.',
    tallyMany: 'Queste sono le coppie che possono stare sotto le due tapparelle.',
    saidNoTally: 'Non c’è niente di nascosto, quindi non c’è niente su cui ragionare.',
    saidDealt: 'Ecco una situazione nuova. Guardatela bene prima di abbassare qualcosa.',
    rangeLabel: 'Quanti pallini',
    rangeTen: 'fino a dieci',
    rangeSixteen: 'fino a sedici',
    sheetTitle: 'Quello che è successo, e lo spazio per scrivere quello che avete chiesto',
    sheetHint: 'Una riga per ogni cosa che la classe ha chiesto, con l’operazione che le corrisponde.',
    lockedTitle: 'La scheda fa parte del piano Insegnante',
    lockedBody: 'Qui è tutto gratuito: ogni situazione, le due tapparelle e tutte le possibilità. Il piano Insegnante aggiunge la scheda da stampare, che riporta la situazione appena guardata dalla classe e le righe su cui scrivere.'
  },

  /* Dutch */
  nl: {
    title: 'Twee luifels',
    instruction: 'Er staan stippen op de richel en er hangen stippen in de lucht erboven. Niemand heeft jullie iets gevraagd — bedenk samen wat je hier zou kunnen vragen. Schuif dan een luifel over het deel waar je iets over wilt weten. Schuif ze allebei dicht, en kijk welke paren er dan nog onder kunnen zitten.',
    deal: 'Nog een situatie',
    shutLedge: 'Luifel over de richel',
    shutAir: 'Luifel over de lucht',
    tally: 'Wat kan eronder zitten?',
    hideTally: 'De mogelijkheden weg',
    print: 'Werkblad afdrukken',
    ariaFrame: 'Een richel met stippen erop en stippen in de lucht erboven. Op de richel: {b}. In de lucht: {c}. Bij elkaar: {a}.',
    ariaLedgeShut: 'De luifel over de richel is dicht. In de lucht: {c}. Bij elkaar waren het er {a}.',
    ariaAirShut: 'De luifel over de lucht is dicht. Op de richel: {b}. Bij elkaar waren het er {a}.',
    ariaBothShut: 'Beide luifels zijn dicht. Je ziet alleen nog dat het er bij elkaar {a} waren.',
    ariaTally: 'Alle paren die passen bij wat je nu nog ziet, met {a} stippen bij elkaar.',
    tallyOne: 'Er kan maar één getal onder de luifel zitten. Dit paar past erbij.',
    tallyMany: 'Dit zijn de paren die onder de twee luifels kunnen zitten.',
    saidNoTally: 'Er is nog niets verstopt, dus er valt nog niets uit te zoeken.',
    saidDealt: 'Een nieuwe situatie. Kijk er eerst samen naar voordat je iets dichtschuift.',
    rangeLabel: 'Hoeveel stippen',
    rangeTen: 'tot tien',
    rangeSixteen: 'tot zestien',
    sheetTitle: 'De situatie, en ruimte voor jullie vragen',
    sheetHint: 'Op elke regel één vraag van de klas, met de som die erbij hoort.',
    lockedTitle: 'Het werkblad hoort bij het Leerkracht-abonnement',
    lockedBody: 'Alles hier is gratis — elke situatie, beide luifels en alle mogelijkheden die erbij horen. Het Leerkracht-abonnement voegt het werkblad toe: daarop staat de situatie waar de klas net naar keek, met lijnen om hun vragen en de sommen erbij op te schrijven.'
  },

  /* Swedish */
  sv: {
    title: 'Vad kan vi fråga?',
    instruction: 'Något har hänt på avsatsen. Ingen har ställt någon fråga än — bestäm tillsammans vad man skulle kunna fråga. Stäng sedan en lucka över det ni vill fundera på, och stäng båda luckorna för att se allt som kan finnas under dem.',
    deal: 'Något händer igen',
    shutLedge: 'Lucka över avsatsen',
    shutAir: 'Lucka över luften',
    tally: 'Vad kan finnas under?',
    hideTally: 'Dölj möjligheterna',
    print: 'Skriv ut arbetsbladet',
    ariaFrame: 'En avsats med {b} prickar på och {c} prickar i luften ovanför. Sammanlagt {a} prickar.',
    ariaLedgeShut: 'Luckan är stängd över avsatsen. {c} prickar syns fortfarande i luften, och det var {a} sammanlagt.',
    ariaAirShut: 'Luckan är stängd över luften. {b} prickar syns fortfarande på avsatsen, och det var {a} sammanlagt.',
    ariaBothShut: 'Båda luckorna är stängda. Det enda som syns är att det var {a} prickar sammanlagt.',
    ariaTally: 'Allt som stämmer med det som är dolt, när det är {a} prickar sammanlagt.',
    tallyOne: 'Bara ett tal passar under luckan — det står här bredvid talet ni redan ser.',
    tallyMany: 'Så här kan det ha sett ut under de två luckorna.',
    saidNoTally: 'Inget är dolt än, så det finns inget att räkna ut.',
    saidDealt: 'Något nytt har hänt. Titta först, innan ni stänger någon lucka.',
    rangeLabel: 'Hur många prickar',
    rangeTen: 'upp till tio',
    rangeSixteen: 'upp till sexton',
    sheetTitle: 'Avsatsen och luften, med plats att skriva era frågor',
    sheetHint: 'Skriv en fråga på varje rad, och talet som hör ihop med den.',
    lockedTitle: 'Arbetsbladet ingår i Lärarplanen',
    lockedBody: 'Allt här är gratis — varje ny avsats, båda luckorna och möjligheterna. Lärarplanen lägger till arbetsbladet, som visar avsatsen och luften precis som klassen såg dem, med linjerade rader för det ni skrev.'
  },

  /* Danish */
  da: {
    title: 'Gemmegardinet',
    instruction: 'Der er sket noget på afsatsen. Ingen har stillet jer et spørgsmål — bliv enige om, hvad man kunne spørge om. Luk så et gardin for det, I vil undre jer over, og luk begge gardiner for at se, hvad der stadig kan gemme sig bag dem.',
    deal: 'Der sker noget andet',
    shutLedge: 'Gardin for afsatsen',
    shutAir: 'Gardin for luften',
    tally: 'Hvad kan der gemme sig bag?',
    hideTally: 'Skjul mulighederne',
    print: 'Print arket',
    ariaFrame: 'En afsats med {b} prikker på og {c} prikker i luften ovenover. {a} prikker i alt.',
    ariaLedgeShut: 'Gardinet for afsatsen er lukket. Der er stadig {c} prikker i luften, og der var {a} i alt.',
    ariaAirShut: 'Gardinet for luften er lukket. Der er stadig {b} prikker på afsatsen, og der var {a} i alt.',
    ariaBothShut: 'Begge gardiner er lukket. Nu kan man kun se, at der var {a} prikker i alt.',
    ariaTally: 'Alle de par, der kan gemme sig bag gardinerne, når der er {a} prikker i alt.',
    tallyOne: 'Der passer kun ét tal bag gardinet. Her er det — sammen med det tal, I selv kan tælle.',
    tallyMany: 'Her er de par, der kan gemme sig bag de to gardiner.',
    saidNoTally: 'Der er ikke noget gemt, så der er ikke noget at regne ud.',
    saidDealt: 'Nu er der sket noget nyt. Kig på det, før I lukker noget.',
    rangeLabel: 'Antal prikker',
    rangeTen: 'op til ti',
    rangeSixteen: 'op til seksten',
    sheetTitle: 'Det, der skete — og plads til at skrive, hvad I spurgte om',
    sheetHint: 'En linje til hvert spørgsmål, klassen stillede, og det regnestykke, der hører til.',
    lockedTitle: 'Arket hører til Lærerabonnementet',
    lockedBody: 'Alt her er gratis — alt det, der kan ske, begge gardiner og mulighederne. Lærerabonnementet giver desuden det printede ark, hvor det, klassen lige har set, står øverst, og hvor der er linjer til de regnestykker, klassen skrev.'
  },

  /* Norwegian (bokmål) */
  no: {
    title: 'Spørsmålet som mangler',
    instruction: 'Noe har skjedd på gjerdet og i lufta over det, og tallet viser hvor mange prikker det var i alt. Ingen har spurt dere om noe – bli enige om hva vi kan spørre om. Lukk deretter ei luke over det dere vil lure på, og lukk begge to for å se alle parene som fortsatt kan stemme.',
    deal: 'Noe annet har skjedd',
    shutLedge: 'Luke over gjerdet',
    shutAir: 'Luke over lufta',
    tally: 'Hva kan være under?',
    hideTally: 'Legg vekk mulighetene',
    print: 'Skriv ut arbeidsarket',
    ariaFrame: 'Prikker på gjerdet: {b}. Prikker i lufta over: {c}. Til sammen: {a}.',
    ariaLedgeShut: 'Luka er lukket over gjerdet. Prikker som fortsatt synes i lufta: {c}. Til sammen var det {a}.',
    ariaAirShut: 'Luka er lukket over lufta. Prikker som fortsatt synes på gjerdet: {b}. Til sammen var det {a}.',
    ariaBothShut: 'Begge lukene er lukket. Det eneste som fortsatt synes, er at det var {a} prikker i alt.',
    ariaTally: 'Alle par som fortsatt kan stemme når det var {a} prikker i alt.',
    tallyOne: 'Bare ett tall passer under luka – det andre ser dere allerede.',
    tallyMany: 'Dette er parene som kan passe under de to lukene.',
    saidNoTally: 'Ingenting er skjult, så det er ingenting å finne ut.',
    saidDealt: 'Nå har noe annet skjedd. Se på det før dere lukker noe.',
    rangeLabel: 'Hvor mange prikker',
    rangeTen: 'opp til ti',
    rangeSixteen: 'opp til seksten',
    sheetTitle: 'Slik så det ut, og plass til å skrive hva dere spurte om',
    sheetHint: 'Skriv ett spørsmål på hver linje, og regnestykket som hører til.',
    lockedTitle: 'Arbeidsarket hører til Lærerabonnementet',
    lockedBody: 'Alt her er gratis – alt som dukker opp på gjerdet, begge lukene og mulighetene. Lærerabonnementet gir i tillegg arbeidsarket, som viser det klassen nettopp så på, med linjer å skrive setningene på.'
  },

  /* Finnish */
  fi: {
    title: 'Mitä kysyisit?',
    instruction: 'Hyllyllä ja sen yläpuolella on tapahtunut jotain. Kukaan ei ole kysynyt teiltä mitään — miettikää yhdessä, mitä tästä voisi kysyä. Sulkekaa sitten luukku sen päälle, mitä haluatte jäädä pohtimaan. Kun molemmat luukut ovat kiinni, katsokaa, mitkä parit voisivat vielä olla piilossa.',
    deal: 'Toinen tilanne',
    shutLedge: 'Hyllyluukku',
    shutAir: 'Ilmaluukku',
    tally: 'Mitä on piilossa?',
    hideTally: 'Vie vaihtoehdot pois',
    print: 'Tulosta paperipohja',
    ariaFrame: 'Hyllyllä merkkejä {b}, ilmassa hyllyn yläpuolella {c}. Kaikkiaan merkkejä on {a}.',
    ariaLedgeShut: 'Hyllyluukku on kiinni. Ilmassa näkyviä merkkejä {c}. Kaikkiaan merkkejä oli {a}.',
    ariaAirShut: 'Ilmaluukku on kiinni. Hyllyllä näkyviä merkkejä {b}. Kaikkiaan merkkejä oli {a}.',
    ariaBothShut: 'Molemmat luukut ovat kiinni. Näkyvissä on enää se, että merkkejä oli kaikkiaan {a}.',
    ariaTally: 'Kaikki parit, jotka voisivat olla piilossa, kun merkkejä on kaikkiaan {a}.',
    tallyOne: 'Piiloon sopii vain yksi luku. Parin toinen luku on näkyvissä.',
    tallyMany: 'Nämä ovat ne parit, jotka sopisivat luukkujen taakse.',
    saidNoTally: 'Mitään ei ole piilossa, joten mietittävää ei vielä ole.',
    saidDealt: 'Tässä on toinen tilanne. Katsokaa sitä rauhassa, ennen kuin suljette mitään.',
    rangeLabel: 'Merkkien määrä',
    rangeTen: 'enintään kymmenen',
    rangeSixteen: 'enintään kuusitoista',
    sheetTitle: 'Tilanne ja tilaa omille kysymyksille',
    sheetHint: 'Yksi rivi jokaiselle luokan kysymykselle ja sille laskulle, joka siihen kuuluu.',
    lockedTitle: 'Paperipohja kuuluu Opettajatilaukseen',
    lockedBody: 'Täällä kaikki on maksutonta — jokainen tilanne, molemmat luukut ja vaihtoehdot. Opettajatilaus tuo lisäksi paperipohjan, jossa on juuri se tilanne, jota luokka katsoi, ja viivat kysymyksille ja laskuille.'
  }
};
