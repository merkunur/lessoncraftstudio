// Batch 3: Generate German content for 5 matching apps
// matching, grid-match, shadow-match, bingo, picture-sort
var fs = require('fs');
var path = require('path');
var outDir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'de');

function toEsc(c) {
  var r = '';
  for (var i = 0; i < c.length; i++) {
    var code = c.charCodeAt(i);
    if (code > 127) r += String.fromCharCode(92) + 'u' + ('0000' + code.toString(16)).slice(-4);
    else r += c[i];
  }
  return r;
}
function buildFile(obj) {
  return "import type { AppDetailContent } from '../types';\n\nexport const content: AppDetailContent = " + JSON.stringify(obj, null, 2).replace(/"(\w+)":/g, '$1:') + ';\n';
}

function stdCommercialFaq(name) {
  return { question: toEsc('Kann ich die erstellten Arbeitsbl\u00e4tter kommerziell nutzen?'), answer: toEsc('Ja. Sowohl das Commercial Pack ($27) als auch das Full Access Pack ($47) enthalten eine kommerzielle Lizenz. Sie d\u00fcrfen Ihre erstellten Arbeitsbl\u00e4tter auf Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Ihrer eigenen Website und jeder anderen Plattform verkaufen. Jede Lizenz gilt f\u00fcr eine Person mit unbegrenzter Generierung.') };
}
function stdPricingFaq(name) {
  return { question: toEsc('Was ist der Unterschied zwischen Commercial Pack und Full Access Pack?'), answer: toEsc('Das Commercial Pack ($27) enth\u00e4lt den ' + name + ' mit kommerzieller Lizenz, beliebten Bildthemen und allen 11 Sprachen. Das Full Access Pack ($47) bietet zus\u00e4tzlich alle 104 Bildthemen, bevorzugten Zugang zu neuen Themen und alle zuk\u00fcnftigen Updates. Beide sind Einmalk\u00e4ufe ohne Abonnement.') };
}
function stdTryFaq() {
  return { question: toEsc('Kann ich den Generator vor dem Kauf testen?'), answer: toEsc('Ja, absolut. Der Generator ist sofort kostenlos nutzbar \u2014 ohne Registrierung. Die kostenlose Version enth\u00e4lt alle Funktionen, Modi und Einstellungen. Der einzige Unterschied ist ein kleines Wasserzeichen auf exportierten Dateien. Testen Sie alles, bevor Sie kaufen.') };
}
function stdLangFaq() {
  return { question: toEsc('Welche Sprachen werden unterst\u00fctzt?'), answer: toEsc('Die Benutzeroberfl\u00e4che unterst\u00fctzt 11 Sprachen: Deutsch, Englisch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch.') };
}
function stdRefundFaq() {
  return { question: toEsc('Wie ist Ihre R\u00fcckerstattungsrichtlinie?'), answer: toEsc('Aufgrund der digitalen Natur des Produkts sind alle Verk\u00e4ufe endg\u00fcltig. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Nutzen Sie die kostenlose Version, um alles vorher zu testen.') };
}
function stdThemeFaq() {
  return { question: toEsc('Wie viele Bildthemen sind verf\u00fcgbar?'), answer: toEsc('Das Full Access Pack enth\u00e4lt alle 104 illustrierten Themen \u2014 Tiere, Fahrzeuge, Lebensmittel, Natur, Sport, Musik, Jahreszeiten und mehr. Das Commercial Pack enth\u00e4lt eine kuratierte Auswahl beliebter Themen. Beide Pakete unterst\u00fctzen eigene Bild-Uploads.') };
}
function stdAnswerFaq() {
  return { question: toEsc('Werden L\u00f6sungsschl\u00fcssel automatisch erstellt?'), answer: toEsc('Ja. Jedes Arbeitsblatt wird mit einem passenden L\u00f6sungsschl\u00fcssel generiert. Der L\u00f6sungsschl\u00fcssel verwendet dasselbe Layout und Design und wird als separate Datei exportiert.') };
}

