import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class MoreLessGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.currentLocale = 'en';
    this.currentCanvasConfig = { width: 612, height: 792 };
    this.canvas = null;
  }

  get appName() { return 'more-less'; }
  
  getDefaultTranslations() {
    return {
      en: {
        moreLess: {
          title: 'More or Less Generator',
          generate: 'Generate Worksheet',
          download: 'Download PDF',
          pageSize: 'Page Size',
          language: 'Language',
          worksheetTitle: 'Circle More or Less',
          instruction: 'Circle the group with MORE',
          generatingAlert: 'Please generate a worksheet first'
        }
      },
      de: {
        moreLess: {
          title: 'Mehr oder Weniger Generator',
          generate: 'Arbeitsblatt generieren',
          download: 'PDF herunterladen',
          pageSize: 'Seitengröße',
          language: 'Sprache',
          worksheetTitle: 'Kreise Mehr oder Weniger',
          instruction: 'Kreise die Gruppe mit MEHR',
          generatingAlert: 'Bitte generieren Sie zuerst ein Arbeitsblatt'
        }
      },
      fr: {
        moreLess: {
          title: 'Générateur Plus ou Moins',
          generate: 'Générer la feuille',
          download: 'Télécharger PDF',
          pageSize: 'Taille de page',
          language: 'Langue',
          worksheetTitle: 'Entoure Plus ou Moins',
          instruction: 'Entoure le groupe avec PLUS',
          generatingAlert: 'Veuillez d\'abord générer une feuille de travail'
        }
      },
      es: {
        moreLess: {
          title: 'Generador Más o Menos',
          generate: 'Generar hoja de trabajo',
          download: 'Descargar PDF',
          pageSize: 'Tamaño de página',
          language: 'Idioma',
          worksheetTitle: 'Rodea Más o Menos',
          instruction: 'Rodea el grupo con MÁS',
          generatingAlert: 'Por favor, genera primero una hoja de trabajo'
        }
      },
      pt: {
        moreLess: {
          title: 'Gerador Mais ou Menos',
          generate: 'Gerar planilha',
          download: 'Baixar PDF',
          pageSize: 'Tamanho da página',
          language: 'Idioma',
          worksheetTitle: 'Circule Mais ou Menos',
          instruction: 'Circule o grupo com MAIS',
          generatingAlert: 'Por favor, gere primeiro uma planilha'
        }
      },
      it: {
        moreLess: {
          title: 'Generatore Più o Meno',
          generate: 'Genera foglio',
          download: 'Scarica PDF',
          pageSize: 'Dimensioni pagina',
          language: 'Lingua',
          worksheetTitle: 'Cerchia Più o Meno',
          instruction: 'Cerchia il gruppo con PIÙ',
          generatingAlert: 'Si prega di generare prima un foglio di lavoro'
        }
      },
      nl: {
        moreLess: {
          title: 'Meer of Minder Generator',
          generate: 'Werkblad genereren',
          download: 'Download PDF',
          pageSize: 'Paginaformaat',
          language: 'Taal',
          worksheetTitle: 'Omcirkel Meer of Minder',
          instruction: 'Omcirkel de groep met MEER',
          generatingAlert: 'Genereer eerst een werkblad'
        }
      },
      sv: {
        moreLess: {
          title: 'Mer eller Mindre Generator',
          generate: 'Generera arbetsblad',
          download: 'Ladda ner PDF',
          pageSize: 'Sidstorlek',
          language: 'Språk',
          worksheetTitle: 'Ringa in Mer eller Mindre',
          instruction: 'Ringa in gruppen med MER',
          generatingAlert: 'Vänligen generera ett arbetsblad först'
        }
      },
      da: {
        moreLess: {
          title: 'Mere eller Mindre Generator',
          generate: 'Generer arbejdsark',
          download: 'Download PDF',
          pageSize: 'Sidestørrelse',
          language: 'Sprog',
          worksheetTitle: 'Sæt ring om Mere eller Mindre',
          instruction: 'Sæt ring om gruppen med MERE',
          generatingAlert: 'Generer venligst et arbejdsark først'
        }
      },
      no: {
        moreLess: {
          title: 'Mer eller Mindre Generator',
          generate: 'Generer arbeidsark',
          download: 'Last ned PDF',
          pageSize: 'Sidestørrelse',
          language: 'Språk',
          worksheetTitle: 'Sett ring rundt Mer eller Mindre',
          instruction: 'Sett ring rundt gruppen med MER',
          generatingAlert: 'Vennligst generer et arbeidsark først'
        }
      },
      fi: {
        moreLess: {
          title: 'Enemmän tai Vähemmän Generaattori',
          generate: 'Luo työarkki',
          download: 'Lataa PDF',
          pageSize: 'Sivun koko',
          language: 'Kieli',
          worksheetTitle: 'Ympäröi Enemmän tai Vähemmän',
          instruction: 'Ympäröi ryhmä jossa on ENEMMÄN',
          generatingAlert: 'Luo ensin työarkki'
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
          <h2 data-i18n="moreLess.title">More or Less Generator</h2>
          
          <div class="control-group">
            <label data-i18n="moreLess.language">Language:</label>
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
            <label data-i18n="moreLess.pageSize">Page Size:</label>
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
          
          <button id="generateBtn" data-i18n="moreLess.generate">Generate Worksheet</button>
          <button id="downloadBtn" data-i18n="moreLess.download">Download PDF</button>
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
    const titleText = this.getTranslation('moreLess.worksheetTitle');
    const title = new fabric.Text(titleText, {
      left: this.currentCanvasConfig.width / 2,
      top: 30,
      fontSize: 20,
      originX: 'center',
      fontWeight: 'bold',
      fill: '#000000'
    });
    this.canvas.add(title);
    
    // Generate comparison exercises
    for (let i = 0; i < 5; i++) {
      const yPos = 100 + i * 120;
      
      // Left group
      const leftCount = Math.floor(Math.random() * 8) + 2;
      const leftGroup = new fabric.Group([], {
        left: 100,
        top: yPos
      });
      
      for (let j = 0; j < leftCount; j++) {
        const circle = new fabric.Circle({
          radius: 15,
          fill: '#4CAF50',
          left: (j % 4) * 35,
          top: Math.floor(j / 4) * 35
        });
        leftGroup.addWithUpdate(circle);
      }
      
      // Right group
      const rightCount = leftCount + (Math.random() > 0.5 ? Math.floor(Math.random() * 3) + 1 : -Math.floor(Math.random() * 2) - 1);
      const actualRightCount = Math.max(1, rightCount);
      
      const rightGroup = new fabric.Group([], {
        left: 350,
        top: yPos
      });
      
      for (let j = 0; j < actualRightCount; j++) {
        const circle = new fabric.Circle({
          radius: 15,
          fill: '#2196F3',
          left: (j % 4) * 35,
          top: Math.floor(j / 4) * 35
        });
        rightGroup.addWithUpdate(circle);
      }
      
      // Circle instruction
      const instructionText = this.getTranslation('moreLess.instruction');
      const instruction = new fabric.Text(instructionText, {
        left: this.currentCanvasConfig.width / 2,
        top: yPos + 80,
        fontSize: 14,
        originX: 'center',
        fill: '#000000'
      });
      
      this.canvas.add(leftGroup);
      this.canvas.add(rightGroup);
      this.canvas.add(instruction);
    }
    
    this.canvas.renderAll();
    this.emit('worksheet-generated', { type: 'more-less' });
  }

  async downloadPDF() {
    if (!this.canvas) {
      alert(this.getTranslation('moreLess.generatingAlert'));
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
    pdf.save('more-less.pdf');
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
      this._locale = localeParam;
    }
    
    // Initialize translations
    this._translations = this.getDefaultTranslations()[this._locale] || this.getDefaultTranslations()['en'];
    
    // Language selector
    const languageSelect = this.shadowRoot.getElementById('languageSelect');
    if (languageSelect) {
      languageSelect.value = this.currentLocale;
      languageSelect.addEventListener('change', () => {
        this.currentLocale = languageSelect.value;
        this._locale = languageSelect.value;
        this._translations = this.getDefaultTranslations()[this._locale] || this.getDefaultTranslations()['en'];
        this.updateUIText();
        // Regenerate worksheet if one exists to show translated content
        if (this.canvas && this.canvas.getObjects().length > 0) {
          this.generateWorksheet();
        }
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
    this.updateUIText();
    
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

customElements.define('lcs-more-less', MoreLessGenerator);