const fs = require('fs');
const filePath = 'frontend/components/homepage/HomepageFAQ.tsx';

// Complete rewrite of HomepageFAQ for entrepreneur audience
const newContent = `interface FAQItem {
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
    sectionTitle: "H\u00e4ufig gestellte Fragen",
    items: [
      {
        question: "Kann ich wirklich alle 33 Generatoren kostenlos testen?",
        answer: "Ja! Jeder Generator ist kostenlos mit einem Wasserzeichen auf der Ausgabe nutzbar. Erstellen Sie beliebig viele Druckvorlagen, testen Sie jeden Generator und sehen Sie die volle Qualit\u00e4t vor dem Kauf. Kein Konto oder Kreditkarte erforderlich."
      },
      {
        question: "Welche Arten von Druckvorlagen kann ich erstellen?",
        answer: "LessonCraftStudio bietet 33 Generatoren in 5 Kategorien: Mathematik (Addition, Subtraktion, Puzzles), Sprache (Wortsuche, Kreuzwortr\u00e4tsel, Kryptogramm), Visuelles Lernen (Zuordnung, Objekte finden, Schattenspiel), Kreativ (Ausmalen, Zeichnen, Bingo) und Logik & R\u00e4tsel (Sudoku, Muster, Fehlersuche). Alle erzeugen professionelle 300 DPI PDFs."
      },
      {
        question: "Kann ich die erstellten Druckvorlagen verkaufen?",
        answer: "Absolut! Jede erstellte Druckvorlage kommt mit einer vollst\u00e4ndigen kommerziellen Lizenz. Verkaufen Sie auf Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Ihrer eigenen Website oder jeder anderen Plattform. Keine Quellenangabe n\u00f6tig und keine Lizenzgeb\u00fchren."
      },
      {
        question: "Wie funktioniert das Wasserzeichen?",
        answer: "Die kostenlose Version f\u00fcgt exportierten PDFs ein kleines Wasserzeichen hinzu. So k\u00f6nnen Sie jeden Generator vollst\u00e4ndig testen und die exakte Ausgabequalit\u00e4t sehen. Beim Kauf einer Lizenz wird das Wasserzeichen entfernt und Sie erhalten saubere, professionelle PDFs."
      },
      {
        question: "Auf welchen Plattformen kann ich verkaufen?",
        answer: "Sie k\u00f6nnen Ihre Druckvorlagen \u00fcberall verkaufen: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, Ihr eigener Shopify-Store, WooCommerce-Seite oder jeder andere Marktplatz. Die kommerzielle Lizenz deckt alle Plattformen ohne Einschr\u00e4nkungen ab."
      },
      {
        question: "Brauche ich Designkenntnisse?",
        answer: "\u00dcberhaupt nicht! Jeder Generator verwendet eine einfache Point-and-Click-Oberfl\u00e4che. W\u00e4hlen Sie ein Thema aus \u00fcber 3.000 Bildern, passen Sie die Einstellungen an und laden Sie in unter 3 Minuten ein professionell formatiertes PDF herunter."
      },
      {
        question: "Welches Dateiformat erhalte ich?",
        answer: "Alle Druckvorlagen werden als hochaufl\u00f6sende 300 DPI PDF-Dateien exportiert, perfekt f\u00fcr digitale Downloads und physischen Druck. Die Dateien sind f\u00fcr US Letter und A4 optimiert. L\u00f6sungsbl\u00e4tter werden automatisch beigef\u00fcgt."
      },
      {
        question: "Wie viele Sprachen werden unterst\u00fctzt?",
        answer: "LessonCraftStudio unterst\u00fctzt 11 Sprachen: Englisch, Deutsch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch. So k\u00f6nnen Sie Druckvorlagen in mehreren Sprachen erstellen und verkaufen und einen viel gr\u00f6\u00dferen Markt erreichen."
      }
    ]
  },
  fr: {
    sectionTitle: "Questions Fr\u00e9quentes",
    items: [
      {
        question: "Puis-je vraiment essayer les 33 g\u00e9n\u00e9rateurs gratuitement\u00a0?",
        answer: "Oui\u00a0! Chaque g\u00e9n\u00e9rateur est gratuit avec un filigrane sur le r\u00e9sultat. Cr\u00e9ez autant d\u2019imprimables que vous voulez, testez chaque g\u00e9n\u00e9rateur et voyez la qualit\u00e9 compl\u00e8te avant d\u2019acheter. Aucun compte ni carte bancaire requis."
      },
      {
        question: "Quels types d\u2019imprimables puis-je cr\u00e9er\u00a0?",
        answer: "LessonCraftStudio propose 33 g\u00e9n\u00e9rateurs en 5 cat\u00e9gories\u00a0: Math\u00e9matiques (addition, soustraction, puzzles), Langue (mots m\u00eal\u00e9s, mots crois\u00e9s, cryptogramme), Apprentissage visuel (association, cherche et trouve, jeu d\u2019ombres), Cr\u00e9atif (coloriage, dessin, bingo) et Logique (sudoku, motifs, l\u2019intrus). Tous produisent des PDF professionnels \u00e0 300 DPI."
      },
      {
        question: "Puis-je vendre les imprimables que je cr\u00e9e\u00a0?",
        answer: "Absolument\u00a0! Chaque imprimable cr\u00e9\u00e9 inclut une licence commerciale compl\u00e8te. Vendez sur Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, votre propre site ou toute autre plateforme. Aucune attribution requise et aucune redevance."
      },
      {
        question: "Comment fonctionne le filigrane\u00a0?",
        answer: "La version gratuite ajoute un petit filigrane aux PDF export\u00e9s. Cela vous permet de tester chaque g\u00e9n\u00e9rateur et de voir la qualit\u00e9 exacte. En achetant une licence, le filigrane est retir\u00e9 et vous obtenez des PDF propres et professionnels."
      },
      {
        question: "Sur quelles plateformes puis-je vendre\u00a0?",
        answer: "Vous pouvez vendre vos imprimables partout\u00a0: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, votre propre boutique Shopify, site WooCommerce ou tout autre march\u00e9. La licence commerciale couvre toutes les plateformes sans restriction."
      },
      {
        question: "Ai-je besoin de comp\u00e9tences en design\u00a0?",
        answer: "Pas du tout\u00a0! Chaque g\u00e9n\u00e9rateur utilise une interface simple. Choisissez un th\u00e8me parmi plus de 3\u00a0000 images, personnalisez les param\u00e8tres et t\u00e9l\u00e9chargez un PDF professionnel en moins de 3 minutes."
      },
      {
        question: "Quel format de fichier est fourni\u00a0?",
        answer: "Tous les imprimables sont export\u00e9s en PDF haute r\u00e9solution \u00e0 300 DPI, parfaits pour les t\u00e9l\u00e9chargements num\u00e9riques et l\u2019impression physique. Les fichiers sont optimis\u00e9s pour les formats US Letter et A4. Les corrig\u00e9s sont inclus automatiquement."
      },
      {
        question: "Combien de langues sont support\u00e9es\u00a0?",
        answer: "LessonCraftStudio prend en charge 11 langues\u00a0: anglais, allemand, fran\u00e7ais, espagnol, portugais, italien, n\u00e9erlandais, su\u00e9dois, danois, norv\u00e9gien et finnois. Vous pouvez ainsi cr\u00e9er et vendre des imprimables dans plusieurs langues et atteindre un march\u00e9 bien plus large."
      }
    ]
  },
  es: {
    sectionTitle: "Preguntas Frecuentes",
    items: [
      {
        question: "\u00bfPuedo probar los 33 generadores gratis?",
        answer: "\u00a1S\u00ed! Cada generador es gratuito con una marca de agua en el resultado. Crea todos los imprimibles que quieras, prueba cada generador y comprueba la calidad completa antes de comprar. Sin cuenta ni tarjeta de cr\u00e9dito."
      },
      {
        question: "\u00bfQu\u00e9 tipos de imprimibles puedo crear?",
        answer: "LessonCraftStudio ofrece 33 generadores en 5 categor\u00edas: Matem\u00e1ticas (sumas, restas, puzzles), Lenguaje (sopa de letras, crucigrama, criptograma), Aprendizaje visual (emparejar, buscar objetos, sombras), Creativo (colorear, dibujar, bingo) y L\u00f3gica (sudoku, patrones, el intruso). Todos producen PDFs profesionales a 300 DPI."
      },
      {
        question: "\u00bfPuedo vender los imprimibles que creo?",
        answer: "\u00a1Por supuesto! Cada imprimible creado incluye licencia comercial completa. Vende en Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, tu propio sitio web o cualquier otra plataforma. Sin atribuci\u00f3n requerida y sin regal\u00edas."
      },
      {
        question: "\u00bfC\u00f3mo funciona la marca de agua?",
        answer: "La versi\u00f3n gratuita a\u00f1ade una peque\u00f1a marca de agua a los PDFs exportados. Esto te permite probar cada generador y ver la calidad exacta. Al comprar una licencia, la marca de agua se elimina y obtienes PDFs limpios y profesionales."
      },
      {
        question: "\u00bfEn qu\u00e9 plataformas puedo vender?",
        answer: "Puedes vender tus imprimibles en cualquier lugar: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, tu propia tienda Shopify, sitio WooCommerce o cualquier otro marketplace. La licencia comercial cubre todas las plataformas sin restricciones."
      },
      {
        question: "\u00bfNecesito habilidades de dise\u00f1o?",
        answer: "\u00a1Para nada! Cada generador usa una interfaz sencilla. Elige un tema de m\u00e1s de 3.000 im\u00e1genes, personaliza las opciones y descarga un PDF profesional en menos de 3 minutos."
      },
      {
        question: "\u00bfQu\u00e9 formato de archivo recibo?",
        answer: "Todos los imprimibles se exportan como PDFs de alta resoluci\u00f3n a 300 DPI, perfectos para descargas digitales e impresi\u00f3n f\u00edsica. Los archivos est\u00e1n optimizados para US Letter y A4. Las respuestas se incluyen autom\u00e1ticamente."
      },
      {
        question: "\u00bfCu\u00e1ntos idiomas hay disponibles?",
        answer: "LessonCraftStudio soporta 11 idiomas: ingl\u00e9s, alem\u00e1n, franc\u00e9s, espa\u00f1ol, portugu\u00e9s, italiano, neerland\u00e9s, sueco, dan\u00e9s, noruego y finland\u00e9s. Esto significa que puedes crear y vender imprimibles en m\u00faltiples idiomas, alcanzando un mercado mucho mayor."
      }
    ]
  },
  pt: {
    sectionTitle: "Perguntas Frequentes",
    items: [
      {
        question: "Posso realmente experimentar os 33 geradores de gra\u00e7a?",
        answer: "Sim! Cada gerador \u00e9 gratuito com uma marca d\u2019\u00e1gua no resultado. Crie quantos imprim\u00edveis quiser, teste cada gerador e veja a qualidade completa antes de comprar. Sem conta ou cart\u00e3o de cr\u00e9dito."
      },
      {
        question: "Que tipos de imprim\u00edveis posso criar?",
        answer: "O LessonCraftStudio oferece 33 geradores em 5 categorias: Matem\u00e1tica (adi\u00e7\u00e3o, subtra\u00e7\u00e3o, puzzles), Linguagem (ca\u00e7a-palavras, palavras cruzadas, criptograma), Aprendizado visual (correspond\u00eancia, encontrar objetos, sombras), Criativo (colorir, desenhar, bingo) e L\u00f3gica (sudoku, padr\u00f5es, o intruso). Todos produzem PDFs profissionais a 300 DPI."
      },
      {
        question: "Posso vender os imprim\u00edveis que crio?",
        answer: "Com certeza! Cada imprim\u00edvel criado inclui licen\u00e7a comercial completa. Venda no Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, seu pr\u00f3prio site ou qualquer outra plataforma. Sem atribui\u00e7\u00e3o necess\u00e1ria e sem royalties."
      },
      {
        question: "Como funciona a marca d\u2019\u00e1gua?",
        answer: "A vers\u00e3o gratuita adiciona uma pequena marca d\u2019\u00e1gua aos PDFs exportados. Isso permite testar cada gerador e ver a qualidade exata. Ao comprar uma licen\u00e7a, a marca d\u2019\u00e1gua \u00e9 removida e voc\u00ea obt\u00e9m PDFs limpos e profissionais."
      },
      {
        question: "Em quais plataformas posso vender?",
        answer: "Voc\u00ea pode vender seus imprim\u00edveis em qualquer lugar: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, sua pr\u00f3pria loja Shopify, site WooCommerce ou qualquer outro marketplace. A licen\u00e7a comercial cobre todas as plataformas sem restri\u00e7\u00f5es."
      },
      {
        question: "Preciso de habilidades de design?",
        answer: "De modo algum! Cada gerador usa uma interface simples. Escolha um tema de mais de 3.000 imagens, personalize as op\u00e7\u00f5es e baixe um PDF profissional em menos de 3 minutos."
      },
      {
        question: "Qual formato de arquivo recebo?",
        answer: "Todos os imprim\u00edveis s\u00e3o exportados como PDFs de alta resolu\u00e7\u00e3o a 300 DPI, perfeitos para downloads digitais e impress\u00e3o f\u00edsica. Os arquivos s\u00e3o otimizados para US Letter e A4. Gabaritos s\u00e3o inclu\u00eddos automaticamente."
      },
      {
        question: "Quantos idiomas s\u00e3o suportados?",
        answer: "O LessonCraftStudio suporta 11 idiomas: ingl\u00eas, alem\u00e3o, franc\u00eas, espanhol, portugu\u00eas, italiano, neerland\u00eas, sueco, dinamarqu\u00eas, noruegu\u00eas e finland\u00eas. Isso significa que voc\u00ea pode criar e vender imprim\u00edveis em v\u00e1rios idiomas, alcan\u00e7ando um mercado muito maior."
      }
    ]
  },
  it: {
    sectionTitle: "Domande Frequenti",
    items: [
      {
        question: "Posso davvero provare tutti i 33 generatori gratis?",
        answer: "S\u00ec! Ogni generatore \u00e8 gratuito con una filigrana sul risultato. Crea quanti stampabili vuoi, prova ogni generatore e verifica la qualit\u00e0 completa prima di acquistare. Nessun account o carta di credito richiesti."
      },
      {
        question: "Quali tipi di stampabili posso creare?",
        answer: "LessonCraftStudio offre 33 generatori in 5 categorie: Matematica (addizione, sottrazione, puzzle), Linguaggio (cerca parole, cruciverba, crittogramma), Apprendimento visivo (abbinamenti, trova oggetti, ombre), Creativo (colorare, disegnare, bingo) e Logica (sudoku, sequenze, l\u2019intruso). Tutti producono PDF professionali a 300 DPI."
      },
      {
        question: "Posso vendere gli stampabili che creo?",
        answer: "Assolutamente! Ogni stampabile creato include una licenza commerciale completa. Vendi su Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, il tuo sito web o qualsiasi altra piattaforma. Nessuna attribuzione richiesta e nessuna royalty."
      },
      {
        question: "Come funziona la filigrana?",
        answer: "La versione gratuita aggiunge una piccola filigrana ai PDF esportati. Questo ti permette di testare ogni generatore e vedere la qualit\u00e0 esatta. Acquistando una licenza, la filigrana viene rimossa e ottieni PDF puliti e professionali."
      },
      {
        question: "Su quali piattaforme posso vendere?",
        answer: "Puoi vendere i tuoi stampabili ovunque: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, il tuo negozio Shopify, sito WooCommerce o qualsiasi altro marketplace. La licenza commerciale copre tutte le piattaforme senza restrizioni."
      },
      {
        question: "Servono competenze di design?",
        answer: "Assolutamente no! Ogni generatore usa un\u2019interfaccia semplice. Scegli un tema da oltre 3.000 immagini, personalizza le impostazioni e scarica un PDF professionale in meno di 3 minuti."
      },
      {
        question: "Quale formato di file ottengo?",
        answer: "Tutti gli stampabili vengono esportati come PDF ad alta risoluzione a 300 DPI, perfetti per download digitali e stampa fisica. I file sono ottimizzati per US Letter e A4. Le soluzioni sono incluse automaticamente."
      },
      {
        question: "Quante lingue sono supportate?",
        answer: "LessonCraftStudio supporta 11 lingue: inglese, tedesco, francese, spagnolo, portoghese, italiano, olandese, svedese, danese, norvegese e finlandese. Questo significa che puoi creare e vendere stampabili in pi\u00f9 lingue, raggiungendo un mercato molto pi\u00f9 ampio."
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
        answer: "LessonCraftStudio biedt 33 generatoren in 5 categorie\u00ebn: Rekenen (optellen, aftrekken, puzzels), Taal (woordzoeker, kruiswoordpuzzel, cryptogram), Visueel leren (koppelen, zoek objecten, schaduwspel), Creatief (kleuren, tekenen, bingo) en Logica (sudoku, patronen, de vreemde eend). Alle produceren professionele 300 DPI PDFs."
      },
      {
        question: "Kan ik de printables die ik maak verkopen?",
        answer: "Absoluut! Elke gemaakte printable bevat een volledige commerci\u00eble licentie. Verkoop op Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, je eigen website of elk ander platform. Geen bronvermelding vereist en geen royalty's."
      },
      {
        question: "Hoe werkt het watermerk?",
        answer: "De gratis versie voegt een klein watermerk toe aan ge\u00ebxporteerde PDFs. Dit laat je elke generator volledig testen en de exacte kwaliteit zien. Bij aankoop van een licentie wordt het watermerk verwijderd en krijg je schone, professionele PDFs."
      },
      {
        question: "Op welke platforms kan ik verkopen?",
        answer: "Je kunt je printables overal verkopen: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, je eigen Shopify-winkel, WooCommerce-site of elk ander platform. De commerci\u00eble licentie dekt alle platforms zonder beperkingen."
      },
      {
        question: "Heb ik ontwerpvaardigheden nodig?",
        answer: "Helemaal niet! Elke generator gebruikt een eenvoudige interface. Kies een thema uit meer dan 3.000 afbeeldingen, pas de instellingen aan en download een professioneel opgemaakt PDF in minder dan 3 minuten."
      },
      {
        question: "Welk bestandsformaat krijg ik?",
        answer: "Alle printables worden ge\u00ebxporteerd als hoge-resolutie 300 DPI PDF-bestanden, perfect voor digitale downloads en fysiek afdrukken. De bestanden zijn geoptimaliseerd voor US Letter en A4. Antwoordbladen worden automatisch meegeleverd."
      },
      {
        question: "Hoeveel talen worden ondersteund?",
        answer: "LessonCraftStudio ondersteunt 11 talen: Engels, Duits, Frans, Spaans, Portugees, Italiaans, Nederlands, Zweeds, Deens, Noors en Fins. Dit betekent dat je printables in meerdere talen kunt maken en verkopen, waardoor je een veel grotere markt bereikt."
      }
    ]
  },
  sv: {
    sectionTitle: "Vanliga Fr\u00e5gor",
    items: [
      {
        question: "Kan jag verkligen testa alla 33 generatorer gratis?",
        answer: "Ja! Varje generator \u00e4r gratis att anv\u00e4nda med en vattenst\u00e4mpel p\u00e5 resultatet. Skapa s\u00e5 m\u00e5nga utskrifter du vill, testa varje generator och se den fulla kvaliteten innan du k\u00f6per. Inget konto eller kreditkort kr\u00e4vs."
      },
      {
        question: "Vilka typer av utskrifter kan jag skapa?",
        answer: "LessonCraftStudio erbjuder 33 generatorer i 5 kategorier: Matematik (addition, subtraktion, pussel), Spr\u00e5k (ords\u00f6k, korsord, kryptogram), Visuellt l\u00e4rande (matchning, hitta objekt, skuggmatchning), Kreativt (f\u00e4rgl\u00e4ggning, ritning, bingo) och Logik (sudoku, m\u00f6nster, udda bland jamt). Alla producerar professionella 300 DPI PDFs."
      },
      {
        question: "Kan jag s\u00e4lja utskrifterna jag skapar?",
        answer: "Absolut! Varje skapad utskrift inkluderar en fullst\u00e4ndig kommersiell licens. S\u00e4lj p\u00e5 Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, din egen webbplats eller n\u00e5gon annan plattform. Ingen k\u00e4llh\u00e4nvisning kr\u00e4vs och inga royalties."
      },
      {
        question: "Hur fungerar vattenst\u00e4mpeln?",
        answer: "Gratisversionen l\u00e4gger till en liten vattenst\u00e4mpel p\u00e5 exporterade PDFs. Detta l\u00e5ter dig testa varje generator fullt ut och se den exakta kvaliteten. N\u00e4r du k\u00f6per en licens tas vattenst\u00e4mpeln bort och du f\u00e5r rena, professionella PDFs."
      },
      {
        question: "P\u00e5 vilka plattformar kan jag s\u00e4lja?",
        answer: "Du kan s\u00e4lja dina utskrifter \u00f6verallt: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, din egen Shopify-butik, WooCommerce-sajt eller n\u00e5gon annan marknadsplats. Den kommersiella licensen t\u00e4cker alla plattformar utan begr\u00e4nsningar."
      },
      {
        question: "Beh\u00f6ver jag designkunskaper?",
        answer: "Inte alls! Varje generator anv\u00e4nder ett enkelt gr\u00e4nssnitt. V\u00e4lj ett tema fr\u00e5n \u00f6ver 3\u00a0000 bilder, anpassa inst\u00e4llningarna och ladda ner en professionellt formaterad PDF p\u00e5 under 3 minuter."
      },
      {
        question: "Vilket filformat f\u00e5r jag?",
        answer: "Alla utskrifter exporteras som h\u00f6guppl\u00f6sta 300 DPI PDF-filer, perfekta f\u00f6r b\u00e5de digitala nedladdningar och fysisk utskrift. Filerna \u00e4r optimerade f\u00f6r US Letter och A4. Facit inkluderas automatiskt."
      },
      {
        question: "Hur m\u00e5nga spr\u00e5k st\u00f6ds?",
        answer: "LessonCraftStudio st\u00f6der 11 spr\u00e5k: engelska, tyska, franska, spanska, portugisiska, italienska, nederl\u00e4ndska, svenska, danska, norska och finska. Det inneb\u00e4r att du kan skapa och s\u00e4lja utskrifter p\u00e5 flera spr\u00e5k och n\u00e5 en mycket st\u00f6rre marknad."
      }
    ]
  },
  da: {
    sectionTitle: "Ofte Stillede Sp\u00f8rgsm\u00e5l",
    items: [
      {
        question: "Kan jeg virkelig pr\u00f8ve alle 33 generatorer gratis?",
        answer: "Ja! Hver generator er gratis at bruge med et vandm\u00e6rke p\u00e5 resultatet. Opret s\u00e5 mange printables som du vil, test hver generator og se den fulde kvalitet f\u00f8r du k\u00f8ber. Ingen konto eller kreditkort p\u00e5kr\u00e6vet."
      },
      {
        question: "Hvilke typer printables kan jeg oprette?",
        answer: "LessonCraftStudio tilbyder 33 generatorer i 5 kategorier: Matematik (addition, subtraktion, puslespil), Sprog (ords\u00f8gning, krydsord, kryptogram), Visuel l\u00e6ring (matching, find objekter, skyggespil), Kreativ (farvel\u00e6gning, tegning, bingo) og Logik (sudoku, m\u00f8nstre, den ulige ud). Alle producerer professionelle 300 DPI PDFs."
      },
      {
        question: "Kan jeg s\u00e6lge de printables jeg opretter?",
        answer: "Absolut! Hver oprettet printable inkluderer en fuld kommerciel licens. S\u00e6lg p\u00e5 Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, din egen hjemmeside eller enhver anden platform. Ingen kildeangivelse p\u00e5kr\u00e6vet og ingen royalties."
      },
      {
        question: "Hvordan fungerer vandm\u00e6rket?",
        answer: "Den gratis version tilf\u00f8jer et lille vandm\u00e6rke til eksporterede PDFs. Dette lader dig fuldt teste hver generator og se den n\u00f8jagtige kvalitet. N\u00e5r du k\u00f8ber en licens, fjernes vandm\u00e6rket og du f\u00e5r rene, professionelle PDFs."
      },
      {
        question: "P\u00e5 hvilke platforme kan jeg s\u00e6lge?",
        answer: "Du kan s\u00e6lge dine printables overalt: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, din egen Shopify-butik, WooCommerce-side eller enhver anden markedsplads. Den kommercielle licens d\u00e6kker alle platforme uden begr\u00e6nsninger."
      },
      {
        question: "Skal jeg have designf\u00e6rdigheder?",
        answer: "Slet ikke! Hver generator bruger en enkel gr\u00e6nseflade. V\u00e6lg et tema fra over 3.000 billeder, tilpas indstillingerne og download en professionelt formateret PDF p\u00e5 under 3 minutter."
      },
      {
        question: "Hvilket filformat f\u00e5r jeg?",
        answer: "Alle printables eksporteres som h\u00f8joppl\u00f8snings 300 DPI PDF-filer, perfekte til b\u00e5de digitale downloads og fysisk print. Filerne er optimeret til US Letter og A4. Facitlister inkluderes automatisk."
      },
      {
        question: "Hvor mange sprog underst\u00f8ttes?",
        answer: "LessonCraftStudio underst\u00f8tter 11 sprog: engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk, norsk og finsk. Det betyder at du kan oprette og s\u00e6lge printables p\u00e5 flere sprog og n\u00e5 et meget st\u00f8rre marked."
      }
    ]
  },
  no: {
    sectionTitle: "Vanlige Sp\u00f8rsm\u00e5l",
    items: [
      {
        question: "Kan jeg virkelig pr\u00f8ve alle 33 generatorer gratis?",
        answer: "Ja! Hver generator er gratis \u00e5 bruke med et vannmerke p\u00e5 resultatet. Lag s\u00e5 mange utskrifter du vil, test hver generator og se den fulle kvaliteten f\u00f8r du kj\u00f8per. Ingen konto eller kredittkort n\u00f8dvendig."
      },
      {
        question: "Hvilke typer utskrifter kan jeg lage?",
        answer: "LessonCraftStudio tilbyr 33 generatorer i 5 kategorier: Matte (addisjon, subtraksjon, puslespill), Spr\u00e5k (ords\u00f8k, kryssord, kryptogram), Visuell l\u00e6ring (matching, finn objekter, skyggespill), Kreativt (fargelegging, tegning, bingo) og Logikk (sudoku, m\u00f8nstre, den rare ut). Alle produserer profesjonelle 300 DPI PDFs."
      },
      {
        question: "Kan jeg selge utskriftene jeg lager?",
        answer: "Absolutt! Hver utskrift du lager inkluderer en full kommersiell lisens. Selg p\u00e5 Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, din egen nettside eller en hvilken som helst annen plattform. Ingen kildeangivelse n\u00f8dvendig og ingen royalties."
      },
      {
        question: "Hvordan fungerer vannmerket?",
        answer: "Gratisversjonen legger til et lite vannmerke p\u00e5 eksporterte PDFs. Dette lar deg fullt ut teste hver generator og se den eksakte kvaliteten. N\u00e5r du kj\u00f8per en lisens, fjernes vannmerket og du f\u00e5r rene, profesjonelle PDFs."
      },
      {
        question: "P\u00e5 hvilke plattformer kan jeg selge?",
        answer: "Du kan selge utskriftene dine overalt: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, din egen Shopify-butikk, WooCommerce-side eller en hvilken som helst annen markedsplass. Den kommersielle lisensen dekker alle plattformer uten begrensninger."
      },
      {
        question: "Trenger jeg designferdigheter?",
        answer: "Absolutt ikke! Hver generator bruker et enkelt grensesnitt. Velg et tema fra over 3 000 bilder, tilpass innstillingene og last ned en profesjonelt formatert PDF p\u00e5 under 3 minutter."
      },
      {
        question: "Hvilket filformat f\u00e5r jeg?",
        answer: "Alle utskrifter eksporteres som h\u00f8yoppl\u00f8selige 300 DPI PDF-filer, perfekte for b\u00e5de digitale nedlastinger og fysisk utskrift. Filene er optimalisert for US Letter og A4. Fasit inkluderes automatisk."
      },
      {
        question: "Hvor mange spr\u00e5k st\u00f8ttes?",
        answer: "LessonCraftStudio st\u00f8tter 11 spr\u00e5k: engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk, norsk og finsk. Det betyr at du kan lage og selge utskrifter p\u00e5 flere spr\u00e5k og n\u00e5 et mye st\u00f8rre marked."
      }
    ]
  },
  fi: {
    sectionTitle: "Usein Kysytyt Kysymykset",
    items: [
      {
        question: "Voinko todella kokeilla kaikkia 33 generaattoria ilmaiseksi?",
        answer: "Kyll\u00e4! Jokainen generaattori on ilmainen k\u00e4ytt\u00e4\u00e4 vesileimalla tulostuksessa. Luo niin monta tulostettavaa kuin haluat, testaa jokainen generaattori ja n\u00e4e t\u00e4ysi laatu ennen ostamista. Ei tili\u00e4 tai luottokorttia tarvita."
      },
      {
        question: "Millaisia tulostettavia voin luoda?",
        answer: "LessonCraftStudio tarjoaa 33 generaattoria 5 kategoriassa: Matematiikka (yhteenlasku, v\u00e4hennyslasku, palapelit), Kieli (sananetsint\u00e4, ristikko, kryptogrammi), Visuaalinen oppiminen (yhdist\u00e4minen, etsi esineit\u00e4, varjoyhdist\u00e4minen), Luova (v\u00e4ritys, piirt\u00e4minen, bingo) ja Logiikka (sudoku, kuviot, ylim\u00e4\u00e4r\u00e4inen). Kaikki tuottavat ammattimaisia 300 DPI PDF-tiedostoja."
      },
      {
        question: "Voinko myyd\u00e4 luomiani tulostettavia?",
        answer: "Ehdottomasti! Jokainen luotu tulostettava sis\u00e4lt\u00e4\u00e4 t\u00e4yden kaupallisen lisenssin. Myy Etsyss\u00e4, Amazon KDP:ss\u00e4, Teachers Pay Teachersissa, Gumroadissa, omalla verkkosivullasi tai miss\u00e4 tahansa muulla alustalla. L\u00e4hdemainintaa ei vaadita eik\u00e4 rojaltimaksuja."
      },
      {
        question: "Miten vesileima toimii?",
        answer: "Ilmaisversio lis\u00e4\u00e4 pienen vesileiman vietyihin PDF-tiedostoihin. T\u00e4m\u00e4 antaa sinun testata jokaista generaattoria t\u00e4ysin ja n\u00e4hd\u00e4 tarkan laadun. Kun ostat lisenssin, vesileima poistetaan ja saat puhtaat, ammattimaiset PDF-tiedostot."
      },
      {
        question: "Mill\u00e4 alustoilla voin myyd\u00e4?",
        answer: "Voit myyd\u00e4 tulostettaviasi miss\u00e4 tahansa: Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, oma Shopify-kauppa, WooCommerce-sivusto tai mik\u00e4 tahansa muu markkinapaikka. Kaupallinen lisenssi kattaa kaikki alustat ilman rajoituksia."
      },
      {
        question: "Tarvitsenko suunnittelutaitoja?",
        answer: "Ei lainkaan! Jokainen generaattori k\u00e4ytt\u00e4\u00e4 yksinkertaista k\u00e4ytt\u00f6liittym\u00e4\u00e4. Valitse teema yli 3 000 kuvasta, s\u00e4\u00e4d\u00e4 asetukset ja lataa ammattimaisesti muotoiltu PDF alle 3 minuutissa."
      },
      {
        question: "Miss\u00e4 tiedostomuodossa saan tulosteet?",
        answer: "Kaikki tulostettavat vied\u00e4\u00e4n korkearesoluutioisina 300 DPI PDF-tiedostoina, jotka sopivat t\u00e4ydellisesti sek\u00e4 digitaalisiin latauksiin ett\u00e4 fyysiseen tulostukseen. Tiedostot on optimoitu US Letter- ja A4-paperikoille. Vastauslomakkeet sis\u00e4ltyv\u00e4t automaattisesti."
      },
      {
        question: "Kuinka monta kielt\u00e4 tuetaan?",
        answer: "LessonCraftStudio tukee 11 kielt\u00e4: englanti, saksa, ranska, espanja, portugali, italia, hollanti, ruotsi, tanska, norja ja suomi. T\u00e4m\u00e4 tarkoittaa, ett\u00e4 voit luoda ja myyd\u00e4 tulostettavia useilla kielill\u00e4 ja tavoittaa paljon suuremman markkinan."
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
`;

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Updated HomepageFAQ.tsx with entrepreneur-focused FAQ for all 11 locales');
