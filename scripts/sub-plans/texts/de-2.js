'use strict';
/**
 * Guest teacher scripts, language de, teaching points of grade 2 (Daily Teaching System, Part 5). One script
 * per teaching point: what to SAY, how to START together, what to do when a child is STUCK; `byType` for one
 * worksheet type. Written from the pictures of the worksheets. Merged by scripts/sub-plans/apply-texts.js.
 */
module.exports = {
  loc: 'de',
  points: {
    '2:hundreds-chart-moves': {
      say: '„Das ist ein Sprungrätsel auf der Hundertertafel. Jeder Pfeil verändert die Zahl: nach oben 10 weniger, nach unten 10 mehr, nach links 1 weniger, nach rechts 1 mehr. Folgt den drei Pfeilen und schreibt auf, wo ihr landet.“',
      first: 'Lesen Sie die Pfeilregeln oben auf dem Blatt gemeinsam. Lösen Sie das erste Rätsel an der Tafel, Pfeil für Pfeil, und schreiben Sie nach jedem Pfeil die Zahl auf: „30, eins weniger ist 29, zehn mehr ist 39, eins weniger ist 38.“',
      stuck: 'Das Kind schreibt über jeden Pfeil die neue Zahl, bevor es zum nächsten geht. Hängt eine Hundertertafel im Raum, legt es den Finger auf die Startzahl und geht für jeden Pfeil ein Feld weiter. Zur Kontrolle auf dem Blatt für alle: 38, 77, 21, 74, 25, 97, 31, 90.',
    },
    '2:skip-count-5-10-100': {
      say: '„Auf diesem Blatt versteckt sich ein Tier. Ihr verbindet die Punkte in Zehnerschritten: von der 10 zur 20, dann zur 30 und immer so weiter bis zur 100. Los geht es am orangen Punkt.“',
      first: 'Zählen Sie mit der Klasse laut in Zehnerschritten von 10 bis 100. Suchen Sie gemeinsam den orangen Punkt bei der 10 und ziehen Sie den ersten Strich zur 20. Die Zahlenreihe unten auf dem Blatt zeigt die Reihenfolge.',
      stuck: 'Das Kind nennt die Zahl, bei der es gerade ist, und rechnet zehn dazu: Diesen Punkt sucht es. Es kann die Zahlen in der Reihe unten nacheinander abhaken.',
      byType: {
        'G2-392': {
          say: '„Der Heißluftballon möchte zum Regenbogen. Er fliegt von Wolke zu Wolke, aber nur in Fünferschritten: 5, 10, 15 und immer so weiter bis 100. Zeichnet seinen Weg ein.“',
          first: 'Zählen Sie mit der Klasse laut in Fünferschritten bis 100. Suchen Sie gemeinsam den Ballon und die Wolke mit der 5 und ziehen Sie den Strich zur 10. Sagen Sie den Kindern: Manche Zahlen stehen mehrmals auf dem Blatt; richtig ist nur die Wolke, die am Weg liegt.',
          stuck: 'Das Kind nennt die Zahl, bei der es gerade ist, rechnet fünf dazu und schaut nur die Wolken an, die von dort aus erreichbar sind. Endet der Weg, geht es zur letzten Wolke zurück und sucht dieselbe Zahl an einer anderen Stelle.',
        },
      },
    },
    '2:add-sub-within-100-practice': {
      say: '„Das sind Zahlenmauern mit vier Reihen. Die Regel kennt ihr: Zwei Steine nebeneinander ergeben zusammen den Stein darüber. Die Zahlen werden größer als 20, deshalb dürft ihr auf einem Zettel nebenher rechnen.“',
      first: 'Zeichnen Sie die erste Mauer an die Tafel. Rechnen Sie die zweite Reihe gemeinsam aus und lassen Sie die Kinder dann allein weiterbauen. Erinnern Sie daran, bei den größeren Zahlen erst die Zehner und dann die Einer zu rechnen.',
      stuck: 'Legen Sie zwei Finger auf die beiden Steine unter dem leeren Stein; das Kind rechnet diese beiden auf einem Schmierzettel zusammen. Ein Fehler unten macht alle Steine darüber falsch, deshalb von unten nach oben prüfen. Zur Kontrolle auf dem Blatt für alle: Die Decksteine sind 60, 70, 46 und 49; direkt darunter stehen 31 und 29, 34 und 36, 24 und 22, 24 und 25.',
    },
    '2:shopping-money': {
      say: '„Oben seht ihr ein Regal mit fünf Spielsachen und ihren Preisen. Jede Aufgabe zeigt, was ein Kind kauft. Sucht die Preise im Regal, rechnet sie zusammen und schreibt den Gesamtpreis auf.“',
      first: 'Lesen Sie die fünf Preise im Regal gemeinsam. Lösen Sie die erste Aufgabe zusammen: Die beiden Spielsachen im Regal suchen, ihre Preise in das Rechenfeld schreiben, zusammenrechnen und das Ergebnis vor „ct“ in das Kästchen schreiben.',
      stuck: 'Das Kind kreist die beiden Spielsachen im Regal ein, schreibt die zwei Preise als Plusaufgabe auf und rechnet erst die Zehner, dann die Einer. Gemalte Münzen zu 10 ct und 5 ct helfen. Zur Kontrolle auf dem Blatt für alle: Luftballon und Dino 20 ct + 40 ct = 60 ct; Auto und Stifte 45 ct + 25 ct = 70 ct; Lastwagen und Auto 15 ct + 45 ct = 60 ct.',
      byType: {
        'G2-292': {
          say: '„Oben seht ihr ein Regal mit fünf Früchten und ihren Preisen. Jede Aufgabe zeigt drei Früchte, die ein Kind kauft. Sucht die drei Preise im Regal, rechnet sie zusammen und schreibt den Gesamtpreis auf.“',
          first: 'Lesen Sie die fünf Preise im Regal gemeinsam. Lösen Sie die erste Aufgabe zusammen: die drei Früchte im Regal suchen und ihre Preise in das Rechenfeld schreiben. Rechnen Sie erst zwei Preise zusammen, dann den dritten dazu, und schreiben Sie das Ergebnis vor „ct“ in das Kästchen.',
          stuck: 'Das Kind kreist die drei Früchte im Regal ein und schreibt die drei Preise als Plusaufgabe auf. Es hilft, mit zwei Preisen zu beginnen, die eine glatte Zahl ergeben, zum Beispiel 40 und 10. Zur Kontrolle auf dem Blatt für alle: Avocado, Zitrone und Kirsche 10 ct + 40 ct + 45 ct = 95 ct; Kirsche, Avocado und Limette 45 ct + 10 ct + 20 ct = 75 ct; Kiwi, Avocado und Zitrone 30 ct + 10 ct + 40 ct = 80 ct.',
        },
      },
    },
    '2:equal-groups-times': {
      say: '„In jedem Ring liegen gleich viele Formen. Zählt, wie viele in einem Ring sind. Dann rechnet ihr die Plusaufgabe darunter aus: immer wieder dieselbe Zahl.“',
      first: 'Zeichnen Sie die erste Aufgabe an die Tafel. Fragen Sie: „Wie viele Ringe? Wie viele in jedem Ring?“ Lesen Sie die Plusaufgabe vor und rechnen Sie in Schritten: 4, 8, 12, 16. Kennt die Klasse schon Malaufgaben, sagen Sie es auch so: „4 Ringe mit je 4, das sind 4 mal 4.“ Sonst bleiben Sie bei der Plusaufgabe.',
      stuck: 'Das Kind tippt jeden Ring an und zählt in Schritten weiter. Alle Formen einzeln zu zählen ist als Kontrolle erlaubt. Zur Kontrolle auf dem Blatt für alle: 16, 12, 9, 6.',
    },
    '2:share-and-group': {
      say: '„Gerecht teilen heißt: Jede Kiste bekommt gleich viel. Verteilt die Dinge auf die Kisten, eins nach dem anderen. Dann schreibt ihr hinter die Geteiltaufgabe, wie viele in einer Kiste sind.“',
      first: 'Lösen Sie die erste Aufgabe an der Tafel: Zählen Sie die Dinge (10) und die Kisten (2). Verteilen Sie zeichnend: ein Ding durchstreichen und einen Punkt in die erste Kiste malen, dann in die zweite, und so reihum, bis alles verteilt ist. Zählen Sie die Punkte in einer Kiste und schreiben Sie das Ergebnis hinter „10 : 2 =“.',
      stuck: 'Das Kind streicht jedes Ding durch, sobald sein Punkt gemalt ist, und gibt jeder Kiste einen Punkt, bevor eine Kiste den nächsten bekommt. Am Ende müssen in allen Kisten gleich viele Punkte sein. Zur Kontrolle auf dem Blatt für alle: 5, 5, 4, 2.',
    },
    '2:time-5-min-quarter': {
      say: '„Alle Uhren auf diesem Blatt zeigen eine Viertelstunde: Der große Zeiger steht auf der 3 oder auf der 9. Lest jede Uhr ab und kreist die passende Uhrzeit ein.“',
      first: 'Zeichnen Sie eine Uhr an die Tafel. Zeigen Sie, wo der große Zeiger steht: auf der 3 für 15 Minuten (Viertel nach), auf der 9 für 45 Minuten (Viertel vor). Lesen Sie die erste Uhr gemeinsam ab: erst der kleine Zeiger für die Stunde, dann der große für die Minuten.',
      stuck: 'Fragen Sie: „An welcher Zahl ist der kleine Zeiger gerade vorbei?“ Das ist die Stunde, auch wenn er schon fast bei der nächsten Zahl steht. Zur Kontrolle auf dem Blatt für alle: 11:15, 1:45, 2:45 und 8:45. Je nach Gegend sagen die Kinder „Viertel nach elf“ oder „viertel zwölf“, „Viertel vor zwei“ oder „drei viertel zwei“; beides ist richtig.',
    },
    '2:symmetry-complete': {
      say: '„Jedes Bild auf diesem Blatt ist nur halb fertig. Die gestrichelte Linie ist die Spiegelachse. Malt auf der leeren Seite die Kästchen so an, dass beide Seiten genau gleich aussehen, wie im Spiegel.“',
      first: 'Machen Sie die erste Reihe des ersten Bildes gemeinsam: Zählen Sie von der Spiegelachse aus, wie viele Kästchen in dieser Reihe angemalt sind, und malen Sie auf der anderen Seite genauso viele an, wieder von der Achse aus. Die Kinder arbeiten Reihe für Reihe von oben nach unten.',
      stuck: 'Das Kind legt den Finger in einer Reihe auf die Spiegelachse und zählt die bunten Kästchen von der Achse weg, dann dieselbe Anzahl auf der anderen Seite. Ein Kästchen direkt an der Achse hat sein Partnerkästchen direkt an der Achse.',
    },
    '2:sentence-boundaries': {
      say: '„In diesen Sätzen ist alles kleingeschrieben, und das Satzzeichen fehlt. Schreibt jeden Satz richtig auf die Linien. Denkt an drei Dinge: Der Satzanfang ist groß. Namen und Nomen sind groß. Am Ende steht ein Punkt.“',
      first: 'Schreiben Sie den ersten Satz so an die Tafel, wie er gedruckt ist. Fragen Sie: „Was stimmt hier nicht?“ Verbessern Sie gemeinsam: den Satzanfang, den Namen, das Nomen (Probe mit der, die, das) und den Punkt am Ende. Die Kinder schreiben den richtigen Satz auf die Linien.',
      stuck: 'Das Kind legt den Finger auf das erste Wort, dann auf jeden Namen und auf jedes Wort, vor das man der, die oder das setzen kann, und zum Schluss auf das Satzende. Zur Kontrolle auf dem Blatt für alle: Lina sucht die Segelboote. Die Jeeps sind bunt. Ben und ich mögen die Fahrräder. Ben sieht zwei Kanus. Meine U-Bahnen sind ganz neu.',
      byType: {
        'G2-282': {
          say: '„In diesen Sätzen ist alles kleingeschrieben, und das Satzzeichen fehlt. Manche Sätze sind Fragen. Schreibt jeden Satz richtig auf die Linien: Satzanfang groß, Namen und Nomen groß, und am Ende ein Punkt oder ein Fragezeichen.“',
          first: 'Schreiben Sie den ersten Satz so an die Tafel, wie er gedruckt ist: „siehst du die clementinen“. Verbessern Sie gemeinsam den Satzanfang und das Nomen. Fragen Sie dann: „Wird hier etwas erzählt oder etwas gefragt?“ Es ist eine Frage, also steht am Ende ein Fragezeichen.',
          stuck: 'Das Kind liest den Satz laut und hört auf die Stimme: Bei einer Frage geht sie am Ende nach oben, und der Satz beginnt mit einem Fragewort oder mit dem Verb. Zur Kontrolle auf dem Blatt für alle: Siehst du die Clementinen? Wo sind die Limetten? Paul und ich mögen die Nektarinen. Paul sucht die Kiwis. Hat Finn die Granatäpfel gesehen?',
        },
        'G2-274': {
          stuck: 'Das Kind legt den Finger auf das erste Wort, dann auf jeden Namen und auf jedes Wort, vor das man der, die oder das setzen kann, und zum Schluss auf das Satzende. Zur Kontrolle auf dem Blatt für alle: Lina sucht die Segelboote. Die Jeeps sind bunt. Ben und ich mögen die Fahrräder. Ben sieht zwei Kanus. Meine U-Bahnen sind ganz neu. Bei „U-Bahnen“ werden das U und das B großgeschrieben.',
        },
      },
    },
    '2:word-classes': {
      say: '„Nomen sind Namen für Menschen, Tiere und Dinge. Verben sagen, was jemand tut. Adjektive sagen, wie etwas ist. Lest die neun Wörter und schreibt jedes in die richtige Spalte.“',
      first: 'Lesen Sie die neun Wörter gemeinsam. Fragen Sie, wie die Klasse die drei Wortarten nennt; manche Klassen sagen Namenwort, Tunwort und Wiewort statt Nomen, Verb und Adjektiv. Sortieren Sie je ein Wort an der Tafel und zeigen Sie die Proben: der, die oder das davor für Nomen; „ich …, du …“ für Verben; „Wie ist es?“ für Adjektive. Die Nomen auf diesem Blatt haben ein kleines Bild und sind großgeschrieben.',
      stuck: 'Lesen Sie dem Kind das Wort vor und lassen Sie es die drei Proben laut ausprobieren. Zur Kontrolle auf dem Blatt für alle: Nomen sind Fledermaus, Möwe und Delfin; Verben sind spielen, laufen und lesen; Adjektive sind langsam, nass und lila.',
    },
    '2:compound-words': {
      say: '„Ein zusammengesetztes Nomen besteht aus zwei Wörtern, so wie Haus und Tür in Haustür. Hier ist jedes Wort Buchstabe für Buchstabe gedruckt. Malt einen Strich an die Stelle, an der das zweite Wort beginnt.“',
      first: 'Schreiben Sie „Goldfisch“ mit Abständen zwischen den Buchstaben an die Tafel. Fragen Sie: „Welche zwei Wörter hört ihr?“ Ziehen Sie den Strich zwischen Gold und Fisch und lassen Sie beide Wörter sprechen.',
      stuck: 'Das Kind spricht das ganze Wort und klatscht einmal für jedes der beiden Wörter. Dann deckt es das Wortende mit dem Finger ab und schiebt ihn, bis vorne ein richtiges Wort steht. Zur Kontrolle auf dem Blatt für alle: Gold-fisch, Hand-schuh, Regen-mantel, Käse-kuchen, Kleider-schrank, Butter-blume, Sonnen-brille, Vogel-haus.',
    },
    '2:question-words': {
      say: '„Jeder Satz auf diesem Blatt ist eine Antwort. Einige Wörter sind markiert. Schreibt die Frage auf, die genau nach diesen Wörtern fragt. Beginnt mit einem Fragewort: wer, was, wen, wo, wann oder wie viele.“',
      first: 'Lösen Sie den ersten und den zweiten Satz an der Tafel. „Emma findet fünf Brombeeren.“ Markiert ist Emma, eine Person, also fragt man mit Wer: „Wer findet fünf Brombeeren?“ Im zweiten Satz ist „in der Hütte“ markiert, ein Ort: „Wo ist Anna?“ Schreiben Sie beide Fragen mit großem Anfang und Fragezeichen.',
      stuck: 'Fragen Sie, was die markierten Wörter angeben: eine Person (wer, wen), ein Ding oder Tier (was), einen Ort (wo), eine Zeit (wann) oder eine Anzahl (wie viele). Das Kind spricht die Frage, bevor es schreibt. Zur Kontrolle auf dem Blatt für alle passen zum Beispiel: Wer findet fünf Brombeeren? Wo ist Anna? Wie viele Geier sieht Finn? Wen mag Mia? Wer isst um acht Uhr? Was malt Max? Wann schläft Lina? Wo spielt Ben?',
      byType: {
        'G2-357': {
          say: '„Oben seht ihr vier Bilder. Zu ihnen schreibt ihr Fragen. Auf jeder Linie steht schon das Fragewort: Wer, Was, Wo, Wann, Warum, Wie. Schreibt die Frage zu Ende und setzt ein Fragezeichen.“',
          first: 'Benennen Sie die vier Bilder gemeinsam: ein Handwerker, eine Birne, ein Haus, eine Uhr. Bilden Sie mündlich eine Frage zur ersten Linie und schreiben Sie sie an die Tafel: „Wer baut das Haus?“ Lassen Sie zwei Kinder eine Was-Frage vorschlagen. Jede Frage, die zu einem Bild passt und mit dem gedruckten Wort beginnt, ist richtig.',
          stuck: 'Zeigen Sie auf ein Bild und fragen Sie das Kind, was es darüber wissen möchte. Helfen Sie, daraus eine Frage mit dem gedruckten Fragewort zu machen, zum Beispiel: „Wo arbeitet der Handwerker? Wann klingelt die Uhr? Warum ist die Birne gelb und rot? Wie hoch ist das Haus?“',
        },
        'G2-356': {
          stuck: 'Fragen Sie, was die markierten Wörter angeben: eine Person (wer, wen), ein Tier (wen oder was), ein Ding (was), einen Ort (wo), eine Zeit (wann) oder eine Anzahl (wie viele). Das Kind spricht die Frage, bevor es schreibt. Zur Kontrolle auf dem Blatt für alle passen zum Beispiel: Wer findet fünf Brombeeren? Wo ist Anna? Wie viele Geier sieht Finn? Wen mag Mia? Wer isst um acht Uhr? Was malt Max? Wann schläft Lina? Wo spielt Ben? Bei den Tieren in Satz 4 und Satz 6 sind „Wen …?“ und „Was …?“ beide richtig; bei Satz 7 gilt auch „Um wie viel Uhr schläft Lina?“.',
        },
      },
    },
    '2:synonyms': {
      say: '„Manche Wörter bedeuten dasselbe oder fast dasselbe, so wie beginnen und anfangen. Lest das große Wort auf jeder Karte. Kreist darunter das Wort ein, das dasselbe bedeutet.“',
      first: 'Lösen Sie die erste Karte gemeinsam. Lesen Sie das große Wort und die vier Wörter darunter. Setzen Sie jedes in einen Satz ein: „Im Zimmer ist es leise. Im Zimmer ist es lustig? Im Zimmer ist es still?“ Eingekreist wird das Wort, bei dem der Satz dasselbe sagt. Lesen Sie die Wörter der anderen Karten einmal vor; einige sind für Zweitklässler neu.',
      stuck: 'Lesen Sie dem Kind die Wörter der Karte vor und lassen Sie es jedes in denselben kurzen Satz einsetzen. Zur Kontrolle auf dem Blatt für alle: leise und still, schließen und zumachen, brüllen und schreien, lächeln und schmunzeln, erstaunt und verblüfft, lärmend und laut, entspannt und gelassen, zornig und wütend.',
      byType: {
        'G2-373': {
          say: '„Manche Wörter bedeuten dasselbe oder fast dasselbe. Jedes Wort links hat einen Partner rechts. Verbindet die beiden mit einer Linie.“',
          first: 'Lesen Sie die Wörter beider Spalten einmal vor. Lösen Sie das erste Paar gemeinsam: „gelassen“. Gehen Sie die rechte Spalte durch und fragen Sie, welches Wort dasselbe bedeutet. Die Kinder beginnen mit den Paaren, bei denen sie sicher sind; die letzten ergeben sich dann fast von selbst.',
          stuck: 'Lesen Sie dem Kind das Wort vor und lassen Sie es einen kurzen Satz damit bilden. Dann probiert es die Wörter rechts in demselben Satz aus. Zur Kontrolle auf dem Blatt für alle: gelassen und entspannt, tapfer und mutig, helfen und unterstützen, aussuchen und wählen, klug und gescheit, springen und hüpfen, erstaunt und überrascht, simpel und einfach.',
        },
      },
    },
    '2:root-words': {
      say: '„Die drei Wörter auf jeder Karte gehören zu einer Wortfamilie: In allen steckt derselbe Wortstamm. Kreist den Teil ein, den alle drei gemeinsam haben. Schreibt ihn dann als Nomen, also mit großem Anfangsbuchstaben, in den leeren Stein.“',
      first: 'Sehen Sie sich die erste Karte gemeinsam an; sie ist schon gelöst: bearbeiten, Arbeitsplatz, Arbeiterin, Arbeit. Lösen Sie die zweite Karte an der Tafel: die drei Wörter lesen, die gemeinsamen Buchstaben einkreisen, den Stamm als Nomen aufschreiben. Der Wortstamm kann am Anfang, in der Mitte oder am Ende des Wortes stehen.',
      stuck: 'Das Kind deckt Wortanfang und Wortende mit den Fingern ab, bis ein kurzes Wort übrig bleibt, das in allen drei Wörtern steckt. Zur Kontrolle auf dem Blatt für alle: Arbeit, Kauf, Zauber, Salz, Ruf, Glück, Wunder, Freund, Bau.',
    },
    '2:read-and-answer': {
      say: '„Jetzt wird gelesen. Lest die Geschichte genau, bis zum letzten Satz. Lest dann jede Frage und kreist die richtige Antwort ein. Alle Antworten stehen in der Geschichte.“',
      first: 'Die Kinder lesen die Geschichte erst leise für sich; danach liest ein Kind oder lesen Sie sie einmal laut vor. Lösen Sie die erste Frage gemeinsam: Frage lesen, den Satz in der Geschichte suchen, der die Antwort gibt, und die Antwort einkreisen.',
      stuck: 'Lesen Sie dem Kind die Frage vor und lassen Sie es den Finger auf den Satz legen, in dem die Antwort steht. Wer die Geschichte nicht allein lesen kann, liest sie mit Ihnen zusammen. Zur Kontrolle auf dem Blatt für alle: am Samstag, Papa, Oma mag Brötchen sehr gern.',
      byType: {
        'G2-269+': {
          say: '„Jetzt wird gelesen. Lest die Geschichte genau. Die Antworten auf die Fragen 1 und 2 stehen nicht wörtlich im Text: Ihr müsst nachdenken, was die Geschichte euch verrät. Kreist die richtige Antwort ein. Die Antwort auf Frage 3 schreibt ihr in einem ganzen Satz auf die Linien.“',
          first: 'Die Kinder lesen die Geschichte erst leise für sich; danach wird sie einmal laut vorgelesen. Lösen Sie die erste Frage gemeinsam und fragen Sie: „Welcher Satz im Text hilft uns?“ (Die Sätze sind nummeriert.) Die zweite Frage und die geschriebene Antwort lösen die Kinder allein. Wer fertig ist, schreibt auf die Rückseite zwei Sätze: Wie geht die Geschichte weiter?',
          stuck: 'Lesen Sie dem Kind die Frage vor und fragen Sie: „In welchem Satz steckt ein Hinweis?“ Für die geschriebene Antwort beginnt das Kind mit einem Teil der Frage: „Der Igel braucht die Blätter, weil …“ Zur Kontrolle auf dem Blatt für alle: 1 A (sie will den Igel nicht erschrecken); 2 B (Herbst); bei Frage 3 ist jede Antwort richtig, die sagt, dass der Igel ein warmes Nest für den Winter baut.',
        },
        'G2-270+': {
          say: '„Jetzt wird gelesen. Lest die Geschichte genau. Die Antworten auf die Fragen 1 und 2 stehen nicht wörtlich im Text: Ihr müsst nachdenken, was die Geschichte euch verrät. Kreist die richtige Antwort ein. Die Antwort auf Frage 3 schreibt ihr in einem ganzen Satz auf die Linien.“',
          first: 'Die Kinder lesen die Geschichte erst leise für sich; danach wird sie einmal laut vorgelesen. Lösen Sie die erste Frage gemeinsam und fragen Sie: „Welcher Satz im Text hilft uns?“ (Die Sätze sind nummeriert.) Die zweite Frage und die geschriebene Antwort lösen die Kinder allein. Wer fertig ist, schreibt auf die Rückseite zwei Sätze: Was zeigt der Feuerwehrmann den Kindern als Nächstes?',
          stuck: 'Lesen Sie dem Kind die Frage vor und fragen Sie: „In welchem Satz steckt ein Hinweis?“ Für die geschriebene Antwort beginnt das Kind mit einem Teil der Frage: „Alle Kinder lachen, weil …“ Zur Kontrolle auf dem Blatt für alle: 1 B (er findet es selbst lustig); 2 A (ein Schulausflug); bei Frage 3 ist jede Antwort richtig, die sagt, dass der Helm so schwer ist, dass Paul fast umkippt.',
        },
        'G2-271+': {
          say: '„Jetzt wird gelesen. Lest die Geschichte genau. Die Antworten auf die Fragen 1 und 2 stehen nicht wörtlich im Text: Ihr müsst nachdenken, was die Geschichte euch verrät. Kreist die richtige Antwort ein. Die Antwort auf Frage 3 schreibt ihr in einem ganzen Satz auf die Linien.“',
          first: 'Die Kinder lesen die Geschichte erst leise für sich; danach wird sie einmal laut vorgelesen. Lösen Sie die erste Frage gemeinsam und fragen Sie: „Welcher Satz im Text hilft uns?“ (Die Sätze sind nummeriert.) Die zweite Frage und die geschriebene Antwort lösen die Kinder allein. Wer fertig ist, schreibt auf die Rückseite drei Sätze: Was bauen Jonas und Lina am nächsten Tag?',
          stuck: 'Lesen Sie dem Kind die Frage vor und fragen Sie: „In welchem Satz steckt ein Hinweis?“ Für die geschriebene Antwort beginnt das Kind mit einem Teil der Frage: „Die Welle kann den neuen Turm nicht wegspülen, weil …“ Zur Kontrolle auf dem Blatt für alle: 1 B (er hilft seiner Schwester); 2 C (sie sind zufrieden mit ihrer Burg); bei Frage 3 ist jede Antwort richtig, die sagt, dass der Turm weiter oben steht, wo das Wasser nicht hinkommt.',
        },
        'G2-254': {
          stuck: 'Lesen Sie dem Kind die Frage vor und lassen Sie es den Finger auf den Satz legen, in dem die Antwort steht. Wer die Geschichte nicht allein lesen kann, liest sie mit Ihnen zusammen. Zur Kontrolle auf dem Blatt für alle: 1 C (am Samstag), 2 A (Papa), 3 B (Oma mag Brötchen sehr gern).',
        },
      },
    },
    '2:describe-a-picture': {
      say: '„Schaut euch das Bild an. Ihr schreibt drei Sätze dazu. Der Anfang jedes Satzes steht schon auf der Linie. Der Wortkasten unter dem Bild verrät euch, wie die Tiere heißen.“',
      first: 'Betrachten Sie das Bild gemeinsam und lesen Sie den Wortkasten vor. Bilden Sie mündlich einen Satz zum ersten Satzanfang und schreiben Sie ihn an die Tafel: „Ich sehe einen Fuchs und einen Panda.“ Jedes Kind schreibt die Sätze mit eigenen Wörtern zu Ende und setzt einen Punkt.',
      stuck: 'Stellen Sie dem Kind eine Frage zum Bild: „Welche Tiere siehst du? Was macht der Panda? Wo sitzt der Waschbär?“ Das Kind spricht den Satz, bevor es schreibt. Wer fertig ist, schreibt auf die letzten Linien einen eigenen Satz.',
      byType: {
        'G2-300': {
          say: '„Schaut euch das Bild mit den Früchten an. Dieses Mal gibt es keine Satzanfänge: Ihr schreibt eure eigenen Sätze auf die sechs Linien. Der Wortkasten unter dem Bild verrät euch, wie die Früchte heißen.“',
          first: 'Betrachten Sie das Bild gemeinsam und lesen Sie den Wortkasten vor; Kaki und Cranberry kennen nicht alle Kinder. Sammeln Sie Ideen: Welche Frucht ist die größte? Welche Farben seht ihr? Welche würdet ihr gern probieren? Schreiben Sie einen Beispielsatz an die Tafel: „Die Limette ist auf dem Bild größer als die Ananas.“ Jedes Kind schreibt mindestens vier Sätze.',
          stuck: 'Stellen Sie dem Kind eine Frage zum Bild: „Welche Frucht würdest du nehmen? Welche Farbe hat sie? Was könnte man daraus machen?“ Das Kind spricht den Satz, bevor es schreibt. Die Namen der Früchte schreibt es aus dem Wortkasten ab.',
        },
        'G2-299': {
          stuck: 'Stellen Sie dem Kind eine Frage zum Bild: „Welche Tiere siehst du? Was macht der Panda? Wie viele Waschbären sind es?“ Das Kind spricht den Satz, bevor es schreibt. Wer fertig ist, schreibt auf die letzten Linien einen eigenen Satz.',
        },
      },
    },
    '2:find-differences': {
      say: '„Das ist ein Fehlersuchbild mit zwei Bildpaaren, eines links und eines rechts. In jedem Paar steht Bild 1 oben und Bild 2 darunter. Bild 2 ist an 5 Stellen anders als Bild 1. Kreist jeden Unterschied in Bild 2 ein und setzt unten für jeden gefundenen Unterschied ein Häkchen in ein Kästchen.“',
      first: 'Zeigen Sie am hochgehaltenen Blatt, welche Bilder zusammengehören: links oben und links unten, rechts oben und rechts unten. Suchen Sie im linken Paar gemeinsam einen Unterschied: Ein Kind zeigt die Stelle und sagt, was anders ist, zum Beispiel: Im unteren Bild fehlt die Sonne. Kreisen Sie die Stelle ein und setzen Sie ein Häkchen in das erste Kästchen unter dem Paar.',
      stuck: 'Das Kind deckt einen Teil beider Bilder mit der Hand ab und vergleicht immer nur ein kleines Stück, von oben nach unten. Etwas kann fehlen, kleiner sein, an einer anderen Stelle stehen oder umgedreht sein. Zur Kontrolle auf dem Blatt für alle: Im linken Paar fehlen unten die Sonne und die Tulpe, der Schmetterling und der Drachen sind kleiner, und der Pilz ist spiegelverkehrt. Im rechten Paar ist unten die Wolke oben links weiter nach links gerückt und die Wolke rechts weiter nach rechts, der obere Kolibri und das obere Vögelchen sind kleiner, und der kleine Käfer fehlt.',
    },
    '2:hundred-more-less': {
      say: '„In der Mitte steht eine Zahl. Links schreibt ihr die Zahl, die 100 weniger ist. Rechts schreibt ihr die Zahl, die 100 mehr ist.“',
      first: 'Rechnen Sie die erste Zeile an der Tafel. Fragen Sie: „Hundert mehr. Welche Ziffer ändert sich? Welche beiden bleiben gleich?“ Zeigen Sie: Nur der Hunderter ändert sich, 249, 349, 449. Zählen Sie gemeinsam in Hunderterschritten von einer anderen Zahl aus.',
      stuck: 'Das Kind deckt Zehner und Einer mit dem Finger ab und schaut nur auf den Hunderter: einer weniger für 100 weniger, einer mehr für 100 mehr. Die beiden abgedeckten Ziffern werden abgeschrieben. Zur Kontrolle auf dem Blatt für alle: 249 und 449, 602 und 802, 760 und 960, 675 und 875, 522 und 722, 514 und 714.',
    },
    '2:round-to-ten': {
      say: '„Jeder Zahlenstrahl geht von einem Zehner zum nächsten: Das sind die beiden Nachbarzehner. Schaut auf den Punkt. Liegt er näher am linken oder am rechten Zehner? Kreist den Zehner ein, der näher liegt. So rundet man auf Zehner.“',
      first: 'Zeichnen Sie den ersten Zahlenstrahl an die Tafel, mit 30 und 40 an den Enden und dem Punkt. Markieren Sie die Mitte und fragen Sie, welche Zahl das ist: 35. Fragen Sie: „Liegt der Punkt vor der Mitte oder dahinter?“ Davor, also näher an der 30.',
      stuck: 'Das Kind legt den Finger auf den Punkt und zählt die kleinen Schritte bis zu jedem Ende; das Ende mit weniger Schritten liegt näher. Zur Kontrolle auf dem Blatt für alle: 30 (der Punkt liegt bei 33), 10 (bei 12) und 30 (bei 31).',
    },
    '2:grid-coordinates': {
      say: '„In diesem Gitter versteckt sich ein Bild. Jedes Feld hat einen Namen aus einem Buchstaben und einer Zahl, so wie B2. Die Listen unten sagen euch, welche Felder ihr in welcher Farbe anmalen sollt.“',
      first: 'Vergewissern Sie sich, dass alle die beiden Farben haben, die in den Listen stehen. Zeigen Sie, wie man ein Feld findet: einen Finger auf den Buchstaben oben, einen auf die Zahl an der Seite, und beide wandern, bis sie sich treffen. Suchen Sie das erste Feld der ersten Liste gemeinsam und malen Sie es an. Jedes erledigte Feld wird in der Liste durchgestrichen.',
      stuck: 'Das Kind spricht den Feldnamen laut, erst den Buchstaben, sucht dessen Spalte und rutscht mit dem Finger hinunter bis zur Zeile mit der Zahl. Ein falsch angemaltes Feld fällt im Bild auf; dann prüft es den Feldnamen noch einmal.',
    },
    '2:synonyms~doing-stage': {
      say: '„Wer gut schreibt, schreibt nicht immer nur sagt. Es gibt Wörter, die verraten, wie jemand etwas sagt. Lest jeden Satz. Sucht in der Sprechblase das Wort, das am besten passt, und schreibt es in das Kästchen.“',
      first: 'Lesen Sie die sechs Wörter in der Sprechblase gemeinsam. Lassen Sie die Klasse „Wartet auf mich!“ einmal rufen und einmal flüstern. Lösen Sie den ersten Satz zusammen: Zwei oder drei Wörter ausprobieren und fragen, welches zu jemandem passt, der dem Bus hinterherläuft. Jedes Wort wird genau einmal gebraucht und danach durchgestrichen.',
      stuck: 'Lesen Sie dem Kind den Satz vor und fragen Sie, wie die Person das wohl sagt: laut, leise, als Frage? Dann lesen Sie die Wörter vor, die noch übrig sind. Zur Kontrolle auf dem Blatt für alle: ruft, flüstert, fragt, verspricht, erklärt, antwortet.',
    },
    '2:skip-count-3-4': {
      say: '„Auf diesem Blatt zählt ihr in Dreierschritten: 3, 6, 9, 12. In jeder Reihe fehlen Zahlen. Zählt in Dreierschritten weiter und schreibt die fehlenden Zahlen auf. Nicht jede Reihe beginnt bei 3.“',
      first: 'Zählen Sie mit der Klasse laut in Dreierschritten bis 30; das ist die Dreierreihe aus dem Einmaleins. Lösen Sie die erste Reihe an der Tafel: Lesen Sie die gedruckten Zahlen und fragen Sie: „Wie weit ist es von einer Zahl zur nächsten?“ Rechnen Sie von der Zahl vor der Lücke drei weiter.',
      stuck: 'Das Kind rechnet von der Zahl vor der Lücke drei weiter und prüft: Die nächste gedruckte Zahl muss wieder drei mehr sein. Zur Kontrolle auf dem Blatt für alle fehlen in der ersten Reihe 12, 15, 30; in der zweiten 3, 15, 18; in der dritten 12, 15, 21; in der vierten 48, 54, 57; in der fünften 15, 21, 30.',
    },
  },
};
