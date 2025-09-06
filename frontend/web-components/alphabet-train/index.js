import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class AlphabetTrainGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.selectedLetters = new Set();
    this.letterToImage = new Map();
    this.worksheetCanvas = null;
    this.fabricInstances = new Set();
  }

  get appName() {
    return 'alphabet-train';
  }

  getDefaultTranslations() {
    return {
      en: {
        alphabetTrain: {
          title: 'Alphabet Train Worksheet',
          selectLetters: 'Select Letters (up to 11)',
          selectedCount: 'Selected: {count}/11',
          generate: 'Generate Train',
          includeUppercase: 'Include Uppercase Letters',
          includeLowercase: 'Include Lowercase Letters',
          showImages: 'Show Images in Train Cars',
          trainStyle: 'Train Car Style',
          colorful: 'Colorful',
          blackWhite: 'Black & White',
          noLettersError: 'Please select at least one letter',
          generating: 'Creating your train...'
        },
        common: {
          download: 'Download PDF',
          print: 'Print',
          clear: 'Clear Selection'
        }
      },
      de: {
        alphabetTrain: {
          title: 'Alphabet Zug Arbeitsblatt',
          selectLetters: 'Buchstaben auswählen (bis zu 11)',
          selectedCount: 'Ausgewählt: {count}/11',
          generate: 'Zug erstellen',
          includeUppercase: 'Großbuchstaben einschließen',
          includeLowercase: 'Kleinbuchstaben einschließen',
          showImages: 'Bilder in Zugwagons anzeigen',
          trainStyle: 'Zugwagon-Stil',
          colorful: 'Bunt',
          blackWhite: 'Schwarz-Weiß',
          noLettersError: 'Bitte wählen Sie mindestens einen Buchstaben aus',
          generating: 'Ihr Zug wird erstellt...'
        },
        common: {
          download: 'PDF herunterladen',
          print: 'Drucken',
          clear: 'Auswahl löschen'
        }
      },
      fr: {
        alphabetTrain: {
          title: 'Train de l\'Alphabet',
          selectLetters: 'Sélectionner les lettres (jusqu\'à 11)',
          selectedCount: 'Sélectionnées: {count}/11',
          generate: 'Générer le train',
          includeUppercase: 'Inclure les majuscules',
          includeLowercase: 'Inclure les minuscules',
          showImages: 'Afficher les images dans les wagons',
          trainStyle: 'Style des wagons',
          colorful: 'Coloré',
          blackWhite: 'Noir et blanc',
          noLettersError: 'Veuillez sélectionner au moins une lettre',
          generating: 'Création de votre train...'
        },
        common: {
          download: 'Télécharger PDF',
          print: 'Imprimer',
          clear: 'Effacer la sélection'
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
      
      .alphabet-train-app {
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
      
      .settings-group select {
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
      
      .letter-selection {
        margin: 1.5rem 0;
      }
      
      .letter-selection h3 {
        margin: 0 0 0.75rem 0;
        font-size: 1rem;
      }
      
      .alphabet-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
      
      .alphabet-button {
        width: 40px;
        height: 40px;
        border: 2px solid #4a4a4a;
        background: #3a3a3e;
        color: #e0e0e0;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }
      
      .alphabet-button:hover {
        background: #4a4a4e;
      }
      
      .alphabet-button.selected {
        border-color: #007aff;
        background: rgba(0, 122, 255, 0.2);
        color: #007aff;
      }
      
      .selected-count {
        font-size: 0.85rem;
        color: #a0a0a0;
        text-align: center;
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
      
      @media (max-width: 768px) {
        .alphabet-train-app {
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
      <div class="alphabet-train-app">
        <div class="controls-panel">
          <h2 data-i18n="alphabetTrain.title">Alphabet Train Worksheet</h2>
          
          <div class="settings-group">
            <div class="checkbox-group">
              <label>
                <input type="checkbox" id="includeUppercase" checked>
                <span data-i18n="alphabetTrain.includeUppercase">Include Uppercase Letters</span>
              </label>
              <label>
                <input type="checkbox" id="includeLowercase">
                <span data-i18n="alphabetTrain.includeLowercase">Include Lowercase Letters</span>
              </label>
              <label>
                <input type="checkbox" id="showImages" checked>
                <span data-i18n="alphabetTrain.showImages">Show Images in Train Cars</span>
              </label>
            </div>
          </div>
          
          <div class="settings-group">
            <label for="trainStyle" data-i18n="alphabetTrain.trainStyle">Train Car Style</label>
            <select id="trainStyle">
              <option value="colorful" data-i18n="alphabetTrain.colorful">Colorful</option>
              <option value="blackwhite" data-i18n="alphabetTrain.blackWhite">Black & White</option>
            </select>
          </div>
          
          <div class="letter-selection">
            <h3 data-i18n="alphabetTrain.selectLetters">Select Letters (up to 11)</h3>
            <div class="alphabet-grid" id="alphabetGrid"></div>
            <div class="selected-count" id="selectedCount" data-i18n="alphabetTrain.selectedCount">
              Selected: 0/11
            </div>
          </div>
          
          <button id="generateBtn" class="btn-primary" data-i18n="alphabetTrain.generate">
            Generate Train
          </button>
          
          <button id="clearBtn" class="btn-secondary" data-i18n="common.clear">
            Clear Selection
          </button>
        </div>
        
        <div class="preview-panel">
          <div class="canvas-container" id="canvasContainer">
            ${!isPremium ? '<div class="watermark">SAMPLE</div>' : ''}
            <canvas id="worksheetCanvas" width="792" height="612"></canvas>
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
    this.initializeAlphabetGrid();
    this.initializeCanvas();
  }

  initializeAlphabetGrid() {
    const alphabetGrid = this.shadowRoot.getElementById('alphabetGrid');
    if (!alphabetGrid) return;
    
    alphabetGrid.innerHTML = '';
    
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    alphabet.forEach(letter => {
      const button = document.createElement('button');
      button.className = 'alphabet-button';
      button.textContent = letter;
      button.addEventListener('click', () => this.toggleLetter(letter, button));
      alphabetGrid.appendChild(button);
    });
    
    this.updateSelectedCount();
  }

  toggleLetter(letter, buttonElement) {
    if (this.selectedLetters.has(letter)) {
      this.selectedLetters.delete(letter);
      buttonElement.classList.remove('selected');
    } else {
      if (this.selectedLetters.size >= 11) {
        alert('Maximum 11 letters allowed for the train');
        return;
      }
      this.selectedLetters.add(letter);
      buttonElement.classList.add('selected');
    }
    
    this.updateSelectedCount();
  }

  updateSelectedCount() {
    const countElement = this.shadowRoot.getElementById('selectedCount');
    if (countElement) {
      const translation = this.getTranslation('alphabetTrain.selectedCount');
      countElement.textContent = translation.replace('{count}', this.selectedLetters.size);
    }
  }

  setupEventListeners() {
    const generateBtn = this.shadowRoot.getElementById('generateBtn');
    const clearBtn = this.shadowRoot.getElementById('clearBtn');
    const downloadBtn = this.shadowRoot.getElementById('downloadBtn');
    const printBtn = this.shadowRoot.getElementById('printBtn');

    generateBtn?.addEventListener('click', () => this.generateTrain());
    clearBtn?.addEventListener('click', () => this.clearSelection());
    downloadBtn?.addEventListener('click', () => this.downloadWorksheet());
    printBtn?.addEventListener('click', () => this.printWorksheet());
  }

  clearSelection() {
    this.selectedLetters.clear();
    this.shadowRoot.querySelectorAll('.alphabet-button').forEach(btn => {
      btn.classList.remove('selected');
    });
    this.updateSelectedCount();
    
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

  async generateTrain() {
    if (this.selectedLetters.size === 0) {
      alert(this.getTranslation('alphabetTrain.noLettersError'));
      return;
    }

    const generateBtn = this.shadowRoot.getElementById('generateBtn');
    generateBtn.disabled = true;
    generateBtn.textContent = this.getTranslation('alphabetTrain.generating');

    try {
      const settings = this.getSettings();
      await this.createTrain(settings);
      
      // Show action buttons
      const actionButtons = this.shadowRoot.getElementById('actionButtons');
      actionButtons.style.display = 'flex';
      
      this.emit('worksheet-generated', {
        type: 'alphabet-train',
        letters: Array.from(this.selectedLetters)
      });
      
    } catch (error) {
      this.emit('error', { message: error.message });
    } finally {
      generateBtn.disabled = false;
      generateBtn.textContent = this.getTranslation('alphabetTrain.generate');
    }
  }

  getSettings() {
    return {
      includeUppercase: this.shadowRoot.getElementById('includeUppercase').checked,
      includeLowercase: this.shadowRoot.getElementById('includeLowercase').checked,
      showImages: this.shadowRoot.getElementById('showImages').checked,
      trainStyle: this.shadowRoot.getElementById('trainStyle').value
    };
  }

  async createTrain(settings) {
    if (!this.worksheetCanvas) return;
    
    this.worksheetCanvas.clear();
    
    const canvasWidth = this.worksheetCanvas.width;
    const canvasHeight = this.worksheetCanvas.height;
    const margin = 40;
    
    // Add title
    const title = new fabric.Text('Alphabet Train', {
      left: canvasWidth / 2,
      top: margin,
      fontFamily: 'Arial',
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      originX: 'center',
      fill: settings.trainStyle === 'colorful' ? '#007aff' : '#000000'
    });
    this.worksheetCanvas.add(title);
    
    // Sort selected letters alphabetically
    const sortedLetters = Array.from(this.selectedLetters).sort();
    
    // Calculate train layout
    const trainCarWidth = 80;
    const trainCarHeight = 100;
    const trainSpacing = 10;
    const maxCarsPerRow = Math.floor((canvasWidth - 2 * margin) / (trainCarWidth + trainSpacing));
    const rows = Math.ceil(sortedLetters.length / maxCarsPerRow);
    
    let startY = 120;
    
    // Draw locomotive first
    await this.drawLocomotive(margin, startY, trainCarWidth, trainCarHeight, settings);
    
    // Draw train cars for each letter
    for (let i = 0; i < sortedLetters.length; i++) {
      const letter = sortedLetters[i];
      const row = Math.floor(i / maxCarsPerRow);
      const col = i % maxCarsPerRow;
      
      // Add locomotive width + spacing for the first car
      const x = margin + trainCarWidth + trainSpacing + col * (trainCarWidth + trainSpacing);
      const y = startY + row * (trainCarHeight + 60);
      
      await this.drawTrainCar(letter, x, y, trainCarWidth, trainCarHeight, settings);
    }
  }

  async drawLocomotive(x, y, width, height, settings) {
    const colors = settings.trainStyle === 'colorful' ? 
      ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'] : 
      ['#000000'];
    
    const color = colors[0];
    
    // Main locomotive body
    const body = new fabric.Rect({
      left: x,
      top: y,
      width: width,
      height: height * 0.7,
      fill: settings.trainStyle === 'colorful' ? color : 'transparent',
      stroke: '#000000',
      strokeWidth: 2,
      rx: 8,
      ry: 8
    });
    
    // Locomotive front (smokestack area)
    const front = new fabric.Rect({
      left: x,
      top: y - height * 0.2,
      width: width * 0.4,
      height: height * 0.3,
      fill: settings.trainStyle === 'colorful' ? color : 'transparent',
      stroke: '#000000',
      strokeWidth: 2,
      rx: 4,
      ry: 4
    });
    
    // Wheels
    const wheel1 = new fabric.Circle({
      left: x + width * 0.2,
      top: y + height * 0.7,
      radius: 12,
      fill: settings.trainStyle === 'colorful' ? '#333333' : 'transparent',
      stroke: '#000000',
      strokeWidth: 2
    });
    
    const wheel2 = new fabric.Circle({
      left: x + width * 0.6,
      top: y + height * 0.7,
      radius: 12,
      fill: settings.trainStyle === 'colorful' ? '#333333' : 'transparent',
      stroke: '#000000',
      strokeWidth: 2
    });
    
    this.worksheetCanvas.add(body, front, wheel1, wheel2);
  }

  async drawTrainCar(letter, x, y, width, height, settings) {
    const colors = settings.trainStyle === 'colorful' ? 
      ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'] : 
      ['#ffffff'];
    
    const colorIndex = letter.charCodeAt(0) % colors.length;
    const color = colors[colorIndex];
    
    // Train car body
    const carBody = new fabric.Rect({
      left: x,
      top: y,
      width: width,
      height: height * 0.7,
      fill: color,
      stroke: '#000000',
      strokeWidth: 2,
      rx: 6,
      ry: 6
    });
    
    // Wheels
    const wheel1 = new fabric.Circle({
      left: x + width * 0.2,
      top: y + height * 0.7,
      radius: 10,
      fill: settings.trainStyle === 'colorful' ? '#333333' : 'transparent',
      stroke: '#000000',
      strokeWidth: 2
    });
    
    const wheel2 = new fabric.Circle({
      left: x + width * 0.7,
      top: y + height * 0.7,
      radius: 10,
      fill: settings.trainStyle === 'colorful' ? '#333333' : 'transparent',
      stroke: '#000000',
      strokeWidth: 2
    });
    
    this.worksheetCanvas.add(carBody, wheel1, wheel2);
    
    // Add letter(s)
    let yOffset = 15;
    
    if (settings.includeUppercase) {
      const upperLetter = new fabric.Text(letter.toUpperCase(), {
        left: x + width / 2,
        top: y + yOffset,
        fontFamily: 'Arial',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        originX: 'center',
        fill: settings.trainStyle === 'colorful' ? '#000000' : '#000000'
      });
      this.worksheetCanvas.add(upperLetter);
      yOffset += 30;
    }
    
    if (settings.includeLowercase) {
      const lowerLetter = new fabric.Text(letter.toLowerCase(), {
        left: x + width / 2,
        top: y + yOffset,
        fontFamily: 'Arial',
        fontSize: 20,
        textAlign: 'center',
        originX: 'center',
        fill: settings.trainStyle === 'colorful' ? '#000000' : '#000000'
      });
      this.worksheetCanvas.add(lowerLetter);
      yOffset += 25;
    }
    
    // Add image if requested and available
    if (settings.showImages) {
      const imageForLetter = this.getImageForLetter(letter);
      if (imageForLetter) {
        try {
          const imgElement = await this.loadImage(imageForLetter.url);
          const fabricImg = new fabric.Image(imgElement, {
            left: x + width / 2,
            top: y + yOffset,
            originX: 'center',
            scaleX: 20 / imgElement.width,
            scaleY: 20 / imgElement.height
          });
          this.worksheetCanvas.add(fabricImg);
        } catch (e) {
          console.warn('Could not load image for letter', letter);
        }
      }
    }
  }

  getImageForLetter(letter) {
    // Try to find an image that starts with this letter from the image library
    const images = this._images.length > 0 ? this._images : this.getSampleImages();
    return images.find(img => 
      img.displayName.toLowerCase().startsWith(letter.toLowerCase())
    );
  }

  getSampleImages() {
    return [
      { id: 'apple', displayName: 'Apple', url: '/images/fruits/apple.png' },
      { id: 'banana', displayName: 'Banana', url: '/images/fruits/banana.png' },
      { id: 'cat', displayName: 'Cat', url: '/images/animals/cat.png' },
      { id: 'dog', displayName: 'Dog', url: '/images/animals/dog.png' },
      { id: 'elephant', displayName: 'Elephant', url: '/images/animals/elephant.png' },
      { id: 'fish', displayName: 'Fish', url: '/images/animals/fish.png' },
      { id: 'grape', displayName: 'Grape', url: '/images/fruits/grape.png' },
      { id: 'house', displayName: 'House', url: '/images/objects/house.png' }
    ];
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
    link.download = 'alphabet-train-worksheet.png';
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
        <title>Alphabet Train Worksheet</title>
        <style>
          body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
          img { max-width: 100%; height: auto; }
        </style>
      </head>
      <body>
        <img src="${canvasDataUrl}" alt="Alphabet Train Worksheet">
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
customElements.define('lcs-alphabet-train', AlphabetTrainGenerator);

// Export for module usage
export default AlphabetTrainGenerator;