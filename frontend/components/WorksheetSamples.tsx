'use client';

import { useState, useEffect } from 'react';

interface WorksheetSample {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  difficulty: string;
  ageRange: string;
}

interface SamplesContent {
  samples: WorksheetSample[];
  sectionTitle: string;
  sectionSubtitle: string;
  ctaText: string;
  ctaUrl?: string;
  categories?: Record<string, string>;
  difficulties?: Record<string, string>;
  modalLabels?: {
    ageRange?: string;
    difficulty?: string;
    category?: string;
  };
}

interface WorksheetSamplesProps {
  locale?: string;
}

export default function WorksheetSamples({ locale = 'en' }: WorksheetSamplesProps) {
  // Helper function to translate difficulty
  const translateDifficulty = (difficulty: string): string => {
    if (locale === 'de') {
      switch(difficulty) {
        case 'Easy':
          return 'Einfach';
        case 'Medium':
          return 'Mittel';
        case 'Hard':
          return 'Schwer';
        default:
          return difficulty;
      }
    } else if (locale === 'fr') {
      switch(difficulty) {
        case 'Easy':
          return 'Facile';
        case 'Medium':
          return 'Moyen';
        case 'Hard':
          return 'Difficile';
        default:
          return difficulty;
      }
    } else if (locale === 'es') {
      switch(difficulty) {
        case 'Easy':
          return 'Fácil';
        case 'Medium':
          return 'Medio';
        case 'Hard':
          return 'Difícil';
        default:
          return difficulty;
      }
    } else if (locale === 'it') {
      switch(difficulty) {
        case 'Easy':
          return 'Facile';
        case 'Medium':
          return 'Medio';
        case 'Hard':
          return 'Difficile';
        default:
          return difficulty;
      }
    } else if (locale === 'pt') {
      switch(difficulty) {
        case 'Easy':
          return 'Fácil';
        case 'Medium':
          return 'Médio';
        case 'Hard':
          return 'Difícil';
        default:
          return difficulty;
      }
    } else if (locale === 'nl') {
      switch(difficulty) {
        case 'Easy':
          return 'Makkelijk';
        case 'Medium':
          return 'Gemiddeld';
        case 'Hard':
          return 'Moeilijk';
        default:
          return difficulty;
      }
    } else if (locale === 'sv') {
      switch(difficulty) {
        case 'Easy':
          return 'Lätt';
        case 'Medium':
          return 'Medel';
        case 'Hard':
          return 'Svår';
        default:
          return difficulty;
      }
    } else if (locale === 'da') {
      switch(difficulty) {
        case 'Easy':
          return 'Let';
        case 'Medium':
          return 'Mellem';
        case 'Hard':
          return 'Svær';
        default:
          return difficulty;
      }
    } else if (locale === 'no') {
      switch(difficulty) {
        case 'Easy':
          return 'Lett';
        case 'Medium':
          return 'Middels';
        case 'Hard':
          return 'Vanskelig';
        default:
          return difficulty;
      }
    } else if (locale === 'fi') {
      switch(difficulty) {
        case 'Easy':
          return 'Helppo';
        case 'Medium':
          return 'Keskitaso';
        case 'Hard':
          return 'Vaikea';
        default:
          return difficulty;
      }
    }
    return difficulty;
  };

  // Helper function to translate age range
  const translateAgeRange = (ageRange: string): string => {
    if (locale === 'de') {
      switch(ageRange) {
        case '3-5 years':
          return '3-5 Jahre';
        case '4-7 years':
          return '4-7 Jahre';
        case '5-8 years':
          return '5-8 Jahre';
        case '6-8 years':
          return '6-8 Jahre';
        case '7-10 years':
          return '7-10 Jahre';
        default:
          return ageRange;
      }
    } else if (locale === 'fr') {
      switch(ageRange) {
        case '3-5 years':
          return '3-5 ans';
        case '4-7 years':
          return '4-7 ans';
        case '5-8 years':
          return '5-8 ans';
        case '6-8 years':
          return '6-8 ans';
        case '7-10 years':
          return '7-10 ans';
        default:
          return ageRange;
      }
    } else if (locale === 'es') {
      switch(ageRange) {
        case '3-5 years':
          return '3-5 años';
        case '4-7 years':
          return '4-7 años';
        case '5-8 years':
          return '5-8 años';
        case '6-8 years':
          return '6-8 años';
        case '7-10 years':
          return '7-10 años';
        default:
          return ageRange;
      }
    } else if (locale === 'it') {
      switch(ageRange) {
        case '3-5 years':
          return '3-5 anni';
        case '4-7 years':
          return '4-7 anni';
        case '5-8 years':
          return '5-8 anni';
        case '6-8 years':
          return '6-8 anni';
        case '7-10 years':
          return '7-10 anni';
        default:
          return ageRange;
      }
    } else if (locale === 'pt') {
      switch(ageRange) {
        case '3-5 years':
          return '3-5 anos';
        case '4-7 years':
          return '4-7 anos';
        case '5-8 years':
          return '5-8 anos';
        case '6-8 years':
          return '6-8 anos';
        case '7-10 years':
          return '7-10 anos';
        default:
          return ageRange;
      }
    } else if (locale === 'nl') {
      switch(ageRange) {
        case '3-5 years':
          return '3-5 jaar';
        case '4-7 years':
          return '4-7 jaar';
        case '5-8 years':
          return '5-8 jaar';
        case '6-8 years':
          return '6-8 jaar';
        case '7-10 years':
          return '7-10 jaar';
        default:
          return ageRange;
      }
    } else if (locale === 'sv') {
      switch(ageRange) {
        case '3-5 years':
          return '3-5 år';
        case '4-7 years':
          return '4-7 år';
        case '5-8 years':
          return '5-8 år';
        case '6-8 years':
          return '6-8 år';
        case '7-10 years':
          return '7-10 år';
        default:
          return ageRange;
      }
    } else if (locale === 'da') {
      switch(ageRange) {
        case '3-5 years':
          return '3-5 år';
        case '4-7 years':
          return '4-7 år';
        case '5-8 years':
          return '5-8 år';
        case '6-8 years':
          return '6-8 år';
        case '7-10 years':
          return '7-10 år';
        default:
          return ageRange;
      }
    } else if (locale === 'no') {
      switch(ageRange) {
        case '3-5 years':
          return '3-5 år';
        case '4-7 years':
          return '4-7 år';
        case '5-8 years':
          return '5-8 år';
        case '6-8 years':
          return '6-8 år';
        case '7-10 years':
          return '7-10 år';
        default:
          return ageRange;
      }
    } else if (locale === 'fi') {
      switch(ageRange) {
        case '3-5 years':
          return '3-5 vuotta';
        case '4-7 years':
          return '4-7 vuotta';
        case '5-8 years':
          return '5-8 vuotta';
        case '6-8 years':
          return '6-8 vuotta';
        case '7-10 years':
          return '7-10 vuotta';
        default:
          return ageRange;
      }
    }
    return ageRange;
  };

  const getLocalizedContent = () => {
    if (locale === 'de') {
      return {
        sectionTitle: 'Arbeitsblätter-Beispielgalerie',
        sectionSubtitle: 'Klicken Sie auf ein Arbeitsblatt für eine größere Vorschau. Dies sind nur einige Beispiele aus unserer Sammlung von 33 professionellen Arbeitsblatt-Generatoren.',
        ctaText: 'Alle 33 Arbeitsblatt-Generatoren erkunden →',
        modalLabels: {
          ageRange: 'Altersgruppe',
          difficulty: 'Schwierigkeit',
          category: 'Kategorie'
        }
      };
    } else if (locale === 'fr') {
      return {
        sectionTitle: 'Galerie d\'exemples de fiches',
        sectionSubtitle: 'Cliquez sur une fiche pour un aperçu plus grand. Voici quelques exemples de notre collection de 33 générateurs professionnels de fiches pédagogiques.',
        ctaText: 'Explorer les 33 générateurs de fiches →',
        modalLabels: {
          ageRange: 'Tranche d\'âge',
          difficulty: 'Difficulté',
          category: 'Catégorie'
        }
      };
    } else if (locale === 'es') {
      return {
        sectionTitle: 'Galería de ejemplos de hojas de trabajo',
        sectionSubtitle: 'Haz clic en una hoja para ver una vista previa más grande. Estos son solo algunos ejemplos de nuestra colección de 33 generadores profesionales de hojas de trabajo.',
        ctaText: 'Explorar los 33 generadores de hojas →',
        modalLabels: {
          ageRange: 'Rango de edad',
          difficulty: 'Dificultad',
          category: 'Categoría'
        }
      };
    } else if (locale === 'it') {
      return {
        sectionTitle: 'Galleria di esempi di schede didattiche',
        sectionSubtitle: 'Clicca su una scheda per vedere un\'anteprima più grande. Questi sono solo alcuni esempi dalla nostra collezione di 33 generatori professionali di schede didattiche.',
        ctaText: 'Esplora tutti i 33 generatori di schede →',
        modalLabels: {
          ageRange: 'Fascia d\'età',
          difficulty: 'Difficoltà',
          category: 'Categoria'
        }
      };
    } else if (locale === 'pt') {
      return {
        sectionTitle: 'Galeria de exemplos de fichas de trabalho',
        sectionSubtitle: 'Clique em uma ficha para ver uma pré-visualização maior. Estes são apenas alguns exemplos da nossa coleção de 33 geradores profissionais de fichas de trabalho.',
        ctaText: 'Explorar os 33 geradores de fichas →',
        modalLabels: {
          ageRange: 'Faixa etária',
          difficulty: 'Dificuldade',
          category: 'Categoria'
        }
      };
    } else if (locale === 'nl') {
      return {
        sectionTitle: 'Galerij met werkbladvoorbeelden',
        sectionSubtitle: 'Klik op een werkblad voor een grotere preview. Dit zijn slechts enkele voorbeelden uit onze collectie van 33 professionele werkbladgenerators.',
        ctaText: 'Ontdek alle 33 werkbladgenerators →',
        modalLabels: {
          ageRange: 'Leeftijdsgroep',
          difficulty: 'Moeilijkheidsgraad',
          category: 'Categorie'
        }
      };
    } else if (locale === 'sv') {
      return {
        sectionTitle: 'Galleri med arbetsbladsexempel',
        sectionSubtitle: 'Klicka på ett arbetsblad för en större förhandsvisning. Detta är bara några exempel från vår samling av 33 professionella arbetsbladsgeneratorer.',
        ctaText: 'Utforska alla 33 arbetsbladsgeneratorer →',
        modalLabels: {
          ageRange: 'Åldersgrupp',
          difficulty: 'Svårighetsgrad',
          category: 'Kategori'
        }
      };
    } else if (locale === 'da') {
      return {
        sectionTitle: 'Galleri med arbejdsarkeksempler',
        sectionSubtitle: 'Klik på et arbejdsark for en større forhåndsvisning. Dette er kun nogle eksempler fra vores samling af 33 professionelle arbejdsarkgeneratorer.',
        ctaText: 'Udforsk alle 33 arbejdsarkgeneratorer →',
        modalLabels: {
          ageRange: 'Aldersgruppe',
          difficulty: 'Sværhedsgrad',
          category: 'Kategori'
        }
      };
    } else if (locale === 'no') {
      return {
        sectionTitle: 'Galleri med arbeidsarkeksempler',
        sectionSubtitle: 'Klikk på et arbeidsark for en større forhåndsvisning. Dette er bare noen eksempler fra vår samling av 33 profesjonelle arbeidsarkgeneratorer.',
        ctaText: 'Utforsk alle 33 arbeidsarkgeneratorer →',
        modalLabels: {
          ageRange: 'Aldersgruppe',
          difficulty: 'Vanskelighetsgrad',
          category: 'Kategori'
        }
      };
    } else if (locale === 'fi') {
      return {
        sectionTitle: 'Työarkkiesimerkkien galleria',
        sectionSubtitle: 'Klikkaa työarkkia nähdäksesi suuremman esikatselun. Nämä ovat vain muutamia esimerkkejä 33 ammattimaisesta työarkkigeneraattoristamme.',
        ctaText: 'Tutustu kaikkiin 33 työarkkigeneraattoriin →',
        modalLabels: {
          ageRange: 'Ikäryhmä',
          difficulty: 'Vaikeustaso',
          category: 'Kategoria'
        }
      };
    }
    return {
      sectionTitle: 'Worksheet Samples Gallery',
      sectionSubtitle: 'Click on any worksheet to see a larger preview. These are just some examples from our collection of 33 professional worksheet generators.',
      ctaText: 'Explore All 33 Worksheet Generators →',
      modalLabels: {
        ageRange: 'Age Range',
        difficulty: 'Difficulty',
        category: 'Category'
      }
    };
  };

  const localizedContent = getLocalizedContent();

  const [content, setContent] = useState<SamplesContent>({
    samples: [],
    sectionTitle: localizedContent.sectionTitle,
    sectionSubtitle: localizedContent.sectionSubtitle,
    ctaText: localizedContent.ctaText,
    ctaUrl: `/${locale}/apps`,
    categories: {},
    difficulties: {},
    modalLabels: localizedContent.modalLabels
  });
  const [selectedSample, setSelectedSample] = useState<WorksheetSample | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSamples();
  }, [locale]);

  const fetchSamples = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/homepage/content?locale=${locale}`);

      if (response.ok) {
        const data = await response.json();
        const apiContent = data.content;

        if (apiContent?.samples && apiContent.samples.length > 0) {
          // Transform the samples data
          const transformedSamples = apiContent.samples.map((sample: any, index: number) => ({
            id: sample.id || `sample-${index}`,
            name: sample.name || 'Untitled',
            category: sample.category || 'general',
            image: sample.image || sample.image_url || '/worksheet-samples/placeholder.png',
            description: sample.description || 'No description available',
            difficulty: sample.difficulty || 'Easy',
            ageRange: sample.ageRange || sample.age_range || '5-7 years'
          }));

          // Update all content
          const localContent = getLocalizedContent();
          setContent({
            samples: transformedSamples,
            sectionTitle: apiContent.samplesSection?.title || localContent.sectionTitle,
            sectionSubtitle: apiContent.samplesSection?.subtitle || localContent.sectionSubtitle,
            ctaText: apiContent.samplesSection?.cta || localContent.ctaText,
            ctaUrl: `/${locale}/apps`,
            categories: apiContent.samplesSection?.categories || {},
            difficulties: apiContent.samplesSection?.difficulties || {},
            modalLabels: {
              ageRange: apiContent.samplesSection?.modalLabels?.ageRange || localContent.modalLabels.ageRange,
              difficulty: apiContent.samplesSection?.modalLabels?.difficulty || localContent.modalLabels.difficulty,
              category: apiContent.samplesSection?.modalLabels?.category || localContent.modalLabels.category
            }
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch worksheet samples:', error);
      // Use fallback samples
      setContent(prev => ({ ...prev, samples: fallbackSamples }));
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get translated sample names
  const getSampleName = (sampleId: string): string => {
    const names: Record<string, Record<string, string>> = {
      'alphabet': {
        'de': 'Alphabet-Zug',
        'fr': 'Train de l\'alphabet',
        'es': 'Tren del alfabeto',
        'it': 'Trenino dell\'alfabeto',
        'pt': 'Comboio do alfabeto',
        'nl': 'Alfabettrein',
        'sv': 'Alfabetståg',
        'en': 'Alphabet Train'
      }
    };
    return names[sampleId]?.[locale] || names[sampleId]?.['en'] || 'Unknown';
  };

  // Helper function to get translated sample descriptions
  const getSampleDescription = (sampleId: string): string => {
    const descriptions: Record<string, Record<string, string>> = {
      'alphabet': {
        'de': 'Spaßiges Alphabet-Lernen mit bunten Zugwaggons',
        'fr': 'Apprentissage ludique de l\'alphabet avec des wagons colorés',
        'es': 'Aprendizaje divertido del alfabeto con vagones coloridos',
        'it': 'Apprendimento divertente dell\'alfabeto con vagoni colorati',
        'pt': 'Aprendizagem divertida do alfabeto com vagões coloridos',
        'nl': 'Leuk alfabetleren met kleurrijke treinwagons',
        'en': 'Fun alphabet learning with colorful train cars'
      }
    };
    return descriptions[sampleId]?.[locale] || descriptions[sampleId]?.['en'] || '';
  };

  // Fallback samples in case API fails
  const fallbackSamples: WorksheetSample[] = [
    {
      id: 'alphabet',
      name: locale === 'de' ? 'Alphabet-Zug' : (locale === 'fr' ? 'Train de l\'alphabet' : (locale === 'es' ? 'Tren del alfabeto' : (locale === 'it' ? 'Trenino dell\'alfabeto' : (locale === 'pt' ? 'Comboio do alfabeto' : (locale === 'nl' ? 'Alfabettrein' : (locale === 'sv' ? 'Alfabetståg' : (locale === 'da' ? 'Alfabettog' : (locale === 'no' ? 'Alfabettog' : (locale === 'fi' ? 'Aakkosjuna' : 'Alphabet Train'))))))))),
      category: 'literacy',
      image: '/worksheet-samples/alphabet.png',
      description: locale === 'de' ? 'Spaßiges Alphabet-Lernen mit bunten Zugwaggons' :
                    (locale === 'fr' ? 'Apprentissage ludique de l\'alphabet avec des wagons colorés' :
                    (locale === 'es' ? 'Aprendizaje divertido del alfabeto con vagones coloridos' :
                    (locale === 'it' ? 'Apprendimento divertente dell\'alfabeto con vagoni colorati' :
                    (locale === 'pt' ? 'Aprendizagem divertida do alfabeto com vagões coloridos' :
                    (locale === 'nl' ? 'Leuk alfabetleren met kleurrijke treinwagons' :
                    (locale === 'sv' ? 'Rolig alfabetsinlärning med färgglada tågvagnar' :
                    (locale === 'da' ? 'Sjov alfabetlæring med farverige togvogne' :
                    (locale === 'no' ? 'Morsom alfabetlæring med fargerike togvogner' :
                    (locale === 'fi' ? 'Hauska aakkosten oppiminen värikkäillä junavaunuilla' :
                    'Fun alphabet learning with colorful train cars'))))))))),
      difficulty: 'Easy',
      ageRange: '3-5 years'
    },
    {
      id: 'code-addition',
      name: locale === 'de' ? 'Code-Addition' : (locale === 'fr' ? 'Code-Addition' : (locale === 'es' ? 'Code-Addition' : (locale === 'it' ? 'Code-Addition' : (locale === 'pt' ? 'Code-Addition' : (locale === 'nl' ? 'Code-Addition' : (locale === 'sv' ? 'Code-Addition' : (locale === 'da' ? 'Code-Addition' : (locale === 'no' ? 'Code-Addition' : (locale === 'fi' ? 'Code-Addition' : 'Code Addition'))))))))),
      category: 'math',
      image: '/worksheet-samples/code-addition.png',
      description: locale === 'de' ? 'Knacke den Code mit Additionsrätseln' :
                    (locale === 'fr' ? 'Déchiffrez le code avec des énigmes d\'addition' :
                    (locale === 'es' ? 'Descifra el código con acertijos de suma' :
                    (locale === 'it' ? 'Decifra il codice con enigmi di addizione' :
                    (locale === 'pt' ? 'Decifre o código com enigmas de adição' :
                    (locale === 'nl' ? 'Kraak de code met optelraadsels' :
                    (locale === 'sv' ? 'Knäck koden med additionsgåtor' :
                    (locale === 'da' ? 'Knæk koden med additionsgåder' :
                    (locale === 'no' ? 'Knekk koden med addisjonsoppgaver' :
                    (locale === 'fi' ? 'Murra koodi yhteenlaskutehtävillä' :
                    'Crack the code with addition puzzles'))))))))),
      difficulty: 'Medium',
      ageRange: '6-8 years'
    },
    {
      id: 'graph',
      name: locale === 'de' ? 'Diagramm & Zählen' : (locale === 'fr' ? 'Graphiques et comptage' : (locale === 'es' ? 'Gráficos y conteo' : (locale === 'it' ? 'Grafici e conteggio' : (locale === 'pt' ? 'Gráficos e contagem' : (locale === 'nl' ? 'Grafieken en tellen' : (locale === 'sv' ? 'Diagram och räkning' : (locale === 'da' ? 'Diagram og tælling' : (locale === 'no' ? 'Diagram og telling' : (locale === 'fi' ? 'Kaavio ja laskeminen' : 'Chart & Count'))))))))),
      category: 'math',
      image: '/worksheet-samples/graph.png',
      description: locale === 'de' ? 'Lernen Sie Grafiken und Datenvisualisierung' :
                    (locale === 'fr' ? 'Apprenez les graphiques et la visualisation de données' :
                    (locale === 'es' ? 'Aprende gráficos y visualización de datos' :
                    (locale === 'it' ? 'Impara i grafici e la visualizzazione dei dati' :
                    (locale === 'pt' ? 'Aprenda gráficos e visualização de dados' :
                    (locale === 'nl' ? 'Leer grafieken en datavisualisatie' :
                    (locale === 'sv' ? 'Lär dig diagram och datavisualisering' :
                    (locale === 'da' ? 'Lær diagrammer og datavisualisering' :
                    (locale === 'no' ? 'Lær diagrammer og datavisualisering' :
                    (locale === 'fi' ? 'Opi kaavioita ja datan visualisointia' :
                    'Learn graphing and data visualization'))))))))),
      difficulty: 'Medium',
      ageRange: '7-10 years'
    },
    {
      id: 'hidden-object',
      name: locale === 'de' ? 'Versteckte Objekte' : (locale === 'fr' ? 'Objets cachés' : (locale === 'es' ? 'Objetos ocultos' : (locale === 'it' ? 'Oggetti nascosti' : (locale === 'pt' ? 'Objetos escondidos' : (locale === 'nl' ? 'Verborgen voorwerpen' : (locale === 'sv' ? 'Gömda föremål' : (locale === 'da' ? 'Skjulte objekter' : (locale === 'no' ? 'Skjulte objekter' : (locale === 'fi' ? 'Piilotetut esineet' : 'Hidden Objects'))))))))),
      category: 'puzzle',
      image: '/worksheet-samples/hidden-object.png',
      description: locale === 'de' ? 'Finde versteckte Objekte in detaillierten Szenen' :
                    (locale === 'fr' ? 'Trouvez les objets cachés dans des scènes détaillées' :
                    (locale === 'es' ? 'Encuentra objetos ocultos en escenas detalladas' :
                    (locale === 'it' ? 'Trova oggetti nascosti in scene dettagliate' :
                    (locale === 'pt' ? 'Encontre objetos escondidos em cenas detalhadas' :
                    (locale === 'nl' ? 'Vind verborgen voorwerpen in gedetailleerde scènes' :
                    (locale === 'sv' ? 'Hitta gömda föremål i detaljerade scener' :
                    (locale === 'da' ? 'Find skjulte objekter i detaljerede scener' :
                    (locale === 'no' ? 'Finn skjulte objekter i detaljerte scener' :
                    (locale === 'fi' ? 'Etsi piilotettuja esineitä yksityiskohtaisista kohtauksista' :
                    'Find hidden objects in detailed scenes'))))))))),
      difficulty: 'Easy',
      ageRange: '5-8 years'
    },
    {
      id: 'i-spy',
      name: locale === 'de' ? 'Ich Sehe Was' : (locale === 'fr' ? 'Cherche et trouve' : (locale === 'es' ? 'Veo Veo' : (locale === 'it' ? 'Aguzza la vista' : (locale === 'pt' ? 'Eu Espio' : (locale === 'nl' ? 'Ik zie ik zie' : (locale === 'sv' ? 'Jag ser' : (locale === 'da' ? 'Jeg ser' : (locale === 'no' ? 'Jeg ser' : (locale === 'fi' ? 'Minä näen' : 'I Spy Game'))))))))),
      category: 'puzzle',
      image: '/worksheet-samples/i-spy.png',
      description: locale === 'de' ? 'Klassisches Ich-sehe-was Suchspiel!' :
                    (locale === 'fr' ? 'Le jeu classique de recherche visuelle!' :
                    (locale === 'es' ? '¡El clásico juego de búsqueda visual!' :
                    (locale === 'it' ? 'Il classico gioco di ricerca visiva!' :
                    (locale === 'pt' ? 'O clássico jogo de busca visual!' :
                    (locale === 'nl' ? 'Het klassieke zoekspel!' :
                    (locale === 'sv' ? 'Det klassiska sökspelet!' :
                    (locale === 'da' ? 'Det klassiske søgespil!' :
                    (locale === 'no' ? 'Det klassiske søkespillet!' :
                    (locale === 'fi' ? 'Klassinen hakupeli!' :
                    'Classic I Spy searching game'))))))))),
      difficulty: 'Easy',
      ageRange: '4-7 years'
    },
    {
      id: 'train',
      name: locale === 'de' ? 'Muster-Zug' : (locale === 'fr' ? 'Train des motifs' : (locale === 'es' ? 'Tren de patrones' : (locale === 'it' ? 'Trenino dei pattern' : (locale === 'pt' ? 'Comboio de padrões' : (locale === 'nl' ? 'Patronentrein' : (locale === 'sv' ? 'Mönstertåg' : (locale === 'da' ? 'Mønstertog' : (locale === 'no' ? 'Mønstertog' : (locale === 'fi' ? 'Kuviojuna' : 'Pattern Train'))))))))),
      category: 'logic',
      image: '/worksheet-samples/train.png',
      description: locale === 'de' ? 'Vervollständige die Mustersequenzen' :
                    (locale === 'fr' ? 'Complétez les séquences de motifs' :
                    (locale === 'es' ? 'Completa las secuencias de patrones' :
                    (locale === 'it' ? 'Completa le sequenze di pattern' :
                    (locale === 'pt' ? 'Complete as sequências de padrões' :
                    (locale === 'nl' ? 'Maak de patroonreeksen af' :
                    (locale === 'sv' ? 'Komplettera mönstersekvenserna' :
                    (locale === 'da' ? 'Fuldfør mønstersekvenserne' :
                    (locale === 'no' ? 'Fullfør mønstersekvensene' :
                    (locale === 'fi' ? 'Täydennä kuviosarjat' :
                    'Complete the pattern sequences'))))))))),
      difficulty: 'Medium',
      ageRange: '5-8 years'
    }
  ];

  // Helper function for difficulty colors
  const getDifficultyColor = (difficulty: string) => {
    const diffLower = difficulty.toLowerCase();
    if (diffLower === 'easy' || diffLower === 'einfach' || diffLower === 'facile' || diffLower === 'fácil' || diffLower === 'makkelijk' || diffLower === 'lätt' || diffLower === 'let' || diffLower === 'lett' || diffLower === 'helppo') {
      return 'bg-green-100 text-green-700';
    } else if (diffLower === 'hard' || diffLower === 'schwer' || diffLower === 'difficile' || diffLower === 'difícil' || diffLower === 'moeilijk' || diffLower === 'svår' || diffLower === 'svær' || diffLower === 'vanskelig' || diffLower === 'vaikea') {
      return 'bg-red-100 text-red-700';
    } else {
      return 'bg-yellow-100 text-yellow-700';
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {content.sectionTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.sectionSubtitle}
            </p>
          </div>

          {/* Simple Grid Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {content.samples.map((sample) => (
              <div
                key={sample.id}
                onClick={() => setSelectedSample(sample)}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* Image */}
                <div className="aspect-w-4 aspect-h-3 bg-gray-100">
                  <img
                    src={sample.image}
                    alt={sample.name}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="system-ui" font-size="20"%3EImage Not Found%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {sample.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {sample.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {translateAgeRange(sample.ageRange)}
                    </span>
                    <span className={`px-2 py-1 rounded-full ${
                      getDifficultyColor(sample.difficulty)
                    }`}>
                      {translateDifficulty(sample.difficulty)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <a
              href={content.ctaUrl || `/${locale}/apps`}
              className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {content.ctaText}
            </a>
          </div>
        </div>
      </section>

      {/* Simple Modal */}
      {selectedSample && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedSample(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">{selectedSample.name}</h3>
              <button
                onClick={() => setSelectedSample(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedSample.image}
                alt={selectedSample.name}
                className="w-full h-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect width="800" height="600" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="system-ui" font-size="24"%3EImage Not Available%3C/text%3E%3C/svg%3E';
                }}
              />
              <div className="mt-4">
                <p className="text-gray-600 mb-2">{selectedSample.description}</p>
                <div className="flex gap-4 text-sm">
                  <span>
                    <strong>{content.modalLabels?.ageRange || 'Age Range'}:</strong> {translateAgeRange(selectedSample.ageRange)}
                  </span>
                  <span>
                    <strong>{content.modalLabels?.difficulty || 'Difficulty'}:</strong> {translateDifficulty(selectedSample.difficulty)}
                  </span>
                  {selectedSample.category && (
                    <span>
                      <strong>{content.modalLabels?.category || 'Category'}:</strong> {
                        content.categories?.[selectedSample.category.toLowerCase()] || selectedSample.category
                      }
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}