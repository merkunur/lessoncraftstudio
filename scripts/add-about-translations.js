/**
 * Add About page translations to all 11 locale files
 * Adds: footer.support.about key + about namespace
 */
const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'frontend', 'messages');

const translations = {
  en: {
    footerAbout: "About Us",
    about: {
      metaTitle: "About LessonCraftStudio | Educational Worksheet Generators",
      metaDescription: "Learn about LessonCraftStudio \u2014 33 professional worksheet generators in 11 languages with 3,000+ themed images for teachers, parents, and therapists.",
      hero: {
        title: "About LessonCraftStudio",
        subtitle: "Empowering educators worldwide with professional worksheet generators"
      },
      stats: {
        generators: "33",
        generatorsLabel: "Worksheet Generators",
        languages: "11",
        languagesLabel: "Languages",
        images: "3,000+",
        imagesLabel: "Themed Images",
        themes: "100+",
        themesLabel: "Themes"
      },
      mission: {
        title: "Our Mission",
        description: "We believe every child deserves access to high-quality educational materials. LessonCraftStudio was built to help teachers, parents, and therapists create professional worksheets instantly \u2014 without design skills, expensive software, or hours of preparation.",
        description2: "Our generators combine research-backed pedagogy with beautiful design, making it easy to produce print-ready materials that engage young learners from preschool through 3rd grade."
      },
      methodology: {
        title: "Our Approach",
        instant: {
          title: "Instant Generation",
          description: "Select a theme, customize settings, and generate a print-ready worksheet in seconds. No design skills required."
        },
        research: {
          title: "Research-Backed",
          description: "Every generator is built on proven educational methods for early childhood development, covering math, literacy, motor skills, and cognitive development."
        },
        inclusive: {
          title: "Multilingual & Inclusive",
          description: "All 33 generators work seamlessly in 11 languages, with culturally appropriate content and a library of 3,000+ hand-curated images."
        }
      },
      audience: {
        title: "Who We Serve",
        teachers: {
          title: "Teachers",
          description: "Create differentiated worksheets for your classroom in seconds. Support diverse learners with materials in their home language."
        },
        parents: {
          title: "Parents",
          description: "Give your child engaging practice at home with professional-quality worksheets tailored to their interests and skill level."
        },
        therapists: {
          title: "Therapists & Special Educators",
          description: "Generate targeted materials for speech therapy, occupational therapy, and special education \u2014 customized to each student\u2019s needs."
        }
      },
      cta: {
        title: "Ready to Create?",
        subtitle: "Start creating professional worksheets in seconds \u2014 free to try.",
        button: "Explore Generators"
      }
    }
  },
  de: {
    footerAbout: "\u00dcber uns",
    about: {
      metaTitle: "\u00dcber LessonCraftStudio | P\u00e4dagogische Arbeitsblatt-Generatoren",
      metaDescription: "Erfahren Sie mehr \u00fcber LessonCraftStudio \u2014 33 professionelle Arbeitsblatt-Generatoren in 11 Sprachen mit \u00fcber 3.000 thematischen Bildern f\u00fcr Lehrer, Eltern und Therapeuten.",
      hero: {
        title: "\u00dcber LessonCraftStudio",
        subtitle: "Wir unterst\u00fctzen P\u00e4dagogen weltweit mit professionellen Arbeitsblatt-Generatoren"
      },
      stats: {
        generators: "33",
        generatorsLabel: "Arbeitsblatt-Generatoren",
        languages: "11",
        languagesLabel: "Sprachen",
        images: "3.000+",
        imagesLabel: "Thematische Bilder",
        themes: "100+",
        themesLabel: "Themen"
      },
      mission: {
        title: "Unsere Mission",
        description: "Wir glauben, dass jedes Kind Zugang zu hochwertigen Lernmaterialien verdient. LessonCraftStudio wurde entwickelt, um Lehrern, Eltern und Therapeuten zu helfen, professionelle Arbeitsbl\u00e4tter sofort zu erstellen \u2014 ohne Designkenntnisse, teure Software oder stundenlange Vorbereitung.",
        description2: "Unsere Generatoren verbinden forschungsbasierte P\u00e4dagogik mit ansprechendem Design und machen es einfach, druckfertige Materialien zu erstellen, die junge Lernende von der Vorschule bis zur 3. Klasse begeistern."
      },
      methodology: {
        title: "Unser Ansatz",
        instant: {
          title: "Sofortige Erstellung",
          description: "W\u00e4hlen Sie ein Thema, passen Sie die Einstellungen an und erstellen Sie in Sekunden ein druckfertiges Arbeitsblatt. Keine Designkenntnisse erforderlich."
        },
        research: {
          title: "Forschungsbasiert",
          description: "Jeder Generator basiert auf bew\u00e4hrten p\u00e4dagogischen Methoden f\u00fcr die fr\u00fchkindliche Entwicklung \u2014 Mathematik, Lesen, Motorik und kognitive F\u00e4higkeiten."
        },
        inclusive: {
          title: "Mehrsprachig & Inklusiv",
          description: "Alle 33 Generatoren funktionieren nahtlos in 11 Sprachen, mit kulturell angemessenen Inhalten und einer Bibliothek von \u00fcber 3.000 handverlesenen Bildern."
        }
      },
      audience: {
        title: "F\u00fcr wen wir da sind",
        teachers: {
          title: "Lehrkr\u00e4fte",
          description: "Erstellen Sie in Sekunden differenzierte Arbeitsbl\u00e4tter f\u00fcr Ihren Unterricht. Unterst\u00fctzen Sie vielf\u00e4ltige Lernende mit Materialien in ihrer Muttersprache."
        },
        parents: {
          title: "Eltern",
          description: "Bieten Sie Ihrem Kind ansprechende \u00dcbungen zu Hause mit professionellen Arbeitsbl\u00e4ttern, die auf seine Interessen und sein Niveau zugeschnitten sind."
        },
        therapists: {
          title: "Therapeuten & Sonderp\u00e4dagogen",
          description: "Erstellen Sie gezieltes Material f\u00fcr Sprachtherapie, Ergotherapie und Sonderp\u00e4dagogik \u2014 individuell auf jeden Sch\u00fcler abgestimmt."
        }
      },
      cta: {
        title: "Bereit loszulegen?",
        subtitle: "Erstellen Sie in Sekunden professionelle Arbeitsbl\u00e4tter \u2014 kostenlos testen.",
        button: "Generatoren entdecken"
      }
    }
  },
  fr: {
    footerAbout: "\u00c0 propos",
    about: {
      metaTitle: "\u00c0 propos de LessonCraftStudio | G\u00e9n\u00e9rateurs de Fiches P\u00e9dagogiques",
      metaDescription: "D\u00e9couvrez LessonCraftStudio \u2014 33 g\u00e9n\u00e9rateurs de fiches professionnels en 11 langues avec plus de 3 000 images th\u00e9matiques pour enseignants, parents et th\u00e9rapeutes.",
      hero: {
        title: "\u00c0 propos de LessonCraftStudio",
        subtitle: "Accompagner les \u00e9ducateurs du monde entier avec des g\u00e9n\u00e9rateurs de fiches professionnels"
      },
      stats: {
        generators: "33",
        generatorsLabel: "G\u00e9n\u00e9rateurs de fiches",
        languages: "11",
        languagesLabel: "Langues",
        images: "3 000+",
        imagesLabel: "Images th\u00e9matiques",
        themes: "100+",
        themesLabel: "Th\u00e8mes"
      },
      mission: {
        title: "Notre mission",
        description: "Nous croyons que chaque enfant m\u00e9rite d\u2019acc\u00e9der \u00e0 des supports p\u00e9dagogiques de qualit\u00e9. LessonCraftStudio a \u00e9t\u00e9 cr\u00e9\u00e9 pour aider les enseignants, les parents et les th\u00e9rapeutes \u00e0 produire des fiches professionnelles en un instant \u2014 sans comp\u00e9tences en design, logiciel co\u00fbteux ni heures de pr\u00e9paration.",
        description2: "Nos g\u00e9n\u00e9rateurs allient p\u00e9dagogie fond\u00e9e sur la recherche et design soign\u00e9, facilitant la cr\u00e9ation de supports pr\u00eats \u00e0 imprimer qui captent l\u2019attention des jeunes apprenants, de la maternelle au CE2."
      },
      methodology: {
        title: "Notre approche",
        instant: {
          title: "G\u00e9n\u00e9ration instantan\u00e9e",
          description: "Choisissez un th\u00e8me, personnalisez les param\u00e8tres et g\u00e9n\u00e9rez une fiche pr\u00eate \u00e0 imprimer en quelques secondes. Aucune comp\u00e9tence en design requise."
        },
        research: {
          title: "Fond\u00e9 sur la recherche",
          description: "Chaque g\u00e9n\u00e9rateur repose sur des m\u00e9thodes p\u00e9dagogiques \u00e9prouv\u00e9es pour le d\u00e9veloppement de la petite enfance \u2014 math\u00e9matiques, lecture, motricit\u00e9 et d\u00e9veloppement cognitif."
        },
        inclusive: {
          title: "Multilingue & Inclusif",
          description: "Les 33 g\u00e9n\u00e9rateurs fonctionnent parfaitement en 11 langues, avec un contenu culturellement adapt\u00e9 et une biblioth\u00e8que de plus de 3 000 images s\u00e9lectionn\u00e9es."
        }
      },
      audience: {
        title: "Pour qui ?",
        teachers: {
          title: "Enseignants",
          description: "Cr\u00e9ez des fiches diff\u00e9renci\u00e9es pour votre classe en quelques secondes. Accompagnez chaque \u00e9l\u00e8ve avec des supports dans sa langue maternelle."
        },
        parents: {
          title: "Parents",
          description: "Offrez \u00e0 votre enfant des exercices attrayants \u00e0 la maison avec des fiches de qualit\u00e9 professionnelle adapt\u00e9es \u00e0 ses int\u00e9r\u00eats et son niveau."
        },
        therapists: {
          title: "Th\u00e9rapeutes & \u00c9ducateurs sp\u00e9cialis\u00e9s",
          description: "G\u00e9n\u00e9rez des supports cibl\u00e9s pour l\u2019orthophonie, l\u2019ergoth\u00e9rapie et l\u2019\u00e9ducation sp\u00e9cialis\u00e9e \u2014 personnalis\u00e9s pour chaque \u00e9l\u00e8ve."
        }
      },
      cta: {
        title: "Pr\u00eat \u00e0 cr\u00e9er ?",
        subtitle: "Commencez \u00e0 cr\u00e9er des fiches professionnelles en quelques secondes \u2014 essai gratuit.",
        button: "D\u00e9couvrir les g\u00e9n\u00e9rateurs"
      }
    }
  },
  es: {
    footerAbout: "Sobre nosotros",
    about: {
      metaTitle: "Sobre LessonCraftStudio | Generadores de Fichas Educativas",
      metaDescription: "Conozca LessonCraftStudio \u2014 33 generadores de fichas profesionales en 11 idiomas con m\u00e1s de 3.000 im\u00e1genes tem\u00e1ticas para maestros, padres y terapeutas.",
      hero: {
        title: "Sobre LessonCraftStudio",
        subtitle: "Apoyando a educadores en todo el mundo con generadores de fichas profesionales"
      },
      stats: {
        generators: "33",
        generatorsLabel: "Generadores de fichas",
        languages: "11",
        languagesLabel: "Idiomas",
        images: "3.000+",
        imagesLabel: "Im\u00e1genes tem\u00e1ticas",
        themes: "100+",
        themesLabel: "Temas"
      },
      mission: {
        title: "Nuestra misi\u00f3n",
        description: "Creemos que cada ni\u00f1o merece acceso a materiales educativos de alta calidad. LessonCraftStudio fue creado para ayudar a maestros, padres y terapeutas a generar fichas profesionales al instante \u2014 sin habilidades de dise\u00f1o, software costoso ni horas de preparaci\u00f3n.",
        description2: "Nuestros generadores combinan pedagog\u00eda basada en investigaci\u00f3n con un dise\u00f1o atractivo, facilitando la creaci\u00f3n de materiales listos para imprimir que motivan a los peque\u00f1os estudiantes desde preescolar hasta tercer grado."
      },
      methodology: {
        title: "Nuestro enfoque",
        instant: {
          title: "Generaci\u00f3n instant\u00e1nea",
          description: "Seleccione un tema, personalice los ajustes y genere una ficha lista para imprimir en segundos. No se requieren habilidades de dise\u00f1o."
        },
        research: {
          title: "Basado en investigaci\u00f3n",
          description: "Cada generador se basa en m\u00e9todos educativos comprobados para el desarrollo infantil temprano \u2014 matem\u00e1ticas, lectura, motricidad y desarrollo cognitivo."
        },
        inclusive: {
          title: "Multiling\u00fce e inclusivo",
          description: "Los 33 generadores funcionan perfectamente en 11 idiomas, con contenido culturalmente apropiado y una biblioteca de m\u00e1s de 3.000 im\u00e1genes seleccionadas."
        }
      },
      audience: {
        title: "\u00bfA qui\u00e9n servimos?",
        teachers: {
          title: "Maestros",
          description: "Cree fichas diferenciadas para su aula en segundos. Apoye a estudiantes diversos con materiales en su idioma materno."
        },
        parents: {
          title: "Padres",
          description: "Ofrezca a su hijo pr\u00e1cticas atractivas en casa con fichas de calidad profesional adaptadas a sus intereses y nivel."
        },
        therapists: {
          title: "Terapeutas y educadores especiales",
          description: "Genere materiales dirigidos para terapia del habla, terapia ocupacional y educaci\u00f3n especial \u2014 personalizados para cada estudiante."
        }
      },
      cta: {
        title: "\u00bfListo para crear?",
        subtitle: "Comience a crear fichas profesionales en segundos \u2014 prueba gratuita.",
        button: "Explorar generadores"
      }
    }
  },
  pt: {
    footerAbout: "Sobre n\u00f3s",
    about: {
      metaTitle: "Sobre o LessonCraftStudio | Geradores de Atividades Educativas",
      metaDescription: "Conhe\u00e7a o LessonCraftStudio \u2014 33 geradores de atividades profissionais em 11 idiomas com mais de 3.000 imagens tem\u00e1ticas para professores, pais e terapeutas.",
      hero: {
        title: "Sobre o LessonCraftStudio",
        subtitle: "Capacitando educadores em todo o mundo com geradores de atividades profissionais"
      },
      stats: {
        generators: "33",
        generatorsLabel: "Geradores de atividades",
        languages: "11",
        languagesLabel: "Idiomas",
        images: "3.000+",
        imagesLabel: "Imagens tem\u00e1ticas",
        themes: "100+",
        themesLabel: "Temas"
      },
      mission: {
        title: "Nossa miss\u00e3o",
        description: "Acreditamos que toda crian\u00e7a merece acesso a materiais educacionais de alta qualidade. O LessonCraftStudio foi criado para ajudar professores, pais e terapeutas a gerar atividades profissionais instantaneamente \u2014 sem habilidades de design, software caro ou horas de prepara\u00e7\u00e3o.",
        description2: "Nossos geradores combinam pedagogia baseada em pesquisa com design atraente, facilitando a cria\u00e7\u00e3o de materiais prontos para imprimir que engajam jovens aprendizes da pr\u00e9-escola ao 3\u00ba ano."
      },
      methodology: {
        title: "Nossa abordagem",
        instant: {
          title: "Gera\u00e7\u00e3o instant\u00e2nea",
          description: "Escolha um tema, personalize as configura\u00e7\u00f5es e gere uma atividade pronta para imprimir em segundos. Nenhuma habilidade de design necess\u00e1ria."
        },
        research: {
          title: "Baseado em pesquisa",
          description: "Cada gerador \u00e9 constru\u00eddo com m\u00e9todos educacionais comprovados para o desenvolvimento infantil \u2014 matem\u00e1tica, leitura, habilidades motoras e desenvolvimento cognitivo."
        },
        inclusive: {
          title: "Multilingual e inclusivo",
          description: "Todos os 33 geradores funcionam perfeitamente em 11 idiomas, com conte\u00fado culturalmente apropriado e uma biblioteca de mais de 3.000 imagens selecionadas."
        }
      },
      audience: {
        title: "Para quem servimos",
        teachers: {
          title: "Professores",
          description: "Crie atividades diferenciadas para sua sala de aula em segundos. Apoie alunos diversos com materiais em seu idioma nativo."
        },
        parents: {
          title: "Pais",
          description: "Ofere\u00e7a ao seu filho pr\u00e1ticas envolventes em casa com atividades de qualidade profissional adaptadas aos seus interesses e n\u00edvel."
        },
        therapists: {
          title: "Terapeutas e educadores especiais",
          description: "Gere materiais direcionados para fonoaudiologia, terapia ocupacional e educa\u00e7\u00e3o especial \u2014 personalizados para cada aluno."
        }
      },
      cta: {
        title: "Pronto para criar?",
        subtitle: "Comece a criar atividades profissionais em segundos \u2014 teste gratuito.",
        button: "Explorar geradores"
      }
    }
  },
  it: {
    footerAbout: "Chi siamo",
    about: {
      metaTitle: "Chi siamo | LessonCraftStudio \u2014 Generatori di Schede Didattiche",
      metaDescription: "Scopri LessonCraftStudio \u2014 33 generatori di schede professionali in 11 lingue con oltre 3.000 immagini tematiche per insegnanti, genitori e terapisti.",
      hero: {
        title: "Chi siamo",
        subtitle: "Supportiamo gli educatori di tutto il mondo con generatori di schede professionali"
      },
      stats: {
        generators: "33",
        generatorsLabel: "Generatori di schede",
        languages: "11",
        languagesLabel: "Lingue",
        images: "3.000+",
        imagesLabel: "Immagini tematiche",
        themes: "100+",
        themesLabel: "Temi"
      },
      mission: {
        title: "La nostra missione",
        description: "Crediamo che ogni bambino meriti l\u2019accesso a materiali didattici di alta qualit\u00e0. LessonCraftStudio \u00e8 stato creato per aiutare insegnanti, genitori e terapisti a generare schede professionali in un istante \u2014 senza competenze di design, software costoso o ore di preparazione.",
        description2: "I nostri generatori combinano pedagogia basata sulla ricerca con un design accattivante, rendendo facile la creazione di materiali pronti da stampare che coinvolgono i giovani studenti dalla scuola materna alla terza elementare."
      },
      methodology: {
        title: "Il nostro approccio",
        instant: {
          title: "Generazione istantanea",
          description: "Scegli un tema, personalizza le impostazioni e genera una scheda pronta da stampare in pochi secondi. Nessuna competenza di design richiesta."
        },
        research: {
          title: "Basato sulla ricerca",
          description: "Ogni generatore si basa su metodi educativi comprovati per lo sviluppo della prima infanzia \u2014 matematica, lettura, abilit\u00e0 motorie e sviluppo cognitivo."
        },
        inclusive: {
          title: "Multilingue e inclusivo",
          description: "Tutti i 33 generatori funzionano perfettamente in 11 lingue, con contenuti culturalmente appropriati e una libreria di oltre 3.000 immagini selezionate."
        }
      },
      audience: {
        title: "Chi serviamo",
        teachers: {
          title: "Insegnanti",
          description: "Crea schede differenziate per la tua classe in pochi secondi. Supporta studenti diversi con materiali nella loro lingua madre."
        },
        parents: {
          title: "Genitori",
          description: "Offri al tuo bambino esercizi coinvolgenti a casa con schede di qualit\u00e0 professionale adattate ai suoi interessi e livello."
        },
        therapists: {
          title: "Terapisti ed educatori speciali",
          description: "Genera materiali mirati per logopedia, terapia occupazionale ed educazione speciale \u2014 personalizzati per ogni studente."
        }
      },
      cta: {
        title: "Pronto a creare?",
        subtitle: "Inizia a creare schede professionali in pochi secondi \u2014 prova gratuita.",
        button: "Scopri i generatori"
      }
    }
  },
  nl: {
    footerAbout: "Over ons",
    about: {
      metaTitle: "Over LessonCraftStudio | Educatieve Werkblad-Generatoren",
      metaDescription: "Leer meer over LessonCraftStudio \u2014 33 professionele werkblad-generatoren in 11 talen met meer dan 3.000 thematische afbeeldingen voor leraren, ouders en therapeuten.",
      hero: {
        title: "Over LessonCraftStudio",
        subtitle: "Wereldwijd docenten ondersteunen met professionele werkblad-generatoren"
      },
      stats: {
        generators: "33",
        generatorsLabel: "Werkblad-generatoren",
        languages: "11",
        languagesLabel: "Talen",
        images: "3.000+",
        imagesLabel: "Thematische afbeeldingen",
        themes: "100+",
        themesLabel: "Thema\u2019s"
      },
      mission: {
        title: "Onze missie",
        description: "Wij geloven dat elk kind toegang verdient tot hoogwaardig lesmateriaal. LessonCraftStudio is gebouwd om leraren, ouders en therapeuten te helpen direct professionele werkbladen te maken \u2014 zonder designvaardigheden, dure software of uren voorbereiding.",
        description2: "Onze generatoren combineren op onderzoek gebaseerde pedagogiek met mooi design, waardoor het eenvoudig is drukklare materialen te maken die jonge leerlingen van kleuterschool tot groep 5 aanspreken."
      },
      methodology: {
        title: "Onze aanpak",
        instant: {
          title: "Direct genereren",
          description: "Kies een thema, pas de instellingen aan en genereer in enkele seconden een drukklaar werkblad. Geen designvaardigheden nodig."
        },
        research: {
          title: "Op onderzoek gebaseerd",
          description: "Elke generator is gebaseerd op bewezen educatieve methoden voor de vroege ontwikkeling \u2014 rekenen, lezen, motoriek en cognitieve ontwikkeling."
        },
        inclusive: {
          title: "Meertalig & inclusief",
          description: "Alle 33 generatoren werken naadloos in 11 talen, met cultureel passende inhoud en een bibliotheek van meer dan 3.000 handgeselecteerde afbeeldingen."
        }
      },
      audience: {
        title: "Voor wie",
        teachers: {
          title: "Leraren",
          description: "Maak in seconden gedifferentieerde werkbladen voor uw klas. Ondersteun diverse leerlingen met materiaal in hun moedertaal."
        },
        parents: {
          title: "Ouders",
          description: "Geef uw kind boeiende oefeningen thuis met professionele werkbladen afgestemd op zijn interesses en niveau."
        },
        therapists: {
          title: "Therapeuten & speciale educatie",
          description: "Genereer gericht materiaal voor logopedie, ergotherapie en speciaal onderwijs \u2014 aangepast aan elke leerling."
        }
      },
      cta: {
        title: "Klaar om te beginnen?",
        subtitle: "Begin direct met het maken van professionele werkbladen \u2014 gratis uitproberen.",
        button: "Generatoren bekijken"
      }
    }
  },
  sv: {
    footerAbout: "Om oss",
    about: {
      metaTitle: "Om LessonCraftStudio | Pedagogiska Arbetsblads-Generatorer",
      metaDescription: "L\u00e4r dig mer om LessonCraftStudio \u2014 33 professionella arbetsblads-generatorer p\u00e5 11 spr\u00e5k med \u00f6ver 3 000 tematiska bilder f\u00f6r l\u00e4rare, f\u00f6r\u00e4ldrar och terapeuter.",
      hero: {
        title: "Om LessonCraftStudio",
        subtitle: "St\u00f6djer pedagoger v\u00e4rlden \u00f6ver med professionella arbetsblads-generatorer"
      },
      stats: {
        generators: "33",
        generatorsLabel: "Arbetsblads-generatorer",
        languages: "11",
        languagesLabel: "Spr\u00e5k",
        images: "3 000+",
        imagesLabel: "Tematiska bilder",
        themes: "100+",
        themesLabel: "Teman"
      },
      mission: {
        title: "V\u00e5rt uppdrag",
        description: "Vi tror att varje barn f\u00f6rtj\u00e4nar tillg\u00e5ng till h\u00f6gkvalitativt utbildningsmaterial. LessonCraftStudio skapades f\u00f6r att hj\u00e4lpa l\u00e4rare, f\u00f6r\u00e4ldrar och terapeuter att skapa professionella arbetsblad direkt \u2014 utan designkunskaper, dyr programvara eller timmar av f\u00f6rberedelse.",
        description2: "V\u00e5ra generatorer kombinerar forskningsbaserad pedagogik med vacker design, vilket g\u00f6r det enkelt att producera utskriftsf\u00e4rdigt material som engagerar unga elever fr\u00e5n f\u00f6rskola till \u00e5rskurs 3."
      },
      methodology: {
        title: "V\u00e5r metod",
        instant: {
          title: "Omedelbar generering",
          description: "V\u00e4lj ett tema, anpassa inst\u00e4llningarna och generera ett utskriftsf\u00e4rdigt arbetsblad p\u00e5 sekunder. Inga designkunskaper kr\u00e4vs."
        },
        research: {
          title: "Forskningsbaserat",
          description: "Varje generator bygger p\u00e5 bepr\u00f6vade pedagogiska metoder f\u00f6r tidig barndomsutveckling \u2014 matematik, l\u00e4sning, motorik och kognitiv utveckling."
        },
        inclusive: {
          title: "Flerspr\u00e5kigt & inkluderande",
          description: "Alla 33 generatorer fungerar s\u00f6ml\u00f6st p\u00e5 11 spr\u00e5k, med kulturellt anpassat inneh\u00e5ll och ett bibliotek med \u00f6ver 3 000 handplockade bilder."
        }
      },
      audience: {
        title: "Vilka vi tj\u00e4nar",
        teachers: {
          title: "L\u00e4rare",
          description: "Skapa differentierade arbetsblad f\u00f6r ditt klassrum p\u00e5 sekunder. St\u00f6d olika elever med material p\u00e5 deras modersm\u00e5l."
        },
        parents: {
          title: "F\u00f6r\u00e4ldrar",
          description: "Ge ditt barn engagerande \u00f6vningar hemma med professionella arbetsblad anpassade efter intressen och niv\u00e5."
        },
        therapists: {
          title: "Terapeuter & specialpedagoger",
          description: "Generera riktat material f\u00f6r logopedi, arbetsterapi och specialundervisning \u2014 anpassat f\u00f6r varje elev."
        }
      },
      cta: {
        title: "Redo att b\u00f6rja?",
        subtitle: "B\u00f6rja skapa professionella arbetsblad p\u00e5 sekunder \u2014 gratis att prova.",
        button: "Utforska generatorer"
      }
    }
  },
  da: {
    footerAbout: "Om os",
    about: {
      metaTitle: "Om LessonCraftStudio | P\u00e6dagogiske Arbejdsark-Generatorer",
      metaDescription: "L\u00e6r mere om LessonCraftStudio \u2014 33 professionelle arbejdsark-generatorer p\u00e5 11 sprog med over 3.000 tematiske billeder til l\u00e6rere, for\u00e6ldre og terapeuter.",
      hero: {
        title: "Om LessonCraftStudio",
        subtitle: "St\u00f8tter undervisere verden over med professionelle arbejdsark-generatorer"
      },
      stats: {
        generators: "33",
        generatorsLabel: "Arbejdsark-generatorer",
        languages: "11",
        languagesLabel: "Sprog",
        images: "3.000+",
        imagesLabel: "Tematiske billeder",
        themes: "100+",
        themesLabel: "Temaer"
      },
      mission: {
        title: "Vores mission",
        description: "Vi tror p\u00e5, at hvert barn fortjener adgang til undervisningsmaterialer af h\u00f8j kvalitet. LessonCraftStudio blev skabt for at hj\u00e6lpe l\u00e6rere, for\u00e6ldre og terapeuter med at generere professionelle arbejdsark \u00f8jeblikkeligt \u2014 uden designkompetencer, dyr software eller timevis forberedelse.",
        description2: "Vores generatorer kombinerer forskningsbaseret p\u00e6dagogik med flot design, s\u00e5 det er nemt at lave printklare materialer, der engagerer unge elever fra b\u00f8rnehave til 3. klasse."
      },
      methodology: {
        title: "Vores tilgang",
        instant: {
          title: "\u00d8jeblikkelig generering",
          description: "V\u00e6lg et tema, tilpas indstillingerne og gener\u00e9r et printklar arbejdsark p\u00e5 sekunder. Ingen designkompetencer n\u00f8dvendige."
        },
        research: {
          title: "Forskningsbaseret",
          description: "Hver generator bygger p\u00e5 dokumenterede p\u00e6dagogiske metoder til tidlig barndomsudvikling \u2014 matematik, l\u00e6sning, motorik og kognitiv udvikling."
        },
        inclusive: {
          title: "Flersproget & inkluderende",
          description: "Alle 33 generatorer fungerer problemfrit p\u00e5 11 sprog, med kulturelt tilpasset indhold og et bibliotek med over 3.000 h\u00e5ndplukkede billeder."
        }
      },
      audience: {
        title: "Hvem vi tjener",
        teachers: {
          title: "L\u00e6rere",
          description: "Opret differentierede arbejdsark til dit klasselokale p\u00e5 sekunder. St\u00f8t forskellige elever med materialer p\u00e5 deres modersm\u00e5l."
        },
        parents: {
          title: "For\u00e6ldre",
          description: "Giv dit barn engagerende \u00f8velser derhjemme med professionelle arbejdsark tilpasset deres interesser og niveau."
        },
        therapists: {
          title: "Terapeuter & specialundervisere",
          description: "Gener\u00e9r m\u00e5lrettede materialer til taleterapia, ergoterapi og specialundervisning \u2014 tilpasset hver enkelt elev."
        }
      },
      cta: {
        title: "Klar til at starte?",
        subtitle: "Begynd at lave professionelle arbejdsark p\u00e5 sekunder \u2014 gratis at pr\u00f8ve.",
        button: "Udforsk generatorer"
      }
    }
  },
  no: {
    footerAbout: "Om oss",
    about: {
      metaTitle: "Om LessonCraftStudio | Pedagogiske Arbeidsark-Generatorer",
      metaDescription: "L\u00e6r mer om LessonCraftStudio \u2014 33 profesjonelle arbeidsark-generatorer p\u00e5 11 spr\u00e5k med over 3 000 tematiske bilder for l\u00e6rere, foreldre og terapeuter.",
      hero: {
        title: "Om LessonCraftStudio",
        subtitle: "St\u00f8tter pedagoger verden over med profesjonelle arbeidsark-generatorer"
      },
      stats: {
        generators: "33",
        generatorsLabel: "Arbeidsark-generatorer",
        languages: "11",
        languagesLabel: "Spr\u00e5k",
        images: "3 000+",
        imagesLabel: "Tematiske bilder",
        themes: "100+",
        themesLabel: "Temaer"
      },
      mission: {
        title: "V\u00e5rt oppdrag",
        description: "Vi tror at hvert barn fortjener tilgang til undervisningsmateriell av h\u00f8y kvalitet. LessonCraftStudio ble skapt for \u00e5 hjelpe l\u00e6rere, foreldre og terapeuter med \u00e5 lage profesjonelle arbeidsark umiddelbart \u2014 uten designferdigheter, dyr programvare eller timevis med forberedelse.",
        description2: "V\u00e5re generatorer kombinerer forskningsbasert pedagogikk med vakker design, og gj\u00f8r det enkelt \u00e5 lage utskriftsklare materialer som engasjerer unge elever fra barnehage til 3. klasse."
      },
      methodology: {
        title: "V\u00e5r tiln\u00e6rming",
        instant: {
          title: "Umiddelbar generering",
          description: "Velg et tema, tilpass innstillingene og generer et utskriftsklart arbeidsark p\u00e5 sekunder. Ingen designferdigheter n\u00f8dvendig."
        },
        research: {
          title: "Forskningsbasert",
          description: "Hver generator er bygget p\u00e5 dokumenterte pedagogiske metoder for tidlig barndomsutvikling \u2014 matematikk, lesing, motorikk og kognitiv utvikling."
        },
        inclusive: {
          title: "Flerspr\u00e5klig & inkluderende",
          description: "Alle 33 generatorer fungerer smidig p\u00e5 11 spr\u00e5k, med kulturelt tilpasset innhold og et bibliotek med over 3 000 h\u00e5ndplukkede bilder."
        }
      },
      audience: {
        title: "Hvem vi tjener",
        teachers: {
          title: "L\u00e6rere",
          description: "Lag differensierte arbeidsark for klasserommet ditt p\u00e5 sekunder. St\u00f8tt ulike elever med materialer p\u00e5 deres morsm\u00e5l."
        },
        parents: {
          title: "Foreldre",
          description: "Gi barnet ditt engasjerende \u00f8velser hjemme med profesjonelle arbeidsark tilpasset deres interesser og niv\u00e5."
        },
        therapists: {
          title: "Terapeuter & spesialpedagoger",
          description: "Generer m\u00e5lrettet materiell for logopedi, ergoterapi og spesialundervisning \u2014 tilpasset hver enkelt elev."
        }
      },
      cta: {
        title: "Klar til \u00e5 begynne?",
        subtitle: "Begynn \u00e5 lage profesjonelle arbeidsark p\u00e5 sekunder \u2014 gratis \u00e5 pr\u00f8ve.",
        button: "Utforsk generatorer"
      }
    }
  },
  fi: {
    footerAbout: "Tietoa meist\u00e4",
    about: {
      metaTitle: "Tietoa LessonCraftStudiosta | Opetukselliset Ty\u00f6arkki-Generaattorit",
      metaDescription: "Tutustu LessonCraftStudioon \u2014 33 ammattimaista ty\u00f6arkki-generaattoria 11 kielell\u00e4 yli 3 000 teemakuvalla opettajille, vanhemmille ja terapeuteille.",
      hero: {
        title: "Tietoa LessonCraftStudiosta",
        subtitle: "Tuemme opettajia ymp\u00e4ri maailmaa ammattimaisilla ty\u00f6arkki-generaattoreilla"
      },
      stats: {
        generators: "33",
        generatorsLabel: "Ty\u00f6arkki-generaattoria",
        languages: "11",
        languagesLabel: "Kielt\u00e4",
        images: "3 000+",
        imagesLabel: "Teemakuvaa",
        themes: "100+",
        themesLabel: "Teemaa"
      },
      mission: {
        title: "Teht\u00e4v\u00e4mme",
        description: "Uskomme, ett\u00e4 jokaisella lapsella on oikeus laadukkaaseen oppimateriaaliin. LessonCraftStudio luotiin auttamaan opettajia, vanhempia ja terapeutteja luomaan ammattimaisia ty\u00f6arkkeja v\u00e4litt\u00f6m\u00e4sti \u2014 ilman suunnittelutaitoja, kallista ohjelmistoa tai tuntien valmisteluty\u00f6t\u00e4.",
        description2: "Generaattorimme yhdist\u00e4v\u00e4t tutkimukseen perustuvan pedagogiikan kauniiseen muotoiluun, mik\u00e4 tekee tulostusvalmiiden materiaalien luomisesta helppoa esikoulusta 3. luokkaan."
      },
      methodology: {
        title: "L\u00e4hestymistapamme",
        instant: {
          title: "V\u00e4lit\u00f6n luominen",
          description: "Valitse teema, muokkaa asetuksia ja luo tulostusvalmis ty\u00f6arkki sekunneissa. Suunnittelutaitoja ei tarvita."
        },
        research: {
          title: "Tutkimukseen perustuva",
          description: "Jokainen generaattori perustuu hyv\u00e4ksi havaittuihin opetusmenetelm\u00e4\u00e4n varhaiskasvatuksessa \u2014 matematiikka, lukeminen, motoriikka ja kognitiivinen kehitys."
        },
        inclusive: {
          title: "Monikielinen ja inklusiivinen",
          description: "Kaikki 33 generaattoria toimivat saumattomasti 11 kielell\u00e4, kulttuurisesti sopivalla sis\u00e4ll\u00f6ll\u00e4 ja yli 3 000 k\u00e4sin valitun kuvan kirjastolla."
        }
      },
      audience: {
        title: "Kenelle palvelumme on",
        teachers: {
          title: "Opettajat",
          description: "Luo eriytettyj\u00e4 ty\u00f6arkkeja luokallesi sekunneissa. Tue monenlaisia oppilaita materiaaleilla heid\u00e4n \u00e4idinkielell\u00e4\u00e4n."
        },
        parents: {
          title: "Vanhemmat",
          description: "Tarjoa lapsellesi innostavia harjoituksia kotona ammattimaisilla ty\u00f6arkkeilla, jotka on r\u00e4\u00e4t\u00e4l\u00f6ity heid\u00e4n kiinnostuksiinsa ja tasoonsa."
        },
        therapists: {
          title: "Terapeutit ja erityisopettajat",
          description: "Luo kohdennettuja materiaaleja puheterapiaan, toimintaterapiaan ja erityisopetukseen \u2014 r\u00e4\u00e4t\u00e4l\u00f6ityn\u00e4 jokaiselle oppilaalle."
        }
      },
      cta: {
        title: "Valmis aloittamaan?",
        subtitle: "Aloita ammattimaisten ty\u00f6arkkien luominen sekunneissa \u2014 ilmainen kokeilu.",
        button: "Tutustu generaattoreihin"
      }
    }
  }
};

// Process each locale
const locales = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

for (const locale of locales) {
  const filePath = path.join(messagesDir, `${locale}.json`);

  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${filePath} does not exist`);
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const json = JSON.parse(content);

  const t = translations[locale];
  if (!t) {
    console.log(`SKIP: No translations for ${locale}`);
    continue;
  }

  // 1. Add footer.support.about
  if (json.footer && json.footer.support) {
    json.footer.support.about = t.footerAbout;
  }

  // 2. Add about namespace
  json.about = t.about;

  // Write back with 2-space indentation
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  console.log(`OK: ${locale}.json updated`);
}

console.log('\nDone! All locale files updated.');
