import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class MathPuzzleGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.currentLocale = 'en';
    this.currentCanvasConfig = { width: 612, height: 792 };
    this.canvas = null;
  }

  get appName() { return 'math-puzzle'; }
  
  getDefaultTranslations() {
    return {
      en: {
        mathPuzzle: {
          title: 'Math Puzzle Generator',
          generateWorksheet: 'Generate Worksheet',
          download: 'Download PDF',
          pageSize: 'Page Size',
          language: 'Language'
        }
      },
      de: {
        mathPuzzle: {
          title: 'Mathe-Rätsel Generator',
          generateWorksheet: 'Arbeitsblatt generieren',
          download: 'PDF herunterladen',
          pageSize: 'Seitengröße',
          language: 'Sprache'
        }
      },
      fr: {
        mathPuzzle: {
          title: 'Générateur de Puzzle Mathématique',
          generateWorksheet: 'Générer la feuille',
          download: 'Télécharger PDF',
          pageSize: 'Taille de page',
          language: 'Langue'
        }
      },
      es: {
        mathPuzzle: {
          title: 'Generador de Rompecabezas Matemático',
          generateWorksheet: 'Generar hoja de trabajo',
          download: 'Descargar PDF',
          pageSize: 'Tamaño de página',
          language: 'Idioma'
        }
      },
      pt: {
        mathPuzzle: {
          title: 'Gerador de Quebra-cabeça Matemático',
          generateWorksheet: 'Gerar planilha',
          download: 'Baixar PDF',
          pageSize: 'Tamanho da página',
          language: 'Idioma'
        }
      },
      it: {
        mathPuzzle: {
          title: 'Generatore di Puzzle Matematico',
          generateWorksheet: 'Genera foglio',
          download: 'Scarica PDF',
          pageSize: 'Dimensioni pagina',
          language: 'Lingua'
        }
      },
      nl: {
        mathPuzzle: {
          title: 'Wiskunde Puzzel Generator',
          generateWorksheet: 'Werkblad genereren',
          download: 'Download PDF',
          pageSize: 'Paginaformaat',
          language: 'Taal'
        }
      },
      sv: {
        mathPuzzle: {
          title: 'Matematikpussel Generator',
          generateWorksheet: 'Generera arbetsblad',
          download: 'Ladda ner PDF',
          pageSize: 'Sidstorlek',
          language: 'Språk'
        }
      },
      da: {
        mathPuzzle: {
          title: 'Matematik Puslespil Generator',
          generateWorksheet: 'Generer arbejdsark',
          download: 'Download PDF',
          pageSize: 'Sidestørrelse',
          language: 'Sprog'
        }
      },
      no: {
        mathPuzzle: {
          title: 'Matematikk Puslespill Generator',
          generateWorksheet: 'Generer arbeidsark',
          download: 'Last ned PDF',
          pageSize: 'Sidestørrelse',
          language: 'Språk'
        }
      },
      fi: {
        mathPuzzle: {
          title: 'Matematiikka Palapeli Generaattori',
          generateWorksheet: 'Luo työarkki',
          download: 'Lataa PDF',
          pageSize: 'Sivun koko',
          language: 'Kieli'
        }
      }
    };
  }
  
  getStyles() {
    return `
      :host { display: block; }
      .layout { display: flex; height: 80vh; }
      .panel { width: 340px; background: #2c2c2e; color: #e0e0e0; padding: 20px; overflow-y: auto; }
      .main { flex: 1; background: #f0f2f5; display: flex; justify-content: center; align-items: center; padding: 20px; }
      
      /* Fix canvas clipping with zoom */
      .canvas-container-wrapper {
        overflow: visible !important;
        position: relative;
        margin: 20px auto;
      }
      
      .canvas-container {
        overflow: visible !important;
        position: relative !important;
        margin: 0 auto;
      }
      
      #canvasWrapper {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 400px;
        padding: 20px;
      }
      
      canvas { 
        border: 1px solid #ddd; 
        background: white; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
      }
      
      button {
        width: 100%;
        padding: 10px;
        margin: 5px 0;
        background: #007aff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      
      button:hover {
        background: #0056b3;
      }
      
      .control-group {
        margin: 15px 0;
      }
      
      .control-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
      
      select, input {
        width: 100%;
        padding: 8px;
        border: 1px solid #555;
        border-radius: 4px;
        background: #3a3a3c;
        color: #e0e0e0;
        margin-bottom: 10px;
      }
      
      #customSizeInputs {
        margin-top: 10px;
      }
      
      #customSizeInputs input {
        width: calc(50% - 5px);
        display: inline-block;
        margin-right: 10px;
      }
    `;
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="layout">
        <div class="panel">
          <h2 data-translate-key="mathPuzzle.title">Math Puzzle Generator</h2>
          
          <div class="control-group">
            <label data-translate-key="mathPuzzle.language">Language:</label>
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
          
          <div class="control-group">
            <label data-translate-key="mathPuzzle.pageSize">Page Size:</label>
            <select id="pageSizeSelect">
              <option value="612x792">Letter Portrait (612×792)</option>
              <option value="792x612">Letter Landscape (792×612)</option>
              <option value="595x842">A4 Portrait (595×842)</option>
              <option value="842x595">A4 Landscape (842×595)</option>
              <option value="1200x1200">Square (1200×1200)</option>
              <option value="custom">Custom</option>
            </select>
            <div id="customSizeInputs" style="display: none;">
              <input type="number" id="customWidth" placeholder="Width" min="100" max="2000">
              <input type="number" id="customHeight" placeholder="Height" min="100" max="2000">
            </div>
          </div>
          
          <button id="generateBtn" data-translate-key="mathPuzzle.generateWorksheet">Generate Worksheet</button>
          <button id="downloadBtn" data-translate-key="mathPuzzle.download">Download PDF</button>
        </div>
        
        <div class="main">
          <div id="canvasWrapper">
            <canvas id="canvas"></canvas>
          </div>
        </div>
      </div>
    `;
  }

  updateCanvasDisplayDimensions(width, height) {
    this.currentCanvasConfig.width = width;
    this.currentCanvasConfig.height = height;
    
    if (!this.canvas) return;
    
    // Use tab's parent element, NOT window dimensions
    const mainStyle = this.shadowRoot.querySelector('.main');
    const availableWidth = mainStyle.clientWidth - 50;
    const availableHeight = mainStyle.clientHeight - 50;
    
    // Apply 25% scaling for better visibility
    const isLandscape = width > height;
    const baseScale = 1.25; // Base 25% larger for all
    const landscapeBonus = isLandscape ? 1.25 : 1.0; // Additional 25% for landscape
    const displayScale = baseScale * landscapeBonus;
    
    // Calculate display dimensions with scaling
    const scaledWidth = width * displayScale;
    const scaledHeight = height * displayScale;
    
    // Ensure it fits in available space
    const scaleRatio = Math.min(availableWidth / scaledWidth, availableHeight / scaledHeight, 1);
    const displayWidth = scaledWidth * scaleRatio;
    const displayHeight = scaledHeight * scaleRatio;
    
    // Apply zoom for display scaling
    const finalZoom = (displayWidth / width);
    this.canvas.setZoom(finalZoom);
    
    // Set dimensions AFTER zoom to ensure viewport matches zoomed size
    this.canvas.setDimensions({
      width: displayWidth,
      height: displayHeight
    });
    
    this.canvas.renderAll();
  }
  
  async generateWorksheet() {
    if (typeof fabric === 'undefined') {
      await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js');
    }
    
    const canvasElement = this.shadowRoot.getElementById('canvas');
    this.canvas = new fabric.Canvas(canvasElement, {
      backgroundColor: '#FFFFFF',
      preserveObjectStacking: true,
      enableRetinaScaling: true
    });
    
    // Set display dimensions after canvas creation
    this.updateCanvasDisplayDimensions(this.currentCanvasConfig.width, this.currentCanvasConfig.height);
    
    // Clear canvas
    this.canvas.clear();
    this.canvas.backgroundColor = '#FFFFFF';
    
    // Add title centered
    const title = new fabric.Text('Math Puzzle', {
      left: this.currentCanvasConfig.width / 2,
      top: 30,
      fontSize: 24,
      originX: 'center',
      fontWeight: 'bold',
      fill: '#000000'
    });
    this.canvas.add(title);
    
    // Generate math problems
    for (let i = 0; i < 10; i++) {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      const problem = new fabric.Text(`${i + 1}. ${a} + ${b} = ___`, {
        left: 50,
        top: 80 + i * 40,
        fontSize: 16,
        fill: '#000000'
      });
      this.canvas.add(problem);
    }
    
    this.canvas.renderAll();
    this.emit('worksheet-generated', { type: 'math-puzzle' });
  }

  async downloadPDF() {
    if (!this.canvas) {
      alert('Please generate a worksheet first');
      return;
    }
    
    // Load jsPDF if not available
    if (typeof window.jspdf === 'undefined') {
      await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    }
    
    const { jsPDF } = window.jspdf;
    
    // Save current state
    const currentZoom = this.canvas.getZoom();
    const currentWidth = this.canvas.getWidth();
    const currentHeight = this.canvas.getHeight();
    
    // Reset to actual size for export
    this.canvas.setZoom(1);
    this.canvas.setDimensions({
      width: this.currentCanvasConfig.width,
      height: this.currentCanvasConfig.height
    });
    
    // Determine orientation
    const orientation = this.currentCanvasConfig.width > this.currentCanvasConfig.height ? 'landscape' : 'portrait';
    
    // Create PDF with user-selected dimensions
    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'pt',
      format: [this.currentCanvasConfig.width, this.currentCanvasConfig.height]
    });
    
    // Get canvas data
    const imgData = this.canvas.toDataURL('image/jpeg', 1.0);
    
    // Add image at full page size
    pdf.addImage(imgData, 'JPEG', 0, 0, this.currentCanvasConfig.width, this.currentCanvasConfig.height);
    
    // Restore display state
    this.canvas.setZoom(currentZoom);
    this.canvas.setDimensions({
      width: currentWidth,
      height: currentHeight
    });
    
    // Save PDF
    pdf.save('math-puzzle.pdf');
  }
  
  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  
  setupEventListeners() {
    // Initialize locale from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const localeParam = urlParams.get('locale');
    if (localeParam) {
      this.currentLocale = localeParam;
    }
    
    // Language selector
    const languageSelect = this.shadowRoot.getElementById('languageSelect');
    if (languageSelect) {
      languageSelect.value = this.currentLocale;
      languageSelect.addEventListener('change', () => {
        this.currentLocale = languageSelect.value;
        this.applyTranslations();
      });
    }
    
    // Page size selector
    const pageSizeSelect = this.shadowRoot.getElementById('pageSizeSelect');
    const customSizeInputs = this.shadowRoot.getElementById('customSizeInputs');
    const customWidth = this.shadowRoot.getElementById('customWidth');
    const customHeight = this.shadowRoot.getElementById('customHeight');
    
    pageSizeSelect.addEventListener('change', () => {
      if (pageSizeSelect.value === 'custom') {
        customSizeInputs.style.display = 'inline-block';
      } else {
        customSizeInputs.style.display = 'none';
        const [width, height] = pageSizeSelect.value.split('x').map(Number);
        this.updateCanvasDisplayDimensions(width, height);
      }
    });
    
    const updateCustomSize = () => {
      const width = parseInt(customWidth.value) || 612;
      const height = parseInt(customHeight.value) || 792;
      this.updateCanvasDisplayDimensions(width, height);
    };
    
    customWidth.addEventListener('change', updateCustomSize);
    customHeight.addEventListener('change', updateCustomSize);
    
    // Buttons
    this.shadowRoot.getElementById('generateBtn').addEventListener('click', () => this.generateWorksheet());
    this.shadowRoot.getElementById('downloadBtn').addEventListener('click', () => this.downloadPDF());
    
    // Apply translations on load
    this.applyTranslations();
    
    // Update on window resize for responsive behavior
    window.addEventListener('resize', () => {
      if (this.canvas) {
        this.updateCanvasDisplayDimensions(this.currentCanvasConfig.width, this.currentCanvasConfig.height);
      }
    });
  }
  
  connectedCallback() {
    super.connectedCallback();
    // Load translations script
    if (!document.querySelector('script[src="/js/translations.js"]')) {
      const script = document.createElement('script');
      script.src = '/js/translations.js';
      document.head.appendChild(script);
    }
  }
}

customElements.define('lcs-math-puzzle', MathPuzzleGenerator);