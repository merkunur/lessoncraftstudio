const fs=require('fs'),p=require('path');
const d=p.join(__dirname,'..','frontend','config','app-content','de');
if(!fs.existsSync(d))fs.mkdirSync(d,{recursive:true});
function w(n,c){fs.writeFileSync(p.join(d,n),c,'utf8');console.log(n);}

// Helper to build standard FAQ tail (pricing, try, languages, limit, refund)
function stdFaqTail(genName) {
  return [
    {question:'Darf ich die erstellten Materialien kommerziell nutzen?',answer:'Ja. Sowohl das Kommerzielle Paket als auch das Vollzugriff-Paket enthalten eine kommerzielle Lizenz. Verkaufen Sie auf Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Ihrer eigenen Website und jeder anderen Plattform. Jede Lizenz gilt f\u00fcr eine Person mit unbegrenzter Erstellung.'},
    {question:'Was ist der Unterschied zwischen Kommerziellem und Vollzugriff-Paket?',answer:'Das Kommerzielle Paket ($27) umfasst den '+genName+' mit kommerzieller Lizenz, beliebte Bildthemen und alle 11 Sprachen. Das Vollzugriff-Paket ($47) f\u00fcgt die komplette Bibliothek mit 104 Bildthemen, bevorzugten Zugang zu neuen Themen und alle zuk\u00fcnftigen Updates hinzu. Beide Pakete sind Einmalk\u00e4ufe ohne Abonnement.'},
    {question:'Kann ich den Generator vor dem Kauf testen?',answer:'Auf jeden Fall. Der Generator ist kostenlos nutzbar ohne Anmeldung. Alle Funktionen und Einstellungen sind verf\u00fcgbar \u2014 der einzige Unterschied ist ein kleines Wasserzeichen auf exportierten Dateien. Testen Sie alles vor dem Kauf.'},
    {question:'Welche Sprachen werden unterst\u00fctzt?',answer:'Die Oberfl\u00e4che unterst\u00fctzt 11 Sprachen: Englisch, Deutsch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch.'},
    {question:'Gibt es ein Limit f\u00fcr die Erstellung?',answer:'Nein. Beide kostenpflichtigen Stufen beinhalten unbegrenzte Erstellung. Keine monatlichen Limits, Kreditsysteme oder Nutzungsbeschr\u00e4nkungen.'},
    {question:'Wie lautet Ihre R\u00fcckerstattungsrichtlinie?',answer:'Alle Verk\u00e4ufe sind aufgrund der digitalen Natur des Produkts endg\u00fcltig. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Nutzen Sie die kostenlose Version mit Wasserzeichen, um alle Funktionen vor dem Kauf zu testen.'},
  ];
}
console.log('Helper ready');

// We will write each file sequentially
// Store in global for next script parts
global.w = w;
global.stdFaqTail = stdFaqTail;
global.d = d;
console.log('Setup complete');
