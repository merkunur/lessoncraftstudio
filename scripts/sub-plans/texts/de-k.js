'use strict';
/**
 * Guest teacher scripts, language de, teaching points of grade K (Daily Teaching System, Part 5). One script
 * per teaching point: what to SAY, how to START together, what to do when a child is STUCK; `byType` for one
 * worksheet type. Written from the pictures of the worksheets. Merged by scripts/sub-plans/apply-texts.js.
 */
module.exports = {
  loc: 'de',
  points: {
    'K:dot-to-dot-sequence': {
      say: '„Auf diesem Blatt versteckt sich ein Tier. Ihr findet es, wenn ihr die Punkte der Reihe nach verbindet: von der 1 zur 2, dann zur 3 und immer so weiter bis zur 10. Los geht es am orangen Punkt.“',
      first: 'Zählen Sie mit der Klasse laut von 1 bis 10. Zeigen Sie am hochgehaltenen Blatt den orangen Punkt bei der 1 und ziehen Sie gemeinsam den ersten Strich zur 2. Die Zahlenreihe unten auf dem Blatt zeigt die Reihenfolge. Wer fertig ist, darf das Tier ausmalen.',
      stuck: 'Lassen Sie das Kind die Zahl nennen, bei der es gerade ist, und fragen Sie: „Welche Zahl kommt danach?“ Das Kind kann die Zahlen in der Reihe unten nacheinander abhaken.',
    },
    'K:count-how-many': {
      say: '„In jedem Kästchen liegen Formen. Zählt, wie viele es sind, und schreibt die Zahl in das kleine Feld darunter. Zählt langsam und tippt jede Form nur einmal an.“',
      first: 'Zählen Sie das erste Kästchen gemeinsam: Die Kinder tippen jede Form mit dem Finger an und zählen laut mit. Schreiben Sie die Zahl groß an die Tafel, damit die Kinder sehen, wie die Ziffer aussieht. Lassen Sie die Ziffern von 1 bis 10 an der Tafel stehen.',
      stuck: 'Das Kind macht mit dem Bleistift einen kleinen Punkt in jede Form, die es schon gezählt hat. Wer die Ziffer noch nicht sicher schreiben kann, schaut an der Tafel nach; eine spiegelverkehrte Ziffer ist am Schulanfang kein Fehler, der heute geübt werden muss. Zur Kontrolle auf dem Blatt für alle: 8 Würfel, 5 Kugeln, 9 Sechsecke und 7 Rauten.',
    },
    'K:compare-groups': {
      say: '„In jeder Reihe seht ihr zwei Gruppen. In einer Gruppe sind mehr. Schaut genau hin und kreist die Gruppe ein, in der MEHR sind.“',
      first: 'Sehen Sie sich die erste Reihe gemeinsam an. Fragen Sie: „Wo sind mehr? Woran seht ihr das?“ Lassen Sie beide Gruppen zählen und die größere einkreisen. Weisen Sie darauf hin, dass in einer Reihe die beiden Gruppen fast gleich groß sind; dort muss man zählen.',
      stuck: 'Das Kind zählt beide Gruppen und schreibt die Zahl klein daneben. Dann fragen Sie: „Welche Zahl ist größer?“ Zur Kontrolle auf dem Blatt für alle: In allen drei Reihen ist die linke Gruppe die größere (10 und 2, 10 und 9, 8 und 3).',
    },
    'K:patterns': {
      say: '„In jeder Reihe wiederholt sich ein Muster, immer zwei Bilder im Wechsel. Am Ende der Reihe fehlt ein Bild. Überlegt, was als Nächstes kommt, und kreist unten das richtige Bild ein.“',
      first: 'Sprechen Sie das erste Muster gemeinsam im Chor: Die Kinder zeigen auf jedes Bild und sagen dazu seinen Namen oder einfach seine Farbe („rot, gelb, rot, gelb“); die Früchte müssen sie nicht kennen. Am Fragezeichen halten alle an: „Was kommt jetzt?“ Kreisen Sie das Bild in der kleinen Reihe darunter gemeinsam ein.',
      stuck: 'Lassen Sie das Kind das Muster halblaut aufsagen und dabei mit dem Finger mitgehen; Farben genügen. Beim Sprechen hört es meist von selbst, wie es weitergeht. Zur Kontrolle auf dem Blatt für alle: In jeder Reihe kommt als Nächstes das Bild, mit dem die Reihe beginnt (die rote Frucht, die Heidelbeere und zweimal die aufgeschnittene orange Frucht).',
    },
    'K:pre-writing-strokes': {
      say: '„Heute machen wir Schwungübungen: gerade Linien, Zacken, Bögen und Türmchen. Fahrt jede Linie mit dem Stift nach, ganz ruhig und ohne abzusetzen. Ihr beginnt immer am orangen Punkt und folgt dem Pfeil bis zum Tier.“',
      first: 'Zeichnen Sie die Zacken groß an die Tafel und lassen Sie die Kinder die Bewegung erst mit dem Finger in der Luft mitmachen, dann mit dem Finger auf dem Blatt. Achten Sie darauf, dass alle den Stift locker halten. Die erste Linie fahren alle gemeinsam nach.',
      stuck: 'Lassen Sie das Kind die Linie zuerst mehrmals mit dem Finger nachfahren. Es darf langsam arbeiten; wichtig ist, dass der Stift auf der Linie bleibt, nicht dass es schnell geht. Wer fertig ist, zeichnet die Muster auf der Rückseite frei weiter.',
      byType: {
        'G1-429': {
          say: '„Auf diesem Blatt ist ein Bild aus lauter Pünktchen: ein Morgen in der Stadt. Fahrt die gepunkteten Linien mit dem Stift nach, ganz ruhig und genau. Dann seht ihr, was alles in der Stadt zu sehen ist.“',
          first: 'Betrachten Sie das Bild gemeinsam und lassen Sie die Kinder erzählen, was sie erkennen: die Sonne, eine Wolke, Häuser, einen Bus, ein Auto, einen Hund. Zeigen Sie an der Sonne, wie man eine Linie langsam nachfährt, ohne den Stift oft abzusetzen. Jedes Kind beginnt mit einem Teil, den es sich aussucht.',
          stuck: 'Das Kind fährt eine Linie zuerst mit dem Finger nach und dann mit dem Stift. Es muss nicht alles schaffen; lieber wenige Dinge genau als viele ungenau. Wer fertig ist, malt das Bild aus.',
        },
      },
    },
    'K:count-syllables': {
      say: '„Wörter kann man in Silben sprechen und dazu klatschen: To-ma-te, das sind drei Silben. Sprecht zu jedem Bild das Wort leise, klatscht die Silben und schreibt in das Kästchen, wie viele es sind.“',
      first: 'Benennen Sie zuerst alle Bilder gemeinsam, damit jedes Kind dasselbe Wort klatscht: Tür, Bär, Koralle, Domino, Mixer, Banane, Bus, Rakete. Klatschen Sie Tür und Koralle zusammen (eine Silbe und drei Silben) und schreiben Sie die Zahlen 1 und 3 an die Tafel. Wenn die Klasse Silben sonst schwingt oder Silbenbögen malt, darf sie das auch heute tun.',
      stuck: 'Sprechen Sie das Wort mit dem Kind in Silben und lassen Sie es bei jeder Silbe einen Schritt machen oder klatschen. Wer die Ziffer noch nicht schreiben kann, malt für jede Silbe einen Strich in das Kästchen. Zur Kontrolle auf dem Blatt für alle: Tür 1, Bär 1, Koralle 3, Domino 3, Mixer 2, Banane 3, Bus 1, Rakete 3.',
    },
    'K:letter-formation': {
      say: '„Auf diesem Blatt schreibt ihr große Buchstaben. Fahrt jeden Buchstaben nach: Ihr beginnt am orangen Punkt und folgt den Pfeilen. Am Ende der Zeile schreibt ihr den Buchstaben allein.“',
      first: 'Schreiben Sie das A groß an die Tafel und sprechen Sie die Bewegung mit: „schräg hinunter, schräg hinunter, Strich in der Mitte“. Die Kinder schreiben es mit dem Finger in die Luft. Dann fahren alle das erste A auf dem Blatt nach. Hat die Klasse einen Buchstaben anders schreiben gelernt, gilt die Schreibweise der Klasse. Einen Buchstaben, den die Klasse noch nicht geschrieben hat, spuren die Kinder nur nach.',
      stuck: 'Zeigen Sie dem Kind den orangen Punkt und fahren Sie den Buchstaben einmal mit seinem Finger nach. Kinder, die mit links schreiben, drehen das Blatt leicht nach rechts. Sauberkeit geht vor Tempo; niemand muss alle Zeilen schaffen.',
    },
    'K:category-odd-one-out': {
      say: '„In jeder Reihe sind fünf Formen. Vier davon gehören zusammen, eine passt nicht dazu. Schaut genau hin und kreist die Form ein, die nicht passt.“',
      first: 'Sehen Sie sich die erste Reihe gemeinsam an. Fragen Sie: „Welche Formen sind gleich? Welche ist anders?“ Lassen Sie ein Kind begründen, warum. Kreisen Sie die Form gemeinsam ein.',
      stuck: 'Das Kind zeigt nacheinander auf jede Form und sagt, wie sie aussieht. Die eine, die anders heißt, wird eingekreist. Zur Kontrolle auf dem Blatt für alle: Es passen nicht die Pyramide, der Kreis, das Oval und der Mond.',
    },
    'K:rhyme': {
      say: '„Reimwörter klingen am Ende gleich: Haus und Maus. In jedem Feld seht ihr zwei Bilder. Sprecht beide Wörter laut. Wenn sie sich reimen, kreist ihr den Haken ein. Wenn nicht, das Kreuz.“',
      first: 'Benennen Sie zuerst alle Bildpaare gemeinsam, damit jedes Kind dieselben Wörter spricht: Sand und Hand, Schwamm und Lamm, Haus und Zitrone, Hahn und Kahn, Bank und Kuh, Rose und Dose, Kreis und Eis, Lauch und Rakete. Sagen Sie drei Wörter ausdrücklich an, weil die Kinder die Bilder sonst anders nennen: Das Schaf heißt hier Lamm, das Schiff heißt Kahn, und das blaue Bild in Feld 7 zeigt Eis. Lösen Sie das erste Feld zusammen.',
      stuck: 'Sprechen Sie die beiden Wörter mit dem Kind deutlich nacheinander und fragen Sie: „Klingt das Ende gleich?“ Zur Kontrolle auf dem Blatt für alle: Es reimen sich die Paare 1, 2, 4, 6 und 7; die Paare 3, 5 und 8 reimen sich nicht.',
    },
  },
};
