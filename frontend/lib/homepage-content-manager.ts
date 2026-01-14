// Homepage Content Manager
// Manages all homepage content through PostgreSQL database via Prisma

import { prisma } from './prisma';

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://lcs-directus:8055';
const API_TOKEN = 'static-api-token-for-sync';

export interface HeroSection {
  id?: string;
  title: Record<string, string>;
  subtitle: Record<string, string>;
  cta_primary_text: Record<string, string>;
  cta_primary_link: string;
  cta_secondary_text: Record<string, string>;
  cta_secondary_link: string;
  background_gradient: string;
}

export interface FeatureItem {
  id?: string;
  icon: string;
  title: Record<string, string>;
  description: Record<string, string>;
  color_scheme: string;
  sort_order: number;
}

export interface WorksheetSample {
  id?: string;
  name: Record<string, string>;
  description: Record<string, string>;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  age_range: Record<string, string>;
  image_url: string;
  featured: boolean;
  sort_order: number;
}

export interface PricingTier {
  id?: string;
  name: Record<string, string>;
  price: string;
  price_period: string;
  features: Record<string, string[]>;
  cta_text: Record<string, string>;
  cta_link: string;
  highlighted: boolean;
  badge_text: Record<string, string>;
  sort_order: number;
}

export interface HomepageContent {
  hero: HeroSection;
  navigation: {
    logo: {
      text: string;
      image: string;
    };
    menuItems: {
      apps: Record<string, string>;
      pricing: Record<string, string>;
      blog: Record<string, string>;
    };
    buttons: {
      signIn: Record<string, string>;
      startFree: Record<string, string>;
    };
  };
  featuresSection: {
    title: Record<string, string>;
  };
  features: FeatureItem[];
  samplesSection: {
    title: Record<string, string>;
    subtitle: Record<string, string>;
    cta: Record<string, string>;
    categories: {
      math: Record<string, string>;
      literacy: Record<string, string>;
      puzzle: Record<string, string>;
      logic: Record<string, string>;
      creative: Record<string, string>;
    };
    difficulties: {
      easy: Record<string, string>;
      medium: Record<string, string>;
      hard: Record<string, string>;
    };
  };
  samples: WorksheetSample[];
  pricingSection: {
    title: Record<string, string>;
    periods: {
      month: Record<string, string>;
      year: Record<string, string>;
    };
  };
  pricing: PricingTier[];
  footer: {
    companyName: Record<string, string>;
    companyTagline: Record<string, string>;
    sections: {
      product: {
        title: Record<string, string>;
        links: {
          apps: Record<string, string>;
          pricing: Record<string, string>;
          blog: Record<string, string>;
        };
      };
      support: {
        title: Record<string, string>;
        links: {
          helpCenter: Record<string, string>;
          contact: Record<string, string>;
          faq: Record<string, string>;
        };
      };
      legal: {
        title: Record<string, string>;
        links: {
          terms: Record<string, string>;
          privacy: Record<string, string>;
          license: Record<string, string>;
        };
      };
    };
    copyright: Record<string, string>;
  };
  commonUI: {
    loading: Record<string, string>;
    error: Record<string, string>;
    success: Record<string, string>;
    noResults: Record<string, string>;
    viewMore: Record<string, string>;
    viewLess: Record<string, string>;
  };
  seo: {
    title: Record<string, string>;
    description: Record<string, string>;
    keywords: Record<string, string>;
  };
}

class HomepageContentManager {
  private directusUrl: string;
  private apiToken: string;
  private cachedContent: HomepageContent | null = null;

  constructor() {
    this.directusUrl = DIRECTUS_URL;
    this.apiToken = API_TOKEN;
  }

  // Fetch all homepage content
  async getHomepageContent(locale: string = 'en'): Promise<HomepageContent> {
    try {
      // Try to load from database first
      const dbContent = await this.loadFromDatabase();
      let content: HomepageContent;

      if (dbContent) {
        content = dbContent;
      } else {
        // If no database content, return default content
        content = this.getDefaultContent(locale);
        // Save default content to database for future use
        await this.saveToDatabase(content);
      }

      // For non-English locales, replace samples with locale-specific ones
      if (locale !== 'en') {
        content = {
          ...content,
          samples: await this.getSamples(locale)
        };
      }

      this.cachedContent = content;
      return content;
    } catch (error) {
      console.error('Error fetching homepage content:', error);
      const defaultContent = this.getDefaultContent(locale);
      // For non-English locales, try to get locale-specific samples even on error
      if (locale !== 'en') {
        try {
          return {
            ...defaultContent,
            samples: await this.getSamples(locale)
          };
        } catch {
          return defaultContent;
        }
      }
      return defaultContent;
    }
  }

  // Get features section header
  private getFeaturesSectionHeader() {
    return {
      title: {
        en: 'Everything You Need',
        de: 'Alles was Sie brauchen',
        fr: 'Tout ce dont vous avez besoin',
        es: 'Todo lo que necesitas',
        it: 'Tutto ciò di cui hai bisogno',
        pt: 'Tudo o que você precisa',
        nl: 'Alles wat je nodig hebt',
        sv: 'Allt du behöver',
        da: 'Alt hvad du har brug for',
        no: 'Alt du trenger',
        fi: 'Kaikki mitä tarvitset'
      }
    };
  }

  // Get samples section content
  private getSamplesSectionContent() {
    return {
      title: {
        en: 'Worksheet Samples Gallery',
        de: 'Arbeitsblätter-Beispielgalerie',
        fr: 'Galerie d\'exemples de feuilles de travail',
        es: 'Galería de ejemplos de hojas de trabajo',
        it: 'Galleria di esempi di fogli di lavoro',
        pt: 'Galeria de exemplos de planilhas',
        nl: 'Werkblad voorbeelden galerij',
        sv: 'Galleri med arbetsbladsexempel',
        da: 'Galleri med arbejdsark eksempler',
        no: 'Galleri med arbeidsarkeksempler',
        fi: 'Työarkkiesimerkkien galleria'
      },
      subtitle: {
        en: 'Click on any worksheet to see a larger preview. These are just a few examples from our collection of 33 professional worksheet generators.',
        de: 'Klicken Sie auf ein Arbeitsblatt für eine größere Vorschau. Dies sind nur einige Beispiele aus unserer Sammlung von 33 professionellen Arbeitsblatt-Generatoren.',
        fr: 'Cliquez sur n\'importe quelle feuille de travail pour voir un aperçu plus grand. Ce ne sont que quelques exemples de notre collection de 33 générateurs de feuilles de travail professionnels.',
        es: 'Haga clic en cualquier hoja de trabajo para ver una vista previa más grande. Estos son solo algunos ejemplos de nuestra colección de 33 generadores de hojas de trabajo profesionales.',
        it: 'Clicca su qualsiasi foglio di lavoro per vedere un\'anteprima più grande. Questi sono solo alcuni esempi della nostra collezione di 33 generatori di fogli di lavoro professionali.',
        pt: 'Clique em qualquer planilha para ver uma prévia maior. Estes são apenas alguns exemplos de nossa coleção de 33 geradores de planilhas profissionais.',
        nl: 'Klik op een werkblad om een grotere preview te zien. Dit zijn slechts enkele voorbeelden uit onze collectie van 33 professionele werkbladgeneratoren.',
        sv: 'Klicka på vilket arbetsblad som helst för att se en större förhandsvisning. Detta är bara några exempel från vår samling av 33 professionella arbetsbladsgeneratorer.',
        da: 'Klik på et hvilket som helst arbejdsark for at se en større forhåndsvisning. Dette er kun nogle få eksempler fra vores samling af 33 professionelle arbejdsark-generatorer.',
        no: 'Klikk på hvilket som helst arbeidsark for å se en større forhåndsvisning. Dette er bare noen få eksempler fra vår samling av 33 profesjonelle arbeidsarkgeneratorer.',
        fi: 'Napsauta mitä tahansa työarkkia nähdäksesi suuremman esikatselun. Nämä ovat vain muutamia esimerkkejä 33 ammattimaisen työarkkigeneraattorimme kokoelmasta.'
      },
      cta: {
        en: 'Explore All 33 Worksheet Generators →',
        de: 'Alle 33 Arbeitsblatt-Generatoren erkunden →',
        fr: 'Explorer les 33 générateurs de feuilles de travail →',
        es: 'Explorar los 33 generadores de hojas de trabajo →',
        it: 'Esplora tutti i 33 generatori di fogli di lavoro →',
        pt: 'Explorar todos os 33 geradores de planilhas →',
        nl: 'Ontdek alle 33 werkbladgeneratoren →',
        sv: 'Utforska alla 33 arbetsbladsgeneratorer →',
        da: 'Udforsk alle 33 arbejdsark-generatorer →',
        no: 'Utforsk alle 33 arbeidsarkgeneratorer →',
        fi: 'Tutustu kaikkiin 33 työarkkigeneraattoriin →'
      },
      categories: {
        math: {
          en: 'Math', de: 'Mathematik', fr: 'Mathématiques', es: 'Matemáticas', it: 'Matematica',
          pt: 'Matemática', nl: 'Wiskunde', sv: 'Matematik', da: 'Matematik', no: 'Matematikk', fi: 'Matematiikka'
        },
        literacy: {
          en: 'Literacy', de: 'Lesen & Schreiben', fr: 'Littératie', es: 'Alfabetización', it: 'Alfabetizzazione',
          pt: 'Alfabetização', nl: 'Geletterdheid', sv: 'Läskunnighet', da: 'Læsefærdighed', no: 'Leseferdighet', fi: 'Lukutaito'
        },
        puzzle: {
          en: 'Puzzle', de: 'Rätsel', fr: 'Puzzle', es: 'Rompecabezas', it: 'Puzzle',
          pt: 'Quebra-cabeça', nl: 'Puzzel', sv: 'Pussel', da: 'Puslespil', no: 'Puslespill', fi: 'Palapeli'
        },
        logic: {
          en: 'Logic', de: 'Logik', fr: 'Logique', es: 'Lógica', it: 'Logica',
          pt: 'Lógica', nl: 'Logica', sv: 'Logik', da: 'Logik', no: 'Logikk', fi: 'Logiikka'
        },
        creative: {
          en: 'Creative', de: 'Kreativ', fr: 'Créatif', es: 'Creativo', it: 'Creativo',
          pt: 'Criativo', nl: 'Creatief', sv: 'Kreativ', da: 'Kreativ', no: 'Kreativ', fi: 'Luova'
        }
      },
      difficulties: {
        easy: {
          en: 'Easy', de: 'Einfach', fr: 'Facile', es: 'Fácil', it: 'Facile',
          pt: 'Fácil', nl: 'Makkelijk', sv: 'Lätt', da: 'Let', no: 'Lett', fi: 'Helppo'
        },
        medium: {
          en: 'Medium', de: 'Mittel', fr: 'Moyen', es: 'Medio', it: 'Medio',
          pt: 'Médio', nl: 'Gemiddeld', sv: 'Medel', da: 'Mellem', no: 'Middels', fi: 'Keskitaso'
        },
        hard: {
          en: 'Hard', de: 'Schwer', fr: 'Difficile', es: 'Difícil', it: 'Difficile',
          pt: 'Difícil', nl: 'Moeilijk', sv: 'Svår', da: 'Svær', no: 'Vanskelig', fi: 'Vaikea'
        }
      },
      modalLabels: {
        ageRange: {
          en: 'Age Range', de: 'Altersgruppe', fr: 'Tranche d\'âge', es: 'Rango de edad', it: 'Fascia d\'età',
          pt: 'Faixa etária', nl: 'Leeftijdsgroep', sv: 'Åldersgrupp', da: 'Aldersgruppe', no: 'Aldersgruppe', fi: 'Ikäryhmä'
        },
        difficulty: {
          en: 'Difficulty', de: 'Schwierigkeit', fr: 'Difficulté', es: 'Dificultad', it: 'Difficoltà',
          pt: 'Dificuldade', nl: 'Moeilijkheidsgraad', sv: 'Svårighetsgrad', da: 'Sværhedsgrad', no: 'Vanskelighetsgrad', fi: 'Vaikeustaso'
        },
        category: {
          en: 'Category', de: 'Kategorie', fr: 'Catégorie', es: 'Categoría', it: 'Categoria',
          pt: 'Categoria', nl: 'Categorie', sv: 'Kategori', da: 'Kategori', no: 'Kategori', fi: 'Kategoria'
        }
      }
    };
  }

  // Get pricing section content
  private getPricingSectionContent() {
    return {
      title: {
        en: 'Simple, Transparent Pricing',
        de: 'Einfache, transparente Preise',
        fr: 'Tarification simple et transparente',
        es: 'Precios simples y transparentes',
        it: 'Prezzi semplici e trasparenti',
        pt: 'Preços simples e transparentes',
        nl: 'Eenvoudige, transparante prijzen',
        sv: 'Enkel, transparent prissättning',
        da: 'Enkel, gennemsigtig prissætning',
        no: 'Enkel, gjennomsiktig prising',
        fi: 'Yksinkertainen, läpinäkyvä hinnoittelu'
      },
      periods: {
        month: {
          en: '/month', de: '/Monat', fr: '/mois', es: '/mes', it: '/mese',
          pt: '/mês', nl: '/maand', sv: '/månad', da: '/måned', no: '/måned', fi: '/kuukausi'
        },
        year: {
          en: '/year', de: '/Jahr', fr: '/an', es: '/año', it: '/anno',
          pt: '/ano', nl: '/jaar', sv: '/år', da: '/år', no: '/år', fi: '/vuosi'
        }
      }
    };
  }

  // Get navigation content
  private getNavigationContent() {
    return {
      logo: {
        text: 'LessonCraftStudio',
        image: ''
      },
      menuItems: {
        apps: {
          en: 'Apps', de: 'Apps', fr: 'Applications', es: 'Aplicaciones', it: 'Applicazioni',
          pt: 'Aplicativos', nl: 'Apps', sv: 'Appar', da: 'Apps', no: 'Apper', fi: 'Sovellukset'
        },
        pricing: {
          en: 'Pricing', de: 'Preise', fr: 'Tarifs', es: 'Precios', it: 'Prezzi',
          pt: 'Preços', nl: 'Prijzen', sv: 'Priser', da: 'Priser', no: 'Priser', fi: 'Hinnat'
        },
        blog: {
          en: 'Blog', de: 'Blog', fr: 'Blog', es: 'Blog', it: 'Blog',
          pt: 'Blog', nl: 'Blog', sv: 'Blogg', da: 'Blog', no: 'Blogg', fi: 'Blogi'
        }
      },
      buttons: {
        signIn: {
          en: 'Sign In', de: 'Anmelden', fr: 'Connexion', es: 'Iniciar Sesión', it: 'Accedi',
          pt: 'Entrar', nl: 'Inloggen', sv: 'Logga in', da: 'Log ind', no: 'Logg inn', fi: 'Kirjaudu'
        },
        startFree: {
          en: 'Start Free', de: 'Kostenlos starten', fr: 'Commencer gratuitement', es: 'Comenzar gratis', it: 'Inizia gratis',
          pt: 'Começar grátis', nl: 'Start gratis', sv: 'Börja gratis', da: 'Start gratis', no: 'Start gratis', fi: 'Aloita ilmaiseksi'
        }
      }
    };
  }

  // Get footer content
  private getFooterContent() {
    return {
      companyName: {
        en: 'LessonCraftStudio', de: 'LessonCraftStudio', fr: 'LessonCraftStudio', es: 'LessonCraftStudio',
        it: 'LessonCraftStudio', pt: 'LessonCraftStudio', nl: 'LessonCraftStudio', sv: 'LessonCraftStudio',
        da: 'LessonCraftStudio', no: 'LessonCraftStudio', fi: 'LessonCraftStudio'
      },
      companyTagline: {
        en: 'Professional worksheet generators for educational publishers.',
        de: 'Professionelle Arbeitsblatt-Generatoren für Bildungsverlage.',
        fr: 'Générateurs de feuilles de travail professionnels pour les éditeurs éducatifs.',
        es: 'Generadores de hojas de trabajo profesionales para editores educativos.',
        it: 'Generatori di fogli di lavoro professionali per editori educativi.',
        pt: 'Geradores de planilhas profissionais para editores educacionais.',
        nl: 'Professionele werkbladgeneratoren voor educatieve uitgevers.',
        sv: 'Professionella arbetsbladsgeneratorer för utbildningsförlag.',
        da: 'Professionelle arbejdsark-generatorer til uddannelsesforlag.',
        no: 'Profesjonelle arbeidsarkgeneratorer for utdanningsforlag.',
        fi: 'Ammattimaiset työarkkigeneraattorit koulutuskustantajille.'
      },
      sections: {
        product: {
          title: {
            en: 'Product', de: 'Produkt', fr: 'Produit', es: 'Producto', it: 'Prodotto',
            pt: 'Produto', nl: 'Product', sv: 'Produkt', da: 'Produkt', no: 'Produkt', fi: 'Tuote'
          },
          links: {
            apps: {
              en: 'Apps', de: 'Apps', fr: 'Applications', es: 'Aplicaciones', it: 'Applicazioni',
              pt: 'Aplicativos', nl: 'Apps', sv: 'Appar', da: 'Apps', no: 'Apper', fi: 'Sovellukset'
            },
            pricing: {
              en: 'Pricing', de: 'Preise', fr: 'Tarifs', es: 'Precios', it: 'Prezzi',
              pt: 'Preços', nl: 'Prijzen', sv: 'Priser', da: 'Priser', no: 'Priser', fi: 'Hinnat'
            },
            blog: {
              en: 'Blog', de: 'Blog', fr: 'Blog', es: 'Blog', it: 'Blog',
              pt: 'Blog', nl: 'Blog', sv: 'Blogg', da: 'Blog', no: 'Blogg', fi: 'Blogi'
            }
          }
        },
        support: {
          title: {
            en: 'Support', de: 'Support', fr: 'Support', es: 'Soporte', it: 'Supporto',
            pt: 'Suporte', nl: 'Ondersteuning', sv: 'Support', da: 'Support', no: 'Støtte', fi: 'Tuki'
          },
          links: {
            helpCenter: {
              en: 'Help Center', de: 'Hilfezentrum', fr: 'Centre d\'aide', es: 'Centro de ayuda', it: 'Centro assistenza',
              pt: 'Central de Ajuda', nl: 'Helpcentrum', sv: 'Hjälpcenter', da: 'Hjælpecenter', no: 'Hjelpesenter', fi: 'Ohjekeskus'
            },
            contact: {
              en: 'Contact', de: 'Kontakt', fr: 'Contact', es: 'Contacto', it: 'Contatto',
              pt: 'Contato', nl: 'Contact', sv: 'Kontakt', da: 'Kontakt', no: 'Kontakt', fi: 'Yhteystiedot'
            },
            faq: {
              en: 'FAQ', de: 'FAQ', fr: 'FAQ', es: 'FAQ', it: 'FAQ',
              pt: 'FAQ', nl: 'FAQ', sv: 'FAQ', da: 'FAQ', no: 'FAQ', fi: 'UKK'
            }
          }
        },
        legal: {
          title: {
            en: 'Legal', de: 'Rechtliches', fr: 'Légal', es: 'Legal', it: 'Legale',
            pt: 'Legal', nl: 'Juridisch', sv: 'Juridik', da: 'Juridisk', no: 'Juridisk', fi: 'Lakiasiat'
          },
          links: {
            terms: {
              en: 'Terms of Service', de: 'Nutzungsbedingungen', fr: 'Conditions d\'utilisation', es: 'Términos de servicio', it: 'Termini di servizio',
              pt: 'Termos de Serviço', nl: 'Servicevoorwaarden', sv: 'Användarvillkor', da: 'Servicevilkår', no: 'Tjenestevilkår', fi: 'Käyttöehdot'
            },
            privacy: {
              en: 'Privacy Policy', de: 'Datenschutzrichtlinie', fr: 'Politique de confidentialité', es: 'Política de privacidad', it: 'Informativa sulla privacy',
              pt: 'Política de Privacidade', nl: 'Privacybeleid', sv: 'Integritetspolicy', da: 'Privatlivspolitik', no: 'Personvernerklæring', fi: 'Tietosuojakäytäntö'
            },
            license: {
              en: 'License Terms', de: 'Lizenzbedingungen', fr: 'Conditions de licence', es: 'Términos de licencia', it: 'Termini di licenza',
              pt: 'Termos de Licença', nl: 'Licentievoorwaarden', sv: 'Licensvillkor', da: 'Licensvilkår', no: 'Lisensvilkår', fi: 'Lisenssiehdot'
            }
          }
        }
      },
      copyright: {
        en: '© 2024 LessonCraftStudio. All rights reserved.',
        de: '© 2024 LessonCraftStudio. Alle Rechte vorbehalten.',
        fr: '© 2024 LessonCraftStudio. Tous droits réservés.',
        es: '© 2024 LessonCraftStudio. Todos los derechos reservados.',
        it: '© 2024 LessonCraftStudio. Tutti i diritti riservati.',
        pt: '© 2024 LessonCraftStudio. Todos os direitos reservados.',
        nl: '© 2024 LessonCraftStudio. Alle rechten voorbehouden.',
        sv: '© 2024 LessonCraftStudio. Alla rättigheter förbehållna.',
        da: '© 2024 LessonCraftStudio. Alle rettigheder forbeholdes.',
        no: '© 2024 LessonCraftStudio. Alle rettigheter forbeholdt.',
        fi: '© 2024 LessonCraftStudio. Kaikki oikeudet pidätetään.'
      }
    };
  }

