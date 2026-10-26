/* =====================================================================
   field-guide-activity.js — ACTIVITY #121 of the one-by-one rebuild:
   "Detective Dewey's Field Guide" → THE BOOK THAT ONLY OPENS WHERE YOU
   SEND IT (1.RI.5; all 11 locales).
   Model: field-guide-core.js (FieldGuideCore).
   Design: docs/activities-rebuild/designs/121-field-guide.md
   ---------------------------------------------------------------------
   Dewey's case card holds the question; under it lies his field guide.
   There is no page-turn button: a contents or index line sends the book
   to its page (the page dial clicks round and the page riffles open), a
   heading unfolds its section, a bold word flips the book to Words to
   Know, a label opens its caption, a tab opens that part of the closed
   book, a screen-book button does its own job. The wrong line opens the
   wrong page, in plain view. The round ends when the sentence that holds
   the fact is tapped: it slides into Dewey's card. No timer, no score.
   Test seams: window.FieldGuideActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / .FAST / .OK_MS.
   ===================================================================== */
var FieldGuideActivity = {
  id: 'field-guide',
  /* the drawn apparatus (the hierarchy gate): the book's cover, the dial, the screen book and its buttons, the stamp */
  apparatusClasses: ['fg-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"Detective Dewey's Field Guide",de:"Detektiv Deweys Naturbuch",fr:"Le guide du détective Dewey",es:"La guía del detective Dewey",pt:"O guia do detetive Dewey",it:"La guida del detective Dewey",nl:"Het natuurboek van detective Dewey",sv:"Detektiv Deweys fältbok",da:"Detektiv Deweys naturbog",no:"Detektiv Deweys feltbok",fi:"Etsivä Deweyn luontokirja"},
    instruction: {en:"Use the book's tools to find the answer.",de:"Finde die Antwort mit den Werkzeugen des Buches.",fr:"Utilise les outils du livre pour trouver la réponse.",es:"Usa las herramientas del libro para encontrar la respuesta.",pt:"Use as ferramentas do livro para achar a resposta.",it:"Usa gli strumenti del libro per trovare la risposta.",nl:"Gebruik de hulpmiddelen van het boek om het antwoord te vinden.",sv:"Använd bokens verktyg för att hitta svaret.",da:"Brug bogens værktøjer til at finde svaret.",no:"Bruk verktøyene i boka for å finne svaret.",fi:"Etsi vastaus kirjan apuvälineillä."},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    nudgeLine: {en:"Tap a line to send the book to that page.",de:"Tippe eine Zeile an, dann schlägt das Buch diese Seite auf.",fr:"Touche une ligne : le livre s’ouvre à cette page.",es:"Toca una línea y el libro se abre en esa página.",pt:"Toque em uma linha e o livro abre naquela página.",it:"Tocca una riga e il libro si apre a quella pagina.",nl:"Tik op een regel, dan slaat het boek die bladzijde open.",sv:"Tryck på en rad, så slår boken upp den sidan.",da:"Tryk på en linje, så slår bogen den side op.",no:"Trykk på en linje, så slår boka opp den siden.",fi:"Napauta riviä, niin kirja aukeaa sille sivulle."},
    nudgeHead: {en:"Tap a heading to open it.",de:"Tippe eine Überschrift an, dann klappt sie auf.",fr:"Touche un titre pour l’ouvrir.",es:"Toca un título para abrirlo.",pt:"Toque em um título para abrir.",it:"Tocca un titolo per aprirlo.",nl:"Tik op een kop om hem open te klappen.",sv:"Tryck på en rubrik för att öppna den.",da:"Tryk på en overskrift for at åbne den.",no:"Trykk på en overskrift for å åpne den.",fi:"Napauta otsikkoa, niin se aukeaa."},
    nudgeGloss: {en:"Read the meanings. Tap the word that answers.",de:"Lies, was die Wörter bedeuten. Tippe das Wort an, das passt.",fr:"Lis le sens des mots. Touche le mot qui répond.",es:"Lee qué significa cada palabra. Toca la que responde.",pt:"Leia o que cada palavra quer dizer. Toque na que responde.",it:"Leggi che cosa vogliono dire le parole. Tocca la parola giusta.",nl:"Lees wat de woorden betekenen. Tik op het woord dat past.",sv:"Läs vad orden betyder. Tryck på ordet som svarar.",da:"Læs, hvad ordene betyder. Tryk på det ord, der svarer.",no:"Les hva ordene betyr. Trykk på ordet som svarer.",fi:"Lue, mitä sanat tarkoittavat. Napauta oikeaa sanaa."},
    nudgeBold: {en:"Tap the bold word to look it up.",de:"Tippe das fett gedruckte Wort an und schlage es nach.",fr:"Touche le mot en gras pour le chercher.",es:"Toca la palabra en negritas para buscarla.",pt:"Toque na palavra em negrito para procurar.",it:"Tocca la parola in grassetto per cercarla.",nl:"Tik op het dikgedrukte woord om het op te zoeken.",sv:"Tryck på det fetstilta ordet för att slå upp det.",da:"Tryk på det fede ord for at slå det op.",no:"Trykk på det uthevede ordet for å slå det opp.",fi:"Napauta lihavoitua sanaa, niin näet sen sanastosta."},
    nudgeLabel: {en:"Tap a label to read what it says about that part.",de:"Tippe ein Schild an und lies, was es über diesen Teil sagt.",fr:"Touche une étiquette pour lire ce qu’elle dit de cette partie.",es:"Toca una etiqueta para leer qué dice de esa parte.",pt:"Toque em uma etiqueta para ler o que ela diz dessa parte.",it:"Tocca un’etichetta per leggere che cosa dice di quella parte.",nl:"Tik op een kaartje en lees wat er over dat deel staat.",sv:"Tryck på en etikett och läs vad den säger om den delen.",da:"Tryk på en etiket, og læs, hvad den siger om den del.",no:"Trykk på en lapp og les hva den sier om den delen.",fi:"Napauta nimilappua ja lue, mitä se kertoo osasta."},
    nudgeTab: {en:"Tap a tab to open that part of the book.",de:"Tippe einen Reiter an, dann öffnet sich dieser Teil vom Buch.",fr:"Touche un onglet pour ouvrir cette partie du livre.",es:"Toca una pestaña para abrir esa parte del libro.",pt:"Toque em uma aba para abrir essa parte do livro.",it:"Tocca una linguetta per aprire quella parte del libro.",nl:"Tik op een tabblad om dat deel van het boek te openen.",sv:"Tryck på en flik för att öppna den delen av boken.",da:"Tryk på en fane for at åbne den del af bogen.",no:"Trykk på en fane for å åpne den delen av boka.",fi:"Napauta välilehteä, niin kirjan se osa aukeaa."},
    nudgeIcon: {en:"Tap a button to see what it does.",de:"Tippe einen Knopf an und sieh, was er macht.",fr:"Touche un bouton pour voir ce qu’il fait.",es:"Toca un botón para ver qué hace.",pt:"Toque em um botão para ver o que ele faz.",it:"Tocca un pulsante per vedere che cosa fa.",nl:"Tik op een knop en kijk wat hij doet.",sv:"Tryck på en knapp och se vad den gör.",da:"Tryk på en knap, og se, hvad den gør.",no:"Trykk på en knapp og se hva den gjør.",fi:"Napauta nappia ja katso, mitä se tekee."},
    nudgeRead: {en:"Now read the page. Tap the sentence that answers.",de:"Lies jetzt die Seite. Tippe den Satz an, der antwortet.",fr:"Lis la page. Touche la phrase qui répond.",es:"Ahora lee la página. Toca la oración que responde.",pt:"Agora leia a página. Toque na frase que responde.",it:"Ora leggi la pagina. Tocca la frase che risponde.",nl:"Lees nu de bladzijde. Tik op de zin die antwoord geeft.",sv:"Läs sidan nu. Tryck på meningen som svarar.",da:"Læs siden nu. Tryk på den sætning, der svarer.",no:"Les siden nå. Trykk på setningen som svarer.",fi:"Lue nyt sivu. Napauta lausetta, joka vastaa."},
    readOn: {en:"That sentence is true, but it does not answer. Read on.",de:"Der Satz stimmt, aber er antwortet nicht. Lies weiter.",fr:"Cette phrase est vraie, mais elle ne répond pas. Lis la suite.",es:"Esa oración es cierta, pero no responde. Sigue leyendo.",pt:"Essa frase é verdade, mas não responde. Continue lendo.",it:"Questa frase è vera, ma non risponde. Leggi ancora.",nl:"Die zin klopt, maar hij geeft geen antwoord. Lees verder.",sv:"Meningen stämmer, men den svarar inte. Läs vidare.",da:"Sætningen passer, men den svarer ikke. Læs videre.",no:"Setningen stemmer, men den svarer ikke. Les videre.",fi:"Lause on totta, mutta se ei vastaa. Lue eteenpäin."},
    hintLine1: {en:"Look at this page's heading. Does it match the question?",de:"Schau auf die Überschrift dieser Seite. Passt sie zur Frage?",fr:"Regarde le titre de cette page. Correspond-il à la question ?",es:"Mira el título de esta página. ¿Va con la pregunta?",pt:"Olhe o título desta página. Ele combina com a pergunta?",it:"Guarda il titolo di questa pagina. Va bene per la domanda?",nl:"Kijk naar de kop van deze bladzijde. Past die bij de vraag?",sv:"Titta på rubriken på den här sidan. Passar den till frågan?",da:"Se på overskriften på siden. Passer den til spørgsmålet?",no:"Se på overskriften på denne siden. Passer den til spørsmålet?",fi:"Katso tämän sivun otsikkoa. Sopiiko se kysymykseen?"},
    hintHead1: {en:"Read the heading you opened. Does it match the question?",de:"Lies die Überschrift, die du aufgeklappt hast. Passt sie zur Frage?",fr:"Lis le titre que tu as ouvert. Correspond-il à la question ?",es:"Lee el título que abriste. ¿Va con la pregunta?",pt:"Leia o título que você abriu. Ele combina com a pergunta?",it:"Leggi il titolo che hai aperto. Va bene per la domanda?",nl:"Lees de kop die je openklapte. Past die bij de vraag?",sv:"Läs rubriken du öppnade. Passar den till frågan?",da:"Læs den overskrift, du åbnede. Passer den til spørgsmålet?",no:"Les overskriften du åpnet. Passer den til spørsmålet?",fi:"Lue avaamasi otsikko. Sopiiko se kysymykseen?"},
    hintLine2: {en:"Find the line with the same words as the question. Then tap it.",de:"Such die Zeile mit denselben Wörtern wie in der Frage. Dann tippe sie an.",fr:"Cherche la ligne avec les mêmes mots que la question. Puis touche-la.",es:"Busca la línea con las mismas palabras que la pregunta. Luego tócala.",pt:"Procure a linha com as mesmas palavras da pergunta. Depois toque nela.",it:"Cerca la riga con le stesse parole della domanda. Poi toccala.",nl:"Zoek de regel met dezelfde woorden als de vraag. Tik er dan op.",sv:"Leta efter raden med samma ord som i frågan. Tryck sedan på den.",da:"Find linjen med de samme ord som i spørgsmålet. Tryk så på den.",no:"Finn linjen med de samme ordene som i spørsmålet. Trykk så på den.",fi:"Etsi rivi, jossa on samat sanat kuin kysymyksessä. Napauta sitä sitten."},
    hintGloss1: {en:"Read what that word means. Does it match the question?",de:"Lies, was dieses Wort bedeutet. Passt es zur Frage?",fr:"Lis ce que ce mot veut dire. Est-ce que ça correspond à la question ?",es:"Lee qué significa esa palabra. ¿Va con la pregunta?",pt:"Leia o que essa palavra quer dizer. Combina com a pergunta?",it:"Leggi che cosa vuol dire quella parola. Va bene per la domanda?",nl:"Lees wat dat woord betekent. Past het bij de vraag?",sv:"Läs vad ordet betyder. Passar det till frågan?",da:"Læs, hvad ordet betyder. Passer det til spørgsmålet?",no:"Les hva ordet betyr. Passer det til spørsmålet?",fi:"Lue, mitä sana tarkoittaa. Sopiiko se kysymykseen?"},
    hintGloss2: {en:"Find the meaning with the same words as the question.",de:"Such die Bedeutung mit denselben Wörtern wie in der Frage.",fr:"Cherche le sens avec les mêmes mots que la question.",es:"Busca el significado con las mismas palabras que la pregunta.",pt:"Procure o significado com as mesmas palavras da pergunta.",it:"Cerca il significato con le stesse parole della domanda.",nl:"Zoek de betekenis met dezelfde woorden als de vraag.",sv:"Leta efter betydelsen med samma ord som i frågan.",da:"Find den betydning, der har de samme ord som spørgsmålet.",no:"Finn betydningen med de samme ordene som i spørsmålet.",fi:"Etsi merkitys, jossa on samat sanat kuin kysymyksessä."},
    hintLabel1: {en:"Read that caption again. Does it answer the question?",de:"Lies den Text noch einmal. Beantwortet er die Frage?",fr:"Relis cette légende. Répond-elle à la question ?",es:"Vuelve a leer ese texto. ¿Responde la pregunta?",pt:"Leia esse texto de novo. Ele responde a pergunta?",it:"Rileggi la didascalia. Risponde alla domanda?",nl:"Lees dat bijschrift nog eens. Geeft het antwoord op de vraag?",sv:"Läs bildtexten igen. Svarar den på frågan?",da:"Læs billedteksten igen. Svarer den på spørgsmålet?",no:"Les bildeteksten igjen. Svarer den på spørsmålet?",fi:"Lue kuvateksti uudestaan. Vastaako se kysymykseen?"},
    hintLabel2: {en:"Read all three captions. Which one has the same words as the question?",de:"Lies alle drei Texte. Welcher hat dieselben Wörter wie die Frage?",fr:"Lis les trois légendes. Laquelle a les mêmes mots que la question ?",es:"Lee los tres textos. ¿Cuál tiene las mismas palabras que la pregunta?",pt:"Leia os três textos. Qual tem as mesmas palavras da pergunta?",it:"Leggi tutte e tre le didascalie. Quale ha le stesse parole della domanda?",nl:"Lees alle drie de bijschriften. Welk bijschrift heeft dezelfde woorden als de vraag?",sv:"Läs alla tre bildtexterna. Vilken har samma ord som frågan?",da:"Læs alle tre billedtekster. Hvilken har de samme ord som spørgsmålet?",no:"Les alle tre bildetekstene. Hvilken har de samme ordene som spørsmålet?",fi:"Lue kaikki kolme kuvatekstiä. Missä on samat sanat kuin kysymyksessä?"},
    hintTab1: {en:"What kind of page did the book open? Is it the right part?",de:"Was für eine Seite hat das Buch aufgeschlagen? Ist es der richtige Teil?",fr:"Quel genre de page le livre a-t-il ouvert ? Est-ce la bonne partie ?",es:"¿Qué tipo de página abrió el libro? ¿Es la parte correcta?",pt:"Que tipo de página o livro abriu? É a parte certa?",it:"Che tipo di pagina ha aperto il libro? È la parte giusta?",nl:"Wat voor bladzijde sloeg het boek open? Is het het goede deel?",sv:"Vilken sorts sida öppnade boken? Är det rätt del?",da:"Hvilken slags side slog bogen op? Er det den rigtige del?",no:"Hva slags side slo boka opp? Er det riktig del?",fi:"Millaisen sivun kirja avasi? Onko se oikea osa?"},
    hintIcon1: {en:"That button did something else. Which button does the job?",de:"Dieser Knopf hat etwas anderes gemacht. Welcher Knopf macht das?",fr:"Ce bouton a fait autre chose. Quel bouton fait ce travail ?",es:"Ese botón hizo otra cosa. ¿Qué botón hace ese trabajo?",pt:"Esse botão fez outra coisa. Qual botão faz isso?",it:"Quel pulsante ha fatto un’altra cosa. Quale pulsante lo fa?",nl:"Die knop deed iets anders. Welke knop doet het wel?",sv:"Den knappen gjorde något annat. Vilken knapp gör det?",da:"Den knap gjorde noget andet. Hvilken knap gør det?",no:"Den knappen gjorde noe annet. Hvilken knapp gjør det?",fi:"Se nappi teki jotain muuta. Mikä nappi tekee sen?"},
    okPage: {en:"Found it on page {p}!",de:"Gefunden auf Seite {p}!",fr:"Trouvé à la page {p} !",es:"¡Lo encontraste en la página {p}!",pt:"Achou na página {p}!",it:"Trovato a pagina {p}!",nl:"Gevonden op bladzijde {p}!",sv:"Hittat på sidan {p}!",da:"Fundet på side {p}!",no:"Funnet på side {p}!",fi:"Löytyi sivulta {p}!"},
    okHead: {en:"Found it under the right heading!",de:"Gefunden unter der richtigen Überschrift!",fr:"Trouvé sous le bon titre !",es:"¡Lo encontraste bajo el título correcto!",pt:"Achou embaixo do título certo!",it:"Trovato sotto il titolo giusto!",nl:"Gevonden onder de goede kop!",sv:"Hittat under rätt rubrik!",da:"Fundet under den rigtige overskrift!",no:"Funnet under riktig overskrift!",fi:"Löytyi oikean otsikon alta!"},
    okGloss: {en:"Yes! {word}: {gloss}.",de:"Ja! {word}: {gloss}.",fr:"Oui ! {word} : {gloss}.",es:"¡Sí! {word}: {gloss}.",pt:"Isso! {word}: {gloss}.",it:"Sì! {word}: {gloss}.",nl:"Ja! {word}: {gloss}.",sv:"Ja! {word}: {gloss}.",da:"Ja! {word}: {gloss}.",no:"Ja! {word}: {gloss}.",fi:"Kyllä! {word}: {gloss}."},
    okLabel: {en:"Yes! The caption under «{label}» answers it.",de:"Ja! Der Text bei „{label}“ beantwortet die Frage.",fr:"Oui ! La légende « {label} » répond à la question.",es:"¡Sí! El texto de «{label}» responde la pregunta.",pt:"Isso! O texto de “{label}” responde a pergunta.",it:"Sì! La didascalia «{label}» risponde alla domanda.",nl:"Ja! Het bijschrift bij ‘{label}’ geeft het antwoord.",sv:"Ja! Bildtexten vid ”{label}” svarar på frågan.",da:"Ja! Billedteksten ved ”{label}” svarer på spørgsmålet.",no:"Ja! Bildeteksten ved «{label}» svarer på spørsmålet.",fi:"Kyllä! Kuvateksti ”{label}” vastaa kysymykseen."},
    aCard: {en:"Dewey's question",de:"Deweys Frage",fr:"La question de Dewey",es:"La pregunta de Dewey",pt:"A pergunta do Dewey",it:"La domanda di Dewey",nl:"De vraag van Dewey",sv:"Deweys fråga",da:"Deweys spørgsmål",no:"Spørsmålet til Dewey",fi:"Deweyn kysymys"},
    aFound: {en:"Found: {s}",de:"Gefunden: {s}",fr:"Trouvé : {s}",es:"Encontrado: {s}",pt:"Achado: {s}",it:"Trovato: {s}",nl:"Gevonden: {s}",sv:"Hittat: {s}",da:"Fundet: {s}",no:"Funnet: {s}",fi:"Löytyi: {s}"},
    aBack: {en:"Back to {f}",de:"Zurück zu: {f}",fr:"Retour : {f}",es:"Volver a: {f}",pt:"Voltar para: {f}",it:"Torna a: {f}",nl:"Terug naar: {f}",sv:"Tillbaka till: {f}",da:"Tilbage til: {f}",no:"Tilbake til: {f}",fi:"Takaisin: {f}"},
    aDial: {en:"Page {p}",de:"Seite {p}",fr:"Page {p}",es:"Página {p}",pt:"Página {p}",it:"Pagina {p}",nl:"Bladzijde {p}",sv:"Sida {p}",da:"Side {p}",no:"Side {p}",fi:"Sivu {p}"},
    aLine: {en:"Chapter {n}: {name}, {desc}, page {p}",de:"Kapitel {n}: {name}, {desc}, Seite {p}",fr:"Chapitre {n} : {name}, {desc}, page {p}",es:"Capítulo {n}: {name}, {desc}, página {p}",pt:"Capítulo {n}: {name}, {desc}, página {p}",it:"Capitolo {n}: {name}, {desc}, pagina {p}",nl:"Hoofdstuk {n}: {name}, {desc}, bladzijde {p}",sv:"Kapitel {n}: {name}, {desc}, sida {p}",da:"Kapitel {n}: {name}, {desc}, side {p}",no:"Kapittel {n}: {name}, {desc}, side {p}",fi:"Luku {n}: {name}, {desc}, sivu {p}"},
    aIdx: {en:"{topic}, page {p}",de:"{topic}, Seite {p}",fr:"{topic}, page {p}",es:"{topic}, página {p}",pt:"{topic}, página {p}",it:"{topic}, pagina {p}",nl:"{topic}, bladzijde {p}",sv:"{topic}, sida {p}",da:"{topic}, side {p}",no:"{topic}, side {p}",fi:"{topic}, sivu {p}"},
    aFlap: {en:"{h}, folded",de:"{h}, zugeklappt",fr:"{h}, fermé",es:"{h}, cerrado",pt:"{h}, fechado",it:"{h}, chiuso",nl:"{h}, dichtgeklapt",sv:"{h}, hopvikt",da:"{h}, foldet sammen",no:"{h}, brettet sammen",fi:"{h}, suljettu"},
    aLabel: {en:"{label} label",de:"Schild: {label}",fr:"Étiquette : {label}",es:"Etiqueta: {label}",pt:"Etiqueta: {label}",it:"Etichetta: {label}",nl:"Kaartje: {label}",sv:"Etikett: {label}",da:"Etiket: {label}",no:"Lapp: {label}",fi:"Nimilappu: {label}"},
    aTab: {en:"{tab} tab",de:"Reiter: {tab}",fr:"Onglet : {tab}",es:"Pestaña: {tab}",pt:"Aba: {tab}",it:"Linguetta: {tab}",nl:"Tabblad: {tab}",sv:"Flik: {tab}",da:"Fane: {tab}",no:"Fane: {tab}",fi:"Välilehti: {tab}"},
    aScreen: {en:"Screen book",de:"Bildschirm-Buch",fr:"Livre sur l’écran",es:"Libro de la pantalla",pt:"Livro da tela",it:"Libro sullo schermo",nl:"Schermboek",sv:"Skärmbok",da:"Skærmbog",no:"Skjermbok",fi:"Näyttökirja"},
    iSearch: {en:"Magnifier",de:"Lupe",fr:"Loupe",es:"Lupa",pt:"Lupa",it:"Lente",nl:"Vergrootglas",sv:"Förstoringsglas",da:"Forstørrelsesglas",no:"Forstørrelsesglass",fi:"Suurennuslasi"},
    iListen: {en:"Speaker",de:"Lautsprecher",fr:"Haut-parleur",es:"Bocina",pt:"Alto-falante",it:"Altoparlante",nl:"Luidspreker",sv:"Högtalare",da:"Højttaler",no:"Høyttaler",fi:"Kaiutin"},
    iNext: {en:"Arrow",de:"Pfeil",fr:"Flèche",es:"Flecha",pt:"Seta",it:"Freccia",nl:"Pijl",sv:"Pil",da:"Pil",no:"Pil",fi:"Nuoli"},
    iHome: {en:"House",de:"Haus",fr:"Maison",es:"Casa",pt:"Casa",it:"Casa",nl:"Huis",sv:"Hus",da:"Hus",no:"Hus",fi:"Talo"},
    setTools: {en:"Book tools",de:"Werkzeuge im Buch",fr:"Outils du livre",es:"Herramientas del libro",pt:"Ferramentas do livro",it:"Strumenti del libro",nl:"Hulpmiddelen in het boek",sv:"Bokens verktyg",da:"Bogens værktøjer",no:"Verktøy i boka",fi:"Kirjan apuvälineet"},
    mA: {en:"Contents & headings",de:"Inhaltsverzeichnis & Überschriften",fr:"Sommaire et titres",es:"Índice y títulos",pt:"Sumário e títulos",it:"Indice e titoli",nl:"Inhoud en koppen",sv:"Innehåll och rubriker",da:"Indhold og overskrifter",no:"Innhold og overskrifter",fi:"Sisällys ja otsikot"},
    mB: {en:"Words to Know & Index",de:"Wichtige Wörter & Register",fr:"Lexique et index",es:"Glosario",pt:"Glossário",it:"Glossario e indice analitico",nl:"Woordenlijst en register",sv:"Ordlista och register",da:"Ordliste og stikordsregister",no:"Ordliste og register",fi:"Sanasto ja hakemisto"},
    mC: {en:"Picture labels",de:"Bilder mit Schildern",fr:"Images légendées",es:"Imágenes con etiquetas",pt:"Imagens com etiquetas",it:"Immagini con etichette",nl:"Plaatjes met kaartjes",sv:"Bilder med etiketter",da:"Billeder med etiketter",no:"Bilder med lapper",fi:"Kuvat ja nimilaput"},
    mD: {en:"Which tool?",de:"Welches Werkzeug?",fr:"Quel outil ?",es:"¿Qué herramienta?",pt:"Qual ferramenta?",it:"Quale strumento?",nl:"Welk hulpmiddel?",sv:"Vilket verktyg?",da:"Hvilket værktøj?",no:"Hvilket verktøy?",fi:"Mikä apuväline?"},
    setHelp: {en:"Help",de:"Hilfe",fr:"Aide",es:"Ayuda",pt:"Ajuda",it:"Aiuto",nl:"Hulp",sv:"Hjälp",da:"Hjælp",no:"Hjelp",fi:"Apu"},
    hAfter: {en:"Underlines after a miss",de:"Unterstreichen nach einem Fehler",fr:"Souligner après une erreur",es:"Subrayar después de un error",pt:"Sublinhar depois de um erro",it:"Sottolineare dopo un errore",nl:"Onderstrepen na een fout",sv:"Understrykning efter ett fel",da:"Understregning efter en fejl",no:"Understreking etter en feil",fi:"Alleviivaus virheen jälkeen"},
    hStart: {en:"Underlines from the start",de:"Unterstreichen von Anfang an",fr:"Souligner dès le début",es:"Subrayar desde el principio",pt:"Sublinhar desde o começo",it:"Sottolineare dall’inizio",nl:"Onderstrepen vanaf het begin",sv:"Understrykning från början",da:"Understregning fra start",no:"Understreking fra start",fi:"Alleviivaus alusta asti"},
  },/*STRINGS-END*/

  defaults: { tools: 'A', help: 'after' },
  settings: [
    { key: 'tools', type: 'choice', labelKey: 'setTools', options: [{ value: 'A', labelKey: 'mA' }, { value: 'B', labelKey: 'mB' }, { value: 'C', labelKey: 'mC' }, { value: 'D', labelKey: 'mD' }] },
    { key: 'help', type: 'choice', labelKey: 'setHelp', options: [{ value: 'after', labelKey: 'hAfter' }, { value: 'start', labelKey: 'hStart' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._refs = {};
    this._timers = []; this._ro = null; this._view = {}; this._nudged = {}; this._riffle = false;
    injectFieldGuideCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st) { this.st.helpStart = this._help(); if (this._wrap) this._paint(); }
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return FieldGuideCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return FieldGuideCore.levelOf(this._setting('tools')); },
  _help: function () { return this._setting('help') === 'start'; },
  _key: function () { return this._loc() + '/' + this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = FieldGuideCore.rounds(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._refs = {}; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = FieldGuideCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._level(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._refs = P.refs; this._orderForPool = pool; this._pass = pass; }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'fieldguide.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t('instruction'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._riffle = false;
    var ref = this._level() === 'D' && r >= 4 ? (this._refs && this._refs[r]) || null : null;
    this.st = FieldGuideCore.newState(this._loc(), this._level(), r, ref, this._help());
    this._view = { note: '', ok: '' }; this._fresh = null;
    var nk = this._nudgeKey(); if (!this._nudged[nk]) { this._view.note = this._t(nk); this._view.nudge = true; }
    this._setPrompt();
  },
  _nudgeKey: function () { var k = this.st.kind; return k === 'toc' || k === 'index' ? 'nudgeLine' : k === 'head' ? 'nudgeHead' : k === 'gloss' ? 'nudgeGloss' : k === 'bold' ? 'nudgeBold' : k === 'label' ? 'nudgeLabel' : k === 'tab' ? 'nudgeTab' : 'nudgeIcon'; },
  _clearHelp: function () { if (this._view.nudge) this._nudged[this._nudgeKey()] = true; this._view.note = ''; this._view.nudge = false; },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : this._pool[0], 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'fg-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<section class="fg-card"></section><div class="fg-book"></div><p class="fg-note" aria-live="polite"></p><p class="fg-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _el: function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; },
  _dims: function () { var W = this._width(), B = FieldGuideCore.band(W); return { W: W, wide: B.wide, tiny: B.tiny, xs: B.xs, dewey: B.wide ? 96 : 64, pic: B.wide ? 200 : Math.max(96, Math.min(150, Math.floor(W * 0.42))) }; },
  _img: function (pic, size, cls) { return '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="/image-library-webp/themes/' + pic + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  _sr: function (s) { var el = this._qs('.fg-sr'); if (el) el.textContent = s; },
  /* "[key] words": the key as a span (with a class when the help underlines it) */
  _mark: function (s, cls) { return esc(s).replace(/\[([^\]]+)\]/g, function (m, k) { return '<span class="fg-k' + (cls ? ' ' + cls : '') + '">' + k + '</span>'; }); },
  /* the class a feature item's key word gets: grey with the help on, teal for the match from miss 2, dotted for the wrong place at miss 1 */
  _kcls: function (part) {
    var C = FieldGuideCore, st = this.st;
    if (C.contrast(st) === part) return 'k-wrong';
    if (C.underline(st)) return C.marksMatch(st) && part === C.answer(st.rd) ? 'k-match' : 'k-help';
    return '';
  },
  _qcls: function () { var C = FieldGuideCore, st = this.st; return C.contrast(st) ? 'k-ask' : C.underline(st) ? 'k-match' : ''; },
  _emblem: function (size) { return '<svg class="fg-art" viewBox="0 0 40 40" width="' + size + '" height="' + size + '" aria-hidden="true"><circle cx="17" cy="17" r="10" fill="#F6E7B8" stroke="#8C5E33" stroke-width="3.5"/><path d="M24.5 24.5 L34 34" stroke="#8C5E33" stroke-width="5" stroke-linecap="round"/></svg>'; },

  _paint_: function () {
    var C = FieldGuideCore, st = this.st, D = this._dims(), v = this._view, self = this;
    this._wrap.className = 'fg-wrap k-' + st.kind + (D.wide ? ' is-wide' : ' is-narrow') + (D.tiny ? ' is-tiny' : '') + (D.xs ? ' is-xs' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    /* Dewey's case card */
    var card = this._qs('.fg-card'); card.innerHTML = ''; card.setAttribute('aria-label', this._t('aCard'));
    var dw = this._el('span', 'fg-dewey' + (st.done && this._fresh === 'done' ? ' is-hop' : ''), this._img(C.DATA.DEWEY, D.dewey)); dw.setAttribute('aria-hidden', 'true'); card.appendChild(dw);
    var body = this._el('div', 'fg-cardbody');
    body.appendChild(this._el('p', 'fg-q', this._mark(C.question(st.loc, st.rd), this._qcls())));
    var slot = this._el('div', 'fg-slot' + (st.done ? ' is-full' : '') + (st.done && this._fresh === 'done' ? ' is-new' : ''));
    if (st.done) { var f = this._foundText(); slot.innerHTML = '<span class="fg-stamp" aria-hidden="true">' + this._emblem(30) + '</span><span class="fg-found">' + esc(f) + '</span>'; slot.setAttribute('aria-label', this._t('aFound', { s: f })); }
    body.appendChild(slot); card.appendChild(body);
    /* the book */
    var book = this._qs('.fg-book'); book.innerHTML = ''; book.className = 'fg-book';
    var k = st.kind;
    if (k === 'toc' || k === 'index') this._bookLines(book, D);
    else if (k === 'head') this._bookHead(book, D);
    else if (k === 'gloss') this._bookGloss(book, D, false);
    else if (k === 'bold') this._bookBold(book, D);
    else if (k === 'label') this._bookLabels(book, D);
    else if (k === 'tab') this._bookTabs(book, D);
    else if (k === 'icon') this._bookScreen(book, D);
    var note = this._qs('.fg-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'fg-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'fg-note' + (v.nudge ? ' is-nudge' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'fg-note'; }
    if (k === 'label') this._leaders();
    this._fresh = null;
  },
  _foundText: function () {
    var C = FieldGuideCore, st = this.st, f = st.found;
    if (st.kind === 'toc' || st.kind === 'index' || st.kind === 'head') return C.page(st.loc, f.part).s[C.FACT];
    if (st.kind === 'gloss' || st.kind === 'bold') { var t = C.partText(st.loc, f.part); return t.name + C.colon(st.loc) + C.plain(t.gloss); }
    if (st.kind === 'label') { var P = C.picture(st.loc, st.rd); return C.plain(P.labels.filter(function (l) { return l.key === f.key; })[0].caption); }
    if (st.kind === 'tab') return C.featName(st.loc, f.tab);
    return this._t(f.icon === 'search' ? 'iSearch' : 'iListen');
  },
  /* a page of the book: a header strip, a body, the page number at the foot */
  _page: function (cls, head, num) {
    var pg = this._el('div', 'fg-page ' + (cls || ''));
    if (head != null) pg.appendChild(this._el('div', 'fg-phead', head));
    var bd = this._el('div', 'fg-pbody'); pg.appendChild(bd);
    if (num != null) pg.appendChild(this._el('span', 'fg-pnum', esc(String(num))));
    pg._body = bd; return pg;
  },
  _dial: function (p) {
    var d = this._el('span', 'fg-dial' + (this._riffle ? ' is-turn' : ''), '<svg class="fg-art" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true"><circle cx="24" cy="24" r="21" fill="#E7C46B" stroke="#8C5E33" stroke-width="3"/><circle cx="24" cy="24" r="15" fill="#FFF6DA" stroke="#B88A3A" stroke-width="2"/></svg><b>' + (p == null ? '' : esc(String(p))) + '</b>');
    d.setAttribute('role', 'img'); d.setAttribute('aria-label', p == null ? '' : this._t('aDial', { p: p })); return d;
  },
  _ribbon: function (featLabel) {
    var self = this, b = this._btn('fg-ribbon', 'back', this._t('aBack', { f: featLabel }), '<svg class="fg-art" viewBox="0 0 24 34" width="20" height="28" aria-hidden="true"><path d="M3 0 H21 V32 L12 25 L3 32 Z" fill="#C8503A"/></svg>');
    b.disabled = this.st.done; b.addEventListener('click', function () { if (FieldGuideCore.back(self.st) === 'no') return; self.api.sound(300); self._clearHelp(); self._paint(); });
    return b;
  },
  /* a chapter page with its two sentences (taps on the open page) */
  _chapterPage: function (part, D, opts) {
    var C = FieldGuideCore, st = this.st, self = this, P = C.page(st.loc, part), t = C.partText(st.loc, part);
    var pg = this._page('is-chapter' + (opts && opts.riffle ? ' is-riffle' : ''), '<b>' + esc(t.name) + esc(C.colon(st.loc)).replace(/ $/, '') + '</b> ' + this._mark(t.desc, this._kcls(part)), P.p);
    P.s.forEach(function (s, i) {
      var fact = st.found && st.found.part === part && i === C.FACT;
      var b = self._btn('fg-sent' + (fact ? ' is-found' : '') + (self._fresh === 'read-' + part + i ? ' is-shrug' : ''), 'sent-' + part + '-' + i, null, esc(s));
      b.disabled = st.done; b.addEventListener('click', function () { self._sentence(part, i); });
      pg._body.appendChild(b);
    });
    return pg;
  },
  _blankPage: function () { var pg = this._page('is-blank', null, null); pg.setAttribute('aria-hidden', 'true'); return pg; },
  /* Level A contents / Level B index: the feature on the left, the page it sent the book to on the right (one page at a time on phones) */
  _bookLines: function (book, D) {
    var C = FieldGuideCore, st = this.st, self = this, k = st.kind, featLabel = C.featName(st.loc, k);
    var feat = this._page('is-feat', esc(featLabel), null);
    C.lines(st.loc, st.rd).forEach(function (l) {
      var txt = k === 'toc' ? '<span class="fg-n">' + l.n + '</span><span class="fg-lt"><b>' + esc(l.name) + esc(C.colon(st.loc)).replace(/ $/, '') + '</b> ' + self._mark(l.desc, self._kcls(l.part)) + '</span>' : '<span class="fg-lt">' + self._mark(l.topic, self._kcls(l.part)) + '</span>';
      var aria = k === 'toc' ? self._t('aLine', { n: l.n, name: l.name, desc: C.plain(l.desc), p: l.p }) : self._t('aIdx', { topic: C.plain(l.topic), p: l.p });
      var b = self._btn('fg-line' + (st.opened === l.part ? ' is-on' : ''), 'line-' + l.part, aria, txt + '<span class="fg-dots" aria-hidden="true"></span><span class="fg-lp">' + l.p + '</span>');
      b.disabled = st.done; b.addEventListener('click', function () { self._send(l.part); });
      feat._body.appendChild(b);
    });
    var target = st.opened ? this._chapterPage(st.opened, D, { riffle: this._riffle }) : this._blankPage();
    if (st.opened) target.insertBefore(this._ribbon(featLabel), target.firstChild);
    var spread = this._el('div', 'fg-spread');
    if (D.wide) { spread.appendChild(feat); spread.appendChild(this._dial(st.opened ? C.pageOf(st.opened) : null)); spread.appendChild(target); }
    else spread.appendChild(st.opened ? target : feat);
    book.appendChild(spread);
  },
  /* Level A headings: one page, its sections folded behind their headings */
  _bookHead: function (book, D) {
    var C = FieldGuideCore, st = this.st, self = this, cre = C.creature(st.rd);
    var pg = this._page('is-flaps', '<b>' + esc(C.creName(st.loc, cre)) + '</b>', null);
    C.lines(st.loc, st.rd).forEach(function (l) {
      var open = st.flap === l.part, t = C.partText(st.loc, l.part);
      var sec = self._el('div', 'fg-sec' + (open ? ' is-open' : '') + (self._fresh === 'sec-' + l.part ? ' is-new' : ''));
      var b = self._btn('fg-flap', 'flap-' + l.part, open ? C.plain(l.heading) : self._t('aFlap', { h: C.plain(l.heading) }), '<b>' + esc(t.name) + esc(C.colon(st.loc)).replace(/ $/, '') + '</b> ' + self._mark(t.desc, self._kcls(l.part)) + '<span class="fg-fold" aria-hidden="true"></span>');
      b.disabled = st.done; b.setAttribute('aria-expanded', open ? 'true' : 'false'); b.addEventListener('click', function () { self._flap(l.part); });
      sec.appendChild(b);
      if (open) {
        var P = C.page(st.loc, l.part), inner = self._el('div', 'fg-secbody');
        P.s.forEach(function (s, i) {
          var fact = st.found && st.found.part === l.part && i === C.FACT;
          var sb = self._btn('fg-sent' + (fact ? ' is-found' : '') + (self._fresh === 'read-' + l.part + i ? ' is-shrug' : ''), 'sent-' + l.part + '-' + i, null, esc(s));
          sb.disabled = st.done; sb.addEventListener('click', function () { self._sentence(l.part, i); });
          inner.appendChild(sb);
        });
        sec.appendChild(inner);
      }
      pg._body.appendChild(sec);
    });
    book.appendChild(pg);
  },
  /* Level B glossary: Words to Know, alphabetical, word and meaning */
  _glossPage: function (D, live) {
    var C = FieldGuideCore, st = this.st, self = this, pg = this._page('is-gloss' + (st.kind === 'bold' && !this.FAST ? ' is-riffle' : ''), esc(C.featName(st.loc, 'gloss')), null);
    C.lines(st.loc, st.rd, 'gloss').forEach(function (l) {
      var on = st.found && st.found.part === l.part;
      var b = self._btn('fg-entry' + (on ? ' is-found' : ''), 'entry-' + l.part, null, '<b>' + esc(l.name) + '</b><span class="fg-gl">' + self._mark(l.gloss, self._kcls(l.part)) + '</span>');
      b.disabled = st.done || !live; b.addEventListener('click', function () { self._entry(l.part); });
      pg._body.appendChild(b);
    });
    return pg;
  },
  _bookGloss: function (book, D) { book.appendChild(this._glossPage(D, true)); },
  /* Level B bold word: a page with a bold word; tapping it flips the book to Words to Know */
  _bookBold: function (book, D) {
    var C = FieldGuideCore, st = this.st, self = this, cre = C.creature(st.rd);
    var pg = this._page('is-boldpage', '<b>' + esc(C.creName(st.loc, cre)) + '</b>', C.pageOf(st.rd.part));
    var txt = C.boldText(st.loc, st.rd.part), m = /\[([^\]]+)\]/.exec(txt), p = this._el('p', 'fg-boldline');
    p.appendChild(document.createTextNode(txt.slice(0, m.index)));
    var b = this._btn('fg-bold', 'bold', null, esc(m[1])); b.disabled = st.done; b.addEventListener('click', function () { self._bold(); });
    p.appendChild(b); p.appendChild(document.createTextNode(txt.slice(m.index + m[0].length)));
    pg._body.appendChild(p);
    var spread = this._el('div', 'fg-spread');
    if (D.wide) { spread.appendChild(pg); spread.appendChild(this._el('span', 'fg-spine')); spread.appendChild(st.glossOpen ? this._glossPage(D, true) : this._blankPage()); }
    else if (st.glossOpen) { var g = this._glossPage(D, true); g.insertBefore(this._backBold(), g.firstChild); spread.appendChild(g); }
    else spread.appendChild(pg);
    book.appendChild(spread);
  },
  _backBold: function () { var self = this, cre = FieldGuideCore.creature(this.st.rd), b = this._btn('fg-ribbon', 'back', this._t('aBack', { f: FieldGuideCore.creName(this.st.loc, cre) }), '<svg class="fg-art" viewBox="0 0 24 34" width="20" height="28" aria-hidden="true"><path d="M3 0 H21 V32 L12 25 L3 32 Z" fill="#C8503A"/></svg>'); b.disabled = this.st.done; b.addEventListener('click', function () { self.st.glossOpen = false; self.api.sound(300); self._clearHelp(); self._paint(); }); return b; },
  /* Level C: a library animal with three labels on leader lines; a label opens its caption */
  _bookLabels: function (book, D) {
    var C = FieldGuideCore, st = this.st, self = this, P = C.picture(st.loc, st.rd), help = C.marksMatch(st);
    var pg = this._page('is-picpage', null, null);
    var row = this._el('div', 'fg-picrow');
    var pic = this._el('div', 'fg-pic', this._img(P.pic, D.pic)); pic.style.width = D.pic + 'px'; pic.style.height = D.pic + 'px';
    P.labels.forEach(function (l) { var dot = self._el('i', 'fg-anchor'); dot.setAttribute('data-a', l.key); dot.style.left = (l.at[0] * 100) + '%'; dot.style.top = (l.at[1] * 100) + '%'; pic.appendChild(dot); });
    row.appendChild(pic);
    var tags = this._el('div', 'fg-tags');
    P.labels.forEach(function (l) {
      var open = !!st.labels[l.key] || help, cell = self._el('div', 'fg-tagcell');
      var t = self._btn('fg-tag' + (open ? ' is-open' : ''), 'label-' + l.key, self._t('aLabel', { label: l.label }), esc(l.label)); t.setAttribute('data-a', l.key);
      t.disabled = st.done; t.setAttribute('aria-expanded', open ? 'true' : 'false'); t.addEventListener('click', function () { self._label(l.key); });
      cell.appendChild(t);
      if (open) {
        var on = st.found && st.found.key === l.key, cls = C.underline(st) ? (help && l.key === st.rd.ans ? 'k-match' : 'k-help') : '';
        var cb = self._btn('fg-cap' + (on ? ' is-found' : '') + (self._fresh === 'cap-' + l.key ? ' is-new' : ''), 'cap-' + l.key, null, self._mark(l.caption, cls));
        cb.disabled = st.done; cb.addEventListener('click', function () { if (!st.labels[l.key]) FieldGuideCore.label(st, l.key); self._caption(l.key); });
        cell.appendChild(cb);
      }
      tags.appendChild(cell);
    });
    row.appendChild(tags);
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('class', 'fg-leaders'); svg.setAttribute('aria-hidden', 'true');
    pg._body.appendChild(row); pg._body.appendChild(svg);
    book.appendChild(pg);
  },
  /* leader lines: from each label's left edge to its measured point on the picture */
  _leaders: function () {
    var pg = this._qs('.is-picpage .fg-pbody'), svg = pg && pg.querySelector('.fg-leaders'); if (!svg) return;
    var R = pg.getBoundingClientRect(), html = '';
    pg.querySelectorAll('.fg-tag').forEach(function (t) {
      var a = pg.querySelector('.fg-anchor[data-a="' + t.getAttribute('data-a') + '"]'); if (!a) return;
      var tr = t.getBoundingClientRect(), ar = a.getBoundingClientRect();
      var x1 = tr.left - R.left, y1 = tr.top + tr.height / 2 - R.top, x2 = ar.left + ar.width / 2 - R.left, y2 = ar.top + ar.height / 2 - R.top;
      html += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '"/>';
    });
    svg.setAttribute('width', Math.round(R.width)); svg.setAttribute('height', Math.round(R.height)); svg.innerHTML = html;
  },
  /* Level D: the closed book with its tabs; a tab opens that part of the book */
  _bookTabs: function (book, D) {
    var C = FieldGuideCore, st = this.st, self = this, T = C.tabs(st.loc);
    var holder = this._el('div', 'fg-closed');
    var tabs = this._el('div', 'fg-tabs');
    T.forEach(function (t, i) {
      var b = self._btn('fg-tab tb-' + t.id + (st.tab === t.id ? ' is-on' : ''), 'tab-' + t.id, self._t('aTab', { tab: t.name }), esc(t.name));
      b.disabled = st.done; b.setAttribute('aria-pressed', st.tab === t.id ? 'true' : 'false'); b.addEventListener('click', function () { self._tab(t.id); });
      tabs.appendChild(b);
    });
    var shown;
    if (!st.tab) shown = this._el('div', 'fg-cover', this._emblem(D.wide ? 120 : 84));
    else if (st.tab === 'gloss') shown = this._glossPage(D, false);
    else { shown = this._page('is-feat' + (this.FAST ? '' : ' is-riffle'), esc(C.featName(st.loc, st.tab)), null); C.lines(st.loc, { k: st.tab, part: 'frell' }).forEach(function (l) { shown._body.appendChild(self._el('div', 'fg-line is-static', st.tab === 'toc' ? '<span class="fg-n">' + l.n + '</span><span class="fg-lt"><b>' + esc(l.name) + esc(C.colon(st.loc)).replace(/ $/, '') + '</b> ' + self._mark(l.desc, '') + '</span><span class="fg-dots"></span><span class="fg-lp">' + l.p + '</span>' : '<span class="fg-lt">' + self._mark(l.topic, '') + '</span><span class="fg-dots"></span><span class="fg-lp">' + l.p + '</span>')); }); }
    if (D.wide) { holder.appendChild(shown); holder.appendChild(tabs); } else { holder.appendChild(tabs); holder.appendChild(shown); }
    book.appendChild(holder);
  },
  /* Level D: the screen book; each button does its own job */
  _bookScreen: function (book, D) {
    var C = FieldGuideCore, st = this.st, self = this, parts = C.DATA.CRE.nim.parts;
    var tab = this._el('div', 'fg-tablet'); tab.setAttribute('role', 'group'); tab.setAttribute('aria-label', this._t('aScreen'));
    var scr = this._el('div', 'fg-screen' + (st.icon === 'listen' ? ' is-listen' : '') + (st.icon === 'search' ? ' is-search' : ''));
    if (st.screen < 0) scr.appendChild(this._el('div', 'fg-cover is-small', this._emblem(70)));
    else { var P = C.page(st.loc, parts[st.screen]), t = C.partText(st.loc, parts[st.screen]); scr.appendChild(this._el('div', 'fg-phead', '<b>' + esc(t.name) + esc(C.colon(st.loc)).replace(/ $/, '') + '</b> ' + this._mark(t.desc, ''))); P.s.forEach(function (s) { scr.appendChild(self._el('p', 'fg-stext', esc(s))); }); scr.appendChild(this._el('span', 'fg-pnum', String(P.p))); }
    if (st.icon === 'search') scr.appendChild(this._el('div', 'fg-searchbox', '<span class="fg-caret"></span>'));
    if (st.icon === 'listen') scr.appendChild(this._el('div', 'fg-waves', '<svg class="fg-art" viewBox="0 0 60 40" width="60" height="40" aria-hidden="true"><path d="M8 20 h6 l10 -10 v20 l-10 -10" fill="#146B5E"/><path d="M32 12 q6 8 0 16 M40 6 q12 14 0 28" fill="none" stroke="#146B5E" stroke-width="3.5" stroke-linecap="round"/></svg>'));
    tab.appendChild(scr);
    var row = this._el('div', 'fg-icons');
    st.rd.icons.forEach(function (ic) {
      var b = self._btn('fg-icon ic-' + ic + (st.icon === ic ? ' is-on' : ''), 'icon-' + ic, self._t(ic === 'search' ? 'iSearch' : ic === 'listen' ? 'iListen' : ic === 'next' ? 'iNext' : 'iHome'), ICONS[ic]);
      b.disabled = st.done; b.addEventListener('click', function () { self._icon(ic); });
      row.appendChild(b);
    });
    tab.appendChild(row);
    book.appendChild(tab);
  },

  /* ---------------- the hand ---------------- */
  _after: function (r, hintSound) {
    var C = FieldGuideCore, st = this.st, v = this._view;
    if (r === 'found') { this._success(); return; }
    if (r === 'wrong') { var h = C.hint(st); v.nudge = false; v.note = h.key ? this._t(h.key) : C.tool(st.loc, h.tool); this.api.sound(200); this._paint(); this.api.announce(v.note); return; }
    this._paint();
  },
  _send: function (part) {
    var C = FieldGuideCore, st = this.st, self = this; if (st.done) return;
    var r = C.send(st, part); if (r === 'no') return;
    this._clearHelp(); this.api.sound(r === 'right' ? 620 : 420);
    this._riffle = !this.FAST; if (this._riffle) this._later(function () { self._riffle = false; var pg = self._qs('.fg-page.is-riffle'); if (pg) pg.classList.remove('is-riffle'); var d = self._qs('.fg-dial'); if (d) d.classList.remove('is-turn'); }, 560);
    if (r === 'right') { this._view.note = this._t('nudgeRead'); this._view.nudge = true; this._paint(); this._sr(C.plain(C.page(st.loc, part).heading)); return; }
    this._after(r);
    /* from the second miss the book closes back to the feature, its key words underlined */
    if (st.show >= 2) this._later(function () { if (!st.done && st.opened === part) { C.back(st); self._paint(); } }, this.FAST ? 0 : 900);
  },
  _flap: function (part) { var r = FieldGuideCore.flap(this.st, part); if (r === 'no') return; this._clearHelp(); this._fresh = 'sec-' + part; this.api.sound(r === 'right' ? 620 : 420); if (r === 'right') { this._view.note = this._t('nudgeRead'); this._view.nudge = true; this._paint(); return; } this._after(r); },
  _sentence: function (part, i) {
    var r = FieldGuideCore.sentence(this.st, part, i); if (r === 'no') return;
    if (r === 'found') { this._after(r); return; }
    this._fresh = 'read-' + part + i; this._view.nudge = false; this._view.note = this._t('readOn'); this.api.sound(260); this._paint();
  },
  _bold: function () { var r = FieldGuideCore.bold(this.st); if (r === 'no') return; this._clearHelp(); this.api.sound(560); this._view.note = this._t('nudgeGloss'); this._view.nudge = true; this._paint(); },
  _entry: function (part) { var r = FieldGuideCore.entry(this.st, part); if (r === 'no') return; this._clearHelp(); this._after(r); },
  _label: function (key) { var r = FieldGuideCore.label(this.st, key); if (r === 'no') return; this._fresh = 'cap-' + key; this.api.sound(520); if (this._view.nudge) this._clearHelp(); this._paint(); },
  _caption: function (key) { var r = FieldGuideCore.caption(this.st, key); if (r === 'no') return; this._clearHelp(); this._after(r); },
  _tab: function (t) { var r = FieldGuideCore.tab(this.st, t); if (r === 'no') return; this._clearHelp(); this._after(r); },
  _icon: function (ic) { var r = FieldGuideCore.icon(this.st, ic); if (r === 'no') return; this._clearHelp(); this._after(r); },
  _success: function () {
    var C = FieldGuideCore, st = this.st, v = this._view, k = st.kind, f = st.found;
    if (k === 'toc' || k === 'index') v.ok = this._t('okPage', { p: C.pageOf(f.part) });
    else if (k === 'head') v.ok = this._t('okHead');
    else if (k === 'gloss' || k === 'bold') { var t = C.partText(st.loc, f.part); v.ok = this._t('okGloss', { word: t.name, gloss: C.plain(t.gloss) }); }
    else if (k === 'label') v.ok = this._t('okLabel', { label: C.picture(st.loc, st.rd).labels.filter(function (l) { return l.key === f.key; })[0].label });
    else if (k === 'tab') v.ok = C.tool(st.loc, f.tab === 'gloss' ? 'okMeaning' : 'okTopic');
    else v.ok = C.tool(st.loc, f.icon === 'search' ? 'okSearch' : 'okListen');
    v.note = ''; v.nudge = false;
    this.api.sound(988); this._fresh = 'done'; this._paint(); this.api.announce(v.ok);
    this._advance(v.ok.length * 60 + 3800);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

/* the screen book's buttons, drawn */
var ICONS = {
  search: '<svg class="fg-art" viewBox="0 0 40 40" width="34" height="34" aria-hidden="true"><circle cx="17" cy="17" r="10" fill="#E8F4F1" stroke="#2F2A3B" stroke-width="3.5"/><path d="M24.5 24.5 L34 34" stroke="#2F2A3B" stroke-width="5" stroke-linecap="round"/></svg>',
  listen: '<svg class="fg-art" viewBox="0 0 40 40" width="34" height="34" aria-hidden="true"><path d="M6 15 h7 l9 -8 v26 l-9 -8 h-7 z" fill="#2F2A3B"/><path d="M27 14 q5 6 0 12 M31 9 q10 11 0 22" fill="none" stroke="#2F2A3B" stroke-width="3" stroke-linecap="round"/></svg>',
  next: '<svg class="fg-art" viewBox="0 0 40 40" width="34" height="34" aria-hidden="true"><path d="M8 20 H30 M21 11 L31 20 L21 29" fill="none" stroke="#2F2A3B" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  home: '<svg class="fg-art" viewBox="0 0 40 40" width="34" height="34" aria-hidden="true"><path d="M6 20 L20 7 L34 20 M10 17 V33 H30 V17" fill="none" stroke="#2F2A3B" stroke-width="3.5" stroke-linejoin="round"/><rect x="17" y="24" width="7" height="9" fill="#2F2A3B"/></svg>'
};
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectFieldGuideCSS() {
  if (typeof document === 'undefined' || document.getElementById('fg-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B', PAPER = '#FFFDF7', EDGE = '#E2CDA4';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.fg-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:12px;user-select:none;-webkit-user-select:none;} .fg-wrap:focus{outline:none;}'
  /* Dewey's case card */
  + '.fg-card{display:flex;align-items:flex-start;gap:12px;padding:10px 14px;border-radius:14px;background:#FBF1DC;box-shadow:inset 0 0 0 2px #E2C99A,0 3px 0 #E2C99A;}'
  + '.fg-dewey{flex:none;display:flex;} .fg-dewey img{display:block;object-fit:contain;} .fg-dewey.is-hop{animation:fgHop .5s ease-out;} @keyframes fgHop{40%{transform:translateY(-8px);}}'
  + '.fg-cardbody{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px;}'
  + '.fg-q{margin:0;font-family:' + H + ';font-weight:800;font-size:20px;line-height:1.25;color:' + INK + ';}'
  + '.fg-slot{min-height:40px;display:flex;align-items:center;gap:8px;padding:4px 10px;border-radius:10px;border:2px dashed #C9A36B;background:#FFF8EA;box-sizing:border-box;} .fg-slot.is-full{border-style:solid;border-color:#2E8C7E;background:#EAF6F2;} .fg-slot.is-new{animation:fgSlide .4s ease-out;} @keyframes fgSlide{from{transform:translateY(16px);opacity:.3;}}'
  + '.fg-stamp{flex:none;display:flex;transform:rotate(-12deg);} .fg-found{font-family:' + B + ';font-weight:800;font-size:16px;line-height:1.3;color:#145A50;}'
  /* the key words and the help */
  + '.fg-k{border-radius:3px;} .fg-k.k-help{text-decoration:underline;text-decoration-color:#9AA3AD;text-decoration-thickness:3px;text-underline-offset:4px;} .fg-k.k-match{text-decoration:underline;text-decoration-color:#146B5E;text-decoration-thickness:4px;text-underline-offset:4px;color:#145A50;}'
  + '.fg-k.k-ask{text-decoration:underline dotted;text-decoration-color:#146B5E;text-decoration-thickness:3px;text-underline-offset:4px;} .fg-k.k-wrong{text-decoration:underline dotted;text-decoration-color:#C8503A;text-decoration-thickness:3px;text-underline-offset:4px;}'
  /* the book */
  + '.fg-book{display:flex;justify-content:center;width:100%;}'
  + '.fg-spread{display:flex;align-items:stretch;width:100%;gap:0;} .fg-wrap.is-wide .fg-spread{padding:10px;border-radius:14px;background:#7A5638;box-shadow:0 5px 0 #5B3F28;} '
  + '.fg-page{position:relative;flex:1;min-width:0;display:flex;flex-direction:column;gap:6px;padding:12px 14px 26px;background:' + PAPER + ';border-radius:6px;box-shadow:inset 0 0 0 2px ' + EDGE + ';min-height:260px;box-sizing:border-box;}'
  + '.fg-wrap.is-wide .fg-spread .fg-page{box-shadow:inset 0 0 0 2px ' + EDGE + ',0 0 0 3px #E9D9B7;} .fg-wrap.is-narrow .fg-page{box-shadow:inset 0 0 0 2px ' + EDGE + ',0 4px 0 #D9C29A;}'
  + '.fg-page.is-blank{background:repeating-linear-gradient(180deg,' + PAPER + ' 0 30px,#F1E7D2 30px 31px);}'
  + '.fg-page.is-riffle{animation:fgRiffle .52s ease-out;transform-origin:left center;} @keyframes fgRiffle{0%{transform:perspective(900px) rotateY(-70deg);opacity:.4;}70%{transform:perspective(900px) rotateY(6deg);}100%{transform:none;}}'
  + '.fg-phead{font-family:' + H + ';font-weight:700;font-size:20px;line-height:1.25;color:#7A4A1E;padding:2px 2px 6px;border-bottom:2px solid #EADBB8;} .fg-phead b{font-weight:800;}'
  + '.fg-pbody{position:relative;display:flex;flex-direction:column;gap:6px;flex:1;}'
  + '.fg-pnum{position:absolute;right:12px;bottom:6px;font-family:' + B + ';font-weight:800;font-size:15px;color:#9C7A4A;}'
  + '.fg-dial{position:relative;flex:none;align-self:center;width:48px;height:48px;margin:0 6px;display:flex;align-items:center;justify-content:center;} .fg-dial svg{position:absolute;inset:0;} .fg-dial b{position:relative;font-family:' + H + ';font-weight:800;font-size:20px;color:#5B3F28;} .fg-dial.is-turn svg{animation:fgDial .2s ease-out;} @keyframes fgDial{from{transform:rotate(-60deg);}}'
  /* lines (contents / index) */
  + '.fg-line{position:relative;display:flex;align-items:center;gap:8px;min-height:52px;padding:6px 10px;border:0;border-radius:10px;background:#F6EEDC;box-shadow:inset 0 0 0 2px #E8DCC2;font-family:' + B + ';font-weight:700;font-size:18px;line-height:1.25;color:' + INK + ';text-align:left;cursor:pointer;} .fg-line.is-static{cursor:default;min-height:44px;font-size:16px;}'
  + '.fg-line.is-on{box-shadow:inset 0 0 0 3px #F2784B;} .fg-line:disabled{cursor:default;}'
  + '.fg-n{flex:none;width:28px;height:28px;border-radius:50%;background:#7A5638;color:#FFF;display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:16px;} .fg-lt{flex:0 1 auto;min-width:0;} .fg-lt b{font-weight:800;}'
  + '.fg-dots{flex:1 1 12px;min-width:12px;align-self:center;border-bottom:3px dotted #C9B48E;margin-top:8px;} .fg-lp{flex:none;font-family:' + H + ';font-weight:800;font-size:20px;color:#7A4A1E;}'
  /* sentences */
  + '.fg-sent{display:block;width:100%;min-height:48px;padding:8px 10px;border:0;border-radius:10px;background:transparent;box-shadow:inset 0 0 0 2px transparent;font-family:' + B + ';font-weight:700;font-size:18px;line-height:1.35;color:' + INK + ';text-align:left;cursor:pointer;} .fg-sent:hover{box-shadow:inset 0 0 0 2px #E8DCC2;background:#FBF4E4;} .fg-sent:disabled{cursor:default;}'
  + '.fg-sent.is-found{background:#EAF6F2;box-shadow:inset 0 0 0 3px #2E8C7E;} .fg-sent.is-shrug{animation:fgShrug .45s ease-in-out;} @keyframes fgShrug{25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}'
  + '.fg-ribbon{position:absolute;top:-2px;right:44px;width:44px;height:48px;border:0;padding:0;background:transparent;display:flex;justify-content:center;cursor:pointer;z-index:2;} .fg-ribbon svg{width:24px;height:36px;} .fg-ribbon:disabled{cursor:default;opacity:.6;}'
  + '.fg-page.is-chapter .fg-phead{padding-right:84px;}'
  /* heading flaps */
  + '.fg-page.is-flaps{min-height:0;} .fg-sec{display:flex;flex-direction:column;border-radius:10px;background:#F6EEDC;box-shadow:inset 0 0 0 2px #E8DCC2;} .fg-sec.is-open{background:' + PAPER + ';box-shadow:inset 0 0 0 3px #C9A36B;}'
  + '.fg-flap{position:relative;display:block;width:100%;box-sizing:border-box;min-height:56px;padding:6px 40px 6px 12px;border:0;border-radius:10px;background:transparent;font-family:' + H + ';font-weight:700;font-size:19px;line-height:1.25;color:#7A4A1E;text-align:left;cursor:pointer;} .fg-flap b{font-weight:800;} .fg-flap:disabled{cursor:default;}'
  + '.fg-fold{position:absolute;right:12px;top:50%;width:14px;height:14px;margin-top:-10px;border-right:4px solid #A07A4A;border-bottom:4px solid #A07A4A;transform:rotate(45deg);} .fg-sec.is-open .fg-fold{transform:rotate(225deg);margin-top:-2px;}'
  + '.fg-secbody{display:flex;flex-direction:column;gap:2px;padding:0 6px 8px;transform-origin:top;} .fg-sec.is-new .fg-secbody{animation:fgUnfold .3s ease-out;} @keyframes fgUnfold{from{transform:scaleY(.2);opacity:0;}}'
  /* glossary */
  + '.fg-entry{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 10px;min-height:52px;padding:8px 12px;border:0;border-radius:10px;background:#F6EEDC;box-shadow:inset 0 0 0 2px #E8DCC2;font-family:' + B + ';font-weight:700;font-size:18px;line-height:1.3;color:' + INK + ';text-align:left;cursor:pointer;} .fg-entry b{font-family:' + H + ';font-weight:800;font-size:20px;color:#7A4A1E;} .fg-entry:disabled{cursor:default;} .fg-entry.is-found{background:#EAF6F2;box-shadow:inset 0 0 0 3px #2E8C7E;}'
  + '.fg-boldline{margin:16px 4px;font-family:' + B + ';font-weight:700;font-size:20px;line-height:1.6;color:' + INK + ';} .fg-bold{display:inline-flex;align-items:center;min-height:44px;margin:0 2px;padding:0 10px;border:0;border-radius:8px;background:#FFF1C9;box-shadow:inset 0 0 0 2px #E7C46B;font-family:' + B + ';font-weight:900;font-size:20px;color:' + INK + ';cursor:pointer;vertical-align:middle;} .fg-bold:disabled{cursor:default;}'
  /* picture labels */
  + '.fg-page.is-picpage{min-height:0;padding:12px;} .fg-picrow{display:flex;align-items:center;gap:22px;} .fg-pic{position:relative;flex:none;} .fg-pic img{display:block;width:100%;height:100%;object-fit:contain;}'
  + '.fg-anchor{position:absolute;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;background:' + INK + ';box-shadow:0 0 0 2px #FFF;pointer-events:none;}'
  + '.fg-tags{flex:1;min-width:0;display:flex;flex-direction:column;gap:10px;position:relative;z-index:1;} .fg-tagcell{display:flex;flex-direction:column;gap:4px;}'
  + '.fg-tag{align-self:flex-start;min-height:44px;min-width:96px;padding:6px 14px;border:0;border-radius:22px;background:#FFF;box-shadow:inset 0 0 0 3px ' + INK + ';font-family:' + H + ';font-weight:800;font-size:20px;line-height:1.1;color:' + INK + ';cursor:pointer;} .fg-tag.is-open{background:#FFF1C9;} .fg-tag:disabled{cursor:default;}'
  + '.fg-cap{display:block;width:100%;min-height:44px;padding:6px 10px;border:0;border-radius:10px;background:#F6EEDC;box-shadow:inset 0 0 0 2px #E8DCC2;font-family:' + B + ';font-weight:700;font-size:17px;line-height:1.3;color:' + INK + ';text-align:left;cursor:pointer;transform-origin:top;} .fg-cap.is-new{animation:fgUnfold .25s ease-out;} .fg-cap:disabled{cursor:default;} .fg-cap.is-found{background:#EAF6F2;box-shadow:inset 0 0 0 3px #2E8C7E;}'
  + '.fg-leaders{position:absolute;left:0;top:0;pointer-events:none;overflow:visible;} .fg-leaders line{stroke:' + INK + ';stroke-width:2;}'
  /* the closed book and its tabs */
  + '.fg-closed{display:flex;align-items:flex-start;gap:0;width:100%;} .fg-wrap.is-narrow .fg-closed{flex-direction:column;align-items:stretch;gap:8px;}'
  + '.fg-cover{flex:1;min-height:250px;display:flex;align-items:center;justify-content:center;border-radius:8px 16px 16px 8px;background:#2E6E62;box-shadow:inset 12px 0 0 #24584E,inset 0 0 0 4px #1D4A42,0 5px 0 #1D4A42;} .fg-cover.is-small{min-height:150px;width:100%;}'
  + '.fg-tabs{display:flex;flex-direction:column;gap:10px;padding-top:18px;} .fg-wrap.is-narrow .fg-tabs{flex-direction:row;flex-wrap:wrap;gap:6px;padding-top:0;}'
  + '.fg-tab{min-height:48px;min-width:110px;padding:6px 14px 6px 12px;border:0;border-radius:0 12px 12px 0;font-family:' + H + ';font-weight:800;font-size:17px;line-height:1.15;color:#FFF;text-align:left;cursor:pointer;box-shadow:0 3px 0 rgba(0,0,0,.2);} .fg-wrap.is-narrow .fg-tab{flex:1 1 30%;border-radius:12px;text-align:center;min-width:0;}'
  + '.fg-wrap.is-narrow .fg-tab{hyphens:auto;-webkit-hyphens:auto;overflow-wrap:break-word;font-size:16px;padding:4px 6px;} .fg-spine{flex:none;width:20px;} .fg-tab.tb-toc{background:#146B5E;} .fg-tab.tb-gloss{background:#C8503A;} .fg-tab.tb-index{background:#B07A12;} .fg-tab.is-on{outline:4px solid #F4CF62;outline-offset:-4px;} .fg-tab:disabled{cursor:default;}'
  + '.fg-closed .fg-page{min-height:250px;}'
  /* the screen book */
  + '.fg-tablet{display:flex;flex-direction:column;gap:10px;width:100%;max-width:560px;padding:14px;border-radius:24px;background:#3B3F4A;box-shadow:0 5px 0 #24272E;box-sizing:border-box;}'
  + '.fg-screen{position:relative;min-height:200px;padding:12px 14px 28px;border-radius:12px;background:' + PAPER + ';box-sizing:border-box;} .fg-stext{margin:8px 2px 0;font-family:' + B + ';font-weight:700;font-size:17px;line-height:1.35;color:' + INK + ';}'
  + '.fg-screen.is-listen{box-shadow:0 0 0 4px #9ED3C8;} .fg-searchbox{position:absolute;left:12px;right:12px;top:10px;height:40px;border-radius:20px;background:#FFF;box-shadow:inset 0 0 0 3px ' + INK + ';display:flex;align-items:center;padding-left:16px;} .fg-caret{width:3px;height:22px;background:' + INK + ';animation:fgBlink 1s steps(1) infinite;} @keyframes fgBlink{50%{opacity:0;}}'
  + '.fg-waves{position:absolute;left:12px;bottom:4px;}'
  + '.fg-icons{display:flex;justify-content:center;gap:12px;} .fg-icon{width:64px;height:64px;display:flex;align-items:center;justify-content:center;border:0;border-radius:16px;background:#F2EDE3;box-shadow:0 3px 0 #9A9488;cursor:pointer;} .fg-icon.is-on{background:#FFF1C9;box-shadow:0 0 0 4px #F4CF62;} .fg-icon:disabled{cursor:default;}'
  /* the note */
  + '.fg-note{margin:0;min-height:1.3em;max-width:640px;align-self:center;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .fg-note.is-hint{color:#8A3B1F;} .fg-note.is-nudge{color:#5E6770;}'
  + '.fg-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones */
  + '.fg-wrap.is-narrow{gap:10px;} .fg-wrap.is-narrow .fg-card{padding:8px 10px;gap:10px;} .fg-wrap.is-narrow .fg-q{font-size:18px;} .fg-wrap.is-narrow .fg-page{min-height:0;padding:10px 10px 24px;} .fg-wrap.is-narrow .fg-phead{font-size:18px;}'
  + '.fg-wrap.is-narrow .fg-line,.fg-wrap.is-narrow .fg-sent,.fg-wrap.is-narrow .fg-entry{font-size:17px;} .fg-wrap.is-narrow .fg-flap{font-size:17px;} .fg-wrap.is-narrow .fg-picrow{gap:14px;} .fg-wrap.is-narrow .fg-tag{font-size:18px;min-width:0;} .fg-wrap.is-narrow .fg-cap{font-size:15px;}'
  + '.fg-wrap.is-narrow .fg-cover{min-height:110px;} .fg-wrap.is-narrow .fg-line.is-static{min-height:30px;padding:2px 8px;font-size:15px;} .fg-wrap.is-narrow .fg-closed .fg-page{padding:6px 8px 18px;gap:4px;} .fg-wrap.is-narrow .fg-closed .fg-entry{min-height:40px;padding:4px 10px;font-size:15px;} .fg-wrap.is-narrow .fg-closed .fg-entry b{font-size:17px;} .fg-wrap.is-narrow .fg-closed .fg-phead{font-size:16px;padding-bottom:3px;} .fg-wrap.is-narrow .fg-closed .fg-page{min-height:0;} .fg-wrap.is-narrow .fg-note{font-size:17px;}'
  + '.fg-wrap.is-tiny{gap:8px;} .fg-wrap.is-tiny .fg-q{font-size:17px;} .fg-wrap.is-tiny .fg-line{padding:4px 8px;gap:6px;} .fg-wrap.is-tiny .fg-n{width:24px;height:24px;font-size:14px;} .fg-wrap.is-tiny .fg-tablet{padding:10px;} .fg-wrap.is-tiny .fg-icons{gap:8px;} .fg-wrap.is-tiny .fg-icon{width:56px;height:56px;}'
  + '.fg-wrap.is-xs .fg-icons{gap:4px;} .fg-wrap.is-xs .fg-icon{width:50px;height:50px;} .fg-wrap.is-xs .fg-picrow{gap:10px;}'
  + '.fg-line,.fg-sent,.fg-entry,.fg-cap,.fg-flap,.fg-q,.fg-found{hyphens:manual;overflow-wrap:break-word;}'
  + '@media (prefers-reduced-motion: reduce){.fg-page,.fg-sent,.fg-secbody,.fg-cap,.fg-slot,.fg-dewey,.fg-dial svg,.fg-caret{animation:none !important;}}'
  + '.fg-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;} .fg-wrap.is-fast *{animation:none !important;}';
  var el = document.createElement('style'); el.id = 'fg-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.FieldGuideActivity = FieldGuideActivity;
