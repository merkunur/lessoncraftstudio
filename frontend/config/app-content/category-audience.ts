export interface AudienceSegment {
  persona: string;
  description: string;
}

export function getCategoryAudience(
  categoryId: string,
  locale: string
): AudienceSegment[] {
  return audiences[categoryId]?.[locale] || audiences[categoryId]?.en || [];
}

const audiences: Record<string, Record<string, AudienceSegment[]>> = {
  math: {
    en: [
      {
        persona: 'Etsy Sellers',
        description: 'Create themed math worksheet listings that parents search for year-round. Addition, subtraction, and number comparison worksheets are evergreen best-sellers on Etsy, especially when bundled by theme or grade level.',
      },
      {
        persona: 'Amazon KDP Publishers',
        description: 'Build complete math activity books with professionally formatted worksheets and answer keys. KDP math workbooks for preschool through second grade consistently rank in education categories with minimal ongoing effort.',
      },
      {
        persona: 'Teachers Pay Teachers Sellers',
        description: 'Offer differentiated math resources that teachers can use across ability levels. TPT buyers value worksheets with themed visuals that make repetitive math practice engaging for young learners.',
      },
      {
        persona: 'Homeschool Educators & Parents',
        description: 'Generate unlimited practice worksheets tailored to your child\'s current level. Themed images keep kids motivated through repetitive math drills, and answer keys let parents check work quickly.',
      },
    ],
    nl: [
      {
        persona: 'Etsy-verkopers',
        description: 'Maak thematische rekenwerkbladvermeldingen waar ouders het hele jaar naar zoeken. Optel-, aftrek- en vergelijkingswerkbladen zijn altijdgroene bestsellers op Etsy, vooral in bundels per thema of groepsniveau.',
      },
      {
        persona: 'Amazon KDP-uitgevers',
        description: 'Stel complete rekenactiviteitenboeken samen met professioneel opgemaakte werkbladen en antwoordenbladen. KDP-rekenboeken voor kleuters tot en met groep 5 scoren consequent in de educatieve categorie. Publiceer ook via Brave New Books voor Bol.com.',
      },
      {
        persona: 'Samen Voor Onderwijs & Eduki-verkopers',
        description: 'Bied gedifferentieerde rekenmaterialen aan die leerkrachten over alle niveaus kunnen inzetten. Kopers op deze platforms waarderen werkbladen met thematische afbeeldingen die herhaalde rekenoefening boeiend maken.',
      },
      {
        persona: 'Thuisonderwijs & Ouders',
        description: 'Genereer onbeperkt oefenwerkbladen afgestemd op het niveau van uw kind. Thematische afbeeldingen houden kinderen gemotiveerd bij rekenoefeningen en antwoordenbladen laten u het werk snel controleren.',
      },
    ],
    de: [
      {
        persona: 'Etsy-Verkäufer',
        description: 'Erstellen Sie thematische Mathe-Arbeitsblätter, nach denen Eltern das ganze Jahr suchen. Addition, Subtraktion und Zahlenvergleich sind Dauerbrenner auf Etsy, besonders als thematische Bundles.',
      },
      {
        persona: 'Amazon KDP-Verleger',
        description: 'Erstellen Sie komplette Mathe-Aktivitätenbücher mit professionell formatierten Arbeitsblättern und Lösungsblättern. KDP-Mathebücher für Vorschule bis 2. Klasse ranken zuverlässig auf Amazon.de in der Bildungskategorie.',
      },
      {
        persona: 'Eduki & Lehrermarktplatz-Verkäufer',
        description: 'Bieten Sie differenzierte Mathe-Materialien an, die Lehrkräfte über alle Leistungsstufen einsetzen können. Käufer schätzen Arbeitsblätter mit thematischen Bildern, die wiederholtes Rechenüben ansprechend gestalten.',
      },
      {
        persona: 'Homeschooling & Eltern',
        description: 'Generieren Sie unbegrenzt Übungsblätter, die auf das aktuelle Niveau Ihres Kindes abgestimmt sind. Thematische Bilder halten Kinder motiviert und Lösungsblätter ermöglichen schnelle Kontrolle.',
      },
    ],
    fr: [
      {
        persona: 'Vendeurs Etsy',
        description: 'Créez des fiches de mathématiques thématiques que les parents recherchent toute l\'année. Les fiches d\'addition, soustraction et comparaison sont des best-sellers permanents sur Etsy, surtout en lots thématiques.',
      },
      {
        persona: 'Éditeurs Amazon KDP',
        description: 'Composez des cahiers d\'activités mathématiques complets avec des fiches professionnelles et corrigés. Les cahiers KDP pour maternelle à CE2 se classent régulièrement dans la catégorie éducation sur Amazon.fr.',
      },
      {
        persona: 'Vendeurs Eduki France',
        description: 'Proposez des ressources mathématiques différenciées utilisables à tous les niveaux. Les acheteurs sur Eduki valorisent les fiches avec des visuels thématiques qui rendent la pratique du calcul attrayante.',
      },
      {
        persona: 'Instruction en famille & Parents',
        description: 'Générez des fiches d\'exercices illimitées adaptées au niveau actuel de votre enfant. Les images thématiques maintiennent la motivation et les corrigés permettent aux parents de vérifier rapidement.',
      },
    ],
    es: [
      {
        persona: 'Vendedores de Etsy',
        description: 'Cree fichas de matemáticas temáticas que los padres buscan durante todo el año. Las fichas de suma, resta y comparación son best-sellers permanentes en Etsy, especialmente en paquetes temáticos.',
      },
      {
        persona: 'Editores de Amazon KDP',
        description: 'Construya cuadernos de actividades matemáticas completos con fichas profesionales y hojas de respuestas. Los cuadernos KDP de preescolar a segundo grado se posicionan bien en Amazon.es en la categoría educativa.',
      },
      {
        persona: 'Vendedores de Eduki España',
        description: 'Ofrezca recursos matemáticos diferenciados que los docentes pueden usar en todos los niveles. Los compradores valoran fichas con imágenes temáticas que hacen atractiva la práctica repetitiva del cálculo.',
      },
      {
        persona: 'Educación en casa y Padres',
        description: 'Genere fichas de práctica ilimitadas adaptadas al nivel actual de su hijo. Las imágenes temáticas mantienen a los niños motivados y las hojas de respuestas permiten a los padres verificar rápidamente.',
      },
    ],
    pt: [
      {
        persona: 'Vendedores Etsy',
        description: 'Crie fichas de matemática temáticas que os pais procuram o ano todo. Fichas de adição, subtração e comparação são best-sellers permanentes no Etsy, especialmente em pacotes temáticos.',
      },
      {
        persona: 'Editores Amazon KDP',
        description: 'Monte cadernos de atividades de matemática completos com fichas profissionais e gabaritos. Cadernos KDP de pré-escola até o 2.o ano classificam-se bem na Amazon.com.br na categoria educação.',
      },
      {
        persona: 'Vendedores Hotmart',
        description: 'Ofereça recursos matemáticos diferenciados que educadores podem usar em todos os níveis. Compradores na Hotmart valorizam fichas com imagens temáticas que tornam a prática repetitiva do cálculo envolvente.',
      },
      {
        persona: 'Educação domiciliar e Pais',
        description: 'Gere fichas de prática ilimitadas adaptadas ao nível atual do seu filho. Imagens temáticas mantêm as crianças motivadas e os gabaritos permitem que os pais verifiquem rapidamente.',
      },
    ],
    it: [
      {
        persona: 'Venditori Etsy',
        description: 'Create schede di matematica tematiche che i genitori cercano tutto l\'anno. Le schede di addizione, sottrazione e confronto sono bestseller su Etsy, soprattutto in pacchetti tematici.',
      },
      {
        persona: 'Editori Amazon KDP',
        description: 'Realizzate quaderni di attività di matematica completi con schede professionali e soluzioni. I quaderni KDP dalla scuola dell\'infanzia alla seconda elementare si posizionano bene su Amazon.it nella categoria educazione.',
      },
      {
        persona: 'Venditori Eduki Italia',
        description: 'Offrite risorse matematiche differenziate utilizzabili a tutti i livelli. Gli acquirenti su Eduki apprezzano le schede con immagini tematiche che rendono coinvolgente la pratica ripetitiva del calcolo.',
      },
      {
        persona: 'Istruzione parentale e Genitori',
        description: 'Generate schede di esercizi illimitate adattate al livello attuale del vostro bambino. Le immagini tematiche mantengono alta la motivazione e le soluzioni permettono ai genitori di verificare rapidamente.',
      },
    ],
    sv: [
      {
        persona: 'Etsy-säljare',
        description: 'Skapa tematiska mattearbetsblad som föräldrar söker efter hela året. Additions-, subtraktions- och jämförelseblad är ständiga bästsäljare på Etsy, särskilt i tematiska paket.',
      },
      {
        persona: 'Amazon KDP-utgivare',
        description: 'Bygg kompletta matteaktivitetsböcker med professionellt formaterade arbetsblad och facit. KDP-mattehäften för förskola till årskurs 2 rankas konsekvent i utbildningskategorin på Amazon.se.',
      },
      {
        persona: 'Eduki Sverige-säljare',
        description: 'Erbjud differentierade matteresurser som lärare kan använda på alla nivåer. Köpare på Eduki värdesätter arbetsblad med tematiska bilder som gör repetitiv matteövning engagerande.',
      },
      {
        persona: 'Hemundervisning & Föräldrar',
        description: 'Generera obegränsade övningsblad anpassade till ditt barns aktuella nivå. Tematiska bilder håller barn motiverade genom matteövningar och facit låter föräldrar snabbt kontrollera arbetet.',
      },
    ],
    da: [
      {
        persona: 'Etsy-sælgere',
        description: 'Opret tematiske matematikopgaver som forældre søger efter hele året. Additions-, subtraktions- og sammenligningsopgaver er evergreen bestsellere på Etsy, især i tematiske pakker.',
      },
      {
        persona: 'Amazon KDP-udgivere',
        description: 'Byg komplette matematikaktivitetsbøger med professionelt formaterede opgaver og facit. KDP-matematikbøger til børnehave til 2. klasse rangerer konsekvent i uddannelseskategorien.',
      },
      {
        persona: 'Eduki Danmark-sælgere',
        description: 'Tilbyd differentierede matematikressourcer som lærere kan bruge på tværs af niveauer. Købere på Eduki værdsætter opgaver med tematiske billeder der gør gentagen regnepraksis engagerende.',
      },
      {
        persona: 'Hjemmeundervisning & Forældre',
        description: 'Generer ubegrænsede øvelsesark tilpasset dit barns aktuelle niveau. Tematiske billeder holder børn motiverede gennem matematikøvelser, og facit lader forældre tjekke arbejdet hurtigt.',
      },
    ],
  },
  literacy: {
    en: [
      {
        persona: 'Etsy Sellers',
        description: 'List word search, crossword, and handwriting worksheets that homeschool parents and teachers actively search for. Literacy printables have strong seasonal demand around back-to-school and holiday themes.',
      },
      {
        persona: 'Amazon KDP Publishers',
        description: 'Publish word activity books combining multiple puzzle types into cohesive learning packages. Alphabet, vocabulary, and spelling workbooks perform well in the KDP education niche across multiple age groups.',
      },
      {
        persona: 'Teachers Pay Teachers Sellers',
        description: 'Create vocabulary-building resources with themed word lists that align with classroom units. TPT teachers look for printable literacy centers and independent practice activities they can use immediately.',
      },
      {
        persona: 'Homeschool Educators & Parents',
        description: 'Build custom spelling and vocabulary practice around topics your child loves. Multi-language support lets bilingual families create worksheets in their home language alongside English practice.',
      },
    ],
    nl: [
      {
        persona: 'Etsy-verkopers',
        description: 'Vermeld woordzoekers, kruiswoordpuzzels en schrijfwerkbladen waar ouders en leerkrachten actief naar zoeken. Taalprintables hebben sterke seizoensvraag rond de schoolstart en feestdagenthema\'s.',
      },
      {
        persona: 'Amazon KDP-uitgevers',
        description: 'Publiceer woordactiviteitenboeken die meerdere puzzeltypen combineren in samenhangende leerpakketten. Alfabet-, woordenschat- en spellingwerkboeken presteren goed op Amazon KDP en via Brave New Books op Bol.com.',
      },
      {
        persona: 'Samen Voor Onderwijs & Eduki-verkopers',
        description: 'Maak woordenschatopbouwende materialen met thematische woordlijsten die aansluiten bij de lesstof. Kopers zoeken naar printbare taalactiviteiten en zelfstandig werkmateriaal dat direct inzetbaar is.',
      },
      {
        persona: 'Thuisonderwijs & Ouders',
        description: 'Stel spelling- en woordenschatoefeningen samen rond onderwerpen die uw kind aanspreken. Meertalige ondersteuning laat tweetalige gezinnen werkbladen in hun thuistaal maken naast Nederlandse oefeningen.',
      },
    ],
    de: [
      {
        persona: 'Etsy-Verkäufer',
        description: 'Listen Sie Wortsuche-, Kreuzworträtsel- und Schreibarbeitsblätter, die Eltern und Lehrkräfte aktiv suchen. Literacy-Druckvorlagen haben starke saisonale Nachfrage rund um Schulanfang und Ferienthemen.',
      },
      {
        persona: 'Amazon KDP-Verleger',
        description: 'Veröffentlichen Sie Wort-Aktivitätenbücher, die mehrere Rätseltypen zu zusammenhängenden Lernpaketen kombinieren. Alphabet- und Rechtschreibhefte performen gut auf Amazon.de in der Bildungskategorie.',
      },
      {
        persona: 'Eduki & Lehrermarktplatz-Verkäufer',
        description: 'Erstellen Sie wortschatzaufbauende Materialien mit thematischen Wortlisten passend zum Unterricht. Käufer suchen nach druckbaren Sprachübungen und eigenständigem Arbeitsmaterial für den sofortigen Einsatz.',
      },
      {
        persona: 'Homeschooling & Eltern',
        description: 'Erstellen Sie individuelle Rechtschreib- und Wortschatzübungen rund um Lieblingsthemen Ihres Kindes. Mehrsprachige Unterstützung ermöglicht zweisprachigen Familien Arbeitsblätter in beiden Sprachen.',
      },
    ],
    fr: [
      {
        persona: 'Vendeurs Etsy',
        description: 'Proposez des mots cachés, mots croisés et fiches d\'écriture que les parents et enseignants recherchent activement. Les imprimables de lecture ont une forte demande saisonnière à la rentrée et aux fêtes.',
      },
      {
        persona: 'Éditeurs Amazon KDP',
        description: 'Publiez des cahiers d\'activités combinant plusieurs types de puzzles en paquets d\'apprentissage cohérents. Les cahiers d\'alphabet et de vocabulaire performent bien sur Amazon.fr dans la catégorie éducation.',
      },
      {
        persona: 'Vendeurs Eduki France',
        description: 'Créez des ressources de vocabulaire avec des listes de mots thématiques alignées sur les programmes. Les acheteurs cherchent des activités de lecture imprimables et utilisables immédiatement en classe.',
      },
      {
        persona: 'Instruction en famille & Parents',
        description: 'Construisez des exercices d\'orthographe et de vocabulaire autour des sujets que votre enfant aime. Le support multilingue permet aux familles bilingues de créer des fiches dans leur langue maternelle.',
      },
    ],
    es: [
      {
        persona: 'Vendedores de Etsy',
        description: 'Publique sopas de letras, crucigramas y fichas de escritura que padres y docentes buscan activamente. Los imprimibles de lectoescritura tienen fuerte demanda estacional en la vuelta al cole y festividades.',
      },
      {
        persona: 'Editores de Amazon KDP',
        description: 'Publique cuadernos de actividades de palabras combinando varios tipos de puzzles en paquetes de aprendizaje. Los cuadernos de alfabeto y vocabulario funcionan bien en Amazon.es en la categoría educativa.',
      },
      {
        persona: 'Vendedores de Eduki España',
        description: 'Cree recursos de vocabulario con listas de palabras temáticas alineadas con las unidades didácticas. Los compradores buscan actividades de lectoescritura imprimibles y listas para usar en el aula.',
      },
      {
        persona: 'Educación en casa y Padres',
        description: 'Cree ejercicios de ortografía y vocabulario sobre los temas favoritos de su hijo. El soporte multilingüe permite a las familias bilingües crear fichas en su lengua materna junto con el español.',
      },
    ],
    pt: [
      {
        persona: 'Vendedores Etsy',
        description: 'Publique caça-palavras, palavras cruzadas e fichas de escrita que pais e educadores procuram ativamente. Imprimíveis de alfabetização têm forte demanda sazonal na volta às aulas e datas festivas.',
      },
      {
        persona: 'Editores Amazon KDP',
        description: 'Publique cadernos de atividades combinando vários tipos de puzzles em pacotes de aprendizagem. Cadernos de alfabeto e vocabulário performam bem na Amazon.com.br na categoria educação.',
      },
      {
        persona: 'Vendedores Hotmart',
        description: 'Crie recursos de vocabulário com listas de palavras temáticas alinhadas ao currículo. Compradores na Hotmart valorizam atividades de alfabetização imprimíveis e prontas para uso em sala de aula.',
      },
      {
        persona: 'Educação domiciliar e Pais',
        description: 'Monte exercícios de ortografia e vocabulário sobre os temas favoritos do seu filho. O suporte multilíngue permite que famílias bilíngues criem fichas na língua materna junto com o português.',
      },
    ],
    it: [
      {
        persona: 'Venditori Etsy',
        description: 'Pubblicate crucipuzzle, cruciverba e schede di scrittura che genitori e insegnanti cercano attivamente. Gli stampabili di alfabetizzazione hanno forte domanda stagionale al rientro a scuola e nelle festività.',
      },
      {
        persona: 'Editori Amazon KDP',
        description: 'Pubblicate quaderni di attività che combinano più tipi di puzzle in pacchetti di apprendimento coerenti. I quaderni di alfabeto e vocabolario performano bene su Amazon.it nella categoria educazione.',
      },
      {
        persona: 'Venditori Eduki Italia',
        description: 'Create risorse di vocabolario con liste di parole tematiche allineate alla programmazione. Gli acquirenti cercano attività di alfabetizzazione stampabili e pronte per l\'uso in classe.',
      },
      {
        persona: 'Istruzione parentale e Genitori',
        description: 'Costruite esercizi di ortografia e vocabolario sui temi preferiti del vostro bambino. Il supporto multilingue permette alle famiglie bilingui di creare schede nella lingua madre.',
      },
    ],
    sv: [
      {
        persona: 'Etsy-säljare',
        description: 'Publicera ordsökningar, korsord och skrivarbetsblad som föräldrar och lärare aktivt söker efter. Läs- och skrivutskrifter har stark säsongsefterfrågan kring skolstart och högtider.',
      },
      {
        persona: 'Amazon KDP-utgivare',
        description: 'Publicera ordaktivitetsböcker som kombinerar flera pusseltyper till sammanhängande inlärningspaket. Alfabet- och ordförrådshäften presterar bra på Amazon.se i utbildningskategorin.',
      },
      {
        persona: 'Eduki Sverige-säljare',
        description: 'Skapa ordförrådsbyggande resurser med tematiska ordlistor som passar undervisningen. Köpare söker utskrivbara läs- och skrivaktiviteter som kan användas direkt i klassrummet.',
      },
      {
        persona: 'Hemundervisning & Föräldrar',
        description: 'Bygg skräddarsydda stavnings- och ordförrådsövningar kring ämnen ditt barn älskar. Flerspråkigt stöd låter tvåspråkiga familjer skapa arbetsblad på båda språken.',
      },
    ],
    da: [
      {
        persona: 'Etsy-sælgere',
        description: 'Opret ordsøgninger, krydsord og skriveøvelser som forældre og lærere aktivt søger efter. Læse- og skriveopgaver har stærk sæsonefterspørgsel omkring skolestart og højtider.',
      },
      {
        persona: 'Amazon KDP-udgivere',
        description: 'Udgiv ordaktivitetsbøger der kombinerer flere puslespiltyper i sammenhængende læringspakker. Alfabet- og ordforrådsøvelser performer godt i KDP-uddannelseskategorien.',
      },
      {
        persona: 'Eduki Danmark-sælgere',
        description: 'Skab ordforrådsopbyggende ressourcer med tematiske ordlister der passer til undervisningen. Købere søger printbare læse- og skriveaktiviteter til øjeblikkelig brug i klassen.',
      },
      {
        persona: 'Hjemmeundervisning & Forældre',
        description: 'Byg tilpassede stave- og ordforrådsøvelser omkring emner dit barn elsker. Flersproget support lader tosprogede familier oprette opgaver på begge sprog.',
      },
    ],
  },
  visual: {
    en: [
      {
        persona: 'Etsy Sellers',
        description: 'Coloring pages and drawing activities are among the highest-volume printable categories on Etsy. Themed collections for holidays, animals, and seasons generate repeat purchases from satisfied customers.',
      },
      {
        persona: 'Amazon KDP Publishers',
        description: 'Coloring books remain one of the most profitable KDP categories with low competition in niche themes. Create targeted coloring books around specific interests like dinosaurs, ocean animals, or vehicles.',
      },
      {
        persona: 'Teachers Pay Teachers Sellers',
        description: 'Visual activities serve as engaging rewards, early finisher tasks, and fine motor practice. Teachers value coloring and drawing worksheets that connect to curriculum themes and seasonal topics.',
      },
      {
        persona: 'Homeschool Educators & Parents',
        description: 'Use coloring and drawing activities as creative breaks between academic subjects. Themed visual worksheets help develop fine motor skills while keeping young children engaged and focused.',
      },
    ],
    nl: [
      {
        persona: 'Etsy-verkopers',
        description: 'Kleurplaten en tekenactiviteiten behoren tot de bestverkochte printable-categorieën op Etsy. Thematische collecties voor feestdagen, dieren en seizoenen genereren herhaalaankopen van tevreden klanten.',
      },
      {
        persona: 'Amazon KDP-uitgevers',
        description: 'Kleurboeken zijn een van de meest winstgevende KDP-categorieën met weinig concurrentie in nichethema\'s. Publiceer ook via Brave New Books op Bol.com voor de Nederlandstalige markt.',
      },
      {
        persona: 'Samen Voor Onderwijs & Eduki-verkopers',
        description: 'Visuele activiteiten dienen als beloning, extra werk voor snelle leerlingen en fijne motoriekoefening. Leerkrachten waarderen kleur- en tekenwerkbladen die aansluiten bij thema\'s en seizoenen.',
      },
      {
        persona: 'Thuisonderwijs & Ouders',
        description: 'Gebruik kleur- en tekenactiviteiten als creatieve pauze tussen schoolvakken. Thematische visuele werkbladen helpen de fijne motoriek te ontwikkelen terwijl jonge kinderen betrokken en gefocust blijven.',
      },
    ],
    de: [
      {
        persona: 'Etsy-Verkäufer',
        description: 'Ausmalbilder und Zeichenaktivitäten gehören zu den meistverkauften Druckvorlagen-Kategorien auf Etsy. Thematische Sammlungen für Feiertage, Tiere und Jahreszeiten generieren Wiederholungskäufe.',
      },
      {
        persona: 'Amazon KDP-Verleger',
        description: 'Malbücher bleiben eine der profitabelsten KDP-Kategorien mit geringem Wettbewerb in Nischenthemen. Erstellen Sie gezielte Malbücher rund um Dinosaurier, Meerestiere oder Fahrzeuge für Amazon.de.',
      },
      {
        persona: 'Eduki & Lehrermarktplatz-Verkäufer',
        description: 'Visuelle Aktivitäten dienen als motivierende Belohnungen, Zusatzaufgaben und Feinmotorik-Übungen. Lehrkräfte schätzen Mal- und Zeichenblätter passend zu Unterrichtsthemen und Jahreszeiten.',
      },
      {
        persona: 'Homeschooling & Eltern',
        description: 'Nutzen Sie Mal- und Zeichenaktivitäten als kreative Pausen zwischen den Schulfächern. Thematische visuelle Arbeitsblätter fördern die Feinmotorik und halten junge Kinder engagiert und fokussiert.',
      },
    ],
    fr: [
      {
        persona: 'Vendeurs Etsy',
        description: 'Les coloriages et activités de dessin comptent parmi les catégories d\'imprimables les plus vendues sur Etsy. Les collections thématiques pour les fêtes, animaux et saisons génèrent des achats répétés.',
      },
      {
        persona: 'Éditeurs Amazon KDP',
        description: 'Les cahiers de coloriage restent l\'une des catégories KDP les plus rentables avec peu de concurrence dans les thèmes de niche. Créez des cahiers ciblés sur Amazon.fr autour de dinosaures ou véhicules.',
      },
      {
        persona: 'Vendeurs Eduki France',
        description: 'Les activités visuelles servent de récompenses, de travail supplémentaire et de pratique de motricité fine. Les enseignants apprécient les fiches de coloriage liées aux thèmes du programme.',
      },
      {
        persona: 'Instruction en famille & Parents',
        description: 'Utilisez les coloriages et dessins comme pauses créatives entre les matières. Les fiches visuelles thématiques développent la motricité fine tout en maintenant l\'attention des jeunes enfants.',
      },
    ],
    es: [
      {
        persona: 'Vendedores de Etsy',
        description: 'Las páginas para colorear y actividades de dibujo están entre las categorías de imprimibles más vendidas en Etsy. Las colecciones temáticas para festividades y estaciones generan compras repetidas.',
      },
      {
        persona: 'Editores de Amazon KDP',
        description: 'Los cuadernos para colorear siguen siendo una de las categorías KDP más rentables con poca competencia en temas nicho. Cree cuadernos específicos de dinosaurios o animales marinos para Amazon.es.',
      },
      {
        persona: 'Vendedores de Eduki España',
        description: 'Las actividades visuales sirven como recompensas, tareas para alumnos rápidos y práctica de motricidad fina. Los docentes valoran fichas de colorear conectadas con temas del currículo.',
      },
      {
        persona: 'Educación en casa y Padres',
        description: 'Use las actividades de colorear y dibujo como pausas creativas entre materias. Las fichas visuales temáticas desarrollan la motricidad fina mientras mantienen a los niños enfocados.',
      },
    ],
    pt: [
      {
        persona: 'Vendedores Etsy',
        description: 'Páginas para colorir e atividades de desenho estão entre as categorias de imprimíveis mais vendidas no Etsy. Coleções temáticas para festas, animais e estações geram compras recorrentes.',
      },
      {
        persona: 'Editores Amazon KDP',
        description: 'Livros de colorir continuam sendo uma das categorias KDP mais lucrativas com pouca concorrência em temas de nicho. Crie livros específicos de dinossauros ou animais marinhos para Amazon.com.br.',
      },
      {
        persona: 'Vendedores Hotmart',
        description: 'Atividades visuais servem como recompensas, tarefas extras e prática de coordenação motora fina. Educadores valorizam fichas de colorir conectadas aos temas do currículo.',
      },
      {
        persona: 'Educação domiciliar e Pais',
        description: 'Use atividades de colorir e desenho como pausas criativas entre as matérias. Fichas visuais temáticas desenvolvem a coordenação motora fina mantendo as crianças engajadas e focadas.',
      },
    ],
    it: [
      {
        persona: 'Venditori Etsy',
        description: 'Le pagine da colorare e le attività di disegno sono tra le categorie di stampabili più vendute su Etsy. Le collezioni tematiche per festività, animali e stagioni generano acquisti ripetuti.',
      },
      {
        persona: 'Editori Amazon KDP',
        description: 'I libri da colorare restano una delle categorie KDP più redditizie con poca competizione nei temi di nicchia. Create libri mirati su dinosauri o animali marini per Amazon.it.',
      },
      {
        persona: 'Venditori Eduki Italia',
        description: 'Le attività visive servono come premi, compiti extra e pratica di motricità fine. Gli insegnanti apprezzano le schede da colorare collegate ai temi del programma e alle stagioni.',
      },
      {
        persona: 'Istruzione parentale e Genitori',
        description: 'Usate le attività di colorazione e disegno come pause creative tra le materie. Le schede visive tematiche sviluppano la motricità fine mantenendo i bambini concentrati e coinvolti.',
      },
    ],
    sv: [
      {
        persona: 'Etsy-säljare',
        description: 'Målarsidor och ritaktiviteter tillhör de mest sålda utskriftskategorierna på Etsy. Tematiska samlingar för högtider, djur och årstider genererar återköp från nöjda kunder.',
      },
      {
        persona: 'Amazon KDP-utgivare',
        description: 'Målarböcker är fortfarande en av de mest lönsamma KDP-kategorierna med låg konkurrens i nischteman. Skapa riktade målarböcker om dinosaurier eller havsdjur för Amazon.se.',
      },
      {
        persona: 'Eduki Sverige-säljare',
        description: 'Visuella aktiviteter fungerar som belöningar, extrauppgifter och finmotorikträning. Lärare uppskattar målar- och ritarbetsblad kopplade till undervisningsteman och årstider.',
      },
      {
        persona: 'Hemundervisning & Föräldrar',
        description: 'Använd målar- och ritaktiviteter som kreativa pauser mellan skolämnena. Tematiska visuella arbetsblad utvecklar finmotoriken samtidigt som barnen hålls engagerade och fokuserade.',
      },
    ],
    da: [
      {
        persona: 'Etsy-sælgere',
        description: 'Malebøger og tegneaktiviteter hører til de mest solgte printbare kategorier på Etsy. Tematiske samlinger for højtider, dyr og årstider genererer gentagne køb fra tilfredse kunder.',
      },
      {
        persona: 'Amazon KDP-udgivere',
        description: 'Malebøger er fortsat en af de mest profitable KDP-kategorier med lav konkurrence i nichetemaer. Opret målrettede malebøger om dinosaurer eller havdyr til Amazon KDP.',
      },
      {
        persona: 'Eduki Danmark-sælgere',
        description: 'Visuelle aktiviteter fungerer som belønninger, ekstraopgaver og finmotorik-træning. Lærere værdsætter male- og tegneark forbundet med undervisningstemaer og årstider.',
      },
      {
        persona: 'Hjemmeundervisning & Forældre',
        description: 'Brug male- og tegneaktiviteter som kreative pauser mellem fagene. Tematiske visuelle opgaver udvikler finmotorikken og holder små børn engagerede og fokuserede.',
      },
    ],
  },
  matching: {
    en: [
      {
        persona: 'Etsy Sellers',
        description: 'Matching and sorting worksheets appeal to parents of toddlers and preschoolers, a demographic that actively buys educational printables. Themed matching sets create natural product bundles for higher order values.',
      },
      {
        persona: 'Amazon KDP Publishers',
        description: 'Matching activity books for toddlers and preschoolers are an underserved KDP niche with growing demand. Combine matching, sorting, and memory worksheets into comprehensive visual learning workbooks.',
      },
      {
        persona: 'Teachers Pay Teachers Sellers',
        description: 'Matching activities are essential for early childhood classrooms as learning centers and assessment tools. Teachers need themed matching worksheets that progress in difficulty across the school year.',
      },
      {
        persona: 'Homeschool Educators & Parents',
        description: 'Matching and sorting activities build critical thinking skills in young children through hands-on practice. Adjustable difficulty levels let you grow with your child from simple pairs to complex categorization.',
      },
    ],
    nl: [
      {
        persona: 'Etsy-verkopers',
        description: 'Koppel- en sorteerwerkbladen spreken ouders van peuters en kleuters aan — een doelgroep die actief educatieve printables koopt. Thematische koppelsets vormen natuurlijke productbundels voor hogere bestelwaarden.',
      },
      {
        persona: 'Amazon KDP-uitgevers',
        description: 'Koppelactiviteitenboeken voor peuters en kleuters zijn een onderbediende KDP-niche met groeiende vraag. Combineer koppel-, sorteer- en geheugenwerkbladen in uitgebreide werkboeken. Publiceer ook via Bol.com.',
      },
      {
        persona: 'Samen Voor Onderwijs & Eduki-verkopers',
        description: 'Koppelactiviteiten zijn essentieel voor kleutergroepen als leerhoeken en beoordelingstools. Leerkrachten zoeken thematische koppelwerkbladen die in moeilijkheid toenemen gedurende het schooljaar.',
      },
      {
        persona: 'Thuisonderwijs & Ouders',
        description: 'Koppel- en sorteeractiviteiten bouwen kritisch denkvermogen op bij jonge kinderen door praktische oefening. Instelbare moeilijkheidsgraden groeien mee van eenvoudige paren tot complexe categorisering.',
      },
    ],
    de: [
      {
        persona: 'Etsy-Verkäufer',
        description: 'Zuordnungs- und Sortierarbeitsblätter sprechen Eltern von Kleinkindern und Vorschülern an — eine Zielgruppe, die aktiv Lernmaterialien kauft. Thematische Sets schaffen natürliche Produktbundles.',
      },
      {
        persona: 'Amazon KDP-Verleger',
        description: 'Zuordnungs-Aktivitätenbücher für Kleinkinder sind eine unterversorgte KDP-Nische mit wachsender Nachfrage. Kombinieren Sie Zuordnungs-, Sortier- und Gedächtnisübungen in umfassende Arbeitsbücher für Amazon.de.',
      },
      {
        persona: 'Eduki & Lehrermarktplatz-Verkäufer',
        description: 'Zuordnungsaktivitäten sind unverzichtbar für den Kindergarten als Lernstationen und Bewertungstools. Lehrkräfte brauchen thematische Arbeitsblätter mit ansteigendem Schwierigkeitsgrad.',
      },
      {
        persona: 'Homeschooling & Eltern',
        description: 'Zuordnungs- und Sortieraktivitäten fördern kritisches Denken bei jungen Kindern durch praktische Übung. Anpassbare Schwierigkeitsgrade wachsen mit Ihrem Kind von einfachen Paaren bis zur komplexen Kategorisierung.',
      },
    ],
    fr: [
      {
        persona: 'Vendeurs Etsy',
        description: 'Les fiches d\'association et de tri attirent les parents de tout-petits et de maternelles — un public qui achète activement des imprimables éducatifs. Les sets thématiques créent des lots naturels.',
      },
      {
        persona: 'Éditeurs Amazon KDP',
        description: 'Les cahiers d\'association pour tout-petits sont une niche KDP sous-exploitée en croissance. Combinez association, tri et mémoire dans des cahiers d\'apprentissage visuel complets pour Amazon.fr.',
      },
      {
        persona: 'Vendeurs Eduki France',
        description: 'Les activités d\'association sont essentielles en maternelle comme ateliers et outils d\'évaluation. Les enseignants cherchent des fiches thématiques avec une progression de difficulté sur l\'année.',
      },
      {
        persona: 'Instruction en famille & Parents',
        description: 'Les activités d\'association et de tri développent la pensée critique chez les jeunes enfants. Les niveaux de difficulté ajustables accompagnent la progression de votre enfant.',
      },
    ],
    es: [
      {
        persona: 'Vendedores de Etsy',
        description: 'Las fichas de emparejamiento y clasificación atraen a padres de niños pequeños — un público que compra activamente imprimibles educativos. Los sets temáticos crean paquetes naturales de mayor valor.',
      },
      {
        persona: 'Editores de Amazon KDP',
        description: 'Los cuadernos de emparejamiento para niños pequeños son un nicho KDP desatendido con demanda creciente. Combine fichas de emparejamiento, clasificación y memoria en cuadernos completos para Amazon.es.',
      },
      {
        persona: 'Vendedores de Eduki España',
        description: 'Las actividades de emparejamiento son esenciales en educación infantil como rincones de aprendizaje y herramientas de evaluación. Los docentes buscan fichas temáticas con dificultad progresiva.',
      },
      {
        persona: 'Educación en casa y Padres',
        description: 'Las actividades de emparejamiento y clasificación desarrollan el pensamiento crítico en niños pequeños. Los niveles de dificultad ajustables crecen con su hijo desde pares simples hasta categorización compleja.',
      },
    ],
    pt: [
      {
        persona: 'Vendedores Etsy',
        description: 'Fichas de associação e classificação atraem pais de crianças pequenas — um público que compra ativamente imprimíveis educativos. Conjuntos temáticos criam pacotes naturais de maior valor.',
      },
      {
        persona: 'Editores Amazon KDP',
        description: 'Cadernos de associação para crianças pequenas são um nicho KDP pouco explorado com demanda crescente. Combine fichas de associação, classificação e memória em cadernos completos para Amazon.com.br.',
      },
      {
        persona: 'Vendedores Hotmart',
        description: 'Atividades de associação são essenciais na educação infantil como estações de aprendizagem e ferramentas de avaliação. Educadores buscam fichas temáticas com dificuldade progressiva.',
      },
      {
        persona: 'Educação domiciliar e Pais',
        description: 'Atividades de associação e classificação desenvolvem o pensamento crítico em crianças pequenas. Níveis de dificuldade ajustáveis acompanham o crescimento do seu filho.',
      },
    ],
    it: [
      {
        persona: 'Venditori Etsy',
        description: 'Le schede di abbinamento e classificazione attraggono genitori di bambini piccoli — un pubblico che acquista attivamente stampabili educativi. I set tematici creano pacchetti naturali di maggior valore.',
      },
      {
        persona: 'Editori Amazon KDP',
        description: 'I quaderni di abbinamento per bambini piccoli sono una nicchia KDP poco servita con domanda crescente. Combinate abbinamento, classificazione e memoria in quaderni completi per Amazon.it.',
      },
      {
        persona: 'Venditori Eduki Italia',
        description: 'Le attività di abbinamento sono essenziali nella scuola dell\'infanzia come centri di apprendimento e strumenti di valutazione. Gli insegnanti cercano schede tematiche con difficoltà progressiva.',
      },
      {
        persona: 'Istruzione parentale e Genitori',
        description: 'Le attività di abbinamento e classificazione sviluppano il pensiero critico nei bambini piccoli. I livelli di difficoltà regolabili crescono con il vostro bambino.',
      },
    ],
    sv: [
      {
        persona: 'Etsy-säljare',
        description: 'Matchnings- och sorteringsarbetsblad tilltalar föräldrar till småbarn och förskolebarn — en målgrupp som aktivt köper pedagogiska utskrifter. Tematiska set skapar naturliga produktpaket.',
      },
      {
        persona: 'Amazon KDP-utgivare',
        description: 'Matchningsaktivitetsböcker för småbarn är en underutnyttjad KDP-nisch med växande efterfrågan. Kombinera matchning, sortering och minnesövningar i omfattande arbetsböcker för Amazon.se.',
      },
      {
        persona: 'Eduki Sverige-säljare',
        description: 'Matchningsaktiviteter är viktiga i förskolan som lärstationer och bedömningsverktyg. Lärare söker tematiska arbetsblad med ökande svårighetsgrad under läsåret.',
      },
      {
        persona: 'Hemundervisning & Föräldrar',
        description: 'Matchnings- och sorteringsaktiviteter bygger kritiskt tänkande hos små barn. Justerbara svårighetsnivåer växer med ditt barn från enkla par till komplex kategorisering.',
      },
    ],
    da: [
      {
        persona: 'Etsy-sælgere',
        description: 'Matchnings- og sorteringsopgaver appellerer til forældre med småbørn — en målgruppe der aktivt køber pædagogiske printables. Tematiske sæt skaber naturlige produktpakker af højere værdi.',
      },
      {
        persona: 'Amazon KDP-udgivere',
        description: 'Matchningsaktivitetsbøger til småbørn er en underudnyttet KDP-niche med voksende efterspørgsel. Kombiner matchning, sortering og hukommelsesøvelser i omfattende arbejdsbøger.',
      },
      {
        persona: 'Eduki Danmark-sælgere',
        description: 'Matchningsaktiviteter er essentielle i børnehaven som læringsstationer og vurderingsværktøjer. Lærere søger tematiske opgaver med stigende sværhedsgrad gennem skoleåret.',
      },
      {
        persona: 'Hjemmeundervisning & Forældre',
        description: 'Matchnings- og sorteringsaktiviteter opbygger kritisk tænkning hos små børn. Justerbare sværhedsgrader vokser med dit barn fra simple par til kompleks kategorisering.',
      },
    ],
  },
  puzzle: {
    en: [
      {
        persona: 'Etsy Sellers',
        description: 'Puzzle worksheets like sudoku, mazes, and logic challenges attract both parents and teachers. These printables have strong gift-giving potential and work well as themed activity packs for parties and events.',
      },
      {
        persona: 'Amazon KDP Publishers',
        description: 'Puzzle books are a proven KDP category with dedicated buyer audiences. Picture sudoku, maze books, and mixed puzzle collections for children fill a gap between adult puzzle books and basic worksheets.',
      },
      {
        persona: 'Teachers Pay Teachers Sellers',
        description: 'Logic puzzles and brain teasers serve as enrichment activities, early finisher tasks, and substitute plans. TPT teachers search for themed puzzle packs that align with their current classroom units.',
      },
      {
        persona: 'Homeschool Educators & Parents',
        description: 'Puzzles develop logical thinking, spatial reasoning, and problem-solving skills through engaging play. Multiple difficulty levels ensure appropriate challenge as your child develops cognitive abilities.',
      },
    ],
    nl: [
      {
        persona: 'Etsy-verkopers',
        description: 'Puzzelwerkbladen zoals sudoku, doolhoven en logische uitdagingen trekken zowel ouders als leerkrachten aan. Deze printables hebben sterk cadeaupotentieel en werken goed als thematische activiteitenpakketten.',
      },
      {
        persona: 'Amazon KDP-uitgevers',
        description: 'Puzzelboeken zijn een bewezen KDP-categorie met toegewijde kopers. Plaatjessudoku, doolhofboeken en gemengde puzzelcollecties voor kinderen vullen het gat tussen volwassen puzzelboeken en basiswerkbladen.',
      },
      {
        persona: 'Samen Voor Onderwijs & Eduki-verkopers',
        description: 'Logische puzzels en denkspellen dienen als verrijkingsactiviteiten, extra werk voor snelle leerlingen en invalplanning. Leerkrachten zoeken thematische puzzelpakketten passend bij hun lesstof.',
      },
      {
        persona: 'Thuisonderwijs & Ouders',
        description: 'Puzzels ontwikkelen logisch denken, ruimtelijk inzicht en probleemoplossend vermogen door boeiend spel. Meerdere moeilijkheidsgraden zorgen voor passende uitdaging terwijl uw kind zich ontwikkelt.',
      },
    ],
    de: [
      {
        persona: 'Etsy-Verkäufer',
        description: 'Rätsel-Arbeitsblätter wie Sudoku, Labyrinthe und Logikaufgaben ziehen Eltern und Lehrkräfte an. Diese Druckvorlagen haben starkes Geschenkpotenzial und eignen sich als thematische Aktivitätenpakete.',
      },
      {
        persona: 'Amazon KDP-Verleger',
        description: 'Rätselbücher sind eine bewährte KDP-Kategorie mit treuen Käufern. Bilder-Sudoku, Labyrinthe und gemischte Rätselsammlungen füllen die Lücke zwischen Erwachsenen-Rätselbüchern und einfachen Arbeitsblättern auf Amazon.de.',
      },
      {
        persona: 'Eduki & Lehrermarktplatz-Verkäufer',
        description: 'Logikrätsel und Denksportaufgaben dienen als Bereicherungsaktivitäten, Zusatzaufgaben und Vertretungspläne. Lehrkräfte suchen thematische Rätselpakete passend zu ihren Unterrichtseinheiten.',
      },
      {
        persona: 'Homeschooling & Eltern',
        description: 'Rätsel fördern logisches Denken, räumliches Vorstellungsvermögen und Problemlösungsfähigkeiten durch ansprechendes Spielen. Mehrere Schwierigkeitsgrade bieten passende Herausforderungen.',
      },
    ],
    fr: [
      {
        persona: 'Vendeurs Etsy',
        description: 'Les puzzles comme les sudoku, labyrinthes et défis logiques attirent parents et enseignants. Ces imprimables ont un fort potentiel cadeau et fonctionnent bien en packs d\'activités thématiques.',
      },
      {
        persona: 'Éditeurs Amazon KDP',
        description: 'Les cahiers de puzzles sont une catégorie KDP éprouvée avec un public fidèle. Les sudoku illustrés et collections de puzzles pour enfants comblent le fossé entre les puzzles adultes et les fiches basiques sur Amazon.fr.',
      },
      {
        persona: 'Vendeurs Eduki France',
        description: 'Les puzzles logiques servent d\'activités d\'enrichissement, de travail supplémentaire et de plans de remplacement. Les enseignants cherchent des packs de puzzles thématiques liés à leurs séquences.',
      },
      {
        persona: 'Instruction en famille & Parents',
        description: 'Les puzzles développent la pensée logique, le raisonnement spatial et la résolution de problèmes par le jeu. Plusieurs niveaux de difficulté assurent un défi adapté à la progression de votre enfant.',
      },
    ],
    es: [
      {
        persona: 'Vendedores de Etsy',
        description: 'Los puzzles como sudoku, laberintos y desafíos lógicos atraen tanto a padres como a docentes. Estos imprimibles tienen gran potencial como regalo y funcionan bien como packs temáticos de actividades.',
      },
      {
        persona: 'Editores de Amazon KDP',
        description: 'Los cuadernos de puzzles son una categoría KDP probada con audiencia fiel. Los sudoku ilustrados y colecciones de puzzles para niños llenan el hueco entre puzzles adultos y fichas básicas en Amazon.es.',
      },
      {
        persona: 'Vendedores de Eduki España',
        description: 'Los puzzles lógicos sirven como actividades de enriquecimiento, tareas para alumnos rápidos y planes de sustitución. Los docentes buscan packs de puzzles temáticos alineados con sus unidades.',
      },
      {
        persona: 'Educación en casa y Padres',
        description: 'Los puzzles desarrollan el pensamiento lógico, el razonamiento espacial y la resolución de problemas a través del juego. Múltiples niveles de dificultad aseguran un desafío apropiado.',
      },
    ],
    pt: [
      {
        persona: 'Vendedores Etsy',
        description: 'Puzzles como sudoku, labirintos e desafios lógicos atraem tanto pais quanto educadores. Estes imprimíveis têm forte potencial de presente e funcionam bem como pacotes temáticos de atividades.',
      },
      {
        persona: 'Editores Amazon KDP',
        description: 'Livros de puzzles são uma categoria KDP comprovada com público fiel. Sudoku ilustrados e coleções mistas de puzzles para crianças preenchem a lacuna entre puzzles adultos e fichas básicas na Amazon.com.br.',
      },
      {
        persona: 'Vendedores Hotmart',
        description: 'Puzzles lógicos servem como atividades de enriquecimento, tarefas extras e planos de substituição. Educadores buscam pacotes de puzzles temáticos alinhados às unidades do currículo.',
      },
      {
        persona: 'Educação domiciliar e Pais',
        description: 'Puzzles desenvolvem pensamento lógico, raciocínio espacial e resolução de problemas através do jogo. Múltiplos níveis de dificuldade garantem desafios apropriados ao desenvolvimento.',
      },
    ],
    it: [
      {
        persona: 'Venditori Etsy',
        description: 'I puzzle come sudoku, labirinti e sfide logiche attraggono sia genitori che insegnanti. Questi stampabili hanno forte potenziale regalo e funzionano bene come pacchetti di attività tematiche.',
      },
      {
        persona: 'Editori Amazon KDP',
        description: 'I libri di puzzle sono una categoria KDP collaudata con un pubblico fedele. Sudoku illustrati e collezioni miste di puzzle per bambini colmano il divario tra puzzle per adulti e schede base su Amazon.it.',
      },
      {
        persona: 'Venditori Eduki Italia',
        description: 'I puzzle logici servono come attività di arricchimento, compiti extra e piani sostitutivi. Gli insegnanti cercano pacchetti di puzzle tematici allineati alle unità didattiche.',
      },
      {
        persona: 'Istruzione parentale e Genitori',
        description: 'I puzzle sviluppano pensiero logico, ragionamento spaziale e capacità di problem solving attraverso il gioco. Più livelli di difficoltà garantiscono sfide adeguate alla crescita del bambino.',
      },
    ],
    sv: [
      {
        persona: 'Etsy-säljare',
        description: 'Pusselarbetsblad som sudoku, labyrinter och logikutmaningar attraherar både föräldrar och lärare. Dessa utskrifter har stark presentpotential och fungerar bra som tematiska aktivitetspaket.',
      },
      {
        persona: 'Amazon KDP-utgivare',
        description: 'Pusselböcker är en beprövad KDP-kategori med trogna köpare. Bildsudoku, labyrintböcker och blandade pusselsamlingar fyller gapet mellan vuxenpussel och grundläggande arbetsblad på Amazon.se.',
      },
      {
        persona: 'Eduki Sverige-säljare',
        description: 'Logikpussel fungerar som berikningsaktiviteter, extrauppgifter och vikarieplaneringar. Lärare söker tematiska pusselpaket som passar deras pågående undervisningsenheter.',
      },
      {
        persona: 'Hemundervisning & Föräldrar',
        description: 'Pussel utvecklar logiskt tänkande, rumsligt resonemang och problemlösningsförmåga genom engagerande lek. Flera svårighetsnivåer säkerställer lagom utmaning.',
      },
    ],
    da: [
      {
        persona: 'Etsy-sælgere',
        description: 'Puslespilsopgaver som sudoku, labyrinter og logiske udfordringer tiltrækker både forældre og lærere. Disse printables har stærkt gavepotentiale og fungerer godt som tematiske aktivitetspakker.',
      },
      {
        persona: 'Amazon KDP-udgivere',
        description: 'Puslespilsbøger er en bevist KDP-kategori med trofaste købere. Billedsudoku, labyrintbøger og blandede puslespilssamlinger udfylder hullet mellem voksenpuslespil og grundlæggende opgaver.',
      },
      {
        persona: 'Eduki Danmark-sælgere',
        description: 'Logiske puslespil fungerer som berigelsesaktiviteter, ekstraopgaver og vikarplaner. Lærere søger tematiske puslespilspakker der passer til deres aktuelle undervisningsenheder.',
      },
      {
        persona: 'Hjemmeundervisning & Forældre',
        description: 'Puslespil udvikler logisk tænkning, rumlig forståelse og problemløsningsevner gennem engagerende leg. Flere sværhedsgrader sikrer passende udfordringer.',
      },
    ],
  },
  search: {
    en: [
      {
        persona: 'Etsy Sellers',
        description: 'Search-and-find worksheets are perennial best-sellers, especially hidden object pages and themed scavenger hunts. These printables generate strong reviews because children genuinely enjoy completing them.',
      },
      {
        persona: 'Amazon KDP Publishers',
        description: 'Hidden object and search activity books have dedicated fan bases on Amazon. Themed search books for specific interests create targeted products that rank well in niche education subcategories.',
      },
      {
        persona: 'Teachers Pay Teachers Sellers',
        description: 'Search activities work as vocabulary reinforcement, observation skill builders, and quiet independent work. Teachers value find-and-count and hidden object worksheets tied to seasonal and thematic units.',
      },
      {
        persona: 'Homeschool Educators & Parents',
        description: 'Search-and-find activities sharpen observation skills, build vocabulary, and provide screen-free entertainment. Themed treasure hunts and hidden object worksheets turn learning into an exciting game for children.',
      },
    ],
    nl: [
      {
        persona: 'Etsy-verkopers',
        description: 'Zoek-en-vind werkbladen zijn altijdgroene bestsellers, vooral verborgen voorwerpen en thematische speurtochten. Deze printables genereren sterke beoordelingen omdat kinderen ze oprecht leuk vinden.',
      },
      {
        persona: 'Amazon KDP-uitgevers',
        description: 'Verborgen voorwerpen en zoekactiviteitenboeken hebben trouwe fans op Amazon. Thematische zoekboeken voor specifieke interesses creëren gerichte producten. Publiceer ook via Brave New Books op Bol.com.',
      },
      {
        persona: 'Samen Voor Onderwijs & Eduki-verkopers',
        description: 'Zoekactiviteiten werken als woordenschatversterking, observatietraining en stil zelfstandig werk. Leerkrachten waarderen zoek-en-tel en verborgen voorwerpen werkbladen bij seizoensgebonden thema\'s.',
      },
      {
        persona: 'Thuisonderwijs & Ouders',
        description: 'Zoek-en-vind activiteiten scherpen observatievaardigheden, bouwen woordenschat op en bieden schermvrij vermaak. Thematische speurtochten en verborgen voorwerpen veranderen leren in een spannend spel.',
      },
    ],
    de: [
      {
        persona: 'Etsy-Verkäufer',
        description: 'Such-und-Find-Arbeitsblätter sind Dauerbrenner, besonders versteckte Objekte und thematische Schnitzeljagden. Diese Druckvorlagen erzeugen starke Bewertungen, weil Kinder sie wirklich gern machen.',
      },
      {
        persona: 'Amazon KDP-Verleger',
        description: 'Versteckte-Objekte- und Suchaktivitätenbücher haben treue Fans auf Amazon.de. Thematische Suchbücher für spezifische Interessen schaffen gezielte Produkte in Nischen-Bildungskategorien.',
      },
      {
        persona: 'Eduki & Lehrermarktplatz-Verkäufer',
        description: 'Suchaktivitäten stärken den Wortschatz, trainieren Beobachtungsfähigkeiten und eignen sich als stille Einzelarbeit. Lehrkräfte schätzen Such-und-Zähl-Blätter zu saisonalen und thematischen Einheiten.',
      },
      {
        persona: 'Homeschooling & Eltern',
        description: 'Such-und-Find-Aktivitäten schärfen Beobachtungsfähigkeiten, bauen Wortschatz auf und bieten bildschirmfreie Unterhaltung. Thematische Schnitzeljagden verwandeln Lernen in ein spannendes Spiel.',
      },
    ],
    fr: [
      {
        persona: 'Vendeurs Etsy',
        description: 'Les fiches de cherche-et-trouve sont des best-sellers permanents, surtout les objets cachés et chasses au trésor thématiques. Ces imprimables génèrent d\'excellents avis car les enfants adorent les compléter.',
      },
      {
        persona: 'Éditeurs Amazon KDP',
        description: 'Les cahiers d\'objets cachés et d\'activités de recherche ont des fans fidèles sur Amazon.fr. Les cahiers thématiques créent des produits ciblés qui se classent bien dans les sous-catégories éducatives.',
      },
      {
        persona: 'Vendeurs Eduki France',
        description: 'Les activités de recherche renforcent le vocabulaire, entraînent l\'observation et servent de travail autonome silencieux. Les enseignants apprécient les fiches liées aux thèmes saisonniers.',
      },
      {
        persona: 'Instruction en famille & Parents',
        description: 'Les activités de cherche-et-trouve aiguisent l\'observation, enrichissent le vocabulaire et offrent un divertissement sans écran. Les chasses au trésor thématiques transforment l\'apprentissage en jeu.',
      },
    ],
    es: [
      {
        persona: 'Vendedores de Etsy',
        description: 'Las fichas de busca-y-encuentra son best-sellers permanentes, especialmente objetos ocultos y búsquedas del tesoro temáticas. Estos imprimibles generan excelentes reseñas porque los niños disfrutan completándolos.',
      },
      {
        persona: 'Editores de Amazon KDP',
        description: 'Los cuadernos de objetos ocultos y actividades de búsqueda tienen seguidores fieles en Amazon.es. Los libros temáticos crean productos específicos que se posicionan bien en subcategorías educativas.',
      },
      {
        persona: 'Vendedores de Eduki España',
        description: 'Las actividades de búsqueda refuerzan el vocabulario, entrenan la observación y sirven como trabajo independiente silencioso. Los docentes valoran fichas vinculadas a temas estacionales.',
      },
      {
        persona: 'Educación en casa y Padres',
        description: 'Las actividades de busca-y-encuentra agudizan la observación, amplían el vocabulario y ofrecen entretenimiento sin pantallas. Las búsquedas del tesoro temáticas convierten el aprendizaje en juego.',
      },
    ],
    pt: [
      {
        persona: 'Vendedores Etsy',
        description: 'Fichas de procure-e-encontre são best-sellers permanentes, especialmente objetos escondidos e caças ao tesouro temáticas. Estes imprimíveis geram ótimas avaliações porque as crianças adoram completá-los.',
      },
      {
        persona: 'Editores Amazon KDP',
        description: 'Livros de objetos escondidos e atividades de busca têm fãs fiéis na Amazon.com.br. Livros temáticos criam produtos direcionados que se posicionam bem nas subcategorias educacionais.',
      },
      {
        persona: 'Vendedores Hotmart',
        description: 'Atividades de busca reforçam vocabulário, treinam observação e servem como trabalho independente silencioso. Educadores valorizam fichas vinculadas a temas sazonais e temáticos.',
      },
      {
        persona: 'Educação domiciliar e Pais',
        description: 'Atividades de procure-e-encontre aguçam a observação, ampliam o vocabulário e oferecem entretenimento sem telas. Caças ao tesouro temáticas transformam o aprendizado em jogo empolgante.',
      },
    ],
    it: [
      {
        persona: 'Venditori Etsy',
        description: 'Le schede cerca-e-trova sono bestseller perenni, soprattutto gli oggetti nascosti e le cacce al tesoro tematiche. Questi stampabili generano ottime recensioni perché i bambini adorano completarli.',
      },
      {
        persona: 'Editori Amazon KDP',
        description: 'I libri di oggetti nascosti e attività di ricerca hanno fan fedeli su Amazon.it. I libri tematici creano prodotti mirati che si posizionano bene nelle sottocategorie educative.',
      },
      {
        persona: 'Venditori Eduki Italia',
        description: 'Le attività di ricerca rafforzano il vocabolario, allenano l\'osservazione e fungono da lavoro autonomo silenzioso. Gli insegnanti apprezzano le schede legate a temi stagionali.',
      },
      {
        persona: 'Istruzione parentale e Genitori',
        description: 'Le attività cerca-e-trova affinano l\'osservazione, arricchiscono il vocabolario e offrono intrattenimento senza schermi. Le cacce al tesoro tematiche trasformano l\'apprendimento in gioco.',
      },
    ],
    sv: [
      {
        persona: 'Etsy-säljare',
        description: 'Sök-och-hitta-arbetsblad är ständiga bästsäljare, särskilt gömda objekt och tematiska skattjakter. Dessa utskrifter genererar starka recensioner eftersom barn genuint gillar att göra dem.',
      },
      {
        persona: 'Amazon KDP-utgivare',
        description: 'Gömda-objekt- och sökaktivitetsböcker har trogna fans på Amazon.se. Tematiska sökböcker för specifika intressen skapar riktade produkter i nischade utbildningskategorier.',
      },
      {
        persona: 'Eduki Sverige-säljare',
        description: 'Sökaktiviteter stärker ordförrådet, tränar observation och fungerar som tyst självständigt arbete. Lärare uppskattar leta-och-räkna-blad kopplade till säsongsbetonade teman.',
      },
      {
        persona: 'Hemundervisning & Föräldrar',
        description: 'Sök-och-hitta-aktiviteter skärper observation, bygger ordförråd och ger skärmfri underhållning. Tematiska skattjakter förvandlar lärande till ett spännande spel för barn.',
      },
    ],
    da: [
      {
        persona: 'Etsy-sælgere',
        description: 'Søg-og-find-opgaver er evergreen bestsellere, især skjulte genstande og tematiske skattejagter. Disse printables genererer stærke anmeldelser fordi børn virkelig nyder at lave dem.',
      },
      {
        persona: 'Amazon KDP-udgivere',
        description: 'Skjulte-genstande- og søgeaktivitetsbøger har trofaste fans på Amazon. Tematiske søgebøger til specifikke interesser skaber målrettede produkter i niche-uddannelseskategorier.',
      },
      {
        persona: 'Eduki Danmark-sælgere',
        description: 'Søgeaktiviteter styrker ordforrådet, træner observation og fungerer som stille selvstændigt arbejde. Lærere værdsætter find-og-tæl-opgaver forbundet med sæsonbetonede temaer.',
      },
      {
        persona: 'Hjemmeundervisning & Forældre',
        description: 'Søg-og-find-aktiviteter skærper observation, opbygger ordforråd og giver skærmfri underholdning. Tematiske skattejagter forvandler læring til et spændende spil for børn.',
      },
    ],
  },
};