// ── MATCHING ──
var matching = {
  appId: 'matching',
  locale: 'de',
  category: 'matching',
  seo: {
    titleTag: toEsc('Zuordnungs-Arbeitsblatt Generator | Verbindungs\u00fcbungen Erstellen'),
    metaDescription: toEsc('Erstellen Sie druckbare Zuordnungs-Arbeitsbl\u00e4tter mit Linienverbindungen. 4 Zuordnungsmodi, 104 Themen, anpassbare Paaranzahl. Kostenloser Generator mit sofortigem PDF-Export.'),
    primaryKeyword: toEsc('Zuordnungs-Arbeitsblatt Generator'),
    secondaryKeywords: [
      toEsc('druckbare Zuordnungs\u00fcbungen'),
      toEsc('Verbindungs\u00fcbungen Ersteller'),
      toEsc('Linien-Zuordnung Arbeitsbl\u00e4tter'),
      toEsc('Zuordnungs\u00fcbungen f\u00fcr Kinder'),
      toEsc('Bild-Wort Zuordnung'),
    ],
    lsiKeywords: [
      toEsc('Verbinde die Paare'),
      toEsc('Anfangsbuchstaben Zuordnung'),
      toEsc('Bild-Wort Verbindung'),
      toEsc('Kindergarten Zuordnung'),
      toEsc('Vorschul-Zuordnungs\u00fcbungen'),
      toEsc('Feinmotorik Arbeitsbl\u00e4tter'),
      toEsc('Visuelle Unterscheidung'),
      toEsc('Paare verbinden \u00dcbungen'),
    ],
  },
  visuals: {
    heroImages: {
      primary: '/samples/english/matching/Match Up 1.jpeg',
      primaryAlt: toEsc('Zuordnungs-Arbeitsblatt mit bunten Bildern und Linien zum Verbinden der Paare f\u00fcr junge Lernende'),
    },
    sampleGallery: [
      { src: '/samples/english/matching/Match Up 1.jpeg', alt: toEsc('Zuordnungs-Arbeitsblatt mit Bild-Anfangsbuchstaben-Paaren im Linienverbindungsformat'), caption: toEsc('Bild-Anfangsbuchstaben-Modus') },
    ],
    youtubeId: 'y3ghkjt_67s',
    videoTitle: toEsc('So erstellen Sie Zuordnungs-Arbeitsbl\u00e4tter mit Bildern'),
  },
  hero: {
    title: toEsc('Zuordnungs-Arbeitsblatt Generator'),
    tagline: toEsc('Erstellen Sie Linienverbindungs-\u00dcbungen, die visuelle Unterscheidung und fr\u00fche Lesekompetenz f\u00f6rdern'),
    description: toEsc('Zuordnungs-Arbeitsbl\u00e4tter geh\u00f6ren zu den vielseitigsten Werkzeugen in der fr\u00fchkindlichen Bildung, und dieser Generator erstellt sie in Sekunden statt Stunden. Der Zuordnungs-Arbeitsblatt Generator erzeugt professionelle Linienverbindungs-\u00dcbungen, bei denen Sch\u00fcler Elemente in der linken Spalte mit ihren richtigen Partnern in der rechten Spalte verbinden. Ob Sie Bild-Anfangsbuchstaben-Paare, Bild-Wort-Kombinationen oder individuelle Wortzuordnungen ben\u00f6tigen \u2014 jedes Layout wird automatisch aus Ihren Einstellungen generiert.\n\nVier verschiedene Zuordnungsmodi decken ein breites Spektrum an Lernzielen ab. Der Modus Bild \u2014 Anfangsbuchstabe zeigt links ein Bild und rechts einen Buchstaben und f\u00f6rdert so Phonetik und Buchstabenerkennung. Der Modus Bild + Wort \u2014 Bild + Wort zeigt beschriftete Bilder auf beiden Seiten, ideal f\u00fcr den Wortschatzaufbau. Der Modus Bild/Wort \u2014 Bild/Wort wechselt zwischen Bildern und W\u00f6rtern f\u00fcr anspruchsvollere Unterscheidung. Der Modus Bild \u2014 Eigenes Wort l\u00e4sst Sie eigene Beschriftungen eingeben, perfekt f\u00fcr Rechtschreiblisten, Vokabeltests oder Fremdsprachen\u00fcbungen.\n\nSie bestimmen die Anzahl der Paare pro Arbeitsblatt \u2014 w\u00e4hlen Sie 4, 5 oder 6 \u2014 und schalten einzelne Optionen wie Aufz\u00e4hlungszeichen, Name- und Datumsfelder sowie die Sichtbarkeit der rechten Spalte pro Paar ein oder aus. Der integrierte Canvas-Editor erm\u00f6glicht die Feinabstimmung von Farben, Schriften, R\u00e4ndern und Positionen vor dem Export als hochaufl\u00f6sendes JPEG oder druckfertiges PDF. Jedes Arbeitsblatt enth\u00e4lt einen automatisch generierten L\u00f6sungsschl\u00fcssel.\n\nW\u00e4hlen Sie aus 104 professionell illustrierten Bildthemen \u2014 Tiere, Fahrzeuge, Lebensmittel, Natur und Dutzende weitere Kategorien. Die kostenlose Version bietet volle Funktionalit\u00e4t mit Wasserzeichen \u2014 testen Sie alle Funktionen jetzt ohne Anmeldung oder Zahlungsinformationen.'),
  },
  howItWorks: {
    title: toEsc('Erstellen Sie Ihr Zuordnungs-Arbeitsblatt in 5 Schritten'),
    steps: [
      { title: toEsc('W\u00e4hlen Sie den Zuordnungsmodus'), description: toEsc('W\u00e4hlen Sie aus vier Modi: Bild \u2014 Anfangsbuchstabe f\u00fcr Phonetik\u00fcbungen, Bild + Wort \u2014 Bild + Wort f\u00fcr Wortschatztraining, Bild/Wort \u2014 Bild/Wort f\u00fcr gemischte Unterscheidung, oder Bild \u2014 Eigenes Wort f\u00fcr Rechtschreiblisten und individuelle Tests.') },
      { title: toEsc('Paaranzahl und Optionen festlegen'), description: toEsc('W\u00e4hlen Sie 4, 5 oder 6 Zuordnungspaare pro Arbeitsblatt. Schalten Sie Aufz\u00e4hlungszeichen ein oder aus, f\u00fcgen Sie Name- und Datumsfelder hinzu und steuern Sie die Sichtbarkeit jedes rechten Spaltenelements f\u00fcr zus\u00e4tzliche Herausforderung.') },
      { title: toEsc('Thema und Layout w\u00e4hlen'), description: toEsc('Durchst\u00f6bern Sie 104 Bildthemen nach Kategorie \u2014 Tiere, Lebensmittel, Fahrzeuge, Jahreszeiten und mehr. W\u00e4hlen Sie Seitengr\u00f6\u00dfe, Ausrichtung und Schriftart. Der Generator erstellt automatisch ein \u00fcbersichtliches Zwei-Spalten-Layout.') },
      { title: toEsc('Im Canvas-Editor anpassen'), description: toEsc('Verfeinern Sie Ihr Arbeitsblatt mit dem integrierten Editor. F\u00fcgen Sie Anweisungen oder Titel hinzu, \u00e4ndern Sie Hintergrundfarben, wenden Sie R\u00e4nder an und positionieren Sie Elemente per Drag-and-Drop.') },
      { title: toEsc('Exportieren und Drucken'), description: toEsc('Laden Sie Ihr fertiges Arbeitsblatt als hochaufl\u00f6sendes JPEG oder druckfertiges PDF herunter. Ein L\u00f6sungsschl\u00fcssel mit Verbindungslinien wird automatisch als separate Datei generiert.') },
    ],
  },
  features: [
    { title: toEsc('Vier Zuordnungsmodi f\u00fcr verschiedene F\u00e4higkeiten'), description: toEsc('Bild \u2014 Anfangsbuchstabe verbindet Bilder mit ihrem Anfangsbuchstaben f\u00fcr Phonetik\u00fcbungen. Bild + Wort \u2014 Bild + Wort zeigt beschriftete Bilder auf beiden Seiten f\u00fcr Wortschatzaufbau. Bild/Wort \u2014 Bild/Wort wechselt zuf\u00e4llig f\u00fcr anspruchsvollere Unterscheidung. Bild \u2014 Eigenes Wort erm\u00f6glicht beliebigen Text f\u00fcr Rechtschreibtests und Fremdsprachen\u00fcbungen.') },
    { title: toEsc('Flexible Paaranzahl: 4, 5 oder 6'), description: toEsc('W\u00e4hlen Sie die Anzahl der Zuordnungspaare pro Arbeitsblatt. Vier Paare eignen sich f\u00fcr j\u00fcngere Kinder. F\u00fcnf Paare bieten eine Standard-\u00dcbungsl\u00e4nge. Sechs Paare fordern \u00e4ltere Sch\u00fcler heraus. Jede Paaranzahl erzeugt ein ausgewogenes, gut lesbares Layout.') },
    { title: toEsc('Sichtbarkeitssteuerung pro Paar'), description: toEsc('Steuern Sie f\u00fcr jedes einzelne Paar, ob die Antwort in der rechten Spalte sichtbar oder verborgen ist. Zeigen Sie alle Antworten f\u00fcr Standard-Zuordnung, verbergen Sie einige f\u00fcr gemischte Schwierigkeit oder alle f\u00fcr eine fortgeschrittene Erinnerungs\u00fcbung.') },
    { title: toEsc('104 illustrierte Bildthemen'), description: toEsc('Jedes Thema enth\u00e4lt professionell gezeichnete Bilder f\u00fcr die Zuordnungsspalten. W\u00e4hlen Sie aus Kategorien wie Bauernhoftiere, Meerestiere, Fahrzeuge, Obst, Sportger\u00e4te und saisonale Motive.') },
    { title: toEsc('Name-, Datum- und Aufz\u00e4hlungszeichen-Optionen'), description: toEsc('F\u00fcgen Sie mit einem Klick Sch\u00fclername und Datum oben auf jedem Arbeitsblatt hinzu. Schalten Sie Aufz\u00e4hlungszeichen ein oder aus, um Sch\u00fcler entlang der Zuordnungszeilen zu f\u00fchren.') },
    { title: toEsc('Vollst\u00e4ndiger Canvas-Editor mit Ebenensteuerung'), description: toEsc('F\u00fcgen Sie eigenen Text mit anpassbarer Schrift, Gr\u00f6\u00dfe, Farbe und Umriss hinzu. \u00c4ndern Sie Hintergr\u00fcnde, wenden Sie dekorative R\u00e4nder an und nutzen Sie Ausrichtungswerkzeuge, Ebenensteuerung, Zoom und R\u00fcckg\u00e4ngig.') },
    { title: toEsc('Automatisch generierte L\u00f6sungsschl\u00fcssel'), description: toEsc('Jedes Zuordnungs-Arbeitsblatt wird mit einem passenden L\u00f6sungsschl\u00fcssel generiert, der die korrekten Verbindungslinien zwischen den Paaren zeigt.') },
    { title: toEsc('Doppelexport: JPEG und PDF'), description: toEsc('Exportieren Sie als hochaufl\u00f6sendes JPEG oder druckfertiges PDF. JPEG eignet sich f\u00fcr digitale Nutzung und Vorschaubilder. PDF liefert scharfe Ergebnisse f\u00fcr den Klassenzimmerdruck und KDP-Innenteile.') },
  ],
  businessUseCases: [
    { title: toEsc('Zuordnungs-Pakete auf Etsy verkaufen'), description: toEsc('Erstellen Sie thematische Zuordnungspakete \u2014 10 Tier-Zuordnungsbl\u00e4tter, 10 Lebensmittel-Zuordnungsbl\u00e4tter, 10 saisonale Zuordnungsbl\u00e4tter \u2014 als Sofort-Download digitale Produkte. Zuordnungs-Arbeitsbl\u00e4tter sind bei Vorschul- und Kindergartenlehrern beliebt.'), platform: 'Etsy' },
    { title: toEsc('KDP-Zuordnungs-Aktivit\u00e4tsb\u00fccher ver\u00f6ffentlichen'), description: toEsc('Stellen Sie 50\u2013100 Zuordnungs-Arbeitsbl\u00e4tter zu thematischen Aktivit\u00e4tsb\u00fcchern zusammen. Ein Buch wie \u201eVorschul-Zuordnungsspa\u00df\u201c zielt auf meistgesuchte Keywords ab. L\u00f6sungsschl\u00fcssel im Anhang machen das Produkt komplett.'), platform: 'Amazon KDP' },
    { title: toEsc('Phonetik-Pakete f\u00fcr TPT erstellen'), description: toEsc('Verwenden Sie den Bild \u2014 Anfangsbuchstabe-Modus f\u00fcr differenzierte Phonetik-Zuordnungspakete. Ein Set f\u00fcr Konsonanten, eines f\u00fcr Vokale, ein drittes f\u00fcr Lautverbindungen. TPT-K\u00e4ufer suchen aktiv nach Zuordnungs- und Phonetikressourcen.'), platform: 'Teachers Pay Teachers' },
    { title: toEsc('Saisonale Zuordnungs-Sets gestalten'), description: toEsc('Erstellen Sie feiertagsspezifische Zuordnungssammlungen mit thematischen Bildern: K\u00fcrbisse f\u00fcr Halloween, Schneeflocken f\u00fcr Winter, Herzen f\u00fcr Valentinstag, Blumen f\u00fcr Fr\u00fchling.'), platform: 'Multi-platform' },
    { title: toEsc('Vokabel-Zuordnungs-Curriculum starten'), description: toEsc('Verwenden Sie den Bild \u2014 Eigenes Wort-Modus f\u00fcr w\u00f6chentliche Vokabel-Zuordnungs-Arbeitsbl\u00e4tter. 36 Wochen Zuordnungs\u00fcbungen als progressives Curriculum f\u00fcr Homeschool-Familien oder Nachhilfezentren.'), platform: 'Gumroad' },
  ],
  faq: [
    { question: toEsc('Welche Zuordnungsmodi bietet der Generator?'), answer: toEsc('Der Generator umfasst vier Modi: Bild \u2014 Anfangsbuchstabe verbindet Bilder mit ihrem Anfangsbuchstaben f\u00fcr Phonetik. Bild + Wort \u2014 Bild + Wort zeigt beschriftete Bilder auf beiden Seiten f\u00fcr Wortschatz. Bild/Wort \u2014 Bild/Wort wechselt f\u00fcr anspruchsvollere Unterscheidung. Bild \u2014 Eigenes Wort erm\u00f6glicht beliebigen rechten Spaltentext.') },
    { question: toEsc('Wie viele Paare kann ich pro Arbeitsblatt verwenden?'), answer: toEsc('Sie k\u00f6nnen 4, 5 oder 6 Zuordnungspaare pro Arbeitsblatt w\u00e4hlen. Vier Paare eignen sich f\u00fcr j\u00fcngere Kinder, f\u00fcnf bieten eine Standard-\u00dcbungsl\u00e4nge und sechs fordern \u00e4ltere Sch\u00fcler heraus.') },
    { question: toEsc('Kann ich Antworten f\u00fcr zus\u00e4tzliche Herausforderung ausblenden?'), answer: toEsc('Ja. Die Sichtbarkeitssteuerung pro Paar l\u00e4sst Sie jede Antwort einzeln ein- oder ausblenden. Zeigen Sie alle f\u00fcr Standard-Zuordnung, blenden Sie einige f\u00fcr gemischte Schwierigkeit aus oder alle f\u00fcr eine fortgeschrittene Erinnerungs\u00fcbung.') },
    stdThemeFaq(),
    stdAnswerFaq(),
    stdCommercialFaq('Zuordnungs-Generator'),
    stdPricingFaq('Zuordnungs-Generator'),
    stdTryFaq(),
    { question: toEsc('Welche Seitengr\u00f6\u00dfen und Formate werden unterst\u00fctzt?'), answer: toEsc('W\u00e4hlen Sie aus US Letter (8,5 \u00d7 11 Zoll), A4 oder benutzerdefinierten Ma\u00dfen. Hoch- und Querformat sind verf\u00fcgbar. Export als hochaufl\u00f6sendes JPEG oder druckfertiges PDF in professioneller Druckqualit\u00e4t.') },
    stdLangFaq(),
    stdRefundFaq(),
  ],
  internalLinks: [
    { slug: 'grid-match', pageType: 'app', anchorText: toEsc('Gitterr\u00e4tsel Generator') },
    { slug: 'shadow-match', pageType: 'app', anchorText: toEsc('Schatten-Zuordnung Generator') },
    { slug: 'bingo', pageType: 'app', anchorText: 'Bingo-Karten Generator' },
    { slug: 'picture-sort', pageType: 'app', anchorText: toEsc('Bilder-Sortierung Generator') },
    { slug: 'matching', pageType: 'tool', anchorText: toEsc('Zuordnungs-Generator kostenlos testen') },
    { slug: 'matching-bundle', pageType: 'bundle', anchorText: toEsc('Zuordnungs-Bundle \u2014 Alle 5 Generatoren zum Sparpreis') },
    { slug: 'create-matching-worksheets', pageType: 'guide', anchorText: toEsc('So erstellen Sie Zuordnungs-Arbeitsbl\u00e4tter zum Verkaufen') },
    { slug: 'sell-educational-printables-etsy', pageType: 'guide', anchorText: toEsc('Lern-Druckvorlagen auf Etsy verkaufen') },
    { slug: 'preschool-printable-ideas', pageType: 'idea', anchorText: toEsc('Vorschul-Druckvorlagen Nischenideen') },
    { slug: 'etsy-printable-business', pageType: 'start', anchorText: toEsc('Starten Sie Ihr Etsy Druckvorlagen-Gesch\u00e4ft') },
  ],
};

