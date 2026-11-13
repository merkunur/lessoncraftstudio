'use strict';
/**
 * Lehrerhinweise, Deutsch, Mathematik: die zwei Zufallsstunden des geplanten Schuljahres, die "Year pages P" möglich
 * gemacht hat (Daily Teaching System, Part 12.2): Sicher, möglich, unmöglich (Klasse 2) und Wahrscheinlicher oder
 * unwahrscheinlicher? (Klasse 3). Geschrieben nach den Arbeitsblättern der Stunden und von einer deutschen
 * Grundschullehrkraft mit den Blättern gelesen (2026-11-13). Die Hinweise sind so lang, wie das Blatt der Handreichung
 * trägt (build-guide.js prüft das): Was die Lehrkraft dazu ausführlicher schrieb, steht im Plan (PLAN.md, Year pages P).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'de',
  points: {
    '2:chance-certain-possible': {
      title: 'Sicher, möglich, unmöglich',
      objective: 'Die Kinder beschreiben Ergebnisse beim Ziehen aus einem Beutel mit den Wörtern sicher, möglich und unmöglich und prüfen eine Vermutung in einem Zufallsversuch mit Strichliste und Säulendiagramm.',
      note: {
        mistake: 'Viele Kinder kreuzen „sicher“ an, wenn fast alle Plättchen im Beutel gleich sind, und halten das einzelne andere Plättchen für unmöglich. Beim Versuch erwarten sie, dass die häufigste Sorte auf jeden Fall am häufigsten gezogen wird.',
        words: 'Fülle den Zufallsbeutel vor der Klasse mit 5 Kreisen: „Ist es sicher, möglich oder unmöglich, dass ich einen Kreis ziehe? Und einen Stern?“ Lege ein Quadrat dazu: „Was gilt jetzt? Sicher ist nur, was kommen muss, weil nichts anderes im Beutel liegt. Möglich heißt: Es kann kommen, muss aber nicht.“ Zieht 20-mal. Kommt das Quadrat kaum, frage: „Ist es deshalb unmöglich?“ Öffnet den Beutel: Es liegt darin, also ist es möglich.',
        watch: 'Auf dem Blatt für alle hat ein Beutel bis auf ein Plättchen nur gleiche: Wer dort „sicher“ ankreuzt, sucht das eine andere. Das leichtere Blatt hat kleinere Beutel und nur drei Sorten; auf dem schwereren malt das Kind in zwei leere Beutel je 6 Plättchen passend zu den Kreuzen (bei „sicher“ gibt es nur eine Lösung). Den Versuch macht die Klasse am Zufallsbeutel: Fülle ihn wie auf dem Bild des Versuchsblattes und stelle 20 Züge ein; die Kinder kreisen erst ihre Vermutung ein und führen die Strichliste. Zieht eine zweite Spur: Das Häufigste im Beutel kommt oft, aber nicht immer am häufigsten. Bei Gleichstand kreist das Kind beide ein. Das leichtere Versuchsblatt (zwei Sorten) und das schwerere (Würfeln, ein Würfel je Paar) sind eigene Versuche.',
      },
    },
    '3:chance-more-likely': {
      title: 'Wahrscheinlicher oder unwahrscheinlicher? Versuche mit dem Zufallsbeutel',
      objective: 'Die Kinder schätzen bei zwei Beuteln ein, aus welchem sie ein Plättchen wahrscheinlicher ziehen, begründen ihre Wahl mit der Anzahl der Plättchen und prüfen eine Vermutung in einem Versuch mit 20 Zügen am Zufallsbeutel.',
      note: {
        mistake: 'Liegen in beiden Beuteln gleich viele gesuchte Plättchen, halten viele Kinder die Chance für gleich groß: Sie übersehen, wie viele andere daneben liegen. Manche wählen einfach den volleren Beutel. Nach dem Versuch halten manche ihre Überlegung für falsch, weil das Ergebnis anders ausfiel.',
        words: 'Schreibe zwei Füllungen an die Tafel, Beutel 1 mit 8 Kreisen und 2 Quadraten, Beutel 2 mit 5 Kreisen und 5 Quadraten: „Bei welchem Beutel ist es wahrscheinlicher, einen Kreis zu ziehen? Woran siehst du das?“ Die Antwort nennt beide Beutel: „Bei Beutel 1, weil dort 8 von 10 Plättchen Kreise sind und bei Beutel 2 nur 5 von 10.“ Dann 3 Kreise unter 6 und 3 Kreise unter 10 Plättchen: „Gleich viele Kreise. Ist es deshalb gleich wahrscheinlich?“',
        watch: 'Auf dem Blatt für alle sind die Beutel eines Paares gleich groß und die Anzahlen nah beieinander: Das Kind muss zählen. Das leichtere Blatt hat große Unterschiede. Auf dem schwereren steht ein Kästchen unter dem Gleichheitszeichen: Ein Paar hat die gleiche Chance, eines gleich viele gesuchte Plättchen in verschieden großen Beuteln (zum Beispiel 4 von 6 und 4 von 8); dann kommt das gesuchte eher aus dem Beutel mit weniger anderen. Der Versuch läuft ohne Blatt am Zufallsbeutel: Die Klasse vermutet, bei welchem Tafel-Beutel der Kreis in 20 Zügen öfter kommt. Fülle Beutel 1, lass 20-mal ziehen, dann Beutel 2; die Kinder machen im Heft für jeden Kreis einen Strich in die Zeile des Beutels. Wiederholt es mit einem knappen Paar (7 und 8 von 10): Dort kann es anders ausgehen. Wahrscheinlicher heißt nicht sicher.',
      },
    },
  },
};
