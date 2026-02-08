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
        question: "Are the worksheet generators really free to use?",
        answer: "Our Word Search generator is completely free with no account required. For access to 10 of our most popular generators, the Core plan is $15/month. The Full plan at $25/month unlocks all 33 professional worksheet generators, the complete image library, and commercial licensing rights."
      },
      {
        question: "What types of worksheets can I create?",
        answer: "LessonCraftStudio offers 33 worksheet generators: Addition, Alphabet Train, Big & Small, Bingo, Chart & Count, Code Addition, Coloring, Crossword, Cryptogram, Draw & Color, Drawing Lines, Find & Count, Find Objects, Grid Match, Matching, Math Puzzle, Math Worksheet, Missing Pieces, More & Less, Odd One Out, Pattern Train, Pattern Worksheet, Picture Path, Picture Sort, Prepositions, Shadow Match, Subtraction, Sudoku, Treasure Hunt, Word Guess, Word Scramble, Word Search, and Writing."
      },
      {
        question: "Can I use these worksheets commercially?",
        answer: "Yes! Both the Core and Full plans include commercial licensing. You can sell your created worksheets on platforms like Teachers Pay Teachers, Etsy, or use them in your tutoring business, classroom materials, or educational publications."
      },
      {
        question: "What grade levels are the worksheets designed for?",
        answer: "Our worksheets are designed for preschool through 3rd grade, covering ages 3 to 9. Each generator includes difficulty settings so you can tailor the content to your students\u2019 exact level, from early learners to more advanced young readers and mathematicians."
      },
      {
        question: "How many languages are supported?",
        answer: "LessonCraftStudio supports 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. All generators produce worksheets with properly localized instructions, labels, and content."
      },
      {
        question: "Do I need design skills to create worksheets?",
        answer: "Not at all! Every generator uses a simple point-and-click interface. Choose a theme, pick your settings, and download a beautifully formatted PDF in under 3 minutes. No graphic design experience, special software, or technical knowledge required."
      },
      {
        question: "Can I print the worksheets at home?",
        answer: "Absolutely. Every worksheet downloads as a high-resolution 300 DPI PDF that prints perfectly on any standard home or office printer. The files are optimized for both US Letter and A4 paper sizes."
      },
      {
        question: "Is there an image library included?",
        answer: "Yes! Full plan subscribers get access to our curated library of over 3,000 hand-picked clipart images across 100+ themes including animals, food, vehicles, nature, sports, and many more. These images are professionally selected to be age-appropriate and visually engaging for young learners."
      }
    ]
  },
  de: {
    sectionTitle: "H\u00e4ufig gestellte Fragen",
    items: [
      {
        question: "Sind die Arbeitsblatt-Generatoren wirklich kostenlos?",
        answer: "Unser Wortsuch-Generator ist v\u00f6llig kostenlos und erfordert kein Konto. F\u00fcr den Zugang zu 10 unserer beliebtesten Generatoren kostet der Core-Plan 15$/Monat. Der Full-Plan f\u00fcr 25$/Monat schaltet alle 33 professionellen Arbeitsblatt-Generatoren, die komplette Bildbibliothek und kommerzielle Lizenzrechte frei."
      },
      {
        question: "Welche Arten von Arbeitsbl\u00e4ttern kann ich erstellen?",
        answer: "LessonCraftStudio bietet 33 Arbeitsblatt-Generatoren: Addition, Buchstabenzug, Gro\u00df & Klein, Bingo, Z\u00e4hltabelle, Code-Addition, Ausmalbilder, Kreuzwortr\u00e4tsel, Kryptogramm, Malen & Ausmalen, Linien ziehen, Finden & Z\u00e4hlen, Objekte finden, Gitterabgleich, Zuordnung, Mathe-Puzzle, Mathe-Arbeitsblatt, Fehlende Teile, Mehr & Weniger, Einer passt nicht, Musterzug, Muster-Arbeitsblatt, Bilderpfad, Bildersortierung, Pr\u00e4positionen, Schattenabgleich, Subtraktion, Sudoku, Schatzsuche, Wort erraten, Buchstabensalat, Wortsuche und Schreiben."
      },
      {
        question: "Kann ich die Arbeitsbl\u00e4tter kommerziell nutzen?",
        answer: "Ja! Sowohl der Core- als auch der Full-Plan beinhalten eine kommerzielle Lizenz. Sie k\u00f6nnen Ihre erstellten Arbeitsbl\u00e4tter auf Plattformen wie Teachers Pay Teachers, Etsy verkaufen oder in Ihrem Nachhilfeunterricht, Ihren Unterrichtsmaterialien oder Bildungspublikationen verwenden."
      },
      {
        question: "F\u00fcr welche Klassenstufen sind die Arbeitsbl\u00e4tter geeignet?",
        answer: "Unsere Arbeitsbl\u00e4tter sind f\u00fcr Vorschule bis zur 3. Klasse konzipiert und decken das Alter von 3 bis 9 Jahren ab. Jeder Generator enth\u00e4lt Schwierigkeitseinstellungen, damit Sie den Inhalt genau an das Niveau Ihrer Sch\u00fcler anpassen k\u00f6nnen."
      },
      {
        question: "Wie viele Sprachen werden unterst\u00fctzt?",
        answer: "LessonCraftStudio unterst\u00fctzt 11 Sprachen: Englisch, Deutsch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch. Alle Generatoren erstellen Arbeitsbl\u00e4tter mit korrekt lokalisierten Anweisungen, Beschriftungen und Inhalten."
      },
      {
        question: "Brauche ich Designkenntnisse, um Arbeitsbl\u00e4tter zu erstellen?",
        answer: "\u00dcberhaupt nicht! Jeder Generator verwendet eine einfache Point-and-Click-Oberfl\u00e4che. W\u00e4hlen Sie ein Thema, passen Sie die Einstellungen an und laden Sie in unter 3 Minuten ein sch\u00f6n formatiertes PDF herunter. Keine Grafikdesign-Erfahrung, spezielle Software oder technisches Wissen erforderlich."
      },
      {
        question: "Kann ich die Arbeitsbl\u00e4tter zu Hause ausdrucken?",
        answer: "Auf jeden Fall. Jedes Arbeitsblatt wird als hochaufl\u00f6sendes 300-DPI-PDF heruntergeladen, das auf jedem Standard-Heim- oder B\u00fcrodrucker perfekt gedruckt wird. Die Dateien sind sowohl f\u00fcr US Letter als auch f\u00fcr A4-Papierformate optimiert."
      },
      {
        question: "Ist eine Bildbibliothek enthalten?",
        answer: "Ja! Abonnenten des Full-Plans erhalten Zugang zu unserer kuratierten Bibliothek mit \u00fcber 3.000 handverlesenen Clipart-Bildern in \u00fcber 100 Themen, darunter Tiere, Essen, Fahrzeuge, Natur, Sport und vieles mehr. Diese Bilder sind professionell ausgew\u00e4hlt, altersgerecht und visuell ansprechend f\u00fcr junge Lernende."
      }
    ]
  },
  fr: {
    sectionTitle: "Questions Fr\u00e9quemment Pos\u00e9es",
    items: [
      {
        question: "Les g\u00e9n\u00e9rateurs de fiches sont-ils vraiment gratuits\u00a0?",
        answer: "Notre g\u00e9n\u00e9rateur de mots m\u00eal\u00e9s est enti\u00e8rement gratuit sans inscription requise. Pour acc\u00e9der \u00e0 10 de nos g\u00e9n\u00e9rateurs les plus populaires, le plan Core co\u00fbte 15$/mois. Le plan Full \u00e0 25$/mois d\u00e9bloque les 33 g\u00e9n\u00e9rateurs professionnels, la biblioth\u00e8que d\u2019images compl\u00e8te et les droits de licence commerciale."
      },
      {
        question: "Quels types de fiches puis-je cr\u00e9er\u00a0?",
        answer: "LessonCraftStudio propose 33 g\u00e9n\u00e9rateurs de fiches\u00a0: Addition, Train alphabet, Grand & Petit, Bingo, Tableau de comptage, Addition cod\u00e9e, Coloriage, Mots crois\u00e9s, Cryptogramme, Dessiner & Colorier, Tracer des lignes, Trouver & Compter, Trouver les objets, Grille d\u2019association, Association, Puzzle math, Fiche de maths, Pi\u00e8ces manquantes, Plus & Moins, L\u2019intrus, Train de motifs, Fiche de motifs, Chemin d\u2019images, Tri d\u2019images, Pr\u00e9positions, Jeu d\u2019ombres, Soustraction, Sudoku, Chasse au tr\u00e9sor, Deviner le mot, Anagramme, Mots m\u00eal\u00e9s et \u00c9criture."
      },
      {
        question: "Puis-je utiliser ces fiches \u00e0 des fins commerciales\u00a0?",
        answer: "Oui\u00a0! Les plans Core et Full incluent une licence commerciale. Vous pouvez vendre vos fiches cr\u00e9\u00e9es sur des plateformes comme Teachers Pay Teachers, Etsy, ou les utiliser dans votre activit\u00e9 de tutorat, vos mat\u00e9riaux p\u00e9dagogiques ou vos publications \u00e9ducatives."
      },
      {
        question: "Pour quels niveaux scolaires les fiches sont-elles con\u00e7ues\u00a0?",
        answer: "Nos fiches sont con\u00e7ues pour la maternelle jusqu\u2019au CE2, couvrant les \u00e2ges de 3 \u00e0 9 ans. Chaque g\u00e9n\u00e9rateur inclut des param\u00e8tres de difficult\u00e9 pour adapter le contenu au niveau exact de vos \u00e9l\u00e8ves."
      },
      {
        question: "Combien de langues sont prises en charge\u00a0?",
        answer: "LessonCraftStudio prend en charge 11 langues\u00a0: anglais, allemand, fran\u00e7ais, espagnol, portugais, italien, n\u00e9erlandais, su\u00e9dois, danois, norv\u00e9gien et finnois. Tous les g\u00e9n\u00e9rateurs produisent des fiches avec des instructions, des \u00e9tiquettes et du contenu correctement localis\u00e9s."
      },
      {
        question: "Ai-je besoin de comp\u00e9tences en design pour cr\u00e9er des fiches\u00a0?",
        answer: "Pas du tout\u00a0! Chaque g\u00e9n\u00e9rateur utilise une interface simple pointer-cliquer. Choisissez un th\u00e8me, s\u00e9lectionnez vos param\u00e8tres et t\u00e9l\u00e9chargez un PDF parfaitement mis en page en moins de 3 minutes. Aucune exp\u00e9rience en design graphique, logiciel sp\u00e9cial ou connaissance technique n\u00e9cessaire."
      },
      {
        question: "Puis-je imprimer les fiches \u00e0 la maison\u00a0?",
        answer: "Absolument. Chaque fiche se t\u00e9l\u00e9charge en PDF haute r\u00e9solution 300 DPI qui s\u2019imprime parfaitement sur n\u2019importe quelle imprimante domestique ou de bureau standard. Les fichiers sont optimis\u00e9s pour les formats papier US Letter et A4."
      },
      {
        question: "Y a-t-il une biblioth\u00e8que d\u2019images incluse\u00a0?",
        answer: "Oui\u00a0! Les abonn\u00e9s au plan Full ont acc\u00e8s \u00e0 notre biblioth\u00e8que de plus de 3\u00a0000 images clipart soigneusement s\u00e9lectionn\u00e9es dans plus de 100 th\u00e8mes, dont les animaux, la nourriture, les v\u00e9hicules, la nature, le sport et bien d\u2019autres. Ces images sont professionnellement choisies pour \u00eatre adapt\u00e9es \u00e0 l\u2019\u00e2ge et visuellement attrayantes pour les jeunes apprenants."
      }
    ]
  },
  es: {
    sectionTitle: "Preguntas Frecuentes",
    items: [
      {
        question: "\u00bfLos generadores de fichas son realmente gratuitos?",
        answer: "Nuestro generador de sopa de letras es completamente gratuito sin necesidad de cuenta. Para acceder a 10 de nuestros generadores m\u00e1s populares, el plan Core cuesta $15/mes. El plan Full a $25/mes desbloquea los 33 generadores profesionales, la biblioteca completa de im\u00e1genes y los derechos de licencia comercial."
      },
      {
        question: "\u00bfQu\u00e9 tipos de fichas puedo crear?",
        answer: "LessonCraftStudio ofrece 33 generadores de fichas: Suma, Tren del alfabeto, Grande y Peque\u00f1o, Bingo, Tabla de conteo, Suma codificada, Colorear, Crucigrama, Criptograma, Dibujar y Colorear, Trazar l\u00edneas, Encontrar y Contar, Encontrar objetos, Cuadr\u00edcula de emparejamiento, Emparejamiento, Puzzle matem\u00e1tico, Ficha de matem\u00e1ticas, Piezas faltantes, M\u00e1s y Menos, El intruso, Tren de patrones, Ficha de patrones, Camino de im\u00e1genes, Clasificar im\u00e1genes, Preposiciones, Emparejar sombras, Resta, Sudoku, B\u00fasqueda del tesoro, Adivinar la palabra, Anagrama, Sopa de letras y Escritura."
      },
      {
        question: "\u00bfPuedo usar estas fichas comercialmente?",
        answer: "\u00a1S\u00ed! Tanto el plan Core como el Full incluyen licencia comercial. Puedes vender tus fichas creadas en plataformas como Teachers Pay Teachers, Etsy, o usarlas en tu negocio de tutor\u00eda, materiales de clase o publicaciones educativas."
      },
      {
        question: "\u00bfPara qu\u00e9 niveles escolares est\u00e1n dise\u00f1adas las fichas?",
        answer: "Nuestras fichas est\u00e1n dise\u00f1adas para preescolar hasta 3er grado, cubriendo edades de 3 a 9 a\u00f1os. Cada generador incluye ajustes de dificultad para que puedas adaptar el contenido al nivel exacto de tus estudiantes."
      },
      {
        question: "\u00bfCu\u00e1ntos idiomas son compatibles?",
        answer: "LessonCraftStudio es compatible con 11 idiomas: ingl\u00e9s, alem\u00e1n, franc\u00e9s, espa\u00f1ol, portugu\u00e9s, italiano, neerland\u00e9s, sueco, dan\u00e9s, noruego y finland\u00e9s. Todos los generadores producen fichas con instrucciones, etiquetas y contenido correctamente localizados."
      },
      {
        question: "\u00bfNecesito habilidades de dise\u00f1o para crear fichas?",
        answer: "\u00a1Para nada! Cada generador utiliza una interfaz sencilla de apuntar y hacer clic. Elige un tema, selecciona tus ajustes y descarga un PDF perfectamente formateado en menos de 3 minutos. No se requiere experiencia en dise\u00f1o gr\u00e1fico, software especial ni conocimientos t\u00e9cnicos."
      },
      {
        question: "\u00bfPuedo imprimir las fichas en casa?",
        answer: "Por supuesto. Cada ficha se descarga como un PDF de alta resoluci\u00f3n a 300 DPI que se imprime perfectamente en cualquier impresora dom\u00e9stica o de oficina est\u00e1ndar. Los archivos est\u00e1n optimizados para tama\u00f1os de papel US Letter y A4."
      },
      {
        question: "\u00bfHay una biblioteca de im\u00e1genes incluida?",
        answer: "\u00a1S\u00ed! Los suscriptores del plan Full tienen acceso a nuestra biblioteca curada de m\u00e1s de 3.000 im\u00e1genes clipart seleccionadas a mano en m\u00e1s de 100 temas, incluyendo animales, comida, veh\u00edculos, naturaleza, deportes y muchos m\u00e1s. Estas im\u00e1genes est\u00e1n profesionalmente seleccionadas para ser apropiadas para la edad y visualmente atractivas para los j\u00f3venes estudiantes."
      }
    ]
  },
  pt: {
    sectionTitle: "Perguntas Frequentes",
    items: [
      {
        question: "Os geradores de fichas s\u00e3o realmente gratuitos?",
        answer: "O nosso gerador de ca\u00e7a-palavras \u00e9 completamente gratuito sem necessidade de conta. Para aceder a 10 dos nossos geradores mais populares, o plano Core custa $15/m\u00eas. O plano Full a $25/m\u00eas desbloqueia todos os 33 geradores profissionais, a biblioteca completa de imagens e os direitos de licen\u00e7a comercial."
      },
      {
        question: "Que tipos de fichas posso criar?",
        answer: "O LessonCraftStudio oferece 33 geradores de fichas: Adi\u00e7\u00e3o, Comboio do Alfabeto, Grande e Pequeno, Bingo, Tabela de Contagem, Adi\u00e7\u00e3o Codificada, Colorir, Palavras Cruzadas, Criptograma, Desenhar e Colorir, Tra\u00e7ar Linhas, Encontrar e Contar, Encontrar Objetos, Grelha de Correspond\u00eancia, Correspond\u00eancia, Puzzle Matem\u00e1tico, Ficha de Matem\u00e1tica, Pe\u00e7as em Falta, Mais e Menos, O Intruso, Comboio de Padr\u00f5es, Ficha de Padr\u00f5es, Caminho de Imagens, Classificar Imagens, Preposi\u00e7\u00f5es, Correspond\u00eancia de Sombras, Subtra\u00e7\u00e3o, Sudoku, Ca\u00e7a ao Tesouro, Adivinhar a Palavra, Anagrama, Ca\u00e7a-Palavras e Escrita."
      },
      {
        question: "Posso usar estas fichas comercialmente?",
        answer: "Sim! Tanto o plano Core como o Full incluem licen\u00e7a comercial. Pode vender as suas fichas criadas em plataformas como Teachers Pay Teachers, Etsy, ou us\u00e1-las no seu neg\u00f3cio de explica\u00e7\u00f5es, materiais de aula ou publica\u00e7\u00f5es educativas."
      },
      {
        question: "Para que n\u00edveis escolares s\u00e3o as fichas concebidas?",
        answer: "As nossas fichas s\u00e3o concebidas para o pr\u00e9-escolar at\u00e9 ao 3\u00ba ano, abrangendo idades dos 3 aos 9 anos. Cada gerador inclui defini\u00e7\u00f5es de dificuldade para que possa adaptar o conte\u00fado ao n\u00edvel exato dos seus alunos."
      },
      {
        question: "Quantos idiomas s\u00e3o suportados?",
        answer: "O LessonCraftStudio suporta 11 idiomas: ingl\u00eas, alem\u00e3o, franc\u00eas, espanhol, portugu\u00eas, italiano, neerland\u00eas, sueco, dinamarqu\u00eas, noruegu\u00eas e finland\u00eas. Todos os geradores produzem fichas com instru\u00e7\u00f5es, r\u00f3tulos e conte\u00fado corretamente localizados."
      },
      {
        question: "Preciso de compet\u00eancias de design para criar fichas?",
        answer: "De modo algum! Cada gerador utiliza uma interface simples de apontar e clicar. Escolha um tema, selecione as suas defini\u00e7\u00f5es e descarregue um PDF perfeitamente formatado em menos de 3 minutos. N\u00e3o \u00e9 necess\u00e1ria experi\u00eancia em design gr\u00e1fico, software especial ou conhecimentos t\u00e9cnicos."
      },
      {
        question: "Posso imprimir as fichas em casa?",
        answer: "Com certeza. Cada ficha \u00e9 descarregada como um PDF de alta resolu\u00e7\u00e3o a 300 DPI que imprime perfeitamente em qualquer impressora dom\u00e9stica ou de escrit\u00f3rio padr\u00e3o. Os ficheiros est\u00e3o otimizados para os formatos de papel US Letter e A4."
      },
      {
        question: "Existe uma biblioteca de imagens inclu\u00edda?",
        answer: "Sim! Os assinantes do plano Full t\u00eam acesso \u00e0 nossa biblioteca curada de mais de 3.000 imagens clipart selecionadas \u00e0 m\u00e3o em mais de 100 temas, incluindo animais, comida, ve\u00edculos, natureza, desporto e muitos mais. Estas imagens s\u00e3o profissionalmente selecionadas para serem adequadas \u00e0 idade e visualmente atrativas para jovens aprendizes."
      }
    ]
  },
  it: {
    sectionTitle: "Domande Frequenti",
    items: [
      {
        question: "I generatori di schede sono davvero gratuiti?",
        answer: "Il nostro generatore di crucipuzzle \u00e8 completamente gratuito senza bisogno di account. Per accedere a 10 dei nostri generatori pi\u00f9 popolari, il piano Core costa $15/mese. Il piano Full a $25/mese sblocca tutti i 33 generatori professionali, la libreria completa di immagini e i diritti di licenza commerciale."
      },
      {
        question: "Quali tipi di schede posso creare?",
        answer: "LessonCraftStudio offre 33 generatori di schede: Addizione, Treno dell\u2019Alfabeto, Grande e Piccolo, Bingo, Tabella di Conteggio, Addizione in Codice, Colorare, Cruciverba, Crittogramma, Disegnare e Colorare, Tracciare Linee, Trovare e Contare, Trovare Oggetti, Griglia di Abbinamento, Abbinamento, Puzzle Matematico, Scheda di Matematica, Pezzi Mancanti, Pi\u00f9 e Meno, L\u2019Intruso, Treno di Sequenze, Scheda di Sequenze, Percorso di Immagini, Classificare Immagini, Preposizioni, Abbinare le Ombre, Sottrazione, Sudoku, Caccia al Tesoro, Indovina la Parola, Anagramma, Crucipuzzle e Scrittura."
      },
      {
        question: "Posso usare queste schede a scopo commerciale?",
        answer: "S\u00ec! Sia il piano Core che il Full includono la licenza commerciale. Puoi vendere le schede create su piattaforme come Teachers Pay Teachers, Etsy, o usarle nella tua attivit\u00e0 di tutoraggio, nei materiali didattici o nelle pubblicazioni educative."
      },
      {
        question: "Per quali livelli scolastici sono progettate le schede?",
        answer: "Le nostre schede sono progettate per la scuola dell\u2019infanzia fino alla terza elementare, coprendo le et\u00e0 dai 3 ai 9 anni. Ogni generatore include impostazioni di difficolt\u00e0 per adattare il contenuto al livello esatto dei tuoi studenti."
      },
      {
        question: "Quante lingue sono supportate?",
        answer: "LessonCraftStudio supporta 11 lingue: inglese, tedesco, francese, spagnolo, portoghese, italiano, olandese, svedese, danese, norvegese e finlandese. Tutti i generatori producono schede con istruzioni, etichette e contenuti correttamente localizzati."
      },
      {
        question: "Servono competenze di design per creare le schede?",
        answer: "Assolutamente no! Ogni generatore utilizza un\u2019interfaccia semplice punta e clicca. Scegli un tema, seleziona le impostazioni e scarica un PDF perfettamente formattato in meno di 3 minuti. Non servono esperienza in grafica, software speciali o conoscenze tecniche."
      },
      {
        question: "Posso stampare le schede a casa?",
        answer: "Certamente. Ogni scheda viene scaricata come PDF ad alta risoluzione a 300 DPI che si stampa perfettamente su qualsiasi stampante domestica o da ufficio standard. I file sono ottimizzati per i formati carta US Letter e A4."
      },
      {
        question: "\u00c8 inclusa una libreria di immagini?",
        answer: "S\u00ec! Gli abbonati al piano Full hanno accesso alla nostra libreria curata di oltre 3.000 immagini clipart selezionate a mano in pi\u00f9 di 100 temi, tra cui animali, cibo, veicoli, natura, sport e molti altri. Queste immagini sono professionalmente selezionate per essere adatte all\u2019et\u00e0 e visivamente coinvolgenti per i giovani studenti."
      }
    ]
  },
  nl: {
    sectionTitle: "Veelgestelde Vragen",
    items: [
      {
        question: "Zijn de werkbladgeneratoren echt gratis?",
        answer: "Onze woordzoeker-generator is volledig gratis zonder account. Voor toegang tot 10 van onze populairste generatoren kost het Core-plan $15/maand. Het Full-plan voor $25/maand ontgrendelt alle 33 professionele werkbladgeneratoren, de complete afbeeldingenbibliotheek en commerci\u00eble licentierechten."
      },
      {
        question: "Welke soorten werkbladen kan ik maken?",
        answer: "LessonCraftStudio biedt 33 werkbladgeneratoren: Optellen, Alfabettrein, Groot & Klein, Bingo, Teltabel, Code-optelling, Kleuren, Kruiswoordpuzzel, Cryptogram, Tekenen & Kleuren, Lijnen trekken, Zoeken & Tellen, Objecten vinden, Rastermatching, Koppelen, Rekenpuzzel, Rekenwerkblad, Ontbrekende stukken, Meer & Minder, De vreemde eend, Patroontrein, Patroonwerkblad, Afbeeldingspad, Afbeeldingen sorteren, Voorzetsels, Schaduwmatching, Aftrekken, Sudoku, Speurtocht, Woord raden, Woordmix, Woordzoeker en Schrijven."
      },
      {
        question: "Kan ik deze werkbladen commercieel gebruiken?",
        answer: "Ja! Zowel het Core- als het Full-plan bevat een commerci\u00eble licentie. Je kunt je gemaakte werkbladen verkopen op platforms zoals Teachers Pay Teachers, Etsy, of ze gebruiken in je bijlesbedrijf, lesmateriaal of educatieve publicaties."
      },
      {
        question: "Voor welke leeftijdsgroepen zijn de werkbladen ontworpen?",
        answer: "Onze werkbladen zijn ontworpen voor kleuters tot groep 5, voor leeftijden van 3 tot 9 jaar. Elke generator bevat moeilijkheidsinstellingen zodat je de inhoud kunt afstemmen op het exacte niveau van je leerlingen."
      },
      {
        question: "Hoeveel talen worden ondersteund?",
        answer: "LessonCraftStudio ondersteunt 11 talen: Engels, Duits, Frans, Spaans, Portugees, Italiaans, Nederlands, Zweeds, Deens, Noors en Fins. Alle generatoren produceren werkbladen met correct gelokaliseerde instructies, labels en inhoud."
      },
      {
        question: "Heb ik designvaardigheden nodig om werkbladen te maken?",
        answer: "Helemaal niet! Elke generator gebruikt een eenvoudige point-and-click-interface. Kies een thema, selecteer je instellingen en download een prachtig opgemaakt PDF in minder dan 3 minuten. Geen grafische ontwerpervaring, speciale software of technische kennis vereist."
      },
      {
        question: "Kan ik de werkbladen thuis afdrukken?",
        answer: "Absoluut. Elk werkblad wordt gedownload als een hoge-resolutie 300 DPI PDF die perfect afdrukt op elke standaard thuis- of kantoorprinter. De bestanden zijn geoptimaliseerd voor zowel US Letter als A4-papierformaten."
      },
      {
        question: "Is er een afbeeldingenbibliotheek inbegrepen?",
        answer: "Ja! Abonnees van het Full-plan krijgen toegang tot onze samengestelde bibliotheek van meer dan 3.000 handgekozen clipart-afbeeldingen in meer dan 100 thema's, waaronder dieren, eten, voertuigen, natuur, sport en nog veel meer. Deze afbeeldingen zijn professioneel geselecteerd om leeftijdsgeschikt en visueel aantrekkelijk te zijn voor jonge leerlingen."
      }
    ]
  },
  sv: {
    sectionTitle: "Vanliga Fr\u00e5gor",
    items: [
      {
        question: "\u00c4r arbetsblads-generatorerna verkligen gratis?",
        answer: "V\u00e5r ords\u00f6ksgenerator \u00e4r helt gratis utan konto. F\u00f6r tillg\u00e5ng till 10 av v\u00e5ra popul\u00e4raste generatorer kostar Core-planen $15/m\u00e5nad. Full-planen f\u00f6r $25/m\u00e5nad l\u00e5ser upp alla 33 professionella arbetsblads-generatorer, det kompletta bildbiblioteket och kommersiella licensr\u00e4ttigheter."
      },
      {
        question: "Vilka typer av arbetsblad kan jag skapa?",
        answer: "LessonCraftStudio erbjuder 33 arbetsblads-generatorer: Addition, Bokstavst\u00e5g, Stor & Liten, Bingo, R\u00e4knetabell, Kodaddition, F\u00e4rgl\u00e4ggning, Korsord, Kryptogram, Rita & F\u00e4rgl\u00e4gg, Dra linjer, Hitta & R\u00e4kna, Hitta objekt, Rutn\u00e4tsmatchning, Matchning, Mattepussel, Mattearbetsblad, Saknade bitar, Mer & Mindre, Udda bland jamt, M\u00f6nstert\u00e5g, M\u00f6nsterarbetsblad, Bildv\u00e4g, Bildsortering, Prepositioner, Skuggmatchning, Subtraktion, Sudoku, Skattjakt, Gissa ordet, Bokstavsmix, Ords\u00f6k och Skrivning."
      },
      {
        question: "Kan jag anv\u00e4nda dessa arbetsblad kommersiellt?",
        answer: "Ja! B\u00e5de Core- och Full-planen inkluderar kommersiell licens. Du kan s\u00e4lja dina skapade arbetsblad p\u00e5 plattformar som Teachers Pay Teachers, Etsy, eller anv\u00e4nda dem i din privatundervisning, ditt undervisningsmaterial eller dina utbildningspublikationer."
      },
      {
        question: "F\u00f6r vilka \u00e5ldersgrupper \u00e4r arbetsbladen designade?",
        answer: "V\u00e5ra arbetsblad \u00e4r designade f\u00f6r f\u00f6rskola till \u00e5rskurs 3, f\u00f6r \u00e5ldrar 3 till 9 \u00e5r. Varje generator inkluderar sv\u00e5righetsinst\u00e4llningar s\u00e5 att du kan anpassa inneh\u00e5llet till dina elevers exakta niv\u00e5."
      },
      {
        question: "Hur m\u00e5nga spr\u00e5k st\u00f6ds?",
        answer: "LessonCraftStudio st\u00f6der 11 spr\u00e5k: engelska, tyska, franska, spanska, portugisiska, italienska, nederl\u00e4ndska, svenska, danska, norska och finska. Alla generatorer producerar arbetsblad med korrekt lokaliserade instruktioner, etiketter och inneh\u00e5ll."
      },
      {
        question: "Beh\u00f6ver jag designkunskaper f\u00f6r att skapa arbetsblad?",
        answer: "Inte alls! Varje generator anv\u00e4nder ett enkelt peka-och-klicka-gr\u00e4nssnitt. V\u00e4lj ett tema, v\u00e4lj dina inst\u00e4llningar och ladda ner en snyggt formaterad PDF p\u00e5 under 3 minuter. Ingen grafisk designerfarenhet, specialprogramvara eller teknisk kunskap kr\u00e4vs."
      },
      {
        question: "Kan jag skriva ut arbetsbladen hemma?",
        answer: "Absolut. Varje arbetsblad laddas ner som en h\u00f6guppl\u00f6st 300 DPI PDF som skrivs ut perfekt p\u00e5 alla vanliga hem- eller kontorsskrivare. Filerna \u00e4r optimerade f\u00f6r b\u00e5de US Letter och A4-pappersformat."
      },
      {
        question: "Ing\u00e5r ett bildbibliotek?",
        answer: "Ja! Full-prenumeranter f\u00e5r tillg\u00e5ng till v\u00e5rt kurerade bibliotek med \u00f6ver 3\u00a0000 handplockade clipart-bilder i \u00f6ver 100 teman, inklusive djur, mat, fordon, natur, sport och m\u00e5nga fler. Dessa bilder \u00e4r professionellt utvalda f\u00f6r att vara \u00e5ldersanpassade och visuellt engagerande f\u00f6r unga elever."
      }
    ]
  },
  da: {
    sectionTitle: "Ofte Stillede Sp\u00f8rgsm\u00e5l",
    items: [
      {
        question: "Er arbejdsarkgeneratorerne virkelig gratis?",
        answer: "Vores krydsordsgenereator er helt gratis uden konto. For adgang til 10 af vores mest popul\u00e6re generatorer koster Core-planen $15/m\u00e5ned. Full-planen til $25/m\u00e5ned l\u00e5ser alle 33 professionelle arbejdsarkgeneratorer, det komplette billedbibliotek og kommercielle licensrettigheder op."
      },
      {
        question: "Hvilke typer arbejdsark kan jeg oprette?",
        answer: "LessonCraftStudio tilbyder 33 arbejdsarkgeneratorer: Addition, Bogstavtog, Stor & Lille, Bingo, T\u00e6lletabel, Kodeaddition, Farvel\u00e6gning, Krydsord, Kryptogram, Tegn & Farvel\u00e6g, Tegne linjer, Find & T\u00e6l, Find objekter, Gittermatchning, Matchning, Mattepuslespil, Mattearbejdsark, Manglende brikker, Mere & Mindre, Den ulige ud, M\u00f8nstertog, M\u00f8nsterarbejdsark, Billedsti, Billedsortering, Forholdsord, Skyggematching, Subtraktion, Sudoku, Skattejagt, G\u00e6t ordet, Bogstavmix, Ords\u00f8gning og Skrivning."
      },
      {
        question: "Kan jeg bruge disse arbejdsark kommercielt?",
        answer: "Ja! B\u00e5de Core- og Full-planen inkluderer kommerciel licens. Du kan s\u00e6lge dine oprettede arbejdsark p\u00e5 platforme som Teachers Pay Teachers, Etsy, eller bruge dem i din tutorvirksomhed, undervisningsmaterialer eller uddannelsespublikationer."
      },
      {
        question: "Til hvilke klassetrin er arbejdsarkene designet?",
        answer: "Vores arbejdsark er designet til b\u00f8rnehave til 3. klasse, d\u00e6kkende aldre fra 3 til 9 \u00e5r. Hver generator inkluderer sv\u00e6rhedsindstillinger, s\u00e5 du kan tilpasse indholdet til dine elevers n\u00f8jagtige niveau."
      },
      {
        question: "Hvor mange sprog underst\u00f8ttes?",
        answer: "LessonCraftStudio underst\u00f8tter 11 sprog: engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk, norsk og finsk. Alle generatorer producerer arbejdsark med korrekt lokaliserede instruktioner, m\u00e6rkater og indhold."
      },
      {
        question: "Skal jeg have designf\u00e6rdigheder for at oprette arbejdsark?",
        answer: "Slet ikke! Hver generator bruger en enkel peg-og-klik-gr\u00e6nseflade. V\u00e6lg et tema, v\u00e6lg dine indstillinger og download en smukt formateret PDF p\u00e5 under 3 minutter. Ingen grafisk designerfaring, speciel software eller teknisk viden p\u00e5kr\u00e6vet."
      },
      {
        question: "Kan jeg printe arbejdsarkene derhjemme?",
        answer: "Absolut. Hvert arbejdsark downloades som en h\u00f8joppl\u00f8snings 300 DPI PDF, der printer perfekt p\u00e5 enhver standard hjemme- eller kontorprinter. Filerne er optimeret til b\u00e5de US Letter og A4-papirformater."
      },
      {
        question: "Er der et billedbibliotek inkluderet?",
        answer: "Ja! Full-abonnenter f\u00e5r adgang til vores kuraterede bibliotek med over 3.000 h\u00e5ndplukkede clipart-billeder i over 100 temaer, herunder dyr, mad, k\u00f8ret\u00f8jer, natur, sport og mange flere. Disse billeder er professionelt udvalgt til at v\u00e6re alderspassende og visuelt engagerende for unge elever."
      }
    ]
  },
  no: {
    sectionTitle: "Vanlige Sp\u00f8rsm\u00e5l",
    items: [
      {
        question: "Er arbeidsarkgeneratorene virkelig gratis?",
        answer: "V\u00e5r ords\u00f8kgenerator er helt gratis uten konto. For tilgang til 10 av v\u00e5re mest popul\u00e6re generatorer koster Core-planen $15/m\u00e5ned. Full-planen til $25/m\u00e5ned l\u00e5ser opp alle 33 profesjonelle arbeidsarkgeneratorer, det komplette bildbiblioteket og kommersielle lisensrettigheter."
      },
      {
        question: "Hvilke typer arbeidsark kan jeg lage?",
        answer: "LessonCraftStudio tilbyr 33 arbeidsarkgeneratorer: Addisjon, Bokstavtog, Stor & Liten, Bingo, Telletabell, Kodeaddisjon, Fargelegging, Kryssord, Kryptogram, Tegn & Fargelegg, Tegne linjer, Finn & Tell, Finn objekter, Rutenettsmatching, Matching, Mattepuslespill, Mattearbeidsark, Manglende brikker, Mer & Mindre, Den rare ut, M\u00f8nstertog, M\u00f8nsterarbeidsark, Bildesti, Bildesortering, Preposisjoner, Skyggematching, Subtraksjon, Sudoku, Skattejakt, Gjett ordet, Bokstavmiks, Ords\u00f8k og Skriving."
      },
      {
        question: "Kan jeg bruke disse arbeidsarkene kommersielt?",
        answer: "Ja! B\u00e5de Core- og Full-planen inkluderer kommersiell lisens. Du kan selge dine opprettede arbeidsark p\u00e5 plattformer som Teachers Pay Teachers, Etsy, eller bruke dem i tutorvirksomheten din, undervisningsmateriell eller utdanningspublikasjoner."
      },
      {
        question: "For hvilke klassetrinn er arbeidsarkene designet?",
        answer: "V\u00e5re arbeidsark er designet for barnehage til 3. klasse, som dekker aldre fra 3 til 9 \u00e5r. Hver generator inkluderer vanskelighetsinnstillinger slik at du kan tilpasse innholdet til elevenes n\u00f8yaktige niv\u00e5."
      },
      {
        question: "Hvor mange spr\u00e5k st\u00f8ttes?",
        answer: "LessonCraftStudio st\u00f8tter 11 spr\u00e5k: engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk, norsk og finsk. Alle generatorer produserer arbeidsark med korrekt lokaliserte instruksjoner, etiketter og innhold."
      },
      {
        question: "Trenger jeg designferdigheter for \u00e5 lage arbeidsark?",
        answer: "Absolutt ikke! Hver generator bruker et enkelt pek-og-klikk-grensesnitt. Velg et tema, velg innstillingene dine og last ned en pent formatert PDF p\u00e5 under 3 minutter. Ingen grafisk designerfaring, spesialprogramvare eller teknisk kunnskap n\u00f8dvendig."
      },
      {
        question: "Kan jeg skrive ut arbeidsarkene hjemme?",
        answer: "Absolutt. Hvert arbeidsark lastes ned som en h\u00f8yoppl\u00f8selig 300 DPI PDF som skrives ut perfekt p\u00e5 enhver standard hjemme- eller kontorskriver. Filene er optimalisert for b\u00e5de US Letter og A4-papirformater."
      },
      {
        question: "Er det et bildbibliotek inkludert?",
        answer: "Ja! Full-abonnenter f\u00e5r tilgang til v\u00e5rt kuraterte bibliotek med over 3\u00a0000 h\u00e5ndplukkede clipart-bilder i over 100 temaer, inkludert dyr, mat, kj\u00f8ret\u00f8y, natur, sport og mange flere. Disse bildene er profesjonelt utvalgt for \u00e5 v\u00e6re alderstilpassede og visuelt engasjerende for unge elever."
      }
    ]
  },
  fi: {
    sectionTitle: "Usein Kysytyt Kysymykset",
    items: [
      {
        question: "Ovatko ty\u00f6lehtien generaattorit todella ilmaisia?",
        answer: "Sananhakugeneraattorimme on t\u00e4ysin ilmainen ilman tili\u00e4. 10 suosituimman generaattorin k\u00e4ytt\u00f6\u00f6n Core-suunnitelma maksaa $15/kuukausi. Full-suunnitelma hintaan $25/kuukausi avaa kaikki 33 ammattimaista ty\u00f6lehtien generaattoria, t\u00e4ydellisen kuvakirjaston ja kaupalliset lisenssioikeudet."
      },
      {
        question: "Mink\u00e4laisia ty\u00f6lehti\u00e4 voin luoda?",
        answer: "LessonCraftStudio tarjoaa 33 ty\u00f6lehtien generaattoria: Yhteenlasku, Kirjainjuna, Suuri & Pieni, Bingo, Laskentataulukko, Koodiyhteenlasku, V\u00e4ritys, Ristikko, Kryptogrammi, Piirr\u00e4 & V\u00e4rit\u00e4, Viivojen piirt\u00e4minen, Etsi & Laske, Etsi esineit\u00e4, Ruudukkoyhdist\u00e4minen, Yhdist\u00e4minen, Matikkapulmapeli, Matikkataulukko, Puuttuvat palat, Enemm\u00e4n & V\u00e4hemm\u00e4n, Yksi ylim\u00e4\u00e4r\u00e4inen, Kuviojuna, Kuviotaulukko, Kuvapolku, Kuvalajittelu, Prepositiot, Varjoyhdist\u00e4minen, V\u00e4hennyslasku, Sudoku, Aarteenetsint\u00e4, Arvaa sana, Kirjainsekoitus, Sanahaku ja Kirjoitus."
      },
      {
        question: "Voinko k\u00e4ytt\u00e4\u00e4 n\u00e4it\u00e4 ty\u00f6lehti\u00e4 kaupallisesti?",
        answer: "Kyll\u00e4! Sek\u00e4 Core- ett\u00e4 Full-suunnitelma sis\u00e4lt\u00e4v\u00e4t kaupallisen lisenssin. Voit myyd\u00e4 luomiasi ty\u00f6lehti\u00e4 alustoilla kuten Teachers Pay Teachers, Etsy, tai k\u00e4ytt\u00e4\u00e4 niit\u00e4 tukiopetustoiminnassasi, opetusmateriaalissasi tai koulutuksellisissa julkaisuissasi."
      },
      {
        question: "Mille luokkatasoille ty\u00f6lehdet on suunniteltu?",
        answer: "Ty\u00f6lehtemme on suunniteltu esikoulusta kolmanteen luokkaan, kattaen i\u00e4t 3\u20139 vuotta. Jokaisessa generaattorissa on vaikeusasetukset, jotta voit mukauttaa sis\u00e4ll\u00f6n oppilaittesi tarkkaan tasoon."
      },
      {
        question: "Kuinka monta kielt\u00e4 tuetaan?",
        answer: "LessonCraftStudio tukee 11 kielt\u00e4: englanti, saksa, ranska, espanja, portugali, italia, hollanti, ruotsi, tanska, norja ja suomi. Kaikki generaattorit tuottavat ty\u00f6lehti\u00e4 oikein lokalisoiduilla ohjeilla, tunnisteilla ja sis\u00e4ll\u00f6ll\u00e4."
      },
      {
        question: "Tarvitsenko suunnittelutaitoja ty\u00f6lehtien luomiseen?",
        answer: "Ei lainkaan! Jokainen generaattori k\u00e4ytt\u00e4\u00e4 yksinkertaista osoita ja napsauta -k\u00e4ytt\u00f6liittym\u00e4\u00e4. Valitse teema, valitse asetuksesi ja lataa kauniisti muotoiltu PDF alle 3 minuutissa. Graafisen suunnittelun kokemusta, erikoisohjelmistoja tai teknist\u00e4 osaamista ei tarvita."
      },
      {
        question: "Voinko tulostaa ty\u00f6lehdet kotona?",
        answer: "Ehdottomasti. Jokainen ty\u00f6lehti ladataan korkearesoluutioisena 300 DPI PDF-tiedostona, joka tulostuu t\u00e4ydellisesti mill\u00e4 tahansa tavallisella koti- tai toimistotulostimella. Tiedostot on optimoitu sek\u00e4 US Letter- ett\u00e4 A4-paperikoille."
      },
      {
        question: "Sis\u00e4ltyyk\u00f6 kuvakirjasto?",
        answer: "Kyll\u00e4! Full-tilaajat saavat p\u00e4\u00e4syn kuratoituun kirjastoomme, jossa on yli 3\u00a0000 k\u00e4sin valittua clipart-kuvaa yli 100 teemassa, mukaan lukien el\u00e4imet, ruoka, ajoneuvot, luonto, urheilu ja paljon muuta. N\u00e4m\u00e4 kuvat on ammattimaisesti valittu ik\u00e4sopiviksi ja visuaalisesti kiinnostaviksi nuorille oppijoille."
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