  // Get common UI content
  private getCommonUIContent() {
    return {
      loading: {
        en: 'Loading...', de: 'Laden...', fr: 'Chargement...', es: 'Cargando...', it: 'Caricamento...',
        pt: 'Carregando...', nl: 'Laden...', sv: 'Laddar...', da: 'Indlæser...', no: 'Laster...', fi: 'Lataa...'
      },
      error: {
        en: 'An error occurred', de: 'Ein Fehler ist aufgetreten', fr: 'Une erreur s\'est produite',
        es: 'Ocurrió un error', it: 'Si è verificato un errore', pt: 'Ocorreu um erro',
        nl: 'Er is een fout opgetreden', sv: 'Ett fel uppstod', da: 'Der opstod en fejl',
        no: 'Det oppstod en feil', fi: 'Tapahtui virhe'
      },
      success: {
        en: 'Success!', de: 'Erfolg!', fr: 'Succès!', es: '¡Éxito!', it: 'Successo!',
        pt: 'Sucesso!', nl: 'Geslaagd!', sv: 'Lyckat!', da: 'Succes!', no: 'Suksess!', fi: 'Onnistui!'
      },
      noResults: {
        en: 'No results found', de: 'Keine Ergebnisse gefunden', fr: 'Aucun résultat trouvé',
        es: 'No se encontraron resultados', it: 'Nessun risultato trovato', pt: 'Nenhum resultado encontrado',
        nl: 'Geen resultaten gevonden', sv: 'Inga resultat hittades', da: 'Ingen resultater fundet',
        no: 'Ingen resultater funnet', fi: 'Tuloksia ei löytynyt'
      },
      viewMore: {
        en: 'View More', de: 'Mehr anzeigen', fr: 'Voir plus', es: 'Ver más', it: 'Vedi di più',
        pt: 'Ver mais', nl: 'Meer bekijken', sv: 'Visa mer', da: 'Vis mere', no: 'Vis mer', fi: 'Näytä lisää'
      },
      viewLess: {
        en: 'View Less', de: 'Weniger anzeigen', fr: 'Voir moins', es: 'Ver menos', it: 'Vedi meno',
        pt: 'Ver menos', nl: 'Minder bekijken', sv: 'Visa mindre', da: 'Vis mindre', no: 'Vis mindre', fi: 'Näytä vähemmän'
      }
    };
  }