// ── GRID-MATCH ──
var gridMatch = {
  appId: 'grid-match',
  locale: 'de',
  category: 'matching',
  seo: {
    titleTag: toEsc('Gitterr\u00e4tsel Generator | Logik-Gitter-R\u00e4tsel Erstellen'),
    metaDescription: toEsc('Erstellen Sie druckbare Gitterr\u00e4tsel mit Hinweiszellen und visuellem Feedback. 2\u00d72 bis 4\u00d74 Gitter, 104 Themen, L\u00f6sungsschl\u00fcssel. Kostenloser Generator mit sofortigem PDF-Export.'),
    primaryKeyword: toEsc('Gitterr\u00e4tsel Generator'),
    secondaryKeywords: [
      toEsc('Gitter-Logik-R\u00e4tsel f\u00fcr Kinder'),
      toEsc('druckbare Gitterr\u00e4tsel'),
      toEsc('Gitter-Zuordnung Arbeitsbl\u00e4tter'),
      toEsc('visuelle Gitter-R\u00e4tsel'),
      toEsc('Logik-R\u00e4tsel Generator'),
    ],
    lsiKeywords: [
      toEsc('gitterbasierte R\u00e4tsel'),
      toEsc('r\u00e4umliches Denken \u00dcbungen'),
      toEsc('Hinweiszellen-R\u00e4tsel'),
      toEsc('visuelle Logik Aktivit\u00e4ten'),
      toEsc('Muster-Zuordnung Gitter'),
      toEsc('kritisches Denken Arbeitsbl\u00e4tter'),
      toEsc('kognitive F\u00e4higkeiten R\u00e4tsel'),
      toEsc('Vorschul-Gitter-\u00dcbungen'),
    ],
  },
  visuals: {
    heroImages: {
      primary: '/samples/english/grid match/Grid Match (1).jpeg',
      primaryAlt: toEsc('Gitterr\u00e4tsel-Arbeitsblatt mit bunten Bild-Hinweisen und leeren Zellen zum L\u00f6sen'),
    },
    sampleGallery: [
      { src: '/samples/english/grid match/Grid Match (1).jpeg', alt: toEsc('Gitterr\u00e4tsel mit Tier-Thema und Hinweiszellen auf einem quadratischen Gitter'), caption: toEsc('Tier-Thema Gitterr\u00e4tsel') },
    ],
    youtubeId: 'RGtED1Bnut8',
    videoTitle: toEsc('So erstellen Sie Gitterr\u00e4tsel mit Bildern'),
  },
  hero: {
    title: toEsc('Gitterr\u00e4tsel Generator'),
    tagline: toEsc('Erstellen Sie gitterbasierte Zuordnungsr\u00e4tsel, die r\u00e4umliches Denken und logisches Schlussfolgern f\u00f6rdern'),
    description: toEsc('Gitterr\u00e4tsel fordern Sch\u00fcler heraus, ein Gitter auszuf\u00fcllen, indem sie Bild-Hinweiszellen nutzen, um zu erschlie\u00dfen, was in jede leere Zelle geh\u00f6rt. Anders als einfache Linien-Zuordnungs\u00fcbungen erfordern Gitterr\u00e4tsel r\u00e4umliches Denken, Mustererkennung und Ausschlusslogik \u2014 F\u00e4higkeiten, die direkt auf Mathematik und Naturwissenschaften \u00fcbertragbar sind. Dieser Generator erstellt professionelle Gitterr\u00e4tsel in Sekunden, komplett mit Hinweiszellen, visuellem Feedback bei falschen Antworten und automatisch generierten L\u00f6sungsschl\u00fcsseln.\n\nW\u00e4hlen Sie Ihre Gittergr\u00f6\u00dfe von 2\u00d72 bis 4\u00d74 \u2014 immer ein perfektes Quadrat \u2014 und legen Sie die Anzahl der Hinweiszellen von 1 bis 5 fest. Hinweiszellen zeigen Bilder, die bereits im Gitter platziert sind. Weniger Hinweiszellen bedeuten schwierigere R\u00e4tsel, da Sch\u00fcler mehr Positionen durch Logik allein erschlie\u00dfen m\u00fcssen.\n\nDer Generator nutzt 104 professionell illustrierte Bildthemen. Der integrierte Canvas-Editor erm\u00f6glicht die Anpassung von Farben, Schriften, R\u00e4ndern und Positionen vor dem Export als hochaufl\u00f6sendes JPEG oder druckfertiges PDF. Die kostenlose Version bietet volle Funktionalit\u00e4t mit Wasserzeichen \u2014 testen Sie alle Gittergr\u00f6\u00dfen und Themen ohne Anmeldung.'),
  },
  howItWorks: {
    title: toEsc('Erstellen Sie Ihr Gitterr\u00e4tsel in 5 Schritten'),
    steps: [
      { title: toEsc('Gittergr\u00f6\u00dfe w\u00e4hlen'), description: toEsc('W\u00e4hlen Sie ein Gitter von 2\u00d72 (4 Zellen) bis 4\u00d74 (16 Zellen). Kleinere Gitter eignen sich f\u00fcr j\u00fcngere Kinder. Gr\u00f6\u00dfere Gitter bieten eine echte Logik-Herausforderung f\u00fcr \u00e4ltere Sch\u00fcler.') },
      { title: toEsc('Hinweiszellen festlegen'), description: toEsc('W\u00e4hlen Sie 1 bis 5 vorgef\u00fcllte Zellen. Mehr Hinweiszellen machen das R\u00e4tsel leichter. Weniger Hinweiszellen erh\u00f6hen die Schwierigkeit und erfordern tieferes logisches Denken.') },
      { title: toEsc('Thema und Layout w\u00e4hlen'), description: toEsc('Durchst\u00f6bern Sie 104 Bildthemen nach Kategorie. Der Generator weist Bilder aus Ihrem gew\u00e4hlten Thema den Gitterpositionen zu und erstellt das R\u00e4tsel-Layout automatisch.') },
      { title: toEsc('Im Canvas-Editor anpassen'), description: toEsc('Verfeinern Sie Ihr R\u00e4tsel mit dem integrierten Editor. F\u00fcgen Sie Titel oder Anweisungen hinzu, \u00e4ndern Sie Gitter- und Hintergrundfarben und wenden Sie R\u00e4nder an.') },
      { title: toEsc('Exportieren und Drucken'), description: toEsc('Laden Sie das R\u00e4tsel als hochaufl\u00f6sendes JPEG oder druckfertiges PDF herunter. Ein L\u00f6sungsschl\u00fcssel mit allen L\u00f6sungspositionen wird als separate Datei generiert.') },
    ],
  },
  features: [
    { title: toEsc('Skalierbare Gittergr\u00f6\u00dfen von 2\u00d72 bis 4\u00d74'), description: toEsc('Jedes Gitter ist ein perfektes Quadrat, von einem einfachen 2\u00d72 mit 4 Zellen bis zu einem anspruchsvollen 4\u00d74 mit 16 Zellen. Das 2\u00d72-Gitter f\u00fchrt Vorschulkinder an das Konzept heran. Das 3\u00d73-Gitter eignet sich f\u00fcr Kindergarten und erste Klasse. Das 4\u00d74-Gitter fordert \u00e4ltere Sch\u00fcler.') },
    { title: toEsc('Einstellbare Hinweiszellen (1\u20135)'), description: toEsc('Steuern Sie die R\u00e4tsel-Schwierigkeit durch die Anzahl der vorgef\u00fcllten Zellen. F\u00fcnf Hinweiszellen auf einem 4\u00d74-Gitter sind perfekt f\u00fcr Anf\u00e4nger. Eine Hinweiszelle auf demselben Gitter ist eine echte Logik-Herausforderung.') },
    { title: toEsc('Visuelles Feedback bei falschen Antworten'), description: toEsc('Bei digitaler Nutzung l\u00f6sen falsche Platzierungen sofort visuelles Feedback aus. Diese Selbstkorrektur-Funktion l\u00e4sst Sch\u00fcler in Echtzeit aus Fehlern lernen.') },
    { title: toEsc('104 illustrierte Bildthemen'), description: toEsc('Jedes Thema bietet professionell gezeichnete Bilder, die auch bei Gitterzellengr\u00f6\u00dfe klar erkennbar sind. W\u00e4hlen Sie aus Tieren, Fahrzeugen, Lebensmitteln, Natur, Sport und mehr.') },
    stdAnswerFaq().question ? { title: toEsc('Automatisch generierte L\u00f6sungsschl\u00fcssel'), description: toEsc('Jedes R\u00e4tsel wird mit einem passenden L\u00f6sungsschl\u00fcssel generiert, der das korrekte Bild in jeder Zelle zeigt.') } : {},
    { title: toEsc('Vollst\u00e4ndiger Canvas-Editor mit Ebenensteuerung'), description: toEsc('F\u00fcgen Sie eigenen Text hinzu, \u00e4ndern Sie Hintergr\u00fcnde, wenden Sie dekorative R\u00e4nder an und nutzen Sie Ausrichtungswerkzeuge, Ebenensteuerung, Zoom und R\u00fcckg\u00e4ngig.') },
    { title: toEsc('Doppelexport: JPEG und PDF'), description: toEsc('Exportieren Sie R\u00e4tsel als hochaufl\u00f6sendes JPEG oder druckfertiges PDF. JPEG f\u00fcr digitale Nutzung und Listing-Vorschaubilder. PDF f\u00fcr Klassenzimmerdruck und KDP-Innenteile.') },
    { title: toEsc('7 professionelle Schriftarten'), description: toEsc('W\u00e4hlen Sie aus sieben Schriftarten, die f\u00fcr verschiedene Altersgruppen optimiert sind. Gro\u00dfe, klare Buchstabenformen f\u00fcr junge Kinder bis hin zu kompakteren Stilen f\u00fcr \u00e4ltere Sch\u00fcler.') },
  ],
  businessUseCases: [
    { title: toEsc('Gitterr\u00e4tsel-Pakete auf Etsy verkaufen'), description: toEsc('Erstellen Sie thematische Gitterr\u00e4tsel-Pakete in mehreren Schwierigkeitsgraden \u2014 leicht (2\u00d72, 5 Hinweise), mittel (3\u00d73, 3 Hinweise), schwer (4\u00d74, 1 Hinweis) \u2014 als Sofort-Download Produkte.'), platform: 'Etsy' },
    { title: toEsc('KDP-Logikr\u00e4tsel-B\u00fccher ver\u00f6ffentlichen'), description: toEsc('Stellen Sie 50\u2013100 Gitterr\u00e4tsel zu thematischen R\u00e4tselb\u00fcchern zusammen. \u201eGitter-Logik-R\u00e4tsel f\u00fcr Kinder\u201c zielt auf K\u00e4ufer, die mehr als Ausmalb\u00fccher suchen. Progressive Schwierigkeit und L\u00f6sungsschl\u00fcssel im Anhang.'), platform: 'Amazon KDP' },
    { title: toEsc('Kritisches Denken-Pakete f\u00fcr TPT erstellen'), description: toEsc('Lehrer suchen auf TPT nach Logik- und kritischem Denken-Aktivit\u00e4ten. Erstellen Sie differenzierte Gitterr\u00e4tsel-Sets nach Schwierigkeit mit L\u00f6sungsschl\u00fcsseln und Lehreranleitungen.'), platform: 'Teachers Pay Teachers' },
    { title: toEsc('Saisonale Gitterr\u00e4tsel-Sammlungen'), description: toEsc('Nutzen Sie thematische Bilder f\u00fcr feiertagsspezifische Gitterr\u00e4tsel-Sets: K\u00fcrbisse f\u00fcr Halloween, Schneeflocken f\u00fcr Winter, Herzen f\u00fcr Valentinstag.'), platform: 'Multi-platform' },
    { title: toEsc('W\u00f6chentliches R\u00e4tsel-Abonnement auf Gumroad starten'), description: toEsc('Liefern Sie jede Woche neue Gitterr\u00e4tsel-Sets \u00fcber Gumroad. Jede Woche ein anderes Thema und progressive Schwierigkeit. Eltern und Nachhilfezentren sch\u00e4tzen regelm\u00e4\u00dfig neuen Inhalt.'), platform: 'Gumroad' },
  ],
  faq: [
    { question: toEsc('Welche Gittergr\u00f6\u00dfen unterst\u00fctzt der Generator?'), answer: toEsc('Der Generator unterst\u00fctzt quadratische Gitter von 2\u00d72 (4 Zellen) bis 4\u00d74 (16 Zellen). Kleinere Gitter eignen sich f\u00fcr j\u00fcngere Kinder, w\u00e4hrend 4\u00d74-Gitter echte Logik-Herausforderungen bieten.') },
    { question: toEsc('Wie funktionieren Hinweiszellen?'), answer: toEsc('Hinweiszellen sind Gitterpositionen, die bereits mit einem Bild gef\u00fcllt sind. Sie geben Sch\u00fclern Ausgangsinformationen zum Erschlie\u00dfen der restlichen Positionen. Sie k\u00f6nnen 1 bis 5 Hinweiszellen pro R\u00e4tsel festlegen.') },
    { question: toEsc('Was ist die visuelle Feedback-Funktion?'), answer: toEsc('Bei digitaler Nutzung l\u00f6sen falsche Bildplatzierungen sofort visuelles Feedback aus, das den Fehler hervorhebt. So k\u00f6nnen Sch\u00fcler in Echtzeit aus Fehlern lernen.') },
    stdThemeFaq(),
    stdAnswerFaq(),
    stdCommercialFaq('Gitterr\u00e4tsel-Generator'),
    stdPricingFaq('Gitterr\u00e4tsel-Generator'),
    stdTryFaq(),
    { question: toEsc('Welche Seitengr\u00f6\u00dfen und Formate werden unterst\u00fctzt?'), answer: toEsc('W\u00e4hlen Sie aus US Letter (8,5 \u00d7 11 Zoll), A4 oder benutzerdefinierten Ma\u00dfen. Hoch- und Querformat sind verf\u00fcgbar. Export als hochaufl\u00f6sendes JPEG oder druckfertiges PDF.') },
    stdLangFaq(),
    stdRefundFaq(),
  ],
  internalLinks: [
    { slug: 'matching', pageType: 'app', anchorText: toEsc('Zuordnungs-Arbeitsblatt Generator') },
    { slug: 'shadow-match', pageType: 'app', anchorText: toEsc('Schatten-Zuordnung Generator') },
    { slug: 'bingo', pageType: 'app', anchorText: 'Bingo-Karten Generator' },
    { slug: 'picture-sort', pageType: 'app', anchorText: toEsc('Bilder-Sortierung Generator') },
    { slug: 'grid-match', pageType: 'tool', anchorText: toEsc('Gitterr\u00e4tsel Generator kostenlos testen') },
    { slug: 'matching-bundle', pageType: 'bundle', anchorText: toEsc('Zuordnungs-Bundle \u2014 Alle 5 Generatoren zum Sparpreis') },
    { slug: 'create-matching-worksheets', pageType: 'guide', anchorText: toEsc('So erstellen Sie Zuordnungs-Arbeitsbl\u00e4tter zum Verkaufen') },
    { slug: 'publish-puzzle-books-kdp', pageType: 'guide', anchorText: toEsc('R\u00e4tselb\u00fccher auf Amazon KDP ver\u00f6ffentlichen') },
    { slug: 'kindergarten-printable-ideas', pageType: 'idea', anchorText: toEsc('Kindergarten Druckvorlagen Nischenideen') },
    { slug: 'create-worksheets-that-sell', pageType: 'start', anchorText: toEsc('Arbeitsbl\u00e4tter erstellen, die sich verkaufen') },
  ],
};

