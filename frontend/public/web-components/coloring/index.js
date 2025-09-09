import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class ColoringGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.selectedImages = [];
    this.worksheetCanvas = null;
    this.fabricInstances = new Set();
  }

  get appName() {
    return 'coloring';
  }

  getDefaultTranslations() {
    return {
      en: {
        coloring: {
          title: 'Coloring Page Generator',
          selectImages: 'Select Images to Color',
          imagesPerPage: 'Images per Page',
          pageLayout: 'Page Layout',
          single: 'Single Image',
          grid2x2: '2x2 Grid',
          grid3x3: '3x3 Grid',
          includeTitle: 'Include Title',
          customTitle: 'Custom Title',
          borderStyle: 'Border Style',
          none: 'None',
          simple: 'Simple',
          decorative: 'Decorative',
          generate: 'Generate Coloring Page',
          noImagesError: 'Please select at least one image',
          generating: 'Creating coloring page...'
        },
        common: {
          download: 'Download PDF',
          print: 'Print',
          clear: 'Clear Selection'
        }
      },
      de: {
        coloring: {
          title: 'Malvorlagen Generator',
          selectImages: 'Bilder zum Ausmalen auswählen',
          imagesPerPage: 'Bilder pro Seite',
          pageLayout: 'Seitenlayout',
          single: 'Einzelnes Bild',
          grid2x2: '2x2 Raster',
          grid3x3: '3x3 Raster',
          includeTitle: 'Titel einschließen',
          customTitle: 'Benutzerdefinierter Titel',
          borderStyle: 'Rahmen-Stil',
          none: 'Keine',
          simple: 'Einfach',
          decorative: 'Dekorativ',
          generate: 'Malvorlage erstellen',
          noImagesError: 'Bitte wählen Sie mindestens ein Bild aus',
          generating: 'Malvorlage wird erstellt...'
        },
        common: {
          download: 'PDF herunterladen',
          print: 'Drucken',
          clear: 'Auswahl löschen'
        }
      },
      fr: {
        coloring: {
          title: 'Générateur de Coloriage',
          selectImages: 'Sélectionner images à colorier',
          imagesPerPage: 'Images par page',
          pageLayout: 'Mise en page',
          single: 'Image unique',
          grid2x2: 'Grille 2x2',
          grid3x3: 'Grille 3x3',
          includeTitle: 'Inclure le titre',
          customTitle: 'Titre personnalisé',
          borderStyle: 'Style de bordure',
          none: 'Aucun',
          simple: 'Simple',
          decorative: 'Décoratif',
          generate: 'Générer coloriage',
          noImagesError: 'Veuillez sélectionner au moins une image',
          generating: 'Création du coloriage...'
        },
        common: {
          download: 'Télécharger PDF',
          print: 'Imprimer',
          clear: 'Effacer sélection'
        }
      }
    };
  }

  getStyles() {
    return `
      :host {
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      
      .coloring-app {
        display: flex;
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
      }
      
      .controls-panel {
        width: 340px;
        min-width: 340px;
        background: #2c2c2e;
        color: #e0e0e0;
        border-radius: 12px;
        padding: 1.5rem;
        height: fit-content;
      }
      
      .controls-panel h2 {
        margin: 0 0 1.5rem 0;
        font-size: 1.25rem;
        font-weight: 600;
      }
      
      .settings-group {
        margin-bottom: 1.5rem;
      }
      
      .settings-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        color: #a0a0a0;
      }
      
      .settings-group input, .settings-group select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #4a4a4a;
        background: #3a3a3e;
        color: #e0e0e0;
        border-radius: 6px;
        font-size: 0.9rem;
      }
      
      .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .checkbox-group label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        margin: 0;
        color: #e0e0e0;
      }
      
      .checkbox-group input[type="checkbox"] {
        width: auto;
      }
      
      .image-selector {
        margin: 1.5rem 0;
      }
      
      .image-selector h3 {
        margin: 0 0 0.75rem 0;
        font-size: 1rem;
      }
      
      .image-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.75rem;
        max-height: 250px;
        overflow-y: auto;
      }
      
      .image-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.5rem;
        border: 2px solid transparent;
        border-radius: 8px;
        cursor: pointer;
        background: #3a3a3e;
        transition: all 0.2s ease;
      }
      
      .image-item:hover {
        background: #4a4a4e;
      }
      
      .image-item.selected {
        border-color: #007aff;
        background: rgba(0, 122, 255, 0.1);
      }
      
      .image-item img {
        width: 40px;
        height: 40px;
        object-fit: contain;
      }
      
      .image-item span {
        font-size: 0.75rem;
        text-align: center;
        margin-top: 0.25rem;
      }
      
      .btn-primary, .btn-secondary {
        width: 100%;
        padding: 0.75rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 500;
        transition: background-color 0.2s ease;
      }
      
      .btn-primary {
        background: #007aff;
        color: white;
      }
      
      .btn-primary:hover {
        background: #005ecb;
      }
      
      .btn-primary:disabled {
        background: #4a4a4a;
        cursor: not-allowed;
      }
      
      .btn-secondary {
        background: transparent;
        color: #e0e0e0;
        border: 1px solid #4a4a4a;
        margin-top: 0.5rem;
      }
      
      .btn-secondary:hover {
        background: #3a3a3e;
      }
      
      .preview-panel {
        flex: 1;
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        min-height: 600px;
      }
      
      .canvas-container {
        width: 100%;
        display: flex;
        justify-content: center;
        position: relative;
      }
      
      .canvas-container canvas {
        border: 1px solid #dce1e6;
        border-radius: 8px;
        max-width: 100%;
        height: auto;
      }
      
      .watermark {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 3rem;
        color: rgba(0, 0, 0, 0.1);
        font-weight: bold;
        pointer-events: none;
        z-index: 10;
      }
      
      .action-buttons {
        display: flex;
        gap: 0.75rem;
        margin-top: 1rem;
        justify-content: center;
      }
      
      .action-buttons button {
        width: auto;
        padding: 0.5rem 1rem;
      }
      
      @media (max-width: 768px) {
        .coloring-app {
          flex-direction: column;
        }
        
        .controls-panel {
          width: 100%;
        }
      }
    `;
  }

  render() {
    const isPremium = this._subscription !== 'free';
    
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="coloring-app">
        <div class="controls-panel">
          <h2 data-i18n="coloring.title">Coloring Page Generator</h2>
          
          <div class="settings-group">
            <label for="pageLayout" data-i18n="coloring.pageLayout">Page Layout</label>
            <select id="pageLayout">
              <option value="single" data-i18n="coloring.single">Single Image</option>
              <option value="2x2" data-i18n="coloring.grid2x2">2x2 Grid</option>
              <option value="3x3" data-i18n="coloring.grid3x3">3x3 Grid</option>
            </select>
          </div>
          
          <div class="settings-group">
            <div class="checkbox-group">
              <label>
                <input type="checkbox" id="includeTitle" checked>
                <span data-i18n="coloring.includeTitle">Include Title</span>
              </label>
            </div>
          </div>
          
          <div class="settings-group" id="titleGroup">
            <label for="customTitle" data-i18n="coloring.customTitle">Custom Title</label>
            <input type="text" id="customTitle" value="Coloring Page" placeholder="Enter title...">
          </div>
          
          <div class="settings-group">
            <label for="borderStyle" data-i18n="coloring.borderStyle">Border Style</label>
            <select id="borderStyle">
              <option value="none" data-i18n="coloring.none">None</option>
              <option value="simple" data-i18n="coloring.simple">Simple</option>
              <option value="decorative" data-i18n="coloring.decorative">Decorative</option>
            </select>
          </div>
          
          <div class="image-selector">
            <h3 data-i18n="coloring.selectImages">Select Images to Color</h3>
            <div id="imageGrid" class="image-grid"></div>
          </div>
          
          <button id="generateBtn" class="btn-primary" data-i18n="coloring.generate">
            Generate Coloring Page
          </button>
          
          <button id="clearBtn" class="btn-secondary" data-i18n="common.clear">
            Clear Selection
          </button>
        </div>
        
        <div class="preview-panel">
          <div class="canvas-container" id="canvasContainer">
            ${!isPremium ? '<div class="watermark">SAMPLE</div>' : ''}
            <canvas id="worksheetCanvas" width="612" height="792"></canvas>
          </div>
          
          <div class="action-buttons" id="actionButtons" style="display: none;">
            <button id="downloadBtn" class="btn-secondary" data-i18n="common.download">
              Download PDF
            </button>
            <button id="printBtn" class="btn-secondary" data-i18n="common.print">
              Print
            </button>
          </div>
        </div>
      </div>
    `;
    
    this.updateUIText();
    this.updateImageLibrary();
    this.initializeCanvas();
  }

  updateImageLibrary() {
    const imageGrid = this.shadowRoot.getElementById('imageGrid');
    if (!imageGrid) return;

    imageGrid.innerHTML = '';
    
    const images = this._images.length > 0 ? this._images : this.getSampleImages();
    
    images.forEach(image => {
      const item = document.createElement('div');
      item.className = 'image-item';
      if (this.selectedImages.includes(image.id || image.displayName)) {
        item.classList.add('selected');
      }
      
      item.innerHTML = `
        <img src="${image.url || '/images/placeholder.png'}" alt="${image.displayName}">
        <span>${image.displayName}</span>
      `;
      
      item.addEventListener('click', () => this.toggleImage(image));
      imageGrid.appendChild(item);
    });
  }

  getSampleImages() {
    return [
      { id: 'butterfly', displayName: 'Butterfly', url: '/images/animals/butterfly.png' },
      { id: 'flower', displayName: 'Flower', url: '/images/nature/flower.png' },
      { id: 'tree', displayName: 'Tree', url: '/images/nature/tree.png' },
      { id: 'house', displayName: 'House', url: '/images/objects/house.png' },
      { id: 'car', displayName: 'Car', url: '/images/vehicles/car.png' },
      { id: 'cat', displayName: 'Cat', url: '/images/animals/cat.png' },
      { id: 'sun', displayName: 'Sun', url: '/images/nature/sun.png' },
      { id: 'heart', displayName: 'Heart', url: '/images/shapes/heart.png' },
      { id: 'star', displayName: 'Star', url: '/images/shapes/star.png' }
    ];
  }

  toggleImage(image) {
    const imageId = image.id || image.displayName;
    const index = this.selectedImages.indexOf(imageId);
    
    if (index > -1) {
      this.selectedImages.splice(index, 1);
    } else {
      const maxImages = this.getMaxImagesForLayout();
      if (this.selectedImages.length >= maxImages) {
        alert(`Maximum ${maxImages} images allowed for selected layout`);
        return;
      }
      this.selectedImages.push(imageId);
    }
    
    this.updateImageLibrary();
  }

  getMaxImagesForLayout() {
    const layout = this.shadowRoot.getElementById('pageLayout')?.value || 'single';
    switch (layout) {
      case 'single': return 1;
      case '2x2': return 4;
      case '3x3': return 9;
      default: return 1;
    }
  }

  setupEventListeners() {
    const generateBtn = this.shadowRoot.getElementById('generateBtn');
    const clearBtn = this.shadowRoot.getElementById('clearBtn');
    const downloadBtn = this.shadowRoot.getElementById('downloadBtn');
    const printBtn = this.shadowRoot.getElementById('printBtn');
    const includeTitleCheckbox = this.shadowRoot.getElementById('includeTitle');
    const titleGroup = this.shadowRoot.getElementById('titleGroup');

    generateBtn?.addEventListener('click', () => this.generateColoringPage());
    clearBtn?.addEventListener('click', () => this.clearSelection());
    downloadBtn?.addEventListener('click', () => this.downloadWorksheet());
    printBtn?.addEventListener('click', () => this.printWorksheet());
    
    includeTitleCheckbox?.addEventListener('change', (e) => {
      titleGroup.style.display = e.target.checked ? 'block' : 'none';
    });
  }

  clearSelection() {
    this.selectedImages = [];
    this.updateImageLibrary();
    
    if (this.worksheetCanvas) {
      this.worksheetCanvas.clear();
    }
    
    const actionButtons = this.shadowRoot.getElementById('actionButtons');
    if (actionButtons) {
      actionButtons.style.display = 'none';
    }
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
      selection: false,
      preserveObjectStacking: true
    });
    
    this.fabricInstances.add(this.worksheetCanvas);
  }

  async generateColoringPage() {
    if (this.selectedImages.length === 0) {
      alert(this.getTranslation('coloring.noImagesError'));
      return;
    }

    const generateBtn = this.shadowRoot.getElementById('generateBtn');
    generateBtn.disabled = true;
    generateBtn.textContent = this.getTranslation('coloring.generating');

    try {
      const settings = this.getSettings();
      await this.createColoringPage(settings);
      
      const actionButtons = this.shadowRoot.getElementById('actionButtons');
      actionButtons.style.display = 'flex';
      
      this.emit('worksheet-generated', {
        type: 'coloring',
        images: this.selectedImages,
        layout: settings.pageLayout
      });
      
    } catch (error) {
      this.emit('error', { message: error.message });
    } finally {
      generateBtn.disabled = false;
      generateBtn.textContent = this.getTranslation('coloring.generate');
    }
  }

  getSettings() {
    return {
      pageLayout: this.shadowRoot.getElementById('pageLayout').value,
      includeTitle: this.shadowRoot.getElementById('includeTitle').checked,
      customTitle: this.shadowRoot.getElementById('customTitle').value || 'Coloring Page',
      borderStyle: this.shadowRoot.getElementById('borderStyle').value
    };
  }

  async createColoringPage(settings) {
    if (!this.worksheetCanvas) return;
    
    this.worksheetCanvas.clear();
    
    const canvasWidth = this.worksheetCanvas.width;
    const canvasHeight = this.worksheetCanvas.height;
    const margin = 40;
    
    let currentY = margin;
    
    // Add title if requested
    if (settings.includeTitle) {
      const title = new fabric.Text(settings.customTitle, {
        left: canvasWidth / 2,
        top: currentY,
        fontFamily: 'Arial',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        originX: 'center',
        fill: '#000000'
      });
      this.worksheetCanvas.add(title);
      currentY += 60;
    }
    
    // Add border if requested
    if (settings.borderStyle !== 'none') {
      await this.addPageBorder(settings.borderStyle);
    }
    
    // Layout images based on selected layout
    const images = this._images.length > 0 ? this._images : this.getSampleImages();
    const selectedImageObjects = images.filter(img => 
      this.selectedImages.includes(img.id || img.displayName)
    );
    
    await this.layoutImages(selectedImageObjects, settings, currentY);
  }

  async layoutImages(images, settings, startY) {
    const canvasWidth = this.worksheetCanvas.width;
    const canvasHeight = this.worksheetCanvas.height;
    const margin = 40;
    const availableWidth = canvasWidth - 2 * margin;
    const availableHeight = canvasHeight - startY - margin;
    
    let cols, rows;
    switch (settings.pageLayout) {
      case '2x2':
        cols = rows = 2;
        break;
      case '3x3':
        cols = rows = 3;
        break;
      default:
        cols = rows = 1;
    }
    
    const cellWidth = availableWidth / cols;
    const cellHeight = availableHeight / rows;
    const maxImageSize = Math.min(cellWidth, cellHeight) * 0.8;
    
    for (let i = 0; i < Math.min(images.length, cols * rows); i++) {
      const image = images[i];
      const row = Math.floor(i / cols);
      const col = i % cols;
      
      const centerX = margin + col * cellWidth + cellWidth / 2;
      const centerY = startY + row * cellHeight + cellHeight / 2;
      
      await this.addOutlineImage(image, centerX, centerY, maxImageSize);
    }
  }

  async addOutlineImage(imageData, centerX, centerY, maxSize) {
    try {
      const imgElement = await this.loadImage(imageData.url || '/images/placeholder.png');
      
      // Create a canvas to convert the image to outline
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      
      // Scale image to fit
      const scale = Math.min(maxSize / imgElement.width, maxSize / imgElement.height);
      const scaledWidth = imgElement.width * scale;
      const scaledHeight = imgElement.height * scale;
      
      tempCanvas.width = scaledWidth;
      tempCanvas.height = scaledHeight;
      
      // Draw image and convert to outline (simplified approach)
      tempCtx.drawImage(imgElement, 0, 0, scaledWidth, scaledHeight);
      
      // Create outline effect by drawing strokes
      tempCtx.globalCompositeOperation = 'source-over';
      tempCtx.strokeStyle = '#000000';
      tempCtx.lineWidth = 2;
      tempCtx.strokeRect(0, 0, scaledWidth, scaledHeight);
      
      // Create fabric image from the processed canvas
      const fabricImg = new fabric.Image(tempCanvas, {
        left: centerX,
        top: centerY,
        originX: 'center',
        originY: 'center'
      });
      
      // Add a simple black outline rectangle as fallback
      const outlineRect = new fabric.Rect({
        left: centerX,
        top: centerY,
        width: scaledWidth,
        height: scaledHeight,
        originX: 'center',
        originY: 'center',
        fill: 'transparent',
        stroke: '#000000',
        strokeWidth: 3,
        rx: 10,
        ry: 10
      });
      
      this.worksheetCanvas.add(outlineRect);
      
    } catch (e) {
      // Fallback: create a simple shape to color
      const shape = new fabric.Rect({
        left: centerX,
        top: centerY,
        width: maxSize * 0.8,
        height: maxSize * 0.6,
        originX: 'center',
        originY: 'center',
        fill: 'transparent',
        stroke: '#000000',
        strokeWidth: 3,
        rx: 15,
        ry: 15
      });
      
      const label = new fabric.Text(imageData.displayName || 'Shape', {
        left: centerX,
        top: centerY,
        originX: 'center',
        originY: 'center',
        fontSize: 16,
        fill: '#000000'
      });
      
      this.worksheetCanvas.add(shape, label);
    }
  }

  async addPageBorder(borderStyle) {
    const canvasWidth = this.worksheetCanvas.width;
    const canvasHeight = this.worksheetCanvas.height;
    const margin = 20;
    
    if (borderStyle === 'simple') {
      const border = new fabric.Rect({
        left: margin,
        top: margin,
        width: canvasWidth - 2 * margin,
        height: canvasHeight - 2 * margin,
        fill: 'transparent',
        stroke: '#000000',
        strokeWidth: 3
      });
      this.worksheetCanvas.add(border);
    } else if (borderStyle === 'decorative') {
      // Create a decorative border with dashed lines
      const border = new fabric.Rect({
        left: margin,
        top: margin,
        width: canvasWidth - 2 * margin,
        height: canvasHeight - 2 * margin,
        fill: 'transparent',
        stroke: '#000000',
        strokeWidth: 2,
        strokeDashArray: [10, 5]
      });
      this.worksheetCanvas.add(border);
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

  downloadWorksheet() {
    if (!this.worksheetCanvas) return;
    
    const link = document.createElement('a');
    link.download = 'coloring-page.png';
    link.href = this.worksheetCanvas.toDataURL();
    link.click();
  }

  printWorksheet() {
    if (!this.worksheetCanvas) return;
    
    const printWindow = window.open('', '_blank');
    const canvasDataUrl = this.worksheetCanvas.toDataURL();
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Coloring Page</title>
        <style>
          body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
          img { max-width: 100%; height: auto; }
        </style>
      </head>
      <body>
        <img src="${canvasDataUrl}" alt="Coloring Page">
      </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  cleanup() {
    this.fabricInstances.forEach(canvas => {
      try {
        canvas.dispose();
      } catch (e) {
        console.warn('Error disposing canvas:', e);
      }
    });
    this.fabricInstances.clear();
  }
}

// Register the web component
customElements.define('lcs-coloring', ColoringGenerator);

// Export for module usage
export default ColoringGenerator;