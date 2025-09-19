// Homepage Content Manager
// Manages all homepage content through Directus CMS

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
  age_range: string;
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
      // Check for cached content first (for development)
      if (this.cachedContent) {
        return this.cachedContent;
      }

      // Check global cache (server-side)
      if (typeof window === 'undefined' && (global as any).__homepageContent) {
        return (global as any).__homepageContent;
      }
      const [hero, features, samples, pricing, seo] = await Promise.all([
        this.getHeroSection(locale),
        this.getFeatures(locale),
        this.getSamples(locale),
        this.getPricingTiers(locale),
        this.getSEOContent(locale)
      ]);

      return {
        hero,
        navigation: this.getNavigationContent(),
        featuresSection: this.getFeaturesSectionHeader(),
        features,
        samplesSection: this.getSamplesSectionContent(),
        samples,
        pricingSection: this.getPricingSectionContent(),
        pricing,
        footer: this.getFooterContent(),
        commonUI: this.getCommonUIContent(),
        seo
      };
    } catch (error) {
      console.error('Error fetching homepage content:', error);
      return this.getDefaultContent(locale);
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

  // Get worksheet samples
  private async getSamples(locale: string): Promise<WorksheetSample[]> {
    try {
      const response = await fetch(`${this.directusUrl}/items/homepage_samples?sort=sort_order`, {
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
      console.error('Error fetching samples:', error);
    }

    // Return default samples with all 11 languages
    return [
      {
        name: {
          en: 'Alphabet Train',
          de: 'Alphabet-Zug',
          fr: 'Train Alphabet',
          es: 'Tren del Alfabeto',
          it: 'Treno dell\'Alfabeto',
          pt: 'Trem do Alfabeto',
          nl: 'Alfabet Trein',
          sv: 'Alfabetståg',
          da: 'Alfabet-tog',
          no: 'Alfabet-tog',
          fi: 'Aakkos-juna'
        },
        description: {
          en: 'Fun alphabet learning with colorful train cars',
          de: 'Spaßiges Alphabet-Lernen mit bunten Zugwaggons',
          fr: 'Apprentissage amusant de l\'alphabet avec des wagons colorés',
          es: 'Aprendizaje divertido del alfabeto con vagones coloridos',
          it: 'Apprendimento divertente dell\'alfabeto con vagoni colorati',
          pt: 'Aprendizagem divertida do alfabeto com vagões coloridos',
          nl: 'Leuk alfabet leren met kleurrijke treinwagons',
          sv: 'Rolig alfabetsinlärning med färgglada tågvagnar',
          da: 'Sjov alfabetlæring med farverige togvogne',
          no: 'Morsom alfabetlæring med fargerike togvogner',
          fi: 'Hauska aakkosten oppiminen värikkäillä junavaunuilla'
        },
        category: 'literacy',
        difficulty: 'Easy',
        age_range: '3-5 years',
        image_url: '/worksheet-samples/alphabet.png',
        featured: true,
        sort_order: 1
      },
      {
        name: {
          en: 'Code Addition',
          de: 'Code-Addition',
          fr: 'Addition Codée',
          es: 'Adición Codificada',
          it: 'Addizione in Codice',
          pt: 'Adição Codificada',
          nl: 'Code Optellen',
          sv: 'Kodaddition',
          da: 'Kode Addition',
          no: 'Kode Addisjon',
          fi: 'Koodi Yhteenlasku'
        },
        description: {
          en: 'Crack the code with addition puzzles',
          de: 'Knacke den Code mit Additionsrätseln',
          fr: 'Déchiffrez le code avec des puzzles d\'addition',
          es: 'Descifra el código con rompecabezas de suma',
          it: 'Decifra il codice con puzzle di addizione',
          pt: 'Decifre o código com quebra-cabeças de adição',
          nl: 'Kraak de code met optelpuzzels',
          sv: 'Knäck koden med additionspussel',
          da: 'Knæk koden med additionspuslespil',
          no: 'Knekk koden med addisjonsoppgaver',
          fi: 'Murra koodi yhteenlaskupulmilla'
        },
        category: 'math',
        difficulty: 'Medium',
        age_range: '6-8 years',
        image_url: '/worksheet-samples/code-addition.png',
        featured: false,
        sort_order: 2
      },
      {
        name: {
          en: 'Chart & Count',
          de: 'Diagramm & Zählen',
          fr: 'Graphique & Compter',
          es: 'Gráfico y Contar',
          it: 'Grafico e Conta',
          pt: 'Gráfico e Contar',
          nl: 'Grafiek & Tellen',
          sv: 'Diagram & Räkna',
          da: 'Diagram & Tæl',
          no: 'Diagram & Tell',
          fi: 'Kaavio & Laske'
        },
        description: {
          en: 'Learn graphing and data visualization',
          de: 'Lernen Sie Grafiken und Datenvisualisierung',
          fr: 'Apprendre les graphiques et la visualisation de données',
          es: 'Aprende gráficos y visualización de datos',
          it: 'Impara grafici e visualizzazione dei dati',
          pt: 'Aprenda gráficos e visualização de dados',
          nl: 'Leer grafieken en datavisualisatie',
          sv: 'Lär dig diagram och datavisualisering',
          da: 'Lær diagrammer og datavisualisering',
          no: 'Lær diagrammer og datavisualisering',
          fi: 'Opi kaavioita ja tiedon visualisointia'
        },
        category: 'math',
        difficulty: 'Medium',
        age_range: '7-10 years',
        image_url: '/worksheet-samples/graph.png',
        featured: false,
        sort_order: 3
      },
      {
        name: {
          en: 'Hidden Objects',
          de: 'Versteckte Objekte',
          fr: 'Objets Cachés',
          es: 'Objetos Ocultos',
          it: 'Oggetti Nascosti',
          pt: 'Objetos Escondidos',
          nl: 'Verborgen Objecten',
          sv: 'Gömda Objekt',
          da: 'Skjulte Objekter',
          no: 'Skjulte Objekter',
          fi: 'Piilotetut Esineet'
        },
        description: {
          en: 'Find hidden objects in detailed scenes',
          de: 'Finde versteckte Objekte in detaillierten Szenen',
          fr: 'Trouvez des objets cachés dans des scènes détaillées',
          es: 'Encuentra objetos ocultos en escenas detalladas',
          it: 'Trova oggetti nascosti in scene dettagliate',
          pt: 'Encontre objetos escondidos em cenas detalhadas',
          nl: 'Vind verborgen objecten in gedetailleerde scènes',
          sv: 'Hitta gömda objekt i detaljerade scener',
          da: 'Find skjulte objekter i detaljerede scener',
          no: 'Finn skjulte objekter i detaljerte scener',
          fi: 'Löydä piilotettuja esineitä yksityiskohtaisista kohtauksista'
        },
        category: 'puzzle',
        difficulty: 'Easy',
        age_range: '5-8 years',
        image_url: '/worksheet-samples/hidden-object.png',
        featured: true,
        sort_order: 4
      },
      {
        name: {
          en: 'I Spy Game',
          de: 'Ich Sehe Was',
          fr: 'Jeu J\'espionne',
          es: 'Juego Veo Veo',
          it: 'Gioco Spio',
          pt: 'Jogo Eu Espio',
          nl: 'Ik Zie Wat Jij Niet Ziet',
          sv: 'Jag Ser Spel',
          da: 'Jeg Ser Spil',
          no: 'Jeg Ser Spill',
          fi: 'Vakoilupeli'
        },
        description: {
          en: 'Classic I Spy searching game',
          de: 'Klassisches Ich-sehe-was Suchspiel',
          fr: 'Jeu de recherche classique J\'espionne',
          es: 'Clásico juego de búsqueda Veo Veo',
          it: 'Classico gioco di ricerca Spio',
          pt: 'Clássico jogo de busca Eu Espio',
          nl: 'Klassiek zoekspel',
          sv: 'Klassiskt sökspel',
          da: 'Klassisk søgespil',
          no: 'Klassisk søkespill',
          fi: 'Klassinen etsintäpeli'
        },
        category: 'puzzle',
        difficulty: 'Easy',
        age_range: '4-7 years',
        image_url: '/worksheet-samples/i-spy.png',
        featured: false,
        sort_order: 5
      },
      {
        name: {
          en: 'Pattern Train',
          de: 'Muster-Zug',
          fr: 'Train de Motifs',
          es: 'Tren de Patrones',
          it: 'Treno dei Pattern',
          pt: 'Trem de Padrões',
          nl: 'Patroon Trein',
          sv: 'Mönståg',
          da: 'Mønstertog',
          no: 'Mønstertog',
          fi: 'Kuviojuna'
        },
        description: {
          en: 'Complete the pattern sequences',
          de: 'Vervollständige die Mustersequenzen',
          fr: 'Complétez les séquences de motifs',
          es: 'Completa las secuencias de patrones',
          it: 'Completa le sequenze di pattern',
          pt: 'Complete as sequências de padrões',
          nl: 'Maak de patroonreeksen af',
          sv: 'Komplettera mönstersekvenserna',
          da: 'Fuldfør mønstersekvenserne',
          no: 'Fullfør mønstersekvensene',
          fi: 'Täydennä kuviosarjat'
        },
        category: 'logic',
        difficulty: 'Medium',
        age_range: '5-8 years',
        image_url: '/worksheet-samples/train.png',
        featured: true,
        sort_order: 6
      }
    ];
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

  // Save methods for admin interface
  async saveHeroSection(hero: HeroSection): Promise<boolean> {
    try {
      const response = await fetch(`${this.directusUrl}/items/homepage_hero/1`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(hero)
      });
      return response.ok;
    } catch (error) {
      console.error('Error saving hero section:', error);
      return false;
    }
  }

  async saveFeature(feature: FeatureItem): Promise<boolean> {
    try {
      const method = feature.id ? 'PATCH' : 'POST';
      const url = feature.id
        ? `${this.directusUrl}/items/homepage_features/${feature.id}`
        : `${this.directusUrl}/items/homepage_features`;

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feature)
      });
      return response.ok;
    } catch (error) {
      console.error('Error saving feature:', error);
      return false;
    }
  }

  async saveSample(sample: WorksheetSample): Promise<boolean> {
    try {
      const method = sample.id ? 'PATCH' : 'POST';
      const url = sample.id
        ? `${this.directusUrl}/items/homepage_samples/${sample.id}`
        : `${this.directusUrl}/items/homepage_samples`;

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sample)
      });
      return response.ok;
    } catch (error) {
      console.error('Error saving sample:', error);
      return false;
    }
  }

  async savePricingTier(tier: PricingTier): Promise<boolean> {
    try {
      const method = tier.id ? 'PATCH' : 'POST';
      const url = tier.id
        ? `${this.directusUrl}/items/homepage_pricing/${tier.id}`
        : `${this.directusUrl}/items/homepage_pricing`;

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tier)
      });
      return response.ok;
    } catch (error) {
      console.error('Error saving pricing tier:', error);
      return false;
    }
  }

  // Helper method to save content to file (for development - in production would use database)
  private async saveToFile(content: HomepageContent): Promise<void> {
    // In development, we'll store in memory and update the default
    // In production, this would save to database
    this.cachedContent = content;
    // Also update the next API response
    if (typeof window === 'undefined') {
      // Server-side: store in memory
      (global as any).__homepageContent = content;
    }
  }

  // Additional save methods
  async saveNavigationSection(navigation: any): Promise<boolean> {
    try {
      const content = await this.getHomepageContent('en');
      content.navigation = navigation;
      await this.saveToFile(content);
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
      await this.saveToFile(content);
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
      await this.saveToFile(content);
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
      await this.saveToFile(content);
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
      await this.saveToFile(content);
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
      await this.saveToFile(content);
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
      await this.saveToFile(content);
      return true;
    } catch (error) {
      console.error('Error saving SEO:', error);
      return false;
    }
  }

  async saveAllContent(fullContent: HomepageContent): Promise<boolean> {
    try {
      await this.saveToFile(fullContent);
      return true;
    } catch (error) {
      console.error('Error saving all content:', error);
      return false;
    }
  }

  // Delete methods
  async deleteFeature(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.directusUrl}/items/homepage_features/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting feature:', error);
      return false;
    }
  }

  async deleteSample(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.directusUrl}/items/homepage_samples/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting sample:', error);
      return false;
    }
  }

  async deletePricingTier(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.directusUrl}/items/homepage_pricing/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`
        }
      });
      return response.ok;
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
      title: { en: 'Create Professional Worksheets in Minutes' },
      subtitle: { en: '33 powerful worksheet generators with 100+ themed images' },
      cta_primary_text: { en: 'Try Word Search Free' },
      cta_primary_link: '/apps/word-search',
      cta_secondary_text: { en: 'View All Apps' },
      cta_secondary_link: '/apps',
      background_gradient: 'from-primary-50 to-white'
    };
  }

  private getDefaultFeatures(): FeatureItem[] {
    return [];
  }

  private getDefaultSamples(): WorksheetSample[] {
    return [];
  }

  private getDefaultPricing(): PricingTier[] {
    return [];
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