// Fix the features array for grid-match (had a bad inline expression)
gridMatch.features[4] = { title: toEsc('Automatisch generierte L\u00f6sungsschl\u00fcssel'), description: toEsc('Jedes R\u00e4tsel wird mit einem passenden L\u00f6sungsschl\u00fcssel generiert, der das korrekte Bild in jeder Zellenposition zeigt.') };

// ── SHADOW-MATCH ──
var shadowMatch = {
  appId: 'shadow-match',
  locale: 'de',
  category: 'matching',
  seo: {
    titleTag: toEsc('Schatten-Zuordnung Generator | Silhouetten-\u00dcbungen'),
    metaDescription: toEsc('Erstellen Sie druckbare Schatten-Zuordnungs-Arbeitsbl\u00e4tter mit Silhouetten-Paaren. 4\u20136 Paare pro Blatt, 104 Themen, Linienverbindungsformat. Kostenloser Generator mit PDF-Export.'),
    primaryKeyword: toEsc('Schatten-Zuordnung Arbeitsblatt Generator'),
    secondaryKeywords: [
      toEsc('Schatten-Zuordnungs\u00fcbungen f\u00fcr Kinder'),
      toEsc('Silhouetten-Zuordnung Arbeitsbl\u00e4tter'),
      toEsc('druckbare Schatten-\u00dcbungen'),
      toEsc('Schattenr\u00e4tsel Ersteller'),
      toEsc('visuelle Wahrnehmung \u00dcbungen'),
    ],
    lsiKeywords: [
      toEsc('visuelle Wahrnehmung Arbeitsbl\u00e4tter'),
      toEsc('Silhouettenerkennung'),
      toEsc('Schatten-Identifikation'),
      toEsc('Vorschul-Zuordnungsspiele'),
      toEsc('visuelle Unterscheidung'),
      toEsc('Formerkennung Arbeitsbl\u00e4tter'),
      toEsc('Beobachtungsf\u00e4higkeiten'),
      toEsc('Figur-Grund-Wahrnehmung'),
    ],
  },
  visuals: {
    heroImages: {
      primary: '/samples/english/shadow match/shadow-match-horizontal.jpeg',
      primaryAlt: toEsc('Schatten-Zuordnungs-Arbeitsblatt mit farbigen Bildern links und ihren Silhouetten rechts'),
    },
    sampleGallery: [
      { src: '/samples/english/shadow match/shadow-match-horizontal.jpeg', alt: toEsc('Schatten-Zuordnung mit Tierbildern und abgedunkelten Silhouetten'), caption: toEsc('Tier-Schatten-Zuordnung') },
    ],
    youtubeId: 'TYvUXJeMI98',
    videoTitle: toEsc('So erstellen Sie Schatten-Zuordnungs-Arbeitsbl\u00e4tter'),
  },
  hero: {
    title: toEsc('Schatten-Zuordnung Generator'),
    tagline: toEsc('Erstellen Sie Silhouetten-Zuordnungs\u00fcbungen, die visuelle Wahrnehmung und Formerkennung f\u00f6rdern'),
    description: toEsc('Schatten-Zuordnung ist eine der effektivsten Methoden zur Entwicklung der visuellen Wahrnehmung bei jungen Kindern. Sch\u00fcler betrachten ein detailliertes, farbiges Bild links und identifizieren den passenden Schatten oder die Silhouette rechts, dann zeichnen sie eine Verbindungslinie zwischen dem Paar. Diese \u00dcbung st\u00e4rkt die Figur-Grund-Wahrnehmung, Formerkennung und Detailaufmerksamkeit \u2014 grundlegende F\u00e4higkeiten f\u00fcr Lesen, Schreiben und Mathematik.\n\nDer Generator verarbeitet jedes ausgew\u00e4hlte Bild automatisch durch invertierte und abgedunkelte Verarbeitung, um realistische Silhouetten zu erstellen. Jeder Schatten bewahrt Umriss und Proportionen des Originalbildes, entfernt aber Farbe und innere Details. Sch\u00fcler m\u00fcssen sich auf Gesamtform, charakteristische Merkmale und relative Proportionen konzentrieren.\n\nW\u00e4hlen Sie 4, 5 oder 6 Zuordnungspaare pro Arbeitsblatt. Die linke Spalte zeigt vollfarbige Bilder, die rechte Spalte ihre Schatten in gemischter Reihenfolge. Der integrierte Canvas-Editor erm\u00f6glicht Anpassungen vor dem Export als JPEG oder PDF. Die kostenlose Version bietet alle Funktionen mit Wasserzeichen \u2014 testen Sie jedes Thema und jede Einstellung jetzt ohne Anmeldung.'),
  },
  howItWorks: {
    title: toEsc('Erstellen Sie Ihr Schatten-Zuordnungs-Arbeitsblatt in 5 Schritten'),
    steps: [
      { title: toEsc('Thema ausw\u00e4hlen'), description: toEsc('Durchst\u00f6bern Sie 104 Bildthemen nach Kategorie. W\u00e4hlen Sie ein Thema mit markanten Formen f\u00fcr die beste Schatten-Zuordnungserfahrung.') },
      { title: toEsc('Paaranzahl festlegen'), description: toEsc('W\u00e4hlen Sie 4, 5 oder 6 Zuordnungspaare pro Arbeitsblatt. Vier Paare f\u00fcr Vorschulkinder, f\u00fcnf f\u00fcr Standard-\u00dcbungen, sechs f\u00fcr eine l\u00e4ngere Herausforderung.') },
      { title: toEsc('Layout-Optionen konfigurieren'), description: toEsc('W\u00e4hlen Sie Seitengr\u00f6\u00dfe, Ausrichtung und Schriftart. Der Generator ordnet farbige Bilder links und automatisch gerenderte Schatten rechts an.') },
      { title: toEsc('Im Canvas-Editor anpassen'), description: toEsc('F\u00fcgen Sie Anweisungen oder Titel hinzu, \u00e4ndern Sie Farben, wenden Sie R\u00e4nder an und positionieren Sie Elemente per Drag-and-Drop.') },
      { title: toEsc('Exportieren und Drucken'), description: toEsc('Laden Sie Ihr Arbeitsblatt als hochaufl\u00f6sendes JPEG oder druckfertiges PDF herunter. Ein L\u00f6sungsschl\u00fcssel mit korrekten Verbindungslinien wird automatisch generiert.') },
    ],
  },
  features: [
    { title: toEsc('Automatische Schatten-Darstellung'), description: toEsc('Der Generator verarbeitet jedes Bild durch invertierte und abgedunkelte Darstellung, um realistische Silhouetten zu erstellen. Schatten bewahren Umrisse und Proportionen, entfernen aber Farbe und innere Details.') },
    { title: toEsc('Flexible Paaranzahl: 4, 5 oder 6'), description: toEsc('W\u00e4hlen Sie die Anzahl der Bild-Schatten-Paare pro Arbeitsblatt. Vier Paare f\u00fcr j\u00fcngere Kinder, f\u00fcnf als Standard, sechs f\u00fcr eine erweiterte Herausforderung.') },
    { title: toEsc('Linienverbindungs-Zuordnungsformat'), description: toEsc('Das klassische Zwei-Spalten-Layout platziert farbige Bilder links und gemischte Schatten rechts. Sch\u00fcler zeichnen Verbindungslinien zwischen den Paaren und \u00fcben dabei Feinmotorik und visuelle Unterscheidung.') },
    { title: toEsc('104 illustrierte Bildthemen'), description: toEsc('Jedes Thema bietet professionell gezeichnete Bilder mit markanten Formen, die klare, erkennbare Silhouetten erzeugen. Themen mit verschiedenen Formen erzeugen die spannendsten Schattenr\u00e4tsel.') },
    { title: toEsc('Automatisch generierte L\u00f6sungsschl\u00fcssel'), description: toEsc('Jedes Arbeitsblatt enth\u00e4lt einen L\u00f6sungsschl\u00fcssel mit den korrekten Verbindungslinien zwischen Bild und Schatten.') },
    { title: toEsc('Vollst\u00e4ndiger Canvas-Editor mit Ebenensteuerung'), description: toEsc('F\u00fcgen Sie eigenen Text hinzu, \u00e4ndern Sie Hintergr\u00fcnde, wenden Sie R\u00e4nder an und nutzen Sie Ausrichtungswerkzeuge, Ebenensteuerung, Zoom und R\u00fcckg\u00e4ngig.') },
    { title: toEsc('Doppelexport: JPEG und PDF'), description: toEsc('Exportieren Sie als hochaufl\u00f6sendes JPEG oder druckfertiges PDF. JPEG f\u00fcr digitale Nutzung, PDF f\u00fcr Klassenzimmerdruck und Aktivit\u00e4tsb\u00fccher.') },
    { title: toEsc('7 professionelle Schriftarten'), description: toEsc('W\u00e4hlen Sie aus sieben Schriftarten f\u00fcr verschiedene Altersgruppen. Gro\u00dfe, klare Formen f\u00fcr junge Kinder, kompaktere Stile f\u00fcr \u00e4ltere Sch\u00fcler.') },
  ],
  businessUseCases: [
    { title: toEsc('Schatten-Zuordnungs-Pakete auf Etsy verkaufen'), description: toEsc('Erstellen Sie thematische Schatten-Zuordnungspakete \u2014 Tierschatten, Fahrzeugschatten, saisonale Schatten \u2014 als Sofort-Download Produkte.'), platform: 'Etsy' },
    { title: toEsc('KDP-Schattenr\u00e4tsel-B\u00fccher ver\u00f6ffentlichen'), description: toEsc('Stellen Sie 50\u2013100 Schatten-Zuordnungsseiten zu thematischen Aktivit\u00e4tsb\u00fcchern zusammen. \u201eFinde den Schatten: Tier-Ausgabe\u201c oder \u201eSilhouettenr\u00e4tsel f\u00fcr Vorschulkinder\u201c.'), platform: 'Amazon KDP' },
    { title: toEsc('Visuelle Wahrnehmungs-Pakete f\u00fcr TPT erstellen'), description: toEsc('Lehrer suchen nach visueller Wahrnehmung und Unterscheidungsressourcen. Erstellen Sie differenzierte Schatten-Zuordnungs-Sets nach Schwierigkeit mit L\u00f6sungsschl\u00fcsseln.'), platform: 'Teachers Pay Teachers' },
    { title: toEsc('Saisonale Schatten-Aktivit\u00e4ts-Sets'), description: toEsc('Erstellen Sie feiertagsspezifische Schatten-Zuordnungssammlungen: K\u00fcrbisse f\u00fcr Halloween, Schneem\u00e4nner f\u00fcr Winter, Hasen f\u00fcr Ostern, Blumen f\u00fcr Fr\u00fchling.'), platform: 'Multi-platform' },
    { title: toEsc('Fr\u00fchkindliches Aktivit\u00e4ts-Abonnement starten'), description: toEsc('Kombinieren Sie Schatten-Zuordnung mit anderen visuellen Wahrnehmungs\u00fcbungen in einem monatlichen Gumroad-Abonnement. Eltern und Vorschullehrer sch\u00e4tzen kuratierte, progressive Aktivit\u00e4ts-Sets.'), platform: 'Gumroad' },
  ],
  faq: [
    { question: toEsc('Wie funktioniert die Schatten-Darstellung?'), answer: toEsc('Der Generator verarbeitet jedes Bild automatisch durch invertierte und abgedunkelte Darstellung, um eine realistische Silhouette zu erstellen. Der Schatten bewahrt Umriss und Proportionen, entfernt aber Farbe und innere Details.') },
    { question: toEsc('Wie viele Paare kann ich pro Arbeitsblatt verwenden?'), answer: toEsc('Sie k\u00f6nnen 4, 5 oder 6 Bild-Schatten-Paare pro Arbeitsblatt w\u00e4hlen. Vier Paare f\u00fcr Vorschulkinder, f\u00fcnf als Standard, sechs als erweiterte Herausforderung.') },
    { question: toEsc('Welche F\u00e4higkeiten f\u00f6rdern Schatten-Zuordnungs\u00fcbungen?'), answer: toEsc('Schatten-Zuordnung f\u00f6rdert visuelle Wahrnehmung, Figur-Grund-Unterscheidung, Formerkennung und Detailaufmerksamkeit. Diese grundlegenden F\u00e4higkeiten \u00fcbertragen sich direkt auf Buchstaben- und Zahlenerkennung und Lesevorbereitung.') },
    stdThemeFaq(),
    stdAnswerFaq(),
    stdCommercialFaq('Schatten-Zuordnung'),
    stdPricingFaq('Schatten-Zuordnungs-Generator'),
    stdTryFaq(),
    { question: toEsc('Welche Seitengr\u00f6\u00dfen und Formate werden unterst\u00fctzt?'), answer: toEsc('W\u00e4hlen Sie aus US Letter (8,5 \u00d7 11 Zoll), A4 oder benutzerdefinierten Ma\u00dfen. Hoch- und Querformat sind verf\u00fcgbar. Export als hochaufl\u00f6sendes JPEG oder druckfertiges PDF.') },
    stdLangFaq(),
    stdRefundFaq(),
  ],
  internalLinks: [
    { slug: 'matching', pageType: 'app', anchorText: toEsc('Zuordnungs-Arbeitsblatt Generator') },
    { slug: 'grid-match', pageType: 'app', anchorText: toEsc('Gitterr\u00e4tsel Generator') },
    { slug: 'bingo', pageType: 'app', anchorText: 'Bingo-Karten Generator' },
    { slug: 'picture-sort', pageType: 'app', anchorText: toEsc('Bilder-Sortierung Generator') },
    { slug: 'shadow-match', pageType: 'tool', anchorText: toEsc('Schatten-Zuordnung Generator kostenlos testen') },
    { slug: 'matching-bundle', pageType: 'bundle', anchorText: toEsc('Zuordnungs-Bundle \u2014 Alle 5 Generatoren zum Sparpreis') },
    { slug: 'create-shadow-matching-worksheets', pageType: 'guide', anchorText: toEsc('So erstellen Sie Schatten-Zuordnungs-Arbeitsbl\u00e4tter') },
    { slug: 'sell-educational-printables-etsy', pageType: 'guide', anchorText: toEsc('Lern-Druckvorlagen auf Etsy verkaufen') },
    { slug: 'preschool-printable-ideas', pageType: 'idea', anchorText: toEsc('Vorschul-Druckvorlagen Nischenideen') },
    { slug: 'amazon-kdp-activity-books', pageType: 'start', anchorText: toEsc('Aktivit\u00e4tsb\u00fccher auf Amazon KDP ver\u00f6ffentlichen') },
  ],
};

