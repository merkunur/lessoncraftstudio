'use strict';
/**
 * Lehrerhinweise, Deutsch, Mathematik Klasse 3 (Daily Teaching System, Part 4.5). Geschrieben aus dem, was die
 * deutschen Arbeitsblätter jeder Stunde DRUCKEN (scripts/units/author-sheet.js --loc=de), für den Unterricht in
 * Deutschland: Zahlenraum bis 1000, schriftliches Rechnen mit Übertrag, Teilen mit Rest, 24-Stunden-Zeit, Gramm und
 * Milliliter. Keine Übersetzung der englischen Hinweise.
 */
module.exports = {
  loc: 'de',
  points: {
    '2:read-build-3-digit': {
      title: 'Hunderter, Zehner und Einer',
      objective: 'Die Kinder lesen eine dreistellige Zahl ab, die mit Hunderterplatten, Zehnerstangen und Einerwürfeln gelegt ist, und füllen die Stellenwerttafel aus.',
      note: {
        mistake: 'Die Kinder schreiben die Anzahlen auf, die sie sehen, und lassen eine leere Stelle aus: Zwei Platten und sechs Würfel werden zu 26. Beim Diktat schreiben dieselben Kinder, was sie hören: Aus zweihundertsechs wird 2006, und bei „zweihundertvierunddreißig“ drehen sie Zehner und Einer zu 243.',
        words: 'Zählen Sie nach Stellen: „100, 200 … 210, 220 … 221, 222.“ Sagen Sie: „Jede Stelle braucht eine Ziffer. Keine Zehner? Dann hält die Null den Platz frei.“ Fragen Sie: „Was ist die 2 in 206 wert? Und die 0? Und die 6?“ In der Stellenwerttafel stehen H, Z und E.',
        watch: 'Prüfen Sie zuerst alle Zahlen mit einer Null an der Zehner- oder Einerstelle. Ein Kind, das für zwei Platten und sechs Würfel 26 schreibt, behält die Stellenwerttafel vorerst neben jeder Zahl.',
      },
    },
    '2:expanded-form-digit-value': {
      title: 'Zahlen zerlegen: Was ist die Ziffer wert?',
      objective: 'Die Kinder ordnen einer Menge von Hundertern, Zehnern und Einern die passende Zerlegung zu und sagen, was eine unterstrichene Ziffer wert ist.',
      note: {
        mistake: 'Die Kinder sagen, eine unterstrichene 4 sei „4“ wert, egal wo sie steht. Bei 345 wählen sie 300 + 4 + 5 und behandeln die Zehnerziffer wie Einer.',
        words: 'Fragen Sie: „An welcher Stelle steht die Ziffer? An der Zehnerstelle, also sind es 4 Zehner. Was sind 4 Zehner wert?“ (40.) Sprechen Sie eine Zahl in Teilen: „345 ist 300 und 40 und 5.“ Schreiben und lesen Sie beide Formen.',
        watch: 'Fragen Sie nach dem Wert derselben Ziffer an zwei Stellen, etwa in 44 oder 404. Ein Kind, das beide Male „vier“ antwortet, nennt die Ziffer und nicht ihren Wert.',
      },
    },
    '2:compare-order-3-digit': {
      title: 'Dreistellige Zahlen vergleichen und ordnen',
      objective: 'Die Kinder vergleichen zwei dreistellige Zahlen mit den Zeichen für größer, kleiner und gleich und bringen vier Zahlen in die richtige Reihenfolge.',
      note: {
        mistake: 'Die Kinder entscheiden nach der größten Ziffer irgendwo in der Zahl („199 ist größer als 201 wegen der Neunen“). Sind die Hunderter gleich, springen sie zu den Einern und lassen die Zehner aus.',
        words: 'Sagen Sie: „Fang links an. Vergleiche die Hunderter. Gleich? Dann die Zehner. Gleich? Dann die Einer.“ Lesen Sie die fertige Zeile laut: „402 ist größer als 398.“ Beim Ordnen: „Suche die kleinste Zahl und schreibe 1 dazu. Dann die kleinste von denen, die übrig sind.“',
        watch: 'Nehmen Sie Paare wie 398 und 402, um zu sehen, wer von links Stelle für Stelle vergleicht. Beim Ordnen von vier Zahlen: Wer vergleicht nur Nachbarn und prüft nie die ganze Reihe?',
      },
    },
    '2:hundred-more-less': {
      title: '100 mehr, 100 weniger',
      objective: 'Die Kinder schreiben zu einer dreistelligen Zahl die Zahl, die 100 weniger ist, und die Zahl, die 100 mehr ist.',
      note: {
        mistake: 'Die Kinder ändern die Zehner- oder die Einerziffer, oder sie zählen in Einern hoch und geben auf. 100 weniger als eine Zahl knapp über 100, etwa 105, lässt sie ohne Hunderterziffer zurück; sie wissen nicht, was sie schreiben sollen.',
        words: 'Fragen Sie: „100 mehr. Welche Ziffer ändert sich? Welche zwei bleiben gleich?“ Sagen Sie: „Nur die Hunderterziffer ändert sich. 347, 447.“ Zählen Sie von einer beliebigen Zahl in Hunderterschritten: „26, 126, 226, 326.“ Dann mit 10: „347, 357. Welche Ziffer hat sich diesmal geändert?“',
        watch: 'Wer antwortet sofort, indem er eine Ziffer ändert, und wer zählt noch? Geben Sie eine Zahl über 900 und sprechen Sie darüber, was nach 9 Hundertern kommt: der Tausender.',
      },
    },
    '2:round-to-ten': {
      title: 'Auf Zehner runden',
      objective: 'Die Kinder finden am Zahlenstrahl den Zehner, der näher an einer Zahl liegt, und runden zweistellige Zahlen auf den nächsten Zehner.',
      note: {
        mistake: 'Die Kinder runden jedes Mal ab, indem sie die Einer abschneiden (aus 47 wird 40), oder sie runden 47 auf 57. Eine Zahl mit 5 am Ende liegt genau in der Mitte, und die Kinder wissen nicht, in welche Richtung es geht.',
        words: 'Fragen Sie zuerst: „Zwischen welchen zwei Zehnern liegt 47?“ (40 und 50: die Nachbarzehner.) „Welcher ist näher?“ Sagen Sie: „Die Einerziffer entscheidet. Bei 0 bis 4 runden wir ab, bei 5 bis 9 runden wir auf.“ Zu 45: „Sie liegt genau in der Mitte. Es ist so abgemacht, dass wir dann aufrunden: 45 wird 50.“',
        watch: 'Lassen Sie sich vor der Antwort die beiden Nachbarzehner nennen. Ein Kind, das sie nicht nennen kann, wendet die Regel an, ohne einen Zahlenstrahl vor Augen zu haben; gehen Sie zurück zum Punkt auf dem Strahl.',
      },
    },
    '3:rounding': {
      title: 'Auf Hunderter runden',
      objective: 'Die Kinder finden am Zahlenstrahl den Hunderter, der näher an einer Zahl liegt, und runden dreistellige Zahlen auf den nächsten Hunderter.',
      note: {
        mistake: 'Die Kinder schauen auf die Einerziffer wie beim Runden auf Zehner, deshalb wird 349 wegen der 9 auf 400 aufgerundet. Oder sie ändern nur die Zehner und schreiben 350.',
        words: 'Fragen Sie: „Zwischen welchen zwei Hundertern liegt 349? Welche Zahl liegt genau in der Mitte?“ (350.) „Liegt 349 vor oder hinter der Mitte?“ Sagen Sie: „Beim Runden auf Hunderter entscheidet die ZEHNERZIFFER. Die Einer spielen keine Rolle.“',
        watch: 'Nehmen Sie 349 und 351 als Prüfzahlen. Ein Kind, das beide gleich rundet, denkt nicht an die Mitte; tragen Sie beide Zahlen an einem Zahlenstrahl von 300 bis 400 ein.',
      },
    },
    '3:estimate-by-rounding': {
      title: 'Runden und überschlagen',
      objective: 'Die Kinder runden zwei Zahlen auf den nächsten Zehner und rechnen die gerundeten Zahlen zusammen, um die Summe zu überschlagen; mit der Lehrkraft prüfen sie am Überschlag, ob ein genaues Ergebnis stimmen kann.',
      note: {
        mistake: 'Die Kinder rechnen zuerst die genaue Summe aus und runden dann das Ergebnis; damit ist der Überschlag sinnlos. Oder sie runden nur eine der beiden Zahlen.',
        words: 'Sagen Sie: „Erst runden, dann rechnen. Ein Überschlag ist schnell und ungefähr richtig, nicht genau.“ Zeigen Sie es: „48 + 31 ist ungefähr 50 + 30. Ungefähr 80.“ Dann: „Jemand hat für 48 + 31 als Ergebnis 109. Kann das stimmen? Woher weißt du das, ohne zu rechnen?“',
        watch: 'Wer schreibt die genaue Summe an den Rand, bevor gerundet wird? Geben Sie ein falsches genaues Ergebnis vor und lassen Sie die Klasse es mit einem Überschlag entlarven; dafür ist das Überschlagen da.',
      },
    },
    '2:add-with-blocks': {
      title: 'Mit Blöcken addieren',
      objective: 'Die Kinder legen zwei Mengen aus Hundertern, Zehnern und Einern zusammen und schreiben das Ergebnis auf.',
      note: {
        mistake: 'Die Kinder zählen jede Sorte Blöcke und schreiben die drei Anzahlen nebeneinander, auch wenn es 12 Einer oder 11 Zehner sind: Aus 2 Hundertern, 4 Zehnern und 12 Einern wird 2412.',
        words: 'Sagen Sie: „Lege zuerst die Einer zusammen. Sind es zehn oder mehr? Tausche zehn Einer in einen Zehner.“ Dann die Zehner: „Zehn Zehner? Tausche sie in einen Hunderter.“ Fragen Sie: „Wie viele Einer bleiben nach dem Tauschen übrig?“ Sagen Sie für das Tauschen auch „bündeln“.',
        watch: 'Achten Sie auf vierstellige Ergebnisse, wo drei Stellen zu erwarten sind; sie zeigen, dass nicht getauscht wurde. Nehmen Sie echtes Material und lassen Sie mit den Händen tauschen, bevor etwas geschrieben wird.',
      },
    },
    '2:subtract-with-blocks': {
      title: 'Mit Blöcken subtrahieren',
      objective: 'Die Kinder nehmen eine Menge von Blöcken von einer anderen weg und schreiben auf, wie viel übrig bleibt.',
      note: {
        mistake: 'Reichen die Einer nicht, ziehen die Kinder an jeder Stelle die kleinere Ziffer von der größeren ab (aus 52 − 17 wird 45), oder sie sagen, das gehe nicht.',
        words: 'Sagen Sie: „Ich soll 7 Einer wegnehmen und habe nur 2. Ich tausche einen Zehner in zehn Einer. Jetzt habe ich 12 Einer.“ Fragen Sie: „Wie viele Zehner sind nach dem Tauschen noch da?“ Auf der Seite werden die Blöcke durchgestrichen, die weggenommen sind. Für dieses Tauschen sagt man auch „entbündeln“.',
        watch: 'Prüfen Sie die Aufgaben, bei denen die zweite Zahl mehr Einer hat als die erste. Ein Kind, das den Unterschied der Ziffern hinschreibt, bricht ein paarmal eine echte Zehnerstange in Einer auf.',
      },
    },
    '2:column-method': {
      title: 'Schriftlich addieren und subtrahieren ohne Übertrag',
      objective: 'Die Kinder rechnen zweistellige Aufgaben schriftlich untereinander, Stelle für Stelle: zuerst die Einer, dann die Zehner.',
      note: {
        mistake: 'Die Kinder beginnen links bei den Zehnern, weil sie von links lesen. Ohne Übertrag stimmt das Ergebnis trotzdem, aber die Gewohnheit führt bei der nächsten Seite in den Fehler. Beim Abschreiben einer Aufgabe stehen die Ziffern nicht sauber untereinander. Beim Minus ziehen manche die obere Ziffer von der unteren ab.',
        words: 'Sagen Sie: „Einer unter Einer, Zehner unter Zehner. Wir fangen IMMER rechts bei den Einern an.“ Sprechen Sie jede Stelle: „4 Einer plus 5 Einer sind 9 Einer. 2 Zehner plus 3 Zehner sind 5 Zehner.“ Beim Minus: „Von oben nach unten: 8 Einer minus 3 Einer.“',
        watch: 'Sehen Sie zu, an welcher Stelle ein Kind beginnt. Wer bei den Zehnern anfängt, rechnet die Aufgabe noch einmal und spricht dabei jede Stelle laut. Lassen Sie vor dem Rechnen überschlagen: „Wie viel wird es ungefähr?“',
      },
    },
    '3:column-regrouping': {
      title: 'Schriftlich addieren und subtrahieren mit Übertrag',
      objective: 'Die Kinder rechnen bis 1000 schriftlich plus und minus und beachten den Übertrag, wenn an einer Stelle mehr als neun zusammenkommen oder nicht genug da ist.',
      note: {
        mistake: 'Die Kinder vergessen, den Übertrag an der nächsten Stelle mitzurechnen, oder sie schreiben ihn hin und rechnen ihn zweimal. Beim Minus ziehen sie an einer Stelle die kleinere Ziffer von der größeren ab; bei einer Null an der Zehnerstelle (402 − 178) wissen sie nicht weiter.',
        words: 'Sprechen Sie jeden Schritt: „8 Einer plus 7 Einer sind 15 Einer. Das sind 1 Zehner und 5 Einer. Schreibe die 5 und merke den Zehner als kleine 1 bei den Zehnern.“ Beim Minus sprechen Sie das Verfahren so, wie es an Ihrer Schule eingeführt ist, mit Entbündeln oder mit Ergänzen; die Kinder sagen jedes Mal, was die kleine 1 bedeutet: „ein Zehner“, nicht „eins“.',
        watch: 'Prüfen Sie zuerst die Minusaufgaben mit einer Null in der oberen Zahl. Die Kinder machen zu jeder Minusaufgabe die Probe mit der Plusaufgabe, und sie überschlagen vor dem Rechnen: „Wie viel wird es ungefähr?“',
      },
    },
    '3:mult-div-relationship': {
      title: 'Der fehlende Faktor und Mal-Familien',
      objective: 'Die Kinder finden den fehlenden Faktor zu einem Punktefeld und schreiben die zwei Malaufgaben und die zwei Geteilt-Aufgaben auf, die zu ihm gehören.',
      note: {
        mistake: 'Die Kinder behandeln eine Geteilt-Aufgabe als neue Aufgabe und nutzen die Malaufgabe nicht, die sie gerade geschrieben haben. In der Mal-Familie schreiben sie eine Geteilt-Aufgabe, die mit einer kleinen Zahl beginnt, etwa 4 : 24 = 6.',
        words: 'Sagen Sie: „Geteilt fragt nach dem fehlenden Faktor. 24 : 4 fragt: 4 mal wie viel ist 24?“ Zeigen Sie auf das Punktefeld: „In der Mal-Familie wird die Gesamtzahl geteilt: 24 : 4, nicht 4 : 24.“ Die Kinder lesen alle vier Aufgaben eines Felds laut. Nennen Sie die Geteilt-Aufgabe die „Umkehraufgabe“ der Malaufgabe.',
        watch: 'Stellen Sie eine Geteilt-Aufgabe und sehen Sie, ob das Kind an die Malaufgabe denkt. Prüfen Sie die Reihenfolge der Zahlen in jeder Geteilt-Aufgabe: Die Gesamtzahl, das ganze Feld, steht vorn. Sagen Sie „die Gesamtzahl“, nie „die größte Zahl“.',
      },
    },
    '3:muldiv-word-problems': {
      title: 'Sachaufgaben zum Malnehmen und Teilen',
      objective: 'Die Kinder lösen Sachaufgaben mit gleich großen Gruppen und entscheiden, ob nach der Gesamtzahl, nach der Größe einer Gruppe oder nach der Zahl der Gruppen gefragt ist.',
      note: {
        mistake: 'Die Kinder suchen die zwei Zahlen heraus und rechnen jedes Mal mal, oder sie wählen die Rechenart nach einem Wort wie „je“. Sie fragen nicht, was die Antwort sein wird: eine Gesamtzahl, ein Anteil oder eine Zahl von Gruppen.',
        words: 'Stellen Sie zu jeder Aufgabe drei Fragen: „Wissen wir, wie viele Gruppen es sind? Wissen wir, wie viele in jeder Gruppe sind? Kennen wir die Gesamtzahl?“ Dann: „Was von den dreien fehlt?“ Die Kinder schreiben Frage, Rechnung und Antwort; der Antwortsatz ist ein ganzer Satz: „Jedes Kind bekommt 4 Sticker.“',
        watch: 'Lesen Sie den Antwortsatz eines Kindes, nicht nur die Zahl. Eine nackte „4“ zeigt nicht, ob das Kind weiß, dass es 4 Sticker für jedes Kind sind oder 4 Tüten. Jede Seite hat nur eine Art von Aufgabe und nimmt dem Kind die Entscheidung ab: Lesen Sie von jeder Seite eine Aufgabe vor, gemischt und ohne Bild, und fragen Sie, was fehlt.',
      },
    },
    '3:division-remainder': {
      title: 'Teilen mit Rest',
      objective: 'Die Kinder bilden aus einem Haufen gleich große Gruppen oder verteilen ihn auf Kästen, schreiben auf, wie viele Gruppen es sind oder wie viele jeder Kasten bekommt, und schreiben den Rest auf.',
      note: {
        mistake: 'Die Kinder lassen zu viele übrig: so viele wie eine Gruppe oder mehr auf der Seite zum Einkreisen, so viele wie die Zahl der Kästen oder mehr auf der Seite zum Verteilen, obwohl noch eine Gruppe oder eine Runde möglich wäre. Oder sie lassen den Rest weg und schreiben nur die Zahl der Gruppen.',
        words: 'Sagen Sie: „14 in Vierergruppen: drei Gruppen, und 2 bleiben übrig. 14 : 4 = 3 Rest 2.“ Fragen Sie: „Kannst du aus dem Rest noch eine Gruppe machen? Nein? Dann ist das der Rest.“ Beim Verteilen: „14 auf 4 Kästen. Reicht der Rest, damit jeder Kasten noch eins bekommt?“ Formulieren Sie die Regel gemeinsam: „Der Rest ist immer kleiner als die Zahl, durch die wir teilen.“',
        watch: 'Vergleichen Sie jeden Rest mit der Zahl, durch die geteilt wurde: der Größe einer Gruppe beim Einkreisen, der Zahl der Kästen beim Verteilen. Ein Rest von 5 bei Vierergruppen heißt: Im Rest steckt noch eine Gruppe. Die Probe: 3 · 4 + 2 = 14.',
      },
    },
    '3:balance-equations': {
      title: 'Gleichungen im Gleichgewicht',
      objective: 'Die Kinder verstehen das Gleichheitszeichen als Waage und schreiben die Zahl auf, mit der auf beiden Seiten gleich viel steht.',
      note: {
        mistake: 'Die Kinder lesen das Gleichheitszeichen als „jetzt kommt das Ergebnis“. Bei 8 + 4 = __ + 5 schreiben sie 12 in die Lücke, oder 17, weil sie alles zusammenrechnen.',
        words: 'Sagen Sie: „Das Gleichheitszeichen bedeutet: auf beiden Seiten GLEICH viel, wie bei einer Waage.“ Rechnen Sie erst eine Seite aus: „8 + 4 sind 12. Also muss die andere Seite auch 12 sein. Wie viel plus 5 sind 12?“ Lesen Sie das Zeichen als „ist genauso viel wie“.',
        watch: 'Zeigen Sie drei schnelle Karten zum Entscheiden, wahr oder falsch: 7 = 7, 5 + 3 = 3 + 5, 12 = 8 + 4. Ein Kind, das sie falsch nennt, „weil das Ergebnis auf der falschen Seite steht“, liest das Zeichen noch als Rechenbefehl; es arbeitet mit einer echten oder gezeichneten Waage und kleineren Zahlen.',
      },
    },
    '3:parity-of-sums': {
      title: 'Ist die Summe gerade oder ungerade?',
      objective: 'Die Kinder entscheiden an den Einerziffern der beiden Zahlen, ob eine Summe gerade oder ungerade sein wird, ohne zu rechnen.',
      note: {
        mistake: 'Die Kinder rechnen trotzdem und schauen dann auf das Ergebnis. Oder sie raten eine Regel, die sich richtig anfühlt: „Ungerade plus ungerade muss ungerade sein.“',
        words: 'Probieren Sie zuerst kleine Zahlen und sammeln Sie die Ergebnisse: „3 + 5 = 8. Ungerade plus ungerade … gerade!“ Fragen Sie nach dem Grund: „Bei jeder ungeraden Zahl bleibt eins übrig. Die zwei Übrigen bilden zusammen ein Paar.“ Stellen Sie die drei Regeln gemeinsam auf: gerade + gerade, ungerade + ungerade, gerade + ungerade.',
        watch: 'Lassen Sie ein Kind „ungerade plus ungerade“ mit Plättchen erklären, die in Paaren liegen. Wer die Tabelle nur aufsagen kann, vergisst sie wieder; wer sieht, wie die zwei Übrigen ein Paar bilden, nicht.',
      },
    },
    '3:arithmetic-patterns': {
      title: 'Zahlenfolgen: die Regel finden',
      objective: 'Die Kinder finden heraus, um wie viel eine Zahlenfolge bei jedem Schritt wächst oder kleiner wird, und schreiben die fehlenden Zahlen auf.',
      note: {
        mistake: 'Die Kinder schauen auf ein Zahlenpaar, legen sich auf eine Regel fest und prüfen sie nicht am Rest der Reihe. Bei Folgen, die kleiner werden, rechnen sie weiter plus. Zwei fehlende Zahlen hintereinander halten sie auf.',
        words: 'Fragen Sie: „Wie kommst du von dieser Zahl zur nächsten? Ist der Sprung jedes Mal gleich? Prüfe es an drei Paaren.“ Die Kinder schreiben die Regel über die Reihe: „+ 25“ oder „− 4“. Bei einer doppelten Lücke: „Zwei Sprünge führen von 40 zu 60. Wie groß ist ein Sprung?“',
        watch: 'Wer schreibt die Regel auf und prüft sie? Mischen Sie wachsende und fallende Folgen; ein Kind, das in einer fallenden Folge plus rechnet, schaut nicht mehr auf die Zahlen.',
      },
    },
    '3:input-output': {
      title: 'Zahlenmaschinen',
      objective: 'Die Kinder rechnen mit der Regel, die auf einer Zahlenmaschine steht, etwa + 7, − 4 oder · 5, und tragen die Zahlen ein, die beim Eingang oder beim Ausgang fehlen.',
      note: {
        mistake: 'Die Kinder wenden die Regel in jeder Zeile gleich an. Fehlt die Zahl, die HINEINGEHT, rechnen sie wieder vorwärts, statt die Regel umzukehren: Bei einer Maschine + 7, aus der 12 herauskommt, schreiben sie 19 statt 5; bei einer Maschine · 5, aus der 30 herauskommt, 150 statt 6. Manche lesen eine Minus-Regel als Plus.',
        words: 'Die Kinder lesen zuerst die Regel laut: „Diese Maschine rechnet bei jeder Zahl plus 7.“ Fehlt der Ausgang: „5 geht hinein. Plus 7. Was kommt heraus?“ Fehlt der Eingang: „12 ist herausgekommen. Die Maschine hat plus 7 gerechnet. Was ging hinein? Rechne die Umkehraufgabe: 12 minus 7.“ Bei einer Mal-Maschine: „30 ist herausgekommen. Die Maschine hat mal 5 gerechnet. Wie viel mal 5 sind 30?“',
        watch: 'Prüfen Sie die Zeilen, in denen der Eingang fehlt; dort braucht es die Umkehraufgabe. Das Kind schickt seine Antwort noch einmal durch die Maschine: Wenn 5 plus 7 die gedruckte 12 ergibt, stimmt die Zeile.',
      },
    },
    '3:time-to-minute': {
      title: 'Die Uhr minutengenau lesen',
      objective: 'Die Kinder lesen eine Zeigeruhr auf die Minute genau ab und wählen die passende Uhrzeit aus.',
      note: {
        mistake: 'Die Kinder lesen auf fünf Minuten genau und hören auf: 4:23 Uhr wird 4:20 Uhr oder 4:25 Uhr. Andere zählen jeden kleinen Strich von der 12 an und verzählen sich auf dem Weg.',
        words: 'Sagen Sie: „Gehe zu der Zahl kurz vor dem Minutenzeiger und zähle in Fünferschritten bis dorthin: 5, 10, 15, 20. Dann zähle die kleinen Striche einzeln: 21, 22, 23.“ Fragen Sie: „Ist der Stundenzeiger an der 4 vorbei? Ein bisschen oder weit?“',
        watch: 'Hören Sie einem Kind beim Zählen zu: erst Fünfer, dann Einer. Prüfen Sie Uhrzeiten im letzten Viertel der Stunde, wenn der Stundenzeiger schon nah an der nächsten Zahl steht.',
      },
    },
    '3:elapsed-duration': {
      title: 'Wie viel Zeit ist vergangen?',
      objective: 'Die Kinder vergleichen zwei Uhrzeiten und bestimmen die Zeitspanne dazwischen.',
      note: {
        mistake: 'Die Kinder ziehen die beiden Zahlen voneinander ab, ohne an die Uhr zu denken: Von 11 Uhr bis 2 Uhr werden 9 Stunden. Oder sie zählen die Startstunde als erste Stunde mit.',
        words: 'Sagen Sie: „Zähle die Sprünge von der Startzeit zur Endzeit: von 11 bis 12 ist eine Stunde, von 12 bis 1 sind zwei, von 1 bis 2 sind drei.“ Mit der 24-Stunden-Zeit geht es als Rechnung: „Von 11 Uhr bis 14 Uhr: 14 − 11 = 3 Stunden.“ Fragen Sie: „Passen drei Stunden? Was könntest du in dieser Zeit tun?“',
        watch: 'Prüfen Sie die Aufgaben, die über 12 Uhr gehen. Ein Kind, das für 11 Uhr bis 2 Uhr 9 Stunden schreibt, hat abgezogen; gehen Sie gemeinsam um eine Lernuhr und zählen Sie jede Stunde, die vergeht.',
      },
    },
    '3:add-subtract-time': {
      title: 'Zeit dazurechnen und abziehen',
      objective: 'Die Kinder gehen von einer Uhrzeit aus, rechnen Minuten oder Stunden dazu oder ab und schreiben die neue Uhrzeit auf.',
      note: {
        mistake: 'Die Kinder rechnen die Minuten wie gewöhnliche Zahlen und schreiben eine Uhrzeit, die es nicht gibt, etwa 3:75 Uhr. Geht es rückwärts über die volle Stunde, ändern sie die Minuten und vergessen die Stunde.',
        words: 'Sagen Sie: „Eine Stunde hat 60 Minuten, nicht 100.“ Springen Sie zuerst zur vollen Stunde: „3:45 Uhr plus 30 Minuten. 15 Minuten bis 4:00 Uhr. Noch 15 dazu: 4:15 Uhr.“ Zeichnen Sie die Sprünge an einem leeren Zahlenstrahl mit den Uhrzeiten.',
        watch: 'Achten Sie auf Ergebnisse mit 60 Minuten oder mehr. Die Kinder zeigen den Sprung zur nächsten vollen Stunde an einer Uhr oder am Strahl, bevor sie schreiben.',
      },
    },
    '3:time-12-24': {
      title: 'Vormittag und Nachmittag: 3 Uhr und 15 Uhr',
      objective: 'Die Kinder ordnen einer Uhrzeit am Vormittag oder Nachmittag die passende Schreibweise der 24-Stunden-Zeit zu.',
      note: {
        mistake: 'Die Kinder rechnen auch bei Uhrzeiten am Vormittag 12 dazu, oder sie lassen die erste Ziffer weg: Aus 15:00 Uhr wird 5 Uhr. Mittag und Mitternacht werden verwechselt.',
        words: 'Sagen Sie: „Der Stundenzeiger läuft am Tag zweimal um die Uhr. Nach 12 Uhr mittags zählen wir weiter: 13, 14, 15.“ Geben Sie die Regel in beide Richtungen: „Am Nachmittag und Abend: 12 dazu. 3 Uhr nachmittags ist 15 Uhr. Von der 24-Stunden-Zeit zurück: 12 ab.“ Fragen Sie: „Ist 08:00 Uhr morgens oder abends? Woher weißt du das?“',
        watch: 'Prüfen Sie den Mittag und die Stunde danach, etwa 12:30 Uhr, das 12:30 Uhr bleibt, und Mitternacht, 0:00 Uhr. Nehmen Sie einen Fahrplan oder den Stundenplan der Klasse: Dort stehen die Zeiten so, wie die Kinder sie im Alltag lesen müssen.',
      },
    },
    '3:thermometer': {
      title: 'Das Thermometer ablesen',
      objective: 'Die Kinder lesen die Temperatur an einem Thermometer ab, dessen Skala in 2er-, 5er- oder 10er-Schritten zählt.',
      note: {
        mistake: 'Die Kinder zählen jeden Strich als ein Grad, egal welche Skala es ist. Sie lesen die nächste gedruckte Zahl ab und beachten die Striche dazwischen nicht, oder sie schauen auf das obere Ende des Röhrchens und nicht auf das Ende der farbigen Säule.',
        words: 'Fragen Sie zuerst: „Diese Skala zählt nicht in Einerschritten. In welchen Schritten zählen die gedruckten Zahlen? Wie viel ist also ein kleiner Strich wert?“ Dann: „Suche das Ende der Säule. Welche gedruckte Zahl steht knapp darunter? Zähle von dort hoch.“ Sprechen Sie die Temperatur mit der Einheit: „20 Grad Celsius.“',
        watch: 'Vergleichen Sie zwei Thermometer mit verschiedenen Skalen, die dieselbe Temperatur zeigen, und fragen Sie, welches schwerer abzulesen war und warum.',
      },
    },
    '2:mass-grams': {
      title: 'Waagen ablesen: Gramm',
      objective: 'Die Kinder rechnen die Gewichtsstücke an einer Waage zusammen, um zu bestimmen, wie viel ein Gegenstand wiegt, lesen Waagen und Messbecher ab und schreiben jede Menge mit ihrer Einheit auf.',
      note: {
        mistake: 'Die Kinder zählen die Gewichtsstücke („drei Gewichte, also 3“) und rechnen nicht zusammen, was auf ihnen steht. Am Messbecher lesen sie die nächste gedruckte Zahl ab und beachten die kleinen Schritte dazwischen nicht, oder sie schreiben Gramm für eine Flüssigkeit.',
        words: 'Sagen Sie: „Lies jedes Gewichtsstück: 100, 50, 20. Rechne zusammen: 170 Gramm.“ Am Messbecher: „Schau auf zwei gedruckte Zahlen nebeneinander. Wie viele Schritte liegen dazwischen? Wie viel ist also ein Schritt wert?“ Die Einheit gehört immer dazu: „170 Gramm“, „300 Milliliter“.',
        watch: 'Prüfen Sie, ob bei jeder Antwort die Einheit steht. Bevor ein Kind eine Skala abliest, fragen Sie, wie viel ein kleiner Schritt wert ist; in dieser Frage steckt das ganze Können.',
      },
    },
    '2:read-jugs': {
      title: 'Messbecher ablesen: Milliliter',
      objective: 'Die Kinder lesen an der Skala eines Messbechers ab, wie viele Milliliter Flüssigkeit darin sind.',
      note: {
        mistake: 'Die Kinder lesen den oberen Rand des Bechers oder die nächste gedruckte Zahl ab, nicht den Stand der Flüssigkeit. Zählt die Skala in 100er- oder 200er-Schritten, zählen sie jeden Strich als 1.',
        words: 'Sagen Sie: „Lege den Finger auf den Rand der Flüssigkeit. Fahre hinüber zur Skala.“ Fragen Sie: „Die Zahlen lauten 200, 400, 600. Welche Zahl gehört an den Strich genau zwischen 200 und 400?“ Sprechen Sie die Einheit: „300 Milliliter.“ Bei den großen Bechern: „1000 Milliliter sind 1 Liter.“',
        watch: 'Nehmen Sie einmal einen echten Messbecher mit Wasser; die Kinder müssen mit den Augen auf die Höhe der Flüssigkeit gehen. Prüfen Sie auf der Seite die Becher, in denen die Flüssigkeit zwischen zwei gedruckten Zahlen endet.',
      },
    },
    '3:area-model': {
      title: 'Flächeninhalt: Kästchen zählen',
      objective: 'Die Kinder bestimmen den Flächeninhalt eines Rechtecks, indem sie seine Kästchen reihenweise zählen, und ergänzen die Malaufgabe dazu.',
      note: {
        mistake: 'Die Kinder zählen die Kästchen einzeln und verzählen sich in einem großen Rechteck. Andere zählen die Kästchen an zwei Seiten und rechnen sie zusammen; diese Zahl hat mit dem Flächeninhalt nichts zu tun.',
        words: 'Sagen Sie: „Der Flächeninhalt sagt, wie viele Kästchen die Form bedecken, ohne Lücke und ohne Überlappen.“ Fragen Sie: „Wie viele Kästchen in einer Reihe? Wie viele Reihen? 4 Reihen mit je 6 sind 24 Kästchen.“ Die Einheit gehört dazu: „24 Kästchen.“',
        watch: 'Fragen Sie, wie das Kind gezählt hat. Reihen mal Kästchen pro Reihe ist das Ziel; einzeln zählen ist der Anfang. Achten Sie darauf, dass die Einheit genannt wird.',
      },
    },
    '3:same-area': {
      title: 'Gleicher Flächeninhalt, andere Form',
      objective: 'Die Kinder vergleichen Rechtecke und kreisen dasjenige ein, das gleich viele Kästchen bedeckt wie ein anderes.',
      note: {
        mistake: 'Die Kinder wählen das Rechteck, das dem ersten am ähnlichsten sieht, oder sie meinen, ein langes schmales Rechteck müsse größer sein als ein gedrungenes. Sie urteilen nach Augenmaß und zählen nicht.',
        words: 'Sagen Sie: „Andere Form, gleich viel Platz. Zähle die Kästchen von jedem.“ Fragen Sie: „Eines mit 2 mal 6 und eines mit 3 mal 4. Wie viele Kästchen hat jedes?“ Zerschneiden Sie ein Papierrechteck mit 3 mal 4 Kästchen und legen Sie es neu zusammen: „Hat sich der Flächeninhalt geändert?“',
        watch: 'Wer zählt, und wer geht nach dem Aussehen? Lassen Sie ein Kind auf Kästchenpapier zwei verschiedene Rechtecke mit 12 Kästchen zeichnen.',
      },
    },
    '3:perimeter': {
      title: 'Umfang: einmal rundherum',
      objective: 'Die Kinder bestimmen den Umfang eines Rechtecks, indem sie die Kästchenkanten einmal rundherum zählen.',
      note: {
        mistake: 'Die Kinder zählen die Kästchen am Rand und nicht die Kanten; ein Eckkästchen wird dann einmal gezählt, obwohl es zwei Außenkanten hat. Oder sie zählen die Kästchen innen und nennen den Flächeninhalt.',
        words: 'Sagen Sie: „Der Umfang ist der Weg einmal rundherum, wie ein Zaun.“ Fahren Sie mit dem Finger außen entlang: „Zähle die Kanten, nicht die Kästchen. Markiere, wo du anfängst.“ Beim Rechteck: „Zwei lange und zwei kurze Seiten: 5 + 3 + 5 + 3.“',
        watch: 'Prüfen Sie die Ecken: Ein Kind, das Kästchen zählt, bekommt eine Zahl, die um 4 zu klein ist. Fragen Sie „Ist das der Zaun oder der Rasen?“, um Umfang und Flächeninhalt auseinanderzuhalten.',
      },
    },
    '3:same-perimeter': {
      title: 'Gleicher Umfang, anderer Flächeninhalt',
      objective: 'Die Kinder vergleichen Rechtecke und kreisen dasjenige ein, das denselben Umfang hat wie ein anderes.',
      note: {
        mistake: 'Die Kinder glauben, Rechtecke mit gleichem Umfang hätten auch den gleichen Flächeninhalt, oder sie vergleichen Flächen, weil sie zuletzt Kästchen gezählt haben. Einem langen schmalen Rechteck trauen sie den längeren Zaun zu.',
        words: 'Sagen Sie: „Gleicher Zaun, neuer Garten.“ Knoten Sie eine Schnur zum Ring und ziehen Sie ihn zu verschiedenen Rechtecken: „Die Schnur ist nicht länger geworden. Ist der Platz innen gleich geblieben?“ Die Kinder zählen die Kanten jedes Rechtecks und schreiben die Zahlen auf.',
        watch: 'Fragen Sie bei zwei Rechtecken nach beiden Zahlen, dem Umfang und dem Flächeninhalt, und lassen Sie das Kind sagen, welche welche ist. Diese Stunde ist dazu da, die beiden Begriffe zu trennen.',
      },
    },
    '3:volume-cubes': {
      title: 'Würfeltürme: Wie viele Würfel sind es?',
      objective: 'Die Kinder zählen alle Würfel eines Würfelturms, auch die, die man nicht sieht, und schreiben die Anzahl auf.',
      note: {
        mistake: 'Die Kinder zählen nur die Würfel, die auf der Zeichnung zu sehen sind, und lassen die verdeckten hinten und unten aus. Oder sie zählen die Quadrate, die sie sehen, und kommen auf eine viel zu große Zahl.',
        words: 'Bauen Sie den Turm zuerst mit Steckwürfeln: „Wie viele siehst du von hier? Jetzt drehe ihn und nimm ihn auseinander. Zähle alle.“ Sagen Sie: „Zähle Schicht für Schicht. Wie viele Würfel in der untersten Schicht? In der nächsten? Rechne die Schichten zusammen.“ Fragen Sie: „Ein Würfel oben muss auf etwas liegen. Was ist unter ihm?“ Das Wort dazu: „Die Zahl der Würfel, die einen Körper füllen, ist sein Rauminhalt.“',
        watch: 'Jedes Kind baut einen Turm von der Seite mit Würfeln nach und vergleicht mit der aufgeschriebenen Zahl. Ein Kind, das schichtweise zählt („6 und 6 und 6“), ist auf dem Weg zum Rauminhalt als Schichten mal Würfel pro Schicht.',
      },
    },
    '3:right-angles': {
      title: 'Rechte Winkel finden',
      objective: 'Die Kinder finden an Formen die rechten Winkel, also Ecken wie beim Quadrat, und kreisen sie ein.',
      note: {
        mistake: 'Die Kinder erkennen einen rechten Winkel nur, wenn ein Schenkel waagerecht liegt und der andere senkrecht steht. Eine solche Ecke an einer gedrehten Form übersehen sie, und einen Winkel, der fast ein rechter ist, lassen sie gelten.',
        words: 'Jedes Kind faltet einen Faltwinkel: ein Blatt zweimal falten, sodass Kante auf Kante liegt. „Lege den Faltwinkel in die Ecke. Passt er genau? Dann ist es ein rechter Winkel.“ Sagen Sie „kleiner als ein rechter Winkel“ und „größer als ein rechter Winkel“.',
        watch: 'Wer dreht den Faltwinkel oder das Blatt, um eine gedrehte Ecke zu prüfen? Prüfen Sie die Winkel, die fast rechte Winkel sind; nur der Faltwinkel kann sie entscheiden.',
      },
    },
    '3:classify-quadrilaterals': {
      title: 'Ist es ein Rechteck?',
      objective: 'Die Kinder entscheiden an Seiten und Winkeln, ob ein Viereck ein Rechteck ist, und wissen, dass auch ein Quadrat ein Rechteck ist.',
      note: {
        mistake: 'Die Kinder sagen, ein Quadrat sei kein Rechteck, weil „ein Rechteck zwei lange und zwei kurze Seiten hat“. Ein gedrehtes Rechteck lassen sie nicht gelten, und ein schiefes Parallelogramm halten sie für eines.',
        words: 'Fragen Sie: „Was macht ein Rechteck aus? Vier Seiten und vier rechte Winkel.“ Dann: „Hat ein Quadrat vier Seiten und vier rechte Winkel? Dann ist es ein Rechteck, ein besonderes.“ Die Ecken werden mit dem Faltwinkel geprüft.',
        watch: 'Fragen Sie „Ist ein Quadrat ein Rechteck?“ und hören Sie auf den Grund. Ein Kind, das sagt „ja, weil es vier rechte Winkel hat“, ordnet nach Eigenschaften, und darum geht es in dieser Stunde.',
      },
    },
    '3:symmetry': {
      title: 'Wie viele Spiegelachsen?',
      objective: 'Die Kinder finden alle Spiegelachsen einer Form und schreiben auf, wie viele es sind.',
      note: {
        mistake: 'Die Kinder finden die senkrechte Achse und hören auf. Die waagerechte und die schrägen übersehen sie, oder sie zählen die Diagonalen eines langen Rechtecks mit, die keine Spiegelachsen sind.',
        words: 'Sagen Sie: „Probiere jede Faltung: von oben nach unten, quer, von Ecke zu Ecke.“ Mit ausgeschnittenen Formen: „Falte. Liegen die Hälften genau aufeinander?“ Fragen Sie: „Ein Quadrat hat 4 Spiegelachsen. Warum hat ein Rechteck, das kein Quadrat ist, nur 2?“',
        watch: 'Teilen Sie Papierformen zum Falten aus. Prüfen Sie das lange Rechteck: Ein Kind, das dafür 4 schreibt, hat es nicht an der Diagonale gefaltet.',
      },
    },
    '3:scaled-graphs': {
      title: 'Diagramme mit einer Skala in Fünferschritten',
      objective: 'Die Kinder lesen Säulendiagramme, deren Skala in 5er-Schritten zählt, und Bilddiagramme, in denen jedes Bild für 5 steht.',
      note: {
        mistake: 'Die Kinder zählen die Gitterlinien oder die Bilder als Einer und beachten die Skala nicht. Eine Säule, die an einer Linie ohne Zahl endet, lesen sie als die gedruckte Zahl darunter.',
        words: 'Fragen Sie zuerst: „In welchen Schritten zählt die Skala? Wofür steht ein Bild?“ Zählen Sie mit: „5, 10, 15, 20.“ Bei einer Säule, die an einer Linie ohne Zahl endet: „Die gedruckten Zahlen darunter und darüber sind 10 und 20. Wie viel ist diese Linie wert?“',
        watch: 'Das Kind liest die Skala oder den Hinweis zum Bild laut, bevor es die erste Antwort schreibt. Stellen Sie eine Vergleichsfrage („wie viele mehr“), um zu sehen, ob das Kind mit den Werten der Skala rechnet oder Bilder zählt.',
      },
    },
    '3:line-plot-halves': {
      title: 'Ein X-Diagramm mit halben Schritten',
      objective: 'Die Kinder lesen ein X-Diagramm, dessen Zahlenlinie in halben Schritten eingeteilt ist, und schreiben auf, wie viele X über jeder Zahl stehen.',
      note: {
        mistake: 'Die Kinder überspringen die halben Striche und lesen nur die ganzen Zahlen; ein X bei 2½ rutscht zur 2 oder zur 3. Außerdem verwechseln sie das Maß unter einem Stapel mit der Anzahl der X darin.',
        words: 'Lesen Sie die Linie gemeinsam laut: „1, eineinhalb, 2, zweieinhalb.“ Fragen Sie: „Wie viele Dinge waren zweieinhalb Einheiten lang? Zähle die X über diesem Strich.“ Dann: „Wie viele waren länger als 2?“',
        watch: 'Stellen Sie eine Frage, deren Antwort auf einem halben Strich liegt. Ein Kind, das für die nächste ganze Zahl antwortet, liest die halben Schritte der Linie noch nicht.',
      },
    },
  },
};
