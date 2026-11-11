'use strict';
/**
 * Lehrerhinweise, Deutsch, Mathematik Klasse 2 (Daily Teaching System, Part 4.5). Geschrieben aus dem, was die
 * deutschen Arbeitsblätter jeder Stunde DRUCKEN (scripts/units/author-sheet.js --loc=de), für den Unterricht in
 * Deutschland: Zahlenraum bis 100, Malpunkt und Geteilt-Zeichen, Verteilen und Aufteilen, Viertel nach und Viertel vor,
 * Euro und Cent. Keine Übersetzung der englischen Hinweise.
 */
module.exports = {
  loc: 'de',
  points: {
    '2:bundle-ten-ones': {
      title: 'Zehn Einer zu einem Zehner bündeln',
      objective: 'Die Kinder kreisen 10 Einer zu einem Zehner ein und schreiben auf, wie viele Zehner und Einer es sind.',
      note: {
        mistake: 'Die Kinder kreisen ungefähr zehn ein, ohne zu zählen, oder sie bündeln einen Zehner und zählen seine Einer danach noch einmal als Einer mit. Vierzehn wird als 1 Zehner und 14 Einer aufgeschrieben.',
        words: 'Sagen Sie: „Zehn Einer sind ein Zehner. Kreise genau zehn ein. Zähle nach.“ Dann: „Die Einer im Kreis sind jetzt ein Zehner. Zähle nur noch die Einer, die draußen übrig sind.“ Fragen Sie: „Kannst du noch einen Zehner bündeln? Woher weißt du das?“ Zum Schluss der nächste Schritt: „Zehn Zehner sind ein Hunderter.“',
        watch: 'Wer zählt nach dem Bündeln nur die losen Einer, und wer zählt alle noch einmal? Mit Steckwürfeln stecken die Kinder zuerst wirklich zehn zusammen; die Seite kommt nach den Händen.',
      },
    },
    '2:skip-count-5-10-100': {
      title: 'In Fünfer- und Zehnerschritten zählen',
      objective: 'Die Kinder zählen in Fünferschritten bis 50 und in Zehnerschritten bis 100 und verbinden die Punkte in dieser Reihenfolge zu einem Bild.',
      note: {
        mistake: 'Die Kinder können die Reihe vom Anfang an aufsagen, aber nicht von einer Zahl in der Mitte aus weiterzählen. Beim Punktebild verbinden sie den nächstgelegenen Punkt, oder sie halten 15 und 50 für dieselbe Zahl, weil „fünfzehn“ und „fünfzig“ ähnlich klingen.',
        words: 'Sagen Sie: „Sprich die Zahl, bei der du bist. Rechne im Kopf fünf dazu. Suche diese Zahl, dann zeichne.“ Zählen Sie an der Hundertertafel in Fünfer- und Zehnerschritten und fragen Sie: „Was fällt dir an der Einerstelle auf?“ Probieren Sie Zehnerschritte ab der 3: „3, 13, 23.“',
        watch: 'Halten Sie ein Kind mitten im Bild an und fragen Sie, was als Nächstes kommt. Wer die Reihe wieder bei 5 beginnt, kann einen Vers; von 35 aus weiterzählen ist das Können. Zählen Sie zum Schluss gemeinsam rückwärts: „100, 90, 80 …“ und „50, 45, 40 …“.',
      },
    },
    '2:number-line-not-from-zero': {
      title: 'Ein Zahlenstrahl, der nicht bei null beginnt',
      objective: 'Die Kinder lesen ab, auf welche Zahl ein Pfeil zeigt, wenn der Zahlenstrahl bei 40 oder bei 60 beginnt und nur einige Zahlen gedruckt sind.',
      note: {
        mistake: 'Die Kinder zählen die Striche vom linken Ende als 1, 2, 3, als würde der Strahl bei null beginnen. Oder sie starten bei einer gedruckten Zahl und zählen diesen Strich schon als ersten Sprung; dann liegen sie um 1 daneben.',
        words: 'Fragen Sie zuerst: „Wo beginnt dieser Zahlenstrahl? Wie viel ist ein Sprung wert?“ Sagen Sie: „Suche die nächste gedruckte Zahl. Zähle von dort weiter oder zurück.“ Zur Probe: „Liegt deine Zahl zwischen den beiden gedruckten Zahlen links und rechts?“',
        watch: 'Achten Sie auf Antworten wie 3 oder 7 an einem Strahl von 40 bis 60; dieses Kind hat die gedruckten Zahlen nicht beachtet. Lassen Sie sich von jedem Kind vor dem Schreiben die Startzahl und die Größe eines Sprungs nennen.',
      },
    },
    '2:hundreds-chart-moves': {
      title: 'Sprünge auf der Hundertertafel',
      objective: 'Die Kinder folgen Pfeilen auf der Hundertertafel, rechnen dabei Zehner und Einer dazu oder weg und schreiben die Zahl auf, bei der sie landen.',
      note: {
        mistake: 'Die Kinder verwechseln die Richtungen: Oben fühlt sich nach mehr an, also rechnen sie bei einem Pfeil nach oben 10 dazu. Bei mehreren Pfeilen machen sie einen Sprung, vergessen die erreichte Zahl und fangen wieder bei der Startzahl an.',
        words: 'Die Kinder sprechen jeden Sprung: „Nach unten sind es 10 mehr: 34, 44. Nach rechts ist es 1 mehr: 45.“ Fragen Sie: „Eine Zeile nach oben. Wird die Zahl größer oder kleiner? Prüfe an der Tafel.“ Nach jedem Pfeil schreiben die Kinder die Zahl auf.',
        watch: 'Wer muss auf die Tafel schauen, und wer springt schon im Kopf? Prüfen Sie zuerst die Pfeile nach oben; ein Kind, das dort dazurechnet, denkt „höher ist mehr“ wie beim Thermometer.',
      },
    },
    '2:add-sub-within-100-practice': {
      title: 'Plus und Minus bis 100',
      objective: 'Die Kinder addieren und subtrahieren zweistellige Zahlen, um Zahlenmauern zu füllen und in einem Rechenlabyrinth den richtigen Weg zu finden.',
      note: {
        mistake: 'Die Kinder rechnen Zehner und Einer getrennt und beachten den Zehnerübergang nicht: Aus 28 + 15 wird 313 oder 33. Im Labyrinth zieht sich ein falscher Schritt durch den ganzen Weg, und sie gehen nicht zurück, um ihn zu suchen.',
        words: 'Sagen Sie: „Rechne in Schritten. 28 + 15: erst plus 10, das sind 38. Dann plus 5: bis zur 40 sind es 2, dann noch 3, also 43.“ Fragen Sie: „Geht es über den Zehner?“ Im Labyrinth: „Schreibe nach jedem Schild die neue Zahl auf. Wenn das Ende nicht stimmt, prüfe jeden Schritt.“',
        watch: 'Lassen Sie die Kinder ihre Rechenschritte neben die Mauer schreiben. Sind die unteren Steine richtig und ein Stein weiter oben falsch, war es ein einzelner Rechenfehler, der nach oben gewandert ist; stimmt gar nichts, sieht das Kind vielleicht nicht, welche zwei Steine zusammengehören.',
      },
    },
    '2:measure-with-ruler': {
      title: 'Mit dem Lineal messen',
      objective: 'Die Kinder lesen am Lineal ab, wie lang ein Gegenstand ist, der bei 0 beginnt, und schreiben die Länge auf.',
      note: {
        mistake: 'Die Kinder zählen die Striche mit den Zahlen und nicht die Abstände, sagen also bei der Null schon „eins“ und lesen 1 zu viel ab. Mit einem echten Lineal legen sie den Gegenstand an die Kante des Lineals oder an die 1 an, nicht an die 0.',
        words: 'Sagen Sie: „Fang bei null an. Null heißt: noch keine Länge. Zähle die Abstände: eins, zwei, drei.“ Dann: „Das Ende des Stifts liegt bei der 6, er ist also 6 Einheiten lang.“ Mit dem echten Lineal: „Suche die 0. Sie ist nicht immer am Rand. Sag die Einheit dazu: 6 Zentimeter.“',
        watch: 'Teilen Sie echte Lineale aus und sehen Sie, wo die Kinder den Anfang des Gegenstands anlegen. Auf der Seite beginnt alles bei 0; das Lineal aus dem Mäppchen macht das nicht von selbst.',
      },
    },
    '2:compare-lengths': {
      title: 'Wie viel länger?',
      objective: 'Die Kinder messen zwei Gegenstände und finden heraus, um wie viele Einheiten der eine länger ist als der andere.',
      note: {
        mistake: 'Die Kinder schreiben die Länge des längeren Gegenstands als Antwort auf „wie viel länger“. Oder sie rechnen beide Längen zusammen, weil zwei Zahlen in einer Aufgabe bisher immer plus bedeutet haben.',
        words: 'Sagen Sie: „Das Band ist 9 Einheiten lang, die Schnur 6. Lege sie untereinander. Wo hört die Schnur auf? Das Stück, das übersteht, ist der UNTERSCHIED.“ Schreiben Sie: „9 − 6 = 3. Das Band ist 3 Einheiten länger.“',
        watch: 'Lassen Sie das Kind das überstehende Stück mit zwei Fingern auf der Seite zeigen. Wer es zeigen kann und die Minusaufgabe nicht findet, braucht die Frage: „Wie viele fehlen von 6 bis 9?“',
      },
    },
    '2:time-5-min-quarter': {
      title: 'Die Uhr auf fünf Minuten genau lesen',
      objective: 'Die Kinder lesen die Uhr auf fünf Minuten genau und zur Viertelstunde ab und wählen die passende Uhrzeit aus.',
      note: {
        mistake: 'Die Kinder lesen die Zahl, auf die der Minutenzeiger zeigt, als Minuten: Steht er auf der 4, sind es „4 Minuten“, und aus 2:20 Uhr wird 2:04 Uhr. Kurz vor der vollen Stunde nennen sie schon die nächste Stunde: 2:50 Uhr wird als 3:50 Uhr gelesen.',
        words: 'Zählen Sie in Fünferschritten um die Uhr und tippen Sie jede Zahl an: „5, 10, 15, 20.“ Sagen Sie: „Die 4 bedeutet 20 Minuten.“ Zur Stunde: „Ist der kurze Zeiger schon an der 3 vorbei? Nein, also ist es noch 2 Uhr.“ Nennen Sie beide Formen: „2:15 Uhr“ und „Viertel nach zwei“, „2:45 Uhr“ und „Viertel vor drei“. Am Nachmittag: „Viertel nach zwei ist auch 14:15 Uhr.“',
        watch: 'Prüfen Sie Uhrzeiten nach halb, etwa 2:50 Uhr, wenn der Stundenzeiger fast auf der nächsten Zahl steht. Lassen Sie das Kind einmal laut in Fünferschritten zählen; Sie hören, wo es falsch läuft. Wo man „viertel drei“ und „drei viertel drei“ sagt, klären Sie beide Sprechweisen an der Lernuhr.',
      },
    },
    '2:calendar': {
      title: 'Den Kalender lesen',
      objective: 'Die Kinder lesen im Monatskalender ab, auf welchen Wochentag ein Datum fällt, welches Datum eine Woche später ist und wie viele Tage zwischen zwei Daten liegen.',
      note: {
        mistake: 'Die Kinder suchen den Wochentag in der Zeile und schauen nicht nach oben zum Kopf der Spalte. Für „eine Woche später“ zählen sie sieben Kästchen einzeln ab und zählen dabei oft den Starttag als ersten Tag mit.',
        words: 'Sagen Sie: „Suche das Datum. Gehe in der Spalte gerade nach oben. Welcher Tag steht dort?“ Zur Woche später: „Eine Woche später ist das Kästchen direkt darunter. Derselbe Wochentag, 7 mehr.“ Beim Tagezählen: „Zähle den Tag, an dem du anfängst, nicht mit. Zähle die Sprünge.“',
        watch: 'Fragen Sie: „Welcher Wochentag ist der 17.?“ und folgen Sie dem Finger des Kindes: Er soll in der Spalte nach oben wandern. Prüfen Sie Antworten auf „Wie viele Tage sind es von … bis …?“, die um 1 zu groß sind.',
      },
    },
    '2:shopping-money': {
      title: 'Einkaufen: mit Preisen rechnen',
      objective: 'Die Kinder lesen Preise am Regal ab, rechnen die Preise der Dinge im Korb zusammen und lösen zwei Sachaufgaben mit diesen Preisen.',
      note: {
        mistake: 'Die Kinder rechnen Zahlen zusammen, ohne zu prüfen, von welchem Ding die Aufgabe spricht, oder sie nehmen den Preis des falschen Dings vom Regal. Liegen drei Dinge im Korb, addieren sie zwei Preise und vergessen den dritten.',
        words: 'Sagen Sie: „Suche zuerst jedes Ding im Regal und sage seinen Preis. Schreibe die Preise auf. Dann rechne.“ Fragen Sie: „Wie viel kostet das zusammen?“ Sprechen Sie Beträge mit der Einheit: „45 Cent“, „3 Euro“.',
        watch: 'Die Kinder unterstreichen, was gekauft wird, bevor sie zum Regal schauen. Prüfen Sie, ob beim Ergebnis Cent oder Euro steht; eine nackte Zahl ist nur eine halbe Antwort. Lassen Sie in jeder Gruppe ein Kind einen Betrag mit Rechengeld legen, denn auf den Seiten ist keine Münze zu sehen.',
      },
    },
    '2:bar-graphs': {
      title: 'Von der Strichliste zum Säulendiagramm',
      objective: 'Die Kinder lesen eine Strichliste, malen für jede Anzahl eine Säule an und beantworten mit einem Säulendiagramm Fragen, bei denen man zusammenrechnet oder vergleicht.',
      note: {
        mistake: 'Die Kinder lesen ein Fünferbündel der Strichliste als 4 oder 6 und malen die Säule falsch hoch an. Bei „wie viele mehr“ nennen sie die Zahl der höheren Säule; bei „wie viele zusammen“ lesen sie eine Säule ab und hören auf.',
        words: 'Sagen Sie: „Zähle bei der Strichliste zuerst die Fünferbündel, dann die einzelnen Striche. Schreibe die Zahl auf, dann male an.“ Bei den Fragen: „Welche zwei Säulen nennt die Frage? Lege auf jede einen Finger.“ Dann: „Wie viele MEHR fragt nach dem Unterschied: Rechne minus.“',
        watch: 'Lassen Sie die Kinder die beiden Zahlen aufschreiben, mit denen sie rechnen, bevor sie antworten. So sehen Sie, ob ein Fehler vom Ablesen kommt oder vom Rechnen.',
      },
    },
    '2:line-plots': {
      title: 'Ein X-Diagramm lesen',
      objective: 'Die Kinder zählen die X über jeder Zahl eines X-Diagramms und schreiben auf, wie viele es sind.',
      note: {
        mistake: 'Die Kinder verwechseln die zwei Arten von Zahlen: die Zahl unter einem Stapel (was gemessen wurde) und die Anzahl der X (wie oft). Auf die Frage „Wie viele sind 5 lang?“ antworten sie „5“.',
        words: 'Sagen Sie: „Die Zahlen an der Linie sagen, WAS gemessen wurde. Die X sagen, WIE OFT.“ Fragen Sie: „Wie viele Stifte waren 5 Einheiten lang? Zähle die X über der 5.“ Dann: „Welche Länge kam am häufigsten vor?“',
        watch: 'Stellen Sie je eine Frage in beide Richtungen: „Wie viele X stehen über der 7?“ und „Über welcher Zahl stehen 3 X?“ Wer beide beantwortet, versteht das Diagramm. Danach misst die Klasse sechs Stifte und setzt für jeden ein X; ein Diagramm aus eigenen Messungen zu machen ist die andere Hälfte dieser Stunde.',
      },
    },
    '2:scaled-pictograph': {
      title: 'Jedes Bild zählt doppelt',
      objective: 'Die Kinder lesen ein Bilddiagramm, in dem jedes Bild für 2 steht, und schreiben für jede Reihe die echte Anzahl auf.',
      note: {
        mistake: 'Die Kinder zählen die Bilder und schreiben diese Zahl auf, weil bisher ein Bild immer ein Ding war. Den Hinweis, wofür ein Bild steht, lesen sie nicht.',
        words: 'Sagen Sie: „Lies zuerst, wofür ein Bild steht. Jedes Bild steht für 2.“ Zählen Sie eine Reihe in Zweierschritten und tippen Sie jedes Bild an: „2, 4, 6, 8.“ Fragen Sie: „Eine Reihe zeigt 5 Bilder. Wie viele Dinge sind das? Woher weißt du das?“',
        watch: 'Sehen Sie auf die erste Reihe, die ein Kind ausfüllt: Steht dort die bloße Zahl der Bilder, wurde der Hinweis übersprungen. Das Zählen in Zweierschritten ist hier ein erster Schritt zum Malnehmen; sprechen Sie es aus („4 Zweier sind 8“).',
      },
    },
    '2:equal-groups-times': {
      title: 'Gleiche Gruppen: vom Plus zum Mal',
      objective: 'Die Kinder zählen gleich große Gruppen, schreiben die Plusaufgabe mit lauter gleichen Zahlen und ergänzen die Malaufgabe dazu.',
      note: {
        mistake: 'Die Kinder verwechseln die Anzahl der Gruppen mit der Anzahl in jeder Gruppe: 3 Gruppen mit je 4 werden als 3 + 4 geschrieben oder als 3 + 3 + 3 + 3. Oder sie zählen jedes Bild einzeln und beachten die Ringe um die Gruppen nicht.',
        words: 'Stellen Sie jedes Mal zwei Fragen: „Wie viele Gruppen? Wie viele in JEDER Gruppe?“ Sagen Sie: „3 Gruppen mit je 4. 4 + 4 + 4. Drei mal vier.“ Lesen Sie den Malpunkt am Anfang als „mal je“: „3 mal je 4 sind 12.“',
        watch: 'Prüfen Sie, ob die Plusaufgabe so viele Zahlen hat, wie es Gruppen gibt. Lassen Sie ein Kind „2 Gruppen mit je 5“ zeichnen und dann „5 Gruppen mit je 2“: dasselbe Ergebnis, zwei verschiedene Bilder.',
      },
    },
    '2:arrays': {
      title: 'Punktefelder: Reihen und Spalten',
      objective: 'Die Kinder zählen die Reihen und Spalten eines Punktefelds, ergänzen die Malaufgabe und wählen das Feld aus, das zu einer Malaufgabe passt.',
      note: {
        mistake: 'Die Kinder wissen nicht, wie eine Reihe verläuft und wie eine Spalte. Sie zählen alle Punkte einzeln, oder sie zählen an zwei Rändern entlang und wollen den Eckpunkt nicht ein zweites Mal zählen; dann wird ein Feld mit 3 mal 5 Punkten zu „3 Reihen und 4 Spalten“.',
        words: 'Sagen Sie: „Reihen gehen von links nach rechts, wie die Stuhlreihen im Kino. Spalten gehen von oben nach unten.“ Fragen Sie: „Wie viele Reihen? Wie viele in jeder Reihe?“ Dann: „3 Reihen mit je 5: 5 + 5 + 5. 5, 10, 15.“',
        watch: 'Lassen Sie ein Kind mit dem Finger eine Reihe entlang und eine Spalte hinunter fahren. Drehen Sie das Blatt quer und fragen Sie, ob sich die Anzahl geändert hat; sie ist gleich geblieben, und das sollte laut gesagt werden.',
      },
    },
    '3:mult-equal-groups': {
      title: 'Malaufgaben zu Gruppen und großen Punktefeldern',
      objective: 'Die Kinder lesen ein Bild mit gleich großen Gruppen oder ein Punktefeld, ergänzen die Malaufgabe und bestimmen das Ergebnis.',
      note: {
        mistake: 'Die Kinder zählen jedes Bild einzeln und nutzen die Gruppen nie. In der Malaufgabe schreiben sie das Ergebnis an eine Stelle, an die ein Faktor gehört.',
        words: 'Sagen Sie: „6 Gruppen mit je 4 sind 6 mal 4.“ Finden Sie das Ergebnis aus einer Aufgabe, die das Kind weiß: „5 mal 4 sind 20, eine Gruppe mehr sind 24.“ Die Aufgabe mit 5 ist die Kernaufgabe, 6 mal 4 ihre Nachbaraufgabe.',
        watch: 'Fragen Sie, wie das Kind das Ergebnis gefunden hat. Einzeln zählen gibt eine richtige Antwort und keinen Fortschritt; ein Kind, das „fünf davon und noch eine Gruppe“ sagt, baut sich das Einmaleins auf.',
      },
    },
    '3:mult-number-line': {
      title: 'Mal-Sprünge am Zahlenstrahl',
      objective: 'Die Kinder zeigen eine Malaufgabe als gleich große Sprünge von der Null aus und schreiben jede Zahl auf, auf der ein Sprung landet.',
      note: {
        mistake: 'Die Kinder schreiben unter jede Landestelle die Nummer des Sprungs (1, 2, 3) und nicht die Zahl, auf der er landet. Oder sie beginnen den ersten Sprung bei der 1, dann ist jede Landung um 1 zu groß.',
        words: 'Sagen Sie: „Jeder Sprung ist gleich groß. Start ist die Null. Vierersprünge landen auf 4, 8, 12.“ Fragen Sie: „Wie viele Sprünge? Wie groß ist jeder? Wo bist du nach 5 Vierersprüngen?“ Nennen Sie die Landezahlen „die Viererreihe“.',
        watch: 'Prüfen Sie, ob die erste Landung so groß ist wie ein Sprung. Fragen Sie nach „3 Fünfersprüngen“ und „5 Dreiersprüngen“ und lassen Sie die Kinder sehen, dass beide an derselben Stelle enden.',
      },
    },
    '3:commutative': {
      title: 'Tauschaufgaben beim Malnehmen',
      objective: 'Die Kinder sehen, dass ein gedrehtes Punktefeld dieselbe Anzahl zeigt, und schreiben beide Malaufgaben dazu auf.',
      note: {
        mistake: 'Die Kinder zählen beide Felder von vorn als zwei getrennte Aufgaben und merken nicht, dass die Ergebnisse gleich sind. Manche glauben, 3 · 7 und 7 · 3 seien zwei verschiedene Aufgaben, die man beide lernen muss.',
        words: 'Drehen Sie ein Punktefeld aus Papier um eine Vierteldrehung und fragen Sie: „Habe ich Punkte dazugelegt? Habe ich welche weggenommen? Wie viele sind es also jetzt?“ Sagen Sie: „3 Reihen mit je 7 und 7 Reihen mit je 3 sind gleich viele. Wer die eine Aufgabe weiß, weiß auch ihre Tauschaufgabe.“',
        watch: 'Fragen Sie „Wie viel ist 7 · 3?“, gleich nachdem ein Kind 3 · 7 gerechnet hat. Wer wieder zu zählen beginnt, hat die Drehung noch nicht verstanden; drehen Sie das Feld noch einmal.',
      },
    },
    '2:skip-count-3-4': {
      title: 'In Dreier- und Viererschritten zählen',
      objective: 'Die Kinder zählen in 3er- und 4er-Schritten und schreiben die fehlenden Zahlen in jede Zahlenreihe.',
      note: {
        mistake: 'Beim Zählen in Dreier- und Viererschritten gibt es kein einfaches Muster an der Einerstelle, deshalb rechnen die Kinder mit den Fingern weiter und landen um 1 daneben. Ein Fehler zieht sich durch den Rest der Reihe.',
        words: 'Zählen Sie gemeinsam im Flüsterton: „1, 2“ flüstern, „3“ laut; „4, 5“ flüstern, „6“ laut. Fragen Sie: „Wie weit ist es von einer Zahl zur nächsten? Prüfe den Sprung.“ Verbinden Sie die Vierer mit den Zweiern: „Die Viererreihe ist jede zweite Zahl der Zweierreihe.“',
        watch: 'Die Kinder prüfen jede Reihe an der Größe ihrer Sprünge, bevor sie abgeben. Ein Kind, das jedes Mal mit den Fingern weiterrechnet, braucht viele kurze Runden, in denen die Reihe laut gesprochen wird, nicht noch mehr Seiten.',
      },
    },
    '3:times-tables': {
      title: 'Das 2er- und das 5er-Einmaleins',
      objective: 'Die Kinder schreiben die Ergebnisse der Zweierreihe und der Fünferreihe auf und üben gemischte Einmaleinsaufgaben.',
      note: {
        mistake: 'Die Kinder zählen für jede Aufgabe die Reihe von vorn auf und verlieren um die sechste oder siebte Zahl den Faden. Sie verwechseln Nachbarn: 6 · 5 wird mit 35 beantwortet.',
        words: 'Gehen Sie von einer Aufgabe aus, die das Kind weiß: „Du weißt, 5 · 5 ist 25. Dann ist 6 · 5 ein Fünfer mehr: 30.“ Für die Zweierreihe hilft das Verdoppeln, für die Fünferreihe die Hälfte der Zehneraufgabe: „8 · 10 ist 80, also ist 8 · 5 die Hälfte davon, 40.“ Kernaufgaben sind 1 mal, 2 mal, 5 mal und 10 mal.',
        watch: 'Hören Sie, wie ein Kind zu einem Ergebnis kommt: auswendig, über eine Nachbaraufgabe oder durch Aufsagen von vorn. Üben Sie jeden Tag wenige Aufgaben; eine Seite, die mit Aufsagen der Reihe gefüllt wurde, hat nichts ins Gedächtnis gebracht.',
      },
    },
    '2:share-and-group': {
      title: 'Verteilen und Aufteilen',
      objective: 'Die Kinder verteilen eine Menge gerecht auf Kisten und schreiben auf, wie viele jede bekommt, und sie zählen, wie viele gleich große Gruppen eine Menge ergibt.',
      note: {
        mistake: 'Die Kinder legen in jede Kiste ein paar und hören auf, obwohl noch etwas im Haufen liegt, oder die Kisten sind am Ende ungleich voll. Sie verwechseln die zwei Fragen: Wie viele in jeder Kiste, und wie viele Gruppen?',
        words: 'Sagen Sie: „Eins in jede Kiste, dann noch eins in jede, bis der Haufen leer ist. Ist in allen Kisten gleich viel?“ Stellen Sie die zwei Fragen getrennt: „Wie viele bekommt jede Kiste?“ (Verteilen) und „Wie viele gleich große Gruppen werden es?“ (Aufteilen).',
        watch: 'Nehmen Sie vor der Seite Plättchen und Becher. Prüfen Sie, dass nichts im Haufen bleibt und in jeder Kiste gleich viel liegt. Hören Sie darauf, welche der beiden Fragen ein Kind gerade beantwortet.',
      },
    },
    '3:division-sharing': {
      title: 'Geteilt-Aufgaben: gerecht verteilen',
      objective: 'Die Kinder verteilen eine Menge gerecht auf eine gegebene Zahl von Kisten und schreiben auf, wie viele in jede Kiste kommen.',
      note: {
        mistake: 'Die Kinder schreiben die Zahl der Kisten oder die Größe des Haufens als Antwort. Ohne Plättchen raten sie, wie viele in jede Kiste kommen, und prüfen nicht, ob die Kisten den Haufen aufbrauchen.',
        words: 'Sagen Sie: „12 verteilt an 3 ist eine Geteilt-Aufgabe: 12 : 3.“ Dann verteilen: „Eins für jede, noch eins, noch eins, bis nichts mehr da ist. Jede bekommt 4.“ Prüfen Sie mit der Malaufgabe: „3 Kisten mit je 4 sind 12.“ Lesen Sie das Zeichen als „geteilt durch“.',
        watch: 'Jedes Kind prüft ein Ergebnis mit der Malaufgabe. Wer sieht, dass 3 · 4 = 12 die Aufgabe 12 : 3 beantwortet, hat die Umkehraufgabe gefunden, die das Teilen leicht macht.',
      },
    },
    '3:division-repeated-subtraction': {
      title: 'Wie oft passt die Zahl hinein? Sprünge bis zur Null',
      objective: 'Die Kinder finden heraus, wie viele gleich große Sprünge es am Zahlenstrahl von einer Zahl zurück bis zur Null sind.',
      note: {
        mistake: 'Die Kinder schreiben die Größe des Sprungs als Antwort, oder sie zählen jeden Strich mit, den sie berühren, auch die Startzahl; das ergibt 1 zu viel. Sie erkennen nicht, dass auch das eine Geteilt-Aufgabe ist.',
        words: 'Sagen Sie: „Start bei 15. Jedes Mal 3 zurück: 12, 9, 6, 3, 0. Wie viele Sprünge? Fünf.“ Schreiben Sie: „15 : 3 = 5. Die 3 passt fünfmal in die 15.“ Fragen Sie: „Wie oft passt die 3 in die 15?“',
        watch: 'Die Kinder zählen die Sprünge mit dem Finger auf jedem Bogen, nicht auf den Strichen. Stellen Sie einmal beide Bedeutungen nebeneinander: 15 an 3 Kinder verteilen und 15 in Dreiergruppen aufteilen.',
      },
    },
    '2:odd-even': {
      title: 'Gerade und ungerade: zwei gleiche Teile',
      objective: 'Die Kinder kreisen Punkte paarweise ein, schreiben eine Zahl als zwei gleiche Teile mit 0 oder 1 Rest und entscheiden an der Einerstelle, ob eine Zahl bis 100 gerade oder ungerade ist.',
      note: {
        mistake: 'Die Kinder schauen auf die falsche Ziffer: 34 nennen sie ungerade wegen der 3. Sie verbinden „gerade“ nicht mit „zwei gleiche Teile“, deshalb ist die Regel mit der Einerstelle für sie ein Trick ohne Grund.',
        words: 'Sagen Sie: „Gerade heißt: zwei gleiche Teile, und nichts bleibt übrig. 8 ist 4 + 4. Ungerade heißt: Eins bleibt übrig. 9 ist 4 + 4 + 1.“ Bei großen Zahlen: „Schau nur auf die Einer. Die Zehner lassen sich immer teilen.“ Fragen Sie: „Ist 30 gerade? Warum?“',
        watch: 'Prüfen Sie mit 34, 43, 50 und 71. Ein Kind, das auf die Zehnerziffer schaut, soll sehen, dass jeder Zehner in 5 und 5 zerfällt; also entscheiden allein die Einer.',
      },
    },
    '2:equal-shares-shapes': {
      title: 'Halbe, Drittel und Viertel',
      objective: 'Die Kinder unterscheiden gleich große von ungleich großen Teilen und malen die Hälfte, ein Drittel oder ein Viertel einer Form an.',
      note: {
        mistake: 'Die Kinder nennen jede Form, die in zwei Stücke geteilt ist, „halbiert“, auch wenn ein Stück größer ist. Sie meinen, gleiche Teile müssten gleich aussehen; ein Quadrat, das von Ecke zu Ecke geteilt ist, und eines, das gerade durchgeteilt ist, können dann nicht beide Hälften zeigen.',
        words: 'Fragen Sie: „Sind die Teile GLEICH groß? Wäre es gerecht, so zu teilen?“ Sagen Sie: „Zwei gleiche Teile sind Hälften. Drei gleiche Teile sind Drittel. Vier gleiche Teile sind Viertel.“ Schneiden Sie die Teile aus und legen Sie sie aufeinander, wenn nötig gedreht. Prüfen Sie nicht durch Falten: Ein Rechteck, das von Ecke zu Ecke geteilt ist, hat zwei gleiche Hälften, die sich nicht aufeinanderfalten lassen.',
        watch: 'Sehen Sie, was die Kinder mit Formen tun, die in ungleiche Teile geteilt sind. Ein Kind, das eines von zwei ungleichen Stücken anmalt und es eine Hälfte nennt, zählt Stücke und vergleicht keine Größen.',
      },
    },
    '2:fraction-of-a-set': {
      title: 'Die Hälfte, ein Drittel, ein Viertel einer Menge',
      objective: 'Die Kinder kreisen die Hälfte, ein Drittel oder ein Viertel einer Menge von Bildern ein und schreiben auf, wie viele das sind.',
      note: {
        mistake: 'Die Kinder kreisen für die Hälfte 2 Bilder ein, für ein Drittel 3 und für ein Viertel 4: Sie halten die Zahl im Wort für die Anzahl, die einzukreisen ist.',
        words: 'Sagen Sie: „Ein Drittel heißt: Mache 3 gleich große Gruppen und nimm EINE davon.“ Fragen Sie: „Wie viele Gruppen hast du gemacht? Sind sie gleich groß? Wie viele sind in einer Gruppe?“ Schreiben Sie: „Ein Drittel von 12 sind 4.“',
        watch: 'Achten Sie auf Antworten, die genauso groß sind wie die Zahl im Bruchwort. Dieses Kind verteilt die Bilder erst in Becher und hebt dann einen Becher hoch. Die Schreibweise mit Zähler und Nenner kommt später: Bleiben Sie bei den Wörtern „die Hälfte“, „ein Drittel“, „ein Viertel“.',
      },
    },
    '2:2d-attributes': {
      title: 'Formen nach Seiten sortieren',
      objective: 'Die Kinder zählen die Seiten ebener Formen und verbinden jede Form mit der Zahl ihrer Seiten.',
      note: {
        mistake: 'Die Kinder erkennen die regelmäßigen Formen auf einen Blick und stolpern über eine unregelmäßige: Ein Fünfeck, das nicht ordentlich aussieht, ist für sie „keine Form“. Bei einer Form mit Einbuchtung lassen sie eine Seite in der Einbuchtung aus.',
        words: 'Sagen Sie: „Eine Form heißt nach der Zahl ihrer Ecken und Seiten, nicht danach, wie sie aussieht.“ Nennen Sie sie: „3 Seiten: Dreieck. 4 Seiten: Viereck. 5: Fünfeck. 6: Sechseck.“ Die Kinder markieren jede Seite, während sie zählen.',
        watch: 'Prüfen Sie die Formen mit einer Einbuchtung oder mit einer sehr kurzen Seite; dort wird falsch gezählt. Fragen Sie nach dem Namen einer schiefen Form mit vier Seiten und hören Sie, ob „Viereck“ kommt.',
      },
    },
    '2:solids-in-real-life': {
      title: 'Körper um uns herum',
      objective: 'Die Kinder verbinden Kugel, Würfel, Zylinder, Kegel, Quader und Pyramide mit einem Gegenstand, der dieselbe Form hat.',
      note: {
        mistake: 'Die Kinder ordnen nach Größe oder Farbe zu oder nach einem einzigen Merkmal: Alles Spitze ist ein Kegel, also werden Pyramide und Kegel verwechselt. Eine liegende Dose erkennen sie nicht als Zylinder. Manche nennen einen Ball noch „Kreis“ und eine Schachtel „Viereck“: Der Körper bekommt den Namen seiner ebenen Fläche.',
        words: 'Nennen Sie jeden Körper mit einem Ding: „Eine Dose ist ein Zylinder. Ein Ball ist eine Kugel. Eine Eistüte ist ein Kegel. Ein Schuhkarton ist ein Quader.“ Fragen Sie, was zwei unterscheidet: „Der Kegel steht auf einem Kreis und ist an der Seite rund. Die Pyramide steht auf einer Fläche mit Ecken, und ihre anderen Flächen sind Dreiecke.“',
        watch: 'Gehen Sie im Klassenzimmer auf Körpersuche und lassen Sie die Kinder jeden Namen laut sagen. Prüfen Sie Kegel und Pyramide und auch Würfel und Quader; das sind die Paare, die Kinder verwechseln.',
      },
    },
    '2:3d-faces-edges-vertices': {
      title: 'Flächen, Kanten und Ecken zählen',
      objective: 'Die Kinder zählen die ebenen Flächen, die Kanten und die Ecken von Körpern und schreiben die Zahlen auf.',
      note: {
        mistake: 'Die Kinder zählen nur, was sie auf der Zeichnung sehen: drei Flächen eines Würfels. Wenn sie um einen Körper herumgehen, verlieren sie den Überblick und zählen eine Kante doppelt, und sie sagen „Seite“ für eine Fläche und für eine Kante.',
        words: 'Nehmen Sie drei Wörter und halten Sie sie auseinander: „Eine Fläche ist eben und man kann die Hand darauflegen. Eine Kante ist dort, wo zwei Flächen zusammenstoßen. Eine Ecke ist dort, wo Kanten zusammenkommen.“ An einer echten Schachtel: „Lege die Hand auf eine Fläche. Fahre mit dem Finger eine Kante entlang. Tippe auf eine Ecke.“ Bei Dose und Kegel: „Ist dieser Teil eben oder gewölbt? Nur die ebenen Teile zählen wir hier.“',
        watch: 'Geben Sie jedem Paar einen echten Körper und Klebepunkte, um Gezähltes zu markieren. Fragen Sie nach den verdeckten Teilen einer Zeichnung: „Und hinten? Und unten?“',
      },
    },
    '2:symmetry-line': {
      title: 'Ist das eine Spiegelachse?',
      objective: 'Die Kinder entscheiden, ob eine gestrichelte Linie ein Bild in zwei spiegelgleiche Hälften teilt, und wählen das Bild aus, das auf beiden Seiten gleich aussieht.',
      note: {
        mistake: 'Die Kinder halten jede Linie, die eine Form in zwei gleich große Teile schneidet, für eine Spiegelachse. Die schräge Linie durch ein Rechteck ergibt zwei gleiche Hälften, die sich nicht aufeinanderfalten lassen, und die Kinder kreisen den Haken ein.',
        words: 'Sagen Sie: „Eine Spiegelachse ist eine Faltlinie. Falte an ihr: Liegen die beiden Seiten genau aufeinander?“ Schneiden Sie ein langes Rechteck aus Papier aus (kein Quadrat) und falten Sie es von Ecke zu Ecke: eine Linie, die es in zwei gleiche Teile schneidet und trotzdem keine Spiegelachse ist.',
        watch: 'Machen Sie bei den ersten Aufgaben die Faltprobe mit Papier. Hören Sie, was die Kinder bei schrägen Linien antworten; dort trennen sich gleich große Hälften und Spiegelhälften. Falten Sie auch ein Quadrat von Ecke zu Ecke, damit nicht die Regel entsteht: „Schräge Linien sind nie Spiegelachsen.“',
      },
    },
    '2:symmetry-complete': {
      title: 'Die andere Hälfte ergänzen',
      objective: 'Die Kinder ergänzen ein halb fertiges Bild so, dass beide Seiten der Spiegelachse wie im Spiegel zusammenpassen.',
      note: {
        mistake: 'Auf der Kästchenseite übertragen die Kinder die Hälfte so, wie sie ist, und verschieben sie über die Achse, statt sie zu spiegeln: Ein Kästchen, das zwei Felder von der Achse entfernt ist, wird zwei Felder vom äußeren Rand angemalt. Auf der Seite zum Nachspuren ist die andere Hälfte schon da; die Kinder spuren nach, ohne zu merken, dass jedes Teil einen Partner auf der anderen Seite hat.',
        words: 'Sagen Sie: „Zähle die Kästchen VON DER ACHSE WEG. Zwei Kästchen entfernt auf dieser Seite, zwei Kästchen entfernt auf der anderen.“ Arbeiten Sie Zeile für Zeile. Prüfen Sie mit einem kleinen Spiegel auf der Achse: „Zeigt der Spiegel, was du angemalt hast?“',
        watch: 'Sehen Sie auf die Kästchen, die am weitesten von der Achse entfernt sind; bei einer verschobenen Kopie liegen sie direkt an der Achse. Geben Sie einem Kind, dessen Bild verschoben aussieht, einen Spiegel und lassen Sie es den Unterschied selbst finden. Beim Nachspuren zeigt das Kind auf ein Teil und dann auf seinen Partner auf der anderen Seite.',
      },
    },
    '2:tangram-orientation': {
      title: 'Tangram: Welche Figur passt zum Schattenbild?',
      objective: 'Die Kinder vergleichen Tangram-Figuren mit einem Schattenbild und wählen die Figur aus, die genau so liegt: nicht gedreht und nicht gespiegelt.',
      note: {
        mistake: 'Die Kinder nehmen die erste Figur, die aus denselben Teilen besteht. Eine gedrehte oder gespiegelte Figur ist für sie „dieselbe“, denn bisher war eine gedrehte Form immer noch dieselbe Form.',
        words: 'Sagen Sie: „Eine Form, die gedreht oder gespiegelt ist, bleibt dieselbe Form. Dieses Rätsel verlangt mehr: Die Figur muss genauso LIEGEN wie das Schattenbild.“ Fragen Sie: „Wohin zeigt die Spitze im Schattenbild? Nach links oder rechts? Nach oben oder unten?“ Die Kinder fahren den Umriss des Schattenbilds mit dem Finger nach und dann den Umriss jeder Auswahl.',
        watch: 'Fragen Sie ein Kind, was an einer Figur anders ist, die es nicht gewählt hat: „Sie ist gespiegelt“ oder „Sie ist gedreht.“ Den Unterschied zu benennen ist das Können; der Treffer allein kann Glück sein.',
      },
    },
  },
};