  // Get hero section
  private async getHeroSection(locale: string): Promise<HeroSection> {
    try {
      const response = await fetch(`${this.directusUrl}/items/homepage_hero`, {
        headers: {
          'Authorization': `Bearer ${this.apiToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          return data.data[0];
        }
      }
    } catch (error) {
      console.error('Error fetching hero section:', error);
    }

    // Return default hero content
    return {
      title: {
        en: 'Create Professional Worksheets in Minutes',
        sv: 'Skapa professionella arbetsblad på några minuter'
      },
      subtitle: {
        en: '33 powerful worksheet generators with 100+ themed images',
        sv: '33 kraftfulla arbetsbladsgeneratorer med 100+ temabilder'
      },
      cta_primary_text: {
        en: 'Try Word Search Free',
        sv: 'Prova ordsökning gratis'
      },
      cta_primary_link: '/apps/word-search',
      cta_secondary_text: {
        en: 'View All Apps',
        sv: 'Visa alla appar'
      },
      cta_secondary_link: '/apps',
      background_gradient: 'from-primary-50 to-white'
    };
  }

  // Get feature items
  private async getFeatures(locale: string): Promise<FeatureItem[]> {
    try {
      const response = await fetch(`${this.directusUrl}/items/homepage_features?sort=sort_order`, {
        headers: {
          'Authorization': `Bearer ${this.apiToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          return data.data;
        }
      }
    } catch (error) {
      console.error('Error fetching features:', error);
    }

    // Return default features
    return [
      {
        icon: 'apps',
        title: { en: '33 Worksheet Apps', sv: '33 Arbetsbladsappar' },
        description: { en: 'From math and reading to puzzles and games', sv: 'Från matematik och läsning till pussel och spel' },
        color_scheme: 'primary',
        sort_order: 1
      },
      {
        icon: 'images',
        title: { en: '100+ Image Themes', sv: '100+ Bildteman' },
        description: { en: 'Child-friendly illustrations with commercial license', sv: 'Barnvänliga illustrationer med kommersiell licens' },
        color_scheme: 'secondary',
        sort_order: 2
      },
      {
        icon: 'languages',
        title: { en: '11 Languages', sv: '11 Språk' },
        description: { en: 'Create worksheets in multiple languages', sv: 'Skapa arbetsblad på flera språk' },
        color_scheme: 'accent',
        sort_order: 3
      },
      {
        icon: 'license',
        title: { en: 'POD License Included', sv: 'POD-licens ingår' },
        description: { en: 'Sell your worksheets on any platform', sv: 'Sälj dina arbetsblad på valfri plattform' },
        color_scheme: 'green',
        sort_order: 4
      }
    ];
  }

  // Get worksheet samples - returns 33 locale-specific samples for non-English languages
  private async getSamples(locale: string): Promise<WorksheetSample[]> {
    // Language folder mapping
    const languageFolders: Record<string, string> = {
      de: 'german',
      fr: 'french',
      es: 'spanish',
      it: 'italian',
      pt: 'portuguese',
      nl: 'dutch',
      sv: 'swedish',
      da: 'danish',
      no: 'norwegian',
      fi: 'finnish',
      en: 'english'
    };

    // Locale-specific image samples (randomly selected worksheets, not answer keys)
    const localeSamples: Record<string, Record<string, string>> = {
      de: {
        'addition': 'Additionsspa 3.jpeg',
        'alphabet train': 'Alphabet-Zug 1.jpeg',
        'big small': 'Groß oder Klei 2.jpeg',
        'bingo': 'bilder-bingo 1 callout.jpeg',
        'chart count': 'Bilddiagramm 4.jpeg',
        'code addition': 'Code-Knacker Addition 2.jpeg',
        'crossword': 'Bilderkreuzworträtse 1.jpeg',
        'cryptogram': 'Bilder-Kryptogramm 2.jpeg',
        'draw and color': 'Zeichnen und Ausmale 2.jpeg',
        'drawing lines': 'Linien Zeichnen Üben 7.jpeg',
        'find and count': 'Ich sehe was 3.jpeg',
        'find objects': 'Finde das Unpassende 1.jpeg',
        'grid match': 'Raster-Puzzle 3.jpeg',
        'matching': 'Paare Finden 2.jpeg',
        'math puzzle': 'Mathe-Rätsel 4.jpeg',
        'math worksheet': 'Mathe-Übungsblatt 5.jpeg',
        'missing pieces': 'Fehlende Teile 2.jpeg',
        'more less': 'Mehr Weniger 1.jpeg',
        'odd one out': 'Finde das Andere 3.jpeg',
        'pattern train': 'Musterzug 5.jpeg',
        'pattern worksheet': 'Musterrätsel 4.jpeg',
        'picture path': 'Bilderpfad 1.jpeg',
        'picture sort': 'Bilder Sortieren 2.jpeg',
        'prepositions': 'Präpositionen 4.jpeg',
        'shadow match': 'Schatten Zuordnen 3.jpeg',
        'subtraction': 'Subtraktion Spaß 3.jpeg',
        'sudoku': 'Bilder-Sudoku 3.jpeg',
        'treasure hunt': 'Schatzsuche 1.jpeg',
        'word guess': 'Wörter-Rätsel 2.jpeg',
        'word scramble': 'Buchstabensala 1.jpeg',
        'wordsearch': 'Wörter suchen 4.jpeg'
      },
      fr: {
        'addition': 'Addition Amusant 2.jpeg',
        'alphabet train': 'Train de l\'Alphabet 3.jpeg',
        'big small': 'Grand ou Petit 3.jpeg',
        'bingo': 'Loto d\'Images 4 callout (3).jpeg',
        'chart count': 'worksheet.jpeg',
        'code addition': 'Code Secret Addition 4.jpeg',
        'crossword': 'Mots Croisés en Images 1.jpeg',
        'cryptogram': 'Cryptogramme en Images 1.jpeg',
        'draw and color': 'Dessine et Colorie 6.jpeg',
        'drawing lines': 'Pratique de Tracer des Lignes 5.jpeg',
        'find and count': 'Je vois, je voi 4.jpeg',
        'find objects': 'Trouve l\'Intrus (2).jpeg',
        'grid match': 'Puzzle Grille 2.jpeg',
        'matching': 'Trouve les Paires 1.jpeg',
        'math puzzle': 'Casse-Têtes Mathématiques 1.jpeg',
        'math worksheet': 'Feuille de Mathématique 2.jpeg',
        'missing pieces': 'Pièces Manquantes 2.jpeg',
        'more less': 'Plus Moins 3.jpeg',
        'odd one out': 'Trouve l\'Intrus 2.jpeg',
        'pattern train': 'Train à Motifs 4.jpeg',
        'pattern worksheet': 'Puzzles de Motifs 1.jpeg',
        'picture path': 'Chemin d\'Images 2.jpeg',
        'picture sort': 'Tri d\'Images 2.jpeg',
        'prepositions': 'Prépositions 1.jpeg',
        'shadow match': 'Trouve l\'Ombre 3.jpeg',
        'subtraction': 'Soustractions Amusantes 4.jpeg',
        'sudoku': 'Sudoku en Images 3.jpeg',
        'treasure hunt': 'Chasse au Trésor 3.jpeg',
        'word guess': 'Devine le Mot 1.jpeg',
        'word scramble': 'Mots Mêlés 2.jpeg',
        'wordsearch': 'Mots Cachés 3.jpeg'
      },
      es: {
        'addition': 'Suma Divertida 4.jpeg',
        'alphabet train': 'Tren del Alfabeto 4.jpeg',
        'big small': 'Grande o Pequeño 1.jpeg',
        'bingo': 'Bingo de Imágenes 4.jpeg',
        'chart count': 'Gráfico de Dibujos 4.jpeg',
        'code addition': 'Código Secreto Suma 1.jpeg',
        'crossword': 'Crucigrama con Dibujos 1.jpeg',
        'cryptogram': 'Criptograma de Dibujos 5.jpeg',
        'draw and color': 'Dibuja y Colorea 12.jpeg',
        'drawing lines': 'Practica de Dibujar Línea 4.jpeg',
        'find and count': 'Veo Veo 2.jpeg',
        'find objects': 'Encuentra el Diferente (3).jpeg',
        'grid match': 'Puzzle de Cuadrícula 1.jpeg',
        'matching': 'Encuentra Parejas 4.jpeg',
        'math puzzle': 'Rompecabezas Matemáticos 2.jpeg',
        'math worksheet': 'Hoja de Matemáticas 2.jpeg',
        'missing pieces': 'Piezas Perdidas 1.jpeg',
        'more less': 'Más Menos 2.jpeg',
        'odd one out': 'Encuentra el Diferente 1.jpeg',
        'pattern train': 'Tren de Patrones 4.jpeg',
        'pattern worksheet': 'Rompecabezas de Patrones 2.jpeg',
        'picture path': 'Camino de Imágenes 2.jpeg',
        'picture sort': 'Clasificación de Imágenes 1.jpeg',
        'prepositions': 'Preposiciones 3.jpeg',
        'shadow match': 'Empareja las Sombras 1.jpeg',
        'subtraction': 'Restas Divertidas 5.jpeg',
        'sudoku': 'Sudoku de Imágenes 1.jpeg',
        'treasure hunt': 'Búsqueda del Tesoro 4.jpeg',
        'word guess': 'Adivina la Palabra 2.jpeg',
        'word scramble': 'Palabras Revueltas 5.jpeg',
        'wordsearch': 'Sopa de Letras 2.jpeg'
      },
      it: {
        'addition': 'Addizione Divertente 2.jpeg',
        'alphabet train': 'Treno dell\'Alfabeto 2.jpeg',
        'big small': 'Grande o Piccolo 3.jpeg',
        'bingo': 'tombola 3.jpeg',
        'chart count': 'Grafico con Immagini 2.jpeg',
        'code addition': 'Codice Segreto Addizione 3.jpeg',
        'crossword': 'Cruciverba con Immagini 2.jpeg',
        'cryptogram': 'Crittogramma Illustrato 1.jpeg',
        'draw and color': 'Disegna e Colora 3.jpeg',
        'drawing lines': 'Pratica del Disegno di Linee 3.jpeg',
        'find and count': 'Vedo Vedo 1.jpeg',
        'find objects': 'Trova gli Oggetti Nascosti 4.jpeg',
        'grid match': 'Puzzle a Griglia 8.jpeg',
        'matching': 'Trova le Coppie 4.jpeg',
        'math puzzle': 'Rompicapi Matematici 5.jpeg',
        'math worksheet': 'Scheda di Matematica 3.jpeg',
        'missing pieces': 'Pezzi Mancanti 3.jpeg',
        'more less': 'Più Meno 1.jpeg',
        'odd one out': 'Trova il Diverso 4.jpeg',
        'pattern train': 'Treno dei Modelli 2.jpeg',
        'pattern worksheet': 'Puzzle di Schemi 1.jpeg',
        'picture path': 'Percorso di Immagini 3.jpeg',
        'picture sort': 'Classificazione Immagini 4.jpeg',
        'prepositions': 'Preposizioni 3.jpeg',
        'shadow match': 'Abbina le Ombre 3.jpeg',
        'subtraction': 'Sottrazioni Divertenti 5.jpeg',
        'sudoku': 'Sudoku con Immagini 3.jpeg',
        'treasure hunt': 'Caccia al Tesoro 4.jpeg',
        'word guess': 'Indovina la Parola 2.jpeg',
        'word scramble': 'Lettere Mescolate 1.jpeg',
        'wordsearch': 'Cerca Parole 3.jpeg'
      },
      pt: {
        'addition': 'Adição Divertida 1.jpeg',
        'alphabet train': 'Comboio do Alfabeto 4.jpeg',
        'big small': 'Grande ou Pequeno 3.jpeg',
        'bingo': 'Bingo de Imagenes 3 callout (2).jpeg',
        'chart count': 'Gráfico de Figuras 2.jpeg',
        'code addition': 'Código Secreto Adição 3.jpeg',
        'crossword': 'Palavras Cruzadas 1.jpeg',
        'cryptogram': 'Criptograma Ilustrado 1.jpeg',
        'draw and color': 'Desenha e Pinta 4.jpeg',
        'drawing lines': 'Prática de Desenhar Linhas 4.jpeg',
        'find and count': 'Vejo, Vejo 1.jpeg',
        'find objects': 'Encontra o Diferente.jpeg',
        'grid match': 'Quebra-Cabeça de Grade 3.jpeg',
        'matching': 'Encontre os Pares 1.jpeg',
        'math puzzle': 'Quebra-Cabeças Matemático 4.jpeg',
        'math worksheet': 'Folha de Matemática 1.jpeg',
        'missing pieces': 'Peças em Falta 4.jpeg',
        'more less': 'Mais Menos 2.jpeg',
        'odd one out': 'Encontra o Diferente 6.jpeg',
        'pattern train': 'Comboio de Padrões 5.jpeg',
        'pattern worksheet': 'Quebra-cabeças de Padrões 2.jpeg',
        'picture path': 'Caminho de Imagen 2.jpeg',
        'picture sort': 'Classificação de Imagens 1.jpeg',
        'prepositions': 'Preposições 2.jpeg',
        'shadow match': 'Combine as Sombras 3.jpeg',
        'subtraction': 'Subtrações Divertidas 4.jpeg',
        'sudoku': 'Sudoku de Imagens 1.jpeg',
        'treasure hunt': 'Caça ao Tesouro 3.jpeg',
        'word guess': 'Adivinha a Palavra 2.jpeg',
        'word scramble': 'Letras Embaralhadas 3.jpeg',
        'wordsearch': 'Caça-Palavras 2.jpeg'
      },
      nl: {
        'addition': 'Optellen is Leuk 5.jpeg',
        'alphabet train': 'Alfabettrein 2.jpeg',
        'big small': 'Groot of Klein 4.jpeg',
        'bingo': 'Plaatjesbingo 1 callout.jpeg',
        'chart count': 'Plaatjesgrafiek 2.jpeg',
        'code addition': 'Geheime Code Optellen 2.jpeg',
        'crossword': 'Plaatjes Kruiswoord 4.jpeg',
        'cryptogram': 'Plaatjes Cryptogram 2.jpeg',
        'draw and color': 'Teken en Kleur 5.jpeg',
        'drawing lines': 'Lijnen Tekenen Oefenen 7.jpeg',
        'find and count': 'Ik zie, ik zie 3.jpeg',
        'find objects': 'Vind de Verborgen Voorwerpen 3.jpeg',
        'grid match': 'Rasterpuzzel 3.jpeg',
        'matching': 'Zoek de Paren 3.jpeg',
        'math puzzle': 'Wiskundepuzzels 1.jpeg',
        'math worksheet': 'Wiskundeblad 1.jpeg',
        'missing pieces': 'Ontbrekende Stukjes 4.jpeg',
        'more less': 'Meer Minder 3.jpeg',
        'odd one out': 'Vind de Vreemde Eend 4.jpeg',
        'pattern train': 'Patroontje 2.jpeg',
        'pattern worksheet': 'Patroonpuzzels 3.jpeg',
        'picture path': 'Afbeeldingspad 2.jpeg',
        'picture sort': 'Afbeeldingen Sorteren 1.jpeg',
        'prepositions': 'Voorzetsels 3.jpeg',
        'shadow match': 'Schaduw Koppelen 4.jpeg',
        'subtraction': 'Aftrekken is Leuk 3.jpeg',
        'sudoku': 'Plaatjes Sudoku 4.jpeg',
        'treasure hunt': 'Schattenjacht 2.jpeg',
        'word guess': 'Raad het Woord 1.jpeg',
        'word scramble': 'Letterzaak 1.jpeg',
        'wordsearch': 'Woordzoeker 1.jpeg'
      },
      sv: {
        'addition': 'blandat läge.jpeg',
        'alphabet train': 'alfabetståg portrait.jpeg',
        'big small': '2 identiska bilder.jpeg',
        'bingo': 'bildbingo 4 callout.jpeg',
        'chart count': 'bilddiagram 1.jpeg',
        'crossword': 'Bildkorsord 2.jpeg',
        'cryptogram': 'Bildkryptogram 3.jpeg',
        'draw and color': 'Rita och Färglägg 1.jpeg',
        'drawing lines': 'kurva 1.jpeg',
        'find and count': 'hitta och räkna landscape.jpeg',
        'find objects': 'Hitta den Udda (5).jpeg',
        'grid match': 'Rutnätspussel 3.jpeg',
        'matching': 'Matchningsspel custom.jpeg',
        'math puzzle': 'Mattepussel 2.jpeg',
        'math worksheet': 'mattetal landscape.jpeg',
        'missing pieces': 'Saknade Bitar 6.jpeg',
        'more less': 'mer mindre 1.jpeg',
        'odd one out': 'Hitta Udda Fågeln 2.jpeg',
        'pattern worksheet': 'Mönsterpussel 1.jpeg',
        'picture path': 'bildväg 2.jpeg',
        'picture sort': 'sortera bilder 1.jpeg',
        'prepositions': 'Prepositioner 1.jpeg',
        'shadow match': 'skuggmatchning 3.jpeg',
        'subtraction': 'Rolig Subtraktio 3.jpeg',
        'sudoku': 'sudoku_medel.jpeg',
        'treasure hunt': 'Skattjakt 3.jpeg',
        'word guess': 'Gissa Ordet 4.jpeg',
        'word scramble': 'Ordmix custom.jpeg',
        'wordsearch': 'ordletning custom.jpeg'
      },
      da: {
        'addition': 'Sjov Addition 1.jpeg',
        'alphabet train': 'Alfabettog 5.jpeg',
        'big small': 'Stort eller Lille 5.jpeg',
        'bingo': 'Billedbingo 3 callout (2).jpeg',
        'chart count': 'Billediagram 3.jpeg',
        'code addition': 'Hemmelig Kode Addition 3.jpeg',
        'crossword': 'Billedkrydsord 1.jpeg',
        'cryptogram': 'Billed-Kryptogram 2.jpeg',
        'draw and color': 'Tegn og Farvlæg 1.jpeg',
        'drawing lines': 'Linjetegningsøvelse 9.jpeg',
        'find and count': 'Jeg ser, jeg ser 3.jpeg',
        'find objects': 'Find den Ulige (4).jpeg',
        'grid match': 'Gitterpuslespil 2.jpeg',
        'matching': 'Find Parrene 4.jpeg',
        'math puzzle': 'Mattepuslespil 1.jpeg',
        'math worksheet': 'Matematikopgave 2.jpeg',
        'missing pieces': 'Manglende Dele 6.jpeg',
        'more less': 'Mere Mindre 4.jpeg',
        'odd one out': 'Find den Ulige 5.jpeg',
        'pattern train': 'Mønstertoget 4.jpeg',
        'pattern worksheet': 'Mønstergåder 2.jpeg',
        'picture path': 'Billedsti 3.jpeg',
        'picture sort': 'Sorter Billeder 4.jpeg',
        'prepositions': 'Præpositioner 3.jpeg',
        'shadow match': 'Gør Billederne Hele 2.jpeg',
        'subtraction': 'Sjov Subtraktion 1.jpeg',
        'sudoku': 'Billede-Sudoku 2.jpeg',
        'treasure hunt': 'Skattejagt 2.jpeg',
        'word guess': 'Gæt Ordet 4.jpeg',
        'word scramble': 'Bogstavrod 2.jpeg',
        'wordsearch': 'Ordsøgning 4.jpeg'
      },
      no: {
        'addition': 'Gøy Addisjon 6.jpeg',
        'alphabet train': 'Alfabettog 4.jpeg',
        'big small': 'Stort eller Lite 6.jpeg',
        'bingo': 'bildebingo 1 callout.jpeg',
        'chart count': 'Bildediagram 4.jpeg',
        'code addition': 'Hemmelig Kode Addisjon 4.jpeg',
        'crossword': 'Bildekryssord 4.jpeg',
        'cryptogram': 'Bildekryptogram 3.jpeg',
        'draw and color': 'Tegn og Fargelegg 5.jpeg',
        'drawing lines': 'Linjetegningøvelse 2.jpeg',
        'find and count': 'Jeg ser, jeg ser 3.jpeg',
        'find objects': 'Finn den Merkelige (1).jpeg',
        'grid match': 'Rutenettspuslespill 2.jpeg',
        'matching': 'Finn Parene 4.jpeg',
        'math puzzle': 'Mattepuslespill 1.jpeg',
        'math worksheet': 'Matematikkoppgave 3.jpeg',
        'missing pieces': 'Manglende Deler 4.jpeg',
        'more less': 'Mer Mindre 2.jpeg',
        'odd one out': 'Finn den Rare 3.jpeg',
        'pattern train': 'Mønstertoget 5.jpeg',
        'pattern worksheet': 'Mønstergåter 1.jpeg',
        'picture path': 'Bildesti 1.jpeg',
        'picture sort': 'Sorter Bilder 4.jpeg',
        'prepositions': 'Preposisjoner 4.jpeg',
        'shadow match': 'Fullfør Bildene 3.jpeg',
        'subtraction': 'Moro med Subtraksjon 3.jpeg',
        'sudoku': 'Bilde-Sudoku 1.jpeg',
        'treasure hunt': 'Skattejakt 5.jpeg',
        'word guess': 'Gjett Ordet 5.jpeg',
        'word scramble': 'Bokstavblanding 4.jpeg',
        'wordsearch': 'Ordleting 4.jpeg'
      },
      fi: {
        'addition': 'Hauska Yhteenlasku 1.jpeg',
        'alphabet train': 'Aakkostjuna 1.jpeg',
        'big small': 'Iso vai Pieni 5.jpeg',
        'bingo': 'kuvabingo 1 callout.jpeg',
        'chart count': 'Kuvakaavio 4.jpeg',
        'code addition': 'Salainen Koodi Yhteenlasku 6.jpeg',
        'crossword': 'Kuvaristikko 1.jpeg',
        'cryptogram': 'Kuvakryptogrammi 3.jpeg',
        'draw and color': 'Piirrä ja Väritä 4.jpeg',
        'drawing lines': 'Viivojen Piirtämisharjoitus 6.jpeg',
        'find and count': 'Minä näen 4.jpeg',
        'find objects': 'Löydä Outo (3).jpeg',
        'grid match': 'Ruudukkopalapeli 3.jpeg',
        'matching': 'Yhdistä Parit 3.jpeg',
        'math puzzle': 'Matematiikkapulmat 4.jpeg',
        'math worksheet': 'Matematiikkalehti 1.jpeg',
        'missing pieces': 'Puuttuvat Palat 6.jpeg',
        'more less': 'Enemmän Vähemmän 7.jpeg',
        'odd one out': 'Löydä Outo Lintu 6.jpeg',
        'pattern train': 'Kuviojuna 1.jpeg',
        'pattern worksheet': 'Kuviotehtävät 2.jpeg',
        'picture path': 'Kuvapolku 8.jpeg',
        'picture sort': 'Lajittele Kuvat 5.jpeg',
        'prepositions': 'Prepositiot 4.jpeg',
        'shadow match': 'Täydennä Kuvat 1.jpeg',
        'subtraction': 'Hauskaa Vähennyslaskua 4.jpeg',
        'sudoku': 'Kuva-Sudoku 2.jpeg',
        'treasure hunt': 'Aarteenetsintä 6.jpeg',
        'word guess': 'Arvaa Sana 6.jpeg',
        'word scramble': 'Kirjainsekoitus 5.jpeg',
        'wordsearch': 'Sanahaku 5.jpeg'
      }
    };

    // App configurations with translations
    const appConfigs: Array<{
      app: string;
      names: Record<string, string>;
      descriptions: Record<string, string>;
      category: string;
      difficulty: 'Easy' | 'Medium' | 'Hard';
      ageRange: Record<string, string>;
    }> = [
      { app: 'addition', names: { en: 'Addition', de: 'Addition', fr: 'Addition', es: 'Suma', it: 'Addizione', pt: 'Adição', nl: 'Optellen', sv: 'Addition', da: 'Addition', no: 'Addisjon', fi: 'Yhteenlasku' }, descriptions: { en: 'Fun addition practice', de: 'Spaßige Additionsübungen', fr: 'Exercices d\'addition amusants', es: 'Práctica de suma divertida', it: 'Esercizi di addizione divertenti', pt: 'Prática divertida de adição', nl: 'Leuk optellen oefenen', sv: 'Rolig additionsövning', da: 'Sjov additionsøvelse', no: 'Moro med addisjon', fi: 'Hauska yhteenlaskuharjoitus' }, category: 'math', difficulty: 'Easy', ageRange: { en: '5-7 years', de: '5-7 Jahre', fr: '5-7 ans', es: '5-7 años', it: '5-7 anni', pt: '5-7 anos', nl: '5-7 jaar', sv: '5-7 år', da: '5-7 år', no: '5-7 år', fi: '5-7 vuotta' } },
      { app: 'alphabet train', names: { en: 'Alphabet Train', de: 'Alphabet-Zug', fr: 'Train Alphabet', es: 'Tren del Alfabeto', it: 'Treno dell\'Alfabeto', pt: 'Comboio do Alfabeto', nl: 'Alfabettrein', sv: 'Alfabetståg', da: 'Alfabettog', no: 'Alfabettog', fi: 'Aakkosjuna' }, descriptions: { en: 'Learn letters with train cars', de: 'Buchstaben lernen mit Zugwaggons', fr: 'Apprendre les lettres avec des wagons', es: 'Aprende letras con vagones', it: 'Impara le lettere con i vagoni', pt: 'Aprenda letras com vagões', nl: 'Leer letters met treinwagons', sv: 'Lär dig bokstäver med tågvagnar', da: 'Lær bogstaver med togvogne', no: 'Lær bokstaver med togvogner', fi: 'Opi kirjaimia junavaunuilla' }, category: 'literacy', difficulty: 'Easy', ageRange: { en: '3-5 years', de: '3-5 Jahre', fr: '3-5 ans', es: '3-5 años', it: '3-5 anni', pt: '3-5 anos', nl: '3-5 jaar', sv: '3-5 år', da: '3-5 år', no: '3-5 år', fi: '3-5 vuotta' } },
      { app: 'big small', names: { en: 'Big vs Small', de: 'Groß oder Klein', fr: 'Grand ou Petit', es: 'Grande o Pequeño', it: 'Grande o Piccolo', pt: 'Grande ou Pequeno', nl: 'Groot of Klein', sv: 'Stor eller Liten', da: 'Stort eller Lille', no: 'Stort eller Lite', fi: 'Iso vai Pieni' }, descriptions: { en: 'Compare sizes and learn concepts', de: 'Größen vergleichen und Konzepte lernen', fr: 'Comparez les tailles et apprenez', es: 'Compara tamaños y aprende conceptos', it: 'Confronta le dimensioni e impara', pt: 'Compare tamanhos e aprenda conceitos', nl: 'Vergelijk formaten en leer concepten', sv: 'Jämför storlekar och lär dig koncept', da: 'Sammenlign størrelser og lær koncepter', no: 'Sammenlign størrelser og lær konsepter', fi: 'Vertaa kokoja ja opi käsitteitä' }, category: 'logic', difficulty: 'Easy', ageRange: { en: '3-5 years', de: '3-5 Jahre', fr: '3-5 ans', es: '3-5 años', it: '3-5 anni', pt: '3-5 anos', nl: '3-5 jaar', sv: '3-5 år', da: '3-5 år', no: '3-5 år', fi: '3-5 vuotta' } },
      { app: 'bingo', names: { en: 'Picture Bingo', de: 'Bilder-Bingo', fr: 'Loto d\'Images', es: 'Bingo de Imágenes', it: 'Tombola', pt: 'Bingo de Imagens', nl: 'Plaatjesbingo', sv: 'Bildbingo', da: 'Billedbingo', no: 'Bildebingo', fi: 'Kuvabingo' }, descriptions: { en: 'Fun bingo with pictures', de: 'Spaßiges Bingo mit Bildern', fr: 'Loto amusant avec des images', es: 'Bingo divertido con imágenes', it: 'Tombola divertente con immagini', pt: 'Bingo divertido com imagens', nl: 'Leuk bingo met plaatjes', sv: 'Roligt bingo med bilder', da: 'Sjov bingo med billeder', no: 'Moro bingo med bilder', fi: 'Hauska bingo kuvilla' }, category: 'puzzle', difficulty: 'Easy', ageRange: { en: '4-8 years', de: '4-8 Jahre', fr: '4-8 ans', es: '4-8 años', it: '4-8 anni', pt: '4-8 anos', nl: '4-8 jaar', sv: '4-8 år', da: '4-8 år', no: '4-8 år', fi: '4-8 vuotta' } },
      { app: 'chart count', names: { en: 'Chart & Count', de: 'Bilddiagramm', fr: 'Graphique & Compter', es: 'Gráfico y Contar', it: 'Grafico e Conta', pt: 'Gráfico e Contar', nl: 'Grafiek & Tellen', sv: 'Bilddiagram', da: 'Billediagram', no: 'Bildediagram', fi: 'Kuvakaavio' }, descriptions: { en: 'Learn data visualization', de: 'Datenvisualisierung lernen', fr: 'Apprendre la visualisation de données', es: 'Aprende visualización de datos', it: 'Impara visualizzazione dati', pt: 'Aprenda visualização de dados', nl: 'Leer datavisualisatie', sv: 'Lär dig datavisualisering', da: 'Lær datavisualisering', no: 'Lær datavisualisering', fi: 'Opi tiedon visualisointia' }, category: 'math', difficulty: 'Medium', ageRange: { en: '6-9 years', de: '6-9 Jahre', fr: '6-9 ans', es: '6-9 años', it: '6-9 anni', pt: '6-9 anos', nl: '6-9 jaar', sv: '6-9 år', da: '6-9 år', no: '6-9 år', fi: '6-9 vuotta' } },
      { app: 'code addition', names: { en: 'Code Addition', de: 'Code-Addition', fr: 'Addition Codée', es: 'Código Secreto Suma', it: 'Codice Segreto Addizione', pt: 'Código Secreto Adição', nl: 'Code Optellen', sv: 'Kodaddition', da: 'Kode Addition', no: 'Kode Addisjon', fi: 'Koodi Yhteenlasku' }, descriptions: { en: 'Crack the code with math', de: 'Knacke den Code mit Mathe', fr: 'Déchiffrez le code avec les maths', es: 'Descifra el código con matemáticas', it: 'Decifra il codice con la matematica', pt: 'Decifre o código com matemática', nl: 'Kraak de code met rekenen', sv: 'Knäck koden med matte', da: 'Knæk koden med matematik', no: 'Knekk koden med matte', fi: 'Murra koodi matematiikalla' }, category: 'math', difficulty: 'Medium', ageRange: { en: '6-8 years', de: '6-8 Jahre', fr: '6-8 ans', es: '6-8 años', it: '6-8 anni', pt: '6-8 anos', nl: '6-8 jaar', sv: '6-8 år', da: '6-8 år', no: '6-8 år', fi: '6-8 vuotta' } },
      { app: 'coloring', names: { en: 'Coloring', de: 'Ausmalen', fr: 'Coloriage', es: 'Colorear', it: 'Colorare', pt: 'Colorir', nl: 'Kleuren', sv: 'Färgläggning', da: 'Farvelægning', no: 'Fargelegging', fi: 'Värittäminen' }, descriptions: { en: 'Creative coloring pages', de: 'Kreative Ausmalbilder', fr: 'Pages de coloriage créatives', es: 'Páginas para colorear creativas', it: 'Pagine da colorare creative', pt: 'Páginas para colorir criativas', nl: 'Creatieve kleurplaten', sv: 'Kreativa målarbilder', da: 'Kreative tegninger', no: 'Kreative fargeleggingssider', fi: 'Luovat värityssivut' }, category: 'creativity', difficulty: 'Easy', ageRange: { en: '3-8 years', de: '3-8 Jahre', fr: '3-8 ans', es: '3-8 años', it: '3-8 anni', pt: '3-8 anos', nl: '3-8 jaar', sv: '3-8 år', da: '3-8 år', no: '3-8 år', fi: '3-8 vuotta' } },
      { app: 'crossword', names: { en: 'Picture Crossword', de: 'Bilderkreuzworträtsel', fr: 'Mots Croisés', es: 'Crucigrama', it: 'Cruciverba', pt: 'Palavras Cruzadas', nl: 'Kruiswoordpuzzel', sv: 'Bildkorsord', da: 'Billedkrydsord', no: 'Bildekryssord', fi: 'Kuvaristikko' }, descriptions: { en: 'Picture-based crossword puzzles', de: 'Bildbasierte Kreuzworträtsel', fr: 'Mots croisés basés sur des images', es: 'Crucigramas basados en imágenes', it: 'Cruciverba basati su immagini', pt: 'Palavras cruzadas com imagens', nl: 'Kruiswoord met plaatjes', sv: 'Bildbaserade korsord', da: 'Billedbaserede krydsord', no: 'Bildebaserte kryssord', fi: 'Kuvapohjaiset ristikot' }, category: 'literacy', difficulty: 'Medium', ageRange: { en: '6-10 years', de: '6-10 Jahre', fr: '6-10 ans', es: '6-10 años', it: '6-10 anni', pt: '6-10 anos', nl: '6-10 jaar', sv: '6-10 år', da: '6-10 år', no: '6-10 år', fi: '6-10 vuotta' } },
      { app: 'cryptogram', names: { en: 'Picture Cryptogram', de: 'Bilder-Kryptogramm', fr: 'Cryptogramme', es: 'Criptograma', it: 'Crittogramma', pt: 'Criptograma', nl: 'Cryptogram', sv: 'Bildkryptogram', da: 'Billed-Kryptogram', no: 'Bildekryptogram', fi: 'Kuvakryptogrammi' }, descriptions: { en: 'Decode secret picture messages', de: 'Entschlüssle geheime Bildnachrichten', fr: 'Décodez les messages secrets', es: 'Descifra mensajes secretos', it: 'Decodifica messaggi segreti', pt: 'Decodifique mensagens secretas', nl: 'Ontcijfer geheime berichten', sv: 'Avkoda hemliga meddelanden', da: 'Afkod hemmelige beskeder', no: 'Dekod hemmelige meldinger', fi: 'Pura salaiset viestit' }, category: 'puzzle', difficulty: 'Medium', ageRange: { en: '6-10 years', de: '6-10 Jahre', fr: '6-10 ans', es: '6-10 años', it: '6-10 anni', pt: '6-10 anos', nl: '6-10 jaar', sv: '6-10 år', da: '6-10 år', no: '6-10 år', fi: '6-10 vuotta' } },
      { app: 'draw and color', names: { en: 'Draw and Color', de: 'Zeichnen und Ausmalen', fr: 'Dessine et Colorie', es: 'Dibuja y Colorea', it: 'Disegna e Colora', pt: 'Desenha e Pinta', nl: 'Teken en Kleur', sv: 'Rita och Färglägg', da: 'Tegn og Farvlæg', no: 'Tegn og Fargelegg', fi: 'Piirrä ja Väritä' }, descriptions: { en: 'Draw and color activities', de: 'Zeichen- und Malaktivitäten', fr: 'Activités de dessin et coloriage', es: 'Actividades de dibujo y coloreo', it: 'Attività di disegno e colorazione', pt: 'Atividades de desenho e pintura', nl: 'Teken- en kleuractiviteiten', sv: 'Rita och färglägg aktiviteter', da: 'Tegne og farvelæg aktiviteter', no: 'Tegne og fargelegg aktiviteter', fi: 'Piirustus- ja väritysaktiviteetit' }, category: 'creativity', difficulty: 'Easy', ageRange: { en: '4-8 years', de: '4-8 Jahre', fr: '4-8 ans', es: '4-8 años', it: '4-8 anni', pt: '4-8 anos', nl: '4-8 jaar', sv: '4-8 år', da: '4-8 år', no: '4-8 år', fi: '4-8 vuotta' } },
      { app: 'drawing lines', names: { en: 'Drawing Lines', de: 'Linien Zeichnen', fr: 'Tracer des Lignes', es: 'Dibujar Líneas', it: 'Disegno di Linee', pt: 'Desenhar Linhas', nl: 'Lijnen Tekenen', sv: 'Rita Linjer', da: 'Tegne Linjer', no: 'Tegne Linjer', fi: 'Viivojen Piirtäminen' }, descriptions: { en: 'Practice fine motor skills', de: 'Feinmotorik üben', fr: 'Pratiquer la motricité fine', es: 'Practica motricidad fina', it: 'Pratica motricità fine', pt: 'Pratique motricidade fina', nl: 'Oefen fijne motoriek', sv: 'Träna finmotorik', da: 'Øv finmotorik', no: 'Øv finmotorikk', fi: 'Harjoittele hienomotoriikkaa' }, category: 'motor skills', difficulty: 'Easy', ageRange: { en: '3-5 years', de: '3-5 Jahre', fr: '3-5 ans', es: '3-5 años', it: '3-5 anni', pt: '3-5 anos', nl: '3-5 jaar', sv: '3-5 år', da: '3-5 år', no: '3-5 år', fi: '3-5 vuotta' } },
      { app: 'find and count', names: { en: 'Find and Count', de: 'Suchen und Zählen', fr: 'Trouve et Compte', es: 'Encuentra y Cuenta', it: 'Trova e Conta', pt: 'Encontra e Conta', nl: 'Zoek en Tel', sv: 'Hitta och Räkna', da: 'Find og Tæl', no: 'Finn og Tell', fi: 'Etsi ja Laske' }, descriptions: { en: 'I spy counting game', de: 'Ich-sehe-was Zählspiel', fr: 'Jeu de recherche et comptage', es: 'Juego de buscar y contar', it: 'Gioco cerca e conta', pt: 'Jogo de encontrar e contar', nl: 'Zoek en tel spel', sv: 'Sök och räkna spel', da: 'Find og tæl spil', no: 'Finn og tell spill', fi: 'Etsi ja laske peli' }, category: 'math', difficulty: 'Easy', ageRange: { en: '4-7 years', de: '4-7 Jahre', fr: '4-7 ans', es: '4-7 años', it: '4-7 anni', pt: '4-7 anos', nl: '4-7 jaar', sv: '4-7 år', da: '4-7 år', no: '4-7 år', fi: '4-7 vuotta' } },
      { app: 'find objects', names: { en: 'Find Objects', de: 'Finde die Objekte', fr: 'Trouve les Objets', es: 'Encuentra Objetos', it: 'Trova gli Oggetti', pt: 'Encontra Objetos', nl: 'Vind Objecten', sv: 'Hitta Objekt', da: 'Find Objekter', no: 'Finn Objekter', fi: 'Löydä Esineet' }, descriptions: { en: 'Hidden object search', de: 'Versteckte Objekte suchen', fr: 'Recherche d\'objets cachés', es: 'Búsqueda de objetos ocultos', it: 'Cerca oggetti nascosti', pt: 'Busca de objetos escondidos', nl: 'Verborgen objecten zoeken', sv: 'Sök gömda objekt', da: 'Søg skjulte objekter', no: 'Søk skjulte objekter', fi: 'Etsi piilotettuja esineitä' }, category: 'puzzle', difficulty: 'Easy', ageRange: { en: '5-8 years', de: '5-8 Jahre', fr: '5-8 ans', es: '5-8 años', it: '5-8 anni', pt: '5-8 anos', nl: '5-8 jaar', sv: '5-8 år', da: '5-8 år', no: '5-8 år', fi: '5-8 vuotta' } },
      { app: 'grid match', names: { en: 'Grid Match', de: 'Raster-Puzzle', fr: 'Puzzle Grille', es: 'Puzzle de Cuadrícula', it: 'Puzzle a Griglia', pt: 'Quebra-Cabeça de Grade', nl: 'Rasterpuzzel', sv: 'Rutnätspussel', da: 'Gitterpuslespil', no: 'Rutenettspuslespill', fi: 'Ruudukkopalapeli' }, descriptions: { en: 'Match grid patterns', de: 'Rastermuster zuordnen', fr: 'Associez les motifs de grille', es: 'Combina patrones de cuadrícula', it: 'Abbina i pattern della griglia', pt: 'Combine padrões de grade', nl: 'Match rasterpatronen', sv: 'Matcha rutnätsmönster', da: 'Match gittermønstre', no: 'Match rutenettmønstre', fi: 'Yhdistä ruudukkomallit' }, category: 'logic', difficulty: 'Medium', ageRange: { en: '5-8 years', de: '5-8 Jahre', fr: '5-8 ans', es: '5-8 años', it: '5-8 anni', pt: '5-8 anos', nl: '5-8 jaar', sv: '5-8 år', da: '5-8 år', no: '5-8 år', fi: '5-8 vuotta' } },
      { app: 'matching', names: { en: 'Matching', de: 'Paare Finden', fr: 'Associations', es: 'Encuentra Parejas', it: 'Trova le Coppie', pt: 'Encontre os Pares', nl: 'Zoek de Paren', sv: 'Matchning', da: 'Find Parrene', no: 'Finn Parene', fi: 'Yhdistä Parit' }, descriptions: { en: 'Match related pictures', de: 'Zusammengehörige Bilder finden', fr: 'Associez les images', es: 'Empareja imágenes relacionadas', it: 'Abbina immagini correlate', pt: 'Combine imagens relacionadas', nl: 'Match gerelateerde plaatjes', sv: 'Matcha relaterade bilder', da: 'Match relaterede billeder', no: 'Match relaterte bilder', fi: 'Yhdistä liittyvät kuvat' }, category: 'logic', difficulty: 'Easy', ageRange: { en: '4-7 years', de: '4-7 Jahre', fr: '4-7 ans', es: '4-7 años', it: '4-7 anni', pt: '4-7 anos', nl: '4-7 jaar', sv: '4-7 år', da: '4-7 år', no: '4-7 år', fi: '4-7 vuotta' } },
      { app: 'math puzzle', names: { en: 'Math Puzzle', de: 'Mathe-Rätsel', fr: 'Casse-Têtes Mathématiques', es: 'Rompecabezas Matemáticos', it: 'Rompicapi Matematici', pt: 'Quebra-Cabeças Matemático', nl: 'Wiskundepuzzels', sv: 'Mattepussel', da: 'Mattepuslespil', no: 'Mattepuslespill', fi: 'Matematiikkapulmat' }, descriptions: { en: 'Fun math challenges', de: 'Spaßige Mathe-Herausforderungen', fr: 'Défis mathématiques amusants', es: 'Desafíos matemáticos divertidos', it: 'Sfide matematiche divertenti', pt: 'Desafios matemáticos divertidos', nl: 'Leuke wiskundige uitdagingen', sv: 'Roliga matteutmaningar', da: 'Sjove matteudfordringer', no: 'Morsomme matteutfordringer', fi: 'Hauskat matematiikkahaasteet' }, category: 'math', difficulty: 'Medium', ageRange: { en: '6-10 years', de: '6-10 Jahre', fr: '6-10 ans', es: '6-10 años', it: '6-10 anni', pt: '6-10 anos', nl: '6-10 jaar', sv: '6-10 år', da: '6-10 år', no: '6-10 år', fi: '6-10 vuotta' } },
      { app: 'math worksheet', names: { en: 'Math Worksheet', de: 'Mathe-Übungsblatt', fr: 'Feuille de Mathématique', es: 'Hoja de Matemáticas', it: 'Scheda di Matematica', pt: 'Folha de Matemática', nl: 'Wiskundeblad', sv: 'Matteblad', da: 'Matematikopgave', no: 'Matematikkoppgave', fi: 'Matematiikkalehti' }, descriptions: { en: 'Practice math problems', de: 'Matheaufgaben üben', fr: 'Pratiquez les problèmes de maths', es: 'Practica problemas de matemáticas', it: 'Esercitati con problemi di matematica', pt: 'Pratique problemas de matemática', nl: 'Oefen wiskundeproblemen', sv: 'Öva mattetal', da: 'Øv matematikopgaver', no: 'Øv matteoppgaver', fi: 'Harjoittele matemaattisia tehtäviä' }, category: 'math', difficulty: 'Medium', ageRange: { en: '5-9 years', de: '5-9 Jahre', fr: '5-9 ans', es: '5-9 años', it: '5-9 anni', pt: '5-9 anos', nl: '5-9 jaar', sv: '5-9 år', da: '5-9 år', no: '5-9 år', fi: '5-9 vuotta' } },
      { app: 'missing pieces', names: { en: 'Missing Pieces', de: 'Fehlende Teile', fr: 'Pièces Manquantes', es: 'Piezas Perdidas', it: 'Pezzi Mancanti', pt: 'Peças em Falta', nl: 'Ontbrekende Stukjes', sv: 'Saknade Bitar', da: 'Manglende Dele', no: 'Manglende Deler', fi: 'Puuttuvat Palat' }, descriptions: { en: 'Find the missing puzzle pieces', de: 'Finde die fehlenden Puzzleteile', fr: 'Trouvez les pièces manquantes', es: 'Encuentra las piezas faltantes', it: 'Trova i pezzi mancanti', pt: 'Encontre as peças em falta', nl: 'Vind de ontbrekende stukjes', sv: 'Hitta de saknade bitarna', da: 'Find de manglende dele', no: 'Finn de manglende delene', fi: 'Löydä puuttuvat palat' }, category: 'logic', difficulty: 'Medium', ageRange: { en: '5-8 years', de: '5-8 Jahre', fr: '5-8 ans', es: '5-8 años', it: '5-8 anni', pt: '5-8 anos', nl: '5-8 jaar', sv: '5-8 år', da: '5-8 år', no: '5-8 år', fi: '5-8 vuotta' } },
      { app: 'more less', names: { en: 'More or Less', de: 'Mehr oder Weniger', fr: 'Plus ou Moins', es: 'Más o Menos', it: 'Più o Meno', pt: 'Mais ou Menos', nl: 'Meer of Minder', sv: 'Mer eller Mindre', da: 'Mere eller Mindre', no: 'Mer eller Mindre', fi: 'Enemmän vai Vähemmän' }, descriptions: { en: 'Compare quantities', de: 'Mengen vergleichen', fr: 'Comparez les quantités', es: 'Compara cantidades', it: 'Confronta le quantità', pt: 'Compare quantidades', nl: 'Vergelijk hoeveelheden', sv: 'Jämför mängder', da: 'Sammenlign mængder', no: 'Sammenlign mengder', fi: 'Vertaa määriä' }, category: 'math', difficulty: 'Easy', ageRange: { en: '4-6 years', de: '4-6 Jahre', fr: '4-6 ans', es: '4-6 años', it: '4-6 anni', pt: '4-6 anos', nl: '4-6 jaar', sv: '4-6 år', da: '4-6 år', no: '4-6 år', fi: '4-6 vuotta' } },
      { app: 'odd one out', names: { en: 'Odd One Out', de: 'Finde das Andere', fr: 'Trouve l\'Intrus', es: 'Encuentra el Diferente', it: 'Trova il Diverso', pt: 'Encontra o Diferente', nl: 'Vind de Vreemde Eend', sv: 'Hitta Udda', da: 'Find den Ulige', no: 'Finn den Rare', fi: 'Löydä Outo' }, descriptions: { en: 'Find the different item', de: 'Finde das unterschiedliche Objekt', fr: 'Trouvez l\'élément différent', es: 'Encuentra el elemento diferente', it: 'Trova l\'elemento diverso', pt: 'Encontre o item diferente', nl: 'Vind het andere item', sv: 'Hitta det annorlunda objektet', da: 'Find det anderledes element', no: 'Finn det forskjellige elementet', fi: 'Löydä erilainen esine' }, category: 'logic', difficulty: 'Easy', ageRange: { en: '4-7 years', de: '4-7 Jahre', fr: '4-7 ans', es: '4-7 años', it: '4-7 anni', pt: '4-7 anos', nl: '4-7 jaar', sv: '4-7 år', da: '4-7 år', no: '4-7 år', fi: '4-7 vuotta' } },
      { app: 'pattern train', names: { en: 'Pattern Train', de: 'Musterzug', fr: 'Train à Motifs', es: 'Tren de Patrones', it: 'Treno dei Modelli', pt: 'Comboio de Padrões', nl: 'Patroontrein', sv: 'Mönsterzug', da: 'Mønstertoget', no: 'Mønstertoget', fi: 'Kuviojuna' }, descriptions: { en: 'Complete pattern sequences', de: 'Mustersequenzen vervollständigen', fr: 'Complétez les séquences de motifs', es: 'Completa secuencias de patrones', it: 'Completa sequenze di modelli', pt: 'Complete sequências de padrões', nl: 'Maak patroonreeksen af', sv: 'Komplettera mönstersekvenser', da: 'Fuldfør mønstersekvenser', no: 'Fullfør mønstersekvenser', fi: 'Täydennä kuviosarjat' }, category: 'logic', difficulty: 'Medium', ageRange: { en: '5-8 years', de: '5-8 Jahre', fr: '5-8 ans', es: '5-8 años', it: '5-8 anni', pt: '5-8 anos', nl: '5-8 jaar', sv: '5-8 år', da: '5-8 år', no: '5-8 år', fi: '5-8 vuotta' } },
      { app: 'pattern worksheet', names: { en: 'Pattern Worksheet', de: 'Musterrätsel', fr: 'Puzzles de Motifs', es: 'Rompecabezas de Patrones', it: 'Puzzle di Schemi', pt: 'Quebra-cabeças de Padrões', nl: 'Patroonpuzzels', sv: 'Mönsterpussel', da: 'Mønstergåder', no: 'Mønstergåter', fi: 'Kuviotehtävät' }, descriptions: { en: 'Pattern recognition exercises', de: 'Mustererkennung üben', fr: 'Exercices de reconnaissance de motifs', es: 'Ejercicios de reconocimiento de patrones', it: 'Esercizi di riconoscimento dei modelli', pt: 'Exercícios de reconhecimento de padrões', nl: 'Patroonherkenning oefenen', sv: 'Mönsterigenkänning övningar', da: 'Mønstergenkendelse øvelser', no: 'Mønstergjenkjenning øvelser', fi: 'Kuvion tunnistusharjoitukset' }, category: 'logic', difficulty: 'Medium', ageRange: { en: '5-8 years', de: '5-8 Jahre', fr: '5-8 ans', es: '5-8 años', it: '5-8 anni', pt: '5-8 anos', nl: '5-8 jaar', sv: '5-8 år', da: '5-8 år', no: '5-8 år', fi: '5-8 vuotta' } },
      { app: 'picture path', names: { en: 'Picture Path', de: 'Bilderpfad', fr: 'Chemin d\'Images', es: 'Camino de Imágenes', it: 'Percorso di Immagini', pt: 'Caminho de Imagens', nl: 'Afbeeldingspad', sv: 'Bildväg', da: 'Billedsti', no: 'Bildesti', fi: 'Kuvapolku' }, descriptions: { en: 'Follow the picture maze', de: 'Folge dem Bilderlabyrinth', fr: 'Suivez le labyrinthe d\'images', es: 'Sigue el laberinto de imágenes', it: 'Segui il labirinto di immagini', pt: 'Siga o labirinto de imagens', nl: 'Volg het afbeeldingsdoolhof', sv: 'Följ bildlabyrinten', da: 'Følg billedlabyrinten', no: 'Følg bildelabyrinten', fi: 'Seuraa kuvalakyryyrittiä' }, category: 'logic', difficulty: 'Medium', ageRange: { en: '5-8 years', de: '5-8 Jahre', fr: '5-8 ans', es: '5-8 años', it: '5-8 anni', pt: '5-8 anos', nl: '5-8 jaar', sv: '5-8 år', da: '5-8 år', no: '5-8 år', fi: '5-8 vuotta' } },
      { app: 'picture sort', names: { en: 'Picture Sort', de: 'Bilder Sortieren', fr: 'Tri d\'Images', es: 'Clasificación de Imágenes', it: 'Classificazione Immagini', pt: 'Classificação de Imagens', nl: 'Afbeeldingen Sorteren', sv: 'Sortera Bilder', da: 'Sorter Billeder', no: 'Sorter Bilder', fi: 'Lajittele Kuvat' }, descriptions: { en: 'Sort pictures by category', de: 'Bilder nach Kategorie sortieren', fr: 'Triez les images par catégorie', es: 'Clasifica imágenes por categoría', it: 'Ordina le immagini per categoria', pt: 'Classifique imagens por categoria', nl: 'Sorteer plaatjes op categorie', sv: 'Sortera bilder efter kategori', da: 'Sorter billeder efter kategori', no: 'Sorter bilder etter kategori', fi: 'Lajittele kuvat kategorioittain' }, category: 'logic', difficulty: 'Easy', ageRange: { en: '4-7 years', de: '4-7 Jahre', fr: '4-7 ans', es: '4-7 años', it: '4-7 anni', pt: '4-7 anos', nl: '4-7 jaar', sv: '4-7 år', da: '4-7 år', no: '4-7 år', fi: '4-7 vuotta' } },
      { app: 'prepositions', names: { en: 'Prepositions', de: 'Präpositionen', fr: 'Prépositions', es: 'Preposiciones', it: 'Preposizioni', pt: 'Preposições', nl: 'Voorzetsels', sv: 'Prepositioner', da: 'Præpositioner', no: 'Preposisjoner', fi: 'Prepositiot' }, descriptions: { en: 'Learn spatial relationships', de: 'Räumliche Beziehungen lernen', fr: 'Apprenez les relations spatiales', es: 'Aprende relaciones espaciales', it: 'Impara le relazioni spaziali', pt: 'Aprenda relações espaciais', nl: 'Leer ruimtelijke relaties', sv: 'Lär dig rumsliga relationer', da: 'Lær rumlige relationer', no: 'Lær romlige relasjoner', fi: 'Opi avaruussuhteita' }, category: 'literacy', difficulty: 'Easy', ageRange: { en: '4-7 years', de: '4-7 Jahre', fr: '4-7 ans', es: '4-7 años', it: '4-7 anni', pt: '4-7 anos', nl: '4-7 jaar', sv: '4-7 år', da: '4-7 år', no: '4-7 år', fi: '4-7 vuotta' } },
      { app: 'shadow match', names: { en: 'Shadow Match', de: 'Schatten Zuordnen', fr: 'Trouve l\'Ombre', es: 'Empareja las Sombras', it: 'Abbina le Ombre', pt: 'Combine as Sombras', nl: 'Schaduw Koppelen', sv: 'Skuggmatchning', da: 'Skyggematch', no: 'Skyggematch', fi: 'Varjoyhdistäminen' }, descriptions: { en: 'Match pictures to shadows', de: 'Bilder zu Schatten zuordnen', fr: 'Associez les images aux ombres', es: 'Empareja imágenes con sombras', it: 'Abbina le immagini alle ombre', pt: 'Combine imagens com sombras', nl: 'Match plaatjes met schaduwen', sv: 'Matcha bilder med skuggor', da: 'Match billeder til skygger', no: 'Match bilder til skygger', fi: 'Yhdistä kuvat varjoihin' }, category: 'logic', difficulty: 'Easy', ageRange: { en: '3-6 years', de: '3-6 Jahre', fr: '3-6 ans', es: '3-6 años', it: '3-6 anni', pt: '3-6 anos', nl: '3-6 jaar', sv: '3-6 år', da: '3-6 år', no: '3-6 år', fi: '3-6 vuotta' } },
      { app: 'subtraction', names: { en: 'Subtraction', de: 'Subtraktion', fr: 'Soustraction', es: 'Resta', it: 'Sottrazione', pt: 'Subtração', nl: 'Aftrekken', sv: 'Subtraktion', da: 'Subtraktion', no: 'Subtraksjon', fi: 'Vähennyslasku' }, descriptions: { en: 'Fun subtraction practice', de: 'Spaßige Subtraktionsübungen', fr: 'Exercices de soustraction amusants', es: 'Práctica de resta divertida', it: 'Esercizi di sottrazione divertenti', pt: 'Prática divertida de subtração', nl: 'Leuk aftrekken oefenen', sv: 'Rolig subtraktionsövning', da: 'Sjov subtraktionsøvelse', no: 'Moro med subtraksjon', fi: 'Hauska vähennyslasku' }, category: 'math', difficulty: 'Easy', ageRange: { en: '5-7 years', de: '5-7 Jahre', fr: '5-7 ans', es: '5-7 años', it: '5-7 anni', pt: '5-7 anos', nl: '5-7 jaar', sv: '5-7 år', da: '5-7 år', no: '5-7 år', fi: '5-7 vuotta' } },
      { app: 'sudoku', names: { en: 'Picture Sudoku', de: 'Bilder-Sudoku', fr: 'Sudoku en Images', es: 'Sudoku de Imágenes', it: 'Sudoku con Immagini', pt: 'Sudoku de Imagens', nl: 'Plaatjes Sudoku', sv: 'Bildsudoku', da: 'Billed-Sudoku', no: 'Bilde-Sudoku', fi: 'Kuva-Sudoku' }, descriptions: { en: 'Sudoku with pictures', de: 'Sudoku mit Bildern', fr: 'Sudoku avec des images', es: 'Sudoku con imágenes', it: 'Sudoku con immagini', pt: 'Sudoku com imagens', nl: 'Sudoku met plaatjes', sv: 'Sudoku med bilder', da: 'Sudoku med billeder', no: 'Sudoku med bilder', fi: 'Sudoku kuvilla' }, category: 'logic', difficulty: 'Hard', ageRange: { en: '6-10 years', de: '6-10 Jahre', fr: '6-10 ans', es: '6-10 años', it: '6-10 anni', pt: '6-10 anos', nl: '6-10 jaar', sv: '6-10 år', da: '6-10 år', no: '6-10 år', fi: '6-10 vuotta' } },
      { app: 'treasure hunt', names: { en: 'Treasure Hunt', de: 'Schatzsuche', fr: 'Chasse au Trésor', es: 'Búsqueda del Tesoro', it: 'Caccia al Tesoro', pt: 'Caça ao Tesouro', nl: 'Schattenjacht', sv: 'Skattjakt', da: 'Skattejagt', no: 'Skattejakt', fi: 'Aarteenetsintä' }, descriptions: { en: 'Find the hidden treasures', de: 'Finde die versteckten Schätze', fr: 'Trouvez les trésors cachés', es: 'Encuentra los tesoros escondidos', it: 'Trova i tesori nascosti', pt: 'Encontre os tesouros escondidos', nl: 'Vind de verborgen schatten', sv: 'Hitta de gömda skatterna', da: 'Find de skjulte skatte', no: 'Finn de skjulte skattene', fi: 'Löydä piilotetut aarteet' }, category: 'puzzle', difficulty: 'Medium', ageRange: { en: '5-9 years', de: '5-9 Jahre', fr: '5-9 ans', es: '5-9 años', it: '5-9 anni', pt: '5-9 anos', nl: '5-9 jaar', sv: '5-9 år', da: '5-9 år', no: '5-9 år', fi: '5-9 vuotta' } },
      { app: 'word guess', names: { en: 'Word Guess', de: 'Wörter-Rätsel', fr: 'Devine le Mot', es: 'Adivina la Palabra', it: 'Indovina la Parola', pt: 'Adivinha a Palavra', nl: 'Raad het Woord', sv: 'Gissa Ordet', da: 'Gæt Ordet', no: 'Gjett Ordet', fi: 'Arvaa Sana' }, descriptions: { en: 'Guess words from pictures', de: 'Wörter aus Bildern erraten', fr: 'Devinez les mots à partir des images', es: 'Adivina palabras por imágenes', it: 'Indovina parole dalle immagini', pt: 'Adivinhe palavras pelas imagens', nl: 'Raad woorden uit plaatjes', sv: 'Gissa ord från bilder', da: 'Gæt ord fra billeder', no: 'Gjett ord fra bilder', fi: 'Arvaa sanat kuvista' }, category: 'literacy', difficulty: 'Medium', ageRange: { en: '5-8 years', de: '5-8 Jahre', fr: '5-8 ans', es: '5-8 años', it: '5-8 anni', pt: '5-8 anos', nl: '5-8 jaar', sv: '5-8 år', da: '5-8 år', no: '5-8 år', fi: '5-8 vuotta' } },
      { app: 'word scramble', names: { en: 'Word Scramble', de: 'Buchstabensalat', fr: 'Mots Mêlés', es: 'Palabras Revueltas', it: 'Lettere Mescolate', pt: 'Letras Embaralhadas', nl: 'Letterwarrel', sv: 'Ordmix', da: 'Bogstavrod', no: 'Bokstavblanding', fi: 'Kirjainsekoitus' }, descriptions: { en: 'Unscramble the letters', de: 'Buchstaben entwirren', fr: 'Démêlez les lettres', es: 'Desordena las letras', it: 'Riordina le lettere', pt: 'Desembaralhe as letras', nl: 'Ontwar de letters', sv: 'Lösa bokstavspusslet', da: 'Løs bogstavpuslespillet', no: 'Løs bokstavpuslespillet', fi: 'Ratkaise kirjainpulmia' }, category: 'literacy', difficulty: 'Medium', ageRange: { en: '6-9 years', de: '6-9 Jahre', fr: '6-9 ans', es: '6-9 años', it: '6-9 anni', pt: '6-9 anos', nl: '6-9 jaar', sv: '6-9 år', da: '6-9 år', no: '6-9 år', fi: '6-9 vuotta' } },
      { app: 'wordsearch', names: { en: 'Word Search', de: 'Wörtersuche', fr: 'Mots Cachés', es: 'Sopa de Letras', it: 'Cerca Parole', pt: 'Caça-Palavras', nl: 'Woordzoeker', sv: 'Ordletning', da: 'Ordsøgning', no: 'Ordleting', fi: 'Sanahaku' }, descriptions: { en: 'Find hidden words', de: 'Versteckte Wörter finden', fr: 'Trouvez les mots cachés', es: 'Encuentra palabras escondidas', it: 'Trova le parole nascoste', pt: 'Encontre palavras escondidas', nl: 'Vind verborgen woorden', sv: 'Hitta gömda ord', da: 'Find skjulte ord', no: 'Finn skjulte ord', fi: 'Löydä piilotettuja sanoja' }, category: 'literacy', difficulty: 'Medium', ageRange: { en: '6-10 years', de: '6-10 Jahre', fr: '6-10 ans', es: '6-10 años', it: '6-10 anni', pt: '6-10 anos', nl: '6-10 jaar', sv: '6-10 år', da: '6-10 år', no: '6-10 år', fi: '6-10 vuotta' } },
      { app: 'writing', names: { en: 'Writing Practice', de: 'Schreibübungen', fr: 'Pratique d\'Écriture', es: 'Práctica de Escritura', it: 'Pratica di Scrittura', pt: 'Prática de Escrita', nl: 'Schrijfoefeningen', sv: 'Skrivövningar', da: 'Skriveøvelser', no: 'Skriveøvelser', fi: 'Kirjoitusharjoitukset' }, descriptions: { en: 'Handwriting practice worksheets', de: 'Handschrift-Übungsblätter', fr: 'Feuilles de pratique d\'écriture', es: 'Hojas de práctica de escritura', it: 'Fogli di pratica di scrittura', pt: 'Folhas de prática de escrita', nl: 'Handschrift oefenbladen', sv: 'Handskrift övningsblad', da: 'Håndskrift øvelsesark', no: 'Håndskrift øvelsesark', fi: 'Käsiala harjoituslehdet' }, category: 'literacy', difficulty: 'Easy', ageRange: { en: '4-7 years', de: '4-7 Jahre', fr: '4-7 ans', es: '4-7 años', it: '4-7 anni', pt: '4-7 anos', nl: '4-7 jaar', sv: '4-7 år', da: '4-7 år', no: '4-7 år', fi: '4-7 vuotta' } }
    ];

    // For English, return just 6 default samples
    if (locale === 'en') {
      return [
        { name: appConfigs[1].names, description: appConfigs[1].descriptions, category: appConfigs[1].category, difficulty: appConfigs[1].difficulty, age_range: appConfigs[1].ageRange, image_url: '/worksheet-samples/alphabet.png', featured: true, sort_order: 1 },
        { name: appConfigs[5].names, description: appConfigs[5].descriptions, category: appConfigs[5].category, difficulty: appConfigs[5].difficulty, age_range: appConfigs[5].ageRange, image_url: '/worksheet-samples/code-addition.png', featured: false, sort_order: 2 },
        { name: appConfigs[4].names, description: appConfigs[4].descriptions, category: appConfigs[4].category, difficulty: appConfigs[4].difficulty, age_range: appConfigs[4].ageRange, image_url: '/worksheet-samples/graph.png', featured: false, sort_order: 3 },
        { name: appConfigs[12].names, description: appConfigs[12].descriptions, category: appConfigs[12].category, difficulty: appConfigs[12].difficulty, age_range: appConfigs[12].ageRange, image_url: '/worksheet-samples/hidden-object.png', featured: true, sort_order: 4 },
        { name: appConfigs[11].names, description: appConfigs[11].descriptions, category: appConfigs[11].category, difficulty: appConfigs[11].difficulty, age_range: appConfigs[11].ageRange, image_url: '/worksheet-samples/i-spy.png', featured: false, sort_order: 5 },
        { name: appConfigs[21].names, description: appConfigs[21].descriptions, category: appConfigs[21].category, difficulty: appConfigs[21].difficulty, age_range: appConfigs[21].ageRange, image_url: '/worksheet-samples/train.png', featured: true, sort_order: 6 }
      ];
    }

    // For non-English locales, return 33 samples with locale-specific images
    const langFolder = languageFolders[locale] || 'english';
    const langSamples = localeSamples[locale] || {};

    const samples: WorksheetSample[] = [];
    appConfigs.forEach((config, index) => {
      // Coloring and Writing use English samples for all languages
      let imageUrl: string;
      if (config.app === 'coloring') {
        imageUrl = '/samples/english/coloring/coloring landscape 3.png';
      } else if (config.app === 'writing') {
        imageUrl = '/samples/english/writing/writing custom.jpeg';
      } else {
        // Get the locale-specific sample filename
        const filename = langSamples[config.app];
        if (filename) {
          imageUrl = `/samples/${langFolder}/${config.app}/${filename}`;
        } else {
          // Fallback to English if no locale-specific sample exists
          imageUrl = `/samples/english/${config.app}/worksheet.jpeg`;
        }
      }

      samples.push({
        name: config.names,
        description: config.descriptions,
        category: config.category,
        difficulty: config.difficulty,
        age_range: config.ageRange,
        image_url: imageUrl,
        featured: index < 6,
        sort_order: index + 1
      });
    });

    return samples;
  }

  // Get pricing tiers
  private async getPricingTiers(locale: string): Promise<PricingTier[]> {
    try {
      const response = await fetch(`${this.directusUrl}/items/homepage_pricing?sort=sort_order`, {
        headers: {
          'Authorization': `Bearer ${this.apiToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          return data.data;
        }
      }
    } catch (error) {
      console.error('Error fetching pricing:', error);
    }

    // Return default pricing
    return [
      {
        name: { en: 'Free', sv: 'Gratis' },
        price: '$0',
        price_period: '',
        features: {
          en: ['Word Search Generator', 'Limited image library', 'Watermarked output', 'Basic support'],
          sv: ['Ordsökningsgenerator', 'Begränsat bildbibliotek', 'Vattenmärkt utdata', 'Grundläggande support']
        },
        cta_text: { en: 'Start Free', sv: 'Börja gratis' },
        cta_link: '/signup',
        highlighted: false,
        badge_text: {},
        sort_order: 1
      },
      {
        name: { en: 'Core Bundle', sv: 'Kärnpaket' },
        price: '$15',
        price_period: '/mo',
        features: {
          en: ['10 most popular apps', 'Full image library access', 'No watermarks', 'POD commercial license', 'Priority support'],
          sv: ['10 mest populära appar', 'Full tillgång till bildbibliotek', 'Inga vattenmärken', 'POD kommersiell licens', 'Prioriterad support']
        },
        cta_text: { en: 'Start Core', sv: 'Börja Core' },
        cta_link: '/signup?plan=core',
        highlighted: false,
        badge_text: {},
        sort_order: 2
      },
      {
        name: { en: 'Full Access', sv: 'Full tillgång' },
        price: '$25',
        price_period: '/mo',
        features: {
          en: ['All 33 apps', 'Full image library access', 'No watermarks', 'POD commercial license', 'Priority support', 'Early access to new apps'],
          sv: ['Alla 33 appar', 'Full tillgång till bildbibliotek', 'Inga vattenmärken', 'POD kommersiell licens', 'Prioriterad support', 'Tidig tillgång till nya appar']
        },
        cta_text: { en: 'Start Full Access', sv: 'Börja Full Access' },
        cta_link: '/signup?plan=full',
        highlighted: true,
        badge_text: { en: 'Most Popular', sv: 'Mest populär' },
        sort_order: 3
      }
    ];
  }

  // Get SEO content
  private async getSEOContent(locale: string): Promise<HomepageContent['seo']> {
    try {
      const response = await fetch(`${this.directusUrl}/items/homepage_seo`, {
        headers: {
          'Authorization': `Bearer ${this.apiToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          return data.data[0];
        }
      }
    } catch (error) {
      console.error('Error fetching SEO content:', error);
    }

    return {
      title: {
        en: 'LessonCraftStudio - Professional Worksheet Generator',
        sv: 'LessonCraftStudio - Professionell arbetsbladsgenerator'
      },
      description: {
        en: '33 powerful worksheet generators with 100+ themed images for Teachers Pay Teachers sellers and educational publishers',
        sv: '33 kraftfulla arbetsbladsgeneratorer med 100+ temabilder för Teachers Pay Teachers-säljare och utbildningsförlag'
      },
      keywords: {
        en: 'worksheet generator, teachers pay teachers, educational resources, printable worksheets, POD license',
        sv: 'arbetsbladsgenerator, lärare betalar lärare, utbildningsresurser, utskrivbara arbetsblad, POD-licens'
      }
    };
  }


  // Load content from database
  private async loadFromDatabase(): Promise<HomepageContent | null> {
    try {
      const record = await prisma.homepageContent.findUnique({
        where: { id: 'homepage' }
      });

      if (record && record.content) {
        return record.content as unknown as HomepageContent;
      }

      return null;
    } catch (error) {
      console.error('Error loading from database:', error);
      return null;
    }
  }

  // Save content to database
  private async saveToDatabase(content: HomepageContent): Promise<void> {
    try {
      await prisma.homepageContent.upsert({
        where: { id: 'homepage' },
        update: {
          content: content as any,
          updatedAt: new Date()
        },
        create: {
          id: 'homepage',
          content: content as any
        }
      });

      // Update cache
      this.cachedContent = content;
    } catch (error) {
      console.error('Error saving to database:', error);
      throw error;
    }
  }

  // Additional save methods
  async saveNavigationSection(navigation: any): Promise<boolean> {
    try {
      const content = await this.getHomepageContent('en');
      content.navigation = navigation;
      await this.saveToDatabase(content);
      return true;
    } catch (error) {
      console.error('Error saving navigation:', error);
      return false;
    }
  }

  async saveFeaturesSection(featuresData: any): Promise<boolean> {
    try {
      const content = await this.getHomepageContent('en');
      if (featuresData.featuresSection) {
        content.featuresSection = featuresData.featuresSection;
      }
      if (featuresData.features) {
        content.features = featuresData.features;
      }
      await this.saveToDatabase(content);
      return true;
    } catch (error) {
      console.error('Error saving features section:', error);
      return false;
    }
  }

  async saveSamplesSection(samplesData: any): Promise<boolean> {
    try {
      const content = await this.getHomepageContent('en');
      if (samplesData.samplesSection) {
        content.samplesSection = samplesData.samplesSection;
      }
      if (samplesData.samples) {
        content.samples = samplesData.samples;
      }
      await this.saveToDatabase(content);
      return true;
    } catch (error) {
      console.error('Error saving samples section:', error);
      return false;
    }
  }

  async savePricingSection(pricingData: any): Promise<boolean> {
    try {
      const content = await this.getHomepageContent('en');
      if (pricingData.pricingSection) {
        content.pricingSection = pricingData.pricingSection;
      }
      if (pricingData.pricing) {
        content.pricing = pricingData.pricing;
      }
      await this.saveToDatabase(content);
      return true;
    } catch (error) {
      console.error('Error saving pricing section:', error);
      return false;
    }
  }

  async saveFooterSection(footer: any): Promise<boolean> {
    try {
      const content = await this.getHomepageContent('en');
      content.footer = footer;
      await this.saveToDatabase(content);
      return true;
    } catch (error) {
      console.error('Error saving footer:', error);
      return false;
    }
  }

  async saveTranslationsSection(commonUI: any): Promise<boolean> {
    try {
      const content = await this.getHomepageContent('en');
      content.commonUI = commonUI;
      await this.saveToDatabase(content);
      return true;
    } catch (error) {
      console.error('Error saving translations:', error);
      return false;
    }
  }

  async saveSEOSection(seo: any): Promise<boolean> {
    try {
      const content = await this.getHomepageContent('en');
      content.seo = seo;
      await this.saveToDatabase(content);
      return true;
    } catch (error) {
      console.error('Error saving SEO:', error);
      return false;
    }
  }

  async saveAllContent(fullContent: HomepageContent): Promise<boolean> {
    try {
      await this.saveToDatabase(fullContent);
      return true;
    } catch (error) {
      console.error('Error saving all content:', error);
      return false;
    }
  }

  async saveHeroSection(hero: any): Promise<boolean> {
    try {
      const content = await this.getHomepageContent('en');
      content.hero = hero;
      await this.saveToDatabase(content);
      return true;
    } catch (error) {
      console.error('Error saving hero:', error);
      return false;
    }
  }

  async saveFeature(feature: any): Promise<boolean> {
    try {
      const content = await this.getHomepageContent('en');
      const index = content.features.findIndex(f => f.id === feature.id);
      if (index >= 0) {
        content.features[index] = feature;
      } else {
        content.features.push(feature);
      }
      await this.saveToDatabase(content);
      return true;
    } catch (error) {
      console.error('Error saving feature:', error);
      return false;
    }
  }

  async saveSample(sample: any): Promise<boolean> {
    try {
      const content = await this.getHomepageContent('en');
      const index = content.samples.findIndex(s => s.id === sample.id);
      if (index >= 0) {
        content.samples[index] = sample;
      } else {
        content.samples.push(sample);
      }
      await this.saveToDatabase(content);
      return true;
    } catch (error) {
      console.error('Error saving sample:', error);
      return false;
    }
  }

  async savePricingTier(tier: any): Promise<boolean> {
    try {
      const content = await this.getHomepageContent('en');
      const index = content.pricing.findIndex(p => p.id === tier.id);
      if (index >= 0) {
        content.pricing[index] = tier;
      } else {
        content.pricing.push(tier);
      }
      await this.saveToDatabase(content);
      return true;
    } catch (error) {
      console.error('Error saving pricing tier:', error);
      return false;
    }
  }

  // Delete methods
  async deleteFeature(id: string): Promise<boolean> {
    try {
      const content = await this.getHomepageContent('en');
      content.features = content.features.filter(f => f.id !== id);
      await this.saveToDatabase(content);
      return true;
    } catch (error) {
      console.error('Error deleting feature:', error);
      return false;
    }
  }

  async deleteSample(id: string): Promise<boolean> {
    try {
      const content = await this.getHomepageContent('en');
      content.samples = content.samples.filter(s => s.id !== id);
      await this.saveToDatabase(content);
      return true;
    } catch (error) {
      console.error('Error deleting sample:', error);
      return false;
    }
  }

  async deletePricingTier(id: string): Promise<boolean> {
    try {
      const content = await this.getHomepageContent('en');
      content.pricing = content.pricing.filter(p => p.id !== id);
      await this.saveToDatabase(content);
      return true;
    } catch (error) {
      console.error('Error deleting pricing tier:', error);
      return false;
    }
  }

  // Get default content as fallback
  private getDefaultContent(locale: string): HomepageContent {
    return {
      hero: this.getDefaultHero(),
      navigation: this.getNavigationContent(),
      featuresSection: this.getFeaturesSectionHeader(),
      features: this.getDefaultFeatures(),
      samplesSection: this.getSamplesSectionContent(),
      samples: this.getDefaultSamples(),
      pricingSection: this.getPricingSectionContent(),
      pricing: this.getDefaultPricing(),
      footer: this.getFooterContent(),
      commonUI: this.getCommonUIContent(),
      seo: this.getDefaultSEO()
    };
  }

  private getDefaultHero(): HeroSection {
    return {
      title: {
        en: 'Create Professional Worksheets in Minutes',
        de: 'Erstellen Sie professionelle Arbeitsblätter in Minuten',
        fr: 'Créez des feuilles de travail professionnelles en quelques minutes',
        es: 'Cree hojas de trabajo profesionales en minutos',
        it: 'Crea fogli di lavoro professionali in pochi minuti',
        pt: 'Crie planilhas profissionais em minutos',
        nl: 'Maak professionele werkbladen in enkele minuten',
        sv: 'Skapa professionella arbetsblad på några minuter',
        da: 'Opret professionelle arbejdsark på få minutter',
        no: 'Lag profesjonelle arbeidsark på minutter',
        fi: 'Luo ammattimaisia työarkkeja minuuteissa'
      },
      subtitle: {
        en: '33 powerful worksheet generators with 100+ themed images',
        de: '33 leistungsstarke Arbeitsblatt-Generatoren mit über 100 thematischen Bildern',
        fr: '33 générateurs de feuilles de travail puissants avec plus de 100 images thématiques',
        es: '33 potentes generadores de hojas de trabajo con más de 100 imágenes temáticas',
        it: '33 potenti generatori di fogli di lavoro con oltre 100 immagini a tema',
        pt: '33 geradores de planilhas poderosos com mais de 100 imagens temáticas',
        nl: '33 krachtige werkbladgeneratoren met 100+ thematische afbeeldingen',
        sv: '33 kraftfulla arbetsbladsgeneratorer med 100+ tematiska bilder',
        da: '33 kraftfulde arbejdsark-generatorer med 100+ tematiske billeder',
        no: '33 kraftige arbeidsarkgeneratorer med 100+ tematiske bilder',
        fi: '33 tehokasta työarkkigeneraattoria yli 100 teemakuvalla'
      },
      cta_primary_text: {
        en: 'Try Word Search Free',
        de: 'Wortsuche kostenlos testen',
        fr: 'Essayez la recherche de mots gratuitement',
        es: 'Prueba la búsqueda de palabras gratis',
        it: 'Prova la ricerca di parole gratuitamente',
        pt: 'Experimente a busca de palavras grátis',
        nl: 'Probeer woordzoeker gratis',
        sv: 'Prova ordsökning gratis',
        da: 'Prøv ordsøgning gratis',
        no: 'Prøv ordsøk gratis',
        fi: 'Kokeile sanahakua ilmaiseksi'
      },
      cta_primary_link: '/apps/word-search',
      cta_secondary_text: {
        en: 'View All Apps',
        de: 'Alle Apps anzeigen',
        fr: 'Voir toutes les applications',
        es: 'Ver todas las aplicaciones',
        it: 'Visualizza tutte le applicazioni',
        pt: 'Ver todos os aplicativos',
        nl: 'Bekijk alle apps',
        sv: 'Visa alla appar',
        da: 'Se alle apps',
        no: 'Se alle apper',
        fi: 'Näytä kaikki sovellukset'
      },
      cta_secondary_link: '/apps',
      background_gradient: 'from-primary-50 to-white'
    };
  }

  private getDefaultFeatures(): FeatureItem[] {
    return [
      {
        id: 'feature-1',
        icon: 'apps',
        title: {
          en: '33 Worksheet Generators',
          de: '33 Arbeitsblatt-Generatoren',
          fr: '33 Générateurs de feuilles',
          es: '33 Generadores de hojas',
          it: '33 Generatori di fogli',
          pt: '33 Geradores de planilhas',
          nl: '33 Werkbladgeneratoren',
          sv: '33 Arbetsbladsgeneratorer',
          da: '33 Arbejdsark-generatorer',
          no: '33 Arbeidsarkgeneratorer',
          fi: '33 Työarkkigeneraattoria'
        },
        description: {
          en: 'Access our complete suite of professional worksheet generators',
          de: 'Zugriff auf unsere komplette Suite professioneller Arbeitsblatt-Generatoren',
          fr: 'Accédez à notre suite complète de générateurs de feuilles professionnels',
          es: 'Acceda a nuestro completo conjunto de generadores de hojas profesionales',
          it: 'Accedi alla nostra suite completa di generatori di fogli professionali',
          pt: 'Acesse nosso conjunto completo de geradores de planilhas profissionais',
          nl: 'Toegang tot onze complete suite van professionele werkbladgeneratoren',
          sv: 'Få tillgång till vår kompletta svit av professionella arbetsbladsgeneratorer',
          da: 'Få adgang til vores komplette suite af professionelle arbejdsark-generatorer',
          no: 'Få tilgang til vår komplette suite av profesjonelle arbeidsarkgeneratorer',
          fi: 'Pääsy koko ammattimaiseen työarkkigeneraattoriimme'
        },
        color_scheme: 'blue',
        sort_order: 0
      },
      {
        id: 'feature-2',
        icon: 'images',
        title: {
          en: '100+ Themed Images',
          de: '100+ Themenbilder',
          fr: '100+ Images thématiques',
          es: '100+ Imágenes temáticas',
          it: '100+ Immagini tematiche',
          pt: '100+ Imagens temáticas',
          nl: '100+ Thematische afbeeldingen',
          sv: '100+ Tematiska bilder',
          da: '100+ Tematiske billeder',
          no: '100+ Tematiske bilder',
          fi: '100+ Teemallista kuvaa'
        },
        description: {
          en: 'Beautifully designed images across multiple themes and categories',
          de: 'Wunderschön gestaltete Bilder über mehrere Themen und Kategorien',
          fr: 'Images magnifiquement conçues dans plusieurs thèmes et catégories',
          es: 'Imágenes bellamente diseñadas en múltiples temas y categorías',
          it: 'Immagini magnificamente progettate in più temi e categorie',
          pt: 'Imagens lindamente projetadas em vários temas e categorias',
          nl: 'Prachtig ontworpen afbeeldingen in meerdere thema\'s en categorieën',
          sv: 'Vackert designade bilder över flera teman och kategorier',
          da: 'Smukt designede billeder på tværs af flere temaer og kategorier',
          no: 'Vakkert designede bilder på tvers av flere temaer og kategorier',
          fi: 'Kauniisti suunniteltuja kuvia useissa teemoissa ja luokissa'
        },
        color_scheme: 'purple',
        sort_order: 1
      },
      {
        id: 'feature-3',
        icon: 'languages',
        title: {
          en: '11 Languages',
          de: '11 Sprachen',
          fr: '11 Langues',
          es: '11 Idiomas',
          it: '11 Lingue',
          pt: '11 Idiomas',
          nl: '11 Talen',
          sv: '11 Språk',
          da: '11 Sprog',
          no: '11 Språk',
          fi: '11 Kieltä'
        },
        description: {
          en: 'Create worksheets in English, German, French, Spanish, and 7 more languages',
          de: 'Erstellen Sie Arbeitsblätter in Englisch, Deutsch, Französisch, Spanisch und 7 weiteren Sprachen',
          fr: 'Créez des feuilles de travail en anglais, allemand, français, espagnol et 7 autres langues',
          es: 'Cree hojas de trabajo en inglés, alemán, francés, español y 7 idiomas más',
          it: 'Crea fogli di lavoro in inglese, tedesco, francese, spagnolo e altre 7 lingue',
          pt: 'Crie planilhas em inglês, alemão, francês, espanhol e mais 7 idiomas',
          nl: 'Maak werkbladen in Engels, Duits, Frans, Spaans en nog 7 talen',
          sv: 'Skapa arbetsblad på engelska, tyska, franska, spanska och 7 fler språk',
          da: 'Opret arbejdsark på engelsk, tysk, fransk, spansk og 7 flere sprog',
          no: 'Opprett arbeidsark på engelsk, tysk, fransk, spansk og 7 flere språk',
          fi: 'Luo työarkkeja englanniksi, saksaksi, ranskaksi, espanjaksi ja 7 muulla kielellä'
        },
        color_scheme: 'green',
        sort_order: 2
      },
      {
        id: 'feature-4',
        icon: 'pod',
        title: {
          en: 'Print-on-Demand Ready',
          de: 'Print-on-Demand bereit',
          fr: 'Prêt pour l\'impression à la demande',
          es: 'Listo para impresión bajo demanda',
          it: 'Pronto per la stampa su richiesta',
          pt: 'Pronto para impressão sob demanda',
          nl: 'Klaar voor print-on-demand',
          sv: 'Redo för tryck-på-begäran',
          da: 'Klar til print-on-demand',
          no: 'Klar for print-on-demand',
          fi: 'Valmis tilaustulosteisiin'
        },
        description: {
          en: 'High-quality PDFs optimized for professional printing and publishing',
          de: 'Hochwertige PDFs optimiert für professionellen Druck und Veröffentlichung',
          fr: 'PDF de haute qualité optimisés pour l\'impression et la publication professionnelles',
          es: 'PDF de alta calidad optimizados para impresión y publicación profesional',
          it: 'PDF di alta qualità ottimizzati per stampa e pubblicazione professionali',
          pt: 'PDFs de alta qualidade otimizados para impressão e publicação profissional',
          nl: 'Hoogwaardige PDF\'s geoptimaliseerd voor professioneel drukken en publiceren',
          sv: 'Högkvalitativa PDF:er optimerade för professionell utskrift och publicering',
          da: 'Høj kvalitets PDF\'er optimeret til professionel udskrivning og udgivelse',
          no: 'Høykvalitets PDF-er optimalisert for profesjonell utskrift og publisering',
          fi: 'Korkealaatuiset PDF-tiedostot optimoitu ammattimaiseen tulostukseen ja julkaisuun'
        },
        color_scheme: 'orange',
        sort_order: 3
      }
    ];
  }

  private getDefaultSamples(): WorksheetSample[] {
    return [
      {
        id: 'sample-1',
        name: {
          en: 'Alphabet Train',
          de: 'Alphabet-Zug',
          fr: 'Train de l\'alphabet',
          es: 'Tren del alfabeto',
          it: 'Trenino dell\'alfabeto',
          pt: 'Comboio do alfabeto',
          nl: 'Alfabettrein',
          sv: 'Alfabetståg',
          da: 'Alfabettog',
          no: 'Alfabettog',
          fi: 'Aakkosjuna'
        },
        description: {
          en: 'Fun alphabet learning with colorful train cars',
          de: 'Spaßiges Alphabet-Lernen mit bunten Zugwaggons',
          fr: 'Apprentissage ludique de l\'alphabet avec des wagons colorés',
          es: 'Aprendizaje divertido del alfabeto con vagones coloridos',
          it: 'Apprendimento divertente dell\'alfabeto con vagoni colorati',
          pt: 'Aprendizagem divertida do alfabeto com vagões coloridos',
          nl: 'Leuk alfabetleren met kleurrijke treinwagons',
          sv: 'Rolig alfabetsinlärning med färgglada tågvagnar',
          da: 'Sjov alfabetlæring med farverige togvogne',
          no: 'Morsom alfabetlæring med fargerike togvogner',
          fi: 'Hauska aakkosten oppiminen värikkäillä junavaunuilla'
        },
        category: 'literacy',
        difficulty: 'Easy',
        age_range: {
          en: '3-5 years',
          de: '3-5 Jahre',
          fr: '3-5 ans',
          es: '3-5 años',
          it: '3-5 anni',
          pt: '3-5 anos',
          nl: '3-5 jaar',
          sv: '3-5 år',
          da: '3-5 år',
          no: '3-5 år',
          fi: '3-5 vuotta'
        },
        image_url: '/worksheet-samples/alphabet.png',
        featured: true,
        sort_order: 0
      },
      {
        id: 'sample-2',
        name: {
          en: 'Code Addition',
          de: 'Code-Addition',
          fr: 'Code-Addition',
          es: 'Code-Addition',
          it: 'Code-Addition',
          pt: 'Code-Addition',
          nl: 'Code-Addition',
          sv: 'Code-Addition',
          da: 'Code-Addition',
          no: 'Code-Addition',
          fi: 'Code-Addition'
        },
        description: {
          en: 'Crack the code with addition puzzles',
          de: 'Knacke den Code mit Additionsrätseln',
          fr: 'Déchiffrez le code avec des énigmes d\'addition',
          es: 'Descifra el código con acertijos de suma',
          it: 'Decifra il codice con enigmi di addizione',
          pt: 'Decifre o código com enigmas de adição',
          nl: 'Kraak de code met optelraadsels',
          sv: 'Knäck koden med additionsgåtor',
          da: 'Knæk koden med additionsgåder',
          no: 'Knekk koden med addisjonsoppgaver',
          fi: 'Murra koodi yhteenlaskutehtävillä'
        },
        category: 'math',
        difficulty: 'Medium',
        age_range: {
          en: '6-8 years',
          de: '6-8 Jahre',
          fr: '6-8 ans',
          es: '6-8 años',
          it: '6-8 anni',
          pt: '6-8 anos',
          nl: '6-8 jaar',
          sv: '6-8 år',
          da: '6-8 år',
          no: '6-8 år',
          fi: '6-8 vuotta'
        },
        image_url: '/worksheet-samples/code-addition.png',
        featured: true,
        sort_order: 1
      },
      {
        id: 'sample-3',
        name: {
          en: 'I Spy Game',
          de: 'Ich Sehe Was',
          fr: 'Cherche et trouve',
          es: 'Veo Veo',
          it: 'Aguzza la vista',
          pt: 'Eu Espio',
          nl: 'Ik zie ik zie',
          sv: 'Jag ser',
          da: 'Jeg ser',
          no: 'Jeg ser',
          fi: 'Minä näen'
        },
        description: {
          en: 'Classic I Spy searching game',
          de: 'Klassisches Ich-sehe-was Suchspiel',
          fr: 'Le jeu classique de recherche visuelle',
          es: 'El clásico juego de búsqueda visual',
          it: 'Il classico gioco di ricerca visiva',
          pt: 'O clássico jogo de busca visual',
          nl: 'Het klassieke zoekspel',
          sv: 'Det klassiska sökspelet',
          da: 'Det klassiske søgespil',
          no: 'Det klassiske søkespillet',
          fi: 'Klassinen hakupeli'
        },
        category: 'puzzle',
        difficulty: 'Easy',
        age_range: {
          en: '4-7 years',
          de: '4-7 Jahre',
          fr: '4-7 ans',
          es: '4-7 años',
          it: '4-7 anni',
          pt: '4-7 anos',
          nl: '4-7 jaar',
          sv: '4-7 år',
          da: '4-7 år',
          no: '4-7 år',
          fi: '4-7 vuotta'
        },
        image_url: '/worksheet-samples/i-spy.png',
        featured: true,
        sort_order: 2
      },
      {
        id: 'sample-4',
        name: {
          en: 'Word Search',
          de: 'Wortsuche',
          fr: 'Mots Mêlés',
          es: 'Sopa de Letras',
          it: 'Ricerca di Parole',
          pt: 'Caça-Palavras',
          nl: 'Woordzoeker',
          sv: 'Ordletning',
          da: 'Ordsøgning',
          no: 'Ordsøk',
          fi: 'Sanahaku'
        },
        description: {
          en: 'Find hidden words in the grid',
          de: 'Finde versteckte Wörter im Gitter',
          fr: 'Trouvez les mots cachés dans la grille',
          es: 'Encuentra palabras ocultas en la cuadrícula',
          it: 'Trova le parole nascoste nella griglia',
          pt: 'Encontre palavras ocultas na grade',
          nl: 'Vind verborgen woorden in het raster',
          sv: 'Hitta dolda ord i rutnätet',
          da: 'Find skjulte ord i gitteret',
          no: 'Finn skjulte ord i rutenettet',
          fi: 'Etsi piilotettuja sanoja ruudukosta'
        },
        category: 'literacy',
        difficulty: 'Medium',
        age_range: {
          en: '7-10 years',
          de: '7-10 Jahre',
          fr: '7-10 ans',
          es: '7-10 años',
          it: '7-10 anni',
          pt: '7-10 anos',
          nl: '7-10 jaar',
          sv: '7-10 år',
          da: '7-10 år',
          no: '7-10 år',
          fi: '7-10 vuotta'
        },
        image_url: '/worksheet-samples/word-search.png',
        featured: false,
        sort_order: 3
      },
      {
        id: 'sample-5',
        name: {
          en: 'Multiplication Tables',
          de: 'Einmaleins',
          fr: 'Tables de Multiplication',
          es: 'Tablas de Multiplicar',
          it: 'Tabelline',
          pt: 'Tabuadas',
          nl: 'Tafels',
          sv: 'Multiplikationstabeller',
          da: 'Gangetabeller',
          no: 'Gangetabeller',
          fi: 'Kertotaulut'
        },
        description: {
          en: 'Practice multiplication facts',
          de: 'Übe Multiplikationsfakten',
          fr: 'Pratiquez les faits de multiplication',
          es: 'Practica los hechos de multiplicación',
          it: 'Pratica i fatti di moltiplicazione',
          pt: 'Pratique fatos de multiplicação',
          nl: 'Oefen vermenigvuldigingsfakten',
          sv: 'Öva multiplikationsfakta',
          da: 'Øv multiplikationsfakta',
          no: 'Øv multiplikasjonsfakta',
          fi: 'Harjoittele kertotauluja'
        },
        category: 'math',
        difficulty: 'Medium',
        age_range: {
          en: '7-9 years',
          de: '7-9 Jahre',
          fr: '7-9 ans',
          es: '7-9 años',
          it: '7-9 anni',
          pt: '7-9 anos',
          nl: '7-9 jaar',
          sv: '7-9 år',
          da: '7-9 år',
          no: '7-9 år',
          fi: '7-9 vuotta'
        },
        image_url: '/worksheet-samples/multiplication.png',
        featured: false,
        sort_order: 4
      },
      {
        id: 'sample-6',
        name: {
          en: 'Maze Challenge',
          de: 'Labyrinth-Herausforderung',
          fr: 'Défi Labyrinthe',
          es: 'Desafío de Laberinto',
          it: 'Sfida del Labirinto',
          pt: 'Desafio de Labirinto',
          nl: 'Doolhof Uitdaging',
          sv: 'Labyrintutmaning',
          da: 'Labyrintudfordring',
          no: 'Labyrintutfordring',
          fi: 'Labyrinttihaaste'
        },
        description: {
          en: 'Navigate through complex mazes',
          de: 'Navigiere durch komplexe Labyrinthe',
          fr: 'Naviguez à travers des labyrinthes complexes',
          es: 'Navega por laberintos complejos',
          it: 'Naviga attraverso labirinti complessi',
          pt: 'Navegue por labirintos complexos',
          nl: 'Navigeer door complexe doolhoven',
          sv: 'Navigera genom komplexa labyrinter',
          da: 'Naviger gennem komplekse labyrinter',
          no: 'Naviger gjennom komplekse labyrinter',
          fi: 'Navigoi monimutkaisissa labyrinteissa'
        },
        category: 'puzzle',
        difficulty: 'Medium',
        age_range: {
          en: '5-8 years',
          de: '5-8 Jahre',
          fr: '5-8 ans',
          es: '5-8 años',
          it: '5-8 anni',
          pt: '5-8 anos',
          nl: '5-8 jaar',
          sv: '5-8 år',
          da: '5-8 år',
          no: '5-8 år',
          fi: '5-8 vuotta'
        },
        image_url: '/worksheet-samples/maze.png',
        featured: false,
        sort_order: 5
      },
      {
        id: 'sample-7',
        name: {
          en: 'Fraction Pizza',
          de: 'Bruch-Pizza',
          fr: 'Pizza Fractionnée',
          es: 'Pizza de Fracciones',
          it: 'Pizza delle Frazioni',
          pt: 'Pizza de Frações',
          nl: 'Breuk Pizza',
          sv: 'Bråkpizza',
          da: 'Brøk Pizza',
          no: 'Brøk Pizza',
          fi: 'Murtolukupizza'
        },
        description: {
          en: 'Learn fractions with pizza slices',
          de: 'Lerne Brüche mit Pizzastücken',
          fr: 'Apprenez les fractions avec des parts de pizza',
          es: 'Aprende fracciones con porciones de pizza',
          it: 'Impara le frazioni con fette di pizza',
          pt: 'Aprenda frações com fatias de pizza',
          nl: 'Leer breuken met pizzapunten',
          sv: 'Lär dig bråk med pizzabitar',
          da: 'Lær brøker med pizzastykker',
          no: 'Lær brøker med pizzabiter',
          fi: 'Opi murtoluvut pizzapaloilla'
        },
        category: 'math',
        difficulty: 'Medium',
        age_range: {
          en: '8-10 years',
          de: '8-10 Jahre',
          fr: '8-10 ans',
          es: '8-10 años',
          it: '8-10 anni',
          pt: '8-10 anos',
          nl: '8-10 jaar',
          sv: '8-10 år',
          da: '8-10 år',
          no: '8-10 år',
          fi: '8-10 vuotta'
        },
        image_url: '/worksheet-samples/fractions.png',
        featured: false,
        sort_order: 6
      },
      {
        id: 'sample-8',
        name: {
          en: 'Handwriting Practice',
          de: 'Handschrift-Übung',
          fr: 'Pratique de l\'Écriture',
          es: 'Práctica de Escritura',
          it: 'Pratica di Scrittura',
          pt: 'Prática de Caligrafia',
          nl: 'Handschrift Oefening',
          sv: 'Handstilsövning',
          da: 'Håndskriftøvelse',
          no: 'Håndskriftsøvelse',
          fi: 'Käsialan harjoitus'
        },
        description: {
          en: 'Improve handwriting skills',
          de: 'Verbessere Handschriftfähigkeiten',
          fr: 'Améliorez vos compétences en écriture',
          es: 'Mejora las habilidades de escritura',
          it: 'Migliora le capacità di scrittura',
          pt: 'Melhore as habilidades de caligrafia',
          nl: 'Verbeter handschriftvaardigheden',
          sv: 'Förbättra handstilsfärdigheter',
          da: 'Forbedre håndskriftsfærdigheder',
          no: 'Forbedre håndskriftsferdigheter',
          fi: 'Paranna käsialan taitoja'
        },
        category: 'literacy',
        difficulty: 'Easy',
        age_range: {
          en: '4-7 years',
          de: '4-7 Jahre',
          fr: '4-7 ans',
          es: '4-7 años',
          it: '4-7 anni',
          pt: '4-7 anos',
          nl: '4-7 jaar',
          sv: '4-7 år',
          da: '4-7 år',
          no: '4-7 år',
          fi: '4-7 vuotta'
        },
        image_url: '/worksheet-samples/handwriting.png',
        featured: false,
        sort_order: 7
      },
      {
        id: 'sample-9',
        name: {
          en: 'Sudoku Kids',
          de: 'Sudoku für Kinder',
          fr: 'Sudoku Enfants',
          es: 'Sudoku Niños',
          it: 'Sudoku Bambini',
          pt: 'Sudoku Crianças',
          nl: 'Sudoku Kinderen',
          sv: 'Sudoku Barn',
          da: 'Sudoku Børn',
          no: 'Sudoku Barn',
          fi: 'Sudoku Lapset'
        },
        description: {
          en: 'Easy sudoku puzzles for kids',
          de: 'Einfache Sudoku-Rätsel für Kinder',
          fr: 'Puzzles sudoku faciles pour enfants',
          es: 'Puzzles sudoku fáciles para niños',
          it: 'Puzzle sudoku facili per bambini',
          pt: 'Puzzles sudoku fáceis para crianças',
          nl: 'Gemakkelijke sudoku puzzels voor kinderen',
          sv: 'Enkla sudoku pussel för barn',
          da: 'Nemme sudoku gåder for børn',
          no: 'Enkle sudoku oppgaver for barn',
          fi: 'Helppoja sudoku-pulmia lapsille'
        },
        category: 'logic',
        difficulty: 'Medium',
        age_range: {
          en: '7-10 years',
          de: '7-10 Jahre',
          fr: '7-10 ans',
          es: '7-10 años',
          it: '7-10 anni',
          pt: '7-10 anos',
          nl: '7-10 jaar',
          sv: '7-10 år',
          da: '7-10 år',
          no: '7-10 år',
          fi: '7-10 vuotta'
        },
        image_url: '/worksheet-samples/sudoku.png',
        featured: false,
        sort_order: 8
      },
      {
        id: 'sample-10',
        name: {
          en: 'Coloring Pages',
          de: 'Ausmalbilder',
          fr: 'Pages à Colorier',
          es: 'Páginas para Colorear',
          it: 'Pagine da Colorare',
          pt: 'Páginas para Colorir',
          nl: 'Kleurplaten',
          sv: 'Målarbilder',
          da: 'Farvelægningssider',
          no: 'Fargesider',
          fi: 'Värityskuvat'
        },
        description: {
          en: 'Creative coloring activities',
          de: 'Kreative Malaktivitäten',
          fr: 'Activités de coloriage créatives',
          es: 'Actividades de coloreo creativo',
          it: 'Attività creative di colorazione',
          pt: 'Atividades criativas de colorir',
          nl: 'Creatieve kleuractiviteiten',
          sv: 'Kreativa målaraktiviteter',
          da: 'Kreative farvelægningsaktiviteter',
          no: 'Kreative fargeaktiviteter',
          fi: 'Luovia väritystehtäviä'
        },
        category: 'creative',
        difficulty: 'Easy',
        age_range: {
          en: '3-8 years',
          de: '3-8 Jahre',
          fr: '3-8 ans',
          es: '3-8 años',
          it: '3-8 anni',
          pt: '3-8 anos',
          nl: '3-8 jaar',
          sv: '3-8 år',
          da: '3-8 år',
          no: '3-8 år',
          fi: '3-8 vuotta'
        },
        image_url: '/worksheet-samples/coloring.png',
        featured: false,
        sort_order: 9
      },
      {
        id: 'sample-11',
        name: {
          en: 'Sight Words',
          de: 'Sichtwörter',
          fr: 'Mots à Vue',
          es: 'Palabras de Vista',
          it: 'Parole Visive',
          pt: 'Palavras Visuais',
          nl: 'Zichtwoorden',
          sv: 'Synord',
          da: 'Synord',
          no: 'Synord',
          fi: 'Näköisanat'
        },
        description: {
          en: 'Learn common sight words',
          de: 'Lerne häufige Sichtwörter',
          fr: 'Apprenez les mots courants',
          es: 'Aprende palabras comunes',
          it: 'Impara parole comuni',
          pt: 'Aprenda palavras comuns',
          nl: 'Leer veelvoorkomende woorden',
          sv: 'Lär dig vanliga ord',
          da: 'Lær almindelige ord',
          no: 'Lær vanlige ord',
          fi: 'Opi yleisiä sanoja'
        },
        category: 'literacy',
        difficulty: 'Easy',
        age_range: {
          en: '4-6 years',
          de: '4-6 Jahre',
          fr: '4-6 ans',
          es: '4-6 años',
          it: '4-6 anni',
          pt: '4-6 anos',
          nl: '4-6 jaar',
          sv: '4-6 år',
          da: '4-6 år',
          no: '4-6 år',
          fi: '4-6 vuotta'
        },
        image_url: '/worksheet-samples/sight-words.png',
        featured: false,
        sort_order: 10
      },
      {
        id: 'sample-12',
        name: {
          en: 'Telling Time',
          de: 'Uhrzeit Lernen',
          fr: 'Lire l\'Heure',
          es: 'Decir la Hora',
          it: 'Dire l\'Ora',
          pt: 'Dizer as Horas',
          nl: 'Klokkijken',
          sv: 'Säga Klockan',
          da: 'Fortælle Tiden',
          no: 'Si Klokka',
          fi: 'Kellonajan lukeminen'
        },
        description: {
          en: 'Practice reading clock faces',
          de: 'Übe das Lesen von Uhren',
          fr: 'Pratiquez la lecture de l\'heure',
          es: 'Practica leer relojes',
          it: 'Pratica la lettura dell\'orologio',
          pt: 'Pratique ler relógios',
          nl: 'Oefen het klokkijken',
          sv: 'Öva att läsa klockan',
          da: 'Øv at læse ur',
          no: 'Øv å lese klokka',
          fi: 'Harjoittele kellonajan lukemista'
        },
        category: 'math',
        difficulty: 'Medium',
        age_range: {
          en: '6-8 years',
          de: '6-8 Jahre',
          fr: '6-8 ans',
          es: '6-8 años',
          it: '6-8 anni',
          pt: '6-8 anos',
          nl: '6-8 jaar',
          sv: '6-8 år',
          da: '6-8 år',
          no: '6-8 år',
          fi: '6-8 vuotta'
        },
        image_url: '/worksheet-samples/telling-time.png',
        featured: false,
        sort_order: 11
      },
      {
        id: 'sample-13',
        name: {
          en: 'Shape Patterns',
          de: 'Form-Muster',
          fr: 'Motifs de Formes',
          es: 'Patrones de Formas',
          it: 'Modelli di Forme',
          pt: 'Padrões de Formas',
          nl: 'Vormpatronen',
          sv: 'Formmönster',
          da: 'Formmønstre',
          no: 'Formmønstre',
          fi: 'Muotokuviot'
        },
        description: {
          en: 'Identify and complete patterns',
          de: 'Identifiziere und vervollständige Muster',
          fr: 'Identifiez et complétez les motifs',
          es: 'Identifica y completa patrones',
          it: 'Identifica e completa i modelli',
          pt: 'Identifique e complete padrões',
          nl: 'Identificeer en voltooi patronen',
          sv: 'Identifiera och slutför mönster',
          da: 'Identificer og fuldend mønstre',
          no: 'Identifiser og fullfør mønstre',
          fi: 'Tunnista ja täydennä kuvioita'
        },
        category: 'logic',
        difficulty: 'Easy',
        age_range: {
          en: '4-7 years',
          de: '4-7 Jahre',
          fr: '4-7 ans',
          es: '4-7 años',
          it: '4-7 anni',
          pt: '4-7 anos',
          nl: '4-7 jaar',
          sv: '4-7 år',
          da: '4-7 år',
          no: '4-7 år',
          fi: '4-7 vuotta'
        },
        image_url: '/worksheet-samples/patterns.png',
        featured: false,
        sort_order: 12
      },
      {
        id: 'sample-14',
        name: {
          en: 'Crossword Puzzle',
          de: 'Kreuzworträtsel',
          fr: 'Mots Croisés',
          es: 'Crucigrama',
          it: 'Cruciverba',
          pt: 'Palavras Cruzadas',
          nl: 'Kruiswoordpuzzel',
          sv: 'Korsord',
          da: 'Krydsord',
          no: 'Kryssord',
          fi: 'Ristisanatehtävä'
        },
        description: {
          en: 'Educational crossword puzzles',
          de: 'Lehrreiche Kreuzworträtsel',
          fr: 'Mots croisés éducatifs',
          es: 'Crucigramas educativos',
          it: 'Cruciverba educativi',
          pt: 'Palavras cruzadas educativas',
          nl: 'Educatieve kruiswoordpuzzels',
          sv: 'Pedagogiska korsord',
          da: 'Pædagogiske krydsord',
          no: 'Pedagogiske kryssord',
          fi: 'Opetuksellisia ristisanoja'
        },
        category: 'literacy',
        difficulty: 'Hard',
        age_range: {
          en: '9-12 years',
          de: '9-12 Jahre',
          fr: '9-12 ans',
          es: '9-12 años',
          it: '9-12 anni',
          pt: '9-12 anos',
          nl: '9-12 jaar',
          sv: '9-12 år',
          da: '9-12 år',
          no: '9-12 år',
          fi: '9-12 vuotta'
        },
        image_url: '/worksheet-samples/crossword.png',
        featured: false,
        sort_order: 13
      },
      {
        id: 'sample-15',
        name: {
          en: 'Money Math',
          de: 'Geld-Mathematik',
          fr: 'Mathématiques d\'Argent',
          es: 'Matemáticas de Dinero',
          it: 'Matematica del Denaro',
          pt: 'Matemática do Dinheiro',
          nl: 'Geld Rekenen',
          sv: 'Pengamatte',
          da: 'Pengematematik',
          no: 'Pengematematikk',
          fi: 'Raha-matematiikka'
        },
        description: {
          en: 'Count coins and make change',
          de: 'Zähle Münzen und gib Wechselgeld',
          fr: 'Comptez les pièces et rendez la monnaie',
          es: 'Cuenta monedas y da cambio',
          it: 'Conta le monete e dai il resto',
          pt: 'Conte moedas e dê troco',
          nl: 'Tel munten en geef wisselgeld',
          sv: 'Räkna mynt och växla',
          da: 'Tæl mønter og giv byttepenge',
          no: 'Tell mynter og gi vekslepenger',
          fi: 'Laske kolikoita ja anna vaihtorahaa'
        },
        category: 'math',
        difficulty: 'Medium',
        age_range: {
          en: '7-9 years',
          de: '7-9 Jahre',
          fr: '7-9 ans',
          es: '7-9 años',
          it: '7-9 anni',
          pt: '7-9 anos',
          nl: '7-9 jaar',
          sv: '7-9 år',
          da: '7-9 år',
          no: '7-9 år',
          fi: '7-9 vuotta'
        },
        image_url: '/worksheet-samples/money.png',
        featured: false,
        sort_order: 14
      },
      {
        id: 'sample-16',
        name: {
          en: 'Connect the Dots',
          de: 'Punkte Verbinden',
          fr: 'Relier les Points',
          es: 'Conecta los Puntos',
          it: 'Unisci i Puntini',
          pt: 'Ligue os Pontos',
          nl: 'Stip naar Stip',
          sv: 'Förbind Prickarna',
          da: 'Forbind Prikkerne',
          no: 'Koble Prikkene',
          fi: 'Yhdistä Pisteet'
        },
        description: {
          en: 'Connect dots to reveal pictures',
          de: 'Verbinde Punkte um Bilder zu enthüllen',
          fr: 'Reliez les points pour révéler des images',
          es: 'Conecta puntos para revelar imágenes',
          it: 'Unisci i puntini per rivelare immagini',
          pt: 'Ligue pontos para revelar imagens',
          nl: 'Verbind stippen om plaatjes te onthullen',
          sv: 'Förbind prickar för att avslöja bilder',
          da: 'Forbind prikker for at afsløre billeder',
          no: 'Koble prikker for å avsløre bilder',
          fi: 'Yhdistä pisteet paljastaaksesi kuvat'
        },
        category: 'puzzle',
        difficulty: 'Easy',
        age_range: {
          en: '4-6 years',
          de: '4-6 Jahre',
          fr: '4-6 ans',
          es: '4-6 años',
          it: '4-6 anni',
          pt: '4-6 anos',
          nl: '4-6 jaar',
          sv: '4-6 år',
          da: '4-6 år',
          no: '4-6 år',
          fi: '4-6 vuotta'
        },
        image_url: '/worksheet-samples/connect-dots.png',
        featured: false,
        sort_order: 15
      },
      {
        id: 'sample-17',
        name: {
          en: 'Phonics Practice',
          de: 'Phonetik-Übung',
          fr: 'Pratique Phonétique',
          es: 'Práctica de Fonética',
          it: 'Pratica di Fonetica',
          pt: 'Prática de Fonética',
          nl: 'Klankleer Oefening',
          sv: 'Fonetikövning',
          da: 'Fonetikøvelse',
          no: 'Fonetikkøvelse',
          fi: 'Foniikkaharjoitus'
        },
        description: {
          en: 'Practice letter sounds and blends',
          de: 'Übe Buchstabentöne und Mischungen',
          fr: 'Pratiquez les sons de lettres',
          es: 'Practica sonidos de letras',
          it: 'Pratica i suoni delle lettere',
          pt: 'Pratique sons de letras',
          nl: 'Oefen letterklanken',
          sv: 'Öva bokstavsljud',
          da: 'Øv bogstavlyde',
          no: 'Øv bokstavlyder',
          fi: 'Harjoittele kirjainääniä'
        },
        category: 'literacy',
        difficulty: 'Easy',
        age_range: {
          en: '4-6 years',
          de: '4-6 Jahre',
          fr: '4-6 ans',
          es: '4-6 años',
          it: '4-6 anni',
          pt: '4-6 anos',
          nl: '4-6 jaar',
          sv: '4-6 år',
          da: '4-6 år',
          no: '4-6 år',
          fi: '4-6 vuotta'
        },
        image_url: '/worksheet-samples/phonics.png',
        featured: false,
        sort_order: 16
      },
      {
        id: 'sample-18',
        name: {
          en: 'Geometry Shapes',
          de: 'Geometrische Formen',
          fr: 'Formes Géométriques',
          es: 'Formas Geométricas',
          it: 'Forme Geometriche',
          pt: 'Formas Geométricas',
          nl: 'Geometrische Vormen',
          sv: 'Geometriska Former',
          da: 'Geometriske Former',
          no: 'Geometriske Former',
          fi: 'Geometriset Muodot'
        },
        description: {
          en: 'Learn about 2D and 3D shapes',
          de: 'Lerne über 2D- und 3D-Formen',
          fr: 'Apprenez les formes 2D et 3D',
          es: 'Aprende sobre formas 2D y 3D',
          it: 'Impara le forme 2D e 3D',
          pt: 'Aprenda sobre formas 2D e 3D',
          nl: 'Leer over 2D en 3D vormen',
          sv: 'Lär dig om 2D och 3D former',
          da: 'Lær om 2D og 3D former',
          no: 'Lær om 2D og 3D former',
          fi: 'Opi 2D ja 3D muodoista'
        },
        category: 'math',
        difficulty: 'Easy',
        age_range: {
          en: '5-8 years',
          de: '5-8 Jahre',
          fr: '5-8 ans',
          es: '5-8 años',
          it: '5-8 anni',
          pt: '5-8 anos',
          nl: '5-8 jaar',
          sv: '5-8 år',
          da: '5-8 år',
          no: '5-8 år',
          fi: '5-8 vuotta'
        },
        image_url: '/worksheet-samples/geometry.png',
        featured: false,
        sort_order: 17
      },
      {
        id: 'sample-19',
        name: {
          en: 'Science Experiment',
          de: 'Wissenschaftsexperiment',
          fr: 'Expérience Scientifique',
          es: 'Experimento Científico',
          it: 'Esperimento Scientifico',
          pt: 'Experimento Científico',
          nl: 'Wetenschappelijk Experiment',
          sv: 'Vetenskapsexperiment',
          da: 'Videnskabseksperiment',
          no: 'Vitenskapseksperiment',
          fi: 'Tiedekoe'
        },
        description: {
          en: 'Record scientific observations',
          de: 'Zeichne wissenschaftliche Beobachtungen auf',
          fr: 'Enregistrez des observations scientifiques',
          es: 'Registra observaciones científicas',
          it: 'Registra osservazioni scientifiche',
          pt: 'Registre observações científicas',
          nl: 'Noteer wetenschappelijke observaties',
          sv: 'Anteckna vetenskapliga observationer',
          da: 'Optag videnskabelige observationer',
          no: 'Registrer vitenskapelige observasjoner',
          fi: 'Kirjaa tieteellisiä havaintoja'
        },
        category: 'science',
        difficulty: 'Medium',
        age_range: {
          en: '8-11 years',
          de: '8-11 Jahre',
          fr: '8-11 ans',
          es: '8-11 años',
          it: '8-11 anni',
          pt: '8-11 anos',
          nl: '8-11 jaar',
          sv: '8-11 år',
          da: '8-11 år',
          no: '8-11 år',
          fi: '8-11 vuotta'
        },
        image_url: '/worksheet-samples/science.png',
        featured: false,
        sort_order: 18
      },
      {
        id: 'sample-20',
        name: {
          en: 'Reading Comprehension',
          de: 'Leseverständnis',
          fr: 'Compréhension de Lecture',
          es: 'Comprensión Lectora',
          it: 'Comprensione della Lettura',
          pt: 'Compreensão de Leitura',
          nl: 'Leesbegrip',
          sv: 'Läsförståelse',
          da: 'Læseforståelse',
          no: 'Leseforståelse',
          fi: 'Luetun ymmärtäminen'
        },
        description: {
          en: 'Answer questions about passages',
          de: 'Beantworte Fragen zu Texten',
          fr: 'Répondez aux questions sur les passages',
          es: 'Responde preguntas sobre pasajes',
          it: 'Rispondi alle domande sui brani',
          pt: 'Responda perguntas sobre passagens',
          nl: 'Beantwoord vragen over teksten',
          sv: 'Svara på frågor om texter',
          da: 'Besvar spørgsmål om tekster',
          no: 'Svar på spørsmål om tekster',
          fi: 'Vastaa kysymyksiin tekstistä'
        },
        category: 'literacy',
        difficulty: 'Medium',
        age_range: {
          en: '7-10 years',
          de: '7-10 Jahre',
          fr: '7-10 ans',
          es: '7-10 años',
          it: '7-10 anni',
          pt: '7-10 anos',
          nl: '7-10 jaar',
          sv: '7-10 år',
          da: '7-10 år',
          no: '7-10 år',
          fi: '7-10 vuotta'
        },
        image_url: '/worksheet-samples/reading.png',
        featured: false,
        sort_order: 19
      },
      {
        id: 'sample-21',
        name: {
          en: 'Number Bonds',
          de: 'Zahlenbindungen',
          fr: 'Liaisons Numériques',
          es: 'Lazos Numéricos',
          it: 'Legami Numerici',
          pt: 'Ligações Numéricas',
          nl: 'Getalbanden',
          sv: 'Talband',
          da: 'Talbind',
          no: 'Tallbånd',
          fi: 'Lukusidokset'
        },
        description: {
          en: 'Practice number relationships',
          de: 'Übe Zahlenbeziehungen',
          fr: 'Pratiquez les relations numériques',
          es: 'Practica relaciones numéricas',
          it: 'Pratica le relazioni numeriche',
          pt: 'Pratique relações numéricas',
          nl: 'Oefen getalrelaties',
          sv: 'Öva talsamband',
          da: 'Øv talforhold',
          no: 'Øv tallforhold',
          fi: 'Harjoittele lukujen välisiä suhteita'
        },
        category: 'math',
        difficulty: 'Easy',
        age_range: {
          en: '5-7 years',
          de: '5-7 Jahre',
          fr: '5-7 ans',
          es: '5-7 años',
          it: '5-7 anni',
          pt: '5-7 anos',
          nl: '5-7 jaar',
          sv: '5-7 år',
          da: '5-7 år',
          no: '5-7 år',
          fi: '5-7 vuotta'
        },
        image_url: '/worksheet-samples/number-bonds.png',
        featured: false,
        sort_order: 20
      },
      {
        id: 'sample-22',
        name: {
          en: 'Map Skills',
          de: 'Kartenfähigkeiten',
          fr: 'Compétences Cartographiques',
          es: 'Habilidades de Mapas',
          it: 'Abilità Cartografiche',
          pt: 'Habilidades de Mapa',
          nl: 'Kaartvaardigheden',
          sv: 'Kartkunskap',
          da: 'Kortfærdigheder',
          no: 'Kartferdigheter',
          fi: 'Karttotaidot'
        },
        description: {
          en: 'Learn to read and use maps',
          de: 'Lerne Karten zu lesen und zu verwenden',
          fr: 'Apprenez à lire et utiliser des cartes',
          es: 'Aprende a leer y usar mapas',
          it: 'Impara a leggere e usare le mappe',
          pt: 'Aprenda a ler e usar mapas',
          nl: 'Leer kaarten lezen en gebruiken',
          sv: 'Lär dig läsa och använda kartor',
          da: 'Lær at læse og bruge kort',
          no: 'Lær å lese og bruke kart',
          fi: 'Opi lukemaan ja käyttämään karttoja'
        },
        category: 'geography',
        difficulty: 'Medium',
        age_range: {
          en: '8-11 years',
          de: '8-11 Jahre',
          fr: '8-11 ans',
          es: '8-11 años',
          it: '8-11 anni',
          pt: '8-11 anos',
          nl: '8-11 jaar',
          sv: '8-11 år',
          da: '8-11 år',
          no: '8-11 år',
          fi: '8-11 vuotta'
        },
        image_url: '/worksheet-samples/maps.png',
        featured: false,
        sort_order: 21
      },
      {
        id: 'sample-23',
        name: {
          en: 'Skip Counting',
          de: 'Überspringzählen',
          fr: 'Comptage par Sauts',
          es: 'Conteo Salteado',
          it: 'Conteggio a Salti',
          pt: 'Contagem Pulada',
          nl: 'Sprongtellen',
          sv: 'Hoppa-räkning',
          da: 'Spring-tælling',
          no: 'Hopp-telling',
          fi: 'Hyppylaskenta'
        },
        description: {
          en: 'Count by 2s, 5s, and 10s',
          de: 'Zähle in 2er-, 5er- und 10er-Schritten',
          fr: 'Comptez par 2, 5 et 10',
          es: 'Cuenta de 2 en 2, 5 en 5 y 10 en 10',
          it: 'Conta per 2, 5 e 10',
          pt: 'Conte de 2 em 2, 5 em 5 e 10 em 10',
          nl: 'Tel met sprongen van 2, 5 en 10',
          sv: 'Räkna med 2, 5 och 10',
          da: 'Tæl med 2, 5 og 10',
          no: 'Tell med 2, 5 og 10',
          fi: 'Laske 2:lla, 5:llä ja 10:llä'
        },
        category: 'math',
        difficulty: 'Easy',
        age_range: {
          en: '5-7 years',
          de: '5-7 Jahre',
          fr: '5-7 ans',
          es: '5-7 años',
          it: '5-7 anni',
          pt: '5-7 anos',
          nl: '5-7 jaar',
          sv: '5-7 år',
          da: '5-7 år',
          no: '5-7 år',
          fi: '5-7 vuotta'
        },
        image_url: '/worksheet-samples/skip-counting.png',
        featured: false,
        sort_order: 22
      },
      {
        id: 'sample-24',
        name: {
          en: 'Rhyming Words',
          de: 'Reimwörter',
          fr: 'Mots qui Riment',
          es: 'Palabras que Riman',
          it: 'Parole in Rima',
          pt: 'Palavras que Rimam',
          nl: 'Rijmwoorden',
          sv: 'Rimord',
          da: 'Rimord',
          no: 'Rimord',
          fi: 'Riimisanat'
        },
        description: {
          en: 'Match and create rhyming words',
          de: 'Finde und erstelle Reimwörter',
          fr: 'Associez et créez des mots qui riment',
          es: 'Empareja y crea palabras que riman',
          it: 'Abbina e crea parole in rima',
          pt: 'Combine e crie palavras que rimam',
          nl: 'Zoek en maak rijmwoorden',
          sv: 'Matcha och skapa rimord',
          da: 'Match og skab rimord',
          no: 'Match og lag rimord',
          fi: 'Yhdistä ja luo riimisanoja'
        },
        category: 'literacy',
        difficulty: 'Easy',
        age_range: {
          en: '4-6 years',
          de: '4-6 Jahre',
          fr: '4-6 ans',
          es: '4-6 años',
          it: '4-6 anni',
          pt: '4-6 anos',
          nl: '4-6 jaar',
          sv: '4-6 år',
          da: '4-6 år',
          no: '4-6 år',
          fi: '4-6 vuotta'
        },
        image_url: '/worksheet-samples/rhyming.png',
        featured: false,
        sort_order: 23
      },
      {
        id: 'sample-25',
        name: {
          en: 'Symmetry Drawing',
          de: 'Symmetrie Zeichnen',
          fr: 'Dessin de Symétrie',
          es: 'Dibujo de Simetría',
          it: 'Disegno di Simmetria',
          pt: 'Desenho de Simetria',
          nl: 'Symmetrie Tekenen',
          sv: 'Symmetriritning',
          da: 'Symmetritegning',
          no: 'Symmetritegning',
          fi: 'Symmetriapiirros'
        },
        description: {
          en: 'Complete symmetrical pictures',
          de: 'Vervollständige symmetrische Bilder',
          fr: 'Complétez des images symétriques',
          es: 'Completa imágenes simétricas',
          it: 'Completa immagini simmetriche',
          pt: 'Complete imagens simétricas',
          nl: 'Voltooi symmetrische plaatjes',
          sv: 'Slutför symmetriska bilder',
          da: 'Fuldend symmetriske billeder',
          no: 'Fullfør symmetriske bilder',
          fi: 'Täydennä symmetriset kuvat'
        },
        category: 'creative',
        difficulty: 'Medium',
        age_range: {
          en: '6-9 years',
          de: '6-9 Jahre',
          fr: '6-9 ans',
          es: '6-9 años',
          it: '6-9 anni',
          pt: '6-9 anos',
          nl: '6-9 jaar',
          sv: '6-9 år',
          da: '6-9 år',
          no: '6-9 år',
          fi: '6-9 vuotta'
        },
        image_url: '/worksheet-samples/symmetry.png',
        featured: false,
        sort_order: 24
      },
      {
        id: 'sample-26',
        name: {
          en: 'Sentence Building',
          de: 'Satzbau',
          fr: 'Construction de Phrases',
          es: 'Construcción de Oraciones',
          it: 'Costruzione di Frasi',
          pt: 'Construção de Frases',
          nl: 'Zinsbouw',
          sv: 'Meningsbyggande',
          da: 'Sætningskonstruktion',
          no: 'Setningsbygging',
          fi: 'Lauseiden rakentaminen'
        },
        description: {
          en: 'Create complete sentences',
          de: 'Erstelle vollständige Sätze',
          fr: 'Créez des phrases complètes',
          es: 'Crea oraciones completas',
          it: 'Crea frasi complete',
          pt: 'Crie frases completas',
          nl: 'Maak volledige zinnen',
          sv: 'Skapa fullständiga meningar',
          da: 'Skab fuldstændige sætninger',
          no: 'Lag fullstendige setninger',
          fi: 'Luo täydellisiä lauseita'
        },
        category: 'literacy',
        difficulty: 'Medium',
        age_range: {
          en: '6-8 years',
          de: '6-8 Jahre',
          fr: '6-8 ans',
          es: '6-8 años',
          it: '6-8 anni',
          pt: '6-8 anos',
          nl: '6-8 jaar',
          sv: '6-8 år',
          da: '6-8 år',
          no: '6-8 år',
          fi: '6-8 vuotta'
        },
        image_url: '/worksheet-samples/sentences.png',
        featured: false,
        sort_order: 25
      },
      {
        id: 'sample-27',
        name: {
          en: 'Division Facts',
          de: 'Divisionsfakten',
          fr: 'Faits de Division',
          es: 'Hechos de División',
          it: 'Fatti di Divisione',
          pt: 'Fatos de Divisão',
          nl: 'Deelingsfakten',
          sv: 'Divisionsfakta',
          da: 'Divisionsfakta',
          no: 'Divisjonsfakta',
          fi: 'Jakolaskut'
        },
        description: {
          en: 'Practice division problems',
          de: 'Übe Divisionsaufgaben',
          fr: 'Pratiquez les problèmes de division',
          es: 'Practica problemas de división',
          it: 'Pratica i problemi di divisione',
          pt: 'Pratique problemas de divisão',
          nl: 'Oefen delingssommen',
          sv: 'Öva divisionsproblem',
          da: 'Øv divisionsproblemer',
          no: 'Øv divisjonsoppgaver',
          fi: 'Harjoittele jakolaskuja'
        },
        category: 'math',
        difficulty: 'Hard',
        age_range: {
          en: '8-10 years',
          de: '8-10 Jahre',
          fr: '8-10 ans',
          es: '8-10 años',
          it: '8-10 anni',
          pt: '8-10 anos',
          nl: '8-10 jaar',
          sv: '8-10 år',
          da: '8-10 år',
          no: '8-10 år',
          fi: '8-10 vuotta'
        },
        image_url: '/worksheet-samples/division.png',
        featured: false,
        sort_order: 26
      },
      {
        id: 'sample-28',
        name: {
          en: 'Adjective Adventure',
          de: 'Adjektiv-Abenteuer',
          fr: 'Aventure des Adjectifs',
          es: 'Aventura de Adjetivos',
          it: 'Avventura degli Aggettivi',
          pt: 'Aventura de Adjetivos',
          nl: 'Bijvoeglijke Naamwoorden Avontuur',
          sv: 'Adjektiväventyr',
          da: 'Adjektiveventyr',
          no: 'Adjektiveventyr',
          fi: 'Adjektiiviseikkailu'
        },
        description: {
          en: 'Learn and use descriptive words',
          de: 'Lerne und verwende beschreibende Wörter',
          fr: 'Apprenez et utilisez des mots descriptifs',
          es: 'Aprende y usa palabras descriptivas',
          it: 'Impara e usa parole descrittive',
          pt: 'Aprenda e use palavras descritivas',
          nl: 'Leer en gebruik beschrijvende woorden',
          sv: 'Lär dig och använd beskrivande ord',
          da: 'Lær og brug beskrivende ord',
          no: 'Lær og bruk beskrivende ord',
          fi: 'Opi ja käytä kuvailevia sanoja'
        },
        category: 'literacy',
        difficulty: 'Medium',
        age_range: {
          en: '7-9 years',
          de: '7-9 Jahre',
          fr: '7-9 ans',
          es: '7-9 años',
          it: '7-9 anni',
          pt: '7-9 anos',
          nl: '7-9 jaar',
          sv: '7-9 år',
          da: '7-9 år',
          no: '7-9 år',
          fi: '7-9 vuotta'
        },
        image_url: '/worksheet-samples/adjectives.png',
        featured: false,
        sort_order: 27
      },
      {
        id: 'sample-29',
        name: {
          en: 'Bar Graph Analysis',
          de: 'Balkendiagramm-Analyse',
          fr: 'Analyse de Graphique à Barres',
          es: 'Análisis de Gráfico de Barras',
          it: 'Analisi del Grafico a Barre',
          pt: 'Análise de Gráfico de Barras',
          nl: 'Staafdiagram Analyse',
          sv: 'Stapeldiagramanalys',
          da: 'Søjlediagramanalyse',
          no: 'Søylediagramanalyse',
          fi: 'Pylväsdiagrammin analyysi'
        },
        description: {
          en: 'Read and interpret bar graphs',
          de: 'Lese und interpretiere Balkendiagramme',
          fr: 'Lisez et interprétez des graphiques à barres',
          es: 'Lee e interpreta gráficos de barras',
          it: 'Leggi e interpreta i grafici a barre',
          pt: 'Leia e interprete gráficos de barras',
          nl: 'Lees en interpreteer staafdiagrammen',
          sv: 'Läs och tolka stapeldiagram',
          da: 'Læs og fortolk søjlediagrammer',
          no: 'Les og tolke søylediagrammer',
          fi: 'Lue ja tulkitse pylväsdiagrammeja'
        },
        category: 'math',
        difficulty: 'Medium',
        age_range: {
          en: '7-10 years',
          de: '7-10 Jahre',
          fr: '7-10 ans',
          es: '7-10 años',
          it: '7-10 anni',
          pt: '7-10 anos',
          nl: '7-10 jaar',
          sv: '7-10 år',
          da: '7-10 år',
          no: '7-10 år',
          fi: '7-10 vuotta'
        },
        image_url: '/worksheet-samples/bar-graph.png',
        featured: false,
        sort_order: 28
      },
      {
        id: 'sample-30',
        name: {
          en: 'Spelling Practice',
          de: 'Rechtschreibübung',
          fr: 'Pratique Orthographique',
          es: 'Práctica de Ortografía',
          it: 'Pratica di Ortografia',
          pt: 'Prática de Ortografia',
          nl: 'Spellingsoefening',
          sv: 'Stavningsövning',
          da: 'Stavningsøvelse',
          no: 'Stavingsøvelse',
          fi: 'Oikeinkirjoitusharjoitus'
        },
        description: {
          en: 'Practice spelling words',
          de: 'Übe Rechtschreibwörter',
          fr: 'Pratiquez les mots d\'orthographe',
          es: 'Practica palabras de ortografía',
          it: 'Pratica le parole di ortografia',
          pt: 'Pratique palavras de ortografia',
          nl: 'Oefen spellingwoorden',
          sv: 'Öva stavningsord',
          da: 'Øv stavningsord',
          no: 'Øv stavingsord',
          fi: 'Harjoittele oikeinkirjoitusta'
        },
        category: 'literacy',
        difficulty: 'Medium',
        age_range: {
          en: '6-9 years',
          de: '6-9 Jahre',
          fr: '6-9 ans',
          es: '6-9 años',
          it: '6-9 anni',
          pt: '6-9 anos',
          nl: '6-9 jaar',
          sv: '6-9 år',
          da: '6-9 år',
          no: '6-9 år',
          fi: '6-9 vuotta'
        },
        image_url: '/worksheet-samples/spelling.png',
        featured: false,
        sort_order: 29
      },
      {
        id: 'sample-31',
        name: {
          en: 'Tangram Puzzles',
          de: 'Tangram-Rätsel',
          fr: 'Puzzles Tangram',
          es: 'Rompecabezas Tangram',
          it: 'Puzzle Tangram',
          pt: 'Quebra-cabeças Tangram',
          nl: 'Tangram Puzzels',
          sv: 'Tangram Pussel',
          da: 'Tangram Gåder',
          no: 'Tangram Oppgaver',
          fi: 'Tangram-palapelit'
        },
        description: {
          en: 'Arrange shapes to form pictures',
          de: 'Ordne Formen an um Bilder zu bilden',
          fr: 'Disposez les formes pour former des images',
          es: 'Organiza formas para formar imágenes',
          it: 'Disponi le forme per formare immagini',
          pt: 'Organize formas para formar imagens',
          nl: 'Rangschik vormen om plaatjes te vormen',
          sv: 'Arrangera former för att bilda bilder',
          da: 'Arranger former for at danne billeder',
          no: 'Arranger former for å lage bilder',
          fi: 'Järjestä muotoja kuvan muodostamiseksi'
        },
        category: 'puzzle',
        difficulty: 'Hard',
        age_range: {
          en: '7-12 years',
          de: '7-12 Jahre',
          fr: '7-12 ans',
          es: '7-12 años',
          it: '7-12 anni',
          pt: '7-12 anos',
          nl: '7-12 jaar',
          sv: '7-12 år',
          da: '7-12 år',
          no: '7-12 år',
          fi: '7-12 vuotta'
        },
        image_url: '/worksheet-samples/tangram.png',
        featured: false,
        sort_order: 30
      },
      {
        id: 'sample-32',
        name: {
          en: 'Calendar Skills',
          de: 'Kalenderfähigkeiten',
          fr: 'Compétences de Calendrier',
          es: 'Habilidades de Calendario',
          it: 'Abilità del Calendario',
          pt: 'Habilidades de Calendário',
          nl: 'Kalendervaardigheden',
          sv: 'Kalenderkunskap',
          da: 'Kalenderfærdigheder',
          no: 'Kalenderferdigheter',
          fi: 'Kalenteritaidot'
        },
        description: {
          en: 'Learn days, months, and dates',
          de: 'Lerne Tage, Monate und Daten',
          fr: 'Apprenez les jours, mois et dates',
          es: 'Aprende días, meses y fechas',
          it: 'Impara giorni, mesi e date',
          pt: 'Aprenda dias, meses e datas',
          nl: 'Leer dagen, maanden en data',
          sv: 'Lär dig dagar, månader och datum',
          da: 'Lær dage, måneder og datoer',
          no: 'Lær dager, måneder og datoer',
          fi: 'Opi päivät, kuukaudet ja päivämäärät'
        },
        category: 'math',
        difficulty: 'Easy',
        age_range: {
          en: '5-8 years',
          de: '5-8 Jahre',
          fr: '5-8 ans',
          es: '5-8 años',
          it: '5-8 anni',
          pt: '5-8 anos',
          nl: '5-8 jaar',
          sv: '5-8 år',
          da: '5-8 år',
          no: '5-8 år',
          fi: '5-8 vuotta'
        },
        image_url: '/worksheet-samples/calendar.png',
        featured: false,
        sort_order: 31
      },
      {
        id: 'sample-33',
        name: {
          en: 'Weather Observation',
          de: 'Wetterbeobachtung',
          fr: 'Observation Météorologique',
          es: 'Observación del Clima',
          it: 'Osservazione Meteorologica',
          pt: 'Observação do Tempo',
          nl: 'Weerobservatie',
          sv: 'Väderobservation',
          da: 'Vejrobservation',
          no: 'Værobservasjon',
          fi: 'Säähavainto'
        },
        description: {
          en: 'Track and record weather patterns',
          de: 'Verfolge und notiere Wettermuster',
          fr: 'Suivez et enregistrez les modèles météorologiques',
          es: 'Rastrea y registra patrones climáticos',
          it: 'Traccia e registra i modelli meteorologici',
          pt: 'Rastreie e registre padrões climáticos',
          nl: 'Volg en noteer weerpatronen',
          sv: 'Spåra och registrera vädermönster',
          da: 'Spor og optag vejrmønstre',
          no: 'Spor og registrer værmønstre',
          fi: 'Seuraa ja kirjaa säämalleja'
        },
        category: 'science',
        difficulty: 'Easy',
        age_range: {
          en: '5-8 years',
          de: '5-8 Jahre',
          fr: '5-8 ans',
          es: '5-8 años',
          it: '5-8 anni',
          pt: '5-8 anos',
          nl: '5-8 jaar',
          sv: '5-8 år',
          da: '5-8 år',
          no: '5-8 år',
          fi: '5-8 vuotta'
        },
        image_url: '/worksheet-samples/weather.png',
        featured: false,
        sort_order: 32
      }
    ];
  }

  private getDefaultPricing(): PricingTier[] {
    return [
      {
        id: 'pricing-1',
        name: {
          en: 'Free Tier',
          de: 'Kostenlos',
          fr: 'Gratuit',
          es: 'Gratis',
          it: 'Gratuito',
          pt: 'Grátis',
          nl: 'Gratis',
          sv: 'Gratis',
          da: 'Gratis',
          no: 'Gratis',
          fi: 'Ilmainen'
        },
        price: '$0',
        price_period: '',
        features: {
          en: ['3 worksheet generators', 'Basic image library', 'Watermarked PDFs', 'Community support'],
          de: ['3 Arbeitsblatt-Generatoren', 'Basis-Bildbibliothek', 'PDFs mit Wasserzeichen', 'Community-Support'],
          fr: ['3 générateurs de feuilles', 'Bibliothèque d\'images de base', 'PDF avec filigrane', 'Support communautaire'],
          es: ['3 generadores de hojas', 'Biblioteca de imágenes básica', 'PDF con marca de agua', 'Soporte comunitario'],
          it: ['3 generatori di fogli', 'Libreria immagini di base', 'PDF con filigrana', 'Supporto della comunità'],
          pt: ['3 geradores de planilhas', 'Biblioteca de imagens básica', 'PDFs com marca d\'água', 'Suporte da comunidade'],
          nl: ['3 werkbladgeneratoren', 'Basis afbeeldingenbibliotheek', 'PDF\'s met watermerk', 'Community-ondersteuning'],
          sv: ['3 arbetsbladsgeneratorer', 'Grundläggande bildbibliotek', 'PDF med vattenstämpel', 'Community-stöd'],
          da: ['3 arbejdsark-generatorer', 'Basis billedbibliotek', 'PDF\'er med vandmærke', 'Community-support'],
          no: ['3 arbeidsarkgeneratorer', 'Grunnleggende bildebibliotek', 'PDF-er med vannmerke', 'Community-støtte'],
          fi: ['3 työarkkigeneraattoria', 'Peruskirjasto', 'PDF vesileimalla', 'Yhteisötuki']
        },
        cta_text: {
          en: 'Start Free',
          de: 'Kostenlos starten',
          fr: 'Commencer gratuitement',
          es: 'Comenzar gratis',
          it: 'Inizia gratis',
          pt: 'Começar grátis',
          nl: 'Start gratis',
          sv: 'Börja gratis',
          da: 'Start gratis',
          no: 'Start gratis',
          fi: 'Aloita ilmaiseksi'
        },
        cta_link: '/auth/signup',
        highlighted: false,
        badge_text: {
          en: '',
          de: '',
          fr: '',
          es: '',
          it: '',
          pt: '',
          nl: '',
          sv: '',
          da: '',
          no: '',
          fi: ''
        },
        sort_order: 0
      },
      {
        id: 'pricing-2',
        name: {
          en: 'Core Bundle',
          de: 'Kern-Paket',
          fr: 'Pack de base',
          es: 'Paquete básico',
          it: 'Pacchetto base',
          pt: 'Pacote básico',
          nl: 'Basispakket',
          sv: 'Baspaket',
          da: 'Basispakke',
          no: 'Basispakke',
          fi: 'Peruspaketti'
        },
        price: '$15',
        price_period: '/month',
        features: {
          en: ['15 worksheet generators', 'Full image library', 'Unlimited downloads', 'Priority support'],
          de: ['15 Arbeitsblatt-Generatoren', 'Vollständige Bildbibliothek', 'Unbegrenzte Downloads', 'Prioritäts-Support'],
          fr: ['15 générateurs de feuilles', 'Bibliothèque d\'images complète', 'Téléchargements illimités', 'Support prioritaire'],
          es: ['15 generadores de hojas', 'Biblioteca de imágenes completa', 'Descargas ilimitadas', 'Soporte prioritario'],
          it: ['15 generatori di fogli', 'Libreria immagini completa', 'Download illimitati', 'Supporto prioritario'],
          pt: ['15 geradores de planilhas', 'Biblioteca de imagens completa', 'Downloads ilimitados', 'Suporte prioritário'],
          nl: ['15 werkbladgeneratoren', 'Volledige afbeeldingenbibliotheek', 'Onbeperkte downloads', 'Prioriteitsondersteuning'],
          sv: ['15 arbetsbladsgeneratorer', 'Fullständigt bildbibliotek', 'Obegränsade nedladdningar', 'Prioritetsstöd'],
          da: ['15 arbejdsark-generatorer', 'Fuldt billedbibliotek', 'Ubegrænsede downloads', 'Prioritetssupport'],
          no: ['15 arbeidsarkgeneratorer', 'Fullstendig bildebibliotek', 'Ubegrensede nedlastninger', 'Prioritetsstøtte'],
          fi: ['15 työarkkigeneraattoria', 'Täydellinen kuvakirjasto', 'Rajoittamattomat lataukset', 'Prioriteettituki']
        },
        cta_text: {
          en: 'Choose Core',
          de: 'Kern wählen',
          fr: 'Choisir de base',
          es: 'Elegir básico',
          it: 'Scegli base',
          pt: 'Escolher básico',
          nl: 'Kies basis',
          sv: 'Välj bas',
          da: 'Vælg basis',
          no: 'Velg basis',
          fi: 'Valitse perus'
        },
        cta_link: '/pricing',
        highlighted: false,
        badge_text: {
          en: '',
          de: '',
          fr: '',
          es: '',
          it: '',
          pt: '',
          nl: '',
          sv: '',
          da: '',
          no: '',
          fi: ''
        },
        sort_order: 1
      },
      {
        id: 'pricing-3',
        name: {
          en: 'Full Access',
          de: 'Vollzugriff',
          fr: 'Accès complet',
          es: 'Acceso completo',
          it: 'Accesso completo',
          pt: 'Acesso completo',
          nl: 'Volledige toegang',
          sv: 'Full åtkomst',
          da: 'Fuld adgang',
          no: 'Full tilgang',
          fi: 'Täysi pääsy'
        },
        price: '$25',
        price_period: '/month',
        features: {
          en: ['All 33 generators', 'Premium images', 'Unlimited downloads', 'Priority support', 'Early access to new features'],
          de: ['Alle 33 Generatoren', 'Premium-Bilder', 'Unbegrenzte Downloads', 'Prioritäts-Support', 'Frühzugriff auf neue Funktionen'],
          fr: ['Tous les 33 générateurs', 'Images premium', 'Téléchargements illimités', 'Support prioritaire', 'Accès anticipé aux nouvelles fonctionnalités'],
          es: ['Todos los 33 generadores', 'Imágenes premium', 'Descargas ilimitadas', 'Soporte prioritario', 'Acceso anticipado a nuevas funciones'],
          it: ['Tutti i 33 generatori', 'Immagini premium', 'Download illimitati', 'Supporto prioritario', 'Accesso anticipato alle nuove funzionalità'],
          pt: ['Todos os 33 geradores', 'Imagens premium', 'Downloads ilimitados', 'Suporte prioritário', 'Acesso antecipado a novos recursos'],
          nl: ['Alle 33 generatoren', 'Premium-afbeeldingen', 'Onbeperkte downloads', 'Prioriteitsondersteuning', 'Vroege toegang tot nieuwe functies'],
          sv: ['Alla 33 generatorer', 'Premiumbilder', 'Obegränsade nedladdningar', 'Prioritetsstöd', 'Tidig tillgång till nya funktioner'],
          da: ['Alle 33 generatorer', 'Premium-billeder', 'Ubegrænsede downloads', 'Prioritetssupport', 'Tidlig adgang til nye funktioner'],
          no: ['Alle 33 generatorer', 'Premiumbilder', 'Ubegrensede nedlastninger', 'Prioritetsstøtte', 'Tidlig tilgang til nye funksjoner'],
          fi: ['Kaikki 33 generaattoria', 'Premium-kuvat', 'Rajoittamattomat lataukset', 'Prioriteettituki', 'Varhainen pääsy uusiin ominaisuuksiin']
        },
        cta_text: {
          en: 'Get Full Access',
          de: 'Vollzugriff erhalten',
          fr: 'Obtenir un accès complet',
          es: 'Obtener acceso completo',
          it: 'Ottieni accesso completo',
          pt: 'Obter acesso completo',
          nl: 'Krijg volledige toegang',
          sv: 'Få full åtkomst',
          da: 'Få fuld adgang',
          no: 'Få full tilgang',
          fi: 'Hanki täysi pääsy'
        },
        cta_link: '/pricing',
        highlighted: true,
        badge_text: {
          en: 'Most Popular',
          de: 'Am beliebtesten',
          fr: 'Le plus populaire',
          es: 'Más popular',
          it: 'Più popolare',
          pt: 'Mais popular',
          nl: 'Populairst',
          sv: 'Populärast',
          da: 'Mest populære',
          no: 'Mest populær',
          fi: 'Suosituin'
        },
        sort_order: 2
      }
    ];
  }

  private getDefaultSEO(): HomepageContent['seo'] {
    return {
      title: { en: 'LessonCraftStudio' },
      description: { en: 'Professional worksheet generators' },
      keywords: { en: 'worksheets, education' }
    };
  }
}

export const homepageContentManager = new HomepageContentManager();