// ── BINGO ──
var bingo = {
  appId: 'bingo',
  locale: 'de',
  category: 'matching',
  seo: {
    titleTag: toEsc('Bingo-Karten Generator | Eigene Bingo-Karten Erstellen'),
    metaDescription: toEsc('Erstellen Sie druckbare Bingo-Karten mit Bildern oder W\u00f6rtern. 3\u20135 Zeilen und Spalten, 1\u201310 Karten pro Blatt, Aufruf-Chips. Kostenloser Bingo-Generator mit PDF-Export.'),
    primaryKeyword: 'Bingo-Karten Generator',
    secondaryKeywords: [
      toEsc('druckbare Bingo-Karten'),
      toEsc('eigene Bingo-Karten erstellen'),
      toEsc('Bingo-Karten mit Bildern'),
      toEsc('Lern-Bingo Generator'),
      toEsc('Bingo-Arbeitsblatt Ersteller'),
    ],
    lsiKeywords: [
      toEsc('Klassenzimmer-Bingo-Spiele'),
      'Bilder-Bingo-Karten',
      'Vokabel-Bingo',
      toEsc('individuelle Bingo-Bl\u00e4tter'),
      'Party-Bingo-Druckvorlagen',
      'Bingo-Aufruf-Chips',
      toEsc('Lernspiele druckbar'),
      toEsc('Gruppenaktivit\u00e4ten Arbeitsbl\u00e4tter'),
    ],
  },
  visuals: {
    heroImages: {
      primary: '/samples/english/bingo/bingo_card word.jpeg',
      primaryAlt: toEsc('Individuelle Bingo-Karte mit Wort-Zellen in einem bunten Gitter-Layout f\u00fcr den Unterricht'),
    },
    sampleGallery: [
      { src: '/samples/english/bingo/bingo_card word.jpeg', alt: toEsc('Bingo-Karte mit Wort-Zellen und Vokabelbegriffen im Gitterformat'), caption: 'Wort-Bingo-Karte' },
    ],
    youtubeId: 'd6AOiDXoK1c',
    videoTitle: toEsc('So erstellen Sie eigene Bingo-Karten mit Bildern'),
  },
  hero: {
    title: 'Bingo-Karten Generator',
    tagline: toEsc('Erstellen Sie individuelle Bingo-Karten mit Bildern oder W\u00f6rtern f\u00fcr Unterricht, Partys und druckbare Produkte'),
    description: toEsc('Bingo ist eine der mitrei\u00dfendsten Gruppenaktivit\u00e4ten f\u00fcr jedes Alter, und dieser Generator erstellt vollst\u00e4ndig anpassbare Bingo-Karten in Sekunden. Ob Sie Bilder-Bingo f\u00fcr Vorschulkinder, Vokabel-Bingo f\u00fcr Sprachlerner oder thematisches Bingo f\u00fcr Partys ben\u00f6tigen \u2014 der Bingo-Karten Generator erzeugt professionelle Karten mit passenden Aufruf-Chips.\n\nZwei Generierungsmodi decken jedes Bingo-Szenario ab. Der Karten & Chips-Modus erstellt Bingo-Karten zusammen mit einem separaten Aufruf-Chips-Blatt zum Ausschneiden. Der Aufruf-Modus generiert nur das Aufruf-Blatt, wenn Sie bereits Karten haben oder eine benutzerdefinierte Ziehliste erstellen m\u00f6chten.\n\nPassen Sie jeden Aspekt Ihrer Bingo-Karten an. Setzen Sie das Gitter von 3 Zeilen \u00d7 3 Spalten bis 5 \u00d7 5 und generieren Sie 1 bis 10 einzigartige Karten pro Arbeitsblatt \u2014 jede Karte erh\u00e4lt eine andere zuf\u00e4llige Anordnung. W\u00e4hlen Sie ob Zellen Bilder aus der 104-Themen-Bibliothek oder Text-W\u00f6rter anzeigen.\n\nDer Canvas-Editor erm\u00f6glicht Anpassungen vor dem Export als JPEG oder PDF. Die kostenlose Version bietet volle Funktionalit\u00e4t mit Wasserzeichen \u2014 testen Sie alle Gittergr\u00f6\u00dfen und Themen vor dem Kauf.'),
  },
  howItWorks: {
    title: toEsc('Erstellen Sie Ihre Bingo-Karten in 5 Schritten'),
    steps: [
      { title: toEsc('Generierungsmodus w\u00e4hlen'), description: toEsc('W\u00e4hlen Sie Karten & Chips f\u00fcr komplette Bingo-Karten mit Aufruf-Chips, oder Aufrufe f\u00fcr nur das Aufruf-Blatt.') },
      { title: toEsc('Gittergr\u00f6\u00dfe und Kartenanzahl festlegen'), description: toEsc('W\u00e4hlen Sie ein Gitter von 3\u00d73 (9 Zellen) bis 5\u00d75 (25 Zellen). Dann 1 bis 10 einzigartige Karten generieren. Jede Karte erh\u00e4lt eine andere zuf\u00e4llige Anordnung.') },
      { title: toEsc('Zelleninhalt w\u00e4hlen: Bild oder Wort'), description: toEsc('W\u00e4hlen Sie ob Zellen Bilder aus der 104-Themen-Bibliothek oder Text-W\u00f6rter anzeigen. Bilder-Modus f\u00fcr j\u00fcngere Kinder, Wort-Modus f\u00fcr Vokabel\u00fcbungen.') },
      { title: toEsc('Im Canvas-Editor anpassen'), description: toEsc('Verfeinern Sie Ihre Karten mit dem integrierten Editor. F\u00fcgen Sie einen Titel hinzu, \u00e4ndern Sie Gitterfarben, passen Sie Schriften an und wenden Sie R\u00e4nder an.') },
      { title: toEsc('Exportieren und Drucken'), description: toEsc('Laden Sie Ihre Karten als hochaufl\u00f6sendes JPEG oder druckfertiges PDF herunter. Das Aufruf-Chips-Blatt wird automatisch als separate Datei generiert.') },
    ],
  },
  features: [
    { title: toEsc('Zwei Modi: Karten & Chips und Aufrufe'), description: toEsc('Karten & Chips-Modus generiert Bingo-Karten zusammen mit einem passenden Aufruf-Chips-Blatt zum Ausschneiden. Aufruf-Modus erstellt nur das Auswahlblatt. Zusammen ein komplettes Bingo-Spielsystem.') },
    { title: toEsc('Flexibles Gitter: 3\u00d73 bis 5\u00d75'), description: toEsc('Setzen Sie das Gitter von 3\u00d73 (9 Zellen) bis 5\u00d75 (25 Zellen). Ein 3\u00d73-Gitter f\u00fcr schnelle Spiele, 4\u00d74 f\u00fcr die meisten Unterrichtsaktivit\u00e4ten, 5\u00d75 f\u00fcr das traditionelle Bingo-Erlebnis.') },
    { title: toEsc('1\u201310 einzigartige Karten pro Blatt'), description: toEsc('Generieren Sie mehrere einzigartige Bingo-Karten in einer Sitzung. Jede Karte erh\u00e4lt eine andere zuf\u00e4llige Anordnung derselben Bilder oder W\u00f6rter. Bis zu 10 Karten auf einmal.') },
    { title: toEsc('Bild- oder Wort-Zelleninhalt'), description: toEsc('W\u00e4hlen Sie ob Zellen bunte Bilder aus der 104-Themen-Bibliothek oder Text-W\u00f6rter anzeigen. Bilder-Bingo f\u00fcr Vorleser und visuelle Lerner. Wort-Bingo f\u00fcr Wortschatz- und Rechtschreib\u00fcbungen.') },
    { title: toEsc('104 illustrierte Bildthemen'), description: toEsc('Jedes Thema bietet professionell gezeichnete Bilder, die in Bingo-Zellengr\u00f6\u00dfe klar dargestellt werden. Themen erm\u00f6glichen fachspezifische Bingo-Spiele.') },
    { title: toEsc('Individuelle Aufruf-Chip-Auswahl'), description: toEsc('Steuern Sie welche Bilder oder W\u00f6rter als Aufruf-Chips erscheinen. W\u00e4hlen Sie spezifische Elemente aus Ihrem Thema f\u00fcr fokussierte Spiele. Das Chip-Blatt wird als separate druckbare Seite generiert.') },
    { title: toEsc('Vollst\u00e4ndiger Canvas-Editor mit Ebenensteuerung'), description: toEsc('F\u00fcgen Sie Text hinzu, \u00e4ndern Sie Kartenhintergr\u00fcnde, wenden Sie R\u00e4nder an und nutzen Sie Ausrichtungswerkzeuge, Ebenensteuerung, Zoom und R\u00fcckg\u00e4ngig.') },
    { title: toEsc('Doppelexport: JPEG und PDF'), description: toEsc('Exportieren Sie als hochaufl\u00f6sendes JPEG oder druckfertiges PDF. JPEG f\u00fcr digitale Nutzung und Vorschaubilder. PDF f\u00fcr Klassenzimmerdruck und Multi-Karten-Zusammenstellungen.') },
  ],
  businessUseCases: [
    { title: toEsc('Bingo-Spiel-Pakete auf Etsy verkaufen'), description: toEsc('Erstellen Sie thematische Bingo-Pakete mit je 30 einzigartigen Karten \u2014 Tier-Bingo, Lebensmittel-Bingo, Feiertags-Bingo \u2014 als Sofort-Download. Inklusive Aufruf-Chips und Spielanleitung.'), platform: 'Etsy' },
    { title: toEsc('KDP-Bingo-Aktivit\u00e4tsb\u00fccher ver\u00f6ffentlichen'), description: toEsc('Stellen Sie mehrere thematische Bingo-Spiele zu Aktivit\u00e4tsb\u00fcchern zusammen. \u201eKlassenzimmer-Bingo-Sammlung\u201c mit 10 Themen und 30 Karten pro Thema.'), platform: 'Amazon KDP' },
    { title: toEsc('Vokabel-Bingo-Sets f\u00fcr TPT erstellen'), description: toEsc('Verwenden Sie den Wort-Modus f\u00fcr lehrplanorientierte Vokabel-Bingo-Spiele. Sets f\u00fcr verschiedene F\u00e4cher: Naturwissenschaften, Mathematik, Sichtw\u00f6rter oder Fremdsprachen\u00fcbungen.'), platform: 'Teachers Pay Teachers' },
    { title: toEsc('Party- und Event-Bingo-Sammlungen gestalten'), description: toEsc('Erstellen Sie thematische Bingo-Karten-Sets f\u00fcr Geburtstage, Babypartys, Feiertage und Firmenevents. Party-Bingo-Produkte erreichen ein breiteres Publikum.'), platform: 'Multi-platform' },
    { title: toEsc('Klassenzimmer-Spiel-Abonnement starten'), description: toEsc('Liefern Sie monatlich neue thematische Bingo-Spiel-Sets \u00fcber Gumroad. Jeder Monat ein anderes Thema mit 30 einzigartigen Karten und Aufruf-Chips.'), platform: 'Gumroad' },
  ],
  faq: [
    { question: toEsc('Was sind die zwei Generierungsmodi?'), answer: toEsc('Karten & Chips-Modus erstellt Bingo-Karten zusammen mit einem passenden Aufruf-Chips-Blatt. Aufruf-Modus generiert nur das Auswahlblatt, wenn Sie bereits Karten haben oder eine benutzerdefinierte Ziehliste erstellen m\u00f6chten.') },
    { question: toEsc('Welche Gittergr\u00f6\u00dfen sind verf\u00fcgbar?'), answer: toEsc('Das Gitter reicht von 3\u00d73 (9 Zellen) bis 5\u00d75 (25 Zellen). Zeilen und Spalten k\u00f6nnen unabh\u00e4ngig gesetzt werden, so dass auch rechteckige Gitter wie 3\u00d75 oder 4\u00d73 m\u00f6glich sind.') },
    { question: toEsc('Wie viele einzigartige Karten kann ich gleichzeitig generieren?'), answer: toEsc('Sie k\u00f6nnen 1 bis 10 einzigartige Bingo-Karten pro Sitzung generieren. Jede Karte erh\u00e4lt eine andere zuf\u00e4llige Anordnung derselben Bilder oder W\u00f6rter.') },
    { question: toEsc('Kann ich Bilder oder W\u00f6rter in den Bingo-Zellen verwenden?'), answer: toEsc('Ja. W\u00e4hlen Sie zwischen Bilder-Modus (bunte Bilder aus der 104-Themen-Bibliothek) und Wort-Modus (Text-Beschriftungen). Bilder-Bingo f\u00fcr Vorleser, Wort-Bingo f\u00fcr Vokabel- und Rechtschreib\u00fcbungen.') },
    stdThemeFaq(),
    { question: toEsc('Kann ich anpassen, welche Elemente als Aufruf-Chips erscheinen?'), answer: toEsc('Ja. Sie k\u00f6nnen spezifische Bilder oder W\u00f6rter aus Ihrem Thema ein- oder ausschlie\u00dfen. So erstellen Sie fokussierte Bingo-Spiele f\u00fcr bestimmte Vokabeln oder Konzepte.') },
    stdCommercialFaq('Bingo-Generator'),
    stdPricingFaq('Bingo-Generator'),
    stdTryFaq(),
    { question: toEsc('Welche Seitengr\u00f6\u00dfen und Formate werden unterst\u00fctzt?'), answer: toEsc('W\u00e4hlen Sie aus US Letter (8,5 \u00d7 11 Zoll), A4 oder benutzerdefinierten Ma\u00dfen. Hoch- und Querformat verf\u00fcgbar. Export als hochaufl\u00f6sendes JPEG oder druckfertiges PDF.') },
    stdLangFaq(),
    stdRefundFaq(),
  ],
  internalLinks: [
    { slug: 'matching', pageType: 'app', anchorText: toEsc('Zuordnungs-Arbeitsblatt Generator') },
    { slug: 'grid-match', pageType: 'app', anchorText: toEsc('Gitterr\u00e4tsel Generator') },
    { slug: 'shadow-match', pageType: 'app', anchorText: toEsc('Schatten-Zuordnung Generator') },
    { slug: 'picture-sort', pageType: 'app', anchorText: toEsc('Bilder-Sortierung Generator') },
    { slug: 'bingo', pageType: 'tool', anchorText: 'Bingo-Karten Generator kostenlos testen' },
    { slug: 'matching-bundle', pageType: 'bundle', anchorText: toEsc('Zuordnungs-Bundle \u2014 Alle 5 Generatoren zum Sparpreis') },
    { slug: 'create-bingo-cards', pageType: 'guide', anchorText: toEsc('So erstellen Sie Bingo-Karten zum Verkaufen') },
    { slug: 'start-etsy-printable-shop', pageType: 'guide', anchorText: toEsc('Starten Sie Ihren Etsy Druckvorlagen-Shop') },
    { slug: 'party-supply-printable-ideas', pageType: 'idea', anchorText: toEsc('Party-Druckvorlagen Nischenideen') },
    { slug: 'complete-guide-printable-business', pageType: 'start', anchorText: toEsc('Kompletter Leitfaden f\u00fcr Druckvorlagen-Gesch\u00e4ft') },
  ],
};

