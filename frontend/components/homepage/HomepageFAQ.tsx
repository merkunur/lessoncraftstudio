interface FAQItem {
  question: string;
  answer: string;
}

interface FAQLocaleData {
  sectionTitle: string;
  items: FAQItem[];
}

export const homepageFaqData: Record<string, FAQLocaleData> = {
  en: {
    sectionTitle: "Frequently Asked Questions",
    items: [
      {
        question: "Can I really try all 33 generators for free?",
        answer: "Yes! Every generator is free to use with a watermark on the output. Create as many printables as you want, test every generator, and see the full quality before purchasing. No account or credit card required."
      },
      {
        question: "What types of printables can I create?",
        answer: "LessonCraftStudio offers 33 generators across 5 categories: Math (addition, subtraction, puzzles), Language (word search, crossword, cryptogram), Visual Learning (matching, find objects, shadow match), Creative (coloring, drawing, bingo), and Logic & Puzzles (sudoku, patterns, odd one out). Each produces professional 300 DPI PDFs."
      },
      {
        question: "Can I sell the printables I create?",
        answer: "Absolutely! Every printable you create comes with a full commercial license. Sell on Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, your own website, or any other platform. No attribution required and no royalty fees."
      },
      {
        question: "How does the watermark work?",
        answer: "The free version adds a small watermark to exported PDFs. This lets you fully test every generator and see the exact output quality. When you purchase a license, the watermark is removed and you get clean, professional PDFs ready to sell."
      },
      {
        question: "What platforms can I sell on?",
        answer: "You can sell your printables anywhere: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, your own Shopify store, WooCommerce site, or any other marketplace. The commercial license covers all platforms with no restrictions."
      },
      {
        question: "Do I need design skills to create printables?",
        answer: "Not at all! Every generator uses a simple point-and-click interface. Choose a theme from 3,000+ images, customize settings, and download a professionally formatted PDF in under 3 minutes. No graphic design experience or special software required."
      },
      {
        question: "What file format do I get?",
        answer: "All printables export as high-resolution 300 DPI PDF files, perfect for both digital downloads and physical printing. The files are optimized for US Letter and A4 paper sizes. Answer keys are included automatically for applicable generators."
      },
      {
        question: "How many languages are supported?",
        answer: "LessonCraftStudio supports 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. This means you can create and sell printables in multiple languages, reaching a much larger market."
      }
    ]
  },
  de: {
    sectionTitle: "Häufig gestellte Fragen",
    items: [
      {
        question: "Kann ich wirklich alle 33 Generatoren kostenlos testen?",
        answer: "Ja! Jeder Generator ist kostenlos mit einem Wasserzeichen auf der Ausgabe nutzbar. Erstellen Sie beliebig viele Druckvorlagen, testen Sie jeden Generator und sehen Sie die volle Qualität vor dem Kauf. Kein Konto oder Kreditkarte erforderlich."
      },
      {
        question: "Welche Arten von Druckvorlagen kann ich erstellen?",
        answer: "LessonCraftStudio bietet 33 Generatoren in 5 Kategorien: Mathematik (Addition, Subtraktion, Puzzles), Sprache (Wortsuche, Kreuzworträtsel, Kryptogramm), Visuelles Lernen (Zuordnung, Objekte finden, Schattenspiel), Kreativ (Ausmalen, Zeichnen, Bingo) und Logik & Rätsel (Sudoku, Muster, Fehlersuche). Alle erzeugen professionelle 300 DPI PDFs."
      },
      {
        question: "Kann ich die erstellten Druckvorlagen verkaufen?",
        answer: "Absolut! Jede erstellte Druckvorlage kommt mit einer vollständigen kommerziellen Lizenz. Verkaufen Sie auf Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Ihrer eigenen Website oder jeder anderen Plattform. Keine Quellenangabe nötig und keine Lizenzgebühren."
      },
      {
        question: "Wie funktioniert das Wasserzeichen?",
        answer: "Die kostenlose Version fügt exportierten PDFs ein kleines Wasserzeichen hinzu. So können Sie jeden Generator vollständig testen und die exakte Ausgabequalität sehen. Beim Kauf einer Lizenz wird das Wasserzeichen entfernt und Sie erhalten saubere, professionelle PDFs."
      },
      {
        question: "Auf welchen Plattformen kann ich verkaufen?",
        answer: "Sie können Ihre Druckvorlagen überall verkaufen: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, Ihr eigener Shopify-Store, WooCommerce-Seite oder jeder andere Marktplatz. Die kommerzielle Lizenz deckt alle Plattformen ohne Einschränkungen ab."
      },
      {
        question: "Brauche ich Designkenntnisse?",
        answer: "Überhaupt nicht! Jeder Generator verwendet eine einfache Point-and-Click-Oberfläche. Wählen Sie ein Thema aus über 3.000 Bildern, passen Sie die Einstellungen an und laden Sie in unter 3 Minuten ein professionell formatiertes PDF herunter."
      },
      {
        question: "Welches Dateiformat erhalte ich?",
        answer: "Alle Druckvorlagen werden als hochauflösende 300 DPI PDF-Dateien exportiert, perfekt für digitale Downloads und physischen Druck. Die Dateien sind für US Letter und A4 optimiert. Lösungsblätter werden automatisch beigefügt."
      },
      {
        question: "Wie viele Sprachen werden unterstützt?",
        answer: "LessonCraftStudio unterstützt 11 Sprachen: Englisch, Deutsch, Französisch, Spanisch, Portugiesisch, Italienisch, Niederländisch, Schwedisch, Dänisch, Norwegisch und Finnisch. So können Sie Druckvorlagen in mehreren Sprachen erstellen und verkaufen und einen viel größeren Markt erreichen."
      }
    ]
  },
  fr: {
    sectionTitle: "Questions Fréquentes",
    items: [
      {
        question: "Puis-je vraiment essayer les 33 générateurs gratuitement ?",
        answer: "Oui ! Chaque générateur est gratuit avec un filigrane sur le résultat. Créez autant d’imprimables que vous voulez, testez chaque générateur et voyez la qualité complète avant d’acheter. Aucun compte ni carte bancaire requis."
      },
      {
        question: "Quels types d’imprimables puis-je créer ?",
        answer: "LessonCraftStudio propose 33 générateurs en 5 catégories : Mathématiques (addition, soustraction, puzzles), Langue (mots mêlés, mots croisés, cryptogramme), Apprentissage visuel (association, cherche et trouve, jeu d’ombres), Créatif (coloriage, dessin, bingo) et Logique (sudoku, motifs, l’intrus). Tous produisent des PDF professionnels à 300 DPI."
      },
      {
        question: "Puis-je vendre les imprimables que je crée ?",
        answer: "Absolument ! Chaque imprimable créé inclut une licence commerciale complète. Vendez sur Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, votre propre site ou toute autre plateforme. Aucune attribution requise et aucune redevance."
      },
      {
        question: "Comment fonctionne le filigrane ?",
        answer: "La version gratuite ajoute un petit filigrane aux PDF exportés. Cela vous permet de tester chaque générateur et de voir la qualité exacte. En achetant une licence, le filigrane est retiré et vous obtenez des PDF propres et professionnels."
      },
      {
        question: "Sur quelles plateformes puis-je vendre ?",
        answer: "Vous pouvez vendre vos imprimables partout : Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, votre propre boutique Shopify, site WooCommerce ou tout autre marché. La licence commerciale couvre toutes les plateformes sans restriction."
      },
      {
        question: "Ai-je besoin de compétences en design ?",
        answer: "Pas du tout ! Chaque générateur utilise une interface simple. Choisissez un thème parmi plus de 3 000 images, personnalisez les paramètres et téléchargez un PDF professionnel en moins de 3 minutes."
      },
      {
        question: "Quel format de fichier est fourni ?",
        answer: "Tous les imprimables sont exportés en PDF haute résolution à 300 DPI, parfaits pour les téléchargements numériques et l’impression physique. Les fichiers sont optimisés pour les formats US Letter et A4. Les corrigés sont inclus automatiquement."
      },
      {
        question: "Combien de langues sont supportées ?",
        answer: "LessonCraftStudio prend en charge 11 langues : anglais, allemand, français, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien et finnois. Vous pouvez ainsi créer et vendre des imprimables dans plusieurs langues et atteindre un marché bien plus large."
      }
    ]
  },
  es: {
    sectionTitle: "Preguntas Frecuentes",
    items: [
      {
        question: "¿Puedo probar los 33 generadores gratis?",
        answer: "¡Sí! Cada generador es gratuito con una marca de agua en el resultado. Crea todos los imprimibles que quieras, prueba cada generador y comprueba la calidad completa antes de comprar. Sin cuenta ni tarjeta de crédito."
      },
      {
        question: "¿Qué tipos de imprimibles puedo crear?",
        answer: "LessonCraftStudio ofrece 33 generadores en 5 categorías: Matemáticas (sumas, restas, puzzles), Lenguaje (sopa de letras, crucigrama, criptograma), Aprendizaje visual (emparejar, buscar objetos, sombras), Creativo (colorear, dibujar, bingo) y Lógica (sudoku, patrones, el intruso). Todos producen PDFs profesionales a 300 DPI."
      },
      {
        question: "¿Puedo vender los imprimibles que creo?",
        answer: "¡Por supuesto! Cada imprimible creado incluye licencia comercial completa. Vende en Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, tu propio sitio web o cualquier otra plataforma. Sin atribución requerida y sin regalías."
      },
      {
        question: "¿Cómo funciona la marca de agua?",
        answer: "La versión gratuita añade una pequeña marca de agua a los PDFs exportados. Esto te permite probar cada generador y ver la calidad exacta. Al comprar una licencia, la marca de agua se elimina y obtienes PDFs limpios y profesionales."
      },
      {
        question: "¿En qué plataformas puedo vender?",
        answer: "Puedes vender tus imprimibles en cualquier lugar: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, tu propia tienda Shopify, sitio WooCommerce o cualquier otro marketplace. La licencia comercial cubre todas las plataformas sin restricciones."
      },
      {
        question: "¿Necesito habilidades de diseño?",
        answer: "¡Para nada! Cada generador usa una interfaz sencilla. Elige un tema de más de 3.000 imágenes, personaliza las opciones y descarga un PDF profesional en menos de 3 minutos."
      },
      {
        question: "¿Qué formato de archivo recibo?",
        answer: "Todos los imprimibles se exportan como PDFs de alta resolución a 300 DPI, perfectos para descargas digitales e impresión física. Los archivos están optimizados para US Letter y A4. Las respuestas se incluyen automáticamente."
      },
      {
        question: "¿Cuántos idiomas hay disponibles?",
        answer: "LessonCraftStudio soporta 11 idiomas: inglés, alemán, francés, español, portugués, italiano, neerlandés, sueco, danés, noruego y finlandés. Esto significa que puedes crear y vender imprimibles en múltiples idiomas, alcanzando un mercado mucho mayor."
      }
    ]
  },
  pt: {
    sectionTitle: "Perguntas Frequentes",
    items: [
      {
        question: "Posso realmente experimentar os 33 geradores de graça?",
        answer: "Sim! Cada gerador é gratuito com uma marca d’água no resultado. Crie quantos imprimíveis quiser, teste cada gerador e veja a qualidade completa antes de comprar. Sem conta ou cartão de crédito."
      },
      {
        question: "Que tipos de imprimíveis posso criar?",
        answer: "O LessonCraftStudio oferece 33 geradores em 5 categorias: Matemática (adição, subtração, puzzles), Linguagem (caça-palavras, palavras cruzadas, criptograma), Aprendizado visual (correspondência, encontrar objetos, sombras), Criativo (colorir, desenhar, bingo) e Lógica (sudoku, padrões, o intruso). Todos produzem PDFs profissionais a 300 DPI."
      },
      {
        question: "Posso vender os imprimíveis que crio?",
        answer: "Com certeza! Cada imprimível criado inclui licença comercial completa. Venda no Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, seu próprio site ou qualquer outra plataforma. Sem atribuição necessária e sem royalties."
      },
      {
        question: "Como funciona a marca d’água?",
        answer: "A versão gratuita adiciona uma pequena marca d’água aos PDFs exportados. Isso permite testar cada gerador e ver a qualidade exata. Ao comprar uma licença, a marca d’água é removida e você obtém PDFs limpos e profissionais."
      },
      {
        question: "Em quais plataformas posso vender?",
        answer: "Você pode vender seus imprimíveis em qualquer lugar: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, sua própria loja Shopify, site WooCommerce ou qualquer outro marketplace. A licença comercial cobre todas as plataformas sem restrições."
      },
      {
        question: "Preciso de habilidades de design?",
        answer: "De modo algum! Cada gerador usa uma interface simples. Escolha um tema de mais de 3.000 imagens, personalize as opções e baixe um PDF profissional em menos de 3 minutos."
      },
      {
        question: "Qual formato de arquivo recebo?",
        answer: "Todos os imprimíveis são exportados como PDFs de alta resolução a 300 DPI, perfeitos para downloads digitais e impressão física. Os arquivos são otimizados para US Letter e A4. Gabaritos são incluídos automaticamente."
      },
      {
        question: "Quantos idiomas são suportados?",
        answer: "O LessonCraftStudio suporta 11 idiomas: inglês, alemão, francês, espanhol, português, italiano, neerlandês, sueco, dinamarquês, norueguês e finlandês. Isso significa que você pode criar e vender imprimíveis em vários idiomas, alcançando um mercado muito maior."
      }
    ]
  },
  it: {
    sectionTitle: "Domande Frequenti",
    items: [
      {
        question: "Posso davvero provare tutti i 33 generatori gratis?",
        answer: "Sì! Ogni generatore è gratuito con una filigrana sul risultato. Crea quanti stampabili vuoi, prova ogni generatore e verifica la qualità completa prima di acquistare. Nessun account o carta di credito richiesti."
      },
      {
        question: "Quali tipi di stampabili posso creare?",
        answer: "LessonCraftStudio offre 33 generatori in 5 categorie: Matematica (addizione, sottrazione, puzzle), Linguaggio (cerca parole, cruciverba, crittogramma), Apprendimento visivo (abbinamenti, trova oggetti, ombre), Creativo (colorare, disegnare, bingo) e Logica (sudoku, sequenze, l’intruso). Tutti producono PDF professionali a 300 DPI."
      },
      {
        question: "Posso vendere gli stampabili che creo?",
        answer: "Assolutamente! Ogni stampabile creato include una licenza commerciale completa. Vendi su Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, il tuo sito web o qualsiasi altra piattaforma. Nessuna attribuzione richiesta e nessuna royalty."
      },
      {
        question: "Come funziona la filigrana?",
        answer: "La versione gratuita aggiunge una piccola filigrana ai PDF esportati. Questo ti permette di testare ogni generatore e vedere la qualità esatta. Acquistando una licenza, la filigrana viene rimossa e ottieni PDF puliti e professionali."
      },
      {
        question: "Su quali piattaforme posso vendere?",
        answer: "Puoi vendere i tuoi stampabili ovunque: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, il tuo negozio Shopify, sito WooCommerce o qualsiasi altro marketplace. La licenza commerciale copre tutte le piattaforme senza restrizioni."
      },
      {
        question: "Servono competenze di design?",
        answer: "Assolutamente no! Ogni generatore usa un’interfaccia semplice. Scegli un tema da oltre 3.000 immagini, personalizza le impostazioni e scarica un PDF professionale in meno di 3 minuti."
      },
      {
        question: "Quale formato di file ottengo?",
        answer: "Tutti gli stampabili vengono esportati come PDF ad alta risoluzione a 300 DPI, perfetti per download digitali e stampa fisica. I file sono ottimizzati per US Letter e A4. Le soluzioni sono incluse automaticamente."
      },
      {
        question: "Quante lingue sono supportate?",
        answer: "LessonCraftStudio supporta 11 lingue: inglese, tedesco, francese, spagnolo, portoghese, italiano, olandese, svedese, danese, norvegese e finlandese. Questo significa che puoi creare e vendere stampabili in più lingue, raggiungendo un mercato molto più ampio."
      }
    ]
  },
  nl: {
    sectionTitle: "Veelgestelde Vragen",
    items: [
      {
        question: "Kan ik echt alle 33 generatoren gratis proberen?",
        answer: "Ja! Elke generator is gratis te gebruiken met een watermerk op de output. Maak zoveel printables als je wilt, test elke generator en bekijk de volledige kwaliteit voor je koopt. Geen account of creditcard nodig."
      },
      {
        question: "Welke soorten printables kan ik maken?",
        answer: "LessonCraftStudio biedt 33 generatoren in 5 categorieën: Rekenen (optellen, aftrekken, puzzels), Taal (woordzoeker, kruiswoordpuzzel, cryptogram), Visueel leren (koppelen, zoek objecten, schaduwspel), Creatief (kleuren, tekenen, bingo) en Logica (sudoku, patronen, de vreemde eend). Alle produceren professionele 300 DPI PDFs."
      },
      {
        question: "Kan ik de printables die ik maak verkopen?",
        answer: "Absoluut! Elke gemaakte printable bevat een volledige commerciële licentie. Verkoop op Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, je eigen website of elk ander platform. Geen bronvermelding vereist en geen royalty's."
      },
      {
        question: "Hoe werkt het watermerk?",
        answer: "De gratis versie voegt een klein watermerk toe aan geëxporteerde PDFs. Dit laat je elke generator volledig testen en de exacte kwaliteit zien. Bij aankoop van een licentie wordt het watermerk verwijderd en krijg je schone, professionele PDFs."
      },
      {
        question: "Op welke platforms kan ik verkopen?",
        answer: "Je kunt je printables overal verkopen: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, je eigen Shopify-winkel, WooCommerce-site of elk ander platform. De commerciële licentie dekt alle platforms zonder beperkingen."
      },
      {
        question: "Heb ik ontwerpvaardigheden nodig?",
        answer: "Helemaal niet! Elke generator gebruikt een eenvoudige interface. Kies een thema uit meer dan 3.000 afbeeldingen, pas de instellingen aan en download een professioneel opgemaakt PDF in minder dan 3 minuten."
      },
      {
        question: "Welk bestandsformaat krijg ik?",
        answer: "Alle printables worden geëxporteerd als hoge-resolutie 300 DPI PDF-bestanden, perfect voor digitale downloads en fysiek afdrukken. De bestanden zijn geoptimaliseerd voor US Letter en A4. Antwoordbladen worden automatisch meegeleverd."
      },
      {
        question: "Hoeveel talen worden ondersteund?",
        answer: "LessonCraftStudio ondersteunt 11 talen: Engels, Duits, Frans, Spaans, Portugees, Italiaans, Nederlands, Zweeds, Deens, Noors en Fins. Dit betekent dat je printables in meerdere talen kunt maken en verkopen, waardoor je een veel grotere markt bereikt."
      }
    ]
  },
  sv: {
    sectionTitle: "Vanliga Frågor",
    items: [
      {
        question: "Kan jag verkligen testa alla 33 generatorer gratis?",
        answer: "Ja! Varje generator är gratis att använda med en vattenstämpel på resultatet. Skapa så många utskrifter du vill, testa varje generator och se den fulla kvaliteten innan du köper. Inget konto eller kreditkort krävs."
      },
      {
        question: "Vilka typer av utskrifter kan jag skapa?",
        answer: "LessonCraftStudio erbjuder 33 generatorer i 5 kategorier: Matematik (addition, subtraktion, pussel), Språk (ordsök, korsord, kryptogram), Visuellt lärande (matchning, hitta objekt, skuggmatchning), Kreativt (färgläggning, ritning, bingo) och Logik (sudoku, mönster, udda bland jamt). Alla producerar professionella 300 DPI PDFs."
      },
      {
        question: "Kan jag sälja utskrifterna jag skapar?",
        answer: "Absolut! Varje skapad utskrift inkluderar en fullständig kommersiell licens. Sälj på Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, din egen webbplats eller någon annan plattform. Ingen källhänvisning krävs och inga royalties."
      },
      {
        question: "Hur fungerar vattenstämpeln?",
        answer: "Gratisversionen lägger till en liten vattenstämpel på exporterade PDFs. Detta låter dig testa varje generator fullt ut och se den exakta kvaliteten. När du köper en licens tas vattenstämpeln bort och du får rena, professionella PDFs."
      },
      {
        question: "På vilka plattformar kan jag sälja?",
        answer: "Du kan sälja dina utskrifter överallt: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, din egen Shopify-butik, WooCommerce-sajt eller någon annan marknadsplats. Den kommersiella licensen täcker alla plattformar utan begränsningar."
      },
      {
        question: "Behöver jag designkunskaper?",
        answer: "Inte alls! Varje generator använder ett enkelt gränssnitt. Välj ett tema från över 3 000 bilder, anpassa inställningarna och ladda ner en professionellt formaterad PDF på under 3 minuter."
      },
      {
        question: "Vilket filformat får jag?",
        answer: "Alla utskrifter exporteras som högupplösta 300 DPI PDF-filer, perfekta för både digitala nedladdningar och fysisk utskrift. Filerna är optimerade för US Letter och A4. Facit inkluderas automatiskt."
      },
      {
        question: "Hur många språk stöds?",
        answer: "LessonCraftStudio stöder 11 språk: engelska, tyska, franska, spanska, portugisiska, italienska, nederländska, svenska, danska, norska och finska. Det innebär att du kan skapa och sälja utskrifter på flera språk och nå en mycket större marknad."
      }
    ]
  },
  da: {
    sectionTitle: "Ofte Stillede Spørgsmål",
    items: [
      {
        question: "Kan jeg virkelig prøve alle 33 generatorer gratis?",
        answer: "Ja! Hver generator er gratis at bruge med et vandmærke på resultatet. Opret så mange printables som du vil, test hver generator og se den fulde kvalitet før du køber. Ingen konto eller kreditkort påkrævet."
      },
      {
        question: "Hvilke typer printables kan jeg oprette?",
        answer: "LessonCraftStudio tilbyder 33 generatorer i 5 kategorier: Matematik (addition, subtraktion, puslespil), Sprog (ordsøgning, krydsord, kryptogram), Visuel læring (matching, find objekter, skyggespil), Kreativ (farvelægning, tegning, bingo) og Logik (sudoku, mønstre, den ulige ud). Alle producerer professionelle 300 DPI PDFs."
      },
      {
        question: "Kan jeg sælge de printables jeg opretter?",
        answer: "Absolut! Hver oprettet printable inkluderer en fuld kommerciel licens. Sælg på Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, din egen hjemmeside eller enhver anden platform. Ingen kildeangivelse påkrævet og ingen royalties."
      },
      {
        question: "Hvordan fungerer vandmærket?",
        answer: "Den gratis version tilføjer et lille vandmærke til eksporterede PDFs. Dette lader dig fuldt teste hver generator og se den nøjagtige kvalitet. Når du køber en licens, fjernes vandmærket og du får rene, professionelle PDFs."
      },
      {
        question: "På hvilke platforme kan jeg sælge?",
        answer: "Du kan sælge dine printables overalt: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, din egen Shopify-butik, WooCommerce-side eller enhver anden markedsplads. Den kommercielle licens dækker alle platforme uden begrænsninger."
      },
      {
        question: "Skal jeg have designfærdigheder?",
        answer: "Slet ikke! Hver generator bruger en enkel grænseflade. Vælg et tema fra over 3.000 billeder, tilpas indstillingerne og download en professionelt formateret PDF på under 3 minutter."
      },
      {
        question: "Hvilket filformat får jeg?",
        answer: "Alle printables eksporteres som højoppløsnings 300 DPI PDF-filer, perfekte til både digitale downloads og fysisk print. Filerne er optimeret til US Letter og A4. Facitlister inkluderes automatisk."
      },
      {
        question: "Hvor mange sprog understøttes?",
        answer: "LessonCraftStudio understøtter 11 sprog: engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk, norsk og finsk. Det betyder at du kan oprette og sælge printables på flere sprog og nå et meget større marked."
      }
    ]
  },
  no: {
    sectionTitle: "Vanlige Spørsmål",
    items: [
      {
        question: "Kan jeg virkelig prøve alle 33 generatorer gratis?",
        answer: "Ja! Hver generator er gratis å bruke med et vannmerke på resultatet. Lag så mange utskrifter du vil, test hver generator og se den fulle kvaliteten før du kjøper. Ingen konto eller kredittkort nødvendig."
      },
      {
        question: "Hvilke typer utskrifter kan jeg lage?",
        answer: "LessonCraftStudio tilbyr 33 generatorer i 5 kategorier: Matte (addisjon, subtraksjon, puslespill), Språk (ordsøk, kryssord, kryptogram), Visuell læring (matching, finn objekter, skyggespill), Kreativt (fargelegging, tegning, bingo) og Logikk (sudoku, mønstre, den rare ut). Alle produserer profesjonelle 300 DPI PDFs."
      },
      {
        question: "Kan jeg selge utskriftene jeg lager?",
        answer: "Absolutt! Hver utskrift du lager inkluderer en full kommersiell lisens. Selg på Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, din egen nettside eller en hvilken som helst annen plattform. Ingen kildeangivelse nødvendig og ingen royalties."
      },
      {
        question: "Hvordan fungerer vannmerket?",
        answer: "Gratisversjonen legger til et lite vannmerke på eksporterte PDFs. Dette lar deg fullt ut teste hver generator og se den eksakte kvaliteten. Når du kjøper en lisens, fjernes vannmerket og du får rene, profesjonelle PDFs."
      },
      {
        question: "På hvilke plattformer kan jeg selge?",
        answer: "Du kan selge utskriftene dine overalt: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, din egen Shopify-butikk, WooCommerce-side eller en hvilken som helst annen markedsplass. Den kommersielle lisensen dekker alle plattformer uten begrensninger."
      },
      {
        question: "Trenger jeg designferdigheter?",
        answer: "Absolutt ikke! Hver generator bruker et enkelt grensesnitt. Velg et tema fra over 3 000 bilder, tilpass innstillingene og last ned en profesjonelt formatert PDF på under 3 minutter."
      },
      {
        question: "Hvilket filformat får jeg?",
        answer: "Alle utskrifter eksporteres som høyoppløselige 300 DPI PDF-filer, perfekte for både digitale nedlastinger og fysisk utskrift. Filene er optimalisert for US Letter og A4. Fasit inkluderes automatisk."
      },
      {
        question: "Hvor mange språk støttes?",
        answer: "LessonCraftStudio støtter 11 språk: engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk, norsk og finsk. Det betyr at du kan lage og selge utskrifter på flere språk og nå et mye større marked."
      }
    ]
  },
  fi: {
    sectionTitle: "Usein Kysytyt Kysymykset",
    items: [
      {
        question: "Voinko todella kokeilla kaikkia 33 generaattoria ilmaiseksi?",
        answer: "Kyllä! Jokainen generaattori on ilmainen käyttää vesileimalla tulostuksessa. Luo niin monta tulostettavaa kuin haluat, testaa jokainen generaattori ja näe täysi laatu ennen ostamista. Ei tiliä tai luottokorttia tarvita."
      },
      {
        question: "Millaisia tulostettavia voin luoda?",
        answer: "LessonCraftStudio tarjoaa 33 generaattoria 5 kategoriassa: Matematiikka (yhteenlasku, vähennyslasku, palapelit), Kieli (sananetsintä, ristikko, kryptogrammi), Visuaalinen oppiminen (yhdistäminen, etsi esineitä, varjoyhdistäminen), Luova (väritys, piirtäminen, bingo) ja Logiikka (sudoku, kuviot, ylimääräinen). Kaikki tuottavat ammattimaisia 300 DPI PDF-tiedostoja."
      },
      {
        question: "Voinko myydä luomiani tulostettavia?",
        answer: "Ehdottomasti! Jokainen luotu tulostettava sisältää täyden kaupallisen lisenssin. Myy Etsyssä, Amazon KDP:ssä, Teachers Pay Teachersissa, Gumroadissa, omalla verkkosivullasi tai missä tahansa muulla alustalla. Lähdemainintaa ei vaadita eikä rojaltimaksuja."
      },
      {
        question: "Miten vesileima toimii?",
        answer: "Ilmaisversio lisää pienen vesileiman vietyihin PDF-tiedostoihin. Tämä antaa sinun testata jokaista generaattoria täysin ja nähdä tarkan laadun. Kun ostat lisenssin, vesileima poistetaan ja saat puhtaat, ammattimaiset PDF-tiedostot."
      },
      {
        question: "Millä alustoilla voin myydä?",
        answer: "Voit myydä tulostettaviasi missä tahansa: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, oma Shopify-kauppa, WooCommerce-sivusto tai mikä tahansa muu markkinapaikka. Kaupallinen lisenssi kattaa kaikki alustat ilman rajoituksia."
      },
      {
        question: "Tarvitsenko suunnittelutaitoja?",
        answer: "Ei lainkaan! Jokainen generaattori käyttää yksinkertaista käyttöliittymää. Valitse teema yli 3 000 kuvasta, säädä asetukset ja lataa ammattimaisesti muotoiltu PDF alle 3 minuutissa."
      },
      {
        question: "Missä tiedostomuodossa saan tulosteet?",
        answer: "Kaikki tulostettavat viedään korkearesoluutioisina 300 DPI PDF-tiedostoina, jotka sopivat täydellisesti sekä digitaalisiin latauksiin että fyysiseen tulostukseen. Tiedostot on optimoitu US Letter- ja A4-paperikoille. Vastauslomakkeet sisältyvät automaattisesti."
      },
      {
        question: "Kuinka monta kieltä tuetaan?",
        answer: "LessonCraftStudio tukee 11 kieltä: englanti, saksa, ranska, espanja, portugali, italia, hollanti, ruotsi, tanska, norja ja suomi. Tämä tarkoittaa, että voit luoda ja myydä tulostettavia useilla kielillä ja tavoittaa paljon suuremman markkinan."
      }
    ]
  }
};

interface HomepageFAQProps {
  locale: string;
}

export default function HomepageFAQ({ locale }: HomepageFAQProps) {
  const data = homepageFaqData[locale] || homepageFaqData.en;

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          {data.sectionTitle}
        </h2>
        <div className="divide-y divide-gray-200">
          {data.items.map((item, index) => (
            <details key={index} className="group py-4 cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-lg text-gray-800 list-none [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-200">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
