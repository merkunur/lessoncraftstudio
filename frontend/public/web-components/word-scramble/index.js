import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class WordScrambleGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.selectedImages = [];
    this.worksheetCanvas = null;
    this.fabricInstances = new Set();
    this.currentWords = [];
  }

  get appName() {
    return 'word-scramble';
  }

  getDefaultTranslations() {
    return {
      en: {
        wordScramble: {
          title: 'Word Scramble Worksheet',
          selectImages: 'Select Images for Words',
          wordCount: 'Number of Words (3-15)',
          includeImages: 'Show Images as Hints',
          includeAnswers: 'Include Answer Key',
          scrambleStyle: 'Scramble Style',
          mixed: 'Mixed Letters',
          backwards: 'Backwards',
          generate: 'Generate Scramble',
          noImagesError: 'Please select at least 3 images',
          generating: 'Creating word scramble...'
        },
        common: {
          download: 'Download PDF',
          print: 'Print',
          clear: 'Clear Selection'
        }
      },
      de: {
        wordScramble: {
          title: 'Wort-Durcheinander Arbeitsblatt',
          selectImages: 'Bilder für Wörter auswählen',
          wordCount: 'Anzahl Wörter (3-15)',
          includeImages: 'Bilder als Hinweise zeigen',
          includeAnswers: 'Antwortschlüssel einschließen',
          scrambleStyle: 'Durcheinander-Stil',
          mixed: 'Gemischte Buchstaben',
          backwards: 'Rückwärts',
          generate: 'Durcheinander erstellen',
          noImagesError: 'Bitte wählen Sie mindestens 3 Bilder aus',
          generating: 'Wort-Durcheinander wird erstellt...'
        },
        common: {
          download: 'PDF herunterladen',
          print: 'Drucken',
          clear: 'Auswahl löschen'
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
      
      .word-scramble-app {
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
        max-height: 200px;
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
        width: 30px;
        height: 30px;
        object-fit: contain;
      }
      
      .image-item span {
        font-size: 0.7rem;
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
        .word-scramble-app {
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
      <div class="word-scramble-app">
        <div class="controls-panel">
          <h2 data-i18n="wordScramble.title">Word Scramble Worksheet</h2>
          
          <div class="settings-group">
            <label for="wordCount" data-i18n="wordScramble.wordCount">Number of Words (3-15)</label>
            <input type="number" id="wordCount" value="8" min="3" max="15">
          </div>
          
          <div class="settings-group">
            <label for="scrambleStyle" data-i18n="wordScramble.scrambleStyle">Scramble Style</label>
            <select id="scrambleStyle">
              <option value="mixed" data-i18n="wordScramble.mixed">Mixed Letters</option>
              <option value="backwards" data-i18n="wordScramble.backwards">Backwards</option>
            </select>
          </div>
          
          <div class="settings-group">
            <div class="checkbox-group">
              <label>
                <input type="checkbox" id="includeImages" checked>
                <span data-i18n="wordScramble.includeImages">Show Images as Hints</span>
              </label>
              <label>
                <input type="checkbox" id="includeAnswers">
                <span data-i18n="wordScramble.includeAnswers">Include Answer Key</span>
              </label>
            </div>
          </div>
          
          <div class="image-selector">
            <h3 data-i18n="wordScramble.selectImages">Select Images for Words</h3>
            <div id="imageGrid" class="image-grid"></div>
          </div>
          
          <button id="generateBtn" class="btn-primary" data-i18n="wordScramble.generate">
            Generate Scramble
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
      { id: 'apple', displayName: 'APPLE', url: '/images/fruits/apple.png' },
      { id: 'banana', displayName: 'BANANA', url: '/images/fruits/banana.png' },
      { id: 'cherry', displayName: 'CHERRY', url: '/images/fruits/cherry.png' },
      { id: 'dog', displayName: 'DOG', url: '/images/animals/dog.png' },
      { id: 'elephant', displayName: 'ELEPHANT', url: '/images/animals/elephant.png' },
      { id: 'flower', displayName: 'FLOWER', url: '/images/nature/flower.png' },
      { id: 'guitar', displayName: 'GUITAR', url: '/images/music/guitar.png' },
      { id: 'house', displayName: 'HOUSE', url: '/images/objects/house.png' },
      { id: 'ice', displayName: 'ICE', url: '/images/nature/ice.png' },
      { id: 'jacket', displayName: 'JACKET', url: '/images/clothes/jacket.png' }
    ];
  }

  toggleImage(image) {
    const imageId = image.id || image.displayName;
    const index = this.selectedImages.indexOf(imageId);
    
    if (index > -1) {
      this.selectedImages.splice(index, 1);
    } else {
      const maxWords = parseInt(this.shadowRoot.getElementById('wordCount')?.value) || 8;
      if (this.selectedImages.length >= maxWords) {
        alert(`Maximum ${maxWords} words allowed`);
        return;
      }
      this.selectedImages.push(imageId);
    }
    
    this.updateImageLibrary();
  }

  setupEventListeners() {
    const generateBtn = this.shadowRoot.getElementById('generateBtn');
    const clearBtn = this.shadowRoot.getElementById('clearBtn');
    const downloadBtn = this.shadowRoot.getElementById('downloadBtn');
    const printBtn = this.shadowRoot.getElementById('printBtn');

    generateBtn?.addEventListener('click', () => this.generateScramble());
    clearBtn?.addEventListener('click', () => this.clearSelection());
    downloadBtn?.addEventListener('click', () => this.downloadWorksheet());
    printBtn?.addEventListener('click', () => this.printWorksheet());
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

  async generateScramble() {
    if (this.selectedImages.length < 3) {
      alert(this.getTranslation('wordScramble.noImagesError'));
      return;
    }

    const generateBtn = this.shadowRoot.getElementById('generateBtn');
    generateBtn.disabled = true;
    generateBtn.textContent = this.getTranslation('wordScramble.generating');

    try {
      const settings = this.getSettings();
      await this.createScramble(settings);
      
      const actionButtons = this.shadowRoot.getElementById('actionButtons');
      actionButtons.style.display = 'flex';
      
      this.emit('worksheet-generated', {
        type: 'word-scramble',
        words: this.currentWords
      });
      
    } catch (error) {
      this.emit('error', { message: error.message });
    } finally {
      generateBtn.disabled = false;
      generateBtn.textContent = this.getTranslation('wordScramble.generate');
    }
  }

  getSettings() {
    return {
      wordCount: parseInt(this.shadowRoot.getElementById('wordCount').value) || 8,
      scrambleStyle: this.shadowRoot.getElementById('scrambleStyle').value,
      includeImages: this.shadowRoot.getElementById('includeImages').checked,
      includeAnswers: this.shadowRoot.getElementById('includeAnswers').checked
    };
  }

  async createScramble(settings) {
    if (!this.worksheetCanvas) return;
    
    this.worksheetCanvas.clear();
    this.currentWords = [];
    
    const canvasWidth = this.worksheetCanvas.width;
    const canvasHeight = this.worksheetCanvas.height;
    const margin = 40;
    
    // Title
    const title = new fabric.Text('Word Scramble', {
      left: canvasWidth / 2,
      top: margin,
      fontFamily: 'Arial',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      originX: 'center',
      fill: '#000000'
    });
    this.worksheetCanvas.add(title);
    
    // Instructions
    const instructions = new fabric.Text('Unscramble the letters to form words:', {
      left: canvasWidth / 2,
      top: margin + 40,
      fontFamily: 'Arial',
      fontSize: 14,
      textAlign: 'center',
      originX: 'center',
      fill: '#666666'
    });
    this.worksheetCanvas.add(instructions);
    
    // Get selected words
    const images = this._images.length > 0 ? this._images : this.getSampleImages();
    const selectedWords = this.selectedImages.slice(0, settings.wordCount).map(id => {
      const img = images.find(i => (i.id || i.displayName) === id);
      return {
        original: img.displayName.toUpperCase(),
        image: img,
        scrambled: this.scrambleWord(img.displayName.toUpperCase(), settings.scrambleStyle)
      };
    });
    
    this.currentWords = selectedWords;
    
    // Layout scrambled words
    let currentY = 120;
    const itemHeight = 60;
    
    for (let i = 0; i < selectedWords.length; i++) {
      const word = selectedWords[i];
      const y = currentY + i * itemHeight;
      
      // Problem number
      const number = new fabric.Text(`${i + 1}.`, {
        left: margin,
        top: y,
        fontFamily: 'Arial',
        fontSize: 16,
        fontWeight: 'bold',
        fill: '#000000'
      });
      this.worksheetCanvas.add(number);
      
      // Image hint if enabled
      if (settings.includeImages) {
        try {
          const imgElement = await this.loadImage(word.image.url || '/images/placeholder.png');
          const fabricImg = new fabric.Image(imgElement, {
            left: margin + 30,
            top: y - 5,
            scaleX: 30 / imgElement.width,
            scaleY: 30 / imgElement.height
          });
          this.worksheetCanvas.add(fabricImg);
        } catch (e) {
          console.warn('Could not load image');
        }
      }
      
      // Scrambled word
      const scrambledText = new fabric.Text(word.scrambled, {
        left: settings.includeImages ? margin + 80 : margin + 30,
        top: y,
        fontFamily: 'Arial',
        fontSize: 16,
        fontWeight: 'bold',
        fill: '#000000'
      });
      this.worksheetCanvas.add(scrambledText);
      
      // Answer line
      const lineLength = word.original.length * 20;
      const answerLine = new fabric.Line([
        settings.includeImages ? margin + 200 : margin + 150,
        y + 20,
        settings.includeImages ? margin + 200 + lineLength : margin + 150 + lineLength,
        y + 20
      ], {
        stroke: '#000000',
        strokeWidth: 1
      });
      this.worksheetCanvas.add(answerLine);
    }
    
    // Answer key if requested
    if (settings.includeAnswers) {
      currentY += selectedWords.length * itemHeight + 40;
      
      const answerTitle = new fabric.Text('Answer Key:', {
        left: margin,
        top: currentY,
        fontFamily: 'Arial',
        fontSize: 16,
        fontWeight: 'bold',
        fill: '#000000'
      });
      this.worksheetCanvas.add(answerTitle);
      
      currentY += 30;
      
      for (let i = 0; i < selectedWords.length; i++) {
        const word = selectedWords[i];
        const answerText = new fabric.Text(`${i + 1}. ${word.original}`, {
          left: margin,
          top: currentY + i * 20,
          fontFamily: 'Arial',
          fontSize: 12,
          fill: '#666666'
        });
        this.worksheetCanvas.add(answerText);
      }
    }
  }

  scrambleWord(word, style) {
    if (style === 'backwards') {
      return word.split('').reverse().join('');
    } else {
      // Mixed letters
      const letters = word.split('');
      for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
      }
      return letters.join('');
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
    link.download = 'word-scramble-worksheet.png';
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
        <title>Word Scramble Worksheet</title>
        <style>
          body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
          img { max-width: 100%; height: auto; }
        </style>
      </head>
      <body>
        <img src="${canvasDataUrl}" alt="Word Scramble Worksheet">
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
customElements.define('lcs-word-scramble', WordScrambleGenerator);

// Export for module usage
export default WordScrambleGenerator;