'use strict';
/**
 * Guest teacher scripts, language de, teaching points of grade 1 (Daily Teaching System, Part 5). One script
 * per teaching point: what to SAY, how to START together, what to do when a child is STUCK; `byType` for one
 * worksheet type. Written from the pictures of the worksheets. Merged by scripts/sub-plans/apply-texts.js.
 */
module.exports = {
  loc: 'de',
  points: {
    '1:fluency-within-20': {
      say: '„Das sind Plus- und Minusaufgaben bis 10, die ihr schon kennt. Rechnet zuerst alle Aufgaben, die ihr sofort wisst. Dann kommen die anderen dran.“',
      first: 'Rechnen Sie die ersten beiden Aufgaben an der Tafel. Lassen Sie die Kinder erklären, wie sie gerechnet haben, und lassen Sie jeden Weg gelten, der stimmt: auswendig, weiterzählen oder mit den Fingern. Machen Sie auf das Rechenzeichen aufmerksam: Plus und Minus wechseln sich ab.',
      stuck: 'Finger oder gemalte Punkte sind erlaubt, auch wenn auf dem Blatt „im Kopf“ steht. Lassen Sie das Kind das Rechenzeichen zuerst farbig nachfahren. Zur Kontrolle auf dem Blatt für alle: 6, 4, 9, 10, 9, 9, 5, 10, 8, 9, 3, 3.',
      byType: {
        'G1-216': {
          say: '„Das sind Plusaufgaben bis 20. Rechnet zuerst alle Aufgaben, die ihr sofort wisst. Dann kommen die anderen dran.“',
          first: 'Rechnen Sie die ersten beiden Aufgaben an der Tafel. Fragen Sie nach den Rechenwegen und lassen Sie jeden gelten, der stimmt: von der größeren Zahl weiterzählen, erst bis zur 10 oder 20 rechnen, oder auswendig wissen.',
          stuck: 'Das Kind beginnt bei der größeren Zahl und zählt die kleinere mit den Fingern dazu: bei 13 + 6 sagt es „13“ und zählt sechs weiter. Zur Kontrolle auf dem Blatt für alle: 18, 19, 19, 19, 18, 20, 12, 17, 20, 10, 18, 14.',
        },
        'G1-217': {
          say: '„Das sind Minusaufgaben bis 20. Die könnt ihr schon aus der ersten Klasse. Rechnet zuerst alle Aufgaben, die ihr sofort wisst. Dann kommen die anderen dran.“',
          first: 'Rechnen Sie die ersten beiden Aufgaben an der Tafel. Fragen Sie nach den Rechenwegen und lassen Sie jeden gelten, der stimmt: zurückzählen, von der kleineren Zahl bis zur größeren ergänzen, oder auswendig wissen.',
          stuck: 'Das Kind ergänzt von der kleineren Zahl bis zur größeren: bei 17 − 9 sagt es „9“ und zählt mit den Fingern bis 17. Zur Kontrolle auf dem Blatt für alle: 4, 12, 2, 8, 8, 8, 5, 2, 10, 5, 3, 4.',
        },
        'G1-214': {
          first: 'Rechnen Sie die ersten beiden Aufgaben an der Tafel. Lassen Sie die Kinder erklären, wie sie gerechnet haben, und lassen Sie jeden Weg gelten, der stimmt: auswendig, weiterzählen oder mit den Fingern. Machen Sie auf das Rechenzeichen aufmerksam: Plus- und Minusaufgaben stehen gemischt auf dem Blatt.',
        },
      },
    },
    '1:add-within-10-models': {
      say: '„Jeder Dominostein hat zwei Seiten mit Punkten. Zählt die Punkte auf der linken Seite und auf der rechten Seite. Dann rechnet ihr die Plusaufgabe daneben und schreibt das Ergebnis in das Kästchen.“',
      first: 'Zeichnen Sie den ersten Dominostein an die Tafel. Zählen Sie beide Seiten gemeinsam, lesen Sie die Plusaufgabe daneben vor und rechnen Sie sie zusammen. Zeigen Sie: Wer nicht rechnen mag, kann auch einfach alle Punkte des Steins zählen.',
      stuck: 'Das Kind zählt alle Punkte des Steins der Reihe nach und tippt dabei jeden Punkt an. Zur Kontrolle auf dem Blatt für alle: 12, 7, 4, 8.',
    },
    '1:number-walls': {
      say: '„Das sind Zahlenmauern. Die Regel heißt: Zwei Steine nebeneinander ergeben zusammen den Stein, der auf ihnen liegt. Fangt unten an und rechnet euch bis zum obersten Stein hoch.“',
      first: 'Zeichnen Sie die erste Mauer an die Tafel. Zeigen Sie auf zwei Steine, die unten nebeneinanderliegen, und auf den Stein darüber. Rechnen Sie die mittlere Reihe gemeinsam aus, dann den Deckstein.',
      stuck: 'Legen Sie zwei Finger auf die beiden Steine unter dem leeren Stein: Nur diese beiden werden zusammengezählt. Ein Fehler unten macht alle Steine darüber falsch, deshalb von unten nach oben prüfen. Zur Kontrolle auf dem Blatt für alle: In der mittleren Reihe stehen 2 und 2, 3 und 2, 5 und 5, 4 und 4; die Decksteine sind 4, 5, 10 und 8.',
      byType: {
        'G1-267': {
          say: '„Das sind Zahlenmauern mit vier Reihen. Die Regel kennt ihr aus der ersten Klasse: Zwei Steine nebeneinander ergeben zusammen den Stein, der auf ihnen liegt. Fangt unten an und rechnet euch bis zum Deckstein hoch.“',
          first: 'Zeichnen Sie die erste Mauer an die Tafel. Zeigen Sie auf zwei Steine, die unten nebeneinanderliegen, und auf den Stein darüber. Rechnen Sie die zweite Reihe gemeinsam aus; die dritte Reihe und den Deckstein rechnen die Kinder allein.',
          stuck: 'Legen Sie zwei Finger auf die beiden Steine unter dem leeren Stein: Nur diese beiden werden zusammengezählt. Ein Fehler unten macht alle Steine darüber falsch, deshalb von unten nach oben prüfen. Zur Kontrolle auf dem Blatt für alle: Die Decksteine sind 15, 13, 14 und 11.',
        },
      },
    },
    '1:make-10': {
      say: '„Die Giraffe möchte zum Affenbrotbaum. Auf dem Weg liegen Steine mit Plusaufgaben. Sie darf nur auf Steine treten, bei denen 10 herauskommt. Rechnet die Aufgaben aus und zeichnet den Weg der Giraffe ein.“',
      first: 'Zeigen Sie am hochgehaltenen Blatt die Giraffe und den Baum. Rechnen Sie zwei Steine in der Nähe der Giraffe gemeinsam aus und fragen Sie: „Darf sie hier drauftreten?“ Erinnern Sie an die Zerlegungen der 10, die die Kinder kennen: 9 und 1, 8 und 2, 7 und 3, 6 und 4, 5 und 5.',
      stuck: 'Das Kind rechnet jeden Stein aus, bevor es weiterzeichnet, und streicht Steine durch, die nicht 10 ergeben. Führt ein Weg nicht weiter, geht es zum letzten richtigen Stein zurück.',
    },
    '1:word-problems': {
      say: '„Auf diesem Blatt stehen zwei Rechengeschichten. Lest jede Geschichte genau. Das Bild darunter zeigt, was passiert. Schreibt eure Rechnung in das große Feld und die Antwort in das Kästchen.“',
      first: 'Lesen Sie die erste Geschichte gemeinsam. Fragen Sie: „Was wissen wir? Was wollen wir herausfinden? Werden es mehr oder weniger?“ Schreiben Sie die Rechnung an die Tafel und lassen Sie am Bild nachzählen. Die zweite Geschichte lesen Sie nur vor; rechnen sollen die Kinder allein.',
      stuck: 'Lesen Sie dem Kind die Geschichte Satz für Satz vor und lassen Sie es am Bild zeigen, was passiert: dazulegen oder wegnehmen. Durchgestrichene Bilder bedeuten „weg“. Zur Kontrolle auf dem Blatt für alle: 8 Erdbeeren und 2 Nektarinen.',
    },
    '1:time-read': {
      say: '„Alle Uhren auf diesem Blatt zeigen eine halbe Stunde: Der große Zeiger steht unten auf der 6. Lest jede Uhr ab und kreist die passende Uhrzeit ein.“',
      first: 'Zeichnen Sie eine Uhr an die Tafel, den großen Zeiger auf der 6, den kleinen zwischen 6 und 7. Fragen Sie: „An welcher Zahl ist der kleine Zeiger gerade vorbei?“ Das ist die Stunde, die man in der Digitalzeit schreibt: 6:30. Sagen Sie auch, wie man es spricht: halb sieben.',
      stuck: 'Fragen Sie: „Zwischen welchen zwei Zahlen steht der kleine Zeiger?“ Die kleinere der beiden steht vor dem Doppelpunkt. Zur Kontrolle auf dem Blatt für alle: 6:30, 1:30, 2:30 und 9:30 (halb sieben, halb zwei, halb drei, halb zehn).',
      byType: {
        'G1-148': {
          say: '„Alle Uhren auf diesem Blatt zeigen eine volle Stunde: Der große Zeiger steht oben auf der 12. Der kleine Zeiger zeigt euch, wie viel Uhr es ist. Lest jede Uhr ab und kreist die passende Uhrzeit ein.“',
          first: 'Zeichnen Sie eine Uhr an die Tafel, den großen Zeiger auf der 12, den kleinen auf der 3. Fragen Sie: „Auf welche Zahl zeigt der kleine Zeiger?“ Es ist 3 Uhr; geschrieben wird das 3:00. Die erste Uhr auf dem Blatt lesen alle gemeinsam ab.',
          stuck: 'Das Kind legt den Finger auf den kleinen Zeiger und liest die Zahl, auf die er zeigt. Diese Zahl steht vor dem Doppelpunkt, dahinter stehen zwei Nullen. Zur Kontrolle auf dem Blatt für alle: 7:00, 9:00, 6:00 und 1:00.',
        },
      },
    },
    '1:count-on-back-hops': {
      say: '„Dieses Mal verbindet ihr die Punkte rückwärts. Ihr beginnt am orangen Punkt bei der 20 und zählt zurück: 20, 19, 18 und immer so weiter bis zur 1. Am Ende seht ihr ein Bild.“',
      first: 'Zählen Sie mit der Klasse laut rückwärts von 20 bis 1. Suchen Sie gemeinsam den orangen Punkt bei der 20 und ziehen Sie den ersten Strich zur 19. Die Zahlenreihe unten auf dem Blatt zeigt die Reihenfolge.',
      stuck: 'Das Kind nennt die Zahl, bei der es gerade ist, und fragt sich: „Welche Zahl kommt davor?“ Es kann die Zahlen in der Reihe unten nacheinander abhaken.',
    },
    '1:phoneme-boxes': {
      say: '„In den Kästchen stehen die Laute eines Wortes. Lest sie der Reihe nach und zieht sie zu einem Wort zusammen. Daneben sind drei Tiere. Kreist das Tier ein, das zu eurem Wort passt.“',
      first: 'Schreiben Sie die Kästchen der ersten Reihe an die Tafel: Z-e-b-r-a. Lassen Sie die Laute erst einzeln sprechen, dann immer schneller, bis das Wort zu hören ist. Kreisen Sie das Zebra gemeinsam ein. Zeigen Sie, dass manche Kästchen zwei oder drei Buchstaben haben, die zusammen ein Laut sind: Pf, ch, tz.',
      stuck: 'Lassen Sie das Kind mit dem Finger von Kästchen zu Kästchen rutschen und die Laute dabei lang ziehen. Zur Kontrolle auf dem Blatt für alle: Zebra, Wolf, Pferd, Kamel, Elch, Katze.',
    },
    '1:word-families-syllable-reading': {
      say: '„Diese Wörter sind in Silben geschrieben. Lest jedes Wort Silbe für Silbe. Sucht dann oben in der Bildleiste das passende Bild und schreibt seine Nummer in das Kästchen. Zwei Bilder bleiben übrig.“',
      first: 'Benennen Sie zuerst die acht Bilder der Bildleiste gemeinsam: 1 Handgelenk, 2 Armband, 3 Läuferin, 4 Waage, 5 Kegel, 6 Rakete, 7 Junge, 8 Knoblauch. Lesen Sie das erste Wort zusammen in Silben und dann als ganzes Wort: Ke-gel, Kegel. Suchen Sie das Bild und schreiben Sie seine Nummer in das Kästchen.',
      stuck: 'Decken Sie mit dem Finger alles außer der ersten Silbe ab und lassen Sie das Kind Silbe für Silbe aufdecken. Zur Kontrolle auf dem Blatt für alle: Kegel 5, Waage 4, Armband 2, Knoblauch 8, Rakete 6, Handgelenk 1.',
      byType: {
        'G1-331': {
          say: '„Auf jeder Karte stehen zwei Silben. Lest sie nacheinander und sprecht sie zusammen: Dann hört ihr ein Wort. Das Bild darüber hilft euch. Schreibt das ganze Wort auf die Linie.“',
          first: 'Schreiben Sie die erste Karte an die Tafel: Sche + re. Lassen Sie die Silben erst einzeln lesen und dann zusammenziehen: Schere. Schreiben Sie das Wort als ein Wort an die Tafel, ohne Lücke und ohne Pluszeichen, mit großem Anfangsbuchstaben.',
          stuck: 'Decken Sie die zweite Silbe ab, lassen Sie das Kind die erste lesen, decken Sie auf und lassen Sie beide Silben immer schneller hintereinander sprechen. Das Bild über der Karte zeigt, welches Wort gemeint ist. Zur Kontrolle auf dem Blatt für alle: Schere, Biene, Lutscher, Pfanne, Welle, Regen.',
        },
      },
    },
    '1:spell-picture-words': {
      say: '„Neben jedem Tier steht schon der erste Buchstabe. Sprecht den Namen des Tieres. Sucht das Wort oben im Wortspeicher und schreibt es nach dem ersten Buchstaben zu Ende.“',
      first: 'Lesen Sie die sechs Wörter im Wortspeicher gemeinsam. Machen Sie das erste Bild zusammen: „Was ist das für ein Tier? Mit welchem Buchstaben beginnt es?“ Suchen Sie das Wort im Speicher und schreiben Sie es an die Tafel. Drei Tiere beginnen mit E; dort müssen die Kinder genau hinsehen.',
      stuck: 'Das Kind spricht den Tiernamen langsam und sucht im Wortspeicher ein Wort mit demselben Anfang. Es streicht jedes Wort durch, das es verwendet hat. Zur Kontrolle auf dem Blatt für alle: Tiger, Ente, Esel, Elch, Pferd, Jaguar.',
    },
    '1:opposites': {
      say: '„Oben stehen zwölf Wörter. Immer zwei davon sind Gegenteile, so wie groß und klein. Sucht die Paare und schreibt sie auf: ein Wort links vom Pfeil, sein Gegenteil rechts.“',
      first: 'Lesen Sie die zwölf Wörter gemeinsam. Suchen Sie das erste Paar zusammen: „Was ist das Gegenteil von nass?“ Schreiben Sie nass und trocken an die Tafel, eines links und eines rechts von einem Pfeil. Die Kinder streichen oben jedes Wort durch, das sie aufgeschrieben haben.',
      stuck: 'Lesen Sie dem Kind ein Wort vor und bilden Sie einen Satz dazu: „Die Schnecke ist langsam, der Hase ist …?“ Zur Kontrolle auf dem Blatt für alle: glatt und rau, dünn und dick, nass und trocken, langsam und schnell, kurz und lang, sauer und süß.',
      byType: {
        'G1-307': {
          say: '„Auf jeder Karte steht ein Wort. Oben in der Wortliste findet ihr sein Gegenteil, so wie bei groß und klein. Schreibt das Gegenteil auf die Linie.“',
          first: 'Lesen Sie die acht Wörter der Wortliste gemeinsam. Lösen Sie die erste Karte zusammen: „Was ist das Gegenteil von weich?“ Schreiben Sie hart an die Tafel. Die Kinder streichen in der Wortliste jedes Wort durch, das sie verwendet haben.',
          stuck: 'Lesen Sie dem Kind das Wort vor und bilden Sie einen Satz: „Das Kissen ist weich, der Stein ist …?“ Zur Kontrolle auf dem Blatt für alle: weich und hart, kurz und lang, leicht und schwer, alt und neu, heiß und kalt, dunkel und hell, klein und groß, laut und leise.',
        },
      },
    },
    '1:read-and-follow': {
      say: '„Jetzt wird gelesen. In jedem Feld steht ein Satz. Er sagt euch, welche Tiere ihr anmalen sollt, wie viele und in welcher Farbe. Lest genau und malt nur das an, was im Satz steht.“',
      first: 'Vergewissern Sie sich, dass alle die vier Farben haben, die oben auf dem Blatt stehen. Lesen Sie den ersten Satz gemeinsam. Fragen Sie: „Welche Tiere? Wie viele? Welche Farbe?“ Malen Sie gemeinsam an. Die anderen drei Sätze lesen die Kinder allein.',
      stuck: 'Das Kind liest den Satz laut und unterstreicht die Zahl und die Farbe. In jedem Feld sind auch andere Tiere; angemalt werden nur die, die der Satz nennt.',
    },
    '1:unscramble-sentence': {
      say: '„Hier sind die Wörter durcheinandergeraten. Ordnet sie zu einem Satz und schreibt ihn auf die Linie. Ein Satz beginnt mit einem großen Buchstaben und hört mit einem Satzzeichen auf.“',
      first: 'Schreiben Sie die vier Wörter des ersten Satzes durcheinander an die Tafel. Fragen Sie: „Um wen geht es? Was tut er?“ Bauen Sie den Satz gemeinsam: Paul zählt die Eulen. Zeigen Sie auf den großen Anfangsbuchstaben und den Punkt. Sagen Sie dazu: Einer der Sätze ist eine Frage.',
      stuck: 'Das Kind sucht zuerst den Satzanfang: Das ist der Name des Kindes oder das kleine Wort, das großgeschrieben ist (Wo, Die). Dann spricht es den Satz laut, bevor es schreibt. Zur Kontrolle auf dem Blatt für alle: Paul zählt die Eulen. Wo sind die Fledermäuse? Die Giraffen sind bunt. Mia sucht die Jaguare.',
    },
    '1:alphabetical-order': {
      say: '„Der kleine Bär möchte zum Honig. Er hüpft im ABC von Wabe zu Wabe. Ihr beginnt in der Wabe, auf die der Pfeil zeigt, und malt immer den nächsten Buchstaben im Alphabet in einer Nachbarwabe aus, bis ihr beim T seid.“',
      first: 'Sagen Sie mit der Klasse das Abc auf. Zeigen Sie am hochgehaltenen Blatt die Wabe am Pfeil und fragen Sie: „Welcher Buchstabe steht hier? Welcher kommt im Abc danach?“ Suchen Sie ihn in einer Wabe direkt daneben und malen Sie ihn gemeinsam aus.',
      stuck: 'Das Kind sagt das Abc leise bis zu dem Buchstaben, bei dem es gerade ist, und spricht einen weiter. Es schaut nur die Waben an, die seine Wabe berühren. Wer das Abc nicht sicher kann, schreibt es sich zuerst an den Blattrand.',
      byType: {
        'G1-245': {
          say: '„Auf den Karten stehen sechs Tiere. Ordnet sie nach dem Abc. Schreibt zuerst in jeden kleinen Kreis die Nummer von 1 bis 6. Dann schreibt ihr die Wörter in der richtigen Reihenfolge auf die Linien. Die Abc-Leiste oben hilft euch.“',
          first: 'Lesen Sie die sechs Tiernamen gemeinsam. Fragen Sie: „Mit welchem Buchstaben beginnt jedes Wort? Welcher dieser Buchstaben kommt im Abc zuerst?“ Suchen Sie ihn auf der Abc-Leiste, schreiben Sie eine 1 in den Kreis der Karte und das Wort auf die erste Linie.',
          stuck: 'Das Kind kreist bei jedem Wort den ersten Buchstaben ein und sucht die Buchstaben der Reihe nach auf der Abc-Leiste, von links nach rechts. Zur Kontrolle auf dem Blatt für alle: Esel, Hund, Jaguar, Koala, Wal, Zebra.',
        },
        'G1-426': {
          first: 'Sagen Sie mit der Klasse das Abc auf und schreiben Sie es an die Tafel. Zeigen Sie am hochgehaltenen Blatt die Wabe am Pfeil und fragen Sie: „Welcher Buchstabe steht hier? Welcher kommt im Abc danach?“ Der Weg beginnt nicht beim A, sondern beim G. Neben dem G stehen zwei H; weiter geht es nur vom linken H aus. Malen Sie dieses H gemeinsam aus.',
          stuck: 'Das Kind sagt das Abc leise bis zu dem Buchstaben, bei dem es gerade ist, und spricht einen weiter; das Abc an der Tafel hilft. Es schaut nur die Waben an, die seine Wabe berühren. Endet der Weg, geht es einen Buchstaben zurück und sucht denselben Buchstaben in einer anderen Nachbarwabe. Zur Kontrolle auf dem Blatt für alle: Der Weg läuft von G über H, I, J, K, L, M, N, O, P, Q, R und S bis zum T in der obersten Reihe.',
        },
      },
    },
    '1:one-ten-more-less': {
      say: '„In der Mitte steht eine Zahl. Links schreibt ihr die Zahl, die 10 weniger ist. Rechts schreibt ihr die Zahl, die 10 mehr ist.“',
      first: 'Rechnen Sie die erste Zeile an der Tafel. Fragen Sie: „Zehn mehr als 36. Welche Ziffer ändert sich, der Zehner oder der Einer?“ Zeigen Sie: Nur der Zehner ändert sich, 26, 36, 46. Zählen Sie gemeinsam in Zehnerschritten von einer anderen Zahl aus, zum Beispiel 7, 17, 27, 37.',
      stuck: 'Das Kind deckt den Einer mit dem Finger ab und verändert nur den Zehner um eins. Auf der Hundertertafel steht die Zahl direkt darüber für 10 weniger, die Zahl direkt darunter für 10 mehr. Zur Kontrolle auf dem Blatt für alle: 26 und 46, 25 und 45, 55 und 75, 14 und 34, 47 und 67, 37 und 57.',
    },
    '1:story-sequencing': {
      say: '„Jede Geschichte auf diesem Blatt hat einen Anfang und einen Schluss, aber die Mitte fehlt. Schaut genau, was am Schluss anders ist als am Anfang. Dann malt ihr in den großen Rahmen, was dazwischen passiert.“',
      first: 'Besprechen Sie die erste Geschichte nur mündlich. Ein Kind erzählt, was das erste Bild zeigt, ein anderes, was das letzte zeigt. Fragen Sie: „Was muss dazwischen passiert sein?“ Sammeln Sie zwei oder drei Ideen. Dann malt jedes Kind seine Mitte.',
      stuck: 'Fragen Sie: „Was ist am Anfang da? Was ist am Schluss anders? Was hat jemand getan?“ Jedes Bild, das vom Anfang zum Schluss führt, ist richtig; schön muss es nicht sein. Wer fertig ist, schreibt zu jeder Geschichte einen Satz auf die Rückseite.',
    },
    '1:mazes': {
      say: '„Vier Tiere lassen Drachen und einen Ballon steigen, und die Schnüre haben sich verheddert. Folgt jeder Schnur vom Tier bis nach oben. Schreibt dann die Nummer des Tieres in das Kästchen über seinem Drachen.“',
      first: 'Halten Sie das Blatt hoch und legen Sie den Finger auf das Tier mit der Nummer 1. Fahren Sie seine Schnur langsam nach, an jeder Kreuzung geradeaus weiter, bis nach oben. Schreiben Sie eine 1 in das Kästchen darüber. Die anderen drei Schnüre verfolgen die Kinder allein.',
      stuck: 'Das Kind fährt die Schnur erst mit dem Finger nach, dann mit einem Buntstift, für jedes Tier in einer anderen Farbe. An einer Kreuzung läuft die Schnur geradeaus weiter; sie biegt nicht auf die andere Schnur ab.',
      byType: {
        'G1-424': {
          say: '„Das Kaninchen möchte zum Eimer und unterwegs alle vier Karotten einsammeln. Es gibt eine Regel: Kein Weg darf zweimal benutzt werden. Kreuzt unten für jede Karotte, die ihr eingesammelt habt, einen Kreis an.“',
          first: 'Zeigen Sie am hochgehaltenen Blatt das Kaninchen, den Eimer und die vier Karotten. Sagen Sie den Kindern, dass sie den ganzen Weg erst mit dem Finger planen sollen, bevor sie zeichnen: Der erste Weg, den man sieht, lässt oft eine Karotte aus.',
          stuck: 'Das Kind legt den Finger nacheinander auf jede Karotte und schaut, welche Wege zu ihr führen. Ist der Weg versperrt, weil ein Stück schon benutzt wurde, beginnt es mit dem Finger neu und holt die Karotten in einer anderen Reihenfolge.',
        },
        'G1-425': {
          say: '„Der Eisbär möchte nach Hause zu seinem Iglu. Aber Vorsicht: Auf manchen Wegen liegt ein Walross, und auf manchen ist ein Loch im Eis. Diese Wege darf er nicht nehmen. Zeichnet einen sicheren Weg ein.“',
          first: 'Zeigen Sie am hochgehaltenen Blatt den Eisbären, das Iglu, ein Walross und ein Loch im Eis. Die Kinder planen den Weg erst mit dem Finger und zeichnen dann.',
          stuck: 'Das Kind geht mit dem Finger vom Iglu aus rückwärts zum Eisbären; so findet man den freien Weg oft leichter. Jeder Weg ohne Walross und ohne Loch ist richtig.',
        },
        'G1-423': {
          stuck: 'Das Kind fährt die Schnur erst mit dem Finger nach, dann mit einem Buntstift, für jedes Tier in einer anderen Farbe. An einer Kreuzung läuft die Schnur geradeaus weiter; sie biegt nicht auf die andere Schnur ab. Zur Kontrolle auf dem Blatt für alle: In den Kästchen stehen von links nach rechts 3, 4, 1 und 2.',
        },
      },
    },
    '1:doubles-halves': {
      say: '„Verdoppeln heißt: dieselbe Zahl noch einmal dazu. Halbieren heißt: eine Zahl in zwei gleiche Teile zerlegen. Auf jedem Feld steht oben, was zu tun ist. Rechnet und schreibt die fehlenden Zahlen in die Kästchen.“',
      first: 'Lösen Sie die ersten beiden Felder an der Tafel. Verdoppeln: 8 plus 8 ist 16. Halbieren: „16 ist gleich … plus …; welche Zahl passt zweimal hinein?“ 8 und 8. Zeigen Sie, dass im gepunkteten Feld Platz zum Malen von Punkten ist.',
      stuck: 'Beim Verdoppeln malt das Kind die Punkte zweimal und zählt alle. Beim Halbieren malt es die Punkte der Zahl und verteilt sie abwechselnd auf zwei Häufchen. Zur Kontrolle auf dem Blatt für alle: 16; 8 und 8; 10; 7 und 7; 20; 6 und 6; 12; 5 und 5.',
    },
    '1:synonyms': {
      say: '„Manche Wörter bedeuten dasselbe oder fast dasselbe. Schaut euch jedes Bild an. Darunter stehen vier Wörter. Zwei davon bedeuten dasselbe und passen zum Bild. Kreist diese beiden ein.“',
      first: 'Lösen Sie das erste Feld gemeinsam. Fragen Sie: „Wie fühlt sich das Gesicht auf dem Bild?“ Lesen Sie die vier Wörter vor und probieren Sie jedes aus: „Das Gesicht ist riesig? Das Gesicht ist ängstlich?“ Kreisen Sie die beiden Wörter ein, die passen. Lesen Sie die Wörter der anderen Felder einmal vor.',
      stuck: 'Lesen Sie dem Kind die vier Wörter vor und lassen Sie es zu jedem sagen, ob es zum Bild passt. Zwei bleiben übrig; sie bedeuten dasselbe. Zur Kontrolle auf dem Blatt für alle: ängstlich und verängstigt, riesig und groß, flink und rasch, schläfrig und müde, wütend und zornig, fröhlich und glücklich.',
    },
  },
};
