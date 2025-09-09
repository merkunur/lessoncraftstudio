import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class FindAndCountGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.selectedImages = [];
    this.worksheetCanvas = null;
    this.fabricInstances = new Set();
    this.currentLocale = 'en';
    this.currentCanvasConfig = { width: 612, height: 792 }; // Letter Portrait default
    this.displayWidth = 600;
    this.displayHeight = Math.round(600 * 792 / 612);
    this.imagesLoaded = false;
    this.lazyLoadOffset = 10;
  }

  get appName() {
    return 'find-and-count';
  }

  getDefaultTranslations() {
    return {
      en: {
        findAndCount: {
          title: 'Find and Count Worksheet',
          selectImages: 'Select Images to Find',
          objectCount: 'Objects per Image (3-8)',
          includeDistractors: 'Include Distractor Images',
          generate: 'Generate Worksheet',
          noImagesError: 'Please select at least one image',
          generating: 'Creating worksheet...',
          themeSelect: 'Select Theme',
          searchImages: 'Search images...',
          allThemes: 'All Themes',
          language: 'Language',
          pageSize: 'Page Size',
          letterPortrait: 'Letter Portrait (612x792)',
          letterLandscape: 'Letter Landscape (792x612)',
          a4Portrait: 'A4 Portrait (595x842)',
          a4Landscape: 'A4 Landscape (842x595)',
          square: 'Square (1200x1200)',
          custom: 'Custom',
          customWidth: 'Width (pt)',
          customHeight: 'Height (pt)',
          download: 'Download',
          downloadPDF: 'Download PDF',
          downloadJPEG: 'Download JPEG',
          print: 'Print',
          instructions: 'Count how many of each object you can find:',
          countThe: 'Count the'
        }
      },
      de: {
        findAndCount: {
          title: 'Finde und Zähle Arbeitsblatt',
          selectImages: 'Bilder zum Finden auswählen',
          objectCount: 'Objekte pro Bild (3-8)',
          includeDistractors: 'Ablenkungsbilder einschließen',
          generate: 'Arbeitsblatt erstellen',
          noImagesError: 'Bitte wählen Sie mindestens ein Bild aus',
          generating: 'Erstelle Arbeitsblatt...',
          themeSelect: 'Thema auswählen',
          searchImages: 'Bilder suchen...',
          allThemes: 'Alle Themen',
          language: 'Sprache',
          pageSize: 'Seitengröße',
          letterPortrait: 'Letter Hochformat (612x792)',
          letterLandscape: 'Letter Querformat (792x612)',
          a4Portrait: 'A4 Hochformat (595x842)',
          a4Landscape: 'A4 Querformat (842x595)',
          square: 'Quadrat (1200x1200)',
          custom: 'Benutzerdefiniert',
          customWidth: 'Breite (pt)',
          customHeight: 'Höhe (pt)',
          download: 'Herunterladen',
          downloadPDF: 'PDF herunterladen',
          downloadJPEG: 'JPEG herunterladen',
          print: 'Drucken',
          instructions: 'Zähle, wie viele von jedem Objekt du finden kannst:',
          countThe: 'Zähle die'
        }
      },
      fr: {
        findAndCount: {
          title: 'Trouve et Compte Feuille de Travail',
          selectImages: 'Sélectionner les Images à Trouver',
          objectCount: 'Objets par Image (3-8)',
          includeDistractors: 'Inclure des Images de Distraction',
          generate: 'Générer la Feuille',
          noImagesError: 'Veuillez sélectionner au moins une image',
          generating: 'Création de la feuille...',
          themeSelect: 'Sélectionner un Thème',
          searchImages: 'Rechercher des images...',
          allThemes: 'Tous les Thèmes',
          language: 'Langue',
          pageSize: 'Taille de Page',
          letterPortrait: 'Letter Portrait (612x792)',
          letterLandscape: 'Letter Paysage (792x612)',
          a4Portrait: 'A4 Portrait (595x842)',
          a4Landscape: 'A4 Paysage (842x595)',
          square: 'Carré (1200x1200)',
          custom: 'Personnalisé',
          customWidth: 'Largeur (pt)',
          customHeight: 'Hauteur (pt)',
          download: 'Télécharger',
          downloadPDF: 'Télécharger PDF',
          downloadJPEG: 'Télécharger JPEG',
          print: 'Imprimer',
          instructions: 'Compte combien de chaque objet tu peux trouver:',
          countThe: 'Compte les'
        }
      },
      es: {
        findAndCount: {
          title: 'Encuentra y Cuenta Hoja de Trabajo',
          selectImages: 'Seleccionar Imágenes para Encontrar',
          objectCount: 'Objetos por Imagen (3-8)',
          includeDistractors: 'Incluir Imágenes de Distracción',
          generate: 'Generar Hoja',
          noImagesError: 'Por favor selecciona al menos una imagen',
          generating: 'Creando hoja de trabajo...',
          themeSelect: 'Seleccionar Tema',
          searchImages: 'Buscar imágenes...',
          allThemes: 'Todos los Temas',
          language: 'Idioma',
          pageSize: 'Tamaño de Página',
          letterPortrait: 'Carta Vertical (612x792)',
          letterLandscape: 'Carta Horizontal (792x612)',
          a4Portrait: 'A4 Vertical (595x842)',
          a4Landscape: 'A4 Horizontal (842x595)',
          square: 'Cuadrado (1200x1200)',
          custom: 'Personalizado',
          customWidth: 'Ancho (pt)',
          customHeight: 'Alto (pt)',
          download: 'Descargar',
          downloadPDF: 'Descargar PDF',
          downloadJPEG: 'Descargar JPEG',
          print: 'Imprimir',
          instructions: 'Cuenta cuántos de cada objeto puedes encontrar:',
          countThe: 'Cuenta los'
        }
      },
      pt: {
        findAndCount: {
          title: 'Encontre e Conte Folha de Trabalho',
          selectImages: 'Selecionar Imagens para Encontrar',
          objectCount: 'Objetos por Imagem (3-8)',
          includeDistractors: 'Incluir Imagens de Distração',
          generate: 'Gerar Folha',
          noImagesError: 'Por favor selecione pelo menos uma imagem',
          generating: 'Criando folha de trabalho...',
          themeSelect: 'Selecionar Tema',
          searchImages: 'Pesquisar imagens...',
          allThemes: 'Todos os Temas',
          language: 'Idioma',
          pageSize: 'Tamanho da Página',
          letterPortrait: 'Carta Retrato (612x792)',
          letterLandscape: 'Carta Paisagem (792x612)',
          a4Portrait: 'A4 Retrato (595x842)',
          a4Landscape: 'A4 Paisagem (842x595)',
          square: 'Quadrado (1200x1200)',
          custom: 'Personalizado',
          customWidth: 'Largura (pt)',
          customHeight: 'Altura (pt)',
          download: 'Baixar',
          downloadPDF: 'Baixar PDF',
          downloadJPEG: 'Baixar JPEG',
          print: 'Imprimir',
          instructions: 'Conte quantos de cada objeto você pode encontrar:',
          countThe: 'Conte os'
        }
      },
      it: {
        findAndCount: {
          title: 'Trova e Conta Foglio di Lavoro',
          selectImages: 'Seleziona Immagini da Trovare',
          objectCount: 'Oggetti per Immagine (3-8)',
          includeDistractors: 'Includi Immagini di Distrazione',
          generate: 'Genera Foglio',
          noImagesError: 'Seleziona almeno un\'immagine',
          generating: 'Creazione foglio...',
          themeSelect: 'Seleziona Tema',
          searchImages: 'Cerca immagini...',
          allThemes: 'Tutti i Temi',
          language: 'Lingua',
          pageSize: 'Dimensione Pagina',
          letterPortrait: 'Letter Verticale (612x792)',
          letterLandscape: 'Letter Orizzontale (792x612)',
          a4Portrait: 'A4 Verticale (595x842)',
          a4Landscape: 'A4 Orizzontale (842x595)',
          square: 'Quadrato (1200x1200)',
          custom: 'Personalizzato',
          customWidth: 'Larghezza (pt)',
          customHeight: 'Altezza (pt)',
          download: 'Scarica',
          downloadPDF: 'Scarica PDF',
          downloadJPEG: 'Scarica JPEG',
          print: 'Stampa',
          instructions: 'Conta quanti di ogni oggetto puoi trovare:',
          countThe: 'Conta i'
        }
      },
      nl: {
        findAndCount: {
          title: 'Zoek en Tel Werkblad',
          selectImages: 'Selecteer Afbeeldingen om te Zoeken',
          objectCount: 'Objecten per Afbeelding (3-8)',
          includeDistractors: 'Afleidingsafbeeldingen Toevoegen',
          generate: 'Werkblad Maken',
          noImagesError: 'Selecteer alstublieft minstens één afbeelding',
          generating: 'Werkblad maken...',
          themeSelect: 'Selecteer Thema',
          searchImages: 'Zoek afbeeldingen...',
          allThemes: 'Alle Thema\'s',
          language: 'Taal',
          pageSize: 'Paginagrootte',
          letterPortrait: 'Letter Staand (612x792)',
          letterLandscape: 'Letter Liggend (792x612)',
          a4Portrait: 'A4 Staand (595x842)',
          a4Landscape: 'A4 Liggend (842x595)',
          square: 'Vierkant (1200x1200)',
          custom: 'Aangepast',
          customWidth: 'Breedte (pt)',
          customHeight: 'Hoogte (pt)',
          download: 'Downloaden',
          downloadPDF: 'Download PDF',
          downloadJPEG: 'Download JPEG',
          print: 'Afdrukken',
          instructions: 'Tel hoeveel van elk object je kunt vinden:',
          countThe: 'Tel de'
        }
      },
      sv: {
        findAndCount: {
          title: 'Hitta och Räkna Arbetsblad',
          selectImages: 'Välj Bilder att Hitta',
          objectCount: 'Objekt per Bild (3-8)',
          includeDistractors: 'Inkludera Störningsbilder',
          generate: 'Skapa Arbetsblad',
          noImagesError: 'Vänligen välj minst en bild',
          generating: 'Skapar arbetsblad...',
          themeSelect: 'Välj Tema',
          searchImages: 'Sök bilder...',
          allThemes: 'Alla Teman',
          language: 'Språk',
          pageSize: 'Sidstorlek',
          letterPortrait: 'Letter Stående (612x792)',
          letterLandscape: 'Letter Liggande (792x612)',
          a4Portrait: 'A4 Stående (595x842)',
          a4Landscape: 'A4 Liggande (842x595)',
          square: 'Kvadrat (1200x1200)',
          custom: 'Anpassad',
          customWidth: 'Bredd (pt)',
          customHeight: 'Höjd (pt)',
          download: 'Ladda ner',
          downloadPDF: 'Ladda ner PDF',
          downloadJPEG: 'Ladda ner JPEG',
          print: 'Skriv ut',
          instructions: 'Räkna hur många av varje objekt du kan hitta:',
          countThe: 'Räkna'
        }
      },
      da: {
        findAndCount: {
          title: 'Find og Tæl Arbejdsark',
          selectImages: 'Vælg Billeder at Finde',
          objectCount: 'Objekter per Billede (3-8)',
          includeDistractors: 'Inkluder Distraktionsbilleder',
          generate: 'Generer Arbejdsark',
          noImagesError: 'Vælg venligst mindst et billede',
          generating: 'Opretter arbejdsark...',
          themeSelect: 'Vælg Tema',
          searchImages: 'Søg billeder...',
          allThemes: 'Alle Temaer',
          language: 'Sprog',
          pageSize: 'Sidestørrelse',
          letterPortrait: 'Letter Stående (612x792)',
          letterLandscape: 'Letter Liggende (792x612)',
          a4Portrait: 'A4 Stående (595x842)',
          a4Landscape: 'A4 Liggende (842x595)',
          square: 'Kvadrat (1200x1200)',
          custom: 'Tilpasset',
          customWidth: 'Bredde (pt)',
          customHeight: 'Højde (pt)',
          download: 'Download',
          downloadPDF: 'Download PDF',
          downloadJPEG: 'Download JPEG',
          print: 'Udskriv',
          instructions: 'Tæl hvor mange af hvert objekt du kan finde:',
          countThe: 'Tæl'
        }
      },
      no: {
        findAndCount: {
          title: 'Finn og Tell Arbeidsark',
          selectImages: 'Velg Bilder å Finne',
          objectCount: 'Objekter per Bilde (3-8)',
          includeDistractors: 'Inkluder Distraksjonsbilder',
          generate: 'Generer Arbeidsark',
          noImagesError: 'Vennligst velg minst ett bilde',
          generating: 'Lager arbeidsark...',
          themeSelect: 'Velg Tema',
          searchImages: 'Søk bilder...',
          allThemes: 'Alle Temaer',
          language: 'Språk',
          pageSize: 'Sidestørrelse',
          letterPortrait: 'Letter Stående (612x792)',
          letterLandscape: 'Letter Liggende (792x612)',
          a4Portrait: 'A4 Stående (595x842)',
          a4Landscape: 'A4 Liggende (842x595)',
          square: 'Kvadrat (1200x1200)',
          custom: 'Tilpasset',
          customWidth: 'Bredde (pt)',
          customHeight: 'Høyde (pt)',
          download: 'Last ned',
          downloadPDF: 'Last ned PDF',
          downloadJPEG: 'Last ned JPEG',
          print: 'Skriv ut',
          instructions: 'Tell hvor mange av hvert objekt du kan finne:',
          countThe: 'Tell'
        }
      },
      fi: {
        findAndCount: {
          title: 'Etsi ja Laske Tehtäväarkki',
          selectImages: 'Valitse Etsittävät Kuvat',
          objectCount: 'Objekteja per Kuva (3-8)',
          includeDistractors: 'Sisällytä Häiriökuvia',
          generate: 'Luo Tehtäväarkki',
          noImagesError: 'Valitse vähintään yksi kuva',
          generating: 'Luodaan tehtäväarkkia...',
          themeSelect: 'Valitse Teema',
          searchImages: 'Hae kuvia...',
          allThemes: 'Kaikki Teemat',
          language: 'Kieli',
          pageSize: 'Sivukoko',
          letterPortrait: 'Letter Pysty (612x792)',
          letterLandscape: 'Letter Vaaka (792x612)',
          a4Portrait: 'A4 Pysty (595x842)',
          a4Landscape: 'A4 Vaaka (842x595)',
          square: 'Neliö (1200x1200)',
          custom: 'Mukautettu',
          customWidth: 'Leveys (pt)',
          customHeight: 'Korkeus (pt)',
          download: 'Lataa',
          downloadPDF: 'Lataa PDF',
          downloadJPEG: 'Lataa JPEG',
          print: 'Tulosta',
          instructions: 'Laske kuinka monta kutakin esinettä löydät:',
          countThe: 'Laske'
        }
      }
    };
  }

  getStyles() {
    return `
      :host { display: block; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      .find-and-count-app { display: flex; gap: 2rem; max-width: 1400px; margin: 0 auto; padding: 1rem; }
      .controls-panel { width: 380px; background: #2c2c2e; color: #e0e0e0; border-radius: 12px; padding: 1.5rem; overflow-y: auto; max-height: 90vh; }
      .settings-group { margin-bottom: 1.5rem; }
      .settings-group label { display: block; margin-bottom: 0.5rem; color: #a0a0a0; font-size: 0.9rem; }
      .settings-group input, .settings-group select { width: 100%; padding: 0.75rem; border: 1px solid #4a4a4a; background: #3a3a3e; color: #e0e0e0; border-radius: 6px; font-size: 14px; }
      .search-box { position: relative; margin-bottom: 1rem; }
      .search-box input { width: 100%; padding: 0.75rem; padding-left: 2.5rem; border: 1px solid #4a4a4a; background: #3a3a3e; color: #e0e0e0; border-radius: 6px; }
      .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: #a0a0a0; }
      .image-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; max-height: 300px; overflow-y: auto; border: 1px solid #4a4a4a; border-radius: 6px; padding: 0.5rem; }
      .image-item { padding: 0.5rem; border: 2px solid transparent; border-radius: 8px; cursor: pointer; background: #3a3a3e; transition: all 0.2s ease; text-align: center; position: relative; }
      .image-item:hover { background: #4a4a4e; transform: translateY(-2px); }
      .image-item.selected { border-color: #007aff; background: rgba(0, 122, 255, 0.2); }
      .image-item.selected::after { content: '✓'; position: absolute; top: 4px; right: 4px; background: #007aff; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; }
      .image-item img { width: 50px; height: 50px; object-fit: contain; display: block; margin: 0 auto 0.25rem; }
      .image-item span { font-size: 0.7rem; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .btn-primary { width: 100%; padding: 0.875rem; border: none; border-radius: 6px; cursor: pointer; background: linear-gradient(135deg, #007aff 0%, #0051d5 100%); color: white; font-weight: 600; transition: all 0.2s ease; }
      .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3); }
      .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
      .preview-panel { flex: 1; background: white; border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; }
      .canvas-container-wrapper { flex: 1; display: flex; justify-content: center; align-items: center; overflow: visible; position: relative; }
      .canvas-container { overflow: visible !important; position: relative !important; }
      .action-buttons { display: flex; gap: 0.75rem; margin-top: 1rem; justify-content: center; }
      .action-buttons button { padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; transition: all 0.2s ease; }
      .download-btn { background: #4CAF50; color: white; }
      .download-pdf-btn { background: #dc3545; color: white; }
      .print-btn { background: #6c757d; color: white; }
      .action-buttons button:hover { transform: translateY(-1px); box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
      .custom-size-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.5rem; }
      .language-theme-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
      .counter { background: #4a4a4e; padding: 0.25rem 0.5rem; border-radius: 4px; margin-left: 0.5rem; font-size: 0.85rem; }
      h2 { margin: 0 0 1.5rem 0; font-size: 1.5rem; }
      h3 { margin: 1rem 0 0.5rem 0; font-size: 1rem; color: #e0e0e0; }
      canvas { border: 1px solid #dce1e6; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      .loading-skeleton { background: linear-gradient(90deg, #3a3a3e 25%, #4a4a4e 50%, #3a3a3e 75%); background-size: 200% 100%; animation: loading 1.5s infinite; }
      @keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="find-and-count-app">
        <div class="controls-panel">
          <h2 data-i18n="findAndCount.title">Find and Count Worksheet</h2>
          
          <div class="language-theme-row">
            <div class="settings-group">
              <label for="languageSelect" data-i18n="findAndCount.language">Language</label>
              <select id="languageSelect">
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
                <option value="pt">Português</option>
                <option value="it">Italiano</option>
                <option value="nl">Nederlands</option>
                <option value="sv">Svenska</option>
                <option value="da">Dansk</option>
                <option value="no">Norsk</option>
                <option value="fi">Suomi</option>
              </select>
            </div>
            
            <div class="settings-group">
              <label for="themeSelect" data-i18n="findAndCount.themeSelect">Select Theme</label>
              <select id="themeSelect">
                <option value="all" data-i18n="findAndCount.allThemes">All Themes</option>
              </select>
            </div>
          </div>

          <div class="settings-group">
            <label for="pageSizeSelect" data-i18n="findAndCount.pageSize">Page Size</label>
            <select id="pageSizeSelect">
              <option value="612x792" data-i18n="findAndCount.letterPortrait">Letter Portrait (612x792)</option>
              <option value="792x612" data-i18n="findAndCount.letterLandscape">Letter Landscape (792x612)</option>
              <option value="595x842" data-i18n="findAndCount.a4Portrait">A4 Portrait (595x842)</option>
              <option value="842x595" data-i18n="findAndCount.a4Landscape">A4 Landscape (842x595)</option>
              <option value="1200x1200" data-i18n="findAndCount.square">Square (1200x1200)</option>
              <option value="custom" data-i18n="findAndCount.custom">Custom</option>
            </select>
            <div class="custom-size-inputs" id="customSizeInputs" style="display: none;">
              <input type="number" id="customWidth" placeholder="Width" min="100" max="2000" value="612">
              <input type="number" id="customHeight" placeholder="Height" min="100" max="2000" value="792">
            </div>
          </div>
          
          <div class="settings-group">
            <label for="objectCount" data-i18n="findAndCount.objectCount">Objects per Image (3-8)</label>
            <input type="number" id="objectCount" value="5" min="3" max="8">
          </div>
          
          <div class="image-selector">
            <h3>
              <span data-i18n="findAndCount.selectImages">Select Images to Find</span>
              <span class="counter" id="selectedCounter">0/4</span>
            </h3>
            
            <div class="search-box">
              <span class="search-icon">🔍</span>
              <input type="text" id="searchInput" placeholder="Search images..." data-i18n-placeholder="findAndCount.searchImages">
            </div>
            
            <div id="imageGrid" class="image-grid"></div>
          </div>
          
          <button id="generateBtn" class="btn-primary" data-i18n="findAndCount.generate">Generate Worksheet</button>
        </div>
        
        <div class="preview-panel">
          <div class="canvas-container-wrapper">
            <canvas id="worksheetCanvas"></canvas>
          </div>
          <div class="action-buttons" id="actionButtons" style="display: none;">
            <button id="downloadJpegBtn" class="download-btn" data-i18n="findAndCount.downloadJPEG">Download JPEG</button>
            <button id="downloadPdfBtn" class="download-pdf-btn" data-i18n="findAndCount.downloadPDF">Download PDF</button>
            <button id="printBtn" class="print-btn" data-i18n="findAndCount.print">Print</button>
          </div>
        </div>
      </div>
    `;
    
    this.initializeLocale();
    this.loadThemes();
    this.initializeCanvas();
    this.setupEventListeners();
  }

  initializeLocale() {
    const urlParams = new URLSearchParams(window.location.search);
    const localeParam = urlParams.get('locale');
    const languageSelect = this.shadowRoot.getElementById('languageSelect');
    
    if (localeParam && languageSelect) {
      languageSelect.value = localeParam;
      this.currentLocale = localeParam;
    }
    
    this.applyTranslations();
  }

  async loadThemes() {
    const themeSelect = this.shadowRoot.getElementById('themeSelect');
    if (!themeSelect) return;
    
    try {
      const response = await fetch(`/api/themes-translated?locale=${this.currentLocale}`);
      const themes = await response.json();
      
      themeSelect.innerHTML = `<option value="all" data-i18n="findAndCount.allThemes">${this.getTranslation('findAndCount.allThemes')}</option>`;
      
      themes.forEach(theme => {
        const option = document.createElement('option');
        option.value = theme.folder;
        option.textContent = theme.name;
        themeSelect.appendChild(option);
      });
      
      // Load animals theme by default
      themeSelect.value = 'animals';
      this.loadThemeImages('animals');
    } catch (error) {
      console.error('Error loading themes:', error);
      this.loadDefaultImages();
    }
  }

  async loadThemeImages(theme) {
    const imageGrid = this.shadowRoot.getElementById('imageGrid');
    if (!imageGrid) return;
    
    imageGrid.innerHTML = '<div class="loading-skeleton" style="height: 60px; border-radius: 8px;"></div>'.repeat(9);
    
    try {
      let url;
      if (theme === 'all') {
        url = `/api/images?theme=animals&locale=${this.currentLocale}`;
      } else {
        url = `/api/images?theme=${theme}&locale=${this.currentLocale}`;
      }
      
      const response = await fetch(url);
      const images = await response.json();
      
      this._images = images.map(img => ({
        id: img.word,
        displayName: img.name || img.word,
        url: img.path
      }));
      
      this.renderImages();
    } catch (error) {
      console.error('Error loading images:', error);
      this.loadDefaultImages();
    }
  }

  loadDefaultImages() {
    this._images = [
      { id: 'star', displayName: 'Star', url: '/images/shapes/star.png' },
      { id: 'heart', displayName: 'Heart', url: '/images/shapes/heart.png' },
      { id: 'circle', displayName: 'Circle', url: '/images/shapes/circle.png' },
      { id: 'square', displayName: 'Square', url: '/images/shapes/square.png' },
      { id: 'triangle', displayName: 'Triangle', url: '/images/shapes/triangle.png' },
      { id: 'diamond', displayName: 'Diamond', url: '/images/shapes/diamond.png' }
    ];
    this.renderImages();
  }

  renderImages() {
    const imageGrid = this.shadowRoot.getElementById('imageGrid');
    const searchInput = this.shadowRoot.getElementById('searchInput');
    if (!imageGrid) return;
    
    const searchTerm = searchInput?.value.toLowerCase() || '';
    const filteredImages = this._images.filter(img => 
      img.displayName.toLowerCase().includes(searchTerm)
    );
    
    imageGrid.innerHTML = '';
    
    // Implement lazy loading
    filteredImages.forEach((image, index) => {
      const item = document.createElement('div');
      item.className = 'image-item';
      if (this.selectedImages.includes(image.id)) {
        item.classList.add('selected');
      }
      
      if (index < this.lazyLoadOffset) {
        // Load first 10 images immediately
        item.innerHTML = `
          <img src="${image.url}" alt="${image.displayName}" loading="eager">
          <span>${image.displayName}</span>
        `;
      } else {
        // Lazy load remaining images
        item.innerHTML = `
          <img src="${image.url}" alt="${image.displayName}" loading="lazy">
          <span>${image.displayName}</span>
        `;
      }
      
      item.addEventListener('click', () => this.toggleImage(image));
      imageGrid.appendChild(item);
    });
    
    this.updateSelectedCounter();
  }

  toggleImage(image) {
    const index = this.selectedImages.indexOf(image.id);
    
    if (index > -1) {
      this.selectedImages.splice(index, 1);
    } else {
      if (this.selectedImages.length >= 4) {
        alert(this.getTranslation('findAndCount.maxImagesError') || 'Maximum 4 images allowed');
        return;
      }
      this.selectedImages.push(image.id);
    }
    
    this.renderImages();
  }

  updateSelectedCounter() {
    const counter = this.shadowRoot.getElementById('selectedCounter');
    if (counter) {
      counter.textContent = `${this.selectedImages.length}/4`;
    }
  }

  setupEventListeners() {
    const generateBtn = this.shadowRoot.getElementById('generateBtn');
    const downloadJpegBtn = this.shadowRoot.getElementById('downloadJpegBtn');
    const downloadPdfBtn = this.shadowRoot.getElementById('downloadPdfBtn');
    const printBtn = this.shadowRoot.getElementById('printBtn');
    const searchInput = this.shadowRoot.getElementById('searchInput');
    const themeSelect = this.shadowRoot.getElementById('themeSelect');
    const languageSelect = this.shadowRoot.getElementById('languageSelect');
    const pageSizeSelect = this.shadowRoot.getElementById('pageSizeSelect');
    const customSizeInputs = this.shadowRoot.getElementById('customSizeInputs');
    const customWidth = this.shadowRoot.getElementById('customWidth');
    const customHeight = this.shadowRoot.getElementById('customHeight');

    generateBtn?.addEventListener('click', () => this.generateWorksheet());
    downloadJpegBtn?.addEventListener('click', () => this.downloadWorksheet('jpeg'));
    downloadPdfBtn?.addEventListener('click', () => this.downloadWorksheet('pdf'));
    printBtn?.addEventListener('click', () => this.printWorksheet());
    
    searchInput?.addEventListener('input', () => this.renderImages());
    
    themeSelect?.addEventListener('change', (e) => {
      this.loadThemeImages(e.target.value);
    });
    
    languageSelect?.addEventListener('change', (e) => {
      this.currentLocale = e.target.value;
      this.applyTranslations();
      this.loadThemes();
    });
    
    pageSizeSelect?.addEventListener('change', (e) => {
      if (e.target.value === 'custom') {
        customSizeInputs.style.display = 'grid';
      } else {
        customSizeInputs.style.display = 'none';
        if (e.target.value !== 'custom') {
          const [width, height] = e.target.value.split('x').map(Number);
          this.updateCanvasDisplayDimensions(width, height);
        }
      }
    });
    
    customWidth?.addEventListener('change', () => {
      if (pageSizeSelect.value === 'custom') {
        this.updateCanvasDisplayDimensions(Number(customWidth.value), Number(customHeight.value));
      }
    });
    
    customHeight?.addEventListener('change', () => {
      if (pageSizeSelect.value === 'custom') {
        this.updateCanvasDisplayDimensions(Number(customWidth.value), Number(customHeight.value));
      }
    });
  }

  initializeCanvas() {
    if (typeof fabric === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js';
      script.onload = () => this.createFabricCanvas();
      document.head.appendChild(script);
    } else {
      this.createFabricCanvas();
    }
  }

  createFabricCanvas() {
    const canvasElement = this.shadowRoot.getElementById('worksheetCanvas');
    if (!canvasElement || this.worksheetCanvas) return;
    
    this.worksheetCanvas = new fabric.Canvas(canvasElement, {
      backgroundColor: 'white',
      selection: false
    });
    
    this.fabricInstances.add(this.worksheetCanvas);
    this.updateCanvasDisplayDimensions(this.currentCanvasConfig.width, this.currentCanvasConfig.height);
  }

  updateCanvasDisplayDimensions(width, height) {
    if (!this.worksheetCanvas) return;
    
    this.currentCanvasConfig.width = width;
    this.currentCanvasConfig.height = height;
    
    // Calculate display dimensions maintaining aspect ratio
    const maxDisplayWidth = 600;
    const aspectRatio = height / width;
    this.displayWidth = Math.min(width, maxDisplayWidth);
    this.displayHeight = Math.round(this.displayWidth * aspectRatio);
    
    // Apply zoom for display
    const finalZoom = this.displayWidth / width;
    this.worksheetCanvas.setZoom(finalZoom);
    
    // Set dimensions AFTER zoom to match viewport (fixes clipping)
    this.worksheetCanvas.setDimensions({
      width: this.displayWidth,
      height: this.displayHeight
    });
  }

  async generateWorksheet() {
    if (this.selectedImages.length === 0) {
      alert(this.getTranslation('findAndCount.noImagesError'));
      return;
    }

    if (!this.worksheetCanvas) return;

    this.worksheetCanvas.clear();
    this.worksheetCanvas.backgroundColor = 'white';
    
    const scale = this.currentCanvasConfig.width / 612; // Scale based on canvas width
    
    // Title
    const title = new fabric.Text(this.getTranslation('findAndCount.title'), {
      left: this.currentCanvasConfig.width / 2,
      top: 40 * scale,
      fontFamily: 'Arial',
      fontSize: 24 * scale,
      fontWeight: 'bold',
      textAlign: 'center',
      originX: 'center'
    });
    this.worksheetCanvas.add(title);

    // Instructions
    const instructions = new fabric.Text(this.getTranslation('findAndCount.instructions'), {
      left: this.currentCanvasConfig.width / 2,
      top: 80 * scale,
      fontFamily: 'Arial',
      fontSize: 14 * scale,
      textAlign: 'center',
      originX: 'center'
    });
    this.worksheetCanvas.add(instructions);

    // Create find area with random objects
    await this.createFindArea(scale);
    
    // Create count section
    await this.createCountSection(scale);

    const actionButtons = this.shadowRoot.getElementById('actionButtons');
    actionButtons.style.display = 'flex';
  }

  async createFindArea(scale) {
    const areaWidth = 500 * scale;
    const areaHeight = 300 * scale;
    const startX = (this.currentCanvasConfig.width - areaWidth) / 2;
    const startY = 120 * scale;
    
    // Draw border around find area
    const border = new fabric.Rect({
      left: startX,
      top: startY,
      width: areaWidth,
      height: areaHeight,
      fill: 'transparent',
      stroke: '#000',
      strokeWidth: 2
    });
    this.worksheetCanvas.add(border);
    
    const selectedImageObjects = this._images.filter(img => 
      this.selectedImages.includes(img.id)
    );
    
    const objectCount = parseInt(this.shadowRoot.getElementById('objectCount').value) || 5;
    
    // Place random objects in the find area
    for (let i = 0; i < objectCount * selectedImageObjects.length; i++) {
      const randomImage = selectedImageObjects[Math.floor(Math.random() * selectedImageObjects.length)];
      const x = startX + 20 + Math.random() * (areaWidth - 60);
      const y = startY + 20 + Math.random() * (areaHeight - 60);
      
      try {
        const imgElement = await this.loadImage(randomImage.url);
        const fabricImg = new fabric.Image(imgElement, {
          left: x,
          top: y,
          scaleX: (30 * scale) / imgElement.width,
          scaleY: (30 * scale) / imgElement.height,
          angle: Math.random() * 30 - 15 // Random rotation for variety
        });
        this.worksheetCanvas.add(fabricImg);
      } catch (e) {
        // Create a simple shape as fallback
        const shape = new fabric.Circle({
          left: x,
          top: y,
          radius: 15 * scale,
          fill: '#007aff',
          stroke: '#000',
          strokeWidth: 1
        });
        this.worksheetCanvas.add(shape);
      }
    }
  }

  async createCountSection(scale) {
    const startY = 450 * scale;
    const rowHeight = 60 * scale;
    const selectedImageObjects = this._images.filter(img => 
      this.selectedImages.includes(img.id)
    );
    
    for (let i = 0; i < selectedImageObjects.length; i++) {
      const image = selectedImageObjects[i];
      const currentY = startY + (i * rowHeight);
      
      try {
        const imgElement = await this.loadImage(image.url);
        const fabricImg = new fabric.Image(imgElement, {
          left: 80 * scale,
          top: currentY,
          scaleX: (40 * scale) / imgElement.width,
          scaleY: (40 * scale) / imgElement.height
        });
        this.worksheetCanvas.add(fabricImg);
      } catch (e) {
        const shape = new fabric.Circle({
          left: 80 * scale,
          top: currentY,
          radius: 20 * scale,
          fill: '#007aff'
        });
        this.worksheetCanvas.add(shape);
      }
      
      const labelText = `${this.getTranslation('findAndCount.countThe')} ${image.displayName}:`;
      const label = new fabric.Text(labelText, {
        left: 140 * scale,
        top: currentY + (10 * scale),
        fontFamily: 'Arial',
        fontSize: 16 * scale
      });
      
      const answerBox = new fabric.Rect({
        left: (this.currentCanvasConfig.width - 150 * scale),
        top: currentY,
        width: 50 * scale,
        height: 40 * scale,
        fill: 'transparent',
        stroke: '#000',
        strokeWidth: 1,
        rx: 5,
        ry: 5
      });
      
      this.worksheetCanvas.add(label, answerBox);
    }
  }

  loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  async getCanvasDataURL() {
    if (!this.worksheetCanvas) return null;
    
    // Save current state
    const currentZoom = this.worksheetCanvas.getZoom();
    const currentWidth = this.worksheetCanvas.getWidth();
    const currentHeight = this.worksheetCanvas.getHeight();
    
    // Reset for export at actual dimensions
    this.worksheetCanvas.setZoom(1);
    this.worksheetCanvas.setDimensions({
      width: this.currentCanvasConfig.width,
      height: this.currentCanvasConfig.height
    });
    
    const dataURL = this.worksheetCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1
    });
    
    // Restore display state
    this.worksheetCanvas.setZoom(currentZoom);
    this.worksheetCanvas.setDimensions({
      width: currentWidth,
      height: currentHeight
    });
    
    return dataURL;
  }

  async downloadWorksheet(format = 'jpeg') {
    if (!this.worksheetCanvas) return;
    
    if (format === 'pdf') {
      await this.downloadPDF();
    } else {
      const dataURL = await this.getCanvasDataURL();
      const link = document.createElement('a');
      link.download = `find-and-count-worksheet.${format}`;
      link.href = dataURL;
      link.click();
    }
  }

  async downloadPDF() {
    if (!this.worksheetCanvas) return;
    
    // Load jsPDF if not already loaded
    if (typeof jspdf === 'undefined' || !window.jspdf) {
      await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = resolve;
        document.head.appendChild(script);
      });
    }
    
    const { jsPDF } = window.jspdf;
    const orientation = this.currentCanvasConfig.width > this.currentCanvasConfig.height ? 'landscape' : 'portrait';
    
    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'pt',
      format: [this.currentCanvasConfig.width, this.currentCanvasConfig.height]
    });
    
    const imgData = await this.getCanvasDataURL();
    pdf.addImage(imgData, 'PNG', 0, 0, this.currentCanvasConfig.width, this.currentCanvasConfig.height);
    pdf.save('find-and-count-worksheet.pdf');
  }

  async printWorksheet() {
    if (!this.worksheetCanvas) return;
    
    const dataURL = await this.getCanvasDataURL();
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${this.getTranslation('findAndCount.title')}</title>
          <style>
            @media print {
              body { margin: 0; }
              img { max-width: 100%; height: auto; }
            }
          </style>
        </head>
        <body>
          <img src="${dataURL}" style="width: 100%;">
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }

  cleanup() {
    this.fabricInstances.forEach(canvas => {
      try { canvas.dispose(); } catch (e) { console.warn('Error disposing canvas:', e); }
    });
    this.fabricInstances.clear();
  }
}

customElements.define('lcs-find-and-count', FindAndCountGenerator);
export default FindAndCountGenerator;