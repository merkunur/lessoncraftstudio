import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class ImageAdditionGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.selectedImages = [];
    this.worksheetCanvas = null;
    this.currentProblems = [];
    this.fabricInstances = new Set();
  }

  get appName() {
    return 'image-addition';
  }

  getDefaultTranslations() {
    return {
      en: {
        imageAddition: {
          title: 'Image Addition Worksheet',
          exerciseCount: 'Number of Exercises (1-10)',
          minItems: 'Min items per group',
          maxItems: 'Max items per group',
          selectImages: 'Select Images',
          generate: 'Generate Worksheet',
          includeNameDate: 'Include Name/Date Fields',
          showPlusSign: 'Show + Between Groups',
          includeNumbers: 'Include Exercise Numbers',
          noImagesError: 'Please select at least one image',
          generating: 'Generating worksheet...'
        },
        common: {
          download: 'Download PDF',
          print: 'Print',
          clear: 'Clear'
        }
      },
      de: {
        imageAddition: {
          title: 'Bild-Addition Arbeitsblatt',
          exerciseCount: 'Anzahl Aufgaben (1-10)',
          minItems: 'Min. Elemente pro Gruppe',
          maxItems: 'Max. Elemente pro Gruppe',
          selectImages: 'Bilder auswählen',
          generate: 'Arbeitsblatt erstellen',
          includeNameDate: 'Name/Datum Felder einschließen',
          showPlusSign: 'Zeige + zwischen Gruppen',
          includeNumbers: 'Aufgabennummern einschließen',
          noImagesError: 'Bitte wählen Sie mindestens ein Bild aus',
          generating: 'Arbeitsblatt wird erstellt...'
        },
        common: {
          download: 'PDF herunterladen',
          print: 'Drucken',
          clear: 'Löschen'
        }
      },
      fr: {
        imageAddition: {
          title: 'Feuille d\'addition par images',
          exerciseCount: 'Nombre d\'exercices (1-10)',
          minItems: 'Min. éléments par groupe',
          maxItems: 'Max. éléments par groupe',
          selectImages: 'Sélectionner les images',
          generate: 'Générer la feuille',
          includeNameDate: 'Inclure champs Nom/Date',
          showPlusSign: 'Afficher + entre groupes',
          includeNumbers: 'Inclure numéros d\'exercices',
          noImagesError: 'Veuillez sélectionner au moins une image',
          generating: 'Génération de la feuille...'
        },
        common: {
          download: 'Télécharger PDF',
          print: 'Imprimer',
          clear: 'Effacer'
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
      
      .image-addition-app {
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
        max-height: 300px;
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
      
      .loading-state {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 400px;
        color: #666;
      }
      
      .premium-badge {
        background: #ff3b30;
        color: white;
        font-size: 0.7rem;
        padding: 0.15rem 0.3rem;
        border-radius: 3px;
        margin-left: 0.5rem;
      }
      
      @media (max-width: 768px) {
        .image-addition-app {
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
      <div class="image-addition-app">
        <div class="controls-panel">
          <h2 data-i18n="imageAddition.title">Image Addition Worksheet</h2>
          
          <div class="settings-group">
            <label for="problemCount" data-i18n="imageAddition.exerciseCount">Number of Exercises (1-10)</label>
            <input type="number" id="problemCount" value="5" min="1" max="10">
          </div>
          
          <div class="settings-group">
            <label for="minOperand" data-i18n="imageAddition.minItems">Min items per group</label>
            <input type="number" id="minOperand" value="1" min="1" max="10">
          </div>
          
          <div class="settings-group">
            <label for="maxOperand" data-i18n="imageAddition.maxItems">Max items per group</label>
            <input type="number" id="maxOperand" value="5" min="1" max="10">
          </div>
          
          <div class="settings-group">
            <div class="checkbox-group">
              <label>
                <input type="checkbox" id="includeNameDate">
                <span data-i18n="imageAddition.includeNameDate">Include Name/Date Fields</span>
              </label>
              <label>
                <input type="checkbox" id="showPlusSign" checked>
                <span data-i18n="imageAddition.showPlusSign">Show + Between Groups</span>
              </label>
              <label>
                <input type="checkbox" id="includeNumbers" checked>
                <span data-i18n="imageAddition.includeNumbers">Include Exercise Numbers</span>
              </label>
            </div>
          </div>
          
          <div class="image-selector">
            <h3 data-i18n="imageAddition.selectImages">Select Images</h3>
            <div id="imageGrid" class="image-grid"></div>
          </div>
          
          <button id="generateBtn" class="btn-primary" data-i18n="imageAddition.generate">
            Generate Worksheet
          </button>
          
          <button id="clearBtn" class="btn-secondary" data-i18n="common.clear">
            Clear
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
    
    // Use sample images if no images provided
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
      { id: 'apple', displayName: 'Apple', url: '/images/fruits/apple.png' },
      { id: 'banana', displayName: 'Banana', url: '/images/fruits/banana.png' },
      { id: 'orange', displayName: 'Orange', url: '/images/fruits/orange.png' },
      { id: 'grape', displayName: 'Grape', url: '/images/fruits/grape.png' },
      { id: 'cherry', displayName: 'Cherry', url: '/images/fruits/cherry.png' },
      { id: 'strawberry', displayName: 'Strawberry', url: '/images/fruits/strawberry.png' },
      { id: 'car', displayName: 'Car', url: '/images/vehicles/car.png' },
      { id: 'bus', displayName: 'Bus', url: '/images/vehicles/bus.png' },
      { id: 'bike', displayName: 'Bike', url: '/images/vehicles/bike.png' }
    ];
  }

  toggleImage(image) {
    const imageId = image.id || image.displayName;
    const index = this.selectedImages.indexOf(imageId);
    
    if (index > -1) {
      this.selectedImages.splice(index, 1);
    } else {
      this.selectedImages.push(imageId);
    }
    
    this.updateImageLibrary();
  }

  setupEventListeners() {
    const generateBtn = this.shadowRoot.getElementById('generateBtn');
    const clearBtn = this.shadowRoot.getElementById('clearBtn');
    const downloadBtn = this.shadowRoot.getElementById('downloadBtn');
    const printBtn = this.shadowRoot.getElementById('printBtn');

    generateBtn?.addEventListener('click', () => this.generateWorksheet());
    clearBtn?.addEventListener('click', () => this.clearSelection());
    downloadBtn?.addEventListener('click', () => this.downloadWorksheet());
    printBtn?.addEventListener('click', () => this.printWorksheet());
  }

  clearSelection() {
    this.selectedImages = [];
    this.updateImageLibrary();
    
    // Clear canvas
    if (this.worksheetCanvas) {
      this.worksheetCanvas.clear();
    }
    
    // Hide action buttons
    const actionButtons = this.shadowRoot.getElementById('actionButtons');
    if (actionButtons) {
      actionButtons.style.display = 'none';
    }
  }

  initializeCanvas() {
    // Load fabric.js dynamically if not already loaded
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

  async generateWorksheet() {
    if (this.selectedImages.length === 0) {
      alert(this.getTranslation('imageAddition.noImagesError'));
      return;
    }

    const generateBtn = this.shadowRoot.getElementById('generateBtn');
    generateBtn.disabled = true;
    generateBtn.textContent = this.getTranslation('imageAddition.generating');

    try {
      const settings = this.getSettings();
      await this.createWorksheet(settings);
      
      // Show action buttons
      const actionButtons = this.shadowRoot.getElementById('actionButtons');
      actionButtons.style.display = 'flex';
      
      this.emit('worksheet-generated', {
        type: 'image-addition',
        problems: this.currentProblems
      });
      
    } catch (error) {
      this.emit('error', { message: error.message });
    } finally {
      generateBtn.disabled = false;
      generateBtn.textContent = this.getTranslation('imageAddition.generate');
    }
  }

  getSettings() {
    return {
      problemCount: parseInt(this.shadowRoot.getElementById('problemCount').value) || 5,
      minOperand: parseInt(this.shadowRoot.getElementById('minOperand').value) || 1,
      maxOperand: parseInt(this.shadowRoot.getElementById('maxOperand').value) || 5,
      includeNameDate: this.shadowRoot.getElementById('includeNameDate').checked,
      showPlusSign: this.shadowRoot.getElementById('showPlusSign').checked,
      includeNumbers: this.shadowRoot.getElementById('includeNumbers').checked
    };
  }

  async createWorksheet(settings) {
    if (!this.worksheetCanvas) return;
    
    this.worksheetCanvas.clear();
    this.currentProblems = [];
    
    const images = this._images.length > 0 ? this._images : this.getSampleImages();
    const availableImages = images.filter(img => 
      this.selectedImages.includes(img.id || img.displayName)
    );
    
    // Generate problems
    for (let i = 0; i < settings.problemCount; i++) {
      const problem = this.generateProblem(availableImages, settings, i);
      this.currentProblems.push(problem);
    }
    
    // Layout problems on canvas
    await this.layoutProblems(settings);
  }

  generateProblem(availableImages, settings, problemIndex) {
    const image = availableImages[Math.floor(Math.random() * availableImages.length)];
    const operand1 = Math.floor(Math.random() * (settings.maxOperand - settings.minOperand + 1)) + settings.minOperand;
    const operand2 = Math.floor(Math.random() * (settings.maxOperand - settings.minOperand + 1)) + settings.minOperand;
    
    return {
      id: problemIndex,
      image: image,
      operand1: operand1,
      operand2: operand2,
      answer: operand1 + operand2
    };
  }

  async layoutProblems(settings) {
    const canvasWidth = this.worksheetCanvas.width;
    const canvasHeight = this.worksheetCanvas.height;
    const margin = 40;
    let currentY = margin;
    
    // Add title
    const title = new fabric.Text('Addition Worksheet', {
      left: canvasWidth / 2,
      top: currentY,
      fontFamily: 'Arial',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      originX: 'center'
    });
    this.worksheetCanvas.add(title);
    currentY += 50;
    
    // Add name/date fields if requested
    if (settings.includeNameDate) {
      const nameField = new fabric.Text('Name: _________________', {
        left: margin,
        top: currentY,
        fontFamily: 'Arial',
        fontSize: 14
      });
      
      const dateField = new fabric.Text('Date: _________________', {
        left: canvasWidth - margin - 150,
        top: currentY,
        fontFamily: 'Arial',
        fontSize: 14
      });
      
      this.worksheetCanvas.add(nameField, dateField);
      currentY += 40;
    }
    
    // Layout problems
    const problemsPerRow = settings.problemCount <= 5 ? 1 : 2;
    const problemHeight = 100;
    const problemSpacing = 120;
    
    for (let i = 0; i < this.currentProblems.length; i++) {
      const problem = this.currentProblems[i];
      const row = Math.floor(i / problemsPerRow);
      const col = i % problemsPerRow;
      
      const x = margin + col * (canvasWidth - 2 * margin) / problemsPerRow;
      const y = currentY + row * problemSpacing;
      
      await this.addProblemToCanvas(problem, x, y, settings);
    }
  }

  async addProblemToCanvas(problem, x, y, settings) {
    const imageSize = 30;
    const spacing = 40;
    
    // Problem number
    if (settings.includeNumbers) {
      const problemNumber = new fabric.Text(`${problem.id + 1}.`, {
        left: x,
        top: y,
        fontFamily: 'Arial',
        fontSize: 16,
        fontWeight: 'bold'
      });
      this.worksheetCanvas.add(problemNumber);
    }
    
    let currentX = x + (settings.includeNumbers ? 30 : 0);
    
    // First group of images
    for (let i = 0; i < problem.operand1; i++) {
      const imgElement = await this.loadImage(problem.image.url || '/images/placeholder.png');
      const fabricImg = new fabric.Image(imgElement, {
        left: currentX + (i % 5) * (imageSize + 5),
        top: y + Math.floor(i / 5) * (imageSize + 5),
        scaleX: imageSize / imgElement.width,
        scaleY: imageSize / imgElement.height
      });
      this.worksheetCanvas.add(fabricImg);
    }
    
    currentX += Math.ceil(problem.operand1 / 5) * (imageSize + 5) + spacing;
    
    // Plus sign
    if (settings.showPlusSign) {
      const plusSign = new fabric.Text('+', {
        left: currentX,
        top: y + 15,
        fontFamily: 'Arial',
        fontSize: 24,
        fontWeight: 'bold'
      });
      this.worksheetCanvas.add(plusSign);
      currentX += 30;
    }
    
    // Second group of images
    for (let i = 0; i < problem.operand2; i++) {
      const imgElement = await this.loadImage(problem.image.url || '/images/placeholder.png');
      const fabricImg = new fabric.Image(imgElement, {
        left: currentX + (i % 5) * (imageSize + 5),
        top: y + Math.floor(i / 5) * (imageSize + 5),
        scaleX: imageSize / imgElement.width,
        scaleY: imageSize / imgElement.height
      });
      this.worksheetCanvas.add(fabricImg);
    }
    
    currentX += Math.ceil(problem.operand2 / 5) * (imageSize + 5) + spacing;
    
    // Equals sign and answer box
    const equalsSign = new fabric.Text('=', {
      left: currentX,
      top: y + 15,
      fontFamily: 'Arial',
      fontSize: 24,
      fontWeight: 'bold'
    });
    
    const answerBox = new fabric.Rect({
      left: currentX + 30,
      top: y + 10,
      width: 40,
      height: 30,
      fill: 'transparent',
      stroke: '#000',
      strokeWidth: 2
    });
    
    this.worksheetCanvas.add(equalsSign, answerBox);
  }

  loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => {
        // Fallback to a simple colored rectangle
        const canvas = document.createElement('canvas');
        canvas.width = 50;
        canvas.height = 50;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#007aff';
        ctx.fillRect(0, 0, 50, 50);
        resolve(canvas);
      };
      img.src = src;
    });
  }

  downloadWorksheet() {
    if (!this.worksheetCanvas) return;
    
    const link = document.createElement('a');
    link.download = 'addition-worksheet.png';
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
        <title>Addition Worksheet</title>
        <style>
          body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
          img { max-width: 100%; height: auto; }
        </style>
      </head>
      <body>
        <img src="${canvasDataUrl}" alt="Addition Worksheet">
      </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  cleanup() {
    // Clean up Fabric.js instances
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
customElements.define('lcs-image-addition', ImageAdditionGenerator);

// Export for module usage
export default ImageAdditionGenerator;