// ── PICTURE-SORT ──
var pictureSort = {
  appId: 'picture-sort',
  locale: 'de',
  category: 'matching',
  seo: {
    titleTag: toEsc('Bilder-Sortierung Generator | Sortier\u00fcbungen Erstellen'),
    metaDescription: toEsc('Erstellen Sie druckbare Bilder-Sortier-Arbeitsbl\u00e4tter mit Zwei-Spalten-Kategorisierung. Auto- und Manuell-Modus, 104 Themen, max. 12 Bilder. Kostenloser Generator mit PDF-Export.'),
    primaryKeyword: toEsc('Bilder-Sortierung Arbeitsblatt Generator'),
    secondaryKeywords: [
      toEsc('Sortier\u00fcbungen f\u00fcr Kinder'),
      toEsc('Kategorisierung Arbeitsbl\u00e4tter druckbar'),
      toEsc('Bilder sortieren Aktivit\u00e4ten'),
      toEsc('Sortieren und Klassifizieren'),
      toEsc('Kategorie-Sortier-Druckvorlagen'),
    ],
    lsiKeywords: [
      toEsc('Klassifizieren und Sortieren'),
      'Zwei-Spalten-Sortierung',
      toEsc('Kategorisierungsf\u00e4higkeiten'),
      toEsc('Vorschul-Sortier\u00fcbungen'),
      'Kindergarten-Klassifikation',
      toEsc('Vergleich-Arbeitsbl\u00e4tter'),
      toEsc('Gruppierungs\u00fcbungen'),
      toEsc('logisches Denken Arbeitsbl\u00e4tter'),
    ],
  },
  visuals: {
    heroImages: {
      primary: '/samples/english/picture sort/Picture Sort (1).jpeg',
      primaryAlt: toEsc('Bilder-Sortier-Arbeitsblatt mit zwei Kategoriespalten und bunten Bildern zum Klassifizieren'),
    },
    sampleGallery: [
      { src: '/samples/english/picture sort/Picture Sort (1).jpeg', alt: toEsc('Bilder-Sortier-Arbeitsblatt mit zwei thematischen Kategorien und Bildern zum Klassifizieren'), caption: toEsc('Zwei-Spalten-Sortier\u00fcbung') },
    ],
    youtubeId: '9kzmlABtNVQ',
    videoTitle: toEsc('So erstellen Sie Bilder-Sortier-Arbeitsbl\u00e4tter'),
  },
  hero: {
    title: toEsc('Bilder-Sortierung Generator'),
    tagline: toEsc('Erstellen Sie Zwei-Spalten-Kategorisierungs\u00fcbungen, die Klassifikation, Vergleich und logisches Denken lehren'),
    description: toEsc('Sortieren und Kategorisieren sind grundlegende kognitive F\u00e4higkeiten, die Kinder in jedem Schulfach brauchen. Wenn Sch\u00fcler ein Bild betrachten und entscheiden, zu welcher von zwei Kategorien es geh\u00f6rt, \u00fcben sie gleichzeitig Vergleich, logisches Denken und Wortschatzentwicklung. Der Bilder-Sortierung Generator erstellt professionelle Zwei-Spalten-Kategorisierungs-Arbeitsbl\u00e4tter in Sekunden.\n\nZwei Generierungsmodi bieten Flexibilit\u00e4t. Der Auto-Modus l\u00e4sst Sie ein Thema f\u00fcr die linke und ein anderes f\u00fcr die rechte Spalte w\u00e4hlen \u2014 der Generator mischt die Bilder zum Sortieren. Der Manuell-Modus gibt Ihnen volle Kontrolle: durchst\u00f6bern Sie die gesamte 104-Themen-Bibliothek, w\u00e4hlen Sie bis zu 12 Bilder einzeln aus und weisen Sie jedes einer Kategorie zu.\n\nSch\u00fcler erhalten ein Arbeitsblatt mit zwei beschrifteten Spalten oben und einem gemischten Bilderbereich darunter. Ihre Aufgabe ist es, jedes Bild der richtigen Kategorie zuzuordnen. Der integrierte Canvas-Editor erm\u00f6glicht Anpassungen vor dem Export. Die kostenlose Version bietet alle Funktionen mit Wasserzeichen.'),
  },
  howItWorks: {
    title: toEsc('Erstellen Sie Ihr Bilder-Sortier-Arbeitsblatt in 5 Schritten'),
    steps: [
      { title: toEsc('Generierungsmodus w\u00e4hlen'), description: toEsc('W\u00e4hlen Sie Auto-Modus f\u00fcr schnelle Generierung aus zwei Themen oder Manuell-Modus f\u00fcr pr\u00e4zise Bildauswahl von bis zu 12 Bildern.') },
      { title: toEsc('Kategorien festlegen und Bilder ausw\u00e4hlen'), description: toEsc('Im Auto-Modus w\u00e4hlen Sie je ein Thema f\u00fcr linke und rechte Spalte. Im Manuell-Modus w\u00e4hlen Sie einzelne Bilder und weisen jedes einer Kategorie zu. Maximal 12 Bilder insgesamt.') },
      { title: toEsc('Layout konfigurieren'), description: toEsc('W\u00e4hlen Sie Seitengr\u00f6\u00dfe, Ausrichtung und Schriftart. Der Generator ordnet Kategorie\u00fcberschriften oben und die gemischten Bilder darunter an.') },
      { title: toEsc('Im Canvas-Editor anpassen'), description: toEsc('F\u00fcgen Sie Anweisungen oder Kategorie-Beschriftungen hinzu, \u00e4ndern Sie Seiten- und Spaltenfarben, wenden Sie R\u00e4nder an und positionieren Sie Elemente per Drag-and-Drop.') },
      { title: toEsc('Exportieren und Drucken'), description: toEsc('Laden Sie Ihr Arbeitsblatt als JPEG oder PDF herunter. Ein L\u00f6sungsschl\u00fcssel mit der richtigen Kategorie f\u00fcr jedes Bild wird automatisch als separate Datei generiert.') },
    ],
  },
  features: [
    { title: toEsc('Zwei Modi: Auto und Manuell'), description: toEsc('Auto-Modus l\u00e4sst Sie zwei Themen w\u00e4hlen und generiert sofort eine Sortier\u00fcbung. Manuell-Modus erm\u00f6glicht die Auswahl von bis zu 12 einzelnen Bildern aus der gesamten 104-Themen-Bibliothek mit individueller Kategoriezuweisung.') },
    { title: toEsc('Zwei-Spalten-Kategorisierungsformat'), description: toEsc('Jedes Arbeitsblatt zeigt zwei beschriftete Kategoriespalten oben mit einem gemischten Bilderbereich darunter. Sch\u00fcler analysieren jedes Bild und sortieren es in die richtige Kategorie.') },
    { title: toEsc('Bis zu 12 Bilder pro Arbeitsblatt'), description: toEsc('F\u00fcgen Sie bis zu 12 Bilder insgesamt \u00fcber beide Kategorien hinzu. Weniger Bilder f\u00fcr j\u00fcngere Kinder, mehr Bilder f\u00fcr l\u00e4ngere, anspruchsvollere Sortier\u00fcbungen.') },
    { title: toEsc('104 illustrierte Bildthemen'), description: toEsc('Jedes Thema bietet professionell gezeichnete Bilder. Verwenden Sie kontrastierende Themen wie \u201eLandtiere vs. Meerestiere\u201c oder \u201eObst vs. Gem\u00fcse\u201c f\u00fcr nat\u00fcrliche Sortier\u00fcbungen.') },
    { title: toEsc('Automatisch generierte L\u00f6sungsschl\u00fcssel'), description: toEsc('Jedes Arbeitsblatt enth\u00e4lt einen L\u00f6sungsschl\u00fcssel mit der korrekten Kategoriezuweisung f\u00fcr jedes Bild.') },
    { title: toEsc('Vollst\u00e4ndiger Canvas-Editor mit Ebenensteuerung'), description: toEsc('F\u00fcgen Sie Text hinzu, \u00e4ndern Sie Hintergr\u00fcnde, wenden Sie R\u00e4nder an und nutzen Sie Ausrichtungswerkzeuge, Ebenensteuerung, Zoom und R\u00fcckg\u00e4ngig.') },
    { title: toEsc('Doppelexport: JPEG und PDF'), description: toEsc('Exportieren Sie als hochaufl\u00f6sendes JPEG oder druckfertiges PDF. JPEG f\u00fcr digitale Nutzung, PDF f\u00fcr Klassenzimmerdruck und KDP-Innenteile.') },
    { title: toEsc('7 professionelle Schriftarten'), description: toEsc('W\u00e4hlen Sie aus sieben Schriftarten f\u00fcr verschiedene Altersgruppen. Gro\u00dfe, klare Formen f\u00fcr junge Kinder, kompaktere Stile f\u00fcr \u00e4ltere Sch\u00fcler.') },
  ],
  businessUseCases: [
    { title: toEsc('Sortier-Arbeitsblatt-Pakete auf Etsy verkaufen'), description: toEsc('Erstellen Sie thematische Sortierpakete \u2014 \u201eLandtiere vs. Meerestiere\u201c, \u201eObst vs. Gem\u00fcse\u201c, \u201eSommer vs. Winter\u201c \u2014 als Sofort-Download Produkte.'), platform: 'Etsy' },
    { title: toEsc('KDP-Sortier-Aktivit\u00e4tsb\u00fccher ver\u00f6ffentlichen'), description: toEsc('Stellen Sie 50\u2013100 Sortier-Arbeitsbl\u00e4tter zu thematischen Aktivit\u00e4tsb\u00fcchern zusammen. \u201eVorschul-Sortierspa\u00df\u201c oder \u201eKlassifizieren und Sortieren: Naturwissenschaften\u201c.'), platform: 'Amazon KDP' },
    { title: toEsc('Naturwissenschaft-Klassifikations-Pakete f\u00fcr TPT'), description: toEsc('Verwenden Sie den Manuell-Modus f\u00fcr lehrplanorientierte Sortier\u00fcbungen: lebend vs. nicht-lebend, Pflanzen vs. Tiere, fest vs. fl\u00fcssig. TPT-K\u00e4ufer suchen nach standardorientierten Klassifikationsressourcen.'), platform: 'Teachers Pay Teachers' },
    { title: toEsc('Saisonale Sortier-Aktivit\u00e4ts-Sets'), description: toEsc('Erstellen Sie feiertagsspezifische Sortiersammlungen mit kontrastierenden Kategorien: \u201eHalloween vs. Weihnachten\u201c, \u201eFr\u00fchling vs. Herbst\u201c, \u201eDrinnen vs. Drau\u00dfen\u201c.'), platform: 'Multi-platform' },
    { title: toEsc('Kritisches Denken-Curriculum starten'), description: toEsc('Strukturieren Sie Sortier-Arbeitsbl\u00e4tter nach Woche und Schwierigkeit f\u00fcr ein progressives Klassifikations-Curriculum. Von offensichtlichen Kontrasten bis zu subtilen Unterscheidungen.'), platform: 'Gumroad' },
  ],
  faq: [
    { question: toEsc('Was ist der Unterschied zwischen Auto- und Manuell-Modus?'), answer: toEsc('Auto-Modus l\u00e4sst Sie zwei Themen w\u00e4hlen und generiert die Sortier\u00fcbung sofort automatisch. Manuell-Modus erm\u00f6glicht die Auswahl von bis zu 12 spezifischen Bildern aus allen 104 Themen mit individueller Kategoriezuweisung.') },
    { question: toEsc('Wie viele Bilder kann ich pro Arbeitsblatt verwenden?'), answer: toEsc('Bis zu 12 Bilder insgesamt \u00fcber beide Sortierkategorien. Weniger Bilder f\u00fcr j\u00fcngere Kinder, mehr f\u00fcr l\u00e4ngere, anspruchsvollere \u00dcbungen.') },
    { question: toEsc('Welche F\u00e4higkeiten f\u00f6rdern Sortier\u00fcbungen?'), answer: toEsc('Bilder-Sortierung f\u00f6rdert Kategorisierung, Vergleich, logisches Denken, Wortschatz und kritisches Denken. Sch\u00fcler m\u00fcssen jedes Bild analysieren, seine Merkmale identifizieren und die richtige Kategorie bestimmen.') },
    stdThemeFaq(),
    stdAnswerFaq(),
    stdCommercialFaq('Bilder-Sortierung'),
    stdPricingFaq('Bilder-Sortierungs-Generator'),
    stdTryFaq(),
    { question: toEsc('Welche Seitengr\u00f6\u00dfen und Formate werden unterst\u00fctzt?'), answer: toEsc('W\u00e4hlen Sie aus US Letter (8,5 \u00d7 11 Zoll), A4 oder benutzerdefinierten Ma\u00dfen. Hoch- und Querformat verf\u00fcgbar. Export als hochaufl\u00f6sendes JPEG oder druckfertiges PDF.') },
    stdLangFaq(),
    { question: toEsc('Kann ich eigene Kategorien \u00fcber Bildthemen hinaus erstellen?'), answer: toEsc('Ja. Der Manuell-Modus erm\u00f6glicht die Auswahl beliebiger Bildkombinationen aus allen 104 Themen mit individueller Kategoriezuweisung. Sie k\u00f6nnen auch eigene Bilder hochladen.') },
    stdRefundFaq(),
  ],
  internalLinks: [
    { slug: 'matching', pageType: 'app', anchorText: toEsc('Zuordnungs-Arbeitsblatt Generator') },
    { slug: 'grid-match', pageType: 'app', anchorText: toEsc('Gitterr\u00e4tsel Generator') },
    { slug: 'shadow-match', pageType: 'app', anchorText: toEsc('Schatten-Zuordnung Generator') },
    { slug: 'bingo', pageType: 'app', anchorText: 'Bingo-Karten Generator' },
    { slug: 'picture-sort', pageType: 'tool', anchorText: toEsc('Bilder-Sortierung Generator kostenlos testen') },
    { slug: 'matching-bundle', pageType: 'bundle', anchorText: toEsc('Zuordnungs-Bundle \u2014 Alle 5 Generatoren zum Sparpreis') },
    { slug: 'create-sorting-worksheets', pageType: 'guide', anchorText: toEsc('So erstellen Sie Sortier-Arbeitsbl\u00e4tter zum Verkaufen') },
    { slug: 'sell-educational-printables-etsy', pageType: 'guide', anchorText: toEsc('Lern-Druckvorlagen auf Etsy verkaufen') },
    { slug: 'kindergarten-printable-ideas', pageType: 'idea', anchorText: toEsc('Kindergarten Druckvorlagen Nischenideen') },
    { slug: 'printable-business-blueprint', pageType: 'start', anchorText: toEsc('Druckvorlagen-Gesch\u00e4ft Anleitung') },
  ],
};

// Write all files
var items = [
  ['matching.ts', matching],
  ['grid-match.ts', gridMatch],
  ['shadow-match.ts', shadowMatch],
  ['bingo.ts', bingo],
  ['picture-sort.ts', pictureSort],
];
items.forEach(function(item) {
  var filePath = path.join(outDir, item[0]);
  fs.writeFileSync(filePath, buildFile(item[1]), 'utf8');
  console.log('Created: ' + item[0]);
});
console.log('\nBatch 3 complete: matching, grid-match, shadow-match, bingo, picture-sort');
